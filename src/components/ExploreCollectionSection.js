"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import BuyOriginalWorksCTA from "@/components/BuyOriginalWorksCTA";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import Button from "./common/Button";

export default function Shop() {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ Shop ~ products:", products);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Open modal with the selected product
  const openProductModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Close modal
  const closeProductModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // Function to find the index of the current product in the products array
  const getProductIndex = () => {
    if (!currentProduct || products.length === 0) return -1;
    return products.findIndex((p) => p.title === currentProduct.title);
  };

  // Show the next product
  const showNextProduct = () => {
    const currentIndex = getProductIndex();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % products.length;
    setCurrentProduct(products[nextIndex]);
  };

  // Show the previous product
  const showPreviousProduct = () => {
    const currentIndex = getProductIndex();
    if (currentIndex === -1) return;
    const previousIndex =
      (currentIndex - 1 + products.length) % products.length;
    setCurrentProduct(products[previousIndex]);
  };

  // Fetch product list from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/list");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.splice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <BuyOriginalWorksCTA />
        <p className="text-gray-500 text-lg mt-4">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-center text-4xl font-serif font-semibold text-gray-900 mt-8">
        Explore the Collection
      </h2>
      <p className="text-center text-lg text-gray-700 mt-2">
        Explore a variety of high-quality paper prints and realistic canvas
        prints to adorn your walls and add something special to your home.
      </p>

      {/* Product Grid */}
      <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id || product.title}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg"
          >
            {/* Image */}
            <div
              className="relative w-full h-72 cursor-pointer overflow-hidden rounded-md"
              onClick={() => openProductModal(product)}
            >
              <Image
                src={product.images?.[0]?.src || product.previewUrl} // Correctly accessing image data
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Title & Price */}
            <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
              {product.title}
            </h3>
            <p className="text-gray-600 text-base mt-2">
              {product.variants?.[0]?.price
                ? `£${product.variants[0].price}`
                : "Fetching price..."}
            </p>
          </div>
        ))}
      </div>

      <Button theme="dark" buttonUrl={"/shop"} className="my-4">
        Shop Now
      </Button>

      {/* Product Modal */}
      {isModalOpen && currentProduct && (
        <ProductDetailsModal
          isModalOpen={isModalOpen}
          product={currentProduct}
          closeModal={closeProductModal}
          showNextProduct={showNextProduct}
          showPreviousProduct={showPreviousProduct}
        />
      )}
    </div>
  );
}
