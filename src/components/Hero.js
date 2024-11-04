export default function HeroSection() {
  return (
    <div
      className="relative bg-center w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url(./homepage/hero.jpg)",
        backgroundSize: "contain", // Adjusts the background to fit within the container
        backgroundRepeat: "no-repeat", // Ensures the background is not repeated
        backgroundPosition: "top",
        height: "100vh", // Ensures full height of the viewport initially
      }}
    ></div>
  );
}
