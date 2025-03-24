import Nav from "@/components/books/Nav";
import { pagePadding } from "./PropertyLayout";
import Footer from "@/components/property/Footer";

export default function BooksLayout({ children }) {
  return (
    <body className={`${pagePadding} bg-black pt-4`}>
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
