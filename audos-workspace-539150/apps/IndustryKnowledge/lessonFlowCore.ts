// Shared lesson-flow state for every Domain Knowledge curriculum:
// Chapter 1 → Check 1 → Chapter 2 → Check 2 → … → final check → Lesson Takeaways → next lesson.
// Pure functions only; browser storage is passed in.
//
// Persistence identities (never filtered-array indexes):
// - Chapters: original index in the lesson deck. Review holds keep held chapters in place, so
//   `casemate:domain-reader:<persistenceKey>` notes, positions and `completed` stay aligned.
//   `completed` is the existing chapter record; the flow reads it as "chapters read".
// - Assessment: `casemate:domain-quiz:<persistenceKey>` keeps the legacy lesson-level `{ latest, best }`
//   fields untouched; chapter checks live under `chapters[<original chapter index>]`.
// - Lesson completion and access: `casemate:domain-lesson-progress:v1`, keyed by
//   `<industryId>::<module title>::<lesson title>` (the same exact titles the registry uses).
//   Lessons are freely navigable; completion is informational and never an access prerequisite.
//   Sequential gating applies only to chapters inside a lesson (`chapterProgress`).
//
// Chapter assessment status (`ChapterPlanStatus`):
// - 'ready': at least one usable question; the check gates the next chapter (submit, any score).
// - 'under-preparation': the questions loaded but none is usable. The chapter is NOT ASSESSABLE:
//   never passed or failed, nothing is recorded, and it does not gate the next chapter.
// - 'unavailable': the questions failed to load (or are still loading). Never treated as empty or
//   as a submission; it gates like an unsubmitted check until a retry succeeds.
// - 'under-review': held chapter; keeps its place and is not required.

export type LessonFlowStage = 'learning' | 'check' | 'takeaways';
export type AssessmentMode = 'canonical' | 'reduced' | 'under-preparation' | 'restricted' | 'unavailable';
export type AssessmentProgress = 'not-started' | 'in-progress' | 'submitted';
export type ChapterState = 'current' | 'available' | 'read' | 'completed' | 'locked' | 'under-review';
export type CheckState = 'locked' | 'available' | 'in-progress' | 'submitted' | 'under-preparation' | 'under-review' | 'unavailable';
export type ChapterPlanStatus = 'ready' | 'under-preparation' | 'under-review' | 'unavailable';
/** Whether the lesson's questions reached the engine. Only 'loaded' can mean "no usable question". */
export type AssessmentLoadState = 'loaded' | 'loading' | 'failed';

export const CANONICAL_QUESTION_COUNT = 10;
export const LESSON_PROGRESS_KEY = 'casemate:domain-lesson-progress:v1';
export const FLOW_MIGRATION_ID = 'lesson-flow-v1';
/** Marks the first load under chapter-level checks; `legacyCompletedChapters` is captured once at that moment. */
export const CHAPTER_FLOW_MIGRATION_ID = 'chapter-flow-v1';
export const MIN_CHAPTER_QUESTIONS = 1;
const MAX_ATTEMPTS_KEPT = 50;

export const readerStorageKey = (persistenceKey: string) => `casemate:domain-reader:${persistenceKey}`;
export const quizStorageKey = (persistenceKey: string) => `casemate:domain-quiz:${persistenceKey}`;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface QuestionLike {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation: string;
  moduleId?: string;
}

export interface ChapterLike {
  title?: string;
  reviewStatus?: string;
  recap?: string[];
  chapterRecap?: string;
}

export interface TakeawaysLike {
  learned?: string;
  keyTakeaways?: string[];
  businessImplications?: string;
  remember?: string;
  nextLesson?: string;
}

export function isRestrictedChapter(chapter: ChapterLike | undefined): boolean {
  return chapter?.reviewStatus === 'Under Review';
}

export function accessibleChapterIndexes(chapters: ChapterLike[]): number[] {
  return chapters.map((chapter, index) => (isRestrictedChapter(chapter) ? -1 : index)).filter((index) => index >= 0);
}

const isText = (value: unknown): value is string | number => typeof value === 'string' || typeof value === 'number';
const hasText = (value: unknown) => isText(value) && String(value).trim().length > 0;

/** Why a question cannot be shown, or null when it is usable. Never throws on malformed data. */
export function questionProblem(question: QuestionLike, chapters: ChapterLike[]): string | null {
  if (!isRecord(question)) return 'not a question object';
  if (!question.id || !isText(question.id)) return 'missing id';
  if (!hasText(question.question)) return 'empty question';
  const options: unknown[] = Array.isArray(question.options) ? question.options : [];
  if (options.length !== 4) return `expected 4 options, found ${options.length}`;
  if (!options.every((option): option is { id: string; text: string } => isRecord(option) && Boolean(option.id) && isText(option.id))) return 'malformed option';
  if (new Set(options.map((option) => option.id)).size !== 4) return 'repeated option id';
  if (options.some((option) => !hasText(option.text))) return 'empty option';
  if (options.filter((option) => option.id === question.correctOptionId).length !== 1) return 'answer key does not match one option';
  if (!hasText(question.explanation)) return 'missing explanation';
  const chapter = Number(question.moduleId);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > chapters.length) return `invalid chapter reference ${question.moduleId}`;
  if (isRestrictedChapter(chapters[chapter - 1])) return 'restricted chapter';
  return null;
}

