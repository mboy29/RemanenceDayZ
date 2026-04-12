/**
 * @file HomeFactions.tsx
 * @description Bloc accueil « Factions » : cartes par lot (carrousel si > 3), lien vers la page Factions.
 */

import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  FactionBackdropGradient,
  FactionBackdropImage,
  FactionCornerBrackets,
  FactionEmblemFrame,
} from '../factions/FactionSharedChrome';
import { factions, type Faction } from '../factions/factions.config';
import { Section } from '../Section';

const ITEMS_PER_FRAME = 3;

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * @param faction - Données affichées sur la carte.
 * @param staggerIndex - Index pour le délai d’animation `variants`.
 * @param isInView - Active les animations d’entrée.
 * @returns {JSX.Element} Carte article avec fond faction et emblème.
 */
function FactionCard({
  faction,
  staggerIndex,
  isInView,
}: {
  faction: Faction;
  staggerIndex: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      custom={staggerIndex}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardReveal}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="group relative overflow-hidden border"
      style={{ borderColor: faction.accentColor }}
    >
      <FactionBackdropImage
        imageUrl={faction.imageUrl}
        opacity={0.12}
        className="transition-transform duration-500 group-hover:scale-105"
        ariaHidden
      />
      <FactionBackdropGradient accentColor={faction.accentColor} preset="card" />
      <FactionCornerBrackets accentColor={faction.accentColor} size="sm" />

      <div className="relative flex flex-col gap-4 p-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FactionEmblemFrame
              variant="homeCard"
              emblemUrl={faction.emblemUrl}
              accentColor={faction.accentColor}
              alt={`Emblème ${faction.name}`}
            />
            <div className="min-w-0 flex-1">
              <p
                className="text-[11px] uppercase tracking-[0.2em] text-[#746f5c]"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
              >
                {faction.code}
              </p>
              <h3
                className="truncate text-[#d4cfc4] tracking-tight"
                style={{
                  fontFamily: "'Teko', sans-serif",
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {faction.name}
              </h3>
            </div>
          </div>
        </header>

        <p
          className="line-clamp-4 text-[#8a8777] sm:line-clamp-5"
          style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: '13px',
            lineHeight: 1.55,
          }}
        >
          {faction.description}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * @param isInView - Contrôle l’animation du bandeau de titre (actuellement commenté dans le JSX).
 * @returns {JSX.Element} En-tête de section avec surlignage vertical.
 */
export function HomeFactionsHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="mb-3 flex items-center gap-3">
        <motion.span
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="h-6 w-1 origin-top bg-[#746f5c]"
          aria-hidden
        />
        <span
          className="uppercase tracking-[0.2em] text-[#746f5c]"
          style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px' }}
        >
          Forces en présence
        </span>
      </div>
      <h2
        id="home-factions-heading"
        className="text-[#d4cfc4] tracking-tight"
        style={{
          fontFamily: "'Teko', sans-serif",
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 600,
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        Factions de la Zone
      </h2>
    </motion.header>
  );
}

/**
 * @param totalFrames - Nombre de pages (onglets).
 * @param currentFrame - Page active (0-based).
 * @param onSelect - Sélection d’une page.
 * @returns {JSX.Element} Liste `role="tablist"` de pastilles.
 */
function FramePagination({
  totalFrames,
  currentFrame,
  onSelect,
}: {
  totalFrames: number;
  currentFrame: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Pages de factions">
      {Array.from({ length: totalFrames }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === currentFrame}
          aria-label={`Page ${index + 1} sur ${totalFrames}`}
          onClick={() => onSelect(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentFrame ? 'w-8 bg-[#746f5c]' : 'w-2 bg-[#746f5c]/30 hover:bg-[#746f5c]/50'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * @param totalFrames - Nombre de pages.
 * @param currentFrame - Page courante.
 * @param onPrev - Page précédente.
 * @param onNext - Page suivante.
 * @param onSelectFrame - Choix direct d’une page.
 * @returns {JSX.Element} Barre de navigation flèches + pagination.
 */
function FrameCarouselControls({
  totalFrames,
  currentFrame,
  onPrev,
  onNext,
  onSelectFrame,
}: {
  totalFrames: number;
  currentFrame: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectFrame: (index: number) => void;
}) {
  return (
    <nav
      className="flex flex-wrap items-center gap-3"
      aria-label="Navigation du carrousel de factions"
    >
      <button
        type="button"
        onClick={onPrev}
        className="border border-[#746f5c]/40 bg-[#1a1a16]/60 p-2 transition-colors duration-300 hover:border-[#746f5c]"
        aria-label="Page précédente"
      >
        <ChevronLeft size={20} className="text-[#746f5c]" aria-hidden />
      </button>
      <FramePagination
        totalFrames={totalFrames}
        currentFrame={currentFrame}
        onSelect={onSelectFrame}
      />
      <button
        type="button"
        onClick={onNext}
        className="border border-[#746f5c]/40 bg-[#1a1a16]/60 p-2 transition-colors duration-300 hover:border-[#746f5c]"
        aria-label="Page suivante"
      >
        <ChevronRight size={20} className="text-[#746f5c]" aria-hidden />
      </button>
    </nav>
  );
}

/**
 * @param isInView - Animation d’apparition du lien.
 * @returns {JSX.Element} Lien React Router vers `/factions`.
 */
function ViewAllFactionsLink({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.35 }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="shrink-0"
    >
      <Link
        to="/factions"
        className="group flex items-center gap-3 border border-[#746f5c]/40 bg-[#1a1a16]/60 px-6 py-3 transition-colors duration-300 hover:border-[#746f5c]"
      >
        <span
          className="text-[#d4cfc4] tracking-wide"
          style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          View All Factions
        </span>
        <ArrowRight
          size={16}
          className="text-[#746f5c] transition-colors duration-300 group-hover:text-[#d4cfc4]"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

const frameTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/**
 * @returns {JSX.Element | null} Section factions accueil, ou `null` si aucune faction en config.
 */
export function HomeFactions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [currentFrame, setCurrentFrame] = useState(0);

  const totalFrames = useMemo(
    () => Math.max(1, Math.ceil(factions.length / ITEMS_PER_FRAME)),
    [],
  );

  const showCarousel = factions.length > ITEMS_PER_FRAME;

  /** Sous-ensemble de factions pour la page de carrousel courante. */
  const currentFactions = useMemo(() => {
    if (!showCarousel) return factions;
    const start = currentFrame * ITEMS_PER_FRAME;
    return factions.slice(start, start + ITEMS_PER_FRAME);
  }, [currentFrame, showCarousel]);

  /** Avance d’une page (boucle). */
  const nextFrame = useCallback(() => {
    setCurrentFrame((prev) => (prev + 1) % totalFrames);
  }, [totalFrames]);

  /** Recule d’une page (boucle). */
  const prevFrame = useCallback(() => {
    setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames);
  }, [totalFrames]);

  /** Positionne le carrousel sur une page donnée. */
  const goToFrame = useCallback((frameIndex: number) => {
    setCurrentFrame(frameIndex);
  }, []);

  if (factions.length === 0) {
    return null;
  }

  return (
    <Section title="Factions de la Zone" description="Les factions de la Zone" ariaLabelledBy="home-factions-heading" 
      bgColor="#0f0f0d">
      <div ref={ref}>
        {/* <HomeFactionsHeader isInView={isInView} /> */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          <p
            className="mb-6 max-w-3xl leading-relaxed text-[#d4cfc4]"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '16px' }}
          >
            The conflict has fractured Chernarus into seven major factions, each with distinct
            ideologies and tactics. Join organized military forces for structure and resources, or
            operate independently as a lone survivor.
          </p>

          <div className="relative mb-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentFrame}
                role="list"
                aria-label={`Factions, page ${currentFrame + 1} sur ${totalFrames}`}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={frameTransition}
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                {currentFactions.map((faction, index) => (
                  <div key={faction.name} role="listitem">
                    <FactionCard
                      faction={faction}
                      staggerIndex={index}
                      isInView={isInView}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {showCarousel ? (
                <FrameCarouselControls
                  totalFrames={totalFrames}
                  currentFrame={currentFrame}
                  onPrev={prevFrame}
                  onNext={nextFrame}
                  onSelectFrame={goToFrame}
                />
              ) : (
                <span className="hidden sm:block" aria-hidden />
              )}
              <ViewAllFactionsLink isInView={isInView} />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
