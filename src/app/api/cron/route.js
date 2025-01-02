import { NextResponse } from "next/server";
import supabase from "@/services/supabase/setup";

export async function GET() {
  console.log("🚀 ~ Keep-alive API triggered...");

  const { error } = await supabase
    .from("supabase_alive")
    .insert([{ created_at: new Date().toISOString().split("T")[0] }]);

  if (error) {
    console.error("Error logging keep-alive action:", error);
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true, message: "Keep-alive action logged." });
}
