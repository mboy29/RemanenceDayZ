import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Section } from '../Section';

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1638766863830-4874a3b8031c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Abandoned military checkpoint'
    },
    {
      url: 'https://images.unsplash.com/photo-1638766850873-861bc0aa8c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Fortified base compound'
    },
    {
      url: 'https://images.unsplash.com/photo-1637594439866-65588ebb798f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Tactical squad operation'
    },
    {
      url: 'https://images.unsplash.com/photo-1639175385752-31b4b8525d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Dense forest terrain'
    }
  ];

  return (
    <Section title="Field Reports" description="Visual Intel" gridBackground={false} bgColor='#0f0f0d'>
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group overflow-hidden border border-[#746f5c]/20 bg-black aspect-[4/3] cursor-pointer"
            >
              <motion.img
                src={image.url}
                alt={image.caption}
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                  opacity: hoveredIndex === index ? 0.9 : 0.7
                }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Caption */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#746f5c]/20 bg-[#0a0a0a]/60 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? [1, 1.5, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-1 h-1 bg-[#4a5228]"
                  ></motion.div>
                  <span
                    className="text-[#8a8777] uppercase tracking-[0.1em]"
                    style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px' }}
                  >
                    {image.caption}
                  </span>
                </div>
              </motion.div>

              {/* Corner markers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#746f5c]/40"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#746f5c]/40"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#746f5c]/40"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#746f5c]/40"
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
