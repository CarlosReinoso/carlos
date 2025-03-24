"use client";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link
        href={"/vcard"}
        className="flex flex-col md:flex-row items-center justify-between w-full pb-4"
      >
        <Image
          src={"/vcard/logo.png"}
          alt={"book logo"}
          width={150}
          height={100}
          className="m-auto"
        />
      </Link>
    </nav>
  );
}
