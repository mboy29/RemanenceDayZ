/**
 * @file FactionsCarroussel.tsx
 * @description Carrousel plein écran des fiches factions : slides animées, stats, navigation par flèches et pastilles emblème.
 */

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { factions, type Faction } from './factions.config';
import { getFactionsStatus } from '@/lib/factions';
import {
  formatFactionMembers,
  formatFactionStatusFr,
  factionStatusDotColor,
} from '@/lib/factionDisplay';
import {
  FactionBackdropGradient,
  FactionBackdropImage,
  FactionCornerBrackets,
  FactionDiagonalDecoration,
  FactionEmblemFrame,
} from './FactionSharedChrome';

/**
 * @param faction - Données faction (emblème, couleurs).
 * @param isActive - Si la slide est visible (contrôle l’animation d’entrée).
 * @returns {JSX.Element} Rangée emblème en haut de slide.
 */
function FactionSlideIdentityRow({
  faction,
  isActive,
}: {
  faction: Faction;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-6 flex items-center gap-4"
    >
      <FactionEmblemFrame
        variant="carouselSlide"
        emblemUrl={faction.emblemUrl}
        accentColor={faction.accentColor}
      />
    </motion.div>
  );
}

/**
 * @param name - Nom affiché de la faction.
 * @param isActive - Contrôle l’animation d’opacité / translation.
 * @returns {JSX.Element} Titre `h3` stylé Teko.
 */
function FactionSlideTitle({
  name,
  isActive,
}: {
  name: string;
  isActive: boolean;
}) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: -20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-4 tracking-tight text-[#d4cfc4]"
      style={{
        fontFamily: "'Teko', sans-serif",
        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
        fontWeight: 600,
        textTransform: 'uppercase',
      }}
    >
      {name}
    </motion.h3>
  );
}

/**
 * @param description - Texte descriptif de la faction.
 * @param isActive - Contrôle l’animation.
 * @returns {JSX.Element} Paragraphe de description.
 */
