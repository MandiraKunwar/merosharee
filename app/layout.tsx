import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Roboto_Condensed, Dosis } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dosis = Dosis({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-dosis",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://merosharee.vercel.app"), // <--- CRITICAL: Required for Next.js to build absolute image URLs
  title: "Mero Share",
  description: "MeroShare - CDSC",
  openGraph: {
    title: "Mero Share",
    description: "MeroShare - CDSC Login Portal",
    url: "https://merosharee.vercel.app",
    siteName: "Mero Share",
    images: [
      {
        url: "/logo.jpg",
        width: 500,
        height: 500,
        alt: "Mero Share Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mero Share",
    description: "MeroShare - CDSC Login Portal",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#323a4d]`}
    >
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className={`${robotoCondensed.className} ${dosis.variable} h-full bg-[#323a4d]`}>
        {children}
      </body>
    </html>
  );
}