"use client";

import Image from "next/image";
import Typography from "../common/Typography";

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
    <section className="min-h-screen p-10 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 text-left">
        <Typography variant="h1" className="mb-4">
          From First Deal to Full-Time Property Investor
        </Typography>
        <Typography variant="h2" className="text-gray-400">
          Turning Rundown Properties into Profitable Investments
        </Typography>
        <Typography variant="p" className="mt-4 text-lg max-w-xl">
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
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <Typography variant="h5" className="font-semibold">
                {project.title}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
