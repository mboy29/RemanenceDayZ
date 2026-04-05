/**
 * @file factionVisuals.ts
 * @description Utilitaires purs pour couleurs et dégradés de fond des blocs « faction » (carrousel, cartes accueil).
 */

/** Preset de dégradé : angle et opacités différents selon le contexte d’affichage. */
export type FactionGradientPreset = 'carousel' | 'card';

/**
 * @description Parse une couleur hex `#RRGGBB` en composantes RGB.
 * @param hex - Chaîne hex sur 6 caractères (avec `#`).
 * @returns Objet `{ r, g, b }` ou `null` si invalide.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace('#', '');
  if (h.length !== 6) return null;
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b };
}

/**
 * @description Produit un `linear-gradient` CSS à partir de la couleur d’accent d’une faction.
 * @param accentColor - Couleur d’accent (hex).
 * @param preset - `carousel` (page Factions) ou `card` (accueil).
 * @returns Chaîne `background` CSS.
 */
export function accentGradient(
  accentColor: string,
  preset: FactionGradientPreset = 'carousel',
): string {
  const rgb = hexToRgb(accentColor);
  if (!rgb) {
    return preset === 'card'
      ? 'linear-gradient(160deg, rgba(74, 82, 40, 0.55) 0%, rgba(26, 26, 22, 0.92) 100%)'
      : 'linear-gradient(135deg, rgba(74, 82, 40, 0.6) 0%, rgba(26, 26, 22, 0.85) 100%)';
  }
  if (preset === 'card') {
    return `linear-gradient(160deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.55) 0%, rgba(26, 26, 22, 0.92) 100%)`;
  }
  return `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%, rgba(26, 26, 22, 0.85) 100%)`;
}
