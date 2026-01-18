import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PhoneGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="flex flex-col">
            <Skeleton className="aspect-square w-full" />

            <div className="p-3 space-y-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-full mt-2" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