export interface ChapterPlan<Q extends QuestionLike = QuestionLike> {
  index: number;
  status: ChapterPlanStatus;
  questions: Q[];
}

export interface ExcludedQuestion {
  id: string;
  reason: string;
  /** Lesson-local chapter number the question claimed, when it named a usable one. */
  chapter?: number;
}

export interface AssessmentPlan<Q extends QuestionLike = QuestionLike> {
  mode: AssessmentMode;
  /** Every accessible chapter has a valid check, so the lesson can be completed. */
  available: boolean;
  questions: Q[];
  validCount: number;
  chapters: ChapterPlan<Q>[];
  excluded: ExcludedQuestion[];
}

/**
 * Splits the questions the existing engine already selected into chapter checks, using each
 * question's own lesson-local chapter reference. Questions are never invented, repeated, moved to
 * another chapter or reordered; invalid or restricted ones are dropped. A chapter with no valid
 * question is Under Preparation (not assessable); a held chapter is Under Review and is not
 * required. When the questions did not load, chapters without questions are Unavailable instead.
 */
export function planAssessment<Q extends QuestionLike>(questions: Q[] | undefined, chapters: ChapterLike[], load: AssessmentLoadState = 'loaded'): AssessmentPlan<Q> {
  const excluded: ExcludedQuestion[] = [];
  const seen = new Set<string>();
  const valid: Q[] = [];
  (Array.isArray(questions) ? questions : []).forEach((question) => {
    const problem = questionProblem(question, chapters) ?? (seen.has(question.id) ? 'duplicate id' : null);
    if (problem) {
      const id = isRecord(question) && isText(question.id) && question.id !== '' ? String(question.id) : '(missing id)';
      const chapter = isRecord(question) ? Number(question.moduleId) : Number.NaN;
      excluded.push({ id, reason: problem, ...(Number.isInteger(chapter) && chapter >= 1 && chapter <= chapters.length ? { chapter } : {}) });
      return;
    }
    seen.add(question.id);
    valid.push(question);
  });
  const missing: ChapterPlanStatus = load === 'loaded' ? 'under-preparation' : 'unavailable';
  const chapterPlans: ChapterPlan<Q>[] = chapters.map((chapter, index) => {
    if (isRestrictedChapter(chapter)) return { index, status: 'under-review', questions: [] };
    const own = valid.filter((question) => Number(question.moduleId) === index + 1);
    return { index, status: own.length >= MIN_CHAPTER_QUESTIONS ? 'ready' : missing, questions: own };
  });
  const accessible = chapterPlans.filter((chapter) => chapter.status !== 'under-review');
  const validCount = valid.length;
  if (chapters.length > 0 && accessible.length === 0) return { mode: 'restricted', available: false, questions: [], validCount, chapters: chapterPlans, excluded };
  if (accessible.some((chapter) => chapter.status === 'unavailable')) {
    return { mode: 'unavailable', available: false, questions: valid, validCount, chapters: chapterPlans, excluded };
  }
  if (!accessible.length || accessible.some((chapter) => chapter.status === 'under-preparation')) {
    return { mode: 'under-preparation', available: false, questions: valid, validCount, chapters: chapterPlans, excluded };
  }
  return { mode: validCount >= CANONICAL_QUESTION_COUNT ? 'canonical' : 'reduced', available: true, questions: valid, validCount, chapters: chapterPlans, excluded };
}

export interface AssessmentDiagnostics {
  /** Questions dropped as unusable, with the reason. */
  excluded: ExcludedQuestion[];
  /** Chapter numbers (1-based) that loaded with no usable question. */
  notAssessable: number[];
  /** Chapter numbers (1-based) whose questions did not load. */
  unavailable: number[];
}

/** What a lesson's assessment data is missing, or null when every chapter has a usable check. */
export function assessmentDiagnostics(plan: Pick<AssessmentPlan, 'chapters' | 'excluded'>): AssessmentDiagnostics | null {
  const numbers = (status: ChapterPlanStatus) => plan.chapters.filter((chapter) => chapter.status === status).map((chapter) => chapter.index + 1);
  const diagnostics = { excluded: plan.excluded, notAssessable: numbers('under-preparation'), unavailable: numbers('unavailable') };
  return diagnostics.excluded.length || diagnostics.notAssessable.length || diagnostics.unavailable.length ? diagnostics : null;
}

export interface AttemptSummary {
  at: string;
  correct: number;
  total: number;
  accuracy: number;
}

