interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({ label = "Loading…", size = "md" }: LoadingSpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-3">
      <div
        aria-hidden="true"
        className={`${sizeClasses[size]} animate-spin rounded-full border-teal-200 border-t-teal-600`}
      />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
