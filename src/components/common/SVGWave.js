export default function SVGWave({ className = "", style }) {
  return (
    <div className={className} style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-auto"
      >
        <path
          fill="var(--primary-colour)"
          fillOpacity="1"
          d="M0,64L48,106.7C96,149,192,235,288,261.3C384,288,480,256,576,245.3C672,235,768,245,864,218.7C960,192,1056,128,1152,101.3C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
