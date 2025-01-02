import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🚀 ~ GET ~ TEST: Function triggered at", new Date());

    return NextResponse.json(
      {
        success: true,
        message: "Testing API route",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the full error stack for debugging
    console.error("🚀 ~ GET ~ error:", error.stack || error.message || error);

    // Send a secure and informative error response
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
