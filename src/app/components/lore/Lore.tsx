/**
 * @file Lore.tsx
 * @description Corps de la page Lore : présentation type dossier classifié à partir de `loreDocument`, métadonnées, navigation.
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FileText, Lock, MapPin, Radio, User } from 'lucide-react';
import { cn } from '../ui/utils';
import { loreDocument } from './lore.config';
import {
  LORE_ANCHOR_ID,
  LORE_RAPPORT_EN_TETE_ID,
  LORE_RAPPORT_METADONNEES_ID,
  LORE_RAPPORT_SCROLL_MARGIN_CLASS,
} from './loreAnchor';
import { LoreReportNav } from './LoreReportNav';
import { LORE_BODY_FONT, LoreAnnexVisual, LoreReportSections } from './LoreSections';
import { LORE_BLOCK_VIEWPORT } from './loreScrollMotion';

type MetaRowProps = { icon: ReactNode; label: string; value: string };

function MetaRow({ icon, label, value }: MetaRowProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#746f5c]/15 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div className="flex items-center gap-2 text-[#746f5c]">
        <span className="text-[#4a5228]" aria-hidden>
          {icon}
        </span>
        <span
          className="text-[11px] uppercase tracking-[0.2em]"
          style={{ fontFamily: LORE_BODY_FONT }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-right text-[#d4cfc4] sm:max-w-md"
        style={{ fontFamily: LORE_BODY_FONT, fontSize: '14px' }}
      >
        {value}
      </p>
    </div>
  );
}

function LoreClassifiedChrome() {
  const doc = loreDocument;
  return (
    <div className="relative overflow-hidden border border-[#746f5c]/30 bg-[#0a0a0a]/60 p-8 backdrop-blur-md">
      <div
        className="pointer-events-none absolute -right-8 top-6 rotate-[-12deg] select-none text-[clamp(3rem,12vw,7rem)] font-bold uppercase leading-none text-[#5c3a3a]/[0.07]"
        style={{ fontFamily: "'Teko', sans-serif" }}
        aria-hidden
      >
        Classifié
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={LORE_BLOCK_VIEWPORT}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <FileText className="text-[#4a5228]" size={22} strokeWidth={1.5} aria-hidden />
          <span
            className="text-[11px] uppercase tracking-[0.35em] text-[#8a8777]"
            style={{ fontFamily: LORE_BODY_FONT }}
          >
            {doc.institute}
          </span>
          <span className="hidden h-4 w-px bg-[#746f5c]/40 sm:block" aria-hidden />
          <span
            className="rounded border border-[#5c3a3a]/50 bg-[#5c3a3a]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-[#c49a8e]"
            style={{ fontFamily: LORE_BODY_FONT }}
          >
            {doc.fileLabel}
          </span>
        </div>
        <h2
          className="mb-2 max-w-4xl text-[#d4cfc4]"
          style={{
            fontFamily: "'Teko', sans-serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            textTransform: 'uppercase',
          }}
        >
          {doc.reportTitle}
        </h2>
        <p
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#746f5c]"
          style={{ fontFamily: LORE_BODY_FONT, fontSize: '12px' }}
        >
          <span className="tracking-wider">Réf. {doc.reference}</span>
          <span aria-hidden className="text-[#4a5228]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 tracking-wide text-[#a08070]">
            <Lock size={12} strokeWidth={1.5} aria-hidden />
            {doc.accessLevel}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

function LoreSynthèseHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={LORE_BLOCK_VIEWPORT}
      transition={{ duration: 0.5 }}
      className="mb-4 flex items-center gap-3"
    >
      <div className="h-6 w-1 origin-top bg-[#4a5228]" />
      <span
        id="lore-dossier-heading"
        className="uppercase tracking-[0.2em] text-[#746f5c]"
        style={{ fontFamily: LORE_BODY_FONT, fontSize: '11px' }}
      >
        Document de synthèse
      </span>
    </motion.div>
  );
}

function LoreRapportEnTete() {
  return (
    <div id={LORE_RAPPORT_EN_TETE_ID} className={LORE_RAPPORT_SCROLL_MARGIN_CLASS}>
      <LoreSynthèseHeading />
      <LoreClassifiedChrome />
    </div>
  );
}

type LoreMetadataPanelProps = {
  doc: typeof loreDocument;
};

function LoreMetadataPanel({ doc }: LoreMetadataPanelProps) {
  return (
    <motion.div
      id={LORE_RAPPORT_METADONNEES_ID}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={LORE_BLOCK_VIEWPORT}
      transition={{ duration: 0.5, delay: 0.06 }}
      className={cn(
        'mt-8 border border-[#746f5c]/20 bg-black/25 p-6 md:p-8',
        LORE_RAPPORT_SCROLL_MARGIN_CLASS,
      )}
    >
      <MetaRow icon={<Radio size={16} />} label="Statut" value={doc.status} />
      <MetaRow icon={<MapPin size={16} />} label="Localisation" value={doc.location} />
      <MetaRow
        icon={<FileText size={16} />}
        label="Date de l’incident"
        value={doc.incidentDate}
      />
      {doc.author ? (
        <MetaRow icon={<User size={16} />} label="Rédaction / source" value={doc.author} />
      ) : null}
    </motion.div>
  );
}

function LoreDocumentFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={LORE_BLOCK_VIEWPORT}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="mt-16 border-t border-[#746f5c]/20 pt-8 text-center"
    >
      <p className="text-[#746f5c]" style={{ fontFamily: LORE_BODY_FONT, fontSize: '12px' }}>
        Fin du document — diffusion strictement limitée. Toute reproduction non autorisée est
        interdite.
      </p>
    </motion.footer>
  );
}

/**
 * @returns Section principale du lore : en-tête, métadonnées, corps par sections, annexe.
 */
export function Lore() {
  const doc = loreDocument;

  return (
    <section
      id={LORE_ANCHOR_ID}
      aria-labelledby="lore-dossier-heading"
      className="relative scroll-mt-[4.75rem] px-6 py-16 md:py-24"
      style={{ backgroundColor: '#0f0f0d' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#746f5c 1px, transparent 1px), linear-gradient(90deg, #746f5c 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl gap-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={LORE_BLOCK_VIEWPORT}
          transition={{ duration: 0.45 }}
          className="mb-6"
        >
          <LoreReportNav />
        </motion.div>

        <LoreRapportEnTete />
        <LoreMetadataPanel doc={doc} />
        <LoreReportSections sections={doc.sections} />
        <LoreAnnexVisual />
        <LoreDocumentFooter />
      </div>
    </section>
  );
}
