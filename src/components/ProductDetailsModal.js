"use client";
import { useState, useEffect } from "react";
import Typography from "./common/Typography";
import Image from "next/image";

const ProductDetailsModal = ({
  product,
  isModalOpen,
  closeModal,
  showNextProduct,
  showPreviousProduct,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Update selected variant when modal opens or product changes
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]); // Default to first variant
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  // Handle variant selection change
  const handleVariantChange = (event) => {
    const selectedTitle = event.target.value;
    const variant = product.variants.find((v) => v.title === selectedTitle);
    setSelectedVariant(variant);
  };

  if (!isModalOpen || !product) return null; // Prevent rendering if modal is closed

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-2 sm:px-4"
      onClick={closeModal} // Clicking outside closes modal
    >
      {/* Scrollable Modal Container */}
      <div
        className="overflow-y-auto max-h-[80vh] relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[90vh] overflow-hidden"
        onClick={(event) => event.stopPropagation()} // Clicking inside does not close modal
      >
        {/* Right Side (On Desktop), Top Section on Mobile */}
        <div className="order-1 md:order-none">
          <Typography
            variant="h3"
            className="text-xl sm:text-2xl font-bold text-gray-900 text-center md:text-left"
          >
            {product.title}
          </Typography>

          <hr className="border-gray-300 my-4" />

          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src={product.previewUrl || "/placeholder.jpg"}
              alt={product.title}
              width={450}
              height={450}
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
        </div>

        {/* Left Side (On Desktop), Below Image on Mobile */}
        <div className="order-2 md:order-none  custom-scrollbar">
          {/* Sizes Dropdown */}
          <Typography className="text-2xl sm:text-3xl font-bold text-gray-800 text-center md:text-left">
            £{selectedVariant?.price || product.basePrice || "N/A"}
          </Typography>

          {Array.isArray(product.variants) && product.variants.length > 0 && (
            <div className="mt-4 text-gray-700">
              <p className="font-semibold text-lg">Size:</p>
              <select
                className="w-full border rounded-md px-3 py-2 mt-2"
                onChange={handleVariantChange}
                value={selectedVariant?.title || ""}
              >
                {product.variants.map((variant, index) => (
                  <option key={index} value={variant.title}>
                    {variant.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-4 text-gray-700">
            <p className="font-semibold text-lg">Quantity:</p>
            <input
              type="number"
              defaultValue="1"
              min="1"
              className="w-full border rounded-md px-3 py-2 mt-2"
            />
          </div>

          {/* Buy Now Button */}
          <button className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold py-3 rounded-lg transition">
            Buy Now
          </button>

          {/* Google Pay Button */}
          <button className="mt-2 w-full bg-black text-white text-lg font-semibold py-3 rounded-lg flex items-center justify-center">
            <img
              src="/google-pay-logo.png"
              alt="Google Pay"
              className="h-6 mr-2"
            />
            Pay
          </button>

          <div className="description-container text-gray-700 text-sm sm:text-base leading-relaxed space-y-2">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              "No description available."
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-2 text-gray-700 mt-4">
            <p>
              <strong>Product URL:</strong>{" "}
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Product
              </a>
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPreviousProduct();
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              ← Previous
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextProduct();
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 text-2xl font-bold hover:text-black"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
