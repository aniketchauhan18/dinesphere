export default function ProfileLoading() {
  return (
    <main className="pt-4 lg:pt-20 px-5 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-32 bg-neutral-200 rounded animate-pulse" />
        <div className="h-9 w-20 bg-neutral-200 rounded animate-pulse" />
      </div>
      
      <div className="border-b mb-6" />
      
      {/* Profile card skeleton */}
      <div className="max-w-2xl mx-auto">
        <div className="border rounded-lg p-6 space-y-6">
          {/* Avatar skeleton */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-neutral-200 rounded-full animate-pulse" />
          </div>
          
          {/* Form fields skeleton */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-200 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
              <div className="h-10 w-full bg-neutral-200 rounded animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
              <div className="h-10 w-full bg-neutral-200 rounded animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse" />
              <div className="h-24 w-full bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
          
          {/* Button skeleton */}
          <div className="flex justify-end">
            <div className="h-10 w-32 bg-neutral-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
