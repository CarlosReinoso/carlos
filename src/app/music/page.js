"use client";

import EmailIcon from "@/components/icons/EmailIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { webEmailUrl } from "@/lib/constants";
import Image from "next/image";
import MusicPlayer from "@/components/music/MusicPlayer";

export default function MusicPageHero() {
  const iconWrapperStyles =
    "flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg transition duration-300 group";
  const svgStyles =
    "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 fill-current text-white group-hover:text-third";

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
        <div className="flex justify-between items-center px-2 md:px-8 py-4 w-full gap-2">
          <h4 className="text-white bg-gradient-to-r from-amber-500 to-stone-500 rounded blur-custom opacity-80 px-3 py-1 text-base sm:text-lg md:text-xl whitespace-nowrap !mb-0">
            [Carlos Reinoso]
          </h4>

          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center text-white bg-gradient-to-r from-amber-500 to-stone-500 rounded blur-custom opacity-80 px-2 py-1">
            <WhatsAppIcon className={iconWrapperStyles} svgStyles={svgStyles} />
            <EmailIcon
              href={webEmailUrl}
              className={iconWrapperStyles}
              svgStyles={svgStyles}
            />
            <LinkedInIcon className={iconWrapperStyles} svgStyles={svgStyles} />
            <InstagramIcon
              className={iconWrapperStyles}
              svgStyles={svgStyles}
              size="40px"
            />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Music Player */}
      <MusicPlayer />
    </section>
  );
}
