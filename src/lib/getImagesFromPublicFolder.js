import fs from "fs";
import path from "path";

export function getImagesFromPublicFolder(folderPath) {
  const absolutePath = path.join(process.cwd(), "public", folderPath);
  try {
    const files = fs.readdirSync(absolutePath);
    return files
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .map((file) => `${folderPath}/${file}`); // returns relative paths like /property/projects/kam/before/file.jpeg
  } catch (e) {
    return [];
  }
}
