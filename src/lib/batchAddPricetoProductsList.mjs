import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const gelatoStoreId = process.env.NEXT_PUBLIC_GELATO_STORE_ID;
const gelatoApiKey = process.env.GELATO_API_KEY;

async function updateProducts() {
  try {
    // Load outputTest.json and extract the first 'limit' products
    const outputTest = JSON.parse(fs.readFileSync("outputTest.json", "utf8"));
    if (!outputTest.products || outputTest.products.length === 0) {
      console.error("❌ No products found in outputTest.json");
      return;
    }

    const productsToUpdate = outputTest.products;

    for (const product of productsToUpdate) {
      console.log("🚀 Updating product:", product.title);

      const productId = product.id;
      if (!productId) {
        console.error("❌ Missing product ID");
        continue;
      }

      // Prepare metadata: merge existing metadata with new values
      const existingMetadata = product.metadata || [];
      const newMetadata = existingMetadata.map(({ key, value }) => ({
        key,
        value: String(value),
      }));

      const updateData = {
        externalId: product.externalId,
        title: product.title,
        description: product.description,
        previewFileType: product.previewFileType,
        productVariantPreviewScene: product.productVariantPreviewScene,
        productVariantOptions: product.productVariantOptions,
        productVariantAttributes: product.productVariantAttributes,
        metadata: newMetadata,
      };

      // Send update request to Gelato API
      const response = await fetch(
        `https://ecommerce.gelatoapis.com/v1/stores/${gelatoStoreId}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": gelatoApiKey,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Update failed:", response.status, errorText);
        continue;
      }

      const updatedProduct = await response.json();
      console.log("✅ Product Updated Successfully:", updatedProduct.title);
    }
  } catch (error) {
    console.error("❌ API Error:", error);
  }
}

// Run the function to update the first 3 products
updateProducts();
