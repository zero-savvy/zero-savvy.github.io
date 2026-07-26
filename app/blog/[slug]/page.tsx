import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogHeader } from "@/components/blog-header";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Zero Savvy" };

  return {
    title: `${post.title} | Zero Savvy`,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-background">
      <BlogHeader />

      <article className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author && (
              <>
                <span aria-hidden>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              {post.description}
            </p>
          )}
        </header>

        <div className="connection-line my-12" />

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  );
}
