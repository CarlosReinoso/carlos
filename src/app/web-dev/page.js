"use client";
import BioSection from "@/components/web-dev/BioSection";
import CursorBlob from "@/components/web-dev/CursorBlob";
import ExperienceSection from "@/components/web-dev/ExperienceSection";
import ProjectSection from "@/components/web-dev/ProjectsSection";
import Sidebar from "@/components/web-dev/Sidebar";
import StickyTitle from "@/components/web-dev/StickyTitle";
import useStickyTitle from "@/hooks/useStickyTitle";

export const navItems = [
  { id: "about", name: "About" },
  { id: "experience", name: "Experience" },
  { id: "projects", name: "Projects" },
];

export default function WebDevPage() {
  const { activeSection, isStickyVisible } = useStickyTitle();

  return (
    <div className="w-full flex justify-center">
      <CursorBlob />
      <div className="lg:flex lg:justify-between lg:gap-24 px-8 py-12 md:py-0 max-w-screen-xl">
        <Sidebar
          className="w-full lg:w-2/5 py-0 md:py-24 "
          activeSection={activeSection}
        />
        <main className="w-full lg:w-3/5 pt-24">
          {isStickyVisible && (
            <StickyTitle
              isStickyVisible={isStickyVisible}
              contentTitle={activeSection}
            />
          )}
          <BioSection />
          <ExperienceSection />
          <ProjectSection />
        </main>
      </div>
    </div>
  );
}
