"use client";

import Image from "next/image";
import Typography from "../property/Typography";
import Button from "./Button";

export default function Hero() {
  const projects = [
    {
      title: "Kitchen",
      description: "Refurbished and refinanced for maximum returns",
      image: "/property/kam-kitchen.webp",
    },
    {
      title: "Kitchen After",
      description: "Refurbished and refinanced for maximum returns",
      image: "/property/kam-kitchen-after.webp",
    },
    {
      title: "Bedroom",
      description: "Turned a rundown house into a profitable rental",
      image: "/property/kam-bedroom1.webp",
    },
    {
      title: "Bedroom After",
      description: "Turned a rundown house into a profitable rental",
      image: "/property/kam-bedroom1-after.webp",
    },
  ];

  return (
    <section className="py-0 md:py-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 text-left ">
        <Typography variant="h3" className="mb-4">
          Kingdom Home Builders
        </Typography>

        <Typography variant="h6" className="text-secondary mb-2">
          Transforming Rundown Houses into Beautiful, Liveable Homes
        </Typography>

        <Typography variant="body1" className="mb-6">
          Kingdom Home Builders is a construction business focused on
          delivering high-quality, stress-free property renovations. We offer
          complete project management, from structural repairs and plumbing to
          kitchen and bathroom installations.
        </Typography>
        <Button className="mt-6">See Projects</Button>
      </div>

      {/* Right Side - Image Gallery */}
      <div className="md:w-1/2 grid md:grid-cols-2 gap-6 mt-10 md:mt-0">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/20 backdrop-blur-md p-2 rounded-b-xl">
              <Typography variant="body1" className="">
                {project.title}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
