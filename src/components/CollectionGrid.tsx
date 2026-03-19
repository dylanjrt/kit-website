"use client";

import { getImageUrl } from "../lib/sanity-image";
import Link from "next/link";
import Image from "next/image";

interface Item {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  price?: number;
  currency?: string;
  availability?: string;
  materials?: string | string[];
  dimensions?: { height?: number; width?: number; depth?: number };
  technique?: string;
  firing?: string;
  images?: Array<{
    asset: {
      _ref: string;
      _type: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
      };
    };
    alt?: string;
    caption?: string;
  }>;
  category?: {
    title: string;
    slug: { current: string };
  };
}

function formatPrice(price: number, currency?: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CollectionGrid({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-[#777777] py-8">No items available.</p>;
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-0 pb-6 lg:pb-8">
      {items.map((item, i) => {
        const img = item.images?.[0];
        const materialStr = Array.isArray(item.materials)
          ? item.materials.filter(Boolean).join(", ")
          : item.materials;
        return (
          <Link
            key={item._id}
            href={`/collection/${item.slug.current}`}
            className="group block"
          >
            {/* Image */}
            <div className="relative aspect-square bg-[#EEEBe7] overflow-hidden">
              {img && (
                <Image
                  src={getImageUrl(img, 600) || ""}
                  alt={img.alt || item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 33vw"
                />
              )}
              <span className="absolute top-1.5 left-2 text-[#111111] text-xs leading-none select-none font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Meta — same height as column gap (h-3 = 12px), text overflows on hover */}
            <div className="h-3 relative">
              <div className="absolute top-1 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 bg-[#F7F5F2] pt-0.5">
                <p className="text-xs font-medium text-[#111111] leading-snug truncate">{item.title}</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  {materialStr && (
                    <span className="text-[11px] text-[#777777] truncate">{materialStr}</span>
                  )}
                  {item.price && (
                    <span className="text-[11px] text-[#111111] italic shrink-0">{formatPrice(item.price, item.currency)}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
