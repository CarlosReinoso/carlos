import Typography from "./common/Typography";

const HeroSection = () => {
  return (
    <div
      className="relative h-[100vh] flex items-center justify-center bg-primary p-4"
      style={{
        backgroundImage:
          "url('https://swxkoqljwvokdwuukgii.supabase.co/storage/v1/object/public/gallery/vinon.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl overflow-hidden mt-24 md:mt-0">
        {/* Left side - Text */}
        <div className="flex flex-col justify-center items-start p-8 text-white">
          <Typography variant="h1" className="font-playfair">
            Grace <br /> Basak
          </Typography>
          <hr className="w-80 border-t-2 border-gray-300 mb-4" />
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center items-center bg-secondary px-2 md:px-12 rounded-md">
          <img
            src="/grace.jpg"
            alt="grace"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-cover p-4 rounded-md transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
