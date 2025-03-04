import fs from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import fetch from "node-fetch"; // Only required for Node.js <18
import { fileURLToPath } from "url";

// Get current directory (__dirname equivalent in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON data
const images = [
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_89e39ea41c2c4bed8dfe8d16d4e1cf97~mv2.jpg/v1/fill/w_277,h_370,q_75,enc_avif,quality_auto/3a715a_89e39ea41c2c4bed8dfe8d16d4e1cf97~mv2.jpg",
    title: "The Oak King \n£1,888",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_97e9b20ff4a44335a56ecb2e59367c0d~mv2.jpg/v1/fill/w_278,h_370,q_75,enc_avif,quality_auto/3a715a_97e9b20ff4a44335a56ecb2e59367c0d~mv2.jpg",
    title: "Hummingbird and Hibiscus \n£2,700",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_9923743c3f80404fb042bf36c1ed9280~mv2.png/v1/fill/w_277,h_370,q_75,enc_avif,quality_auto/3a715a_9923743c3f80404fb042bf36c1ed9280~mv2.png",
    title: "Peacock Goddess\n£888",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_d9026c3306d94a329fc9450295869431~mv2.jpg/v1/fill/w_277,h_370,fp_0.48_0.47,q_75,enc_avif,quality_auto/3a715a_d9026c3306d94a329fc9450295869431~mv2.jpg",
    title: "SOLD Diving Kingfisher",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_c7f462b8ea8140f080d6491b216c5df5~mv2.jpg/v1/fill/w_278,h_370,q_75,enc_avif,quality_auto/3a715a_c7f462b8ea8140f080d6491b216c5df5~mv2.jpg",
    title: "Luna \n£1500",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_a697fb10c72e463f82de6f3cd7a1a05a~mv2.jpeg/v1/fill/w_277,h_370,fp_0.48_0.44,q_75,enc_avif,quality_auto/3a715a_a697fb10c72e463f82de6f3cd7a1a05a~mv2.jpeg",
    title: "Gaia\n £1200",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_7409e16f5e6947f38877493b2be60aed~mv2.png/v1/fill/w_277,h_370,q_75,enc_avif,quality_auto/3a715a_7409e16f5e6947f38877493b2be60aed~mv2.png",
    title: "Archangel Michael \n£122",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_875a015fa74048eebbfa70983859d4c3~mv2.png/v1/fill/w_278,h_370,fp_0.48_0.53,q_75,enc_avif,quality_auto/3a715a_875a015fa74048eebbfa70983859d4c3~mv2.png",
    title: "Ninawa (Huni Kuin)\n£888",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_7b815a08f85a4ab6998ba19c2010bb98~mv2.png/v1/fill/w_277,h_370,q_75,enc_avif,quality_auto/3a715a_7b815a08f85a4ab6998ba19c2010bb98~mv2.png",
    title: "Golden hour in the castle.\n£80",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_300bd6e4dc1a467fb4c60ae21346deed~mv2.png/v1/fill/w_277,h_370,q_75,enc_avif,quality_auto/3a715a_300bd6e4dc1a467fb4c60ae21346deed~mv2.png",
    title: "Tribal Gold\n£80",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/3a715a_64f3398e53d24efdadf691a98fd87038~mv2.jpg/v1/fill/w_278,h_370,fp_0.48_0.44,q_75,enc_avif,quality_auto/3a715a_64f3398e53d24efdadf691a98fd87038~mv2.jpg",
    title: "Joker\n£1888",
  },
];

// Create downloads directory
const downloadFolder = path.join(__dirname, "downloaded_images");
await fs.mkdir(downloadFolder, { recursive: true });

// Function to clean the filename
const cleanTitle = (title) =>
  title
    .replace(/\n/g, "-") // Replace newlines with '-'
    .replace(/\s+/g, "-") // Replace spaces with '-'
    .replace(/[^a-zA-Z0-9-_]/g, ""); // Remove other special characters

// Function to download an image using fetch()
const downloadImage = async (url, filename) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const filePath = path.join(downloadFolder, filename);
    const fileStream = createWriteStream(filePath);

    await pipeline(response.body, fileStream);
    console.log(`✅ Downloaded: ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to download ${filename}: ${error.message}`);
  }
};

// Download all images
const downloadAllImages = async () => {
  console.log("📥 Starting image downloads...");

  for (const image of images) {
    const cleanedTitle = cleanTitle(image.title);
    const extension = image.imageUrl.split(".").pop().split("?")[0]; // Extract file extension
    const filename = `${cleanedTitle}.${extension}`;

    console.log(`⬇ Downloading: ${filename}`);
    await downloadImage(image.imageUrl, filename);
  }

  console.log("✅ All images downloaded successfully!");
};

await downloadAllImages();
