"use client";

import Typography from "./Typography";
import Button from "./Button";
import BeforeAfterSliderComponent from "./BeforeAfterSliderComponent";
import { propertyProjectsData } from "../../../database/propertyProjectsData";

export default function ProjectSection() {
  return (
    <>
      <div className="border-t border-third my-10 w-4/5 m-auto"></div>

      <section className="py-8 text-center">
        <Typography variant="h3" className="mb-4">
          Projects Transformation
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-400 mb-10"
        >
          I started my property journey by joint venturing with experienced
          investors, learning firsthand how to source deals, manage renovations,
          and navigate property finance.
        </Typography>

        <div className="grid gap-12" id="projects">
          {propertyProjectsData.map((project, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              {/* Left Side - Project Info */}
              <div className="text-left max-w-lg w-full md:w-1/2">
                <Typography variant="h4" className="mb-2 underline">
                  {project.location}
                </Typography>
                <Typography variant="body1">{project.summary}</Typography>
                <Button
                  buttonUrl={`/property/portfolio/${project.slug}`}
                  className="mt-4"
                >
                  View Case Study
                </Button>
              </div>

              {/* Right Side - Before & After Slider / Work in Progress */}
              <div className="relative w-full md:w-1/2 max-w-lg overflow-hidden">
                <BeforeAfterSliderComponent
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
