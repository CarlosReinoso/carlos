import Nav from "@/components/vcard/Nav";
import { pagePadding } from "./PropertyLayout";
import Footer from "@/components/vcard/Footer";

export default function VCardLayout({ children }) {
  return (
    <body className={`${pagePadding} bg-primary pt-4`}>
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
