"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import type { AcquisitionStats } from "@/types/admin";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatAUD(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function exportCSV(type: string): void {
  window.location.href = `/api/admin/acquisition/export?type=${type}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-[#1B4F72]">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

function SectionHeader({
  title,
  exportType,
}: {
  title: string;
  exportType?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[#1B4F72]">{title}</h2>
      {exportType && (
        <button
          onClick={() => exportCSV(exportType)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E3DF] bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Export CSV
        </button>
      )}
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-[#E5E3DF]" />;
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="py-8 text-center text-sm text-gray-400">{message}</p>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm animate-pulse">
      <div className="h-3 w-24 rounded bg-gray-200" />
      <div className="mt-2 h-8 w-32 rounded bg-gray-200" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  stats: AcquisitionStats | null;
}

export function AcquisitionDashboard({ stats }: Props) {
  if (!stats) {
    // Loading / error skeleton
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  const {
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
  } = stats;

  // Format MRR history for recharts (AUD, not cents)
  const mrrChartData = mrrHistory.map((d) => ({
    month: d.month,
    mrr: d.mrr / 100,
  }));

  // Funnel bar data
  const funnelData = [
    { name: "Timelines", value: totalTimelines, fill: "#1B4F72" },
    { name: "Purchases", value: totalPurchases, fill: "#E67E22" },
  ];

  const maxApiRequests =
    apiUsageByPartner.length > 0
      ? Math.max(...apiUsageByPartner.map((a) => a.requestCount))
      : 1;

  const maxLeads =
    whitelabelUsageByAgency.length > 0
      ? Math.max(...whitelabelUsageByAgency.map((a) => a.leadCount))
      : 1;

  return (
    <div className="space-y-10">
      {/* ── Section 1: Revenue ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="Revenue" exportType="mrr" />
        <Divider />

        {/* MRR Hero Card */}
        <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Monthly Recurring Revenue
          </p>
          <p className="mt-1 text-4xl font-bold text-[#1B4F72]">
            {formatAUD(mrr)}
          </p>
          <p className="mt-1 text-xs text-gray-400">AUD — current month</p>
        </div>

        {/* MRR Line Chart */}
        {mrrChartData.some((d) => d.mrr > 0) ? (
          <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-medium text-gray-500">
              MRR History — last 12 months (AUD)
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={mrrChartData}
                margin={{ top: 4, right: 24, bottom: 4, left: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E3DF" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) =>
                    new Intl.NumberFormat("en-AU", {
                      notation: "compact",
                      style: "currency",
                      currency: "AUD",
                      minimumFractionDigits: 0,
                    }).format(v)
                  }
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  tickLine={false}
                  width={70}
                />
                <Tooltip
                  formatter={(value) => [
                    formatAUD((value as number) * 100),
                    "MRR",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#1B4F72"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#1B4F72" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
            <EmptyState message="No MRR history data yet" />
          </div>
        )}
      </section>

      {/* ── Section 2: Users ────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="Users" exportType="users" />
        <Divider />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Users" value={String(totalUsers)} />
          <StatCard
            title="New Users (7d)"
            value={String(newUsersLast7Days)}
            sub="Registered in last 7 days"
          />
          <StatCard
            title="Churned (30d)"
            value={String(churnedLast30Days)}
            sub="Cancelled in last 30 days"
          />
          <StatCard
            title="Churn Rate"
            value={`${churnRate}%`}
            sub="30-day rolling churn"
          />
        </div>
      </section>

      {/* ── Section 3: Conversion Funnel ────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="Conversion Funnel" />
        <Divider />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Funnel bar chart */}
          <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-medium text-gray-500">
              Timeline → Purchase Funnel
            </p>
            {totalTimelines > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  layout="vertical"
                  data={funnelData}
                  margin={{ top: 4, right: 24, bottom: 4, left: 24 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E3DF"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#374151" }}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="No timeline data yet" />
            )}
          </div>

          {/* Conversion stats */}
          <div className="space-y-4">
            <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Conversion Rate
              </p>
              <p className="mt-1 text-3xl font-bold text-[#E67E22]">
                {timelineToPaymentRate}%
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Timelines that led to a purchase
              </p>
            </div>
            <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Avg Days to Purchase
              </p>
              <p className="mt-1 text-3xl font-bold text-[#1B4F72]">
                {avgDaysTimelineToPurchase}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                From timeline generation to payment
              </p>
            </div>
          </div>
        </div>

        {/* Top origin countries */}
        <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-medium text-gray-500">
            Top Origin Countries
          </p>
          {topOriginCountries.length > 0 ? (
            <ol className="space-y-2">
              {topOriginCountries.map((item, i) => (
                <li
                  key={item.country}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-5 text-right text-xs text-gray-400">
                      {i + 1}.
                    </span>
                    {item.country}
                  </span>
                  <span className="rounded-full bg-[#EBF5FB] px-2.5 py-0.5 text-xs font-semibold text-[#1B4F72]">
                    {item.count}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState message="No data yet" />
          )}
        </div>
      </section>

      {/* ── Section 4: B2B Partners ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="B2B Partners" />
        <Divider />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* API Usage */}
          <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                API Usage by Partner
              </p>
              <button
                onClick={() => exportCSV("api")}
                className="rounded-lg border border-[#E5E3DF] px-2.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Export
              </button>
            </div>
            {apiUsageByPartner.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400">
                    <th className="pb-2 font-medium">Agency</th>
                    <th className="pb-2 font-medium text-right">Requests</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E3DF]">
                  {apiUsageByPartner.map((partner) => {
                    const pct =
                      maxApiRequests > 0
                        ? (partner.requestCount / maxApiRequests) * 100
                        : 0;
                    return (
                      <tr key={partner.agencyId}>
                        <td className="py-2 font-medium text-[#1B4F72]">
                          {partner.agencyName}
                        </td>
                        <td className="py-2 text-right text-gray-700">
                          {partner.requestCount.toLocaleString()}
                        </td>
                        <td className="py-2 pl-3 w-24">
                          <div className="h-1.5 w-full rounded-full bg-gray-100">
                            <div
                              className="h-1.5 rounded-full bg-[#1B4F72]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <EmptyState message="No API usage data yet" />
            )}
          </div>

          {/* White-label Leads */}
          <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                White-label Leads by Agency
              </p>
              <button
                onClick={() => exportCSV("leads")}
                className="rounded-lg border border-[#E5E3DF] px-2.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Export
              </button>
            </div>
            {whitelabelUsageByAgency.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400">
                    <th className="pb-2 font-medium">Agency</th>
                    <th className="pb-2 font-medium text-right">Leads</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E3DF]">
                  {whitelabelUsageByAgency.map((agency) => {
                    const pct =
                      maxLeads > 0
                        ? (agency.leadCount / maxLeads) * 100
                        : 0;
                    return (
                      <tr key={agency.agencyId}>
                        <td className="py-2 font-medium text-[#1B4F72]">
                          {agency.agencyName}
                        </td>
                        <td className="py-2 text-right text-gray-700">
                          {agency.leadCount.toLocaleString()}
                        </td>
                        <td className="py-2 pl-3 w-24">
                          <div className="h-1.5 w-full rounded-full bg-gray-100">
                            <div
                              className="h-1.5 rounded-full bg-[#E67E22]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <EmptyState message="No white-label leads yet" />
            )}
          </div>
        </div>
      </section>

      {/* ── Section 5: Referrals ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="Referrals" />
        <Divider />

        <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-medium text-gray-500">
            Referral Clicks by Agency
          </p>
          {referralClicksByAgency.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-gray-400">
                <tr>
                  <th className="pb-2 font-medium">Agency</th>
                  <th className="pb-2 font-medium text-right">Clicks</th>
                  <th className="pb-2 font-medium text-right">
                    Conversion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DF]">
                {referralClicksByAgency.map((item) => {
                  const convRate =
                    item.clicks > 0
                      ? ((item.conversions / item.clicks) * 100).toFixed(1)
                      : "—";
                  return (
                    <tr key={item.agencyName}>
                      <td className="py-2 font-medium text-[#1B4F72]">
                        {item.agencyName}
                      </td>
                      <td className="py-2 text-right text-gray-700">
                        {item.clicks.toLocaleString()}
                      </td>
                      <td className="py-2 text-right text-gray-500">
                        {convRate}
                        {item.conversions > 0 ? "%" : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <EmptyState message="No referral click data yet" />
          )}
        </div>
      </section>
    </div>
  );
}
