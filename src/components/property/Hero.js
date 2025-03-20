"use client";

import Image from "next/image";
import Typography from "../property/Typography";

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
    <section className="h-[80vh] px-10 flex flex-col md:flex-row items-center justify-between gap-24">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 text-left">
        <Typography variant="h3" className="mb-4">
          Property Investing to Build Wealth &{" "}
          <span className="text-third">Live Freely</span>
        </Typography>
        <Typography variant="h6" className="text-gray-400">
          Turning Rundown Properties into Profitable Investments
        </Typography>
        <Typography variant="body1">
          I help investors find high-yield property deals and transform
          distressed homes into profitable investments. At the same time, I
          document my journey—sharing real experiences, wins, and lessons
          learned. Whether you’re looking for your next deal or inspiration for
          your own property projects, you’ll find it here.
        </Typography>
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
