export interface AdminStats {
  users: {
    total: number;
    byRole: {
      free: number;
      paid_once: number;
      subscriber: number;
      admin: number;
    };
  };
  revenue: {
    totalPurchases: number;
    purchaseRevenueAUD: number;
    activeSubscriptions: number;
  };
  referrals: {
    totalClicks: number;
    topAgencies: Array<{ agency_name: string; clicks: number }>;
  };
  timelines: {
    total: number;
    last30Days: number;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

// ── Phase 4 acquisition analytics ─────────────────────────────────────────────

export interface AcquisitionStats {
  // Revenue
  /** AUD cents — subscriptions * 990 + b2b agencies * 29900 */
  mrr: number;
  /** Last 12 months, month = "YYYY-MM" */
  mrrHistory: Array<{ month: string; mrr: number }>;

  // Users
  totalUsers: number;
  newUsersLast7Days: number;
  /** Subscriptions cancelled in last 30 days */
  churnedLast30Days: number;
  /** Percentage 0-100 */
  churnRate: number;

  // Conversion funnel
  totalTimelines: number;
  /** One-time purchases + subscription starts */
  totalPurchases: number;
  /** Percentage */
  timelineToPaymentRate: number;
  avgDaysTimelineToPurchase: number;

  // Top origin countries (top 10)
  topOriginCountries: Array<{ country: string; count: number }>;

  // B2B / API
  apiUsageByPartner: Array<{
    agencyName: string;
    agencyId: string;
    requestCount: number;
  }>;
  whitelabelUsageByAgency: Array<{
    agencyName: string;
    agencyId: string;
    leadCount: number;
  }>;

  // Referrals
  referralClicksByAgency: Array<{
    agencyName: string;
    clicks: number;
    conversions: number;
  }>;
}
