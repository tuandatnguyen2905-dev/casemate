/**
 * CasePoolLibrary.tsx - 173 selectable full cases plus 29 retired records retained for saved-history reopen.
 *
 * Unlike the “Case Room” tab (where Mate generates and grades a bespoke case),
 * this tab opens a fully prepared case instantly: situation, key question, data
 * tables and charts, a Domain Knowledge framework where one fits, how-to-approach
 * tips, and a model answer kept hidden until the learner finishes their own
 * attempt. No AI call anywhere on this path.
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
 * already loads for the dashboard - which is why a solved case can show its score
 * on the list row and reopen with its full report intact.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  Lightbulb,
  Loader2,
  Network,
  PenLine,
  RefreshCw,
  RotateCcw,
  Shuffle,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react';
import { tw } from '../lib/colors';
import { trackStepError, trackStepView, useActiveTimeThreshold } from '../lib/engagementTracking';
import { CaseExhibitList } from './CaseExhibits';
import { BackToQuestionButton, CaseQuestionFirst, CaseReadingProvider } from './CaseReadingGuide';
import { ANSWER_ANCHOR_ID, BackToExhibitsButton, GoToAnswerBar } from './CompareExhibits';
import ExhibitRenderer from './ExhibitRenderer';
import PercentileRankingWidget from './PercentileRankingWidget';
import StructuresWorkspace from '../apps/CaseDrill/StructuresWorkspace';
import { DIFFICULTY_LABELS } from '../lib/caseLibraryShared';
import type { CaseDifficulty } from '../lib/caseLibraryShared';
import {
  CASE_POOL_LIBRARY,
  SELECTABLE_CASE_POOL_LIBRARY,
  POOL_INDUSTRIES,
  POOL_INDUSTRY_LABELS,
  POOL_TYPE_LABELS,
  poolRecommendationReason,
  recommendPoolCases,
} from '../lib/casePoolLibrary';
import type { FullCase, PoolHistoryRecord } from '../lib/casePoolLibrary';
import { QUESTION_LIBRARY } from '../lib/skillQuestionLibrary';
import { structuresEasySuggestedTree } from '../lib/structuresEasyBank';
import { DOMAIN_KNOWLEDGE_APP_ID, DOMAIN_KNOWLEDGE_TOOLKIT_PATH, domainKnowledgeFramework } from '../lib/caseGuidance';
import { BASIC_ECONOMICS_SLUG, BASIC_ECONOMICS_TOOLKITS_PILLAR, writeDomainPendingRoute } from '../lib/domainKnowledgeRoute';
import type { LibraryExhibit, LibraryQuestion } from '../lib/skillQuestionLibrary';
import type { SuggestedStructureTree } from '../lib/structureSuggestedTrees';
import CalculationAnswerBuilder, { CalculationResultSummaryView } from './CalculationAnswerBuilder';
import CaseResultView from './CaseResultView';
import { calculationCaseById, calculationWorkedItems, scoreSerializedCalculationAnswer } from '../lib/calculationsCycle1';
import {
  createCalculationAnswerPayload,
  serializeCalculationAnswer,
  type CalculationAnswerPayload,
} from '../lib/calculationAnswerModel';
import { deriveOverallScore, normalizeEasyCalculationScoring, type HonestScoreResult } from '../lib/caseScoringRubrics';
import { buildFeedbackPriorities, type FeedbackAction } from '../lib/feedbackPresentation';
import {
  buildReasoningFeedback,
  chooseNextAction,
  emptyWorkedAnswer,
  hasLearnerResponse,
  marketSizingBankWorkedAnswer,
  poolCaseEvidence,
  poolCaseWorkedAnswer,
  resultOutcome,
  retryAction,
  type AttemptHistoryEntry,
  type WorkedAnswerModel,
} from '../lib/caseResultModel';
import { MARKET_SIZING_REVEAL_NOTICE, getMarketSizingBankCase } from '../lib/marketSizingBank';
import { marketSizingWorkedAnswerModel, marketSizingWorkedModelForSource, parseComponentValue } from '../lib/marketSizingWorkedModels';
import MarketSizingWorkedAnswer, { MarketSizingAttemptFeedback } from './MarketSizingWorkedAnswer';
import { scoreBand } from '../lib/scorePresentation';
import MarketSizingAnswerBuilder, {
  MarketSizingAttemptSummary,
  calculateMarketSizingResult,
  createInitialMarketSizingDraft,
  parseMarketSizingAttempt,
  serializeMarketSizingAttempt,
  type MarketSizingAnswerDraft,
} from './MarketSizingAnswerBuilder';
import { CREATIVITY_CATEGORY_LABELS } from '../lib/creativityCycle2';
import { MARKET_SIZING_CYCLE_3_QUESTIONS, MARKET_SIZING_FORMAT_LABELS } from '../lib/marketSizingCycle3';
import { formatNumbersInText } from '../lib/numberDisplay';
import { clarifyUnitLabel, clarifyUnitText, clarifyUnitsDeep } from '../lib/unitLabels';
import { formatCanonicalNumber, numericUnitSpec } from '../lib/numericUnits';
import { CASE_POOL_REQUEST_KEY, casePoolCaseIdFromHash } from './SolveFullCaseCta';
import CasePoolFilters from './CasePoolFilters';
import CasePoolActiveFilters from './CasePoolActiveFilters';
import { CASE_POOL_BROWSE_PREFIX, readCasePoolBrowseRequest } from '../lib/casePoolLinks';
import CaseIdentityChips from './CaseIdentityChips';
import { auditPoolIdentity, poolCaseIdentity } from '../lib/caseIdentity';
import { normalizeForCompare, presentPoolCase } from '../lib/learnerContentPresentation';
import {
  DEFAULT_POOL_FILTERS,
  businessProblemForCase,
  businessProblemLabel,
  businessProblemsPresent,
  filterPoolCases,
  isDefaultPoolFilters,
  type PoolFilters,
} from '../lib/casePoolBusinessProblems';

const HISTORY_LIMIT = 200;

const STEP_LABEL_MAX = 24;

interface PoolStep {
  id: string;
  /** Authored task type, shortened for the stepper chip. */
  label: string;
  /** Authored task type in full - tooltip, aria-label and step heading. */
  fullLabel: string;
  role: string;
  prompt: string;
}

/**
 * The tasks of a multi-task case, exactly as authored (journey stages in their stored order).
 * A case with fewer than two authored tasks has no steps and keeps its normal solve screen.
 */
function poolSteps(item: FullCase): PoolStep[] {
  const stages = item.journey_stages || [];
  if (stages.length < 2) return [];
  return stages.map((stage, index) => {
    const rawType = String(stage.drillType || '').trim();
    const type = /^[a-z][a-z-]*$/.test(rawType) ? `${rawType.charAt(0).toUpperCase()}${rawType.slice(1).replace(/-/g, ' ')}` : rawType;
    const role = String(stage.role || '').trim();
    const fullLabel = type || role || `Task ${index + 1}`;
    const label = fullLabel.length > STEP_LABEL_MAX ? `${fullLabel.slice(0, STEP_LABEL_MAX - 1).trimEnd()}…` : fullLabel;
    return { id: `${stage.drillId || 'task'}-${index}`, label, fullLabel, role, prompt: String(stage.prompt || '') };
  });
}

/** One submitted text, one labelled section per authored task, in authored order. Empty when nothing was written. */
function composeStepAnswers(steps: PoolStep[], answers: string[]): string {
  if (!steps.some((_, index) => (answers[index] || '').trim())) return '';
  return steps
    .map((step, index) => `TASK ${index + 1} - ${step.fullLabel}${step.role ? ` (${step.role})` : ''}:\n${(answers[index] || '').trim() || '[no answer given for this task]'}`)
    .join('\n\n');
}

