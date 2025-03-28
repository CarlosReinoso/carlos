import { NextResponse } from "next/server";
import supabase from "@/services/supabase/config";

export const revalidate = 0;

// GET: Return all feature counters
export async function GET() {
  const { data, error } = await supabase
    .from("features")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
}

export async function POST(req) {
  const { field } = await req.json();

  console.log("🚀 ~ POST ~ field:", field);
  // Simple safety check
  const allowedFields = ["amara_next_chapter", "amara_comment"];
  if (!allowedFields.includes(field)) {
    return NextResponse.json(
      { success: false, message: "Invalid field name." },
      { status: 400 }
    );
  }

  const { error } = await supabase.rpc("increment_feature", {
    field_name: field,
  });

  if (error) {
    console.error("Error incrementing feature:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json(
    { success: true, message: `Feature ${field} incremented.` },
    { status: 200 }
  );
}
