/**
 * @file HomeHero.tsx
 * @description HomeHero component
 * @description Displays the server name, title, subtitle, server status, connection info and CTA button.
 * @returns {React.ReactNode}
 * @param none
 */

import { motion } from 'framer-motion'
import { HeroBackground } from '../HeroSection';
import { getServerName, getServerAddress, isOnline, getActivePlayers, getServerState } from '@/lib/server';

/** 
  * HeroServerName component
  * @description Displays the server name.
  * @returns {React.ReactNode}
  * @param none
  */
function HeroServerName() {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="inline-block border border-[#746f5c]/40 px-4 py-1.5 mb-6 backdrop-blur-sm bg-black/20"
    >
      <span className="text-[#8a8777] tracking-[0.2em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px', letterSpacing: '0.2em' }}>
        {getServerName()}
      </span>
    </motion.div>
  )
}

/**
  * HeroTitle component
  * @description Displays the title.
  * @returns {React.ReactNode}
  * @param none
  */
function HeroTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-4 tracking-tight text-[#d4cfc4]"
      style={{
        fontFamily: "'Teko', sans-serif",
        fontSize: 'clamp(3rem, 10vw, 7rem)',
        fontWeight: 600,
        lineHeight: 0.95,
        textTransform: 'uppercase',
        letterSpacing: '0.02em'
      }}
    >
      Survivre.<br />S’adapter.<br />Résister.
    </motion.h1>
  )
}

/**
  * HeroSubtitle component
  * @description Displays the subtitle.
  * @returns {React.ReactNode}
  * @param none
  */
function HeroSubtitle() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-[#8a8777] max-w-2xl mx-auto mb-8 leading-relaxed"
      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
    >
      Serveur français pur, sans limite de joueurs.
      <br />Aucune règle. Aucune pitié. Seulement la survie.
    </motion.p>
  )
}

/**
  * HeroConnectionInfo component
  * @description Displays the server address.
  * @returns {React.ReactNode}
  * @param none
  */
function HeroConnectionInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="mt-6 text-[#746f5c]"
      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '12px' }}
    >
      IP: {getServerAddress()}
    </motion.div>
  )
}

/**
  * HeroServerStatus component
  * @description Displays the server status, number of players online and server state.
  * @returns {React.ReactNode}
  * @param none
  */
function HeroServerStatus() {
  let serverStatus = isOnline() ? 'ONLINE' : 'OFFLINE';
  let serverState = getServerState() || 'BETA';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex items-center justify-center gap-6 mb-10"
    >
      <div className="flex items-center gap-2">
        {serverStatus === 'ONLINE' ? (
          <div className="w-2 h-2 bg-[#4a5228] rounded-full animate-pulse"></div>
        ) : (
          <div className="w-2 h-2 bg-[#ff0000] rounded-full animate-pulse"></div>
        )}
        <span className="text-[#8a8777]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}>{serverStatus.toUpperCase()}</span>
      </div>
      <div className="h-4 w-px bg-[#746f5c]/30"></div>
      <span className="text-[#8a8777]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}>{getActivePlayers()} joueurs en ligne</span>
      <div className="h-4 w-px bg-[#746f5c]/30"></div>
      <span className="text-[#8a8777]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}>24h/24 7j/7</span>
      <div className="h-4 w-px bg-[#746f5c]/30"></div>
      <span className="text-[#8a8777]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}>{serverState.toUpperCase()}</span>
    </motion.div>
  )
}

/**
  * HeroCTAButton component
  * @description Displays the CTA button.
  * @returns {React.ReactNode}
  * @param none
  */
function HeroCTAButton() {
  return (
      <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative px-8 py-3 border border-[#746f5c]/40 bg-[#1a1a16]/60 backdrop-blur-sm hover:bg-[#4a5228]/20 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a5228]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <span className="relative text-[#d4cfc4] tracking-[0.15em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px', fontWeight: 600 }}>
        Rejoins le serveur maintenant
      </span>
    </motion.button>
  )
}

/**  
  * HomeHero component
  * @description Displays the server name, title, subtitle, server status, connection info and CTA button.
  * @returns {React.ReactNode}
  * @param none
  */
export function HomeHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground imageUrl="/images/home-hero-bg.jpg" imageAlt="Foggy forest" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <HeroServerName />
        <HeroTitle />
        <HeroSubtitle />
        <HeroServerStatus />
        <HeroCTAButton />
        <HeroConnectionInfo />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-5"></div>
    </section>
  );
}
