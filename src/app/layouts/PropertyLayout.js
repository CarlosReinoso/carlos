import Nav from "@/components/property/Nav";

export default function PropertyLayout({ children }) {
  return (
    <body className="bg-primary">
      <Nav />
      {children}
    </body>
  );
}
