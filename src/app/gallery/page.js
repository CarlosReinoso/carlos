import fs from "fs";
import path from "path";
import Image from "next/image";

export default function GalleryPage() {
  // Read all webp files from the /public/gallery folder
  const galleryPath = path.join(process.cwd(), "public/gallery");
  const images = fs
    .readdirSync(galleryPath)
    .filter((file) => file.endsWith(".webp"));

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Title */}
      <h2 className="text-center font-sacramento text-4xl sm:text-5xl text-gray-900">
        Gallery
      </h2>
      <p className="text-center text-gray-600 mt-2">
        We all have a unique creative expression in this world, here is mine.
      </p>

      <div className="mt-8 mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 gap-4 grid-flow-dense auto-rows-[1fr]">
        {images
          .map((image) => {
            return {
              src: `/gallery/${image}`,
              title: image.includes("kingfisher")
                ? "Diving Kingfisher"
                : "Artwork",
              description: image.includes("kingfisher")
                ? "Painting of a diving kingfisher with bubbles embellished with silver leaf.\nOil and silver leaf on canvas.\n100 x 100cm"
                : "Oil on canvas",
              isTall: image.includes("tall") || image.includes("portrait"),
            };
          })
          .sort((a, b) => b.isTall - a.isTall) // Sort tall images first
          .map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group ${
                image.isTall ? "row-span-2" : "row-span-1"
              }`}
            >
              {/* Image */}
              <Image
                src={image.src}
                alt={image.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white p-4">
                  <h3 className="text-lg font-bold">{image.title}</h3>
                  <p className="text-sm whitespace-pre-line">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
