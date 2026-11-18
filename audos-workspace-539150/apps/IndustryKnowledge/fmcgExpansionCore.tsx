// Shared builder for the FMCG expansion curricula (Beauty & Personal Care, Household & Personal Care,
// Tobacco & Next-Generation Products). Each curriculum is authored as compact chapter data in its own
// module files; this file turns it into the same reader cards, chapter Knowledge Checks, Final Lesson
// Takeaways, Learning Visual specs and sector-registry copy that the mature FMCG curricula use.

import type { ReactNode } from 'react';
import { selectLessonQuestions } from './dairyQuizCore';
import type { FlowType, VisualSpec } from './fashionVisualKit';
import type { RetailSectorContent } from './retailSectorTypes';

export type FxSourceStatus = 'Verified' | 'Verified with Caveat' | 'Pending';

/** One evidence record. `date` is the publication or last-update date; `period` is the reporting period the claim covers. */
export interface FxSource {
  title: string;
  publisher: string;
  url: string;
  date: string;
  geo: string;
  period: string;
  status: FxSourceStatus;
  note?: string;
}

/** [question stem, correct option, three distractors, explanation]. */
export type FxQuestionSeed = [string, string, [string, string, string], string];

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type FxVisualBody = DistributiveOmit<VisualSpec, 'title' | 'kicker' | 'takeaway'>;

type NodeKind = 'stage' | 'decision' | 'outcome';
type Tone = 'positive' | 'caution' | 'negative';
type Row = [string, string, string];
const rows = (items: Row[]) => items.map(([label, a, b]) => ({ label, a, b }));

/** Compact constructors for the existing Learning Visual layouts (fashionVisualKit.tsx). */
export const fxv = {
  tax: (root: string, groups: Array<[string, string?, string[]?]>, note?: string): FxVisualBody => ({ layout: 'taxonomy', root, groups: groups.map(([label, detail, items]) => ({ label, detail, items })), note }),
  flow: (steps: Array<[string, string, NodeKind?]>, loop?: string, note?: string): FxVisualBody => ({ layout: 'flow', steps: steps.map(([label, detail, kind]) => ({ label, detail, kind })), loop, note }),
  mtx: (x: [string, string, string], y: [string, string, string], points: Array<[string, number, number]>, note: string): FxVisualBody => ({ layout: 'matrix', xLabel: x[0], xLow: x[1], xHigh: x[2], yLabel: y[0], yLow: y[1], yHigh: y[2], points: points.map(([label, px, py]) => ({ label, x: px, y: py })), note }),
  cmp: (leftTitle: string, rightTitle: string, items: Row[], note?: string): FxVisualBody => ({ layout: 'compare', leftTitle, rightTitle, rows: rows(items), note }),
  tbl: (headers: [string, string, string], items: Row[], note?: string): FxVisualBody => ({ layout: 'table', headers, rows: rows(items), note }),
  tl: (events: Array<[string, string, string?, ('historical' | 'current' | 'forecast')?]>, note?: string): FxVisualBody => ({ layout: 'timeline', events: events.map(([period, label, detail, status]) => ({ period, label, detail, status })), note }),
  eco: (center: [string, string], actors: Array<[string, string, FlowType[]?]>, note?: string): FxVisualBody => ({ layout: 'ecosystem', center: { label: center[0], detail: center[1] }, actors: actors.map(([label, relation, flows]) => ({ label, relation, flows })), note }),
  dt: (root: [string, string], formula: string, drivers: Array<[string, string?, string?]>, note?: string): FxVisualBody => ({ layout: 'driverTree', root: { label: root[0], detail: root[1] }, formula, drivers: drivers.map(([label, detail, op]) => ({ label, detail, op })), note }),
  wf: (unit: string, basis: string, items: Array<[string, number, 'start' | 'add' | 'subtract' | 'total']>, note?: string): FxVisualBody => ({ layout: 'waterfall', unit, basis, items: items.map(([label, value, kind]) => ({ label, value, kind })), note }),
  path: (trunk: Array<[string, string]>, optionsLabel: string, options: Array<[string, string?]>, note?: string): FxVisualBody => ({ layout: 'pathway', trunk: trunk.map(([label, detail]) => ({ label, detail })), optionsLabel, options: options.map(([label, detail]) => ({ label, detail })), note }),
  dec: (root: [string, string], question: string, branches: Array<[string, string, string?, Tone?]>, note?: string): FxVisualBody => ({ layout: 'decision', root: { label: root[0], detail: root[1] }, question, branches: branches.map(([condition, outcome, detail, tone]) => ({ condition, outcome, detail, tone })), note }),
  pyr: (tagLabel: string, items: Row[]): FxVisualBody => ({ layout: 'pyramid', tagLabel, rows: rows(items) }),
  cards: (tagLabel: string, items: Row[]): FxVisualBody => ({ layout: 'cards', tagLabel, rows: rows(items) }),
};

