import { motion, useInView } from 'framer-motion';
import { ChevronRight, Lock } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { appRouteList } from '@/app/routes/routes.config';
import { Section } from '../Section';

const FONT_BODY = "'Roboto Condensed', sans-serif";

function getLoreRoute() {
  return appRouteList.find((r) => r.id === 'lore') ?? { href: '/lore' as const, title: 'Lore' };
}

export function HomeLore() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const lore = getLoreRoute();

  return (
    <Section
      id="home-lore"
      description="Le lore est sous scellé"
      title="Classified Report"
      ariaLabelledBy="home-lore-heading"
    >
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto w-full"
        >
          <div className="relative overflow-hidden border border-[#8b4040]/45 bg-[#120a0a]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1] bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(139,64,64,0.4)_4px,rgba(139,64,64,0.4)_5px)]"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b45309]/45 to-transparent"
              aria-hidden
            />

            <div className="relative grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-[#8b4040]/20 px-6 py-8 md:border-b-0 md:border-r md:border-r-[#8b4040]/20 md:px-8 md:py-10">
                <p
                  id="home-lore-heading"
                  className="mb-3 tracking-[0.16em] uppercase text-[#c49a8e]"
                  style={{ fontFamily: FONT_BODY, fontSize: '11px' }}
                >
                  Archive scellée
                </p>

                <h3
                  className="mb-4 text-[#e8e4dc]"
                  style={{ fontFamily: FONT_BODY, fontSize: '24px', fontWeight: 600, lineHeight: 1.1 }}
                >
                  Certains rapports n’ont jamais été destinés à être consultés publiquement.
                </h3>

                <p
                  className="mb-4 max-w-xl text-[#8a8777] leading-relaxed"
                  style={{ fontFamily: FONT_BODY, fontSize: '14px' }}
                >
                  Les fragments disponibles évoquent un incident survenu au nord de la Zone, ainsi qu’un
                  phénomène encore mal compris. Le contenu intégral du dossier reste verrouillé et n’est
                  accessible que depuis l’espace dédié aux archives.
                </p>

                <p
                  className="max-w-xl text-[#746f5c] leading-relaxed"
                  style={{ fontFamily: FONT_BODY, fontSize: '12px' }}
                >
                  Notes internes, observations de terrain, hypothèses scientifiques et documents classifiés
                  y sont regroupés sous accès restreint.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-5 px-6 py-8 sm:px-10 md:py-10">
                <div className="flex items-center gap-2 text-[#c49a8e]">
                  <Lock className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                  <span
                    className="tracking-[0.18em] uppercase"
                    style={{ fontFamily: FONT_BODY, fontSize: '10px' }}
                  >
                    Accès non autorisé — niveau confidentiel
                  </span>
                </div>

                <p
                  className="max-w-sm text-center text-[#746f5c]"
                  style={{ fontFamily: FONT_BODY, fontSize: '12px' }}
                >
                  Pour consulter l’intégralité du dossier, vous devez forcer l’accès aux archives.
                </p>

                <Link
                  to={lore.href}
                  className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden border border-[#8b4040]/55 bg-[#1a0f0f]/90 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[#b45309]/65 hover:bg-[#221010]/95 hover:shadow-[0_0_28px_-6px_rgba(180,83,9,0.35)]"
                  aria-label={`Ouvrir la page ${lore.title}`}
                >
                  <span
                    className="tracking-[0.14em] uppercase text-[#e8e4dc]"
                    style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: 600 }}
                  >
                    Forcer l'accès aux archives
                  </span>
                  <ChevronRight
                    className="h-4 w-4 text-[#d4cfc4] transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}