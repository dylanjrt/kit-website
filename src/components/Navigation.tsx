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
    <nav className="w-full p-4 text-lg lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Mobile Layout */}
        <div className="flex flex-col items-center space-y-4 lg:hidden">
          {/* KITSOLANO - Centered on first row */}
          <Link href="/" className="text-2xl font-bold lg:text-3xl">
            KITSOLANO
          </Link>

          {/* Navigation Links - Second row */}
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${pathname === item.href ? "font-bold" : ""} hover:italic`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden items-center justify-between lg:flex">
          {/* Navigation Links */}
          <div className="flex gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${pathname === item.href ? "font-bold" : ""} hover:italic`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/" className="flex gap-12 text-3xl font-bold">
            KITSOLANO
          </Link>
        </div>
      </div>
    </nav>
  );
}
