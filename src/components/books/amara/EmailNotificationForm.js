"use client";

import { useState } from "react";
import supabase from "@/services/supabase/config"; // optional if you're hooking to Supabase

export default function EmailNotificationForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrorMessage("");
    setLoading(true);

    const { error } = await supabase.from("email_subscriptions").insert([
      {
        email,
        tags: ["amara"],
      },
    ]);

    if (!error) {
      setSuccess(true);
      setEmail("");
    } else {
      if (error.code === "23505") {
        // Duplicate key error
        setErrorMessage("You’ve already subscribed to Amara updates.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
        console.error("Supabase error:", error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-black/40 rounded space-y-4">
      <h5 className="text-white text-center font-semibold text-lg underline decoration-cyan-400 underline-offset-4">
        Get updated when the latest chapter drops!
      </h5>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-center gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-3 rounded-full bg-white text-black placeholder-gray-500 border border-white/20 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            "Saving..."
          ) : (
            <>
              Notify Me <span className="text-xl">→</span>
            </>
          )}
        </button>
      </form>

      {success && (
        <p className="text-green-400 text-sm text-center">
          Success! You’ll be notified 🌟
        </p>
      )}
      {errorMessage && (
        <p className="text-orange-400 text-sm text-center">{errorMessage}</p>
      )}
    </div>
  );
}
