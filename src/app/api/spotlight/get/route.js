import supabase from "@/services/supabase/setup"; // Ensure you have the Supabase client setup
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  try {
    // Fetch the latest 10 entries from the spotlight table sorted by created_at
    const { data, error } = await supabase
      .from("spotlight")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    // Handle any errors
    if (error) {
      console.error("Error fetching data from spotlight table:", error.message);
      return NextResponse.json(
        { error: "Error fetching data", details: error.message },
        { status: 500 }
      );
    }

    // Filter the data to get the latest entry for each position (1, 2, and 3)
    const latestByPosition = [1, 2, 3].map((position) =>
      data.find((item) => item.position === position)
    );

    // Remove any undefined entries (in case a position is missing)
    const filteredData = latestByPosition.filter((item) => item);

    // Return the filtered data
    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
