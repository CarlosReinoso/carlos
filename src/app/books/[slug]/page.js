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
    <div className="prose prose-lg mx-auto py-10">
      <h1 className="text-3xl font-bold">{book.frontmatter.title}</h1>
      <p className="text-sm text-gray-500">{book.frontmatter.date}</p>

      {/* ✅ rendered on the client */}
      <ClientWrapper source={book.source} />
    </div>
  );
}
