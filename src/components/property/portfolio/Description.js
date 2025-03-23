"use client";

import Image from "next/image";
import Typography from "@/components/property/Typography";

export default function Description({ project }) {
  return (
    <div className="bg-primary border-t border-third py-12 px-6 md:px-12 space-y-20">
      {/* BEFORE */}
      <div className="grid md:grid-cols-2 items-center gap-8">
        <div>
          <Typography variant="h4" className="underline">
            Before
          </Typography>
          <Typography variant="body" className="text-white text-lg">
            {project.before}
          </Typography>
        </div>
        {project.beforeImage && (
          <div className="w-full overflow-hidden rounded-xl">
            <Image
              src={project.beforeImage}
              alt={`${project.title} - Before`}
              width={800}
              height={600}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* AFTER */}
      <div className="grid md:grid-cols-2 items-center gap-8">
        {project.afterImage && (
          <div className="w-full overflow-hidden rounded-xl">
            <Image
              src={project.afterImage}
              alt={`${project.title} - After`}
              width={800}
              height={600}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>
        )}
        <div>
          <Typography variant="h4" className="underline">
            After
          </Typography>
          <Typography variant="body" className="text-white text-lg">
            {project.after}
          </Typography>
        </div>
      </div>
    </div>
  );
}
