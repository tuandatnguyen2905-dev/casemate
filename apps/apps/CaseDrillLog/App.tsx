import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Eye,
  Flag,
  FlaskConical,
  GraduationCap,
  Info,
  Lightbulb,
  Loader2,
  MessageSquareText,
  Network,
  PenLine,
  RefreshCw,
  Send,
  Shuffle,
  Sparkles,
  Table2,
  Target,
  TrendingDown,
  TrendingUp,
  Wrench,
  XCircle,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { tw } from '../../lib/colors';
import PaywallGate from '../../components/PaywallGate';
import CasePoolLibrary from '../../components/CasePoolLibrary';
import type { LibraryGradeResult } from '../../components/CasePoolLibrary';
import ConsultingToolkit from '../../components/ConsultingToolkit';
import PercentileRankingWidget from '../../components/PercentileRankingWidget';
import { CASE_POOL_LIBRARY, POOL_TYPE_LABELS } from '../../lib/casePoolLibrary';
import type { FullCase } from '../../lib/casePoolLibrary';
import { CONSULTING_FRAMEWORKS } from '../../lib/consultingFrameworks';
import { DIFFICULTY_LABELS } from '../../lib/caseLibraryShared';
import { callCaseDrillServerFunction } from './serverFunctions';
import { CASE_TYPE_CATALOG, relevantCaseTypesForDirection } from './caseTypeCatalog';
import type { RelevantCaseTypes } from './caseTypeCatalog';

// 'library' — 100 prebuilt cases, readable immediately on open (no AI call).
// 'toolkit' — reference area with 43 thinking frameworks, diagrams, and examples.
// 'practice'/'dashboard' — the original Case Room flow generated and graded by Mate, unchanged.
type Tab = 'library' | 'practice' | 'toolkit' | 'dashboard';

type JsonValue = Record<string, any> | any[] | string | null;

interface AssessmentResult {
  id: number;
  headline?: string;
  candidate_snapshot?: string;
  result_json?: JsonValue;
  created_at?: string;
}

interface PracticeCase {
  id: number;
  case_title: string;
  case_type: string;
  difficulty?: string;
  target_program?: string;
  target_industry?: string;
  target_function?: string;
  target_count?: number;
  readiness_bar?: number | string;
  source_assessment_id?: number;
  practice_focus?: string;
  prompt: string;
  case_data?: string;
  rubric_json?: JsonValue;
  status: 'pending' | 'completed';
  answer_text?: string;
  score?: number;
  score_breakdown_json?: JsonValue;
  recommendations_json?: JsonValue;
  completed_on?: string;
  created_at?: string;
}

declare global {
  interface Window {
    __APP_ID__?: string;
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

const DIMENSION_LABELS: Record<string, string> = {
  structure: 'Structure',
  math: 'Math',
  communication: 'Communication',
  recommendation_quality: 'Recommendation quality',
};

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

function asList(value: JsonValue | undefined): any[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function validTarget(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 100 ? parsed : null;
}

/* -------------------------------------------------------------------------
 * Case Library attempts
 *
 * A case solved in the Case Library tab is graded by the same hook and lands in
 * the same case_practice_cases table as a Case Room case, so it counts on the
 * dashboard, progress ring, and grade trend. Library rows are told apart by
 * rubric_json._casemate.source === 'library'; the library case they belong to
 * is stored in the queryable practice_focus column as 'library:<case id>'.
 * ----------------------------------------------------------------------- */

const LIBRARY_DIMENSION_LABELS: Array<{ key: string; label: string }> = [
  { key: 'structure', label: 'Structure' },
  { key: 'math', label: 'Math' },
  { key: 'communication', label: 'Communication' },
  { key: 'recommendation_quality', label: 'Recommendation' },
];

function libraryCaseIdOf(item: PracticeCase): string | null {
  const meta = caseMeta(item);
  if (meta.source !== 'library') return null;
  const fromMeta = String(meta.library_case_id || '').trim();
  if (fromMeta) return fromMeta;
  const focus = String(item.practice_focus || '');
  return focus.startsWith('library:') ? focus.slice('library:'.length) : null;
}

// The shared rubric for prebuilt Case Library cases — identical dimensions and
// weights to generated Case Room rubrics, so library grades stay comparable on
// the dashboard. (Client copy of the hook's LIBRARY_RUBRIC — the library grade
// is orchestrated client-side; see handleGradeLibraryCase.)
const LIBRARY_GRADE_RUBRIC = {
  structure: {
    weight: 25,
    excellent: 'A MECE structure tailored to THIS client question, stated up front and then actually followed.',
    watch_for: 'A memorised framework recited without adapting it to the client\u2019s real question.',
  },
  math: {
    weight: 25,
    excellent: 'Correct arithmetic worked from the exhibit figures, with the decisive numbers quoted explicitly.',
    watch_for: 'Conclusions asserted without computing anything from the exhibits, or figures misread.',
  },
  communication: {
    weight: 20,
    excellent: 'Answer-first, signposted, and concise enough to deliver out loud in an interview.',
    watch_for: 'A wall of text, or the recommendation buried at the very end.',
  },
  recommendation_quality: {
    weight: 30,
    excellent: 'A specific, decisive recommendation backed by the case numbers, with the main risk and a next step.',
    watch_for: "A vague 'it depends' with no decision, or advice the case data does not support.",
  },
};

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

/** Turn a stored row into the report shape the library component renders. */
function toLibraryResult(item: PracticeCase): LibraryGradeResult {
  const report = asObject(caseMeta(item).grade_report);
  const delta = asObject(report.delta);
  const breakdownRaw = asObject(item.score_breakdown_json);
  const breakdown = LIBRARY_DIMENSION_LABELS.map(({ key, label }) => {
    const dimension = asObject(breakdownRaw[key]);
    return {
      key,
      label,
      score: Number(dimension.score) || 0,
      evidence: String(dimension.evidence || ''),
      nextStep: String(dimension.next_step || ''),
    };
  }).filter((dimension) => dimension.score > 0);
  const recommendations = asList(item.recommendations_json)
    .map((entry) => {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        const row = entry as Record<string, unknown>;
        return { action: String(row.action || ''), why: String(row.why || '') };
      }
      return { action: String(entry || ''), why: '' };
    })
    .filter((entry) => entry.action.length > 0);
  return {
    score: Number(item.score) || 0,
    summary: String(report.summary || ''),
    answer: String(item.answer_text || ''),
    breakdown,
    matched: Array.isArray(delta.matched) ? delta.matched.map((line: unknown) => String(line)) : [],
    missing: Array.isArray(delta.missing) ? delta.missing.map((line: unknown) => String(line)) : [],
    recommendations,
  };
}

/** Flatten a library case's exhibits into the plain text the grader reads. */
function exhibitsToText(item: FullCase): string {
  return (item.data_exhibits || [])
    .map((exhibit, index) => {
      const heading = `Exhibit ${index + 1} \u2014 `;
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
    .join('\n\n');
}

interface StructuredAnswer {
  structure: string;
  math: string;
  recommendation: string;
  diagram: string;
}

// Handoff written by the chat's program guide panel ("Start Case Pool for
// this program") just before it dispatches openApp.
interface DrillPreset {
  program?: string;
  company?: string;
  caseType?: string;
  caseTypes?: string[];
  ts?: number;
}

const DRILL_PRESET_KEY = 'casemate-drill-preset';

// Difficulty dial (Easy / Medium / Hard): the user's last choice is persisted
// per session and applied to every NEWLY generated case — changing it never
// alters the case (or walkthrough) currently in progress.
type Difficulty = 'easy' | 'medium' | 'hard';
const DIFFICULTY_OPTIONS: Array<{ id: Difficulty; label: string; hint: string }> = [
  { id: 'easy', label: 'Easy', hint: 'More guidance and simple, round numbers — great for your first reps' },
  { id: 'medium', label: 'Medium', hint: 'Balanced — a realistic interview case' },
  { id: 'hard', label: 'Hard', hint: 'Ambiguous prompt, two exhibits, tougher multi-step quant — final-round level' },
];
const difficultyStorageKey = (sessionId: string) => `casemate-case-difficulty:${sessionId}`;

// Extra per-case state (mode, photo provenance, walkthrough transcript) rides
// inside rubric_json._casemate — the hook strips it before grading.
function caseMeta(item?: PracticeCase | null): Record<string, any> {
  return asObject(asObject(item?.rubric_json)._casemate);
}

function composeStructuredAnswer(sections: StructuredAnswer): string {
  const parts = [
    'STRUCTURE:\n' + sections.structure.trim(),
    'MATH & NUMBERS:\n' + sections.math.trim(),
    'RECOMMENDATION:\n' + sections.recommendation.trim(),
  ];
  if (sections.diagram.trim()) parts.push('FRAMEWORK DIAGRAM (outline):\n' + sections.diagram.trim());
  return parts.join('\n\n');
}

function parseJsonLoose(text: string): Record<string, any> {
  const raw = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Mate could not read this photo. Try a brighter, flatter shot of the page.');
  return JSON.parse(raw.slice(start, end + 1));
}

async function downscalePhoto(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Mate could not open that file. Please try another photo.'));
    reader.readAsDataURL(file);
  });
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('That file is not an image Mate can read. Use a JPG, PNG, or WebP photo.'));
    img.src = dataUrl;
  });
  const maxSide = 1800;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext('2d');
  if (!context) return dataUrl;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.88);
}

function buildPhotoPrompt(practiceCase: PracticeCase): string {
  return [
    "This photo shows a candidate's handwritten working notes for a case-interview practice question.",
    'CASE TITLE: ' + practiceCase.case_title,
    'CASE PROMPT: ' + practiceCase.prompt,
    'Transcribe and organize ONLY what the candidate actually wrote — never invent or complete their work. Write [unclear] where handwriting is illegible.',
    'Sort their work into three sections: structure (their framework or issue tree), math (their calculations, typed out), recommendation (their conclusion). If a section is missing from the page, return an empty string for it.',
    'If they drew a framework tree or diagram, reproduce it in "diagram" as an indented text outline using two spaces per level; otherwise return an empty string.',
    'Return ONLY valid JSON, no markdown, exactly this shape:',
    '{"structure":"string","math":"string","recommendation":"string","diagram":"string","legibility_note":"one short sentence if parts were unreadable, else empty string"}',
  ].join('\n');
}

// ---- Consulting framework toolkit ------------------------------------------
// Interactive scaffolding the candidate can open WHILE working a case: an
// issue-tree (MECE) builder with standard structure templates (profitability
// tree, market entry, market sizing, growth levers, M&A, competitive
// response) and a hypothesis-driven worksheet. Each tool composes text the
// candidate inserts straight into their working answer — the same tools
// consultants actually use to break cases.
const TREE_TEMPLATES: Array<{ id: string; label: string; match: RegExp; outline: string; info: { what: string; when: string } }> = [
  {
    id: 'blank',
    label: 'Blank MECE tree',
    info: {
      what: 'An empty MECE scaffold — core question, drivers, sub-questions — for building a structure tailored to this exact case.',
      when: 'Use it when no standard framework fits and you want to show original, case-specific structuring.',
    },
    match: /$^/,
    outline:
      'Core question: <restate the client question>\n  Driver 1: <first big driver>\n    <sub-question>\n    <sub-question>\n  Driver 2: <second big driver>\n    <sub-question>\n  Driver 3: <third big driver>\n    <sub-question>',
  },
  {
    id: 'profit',
    label: 'Profitability tree',
    info: {
      what: 'Splits profit into revenue and cost drivers so you can isolate exactly where the problem sits.',
      when: 'Use it whenever profits are falling, margins are shrinking, or results are below target.',
    },
    match: /profit|pricing/i,
    outline:
      'Profit = Revenue − Costs\n  Revenue\n    Price per unit\n    Volume\n      Market size\n      Market share\n      Mix by segment / product line\n  Costs\n    Variable costs (per unit × volume)\n    Fixed costs\n  Isolate first: which segment or line does the problem sit in?',
  },
  {
    id: 'entry',
    label: 'Market entry',
    info: {
      what: 'Weighs how attractive the market is against your client’s ability to win there, then how to enter and the economics.',
      when: 'Use it when the client is deciding whether to enter a new market, country, city, or segment.',
    },
    match: /entry/i,
    outline:
      'Should we enter?\n  Market attractiveness\n    Size & growth\n    Profitability / margins\n    Competition & regulation\n  Ability to win\n    Our strengths vs local players\n    Brand / channel / capability fit\n  How to enter\n    Build (organic)\n    Partner / JV\n    Acquire\n  Economics\n    Investment required\n    Expected return & payback\n    Key risks',
  },
  {
    id: 'sizing',
    label: 'Market sizing',
    info: {
      what: 'Builds an estimate from explicit assumptions — base × share × frequency × price — instead of guessing one number.',
      when: 'Use it when you must size a market or quantity and no exhibit hands you the answer.',
    },
    match: /sizing|estimat/i,
    outline:
      'Market size (bottom-up)\n  Base population / units\n  % who are potential users — state your assumption\n  Purchase frequency per year\n  Price per purchase\n  Size = base × % users × frequency × price\n  Sanity check: compare against a known anchor',
  },
  {
    id: 'growth',
    label: 'Growth levers',
    info: {
      what: 'Lays out every route to more revenue — core business, new segments, channels, products, geographies, M&A — so you can size and rank them.',
      when: 'Use it when the client wants to grow and you need a prioritized path, not a list of ideas.',
    },
    match: /growth/i,
    outline:
      'Grow revenue\n  Existing products, existing markets\n    Price\n    Volume / share\n  New segments or channels\n  New products / services\n  New geographies\n  Inorganic (partnerships, M&A)\n  Prioritize: size each lever, then sequence them',
  },
  {
    id: 'mna',
    label: 'M&A / acquisition',
    info: {
      what: 'Compares the target’s standalone value plus synergies against the asking price, risks, and integration challenges.',
      when: 'Use it when the client is deciding whether to acquire a company — and at what price.',
    },
    match: /m\s*&\s*a|acquisi|merger/i,
    outline:
      'Should we acquire?\n  Standalone value of the target\n  Synergies\n    Revenue synergies\n    Cost synergies\n  Price vs value\n  Risks & integration challenges\n  Decision: acquire / negotiate / walk away',
  },
  {
    id: 'response',
    label: 'Competitive response',
    info: {
      what: 'Quantifies how much a competitor’s move really threatens, then weighs response options by their economics.',
      when: 'Use it when a rival cuts prices, launches a product, or enters your client’s market.',
    },
    match: /competitive|response/i,
    outline:
      'How should we respond?\n  Quantify the threat\n    Which segments / how much revenue at risk?\n  Response options\n    Match the move\n    Differentiate\n    Defend key segments only\n    Do nothing (monitor)\n  Economics of each option\n  Recommendation backed by the numbers',
  },
  {
    id: 'launch',
    label: 'Product launch',
    info: {
      what: 'Structures a new product launch: who it is for, how it wins, how it reaches customers, and whether the numbers work.',
      when: 'Use it when the client is launching (or just launched) a new product — common in FMCG and e-commerce programs.',
    },
    match: /launch/i,
    outline:
      'Should we launch — and how?\n  Target & positioning\n    Who exactly is it for?\n    Why do they pick us over alternatives?\n  Go-to-market\n    Channels (retail / e-commerce / direct)\n    Pricing vs anchors\n    Launch marketing plan\n  Launch economics\n    Unit economics per sale\n    Break-even volume vs realistic demand\n  Risks & kill criteria',
  },
];

