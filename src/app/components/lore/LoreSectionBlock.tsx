/**
 * Rendu d’une section du dossier (texte, puces ou définition) selon le type et le contexte (rail ou page pleine).
 */

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../ui/utils';
import { loreDocument } from './lore.config';
import type {
  LoreBulletSection,
  LoreDefinitionSection,
  LoreSection,
  LoreTextSection,
} from './lore.types';
import {
  LORE_BODY_FONT,
  LORE_INSET_BOX_CLASS,
  LORE_INSET_TITLE_CLASS,
  LORE_SPLIT_GRID_BULLETS,
  LORE_SPLIT_GRID_TEXT,
} from './loreReportConstants';
import {
  LoreReportFigure,
  LoreSectionTitle,
  LoreSplitColumns,
  splitFigureNode,
} from './LoreReportMedia';
import { LORE_RAPPORT_SCROLL_MARGIN_CLASS, loreSectionElementId } from './loreAnchor';
import { LORE_BLOCK_INVIEW } from './loreScrollMotion';

function LoreConclusionSection({
  title,
  prose,
  sectionAnchorId,
  articleClass,
  baseDelay,
}: {
  title: string;
  prose: ReactNode;
  sectionAnchorId: string;
  articleClass: string;
  baseDelay: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, LORE_BLOCK_INVIEW);

  return (
    <motion.article
      ref={ref}
      id={sectionAnchorId}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: baseDelay }}
      className={articleClass}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(12rem,24%)] lg:items-stretch lg:gap-10">
        <div className="flex min-w-0 flex-col gap-4">
          <LoreSectionTitle isInView={isInView} delay={baseDelay} className="mb-0">
            {title}
          </LoreSectionTitle>
          {prose}
        </div>
        <aside className="hidden h-full min-h-0 flex-col border border-[#4a5228]/25 bg-[#0a0a0a]/40 p-5 lg:flex">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#746f5c]"
            style={{ fontFamily: LORE_BODY_FONT }}
          >
            Clôture documentaire
          </p>
          <p
            className="mb-4 font-mono text-[11px] leading-relaxed text-[#8a8777]"
            style={{ wordBreak: 'break-all' }}
          >
            {loreDocument.reference}
          </p>
          <div className="mt-auto border-t border-[#746f5c]/20 pt-3">
            <p
              className="text-[#4a5228]"
              style={{
                fontFamily: "'Teko', sans-serif",
                fontSize: '14px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Fin de rapport
            </p>
          </div>
        </aside>
      </div>
    </motion.article>
  );
}

type LoreSectionBlockProps = {
  section: LoreSection;
  index: number;
  articleClassName?: string;
  inPairRow?: boolean;
  /** Rail ouverture : sections empilées + figure/note à côté. */
  incidentStack?: boolean;
  /** Rail analyse : colonne figures | colonne textes. */
  clusterStack?: boolean;
};

