import { PACKAGED_FOOD_M3_LESSON1 } from './packagedFoodM3Lesson1';
import { PACKAGED_FOOD_M3_LESSON2 } from './packagedFoodM3Lesson2';
import { PACKAGED_FOOD_M3_LESSON3 } from './packagedFoodM3Lesson3';
import { PACKAGED_FOOD_M3_LESSON4 } from './packagedFoodM3Lesson4';
import { PACKAGED_FOOD_M3_LESSON5 } from './packagedFoodM3Lesson5';
import { PACKAGED_FOOD_M3_LESSON6 } from './packagedFoodM3Lesson6';
import { citePfM3 } from './packagedFoodM3Core';
import { selectLessonQuestions } from './dairyQuizCore';
import { renderPackagedFoodM3Visual } from './packagedFoodM3Visuals';
import { PACKAGED_FOOD_M3_VISUALS } from './packagedFoodM3VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PackagedFoodM3CardData, PackagedFoodM3SourceId, PackagedFoodM3VisualKind } from './packagedFoodM3Core';
import type { PackagedFoodQuestion, PackagedFoodTakeaways } from './packagedFoodM1Core';
export type { PackagedFoodM3VisualKind } from './packagedFoodM3Core';
export { renderPackagedFoodM3Visual };

export const PACKAGED_FOOD_MODULE03_LESSONS = [
  { title: 'Industry Business Models', description: 'Compare branded, integrated, private-label and contract-production models.' },
  { title: 'Products, Services & Segmentation', description: 'Segment categories, price tiers, portfolios and positioning.' },
  { title: 'Customer Segments & Needs', description: 'Separate trade customers, shoppers and consumers and map purchase occasions.' },
  { title: 'Revenue Streams & Cost Structure', description: 'Connect revenue, category costs, pricing and profitability drivers.' },
  { title: 'Distribution & Sales Channels', description: 'Compare general trade, modern trade, wholesale, convenience and digital.' },
  { title: 'Industry Ecosystem & Stakeholders', description: 'Map suppliers, channels, regulators, associations and partnerships.' },
];

const LABELS = ['What it is', 'How it works', 'Global example', 'Vietnam example', 'Why it matters'] as const;
function normalizeChapter(raw: any, lessonTitle: string, sourceIds: PackagedFoodM3SourceId[]): PackagedFoodM3CardData {
  const narrative = (raw.narrative ?? []).slice(0, 5).map((item: any, index: number) => ({ label: LABELS[index], text: item.text }));
  const recap = (raw.recap ?? []).slice(0, 4);
  return {
    title: String(raw.title).replace(/^\(\d\)\s*/, ''),
    chapterTitle: lessonTitle,
    readingTime: raw.readingTime ?? '6',
    objective: raw.objective,
    mateIntro: raw.hook ?? raw.mateIntro,
    keyInsight: raw.keyInsight ?? recap[0] ?? narrative[0]?.text,
    concepts: [],
    narrative,
    visualKind: raw.visualKind,
    visualHeading: raw.visual?.title ?? raw.visualHeading,
    visualIntro: raw.visual?.subtitle ?? raw.visualIntro,
    imageAlt: raw.visual?.ariaLabel ?? raw.imageAlt ?? `Educational visual for ${raw.title}`,
    keyTerms: raw.keyTerms ?? [],
    recap,
    chapterRecap: raw.chapterRecap ?? recap[recap.length - 1] ?? 'Apply the mechanism to a company and keep every number attached to its scope.',
    deepDiveTitle: raw.deepDive?.title ?? raw.deepDiveTitle ?? 'Dive Deeper',
    body: <div className="space-y-4">{raw.body}{raw.deepDive?.body ? <p>{raw.deepDive.body}</p> : raw.deepDive?.text ? <p>{raw.deepDive.text}</p> : null}</div>,
    sources: citePfM3(...sourceIds),
  };
}

function lessonQuiz(questions: PackagedFoodQuestion[]): PackagedFoodQuestion[] {
  const paired = questions.length % 2 === 0 && questions.every((question, index) => question.id.endsWith(index % 2 ? '-b' : '-a'));
  if (!paired) return questions;
  const pairs: Array<[PackagedFoodQuestion, PackagedFoodQuestion]> = [];
  for (let index = 0; index < questions.length; index += 2) pairs.push([questions[index], questions[index + 1]]);
  return selectLessonQuestions(pairs, pairs.map(([question]) => question.moduleId));
}

const rawLessons = [PACKAGED_FOOD_M3_LESSON1, PACKAGED_FOOD_M3_LESSON2, PACKAGED_FOOD_M3_LESSON3, PACKAGED_FOOD_M3_LESSON4, PACKAGED_FOOD_M3_LESSON5, PACKAGED_FOOD_M3_LESSON6] as any[];
const chapterTitles = ['3.1 Industry Business Models', '3.2 Products, Services & Segmentation', '3.3 Customer Segments & Needs', '3.4 Revenue Streams & Cost Structure', '3.5 Distribution & Sales Channels', '3.6 Industry Ecosystem & Stakeholders'];
const sourceIds: PackagedFoodM3SourceId[][] = [
  ['pf-m03-s01', 'pf-m03-s02', 'pf-m03-s05', 'pf-m03-s06', 'pf-m03-s07', 'pf-m03-s09', 'pf-m03-s10'],
  ['pf-m03-s01', 'pf-m03-s04', 'pf-m03-s05', 'pf-m03-s07'],
  ['pf-m03-s05', 'pf-m03-s07'],
  ['pf-m03-s01', 'pf-m03-s05', 'pf-m03-s07', 'pf-m03-s10'],
  ['pf-m03-s07', 'pf-m03-s08'],
  ['pf-m03-s01', 'pf-m03-s03', 'pf-m03-s04', 'pf-m03-s08'],
];
const nextLessons = ['Products, Services & Segmentation', 'Customer Segments & Needs', 'Revenue Streams & Cost Structure', 'Distribution & Sales Channels', 'Industry Ecosystem & Stakeholders', 'Module 04 — Competitive Landscape'];

export const PACKAGED_FOOD_MODULE03_DECKS: Record<string, PackagedFoodM3CardData[]> = {};
export const PACKAGED_FOOD_MODULE03_QUIZZES: Record<string, PackagedFoodQuestion[]> = {};
export const PACKAGED_FOOD_MODULE03_TAKEAWAYS: Record<string, PackagedFoodTakeaways> = {};
rawLessons.forEach((raw, index) => {
  const key = PACKAGED_FOOD_MODULE03_LESSONS[index].title;
  const points: string[] = raw.takeaways ?? [];
  PACKAGED_FOOD_MODULE03_DECKS[key] = raw.chapters.map((card: any) => normalizeChapter(card, chapterTitles[index], sourceIds[index]));
  PACKAGED_FOOD_MODULE03_QUIZZES[key] = lessonQuiz(raw.quiz);
  PACKAGED_FOOD_MODULE03_TAKEAWAYS[key] = {
    learned: points[0] ?? `You can apply the core mechanisms in ${key}.`,
    keyTakeaways: points.slice(0, 5),
    businessImplications: points[5] ?? 'Use the model to identify the commercial lever, operating constraint and evidence needed for a decision.',
    remember: points[points.length - 1] ?? 'Keep company results separate from industry benchmarks.',
    nextLesson: nextLessons[index],
  };
});
applyChapterVisualText(PACKAGED_FOOD_MODULE03_DECKS, PACKAGED_FOOD_M3_VISUALS);
export function isPackagedFoodM3VisualKind(value: string): value is PackagedFoodM3VisualKind { return value.startsWith('packaged-food-m3-'); }
