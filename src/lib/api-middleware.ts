// Middleware helper for authenticating API key requests.
//
// Usage in route handlers:
//   const auth = await authenticateApiKey(req, serviceClient);
//   if (auth instanceof NextResponse) return auth; // error response
//   const { apiKey } = auth;

import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApiKeyRow } from "@/types/database";
import type { ApiErrorResponse } from "@/types/api";
import { lookupApiKey, KEY_EXACT_LENGTH } from "./api-keys";
import { checkApiKeyRateLimit, API_KEY_RATE_LIMIT_MAX } from "./api-rate-limit";

const BEARER_PREFIX = "Bearer ";
const KEY_FORMAT_PREFIX = "cpk_";

function errorResponse(status: number, message: string): NextResponse {
  const body: ApiErrorResponse = { success: false, error: message, status };
  return NextResponse.json(body, { status });
}

/**
 * Authenticate an incoming API request by validating the Bearer token.
 *
 * Returns `{ apiKey }` on success, or a NextResponse (401/429) on failure.
 *
 * Security notes:
 * - All pre-verification failures return the same generic message to prevent
 *   key format enumeration.
 * - Exact length check prevents bcrypt 72-byte truncation attacks.
 * - Fire-and-forget DB side effects log errors via console.error (Vercel captures these).
 */
export interface AuthenticatedApiKey {
  apiKey: ApiKeyRow;
  /** Rate limit headers to forward on the success response */
  rateLimitHeaders: Record<string, string>;
}

export async function authenticateApiKey(
  req: NextRequest,
  serviceClient: SupabaseClient
): Promise<AuthenticatedApiKey | NextResponse> {
  // ── 1. Extract and validate header format ──────────────────────────────────
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
    return errorResponse(401, "Authentication required");
  }

  const rawKey = authHeader.slice(BEARER_PREFIX.length);

  // Strict format + exact length check — reject anything that doesn't match
  if (
    !rawKey.startsWith(KEY_FORMAT_PREFIX) ||
    rawKey.length !== KEY_EXACT_LENGTH
  ) {
    return errorResponse(401, "Authentication required");
  }

  // ── 2. Lookup and verify the key in the database ───────────────────────────
  const apiKey = await lookupApiKey(rawKey, serviceClient);

  if (!apiKey) {
    return errorResponse(401, "Authentication required");
  }

  // ── 3. Check rate limit ────────────────────────────────────────────────────
  const rateLimit = checkApiKeyRateLimit(apiKey.id);
  const retryAfterSeconds = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);

  if (!rateLimit.success) {
    const res = errorResponse(429, "Rate limit exceeded. Try again later.");
    res.headers.set("Retry-After", String(Math.max(retryAfterSeconds, 1)));
    res.headers.set("X-RateLimit-Limit", String(API_KEY_RATE_LIMIT_MAX));
    res.headers.set("X-RateLimit-Remaining", "0");
    res.headers.set("X-RateLimit-Reset", String(Math.ceil(rateLimit.resetAt / 1000)));
    return res;
  }

  // ── 4. Fire-and-forget: atomic request_count increment + usage log ─────────
  // Uses .rpc() for atomic server-side increment (avoids read-modify-write race).
  void Promise.resolve(
    serviceClient.rpc("increment_api_key_usage", { key_id: apiKey.id })
  ).catch((err: unknown) =>
    console.error("[api-middleware] Failed to increment api_key usage:", err)
  );

  void Promise.resolve(
    serviceClient.from("api_usage").insert({
      api_key_id: apiKey.id,
      endpoint: req.nextUrl.pathname,
    })
  ).catch((err: unknown) =>
    console.error("[api-middleware] Failed to insert api_usage row:", err)
  );

  // ── 5. Return success with rate limit headers ──────────────────────────────
  return {
    apiKey,
    rateLimitHeaders: {
      "X-RateLimit-Limit": String(API_KEY_RATE_LIMIT_MAX),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
    },
  };
}
