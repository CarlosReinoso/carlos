import { gelatoApiKey, gelatoStoreId } from "@/lib/constants";
import { NextResponse } from "next/server";

export const revalidate = 0; // Cache for 30 days (30 * 24 * 60 * 60 seconds)

export async function GET(req, { params }) {
  const { productId } = params;
  console.log("🚀 ~ GET ~ productId:", productId);

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "Missing product ID" }), {
      status: 400,
    });
  }

  try {
    // Correct API endpoint
    const productsResponse = await fetch(
      `https://ecommerce.gelatoapis.com/v1/stores/${gelatoStoreId}/products/${productId}`,
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
        JSON.stringify({ error: "Failed to fetch product" }),
        { status: productsResponse.status }
      );
    }

    const productData = await productsResponse.json();
    console.log("🚀 ~ GET ~ productData:", productData);

    // Return the product data as received from Gelato API (No modifications)
    return new NextResponse(JSON.stringify(productData), {
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

// -----------------------------

export async function PUT(req, { params }) {
  const { productId } = params;
  const { title } = await req.json(); // Extract title from request body

  console.log("🚀 Updating product title:", productId, title);

  if (!productId || !title) {
    return new NextResponse(
      JSON.stringify({ error: "Missing product ID or title" }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://ecommerce.gelatoapis.com/v1/stores/${gelatoStoreId}/products/${productId}`,
      {
        method: "PUT", // Change from PATCH to PUT
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": gelatoApiKey,
        },
        body: JSON.stringify({ title }), // Send updated title
      }
    );

    if (!response.ok) {
      console.error(
        "❌ Update failed:",
        response.status,
        await response.text()
      );
      return new NextResponse(
        JSON.stringify({ error: "Failed to update product title" }),
        { status: response.status }
      );
    }

    const updatedProduct = await response.json();
    console.log("✅ Product Title Updated:", updatedProduct);

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}




