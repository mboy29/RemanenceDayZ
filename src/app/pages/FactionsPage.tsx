/**
 * @file FactionsPage.tsx
 * @description Page dédiée aux factions : hero plein écran puis carrousel détaillé.
 */

import { Factions } from '../components/factions/Factions';
import { FactionsHero } from '../components/factions/FactionsHero';

/**
 * @returns {JSX.Element} Vue factions du serveur.
 */
export function FactionsPage() {

  return (
    <>
      <FactionsHero />
      <Factions />
    </>
  );
}
