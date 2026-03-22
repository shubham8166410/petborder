"use client";

import { useState, useOptimistic, useTransition } from "react";
import type { TimelineStep } from "@/types/timeline";

interface ProgressTrackerProps {
  timelineId: string;
  steps: TimelineStep[];
  initialCompletedIndices: number[];
}

export function ProgressTracker({ timelineId, steps, initialCompletedIndices }: ProgressTrackerProps) {
  const [completedSet, setCompletedSet] = useState(new Set(initialCompletedIndices));
  const [optimisticSet, applyOptimistic] = useOptimistic(
    completedSet,
    (current, { index, completed }: { index: number; completed: boolean }) => {
      const next = new Set(current);
      completed ? next.add(index) : next.delete(index);
      return next;
    }
  );
  const [, startTransition] = useTransition();

  async function toggleStep(index: number) {
    const nowCompleted = !completedSet.has(index);

    startTransition(async () => {
      applyOptimistic({ index, completed: nowCompleted });

      try {
        const res = await fetch(`/api/timelines/${timelineId}/progress`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ stepIndex: index, completed: nowCompleted }),
        });

        if (res.ok) {
          setCompletedSet((prev) => {
            const next = new Set(prev);
            nowCompleted ? next.add(index) : next.delete(index);
            return next;
          });
        }
      } catch {
        // Optimistic update will revert on next render if server fails
      }
    });
  }

  const completedCount = optimisticSet.size;
  const totalCount = steps.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section aria-label="Compliance step progress" className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="bg-white border border-card-border rounded-2xl p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-gray-900">Steps completed</span>
          <span className="font-bold text-brand-600">{completedCount}/{totalCount}</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="text-xs text-green-700 font-medium mt-2">🎉 All steps complete!</p>
        )}
      </div>

      {/* Step list */}
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => {
          const done = optimisticSet.has(i);
          return (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => toggleStep(i)}
              aria-pressed={done}
              className={[
                "flex items-start gap-3 p-4 rounded-xl border text-left transition-all",
                done
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-card-border hover:border-gray-300",
              ].join(" ")}
            >
              {/* Checkbox indicator */}
              <span className={[
                "flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors",
                done ? "bg-green-600 border-green-600" : "border-gray-300",
              ].join(" ")} aria-hidden="true">
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className={`text-xs font-bold ${done ? "text-green-700" : "text-brand-600"}`}>
                    Step {step.stepNumber}
                  </span>
                  <span className="text-xs text-gray-400">·</span>
                  <time dateTime={step.dueDate} className="text-xs text-gray-500">
                    Due {new Date(step.dueDate + "T00:00:00").toLocaleDateString("en-AU", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </time>
                </div>
                <p className={`text-sm font-medium leading-snug ${done ? "line-through text-gray-400" : "text-gray-900"}`}>
                  {step.title}
                </p>
                {!done && (
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                    {step.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
