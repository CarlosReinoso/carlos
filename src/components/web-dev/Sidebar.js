import Typography from "../common/Typography";

export default function Sidebar() {
  return (
    <div className="lg:sticky top-0 h-screen flex flex-col justify-between p-6">
      {/* Branding */}
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

      {/* Navigation Links */}
      <nav className="mt-8">
        <ul className="space-y-3">
          <li>
            <a
              href="#about"
              className="text-white font-bold hover:text-gray-300"
            >
              ABOUT
            </a>
          </li>
          <li>
            <a href="#experience" className="text-gray-400 hover:text-white">
              EXPERIENCE
            </a>
          </li>
          <li>
            <a href="#projects" className="text-gray-400 hover:text-white">
              PROJECTS
            </a>
          </li>
        </ul>
      </nav>

      {/* Social Icons */}
      <div className="flex space-x-4 mt-6">
        <a href="#">
          <i className="text-gray-400 hover:text-white text-2xl">🐙</i>
        </a>
        <a href="#">
          <i className="text-gray-400 hover:text-white text-2xl">🔗</i>
        </a>
        <a href="#">
          <i className="text-gray-400 hover:text-white text-2xl">📷</i>
        </a>
      </div>
    </div>
  );
}
