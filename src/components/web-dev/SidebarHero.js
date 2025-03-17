import Typography from "../common/Typography";
import WhiteText from "./WhiteText";

export default function SidebarHero() {
  return (
    <div className="flex flex-col space-y-2 lg:space-y-3 w-full  ">
      <Typography variant="h1" className="font-bold">
        Carlos Reinoso
      </Typography>

      <Typography variant="h3">Web Developer</Typography>
      <Typography variant="body1">
        Helping solo entrepreneurs and small businesses create{" "}
        <WhiteText>stunning</WhiteText> websites that drive success.
      </Typography>
    </div>
  );
}
