"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "../Button";

export default function Images({ project, beforeImages, afterImages }) {
  const allImages = [...beforeImages, ...afterImages];
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage =
    selectedIndex !== null ? allImages[selectedIndex] : null;

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <div className="mt-12">
      {allImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="cursor-pointer rounded-xl overflow-hidden relative w-full h-60 md:h-36"
            >
              <Image
                src={src}
                alt={`${project.title} - Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Full Image"
              fill
              className="object-contain"
            />

            {/* Navigation Buttons */}
            <Button
              arrow={false}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-3 py-1"
            >
              ‹
            </Button>
            <Button
              arrow={false}
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-3 py-1"
            >
              ›
            </Button>

            {/* Close Button */}
            <Button
              arrow={false}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              &times;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
