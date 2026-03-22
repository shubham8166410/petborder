// API key generation, hashing, and lookup utilities.
//
// Key format: cpk_<32-hex-chars>  (36 chars total, exact)
// - Prefix stored in DB: first 8 hex chars (after cpk_) for fast lookup
// - Hash stored in DB: bcrypt hash of the full raw key (never store raw)

import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApiKeyRow } from "@/types/database";

const KEY_PREFIX_LITERAL = "cpk_";
const KEY_HEX_LENGTH = 32;
const BCRYPT_ROUNDS = 10;

/** Exact length of a valid raw key: "cpk_" + 32 hex chars */
export const KEY_EXACT_LENGTH = KEY_PREFIX_LITERAL.length + KEY_HEX_LENGTH; // 36

/**
 * Generate a new API key (async — bcrypt hashing is non-blocking).
 * Returns the raw key (shown once to user), the prefix for DB lookup,
 * and the bcrypt hash for DB storage.
 */
export async function generateApiKey(): Promise<{
  raw: string;
  prefix: string;
  hash: string;
}> {
  const hexPart = randomBytes(KEY_HEX_LENGTH / 2).toString("hex"); // 16 bytes → 32 hex chars
  const raw = `${KEY_PREFIX_LITERAL}${hexPart}`;
  const prefix = hexPart.slice(0, 8);
  const hash = await bcrypt.hash(raw, BCRYPT_ROUNDS);
  return { raw, prefix, hash };
}

/**
 * Verify a raw API key against a stored bcrypt hash.
 * Rejects keys that are not exactly KEY_EXACT_LENGTH characters
 * to prevent bcrypt's 72-byte truncation from being exploited.
 */
export async function verifyApiKey(raw: string, hash: string): Promise<boolean> {
  if (!raw || raw.length !== KEY_EXACT_LENGTH) return false;
  return bcrypt.compare(raw, hash);
}

/**
 * Look up an API key by its prefix, then verify the hash against each candidate.
 * Handles the case where multiple rows share the same prefix (rare but possible).
 * Returns null if no active, matching key is found.
 */
export async function lookupApiKey(
  rawKey: string,
  client: SupabaseClient
): Promise<ApiKeyRow | null> {
  if (!rawKey || rawKey.length !== KEY_EXACT_LENGTH) return null;
  if (!rawKey.startsWith(KEY_PREFIX_LITERAL)) return null;

  const hexPart = rawKey.slice(KEY_PREFIX_LITERAL.length);
  const prefix = hexPart.slice(0, 8);

  const { data, error } = await client
    .from("api_keys")
    .select("*")
    .eq("key_prefix", prefix);

  if (error || !data || data.length === 0) return null;

  for (const row of data as ApiKeyRow[]) {
    if (!row.is_active) continue;
    const matches = await verifyApiKey(rawKey, row.key_hash);
    if (matches) return row;
  }

  return null;
}
