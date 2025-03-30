import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      {/* Gradient Overlay */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-secondary) 15%, rgba(59,95,79,0.4) 60%, transparent 80%)`,
        }}
      ></div>

      <section className="relative w-screen h-[100vh] overflow-hidden mb-8">
        {/* Hero Background Image */}
        <img
          src="/travel/hero.webp"
          alt="hero"
          className="w-[110vw] translate-x-[5vw] h-full object-cover z-0"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-4 sm:px-16 z-20 w-full max-w-[90vw] sm:-ml-[3vw]">
          <div className="absolute top-0 left-0 w-full z-30">
            <div className="flex justify-center">
              <div className="relative rounded-xl overflow-visible px-16 py-4">
                {/* Glowing/fading soft background */}
                <div
                  className="absolute inset-0 rounded-xl z-0 
             bg-[radial-gradient(circle,_rgba(245,240,230,0.9)_0%,_rgba(245,240,230,0.4)_60%,_rgba(245,240,230,0)_100%)] 
             blur-lg"
                />

                {/* Logo image layer */}
                <div className="relative z-10 rounded-xl">
                  <Image
                    width={200}
                    height={100}
                    src="/travel/logo.png"
                    alt="logo"
                    className="w-auto h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Left-aligned Title and Subtitle */}
          <h1 className="underline">Wild Songs For The Road</h1>
          <h4 className="">A Motorcycle Journey With Heart</h4>
        </div>
      </section>
    </>
  );
}
