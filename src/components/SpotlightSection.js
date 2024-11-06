"use client";
import { useState, useEffect } from "react";
import Typography from "./common/Typography";

const images = [
  { src: "/homepage/strawberry-moon.jpg", name: "Carlos Reinoso" },
  { src: "/homepage/delic-moon.jpg", name: "Person 2" },
  { src: "/homepage/moon-dance.jpg", name: "Person 3" },
  // Add more image objects as needed
];

const SpotlightSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="relative bg-[url('/homepage/delic-moon.jpg')] bg-cover bg-center bg-black bg-opacity-50 bg-blend-overlay">
        <div class="svg-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="var(--primary-colour)"
              fill-opacity="1"
              d="M0,64L48,106.7C96,149,192,235,288,261.3C384,288,480,256,576,245.3C672,235,768,245,864,218.7C960,192,1056,128,1152,101.3C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <Typography
          variant="h2"
          className="font-monoton text-shadow text-center"
        >
          This Month's Spotlight!
        </Typography>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
            {images.map((image, index) => (
              <div key={index} className="text-center">
                <div className="relative cursor-pointer w-80 h-80 mx-auto overflow-hidden rounded-full">
                  <img
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-full shadow-md"
                    onClick={() => openModal(image.src)}
                  />
                  {/* Name Overlay at the Bottom */}
                  <div className="font-neucha absolute bottom-0 w-full bg-primary bg-opacity-70 text-white text-lg font-semibold py-5">
                    {image.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={closeModal} // Close modal when clicking on the overlay
            >
              <div
                className="relative bg-white p-4 rounded shadow-lg max-w-4xl w-full flex"
                onClick={(event) => event.stopPropagation()} // Prevent closing when clicking inside the modal content
              >
                {/* Previous Button */}
                <button
                  onClick={showPreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
                >
                  &larr;
                </button>
                {/* Image Section */}
                <div className="w-1/2 p-2">
                  <img
                    src={currentImage.src}
                    alt="Fullscreen"
                    className="w-full h-auto rounded"
                  />
                </div>
                {/* Description Section */}
                <div className="w-1/2 p-2 text-black overflow-y-auto">
                  <h2 className="text-xl font-bold mb-2">Image Title</h2>
                  <p className="text-sm">
                    {/* Your description text goes here. */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam vehicula, nisi vel facilisis fermentum, lorem urna
                    cursus arcu, at tincidunt nisi eros vel sapien. Integer non
                    libero nec nulla consectetur tincidunt.
                  </p>
                </div>
                {/* Next Button */}
                <button
                  onClick={showNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
                >
                  &rarr;
                </button>
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-black text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotlightSection;
