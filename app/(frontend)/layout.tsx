import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/next"

import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";
import { Footer } from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAURABH TALELE | Software Developer Portfolio",
  description: "Product-minded engineer building high-performance backend systems with clean architectures.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }, // Browser favicon
      { url: '/favicon.svg', type: 'image/svg+xml' }, // Modern browsers
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }, // iOS
    ],
  },
  openGraph: {
    title: 'Saurabh Talele',
    description: 'Saurabh Talele Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
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
      className={`${inter.variable} h-full antialiased scroll-smooth scroll-pt-20`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 w-full overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />

          <Header />
          {children}
          <SideNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
