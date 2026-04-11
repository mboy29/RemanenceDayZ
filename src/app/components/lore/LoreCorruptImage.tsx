'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../ui/utils';

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Phase = 'idle' | 'loading' | 'error' | 'retry' | 'stable' | 'glitch' | 'corrupt';

function corruptOffsets(seed: number) {
  const u = (seed * 2654435761 + 0x811c9dc5) >>> 0;
  return {
    preRoll: (u % 21) * 210 + (u % 14) * 88,
    load: (u % 8) * 78,
    err: (u % 9) * 68,
    retry: (u % 7) * 62,
    loop: (u % 17) * 380 + (u % 11) * 220,
    corruptMs: (u % 6) * 52,
    glitchHold: (u % 5) * 36,
  };
}

type LoreCorruptImageProps = {
  src: string;
  alt: string;
  className?: string;
  active: boolean;
  staggerSeed?: number;
};

export function LoreCorruptImage({
  src,
  alt,
  className,
  active,
  staggerSeed = 0,
}: LoreCorruptImageProps) {
  const uid = useId().replace(/:/g, '');
  const [phase, setPhase] = useState<Phase>('idle');
  const cancelled = useRef(false);
  const errChecksum = useMemo(
    () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0'),
    [],
  );

  useEffect(() => {
    cancelled.current = false;
    if (!active) {
      setPhase('idle');
      return;
    }

    const o = corruptOffsets(staggerSeed);

    const runSequence = async () => {
      await delay(o.preRoll);
      if (cancelled.current) return;
      setPhase('loading');
      await delay(1100 + Math.random() * 450 + o.load);
      if (cancelled.current) return;
      setPhase('error');
      await delay(1500 + Math.random() * 550 + o.err);
      if (cancelled.current) return;
      setPhase('retry');
      await delay(900 + Math.random() * 400 + o.retry);
      if (cancelled.current) return;
      setPhase('stable');

      while (!cancelled.current) {
        await delay(5200 + Math.random() * 6500 + o.loop);
        if (cancelled.current) return;
        setPhase('glitch');
        await delay(780 + Math.random() * 280 + o.glitchHold);
        if (cancelled.current) return;
        if (Math.random() > 0.45) {
          setPhase('corrupt');
          await delay(320 + Math.random() * 380 + o.corruptMs);
          if (cancelled.current) return;
        }
        setPhase('stable');
      }
    };

    runSequence();
    return () => {
      cancelled.current = true;
    };
  }, [active, staggerSeed]);

  const showImage = phase === 'stable' || phase === 'glitch';
  const imgVisible = phase === 'stable' || phase === 'glitch';

  return (
    <>
      <style>{`
        @keyframes corrupt-scan-${uid} {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(100%); opacity: 0.12; }
        }
        @keyframes corrupt-noise-${uid} {
          0%, 100% { opacity: 0.32; }
          50% { opacity: 0.58; }
        }
        @keyframes corrupt-glitch-${uid} {
          0% { transform: translate(0); filter: none; clip-path: inset(0 0 0 0); }
          8% { transform: translate(-4px, 3px) skew(-2.5deg); filter: hue-rotate(72deg) saturate(2); }
          18% { transform: translate(5px, -2px); clip-path: inset(12% 0 35% 0); }
          32% { transform: translate(-3px, 4px); filter: hue-rotate(-40deg) contrast(1.45); }
          48% { transform: translate(2px, -3px); clip-path: inset(40% 0 8% 0); }
          62% { transform: translate(-5px, 1px) skew(1.5deg); filter: hue-rotate(110deg); }
          78% { transform: translate(3px, 2px); clip-path: inset(22% 0 18% 0); }
          100% { transform: translate(0); filter: none; clip-path: inset(0 0 0 0); }
        }
        @keyframes corrupt-flicker-${uid} {
          0%, 100% { opacity: 1; }
          5% { opacity: 0.82; }
          10% { opacity: 0.25; }
          16% { opacity: 0.92; }
          28% { opacity: 0.55; }
          42% { opacity: 0.88; }
          55% { opacity: 0.68; }
        }
      `}</style>
      <div className={cn('relative h-full w-full min-h-[120px] overflow-hidden bg-[#050505]', className)}>
        {phase === 'idle' && <div className="absolute inset-0 z-10 bg-[#080807]" aria-hidden />}

        {(phase === 'loading' || phase === 'retry') && (
          <div
            className="absolute inset-0 z-20 bg-gradient-to-b from-[#1a1814] to-black"
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(74,82,40,0.12) 2px, rgba(74,82,40,0.12) 4px)',
              }}
            />
            <div
              className="absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-[#4a5228]/20 to-transparent"
              style={{ animation: `corrupt-scan-${uid} 3.2s linear infinite` }}
            />
            <p className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#746f5c]">
              {phase === 'retry' ? 'Réessai décodage…' : 'Chargement du fragment…'}
            </p>
          </div>
        )}

        {phase === 'error' && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black px-3"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, #3a1515 0px, #1a0505 1px, #2a1010 2px, transparent 3px)',
                opacity: 0.85,
                animation: `corrupt-noise-${uid} 0.72s steps(2) infinite`,
              }}
            />
            <p className="relative z-10 mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#c45c5c]">
              Échec décodage
            </p>
            <p className="relative z-10 max-w-[90%] text-center font-mono text-[9px] leading-relaxed text-[#8a6a6a]">
              Flux image corrompu (checksum 0x{errChecksum})
            </p>
          </div>
        )}

        {showImage && (
          <div
            className={cn('absolute inset-0', phase === 'glitch' && `corruption-glitch-${uid}`)}
            style={
              phase === 'glitch'
                ? { animation: `corrupt-glitch-${uid} 0.75s steps(1) forwards` }
                : undefined
            }
          >
            <img
              src={src}
              alt={alt}
              className={cn(
                'h-full w-full object-cover object-center',
                !imgVisible && 'opacity-0',
                phase === 'stable' && 'opacity-90',
                phase === 'glitch' && 'opacity-95',
              )}
              style={
                phase === 'glitch'
                  ? { animation: `corrupt-flicker-${uid} 0.75s steps(1) infinite` }
                  : undefined
              }
            />
            {phase === 'glitch' && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-color-dodge"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,0,0,0.12), transparent 40%, rgba(0,255,255,0.1))',
                    transform: 'translateX(3px)',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.03) 2px 4px)',
                  }}
                />
              </>
            )}
          </div>
        )}

        {phase === 'corrupt' && (
          <div
            className="absolute inset-0 z-30 bg-[#0a0808]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #1a1010 0px, #0a0505 1px, #2a1515 2px, #080404 3px)',
              animation: `corrupt-noise-${uid} 0.12s steps(2) infinite`,
            }}
            aria-hidden
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-[#4a5228]/50" />
        <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-[#4a5228]/50" />
      </div>
    </>
  );
}
