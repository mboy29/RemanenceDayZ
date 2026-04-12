/**
 * @file HomePage.tsx
 * @description Page d’accueil : enchaîne hero, brief, lore, features, factions et pied de page.
 */

import { HomeHero } from '../components/home/HomeHero';
import { HomeBrief } from '../components/home/HomeBrief';
import { HomeLore } from '../components/home/HomeLore';
import { HomeFeatures } from '../components/home/HomeFeatures';
import { HomeFactions } from '../components/home/HomeFactions';
// import { HomeGallery } from '../components/home/HomeGallery';
import { Footer } from '../components/Footer';

/**
 * @returns {JSX.Element} Fragment des sections principales du site.
 */
export function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBrief />
      <HomeFeatures />
      <HomeLore />
      <HomeFactions />
      {/* <HomeGallery /> */}
      <Footer />
    </>
  );
}
