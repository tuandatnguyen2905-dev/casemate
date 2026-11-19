import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ListChecks,
  Play,
  Shuffle,
  Timer,
} from 'lucide-react';
import { tw } from '../lib/colors';
import {
  OA_DEFAULT_COUNT,
  OA_DEFAULT_DIFFICULTY,
  OA_DIFFICULTIES,
  OA_MIN_BLOCK,
  OA_MIN_CATEGORIES,
  OA_QUESTION_COUNTS,
  OA_SECONDS_PER_QUESTION,
  buildOaSession,
  oaAvailability,
  oaDifficultyLabel,
  oaTimeLimitSeconds,
  parseOaSessionId,
} from '../lib/onlineAssessmentSession';
import type { OaBlock, OaDifficulty, OaPools, OaQuestionCount, OaSession, OaSummary } from '../lib/onlineAssessmentSession';

const PILL_BASE = 'inline-flex items-center justify-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition sm:text-[13px]';
const PILL_ON = 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]';
const PILL_OFF = 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]';
const PILL_DISABLED = 'cursor-not-allowed border-dashed border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)] opacity-70';
const CARD = 'rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4';

export const OA_LEAVE_MESSAGE = 'Leave the Online Assessment Simulation? Your answers in this session will be discarded and nothing will be saved.';

function clock(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const mm = hours ? String(minutes).padStart(2, '0') : String(minutes);
  return `${hours ? `${hours}:` : ''}${mm}:${String(seconds).padStart(2, '0')}`;
}

function minutesLabel(seconds: number): string {
  return `${Math.round(seconds / 60)} min`;
}

function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export interface OaHistoryRow {
  id: number;
  test_id: string;
  score: number;
  total: number;
  percent: number | null;
  duration_seconds: number | null;
  timed_out: boolean | null;
  created_at: string;
}

/* ========================================================================== *
 * Setup
 * ========================================================================== */

interface SetupProps<Q extends { id: string }> {
  pools: OaPools<Q>;
  categoryLabel: (category: string) => string;
  history: OaHistoryRow[];
  onStart: (session: OaSession<Q>) => void;
  onBack: () => void;
}

