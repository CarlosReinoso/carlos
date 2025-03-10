import React from "react";
import Typography from "@/components/common/Typography";

export default function ProjectTable({ projects }) {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 text-white">
      <Typography variant="h1" className="text-4xl font-bold mb-8">
        All Projects
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="text-gray-400 text-left border-b border-gray-700">
              <th className="py-3">Year</th>
              <th className="py-3">Project</th>
              <th className="py-3">Made at</th>
              <th className="py-3">Built with</th>
              <th className="py-3">Link</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition duration-300"
              >
                <td className="py-4 text-gray-400">{project.year}</td>
                <td className="py-4 font-semibold">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-white"
                  >
                    {project.name} ↗
                  </a>
                </td>
                <td className="py-4 text-gray-400">{project.madeAt}</td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-700 text-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-gray-400">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-400"
                  >
                    {project.link.replace("https://", "").replace("www.", "")} ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
