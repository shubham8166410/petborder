import { z } from 'zod/v4';
import { createServiceClient } from '@/lib/supabase/server';
import { stripBoilerplate } from './daff-monitor';

// ── Types ─────────────────────────────────────────────────────────────────────

export type QuarantineStatus = 'available' | 'limited' | 'closed' | 'unknown';

export interface QuarantineAvailability {
  status: QuarantineStatus;
  notice: string | null;
  fetchedAt: string; // ISO timestamp
  sourceUrl: string;
  isCached: boolean;
}

// Zod schema for safe-parsing cached QuarantineAvailability values.
// Guards against stale/malformed cache entries after schema changes.
const quarantineAvailabilitySchema = z.object({
  status: z.enum(['available', 'limited', 'closed', 'unknown']),
  notice: z.string().nullable(),
  fetchedAt: z.string(),
  sourceUrl: z.string(),
  isCached: z.boolean(),
});

// ── Constants ─────────────────────────────────────────────────────────────────

const MICKLEHAM_URL =
  'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/post-entry-quarantine';
const CACHE_KEY = 'mickleham_availability';
const CACHE_TTL_HOURS = 24;

// Keywords that indicate restricted availability (case-insensitive search)
const CLOSED_KEYWORDS = ['closed', 'embargo', 'no bookings'] as const;
const LIMITED_KEYWORDS = ['limited', 'limited availability', 'limited spaces', 'capacity'] as const;

// Sentence-level trigger keywords for extractNotice
const NOTICE_KEYWORDS = ['closed', 'limited', 'embargo', 'notice', 'alert', 'important'] as const;

// ── Pure helpers ──────────────────────────────────────────────────────────────

/**
 * Inspect cleaned page text for restriction keywords.
 * CLOSED_KEYWORDS take priority over LIMITED_KEYWORDS.
 * Returns 'available' when no keywords are found.
 */
export function detectStatus(pageText: string): QuarantineStatus {
  const lower = pageText.toLowerCase();

  for (const kw of CLOSED_KEYWORDS) {
    if (lower.includes(kw)) return 'closed';
  }

  for (const kw of LIMITED_KEYWORDS) {
    if (lower.includes(kw)) return 'limited';
  }

  return 'available';
}

/**
 * Extract the first sentence from pageText that contains any NOTICE_KEYWORDS.
 * Returns the sentence truncated to 200 characters, or null if none found.
 */
export function extractNotice(pageText: string): string | null {
  if (!pageText) return null;

  // Split into sentences on '.', '!', or '?' followed by optional whitespace
  const sentences = pageText.split(/(?<=[.!?])\s+/);

  // Find the first sentence containing any notice keyword
  for (const sentence of sentences) {
    const sentLower = sentence.toLowerCase();
    const hasKeyword = NOTICE_KEYWORDS.some((kw) => sentLower.includes(kw));
    if (hasKeyword) {
      return sentence.slice(0, 200);
    }
  }

  return null;
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Returns the current Mickleham quarantine availability.
 *
 * Order of operations:
 * 1. Check live_data_cache for a fresh (non-expired) row.
 * 2. If found → return with isCached: true.
 * 3. If not found → fetch the DAFF page.
 * 4. On successful fetch → detect status, extract notice, upsert cache, return isCached: false.
 * 5. On fetch failure with stale cache → return stale data with isCached: true.
 * 6. On fetch failure with no cache → return { status: 'unknown', ... }.
 *
 * Never throws — all errors are swallowed and surfaced as status: 'unknown'.
 */
export async function getQuarantineStatus(): Promise<QuarantineAvailability> {
  const now = new Date().toISOString();
  const fallback: QuarantineAvailability = {
    status: 'unknown',
    notice: null,
    fetchedAt: now,
    sourceUrl: MICKLEHAM_URL,
    isCached: false,
  };

  // ── 1. Try fresh cache lookup ───────────────────────────────────────────────
  let db: ReturnType<typeof createServiceClient> | null = null;
  try {
    db = createServiceClient();
  } catch {
    // If we can't even create the client, skip to fetch
  }

  if (db !== null) {
    try {
      const { data: freshRow } = await db
        .from('live_data_cache')
        .select('value')
        .eq('key', CACHE_KEY)
        .gt('expires_at', now)
        .limit(1)
        .maybeSingle();

      if (freshRow !== null && freshRow !== undefined) {
        const parsed = quarantineAvailabilitySchema.safeParse(JSON.parse(freshRow.value));
        if (parsed.success) return { ...parsed.data, isCached: true };
        // Cache entry failed schema validation — treat as miss and fetch fresh
      }
    } catch {
      // DB error — proceed to fetch
    }
  }

  // ── 2. Fetch live page ──────────────────────────────────────────────────────
  let pageText: string | null = null;
  try {
    const response = await fetch(MICKLEHAM_URL, {
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) {
      const html = await response.text();
      pageText = stripBoilerplate(html);
    }
  } catch {
    // Network error or timeout — will try stale cache next
  }

  if (pageText !== null) {
    // ── 3. Build fresh result ─────────────────────────────────────────────────
    const fetchedAt = new Date().toISOString();
    const status = detectStatus(pageText);
    const notice = extractNotice(pageText);

    const result: QuarantineAvailability = {
      status,
      notice,
      fetchedAt,
      sourceUrl: MICKLEHAM_URL,
      isCached: false,
    };

    // ── 4. Upsert into cache (fire-and-forget, errors swallowed) ──────────────
    if (db !== null) {
      try {
        const expiresAt = new Date(
          Date.now() + CACHE_TTL_HOURS * 60 * 60 * 1000,
        ).toISOString();

        await db.from('live_data_cache').upsert({
          key: CACHE_KEY,
          value: JSON.stringify(result),
          expires_at: expiresAt,
        });
      } catch {
        // Cache write failure is non-fatal
      }
    }

    return result;
  }

  // ── 5. Fetch failed — try stale cache ────────────────────────────────────────
  if (db !== null) {
    try {
      const { data: staleRow } = await db
        .from('live_data_cache')
        .select('value')
        .eq('key', CACHE_KEY)
        .limit(1)
        .maybeSingle();

      if (staleRow !== null && staleRow !== undefined) {
        const parsed = quarantineAvailabilitySchema.safeParse(JSON.parse(staleRow.value));
        if (parsed.success) return { ...parsed.data, isCached: true };
      }
    } catch {
      // DB error — return unknown fallback
    }
  }

  // ── 6. No data at all ────────────────────────────────────────────────────────
  return fallback;
}
