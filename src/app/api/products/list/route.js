import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const revalidate = 86400; // Cache for 1 day

export async function GET() {
  try {
    // Load dummy data from the `data.json` file
    const filePath = path.join(process.cwd(), "data.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const dummyData = JSON.parse(fileContent);

    return new NextResponse(JSON.stringify(dummyData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🚀 Error Loading Dummy Data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to load dummy data" }),
      { status: 500 }
    );
  }
}
