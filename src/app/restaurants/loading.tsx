export default function RestaurantsLoading() {
  return (
    <main className="pt-4 lg:pt-20 px-5 pb-24">
      {/* Search and Filter skeleton */}
      <section className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="h-10 flex-1 bg-neutral-200 rounded-lg animate-pulse" />
        <div className="h-10 w-32 bg-neutral-200 rounded-lg animate-pulse" />
      </section>
      
      {/* Restaurant cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-3">
        {[...Array(8)].map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}

function RestaurantCardSkeleton() {
  return (
    <div className="p-5 flex justify-center">
      <div className="rounded-lg bg-neutral-50 max-w-xs w-full">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-neutral-200 rounded-t-lg animate-pulse" />
        
        {/* Content skeleton */}
        <div className="p-3 space-y-3">
          <div className="h-6 w-3/4 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-neutral-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
