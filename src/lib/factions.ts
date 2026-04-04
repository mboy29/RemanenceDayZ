import { factions } from '@/app/components/factions/factions.config';

function getFactionsNbMembers({ factionName }: { factionName: string }): number {
  const f = factions.find((x) => x.name === factionName);
  if (typeof f?.nbMembers === 'number') return f.nbMembers;
  return 0;
}

function getFactionsStatus({
  factionName,
}: {
  factionName: string;
}): 'active' | 'inactive' | 'open' | null {
  const f = factions.find((x) => x.name === factionName);
  return f?.status ?? null;
}

export { getFactionsNbMembers, getFactionsStatus };