import Nav from "@/components/books/Nav";
import { pagePadding } from "./PropertyLayout";
import SocialMediaIcons from "@/components/common/SocialMediaIcons";
import WebsiteBy from "@/components/common/WebsiteBy";

export default function BooksLayout({ children }) {
  return (
    <body className={`${pagePadding} bg-black pt-4 `}>
      <Nav />
      {children}
      <SocialMediaIcons container="py-4" />
      <WebsiteBy />
    </body>
  );
}
