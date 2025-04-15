"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import VCardForm from "@/components/vcard/Form";
import supabase from "@/services/supabase/config";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { generateAndUploadQR } from "@/lib/vcard/generateAndUploadQR";

export default function UpdateVCardPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVCard() {
      const { data, error } = await supabase
        .from("vcards")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        console.error("vCard fetch error:", error);
        setInitialData(null);
      } else {
        setInitialData(data);
      }

      setLoading(false);
    }

    if (slug) {
      fetchVCard();
    }
  }, [slug]);

  const handleUpdate = async (formData, { setFormError }) => {
    try {
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

      const oldQrUrl = initialData?.qr_url;
      const oldPath = oldQrUrl?.split("/images/vcards/")[1];

      if (oldPath) {
        const { error: deleteError } = await supabase.storage
          .from("images")
          .remove([`vcards/${oldPath}`]);

        if (deleteError) {
          console.warn("Failed to delete old QR image:", deleteError);
        }
      }

      const qr_url = await generateAndUploadQR({
        name,
        surname,
        company,
        phone,
        email,
        website,
        address,
        note,
        slug,
      });

      const { error } = await supabase
        .from("vcards")
        .update({
          name,
          surname,
          company,
          phone,
          email,
          website,
          address,
          note,
          qr_url,
          updated_at: new Date(),
        })
        .eq("slug", slug);

      if (error) {
        console.error("Supabase update error:", error);
        setFormError("Failed to update vCard.");
        return;
      }

      router.push(`/vcard/${slug}`);
    } catch (err) {
      console.error("Unexpected update error:", err);
      setFormError("An unexpected error occurred.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!initialData)
    return <p className="text-white text-center">vCard not found.</p>;

  return (
    <VCardForm
      initialData={initialData}
      onSubmit={handleUpdate}
      submitLabel="Update vCard"
      showTitle={false}
    />
  );
}
