/**
 * @file LoreHero.tsx
 * @description Hero plein écran page Lore : fond, titre phénomène Rémanence, accroche issue du dossier et CTA vers le rapport.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroBackground } from '../HeroSection';
import { getServerName } from '@/lib/server';
import { AlertTriangle, ChevronDown, Lock } from 'lucide-react';
import { LORE_ANCHOR_ID } from './loreAnchor';
import { loreDocument } from './lore.config';
import { LORE_BLOCK_VIEWPORT } from './loreScrollMotion';

/** Fait défiler la vue jusqu’au dossier classifié. */
function scrollToLoreContent() {
  document.getElementById(LORE_ANCHOR_ID)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

/** @returns {JSX.Element} Pastille avec le nom du serveur. */
function HeroServerName() {
  return (
    <div className="inline-block border border-[#746f5c]/40 px-4 py-1.5 mb-6 backdrop-blur-sm bg-black/20">
      <span
        className="text-[#8a8777] tracking-[0.2em] uppercase"
        style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.2em',
        }}
      >
        {getServerName()}
      </span>
    </div>
  );
}

/** @returns {JSX.Element} Ligne institut / niveau d’accès. */
function HeroInstituteLine() {
  return (
    <p
      className="mb-2 text-[#746f5c] tracking-[0.25em] uppercase"
      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}
    >
      {loreDocument.institute} · {loreDocument.fileLabel}
    </p>
  );
}

/** @returns {JSX.Element} Titre principal du hero. */
function HeroTitle() {
  return (
    <h1
      className="mb-4 tracking-tight text-[#d4cfc4]"
      style={{
        fontFamily: "'Teko', sans-serif",
        fontSize: 'clamp(3rem, 10vw, 7rem)',
        fontWeight: 600,
        lineHeight: 0.95,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
      }}
    >
      Classified Report
    </h1>
  );
}

/** @returns {JSX.Element} Sous-titre (titre du rapport). */
function HeroSubtitle() {
  return (
    <p
      className="text-[#8a8777] max-w-2xl mx-auto mb-8 leading-relaxed"
      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
    >
      {loreDocument.reportTitle}
      <br />
      <span className="text-[#746f5c] text-sm mt-2 block tracking-wide">
        Réf. {loreDocument.reference} — {loreDocument.accessLevel}
      </span>
    </p>
  );
}

/** @returns {JSX.Element} CTA « accès restreint » + fenêtre d’avertissement avant ouverture du dossier. */
function HeroCTAButton() {
  const [warningOpen, setWarningOpen] = useState(false);

  useEffect(() => {
    if (!warningOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWarningOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [warningOpen]);

  const confirmAndScroll = () => {
    setWarningOpen(false);
    queueMicrotask(() => scrollToLoreContent());
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setWarningOpen(true)}
        className="group relative cursor-pointer overflow-hidden border border-[#8b4040]/55 bg-[#140c0c]/85 px-6 py-3.5 backdrop-blur-md shadow-[0_0_0_1px_rgba(139,64,64,0.15),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-[#b45309]/70 hover:bg-[#1a0f0f]/90 hover:shadow-[0_0_24px_-4px_rgba(180,83,9,0.35)]"
        aria-label="Tenter d’accéder au dossier classifié"
        aria-haspopup="dialog"
        aria-expanded={warningOpen}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(139,64,64,0.35)_4px,rgba(139,64,64,0.35)_5px)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b45309]/50 to-transparent" aria-hidden />
        <span className="relative flex flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
          <span className="flex items-center gap-2 text-[#c49a8e]">
            <Lock className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
            <span
              className="tracking-[0.12em] uppercase"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.18em',
              }}
            >
              Accès non autorisé
            </span>
          </span>
          <span className="hidden h-4 w-px bg-[#5c3a3a]/60 sm:block" aria-hidden />
          <span
            className="flex items-center gap-2 text-[#e8e4dc] tracking-[0.12em] uppercase"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Forcer l’ouverture
            <ChevronDown className="h-4 w-4 opacity-80" strokeWidth={2} aria-hidden />
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {warningOpen ? (
          <motion.div
            role="presentation"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-[#050403]/88 backdrop-blur-[2px]"
              aria-label="Fermer"
              onClick={() => setWarningOpen(false)}
            />
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="lore-access-warning-title"
              aria-describedby="lore-access-warning-desc"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="relative z-[101] w-full max-w-md overflow-hidden border border-[#8b4040]/60 bg-[#0f0c0b] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(139,64,64,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-[#5c3a3a]/40 bg-[#1a0f0f]/90 px-4 py-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-[#f59e0b]" strokeWidth={2} aria-hidden />
                <p
                  id="lore-access-warning-title"
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8a88a]"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                >
                  Violation de protocole détectée
                </p>
              </div>
              <div className="px-5 py-5">
                <p
                  id="lore-access-warning-desc"
                  className="mb-4 text-left text-[14px] leading-relaxed text-[#b8b3a8]"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                >
                  Vous tentez d’ouvrir un segment{' '}
                  <span className="text-[#c49a8e]">{loreDocument.accessLevel.toLowerCase()}</span> du réseau
                  IR. Toute consultation hors périmètre habilité peut être journalisée.
                </p>
                <p
                  className="mb-6 border-l-2 border-[#b45309]/60 pl-3 text-left text-[12px] italic text-[#8a8777]"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                >
                  Poursuivre équivaut à assumer la responsabilité de l’exposition aux données ci-dessous.
                </p>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setWarningOpen(false)}
                    className="border border-[#746f5c]/45 bg-transparent px-4 py-2.5 text-[12px] uppercase tracking-[0.12em] text-[#9a958a] transition-colors hover:bg-[#1a1914] hover:text-[#d4cfc4]"
                    style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={confirmAndScroll}
                    className="border border-[#8b3030]/70 bg-[#2a1212]/90 px-4 py-2.5 text-[12px] uppercase tracking-[0.12em] text-[#f0ddd4] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:bg-[#3a1818] hover:border-[#b45309]/50"
                    style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                  >
                    Accéder quand même
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * @returns {JSX.Element} Section hero `h-screen` pour la page Lore.
 */
export function LoreHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground imageUrl="/images/lore/lore_hero.jpeg" imageAlt="Atmosphère Zone — placeholder" />
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={LORE_BLOCK_VIEWPORT}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroServerName />
        <HeroInstituteLine />
        <HeroTitle />
        <HeroSubtitle />
        <HeroCTAButton />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0d] to-transparent z-[5]" />
    </section>
  );
}
