"use client";

import { useState, useEffect } from "react";
import { getImageUrl } from "../lib/sanity-image";
import Image from "next/image";

interface FeaturedItem {
  _id: string;
  title: string;
  price?: number;
  currency?: string;
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
            className="h-auto w-full object-cover transition-opacity duration-1000"
            width={600}
            height={800}
          />
        </div>
      )}
    </div>
  );
}
