export default function addPricesToVariants(products) {
  return products.map((product) => {
    // Ensure metadata array exists
    const metadata = product.metadata || [];

    // Update variants field with prices
    const updatedVariants = product.variants.map((variant) => {
      // Find the matching metadata entry by productUid
      const matchingMetadata = metadata.find(
        (meta) => meta.key === variant.productUid
      );
      console.log("🚀 ~ updatedVariants ~ matchingMetadata:", matchingMetadata);

      // Convert value to number only if it's a valid number
      const price =
        matchingMetadata && !isNaN(Number(matchingMetadata.value))
          ? Number(matchingMetadata.value)
          : null;
      console.log("🚀 ~ updatedVariants ~ price:", price);

      return {
        ...variant, // Keep all existing variant data
        price, // Assign price only if it's a valid number
      };
    });

    return {
      ...product,
      variants: updatedVariants, // Replace variants field with updated data
    };
  });
}
