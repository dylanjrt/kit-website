import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kitsolano Bollagio",
  description: "All the things that Kit gets up to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 right-0 left-0 mx-8 flex items-center justify-between gap-2 py-8 transition-[margin] duration-300 ease-in-out sm:mx-16 lg:mx-48">
          <Link className="font-bold" href="/">
            KITSOLANO BOLLAGIO
          </Link>
          <div className="flex gap-4">
            <Link className="hover:text-red-300 hover:italic" href="/catalog">
              Catalog
            </Link>
            <Link className="hover:text-red-300 hover:italic" href="/about">
              About
            </Link>
            <Link className="hover:text-red-300 hover:italic" href="/contact">
              Contact
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
