/**
 * @file ruleCategoryIcons.tsx
 * @description Mapping des identifiants de catégorie de règles vers des icônes Lucide pour l’accordéon.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Ban,
  FolderOpen,
  Gavel,
  Gift,
  Handshake,
  Lock,
  MessagesSquare,
  Scale,
  Skull,
  Swords,
  Video,
} from 'lucide-react';
import type { RuleCategoryIconId } from './rules.config';
import { cn } from '../ui/utils';

const RULE_CATEGORY_ICONS: Record<RuleCategoryIconId, LucideIcon> = {
  respect: Handshake,
  content: FolderOpen,
  recording: Video,
  hostile: Swords,
  deathRp: Skull,
  hrp: Ban,
  give: Gift,
  privacy: Lock,
  channels: MessagesSquare,
  sanctions: Gavel,
  fairplay: Scale,
};

type RuleCategoryIconProps = {
  id: RuleCategoryIconId;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

/**
 * @param id - Clé d’icône définie dans `rules.config`.
 * @param className - Classes CSS additionnelles.
 * @param size - Taille du pictogramme (px).
 * @param strokeWidth - Épaisseur du trait.
 * @returns {JSX.Element} Icône Lucide décorative (`aria-hidden`).
 */
export function RuleCategoryIcon({
  id,
  className,
  size = 22,
  strokeWidth = 1.65,
}: RuleCategoryIconProps) {
  const Icon = RULE_CATEGORY_ICONS[id];
  return (
    <Icon
      className={cn('shrink-0 text-[#4a5228]', className)}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}
