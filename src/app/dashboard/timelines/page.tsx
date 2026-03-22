import { redirect } from "next/navigation";

/**
 * /dashboard/timelines redirects to /dashboard which already shows all saved timelines.
 */
export default function TimelinesRedirectPage() {
  redirect("/dashboard");
}
