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
        <div className="relative">
          <img
            src={getImageUrl(item.images[0], 600, 800) || ""}
            alt={item.images[0].alt || item.title}
            className="h-auto w-full object-cover"
          />

          {/* Image Navigation Dots */}
          <div className="mt-4 flex justify-center space-x-2">
            <div className="bg-primary-text h-2 w-2 rounded-full"></div>
            <div className="border-primary-text h-2 w-2 rounded-full border"></div>
            <div className="border-primary-text h-2 w-2 rounded-full border"></div>
          </div>
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-4">
        <h2 className="text-primary-text font-serif text-xl">{item.title}</h2>

        <p className="text-primary-text font-serif text-lg">
          {formatPrice(item.price, item.currency)}
        </p>

        {/* Product Specifications */}
        <div className="text-primary-text space-y-2 font-serif text-sm">
          {item.materials?.[0] && <p>Glaze: {item.materials[0]}</p>}
          {item.dimensions?.height && <p>Height: {item.dimensions.height}"</p>}
          {item.dimensions?.width && (
            <p>Base Width: {item.dimensions.width}"</p>
          )}
        </div>

        {/* Inquire Button */}
        <button className="text-primary-text hover:text-secondary-text flex items-center space-x-2 font-serif transition-colors duration-200">
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
