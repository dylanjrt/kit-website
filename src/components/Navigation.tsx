"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full p-8">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        {/* Navigation Links */}
        <div className="flex gap-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${pathname === item.href ? "underline" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
