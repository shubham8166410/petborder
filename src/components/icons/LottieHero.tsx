"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import cardboardDog from "@/assets/animations/cardboard-dog.json";
import { PetPassportIllustration } from "./PetPassportIllustration";

interface LottieHeroProps {
  className?: string;
}

export function LottieHero({ className }: LottieHeroProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(0.85);
  }, []);

  try {
    return (
      <div
        className={className}
        role="img"
        aria-label="Animated illustration of a dog with a cardboard box, ready to travel to Australia"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={cardboardDog}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  } catch {
    return <PetPassportIllustration className={className} />;
  }
}