export interface FxSequence {
  /** Sentence from the chapter showing the stages are consecutive, not alternatives. */
  evidence: string;
  steps: Array<[string, string]>;
}

export interface FxChapter {
  /** Question-based chapter title, unique within the curriculum. */
  t: string;
  /** One learning objective. */
  o: string;
  what: string;
  how: string;
  why: string;
  apply: string;
  /** Example with market and period labelled in the text. */
  ex: string;
  terms: Array<[string, string]>;
  kpis: string[];
  risk: string;
  take: string;
  v: { h: string; i: string; b: FxVisualBody; kicker?: string };
  src: string[];
  qs: [FxQuestionSeed, FxQuestionSeed];
  seq?: FxSequence;
}

export interface FxLesson {
  title: string;
  subtitle: string;
  desc: string;
  impl: string;
  rem: string;
  chapters: FxChapter[];
}

export interface FxModule {
  desc: string;
  lessons: FxLesson[];
}

export interface FxCurriculum {
  id: string;
  /** Visual-kind and question-id slug, e.g. `beauty`. */
  slug: string;
  /** Practice registry prefix, e.g. `FMCG_BEAUTY`. */
  key: string;
  name: string;
  short: string;
  sources: Record<string, FxSource>;
  modules: FxModule[];
}

export const FX_MODULE_TITLES = [
  'How the Industry Works',
  'How Value Moves Through the Industry',
  'How Companies Make Money',
  'Who Competes\u2014and Why They Win',
  'What Is Changing Next',
] as const;

export const FX_MODULE_LABELS = ['Industry Context', 'Value Chain', 'Business Models & Economics', 'Competitive Landscape', 'Trends & Outlook'] as const;

/** FMCG lesson order used by Packaged Food and the other mature FMCG curricula (5/6/6/5/5 = 27 sections). */
export const FX_LESSON_TITLES: string[][] = [
  ['What the Industry Includes', 'How the Industry Evolved', 'How the Global Market Is Structured', 'How the Vietnam Market Works', 'What Drives Industry Change'],
  ['Value Chain Overview', 'Upstream Activities', 'Midstream Activities', 'Downstream Activities', 'Inputs, Outputs & Value Creation', 'Global vs. Local Value Chain'],
  ['Industry Business Models', 'Products, Services & Segmentation', 'Customer Segments & Needs', 'Revenue Streams & Cost Structure', 'Distribution & Sales Channels', 'Industry Ecosystem & Stakeholders'],
  ['Industry Competition Structure', 'Key Industry Players', 'Competitor Benchmarking', 'Key Success Factors', 'Industry SWOT & Strategic Challenges'],
  ['Consumer Trends', 'Technology & Innovation Trends', 'Market & Channel Trends', 'Regulatory & Sustainability Trends', 'Growth Outlook & Strategic Opportunities'],
];

