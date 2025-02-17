import supabase from "@/services/supabase/setup";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("upcoming_events")
      .select("*", { head: false })
      .neq("event_date", null);

    if (error) {
      console.error("Error fetching events:", error.message);
      return NextResponse.json(
        { error: "Error fetching events", details: error.message },
        {
          status: 500,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    }

    // Get the current date and force UTC to ensure consistency
    const currentDate = new Date().toISOString();

    // Filter out events whose dates have passed, but keep events without an event_date
    const filteredEvents = data.filter((event) => {
      if (!event.event_date) return true;
      return new Date(event.event_date).toISOString() >= currentDate;
    });

    return NextResponse.json(filteredEvents, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: err.message },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  }
}
/* If you're still having issues, you can add a timestamp to your API request URL as a query parameter:

javascriptCopyfetch(`/api/events?t=${Date.now()}`)
These changes should ensure you always get the current date in both development and production environments without needing to manually purge the cache.

*/