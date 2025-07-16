import { getAllItems, getAllCategories } from "../../sanity/queries";
import CategoryFilter from "../../components/CategoryFilter";
import ProductGrid from "../../components/ProductGrid";
import FeaturedProduct from "../../components/FeaturedProduct";

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
  searchParams: { category?: string };
}) {
  const [items, categories] = await Promise.all([
    getAllItems(),
    getAllCategories(),
  ]);

  const selectedCategory = searchParams.category;
  const filteredItems = selectedCategory
    ? items.filter(
        (item: Item) => item.category?.slug?.current === selectedCategory,
      )
    : items;

  const featuredItem = filteredItems.length > 0 ? filteredItems[0] : null;
  const gridItems = filteredItems.slice(1);

  return (
    <div className="bg-background-color min-h-screen">
      <main className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-12 lg:space-y-16">
          {/* Featured Product Section */}
          {featuredItem && (
            <section className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
              <div className="mb-8 lg:mb-0">
                <FeaturedProduct item={featuredItem} />
              </div>

              {/* Product Grid Section */}
              {gridItems.length > 0 && (
                <div className="lg:pl-8">
                  <ProductGrid items={gridItems} />
                </div>
              )}
            </section>
          )}
          {/* Fallback: Show only grid if no featured item */}
          {!featuredItem && gridItems.length > 0 && (
            <section>
              <ProductGrid items={gridItems} />
            </section>
          )}
          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-primary-text font-serif text-lg">
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
