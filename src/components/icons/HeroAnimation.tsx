"use client";

import dynamic from "next/dynamic";
import { PetPassportIllustration } from "./PetPassportIllustration";

const LottieHero = dynamic(
  () => import("./LottieHero").then((m) => m.LottieHero),
  {
    ssr: false,
    loading: () => (
      <PetPassportIllustration className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]" />
    ),
  }
);

export function HeroAnimation({ className }: { className?: string }) {
  return <LottieHero className={className} />;
}
