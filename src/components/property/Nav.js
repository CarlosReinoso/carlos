"use client";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link
        href={"/property"}
        className="flex flex-col md:flex-row items-center justify-between w-full mt-4 mb-8 md:mb-10"
      >
        <Image
          src={"/property/logo.png"}
          alt={"reinos logo"}
          width={300}
          height={300}
          className="m-auto"
        />
      </Link>
    </nav>
  );
}
