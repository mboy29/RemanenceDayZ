/**
 * Primitives visuelles du rapport : figure encadrée, titre de section, grille texte|image.
 */

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../ui/utils';
import type { LoreFigureSpec } from './lore.types';
import { LORE_BODY_FONT } from './loreReportConstants';
import { LoreCorruptImage } from './LoreCorruptImage';
import { LORE_BLOCK_INVIEW } from './loreScrollMotion';

type LoreReportFigureProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  aspectClass?: string;
  fillColumn?: boolean;
  delay?: number;
  corruptedLoop?: boolean;
  staggerSeed?: number;
};

/** Figure avec cadre, légende et animation corruption optionnelle. */
export function LoreReportFigure({
  src,
  alt,
  caption,
  className,
  aspectClass = 'aspect-[21/9]',
  fillColumn = false,
  delay = 0.15,
  corruptedLoop = true,
  staggerSeed = 0,
}: LoreReportFigureProps) {
  const figRef = useRef<HTMLElement>(null);
  const isInView = useInView(figRef, LORE_BLOCK_INVIEW);

  const mediaClass = cn(
    'relative w-full overflow-hidden',
    fillColumn
      ? cn(
          aspectClass,
          'max-h-[min(70vh,36rem)] max-lg:mx-auto max-lg:w-full',
          'lg:max-h-none lg:aspect-auto lg:h-0 lg:min-h-0 lg:flex-1 lg:basis-0',
        )
      : aspectClass,
  );

  return (
    <motion.figure
      ref={figRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className={cn(
        'group relative overflow-hidden border border-[#746f5c]/25 bg-black/40',
        fillColumn && 'flex min-h-0 w-full flex-col lg:h-full lg:flex-1',
        className,
      )}
    >
      <div className={mediaClass}>
        {corruptedLoop ? (
          <LoreCorruptImage
            src={src}
            alt={alt}
            className="absolute inset-0 h-full min-h-[8rem] w-full"
            active={isInView}
            staggerSeed={staggerSeed}
          />
        ) : (
          <>
            <img
              src={src}
              alt={alt}
              className={cn(
                'h-full w-full object-cover object-center opacity-90 transition-opacity duration-500 group-hover:opacity-100',
                fillColumn && 'min-h-0',
              )}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-[#4a5228]/50" />
            <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-[#4a5228]/50" />
          </>
        )}
      </div>
      <figcaption
        className={cn(
          'border-t border-[#746f5c]/20 bg-[#0a0a0a]/80 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#746f5c]',
          fillColumn && 'shrink-0',
        )}
        style={{ fontFamily: LORE_BODY_FONT }}
      >
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export function LoreSectionTitle({
  children,
  isInView,
  delay = 0,
  className,
}: {
  children: ReactNode;
  isInView: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      className={cn('mb-4 border-l-2 border-[#4a5228] pl-4 text-[#d4cfc4]', className)}
      style={{
        fontFamily: "'Teko', sans-serif",
        fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
        fontWeight: 600,
        lineHeight: 1.05,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </motion.h3>
  );
}

type SplitGrid = Record<LoreFigureSpec['side'], string>;

export function LoreSplitColumns({
  side,
  mainColumn,
  figure,
  gridMap,
}: {
  side: LoreFigureSpec['side'];
  mainColumn: ReactNode;
  figure: ReactNode;
  gridMap: SplitGrid;
}) {
  const figureCell = (
    <div className="flex min-h-0 w-full min-w-0 flex-col lg:h-full lg:min-h-0">{figure}</div>
  );
  return (
    <div className={cn('grid gap-8 lg:items-stretch', gridMap[side])}>
      {side === 'left' ? (
        <>
          {figureCell}
          <div className="min-h-0 min-w-0">{mainColumn}</div>
        </>
      ) : (
        <>
          <div className="min-h-0 min-w-0">{mainColumn}</div>
          {figureCell}
        </>
      )}
    </div>
  );
}

export function splitFigureNode(
  split: LoreFigureSpec,
  baseDelay: number,
  sectionIndex: number,
): ReactNode {
  return (
    <LoreReportFigure
      src={split.src}
      alt={split.alt}
      caption={split.caption}
      aspectClass={split.aspectClass}
      fillColumn
      delay={baseDelay + 0.1}
      corruptedLoop={split.corruptedLoop !== false}
      staggerSeed={sectionIndex}
      className="min-h-0 min-w-0 max-lg:max-w-lg max-lg:self-center lg:max-w-none"
    />
  );
}
