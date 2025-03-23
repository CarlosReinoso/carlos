// src/app/books/[slug]/page.js
import { getContentBySlug } from "@/lib/books/getContent";
import dynamic from "next/dynamic";

const ClientWrapper = dynamic(() => import("@/components/ClientWrapper"), {
  ssr: false, // client only
});

export default async function BookPage({ params }) {
  const { slug } = params;
  const book = await getContentBySlug("", slug);

  return (
    <div>
      <ClientWrapper source={book.source} />
    </div>
  );
}
