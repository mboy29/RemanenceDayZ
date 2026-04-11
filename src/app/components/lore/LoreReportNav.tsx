/**
 * @file LoreReportNav.tsx
 * @description Menu « onglets dossier » : ancres dynamiques, surbrillance au scroll, strip horizontal qui suit l’onglet actif.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { FolderOpen } from 'lucide-react';
import { cn } from '../ui/utils';
import { loreDocument } from './lore.config';
import {
  LORE_RAPPORT_ANNEXE_ID,
  LORE_RAPPORT_METADONNEES_ID,
  LORE_RAPPORT_NOTE_TERRAIN_ID,
  LORE_RAPPORT_EN_TETE_ID,
  loreSectionElementId,
} from './loreAnchor';

const BODY_FONT = "'Roboto Condensed', sans-serif";

type LoreNavItem = { id: string; label: string };

function buildLoreNavItems(doc: typeof loreDocument): LoreNavItem[] {
  const items: LoreNavItem[] = [
    { id: LORE_RAPPORT_EN_TETE_ID, label: 'En-tête du dossier' },
    { id: LORE_RAPPORT_METADONNEES_ID, label: 'Métadonnées' },
  ];

  doc.sections.forEach((section, i) => {
    items.push({ id: loreSectionElementId(i), label: section.title });
    if (i === 2) {
      items.push({ id: LORE_RAPPORT_NOTE_TERRAIN_ID, label: 'Note de terrain' });
    }
  });

  items.push({ id: LORE_RAPPORT_ANNEXE_ID, label: 'Annexe visuelle' });
  return items;
}

function scrollToReportSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LoreReportNavHeader() {
  return (
    <div className="flex items-center gap-2 border-b border-[#4a5228]/25 bg-[#12110e]/90 px-3 py-2 sm:px-4">
      <FolderOpen className="shrink-0 text-[#4a5228]" size={18} strokeWidth={1.5} aria-hidden />
      <span
        className="hidden shrink-0 text-[10px] uppercase tracking-[0.2em] text-[#746f5c] sm:inline"
        style={{ fontFamily: BODY_FONT }}
      >
        Index du dossier
      </span>
    </div>
  );
}

type LoreReportNavTabProps = {
  item: LoreNavItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  tabRef: (el: HTMLButtonElement | null) => void;
};

function LoreReportNavTab({
  item,
  index,
  isActive,
  onActivate,
  tabRef,
}: LoreReportNavTabProps) {
  return (
    <button
      ref={tabRef}
      type="button"
      onClick={onActivate}
      className={cn(
        'group relative min-w-0 shrink-0 select-none rounded-t border border-b-0 px-3 py-2.5 text-left transition-colors sm:px-4',
        'max-w-[11rem] sm:max-w-[14rem]',
        isActive
          ? 'z-[2] border-[#4a5228]/70 bg-[#0f0f0d] text-[#d4cfc4]'
          : 'z-[1] border-[#746f5c]/25 bg-[#161512]/90 text-[#8a8777] hover:border-[#746f5c]/45 hover:bg-[#1a1914] hover:text-[#b8b3a8]',
      )}
      style={{ fontFamily: BODY_FONT, fontSize: '11px', letterSpacing: '0.06em' }}
      title={item.label}
    >
      <span className="mb-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-[#5c5a52]">
        Sec.{String(index + 1).padStart(2, '0')}
      </span>
      <span className="line-clamp-2 leading-snug">{item.label}</span>
      {isActive ? (
        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#4a5228]" aria-hidden />
      ) : null}
    </button>
  );
}

type LoreReportNavTabStripProps = {
  navItems: LoreNavItem[];
  activeId: string;
  onActivateTab: (id: string) => void;
  registerTabRef: (id: string) => (el: HTMLButtonElement | null) => void;
  stripRef: RefObject<HTMLDivElement | null>;
};

function LoreReportNavTabStrip({
  navItems,
  activeId,
  onActivateTab,
  registerTabRef,
  stripRef,
}: LoreReportNavTabStripProps) {
  return (
    <div
      ref={stripRef}
      className="flex gap-1 overflow-x-auto px-2 py-2 sm:px-3 sm:py-2.5 [scrollbar-width:thin] [scrollbar-color:#4a5228_#0a0a0a]"
    >
      {navItems.map((item, i) => (
        <LoreReportNavTab
          key={item.id}
          item={item}
          index={i}
          isActive={activeId === item.id}
          tabRef={registerTabRef(item.id)}
          onActivate={() => onActivateTab(item.id)}
        />
      ))}
    </div>
  );
}

export type LoreReportNavProps = {
  className?: string;
};

/**
 * Barre d’onglets style chemise de classement, sticky sous la navbar.
 */
export function LoreReportNav({ className }: LoreReportNavProps) {
  const navItems = useMemo(() => buildLoreNavItems(loreDocument), []);
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? '');
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const stripRef = useRef<HTMLDivElement>(null);
  const skipNextStripLayoutScroll = useRef(false);

  const registerTabRef = useCallback((id: string) => {
    return (el: HTMLButtonElement | null) => {
      if (el) tabRefs.current.set(id, el);
      else tabRefs.current.delete(id);
    };
  }, []);

  /** Défile uniquement la bande horizontale — pas `scrollIntoView` (évite de bouger le scroll de la fenêtre). */
  const scrollStripToTab = useCallback((id: string, behavior: ScrollBehavior) => {
    const btn = tabRefs.current.get(id);
    const strip = stripRef.current;
    if (!btn || !strip) return;
    const target =
      btn.offsetLeft + btn.offsetWidth / 2 - strip.clientWidth / 2;
    const max = Math.max(0, strip.scrollWidth - strip.clientWidth);
    strip.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior });
  }, []);

  const onActivateTab = useCallback(
    (id: string) => {
      skipNextStripLayoutScroll.current = true;
      scrollToReportSection(id);
      setActiveId(id);
      queueMicrotask(() => {
        requestAnimationFrame(() => {
          scrollStripToTab(id, 'smooth');
        });
      });
    },
    [scrollStripToTab],
  );

  const refreshActive = useCallback(() => {
    const bandY = window.innerHeight * 0.22;
    let bestId = navItems[0]?.id ?? '';
    let bestDist = Number.POSITIVE_INFINITY;

    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const mid = (r.top + r.bottom) / 2;
      const dist = Math.abs(mid - bandY);
      if (r.bottom > 0 && r.top < window.innerHeight && dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    }
    setActiveId(bestId);
  }, [navItems]);

  useLayoutEffect(() => {
    if (skipNextStripLayoutScroll.current) {
      skipNextStripLayoutScroll.current = false;
      return;
    }
    scrollStripToTab(activeId, 'auto');
  }, [activeId, scrollStripToTab]);

  useEffect(() => {
    refreshActive();
    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        refreshActive();
        t = null;
      }, 64);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refreshActive, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refreshActive);
      if (t) clearTimeout(t);
    };
  }, [refreshActive]);

  return (
    <nav
      className={cn(
        'sticky z-30 -mx-1 border border-[#746f5c]/35 bg-[#0a0a0a]/92 backdrop-blur-md',
        'top-[4.75rem] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)]',
        className,
      )}
      aria-label="Sections du rapport"
    >
      <LoreReportNavHeader />
      <LoreReportNavTabStrip
        navItems={navItems}
        activeId={activeId}
        onActivateTab={onActivateTab}
        registerTabRef={registerTabRef}
        stripRef={stripRef}
      />
    </nav>
  );
}
