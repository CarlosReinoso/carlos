"use client";
import "react-calendar/dist/Calendar.css";
import Typography from "./common/Typography";
import Button from "./common/Button";
import BookingCalendar from "./common/Booking/BookingCalendar";
import { useState } from "react";
import { useLoading } from "@/app/hooks/useLoading";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const BookingSection = () => {
  const [dates, setDates] = useState([]);
  console.log("🚀 ~ BookingSection ~ dates:", dates)
  const [error, setError] = useState("");

  const bookingFunction = async () => {
    const stripe = await stripePromise;

    const startDate = dates[0];
    const endDate = dates[1];

    if (startDate.toDateString() === endDate.toDateString()) {
      setError("Please select a valid range of dates");
      return;
    }

    const differenceInNights =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    if (differenceInNights < 3) {
      setError("Please select a minimum of three nights");
      return;
    }

    setError("");

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dates }),
    });

    const session = await res.json();

    await stripe.redirectToCheckout({ sessionId: session.sessionId });
  };

  const [handleBooking, loading] = useLoading(bookingFunction);
  return (
    <div className="m-6 mx-6 bg-gray-100 rounded-lg shadow-lg">
      <Typography variant="h4" className="text-center pt-4">
        Select Dates
      </Typography>
      <BookingCalendar
        selectedDates={dates}
        setSelectedDates={setDates}
        setError={setError}
      />
      <Button
        className="mb-2"
        loading={loading}
        onClick={handleBooking}
        buttonText="Reserve"
      />
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}{" "}
    </div>
  );
};

export default BookingSection;
