import { generateAndUploadQR } from "@/lib/vcard/generateAndUploadQR";
import supabase from "@/services/supabase/config";

function extractVCardFields(body) {
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
    linkedin,
    instagram,
    whatsapp,
  } = body;

  return {
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
    whatsapp,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const fields = extractVCardFields(body);

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from("vcards")
      .select("slug")
      .eq("slug", fields.slug)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 409,
      });
    }

    // Generate and upload QR code
    const qr_url = await generateAndUploadQR(fields);

    const vcardData = { ...fields, qr_url };

    const { error: insertError } = await supabase
      .from("vcards")
      .insert([vcardData]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to insert into database" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        slug: fields.slug,
        qr_url,
        redirect: `/vcard/${fields.slug}`,
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
