// Casemate — Aptitude Test, v1.1.
//
// Aptitude tests are a REQUIRED selection round at most Vietnamese MT
// programmes (Techcombank, Unilever, L'Oréal…), and candidates almost never
// get to practise one before the real thing. This app covers the eight test
// families those rounds draw from; all eight are fully built — Diagrammatic,
// Inductive, Deductive, Error Checking, Spatial, Numerical and Verbal
// Reasoning, plus Situational Judgement — each with 30 deterministic tests.
//
// LANGUAGE: this app is ENGLISH end to end — questions, answer options, rule
// explanations and the surrounding UI. Casemate is otherwise a Vietnamese
// product, but the real aptitude round is sat in English, so practising in
// English is the whole point. Do not translate this app back into Vietnamese
// without changing lib/diagrammatic.ts and lib/diagrammaticLibrary.ts too.
//
// NO PAYWALL. Every test here is free — this is a brand-new surface and the
// point is initial traction, not conversion. Do not wrap it in PaywallGate.
//
// Figures are drawn live as SVG from the rule specs generated in
// lib/diagrammaticLibrary.ts (see components/DiagramFigure.tsx), so the answer
// key can never disagree with the picture and everything stays sharp at any
// size.
//
// Completed attempts land in WorkspaceDB `aptitude_attempts`, keyed by the
// v1.1 account convention (email:<sign-in email> → device:<visitor id>) so a
// score follows the candidate across devices. Mate reads the same rows through
// the get_aptitude_test_info MCP tool (see ./serverFunctions.ts).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Diamond,
  Hexagon,
  Lightbulb,
  Loader2,
  Lock,
  Play,
  Search,
  Shuffle,
  Target,
  Trophy,
  Users,
  XCircle,
} from 'lucide-react';
import { tw } from '../../lib/colors';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { loadDiagrammaticLibrary } from '../../lib/diagrammaticLibrary';
import { ensureAptitudeInfoHook } from './serverFunctions';
import type { LibraryDifficulty } from '../../lib/diagrammaticLibrary';
import type { ExpandedQuestion, ExpandedTest } from '../../lib/diagrammatic';
import {
  DiagramPatternDefs,
  FigureBox,
  MatrixGrid,
  SequenceStrip,
  SetFigureRow,
} from '../../components/DiagramFigure';
import PercentileRankingWidget from '../../components/PercentileRankingWidget';
import { loadInductiveLibrary } from '../../lib/inductiveLibrary';
import type { InductiveExpandedQuestion, InductiveTest } from '../../lib/inductive';
import {
  InductivePatternDefs,
  InductiveFigureSVG,
  InductiveSequence,
} from '../../components/InductiveFigure';
import { loadDeductiveLibrary } from '../../lib/deductiveLibrary';
import type { DeductiveExpandedQuestion, DeductiveTest } from '../../lib/deductive';
import { loadErrorCheckingLibrary } from '../../lib/errorCheckingLibrary';
import type { ErrorCheckingExpandedQuestion, ErrorCheckingTest } from '../../lib/errorChecking';
import { ErrorCheckingTables } from '../../components/ErrorCheckingTable';
import { loadSpatialLibrary } from '../../lib/spatialLibrary';
import type { SpatialExpandedQuestion, SpatialTest } from '../../lib/spatial';
import {
  SITUATIONAL_RATING_LABELS,
  encodeSituationalRatings,
  isCompleteSituationalRating,
  loadSituationalJudgementLibrary,
  parseSituationalRatings,
  scoreSituationalRatings,
} from '../../lib/situationalJudgement';
import type { SituationalQuestion, SituationalTest } from '../../lib/situationalJudgement';
import { loadVerbalReasoningLibrary } from '../../lib/verbalReasoning';
import type { VerbalQuestion, VerbalTest } from '../../lib/verbalReasoning';
import { loadNumericalReasoningLibrary } from '../../lib/numericalReasoning';
import type { NumericalQuestion, NumericalTest } from '../../lib/numericalReasoning';
import { NumericalTable } from '../../components/NumericalTable';

declare global {
  interface Window {
    __workspaceDb: {
      from: (
        table: string,
        options?: { shared?: boolean },
      ) => { insert: (row: Record<string, unknown>) => Promise<unknown> };
    };
    useWorkspaceDB: <T = unknown>(
      table: string,
      options?: {
        filters?: Array<{ column: string; operator: string; value?: unknown }>;
        orderBy?: { column: string; direction: 'asc' | 'desc' };
        limit?: number;
        offset?: number;
        shared?: boolean;
      },
    ) => { data: T[] | null; loading: boolean; error: Error | null; total: number; refresh: () => void };
  }
}

/* ========================================================================== *
 * The eight aptitude families an MT selection round draws from
 * ========================================================================== */

type Category = 'diagrammatic' | 'inductive' | 'deductive' | 'error_checking' | 'spatial' | 'numerical' | 'verbal' | 'situational';
type TestMode = Category | 'mixed';
type AnyQuestion =
  | ExpandedQuestion
  | InductiveExpandedQuestion
  | DeductiveExpandedQuestion
  | ErrorCheckingExpandedQuestion
  | SpatialExpandedQuestion
  | NumericalQuestion
  | VerbalQuestion
  | SituationalQuestion;
type MixedQuestion = AnyQuestion & {
  sourceCategory: Category;
  sourceTestId: string;
};

interface MixedTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: 'mixed';
  timeLimitSeconds: number;
  questions: MixedQuestion[];
  isMixed: true;
}

interface TestFamily {
  id: Category;
  name: string;
  blurb: string;
  icon: typeof Hexagon;
  ready: boolean;
}

const TEST_FAMILIES: TestFamily[] = [
  {
    id: 'diagrammatic',
    name: 'Diagrammatic Reasoning',
    blurb:
      'Find the hidden rule in a 3×3 grid, a sequence, or two sets of figures — 30 tests across Easy, Medium and Hard, 30 questions each.',
    icon: Hexagon,
    ready: true,
  },
  {
    id: 'inductive',
    name: 'Inductive Reasoning',
    blurb:
      'Watch a sequence of five figures play out under two hidden rules, then pick the figure that comes next - 30 tests, 30 questions each.',
    icon: Lightbulb,
    ready: true,
  },
  {
    id: 'deductive',
    name: 'Deductive Reasoning',
    blurb:
      'Read a passage of premises, then judge each statement: True, False, or Insufficient Information - 30 tests, 30 questions each.',
    icon: Compass,
    ready: true,
  },
  {
    id: 'error_checking',
    name: 'Error Checking',
    blurb:
      'Compare the copied data against the original at speed and spot exactly where it differs - 30 tests, 30 questions each at 20 seconds a question.',
    icon: Search,
    ready: true,
  },
  {
    id: 'spatial',
    name: 'Spatial Reasoning',
    blurb: 'Rotate and reflect figures, fold cube nets, assemble pieces and compare top views across 30 full tests.',
    icon: Diamond,
    ready: true,
  },
  {
    id: 'numerical',
    name: 'Numerical Reasoning',
    blurb: 'Read responsive business tables and work out percentages, growth and ratios — 30 tests, 30 questions each.',
    icon: Calculator,
    ready: true,
  },
  {
    id: 'verbal',
    name: 'Verbal Reasoning',
    blurb: 'Read original business passages and decide True / False / Cannot Say — 30 tests, 30 questions each.',
    icon: BookOpen,
    ready: true,
  },
  {
    id: 'situational',
    name: 'Situational Judgement',
    blurb: 'Rate five responses to realistic MT and consulting workplace scenarios — 30 untimed tests, 30 questions each.',
    icon: Users,
    ready: true,
  },
];

const CATEGORY_LABEL: Record<Category, string> = {
  diagrammatic: 'Diagrammatic Reasoning',
  inductive: 'Inductive Reasoning',
  deductive: 'Deductive Reasoning',
  error_checking: 'Error Checking',
  spatial: 'Spatial Reasoning',
  numerical: 'Numerical Reasoning',
  verbal: 'Verbal Reasoning',
  situational: 'Situational Judgement',
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  mixed: 'Mixed',
};

/* ========================================================================== *
 * Small helpers
 * ========================================================================== */

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function shuffleCopy<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function questionCategory(question: AnyQuestion): Category {
  if ('sourceCategory' in question) {
    return (question as MixedQuestion).sourceCategory;
  }
  switch (question.kind) {
    case 'inductive':
      return 'inductive';
    case 'deductive':
      return 'deductive';
    case 'error_checking':
      return 'error_checking';
    case 'spatial':
      return 'spatial';
    case 'numerical':
      return 'numerical';
    case 'verbal':
      return 'verbal';
    case 'situational':
      return 'situational';
    default:
      return 'diagrammatic';
  }
}

