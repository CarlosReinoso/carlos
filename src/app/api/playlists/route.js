import supabase from "@/services/supabase/setup"; // Ensure you have the Supabase client setup
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("playlists")
      .select("*")
      .order("number", { ascending: false }) // Order by highest number first
      .limit(4);
    console.log("🚀 ~ GET ~ data:", data)

    // Handle any errors
    if (error) {
      console.error("Error fetching data from spotlight table:", error.message);
      return NextResponse.json(
        { error: "Error fetching data", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return NextResponse.json(
      { error: "Unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
