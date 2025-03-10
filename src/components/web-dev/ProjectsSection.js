import React from "react";
import ItemCard from "./ItemCard";
import SectionTitle from "./SectionTitle";
import Button from "./Button";

export const projects = [
  {
    year: 2025,
    title: "Keanu Arcadio",
    madeAt: "Independent",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://www.keanuarcadio.com/",
    description:
      "The personal website of Keanu Arcadio, a British writer specialising in literary fiction. His work explores themes of relationships, cities, class, and everyday life, influenced by modernist and contemporary literary traditions. The site showcases his writings and background in literature and fine art.",
    image: "/web-dev/keanu.webp",
  },
  {
    year: 2025,
    title: "Grace Art",
    madeAt: "Independent",
    technologies: ["Next.js", "React", "Vercel"],
    link: "https://grace-art.vercel.app/",
    description:
      "The online portfolio of Grace, a UK-based artist specialising in oil paintings. Her work is inspired by nature, spirituality, and mythology, blending her background in sculpting, TV, and psychology. The website presents her artistic journey and showcases her creations.",
    image: "/web-dev/grace-art.webp",
  },
  {
    year: 2025,
    title: "Soulful Soles",
    madeAt: "Independent",
    technologies: ["Next.js", "React", "Vercel"],
    link: "https://soulfulsoles.com/",
    description:
      "Soulful Soles is the online presence of Grace, a certified reflexologist trained at the London School of Reflexology. Based in Hackney Wick, she offers intuitive reflexology treatments that support the body's natural healing process. The site provides information on her holistic approach, treatment plans, and healing philosophy.",
    image: "/web-dev/grace.webp",
  },
  {
    year: 2023,
    title: "EcuaStay",
    madeAt: "Independent",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://www.ecuastay.com/",
    description:
      "A website for Ecua Serviced Accommodation, offering a modern and comfortable stay in Dagenham, Greater London. The site provides details on amenities, local attractions, and booking options for short- and long-term stays.",
    image: "/web-dev/fredy.webp",
  },
  {
    year: 2023,
    title: "Zen Transformations",
    madeAt: "Independent",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://zentransformations.com/",
    description:
      "The official website of Zen Transformations, a property development company focusing on residential and mixed-use projects across South East England. It outlines the company’s vision, services, and investment opportunities.",
    image: "/web-dev/faisal.webp",
  },
  {
    year: 2023,
    title: "Eliza Veretilo",
    madeAt: "Independent",
    technologies: ["WordPress", "Elementor", "PHP"],
    link: "https://elizaveretilo.com/",
    description:
      "An astrology and personal growth website by Eliza Veretilo, offering natal chart readings, astrology workshops, and creative coaching. The site showcases her artistic work and healing practices.",
    image: "/web-dev/eliza.webp",
  },
  {
    year: 2023,
    title: "Lynn Tran",
    madeAt: "Independent",
    technologies: ["WordPress", "Custom Theme", "PHP"],
    link: "https://lynntran.co.uk/",
    description:
      "A personal site for Lynn Tran, an energy and body worker, intuitive shadow integrator, and Innerdance facilitator. The site presents her journey, healing services, and workshop offerings.",
    image: "/web-dev/lynn.webp",
  },
  {
    year: 2023,
    title: "Luminous Dance",
    madeAt: "Independent",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://www.luminousdance.co.uk/",
    description:
      "A dance community website for Luminous Ent, bringing together dancers in a heart-centred space. The site promotes events featuring DJ-led dance experiences inspired by conscious movement practices.",
    image: "/web-dev/luminous.webp",
  },
  {
    year: 2023,
    title: "Makan Sacko",
    madeAt: "Independent",
    technologies: ["WordPress", "PHP", "Custom Theme"],
    link: "https://makansacko.art/",
    description:
      "A tribute website dedicated to the late Diéli Makan Sacko, a Malian griot and dancer. The site details his life, legacy, and contributions to traditional dance and music.",
    image: "/web-dev/makan.webp",
  },
  {
    year: 2023,
    title: "Rincón Costeño",
    madeAt: "Independent",
    technologies: ["WordPress", "WooCommerce", "PHP"],
    link: "https://www.rinconcosteno.co.uk/",
    description:
      "The online presence of Rincón Costeño, an Ecuadorian restaurant in London. It highlights the restaurant’s history, menu, and upcoming locations while celebrating traditional Ecuadorian cuisine.",
    image: "/web-dev/rincon.webp",
  },
];

export default function ProjectSection() {
  return (
    <section id="projects">
      <SectionTitle>Projects</SectionTitle>

      <div className="space-y-8">
        {projects.slice(0, 6).map((project, index) => (
          <ItemCard key={index} {...project} />
        ))}
      </div>
      <Button buttonUrl="/web-dev/projects"> View All Projects</Button>
    </section>
  );
}