/** Sector blueprint keys (retailSectors.ts RETAIL_MODULE_BLUEPRINT) in the same order as FX_LESSON_TITLES. */
const BLUEPRINT_KEYS: string[][] = [
  ['m1-scope', 'm1-history', 'm1-global', 'm1-vietnam', 'm1-drivers'],
  ['m2-overview', 'm2-sourcing', 'm2-logistics', 'm2-stores', 'm2-customer', 'm2-value'],
  ['m3-models', 'm3-assortment', 'm3-segments', 'm3-revenue', 'm3-store-economics', 'm3-ecosystem'],
  ['m4-structure', 'm4-players', 'm4-benchmarking', 'm4-success', 'm4-swot'],
  ['m5-consumer', 'm5-technology', 'm5-channel', 'm5-regulatory', 'm5-outlook'],
];

export const FX_CHAPTERS_PER_LESSON = 5;

export interface FxCard {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: Array<{ label: string; text: string }>;
  visualKind: string;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  statsNote: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: Array<{ id: string; title: string; href: string; publisher: string }>;
}

export interface FxQuestion {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation: string;
  moduleId: string;
  objective: string;
}

export interface FxTakeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }

export interface FxChapterVisual { heading: string; intro: string; spec: VisualSpec }

export interface FxBuiltModule {
  key: string;
  moduleTitle: string;
  label: string;
  decks: Record<string, FxCard[]>;
  quizzes: Record<string, FxQuestion[]>;
  takeaways: Record<string, FxTakeaways>;
}

export interface FxBuilt {
  curriculum: FxCurriculum;
  modules: FxBuiltModule[];
  visuals: Record<string, FxChapterVisual>;
  sector: RetailSectorContent;
}

const OPTION_IDS = ['a', 'b', 'c', 'd'];
/** Spreads correct answers evenly across a-d within each lesson without a visible a-b-c-d pattern. */
const ANSWER_ROTATION = [0, 2, 3, 1, 2, 0, 1, 3];
const lcFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);
const stemHash = (text: string) => Array.from(text).reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);

export const fxVisualKind = (slug: string, module: number, lesson: number, chapter: number) => `fmcgx-${slug}-m${module}-l${lesson}-c${chapter}`;
export const fxModuleKey = (key: string, module: number) => `${key}_MODULE0${module}`;

function sourceLine(source: FxSource): string {
  return `${source.publisher} \u00b7 ${source.geo} \u00b7 ${source.date}`;
}

function buildCard(curriculum: FxCurriculum, module: number, lesson: number, chapter: number, lessonTitle: string, item: FxChapter): FxCard {
  const sources = item.src.map((id) => ({ id, ...curriculum.sources[id] })).filter((source) => source.title);
  const statuses = Array.from(new Set(sources.map((source) => source.status)));
  return {
    title: item.t,
    chapterTitle: lessonTitle,
    readingTime: '7',
    objective: item.o,
    mateIntro: `This chapter answers one question: ${item.t} By the end you should be able to ${lcFirst(item.o)}`,
    keyInsight: item.take,
    concepts: [],
    narrative: [
      { label: 'What it is', text: item.what },
      { label: 'How it works', text: item.how },
      { label: 'Why it matters commercially', text: item.why },
      { label: 'How to apply it', text: item.apply },
      { label: 'Example', text: item.ex },
    ],
    visualKind: fxVisualKind(curriculum.slug, module, lesson, chapter),
    visualHeading: item.v.h,
    visualIntro: item.v.i,
    imageAlt: `Learning visual: ${item.v.h}`,
    statTiles: [
      { label: 'KPIs to watch', description: item.kpis.join(' \u00b7 ') },
      { label: 'Main risk', description: item.risk },
    ],
    statsNote: 'These tiles name the measures and risks to track in this chapter; they are not market data.',
    keyTerms: item.terms.map(([term, definition]) => ({ term, definition })),
    recap: [item.take, `Measures to watch: ${item.kpis.join(', ')}.`, `Risk to manage: ${item.risk}`],
    chapterRecap: item.take,
    deepDiveTitle: 'Apply it: measures, risks and evidence',
    body: (
      <div className="space-y-4">
        <p>{item.apply}</p>
        <p><strong>Measures to watch:</strong> {item.kpis.join(', ')}.</p>
        <p><strong>Risk to manage:</strong> {item.risk}</p>
        <p><strong>Evidence note:</strong> Sources below are labelled with publisher, geography and date ({statuses.join(', ') || 'no external figures'}). Company examples explain mechanisms only; illustrative calculations use made-up numbers and are labelled as such.</p>
      </div>
    ),
    sources: sources.map((source) => ({ id: source.id, title: source.title, href: source.url, publisher: sourceLine(source) })),
  };
}

