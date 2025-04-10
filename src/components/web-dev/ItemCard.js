import React from "react";
import Typography from "@/components/common/Typography";
import TechBadge from "./TechBadge";

export default function ItemCard({
  title,
  description,
  technologies,
  link,
  image,
  duration,
}) {
  return (
    <div className="group rounded-lg border border-transparent transition duration-300 hover:border-gray-500">
      <div className="bg-transparent p-6 rounded-lg transition duration-300 group-hover:bg-wd-gradient">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column: Date or Image */}
          <div className="col-span-12 md:col-span-3 flex items-start">
            {image ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img
                  src={image}
                  alt={title}
                  className="rounded-lg w-full group-hover:border"
                />
              </a>
            ) : (
              <Typography variant="body1" className="text-gray-400 text-sm">
                {duration}
              </Typography>
            )}
          </div>

          {/* Right Column: Project Info */}
          <div className="col-span-12 md:col-span-9">
            <Typography
              variant="h6"
              className="font-semibold text-secondary group-hover:text-amber-400 transition duration-300"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </Typography>
            <Typography variant="body1" className="text-gray-300 mt-3">
              {description}
            </Typography>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech, i) => (
                <TechBadge>{tech}</TechBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
