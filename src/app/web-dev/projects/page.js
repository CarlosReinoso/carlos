"use client";
import Typography, { body1, h6 } from "@/components/common/Typography";
import { projects } from "@/components/web-dev/ProjectsSection";
import TechBadge from "@/components/web-dev/TechBadge";

const tdStyles = "py-4 px-4";

export default function ProjectsPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center lg:flex lg:justify-between lg:gap-24 px-8 py-12 md:py-0 max-w-screen-xl">
        <div className="w-full py-0 md:py-24">
          <Typography variant="h1" className="text-4xl font-bold mb-8">
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
