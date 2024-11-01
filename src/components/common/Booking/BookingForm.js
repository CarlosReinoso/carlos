import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BookingCalendar from "./BookingCalendar";
import Button from "../Button";
import { useLoading } from "@/app/hooks/useLoading";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const BookingForm = () => {
  const [dates, setDates] = useState([]);
  const [error, setError] = useState("");

  const bookingFunction = async () => {
    const stripe = await stripePromise;

    const startDate = dates[0];
    const endDate = dates[1];

    // Check if start and end dates are the same
    if (startDate.toDateString() === endDate.toDateString()) {
      setError("Please select a valid range of dates");
      return;
    }

    // Calculate the difference in nights
    const differenceInNights =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    // Check if the range is less than 3 nights
    if (differenceInNights < 2) {
      setError("Please select a minimum of three nights");
      return;
    }

    setError(""); // Clear error if dates are valid

    // Proceed with creating a checkout session
    const res = await fetch("/api/w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dates }),
    });

    const session = await res.json();

    // Redirect to Stripe checkout
    await stripe.redirectToCheckout({ sessionId: session.sessionId });
  };

  // Use the custom hook to wrap the booking function
  const [handleBooking, loading] = useLoading(bookingFunction);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      
     
    </div>
  );
};

export default BookingForm;
