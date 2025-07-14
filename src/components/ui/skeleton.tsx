import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };

// Skeleton for filter controls
export function SkeletonFilterControls() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>
      <Skeleton className="h-10 w-44 rounded-full" />
    </div>
  );
}
