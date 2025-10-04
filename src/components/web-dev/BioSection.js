import Image from "next/image";
import Link from "next/link";
import Typography from "../common/Typography";
import WhiteText from "./WhiteText";
import TechBadge from "./TechBadge";

const BioSection = () => {
  return (
    <section id="about" className="mb-16">
      <div
        className="w-full text-left
      "
      >
        {/* Right Section */}
        <div className="w-full">
          <div className="relative w-full max-w-[450px] aspect-[4/3] mx-auto p-[2px] bg-gray-500 clip-hexagon mb-8 group transition-all duration-100 ease-in-out hover:bg-third hover:p-[4px] sm:aspect-[4/3]">
            <Image
              src="/web-dev/headshot.webp"
              width={400}
              height={400}
              alt="headshot"
              className="w-full h-full object-cover object-[20%_center] clip-hexagon transition-transform duration-500 ease-in-out group-hover:scale-[1.015] group-hover:brightness-105"
            />
            <TechBadge className="absolute bottom-4 right-1/2 translate-x-1/2 sm:right-28 sm:translate-x-0 text-xs sm:text-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-200/20">
              Web Dev
            </TechBadge>
          </div>

          <Typography variant="body1" className="text-gray-300 mt-4">
            I help <WhiteText>startups</WhiteText>,{" "}
            <WhiteText>enterprises</WhiteText>, and{" "}
            <WhiteText>investors</WhiteText> build scalable{" "}
            <WhiteText>SaaS platforms</WhiteText>,{" "}
            <WhiteText>AI-powered applications</WhiteText>, and high-performance{" "}
            <WhiteText>FinTech systems</WhiteText> that deliver measurable
            business results. With <WhiteText>5+ years of experience</WhiteText>{" "}
            across the US, Europe, and Asia, I've successfully launched
            platforms in <WhiteText>SaaS</WhiteText>,{" "}
            <WhiteText>trading</WhiteText>, <WhiteText>e-commerce</WhiteText>,{" "}
            <WhiteText>healthcare</WhiteText>, and{" "}
            <WhiteText>education</WhiteText>, consistently turning ideas into
            profitable products.
          </Typography>

          <Typography variant="body1" className="text-gray-300 mt-4">
            To relax I like to play guitar and sing, stay active at the gym, and
            love exploring new places. Right now, I'm planning an epic world
            trip to inspire my creativity for{" "}
            <Link href="/music">
              <WhiteText>music</WhiteText>
            </Link>
            , poetry and{" "}
            <Link href="/books">
              <WhiteText>philosophy</WhiteText>
            </Link>
            .
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
