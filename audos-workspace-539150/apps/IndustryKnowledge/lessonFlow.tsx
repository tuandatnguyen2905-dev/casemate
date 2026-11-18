import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Lightbulb, Lock, RotateCcw, X } from 'lucide-react';
import {
  aggregateChapterScores, assessmentDiagnostics, chapterCheck, chapterProgress, feedbackFor, hasSubmission, isNotAssessable, legacyEvidence, lessonCardState, lessonChecksComplete,
  journeyRows, lessonTakeawaysAvailable, loadProgressStore, markChapterRead, moveDraft, parseAssessmentRecord, planAssessment, quizStorageKey, readJson,
  readerStorageKey, readingProgress, requiredChecks, resolveResultTakeaways, resolveStartChapter, resolveUnlock, retakeAssessment,
  scoreAnswers, selectDraftAnswer, startOrResumeDraft, stripChapterNumber, submitDraft, updateProgressStore, withChapterCheck,
} from './lessonFlowCore';
import type {
  AssessmentDiagnostics, AssessmentLoadState, AssessmentRecord, ChapterLike, ChapterPlanStatus, ChapterState, CheckRecord, CheckState, LegacyLessonEvidence, LessonCardState,
  LessonFlowStage, QuestionLike, ResultTakeaways, ScoreSummary, StorageLike, TakeawaysLike, UnlockReason,
} from './lessonFlowCore';
import { PracticeReviewJourneyStep, PracticeReviewTakeawaysCard } from '../InteractiveLearning/practiceReview/PracticeReviewEntry';
import { publishPracticeLesson } from '../InteractiveLearning/practiceReview/practiceLessonStore';
import { practiceSourceCards } from './localization/lessonLocalization';
import { uiChecksToGo, uiCountOf, uiEarlierAttempt, uiKnowledgeCheckNumber, uiNextTitle, uiReviewQuestion, uiScoreLine, uiText, uiUnlocked } from './localization/uiText';
import type { PracticeLessonActions } from '../InteractiveLearning/practiceReview/practiceLessonStore';
import { trackStepComplete, trackStepView, useActiveTimeThreshold } from '../../lib/engagementTracking';
import { domainLessonItemId, noteDomainNextItem, noteDomainTestCompleted, readDomainTrackingIds } from '../../lib/domainKnowledgeRoute';

const browserStorage = (): StorageLike | null => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
};

export const nowIso = () => new Date().toISOString();

export function loadAssessmentRecord(persistenceKey: string): AssessmentRecord {
  return parseAssessmentRecord(readJson(browserStorage(), quizStorageKey(persistenceKey)));
}

export function saveAssessmentRecord(persistenceKey: string, record: AssessmentRecord) {
  try {
    browserStorage()?.setItem(quizStorageKey(persistenceKey), JSON.stringify(record));
  } catch {
    // The check stays usable for this session when storage is unavailable.
  }
}

export function isLessonCompletedInStore(identity: string | undefined): boolean {
  return Boolean(identity && loadProgressStore(browserStorage())[identity]?.completedAt);
}

export function recordLessonCompletion(identity: string | undefined, persistenceKey: string) {
  if (!identity) return;
  updateProgressStore(browserStorage(), identity, { completedAt: nowIso(), source: 'assessment', persistenceKey });
}

/** What the gate needs to know about a neighbouring lesson, resolved from the real lesson registry. */
export interface LessonNeighbour {
  identity: string;
  title: string;
  persistenceKey?: string;
  chapters?: ChapterLike[];
  /** Set when the neighbour's knowledge check cannot be submitted (hold or missing questions). */
  blockedBy?: 'under-review' | 'under-preparation' | null;
  /** Each chapter's Knowledge Check status from the lesson's own plan, so practice spanning lessons applies the reader's gate. */
  assessment?: ChapterPlanStatus[];
  open: () => void;
}

/** One lesson of the open curriculum, in module and lesson order, resolved through the same dispatcher learners see. */
export interface CurriculumLesson extends LessonNeighbour {
  moduleIndex: number;
  lessonIndex: number;
  moduleTitle: string;
  /** Module heading as the curriculum presents it. */
  moduleLabel: string;
}

export interface LessonFlowCurriculum {
  industryLabel: string;
  /** Resolved on first call; lessons without a deck (in development) are left out. */
  lessons: () => CurriculumLesson[];
}

export interface LessonFlowValue {
  identity: string;
  isFirst: boolean;
  /** Curriculum modules are still loading, so lesson order is not known yet. */
  pending: boolean;
  previous: LessonNeighbour | null;
  next: LessonNeighbour | null;
  /** Module overview: lesson title → informational progress status (never an access rule). */
  lessonStates?: Record<string, LessonCardState>;
  retry?: () => void;
  failed?: boolean;
  /** Every lesson of this curriculum, for practice that spans lessons. Read-only. */
  curriculum?: LessonFlowCurriculum;
  /** Opens the module's Your Learning Path overview with this lesson's card in view. */
  backToLearningPath?: () => void;
}

export const LessonFlowContext = createContext<LessonFlowValue | null>(null);
export const useLessonFlow = () => useContext(LessonFlowContext);

export function neighbourEvidence(neighbour: LessonNeighbour | null | undefined): LegacyLessonEvidence | null {
  if (!neighbour?.persistenceKey) return null;
  const storage = browserStorage();
  return legacyEvidence(readJson(storage, readerStorageKey(neighbour.persistenceKey)), readJson(storage, quizStorageKey(neighbour.persistenceKey)), neighbour.chapters ?? null);
}

