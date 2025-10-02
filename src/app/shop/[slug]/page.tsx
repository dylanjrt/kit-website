import { getArtist, getSingleItem } from "../../../sanity/queries";
import Link from "next/link";
import ImageGallery from "../../../components/ImageGallery";

interface ItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { slug } = await params;
  const item = await getSingleItem(slug);
  const artist = await getArtist();

  if (!item) {
    return (
      <div className="bg-background-color flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary mb-4 font-serif text-xl">
            Item not found
          </h1>
          <Link
            href="/shop"
            className="text-primary hover:text-secondary font-serif transition-colors duration-200"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  return (
    <div className="bg-background-color min-h-screen">
      <main className="container mx-auto px-2 py-6 sm:px-4 lg:px-4 lg:py-2">
        {/* Back Button */}
        <div className="mb-6 lg:mb-8">
          <Link
            href="/shop"
            className="text-primary hover:text-secondary inline-flex items-center space-x-2 font-serif transition-colors duration-200"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Item Details */}
        <div className="space-y-4 lg:flex lg:items-start lg:gap-8 lg:space-y-0">
          {/* Images */}
          <div className="w-1/2">
            {item.images && item.images.length > 0 && (
              <ImageGallery images={item.images} title={item.title} />
            )}
          </div>

          {/* Item Information */}
          <div className="w-1/2 space-y-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-primary mb-2 font-serif text-xl lg:text-2xl">
                  {item.title}
                </h1>
                {item.category && (
                  <p className="text-primary font-serif text-sm opacity-75">
                    {item.category.title}
                  </p>
                )}
              </div>
              <a
                href={`mailto:${artist?.email}?subject=Inquiry about "${encodeURIComponent(item.title)}"`}
                className="border-secondary hover:bg-secondary hover:text-background flex w-fit cursor-pointer items-center justify-center space-x-2 border py-2 font-serif text-sm tracking-widest hover:italic lg:px-3 lg:py-1 lg:text-base"
              >
                <span>INQUIRE</span>
              </a>
            </div>

            {item.price && (
              <p className="text-primary font-serif text-lg lg:text-xl">
                {formatPrice(item.price, item.currency || "USD")}
              </p>
            )}

            {item.description && (
              <div>
                <h2 className="text-primary mb-2 font-serif text-base lg:text-lg">
                  Description
                </h2>
                <p className="text-primary font-serif text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="space-y-4">
              <h2 className="text-primary font-serif text-base lg:text-lg">
                Specifications
              </h2>
              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                {item.materials && (
                  <div>
                    <span className="text-secondary font-serif font-medium">
                      Materials:
                    </span>
                    <p className="text-primary font-serif">
                      {Array.isArray(item.materials)
                        ? item.materials.filter(Boolean).join(", ")
                        : item.materials}
                    </p>
                  </div>
                )}
                {item.dimensions && (
                  <div>
                    <span className="text-secondary font-serif font-medium">
                      Dimensions:
                    </span>
                    <p className="text-primary font-serif">
                      {item.dimensions.height &&
                        `H: ${item.dimensions.height}"`}
                      {item.dimensions.width && ` W: ${item.dimensions.width}"`}
                      {item.dimensions.depth && ` D: ${item.dimensions.depth}"`}
                    </p>
                  </div>
                )}
                {item.technique && (
                  <div>
                    <span className="text-secondary font-serif font-medium">
                      Technique:
                    </span>
                    <p className="text-primary font-serif">{item.technique}</p>
                  </div>
                )}
                {item.firing && (
                  <div>
                    <span className="text-secondary font-serif font-medium">
                      Firing:
                    </span>
                    <p className="text-primary font-serif">{item.firing}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <h2 className="text-primary mb-2 font-serif text-base lg:text-lg">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-primary border-primary-text rounded-full border px-3 py-1 font-serif text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
