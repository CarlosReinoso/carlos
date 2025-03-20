"use client";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between w-full mt-4 mb-8 md:mb-0">
      <Image
        src={"/property/logo.png"}
        alt={"reinos logo"}
        width={300}
        height={300}
        className="m-auto"
      />
    </nav>
  );
}
