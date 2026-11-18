// Chapter progression when a Knowledge Check has zero usable questions, fails to load or holds malformed data
// (QA-01…QA-15). Pure functions from the shared engine only, so it runs without a DOM:
//   npx tsx apps/IndustryKnowledge/__tests__/lessonFlowProgression.test.ts
import {
  assessmentDiagnostics, canSubmit, chapterProgress, journeyRows, lessonChecksComplete, lessonTakeawaysAvailable, parseAssessmentRecord,
  planAssessment, prepareChapterFlowState, requiredChecks, resolveStartChapter, startOrResumeDraft, submitDraft, withChapterCheck,
} from '../lessonFlowCore';
import type { AssessmentRecord, ChapterLike, QuestionLike } from '../lessonFlowCore';
import { varyAnswerPositions } from '../readerCopy';

type Case = { id: string; name: string; run: () => void };

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (left: unknown, right: unknown, message: string) => assert(JSON.stringify(left) === JSON.stringify(right), `${message}: expected ${JSON.stringify(right)}, got ${JSON.stringify(left)}`);

const chapters = (count: number, held: number[] = []): ChapterLike[] => Array.from({ length: count }, (_, index) => ({
  title: `Chapter ${index + 1}`,
  ...(held.includes(index) ? { reviewStatus: 'Under Review' } : {}),
}));

const question = (chapter: number, n = 1): QuestionLike => ({
  id: `q${chapter}-${n}`,
  question: `Question ${n} for chapter ${chapter}?`,
  options: ['a', 'b', 'c', 'd'].map((id) => ({ id, text: `Option ${id}` })),
  correctOptionId: 'a',
  explanation: 'Because.',
  moduleId: String(chapter),
});

/** Two questions for every listed chapter (1-based). */
const questionsFor = (chapterNumbers: number[]) => chapterNumbers.flatMap((chapter) => [question(chapter, 1), question(chapter, 2)]);

const progressOf = (cards: ChapterLike[], questions: QuestionLike[] | undefined, record: AssessmentRecord = parseAssessmentRecord(null), extra: { completed?: number[]; legacy?: number[]; lessonComplete?: boolean; load?: 'loaded' | 'loading' | 'failed' } = {}) => chapterProgress({
  plan: planAssessment(questions, cards, extra.load ?? 'loaded'),
  record,
  completed: extra.completed ?? [],
  legacyCompletedChapters: extra.legacy ?? [],
  lessonLegacyComplete: extra.lessonComplete ?? false,
});

/** Submits chapter `index` through the real draft → submit path with the given answers (default: all correct). */
function submit(record: AssessmentRecord, cards: ChapterLike[], questions: QuestionLike[], index: number, answer = 'a'): AssessmentRecord {
  const plan = planAssessment(questions, cards);
  const chapterQuestions = plan.chapters[index].questions;
  let check = startOrResumeDraft(record.chapters[String(index)] ?? parseAssessmentRecord(null), chapterQuestions, '2026-11-15T00:00:00.000Z');
  chapterQuestions.forEach((item) => { check = { ...check, draft: { ...check.draft!, answers: { ...check.draft!.answers, [item.id]: answer } } }; });
  assert(canSubmit(check, chapterQuestions), `chapter ${index + 1} should be submittable`);
  const result = submitDraft(check, chapterQuestions, '2026-11-15T00:00:01.000Z');
  assert(result, `chapter ${index + 1} submit returned null`);
  return withChapterCheck(record, index, result.record);
}

const unlocked = (progress: ReturnType<typeof progressOf>) => progress.map((chapter) => chapter.unlocked);

