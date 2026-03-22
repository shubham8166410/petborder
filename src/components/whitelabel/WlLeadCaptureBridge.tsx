"use client";

import { useState } from "react";
import type { TimelineOutput } from "@/types/timeline";
import { TimelineForm } from "@/components/timeline/TimelineForm";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface WlLeadCaptureBridgeProps {
  agencySlug: string;
}

/**
 * Renders TimelineForm and, once a result is generated, shows LeadCaptureForm below it.
 * This component bridges the two by listening to the onResult callback.
 */
export function WlLeadCaptureBridge({ agencySlug }: WlLeadCaptureBridgeProps) {
  const [savedTimelineId, setSavedTimelineId] = useState<string | null>(null);
  const [hasResult, setHasResult] = useState(false);

  function handleResult(_result: TimelineOutput, timelineId: string | null) {
    setHasResult(true);
    if (timelineId) {
      setSavedTimelineId(timelineId);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-card-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <TimelineForm onResult={handleResult} />
      </div>

      {hasResult && (
        <LeadCaptureForm
          agencySlug={agencySlug}
          timelineId={savedTimelineId}
        />
      )}
    </div>
  );
}
