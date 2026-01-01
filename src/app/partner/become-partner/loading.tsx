export default function PartnerLoading() {
  return (
    <main className="pb-24 lg:pt-24 p-3">
      {/* Hero section skeleton */}
      <section>
        <div className="grid justify-center p-5">
          <div className="text-center">
            <div className="h-12 w-80 bg-neutral-200 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="text-center max-w-[900px] pt-3">
            <div className="h-6 w-full max-w-lg bg-neutral-200 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* CTA section skeleton */}
      <section className="pt-5">
        <div className="grid justify-center p-5">
          <div className="h-8 w-96 bg-neutral-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <div className="h-10 w-32 bg-orange-200 rounded animate-pulse" />
          <div className="h-10 w-28 bg-neutral-200 rounded animate-pulse" />
        </div>
        
        {/* Feature cards skeleton */}
        <div className="px-5 sm:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-3 border-b sm:border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 bg-neutral-200 rounded animate-pulse" />
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
              </div>
              <div className="h-12 w-full bg-neutral-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
