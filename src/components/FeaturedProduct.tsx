import { getImageUrl } from "../lib/sanity-image";
import Link from "next/link";
import Image from "next/image";

interface Item {
  _id: string;
  title: string;
  price: number;
  currency: string;
  slug: { current: string };
  images: Array<{
    asset: { _ref: string; _type: string };
    alt: string;
    caption?: string;
  }>;
  materials?: string[];
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
  };
}

interface FeaturedProductProps {
  item: Item;
}

export default function FeaturedProduct({ item }: FeaturedProductProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Product Image */}
      {item.images?.[0] && (
        <Link href={`/shop/${item.slug.current}`} className="group block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src={getImageUrl(item.images[0], 600, 800) || ""}
              alt={item.images[0].alt || item.title}
              width={600}
              height={800}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      )}

      {/* Product Info */}
      <div className="space-y-4">
        <Link href={`/shop/${item.slug.current}`} className="group block">
          <h2 className="text-primary group-hover:text-secondary font-serif text-xl transition-colors duration-200">
            {item.title}
          </h2>
        </Link>

        <p className="text-primary font-serif text-lg">
          {formatPrice(item.price, item.currency)}
        </p>

        {/* Product Specifications */}
        <div className="text-primary space-y-2 font-serif text-sm">
          {item.materials?.[0] && <p>Glaze: {item.materials[0]}</p>}
          {item.dimensions?.height && (
            <p>Height: {item.dimensions.height}&quot;</p>
          )}
          {item.dimensions?.width && (
            <p>Base Width: {item.dimensions.width}&quot;</p>
          )}
        </div>

        {/* Inquire Button */}
        <button className="text-primary hover:text-secondary flex items-center space-x-2 font-serif transition-colors duration-200">
          <span>Inquire</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
