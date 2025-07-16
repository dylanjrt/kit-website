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
    <div className="text-primary-text flex space-x-6 font-serif">
      <Link
        href={`/shop?${createQueryString(null)}`}
        className={`transition-colors duration-200 ${
          !selectedCategory
            ? "decoration-primary-text font-bold underline underline-offset-4"
            : "hover:text-secondary-text"
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
              ? "decoration-primary-text font-bold underline underline-offset-4"
              : "hover:text-secondary-text"
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
