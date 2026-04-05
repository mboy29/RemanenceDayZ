/**
 * @file HomeBrief.tsx
 * @description HomeBrief component
 * @description Displays the mission briefing of the game
 * @returns {React.ReactNode}
 * @param None
 */

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';

/**
 * @function HomeBriefLeftColumn
 * @description Displays the left column of the mission briefing
 * @returns {React.ReactNode}
 * @param isInView: boolean;
 */
function HomeBriefLeftColumn({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      <p
        className="text-[#8a8777] leading-relaxed"
        style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
      >
        Nous sommes en 2013. Un an avant que certains noms ne deviennent des légendes, la Zone s’est déjà refermée sur ceux qui ont cru pouvoir la comprendre. Depuis Prypiat, quelque chose a changé. Pas une guerre. Pas une explosion ordinaire. Un souffle invisible, une fracture silencieuse, qui a laissé derrière elle plus de questions que de cadavres.
      </p>

      <p
        className="text-[#8a8777] leading-relaxed"
        style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
      >
        Ici, tu ne traverses pas seulement un territoire hostile. Tu avances dans un lieu qui garde des traces, des voix, des visages, des instants qui auraient dû disparaître. Certains parlent de la Rémanence. D’autres préfèrent ne pas lui donner de nom. Toi, tu apprendras surtout une chose : dans la Zone, ce que tu vois n’est pas toujours vivant… et ce qui te parle n’est pas toujours réel.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-4 border-t border-[#746f5c]/20"
      >
        <div className="flex items-start gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="w-5 h-5 border border-[#746f5c]/40 flex items-center justify-center mt-0.5"
          >
            <span className="text-[#4a5228]" style={{ fontSize: '10px' }}>✓</span>
          </motion.div>

          <div>
            <p
              className="text-[#d4cfc4] mb-1"
              style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '14px', fontWeight: 500 }}
            >
              Réalité instable
            </p>
            <p
              className="text-[#746f5c]"
              style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}
            >
              Dans la Zone, les souvenirs persistent, les certitudes meurent, et le doute fait partie du terrain.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * @function HomeBriefRightColumn
 * @description Displays the right column of the mission briefing
 * @returns {React.ReactNode}
 * @param isInView: boolean;
 */
function HomeBriefRightColumn({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="border border-[#746f5c]/20 bg-[#1a1a16]/40 backdrop-blur-sm p-6"
    >
      <div className="grid grid-cols-2 gap-6">
        {[
          { label: 'Temporalité', value: '2013' },
          { label: 'Cadre', value: 'Lore STALKER' },
          { label: 'Approche', value: 'RP immersif' },
          { label: 'Map', value: 'Exclusion Zone' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          >
            <div
              className="text-[#746f5c] mb-1 tracking-[0.1em] uppercase"
              style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}
            >
              {stat.label}
            </div>
            <div
              className="text-[#d4cfc4]"
              style={{ fontFamily: "'Teko', sans-serif", fontSize: '24px', fontWeight: 600 }}
            >
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 pt-6 border-t border-[#746f5c]/20 origin-left"
      >
        <div
          className="text-[#746f5c] mb-2 tracking-[0.1em] uppercase"
          style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}
        >
          Repères de terrain
        </div>

        <div className="space-y-1">
          {[
            'Une Zone fidèle à l’univers STALKER',
            'Une liberté narrative pensée pour le RP',
            'Des phénomènes mémoriels inexpliqués',
            'Un doute constant entre survie et illusion'
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-1 h-1 bg-[#746f5c]"></div>
              <span
                className="text-[#8a8777]"
                style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '12px' }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * @function HomeBrief
 * @description Displays the mission briefing of the game
 * @returns {React.ReactNode}
 * @param None
 */
export function HomeBrief() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section title="Briefing de zone" description="Contexte opérationnel">
      <div ref={ref} className="grid gap-8 md:grid-cols-2">
        <HomeBriefLeftColumn isInView={isInView} />
        <HomeBriefRightColumn isInView={isInView} />
      </div>
    </Section>
  );
}