function PoolStepper({ steps, current, answers, onSelect }: { steps: PoolStep[]; current: number; answers: string[]; onSelect: (index: number) => void }) {
  const step = steps[current];
  if (!step) return null;
  return (
    <nav aria-label="Case tasks" className="mt-3 min-w-0 max-w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5" data-testid="pool-stepper">
      <p className="text-[11px] font-semibold leading-4 text-[var(--space-text-secondary)] sm:hidden" data-testid="pool-stepper-compact">
        Step {current + 1} of {steps.length} · {step.fullLabel}
      </p>
      <ol className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5 sm:mt-0">
        {steps.map((entry, index) => {
          const isCurrent = index === current;
          const answered = !isCurrent && Boolean((answers[index] || '').trim());
          const tone = isCurrent
            ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
            : answered
              ? 'border-[var(--space-semantic-success)] bg-[var(--space-surface-card)] text-[var(--space-text-primary)]'
              : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]';
          return (
            <li key={entry.id} className="flex min-w-0 max-w-full items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${index + 1} of ${steps.length}: ${entry.fullLabel}${answered ? ' (answered)' : ''}`}
                title={entry.fullLabel}
                className={`inline-flex min-h-9 min-w-0 max-w-full items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-semibold transition-colors sm:px-3 ${tone}`}
                data-testid={`pool-step-${index + 1}`}
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px]">
                  {answered ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                </span>
                <span className="hidden min-w-0 truncate sm:inline">{entry.label}</span>
              </button>
              {index < steps.length - 1 ? <ArrowRight className="hidden h-3 w-3 shrink-0 text-[var(--space-text-muted)] sm:block" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Opens Domain Knowledge on the Basic Economics card behind the first Suggested Framework chip. */
function openFrameworkInDomainKnowledge(frameworkLabels: string[]) {
  const card = frameworkLabels
    .map((label) => domainKnowledgeFramework(label)?.card)
    .find((title): title is string => Boolean(title));
  if (card) {
    writeDomainPendingRoute({ industrySlug: BASIC_ECONOMICS_SLUG, pillar: BASIC_ECONOMICS_TOOLKITS_PILLAR, cardTitle: card });
  }
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: DOMAIN_KNOWLEDGE_APP_ID } }));
}

/** Cases shown per page - rendering the full library at once makes the list too long to scan. */
const PAGE_SIZE = 24;

const BUSINESS_PROBLEM_CHIPS = businessProblemsPresent(SELECTABLE_CASE_POOL_LIBRARY);

/** Industry filter options are the same labels the cards and opening screens show. */
const POOL_INDUSTRY_FILTER_LABELS = Array.from(new Set(SELECTABLE_CASE_POOL_LIBRARY.map((item) => poolCaseIdentity(item).industry).filter(Boolean))).sort((a, b) => a.localeCompare(b));

function poolBusinessProblem(id: string): string {
  return businessProblemLabel(businessProblemForCase(id));
}

function samePoolFilters(a: PoolFilters, b: PoolFilters): boolean {
  return (Object.keys(DEFAULT_POOL_FILTERS) as Array<keyof PoolFilters>).every((key) => a[key] === b[key]);
}

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
  evidenceToRevisit?: string[];
  legacyEvidence?: string[];
  nextStep?: FeedbackAction | null;
  furtherImprovements?: FeedbackAction[];
  /** New weighted /10 report. Missing on historical /5 attempts. */
  scoring?: HonestScoreResult | null;
  sectionFeedback?: Array<{ section: string; assessment: string; evidence: string; improvement: string }>;
  integratedAssessment?: Record<string, unknown>;
  workedAnswerStatus?: string;
  /** When the saved attempt was graded - shown when a solved case is reopened. */
  completedOn?: string;
  /** Earlier graded attempts at this case, newest first. */
  history?: AttemptHistoryEntry[];
}

/**
 * Re-marks saved Calculations bank attempts with the current rules, so a reopened
 * attempt shows the same graduated score and notes as a fresh submission. Rows that
 * cannot be parsed (older formats) are returned untouched.
 */
function remarkCalculationResults(results: Record<string, LibraryGradeResult>): Record<string, LibraryGradeResult> {
  let next: Record<string, LibraryGradeResult> | null = null;
  Object.keys(results).forEach((caseId) => {
    const saved = results[caseId];
    if (!saved || typeof saved.answer !== 'string' || !saved.answer.includes('FINAL NUMERICAL ANSWERS')) return;
    const bank = calculationCaseById(CASE_POOL_LIBRARY.find((item) => item.id === caseId)?.source_case_id);
    if (!bank) return;
    try {
      const feedback = scoreSerializedCalculationAnswer(bank, saved.answer);
      if (!feedback.outcome.results.length) return;
      const good = feedback.outcome.results.filter((result) => result.status === 'exact' || result.status === 'close' || result.status === 'carried');
      const rest = feedback.outcome.results.filter((result) => !good.includes(result));
      next = next || { ...results };
      next[caseId] = {
        ...saved,
        score: Math.round(feedback.scoring.overallScore),
        scoring: feedback.scoring,
        summary: feedback.summary,
        matched: good.map((result) => `${result.label}: ${result.note}`),
        missing: rest.map((result) => `${result.label}: ${result.note}`),
        recommendations: feedback.revisions.map((action) => ({ action, why: '' })),
        sectionFeedback: [],
        integratedAssessment: {},
      };
    } catch {
      /* Keep the saved report as-is when an older answer cannot be re-marked. */
    }
  });
  return next || results;
}

function formatSavedDate(iso?: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function resultScale(result: Pick<LibraryGradeResult, 'scoring'>): 5 | 10 {
  return result.scoring?.scale === 10 ? 10 : 5;
}

function scoreBadge(score: number, scale: number = 5): string {
  return scoreBand(score, scale).badgeClassName;
}

/** The saved answer is re-scored and shown as submitted, so only the report text is clarified. */
function clarifyLibraryResult(result: LibraryGradeResult): LibraryGradeResult {
  const { answer, history, ...report } = result;
  return { ...clarifyUnitsDeep(report), answer, history };
}

function numericUnitHint(unit?: string): string {
  const label = clarifyUnitLabel(unit);
  if (!label) return '';
  const spec = numericUnitSpec(label);
  if (spec.kind === 'percent' || spec.kind === 'percentage-point' || spec.scale <= 1) return `Unit: ${label}`;
  const base = label.replace(/(?:billion|million|thousand|tỷ|triệu|nghìn)\s*/iu, '').trim();
  return `Unit: ${label} · 1.5 or ${formatCanonicalNumber(1.5 * spec.scale)}${base ? ` ${base}` : ''} both accepted`;
}

const MARKET_SIZING_ANSWER_UNITS = new Map(MARKET_SIZING_CYCLE_3_QUESTIONS.map((question) => [question.sourceCaseId, question.answerUnit]));

function marketSizingAnswerUnit(item: Pick<FullCase, 'source_case_id'>): string {
  return MARKET_SIZING_ANSWER_UNITS.get(item.source_case_id ?? '') || 'VND per year';
}

/** A Case Pool data exhibit in the Case Drill exhibit shape the issue-tree workspace renders. */
function poolExhibitAsLibraryExhibit(exhibit: FullCase['data_exhibits'][number], id: string): LibraryExhibit {
  if (exhibit.type === 'table') return {
    id,
    kind: 'table',
    title: exhibit.title,
    unit: 'As shown',
    columns: exhibit.columns,
    rows: exhibit.rows.map((row) => row.map(String)),
    footnote: exhibit.note,
  };
  if (exhibit.type === 'chart_data') return {
    id,
    kind: exhibit.chart_type,
    title: exhibit.title,
    unit: exhibit.unit || '',
    labels: exhibit.labels,
    values: exhibit.values,
  };
  return {
    id,
    kind: 'table',
    title: exhibit.label,
    unit: 'As shown',
    columns: ['Metric', 'Value'],
    rows: [[exhibit.context, exhibit.value]],
  };
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
  if (difficulty === 'expert') return 'bg-[var(--space-neutral-900)] text-[var(--space-neutral-0)]';
  if (difficulty === 'hard') return 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]';
  return 'bg-[var(--space-semantic-warning-100)] text-[var(--space-neutral-800)]';
}

export default function CasePoolLibrary({
  sessionId,
  extraHistory = [],
  results: rawResults = {},
  onGrade,
  onOpen,
  openRequest = null,
}: {
  sessionId: string;
  extraHistory?: PoolHistoryRecord[];
  /** Graded attempts keyed by library case id - drives the score badges and saved reports. */
  results?: Record<string, LibraryGradeResult>;
  /** Sends an answer to Mate for grading; resolves with the saved report. */
  onGrade?: (item: FullCase, answer: string) => Promise<LibraryGradeResult>;
  /** Creates the pending drill-log row as soon as the learner opens a case. */
  onOpen?: (item: FullCase) => Promise<void>;
  /** Host asks for one case to be opened (e.g. tapped in the dashboard history). */
  openRequest?: { id: string; nonce: number } | null;
}) {
  const results = useMemo(() => remarkCalculationResults(rawResults), [rawResults]);
  const [history, setHistory] = useState<PoolHistoryRecord[]>([]);
  const [filters, setFilters] = useState<PoolFilters>(DEFAULT_POOL_FILTERS);
  // Filters another app (My Roadmap) opened the library with; the banner shows while they are unchanged.
  const [linkedBrowse, setLinkedBrowse] = useState<{ reason: string; filters: PoolFilters } | null>(null);
  const listSectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<FullCase | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [attempt, setAttempt] = useState('');
  const [stepAnswers, setStepAnswers] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [marketSizingDraft, setMarketSizingDraft] = useState<MarketSizingAnswerDraft>(createInitialMarketSizingDraft);
  const [calculationAnswer, setCalculationAnswer] = useState<CalculationAnswerPayload>(() => createCalculationAnswerPayload([{ id: 'final-1', label: 'Final result' }], 2));
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState('');
  const [justGraded, setJustGraded] = useState<LibraryGradeResult | null>(null);
  // Set while re-attempting a case that already has a saved grade, so the old
  // report steps aside for the answer box instead of overwriting the new one.
  const [retrying, setRetrying] = useState(false);
  // Gates the destructive Redo: a saved grade is only replaced after an
  // explicit confirmation, so reopening a solved case never loses its feedback.
  const [confirmRedo, setConfirmRedo] = useState(false);
  // Percentile ranking for a case graded on THIS page load. Opening a case
  // stamps the clock; submitting turns the elapsed time + grade into one
  // ranking record. Reopened saved grades have no timing, so no widget.
  const openedAtRef = useRef<number>(Date.now());
  const [freshRanking, setFreshRanking] = useState<{
    key: string;
    scorePercent: number;
    timeSeconds: number;
  } | null>(null);
  const consumedHashRequestRef = useRef('');
  const solvingTrackedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setHistory(readHistory(sessionId));
  }, [sessionId]);

  useEffect(() => {
    const findings = auditPoolIdentity(SELECTABLE_CASE_POOL_LIBRARY);
    if (findings.length > 0) console.warn('[Case Pool] items with an omitted industry, exercise type or difficulty label (not shown to learners):', findings);
  }, []);

  const combinedHistory = useMemo(() => history.concat(extraHistory || []), [history, extraHistory]);
  const practicedIds = useMemo(
    () => new Set(history.map((item) => String(item.case_id || '')).filter(Boolean)),
    [history],
  );

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
          /* storage full or private mode - recommendations still work this session */
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
      // Completed attempts may reopen their worked answer; pending or new
      // attempts always start with it hidden.
      setShowAnswer(Boolean(results[item.id]));
      // Reopening a solved case restores legacy/free-text answers read-only in
      // the saved report. A new CM-CALC attempt starts with its structured fields.
      const savedAnswer = results[item.id]?.answer || '';
      setAttempt(savedAnswer);
      setStepAnswers([]);
      setStepIndex(0);
      setMarketSizingDraft(parseMarketSizingAttempt(savedAnswer) || createInitialMarketSizingDraft());
      setCalculationAnswer(createCalculationAnswerPayload(
        (item.numeric_checks || []).map((check, index) => ({ id: `final-${index + 1}`, label: check.label, unit: check.unit, tolerance: check.tolerance })),
        item.difficulty === 'hard' || item.difficulty === 'expert' ? 2 : 1,
      ));
      setJustGraded(null);
      setRetrying(false);
      setConfirmRedo(false);
      setGradeError('');
      openedAtRef.current = Date.now();
      setFreshRanking(null);
      remember(item);
      if (onOpen) {
        void onOpen(item).catch((error) => {
          trackStepError('case-drill-log', 'choose_case', error, { mode: 'library' });
          setGradeError(error instanceof Error ? error.message : 'Mate could not start your drill log. Please reopen the case and try again.');
        });
      }
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [remember, onOpen, results],
  );

  // Opening on request (a graded case tapped in the dashboard history). Only the
  // request identity is watched - depending on openCase would reopen the case
  // every time a grade lands and changes the results map.
  useEffect(() => {
    if (!openRequest?.id) return;
    const requested = CASE_POOL_LIBRARY.find((item) => item.id === openRequest.id);
    if (requested) openCase(requested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest?.id, openRequest?.nonce]);

  // Case Drill writes a same-tab request and the URL carries the durable route.
  // The URL path survives refresh, a copied link, a new tab, and the email gate.
  useEffect(() => {
    const consumeRequest = () => {
      let storedId = '';
      try { storedId = sessionStorage.getItem(CASE_POOL_REQUEST_KEY) || ''; } catch { /* URL remains available. */ }
      if (storedId.startsWith(CASE_POOL_BROWSE_PREFIX)) {
        try { sessionStorage.removeItem(CASE_POOL_REQUEST_KEY); } catch { /* best effort */ }
        // An older case link still in the URL must not reopen that case over the requested list.
        consumedHashRequestRef.current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        const request = readCasePoolBrowseRequest(storedId);
        if (!request) return;
        const next = { ...DEFAULT_POOL_FILTERS, ...request.filters };
        setActive(null);
        setFilters(next);
        setLinkedBrowse({ reason: request.reason || 'Opened with filters', filters: next });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const hashId = casePoolCaseIdFromHash(window.location.hash) || '';
      const id = storedId || hashId;
      if (!id) return;
      const hashSignature = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (!storedId && consumedHashRequestRef.current === hashSignature) return;
      const requested = SELECTABLE_CASE_POOL_LIBRARY.find((item) => item.id === id);
      if (!requested) return;
      if (storedId) {
        try { sessionStorage.removeItem(CASE_POOL_REQUEST_KEY); } catch { /* best effort */ }
      }
      consumedHashRequestRef.current = hashSignature;
      openCase(requested);
    };
    consumeRequest();
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent).detail?.appId === 'case-drill-log') consumeRequest();
    };
    window.addEventListener('openApp', onOpenApp);
    window.addEventListener('hashchange', consumeRequest);
    return () => {
      window.removeEventListener('openApp', onOpenApp);
      window.removeEventListener('hashchange', consumeRequest);
    };
  }, [openCase]);

  const savedResult = active ? results[active.id] : undefined;
  const rawShownResult = retrying ? null : justGraded || savedResult || null;
  const clarifiedResult = useMemo(() => (rawShownResult ? clarifyLibraryResult(rawShownResult) : null), [rawShownResult]);
  // Keep the result screen render-safe even when a stale host or legacy row
  // violates the typed contract and omits one of the report arrays.
  const shownResult = clarifiedResult
    ? {
        ...clarifiedResult,
        breakdown: Array.isArray(clarifiedResult.breakdown) ? clarifiedResult.breakdown : [],
        matched: Array.isArray(clarifiedResult.matched) ? clarifiedResult.matched : [],
        missing: Array.isArray(clarifiedResult.missing) ? clarifiedResult.missing : [],
        recommendations: Array.isArray(clarifiedResult.recommendations) ? clarifiedResult.recommendations.slice(0, 3) : [],
        evidenceToRevisit: Array.isArray(clarifiedResult.evidenceToRevisit) ? clarifiedResult.evidenceToRevisit : [],
        legacyEvidence: Array.isArray(clarifiedResult.legacyEvidence) ? clarifiedResult.legacyEvidence : [],
        furtherImprovements: Array.isArray(clarifiedResult.furtherImprovements) ? clarifiedResult.furtherImprovements : [],
        sectionFeedback: Array.isArray(clarifiedResult.sectionFeedback) ? clarifiedResult.sectionFeedback : [],
        integratedAssessment: clarifiedResult.integratedAssessment && typeof clarifiedResult.integratedAssessment === 'object'
          ? clarifiedResult.integratedAssessment
          : {},
      }
    : null;
  const journeyExhibits = useMemo(() => (active ? clarifyUnitsDeep(active.journey_exhibits) : undefined), [active]);
  const dataExhibits = useMemo(() => (active ? clarifyUnitsDeep(active.data_exhibits) : []), [active]);
  // Easy Calculations are scored on four criteria; a stored Commercial interpretation row stays in the data but is never shown.
  const easyCalculationCase = Boolean(active && active.difficulty === 'easy' && (active.skill_focus || []).includes('calculations'));
  const easyScoring = easyCalculationCase && shownResult?.scoring ? normalizeEasyCalculationScoring(shownResult.scoring) : null;
  const visibleScoringCriteria = (easyScoring || shownResult?.scoring)?.criteria.filter((criterion) => !active?.market_sizing_format || !['scope', 'assumptions', 'reasonableness', 'interpretation_check', 'assumption_rationale'].includes(criterion.key)) || [];
  const visibleScore = easyScoring
    ? easyScoring.overallScore
    : active?.market_sizing_format && shownResult?.scoring
    ? deriveOverallScore(visibleScoringCriteria)
    : shownResult?.score || 0;
  const visibleScoreBand = scoreBand(visibleScore, shownResult ? resultScale(shownResult) : 10);
  const rankedCriteria = visibleScoringCriteria.slice().sort((a, b) => a.score - b.score || b.weight - a.weight);
  const feedbackPriorities = buildFeedbackPriorities({
    evidenceToRevisit: shownResult?.evidenceToRevisit || [],
    legacyEvidence: shownResult?.legacyEvidence || [],
    nextStep: shownResult?.nextStep,
    furtherImprovements: shownResult?.furtherImprovements || [],
    legacyRecommendations: shownResult?.recommendations || [],
    fallbackActions: rankedCriteria.map((item) => ({ action: item.strongerAnswer, why: item.reason })),
  });

  const calculationWorked = useMemo(() => {
    if (!active?.worked_answer && !active?.source_case_id) return null;
    const bank = calculationCaseById(active?.source_case_id);
    if (bank) {
      let outcome: ReturnType<typeof scoreSerializedCalculationAnswer>['outcome'] | null = null;
      if (shownResult?.answer && shownResult.answer.includes('FINAL NUMERICAL ANSWERS')) {
        try { outcome = scoreSerializedCalculationAnswer(bank, shownResult.answer).outcome; } catch { outcome = null; }
      }
      return calculationWorkedItems(bank, outcome);
    }
    return active?.worked_answer ? { items: active.worked_answer.results, decision: active.worked_answer.decision } : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id, active?.source_case_id, shownResult?.answer]);

  const structureQuestion = useMemo<LibraryQuestion | null>(() => {
    if (!active || !(active.skill_focus || []).includes('structures')) return null;
    const linkedIds = [
      ...(active.related_drill_ids || []),
      ...(active.journey_stages || []).map((stage) => stage.drillId),
    ];
    const linked = QUESTION_LIBRARY.structures.find((question) => linkedIds.includes(question.id));
    // The linked Case Drill item may be multiple choice. Case Pool shows its own open task and never the drill's options.
    if (linked) return linked.options?.length ? { ...linked, options: undefined, question: structuresEasySuggestedTree(linked.id)?.root.text || active.key_question } : linked;
    const adaptedExhibits: LibraryExhibit[] = (active.data_exhibits || []).map((exhibit, index) => poolExhibitAsLibraryExhibit(exhibit, `${active.id}-structure-exhibit-${index + 1}`));
    return {
      id: `pool-structure-${active.id}`,
      skill: 'structures',
      difficulty: active.difficulty,
      title: `${active.title} Structure`,
      question: active.key_question,
      correctAnswer: active.model_answer.issue_tree?.join('\n') || active.model_answer.framework_applied || 'Build a case-specific issue tree.',
      explanation: active.model_answer.framework_applied || 'A strong tree separates the decision into testable, non-overlapping branches.',
      answerMode: 'text',
      businessContext: active.situation,
      exhibits: active.journey_exhibits?.length ? active.journey_exhibits : adaptedExhibits,
      industry: POOL_INDUSTRY_LABELS[active.industry] || active.industry,
      businessProblem: businessProblemLabel(businessProblemForCase(active.id)) || POOL_TYPE_LABELS[active.type] || active.type,
      drillType: 'Issue Tree',
      estimatedMinutes: 8,
    };
  }, [active]);

  // An unlinked structure case is graded and explained against its own published issue tree,
  // the same model answer the full-case result shows, instead of a generic template tree.
  const structureTreeOverride = useMemo<SuggestedStructureTree | null>(() => {
    if (!active || !structureQuestion || !structureQuestion.id.startsWith('pool-structure-')) return null;
    const branches = (active.model_answer.issue_tree || []).map((line) => String(line || '').trim()).filter(Boolean).slice(0, 8);
    if (branches.length < 2) return null;
    const ids = branches.map((_, index) => `${structureQuestion.id}-branch-${index + 1}`);
    const framework = String(active.model_answer.framework_applied || '').trim();
    return {
      caseId: structureQuestion.id,
      root: { id: `${structureQuestion.id}-root`, text: structureQuestion.question },
      branches: branches.map((text, index) => ({ id: ids[index], text, children: [] })),
      explanations: framework ? [{ branchId: ids[0], title: 'Why this structure', explanation: framework }] : [],
      investigateFirst: '',
    };
  }, [active, structureQuestion]);

  const submitAttempt = useCallback(async () => {
    if (!active || !onGrade) return;
    const marketSizingCalculation = calculateMarketSizingResult(marketSizingDraft.components);
    if (active.market_sizing_format && Object.keys(marketSizingCalculation.errors).length > 0) {
      setGradeError('Fix the invalid Component values before submitting.');
      return;
    }
    const text = active.source_case_id?.startsWith('CM-CALC-')
      ? serializeCalculationAnswer(calculationAnswer)
      : active.market_sizing_format
        ? serializeMarketSizingAttempt(marketSizingDraft, marketSizingAnswerUnit(active))
        : poolSteps(active).length > 0
          ? composeStepAnswers(poolSteps(active), stepAnswers)
          : attempt.trim();
    setGrading(true);
    setGradeError('');
    try {
      const serverResult = await onGrade(active, text);
      let result = serverResult;
      if (active.source_case_id?.startsWith('CM-CALC-')) {
        const bank = calculationCaseById(active.source_case_id);
        if (bank) {
          const feedback = scoreSerializedCalculationAnswer(bank, text);
          const good = feedback.outcome.results.filter((entry) => entry.status === 'exact' || entry.status === 'close' || entry.status === 'carried');
          const rest = feedback.outcome.results.filter((entry) => !good.includes(entry));
          result = {
            ...serverResult,
            score: Math.round(feedback.scoring.overallScore),
            scoring: feedback.scoring,
            summary: feedback.summary,
            matched: good.map((entry) => `${entry.label}: ${entry.note}`),
            missing: rest.map((entry) => `${entry.label}: ${entry.note}`),
            recommendations: feedback.revisions.map((action) => ({ action, why: '' })),
          };
        }
      }
      setJustGraded(result);
      // Time = case open → submission; the Date.now() suffix makes a "Try
      // again" re-grade its own ranking record instead of reusing the old one.
      setFreshRanking({
        key: `case-pool-lib:${active.id}:${Date.now()}`,
        scorePercent: Math.round((Number(result.score) / resultScale(result)) * 100),
        timeSeconds: Math.round((Date.now() - openedAtRef.current) / 1000),
      });
      setRetrying(false);
      setShowAnswer(true);
      trackStepView('case-drill-log', 'answer', {
        mode: 'library',
        dedupeKey: active.id,
        properties: { case_id: active.id, score: Number(result.score), score_scale: resultScale(result), trigger: 'graded' },
      });
    } catch (error) {
      trackStepError('case-drill-log', 'answer', error, { mode: 'library' });
      setGradeError(error instanceof Error ? error.message : 'Mate could not grade this answer. Please try again.');
    } finally {
      setGrading(false);
    }
  }, [active, attempt, stepAnswers, marketSizingDraft, calculationAnswer, onGrade]);

  const recommendations = useMemo(() => recommendPoolCases(combinedHistory, 3), [combinedHistory]);

  const completedIds = useMemo(() => new Set(Object.keys(results).filter((id) => Boolean(results[id]))), [results]);
  const matches = useMemo(() => {
    const base = filterPoolCases(SELECTABLE_CASE_POOL_LIBRARY, { ...filters, industry: 'all' }, { completedIds, openedIds: practicedIds });
    return base.filter((item) => {
      const identity = poolCaseIdentity(item);
      if (filters.industry !== 'all' && identity.industry !== filters.industry) return false;
      // A difficulty filter only matches items that actually show that difficulty.
      if (filters.difficulty !== 'all' && identity.difficulty !== filters.difficulty) return false;
      return true;
    });
  }, [filters, completedIds, practicedIds]);
  const filtersActive = !isDefaultPoolFilters(filters);
  const resetFilters = useCallback(() => setFilters(DEFAULT_POOL_FILTERS), []);

  const drawRandom = useCallback(() => {
    const unseen = matches.filter((item) => !practicedIds.has(item.id));
    const pool = unseen.length > 0 ? unseen : matches;
    if (pool.length === 0) return;
    openCase(pool[Math.floor(Math.random() * pool.length)] || null);
  }, [matches, openCase, practicedIds]);

  const solvedCount = useMemo(() => Object.keys(results).length, [results]);

  const trackSolving = useCallback((item: FullCase, trigger: 'active_2min' | 'answer_typed', activeSeconds: number | null) => {
    if (solvingTrackedRef.current.has(item.id)) return;
    solvingTrackedRef.current.add(item.id);
    trackStepView('case-drill-log', 'solving_case', {
      mode: 'library',
      dedupeKey: item.id,
      properties: {
        case_id: item.id,
        trigger,
        active_seconds: activeSeconds,
        seconds_since_open: Math.round((Date.now() - openedAtRef.current) / 1000),
      },
    });
  }, []);
  useActiveTimeThreshold(Boolean(active) && !rawShownResult && !showAnswer, active?.id, (activeSeconds) => {
    if (active) trackSolving(active, 'active_2min', activeSeconds);
  });

  // Changing filters resets to the first page instead of keeping the previous list length.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const leaveCase = () => {
    const calculationDraft = calculationAnswer.caveat.trim()
      || calculationAnswer.finalAnswers.some((answer) => answer.value.trim())
      || calculationAnswer.formulaRows.some((row) => row.numbers.some((slot) => slot.value.trim() || slot.label.trim()));
    const sizingDraft = marketSizingDraft.manualResult?.trim()
      || marketSizingDraft.components.some((component: any) => String(component?.value ?? '').trim());
    const hasUnfinishedWork = !shownResult && !showAnswer && Boolean(attempt.trim() || stepAnswers.some((value) => value.trim()) || calculationDraft || sizingDraft);
    if (hasUnfinishedWork && !window.confirm('Back to the Case Pool Library? Your unfinished answer will be discarded.')) return;
    setConfirmRedo(false);
    setActive(null);
  };

  /* ------------------------------------------------------------ open case */
  if (active) {
    const isSizingCase = Boolean(active.market_sizing_format) || (active.skill_focus || []).includes('market-sizing' as any);
    const nf = (value: string) => clarifyUnitText(isSizingCase ? formatNumbersInText(value) : value);
    const isCalculationCase = Boolean(active.source_case_id?.startsWith('CM-CALC-'));
    const savedSizingAttempt = shownResult && active.market_sizing_format ? parseMarketSizingAttempt(shownResult.answer) : null;
    const learnerAnswered = !shownResult
      ? false
      : savedSizingAttempt
        ? savedSizingAttempt.components.some((component: any) => String(component?.value ?? '').trim()) || Boolean(savedSizingAttempt.manualResult?.trim())
        : isCalculationCase
          ? /\d/.test(shownResult.answer.replace(/^[\s\S]*?FINAL NUMERICAL ANSWERS/i, '').replace(/\b(?:result|step|row)\s*\d+/gi, ''))
          : hasLearnerResponse(shownResult.answer);
    const legacyCriteria = !shownResult?.scoring && shownResult
      ? shownResult.breakdown.map((dimension) => ({ key: dimension.key, label: dimension.label, weight: 25, score: Math.round(dimension.score * 2 * 10) / 10, evidence: '', reason: dimension.evidence, strongerAnswer: dimension.nextStep }))
      : [];
    const resultCriteria = visibleScoringCriteria.length ? visibleScoringCriteria : legacyCriteria;
    const resultScaleValue = shownResult ? resultScale(shownResult) : 10;
    const outcome = resultOutcome(visibleScore, resultScaleValue, { answered: learnerAnswered });
    const focus = feedbackPriorities.nextStep?.action || '';
    const resultFeedback = buildReasoningFeedback({
      criteria: resultCriteria,
      matched: active.market_sizing_format ? [] : shownResult?.matched || [],
      missing: active.market_sizing_format ? [] : shownResult?.missing || [],
      evidenceToRevisit: [...(shownResult?.evidenceToRevisit || []), ...(shownResult?.legacyEvidence || [])],
      exclude: focus ? [focus] : [],
    });
    const sizingModel = active.market_sizing_format ? marketSizingWorkedModelForSource(active.source_case_id, marketSizingAnswerUnit(active)) : null;
    const savedSizingResult = savedSizingAttempt
      ? calculateMarketSizingResult(savedSizingAttempt.components).result ?? parseComponentValue({ label: '', value: savedSizingAttempt.manualResult || '', unit: 'number' })
      : null;
    const rawPoolWorkedAnswer: WorkedAnswerModel | null = !shownResult
      ? null
      : sizingModel
        ? (sizingModel.contentRepair ? null : marketSizingWorkedAnswerModel(sizingModel))
        : active.market_sizing_bank
        ? marketSizingBankWorkedAnswer(getMarketSizingBankCase(active.source_case_id), MARKET_SIZING_REVEAL_NOTICE)
        : calculationWorked && calculationWorked.items.length
          ? { ...emptyWorkedAnswer('reference'), calculations: calculationWorked.items, conclusion: calculationWorked.decision || '' }
          : poolCaseWorkedAnswer(active.model_answer);
    const poolWorkedAnswer = rawPoolWorkedAnswer && clarifyUnitsDeep(rawPoolWorkedAnswer);
    const frameworkCard = active.framework_hints.map((hint) => domainKnowledgeFramework(hint)).find(Boolean) || null;
    const presentedPool = presentPoolCase(active, null, { hasExhibits: Boolean(journeyExhibits?.length || dataExhibits.length) });
    // An embedded issue-tree workspace already shows the case, its exhibits and the task; the page below repeats none of them.
    const workspaceExhibitTitles = new Set((structureQuestion?.exhibits?.length ? structureQuestion.exhibits : structureQuestion?.exhibit ? [structureQuestion.exhibit] : []).map((exhibit) => normalizeForCompare(exhibit.title)));
    const pageExhibitTitles = (journeyExhibits?.length ? journeyExhibits.map((exhibit) => exhibit.title) : dataExhibits.map((exhibit) => String((exhibit as { title?: string; label?: string }).title || (exhibit as { label?: string }).label || '')));
    // Exhibits are matched by their content (labels, periods, units, values), not only by title, so a renamed copy is still recognised as the same exhibit.
    const exhibitLeaves = (value: unknown): string[] => (Array.isArray(value)
      ? value.flatMap(exhibitLeaves)
      : value && typeof value === 'object'
        ? Object.values(value as Record<string, unknown>).flatMap(exhibitLeaves)
        : value == null ? [] : [normalizeForCompare(String(value)).replace(/(\d),(?=\d{3}\b)/g, '$1')]);
    const exhibitContentKey = (exhibit: unknown): string => {
      const source = (exhibit || {}) as Record<string, unknown>;
      const leaves = exhibitLeaves([source.columns, source.rows, source.labels, source.categories, source.values, ((source.series as Array<Record<string, unknown>> | undefined) || []).map((series) => [series.name, series.values, series.xValues, series.unit])]);
      return leaves.length >= 4 ? leaves.join('|') : '';
    };
    const workspaceExhibitList = (structureQuestion?.exhibits?.length ? structureQuestion.exhibits : structureQuestion?.exhibit ? [structureQuestion.exhibit] : []) as unknown[];
    const workspaceExhibitKeys = new Set(workspaceExhibitList.map(exhibitContentKey).filter(Boolean));
    const inWorkspace = (exhibit: unknown): boolean => {
      const source = exhibit as { title?: string; label?: string };
      const key = exhibitContentKey(exhibit);
      return workspaceExhibitTitles.has(normalizeForCompare(String(source?.title || source?.label || ''))) || (key !== '' && workspaceExhibitKeys.has(key));
    };
    // A structure case shows its exhibits once, inside the workspace, and none below it. The workspace keeps its own set
    // only when that set already holds every case exhibit; otherwise it is handed the case's complete set in place of
    // its own (never added to it), so a copy the matcher misses still cannot appear twice.
    const exhibitsShownInWorkspace = Boolean(structureQuestion) && ((journeyExhibits?.length ? journeyExhibits : dataExhibits) as unknown[]).every((exhibit) => inWorkspace(exhibit));
    const workspaceHostExhibits: LibraryExhibit[] | undefined = !structureQuestion || exhibitsShownInWorkspace
      ? undefined
      : journeyExhibits?.length
        ? journeyExhibits
        : dataExhibits.map((exhibit, index) => poolExhibitAsLibraryExhibit(exhibit, `${active.id}-structure-exhibit-${index + 1}`));
    const structureBriefGuidance = [
      ...presentedPool.guidance,
      ...(presentedPool.objective ? [`Objective: ${presentedPool.objective}`] : []),
      ...presentedPool.constraints.map((constraint) => `Constraint: ${constraint}`),
    ];
    const poolTasks = active.journey_stages?.length
      ? active.journey_stages.map((stage) => ({ id: stage.drillId, label: stage.role, prompt: stage.prompt }))
      : undefined;
    const questionNoteLines = [...presentedPool.guidance, ...presentedPool.answerFormat.map((line) => `Answer format: ${line}`)];
    // Medium and Hard cases use the compare layout, keep the objective beside the question and put reading notes behind a toggle.
    const denseLayout = active.difficulty !== 'easy';
    // A multi-task case shows its objective above the task list, so the context block does not repeat it.
    const showContextObjective = Boolean(presentedPool.objective) && !poolTasks && !denseLayout;
    const contextExtraNode = presentedPool.keyTerms.length || showContextObjective || presentedPool.constraints.length ? (
      <>
        {presentedPool.keyTerms.length ? <p className="max-w-[80ch] text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-primary)]">Key terms:</span> {nf(presentedPool.keyTerms.join(' '))}</p> : null}
        {showContextObjective || presentedPool.constraints.length ? (
          <div className={`${presentedPool.keyTerms.length ? 'mt-3 ' : ''}grid gap-3 ${showContextObjective && presentedPool.constraints.length ? 'lg:grid-cols-2' : ''}`}>
            {showContextObjective ? (
              <section className="rounded-xl border-l-4 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Objective</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{nf(presentedPool.objective)}</p>
              </section>
            ) : null}
            {presentedPool.constraints.length ? (
              <section className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Constraints</p>
                <ul className="mt-1.5 space-y-1">
                  {presentedPool.constraints.map((constraint) => <li key={constraint} className="text-xs leading-5 text-[var(--space-text-secondary)]">• {nf(constraint)}</li>)}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}
      </>
    ) : undefined;
    const exhibitGuideNode = presentedPool.exhibitGuide.length ? (
      <div className="mt-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-3" data-testid="pool-exhibit-reading-guide">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">{pageExhibitTitles.length > 1 ? 'Reading the exhibits' : 'Reading the exhibit'}</p>
        <ul className="mt-1 space-y-1">{presentedPool.exhibitGuide.map((line) => <li key={line} className="text-xs leading-5 text-[var(--space-text-secondary)]">{nf(line)}</li>)}</ul>
      </div>
    ) : null;
    const nextCase = recommendations.find((item) => item.id !== active.id && !results[item.id])
      || SELECTABLE_CASE_POOL_LIBRARY.find((item) => item.id !== active.id && item.type === active.type && !results[item.id])
      || null;
    const startRetry = () => {
      setConfirmRedo(false);
      setShowAnswer(false);
      setRetrying(true);
      setJustGraded(null);
      setAttempt('');
      setStepAnswers([]);
      setStepIndex(0);
      setMarketSizingDraft(createInitialMarketSizingDraft());
      setCalculationAnswer(createCalculationAnswerPayload(
        (active.numeric_checks || []).map((check, index) => ({ id: `final-${index + 1}`, label: check.label, unit: check.unit, tolerance: check.tolerance })),
        active.difficulty === 'hard' || active.difficulty === 'expert' ? 2 : 1,
      ));
      setGradeError('');
      openedAtRef.current = Date.now();
      setFreshRanking(null);
    };
    const retry = retryAction(startRetry, { focus, label: structureQuestion ? 'Retry full case' : undefined });
    const nextAction = chooseNextAction(outcome, {
      'domain-knowledge': frameworkCard ? { kind: 'domain-knowledge', label: `Review ${frameworkCard.label}`, detail: `See how this framework works in ${DOMAIN_KNOWLEDGE_TOOLKIT_PATH}, then come back to this case.`, onSelect: () => openFrameworkInDomainKnowledge(active.framework_hints) } : null,
      'next-question': nextCase ? { kind: 'next-question', label: 'Next recommended case', detail: `Practise on “${nextCase.title}”.`, onSelect: () => openCase(nextCase) } : null,
    });
    const steps = poolSteps(active);
    const stepNow = Math.min(stepIndex, Math.max(0, steps.length - 1));
    const lastStep = steps.length >= 2 && stepNow >= steps.length - 1;
    const goToStep = (index: number) => {
      setStepIndex(Math.max(0, Math.min(steps.length - 1, index)));
      setGradeError('');
      if (typeof window !== 'undefined') window.setTimeout(() => document.getElementById('pool-step-answer')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    };
    const setStepAnswer = (value: string) => setStepAnswers((current) => {
      const next = steps.map((_, index) => current[index] || '');
      next[stepNow] = value;
      return next;
    });
    return (
      <CaseReadingProvider itemId={active.id}>
      <div data-testid="pool-library-case" data-retry-anchor onInput={() => { if (!rawShownResult) trackSolving(active, 'answer_typed', null); }}>
        <button type="button" onClick={leaveCase} className={`mb-3 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${tw.button.secondary}`} data-testid="button-back-to-pool-library-top">
          <ArrowLeft className="h-4 w-4" /> Back to Case Pool Library
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <CaseIdentityChips identity={poolCaseIdentity(active)} problem={poolBusinessProblem(active.id)} testId="pool-case-identity" />
          {active.market_sizing_bank?.geography ? (
            <span className="inline-flex min-w-0 max-w-full rounded-full border border-dashed border-[var(--space-border-default)] px-2.5 py-0.5 text-[11px] font-semibold leading-4 text-[var(--space-text-muted)]" title={`Geography: ${active.market_sizing_bank.geography}`} data-testid="market-sizing-bank-geography">
              <span className="min-w-0 break-words"><span className="sr-only">Geography: </span>{active.market_sizing_bank.geography}</span>
            </span>
          ) : null}
          {savedResult ? (
            <span
              className={`${tw.badge.default} ${scoreBadge(savedResult.score, resultScale(savedResult))} flex items-center gap-1`}
              data-testid="pool-case-saved-score"
            >
              <CheckCircle2 className="h-3 w-3" />
              Solved · {savedResult.score}/{resultScale(savedResult)} · {scoreBand(savedResult.score, resultScale(savedResult)).label}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 text-[11px] text-[var(--space-text-muted)]"><Clock className="h-3 w-3" /> {active.estimated_minutes || 25} min</span>
        </div>

        <h2 className="mt-2 text-xl font-bold leading-7 text-[var(--space-text-primary)]">{nf(active.title)}</h2>

        {steps.length >= 2 && onGrade && !shownResult ? <PoolStepper steps={steps} current={stepNow} answers={stepAnswers} onSelect={goToStep} /> : null}

        {structureQuestion ? (
          <section className="mt-4" data-testid="pool-structures-workspace">
            <StructuresWorkspace
              initialCaseId={structureQuestion.id}
              caseOverride={structureQuestion}
              suggestedTreeOverride={structureTreeOverride}
              briefOverride={{ context: presentedPool.situation, keyTerms: presentedPool.keyTerms, exhibitGuide: presentedPool.exhibitGuide, guidance: structureBriefGuidance, task: presentedPool.keyQuestion, exhibits: workspaceHostExhibits }}
              onBackToLibrary={leaveCase}
            />
          </section>
        ) : (
          <>
            <CaseQuestionFirst
              itemId={active.id}
              question={nf(presentedPool.keyQuestion)}
              questionNote={questionNoteLines.length ? questionNoteLines.map((line) => <p key={line} className="mt-1 max-w-[90ch] text-xs leading-5 text-[var(--space-text-secondary)]">{nf(line)}</p>) : undefined}
              context={nf(presentedPool.situation)}
              contextExtra={contextExtraNode}
              clientObjective={denseLayout && !poolTasks && presentedPool.objective ? nf(presentedPool.objective) : undefined}
              layout={denseLayout ? 'split' : 'stacked'}
              tasks={poolTasks}
              objective={presentedPool.objective || undefined}
              className="mt-3"
            />
            {journeyExhibits?.length ? (
              <div className="mt-4"><ExhibitRenderer exhibits={journeyExhibits} displayMode="advanced" layout={denseLayout ? 'compare' : 'grid'} guide={presentedPool.exhibitGuide.map(nf)} /></div>
            ) : (
              <>
                {denseLayout && dataExhibits.length >= 2 ? null : exhibitGuideNode}
                <CaseExhibitList
                  exhibits={dataExhibits}
                  className="mt-4"
                  layout={denseLayout ? 'compare' : 'grid'}
                  readingNotes={denseLayout && presentedPool.exhibitGuide.length ? <ul className="space-y-1" data-testid="pool-exhibit-reading-guide">{presentedPool.exhibitGuide.map((line) => <li key={line} className="text-xs leading-5 text-[var(--space-text-secondary)]">{nf(line)}</li>)}</ul> : undefined}
                />
              </>
            )}
            {denseLayout && onGrade && !shownResult && (journeyExhibits?.length || dataExhibits.length) ? <GoToAnswerBar /> : null}
            <BackToQuestionButton />
          </>
        )}

        {active.framework_hints.length ? (
          <section className="mt-4" data-testid="pool-case-suggested-framework">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
              <Lightbulb className="h-3.5 w-3.5 shrink-0" />
              Suggested Framework
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {active.framework_hints.map((hint) => (
                <span
                  key={hint}
                  title={`Explained in ${DOMAIN_KNOWLEDGE_TOOLKIT_PATH}`}
                  className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1 text-[11px] text-[var(--space-text-secondary)]"
                >
                  {hint}
                </span>
              ))}
              <button
                type="button"
                onClick={() => openFrameworkInDomainKnowledge(active.framework_hints)}
                className="inline-flex min-h-8 items-center gap-1 rounded-lg px-1.5 text-[11px] font-semibold text-[var(--space-text-brand)] hover:underline"
                data-testid="pool-framework-domain-link"
              >
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                Explained in {DOMAIN_KNOWLEDGE_TOOLKIT_PATH}
              </button>
            </div>
          </section>
        ) : null}

        {presentedPool.approachTips.length ? (
          <section className="mt-4" data-testid="pool-case-how-to-approach">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
              <Target className="h-3.5 w-3.5 shrink-0" />
              How to approach
            </p>
            <ul className="mt-1.5 max-w-[85ch] space-y-1">
              {presentedPool.approachTips.map((tip) => (
                <li key={tip} className="text-xs leading-5 text-[var(--space-text-secondary)]">{nf(tip)}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {onGrade ? (
          <section
            id={structureQuestion ? undefined : ANSWER_ANCHOR_ID}
            className={shownResult ? 'mt-4 scroll-mt-3' : 'mt-4 scroll-mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4'}
            data-testid="pool-library-attempt"
          >
            {shownResult ? (
              <div data-testid="pool-library-grade">
                <CaseResultView
                  score={visibleScore}
                  scale={resultScaleValue}
                  outcome={outcome}
                  completedOn={!justGraded ? savedResult?.completedOn : undefined}
                  feedback={resultFeedback}
                  criteria={resultCriteria}
                  learnerResponse={learnerAnswered && isCalculationCase ? (
                    <CalculationResultSummaryView
                      serialized={shownResult.answer}
                      specs={(active.numeric_checks || []).map((check, index) => ({ id: `final-${index + 1}`, label: clarifyUnitText(check.label), unit: check.unit, tolerance: check.tolerance }))}
                      title="Your submitted results"
                    />
                  ) : learnerAnswered && savedSizingAttempt ? (
                    <MarketSizingAttemptSummary value={savedSizingAttempt} answerUnit={marketSizingAnswerUnit(active)} />
                  ) : undefined}
                  learnerResponseText={learnerAnswered && !isCalculationCase && !savedSizingAttempt ? shownResult.answer : ''}
                  workedAnswer={poolWorkedAnswer}
                  workedAnswerBody={poolWorkedAnswer && sizingModel ? <MarketSizingWorkedAnswer model={sizingModel} /> : undefined}
                  layout={sizingModel ? 'stacked' : undefined}
                  unavailableReason={`${poolCaseEvidence(active.model_answer).trustworthy ? 'No verified worked answer is stored for this case.' : poolCaseEvidence(active.model_answer).reason} (Case ${active.id}.)`}
                  retry={retry}
                  nextAction={nextAction}
                  history={shownResult.history || []}
                  extras={(justGraded && freshRanking) || sizingModel ? (
                    <>
                      {justGraded && freshRanking ? (
                        <PercentileRankingWidget
                          app="case_pool"
                          scorePercent={freshRanking.scorePercent}
                          timeSeconds={freshRanking.timeSeconds}
                          submissionKey={freshRanking.key}
                        />
                      ) : null}
                      {sizingModel ? <MarketSizingAttemptFeedback model={sizingModel} components={savedSizingAttempt?.components || []} result={savedSizingResult} /> : null}
                    </>
                  ) : undefined}
                  format={nf}
                  testId="pool-library-result"
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--space-text-primary)]">
                    <PenLine className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
                    Your answer · Solve it here
                  </p>
                  {denseLayout ? <BackToExhibitsButton /> : null}
                </div>
                <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                  {active.source_case_id?.startsWith('CM-CALC-')
                    ? 'Enter every requested final number, then show the arithmetic in formula rows. Mate grades the same case ID and saves the score to your dashboard.'
                    : active.creativity_category
                      ? `Write a complete ${CREATIVITY_CATEGORY_LABELS[active.creativity_category]} response, then integrate the most important trade-off, decision gate, and recommendation. This full-case answer is saved separately from the linked Case Drill fields.`
                      : active.market_sizing_format === 'provided-data'
                        ? 'Break the case into determinants, add the supplied ones to Components, and build the bottom-up result. The issue tree is saved but never graded.'
                        : active.market_sizing_format === 'ambiguous-estimation'
                          ? 'Build an issue tree, choose the determinants you need as Components, assign values, and calculate the result. Mate grades only Components, model logic, and the result.'
                          : 'Write your structure, the numbers you worked out from the exhibits, and your recommendation. Mate grades it against this case’s own model answer and saves the score to your dashboard.'}
                </p>
                {active.source_case_id?.startsWith('CM-CALC-') ? (
                  <>
                    {(active.numeric_checks || []).some((check) => check.unit) ? (
                      <ul className="mt-2 space-y-0.5" data-testid="calculation-unit-hints">
                        {(active.numeric_checks || []).map((check, index) => (check.unit ? (
                          <li key={`final-${index + 1}`} className="text-[11px] leading-4 text-[var(--space-text-muted)]">
                            <span className="font-semibold text-[var(--space-text-secondary)]">{clarifyUnitText(check.label)}</span> · {numericUnitHint(check.unit)}
                          </li>
                        ) : null))}
                      </ul>
                    ) : null}
                    <CalculationAnswerBuilder value={calculationAnswer} onChange={setCalculationAnswer} disabled={grading} showCaveat={active.difficulty !== 'easy'} />
                  </>
                ) : active.market_sizing_format ? (
                  <div className="mt-3">
                    <MarketSizingAnswerBuilder value={marketSizingDraft} onChange={(next) => { setMarketSizingDraft(next); setGradeError(''); }} answerUnit={marketSizingAnswerUnit(active)} disabled={grading} rootText={presentedPool.rootQuestion} />
                  </div>
                ) : steps.length >= 2 ? (
                  <div id="pool-step-answer" className="scroll-mt-3" data-testid="pool-step-panel">
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
                      Step {stepNow + 1} of {steps.length}{steps[stepNow].role ? ` · ${steps[stepNow].role}` : ''}
                    </p>
                    <h3 className="mt-0.5 text-sm font-bold leading-5 text-[var(--space-text-primary)]">{steps[stepNow].fullLabel}</h3>
                    {steps[stepNow].prompt ? <p className="mt-1 max-w-[90ch] text-xs leading-5 text-[var(--space-text-secondary)]">{nf(steps[stepNow].prompt)}</p> : null}
                    <textarea
                      value={stepAnswers[stepNow] || ''}
                      onChange={(event) => setStepAnswer(event.target.value)}
                      rows={5}
                      disabled={grading}
                      placeholder={`Your answer to task ${stepNow + 1}: ${steps[stepNow].fullLabel}…`}
                      aria-label={`Your answer to task ${stepNow + 1} of ${steps.length}: ${steps[stepNow].fullLabel}`}
                      className={`${tw.input.base} ${tw.input.default} mt-2.5 text-sm leading-6`}
                      data-testid="input-library-step-answer"
                    />
                    <p className="mt-1.5 text-[10px] text-[var(--space-text-muted)]">
                      {(stepAnswers[stepNow] || '').trim().length} characters · Your answers to every task are kept while you move between steps
                    </p>
                    <div className="mt-2.5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                      {stepNow > 0 ? (
                        <button type="button" onClick={() => goToStep(stepNow - 1)} disabled={grading} className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.secondary}`} data-testid="button-step-back">
                          <ArrowLeft className="h-4 w-4" />
                          Back: {steps[stepNow - 1].fullLabel}
                        </button>
                      ) : <span />}
                      {!lastStep ? (
                        <button type="button" onClick={() => goToStep(stepNow + 1)} disabled={grading} className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`} data-testid="button-step-next">
                          Next: {steps[stepNow + 1].fullLabel}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={attempt}
                      onChange={(event) => setAttempt(event.target.value)}
                      rows={5}
                      disabled={grading}
                      placeholder={active.creativity_category
                        ? '1) Problem and audience…\n2) Case-grounded mechanism…\n3) Feasibility and trade-offs…\n4) Test, success measure, and recommendation…'
                        : '1) My structure…\n2) From Exhibit 1 I calculated…\n3) My recommendation is…'}
                      aria-label="Your answer to this case"
                      className={`${tw.input.base} ${tw.input.default} mt-2.5 text-sm leading-6`}
                      data-testid="input-library-answer"
                    />
                    <p className="mt-1.5 text-[10px] text-[var(--space-text-muted)]">
                      {attempt.trim().length} characters · Empty or near-empty submissions are scored 0–1/10
                    </p>
                  </>
                )}
                {gradeError ? (
                  <p className="mt-2 text-[11px] leading-4 text-[var(--space-semantic-danger)]" role="alert">
                    {gradeError}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={submitAttempt}
                  disabled={grading}
                  className={`mt-2.5 ${steps.length >= 2 && !lastStep ? 'hidden' : 'flex'} w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary} ${
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

        <div className="mt-4 flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
              {shownResult ? null : showAnswer ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowAnswer(false);
                    setRetrying(false);
                    setJustGraded(null);
                    setGradeError('');
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.primary}`}
                  data-testid="button-revise-pool-answer"
                >
                  <RefreshCw className="h-4 w-4" />
                  Revise my answer
                </button>
              ) : null}
              <button
                type="button"
                onClick={leaveCase}
                className={`flex ${showAnswer && !shownResult ? '' : 'flex-1'} items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary}`}
                data-testid="button-back-to-pool-library"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to case library
              </button>
        </div>
      </div>
      </CaseReadingProvider>
    );
  }

  /* ---------------------------------------------------------- library home */
  return (
    <div data-testid="pool-library-home">
      {linkedBrowse && samePoolFilters(filters, linkedBrowse.filters) ? (
        <div className="mb-4">
          <CasePoolActiveFilters
            filters={filters}
            onChange={setFilters}
            onClear={resetFilters}
            count={matches.length}
            reason={linkedBrowse.reason}
            onJumpToList={() => listSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            testId="pool-linked-filters"
          />
        </div>
      ) : null}
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
                <CaseIdentityChips identity={poolCaseIdentity(item)} problem={poolBusinessProblem(item.id)} inline />
                {results[item.id] ? (
                  <span className={`${tw.badge.default} ${scoreBadge(results[item.id].score, resultScale(results[item.id]))} flex items-center gap-1`}>
                    <CheckCircle2 className="h-3 w-3" />
                    {results[item.id].score}/{resultScale(results[item.id])} · {scoreBand(results[item.id].score, resultScale(results[item.id])).label}
                  </span>
                ) : null}
              </div>
              <span className="mt-2 text-xs font-bold leading-4 text-[var(--space-text-primary)]">{item.title}</span>
              <span className="mt-1 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">{item.objective || item.key_question}</span>
              <span className="mt-1.5 flex items-center gap-1 text-[10px] text-[var(--space-text-muted)]"><Clock className="h-3 w-3" /> {item.estimated_minutes || 25} min</span>
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
              Library of {SELECTABLE_CASE_POOL_LIBRARY.length} full cases
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Every case comes with a situation, data tables and charts, and a model answer kept hidden until you finish your own attempt. Where useful, a case also shows how to approach it and a Domain Knowledge framework that fits it.
            </p>
          </div>
        </div>

        <CasePoolFilters
          filters={filters}
          onChange={setFilters}
          industries={POOL_INDUSTRY_FILTER_LABELS}
          problems={BUSINESS_PROBLEM_CHIPS}
        />
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
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[10px] text-[var(--space-text-muted)]">
          <span data-testid="pool-match-count">
            {matches.length} cases match your filters · {solvedCount} solved and graded · {practicedIds.size}/{SELECTABLE_CASE_POOL_LIBRARY.length} opened
          </span>
          {filtersActive ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-8 items-center gap-1 rounded-lg px-1.5 text-[11px] font-semibold text-[var(--space-text-brand)] hover:underline"
              data-testid="button-reset-pool-filters"
            >
              <RotateCcw className="h-3 w-3" /> Reset filters
            </button>
          ) : null}
        </div>
      </section>

      {/* Case list */}
      <section className="mt-5 scroll-mt-3" ref={listSectionRef} data-testid="pool-case-list">
        <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">
          {filtersActive ? 'Filtered results' : 'The whole library'}
        </h3>
        {filtersActive ? (
          <div className="mt-2">
            <CasePoolActiveFilters filters={filters} onChange={setFilters} onClear={resetFilters} count={matches.length} />
          </div>
        ) : null}
        {matches.length === 0 ? (
          <div
            className="mt-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center text-xs text-[var(--space-text-secondary)]"
            data-testid="pool-no-results"
          >
            <p>No cases match these filters. Loosen a filter or clear the search keyword.</p>
            {filtersActive ? (
              <button
                type="button"
                onClick={resetFilters}
                className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold ${tw.button.secondary}`}
                data-testid="button-reset-pool-filters-empty"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset filters
              </button>
            ) : null}
          </div>
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
                    <CaseIdentityChips identity={poolCaseIdentity(item)} problem={poolBusinessProblem(item.id)} className="mt-1.5" testId={`pool-case-identity-${item.id}`} />
                    <span className="mt-1.5 block text-[10px] text-[var(--space-text-muted)]">
                      {item.estimated_minutes || 25} min
                      {results[item.id] ? ' · completed' : practicedIds.has(item.id) ? ' · opened' : ' · not started'}
                    </span>
                    <span className="mt-1.5 block line-clamp-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">{item.market_sizing_format ? formatNumbersInText(item.objective || item.key_question) : item.objective || item.key_question}</span>
                  </span>
                  {results[item.id] ? (
                    <span
                      className={`${tw.badge.default} ${scoreBadge(results[item.id].score, resultScale(results[item.id]))} mt-0.5 flex shrink-0 items-center gap-1`}
                      title={`You scored ${results[item.id].score} out of ${resultScale(results[item.id])} on this case`}
                      data-testid={`pool-case-score-${item.id}`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {results[item.id].score}/{resultScale(results[item.id])} · {scoreBand(results[item.id].score, resultScale(results[item.id])).label}
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
