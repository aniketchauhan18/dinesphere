import { Skeleton } from "@/components/ui/skeleton";

export default function UserLoading() {
  return (
    <main className="pt-5 px-5 lg:pt-24 pb-24">
      <section className="flex gap-5 items-center">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </section>
      <section className="pt-5 space-y-3">
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
      </section>
    </main>
  );
}

