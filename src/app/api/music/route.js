// app/api/music/route.js
import supabase from "@/services/supabase/config";

const BUCKET = "music";
const FOLDER = "songs";
const BASE_URL = `https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/${BUCKET}/${FOLDER}`;

export async function GET() {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(FOLDER, { limit: 100 });
    console.log("🚀 ~ GET ~ data:", data)

  if (error) {
    console.error("Error listing music files:", error);
    return new Response(JSON.stringify({ error: "Failed to list files" }), {
      status: 500,
    });
  }

  const tracks = data
    .filter((file) => file.name.endsWith(".mp3"))
    .map((file) => ({
      title: file.name.replace(/\.mp3$/, "").replace(/[-_]/g, " "),
      artist: "Carlos Reinoso",
      src: `${BASE_URL}/${file.name}`,
    }));

  return Response.json(tracks);
}
