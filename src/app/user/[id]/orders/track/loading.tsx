export default function TrackOrdersLoading() {
  return (
    <main className="pt-4 lg:pt-20 px-5 pb-24">
      {/* Header skeleton */}
      <section className="flex justify-between items-center mb-4">
        <div className="h-7 w-40 bg-neutral-200 rounded animate-pulse" />
        <div className="h-9 w-20 bg-neutral-200 rounded animate-pulse" />
      </section>
      
      <div className="border-b mb-4" />
      
      {/* Order tracking cards skeleton */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
              </div>
              <div className="h-6 w-20 bg-green-200 rounded-full animate-pulse" />
            </div>
            
            {/* Progress bar skeleton */}
            <div className="mb-4">
              <div className="h-2 w-full bg-neutral-200 rounded-full animate-pulse" />
            </div>
            
            {/* Order items skeleton */}
            <div className="space-y-2">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4 flex justify-between">
              <div className="h-5 w-14 bg-neutral-200 rounded animate-pulse" />
              <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