// Small ℹ️ affordance: tap to see “What is this for?” and “When to use it”
// for a framework — 1–2 sentences each, never a lecture.
function InfoTip({ label, what, when }: { label: string; what: string; when: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`What is ${label} for?`}
        title={`What is ${label} for?`}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[var(--space-text-muted)] transition-colors hover:text-[var(--space-text-brand)]"
        data-testid={`info-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span className="absolute right-0 top-full z-30 mt-1.5 block w-60 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-left shadow-lg">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">What is this for?</span>
          <span className="mt-0.5 block text-[11px] font-normal normal-case leading-4 tracking-normal text-[var(--space-text-secondary)]">{what}</span>
          <span className="mt-2 block text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">When to use it</span>
          <span className="mt-0.5 block text-[11px] font-normal normal-case leading-4 tracking-normal text-[var(--space-text-secondary)]">{when}</span>
        </span>
      )}
    </span>
  );
}

// Visual hypothesis → test → conclusion flow, filled live from the worksheet.
function HypothesisFlowDiagram({ hypothesis, tests, breaker }: { hypothesis: string; tests: string; breaker: string }) {
  const box = 'rounded-lg border px-2.5 py-1.5 text-[11px] leading-4';
  return (
    <div className="rounded-xl bg-[var(--space-surface-muted)] p-3" aria-label="Hypothesis-driven flow diagram">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Your hypothesis flow</p>
      <div className="flex flex-col items-stretch gap-1">
        <div className={`${box} border-[var(--space-brand-primary)] bg-[var(--space-surface-card)]`}>
          <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">1 · Hypothesis</span>
          <span className="text-[var(--space-text-secondary)]">{hypothesis.trim() || 'Commit to your most likely answer first'}</span>
        </div>
        <ChevronDown className="mx-auto h-3.5 w-3.5 text-[var(--space-text-muted)]" />
        <div className={`${box} border-[var(--space-border-strong)] bg-[var(--space-surface-card)]`}>
          <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">2 · Test it against the case facts</span>
          <span className="text-[var(--space-text-secondary)]">{tests.trim() || 'Check it with the exhibits and the numbers'}</span>
        </div>
        <ChevronDown className="mx-auto h-3.5 w-3.5 text-[var(--space-text-muted)]" />
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          <div className={`${box} border-[var(--space-semantic-success)] bg-[var(--space-surface-card)]`}>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">Holds → conclude</span>
            <span className="text-[var(--space-text-secondary)]">Make it your recommendation, backed by those numbers</span>
          </div>
          <div className={`${box} border-[var(--space-semantic-warning)] bg-[var(--space-surface-card)]`}>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--space-semantic-warning)]">Breaks → revise</span>
            <span className="text-[var(--space-text-secondary)]">{breaker.trim() || 'Name what would change your mind, then test the next branch'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworkToolkit({
  caseTypeLabel,
  onInsert,
}: {
  caseTypeLabel?: string;
  onInsert: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState<'tree' | 'hypothesis'>('tree');
  const recommended = useMemo(
    () => TREE_TEMPLATES.find((t) => t.id !== 'blank' && !!caseTypeLabel && t.match.test(caseTypeLabel)) || null,
    [caseTypeLabel],
  );
  const [outline, setOutline] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [tests, setTests] = useState('');
  const [breaker, setBreaker] = useState('');
  const [inserted, setInserted] = useState<'tree' | 'hypothesis' | null>(null);

  const insertTree = () => {
    if (!outline.trim()) return;
    onInsert('MY ISSUE TREE (MECE):\n' + outline.trimEnd());
    setInserted('tree');
  };
  const insertHypothesis = () => {
    if (!hypothesis.trim()) return;
    const lines = ['HYPOTHESIS-DRIVEN APPROACH:', 'Hypothesis: ' + hypothesis.trim()];
    if (tests.trim()) lines.push('How I will test it: ' + tests.trim());
    if (breaker.trim()) lines.push('What would change my mind: ' + breaker.trim());
    onInsert(lines.join('\n'));
    setInserted('hypothesis');
  };

  return (
    <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left"
        data-testid="button-framework-toolkit"
      >
        <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
          <span className="flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5 shrink-0 text-[var(--space-brand-primary)]" />
            <span className="text-[13px] font-semibold text-[var(--space-text-primary)] sm:text-sm">Answer-building tools</span>
          </span>
          <span className="text-[11px] leading-tight text-[var(--space-text-muted)]">issue tree · hypothesis · insert straight into your answer</span>
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-[var(--space-text-muted)]" /> : <ChevronDown className="h-4 w-4 text-[var(--space-text-muted)]" />}
      </button>

      {open && (
        <div className="space-y-3 border-t border-[var(--space-border-default)] px-3.5 py-3">
          <div className="flex rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-0.5">
            {([
              { id: 'tree' as const, label: 'Issue tree (MECE)', icon: Network },
              { id: 'hypothesis' as const, label: 'Hypothesis-driven', icon: FlaskConical },
            ]).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTool(id)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  tool === id
                    ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                    : 'text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {tool === 'tree' ? (
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                  Break the question into branches that don’t overlap and together cover everything (MECE). Start from a template or build your own — two spaces per level.
                </p>
                <InfoTip
                  label="Issue tree (MECE)"
                  what="Breaks the client’s question into non-overlapping branches that together cover every driver of the problem."
                  when="Reach for it at the start of any case, before touching the numbers, so nothing important gets missed."
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TREE_TEMPLATES.map((t) => (
                  <span
                    key={t.id}
                    className={`inline-flex items-center gap-0.5 rounded-full border py-0.5 pl-2.5 pr-1 transition-colors ${
                      recommended?.id === t.id
                        ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                        : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOutline(t.outline)}
                      className="py-0.5 text-[11px] font-medium"
                      data-testid={`tree-template-${t.id}`}
                    >
                      {t.label}
                      {recommended?.id === t.id ? ' · fits this case' : ''}
                    </button>
                    <InfoTip label={t.label} what={t.info.what} when={t.info.when} />
                  </span>
                ))}
              </div>
              <textarea
                value={outline}
                onChange={(event) => setOutline(event.target.value)}
                rows={7}
                placeholder={'Core question\n  Driver 1\n    Sub-question\n  Driver 2\n    Sub-question'}
                className={`${tw.input.base} ${tw.input.default} resize-y font-mono text-xs leading-5`}
                data-testid="input-issue-tree"
              />
              {outline.trim() && (
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Live tree diagram</p>
                  <DiagramOutline text={outline} />
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
                  MECE check: do any branches overlap? Together, do they cover the whole question?
                </p>
                <button
                  type="button"
                  onClick={insertTree}
                  disabled={!outline.trim()}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-40`}
                  data-testid="button-insert-tree"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {inserted === 'tree' ? 'Added — add again' : 'Add to my answer'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                  Work like a consultant: commit to a likely answer FIRST, then use the case facts to prove or kill it — don’t boil the ocean.
                </p>
                <InfoTip
                  label="Hypothesis-driven approach"
                  what="Commits you to a likely answer up front, then uses the case facts to prove or kill it."
                  when="Use it when data or time is limited — it keeps you from boiling the ocean and shows interviewers you drive to an answer."
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">My hypothesis</label>
                <textarea
                  value={hypothesis}
                  onChange={(event) => setHypothesis(event.target.value)}
                  rows={2}
                  placeholder={'e.g. Profits are falling because variable costs per unit rose in the Hanoi segment'}
                  className={`${tw.input.base} ${tw.input.default} mt-1 resize-y text-xs leading-5`}
                  data-testid="input-hypothesis"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">How I’ll test it — which case facts or exhibits</label>
                <textarea
                  value={tests}
                  onChange={(event) => setTests(event.target.value)}
                  rows={2}
                  placeholder={'e.g. Compare unit costs by segment in Exhibit 1; check price and volume trends in Exhibit 2'}
                  className={`${tw.input.base} ${tw.input.default} mt-1 resize-y text-xs leading-5`}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">What would change my mind</label>
                <textarea
                  value={breaker}
                  onChange={(event) => setBreaker(event.target.value)}
                  rows={2}
                  placeholder={'e.g. If costs are flat across segments, the driver is price or mix instead'}
                  className={`${tw.input.base} ${tw.input.default} mt-1 resize-y text-xs leading-5`}
                />
              </div>
              <HypothesisFlowDiagram hypothesis={hypothesis} tests={tests} breaker={breaker} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={insertHypothesis}
                  disabled={!hypothesis.trim()}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-40`}
                  data-testid="button-insert-hypothesis"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {inserted === 'hypothesis' ? 'Added — add again' : 'Add to my answer'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const GUIDED_STEPS: Array<{ key: 'structure' | 'math' | 'recommendation'; label: string; fallback: string }> = [
  {
    key: 'structure',
    label: 'Step 1 · Structure',
    fallback: 'First: how would you structure this problem? Lay out the branches you would investigate and why together they cover the whole question.',
  },
  {
    key: 'math',
    label: 'Step 2 · Math',
    fallback: 'Now the numbers: using the case facts and exhibits, set up and work the calculations that matter most — and say what the result means.',
  },
  {
    key: 'recommendation',
    label: 'Step 3 · Recommendation',
    fallback: 'Time to land it: give your recommendation answer-first, back it with your numbers, and flag one or two risks or next steps.',
  },
];

// Case types the drill engine can generate (mirrors CASE_TYPES in
// serverFunctions.ts). 'mixed' lets the hook rotate through the types this
// candidate has practiced least — within their matched relevant set once a
// fit assessment exists. The full catalog and the documented
// industry/function-to-case-type relevance mapping live in caseTypeCatalog.ts.
const CASE_TYPE_OPTIONS: Array<{ id: string; label: string; hint: string }> = [
  { id: 'mixed', label: 'Mix it up', hint: 'Mate rotates the case types you have practiced least' },
  ...CASE_TYPE_CATALOG,
];

function targetFromAssessment(assessment?: AssessmentResult): number | null {
  const result = asObject(assessment?.result_json);
  const explicit = validTarget(result.required_case_count || result.requiredCaseCount || result.practice_case_target);
  if (explicit) return explicit;

  const timeline = Array.isArray(result.prep_timeline) ? result.prep_timeline : [];
  for (const item of timeline) {
    const prose = `${item?.focus || ''} ${item?.period || ''}`;
    const match = prose.match(/(?:complete|log|drill|practice)[^\d]{0,24}(\d{1,2})\s+(?:practice\s+)?cases?/i);
    if (match && validTarget(match[1])) return Number(match[1]);
  }
  return null;
}

function formatDate(value?: string): string {
  if (!value) return 'Not completed';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not completed';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function TrendSparkline({ values }: { values: number[] }) {
  if (values.length < 2) {
    return <p className="text-xs text-[var(--space-text-muted)]">Complete two cases to reveal your grade trend.</p>;
  }
  const width = 280;
  const height = 64;
  const xFor = (index: number) => (index / (values.length - 1)) * width;
  const yFor = (value: number) => height - ((value - 1) / 4) * 52 - 6;
  const points = values.map((value, index) => `${xFor(index)},${yFor(value)}`).join(' ');
  const first = values[0];
  const latest = values[values.length - 1];

  return (
    <div>
      <div className="flex items-stretch gap-1.5">
        <div className="flex flex-col justify-between py-px text-right text-[9px] leading-none text-[var(--space-text-muted)]" aria-hidden="true">
          <span>5</span>
          <span>3</span>
          <span>1</span>
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-label="Average grade trend" className="min-w-0 flex-1">
          {[1, 3, 5].map((grade) => (
            <line key={grade} x1={0} x2={width} y1={yFor(grade)} y2={yFor(grade)} stroke="var(--space-border-default)" strokeWidth="1" strokeDasharray="3 5" />
          ))}
          <polyline
            points={points}
            fill="none"
            stroke="var(--space-brand-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {values.map((value, index) => (
            <circle key={`${value}-${index}`} cx={xFor(index)} cy={yFor(value)} r="3.5" fill="var(--space-brand-highlight)">
              <title>{`After case ${index + 1}: average ${value.toFixed(1)}/5`}</title>
            </circle>
          ))}
        </svg>
      </div>
      <p className="mt-2 text-xs text-[var(--space-text-secondary)]">
        Running average after each graded case — started at{' '}
        <span className="font-semibold text-[var(--space-text-primary)]">{first.toFixed(1)}/5</span>, now at{' '}
        <span className="font-semibold text-[var(--space-text-primary)]">{latest.toFixed(1)}/5</span>.
      </p>
    </div>
  );
}

// SVG donut ring — a glanceable alternative to raw percentages for the
// dashboard (user feedback: fewer walls of numbers, more simple visuals).
function ProgressRing({ percent, label, size = 88 }: { percent: number; label?: string; size?: number }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label || `${Math.round(pct)}%`} className="flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--space-surface-muted)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--space-brand-primary)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={size * 0.24} fontWeight="700" fill="var(--space-text-primary)">
        {Math.round(pct)}%
      </text>
    </svg>
  );
}

function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--space-text-secondary)]">
          <span>{label}</span>
          <span className="font-semibold text-[var(--space-text-brand)]">{Math.round(safeValue)}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
        <div
          className="h-full rounded-full bg-[var(--space-brand-primary)] transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

