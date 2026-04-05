import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Section } from '../Section';
import { FACTIONS_ANCHOR_ID } from './factionsAnchor';
import { FactionsCarroussel } from './FactionsCarroussel'
import { factions, type Faction } from './factions.config';

function FactionsNote({isInView, current}: {isInView: boolean, current: Faction}) {
  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 border-l-2 pl-4"
          style={{ borderColor: `${current.accentColor}66` }}
      >
          <p
          className="text-[#746f5c]"
          style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '13px',
          }}
          >
          L’adhésion à une faction est facultative. Les alliances temporaires et
          le jeu en solitaire restent possibles.
          </p>
      </motion.div>
  )
}

export function Factions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = factions[currentIndex]!;

  return (
    <Section id={FACTIONS_ANCHOR_ID} gridBackground={false} bgColor="#0a0a0a">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-6 w-1 origin-top"
              style={{ backgroundColor: current.accentColor }}
            />
            <span
              className="uppercase tracking-[0.2em] text-[#746f5c]"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '11px',
              }}
            >
              L'univers STALKER
            </span>
          </div>
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
            Les factions du jeu
          </h2>
        </motion.div>

        {/* // */}
        
        <FactionsCarroussel isInView={isInView} onChange={setCurrentIndex} />
        <FactionsNote isInView={isInView} current={current} />
       
      </div>
    </Section>
  );
}
