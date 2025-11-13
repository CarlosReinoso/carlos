import { NextResponse } from "next/server";

async function uploadFromDataUrl(dataUrl, form) {
  const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!matches) {
    throw new Error("Invalid image data");
  }

  const [, mimeType, base64] = matches;
  const buffer = Buffer.from(base64, "base64");
  const extension = mimeType.split("/")[1] || "jpg";
  const blob = new Blob([buffer], { type: mimeType });
  form.append("source", blob, `upload.${extension}`);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const igUserId = formData.get("igUserId");
    const accessToken = formData.get("accessToken");
    const caption = formData.get("caption") || "";
    const imageUrl = formData.get("imageUrl");
    const imageData = formData.get("imageData");
    const modelId = formData.get("modelId") || undefined;

    if (!igUserId || !accessToken) {
      return NextResponse.json(
        { error: "Instagram user ID and access token are required" },
        { status: 400 }
      );
    }

    let creationUrl;
    let creationBody;
    let creationHeaders = {};

    if (imageUrl) {
      // For image_url, use query parameters as per Instagram API docs
      const params = new URLSearchParams({
        image_url: imageUrl.trim(),
        caption: caption,
        access_token: accessToken.trim(),
      });
      creationUrl = `https://graph.facebook.com/v24.0/${igUserId}/media?${params.toString()}`;
      creationBody = null;
    } else if (imageData) {
      // For direct file upload, use FormData
      const creationForm = new FormData();
      creationForm.append("access_token", accessToken.trim());
      creationForm.append("caption", caption);
      await uploadFromDataUrl(imageData, creationForm);
      creationUrl = `https://graph.facebook.com/v24.0/${igUserId}/media`;
      creationBody = creationForm;
    } else {
      return NextResponse.json(
        { error: "Provide either an image URL or upload a file" },
        { status: 400 }
      );
    }

    const creationResponse = await fetch(creationUrl, {
      method: "POST",
      body: creationBody,
      headers: creationHeaders,
    });

    const creationJson = await creationResponse.json();

    if (!creationResponse.ok) {
      return NextResponse.json(
        {
          error:
            creationJson?.error?.message ||
            "Failed to create Instagram media container",
        },
        { status: creationResponse.status }
      );
    }

    const creationId = creationJson.id;
    const publishForm = new URLSearchParams();
    publishForm.append("creation_id", creationId);
    publishForm.append("access_token", accessToken.trim());

    const publishResponse = await fetch(
      `https://graph.facebook.com/v24.0/${igUserId}/media_publish?${publishForm.toString()}`,
      {
        method: "POST",
      }
    );

    const publishJson = await publishResponse.json();

    if (!publishResponse.ok) {
      return NextResponse.json(
        {
          error:
            publishJson?.error?.message ||
            "Failed to publish Instagram media container",
          creationId,
          publishDetails: publishJson,
        },
        { status: publishResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      creationId,
      publishResult: publishJson,
      modelId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
