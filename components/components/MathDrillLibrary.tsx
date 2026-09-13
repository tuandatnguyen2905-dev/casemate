/**
 * MathDrillLibrary.tsx — Case Drill's prebuilt case-math question library.
 *
 * WHY THIS FILE EXISTS: every case-math question used to wait on Mate generating
 * it with AI — slow, and one model call per practice run. The question bank now
 * lives prebuilt in lib/caseMathLibrary.ts, so drawing a question is synchronous
 * and appears instantly, with no network call at all.
 *
 * The old AI flow is NOT removed: it still lives on the “Practice with Mate” tab
 * for all six micro-skills (see apps/CaseDrill/App.tsx).
 *
 * PRACTICE HISTORY: stored in localStorage per sessionId. It is lightweight,
 * device-local data used only for the “You should practise” suggestions, so it
 * never needs WorkspaceDB and never waits on a network round trip.
 *
 * SOLVE IN PLACE (library-solve-v1): every library question can now be SOLVED,
 * not just read — a solution box + "Submit solution" button sits under the
 * questions, and Mate grades the attempt with the exact same coaching output
 * as the "Practice with Mate" flow (1-5 score, approach method, feedback with
 * strengths / what was missing, and next steps), with the question's own
 * published answer key as the grading ground truth.
 *
 * HOW GRADING RUNS: the platform-registered micro-drill hook only exposes
 * action=generate / action=grade, and grade needs a micro_drills row (hook
 * registration is an authenticated owner operation, so a new library-specific
 * action cannot be added from the app or an agent session). The solve flow
 * therefore inserts the library question as a micro_drills row client-side
 * (skill 'case_math', the published answers + solution steps stored as the
 * row's model_answer / answer key) and then calls the deployed action=grade
 * on that row — identical grading quality, zero new server surface, and every
 * attempt lands in the same drill log as a coach-mode Case Math rep.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Compass,
  Eye,
  Flag,
  Library,
  Loader2,
  PenLine,
  RefreshCw,
  Search,
  Send,
  Shuffle,
  Sigma,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { tw } from '../lib/colors';
import { CaseExhibitList } from './CaseExhibits';
import PercentileRankingWidget from './PercentileRankingWidget';
import { callMicroDrillServerFunction } from '../apps/CaseDrill/serverFunctions';
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from '../lib/caseLibraryShared';
import type { CaseDifficulty } from '../lib/caseLibraryShared';
import {
  CASE_MATH_LIBRARY,
  MATH_TYPES,
  MATH_TYPE_LABELS,
  mathRecommendationReason,
  pickRandomMathCase,
  recommendMathCases,
} from '../lib/caseMathLibrary';
import type { CaseMathProblem, PracticeRecord } from '../lib/caseMathLibrary';

interface HistoryEntry extends PracticeRecord {
  at?: number;
  title?: string;
}

const HISTORY_LIMIT = 200;

/** Problems shown per page — dumping all 100 at once makes the list too long to scan. */
const PAGE_SIZE = 24;

/** Reference clock stored on the drill row — mirrors the coach flow's Case Math rep. */
const SOLVE_TIME_LIMIT_SECONDS = 300;

/** Shorter answers cannot carry per-question results with their arithmetic. */
const MIN_SOLUTION_LENGTH = 30;

/** Hard deadline for saving and grading one submission, including DB work. */
const GRADE_TIMEOUT_MS = 30_000;
const GRADE_TIMEOUT_MESSAGE =
  'Mate could not finish grading within 30 seconds. Please try again.';

