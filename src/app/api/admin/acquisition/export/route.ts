import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/subscription";

// ── Query schema ──────────────────────────────────────────────────────────────

const ExportTypeSchema = z.enum(["mrr", "users", "leads", "api"]);
type ExportType = z.infer<typeof ExportTypeSchema>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function errorJson(message: string, status: number) {
  return NextResponse.json({ success: false, error: message, status }, { status });
}

function csvResponse(rows: string[][], filename: string): NextResponse {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const s = String(cell ?? "");
          // Wrap in quotes if the cell contains a comma, quote, or newline
          if (s.includes(",") || s.includes('"') || s.includes("\n")) {
            return `"${s.replace(/"/g, '""')}"`;
          }
          return s;
        })
        .join(",")
    )
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Format a Date as "YYYY-MM" */
function toYearMonth(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// ── GET /api/admin/acquisition/export ────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
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

  // 3. Validate query param
  const typeParam = req.nextUrl.searchParams.get("type");
  const parsed = ExportTypeSchema.safeParse(typeParam);
  if (!parsed.success) {
    return errorJson(
      "Invalid export type. Valid values: mrr, users, leads, api",
      400
    );
  }
  const exportType: ExportType = parsed.data;

  // 4. Generate CSV
  try {
    const service = createServiceClient();
    const today = todayString();

    switch (exportType) {
      case "mrr": {
        // Build last 12 months
        const now = new Date();
        const months: string[] = [];
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push(toYearMonth(d));
        }

        // Fetch subscriptions
        const { data: subRows } = await service
          .from("subscriptions")
          .select("created_at, status")
          .order("created_at", { ascending: true });

        const allSubs = (subRows ?? []) as Array<{
          created_at: string;
          status: string;
        }>;

        const rows: string[][] = [["month", "mrr_aud"]];
        for (const ym of months) {
          const start = `${ym}-01T00:00:00.000Z`;
          const [y, m] = ym.split("-").map(Number);
          const endDate = new Date(y, m, 1);
          endDate.setMilliseconds(-1);
          const end = endDate.toISOString();

          const createdThisMonth = allSubs.filter(
            (s) => s.created_at >= start && s.created_at <= end
          ).length;
          const mrrAud = ((createdThisMonth * 990) / 100).toFixed(2);
          rows.push([ym, mrrAud]);
        }

        return csvResponse(rows, `mrr-export-${today}.csv`);
      }

      case "users": {
        const [allProfiles, newProfiles, cancelledSubs, activeSubs] =
          await Promise.all([
            service.from("profiles").select("id"),
            service
              .from("profiles")
              .select("id")
              .gte(
                "created_at",
                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
              ),
            service
              .from("subscriptions")
              .select("id")
              .eq("status", "cancelled")
              .gte(
                "created_at",
                new Date(
                  Date.now() - 30 * 24 * 60 * 60 * 1000
                ).toISOString()
              ),
            service.from("subscriptions").select("id").eq("status", "active"),
          ]);

        const total = (allProfiles.data ?? []).length;
        const newLast7 = (newProfiles.data ?? []).length;
        const churned = (cancelledSubs.data ?? []).length;
        const active = (activeSubs.data ?? []).length;
        const churnRate =
          active + churned > 0
            ? (Math.round((churned / (active + churned)) * 1000) / 10).toFixed(
                1
              )
            : "0.0";

        const rows: string[][] = [
          ["total_users", "new_last_7_days", "churned_last_30_days", "churn_rate"],
          [String(total), String(newLast7), String(churned), String(churnRate)],
        ];
        return csvResponse(rows, `users-export-${today}.csv`);
      }

      case "leads": {
        const { data: leadRows } = await service
          .from("agency_leads")
          .select("agency_id");

        const leadByAgency = new Map<string, number>();
        for (const row of (leadRows ?? []) as Array<{ agency_id: string }>) {
          leadByAgency.set(
            row.agency_id,
            (leadByAgency.get(row.agency_id) ?? 0) + 1
          );
        }

        const agencyIds = [...leadByAgency.keys()];
        const nameMap = new Map<string, string>();
        if (agencyIds.length > 0) {
          const { data: agenciesData } = await service
            .from("agencies")
            .select("id, name")
            .in("id", agencyIds);
          for (const a of agenciesData ?? []) {
            const r = a as { id: string; name: string };
            nameMap.set(r.id, r.name);
          }
        }

        const rows: string[][] = [["agency_name", "lead_count"]];
        for (const [agencyId, count] of [...leadByAgency.entries()].sort(
          (a, b) => b[1] - a[1]
        )) {
          rows.push([nameMap.get(agencyId) ?? agencyId, String(count)]);
        }

        return csvResponse(rows, `leads-export-${today}.csv`);
      }

      case "api": {
        const { data: apiRows } = await service
          .from("api_keys")
          .select("agency_id, request_count")
          .not("agency_id", "is", null);

        const apiByAgency = new Map<string, number>();
        for (const row of (apiRows ?? []) as Array<{
          agency_id: string | null;
          request_count: number;
        }>) {
          if (row.agency_id) {
            apiByAgency.set(
              row.agency_id,
              (apiByAgency.get(row.agency_id) ?? 0) + (row.request_count ?? 0)
            );
          }
        }

        const agencyIds = [...apiByAgency.keys()];
        const nameMap = new Map<string, string>();
        if (agencyIds.length > 0) {
          const { data: agenciesData } = await service
            .from("agencies")
            .select("id, name")
            .in("id", agencyIds);
          for (const a of agenciesData ?? []) {
            const r = a as { id: string; name: string };
            nameMap.set(r.id, r.name);
          }
        }

        const rows: string[][] = [["agency_name", "request_count"]];
        for (const [agencyId, count] of [...apiByAgency.entries()].sort(
          (a, b) => b[1] - a[1]
        )) {
          rows.push([nameMap.get(agencyId) ?? agencyId, String(count)]);
        }

        return csvResponse(rows, `api-export-${today}.csv`);
      }
    }
  } catch (err) {
    console.error("[/api/admin/acquisition/export] error:", err);
    return errorJson("Internal server error", 500);
  }
}