function FactionSlideDescription({
  description,
  isActive,
}: {
  description: string;
  isActive: boolean;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8 max-w-3xl leading-relaxed text-[#d4cfc4]"
      style={{
        fontFamily: "'Roboto Condensed', sans-serif",
        fontSize: '16px',
      }}
    >
      {description}
    </motion.p>
  );
}

/**
 * @param values - Liste de points (valeurs / détails).
 * @param accentColor - Couleur des puces.
 * @param isActive - Contrôle les animations en cascade.
 * @returns {JSX.Element} Liste verticale animée.
 */
function FactionSlideValuesList({
  values,
  accentColor,
  isActive,
}: {
  values: string[];
  accentColor: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-3"
    >
      {values.map((detail, detailIndex) => (
        <motion.div
          key={detailIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: 0.6 + detailIndex * 0.1,
          }}
          className="flex items-start gap-3"
        >
          <div
            className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="text-[#8a8777]"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '14px',
            }}
          >
            {detail}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * @param label - Libellé du bloc (ex. Statut, Membres).
 * @param accentColor - Couleur de la bordure gauche.
 * @param children - Contenu (statut, nombre, etc.).
 * @returns {JSX.Element} Bloc avec bordure accent.
 */
function FactionSlideStatBlock({
  label,
  accentColor,
  children,
}: {
  label: string;
  accentColor: string;
  children: ReactNode;
}) {
  return (
    <div
      className="border-l-2 pl-4"
      style={{ borderColor: `${accentColor}66` }}
    >
      <div
        className="mb-1 uppercase tracking-[0.1em] text-[#746f5c]"
        style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: '10px',
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

/**
 * @param faction - Faction courante (couleurs, statut, membres).
 * @param dotColor - Couleur du point de statut (résolu côté parent).
 * @param isActive - Contrôle l’animation d’apparition.
 * @returns {JSX.Element} Rangée Statut + Membres.
 */
function FactionSlideStatsRow({
  faction,
  dotColor,
  isActive,
}: {
  faction: Faction;
  dotColor: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="flex items-end gap-8"
    >
      <FactionSlideStatBlock label="Statut" accentColor={faction.accentColor}>
        <div className="flex h-8 items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
          <span
            className="text-[#d4cfc4]"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {formatFactionStatusFr(faction)}
          </span>
        </div>
      </FactionSlideStatBlock>
      <FactionSlideStatBlock label="Membres" accentColor={faction.accentColor}>
        <div
          className="flex h-8 items-center text-[#d4cfc4]"
          style={{
            fontFamily: "'Teko', sans-serif",
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {formatFactionMembers(faction)}
        </div>
      </FactionSlideStatBlock>
    </motion.div>
  );
}

/**
 * @param faction - Données complètes de la slide.
 * @param isActive - Slide visible ou non.
 * @param dotColor - Couleur indicateur statut.
 * @returns {JSX.Element} Colonne texte + stats d’une slide.
 */
function FactionCarouselSlideContent({
  faction,
  isActive,
  dotColor,
}: {
  faction: Faction;
  isActive: boolean;
  dotColor: string;
}) {
  return (
    <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
      <div>
        <FactionSlideIdentityRow faction={faction} isActive={isActive} />
        <FactionSlideTitle name={faction.name} isActive={isActive} />
        <FactionSlideDescription
          description={faction.description}
          isActive={isActive}
        />
        <FactionSlideValuesList
          values={faction.values}
          accentColor={faction.accentColor}
          isActive={isActive}
        />
      </div>
      <FactionSlideStatsRow
        faction={faction}
        dotColor={dotColor}
        isActive={isActive}
      />
    </div>
  );
}

/**
 * @param faction - Faction de cette slide.
 * @param index - Index dans le tableau `factions`.
 * @param currentIndex - Index de la slide active.
 * @returns {JSX.Element} Slide positionnée en `absolute` avec fond et chrome.
 */
function FactionCarouselSlide({
  faction,
  index,
  currentIndex,
}: {
  faction: Faction;
  index: number;
  currentIndex: number;
}) {
  const isActive = index === currentIndex;
  const resolvedStatus =
    faction.status ?? getFactionsStatus({ factionName: faction.name });
  const dotColor = factionStatusDotColor(faction, resolvedStatus);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
        x: isActive ? 0 : index < currentIndex ? -100 : 100,
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute inset-0 overflow-hidden border border-[#746f5c]/20"
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      <FactionBackdropImage imageUrl={faction.imageUrl} />
      <FactionBackdropGradient accentColor={faction.accentColor} />
      <FactionCornerBrackets accentColor={faction.accentColor} />
      <FactionDiagonalDecoration />
      <FactionCarouselSlideContent
        faction={faction}
        isActive={isActive}
        dotColor={dotColor}
      />
    </motion.div>
  );
}

/**
 * @param direction - `prev` ou `next` (icône Chevron).
 * @param accentColor - Bordure et teinte du bouton.
 * @param onClick - Handler clic.
 * @param label - `aria-label` accessible.
 * @returns {JSX.Element} Bouton flèche de navigation.
 */
function CarouselNavArrowButton({
  direction,
  accentColor,
  onClick,
  label,
}: {
  direction: 'prev' | 'next';
  accentColor: string;
  onClick: () => void;
  label: string;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group border bg-[#1a1a16]/40 p-2 transition-colors duration-300 hover:bg-opacity-20"
      style={{
        borderColor: accentColor,
        backgroundColor: `${accentColor}10`,
      }}
      aria-label={label}
    >
      <Icon
        className="h-4 w-4 transition-colors group-hover:text-[#d4cfc4]"
        style={{ color: accentColor }}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}

/**
 * @param faction - Faction représentée par le point.
 * @param index - Index cible au clic.
 * @param currentIndex - Slide actuellement affichée.
 * @param activeAccentColor - Accent de la faction courante (cadre actif).
 * @param onSelect - Callback pour changer de slide.
 * @returns {JSX.Element} Bouton pastille avec emblème miniature.
 */
function CarouselFactionNavDot({
  faction,
  index,
  currentIndex,
  activeAccentColor,
  onSelect,
}: {
  faction: Faction;
  index: number;
  currentIndex: number;
  activeAccentColor: string;
  onSelect: (index: number) => void;
}) {
  const isCurrent = index === currentIndex;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group relative border p-2 transition-all duration-300"
      style={{
        borderColor: isCurrent ? activeAccentColor : 'rgba(116, 111, 92, 0.2)',
        backgroundColor: isCurrent
          ? `${activeAccentColor}33`
          : 'rgba(26, 26, 22, 0.4)',
      }}
      aria-label={`Aller à ${faction.name}`}
    >
      {isCurrent ? (
        <motion.div
          layoutId="factionsActiveIndicator"
          className="absolute inset-0 border-2"
          style={{ borderColor: activeAccentColor }}
          transition={{ duration: 0.3 }}
        />
      ) : null}
      <div
        className="relative flex items-center justify-center transition-colors duration-300"
        style={{ color: isCurrent ? activeAccentColor : '#746f5c' }}
      >
        <FactionEmblemFrame
          variant="carouselNav"
          emblemUrl={faction.emblemUrl}
          accentColor={faction.accentColor}
        />
      </div>
    </motion.button>
  );
}

/**
 * @param isInView - Si la section est visible (animation d’entrée barre nav).
 * @param onChange - Optionnel : notifie le parent quand l’index change.
 * @param currentIndex - Index slide active.
 * @param setCurrentIndex - Setter d’index (state parent).
 * @returns {JSX.Element} Flèches + rangée de pastilles factions.
 */
function FactionsCarrouselNavigator({
  isInView,
  onChange,
  currentIndex,
  setCurrentIndex,
}: {
  isInView: boolean;
  onChange?: (index: number) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const current = factions[currentIndex]!;

  /** Passe à la slide suivante (boucle) et appelle `onChange`. */
  const nextSlide = () => {
    const next = (currentIndex + 1) % factions.length;
    setCurrentIndex(next);
    onChange?.(next);
  };

  /** Passe à la slide précédente (boucle) et appelle `onChange`. */
  const prevSlide = () => {
    const next = (currentIndex - 1 + factions.length) % factions.length;
    setCurrentIndex(next);
    onChange?.(next);
  };

  /** Sélectionne une slide par index et appelle `onChange`. */
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onChange?.(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex items-center justify-center gap-4"
    >
      <CarouselNavArrowButton
        direction="prev"
        accentColor={current.accentColor}
        onClick={prevSlide}
        label="Faction précédente"
      />
      <div className="flex gap-3">
        {factions.map((faction, index) => (
          <CarouselFactionNavDot
            key={faction.name}
            faction={faction}
            index={index}
            currentIndex={currentIndex}
            activeAccentColor={current.accentColor}
            onSelect={goToSlide}
          />
        ))}
      </div>
      <CarouselNavArrowButton
        direction="next"
        accentColor={current.accentColor}
        onClick={nextSlide}
        label="Faction suivante"
      />
    </motion.div>
  );
}

/**
 * @param isInView - Contrôle les animations quand la section est dans le viewport.
 * @param onChange - Optionnel : index courant après navigation.
 * @returns {JSX.Element} Zone carrousel + navigateur.
 */
export function FactionsCarroussel({
  isInView,
  onChange,
}: {
  isInView: boolean;
  onChange?: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="relative">
        <div className="relative mb-8 h-[600px]">
          {factions.map((faction, index) => (
            <FactionCarouselSlide
              key={faction.name}
              faction={faction}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </div>
        <FactionsCarrouselNavigator
          isInView={isInView}
          onChange={onChange}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </>
  );
}
