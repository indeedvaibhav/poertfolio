import type { Metadata } from "next";
import { inter, jetbrainsMono, outfit } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaibhav | Software Developer & Builder",
  description:
    "Portfolio of Vaibhav — Software Developer, Competitive Programmer, and B.Tech CSE student building real-world software products.",
  keywords: [
    "Vaibhav",
    "Software Developer",
    "Java Developer",
    "Portfolio",
    "Competitive Programming",
    "Smart Parking System",
  ],
  authors: [{ name: "Vaibhav" }],
  openGraph: {
    title: "Vaibhav | Software Developer & Builder",
    description:
      "Building Software. Leading Teams. Software Developer crafting real-world products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav | Software Developer & Builder",
    description:
      "Building Software. Leading Teams. Software Developer crafting real-world products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
