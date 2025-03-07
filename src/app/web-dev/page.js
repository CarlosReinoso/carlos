"use client";
import BioSection from "@/components/web-dev/BioSection";
import ExperienceSection from "@/components/web-dev/ExperienceSection";
import ProjectSection from "@/components/web-dev/ProjectsSection";
import Sidebar from "@/components/web-dev/Sidebar";
import StickyTitle from "@/components/web-dev/StickyTitle";
import useStickyTitle from "@/hooks/useStickyTitle";

export default function MainLayout() {
  const { activeSection, isStickyVisible } = useStickyTitle();

  return (
    <div className="lg:flex lg:justify-between lg:gap-4 px-8 py-12">
      <Sidebar />
      <main className="w-full lg:w-1/2 mt-40">
        {isStickyVisible && <StickyTitle contentTitle={activeSection} />}
        <BioSection />
        <ExperienceSection />
        <ProjectSection />
      </main>
    </div>
  );
}
