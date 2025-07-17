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
}

interface ProductGridProps {
  items: Item[];
}

export default function ProductGrid({ items }: ProductGridProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-primary font-serif text-sm">
          No additional items available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-18 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item._id}
          href={`/shop/${item.slug.current}`}
          className="group cursor-pointer"
        >
          {/* Product Image */}
          {item.images?.[0] && (
            <div className="relative mb-4 aspect-[4/5] overflow-hidden">
              {/* First Image (Base) */}
              <Image
                src={getImageUrl(item.images[0], 300, 375) || ""}
                alt={item.images[0].alt || item.title}
                width={300}
                height={375}
                className="h-full w-full object-cover transition-opacity duration-300"
              />

              {/* Second Image (Hover) */}
              {item.images?.[1] && (
                <Image
                  src={getImageUrl(item.images[1], 300, 375) || ""}
                  alt={item.images[1].alt || item.title}
                  width={300}
                  height={375}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="text-secondary group-hover:text-primary font-serif text-sm font-medium transition-colors duration-200">
              {item.title}
            </h3>
            <p className="text-secondary group-hover:text-primary font-serif text-sm">
              {formatPrice(item.price, item.currency)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
