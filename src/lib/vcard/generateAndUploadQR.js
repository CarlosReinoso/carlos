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
  linkedin,
  instagram,
  whatsapp
}) {
  try {
    const now = new Date();
    const isoString = now.toISOString(); // "2025-04-15T13:47:28.123Z"
    const timestamp = isoString.replace(/[:.]/g, "-"); // "2025-04-15T13-47-28-123Z"
    const qrFilePath = `${slug}-${timestamp}.png`;

    // 🔧 1. Build vCard string
    let vcard = `
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
    `.trim();

    // Optionally add social profiles
    if (linkedin) vcard += `\nX-SOCIALPROFILE;type=linkedin:${linkedin}`;
    if (instagram) vcard += `\nX-SOCIALPROFILE;type=instagram:${instagram}`;
    if (whatsapp) vcard += `\nX-SOCIALPROFILE;type=whatsapp:${whatsapp}`;

    vcard += `\nEND:VCARD`;

    // 📦 2. Generate QR code from vCard
    const qrDataUrl = await QRCode.toDataURL(vcard, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });

    const qrBlob = await (await fetch(qrDataUrl)).blob();

    // 🧼 3. Delete file if it somehow already exists (rare)
    await supabase.storage.from("images").remove([`vcards/${qrFilePath}`]);

    // 📤 4. Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(`vcards/${qrFilePath}`, qrBlob, {
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
