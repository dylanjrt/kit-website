"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const navItems = [
    { href: "/collection", label: "Collection" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/collection") return pathname.startsWith("/collection");
    if (href === "/portfolio") return pathname.startsWith("/portfolio");
    return pathname === href;
  };

  return (
    <nav className="w-full bg-[#F7F5F2] px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[#E8E8E8]">
      <Link
        href="/"
        className="text-sm font-medium text-[#111111]"
      >
        bisqkit
      </Link>

      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm transition-colors ${
              isActive(item.href)
                ? "text-[#111111]"
                : "text-[#777777] hover:text-[#111111]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
