interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number; // 1-indexed
  labels?: string[];
}

export function StepIndicator({ totalSteps, currentStep, labels }: StepIndicatorProps) {
  return (
    <nav aria-label="Form progress" className="flex items-start justify-center gap-0 select-none">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;
        const label = labels?.[i] ?? `Step ${step}`;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`${label}${isCompleted ? " — completed" : isCurrent ? " — current step" : ""}`}
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold",
                  "transition-all duration-200 ring-2 ring-offset-2",
                  isCompleted
                    ? "bg-brand-600 text-white ring-brand-600"
                    : isCurrent
                    ? "bg-brand-600 text-white ring-brand-600 shadow-md"
                    : "bg-white text-gray-400 ring-card-border",
                ].join(" ")}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : step}
              </div>
              {/* Label */}
              <span className={[
                "text-xs font-medium whitespace-nowrap",
                isCurrent ? "text-brand-600" : isCompleted ? "text-brand-600" : "text-gray-400",
              ].join(" ")}>
                {label}
              </span>
            </div>

            {/* Connector line */}
            {step < totalSteps && (
              <div
                aria-hidden="true"
                className={[
                  "h-0.5 w-10 sm:w-16 mx-1 mb-5 transition-colors duration-300",
                  isCompleted ? "bg-brand-600" : "bg-card-border",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
