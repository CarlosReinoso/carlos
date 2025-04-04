"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import supabase from "@/services/supabase/config";

export default function AmaraChaptersList() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase.storage
        .from("images")
        .list("books/amara", {
          limit: 100,
        });

      if (error) {
        console.error("Error fetching folders:", error);
        return [];
      }

      const folders = data.filter((item) => !item.name.includes("."));

      const chaptersWithPreviews = await Promise.all(
        folders.map(async (folder) => {
          const { data: files } = await supabase.storage
            .from("images")
            .list(`books/amara/${folder.name}`, {
              limit: 1,
              sortBy: { column: "name", order: "asc" },
            });

          const previewImage = files?.[0]?.name
            ? `https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/images/books/amara/${folder.name}/${files[0].name}`
            : null;

          return {
            slug: folder.name,
            title: folder.name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize
            previewImage,
          };
        })
      );

      setChapters(chaptersWithPreviews);
      setLoading(false);
    };

    fetchChapters();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-3xl font-bold text-center text-white mb-6">
        Amara Chapters
      </h3>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/books/amara/${chapter.slug}`}
            className="flex items-center gap-4 bg-black/40 hover:bg-black/60 transition rounded p-4"
          >
            {chapter.previewImage ? (
              <img
                src={chapter.previewImage}
                alt={chapter.title}
                className="w-24 h-auto object-cover rounded"
              />
            ) : (
              <div className="w-24 h-32 bg-gray-800 rounded flex items-center justify-center text-white text-sm">
                No image
              </div>
            )}
            <div className="text-white">
              <h5 className="font-semibold text-gray-400">
                {chapter.title.split(" ").slice(0, 2).join(" ")}
              </h5>
              <h4 className="font-medium">
                {chapter.title.split(" ").slice(2).join(" ")}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
