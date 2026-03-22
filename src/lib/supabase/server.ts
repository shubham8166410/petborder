import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Database generics are omitted until `supabase gen types typescript` is run.
/** Use in Server Components, API Route Handlers, and Server Actions. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Throws in Server Components — safe to ignore;
            // middleware will refresh the session.
          }
        },
      },
    }
  );
}

/** Service-role client — bypasses RLS. Server-side only. */
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    {
      cookies: { getAll: () => [], setAll: () => {} },
    }
  );
}
