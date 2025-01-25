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

    // Get the current date
    const currentDate = new Date();

    // Filter out events whose dates have passed, but keep events without an event_date
    const filteredEvents = data.filter((event) => {
      // If event_date is missing or null, keep the event
      if (!event.event_date) return true;

      // Otherwise, only keep events with a future or current date
      return new Date(event.event_date) >= currentDate;
    });

    return NextResponse.json(filteredEvents, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: err.message },
      { status: 500 }
    );
  }
}
