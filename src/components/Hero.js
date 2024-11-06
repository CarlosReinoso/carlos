import { heroVideoUrlPortrait } from "@/lib/constants";
import Typography from "./common/Typography";

const HeroSection = () => {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full opacity-50 hidden sm:block object-cover"
      >
        <source src={heroVideoUrlPortrait} />
      </video>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full opacity-60 block sm:hidden object-cover"
      >
        <source src={heroVideoUrlPortrait} type="video/mp4" />
      </video>

      <div className="relative flex flex-col justify-center items-center text-center h-full opacity-90 text-shadow">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-[80%] h-[50%] blur-custom opacity-60"></div>
        </div>
        <div className="relative z-10">
          <Typography
            variant="h1"
            className="text-white tracking-extra"
          >
            Experience Conscious Dance
          </Typography>
          <Typography variant="h2" className="font-emblema text-white">
            Join The Luminous Community
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
