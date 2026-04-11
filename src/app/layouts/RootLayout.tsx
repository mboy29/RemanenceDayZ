/**
 * @file RootLayout.tsx
 * @description Layout global : navbar fixe + `<Outlet />` pour les pages enfants du routeur.
 */

import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from '../components/Navbar';

/**
 * Remonte la fenêtre en haut à chaque navigation (SPA : sinon le scroll reste
 * là où on l’avait laissé en revenant sur Lore / Règles / Factions via le menu).
 */
function ScrollToTopOnRoute() {
  const location = useLocation();

  useLayoutEffect(() => {
    const goTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    goTop();
    // Après les effets des enfants (ex. nav Lore) qui peuvent toucher au scroll dans la même frame.
    const id = requestAnimationFrame(() => goTop());
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.key]);

  return null;
}

/**
 * @returns {JSX.Element} Shell plein écran avec navigation et contenu de route.
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4cfc4]">
      <ScrollToTopOnRoute />
      <Navbar />
      <Outlet />
    </div>
  );
}
