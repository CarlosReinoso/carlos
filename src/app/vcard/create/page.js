"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVCard() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    note: "",
    slug: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    console.log("🚀 ~ handleSubmit ~ e:", e)
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/vcard/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("🚀 ~ handleSubmit ~ res:", res)

    if (res.ok) {
      const { slug } = await res.json();
      router.push(`/vcard/${slug}`);
    } else {
      const err = await res.json();
      console.error("Failed to create vCard:", err?.error || "Unknown error");
      alert("There was an error creating the vCard. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Create Your vCard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["slug", "Unique URL Slug"],
          ["name", "First Name"],
          ["surname", "Last Name"],
          ["company", "Company"],
          ["phone", "Phone"],
          ["email", "Email"],
          ["website", "Website"],
          ["address", "Address"],
          ["note", "Note"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              required
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 bg-[#1A1B1F] border border-[#4A4A4A] rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#FF6C60] rounded font-semibold text-black hover:bg-[#ff857a] transition"
        >
          {loading ? "Creating..." : "Create vCard"}
        </button>
      </form>
    </div>
  );
}
