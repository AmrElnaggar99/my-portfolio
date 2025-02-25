import type { Metadata } from "next";
import { Merriweather, Mona_Sans } from "next/font/google";
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
      <body className={`${merriweather.variable} ${monasans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
