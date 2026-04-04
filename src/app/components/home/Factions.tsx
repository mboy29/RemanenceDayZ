import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';

export function Factions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const factions = [
    {
      name: 'Chernarussian Defense Forces',
      code: 'CDF',
      description: 'Remnants of the national military operating from secured zones. Focus on order, discipline, and territorial defense.',
      status: 'Active',
      members: '18'
    },
    {
      name: 'Russian Expeditionary Force',
      code: 'REF',
      description: 'Foreign military presence with superior equipment and tactical coordination. Known for aggressive expansion.',
      status: 'Active',
      members: '22'
    },
    {
      name: 'Independent Survivors',
      code: 'IND',
      description: 'Loose coalition of civilian survivors and ex-military. Flexible allegiances and guerrilla tactics.',
      status: 'Open',
      members: '15'
    }
  ];

  return (
    <Section title="Active Factions" description="Force Deployment" gridBackground={false} bgColor="#0a0a0a">
      <div ref={ref} className="space-y-8">
        <div className="space-y-1">
          {factions.map((faction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="border border-[#746f5c]/20 bg-[#1a1a16]/40 backdrop-blur-sm hover:bg-[#1a1a16]/60 transition-colors duration-300 group cursor-pointer"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left side - faction info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="border border-[#746f5c]/40 px-3 py-1 bg-[#0a0a0a]/60"
                      >
                        <span
                          className="text-[#4a5228] tracking-[0.15em]"
                          style={{ fontFamily: "'Teko', sans-serif", fontSize: '18px', fontWeight: 700 }}
                        >
                          {faction.code}
                        </span>
                      </motion.div>
                      <h3
                        className="text-[#d4cfc4] tracking-tight"
                        style={{ fontFamily: "'Teko', sans-serif", fontSize: '26px', fontWeight: 600, textTransform: 'uppercase' }}
                      >
                        {faction.name}
                      </h3>
                    </div>
                    <p
                      className="text-[#746f5c] leading-relaxed max-w-2xl"
                      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '14px' }}
                    >
                      {faction.description}
                    </p>
                  </div>

                  {/* Right side - stats */}
                  <div className="flex gap-6 md:items-end md:flex-col md:text-right">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    >
                      <div className="text-[#746f5c] mb-1 tracking-[0.1em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}>
                        Status
                      </div>
                      <div className="flex items-center gap-2 md:justify-end">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${faction.status === 'Open' ? 'bg-[#4a5228]' : 'bg-[#746f5c]'}`}
                        ></motion.div>
                        <span className="text-[#d4cfc4]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px', fontWeight: 500 }}>
                          {faction.status}
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                    >
                      <div className="text-[#746f5c] mb-1 tracking-[0.1em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}>
                        Members
                      </div>
                      <div className="text-[#d4cfc4]" style={{ fontFamily: "'Teko', sans-serif", fontSize: '24px', fontWeight: 600 }}>
                        {faction.members}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-l-2 border-[#4a5228]/40 pl-4"
        >
          <p className="text-[#746f5c]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}>
            Note: Faction membership is optional. Lone wolves and temporary alliances are permitted.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
