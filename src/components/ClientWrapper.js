// src/components/ClientWrapper.js
"use client";

import { MDXRemote } from "next-mdx-remote";

export default function ClientWrapper({ source }) {
  return <MDXRemote {...source} />;
}
