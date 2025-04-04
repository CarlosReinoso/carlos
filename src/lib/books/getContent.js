import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

// Base path to your MDX content
const basePath = path.join(process.cwd(), "database/books");

// Slugs that represent image-based visual books (not MDX)
const VISUAL_BOOKS = ["amara"]; // You can add more like "inca-manga" etc.

export function getSlugs(folderName) {
  const contentPath = path.join(basePath, folderName);

  if (!fs.existsSync(contentPath)) return [];

  return fs
    .readdirSync(contentPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getContentBySlug(folderName, slug) {
  // Guard clause for visual books
  if (VISUAL_BOOKS.includes(slug)) {
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, "");
  const contentPath = path.join(basePath, folderName, `${realSlug}.mdx`);

  if (!fs.existsSync(contentPath)) {
    console.warn(`MDX file not found: ${contentPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(contentPath, "utf8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    slug: realSlug,
    frontmatter: data,
    source: mdxSource,
  };
}

export async function getAllContent(folderName) {
  const slugs = getSlugs(folderName).filter(
    (slug) => !VISUAL_BOOKS.includes(slug)
  );

  const content = await Promise.all(
    slugs.map((slug) => getContentBySlug(folderName, slug))
  );

  return content
    .filter(Boolean) // filter out nulls
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB - dateA;
    });
}
