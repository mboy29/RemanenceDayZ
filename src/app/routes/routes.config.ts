import type { ComponentType } from 'react';
import { HomePage } from '../pages/HomePage';
import { RulesPage } from '../pages/RulesPage';
import { FactionsPage } from '../pages/FactionsPage'
import { getServerName } from '@/lib/server';
import { DevBlogPage } from '../pages/DevBlog';

/** Liste des pages : chemins, chemins pour les liens, composants. */
export type AppRouteEntry = {
  id: string;
  pathSegment: string;
  href: string;
  title: string;
  navLabel?: string;
  Component: ComponentType;
};

/** Listes des routes. */
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

/** Routes affichées dans la navbar (sans la home — le logo pointe déjà vers `/`). */
export function getNavRoutes(): AppRouteEntry[] {
  return appRouteList.filter((r) => r.navLabel && r.id !== 'home');
}

/** Lien vers la page d’accueil (pour logo / bouton « retour »). */
export function getHomeRoute(): AppRouteEntry {
  const home = appRouteList.find((r) => r.id === 'home');
  if (!home) throw new Error('Route home manquante');
  return home;
}

/** Retrouve une entrée par son chemin absolu (ex. "/regles"). */
export function getRouteByHref(href: string): AppRouteEntry | undefined {
  const normalized = href === '' ? '/' : href.startsWith('/') ? href : `/${href}`;
  return appRouteList.find((r) => r.href === normalized);
}

/** Retrouve une entrée par l’`id` déclaré sur la route React Router (voir `router.tsx`). */
export function getRouteById(id: string): AppRouteEntry | undefined {
  return appRouteList.find((r) => r.id === id);
}
