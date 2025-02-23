import EventsPlatformSection from "@/components/EventsPlatformSection";
import HeroSection from "@/components/Hero";
import SpotlightSection from "@/components/SpotlightSection";
import ShortStoriesSection from "@/components/ShortStoriesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ShortStoriesSection />
      {/* <SpotlightSection />
      <EventsPlatformSection /> */}
    </main>
  );
}
