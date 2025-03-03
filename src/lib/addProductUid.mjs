import fs from 'fs';

// Load JSON files
const dataAll = JSON.parse(fs.readFileSync('dataAll.json', 'utf8'));
const backup = JSON.parse(fs.readFileSync('backup.json', 'utf8'));

const normalizeTitle = (title) => title.trim().replace(/\s+/g, ' ').replace(/^Size\s*/, '');

const updatedProducts = backup.products.map(product => {
    // Find the matching product in dataAll.json by title
    const matchingProduct = dataAll.find(p => normalizeTitle(p.title) === normalizeTitle(product.title));
    
    if (!matchingProduct) {
        return product; // If no matching product, return it unchanged
    }

    // Ensure metadata array exists
    const updatedMetadata = [...(product.metadata || [])];

    product.variants.forEach(variant => {
        // Find the specific matching variant in the matched product
        const matchingVariant = matchingProduct.variants.find(v => normalizeTitle(v.title) === normalizeTitle(variant.title));
        
        if (matchingVariant) {
            console.log("🚀 Matched Variant:", matchingVariant.title, "->", variant.title);
            // Check if metadata already exists for this variant
            const existingMetadataIndex = updatedMetadata.findIndex(m => m.key === variant.productUid);

            if (existingMetadataIndex === -1) {
                // Add new metadata entry
                updatedMetadata.push({
                    key: variant.productUid,
                    value: parseFloat(matchingVariant.price.replace('£', '')) // Convert to number
                });
            } else {
                // Update existing metadata entry
                updatedMetadata[existingMetadataIndex].value = parseFloat(matchingVariant.price.replace('£', ''));
            }
        } else {
            console.warn("⚠️ No matching variant found for:", variant.title);
        }
    });

    return {
        ...product,
        metadata: updatedMetadata
    };
});

// Save the output JSON file
fs.writeFileSync('output.json', JSON.stringify({ products: updatedProducts }, null, 2));

console.log("✅ Updated JSON saved as output.json");