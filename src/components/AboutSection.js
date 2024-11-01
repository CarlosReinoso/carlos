import TextAndImageSection from "./common/TextAndImageSection";

const AboutSection = () => {
  return (
    <TextAndImageSection
      markdownFilePath="AboutSection.md"
      imgSrc="/homepage/about.jpg"
      imgAlt="about"
      imagePosition="left"
      className="mt-20"
      fontColor="white"
      priority
    />
  );
};

export default AboutSection;
