export default function TechBadge({ children, className }) {
  return (
    <span className={`font-raleway px-3 py-1 text-sm bg-gray-700 rounded-full bg-amber-200/10 text-amber-400 ${className}`}>
      {children}
    </span>
  );
}
