export default function DashboardLoading() {
  return (
    <main className="pt-4 lg:pt-20 px-5 pb-24">
      {/* Header skeleton */}
      <section className="mb-6">
        <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-neutral-200 rounded animate-pulse" />
      </section>
      
      {/* Stats grid skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
            <div className="h-8 w-16 bg-neutral-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
      
      {/* Restaurant cards skeleton */}
      <section>
        <div className="h-6 w-40 bg-neutral-200 rounded mb-4 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="h-40 bg-neutral-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
