/**
 * @file RulesPage.tsx
 * @description Page du règlement : hero puis accordéon des règles.
 */

import { Rules } from '../components/rules/Rules';
import { RulesHero } from '../components/rules/RulesHero';

/**
 * @returns {JSX.Element} Vue règles du serveur.
 */
export function RulesPage() {

  return (
    <>
      <RulesHero />
      <Rules />
    </>
  );
}
