export default function DashboardLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header spacer */}
      <div className="h-16" aria-hidden="true" />

      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title row skeleton */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-7 w-44 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-11 w-32 bg-gray-200 rounded-xl animate-pulse flex-shrink-0" />
          </div>

          {/* Timeline card skeletons */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-card-border rounded-2xl p-5"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                      <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                    <div className="h-4 w-52 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-36 bg-gray-100 rounded animate-pulse mt-1" />
                  </div>
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
