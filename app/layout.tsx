import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Zero Savvy | Cryptographic Infrastructure for Verifiable Provenance",
  description:
    "Building cryptographic infrastructure for verifiable provenance that preserves privacy. Zero-knowledge proofs for media authenticity without data exposure.",
  keywords: [
    "zero-knowledge proofs",
    "cryptography",
    "media authenticity",
    "provenance",
    "privacy",
    "verification",
    "zkp",
    "deep tech",
  ],
  authors: [{ name: "Zero Savvy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zerosavvy.xyz",
    siteName: "Zero Savvy",
    title: "Zero Savvy | Cryptographic Infrastructure for Verifiable Provenance",
    description:
      "Building cryptographic infrastructure for verifiable provenance that preserves privacy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Savvy | Cryptographic Infrastructure for Verifiable Provenance",
    description:
      "Building cryptographic infrastructure for verifiable provenance that preserves privacy.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
