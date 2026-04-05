/**
 * @file FactionSharedChrome.tsx
 * @description Calques visuels réutilisables (fond image, dégradé, coins, diagonales, emblème) pour carrousel Factions et cartes accueil.
 */

import { accentGradient, type FactionGradientPreset } from '@/lib/factionVisuals';

/**
 * @param imageUrl - URL du visuel de fond.
 * @param opacity - Opacité du calque (0–1).
 * @param className - Classes Tailwind supplémentaires (ex. hover scale).
 * @param ariaHidden - Si `true`, masque le calque aux technologies d’assistance.
 * @returns {JSX.Element} Div `absolute inset-0` en `bg-cover`.
 */
export function FactionBackdropImage({
  imageUrl,
  opacity = 0.15,
  className = '',
  ariaHidden,
}: {
  imageUrl: string;
  opacity?: number;
  className?: string;
  /** Décoratif : masquer aux lecteurs d’écran si défini. */
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-center ${className}`.trim()}
      style={{
        backgroundImage: `url(${imageUrl})`,
        opacity,
      }}
      {...(ariaHidden === true ? { 'aria-hidden': true } : {})}
    />
  );
}

/**
 * @param accentColor - Couleur d’accent faction (hex).
 * @param preset - Variante de dégradé (`carousel` ou `card`).
 * @returns {JSX.Element} Calque dégradé plein écran.
 */
export function FactionBackdropGradient({
  accentColor,
  preset = 'carousel',
}: {
  accentColor: string;
  preset?: FactionGradientPreset;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: accentGradient(accentColor, preset) }}
    />
  );
}

/** Taille des coins décoratifs (`sm` = cartes home, `lg` = slides carrousel). */
export type FactionCornerSize = 'sm' | 'lg';

const cornerBox: Record<FactionCornerSize, string> = {
  sm: 'h-6 w-6',
  lg: 'h-8 w-8',
};

/**
 * @param accentColor - Couleur des bordures de coin.
 * @param size - Dimension des coins.
 * @returns {JSX.Element} Quatre coins en `border-2`.
 */
export function FactionCornerBrackets({
  accentColor,
  size = 'lg',
}: {
  accentColor: string;
  size?: FactionCornerSize;
}) {
  const b = cornerBox[size];
  return (
    <>
      <div
        className={`absolute left-0 top-0 border-l-2 border-t-2 ${b}`}
        style={{ borderColor: accentColor }}
      />
      <div
        className={`absolute right-0 top-0 border-r-2 border-t-2 ${b}`}
        style={{ borderColor: accentColor }}
      />
      <div
        className={`absolute bottom-0 left-0 border-b-2 border-l-2 ${b}`}
        style={{ borderColor: accentColor }}
      />
      <div
        className={`absolute bottom-0 right-0 border-b-2 border-r-2 ${b}`}
        style={{ borderColor: accentColor }}
      />
    </>
  );
}

/**
 * @returns {JSX.Element} Motif de lignes diagonales en coin haut-droit (décor carrousel).
 */
export function FactionDiagonalDecoration() {
  return (
    <div className="absolute right-0 top-0 h-64 w-64 opacity-5">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-[#d4cfc4]"
          style={{
            width: '1px',
            height: '100%',
            left: `${i * 32}px`,
            transform: 'rotate(45deg)',
            transformOrigin: 'top left',
          }}
        />
      ))}
    </div>
  );
}

/** Props discriminées par `variant` pour le cadre d’emblème. */
export type FactionEmblemFrameProps =
  | {
      variant: 'carouselSlide';
      emblemUrl: string;
      accentColor: string;
      alt?: string;
    }
  | {
      variant: 'carouselNav';
      emblemUrl: string;
      accentColor: string;
      alt?: string;
    }
  | {
      variant: 'homeCard';
      emblemUrl: string;
      accentColor: string;
      alt: string;
    };

/**
 * @param props - `variant` + URLs / couleurs ; `alt` obligatoire pour `homeCard`.
 * @returns {JSX.Element} Conteneur emblème (bordure selon contexte).
 */
export function FactionEmblemFrame(props: FactionEmblemFrameProps) {
  const { variant, emblemUrl, accentColor } = props;
  const alt = variant === 'homeCard' ? props.alt : (props.alt ?? '');

  if (variant === 'carouselNav') {
    return (
      <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
        <img
          src={emblemUrl}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          decoding="async"
        />
      </div>
    );
  }

  if (variant === 'homeCard') {
    return (
      <div
        className="box-border flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border-2 border-solid bg-[#0a0a0a]/60 backdrop-blur-sm"
        style={{ borderColor: accentColor }}
      >
        <img
          src={emblemUrl}
          alt={props.alt}
          className="max-h-full max-w-full object-contain p-1"
          decoding="async"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className="box-border flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border-4 border-solid bg-[#0a0a0a]/60 backdrop-blur-sm"
      style={{ borderColor: accentColor }}
    >
      <img
        src={emblemUrl}
        alt={alt}
        className="max-h-full max-w-full object-contain p-1"
        decoding="async"
      />
    </div>
  );
}
