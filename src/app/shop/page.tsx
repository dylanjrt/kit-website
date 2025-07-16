import {
  getAllItems,
  getAllCategories,
  getSettings,
} from "../../sanity/queries";
import { getImageUrl } from "../../lib/sanity-image";
import CategoryFilter from "../../components/CategoryFilter";
import ProductGrid from "../../components/ProductGrid";
import FeaturedProduct from "../../components/FeaturedProduct";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [items, categories, settings] = await Promise.all([
    getAllItems(),
    getAllCategories(),
    getSettings(),
  ]);

  const selectedCategory = searchParams.category;
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category?.slug?.current === selectedCategory)
    : items;

  const featuredItem = filteredItems[0] || items[0];
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
              <div className="lg:pl-8">
                <h2 className="text-primary-text mb-6 font-serif text-lg">
                  More Items
                </h2>
                <ProductGrid items={gridItems} />
              </div>
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
