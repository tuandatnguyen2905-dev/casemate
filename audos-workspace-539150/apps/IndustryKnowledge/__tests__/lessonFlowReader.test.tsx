// The reader's lesson-flow hook end to end: Knowledge Check gating, refresh, Practice & Review context and lesson
// navigation, driven through the same handlers App.tsx's reader uses (its selectChapter reads `progress` from the
// render that handled the click). Needs react, react-dom and a DOM-like global with localStorage (jsdom
// preloaded), the same setup as learningModeRouting.test.tsx.
import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LessonFlowContext, useLessonFlowState } from '../lessonFlow';
import type { LessonFlowValue, ReaderPatch } from '../lessonFlow';
import { LESSON_PROGRESS_KEY, quizStorageKey, readerStorageKey } from '../lessonFlowCore';
import type { AssessmentLoadState, ChapterLike, QuestionLike } from '../lessonFlowCore';
import { getPracticeLesson } from '../../InteractiveLearning/practiceReview/practiceLessonStore';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type Flow = ReturnType<typeof useLessonFlowState<QuestionLike>>;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (left: unknown, right: unknown, message: string) => assert(JSON.stringify(left) === JSON.stringify(right), `${message}: expected ${JSON.stringify(right)}, got ${JSON.stringify(left)}`);

const cards = (count: number): ChapterLike[] => Array.from({ length: count }, (_, index) => ({ title: `Chapter ${index + 1}` }));
const questionsFor = (chapterNumbers: number[]): QuestionLike[] => chapterNumbers.map((chapter) => ({
  id: `q${chapter}`,
  question: `Question for chapter ${chapter}?`,
  options: ['a', 'b', 'c', 'd'].map((id) => ({ id, text: `Option ${id}` })),
  correctOptionId: 'a',
  explanation: 'Because.',
  moduleId: String(chapter),
}));

const IDENTITY = 'test-industry::Module::Lesson';
const KEY = 'test-lesson';
const readJson = (key: string) => JSON.parse(localStorage.getItem(key) ?? 'null');

function mountReader(options: {
  cards: ChapterLike[];
  questions?: QuestionLike[];
  load?: AssessmentLoadState;
  onRetry?: () => void;
  flow?: Partial<LessonFlowValue>;
}) {
  const ref: { current: Flow | null } = { current: null };
  const events: string[] = [];
  const readerKey = readerStorageKey(KEY);
  let props = { questions: options.questions, load: options.load ?? 'loaded' as AssessmentLoadState };
  const flowValue: LessonFlowValue = { identity: IDENTITY, isFirst: true, pending: false, previous: null, next: null, ...options.flow };

  function Reader({ questions, load }: { questions?: QuestionLike[]; load: AssessmentLoadState }) {
    const [saved] = useState(() => readJson(readerKey) ?? {});
    ref.current = useLessonFlowState({
      persistenceKey: KEY,
      cards: options.cards,
      quizQuestions: questions,
      assessmentLoad: load,
      onRetryAssessment: options.onRetry,
      initialCompleted: saved.completed ?? [],
      initialLegacyCompleted: saved.legacyCompletedChapters ?? [],
      initialView: saved.view,
      persistReader: (patch: ReaderPatch) => localStorage.setItem(readerKey, JSON.stringify({ ...(readJson(readerKey) ?? {}), ...patch })),
      onBack: () => events.push('back'),
    });
    return null;
  }

  const container = document.createElement('div');
  const root = createRoot(container);
  const render = () => act(() => {
    root.render(<LessonFlowContext.Provider value={flowValue}><Reader questions={props.questions} load={props.load} /></LessonFlowContext.Provider>);
  });
  render();

  const flow = () => {
    assert(ref.current, 'reader not rendered');
    return ref.current;
  };
  // Same rules as App.tsx: selectChapter, the reading-screen primary button and the check screens' continue.
  const selectChapter = (index: number) => {
    const current = flow();
    if (index === current.activeIndex && current.stage === 'learning') return;
    if (current.progress[index]?.unlocked) current.goToChapter(index);
  };
  const follow = (target: ReturnType<Flow['primaryAction']>) => {
    if (target.type === 'chapter') selectChapter(target.index);
    else if (target.type === 'back') events.push('back');
  };
  return {
    flow,
    events,
    primary: () => act(() => follow(flow().primaryAction())),
    continueAfterCheck: () => act(() => follow(flow().continueAfterCheck())),
    selectChapter: (index: number) => act(() => selectChapter(index)),
    openCheck: (index: number) => act(() => flow().openCheck(index)),
    answerAll: (option = 'a') => {
      const current = flow();
      (current.activePlan?.questions ?? []).forEach((question) => act(() => flow().select(question.id, option)));
      act(() => flow().submit());
    },
    rerender: (next: Partial<typeof props>) => {
      props = { ...props, ...next };
      render();
    },
    unmount: () => act(() => root.unmount()),
  };
}

