import Link from "next/link";
import { getAllContent } from "@/lib/books/getContent";

export default async function BooksPage() {
  const books = await getAllContent(""); // no folderName needed if mdx is in /database/books/

  return (
    <div className="h-[100vh]">
      <ul>
        {books.map((book) => (
          <li key={book.slug}>
            <Link href={`/books/${book.slug}`} className="hover:underline">
              <h6>
                {book.frontmatter.title}

                {book.frontmatter?.subtitle && (
                  <span className="text-md">
                    {" - "} {book.frontmatter?.subtitle}
                  </span>
                )}

                <span className="text-sm text-gray-400">
                  {" "}
                  ({book.frontmatter.date})
                </span>
              </h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
