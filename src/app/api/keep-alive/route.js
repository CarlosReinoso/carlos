import { NextResponse } from "next/server";
// import supabase from "@/services/supabase/config";

export const revalidate = 0;
export async function GET() {
  console.log("🚀 ~ Cron endpoint triggered in production...");

  // const { error } = await supabase
  //   .from("supabase_alive")
  //   .insert([{ created_at: new Date().toISOString().split("T")[0] }]);

  // if (error) {
  //   console.error("Error logging keep-alive action:", error);
  //   return NextResponse.json({ success: false, error }, { status: 500 });
  // }

  return NextResponse.json(
    { success: true, message: "Keep-alive action logged." },
    { status: 200 }
  );
}
