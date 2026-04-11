import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../ui/utils';
import { LoreCorruptImage } from './LoreCorruptImage';

const FALLBACK_IMAGES = [
  '/images/lore/carroussel/item1.jpeg',
  '/images/lore/carroussel/item2.jpeg',
  '/images/lore/carroussel/item3.jpeg',
];

const INTERVAL_MS = 6000;

type Manifest = { images: string[] };

/**
 * Carrousel d’images depuis `/images/lore/carroussel/manifest.json` (script `carousel:sync`).
 */
export function LoreImageCarousel({
  isInView,
  className,
  /** Cadre vert épais ; désactiver quand le parent est déjà un `<figure>` type LoreFigure. */
  showFrame = true,
}: {
  isInView: boolean;
  className?: string;
  showFrame?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/images/lore/carroussel/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<Manifest>;
      })
      .then((d) => {
        const list = Array.isArray(d.images) ? d.images.filter(Boolean) : [];
        setUrls(list.length > 0 ? list : FALLBACK_IMAGES);
      })
      .catch(() => setUrls(FALLBACK_IMAGES));
  }, []);

  useEffect(() => {
    if (!isInView || urls.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % urls.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [isInView, urls]);

  if (urls.length === 0) return null;

  const src = urls[index % urls.length];

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        showFrame &&
          'rounded-sm border-2 border-[#4a5228]/35 bg-black/40',
        !showFrame && 'bg-black/30',
        'aspect-[21/9] max-h-[min(40vh,22rem)] w-full',
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LoreCorruptImage
            src={src}
            alt={`Séquence visuelle ${(index % urls.length) + 1} — fragment d’archive`}
            className="absolute inset-0 h-full min-h-[8rem] w-full"
            active={isInView}
            staggerSeed={index * 7 + (src.length % 13)}
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute bottom-2 right-2 z-[40] flex gap-1">
        {urls.map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-1 w-4 rounded-full transition-colors',
              i === index % urls.length ? 'bg-[#4a5228]' : 'bg-[#746f5c]/35',
            )}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
