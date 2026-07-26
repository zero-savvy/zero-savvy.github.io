import Image from "next/image";
import Link from "next/link";

export function BlogHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Zero Savvy home">
            <Image
              src="/logo.png"
              alt="Zero Savvy"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-foreground transition-colors duration-200"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
