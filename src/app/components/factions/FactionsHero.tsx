import { motion } from 'framer-motion';
import { HeroBackground } from '../HeroSection';
import { getServerName } from '@/lib/server';
import { ChevronDown } from 'lucide-react';
import { FACTIONS_ANCHOR_ID } from './factionsAnchor';

function scrollToRulesContent() {
  document.getElementById(FACTIONS_ANCHOR_ID)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

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
      Règlement Officiel du Serveur
    </motion.h1>
  )
}

function HeroSubtitle() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-[#8a8777] max-w-2xl mx-auto mb-8 leading-relaxed"
      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
    >
      Bienvenue sur notre serveur Rémanence !
      <br /> Pour garantir une expérience agréable, immersive et équitable à tous, merci de lire attentivement ce règlement et de le respecter. Le non-respect pourra entraîner avertissements, sanctions temporaires ou bannissement définitif.
    </motion.p>
  )
}

function HeroCTAButton() {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={scrollToRulesContent}
      className="group relative cursor-pointer overflow-hidden border border-[#746f5c]/40 bg-[#1a1a16]/60 px-8 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-[#4a5228]/20"
      aria-label="Aller au règlement"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a5228]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      <span className="flex flex-row items-center gap-2 relative text-[#d4cfc4] tracking-[0.15em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px', fontWeight: 600 }}>
        Lire le règlement
        <ChevronDown size={20} />
      </span>
    </motion.button>
  )
}

export function FactionsHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground imageUrl="/images/rules-hero-bg.jpg" imageAlt="Foggy forest" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <HeroServerName />
        <HeroTitle />
        <HeroSubtitle />
        <HeroCTAButton />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-5"></div>
    </section>
  );
}
