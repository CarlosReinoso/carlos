import React from "react";
import ItemCard from "./ItemCard";
import SectionTitle from "./SectionTitle";
import Button from "../property/Button";

export const projects = [
  {
    year: 2025,
    title: "Keanu Arcadio - Writer and Teacher",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://www.keanuarcadio.com/",
    description:
      "A portfolio website for Keanu Arcadio, a British literary fiction writer. Showcases his work, background, and influences. I designed a clean UI with smooth navigation and content structuring with a simple admin panel to edit his site",
    image: "/web-dev/keanu.webp",
  },
  {
    year: 2025,
    title: "Grace eCommerce Art Website",
    technologies: ["Next.js", "React", "Vercel", "Stripe"],
    link: "https://grace-art.vercel.app/",
    description:
      "An eCommerce store for Grace's art, featuring her paintings and artistic journey. I integrated Gelato (a print-on-demand service), migrated her Wix site to a bespoke coded solution, and built an admin dashboard for product management—saving her a fortune on hosting fees.",
    image: "/web-dev/grace-art.webp",
  },
  {
    year: 2025,
    title: "Soulful Soles",
    technologies: ["Next.js", "React", "Vercel"],
    link: "https://soulfulsoles.com/",
    description:
      "A website for Grace’s reflexology practice. Provides treatment info and booking options. I built a smooth UX with a calming aesthetic to reflect her holistic approach.",
    image: "/web-dev/grace.webp",
  },

  {
    year: 2025,
    title: "Luminous Dance",
    technologies: ["Next.js", "Puppeteer", "Vercel", "Tailwind CSS"],
    link: "https://www.luminousdance.co.uk/",
    description:
      "A community dance events website promoting DJ-led experiences and conscious movement. I built an automated events page using Puppeteer to scrape data from Eventbrite, allowing seamless event creation and hosting for external users. Hosted on Vercel, this project was a challenging but rewarding automation solution.",
    image: "/web-dev/luminous.webp",
  },
  {
    year: 2024,
    title: "EcuaStay",
    technologies: ["Next.js", "React", "Tailwind CSS", "Stripe", "iCal"],
    link: "https://www.ecuastay.com/",
    description:
      "A serviced accommodation booking site in London, listing property details, amenities, and booking options. I integrated Stripe for payments and synced Airbnb & Booking.com calendars via iCal to automate availability updates across platforms.",
    image: "/web-dev/fredy.webp",
  },
  {
    year: 2024,
    title: "Zen Transformations",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://zentransformations.com/",
    description:
      "A property development firm’s website showcasing projects and investment opportunities. I implemented a structured layout and clear CTAs to attract investors.",
    image: "/web-dev/faisal.webp",
  },
  {
    year: 2024,
    title: "Eliza Veretilo",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    link: "https://elizaveretilo.com/",
    description:
      "A personal site for an astrologer and creative coach, showcasing her services, blog, and paintings. I listed her artwork with Etsy integration, built a simple budget-friendly site, and provided a video tutorial for easy self-management.",
    image: "/web-dev/eliza.webp",
  },

  {
    year: 2024,
    title: "Rincón Costeño",
    technologies: ["WordPress", "WooCommerce", "PHP"],
    link: "https://www.rinconcosteno.co.uk/",
    description:
      "An Ecuadorian restaurant’s website. Displays the menu, locations, and history. I made some fixes the owner wanted",
    image: "/web-dev/rincon.webp",
  },
  {
    year: 2024,
    title: "Enseñanza Saint Germain",
    technologies: ["Thinkific", "Liquid", "Stripe"],
    link: "https://www.esgweb.org/",
    description:
      "An Ecuadorian restaurant’s website. Displays the menu, locations, and history. I made some fixes the owner wanted",
    image: "/web-dev/esg.webp",
  },
  {
    year: 2023,
    title: "Lynn Tran",
    technologies: ["Next.js", "React", "Tailwind CSS", "Sanity.io"],
    link: "https://lynntran.co.uk/",
    description:
      "A site for Lynn, an energy and body worker, showcasing her healing services and workshops. I built a CMS with Sanity.io for easy content management, creating a simple, elegant site that highlights her high-quality content and facilitates session bookings.",
    image: "/web-dev/lynn.webp",
  },
  {
    year: 2021,
    title: "Makan Sacko",
    technologies: ["React", "Node", "Firebase", "Stripe"],
    link: "https://makansacko.art/",
    description:
      "A tribute site for the late Malian dancer. Preserves his legacy through this site. I structured the site for an immersive storytelling experience.",
    image: "/web-dev/makan.webp",
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
