/**
 * Assemblage du corps du rapport : rails (ouverture, cluster) + sections isolées + annexe.
 */

import { Fragment, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../ui/utils';
import { loreDocument } from './lore.config';
import type { LoreIncidentOpening, LoreSection } from './lore.types';
import { getSectionFigure, LORE_BODY_FONT } from './loreReportConstants';
import { buildLoreReportBlocks } from './loreReportPlan';
import { LoreReportFigure } from './LoreReportMedia';
import { LoreSectionBlock } from './LoreSectionBlock';
import {
  LORE_RAPPORT_ANNEXE_ID,
  LORE_RAPPORT_NOTE_TERRAIN_ID,
  LORE_RAPPORT_SCROLL_MARGIN_CLASS,
} from './loreAnchor';
import { LoreImageCarousel } from './LoreImageCarousel';
import { LORE_BLOCK_INVIEW } from './loreScrollMotion';

function LoreFieldNote({
  title,
  body,
  className,
  rail,
}: {
  title: string;
  body: string;
  className?: string;
  rail?: boolean;
}) {
  return (
    <div
      id={LORE_RAPPORT_NOTE_TERRAIN_ID}
      className={cn(
        LORE_RAPPORT_SCROLL_MARGIN_CLASS,
        'mb-14 px-4',
        rail ? 'mx-0 text-left' : 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%', amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={cn('flex flex-col', rail ? 'items-start' : 'items-center')}
      >
        <div
          className={cn(
            'mb-5 h-[2px] bg-gradient-to-r from-transparent via-[#5c3a3a]/90 to-transparent',
            rail ? 'w-full' : 'w-full max-w-xs',
          )}
          aria-hidden
        />
        <p
          className="text-[11px] uppercase tracking-[0.25em] text-[#8a7355]"
          style={{ fontFamily: LORE_BODY_FONT }}
        >
          {title}
        </p>
        <p
          className="mt-3 leading-relaxed text-[#9a958a]"
          style={{ fontFamily: LORE_BODY_FONT, fontSize: '14px' }}
        >
          {body}
        </p>
      </motion.div>
    </div>
  );
}

function LoreIncidentOpeningRail({
  slice,
  opening,
}: {
  slice: LoreSection[];
  opening: LoreIncidentOpening;
}) {
  const baseDelay = 0.05;
  return (
    <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_min(360px,42%)] lg:items-start lg:gap-x-12 lg:gap-y-10">
      <div className="flex min-w-0 flex-col gap-14 sm:gap-16 lg:gap-[2.5rem]">
        {slice.map((section, i) => (
          <LoreSectionBlock
            key={`${section.type}-opening-${i}`}
            section={section}
            index={i}
            articleClassName="mb-0 w-full max-w-none"
            incidentStack
          />
        ))}
      </div>
      <div className="flex h-full flex-col gap-8 lg:sticky lg:top-[min(8.5rem,22vh)] lg:self-start justify-between">
        <LoreReportFigure
          src={opening.figure.src}
          alt={opening.figure.alt}
          caption={opening.figure.caption}
          aspectClass={opening.figure.aspectClass ?? 'aspect-[3/4]'}
          fillColumn={false}
          delay={baseDelay + 0.1}
          corruptedLoop={opening.figure.corruptedLoop !== false}
          staggerSeed={0}
          className="min-h-0 w-full max-lg:mx-auto max-lg:max-w-lg"
        />
        <LoreFieldNote
          title={opening.fieldNote.title}
          body={opening.fieldNote.body}
          rail
          className="mb-0 max-w-none px-0"
        />
      </div>
    </div>
  );
}

function LoreAnalysisClusterRail({
  slice,
  startIndex,
}: {
  slice: LoreSection[];
  startIndex: number;
}) {
  return (
    <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[min(360px,42%)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-10">
      <div className="order-1 flex min-w-0 flex-col gap-14 text-left sm:gap-16 lg:order-2 lg:gap-[2.5rem]">
        {slice.map((section, i) => (
          <LoreSectionBlock
            key={`${section.type}-cluster-${startIndex + i}`}
            section={section}
            index={startIndex + i}
            articleClassName="mb-0 w-full max-w-none"
            clusterStack
          />
        ))}
      </div>
      <div className="order-2 flex min-h-0 flex-col gap-8 lg:sticky lg:order-1 lg:top-[min(8.5rem,22vh)] lg:self-start">
        {slice.map((section, i) => {
          const fig = getSectionFigure(section);
          if (!fig) return null;
          const idx = startIndex + i;
          const baseDelay = 0.05 + idx * 0.04;
          return (
            <LoreReportFigure
              key={`cluster-fig-${idx}`}
              src={fig.src}
              alt={fig.alt}
              caption={fig.caption}
              aspectClass={fig.aspectClass ?? 'aspect-[3/4]'}
              fillColumn={false}
              delay={baseDelay + 0.1}
              corruptedLoop={fig.corruptedLoop !== false}
              staggerSeed={idx}
              className="min-h-0 w-full max-lg:mx-auto max-lg:max-w-lg"
            />
          );
        })}
      </div>
    </div>
  );
}

type LoreReportSectionsProps = {
  sections: typeof loreDocument.sections;
};

export function LoreReportSections({ sections }: LoreReportSectionsProps) {
  const doc = loreDocument;
  const opening = doc.incidentOpening;
  const openingCount = opening?.sectionCount ?? 3;
  const cluster = doc.analysisCluster;
  const clusterCount = cluster?.sectionCount ?? 2;
  const blocks = buildLoreReportBlocks(doc);

  return (
    <div className="mt-8">
      {blocks.map((block) => {
        if (block.kind === 'incidentOpening') {
          return (
            <Fragment key="lore-incident-opening">
              <LoreIncidentOpeningRail
                slice={sections.slice(0, openingCount)}
                opening={opening!}
              />
            </Fragment>
          );
        }
        if (block.kind === 'analysisCluster') {
          const start = cluster!.startIndex;
          const end = start + clusterCount;
          return (
            <Fragment key="lore-analysis-cluster">
              <LoreAnalysisClusterRail
                slice={sections.slice(start, end)}
                startIndex={start}
              />
            </Fragment>
          );
        }
        const section = sections[block.index];
        return (
          <Fragment key={`${section.type}-${block.index}`}>
            <LoreSectionBlock section={section} index={block.index} />
          </Fragment>
        );
      })}
    </div>
  );
}

export function LoreAnnexVisual() {
  const annexRef = useRef<HTMLElement>(null);
  const annexInView = useInView(annexRef, LORE_BLOCK_INVIEW);

  return (
    <motion.figure
      ref={annexRef}
      id={LORE_RAPPORT_ANNEXE_ID}
      initial={{ opacity: 0, y: 24 }}
      animate={annexInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 }}
      className={cn(
        LORE_RAPPORT_SCROLL_MARGIN_CLASS,
        'group relative mt-10 overflow-hidden border border-[#746f5c]/25 bg-black/40',
      )}
    >
      <LoreImageCarousel
        isInView={annexInView}
        showFrame={false}
        className="aspect-[12/5] max-h-[min(50vh,28rem)]"
      />
      <figcaption
        className="border-t border-[#746f5c]/20 bg-[#0a0a0a]/80 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#746f5c]"
        style={{ fontFamily: LORE_BODY_FONT }}
      >
        Fig. XX — Images restaurées de la Zone
      </figcaption>
    </motion.figure>
  );
}
