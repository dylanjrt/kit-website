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
        <p className="text-primary-text font-serif text-sm">
          No additional items available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {items.map((item) => (
        <Link
          key={item._id}
          href={`/shop/${item.slug.current}`}
          className="group cursor-pointer"
        >
          {/* Product Image */}
          {item.images?.[0] && (
            <div className="mb-3 aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src={getImageUrl(item.images[0], 400, 500) || ""}
                alt={item.images[0].alt || item.title}
                width={400}
                height={500}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-1">
            <h3 className="text-primary-text group-hover:text-secondary-text font-serif text-sm font-medium transition-colors duration-200">
              {item.title}
            </h3>
            <p className="text-primary-text font-serif text-sm">
              {formatPrice(item.price, item.currency)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