export function evaluateLessonAccess(
  flow: Pick<LessonFlowValue, 'identity' | 'isFirst' | 'previous'>,
  currentEvidence: LegacyLessonEvidence | null,
): { unlocked: boolean; reason: UnlockReason } {
  const store = loadProgressStore(browserStorage());
  return resolveUnlock({
    isFirst: flow.isFirst,
    current: store[flow.identity],
    previous: flow.previous ? store[flow.previous.identity] : undefined,
    currentEvidence,
    previousEvidence: withoutReadingCompletion(neighbourEvidence(flow.previous), flow.previous ? store[flow.previous.identity] : undefined),
  });
}

/** Access that does not depend on lesson order, so returning learners never wait for it. */
function evaluateOwnAccess(identity: string, currentEvidence: LegacyLessonEvidence | null): { unlocked: boolean; reason: UnlockReason } | null {
  const decision = resolveUnlock({ isFirst: false, current: loadProgressStore(browserStorage())[identity], previous: undefined, currentEvidence, previousEvidence: null });
  return decision.unlocked ? decision : null;
}

/** Module overview card status. Every lesson is open; this only reports progress. */
export function overviewLessonState(identity: string, lesson: LessonNeighbour | null): LessonCardState {
  const entry = loadProgressStore(browserStorage())[identity];
  return lessonCardState(entry, withoutReadingCompletion(neighbourEvidence(lesson), entry));
}

/** Chapters marked complete only meant lesson completion before the flow existed for that lesson. */
function withoutReadingCompletion(evidence: LegacyLessonEvidence | null, entry: { access?: string } | undefined): LegacyLessonEvidence | null {
  if (!evidence || evidence.completedSource !== 'legacy-chapters' || !entry?.access) return evidence;
  return { ...evidence, completedSource: null };
}

/**
 * Gate for one lesson. Legacy evidence is read during the first render, before the reader
 * stamps its migration marker, so earlier completions are honoured exactly once.
 */
export function useLessonAccess(persistenceKey: string, chapters: ChapterLike[]): { status: 'open' | 'checking' | 'failed'; reason?: UnlockReason } {
  const flow = useLessonFlow();
  const [currentEvidence] = useState(() => {
    const storage = browserStorage();
    return legacyEvidence(readJson(storage, readerStorageKey(persistenceKey)), readJson(storage, quizStorageKey(persistenceKey)), chapters);
  });
  const decision = !flow ? null : flow.pending || flow.failed ? evaluateOwnAccess(flow.identity, currentEvidence) : evaluateLessonAccess(flow, currentEvidence);

  useEffect(() => {
    if (!flow || !decision?.unlocked) return;
    const storage = browserStorage();
    const at = nowIso();
    const evidence = withoutReadingCompletion(currentEvidence, loadProgressStore(storage)[flow.identity]);
    if (evidence?.completedSource) updateProgressStore(storage, flow.identity, { completedAt: at, source: evidence.completedSource, persistenceKey });
    updateProgressStore(storage, flow.identity, { access: decision.reason === 'historical' ? 'historical' : 'unlocked', accessAt: at, persistenceKey });
    const previousEvidence = withoutReadingCompletion(neighbourEvidence(flow.previous), flow.previous ? loadProgressStore(storage)[flow.previous.identity] : undefined);
    if (flow.previous && decision.reason === 'previous-legacy' && previousEvidence?.completedSource) {
      updateProgressStore(storage, flow.previous.identity, { completedAt: at, source: previousEvidence.completedSource, persistenceKey: flow.previous.persistenceKey });
    }
  }, [flow?.identity, decision?.unlocked, decision?.reason]);

  if (!flow) return { status: 'open' };
  if (!decision) return { status: flow.failed ? 'failed' : 'checking' };
  return { status: 'open', reason: decision.reason };
}

export interface ReaderView {
  stage: LessonFlowStage;
  chapter: number;
}

export interface ReaderPatch {
  completed?: number[];
  view?: ReaderView;
}

const sameIds = (left: string[] | undefined, right: string[]) => Boolean(left) && left!.length === right.length && left!.every((id, index) => id === right[index]);

const answersFor = (check: CheckRecord, questions: QuestionLike[]) => {
  const ids = questions.map((question) => question.id);
  return check.lastAnswers && sameIds(check.lastQuestionIds, ids) ? check.lastAnswers : null;
};

type PrimaryTarget = { type: 'chapter'; index: number } | { type: 'check' } | { type: 'takeaways' } | { type: 'back' };

const reportedDiagnostics = new Set<string>();

/** Missing or unusable assessment data is reported once per lesson, for content QA; learners are never blocked by it. */
function reportAssessmentDiagnostics(persistenceKey: string, diagnostics: AssessmentDiagnostics | null) {
  if (!diagnostics) return;
  const key = `${persistenceKey}|${JSON.stringify(diagnostics)}`;
  if (reportedDiagnostics.has(key)) return;
  reportedDiagnostics.add(key);
  try {
    console.warn(`[Domain Knowledge] Knowledge Check data for "${persistenceKey}"`, diagnostics);
  } catch {
    // Diagnostics must never affect the lesson.
  }
}

/**
 * The single chapter-by-chapter state machine used by every curriculum's reader:
 * Chapter 1 → Check 1 → Chapter 2 → … → final check → Lesson Takeaways → next lesson.
 * Reader storage stays with the caller (`persistReader`), so the reader record format and its
 * migrations are untouched.
 */
