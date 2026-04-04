import { useMatches } from 'react-router';
import { getRouteById } from './routes.config';
import type { AppRouteEntry } from './routes.config';

/**
 * Métadonnées de la page courante (`appRouteList`) à partir de la route React Router active.
 * Utilisable dans n’importe quel composant sous `<RouterProvider>` (pages, Rules.tsx, etc.)
 * sans passer de props.
 */
export function useAppRoute(): AppRouteEntry | undefined {
  const matches = useMatches();
  const leaf = matches[matches.length - 1];
  if (!leaf?.id) return undefined;
  return getRouteById(leaf.id);
}
