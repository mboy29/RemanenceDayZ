/**
 * @file HomeFeatures.tsx
 * @description HomeFeatures component
 * @description Displays the features of the game
 * @returns {React.ReactNode}
 * @param None
 */
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';
import { features } from './features.config';

/**
 * @function HomeFeatures
 * @description Displays the features of the game on the home page
 * @returns {React.ReactNode}
 * @param None
 */
export function HomeFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section title="Réalités de la Zone" description="Ce que tu vas affronter" gridBackground={false} bgColor='#0f0f0d'>
      <div ref={ref} className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="border border-[#746f5c]/20 bg-[#1a1a16]/60 p-6 hover:bg-[#1a1a16] transition-colors duration-300 relative group cursor-pointer"
            >
              {/* Corner accents */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#4a5228]/40 group-hover:border-[#4a5228] transition-colors duration-300"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#4a5228]/40 group-hover:border-[#4a5228] transition-colors duration-300"
              ></motion.div>

              {/* Icon number */}
              <div className="mb-4 flex items-center justify-between">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-[#4a5228]/40 group-hover:text-[#4a5228]/60 transition-colors duration-300"
                  style={{ fontFamily: "'Teko', sans-serif", fontSize: '40px', fontWeight: 700, lineHeight: 1 }}
                >
                  {feature.icon}
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                  className="w-8 h-px bg-[#746f5c]/20 origin-left"
                ></motion.div>
              </div>

              {/* Content */}
              <h3
                className="text-[#d4cfc4] mb-2 tracking-tight"
                style={{ fontFamily: "'Teko', sans-serif", fontSize: '22px', fontWeight: 600, textTransform: 'uppercase' }}
              >
                {feature.label}
              </h3>
              <p
                className="text-[#746f5c] leading-relaxed"
                style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
      </div>
    </Section>
  );
}
