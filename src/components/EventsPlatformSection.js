import Typography from "./common/Typography";
import SVGWave from "./common/SVGWave";
import Button from "./common/Button";
import Link from "next/link";

const EventsPlatformSection = () => {
  return (
    <div>
      <div className="relative h-[60vh] sm:h-[60vh] md:h-[60vh] lg:h-[80vh] 2xl:h-[100vh] bg-[url('/homepage/pink-moon.jpg')] bg-cover bg-center bg-black bg-opacity-50 bg-blend-overlay text-center">
        <SVGWave style={{ transform: "scale(1, -1) translateY(0.2px)" }} />
        <div className="flex flex-col justify-around h-[30vh] sm:h-[30vh] md:h-[30vh]">
          <Typography variant="h2" className="font-monoton text-shadow ">
            Events Near You
          </Typography>
          <Typography variant="h2" className="font-emblema text-white">
            Dance With Our Partners
          </Typography>
          <Button href={"/events"} theme="dark">
            Find Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsPlatformSection;
