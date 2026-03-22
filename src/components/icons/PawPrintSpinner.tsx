"use client";

import { useState, useEffect } from "react";
import { PawPrint } from "./PawPrint";

const MESSAGES = [
  "Checking DAFF requirements…",
  "Identifying your country group…",
  "Calculating your timeline…",
  "Setting exact compliance dates…",
  "Almost there…",
];

export function PawPrintSpinner() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={MESSAGES[msgIndex]}
      className="flex flex-col items-center gap-5 py-8"
    >
      {/* Bouncing paw */}
      <PawPrint
        className="w-14 h-14 text-accent-500 animate-paw-bounce"
        aria-hidden="true"
      />

      {/* Cycling status message */}
      <p
        key={msgIndex}
        className="text-sm font-medium text-brand-600 animate-paw-message"
      >
        {MESSAGES[msgIndex]}
      </p>

      {/* Dot trail */}
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-500 opacity-60"
            style={{ animation: `paw-bounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
