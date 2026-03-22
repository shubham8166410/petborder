import { createServiceClient } from "@/lib/supabase/server";
import { ROLE_HIERARCHY, roleAtLeast } from "@/types/subscription";
import type { UserRole } from "@/types/subscription";

export { roleAtLeast } from "@/types/subscription";

/** Fetch the current role for a user from the profiles table (service client — bypasses RLS). */
export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error || !data) return "free";
    const raw = data.role as string;
    return (ROLE_HIERARCHY as readonly string[]).includes(raw)
      ? (raw as UserRole)
      : "free";
  } catch {
    // Fail-safe: deny access rather than crash
    return "free";
  }
}

/** Server-side role enforcement. Throws a {status, message} error if user lacks the required role. */
export async function requireRole(userId: string, minRole: UserRole): Promise<void> {
  const role = await getUserRole(userId);
  if (!roleAtLeast(role, minRole)) {
    throw {
      status: 403,
      message: `This feature requires the '${minRole}' role or higher. Current role: '${role}'.`,
    };
  }
}

/** Convenience: require admin role. Throws {status: 403} if not admin. */
export async function requireAdmin(userId: string): Promise<void> {
  return requireRole(userId, "admin");
}

/**
 * Update the profiles.role for a user — called by the webhook after subscription events.
 * Uses the service client to bypass RLS.
 */
export async function setUserRole(userId: string, role: UserRole): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);
  if (error) {
    throw new Error(`[setUserRole] Failed to update role for user ${userId}: ${error.message}`);
  }
}