const cases: Case[] = [
  {
    id: 'QA-01', name: 'valid MCQs keep the sequential flow', run: () => {
      const cards = chapters(3);
      const questions = questionsFor([1, 2, 3]);
      let record = parseAssessmentRecord(null);
      same(unlocked(progressOf(cards, questions, record)), [true, false, false], 'only chapter 1 open at start');
      record = submit(record, cards, questions, 0);
      same(unlocked(progressOf(cards, questions, record)), [true, true, false], 'check 1 opens chapter 2');
      record = submit(record, cards, questions, 1);
      record = submit(record, cards, questions, 2);
      const progress = progressOf(cards, questions, record);
      assert(lessonChecksComplete(progress) && lessonTakeawaysAvailable(progress), 'all checks submitted completes the lesson');
      same(record.chapters['0'].attempts.length, 1, 'one attempt recorded per submit');
    },
  },
  {
    id: 'QA-02', name: 'a zero-MCQ chapter does not deadlock and records nothing', run: () => {
      const cards = chapters(3);
      const questions = questionsFor([1, 3]);
      let record = parseAssessmentRecord(null);
      record = submit(record, cards, questions, 0);
      const progress = progressOf(cards, questions, record);
      const empty = progress[1];
      assert(empty.unlocked && empty.notAssessable, 'chapter 2 open and not assessable');
      assert(!empty.complete && !empty.submitted, 'chapter 2 is neither passed nor failed');
      same(empty.check, 'under-preparation', 'check 2 shows the not-available state');
      assert(progress[2].unlocked, 'chapter 3 is reachable');
      same(record.chapters['1'], undefined, 'no record written for the missing check');
    },
  },
  {
    id: 'QA-03', name: 'the chapter after a zero-MCQ chapter is reachable at once (stale render safe)', run: () => {
      const cards = chapters(3);
      const questions = questionsFor([1, 3]);
      const record = submit(parseAssessmentRecord(null), cards, questions, 0);
      const progress = progressOf(cards, questions, record, { completed: [] });
      // The reader's selectChapter reads progress from the same render, before any read marker is saved.
      assert(progress[2].unlocked, 'chapter 3 already unlocked in the render that shows chapter 2');
      same(resolveStartChapter(progress, 2), 2, 'a refresh or link to chapter 3 lands on chapter 3');
      const rows = journeyRows(progress, cards, 1, 'learning', (card) => String(card.title), () => 1);
      same(rows.map((row) => row.state), ['completed', 'current', 'available'], 'journey states');
    },
  },
  {
    id: 'QA-04', name: 'completed chapter history is preserved, even when a check later has no questions', run: () => {
      const cards = chapters(3);
      const questions = questionsFor([1, 2, 3]);
      let record = submit(parseAssessmentRecord(null), cards, questions, 0);
      record = submit(record, cards, questions, 1);
      const before = JSON.stringify(record);
      const progress = progressOf(cards, questionsFor([1, 3]), record);
      assert(progress[1].submitted && progress[1].complete, 'earlier submission still counts');
      same(JSON.stringify(record), before, 'record untouched by progress evaluation');
      const historical = progressOf(cards, questionsFor([3]), parseAssessmentRecord(null), { legacy: [0, 1] });
      assert(historical[0].historical && historical[1].historical && historical[2].unlocked, 'pre-flow "Mark complete" chapters keep access');
    },
  },
  {
    id: 'QA-05', name: 'a low score still submits under the existing policy', run: () => {
      const cards = chapters(2);
      const questions = questionsFor([1, 2]);
      const record = submit(parseAssessmentRecord(null), cards, questions, 0, 'b');
      same(record.chapters['0'].latest, 0, '0% recorded as the latest score');
      assert(progressOf(cards, questions, record)[1].unlocked, 'any score opens the next chapter (no pass threshold)');
    },
  },
  {
    id: 'QA-06', name: 'malformed questions are dropped safely and reported', run: () => {
      const cards = chapters(3);
      const malformed = [
        null, 'text', { id: 'no-options', question: 'Q?', correctOptionId: 'a', explanation: 'E', moduleId: '2' },
        { ...question(2), id: 'null-option', options: [null, ...question(2).options.slice(1)] },
        { ...question(2), id: 'object-text', question: { nested: true } },
        { ...question(2), id: 'bad-key', correctOptionId: 'z' },
        { ...question(9), id: 'bad-chapter' },
        question(1, 1), question(1, 1),
      ] as unknown as QuestionLike[];
      const questions = [...malformed, question(3)];
      const plan = planAssessment(questions, cards);
      same(plan.chapters.map((chapter) => chapter.status), ['ready', 'under-preparation', 'ready'], 'chapter 2 has only invalid questions');
      same(plan.excluded.map((item) => item.reason), [
        'not a question object', 'not a question object', 'expected 4 options, found 0', 'malformed option', 'empty question',
        'answer key does not match one option', 'invalid chapter reference 9', 'duplicate id',
      ], 'every malformed question is excluded with a reason');
      same(plan.excluded.filter((item) => item.chapter === 2).length, 4, 'invalid questions are attributed to chapter 2');
      const diagnostics = assessmentDiagnostics(plan);
      assert(diagnostics && diagnostics.notAssessable.join() === '2' && diagnostics.excluded.length === 8, 'diagnostics list the gap');
      assert(varyAnswerPositions(malformed) === malformed, 'answer rotation leaves malformed data for the engine instead of throwing');
      const record = submit(parseAssessmentRecord(null), cards, questions, 0);
      assert(progressOf(cards, questions, record)[2].unlocked, 'path continues past the chapter with invalid data');
      same(assessmentDiagnostics(planAssessment(questionsFor([1, 2, 3]), cards)), null, 'clean lesson has no diagnostics');
    },
  },
  {
    id: 'QA-12', name: 'a failed load is never treated as an empty or passed check', run: () => {
      const cards = chapters(3);
      const failed = planAssessment(undefined, cards, 'failed');
      same(failed.mode, 'unavailable', 'failed load mode');
      same(failed.chapters.map((chapter) => chapter.status), ['unavailable', 'unavailable', 'unavailable'], 'failed chapters are unavailable, not under preparation');
      const progress = progressOf(cards, undefined, parseAssessmentRecord(null), { load: 'failed' });
      same(unlocked(progress), [true, false, false], 'chapters after a failed check stay locked');
      same(progress[0].check, 'unavailable', 'check shows the load-error state');
      assert(!progress[0].complete && !lessonTakeawaysAvailable(progress), 'nothing counts as a success');
      const record = submit(parseAssessmentRecord(null), cards, questionsFor([1, 2, 3]), 0);
      const kept = progressOf(cards, undefined, record, { load: 'failed' });
      assert(kept[0].submitted && kept[1].unlocked, 'an existing submission still counts during a load failure');
      same(record.chapters['0'].attempts.length, 1, 'existing attempts are not overwritten');
      same(unlocked(progressOf(cards, [], parseAssessmentRecord(null), { load: 'loaded' })), [true, true, true], 'a genuinely empty assessment does not block');
      same(planAssessment(questionsFor([1, 2, 3]), cards, 'loaded').mode, 'reduced', 'retry with questions restores the normal plan');
    },
  },
  {
    id: 'QA-13', name: 'one shared rule, no curriculum-specific branch', run: () => {
      const cards = chapters(2);
      const a = progressOf(cards, questionsFor([2]));
      const b = progressOf([...cards], questionsFor([2]).map((item) => ({ ...item, id: `other-${item.id}` })));
      same(a.map((chapter) => [chapter.unlocked, chapter.check]), b.map((chapter) => [chapter.unlocked, chapter.check]), 'identical data gives identical progression');
    },
  },
  {
    id: 'QA-14', name: 'boundary cases', run: () => {
      // First chapter without questions.
      same(unlocked(progressOf(chapters(3), questionsFor([2, 3]))), [true, true, false], 'first chapter missing: chapter 2 open, chapter 3 waits for check 2');
      // Final chapter without questions.
      const cards = chapters(3);
      const finalMissing = questionsFor([1, 2]);
      let record = submit(parseAssessmentRecord(null), cards, finalMissing, 0);
      record = submit(record, cards, finalMissing, 1);
      const finalProgress = progressOf(cards, finalMissing, record);
      assert(finalProgress[2].unlocked && lessonChecksComplete(finalProgress) && lessonTakeawaysAvailable(finalProgress), 'final chapter missing: lesson completes, takeaways open');
      // Single-chapter lessons.
      const single = progressOf(chapters(1), []);
      assert(single[0].unlocked && lessonTakeawaysAvailable(single) && !lessonChecksComplete(single), 'single chapter without questions: takeaways open, no completion invented');
      const singleValid = submit(parseAssessmentRecord(null), chapters(1), questionsFor([1]), 0);
      assert(lessonChecksComplete(progressOf(chapters(1), questionsFor([1]), singleValid)), 'single chapter with questions completes on submit');
      // Consecutive missing chapters.
      const consecutive = questionsFor([1, 4]);
      const cards4 = chapters(4);
      same(unlocked(progressOf(cards4, consecutive)), [true, false, false, false], 'before check 1 everything after it waits');
      const after = progressOf(cards4, consecutive, submit(parseAssessmentRecord(null), cards4, consecutive, 0));
      same(unlocked(after), [true, true, true, true], 'after check 1 both missing chapters and chapter 4 open');
      same(journeyRows(progressOf(cards4, consecutive), cards4, 0, 'learning', String, () => 1).map((row) => row.lockedBy), [null, 1, 1, 1], 'locked rows name the real blocking check');
      // Whole lesson without assessments.
      const none = progressOf(chapters(3), undefined);
      same(unlocked(none), [true, true, true], 'no assessments: every chapter open');
      assert(lessonTakeawaysAvailable(none) && !lessonChecksComplete(none) && requiredChecks(none).length === 0, 'no assessments: takeaways open, no checks required, no completion');
      // Held chapters are still skipped.
      same(unlocked(progressOf(chapters(3, [1]), questionsFor([1, 3]))), [true, false, false], 'held chapter keeps its place; check 1 still gates chapter 3');
    },
  },
  {
    id: 'QA-15', name: 'progress created under the previous logic stays valid', run: () => {
      const cards = chapters(3);
      const legacy = parseAssessmentRecord({ latest: 70, best: 80, custom: 'kept' });
      same([legacy.latest, legacy.best, legacy.custom], [70, 80, 'kept'], 'legacy lesson-level fields are kept');
      same(unlocked(progressOf(cards, questionsFor([1, 3]), legacy, { lessonComplete: true })), [true, true, true], 'legacy completion keeps every chapter open');
      // A learner stuck behind a missing check under the old gate: chapter 2 read, check 2 never submittable.
      const stuck = submit(parseAssessmentRecord(null), cards, questionsFor([1, 3]), 0);
      const before = JSON.stringify(stuck);
      const progress = progressOf(cards, questionsFor([1, 3]), stuck, { completed: [0, 1] });
      assert(progress[2].unlocked, 'the stuck learner can now reach chapter 3');
      same(JSON.stringify(stuck), before, 'no migration or rewrite of stored records');
      const migrated = prepareChapterFlowState<{ completed: number[]; migrations: string[]; legacyCompletedChapters?: number[] }>({ completed: [0, 1], migrations: [] });
      same(migrated.legacyCompletedChapters, [0, 1], 'pre-flow "Mark complete" chapters still become historical once');
    },
  },
];

export function runLessonFlowProgressionTests() {
  const failures: string[] = [];
  cases.forEach((item) => {
    try {
      item.run();
      console.log(`PASS ${item.id} ${item.name}`);
    } catch (error) {
      failures.push(`${item.id}: ${(error as Error).message}`);
      console.log(`FAIL ${item.id} ${item.name}: ${(error as Error).message}`);
    }
  });
  if (failures.length) throw new Error(`${failures.length} lesson-flow progression case(s) failed`);
  return cases.length;
}

runLessonFlowProgressionTests();