export function useLessonFlowState<Q extends QuestionLike>({
  persistenceKey, cards, quizQuestions, assessmentLoad = 'loaded', onRetryAssessment, finalTakeaways, initialCompleted, initialLegacyCompleted, initialView, persistReader, onBack, onNextLesson, onLessonCompleted,
  journeyTitle, journeyMinutes,
}: {
  persistenceKey: string;
  cards: ChapterLike[];
  quizQuestions?: Q[];
  /** Pass 'loading' or 'failed' when questions come from a load that has not succeeded; never shown as "no questions". */
  assessmentLoad?: AssessmentLoadState;
  onRetryAssessment?: () => void;
  finalTakeaways?: TakeawaysLike;
  initialCompleted: number[];
  initialLegacyCompleted: number[];
  initialView?: Partial<ReaderView>;
  persistReader: (patch: ReaderPatch) => void;
  onBack: () => void;
  onNextLesson?: () => void;
  onLessonCompleted?: () => void;
  /** Learning Journey chapter title and reading minutes, as the reader displays them. */
  journeyTitle?: (card: ChapterLike, index: number) => string;
  journeyMinutes?: (card: ChapterLike) => number;
}) {
  const flow = useLessonFlow();
  const plan = useMemo(() => planAssessment(quizQuestions, cards, assessmentLoad), [quizQuestions, cards, assessmentLoad]);
  const [initial] = useState(() => {
    const record = loadAssessmentRecord(persistenceKey);
    const completed = initialCompleted.filter((index) => Number.isInteger(index));
    const legacyCompleted = initialLegacyCompleted.filter((index) => Number.isInteger(index));
    const lessonLegacyComplete = isLessonCompletedInStore(flow?.identity) || hasSubmission(record);
    const progress = chapterProgress({ plan: planAssessment(quizQuestions, cards, assessmentLoad), record, completed, legacyCompletedChapters: legacyCompleted, lessonLegacyComplete });
    const requested = Number(initialView?.chapter);
    const chapter = resolveStartChapter(progress, Number.isInteger(requested) && requested >= 0 && requested < cards.length ? requested : 0);
    const complete = lessonLegacyComplete || lessonTakeawaysAvailable(progress);
    const stage: LessonFlowStage = initialView?.stage === 'check' && chapter === requested && !progress[chapter]?.restricted
      ? 'check'
      : initialView?.stage === 'takeaways' && complete ? 'takeaways' : 'learning';
    return { record, completed, legacyCompleted, lessonLegacyComplete, chapter, stage };
  });
  const [record, setRecord] = useState(initial.record);
  const [completed, setCompleted] = useState<number[]>(initial.completed);
  const [activeIndex, setActiveIndex] = useState(initial.chapter);
  const [stage, setStage] = useState<LessonFlowStage>(initial.stage);

  const progressFor = (next: AssessmentRecord) => chapterProgress({ plan, record: next, completed, legacyCompletedChapters: initial.legacyCompleted, lessonLegacyComplete: initial.lessonLegacyComplete });
  const progress = progressFor(record);
  const lessonComplete = initial.lessonLegacyComplete || lessonChecksComplete(progress);
  /** Takeaways also open for a lesson with no submittable check; that never counts as completion. */
  const takeawaysAvailable = lessonComplete || lessonTakeawaysAvailable(progress);
  const active = progress[activeIndex];
  const activePlan = plan.chapters[activeIndex];
  const activeCheck = chapterCheck(record, activeIndex);

  const updateRecord = (next: AssessmentRecord) => {
    setRecord(next);
    saveAssessmentRecord(persistenceKey, next);
  };
  const updateCheck = (index: number, check: CheckRecord) => updateRecord(withChapterCheck(record, index, check));
  const ensureDraft = (index: number) => {
    const chapterPlan = plan.chapters[index];
    const check = chapterCheck(record, index);
    if (chapterPlan?.status !== 'ready' || hasSubmission(check) && !check.draft) return;
    if (!sameIds(check.draft?.questionIds, chapterPlan.questions.map((question) => question.id))) updateCheck(index, startOrResumeDraft(check, chapterPlan.questions, nowIso()));
  };

  useEffect(() => {
    persistReader({ view: { stage, chapter: activeIndex } });
  }, [stage, activeIndex]);

  useEffect(() => {
    if (stage === 'check') ensureDraft(activeIndex);
  }, [stage, activeIndex, plan]);

  const diagnostics = useMemo(() => assessmentDiagnostics(plan), [plan]);
  useEffect(() => {
    reportAssessmentDiagnostics(persistenceKey, diagnostics);
  }, [persistenceKey, diagnostics]);

  const journey = journeyRows(progress, cards, activeIndex, stage, journeyTitle ?? ((card) => stripChapterNumber(card.title)), journeyMinutes ?? (() => 0));
  const journeyKey = `${takeawaysAvailable ? 1 : 0}:${journey.map((row) => `${row.state}/${row.check}`).join(',')}`;
  // Practice & Review navigates through the reader so the reader's chapter gate, checks and takeaways rules apply.
  const actionsRef = useRef<PracticeLessonActions | null>(null);
  const [practiceActions] = useState<PracticeLessonActions>(() => ({
    selectChapter: (index) => actionsRef.current?.selectChapter(index) ?? false,
    openCheck: (index) => actionsRef.current?.openCheck(index),
    openTakeaways: () => actionsRef.current?.openTakeaways(),
    backToLearningPath: () => actionsRef.current?.backToLearningPath() ?? false,
  }));

  /** Optional Practice & Review reads which chapters are open; it never writes lesson progress. */
  const practiceAccess = progress.map((chapter) => (chapter.unlocked && !chapter.restricted ? '1' : '0')).join('');
  useEffect(() => {
    if (!flow?.identity) return undefined;
    return publishPracticeLesson({
      identity: flow.identity,
      cards: practiceSourceCards(cards),
      accessible: practiceAccess.split('').map((value) => value === '1'),
      persistenceKey,
      activeChapter: activeIndex,
      curriculum: flow.curriculum,
      journey: { rows: journey, takeaways: takeawaysAvailable ? 'available' : 'locked' },
      actions: practiceActions,
    });
  }, [flow?.identity, cards, practiceAccess, persistenceKey, activeIndex, flow?.curriculum, journeyKey]);

  useActiveTimeThreshold(stage === 'learning', persistenceKey, (activeSeconds) => {
    const ids = readDomainTrackingIds();
    trackStepView('industry-knowledge', 'learning_site', {
      dedupeKey: domainLessonItemId(ids) ?? persistenceKey,
      properties: { sector_id: ids.sector_id, topic_id: ids.topic_id, lesson_id: ids.lesson_id, active_seconds: activeSeconds },
    });
  });

  const goToChapter = (index: number) => {
    if (!progress[index]?.unlocked) return false;
    setActiveIndex(index);
    setStage('learning');
    return true;
  };

  const markRead = (index: number) => {
    const next = markChapterRead(completed, index, cards);
    if (next !== completed) {
      setCompleted(next);
      persistReader({ completed: next });
    }
  };

  const openCheck = (index: number) => {
    const chapter = progress[index];
    if (!chapter?.unlocked || chapter.restricted) return;
    setActiveIndex(index);
    setStage('check');
  };

  /** Held chapters keep their place but are skipped when moving forward. */
  const nextChapterIndex = progress.find((chapter) => chapter.index > activeIndex && !chapter.restricted)?.index ?? null;

  /** The active chapter still has a check to take (or retry loading) before the reader moves on. */
  const checkPending = Boolean(active && !active.restricted && !active.complete && !isNotAssessable(active));

  /** Reading-screen primary action: a chapter's check comes before the next chapter; a chapter without one continues. */
  const primaryAction = (): PrimaryTarget => {
    if (!active) return { type: 'back' };
    if (!active.restricted) markRead(activeIndex);
    if (checkPending) {
      openCheck(activeIndex);
      return { type: 'check' };
    }
    if (nextChapterIndex !== null) return { type: 'chapter', index: nextChapterIndex };
    if (takeawaysAvailable) {
      setStage('takeaways');
      return { type: 'takeaways' };
    }
    return { type: 'back' };
  };
  const primaryLabel = uiText(!active
    ? 'Back to lessons'
    : checkPending
      ? active.plan === 'unavailable' ? 'View Knowledge Check status' : 'Start Knowledge Check'
      : nextChapterIndex !== null ? 'Continue to next chapter' : takeawaysAvailable ? 'View Lesson Takeaways' : 'Back to lessons');

  const submit = () => {
    if (activePlan?.status !== 'ready') return;
    const result = submitDraft(activeCheck, activePlan.questions, nowIso());
    if (!result) return;
    const ids = readDomainTrackingIds();
    trackStepComplete('industry-knowledge', 'knowledge_test', {
      properties: { sector_id: ids.sector_id, topic_id: ids.topic_id, lesson_id: ids.lesson_id, chapter_index: activeIndex + 1, score: result.score.correct, total: result.score.total, accuracy: result.score.accuracy, assessment_scope: 'chapter' },
    });
    noteDomainTestCompleted(domainLessonItemId(ids));
    const next = withChapterCheck(record, activeIndex, result.record);
    updateRecord(next);
    if (!lessonComplete && lessonChecksComplete(progressFor(next))) {
      recordLessonCompletion(flow?.identity, persistenceKey);
      onLessonCompleted?.();
    }
  };

  const isFinalCheck = !progress.some((chapter) => chapter.index > activeIndex && !chapter.restricted);

  /** After a submitted (or not assessable) check: the next chapter or, after the final one, the takeaways. */
  const continueAfterCheck = (): PrimaryTarget => {
    if (isFinalCheck && takeawaysAvailable) {
      setStage('takeaways');
      return { type: 'takeaways' };
    }
    if (nextChapterIndex !== null) return { type: 'chapter', index: nextChapterIndex };
    return { type: 'back' };
  };
  const continueLabel = uiText(isFinalCheck && takeawaysAvailable ? 'View Lesson Takeaways' : nextChapterIndex !== null ? 'Continue to next chapter' : 'Back to lessons');

  const retakeCheck = (index: number) => {
    const chapterPlan = plan.chapters[index];
    if (!progress[index]?.unlocked || chapterPlan?.status !== 'ready') return;
    updateCheck(index, retakeAssessment(chapterCheck(record, index), chapterPlan.questions, nowIso()));
    setActiveIndex(index);
    setStage('check');
  };

  const reviewCheck = (index: number) => {
    if (!progress[index]?.submitted) return;
    const check = chapterCheck(record, index);
    if (check.draft) {
      const { draft: _draft, ...rest } = check;
      updateCheck(index, rest as CheckRecord);
    }
    setActiveIndex(index);
    setStage('check');
  };

  const openTakeaways = () => {
    if (takeawaysAvailable) setStage('takeaways');
  };

  const continueToNextLesson = () => {
    const open = flow ? flow.next?.open : onNextLesson;
    if (open) noteDomainNextItem();
    (open ?? onBack)();
  };

  actionsRef.current = {
    selectChapter: goToChapter,
    openCheck,
    openTakeaways,
    backToLearningPath: () => {
      if (!flow?.backToLearningPath) return false;
      flow.backToLearningPath();
      return true;
    },
  };

  const required = requiredChecks(progress);
  const aggregate = aggregateChapterScores(plan, record);
  const activeAnswers = activePlan?.status === 'ready' ? answersFor(activeCheck, activePlan.questions) : null;
  const showCheckResult = stage === 'check' && Boolean(active?.submitted) && !activeCheck.draft;
  const nextTitle = flow ? flow.next?.title ?? null : onNextLesson ? finalTakeaways?.nextLesson ?? 'Next lesson' : null;

  const testScreenOpen = stage === 'check' && activePlan?.status === 'ready' && !showCheckResult;
  useEffect(() => {
    if (!testScreenOpen) return;
    const ids = readDomainTrackingIds();
    trackStepView('industry-knowledge', 'knowledge_test', {
      properties: { sector_id: ids.sector_id, topic_id: ids.topic_id, lesson_id: ids.lesson_id, chapter_index: activeIndex + 1, question_count: activePlan?.questions.length ?? null, assessment_scope: 'chapter' },
    });
  }, [testScreenOpen, activeIndex]);

  return {
    stage, activeIndex, plan, progress, active, activePlan, lessonComplete, takeawaysAvailable, nextTitle, primaryLabel, continueLabel, isFinalCheck, nextChapterIndex, journey,
    diagnostics,
    retryAssessment: assessmentLoad === 'loaded' ? undefined : onRetryAssessment,
    reading: readingProgress(completed, cards),
    checks: {
      done: required.filter((chapter) => chapter.complete).length,
      total: required.length,
      notAvailable: progress.filter((chapter) => isNotAssessable(chapter) && !chapter.complete).length,
    },
    draftAnswers: activeCheck.draft?.answers ?? {},
    draftIndex: activeCheck.draft?.index ?? 0,
    showCheckResult,
    checkResult: {
      answers: activeAnswers,
      score: activeAnswers && activePlan ? scoreAnswers(activePlan.questions, activeAnswers) : null,
      legacyAccuracy: activeCheck.latest,
    },
    takeaways: {
      aggregate: aggregate.score,
      chapterScores: aggregate.chapters,
      missedChapters: aggregate.chapters.filter((chapter) => chapter.score && chapter.score.correct < chapter.score.total).map((chapter) => chapter.index + 1),
      legacyAccuracy: record.latest,
      content: resolveResultTakeaways(finalTakeaways, cards),
    },
    goToChapter, primaryAction, openCheck, submit, continueAfterCheck, retakeCheck, reviewCheck, openTakeaways, continueToNextLesson,
    select: (questionId: string, optionId: string) => updateCheck(activeIndex, selectDraftAnswer(activeCheck, questionId, optionId)),
    move: (index: number) => updateCheck(activeIndex, moveDraft(activeCheck, index)),
  };
}

