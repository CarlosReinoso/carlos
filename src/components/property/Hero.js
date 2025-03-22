"use client";

import Image from "next/image";
import Typography from "../property/Typography";
import Button from "./Button";

export const projects = [
  {
    title: "Kitchen",
    description: "Refurbished and refinanced for maximum returns",
    image: "/property/projects/kam/before/kitchen.jpeg",
  },
  {
    title: "Kitchen After",
    description: "Refurbished and refinanced for maximum returns",
    image: "/property/projects/kam/after/kitchen.jpeg",
  },
  {
    title: "Bedroom",
    description: "Turned a rundown house into a profitable rental",
    image: "/property/projects/kam/before/bed1.jpeg",
  },
  {
    title: "Bedroom After",
    description: "Turned a rundown house into a profitable rental",
    image: "/property/projects/kam/after/bed1.jpeg",
  },
];

export default function Hero() {
  return (
    <section className="py-0 md:py-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 text-left ">
        <Typography variant="h3" className="mb-4">
          Property Investing to Build Wealth &{" "}
          <span className="text-third">Live Freely</span>
        </Typography>
        <Typography variant="h6" className="text-secondary">
          Turning Rundown Properties into Profitable Investments
        </Typography>
        <Typography variant="body1">
          I help investors find discounted property deals and turn distressed
          homes into profitable investments. My market research blends official
          data with insights from estate agents and my network, giving investors
          a detailed view of the market.
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
