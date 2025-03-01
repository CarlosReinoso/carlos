import { gelatoApiKey, gelatoStoreId } from "@/lib/constants";
import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  try {
    const queryParams = new URLSearchParams({
      order: "desc",
      orderBy: "createdAt",
      offset: "0",
      limit: "100",
    }).toString();

    // Fetch all products from Gelato API
    const productsResponse = await fetch(
      `https://ecommerce.gelatoapis.com/v1/stores/${gelatoStoreId}/products?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": gelatoApiKey,
        },
      }
    );

    if (!productsResponse.ok) {
      console.error(
        "Fetch failed:",
        productsResponse.status,
        await productsResponse.text()
      );
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch products" }),
        { status: productsResponse.status }
      );
    }

    const productsData = await productsResponse.json();
    console.log("🚀 ~ GET ~ productsData:", productsData);

    // Return the product list as received from the API (No modifications)
    return new NextResponse(JSON.stringify(productsData), {
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
