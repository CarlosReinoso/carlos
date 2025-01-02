import { NextResponse } from "next/server";

export async function GET() {
  console.log("🚀 ~ GET ~ GET:TESTTTT!!");

  return NextResponse.json(
    { success: true, message: "Testing" },
    { status: 200 }
  );
}
