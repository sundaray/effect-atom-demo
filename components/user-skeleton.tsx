import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="bg-white overflow-hidden">
      <Skeleton className="aspect-square w-full bg-neutral-200" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 bg-neutral-200" />

        <Skeleton className="h-4 w-1/2 bg-neutral-200" />
        <Skeleton className="h-4 w-2/3 bg-neutral-200" />

        <Skeleton className="h-3 w-full mt-2 bg-neutral-200" />
      </div>
    </div>
  );
}

export function UserGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {Array.from({ length: 12 }).map((_, i) => (
        <UserSkeleton key={i} />
      ))}
    </div>
  );
}
