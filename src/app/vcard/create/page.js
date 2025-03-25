"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import VCardText from "@/components/vcard/VCardText";

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

  const slugRef = useRef(null);
  const [slugError, setSlugError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const requiredFields = ["slug", "name", "surname", "phone", "email"];

  const handleChange = (e) => {
    setSlugError(false);
    setFormError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSlugError(false);
    setFormError(null);

    const res = await fetch("/api/vcard/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const { slug } = await res.json();
      router.push(`/vcard/${slug}`);
    } else if (res.status === 409) {
      setSlugError(true);
      setLoading(false);
      slugRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    } else {
      const err = await res.json();
      console.error("Failed to create vCard:", err?.error || "Unknown error");
      setFormError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Create Your <VCardText />
      </h1>

      {formError && (
        <div className="bg-red-500/10 text-red-300 border border-red-500 rounded p-4 mb-4">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["slug", "Unique Handle"],
          ["name", "First Name"],
          ["surname", "Last Name"],
          ["company", "Company"],
          ["phone", "Phone"],
          ["email", "Email"],
          ["website", "Website"],
          ["address", "Address"],
          ["note", "Note"],
        ].map(([key, label]) => {
          const isRequired = requiredFields.includes(key);
          const ref = key === "slug" ? slugRef : null;

          return (
            <div key={key} ref={ref}>
              <label className="block text-sm font-medium mb-1">
                {label}
                {isRequired && <span className="text-third ml-1">*</span>}
                {key === "address" && (
                  <span
                    className="ml-2 text-xs text-gray-400 cursor-help"
                    title="perhaps only your city"
                  >
                    (?)
                  </span>
                )}
              </label>
              <input
                name={key}
                required={isRequired}
                value={formData[key]}
                onChange={handleChange}
                className={`w-full p-2 rounded bg-[#1A1B1F] border ${
                  slugError && key === "slug"
                    ? "border-red-500"
                    : "border-[#4A4A4A]"
                }`}
              />
              {slugError && key === "slug" && (
                <p className="text-sm text-red-400 mt-1">
                  That slug is already taken. Try another one.
                </p>
              )}
            </div>
          );
        })}

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
