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

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from("vcards")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 409,
      });
    }

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

    // Generate QR Code from vCard
    const qrDataUrl = await QRCode.toDataURL(vcard, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });

    const qrBlob = await (await fetch(qrDataUrl)).blob();
    const qrFilePath = `${slug}.png`;

    const { error: uploadError } = await supabase.storage
      .from("images/vcards")
      .upload(qrFilePath, qrBlob, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("QR upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload QR code" }),
        {
          status: 500,
        }
      );
    }

    const publicBase = `https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/images/vcards/`;
    const qrUrl = `${publicBase}${qrFilePath}`;

    // Save to DB
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
        qr_url: qrUrl,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to insert into database" }),
        { status: 500 }
      );
    }

    // Respond with useful info
    return new Response(
      JSON.stringify({
        success: true,
        slug,
        qr_url: qrUrl,
        redirect: `/vcard/${slug}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
}
