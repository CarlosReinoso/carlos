import { generateAndUploadQR } from "@/lib/vcard/generateAndUploadQR";
import supabase from "@/services/supabase/config";

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

    // Generate and upload QR code
    const qr_url = await generateAndUploadQR({
      name,
      surname,
      company,
      phone,
      email,
      website,
      address,
      note,
      slug,
    });

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
        qr_url,
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
        qr_url,
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
