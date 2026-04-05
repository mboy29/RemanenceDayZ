/**
 * @file RootLayout.tsx
 * @description Layout global : navbar fixe + `<Outlet />` pour les pages enfants du routeur.
 */

import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

/**
 * @returns {JSX.Element} Shell plein écran avec navigation et contenu de route.
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4cfc4]">
      <Navbar />
      <Outlet />
    </div>
  );
}
