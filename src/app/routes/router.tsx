/**
 * @file router.tsx
 * @description Construit le `createBrowserRouter` : layout racine + index home + routes enfants depuis `appRouteList`.
 */

import { createBrowserRouter } from 'react-router';
import type { RouteObject } from 'react-router';
import { RootLayout } from '../layouts/RootLayout';
import { appRouteList } from './routes.config';

/**
 * @description Transforme `appRouteList` en `RouteObject[]` (index `/` + segments).
 * @returns Liste des routes enfants du layout racine.
 * @throws {Error} Si l’entrée `home` est absente.
 */
function buildChildren(): RouteObject[] {
  const home = appRouteList.find((r) => r.id === 'home');
  const rest = appRouteList.filter((r) => r.id !== 'home');
  if (!home) throw new Error('Route home manquante');

  const HomeComponent = home.Component;
  const children: RouteObject[] = [
    { index: true, id: home.id, element: <HomeComponent /> },
    ...rest.map((r) => {
      const C = r.Component;
      return {
        id: r.id,
        path: r.pathSegment,
        element: <C />,
      };
    }),
  ];
  return children;
}

/** Routeur unique de l’application (monté dans `App.tsx`). */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: buildChildren(),
  },
]);
