import Typography from "../common/Typography";

export default function SidebarHero() {
  return (
    <div className="flex flex-col lg:flex-row bg-slate-900">
      <div>
        <Typography variant="h1" className="text-4xl font-bold">
          Your Name
        </Typography>
        <Typography variant="h2" className="text-lg text-gray-400">
          Front-End Developer
        </Typography>
        <Typography variant="body" className="text-gray-400 mt-2">
          I build accessible, pixel-perfect digital experiences for the web.
        </Typography>
      </div>
    </div>
  );
}
