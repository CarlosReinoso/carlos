import { propertyProjectsData } from "../../../../../database/propertyProjectsData";
import { getImagesFromPublicFolder } from "@/lib/getImagesFromPublicFolder";
import Hero from "@/components/property/portfolio/Hero";
import Description from "@/components/property/portfolio/Description";
import Images from "@/components/property/portfolio/Images";
import { pagePadding } from "@/app/layouts/PropertyLayout";

export default function ProjectPage({ params }) {
  const { slug } = params;
  const project = propertyProjectsData.find((p) => p.slug === slug);

  if (!project) return notFound();
  const beforeImages = getImagesFromPublicFolder(
    `${project.imageFolder}/before`
  );
  const afterImages = getImagesFromPublicFolder(`${project.imageFolder}/after`);

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-12">
      <Hero project={project} />
      <div className={pagePadding}>
        <Description project={project} />
        <Images
          project={project}
          beforeImages={beforeImages}
          afterImages={afterImages}
        />
      </div>
    </div>
  );
}
