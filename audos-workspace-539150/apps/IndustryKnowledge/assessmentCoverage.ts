import { chapterProgress, lessonTakeawaysAvailable, parseAssessmentRecord, planAssessment, withChapterCheck } from './lessonFlowCore';
import type { AssessmentPlan, AssessmentRecord, ChapterLike, QuestionLike } from './lessonFlowCore';
import type { LearningModeCatalog } from './learningModeAudit';

// Read-only Knowledge Check coverage for the whole catalogue (`loadLearningModeCatalog` in App.tsx: every
// implemented sub-industry, every lesson card and the deck the shared dispatcher returns for it). Counts are
// recalculated from the live decks on every run, nothing names a curriculum, and nothing is written: the
// reachability check below plays a fresh learner against an in-memory record only.

export type CoverageIssue = 'no-questions' | 'invalid-data';

export interface CoverageChapter {
  curriculumId: string;
  lessonTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  issue: CoverageIssue;
  /** Why questions that named this chapter were dropped. */
  reasons: string[];
}

export interface CurriculumCoverage {
  id: string;
  name: string;
  lessons: number;
  chapters: number;
  chaptersWithValidAssessment: number;
  chaptersWithZeroQuestions: number;
  chaptersWithInvalidData: number;
  blockedBeforeFix: number;
  blockedNow: number;
}

export interface AssessmentCoverage {
  curricula: number;
  /** Lesson cards in the catalogue, and the ones a learner can open with a resolved deck. */
  lessons: number;
  openableLessons: number;
  /** Chapters in openable lessons, including held ones. */
  chapters: number;
  heldChapters: number;
  chaptersWithValidAssessment: number;
  /** Not held and no usable question (none authored, or every one invalid). */
  chaptersWithZeroQuestions: number;
  /** Not held and at least one question naming the chapter was dropped as invalid. */
  chaptersWithInvalidData: number;
  questions: number;
  invalidQuestions: number;
  lessonsWithoutAnyAssessment: number;
  /** Chapters a learner who submits every available check still could not open under the previous gate. */
  blockedBeforeFix: number;
  /** The same under the current engine. */
  blockedNow: number;
  /** Lessons whose Final Lesson Takeaways stay locked after every available check is submitted. */
  takeawaysUnreachable: number;
  affected: CoverageChapter[];
  perCurriculum: CurriculumCoverage[];
}

const submitted = (record: AssessmentRecord, index: number): AssessmentRecord => withChapterCheck(record, index, {
  latest: 0, best: 0, attempts: [{ at: 'coverage-check', correct: 0, total: 1, accuracy: 0 }], submittedAt: 'coverage-check',
});

/** Submits every check the engine offers, in order, until nothing new opens. Any score counts, as in the reader. */
function playThrough(plan: AssessmentPlan, cards: ChapterLike[]) {
  let record = parseAssessmentRecord(null);
  for (let pass = 0; pass <= cards.length; pass += 1) {
    const progress = chapterProgress({ plan, record, completed: [], legacyCompletedChapters: [], lessonLegacyComplete: false });
    const next = progress.find((chapter) => chapter.unlocked && !chapter.restricted && !chapter.submitted && plan.chapters[chapter.index]?.status === 'ready');
    if (!next) {
      return {
        locked: progress.filter((chapter) => !chapter.restricted && !chapter.unlocked).length,
        takeaways: lessonTakeawaysAvailable(progress),
      };
    }
    record = submitted(record, next.index);
  }
  return { locked: 0, takeaways: true };
}

/** The gate before this fix: every chapter after a check that cannot be submitted stayed locked. */
function blockedUnderPreviousGate(plan: AssessmentPlan): number {
  let open = true;
  let blocked = 0;
  plan.chapters.forEach((chapter) => {
    if (chapter.status === 'under-review') return;
    if (!open) blocked += 1;
    if (chapter.status !== 'ready') open = false;
  });
  return blocked;
}

