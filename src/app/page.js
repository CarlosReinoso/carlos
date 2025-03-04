import AboutSection from "@/components/AboutSection";
import ExploreCollection from "@/components/ExploreCollectionSection";
import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <main clasName="pt-48">
      <HeroSection />
      <AboutSection />
      <ExploreCollection />
    </main>
  );
}
