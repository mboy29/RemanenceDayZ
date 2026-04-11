import type { LoreDocument } from './lore.types';

/**
 * Découpe le rapport en blocs séquentiels pour éviter une boucle `map` avec
 * des `return null` (ouverture + cluster + sections isolées).
 */
export type LoreReportBlock =
  | { kind: 'incidentOpening' }
  | { kind: 'analysisCluster' }
  | { kind: 'section'; index: number };

export function buildLoreReportBlocks(doc: LoreDocument): LoreReportBlock[] {
  const blocks: LoreReportBlock[] = [];
  const { sections, incidentOpening, analysisCluster } = doc;
  const openingLen = incidentOpening?.sectionCount ?? 0;
  const clusterLen = analysisCluster?.sectionCount ?? 2;
  const clusterStart = analysisCluster?.startIndex;

  let i = 0;

  if (incidentOpening && openingLen > 0) {
    blocks.push({ kind: 'incidentOpening' });
    i = openingLen;
  }

  while (i < sections.length) {
    if (clusterStart !== undefined && i === clusterStart) {
      blocks.push({ kind: 'analysisCluster' });
      i += clusterLen;
    } else {
      blocks.push({ kind: 'section', index: i });
      i += 1;
    }
  }

  return blocks;
}
