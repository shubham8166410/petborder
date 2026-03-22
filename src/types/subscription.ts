/** User role — stored in profiles.role */
export type UserRole = "free" | "paid_once" | "subscriber" | "admin";

/** Stripe subscription status */
export type SubscriptionStatus = "active" | "cancelled" | "past_due";

/** Role hierarchy for access checks: higher index = more access */
export const ROLE_HIERARCHY: UserRole[] = ["free", "paid_once", "subscriber", "admin"];

/** Check if a user role meets a minimum required role */
export function roleAtLeast(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(requiredRole);
}
