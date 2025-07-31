import React from "react";
import ItemCard from "./ItemCard";
import SectionTitle from "./SectionTitle";
import Button from "../property/Button";
import { websiteProjectsData } from "../../../database/websiteProjectsData";


export default function ProjectSection() {
  return (
    <section id="projects">
      <SectionTitle>Projects</SectionTitle>

      <div className="space-y-8">
        {websiteProjectsData.slice(0, 6).map((project, index) => (
          <ItemCard key={index} {...project} />
        ))}
      </div>
      <Button buttonUrl="/web-dev/projects"> View All Projects</Button>
    </section>
  );
}
