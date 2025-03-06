import Sidebar from "@/components/web-dev/Sidebar";
import BioSection from "@/components/web-dev/BioSection";
import ExperienceSection from "@/components/web-dev/ExperienceSection";
import ProjectSection from "@/components/web-dev/ProjectsSection";

export default function WebDevPage() {
  return (
    <div className="flex flex-col lg:flex-row bg-slate-900">
      <Sidebar />

      <main className="w-full lg:w-3/4 p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
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
