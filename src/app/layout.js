import { generateMetadata } from "@/config/metadata"; // Import the function
import LayoutSelector from "@/components/LayoutSelector";
import { raleway, poppins } from "@/styles/fonts";
import "../styles/globals.css";

export { generateMetadata }; // Re-export it so Next.js can use it

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${poppins.variable}`}>
      <LayoutSelector>{children}</LayoutSelector>
    </html>
  );
}
