/**
 * @file loreAnchor.ts
 * @description Identifiants d’ancre HTML pour le dossier Lore et navigation du rapport.
 */

/** Valeur de `id` sur la section principale (scroll depuis `LoreHero`). */
export const LORE_ANCHOR_ID = 'lore-dossier';

/** En-tête (titre document + chrome classifié). */
export const LORE_RAPPORT_EN_TETE_ID = 'lore-rapport-en-tete';

/** Bloc métadonnées (statut, lieu, date…). */
export const LORE_RAPPORT_METADONNEES_ID = 'lore-rapport-metadonnees';

/** Note de terrain (colonne gauche du bloc ouverture incident, ou encart centré si pas de bloc). */
export const LORE_RAPPORT_NOTE_TERRAIN_ID = 'lore-rapport-note-terrain';

/** Figure panoramique en fin de rapport. */
export const LORE_RAPPORT_ANNEXE_ID = 'lore-rapport-annexe-visuelle';

/**
 * @param index - Indice dans `loreDocument.sections`.
 * @returns {string} `id` HTML stable pour ancrage / onglets.
 */
export function loreSectionElementId(index: number): string {
  return `lore-section-${index}`;
}

/** Offset de scroll (navbar + barre d’onglets sticky) — classes Tailwind `scroll-mt-*`. */
export const LORE_RAPPORT_SCROLL_MARGIN_CLASS = 'scroll-mt-[8.25rem]';
