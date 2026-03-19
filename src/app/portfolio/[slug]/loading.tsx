export default function ProjectLoading() {
  return (
    <div className="bg-background min-h-screen">
      <main className="px-8 lg:px-16 py-8 lg:py-12">
        {/* Back link */}
        <div className="skeleton h-2.5 w-20 mb-10" />

        {/* Title */}
        <div className="mb-12 lg:mb-16 space-y-3">
          <div className="skeleton h-10 lg:h-14 w-3/4 max-w-xl" />
          <div className="skeleton h-2.5 w-32" />
        </div>

        {/* Cover image */}
        <div className="skeleton w-full aspect-[4/3] lg:aspect-[16/9] mb-12 lg:mb-16" />

        {/* Description + image grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 mb-12 lg:mb-0 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`skeleton h-3 ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
              />
            ))}
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton aspect-[4/3]" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
