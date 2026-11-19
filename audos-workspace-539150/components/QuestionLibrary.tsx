import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  ListTree,
  RefreshCw,
  Search,
  Shuffle,
  Sparkles,
  Target,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { tw } from '../lib/colors';
import ExhibitRenderer from './ExhibitRenderer';
import ExpertDrillExperience from './ExpertDrillExperience';
import { BackToQuestionButton, CaseQuestionFirst, CaseReadingProvider } from './CaseReadingGuide';
import { ANSWER_ANCHOR_ID, BackToExhibitsButton, GoToAnswerBar } from './CompareExhibits';
import { CASE_JOURNEYS } from '../lib/caseJourneys';
import {
  ALL_LIBRARY_QUESTIONS,
  QUESTION_LIBRARY,
  SKILL_META,
  questionCountFor,
  validateQuestionLibrary,
} from '../lib/skillQuestionLibrary';
import type {
  LibraryDifficulty,
  LibraryQuestion,
  LibrarySkill,
} from '../lib/skillQuestionLibrary';
import { restoreArchivedHardQuestion } from '../lib/hardCaseDrillQuestions';
import { CASE_DRILL_SKILL_KEY, isLibrarySkill } from '../lib/caseDrillSkillLink';
import { difficultyFilterLevelsFor, displayDifficultyOf } from '../lib/difficultyTiers';
import CaseIdentityChips from './CaseIdentityChips';
import { auditDrillIdentity, drillIdentity } from '../lib/caseIdentity';
import StructuresWorkspace from '../apps/CaseDrill/StructuresWorkspace';
import CaseResultView from './CaseResultView';
import { MARKET_SIZING_REVEAL_NOTICE, getMarketSizingBankCase } from '../lib/marketSizingBank';
import { formatNumbersInText } from '../lib/numberDisplay';
import { presentLibraryQuestion } from '../lib/learnerContentPresentation';
import { formatCanonicalNumber, gradeNumericQuantity, numericUnitSpec, toleranceRuleText } from '../lib/numericUnits';
import { clarifyUnitLabel, clarifyUnitText, sameUnitText } from '../lib/unitLabels';
import CalculationCaseExperience from './CalculationCaseExperience';
import CreativityCaseExperience from './CreativityCaseExperience';
import CalculationAnswerBuilder, { CalculationResultSummaryView } from './CalculationAnswerBuilder';
import FormattedNumberInput from './FormattedNumberInput';
import { scoreLibraryCalculation } from '../lib/calculationLibraryScoring';
import type { CalculationWorkedItem } from '../lib/calculationWorkedAnswers';
import {
  createCalculationAnswerPayload,
  serializeCalculationAnswer,
  type CalculationAnswerPayload,
  type CalculationFinalAnswerSpec,
  type CalculationResultSummary,
} from '../lib/calculationAnswerModel';
import { gradeCaseExercise } from '../lib/caseScoringClient';
import { deriveOverallScore, isEasyCalculation, normalizeEasyCalculationScoring, type HonestScoreResult } from '../lib/caseScoringRubrics';
import { objectiveScoreResult } from '../lib/gradingResult';
import { gradeObjectiveOnServer, useFounderAnswerKeySync } from '../lib/libraryAnswerKeys';
import { buildFeedbackPriorities } from '../lib/feedbackPresentation';
import {
  buildReasoningFeedback,
  chooseNextAction,
  choiceFeedback,
  hasLearnerResponse,
  libraryQuestionEvidence,
  libraryQuestionWorkedAnswer,
  marketSizingBankWorkedAnswer,
  normalizeAttemptHistory,
  numericFeedback,
  resultOutcome,
  retryAction,
  workedAnswerReferenceText,
  type AttemptHistoryEntry,
  type WorkedAnswerModel,
} from '../lib/caseResultModel';
import { trackMove, trackStepError, trackStepView, useActiveTimeThreshold } from '../lib/engagementTracking';
import { scoreBand } from '../lib/scorePresentation';
import { openCasePoolCase, sourceFullCase } from './SolveFullCaseCta';
import MarketSizingAnswerBuilder, {
  MarketSizingAttemptSummary,
  calculateMarketSizingResult,
  createInitialMarketSizingDraft,
  marketSizingGradableText,
  normalizeMarketSizingDraft,
  type MarketSizingAnswerDraft,
} from './MarketSizingAnswerBuilder';
import MarketSizingWorkedAnswer, { MarketSizingAttemptFeedback } from './MarketSizingWorkedAnswer';
import { marketSizingWorkedAnswerModel, marketSizingWorkedModelForQuestion, parseComponentValue } from '../lib/marketSizingWorkedModels';
import {
  CREATIVITY_CATEGORY_DESCRIPTIONS,
  CREATIVITY_CATEGORY_LABELS,
  type CreativityCategory,
} from '../lib/creativityCycle2';
import {
  MARKET_SIZING_FORMAT_DESCRIPTIONS,
  MARKET_SIZING_FORMAT_LABELS,
  type MarketSizingFormat,
} from '../lib/marketSizingCycle3';

const PAGE_SIZE = 20;
const ENGAGEMENT_APP_ID = 'case-drill';
const ENGAGEMENT_MODE = 'library';
const DIFFICULTY_LABELS: Record<LibraryDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
};

// The home list is ordered by difficulty so candidates meet Easy and Medium
// reps before the Hard and Expert ones the library array happens to list first.
const DIFFICULTY_RANK: Record<LibraryDifficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
  expert: 3,
};

const SKILL_ICONS = {
  charts: BarChart3,
  structures: ListTree,
  calculations: Calculator,
  creativity: Lightbulb,
  'market-sizing': Target,
};

type LibraryEventRole = 'open' | 'step' | 'core_action' | 'diagnostic' | 'retention';

interface LibraryEventOptions {
  completionKey?: string | null;
}

function createLibraryEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

function capitaliseLineStarts(value: string, formatNumbers = false): string {
  const capitalised = clarifyUnitText(String(value || ''))
    .replace(/\u2014/g, '-')
    .split('\n')
    .map((line) => line.replace(/^([^A-Za-zÀ-ỹ]*)([a-zà-ỹ])/, (_, prefix, first) => `${prefix}${first.toUpperCase()}`))
    .join('\n');
  return formatNumbers ? formatNumbersInText(capitalised) : capitalised;
}

// Market Sizing views shadow `capitaliseLineStarts` locally so every rendered line also gets display-only thousands separators.
const capitaliseWithNumbers = capitaliseLineStarts;

function normalise(value: string): string {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
}

/** A saved choice may use older unit wording ("VND 7.13bn"); it reopens as the current option it names. */
function currentOptionFor(options: string[] | undefined, saved: string): string {
  const list = options || [];
  // Attempts saved before the month labels were spelled out ("M3" -> "Month 3") still reopen on the option they chose.
  const spelledOut = saved.replace(/\bM([1-4])\b/g, 'Month $1');
  return list.find((option) => sameUnitText(option, saved))
    || list.find((option) => sameUnitText(option, spelledOut))
    || saved;
}

function equivalentScaleHint(unitLabel: string): string {
  if (!unitLabel) return '';
  const spec = numericUnitSpec(unitLabel);
  if (spec.scale <= 1 || !['currency', 'count', 'number'].includes(spec.kind)) return '';
  return `Unit: ${unitLabel} · 1.5 or ${formatCanonicalNumber(1.5 * spec.scale)}${spec.currency ? ` ${spec.currency}` : ''} are both accepted`;
}

function isQuestionCompleted(questionId: string): boolean {
  try { return Boolean(localStorage.getItem(`casemate-expert-completed:${questionId}`)); } catch { return false; }
}

function difficultyClass(difficulty: LibraryDifficulty): string {
  if (difficulty === 'easy') return 'bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]';
  if (difficulty === 'expert') return 'bg-[var(--space-neutral-900)] text-[var(--space-neutral-0)]';
  if (difficulty === 'hard') return 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]';
  return 'bg-[var(--space-semantic-warning-100)] text-[var(--space-neutral-800)]';
}

interface DrillLibraryAnswerSnapshot {
  schemaVersion: 1 | 2;
  kind: 'choice' | 'calculation' | 'market-sizing' | 'text';
  candidateAnswer: string;
  selectedOption: string;
  answer: string;
  working: string;
  calculationAnswer: CalculationAnswerPayload;
  marketSizingDraft?: MarketSizingAnswerDraft;
  /** Legacy v1 fields are read only so old attempts reopen without errors. */
  marketSizingFactors?: Array<Record<string, unknown>>;
  marketSizingManualResult?: string;
  marketSizingNotes?: Record<string, unknown>;
  /** Up to five earlier graded attempts at this question, newest first. */
  previousAttempts?: Array<{ score: number; scale: number; completedOn?: string }>;
}

interface DrillLibraryAttempt {
  id: number;
  session_id: string;
  question_id: string;
  skill?: string;
  difficulty?: string;
  answer_json: DrillLibraryAnswerSnapshot | string;
  score: number;
  scoring_json: HonestScoreResult | string;
  status: string;
  completed_on?: string;
  created_at?: string;
  updated_at?: string;
}

function parseSavedObject<T>(value: T | string | null | undefined): T | null {
  if (value && typeof value === 'object') return value as T;
  if (typeof value !== 'string') return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed as T : null;
  } catch {
    return null;
  }
}

function formatCompletedDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function scoringScale(scoring: HonestScoreResult | null): number {
  return Number(scoring?.scale) === 10 ? 10 : 5;
}