export function OnlineAssessmentSetup<Q extends { id: string }>({ pools, categoryLabel, history, onStart, onBack }: SetupProps<Q>) {
  const [difficulty, setDifficulty] = useState<OaDifficulty>(OA_DEFAULT_DIFFICULTY);
  const [count, setCount] = useState<OaQuestionCount>(OA_DEFAULT_COUNT);
  const [dealt, setDealt] = useState(0);

  const availability = useMemo(
    () => Object.fromEntries(OA_DIFFICULTIES.map(({ id }) => [id, oaAvailability(pools, id, count)])) as Record<OaDifficulty, ReturnType<typeof oaAvailability>>,
    [pools, count],
  );
  const current = availability[difficulty];
  const built = useMemo(() => (current.ok ? buildOaSession(pools, difficulty, count) : null), [pools, difficulty, count, current.ok, dealt]);
  const session = built && built.ok ? built.session : null;
  const timeLimit = oaTimeLimitSeconds(count);

  const shortfall = (() => {
    if (session) return null;
    const level = oaDifficultyLabel(difficulty);
    const smaller = current.largestCount && current.largestCount < count ? current.largestCount : null;
    const tips = [smaller ? `choose ${smaller} questions` : null, difficulty !== 'mixed' ? 'choose Mixed difficulty' : null].filter(Boolean);
    const what = current.reason === 'categories'
      ? `Only ${current.categories.length} test ${current.categories.length === 1 ? 'type has' : 'types have'} at least ${OA_MIN_BLOCK} ${difficulty === 'mixed' ? '' : `${level}-rated `}questions, and a simulation needs ${OA_MIN_CATEGORIES} or more.`
      : `There are not enough ${difficulty === 'mixed' ? '' : `${level}-rated `}questions in the bank to build a ${count}-question session across ${OA_MIN_CATEGORIES} or more test types.`;
    return `${what}${tips.length ? ` Try to ${tips.join(' or ')}.` : ''}`;
  })();

  const skippedNote = difficulty !== 'mixed' && current.skipped.length
    ? `${joinNames(current.skipped.map(categoryLabel))} ${current.skipped.length === 1 ? 'has' : 'have'} no ${oaDifficultyLabel(difficulty)}-rated questions yet, so ${current.skipped.length === 1 ? 'it is' : 'they are'} left out at this level.`
    : null;

  const pastSessions = history.slice(0, 6);

  return (
    <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
      <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6" data-testid="oa-setup">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
          <ChevronLeft className="h-4 w-4" />
          All test types
        </button>

        <header className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
            <Timer className="h-5 w-5 text-[var(--space-text-brand)]" />
          </div>
          <div className="min-w-0 space-y-1">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Online Assessment Simulation</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Sit one realistic, uninterrupted online assessment: several test types in a row, one block after another, against a
              single countdown. Use it to check whether you are ready for the assessment in your application email.
            </p>
          </div>
        </header>

        <section className={CARD} aria-labelledby="oa-difficulty">
          <h2 id="oa-difficulty" className="text-sm font-bold text-[var(--space-text-primary)]">Difficulty</h2>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Difficulty">
            {OA_DIFFICULTIES.map(({ id, label }) => {
              const option = availability[id];
              const active = difficulty === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  aria-disabled={!option.ok}
                  onClick={() => setDifficulty(id)}
                  className={`${PILL_BASE} ${active ? PILL_ON : option.ok ? PILL_OFF : PILL_DISABLED}`}
                  data-testid={`oa-difficulty-${id}`}
                  title={option.ok ? undefined : 'Not enough rated questions for this session size'}
                >
                  {label}
                  {!option.ok ? <span className="text-[10px] font-bold uppercase">· unavailable</span> : null}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]">
            Easy, Medium and Hard only use questions that carry that rating. Unrated questions (most AssessmentDay booklets, Critical
            Thinking and Mechanical Reasoning) appear only under Mixed.
          </p>
          {skippedNote ? <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{skippedNote}</p> : null}
        </section>

        <section className={CARD} aria-labelledby="oa-count">
          <h2 id="oa-count" className="text-sm font-bold text-[var(--space-text-primary)]">Number of questions</h2>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Number of questions">
            {OA_QUESTION_COUNTS.map((option) => {
              const active = count === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCount(option)}
                  className={`${PILL_BASE} ${active ? PILL_ON : PILL_OFF}`}
                  data-testid={`oa-count-${option}`}
                >
                  {option} questions
                  <span className={`rounded-full px-1.5 text-[11px] font-bold ${active ? 'bg-[color-mix(in_srgb,var(--space-text-on-primary)_22%,transparent)]' : 'bg-[var(--space-surface-muted)]'}`}>
                    {minutesLabel(oaTimeLimitSeconds(option))}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]">
            The time limit is set automatically at {OA_SECONDS_PER_QUESTION / 60} minutes per question.
          </p>
        </section>

        <section className={CARD} aria-labelledby="oa-structure" data-testid="oa-structure">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="oa-structure" className="text-sm font-bold text-[var(--space-text-primary)]">Session structure</h2>
            {session ? (
              <button
                type="button"
                onClick={() => setDealt((value) => value + 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)]"
                data-testid="oa-reshuffle"
              >
                <Shuffle className="h-3.5 w-3.5" />
                Deal different test types
              </button>
            ) : null}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: 'Questions', value: String(count) },
              { label: 'Time limit', value: minutesLabel(timeLimit) },
              { label: 'Test-type blocks', value: session ? String(session.blocks.length) : '—' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[var(--space-surface-muted)] px-3 py-2">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{item.label}</span>
                <span className="mt-0.5 block text-lg font-bold text-[var(--space-text-primary)]">{item.value}</span>
              </div>
            ))}
          </div>

          {session ? (
            <ol className="mt-3 space-y-1.5" data-testid="oa-block-list">
              {session.blocks.map((block, i) => (
                <li key={block.category} className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--space-border-default)] px-3 py-2">
                  <span className="rounded-full bg-[var(--space-brand-primary)] px-2 py-0.5 text-[11px] font-bold text-[var(--space-text-on-primary)]">Block {i + 1}</span>
                  <span className="text-sm font-semibold text-[var(--space-text-primary)]">{categoryLabel(block.category)}</span>
                  <span className="ml-auto text-xs text-[var(--space-text-secondary)]">
                    {block.size} questions · Q{block.start + 1}–{block.start + block.size}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_10%,transparent)] p-3" role="alert" data-testid="oa-shortfall">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-warning-700)]" />
              <p className="text-xs leading-5 text-[var(--space-text-primary)]">{shortfall}</p>
            </div>
          )}

          <ul className="mt-3 space-y-1 text-xs leading-5 text-[var(--space-text-secondary)]">
            <li>• Each test type comes as one block of questions in a row; the block order is random each time.</li>
            <li>• One countdown runs for the whole session and submits it automatically at 0:00. Unanswered questions count as unanswered.</li>
            <li>• Move freely between questions and change any answer until you submit. No hints during the session.</li>
            <li>• Afterwards you get your score, a breakdown by test type and a full answer review with explanations.</li>
          </ul>

          <button
            type="button"
            onClick={() => session && onStart(session)}
            disabled={!session}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${tw.button.primary}`}
            data-testid="oa-start"
          >
            <Play className="h-4 w-4" />
            Start simulation · {minutesLabel(timeLimit)}
          </button>
        </section>

        {pastSessions.length ? (
          <section className={CARD} aria-labelledby="oa-history" data-testid="oa-history">
            <h2 id="oa-history" className="text-sm font-bold text-[var(--space-text-primary)]">Your past simulations</h2>
            <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
              {pastSessions.map((row) => {
                const meta = parseOaSessionId(row.test_id);
                const percent = row.percent ?? Math.round((row.score / Math.max(1, row.total)) * 100);
                return (
                  <li key={row.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-xs">
                    <span className="font-semibold text-[var(--space-text-primary)]">
                      {row.total} questions{meta ? ` · ${oaDifficultyLabel(meta.difficulty)}` : ''}
                    </span>
                    <span className="font-bold text-[var(--space-text-brand)]">{percent}%</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {row.duration_seconds != null ? clock(row.duration_seconds) : ''}
                      {row.timed_out ? ' · time ran out' : ''}
                    </span>
                    <span className="ml-auto text-[var(--space-text-muted)]">{new Date(row.created_at).toLocaleDateString('en-GB')}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}

/* ========================================================================== *
 * Session
 * ========================================================================== */

interface SessionProps<Q> {
  session: OaSession<Q>;
  startedAt: number;
  categoryLabel: (category: string) => string;
  renderQuestion: (question: Q, answer: string | null, onAnswer: (value: string) => void) => ReactNode;
  isAnswered: (question: Q, answer: string | null | undefined) => boolean;
  onSubmit: (answers: (string | null)[], timedOut: boolean) => void;
  onExit: () => void;
  onAnswer?: () => void;
}

function blockIndexOf(blocks: readonly OaBlock[], questionIndex: number): number {
  const found = blocks.findIndex((block) => questionIndex >= block.start && questionIndex < block.start + block.size);
  return found < 0 ? 0 : found;
}

function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  testId,
}: {
  title: string;
  body: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  testId: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[color-mix(in_srgb,var(--space-neutral-950)_45%,transparent)] p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby={`${testId}-title`} data-testid={testId}>
      <div className="w-full max-w-md rounded-2xl bg-[var(--space-surface-card)] p-4 shadow-xl sm:p-5">
        <h2 id={`${testId}-title`} className="text-base font-bold text-[var(--space-text-primary)]">{title}</h2>
        <div className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{body}</div>
        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
            data-testid={`${testId}-cancel`}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold ${tw.button.primary}`}
            data-testid={`${testId}-confirm`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OnlineAssessmentSession<Q>({
  session,
  startedAt,
  categoryLabel,
  renderQuestion,
  isAnswered,
  onSubmit,
  onExit,
  onAnswer,
}: SessionProps<Q>) {
  const questions = useMemo(() => session.items.map((item) => item.question), [session]);
  const total = questions.length;
  const [answers, setAnswers] = useState<(string | null)[]>(() => new Array(total).fill(null));
  const [index, setIndex] = useState(0);
  const deadline = startedAt + session.timeLimitSeconds * 1000;
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
  const [dialog, setDialog] = useState<'submit' | 'exit' | null>(null);
  const submittedRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const topRef = useRef<HTMLDivElement>(null);

  const submit = (timedOut: boolean) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setDialog(null);
    const picked = answersRef.current.map((answer, i) => (isAnswered(questions[i], answer) ? answer : null));
    onSubmit(picked, timedOut);
  };
  const submitRef = useRef(submit);
  submitRef.current = submit;

  useEffect(() => {
    const tick = () => {
      const left = (deadline - Date.now()) / 1000;
      setRemaining(Math.max(0, Math.ceil(left)));
      if (left <= 0) submitRef.current(true);
    };
    tick();
    const timer = window.setInterval(tick, 500);
    return () => window.clearInterval(timer);
  }, [deadline]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (submittedRef.current) return undefined;
      event.preventDefault();
      event.returnValue = OA_LEAVE_MESSAGE;
      return OA_LEAVE_MESSAGE;
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, []);

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(total - 1, next)));
    topRef.current?.scrollIntoView?.({ block: 'start' });
  };

  const answerCurrent = (value: string) => {
    if (submittedRef.current) return;
    onAnswer?.();
    setAnswers((prev) => {
      const next = prev.slice();
      next[index] = value;
      return next;
    });
  };

  const answeredFlags = questions.map((question, i) => isAnswered(question, answers[i]));
  const answeredCount = answeredFlags.filter(Boolean).length;
  const unanswered = total - answeredCount;
  const blockIndex = blockIndexOf(session.blocks, index);
  const block = session.blocks[blockIndex];
  const question = questions[index];
  const lowTime = remaining <= 60;
  const warnTime = remaining <= 300;

  return (
    <div className="aptitude-mobile min-h-full w-full bg-[var(--space-surface-page)]" style={{ overflowX: 'clip' }} data-testid="oa-session">
      <div ref={topRef} className="sticky top-0 z-30 border-b border-[var(--space-border-default)] bg-[color-mix(in_srgb,var(--space-surface-card)_96%,transparent)] shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[var(--space-text-primary)] sm:text-base" data-testid="oa-position">
              Question {index + 1}/{total}
            </p>
            <p className="truncate text-[11px] text-[var(--space-text-muted)] sm:text-xs">
              Block {blockIndex + 1} of {session.blocks.length} · {categoryLabel(block.category)} · {answeredCount}/{total} answered
            </p>
          </div>
          <div
            role="timer"
            aria-label={`Time remaining ${clock(remaining)}`}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-base font-bold tabular-nums sm:text-lg ${
              lowTime
                ? 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_14%,transparent)] text-[var(--space-semantic-danger)]'
                : warnTime
                  ? 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_16%,transparent)] text-[var(--space-semantic-warning-700)]'
                  : 'bg-[var(--space-surface-muted)] text-[var(--space-text-primary)]'
            }`}
            data-testid="oa-timer"
          >
            <Clock className="h-4 w-4" />
            {clock(remaining)}
          </div>
          <button
            type="button"
            onClick={() => setDialog('submit')}
            className={`hidden min-h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold sm:inline-flex ${tw.button.primary}`}
            data-testid="oa-submit-top"
          >
            <CheckCircle2 className="h-4 w-4" />
            Submit
          </button>
        </div>
        <div className="h-1 w-full bg-[var(--space-surface-muted)]">
          <div className="h-full bg-[var(--space-brand-primary)] transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-3 p-3 sm:space-y-4 sm:p-5">
        {index === block.start ? (
          <div className="flex items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--space-brand-primary)_30%,transparent)] bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs font-semibold text-[var(--space-text-brand)]" data-testid="oa-block-start">
            <ListChecks className="h-4 w-4" />
            Block {blockIndex + 1} of {session.blocks.length}: {categoryLabel(block.category)} · {block.size} questions
          </div>
        ) : null}

        <div key={index} className="space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:space-y-4 sm:p-4" data-testid="oa-question" data-category={block.category}>
          <span className="inline-flex rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
            {categoryLabel(block.category)} · {index - block.start + 1} of {block.size}
          </span>
          {renderQuestion(question, answers[index], answerCurrent)}
        </div>

        <div className="sticky bottom-0 z-20 -mx-3 grid grid-cols-2 gap-2 border-t border-[var(--space-border-default)] bg-[color-mix(in_srgb,var(--space-surface-card)_94%,transparent)] px-3 py-3 backdrop-blur sm:static sm:mx-0 sm:flex sm:items-center sm:justify-between sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-sm font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-4"
            data-testid="oa-prev"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          {index < total - 1 ? (
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className={`inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-bold sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-4 ${tw.button.primary}`}
              data-testid="oa-next"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDialog('submit')}
              className={`inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-bold sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-4 ${tw.button.primary}`}
              data-testid="oa-submit"
            >
              <CheckCircle2 className="h-4 w-4" />
              Submit assessment
            </button>
          )}
        </div>

        <nav className={CARD} aria-label="Questions by block" data-testid="oa-navigator">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold text-[var(--space-text-primary)]">All questions</p>
            <p className="text-[11px] text-[var(--space-text-muted)]">
              {answeredCount} answered · {unanswered} left
            </p>
          </div>
          <div className="mt-2 space-y-2.5">
            {session.blocks.map((item, i) => (
              <div key={item.category} data-testid="oa-nav-block" data-category={item.category}>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
                  Block {i + 1} · {categoryLabel(item.category)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: item.size }, (_, offset) => {
                    const at = item.start + offset;
                    return (
                      <button
                        key={at}
                        type="button"
                        onClick={() => goTo(at)}
                        aria-label={`Go to question ${at + 1}${answeredFlags[at] ? ', answered' : ''}`}
                        aria-current={at === index ? 'step' : undefined}
                        className={`h-10 w-10 rounded-lg border text-xs font-bold transition sm:h-8 sm:w-8 ${
                          at === index
                            ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                            : answeredFlags[at]
                              ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                              : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-muted)]'
                        }`}
                      >
                        {at + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setDialog('exit')}
            className="inline-flex min-h-11 items-center text-xs font-medium text-[var(--space-text-muted)] hover:underline"
            data-testid="oa-exit"
          >
            Exit and discard this session
          </button>
          <button
            type="button"
            onClick={() => setDialog('submit')}
            className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-[var(--space-text-brand)] hover:underline sm:hidden"
          >
            <CheckCircle2 className="h-4 w-4" />
            Submit now
          </button>
        </div>
      </div>

      {dialog === 'submit' ? (
        <ConfirmDialog
          testId="oa-confirm-submit"
          title="Submit your assessment?"
          body={
            unanswered > 0 ? (
              <>
                You still have <strong className="text-[var(--space-text-primary)]">{unanswered} unanswered {unanswered === 1 ? 'question' : 'questions'}</strong> and{' '}
                {clock(remaining)} left. Unanswered questions are scored as unanswered. You cannot change answers after submitting.
              </>
            ) : (
              <>All {total} questions are answered. You cannot change answers after submitting.</>
            )
          }
          confirmLabel="Submit assessment"
          cancelLabel="Keep working"
          onConfirm={() => submit(false)}
          onCancel={() => setDialog(null)}
        />
      ) : null}
      {dialog === 'exit' ? (
        <ConfirmDialog
          testId="oa-confirm-exit"
          title="Leave this session?"
          body="Your answers will be discarded and nothing will be saved to your history."
          confirmLabel="Leave and discard"
          cancelLabel="Stay in the session"
          onConfirm={() => {
            submittedRef.current = true;
            setDialog(null);
            onExit();
          }}
          onCancel={() => setDialog(null)}
        />
      ) : null}
    </div>
  );
}

/* ========================================================================== *
 * Results summary (shown above the shared question-by-question review)
 * ========================================================================== */

interface SummaryProps {
  summary: OaSummary;
  difficulty: OaDifficulty;
  durationSeconds: number;
  timeLimitSeconds: number;
  timedOut: boolean;
  categoryLabel: (category: string) => string;
  partialCreditCategories?: string[];
}

export function OnlineAssessmentResultsSummary({
  summary,
  difficulty,
  durationSeconds,
  timeLimitSeconds,
  timedOut,
  categoryLabel,
  partialCreditCategories = [],
}: SummaryProps) {
  const tiles = [
    { label: 'Score', value: `${summary.score}/${summary.total}`, footer: `${summary.scorePercent}% overall`, testId: 'oa-metric-score' },
    {
      label: 'Accuracy',
      value: summary.accuracyPercent === null ? '—' : `${summary.accuracyPercent}%`,
      footer: summary.answered ? `${summary.correct} of ${summary.answered} answered correct` : 'No questions answered',
      testId: 'oa-metric-accuracy',
    },
    { label: 'Correct', value: String(summary.correct), footer: 'questions', testId: 'oa-metric-correct' },
    { label: 'Incorrect', value: String(summary.incorrect), footer: 'questions', testId: 'oa-metric-incorrect' },
    { label: 'Unanswered', value: String(summary.unanswered), footer: timedOut ? 'left when time ran out' : 'questions', testId: 'oa-metric-unanswered' },
    {
      label: 'Time spent',
      value: clock(Math.min(durationSeconds, timeLimitSeconds)),
      footer: `of ${minutesLabel(timeLimitSeconds)}${timedOut ? ' · auto-submitted' : ''}`,
      testId: 'oa-metric-time',
    },
  ];
  const ranked = summary.byBlock.filter((item) => item.size > 0);
  const weakest = ranked.length > 1 ? ranked.reduce((low, item) => (item.percent < low.percent ? item : low), ranked[0]) : null;
  const partial = summary.byBlock.filter((item) => partialCreditCategories.includes(item.category));

  return (
    <section className={`${CARD} space-y-3`} aria-label="Online assessment results" data-testid="oa-results">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-bold text-[var(--space-text-primary)]">Your online assessment</h2>
        <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
          {summary.total} questions · {oaDifficultyLabel(difficulty)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((tile) => (
          <div key={tile.label} className="min-w-0 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid={tile.testId}>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{tile.label}</span>
            <span className="mt-0.5 block text-xl font-bold leading-7 text-[var(--space-text-primary)]">{tile.value}</span>
            <span className="mt-0.5 block text-[11px] leading-4 text-[var(--space-text-secondary)]">{tile.footer}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs" data-testid="oa-breakdown">
          <thead>
            <tr className="border-b border-[var(--space-border-default)] text-[11px] uppercase tracking-wide text-[var(--space-text-muted)]">
              <th className="py-2 pr-2 font-semibold">Block</th>
              <th className="py-2 pr-2 font-semibold">Test type</th>
              <th className="py-2 pr-2 text-right font-semibold">Correct</th>
              <th className="py-2 pr-2 text-right font-semibold">Incorrect</th>
              <th className="py-2 pr-2 text-right font-semibold">Unanswered</th>
              <th className="py-2 font-semibold">Score</th>
            </tr>
          </thead>
          <tbody>
            {summary.byBlock.map((item, i) => (
              <tr key={item.category} className="border-b border-[var(--space-border-default)] last:border-0">
                <td className="py-2 pr-2 text-[var(--space-text-muted)]">
                  {i + 1} · Q{item.start + 1}–{item.start + item.size}
                </td>
                <td className="py-2 pr-2 font-semibold text-[var(--space-text-primary)]">{categoryLabel(item.category)}</td>
                <td className="py-2 pr-2 text-right tabular-nums text-[var(--space-text-primary)]">{item.correct}</td>
                <td className="py-2 pr-2 text-right tabular-nums text-[var(--space-text-primary)]">{item.incorrect}</td>
                <td className="py-2 pr-2 text-right tabular-nums text-[var(--space-text-primary)]">{item.unanswered}</td>
                <td className="py-2">
                  <span className="flex items-center gap-2">
                    <span className="block h-1.5 w-20 overflow-hidden rounded-full bg-[var(--space-neutral-200)]">
                      <span className="block h-full rounded-full bg-[var(--space-brand-primary-600)]" style={{ width: `${item.percent}%` }} />
                    </span>
                    <span className="font-semibold tabular-nums text-[var(--space-text-primary)]">
                      {item.credit}/{item.size} · {item.percent}%
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {weakest ? (
        <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
          Lowest block: <strong className="text-[var(--space-text-primary)]">{categoryLabel(weakest.category)}</strong> ({weakest.percent}%). Practise
          that test type next, then sit another simulation.
        </p>
      ) : null}
      {partial.length ? (
        <p className="text-[11px] leading-5 text-[var(--space-text-muted)]">
          {joinNames(partial.map((item) => categoryLabel(item.category)))} gives partial credit for answers close to the model answer; a question
          only counts as correct with full credit.
        </p>
      ) : null}
    </section>
  );
}
