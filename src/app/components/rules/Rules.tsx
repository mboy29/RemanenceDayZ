/**
 * @file Rules.tsx
 * @description Section règlement : avertissement, accordéon hiérarchique à partir de `rulesData`, ancre `RULES_ANCHOR_ID`.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import { rulesData, type Rule, type RuleCategoryIconId } from './rules.config';
import { RuleCategoryIcon } from './ruleCategoryIcons';
import { cn } from '../ui/utils';
import { Section } from '../Section';
import { RULES_ANCHOR_ID } from './rulesAnchor';

type RulesAccordionTriggerProps = {
  icon: ReactNode;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  depth?: number;
};

type RulesAccordionNodeProps = {
  rule: Rule;
  pathParts: number[];
  categoryIcon: RuleCategoryIconId;
  categoryIndex: number;
  depth: number;
  isInView: boolean;
  openKeys: Set<string>;
  onToggleKey: (key: string) => void;
};

type RulesAccordionProps = {
  isInView: boolean;
  openKeys: Set<string>;
  onToggleKey: (key: string) => void;
};

/**
 * @param parts - Indices du chemin dans l’arbre (catégorie, règle, sous-règle…).
 * @returns {string} Clé stable pour l’état ouvert/fermé (`Set`).
 */
function pathKey(parts: number[]): string {
  return parts.join('-');
}

/**
 * @param isInView - Contrôle l’animation d’entrée.
 * @returns {JSX.Element} Encadré d’avertissement modération.
 */
