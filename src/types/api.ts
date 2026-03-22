import type { AgencyLeadStatus, VetProfileRow, VetClinicRow } from "./database";

// ── Public API types ──────────────────────────────────────────────────────────

/** Returned once on API key creation — never retrievable again */
export interface ApiKeyDisplay {
  id: string;
  name: string;
  /** Full raw key shown only at creation time. Format: cpk_<32-hex-chars> */
  key: string;
  created_at: string;
}

/** Safe representation for listing — raw key and hash are never included */
export interface ApiKeyListItem {
  id: string;
  name: string;
  /** First 8 chars of the raw key, for user identification */
  key_prefix: string;
  last_used_at: string | null;
  request_count: number;
  is_active: boolean;
  agency_id: string | null;
  created_at: string;
}

// ── Agency lead types ─────────────────────────────────────────────────────────

export interface AgencyLeadListItem {
  id: string;
  agency_id: string;
  timeline_id: string | null;
  pet_owner_email: string;
  pet_owner_name: string | null;
  status: AgencyLeadStatus;
  notes: string | null;
  created_at: string;
}

export interface AgencyLeadUpdateBody {
  status?: AgencyLeadStatus;
  notes?: string;
}

// ── Vet portal types ──────────────────────────────────────────────────────────

/** Vet profile joined with clinic details for portal display */
export interface VetProfileWithClinic extends VetProfileRow {
  clinic: VetClinicRow | null;
}

export interface VetRegistrationBody {
  clinic_id: string;
  ahpra_number: string;
}

// ── API response envelope ─────────────────────────────────────────────────────

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  /** HTTP status code — included in body for API consumers who parse JSON only */
  status: number;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
