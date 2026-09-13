/**
 * CasePoolLibrary.tsx — the library of 100 prebuilt full consulting cases for Case Pool.
 *
 * Unlike the “Case Room” tab (where Mate generates and grades a bespoke case),
 * this tab opens a fully prepared case instantly: situation, key question, data
 * tables and charts, suggested frameworks, and a model answer kept hidden until
 * the learner finishes their own attempt. No AI call anywhere on this path.
 *
 * The “Recommended for you” row merges two history sources: cases practised in
 * the library (localStorage, with both industry and case type) and AI cases done
 * in Case Room (passed in via the `extraHistory` prop, case type only).
 *
 * SOLVING IN PLACE: a learner can write their answer directly under the case and
 * have Mate grade it without leaving the library. The grading call itself belongs
 * to the host app (it owns the server-function client), so this component takes an
 * `onGrade` callback and a `results` map of already-graded attempts. That keeps the
 * library free of backend plumbing and lets the host reuse the same graded rows it
 * already loads for the dashboard — which is why a solved case can show its score
 * on the list row and reopen with its full report intact.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Eye,
  Lightbulb,
  Loader2,
  PenLine,
  RefreshCw,
  Search,
  Shuffle,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react';
import { tw } from '../lib/colors';
import { CaseExhibitList } from './CaseExhibits';
import PercentileRankingWidget from './PercentileRankingWidget';
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from '../lib/caseLibraryShared';
import type { CaseDifficulty } from '../lib/caseLibraryShared';
import {
  CASE_POOL_LIBRARY,
  POOL_INDUSTRIES,
  POOL_INDUSTRY_LABELS,
  POOL_TYPES,
  POOL_TYPE_LABELS,
  pickRandomPoolCase,
  poolRecommendationReason,
  recommendPoolCases,
} from '../lib/casePoolLibrary';
import type { FullCase, PoolHistoryRecord } from '../lib/casePoolLibrary';

const HISTORY_LIMIT = 200;

/** Cases shown per page — dumping all 100 at once makes the list too long to scan. */
const PAGE_SIZE = 24;

/** Shorter answers cannot carry a structure, a number, and a recommendation. */
const MIN_ANSWER_LENGTH = 80;

export interface LibraryGradeDimension {
  key: string;
  label: string;
  score: number;
  evidence: string;
  nextStep: string;
}

/** One graded attempt at a library case, normalized by the host app. */
export interface LibraryGradeResult {
  score: number;
  summary: string;
  answer: string;
  breakdown: LibraryGradeDimension[];
  matched: string[];
  missing: string[];
  recommendations: Array<{ action: string; why: string }>;
}

function scoreBadge(score: number): string {
  if (score >= 4) return tw.badge.success;
  if (score >= 3) return tw.badge.warning;
  return tw.badge.danger;
}

function historyKey(sessionId: string): string {
  return `casemate-pool-library-history:${sessionId || 'anon'}`;
}

