import Link from "next/link";
import { getAllContent } from "@/lib/books/getContent";

export default async function BooksPage() {
  const books = await getAllContent("");

  // Add Amara manually to the list
  const amaraEntry = {
    slug: "amara",
    frontmatter: {
      title: "Amara",
      subtitle: "Echoes of What Was Never Lost",
      date: "2024-04-01",
    },
  };

  const combinedBooks = [amaraEntry, ...books];

  return (
    <div className="h-[100vh]">
      <ul>
        {combinedBooks.map((book) => (
          <li key={book.slug} className="star-list">
            <Link href={`/books/${book.slug}`} className="underline-hover">
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
