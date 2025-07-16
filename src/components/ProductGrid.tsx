import { getImageUrl } from "../lib/sanity-image";

interface Item {
  _id: string;
  title: string;
  price: number;
  currency: string;
  images: Array<{
    asset: any;
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
      <div className="text-center py-8">
        <p className="text-primary-text font-serif text-sm">
          No additional items available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {items.map((item) => (
        <div key={item._id} className="group cursor-pointer">
          {/* Product Image */}
          {item.images?.[0] && (
            <div className="aspect-[3/4] overflow-hidden rounded-sm mb-3">
              <img
                src={getImageUrl(item.images[0], 400, 500) || ""}
                alt={item.images[0].alt || item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-1">
            <h3 className="text-primary-text font-serif text-sm font-medium group-hover:text-secondary-text transition-colors duration-200">
              {item.title}
            </h3>
            <p className="text-primary-text font-serif text-sm">
              {formatPrice(item.price, item.currency)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
