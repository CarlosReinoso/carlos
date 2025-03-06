import "../../styles/web-dev.css";
import { metadataWebDev } from "../../metadata/web-dev";
import HeroSection from "@/components/web-dev/BioSection";
import ExperienceSection from "@/components/web-dev/ExperienceSection";
import Sidebar from "@/components/web-dev/Sidebar";
import Typography from "@/components/common/Typography";
import BioSection from "@/components/web-dev/BioSection";
import ProjectSection from "@/components/web-dev/ProjectsSection";

export const metadata = metadataWebDev;

export default function WebDevPage() {
  return (
    <div className="flex">
      {/* Left Sidebar (Sticky Navigation) */}
      <aside className="w-1/2 lg:w-1/2 hidden lg:block bg-slate-900 text-white">
        <Sidebar />
      </aside>

      {/* Right Content (Scrollable) */}
      <main className="w-full lg:w-3/4 overflow-y-auto p-8 bg-slate-900">
        <section id="about" className="mb-16">
          <BioSection />
        </section>

        <section id="experience" className="mb-16">
          <ExperienceSection />
        </section>

        <section id="projects">
          <ProjectSection />
        </section>
      </main>
    </div>
  );
}
