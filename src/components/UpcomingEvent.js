import Button from "./common/Button";
import Typography from "./common/Typography";

const UpcomingEvent = () => {
  return (
    <div className="relative text-center h-[80vh] bg-[url('/homepage/strawberry-moon.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <Typography
          variant="h2"
          className="font-monoton pt-20 opacity-90 text-shadow"
        >
          Luminous Next Event
        </Typography>
        <div className="container max-w-full flex justify-center pt-0 sm:pt-20">
          <div className="w-[900px] grid grid-cols-12 auto-rows-auto justify-items-center relative">
            {/* Image Container */}
            <div className="col-span-10 sm:col-span-8 col-start-1">
              <img
                src="/homepage/moon-dance.jpg"
                alt="moon-dance"
                className="rounded"
              />
            </div>

            {/* Box */}
            <div className="col-span-8 sm:col-span-10 col-start-3 sm:col-start-7 md:col-start-7 col-end-13 absolute top-full sm:top-[20%] md:top-[22%] transform -translate-y-1/4 z-20 p-4 bg-white text-black flex flex-col rounded">
              {/* Decorative inner square */}
              <div className="decorative-square"></div>

              {/* Existing content */}
              <Typography
                variant="h4"
                className="font-emblema text-primary h-text-shadow"
              >
                Luminous Conscious Dance
              </Typography>
              <Typography variant="body1">Sat, May 18 6pm</Typography>
              <Typography variant="body1">St Mary's Hornsey Rise</Typography>
              <Typography variant="body1" className="font-bold">
                From £11.55
              </Typography>
              <Button>Get Your Tickets Here</Button>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Wave at the Bottom */}
      <div className="absolute inset-x-0 bottom-[-1%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="var(--primary-colour)"
            fillOpacity="1"
            d="M0,64L48,106.7C96,149,192,235,288,261.3C384,288,480,256,576,245.3C672,235,768,245,864,218.7C960,192,1056,128,1152,101.3C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default UpcomingEvent;
