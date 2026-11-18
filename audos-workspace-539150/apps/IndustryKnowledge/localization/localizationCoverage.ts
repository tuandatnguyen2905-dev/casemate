// Vietnamese coverage checker. Counts only content that the learning UI really renders in Vietnamese:
// a chapter counts when every General Info field passed the freshness and number checks; a question, card,
// activity or case counts only when its overlay applied. English fallbacks, stale translations and
// placeholders never count. Run through __tests__/localizationVi.test.ts.
import type { BankingCardData } from '../commercialBankingCore';
import type { LessonLocalizer, LocalizableQuestion } from './lessonLocalization';
import { uiVocabularySize } from './uiText';

export interface Ratio { done: number; total: number }

export interface CurriculumCoverageRow {
  curriculum: string;
  industryId: string;
  modules: number;
  lessons: number;
  chapters: number;
  viGeneralInfoChapters: Ratio;
  viGeneralInfoLessons: Ratio;
  viFlashcards: Ratio;
  viActivities: Ratio;
  viAssessments: Ratio;
  status: 'Pilot — partially Vietnamese' | 'English only (Vietnamese fallback)';
}

export interface LocalizationCoverageReport {
  interface: { labels: number; note: string };
  generalInfo: Ratio & { staleOrPartial: string[] };
  flashcards: { classic: Ratio; interactive: Ratio; stale: string[] };
  matchSort: Ratio & { stale: string[] };
  knowledgeCheck: Ratio & { englishFallback: string[] };
  caseStudies: Ratio & { stale: string[] };
  glossary: { curricula: Array<{ curriculumId: string; terms: number; withVietnamese: number }> };
  idDrift: string[];
  rows: CurriculumCoverageRow[];
}

export interface CoverageModuleData {
  moduleTitle: string;
  decks: Record<string, BankingCardData[]>;
  quizzes: Record<string, LocalizableQuestion[]>;
  takeaways: Record<string, unknown>;
}

export interface CoverageInputs {
  commercialBanking: CoverageModuleData[];
  localizerFor: (module: number) => Promise<LessonLocalizer>;
  cases: { total: number; fresh: string[]; stale: string[] };
  flashcards: { classic: Ratio; interactive: Ratio; stale: string[]; lessonCounts: Record<string, Ratio> };
  matchSort: { ratio: Ratio; stale: string[]; lessonCounts: Record<string, Ratio> };
  glossary: Array<{ curriculumId: string; terms: number; withVietnamese: number }>;
  /** Other curricula in the Vietnamese-capable group, reported as English only. */
  otherCurricula: Array<{ curriculum: string; industryId: string; modules: number; lessons: number; chapters: number }>;
}

const ratio = (done: number, total: number): Ratio => ({ done, total });
export const formatRatio = ({ done, total }: Ratio) => `${done}/${total}`;

