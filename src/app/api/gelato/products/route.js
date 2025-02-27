import { gelatoApiKey, gelatoStoreId } from "@/lib/constants";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {

    const queryParams = new URLSearchParams({
      order: "desc",
      orderBy: "createdAt",
      offset: "0",
      limit: "100",
    }).toString();

    const response = await fetch(
      `https://ecommerce.gelatoapis.com/v1/stores/${gelatoStoreId}/products?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": gelatoApiKey,
        },
      }
    );

    if (!response.ok) {
      console.error("Fetch failed:", response.status, await response.text());
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch products" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🚀 ~ GET ~ error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
