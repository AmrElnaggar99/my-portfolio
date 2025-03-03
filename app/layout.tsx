import type { Metadata } from "next";
import { Merriweather, Mona_Sans, Sigmar } from "next/font/google";
import "./globals.css";

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

const sigmar = Sigmar({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sigmar",
});

export const metadata: Metadata = {
  title: "Amr Elnaggar | Frontend & Full-Stack Engineer",
  description:
    "Amr Elnaggar, a Frontend and Full-Stack Engineer with expertise in React, Next.js, and backend technologies. Passionate about building scalable, beautiful, interactive web applications with optimized performance.",
  openGraph: {
    title: "Amr Elnaggar | Frontend & Full-Stack Engineer",
    description:
      "Amr Elnaggar, a Frontend and Full-Stack Engineer with expertise in React, Next.js, and backend technologies. Passionate about building scalable, beautiful, interactive web applications with optimized performance.",
    url: "https://amrelnaggar.me",
    siteName: "Amr Elnaggar | Frontend & Full-Stack Engineer",
    images: [
      {
        url: "https://amrelnaggar.me/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Amr Elnaggar | Frontend & Full-Stack Engineer Thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr Elnaggar | Frontend & Full-Stack Engineer",
    description:
      "Amr Elnaggar, a Frontend and Full-Stack Engineer with expertise in React, Next.js, and backend technologies. Passionate about building scalable, beautiful, interactive web applications with optimized performance.",
    images: ["https://amrelnaggar.me/thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${monasans.variable} ${sigmar.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
