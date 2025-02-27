// src/lib/gelato/placeOrder.js

import { gelatoApiKey } from "../constants";

export async function placeOrder(orderData) {
  try {
    const response = await fetch(`https://order.gelatoapis.com/v4/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": gelatoApiKey,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      console.error(
        "Order creation failed:",
        response.status,
        await response.text()
      );
      throw new Error("Failed to create order");
    }

    const data = await response.json();
    console.log("✅ Order successfully placed:", data);
    return data;
  } catch (error) {
    console.error("❌ Error placing order:", error);
    throw error;
  }
}
