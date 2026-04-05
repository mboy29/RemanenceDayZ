/**
 * @file Section.tsx
 * @description Bloc `<section>` réutilisable : en-tête optionnel (titre + ligne d’accroche), grille de fond, conteneur `max-w-6xl`.
 */

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from './ui/utils';

/**
 * @param title - Titre Teko (optionnel).
 * @param description - Petite ligne uppercase au-dessus du titre (optionnel).
 * @param children - Contenu principal sous l’en-tête.
 * @param gridBackground - Affiche la grille subtile en fond.
 * @param bgColor - Couleur de fond CSS (hex).
 * @param id - `id` HTML pour ancres / `scroll-margin`.
 * @param ariaLabelledBy - `id` d’un titre visible pour `aria-labelledby` sur `<section>`.
 * @returns {JSX.Element} Section stylée du site.
 */
export function Section({
  title,
  description,
  children,
  gridBackground = true,
  bgColor = '#0a0a0a',
  id,
  ariaLabelledBy,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  gridBackground?: boolean;
  bgColor?: string;
  id?: string;
  /** `id` du titre visible pour le landmark `<section>` (accessibilité). */
  ariaLabelledBy?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const showHeader = Boolean(title?.trim()) || Boolean(description?.trim());

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={ariaLabelledBy}
      className={cn('relative px-6 py-20', id && 'scroll-mt-[4.75rem]')}
      style={{ backgroundColor: bgColor }}
    >
      {gridBackground ? (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(#746f5c 1px, transparent 1px), linear-gradient(90deg, #746f5c 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      ) : null}
      <div className="relative z-10 mx-auto max-w-6xl">
        {showHeader ? (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {description?.trim() ? (
              <div className="mb-3 flex items-center gap-3">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="h-6 w-1 origin-top bg-[#4a5228]"
                />
                <span
                  className="uppercase tracking-[0.2em] text-[#746f5c]"
                  style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                    fontSize: '11px',
                  }}
                >
                  {description}
                </span>
              </div>
            ) : null}
            {title?.trim() ? (
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
                {title}
              </h2>
            ) : null}
          </motion.div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
