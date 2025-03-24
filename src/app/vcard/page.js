// src/app/vcard/page.js
import Image from "next/image";
import Link from "next/link";

export default function VCardLandingPage() {
  return (
    <div className="text-white min-h-screen">
      <main className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h1 className=" font-space text-4xl md:text-6xl font-bold leading-tight">
            Create your <span className="text-[#FF6C60]">vCard</span>
          </h1>
          <p className="text-lg text-[#A0AEC0]">
            Share your details with a scan. Quick, stylish, and no login
            required.
          </p>
          <Link
            href="/vcard/create"
            className="inline-block mt-4 px-6 py-3 bg-[#4FD1C5] text-black font-semibold rounded-xl hover:bg-[#38B2AC] transition"
          >
            Create Yours
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src="/vcard/hero.webp" // Replace with optimized public path or move it
            alt="VCard Preview"
            width={600}
            height={600}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </main>
    </div>
  );
}
