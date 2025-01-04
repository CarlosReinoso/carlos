import { NextResponse } from "next/server";
import supabase from "@/services/supabase/setup";

export async function POST(request) {
  try {
    // Get form data
    const formData = await request.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    const description = formData.get("description");
    const position = formData.get("position"); // Get position from the form data

    // Validate required fields
    if (!file || !name || !description || !position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Generate safe filename
    const fileName = `spotlight-${Date.now()}-${name.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}`;

    // Upload to Supabase storage
    const { error: storageError } = await supabase.storage
      .from("luminous")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (storageError) {
      throw storageError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("luminous")
      .getPublicUrl(fileName);

    // Insert record into database
    const { data: dbData, error: dbError } = await supabase
      .from("spotlight")
      .insert([
        {
          name,
          description,
          image_url: publicUrl,
          position: parseInt(position), // Store position as an integer
        },
      ])
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      data: {
        publicUrl: publicUrl,
        record: dbData,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
