import ProjectTable from "@/components/web-dev/ProjectsTable";

const projects = [
  {
    year: 2023,
    name: "Emerson Collective",
    madeAt: "Upstatement",
    techStack: ["Next.js", "TypeScript", "SCSS", "Contentful"],
    link: "https://emersoncollective.com",
  },
  {
    year: 2023,
    name: "Harvard Business School Next.js Site",
    madeAt: "Upstatement",
    techStack: ["React", "TypeScript", "Next.js", "Contentful"],
    link: "https://hbs.edu",
  },
  {
    year: 2022,
    name: "Harvard Business School Design System",
    madeAt: "Upstatement",
    techStack: ["Storybook", "React", "TypeScript"],
    link: "https://hbs.edu",
  },
  {
    year: 2022,
    name: "Threadable",
    madeAt: "Upstatement",
    techStack: ["React Native", "Ruby on Rails", "Firebase"],
    link: "https://apps.apple.com",
  },
  {
    year: 2022,
    name: "Pratt",
    madeAt: "Upstatement",
    techStack: [
      "WordPress",
      "Timber",
      "WordPress Multisite",
      "Gutenberg",
      "JavaScript",
    ],
    link: "https://pratt.edu",
  },
  {
    year: 2022,
    name: "Everytown Gun Law Rankings",
    madeAt: "Upstatement",
    techStack: ["WordPress", "Timber", "PHP", "Airtable API"],
    link: "https://everytownresearch.org/rankings",
  },
];

export default function ProjectsPage() {
  return <ProjectTable projects={projects} />;
}
