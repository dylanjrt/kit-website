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

  const isHome = pathname === "/";

  return (
    <nav
      className={`${
        isHome
          ? "fixed inset-x-0 top-0 z-50 w-full p-4 lg:p-8"
          : "bg-background w-full p-4 lg:p-8"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Mobile Layout */}
        <div className="flex flex-col items-center space-y-4 lg:hidden">
          {/* Brand - Centered on first row */}
          <Link href="/" className="text-4xl font-bold tracking-tight">
            BISQKIT
          </Link>

          {/* Navigation Links - Second row */}
          <div className="flex gap-8 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  item.href === "/shop"
                    ? pathname.startsWith("/shop")
                      ? "underline underline-offset-4"
                      : ""
                    : pathname === item.href
                      ? "underline underline-offset-4"
                      : ""
                } hover:underline`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden items-start justify-between lg:flex">
          {/* Brand on the left */}
          <Link
            href="/"
            className="text-6xl tracking-wide lg:text-7xl xl:text-8xl 2xl:text-[9rem]"
          >
            BISQKIT
          </Link>

          {/* Navigation Links on the right */}
          <div className="flex items-start gap-16 text-lg tracking-widest">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  item.href === "/shop"
                    ? pathname.startsWith("/shop")
                      ? "underline underline-offset-8"
                      : ""
                    : pathname === item.href
                      ? "underline underline-offset-8"
                      : ""
                } underline-offset-8 hover:underline`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
