import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Next.js ISR: revalidate cached response every 24 hours on the server side
export const revalidate = 86400;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const type = req.nextUrl.searchParams.get("type");
  if (type !== "dog" && type !== "cat") {
    return NextResponse.json(
      { error: "type must be 'dog' or 'cat'" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("breeds")
    .select("name, banned, banned_note")
    .eq("pet_type", type)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch breeds" }, { status: 500 });
  }

  return NextResponse.json(data, {
    headers: {
      // Browser cache: serve from cache for 24h, then revalidate in background for up to 7 days
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