/** Score shown on a library row. Saved Easy Calculations that stored a Commercial interpretation score are recomputed from the four Easy criteria. */
function attemptScoreFor(question: LibraryQuestion, attempt: DrillLibraryAttempt | undefined): number {
  const stored = Number(attempt?.score) || 0;
  const scoring = parseSavedObject<HonestScoreResult>(attempt?.scoring_json);
  if (scoring && Array.isArray(scoring.criteria) && isEasyCalculation(question.skill, question.difficulty)) {
    return Math.round(normalizeEasyCalculationScoring(scoring).overallScore);
  }
  return stored;
}

function calculationFinalAnswerSpecs(question: LibraryQuestion): CalculationFinalAnswerSpec[] {
  if (question.calculationNumericChecks?.length) {
    return question.calculationNumericChecks.map((check, index) => ({ id: `final-${index + 1}`, label: check.label, unit: check.unit, tolerance: check.tolerance }));
  }
  const parts = String(question.correctAnswer || '').split(';').map((part) => part.trim()).filter(Boolean);
  return (parts.length ? parts : [question.correctAnswer]).map((part, index) => {
    const currency = part.match(/\b(VND|USD)\s+(billion|million|thousand)?/i);
    const count = part.match(/\b(sales|units|packs|bottles|orders|buyers|customers|people|subscriber-months|subscribers|years)\b/i);
    // The result quantity wins over incidental percentages in surrounding copy:
    // “VND 4.8bn below the 10% plan” is currency; “500 sales (15%)” is sales.
    const unit = currency
      ? `${currency[1].toUpperCase()}${currency[2] ? ` ${currency[2].toLowerCase()}` : ''}`
      : count
        ? count[1]
        : /percentage[ -]?points?|\bpp\b/i.test(part)
          ? 'percentage points'
          : /%|\bpercent/i.test(part)
            ? '%'
            : index === 0 ? question.answerUnit : undefined;
    const resultId = `final-${index + 1}`;
    const finalFormula = question.calculationResultFormulas?.[resultId]?.slice(-1)[0] || '';
    const displayedDecimals = (finalFormula.split('=').pop() || '').match(/\.(\d+)/)?.[1]?.length || 0;
    const inferredTolerance = count ? 0 : displayedDecimals ? 0.5 * (10 ** -displayedDecimals) : 0;
    return {
      id: resultId,
      label: question.calculationResultNames?.[index] || (index === 0 ? `${question.title} Result` : `${question.title} Comparison`),
      unit,
      tolerance: index === 0 && question.numericTolerance != null ? question.numericTolerance : inferredTolerance,
    };
  });
}

function calculationWorkedResults(question: LibraryQuestion): CalculationResultSummary[] {
  const specs = calculationFinalAnswerSpecs(question);
  const parts = String(question.correctAnswer || '').split(';').map((part) => part.trim()).filter(Boolean);
  return specs.map((spec, index) => ({
    id: spec.id,
    label: spec.label,
    value: parts[index] || (index === 0 ? question.correctAnswer : 'See the worked explanation'),
    unit: spec.unit,
    formulas: question.calculationResultFormulas?.[spec.id] || [],
  }));
}

function calculationWorkedItems(question: LibraryQuestion): CalculationWorkedItem[] {
  return calculationWorkedResults(question).map((result) => {
    const needsUnit = Boolean(result.unit) && !result.value.toLowerCase().includes(String(result.unit).toLowerCase());
    return {
      id: result.id,
      label: result.label,
      answer: needsUnit ? `${result.value} ${result.unit}` : result.value,
      formula: result.formulas.join('  |  '),
      steps: question.calculationWorkedSteps?.[result.id] || [],
    };
  });
}

function workedInputLines(question: LibraryQuestion): string[] {
  const exhibits = question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
  const lines: string[] = [];
  exhibits.forEach((exhibit) => {
    if (exhibit.columns?.length && exhibit.rows?.length) {
      exhibit.rows.slice(0, 6).forEach((row) => lines.push(row.map((cell, index) => `${exhibit.columns?.[index] || 'Value'}: ${cell}`).join(' · ')));
    } else if (exhibit.labels?.length && exhibit.values?.length) {
      exhibit.labels.slice(0, 6).forEach((label, index) => lines.push(`${label}: ${exhibit.values?.[index]}${exhibit.unit ? ` ${exhibit.unit}` : ''}`));
    } else if (exhibit.categories?.length && exhibit.series?.length) {
      exhibit.series.slice(0, 3).forEach((series) => lines.push(`${series.name}: ${exhibit.categories?.map((category, index) => `${category} ${series.displayValues?.[index] ?? series.values[index]}`).join(' · ')}`));
    }
  });
  return lines.slice(0, 8);
}

/** The worked answer for a library question. The grader receives the same text, so the score and the worked answer share one source. */
function libraryWorkedAnswerFor(question: LibraryQuestion): WorkedAnswerModel | null {
  const sizingModel = marketSizingWorkedModelForQuestion(question);
  if (sizingModel) return sizingModel.contentRepair ? null : marketSizingWorkedAnswerModel(sizingModel);
  if (question.marketSizingBank) return marketSizingBankWorkedAnswer(getMarketSizingBankCase(question.sourceCaseId), MARKET_SIZING_REVEAL_NOTICE);
  return libraryQuestionWorkedAnswer(question, question.skill === 'calculations'
    ? { calculations: calculationWorkedItems(question), inputLines: workedInputLines(question) }
    : {});
}

const COMPACT_TABLE_KINDS = ['table', 'financial-table', 'market-sizing-table', 'sensitivity-table', 'kpi-scorecard'];

function isCompactSingleChart(question: LibraryQuestion): boolean {
  if (question.skill === 'structures' || question.skill === 'creativity' || question.structuredAnswer) return false;
  if (question.sourceCaseId?.startsWith('CM-')) return false;
  const exhibits = question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
  return exhibits.length === 1 && !COMPACT_TABLE_KINDS.includes(exhibits[0].kind);
}

