import { baseUrl, stripeSecretKey } from "@/lib/constants";
import countriesDeliverable from "@/lib/countriesDeliverable";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(stripeSecretKey);

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("🚀 ~ POST ~ data:", data);

    const { product } = data;

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    // shipping_address_collection: {
    //   allowed_countries: countriesDeliverable,
    // },
    //   mode: "payment",
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: data.currency,
    //         product_data: {
    //           name: product.title, // ✅ Required
    //           description: `Variant: ${data.selectedVariant.title}`, // ✅ Show selected variant
    //           images: product.previewUrl ? [product.previewUrl] : [], // ✅ Show product image (if available)
    //         },
    //         unit_amount: data.amount, // Amount in cents
    //       },
    //       quantity: data.quantity,
    //     },
    //   ],
    //   success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${baseUrl}/shop`,
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: "carlosrewebs@gmail.com",
      shipping_address_collection: {
        allowed_countries: countriesDeliverable,
      },
      metadata: {
        name: "John Doe", // ✅ Prefilled name
        address_country: "GB", // ✅ Prefilled country (United Kingdom)
      },
      line_items: [
        {
          price_data: {
            currency: data.currency,
            product_data: {
              name: product.title, // ✅ Required
              description: `Variant: ${data.selectedVariant.title}`, // ✅ Show selected variant
              images: product.previewUrl ? [product.previewUrl] : [], // ✅ Show product image (if available)
            },
            unit_amount: data.amount, // Amount in cents
          },
          quantity: data.quantity,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
    });

    console.log("🚀 ~ Created Stripe session:", session.url);

    return new NextResponse(JSON.stringify({ url: session.url }), {
      status: 200,
    });
  } catch (error) {
    console.error("🚀 ~ Checkout session creation failed:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
