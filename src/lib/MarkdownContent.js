"use client";
import { useEffect, useState } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import matter from "gray-matter";
import styles from "../styles/MarkdownContent.module.css";

const MarkdownContent = ({ markdownFilePath }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await import(`../content/${markdownFilePath}`);
      const { content: rawContent } = matter(res.default);
      const processedContent = await remark()
        .use(remarkHtml)
        .process(rawContent);
      setContent(processedContent.toString());
    };

    fetchMarkdown();
  }, [markdownFilePath]);

  return (
    <div
      className={styles["markdown-content"]}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MarkdownContent;
