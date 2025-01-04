import { Monoton, Neucha, Emblema_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const monoton = Monoton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-monoton",
});

const neucha = Neucha({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-neucha",
});

const emblema = Emblema_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-emblema",
});

export const metadata = {
  title: "Experience Conscious Dance",
  description:
    "Join The Luminous Community an Ecstatic Dance like no other. Connecting you to lively dance events London",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${monoton.variable} ${neucha.variable} ${emblema.variable}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
