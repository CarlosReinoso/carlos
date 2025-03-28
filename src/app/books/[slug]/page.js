import AmaraImages from "@/components/books/AmaraImages";
import { getContentBySlug } from "@/lib/books/getContent";
import dynamic from "next/dynamic";

const ClientWrapper = dynamic(() => import("@/components/ClientWrapper"), {
  ssr: false, // Ensure it only runs on the client
});

export default async function BookPage({ params }) {
  const { slug } = params;
  const book = await getContentBySlug("", slug);

  return (
    <div>
      <ClientWrapper source={book.source} components={{ AmaraImages }} />
    </div>
  );
}
