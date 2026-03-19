import { getArtist, getSingleItem, getAllItems } from "../../../sanity/queries";
import Link from "next/link";
import ImageGallery from "../../../components/ImageGallery";

export async function generateStaticParams() {
  const items = await getAllItems();
  return items.map((item: { slug: { current: string } }) => ({
    slug: item.slug.current,
  }));
}

export const revalidate = 3600;

interface ItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionItemPage({ params }: ItemPageProps) {
  const { slug } = await params;
  const item = await getSingleItem(slug);
  const artist = await getArtist();

  if (!item) {
    return (
      <div className="bg-[#F7F5F2] flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#777777] mb-6">
            Item not found
          </p>
          <Link
            href="/collection"
            className="text-sm text-[#777777] hover:text-[#111111] transition-colors"
          >
            ← Collection
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
    <div className="bg-[#F7F5F2] min-h-screen">
      <main className="px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 pb-4 border-b border-[#E8E8E8] flex items-center justify-between gap-4">
          <Link
            href="/collection"
            className="text-sm text-[#777777] hover:text-[#111111] transition-colors"
          >
            ← Collection
          </Link>
          <a
            href={`mailto:${artist?.email}?subject=Inquiry about "${encodeURIComponent(item.title)}"`}
            className="text-sm text-[#777777] hover:text-[#111111] transition-colors border border-[#E8E8E8] px-3 py-1.5 whitespace-nowrap"
          >
            Inquire
          </a>
        </div>

        {/* Content */}
        <div className="py-6 lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Images */}
          <div className="mb-8 lg:mb-0">
            {item.images && item.images.length > 0 && (
              <ImageGallery images={item.images} title={item.title} />
            )}
          </div>

          {/* Info */}
          <div>
            {/* Title + category + price */}
            <div className="border-b border-[#E8E8E8] pb-5 mb-5">
              <h1 className="text-2xl lg:text-3xl font-light text-[#111111] mb-2">
                {item.title}
              </h1>
              {item.category && (
                <p className="text-sm text-[#777777]">
                  {item.category.title}
                </p>
              )}
              {item.price && (
                <p className="text-base text-[#111111] mt-2">
                  {formatPrice(item.price, item.currency || "USD")}
                </p>
              )}
            </div>

            {/* Description */}
            {item.description && (
              <div className="border-b border-[#E8E8E8] pb-5 mb-5">
                <p className="text-base leading-relaxed text-[#111111]">
                  {item.description}
                </p>
              </div>
            )}

            {/* Specs */}
            {(item.materials || item.dimensions || item.technique || item.firing) && (
              <div>
                <h2 className="text-sm text-[#777777] mb-3">
                  Specifications
                </h2>
                <div className="divide-y divide-[#E8E8E8]">
                  {item.materials && (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-3">
                      <span className="text-sm text-[#777777]">Materials</span>
                      <span className="text-sm text-[#111111]">
                        {Array.isArray(item.materials)
                          ? item.materials.filter(Boolean).join(", ")
                          : item.materials}
                      </span>
                    </div>
                  )}
                  {item.dimensions && (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-3">
                      <span className="text-sm text-[#777777]">Dimensions</span>
                      <span className="text-sm text-[#111111]">
                        {item.dimensions.height && `H: ${item.dimensions.height}"`}
                        {item.dimensions.width && ` W: ${item.dimensions.width}"`}
                        {item.dimensions.depth && ` D: ${item.dimensions.depth}"`}
                      </span>
                    </div>
                  )}
                  {item.technique && (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-3">
                      <span className="text-sm text-[#777777]">Technique</span>
                      <span className="text-sm text-[#111111]">{item.technique}</span>
                    </div>
                  )}
                  {item.firing && (
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-3">
                      <span className="text-sm text-[#777777]">Firing</span>
                      <span className="text-sm text-[#111111]">{item.firing}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