export interface AssessmentDraft {
  questionIds: string[];
  answers: Record<string, string>;
  index: number;
  startedAt: string;
}

/** One check: the legacy lesson-level record and every chapter check share this shape. */
export interface CheckRecord {
  latest: number | null;
  best: number | null;
  attempts: AttemptSummary[];
  lastAnswers?: Record<string, string>;
  lastQuestionIds?: string[];
  submittedAt?: string;
  draft?: AssessmentDraft;
  [extra: string]: unknown;
}

export interface AssessmentRecord extends CheckRecord {
  /** Chapter checks keyed by the chapter's original index in the lesson deck. */
  chapters: Record<string, CheckRecord>;
}

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const stringMap = (value: unknown): Record<string, string> => (isRecord(value)
  ? Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === 'string')) as Record<string, string>
  : {});

/** Accepts the legacy `{ latest, best }` record and keeps any unknown fields untouched. */
export function parseAssessmentRecord(raw: unknown): AssessmentRecord {
  const value = isRecord(raw) ? raw : {};
  const chapters = isRecord(value.chapters)
    ? Object.fromEntries(Object.entries(value.chapters).filter(([key]) => /^\d+$/.test(key)).map(([key, check]) => [key, parseCheckRecord(check)]))
    : {};
  return { ...parseCheckRecord(value), chapters };
}

export function parseCheckRecord(raw: unknown): CheckRecord {
  const value = isRecord(raw) ? raw : {};
  const attempts = Array.isArray(value.attempts)
    ? value.attempts.filter((item): item is AttemptSummary => isRecord(item) && typeof item.accuracy === 'number')
    : [];
  const draftValue = isRecord(value.draft) ? value.draft : undefined;
  const draft = draftValue && Array.isArray(draftValue.questionIds)
    ? {
        questionIds: draftValue.questionIds.filter((id): id is string => typeof id === 'string'),
        answers: stringMap(draftValue.answers),
        index: typeof draftValue.index === 'number' ? draftValue.index : 0,
        startedAt: typeof draftValue.startedAt === 'string' ? draftValue.startedAt : '',
      }
    : undefined;
  return {
    ...value,
    latest: typeof value.latest === 'number' ? value.latest : null,
    best: typeof value.best === 'number' ? value.best : null,
    attempts,
    lastAnswers: isRecord(value.lastAnswers) ? stringMap(value.lastAnswers) : undefined,
    lastQuestionIds: Array.isArray(value.lastQuestionIds) ? value.lastQuestionIds.filter((id): id is string => typeof id === 'string') : undefined,
    submittedAt: typeof value.submittedAt === 'string' ? value.submittedAt : undefined,
    draft,
  };
}

/** A legacy score (`latest` set by the previous knowledge check) counts as a valid submission. */
export function hasSubmission(record: CheckRecord): boolean {
  return record.latest !== null || record.attempts.length > 0 || Boolean(record.submittedAt);
}

export function chapterCheck(record: AssessmentRecord, index: number): CheckRecord {
  return record.chapters[String(index)] ?? parseCheckRecord(null);
}

export function withChapterCheck(record: AssessmentRecord, index: number, check: CheckRecord): AssessmentRecord {
  return { ...record, chapters: { ...record.chapters, [String(index)]: check } };
}

export function assessmentProgress(record: CheckRecord): AssessmentProgress {
  if (hasSubmission(record)) return 'submitted';
  return record.draft && Object.keys(record.draft.answers).length > 0 ? 'in-progress' : 'not-started';
}

const sameIds = (left: string[], right: string[]) => left.length === right.length && left.every((id, index) => id === right[index]);

/** Resumes a draft only when it was started on exactly the same presented questions. */
export function startOrResumeDraft<R extends CheckRecord>(record: R, questions: QuestionLike[], now: string): R {
  const questionIds = questions.map((question) => question.id);
  if (record.draft && sameIds(record.draft.questionIds, questionIds)) {
    return { ...record, draft: { ...record.draft, index: clampIndex(record.draft.index, questionIds.length) } };
  }
  return { ...record, draft: { questionIds, answers: {}, index: 0, startedAt: now } };
}

const clampIndex = (index: number, length: number) => Math.max(0, Math.min(Math.max(0, length - 1), Math.trunc(Number(index) || 0)));

export function selectDraftAnswer<R extends CheckRecord>(record: R, questionId: string, optionId: string): R {
  if (!record.draft || !record.draft.questionIds.includes(questionId)) return record;
  return { ...record, draft: { ...record.draft, answers: { ...record.draft.answers, [questionId]: optionId } } };
}

export function moveDraft<R extends CheckRecord>(record: R, index: number): R {
  if (!record.draft) return record;
  return { ...record, draft: { ...record.draft, index: clampIndex(index, record.draft.questionIds.length) } };
}

