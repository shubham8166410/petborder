"use client";

import Lottie from "lottie-react";
import catPawLoading from "@/assets/animations/cat-paw-loading.json";

interface CatLoveLogoProps {
  size?: number;
  className?: string;
}

export function CatLoveLogo({ size = 36, className }: CatLoveLogoProps) {
  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      className={className}
      aria-hidden="true"
    >
      <Lottie
        animationData={catPawLoading}
        loop
        autoplay
        style={{ width: "100%", height: "100%", filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}
