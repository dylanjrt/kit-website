export default function ItemLoading() {
  return (
    <div className="bg-background min-h-screen">
      <main className="px-8 lg:px-12 py-8">
        {/* Back link */}
        <div className="skeleton h-2.5 w-24 mb-10" />

        <div className="lg:flex lg:gap-16 lg:items-start">
          {/* Image gallery */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="skeleton aspect-[4/3] w-full max-w-2xl mb-3" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton w-16 h-16 lg:w-20 lg:h-20" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-2">
              <div className="skeleton h-6 w-2/3" />
              <div className="skeleton h-2.5 w-1/4" />
            </div>
            <div className="skeleton h-4 w-1/5" />
            <div className="space-y-2 pt-2">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-3/4" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="skeleton h-2.5 w-24" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="skeleton h-2.5 w-16" />
                    <div className="skeleton h-2.5 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
