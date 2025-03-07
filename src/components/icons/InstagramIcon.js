export default function InstagramIcon({ className, svgStyles }) {
  return (
    <div className={`${className} text-gray-200`}>
      {" "}
      {/* Ensures stroke color */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`${svgStyles} fill-none stroke-current`} // Ensures color is inherited
        strokeWidth="2" // Ensures stroke is visible
      >
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect width="21" height="21" x="1.5" y="1.5" rx="5.48" ry="5.48" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="18" cy="5" r=".5" />
        </g>
      </svg>
    </div>
  );
}
