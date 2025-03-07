import Typography from "@/components/common/Typography";
import ItemCard from "./ItemCard";

const experiences = [
  {
    title: "Senior Frontend Engineer, Accessibility",
    company: "Klaviyo",
    duration: "2024 – PRESENT",
    description:
      "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
    technologies: ["JavaScript", "TypeScript", "React", "Storybook"],
    link: "https://klaviyo.com",
  },
  {
    title: "Lead Engineer",
    company: "Upstatement",
    duration: "2018 – 2024",
    description:
      "Built, styled, and shipped high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects. Clients included Harvard Business School, Everytown for Gun Safety, and Vanderbilt University. Provided leadership within the engineering department, fostering collaboration and innovation.",
    technologies: [
      "JavaScript",
      "TypeScript",
      "HTML & SCSS",
      "React",
      "Next.js",
      "React Native",
      "WordPress",
      "Contentful",
      "Node.js",
      "PHP",
    ],
    link: "https://upstatement.com",
  },
  {
    title: "UI Engineer Co-op",
    company: "Apple",
    duration: "JULY – DEC 2017",
    description:
      "Developed and styled interactive web apps for Apple Music, including the UI of Apple Music’s embeddable web player, enhancing user experience and accessibility.",
    technologies: ["React", "JavaScript", "CSS", "Redux"],
    link: "https://apple.com",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mb-16">
      <Typography variant="h6">Experience</Typography>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ItemCard key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}
