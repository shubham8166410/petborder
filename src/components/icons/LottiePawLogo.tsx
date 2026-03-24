"use client";

import dynamic from "next/dynamic";

const CatLoveLogo = dynamic(
  () => import("@/components/icons/CatLoveLogo").then((m) => ({ default: m.CatLoveLogo })),
  { ssr: false }
);

export function LottiePawLogo({ size = 28 }: { size?: number }) {
  return <CatLoveLogo size={size} />;
}
