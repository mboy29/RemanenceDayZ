/**
 * @file factionDisplay.ts
 * @description Formatage affichage (membres, statut FR, couleur du point) pour les composants liés aux factions.
 */

import type { Faction } from '@/app/components/factions/factions.config';
import { getFactionsNbMembers, getFactionsStatus } from '@/lib/factions';

/** Libellés français pour les statuts de faction. */
export const FACTION_STATUS_LABELS_FR: Record<'active' | 'inactive' | 'open', string> = {
  active: 'Actif',
  inactive: 'Inactif',
  open: 'Ouvert',
};

/**
 * @description Chaîne à afficher pour le nombre de membres.
 * @param faction - Entrée `Faction` depuis la config.
 * @returns Nombre en string, ou `—` si inconnu / nul.
 */
export function formatFactionMembers(faction: Faction): string {
  const fromConfig =
    typeof faction.nbMembers === 'number' ? faction.nbMembers : undefined;
  const n =
    fromConfig !== undefined && fromConfig > 0
      ? fromConfig
      : getFactionsNbMembers({ factionName: faction.name });
  return n > 0 ? String(n) : '—';
}

/**
 * @description Libellé de statut en français.
 * @param faction - Entrée `Faction` depuis la config.
 * @returns Texte du statut ou `—`.
 */
export function formatFactionStatusFr(faction: Faction): string {
  const s = faction.status ?? getFactionsStatus({ factionName: faction.name });
  if (!s) return '—';
  return FACTION_STATUS_LABELS_FR[s];
}

/**
 * @description Couleur du indicateur (pastille) selon le statut résolu.
 * @param faction - Faction (pour l’accent « ouvert »).
 * @param resolved - Statut effectif (`null` si inconnu).
 * @returns Couleur CSS (hex ou mot-clé).
 */
export function factionStatusDotColor(
  faction: Faction,
  resolved: 'active' | 'inactive' | 'open' | null,
): string {
  if (resolved === 'open') return faction.accentColor;
  if (resolved === 'active') return '#746f5c';
  if (resolved === 'inactive') return '#5c5c5c';
  return '#746f5c';
}
