import type { ReactNode } from 'react';
import type { PackagedFoodCardData, PackagedFoodQuestion, PackagedFoodSource, PackagedFoodTakeaways, PfQuizSeed } from './packagedFoodM1Core';
import { chapter, pairedQuiz } from './packagedFoodM1Core';
import { REVIEW_HOLDS } from './reviewHolds';
import { QUESTIONS_PER_LESSON } from './dairyQuizCore';

export type PackagedFoodM45VisualKind = `packaged-food-m${4 | 5}-${string}`;
export interface PfM45ChapterSpec {
  id: string;
  title: string;
  lessonTitle: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  narrative: [string, string, string, string, string];
  paragraphs: [string, string];
  visualKind: PackagedFoodM45VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: [string, string, string] | [string, string, string, string];
  deepDiveTitle: string;
  deepDive: string;
  sourceIds: string[];
  evidenceNote?: string;
  publicationFlag?: string;
}
export interface PfM45LessonSpec {
  title: string;
  description: string;
  chapters: PfM45ChapterSpec[];
  quizSeeds: PfQuizSeed[];
  takeaways: PackagedFoodTakeaways;
}

const LABELS = ['What it is', 'How it works', 'Global example', 'Vietnam example', 'Why it matters'] as const;

export function buildPfM45Module(moduleCode: '04' | '05', lessons: PfM45LessonSpec[], sources: Record<string, PackagedFoodSource>) {
  const decks: Record<string, PackagedFoodCardData[]> = {};
  const quizzes: Record<string, PackagedFoodQuestion[]> = {};
  const takeaways: Record<string, PackagedFoodTakeaways> = {};
  lessons.forEach((lesson, lessonIndex) => {
    decks[lesson.title] = lesson.chapters.map((spec) => chapter({
      title: spec.title,
      chapterTitle: spec.lessonTitle,
      readingTime: '6',
      objective: spec.objective,
      mateIntro: spec.mateIntro,
      keyInsight: spec.keyInsight,
      narrative: spec.narrative.map((text, index) => ({ label: LABELS[index], text })),
      visualKind: spec.visualKind as any,
      visualHeading: spec.visualHeading,
      visualIntro: spec.visualIntro,
      imageAlt: spec.imageAlt,
      keyTerms: spec.keyTerms,
      recap: spec.recap,
      chapterRecap: spec.recap[spec.recap.length - 1],
      deepDiveTitle: spec.deepDiveTitle,
      body: (
        <div className="space-y-4">
          {spec.publicationFlag ? <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-bold text-red-800">{spec.publicationFlag}</div> : null}
          <p>{spec.paragraphs[0]}</p>
          <p>{spec.paragraphs[1]}</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <p className="font-black text-slate-900">{spec.deepDiveTitle}</p>
            <p className="mt-1">{spec.deepDive}</p>
          </div>
          {spec.evidenceNote ? <p className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-6 text-slate-600"><span className="font-black text-slate-800">Evidence note: </span>{spec.evidenceNote}</p> : null}
        </div>
      ),
      sources: spec.sourceIds.map((id) => sources[id]).filter(Boolean),
    }));
    quizzes[lesson.title] = pairedQuiz(`pf-m${moduleCode}-${lessonIndex + 1}`, lesson.quizSeeds);
    takeaways[lesson.title] = lesson.takeaways;
  });
  return { decks, quizzes, takeaways };
}

export function validatePfM45Module(moduleCode: '04' | '05', lessons: PfM45LessonSpec[], sources: Record<string, PackagedFoodSource>, built: ReturnType<typeof buildPfM45Module>) {
  const failures: string[] = [];
  if (lessons.length !== 5) failures.push(`expected 5 lessons, found ${lessons.length}`);
  const chapterIds = new Set<string>();
  const chapterTitles = new Set<string>();
  const visualKinds = new Set<string>();
  lessons.forEach((lesson, lessonIndex) => {
    if (lesson.chapters.length !== 3) failures.push(`${lesson.title}: expected 3 chapters`);
    lesson.chapters.forEach((card) => {
      if (chapterIds.has(card.id)) failures.push(`duplicate chapter id ${card.id}`); chapterIds.add(card.id);
      if (chapterTitles.has(card.title)) failures.push(`duplicate chapter title ${card.title}`); chapterTitles.add(card.title);
      if (visualKinds.has(card.visualKind)) failures.push(`duplicate visual ${card.visualKind}`); visualKinds.add(card.visualKind);
      if (!card.objective || !card.mateIntro || !card.keyInsight || card.narrative.length !== 5 || !card.deepDive || card.recap.length < 2 || card.keyTerms.length < 2) failures.push(`${card.id}: missing required learning section`);
      if (!card.visualKind.startsWith(`packaged-food-m${Number(moduleCode)}-`)) failures.push(`${card.id}: invalid visual namespace`);
      if (!card.sourceIds.length || card.sourceIds.some((id) => !id.startsWith(`pf-m${moduleCode}-`) || !sources[id])) failures.push(`${card.id}: invalid source id`);
      const lessonIsHeld = REVIEW_HOLDS.some((hold) => hold.moduleKey === `PACKAGED_FOOD_MODULE${moduleCode}` && hold.lesson === lesson.title && hold.scope === 'lesson');
      if (moduleCode === '05' && lesson.title === 'Regulatory & Sustainability Trends' && (!lessonIsHeld || !card.publicationFlag?.includes('Do Not Publish'))) failures.push(`${card.id}: legal publication gate missing or not registered`);
    });
    const questions = built.quizzes[lesson.title] ?? [];
    if (questions.length !== QUESTIONS_PER_LESSON) failures.push(`${lesson.title}: expected ${QUESTIONS_PER_LESSON} MCQs, found ${questions.length}`);
    questions.forEach((question) => {
      if (question.options.length !== 4 || !question.options.some((option) => option.id === question.correctOptionId) || !question.explanation || !['1','2','3'].includes(question.moduleId)) failures.push(`${lesson.title}: malformed MCQ ${question.id}`);
    });
    const summary = built.takeaways[lesson.title];
    if (!summary || summary.keyTakeaways.length < 3 || summary.keyTakeaways.length > 5 || !summary.learned || !summary.businessImplications || !summary.remember) failures.push(`${lesson.title}: incomplete final takeaways`);
  });
  if (chapterIds.size !== 15) failures.push(`expected 15 unique chapters, found ${chapterIds.size}`);
  if (visualKinds.size !== 15) failures.push(`expected 15 unique visuals, found ${visualKinds.size}`);
  if (failures.length) throw new Error(`Packaged Food Module ${moduleCode} structural QA failed: ${failures.join('; ')}`);
  return { lessons: lessons.length, chapters: chapterIds.size, visuals: visualKinds.size, questions: lessons.reduce((sum, lesson) => sum + built.quizzes[lesson.title].length, 0), legalGate: moduleCode === '05' } as const;
}

export function terms(...pairs: Array<[string, string]>) { return pairs.map(([term, definition]) => ({ term, definition })); }
export function lessonTakeaways(learned: string, keyTakeaways: string[], businessImplications: string, remember: string, nextLesson: string): PackagedFoodTakeaways {
  return { learned, keyTakeaways, businessImplications, remember, nextLesson };
}
export function quiz(chapter: string, objective: string, question: string, application: string, correct: string, wrong: [string, string, string], explanation: string): PfQuizSeed {
  return { chapter, objective, question, application, correct, wrong, explanation };
}
export type PfM45SourceMap = Record<string, PackagedFoodSource>;
export type PfM45VisualRenderer = (kind: string) => ReactNode;
