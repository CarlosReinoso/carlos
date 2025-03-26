// import Nav from "@/components/books/Nav";
import { pagePadding } from "./PropertyLayout";
// import Footer from "@/components/property/Footer";

export default function TravelLayout({ children }) {
  return (
    <body className={`${pagePadding} bg-primary`}>
      {/* <Nav /> */}
      {children}
      {/* <Footer /> */}
    </body>
  );
}
