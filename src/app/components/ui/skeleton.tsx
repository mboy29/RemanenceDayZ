/**
 * @file skeleton.tsx
 * @description Primitives et patterns UI (shadcn/ui) — le typage des props complète la doc.
 */

import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
