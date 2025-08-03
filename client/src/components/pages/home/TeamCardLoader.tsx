import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TeamCardLoader = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <div
      key={i}
      className="flex flex-col gap-2 p-4  max-h-52 border-dashed border-2
 border-gray-200  hover:border-gray-300 rounded-lg bg-gray-100"
    >
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </div>
  ));
};

export default TeamCardLoader;
