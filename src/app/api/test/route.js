import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Testing API route",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
