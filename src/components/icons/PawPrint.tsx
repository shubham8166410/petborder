interface PawPrintProps {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

export function PawPrint({ className = "w-6 h-6", ...props }: PawPrintProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className}
      aria-hidden={props["aria-hidden"] ?? "true"}
    >
      {/* Central pad */}
      <ellipse cx="20" cy="28" rx="9" ry="7" />
      {/* Toe beans */}
      <circle cx="9"  cy="17" r="4.5" />
      <circle cx="17" cy="12" r="4" />
      <circle cx="23" cy="12" r="4" />
      <circle cx="31" cy="17" r="4.5" />
    </svg>
  );
}
