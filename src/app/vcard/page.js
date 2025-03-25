// src/app/vcard/page.js
import VCardText from "@/components/vcard/VCardText";
import Image from "next/image";
import Link from "next/link";

export default function VCardLandingPage() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h2>
            Create your <VCardText />
          </h2>
          <p className="text-lg text-[#A0AEC0]">
            Share your details with a scan. Quick, stylish, and no login
            required.
          </p>
          <Link href="/vcard/create" className="">
            <button>Create Yours</button>
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
