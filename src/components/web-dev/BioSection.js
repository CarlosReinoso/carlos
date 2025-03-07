import Typography from "../common/Typography";
import WhiteText from "./WhiteText";

const BioSection = () => {
  return (
    <section id="about" className="mb-16">
      <div
        className="w-full text-left
      "
      >
        {/* Right Section */}
        <div className="w-full">
          <Typography variant="body1" className="text-gray-300">
            I design and develop digital experiences tailored for solo
            entrepreneurs and small businesses. With experience working in
            startups and larger companies.
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
            In my spare time, I play guitar and sing, stay active at the gym,
            and love exploring new places. Right now, I’m planning an epic world
            trip—fuelled by a passion for adventure and discovering new
            inspiration within to channel into music and poetry.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
