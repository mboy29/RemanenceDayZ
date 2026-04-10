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

/** Luminance relative WCAG (0 = noir, 1 = blanc), pour estimer la « brillance » perçue. */
function relativeLuminance(r: number, g: number, b: number): number {
  const lin = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  const R = lin(r);
  const G = lin(g);
  const B = lin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Opacité du premier stop du dégradé : plus la couleur est claire, plus on baisse l’alpha
 * pour éviter un fond trop criard ; les tons foncés gardent un alpha plus élevé pour rester visibles.
 */
function accentStartAlpha(rgb: { r: number; g: number; b: number }, preset: FactionGradientPreset): number {
  const L = relativeLuminance(rgb.r, rgb.g, rgb.b);
  if (preset === 'card') {
    const dark = 0.62;
    const bright = 0.34;
    return dark - (dark - bright) * L;
  }
  const dark = 0.68;
  const bright = 0.4;
  return dark - (dark - bright) * L;
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
  const a = accentStartAlpha(rgb, preset).toFixed(2);
  if (preset === 'card') {
    return `linear-gradient(160deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a}) 0%, rgba(26, 26, 22, 0.92) 100%)`;
  }
  return `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a}) 0%, rgba(26, 26, 22, 0.85) 100%)`;
}
