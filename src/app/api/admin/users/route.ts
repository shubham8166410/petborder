import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/subscription";
import type { ApiErrorResponse } from "@/types/timeline";
import type { AdminUser } from "@/types/admin";

const PAGE_SIZE = 20;

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code } satisfies ApiErrorResponse, {
    status,
  });
}

/** GET /api/admin/users — returns paginated list of users. Admin only. */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // 1. Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return errorResponse("Authentication required", "UNAUTHENTICATED", 401);
  }

  // 2. Admin role check
  try {
    await requireAdmin(user.id);
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e?.status === 403) {
      return errorResponse(
        e.message ?? "Admin access required",
        "FORBIDDEN",
        403
      );
    }
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }

  // 3. Validate query params
  const { searchParams } = req.nextUrl;
  const rawPage = searchParams.get("page");

  const parsed = querySchema.safeParse(
    rawPage !== null ? { page: rawPage } : {}
  );

  if (!parsed.success) {
    return errorResponse(
      "Invalid page parameter. Must be a positive integer.",
      "VALIDATION_ERROR",
      400
    );
  }

  const { page } = parsed.data;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // 4. Fetch users using service client
  try {
    const service = createServiceClient();

    const { data, count, error } = await service
      .from("profiles")
      .select("id, email, role, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return errorResponse("Failed to fetch users", "DB_ERROR", 500);
    }

    const users = (data ?? []) as AdminUser[];

    return NextResponse.json({
      users,
      total: count ?? 0,
      page,
      pageSize: PAGE_SIZE,
    });
  } catch {
    return errorResponse("Internal server error", "INTERNAL_ERROR", 500);
  }
}
