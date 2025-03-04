"use client";
import { useState } from "react";

const BuyButton = ({ product, selectedVariant }) => {
  const [loading, setLoading] = useState(false);
  const handleBuyNow = async () => {
    if (!selectedVariant) {
      alert("Please select a size before proceeding.");
      return;
    }

    const quantity = parseInt(
      document.getElementById("quantityInput").value,
      10
    );
    if (isNaN(quantity) || quantity < 1) {
      alert("Please select a valid quantity.");
      return;
    }

    // Convert price to an integer (remove currency symbol and convert to pence)
    const priceInPence = selectedVariant.price * 100;
    
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          amount: priceInPence, // Stripe expects amount in cents
          currency: "gbp",
          quantity,
          selectedVariant, // Adjust as needed
        }),
      });

      const data = await response.json();
      console.log("🚀 ~ handleBuyNow ~ data:", data);
      if (data.url) {
        window.location.href = data.url;
        console.error("Error creating Stripe session:", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold py-3 rounded-lg transition disabled:opacity-50"
      onClick={handleBuyNow}
      disabled={loading}
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default BuyButton;
