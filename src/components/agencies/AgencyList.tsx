"use client";

import { useState, useEffect } from "react";
import type { AgencyRow } from "@/types/database";
import { AgencyCard } from "./AgencyCard";

const AU_STATES = [
  { value: "", label: "All States" },
  { value: "VIC", label: "Victoria (VIC)" },
  { value: "NSW", label: "New South Wales (NSW)" },
  { value: "QLD", label: "Queensland (QLD)" },
  { value: "WA", label: "Western Australia (WA)" },
  { value: "SA", label: "South Australia (SA)" },
  { value: "TAS", label: "Tasmania (TAS)" },
  { value: "ACT", label: "Australian Capital Territory (ACT)" },
  { value: "NT", label: "Northern Territory (NT)" },
] as const;

function AgencySkeleton() {
  return (
    <div className="bg-white border border-card-border rounded-2xl p-5 animate-pulse flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-3/4" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-16 flex-shrink-0" />
      </div>
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="flex gap-1.5">
        <div className="h-5 bg-gray-100 rounded-full w-10" />
        <div className="h-5 bg-gray-100 rounded-full w-10" />
        <div className="h-5 bg-gray-100 rounded-full w-10" />
      </div>
      <div className="h-10 bg-gray-200 rounded-xl mt-2" />
    </div>
  );
}

export function AgencyList() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [agencies, setAgencies] = useState<AgencyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const url = selectedState
      ? `/api/agencies?state=${encodeURIComponent(selectedState)}`
      : "/api/agencies";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((body: { data: AgencyRow[] }) => {
        if (!cancelled) setAgencies(body.data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load agencies. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [selectedState]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Compare Pet Transport Agencies</h2>
        <p className="text-sm text-gray-500 mt-1">
          All prices are estimates. Contact agencies directly for a personalised quote.
        </p>
      </div>

      {/* State filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <label htmlFor="state-filter" className="text-sm font-semibold text-gray-700 flex-shrink-0">
          Filter by state:
        </label>
        <select
          id="state-filter"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="text-sm border border-card-border rounded-xl px-3 py-2 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent bg-white text-gray-800"
          aria-label="Filter agencies by Australian state"
        >
          {AU_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <AgencySkeleton key={n} />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && agencies.length === 0 && (
        <div className="rounded-2xl border border-card-border bg-white p-8 text-center text-sm text-gray-500">
          No agencies found for the selected state. Try a different filter.
        </div>
      )}

      {/* Agency grid */}
      {!loading && !error && agencies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      )}
    </div>
  );
}
