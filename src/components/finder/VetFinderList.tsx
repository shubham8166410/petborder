"use client";

import { useState, useEffect } from "react";
import type { VetClinicRow } from "@/types/database";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

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

export function VetFinderList() {
  const [state, setState] = useState<string>("");
  const [vets, setVets] = useState<VetClinicRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (state) params.set("state", state);

    fetch(`/api/vets${state ? `?${params.toString()}` : ""}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load vet clinics");
        const json: { data: VetClinicRow[] } = await res.json();
        return json.data;
      })
      .then((data) => {
        if (!cancelled) {
          setVets(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load vet clinics. Please try again.");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [state]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-6">
        <label htmlFor="vet-state-filter" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          Filter by state
        </label>
        <select
          id="vet-state-filter"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="flex-1 max-w-xs px-3 py-2 text-sm border border-card-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        >
          {AU_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content area */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label="Loading vet clinics…" />
        </div>
      ) : error !== null ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : vets.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-12">
          No DAFF-approved vets found for this state.
        </p>
      ) : (
        <ul className="flex flex-col gap-4" aria-label="DAFF-approved vet clinics">
          {vets.map((vet) => (
            <VetCard key={vet.id} vet={vet} />
          ))}
        </ul>
      )}
    </div>
  );
}

function VetCard({ vet }: { readonly vet: VetClinicRow }) {
  return (
    <li className="bg-white border border-card-border rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-semibold text-gray-900 text-base">{vet.name}</h3>
          {(vet.address || vet.state || vet.postcode) && (
            <p className="text-sm text-gray-500 mt-0.5">
              {[vet.address, vet.state, vet.postcode].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {vet.daff_approved && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              DAFF Approved
            </span>
          )}
          {vet.specialises_in_export && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
              Specialises in Export
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap text-sm">
        {vet.phone && (
          <a
            href={`tel:${vet.phone}`}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {vet.phone}
          </a>
        )}
        {vet.email && (
          <a
            href={`mailto:${vet.email}`}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {vet.email}
          </a>
        )}
      </div>
    </li>
  );
}