export function canSubmit(record: CheckRecord, questions: QuestionLike[]): boolean {
  const draft = record.draft;
  if (!draft || !questions.length || !sameIds(draft.questionIds, questions.map((question) => question.id))) return false;
  return questions.every((question) => question.options.some((option) => option.id === draft.answers[question.id]));
}

export interface ScoreSummary {
  correct: number;
  incorrect: number;
  total: number;
  accuracy: number;
}

/** Accuracy = correct ÷ submitted questions × 100, rounded, exactly as the previous knowledge check. */
export function scoreAnswers(questions: QuestionLike[], answers: Record<string, string>): ScoreSummary {
  const total = questions.length;
  const correct = questions.filter((question) => answers[question.id] === question.correctOptionId).length;
  return { correct, incorrect: total - correct, total, accuracy: total ? Math.round((correct / total) * 100) : 0 };
}

export function submitDraft<R extends CheckRecord>(record: R, questions: QuestionLike[], now: string): { record: R; score: ScoreSummary } | null {
  if (!canSubmit(record, questions) || !record.draft) return null;
  const answers = { ...record.draft.answers };
  const score = scoreAnswers(questions, answers);
  const attempts = [...record.attempts, { at: now, correct: score.correct, total: score.total, accuracy: score.accuracy }].slice(-MAX_ATTEMPTS_KEPT);
  const { draft: _draft, ...rest } = record;
  return {
    score,
    record: {
      ...(rest as R),
      latest: score.accuracy,
      best: Math.max(record.best ?? 0, score.accuracy),
      attempts,
      lastAnswers: answers,
      lastQuestionIds: questions.map((question) => question.id),
      submittedAt: now,
    },
  };
}

/** Retake keeps every historical score and attempt; only a fresh draft is started. */
export function retakeAssessment<R extends CheckRecord>(record: R, questions: QuestionLike[], now: string): R {
  return { ...record, draft: { questionIds: questions.map((question) => question.id), answers: {}, index: 0, startedAt: now } };
}

export function missedChapters(questions: QuestionLike[], answers: Record<string, string>): number[] {
  return Array.from(new Set(questions.filter((question) => answers[question.id] !== question.correctOptionId).map((question) => Number(question.moduleId))))
    .filter((chapter) => Number.isInteger(chapter) && chapter > 0)
    .sort((left, right) => left - right);
}

export function feedbackFor(score: ScoreSummary, missed: number[]): string {
  const chapters = missed.length ? `Chapter${missed.length > 1 ? 's' : ''} ${missed.join(', ')}` : '';
  if (score.total && score.correct === score.total) return 'Every answer was correct.';
  if (score.accuracy >= 80) return `Strong grasp of the lesson. A quick look at ${chapters} will close the remaining gap.`;
  if (score.accuracy >= 50) return `A solid base. Review ${chapters} before an interview conversation on this topic.`;
  return `Several ideas have not settled yet. Revisit ${chapters}, then retake the check when you are ready.`;
}

/** Sidebar and header titles carry no numeric prefix; the number lives in the badge. */
export const stripChapterNumber = (title?: string) => String(title ?? '')
  .replace(/^(?:chapter\s+\d{1,2}\s*[:.\-\u2013\u2014]\s*|\d{1,2}(?:\.\d{1,2})+\s+|\d{1,2}[.:)]\s+|0\d\s+)(?=\S)/i, '');

// Reading progress ------------------------------------------------------------------------

export function readingProgress(completed: number[], chapters: ChapterLike[]): { read: number; total: number } {
  const accessible = accessibleChapterIndexes(chapters);
  const done = new Set(completed);
  return { read: accessible.filter((index) => done.has(index)).length, total: accessible.length };
}

/** Records an intentional "continue" as read. Held chapters are never recorded. */
export function markChapterRead(completed: number[], index: number, chapters: ChapterLike[]): number[] {
  if (!Number.isInteger(index) || index < 0 || index >= chapters.length || isRestrictedChapter(chapters[index])) return completed;
  if (completed.includes(index)) return completed;
  return [...completed, index].sort((left, right) => left - right);
}

// Chapter progression -------------------------------------------------------------------

export interface ChapterProgress {
  index: number;
  restricted: boolean;
  plan: ChapterPlanStatus;
  read: boolean;
  submitted: boolean;
  /** Completed in the earlier reader ("Mark complete") before chapter checks existed. */
  historical: boolean;
  /** A real submission or a historical completion; never set for a missing assessment. */
  complete: boolean;
  unlocked: boolean;
  check: CheckState;
  /** Loaded with no usable question: neither passed nor failed, and not required. Always set by `chapterProgress`. */
  notAssessable?: boolean;
}

/** A chapter whose check can never be submitted because no usable question exists. */
export const isNotAssessable = (chapter: Pick<ChapterProgress, 'plan' | 'restricted'>) => !chapter.restricted && chapter.plan === 'under-preparation';

