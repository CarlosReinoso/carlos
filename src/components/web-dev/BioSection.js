import Image from "next/image";
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

          <Typography variant="body1" className="text-gray-300">
            I design and develop digital experiences tailored for solo
            entrepreneurs and small businesses. With experience working in
            startups to large FTS100 companies.
          </Typography>
          <Typography variant="body1" className="text-gray-300 mt-4">
            I now focus on empowering independent business owners—artists,
            property investors, Airbnb hosts as well as psychosomatic teachers
            and many more—to establish a strong online presence. Whether it's a{" "}
            <WhiteText>sleek portfolio</WhiteText>, a{" "}
            <WhiteText>booking platform</WhiteText>, or an{" "}
            <WhiteText>eCommerce site</WhiteText>, I create websites that are
            intuitive, visually compelling, and built for growth.
          </Typography>

          <Typography variant="body1" className="text-gray-300 mt-4">
            To relax I like to play guitar and sing, stay active at the gym, and
            love exploring new places. Right now, I’m planning an epic world
            trip to inspire my creativity for music, poetry and philosophy.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
