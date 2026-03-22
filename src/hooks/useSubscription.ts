"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserRole, SubscriptionStatus } from "@/types/subscription";
import type { SubscriptionStatusResponse } from "@/app/api/subscription/status/route";

export interface UseSubscriptionResult {
  role: UserRole;
  subscriptionStatus: SubscriptionStatus | null;
  currentPeriodEnd: string | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useSubscription(): UseSubscriptionResult {
  const [state, setState] = useState<Omit<UseSubscriptionResult, "refresh">>({
    role: "free",
    subscriptionStatus: null,
    currentPeriodEnd: null,
    loading: true,
    error: null,
  });

  const fetchStatus = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch("/api/subscription/status");
      if (!res.ok) {
        // 401 = not logged in — treat as free tier, not an error
        if (res.status === 401) {
          setState({ role: "free", subscriptionStatus: null, currentPeriodEnd: null, loading: false, error: null });
          return;
        }
        throw new Error(`Status ${res.status}`);
      }
      const data: SubscriptionStatusResponse = await res.json();
      setState({
        role: data.role,
        subscriptionStatus: data.subscriptionStatus,
        currentPeriodEnd: data.currentPeriodEnd,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load subscription status",
      }));
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    // Re-fetch on window focus so status stays fresh after Stripe redirect
    const handleFocus = () => { fetchStatus(); };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchStatus]);

  return { ...state, refresh: fetchStatus };
}
