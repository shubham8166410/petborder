import type { ReactNode } from "react";
import type { WarningSeverity } from "@/types/timeline";

interface AlertProps {
  severity: WarningSeverity;
  children: ReactNode;
  className?: string;
}

const styles: Record<WarningSeverity, { wrapper: string; iconPath: string; iconColor: string }> = {
  critical: {
    wrapper: "bg-red-50 border-red-200 text-red-800",
    iconColor: "text-red-500",
    iconPath: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  },
  warning: {
    wrapper: "bg-amber-50 border-amber-200 text-amber-800",
    iconColor: "text-amber-500",
    iconPath: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  },
  info: {
    wrapper: "bg-brand-50 border-brand-100 text-brand-700",
    iconColor: "text-brand-500",
    iconPath: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  },
  success: {
    wrapper: "bg-green-50 border-green-200 text-green-800",
    iconColor: "text-green-500",
    iconPath: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
};

const roleMap: Record<WarningSeverity, string> = {
  critical: "alert",
  warning: "alert",
  info: "status",
  success: "status",
};

export function Alert({ severity, children, className = "" }: AlertProps) {
  const { wrapper, iconPath, iconColor } = styles[severity];
  return (
    <div
      role={roleMap[severity]}
      className={`flex gap-3 items-start rounded-xl border px-4 py-3.5 text-sm ${wrapper} ${className}`}
    >
      <svg
        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
