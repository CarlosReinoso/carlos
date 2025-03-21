import Nav from "@/components/property/Nav";

export default function PropertyLayout({ children }) {
  return (
    <body className="bg-primary px-4 sm:px-12 md:px-24">
      <Nav />
      {children}
    </body>
  );
}