export function LoreSectionBlock({
  section,
  index,
  articleClassName,
  inPairRow,
  incidentStack,
  clusterStack,
}: LoreSectionBlockProps) {
  const articleRef = useRef<HTMLElement>(null);
  const isInView = useInView(articleRef, LORE_BLOCK_INVIEW);
  const baseDelay = 0.05 + index * 0.04;
  const sectionAnchorId = loreSectionElementId(index);
  const anchorScroll = LORE_RAPPORT_SCROLL_MARGIN_CLASS;
  const noInlineFigure = incidentStack || clusterStack;
  const columnStack = incidentStack || clusterStack;
  const articleClass = cn(
    'relative',
    anchorScroll,
    noInlineFigure ? 'mb-0' : 'mb-14',
    articleClassName,
  );

  if (section.type === 'text') {
    const s = section as LoreTextSection;
    const split = noInlineFigure ? undefined : s.figure;
    const isConclusion = index === 8;
    const isInset = s.textPresentation === 'inset';

    const titleEl = (
      <LoreSectionTitle
        isInView={isInView}
        delay={baseDelay}
        className={isInset || columnStack ? LORE_INSET_TITLE_CLASS : undefined}
      >
        {s.title}
      </LoreSectionTitle>
    );

    const prose = (
      <div
        className={cn(
          'space-y-4',
          !split &&
            !isConclusion &&
            !columnStack &&
            !isInset &&
            'max-w-4xl xl:max-w-5xl',
          isConclusion && 'max-w-none',
        )}
      >
        {s.paragraphs.map((p, i) => (
          <p
            key={i}
            className="leading-relaxed text-[#b8b3a8]"
            style={{ fontFamily: LORE_BODY_FONT, fontSize: '15px' }}
          >
            {p}
          </p>
        ))}
      </div>
    );

    if (isConclusion) {
      return (
        <LoreConclusionSection
          title={s.title}
          prose={prose}
          sectionAnchorId={sectionAnchorId}
          articleClass={articleClass}
          baseDelay={baseDelay}
        />
      );
    }

    if (split) {
      const textInner = (
        <>
          {titleEl}
          {prose}
        </>
      );
      const textColumn = isInset ? (
        <div className={LORE_INSET_BOX_CLASS}>{textInner}</div>
      ) : (
        textInner
      );
      return (
        <motion.article
          ref={articleRef}
          id={sectionAnchorId}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: baseDelay }}
          className={articleClass}
        >
          <LoreSplitColumns
            side={split.side}
            mainColumn={textColumn}
            figure={splitFigureNode(split, baseDelay, index)}
            gridMap={LORE_SPLIT_GRID_TEXT}
          />
        </motion.article>
      );
    }

    return (
      <motion.article
        ref={articleRef}
        id={sectionAnchorId}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: baseDelay }}
        className={articleClass}
      >
        {isInset || columnStack ? (
          <div className={LORE_INSET_BOX_CLASS}>
            {titleEl}
            {prose}
          </div>
        ) : (
          <>
            {titleEl}
            {prose}
          </>
        )}
      </motion.article>
    );
  }

  if (section.type === 'bullets') {
    const s = section as LoreBulletSection;
    const split = noInlineFigure ? undefined : s.figure;

    const list = (
      <ul
        className={cn(
          'space-y-3',
          !split &&
            (inPairRow || columnStack ? 'max-w-none' : 'max-w-4xl xl:max-w-5xl'),
        )}
      >
        {s.items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#4a5228]" aria-hidden />
            <span
              className="leading-relaxed text-[#b8b3a8]"
              style={{ fontFamily: LORE_BODY_FONT, fontSize: '15px' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    );

    if (split) {
      const textColumn = (
        <>
          <LoreSectionTitle isInView={isInView} delay={baseDelay}>
            {s.title}
          </LoreSectionTitle>
          {list}
        </>
      );
      return (
        <motion.article
          ref={articleRef}
          id={sectionAnchorId}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: baseDelay }}
          className={articleClass}
        >
          <LoreSplitColumns
            side={split.side}
            mainColumn={textColumn}
            figure={splitFigureNode(split, baseDelay, index)}
            gridMap={LORE_SPLIT_GRID_BULLETS}
          />
        </motion.article>
      );
    }

    const bulletTitle = (
      <LoreSectionTitle
        isInView={isInView}
        delay={baseDelay}
        className={columnStack ? LORE_INSET_TITLE_CLASS : undefined}
      >
        {s.title}
      </LoreSectionTitle>
    );

    return (
      <motion.article
        ref={articleRef}
        id={sectionAnchorId}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: baseDelay }}
        className={articleClass}
      >
        {columnStack ? (
          <div className={LORE_INSET_BOX_CLASS}>
            {bulletTitle}
            {list}
          </div>
        ) : (
          <>
            {bulletTitle}
            {list}
          </>
        )}
      </motion.article>
    );
  }

  const s = section as LoreDefinitionSection;
  const aside = s.figure;

  const definitionCard = (
    <div className="min-h-0 border border-[#746f5c]/35 bg-[#0a0a0a]/80 p-6 backdrop-blur-sm">
      <p
        className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#746f5c]"
        style={{ fontFamily: LORE_BODY_FONT }}
      >
        Terme
      </p>
      <p
        className="mb-4 text-[#d4cfc4]"
        style={{
          fontFamily: "'Teko', sans-serif",
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {s.term}
      </p>
      <p
        className="mb-4 leading-relaxed text-[#b8b3a8]"
        style={{ fontFamily: LORE_BODY_FONT, fontSize: '15px' }}
      >
        {s.definition}
      </p>
      {s.hypothesis ? (
        <div className="border-t border-[#746f5c]/20 pt-4">
          <p
            className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#8a7355]"
            style={{ fontFamily: LORE_BODY_FONT }}
          >
            Hypothèse
          </p>
          <p
            className="italic leading-relaxed text-[#c4bfb4]"
            style={{ fontFamily: LORE_BODY_FONT, fontSize: '14px' }}
          >
            « {s.hypothesis} »
          </p>
        </div>
      ) : null}
    </div>
  );

  return (
    <motion.article
      ref={articleRef}
      id={sectionAnchorId}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: baseDelay }}
      className={articleClass}
    >
      {aside ? (
        <>
          <LoreSectionTitle isInView={isInView} delay={baseDelay}>
            {s.title}
          </LoreSectionTitle>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(360px,42%)] lg:items-stretch">
            <div className="min-h-0 min-w-0">{definitionCard}</div>
            <div className="flex min-h-0 w-full min-w-0 flex-col lg:h-full lg:min-h-0">
              <LoreReportFigure
                src={aside.src}
                alt={aside.alt}
                caption={aside.caption}
                aspectClass={aside.aspectClass ?? 'aspect-[3/4]'}
                fillColumn
                isInView={isInView}
                delay={baseDelay + 0.12}
                corruptedLoop={aside.corruptedLoop !== false}
                staggerSeed={index}
                className="min-h-0 min-w-0"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <LoreSectionTitle isInView={isInView} delay={baseDelay}>
            {s.title}
          </LoreSectionTitle>
          <div className="max-w-4xl">{definitionCard}</div>
        </>
      )}
    </motion.article>
  );
}
