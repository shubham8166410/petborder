"use client";

import { useState } from "react";
import { useAgencyBranding } from "./AgencyBrandingProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

interface LeadCaptureFormProps {
  agencySlug: string;
  timelineId?: string | null;
}

export function LeadCaptureForm({ agencySlug, timelineId }: LeadCaptureFormProps) {
  const branding = useAgencyBranding();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/agency-leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          agency_slug: agencySlug,
          timeline_id: timelineId ?? undefined,
          pet_owner_email: email.trim(),
          pet_owner_name: name.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const body: unknown = await res.json().catch(() => null);
        const message =
          body !== null &&
          typeof body === "object" &&
          "error" in body &&
          typeof (body as { error: unknown }).error === "string"
            ? (body as { error: string }).error
            : "Something went wrong. Please try again.";
        setError(message);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border border-card-border rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-gray-900">Plan shared!</p>
        <p className="text-sm text-gray-600">
          {`We've shared your plan with ${branding.name}. They'll be in touch soon.`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-card-border rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 text-base">Share your plan with {branding.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Get expert help from {branding.name} with your pet's DAFF compliance journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          id="lead-name"
          label="Your name (optional)"
          placeholder="e.g. Alex Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          autoComplete="name"
        />

        <Input
          id="lead-email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={254}
          required
          autoComplete="email"
        />

        {error && <Alert severity="critical">{error}</Alert>}

        <Button
          type="submit"
          variant="cta"
          disabled={isSubmitting || !email.trim()}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Sending…" : `Share with ${branding.name} →`}
        </Button>

        <p className="text-xs text-gray-400">
          Your details will only be shared with {branding.name}.
        </p>
      </form>
    </div>
  );
}
