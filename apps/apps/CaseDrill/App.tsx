// Casemate "Case Drill" — rapid micro-drills (v1).
//
// Where Case Pool (apps/CaseDrillLog) runs FULL cases end-to-end, this app is
// the CaseCoach-style rep room: the candidate picks ONE sub-skill
// (Structures, Case Math, Market Sizing, Calculations, Charts, Creativity),
// Mate generates a fresh prompt, a short countdown starts, and the moment
// they submit they get a structured coaching result (micro-drill-v1.3): how
// to approach that drill type, a model answer, feedback on their own answer,
// and concrete next steps — not just a score blurb.
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

import { useEffect, useMemo, useRef, useState } from 'react';
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
import { tw } from '../../lib/colors';
import PaywallGate from '../../components/PaywallGate';
import QuestionLibrary from '../../components/QuestionLibrary';
import PercentileRankingWidget from '../../components/PercentileRankingWidget';
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

interface DrillResult {
  skipped: boolean;
  score: number | null;
  feedback: DrillFeedback | null;
  /** Seconds from the drill appearing to submission — feeds the ranking widget. */
  elapsedSeconds: number;
  modelAnswer: string;
  /** Structured Case Math worked solution (micro-drill-v1.4), when available. */
  solution: CaseMathSolution | null;
  /** How to approach this TYPE of drill — 3-5 concrete method steps. */
  approach: string[];
  /** 1-3 concrete things to practice next. */
  nextSteps: string[];
}

/* Case Math linked mini-case (micro-drill-v1.4) — the structured case brief
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
  return { title: capitaliseLineStarts(String(spec.title || '').trim()) || 'Case Math', context, dataTable, questions };
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
    .split('\n')
    .map((line) => line.replace(/^([^A-Za-zÀ-ỹ]*)([a-zà-ỹ])/, (_, prefix, first) => `${prefix}${first.toUpperCase()}`))
    .join('\n');
}

const SKILL_ICONS: Record<string, typeof Network> = {
  structures: Network,
  case_math: Sigma,
  market_sizing: Globe,
  calculations: Calculator,
  charts: BarChart3,
  creativity: Lightbulb,
};

// Which micro-skills matter most for each full-case type — this is how the
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
        .map((p: any) => ({ label: capitaliseLineStarts(String(p.label || '')), value: Number(p.value) }))
    : [];
  if (data.length < 2) return null;
  return {
    type: String(chart.type || 'bar'),
    title: capitaliseLineStarts(String(chart.title || 'Exhibit')),
    unit: capitaliseLineStarts(String(chart.unit || '')),
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

/* UX fix #5: whenever the case-math data table carries comparable figures
 * (≥2 rows sharing one unit — e.g. several VND amounts, several %), the same
 * numbers ALSO render as a bar chart right below the table. The table stays
 * the authoritative reference; the chart is a visual aid, never a
 * replacement. Rows with mixed or sentence-like values are left uncharted. */
interface CaseMathChartView {
  unit: string;
  points: Array<{ label: string; value: number }>;
}

function caseMathChartOf(rows: CaseMathTableRow[]): CaseMathChartView | null {
  const groups = new Map<string, CaseMathChartView>();
  rows.forEach((row) => {
    const text = String(row.value || '').trim();
    const match = text.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
    if (!match) return;
    const value = Number(match[0]);
    if (!Number.isFinite(value) || value <= 0) return;
    const unit = text.replace(/-?[\d.,]+/g, '').replace(/\s+/g, ' ').trim();
    if (unit.length > 12) return; // sentence-like value — not a data point
    const key = unit.toLowerCase();
    const group = groups.get(key) || { unit, points: [] };
    group.points.push({ label: row.label, value });
    groups.set(key, group);
  });
  // Within each unit group, keep only the largest COMPARABLE subset — case
  // briefs routinely mix magnitudes in one unit (a per-cup price next to a
  // monthly rent), and charting those together is dishonest. Sorting by
  // value, the longest run whose max/min stays ≤ 40 charts cleanly.
  let best: CaseMathChartView | null = null;
  groups.forEach((group) => {
    const sorted = group.points.slice().sort((a, b) => a.value - b.value);
    let runStart = 0;
    let bestRun: typeof sorted = [];
    for (let end = 0; end < sorted.length; end += 1) {
      while (sorted[end].value / sorted[runStart].value > 40) runStart += 1;
      if (end - runStart + 1 > bestRun.length) bestRun = sorted.slice(runStart, end + 1);
    }
    if (bestRun.length >= 2 && (!best || bestRun.length > best.points.length)) {
      // Restore the original table order for the charted rows.
      const kept = new Set(bestRun);
      best = { unit: group.unit, points: group.points.filter((point) => kept.has(point)).slice(0, 8) };
    }
  });
  return best;
}

