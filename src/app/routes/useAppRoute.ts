/**
 * @file useAppRoute.ts
 * @description Hook pour lire les métadonnées de la page courante (`AppRouteEntry`) depuis React Router.
 */

import { useMatches } from 'react-router';
import { getRouteById } from './routes.config';
import type { AppRouteEntry } from './routes.config';

/**
 * @description Métadonnées de la page active (`appRouteList`) à partir de la feuille de match Router.
 * @returns `AppRouteEntry` ou `undefined` si l’`id` de route ne correspond à aucune entrée.
 */
export function useAppRoute(): AppRouteEntry | undefined {
  const matches = useMatches();
  const leaf = matches[matches.length - 1];
  if (!leaf?.id) return undefined;
  return getRouteById(leaf.id);
}
