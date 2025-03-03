// src/app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripeSecretKey, stripeWebhookSignature } from "@/lib/constants.js";
import { placeOrder } from "@/lib/gelato/placeOrder";

const stripe = new Stripe(stripeSecretKey);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSignature);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("🚀 ~ POST ~ session:", session);

    const { name = "", address = {}, email } = session.customer_details || {};
    const [firstName = "First", lastName = "Last"] =
      name.split(" ").length > 1 ? name.split(" ") : [name, ""];

    const orderData = {
      orderType: "order",
      orderReferenceId: session.id, // Stripe session ID
      customerReferenceId: session.customer, // Stripe customer ID
      currency: session.currency.toUpperCase(),
      items: [
        {
          itemReferenceId: "item_001", // Replace with your reference logic if needed
          productUid:
            "fine_arts_poster_geo_simplified_product_12-0_ver_130x180-mm-5r_200-gsm-80lb-enhanced-uncoated",
          files: [
            {
              type: "default",
              url: "https://cdn-origin.gelato-api-dashboard.ie.live.gelato.tech/docs/sample.pdf", // Replace with actual file URL if dynamic
            },
          ],
          quantity: 1, // You can dynamically set this if needed
        },
      ],
      shipmentMethodUid: "express",
      shippingAddress: {
        firstName: firstName || "First",
        lastName: lastName || "Last",
        addressLine1: address.line1 || "Unknown Address",
        addressLine2: address.line2 || "",
        city: address.city || "Unknown City",
        state: address.state || "",
        postCode: address.postal_code || "00000",
        country: address.country || "US",
        email: email || "no-email@example.com",
        phone: "1234567890", // Stripe session doesn't provide phone, you can collect this in the checkout session if needed
      },
      metadata: [
        { key: "stripePaymentIntent", value: session.payment_intent },
        { key: "stripeSessionId", value: session.id },
        { key: "paymentStatus", value: session.payment_status },
      ],
    };

    try {
      const orderResponse = await placeOrder(orderData);
      console.log("✅ Gelato order placed:", orderResponse);
    } catch (error) {
      console.error("❌ Failed to place Gelato order:", error);
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
