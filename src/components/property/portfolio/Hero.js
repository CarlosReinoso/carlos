"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/property/Typography";

export default function Hero({ project }) {
  const {
    title,
    dateCompleted,
    afterImage,
    beforeImage,
    summary,
    valueOfWorks,
    purchaseDate,
  } = project;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%_30%] min-h-[60vh]">
      {/* Left - Image Full Height */}
      <div className="relative w-full h-full min-h-[300px] border-y border-r border-third">
        <Image
          src={afterImage || beforeImage}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col justify-end md:justify-center px-6 py-8">
          <Link href="/property/portfolio" className="text-sm underline mb-2">
            ‹ See projects
          </Link>
          <Typography variant="h1" className="text-4xl font-bold text-white">
            {title}
          </Typography>
          <Typography variant="body" className="text-lg mt-2 text-white">
            Completed {dateCompleted}
          </Typography>
        </div>
      </div>

      {/* Right - Info Box */}
      <div className="bg-primary flex flex-col justify-start border-b border-third">
        <div className="flex flex-col divide-y divide-third border-t border-third">
          {/* Summary */}
          <div className="p-6">
            <Typography variant="body" className="text-lg text-white">
              {summary}
            </Typography>
          </div>

          {/* Value of Works */}
          <div className="p-6">
            <Typography
              variant="subheading"
              className="text-sm font-semibold uppercase tracking-wide text-white"
            >
              Value of Works
            </Typography>
            <Typography variant="body" className="text-lg text-white">
              {valueOfWorks}
            </Typography>
          </div>

          {/* Purchase Date */}
          <div className="p-6">
            <Typography
              variant="subheading"
              className="text-sm font-semibold uppercase tracking-wide text-white"
            >
              Purchase Date
            </Typography>
            <Typography variant="body" className="text-lg text-white">
              {purchaseDate}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
