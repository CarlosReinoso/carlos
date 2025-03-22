"use client";

import Typography from "./Typography";
import Button from "./Button";
import BeforeAfterSliderComponent from "./BeforeAfterSliderComponent";

export default function ProjectSection() {
  const projects = [
    {
      title: "Stoke on Trent",
      description:
        "This project involved a full refurbishment and conversion of a distressed property into a HMO. Located just five minutes from the university, the property now offers premium student accommodation with strong rental demand. The renovation included modern interiors, optimised space planning, and compliance with HMO standards, making it a lucrative investment opportunity.",
      before: "/property/projects/kam/before/kitchen.jpeg",
      after: "/property/projects/kam/after/kitchen.jpeg",
    },
    {
      title: "London, Dagenham",
      description:
        "A full renovation project following an auction purchase, transforming a run-down property into a modern living space. The works included a kitchen upgrade, a loft extension for additional bedrooms, and a full interior redesign. Situated in a growing rental market, this property now appeals to families and professionals, ensuring strong tenant demand and long-term capital appreciation.",
      before: "/property/projects/fredy/front.webp",
      after: null, // No after image (Work in Progress)
    },
  ];

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

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              {/* Left Side - Project Info */}
              <div className="text-left max-w-lg w-full md:w-1/2">
                <Typography variant="h4" className="mb-2">
                  {project.title}
                </Typography>
                <Typography variant="body1">{project.description}</Typography>
                <Button className="mt-4">View Case Study</Button>
              </div>

              {/* Right Side - Before & After Slider / Work in Progress */}
              <div className="relative w-full md:w-1/2 max-w-lg overflow-hidden rounded-lg shadow-lg">
                <BeforeAfterSliderComponent
                  beforeImage={project.before}
                  afterImage={project.after}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
