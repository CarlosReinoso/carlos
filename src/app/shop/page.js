"use client";
import { stripePublishableKey } from "@/lib/constants";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(stripePublishableKey);

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        amount: 9900, // $99.00 in cents
        currency: "usd",
        customerDetails: {
          name: "John Doe",
          email: "john@example.com",
        },
      }),
    });

    const { sessionId } = await res.json(); // Use sessionId here
    const stripe = await stripePromise;

    if (!sessionId) {
      console.error("🚀 ~ handleCheckout ~ sessionId is undefined");
      setLoading(false);
      return;
    }

    console.log("🚀 ~ handleCheckout ~ sessionId:", sessionId);

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) console.error("Stripe Checkout Error:", error.message);

    setLoading(false);
  };

  return (
    <div className="mt-48">
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
