"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import catPawLoading from "@/assets/animations/cat-paw-loading.json";

const MESSAGES = [
  "Checking DAFF requirements…",
  "Calculating your timeline…",
  "Estimating compliance dates…",
  "Almost there…",
];

interface LottiePawSpinnerProps {
  /** When true shows the full loading screen with cycling messages (form submission). Default: false */
  withMessages?: boolean;
  /** Size in pixels. Default: 120 */
  size?: number;
  className?: string;
}

export function LottiePawSpinner({
  withMessages = false,
  size = 120,
  className,
}: LottiePawSpinnerProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!withMessages) return;
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [withMessages]);

  const animation = (
    <div
      style={{ width: size, height: size }}
      className={className}
      role="status"
      aria-label={withMessages ? MESSAGES[msgIndex] : "Loading…"}
    >
      <Lottie
        animationData={catPawLoading}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );

  if (!withMessages) return animation;

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16">
      {animation}
      <p
        key={msgIndex}
        className="text-sm font-medium text-brand-600 animate-fade-up"
        aria-live="polite"
      >
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
}
