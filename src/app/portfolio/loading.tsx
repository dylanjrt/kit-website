export default function PortfolioLoading() {
  return (
    <div className="bg-background min-h-screen">
      <main className="px-8 lg:px-16 py-8 lg:py-12">
        {/* Label */}
        <div className="skeleton h-2.5 w-36 mb-16 lg:mb-20" />

        {/* Staggered project list */}
        <div className="space-y-16 lg:space-y-24">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`flex items-start gap-8 ${i % 2 === 1 ? "lg:ml-[28%] xl:ml-[35%]" : ""}`}
            >
              <div className="flex-1 space-y-2">
                <div className="skeleton h-2.5 w-6" />
                <div className="skeleton h-7 w-56 lg:w-72" />
                <div className="skeleton h-2.5 w-32 mt-1" />
              </div>
              <div className="hidden sm:block skeleton w-24 h-28 lg:w-32 lg:h-40 flex-shrink-0" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
