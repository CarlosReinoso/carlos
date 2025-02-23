import Typography from "./common/Typography";

const HeroSection = () => {
  return (
    <div className="relative h-[100vh] mt-32 sm:mt-8 flex items-center justify-center bg-primary p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl overflow-hidden">
        {/* Left side - Text */}
        <div className="flex flex-col justify-center items-start p-8">
          <Typography variant="h2" className="font-playfair">
            Keanu <br /> Lawrence <br /> Arcadio
          </Typography>
          <hr className="w-80 border-t-2 border-gray-600 mb-4" />
          <Typography variant="h5" className="font-semibold tracking-wide">
            WRITER & TEACHER
          </Typography>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center items-center bg-secondary h-[80vh] px-12">
          <img
            src="/keanu.jpg"
            alt="Keanu Lawrence Arcadio"
            className="w-full h-full object-cover p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
