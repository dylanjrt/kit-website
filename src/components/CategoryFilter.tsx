"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();

  const createQueryString = (category: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    return params.toString();
  };

  return (
    <div className="text-secondary font-serif">
      {/* Mobile: Horizontal scrollable */}
      <div className="flex space-x-4 overflow-x-auto pb-2 lg:hidden">
        <Link
          href={`/shop?${createQueryString(null)}`}
          className={`whitespace-nowrap transition-colors duration-200 ${
            !selectedCategory
              ? "decoration-primary underline underline-offset-4"
              : "hover:text-primary"
          }`}
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/shop?${createQueryString(category.slug.current)}`}
            className={`whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category.slug.current
                ? "decoration-primary underline underline-offset-4"
                : "hover:text-primary"
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden space-x-6 lg:flex">
        <Link
          href={`/shop?${createQueryString(null)}`}
          className={`pr-12 transition-colors duration-200 ${
            !selectedCategory
              ? "decoration-primary underline underline-offset-4"
              : "hover:text-primary"
          }`}
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/shop?${createQueryString(category.slug.current)}`}
            className={`transition-colors duration-200 ${
              selectedCategory === category.slug.current
                ? "decoration-primary underline underline-offset-4"
                : "hover:text-primary"
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
