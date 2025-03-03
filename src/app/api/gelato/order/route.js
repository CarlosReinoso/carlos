import { NextResponse } from "next/server";
import { gelatoOrderUrl, gelatoApiKey } from "@/lib/constants.js";

export const revalidate = 0;

export async function POST() {
  try {
    const response = await fetch(`https://order.gelatoapis.com/v4/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": gelatoApiKey,
      },
      body: JSON.stringify({
        orderType: "order",
        orderReferenceId: "test_order_001", // Your custom reference
        customerReferenceId: "test_customer_001",
        currency: "USD",
        items: [
          {
            itemReferenceId: "test_item_001",
            productUid:
              "fine_arts_poster_geo_simplified_product_12-0_ver_130x180-mm-5r_200-gsm-80lb-enhanced-uncoated",
            files: [
              {
                type: "default",
                url: "https://cdn-origin.gelato-api-dashboard.ie.live.gelato.tech/docs/sample.pdf", // Use your file URL
              },
            ],
            quantity: 1,
          },
        ],
        shipmentMethodUid: "express", // Change to "standard" if needed
        shippingAddress: {
          companyName: "Example Co.",
          firstName: "Jane",
          lastName: "Doe",
          addressLine1: "77 Faringford Road",
          addressLine2: "",
          city: "London",
          state: "GB",
          postcode: "e15 4df",
          country: "GB",
          email: "jrp.carlos@hotmail.com",
          phone: "1234567890",
        },
        returnAddress: {
          companyName: "Example Returns",
          addressLine1: "789 Return Road",
          addressLine2: "",
          city: "Brooklyn",
          state: "NY",
          postcode: "11201",
          country: "US",
          email: "returns@example.com",
          phone: "0987654321",
        },
        metadata: [
          { key: "orderSource", value: "development" },
          { key: "testOrder", value: "true" },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "Order creation failed:",
        response.status,
        await response.text()
      );
      return new NextResponse(
        JSON.stringify({ error: "Failed to create order" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