/**
 * Sequential chapter gate. The first chapter is open; every later chapter opens once the previous
 * accessible chapter is complete (check submitted, any score). A not-assessable chapter passes the
 * gate as soon as it is open, without recording anything. A check that failed to load keeps the
 * gate closed (unless it was already submitted). Held chapters keep their place, show Under Review
 * and are not required. Historical chapter or lesson completion keeps access.
 */
export function chapterProgress(args: {
  plan: Pick<AssessmentPlan, 'chapters'>;
  record: AssessmentRecord;
  completed: number[];
  legacyCompletedChapters: number[];
  lessonLegacyComplete: boolean;
}): ChapterProgress[] {
  const { plan, record, completed, legacyCompletedChapters, lessonLegacyComplete } = args;
  let gateOpen = true;
  return plan.chapters.map((chapter) => {
    const restricted = chapter.status === 'under-review';
    const check = chapterCheck(record, chapter.index);
    const submitted = !restricted && hasSubmission(check);
    const historical = !restricted && legacyCompletedChapters.includes(chapter.index);
    const complete = submitted || historical;
    const unlocked = lessonLegacyComplete || gateOpen || historical;
    const notAssessable = !restricted && chapter.status === 'under-preparation';
    if (!restricted) gateOpen = complete || (notAssessable && unlocked);
    const state: CheckState = restricted
      ? 'under-review'
      : notAssessable ? (unlocked ? 'under-preparation' : 'locked')
        : submitted ? 'submitted'
          : !unlocked ? 'locked'
            : chapter.status === 'unavailable' ? 'unavailable'
              : check.draft && Object.keys(check.draft.answers).length ? 'in-progress' : 'available';
    return { index: chapter.index, restricted, plan: chapter.status, read: completed.includes(chapter.index), submitted, historical, complete, unlocked, check: state, notAssessable };
  });
}

/** Chapters whose check counts towards lesson completion: assessable ones plus any already completed. */
export function requiredChecks(progress: ChapterProgress[]): ChapterProgress[] {
  return progress.filter((chapter) => !chapter.restricted && (chapter.complete || !isNotAssessable(chapter)));
}

/**
 * Every check that can be submitted has been submitted. Not-assessable chapters are not required,
 * but a lesson with no submitted or historical check is never complete, so no completion is invented.
 */
export function lessonChecksComplete(progress: ChapterProgress[]): boolean {
  const required = requiredChecks(progress);
  return required.length > 0 && required.every((chapter) => chapter.complete);
}

/**
 * Final Lesson Takeaways open once every check is complete, or when the lesson has no check that
 * could be submitted at all (every open chapter is not assessable). The latter records nothing.
 */
export function lessonTakeawaysAvailable(progress: ChapterProgress[]): boolean {
  if (lessonChecksComplete(progress)) return true;
  const open = progress.filter((chapter) => !chapter.restricted);
  return open.length > 0 && open.every((chapter) => isNotAssessable(chapter) && chapter.unlocked);
}

export function chapterDisplayState(chapter: ChapterProgress, activeIndex: number, stage: LessonFlowStage): ChapterState {
  if (chapter.restricted) return 'under-review';
  if (!chapter.unlocked) return 'locked';
  if (chapter.index === activeIndex && stage !== 'takeaways') return 'current';
  if (chapter.complete) return 'completed';
  return chapter.read ? 'read' : 'available';
}

/** Where a refresh or stale link may land: the requested chapter if open, else the first open incomplete one. */
export function resolveStartChapter(progress: ChapterProgress[], requested: number): number {
  if (progress[requested]?.unlocked) return requested;
  const open = progress.filter((chapter) => chapter.unlocked);
  return (open.find((chapter) => !chapter.complete && !chapter.restricted) ?? open[open.length - 1] ?? progress[0])?.index ?? 0;
}

/** One Learning Journey row: what the reader's chapter list shows for a chapter and its Knowledge Check. */
export interface JourneyRow {
  /** Original chapter index in the lesson deck. */
  index: number;
  number: number;
  title: string;
  minutes: number;
  state: ChapterState;
  check: CheckState;
  /** Number of the check that must be submitted before this chapter opens. */
  lockedBy: number | null;
  /** The blocking check could not load, so it cannot be submitted until a retry succeeds. */
  lockedByPreparation: boolean;
}

/**
 * The Learning Journey rows for a lesson. The reader and the practice modes both render these rows,
 * so chapter titles, order and current / available / completed / locked / held states always match.
 */
export function journeyRows<C extends ChapterLike>(
  progress: ChapterProgress[],
  cards: C[],
  activeIndex: number,
  stage: LessonFlowStage,
  title: (card: C, index: number) => string,
  minutes: (card: C) => number,
): JourneyRow[] {
  return cards.map((card, index) => {
    const chapter = progress[index];
    const previousRequired = progress.slice(0, index).reverse().find((item) => !item.restricted && !isNotAssessable(item));
    return {
      index,
      number: index + 1,
      title: title(card, index),
      minutes: minutes(card),
      state: chapter ? chapterDisplayState(chapter, activeIndex, stage) : 'available',
      check: chapter?.check ?? 'locked',
      lockedBy: previousRequired ? previousRequired.index + 1 : null,
      lockedByPreparation: previousRequired?.plan === 'unavailable',
    };
  });
}

