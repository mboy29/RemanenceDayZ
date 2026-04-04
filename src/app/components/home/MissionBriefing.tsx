import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';

/** Left column - description (parameters: isInView) */
function MissionBriefingLeftColumn({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      <p className="text-[#8a8777] leading-relaxed" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}>
        Welcome to one of the most hardcore DayZ experiences available. Our server focuses on realistic military simulation, faction warfare, and unforgiving survival mechanics.
      </p>
      <p className="text-[#8a8777] leading-relaxed" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}>
        Set in the devastated landscape of Chernarus, players must navigate through abandoned military installations, resource-scarce towns, and hostile territories controlled by rival factions.
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
            <p className="text-[#d4cfc4] mb-1" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '14px', fontWeight: 500 }}>
              Persistent World
            </p>
            <p className="text-[#746f5c]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}>
              Your actions have lasting consequences
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Right column - stats (parameters: isInView) */
function MissionBriefingRightColumn({ isInView }: { isInView: boolean }) {
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
          { label: 'Map', value: 'Chernarus+' },
          { label: 'Max Players', value: '60' },
          { label: 'Difficulty', value: 'Hardcore' },
          { label: 'Perspective', value: '1st Person' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          >
            <div className="text-[#746f5c] mb-1 tracking-[0.1em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}>
              {stat.label}
            </div>
            <div className="text-[#d4cfc4]" style={{ fontFamily: "'Teko', sans-serif", fontSize: '24px', fontWeight: 600 }}>
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
        <div className="text-[#746f5c] mb-2 tracking-[0.1em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}>
          Server Modifications
        </div>
        <div className="space-y-1">
          {['Advanced Weapon System', 'Base Building+', 'Faction Territories', 'Realistic Ballistics'].map((mod, index) => (
            <motion.div
              key={mod}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-1 h-1 bg-[#746f5c]"></div>
              <span className="text-[#8a8777]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '12px' }}>
                {mod}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Main Mission Briefing Component */
export function MissionBriefing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <Section title="Mission Briefing" description="Server Overview">
      <div ref={ref} className="grid gap-8 md:grid-cols-2">
        <MissionBriefingLeftColumn isInView={isInView} />
        <MissionBriefingRightColumn isInView={isInView} />
      </div>
    </Section>
  );
}
