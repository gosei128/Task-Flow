import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonTask() {
  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