export default function QuestionLibrary({ onCompactLayoutChange }: { onCompactLayoutChange?: (compact: boolean) => void } = {}) {
  const { sessionId, visitorId, spaceId, trackEvent } = useSpaceRuntime();
  const [skill, setSkill] = useState<LibrarySkill>('charts');
  const [difficulty, setDifficulty] = useState<LibraryDifficulty | 'all'>('all');
  const [creativityCategory, setCreativityCategory] = useState<CreativityCategory | 'all'>('all');
  const [marketSizingFormat, setMarketSizingFormat] = useState<MarketSizingFormat | 'all'>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [active, setActive] = useState<LibraryQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [answer, setAnswer] = useState('');
  const [working, setWorking] = useState('');
  const [calculationAnswer, setCalculationAnswer] = useState<CalculationAnswerPayload>(() => createCalculationAnswerPayload([{ id: 'final-1', label: 'Final result' }], 1));
  const [marketSizingDraft, setMarketSizingDraft] = useState<MarketSizingAnswerDraft>(createInitialMarketSizingDraft);
  const [submitted, setSubmitted] = useState(false);
  const [grading, setGrading] = useState(false);
  const [scoreResult, setScoreResult] = useState<HonestScoreResult | null>(null);
  const [validationError, setValidationError] = useState('');
  const [journey, setJourney] = useState('all');
  const [drillType, setDrillType] = useState('all');
  const [industry, setIndustry] = useState('all');
  const [businessProblem, setBusinessProblem] = useState('all');
  const [estimatedTime, setEstimatedTime] = useState<'all' | 'under-10' | '10-plus'>('all');
  const [completion, setCompletion] = useState<'all' | 'completed' | 'not-completed'>('all');
  const [recommendedOnly, setRecommendedOnly] = useState(false);
  const [completionVersion, setCompletionVersion] = useState(0);
  const [confirmRedo, setConfirmRedo] = useState(false);
  const [shownCompletedOn, setShownCompletedOn] = useState('');
  const [attemptHistory, setAttemptHistory] = useState<AttemptHistoryEntry[]>([]);
  const libraryOpenedTrackedRef = useRef(false);
  const submittedAttemptRef = useRef(false);
  const explanationViewedRef = useRef(false);
  const [trackedItemId, setTrackedItemId] = useState<string | null>(null);
  const lastTrackedItemIdRef = useRef<string | null>(null);
  const trackedItemOpenedAtRef = useRef(0);
  const solvingTrackedItemRef = useRef<string | null>(null);

  const {
    data: attemptRows,
    loading: attemptsLoading,
    error: attemptsError,
    refresh: refreshAttempts,
  } = window.useWorkspaceDB<DrillLibraryAttempt>('drill_library_attempts', {
    filters: [{ column: 'session_id', operator: 'eq', value: sessionId || '__no_session__' }],
    orderBy: { column: 'completed_on', direction: 'desc' },
    limit: 1000,
  });

  const attemptByQuestion = useMemo(() => {
    const byQuestion = new Map<string, DrillLibraryAttempt>();
    (attemptRows || []).forEach((row) => {
      if (row.status !== 'completed' || !row.question_id || byQuestion.has(row.question_id)) return;
      byQuestion.set(row.question_id, row);
    });
    return byQuestion;
  }, [attemptRows]);

  const isCompleted = useCallback((questionId: string) => (
    attemptByQuestion.has(questionId) || isQuestionCompleted(questionId)
  ), [attemptByQuestion, completionVersion]);
  const listScore = (question: LibraryQuestion) => attemptScoreFor(question, attemptByQuestion.get(question.id));

  const libraryUserKey = useMemo(() => {
    try {
      const stored = localStorage.getItem(`space_session_${spaceId}`);
      const parsed = stored ? JSON.parse(stored) : null;
      if (typeof parsed?.email === 'string' && parsed.email.includes('@')) return `email:${parsed.email.toLowerCase().trim()}`;
    } catch {
      // Fall through to the stable device identity.
    }
    return visitorId ? `device:${visitorId}` : sessionId ? `device:${sessionId}` : 'device:unknown';
  }, [sessionId, spaceId, visitorId]);

  const emitLibraryEvent = useCallback(async (
    eventName: string,
    eventRole: LibraryEventRole,
    properties: Record<string, unknown>,
    options: LibraryEventOptions = {},
  ) => {
    if (!sessionId) return;
    const eventId = createLibraryEventId();
    const unresolved = libraryUserKey === 'device:unknown' || libraryUserKey.startsWith('device:wses_');
    try {
      await (window as any).__workspaceDb?.from('feature_events').insert({
        event_key: eventId,
        schema_version: 1,
        event_name: eventName,
        event_role: eventRole,
        feature_name: 'drill_library',
        app_id: 'case-drill',
        mode: 'library',
        user_id: unresolved ? null : libraryUserKey,
        identity_status: unresolved ? 'identity_unresolved' : 'resolved',
        source_user_key: libraryUserKey,
        identity_session_ref: sessionId,
        completion_key: options.completionKey ?? null,
        occurred_at: new Date().toISOString(),
        properties_json: properties,
        source_kind: 'live',
        source_table: null,
        source_record_id: null,
        session_id: sessionId,
      });
    } catch (error) {
      console.warn('[Question Library] feature_events write failed:', eventName, error);
    }
    void trackEvent(eventName, {
      ...properties,
      event_id: eventId,
      event_role: eventRole,
      feature_name: 'drill_library',
      source_kind: 'live',
    });
  }, [libraryUserKey, sessionId, trackEvent]);

  useEffect(() => {
    if (!sessionId || libraryOpenedTrackedRef.current) return;
    libraryOpenedTrackedRef.current = true;
    void emitLibraryEvent('drill_library_opened', 'open', {});
  }, [sessionId, emitLibraryEvent]);

  const trackChooseCase = (item: Pick<LibraryQuestion, 'id' | 'skill' | 'difficulty'>, viaNextButton = false) => {
    const previousItemId = lastTrackedItemIdRef.current;
    if (previousItemId && previousItemId !== item.id && !viaNextButton) {
      trackMove(ENGAGEMENT_APP_ID, 'self_exit_choose_other', {
        mode: ENGAGEMENT_MODE,
        properties: { from_item_id: previousItemId, to_item_id: item.id },
      });
    }
    lastTrackedItemIdRef.current = item.id;
    trackedItemOpenedAtRef.current = Date.now();
    setTrackedItemId(item.id);
    trackStepView(ENGAGEMENT_APP_ID, 'choose_case', {
      mode: ENGAGEMENT_MODE,
      dedupeKey: item.id,
      properties: { question_id: item.id, skill: item.skill, difficulty: item.difficulty },
    });
  };

  const trackSolving = (trigger: 'active_2min' | 'answer_typed', activeSeconds: number | null = null) => {
    if (!active || !trackedItemId || solvingTrackedItemRef.current === trackedItemId) return;
    solvingTrackedItemRef.current = trackedItemId;
    trackStepView(ENGAGEMENT_APP_ID, 'solving_case', {
      mode: ENGAGEMENT_MODE,
      dedupeKey: trackedItemId,
      properties: {
        question_id: trackedItemId,
        trigger,
        active_seconds: activeSeconds,
        seconds_since_open: Math.round((Date.now() - trackedItemOpenedAtRef.current) / 1000),
      },
    });
  };

  const trackAnswer = (itemId: string, scoring?: HonestScoreResult | null) => {
    trackStepView(ENGAGEMENT_APP_ID, 'answer', {
      mode: ENGAGEMENT_MODE,
      dedupeKey: itemId,
      properties: {
        question_id: itemId,
        score: scoring && Number.isFinite(Number(scoring.overallScore)) ? Math.round(Number(scoring.overallScore)) : null,
        score_scale: scoring ? scoringScale(scoring) : null,
      },
    });
  };

  const trackLibraryError = (stepName: 'choose_case' | 'answer', error: unknown, itemId?: string | null) => {
    trackStepError(ENGAGEMENT_APP_ID, stepName, error, { mode: ENGAGEMENT_MODE, properties: { question_id: itemId ?? null } });
  };

  useActiveTimeThreshold(Boolean(active) && !submitted && Boolean(trackedItemId), trackedItemId, (activeSeconds) => trackSolving('active_2min', activeSeconds));

  useEffect(() => {
    if (attemptsError) trackLibraryError('choose_case', attemptsError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptsError]);

  useEffect(() => {
    const findings = auditDrillIdentity(ALL_LIBRARY_QUESTIONS);
    if (findings.length > 0) console.warn('[Case Drill] items with an omitted industry, exercise type or difficulty label (not shown to learners):', findings);
  }, []);

  const libraryErrors = useMemo(() => validateQuestionLibrary(), []);
  useEffect(() => {
    if (libraryErrors.length > 0) console.warn('[Question Library] content audit findings (not shown to learners):', libraryErrors);
  }, [libraryErrors]);
  const answerKeySyncQuestions = useMemo(() => [...ALL_LIBRARY_QUESTIONS, ...ALL_LIBRARY_QUESTIONS.map(restoreArchivedHardQuestion)], []);
  const answerKeySyncStatus = useFounderAnswerKeySync(sessionId, spaceId, answerKeySyncQuestions);
  const marketSizingCalculation = useMemo(
    () => calculateMarketSizingResult(marketSizingDraft.components),
    [marketSizingDraft.components],
  );
  const marketSizingResult = marketSizingCalculation.result === null ? marketSizingDraft.manualResult : String(marketSizingCalculation.result);
  const skillMeta = SKILL_META.find((item) => item.id === skill) || SKILL_META[0];
  const questions = QUESTION_LIBRARY[skill];
  const visibleQuestions = useMemo(
    () => questions
      .map(restoreArchivedHardQuestion)
      .filter((question) => question.reviewStatus !== 'Archived'),
    [questions],
  );
  const difficultyQuestions = useMemo(
    () => visibleQuestions.filter((question) => {
      if (skill === 'creativity') return creativityCategory === 'all' || question.creativityCategory === creativityCategory;
      if (skill === 'market-sizing' && marketSizingFormat !== 'all' && question.marketSizingFormat !== marketSizingFormat) return false;
      return difficulty === 'all' || drillIdentity(question).difficulty === difficulty;
    }),
    [visibleQuestions, skill, difficulty, creativityCategory, marketSizingFormat],
  );
  const filterOptions = useMemo(() => ({
    journeyIds: [...new Set(difficultyQuestions.map((question) => question.journeyId).filter(Boolean))] as string[],
    drillTypes: [...new Set(difficultyQuestions.map((question) => drillIdentity(question).exerciseType).filter(Boolean))] as string[],
    industries: [...new Set(difficultyQuestions.map((question) => drillIdentity(question).industry).filter(Boolean))] as string[],
    businessProblems: [...new Set(difficultyQuestions.map((question) => question.businessProblem).filter(Boolean))] as string[],
  }), [difficultyQuestions]);
  const recommendedIds = useMemo(() => {
    const ids = new Set<string>();
    // Preserve explicit next-drill chains (used by Expert and the new Hard set)
    // whenever the learner has completed the source drill.
    ALL_LIBRARY_QUESTIONS.forEach((question) => {
      if (isCompleted(question.id) && question.recommendedNextDrillId) ids.add(question.recommendedNextDrillId);
    });
    // Every difficulty also receives progress-aware fallbacks: the first
    // incomplete drill in each drill type. This keeps recommendations useful
    // for Easy and Medium questions that predate explicit recommendation ids.
    const representedTypes = new Set<string>();
    difficultyQuestions.forEach((question) => {
      const type = question.drillType || question.skill;
      if (!isCompleted(question.id) && !representedTypes.has(type)) {
        representedTypes.add(type);
        ids.add(question.id);
      }
    });
    return ids;
  }, [difficultyQuestions, isCompleted]);
  const matches = useMemo(() => {
    const needle = normalise(query);
    const filtered = visibleQuestions.filter((question) => {
      if (skill === 'creativity') {
        if (creativityCategory !== 'all' && question.creativityCategory !== creativityCategory) return false;
      } else {
        if (difficulty !== 'all' && drillIdentity(question).difficulty !== difficulty) return false;
        if (skill === 'market-sizing' && marketSizingFormat !== 'all' && question.marketSizingFormat !== marketSizingFormat) return false;
      }
      if (journey === 'journeys-only' && !question.journeyId) return false;
      if (journey === 'standalone' && question.journeyId) return false;
      if (journey !== 'all' && journey !== 'journeys-only' && journey !== 'standalone' && question.journeyId !== journey) return false;
      if (drillType !== 'all' && drillIdentity(question).exerciseType !== drillType) return false;
      if (industry !== 'all' && drillIdentity(question).industry !== industry) return false;
      if (businessProblem !== 'all' && question.businessProblem !== businessProblem) return false;
      if (estimatedTime === 'under-10' && (!question.estimatedMinutes || question.estimatedMinutes >= 10)) return false;
      if (estimatedTime === '10-plus' && (!question.estimatedMinutes || question.estimatedMinutes < 10)) return false;
      const completed = isCompleted(question.id);
      if (completion === 'completed' && !completed) return false;
      if (completion === 'not-completed' && completed) return false;
      if (recommendedOnly && !recommendedIds.has(question.id)) return false;
      if (!needle) return true;
      return normalise(`${question.title} ${question.question} ${question.explanation} ${question.drillType || ''} ${question.industry || ''} ${question.businessProblem || ''}`).includes(needle);
    });
    return skill === 'creativity'
      ? filtered.sort((a, b) => String(a.sourceCaseId || '').localeCompare(String(b.sourceCaseId || '')))
      : filtered.sort((a, b) => DIFFICULTY_RANK[displayDifficultyOf(a)] - DIFFICULTY_RANK[displayDifficultyOf(b)]);
  }, [visibleQuestions, skill, difficulty, creativityCategory, marketSizingFormat, query, journey, drillType, industry, businessProblem, estimatedTime, completion, recommendedOnly, recommendedIds, isCompleted]);

  useEffect(() => {
    const namedJourney = journey !== 'all' && journey !== 'journeys-only' && journey !== 'standalone';
    if (namedJourney && !filterOptions.journeyIds.includes(journey)) setJourney('all');
    if (drillType !== 'all' && !filterOptions.drillTypes.includes(drillType)) setDrillType('all');
    if (industry !== 'all' && !filterOptions.industries.includes(industry)) setIndustry('all');
    if (businessProblem !== 'all' && !filterOptions.businessProblems.includes(businessProblem)) setBusinessProblem('all');
  }, [difficulty, filterOptions, journey, drillType, industry, businessProblem]);

  useEffect(() => {
    if (difficulty !== 'all' && !difficultyFilterLevelsFor(skill).includes(difficulty)) setDifficulty('all');
  }, [skill, difficulty]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [skill, difficulty, creativityCategory, marketSizingFormat, query, journey, drillType, industry, businessProblem, estimatedTime, completion, recommendedOnly]);

  const clearFilters = () => {
    setQuery('');
    setCreativityCategory('all');
    setMarketSizingFormat('all');
    setJourney('all');
    setDrillType('all');
    setIndustry('all');
    setBusinessProblem('all');
    setEstimatedTime('all');
    setCompletion('all');
    setRecommendedOnly(false);
  };

  const resetAttempt = (question?: LibraryQuestion) => {
    submittedAttemptRef.current = false;
    explanationViewedRef.current = false;
    setSelectedOption('');
    setAnswer('');
    setWorking('');
    setCalculationAnswer(createCalculationAnswerPayload(
      question ? calculationFinalAnswerSpecs(question) : [{ id: 'final-1', label: 'Final result' }],
      question && (question.difficulty === 'hard' || question.difficulty === 'expert') ? 2 : 1,
    ));
    setMarketSizingDraft(createInitialMarketSizingDraft());
    setSubmitted(false);
    setGrading(false);
    setScoreResult(null);
    setValidationError('');
    setConfirmRedo(false);
    setShownCompletedOn('');
    setAttemptHistory([]);
  };

  const redoAttempt = () => {
    if (!active) return;
    resetAttempt(active);
  };

  const openQuestion = (question: LibraryQuestion, viaNextButton = false) => {
    setActive(question);
    resetAttempt(question);
    const savedAttempt = attemptByQuestion.get(question.id);
    if (savedAttempt) {
      const savedScoring = parseSavedObject<HonestScoreResult>(savedAttempt.scoring_json);
      const savedAnswer = parseSavedObject<DrillLibraryAnswerSnapshot>(savedAttempt.answer_json);
      if (savedScoring && Array.isArray(savedScoring.criteria) && savedAnswer) {
        setSelectedOption(currentOptionFor(question.options, savedAnswer.selectedOption || ''));
        setAnswer(savedAnswer.answer || '');
        setWorking(savedAnswer.working || '');
        const currentCalculationSpecs = calculationFinalAnswerSpecs(question);
        const currentCalculationAnswer = savedAnswer.calculationAnswer
          ? {
              ...savedAnswer.calculationAnswer,
              finalAnswers: savedAnswer.calculationAnswer.finalAnswers.map((saved, index) => ({
                ...saved,
                ...(currentCalculationSpecs[index] || {}),
                value: saved.value,
              })),
            }
          : null;
        if (currentCalculationAnswer) setCalculationAnswer(currentCalculationAnswer);
        setMarketSizingDraft(normalizeMarketSizingDraft(
          savedAnswer.marketSizingDraft,
          savedAnswer.marketSizingFactors,
          savedAnswer.marketSizingManualResult,
        ));
        // Calculations attempts are re-marked with the current rules so the reopened score matches a fresh one.
        const remarked = question.skill === 'calculations' && currentCalculationAnswer
          ? scoreLibraryCalculation(question, currentCalculationAnswer)
          : null;
        setScoreResult(remarked || savedScoring);
        setShownCompletedOn(savedAttempt.completed_on || '');
        setAttemptHistory(normalizeAttemptHistory(savedAnswer.previousAttempts));
        setSubmitted(true);
        submittedAttemptRef.current = true;
        try { localStorage.setItem(`casemate-expert-completed:${question.id}`, savedAttempt.completed_on || new Date().toISOString()); } catch { /* Best-effort completion fallback. */ }
      } else {
        setValidationError('Your saved completion was found, but its feedback could not be opened. You can submit a fresh attempt without deleting the saved row first.');
        trackLibraryError('choose_case', 'saved_feedback_unreadable', question.id);
      }
    }
    trackChooseCase(question, viaNextButton);
    void emitLibraryEvent('drill_question_opened', 'step', {
      question_id: question.id,
      skill: question.skill,
      difficulty: question.difficulty,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Case Pool writes an exact drill id before opening this app. The openApp
  // listener also covers a Case Drill window that is already mounted.
  useEffect(() => {
    const consumeRequest = () => {
      if (attemptsLoading) return;
      try {
        const id = sessionStorage.getItem('casemate-open-case-drill');
        const requested = id ? ALL_LIBRARY_QUESTIONS.find((question) => question.id === id) : null;
        if (requested) {
          sessionStorage.removeItem('casemate-open-case-drill');
          sessionStorage.removeItem(CASE_DRILL_SKILL_KEY);
          setSkill(requested.skill);
          openQuestion(requested);
          return;
        }
        const requestedSkill = sessionStorage.getItem(CASE_DRILL_SKILL_KEY);
        if (!requestedSkill) return;
        sessionStorage.removeItem(CASE_DRILL_SKILL_KEY);
        if (isLibrarySkill(requestedSkill)) switchSkill(requestedSkill);
      } catch {
        /* sessionStorage can be unavailable in strict browser modes */
      }
    };
    consumeRequest();
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent).detail?.appId === 'case-drill') consumeRequest();
    };
    window.addEventListener('openApp', onOpenApp);
    return () => window.removeEventListener('openApp', onOpenApp);
    // The request is event-driven; re-registering on every render would risk
    // consuming the same navigation twice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptsLoading]);

  const switchSkill = (nextSkill: LibrarySkill) => {
    setSkill(nextSkill);
    setDifficulty('all');
    setCreativityCategory('all');
    setMarketSizingFormat('all');
    setQuery('');
    setJourney('all');
    setDrillType('all');
    setIndustry('all');
    setBusinessProblem('all');
    setEstimatedTime('all');
    setCompletion('all');
    setRecommendedOnly(false);
    setActive(null);
    resetAttempt();
    void emitLibraryEvent('drill_skill_selected', 'step', { skill: nextSkill });
  };

  const randomQuestion = () => {
    const pool = matches.length > 0 ? matches : difficultyQuestions;
    if (pool.length === 0) return;
    const nextQuestion = pool[Math.floor(Math.random() * pool.length)];
    if (active) void emitLibraryEvent('drill_next_question', 'retention', { question_id: nextQuestion.id });
    if (active) trackMove(ENGAGEMENT_APP_ID, 'next_case_button', { mode: ENGAGEMENT_MODE, properties: { from_item_id: active.id, to_item_id: nextQuestion.id } });
    openQuestion(nextQuestion, Boolean(active));
  };

  const submit = async () => {
    if (!active || grading) return;
    if (active.skill === 'market-sizing' && Object.keys(marketSizingCalculation.errors).length > 0) {
      setValidationError('Fix the invalid Component values before submitting.');
      return;
    }
    const simpleNumeric = active.skill !== 'market-sizing'
      && active.skill !== 'calculations'
      && (active.answerMode === 'number' || active.answerMode === 'percentage' || active.answerMode === 'currency');
    const normalizedNumeric = simpleNumeric && active.numericAnswer != null
      ? gradeNumericQuantity(answer, active.numericAnswer, active.answerUnit, active.numericTolerance ?? 0)
      : null;
    if (normalizedNumeric && (!normalizedNumeric.ok || normalizedNumeric.value === null)) {
      setValidationError(normalizedNumeric.message || `Enter one value in ${active.answerUnit || 'the requested unit'}.`);
      return;
    }
    const normalizedAnswerText = normalizedNumeric?.value != null
      ? `${formatCanonicalNumber(normalizedNumeric.value)}${active.answerUnit ? ` ${active.answerUnit}` : ''}`
      : answer.trim();
    const candidateAnswer = active.skill === 'market-sizing'
      ? marketSizingGradableText(marketSizingDraft, active.answerUnit)
      : active.skill === 'calculations'
        ? serializeCalculationAnswer(calculationAnswer, { includeCaveat: !isEasyCalculation(active.skill, active.difficulty) })
        : (active.answerMode === 'choice' || active.answerMode === 'multiple-choice')
          ? selectedOption
          : [normalizedAnswerText ? `Final answer: ${normalizedAnswerText}` : '', working.trim()].filter(Boolean).join('\n\n');
    setValidationError('');
    setGrading(true);
    try {
      const answerSnapshot: DrillLibraryAnswerSnapshot = {
        schemaVersion: 2,
        kind: active.skill === 'market-sizing'
          ? 'market-sizing'
          : active.skill === 'calculations'
            ? 'calculation'
            : (active.answerMode === 'choice' || active.answerMode === 'multiple-choice')
              ? 'choice'
              : 'text',
        candidateAnswer,
        selectedOption,
        answer,
        working,
        calculationAnswer,
        marketSizingDraft,
      };
      const calculationScoring = active.skill === 'calculations' ? scoreLibraryCalculation(active, calculationAnswer) : null;
      // MCQs and direct numeric answers are exact/tolerance checks. They must
      // never depend on an LLM interpretation or disagree with the visible key.
      const isChoiceQuestion = active.answerMode === 'choice' || active.answerMode === 'multiple-choice';
      const localObjectiveCorrect = isChoiceQuestion
        ? sameUnitText(selectedOption, active.correctAnswer)
        : simpleNumeric && normalizedNumeric
          ? normalizedNumeric.correct
          : null;
      const localObjectiveScoring = localObjectiveCorrect === null
        ? null
        : objectiveScoreResult(localObjectiveCorrect, isChoiceQuestion ? selectedOption : normalizedAnswerText, active.correctAnswer);
      // While the bundle still ships keys, a server verdict that disagrees with it is logged server-side and the bundled result is kept.
      const serverObjective = !calculationScoring && localObjectiveCorrect !== null
        ? await gradeObjectiveOnServer({
            question: active,
            sessionId,
            mode: isChoiceQuestion ? 'choice' : 'numeric',
            selectedOption,
            answer,
            evidence: normalizedAnswerText,
            localCorrect: localObjectiveCorrect,
          })
        : null;
      const objectiveScoring = serverObjective && serverObjective.correct === localObjectiveCorrect
        ? serverObjective.scoring
        : localObjectiveScoring;
      const scoring = calculationScoring || objectiveScoring || await gradeCaseExercise({
        exerciseType: active.skill === 'calculations'
          ? (isEasyCalculation(active.skill, active.difficulty) ? 'calculations_easy' : 'calculations_cycle_1')
          : active.marketSizingFormat === 'provided-data'
            ? 'market_sizing_provided'
            : active.marketSizingFormat === 'ambiguous-estimation'
              ? 'market_sizing_ambiguous'
              : active.skill,
        title: active.title,
        question: active.question,
        caseContext: active.businessContext || active.instruction || '',
        exhibits: JSON.stringify(active.exhibits?.length ? active.exhibits : active.exhibit ? [active.exhibit] : []),
        referenceAnswer: workedAnswerReferenceText(libraryWorkedAnswerFor(active)) || undefined,
        answer: candidateAnswer,
        calculationSubmission: active.skill === 'calculations' ? calculationAnswer : undefined,
      });
      if (!scoring || !Number.isFinite(Number(scoring.overallScore)) || !Array.isArray(scoring.criteria) || scoring.criteria.length === 0) {
        throw new Error('Mate returned incomplete feedback, so nothing was saved. Please try again.');
      }
      const completedOn = new Date().toISOString();
      const db = (window as any).__workspaceDb;
      if (!db?.from || !sessionId) throw new Error('Mate graded your answer, but your saved progress is unavailable. Please sign in and try again.');
      const persisted = await db
        .from('drill_library_attempts')
        .eq('session_id', sessionId)
        .eq('question_id', active.id)
        .limit(1)
        .get();
      const currentRow = Array.isArray(persisted?.data) ? persisted.data[0] : null;
      const previousScoring = parseSavedObject<HonestScoreResult>(currentRow?.scoring_json);
      const previousSnapshot = parseSavedObject<DrillLibraryAnswerSnapshot>(currentRow?.answer_json);
      const previousAttempts = normalizeAttemptHistory([
        ...(currentRow?.status === 'completed' && previousScoring ? [{ score: Number(currentRow.score), scale: scoringScale(previousScoring), completedOn: currentRow.completed_on }] : []),
        ...(previousSnapshot?.previousAttempts || []),
      ]);
      answerSnapshot.previousAttempts = previousAttempts;
      const savedValues = {
        question_id: active.id,
        skill: active.skill,
        difficulty: active.difficulty,
        answer_json: answerSnapshot,
        score: Math.round(Number(scoring.overallScore)),
        scoring_json: scoring,
        status: 'completed',
        completed_on: completedOn,
        updated_at: completedOn,
      };
      if (currentRow?.id) {
        await db.from('drill_library_attempts').update(currentRow.id, savedValues);
      } else {
        await db.from('drill_library_attempts').insert({
          session_id: sessionId,
          question_id: active.id,
          skill: active.skill,
          difficulty: active.difficulty,
          answer_json: answerSnapshot,
          score: Math.round(Number(scoring.overallScore)),
          scoring_json: scoring,
          status: 'completed',
          completed_on: completedOn,
          created_at: completedOn,
          updated_at: completedOn,
        });
      }
      setScoreResult(scoring);
      setShownCompletedOn(completedOn);
      setAttemptHistory(previousAttempts);
      refreshAttempts();
      if (!submittedAttemptRef.current) {
        submittedAttemptRef.current = true;
        void emitLibraryEvent('drill_answer_submitted', 'core_action', {
          question_id: active.id,
          skill: active.skill,
          difficulty: active.difficulty,
          answer_mode: active.answerMode,
        }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
      }
      trackAnswer(active.id, scoring);
      try { localStorage.setItem(`casemate-expert-completed:${active.id}`, completedOn); } catch { /* Best-effort completion filter. */ }
      setCompletionVersion((version) => version + 1);
      setSubmitted(true);
    } catch (gradeError) {
      setValidationError(gradeError instanceof Error ? gradeError.message : 'Mate could not grade this answer. Your work is unchanged; please try again.');
      trackLibraryError('answer', gradeError, active.id);
    } finally {
      setGrading(false);
    }
  };

  useEffect(() => {
    if (!submitted || !active || explanationViewedRef.current) return;
    explanationViewedRef.current = true;
    void emitLibraryEvent('drill_explanation_viewed', 'diagnostic', {
      question_id: active.id,
      skill: active.skill,
      difficulty: active.difficulty,
    });
  }, [submitted, active, emitLibraryEvent]);

  const hasUnfinishedAnswer = Boolean(
    !submitted && active && (
      selectedOption.trim() || answer.trim() || working.trim() || calculationAnswer.caveat.trim()
      || calculationAnswer.finalAnswers.some((item) => item.value.trim())
      || calculationAnswer.formulaRows.some((row) => row.numbers.some((item) => item.value.trim() || item.label.trim()))
      || marketSizingDraft.manualResult?.trim()
      || marketSizingDraft.components.some((component: any) => String(component?.value ?? '').trim())
    )
  );
  const backToLibrary = () => {
    if (hasUnfinishedAnswer && !window.confirm('Back to the Question Library? Your unfinished answer on this question will be discarded.')) return;
    setConfirmRedo(false);
    setActive(null);
  };

  const compactSingleChart = Boolean(active && isCompactSingleChart(active));
  // Medium and Hard solve screens also hide the app's intro line on laptops so the question and exhibits fit one screen.
  const compactHeader = compactSingleChart || Boolean(active && displayDifficultyOf(active) !== 'easy');
  useEffect(() => {
    onCompactLayoutChange?.(compactHeader);
    return () => onCompactLayoutChange?.(false);
  }, [compactHeader, onCompactLayoutChange]);

  if (active?.sourceCaseId?.startsWith('CM-CRE-')) {
    return (
      <CaseReadingProvider itemId={active.id}>
      <CreativityCaseExperience
        question={active}
        onBack={backToLibrary}
        hideEvidenceColumn
        onSubmitted={() => { setCompletionVersion((version) => version + 1); refreshAttempts(); }}
        onAnswerInput={() => trackSolving('answer_typed')}
        onGraded={(scoring) => trackAnswer(active.id, scoring)}
        onGradeError={(error) => trackLibraryError('answer', error, active.id)}
      />
      </CaseReadingProvider>
    );
  }

  if (active?.sourceCaseId?.startsWith('CM-CALC-')) {
    return (
      <CaseReadingProvider itemId={active.id}>
      <CalculationCaseExperience
        question={active}
        onBack={backToLibrary}
        onAnswerInput={() => trackSolving('answer_typed')}
        hideEvidenceColumn
        onSubmitted={() => {
          setCompletionVersion((version) => version + 1);
          refreshAttempts();
          void emitLibraryEvent('drill_answer_submitted', 'core_action', { question_id: active.id, skill: active.skill, difficulty: active.difficulty, answer_mode: 'calculation-cycle-1' }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
          trackAnswer(active.id);
        }}
      />
      </CaseReadingProvider>
    );
  }

  if (active?.skill === 'structures') {
    return (
      <CaseReadingProvider itemId={active.id}>
      <div className="mt-5" data-testid="question-library-active-structures" onInputCapture={(event) => { if (!(event.target as HTMLElement).closest('[data-testid="structures-library"]')) trackSolving('answer_typed'); }}>
        <button type="button" onClick={backToLibrary} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${tw.button.secondary}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to Structures Library
        </button>
        <StructuresWorkspace
          initialCaseId={active.id}
          onBackToLibrary={() => setActive(null)}
          hideEvidenceColumn
          onCaseSelected={(item) => trackChooseCase(item)}
          onGraded={(caseId, scoring) => trackAnswer(caseId, scoring)}
          onGradeError={(error) => trackLibraryError('answer', error, trackedItemId)}
          onSubmitted={() => {
            try { localStorage.setItem(`casemate-expert-completed:${active.id}`, new Date().toISOString()); } catch { /* Best-effort completion filter. */ }
            setCompletionVersion((version) => version + 1);
            if (!submittedAttemptRef.current) {
              submittedAttemptRef.current = true;
              void emitLibraryEvent('drill_answer_submitted', 'core_action', {
                question_id: active.id,
                skill: active.skill,
                difficulty: active.difficulty,
                answer_mode: 'issue-tree',
              }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
            }
          }}
        />
      </div>
      </CaseReadingProvider>
    );
  }

  if (active?.structuredAnswer && active.skill !== 'market-sizing') {
    return (
      <CaseReadingProvider itemId={active.id}>
      <ExpertDrillExperience
        question={active}
        onBack={backToLibrary}
        hideEvidenceColumn
        onAnswerInput={() => trackSolving('answer_typed')}
        onGraded={(scoring) => trackAnswer(active.id, scoring)}
        onGradeError={(error) => trackLibraryError('answer', error, active.id)}
        onSubmitted={() => {
          setCompletionVersion((version) => version + 1);
          refreshAttempts();
          void emitLibraryEvent('drill_answer_submitted', 'core_action', { question_id: active.id, skill: active.skill, difficulty: active.difficulty, answer_mode: 'structured-expert' }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
        }}
      />
      </CaseReadingProvider>
    );
  }

  if (active) {
    const isCaseCoachLayout = active.skill === 'charts' || active.skill === 'calculations';
    const isMarketSizing = active.skill === 'market-sizing';
    const capitaliseLineStarts = (value: string) => capitaliseWithNumbers(value, isMarketSizing);
    const activeExhibits = active.exhibits?.length ? active.exhibits : active.exhibit ? [active.exhibit] : [];
    const presented = presentLibraryQuestion({ businessContext: active.businessContext, instruction: active.instruction, question: active.question }, { hasExhibits: activeExhibits.length > 0 });
    const isNumericMode = active.answerMode === 'number' || active.answerMode === 'percentage' || active.answerMode === 'currency';
    const answerUnitLabel = clarifyUnitLabel(active.answerUnit);
    const scaleHint = equivalentScaleHint(answerUnitLabel);
    const easyCalculation = isEasyCalculation(active.skill, active.difficulty);
    // Easy Calculations never show Commercial interpretation; saved attempts keep the stored row but it is hidden and the total is recomputed.
    const shownScore = scoreResult && easyCalculation ? normalizeEasyCalculationScoring(scoreResult) : scoreResult;
    const visibleScoreCriteria = shownScore?.criteria.filter((criterion) => !isMarketSizing || !['scope', 'assumptions', 'reasonableness', 'interpretation_check', 'assumption_rationale'].includes(criterion.key)) || [];
    const visibleOverallScore = isMarketSizing && shownScore ? deriveOverallScore(visibleScoreCriteria) : shownScore?.overallScore || 0;
    const visibleScoreBand = scoreBand(visibleOverallScore, scoreResult ? scoringScale(scoreResult) : 10);
    const rankedCriteria = visibleScoreCriteria.slice().sort((a, b) => a.score - b.score || b.weight - a.weight);
    const feedbackPriorities = buildFeedbackPriorities({
      evidenceToRevisit: shownScore?.evidenceToRevisit || [],
      nextStep: shownScore?.nextStep,
      furtherImprovements: shownScore?.furtherImprovements || [],
      fallbackActions: rankedCriteria.map((item) => ({ action: item.strongerAnswer, why: item.reason })),
    });
    const submittedAnswerText = (active.answerMode === 'choice' || active.answerMode === 'multiple-choice')
      ? selectedOption
      : [answer.trim() ? `Final answer: ${answer.trim()}` : '', working.trim()].filter(Boolean).join('\n\n');
    const isChoiceQuestion = active.answerMode === 'choice' || active.answerMode === 'multiple-choice';
    const objectiveResult = scoreResult?.rubricId === 'objective-exact-v1';
    const learnerAnswered = isMarketSizing
      ? marketSizingDraft.components.some((component: any) => String(component?.value ?? '').trim()) || Boolean(marketSizingDraft.manualResult?.trim())
      : active.skill === 'calculations'
        ? calculationAnswer.finalAnswers.some((item) => item.value.trim()) || calculationAnswer.formulaRows.some((row) => row.numbers.some((slot) => slot.value.trim()))
        : hasLearnerResponse(submittedAnswerText);
    const resultScale = scoreResult ? scoringScale(scoreResult) : 10;
    const outcome = resultOutcome(visibleOverallScore, resultScale, { objective: objectiveResult, answered: learnerAnswered });
    const evidence = libraryQuestionEvidence(active);
    const workedAnswer = submitted && scoreResult ? libraryWorkedAnswerFor(active) : null;
    const sizingModel = isMarketSizing ? marketSizingWorkedModelForQuestion(active) : null;
    const sizingLearnerResult = marketSizingCalculation.result ?? parseComponentValue({ label: '', value: marketSizingDraft.manualResult || '', unit: 'number' });
    const focus = feedbackPriorities.nextStep?.action || '';
    const resultFeedback = objectiveResult && !evidence.trustworthy
      ? { worked: [], failed: [`${evidence.reason} This question (${active.id}) is flagged for content review, so treat this mark with caution.`] }
      : objectiveResult
        ? isChoiceQuestion
          ? choiceFeedback(selectedOption, active.correctAnswer, outcome === 'correct')
          : numericFeedback(answer.trim() ? `${answer.trim()}${answerUnitLabel && !answer.toLowerCase().includes(answerUnitLabel.toLowerCase()) ? ` ${answerUnitLabel}` : ''}` : '', active.correctAnswer, outcome === 'correct')
        : buildReasoningFeedback({ criteria: visibleScoreCriteria, evidenceToRevisit: shownScore?.evidenceToRevisit || [], exclude: focus ? [focus] : [] });
    const selectedOptionIndex = (active.options || []).findIndex((option) => sameUnitText(option, selectedOption));
    const learnerResponseText = !learnerAnswered
      ? ''
      : isChoiceQuestion && selectedOptionIndex >= 0
        ? `${String.fromCharCode(65 + selectedOptionIndex)}. ${selectedOption}`
        : submittedAnswerText;
    const relatedQuestion = (active.recommendedNextDrillId ? ALL_LIBRARY_QUESTIONS.find((question) => question.id === active.recommendedNextDrillId) : null)
      || visibleQuestions.find((question) => question.id !== active.id && displayDifficultyOf(question) === displayDifficultyOf(active) && !isCompleted(question.id))
      || visibleQuestions.find((question) => question.id !== active.id && !isCompleted(question.id))
      || null;
    const fullCase = sourceFullCase(active.source_case_id);
    const retry = retryAction(redoAttempt, { focus });
    const nextAction = chooseNextAction(outcome, {
      'next-question': relatedQuestion ? { kind: 'next-question', label: 'Next related question', detail: `Practise the same skill on “${relatedQuestion.title}”.`, onSelect: () => { if (relatedQuestion.skill !== skill) setSkill(relatedQuestion.skill); openQuestion(relatedQuestion, true); } } : null,
      'full-case': fullCase ? { kind: 'full-case', label: 'Solve the full case', detail: `Take this drill into its full case: ${fullCase.title}. Your drill result stays saved.`, onSelect: () => openCasePoolCase(fullCase.id) } : null,
    }, { objective: objectiveResult });
    const questionNoteLines = [...presented.guidance, ...presented.answerFormat.map((line) => `Answer format: ${line}`)];
    const questionNote = presented.instruction || questionNoteLines.length ? (
      <>
        {presented.instruction ? <p className="font-semibold text-[var(--space-text-brand)]">{capitaliseLineStarts(presented.instruction)}</p> : null}
        {questionNoteLines.map((line) => <p key={line} className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{capitaliseLineStarts(line)}</p>)}
      </>
    ) : null;
    const contextExtra = presented.keyTerms.length || presented.skillLabels.length ? (
      <>
        {presented.keyTerms.length ? <p className="text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="question-library-key-terms"><span className="font-bold text-[var(--space-text-primary)]">Key terms:</span> {presented.keyTerms.map(capitaliseLineStarts).join(' ')}</p> : null}
        {presented.skillLabels.length ? <p className="mt-1 text-[11px] font-medium text-[var(--space-text-muted)]" data-testid="question-library-skill-label">Skill focus: {presented.skillLabels.join('; ')}</p> : null}
      </>
    ) : null;
    // Medium and Hard items use the compare layout and the question/context split; Easy keeps its layout.
    const denseLayout = displayDifficultyOf(active) !== 'easy' && !compactSingleChart;
    const questionFirstSection = (
      <section className={`rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-sm ${compactSingleChart ? 'p-3' : 'mt-3 p-4 sm:p-5'}`} data-testid="question-library-question-first">
        <h2 className={compactSingleChart ? 'break-words text-lg font-bold leading-6 text-[var(--space-text-primary)]' : 'break-words text-xl font-bold leading-7 text-[var(--space-text-primary)] sm:text-2xl'}>{capitaliseLineStarts(active.title)}</h2>
        <CaseQuestionFirst
          itemId={active.id}
          compact={compactSingleChart}
          layout={denseLayout ? 'split' : 'stacked'}
          bare
          className={compactSingleChart ? 'mt-1.5' : 'mt-2'}
          question={<span data-testid="question-library-task">{capitaliseLineStarts(presented.task)}</span>}
          questionNote={questionNote}
          context={presented.context ? capitaliseLineStarts(presented.context) : ''}
          contextExtra={contextExtra}
        />
      </section>
    );
    const exhibitNode = activeExhibits.length ? <div className={compactSingleChart ? undefined : 'mt-4'}><ExhibitRenderer exhibits={activeExhibits} compact={compactSingleChart} layout={denseLayout ? 'compare' : 'grid'} guide={presented.exhibitGuide.map(capitaliseLineStarts)} />{denseLayout && !submitted ? <GoToAnswerBar /> : null}</div> : null;
    const answerInColumn = compactSingleChart && !submitted && isChoiceQuestion && !isMarketSizing && active.skill !== 'calculations';

    return (
      <CaseReadingProvider itemId={active.id}>
      <div className={compactSingleChart ? 'mt-1' : 'mt-5'} data-testid={`question-library-active-${active.skill}`}>
        <div className={compactSingleChart ? 'flex flex-wrap items-center gap-x-3 gap-y-1' : undefined}>
        <button type="button" onClick={backToLibrary} className={`inline-flex items-center gap-1.5 rounded-xl text-xs font-semibold ${compactSingleChart ? 'px-2.5 py-1.5' : 'px-3 py-2'} ${tw.button.secondary}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to Question Library
        </button>

        <div className={`${compactSingleChart ? '' : 'mt-4 '}flex flex-wrap items-center gap-2`}>
          <CaseIdentityChips identity={drillIdentity(active)} testId="question-library-identity" />
          {active.marketSizingBank?.geography ? (
            <span className="inline-flex min-w-0 max-w-full rounded-full border border-dashed border-[var(--space-border-default)] px-2.5 py-0.5 text-[11px] font-semibold leading-4 text-[var(--space-text-muted)]" title={`Geography: ${active.marketSizingBank.geography}`} data-testid="market-sizing-bank-geography">
              <span className="min-w-0 break-words"><span className="sr-only">Geography: </span>{active.marketSizingBank.geography}</span>
            </span>
          ) : null}
          <span className="text-xs font-medium text-[var(--space-text-muted)]">{questionCountFor(active.skill)} practice questions available</span>
          {active.estimatedMinutes ? <span className="text-xs font-medium text-[var(--space-text-muted)]">· {active.estimatedMinutes} Min</span> : null}
        </div>
        </div>

        <div className={compactSingleChart ? 'mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start' : undefined} data-testid={compactSingleChart ? 'question-library-compact-layout' : undefined}>
        {compactSingleChart ? (
          <>
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">{questionFirstSection}</div>
            <div className={`min-w-0 lg:col-start-1 lg:row-start-1 ${answerInColumn ? 'lg:row-span-2' : ''}`}>{exhibitNode}</div>
          </>
        ) : (
          <>
            {questionFirstSection}
            {exhibitNode}
          </>
        )}

        {!submitted ? (
          <section id={ANSWER_ANCHOR_ID} className={`scroll-mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${answerInColumn ? 'min-w-0 p-3 shadow-sm lg:col-start-2 lg:row-start-2' : `${compactSingleChart ? 'min-w-0 lg:col-span-2' : 'mt-4'} ${isCaseCoachLayout ? 'p-5 shadow-sm sm:p-7' : 'p-4 sm:p-5'}`}`} data-testid="question-library-answer-area">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">Your Answer</p>
              {denseLayout ? <BackToExhibitsButton /> : null}
            </div>

            {isMarketSizing ? (
              <div className="mt-4">
                <MarketSizingAnswerBuilder value={marketSizingDraft} onChange={(next) => { setMarketSizingDraft(next); setValidationError(''); trackSolving('answer_typed'); }} answerUnit={active.answerUnit} disabled={grading} rootText={presented.rootQuestion} />
              </div>
            ) : (active.answerMode === 'choice' || active.answerMode === 'multiple-choice') && active.skill !== 'calculations' ? (
              <div className={answerInColumn ? 'mt-2 grid gap-2' : 'mt-3 grid gap-2.5'}>
                {(active.options || []).map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { setSelectedOption(option); setValidationError(''); trackSolving('answer_typed'); }}
                    className={`flex items-start gap-3 rounded-xl border ${answerInColumn ? 'px-3 py-2' : 'px-4 py-3.5'} text-left transition-colors ${selectedOption === option ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-border-strong)]'}`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${selectedOption === option ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm font-medium leading-6 text-[var(--space-text-primary)]">{capitaliseLineStarts(option)}</span>
                  </button>
                ))}
              </div>
            ) : active.skill === 'calculations' ? (
              <CalculationAnswerBuilder
                value={calculationAnswer}
                onChange={(next) => { setCalculationAnswer(next); setValidationError(''); trackSolving('answer_typed'); }}
                disabled={grading}
                showCaveat={!easyCalculation}
              />
            ) : (
              <div className="mt-3">
                {isNumericMode ? (
                  <div>
                    <div className="flex overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] focus-within:border-[var(--space-brand-primary-600)]">
                      <FormattedNumberInput
                        inputMode="decimal"
                        value={answer}
                        onValueChange={(next) => { setAnswer(next); setValidationError(''); trackSolving('answer_typed'); }}
                        group={active.answerMode !== 'percentage'}
                        placeholder={active.answerMode === 'percentage' ? 'e.g. 25 or 25%' : 'e.g. 127.2'}
                        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base font-semibold tabular-nums text-[var(--space-text-primary)] outline-none"
                      />
                      {answerUnitLabel ? <span className="flex max-w-44 items-center border-l border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 text-xs font-bold text-[var(--space-text-muted)]" data-testid="question-library-answer-unit">{answerUnitLabel}</span> : null}
                    </div>
                    {scaleHint ? <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid="question-library-scale-hint">{scaleHint}</p> : null}
                    {active.numericAnswer != null && answerUnitLabel ? <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]">{toleranceRuleText(active.numericTolerance ?? 0, answerUnitLabel, (active.numericTolerance ?? 0) === 0)}</p> : null}
                  </div>
                ) : null}
                <textarea
                  value={working}
                  onChange={(event) => { setWorking(event.target.value); setValidationError(''); trackSolving('answer_typed'); }}
                  rows={4}
                  placeholder={capitaliseLineStarts(active.workingPrompt || 'Write Your Answer In Clear, Structured Lines.')}
                  className={`${tw.input.base} ${tw.input.default} ${isNumericMode ? 'mt-3' : ''} min-h-24 text-sm leading-6`}
                />
              </div>
            )}

            {validationError ? <p className="mt-3 text-sm font-medium text-[var(--space-semantic-danger)]">{validationError}</p> : null}
            <button type="button" onClick={() => void submit()} disabled={grading} className={`${answerInColumn ? 'mt-3 py-2.5' : 'mt-4 py-3.5'} flex w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold ${tw.button.primary} ${grading ? tw.button.disabled : ''}`} data-testid="button-submit-library-answer">
              <Check className="h-4 w-4" />
              {grading ? 'Mate is grading…' : 'Submit for feedback'}
            </button>
          </section>
        ) : scoreResult ? (
          <div className={compactSingleChart ? 'min-w-0 lg:col-span-2' : undefined}>
          <CaseResultView
            score={visibleOverallScore}
            scale={resultScale}
            outcome={outcome}
            objective={objectiveResult}
            completedOn={shownCompletedOn}
            feedback={resultFeedback}
            criteria={objectiveResult ? [] : visibleScoreCriteria}
            learnerResponse={learnerAnswered && active.skill === 'calculations' ? (
              <>
                <CalculationResultSummaryView value={calculationAnswer} />
                {!easyCalculation && calculationAnswer.caveat.trim() ? <p className="mt-3 text-xs leading-5 text-[var(--space-text-muted)]"><span className="font-bold">Key caveat or assumption:</span> {calculationAnswer.caveat}</p> : null}
              </>
            ) : learnerAnswered && isMarketSizing ? <MarketSizingAttemptSummary value={marketSizingDraft} answerUnit={active.answerUnit} /> : undefined}
            learnerResponseText={learnerResponseText}
            workedAnswer={workedAnswer}
            workedAnswerBody={workedAnswer && sizingModel ? <MarketSizingWorkedAnswer model={sizingModel} /> : undefined}
            extras={sizingModel ? <MarketSizingAttemptFeedback model={sizingModel} components={marketSizingDraft.components} result={sizingLearnerResult} /> : undefined}
            layout={sizingModel ? 'stacked' : undefined}
            unavailableReason={evidence.trustworthy ? undefined : `${evidence.reason} (Question ${active.id}.)`}
            retry={retry}
            nextAction={nextAction}
            history={attemptHistory}
            format={capitaliseLineStarts}
            testId="question-library-result"
          />
          </div>
        ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
          <button type="button" onClick={backToLibrary} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`} data-testid="button-back-case-library">
            <ArrowLeft className="h-4 w-4" /> Back to case library
          </button>
        </div>
        {!compactSingleChart ? <BackToQuestionButton /> : null}
      </div>
      </CaseReadingProvider>
    );
  }

  return (
    <div className="mt-5" data-testid="question-library-home">
      {attemptsError ? (
        <div className="mb-4 rounded-xl border border-[var(--space-semantic-warning)] bg-[var(--space-surface-card)] p-4 text-sm text-[var(--space-text-secondary)]" data-testid="question-library-attempts-error">
          <p className="font-bold text-[var(--space-text-primary)]">Saved feedback could not be loaded</p>
          <p className="mt-1 text-xs leading-5">You can still use the library; completion markers on this device remain available. Try loading your saved feedback again.</p>
          <button type="button" onClick={refreshAttempts} className={`mt-2 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.secondary}`}>Try again</button>
        </div>
      ) : !attemptsLoading && attemptRows.length === 0 ? (
        <div className="mb-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]" data-testid="question-library-attempts-empty">
          No saved Question Library feedback yet. Your first successfully graded answer will appear here permanently.
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
        <div className="px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
              <Sparkles className="h-5 w-5 text-[var(--space-text-brand)]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--space-text-primary)]">Question Library</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Choose one of five consulting skills. Alongside the standalone question bank, {CASE_JOURNEYS.length} Case Journeys run one business decision across linked drills - diagnosis, then implication, then a defensible recommendation. Open any journey drill or practise any standalone drill on its own.</p>
              {answerKeySyncStatus ? <p className="mt-2 text-[11px] font-medium text-[var(--space-text-muted)]" data-testid="question-library-answer-key-sync">{answerKeySyncStatus}</p> : null}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-[var(--space-border-default)] sm:grid-cols-5" role="tablist" aria-label="Question Library Skills">
          {SKILL_META.map((item) => {
            const Icon = SKILL_ICONS[item.id];
            const selected = skill === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => switchSkill(item.id)}
                className={`flex min-h-24 flex-col items-center justify-center gap-1.5 border-b border-r border-[var(--space-border-default)] px-2 py-3 text-center transition-colors sm:border-b-0 ${selected ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'}`}
                data-testid={`tab-library-${item.id}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-bold">{capitaliseLineStarts(item.shortLabel)}</span>
                <span className={`text-[10px] font-semibold ${selected ? 'opacity-80' : 'text-[var(--space-text-muted)]'}`}>Questions: {questionCountFor(item.id)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--space-text-primary)]">{capitaliseLineStarts(skillMeta.label)}</h3>
            <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{capitaliseLineStarts(skillMeta.description)}</p>
          </div>
          <button type="button" onClick={randomQuestion} disabled={attemptsLoading} className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary} ${attemptsLoading ? tw.button.disabled : ''}`}>
            <Shuffle className="h-4 w-4" />
            Random Question
          </button>
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Questions By Topic Or Scenario"
            className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
          />
        </div>

        {skill === 'creativity' ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2" data-testid="creativity-category-selector">
            {(Object.keys(CREATIVITY_CATEGORY_LABELS) as CreativityCategory[]).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCreativityCategory(category)}
                className={`rounded-xl border p-3 text-left transition-colors ${creativityCategory === category ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-border-strong)]'}`}
                data-testid={`filter-creativity-${category}`}
              >
                <span className="block text-xs font-bold text-[var(--space-text-primary)]">{CREATIVITY_CATEGORY_LABELS[category]}</span>
                <span className="mt-1 block text-[11px] leading-4 text-[var(--space-text-muted)]">{CREATIVITY_CATEGORY_DESCRIPTIONS[category]}</span>
              </button>
            ))}
            <button type="button" onClick={() => setCreativityCategory('all')} className={`rounded-xl border p-3 text-left text-xs font-bold transition-colors ${creativityCategory === 'all' ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}>All four problem types</button>
          </div>
        ) : (
          <>
            {skill === 'market-sizing' ? (
              <div className="mt-4 grid gap-2 sm:grid-cols-2" data-testid="market-sizing-format-selector">
                {(Object.keys(MARKET_SIZING_FORMAT_LABELS) as MarketSizingFormat[]).map((format) => (
                  <button key={format} type="button" onClick={() => setMarketSizingFormat(format)} className={`rounded-xl border p-3 text-left transition-colors ${marketSizingFormat === format ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-border-strong)]'}`} data-testid={`filter-market-sizing-${format}`}>
                    <span className="block text-xs font-bold text-[var(--space-text-primary)]">{MARKET_SIZING_FORMAT_LABELS[format]}</span>
                    <span className="mt-1 block text-[11px] leading-4 text-[var(--space-text-muted)]">{MARKET_SIZING_FORMAT_DESCRIPTIONS[format]}</span>
                  </button>
                ))}
                <button type="button" onClick={() => setMarketSizingFormat('all')} className={`rounded-xl border p-3 text-left text-xs font-bold transition-colors ${marketSizingFormat === 'all' ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}>Both formats</button>
              </div>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
            {(['all', ...difficultyFilterLevelsFor(skill)] as Array<LibraryDifficulty | 'all'>).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${difficulty === level ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'}`}
              >
                {level === 'all' ? 'All Difficulties' : DIFFICULTY_LABELS[level]}
              </button>
            ))}
            </div>
          </>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--space-text-muted)]">Advanced Filters · {skill === 'creativity' ? (creativityCategory === 'all' ? 'All problem types' : CREATIVITY_CATEGORY_LABELS[creativityCategory]) : difficulty === 'all' ? 'All Difficulties' : DIFFICULTY_LABELS[difficulty]}</p>
          <button type="button" onClick={clearFilters} className="text-xs font-bold text-[var(--space-text-brand)] hover:underline">Clear Filters</button>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <select value={drillType} onChange={(event) => setDrillType(event.target.value)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by exercise type"><option value="all">All Exercise Types</option>{filterOptions.drillTypes.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={industry} onChange={(event) => setIndustry(event.target.value)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by industry"><option value="all">All Industries</option>{filterOptions.industries.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={businessProblem} onChange={(event) => setBusinessProblem(event.target.value)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by business problem"><option value="all">All Business Problems</option>{filterOptions.businessProblems.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={estimatedTime} onChange={(event) => setEstimatedTime(event.target.value as typeof estimatedTime)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by estimated time"><option value="all">Any Estimated Time</option><option value="under-10">Under 10 Minutes</option><option value="10-plus">10–12 Minutes</option></select>
          <select value={completion} onChange={(event) => setCompletion(event.target.value as typeof completion)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by completion"><option value="all">Completed Or Not</option><option value="completed">Completed</option><option value="not-completed">Not Completed</option></select>
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><input type="checkbox" checked={recommendedOnly} onChange={(event) => setRecommendedOnly(event.target.checked)} className="h-4 w-4 accent-[var(--space-brand-primary-600)]" /> Recommended For Me</label>
        </div>
        <p className="mt-3 text-xs font-medium text-[var(--space-text-muted)]">Questions Matching Your Filters: {matches.length}.</p>
      </section>

      <section className="mt-4">
        {attemptsLoading ? (
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-7 text-center" aria-busy="true" data-testid="question-library-attempts-loading">
            <p className="text-sm font-bold text-[var(--space-text-primary)]">Loading your saved feedback…</p>
            <p className="mt-1 text-xs text-[var(--space-text-muted)]">Checking completed questions before opening the library.</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-7 text-center" data-testid="question-library-empty-state">
            <p className="text-sm font-bold text-[var(--space-text-primary)]">No Drills Match These Filters</p>
            <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Clear the search and advanced filters to see {skill === 'creativity' ? 'the four Creativity problem types' : difficulty === 'all' ? 'this skill’s drills' : `${DIFFICULTY_LABELS[difficulty]} drills`} again.</p>
            <button type="button" onClick={clearFilters} className={`mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold ${tw.button.primary}`} data-testid="button-clear-library-filters">Clear Filters</button>
          </div>
        ) : (
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {matches.slice(0, visibleCount).map((question) => (
              <li key={question.id}>
                <button
                  type="button"
                  onClick={() => openQuestion(question)}
                  className="group flex h-full w-full items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left transition-all hover:border-[var(--space-brand-primary-600)] hover:shadow-md"
                  data-testid={`library-question-${question.id}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]"><Target className="h-4 w-4" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-5 text-[var(--space-text-primary)]">{capitaliseLineStarts(question.title, question.skill === 'market-sizing')}</span>
                    <span className="mt-1.5 block line-clamp-2 text-xs leading-5 text-[var(--space-text-muted)]">{capitaliseLineStarts(question.question, question.skill === 'market-sizing')}</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      <CaseIdentityChips identity={drillIdentity(question)} inline />
                      {question.structuredAnswer ? <><span className="inline-flex rounded-full border border-[var(--space-border-default)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">{question.difficulty === 'hard' ? '2 connected exhibits' : '2–3 connected exhibits'}</span><span className="inline-flex rounded-full border border-[var(--space-border-default)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">Insight + implication</span></> : null}
                      {attemptByQuestion.get(question.id) ? (
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${scoreBand(listScore(question), scoringScale(parseSavedObject<HonestScoreResult>(attemptByQuestion.get(question.id)?.scoring_json))).badgeClassName}`} data-testid={`library-question-completed-${question.id}`}>
                          Completed · {listScore(question)}/{scoringScale(parseSavedObject<HonestScoreResult>(attemptByQuestion.get(question.id)?.scoring_json))} · {scoreBand(listScore(question), scoringScale(parseSavedObject<HonestScoreResult>(attemptByQuestion.get(question.id)?.scoring_json))).label}{formatCompletedDate(attemptByQuestion.get(question.id)?.completed_on) ? ` · ${formatCompletedDate(attemptByQuestion.get(question.id)?.completed_on)}` : ''}
                        </span>
                      ) : isQuestionCompleted(question.id) ? <span className="inline-flex rounded-full bg-[var(--space-semantic-success-100)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-neutral-800)]" title="This completion marker is stored only in this browser; no saved feedback is available to reopen.">Completed locally</span> : null}
                    </span>
                  </span>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[var(--space-text-muted)] transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {matches.length > visibleCount ? (
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className={`mt-3 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}>
            Show {Math.min(PAGE_SIZE, matches.length - visibleCount)} More Questions
          </button>
        ) : null}
      </section>
    </div>
  );
}
