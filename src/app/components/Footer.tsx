import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} className="py-20 px-6 bg-[#0a0a0a] relative border-t border-[#746f5c]/20">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#d4cfc4] mb-6 tracking-tight"
            style={{
              fontFamily: "'Teko', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1,
              textTransform: 'uppercase'
            }}
          >
            Join The Fight
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8a8777] mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
          >
            Server access is unrestricted. Copy the IP address and connect through your DayZ client.
            No whitelist. No application. Just pure survival.
          </motion.p>

          {/* Connection card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="inline-block border border-[#746f5c]/40 bg-[#1a1a16]/60 backdrop-blur-sm p-8 max-w-lg"
          >
            <div className="text-[#746f5c] mb-2 tracking-[0.1em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}>
              Server Address
            </div>
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#d4cfc4] mb-6 tracking-wider"
              style={{ fontFamily: "'Teko', sans-serif", fontSize: '32px', fontWeight: 600 }}
            >
              192.168.1.100:2302
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-4 border border-[#4a5228]/60 bg-[#4a5228]/10 hover:bg-[#4a5228]/20 transition-all duration-300 overflow-hidden w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a5228]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative text-[#d4cfc4] tracking-[0.15em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '14px', fontWeight: 600 }}>
                Copy IP Address
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-[#746f5c]/20 pt-8"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                title: 'Community',
                links: ['Discord Server', 'Steam Group', 'Wiki & Guides']
              },
              {
                title: 'Server Rules',
                links: ['Code of Conduct', 'Base Building Guidelines', 'Faction Regulations']
              },
              {
                title: 'Support',
                links: ['Report Player', 'Technical Issues', 'Contact Admin']
              }
            ].map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + sectionIndex * 0.1 }}
              >
                <div className="text-[#746f5c] mb-3 tracking-[0.1em] uppercase" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px' }}>
                  {section.title}
                </div>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.a
                      key={linkIndex}
                      href="#"
                      whileHover={{ x: 4 }}
                      className="block text-[#8a8777] hover:text-[#d4cfc4] transition-colors"
                      style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-[#746f5c]/10"
          >
            <div className="text-[#746f5c]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '12px' }}>
              © 2026 Operation Chernarus. Not affiliated with Bohemia Interactive.
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4a5228] rounded-full animate-pulse"></div>
              <span className="text-[#746f5c]" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '12px' }}>
                Server Status: Online
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
