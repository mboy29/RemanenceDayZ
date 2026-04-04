import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { getFactionsNbMembers, getFactionsStatus } from '@/lib/factions';
import { Section } from '../Section';
import { FACTIONS_ANCHOR_ID } from './factionsAnchor';
import { factions, type Faction } from './factions.config';
import { getFactionIcon } from './factionIcons';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace('#', '');
  if (h.length !== 6) return null;
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b };
}

function accentGradient(accentColor: string): string {
  const rgb = hexToRgb(accentColor);
  if (!rgb) {
    return 'linear-gradient(135deg, rgba(74, 82, 40, 0.6) 0%, rgba(26, 26, 22, 0.85) 100%)';
  }
  return `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%, rgba(26, 26, 22, 0.85) 100%)`;
}

function formatMembers(faction: Faction): string {
  const fromConfig =
    typeof faction.nbMembers === 'number' ? faction.nbMembers : undefined;
  const n =
    fromConfig !== undefined && fromConfig > 0
      ? fromConfig
      : getFactionsNbMembers({ factionName: faction.name });
  return n > 0 ? String(n) : '—';
}

const STATUS_LABELS: Record<'active' | 'inactive' | 'open', string> = {
  active: 'Actif',
  inactive: 'Inactif',
  open: 'Ouvert',
};

function formatStatus(faction: Faction): string {
  const s = faction.status ?? getFactionsStatus({ factionName: faction.name });
  if (!s) return '—';
  return STATUS_LABELS[s];
}

function statusDotColor(
  faction: Faction,
  resolved: 'active' | 'inactive' | 'open' | null,
): string {
  if (resolved === 'open') return faction.accentColor;
  if (resolved === 'active') return '#746f5c';
  if (resolved === 'inactive') return '#5c5c5c';
  return '#746f5c';
}

