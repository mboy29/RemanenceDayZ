/**
 * @file routes.config.ts
 * @description Liste des pages de l’app : ids React Router, chemins, titres, composants et helpers de recherche.
 */

import type { ComponentType } from 'react';
import { HomePage } from '../pages/HomePage';
import { RulesPage } from '../pages/RulesPage';
import { FactionsPage } from '../pages/FactionsPage'
import { getServerName } from '@/lib/server';
import { DevBlogPage } from '../pages/DevBlogPage';
import { LorePage } from '../pages/LorePage';

/** Métadonnées d’une route synchronisées avec `router.tsx` et la navbar. */
export type AppRouteEntry = {
  id: string;
  pathSegment: string;
  href: string;
  title: string;
  navLabel?: string;
  Component: ComponentType;
};

/** Routes dans l’ordre logique de navigation. */
export const appRouteList: AppRouteEntry[] = [
  {
    id: 'home',
    pathSegment: '',
    href: '/',
    title: 'Accueil',
    navLabel: getServerName(),
    Component: HomePage,
  },
  {
    id: 'lore',
    pathSegment: 'lore',
    href: '/lore',
    title: 'Lore',
    navLabel: 'Lore',
    Component: LorePage,
  },
  {
    id: 'rules',
    pathSegment: 'regles',
    href: '/regles',
    title: 'Règles',
    navLabel: 'Règles',
    Component: RulesPage,
  },
  {
    id: 'factions',
    pathSegment: 'factions',
    href: '/factions',
    title: 'Factions',
    navLabel: 'Factions',
    Component: FactionsPage,
  },
  {
    id: 'dev-blog',
    pathSegment: 'dev-blog',
    href: '/dev-blog',
    title: 'Blog de développement',
    navLabel: 'Blog',
    Component: DevBlogPage,
  },
];

/**
 * @description Routes affichées dans la navbar (hors home, déjà portée par le logo).
 * @returns Sous-ensemble de `appRouteList` avec `navLabel`.
 */
export function getNavRoutes(): AppRouteEntry[] {
  return appRouteList.filter((r) => r.navLabel && r.id !== 'home');
}

/**
 * @description Entrée de la page d’accueil.
 * @returns L’élément `home` de `appRouteList`.
 * @throws {Error} Si absent.
 */
export function getHomeRoute(): AppRouteEntry {
  const home = appRouteList.find((r) => r.id === 'home');
  if (!home) throw new Error('Route home manquante');
  return home;
}

/**
 * @description Recherche par URL absolue ou relative.
 * @param href - Ex. `/regles` ou `regles`.
 * @returns Entrée correspondante ou `undefined`.
 */
export function getRouteByHref(href: string): AppRouteEntry | undefined {
  const normalized = href === '' ? '/' : href.startsWith('/') ? href : `/${href}`;
  return appRouteList.find((r) => r.href === normalized);
}

/**
 * @description Recherche par `id` de route React Router (feuille).
 * @param id - Ex. `rules`, `factions`.
 * @returns Entrée ou `undefined`.
 */
export function getRouteById(id: string): AppRouteEntry | undefined {
  return appRouteList.find((r) => r.id === id);
}
