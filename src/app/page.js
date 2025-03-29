"use client";

import SocialMediaIcons from "@/components/common/SocialMediaIcons";
import Footer from "@/components/property/Footer";
import { helloEmailUrl } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "/web-dev",
    title: "Web Development",
    description: "Portfolio & coding projects",
    imageSrc: "/home/web-dev.png",
  },
  {
    href: "/property",
    title: "Property Investing",
    description: "I source deals and renovate rundown houses",
    imageSrc: "/home/property.png",
  },
  {
    href: "/vcard",
    title: "eBusiness Card Creator",
    description:
      "A web app that allows you to create your own digital business QR code",
    imageSrc: "/home/vcard.png",
  },
  {
    href: "/books",
    title: "Books",
    description: "Book notes and reflections. Plus my very own manga - Amara",
    imageSrc: "/home/books.jpg",
  },
  {
    href: "/music",
    title: "Music",
    description:
      "Sharing my music - chill, emotive, and heartfelt compositions.",
    imageSrc: "/home/music.png",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white dark:bg-black">
      <h1 className="text-4xl font-bold mb-6 text-center pb-8">
        Welcome to the Hub
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        {links.map(({ href, title, description, imageSrc }) => (
          <Link href={href} key={href} className="group">
            <div className="flex flex-col h-full min-h-[320px] border border-gray-200 dark:border-gray-700 rounded-2xl transition duration-300 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h4 className="text-xl font-semibold mb-1 transition-colors duration-300 group-hover:text-third">
                  {title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
                <div className="flex-grow" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <SocialMediaIcons home={false} />
    </main>
  );
}
