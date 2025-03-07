import { generateMetadata } from "@/config/metadata"; // Import the function
import LayoutSelector from "@/components/LayoutSelector";
import { raleway, poppins } from "@/styles/fonts";

export { generateMetadata }; // Re-export it so Next.js can use it

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${poppins.variable}`}>
        <LayoutSelector>{children}</LayoutSelector>
      </body>
    </html>
  );
}
