import QRCode from "qrcode";
import supabase from "@/services/supabase/config";

export async function generateAndUploadQR({
  name,
  surname,
  company,
  phone,
  email,
  website,
  address,
  note,
  slug,
}) {
  try {
    const now = new Date();
    const isoString = now.toISOString(); // e.g. "2025-04-15T13:47:28.123Z"
    const timestamp = isoString.replace(/[:.]/g, "-"); // "2025-04-15T13-47-28-123Z"
    const qrFilePath = `${slug}-${timestamp}.png`; // e.g. "carlos-2025-04-15T13-47-28-123Z.png"

    // 🧹 1. Delete existing QR image first
    const { error: deleteError } = await supabase.storage
      .from("images/vcards")
      .remove([qrFilePath]);

    if (deleteError) {
      console.warn(
        "QR delete warning (can be ignored if file not found):",
        deleteError
      );
    }

    // 🎯 2. Build vCard string
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${surname};${name};;;
FN:${name} ${surname}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:;;${address};;;
NOTE:${note}
END:VCARD`.trim();

    // 📦 3. Generate QR code as Data URL
    const qrDataUrl = await QRCode.toDataURL(vcard, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });

    const qrBlob = await (await fetch(qrDataUrl)).blob();

    // 📤 4. Upload to Supabase (no upsert needed since we deleted first)
    const { error: uploadError } = await supabase.storage
      .from("images/vcards")
      .upload(qrFilePath, qrBlob, {
        contentType: "image/png",
      });

    if (uploadError) {
      console.error("QR upload error:", uploadError);
      throw new Error("Failed to upload QR code");
    }

    // 🔗 5. Return public URL
    const publicUrl = `https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/images/vcards/${qrFilePath}`;
    return publicUrl;
  } catch (err) {
    console.error("QR generation/upload error:", err);
    throw new Error("Failed to generate and upload QR");
  }
}
