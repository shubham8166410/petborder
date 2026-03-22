import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/subscription";
import type { ApiErrorResponse } from "@/types/timeline";
import type { AdminStats } from "@/types/admin";

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code } satisfies ApiErrorResponse, {
    status,
  });
}

/** GET /api/admin/stats — returns aggregated platform statistics. Admin only. */
export async function GET(_req: NextRequest): Promise<NextResponse> {
  // 1. Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return errorResponse("Authentication required", "UNAUTHENTICATED", 401);
  }

  // 2. Admin role check
  try {
    await requireAdmin(user.id);
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e?.status === 403) {
      return errorResponse(
        e.message ?? "Admin access required",
        "FORBIDDEN",
        403
      );
    }
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }

  // 3. Fetch stats using service client (bypasses RLS)
  try {
    const service = createServiceClient();

    // ── Users by role ────────────────────────────────────────────────────────
    const { data: profileRows, error: profilesError } = await service
      .from("profiles")
      .select("role");

    if (profilesError) {
      return errorResponse("Failed to fetch user stats", "DB_ERROR", 500);
    }

    const rows = (profileRows ?? []) as Array<{ role: string }>;
    const byRole = { free: 0, paid_once: 0, subscriber: 0, admin: 0 };
    for (const row of rows) {
      const r = row.role as keyof typeof byRole;
      if (r in byRole) byRole[r]++;
    }

    // ── Purchase revenue ─────────────────────────────────────────────────────
    const { data: purchaseRows, error: purchasesError } = await service
      .from("purchases")
      .select("amount_cents");

    if (purchasesError) {
      return errorResponse("Failed to fetch purchase stats", "DB_ERROR", 500);
    }

    const purchases = (purchaseRows ?? []) as Array<{ amount_cents: number }>;
    const totalPurchases = purchases.length;
    const purchaseRevenueAUD =
      purchases.reduce((sum, p) => sum + (p.amount_cents ?? 0), 0) / 100;

    // ── Active subscriptions ─────────────────────────────────────────────────
    const { data: subRows, error: subsError } = await service
      .from("subscriptions")
      .select("id")
      .eq("status", "active");

    if (subsError) {
      return errorResponse(
        "Failed to fetch subscription stats",
        "DB_ERROR",
        500
      );
    }

    const activeSubscriptions = (subRows ?? []).length;

    // ── Referral clicks ──────────────────────────────────────────────────────
    const { data: clickRows, error: clicksError } = await service
      .from("referral_clicks")
      .select("agency_name");

    if (clicksError) {
      return errorResponse("Failed to fetch referral stats", "DB_ERROR", 500);
    }

    const clicks = (clickRows ?? []) as Array<{ agency_name: string }>;
    const totalClicks = clicks.length;

    // Aggregate by agency_name
    const clickMap = new Map<string, number>();
    for (const click of clicks) {
      const name = click.agency_name;
      clickMap.set(name, (clickMap.get(name) ?? 0) + 1);
    }
    const topAgencies = [...clickMap.entries()]
      .map(([agency_name, count]) => ({ agency_name, clicks: count }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    // ── Timelines ────────────────────────────────────────────────────────────
    const { data: allTimelines, error: timelinesError } = await service
      .from("timelines")
      .select("id");

    if (timelinesError) {
      return errorResponse("Failed to fetch timeline stats", "DB_ERROR", 500);
    }

    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: recentTimelines, error: recentError } = await service
      .from("timelines")
      .select("id")
      .gte("created_at", thirtyDaysAgo);

    if (recentError) {
      return errorResponse("Failed to fetch recent timeline stats", "DB_ERROR", 500);
    }

    const stats: AdminStats = {
      users: {
        total: rows.length,
        byRole,
      },
      revenue: {
        totalPurchases,
        purchaseRevenueAUD,
        activeSubscriptions,
      },
      referrals: {
        totalClicks,
        topAgencies,
      },
      timelines: {
        total: (allTimelines ?? []).length,
        last30Days: (recentTimelines ?? []).length,
      },
    };

    return NextResponse.json(stats);
  } catch {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