const shell = 'mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10';
const primaryButton = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none';
const secondaryButton = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40';
const eyebrow = 'text-[10px] font-bold uppercase tracking-[0.16em] text-red-600';
const backLink = 'inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-red-600';
export function LessonAccessNotice({ status, lessonTitle, onBack }: { status: 'checking' | 'failed'; lessonTitle: string; onBack: () => void }) {
  const flow = useLessonFlow();
  if (status === 'checking') {
    return (
      <main className={shell} role="status" aria-busy="true" data-testid="lesson-access-checking">
        <div className="h-2 w-40 animate-pulse rounded-full bg-slate-200" />
        <p className="mt-3 text-sm text-slate-500">Checking your lesson progress…</p>
      </main>
    );
  }
  return (
    <main className={shell} data-testid="lesson-access-failed">
      <button type="button" onClick={onBack} className={backLink}>
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className={eyebrow}>Progress unavailable</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{lessonTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">We could not load this curriculum’s lesson order, so access cannot be confirmed yet.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {flow?.retry ? <button type="button" onClick={flow.retry} className={primaryButton}>Try again</button> : null}
          <button type="button" onClick={onBack} className={secondaryButton}>Back to lessons</button>
        </div>
      </section>
    </main>
  );
}

export function WhatToRemember({ summary, points }: { summary: string | null; points: string[] }) {
  if (!summary && !points.length) return null;
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5" aria-label="What to remember" data-testid="chapter-what-to-remember">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">{uiText('Chapter recap')}</p>
      <h3 className="mt-1 text-base font-black text-slate-900">{uiText('What to remember')}</h3>
      {summary && <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>}
      {points.length > 0 && (
        <ul className="mt-3 space-y-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-white"><Check className="h-2.5 w-2.5" /></span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export const CHAPTER_STATE_LABEL: Record<ChapterState, string> = {
  current: 'Current',
  available: 'Available',
  read: 'Read',
  completed: 'Completed',
  locked: 'Locked',
  'under-review': 'Under Review',
};

export const CHECK_STATE_LABEL: Record<CheckState, string> = {
  locked: 'Locked',
  available: 'Available',
  'in-progress': 'In progress',
  submitted: 'Submitted',
  'under-preparation': 'Not available',
  'under-review': 'Under Review',
  unavailable: 'Could not load',
};

export function journeyBadgeClass(state: ChapterState): string {
  switch (state) {
    case 'current': return 'bg-red-600 text-white';
    case 'read': return 'bg-red-50 text-red-600 ring-1 ring-red-100';
    case 'completed': return 'bg-slate-900 text-white';
    case 'under-review': return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'locked': return 'bg-slate-100 text-slate-400';
    default: return 'bg-white text-slate-500 ring-1 ring-slate-200';
  }
}

const checkDotClass: Record<CheckState, string> = {
  locked: 'bg-slate-200',
  available: 'bg-white ring-1 ring-red-300',
  'in-progress': 'bg-red-300',
  submitted: 'bg-slate-900',
  'under-preparation': 'bg-slate-300',
  'under-review': 'bg-amber-300',
  unavailable: 'bg-amber-300',
};

/** One chapter in the Learning Journey, with its Knowledge Check as a small nested step. */
export function JourneyChapter({
  number, title, minutes, state, check, lockedBy, lockedByPreparation = false, checkActive, onSelectChapter, onSelectCheck, detail, testId,
}: {
  number: number;
  title: string;
  minutes: number;
  state: ChapterState;
  check: CheckState;
  lockedBy: number | null;
  /** The blocking check could not load, so it cannot be submitted until a retry succeeds. */
  lockedByPreparation?: boolean;
  checkActive: boolean;
  onSelectChapter: () => void;
  onSelectCheck: () => void;
  /** Replaces the reading time on open rows, e.g. a practice card count. */
  detail?: string;
  testId?: string;
}) {
  const locked = state === 'locked';
  const active = state === 'current' && !checkActive;
  const lockedReason = lockedBy ? (lockedByPreparation ? `Check ${lockedBy} could not load` : `Complete Check ${lockedBy} first`) : null;
  return (
    <div className="min-w-[min(78vw,260px)] snap-start lg:min-w-0" data-testid={testId ?? `journey-chapter-${number}`} data-chapter-state={state} data-check-state={check}>
      <button
        type="button"
        onClick={onSelectChapter}
        disabled={locked}
        aria-current={active ? 'step' : undefined}
        title={locked && lockedReason ? lockedReason : undefined}
        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition ${active ? 'bg-red-50 ring-1 ring-red-100' : locked ? 'cursor-not-allowed' : 'hover:bg-slate-50'}`}
      >
        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${journeyBadgeClass(state)}`}>
          {locked ? <Lock className="h-3 w-3" /> : state === 'completed' ? <Check className="h-3.5 w-3.5" /> : number}
        </span>
        <span className="min-w-0">
          <span className={`block line-clamp-2 text-xs leading-5 ${active ? 'font-bold text-slate-900' : locked ? 'font-medium text-slate-400' : 'font-medium text-slate-600'}`}>{title}</span>
          <span className="mt-0.5 block text-[10px] text-slate-500">
            <span className="font-semibold uppercase tracking-[0.12em]">{CHAPTER_STATE_LABEL[state]}</span>
            {locked && lockedReason ? ` · ${lockedReason}` : ` · ${detail ?? `${minutes} min`}`}
          </span>
        </span>
      </button>
      {check !== 'under-review' && (
        <button
          type="button"
          onClick={onSelectCheck}
          disabled={check === 'locked'}
          aria-current={checkActive ? 'step' : undefined}
          className={`ml-[23px] flex items-center gap-2 border-l border-slate-200 py-1 pl-[18px] pr-2 text-left text-[10px] transition ${checkActive ? 'font-bold text-slate-900' : check === 'locked' ? 'cursor-not-allowed text-slate-300' : 'text-slate-500 hover:text-red-600'}`}
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${checkActive ? 'bg-red-600' : checkDotClass[check]}`} aria-hidden />
          <span>{uiKnowledgeCheckNumber(number)}</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{CHECK_STATE_LABEL[check]}</span>
        </button>
      )}
    </div>
  );
}

export function JourneyTakeaways({ state, onSelect }: { state: 'locked' | 'available' | 'current'; onSelect: () => void }) {
  const locked = state === 'locked';
  return (
    <>
    <button
      type="button"
      onClick={onSelect}
      disabled={locked}
      aria-current={state === 'current' ? 'step' : undefined}
      data-testid="journey-takeaways"
      className={`flex min-w-[min(70vw,220px)] snap-start items-center gap-3 rounded-xl px-3 py-2 text-left transition lg:mt-1 lg:min-w-0 lg:w-full ${state === 'current' ? 'bg-red-50 ring-1 ring-red-100' : locked ? 'cursor-not-allowed' : 'hover:bg-slate-50'}`}
    >
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${state === 'current' ? 'bg-red-600 text-white' : locked ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white'}`}>
        {locked ? <Lock className="h-3 w-3" /> : <Lightbulb className="h-3 w-3" />}
      </span>
      <span className="min-w-0">
        <span className={`block text-xs leading-5 ${state === 'current' ? 'font-bold text-slate-900' : locked ? 'font-medium text-slate-400' : 'font-medium text-slate-600'}`}>Final Lesson Takeaways</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{locked ? 'After the final check' : state === 'current' ? 'Current' : 'Available'}</span>
      </span>
    </button>
    <PracticeReviewJourneyStep />
    </>
  );
}

export function LessonProgressSummary({ read, total, checksDone, checksTotal, lessonCompleted }: { read: number; total: number; checksDone: number; checksTotal: number; lessonCompleted: boolean }) {
  const bar = (value: number, max: number) => (
    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-red-400 transition-all" style={{ width: `${max ? Math.round((value / max) * 100) : 0}%` }} /></div>
  );
  return (
    <div className="mt-4 hidden space-y-3 rounded-xl border border-slate-200 bg-white p-3 text-[10px] lg:block" data-testid="lesson-progress-summary">
      <div>
        <div className="flex items-center justify-between"><span className="font-semibold text-slate-500">{uiText('Chapters read')}</span><span className="font-bold text-slate-700">{uiCountOf(read, total)}</span></div>
        {bar(read, total)}
      </div>
      <div>
        <div className="flex items-center justify-between"><span className="font-semibold text-slate-500">{uiText('Knowledge Checks')}</span><span className="font-bold text-slate-700">{uiCountOf(checksDone, checksTotal)}</span></div>
        {bar(checksDone, checksTotal)}
      </div>
      <div className="flex items-center justify-between"><span className="font-semibold text-slate-500">{uiText('Lesson')}</span><span className={`font-bold ${lessonCompleted ? 'text-slate-900' : 'text-slate-400'}`}>{lessonCompleted ? uiText('Completed') : checksTotal === 0 ? uiText('No checks available') : uiChecksToGo(Math.max(0, checksTotal - checksDone))}</span></div>
    </div>
  );
}

const UNAVAILABLE_COPY: Record<'under-preparation' | 'under-review' | 'unavailable', { testId: string; label: string; body: string }> = {
  'under-preparation': {
    testId: 'assessment-under-preparation',
    label: 'Not available',
    body: 'This chapter does not have a Knowledge Check yet, so there is nothing to submit. Nothing is recorded as passed or failed, and you can continue to the next chapter.',
  },
  'under-review': {
    testId: 'assessment-under-review',
    label: 'Under Review',
    body: 'This chapter is under review, so it has no Knowledge Check yet. It is not required to continue.',
  },
  unavailable: {
    testId: 'assessment-load-error',
    label: 'Could not load',
    body: 'This chapter’s Knowledge Check could not be loaded. Nothing was recorded and your earlier results are unchanged. Try again in a moment.',
  },
};

export function AssessmentUnavailable({ mode, chapterLabel, onBack, onContinue, continueLabel, onRetry }: {
  mode: 'under-preparation' | 'under-review' | 'unavailable';
  chapterLabel: string;
  onBack: () => void;
  /** Offered when the chapter does not gate the next one (no check, or held). */
  onContinue?: () => void;
  continueLabel?: string;
  /** Offered when the questions failed to load. */
  onRetry?: () => void;
}) {
  const copy = UNAVAILABLE_COPY[mode] ?? UNAVAILABLE_COPY['under-preparation'];
  const canContinue = mode !== 'unavailable' && Boolean(onContinue);
  return (
    <main className={shell} data-testid={copy.testId} role={mode === 'unavailable' ? 'alert' : undefined}>
      <button type="button" onClick={onBack} className={backLink}><ArrowLeft className="h-3.5 w-3.5" /> Back to chapter</button>
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className={eyebrow}>Knowledge Check · {copy.label}</p>
        <h1 className="mt-2 text-xl font-black tracking-tight text-slate-900">{chapterLabel}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{copy.body}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onBack} className={secondaryButton}>Back to chapter</button>
          {mode === 'unavailable' && onRetry ? (
            <button type="button" onClick={onRetry} className={primaryButton} data-testid="assessment-retry"><RotateCcw className="h-4 w-4" /> Try again</button>
          ) : canContinue ? (
            <button type="button" onClick={onContinue} className={primaryButton} data-testid="assessment-continue">{continueLabel ?? 'Continue to next chapter'} <ArrowRight className="h-4 w-4" /></button>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export { LessonAssessmentStage } from './LessonAssessmentStage';

function AnswerReview<Q extends QuestionLike>({ questions, answers }: { questions: Q[]; answers: Record<string, string> }) {
  return (
    <ol className="mt-5 space-y-3" aria-label="Answers and explanations">
      {questions.map((question, position) => {
        const chosen = question.options.find((option) => option.id === answers[question.id]);
        const right = question.options.find((option) => option.id === question.correctOptionId);
        const correct = chosen?.id === question.correctOptionId;
        return (
          <li key={question.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${correct ? 'bg-slate-900 text-white' : 'bg-red-50 text-red-600 ring-1 ring-red-100'}`}>{correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{uiReviewQuestion(position + 1, correct)}</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-900">{question.question}</p>
              {!correct && <p className="mt-1 text-xs leading-5 text-slate-600"><span className="font-semibold text-slate-800">{uiText('Your answer:')}</span> {chosen?.text ?? uiText('Not answered')}</p>}
              <p className="mt-1 text-xs leading-5 text-slate-600"><span className="font-semibold text-slate-800">{uiText('Correct answer:')}</span> {right?.text}</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">{question.explanation}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ChapterCheckResult<Q extends QuestionLike>({
  lessonTitle, chapterLabel, questions, answers, score, legacyAccuracy, isFinal, nextChapterLabel, onContinue, onRetake, onBack,
}: {
  lessonTitle: string;
  chapterLabel: string;
  questions: Q[];
  answers: Record<string, string> | null;
  score: ScoreSummary | null;
  legacyAccuracy: number | null;
  isFinal: boolean;
  nextChapterLabel: string | null;
  onContinue: () => void;
  onRetake: () => void;
  onBack: () => void;
}) {
  return (
    <main className={shell} data-testid="chapter-check-result">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className={backLink}><ArrowLeft className="h-3.5 w-3.5" /> Back to chapter</button>
        <span className="truncate text-xs font-semibold text-slate-400">{lessonTitle}</span>
      </div>
      <p className={`mt-5 ${eyebrow}`}>{chapterLabel}</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-xl font-black tracking-tight text-slate-900">{uiText('Knowledge Check submitted')}</h1>
        <p className="text-sm font-semibold text-slate-600" data-testid="check-score">
          {score ? <><span className="text-2xl font-black text-slate-900">{score.accuracy}%</span> · {uiScoreLine(score.correct, score.total)}</> : legacyAccuracy !== null ? uiEarlierAttempt(legacyAccuracy) : uiText('Submitted earlier')}
        </p>
      </div>
      <p className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-semibold leading-5 text-slate-700" data-testid="check-unlock-message">
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
        {isFinal ? uiText('All chapter checks are complete. Your lesson takeaways are ready.') : uiUnlocked(nextChapterLabel ?? uiText('The next chapter'))}
      </p>
      {score && answers && <AnswerReview questions={questions} answers={answers} />}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onRetake} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-red-600"><RotateCcw className="h-3.5 w-3.5" /> {uiText('Retake check')}</button>
        <button type="button" onClick={onContinue} className={primaryButton} data-testid="check-continue">
          {uiText(isFinal ? 'View Lesson Takeaways' : 'Continue to Next Chapter')} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

export interface TakeawayChapterRow {
  index: number;
  title: string;
  restricted: boolean;
  submitted: boolean;
  historical: boolean;
  score: ScoreSummary | null;
  /** No usable Knowledge Check: shown as "No check", never as passed or failed. */
  notAssessable?: boolean;
}

export function LessonTakeawaysStage({
  lessonTitle, aggregate, legacyAccuracy, missedChapters, chapters, takeaways, nextTitle,
  onReviewChapter, onReviewCheck, onRetakeCheck, onContinue, onBackToChapters,
}: {
  lessonTitle: string;
  aggregate: ScoreSummary | null;
  legacyAccuracy: number | null;
  missedChapters: number[];
  chapters: TakeawayChapterRow[];
  takeaways: ResultTakeaways;
  nextTitle: string | null;
  onReviewChapter: (index: number) => void;
  onReviewCheck: (index: number) => void;
  onRetakeCheck: (index: number) => void;
  onContinue: () => void;
  onBackToChapters: () => void;
}) {
  const noCheck = (chapter: TakeawayChapterRow) => Boolean(chapter.notAssessable) && !chapter.submitted && !chapter.historical;
  const assessed = aggregate !== null || legacyAccuracy !== null || chapters.some((chapter) => !chapter.restricted && !noCheck(chapter));
  const someWithoutCheck = chapters.some(noCheck);
  return (
    <main className={shell} data-testid="lesson-takeaways">
      <button type="button" onClick={onBackToChapters} className={backLink}><ArrowLeft className="h-3.5 w-3.5" /> {uiText('Back to chapters')}</button>
      <p className={`mt-5 ${eyebrow}`}>{uiText('Final lesson takeaways')}</p>
      <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{lessonTitle}</h1>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-label="Lesson result">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{assessed ? 'Lesson completed · overall accuracy' : 'No Knowledge Check in this lesson'}</p>
            <p className="mt-1 text-5xl font-black tracking-tight text-slate-900" data-testid="results-accuracy">{aggregate ? `${aggregate.accuracy}%` : legacyAccuracy !== null ? `${legacyAccuracy}%` : '—'}</p>
          </div>
          {aggregate && (
            <div className="flex gap-2 text-xs font-semibold">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700" data-testid="results-correct">{aggregate.correct} correct</span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700" data-testid="results-incorrect">{aggregate.incorrect} incorrect</span>
            </div>
          )}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {aggregate ? feedbackFor(aggregate, missedChapters) : assessed ? 'You completed this lesson before chapter checks existed. Retake any chapter check to see a chapter-by-chapter score.' : 'This lesson has no Knowledge Check yet, so no score is recorded.'}
        </p>
        <p className="mt-2 text-[11px] text-slate-400">Accuracy = correct answers ÷ submitted questions × 100, across this lesson’s chapter checks.{someWithoutCheck ? ' Chapters without a Knowledge Check are not scored.' : ''}</p>
        <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100" aria-label="Chapter checks">
          {chapters.map((chapter) => (
            <li key={chapter.index} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs">
              <span className="min-w-0 flex-1 font-semibold text-slate-700"><span className="text-slate-400">{chapter.index + 1}.</span> {chapter.title}</span>
              <span className="text-slate-500">{chapter.restricted ? 'Under Review' : chapter.score ? `${chapter.score.correct}/${chapter.score.total}` : chapter.historical ? 'Completed earlier' : chapter.submitted ? 'Submitted' : noCheck(chapter) ? 'No check' : '—'}</span>
              {!chapter.restricted && (
                <span className="flex gap-3">
                  <button type="button" onClick={() => onReviewChapter(chapter.index)} className="font-semibold text-slate-500 hover:text-red-600">Chapter</button>
                  {chapter.submitted && !chapter.notAssessable && <button type="button" onClick={() => onReviewCheck(chapter.index)} className="font-semibold text-slate-500 hover:text-red-600">Answers</button>}
                  {!chapter.notAssessable && <button type="button" onClick={() => onRetakeCheck(chapter.index)} className="font-semibold text-red-600 hover:text-red-700">Retake</button>}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {takeaways.keyTakeaways.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6" aria-label="Key takeaways" data-testid="results-takeaways">
          <h2 className="text-sm font-black text-slate-900">{uiText('Key takeaways')}</h2>
          <ul className="mt-3 space-y-2">
            {takeaways.keyTakeaways.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600"><Check className="mt-1 h-4 w-4 shrink-0 text-red-600" />{item}</li>
            ))}
          </ul>
          {takeaways.businessImplications && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-red-600">{uiText('Business implications')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{takeaways.businessImplications}</p>
            </div>
          )}
          {takeaways.restrictedNotice && <p className="mt-4 text-xs leading-5 text-slate-500">Part of this lesson is under review, so these takeaways cover only the chapters that are available.</p>}
        </section>
      )}

      <PracticeReviewTakeawaysCard />

      <div className="mt-8 flex flex-col items-stretch gap-2 sm:items-end">
        <button type="button" onClick={onContinue} className={primaryButton} data-testid="continue-next-lesson">
          {uiText(nextTitle ? 'Continue to Next Lesson' : 'Back to lessons')} <ArrowRight className="h-4 w-4" />
        </button>
        {nextTitle && <p className="text-right text-xs text-slate-400">{uiNextTitle(nextTitle)}</p>}
      </div>
    </main>
  );
}