/** Lesson accuracy is the sum of the latest submitted chapter checks. */
export function aggregateChapterScores<Q extends QuestionLike>(plan: Pick<AssessmentPlan<Q>, 'chapters'>, record: AssessmentRecord): {
  score: ScoreSummary | null;
  chapters: Array<{ index: number; score: ScoreSummary | null; answers: Record<string, string> | null }>;
} {
  let correct = 0;
  let total = 0;
  const chapters = plan.chapters.filter((chapter) => chapter.status === 'ready').map((chapter) => {
    const check = chapterCheck(record, chapter.index);
    const ids = chapter.questions.map((question) => question.id);
    const answers = check.lastAnswers && check.lastQuestionIds && check.lastQuestionIds.length === ids.length && check.lastQuestionIds.every((id, position) => id === ids[position]) ? check.lastAnswers : null;
    const score = answers ? scoreAnswers(chapter.questions, answers) : null;
    if (score) { correct += score.correct; total += score.total; }
    return { index: chapter.index, score, answers };
  });
  return { score: total ? { correct, incorrect: total - correct, total, accuracy: Math.round((correct / total) * 100) } : null, chapters };
}

/** First load under chapter checks: pre-flow "Mark complete" chapters become preserved historical completions. */
export function prepareChapterFlowState<S extends { completed?: number[]; migrations?: string[]; legacyCompletedChapters?: number[] }>(state: S): S {
  const migrations = Array.isArray(state.migrations) ? state.migrations : [];
  if (migrations.includes(CHAPTER_FLOW_MIGRATION_ID)) return state;
  const usedLessonFlow = migrations.includes(FLOW_MIGRATION_ID);
  const completed = Array.isArray(state.completed) ? state.completed.filter((index) => Number.isInteger(index)) : [];
  return {
    ...state,
    legacyCompletedChapters: usedLessonFlow ? [] : completed,
    migrations: [...migrations, ...(usedLessonFlow ? [] : [FLOW_MIGRATION_ID]), CHAPTER_FLOW_MIGRATION_ID],
  };
}

// Other lessons of the curriculum ---------------------------------------------------------
// Practice that spans lessons (Flashcards module / all scopes, the Learning Mode Chooser, Match & Sort
// activities citing another lesson) cannot load that lesson's questions, so it receives the statuses the
// reader's own plan gave each chapter (`LessonNeighbour.assessment`) and applies the same gate.

/**
 * A lesson's chapter plan rebuilt from per-chapter statuses. A chapter with no known status is treated
 * as having a check to submit, so missing or stale data never opens a chapter early. Held chapters are
 * always Under Review.
 */
export function chapterPlanFromStatuses(chapters: ChapterLike[], assessment?: ReadonlyArray<ChapterPlanStatus | undefined>): Pick<AssessmentPlan, 'chapters'> {
  return {
    chapters: chapters.map((chapter, index) => {
      const known = assessment?.[index];
      const status: ChapterPlanStatus = isRestrictedChapter(chapter) ? 'under-review' : known === 'under-preparation' || known === 'unavailable' ? known : 'ready';
      return { index, status, questions: [] };
    }),
  };
}

/** Each chapter's status in a lesson plan, in the form other lessons receive it. */
export const assessmentStatuses = (plan: Pick<AssessmentPlan, 'chapters'>): ChapterPlanStatus[] => plan.chapters.map((chapter) => chapter.status);

/**
 * The reader's chapter gate for a lesson that is not open, from the records the reader itself keeps:
 * chapter checks, legacy chapter completion and lesson completion. Nothing is written.
 */
export function storedChapterProgress(identity: string, persistenceKey: string | undefined, chapters: ChapterLike[], storage: StorageLike | null, assessment?: ReadonlyArray<ChapterPlanStatus | undefined>): ChapterProgress[] {
  const record = parseAssessmentRecord(persistenceKey ? readJson(storage, quizStorageKey(persistenceKey)) : null);
  const stored = persistenceKey ? readJson(storage, readerStorageKey(persistenceKey)) : null;
  const reader = prepareChapterFlowState((isRecord(stored) ? stored : {}) as { completed?: number[]; migrations?: string[]; legacyCompletedChapters?: number[] });
  const completed = Array.isArray(reader.completed) ? reader.completed.filter((index) => Number.isInteger(index)) : [];
  const legacy = Array.isArray(reader.legacyCompletedChapters) ? reader.legacyCompletedChapters.filter((index) => Number.isInteger(index)) : [];
  const lessonLegacyComplete = Boolean(loadProgressStore(storage)[identity]?.completedAt) || hasSubmission(record);
  return chapterProgress({ plan: chapterPlanFromStatuses(chapters, assessment), record, completed, legacyCompletedChapters: legacy, lessonLegacyComplete });
}