// Horizontal 0–5 gauge with a tick at the target bar — shows the average
// grade as a position on the scale instead of only a raw number.
function ScoreGauge({ value, target }: { value: number; target: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const targetPct = Math.max(0, Math.min(100, (target / 5) * 100));
  return (
    <div role="img" aria-label={`Average grade ${value.toFixed(1)} of 5 — target bar ${target.toFixed(1)} of 5`}>
      <div className="relative h-2.5 rounded-full bg-[var(--space-surface-muted)]">
        <div
          className="h-full rounded-full bg-[var(--space-brand-highlight-600)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute -top-[3px] h-4 w-0.5 rounded-full bg-[var(--space-text-primary)] opacity-50"
          style={{ left: `calc(${targetPct}% - 1px)` }}
          title={`Target bar ${target.toFixed(1)}/5`}
        />
      </div>
      <div className="mt-0.5 flex justify-between text-[9px] leading-none text-[var(--space-text-muted)]" aria-hidden="true">
        <span>0</span>
        <span>5</span>
      </div>
    </div>
  );
}

// Tiny bar chart of the last few raw grades (oldest → newest) so the trend
// card shows the actual shape of recent performance, not just a word.
function RecentScoreBars({ scores }: { scores: number[] }) {
  const recent = scores.slice(-6);
  if (!recent.length) return null;
  return (
    <div
      className="flex h-10 flex-shrink-0 items-end gap-1"
      role="img"
      aria-label={`Last ${recent.length} grades: ${recent.map((score) => `${score}/5`).join(', ')}`}
    >
      {recent.map((score, index) => (
        <div
          key={index}
          className={`w-2.5 rounded-t ${index === recent.length - 1 ? 'bg-[var(--space-brand-primary)]' : 'bg-[var(--space-brand-highlight-200)]'}`}
          style={{ height: `${Math.max(12, (score / 5) * 100)}%` }}
          title={`${score}/5`}
        />
      ))}
    </div>
  );
}

// Shape of one row of the per-case-type breakdown (built in `typeMix`).
interface CaseTypeStat {
  name: string;
  count: number;
  gradedCount: number;
  average: number | null;
}

// Vertical bar chart — average grade per case type (X axis = case type,
// Y axis = 0–5 grade). Plain SVG, no chart library: a fixed slot per type
// inside a horizontal scroller keeps it readable on mobile no matter how
// many types have been drilled. Exact numbers stay accessible via the value
// label on every bar and a native tooltip on hover / long-press.
function TypePerformanceBarChart({ data }: { data: CaseTypeStat[] }) {
  if (!data.length) return null;
  const barSlot = 62;
  const leftPad = 26;
  const topPad = 16;
  const plotHeight = 104;
  const labelBlock = 44;
  const width = leftPad + data.length * barSlot + 6;
  const height = topPad + plotHeight + labelBlock;
  const baseline = topPad + plotHeight;
  const yFor = (grade: number) => baseline - (grade / 5) * plotHeight;
  // Wrap a case-type name into at most two short lines (SVG text can't wrap
  // on its own); anything longer is ellipsized — the tooltip has the full name.
  const wrapLabel = (name: string): string[] => {
    const words = name.split(/\s+/);
    const lines: string[] = [];
    for (const word of words) {
      const last = lines[lines.length - 1];
      if (last !== undefined && `${last} ${word}`.length <= 10) {
        lines[lines.length - 1] = `${last} ${word}`;
      } else {
        lines.push(word);
      }
    }
    const trimmed = lines.slice(0, 2).map((line) => (line.length > 11 ? `${line.slice(0, 10)}…` : line));
    if (lines.length > 2 && trimmed[1]) trimmed[1] = `${trimmed[1].replace(/…$/, '').slice(0, 9)}…`;
    return trimmed;
  };
  return (
    <div className="overflow-x-auto pb-1" data-testid="type-performance-bar-chart">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Average grade by case type: ${data
          .map((row) => `${row.name} ${row.average !== null ? `${row.average.toFixed(1)} of 5` : 'not graded yet'}`)
          .join(', ')}`}
      >
        {[5, 2.5].map((grade) => (
          <g key={grade}>
            <line x1={leftPad} x2={width - 2} y1={yFor(grade)} y2={yFor(grade)} stroke="var(--space-border-default)" strokeWidth="1" strokeDasharray="3 5" />
            <text x={leftPad - 6} y={yFor(grade)} textAnchor="end" dominantBaseline="central" fontSize="9" fill="var(--space-text-muted)">
              {grade}
            </text>
          </g>
        ))}
        <line x1={leftPad} x2={width - 2} y1={baseline} y2={baseline} stroke="var(--space-border-strong)" strokeWidth="1" />
        <text x={leftPad - 6} y={baseline} textAnchor="end" dominantBaseline="central" fontSize="9" fill="var(--space-text-muted)">
          0
        </text>
        {data.map((row, index) => {
          const avg = row.average;
          const centerX = leftPad + index * barSlot + barSlot / 2;
          // Ungraded types get a small stub bar so they stay visible on the axis.
          const barTop = yFor(avg !== null ? Math.max(0.2, avg) : 0.2);
          const labelLines = wrapLabel(row.name);
          return (
            <g key={row.name}>
              <title>
                {avg !== null
                  ? `${row.name}: average ${avg.toFixed(1)}/5 across ${row.gradedCount} graded of ${row.count} total`
                  : `${row.name}: ${row.count} case${row.count === 1 ? '' : 's'} — none graded yet`}
              </title>
              <rect
                x={centerX - 13}
                y={barTop}
                width={26}
                height={baseline - barTop}
                rx={3}
                fill={avg !== null ? 'var(--space-brand-primary-600)' : 'var(--space-border-strong)'}
                opacity={avg !== null ? 1 : 0.7}
              />
              <text x={centerX} y={barTop - 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--space-text-primary)">
                {avg !== null ? avg.toFixed(1) : '—'}
              </text>
              {labelLines.map((line, lineIndex) => (
                <text key={lineIndex} x={centerX} y={baseline + 12 + lineIndex * 11} textAnchor="middle" fontSize="9" fill="var(--space-text-secondary)">
                  {line}
                </text>
              ))}
              <text x={centerX} y={baseline + 12 + labelLines.length * 11} textAnchor="middle" fontSize="9" fill="var(--space-text-muted)">
                ×{row.count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Slice palette for the case-mix donut — brand green shades ordered for
// adjacent contrast, with a neutral reserved for the "Other" bucket.
const DONUT_SLICE_COLORS = [
  'var(--space-brand-primary-600)',
  'var(--space-brand-primary-200)',
  'var(--space-brand-primary-900)',
  'var(--space-brand-primary-100)',
  'var(--space-brand-primary-500)',
];
const DONUT_OTHER_COLOR = 'var(--space-border-strong)';

// Donut chart — how practiced cases are distributed across case types. The
// top five types get their own slice; the rest fold into "Other". Plain SVG;
// every slice keeps its exact count and percent in the legend and in a
// native tooltip, so no number is lost to the visual.
function CaseTypeDonut({ data }: { data: CaseTypeStat[] }) {
  const total = data.reduce((sum, row) => sum + row.count, 0);
  if (!total) return null;
  const MAX_SLICES = 5;
  const top = data.slice(0, MAX_SLICES);
  const restCount = data.slice(MAX_SLICES).reduce((sum, row) => sum + row.count, 0);
  const slices = [
    ...top.map((row, index) => ({ name: row.name, count: row.count, color: DONUT_SLICE_COLORS[index % DONUT_SLICE_COLORS.length] })),
    ...(restCount > 0 ? [{ name: `Other (${data.length - MAX_SLICES} types)`, count: restCount, color: DONUT_OTHER_COLOR }] : []),
  ];
  const size = 132;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row" data-testid="case-type-donut">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Case mix: ${slices.map((slice) => `${slice.name} ${Math.round((slice.count / total) * 100)} percent`).join(', ')}`}
        className="flex-shrink-0"
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {slices.map((slice) => {
            const fraction = slice.count / total;
            const dashOffset = -acc * c;
            acc += fraction;
            return (
              <circle
                key={slice.name}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={slice.color}
                strokeWidth={stroke}
                strokeDasharray={`${fraction * c} ${c}`}
                strokeDashoffset={dashOffset}
              >
                <title>{`${slice.name}: ${slice.count} case${slice.count === 1 ? '' : 's'} · ${Math.round(fraction * 100)}%`}</title>
              </circle>
            );
          })}
        </g>
        <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="700" fill="var(--space-text-primary)">
          {total}
        </text>
        <text x="50%" y="46%" dy="18" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="var(--space-text-muted)">
          case{total === 1 ? '' : 's'}
        </text>
      </svg>
      <ul className="w-full min-w-0 flex-1 space-y-1.5">
        {slices.map((slice) => (
          <li
            key={slice.name}
            className="flex items-center gap-2 text-xs"
            title={`${slice.name}: ${slice.count} case${slice.count === 1 ? '' : 's'} · ${Math.round((slice.count / total) * 100)}%`}
          >
            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-sm" style={{ backgroundColor: slice.color }} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-[var(--space-text-secondary)]">{slice.name}</span>
            <span className="flex-shrink-0 font-semibold text-[var(--space-text-primary)]">{Math.round((slice.count / total) * 100)}%</span>
            <span className="w-8 flex-shrink-0 text-right text-[var(--space-text-muted)]">×{slice.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- Exhibit: the visual data exhibit inside a case prompt -----------------
// Generated cases can carry an exhibit spec under
// rubric_json._casemate.exhibit_chart (see serverFunctions.ts v8/v11): either
// 3–5 chart data points or a columns/rows table, mirroring the "Exhibit 1"
// block of the case facts so the candidate reads it like a real interview
// handout. Rendered with plain divs/SVG (no chart library), fluid width so
// nothing overflows on mobile.
interface ExhibitChartSpec {
  type: 'bar' | 'pie' | 'line' | 'funnel' | 'table';
  title: string;
  unit: string;
  data: Array<{ label: string; value: number }>;
  columns?: string[];
  rows?: string[][];
}

const EXHIBIT_CHART_TYPES = ['bar', 'pie', 'line', 'funnel', 'table'] as const;

// UX fix #5: an exhibit shows BOTH the data table (the authoritative
// reference, always rendered) AND a chart of the same numbers whenever they
// can be charted honestly. The helpers below derive that chart view: they
// repair shapes a chart cannot show honestly (a 2-point "line" → bars, a
// non-descending "funnel" → bars, a one-dominant-slice pie → bars) and
// return null when the numbers simply don't chart (zero/negative values,
// wildly mixed magnitudes, or a text grid without a numeric column) — the
// exhibit then shows the table alone.
function parseNumericCell(raw: string): number | null {
  const text = String(raw ?? '').trim();
  if (!text) return null;
  const match = text.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  // A short unit suffix ("%", "VND", "$M") is fine — a sentence that merely
  // contains a digit is not a data point.
  const leftover = text.replace(/-?[\d.,\s]+/g, '');
  if (leftover.length > 6) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : null;
}

function deriveGridChartData(
  columns: string[],
  rows: string[][],
): { data: ExhibitChartSpec['data']; unit: string } | null {
  // Chart the FIRST fully numeric column, labelled by the first column.
  for (let c = 1; c < columns.length; c += 1) {
    const points: ExhibitChartSpec['data'] = [];
    let allNumeric = true;
    for (const row of rows) {
      const value = parseNumericCell(row[c] ?? '');
      const label = String(row[0] ?? '').trim();
      if (value == null || !label) {
        allNumeric = false;
        break;
      }
      points.push({ label, value });
    }
    if (allNumeric && points.length >= 2) return { data: points.slice(0, 8), unit: columns[c] || '' };
  }
  return null;
}

function chartViewOf(spec: ExhibitChartSpec): ExhibitChartSpec | null {
  let type: ExhibitChartSpec['type'] = spec.type === 'table' ? 'bar' : spec.type;
  let data = spec.data;
  let unit = spec.unit;
  if ((!data || data.length < 2) && spec.columns && spec.rows) {
    const derived = deriveGridChartData(spec.columns, spec.rows);
    if (!derived) return null;
    data = derived.data;
    unit = derived.unit || unit;
    type = 'bar';
  }
  if (!data || data.length < 2) return null;
  const values = data.map((point) => point.value);
  const positive = values.filter((value) => value > 0);
  const ratio = positive.length >= 2 ? Math.max(...positive) / Math.min(...positive) : 1;
  if (positive.length < values.length || ratio > 40) return null;
  if (type === 'line' && data.length < 3) type = 'bar';
  if (type === 'funnel' && data.some((point, index) => index > 0 && point.value > data[index - 1].value)) {
    type = 'bar';
  }
  if (type === 'pie') {
    const total = values.reduce((sum, value) => sum + value, 0);
    if (total <= 0 || Math.max(...values) / total > 0.9) type = 'bar';
  }
  return { type, title: spec.title, unit, data };
}

function exhibitChartOf(meta: Record<string, any>): ExhibitChartSpec | null {
  const raw = asObject(meta.exhibit_chart);
  const data = asList(raw.data)
    .map((item) => ({
      label: String(item && typeof item === 'object' ? item.label ?? '' : '').trim(),
      value: Number(item && typeof item === 'object' ? item.value : NaN),
    }))
    .filter((point) => point.label.length > 0 && Number.isFinite(point.value) && point.value >= 0)
    .slice(0, 5);
  const columns = asList(raw.columns)
    .map((cell) => String(cell ?? '').trim())
    .filter(Boolean)
    .slice(0, 5);
  const rows = asList(raw.rows)
    .map((row) => asList(row).map((cell) => String(cell ?? '').trim()))
    .filter((row) => row.some((cell) => cell.length > 0))
    .slice(0, 8);
  const hasTable = columns.length >= 2 && rows.length >= 2;
  // No usable data in either shape → no exhibit card at all (never an empty shell).
  if (data.length < 2 && !hasTable) return null;
  const type = EXHIBIT_CHART_TYPES.find((candidate) => candidate === String(raw.type || '').toLowerCase()) || 'bar';
  return {
    type,
    title: String(raw.title || 'Data provided'),
    unit: String(raw.unit || ''),
    data,
    columns: hasTable ? columns : undefined,
    rows: hasTable ? rows : undefined,
  };
}

function formatExhibitValue(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: Math.abs(value) < 100 ? 1 : 0 });
}

// Horizontal bars: label + value per row, bar width proportional to the max.
// `funnel` centers the bars and fades them so a descending funnel reads as one.
type ExhibitDisplayType = 'column' | 'bar' | 'pie' | 'line' | 'funnel';

function exhibitDisplayType(spec: ExhibitChartSpec): ExhibitDisplayType {
  if (spec.type === 'funnel') return 'funnel';
  const title = String(spec.title || '').toLowerCase();
  const labels = (spec.data || []).map((point) => point.label).join(' ').toLowerCase();
  const values = (spec.data || []).map((point) => point.value);
  const total = values.reduce((sum, value) => sum + value, 0);
  const allPositive = values.every((value) => value > 0);
  const shareLike =
    /share|mix|composition|split|contribution|breakdown|portfolio|segment|tỷ trọng|cơ cấu/.test(title) ||
    (String(spec.unit || '').includes('%') && total >= 95 && total <= 105);
  if (spec.type === 'pie' && allPositive) return 'pie';
  if (shareLike && allPositive && values.length <= 8) return 'pie';

  const timeLike =
    /trend|over time|growth|monthly|quarterly|annual|theo thời gian|tăng trưởng/.test(title) ||
    /\b20\d{2}\b|\bq[1-4]\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b|tháng|quý|năm/.test(labels);
  if (spec.type === 'line' || timeLike) return 'line';
  if (/rank|ranking|top\s|bottom\s|highest|lowest|leader|xếp hạng|cao nhất|thấp nhất/.test(title)) return 'bar';
  return 'column';
}

function ExhibitColumns({ data }: { data: ExhibitChartSpec['data'] }) {
  const width = 360;
  const height = 180;
  const padX = 28;
  const padTop = 28;
  const padBottom = 42;
  const values = data.map((point) => point.value);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const plotHeight = height - padTop - padBottom;
  const step = (width - padX * 2) / data.length;
  const barWidth = Math.min(42, Math.max(12, step * 0.58));
  const yFor = (value: number) => padTop + ((max - value) / span) * plotHeight;
  const baseline = yFor(0);
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={data.map((point) => `${point.label}: ${formatExhibitValue(point.value)}`).join(', ')}
      data-testid="exhibit-columns"
    >
      <line x1={padX} x2={width - padX} y1={baseline} y2={baseline} stroke="var(--space-border-strong)" strokeWidth="1" />
      {data.map((point, index) => {
        const x = padX + index * step + (step - barWidth) / 2;
        const valueY = yFor(point.value);
        const y = Math.min(valueY, baseline);
        const barHeight = Math.max(2, Math.abs(valueY - baseline));
        const center = x + barWidth / 2;
        return (
          <g key={`${point.label}-${index}`}>
            <rect x={x} y={y} width={barWidth} height={barHeight} rx="4" fill={point.value < 0 ? 'var(--space-semantic-danger)' : 'var(--space-brand-primary-600)'}>
              <title>{`${point.label}: ${formatExhibitValue(point.value)}`}</title>
            </rect>
            <text x={center} y={point.value >= 0 ? Math.max(13, y - 6) : y + barHeight + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--space-text-primary)">
              {formatExhibitValue(point.value)}
            </text>
            <text x={center} y={height - padBottom + 16} textAnchor="middle" fontSize="9" fill="var(--space-text-muted)">
              {point.label.length > 10 ? `${point.label.slice(0, 9)}…` : point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ExhibitBars({ data, funnel }: { data: ExhibitChartSpec['data']; funnel?: boolean }) {
  const max = Math.max(...data.map((point) => point.value), 1);
  return (
    <div
      className="space-y-2"
      role="img"
      aria-label={data.map((point) => `${point.label}: ${formatExhibitValue(point.value)}`).join(', ')}
    >
      {data.map((point, index) => (
        <div key={`${point.label}-${index}`} title={`${point.label}: ${formatExhibitValue(point.value)}`}>
          <div className="flex items-baseline justify-between gap-2 text-[11px] leading-4">
            <span className="min-w-0 truncate text-[var(--space-text-secondary)]">{point.label}</span>
            <span className="shrink-0 font-semibold text-[var(--space-text-primary)]">{formatExhibitValue(point.value)}</span>
          </div>
          <div className={`mt-1 ${funnel ? 'flex justify-center' : ''}`}>
            <div
              className="h-3.5 rounded bg-[var(--space-brand-primary-600)]"
              style={{ width: `${Math.max(4, (point.value / max) * 100)}%`, opacity: funnel ? Math.max(0.45, 1 - index * 0.13) : 1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Donut pie with a legend row per slice (exact value + share stay visible).
function ExhibitPie({ data }: { data: ExhibitChartSpec['data'] }) {
  const total = data.reduce((sum, point) => sum + point.value, 0);
  if (total <= 0) return <ExhibitBars data={data} />;
  const size = 120;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
        role="img"
        aria-label={data.map((point) => `${point.label} ${Math.round((point.value / total) * 100)} percent`).join(', ')}
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {data.map((point, index) => {
            const fraction = point.value / total;
            const dashOffset = -acc * c;
            acc += fraction;
            return (
              <circle
                key={`${point.label}-${index}`}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={DONUT_SLICE_COLORS[index % DONUT_SLICE_COLORS.length]}
                strokeWidth={stroke}
                strokeDasharray={`${fraction * c} ${c}`}
                strokeDashoffset={dashOffset}
              >
                <title>{`${point.label}: ${formatExhibitValue(point.value)} · ${Math.round(fraction * 100)}%`}</title>
              </circle>
            );
          })}
        </g>
      </svg>
      <ul className="w-full min-w-0 flex-1 space-y-1.5">
        {data.map((point, index) => (
          <li key={`${point.label}-${index}`} className="flex items-center gap-2 text-[11px]" title={point.label}>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: DONUT_SLICE_COLORS[index % DONUT_SLICE_COLORS.length] }}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate text-[var(--space-text-secondary)]">{point.label}</span>
            <span className="shrink-0 font-semibold text-[var(--space-text-primary)]">{formatExhibitValue(point.value)}</span>
            <span className="w-9 shrink-0 text-right text-[var(--space-text-muted)]">{Math.round((point.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple trend line with a value label above each point and the period below.
function ExhibitLine({ data }: { data: ExhibitChartSpec['data'] }) {
  const width = 320;
  const height = 132;
  const padX = 28;
  const padTop = 22;
  const padBottom = 26;
  const values = data.map((point) => point.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || max || 1;
  const xFor = (index: number) => padX + (index / (data.length - 1)) * (width - padX * 2);
  const yFor = (value: number) => padTop + (1 - (value - min) / span) * (height - padTop - padBottom);
  const points = data.map((point, index) => `${xFor(index)},${yFor(point.value)}`).join(' ');
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={data.map((point) => `${point.label}: ${formatExhibitValue(point.value)}`).join(', ')}
    >
      <line x1={padX} x2={width - padX} y1={height - padBottom} y2={height - padBottom} stroke="var(--space-border-strong)" strokeWidth="1" />
      <polyline points={points} fill="none" stroke="var(--space-brand-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((point, index) => (
        <g key={`${point.label}-${index}`}>
          <circle cx={xFor(index)} cy={yFor(point.value)} r="3.5" fill="var(--space-brand-highlight)">
            <title>{`${point.label}: ${formatExhibitValue(point.value)}`}</title>
          </circle>
          <text x={xFor(index)} y={yFor(point.value) - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--space-text-primary)">
            {formatExhibitValue(point.value)}
          </text>
          <text x={xFor(index)} y={height - padBottom + 13} textAnchor="middle" fontSize="9" fill="var(--space-text-muted)">
            {point.label.length > 9 ? `${point.label.slice(0, 8)}…` : point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Clean exhibit table — for reference/anchor facts, mixed units, or any data
// where a chart would not beat a table for legibility. Renders either the
// full columns/rows payload or a simple label/value table from chart points.
function ExhibitTable({ chart }: { chart: ExhibitChartSpec }) {
  const hasGrid = Boolean(chart.columns && chart.columns.length >= 2 && chart.rows && chart.rows.length > 0);
  const columns = hasGrid ? (chart.columns as string[]) : ['Item', chart.unit ? `Value (${chart.unit})` : 'Value'];
  const rows = hasGrid
    ? (chart.rows as string[][]).map((row) => row.slice(0, columns.length))
    : chart.data.map((point) => [point.label, formatExhibitValue(point.value)]);
  return (
    <div className="overflow-x-auto" data-testid="exhibit-table">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${column}-${index}`}
                scope="col"
                className={`border-b border-[var(--space-border-strong)] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)] ${index === 0 ? 'text-left' : 'text-right'}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'bg-[var(--space-surface-muted)]' : ''}>
              {columns.map((_, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border-b border-[var(--space-border-default)] px-2.5 py-1.5 leading-4 ${
                    cellIndex === 0
                      ? 'text-left font-medium text-[var(--space-text-primary)]'
                      : 'text-right tabular-nums text-[var(--space-text-secondary)]'
                  }`}
                >
                  {row[cellIndex] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// UX fix #5: the exhibit card renders the chart AND the data table together
// — the chart makes the shape of the numbers instant, while the table stays
// the authoritative reference (charts complement, never replace, the data).
function ExhibitChartCard({ chart }: { chart: ExhibitChartSpec }) {
  const chartView = chartViewOf(chart);
  const displayType = chartView ? exhibitDisplayType(chartView) : null;
  return (
    <div className="mt-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid="exhibit-chart">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">Exhibit 1 · Data provided</p>
        {chartView ? (
          <BarChart3 className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-muted)]" aria-hidden="true" />
        ) : (
          <Table2 className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-muted)]" aria-hidden="true" />
        )}
      </div>
      <h4 className="mt-1 text-sm font-semibold text-[var(--space-text-primary)]">{chart.title}</h4>
      {chart.unit && !chart.columns && (
        <p className="mt-0.5 text-[11px] text-[var(--space-text-muted)]">{chart.unit}</p>
      )}
      {chartView && (
        <div className="mt-3" data-testid="exhibit-chart-visual">
          {displayType === 'pie' ? (
            <ExhibitPie data={chartView.data} />
          ) : displayType === 'line' ? (
            <ExhibitLine data={chartView.data} />
          ) : displayType === 'column' ? (
            <ExhibitColumns data={chartView.data} />
          ) : (
            <ExhibitBars data={chartView.data} funnel={displayType === 'funnel'} />
          )}
          {chartView.unit && !!chart.columns && (
            <p className="mt-1.5 text-[10px] text-[var(--space-text-muted)]">Chart shows: {chartView.unit}</p>
          )}
        </div>
      )}
      <div className="mt-3" data-testid="exhibit-data-table">
        <ExhibitTable chart={chart} />
      </div>
      <p className="mt-3 text-[10px] leading-4 text-[var(--space-text-muted)]">
        Read it like a real interview handout — the chart and the table show the same numbers.
      </p>
    </div>
  );
}

// Visual MECE tree: parses the two-spaces-per-level outline into a proper
// tree diagram with connector lines and level-styled node boxes.
function DiagramOutline({ text }: { text: string }) {
  const lines = text.split('\n').filter((line) => line.trim().length > 0);
  if (!lines.length) return null;
  const nodes = lines.map((line) => ({
    depth: Math.min(6, Math.floor((line.length - line.trimStart().length) / 2)),
    label: line.trim().replace(/^[-*•]\s*/, ''),
  }));
  // Does the branch at `depth` continue below row `index` (a later sibling at
  // the same depth before anything shallower)? Drives ├ vs └ connectors and
  // whether ancestor gutters keep their vertical line.
  const continues = (index: number, depth: number) => {
    for (let j = index + 1; j < nodes.length; j++) {
      if (nodes[j].depth < depth) return false;
      if (nodes[j].depth === depth) return true;
    }
    return false;
  };
  return (
    <div className="overflow-x-auto rounded-xl bg-[var(--space-surface-muted)] p-3" aria-label="Issue tree diagram">
      <div className="min-w-max space-y-1">
        {nodes.map((node, index) => (
          <div key={`${node.label}-${index}`} className="flex items-stretch">
            {Array.from({ length: node.depth }, (_, level) => {
              const isElbow = level === node.depth - 1;
              const lineContinues = continues(index, level + 1);
              return (
                <span key={level} className="relative w-5 flex-shrink-0 self-stretch">
                  {(lineContinues || isElbow) && (
                    <span
                      className="absolute left-2 top-0 w-px bg-[var(--space-border-strong)]"
                      style={{ bottom: isElbow && !lineContinues ? '50%' : 0 }}
                    />
                  )}
                  {isElbow && <span className="absolute left-2 top-1/2 h-px w-3 bg-[var(--space-border-strong)]" />}
                </span>
              );
            })}
            <span
              className={
                node.depth === 0
                  ? 'rounded-lg bg-[var(--space-brand-primary)] px-2.5 py-1 text-xs font-semibold text-[var(--space-text-on-primary)]'
                  : node.depth === 1
                    ? 'rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-2.5 py-1 text-xs font-medium text-[var(--space-text-primary)]'
                    : 'rounded-lg bg-[var(--space-surface-card)] px-2.5 py-1 text-[11px] text-[var(--space-text-secondary)]'
              }
            >
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Casemate freemium boundary: Case Pool is part of Casemate Pro.
// The gate below shows all three native-checkout plans to users whose trial
// ended; Fit Assessment and matching remain completely free.
export default function CaseDrillLog() {
  return (
    <PaywallGate appId="case-drill-log" appName="Case Pool">
      <CaseDrillLogInner />
    </PaywallGate>
  );
}

function CaseDrillLogInner() {
  const { sessionId } = useSpaceRuntime();
  const {
    data: cases,
    loading: casesLoading,
    error: casesError,
    refresh: refreshCases,
  } = window.useWorkspaceDB<PracticeCase>('case_practice_cases', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 200,
  });
  const {
    data: assessments,
    loading: assessmentLoading,
    error: assessmentError,
    refresh: refreshAssessments,
  } = window.useWorkspaceDB<AssessmentResult>('assessment_results', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 20,
  });

  // First-load latch for the room skeleton. The platform's useWorkspaceDB
  // refresh() flips `loading` back to true on EVERY refetch — and grading a
  // Case Library case awaits refreshCases(), so gating the whole tab on the
  // raw loading flag swapped the tree to the skeleton mid-grade, unmounting
  // CasePoolLibrary and wiping its freshly graded state. That is exactly why
  // the percentile ranking widget never appeared for library results (and no
  // ranking record was written) while the Case Room flow — whose ranking
  // state lives up here in the host — kept working. Once the first load has
  // landed, later refreshes keep the current screen mounted and update it in
  // place.
  const [bootstrapped, setBootstrapped] = useState(false);
  useEffect(() => {
    if (!casesLoading && !assessmentLoading) setBootstrapped(true);
  }, [casesLoading, assessmentLoading]);

  const [tab, setTab] = useState<Tab>('library');
  // Set when a library attempt is tapped in the dashboard history — the nonce
  // makes tapping the same case twice reopen it.
  const [libraryOpenRequest, setLibraryOpenRequest] = useState<{ id: string; nonce: number } | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [transientCase, setTransientCase] = useState<PracticeCase | null>(null);
  const [answer, setAnswer] = useState('');
  const [manualTarget, setManualTarget] = useState<number | null>(null);
  const [targetInput, setTargetInput] = useState('');
  const [targetEditing, setTargetEditing] = useState(false);
  const [checklistExpanded, setChecklistExpanded] = useState(true);
  const [busyAction, setBusyAction] = useState<'generate' | 'grade' | 'reveal' | null>(null);
  const [actionError, setActionError] = useState('');
  const [answerMode, setAnswerMode] = useState<'type' | 'photo'>('type');
  const [caseType, setCaseType] = useState<string>('mixed');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [photoStage, setPhotoStage] = useState<'idle' | 'uploading' | 'reading' | 'review'>('idle');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoNote, setPhotoNote] = useState('');
  const [structured, setStructured] = useState<StructuredAnswer | null>(null);
  const [confirmGiveUp, setConfirmGiveUp] = useState(false);
  const [programPreset, setProgramPreset] = useState<DrillPreset | null>(null);
  const autoStartedRef = useRef(false);

  const latestAssessment = assessments?.[0];
  const assessmentDirection = asObject(latestAssessment?.result_json);
  // Industry/function personalization (see caseTypeCatalog.ts): once a fit
  // assessment exists, the case-type menu filters and reorders to the types
  // the candidate's matched industry/function actually tests — closest match
  // first. Everything else stays one tap away behind "Show all case types".
  const caseTypeRelevance = useMemo(
    () => relevantCaseTypesForDirection(asObject(latestAssessment?.result_json)),
    [latestAssessment],
  );
  const assessmentTarget = targetFromAssessment(latestAssessment);
  const persistedCaseTarget = validTarget(cases?.find((item) => validTarget(item.target_count))?.target_count);
  const effectiveTarget = assessmentTarget || manualTarget || persistedCaseTarget;

  useEffect(() => {
    if (!sessionId) return;
    const saved = validTarget(localStorage.getItem(`casemate-case-target:${sessionId}`));
    if (saved) {
      setManualTarget(saved);
      setTargetInput(String(saved));
    }
    const savedDifficulty = localStorage.getItem(difficultyStorageKey(sessionId));
    if (savedDifficulty === 'easy' || savedDifficulty === 'medium' || savedDifficulty === 'hard') {
      setDifficulty(savedDifficulty);
    }
  }, [sessionId]);

  useEffect(() => {
    if (assessmentTarget) setTargetInput(String(assessmentTarget));
  }, [assessmentTarget]);

  // Consume the program-drill preset (written by "Start Case Pool for this
  // program" in the chat), then clear it. Runs on mount AND on openApp events,
  // so it also works when the drill app was already mounted beside the chat.
  useEffect(() => {
    const consumePreset = () => {
      try {
        const raw = localStorage.getItem(DRILL_PRESET_KEY);
        if (!raw) return;
        localStorage.removeItem(DRILL_PRESET_KEY);
        const preset = JSON.parse(raw) as DrillPreset;
        if (!preset || Date.now() - Number(preset.ts || 0) > 10 * 60 * 1000) return;
        if (preset.caseType && CASE_TYPE_OPTIONS.some((option) => option.id === preset.caseType)) {
          setCaseType(preset.caseType);
        }
        autoStartedRef.current = false;
        setProgramPreset(preset);
      } catch {
        /* stale or malformed preset — ignore */
      }
    };
    consumePreset();
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent).detail?.appId === 'case-drill-log') consumePreset();
    };
    window.addEventListener('openApp', onOpenApp);
    return () => window.removeEventListener('openApp', onOpenApp);
  }, []);

  // Graded cases only — skipped/revealed cases stay in history but never
  // count toward the average, trend, or readiness metrics.
  const completedCases = useMemo(
    () => (cases || []).filter((item) => item.status === 'completed' && !caseMeta(item).skipped && validTarget(item.score)),
    [cases],
  );
  const skippedCount = useMemo(
    () => (cases || []).filter((item) => caseMeta(item).skipped).length,
    [cases],
  );

  const activeCase = useMemo(() => {
    if (transientCase && (!selectedId || transientCase.id === selectedId)) return transientCase;
    if (selectedId) return (cases || []).find((item) => item.id === selectedId) || null;
    // Library attempts share this table but belong to the Case Library tab —
    // they must never be picked up as the Case Room's working case.
    const roomCases = (cases || []).filter((item) => !libraryCaseIdOf(item));
    return roomCases.find((item) => item.status === 'pending') || roomCases[0] || null;
  }, [cases, selectedId, transientCase]);

  // Graded library attempts keyed by library case id — drives the score badges
  // and the saved report shown when a solved case is reopened.
  const libraryResults = useMemo(() => {
    const map: Record<string, LibraryGradeResult> = {};
    (cases || []).forEach((item) => {
      const libraryId = libraryCaseIdOf(item);
      if (!libraryId || !validTarget(item.score)) return;
      // Rows are newest-first; keep the first saved attempt so an older
      // duplicate cannot overwrite the latest report for the same library case.
      if (!(libraryId in map)) map[libraryId] = toLibraryResult(item);
    });
    return map;
  }, [cases]);

  useEffect(() => {
    if (activeCase?.answer_text && !answer) setAnswer(activeCase.answer_text);
  }, [activeCase?.id]);

  useEffect(() => {
    setAnswerMode('type');
    setPhotoStage('idle');
    setPhotoUrl('');
    setPhotoNote('');
    setStructured(null);
    setConfirmGiveUp(false);
  }, [activeCase?.id]);

  // Percentile ranking (performance-rankings-v1): the clock is stamped when a
  // case becomes the working case on this page load; grading turns the
  // open→submit elapsed time plus the grade into one ranking record, and the
  // widget renders only under THAT freshly graded case — reopening an older
  // graded case from history has no timing, so it shows no widget.
  const caseOpenedAtRef = useRef<number>(Date.now());
  const [freshRoomRanking, setFreshRoomRanking] = useState<{
    caseId: number;
    key: string;
    scorePercent: number;
    timeSeconds: number;
  } | null>(null);
  useEffect(() => {
    caseOpenedAtRef.current = Date.now();
  }, [activeCase?.id]);

  const activeMeta = caseMeta(activeCase);
  const activeExhibitChart = exhibitChartOf(activeMeta);

  // History bridge: cases completed in Case Room also count toward the library's
  // “Recommended for you” suggestions. Case Room case types are more detailed than
  // the library's, so they must be mapped to the library's six groups; unmappable
  // types are skipped (the recommendation function ignores unknown values). Case Room
  // does not record industry, so industry signals come only from library history.
  const casePracticeHistory = useMemo(() => {
    const toPoolType: Record<string, string> = {
      profitability: 'profitability',
      unit_economics: 'profitability',
      financial_analysis: 'profitability',
      credit_assessment: 'profitability',
      market_entry: 'growth',
      growth_strategy: 'growth',
      market_sizing: 'growth',
      product_launch: 'growth',
      operations_optimization: 'operations',
      distribution_strategy: 'operations',
      competitive_response: 'strategy',
      due_diligence: 'mna',
      mna: 'mna',
      pricing: 'other',
    };
    // Library attempts are skipped here: the library already counts them from
    // its own stored history, so passing them back would double-count them.
    return (cases || [])
      .filter((item) => !libraryCaseIdOf(item))
      .map((item) => ({
        case_id: `room-${item.id}`,
        case_type: toPoolType[String(item.case_type || '')] || null,
        difficulty: item.difficulty || null,
      }));
  }, [cases]);

  // Per-case-type breakdown: how many cases of each type AND the average
  // grade across the graded ones — drives the performance bar chart.
  const typeMix = useMemo(() => {
    const groups = new Map<string, { count: number; gradedCount: number; total: number }>();
    (cases || []).forEach((item) => {
      const key = item.case_type || 'Other';
      const group = groups.get(key) || { count: 0, gradedCount: 0, total: 0 };
      group.count += 1;
      if (item.status === 'completed' && !caseMeta(item).skipped && validTarget(item.score)) {
        group.gradedCount += 1;
        group.total += Number(item.score);
      }
      groups.set(key, group);
    });
    return Array.from(groups.entries())
      .map(([name, group]) => ({
        name,
        count: group.count,
        gradedCount: group.gradedCount,
        average: group.gradedCount ? group.total / group.gradedCount : null,
      }))
      .sort((a, b) => b.count - a.count);
  }, [cases]);

  const stats = useMemo(() => {
    const chronological = [...completedCases].sort(
      (a, b) => new Date(a.completed_on || a.created_at || 0).getTime() - new Date(b.completed_on || b.created_at || 0).getTime(),
    );
    const scores = chronological.map((item) => Number(item.score));
    const averageTrend = scores.map((_, index) => {
      const values = scores.slice(0, index + 1);
      return values.reduce((sum, score) => sum + score, 0) / values.length;
    });
    const average = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    const recent = scores.slice(-3);
    const prior = scores.slice(-6, -3);
    const recentAverage = recent.length ? recent.reduce((sum, score) => sum + score, 0) / recent.length : 0;
    const priorAverage = prior.length ? prior.reduce((sum, score) => sum + score, 0) / prior.length : recentAverage;
    const trendDelta = recentAverage - priorAverage;
    const scoreBar = Number(cases?.find((item) => item.readiness_bar)?.readiness_bar || 4);
    const countProgress = effectiveTarget ? completedCases.length / effectiveTarget : 0;
    const scoreProgress = scoreBar ? average / scoreBar : 0;
    const readiness = scores.length ? Math.min(100, countProgress * 60 + scoreProgress * 40) : 0;
    return { scores, averageTrend, average, trendDelta, scoreBar, readiness };
  }, [cases, completedCases, effectiveTarget]);

  const checklist = [
    { label: 'Complete the fit assessment with Mate (optional — it makes every case personal)', done: Boolean(latestAssessment) },
    { label: 'Pick a case type and generate your first practice case', done: (cases || []).length > 0 },
    { label: 'Submit your answer and get graded', done: completedCases.length > 0 },
  ];
  const checklistComplete = checklist.every((item) => item.done);

  useEffect(() => {
    if (checklistComplete) setChecklistExpanded(false);
  }, [checklistComplete]);

  const saveManualTarget = () => {
    const value = validTarget(targetInput);
    if (!value) {
      setActionError('Choose a target from 1 to 100 cases.');
      return;
    }
    setManualTarget(value);
    if (sessionId) localStorage.setItem(`casemate-case-target:${sessionId}`, String(value));
    setTargetEditing(false);
    setActionError('');
  };

  // Changing difficulty only affects the NEXT generated case — the active
  // case (and any in-progress walkthrough) is left untouched.
  const chooseDifficulty = (level: Difficulty) => {
    setDifficulty(level);
    if (sessionId) localStorage.setItem(difficultyStorageKey(sessionId), level);
  };

  const generateCase = async (
    mode: 'classic' | 'guided' = 'classic',
    overrides?: { caseType?: string; targetProgram?: string },
  ) => {
    if (!sessionId) {
      setActionError('Sign in to generate and save your practice cases.');
      return;
    }
    setBusyAction('generate');
    setActionError('');
    try {
      const chosenType = overrides?.caseType || caseType;
      const result = await callCaseDrillServerFunction(
        'generate',
        {
          targetCount: effectiveTarget ?? undefined,
          mode,
          caseType: chosenType,
          // Easy / Medium / Hard — the persisted dial applies to every newly
          // generated case; an in-progress case is never altered by it.
          difficulty,
          // "Mix it up" rotates within the candidate's matched case types
          // (their industry/function relevance set) once an assessment exists.
          preferredTypes:
            (!chosenType || chosenType === 'mixed') && caseTypeRelevance.personalized
              ? caseTypeRelevance.ids
              : undefined,
          targetProgram:
            overrides?.targetProgram || programPreset?.program || programPreset?.company || undefined,
        },
        sessionId,
      );
      const generated = result.case as PracticeCase;
      setTransientCase(generated);
      setSelectedId(generated.id);
      setAnswer('');
      await refreshCases();
      setTab('practice');
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Mate could not generate a case. Please try again.');
    } finally {
      setBusyAction(null);
    }
  };

  const gradeAnswer = async (overrideAnswer?: string, meta?: Record<string, unknown>) => {
    if (!activeCase || !sessionId) return;
    const finalAnswer = (overrideAnswer ?? answer).trim();
    if (finalAnswer.length < 80) {
      setActionError('Give Mate a complete answer of at least 80 characters so the grade is useful.');
      return;
    }
    const gradeMeta = meta ?? (photoUrl ? { photoUrl, mode: 'photo' } : undefined);
    setBusyAction('grade');
    setActionError('');
    try {
      const result = await callCaseDrillServerFunction(
        'grade',
        { caseId: activeCase.id, answer: finalAnswer, targetCount: effectiveTarget, meta: gradeMeta },
        sessionId,
      );
      const graded = result.case as PracticeCase;
      setTransientCase(graded);
      setSelectedId(graded.id);
      if (Number.isFinite(Number(graded.score))) {
        setFreshRoomRanking({
          caseId: graded.id,
          key: `case-pool-room:${graded.id}`,
          scorePercent: Math.round((Number(graded.score) / 5) * 100),
          timeSeconds: Math.round((Date.now() - caseOpenedAtRef.current) / 1000),
        });
      }
      await refreshCases();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Mate could not grade this answer. Please try again.');
    } finally {
      setBusyAction(null);
    }
  };

  // Grading for a case solved inside the Case Library tab.
  //
  // FIX (library-grade-v13.1): the platform-registered build of the
  // casemate-case-drill-v4 hook predates action=grade_library, so calling it
  // came back 400 "Unknown case drill action …" — the exact error users saw
  // on screen when submitting a library-case answer. Hook re-registration is
  // an authenticated owner operation (not available to the app or agent
  // sessions), so the library grade is now orchestrated client-side from
  // primitives that ARE deployed: the library case is upserted into
  // case_practice_cases as the same row shape grade_library would create
  // (practice_focus 'library:<case id>', meta source 'library', the case's
  // own PUBLISHED model answer embedded in the rubric as
  // reference_model_answer so the grader treats it as the 5/5 standard), and
  // the deployed action=grade then grades that row. Re-attempts reuse the
  // same row, so a case never stacks duplicate dashboard rows.
  const handleGradeLibraryCase = useCallback(
    async (item: FullCase, answerText: string): Promise<LibraryGradeResult> => {
      if (!sessionId) throw new Error('Sign in first so your graded cases can be saved.');
      const db = (window as any).__workspaceDb;
      if (!db) throw new Error('Mate could not reach your practice log. Please refresh and try again.');

      const focusKey = `library:${item.id}`;
      const rowFields = {
        case_title: item.title,
        case_type: POOL_TYPE_LABELS[item.type] || item.type,
        difficulty: DIFFICULTY_LABELS[item.difficulty] || item.difficulty,
        practice_focus: focusKey,
        prompt: `${item.situation}\n\nKey question: ${item.key_question}`,
        case_data: exhibitsToText(item),
        rubric_json: {
          ...LIBRARY_GRADE_RUBRIC,
          reference_model_answer: {
            note: 'Published model answer for this exact library case — the standard a 5/5 answer reaches. Grade the candidate against it; never contradict it.',
            framework: item.model_answer.framework_applied,
            key_findings: item.model_answer.key_findings,
            recommendation: item.model_answer.recommendation,
          },
          _casemate: {
            mode: 'library',
            source: 'library',
            library_case_id: item.id,
            pool_type: item.type,
            pool_industry: item.industry,
            difficulty_id: item.difficulty,
          },
        },
        status: 'pending',
        // The grading hook scopes reads by both row id and session id. Explicitly
        // persist the caller session so library rows are visible immediately even
        // when the client DB adapter does not auto-stamp session-scoped inserts.
        session_id: sessionId,
      };

      // Upsert: a re-attempt overwrites the previous grade instead of stacking
      // duplicate rows (same semantics grade_library was designed with).
      const existing = await db
        .from('case_practice_cases')
        .eq('session_id', sessionId)
        .eq('practice_focus', focusKey)
        .orderBy('created_at', 'desc')
        .limit(1)
        .get();
      let rowId = Number(existing?.data?.[0]?.id) || null;
      if (rowId) {
        await db.from('case_practice_cases').update(rowId, rowFields);
      } else {
        const inserted = await db.from('case_practice_cases').insert(rowFields);
        rowId = insertedRowIdOf(inserted);
        if (!rowId) {
          const found = await db
            .from('case_practice_cases')
            .eq('session_id', sessionId)
            .eq('practice_focus', focusKey)
            .orderBy('created_at', 'desc')
            .limit(1)
            .get();
          rowId = Number(found?.data?.[0]?.id) || null;
        }
        if (!rowId) throw new Error('Mate could not save this attempt. Please try again.');
      }

      const result = await callCaseDrillServerFunction(
        'grade',
        { caseId: rowId, answer: answerText, targetCount: effectiveTarget },
        sessionId,
      );
      await refreshCases();
      const gradedCase = result?.case;
      if (!gradedCase || typeof gradedCase !== 'object' || Array.isArray(gradedCase)) {
        throw new Error('Mate graded the case but returned an invalid saved report. Please try again.');
      }
      return toLibraryResult(gradedCase as PracticeCase);
    },
    [sessionId, effectiveTarget, refreshCases],
  );

  // Give up: Mate reveals a model answer; the case is recorded as skipped
  // (kept in history, excluded from every grade metric).
  const giveUp = async () => {
    if (!activeCase || !sessionId) return;
    setBusyAction('reveal');
    setActionError('');
    try {
      const result = await callCaseDrillServerFunction('reveal', { caseId: activeCase.id }, sessionId);
      const revealed = result.case as PracticeCase;
      setTransientCase(revealed);
      setSelectedId(revealed.id);
      await refreshCases();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Mate could not reveal this case. Please try again.');
    } finally {
      setBusyAction(null);
      setConfirmGiveUp(false);
    }
  };

  // "Start Case Pool for this program" launches straight into a tailored
  // case — the click in the program guide is the explicit user intent.
  useEffect(() => {
    if (!programPreset || autoStartedRef.current) return;
    if (!sessionId || casesLoading || busyAction !== null) return;
    autoStartedRef.current = true;
    generateCase('classic', {
      caseType: programPreset.caseType,
      targetProgram: programPreset.program || programPreset.company,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programPreset, sessionId, casesLoading, busyAction]);

  const resetPhoto = () => {
    setPhotoStage('idle');
    setPhotoUrl('');
    setPhotoNote('');
    setStructured(null);
  };

  const handlePhoto = async (file: File) => {
    if (!activeCase || !sessionId) {
      setActionError('Sign in to submit your case work.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setActionError('Upload a photo (JPG, PNG, or WebP) of your written work.');
      return;
    }
    setActionError('');
    setPhotoStage('uploading');
    try {
      const dataUrl = await downscalePhoto(file);
      const uploadResponse = await fetch('/api/upload/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || '' },
        body: JSON.stringify({ imageData: dataUrl, fileName: `case-${activeCase.id}-handwritten.jpg` }),
      });
      const uploadPayload = await uploadResponse.json().catch(() => ({}));
      if (!uploadResponse.ok || !uploadPayload.imageUrl) {
        throw new Error('Mate could not save your photo. Please try again.');
      }
      setPhotoUrl(uploadPayload.imageUrl);
      setPhotoStage('reading');
      const analysisResponse = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-App-Id': window.__APP_ID__ || '' },
        body: JSON.stringify({
          documentUrl: uploadPayload.imageUrl,
          analysisPrompt: buildPhotoPrompt(activeCase),
          documentType: 'image',
        }),
      });
      const analysisPayload = await analysisResponse.json().catch(() => ({}));
      if (!analysisResponse.ok || !analysisPayload.analysis) {
        throw new Error('Mate could not read this photo. Try a brighter, flatter shot of the page.');
      }
      const parsed = parseJsonLoose(String(analysisPayload.analysis));
      setStructured({
        structure: String(parsed.structure || ''),
        math: String(parsed.math || ''),
        recommendation: String(parsed.recommendation || ''),
        diagram: String(parsed.diagram || ''),
      });
      setPhotoNote(String(parsed.legibility_note || ''));
      setPhotoStage('review');
    } catch (error) {
      setPhotoStage('idle');
      setActionError(error instanceof Error ? error.message : 'Mate could not read this photo. Please try again.');
    }
  };

  const loading = !bootstrapped && (casesLoading || assessmentLoading);
  const fatalError = casesError || assessmentError;
  const targetIndustry = assessmentDirection.industry_fit?.[0]?.name;
  const targetFunction = assessmentDirection.function_fit?.[0]?.name;
  const remainingCases = effectiveTarget ? Math.max(0, effectiveTarget - completedCases.length) : null;

  // FULL-BLEED LAYOUT: Casemate is a desktop product — candidates work a case on
  // a laptop, never a phone — so every row below spans the whole window instead
  // of sitting in a narrow centred column with empty margins either side.
  // Exhibit tables, card grids and the dashboard all read better the more width
  // they get; the few blocks that are pure prose (a case narrative, a model
  // answer) keep their own readable measure inside CasePoolLibrary.
  return (
    <div className="flex mx-auto h-full min-h-0 w-full max-w-7xl flex-col bg-transparent">
      {/* Section nav. Case Pool is four separate tools, but the old underline tab
          strip drew them in muted grey below the target card, and customers were
          walking past the Library and the Toolkit without realising they existed.
          Each section is now a labelled card — icon, name, and a one-line note on
          what is inside — sitting at the very top of the app, with all four visible
          at once (2×2 on phones, one row from sm up) rather than scrolling away. */}
      <div className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 sm:px-6 lg:px-8 xl:px-12">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">
          Everything in Case Pool
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Case Pool sections">
          {([
            {
              id: 'library' as Tab,
              label: 'Case Library',
              hint: `${CASE_POOL_LIBRARY.length} ready-made cases`,
              icon: BookOpen,
            },
            { id: 'practice' as Tab, label: 'Case Room', hint: 'A case written for you', icon: ClipboardList },
            {
              id: 'toolkit' as Tab,
              label: 'Consulting Toolkit',
              hint: `${CONSULTING_FRAMEWORKS.length} frameworks`,
              icon: Wrench,
            },
            { id: 'dashboard' as Tab, label: 'Dashboard', hint: 'Your scores & progress', icon: BarChart3 },
          ]).map(({ id, label, hint, icon: Icon }) => {
            const isActive = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(id)}
                className={`flex flex-col gap-1 rounded-xl border-2 p-2 text-left transition-all ${
                  isActive
                    ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] shadow-sm'
                    : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary-200)] hover:bg-[var(--space-surface-card-hover)]'
                }`}
                data-testid={`case-pool-tab-${id}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                      isActive
                        ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                        : 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={`min-w-0 text-xs font-bold leading-4 sm:text-sm ${
                      isActive ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-primary)]'
                    }`}
                  >
                    {label}
                  </span>
                </span>
                <span className="text-[10px] leading-3 text-[var(--space-text-secondary)] sm:text-[11px] sm:leading-4">
                  {hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[var(--space-border-default)] px-3 py-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className={`${tw.card.default} overflow-hidden rounded-2xl`}>
          <div className="flex flex-col gap-2 bg-[var(--space-surface-accent-soft)] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-secondary)]">Your practice target</p>
                <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                  <span className="text-lg font-bold text-[var(--space-text-primary)]">
                    {effectiveTarget ? `${completedCases.length} / ${effectiveTarget}` : 'Set your target'}
                  </span>
                  {effectiveTarget && <span className="text-xs text-[var(--space-text-secondary)]">graded cases</span>}
                </div>
                <p className="mt-1 text-xs text-[var(--space-text-secondary)]">
                  {assessmentTarget
                    ? 'Mate set this target from your saved roadmap.'
                    : effectiveTarget
                      ? 'Manual target — update it whenever your roadmap changes.'
                      : 'No target yet — Mate assumes 12 graded cases until you or your roadmap set one.'}
                </p>
              </div>
            </div>

            {targetEditing || !effectiveTarget ? (
              <div className="flex w-full flex-col gap-2 sm:min-w-48 sm:w-auto sm:flex-row sm:items-center">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={targetInput}
                  onChange={(event) => setTargetInput(event.target.value)}
                  placeholder="e.g. 12"
                  aria-label="Required practice case count"
                  className={`${tw.input.base} ${tw.input.default} w-full py-2 text-[13px] sm:text-sm`}
                />
                <button onClick={saveManualTarget} className={`w-full rounded-lg px-3 py-2 text-[13px] sm:w-auto sm:text-sm ${tw.button.primary}`}>
                  Save
                </button>
              </div>
            ) : (
              !assessmentTarget && (
                <button onClick={() => setTargetEditing(true)} className={`rounded-lg px-3 py-2 text-xs ${tw.button.secondary}`}>
                  Update target
                </button>
              )
            )}
          </div>
          {effectiveTarget && <ProgressBar value={(completedCases.length / effectiveTarget) * 100} />}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [overflow-anchor:none]">
        {loading ? (
          /* Instant skeleton — perceived performance: the room never looks broken
             or blank while WorkspaceDB loads. */
          <div
            className="w-full space-y-3 px-3 py-3 sm:space-y-4 sm:px-6 sm:py-5 lg:px-8 xl:px-12"
            aria-busy="true"
            data-testid="case-room-skeleton"
          >
            <div className={`${tw.card.default} animate-pulse rounded-2xl p-3.5 sm:p-5`}>
              <div className="flex gap-2">
                <div className="h-5 w-24 rounded-full bg-[var(--space-surface-muted)]" />
                <div className="h-5 w-20 rounded-full bg-[var(--space-surface-muted)]" />
              </div>
              <div className="mt-4 h-5 w-2/3 rounded bg-[var(--space-surface-muted)]" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-[var(--space-surface-muted)]" />
                <div className="h-3 w-full rounded bg-[var(--space-surface-muted)]" />
                <div className="h-3 w-3/4 rounded bg-[var(--space-surface-muted)]" />
              </div>
            </div>
            <div className={`${tw.card.default} animate-pulse rounded-2xl p-3.5 sm:p-5`}>
              <div className="h-4 w-32 rounded bg-[var(--space-surface-muted)]" />
              <div className="mt-4 h-24 w-full rounded-xl bg-[var(--space-surface-muted)]" />
            </div>
            <p className="flex items-center justify-center gap-2 text-xs text-[var(--space-text-muted)]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Mate is opening your case room…
            </p>
          </div>
        ) : fatalError ? (
          <div className="mx-auto max-w-md px-5 py-16 text-center">
            <p className="text-sm text-[var(--space-semantic-danger)]">Couldn’t open your case room: {fatalError.message}</p>
            <button
              onClick={() => {
                refreshCases();
                refreshAssessments();
              }}
              className={`mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${tw.button.secondary}`}
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        ) : (
          <div className="w-full space-y-3 px-3 py-3 sm:space-y-4 sm:px-6 sm:py-5 lg:px-8 xl:px-12">
            <div className={`${tw.card.default} rounded-xl`}>
              <button
                onClick={() => setChecklistExpanded((value) => !value)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${checklistComplete ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-brand-primary)]'}`} />
                  <span className="text-sm font-semibold text-[var(--space-text-primary)]">
                    {checklistComplete ? 'Case room ready' : 'Get your case room ready'}
                  </span>
                  <span className={`${tw.badge.default} ${tw.badge.neutral}`}>
                    {checklist.filter((item) => item.done).length}/3
                  </span>
                </div>
                {checklistExpanded ? <ChevronUp className="h-4 w-4 text-[var(--space-text-muted)]" /> : <ChevronDown className="h-4 w-4 text-[var(--space-text-muted)]" />}
              </button>
              {checklistExpanded && (
                <div className="space-y-2 border-t border-[var(--space-border-default)] px-4 py-3">
                  {checklist.map((item, index) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          item.done
                            ? 'bg-[var(--space-semantic-success)] text-white'
                            : 'border border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
                        }`}
                      >
                        {item.done ? <Check className="h-3 w-3" /> : index + 1}
                      </span>
                      <span className={`text-xs ${item.done ? 'text-[var(--space-text-muted)] line-through' : 'text-[var(--space-text-secondary)]'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                  {!latestAssessment && (
                    <p className="pt-1 text-[11px] text-[var(--space-text-muted)]">
                      You can start drilling right away — cases stay general until you share your CV with Mate, then every new case locks onto your target industry and function.
                    </p>
                  )}
                </div>
              )}
            </div>

            {actionError && (
              <div className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] px-4 py-3 text-sm text-[var(--space-semantic-danger)]">
                {actionError}
              </div>
            )}

            {programPreset && (
              <div className="flex items-start justify-between gap-3 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
                  <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                    <span className="font-semibold text-[var(--space-text-primary)]">
                      Drilling for {programPreset.program || programPreset.company}
                    </span>{' '}
                    — Mate preset your case type to{' '}
                    {CASE_TYPE_OPTIONS.find((option) => option.id === programPreset.caseType)?.label || 'the most relevant type'}
                    {Array.isArray(programPreset.caseTypes) && programPreset.caseTypes.length > 1
                      ? `; also drill ${programPreset.caseTypes
                          .slice(1)
                          .map((id) => CASE_TYPE_OPTIONS.find((option) => option.id === id)?.label || id)
                          .join(' and ')} for this program`
                      : ''}
                    . New cases stay tailored to this program until you dismiss this.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProgramPreset(null)}
                  className="shrink-0 text-[11px] font-medium text-[var(--space-text-muted)] underline"
                  data-testid="button-clear-program-preset"
                >
                  Dismiss
                </button>
              </div>
            )}

            {tab === 'library' ? (
              <CasePoolLibrary
                sessionId={sessionId || ''}
                extraHistory={casePracticeHistory}
                results={libraryResults}
                onGrade={handleGradeLibraryCase}
                openRequest={libraryOpenRequest}
              />
            ) : tab === 'toolkit' ? (
              <ConsultingToolkit />
            ) : tab === 'practice' ? (
              <>
                {/* UX fix #6: the moment "Generate" fires, the previous case is
                    hidden and this loading card takes its place — the fresh
                    case renders only when it is fully ready, so old and new
                    case content are never visible together. */}
                {busyAction === 'generate' ? (
                  <div className={`${tw.card.default} rounded-2xl p-4 text-center sm:p-6`} data-testid="case-generating">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]">
                      <Loader2 className="h-5 w-5 animate-spin text-[var(--space-brand-primary)]" />
                    </div>
                    <h2 className="mt-3 text-base font-bold leading-snug text-[var(--space-text-primary)] sm:mt-4 sm:text-lg">Mate is building your case…</h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--space-text-secondary)]">
                      A fresh prompt, realistic exhibit data, and a grading rubric are being written for you right now —
                      your case appears here the moment it is fully ready.
                    </p>
                    <div className="mx-auto mt-5 w-full max-w-md space-y-2.5" aria-hidden="true">
                      <div className="h-3 w-full animate-pulse rounded-full bg-[var(--space-surface-muted)]" />
                      <div className="h-3 w-5/6 animate-pulse rounded-full bg-[var(--space-surface-muted)]" />
                      <div className="h-3 w-2/3 animate-pulse rounded-full bg-[var(--space-surface-muted)]" />
                    </div>
                  </div>
                ) : !activeCase ? (
                  <div className={`${tw.card.default} rounded-2xl p-4 text-center sm:p-6`}>
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]">
                      <Sparkles className="h-5 w-5 text-[var(--space-brand-primary)]" />
                    </div>
                    <h2 className="mt-3 text-base font-bold leading-snug text-[var(--space-text-primary)] sm:mt-4 sm:text-lg">Ready for a case built around you?</h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--space-text-secondary)]">
                      {latestAssessment
                        ? `Mate will use your ${targetIndustry || 'target industry'} and ${targetFunction || 'target function'} roadmap to create a fresh case — and the case menu below is reordered to the types your matched programs actually test.`
                        : 'Mate will build you a realistic interview case right away — share your CV with Mate anytime and every new case locks onto your target industry and function.'}{' '}
                      Pick a case type below (or let Mate mix them), then type your answer, snap a photo of your handwritten work, or get walked through it step by step.
                    </p>
                    <div className="mt-5">
                      <CaseTypePicker
                        value={caseType}
                        onChange={setCaseType}
                        relevance={caseTypeRelevance}
                        fitLabel={[targetIndustry, targetFunction].filter(Boolean).join(' · ') || undefined}
                      />
                    </div>
                    <div className="mt-4">
                      <DifficultyPicker value={difficulty} onChange={chooseDifficulty} centered />
                    </div>
                    <div className="mt-4 flex w-full flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center sm:justify-center">
                      <button
                        onClick={() => generateCase('classic')}
                        disabled={busyAction !== null}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold sm:inline-flex sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        {busyAction === 'generate' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                        {busyAction === 'generate' ? 'Mate is building your case…' : 'Generate my first case'}
                      </button>
                      <button
                        onClick={() => generateCase('guided')}
                        disabled={busyAction !== null}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold sm:inline-flex sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${tw.button.secondary} disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        <GraduationCap className="h-4 w-4" />
                        Walk me through one
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Case room layout: case-type switching + generate controls live
                     in a LEFT sidebar on desktop (stacked below on mobile) so they
                     are always easy to reach — user feedback said the old bottom
                     placement was hard to find. */
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                    <aside className="order-last lg:order-first lg:w-60 lg:flex-shrink-0">
                      <div className={`${tw.card.default} rounded-2xl p-4 lg:sticky lg:top-4`}>
                        <CaseTypePicker
                          value={caseType}
                          onChange={setCaseType}
                          label="Case type"
                          vertical
                          relevance={caseTypeRelevance}
                          fitLabel={[targetIndustry, targetFunction].filter(Boolean).join(' · ') || undefined}
                        />
                        <div className="mt-4">
                          <DifficultyPicker value={difficulty} onChange={chooseDifficulty} />
                        </div>
                        <div className="mt-4 space-y-2">
                          <button
                            onClick={() => generateCase('classic')}
                            disabled={busyAction !== null}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
                            data-testid="button-generate-another-case"
                          >
                            {busyAction === 'generate' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                            {busyAction === 'generate' ? 'Building your case…' : 'Generate another case'}
                          </button>
                          <button
                            onClick={() => generateCase('guided')}
                            disabled={busyAction !== null}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.secondary} disabled:cursor-not-allowed disabled:opacity-50`}
                            data-testid="button-guided-case"
                          >
                            <GraduationCap className="h-4 w-4" />
                            Guided case with Mate
                          </button>
                        </div>
                        <p className="mt-2 text-center text-[10px] leading-tight text-[var(--space-text-muted)]">
                          New cases use the type selected above — “Mix it up” fills what you’ve practiced least
                          {caseTypeRelevance.personalized ? ' across your matched case types' : ''}.
                        </p>
                      </div>
                    </aside>
                    <div className="min-w-0 flex-1 space-y-4">
                    <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`${tw.badge.default} ${tw.badge.primary}`}>{activeCase.case_type}</span>
                        <span className={`${tw.badge.default} ${tw.badge.neutral}`}>{activeCase.difficulty || 'Intermediate'}</span>
                        {activeMeta.mode === 'guided' && (
                          <span className={`${tw.badge.default} ${tw.badge.accent} inline-flex items-center gap-1`}>
                            <GraduationCap className="h-3 w-3" /> Guided
                          </span>
                        )}
                        {activeCase.status === 'completed' &&
                          (activeMeta.skipped ? (
                            <span className={`${tw.badge.default} ${tw.badge.warning} inline-flex items-center gap-1`}>
                              <Flag className="h-3 w-3" /> Skipped · not scored
                            </span>
                          ) : (
                            <span className={`${tw.badge.default} ${tw.badge.success}`}>Graded {activeCase.score}/5</span>
                          ))}
                      </div>
                      <h2 className="mt-2 break-words text-base font-bold leading-snug text-[var(--space-text-primary)] sm:mt-3 sm:text-lg">{activeCase.case_title}</h2>
                      {activeCase.practice_focus && (
                        <p className="mt-1 text-xs font-medium text-[var(--space-text-brand)]">Focus: {activeCase.practice_focus}</p>
                      )}
                      <div className="mt-4 rounded-xl bg-[var(--space-surface-muted)] p-4">
                        <p className="whitespace-pre-wrap text-[13px] leading-5 text-[var(--space-text-primary)] sm:text-sm sm:leading-6">{activeCase.prompt}</p>
                      </div>
                      {activeExhibitChart && <ExhibitChartCard chart={activeExhibitChart} />}
                      {activeCase.case_data && (
                        <div className="mt-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Case facts & exhibits</h3>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">{activeCase.case_data}</p>
                        </div>
                      )}
                      {activeCase.status === 'pending' && (
                        <div className="mt-4 flex flex-col gap-2 border-t border-[var(--space-border-default)] pt-3 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
                            Completely stuck? You can reveal Mate’s model answer — the case stays in your history as skipped and never counts toward your grades.
                          </p>
                          {confirmGiveUp ? (
                            <div className="flex shrink-0 items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setConfirmGiveUp(false)}
                                disabled={busyAction !== null}
                                className={`rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.secondary} disabled:cursor-not-allowed disabled:opacity-50`}
                                data-testid="button-keep-trying"
                              >
                                Keep trying
                              </button>
                              <button
                                type="button"
                                onClick={giveUp}
                                disabled={busyAction !== null}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--space-semantic-warning)] px-3 py-2 text-xs font-semibold text-[var(--space-semantic-warning)] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                data-testid="button-confirm-give-up"
                              >
                                {busyAction === 'reveal' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Eye className="h-3.5 w-3.5" />}
                                {busyAction === 'reveal' ? 'Revealing…' : 'Yes — reveal, don’t score me'}
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmGiveUp(true)}
                              disabled={busyAction !== null}
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--space-border-strong)] px-3 py-2 text-xs font-medium text-[var(--space-text-secondary)] transition-colors hover:border-[var(--space-semantic-warning)] hover:text-[var(--space-semantic-warning)] disabled:cursor-not-allowed disabled:opacity-50"
                              data-testid="button-give-up"
                            >
                              <Flag className="h-3.5 w-3.5" />
                              Give up · reveal answer
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {activeCase.status === 'pending' ? (
                      activeMeta.mode === 'guided' ? (
                        <GuidedWalkthrough
                          practiceCase={activeCase}
                          sessionId={sessionId || ''}
                          grading={busyAction === 'grade'}
                          onError={setActionError}
                          onUpdated={(row) => {
                            setTransientCase(row);
                            setSelectedId(row.id);
                            refreshCases();
                          }}
                          onGrade={(draft) => gradeAnswer(draft, { mode: 'guided' })}
                        />
                      ) : (
                        <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
                          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                            <div className="flex items-center gap-1.5">
                              <MessageSquareText className="h-3.5 w-3.5 shrink-0 text-[var(--space-brand-primary)]" />
                              <h3 className="text-[13px] font-semibold text-[var(--space-text-primary)] sm:text-sm">Your answer</h3>
                            </div>
                            <div className="flex w-full rounded-lg border border-[var(--space-border-default)] p-0.5 sm:w-auto">
                              {([
                                { id: 'type' as const, label: 'Type it', icon: PenLine },
                                { id: 'photo' as const, label: 'From a photo', icon: Camera },
                              ]).map(({ id, label, icon: Icon }) => (
                                <button
                                  key={id}
                                  onClick={() => setAnswerMode(id)}
                                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                    answerMode === id
                                      ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                                      : 'text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]'
                                  }`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                          {answerMode === 'type' ? (
                            <>
                              <p className="mt-1 text-xs text-[var(--space-text-muted)]">
                                Show your structure, calculations, reasoning, and final recommendation. Clear beats long.
                              </p>
                              <div className="mt-3">
                                <FrameworkToolkit
                                  caseTypeLabel={activeCase.case_type}
                                  onInsert={(text) => setAnswer((value) => (value.trim() ? value + '\n\n' + text : text))}
                                />
                              </div>
                              <textarea
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                rows={10}
                                placeholder="Start with your structure, work through the numbers, then land a specific recommendation…"
                                className={`${tw.input.base} ${tw.input.default} mt-4 min-h-56 resize-y text-sm leading-6`}
                              />
                              <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <span className="text-[11px] text-[var(--space-text-muted)]">{answer.trim().length} characters · 80 minimum</span>
                                <button
                                  onClick={() => gradeAnswer()}
                                  disabled={busyAction !== null || answer.trim().length < 80}
                                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold sm:inline-flex sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-40`}
                                >
                                  {busyAction === 'grade' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                  {busyAction === 'grade' ? 'Mate is grading…' : 'Submit for Mate’s grade'}
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="mt-4">
                              {photoStage === 'idle' && (
                                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] px-4 py-10 text-center">
                                  <Camera className="h-7 w-7 text-[var(--space-brand-primary)]" />
                                  <span className="text-sm font-semibold text-[var(--space-text-primary)]">Snap or upload a photo of your written work</span>
                                  <span className="max-w-sm text-xs leading-5 text-[var(--space-text-muted)]">
                                    Solve the case on paper like the real interview, then photograph the page. Mate reads your handwriting and turns it into an editable answer you can fix before grading.
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0];
                                      if (file) handlePhoto(file);
                                      event.target.value = '';
                                    }}
                                  />
                                </label>
                              )}
                              {(photoStage === 'uploading' || photoStage === 'reading') && (
                                <div className="flex flex-col items-center gap-3 rounded-xl bg-[var(--space-surface-muted)] px-4 py-10 text-center">
                                  <Loader2 className="h-6 w-6 animate-spin text-[var(--space-brand-primary)]" />
                                  <p className="text-sm text-[var(--space-text-secondary)]">
                                    {photoStage === 'uploading' ? 'Saving your photo…' : 'Mate is reading your handwriting…'}
                                  </p>
                                </div>
                              )}
                              {photoStage === 'review' && structured && (
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    {photoUrl && (
                                      <img
                                        src={photoUrl}
                                        alt="Your handwritten case work"
                                        className="h-20 w-20 shrink-0 rounded-lg border border-[var(--space-border-default)] object-cover"
                                      />
                                    )}
                                    <div>
                                      <p className="text-sm font-semibold text-[var(--space-text-primary)]">Here’s what Mate read — fix anything before grading.</p>
                                      {photoNote && <p className="mt-1 text-xs text-[var(--space-semantic-warning)]">{photoNote}</p>}
                                      <button onClick={resetPhoto} className="mt-1 text-xs font-medium text-[var(--space-text-brand)] underline">
                                        Use a different photo
                                      </button>
                                    </div>
                                  </div>
                                  {([
                                    { key: 'structure' as const, label: 'Structure', rows: 4 },
                                    { key: 'math' as const, label: 'Math & numbers', rows: 5 },
                                    { key: 'recommendation' as const, label: 'Recommendation', rows: 3 },
                                  ]).map(({ key, label, rows }) => (
                                    <div key={key}>
                                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{label}</label>
                                      <textarea
                                        value={structured[key]}
                                        onChange={(event) => setStructured({ ...structured, [key]: event.target.value })}
                                        rows={rows}
                                        className={`${tw.input.base} ${tw.input.default} mt-1.5 resize-y text-sm leading-6`}
                                      />
                                    </div>
                                  ))}
                                  <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Framework diagram · optional outline, two spaces per level</label>
                                    <textarea
                                      value={structured.diagram}
                                      onChange={(event) => setStructured({ ...structured, diagram: event.target.value })}
                                      rows={4}
                                      placeholder={'Revenue\n  Price\n  Volume\nCosts\n  Fixed\n  Variable'}
                                      className={`${tw.input.base} ${tw.input.default} mt-1.5 resize-y font-mono text-xs leading-5`}
                                    />
                                    {structured.diagram.trim() && (
                                      <div className="mt-2">
                                        <DiagramOutline text={structured.diagram} />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                      onClick={() => {
                                        setAnswer(composeStructuredAnswer(structured));
                                        setAnswerMode('type');
                                      }}
                                      className="text-left text-xs font-medium text-[var(--space-text-brand)] underline"
                                    >
                                      Edit as plain text instead
                                    </button>
                                    <button
                                      onClick={() => gradeAnswer(composeStructuredAnswer(structured), { photoUrl, structured, mode: 'photo' })}
                                      disabled={busyAction !== null || composeStructuredAnswer(structured).trim().length < 80}
                                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold sm:inline-flex sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-40`}
                                    >
                                      {busyAction === 'grade' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                      {busyAction === 'grade' ? 'Mate is grading…' : 'Submit for Mate’s grade'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    ) : (
                      <>
                        <GradeReport practiceCase={activeCase} />
                        {freshRoomRanking && freshRoomRanking.caseId === activeCase.id && !activeMeta.skipped ? (
                          <PercentileRankingWidget
                            className="mt-3"
                            app="case_pool"
                            scorePercent={freshRoomRanking.scorePercent}
                            timeSeconds={freshRoomRanking.timeSeconds}
                            submissionKey={freshRoomRanking.key}
                          />
                        ) : null}
                      </>
                    )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className={`${tw.card.default} rounded-xl p-4`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Completed</p>
                    <div className="mt-2 flex items-center gap-3">
                      {effectiveTarget ? (
                        <ProgressRing
                          percent={(completedCases.length / effectiveTarget) * 100}
                          label={`${completedCases.length} of ${effectiveTarget} cases completed`}
                          size={60}
                        />
                      ) : null}
                      <div className="min-w-0">
                        <p className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">
                          {completedCases.length}<span className="text-sm font-normal text-[var(--space-text-muted)]">/{effectiveTarget || '—'}</span>
                        </p>
                        <p className="mt-1 text-xs text-[var(--space-text-secondary)]">
                          {remainingCases === null ? 'Set a target' : remainingCases === 0 ? 'Target reached' : `${remainingCases} to close the gap`}
                          {skippedCount > 0 ? ` · ${skippedCount} skipped (not scored)` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`${tw.card.default} rounded-xl p-4`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Average grade</p>
                    <p className="mt-1 text-2xl font-bold text-[var(--space-text-primary)]">
                      {stats.scores.length ? stats.average.toFixed(1) : '—'}<span className="text-sm font-normal text-[var(--space-text-muted)]">/5</span>
                    </p>
                    <div className="mt-2">
                      <ScoreGauge value={stats.scores.length ? stats.average : 0} target={stats.scoreBar} />
                    </div>
                    <p className="mt-1 text-xs text-[var(--space-text-secondary)]">Target bar {stats.scoreBar.toFixed(1)}/5 — the tick on the gauge</p>
                  </div>
                  <div className={`${tw.card.default} rounded-xl p-4`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Trend</p>
                    <div className="mt-1 flex items-end justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {stats.trendDelta > 0.1 ? (
                          <TrendingUp className="h-5 w-5 text-[var(--space-semantic-success)]" />
                        ) : stats.trendDelta < -0.1 ? (
                          <TrendingDown className="h-5 w-5 text-[var(--space-semantic-warning)]" />
                        ) : (
                          <BarChart3 className="h-5 w-5 text-[var(--space-text-muted)]" />
                        )}
                        <span className="text-lg font-bold text-[var(--space-text-primary)]">
                          {!stats.scores.length ? '—' : stats.trendDelta > 0.1 ? 'Improving' : stats.trendDelta < -0.1 ? 'Dipping' : 'Steady'}
                        </span>
                      </div>
                      <RecentScoreBars scores={stats.scores} />
                    </div>
                    <p className="mt-1 text-xs text-[var(--space-text-secondary)]">
                      Recent 3 vs prior 3{stats.scores.length > 3 ? ` · ${stats.trendDelta >= 0 ? '+' : ''}${stats.trendDelta.toFixed(1)}` : ''}
                    </p>
                  </div>
                </div>

                <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
                  <div className="flex items-center gap-4">
                    <ProgressRing percent={stats.readiness} label="Interview readiness" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Interview readiness</p>
                      <h2 className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">
                        {Math.round(stats.readiness)}% ready
                      </h2>
                      <p className="mt-0.5 text-xs text-[var(--space-text-muted)]">Volume + grade quality</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]">
                    This bar closes as you finish your required cases and lift your average toward {stats.scoreBar.toFixed(1)}/5. It is a practice signal, not a hiring guarantee.
                  </p>
                </div>

                <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
                  <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">Average grade trend</h3>
                  <div className="mt-4">
                    <TrendSparkline values={stats.averageTrend} />
                  </div>
                </div>

                <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
                  <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">Performance by case type</h3>
                  <p className="mt-1 text-xs text-[var(--space-text-muted)]">Bar height = your average grade for that type, out of 5 — hover or tap a bar for the exact numbers. Real interviews mix case types — “Mix it up” automatically fills the gaps.</p>
                  {typeMix.length === 0 ? (
                    <p className="mt-3 text-xs text-[var(--space-text-muted)]">No cases yet — your breakdown appears after your first drill.</p>
                  ) : (
                    <div className="mt-4">
                      <TypePerformanceBarChart data={typeMix} />
                    </div>
                  )}
                </div>

                <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
                  <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">Case mix</h3>
                  <p className="mt-1 text-xs text-[var(--space-text-muted)]">How your practice splits across case types — each slice shows its share, with counts in the legend.</p>
                  {typeMix.length === 0 ? (
                    <p className="mt-3 text-xs text-[var(--space-text-muted)]">No cases yet — generate your first case to see your mix take shape.</p>
                  ) : (
                    <div className="mt-4">
                      <CaseTypeDonut data={typeMix} />
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">Case history</h3>
                    <button onClick={() => generateCase('classic')} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs ${tw.button.secondary}`}>
                      <Sparkles className="h-3.5 w-3.5" /> New case
                    </button>
                  </div>
                  {(cases || []).length === 0 ? (
                    <div className={`${tw.card.default} rounded-xl p-6 text-center`}>
                      <p className="text-sm font-medium text-[var(--space-text-primary)]">No cases yet</p>
                      <p className="mt-1 text-xs text-[var(--space-text-muted)]">Generate your first case to start the trend line.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(cases || []).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            // A case solved in the Case Library reopens there,
                            // not in the Case Room it never belonged to.
                            const libraryId = libraryCaseIdOf(item);
                            if (libraryId) {
                              setLibraryOpenRequest({ id: libraryId, nonce: Date.now() });
                              setTab('library');
                              return;
                            }
                            setSelectedId(item.id);
                            setTransientCase(null);
                            setAnswer(item.answer_text || '');
                            setTab('practice');
                          }}
                          className={`${tw.card.default} flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left`}
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.status === 'completed' && !caseMeta(item).skipped ? 'bg-[var(--space-surface-accent-soft)]' : 'bg-[var(--space-surface-muted)]'}`}>
                            {item.status === 'completed' ? (
                              caseMeta(item).skipped ? (
                                <Flag className="h-4 w-4 text-[var(--space-semantic-warning)]" />
                              ) : (
                                <span className="text-sm font-bold text-[var(--space-text-brand)]">{item.score}/5</span>
                              )
                            ) : (
                              <ClipboardList className="h-4 w-4 text-[var(--space-text-muted)]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[var(--space-text-primary)]">{item.case_title}</p>
                            <p className="mt-0.5 text-[11px] text-[var(--space-text-muted)]">
                              {caseMeta(item).mode === 'guided'
                                ? 'Guided · '
                                : caseMeta(item).mode === 'photo'
                                  ? 'From photo · '
                                  : caseMeta(item).mode === 'library'
                                    ? 'Case Library · '
                                    : ''}
                              {item.case_type} ·{' '}
                              {item.status !== 'completed'
                                ? 'Awaiting your answer'
                                : caseMeta(item).skipped
                                  ? `Skipped · answer revealed · ${formatDate(item.completed_on)}`
                                  : formatDate(item.completed_on)}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[var(--space-text-muted)]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Easy / Medium / Hard dial for the NEXT generated case — a plain segmented
// control; the active level's hint spells out what changes at that level.
function DifficultyPicker({
  value,
  onChange,
  centered = false,
}: {
  value: Difficulty;
  onChange: (level: Difficulty) => void;
  centered?: boolean;
}) {
  const active = DIFFICULTY_OPTIONS.find((option) => option.id === value);
  return (
    <div>
      <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)] ${centered ? 'text-center' : ''}`}>
        Difficulty
      </p>
      <div
        className={`flex rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-0.5 ${centered ? 'mx-auto max-w-xs' : ''}`}
        role="group"
        aria-label="Case difficulty"
      >
        {DIFFICULTY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            title={option.hint}
            aria-pressed={value === option.id}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              value === option.id
                ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                : 'text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]'
            }`}
            data-testid={`difficulty-option-${option.id}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p
        className={`mt-1.5 text-[10px] leading-tight text-[var(--space-text-muted)] ${centered ? 'mx-auto max-w-xs text-center' : ''}`}
        data-testid="difficulty-hint"
      >
        {active ? `${active.hint}. ` : ''}Applies to your next case.
      </p>
    </div>
  );
}

function CaseTypePicker({
  value,
  onChange,
  label = 'Case type',
  vertical = false,
  relevance,
  fitLabel,
}: {
  value: string;
  onChange: (id: string) => void;
  label?: string;
  vertical?: boolean;
  relevance: RelevantCaseTypes;
  fitLabel?: string;
}) {
  // Personalized menu (see caseTypeCatalog.ts): the case types mapped to the
  // candidate's matched industry/function come first, ordered closest-match
  // first. Every other type stays reachable behind "Show all case types" —
  // the filtering is a default view, never a hard lock. Without a completed
  // assessment the menu shows the general consulting mix plus a prompt to
  // complete the assessment with Mate.
  const [showAll, setShowAll] = useState(false);
  const recommended = relevance.ids
    .map((id) => CASE_TYPE_OPTIONS.find((option) => option.id === id))
    .filter((option): option is { id: string; label: string; hint: string } => Boolean(option));
  const mixed = CASE_TYPE_OPTIONS.find((option) => option.id === 'mixed');
  const primary = mixed ? [mixed, ...recommended] : recommended;
  const rest = CASE_TYPE_CATALOG.filter((option) => !relevance.ids.includes(option.id));
  // Keep the menu expanded while a type from the "more" set is selected so
  // the active pill never disappears.
  const lockedOpen = rest.some((option) => option.id === value);
  const expanded = showAll || lockedOpen;
  const visible = expanded ? [...primary, ...rest] : primary;
  const caption = relevance.personalized
    ? `Matched to your ${fitLabel || 'matched industry and function'} fit — closest match first.`
    : 'General mix — complete the fit assessment with Mate to unlock the case types your target industry and function actually test.';
  const toggle =
    rest.length > 0 && !lockedOpen ? (
      <button
        type="button"
        onClick={() => setShowAll((current) => !current)}
        className="text-[11px] font-medium text-[var(--space-text-brand)] underline"
        data-testid="button-toggle-all-case-types"
      >
        {expanded ? 'Show fewer case types' : `Show all case types (${rest.length} more)`}
      </button>
    ) : null;

  // Vertical variant: a stacked, left-aligned list for the case-room sidebar
  // (easier to scan and tap than a wrapped pill cloud).
  if (vertical) {
    return (
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">{label}</p>
        <div className="space-y-1">
          {visible.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              title={option.hint}
              className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                value === option.id
                  ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                  : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
              }`}
              data-testid={`case-type-option-${option.id}`}
            >
              {option.id === 'mixed' && <Shuffle className="h-3 w-3 flex-shrink-0" />}
              {option.label}
            </button>
          ))}
        </div>
        {toggle && <div className="mt-1.5">{toggle}</div>}
        <p className="mt-2 text-[10px] leading-tight text-[var(--space-text-muted)]" data-testid="case-type-personalization-note">
          {caption}
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">{label}</p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {visible.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            title={option.hint}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              value === option.id
                ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
            }`}
          >
            {option.id === 'mixed' && <Shuffle className="h-3 w-3" />}
            {option.label}
          </button>
        ))}
      </div>
      {toggle && <div className="mt-1.5 text-center">{toggle}</div>}
      <p className="mx-auto mt-2 max-w-md text-center text-[10px] leading-tight text-[var(--space-text-muted)]" data-testid="case-type-personalization-note">
        {caption}
      </p>
    </div>
  );
}

// Action plan items arrive as {action, why} objects from case-drill-v12
// grading onward; older graded rows stored plain strings. Both shapes render.
interface ActionPlanItem {
  action: string;
  why: string;
}

function normalizeActionPlan(raw: JsonValue | undefined): ActionPlanItem[] {
  return asList(raw)
    .map((item): ActionPlanItem => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        return { action: String((item as any).action || ''), why: String((item as any).why || '') };
      }
      return { action: String(item ?? ''), why: '' };
    })
    .filter((item) => item.action.trim().length > 0);
}

function cleanStringList(value: unknown): string[] {
  return asList(value as JsonValue)
    .map((item) => String(item ?? '').trim())
    .filter((item) => item.length > 0);
}

function GradeReport({ practiceCase }: { practiceCase: PracticeCase }) {
  const breakdown = asObject(practiceCase.score_breakdown_json);
  const recommendations = normalizeActionPlan(practiceCase.recommendations_json);
  const meta = caseMeta(practiceCase);
  // v12 grade report: model answer + delta live under meta.grade_report.
  // Older graded cases have none of it — those sections simply don't render.
  const report = asObject(meta.grade_report);
  const modelAnswer = asObject(report.model_answer);
  const modelFramework = String(modelAnswer.framework || '').trim();
  const modelFindings = cleanStringList(modelAnswer.key_findings);
  const modelRecommendation = String(modelAnswer.recommendation || '').trim();
  const hasModelAnswer = Boolean(modelFramework || modelFindings.length > 0 || modelRecommendation);
  const delta = asObject(report.delta);
  const deltaMatched = cleanStringList(delta.matched);
  const deltaMissing = cleanStringList(delta.missing);
  const hasDelta = deltaMatched.length > 0 || deltaMissing.length > 0;
  const gradeSummary = String(report.summary || '').trim();

  // Skipped/revealed case: show the model answer instead of a grade and make
  // it unmistakable that this one is excluded from performance metrics.
  if (meta.skipped) {
    return (
      <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`} data-testid="skipped-case-report">
        <div className="flex flex-col gap-3 border-b border-[var(--space-border-default)] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Answer revealed</p>
            <h3 className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">Skipped — this one isn’t scored</h3>
            <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
              It stays in your history so you can review it, but it doesn’t count toward your average grade, trend, or readiness.
            </p>
          </div>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]">
            <Flag className="h-6 w-6" />
          </div>
        </div>
        {typeof meta.model_answer === 'string' && meta.model_answer && (
          <div className="mt-4">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
              <Eye className="h-3.5 w-3.5" /> Mate’s model answer
            </h4>
            <p className="mt-2 whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-4 text-sm leading-6 text-[var(--space-text-secondary)]">
              {String(meta.model_answer)}
            </p>
          </div>
        )}
        <p className="mt-4 text-xs leading-5 text-[var(--space-text-brand)]">
          Study the structure, then generate a fresh case of the same type — solving one yourself is what moves your grade.
        </p>
      </div>
    );
  }

  return (
    <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
      <div className="flex flex-col gap-3 border-b border-[var(--space-border-default)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Mate’s grade</p>
          <h3 className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">Your next rep starts here</h3>
          {(meta.mode === 'guided' || meta.photo_url) && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {meta.mode === 'guided' && (
                <span className={`${tw.badge.default} ${tw.badge.primary} inline-flex items-center gap-1`}>
                  <GraduationCap className="h-3 w-3" /> Built step by step with Mate
                </span>
              )}
              {typeof meta.photo_url === 'string' && meta.photo_url && (
                <a
                  href={meta.photo_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`${tw.badge.default} ${tw.badge.neutral} inline-flex items-center gap-1 underline`}
                >
                  <Camera className="h-3 w-3" /> View your handwritten work
                </a>
              )}
            </div>
          )}
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]">
          <span className="text-lg font-bold sm:text-xl">{practiceCase.score}</span><span className="text-[11px] sm:text-xs">/5</span>
        </div>
      </div>

      {gradeSummary && (
        <p className="mt-4 rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-sm leading-6 text-[var(--space-text-primary)]" data-testid="grade-summary">
          {gradeSummary}
        </p>
      )}

      {typeof practiceCase.answer_text === 'string' && practiceCase.answer_text.trim() && (
        <div className="mt-4" data-testid="your-answer-summary">
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
            <MessageSquareText className="h-3.5 w-3.5" /> Your answer
          </h4>
          <p className="mt-2 max-h-44 overflow-y-auto whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-4 text-xs leading-5 text-[var(--space-text-secondary)]">
            {practiceCase.answer_text}
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {Object.entries(DIMENSION_LABELS).map(([key, label]) => {
          const item = asObject(breakdown[key]);
          return (
            <div key={key} className="rounded-xl bg-[var(--space-surface-muted)] p-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-[var(--space-text-primary)]">{label}</h4>
                <span className={`${tw.badge.default} ${Number(item.score) >= 4 ? tw.badge.success : tw.badge.warning}`}>
                  {item.score || '—'}/5
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]">{item.evidence || 'No evidence returned.'}</p>
              <p className="mt-2 text-xs font-medium leading-5 text-[var(--space-text-brand)]">Next: {item.next_step || 'Make this clearer in your next answer.'}</p>
            </div>
          );
        })}
      </div>

      {hasModelAnswer && (
        <div className="mt-4 rounded-2xl border-2 border-[var(--space-brand-primary)] p-4" data-testid="model-answer-card">
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">
            <Lightbulb className="h-3.5 w-3.5" /> Model Answer
          </h4>
          {modelFramework && (
            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Framework</p>
              <p className="mt-1 flex gap-1.5 text-sm leading-6 text-[var(--space-text-primary)]">
                <Network className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--space-brand-primary)]" />
                <span>{modelFramework}</span>
              </p>
            </div>
          )}
          {modelFindings.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Key findings</p>
              <ul className="mt-1.5 space-y-1.5">
                {modelFindings.map((finding, index) => (
                  <li key={`${finding}-${index}`} className="flex gap-2 text-sm leading-6 text-[var(--space-text-secondary)]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--space-brand-primary)]" aria-hidden />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modelRecommendation && (
            <div className="mt-3 rounded-xl bg-[var(--space-surface-accent-soft)] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Recommendation</p>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-primary)]">{modelRecommendation}</p>
            </div>
          )}
        </div>
      )}

      {hasDelta && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2" data-testid="delta-comparison">
          <div className="rounded-xl border border-[var(--space-border-default)] p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-[var(--space-semantic-success)]">
              <CheckCircle2 className="h-3.5 w-3.5" /> What you got right
            </h4>
            {deltaMatched.length > 0 ? (
              <ul className="mt-2 space-y-1.5">
                {deltaMatched.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-[var(--space-semantic-success)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]">
                Nothing matched the model answer this time — check what you missed on the right to see where to start.
              </p>
            )}
          </div>
          <div className="rounded-xl border border-[var(--space-border-default)] p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-[var(--space-semantic-warning)]">
              <XCircle className="h-3.5 w-3.5" /> What you missed
            </h4>
            {deltaMissing.length > 0 ? (
              <ul className="mt-2 space-y-1.5">
                {deltaMissing.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                    <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--space-semantic-warning)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]">
                No major gaps compared to the model answer — keep it up!
              </p>
            )}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Action plan</h4>
          <ol className="mt-3 space-y-3">
            {recommendations.map((item, index) => (
              <li key={`${item.action}-${index}`} className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[10px] font-bold text-[var(--space-text-brand)]">{index + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm leading-5 text-[var(--space-text-secondary)]">{item.action}</p>
                  {item.why && (
                    <p className="mt-1 text-xs leading-5 text-[var(--space-text-brand)]">
                      <span className="font-bold">Why?</span> {item.why}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function GuidedWalkthrough({
  practiceCase,
  sessionId,
  grading,
  onUpdated,
  onGrade,
  onError,
}: {
  practiceCase: PracticeCase;
  sessionId: string;
  grading: boolean;
  onUpdated: (row: PracticeCase) => void;
  onGrade: (draft: string) => void;
  onError: (message: string) => void;
}) {
  const meta = caseMeta(practiceCase);
  const walkthrough = asObject(meta.walkthrough);
  const steps = asList(walkthrough.steps);
  const currentIndex = Math.min(steps.length, GUIDED_STEPS.length - 1);
  const done = steps.length >= GUIDED_STEPS.length;
  const [input, setInput] = useState('');
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setInput('');
    setDraft(String(walkthrough.draft_answer || ''));
  }, [practiceCase.id, steps.length]);

  const sendStep = async () => {
    if (!sessionId) {
      onError('Sign in to work through this case with Mate.');
      return;
    }
    if (input.trim().length < 30) {
      onError('Give Mate at least a couple of sentences for this step.');
      return;
    }
    setSending(true);
    onError('');
    try {
      const result = await callCaseDrillServerFunction(
        'walkthrough',
        { caseId: practiceCase.id, step: GUIDED_STEPS[steps.length].key, response: input.trim() },
        sessionId,
      );
      onUpdated(result.case as PracticeCase);
      setInput('');
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Mate could not review this step. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`${tw.card.default} rounded-2xl p-3.5 sm:p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-[var(--space-brand-primary)]" />
          <h3 className="text-sm font-semibold text-[var(--space-text-primary)]">Guided drill — Mate walks you through it</h3>
        </div>
        <span className={`${tw.badge.default} ${tw.badge.primary}`}>{done ? 'Wrap-up' : GUIDED_STEPS[currentIndex].label}</span>
      </div>
      <p className="mt-1 text-xs text-[var(--space-text-muted)]">
        One step at a time: structure, then math, then your recommendation. Mate coaches each step before you move on — and the consulting toolkit below gives you an issue tree, a hypothesis-driven worksheet, and standard frameworks to work with.
      </p>

      <div className="mt-4 space-y-4">
        {steps.map((entry: any, index: number) => (
          <div key={index} className="space-y-2 border-t border-[var(--space-border-default)] pt-4 first:border-t-0 first:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{GUIDED_STEPS[index]?.label}</p>
            <div className="rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-sm leading-6 text-[var(--space-text-primary)]">
              {String(entry.question || GUIDED_STEPS[index]?.fallback || '')}
            </div>
            <div className="rounded-xl bg-[var(--space-surface-muted)] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">You</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">{String(entry.response || '')}</p>
            </div>
            <div className="rounded-xl border border-[var(--space-border-default)] p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Mate’s coaching</p>
                <span className={`${tw.badge.default} ${Number(entry.step_score) >= 4 ? tw.badge.success : tw.badge.warning}`}>
                  {entry.step_score || '—'}/5
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-[var(--space-text-secondary)]">{String(entry.feedback || '')}</p>
              {asList(entry.strengths).length > 0 && (
                <ul className="mt-2 space-y-1">
                  {asList(entry.strengths).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-[var(--space-semantic-success)]" />
                      <span>{String(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {asList(entry.gaps).length > 0 && (
                <ul className="mt-2 space-y-1">
                  {asList(entry.gaps).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                      <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--space-semantic-warning)]" />
                      <span>{String(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {entry.model_hint && (
                <p className="mt-2 flex gap-1.5 text-xs leading-5 text-[var(--space-text-brand)]">
                  <Lightbulb className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>{String(entry.model_hint)}</span>
                </p>
              )}
            </div>
          </div>
        ))}

        {!done ? (
          <div className="space-y-2 border-t border-[var(--space-border-default)] pt-4 first:border-t-0 first:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{GUIDED_STEPS[currentIndex].label}</p>
            <div className="rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-sm leading-6 text-[var(--space-text-primary)]">
              {String(walkthrough.next_question || GUIDED_STEPS[currentIndex].fallback)}
            </div>
            <FrameworkToolkit
              caseTypeLabel={practiceCase.case_type}
              onInsert={(text) => setInput((value) => (value.trim() ? value + '\n\n' + text : text))}
            />
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={6}
              placeholder="Think out loud — Mate coaches this step before you move on…"
              className={`${tw.input.base} ${tw.input.default} resize-y text-sm leading-6`}
            />
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[11px] text-[var(--space-text-muted)]">{input.trim().length} characters · 30 minimum</span>
              <button
                onClick={sendStep}
                disabled={sending || input.trim().length < 30}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold sm:inline-flex sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {sending ? 'Mate is coaching…' : 'Send to Mate'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 border-t border-[var(--space-border-default)] pt-4">
            <p className="text-sm font-semibold text-[var(--space-text-primary)]">Walkthrough complete — review your assembled answer</p>
            <p className="text-xs text-[var(--space-text-muted)]">
              Mate stitched your three steps into one full answer. Polish it, then submit for your final grade.
            </p>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={10}
              className={`${tw.input.base} ${tw.input.default} min-h-56 resize-y text-sm leading-6`}
            />
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[11px] text-[var(--space-text-muted)]">{draft.trim().length} characters · 80 minimum</span>
              <button
                onClick={() => onGrade(draft.trim())}
                disabled={grading || draft.trim().length < 80}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold sm:inline-flex sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {grading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {grading ? 'Mate is grading…' : 'Submit for Mate’s final grade'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
