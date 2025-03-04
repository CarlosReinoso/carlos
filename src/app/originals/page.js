"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import supabase from "@/services/supabase/setup";
import Typography from "@/components/common/Typography";

export default function OriginalsPage() {
  const [originals, setOriginals] = useState([]);
  console.log("🚀 ~ OriginalsPage ~ originals:", originals);

  useEffect(() => {
    async function fetchOriginals() {
      const { data, error } = await supabase
        .from("originals") // Fetch from the "originals" table
        .select("name, url, description, material, size");

      if (error) {
        console.error("Error fetching originals:", error);
      } else {
        setOriginals(data);
      }
    }

    fetchOriginals();
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Page Title */}
      <h2 className="text-center font-sacramento text-4xl sm:text-5xl text-gray-900">
        Originals.
      </h2>
      <p className="text-center text-gray-600 mt-4">
        Below are some original artworks for sale.
      </p>
      <p className="text-center text-gray-700 font-medium mt-2">
        If you are interested in purchasing these unique works or enquiring
        about a commission, please{" "}
        <a href="/contact" className="text-blue-600 underline">
          contact me directly
        </a>
        .
      </p>

      {/* Artwork Grid */}
      <div className="mt-8 mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {originals.map((artwork, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Image */}
            <div className="relative w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg group">
              <Image
                src={artwork.url}
                alt={artwork.name}
                width={400}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Text Info */}
            <Typography variant="h6" className="mt-4 font-semibold">
              {artwork.name}
            </Typography>
            <p className="text-gray-700 text-sm mt-2">
              {artwork.description || "No description available."}
            </p>
            <p className="text-gray-600 text-sm mt-1 italic">
              <strong>Material:</strong> {artwork.material || "Not specified"}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Size:</strong> {artwork.size || "Not specified"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
