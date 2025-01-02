import { NextResponse } from "next/server";
import supabase from "@/services/supabase/setup";

export async function GET() {
  // Set headers to disable caching
  const responseHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  };

  console.log("🚀 ~ Cron endpoint triggered in production...");

  const { error } = await supabase
    .from("supabase_alive")
    .insert([{ created_at: new Date().toISOString().split("T")[0] }]);

  if (error) {
    console.error("Error logging keep-alive action:", error);
    return NextResponse.json(
      { success: false, error },
      { status: 500, headers: responseHeaders }
    );
  }

  return NextResponse.json(
    { success: true, message: "Keep-alive action logged." },
    { status: 200, headers: responseHeaders }
  );
}
