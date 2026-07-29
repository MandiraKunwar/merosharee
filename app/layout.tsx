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
      <body className={`${robotoCondensed.className} ${dosis.variable} min-h-screen relative overflow-x-hidden text-white bg-[#323a4d]`}>
        
        {/* Optional: Background Image URL layer (Change '/mero-bg.jpg' to your image filename if you have one) */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/mero-bg.jpg')" }}
        />
        
        {/* Page Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}