type Case = { id: string; name: string; run: () => void };

const cases: Case[] = [
  {
    id: 'QA-02/03', name: 'reader continues past a chapter without a Knowledge Check', run: () => {
      const reader = mountReader({ cards: cards(3), questions: questionsFor([1, 3]) });
      reader.primary();
      same(reader.flow().stage, 'check', 'chapter 1 opens its check');
      reader.answerAll();
      reader.continueAfterCheck();
      same([reader.flow().activeIndex, reader.flow().stage], [1, 'learning'], 'check 1 leads to chapter 2');
      same(reader.flow().primaryLabel, 'Continue to next chapter', 'chapter 2 offers to continue, not a check');
      reader.openCheck(1);
      same(reader.flow().activePlan?.status, 'under-preparation', 'check 2 shows the not-available screen');
      same(reader.flow().continueLabel, 'Continue to next chapter', 'not-available screen offers to continue');
      reader.continueAfterCheck();
      same([reader.flow().activeIndex, reader.flow().stage], [2, 'learning'], 'continue opens chapter 3 on the first click');
      const record = readJson(quizStorageKey(KEY));
      same(Object.keys(record.chapters), ['0'], 'only the real submission is stored');
      same(reader.flow().checks, { done: 1, total: 2, notAvailable: 1 }, 'progress counts only real checks');
      reader.unmount();
    },
  },
  {
    id: 'QA-07', name: 'refresh restores chapter and progress', run: () => {
      const first = mountReader({ cards: cards(3), questions: questionsFor([1, 3]) });
      first.primary();
      first.answerAll();
      first.continueAfterCheck();
      first.primary();
      same(first.flow().activeIndex, 2, 'learner reached chapter 3');
      first.unmount();
      const second = mountReader({ cards: cards(3), questions: questionsFor([1, 3]) });
      same([second.flow().activeIndex, second.flow().stage], [2, 'learning'], 'refresh lands on chapter 3');
      assert(second.flow().progress[0].submitted && second.flow().progress[2].unlocked, 'submission and access survive the refresh');
      second.unmount();
    },
  },
  {
    id: 'QA-08/09', name: 'Practice & Review (Flashcards, Match & Sort) sees the same open chapters and returns through the gate', run: () => {
      const reader = mountReader({ cards: cards(3), questions: questionsFor([2]) });
      same(getPracticeLesson()?.accessible, [true, true, false], 'chapter 1 has no check, so chapter 2 is open; chapter 3 waits for check 2');
      same(getPracticeLesson()?.journey?.rows.map((row) => row.check), ['under-preparation', 'available', 'locked'], 'practice journey mirrors the reader');
      let opened = false;
      act(() => { opened = getPracticeLesson()!.actions!.selectChapter(2); });
      assert(!opened && reader.flow().activeIndex === 0, 'practice cannot jump past an unsubmitted check');
      act(() => { opened = getPracticeLesson()!.actions!.selectChapter(1); });
      assert(opened && reader.flow().activeIndex === 1, 'returning from practice to chapter 2 works');
      reader.openCheck(1);
      reader.answerAll();
      same(getPracticeLesson()?.accessible, [true, true, true], 'after check 2 every chapter is open to practice');
      same(getPracticeLesson()?.journey?.takeaways, 'available', 'takeaways step opens for practice too');
      reader.unmount();
    },
  },
  {
    id: 'QA-05', name: 'a 0% submission still opens the next chapter', run: () => {
      const reader = mountReader({ cards: cards(2), questions: questionsFor([1, 2]) });
      reader.primary();
      reader.answerAll('b');
      same(readJson(quizStorageKey(KEY)).chapters['0'].latest, 0, 'score stored as submitted');
      assert(reader.flow().progress[1].unlocked, 'no pass threshold');
      reader.unmount();
    },
  },
  {
    id: 'QA-14a', name: 'final chapter without a check: lesson completes on the last real check, takeaways open', run: () => {
      const reader = mountReader({ cards: cards(3), questions: questionsFor([1, 2]) });
      reader.primary();
      reader.answerAll();
      reader.continueAfterCheck();
      reader.primary();
      reader.answerAll();
      assert(readJson(LESSON_PROGRESS_KEY)?.[IDENTITY]?.completedAt, 'completion recorded after the last submittable check');
      reader.continueAfterCheck();
      same(reader.flow().activeIndex, 2, 'chapter 3 opens');
      same(reader.flow().primaryLabel, 'View Lesson Takeaways', 'last chapter leads to takeaways');
      reader.primary();
      same(reader.flow().stage, 'takeaways', 'takeaways open');
      reader.unmount();
    },
  },
  {
    id: 'QA-14b', name: 'lesson without any check: every chapter and the takeaways open, nothing recorded', run: () => {
      const reader = mountReader({ cards: cards(2), questions: [] });
      same(reader.flow().progress.map((chapter) => chapter.unlocked), [true, true], 'all chapters open');
      reader.primary();
      same(reader.flow().activeIndex, 1, 'continue goes straight to chapter 2');
      reader.primary();
      same(reader.flow().stage, 'takeaways', 'takeaways open');
      assert(!reader.flow().lessonComplete, 'lesson is not marked complete');
      same(readJson(LESSON_PROGRESS_KEY)?.[IDENTITY]?.completedAt, undefined, 'no completion written');
      same(readJson(quizStorageKey(KEY)), null, 'no Knowledge Check record written');
      reader.unmount();
    },
  },
  {
    id: 'QA-12', name: 'failed question load shows retry and never writes or unlocks', run: () => {
      let retried = 0;
      const reader = mountReader({ cards: cards(2), questions: undefined, load: 'failed', onRetry: () => { retried += 1; } });
      same(reader.flow().primaryLabel, 'View Knowledge Check status', 'reading screen points to the check status');
      reader.primary();
      same([reader.flow().stage, reader.flow().activePlan?.status], ['check', 'unavailable'], 'check screen shows the load error');
      assert(reader.flow().retryAssessment, 'retry offered');
      reader.flow().retryAssessment!();
      same(retried, 1, 'retry calls the loader');
      reader.selectChapter(1);
      same(reader.flow().activeIndex, 0, 'chapter 2 stays locked while check 1 cannot load');
      same(readJson(quizStorageKey(KEY)), null, 'nothing written during the failure');
      reader.rerender({ questions: questionsFor([1, 2]), load: 'loaded' });
      same(reader.flow().activePlan?.status, 'ready', 'after a successful retry the check is ready');
      reader.answerAll();
      assert(reader.flow().progress[1].unlocked, 'normal flow resumes');
      reader.unmount();
    },
  },
  {
    id: 'QA-10', name: 'cross-lesson navigation still goes to the next lesson', run: () => {
      let openedNext = false;
      const next = { identity: 'test-industry::Module::Next', title: 'Next lesson', open: () => { openedNext = true; } };
      const reader = mountReader({ cards: cards(1), questions: [], flow: { next } });
      reader.primary();
      same(reader.flow().stage, 'takeaways', 'single chapter without a check reaches takeaways');
      same(reader.flow().nextTitle, 'Next lesson', 'next lesson named');
      act(() => reader.flow().continueToNextLesson());
      assert(openedNext, 'continue opens the next lesson');
      reader.unmount();
    },
  },
  {
    id: 'QA-11', name: 'reopening a completed lesson keeps every chapter and the takeaways open', run: () => {
      localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify({ [IDENTITY]: { completedAt: '2026-01-01T00:00:00.000Z', source: 'assessment' } }));
      localStorage.setItem(readerStorageKey(KEY), JSON.stringify({ view: { stage: 'takeaways', chapter: 0 } }));
      const reader = mountReader({ cards: cards(3), questions: questionsFor([1, 2, 3]) });
      same(reader.flow().stage, 'takeaways', 'takeaways view restored');
      same(reader.flow().progress.map((chapter) => chapter.unlocked), [true, true, true], 'all chapters open');
      reader.unmount();
    },
  },
];

export function runLessonFlowReaderTests() {
  assert(typeof document !== 'undefined' && typeof localStorage !== 'undefined', 'needs a DOM-like global with localStorage (preload jsdom)');
  const failures: string[] = [];
  cases.forEach((item) => {
    localStorage.clear();
    try {
      item.run();
      console.log(`PASS ${item.id} ${item.name}`);
    } catch (error) {
      failures.push(`${item.id}: ${(error as Error).message}`);
      console.log(`FAIL ${item.id} ${item.name}: ${(error as Error).message}`);
    }
  });
  if (failures.length) throw new Error(`${failures.length} reader case(s) failed`);
  return cases.length;
}

runLessonFlowReaderTests();
