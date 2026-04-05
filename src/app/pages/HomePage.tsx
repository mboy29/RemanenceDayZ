/**
 * @file HomePage.tsx
 * @description Page d’accueil : enchaîne hero, brief, features, factions et pied de page.
 */

import { HomeHero } from '../components/home/HomeHero';
import { HomeBrief } from '../components/home/HomeBrief';
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
      <HomeFactions />
      {/* <HomeGallery /> */}
      <Footer />
    </>
  );
}
