import Typography from "@/components/common/Typography";
import ItemCard from "./ItemCard";
import SectionTitle from "./SectionTitle";

const experiences = [
  {
    title: "Web Developer Freelance",
    company: "Freelance",
    duration: "Jun 2024 – Present",
    location: "England, United Kingdom · Hybrid",
    description:
      "I help businesses save money by building custom-coded websites that eliminate costly platform fees, saving clients £150–£400 per year. I also develop direct booking systems for Airbnb hosts to bypass service fees. My work includes designing and developing responsive websites for small businesses, property investors, and entrepreneurs. I specialize in full-stack solutions, optimizing SEO and performance while integrating branding, hosting, and digital strategies to help businesses grow.",
    technologies: [
      "React.js",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
      "SQL",
      "Stripe",
    ],
  },
  {
    title: "Developer",
    company: "NEXT PLC",
    duration: "Dec 2023 – Jun 2024",
    location: "Leicester, England, United Kingdom · Hybrid",
    description:
      "Developed and maintained React.js/Next.js applications for e-commerce, ensuring seamless user experiences. Automated compliance processes using PowerShell to streamline Right to be Forgotten requests, aligning with GDPR and Data Protection Act compliance. Managed content publishing workflows, built a cache-refreshing web app for the support team, and updated SQL databases to modify product details such as delivery times.",
    technologies: [
      "SQL",
      "PowerShell",
      "Node.js",
      "Next.js",
      "React",
      "Tailwind",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Raindrop",
    duration: "Oct 2021 – Jan 2023",
    location: "London, England, United Kingdom",
    description:
      "Built and optimized Next.js components within Salesforce for in-house tooling. Led the development of an email templating app to migrate backend emails to the frontend. Integrated a headless CMS to streamline marketing content management. Maintained and modernized legacy web apps by migrating MUI4 components to MUI5 while actively contributing to Agile sprint planning and retrospectives.",
    technologies: ["React.js", "Git", "TypeScript", "MUI", "Next.js", "Jira"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mb-16">
      <SectionTitle>Experience</SectionTitle>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ItemCard key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}
