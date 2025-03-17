import CursorBlob from "@/components/web-dev/CursorBlob";
import { poppins, raleway } from "@/styles/fonts";

export default function WebDevLayout({ children }) {
  return (
    <body className={`${raleway.variable} ${poppins.variable} bg-wd-gradient`}>
      <CursorBlob />
      {children}
    </body>
  );
}
