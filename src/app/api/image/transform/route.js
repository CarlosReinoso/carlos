import { NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import archiver from "archiver";
import { Readable } from "stream";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Get optional parameters with defaults
    const outputFormat = formData.get("format") || "webp";
    const quality = parseInt(formData.get("quality")) || 50;

    // Validate output format
    const validFormats = ["webp", "jpg", "png"];
    if (!validFormats.includes(outputFormat)) {
      return NextResponse.json(
        { error: "Invalid output format. Must be one of: webp, jpg, png" },
        { status: 400 }
      );
    }

    // Validate quality
    if (quality < 1 || quality > 100) {
      return NextResponse.json(
        { error: "Quality must be between 1 and 100" },
        { status: 400 }
      );
    }

    // Create a zip archive
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    // Create a stream to hold the zip file
    const chunks = [];
    archive.on("data", (chunk) => chunks.push(chunk));

    // Process each file
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const originalName = file.name;
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext);
      const outputFilename = `${baseName}.${outputFormat}`;

      let processedImage;
      switch (outputFormat) {
        case "webp":
          processedImage = await sharp(buffer).webp({ quality }).toBuffer();
          break;
        case "jpg":
          processedImage = await sharp(buffer).jpeg({ quality }).toBuffer();
          break;
        case "png":
          processedImage = await sharp(buffer).png({ quality }).toBuffer();
          break;
      }

      // Add the processed image to the zip archive
      archive.append(processedImage, { name: outputFilename });
    }

    // Finalize the archive
    await archive.finalize();

    // Combine all chunks into a single buffer
    const zipBuffer = Buffer.concat(chunks);

    // Create response with the zip file
    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="transformed_images.zip"',
      },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json(
      { error: "Failed to process images" },
      { status: 500 }
    );
  }
}
