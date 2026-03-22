"use client";

import { useState, useEffect, useRef } from "react";
import type { ApprovedLabRow } from "@/types/database";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const DEBOUNCE_MS = 300;

export function LabFinderList() {
  const [country, setCountry] = useState<string>("");
  const [labs, setLabs] = useState<ApprovedLabRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);

      const trimmed = country.trim();
      const url = trimmed ? `/api/labs?country=${encodeURIComponent(trimmed)}` : "/api/labs";

      fetch(url)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to load labs");
          const json: { data: ApprovedLabRow[] } = await res.json();
          return json.data;
        })
        .then((data) => {
          if (!cancelled) {
            setLabs(data);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError("Could not load approved labs. Please try again.");
            setLoading(false);
          }
        });

      return () => { cancelled = true; };
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [country]);

  return (
    <div>
      {/* Search input */}
      <div className="mb-6">
        <label htmlFor="lab-country-filter" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Filter by origin country code (e.g. US, GB)
        </label>
        <input
          id="lab-country-filter"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="e.g. US, GB, DE, AU"
          maxLength={10}
          className="w-full max-w-xs px-3 py-2 text-sm border border-card-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent placeholder-gray-400"
        />
      </div>

      {/* Content area */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label="Loading labs…" />
        </div>
      ) : error !== null ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : labs.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-12">
          No RNATT-approved labs found for this country code.
        </p>
      ) : (
        <ul className="flex flex-col gap-4" aria-label="RNATT-approved labs">
          {labs.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </ul>
      )}
    </div>
  );
}

function LabCard({ lab }: { readonly lab: ApprovedLabRow }) {
  return (
    <li className="bg-white border border-card-border rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-semibold text-gray-900 text-base">{lab.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">Country: {lab.country}</p>
        </div>
        {lab.turnaround_days !== null && (
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 whitespace-nowrap">
            ~{lab.turnaround_days} day turnaround
          </span>
        )}
      </div>

      {/* Accepts from countries — pill list */}
      {lab.accepts_from_countries.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Accepts samples from
          </p>
          <div className="flex flex-wrap gap-1.5">
            {lab.accepts_from_countries.map((code) => (
              <span
                key={code}
                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links and notes */}
      <div className="flex flex-col gap-2">
        {lab.website && (
          <a
            href={lab.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit website
          </a>
        )}
        {lab.notes && (
          <p className="text-xs text-gray-500 leading-relaxed">{lab.notes}</p>
        )}
      </div>
    </li>
  );
}
