import type { MetricCategory, MetricDefinition } from './types';

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9%]+/g, ' ').trim();
}

/** Ranks by acronym match, then name prefix, then name or definition containing the query. */
export function searchMetrics<T extends { metric: MetricDefinition }>(entries: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return entries;
  const scored = entries
    .map((entry) => {
      const { metric } = entry;
      const acronym = normalize(metric.acronym ?? '');
      const name = normalize(metric.name);
      let score = 0;
      if (acronym && acronym === q) score = 100;
      else if (acronym && acronym.startsWith(q)) score = 80;
      else if (name.startsWith(q)) score = 70;
      else if (name.includes(q)) score = 50;
      else if (normalize(metric.metricId).includes(q)) score = 40;
      else if (normalize(metric.definition).includes(q)) score = 20;
      return { entry, score };
    })
    .filter((item) => item.score > 0);
  return scored.sort((a, b) => b.score - a.score).map((item) => item.entry);
}

export function filterByCategory<T extends { metric: MetricDefinition }>(entries: T[], category: MetricCategory | 'all'): T[] {
  return category === 'all' ? entries : entries.filter((entry) => entry.metric.category === category);
}
