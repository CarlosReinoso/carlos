import EventsPlatformSection from "@/components/EventsPlatformSection";
import Footer from "@/components/Footer";
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
      <Footer />
    </main>
  );
}
