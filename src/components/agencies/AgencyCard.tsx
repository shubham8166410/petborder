"use client";

import type { AgencyRow } from "@/types/database";

interface AgencyCardProps {
  agency: AgencyRow;
}

function renderStars(rating: number | null): string {
  if (rating === null) return "";
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
}

function handleQuoteClick(agency: AgencyRow) {
  // Fire-and-forget click tracking
  const encodedName = encodeURIComponent(agency.name);
  void fetch(`/api/agencies/${encodedName}/click`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sourcePage: window.location.pathname }),
  }).catch(() => {
    // Tracking errors must never surface to the user
  });

  // Validate scheme before navigating — guard against javascript: URLs in DB
  if (agency.url && (agency.url.startsWith("https://") || agency.url.startsWith("http://"))) {
    window.open(agency.url, "_blank", "noopener,noreferrer");
  }
}

export function AgencyCard({ agency }: AgencyCardProps) {
  const stars = renderStars(agency.rating);

  return (
    <div className="bg-white border border-card-border rounded-2xl p-5 flex flex-col gap-4">
      {/* Header: name + rating */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base">{agency.name}</h3>
          {agency.tagline && (
            <p className="text-xs text-gray-500 mt-0.5">{agency.tagline}</p>
          )}
        </div>
        {agency.rating !== null && (
          <div className="flex-shrink-0 text-right">
            <p className="text-amber-500 text-sm font-medium" aria-label={`Rating: ${agency.rating} out of 5`}>
              {stars} {agency.rating.toFixed(1)}
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      {agency.description && (
        <p className="text-sm text-gray-600 leading-relaxed">{agency.description}</p>
      )}

      {/* Price range */}
      {agency.price_range && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Price range</span>
          <span className="text-sm font-semibold text-gray-900">{agency.price_range}</span>
        </div>
      )}

      {/* States served */}
      {agency.states_served.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="States served">
          {agency.states_served.map((state) => (
            <span
              key={state}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100"
            >
              {state}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={() => handleQuoteClick(agency)}
        className="mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent-600 hover:bg-accent-700 rounded-xl px-4 py-2.5 min-h-[44px] transition-colors"
        style={{ backgroundColor: "#E67E22" }}
        aria-label={`Get a free quote from ${agency.name}`}
      >
        Get a Free Quote
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    </div>
  );
}