function RulesWarning({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-8 border border-[#5c3a3a]/40 bg-[#5c3a3a]/10 p-6"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle
          className="mt-0.5 shrink-0 text-[#8a7355]"
          size={26}
          strokeWidth={1.5}
          aria-hidden
        />
        <div>
          <h4
            className="mb-2 text-[#d4cfc4]"
            style={{
              fontFamily: "'Teko', sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Important
          </h4>
          <p
            className="text-[#8a8777]"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px' }}
          >
            Le non-respect de ces règles pourra entraîner avertissements, sanctions temporaires ou
            bannissement définitif. Les décisions de la modération sont finales.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * @param isOpen - Anime la barre supérieure quand le panneau est ouvert.
 * @returns {JSX.Element} Ligne d’accent et coins décoratifs.
 */
function RulesAccordionFrameDecor({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isOpen ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 right-0 top-0 h-px origin-left bg-[#4a5228]"
      />
      <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#4a5228]/40 transition-colors duration-300 group-hover:border-[#4a5228]" />
      <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[#4a5228]/40 transition-colors duration-300 group-hover:border-[#4a5228]" />
    </>
  );
}

/**
 * @param icon - Icône catégorie ou chevron selon la profondeur.
 * @param title - Titre du nœud.
 * @param isOpen - État ouvert.
 * @param onToggle - Bascule l’état.
 * @param depth - `0` = racine (padding / typo différents).
 * @returns {JSX.Element} Bouton en-tête d’accordéon.
 */
function RulesAccordionTrigger({
  icon,
  title,
  isOpen,
  onToggle,
  depth = 0,
}: RulesAccordionTriggerProps) {
  const isRoot = depth === 0;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex w-full items-center justify-between text-left transition-colors duration-300 hover:bg-[#1a1a16]',
        isRoot ? 'p-5' : 'px-4 py-3',
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        {isRoot ? (
          <motion.span
            animate={{ opacity: isOpen ? 1 : 0.88, scale: isOpen ? 1.04 : 1 }}
            transition={{ duration: 0.25 }}
            className="flex shrink-0 items-center justify-center"
          >
            {icon}
          </motion.span>
        ) : (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex shrink-0 items-center justify-center text-[#746f5c]"
          >
            {icon}
          </motion.span>
        )}
        <h3
          className="min-w-0 tracking-tight text-[#d4cfc4]"
          style={{
            fontFamily: "'Teko', sans-serif",
            fontSize: isRoot ? '20px' : `${18 - Math.min(depth, 3)}px`,
            fontWeight: 600,
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="ml-2 flex-shrink-0 text-[#4a5228]"
      >
        <ChevronDown size={isRoot ? 20 : 18} />
      </motion.div>
    </button>
  );
}

/**
 * @param items - Puces de texte.
 * @param compact - Typo plus petite pour les niveaux imbriqués.
 * @returns {JSX.Element} Liste `<ul>` animée.
 */
function RulesAccordionBulletList({ items, compact }: { items: string[]; compact?: boolean }) {
  return (
    <motion.ul
      initial={{ y: -6 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      className={cn('space-y-2', compact ? 'pt-2' : 'pt-4')}
    >
      {items.map((item, itemIndex) => (
        <motion.li
          key={itemIndex}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: itemIndex * 0.04 }}
          className="flex items-start gap-3 text-[#8a8777]"
          style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: compact ? '12px' : '13px' }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: itemIndex * 0.04 + 0.08 }}
            className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#4a5228]"
          />
          <span className="flex-1">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/**
 * @param rule - Nœud courant (titre, contenu, enfants).
 * @param pathParts - Chemin d’indices pour `pathKey`.
 * @param categoryIcon - Icône Lucide de la catégorie racine.
 * @param categoryIndex - Délai d’animation des racines.
 * @param depth - Profondeur dans l’arbre.
 * @param isInView - Animation racine.
 * @param openKeys - Clés des panneaux ouverts.
 * @param onToggleKey - Bascule une clé dans `openKeys`.
 * @returns {JSX.Element} Bloc accordéon récursif.
 */
function RulesAccordionNode({
  rule,
  pathParts,
  categoryIcon,
  categoryIndex,
  depth,
  isInView,
  openKeys,
  onToggleKey,
}: RulesAccordionNodeProps) {
  const key = pathKey(pathParts);
  const isOpen = openKeys.has(key);
  const children = rule.children ?? [];
  const hasChildren = children.length > 0;
  const contentLines = rule.content ?? [];

  return (
    <motion.div
      initial={depth === 0 ? { opacity: 0, y: 20 } : undefined}
      animate={depth === 0 ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
      transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
      className={cn(
        'group relative overflow-hidden border',
        depth === 0
          ? 'border-[#746f5c]/20 bg-[#1a1a16]/60'
          : 'border-[#746f5c]/15 bg-[#0a0a0a]/60',
      )}
    >
      <RulesAccordionFrameDecor isOpen={isOpen} />
      <RulesAccordionTrigger
        icon={
          depth === 0 ? (
            <RuleCategoryIcon id={categoryIcon} size={24} />
          ) : (
            <ChevronRight size={18} strokeWidth={2} aria-hidden />
          )
        }
        title={rule.title}
        isOpen={isOpen}
        onToggle={() => onToggleKey(key)}
        depth={depth}
      />
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key={`open-${key}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#746f5c]/10"
          >
            <div
              className={cn(
                'pb-4',
                depth === 0 ? 'px-5 pl-[4.5rem]' : 'px-3 pb-3 pl-6 sm:pl-8',
              )}
            >
              {contentLines.length > 0 ? (
                <RulesAccordionBulletList items={contentLines} compact={depth > 0} />
              ) : null}
              {hasChildren ? (
                <div className={cn('space-y-2', contentLines.length > 0 ? 'mt-4' : 'pt-2')}>
                  {children.map((child, i) => (
                    <RulesAccordionNode
                      key={pathKey([...pathParts, i])}
                      rule={child}
                      pathParts={[...pathParts, i]}
                      categoryIcon={categoryIcon}
                      categoryIndex={categoryIndex}
                      depth={depth + 1}
                      isInView={isInView}
                      openKeys={openKeys}
                      onToggleKey={onToggleKey}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * @param isInView - Passé aux nœuds racine pour l’animation.
 * @param openKeys - État ouvert partagé.
 * @param onToggleKey - Callback de bascule.
 * @returns {JSX.Element} Liste des catégories et règles racines.
 */
function RulesAccordion({ isInView, openKeys, onToggleKey }: RulesAccordionProps) {
  return (
    <div className="space-y-3">
      {rulesData.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          {category.rules.map((rule, ruleIndex) => (
            <RulesAccordionNode
              key={pathKey([categoryIndex, ruleIndex])}
              rule={rule}
              pathParts={[categoryIndex, ruleIndex]}
              categoryIcon={category.icon}
              categoryIndex={categoryIndex}
              depth={0}
              isInView={isInView}
              openKeys={openKeys}
              onToggleKey={onToggleKey}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * @returns {JSX.Element} Section complète du règlement avec grille de fond.
 */
export function Rules() {
  const ref = useRef(null);
  const isInView: boolean = useInView(ref, { once: true, margin: '-100px' });
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set());

  /** Ajoute ou retire `key` de l’ensemble des panneaux ouverts. */
  const toggleKey = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <Section id={RULES_ANCHOR_ID} gridBackground={false} bgColor="#0a0a0a">
         <div ref={ref} className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(#746f5c 1px, transparent 1px), linear-gradient(90deg, #746f5c 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
        <RulesWarning isInView={isInView} />
        <RulesAccordion isInView={isInView} openKeys={openKeys} onToggleKey={toggleKey} />
    </Section>
  );
}
