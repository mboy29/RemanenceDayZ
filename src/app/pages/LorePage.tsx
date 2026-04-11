/**
 * @file LorePage.tsx
 * @description Page Lore : hero immersif puis dossier classifié (contenu `lore.config`).
 */

import { Lore } from '../components/lore/Lore';
import { LoreHero } from '../components/lore/LoreHero';
import { Footer } from '../components/Footer';

/**
 * @returns {JSX.Element} Vue lore du serveur.
 */
export function LorePage() {
  return (
    <>
      <LoreHero />
      <Lore />
      <Footer />
    </>
  );
}
