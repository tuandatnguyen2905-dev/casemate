// Casemate "Case Drill" - rapid micro-drills (v1).
//
// Where Case Pool (apps/CaseDrillLog) runs FULL cases end-to-end, this app is
// the CaseCoach-style rep room: the candidate picks ONE sub-skill
// (Structures, Case Math, Market Sizing, Calculations, Charts, Creativity),
// Mate generates a fresh prompt, a short countdown starts, and the moment
// they submit they get a structured coaching result (micro-drill-v1.3): how
// to approach that drill type, a model answer, feedback on their own answer,
// and concrete next steps - not just a score blurb.
// Drills are generated contextually by the micro-drill hook (see
// ./serverFunctions.ts) and personalized to the candidate's matched
// industry/function via the shared caseTypeCatalog mapping.
//
// micro-drill-v1.4: Case Math reps follow the founder-locked linked-mini-case
// format - a named company + decision context, a data table whose figures
// chain into each other, multi-layer questions where each answer feeds the
// next, and a detailed step-by-step worked solution (arithmetic per step,
// bolded intermediate results, thinking-tip callouts, consultant-style
// close). Rendered by CaseMathBriefView / CaseMathSolutionView below; old
// plain-text Case Math rows degrade to the generic prompt/model-answer view.

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Calculator,
  CheckCircle2,
  Compass,
  Eye,
  Flag,
  Globe,
  Lightbulb,
  Loader2,
  Network,
  RefreshCw,
  Send,
  Shuffle,
  Sigma,
  Sparkles,
  Target,
  Timer,
  Zap,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { emitLiveSourceEventsOnce, logLiveTrackingFailure, workspaceRows } from '../../lib/liveFeatureTracking';
import { trackStepError, trackStepView, useActiveTimeThreshold } from '../../lib/engagementTracking';
import { tw } from '../../lib/colors';
import PaywallGate from '../../components/PaywallGate';
const QuestionLibrary = lazy(() => import('../../components/QuestionLibrary')); 
import PercentileRankingWidget from '../../components/PercentileRankingWidget';
import ExhibitRenderer from '../../components/ExhibitRenderer';
import CaseResultView from '../../components/CaseResultView';
import CalculationAnswerBuilder, { CalculationResultSummaryView } from '../../components/CalculationAnswerBuilder';
import MarketSizingAnswerBuilder, {
  MarketSizingAttemptSummary,
  calculateMarketSizingResult,
  createInitialMarketSizingDraft,
  parseMarketSizingAttempt,
  serializeMarketSizingAttempt,
  type MarketSizingAnswerDraft,
} from '../../components/MarketSizingAnswerBuilder';
import { formatNumbersInText } from '../../lib/numberDisplay';
import { clarifyUnitLabel, clarifyUnitText, clarifyUnitsDeep } from '../../lib/unitLabels';
import {
  createCalculationAnswerPayload,
  serializeCalculationAnswer,
  type CalculationAnswerPayload,
  type CalculationFinalAnswerSpec,
} from '../../lib/calculationAnswerModel';
import { deriveOverallScore, type HonestScoreResult } from '../../lib/caseScoringRubrics';
import type { LibraryExhibit } from '../../lib/skillQuestionLibrary';
import { buildFeedbackPriorities, type FeedbackPriorities } from '../../lib/feedbackPresentation';
import { buildReasoningFeedback, chooseNextAction, emptyWorkedAnswer, hasLearnerResponse, hasWorkedAnswer, resultOutcome, type WorkedAnswerModel } from '../../lib/caseResultModel';
import { DrillScoreBadge, parseDrillScore } from './drillScoreBadge';

let skillQuestionLibraryPromise: Promise<typeof import('../../lib/skillQuestionLibrary')> | null = null;
function loadSkillQuestionLibrary() {
  skillQuestionLibraryPromise ??= import('../../lib/skillQuestionLibrary').catch((error) => {
    skillQuestionLibraryPromise = null;
    throw error;
  });
  return skillQuestionLibraryPromise;
}

async function findLibraryQuestion(predicate: (question: any) => boolean) {
  const { ALL_LIBRARY_QUESTIONS } = await loadSkillQuestionLibrary();
  return ALL_LIBRARY_QUESTIONS.find(predicate) ?? null;
}
import {
  MICRO_SKILLS,
  callMicroDrillServerFunction,
} from './serverFunctions';
import { relevantCaseTypesForDirection } from '../CaseDrillLog/caseTypeCatalog';

type JsonValue = Record<string, any> | any[] | string | null;

interface MicroDrill {
  id: number;
  skill: string;
  skill_label?: string;
  prompt: string;
  drill_data?: string;
  chart_json?: JsonValue;
  time_limit_seconds: number;
  source_case_id?: string | null;
  answer_text?: string;
  elapsed_seconds?: number;
  timed_out?: boolean;
  score?: number;
  feedback_json?: JsonValue;
  model_answer?: string;
  status: 'pending' | 'completed' | 'skipped';
  completed_on?: string;
  created_at?: string;
}

interface AssessmentResult {
  id: number;
  result_json?: JsonValue;
  created_at?: string;
}

interface DrillFeedback {
  feedback: string;
  strengths: string[];
  improvements: string[];
}

