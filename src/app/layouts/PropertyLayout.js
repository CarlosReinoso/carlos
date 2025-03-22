import Nav from "@/components/property/Nav";

export const pagePadding = "px-4 sm:px-12 md:px-24 max-w-screen-2xl mx-auto";
export default function PropertyLayout({ children }) {
  return (
    <body className={`bg-primary ${pagePadding}`}>
      <Nav />
      {children}
    </body>
  );
}
