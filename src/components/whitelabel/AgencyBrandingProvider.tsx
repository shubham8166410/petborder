"use client";

import { createContext, useContext } from "react";

export interface AgencyBranding {
  name: string;
  logoUrl: string | null;
  primaryColour: string; // hex, e.g. "#1B4F72"
  secondaryColour: string | null;
  contactEmail: string | null;
  slug: string;
}

export const AgencyBrandingContext = createContext<AgencyBranding | null>(null);

interface AgencyBrandingProviderProps {
  branding: AgencyBranding;
  children: React.ReactNode;
}

export function AgencyBrandingProvider({ branding, children }: AgencyBrandingProviderProps) {
  return (
    <AgencyBrandingContext.Provider value={branding}>
      {children}
    </AgencyBrandingContext.Provider>
  );
}

export function useAgencyBranding(): AgencyBranding {
  const ctx = useContext(AgencyBrandingContext);
  if (!ctx) {
    throw new Error("useAgencyBranding must be used within an AgencyBrandingProvider");
  }
  return ctx;
}
