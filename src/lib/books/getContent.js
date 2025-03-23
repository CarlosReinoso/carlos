import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

// Update path to match your structure: /database/books/
const basePath = path.join(process.cwd(), "database/books");

export function getSlugs(folderName) {
  const contentPath = path.join(basePath, folderName);
  return fs.readdirSync(contentPath).filter((file) => file.endsWith(".mdx"));
}

export async function getContentBySlug(folderName, slug) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const contentPath = path.join(basePath, folderName, `${realSlug}.mdx`);
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
  const slugs = getSlugs(folderName);
  const content = await Promise.all(
    slugs.map((slug) => getContentBySlug(folderName, slug))
  );

  return content.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
}