/**
 * The stricter gate Match & Sort applies to a chapter cited in another lesson: open when every earlier
 * chapter with a check to submit has a submitted check. Held and not-assessable chapters never gate;
 * legacy "Mark complete" history is not consulted, so this is never more open than the reader.
 */
export function openBySubmittedChecks(chapters: ChapterLike[], record: AssessmentRecord, index: number, assessment?: ReadonlyArray<ChapterPlanStatus | undefined>): boolean {
  const plan = chapterPlanFromStatuses(chapters, assessment).chapters;
  return chapters.slice(0, index).every((_, position) => plan[position].status === 'under-review' || plan[position].status === 'under-preparation' || hasSubmission(chapterCheck(record, position)));
}

// Results takeaways -----------------------------------------------------------------------

export interface ResultTakeaways {
  keyTakeaways: string[];
  businessImplications: string | null;
  restrictedNotice: boolean;
}

const firstSentence = (text: string) => (text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text).trim();

/**
 * 3–5 takeaways. A lesson with held chapters never shows authored lesson-level takeaways or
 * implications, because they may restate held claims; it falls back to the recap of chapters
 * that are not under review.
 */
export function resolveResultTakeaways(takeaways: TakeawaysLike | undefined, chapters: ChapterLike[]): ResultTakeaways {
  const restricted = chapters.some(isRestrictedChapter);
  const authored = (takeaways?.keyTakeaways ?? []).map((item) => String(item ?? '').trim()).filter(Boolean);
  if (!restricted && authored.length) {
    return { keyTakeaways: authored.slice(0, 5), businessImplications: takeaways?.businessImplications?.trim() || null, restrictedNotice: false };
  }
  const fromChapters = accessibleChapterIndexes(chapters)
    .map((index) => chapters[index])
    .map((chapter) => String(chapter.recap?.find((item) => String(item ?? '').trim()) ?? (chapter.chapterRecap ? firstSentence(chapter.chapterRecap) : '')).trim())
    .filter(Boolean);
  return { keyTakeaways: Array.from(new Set(fromChapters)).slice(0, 5), businessImplications: null, restrictedNotice: restricted };
}

// Recap -----------------------------------------------------------------------------------

const normaliseText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** One "What to Remember" block: bullet recap plus the paragraph recap only when it adds something. */
export function mergeRecap(recap: string[] | undefined, chapterRecap: string | undefined): { summary: string | null; points: string[] } {
  const points = Array.from(new Set((recap ?? []).map((item) => String(item ?? '').trim()).filter(Boolean)));
  const paragraph = String(chapterRecap ?? '').trim();
  if (!paragraph) return { summary: null, points };
  const normalisedParagraph = normaliseText(paragraph);
  const duplicated = points.length > 0 && points.every((point) => normalisedParagraph.includes(normaliseText(point)));
  if (duplicated) return { summary: null, points };
  if (points.some((point) => normaliseText(point) === normalisedParagraph)) return { summary: null, points };
  return { summary: paragraph, points };
}

// Lesson order, completion and unlock -------------------------------------------------------

export const lessonIdentity = (industryId: string, moduleTitle: string, lessonTitle: string) => `${industryId}::${moduleTitle}::${lessonTitle}`;

export interface LessonRef {
  identity: string;
  moduleTitle: string;
  lessonTitle: string;
  moduleIndex: number;
  lessonIndex: number;
}

export function buildLessonOrder(industryId: string, modules: Array<{ title: string; lessons: string[] }>): LessonRef[] {
  return modules.flatMap((module, moduleIndex) => module.lessons.map((lessonTitle, lessonIndex) => ({
    identity: lessonIdentity(industryId, module.title, lessonTitle),
    moduleTitle: module.title,
    lessonTitle,
    moduleIndex,
    lessonIndex,
  })));
}

export function neighbours(order: LessonRef[], identity: string): { previous: LessonRef | null; next: LessonRef | null; position: number } {
  const position = order.findIndex((item) => item.identity === identity);
  return {
    position,
    previous: position > 0 ? order[position - 1] : null,
    next: position >= 0 && position < order.length - 1 ? order[position + 1] : null,
  };
}

export interface LessonProgressEntry {
  completedAt?: string;
  source?: 'assessment' | 'legacy-assessment' | 'legacy-chapters';
  access?: 'historical' | 'unlocked';
  accessAt?: string;
  persistenceKey?: string;
}

export type LessonProgressStore = Record<string, LessonProgressEntry>;

