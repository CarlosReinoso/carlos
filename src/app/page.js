import EventsPlatformSection from "@/components/EventsPlatformSection";
import HeroSection from "@/components/Hero";
import SpotlightSection from "@/components/SpotlightSection";
import UpcomingEvent from "@/components/UpcomingEvent";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <UpcomingEvent />
      <SpotlightSection />
      <EventsPlatformSection />
    </main>
  );
}
