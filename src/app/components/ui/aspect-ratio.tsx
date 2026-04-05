"use client";

/**
 * @file aspect-ratio.tsx
 * @description Primitives et patterns UI (shadcn/ui) — le typage des props complète la doc.
 */

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
