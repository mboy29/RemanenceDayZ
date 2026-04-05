/**
 * @file index.ts
 * @description Ré-export public du module `routes` (routeur, config, hook `useAppRoute`).
 */

export { router } from './router';
export {
  appRouteList,
  getHomeRoute,
  getNavRoutes,
  getRouteByHref,
  getRouteById,
  type AppRouteEntry,
} from './routes.config';
export { useAppRoute } from './useAppRoute';
