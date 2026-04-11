import type { UseInViewOptions } from 'framer-motion';

/** Détection scroll : chaque bloc du dossier s’anime quand il entre dans la fenêtre. */
export const LORE_BLOCK_INVIEW: UseInViewOptions = {
  once: true,
  margin: '-10% 0px -8% 0px',
  amount: 0.18,
};

/** Même logique pour `motion.*` / `whileInView` (hors `SectionBlock`). */
export const LORE_BLOCK_VIEWPORT = {
  once: true,
  margin: '-12% 0px -10% 0px',
  amount: 0.2,
} as const;
