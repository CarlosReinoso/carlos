import React from "react";
import Typography from "@/components/common/Typography";
import ItemCard from "./ItemCard";

const projects = [
  {
    title: "Build a Spotify Connected App",
    description:
      "Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
    technologies: ["React", "Express", "Spotify API", "Heroku"],
    link: "https://example.com",
    image: "/images/spotify-app.png",
  },
  {
    title: "Spotify Profile",
    description:
      "Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    technologies: ["React", "Express", "Spotify API", "Heroku"],
    link: "https://example.com",
    image: "/images/spotify-profile.png",
    stars: 677,
  },
];

export default function ProjectSection() {
  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16 text-white">
      <Typography variant="h2" className="text-3xl font-bold mb-8">
        Projects
      </Typography>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <ItemCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
