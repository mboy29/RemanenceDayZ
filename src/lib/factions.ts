/**
 * @file factions.ts
 * @description Accès aux champs dynamiques des factions (`nbMembers`, `status`) à partir de `factions.config`.
 */

import { factions } from '@/app/components/factions/factions.config';

/**
 * @description Effectif affiché pour une faction (config ou défaut).
 * @param factionName - Nom exact de la faction dans la config.
 * @returns {number} Nombre de membres ou `0` si non renseigné.
 */
function getFactionsNbMembers({ factionName }: { factionName: string }): number {
  const f = factions.find((x) => x.name === factionName);
  if (typeof f?.nbMembers === 'number') return f.nbMembers;
  return 0;
}

/**
 * @description Statut UI de la faction (actif / inactif / ouvert).
 * @param factionName - Nom exact de la faction dans la config.
 * @returns Statut depuis la config ou `null`.
 */
function getFactionsStatus({
  factionName,
}: {
  factionName: string;
}): 'active' | 'inactive' | 'open' | null {
  const f = factions.find((x) => x.name === factionName);
  return f?.status ?? null;
}

export { getFactionsNbMembers, getFactionsStatus };
