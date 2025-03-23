import { pagePadding } from "./PropertyLayout";

export default function BooksLayout({ children }) {
  return <body className={`${pagePadding} bg-black`}>{children}</body>;
}
