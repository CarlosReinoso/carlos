"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/property/Button";
import { trackBookEvent } from "@/lib/analytics";

export default function AmaraNav({
  chapter,
  prevChapterSlug,
  nextChapterSlug,
  heading = true,
}) {
  const [showMessage, setShowMessage] = useState(false);

  const chapterNumber = chapter?.match(/chapter-(\d+)/)?.[1] || "";
  const titleWithoutPrefix = chapter
    ? chapter
        .replace(/chapter-\d+-?/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  const handleNextChapterClick = (event) => {
    event.preventDefault();
    setShowMessage(true);

    trackBookEvent(
      "amara_demand_for_next_chapter",
      "Next Chapter Button",
      chapter
    );
  };

  return (
    <>
      {/* Top Sticky Nav */}
      <div className="top-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between text-white">
        <Link href="/books/amara" className="text-sm underline-hover">
          ← All Chapters
        </Link>

        {heading && (
          <div className="flex flex-col items-center justify-center max-w-[50%] text-center mx-2">
            {chapterNumber && (
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Chapter {chapterNumber}
              </span>
            )}
            <h6 className="text-lg font-semibold truncate">
              {titleWithoutPrefix}
            </h6>
          </div>
        )}

        <Link href="/books" className="text-sm underline-hover">
          Books →
        </Link>
      </div>

      {/* Chapter Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl mx-auto gap-4 text-center mt-6">
        {prevChapterSlug ? (
          <Button
            arrowLeft
            arrow={false}
            buttonUrl={`/books/amara/${prevChapterSlug}`}
            className="w-full sm:w-auto"
          >
            Previous Chapter
          </Button>
        ) : (
          <Button
            arrowLeft
            buttonUrl="/books"
            arrow={false}
            className="w-full sm:w-auto"
          >
            Back to Books
          </Button>
        )}

        <div className="flex flex-col items-center w-full sm:w-auto">
          {nextChapterSlug ? (
            <Button buttonUrl={`/books/amara/${nextChapterSlug}`}>
              Next Chapter
            </Button>
          ) : (
            <>
              <Button onClick={handleNextChapterClick}>Next Chapter</Button>
              {showMessage && (
                <p className="mt-2 text-third text-sm text-center">
                  New chapter every Friday 🌱
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