export async function computeLocalizationCoverage(inputs: CoverageInputs): Promise<LocalizationCoverageReport> {
  const idDrift: string[] = [];
  const staleOrPartial: string[] = [];
  const englishFallback: string[] = [];
  let chapters = 0;
  let viChapters = 0;
  let lessons = 0;
  let viLessons = 0;
  let questions = 0;
  let viQuestions = 0;

  for (const [index, module] of inputs.commercialBanking.entries()) {
    const localizer = await inputs.localizerFor(index + 1);
    for (const lessonTitle of Object.keys(module.decks)) {
      const cards = module.decks[lessonTitle] ?? [];
      const quiz = module.quizzes[lessonTitle] ?? [];
      const output = localizer.localize({ lessonTitle, cards, quizQuestions: quiz, finalTakeaways: module.takeaways[lessonTitle] });
      lessons += 1;
      chapters += cards.length;
      const translated = output.locale.chapters.filter((chapter) => chapter.status === 'translated').length;
      viChapters += translated;
      if (cards.length && translated === cards.length) viLessons += 1;
      output.locale.chapters.forEach((chapter, chapterIndex) => {
        if (chapter.status === 'partial' || chapter.status === 'stale') staleOrPartial.push(`${lessonTitle} ch${chapterIndex + 1}: ${chapter.status}${chapter.fallbackFields.length ? ` [${chapter.fallbackFields.join(', ')}]` : ''}`);
      });
      if (output.cards.length !== cards.length) idDrift.push(`${lessonTitle}: chapter count changed`);
      const localizedQuiz = output.quizQuestions ?? [];
      quiz.forEach((question, questionIndex) => {
        const other = localizedQuiz[questionIndex];
        const same = other && other.id === question.id && other.correctOptionId === question.correctOptionId
          && other.options.map((option) => option.id).join() === question.options.map((option) => option.id).join();
        if (!same) idDrift.push(`${lessonTitle}: question ${question.id} identity changed`);
      });
      questions += quiz.length;
      viQuestions += quiz.length - output.locale.quizFallbackIds.length;
      if (translated && output.locale.quizFallbackIds.length) englishFallback.push(`${lessonTitle}: ${output.locale.quizFallbackIds.join(', ')}`);
    }
  }

  const flashcardTotal = ratio(inputs.flashcards.classic.done + inputs.flashcards.interactive.done, inputs.flashcards.classic.total + inputs.flashcards.interactive.total);
  const rows: CurriculumCoverageRow[] = [
    {
      curriculum: 'Commercial Banking',
      industryId: 'banking-commercial',
      modules: inputs.commercialBanking.length,
      lessons,
      chapters,
      viGeneralInfoChapters: ratio(viChapters, chapters),
      viGeneralInfoLessons: ratio(viLessons, lessons),
      viFlashcards: flashcardTotal,
      viActivities: inputs.matchSort.ratio,
      viAssessments: ratio(viQuestions, questions),
      status: viChapters ? 'Pilot — partially Vietnamese' : 'English only (Vietnamese fallback)',
    },
    ...inputs.otherCurricula.map((row) => ({
      ...row,
      viGeneralInfoChapters: ratio(0, row.chapters),
      viGeneralInfoLessons: ratio(0, row.lessons),
      viFlashcards: ratio(0, 0),
      viActivities: ratio(0, 0),
      viAssessments: ratio(0, 0),
      status: 'English only (Vietnamese fallback)' as const,
    })),
  ];

  return {
    interface: { labels: uiVocabularySize(), note: 'Reader, Knowledge Check, chapter-check result and takeaways labels; Practice & Review chrome stays English.' },
    generalInfo: { ...ratio(viChapters, chapters), staleOrPartial },
    flashcards: { classic: inputs.flashcards.classic, interactive: inputs.flashcards.interactive, stale: inputs.flashcards.stale },
    matchSort: { ...inputs.matchSort.ratio, stale: inputs.matchSort.stale },
    knowledgeCheck: { ...ratio(viQuestions, questions), englishFallback },
    caseStudies: { ...ratio(inputs.cases.fresh.length, inputs.cases.total), stale: inputs.cases.stale },
    glossary: { curricula: inputs.glossary },
    idDrift,
    rows,
  };
}

export function formatCoverageMatrix(report: LocalizationCoverageReport): string {
  const header = ['Curriculum', 'Modules', 'Lessons', 'Chapters', 'VI General Info (chapters)', 'VI lessons complete', 'VI Flashcards', 'VI Activities', 'VI Assessments', 'Status'];
  const lines = report.rows.map((row) => [row.curriculum, row.modules, row.lessons, row.chapters, formatRatio(row.viGeneralInfoChapters), formatRatio(row.viGeneralInfoLessons), formatRatio(row.viFlashcards), formatRatio(row.viActivities), formatRatio(row.viAssessments), row.status].join(' | '));
  return [header.join(' | '), ...lines].join('\n');
}
