"use client";

import Link from "next/link";

const projectList = [
  { slug: "kam", title: "Kam's HMO" },
  { slug: "fredy", title: "Fredy's Reno" },
];

export default function PortfolioPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Portfolio</h1>
      <ul className="space-y-3">
        {projectList.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/property/portfolio/${project.slug}`}
              className="text-blue-600 underline"
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
