"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";

const modalImages = [
  {
    src: "/gallery/image1.webp",
    alt: "Image 1",
    width: 800,
    height: 600,
  },
];

const MasonryGallery = ({ images }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open modal and set the current image index
  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 flex-grow auto-rows-fr">
        {/* Large image taking up two columns and two rows */}
        <div className="relative col-span-2 row-span-2">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            layout="fill"
            objectFit="cover"
            className="rounded-lg cursor-pointer"
            onClick={() => openModal(0)}
          />
        </div>

        {/* Smaller images filling the rest of the space */}
        {images.slice(1).map((image, index) => (
          <div
            key={index + 1}
            className="relative cursor-pointer"
            onClick={() => openModal(index + 1)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal for image preview */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 bg-white p-8 flex justify-center items-center"
      >
        {/* Image gallery for modal */}
        <ImageGallery
          items={images.map((img) => ({
            original: img.src,
            thumbnail: img.src,
            originalAlt: img.alt,
            thumbnailAlt: img.alt,
          }))}
          startIndex={currentIndex}
          showFullscreenButton={false}
          showPlayButton={false}
          onSlide={(index) => setCurrentIndex(index)}
        />
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-black bg-gray-100 px-3 py-2 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MasonryGallery;
