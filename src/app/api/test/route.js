import { NextResponse } from "next/server";

// export const fetchCache = "force-no-store";
// export async function GET() {

//   return NextResponse.json(
//     {
//       success: true,
//       message: "Testing API route",
//       timestamp: new Date().toISOString(),
//     },
//     { status: 200 }
//   );
// }
export const revalidate = 0;
export const dynamic = 'force-static'
export async function GET() {
  console.log("🚀 ~ GET ~ GET:TESSTTTT")
  return new Response("Cache Control example", {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=0",
      "CDN-Cache-Control": "public, s-maxage=0",
      "Vercel-CDN-Cache-Control": "public, s-maxage=0",
    },
  });
}
