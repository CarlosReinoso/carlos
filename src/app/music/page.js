"use client";

import Image from "next/image";
import MusicPlayer from "@/components/music/MusicPlayer";
import SocialMediaIcons from "@/components/common/SocialMediaIcons";

export default function MusicPageHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/music/hero.webp"
        alt="Hero background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-between h-full pb-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 md:px-8 py-4 w-full gap-2 sm:gap-4">
          <h4 className="text-white bg-gradient-to-r from-amber-500 to-stone-500 rounded blur-custom opacity-80 px-3 py-1 text-sm sm:text-lg md:text-xl whitespace-nowrap !mb-0">
            [Carlos Reinoso]
          </h4>

          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center text-white bg-gradient-to-r from-amber-500 to-stone-500 rounded blur-custom opacity-80 px-2 py-1">
            <SocialMediaIcons spacing="" container="h-10" />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Music Player */}
      <MusicPlayer />
    </section>
  );
}
