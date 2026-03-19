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
    <div className="pb-4 border-b border-[#E8E8E8]">
      <div className="flex flex-wrap gap-6 text-sm">
        <Link
          href={`/collection?${createQueryString(null)}`}
          className={`transition-colors duration-150 ${
            !selectedCategory
              ? "text-[#111111]"
              : "text-[#777777] hover:text-[#111111]"
          }`}
        >
          {!selectedCategory ? "• " : ""}All Categories
        </Link>

        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/collection?${createQueryString(category.slug.current)}`}
            className={`transition-colors duration-150 ${
              selectedCategory === category.slug.current
                ? "text-[#111111]"
                : "text-[#777777] hover:text-[#111111]"
            }`}
          >
            {selectedCategory === category.slug.current ? "• " : ""}{category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
