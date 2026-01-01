export default function RestaurantDetailLoading() {
  return (
    <main className="pt-5 lg:pt-20 px-5 pb-24">
      {/* Restaurant name skeleton */}
      <section>
        <div className="h-8 w-64 bg-neutral-200 rounded-lg animate-pulse" />
      </section>
      
      {/* Images skeleton */}
      <section className="w-full mt-5 min-h-72 rounded">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="h-44 sm:h-96 bg-neutral-200 rounded-lg animate-pulse" />
          <div className="grid grid-rows-2 gap-4">
            <div className="h-full bg-neutral-200 rounded-lg animate-pulse" />
            <div className="h-full bg-neutral-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* Menu section skeleton */}
      <section className="pt-5">
        <div className="h-6 w-32 bg-neutral-200 rounded mb-4 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <MenuCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function MenuCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-40 bg-neutral-200 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-5 w-3/4 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse" />
          <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
