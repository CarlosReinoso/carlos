"use client";

import supabase from "@/services/supabase/config";
import { useEffect, useState } from "react";
import Button from "../property/Button";
import LoadingSpinner from "../common/LoadingSpinner";

export default function AmaraImages() {
  const [images, setImages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextChapterCount, setNextChapterCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [showCommentMessage, setShowCommentMessage] = useState(false);

  const handleFeatureClick = async ({
    event,
    field,
    localKey,
    setCount,
    setShowMessage,
    gaEventName,
  }) => {
    const alreadyClicked = localStorage.getItem(localKey);

    event.preventDefault();
    setShowMessage(true);

    if (!alreadyClicked) {
      try {
        await fetch("/api/features", {
          method: "POST",
          body: JSON.stringify({ field }),
        });

        localStorage.setItem(localKey, "true");
        if (setCount) {
          setCount((prev) => (prev ?? 0) + 1);
        }

        // Fire GA4 event
        if (typeof window !== "undefined" && window.gtag && gaEventName) {
          window.gtag("event", gaEventName, {
            event_category: "User Interaction",
            event_label: field,
          });
        }
      } catch (error) {
        console.error(`Failed to increment feature: ${field}`, error);
      }
    }
  };

  const handleNextChapterClick = (event) =>
    handleFeatureClick({
      event,
      field: "amara_next_chapter",
      localKey: "amara-next-clicked",
      setCount: setNextChapterCount,
      setShowMessage: setShowMessage,
    });

  const handleCommentClick = (event) =>
    handleFeatureClick({
      event,
      field: "amara_comment",
      localKey: "amara-comment-clicked",
      setCount: setCommentCount,
      setShowMessage: setShowCommentMessage,
      gaEventName: "click_leave_comment", // ← GA4 event name
    });

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase.storage
        .from("images")
        .list("books/amara", {
          limit: 100,
        });
      if (data) {
        const sorted = data.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );

        setImages(sorted);
      } else {
        console.error("Error fetching images:", error);
      }
      setLoading(false);
    }

    async function fetchFeatureCount() {
      try {
        const res = await fetch("/api/features");
        const json = await res.json();
        const data = json?.data;
        setNextChapterCount(data?.amara_next_chapter ?? 0);
        setCommentCount(data?.amara_comment ?? 0);
      } catch (err) {
        console.error("Failed to fetch feature count:", err);
      }
    }

    fetchFeatureCount();
    fetchImages();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (images.length === 0) {
    return (
      <div className="text-center text-red-500 p-10">
        No images found for Amara.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 pb-6">
      <h2 className="text-2xl font-bold text-white">Amara</h2>
      <h5 className="text-second">Echoes of What Was Never Lost</h5>
      {images.map((url, index) => (
        <img
          key={index}
          src={`https://znkasxqfakeaxrmuuxya.supabase.co/storage/v1/object/public/images/books/amara/${url.name}`}
          alt={`Amara image ${index + 1}`}
          className="w-full max-w-md rounded shadow object-cover"
        />
      ))}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl mx-auto gap-4 text-center">
        <Button
          arrowLeft
          buttonUrl="/books"
          arrow={false}
          className="w-full sm:w-auto"
        >
          Back to Books
        </Button>

        <div className="flex flex-col items-center w-full sm:w-auto">
          <Button onClick={handleNextChapterClick}>Next Chapter</Button>

          {showMessage && (
            <p className="mt-2 text-third text-sm">
              Chapter coming soon. {nextChapterCount ?? "Some"} people also want
              to see it.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <Button onClick={handleCommentClick}>Leave A Comment</Button>

        {showCommentMessage && (
          <p className="mt-2 text-third text-sm text-center">
            You're not alone. {commentCount ?? "Several"} people have left a
            thought too.
          </p>
        )}
      </div>
    </div>
  );
}
