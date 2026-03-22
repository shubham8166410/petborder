// In-memory rate limiter — 100 requests per API key per hour.
//
// LIMITATION: This resets on serverless cold starts. For production,
// migrate to Upstash Redis or Vercel KV.
// TODO: Replace with Redis-backed rate limiter before high-traffic launch.

export const API_KEY_RATE_LIMIT_MAX = 100;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

// Module-level store — persists across requests within the same process
const store = new Map<string, RateLimitEntry>();

export interface ApiKeyRateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number; // epoch ms (unix timestamp)
}

export function checkApiKeyRateLimit(apiKeyId: string): ApiKeyRateLimitResult {
  const now = Date.now();
  const existing = store.get(apiKeyId);

  if (!existing || now >= existing.resetAt) {
    // First request or window has expired — start fresh
    const resetAt = now + WINDOW_MS;
    store.set(apiKeyId, { count: 1, resetAt });
    return { success: true, remaining: API_KEY_RATE_LIMIT_MAX - 1, resetAt };
  }

  if (existing.count >= API_KEY_RATE_LIMIT_MAX) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  const remaining = API_KEY_RATE_LIMIT_MAX - existing.count;
  return { success: true, remaining, resetAt: existing.resetAt };
}

// Exported only for unit tests — guarded to prevent accidental production use
export function resetApiRateLimitForTesting(): void {
  if (process.env.NODE_ENV === "production") {
    console.error("[api-rate-limit] resetApiRateLimitForTesting called in production — no-op");
    return;
  }
  store.clear();
}