function withGradeTimeout<T>(operation: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  let timeoutId = 0;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => {
      controller.abort();
      reject(new Error(GRADE_TIMEOUT_MESSAGE));
    }, GRADE_TIMEOUT_MS);
  });

  return Promise.race([operation(controller.signal), timeout]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

/** Feedback returned by Mate for one graded library attempt (same shape as the coach flow). */
interface LibrarySolveResult {
  drillId: number;
  score: number | null;
  feedback: { feedback: string; strengths: string[]; improvements: string[] } | null;
  approach: string[];
  nextSteps: string[];
  elapsedSeconds: number;
}

function asStringList(value: unknown, max: number): string[] {
  return (Array.isArray(value) ? value : [])
    .map((item) => String(item ?? '').trim())
    .filter(Boolean)
    .slice(0, max);
}

/** The candidate-facing drill prompt stored on the row (also the grader's case text). */
function libraryDrillPrompt(problem: CaseMathProblem): string {
  const questions = problem.questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n');
  return `${problem.title} [library ${problem.id}]\n${problem.scenario}\n\nAnswer each question in order — show the arithmetic for every step:\n${questions}`.slice(0, 3000);
}

/** The published answers + solution steps become the grading ANSWER KEY (ground truth). */
function libraryAnswerKey(problem: CaseMathProblem): string {
  return problem.questions
    .map(
      (q, i) =>
        `QUESTION ${i + 1}: ${q.question}\nANSWER: ${q.answer}\nSOLUTION STEPS:\n${q.solution_steps
          .map((step, j) => `${j + 1}. ${step}`)
          .join('\n')}`,
    )
    .join('\n\n')
    .slice(0, 8000);
}

/** Exhibits flattened to plain text for the grader (same shape Case Pool uses). */
function libraryExhibitsText(problem: CaseMathProblem): string {
  return (problem.data_exhibits || [])
    .map((exhibit, index) => {
      const heading = `Exhibit ${index + 1} — `;
      if (exhibit.type === 'table') {
        const rows = exhibit.rows.map((row) => `- ${row.join(' | ')}`).join('\n');
        return `${heading}${exhibit.title}\nColumns: ${exhibit.columns.join(' | ')}\n${rows}${
          exhibit.note ? `\nNote: ${exhibit.note}` : ''
        }`;
      }
      if (exhibit.type === 'chart_data') {
        const points = exhibit.labels
          .map((label, pointIndex) => `- ${label}: ${exhibit.values[pointIndex]}`)
          .join('\n');
        return `${heading}${exhibit.title}${exhibit.unit ? ` (${exhibit.unit})` : ''}\n${points}`;
      }
      return `${heading}${exhibit.label}: ${exhibit.value}\n${exhibit.context}`;
    })
    .join('\n\n')
    .slice(0, 4000);
}

/** Tolerant id extraction — the client insert API's response shape is not pinned down. */
function insertedRowIdOf(response: any): number | null {
  const candidates = [
    response,
    response?.data,
    response?.row,
    Array.isArray(response) ? response[0] : null,
    Array.isArray(response?.data) ? response.data[0] : null,
    Array.isArray(response?.rows) ? response.rows[0] : null,
    Array.isArray(response?.insertedRows) ? response.insertedRows[0] : null,
  ];
  for (const candidate of candidates) {
    const id = Number(candidate?.id);
    if (Number.isFinite(id) && id > 0) return id;
  }
  return null;
}

/**
 * Save this attempt as a pending micro_drills row (one row per attempt — the
 * same semantics as generating a fresh coach-mode rep) and return its id.
 */
async function createLibraryDrillRow(problem: CaseMathProblem, sessionId: string): Promise<number> {
  const db = (window as any).__workspaceDb;
  if (!db) throw new Error('Mate could not reach your drill log. Please refresh and try again.');
  const prompt = libraryDrillPrompt(problem);
  const inserted = await db.from('micro_drills').insert({
    skill: 'case_math',
    skill_label: 'Case Math',
    prompt,
    drill_data: libraryExhibitsText(problem),
    time_limit_seconds: SOLVE_TIME_LIMIT_SECONDS,
    model_answer: libraryAnswerKey(problem),
    status: 'pending',
    session_id: sessionId,
  });
  const directId = insertedRowIdOf(inserted);
  if (directId) return directId;
  // Fallback: the row was created but the response carried no id — find it by
  // its exact prompt among this session's newest pending Case Math rows.
  const found = await db
    .from('micro_drills')
    .eq('session_id', sessionId)
    .eq('skill', 'case_math')
    .eq('status', 'pending')
    .orderBy('created_at', 'desc')
    .limit(10)
    .get();
  const match = (Array.isArray(found?.data) ? found.data : []).find((row: any) => row.prompt === prompt);
  const foundId = Number(match?.id);
  if (Number.isFinite(foundId) && foundId > 0) return foundId;
  throw new Error('Mate could not save this attempt. Please try again.');
}

function historyKey(sessionId: string): string {
  return `casemate-math-library-history:${sessionId || 'anon'}`;
}

function readHistory(sessionId: string): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(historyKey(sessionId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
}

function difficultyBadge(difficulty: CaseDifficulty): string {
  if (difficulty === 'easy') return 'bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]';
  if (difficulty === 'hard') return 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]';
  return 'bg-[var(--space-semantic-warning-100)] text-[var(--space-neutral-800)]';
}

/** Strip diacritics so accent-free typing still finds problems (same helper as CasePoolLibrary). */
function normalize(value: string): string {
  const lowered = String(value || '').toLowerCase().normalize('NFD');
  let out = '';
  for (const ch of lowered) {
    const code = ch.codePointAt(0) || 0;
    if (code >= 0x0300 && code <= 0x036f) continue;
    out += ch === 'đ' ? 'd' : ch;
  }
  return out.trim();
}

export default function MathDrillLibrary({ sessionId }: { sessionId: string }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [difficulty, setDifficulty] = useState<CaseDifficulty | 'all'>('all');
  const [type, setType] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<CaseMathProblem | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Solve-in-place state — reset whenever a different question opens.
  const [solution, setSolution] = useState('');
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState('');
  const [solveResult, setSolveResult] = useState<LibrarySolveResult | null>(null);
  const openedAtRef = useRef<number>(Date.now());
  const gradingRef = useRef(false);
  const gradingAttemptRef = useRef(0);

  useEffect(() => {
    setHistory(readHistory(sessionId));
  }, [sessionId]);

  const remember = useCallback(
    (problem: CaseMathProblem) => {
      setHistory((current) => {
        const entry: HistoryEntry = {
          case_id: problem.id,
          case_type: problem.type,
          difficulty: problem.difficulty,
          title: problem.title,
          at: Date.now(),
        };
        const next = [entry, ...current.filter((item) => item.case_id !== problem.id)].slice(0, HISTORY_LIMIT);
        try {
          localStorage.setItem(historyKey(sessionId), JSON.stringify(next));
        } catch {
          /* storage full or private mode — recommendations still work this session */
        }
        return next;
      });
    },
    [sessionId],
  );

  const openCase = useCallback(
    (problem: CaseMathProblem | null) => {
      if (!problem) return;
      // Invalidate any completion belonging to the previously open question.
      gradingAttemptRef.current += 1;
      gradingRef.current = false;
      setActive(problem);
      setRevealed({});
      setSolution('');
      setGrading(false);
      setGradeError('');
      setSolveResult(null);
      openedAtRef.current = Date.now();
      remember(problem);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [remember],
  );

  // Submit the written solution: save the attempt as a drill row, have Mate
  // grade it against this question's published answer key, then reveal every
  // step-by-step solution so the feedback can be read against them.
  const submitSolution = useCallback(async () => {
    if (!active || gradingRef.current) return;
    const text = solution.trim();
    if (!sessionId) {
      setGradeError('Sign in first so Mate can grade your solution and save the rep to your drill log.');
      return;
    }
    if (text.length < MIN_SOLUTION_LENGTH) {
      setGradeError(
        `Write at least ${MIN_SOLUTION_LENGTH} characters — answer each question in order and show the arithmetic — so the grade is useful.`,
      );
      return;
    }
    const attemptToken = ++gradingAttemptRef.current;
    gradingRef.current = true;
    setGrading(true);
    setGradeError('');
    try {
      const { drillId, response } = await withGradeTimeout(async (signal) => {
        const drillId = await createLibraryDrillRow(active, sessionId);
        if (signal.aborted) throw new Error(GRADE_TIMEOUT_MESSAGE);
        const response = await callMicroDrillServerFunction(
          'grade',
          { drillId, answer: text },
          sessionId,
          { signal, timeoutMs: GRADE_TIMEOUT_MS },
        );
        return { drillId, response };
      });
      if (gradingAttemptRef.current !== attemptToken) return;
      const feedbackRaw = response.feedback ? response.feedback : null;
      setSolveResult({
        drillId,
        score: Number.isFinite(Number(response.score)) ? Number(response.score) : null,
        feedback: feedbackRaw
          ? {
              feedback: String(feedbackRaw.feedback || ''),
              strengths: asStringList(feedbackRaw.strengths, 3),
              improvements: asStringList(feedbackRaw.improvements, 3),
            }
          : null,
        approach: asStringList(response.approach, 5),
        nextSteps: asStringList(response.next_steps, 3),
        elapsedSeconds: Math.max(1, Math.round((Date.now() - openedAtRef.current) / 1000)),
      });
      // Reveal every published solution — the model answers the feedback refers to.
      setRevealed(Object.fromEntries(active.questions.map((_, index) => [index, true])));
    } catch (error) {
      if (gradingAttemptRef.current !== attemptToken) return;
      setGradeError(error instanceof Error ? error.message : 'Mate could not grade this solution. Please try again.');
    } finally {
      if (gradingAttemptRef.current === attemptToken) {
        gradingRef.current = false;
        setGrading(false);
      }
    }
  }, [active, solution, sessionId]);

  // Random draw: purely synchronous, no AI call, no network wait.
  const drawRandom = useCallback(() => {
    const picked = pickRandomMathCase({
      difficulty,
      type,
      excludeIds: history.map((item) => String(item.case_id || '')).filter(Boolean),
    });
    openCase(picked);
  }, [difficulty, type, history, openCase]);

  const recommendations = useMemo(() => recommendMathCases(history, 3), [history]);
  const practicedIds = useMemo(
    () => new Set(history.map((item) => String(item.case_id || '')).filter(Boolean)),
    [history],
  );
  const matches = useMemo(() => {
    const q = normalize(query);
    const tokens = q.split(' ').filter(Boolean);
    return CASE_MATH_LIBRARY.filter((problem) => {
      if (difficulty !== 'all' && problem.difficulty !== difficulty) return false;
      if (type !== 'all' && problem.type !== type) return false;
      if (tokens.length === 0) return true;
      const haystack = normalize([problem.title, problem.scenario, problem.tags.join(' ')].join(' '));
      return tokens.every((token) => haystack.includes(token));
    });
  }, [query, difficulty, type]);

  // Changing the search text or a filter resets to the first page instead of keeping the previous list length.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, difficulty, type]);

  /* ------------------------------------------------------------------ open question */
  if (active) {
    return (
      <div className="mt-5" data-testid="math-library-case">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`${tw.badge.default} ${tw.badge.primary}`}>
            {MATH_TYPE_LABELS[active.type] || active.type}
          </span>
          <span className={`${tw.badge.default} ${difficultyBadge(active.difficulty)}`}>
            {DIFFICULTY_LABELS[active.difficulty]}
          </span>
          <span className="text-[11px] text-[var(--space-text-muted)]">{active.id}</span>
        </div>

        <h2 className="mt-2 text-lg font-bold leading-6 text-[var(--space-text-primary)]">{active.title}</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">
          {active.scenario}
        </p>

        <CaseExhibitList exhibits={active.data_exhibits} className="mt-4" />

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
            Questions — work them out yourself before revealing the answers
          </p>
          <ol className="mt-2 space-y-2.5">
            {active.questions.map((question, index) => (
              <li
                key={index}
                className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5"
                data-testid={`math-question-${index + 1}`}
              >
                <div className="flex gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[10px] font-bold text-[var(--space-text-brand)]">
                    {index + 1}
                  </span>
                  <p className="min-w-0 text-sm font-medium leading-6 text-[var(--space-text-primary)]">
                    {question.question}
                  </p>
                </div>

                {revealed[index] ? (
                  <div className="mt-3 rounded-lg bg-[var(--space-surface-muted)] p-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      Answer
                    </p>
                    <p className="mt-1 text-sm font-bold text-[var(--space-text-primary)]">{question.answer}</p>
                    <p className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
                      Solution steps
                    </p>
                    <ol className="mt-1 space-y-1">
                      {question.solution_steps.map((step, stepIndex) => (
                        <li
                          key={stepIndex}
                          className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]"
                        >
                          <span className="text-[var(--space-text-muted)]">{stepIndex + 1}.</span>
                          <span className="min-w-0">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealed((current) => ({ ...current, [index]: true }))}
                    className={`mt-2.5 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.secondary}`}
                    data-testid={`button-reveal-${index + 1}`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Show the answer and solution
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* ------------------------------------------------ solve it here */}
        <section
          className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"
          data-testid="math-library-solve"
        >
          {solveResult ? (
            <div data-testid="math-library-result">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold ${
                    (solveResult.score || 0) >= 4
                      ? 'bg-[var(--space-semantic-success-100,#dcfce7)] text-[var(--space-semantic-success-700,#15803d)]'
                      : (solveResult.score || 0) >= 3
                        ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                        : 'bg-[var(--space-semantic-warning-100,#fef3c7)] text-[var(--space-semantic-warning-700,#b45309)]'
                  }`}
                  data-testid="math-library-score"
                >
                  {solveResult.score != null ? `${solveResult.score}/5` : '—'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[var(--space-text-primary)]">Case Math library rep graded</p>
                  <p className="text-xs text-[var(--space-text-muted)]">
                    Self-paced — saved to your Case Drill log. The step-by-step solutions are revealed under each
                    question above.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSolveResult(null);
                    setGradeError('');
                    openedAtRef.current = Date.now();
                  }}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.secondary}`}
                  data-testid="button-retry-library-solution"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Try again
                </button>
              </div>

              {/* Percentile ranking vs every other scored Case Drill rep. The
                  drill id keys the submission, so re-renders never double-count. */}
              {solveResult.score != null && (
                <PercentileRankingWidget
                  className="mt-3"
                  app="case_drill"
                  scorePercent={Math.round((solveResult.score / 5) * 100)}
                  timeSeconds={solveResult.elapsedSeconds}
                  submissionKey={`case-drill-library:${solveResult.drillId}`}
                />
              )}

              {solveResult.approach.length > 0 && (
                <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="math-library-approach">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
                    <Compass className="h-3.5 w-3.5 flex-shrink-0" />
                    How to approach Case Math questions like this
                  </p>
                  <ol className="mt-2 space-y-1.5">
                    {solveResult.approach.map((step, index) => (
                      <li key={index} className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[9px] font-bold text-[var(--space-text-brand)]">
                          {index + 1}
                        </span>
                        <span className="min-w-0">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mt-3 rounded-xl border border-[var(--space-border-default)] p-3" data-testid="math-library-feedback">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Feedback on your solution</p>
                {solveResult.feedback?.feedback ? (
                  <p className="mt-1.5 text-sm leading-6 text-[var(--space-text-secondary)]">{solveResult.feedback.feedback}</p>
                ) : (
                  <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                    Compare your working against the revealed solutions above — note the one step you would have
                    missed, then take another question.
                  </p>
                )}
                {solveResult.feedback && (solveResult.feedback.strengths.length > 0 || solveResult.feedback.improvements.length > 0) && (
                  <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                    {solveResult.feedback.strengths.length > 0 && (
                      <div className="rounded-xl bg-[var(--space-surface-muted)] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">What worked</p>
                        <ul className="mt-1.5 space-y-1">
                          {solveResult.feedback.strengths.map((item, index) => (
                            <li key={index} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-semantic-success)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {solveResult.feedback.improvements.length > 0 && (
                      <div className="rounded-xl bg-[var(--space-surface-muted)] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">What was missing</p>
                        <ul className="mt-1.5 space-y-1">
                          {solveResult.feedback.improvements.map((item, index) => (
                            <li key={index} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                              <Zap className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-text-brand)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {solveResult.nextSteps.length > 0 && (
                <div className="mt-3 rounded-xl border border-[var(--space-border-default)] p-3" data-testid="math-library-next-steps">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
                    <Target className="h-3.5 w-3.5 flex-shrink-0" />
                    What to do next
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {solveResult.nextSteps.map((item, index) => (
                      <li key={index} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                        <Flag className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-text-brand)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <details className="mt-3">
                <summary className="cursor-pointer text-[11px] font-semibold text-[var(--space-text-brand)]">
                  Show the solution you submitted
                </summary>
                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-3 text-[11px] leading-5 text-[var(--space-text-secondary)]">
                  {solution}
                </p>
              </details>
            </div>
          ) : (
            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--space-text-primary)]">
                <PenLine className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
                Solve it here
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                Answer each question in order and show the arithmetic for every step. Mate grades your solution
                against this question's own answer key — the same 1–5 grade and coaching as a timed rep — and
                saves it to your Case Drill log.
              </p>
              <textarea
                value={solution}
                onChange={(event) => setSolution(event.target.value)}
                rows={7}
                disabled={grading}
                placeholder={'1) Market size = …\n2) Annual revenue = …\n3) So my recommendation is…'}
                aria-label="Your solution to this question"
                className={`${tw.input.base} ${tw.input.default} mt-2.5 min-h-[130px] text-sm leading-6`}
                data-testid="input-library-solution"
              />
              <p className="mt-1.5 text-[10px] text-[var(--space-text-muted)]">
                {solution.trim().length} characters · {MIN_SOLUTION_LENGTH} minimum · self-paced, no countdown
              </p>
              {gradeError ? (
                <p className="mt-2 text-[11px] leading-4 text-[var(--space-semantic-danger)]" role="alert" data-testid="math-library-grade-error">
                  {gradeError}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => void submitSolution()}
                disabled={grading}
                className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary} ${
                  grading ? tw.button.disabled : ''
                }`}
                data-testid="button-submit-library-solution"
              >
                {grading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mate is grading your solution…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit solution
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={drawRandom}
            disabled={grading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.primary} ${
              grading ? tw.button.disabled : ''
            }`}
            data-testid="button-next-random-case"
          >
            <Shuffle className="h-4 w-4" />
            Next question
          </button>
          <button
            type="button"
            onClick={() => {
              gradingAttemptRef.current += 1;
              gradingRef.current = false;
              setActive(null);
            }}
            disabled={grading}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary} ${
              grading ? tw.button.disabled : ''
            }`}
            data-testid="button-back-to-library"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to library
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- library home */
  return (
    <div className="mt-5" data-testid="math-library-home">
      {/* You should practise */}
      <section>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
            <Target className="h-4 w-4 text-[var(--space-text-brand)]" />
            You should practise
          </h2>
          <span className={`${tw.badge.default} ${tw.badge.neutral}`}>
            {history.length === 0
              ? 'A balanced starter set'
              : `Based on the ${history.length} questions you have done`}
          </span>
        </div>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          {recommendations.map((problem) => (
            <button
              key={problem.id}
              type="button"
              onClick={() => openCase(problem)}
              className="flex flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5 text-left transition-all hover:border-[var(--space-brand-primary)] hover:shadow-md"
              data-testid={`recommended-${problem.id}`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`${tw.badge.default} ${tw.badge.primary}`}>
                  {MATH_TYPE_LABELS[problem.type] || problem.type}
                </span>
                <span className={`${tw.badge.default} ${difficultyBadge(problem.difficulty)}`}>
                  {DIFFICULTY_LABELS[problem.difficulty]}
                </span>
              </div>
              <span className="mt-2 text-xs font-bold leading-4 text-[var(--space-text-primary)]">{problem.title}</span>
              <span className="mt-1.5 flex items-start gap-1 text-[10px] leading-4 text-[var(--space-text-muted)]">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0" />
                {mathRecommendationReason(history, problem)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Filters + random draw */}
      <section className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
            <Library className="h-4 w-4 text-[var(--space-text-brand)]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--space-text-primary)]">
              Library of {CASE_MATH_LIBRARY.length} case-math questions
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Every question ships with data tables and charts like a real handout, plus step-by-step solutions. Tap and it appears instantly — write your solution and Mate grades it on the spot, or study the answer key yourself.
            </p>
          </div>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by company, topic, or keyword…"
            aria-label="Search questions"
            className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
            data-testid="input-math-search"
          />
        </div>

        <div className="mt-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Difficulty</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {(['all', ...DIFFICULTY_ORDER] as Array<CaseDifficulty | 'all'>).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                  difficulty === level
                    ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                    : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
                }`}
                data-testid={`filter-difficulty-${level}`}
              >
                {level === 'all' ? 'All' : DIFFICULTY_LABELS[level]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Question type</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['all', ...MATH_TYPES].map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setType(kind)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                  type === kind
                    ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                    : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
                }`}
                data-testid={`filter-type-${kind}`}
              >
                {kind === 'all' ? 'All' : MATH_TYPE_LABELS[kind] || kind}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={drawRandom}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary}`}
          data-testid="button-random-math-case"
        >
          <Shuffle className="h-4 w-4" />
          Random question
        </button>
        <p className="mt-2 text-center text-[10px] text-[var(--space-text-muted)]">
          {matches.length} questions match your filters · {practicedIds.size}/{CASE_MATH_LIBRARY.length} practised
        </p>
      </section>

      {/* Question list */}
      <section className="mt-5">
        <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">
          {matches.length === CASE_MATH_LIBRARY.length ? 'The whole library' : 'Filtered results'}
        </h3>
        {matches.length === 0 ? (
          <p className="mt-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center text-xs text-[var(--space-text-secondary)]">
            No questions match. Try loosening the filters or clearing the search keyword.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-[var(--space-border-default)] rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
            {matches.slice(0, visibleCount).map((problem) => (
              <li key={problem.id}>
                <button
                  type="button"
                  onClick={() => openCase(problem)}
                  className="flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors hover:bg-[var(--space-surface-card-hover)]"
                  data-testid={`math-case-${problem.id}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold leading-4 text-[var(--space-text-primary)]">
                      {problem.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-[var(--space-text-muted)]">
                        {MATH_TYPE_LABELS[problem.type] || problem.type}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyBadge(problem.difficulty)}`}
                      >
                        {DIFFICULTY_LABELS[problem.difficulty]}
                      </span>
                      {practicedIds.has(problem.id) ? (
                        <span className="text-[10px] text-[var(--space-text-muted)]">· practised</span>
                      ) : null}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {matches.length > visibleCount ? (
          <button
            type="button"
            onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold ${tw.button.secondary}`}
            data-testid="button-show-more-math-cases"
          >
            Show {Math.min(PAGE_SIZE, matches.length - visibleCount)} more questions
            <span className="font-normal text-[var(--space-text-muted)]">
              ({visibleCount}/{matches.length})
            </span>
          </button>
        ) : null}
      </section>

      {/* Recently practised */}
      {history.length > 0 ? (
        <section className="mt-5">
          <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">Questions you opened recently</h3>
          <ul className="mt-2 divide-y divide-[var(--space-border-default)] rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
            {history.slice(0, 6).map((item) => {
              const problem = CASE_MATH_LIBRARY.find((entry) => entry.id === item.case_id);
              if (!problem) return null;
              return (
                <li key={String(item.case_id)}>
                  <button
                    type="button"
                    onClick={() => openCase(problem)}
                    className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left"
                  >
                    <Sigma className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-[var(--space-text-primary)]">
                        {problem.title}
                      </span>
                      <span className="block text-[10px] text-[var(--space-text-muted)]">
                        {MATH_TYPE_LABELS[problem.type] || problem.type} · {DIFFICULTY_LABELS[problem.difficulty]}
                      </span>
                    </span>
                    <RefreshCw className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-muted)]" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
