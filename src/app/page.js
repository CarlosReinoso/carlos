import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/Hero";
import UpcomingEvent from "@/components/UpcomingEvent";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <UpcomingEvent />
      {/* <Footer /> */}
    </main>
  );
}
