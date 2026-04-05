/**
 * @file Footer.tsx
 * @description Pied de page : CTA Discord, colonnes de liens, barre légale. Sous-composants et helpers isolés.
 */

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useMemo, useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import type { AppRouteEntry } from '@/app/routes/routes.config';
import { appRouteList } from '@/app/routes/routes.config';
import { DiscordButton } from './DiscordButton';
import { getDiscordInviteUrl, getServerName, isOnline } from '@/lib/server';0
import { DiscordGlyph } from './DiscordGlyph';

/** Routes affichées dans la colonne « Le site ». */
const FOOTER_SITE_ROUTE_IDS = ['home', 'lore', 'factions', 'dev-blog'] as const;

/**
 * @description Routes affichées dans la colonne « Le site ».
 * @returns {AppRouteEntry[]}
 * @param none
 */
function getFooterSiteLinks(): AppRouteEntry[] {
  const allowed = new Set<string>(FOOTER_SITE_ROUTE_IDS);
  return appRouteList.filter((r) => allowed.has(r.id));
}

/**
  * @description Nom affiché dans le copyright.
  * @returns {string}
  * @param none
  */
function getDisplayServerName(): string {
  return getServerName()?.trim() || 'Remanence';
}

/** Polices de caractères. */
const FONT_ROBOTO_CONDENSED = "'Roboto Condensed', sans-serif";
const FONT_TEKO = "'Teko', sans-serif";

/** Props pour les animations Framer Motion. */
type MotionInViewProps = {
  isInView: boolean;
};

/** 
  * FooterCtaBlock component
  * @description Bloc titre + textes + bouton principal Discord.
  * @returns {React.ReactNode}
  * @param isInView: boolean;
  */
function FooterCtaBlock({ isInView }: MotionInViewProps) {
  return (
    <div className="mb-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-6 tracking-tight text-[#d4cfc4]"
        style={{
          fontFamily: FONT_TEKO,
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        Rejoignez l&apos;aventure
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-4 max-w-2xl leading-relaxed text-[#8a8777]"
        style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '15px' }}
      >
        Annonces, entraide, recrutement, connexion au serveur et contact staff : tout se passe sur notre
        Discord. Le règlement complet reste disponible sur ce site, page dédiée.
      </motion.p>
      <DiscordButton />
    </div>
  );
}

/**
  * FooterColumn component
  * @description Colonnes de liens dans le footer.
  * @returns {React.ReactNode}
  * @param title: string;
  * @param isInView: boolean;
  * @param delay: number;
  * @param children: ReactNode;
  */
type FooterColumnProps = {
  title: string;
  isInView: boolean;
  delay: number;
  children: ReactNode;
};

/**
  * FooterColumn component
  * @description Colonnes de liens dans le footer.
  * @returns {React.ReactNode}
  * @param title: string;
  * @param isInView: boolean;
  * @param delay: number;
  * @param children: ReactNode;
  */
function FooterColumn({ title, isInView, delay, children }: FooterColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <div
        className="mb-3 uppercase tracking-[0.1em] text-[#746f5c]"
        style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '10px' }}
      >
        {title}
      </div>
      {children}
    </motion.div>
  );
}
/**
  * FooterCommunityColumn component
  * @description Colonnes de liens dans le footer.
  * @returns {React.ReactNode}
  * @param isInView: boolean;
  * @param discordUrl: string;
  */
function FooterCommunityColumn({ isInView, discordUrl }: MotionInViewProps & { discordUrl: string }) {
  return (
    <FooterColumn title="Communauté" isInView={isInView} delay={0.7}>
      <p
        className="mb-3 text-[#8a8777]"
        style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '13px', lineHeight: 1.5 }}
      >
        Le Discord est le point central : questions, signalements et actualités.
      </p>
      {discordUrl ? (
        <motion.a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-2 text-[#8a8777] transition-colors hover:text-[#d4cfc4]"
          style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '13px' }}
        >
          <DiscordGlyph className="size-[15px] shrink-0" />
          Ouvrir Discord
        </motion.a>
      ) : (
        <span className="text-[#746f5c]" style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '12px' }}>
          Lien Discord à configurer (.env)
        </span>
      )}
    </FooterColumn>
  );
}

/**
  * FooterRulesColumn component
  * @description Colonnes de liens dans le footer.
  * @returns {React.ReactNode}
  * @param isInView: boolean;
  */
function FooterRulesColumn({ isInView }: MotionInViewProps) {
  return (
    <FooterColumn title="Règles du serveur" isInView={isInView} delay={0.78}>
      <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
        <Link
          to="/regles"
          className="block text-[#8a8777] transition-colors hover:text-[#d4cfc4]"
          style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '13px' }}
        >
          Règlement officiel
        </Link>
      </motion.div>
    </FooterColumn>
  );
}

/**
  * FooterSiteColumn component
  * @description Colonnes de liens dans le footer.
  * @returns {React.ReactNode}
  * @param isInView: boolean;
  * @param links: AppRouteEntry[];
  */
function FooterSiteColumn({ isInView, links }: MotionInViewProps & { links: AppRouteEntry[] }) {
  return (
    <FooterColumn title="Le site" isInView={isInView} delay={0.86}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {links.map((route) => (
          <motion.div key={route.id} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <Link
              to={route.href}
              className="block text-[#8a8777] transition-colors hover:text-[#d4cfc4]"
              style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '13px' }}
            >
              {route.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </FooterColumn>
  );
}

/**
  * FooterLegalBar component
  * @description Barre légale dans le footer.
  * @returns {React.ReactNode}
  * @param isInView: boolean;
  * @param serverName: string;
  * @param online: boolean;
  */
function FooterLegalBar({
  isInView,
  serverName,
  online,
}: MotionInViewProps & { serverName: string; online: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex flex-col gap-4 border-t border-[#746f5c]/10 pt-6 md:flex-row md:items-center md:justify-between"
    >
      <div className="text-[#746f5c]" style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '12px' }}>
        © {new Date().getFullYear()} {serverName}. Non affilié à Bohemia Interactive a.s.
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${online ? 'animate-pulse bg-[#4a5228]' : 'bg-[#746f5c]'}`}
        />
        <span className="text-[#746f5c]" style={{ fontFamily: FONT_ROBOTO_CONDENSED, fontSize: '12px' }}>
          {online ? 'Serveur : en ligne' : 'Serveur : indisponible'}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Footer component
 * @description Pied de page.
 * @returns {React.ReactNode}
 * @param none
 */
export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const discordUrl = useMemo(() => getDiscordInviteUrl(), []);
  const siteLinks = useMemo(() => getFooterSiteLinks(), []);
  const serverName = useMemo(() => getDisplayServerName(), []);
  const online = isOnline();

  return (
    <footer ref={ref} className="relative border-t border-[#746f5c]/20 bg-[#0a0a0a] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <FooterCtaBlock isInView={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-[#746f5c]/20 pt-8"
        >
          <div className="mb-8 grid gap-8 md:grid-cols-3">
            <FooterCommunityColumn isInView={isInView} discordUrl={discordUrl} />
            <FooterRulesColumn isInView={isInView} />
            <FooterSiteColumn isInView={isInView} links={siteLinks} />
          </div>

          <FooterLegalBar isInView={isInView} serverName={serverName} online={online} />
        </motion.div>
      </div>
    </footer>
  );
}
