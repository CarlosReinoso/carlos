import Button from "./common/Button";
import Typography from "./common/Typography";

const UpcomingEvent = () => {
  return (
    <div className="text-center relative h-[80vh] bg-[url('/homepage/strawberry-moon.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Typography variant="h2" className="font-monoton pt-20 z-10 opacity-90 text-shadow">
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
  );
};

export default UpcomingEvent;
