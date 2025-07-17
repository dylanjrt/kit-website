import { getAllItems, getAllCategories } from "../../sanity/queries";
import CategoryFilter from "../../components/CategoryFilter";
import ProductGrid from "../../components/ProductGrid";

interface Item {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  price?: number;
  currency?: string;
  availability?: string;
  featured?: boolean;
  publishedAt?: string;
  images?: Array<{
    asset: { _ref: string; _type: string };
    alt?: string;
    caption?: string;
  }>;
  category?: {
    title: string;
    slug: { current: string };
  };
  tags?: string[];
  dimensions?: string;
  materials?: string;
  technique?: string;
  firing?: string;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [items, categories] = await Promise.all([
    getAllItems(),
    getAllCategories(),
  ]);

  const selectedCategory = category;
  const filteredItems = selectedCategory
    ? items.filter(
        (item: Item) => item.category?.slug?.current === selectedCategory,
      )
    : items;

  return (
    <div className="bg-background-color min-h-screen">
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Category Filters */}
        <div className="mb-6 lg:mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-8 lg:space-y-12">
          {/* Product Grid */}
          {filteredItems.length > 0 ? (
            <section>
              <ProductGrid items={filteredItems} />
            </section>
          ) : (
            <div className="py-12 text-center lg:py-16">
              <p className="text-secondary text-md font-serif">
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
