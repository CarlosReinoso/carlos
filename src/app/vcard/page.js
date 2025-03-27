// src/app/vcard/page.js
import VCardText from "@/components/vcard/VCardText";
import Image from "next/image";
import Link from "next/link";

export default function VCardLandingPage() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-12">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold ">
            <VCardText /> - Your Virtual Business Card
          </h2>
          <p className="text-lg text-[#A0AEC0]">
            Share your details with a scan. Quick, stylish, and no login
            required.
          </p>
          <Link href="/vcard/create">
            <button className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800">
              Create Yours
            </button>
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src="/vcard/hero.webp"
            alt="VCard Preview"
            width={600}
            height={600}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </main>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto mt-20 px-4">
        <h3 className="text-3xl font-semibold mb-12 text-center pb-8">
          How it works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center ">
          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-third">Step 1</h4>
            <Image
              src="/vcard/step1.png"
              alt="Step 1"
              width={150}
              height={150}
              className="rounded-full"
            />
            <p className="text-lg font-medium">
              Fill out the form to create your digital personal or business card
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-third">Step 2</h4>

            <Image
              src="/vcard/step2.png"
              alt="Step 2"
              width={250}
              height={250}
              className="rounded-full"
            />
            <p className="text-lg font-medium">
              Download your QR code or save it to your home screen
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-third">Step 3</h4>
            <Image
              src="/vcard/step3.png"
              alt="Step 3"
              width={150}
              height={150}
              className="rounded-full"
            />
            <p className="text-lg font-medium">
              Share your contact detail by asking people to scan your QR
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-third">Result</h4>
            <Image
              src="/vcard/result.jpg"
              alt="Step 4"
              width={115}
              height={115}
              className="rounded-full"
            />
            <p className="text-lg font-medium">
              It will autofill your details into their phone
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
