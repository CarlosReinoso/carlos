import CursorBlob from "@/components/web-dev/CursorBlob";
import "../../styles/web-dev.css";

export default function WebDevLayout({ children }) {
  return (
    <>
      <CursorBlob />
      {children}
    </>
  );
}
