"use client";

import { MDXRemote } from "next-mdx-remote";

export default function ClientWrapper({ source, components = {} }) {
  return <MDXRemote {...source} components={components} />;
}
