"use client";

import { createBrowserClient } from "@supabase/ssr";

// Database generics are omitted here until `supabase gen types typescript`
// is run against a live project. Use explicit casts in callers.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
