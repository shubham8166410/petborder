"use client";

import { useState, useEffect, useCallback } from "react";
import { ComboboxBreed } from "@/components/ui/ComboboxBreed";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  checkBreedRestriction,
  BREED_RESTRICTIONS,
} from "@/lib/breed-restrictions";
import type { BreedCheckResult } from "@/lib/breed-restrictions";

// ── Country options derived from our knowledge base ───────────────────────────

const CHECKER_COUNTRIES = BREED_RESTRICTIONS.map((c) => ({
  value: c.countryCode,
  label: c.countryName,
})).sort((a, b) => a.label.localeCompare(b.label));

// ── Disclaimer ─────────────────────────────────────────────────────────────────

function Disclaimer({ text }: { text: string }) {
  return (
    <p className="text-xs text-gray-400 mt-3 leading-relaxed">{text}</p>
  );
}

// ── Source footer ──────────────────────────────────────────────────────────────

function SourceLine({ lastVerified, sourceUrl }: { lastVerified: string; sourceUrl: string }) {
  if (!lastVerified && !sourceUrl) return null;
  const formatted = lastVerified
    ? new Date(lastVerified + "T00:00:00").toLocaleDateString("en-AU", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;
  return (
    <p className="text-xs text-gray-400 mt-2">
      {formatted && <>Verified: {formatted}</>}
      {formatted && sourceUrl && " · "}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600"
        >
          Official source ↗
        </a>
      )}
    </p>
  );
}

// ── Result cards ──────────────────────────────────────────────────────────────

function AllowedCard({ result }: { result: BreedCheckResult }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">✅</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-green-900">Welcome!</p>
          <p className="text-sm text-green-800 mt-0.5">{result.message}</p>

          {!result.hasNationalLaw && result.subNationalNote && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-amber-800 mb-0.5">⚠️ Check local rules</p>
              <p className="text-xs text-amber-700">{result.subNationalNote}</p>
            </div>
          )}

          <SourceLine lastVerified={result.lastVerified} sourceUrl={result.sourceUrl} />
        </div>
      </div>
      <Disclaimer text={result.disclaimer} />
    </div>
  );
}

function RestrictedCard({ result }: { result: BreedCheckResult }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">⚠️</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-amber-900">Conditions Apply</p>
          <p className="text-sm text-amber-800 mt-0.5">{result.message}</p>

          {result.conditions && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-amber-800 mb-1">Requirements:</p>
              <p className="text-sm text-amber-700">{result.conditions}</p>
            </div>
          )}

          {result.notes && result.notes !== result.conditions && (
            <p className="text-xs text-amber-600 mt-2">{result.notes}</p>
          )}

          {!result.hasNationalLaw && result.subNationalNote && (
            <div className="mt-3 bg-amber-100 border border-amber-300 rounded-xl p-3">
              <p className="text-xs text-amber-800">{result.subNationalNote}</p>
            </div>
          )}

          <SourceLine lastVerified={result.lastVerified} sourceUrl={result.sourceUrl} />
        </div>
      </div>
      <Disclaimer text={result.disclaimer} />
    </div>
  );
}

function BannedCard({ result }: { result: BreedCheckResult }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">🚫</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-red-900">Entry Not Permitted</p>
          <p className="text-sm text-red-800 mt-0.5">{result.message}</p>

          {result.notes && (
            <p className="text-xs text-red-700 mt-2">{result.notes}</p>
          )}

          {result.officialContact && (
            <p className="text-xs text-red-600 mt-2">
              Contact: {result.officialContact}
            </p>
          )}

          <SourceLine lastVerified={result.lastVerified} sourceUrl={result.sourceUrl} />
        </div>
      </div>
      <Disclaimer text={result.disclaimer} />
    </div>
  );
}

function UnknownCard({ result }: { result: BreedCheckResult }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">ℹ️</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">Verify Before Travel</p>
          <p className="text-sm text-gray-700 mt-0.5">{result.message}</p>
          <p className="text-xs text-gray-500 mt-2">
            Please check directly with the destination country&apos;s official veterinary or biosecurity authority before travel.
          </p>
        </div>
      </div>
      <Disclaimer text={result.disclaimer} />
    </div>
  );
}

