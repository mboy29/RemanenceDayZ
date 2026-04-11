import type {
  LoreBulletSection,
  LoreDefinitionSection,
  LoreFigureSpec,
  LoreSection,
  LoreTextSection,
} from './lore.types';

/** Police corps des blocs rapport (réexportée pour `Lore.tsx`). */
export const LORE_BODY_FONT = "'Roboto Condensed', sans-serif";

/** Encart dossier : bande verticale + fond. */
export const LORE_INSET_BOX_CLASS =
  'rounded-r-sm border-l-[3px] border-[#4a5228]/55 bg-[#0a0a0a]/45 py-6 pl-5 pr-5 text-left md:py-7 md:pl-7 md:pr-8';

export const LORE_INSET_TITLE_CLASS = 'mb-3 border-0 pl-0';

/** Grilles Tailwind pour `LoreSplitColumns` (texte + figure sur une même section). */
export const LORE_SPLIT_GRID_TEXT: Record<LoreFigureSpec['side'], string> = {
  right: 'lg:grid-cols-[minmax(0,1fr)_min(360px,42%)]',
  left: 'lg:grid-cols-[min(360px,42%)_minmax(0,1fr)]',
};

export const LORE_SPLIT_GRID_BULLETS: Record<LoreFigureSpec['side'], string> = {
  right: 'lg:grid-cols-[minmax(0,1fr)_min(340px,40%)]',
  left: 'lg:grid-cols-[min(340px,40%)_minmax(0,1fr)]',
};

/** Figure associée à une section (pour la colonne images d’un cluster). */
export function getSectionFigure(section: LoreSection): LoreFigureSpec | undefined {
  if (section.type === 'definition') return (section as LoreDefinitionSection).figure;
  if (section.type === 'text') return (section as LoreTextSection).figure;
  return (section as LoreBulletSection).figure;
}
