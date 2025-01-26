import { Monoton, Poppins, Emblema_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const monoton = Monoton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-monoton",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
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
        className={`${monoton.variable} ${poppins.variable} ${emblema.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