function readHistory(sessionId: string): PoolHistoryRecord[] {
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

/** Strip diacritics so accent-free typing still finds cases. */
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

export default function CasePoolLibrary({
  sessionId,
  extraHistory = [],
  results = {},
  onGrade,
  openRequest = null,
}: {
  sessionId: string;
  extraHistory?: PoolHistoryRecord[];
  /** Graded attempts keyed by library case id — drives the score badges and saved reports. */
  results?: Record<string, LibraryGradeResult>;
  /** Sends an answer to Mate for grading; resolves with the saved report. */
  onGrade?: (item: FullCase, answer: string) => Promise<LibraryGradeResult>;
  /** Host asks for one case to be opened (e.g. tapped in the dashboard history). */
  openRequest?: { id: string; nonce: number } | null;
}) {
  const [history, setHistory] = useState<PoolHistoryRecord[]>([]);
  const [difficulty, setDifficulty] = useState<CaseDifficulty | 'all'>('all');
  const [type, setType] = useState<string>('all');
  const [industry, setIndustry] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<FullCase | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [attempt, setAttempt] = useState('');
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState('');
  const [justGraded, setJustGraded] = useState<LibraryGradeResult | null>(null);
  // Set while re-attempting a case that already has a saved grade, so the old
  // report steps aside for the answer box instead of overwriting the new one.
  const [retrying, setRetrying] = useState(false);
  // Percentile ranking for a case graded on THIS page load. Opening a case
  // stamps the clock; submitting turns the elapsed time + grade into one
  // ranking record. Reopened saved grades have no timing, so no widget.
  const openedAtRef = useRef<number>(Date.now());
  const [freshRanking, setFreshRanking] = useState<{
    key: string;
    scorePercent: number;
    timeSeconds: number;
  } | null>(null);

  useEffect(() => {
    setHistory(readHistory(sessionId));
  }, [sessionId]);

  const combinedHistory = useMemo(() => history.concat(extraHistory || []), [history, extraHistory]);

  const remember = useCallback(
    (item: FullCase) => {
      setHistory((current) => {
        const entry: PoolHistoryRecord = {
          case_id: item.id,
          case_type: item.type,
          industry: item.industry,
          difficulty: item.difficulty,
        };
        const next = [entry, ...current.filter((row) => row.case_id !== item.id)].slice(0, HISTORY_LIMIT);
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
    (item: FullCase | null) => {
      if (!item) return;
      setActive(item);
      setShowAnswer(false);
      // Reopening a solved case restores the answer that earned its grade.
      setAttempt(results[item.id]?.answer || '');
      setJustGraded(null);
      setRetrying(false);
      setGradeError('');
      openedAtRef.current = Date.now();
      setFreshRanking(null);
      remember(item);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [remember, results],
  );

  // Opening on request (a graded case tapped in the dashboard history). Only the
  // request identity is watched — depending on openCase would reopen the case
  // every time a grade lands and changes the results map.
  useEffect(() => {
    if (!openRequest?.id) return;
    const requested = CASE_POOL_LIBRARY.find((item) => item.id === openRequest.id);
    if (requested) openCase(requested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest?.id, openRequest?.nonce]);

  const savedResult = active ? results[active.id] : undefined;
  const rawShownResult = retrying ? null : justGraded || savedResult || null;
  // Keep the result screen render-safe even when a stale host or legacy row
  // violates the typed contract and omits one of the report arrays.
  const shownResult = rawShownResult
    ? {
        ...rawShownResult,
        breakdown: Array.isArray(rawShownResult.breakdown) ? rawShownResult.breakdown : [],
        matched: Array.isArray(rawShownResult.matched) ? rawShownResult.matched : [],
        missing: Array.isArray(rawShownResult.missing) ? rawShownResult.missing : [],
        recommendations: Array.isArray(rawShownResult.recommendations) ? rawShownResult.recommendations : [],
      }
    : null;

  const submitAttempt = useCallback(async () => {
    if (!active || !onGrade) return;
    const text = attempt.trim();
    if (text.length < MIN_ANSWER_LENGTH) {
      setGradeError(
        `Write at least ${MIN_ANSWER_LENGTH} characters — your structure, the numbers you worked out, and your recommendation — so the grade is useful.`,
      );
      return;
    }
    setGrading(true);
    setGradeError('');
    try {
      const result = await onGrade(active, text);
      setJustGraded(result);
      // Time = case open → submission; the Date.now() suffix makes a "Try
      // again" re-grade its own ranking record instead of reusing the old one.
      setFreshRanking({
        key: `case-pool-lib:${active.id}:${Date.now()}`,
        scorePercent: Math.round((Number(result.score) / 5) * 100),
        timeSeconds: Math.round((Date.now() - openedAtRef.current) / 1000),
      });
      setRetrying(false);
      setShowAnswer(true);
    } catch (error) {
      setGradeError(error instanceof Error ? error.message : 'Mate could not grade this answer. Please try again.');
    } finally {
      setGrading(false);
    }
  }, [active, attempt, onGrade]);

  const drawRandom = useCallback(() => {
    openCase(
      pickRandomPoolCase({
        difficulty,
        type,
        industry,
        excludeIds: history.map((item) => String(item.case_id || '')).filter(Boolean),
      }),
    );
  }, [difficulty, type, industry, history, openCase]);

  const recommendations = useMemo(() => recommendPoolCases(combinedHistory, 3), [combinedHistory]);

  const matches = useMemo(() => {
    const q = normalize(query);
    const tokens = q.split(' ').filter(Boolean);
    return CASE_POOL_LIBRARY.filter((item) => {
      if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
      if (type !== 'all' && item.type !== type) return false;
      if (industry !== 'all' && item.industry !== industry) return false;
      if (tokens.length === 0) return true;
      const haystack = normalize(
        [item.title, item.situation, item.key_question, item.tags.join(' ')].join(' '),
      );
      return tokens.every((token) => haystack.includes(token));
    });
  }, [query, difficulty, type, industry]);

  const practicedIds = useMemo(
    () => new Set(history.map((item) => String(item.case_id || '')).filter(Boolean)),
    [history],
  );

  const solvedCount = useMemo(() => Object.keys(results).length, [results]);

  // Changing filters resets to the first page instead of keeping the previous list length.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, difficulty, type, industry]);

  /* ------------------------------------------------------------ open case */
  if (active) {
    return (
      <div data-testid="pool-library-case">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`${tw.badge.default} ${tw.badge.primary}`}>
            {POOL_TYPE_LABELS[active.type] || active.type}
          </span>
          <span className={`${tw.badge.default} ${tw.badge.accent}`}>
            {POOL_INDUSTRY_LABELS[active.industry] || active.industry}
          </span>
          <span className={`${tw.badge.default} ${difficultyBadge(active.difficulty)}`}>
            {DIFFICULTY_LABELS[active.difficulty]}
          </span>
          {savedResult ? (
            <span
              className={`${tw.badge.default} ${scoreBadge(savedResult.score)} flex items-center gap-1`}
              data-testid="pool-case-saved-score"
            >
              <CheckCircle2 className="h-3 w-3" />
              Solved · {savedResult.score}/5
            </span>
          ) : null}
          <span className="text-[11px] text-[var(--space-text-muted)]">{active.id}</span>
        </div>

        <h2 className="mt-2 text-xl font-bold leading-7 text-[var(--space-text-primary)]">{active.title}</h2>

        {/* The page is full-bleed, so every block of running prose carries its
            own reading measure — a case narrative stretched across a 1920px
            monitor is unreadable, while the exhibits below still use the full
            width they need. */}
        <div className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-4">
          <p className="max-w-[80ch] whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-primary)]">
            {active.situation}
          </p>
        </div>

        <div className="mt-3 rounded-xl border-l-4 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Key question</p>
          <p className="mt-1 max-w-[80ch] text-sm font-semibold leading-6 text-[var(--space-text-primary)]">
            {active.key_question}
          </p>
        </div>

        <CaseExhibitList exhibits={active.data_exhibits} className="mt-4" />

        <div className="mt-4">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
            <Lightbulb className="h-3.5 w-3.5 shrink-0" />
            Suggested frameworks
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {active.framework_hints.map((hint) => (
              <span
                key={hint}
                className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1 text-[11px] text-[var(--space-text-secondary)]"
              >
                {hint}
              </span>
            ))}
          </div>
        </div>

        {onGrade ? (
          <section
            className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"
            data-testid="pool-library-attempt"
          >
            {shownResult ? (
              <div data-testid="pool-library-grade">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]">
                      <span className="text-base font-extrabold leading-none text-[var(--space-text-brand)]">
                        {shownResult.score}
                        <span className="text-[10px] font-bold">/5</span>
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--space-text-primary)]">Your grade for this case</p>
                      <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
                        Saved to your dashboard, progress ring, and grade trend
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRetrying(true);
                      setJustGraded(null);
                      setGradeError('');
                    }}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.secondary}`}
                    data-testid="button-retry-library-case"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Try again
                  </button>
                </div>

                {shownResult.summary ? (
                  <p className="mt-3 max-w-[85ch] text-xs leading-6 text-[var(--space-text-secondary)]">
                    {shownResult.summary}
                  </p>
                ) : null}

                {justGraded && freshRanking ? (
                  <PercentileRankingWidget
                    className="mt-3"
                    app="case_pool"
                    scorePercent={freshRanking.scorePercent}
                    timeSeconds={freshRanking.timeSeconds}
                    submissionKey={freshRanking.key}
                  />
                ) : null}

                {shownResult.breakdown.length > 0 ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {shownResult.breakdown.map((dimension) => (
                      <div
                        key={dimension.key}
                        className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-[var(--space-text-primary)]">{dimension.label}</p>
                          <span className={`${tw.badge.default} ${scoreBadge(dimension.score)} shrink-0`}>
                            {dimension.score}/5
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                          {dimension.evidence}
                        </p>
                        {dimension.nextStep ? (
                          <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]">
                            <span className="font-semibold">Next: </span>
                            {dimension.nextStep}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {shownResult.matched.length > 0 || shownResult.missing.length > 0 ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {shownResult.matched.length > 0 ? (
                      <div className="rounded-xl border border-[var(--space-border-default)] p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          You got this right
                        </p>
                        <ul className="mt-1.5 space-y-1">
                          {shownResult.matched.map((item, index) => (
                            <li key={index} className="text-[11px] leading-4 text-[var(--space-text-secondary)]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {shownResult.missing.length > 0 ? (
                      <div className="rounded-xl border border-[var(--space-border-default)] p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-danger)]">
                          <XCircle className="h-3.5 w-3.5 shrink-0" />
                          You missed this
                        </p>
                        <ul className="mt-1.5 space-y-1">
                          {shownResult.missing.map((item, index) => (
                            <li key={index} className="text-[11px] leading-4 text-[var(--space-text-secondary)]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {shownResult.recommendations.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
                      Practise next
                    </p>
                    <ul className="mt-1.5 space-y-1.5">
                      {shownResult.recommendations.map((item, index) => (
                        <li key={index} className="rounded-xl bg-[var(--space-surface-muted)] p-2.5">
                          <p className="text-xs font-semibold leading-5 text-[var(--space-text-primary)]">{item.action}</p>
                          {item.why ? (
                            <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">
                              <span className="font-semibold">Why? </span>
                              {item.why}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {shownResult.answer ? (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-[11px] font-semibold text-[var(--space-text-brand)]">
                      Show the answer you submitted
                    </summary>
                    <p className="mt-2 whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-3 text-[11px] leading-5 text-[var(--space-text-secondary)]">
                      {shownResult.answer}
                    </p>
                  </details>
                ) : null}
              </div>
            ) : (
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--space-text-primary)]">
                  <PenLine className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
                  Solve it here
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                  Write your structure, the numbers you worked out from the exhibits, and your recommendation. Mate
                  grades it against this case’s own model answer and saves the score to your dashboard.
                </p>
                <textarea
                  value={attempt}
                  onChange={(event) => setAttempt(event.target.value)}
                  rows={8}
                  disabled={grading}
                  placeholder={'1) My structure…\n2) From Exhibit 1 I calculated…\n3) My recommendation is…'}
                  aria-label="Your answer to this case"
                  className={`${tw.input.base} ${tw.input.default} mt-2.5 text-sm leading-6`}
                  data-testid="input-library-answer"
                />
                <p className="mt-1.5 text-[10px] text-[var(--space-text-muted)]">
                  {attempt.trim().length} characters · {MIN_ANSWER_LENGTH} minimum
                </p>
                {gradeError ? (
                  <p className="mt-2 text-[11px] leading-4 text-[var(--space-semantic-danger)]" role="alert">
                    {gradeError}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={submitAttempt}
                  disabled={grading}
                  className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary} ${
                    grading ? tw.button.disabled : ''
                  }`}
                  data-testid="button-submit-library-answer"
                >
                  {grading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Mate is grading your answer…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Submit for grading
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
        ) : null}

        {showAnswer ? (
          <div
            className="mt-4 space-y-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4"
            data-testid="pool-model-answer"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Model answer</p>

            <section>
              <p className="text-xs font-bold text-[var(--space-text-primary)]">Reading the situation</p>
              <p className="mt-1 max-w-[85ch] text-xs leading-6 text-[var(--space-text-secondary)]">
                {active.model_answer.situation_analysis}
              </p>
            </section>

            <section>
              <p className="text-xs font-bold text-[var(--space-text-primary)]">Framework applied</p>
              <p className="mt-1 max-w-[85ch] text-xs leading-6 text-[var(--space-text-secondary)]">
                {active.model_answer.framework_applied}
              </p>
            </section>

            <section>
              <p className="text-xs font-bold text-[var(--space-text-primary)]">Key findings</p>
              <ul className="mt-1 max-w-[85ch] space-y-1.5">
                {active.model_answer.key_findings.map((finding, index) => (
                  <li key={index} className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[9px] font-bold text-[var(--space-text-brand)]">
                      {index + 1}
                    </span>
                    <span className="min-w-0">{finding}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3">
              <p className="text-xs font-bold text-[var(--space-text-brand)]">Recommendation</p>
              <p className="mt-1 max-w-[85ch] text-xs leading-6 text-[var(--space-text-secondary)]">
                {active.model_answer.recommendation}
              </p>
            </section>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}
            data-testid="button-reveal-model-answer"
          >
            <Eye className="h-4 w-4" />
            Done with my attempt — show the model answer
          </button>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={drawRandom}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.primary}`}
            data-testid="button-next-random-pool-case"
          >
            <Shuffle className="h-4 w-4" />
            Next case
          </button>
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary}`}
            data-testid="button-back-to-pool-library"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to library
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------- library home */
  return (
    <div data-testid="pool-library-home">
      {/* Recommended for you */}
      <section>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
            <Target className="h-4 w-4 text-[var(--space-text-brand)]" />
            Recommended for you
          </h2>
          <span className={`${tw.badge.default} ${tw.badge.neutral}`}>
            {combinedHistory.length === 0
              ? 'A starter set for newcomers'
              : `Based on the ${combinedHistory.length} cases you have practised`}
          </span>
        </div>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          {recommendations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openCase(item)}
              className="flex flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5 text-left transition-all hover:border-[var(--space-brand-primary)] hover:shadow-md"
              data-testid={`pool-recommended-${item.id}`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`${tw.badge.default} ${tw.badge.primary}`}>
                  {POOL_TYPE_LABELS[item.type] || item.type}
                </span>
                <span className={`${tw.badge.default} ${difficultyBadge(item.difficulty)}`}>
                  {DIFFICULTY_LABELS[item.difficulty]}
                </span>
                {results[item.id] ? (
                  <span className={`${tw.badge.default} ${scoreBadge(results[item.id].score)} flex items-center gap-1`}>
                    <CheckCircle2 className="h-3 w-3" />
                    {results[item.id].score}/5
                  </span>
                ) : null}
              </div>
              <span className="mt-2 text-xs font-bold leading-4 text-[var(--space-text-primary)]">{item.title}</span>
              <span className="mt-1.5 flex items-start gap-1 text-[10px] leading-4 text-[var(--space-text-muted)]">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0" />
                {poolRecommendationReason(combinedHistory, item)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
            <BookOpen className="h-4 w-4 text-[var(--space-text-brand)]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--space-text-primary)]">
              Library of {CASE_POOL_LIBRARY.length} full cases
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Every case comes with a situation, data tables and charts, suggested frameworks, and a model answer kept hidden until you finish your own attempt.
            </p>
          </div>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by company, situation, or keyword…"
            aria-label="Search cases"
            className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
            data-testid="input-pool-search"
          />
        </div>

        <div className="mt-3 space-y-2.5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Industry</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['all', ...POOL_INDUSTRIES].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setIndustry(item)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    industry === item
                      ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                      : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
                  }`}
                  data-testid={`filter-industry-${item}`}
                >
                  {item === 'all' ? 'All' : POOL_INDUSTRY_LABELS[item] || item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Case type</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['all', ...POOL_TYPES].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    type === item
                      ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                      : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
                  }`}
                  data-testid={`filter-pool-type-${item}`}
                >
                  {item === 'all' ? 'All' : POOL_TYPE_LABELS[item] || item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Difficulty</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(['all', ...DIFFICULTY_ORDER] as Array<CaseDifficulty | 'all'>).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    difficulty === level
                      ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                      : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
                  }`}
                  data-testid={`filter-pool-difficulty-${level}`}
                >
                  {level === 'all' ? 'All' : DIFFICULTY_LABELS[level]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={drawRandom}
          disabled={matches.length === 0}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary} ${
            matches.length === 0 ? tw.button.disabled : ''
          }`}
          data-testid="button-random-pool-case"
        >
          <Shuffle className="h-4 w-4" />
          Random case
        </button>
        <p className="mt-2 text-center text-[10px] text-[var(--space-text-muted)]">
          {matches.length} cases match your filters · {solvedCount} solved and graded · {practicedIds.size}/
          {CASE_POOL_LIBRARY.length} opened
        </p>
      </section>

      {/* Case list */}
      <section className="mt-5">
        <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">
          {matches.length === CASE_POOL_LIBRARY.length ? 'The whole library' : 'Filtered results'}
        </h3>
        {matches.length === 0 ? (
          <p className="mt-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center text-xs text-[var(--space-text-secondary)]">
            No cases match. Try loosening the filters or clearing the search keyword.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-[var(--space-border-default)] rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
            {matches.slice(0, visibleCount).map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => openCase(item)}
                  className="flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors hover:bg-[var(--space-surface-card-hover)]"
                  data-testid={`pool-case-${item.id}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold leading-4 text-[var(--space-text-primary)]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[10px] text-[var(--space-text-muted)]">
                      {POOL_INDUSTRY_LABELS[item.industry] || item.industry} ·{' '}
                      {POOL_TYPE_LABELS[item.type] || item.type} · {DIFFICULTY_LABELS[item.difficulty]}
                      {results[item.id] ? '' : practicedIds.has(item.id) ? ' · opened' : ''}
                    </span>
                  </span>
                  {results[item.id] ? (
                    <span
                      className={`${tw.badge.default} ${scoreBadge(results[item.id].score)} mt-0.5 flex shrink-0 items-center gap-1`}
                      title={`You scored ${results[item.id].score} out of 5 on this case`}
                      data-testid={`pool-case-score-${item.id}`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {results[item.id].score}/5
                    </span>
                  ) : null}
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
            data-testid="button-show-more-pool-cases"
          >
            Show {Math.min(PAGE_SIZE, matches.length - visibleCount)} more cases
            <span className="font-normal text-[var(--space-text-muted)]">
              ({visibleCount}/{matches.length})
            </span>
          </button>
        ) : null}
      </section>
    </div>
  );
}