function calculationSubject(prompt: string): string {
  const forMatch = prompt.match(/\bfor\s+([A-Z][A-Za-z0-9&' -]{2,60})(?:[.?]|$)/);
  if (forMatch) return forMatch[1].trim();
  const leading = prompt.match(/^([A-Z][A-Za-z0-9&' -]{2,60}?)\s+(?:increased|decreased|grew|reduced|raised)/);
  return leading?.[1]?.trim() || '';
}

function descriptiveCalculationLabel(line: string, prompt: string, index: number): string {
  const clean = line.replace(/^\s*\d+[.)]\s*/, '').replace(/^[-•]\s*/, '').trim();
  const context = `${clean} ${prompt}`;
  const subject = calculationSubject(prompt);
  const prefix = subject ? `${subject} ` : '';
  if (/percentage growth|growth rate|what (?:is|was) the percentage growth/i.test(context)) return `${prefix}Growth Rate`;
  if (/revenue.*end value|end value.*revenue|total revenue after/i.test(context)) return `${prefix}Revenue End Value`;
  if (/yield.*end|end yield/i.test(context)) return `${prefix}End Yield`;
  if (/total amount due/i.test(context)) return `${prefix}Total Amount Due`;
  if (/selling price|price per ton/i.test(context)) return `${prefix}Selling Price`;
  if (/cost price/i.test(context)) return `${prefix}Cost Price`;
  if (/profit margin|margin percentage/i.test(context)) return `${prefix}Profit Margin`;
  if (/profit amount|what is the profit\b/i.test(context)) return `${prefix}Profit`;
  if (/break-even.*patients|number of patients/i.test(context)) return `${prefix}Break-Even Patients`;
  if (/break-even.*transactions|transactions are needed/i.test(context)) return `${prefix}Break-Even Transactions`;
  if (/break-even.*loans|loans to break even/i.test(context)) return `${prefix}Break-Even Loans`;
  if (/break-even.*units|how many units/i.test(context)) return `${prefix}Break-Even Units`;
  if (/break-even point|break-even value/i.test(context)) return `${prefix}Break-Even Result`;
  if (/capacity|square meters.*use/i.test(context)) return `${prefix}Capacity in Use`;
  if (/\d+(?:\.\d+)?%\s+of/i.test(context)) return `${prefix}Percentage Amount`;
  return `${prefix || 'Calculation '}${index + 1} Result`;
}

function generatedCalculationAnswer(drillData?: string, prompt = '', rawMeta?: JsonValue): CalculationAnswerPayload {
  const meta = asObject(rawMeta);
  const storedResults = meta.format === 'calculation_results_v1' && Array.isArray(meta.results)
    ? meta.results
        .filter((result: any) => result && String(result.label || '').trim())
        .map((result: any, index: number): CalculationFinalAnswerSpec => ({
          id: String(result.id || `item-${index + 1}`),
          label: String(result.label).trim(),
          unit: String(result.unit || '').trim() || undefined,
        }))
    : [];
  if (storedResults.length) return createCalculationAnswerPayload(storedResults, storedResults.length);

  const dataLines = String(drillData || '').split('\n').map((line) => line.trim()).filter(Boolean);
  const numbered = dataLines.filter((line) => /^\d+[.)]\s*/.test(line));
  const resultLines = (numbered.length ? numbered : [/\?|calculate|what is|what was/i.test(prompt) ? prompt : '', ...dataLines]).filter(Boolean).slice(0, 4);
  const specs = resultLines.map((line, index): CalculationFinalAnswerSpec => {
    const currency = line.match(/\b(VND|USD)\b/i)?.[1]?.toUpperCase();
    const quantity = line.match(/\b(units?|orders?|buyers?|customers?|packs?|bottles?|patients?|loans?|transactions?|tons?|square meters?)\b/i)?.[1];
    const percent = /margin|growth rate|percentage growth|what percent|percentage/i.test(`${line} ${prompt}`);
    return {
      id: `item-${index + 1}`,
      label: descriptiveCalculationLabel(line, prompt, index),
      unit: percent ? '%' : currency || quantity,
    };
  });
  return createCalculationAnswerPayload(specs, specs.length);
}

function displayCalculationSpecs<T extends CalculationFinalAnswerSpec>(specs: T[]): T[] {
  return specs.map((spec) => ({ ...spec, label: clarifyUnitText(spec.label), unit: spec.unit ? clarifyUnitLabel(spec.unit) : spec.unit }));
}

interface DrillResult {
  skipped: boolean;
  score: number | null;
  feedback: DrillFeedback | null;
  /** Seconds from the drill appearing to submission - feeds the ranking widget. */
  elapsedSeconds: number;
  modelAnswer: string;
  /** Structured Case Math worked solution (micro-drill-v1.4), when available. */
  solution: CaseMathSolution | null;
  /** How to approach this TYPE of drill - 3-5 concrete method steps. */
  approach: string[];
  /** Grounded evidence plus one priority and at most two smaller improvements. */
  feedbackPriorities: FeedbackPriorities;
  /** Weighted criterion detail; absent only for legacy rows or explicit skips. */
  scoring: HonestScoreResult | null;
}

/* Case Math linked mini-case (micro-drill-v1.4) - the structured case brief
 * travels in chart_json (format case_math_v1) and the structured solution in
 * the grade/skip response (format case_math_solution_v1). */

interface CaseMathTableRow {
  label: string;
  value: string;
  note?: string;
}

interface CaseMathBrief {
  title: string;
  context: string;
  dataTable: CaseMathTableRow[];
  questions: string[];
}

interface CaseMathSolutionStep {
  label: string;
  work: string;
  result: string;
  tip: string;
}

interface CaseMathSolution {
  steps: CaseMathSolutionStep[];
  close: string;
}

function parseCaseMathBrief(raw: JsonValue | undefined): CaseMathBrief | null {
  const spec = asObject(raw);
  if (spec.format !== 'case_math_v1') return null;
  const dataTable: CaseMathTableRow[] = Array.isArray(spec.data_table)
    ? spec.data_table
        .filter((row: any) => row && typeof row === 'object' && String(row.label ?? '').trim() && String(row.value ?? '').trim())
        .map((row: any) => ({
          label: capitaliseLineStarts(String(row.label).trim()),
          value: capitaliseLineStarts(String(row.value).trim()),
          note: capitaliseLineStarts(String(row.note ?? '').trim()) || undefined,
        }))
    : [];
  const questions = Array.isArray(spec.questions)
    ? spec.questions.map((question: any) => capitaliseLineStarts(String(question ?? '').trim())).filter(Boolean)
    : [];
  const context = capitaliseLineStarts(String(spec.context || '').trim());
  if (!context || dataTable.length < 2 || questions.length < 2) return null;
  return clarifyUnitsDeep({ title: capitaliseLineStarts(String(spec.title || '').trim()) || 'Case Math', context, dataTable, questions });
}

function parseCaseMathSolution(raw: unknown): CaseMathSolution | null {
  let spec: any = raw;
  if (typeof raw === 'string') {
    try {
      spec = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!spec || typeof spec !== 'object' || spec.format !== 'case_math_solution_v1') return null;
  const steps: CaseMathSolutionStep[] = Array.isArray(spec.steps)
    ? spec.steps
        .filter((step: any) => step && typeof step === 'object' && String(step.work ?? '').trim() && String(step.result ?? '').trim())
        .map((step: any) => ({
          label: capitaliseLineStarts(String(step.label ?? '').trim()),
          work: capitaliseLineStarts(String(step.work).trim()),
          result: capitaliseLineStarts(String(step.result).trim()),
          tip: capitaliseLineStarts(String(step.tip ?? '').trim()),
        }))
    : [];
  if (steps.length === 0) return null;
  return { steps, close: capitaliseLineStarts(String(spec.close || '').trim()) };
}

declare global {
  interface Window {
    useWorkspaceDB: <T = unknown>(
      table: string,
      options?: {
        shared?: boolean;
        limit?: number;
        offset?: number;
        orderBy?: { column: string; direction: 'asc' | 'desc' };
        filters?: Array<{ column: string; operator: string; value: unknown }>;
      },
    ) => { data: T[]; loading: boolean; error: Error | null; total: number; refresh: () => void };
  }
}

function asObject(value: JsonValue | undefined): Record<string, any> {
  if (!value) return {};
  if (typeof value === 'object' && !Array.isArray(value)) return value as Record<string, any>;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
}

function capitaliseLineStarts(value: unknown): string {
  return String(value ?? '')
    .replace(/\u2014/g, '-')
    .split('\n')
    .map((line) => line.replace(/^([^A-Za-zÀ-ỹ]*)([a-zà-ỹ])/, (_, prefix, first) => `${prefix}${first.toUpperCase()}`))
    .join('\n');
}

function scoreScaleOf(row: Pick<MicroDrill, 'feedback_json'>): 5 | 10 {
  const scoring = asObject(asObject(row.feedback_json).scoring);
  return Number(scoring.scale) === 10 ? 10 : 5;
}

function emitPracticeGrade(drillId: number, sessionId: string): void {
  void (async () => {
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.from) throw new Error('workspace_db_unavailable');
      const source = await db
        .from('micro_drills')
        .eq('id', drillId)
        .eq('session_id', sessionId)
        .limit(1)
        .get();
      const row = workspaceRows(source)[0] || null;
      const rawScore = row?.score;
      const score = rawScore === null || rawScore === undefined || rawScore === '' ? NaN : Number(rawScore);
      const completedOn = typeof row?.completed_on === 'string' ? row.completed_on : '';
      if (!row || row.status !== 'completed' || !Number.isFinite(score) || score < 0 || score > 10 || !completedOn) {
        throw new Error('micro_drills_completed_source_unavailable');
      }
      const completionKey = `practice:${row.id}`;
      const properties = {
        score,
        score_scale: scoreScaleOf(row),
        skill: row.skill || null,
        status: 'completed',
        timed_out: row.timed_out === true,
        skill_label: row.skill_label || null,
        elapsed_seconds: Number.isFinite(Number(row.elapsed_seconds)) ? Number(row.elapsed_seconds) : null,
      };
      emitLiveSourceEventsOnce({
        featureName: 'practice',
        appId: 'case-drill',
        mode: 'coach',
        sessionId,
        sourceTable: 'micro_drills',
        sourceRecordId: row.id,
        occurredAt: completedOn,
        properties,
        events: [
          { eventName: 'practice_submitted', eventRole: 'step', completionKey: null },
          { eventName: 'practice_graded', eventRole: 'diagnostic', completionKey: null },
          { eventName: 'practice_rep_completed', eventRole: 'core_action', completionKey },
        ],
        coreDedup: { eventName: 'practice_rep_completed', completionKey },
      });
    } catch (error) {
      logLiveTrackingFailure({
        featureName: 'practice',
        eventName: 'practice_rep_completed',
        sessionId,
        reason: error instanceof Error ? error.message : 'micro_drills_source_read_failed',
        statusCode: Number.isFinite(Number((error as any)?.status)) ? Number((error as any).status) : null,
        phase: 'practice_source_read',
      });
    }
  })();
}

const SKILL_ICONS: Record<string, typeof Network> = {
  structures: Network,
  case_math: Sigma,
  market_sizing: Globe,
  calculations: Calculator,
  charts: BarChart3,
  creativity: Lightbulb,
};

// Which micro-skills matter most for each full-case type - this is how the
// existing industry/function diversification mapping (caseTypeCatalog.ts)
// is reused to order the drill menu for a candidate's matched direction.
const CASE_TYPE_TO_SKILLS: Record<string, string[]> = {
  market_sizing: ['market_sizing', 'calculations'],
  profitability: ['case_math', 'charts'],
  financial_analysis: ['charts', 'case_math', 'calculations'],
  credit_assessment: ['case_math', 'calculations'],
  unit_economics: ['case_math', 'calculations'],
  due_diligence: ['charts', 'case_math'],
  operations_optimization: ['case_math', 'charts'],
  growth_strategy: ['structures', 'creativity'],
  market_entry: ['structures', 'market_sizing'],
  mna: ['structures', 'case_math'],
  pricing: ['calculations', 'case_math'],
  competitive_response: ['structures', 'creativity'],
  product_launch: ['creativity', 'structures'],
  distribution_strategy: ['structures', 'charts'],
};

function orderedSkills(direction: Record<string, any>): { ids: string[]; personalized: boolean; matchLabel: string } {
  const relevance = relevantCaseTypesForDirection(direction);
  if (!relevance.personalized) {
    return { ids: MICRO_SKILLS.map((s) => s.id), personalized: false, matchLabel: '' };
  }
  const scores = new Map<string, number>();
  relevance.ids.forEach((caseTypeId, index) => {
    const skills = CASE_TYPE_TO_SKILLS[caseTypeId] || [];
    skills.forEach((skillId, position) => {
      const weight = (relevance.ids.length - index) * (skills.length - position);
      scores.set(skillId, (scores.get(skillId) || 0) + weight);
    });
  });
  const catalogOrder = new Map(MICRO_SKILLS.map((s, i) => [s.id, i]));
  const ids = MICRO_SKILLS.map((s) => s.id).sort((a, b) => {
    const diff = (scores.get(b) || 0) - (scores.get(a) || 0);
    if (diff !== 0) return diff;
    return (catalogOrder.get(a) ?? 99) - (catalogOrder.get(b) ?? 99);
  });
  const matchLabel = relevance.matchedIndustries[0] || relevance.matchedFunctions[0] || '';
  return { ids, personalized: true, matchLabel };
}

function formatClock(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function timeAgo(iso?: string): string {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just Now';
  if (minutes < 60) return `Minutes Ago: ${minutes}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hours Ago: ${hours}`;
  const days = Math.floor(hours / 24);
  return `Days Ago: ${days}`;
}

/* ---------------------------------------------------------------------------
 * Compact exhibit chart for Charts drills (bar / line / pie).
 * ------------------------------------------------------------------------- */

interface ChartSpec {
  type: string;
  title: string;
  unit: string;
  data: Array<{ label: string; value: number }>;
}

function parseChart(raw: JsonValue | undefined): ChartSpec | null {
  const chart = asObject(raw);
  const data = Array.isArray(chart.data)
    ? chart.data
        .filter((p: any) => p && typeof p === 'object' && Number.isFinite(Number(p.value)))
        .map((p: any) => ({ label: clarifyUnitText(capitaliseLineStarts(String(p.label || ''))), value: Number(p.value) }))
    : [];
  if (data.length < 2) return null;
  return {
    type: String(chart.type || 'bar'),
    title: clarifyUnitText(capitaliseLineStarts(String(chart.title || 'Exhibit'))),
    unit: clarifyUnitLabel(capitaliseLineStarts(String(chart.unit || ''))),
    data: data.slice(0, 5),
  };
}

const PIE_TONES = [
  'var(--space-brand-primary-600)',
  'var(--space-brand-primary-200)',
  'var(--space-brand-primary-700)',
  'var(--space-brand-primary-100)',
  'var(--space-brand-primary-500)',
];

type DrillChartType = 'column' | 'bar' | 'line' | 'pie';

function resolveDrillChartType(chart: ChartSpec): DrillChartType {
  const title = chart.title.toLowerCase();
  const labels = chart.data.map((point) => point.label).join(' ').toLowerCase();
  const values = chart.data.map((point) => point.value);
  const allPositive = values.every((value) => value > 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  const shareLike =
    /share|mix|composition|split|contribution|breakdown|portfolio|segment|tỷ trọng|cơ cấu/.test(title) ||
    (chart.unit.includes('%') && total >= 95 && total <= 105);
  if (chart.type === 'pie' && allPositive) return 'pie';
  if (shareLike && allPositive && values.length <= 8) return 'pie';

  const timeLike =
    /trend|over time|growth|monthly|quarterly|annual|theo thời gian|tăng trưởng/.test(title) ||
    /\b20\d{2}\b|\bq[1-4]\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b|tháng|quý|năm/.test(labels);
  if (chart.type === 'line' || timeLike) return 'line';
  if (/rank|ranking|top\s|bottom\s|highest|lowest|leader|xếp hạng|cao nhất|thấp nhất/.test(title)) return 'bar';
  return 'column';
}

function DrillColumnChart({ chart }: { chart: ChartSpec }) {
  const width = 240;
  const height = 132;
  const padX = 18;
  const padTop = 20;
  const padBottom = 38;
  const values = chart.data.map((point) => point.value);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const plotHeight = height - padTop - padBottom;
  const step = (width - padX * 2) / chart.data.length;
  const barWidth = Math.min(28, step * 0.58);
  const yFor = (value: number) => padTop + ((max - value) / span) * plotHeight;
  const baseline = yFor(0);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto mt-2 h-auto w-full max-w-md" role="img" aria-label={chart.title}>
      <line x1={padX} x2={width - padX} y1={baseline} y2={baseline} stroke="var(--space-border-strong)" strokeWidth="1" />
      {chart.data.map((point, index) => {
        const x = padX + index * step + (step - barWidth) / 2;
        const valueY = yFor(point.value);
        const y = Math.min(valueY, baseline);
        const barHeight = Math.max(2, Math.abs(valueY - baseline));
        return (
          <g key={`${point.label}-${index}`}>
            <rect x={x} y={y} width={barWidth} height={barHeight} rx="3" fill={point.value < 0 ? 'var(--space-semantic-danger)' : 'var(--space-brand-primary-600)'}>
              <title>{`${point.label}: ${point.value.toLocaleString()}${chart.unit ? ` ${chart.unit}` : ''}`}</title>
            </rect>
            <text x={x + barWidth / 2} y={point.value >= 0 ? Math.max(10, y - 5) : y + barHeight + 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--space-text-primary)">
              {point.value.toLocaleString()}
            </text>
            <text x={x + barWidth / 2} y={height - 17} textAnchor="middle" fontSize="12" fill="var(--space-text-muted)">
              {point.label.length > 8 ? `${point.label.slice(0, 7)}…` : point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DrillChart({ chart }: { chart: ChartSpec }) {
  const chartType = resolveDrillChartType(chart);
  const max = Math.max(...chart.data.map((p) => Math.abs(p.value)), 1);
  const total = chart.data.reduce((sum, p) => sum + p.value, 0) || 1;

  return (
    <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="drill-chart">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Exhibit</p>
      <h4 className="mt-0.5 text-sm font-semibold text-[var(--space-text-primary)]">
        {chart.title}
        {chart.unit ? <span className="ml-1.5 text-[11px] font-normal text-[var(--space-text-muted)]">({chart.unit})</span> : null}
      </h4>

      {chartType === 'pie' ? (
        <div className="mt-2 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <svg viewBox="0 0 42 42" className="h-24 w-24 flex-shrink-0" role="img" aria-label={chart.title}>
            {(() => {
              let offset = 25;
              return chart.data.map((point, index) => {
                const fraction = point.value / total;
                const dash = fraction * 100;
                const circle = (
                  <circle
                    key={`${point.label}-${index}`}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={PIE_TONES[index % PIE_TONES.length]}
                    strokeWidth="10"
                    strokeDasharray={`${dash} ${100 - dash}`}
                    strokeDashoffset={offset}
                  >
                    <title>{`${point.label}: ${point.value}${chart.unit ? ' ' + chart.unit : ''}`}</title>
                  </circle>
                );
                offset -= dash;
                return circle;
              });
            })()}
          </svg>
          <ul className="min-w-0 space-y-1">
            {chart.data.map((point, index) => (
              <li key={`${point.label}-${index}`} className="flex items-center gap-2 text-[11px] text-[var(--space-text-secondary)]">
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-sm" style={{ background: PIE_TONES[index % PIE_TONES.length] }} />
                <span className="truncate">{point.label}</span>
                <span className="ml-auto font-semibold text-[var(--space-text-primary)]">{point.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : chartType === 'line' ? (
        <div className="mt-2">
          <svg viewBox="0 0 200 80" className="h-28 w-full" role="img" aria-label={chart.title} preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="var(--space-brand-primary-600)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={chart.data
                .map((point, index) => {
                  const x = 10 + (index * 180) / Math.max(chart.data.length - 1, 1);
                  const y = 70 - (point.value / max) * 55;
                  return `${x},${y}`;
                })
                .join(' ')}
            />
            {chart.data.map((point, index) => {
              const x = 10 + (index * 180) / Math.max(chart.data.length - 1, 1);
              const y = 70 - (point.value / max) * 55;
              return (
                <circle key={index} cx={x} cy={y} r="3" fill="var(--space-brand-primary-600)">
                  <title>{`${point.label}: ${point.value.toLocaleString()}${chart.unit ? ` ${chart.unit}` : ''}`}</title>
                </circle>
              );
            })}
          </svg>
          <div className="flex justify-between text-[10px] text-[var(--space-text-muted)]">
            {chart.data.map((point, index) => (
              <span key={index} className="max-w-[20%] truncate text-center">
                {point.label}
                <span className="block font-semibold text-[var(--space-text-secondary)]">{point.value.toLocaleString()}</span>
              </span>
            ))}
          </div>
        </div>
      ) : chartType === 'column' ? (
        <DrillColumnChart chart={chart} />
      ) : (
        <ul className="mt-2 space-y-1.5">
          {chart.data.map((point, index) => (
            <li key={`${point.label}-${index}`} className="text-[11px]">
              <div className="flex items-center justify-between gap-2 text-[var(--space-text-secondary)]">
                <span className="truncate">{point.label}</span>
                <span className="font-semibold text-[var(--space-text-primary)]">{point.value.toLocaleString()}</span>
              </div>
              <div className="mt-0.5 h-2 overflow-hidden rounded-full bg-[var(--space-surface-card)]">
                <div
                  className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
                  style={{ width: `${Math.max(4, (point.value / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Case Math linked mini-case (micro-drill-v1.4): brief + worked solution.
 * ------------------------------------------------------------------------- */

function CaseMathBriefView({ brief }: { brief: CaseMathBrief }) {
  return (
    <div data-testid="case-math-brief">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Case context</p>
      <h3 className="mt-0.5 text-sm font-bold text-[var(--space-text-primary)]">{brief.title}</h3>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-primary)]">{brief.context}</p>

      <div className="mt-3 overflow-hidden rounded-xl border border-[var(--space-border-default)]" data-testid="case-math-data-table">
        <p className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          Given data - each figure feeds the next
        </p>
        <ul className="divide-y divide-[var(--space-border-default)]">
          {brief.dataTable.map((row, index) => (
            <li key={index} className="flex items-start justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <p className="break-words text-xs font-medium text-[var(--space-text-secondary)]">{row.label}</p>
                {row.note ? <p className="mt-0.5 break-words text-[10px] leading-4 text-[var(--space-text-muted)]">{row.note}</p> : null}
              </div>
              <p className="min-w-0 break-words text-right text-xs font-bold tabular-nums text-[var(--space-text-primary)]">{row.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3" data-testid="case-math-questions">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          Questions - answer in order, each step feeds the next
        </p>
        <ol className="mt-1.5 space-y-1.5">
          {brief.questions.map((question, index) => (
            <li key={index} className="flex gap-2 text-sm leading-6 text-[var(--space-text-primary)]">
              <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[9px] font-bold text-[var(--space-text-brand)]">
                {index + 1}
              </span>
              <span className="min-w-0">{question}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CaseMathSolutionView({ solution }: { solution: CaseMathSolution }) {
  return (
    <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="case-math-solution">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
        <Eye className="h-3.5 w-3.5 flex-shrink-0" />
        Mate's step-by-step solution
      </p>
      <div className="mt-2 space-y-2.5">
        {solution.steps.map((step, index) => (
          <div key={index} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3" data-testid={`case-math-step-${index + 1}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
              Step {index + 1}
              {step.label ? ` - ${step.label}` : ''}
            </p>
            <pre className="mt-1.5 whitespace-pre-wrap break-words font-[inherit] text-xs leading-5 text-[var(--space-text-secondary)]">{step.work}</pre>
            <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-primary)]">
              → <strong className="font-bold">{step.result}</strong>
            </p>
            {step.tip ? (
              <div className="mt-2 flex gap-1.5 rounded-lg border-l-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] px-2.5 py-2">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-text-brand)]" />
                <p className="min-w-0 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                  <span className="font-bold text-[var(--space-text-brand)]">Thinking tip:</span> {step.tip}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {solution.close ? (
        <div className="mt-2.5 rounded-xl border border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-3" data-testid="case-math-consultant-close">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
            <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
            Consultant's take
          </p>
          <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">{solution.close}</p>
        </div>
      ) : null}
    </div>
  );
}

/** The coach worked answer is the stored model answer the grader marked against. */
function coachWorkedAnswer(drill: MicroDrill, result: DrillResult): WorkedAnswerModel | null {
  if (!result.solution && !result.modelAnswer) return null;
  const openEnded = drill.skill === 'creativity' || drill.skill === 'structures' || drill.skill === 'market_sizing';
  const model = emptyWorkedAnswer(openEnded ? 'example' : 'reference');
  model.approach = result.approach;
  if (result.solution) {
    model.calculationLines = result.solution.steps.map((step) => `${step.label ? `${step.label}: ` : ''}${step.work} → ${step.result}`);
    model.conclusion = result.solution.close || result.solution.steps[result.solution.steps.length - 1].result;
    model.checks = result.solution.steps.map((step) => step.tip).filter(Boolean);
  } else {
    model.conclusion = result.modelAnswer;
  }
  if (openEnded) {
    model.note = drill.skill === 'creativity'
      ? 'Creativity questions can have many strong answers - this is one structured route, not a required framework.'
      : 'One well-reasoned route, not the only acceptable answer.';
  }
  return hasWorkedAnswer(model) ? model : null;
}

/* ---------------------------------------------------------------------------
 * Main app
 * ------------------------------------------------------------------------- */

type Phase = 'pick' | 'generating' | 'active' | 'grading' | 'result';

// Casemate freemium boundary: Case Drill is part of Casemate Pro.
// The gate below shows all three native-checkout plans to users whose trial
// ended; Fit Assessment and matching remain completely free.
export default function CaseDrill() {
  return (
    <>
      <PaywallGate appId="case-drill" appName="Case Drill">
        <CaseDrillInner />
      </PaywallGate>
    </>
  );
}

function CaseDrillInner() {
  const { sessionId } = useSpaceRuntime();
  const {
    data: drills,
    refresh: refreshDrills,
  } = window.useWorkspaceDB<MicroDrill>('micro_drills', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 100,
  });
  const { data: assessments } = window.useWorkspaceDB<AssessmentResult>('assessment_results', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 1,
  });

  // The Question Library (prebuilt questions across consulting skills, no AI
  // call) is the only practice entry point; the "Practice with Mate" tab was
  // removed, so nothing switches this to 'coach' any more.
  const [mode, setMode] = useState<'library' | 'coach'>('library');
  const [libraryCompact, setLibraryCompact] = useState(false);
  const [phase, setPhase] = useState<Phase>('pick');
  const [drill, setDrill] = useState<MicroDrill | null>(null);
  const [answer, setAnswer] = useState('');
  const [marketSizingDraft, setMarketSizingDraft] = useState<MarketSizingAnswerDraft>(createInitialMarketSizingDraft);
  const [calculationAnswer, setCalculationAnswer] = useState<CalculationAnswerPayload>(() => generatedCalculationAnswer());
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [result, setResult] = useState<DrillResult | null>(null);
  // True when the result on screen was reopened from the saved log (a completed
  // rep tapped in the history) rather than freshly graded this session. It
  // suppresses the ranking widget and shows the stored submitted answer.
  const [reopened, setReopened] = useState(false);
  const nfDrill = (value: string) => {
    const clear = clarifyUnitText(value);
    return drill?.skill === 'market_sizing' ? formatNumbersInText(clear) : clear;
  };
  // Gates the destructive Redo: the saved feedback is only replaced after the
  // learner explicitly confirms a fresh attempt.
  const [confirmRedo, setConfirmRedo] = useState(false);
  const [error, setError] = useState('');
  const [prioritySkillId, setPrioritySkillId] = useState<string | null>(null);
  const startedAtRef = useRef<number>(0);
  // Last explicitly requested skill - powers the retry button and the
  // case-math-specific generating copy (null = "surprise me").
  const lastSkillRef = useRef<string | null>(null);
  const structuresFocusRequestRef = useRef(0);

  useEffect(() => {
    const applyFocus = (skillId: unknown) => {
      const id = typeof skillId === 'string' && MICRO_SKILLS.some((skill) => skill.id === skillId) ? skillId : null;
      if (!id) return;
      const focusRequest = ++structuresFocusRequestRef.current;
      setPrioritySkillId(id);
      if (id === 'structures') {
        void findLibraryQuestion((question) => question.skill === 'structures').then((firstStructure) => {
          if (focusRequest !== structuresFocusRequestRef.current) return;
          try {
            if (
              firstStructure &&
              !sessionStorage.getItem('casemate-open-structures-case') &&
              !sessionStorage.getItem('casemate-open-case-drill')
            ) {
              sessionStorage.setItem('casemate-open-case-drill', firstStructure.id);
            }
          } catch { /* best effort */ }
          setMode('library');
          setPhase('pick');
          setDrill(null);
          setResult(null);
          window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill' } }));
        }).catch(() => {
          if (focusRequest === structuresFocusRequestRef.current) setMode('library');
        });
        return;
      }
      setMode('library');
      setPhase('pick');
      setDrill(null);
      setResult(null);
    };
    try {
      const raw = localStorage.getItem(`casemate-case-drill-focus:${sessionId || 'preview'}`);
      if (raw) {
        localStorage.removeItem(`casemate-case-drill-focus:${sessionId || 'preview'}`);
        applyFocus(JSON.parse(raw)?.skillId);
      }
    } catch (_) {
      // The event listener below still handles focus in this tab.
    }
    const onFocus = (event: Event) => applyFocus((event as CustomEvent<{ skillId?: string }>).detail?.skillId);
    window.addEventListener('casemateCaseDrillFocus', onFocus);
    return () => {
      structuresFocusRequestRef.current += 1;
      window.removeEventListener('casemateCaseDrillFocus', onFocus);
    };
  }, [sessionId]);

  useEffect(() => {
    const openRequestedStructure = () => {
      void (async () => {
        try {
          const directCaseId = sessionStorage.getItem('casemate-open-structures-case');
          const legacyDrillId = sessionStorage.getItem('casemate-open-case-drill');
          if (!directCaseId && !legacyDrillId) return;
          const { ALL_LIBRARY_QUESTIONS } = await loadSkillQuestionLibrary();
          const directQuestion = directCaseId ? ALL_LIBRARY_QUESTIONS.find((question) => question.id === directCaseId) : null;
          const legacyQuestion = legacyDrillId ? ALL_LIBRARY_QUESTIONS.find((question) => question.id === legacyDrillId) : null;
          if (
            directCaseId &&
            directQuestion?.skill !== 'structures' &&
            sessionStorage.getItem('casemate-open-structures-case') === directCaseId
          ) {
            sessionStorage.removeItem('casemate-open-structures-case');
          }
          if (directQuestion?.skill !== 'structures' && legacyQuestion?.skill !== 'structures') return;
          setMode('library');
          setPhase('pick');
          setDrill(null);
          setResult(null);
        } catch {
          /* sessionStorage can be unavailable in strict browser modes */
        }
      })();
    };
    openRequestedStructure();
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent).detail?.appId === 'case-drill') openRequestedStructure();
    };
    window.addEventListener('openApp', onOpenApp);
    return () => window.removeEventListener('openApp', onOpenApp);
  }, []);

  // Countdown - driven by wall-clock time so a background tab can't stretch
  // the limit. Stops at zero and flags the timeout.
  useEffect(() => {
    if (phase !== 'active' || timedOut || !drill) return;
    const tick = () => {
      const elapsed = Math.round((Date.now() - startedAtRef.current) / 1000);
      const remaining = Math.max(0, drill.time_limit_seconds - elapsed);
      setSecondsLeft(remaining);
      if (remaining <= 0) setTimedOut(true);
    };
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, [phase, timedOut, drill]);

  const coachSolvingTrackedRef = useRef<number | null>(null);
  const trackCoachSolving = (trigger: 'active_2min' | 'answer_typed', activeSeconds: number | null = null) => {
    if (phase !== 'active' || !drill || coachSolvingTrackedRef.current === drill.id) return;
    coachSolvingTrackedRef.current = drill.id;
    trackStepView('case-drill', 'solving_case', {
      mode: 'coach',
      dedupeKey: String(drill.id),
      properties: {
        question_id: String(drill.id),
        trigger,
        active_seconds: activeSeconds,
        seconds_since_open: Math.round((Date.now() - startedAtRef.current) / 1000),
      },
    });
  };
  useActiveTimeThreshold(phase === 'active' && Boolean(drill), drill?.id ?? null, (activeSeconds) => trackCoachSolving('active_2min', activeSeconds));

  const direction = asObject(assessments?.[0]?.result_json);
  const skillOrder = useMemo(() => {
    const ordered = orderedSkills(direction);
    if (!prioritySkillId || !ordered.ids.includes(prioritySkillId)) return ordered;
    return { ...ordered, ids: [prioritySkillId, ...ordered.ids.filter((id) => id !== prioritySkillId)] };
  }, [assessments, prioritySkillId]);

  const skillStats = useMemo(() => {
    const stats = new Map<string, { reps: number; scored: number; totalScore: number }>();
    MICRO_SKILLS.forEach((s) => stats.set(s.id, { reps: 0, scored: 0, totalScore: 0 }));
    (drills || []).forEach((row) => {
      const bucket = stats.get(row.skill);
      if (!bucket) return;
      bucket.reps += 1;
      if (row.status === 'completed' && Number.isFinite(Number(row.score))) {
        bucket.scored += 1;
        bucket.totalScore += Number(row.score) * (10 / scoreScaleOf(row));
      }
    });
    return stats;
  }, [drills]);

  const totalReps = (drills || []).length;
  const gradedDrills = (drills || []).filter((row) => row.status === 'completed' && Number.isFinite(Number(row.score)));
  const averageScore = gradedDrills.length
    ? gradedDrills.reduce((sum, row) => sum + Number(row.score) * (10 / scoreScaleOf(row)), 0) / gradedDrills.length
    : null;

  const startDrill = async (skillId: string | null) => {
    lastSkillRef.current = skillId;
    if (skillId === 'structures') {
      const firstStructure = await findLibraryQuestion((question) => question.skill === 'structures');
      try { if (firstStructure) sessionStorage.setItem('casemate-open-case-drill', firstStructure.id); } catch { /* best effort */ }
      setMode('library');
      setPhase('pick');
      setError('');
      window.setTimeout(() => window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill' } })), 0);
      return;
    }
    if (!sessionId) {
      setError('Sign in first so your drills are saved to your log.');
      return;
    }
    setError('');
    setResult(null);
    setReopened(false);
    setConfirmRedo(false);
    setPhase('generating');
    try {
      const response = await callMicroDrillServerFunction('generate', skillId ? { skill: skillId } : {}, sessionId);
      const fresh = response.drill as MicroDrill;
      setDrill(fresh);
      setAnswer('');
      setMarketSizingDraft(createInitialMarketSizingDraft());
      setCalculationAnswer(generatedCalculationAnswer(fresh.drill_data, fresh.prompt, fresh.chart_json));
      setTimedOut(false);
      setSecondsLeft(fresh.time_limit_seconds);
      startedAtRef.current = Date.now();
      setPhase('active');
      trackStepView('case-drill', 'choose_case', {
        mode: 'coach',
        dedupeKey: String(fresh.id),
        properties: { question_id: String(fresh.id), skill: fresh.skill, difficulty: null },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Mate could not generate this drill. Please try again.');
      setPhase('pick');
      trackStepError('case-drill', 'choose_case', e, { mode: 'coach' });
    }
  };

  const finishDrill = async (skip: boolean) => {
    if (!drill || !sessionId) return;
    if (!skip && drill.skill === 'market_sizing' && Object.keys(calculateMarketSizingResult(marketSizingDraft.components).errors).length > 0) {
      setError('Fix the invalid Component values before submitting.');
      return;
    }
    const elapsed = Math.min(drill.time_limit_seconds, Math.round((Date.now() - startedAtRef.current) / 1000));
    setError('');
    setPhase('grading');
    try {
      const response = await callMicroDrillServerFunction(
        'grade',
        {
          drillId: drill.id,
          answer: drill.skill === 'calculations'
            ? serializeCalculationAnswer(calculationAnswer)
            : drill.skill === 'market_sizing'
              ? serializeMarketSizingAttempt(marketSizingDraft, 'VND per year')
              : answer.trim(),
          skip,
          elapsedSeconds: elapsed,
          timedOut,
        },
        sessionId,
      );
      const feedbackRaw = response.feedback ? response.feedback : null;
      const asList = (value: unknown, max: number): string[] =>
        Array.isArray(value)
          ? value
              .map((item) => capitaliseLineStarts(String(item ?? '').trim()))
              .filter(Boolean)
              .slice(0, max)
          : [];
      const criterionFallback = Array.isArray(feedbackRaw?.scoring?.criteria)
        ? feedbackRaw.scoring.criteria
            .slice()
            .sort((a: any, b: any) => Number(a?.score || 0) - Number(b?.score || 0) || Number(b?.weight || 0) - Number(a?.weight || 0))
            .map((item: any) => ({
              action: capitaliseLineStarts(String(item?.stronger_answer || '').trim()),
              why: capitaliseLineStarts(String(item?.reason || '').trim()),
            }))
            .filter((item: any) => item.action)
        : [];
      const feedbackPriorities = buildFeedbackPriorities({
        evidenceToRevisit: asList(feedbackRaw?.evidence_to_revisit, 4),
        legacyEvidence: asList(feedbackRaw?.evidence_overlooked_or_misinterpreted, 4),
        nextStep: feedbackRaw?.next_step || response.next_step,
        furtherImprovements: Array.isArray(feedbackRaw?.further_improvements) ? feedbackRaw.further_improvements : [],
        legacyRecommendations: [
          ...(Array.isArray(response.next_steps) ? response.next_steps : []),
          ...(Array.isArray(feedbackRaw?.next_steps) ? feedbackRaw.next_steps : []),
          ...(Array.isArray(feedbackRaw?.improvements) ? feedbackRaw.improvements : []),
        ],
        fallbackActions: criterionFallback,
      });
      setResult(clarifyUnitsDeep<DrillResult>({
        skipped: !!response.skipped,
        score: Number.isFinite(Number(response.score)) ? Number(response.score) : null,
        elapsedSeconds: elapsed,
        feedback: feedbackRaw
          ? {
              feedback: capitaliseLineStarts(String(feedbackRaw.feedback || '')),
              strengths: asList(feedbackRaw.strengths, 3),
              improvements: asList(feedbackRaw.improvements, 3),
            }
          : null,
        modelAnswer: capitaliseLineStarts(String(response.model_answer || '')),
        solution: parseCaseMathSolution(response.solution ?? response.model_answer),
        approach: asList(response.approach, 5),
        feedbackPriorities,
        scoring: feedbackRaw?.scoring && Number(feedbackRaw.scoring.scale) === 10
          ? {
              rubricId: String(feedbackRaw.scoring.rubric_id || ''),
              scale: 10,
              overallScore: Number(feedbackRaw.scoring.overall_score),
              criteria: Array.isArray(feedbackRaw.scoring.criteria)
                ? feedbackRaw.scoring.criteria
                    .filter((item: any) => drill.skill !== 'market_sizing' || !['scope', 'assumptions', 'reasonableness', 'interpretation_check', 'assumption_rationale'].includes(String(item?.key || '')))
                    .map((item: any) => ({
                    key: String(item.key || ''),
                    label: String(item.label || ''),
                    weight: Number(item.weight) || 0,
                    score: Number(item.score) || 0,
                    evidence: capitaliseLineStarts(String(item.evidence || '')),
                    reason: capitaliseLineStarts(String(item.reason || '')),
                    strongerAnswer: capitaliseLineStarts(String(item.stronger_answer || '')),
                  }))
                : [],
            }
          : null,
      }));
      if (response.score !== null && response.score !== undefined && response.score !== '' && !response.skipped && Number.isFinite(Number(response.score))) {
        emitPracticeGrade(drill.id, sessionId);
      }
      trackStepView('case-drill', 'answer', {
        mode: 'coach',
        dedupeKey: String(drill.id),
        properties: {
          question_id: String(drill.id),
          score: !response.skipped && response.score !== null && response.score !== undefined && response.score !== '' && Number.isFinite(Number(response.score)) ? Number(response.score) : null,
          score_scale: Number(feedbackRaw?.scoring?.scale) === 10 ? 10 : 5,
          skipped: !!response.skipped,
        },
      });
      setPhase('result');
      refreshDrills();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Mate could not grade this drill. Please try again.');
      setPhase('active');
      trackStepError('case-drill', 'answer', e, { mode: 'coach' });
    }
  };

  // Reopen a completed / revealed rep from the saved log. Everything the result
  // screen needs is already stored on the micro_drills row (answer, score,
  // feedback, approach, next steps, scoring, model answer), so the saved
  // feedback is reconstructed verbatim - it survives reloads, sign-out/in, and
  // a device switch because it comes from the workspace DB, not local state.
  const reopenDrill = (row: MicroDrill) => {
    setError('');
    setConfirmRedo(false);
    const fb = asObject(row.feedback_json);
    const scoringRaw = asObject(fb.scoring);
    const scale = Number(scoringRaw.scale) === 10 ? 10 : 5;
    const rawScore = row.score === null || row.score === undefined ? null : Number(row.score);
    const normalizedScore = rawScore === null || !Number.isFinite(rawScore) ? null : Math.round(rawScore * (10 / scale));
    const toList = (value: unknown, max: number): string[] =>
      Array.isArray(value)
        ? value.map((item) => capitaliseLineStarts(String(item ?? '').trim())).filter(Boolean).slice(0, max)
        : [];
    const feedbackText = capitaliseLineStarts(String(fb.feedback || ''));
    const strengths = toList(fb.strengths, 3);
    const improvements = toList(fb.improvements, 3);
    setDrill(row);
    setAnswer(String(row.answer_text || ''));
    setMarketSizingDraft(parseMarketSizingAttempt(row.answer_text) || createInitialMarketSizingDraft());
    setTimedOut(row.timed_out === true);
    setResult(clarifyUnitsDeep<DrillResult>({
      skipped: row.status === 'skipped',
      score: row.status === 'skipped' ? null : normalizedScore,
      elapsedSeconds: Number.isFinite(Number(row.elapsed_seconds)) ? Number(row.elapsed_seconds) : 0,
      feedback: (feedbackText || strengths.length || improvements.length)
        ? { feedback: feedbackText, strengths, improvements }
        : null,
      modelAnswer: capitaliseLineStarts(String(row.model_answer || '')),
      solution: parseCaseMathSolution(row.model_answer),
      approach: toList(fb.approach, 5),
      feedbackPriorities: buildFeedbackPriorities({
        evidenceToRevisit: toList(fb.evidence_to_revisit, 4),
        legacyEvidence: toList(fb.evidence_overlooked_or_misinterpreted, 4),
        nextStep: fb.next_step,
        furtherImprovements: Array.isArray(fb.further_improvements) ? fb.further_improvements : [],
        legacyRecommendations: [...toList(fb.next_steps, 3), ...improvements],
        fallbackActions: Array.isArray(scoringRaw.criteria)
          ? scoringRaw.criteria
              .slice()
              .sort((a: any, b: any) => Number(a?.score || 0) - Number(b?.score || 0) || Number(b?.weight || 0) - Number(a?.weight || 0))
              .map((item: any) => ({ action: capitaliseLineStarts(String(item?.stronger_answer || '')), why: capitaliseLineStarts(String(item?.reason || '')) }))
          : [],
      }),
      scoring: scale === 10 && Array.isArray(scoringRaw.criteria)
        ? {
            rubricId: String(scoringRaw.rubric_id || ''),
            scale: 10,
            overallScore: Number(scoringRaw.overall_score),
            criteria: scoringRaw.criteria
              .filter((item: any) => row.skill !== 'market_sizing' || !['scope', 'assumptions', 'reasonableness', 'interpretation_check', 'assumption_rationale'].includes(String(item?.key || '')))
              .map((item: any) => ({
              key: String(item.key || ''),
              label: String(item.label || ''),
              weight: Number(item.weight) || 0,
              score: Number(item.score) || 0,
              evidence: capitaliseLineStarts(String(item.evidence || '')),
              reason: capitaliseLineStarts(String(item.reason || '')),
              strongerAnswer: capitaliseLineStarts(String(item.stronger_answer || '')),
            })),
          }
        : null,
    }));
    setReopened(true);
    setPhase('result');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start a fresh attempt at the drill currently on screen. The new submission
  // overwrites the stored row, so this only runs after an explicit confirm.
  const redoDrill = () => {
    if (!drill) return;
    setConfirmRedo(false);
    setReopened(false);
    setResult(null);
    setAnswer('');
    setCalculationAnswer(generatedCalculationAnswer(drill.drill_data, drill.prompt, drill.chart_json));
    setTimedOut(false);
    setSecondsLeft(drill.time_limit_seconds);
    startedAtRef.current = Date.now();
    setPhase('active');
  };

  const activeCase = drill && drill.skill === 'case_math' ? parseCaseMathBrief(drill.chart_json) : null;
  const activeChart = drill && !activeCase ? parseChart(drill.chart_json) : null;
  const activeExhibit: LibraryExhibit | null = activeChart
    ? {
        id: `generated-drill-${drill?.id || 'preview'}`,
        kind: ({ column: 'vertical-bar', bar: 'horizontal-bar', line: 'line', pie: 'pie' } as const)[resolveDrillChartType(activeChart)],
        title: activeChart.title,
        unit: activeChart.unit,
        categories: activeChart.data.map((point) => point.label),
        series: [{ name: activeChart.unit || 'Value', values: activeChart.data.map((point) => point.value) }],
        mutuallyExclusive: true,
        analyticalPurpose: 'Interpret the exhibit and use its values to answer the drill prompt.',
      }
    : null;
  const timerFraction = drill ? secondsLeft / Math.max(drill.time_limit_seconds, 1) : 0;
  const displayedResultScore = result && drill
    ? (drill.skill === 'market_sizing' && result.scoring ? deriveOverallScore(result.scoring.criteria) : result.score)
    : null;
  const timerTone = timedOut
    ? 'text-[var(--space-semantic-danger)]'
    : timerFraction <= 0.25
      ? 'text-[var(--space-semantic-warning)]'
      : 'text-[var(--space-text-primary)]';

  return (
    <div className="h-full overflow-y-auto bg-[var(--space-surface-page)] [&_button]:min-h-11 [&_button]:min-w-11">
      {/* Full-bleed case workspace: chart grids, prompts, answers, and review
          panels use the entire app width with modest responsive gutters. */}
      <div className="w-full px-3 py-4 sm:px-6 lg:px-8">
        {/* ------------------------------------------------ header */}
        <header className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] sm:h-10 sm:w-10">
            <Zap className="h-4 w-4 text-[var(--space-text-brand)] sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">Case Drill</h1>
            <p className={`mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)] sm:text-sm ${libraryCompact && mode === 'library' ? 'lg:hidden' : ''}`}>
              Practise one focused skill in the Question Library. Full open-ended cases live in{' '}
              <button
                type="button"
                className="font-semibold text-[var(--space-text-brand)] underline-offset-2 hover:underline"
                onClick={() => window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill-log' } }))}
                data-testid="link-open-case-pool"
              >
                Case Pool
              </button>
              .
            </p>
          </div>
        </header>

        {error && (
          <div className="mt-4 rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] px-4 py-3 text-sm text-[var(--space-semantic-danger)]" data-testid="drill-error">
            <p>{error}</p>
            {phase === 'pick' && (
              <button
                type="button"
                onClick={() => void startDrill(lastSkillRef.current)}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[var(--space-semantic-danger)] px-3 py-1.5 text-xs font-semibold text-[var(--space-semantic-danger)] transition-colors hover:bg-[var(--space-surface-muted)]"
                data-testid="button-retry-drill"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try again
              </button>
            )}
          </div>
        )}

        {/* ---------------------------------- question library */}
        {phase === 'pick' && mode === 'library' && (
          <Suspense
            fallback={
              <div className="mt-4 flex justify-center py-8" aria-busy="true">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--space-text-brand)]" />
              </div>
            }
          >
            <QuestionLibrary onCompactLayoutChange={setLibraryCompact} />
          </Suspense>
        )}

        {/* ------------------------------------------------ picker */}
        {phase === 'pick' && mode === 'coach' && (
          <div className="mt-4 sm:mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Pick a sub-skill</h2>
              {prioritySkillId && (
                <span className={`${tw.badge.default} ${tw.badge.primary}`} data-testid="badge-case-type-filter">
                  <Target className="mr-1 inline h-3 w-3" /> Recommended case filter applied
                </span>
              )}
              {skillOrder.personalized && skillOrder.matchLabel ? (
                <span className={`${tw.badge.default} ${tw.badge.primary}`} data-testid="badge-personalized">
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  Ordered for your {skillOrder.matchLabel} match
                </span>
              ) : (
                <span className={`${tw.badge.default} ${tw.badge.neutral}`}>
                  General set - share your CV with Mate to personalize it
                </span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {skillOrder.ids.map((skillId) => {
                const spec = MICRO_SKILLS.find((s) => s.id === skillId);
                if (!spec) return null;
                const Icon = SKILL_ICONS[skillId] || Zap;
                const stats = skillStats.get(skillId);
                const avg = stats && stats.scored > 0 ? stats.totalScore / stats.scored : null;
                return (
                  <button
                    key={skillId}
                    type="button"
                    onClick={() => void startDrill(skillId)}
                    className={`group flex flex-col rounded-2xl border bg-[var(--space-surface-card)] p-3 text-left sm:p-3.5 transition-all hover:border-[var(--space-brand-primary)] hover:shadow-md ${prioritySkillId === skillId ? 'border-[var(--space-brand-primary)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)]' : 'border-[var(--space-border-default)]'}`}
                    data-testid={`button-skill-${skillId}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-[var(--space-text-brand)]" />
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--space-text-muted)]">
                        <Timer className="h-3 w-3" />
                        {formatClock(spec.seconds)}
                      </span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-[var(--space-text-primary)]">{spec.label}</span>
                    <span className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-muted)]">{spec.hint}</span>
                    <span className="mt-2 text-[10px] font-medium text-[var(--space-text-muted)]">
                      {stats && stats.reps > 0 ? `Reps: ${stats.reps}` : 'No Reps Yet'}
                    </span>
                    {avg !== null ? <DrillScoreBadge average score={avg} className="mt-1 self-start" /> : null}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => void startDrill(null)}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary}`}
              data-testid="button-skill-surprise"
            >
              <Shuffle className="h-4 w-4" />
              Surprise me - my least-practiced skill
            </button>

            {/* stats + recent reps */}
            {totalReps > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-4 text-xs text-[var(--space-text-secondary)]">
                  <span>
                    Reps: <strong className="text-[var(--space-text-primary)]">{totalReps}</strong> Total
                  </span>
                  {averageScore !== null && (
                    <DrillScoreBadge average score={averageScore} />
                  )}
                </div>
                <ul className="mt-2 divide-y divide-[var(--space-border-default)] rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
                  {(drills || []).slice(0, 8).map((row) => {
                    const Icon = SKILL_ICONS[row.skill] || Zap;
                    // A completed or revealed rep can be reopened to its saved
                    // feedback; an unfinished rep keeps its existing read-only row.
                    const reviewable = row.status === 'completed' || row.status === 'skipped';
                    const rawRowScore = parseDrillScore(row.score);
                    const rowScore10 = rawRowScore === null ? null : rawRowScore * (10 / scoreScaleOf(row));
                    const statusBadge = row.status === 'completed' ? (
                      <>
                        <span className={`${tw.badge.default} ${tw.badge.neutral}`} data-testid={`badge-completed-${row.id}`}>Completed</span>
                        <DrillScoreBadge score={rowScore10} testId={`badge-score-${row.id}`} />
                      </>
                    ) : row.status === 'skipped' ? (
                      <span className={`${tw.badge.default} ${tw.badge.neutral}`}>Skipped</span>
                    ) : (
                      <span className={`${tw.badge.default} ${tw.badge.neutral}`}>Unfinished</span>
                    );
                    const rowInner = (
                      <>
                        <Icon className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-[var(--space-text-primary)]">
                            {capitaliseLineStarts(row.skill_label || row.skill)}
                          </p>
                          <p className="text-[10px] text-[var(--space-text-muted)]">
                            {reviewable
                              ? `${row.status === 'completed' ? '' : 'Answer revealed \u00b7 '}${timeAgo(row.completed_on || row.created_at)}`
                              : timeAgo(row.created_at)}
                          </p>
                        </div>
                        <div className="flex min-w-0 max-w-[55%] flex-shrink-0 flex-wrap items-center justify-end gap-1">{statusBadge}</div>
                        {reviewable ? <Eye className="h-3.5 w-3.5 flex-shrink-0 text-[var(--space-text-muted)]" /> : null}
                      </>
                    );
                    return (
                      <li key={row.id}>
                        {reviewable ? (
                          <button
                            type="button"
                            onClick={() => reopenDrill(row)}
                            className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-[var(--space-surface-muted)]"
                            data-testid={`button-reopen-drill-${row.id}`}
                          >
                            {rowInner}
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 px-3.5 py-2.5">{rowInner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------ generating */}
        {phase === 'generating' && (
          <div className="mt-10 flex flex-col items-center text-center sm:mt-16" data-testid="drill-generating">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--space-text-brand)]" />
            <p className="mt-3 text-sm font-semibold text-[var(--space-text-primary)]">
              {lastSkillRef.current === 'case_math' ? 'Mate is building your mini-case…' : 'Mate is building your drill…'}
            </p>
            <p className="mt-1 text-xs text-[var(--space-text-muted)]">
              {lastSkillRef.current === 'case_math'
                ? 'Linked data, layered questions - plus a double-check that every number reconciles.'
                : 'Fresh prompt every time - the clock starts the moment it appears.'}
            </p>
          </div>
        )}

        {/* ------------------------------------------------ active drill */}
        {(phase === 'active' || phase === 'grading') && drill && (
          <div className="mt-4 sm:mt-5" data-testid="drill-active">
            {/* timer */}
            <div className="sticky top-0 z-10 -mx-3 bg-[var(--space-surface-page)] px-3 pb-2 pt-1 sm:-mx-6 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 shadow-sm sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-2">
                  <span className={`${tw.badge.default} ${tw.badge.primary}`}>{drill.skill_label || drill.skill}</span>
                  {timedOut && (
                    <span className={`${tw.badge.default} ${tw.badge.danger}`} data-testid="badge-times-up">
                      Time's up
                    </span>
                  )}
                </div>
                <div className={`flex items-center gap-1.5 font-mono text-lg font-bold tabular-nums ${timerTone}`} data-testid="drill-timer">
                  <Timer className="h-4 w-4" />
                  {formatClock(secondsLeft)}
                </div>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${timedOut ? 'bg-[var(--space-semantic-danger)]' : 'bg-[var(--space-brand-primary-600)]'}`}
                  style={{ width: `${Math.max(0, Math.min(100, timerFraction * 100))}%` }}
                />
              </div>
            </div>

            {/* prompt + data */}
            <div className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4">
              {activeCase ? (
                <CaseMathBriefView brief={activeCase} />
              ) : (
                <>
                  {drill.drill_data ? (
                    <pre className="whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-3 font-[inherit] text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="drill-data">
                      {nfDrill(capitaliseLineStarts(drill.drill_data))}
                    </pre>
                  ) : null}
                  {activeExhibit ? (
                    <div className={drill.drill_data ? 'mt-3' : ''}>
                      <ExhibitRenderer exhibits={[activeExhibit]} />
                    </div>
                  ) : null}
                  <div className={`${drill.drill_data || activeExhibit ? 'mt-3 border-t border-[var(--space-border-default)] pt-3' : ''}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Question</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-primary)]" data-testid="drill-prompt">
                      {nfDrill(capitaliseLineStarts(drill.prompt))}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* answer */}
            <div className="mt-3">
              {drill.skill === 'calculations' ? (
                <CalculationAnswerBuilder
                  value={calculationAnswer}
                  onChange={(next) => { setCalculationAnswer(next); trackCoachSolving('answer_typed'); }}
                  disabled={timedOut || phase === 'grading'}
                />
              ) : drill.skill === 'market_sizing' ? (
                <MarketSizingAnswerBuilder value={marketSizingDraft} onChange={(next) => { setMarketSizingDraft(next); setError(''); trackCoachSolving('answer_typed'); }} answerUnit="VND per year" disabled={timedOut || phase === 'grading'} />
              ) : (
                <textarea
                  value={answer}
                  onChange={(event) => { setAnswer(event.target.value); trackCoachSolving('answer_typed'); }}
                  readOnly={timedOut || phase === 'grading'}
                  rows={6}
                  placeholder={
                    drill.skill === 'creativity'
                      ? 'One idea per line - go for volume and variety…'
                      : drill.skill === 'structures'
                        ? 'Your MECE branches - short lines, one branch per line with its sub-points…'
                        : drill.skill === 'case_math'
                          ? 'Answer each question in order - show the arithmetic for every step…'
                          : 'Type your answer - show your working in short lines…'
                  }
                  className={`${tw.input.base} ${tw.input.default} min-h-[110px] text-sm leading-6 sm:min-h-[130px] ${timedOut ? 'opacity-80' : ''}`}
                  data-testid="input-drill-answer"
                />
              )}
              {timedOut && (
                <p className="mt-1.5 text-xs text-[var(--space-semantic-danger)]">
                  The clock hit zero - submit what you have (strong partials still score) or reveal the model answer.
                </p>
              )}
              <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void finishDrill(false)}
                  disabled={phase === 'grading'}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.primary} ${phase === 'grading' ? tw.button.disabled : ''}`}
                  data-testid="button-submit-drill"
                >
                  {phase === 'grading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {phase === 'grading' ? 'Mate is grading…' : timedOut ? 'Submit what I have' : 'Submit for feedback'}
                </button>
                <button
                  type="button"
                  onClick={() => void finishDrill(true)}
                  disabled={phase === 'grading'}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.ghost} ${phase === 'grading' ? tw.button.disabled : ''}`}
                  data-testid="button-skip-drill"
                >
                  <Eye className="h-4 w-4" />
                  Show model answer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------ result */}
        {phase === 'result' && result && drill && (() => {
          const answerText = reopened ? String(drill.answer_text || '') : answer;
          const sizingAttempt = drill.skill === 'market_sizing'
            ? (reopened ? parseMarketSizingAttempt(drill.answer_text) : marketSizingDraft)
            : null;
          const answered = !result.skipped && (drill.skill === 'calculations'
            ? reopened
              ? /\d/.test(answerText.replace(/^[\s\S]*?FINAL NUMERICAL ANSWERS/i, '').replace(/\b(?:result|step|row)\s*\d+/gi, ''))
              : calculationAnswer.finalAnswers.some((item) => item.value.trim()) || calculationAnswer.formulaRows.some((row) => row.numbers.some((slot) => slot.value.trim()))
            : sizingAttempt
              ? sizingAttempt.components.some((component: any) => String(component?.value ?? '').trim()) || Boolean(sizingAttempt.manualResult?.trim())
              : hasLearnerResponse(answerText));
          const outcome = result.skipped ? 'not-answered' as const : resultOutcome(displayedResultScore, 10, { answered });
          const focus = result.feedbackPriorities.nextStep?.action || '';
          const nextAction = chooseNextAction(outcome, {
            retry: result.skipped ? null : { kind: 'retry', label: 'Try this drill again', detail: focus ? `Focus on one thing: ${focus}` : 'Answer it again, using what the worked answer showed.', onSelect: () => setConfirmRedo(true) },
            'next-question': { kind: 'next-question', label: `New ${drill.skill_label || 'drill'}`, detail: 'Mate builds a fresh drill on the same skill.', onSelect: () => void startDrill(drill.skill) },
          });
          return (
          <div className="mt-4 sm:mt-5" data-testid="drill-result">
            <CaseResultView
              score={result.skipped ? null : displayedResultScore}
              scale={10}
              outcome={outcome}
              completedOn={reopened ? drill.completed_on : undefined}
              summaryNote={result.skipped ? 'Answer revealed - not scored. Study the worked answer, then take a fresh rep.' : timedOut ? `Submitted after the ${formatClock(drill.time_limit_seconds)} buzzer.` : undefined}
              feedback={result.skipped
                ? { worked: [], failed: ['You revealed the model answer before submitting, so nothing was graded.'] }
                : buildReasoningFeedback({
                    criteria: result.scoring?.criteria || [],
                    worked: result.feedback?.strengths || [],
                    failed: result.feedback?.improvements || [],
                    evidenceToRevisit: result.feedbackPriorities.evidenceToRevisit,
                    exclude: focus ? [focus] : [],
                  })}
              criteria={result.skipped ? [] : result.scoring?.criteria || []}
              learnerResponse={answered && drill.skill === 'calculations' ? (
                reopened ? (
                  <CalculationResultSummaryView
                    serialized={answerText}
                    specs={displayCalculationSpecs(generatedCalculationAnswer(drill.drill_data, drill.prompt, drill.chart_json).finalAnswers)}
                    title="Your submitted results"
                  />
                ) : (
                  <CalculationResultSummaryView value={{ ...calculationAnswer, finalAnswers: displayCalculationSpecs(calculationAnswer.finalAnswers) }} title="Your submitted results" />
                )
              ) : answered && sizingAttempt ? (
                <MarketSizingAttemptSummary value={sizingAttempt} answerUnit="VND per year" />
              ) : undefined}
              learnerResponseText={answered && drill.skill !== 'calculations' && !sizingAttempt ? capitaliseLineStarts(answerText) : ''}
              workedAnswer={coachWorkedAnswer(drill, result)}
              unavailableReason={`Mate could not load the worked answer for drill #${drill.id}.`}
              nextAction={confirmRedo ? null : nextAction}
              extras={!reopened && !result.skipped && result.score != null ? (
                <PercentileRankingWidget
                  app="case_drill"
                  scorePercent={Math.round((result.score / 10) * 100)}
                  timeSeconds={result.elapsedSeconds}
                  submissionKey={`case-drill:${drill.id}`}
                />
              ) : undefined}
              format={nfDrill}
              testId="drill-result-view"
            />

            {confirmRedo ? (
              <div className="mt-3 flex flex-col gap-2 rounded-xl border border-[var(--space-semantic-warning)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center" data-testid="drill-redo-confirm">
                <p className="min-w-0 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                  Start over? This clears the current answer fields. Your next successful submission will replace this saved feedback.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmRedo(false)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.ghost}`}
                    data-testid="button-cancel-redo-drill"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={redoDrill}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.primary}`}
                    data-testid="button-confirm-redo-drill"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Yes, start over
                  </button>
                </div>
              </div>
            ) : null}
            <div className="mt-3 flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
                <button
                  type="button"
                  onClick={() => {
                    setPhase('pick');
                    setMode('library');
                    setDrill(null);
                    setResult(null);
                    setReopened(false);
                    setConfirmRedo(false);
                  }}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary}`}
                  data-testid="button-back-case-library"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to drills
                </button>
            </div>
          </div>
          );
        })()}
      </div>
    </div>
  );
}
