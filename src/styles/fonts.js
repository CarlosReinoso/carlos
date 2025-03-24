import { Raleway, Poppins, Space_Grotesk } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

export const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space",
});
