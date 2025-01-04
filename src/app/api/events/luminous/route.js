import supabase from "@/services/supabase/setup";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all events with the specified title
    const { data, error } = await supabase
      .from("upcoming_events")
      .select("*")
      .eq("title", "Luminous Conscious Dance");

    if (error) {
      console.error("Error fetching events:", error.message);
      return NextResponse.json(
        { error: "Error fetching events", details: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          message: "No events found with the title 'Luminous Conscious Dance'",
        },
        { status: 404 }
      );
    }

    // Sort the results by event_date and pick the first one
    const sortedData = data.sort(
      (a, b) => new Date(a.event_date) - new Date(b.event_date)
    );
    const firstEvent = sortedData[0];

    return NextResponse.json(firstEvent, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: err.message },
      { status: 500 }
    );
  }
}
