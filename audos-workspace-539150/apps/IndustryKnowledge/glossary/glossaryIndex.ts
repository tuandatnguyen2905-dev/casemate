// Small static index of which lessons have Essential Terms. It is safe to import from the reader:
// term data stays in per-curriculum chunks that load only when a lesson with a glossary is opened.
import type { CurriculumGlossaryData } from './glossaryTypes';

export interface CurriculumGlossaryIndexEntry {
  curriculumId: string;
  industry: string;
  subIndustry: string;
  /** Industry ids used in lesson identities (`<industryId>::<module title>::<lesson title>`). */
  industryIds: string[];
  /** Blueprint keys of lessons with authored glossary content. Checked against the data by the coverage test. */
  lessonKeys: string[];
  load: () => Promise<CurriculumGlossaryData>;
}

/** The standard 27-lesson Domain Knowledge blueprint shared by the curricula built on it. */
export const STANDARD_LESSON_BLUEPRINT: ReadonlyArray<{ key: string; module: string; title: string; aliases?: string[] }> = [
  { key: '1.1', module: 'How the Industry Works', title: 'Industry Definition & Scope' },
  { key: '1.2', module: 'How the Industry Works', title: 'Industry History & Development' },
  { key: '1.3', module: 'How the Industry Works', title: 'Global Market Overview' },
  { key: '1.4', module: 'How the Industry Works', title: 'Vietnam Market Overview' },
  { key: '1.5', module: 'How the Industry Works', title: 'Industry Drivers & External Factors' },
  { key: '2.1', module: 'How Value Moves Through the Industry', title: 'Value Chain Overview' },
  { key: '2.2', module: 'How Value Moves Through the Industry', title: 'Upstream Activities' },
  { key: '2.3', module: 'How Value Moves Through the Industry', title: 'Midstream Activities' },
  { key: '2.4', module: 'How Value Moves Through the Industry', title: 'Downstream Activities' },
  { key: '2.5', module: 'How Value Moves Through the Industry', title: 'Inputs, Outputs & Value Creation' },
  { key: '2.6', module: 'How Value Moves Through the Industry', title: 'Global vs. Local Value Chain' },
  { key: '3.1', module: 'How Companies Make Money', title: 'Industry Business Models' },
  { key: '3.2', module: 'How Companies Make Money', title: 'Products, Services & Segmentation' },
  { key: '3.3', module: 'How Companies Make Money', title: 'Customer Segments & Needs' },
  { key: '3.4', module: 'How Companies Make Money', title: 'Revenue Streams & Cost Structure' },
  { key: '3.5', module: 'How Companies Make Money', title: 'Distribution & Sales Channels' },
  { key: '3.6', module: 'How Companies Make Money', title: 'Industry Ecosystem & Stakeholders' },
  { key: '4.1', module: 'Who Competes—and Why They Win', title: 'Industry Competition Structure' },
  { key: '4.2', module: 'Who Competes—and Why They Win', title: 'Key Industry Players' },
  { key: '4.3', module: 'Who Competes—and Why They Win', title: 'Competitor Benchmarking' },
  { key: '4.4', module: 'Who Competes—and Why They Win', title: 'Key Success Factors' },
  { key: '4.5', module: 'Who Competes—and Why They Win', title: 'Industry SWOT & Strategic Challenges', aliases: ['SWOT & Strategic Challenges'] },
  { key: '5.1', module: 'What Is Changing Next', title: 'Consumer Trends' },
  { key: '5.2', module: 'What Is Changing Next', title: 'Technology & Innovation Trends' },
  { key: '5.3', module: 'What Is Changing Next', title: 'Market & Channel Trends' },
  { key: '5.4', module: 'What Is Changing Next', title: 'Regulatory & Sustainability Trends' },
  { key: '5.5', module: 'What Is Changing Next', title: 'Growth Outlook & Strategic Opportunities' },
];

const ALL_BLUEPRINT_KEYS = STANDARD_LESSON_BLUEPRINT.map((lesson) => lesson.key);

export const GLOSSARY_INDEX: ReadonlyArray<CurriculumGlossaryIndexEntry> = [
  {
    curriculumId: 'commercial-banking',
    industry: 'Banking & Financial Services',
    subIndustry: 'Commercial Banking',
    industryIds: ['banking-commercial'],
    lessonKeys: ALL_BLUEPRINT_KEYS.filter((key) => key !== '5.4'),
    load: () => import('./data/commercialBankingGlossary').then((mod) => mod.COMMERCIAL_BANKING_GLOSSARY),
  },
  {
    curriculumId: 'consumer-finance',
    industry: 'Banking & Financial Services',
    subIndustry: 'Consumer Finance',
    industryIds: ['banking-consumer-finance'],
    lessonKeys: ALL_BLUEPRINT_KEYS,
    load: () => import('./data/consumerFinanceGlossary').then((mod) => mod.CONSUMER_FINANCE_GLOSSARY),
  },
  {
    curriculumId: 'life-insurance',
    industry: 'Banking & Financial Services',
    subIndustry: 'Life Insurance',
    industryIds: ['banking-insurance'],
    lessonKeys: ALL_BLUEPRINT_KEYS,
    load: () => import('./data/lifeInsuranceGlossary').then((mod) => mod.LIFE_INSURANCE_GLOSSARY),
  },
  {
    curriculumId: 'payments-fintech',
    industry: 'Banking & Financial Services',
    subIndustry: 'Payments & Fintech',
    industryIds: ['banking-fintech'],
    lessonKeys: ALL_BLUEPRINT_KEYS.filter((key) => key !== '4.5'),
    load: () => import('./data/paymentsFintechGlossary').then((mod) => mod.PAYMENTS_FINTECH_GLOSSARY),
  },
];

/** Case, numbering and punctuation-insensitive lesson title key: "2.2 Upstream Activities" → "upstream activities". */
export function normalizeLessonTitle(title: string): string {
  return String(title ?? '')
    .replace(/^\s*\d{1,2}(?:\.\d{1,2})?\s*[.:)\-\u2013\u2014]?\s+/, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const BLUEPRINT_BY_TITLE = new Map<string, string>();
STANDARD_LESSON_BLUEPRINT.forEach((lesson) => {
  [lesson.title, ...(lesson.aliases ?? [])].forEach((title) => BLUEPRINT_BY_TITLE.set(normalizeLessonTitle(title), lesson.key));
});

export function parseLessonIdentity(identity: string | null | undefined): { industryId: string; moduleTitle: string; lessonTitle: string } | null {
  if (!identity) return null;
  const parts = String(identity).split('::');
  if (parts.length < 3) return null;
  const [industryId, moduleTitle, ...rest] = parts;
  return { industryId, moduleTitle, lessonTitle: rest.join('::') };
}

export interface GlossaryRef {
  entry: CurriculumGlossaryIndexEntry;
  lessonKey: string;
}

/** Which curriculum glossary and lesson an identity belongs to; null when the lesson has no glossary. */
export function resolveGlossaryRef(identity: string | null | undefined): GlossaryRef | null {
  const parsed = parseLessonIdentity(identity);
  if (!parsed) return null;
  const entry = GLOSSARY_INDEX.find((item) => item.industryIds.includes(parsed.industryId));
  if (!entry) return null;
  const lessonKey = BLUEPRINT_BY_TITLE.get(normalizeLessonTitle(parsed.lessonTitle));
  if (!lessonKey || !entry.lessonKeys.includes(lessonKey)) return null;
  return { entry, lessonKey };
}

export const hasLessonGlossary = (identity: string | null | undefined) => resolveGlossaryRef(identity) !== null;
