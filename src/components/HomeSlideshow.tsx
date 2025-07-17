"use client";

import { useState, useEffect } from "react";
import { getImageUrl } from "../lib/sanity-image";
import Image from "next/image";
import Link from "next/link";

interface FeaturedItem {
  _id: string;
  title: string;
  price?: number;
  currency?: string;
  slug: { current: string };
  images?: Array<{
    asset: { _ref: string; _type: string };
    alt?: string;
    caption?: string;
  }>;
}

interface HomeSlideshowProps {
  items: FeaturedItem[];
}

export default function HomeSlideshow({ items }: HomeSlideshowProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const handleImageClick = () => {
    if (items.length <= 1) return;
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const currentItem = items[currentItemIndex];

  if (!currentItem) {
    return (
      <div className="text-primary font-serif">
        No items available for slideshow.
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg">
      {currentItem.images?.[0] && (
        <div className="relative">
          <Image
            src={getImageUrl(currentItem.images[0], 600, 800) || ""}
            alt={currentItem.images[0].alt || currentItem.title}
            className="h-auto w-full cursor-pointer object-cover transition-opacity duration-1000 hover:opacity-90"
            width={600}
            height={800}
            onClick={handleImageClick}
          />
          {currentItem.images[0].caption && (
            <Link
              href={`/shop/${currentItem.slug.current}`}
              className="text-secondary hover:text-primary mt-2 block rounded px-2 py-1 text-right font-serif text-xs italic transition-colors duration-200 hover:underline"
            >
              {currentItem.images[0].caption}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
