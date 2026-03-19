import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";
import { DM_Sans } from "next/font/google";
import Footer from "../components/Footer";
import Grain from "../components/Grain";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal"],
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
        className={`${dmSans.variable} text-[#111111] flex min-h-screen flex-col antialiased`}
      >
        <Grain />
        <Navigation />
        <main className="p-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
