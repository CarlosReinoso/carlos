"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import BackButton from "@/components/common/BackButton";
import { EMAIL, ETSY_URL } from "@/util/constants";

export default function Paintings() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/paintings");
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDoubleClick = (url) => {
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 ">
        <div className="flex justify-between items-center mb-8">
          <BackButton to="/" />
          <h1 className="text-4xl font-extrabold text-black text-center flex-grow">
            Paintings
          </h1>
          <div className="w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <BackButton to="/" />
        <h1 className="text-4xl font-extrabold text-black text-center flex-grow">
          Paintings
        </h1>
        <div className="w-16"></div>
      </div>
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="overflow-hidden flex-grow cursor-pointer"
              onDoubleClick={() => handleDoubleClick(image.src)}
            >
              <Image
                src={image.src}
                alt={`Painting ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-auto img-shadow"
                placeholder="blur"
                blurDataURL="image-loading-placeholder.json"
              />
            </div>
            <Button
              buttonText="Buy Original"
              buttonUrl={`mailto:${EMAIL}`}
              className="mt-4"
            />
            <Button buttonText="Buy Print" 
            buttonUrl={ETSY_URL}
            className="mt-4"
            theme="secondary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
