-- daff_snapshots: stores content hashes for DAFF pages
CREATE TABLE IF NOT EXISTS daff_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  content_hash text NOT NULL,
  raw_content text NOT NULL,
  scraped_at timestamptz NOT NULL DEFAULT now(),
  changes_detected boolean NOT NULL DEFAULT false,
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_daff_snapshots_page_url_scraped_at
  ON daff_snapshots(page_url, scraped_at DESC);

-- live_data_cache: generic TTL cache for live data fetches
CREATE TABLE IF NOT EXISTS live_data_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Fix: column is named "key", not "cache_key"
CREATE INDEX IF NOT EXISTS idx_live_data_cache_key ON live_data_cache(key);
CREATE INDEX IF NOT EXISTS idx_live_data_cache_expires ON live_data_cache(expires_at);

-- RLS: only admin role can read/update daff_snapshots
-- Service role bypasses RLS entirely — no INSERT policy needed
ALTER TABLE daff_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only read daff_snapshots"
  ON daff_snapshots FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- No INSERT policy: service role (used by cron) bypasses RLS by default.
-- Anon/authenticated clients cannot insert.

CREATE POLICY "Admin update daff_snapshots"
  ON daff_snapshots FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS: live_data_cache — service role bypasses RLS, so no explicit policy needed.
-- Omitting USING (true) prevents anon clients from poisoning the cache.
ALTER TABLE live_data_cache ENABLE ROW LEVEL SECURITY;

-- No policies: only the service role (used by cron + server routes) can access this table.
-- Anon and authenticated clients are denied by default when RLS is enabled with no matching policy.
