export default function AboutLoading() {
  return (
    <div className="bg-background min-h-screen">
      <main className="px-8 lg:px-16 py-8 lg:py-12">
        {/* Heading */}
        <div className="skeleton h-10 lg:h-14 xl:h-16 w-48 mb-12 lg:mb-16" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left: bio + image */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <div className="space-y-2 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-5 w-full" />
              ))}
              <div className="skeleton h-5 w-2/3" />
            </div>
            <div className="space-y-2 mb-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`skeleton h-3 ${i % 4 === 3 ? "w-1/2" : "w-full"}`}
                />
              ))}
            </div>
            <div className="skeleton aspect-[4/3] w-full max-w-xl" />
          </div>

          {/* Right: details */}
          <div className="lg:col-span-5 space-y-12">
            {[...Array(3)].map((_, section) => (
              <div key={section}>
                <div className="skeleton h-2.5 w-24 mb-4" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`skeleton h-2.5 ${i % 2 === 1 ? "w-3/4" : "w-full"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
