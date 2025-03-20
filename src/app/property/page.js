import ProjectSection from "@/components/property/ProjectsSection";
import { metadataProperty } from "../../metadata/property";
import Hero from "@/components/property/Hero";

export const metadata = metadataProperty;

export default function PropertyPage() {
  return (
    <>
      <Hero />
      <ProjectSection />
    </>
  );
}
