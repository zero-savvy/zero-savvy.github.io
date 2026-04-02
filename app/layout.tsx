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
  title: "Zero Savvy | Cryptographic Infrastructure for Media Authenticity",
  description:
    "Building cryptographic infrastructure for verifying media authenticity and provenance without exposing sensitive data. Verification without trust or data exposure.",
  keywords: [
    "zero-knowledge proofs",
    "cryptography",
    "media authenticity",
    "provenance",
    "privacy",
    "verification",
  ],
  authors: [{ name: "Zero Savvy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zerosavvy.xyz",
    siteName: "Zero Savvy",
    title: "Zero Savvy | Cryptographic Infrastructure for Media Authenticity",
    description:
      "Building cryptographic infrastructure for verifying media authenticity and provenance without exposing sensitive data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Savvy | Cryptographic Infrastructure for Media Authenticity",
    description:
      "Building cryptographic infrastructure for verifying media authenticity and provenance without exposing sensitive data.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