export function Factions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = factions[currentIndex]!;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % factions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + factions.length) % factions.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Section id={FACTIONS_ANCHOR_ID} gridBackground={false} bgColor="#0a0a0a">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-6 w-1 origin-top"
              style={{ backgroundColor: current.accentColor }}
            />
            <span
              className="uppercase tracking-[0.2em] text-[#746f5c]"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '11px',
              }}
            >
              Déploiement
            </span>
          </div>
          <h2
            className="tracking-tight text-[#d4cfc4]"
            style={{
              fontFamily: "'Teko', sans-serif",
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Factions actives
          </h2>
        </motion.div>

        <div className="relative">
          <div className="relative mb-8 h-[600px]">
            {factions.map((faction, index) => {
              const Icon = getFactionIcon(faction.name);
              const resolvedStatus =
                faction.status ?? getFactionsStatus({ factionName: faction.name });
              const dotColor = statusDotColor(faction, resolvedStatus);
              return (
                <motion.div
                  key={faction.name}
                  initial={false}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 0.95,
                    x:
                      index === currentIndex
                        ? 0
                        : index < currentIndex
                          ? -100
                          : 100,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 overflow-hidden border border-[#746f5c]/20"
                  style={{
                    pointerEvents: index === currentIndex ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${faction.imageUrl})`,
                      opacity: 0.15,
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: accentGradient(faction.accentColor) }}
                  />
                  <div
                    className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2"
                    style={{ borderColor: faction.accentColor }}
                  />
                  <div
                    className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2"
                    style={{ borderColor: faction.accentColor }}
                  />
                  <div
                    className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2"
                    style={{ borderColor: faction.accentColor }}
                  />
                  <div
                    className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2"
                    style={{ borderColor: faction.accentColor }}
                  />

                  <div className="absolute right-0 top-0 h-64 w-64 opacity-5">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-[#d4cfc4]"
                        style={{
                          width: '1px',
                          height: '100%',
                          left: `${i * 32}px`,
                          transform: 'rotate(45deg)',
                          transformOrigin: 'top left',
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={
                          index === currentIndex ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 flex items-center gap-4"
                      >
                        <div
                          className="flex h-12 w-12 items-center justify-center border bg-[#0a0a0a]/60 backdrop-blur-sm"
                          style={{ borderColor: faction.accentColor }}
                        >
                          <div style={{ color: faction.accentColor }}>
                            <Icon size={24} aria-hidden />
                          </div>
                        </div>
                        <div className="flex h-12 items-center border border-[#746f5c]/40 bg-[#0a0a0a]/60 px-4 py-2 backdrop-blur-sm">
                          <span
                            className="tracking-[0.2em]"
                            style={{
                              fontFamily: "'Teko', sans-serif",
                              fontSize: '20px',
                              fontWeight: 700,
                              color: faction.accentColor,
                            }}
                          >
                            {faction.code}
                          </span>
                        </div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        animate={
                          index === currentIndex ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-4 tracking-tight text-[#d4cfc4]"
                        style={{
                          fontFamily: "'Teko', sans-serif",
                          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {faction.name}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={
                          index === currentIndex ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-8 max-w-3xl leading-relaxed text-[#d4cfc4]"
                        style={{
                          fontFamily: "'Roboto Condensed', sans-serif",
                          fontSize: '16px',
                        }}
                      >
                        {faction.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={index === currentIndex ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="space-y-3"
                      >
                        {faction.values.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              index === currentIndex
                                ? { opacity: 1, x: 0 }
                                : {}
                            }
                            transition={{
                              duration: 0.4,
                              delay: 0.6 + detailIndex * 0.1,
                            }}
                            className="flex items-start gap-3"
                          >
                            <div
                              className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: faction.accentColor }}
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
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={index === currentIndex ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex items-end gap-8"
                    >
                      <div
                        className="border-l-2 pl-4"
                        style={{
                          borderColor: `${faction.accentColor}66`,
                        }}
                      >
                        <div
                          className="mb-1 uppercase tracking-[0.1em] text-[#746f5c]"
                          style={{
                            fontFamily: "'Roboto Condensed', sans-serif",
                            fontSize: '10px',
                          }}
                        >
                          Statut
                        </div>
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
                            {formatStatus(faction)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="border-l-2 pl-4"
                        style={{
                          borderColor: `${faction.accentColor}66`,
                        }}
                      >
                        <div
                          className="mb-1 uppercase tracking-[0.1em] text-[#746f5c]"
                          style={{
                            fontFamily: "'Roboto Condensed', sans-serif",
                            fontSize: '10px',
                          }}
                        >
                          Membres
                        </div>
                        <div
                          className="flex h-8 items-center text-[#d4cfc4]"
                          style={{
                            fontFamily: "'Teko', sans-serif",
                            fontSize: '24px',
                            fontWeight: 600,
                            lineHeight: 1,
                          }}
                        >
                          {formatMembers(faction)}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={prevSlide}
              className="group border bg-[#1a1a16]/40 p-2 transition-colors duration-300 hover:bg-opacity-20"
              style={{
                borderColor: current.accentColor,
                backgroundColor: `${current.accentColor}10`,
              }}
              aria-label="Faction précédente"
            >
              <ChevronLeft
                className="h-4 w-4 transition-colors group-hover:text-[#d4cfc4]"
                style={{ color: current.accentColor }}
                strokeWidth={2}
                aria-hidden
              />
            </button>

            <div className="flex gap-3">
              {factions.map((faction, index) => {
                const NavIcon = getFactionIcon(faction.name);
                return (
                  <motion.button
                    key={faction.name}
                    type="button"
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative border p-2 transition-all duration-300"
                    style={{
                      borderColor:
                        index === currentIndex
                          ? current.accentColor
                          : 'rgba(116, 111, 92, 0.2)',
                      backgroundColor:
                        index === currentIndex
                          ? `${current.accentColor}33`
                          : 'rgba(26, 26, 22, 0.4)',
                    }}
                    aria-label={`Aller à ${faction.name}`}
                  >
                    {index === currentIndex ? (
                      <motion.div
                        layoutId="factionsActiveIndicator"
                        className="absolute inset-0 border-2"
                        style={{ borderColor: current.accentColor }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : null}

                    <div
                      className="relative flex h-6 w-6 items-center justify-center transition-colors duration-300"
                      style={{
                        color:
                          index === currentIndex
                            ? current.accentColor
                            : '#746f5c',
                      }}
                    >
                      <NavIcon size={16} aria-hidden />
                    </div>

                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap border border-[#746f5c]/40 bg-[#1a1a16] px-3 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span
                        className="text-[#d4cfc4]"
                        style={{
                          fontFamily: "'Roboto Condensed', sans-serif",
                          fontSize: '12px',
                        }}
                      >
                        {faction.code}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="group border bg-[#1a1a16]/40 p-2 transition-colors duration-300 hover:bg-opacity-20"
              style={{
                borderColor: current.accentColor,
                backgroundColor: `${current.accentColor}10`,
              }}
              aria-label="Faction suivante"
            >
              <ChevronRight
                className="h-4 w-4 transition-colors group-hover:text-[#d4cfc4]"
                style={{ color: current.accentColor }}
                strokeWidth={2}
                aria-hidden
              />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 border-l-2 pl-4"
          style={{ borderColor: `${current.accentColor}66` }}
        >
          <p
            className="text-[#746f5c]"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '13px',
            }}
          >
            L’adhésion à une faction est facultative. Les alliances temporaires et
            le jeu en solitaire restent possibles.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
