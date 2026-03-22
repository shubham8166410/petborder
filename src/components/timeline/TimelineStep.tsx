import type { TimelineStep as TimelineStepType } from "@/types/timeline";

interface TimelineStepProps {
  step: TimelineStepType;
  isLast: boolean;
}

const categoryConfig: Record<
  TimelineStepType["category"],
  { label: string; bg: string; text: string; border: string; iconPath: string }
> = {
  vaccination: {
    label: "Vaccination",
    bg: "bg-green-50", text: "text-green-700", border: "border-green-200",
    iconPath: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  testing: {
    label: "Testing",
    bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200",
    iconPath: "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  },
  documentation: {
    label: "Documentation",
    bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200",
    iconPath: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
  },
  logistics: {
    label: "Logistics",
    bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200",
    iconPath: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5",
  },
  quarantine: {
    label: "Quarantine",
    bg: "bg-red-50", text: "text-red-700", border: "border-red-200",
    iconPath: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
};

// Color-code urgency based on days from now
function getUrgencyStyle(daysFromNow: number): { dot: string; label: string; text: string } {
  if (daysFromNow <= 30)  return { dot: "bg-red-500",   label: "Urgent",       text: "text-red-600" };
  if (daysFromNow <= 90)  return { dot: "bg-amber-500", label: "Book soon",    text: "text-amber-600" };
  return                         { dot: "bg-green-500", label: "Upcoming",     text: "text-green-600" };
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("en-AU", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatDaysFromNow(days: number): string {
  if (days <= 0) return "overdue";
  if (days === 1) return "1 day from now";
  if (days < 7)  return `${days} days from now`;
  if (days < 60) return `~${Math.round(days / 7)} week${days < 14 ? "" : "s"} from now`;
  const months = Math.round(days / 30);
  return `~${months} month${months === 1 ? "" : "s"} from now`;
}

function formatCost(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency", currency: "AUD", minimumFractionDigits: 0,
  }).format(amount);
}

export function TimelineStep({ step, isLast }: TimelineStepProps) {
  const cat = categoryConfig[step.category];
  const urgency = getUrgencyStyle(step.daysFromNow);

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Left: number + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
          {step.stepNumber}
        </div>
        {!isLast && (
          <div className="flex-1 w-0.5 bg-card-border my-2 min-h-[24px]" aria-hidden="true" />
        )}
      </div>

      {/* Right: card */}
      <div className={`flex-1 mb-4 bg-white rounded-2xl border border-card-border p-4 shadow-sm ${isLast ? "" : ""}`}>
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{step.title}</h3>
            {/* Category badge */}
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cat.bg} ${cat.text} ${cat.border}`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={cat.iconPath} />
              </svg>
              {cat.label}
            </span>
          </div>
          {/* Urgency badge */}
          <span className={`flex items-center gap-1 text-xs font-medium ${urgency.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} aria-hidden="true" />
            {urgency.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{step.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-500 border-t border-card-border pt-3">
          <time dateTime={step.dueDate} className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span className="font-medium text-gray-700">{formatDate(step.dueDate)}</span>
            <span className="text-gray-400">({formatDaysFromNow(step.daysFromNow)})</span>
          </time>

          {step.estimatedCost && (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="font-medium text-gray-700">{formatCost(step.estimatedCost.amountAUD)}</span>
              <span>{step.estimatedCost.description}</span>
              {step.estimatedCost.notes && (
                <span className="text-gray-400">({step.estimatedCost.notes})</span>
              )}
            </span>
          )}
        </div>

        {/* Source link */}
        {step.sourceUrl && (
          <div className="mt-2 pt-2 border-t border-card-border">
            <a
              href={step.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Based on official DAFF guidelines ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
