import CursorBlob from "@/components/web-dev/CursorBlob";

export default function WebDevLayout({ children }) {
  return (
    <body className="bg-wd-gradient">
      <CursorBlob />
      {children}
    </body>
  );
}
