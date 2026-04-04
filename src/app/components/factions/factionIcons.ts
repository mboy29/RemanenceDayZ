import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Cloud,
  Crosshair,
  Flower2,
  Landmark,
  Microscope,
  Shield,
  Skull,
  Users,
} from 'lucide-react';

export const FACTION_ICON_BY_NAME: Record<string, LucideIcon> = {
  Loners: Users,
  Duty: Shield,
  Freedom: Flower2,
  Bandits: Skull,
  Mercenaries: Crosshair,
  Ecologists: Microscope,
  Military: Building2,
  Monolith: Landmark,
  'Clear Sky': Cloud,
};

export function getFactionIcon(name: string): LucideIcon {
  return FACTION_ICON_BY_NAME[name] ?? Users;
}
