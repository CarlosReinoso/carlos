import Typography from "../common/Typography";

export default function SidebarIcons() {
  return (
    <div className="flex flex-col lg:flex-row bg-slate-900">
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
