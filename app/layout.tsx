import type { Metadata } from "next";
import { Merriweather, Mona_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  variable: "--font-merriweather",
});

const monasans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-monasans",
});

export const metadata: Metadata = {
  title: "Amr Elnaggar | Frontend & Full-Stack Engineer",
  description:
    "Amr Elnaggar, a Frontend and Full-Stack Engineer with expertise in React, Next.js, and backend technologies. Passionate about building scalable, beautiful, interactive web applications with optimized performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={metadata.title as string} />
        <meta property="og:description" content={metadata.description as string} />
        <meta property="og:image" content="https://amrelnaggar.me/thumbnail.jpg" />
        <meta property="og:url" content="https://amrelnaggar.me" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amr Elnaggar | Full-Stack Engineer" />
        <meta name="twitter:description" content={metadata.description as string} />
        <meta name="twitter:image" content="https://amrelnaggar.me/thumbnail.jpg" />
      </Head>
      <body className={`${merriweather.variable} ${monasans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
