import Typography from "../common/Typography";

export default function SidebarHero() {
  return (
    <div className="flex flex-col space-y-2 lg:space-y-3 text-white w-full">
      <Typography variant="h1" className="text-4xl font-bold">
        Carlos Reinoso
      </Typography>
      <Typography variant="h2" className="text-lg text-gray-400">
        Web Developer
      </Typography>
      <Typography variant="body" className="text-gray-400 mt-2">
        Helping solo entrepreneurs and small businesses create stunning websites
        that drive success.
      </Typography>
    </div>
  );
}
