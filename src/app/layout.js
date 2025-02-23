import { Playfair_Display, Poppins, Emblema_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
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
  title: "Keanu Arkadio",
  description:
    "Keanu Lawrence Arcadio - W R I T E R & T E A C H E R",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} ${emblema.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
