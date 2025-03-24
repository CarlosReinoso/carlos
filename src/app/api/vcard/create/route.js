import supabase from "@/services/supabase/config";
import QRCode from "qrcode";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      surname,
      company,
      phone,
      email,
      website,
      address,
      note,
      slug,
    } = body;

    // Build vCard string
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${surname};${name};;;
FN:${name} ${surname}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:;;${address};;;;
NOTE:${note}
END:VCARD
    `.trim();

    const cardLink = `https://carlosreinoso.co.uk/vcard/${slug}`;

    // Generate QR Code
    const qrDataUrl = await QRCode.toDataURL(cardLink);
    const qrBlob = await (await fetch(qrDataUrl)).blob();
    const filePath = `${slug}.png`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("/images/vcards")
      .upload(filePath, qrBlob, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload QR code" }),
        { status: 500 }
      );
    }

    // Save metadata to Supabase DB
    const { error: insertError } = await supabase.from("vcards").insert([
      {
        name,
        surname,
        company,
        phone,
        email,
        website,
        address,
        note,
        slug,
        qr_url: filePath,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to insert into database" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true, slug }), {
      status: 200,
    });
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
}
