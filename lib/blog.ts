import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags: string[];
}

export interface Post extends PostMeta {
  html: string;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
}

function fileToSlug(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}

function readPost(fileName: string): Post {
  const slug = fileToSlug(fileName);
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);

  const html = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? undefined,
    tags: Array.isArray(data.tags) ? data.tags : [],
    html,
  };
}

/** All posts, newest first. Used for the /blog index. */
export function getAllPosts(): PostMeta[] {
  return getMarkdownFiles()
    .map((file) => {
      const { html, ...meta } = readPost(file);
      void html;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** A single post with rendered HTML. Returns null when not found. */
export function getPostBySlug(slug: string): Post | null {
  const files = getMarkdownFiles();
  const match = files.find((file) => fileToSlug(file) === slug);
  return match ? readPost(match) : null;
}

/** Slugs for generateStaticParams. */
export function getAllSlugs(): string[] {
  return getMarkdownFiles().map(fileToSlug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
