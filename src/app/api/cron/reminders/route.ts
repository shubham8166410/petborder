import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendDeadlineReminder } from "@/lib/email";
import type { TimelineStep } from "@/types/timeline";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * GET /api/cron/reminders
 * Called daily by Vercel Cron. Sends deadline reminder emails to users
 * with compliance steps due within the next 14 days that are not yet completed.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // Verify cron secret to prevent unauthorised invocations
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use untyped client for the complex join query
  const supabase = createServiceClient() as unknown as SupabaseClient;

  // Fetch all timelines with their user emails
  const { data: timelines, error } = await supabase
    .from("timelines")
    .select(`
      id,
      pet_breed,
      generated_steps,
      profiles!inner(email),
      timeline_progress(step_index)
    `);

  if (error) {
    console.error("[cron/reminders] Fetch failed:", error.message);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const now = Date.now();
  const fourteenDays = 14 * 24 * 60 * 60 * 1000;
  let sent = 0;

  for (const timeline of timelines ?? []) {
    const steps: TimelineStep[] = timeline.generated_steps?.steps ?? [];
    const completedIndices = new Set(
      (timeline.timeline_progress ?? []).map((p: { step_index: number }) => p.step_index)
    );

    const upcomingSteps = steps.filter((s, i) => {
      if (completedIndices.has(i)) return false;
      const due = new Date(s.dueDate + "T00:00:00").getTime();
      return due > now && due - now <= fourteenDays;
    });

    if (upcomingSteps.length === 0) continue;

    const email = (timeline.profiles as unknown as { email: string }).email;
    if (!email) continue;

    try {
      await sendDeadlineReminder({
        to: email,
        petName: timeline.pet_breed,
        upcomingSteps,
        timelineId: timeline.id,
      });
      sent++;
    } catch (err) {
      console.error(`[cron/reminders] Email failed for timeline ${timeline.id}:`, err);
    }
  }

  return NextResponse.json({ ok: true, sent });
}
