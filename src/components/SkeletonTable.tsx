import { Skeleton } from "@/components/ui/skeleton";

type size =
  | "max-w-sm"
  | "max-w-md"
  | "max-w-lg"
  | "max-w-xl"
  | "max-w-2xl"
  | "max-w-3xl" ;

type SkeletonTableProps = {
  size?: size;
  cols: number;
};

export function SkeletonTable({ size, cols }: SkeletonTableProps) {
  return (
    <div className={`flex w-full flex-col gap-4 ${size}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex gap-6" key={index}>
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
