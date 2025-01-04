import supabase from "@/services/supabase/setup";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  try {
    const { data, error } = await supabase.from("upcoming_events").select("*");

    if (error) {
      console.error("Error fetching events:", error.message);
      return NextResponse.json(
        { error: "Error fetching events", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: err.message },
      { status: 500 }
    );
  }
}