function questionCredit(question: AnyQuestion, answer: string | null | undefined): number {
  if (question.kind === 'situational') {
    return scoreSituationalRatings(answer, question.optimalRanking).points / 12;
  }
  return answer === question.correctAnswer ? 1 : 0;
}

function isQuestionAnswered(question: AnyQuestion, answer: string | null | undefined): boolean {
  return question.kind === 'situational' ? isCompleteSituationalRating(answer) : Boolean(answer);
}

function difficultyRange(test: ExpandedTest): string {
  const levels = Array.from(new Set(test.questions.map((q) => q.difficulty)));
  const order = ['easy', 'medium', 'hard'];
  levels.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return levels.map((level) => DIFFICULTY_LABEL[level] || level).join(' → ');
}

interface AttemptRow {
  id: number;
  test_type: string | null;
  test_id: string;
  test_name: string | null;
  score: number;
  total: number;
  percent: number | null;
  duration_seconds: number | null;
  timed_out: boolean | null;
  created_at: string;
}

/* ========================================================================== *
 * Question rendering
 * ========================================================================== */

function QuestionFigure({
  question,
  reveal,
  compact,
}: {
  question: ExpandedQuestion;
  /** Results review: fill the missing cell with the correct shape. */
  reveal?: boolean;
  compact?: boolean;
}) {
  const cellSize = compact ? 62 : 86;

  if (question.kind === 'set_ab') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <SetFigureRow title="Set A" boxes={question.setA} cellSize={cellSize} accent />
          <SetFigureRow title="Set B" boxes={question.setB} cellSize={cellSize} accent />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-primary)]">
            The figure
          </span>
          <FigureBox scatter={question.figure} tone="selected" size={cellSize} label="The question figure" />
        </div>
      </div>
    );
  }

  const answerShape = reveal ? question.options[question.optionLabels.indexOf(question.correctAnswer)] : null;
  return question.gridType === '3x3' ? (
    <MatrixGrid cells={question.cells} answer={answerShape} cellSize={cellSize} />
  ) : (
    <SequenceStrip cells={question.cells} answer={answerShape} cellSize={cellSize} />
  );
}

function OptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: ExpandedQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  /** Results review: mark the key green and a wrong pick red. */
  reveal?: boolean;
}) {
  const labels = question.optionLabels;

  const toneFor = (label: string) => {
    if (reveal) {
      if (label === question.correctAnswer) return 'correct' as const;
      if (label === selected) return 'wrong' as const;
      return 'plain' as const;
    }
    return label === selected ? ('selected' as const) : ('plain' as const);
  };

  const frameClass = (label: string) => {
    const tone = toneFor(label);
    if (tone === 'correct') return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
    if (tone === 'wrong') return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
    if (tone === 'selected') return 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]';
    return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };

  if (question.kind === 'set_ab') {
    return (
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Answer options">
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={selected === label}
            disabled={!onSelect}
            onClick={() => onSelect && onSelect(label)}
            className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left transition sm:gap-3 sm:px-4 sm:py-2.5 ${frameClass(label)} ${
              onSelect ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">
              {label}
            </span>
            <span className="text-sm font-medium text-[var(--space-text-primary)]">{question.options[index]}</span>
            {reveal && label === question.correctAnswer ? (
              <CheckCircle2 className="ml-auto h-4 w-4 text-[var(--space-semantic-success)]" />
            ) : null}
            {reveal && label === selected && label !== question.correctAnswer ? (
              <XCircle className="ml-auto h-4 w-4 text-[var(--space-semantic-danger)]" />
            ) : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Answer options">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex flex-col items-center gap-1 rounded-xl border-2 p-2 transition ${frameClass(label)} ${
            onSelect ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <FigureBox shape={question.options[index]} size={72} label={`Option ${label}`} />
          <span className="flex items-center gap-1 text-xs font-bold text-[var(--space-text-secondary)]">
            {label}
            {reveal && label === question.correctAnswer ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />
            ) : null}
            {reveal && label === selected && label !== question.correctAnswer ? (
              <XCircle className="h-3.5 w-3.5 text-[var(--space-semantic-danger)]" />
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

/** Answer options for an Inductive Reasoning question: five SVG figures A-E. */
function InductiveOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: InductiveExpandedQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const labels = question.optionLabels;
  const frameClass = (label: string) => {
    if (reveal) {
      if (label === question.correctAnswer) {
        return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      }
      if (label === selected) {
        return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      }
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return label === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Answer options">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex flex-col items-center gap-1 rounded-xl border-2 p-2 transition ${frameClass(label)} ${
            onSelect ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <InductiveFigureSVG figure={question.options[index]} size={78} label={`Option ${label}`} />
          <span className="flex items-center gap-1 text-xs font-bold text-[var(--space-text-secondary)]">
            {label}
            {reveal && label === question.correctAnswer ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />
            ) : null}
            {reveal && label === selected && label !== question.correctAnswer ? (
              <XCircle className="h-3.5 w-3.5 text-[var(--space-semantic-danger)]" />
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

/** Visual prompt for a Spatial Reasoning question, using the shared SVG renderer. */
function SpatialStimulus({
  question,
  compact,
}: {
  question: SpatialExpandedQuestion;
  compact?: boolean;
}) {
  const size = compact ? 68 : question.stimulus.length > 3 ? 72 : 96;
  return (
    <div className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
      {question.stimulus.map((figure, stimulusIndex) => (
        <InductiveFigureSVG
          key={stimulusIndex}
          figure={figure}
          size={size}
          label={`Spatial prompt figure ${stimulusIndex + 1}`}
        />
      ))}
    </div>
  );
}

/** Four tappable SVG answer options for Spatial Reasoning. */
function SpatialOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: SpatialExpandedQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const frameClass = (label: string) => {
    if (reveal) {
      if (label === question.correctAnswer) {
        return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      }
      if (label === selected) {
        return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      }
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return label === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };

  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-2 sm:gap-3" role="radiogroup" aria-label="Answer options">
      {question.optionLabels.map((label, optionIndex) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex min-h-28 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border-2 p-2 transition ${frameClass(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <InductiveFigureSVG figure={question.options[optionIndex]} size={78} label={`Option ${label}`} />
          <span className="flex items-center gap-1 text-xs font-bold text-[var(--space-text-secondary)]">
            {label}
            {reveal && label === question.correctAnswer ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />
            ) : null}
            {reveal && label === selected && label !== question.correctAnswer ? (
              <XCircle className="h-3.5 w-3.5 text-[var(--space-semantic-danger)]" />
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

/** The passage of premises for a Deductive Reasoning question. */
function DeductivePremises({ premises }: { premises: string[] }) {
  return (
    <div className="w-full rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Premises</p>
      <ul className="mt-1.5 space-y-1">
        {premises.map((line, i) => (
          <li key={i} className="text-sm leading-6 text-[var(--space-text-primary)]">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Answer options for a Deductive Reasoning question: text choices (A-C or A-E). */
function DeductiveOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: DeductiveExpandedQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const labels = question.optionLabels;
  const frameClass = (label: string) => {
    if (reveal) {
      if (label === question.correctAnswer) {
        return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      }
      if (label === selected) {
        return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      }
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return label === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };

  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label="Answer options">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left transition sm:gap-3 sm:px-4 sm:py-2.5 ${frameClass(label)} ${
            onSelect ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">
            {label}
          </span>
          <span className="text-sm font-medium text-[var(--space-text-primary)]">{question.options[index]}</span>
          {reveal && label === question.correctAnswer ? (
            <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" />
          ) : null}
          {reveal && label === selected && label !== question.correctAnswer ? (
            <XCircle className="ml-auto h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

/** Four A–D calculation choices for Numerical Reasoning. */
function NumericalOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: NumericalQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const frameClass = (label: string) => {
    if (reveal) {
      if (label === question.correctAnswer) return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      if (label === selected) return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return label === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };
  return (
    <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Answer options">
      {question.optionLabels.map((label, optionIndex) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex min-w-0 items-center gap-2 rounded-xl border-2 px-3 py-2 text-left transition sm:gap-3 sm:px-4 sm:py-2.5 ${frameClass(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">{label}</span>
          <span className="min-w-0 text-sm font-medium text-[var(--space-text-primary)]">{question.options[optionIndex]}</span>
          {reveal && label === question.correctAnswer ? <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" /> : null}
          {reveal && label === selected && label !== question.correctAnswer ? <XCircle className="ml-auto h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" /> : null}
        </button>
      ))}
    </div>
  );
}

/** True / False / Cannot Say buttons for Verbal Reasoning. */
function VerbalOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: VerbalQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const frameClass = (answer: string) => {
    if (reveal) {
      if (answer === question.correctAnswer) return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      if (answer === selected) return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return answer === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };
  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 sm:gap-2" role="radiogroup" aria-label="Answer options">
      {question.options.map((answer) => (
        <button
          key={answer}
          type="button"
          role="radio"
          aria-checked={selected === answer}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(answer)}
          className={`flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2 text-[13px] font-semibold sm:min-h-12 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm transition ${frameClass(answer)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {answer}
          {reveal && answer === question.correctAnswer ? <CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" /> : null}
          {reveal && answer === selected && answer !== question.correctAnswer ? <XCircle className="h-4 w-4 text-[var(--space-semantic-danger)]" /> : null}
        </button>
      ))}
    </div>
  );
}

/** Answer options for an Error Checking question: text choices A-E. */
function ErrorCheckingOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: ErrorCheckingExpandedQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const labels = question.optionLabels;
  const frameClass = (label: string) => {
    if (reveal) {
      if (label === question.correctAnswer) {
        return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      }
      if (label === selected) {
        return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      }
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return label === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };

  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label="Answer options">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left transition sm:gap-3 sm:px-4 sm:py-2.5 ${frameClass(label)} ${
            onSelect ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">
            {label}
          </span>
          <span className="font-mono text-sm font-medium text-[var(--space-text-primary)]">{question.options[index]}</span>
          {reveal && label === question.correctAnswer ? (
            <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" />
          ) : null}
          {reveal && label === selected && label !== question.correctAnswer ? (
            <XCircle className="ml-auto h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

/** Five forced ratings for a Situational Judgement question. */
function SituationalRatingGrid({
  question,
  value,
  onChange,
}: {
  question: SituationalQuestion;
  value?: string | null;
  onChange: (value: string) => void;
}) {
  const slots = parseSituationalRatings(value);
  const assignRating = (optionLabel: string, ratingIndex: number) => {
    const next = slots.slice();
    const previousIndex = next.indexOf(optionLabel);
    const displaced = next[ratingIndex];
    next[ratingIndex] = optionLabel;
    if (previousIndex >= 0 && previousIndex !== ratingIndex) next[previousIndex] = displaced;
    onChange(encodeSituationalRatings(next));
  };

  return (
    <div className="space-y-3" aria-label="Rate every response">
      {question.optionLabels.map((optionLabel, optionIndex) => {
        const selectedIndex = slots.indexOf(optionLabel);
        return (
          <div
            key={optionLabel}
            className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 sm:p-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-card)] text-xs font-bold text-[var(--space-text-brand)]">
                {optionLabel}
              </span>
              <p className="text-sm leading-6 text-[var(--space-text-primary)]">{question.options[optionIndex]}</p>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5" role="radiogroup" aria-label={`Rate response ${optionLabel}`}>
              {SITUATIONAL_RATING_LABELS.map((rating, ratingIndex) => {
                const selected = selectedIndex === ratingIndex;
                const occupiedBy = slots[ratingIndex];
                return (
                  <button
                    key={rating}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => assignRating(optionLabel, ratingIndex)}
                    className={`min-h-11 min-w-0 break-words rounded-lg border px-2 py-2 text-[11px] font-semibold leading-4 transition ${
                      selected
                        ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                        : occupiedBy
                          ? 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-muted)]'
                          : 'border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]'
                    }`}
                  >
                    {rating}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-[11px] leading-5 text-[var(--space-text-muted)]">
        Use each rating once. Choosing an occupied rating moves or clears the previous response automatically.
      </p>
    </div>
  );
}

/** Candidate and model ratings shown side by side after submission. */
function SituationalRatingReview({
  question,
  value,
}: {
  question: SituationalQuestion;
  value?: string | null;
}) {
  const candidate = parseSituationalRatings(value);
  return (
    <div className="space-y-2">
      {question.optionLabels.map((optionLabel, optionIndex) => {
        const candidateIndex = candidate.indexOf(optionLabel);
        const modelIndex = question.optimalRanking.indexOf(optionLabel);
        return (
          <div key={optionLabel} className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[var(--space-text-brand)]">{optionLabel}</span>
              <p className="text-xs leading-5 text-[var(--space-text-primary)]">{question.options[optionIndex]}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-[var(--space-surface-card)] px-2 py-1 text-[var(--space-text-secondary)]">
                Your rating: {candidateIndex >= 0 ? SITUATIONAL_RATING_LABELS[candidateIndex] : 'Not rated'}
              </span>
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 font-semibold text-[var(--space-text-brand)]">
                Model: {SITUATIONAL_RATING_LABELS[modelIndex]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== *
 * App
 * ========================================================================== */

type View = 'home' | 'family' | 'test' | 'results';
type AnyTest = ExpandedTest | InductiveTest | DeductiveTest | ErrorCheckingTest | SpatialTest | NumericalTest | VerbalTest | SituationalTest | MixedTest;
type SourceTest = Exclude<AnyTest, MixedTest>;

function isMixedTest(test: AnyTest): test is MixedTest {
  return 'isMixed' in test && test.isMixed === true;
}

const CATEGORY_ROUTES: Record<Category, string> = {
  diagrammatic: 'diagrammatic-reasoning',
  inductive: 'inductive-reasoning',
  deductive: 'deductive-reasoning',
  error_checking: 'error-checking',
  spatial: 'spatial-reasoning',
  numerical: 'numerical-reasoning',
  verbal: 'verbal-reasoning',
  situational: 'situational-judgement',
};

const CATEGORY_BY_ROUTE = Object.fromEntries(
  Object.entries(CATEGORY_ROUTES).map(([category, route]) => [route, category as Category]),
) as Record<string, Category>;

function aptitudeCategoryFromHash(): Category | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.hash.toLowerCase().match(/^#aptitude-test\/([^/?#]+)$/);
  return match ? CATEGORY_BY_ROUTE[match[1]] || null : null;
}

function isAptitudeListHash(): boolean {
  return typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#aptitude-test';
}

interface TypeBreakdown {
  category: Category;
  score: number;
  total: number;
  percent: number;
}

interface FinishedAttempt {
  test: AnyTest;
  answers: (string | null)[];
  score: number;
  exactScore: number;
  total: number;
  percent: number;
  durationSeconds: number;
  timedOut: boolean;
  breakdown: TypeBreakdown[];
}

export default function AptitudeTest() {
  const { spaceId, sessionId } = useSpaceRuntime();
  const tests = useMemo(() => loadDiagrammaticLibrary(), []);
  const inductiveTests = useMemo(() => loadInductiveLibrary(), []);
  const deductiveTests = useMemo(() => loadDeductiveLibrary(), []);
  const errorCheckingTests = useMemo(() => loadErrorCheckingLibrary(), []);
  const spatialTests = useMemo(() => loadSpatialLibrary(), []);
  const numericalTests = useMemo(() => loadNumericalReasoningLibrary(), []);
  const verbalTests = useMemo(() => loadVerbalReasoningLibrary(), []);
  const situationalTests = useMemo(() => loadSituationalJudgementLibrary(), []);

  const initialCategory = useMemo(() => aptitudeCategoryFromHash(), []);
  const [view, setView] = useState<View>(initialCategory ? 'family' : 'home');
  const [category, setCategory] = useState<TestMode>(initialCategory || 'diagrammatic');
  const [difficultyFilter, setDifficultyFilter] = useState<LibraryDifficulty>('easy');
  const [activeTest, setActiveTest] = useState<AnyTest | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [finished, setFinished] = useState<FinishedAttempt | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const submittingRef = useRef(false);

  const openCategory = useCallback((nextCategory: Category) => {
    setCategory(nextCategory);
    setView('family');
    const nextHash = `#aptitude-test/${CATEGORY_ROUTES[nextCategory]}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState({ app: 'aptitude-test', category: nextCategory }, '', nextHash);
    }
  }, []);

  const openCategoryList = useCallback(() => {
    setView('home');
    if (!isAptitudeListHash()) {
      window.history.pushState({ app: 'aptitude-test' }, '', '#aptitude-test');
    }
  }, []);

  useEffect(() => {
    const syncHashRoute = () => {
      const nextCategory = aptitudeCategoryFromHash();
      if (nextCategory) {
        setCategory(nextCategory);
        setView('family');
      } else if (isAptitudeListHash()) {
        setView('home');
      }
    };

    window.addEventListener('hashchange', syncHashRoute);
    window.addEventListener('popstate', syncHashRoute);
    return () => {
      window.removeEventListener('hashchange', syncHashRoute);
      window.removeEventListener('popstate', syncHashRoute);
    };
  }, []);

  // Account identity, same convention as the Desktop shell's usage events, so
  // a score recorded on a phone shows up again on a laptop after sign-in.
  const email = useMemo(() => {
    try {
      const stored = localStorage.getItem(`space_session_${spaceId}`);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
        return parsed.email.toLowerCase().trim();
      }
    } catch (error) {
      /* storage unavailable — fall back to the device key */
    }
    return null;
  }, [spaceId]);

  const userKey = useMemo(() => {
    if (email) return `email:${email}`;
    const match = typeof document !== 'undefined' ? document.cookie.match(/(?:^|;\s*)audos_vid=([^;]+)/) : null;
    return `device:${(match && match[1]) || sessionId || 'unknown'}`;
  }, [email, sessionId]);

  // Keep Mate's get_aptitude_test_info catalogue in sync with the 30-test
  // library: idempotent — it only writes when the registered hook differs from
  // ./serverFunctions.ts (e.g. after this CATALOGUE_VERSION bump).
  useEffect(() => {
    ensureAptitudeInfoHook().catch(() => {
      /* already logged inside; Mate simply keeps the previous catalogue */
    });
  }, []);

  const history = window.useWorkspaceDB<AttemptRow>('aptitude_attempts', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: userKey }],
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 50,
  });
  const attempts = Array.isArray(history.data) ? history.data : [];

  // The countdown effect must not depend on values that change on every
  // render (the answers array, the query object) — it re-runs its tick
  // immediately on setup, so an unstable dependency turns into a render loop.
  const answersRef = useRef<(string | null)[]>([]);
  answersRef.current = answers;
  const categoryRef = useRef(category);
  categoryRef.current = category;
  const refreshHistoryRef = useRef(history.refresh);
  refreshHistoryRef.current = history.refresh;

  const bestFor = useCallback(
    (testId: string) => {
      const rows = attempts.filter((row) => row.test_id === testId);
      if (!rows.length) return null;
      return rows.reduce((best, row) => (row.score > best.score ? row : best), rows[0]);
    },
    [attempts],
  );

  const finishTest = useCallback(
    async (test: AnyTest, picked: (string | null)[], timedOut: boolean, started: number | null) => {
      if (submittingRef.current) return;
      submittingRef.current = true;

      const questions = test.questions as AnyQuestion[];
      const total = questions.length;
      const totalCredit = questions.reduce(
        (sum, question, i) => sum + questionCredit(question, picked[i]),
        0,
      );
      const exactScore = Math.round(totalCredit * 10) / 10;
      const score = Math.round(totalCredit);
      const percent = Math.round((totalCredit / Math.max(1, total)) * 100);
      const breakdown = isMixedTest(test)
        ? TEST_FAMILIES.map((family) => {
            const questionIndexes = questions.reduce<number[]>((indexes, question, i) => {
              if (questionCategory(question) === family.id) indexes.push(i);
              return indexes;
            }, []);
            const familyCredit = questionIndexes.reduce(
              (sum, questionIndex) => sum + questionCredit(questions[questionIndex], picked[questionIndex]),
              0,
            );
            const familyTotal = questionIndexes.length;
            return {
              category: family.id,
              score: Math.round(familyCredit * 10) / 10,
              total: familyTotal,
              percent: Math.round((familyCredit / Math.max(1, familyTotal)) * 100),
            };
          })
        : [];
      // WorkspaceDB stores integer score/total. The displayed mixed score and
      // percentages preserve Situational Judgement partial credit.
      const durationSeconds = started ? Math.round((Date.now() - started) / 1000) : 0;

      setFinished({ test, answers: picked, score, exactScore, total, percent, durationSeconds, timedOut, breakdown });
      setView('results');
      setSaving(true);
      setSaveError('');

      try {
        await window.__workspaceDb.from('aptitude_attempts').insert({
          user_key: userKey,
          email: email || null,
          test_type: categoryRef.current,
          test_id: test.id,
          test_name: test.name,
          score,
          total,
          percent,
          duration_seconds: durationSeconds,
          timed_out: timedOut,
          answers_json: questions.map((question, i) => {
            const situationalScore = question.kind === 'situational'
              ? scoreSituationalRatings(picked[i], question.optimalRanking)
              : null;
            return {
              question_id: question.id,
              source_category: isMixedTest(test) ? questionCategory(question) : undefined,
              chosen: picked[i],
              correct: question.correctAnswer,
              is_correct: picked[i] === question.correctAnswer,
              credit_percent: situationalScore ? Math.round(situationalScore.credit * 100) : undefined,
              rank_distance: situationalScore ? situationalScore.distance : undefined,
            };
          }),
          completed_at: new Date().toISOString(),
        });
        refreshHistoryRef.current();
      } catch (error) {
        setSaveError(
          'Your full result is shown below, but it could not be saved to your history — try another test in a few minutes.',
        );
      } finally {
        setSaving(false);
      }
    },
    [email, userKey],
  );

  // Countdown. The deadline is a wall-clock timestamp rather than a decremented
  // counter so a backgrounded tab (throttled timers) still submits on time.
  useEffect(() => {
    if (view !== 'test' || !deadline || !activeTest) return undefined;
    const tick = () => {
      const left = (deadline - Date.now()) / 1000;
      // Whole seconds only, so a re-render is a no-op between ticks.
      setRemaining(Math.max(0, Math.ceil(left)));
      if (left <= 0) {
        void finishTest(activeTest, answersRef.current, true, startedAt);
      }
    };
    tick();
    const timer = window.setInterval(tick, 500);
    return () => window.clearInterval(timer);
  }, [view, deadline, activeTest, startedAt, finishTest]);

  const startTest = (test: AnyTest) => {
    submittingRef.current = false;
    setActiveTest(test);
    setAnswers(new Array(test.questions.length).fill(null));
    setIndex(0);
    const now = Date.now();
    setStartedAt(now);
    if (test.timeLimitSeconds > 0) {
      setDeadline(now + test.timeLimitSeconds * 1000);
      setRemaining(test.timeLimitSeconds);
    } else {
      setDeadline(null);
      setRemaining(0);
    }
    setFinished(null);
    setSaveError('');
    setView('test');
  };

  const chooseAnswer = (label: string) => {
    setAnswers((prev) => {
      const next = prev.slice();
      next[index] = label;
      return next;
    });
  };

  const createMixedTest = (): MixedTest => {
    const sources: Array<{ category: Category; tests: SourceTest[] }> = [
      { category: 'diagrammatic', tests },
      { category: 'inductive', tests: inductiveTests },
      { category: 'deductive', tests: deductiveTests },
      { category: 'error_checking', tests: errorCheckingTests },
      { category: 'spatial', tests: spatialTests },
      { category: 'numerical', tests: numericalTests },
      { category: 'verbal', tests: verbalTests },
      { category: 'situational', tests: situationalTests },
    ];

    const sampledQuestions = sources.flatMap(({ category: sourceCategory, tests: sourceTests }) => {
      const sourceTest = sourceTests[Math.floor(Math.random() * sourceTests.length)];
      if (!sourceTest || sourceTest.questions.length < 5) {
        throw new Error(`${CATEGORY_LABEL[sourceCategory]} needs at least five questions for Mixed Aptitude.`);
      }
      const sourceQuestions = [...(sourceTest.questions as AnyQuestion[])];
      return shuffleCopy(sourceQuestions)
        .slice(0, 5)
        .map(
          (question) =>
            ({
              ...question,
              sourceCategory,
              sourceTestId: sourceTest.id,
            }) as MixedQuestion,
        );
    });
    const questions = shuffleCopy(sampledQuestions);

    return {
      id: 'mixed-aptitude',
      name: 'Mixed Aptitude Test',
      subtitle: 'All eight aptitude families',
      description: 'Five questions from each available aptitude family, shuffled into one complete test.',
      difficulty: 'mixed',
      timeLimitSeconds: questions.length * 60,
      questions,
      isMixed: true,
    };
  };

  const startMixedTest = () => {
    setCategory('mixed');
    startTest(createMixedTest());
  };

  /* ---------------------------------------------------------------- home */

  if (view === 'home') {
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <DiagramPatternDefs />
        {/* Match My Roadmap's comfortable page measure on large screens. */}
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-2xl">Aptitude Test</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Almost every MT programme in Vietnam — Techcombank, Unilever, L’Oréal — runs a compulsory
              aptitude test round, and it is usually the round that eliminates the most people. These are the
              eight formats you are most likely to meet. Everything here is free — no Casemate Pro needed — and
              it is all in English, exactly like the real thing.
            </p>
          </header>

          <button
            onClick={startMixedTest}
            className="flex w-full flex-col gap-3 rounded-xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] p-4 text-left shadow-[0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_35%,transparent)] transition hover:bg-[var(--space-surface-card-hover)] sm:flex-row sm:items-center sm:justify-between sm:p-5"
            data-testid="card-mixed-aptitude"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]">
                <Shuffle className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-[var(--space-text-primary)] sm:text-lg">Mixed Aptitude Test</h2>
                  <span className="rounded-full bg-[var(--space-brand-primary)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-on-primary)]">
                    40 questions
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)] sm:text-sm">
                  Five questions from each of all eight aptitude families, globally shuffled with a 40-minute timer.
                </p>
              </div>
            </div>
            <span className={`inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold sm:w-auto sm:rounded-lg ${tw.button.primary}`}>
              <Play className="h-4 w-4" />
              Start mixed test
            </span>
          </button>

          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {TEST_FAMILIES.map((family) => {
              const Icon = family.icon;
              if (!family.ready) {
                return (
                  <div
                    key={family.id}
                    className="flex flex-col gap-2 rounded-xl border border-dashed border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 opacity-70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Icon className="h-6 w-6 text-[var(--space-text-muted)]" />
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-card)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-muted)]">
                        <Lock className="h-3 w-3" />
                        Coming soon
                      </span>
                    </div>
                    <h2 className="text-sm font-semibold text-[var(--space-text-secondary)]">{family.name}</h2>
                    <p className="text-xs leading-5 text-[var(--space-text-muted)]">{family.blurb}</p>
                  </div>
                );
              }
              const familyTestCount =
                family.id === 'numerical'
                  ? numericalTests.length
                  : family.id === 'verbal'
                    ? verbalTests.length
                    : family.id === 'inductive'
                    ? inductiveTests.length
                    : family.id === 'deductive'
                      ? deductiveTests.length
                      : family.id === 'error_checking'
                        ? errorCheckingTests.length
                        : family.id === 'spatial'
                          ? spatialTests.length
                          : family.id === 'situational'
                            ? situationalTests.length
                            : tests.length;
              const familyTaken = attempts.filter((row) =>
                family.id === 'numerical'
                  ? row.test_type === 'numerical'
                  : family.id === 'verbal'
                    ? row.test_type === 'verbal'
                    : family.id === 'inductive'
                    ? row.test_type === 'inductive'
                    : family.id === 'deductive'
                      ? row.test_type === 'deductive'
                      : family.id === 'error_checking'
                        ? row.test_type === 'error_checking'
                        : family.id === 'spatial'
                          ? row.test_type === 'spatial'
                          : family.id === 'situational'
                            ? row.test_type === 'situational'
                            : !row.test_type || row.test_type === 'diagrammatic',
              ).length;
              return (
                <button
                  key={family.id}
                  onClick={() => openCategory(family.id)}
                  className="flex flex-col gap-2 rounded-xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-4 text-left shadow-[0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_35%,transparent)] transition hover:bg-[var(--space-surface-card-hover)]"
                  data-testid={`card-${family.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <Icon className="h-6 w-6 text-[var(--space-brand-primary)]" />
                    <span className="rounded-full bg-[var(--space-brand-primary)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-on-primary)]">
                      {familyTestCount} tests
                    </span>
                  </div>
                  <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">{family.name}</h2>
                  <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{family.blurb}</p>
                  <span
                    className={`mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.primary}`}
                  >
                    <Play className="h-3.5 w-3.5" />
                    Start practising
                  </span>
                  {familyTaken > 0 ? (
                    <span className="text-[11px] text-[var(--space-text-muted)]">
                      You have taken {familyTaken} {familyTaken === 1 ? 'test' : 'tests'}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------- diagrammatic home */

  if (view === 'family' && category === 'diagrammatic') {
    const visibleTests = tests.filter((test) => test.difficulty === difficultyFilter);
    const startRandom = () => {
      if (visibleTests.length) {
        startTest(visibleTests[Math.floor(Math.random() * visibleTests.length)]);
      }
    };
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <DiagramPatternDefs />
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Diagrammatic Reasoning</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">
              30 tests across three difficulty levels, 30 questions each. Every test runs a countdown —
              when the time hits zero it submits itself, exactly like the real platform. Afterwards you can
              review every question with the rule written out in plain English. Pick a test below, or let us
              deal you a random one at your level.
            </p>
          </header>

          <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2" role="tablist" aria-label="Difficulty filter">
            {(['easy', 'medium', 'hard'] as LibraryDifficulty[]).map((level) => {
              const count = tests.filter((test) => test.difficulty === level).length;
              const active = difficultyFilter === level;
              return (
                <button
                  key={level}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDifficultyFilter(level)}
                  className={`inline-flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm ${
                    active
                      ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]'
                  }`}
                  data-testid={`filter-${level}`}
                >
                  {DIFFICULTY_LABEL[level]}
                  <span
                    className={`rounded-full px-1.5 text-[11px] font-bold ${
                      active
                        ? 'bg-[color-mix(in_srgb,var(--space-text-on-primary)_22%,transparent)]'
                        : 'bg-[var(--space-surface-muted)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
            <button
              onClick={startRandom}
              className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              data-testid="button-random-test"
            >
              <Shuffle className="h-4 w-4" />
              Random {DIFFICULTY_LABEL[difficultyFilter]} test
            </button>
          </div>

          <div className="space-y-3">
            {visibleTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {test.subtitle}
                      </span>
                      {best ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                          <Trophy className="h-3 w-3" />
                          Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {test.questions.length} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.round(test.timeLimitSeconds / 60)} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {difficultyRange(test)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                    data-testid={`button-start-${test.id}`}
                  >
                    <Play className="h-4 w-4" />
                    {best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>

          {attempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {attempts.slice(0, 8).map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                    <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {row.score}/{row.total}
                      {row.duration_seconds != null ? ` · ${formatClock(row.duration_seconds)}` : ''}
                      {row.timed_out ? ' · timed out' : ''}
                    </span>
                    <span className="text-[var(--space-text-muted)]">
                      {new Date(row.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------ inductive home */

  if (view === 'family' && category === 'inductive') {
    const inductiveAttempts = attempts.filter((row) => row.test_type === 'inductive');
    const startRandom = () => {
      if (inductiveTests.length) startTest(inductiveTests[Math.floor(Math.random() * inductiveTests.length)]);
    };
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <InductivePatternDefs />
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Inductive Reasoning</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Each question shows a sequence of five figures playing out under two hidden rules. Work out both
              rules, then pick the figure that comes next from the five options. 30 tests, 30 questions each,
              with a 25-minute countdown &mdash; when the time hits zero it submits itself, exactly like the real
              platform. Afterwards you can review every question with both rules written out in plain English.
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={startRandom}
              className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              data-testid="button-random-inductive"
            >
              <Shuffle className="h-4 w-4" />
              Random test
            </button>
          </div>

          <div className="space-y-3">
            {inductiveTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {test.subtitle}
                      </span>
                      {best ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                          <Trophy className="h-3 w-3" />
                          Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {test.questions.length} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.round(test.timeLimitSeconds / 60)} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Two rules per question
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                    data-testid={`button-start-${test.id}`}
                  >
                    <Play className="h-4 w-4" />
                    {best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>

          {inductiveAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {inductiveAttempts.slice(0, 8).map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                    <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {row.score}/{row.total}
                      {row.duration_seconds != null ? ` · ${formatClock(row.duration_seconds)}` : ''}
                      {row.timed_out ? ' · timed out' : ''}
                    </span>
                    <span className="text-[var(--space-text-muted)]">
                      {new Date(row.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------ deductive home */

  if (view === 'family' && category === 'deductive') {
    const deductiveAttempts = attempts.filter((row) => row.test_type === 'deductive');
    const startRandom = () => {
      if (deductiveTests.length) startTest(deductiveTests[Math.floor(Math.random() * deductiveTests.length)]);
    };
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Deductive Reasoning</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Each question gives you a short passage of premises &mdash; syllogisms, if&ndash;then arguments,
              rankings, prices and plan tables &mdash; and a statement to judge: True, False, or Insufficient
              Information. 30 tests, 30 questions each, with a 25-minute countdown &mdash; when the time hits
              zero it submits itself, exactly like the real platform. The full bank contains ten Easy, ten Medium and ten Hard tests; the original Tests 1&ndash;10 keep their established difficulty, and afterwards every question comes with the reasoning written out in plain
              English.
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={startRandom}
              className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              data-testid="button-random-deductive"
            >
              <Shuffle className="h-4 w-4" />
              Random test
            </button>
          </div>

          <div className="space-y-3">
            {deductiveTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {test.subtitle}
                      </span>
                      {best ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                          <Trophy className="h-3 w-3" />
                          Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {test.questions.length} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.round(test.timeLimitSeconds / 60)} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {DIFFICULTY_LABEL[test.difficulty] || test.difficulty}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                    data-testid={`button-start-${test.id}`}
                  >
                    <Play className="h-4 w-4" />
                    {best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>

          {deductiveAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {deductiveAttempts.slice(0, 8).map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                    <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {row.score}/{row.total}
                      {row.duration_seconds != null ? ` · ${formatClock(row.duration_seconds)}` : ''}
                      {row.timed_out ? ' · timed out' : ''}
                    </span>
                    <span className="text-[var(--space-text-muted)]">
                      {new Date(row.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* --------------------------------------------------- spatial home */

  if (view === 'family' && category === 'spatial') {
    const spatialAttempts = attempts.filter((row) => row.test_type === 'spatial');
    const startRandom = () => {
      if (spatialTests.length) startTest(spatialTests[Math.floor(Math.random() * spatialTests.length)]);
    };

    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Spatial Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Practise mental rotation, mirror images, odd-one-out figures, sequences, matrices, cube folding and
              unfolding, isometric 3D block rotation, top views and piece assembly. Each test contains 30 original
              visual questions and four answer options.
            </p>
          </header>

          <button
            onClick={startRandom}
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
            data-testid="button-random-spatial"
          >
            <Shuffle className="h-4 w-4" />
            Random test
          </button>

          <div className="space-y-3">
            {spatialTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {test.difficultyBreakdown}
                      </span>
                      {best ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                          <Trophy className="h-3 w-3" /> Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round(test.timeLimitSeconds / 60)} min</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{DIFFICULTY_LABEL[test.difficulty]}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                    data-testid={`button-start-${test.id}`}
                  >
                    <Play className="h-4 w-4" />{best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>

          {spatialAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {spatialAttempts.slice(0, 8).map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                    <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {row.score}/{row.total}{row.duration_seconds != null ? ` · ${formatClock(row.duration_seconds)}` : ''}{row.timed_out ? ' · timed out' : ''}
                    </span>
                    <span className="text-[var(--space-text-muted)]">{new Date(row.created_at).toLocaleDateString('en-GB')}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* ---------------------------------------- situational judgement home */

  if (view === 'family' && category === 'situational') {
    const situationalAttempts = attempts.filter((row) => row.test_type === 'situational');
    const startRandom = () => {
      if (situationalTests.length) startTest(situationalTests[Math.floor(Math.random() * situationalTests.length)]);
    };

    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Situational Judgement</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Each question gives you a realistic workplace situation and five possible responses. Rate every
              response as Very Effective, Effective, Slightly Effective, Ineffective or Counterproductive, using
              each rating once. The five reference tests are untimed, so these are too. Partial credit rewards
              ratings that are close to the model answer.
            </p>
          </header>

          <button
            onClick={startRandom}
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
            data-testid="button-random-situational"
          >
            <Shuffle className="h-4 w-4" />
            Random test
          </button>

          <div className="grid gap-3 lg:grid-cols-2">
            {situationalTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {test.difficultyBreakdown}
                      </span>
                      {best ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                          <Trophy className="h-3 w-3" /> Best {best.percent ?? Math.round((best.score / best.total) * 100)}%
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />30 questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />Untimed</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />5 forced ratings</span>
                    </p>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                    data-testid={`button-start-${test.id}`}
                  >
                    <Play className="h-4 w-4" />{best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>

          {situationalAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your recent attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {situationalAttempts.slice(0, 8).map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                    <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                    <span className="text-[var(--space-text-secondary)]">{row.percent ?? Math.round((row.score / row.total) * 100)}% judgement match</span>
                    <span className="text-[var(--space-text-muted)]">{new Date(row.created_at).toLocaleDateString('en-GB')}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* --------------------------------------------- error checking home */

  if (view === 'family' && category === 'error_checking') {
    const errorCheckingAttempts = attempts.filter((row) => row.test_type === 'error_checking');
    const startRandom = () => {
      if (errorCheckingTests.length) {
        startTest(errorCheckingTests[Math.floor(Math.random() * errorCheckingTests.length)]);
      }
    };
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Error Checking</h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Each question shows an original data table and a hand-copied version &mdash; security codes, phone
              numbers, amounts, e-mail addresses &mdash; and asks exactly where they differ: how many errors in a
              given row, which column or row holds the mistake, or which of five versions of a value is the
              correct one. 30 tests, 30 questions each, with a 10-minute countdown &mdash; 20 seconds a question,
              the pace of the real round &mdash; and it submits itself at zero. The full bank contains ten Easy, ten Medium and ten Hard tests; the original Tests 1&ndash;10 keep their established difficulty (longer codes, flipped case, look-alike characters like 0/O and 5/S), and
              afterwards the review highlights every corrupted cell.
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={startRandom}
              className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              data-testid="button-random-error-checking"
            >
              <Shuffle className="h-4 w-4" />
              Random test
            </button>
          </div>

          <div className="space-y-3">
            {errorCheckingTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div
                  key={test.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {test.subtitle}
                      </span>
                      {best ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                          <Trophy className="h-3 w-3" />
                          Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {test.questions.length} questions
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.round(test.timeLimitSeconds / 60)} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {DIFFICULTY_LABEL[test.difficulty] || test.difficulty}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                    data-testid={`button-start-${test.id}`}
                  >
                    <Play className="h-4 w-4" />
                    {best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>

          {errorCheckingAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {errorCheckingAttempts.slice(0, 8).map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                    <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {row.score}/{row.total}
                      {row.duration_seconds != null ? ` · ${formatClock(row.duration_seconds)}` : ''}
                      {row.timed_out ? ' · timed out' : ''}
                    </span>
                    <span className="text-[var(--space-text-muted)]">
                      {new Date(row.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* --------------------------------------------------- numerical home */

  if (view === 'family' && category === 'numerical') {
    const numericalAttempts = attempts.filter((row) => row.test_type === 'numerical');
    const startRandom = () => {
      if (numericalTests.length) startTest(numericalTests[Math.floor(Math.random() * numericalTests.length)]);
    };
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button onClick={openCategoryList} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
            <ChevronLeft className="h-4 w-4" /> All test types
          </button>
          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Numerical Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Work from original FMCG, banking, workforce, demographic, market-share and financial exhibits.
              Questions cover lookups, totals, ratios, percentages, weighted averages and multi-step projections.
              Every test has 30 questions, four A&ndash;D choices, a mixed 9 Easy / 12 Medium / 9 Hard profile and a 30-minute countdown.
            </p>
          </header>
          <button onClick={startRandom} className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm" data-testid="button-random-numerical">
            <Shuffle className="h-4 w-4" /> Random test
          </button>
          <div className="grid gap-3 lg:grid-cols-2">
            {numericalTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div key={test.id} className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">{test.subtitle}</span>
                      {best ? <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]"><Trophy className="h-3 w-3" /> Best {best.score}/{best.total}</span> : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />30 questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />30 min</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />9 Easy · 12 Medium · 9 Hard</span>
                    </p>
                  </div>
                  <button onClick={() => startTest(test)} className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`} data-testid={`button-start-${test.id}`}>
                    <Play className="h-4 w-4" />{best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>
          {numericalAttempts.length > 0 ? (
            <p className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-xs text-[var(--space-text-secondary)]">
              You have completed {numericalAttempts.length} Numerical Reasoning {numericalAttempts.length === 1 ? 'test' : 'tests'}.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------- verbal home */

  if (view === 'family' && category === 'verbal') {
    const verbalAttempts = attempts.filter((row) => row.test_type === 'verbal');
    const startRandom = () => {
      if (verbalTests.length) startTest(verbalTests[Math.floor(Math.random() * verbalTests.length)]);
    };
    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button onClick={openCategoryList} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
            <ChevronLeft className="h-4 w-4" /> All test types
          </button>
          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Verbal Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Read six original passages on Vietnamese business, banking, technology, healthcare and social trends,
              then judge five statements about each one. Use only what the passage says: True, False or Cannot Say.
              Every test has 30 questions, a mixed 9 Easy / 12 Medium / 9 Hard profile and a 25-minute countdown.
            </p>
          </header>
          <button onClick={startRandom} className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm" data-testid="button-random-verbal">
            <Shuffle className="h-4 w-4" /> Random test
          </button>
          <div className="grid gap-3 lg:grid-cols-2">
            {verbalTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div key={test.id} className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">{test.subtitle}</span>
                      {best ? <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]"><Trophy className="h-3 w-3" /> Best {best.score}/{best.total}</span> : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />30 questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />25 min</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />9 Easy · 12 Medium · 9 Hard</span>
                    </p>
                  </div>
                  <button onClick={() => startTest(test)} className={`inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:gap-1.5 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`} data-testid={`button-start-${test.id}`}>
                    <Play className="h-4 w-4" />{best ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>
          {verbalAttempts.length > 0 ? (
            <p className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-xs text-[var(--space-text-secondary)]">
              You have completed {verbalAttempts.length} Verbal Reasoning {verbalAttempts.length === 1 ? 'test' : 'tests'}.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- test */

  if (view === 'test' && activeTest) {
    const question = activeTest.questions[index] as AnyQuestion;
    const mixedMode = isMixedTest(activeTest);
    const isSituational = question.kind === 'situational';
    const activeQuestions = activeTest.questions as AnyQuestion[];
    const answered = activeQuestions.reduce(
      (count, activeQuestion, questionIndex) =>
        count + (isQuestionAnswered(activeQuestion, answers[questionIndex]) ? 1 : 0),
      0,
    );
    const incompleteSituational = activeQuestions.reduce(
      (count, activeQuestion, questionIndex) =>
        count +
        (activeQuestion.kind === 'situational' && !isCompleteSituationalRating(answers[questionIndex]) ? 1 : 0),
      0,
    );
    const untimed = activeTest.timeLimitSeconds <= 0;
    const lowTime = !untimed && remaining <= 60;
    const questionFamily = questionCategory(question);
    const isInductive = question.kind === 'inductive';
    const isDeductive = question.kind === 'deductive';
    const isErrorChecking = question.kind === 'error_checking';
    const isSpatial = question.kind === 'spatial';
    const isNumerical = question.kind === 'numerical';
    const isVerbal = question.kind === 'verbal';

    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <DiagramPatternDefs />
        <InductivePatternDefs />
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-4 sm:py-2.5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-[var(--space-text-primary)]">
                  Question {index + 1}/{activeTest.questions.length}
                </p>
                {mixedMode ? (
                  <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                    {CATEGORY_LABEL[questionFamily]}
                  </span>
                ) : null}
              </div>
              <p className="text-[11px] text-[var(--space-text-muted)]">
                {activeTest.name} · {answered}/{activeTest.questions.length} answered
              </p>
            </div>
            {untimed ? (
              <div className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[var(--space-surface-muted)] px-2 py-1 text-xs font-bold text-[var(--space-text-secondary)] sm:w-auto sm:justify-start sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[13px]">
                <Clock className="h-4 w-4" /> Untimed
              </div>
            ) : (
              <div
                className={`inline-flex w-full items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-bold tabular-nums sm:w-auto sm:justify-start sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[13px] ${
                  lowTime
                    ? 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_12%,transparent)] text-[var(--space-semantic-danger)]'
                    : 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]'
                }`}
                aria-live="polite"
              >
                <Clock className="h-4 w-4" />
                {formatClock(remaining)}
              </div>
            )}
          </div>

          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
            <div
              className="h-full rounded-full bg-[var(--space-brand-primary)] transition-all"
              style={{ width: `${((index + 1) / activeTest.questions.length) * 100}%` }}
            />
          </div>

          <div className="space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:space-y-4 sm:p-4">
            {isSituational ? (
              <div className="space-y-3 rounded-xl bg-[var(--space-surface-muted)] p-4 sm:p-5">
                <span className="inline-flex rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--space-text-brand)]">
                  {(question as SituationalQuestion).competency}
                </span>
                <p className="text-sm leading-7 text-[var(--space-text-primary)] sm:text-base">
                  {question.prompt}
                </p>
              </div>
            ) : isErrorChecking ? (
              <>
                <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                <ErrorCheckingTables question={question as ErrorCheckingExpandedQuestion} />
              </>
            ) : isDeductive ? (
              <>
                <DeductivePremises premises={(question as DeductiveExpandedQuestion).premises} />
                <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
              </>
            ) : isNumerical ? (
              <>
                <NumericalTable table={(question as NumericalQuestion).table} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Question</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{question.prompt}</p>
                </div>
              </>
            ) : isVerbal ? (
              <>
                <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Passage</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[var(--space-text-primary)]">{(question as VerbalQuestion).passage}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Statement</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{question.prompt}</p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                <div className="flex w-full min-w-0 justify-start overflow-x-auto sm:justify-center">
                  {isSpatial ? (
                    <SpatialStimulus question={question as SpatialExpandedQuestion} />
                  ) : isInductive ? (
                    <InductiveSequence sequence={(question as InductiveExpandedQuestion).sequence} />
                  ) : (
                    <QuestionFigure question={question as ExpandedQuestion} />
                  )}
                </div>
              </>
            )}
            <div className="border-t border-[var(--space-border-default)] pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
                {isSituational ? 'Rate every response — use each rating once' : 'Choose one answer'}
              </p>
              {isSituational ? (
                <SituationalRatingGrid
                  question={question as SituationalQuestion}
                  value={answers[index]}
                  onChange={chooseAnswer}
                />
              ) : isErrorChecking ? (
                <ErrorCheckingOptionGrid
                  question={question as ErrorCheckingExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                />
              ) : isDeductive ? (
                <DeductiveOptionGrid
                  question={question as DeductiveExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                />
              ) : isNumerical ? (
                <NumericalOptionGrid
                  question={question as NumericalQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                />
              ) : isVerbal ? (
                <VerbalOptionGrid
                  question={question as VerbalQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                />
              ) : isSpatial ? (
                <SpatialOptionGrid
                  question={question as SpatialExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                />
              ) : isInductive ? (
                <InductiveOptionGrid
                  question={question as InductiveExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                />
              ) : (
                <OptionGrid question={question as ExpandedQuestion} selected={answers[index]} onSelect={chooseAnswer} />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-[13px] font-medium sm:w-auto sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            {index < activeTest.questions.length - 1 ? (
              <button
                onClick={() => setIndex((i) => Math.min(activeTest.questions.length - 1, i + 1))}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold sm:w-auto sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => void finishTest(activeTest, answers, false, startedAt)}
                disabled={incompleteSituational > 0}
                title={incompleteSituational > 0 ? 'Rate all five responses on every Situational Judgement question before submitting.' : undefined}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm ${tw.button.primary}`}
                data-testid="button-submit-test"
              >
                <CheckCircle2 className="h-4 w-4" />
                Submit test
              </button>
            )}
          </div>

          {index === activeTest.questions.length - 1 && incompleteSituational > 0 ? (
            <p className="rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs leading-5 text-[var(--space-text-brand)]">
              {incompleteSituational} Situational Judgement question{incompleteSituational === 1 ? '' : 's'} still need all five ratings. Use the numbered buttons to return to them before submitting.
            </p>
          ) : null}

          <div className="flex max-h-44 flex-wrap content-start gap-1.5 overflow-y-auto overscroll-contain pr-1 sm:max-h-none sm:overflow-visible sm:pr-0">
            {activeTest.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to question ${i + 1}`}
                className={`h-11 w-11 rounded-lg border text-xs font-bold transition sm:h-8 sm:w-8 sm:text-xs ${
                  i === index
                    ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                    : isQuestionAnswered(activeQuestions[i], answers[i])
                      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-muted)]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              submittingRef.current = true;
              if (mixedMode) {
                openCategoryList();
              } else {
                setView('family');
              }
            }}
            className="inline-flex min-h-11 items-center text-xs font-medium text-[var(--space-text-muted)] hover:underline"
          >
            Exit and discard this attempt
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- results */

  if (view === 'results' && finished) {
    const { test, score, exactScore, total, percent, durationSeconds, timedOut, breakdown } = finished;
    const isMixedResult = isMixedTest(test);
    const isSituationalResult = !isMixedResult && category === 'situational';
    const performanceLabel = percent >= 85
      ? 'Excellent workplace judgement'
      : percent >= 70
        ? 'Strong workplace judgement'
        : percent >= 55
          ? 'Developing workplace judgement'
          : 'More practice recommended';

    const categoryLabel = isMixedResult
      ? 'Mixed Aptitude Test'
      : category === 'inductive'
        ? 'Inductive Reasoning'
        : category === 'deductive'
          ? 'Deductive Reasoning'
          : category === 'error_checking'
            ? 'Error Checking'
            : category === 'spatial'
              ? 'Spatial Reasoning'
              : category === 'numerical'
                ? 'Numerical Reasoning'
                : category === 'verbal'
                ? 'Verbal Reasoning'
                : category === 'situational'
                  ? 'Situational Judgement'
                  : 'Diagrammatic Reasoning';

    return (
      <div className="min-h-full w-full bg-[var(--space-surface-page)]">
        <DiagramPatternDefs />
        <InductivePatternDefs />
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <div className="rounded-xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
              {isMixedResult ? categoryLabel : `${test.name} · ${categoryLabel}`}
            </p>
            <p className="mt-1 text-2xl font-bold text-[var(--space-text-primary)] sm:text-4xl">
              {isMixedResult || isSituationalResult ? exactScore : score}
              <span className="text-lg text-[var(--space-text-muted)] sm:text-2xl">/{total}</span>
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--space-text-brand)]">
              {percent}% {isSituationalResult ? 'model judgement match' : isMixedResult ? 'overall score' : 'correct'}
            </p>
            {isSituationalResult ? (
              <p className="mt-1 text-sm font-semibold text-[var(--space-text-primary)]">{performanceLabel}</p>
            ) : null}
            <p className="mt-2 text-xs text-[var(--space-text-secondary)]">
              {isSituationalResult ? 'Completed in' : 'Time taken:'} {formatClock(durationSeconds)}
              {timedOut ? ' · auto-submitted when the time ran out' : ''}
            </p>
            {isMixedResult ? (
              <div className="mt-4 grid grid-cols-1 gap-2 text-left sm:grid-cols-2 lg:grid-cols-4">
                {breakdown.map((item) => (
                  <div
                    key={item.category}
                    className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2"
                  >
                    <p className="text-[11px] font-semibold leading-4 text-[var(--space-text-secondary)]">
                      {CATEGORY_LABEL[item.category]}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[var(--space-text-primary)]">
                      {item.score}/{item.total}
                      <span className="ml-1 text-xs font-medium text-[var(--space-text-muted)]">· {item.percent}%</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            {saving ? (
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--space-text-muted)]">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving your result…
              </p>
            ) : null}
            {saveError ? (
              <p className="mt-2 text-xs text-[var(--space-semantic-danger)]">{saveError}</p>
            ) : null}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                onClick={() => {
                  if (isMixedResult) {
                    startMixedTest();
                  } else {
                    startTest(test);
                  }
                }}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`}
              >
                <Play className="h-4 w-4" />
                {isMixedResult ? 'Try another mixed test' : 'Retake this test'}
              </button>
              <button
                onClick={() => {
                  if (isMixedResult) {
                    openCategoryList();
                  } else {
                    setView('family');
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2.5 text-sm font-medium text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
              >
                <ChevronLeft className="h-4 w-4" />
                {isMixedResult ? 'All test types' : 'Choose another test'}
              </button>
            </div>
          </div>

          {/* Percentile ranking vs every other user's aptitude attempt — the
              submissionKey is unique per attempt (startedAt), so re-renders of
              this results view never record the attempt twice. */}
          {!isSituationalResult && !isMixedResult ? (
            <PercentileRankingWidget
              app="aptitude_test"
              scorePercent={percent}
              timeSeconds={durationSeconds}
              submissionKey={`aptitude:${test.id}:${startedAt ?? 'run'}`}
            />
          ) : null}

          <h2 className="text-base font-semibold text-[var(--space-text-primary)]">Question-by-question review</h2>

          {(test.questions as AnyQuestion[]).map((question, i) => {
            const chosen = finished.answers[i];
            const right = chosen === question.correctAnswer;
            const situationalScore = question.kind === 'situational'
              ? scoreSituationalRatings(chosen, question.optimalRanking)
              : null;
            const partial = !!situationalScore && situationalScore.points > 0 && !situationalScore.exact;
            return (
              <div
                key={question.id}
                className={`space-y-3 rounded-xl border-l-4 border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 ${
                  right
                    ? 'border-l-[var(--space-semantic-success)]'
                    : partial
                      ? 'border-l-[var(--space-semantic-warning)]'
                      : 'border-l-[var(--space-semantic-danger)]'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-[var(--space-text-primary)]">Question {i + 1}</span>
                  {isMixedResult ? (
                    <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                      {CATEGORY_LABEL[questionCategory(question)]}
                    </span>
                  ) : null}
                  {question.kind === 'situational' ? (
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      situationalScore?.exact
                        ? 'text-[var(--space-semantic-success)]'
                        : situationalScore && situationalScore.points > 0
                          ? 'text-[var(--space-semantic-warning)]'
                          : 'text-[var(--space-semantic-danger)]'
                    }`}>
                      {situationalScore?.exact ? <CheckCircle2 className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                      {situationalScore ? Math.round(situationalScore.credit * 100) : 0}% credit for this judgement
                    </span>
                  ) : right ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--space-semantic-success)]">
                      <CheckCircle2 className="h-4 w-4" />
                      Correct — you chose {chosen}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--space-semantic-danger)]">
                      <XCircle className="h-4 w-4" />
                      {chosen ? `Wrong — you chose ${chosen}` : 'Not answered'}, the correct answer is {question.correctAnswer}
                    </span>
                  )}
                  <span className="ml-auto rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--space-text-muted)]">
                    {DIFFICULTY_LABEL[question.difficulty] || question.difficulty}
                  </span>
                </div>

                {question.kind === 'situational' ? (
                  <>
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3 sm:p-4">
                      <p className="text-sm leading-6 text-[var(--space-text-primary)]">{question.prompt}</p>
                      <p className="mt-2 text-[11px] font-semibold text-[var(--space-text-brand)]">{question.competency}</p>
                    </div>
                    <SituationalRatingReview question={question} value={chosen} />
                    <div className="rounded-lg bg-[var(--space-surface-accent-soft)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Why the model order works</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                    </div>
                  </>
                ) : question.kind === 'error_checking' ? (
                  <>
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <ErrorCheckingTables question={question} reveal compact />
                    <ErrorCheckingOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Where the errors were</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Pattern: {question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'deductive' ? (
                  <>
                    <DeductivePremises premises={question.premises} />
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <DeductiveOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">The reasoning</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Pattern: {question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'numerical' ? (
                  <>
                    <NumericalTable table={question.table} compact />
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <NumericalOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-accent-soft)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Calculation</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Skill: {question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'verbal' ? (
                  <>
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3 sm:p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Passage</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--space-text-primary)]">{question.passage}</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <VerbalOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-accent-soft)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Why</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Topic: {question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'spatial' ? (
                  <>
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <div className="flex w-full min-w-0 justify-start overflow-x-auto sm:justify-center">
                      <SpatialStimulus question={question} compact />
                    </div>
                    <SpatialOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">The spatial rule</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Pattern: {question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'inductive' ? (
                  <>
                    <div className="flex w-full min-w-0 justify-start overflow-x-auto sm:justify-center">
                      <InductiveSequence
                        sequence={question.sequence}
                        answer={question.options[question.optionLabels.indexOf(question.correctAnswer)]}
                        cellSize={72}
                      />
                    </div>
                    <InductiveOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">The two rules</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                        <span className="font-semibold">Rule 1:</span> {question.rule1}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                        <span className="font-semibold">Rule 2:</span> {question.rule2}
                      </p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Pattern: {question.patternName}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex w-full min-w-0 justify-start overflow-x-auto sm:justify-center">
                      <QuestionFigure question={question} reveal compact />
                    </div>
                    <OptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">The rule</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-[var(--space-text-brand)]">
                        {question.answerSummary}
                      </p>
                      {question.source ? (
                        <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Pattern: {question.source}</p>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-[var(--space-surface-page)] p-6">
      <p className="text-sm text-[var(--space-text-muted)]">Loading the question bank…</p>
    </div>
  );
}
