import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import cron from "node-cron";

let taskScheduled = false;

export async function GET() {
  if (!taskScheduled) {
    cron.schedule("0 0 9 * * *", async () => {
      console.log("🚀 ~ Scheduled task running...");

      const { error } = await supabase
        .from("supabase_alive")
        .insert([{ created_at: new Date().toISOString().split("T")[0] }]);

      if (error) {
        console.error("Error logging keep-alive action:", error);
      } else {
        console.log("Successfully logged keep-alive action.");
      }
    });

    taskScheduled = true; // Prevent multiple schedules
    console.log("Cron job scheduled.");
  }

  return NextResponse.json({ message: "Cron job initialized." });
}
