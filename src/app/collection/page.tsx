import { getAllItems, getAllCategories } from "../../sanity/queries";
import CollectionGrid from "../../components/CollectionGrid";
import CategoryFilter from "../../components/CategoryFilter";

export const revalidate = 3600;

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

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [items, categories] = await Promise.all([
    getAllItems(),
    getAllCategories(),
  ]);

  const filteredItems: Item[] = category
    ? items.filter((item: Item) => item.category?.slug?.current === category)
    : items;

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <main className="px-6 lg:px-8">
        <div className="pt-6 lg:pt-8 pb-4">
          <CategoryFilter categories={categories} selectedCategory={category} />
        </div>
        <div className="py-2">
          <CollectionGrid items={filteredItems} />
        </div>
      </main>
    </div>
  );
}
