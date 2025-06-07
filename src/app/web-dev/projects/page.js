"use client";
import Typography, { body1, h6 } from "@/components/common/Typography";
import { projects } from "@/components/web-dev/ProjectsSection";
import TechBadge from "@/components/web-dev/TechBadge";
import Link from "next/link";

const tdStyles = "py-4 px-4";

export default function ProjectsPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center lg:flex lg:justify-between lg:gap-24 px-8 py-12 md:py-0 max-w-screen-xl">
        <div className="w-full py-0 md:py-24">
          <Link
            href="/web-dev"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Web Development
          </Link>
          <Typography variant="h3" className="font-bold mb-8">
            All Projects
          </Typography>

          {/* Stacked Layout on Mobile */}
          <div className="block md:hidden">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => window.open(project.link, "_blank")}
                className="group p-4 mb-6 rounded-lg border border-gray-700 hover:border-gray-300 transition duration-300 cursor-pointer hover:bg-wd-gradient"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg w-full mb-4 border-transparent transition duration-300 group-hover:border group-hover:border-gray-300"
                />
                <Typography variant="h2" className="text-white font-bold">
                  {project.title}
                </Typography>
                <p className="text-gray-400 italic">{project.year}</p>
                <p className={`text-gray-300 ${body1} mt-2`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, i) => (
                    <TechBadge key={i}>{tech}</TechBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Table Layout for Larger Screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`${h6} text-left`}>
                  <th className={tdStyles}></th>
                  <th className={tdStyles}>Project</th>
                  <th className={tdStyles}>Description</th>
                  <th className={tdStyles}>Built with</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    onClick={() => window.open(project.link, "_blank")}
                    className="group hover:bg-wd-gradient transition duration-300 cursor-pointer border-t border-gray-700 hover:border-gray-300"
                  >
                    <td className={`${tdStyles}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-lg w-full border-transparent transition duration-300 group-hover:border group-hover:border-gray-300"
                      />
                    </td>
                    <td className={`${tdStyles}`}>
                      <span
                        className={`text-white ${body1} font-bold group-hover:text-third`}
                      >
                        {project.title}
                      </span>
                      <p>
                        <em>{project.year}</em>
                      </p>
                    </td>
                    <td className={`${tdStyles} ${body1}`}>
                      {project.description}
                    </td>
                    <td className={`${tdStyles}`}>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <TechBadge key={i}>{tech}</TechBadge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