function buildQuestion(prefix: string, number: number, chapter: number, objective: string, seed: FxQuestionSeed): FxQuestion {
  const [question, correct, wrong, explanation] = seed;
  const raw = [correct, ...wrong];
  const rotation = ANSWER_ROTATION[(stemHash(prefix) + number) % ANSWER_ROTATION.length];
  const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
  return {
    id: `${prefix}-q${String(number).padStart(2, '0')}`,
    question,
    options: rotated.map((text, index) => ({ id: OPTION_IDS[index], text })),
    correctOptionId: OPTION_IDS[rotated.indexOf(correct)],
    explanation,
    moduleId: String(chapter),
    objective,
  };
}

/** Two seeds per chapter; the existing selection rule (dairyQuizCore) keeps the 10-question lesson format. */
function buildQuiz(prefix: string, chapters: FxChapter[]): FxQuestion[] {
  const items = chapters.flatMap((item, chapterIndex) => item.qs.map((seed, seedIndex) => ({
    chapter: chapterIndex + 1,
    question: buildQuestion(prefix, chapterIndex * 2 + seedIndex + 1, chapterIndex + 1, item.o, seed),
  })));
  return selectLessonQuestions(items.map(({ question }) => [question, question] as [FxQuestion, FxQuestion]), items.map(({ chapter }) => String(chapter)));
}

function buildVisual(item: FxChapter): FxChapterVisual {
  const spec = { ...item.v.b, title: item.t, kicker: item.v.kicker ?? '', takeaway: item.take } as VisualSpec;
  return { heading: item.v.h, intro: item.v.i, spec };
}

export function buildFmcgExpansion(curriculum: FxCurriculum): FxBuilt {
  const visuals: Record<string, FxChapterVisual> = {};
  const sector: RetailSectorContent = { modules: {}, lessons: {} };
  const flatLessons = curriculum.modules.flatMap((module, moduleIndex) => module.lessons.map((lesson) => ({ lesson, moduleIndex })));
  const modules = curriculum.modules.map((module, moduleIndex): FxBuiltModule => {
    const moduleTitle = FX_MODULE_TITLES[moduleIndex];
    const built: FxBuiltModule = {
      key: fxModuleKey(curriculum.key, moduleIndex + 1),
      moduleTitle,
      label: FX_MODULE_LABELS[moduleIndex],
      decks: {},
      quizzes: {},
      takeaways: {},
    };
    sector.modules[moduleTitle] = module.desc;
    module.lessons.forEach((lesson, lessonIndex) => {
      const position = flatLessons.findIndex((entry) => entry.lesson === lesson);
      const nextEntry = flatLessons[position + 1];
      built.decks[lesson.title] = lesson.chapters.map((item, chapterIndex) => buildCard(curriculum, moduleIndex + 1, lessonIndex + 1, chapterIndex + 1, lesson.title, item));
      built.quizzes[lesson.title] = buildQuiz(`fmcgx-${curriculum.slug}-m${moduleIndex + 1}-l${lessonIndex + 1}`, lesson.chapters);
      built.takeaways[lesson.title] = {
        learned: lesson.desc,
        keyTakeaways: lesson.chapters.map((item) => item.take),
        businessImplications: lesson.impl,
        remember: lesson.rem,
        nextLesson: nextEntry ? (nextEntry.moduleIndex === moduleIndex ? nextEntry.lesson.title : `${FX_MODULE_LABELS[nextEntry.moduleIndex]}: ${nextEntry.lesson.title}`) : '',
      };
      lesson.chapters.forEach((item, chapterIndex) => {
        visuals[fxVisualKind(curriculum.slug, moduleIndex + 1, lessonIndex + 1, chapterIndex + 1)] = buildVisual(item);
      });
      sector.lessons[BLUEPRINT_KEYS[moduleIndex][lessonIndex]] = {
        title: lesson.title,
        subtitle: lesson.subtitle,
        description: lesson.desc,
        takeaways: lesson.chapters.slice(0, 3).map((item) => item.take),
      };
    });
    return built;
  });
  return { curriculum, modules, visuals, sector };
}

