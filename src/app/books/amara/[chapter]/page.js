"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import supabase from "@/services/supabase/config";
import CommentBox from "@/components/books/amara/Comments";
import AmaraNav from "@/components/books/amara/AmaraNav";
import SupportMe from "@/components/books/amara/SupportMe";

export default function AmaraChapterPage() {
  const { chapter } = useParams();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextChapterSlug, setNextChapterSlug] = useState(null);
  const [prevChapterSlug, setPrevChapterSlug] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      // Fetch images
      const { data: files, error } = await supabase.storage
        .from("images")
        .list(`books/amara/${chapter}`, {
          limit: 100,
          sortBy: { column: "name", order: "asc" },
        });

      if (files) {
        const sorted = files.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );

        const imageUrls = sorted
          ?.filter((file) => file.name.match(/\.(webp|jpg|jpeg|png)$/i))
          .map(
            (file) =>
              `https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/images/books/amara/${chapter}/${file.name}`
          );

        setImages(imageUrls || []);
      } else {
        console.error("Error fetching images:", error);
      }

      // Fetch folder list and find prev/next
      const { data: folders, error: folderError } = await supabase.storage
        .from("images")
        .list("books/amara", { limit: 100 });

      if (folderError) {
        console.error("Error fetching folder list:", folderError);
      } else {
        const chapterFolders = folders
          .filter((item) => !item.name.includes("."))
          .map((item) => item.name)
          .sort((a, b) =>
            a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          );

        const currentIndex = chapterFolders.indexOf(chapter);
        const nextSlug = chapterFolders[currentIndex + 1] || null;
        const prevSlug =
          currentIndex > 0 ? chapterFolders[currentIndex - 1] : null;

        setNextChapterSlug(nextSlug);
        setPrevChapterSlug(prevSlug);
      }

      setLoading(false);
    };

    fetchChapter();
  }, [chapter]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <AmaraNav
        chapter={chapter}
        prevChapterSlug={prevChapterSlug}
        nextChapterSlug={nextChapterSlug}
      />
      <div className="p-4 space-y-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Page ${i + 1}`}
            className="w-full max-w-3xl mx-auto rounded shadow"
          />
        ))}

        <AmaraNav
          heading={false}
          chapter={chapter}
          prevChapterSlug={prevChapterSlug}
          nextChapterSlug={nextChapterSlug}
        />

        <div className="flex flex-col items-center mt-4">
          <CommentBox chapter={chapter} />
        </div>
        <SupportMe />
      </div>
    </>
  );
}
