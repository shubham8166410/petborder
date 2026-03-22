export default function GenerateLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-6 w-28 rounded bg-gray-200 animate-pulse" />
        </div>
      </header>
      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-lg mx-auto flex flex-col gap-6">
          {/* Step indicator skeleton */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                {i < 3 && <div className="h-0.5 w-12 bg-gray-200 animate-pulse" />}
              </div>
            ))}
          </div>
          {/* Content skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-7 w-64 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-48 rounded bg-gray-200 animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="h-24 rounded-2xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
