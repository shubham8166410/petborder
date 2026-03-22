import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-200 disabled:text-brand-600/50 focus-visible:ring-brand-600",
  secondary:
    "bg-white text-brand-600 border border-brand-600 hover:bg-brand-50 disabled:opacity-50 focus-visible:ring-brand-600",
  ghost:
    "bg-transparent text-brand-600 hover:bg-brand-50 disabled:opacity-50 focus-visible:ring-brand-600",
  cta: "bg-accent-500 text-white hover:bg-accent-600 disabled:bg-accent-100 disabled:text-accent-500/50 focus-visible:ring-accent-500",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-sm min-h-[36px]",
  md: "px-5 py-2.5 text-sm font-semibold min-h-[44px]",
  lg: "px-7 py-3.5 text-base font-semibold min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold rounded-xl",
        "transition-all duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
