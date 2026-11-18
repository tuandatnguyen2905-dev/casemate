import type { RetailLessonContent, RetailSectorContent } from './retailSectorTypes';

/** Canonical module titles, in the order the five module cards appear. */
export const TECH_MODULE_TITLES = [
  'How the Industry Works',
  'How Value Moves Through the Industry',
  'How Companies Make Money',
  'Who Competes—and Why They Win',
  'What Is Changing Next',
] as const;

/** Lesson keys in the same order as the shared lesson blueprint (5 + 6 + 6 + 5 + 5 lessons). */
export const TECH_LESSON_KEYS = [
  'm1-scope', 'm1-history', 'm1-global', 'm1-vietnam', 'm1-drivers',
  'm2-overview', 'm2-sourcing', 'm2-logistics', 'm2-stores', 'm2-customer', 'm2-value',
  'm3-models', 'm3-assortment', 'm3-segments', 'm3-revenue', 'm3-store-economics', 'm3-ecosystem',
  'm4-structure', 'm4-players', 'm4-benchmarking', 'm4-success', 'm4-swot',
  'm5-consumer', 'm5-technology', 'm5-channel', 'm5-regulatory', 'm5-outlook',
] as const;

/** One lesson: a description followed by exactly three takeaways. */
export type TechLessonRow = [description: string, takeaway1: string, takeaway2: string, takeaway3: string];

/** Lessons whose shared retail title would read wrongly for a technology sector. */
const TECH_TITLE_OVERRIDES: Record<string, { title: string; subtitle: string }> = {
  'm2-logistics': { title: 'Delivery, Infrastructure & Operations', subtitle: 'How the Offering Is Built and Served' },
  'm2-stores': { title: 'Channels & Customer Operations', subtitle: 'Sales Routes, Service, and Support' },
  'm2-customer': { title: 'Inputs, Outputs & Value Creation', subtitle: 'Resources, Results, and Value Capture' },
  'm2-value': { title: 'Global vs. Local Value Chain', subtitle: 'Global Reach, Local Fit, and Vietnam' },
  'm3-assortment': { title: 'Products, Services & Segmentation', subtitle: 'Offerings, Tiers, and Positioning' },
  'm3-store-economics': { title: 'Distribution & Sales Channels', subtitle: 'How Offerings Reach Customers' },
};

export function buildTechSector(
  modules: [string, string, string, string, string],
  rows: TechLessonRow[],
): RetailSectorContent {
  if (rows.length !== TECH_LESSON_KEYS.length) {
    throw new Error(`Expected ${TECH_LESSON_KEYS.length} lesson rows but received ${rows.length}`);
  }
  const lessons: Record<string, RetailLessonContent> = {};
  TECH_LESSON_KEYS.forEach((key, index) => {
    const [description, ...takeaways] = rows[index];
    lessons[key] = { ...TECH_TITLE_OVERRIDES[key], description, takeaways };
  });
  return {
    modules: Object.fromEntries(TECH_MODULE_TITLES.map((title, index) => [title, modules[index]])),
    lessons,
  };
}
