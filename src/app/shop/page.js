"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import BuyOriginalWorksCTA from "@/components/BuyOriginalWorksCTA";
import ProductDetailsModal from "@/components/ProductDetailsModal";

export default function Shop() {
  const [products, setProducts] = useState([]);
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

  // Show the next product
  // Function to find the index of the current product in the products array
  const getProductIndex = () => {
    if (!currentProduct || products.length === 0) return -1;
    return products.findIndex((p) => p.title === currentProduct.title);
  };

  // Show the next product
  const showNextProduct = () => {
    const currentIndex = getProductIndex();
    if (currentIndex === -1) {
      console.error("Product not found in the list");
      return;
    }
    const nextIndex = (currentIndex + 1) % products.length;
    setCurrentProduct(products[nextIndex]);
  };

  // Show the previous product
  const showPreviousProduct = () => {
    const currentIndex = getProductIndex();
    if (currentIndex === -1) {
      console.error("Product not found in the list");
      return;
    }
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
        setProducts(data);
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
      <div className="container mx-auto py-12 px-4">
        <BuyOriginalWorksCTA />
        <p className="text-center text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <BuyOriginalWorksCTA />
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id || product.title}
            className="flex flex-col items-center"
          >
            <div
              className="overflow-hidden flex-grow cursor-pointer"
              onClick={() => openProductModal(product)} // Use onClick instead of onDoubleClick
            >
              <Image
                src={product.previewUrl}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-auto rounded-sm shadow-lg"
                placeholder="blur"
                blurDataURL="/image-loading-placeholder.json"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              {product.variants[0].price
                ? `£${product.variants[0].price}`
                : "Fetching price..."}
            </p>
          </div>
        ))}
      </div>

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
