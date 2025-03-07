import Sidebar from "@/components/web-dev/Sidebar";
import BioSection from "@/components/web-dev/BioSection";
import ExperienceSection from "@/components/web-dev/ExperienceSection";
import ProjectSection from "@/components/web-dev/ProjectsSection";

export default function WebDevPage() {
  return (
    <div className="lg:flex lg:justify-between lg:gap-4 bg-slate-900 px-8 py-12">
      <Sidebar />

      <main className="w-full lg:w-1/2">
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
