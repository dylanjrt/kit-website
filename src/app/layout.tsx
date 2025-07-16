import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";
import { Tinos } from "next/font/google";

const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kit - Ceramic Art & Design",
  description:
    "Handcrafted ceramic pieces by Kit, a designer based in Brooklyn, NY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tinos.className} text-primary flex min-h-screen flex-col antialiased`}
      >
        <Navigation />
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
