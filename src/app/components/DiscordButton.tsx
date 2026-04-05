/**
 * @file DiscordButton.tsx
 * @description Discord button component
 * @description Displays the Discord button.
 * @returns {React.ReactNode}
 * @param none
 */
import { motion } from 'framer-motion';
import { getDiscordInviteUrl } from '@/lib/server';
import { DiscordGlyph } from './DiscordGlyph';

/** Classes de base communes au bouton Discord. */
const DISCORD_CTA_BASE =
  'group relative inline-flex items-center justify-center overflow-hidden rounded-md border px-10 py-4 transition-colors duration-300';

/**
  * DiscordButton component
  * @description Displays the Discord button.
  * @returns {React.ReactNode}
  * @param none
  */
export function DiscordButton() {
  const discordUrl = getDiscordInviteUrl();

  const motionProps = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay: 1 },
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.98 },
    className: `${DISCORD_CTA_BASE} cursor-pointer border-[#5865F2]/70 bg-[#5865F2]/25 text-[#f2f3f5] backdrop-blur-sm hover:border-[#5865F2] hover:bg-[#5865F2]/40`,
  } as const;

  return (
    <motion.a
      href={discordUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
      aria-label="Rejoindre le serveur Discord"
    >
      <span
        className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#5865F2]/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[100%]"
        aria-hidden
      />
      <span
        className="relative uppercase tracking-[0.15em] flex items-center gap-2"
        style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '14px', fontWeight: 600 }}
      >
        <DiscordGlyph className="size-[15px] shrink-0" />
        Rejoins le serveur maintenant
      </span>
    </motion.a>
  );
}