function CaseMathChart({ chart }: { chart: CaseMathChartView }) {
  return (
    <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="case-math-chart">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
        Exhibit — comparable figures{chart.unit ? ' (' + chart.unit + ')' : ''}
      </p>
      <DrillColumnChart
        chart={{
          type: 'column',
          title: 'Comparable figures',
          unit: chart.unit,
          data: chart.points,
        }}
      />
      <p className="mt-2 text-[10px] leading-4 text-[var(--space-text-muted)]">
        Same numbers as the table above — the chart is a visual aid only.
      </p>
    </div>
  );
}

function CaseMathBriefView({ brief }: { brief: CaseMathBrief }) {
  const chart = caseMathChartOf(brief.dataTable);
  return (
    <div data-testid="case-math-brief">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Case context</p>
      <h3 className="mt-0.5 text-sm font-bold text-[var(--space-text-primary)]">{brief.title}</h3>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-primary)]">{brief.context}</p>

      <div className="mt-3 overflow-hidden rounded-xl border border-[var(--space-border-default)]" data-testid="case-math-data-table">
        <p className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          Given data — each figure feeds the next
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

      {chart && <CaseMathChart chart={chart} />}

      <div className="mt-3" data-testid="case-math-questions">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          Questions — answer in order, each step feeds the next
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
              {step.label ? ` — ${step.label}` : ''}
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

/* ---------------------------------------------------------------------------
 * Main app
 * ------------------------------------------------------------------------- */

type Phase = 'pick' | 'generating' | 'active' | 'grading' | 'result';

