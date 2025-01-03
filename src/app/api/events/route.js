import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  console.log("🚀 ~ GET ~ GET:TESSTTTT");
  return new NextResponse("Cache Control example", {
    status: 200,
  });
}