/** Plain-text report: totals, then each curriculum, then every affected chapter. */
export function coverageReport(coverage: AssessmentCoverage): string[] {
  return [
    `Knowledge Check coverage: ${coverage.curricula} curricula · ${coverage.openableLessons}/${coverage.lessons} openable lessons · ${coverage.chapters} chapters (${coverage.heldChapters} held for review)`,
    `  valid assessment: ${coverage.chaptersWithValidAssessment} · zero usable questions: ${coverage.chaptersWithZeroQuestions} · invalid question data: ${coverage.chaptersWithInvalidData} (${coverage.invalidQuestions} of ${coverage.questions} questions dropped)`,
    `  lessons without any assessment: ${coverage.lessonsWithoutAnyAssessment} · blocked by a missing assessment before the fix: ${coverage.blockedBeforeFix} · blocked now: ${coverage.blockedNow} · takeaways unreachable: ${coverage.takeawaysUnreachable}`,
    ...coverage.perCurriculum.map((item) => `  ${item.blockedNow ? '✗' : '✓'} ${item.name}: ${item.chaptersWithValidAssessment}/${item.chapters} chapters assessed · ${item.chaptersWithZeroQuestions} without questions · ${item.chaptersWithInvalidData} with invalid data · blocked before ${item.blockedBeforeFix}, now ${item.blockedNow}`),
    ...coverage.affected.map((item) => `      ${item.curriculumId} › ${item.lessonTitle} › Chapter ${item.chapterNumber} ${item.chapterTitle}: ${item.issue}${item.reasons.length ? ` (${item.reasons.join('; ')})` : ''}`),
  ];
}

export function auditAssessmentCoverage(catalog: LearningModeCatalog): AssessmentCoverage {
  const result: AssessmentCoverage = {
    curricula: catalog.subIndustries.length, lessons: 0, openableLessons: 0, chapters: 0, heldChapters: 0,
    chaptersWithValidAssessment: 0, chaptersWithZeroQuestions: 0, chaptersWithInvalidData: 0, questions: 0, invalidQuestions: 0,
    lessonsWithoutAnyAssessment: 0, blockedBeforeFix: 0, blockedNow: 0, takeawaysUnreachable: 0, affected: [], perCurriculum: [],
  };
  catalog.subIndustries.forEach((entry) => {
    const own: CurriculumCoverage = {
      id: entry.id, name: entry.name, lessons: entry.lessons.length, chapters: 0,
      chaptersWithValidAssessment: 0, chaptersWithZeroQuestions: 0, chaptersWithInvalidData: 0, blockedBeforeFix: 0, blockedNow: 0,
    };
    result.lessons += entry.lessons.length;
    entry.lessons.forEach((lesson) => {
      const cards = lesson.deck?.cards ?? [];
      if (lesson.blocked || !cards.length) return;
      result.openableLessons += 1;
      const questions: QuestionLike[] = Array.isArray(lesson.deck?.quizQuestions) ? lesson.deck!.quizQuestions! : [];
      const plan = planAssessment(questions, cards);
      result.questions += questions.length;
      result.invalidQuestions += plan.excluded.length;
      let assessable = 0;
      plan.chapters.forEach((chapter) => {
        own.chapters += 1;
        if (chapter.status === 'under-review') {
          result.heldChapters += 1;
          return;
        }
        const reasons = Array.from(new Set(plan.excluded.filter((item) => item.chapter === chapter.index + 1).map((item) => item.reason)));
        if (chapter.status === 'ready') {
          assessable += 1;
          own.chaptersWithValidAssessment += 1;
        } else {
          own.chaptersWithZeroQuestions += 1;
        }
        if (reasons.length) own.chaptersWithInvalidData += 1;
        if (chapter.status !== 'ready' || reasons.length) {
          result.affected.push({
            curriculumId: entry.id,
            lessonTitle: lesson.displayTitle,
            chapterNumber: chapter.index + 1,
            chapterTitle: String(cards[chapter.index]?.title ?? ''),
            issue: chapter.status === 'ready' ? 'invalid-data' : 'no-questions',
            reasons,
          });
        }
      });
      if (!assessable) result.lessonsWithoutAnyAssessment += 1;
      own.blockedBeforeFix += blockedUnderPreviousGate(plan);
      const play = playThrough(plan, cards);
      own.blockedNow += play.locked;
      if (!play.takeaways) result.takeawaysUnreachable += 1;
    });
    result.chapters += own.chapters;
    result.chaptersWithValidAssessment += own.chaptersWithValidAssessment;
    result.chaptersWithZeroQuestions += own.chaptersWithZeroQuestions;
    result.chaptersWithInvalidData += own.chaptersWithInvalidData;
    result.blockedBeforeFix += own.blockedBeforeFix;
    result.blockedNow += own.blockedNow;
    result.perCurriculum.push(own);
  });
  return result;
}
