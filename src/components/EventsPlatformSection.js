import Typography from "./common/Typography";
import SVGWave from "./common/SVGWave";
import Button from "./common/Button";

const EventsPlatformSection = () => {
  return (
    <div>
      <div className="relative h-[50vh] bg-[url('/homepage/pink-moon.jpg')] bg-cover bg-center bg-black bg-opacity-50 bg-blend-overlay text-center">
        <SVGWave style={{ transform: "scale(1, -1) translateY(0.2px)" }} />
        <div className="flex flex-col justify-around h-[25vh]">
          <Typography variant="h2" className="font-monoton text-shadow ">
            Events Near You
          </Typography>
          <Typography variant="h2" className="font-emblema text-white">
            Dance With Our Partners
          </Typography>
          <Button theme="dark">Find Events</Button>
        </div>
      </div>
    </div>
  );
};

export default EventsPlatformSection;
