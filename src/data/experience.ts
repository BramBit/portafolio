export interface ExperienceEntry {
  title: string;
  summary: string;
  role?: string;
  timeframe?: string;
  company?: string;
  technologies: string[];
  href: string;
}

export interface ExperienceGroup {
  company: string;
  /** Set only when every entry of the company shares the same timeframe */
  timeframe?: string;
  entries: ExperienceEntry[];
}

const ONGOING = /actualidad|present|current/i;

/**
 * Groups entries by company, keeping the incoming order inside each group.
 * Companies with an ongoing entry come first; otherwise the first appearance decides.
 */
export function groupByCompany(entries: ExperienceEntry[]): ExperienceGroup[] {
  const groups = new Map<string, ExperienceEntry[]>();
  for (const entry of entries) {
    const key = entry.company ?? '';
    groups.set(key, [...(groups.get(key) ?? []), entry]);
  }

  const result = [...groups.entries()].map(([company, items]) => {
    const timeframes = new Set(items.map((item) => item.timeframe));
    const shared = timeframes.size === 1 ? items[0].timeframe : undefined;
    return {
      company,
      timeframe: shared,
      entries: shared ? items.map((item) => ({ ...item, timeframe: undefined })) : items,
    };
  });

  const isOngoing = (group: ExperienceGroup) =>
    group.entries.some((entry) => ONGOING.test(entry.timeframe ?? group.timeframe ?? ''));
  const ongoing = result.filter(isOngoing);
  return [...ongoing, ...result.filter((group) => !ongoing.includes(group))];
}
