/**
 * @file use-mobile.ts
 * @description Primitives et patterns UI (shadcn/ui) — le typage des props complète la doc.
 */

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * @returns {boolean} Indique si la fenêtre est considérée comme mobile (largeur sous 768px).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