// Casemate freemium boundary: Case Drill is part of Casemate Pro.
// The gate below shows all three native-checkout plans to users whose trial
// ended; Fit Assessment and matching remain completely free.
export default function CaseDrill() {
  return (
    <PaywallGate appId="case-drill" appName="Case Drill">
      <CaseDrillInner />
    </PaywallGate>
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

  // Case Drill has two practice modes.
  //   'library' — 500 prebuilt questions across five consulting skills (default,
  //               no AI call, so every question opens instantly).
  //   'coach'   — the existing micro-drill flow generated and graded by Mate.
  const [mode, setMode] = useState<'library' | 'coach'>('library');
  const [phase, setPhase] = useState<Phase>('pick');
  const [drill, setDrill] = useState<MicroDrill | null>(null);
  const [answer, setAnswer] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [result, setResult] = useState<DrillResult | null>(null);
  const [error, setError] = useState('');
  const [prioritySkillId, setPrioritySkillId] = useState<string | null>(null);
  const startedAtRef = useRef<number>(0);
  // Last explicitly requested skill — powers the retry button and the
  // case-math-specific generating copy (null = "surprise me").
  const lastSkillRef = useRef<string | null>(null);

  useEffect(() => {
    const applyFocus = (skillId: unknown) => {
      const id = typeof skillId === 'string' && MICRO_SKILLS.some((skill) => skill.id === skillId) ? skillId : null;
      if (!id) return;
      setPrioritySkillId(id);
      setMode('coach');
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
    return () => window.removeEventListener('casemateCaseDrillFocus', onFocus);
  }, [sessionId]);

  // Countdown — driven by wall-clock time so a background tab can't stretch
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
        bucket.totalScore += Number(row.score);
      }
    });
    return stats;
  }, [drills]);

  const totalReps = (drills || []).length;
  const gradedDrills = (drills || []).filter((row) => row.status === 'completed' && Number.isFinite(Number(row.score)));
  const averageScore = gradedDrills.length
    ? gradedDrills.reduce((sum, row) => sum + Number(row.score), 0) / gradedDrills.length
    : null;

  const startDrill = async (skillId: string | null) => {
    lastSkillRef.current = skillId;
    if (!sessionId) {
      setError('Sign in first so your drills are saved to your log.');
      return;
    }
    setError('');
    setResult(null);
    setPhase('generating');
    try {
      const response = await callMicroDrillServerFunction('generate', skillId ? { skill: skillId } : {}, sessionId);
      const fresh = response.drill as MicroDrill;
      setDrill(fresh);
      setAnswer('');
      setTimedOut(false);
      setSecondsLeft(fresh.time_limit_seconds);
      startedAtRef.current = Date.now();
      setPhase('active');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Mate could not generate this drill. Please try again.');
      setPhase('pick');
    }
  };

  const finishDrill = async (skip: boolean) => {
    if (!drill || !sessionId) return;
    const elapsed = Math.min(drill.time_limit_seconds, Math.round((Date.now() - startedAtRef.current) / 1000));
    setError('');
    setPhase('grading');
    try {
      const response = await callMicroDrillServerFunction(
        'grade',
        {
          drillId: drill.id,
          answer: skip ? '' : answer.trim(),
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
      setResult({
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
        nextSteps: asList(response.next_steps, 3),
      });
      setPhase('result');
      refreshDrills();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Mate could not grade this drill. Please try again.');
      setPhase('active');
    }
  };

  const activeCase = drill && drill.skill === 'case_math' ? parseCaseMathBrief(drill.chart_json) : null;
  const activeChart = drill && !activeCase ? parseChart(drill.chart_json) : null;
  const timerFraction = drill ? secondsLeft / Math.max(drill.time_limit_seconds, 1) : 0;
  const timerTone = timedOut
    ? 'text-[var(--space-semantic-danger)]'
    : timerFraction <= 0.25
      ? 'text-[var(--space-semantic-warning)]'
      : 'text-[var(--space-text-primary)]';

  return (
    <div className="h-full overflow-y-auto bg-[var(--space-surface-page)] [&_button]:min-h-11 [&_button]:min-w-11">
      {/* Full-bleed: Casemate is used on a laptop, not a phone, so the drill
          room spans the whole window rather than a narrow centred column. */}
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* ------------------------------------------------ header */}
        <header className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] sm:h-10 sm:w-10">
            <Zap className="h-4 w-4 text-[var(--space-text-brand)] sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">Case Drill</h1>
            <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)] sm:text-sm">
              A 500-question library across Charts, Structures, Calculations, Creativity, and Market Sizing — plus timed micro-drills graded by Mate. Full cases live in{' '}
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

        {/* ---------------------------------- question library / practice with Mate */}
        {phase === 'pick' && (
          <div
            className="mt-4 flex rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-0.5 sm:mt-5"
            role="tablist"
            aria-label="Choose a practice mode"
          >
            {([
              { id: 'library' as const, label: 'Question Library', hint: 'Instant' },
              { id: 'coach' as const, label: 'Practice with Mate', hint: 'Graded' },
            ]).map(({ id, label, hint }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`flex-1 rounded-lg px-3 py-2 text-center transition-colors ${
                  mode === id
                    ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                    : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'
                }`}
                data-testid={`tab-drill-${id}`}
              >
                <span className="block text-xs font-semibold">{label}</span>
                <span className={`block text-[10px] ${mode === id ? 'opacity-80' : 'text-[var(--space-text-muted)]'}`}>
                  {hint}
                </span>
              </button>
            ))}
          </div>
        )}

        {phase === 'pick' && mode === 'library' && <QuestionLibrary />}

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
                  General set — share your CV with Mate to personalize it
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
                      {stats && stats.reps > 0
                        ? `Reps: ${stats.reps}${avg ? ` · Average: ${avg.toFixed(1)}/5` : ''}`
                        : 'No Reps Yet'}
                    </span>
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
              Surprise me — my least-practiced skill
            </button>

            {/* stats + recent reps */}
            {totalReps > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-4 text-xs text-[var(--space-text-secondary)]">
                  <span>
                    Reps: <strong className="text-[var(--space-text-primary)]">{totalReps}</strong> Total
                  </span>
                  {averageScore !== null && (
                    <span>
                      Average: <strong className="text-[var(--space-text-primary)]">{averageScore.toFixed(1)}/5</strong>
                    </span>
                  )}
                </div>
                <ul className="mt-2 divide-y divide-[var(--space-border-default)] rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
                  {(drills || []).slice(0, 8).map((row) => {
                    const Icon = SKILL_ICONS[row.skill] || Zap;
                    return (
                      <li key={row.id} className="flex items-center gap-3 px-3.5 py-2.5">
                        <Icon className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-[var(--space-text-primary)]">
                            {capitaliseLineStarts(row.skill_label || row.skill)}
                          </p>
                          <p className="text-[10px] text-[var(--space-text-muted)]">{timeAgo(row.created_at)}</p>
                        </div>
                        {row.status === 'completed' && Number.isFinite(Number(row.score)) ? (
                          <span className={`${tw.badge.default} ${Number(row.score) >= 4 ? tw.badge.success : Number(row.score) >= 3 ? tw.badge.primary : tw.badge.warning}`}>
                            {row.score}/5
                          </span>
                        ) : row.status === 'skipped' ? (
                          <span className={`${tw.badge.default} ${tw.badge.neutral}`}>Skipped</span>
                        ) : (
                          <span className={`${tw.badge.default} ${tw.badge.neutral}`}>Unfinished</span>
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
                ? 'Linked data, layered questions — plus a double-check that every number reconciles.'
                : 'Fresh prompt every time — the clock starts the moment it appears.'}
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
                  <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-primary)]" data-testid="drill-prompt">
                    {capitaliseLineStarts(drill.prompt)}
                  </p>
                  {drill.drill_data ? (
                    <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-3 font-[inherit] text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="drill-data">
                      {capitaliseLineStarts(drill.drill_data)}
                    </pre>
                  ) : null}
                  {activeChart ? (
                    <div className="mt-3">
                      <DrillChart chart={activeChart} />
                    </div>
                  ) : null}
                </>
              )}
            </div>

            {/* answer */}
            <div className="mt-3">
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                readOnly={timedOut || phase === 'grading'}
                rows={6}
                placeholder={
                  drill.skill === 'creativity'
                    ? 'One idea per line — go for volume and variety…'
                    : drill.skill === 'structures'
                      ? 'Your MECE branches — short lines, one branch per line with its sub-points…'
                      : drill.skill === 'case_math'
                        ? 'Answer each question in order — show the arithmetic for every step…'
                        : 'Type your answer — show your working in short lines…'
                }
                className={`${tw.input.base} ${tw.input.default} min-h-[110px] text-sm leading-6 sm:min-h-[130px] ${timedOut ? 'opacity-80' : ''}`}
                data-testid="input-drill-answer"
              />
              {timedOut && (
                <p className="mt-1.5 text-xs text-[var(--space-semantic-danger)]">
                  The clock hit zero — submit what you have (strong partials still score) or reveal the model answer.
                </p>
              )}
              <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void finishDrill(false)}
                  disabled={phase === 'grading' || !answer.trim()}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.primary} ${phase === 'grading' || !answer.trim() ? tw.button.disabled : ''}`}
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
        {phase === 'result' && result && drill && (
          <div className="mt-4 sm:mt-5" data-testid="drill-result">
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <div className="flex items-center gap-3">
                {result.skipped ? (
                  <>
                    <Flag className="h-6 w-6 text-[var(--space-text-muted)]" />
                    <div>
                      <p className="text-sm font-bold text-[var(--space-text-primary)]">Answer revealed — not scored</p>
                      <p className="text-xs text-[var(--space-text-muted)]">Skipping a rep is part of learning. Study the key, then go again.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base font-extrabold sm:h-12 sm:w-12 sm:rounded-2xl sm:text-lg ${
                        (result.score || 0) >= 4
                          ? 'bg-[var(--space-semantic-success-100,#dcfce7)] text-[var(--space-semantic-success-700,#15803d)]'
                          : (result.score || 0) >= 3
                            ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                            : 'bg-[var(--space-semantic-warning-100,#fef3c7)] text-[var(--space-semantic-warning-700,#b45309)]'
                      }`}
                      data-testid="drill-score"
                    >
                      {result.score}/5
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--space-text-primary)]">{drill.skill_label || drill.skill} rep graded</p>
                      <p className="text-xs text-[var(--space-text-muted)]">
                        {timedOut ? 'Submitted after the buzzer — ' : ''}
                        {formatClock(drill.time_limit_seconds)} limit
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Percentile ranking vs every other user's graded drill. Only a
                  scored rep counts — a skipped rep records nothing. The drill id
                  keys the submission, so re-renders never double-count. */}
              {!result.skipped && result.score != null && (
                <PercentileRankingWidget
                  className="mt-3"
                  app="case_drill"
                  scorePercent={Math.round((result.score / 5) * 100)}
                  timeSeconds={result.elapsedSeconds}
                  submissionKey={`case-drill:${drill.id}`}
                />
              )}

              {/* 1 — the reusable method for this drill type */}
              {result.approach.length > 0 && (
                <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="drill-approach">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
                    <Compass className="h-3.5 w-3.5 flex-shrink-0" />
                    How to approach {drill.skill_label ? drill.skill_label : 'these'} drills
                  </p>
                  <ol className="mt-2 space-y-1.5">
                    {result.approach.map((step, index) => (
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

              {/* 2 — what good looks like on THIS drill (Case Math renders the
                  structured step-by-step solution; other skills the text key) */}
              {result.solution ? (
                <CaseMathSolutionView solution={result.solution} />
              ) : result.modelAnswer ? (
                <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
                    <Eye className="h-3.5 w-3.5 flex-shrink-0" />
                    Mate's model answer
                  </p>
                  <pre className="mt-1.5 whitespace-pre-wrap font-[inherit] text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="drill-model-answer">
                    {result.modelAnswer}
                  </pre>
                </div>
              ) : null}

              {/* 3 — feedback on their own answer (degrades gracefully on a skip) */}
              <div className="mt-3 rounded-xl border border-[var(--space-border-default)] p-3" data-testid="drill-answer-feedback">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Feedback on your answer</p>
                {result.skipped || !result.feedback ? (
                  <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="drill-feedback">
                    Nothing went in this rep, so there's no grade — compare the model answer above against how you would have attacked it, note the one step you'd have missed, then take another rep.
                  </p>
                ) : (
                  <>
                    {result.feedback.feedback ? (
                      <p className="mt-1.5 text-sm leading-6 text-[var(--space-text-secondary)]" data-testid="drill-feedback">
                        {result.feedback.feedback}
                      </p>
                    ) : null}
                    {(result.feedback.strengths.length > 0 || result.feedback.improvements.length > 0) && (
                      <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                        {result.feedback.strengths.length > 0 && (
                          <div className="rounded-xl bg-[var(--space-surface-muted)] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">What worked</p>
                            <ul className="mt-1.5 space-y-1">
                              {result.feedback.strengths.map((item, index) => (
                                <li key={index} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-semantic-success)]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {result.feedback.improvements.length > 0 && (
                          <div className="rounded-xl bg-[var(--space-surface-muted)] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">What was missing</p>
                            <ul className="mt-1.5 space-y-1">
                              {result.feedback.improvements.map((item, index) => (
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
                  </>
                )}
              </div>

              {/* 4 — where to take it next */}
              {result.nextSteps.length > 0 && (
                <div className="mt-3 rounded-xl border border-[var(--space-border-default)] p-3" data-testid="drill-next-steps">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
                    <Target className="h-3.5 w-3.5 flex-shrink-0" />
                    What to do next
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {result.nextSteps.map((item, index) => (
                      <li key={index} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                        <Flag className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-text-brand)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => void startDrill(drill.skill)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.primary}`}
                data-testid="button-drill-again"
              >
                <RefreshCw className="h-4 w-4" />
                Go again — {drill.skill_label || 'same skill'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase('pick');
                  setDrill(null);
                  setResult(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary}`}
                data-testid="button-switch-skill"
              >
                <ArrowLeft className="h-4 w-4" />
                Switch skill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
