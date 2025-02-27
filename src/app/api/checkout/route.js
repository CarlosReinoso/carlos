import { baseUrl, stripeSecretKey } from "@/lib/constants";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(stripeSecretKey);

export async function POST(req) {
  const { amount, currency, customerDetails } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: "Custom Product" },
            unit_amount: amount, // Amount in smallest currency unit (e.g., cents)
          },
          quantity: 1,
        },
      ],
      customer_email: customerDetails.email,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });
    console.log("🚀 ~ POST ~ session:", session);

    return new NextResponse(
      JSON.stringify({ sessionId: session.id }), // Return session.id here
      { status: 200 }
    );
  } catch (error) {
    console.error("🚀 ~ Checkout session creation failed:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
