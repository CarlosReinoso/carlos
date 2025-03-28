"use client";

import supabase from "@/services/supabase/config";
import { useEffect, useState } from "react";

export default function AmaraImages() {
  const [images, setImages] = useState([]);
  console.log("images", images);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase.storage
        .from("images")
        .list("books/amara", {
          limit: 100,
        });
      if (data) {
        const sorted = data.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );

        setImages(sorted);
        console.log("Sorted images:", sorted);
      } else {
        console.error("Error fetching images:", error);
      }
      setLoading(false);
    }

    fetchImages();
  }, []);

  if (loading) {
    return <div className="text-white p-6">Loading images…</div>;
  }

  if (images.length === 0) {
    return (
      <div className="text-center text-red-500 p-10">
        No images found for Amara.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-2xl font-bold text-white">Amara</h2>
      <h5 className="text-second">Echoes of What Was Never Lost</h5>

      {images.map((url, index) => (
        <img
          key={index}
          src={`https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/images/books/amara/${url.name}`}
          alt={`Amara image ${index + 1}`}
          className="w-full max-w-md rounded shadow object-cover"
        />
      ))}
    </div>
  );
}
