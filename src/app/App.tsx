/**
 * @file App.tsx
 * @description Racine de l’UI : fournit le routeur React (`RouterProvider`).
 */

import { RouterProvider } from 'react-router';
import { router } from './routes/router';

/**
 * @description Composant racine rendu par `main.tsx`.
 * @returns {JSX.Element} Arbre sous le routeur du site.
 */
export default function App() {
  return <RouterProvider router={router} />;
}
