// import "../styles/landing.css";
import LayoutSelector from "@/components/LayoutSelector";
import { metadataLanding } from "../metadata/landing";
import { playfair, poppins } from "../styles/fonts";

export const metadata = metadataLanding;

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} `}>
        <LayoutSelector>{children}</LayoutSelector>
      </body>
    </html>
  );
}
