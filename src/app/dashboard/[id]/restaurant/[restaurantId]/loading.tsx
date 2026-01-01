import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantDashboardLoading() {
  return (
    <main className="lg:py-16 pb-24">
      <section className="p-3">
        <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-neutral-200 rounded animate-pulse" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-60 rounded-lg" />
          ))}
        </div>
      </section>
      <section className="p-3 sm:p-10 grid grid-cols-2 gap-3 sm:gap-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </section>
      <section className="pt-10 p-3">
        <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
      <section className="pt-3 p-3">
        <div className="h-6 w-32 bg-neutral-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg shadow-xs">
              <Skeleton className="w-full h-60 rounded-t-lg" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

