import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogHeader } from "@/components/blog-header";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Zero Savvy",
  description:
    "Research notes, engineering deep dives, and perspectives on verifiable provenance from the Zero Savvy team.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background">
      <BlogHeader />

      <section className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
        <span className="annotation">Writing</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
          Research notes, engineering deep dives, and perspectives on verifiable
          provenance.
        </p>

        <div className="mt-16">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug} className="py-8 first:pt-0">
                  <article className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.tags.length > 0 && (
                          <>
                            <span aria-hidden>·</span>
                            <span>{post.tags.join(", ")}</span>
                          </>
                        )}
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="mt-2 text-muted-foreground leading-relaxed text-pretty">
                          {post.description}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
                        Read more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
