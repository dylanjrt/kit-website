"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Home page renders its own bottom bar
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-[#E8E8E8] mt-auto px-6 lg:px-8 py-4 flex items-center justify-end gap-4">
      <span className="text-xs text-[#777777]">
        site by:{" "}
        <a
          href="https://dylanrt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#111111] transition-colors"
        >
          Dylan RT
        </a>
      </span>
    </footer>
  );
}
