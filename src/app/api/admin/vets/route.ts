import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/subscription";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/types/api";
import type { VetProfileRow, VetClinicRow, ProfileRow } from "@/types/database";

export interface AdminVetListItem {
  id: string;
  user_id: string;
  user_email: string;
  clinic_id: string | null;
  clinic_name: string | null;
  ahpra_number: string | null;
  daff_approved: boolean;
  verified_at: string | null;
  created_at: string;
}

function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json(
    { success: false, error: message, status } satisfies ApiErrorResponse,
    { status }
  );
}

/**
 * GET /api/admin/vets
 * Returns all vet profiles joined with clinic and user info. Admin only.
 * Supports ?verified=true|false filter.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // 1. Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return errorResponse("Authentication required", 401);
  }

  // 2. Admin role check
  try {
    await requireAdmin(user.id);
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e?.status === 403) {
      return errorResponse(e.message ?? "Admin access required", 403);
    }
    return errorResponse("Internal server error", 500);
  }

  // 3. Parse optional verified filter
  const { searchParams } = req.nextUrl;
  const verifiedParam = searchParams.get("verified");

  // 4. Fetch using service client
  try {
    const service = createServiceClient();

    let query = service
      .from("vet_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (verifiedParam === "true") {
      query = query.not("verified_at", "is", null);
    } else if (verifiedParam === "false") {
      query = query.is("verified_at", null);
    }

    const { data: vetProfiles, error: vetError } = await query;

    if (vetError) {
      return errorResponse("Failed to fetch vet profiles", 500);
    }

    const profiles = (vetProfiles ?? []) as VetProfileRow[];

    if (profiles.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      } satisfies ApiSuccessResponse<AdminVetListItem[]>);
    }

    // 5. Fetch clinics and user profiles in parallel
    const clinicIds = [...new Set(profiles.map((p) => p.clinic_id).filter(Boolean))] as string[];
    const userIds = profiles.map((p) => p.user_id);

    const [clinicsResult, usersResult] = await Promise.all([
      clinicIds.length > 0
        ? service.from("vet_clinics").select("id, name").in("id", clinicIds)
        : Promise.resolve({ data: [], error: null }),
      service.from("profiles").select("id, email").in("id", userIds),
    ]);

    const clinicMap = new Map<string, string>();
    for (const clinic of (clinicsResult.data ?? []) as Pick<VetClinicRow, "id" | "name">[]) {
      clinicMap.set(clinic.id, clinic.name);
    }

    const userEmailMap = new Map<string, string>();
    for (const profile of (usersResult.data ?? []) as Pick<ProfileRow, "id" | "email">[]) {
      userEmailMap.set(profile.id, profile.email);
    }

    // 6. Join data
    const result: AdminVetListItem[] = profiles.map((vp) => ({
      id: vp.id,
      user_id: vp.user_id,
      user_email: userEmailMap.get(vp.user_id) ?? "",
      clinic_id: vp.clinic_id,
      clinic_name: vp.clinic_id ? (clinicMap.get(vp.clinic_id) ?? null) : null,
      ahpra_number: vp.ahpra_number,
      daff_approved: vp.daff_approved,
      verified_at: vp.verified_at,
      created_at: vp.created_at,
    }));

    return NextResponse.json({
      success: true,
      data: result,
    } satisfies ApiSuccessResponse<AdminVetListItem[]>);
  } catch {
    return errorResponse("Internal server error", 500);
  }
}
