"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import supabase from "@/services/supabase/setup";
import Typography from "@/components/common/Typography";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from("gallery")
        .select("name, url, description, material, size, created_at");

      if (error) {
        console.error("Error fetching images:", error);
      } else {
        setImages(
          data.map((image) => ({
            src: image.url,
            title: image.name.replace(/-\d+\.webp$/, ""), // Clean filename
            description: image.description || "Oil on canvas",
            material: image.material || "Unknown material",
            size: image.size || "Size not specified",
          }))
        );
      }
    }

    fetchImages();
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Title */}
      <h2 className="text-center font-sacramento text-4xl sm:text-5xl text-gray-900">
        Gallery
      </h2>
      <p className="text-center text-gray-600 mt-2">
        We all have a unique creative expression in this world, here is mine.
      </p>

      {/* Image Grid */}
      <div className="mt-8 mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 gap-4 grid-flow-dense auto-rows-[1fr]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden group flex justify-center ${
              image.isTall ? "row-span-2" : "row-span-1"
            }`}
          >
            {/* Image */}
            <Image
              src={image.src}
              alt={image.title}
              width={500}
              height={500}
              className="w-auto h-auto object-cover"
              loading="lazy"
            />

            {/* Overlay - Hidden by default, shows on hover */}
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent px-4 py-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-[100%]">
              <Typography variant="h5" className="font-bold mb-4">
                {image.title}
              </Typography>
              <p className="text-md">{image.description}</p>
              <p className="text-md opacity-80 mt-4">{image.material}</p>
              <p className="text-md opacity-80">{image.size}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
