export default function OrdersLoading() {
  return (
    <main className="pt-4 lg:pt-20 px-5 pb-24">
      {/* Header skeleton */}
      <section className="flex justify-between items-center">
        <div className="h-7 w-32 bg-neutral-200 rounded animate-pulse" />
        <div className="h-9 w-20 bg-neutral-200 rounded animate-pulse" />
      </section>
      
      <div className="pt-3 border-b" />
      
      {/* Order cards skeleton */}
      <div className="w-full pt-3">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
        
        {/* Checkout section skeleton */}
        <div className="border rounded-lg mt-4">
          <div className="h-12 bg-neutral-200/80 rounded-t-lg animate-pulse" />
          <div className="p-3 space-y-3">
            <div className="flex justify-between">
              <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse" />
              <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="h-5 w-12 bg-neutral-200 rounded animate-pulse" />
              <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="border-b border-dashed" />
            <div className="flex justify-between">
              <div className="h-5 w-14 bg-neutral-200 rounded animate-pulse" />
              <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex justify-end p-2">
            <div className="h-10 w-36 bg-orange-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}

function OrderCardSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-neutral-200 rounded-lg animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
          <div className="flex justify-between items-center">
            <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-neutral-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
