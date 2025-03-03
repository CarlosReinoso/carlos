import { gelatoApiKey, gelatoStoreId } from "@/lib/constants.js";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { productId } = params;
  const updateData = await req.json(); // Extract body payload
  console.log("🚀 ~ PUT ~ updateData:", updateData);
  console.log("🚀 ~ PUT ~ productId:", productId);

  if (!productId || Object.keys(updateData).length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "Missing product ID or update data" }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://ecommerce.gelatoapis.com/v1/stores/${gelatoStoreId}/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": gelatoApiKey,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Update failed:", response.status, errorText);
      return new NextResponse(JSON.stringify({ error: errorText }), {
        status: response.status,
      });
    }

    const updatedProduct = await response.json();
    console.log("✅ Product Updated:", updatedProduct);

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
