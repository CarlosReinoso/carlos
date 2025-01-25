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

    const currentDate = new Date();

    // Filter out events that are in the past
    const upcomingEvents = data.filter(
      (event) => new Date(event.event_date) >= currentDate
    );

    // Sort the remaining events by event_date
    const sortedData = upcomingEvents.sort(
      (a, b) => new Date(a.event_date) - new Date(b.event_date)
    );

    // Get the first upcoming event or return null if no events are found
    const firstEvent = sortedData.length > 0 ? sortedData[0] : null;

    return NextResponse.json(firstEvent, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: err.message },
      { status: 500 }
    );
  }
}
