import { HomeHero } from '../components/home/HomeHero';
import { MissionBriefing } from '../components/home/MissionBriefing';
import { Features } from '../components/home/Features';
import { Factions } from '../components/home/Factions';
import { Gallery } from '../components/home/Gallery';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <HomeHero />
      <MissionBriefing />
      <Features />
      <Factions />
      <Gallery />
      <Footer />
    </>
  );
}