/** Learner-text figures the practice validators reject (matchSort/validation.ts STATISTIC_PATTERN). */
export const FX_FIGURE_PATTERN = /\d+(?:[.,]\d+)?\s?%|US\$|\bVND\b|\btrillion\b|\bbillion\b|\b(?:19|20)\d{2}\b/i;

/** Structural checks on authored data. Returns problems; an empty list means the curriculum is complete. */
export function validateFmcgExpansion(curriculum: FxCurriculum): string[] {
  const problems: string[] = [];
  if (curriculum.modules.length !== 5) problems.push(`expected 5 modules, found ${curriculum.modules.length}`);
  const titles = new Map<string, string>();
  curriculum.modules.forEach((module, moduleIndex) => {
    const expected = FX_LESSON_TITLES[moduleIndex] ?? [];
    const actual = module.lessons.map((lesson) => lesson.title);
    if (actual.join('|') !== expected.join('|')) problems.push(`module ${moduleIndex + 1}: lesson titles ${actual.join(', ')} do not match ${expected.join(', ')}`);
    module.lessons.forEach((lesson, lessonIndex) => {
      const where = `M${moduleIndex + 1} L${lessonIndex + 1}`;
      if (lesson.chapters.length !== FX_CHAPTERS_PER_LESSON) problems.push(`${where}: expected ${FX_CHAPTERS_PER_LESSON} chapters, found ${lesson.chapters.length}`);
      const stems = new Set<string>();
      lesson.chapters.forEach((item, chapterIndex) => {
        const at = `${where} C${chapterIndex + 1}`;
        const key = item.t.trim().toLowerCase();
        if (titles.has(key)) problems.push(`${at}: title repeats ${titles.get(key)}`);
        titles.set(key, at);
        (['t', 'o', 'what', 'how', 'why', 'apply', 'ex', 'risk', 'take'] as const).forEach((field) => { if (!String(item[field] ?? '').trim()) problems.push(`${at}: empty ${field}`); });
        if (item.terms.length < 2) problems.push(`${at}: needs at least 2 key terms`);
        if (item.kpis.length < 2) problems.push(`${at}: needs at least 2 KPIs`);
        if (!item.src.length) problems.push(`${at}: no sources`);
        item.src.forEach((id) => { if (!curriculum.sources[id]) problems.push(`${at}: unknown source ${id}`); });
        item.terms.forEach(([term, definition]) => { if (FX_FIGURE_PATTERN.test(`${term} ${definition}`)) problems.push(`${at}: key term "${term}" contains a figure`); });
        item.qs.forEach(([stem, correct, wrong, explanation], seedIndex) => {
          const qAt = `${at} Q${seedIndex + 1}`;
          const normal = stem.trim().toLowerCase();
          if (stems.has(normal)) problems.push(`${qAt}: repeated stem`);
          stems.add(normal);
          const options = [correct, ...wrong].map((text) => text.trim().toLowerCase());
          if (new Set(options).size !== 4 || options.some((text) => !text)) problems.push(`${qAt}: options must be four distinct texts`);
          if (!explanation.trim()) problems.push(`${qAt}: missing explanation`);
        });
        if (item.seq) {
          if (item.seq.steps.length < 3) problems.push(`${at}: sequence needs at least 3 steps`);
          if ([item.seq.evidence, ...item.seq.steps.flat()].some((text) => FX_FIGURE_PATTERN.test(text))) problems.push(`${at}: sequence text contains a figure`);
        }
      });
    });
  });
  return problems;
}
