import { NextResponse } from "next/server";
import supabase from "@/services/supabase/setup";

export const revalidate = 0;
export const dynamic = 'force-static'
export async function GET() {
  // Set headers to disable caching
  const responseHeaders = {
    "Cache-Control": "public, s-maxage=1",
    "CDN-Cache-Control": "public, s-maxage=1",
    "Vercel-CDN-Cache-Control": "public, s-maxage=1",
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
