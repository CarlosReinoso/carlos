"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
    e.preventDefault();
    setLoading(true);

    const {
      name,
      surname,
      company,
      phone,
      email,
      website,
      address,
      note,
      slug,
    } = formData;

    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${surname};${name};;;
FN:${name} ${surname}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:;;${address};;;;
NOTE:${note}
END:VCARD
    `.trim();

    // Generate QR Code from link (e.g. /vcard/[slug])
    const cardLink = `https://carlosreinoso.co.uk/vcard/${slug}`;
    const qrDataUrl = await QRCode.toDataURL(cardLink);

    // Upload QR to Supabase Storage
    const filePath = `${slug}.png`;
    const { data: file, error: uploadError } = await supabase.storage
      .from("vcards")
      .upload(filePath, await fetch(qrDataUrl).then((r) => r.blob()), {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    const { data, error } = await supabase.from("vcards").insert([
      {
        name,
        surname,
        company,
        phone,
        email,
        website,
        address,
        note,
        slug,
        qr_url: filePath,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      router.push(`/vcard/${slug}`);
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
