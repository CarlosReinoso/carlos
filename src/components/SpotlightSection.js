"use client";
import { useState, useEffect } from "react";
import Typography from "./common/Typography";
import SVGWave from "./common/SVGWave";

const images = [
  { src: "/homepage/strawberry-moon.jpg", name: "Carlos Reinoso" },
  { src: "/homepage/delic-moon.jpg", name: "Person 2" },
  { src: "/homepage/moon-dance.jpg", name: "Person 3" },
  // Add more image objects as needed
];

const SpotlightSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  console.log("🚀 ~ SpotlightSection ~ currentImage:", currentImage);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("🚀 ~ SpotlightSection ~ currentIndex:", currentIndex);

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    setCurrentImage(images[currentIndex]);
  }, [currentIndex]);

  return (
    <div>
      <div className="relative h-[105vh] 2xl:h-[115vh] bg-[url('/homepage/delic-moon.jpg')] bg-cover bg-center bg-black bg-opacity-50 bg-blend-overlay">
        {/* SVGWave at the top with lower z-index */}
        <SVGWave
          style={{
            transform: "scale(-1, -1) translateY(0.2px)",
          }}
        />

        <Typography
          variant="h2"
          className="font-monoton text-shadow text-center"
        >
          This Month's Spotlight!
        </Typography>

        <div className="flex justify-center w-full relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
            {images.map((image, index) => (
              <div key={index} className="text-center">
                <div className="relative cursor-pointer w-64 sm:w-80 h-64 sm:h-80 mx-auto overflow-hidden rounded-full">
                  <img
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-full shadow-md"
                    onClick={() => openModal(image)}
                  />
                  {/* Name Overlay at the Bottom */}
                  <div className="font-neucha absolute bottom-0 w-full bg-primary bg-opacity-70 text-white text-lg font-semibold py-5">
                    {image.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="relative bg-white p-4 rounded shadow-lg max-w-4xl w-full flex"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={showPreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
              >
                &larr;
              </button>
              <div className="w-1/2 p-2">
                <img
                  src={currentImage.src}
                  alt="Fullscreen"
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="w-1/2 p-2 text-black overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">Image Title</h2>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam vehicula, nisi vel facilisis fermentum, lorem urna
                  cursus arcu, at tincidunt nisi eros vel sapien. Integer non
                  libero nec nulla consectetur tincidunt.
                </p>
              </div>
              <button
                onClick={showNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
              >
                &rarr;
              </button>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black text-2xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* SVGWave at the bottom with lower z-index */}
        <SVGWave
          className="absolute inset-x-0 bottom-[-1%]"
          style={{ transform: "scale(-1, 1) translateY(0.2px)" }}
        />
      </div>
    </div>
  );
};

export default SpotlightSection;
