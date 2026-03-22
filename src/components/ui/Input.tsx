import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  listId?: string;
}

export function Input({ label, error, hint, id, listId, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
          {props.required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <input
        id={id}
        list={listId}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={[
          "w-full px-4 py-3 rounded-xl border text-gray-900 text-sm placeholder-gray-400",
          "transition-colors duration-150 min-h-[48px]",
          "focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent",
          error
            ? "border-red-400 bg-red-50"
            : "border-card-border bg-white hover:border-gray-400",
          className,
        ].join(" ")}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-gray-500">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
