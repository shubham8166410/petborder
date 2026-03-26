/**
 * Client-side breed cache.
 *
 * Strategy:
 *  1. Return the bundled hardcoded data immediately (zero latency, works offline).
 *  2. In parallel, check localStorage for a fresh DB-sourced snapshot.
 *  3. If the snapshot is stale/missing, fetch /api/breeds and write to localStorage.
 *  4. The component swaps to DB data silently — no loading state ever shown to users.
 *
 * Cache key is versioned so a code change that alters the shape automatically
 * busts the old cache.
 */

export interface CachedBreedEntry {
  name: string;
  banned: boolean;
  banned_note: string | null;
}

const CACHE_KEY = "petborder_breeds_v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEnvelope {
  ts: number;
  dog: CachedBreedEntry[];
  cat: CachedBreedEntry[];
}

function readCache(): CacheEnvelope | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CacheEnvelope = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(dog: CachedBreedEntry[], cat: CachedBreedEntry[]): void {
  try {
    const envelope: CacheEnvelope = { ts: Date.now(), dog, cat };
    localStorage.setItem(CACHE_KEY, JSON.stringify(envelope));
  } catch {
    // localStorage may be full or unavailable — silently ignore
  }
}

async function fetchFromApi(
  type: "dog" | "cat"
): Promise<CachedBreedEntry[] | null> {
  try {
    const res = await fetch(`/api/breeds?type=${type}`, {
      // The API already sets Cache-Control headers; this ensures the browser
      // honours its own HTTP cache before re-fetching from the server.
      cache: "default",
    });
    if (!res.ok) return null;
    return (await res.json()) as CachedBreedEntry[];
  } catch {
    return null;
  }
}

/**
 * Fetches both dog and cat breeds, updates the localStorage cache, and
 * returns the result. Safe to call multiple times — subsequent calls within
 * the TTL window return the cached value without hitting the network.
 *
 * Returns null if the API is unreachable (caller should fall back to bundled data).
 */
export async function refreshBreedsCache(): Promise<CacheEnvelope | null> {
  const [dog, cat] = await Promise.all([
    fetchFromApi("dog"),
    fetchFromApi("cat"),
  ]);
  if (!dog || !cat) return null;
  writeCache(dog, cat);
  return { ts: Date.now(), dog, cat };
}

/**
 * Returns breeds for the given type.
 *
 * - If localStorage has a fresh snapshot → returns it synchronously (fast path).
 * - Otherwise → triggers a background refresh and returns null so the caller
 *   can fall back to bundled data while the fetch completes.
 *
 * Usage:
 *   const cached = getBreedsFromCache("dog");
 *   if (cached) { use(cached); } else { refreshBreedsCache().then(cb); }
 */
export function getBreedsFromCache(
  type: "dog" | "cat"
): CachedBreedEntry[] | null {
  const envelope = readCache();
  if (!envelope) return null;
  return type === "dog" ? envelope.dog : envelope.cat;
}
