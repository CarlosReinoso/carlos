import React from "react";
import Typography from "@/components/common/Typography";

export default function ItemCard({
  title,
  description,
  technologies,
  link,
  image,
  stars,
  duration, // Added duration prop
}) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-transparent hover:border-gray-500 shadow-lg transition duration-300">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column: Image or Duration */}
        <div className="col-span-12 md:col-span-3 flex items-center">
          {image ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={image} alt={title} className="rounded-lg w-full" />
            </a>
          ) : (
            <Typography variant="body" className="w-full">
              {duration}
            </Typography>
          )}
        </div>

        {/* Right Column: Project Info */}
        <div
          className={`col-span-12 ${
            image ? "md:col-span-9" : "md:col-span-12"
          }`}
        >
          <Typography variant="h3" className="text-xl font-semibold text-white">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {title} ↗
            </a>
          </Typography>
          <Typography variant="body" className="text-gray-300 mt-3">
            {description}
          </Typography>

          {/* Star Rating (if available) */}
          {stars && (
            <Typography
              variant="body"
              className="text-gray-400 mt-2 flex items-center"
            >
              ⭐ {stars}
            </Typography>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-gray-700 text-gray-200 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