function ResultCard({ result }: { result: BreedCheckResult }) {
  switch (result.status) {
    case "allowed":    return <AllowedCard result={result} />;
    case "restricted": return <RestrictedCard result={result} />;
    case "banned":     return <BannedCard result={result} />;
    case "unknown":    return <UnknownCard result={result} />;
  }
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface BreedCheckerProps {
  breed?: string;
  countryCode?: string;
  petType?: "dog" | "cat";
  mode: "standalone" | "inline";
}

// ── Standalone mode ───────────────────────────────────────────────────────────

function StandaloneBreedChecker({
  breed: initialBreed = "",
  countryCode: initialCountry = "",
  petType: initialPetType,
}: Omit<BreedCheckerProps, "mode">) {
  const [petType, setPetType] = useState<"dog" | "cat">(initialPetType ?? "dog");
  const [breed, setBreed] = useState(initialBreed);
  const [countryCode, setCountryCode] = useState(initialCountry);
  const [result, setResult] = useState<BreedCheckResult | null>(null);

  function handleCheck() {
    if (!breed.trim() || !countryCode) return;
    setResult(checkBreedRestriction(breed.trim(), countryCode, petType));
  }

  // Re-run when pre-filled props change (e.g. from URL params)
  useEffect(() => {
    if (initialBreed && initialCountry && initialPetType) {
      setResult(checkBreedRestriction(initialBreed, initialCountry, initialPetType));
    }
  }, [initialBreed, initialCountry, initialPetType]);

  const canCheck = breed.trim().length > 0 && countryCode.length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Pet type toggle */}
      <fieldset>
        <legend className="text-sm font-semibold text-gray-700 mb-3">
          Pet type <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["dog", "cat"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { setPetType(type); setResult(null); }}
              aria-pressed={petType === type}
              className={[
                "py-2.5 px-4 rounded-xl border-2 text-sm font-semibold capitalize transition-all",
                petType === type
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-card-border text-gray-600 hover:border-brand-300",
              ].join(" ")}
            >
              {type === "dog" ? "🐕 Dog" : "🐈 Cat"}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Breed input */}
      <ComboboxBreed
        id="breed-checker-breed"
        petType={petType}
        label="Breed"
        placeholder={petType === "cat" ? "e.g. Domestic Shorthair" : "e.g. Labrador Retriever"}
        value={breed}
        onChange={(v) => { setBreed(v); setResult(null); }}
        required
        hint="Type to search or enter a custom breed name"
      />

      {/* Destination country */}
      <Select
        label="Destination country"
        hint="We have verified restriction data for 17 countries"
        placeholder="Select a country…"
        options={CHECKER_COUNTRIES}
        value={countryCode}
        onChange={(v) => { setCountryCode(v); setResult(null); }}
        required
      />

      <Button
        onClick={handleCheck}
        disabled={!canCheck}
        variant="cta"
        className="w-full"
      >
        Check Now →
      </Button>

      {result && <ResultCard result={result} />}
    </div>
  );
}

// ── Inline mode ───────────────────────────────────────────────────────────────

const INLINE_AUTO_COLLAPSE_MS = 3000;

function InlineBreedChecker({
  breed,
  countryCode,
  petType,
}: Required<Omit<BreedCheckerProps, "mode">>) {
  const [collapsed, setCollapsed] = useState(false);

  const result = checkBreedRestriction(breed, countryCode, petType);

  // Auto-collapse allowed results after a few seconds
  const scheduleCollapse = useCallback(() => {
    if (result.status === "allowed") {
      const timer = setTimeout(() => setCollapsed(true), INLINE_AUTO_COLLAPSE_MS);
      return () => clearTimeout(timer);
    }
  }, [result.status]);

  useEffect(() => {
    setCollapsed(false); // reset on breed/country change
    return scheduleCollapse();
  }, [breed, countryCode, petType, scheduleCollapse]);

  if (collapsed) return null;

  return (
    <div className="animate-fade-up">
      <ResultCard result={result} />
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

export function BreedChecker({ breed, countryCode, petType, mode }: BreedCheckerProps) {
  if (mode === "inline") {
    if (!breed || !countryCode || !petType) return null;
    return (
      <InlineBreedChecker
        breed={breed}
        countryCode={countryCode}
        petType={petType}
      />
    );
  }

  return (
    <StandaloneBreedChecker
      breed={breed}
      countryCode={countryCode}
      petType={petType}
    />
  );
}
