import { projects } from "@/components/web-dev/ProjectsSection";
import ProjectTable from "@/components/web-dev/ProjectsTable";


export default function ProjectsPage() {
  return <ProjectTable projects={projects} />;
}
