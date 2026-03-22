import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/subscription";
import type { ApiSuccessResponse } from "@/types/api";
import type { AcquisitionStats } from "@/types/admin";

// ── Helpers ───────────────────────────────────────────────────────────────────

function errorJson(message: string, status: number) {
  return NextResponse.json({ success: false, error: message, status }, { status });
}

/** Format a Date as "YYYY-MM" */
function toYearMonth(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/** Returns the last day of the month for a given year-month string "YYYY-MM" */
function monthEnd(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  // First day of next month, minus 1ms → last moment of this month
  const d = new Date(y, m, 1); // month is 0-indexed, so m = next month
  d.setMilliseconds(-1);
  return d.toISOString();
}

/** Returns the first day of the month for a given year-month string "YYYY-MM" */
function monthStart(ym: string): string {
  return `${ym}-01T00:00:00.000Z`;
}

// ── GET /api/admin/acquisition ────────────────────────────────────────────────

export async function GET(_req: NextRequest): Promise<NextResponse> {
  // 1. Auth
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return errorJson("Authentication required", 401);
  }

  // 2. Admin role check
  try {
    await requireAdmin(user.id);
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e?.status === 403) {
      return errorJson(e.message ?? "Admin access required", 403);
    }
    return errorJson("Internal server error", 500);
  }

  // 3. Fetch all acquisition metrics via service client
  try {
    const service = createServiceClient();

    // Run all independent queries in parallel
    const [
      activeSubsResult,
      activeAgencySubsResult,
      allProfilesResult,
      newProfilesResult,
      cancelledSubsResult,
      activeSubsCountResult,
      totalTimelinesResult,
      purchasesResult,
      topCountriesResult,
      apiUsageResult,
      whitelabelResult,
      referralClicksResult,
      mrrHistoryResult,
    ] = await Promise.all([
      // Active consumer subscriptions count for MRR
      service.from("subscriptions").select("id").eq("status", "active"),
      // Active B2B agency subscriptions
      service
        .from("agencies")
        .select("id, name, stripe_subscription_id")
        .not("stripe_subscription_id", "is", null),
      // All profiles for totalUsers
      service.from("profiles").select("id"),
      // New users last 7 days
      service
        .from("profiles")
        .select("id")
        .gte(
          "created_at",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        ),
      // Churned (cancelled) subs in last 30 days — status = 'cancelled'
      service
        .from("subscriptions")
        .select("id")
        .eq("status", "cancelled")
        .gte(
          "created_at",
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        ),
      // Active subs count (for churn rate denominator)
      service.from("subscriptions").select("id").eq("status", "active"),
      // Total timelines
      service.from("timelines").select("id, created_at"),
      // Purchases with timeline_id and paid_at (for conversion + avg days)
      service.from("purchases").select("id, timeline_id, paid_at, created_at"),
      // Top 10 origin countries
      service
        .from("timelines")
        .select("origin_country"),
      // API key usage by agency partner
      service
        .from("api_keys")
        .select("agency_id, request_count")
        .not("agency_id", "is", null),
      // White-label leads by agency
      service.from("agency_leads").select("agency_id"),
      // Referral clicks
      service.from("referral_clicks").select("agency_name"),
      // MRR history — subscriptions grouped by created_at month
      service
        .from("subscriptions")
        .select("created_at, status")
        .order("created_at", { ascending: true }),
    ]);

    // ── MRR ──────────────────────────────────────────────────────────────────
    const activeConsumerCount = (activeSubsResult.data ?? []).length;
    const activeAgencyCount = (activeAgencySubsResult.data ?? []).length;
    const mrr = activeConsumerCount * 990 + activeAgencyCount * 29900;

    // ── MRR History (last 12 months) ─────────────────────────────────────────
    // Build 12 calendar months (oldest first)
    const now = new Date();
    const months: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(toYearMonth(d));
    }

    // Group all subscriptions by month created
    const allSubs = (mrrHistoryResult.data ?? []) as Array<{
      created_at: string;
      status: string;
    }>;

    // For each month, count subscriptions created on or before month end
    // and not yet cancelled (approximation: if status is active/trialing,
    // assume they were active across all months since creation)
    const mrrHistory = months.map((ym) => {
      const end = monthEnd(ym);
      const start = monthStart(ym);
      // Count subs created this month
      const createdThisMonth = allSubs.filter(
        (s) => s.created_at >= start && s.created_at <= end
      ).length;
      // Use per-month count * 990 as approximate MRR contribution for that month
      const monthMrr = createdThisMonth * 990;
      return { month: ym, mrr: monthMrr };
    });

    // ── Users ─────────────────────────────────────────────────────────────────
    const totalUsers = (allProfilesResult.data ?? []).length;
    const newUsersLast7Days = (newProfilesResult.data ?? []).length;
    const churnedLast30Days = (cancelledSubsResult.data ?? []).length;
    const activeSubs = (activeSubsCountResult.data ?? []).length;
    const churnRate =
      activeSubs + churnedLast30Days > 0
        ? Math.round(
            (churnedLast30Days / (activeSubs + churnedLast30Days)) * 100 * 10
          ) / 10
        : 0;

    // ── Conversion funnel ─────────────────────────────────────────────────────
    const timelines = (totalTimelinesResult.data ?? []) as Array<{
      id: string;
      created_at: string;
    }>;
    const totalTimelines = timelines.length;

    const purchases = (purchasesResult.data ?? []) as Array<{
      id: string;
      timeline_id: string | null;
      paid_at: string;
      created_at: string;
    }>;
    const totalPurchases = purchases.length;

    const timelineToPaymentRate =
      totalTimelines > 0
        ? Math.round((totalPurchases / totalTimelines) * 1000) / 10
        : 0;

    // Avg days from timeline creation to purchase
    const timelineMap = new Map(timelines.map((t) => [t.id, t.created_at]));
    const diffs: number[] = [];
    for (const p of purchases) {
      if (p.timeline_id && timelineMap.has(p.timeline_id)) {
        const tCreated = new Date(
          timelineMap.get(p.timeline_id)!
        ).getTime();
        const pPaid = new Date(p.paid_at ?? p.created_at).getTime();
        const diffDays = (pPaid - tCreated) / (1000 * 60 * 60 * 24);
        if (diffDays >= 0) diffs.push(diffDays);
      }
    }
    const avgDaysTimelineToPurchase =
      diffs.length > 0
        ? Math.round(
            (diffs.reduce((a, b) => a + b, 0) / diffs.length) * 10
          ) / 10
        : 0;

    // ── Top origin countries ──────────────────────────────────────────────────
    const countryRows = (topCountriesResult.data ?? []) as Array<{
      origin_country: string;
    }>;
    const countryMap = new Map<string, number>();
    for (const row of countryRows) {
      const c = row.origin_country;
      countryMap.set(c, (countryMap.get(c) ?? 0) + 1);
    }
    const topOriginCountries = [...countryMap.entries()]
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // ── API usage by partner ──────────────────────────────────────────────────
    const apiKeyRows = (apiUsageResult.data ?? []) as Array<{
      agency_id: string | null;
      request_count: number;
    }>;

    // Aggregate request counts per agency
    const apiByAgency = new Map<string, number>();
    for (const row of apiKeyRows) {
      if (row.agency_id) {
        apiByAgency.set(
          row.agency_id,
          (apiByAgency.get(row.agency_id) ?? 0) + (row.request_count ?? 0)
        );
      }
    }

    // Fetch agency names for those IDs
    const agencyIdsForApi = [...apiByAgency.keys()];
    let apiAgencyNames = new Map<string, string>();
    if (agencyIdsForApi.length > 0) {
      const { data: agenciesData } = await service
        .from("agencies")
        .select("id, name")
        .in("id", agencyIdsForApi);
      for (const a of agenciesData ?? []) {
        const row = a as { id: string; name: string };
        apiAgencyNames.set(row.id, row.name);
      }
    }

    const apiUsageByPartner = [...apiByAgency.entries()]
      .map(([agencyId, requestCount]) => ({
        agencyId,
        agencyName: apiAgencyNames.get(agencyId) ?? agencyId,
        requestCount,
      }))
      .sort((a, b) => b.requestCount - a.requestCount);

    // ── White-label usage by agency ───────────────────────────────────────────
    const leadRows = (whitelabelResult.data ?? []) as Array<{
      agency_id: string;
    }>;
    const leadByAgency = new Map<string, number>();
    for (const row of leadRows) {
      leadByAgency.set(
        row.agency_id,
        (leadByAgency.get(row.agency_id) ?? 0) + 1
      );
    }

    const agencyIdsForLeads = [...leadByAgency.keys()];
    let leadAgencyNames = new Map<string, string>();
    if (agencyIdsForLeads.length > 0) {
      const { data: agenciesData } = await service
        .from("agencies")
        .select("id, name")
        .in("id", agencyIdsForLeads);
      for (const a of agenciesData ?? []) {
        const row = a as { id: string; name: string };
        leadAgencyNames.set(row.id, row.name);
      }
    }

    const whitelabelUsageByAgency = [...leadByAgency.entries()]
      .map(([agencyId, leadCount]) => ({
        agencyId,
        agencyName: leadAgencyNames.get(agencyId) ?? agencyId,
        leadCount,
      }))
      .sort((a, b) => b.leadCount - a.leadCount);

    // ── Referral clicks by agency ─────────────────────────────────────────────
    const clickRows = (referralClicksResult.data ?? []) as Array<{
      agency_name: string;
    }>;
    const clickMap = new Map<string, number>();
    for (const row of clickRows) {
      const n = row.agency_name;
      clickMap.set(n, (clickMap.get(n) ?? 0) + 1);
    }
    const referralClicksByAgency = [...clickMap.entries()]
      .map(([agencyName, clicks]) => ({
        agencyName,
        clicks,
        conversions: 0, // Conversion tracking not yet implemented
      }))
      .sort((a, b) => b.clicks - a.clicks);

    // ── Build response ────────────────────────────────────────────────────────
    const stats: AcquisitionStats = {
      mrr,
      mrrHistory,
      totalUsers,
      newUsersLast7Days,
      churnedLast30Days,
      churnRate,
      totalTimelines,
      totalPurchases,
      timelineToPaymentRate,
      avgDaysTimelineToPurchase,
      topOriginCountries,
      apiUsageByPartner,
      whitelabelUsageByAgency,
      referralClicksByAgency,
    };

    const body: ApiSuccessResponse<AcquisitionStats> = {
      success: true,
      data: stats,
    };

    return NextResponse.json(body);
  } catch (err) {
    console.error("[/api/admin/acquisition] error:", err);
    return errorJson("Internal server error", 500);
  }
}