export function loadProgressStore(storage: StorageLike | null): LessonProgressStore {
  if (!storage) return {};
  try {
    const parsed = JSON.parse(storage.getItem(LESSON_PROGRESS_KEY) ?? '{}');
    return isRecord(parsed) ? parsed as LessonProgressStore : {};
  } catch {
    return {};
  }
}

/** Merges into the latest stored value; existing completion is never removed or replaced. */
export function updateProgressStore(storage: StorageLike | null, identity: string, patch: LessonProgressEntry): LessonProgressStore {
  const store = loadProgressStore(storage);
  const current = store[identity] ?? {};
  const next: LessonProgressEntry = { ...current };
  if (patch.persistenceKey) next.persistenceKey = patch.persistenceKey;
  if (patch.completedAt && !current.completedAt) {
    next.completedAt = patch.completedAt;
    next.source = patch.source;
  }
  if (patch.access && !current.access) {
    next.access = patch.access;
    next.accessAt = patch.accessAt;
  }
  const updated = { ...store, [identity]: next };
  try {
    storage?.setItem(LESSON_PROGRESS_KEY, JSON.stringify(updated));
  } catch {
    // Progress stays usable for this session when storage is unavailable.
  }
  return updated;
}

export interface ReaderSnapshot {
  notes?: Record<string, string>;
  completed?: number[];
  positions?: Record<string, number>;
  migrations?: string[];
}

export function readJson(storage: StorageLike | null, key: string): unknown {
  if (!storage) return null;
  try {
    return JSON.parse(storage.getItem(key) ?? 'null');
  } catch {
    return null;
  }
}

export interface LegacyLessonEvidence {
  /** The learner already opened or used this lesson before the flow existed. */
  history: boolean;
  /** Completion recorded by the previous experience, if any. */
  completedSource: LessonProgressEntry['source'] | null;
}

/**
 * Evidence stored under a lesson's existing persistence key. A submitted legacy knowledge check is
 * a completion. All accessible chapters marked complete in the previous reader also count, but only
 * until the flow has run once for that lesson (FLOW_MIGRATION_ID); after that, chapters are "read".
 */
export function legacyEvidence(reader: unknown, quiz: unknown, chapters: ChapterLike[] | null): LegacyLessonEvidence {
  const state = (isRecord(reader) ? reader : {}) as ReaderSnapshot;
  const record = parseAssessmentRecord(quiz);
  const notes = isRecord(state.notes) ? Object.values(state.notes).some((note) => String(note ?? '').trim()) : false;
  const completed = Array.isArray(state.completed) ? state.completed.filter((index) => Number.isInteger(index)) : [];
  const positions = isRecord(state.positions) ? Object.keys(state.positions).length > 0 : false;
  const migrated = Array.isArray(state.migrations) && state.migrations.includes(FLOW_MIGRATION_ID);
  const history = notes || completed.length > 0 || positions || hasSubmission(record);
  let completedSource: LessonProgressEntry['source'] | null = null;
  if (hasSubmission(record)) completedSource = 'legacy-assessment';
  else if (!migrated && chapters?.length) {
    const accessible = accessibleChapterIndexes(chapters);
    if (accessible.length && accessible.every((index) => completed.includes(index))) completedSource = 'legacy-chapters';
  }
  return { history, completedSource };
}

export interface UnlockInput {
  isFirst: boolean;
  current: LessonProgressEntry | undefined;
  previous: LessonProgressEntry | undefined;
  currentEvidence: LegacyLessonEvidence | null;
  previousEvidence: LegacyLessonEvidence | null;
}

export type UnlockReason = 'first' | 'completed' | 'unlocked-before' | 'historical' | 'previous-completed' | 'previous-legacy' | 'open';

/**
 * Every lesson in an available module is open; earlier lessons never gate access. The reason is
 * kept only so legacy completion evidence is still recorded exactly once. Review holds and
 * in-development lessons are enforced separately and are not affected.
 */
export function resolveUnlock(input: UnlockInput): { unlocked: boolean; reason: UnlockReason } {
  if (input.isFirst) return { unlocked: true, reason: 'first' };
  if (input.current?.completedAt) return { unlocked: true, reason: 'completed' };
  if (input.current?.access) return { unlocked: true, reason: 'unlocked-before' };
  if (input.currentEvidence?.history || input.currentEvidence?.completedSource) return { unlocked: true, reason: 'historical' };
  if (input.previous?.completedAt) return { unlocked: true, reason: 'previous-completed' };
  if (input.previousEvidence?.completedSource) return { unlocked: true, reason: 'previous-legacy' };
  return { unlocked: true, reason: 'open' };
}

export type LessonCardState = 'completed' | 'in-progress' | 'not-started';

/** Module overview status: informational only, never an access rule. */
export function lessonCardState(entry: LessonProgressEntry | undefined, evidence: LegacyLessonEvidence | null): LessonCardState {
  if (entry?.completedAt || evidence?.completedSource) return 'completed';
  if (entry?.access || evidence?.history) return 'in-progress';
  return 'not-started';
}
