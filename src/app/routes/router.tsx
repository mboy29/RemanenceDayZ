import { createBrowserRouter } from 'react-router';
import type { RouteObject } from 'react-router';
import { RootLayout } from '../layouts/RootLayout';
import { appRouteList } from './routes.config';

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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: buildChildren(),
  },
]);
