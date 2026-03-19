export default function CollectionLoading() {
  return (
    <div className="bg-background min-h-screen">
      <main className="px-8 lg:px-12 py-8">
        {/* Label */}
        <div className="mb-10 lg:mb-12">
          <div className="skeleton h-2.5 w-20 mb-6" />
          {/* Category filter */}
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-2.5 w-14" />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-square mb-3" />
              <div className="skeleton h-2.5 w-3/4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
