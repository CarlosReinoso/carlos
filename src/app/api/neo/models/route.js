import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active_only") === "true";

    let query = supabaseAdmin.from("neo_models").select("*");

    if (activeOnly) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query.order("name", { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({ models: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch neo models" },
      { status: 500 }
    );
  }
}

