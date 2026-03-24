import { PetBorderLogo } from "@/components/ui/PetBorderLogo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface gap-6">
      <PetBorderLogo size="xl" showWordmark={true} />
      <p className="text-sm text-gray-400 font-medium tracking-wide">
        Getting your pet&apos;s travel plan ready&hellip;
      </p>
    </div>
  );
}
