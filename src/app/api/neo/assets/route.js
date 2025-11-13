import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

const BUCKET = "images";
const FOLDER = "neo";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .list(FOLDER, {
        limit: 1000,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      throw error;
    }

    const files = data?.map((file) => {
      const path = `${FOLDER}/${file.name}`;
      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

      return {
        name: file.name,
        path,
        publicUrl,
        createdAt: file.created_at,
        lastModified: file.updated_at,
        metadata: {
          size: file.metadata?.size ?? null,
          mimetype: file.metadata?.mimetype ?? null,
        },
      };
    });

    return NextResponse.json({ assets: files ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch neo assets" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      filePath,
      publicUrl,
      modelId, // UUID from neo_models table
      mediaType, // 'IMAGE', 'REEL', or 'STORY'
      caption,
      fileName,
      fileSize,
      mimeType,
      metadata,
      userId,
    } = body;

    if (!filePath || !publicUrl) {
      return NextResponse.json(
        { error: "filePath and publicUrl are required" },
        { status: 400 }
      );
    }

    if (!mediaType || !["IMAGE", "REEL", "STORY"].includes(mediaType)) {
      return NextResponse.json(
        { error: "mediaType must be IMAGE, REEL, or STORY" },
        { status: 400 }
      );
    }

    // If modelId is provided as string (model_id), look up the UUID
    let modelUuid = modelId;
    if (modelId && typeof modelId === "string" && !modelId.includes("-")) {
      const { data: model } = await supabaseAdmin
        .from("neo_models")
        .select("id")
        .eq("model_id", modelId)
        .single();

      if (model) {
        modelUuid = model.id;
      }
    }

    const { data, error } = await supabaseAdmin
      .from("neo_assets")
      .insert({
        file_path: filePath,
        public_url: publicUrl,
        model_id: modelUuid || null,
        media_type: mediaType,
        caption: caption || null,
        file_name: fileName || null,
        file_size: fileSize || null,
        mime_type: mimeType || null,
        metadata: metadata || null,
        uploaded_by: userId || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ asset: data });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to record neo asset" },
      { status: 500 }
    );
  }
}
