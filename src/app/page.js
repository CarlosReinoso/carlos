import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import SpotlightSection from "@/components/SpotlightSection";
import UpcomingEvent from "@/components/UpcomingEvent";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <UpcomingEvent />
      <SpotlightSection />
      <Footer />
    </main>
  );
}
