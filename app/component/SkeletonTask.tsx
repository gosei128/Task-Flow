import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonTask() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 min-w-[800px] w-full" />
        <Skeleton className="h-10 min-w-[800px] w-full" />
        <Skeleton className="h-10 min-w-[800px] w-full" />
      </div>
    </div>
  );
}
