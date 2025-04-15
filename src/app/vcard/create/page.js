"use client";

import VCardForm from "@/components/vcard/Form";
import { useRouter } from "next/navigation";

export default function CreateVCardPage() {
  const router = useRouter();

  const handleCreate = async (
    formData,
    { setFormError, setSlugError, slugRef }
  ) => {
    const res = await fetch("/api/vcard/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const { slug } = await res.json();
      router.push(`/vcard/${slug}`);
    } else if (res.status === 409) {
      setSlugError(true);
      slugRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const err = await res.json();
      setFormError(err?.error || "Something went wrong. Please try again.");
    }
  };

  return <VCardForm onSubmit={handleCreate} />;
}
