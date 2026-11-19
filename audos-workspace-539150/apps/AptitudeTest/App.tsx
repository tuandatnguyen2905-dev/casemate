// Casemate — Aptitude Test, v1.1.
//
// Aptitude tests are a REQUIRED selection round at most Vietnamese MT
// programmes (Techcombank, Unilever, L'Oréal…), and candidates almost never
// get to practise one before the real thing. This app covers the eight core test
// families those rounds draw from — Diagrammatic, Inductive, Deductive, Error
// Checking, Spatial, Numerical and Verbal Reasoning, plus Situational Judgement —
// with full practice libraries for each.
//
// LANGUAGE: this app is ENGLISH end to end — questions, answer options, rule
// explanations and the surrounding UI. Casemate is otherwise a Vietnamese
// product, but the real aptitude round is sat in English, so practising in
// English is the whole point. Do not translate this app back into Vietnamese
// without changing lib/diagrammatic.ts and lib/diagrammaticLibrary.ts too.
//
// ACCESS: Aptitude Test is part of Casemate Pro. The shared PaywallGate grants
// full access during the authoritative 14-day standard trial and for active
// team, tester, and Pro tiers, while preserving the test experience unchanged.
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
import type { ReactNode } from 'react';
import {
  Award,
  BookOpen,
  Brain,
  Cog,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Compass,
  Diamond,
  HelpCircle,
  Hexagon,
  LayoutGrid,
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
import PaywallGate from '../../components/PaywallGate';
import { FigureRotateBar } from '../../components/RotateFigureButton';
import { emitLiveSourceEventsOnce, insertedWorkspaceRowId, logLiveTrackingFailure, workspaceRows } from '../../lib/liveFeatureTracking';
import { isEngagementActive, trackMove, trackStepError, trackStepView, useActiveTimeThreshold } from '../../lib/engagementTracking';
import { loadDiagrammaticLibrary } from '../../lib/diagrammaticLibrary';
import { loadAssessmentDayDiagrammaticTests } from '../../lib/assessmentDayDiagrammaticTests';
import { loadAssessmentDayDiagrammaticProcessTests } from '../../lib/assessmentDayDiagrammaticProcessTests';
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
import { loadAssessmentDayInductiveLogicTests } from '../../lib/assessmentDayInductiveLogicTests';
import { loadAssessmentDayInductiveReasoningTests } from '../../lib/assessmentDayInductiveReasoningTests';
import type { InductiveExpandedQuestion, InductiveTest } from '../../lib/inductive';
import {
  InductivePatternDefs,
  InductiveFigureSVG,
  InductiveSequence,
} from '../../components/InductiveFigure';
import { loadDeductiveLibrary } from '../../lib/deductiveLibrary';
import { loadAssessmentDayDeductiveTests } from '../../lib/assessmentDayDeductiveTests';
import type { DeductiveExpandedQuestion, DeductiveTest } from '../../lib/deductive';
import { loadErrorCheckingLibrary } from '../../lib/errorCheckingLibrary';
import { loadAssessmentDayErrorCheckingTests } from '../../lib/assessmentDayErrorCheckingTests';
import type { ErrorCheckingExpandedQuestion, ErrorCheckingTest } from '../../lib/errorChecking';
import { ErrorCheckingTables } from '../../components/ErrorCheckingTable';
import { loadSpatialLibrary } from '../../lib/spatialLibrary';
import type { SpatialExpandedQuestion, SpatialTest } from '../../lib/spatial';
import type { SpatialPdfSource } from '../../lib/assessmentDaySpatialTests';
import { loadLogicalReasoningLibrary } from '../../lib/logicalReasoning';
import type { LogicalQuestion, LogicalTest } from '../../lib/logicalReasoning';
import { loadCriticalThinkingLibrary } from '../../lib/criticalThinking';
import { loadMechanicalReasoningLibrary } from '../../lib/mechanicalReasoning';
import InTrayFamily from '../../components/InTrayExercise';
import type { TraySaveInput } from '../../components/InTrayExercise';
import AptitudeLibrary from '../../components/AptitudeLibrary';
import type { LibraryEntry } from '../../components/AptitudeLibrary';
import { computeAptitudeProgress } from '../../lib/aptitudeProgress';
import type { ProgressStartRow } from '../../lib/aptitudeProgress';
import { loadInTrayExercises } from '../../lib/inTrayExercises';
import type { TrayExercise } from '../../lib/inTrayExercises';
import {
  SITUATIONAL_RATING_LABELS,
  encodeMostLeast,
  encodeSituationalRatings,
  isCompleteSituationalAnswer,
  loadSituationalJudgementLibrary,
  parseMostLeast,
  parseSituationalRatings,
  scoreSituationalAnswer,
  situationalFormatOf,
  situationalRatingLabels,
} from '../../lib/situationalJudgement';
import type { SituationalQuestion, SituationalTest } from '../../lib/situationalJudgement';
import { loadVerbalReasoningLibrary } from '../../lib/verbalReasoning';
import type { VerbalQuestion, VerbalTest } from '../../lib/verbalReasoning';
import {
  RANK_SEPARATOR,
  formatNumericalAnswer,
  formatNumericalCorrectAnswer,
  isNumericalAnswerComplete,
  isNumericalAnswerCorrect,
  loadNumericalReasoningLibrary,
} from '../../lib/numericalReasoning';
import type { FreeAnswerQuestion, NumericalQuestion, NumericalTest } from '../../lib/numericalReasoning';
import { NumericalTable } from '../../components/NumericalTable';
import { NumericalSourceContext } from '../../components/NumericalSourceContext';

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

type Category = 'diagrammatic' | 'inductive' | 'deductive' | 'error_checking' | 'spatial' | 'numerical' | 'verbal' | 'situational' | 'logical' | 'critical' | 'mechanical' | 'in_tray';
type TestMode = Category | 'mixed';
type SourceQuestion =
  | ExpandedQuestion
  | InductiveExpandedQuestion
  | DeductiveExpandedQuestion
  | ErrorCheckingExpandedQuestion
  | SpatialExpandedQuestion
  | NumericalQuestion
  | VerbalQuestion
  | SituationalQuestion
  | LogicalQuestion;
type AnyQuestion = SourceQuestion & {
  hint: string;
  explanation: string;
};
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
      'Find the hidden rule in a 3×3 grid, a sequence, or two sets of figures — 45 original tests across Easy, Medium and Hard, plus 5 AssessmentDay tests with the original booklet figures (Tests 1 and 2: operators and processes; Tests 3 to 5: Set A / Set B).',
    icon: Hexagon,
    ready: true,
  },
  {
    id: 'inductive',
    name: 'Inductive Reasoning',
    blurb:
      'Watch a sequence of five figures play out under two hidden rules, then pick the figure that comes next (34 original tests, 30 questions each), or find the rule behind Set A and Set B and file new figures (4 AssessmentDay Inductive Logic tests), plus 12 AssessmentDay Inductive Reasoning booklets (Tests 1 to 12) - all with the original booklet figures.',
    icon: Lightbulb,
    ready: true,
  },
  {
    id: 'deductive',
    name: 'Deductive Reasoning',
    blurb:
      'Read a passage of premises, then judge each statement: True, False, or Insufficient Information - 4 AssessmentDay tests (22 questions, 25 minutes, original booklet premises tables and diagrams, official answers and explanations) plus 46 original tests, 30 questions each.',
    icon: Compass,
    ready: true,
  },
  {
    id: 'error_checking',
    name: 'Error Checking',
    blurb:
      'Compare the copied data against the original at speed and spot exactly where it differs - 5 AssessmentDay tests (20 questions, original booklet data) plus 45 original tests, 30 questions each at 20 seconds a question.',
    icon: Search,
    ready: true,
  },
  {
    id: 'spatial',
    name: 'Spatial Reasoning',
    blurb: 'Rotate and reflect figures, fold cube nets, assemble pieces and compare top views: 4 AssessmentDay picture tests plus 46 original tests.',
    icon: Diamond,
    ready: true,
  },
  {
    id: 'numerical',
    name: 'Numerical Reasoning',
    blurb: 'Practise all 12 reconstructed AssessmentDay numerical tests, 6 AssessmentDay Numerical Comprehension word-problem tests, 2 AssessmentDay Advanced tests (comparison of quantities and sufficiency of information), 4 AssessmentDay Capp tests (original booklet tables and charts with options, typed answers and rankings), 2 AssessmentDay Cut-e style tests (six original booklet exhibits and True / False / Cannot Say statements, 18 minutes), six additional sourced tests and the existing original bank, with source filters, original timers and responsive exhibits.',
    icon: Calculator,
    ready: true,
  },
  {
    id: 'verbal',
    name: 'Verbal Reasoning',
    blurb: 'Practise 11 AssessmentDay verbal comprehension tests (multiple choice on short passages), 3 AssessmentDay Cut-e style tests (one reading booklet, 38 True / False / Cannot Say statements, 18 minutes), 4 AssessmentDay Syllogisms tests (two premises, five conclusions, 10 seconds a question), 4 untimed AssessmentDay Capp tests (message style A/B, word choice, typed corrections, response ranking and True / False / Cannot Say) and 30 original business-passage tests.',
    icon: BookOpen,
    ready: true,
  },
  {
    id: 'situational',
    name: 'Situational Judgement',
    blurb: 'Practise 5 AssessmentDay situational judgement tests (16 questions each: most and least likely, ranked responses, most and least effective, rated responses, with the official commentary) and 45 original tests that rate five responses to MT and consulting workplace scenarios. All untimed.',
    icon: Users,
    ready: true,
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    blurb: 'Find the rules behind a grid of symbols and pick the missing cell from 12 options (or the missing section of a pattern from 9): 15 AssessmentDay tests with the original booklet pictures plus 35 original Casemate tests, with the rules explained.',
    icon: LayoutGrid,
    ready: true,
  },
  {
    id: 'critical',
    name: 'Critical Thinking',
    blurb: 'CCAT-style critical thinking: read a short statement and decide whether each proposed assumption is taken for granted (Assumption Made) or not (Assumption Not Made) — 8 AssessmentDay Assumptions tests plus 42 original Casemate tests, 12 questions in 12 minutes each, with explanations.',
    icon: Brain,
    ready: true,
  },
  {
    id: 'mechanical',
    name: 'Mechanical Reasoning',
    blurb: 'Look at a picture of levers, pulleys, gears, fluids or forces and choose what happens: 4 AssessmentDay tests plus Test 5, 20 questions in 12 minutes each, with the original booklet pictures and a worked explanation for every question.',
    icon: Cog,
    ready: true,
  },
  {
    id: 'in_tray',
    name: 'In-Tray & E-Tray',
    blurb: 'Work through a full inbox like a real assessment centre: 3 In-Tray exercises (printed e-mails, memos and reports to prioritise, with the actions to take) and 3 E-Tray exercises (an e-mail inbox with supporting documents), each with the original booklet pages and the model answers.',
    icon: ClipboardList,
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
  logical: 'Logical Reasoning',
  critical: 'Critical Thinking',
  mechanical: 'Mechanical Reasoning',
  in_tray: 'In-Tray & E-Tray',
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  mixed: 'Mixed',
  assessmentday: 'AssessmentDay',
};

type DiagrammaticTab = LibraryDifficulty | 'assessmentday';

function diagrammaticTabOf(test: { id: string; difficulty: string }): DiagrammaticTab {
  return test.id.startsWith('dra-') ? 'assessmentday' : (test.difficulty as LibraryDifficulty);
}

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

function questionHint(question: SourceQuestion): string {
  switch (question.kind) {
    case 'numerical':
      return 'Identify the exact rows, columns and units the question needs, then write the calculation in stages before checking the answer choices.';
    case 'verbal':
      return 'Use only evidence stated in the passage. Check whether the statement is supported, contradicted, or simply not addressed.';
    case 'situational':
      return 'Rank responses by how directly they solve the issue while protecting stakeholders, escalating proportionately and taking ownership.';
    case 'deductive':
      return 'Translate each premise into a firm constraint, then test the statement without adding assumptions that are not given.';
    case 'error_checking':
      return 'Compare the original and copied records one field at a time; do not rely on the rows looking broadly similar.';
    case 'spatial':
      return 'Choose one distinctive feature as an anchor, then track its position and orientation through the transformation.';
    case 'inductive':
      return 'Track separate visual features independently—such as position, count, fill and rotation—then apply both emerging rules to the next step.';
    default:
      return question.kind === 'set_ab'
        ? 'Identify the property shared by every figure in Set A and the contrasting property shared by every figure in Set B.'
        : 'Compare consecutive cells feature by feature. Look for a rule in position, count, fill, shape or rotation before testing the options.';
  }
}

function correctAnswerText(question: SourceQuestion): string {
  if (question.kind === 'situational') {
    return question.optimalRanking
      .map((optionLabel, ratingIndex) => `${optionLabel} — ${SITUATIONAL_RATING_LABELS[ratingIndex]}`)
      .join('; ');
  }
  return question.correctAnswer;
}

function fallbackReasoning(question: SourceQuestion): string {
  if (question.kind === 'inductive') {
    return `The sequence follows two linked rules: ${question.rule1} ${question.rule2}`;
  }
  if ('answerSummary' in question) {
    return question.answerSummary;
  }
  return `This option is the only one that satisfies the information and transformation shown in the question.`;
}

function wrongAnswerReason(question: SourceQuestion): string {
  switch (question.kind) {
    case 'numerical':
      return 'The other values come from using the wrong row, unit, base value or calculation step.';
    case 'verbal':
      return 'The other choices either conflict with the passage or assume information that the passage never provides.';
    case 'situational':
      return 'Alternative rankings overvalue passive, disproportionate or low-ownership responses and undervalue the actions that address the issue constructively.';
    case 'deductive':
      return 'The other choices either contradict a premise or claim more certainty than the premises support.';
    case 'error_checking':
      return 'The other options do not match the exact field differences between the original and copied records.';
    case 'spatial':
    case 'inductive':
    default:
      return 'Each other option breaks at least one required visual rule, even if it matches another feature of the pattern.';
  }
}

function enrichQuestion<T extends SourceQuestion>(question: T): T & { hint: string; explanation: string } {
  const storedHint = typeof (question as { hint?: unknown }).hint === 'string'
    ? (question as { hint: string }).hint.trim()
    : '';
  const storedExplanation = typeof (question as { explanation?: unknown }).explanation === 'string'
    ? (question as { explanation: string }).explanation.trim()
    : '';
  const reasoning = storedExplanation || fallbackReasoning(question);
  const hasOfficialSource = 'sourceOrganization' in question && Boolean(question.sourceOrganization);
  return {
    ...question,
    hint: storedHint || questionHint(question),
    explanation: hasOfficialSource
      ? reasoning
      : `Correct answer: ${correctAnswerText(question)}. ${reasoning} ${wrongAnswerReason(question)}`,
  };
}

function enrichTests<T extends { questions: readonly SourceQuestion[] }>(sourceTests: readonly T[]): T[] {
  return sourceTests.map((test) => ({
    ...test,
    questions: test.questions.map((question) => enrichQuestion(question)),
  }) as T);
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
    case 'logical':
      return 'logical';
    default:
      return 'diagrammatic';
  }
}

function isTypedVerbal(question: AnyQuestion): question is VerbalQuestion & { answerKind: 'text' } {
  return question.kind === 'verbal' && question.answerKind === 'text';
}

function questionCredit(question: AnyQuestion, answer: string | null | undefined): number {
  if (question.kind === 'situational') {
    return scoreSituationalAnswer(question, answer).credit;
  }
  if (question.kind === 'numerical' || isTypedVerbal(question)) {
    return isNumericalAnswerCorrect(question, answer) ? 1 : 0;
  }
  return answer === question.correctAnswer ? 1 : 0;
}

function isQuestionAnswered(question: AnyQuestion, answer: string | null | undefined): boolean {
  if (question.kind === 'situational') return isCompleteSituationalAnswer(question, answer);
  if (question.kind === 'numerical' || isTypedVerbal(question)) return isNumericalAnswerComplete(question, answer);
  return Boolean(answer);
}

function displayAnswer(question: AnyQuestion, value: string | null | undefined): string {
  return question.kind === 'numerical' || isTypedVerbal(question) ? formatNumericalAnswer(question, value) : String(value ?? '');
}

function displayCorrectAnswer(question: AnyQuestion): string {
  if (question.kind === 'numerical' || isTypedVerbal(question)) return formatNumericalCorrectAnswer(question);
  return (question as { correctAnswer?: string }).correctAnswer ?? '';
}

function numericalAnswerHeading(question: AnyQuestion): string {
  if (isTypedVerbal(question)) return 'Type your answer';
  if (question.kind !== 'numerical') return 'Choose one answer';
  if (question.answerKind === 'numeric' || question.answerKind === 'text') return 'Type your answer';
  if (question.answerKind === 'rank') return 'Rank every item, 1st to last';
  return 'Choose one answer';
}

function situationalHeading(question: SituationalQuestion): string {
  const format = situationalFormatOf(question);
  if (format === 'most_least') {
    return `Choose the ${(question.mostLabel || 'most effective').toLowerCase()} and the ${(question.leastLabel || 'least effective').toLowerCase()} response`;
  }
  if (format === 'ranked') return 'Rank every response — use each rank once';
  return 'Rate every response — use each rating once';
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
  answers_json?: unknown;
  created_at: string;
}

interface AptitudeTrackingSource {
  insertResponse: unknown;
  sessionId: string;
  userKey: string;
  completedAt: string;
  testType: string;
  testId: string;
  testName: string;
  score: number;
  total: number;
  percent: number;
  durationSeconds: number;
  timedOut: boolean;
}

function emitAptitudeAttempt(input: AptitudeTrackingSource): void {
  void (async () => {
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.from) throw new Error('workspace_db_unavailable');
      let rowId = insertedWorkspaceRowId(input.insertResponse);
      if (!rowId) {
        const source = await db
          .from('aptitude_attempts', { shared: true })
          .eq('user_key', input.userKey)
          .eq('completed_at', input.completedAt)
          .eq('test_id', input.testId)
          .limit(1)
          .get();
        const row = workspaceRows(source)[0] || null;
        rowId = Number(row?.id) || null;
      }
      if (!rowId) throw new Error('aptitude_attempt_row_id_unavailable');
      const properties = {
        score: input.score,
        total: input.total,
        percent: input.percent,
        test_id: input.testId,
        test_name: input.testName || null,
        test_type: input.testType,
        timed_out: input.timedOut,
        duration_seconds: input.durationSeconds,
      };
      if (input.timedOut) {
        emitLiveSourceEventsOnce({
          featureName: 'aptitude',
          appId: 'aptitude-test',
          mode: null,
          sessionId: input.sessionId,
          sourceTable: 'aptitude_attempts',
          sourceRecordId: rowId,
          sourceUserKey: input.userKey,
          occurredAt: input.completedAt,
          properties,
          events: [{ eventName: 'aptitude_timed_out', eventRole: 'diagnostic', completionKey: null }],
        });
        return;
      }
      const completionKey = `aptitude:${rowId}`;
      emitLiveSourceEventsOnce({
        featureName: 'aptitude',
        appId: 'aptitude-test',
        mode: null,
        sessionId: input.sessionId,
        sourceTable: 'aptitude_attempts',
        sourceRecordId: rowId,
        sourceUserKey: input.userKey,
        occurredAt: input.completedAt,
        properties,
        events: [{ eventName: 'aptitude_submitted', eventRole: 'core_action', completionKey }],
        coreDedup: { eventName: 'aptitude_submitted', completionKey },
      });
    } catch (error) {
      logLiveTrackingFailure({
        featureName: 'aptitude',
        eventName: input.timedOut ? 'aptitude_timed_out' : 'aptitude_submitted',
        sessionId: input.sessionId,
        reason: error instanceof Error ? error.message : 'aptitude_attempt_source_read_failed',
        statusCode: Number.isFinite(Number((error as any)?.status)) ? Number((error as any).status) : null,
        phase: 'aptitude_source_read',
      });
    }
  })();
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

  const pdfSource = (question as ExpandedQuestion & { pdfSource?: SpatialPdfSource }).pdfSource;
  if (pdfSource) return <SpatialPdfFigure key={question.id} source={pdfSource} compact={compact} />;

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

const PDFJS_VERSION = '4.0.379';
const PDFJS_BASE = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/`;
let pdfJsPromise: Promise<any> | null = null;
const pdfDocumentCache = new Map<string, Promise<any>>();

function loadPdfJs(): Promise<any> {
  if (!pdfJsPromise) {
    const libraryUrl = `${PDFJS_BASE}pdf.min.mjs`;
    pdfJsPromise = import(/* @vite-ignore */ libraryUrl).then((library: any) => {
      library.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}pdf.worker.min.mjs`;
      return library;
    });
    pdfJsPromise.catch(() => { pdfJsPromise = null; });
  }
  return pdfJsPromise;
}

function loadPdfDocument(url: string): Promise<any> {
  let documentPromise = pdfDocumentCache.get(url);
  if (!documentPromise) {
    documentPromise = loadPdfJs().then((library) => library.getDocument({ url }).promise);
    pdfDocumentCache.set(url, documentPromise);
    documentPromise.catch(() => { pdfDocumentCache.delete(url); });
  }
  return documentPromise;
}

/**
 * One AssessmentDay Spatial Reasoning question, drawn from the page of the
 * original booklet PDF and cropped to the question artwork.
 */
function SpatialPdfFigure({
  source,
  compact,
  overlay,
  maxWidth: maxWidthOverride,
  rotatable,
  rotation: controlledRotation,
  onReadyChange,
}: {
  source: SpatialPdfSource;
  compact?: boolean;
  overlay?: ReactNode;
  maxWidth?: number;
  /** Show a Rotate button directly above the figure frame (90 degrees clockwise per click). */
  rotatable?: boolean;
  /** When set, the parent owns the rotation and renders its own Rotate button. */
  rotation?: number;
  onReadyChange?: (ready: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [ownRotation, setOwnRotation] = useState(0);
  const [x0, y0, x1, y1] = source.box;
  const maxWidth = maxWidthOverride ?? (compact ? 380 : 560);
  const controlled = typeof controlledRotation === 'number';
  const rotation = controlled ? (((controlledRotation as number) % 360) + 360) % 360 : ownRotation;
  const sideways = rotation === 90 || rotation === 270;
  const figureRatio = (x1 - x0) / (y1 - y0);

  useEffect(() => {
    setOwnRotation(0);
  }, [source.url, source.page, x0, y0, x1, y1]);

  useEffect(() => {
    if (onReadyChange) onReadyChange(status === 'ready');
  }, [status]);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    (async () => {
      const pdfDocument = await loadPdfDocument(source.url);
      const page = await pdfDocument.getPage(source.page);
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      const ratio = typeof window !== 'undefined' ? Math.max(1, Math.min(2, window.devicePixelRatio || 1)) : 1;
      const scale = (maxWidth / (x1 - x0)) * ratio * 1.25;
      canvas.width = Math.round((x1 - x0) * scale);
      canvas.height = Math.round((y1 - y0) * scale);
      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: page.getViewport({ scale }),
        transform: [1, 0, 0, 1, -x0 * scale, -y0 * scale],
      }).promise;
      if (!cancelled) setStatus('ready');
    })().catch((error) => {
      if (cancelled) return;
      setStatus('error');
      trackStepError('aptitude-test', 'solving', error, { properties: { error_source: 'question_picture' } });
    });
    return () => { cancelled = true; };
  }, [source.url, source.page, x0, y0, x1, y1, maxWidth]);

  const frame = (
    <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-white" style={{ maxWidth }}>
      <div style={sideways ? { position: 'relative', width: '100%', aspectRatio: `${y1 - y0} / ${x1 - x0}` } : undefined}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Question artwork from the AssessmentDay booklet, page ${source.page}`}
          className={`${sideways ? 'block' : 'block h-auto w-full'}${status === 'ready' ? '' : ' opacity-0'}`}
          style={
            sideways
              ? {
                  aspectRatio: `${x1 - x0} / ${y1 - y0}`,
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${figureRatio * 100}%`,
                  height: 'auto',
                  maxWidth: 'none',
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }
              : {
                  aspectRatio: `${x1 - x0} / ${y1 - y0}`,
                  transform: rotation === 180 ? 'rotate(180deg)' : undefined,
                }
          }
        />
      </div>
      {status !== 'ready' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-xs text-[var(--space-text-secondary)]">
          {status === 'loading' ? (
            <span>Loading the question picture…</span>
          ) : (
            <>
              <span>The question picture could not be loaded. Check your connection and try again.</span>
              <a className="font-semibold text-[var(--space-text-brand)] underline" href={`${source.url}#page=${source.page}`} target="_blank" rel="noreferrer">Open this booklet page</a>
            </>
          )}
        </div>
      ) : null}
      {status === 'ready' ? overlay : null}
    </div>
  );
  if (!rotatable || controlled || overlay || status === 'error') return frame;
  return (
    <div className="mx-auto w-full" style={{ maxWidth }}>
      <FigureRotateBar rotation={rotation} onRotate={() => setOwnRotation((turn) => (turn + 90) % 360)} />
      {frame}
    </div>
  );
}

/** Mechanical Reasoning questions (booklet pictures); their figures can be rotated for easier reading. */
function isMechanicalQuestion(question: { id: string }): boolean {
  return question.id.startsWith('mr-');
}

/** The reading booklet exhibits for a Cut-e style Numerical question, stacked in a scrollable panel. */
function NumericalReadingFigures({ figures, compact }: { figures: NonNullable<NumericalQuestion['figures']>; compact?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Data exhibits ({figures.length}) &mdash; scroll to see them all</p>
      <div
        className={`${compact ? 'max-h-72' : 'max-h-[26rem]'} space-y-3 overflow-y-auto overscroll-contain rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2 sm:p-3`}
        tabIndex={0}
        aria-label="Data exhibits, scrollable"
      >
        {figures.map((source, figureIndex) => (
          <SpatialPdfFigure key={`${source.page}-${figureIndex}`} source={source} maxWidth={compact ? 440 : 520} />
        ))}
      </div>
    </div>
  );
}

/**
 * The original booklet picture for a Logical Reasoning question. In the test the
 * answer cells carry letter chips; in the review the Solutions booklet picture
 * is shown, with the correct cell outlined in blue.
 */
function LogicalStimulus({ question, compact, solution }: { question: LogicalQuestion; compact?: boolean; solution?: boolean }) {
  const source = solution ? question.solutionSource : question.pdfSource;
  const [bx0, by0, bx1, by1] = question.pdfSource.box;
  const [px0, py0, px1, py1] = question.panel.box;
  const columnStarts = question.panel.columnStarts;
  const cellWidth = (px1 - px0) / question.columns;
  const cellHeight = (py1 - py0) / question.rows;
  const overlay = solution ? null : (
    <>
      {question.optionLabels.map((label, optionIndex) => {
        const column = optionIndex % question.columns;
        const row = Math.floor(optionIndex / question.columns);
        const left = (((columnStarts ? columnStarts[column] : px0 + column * cellWidth) + 2 - bx0) / (bx1 - bx0)) * 100;
        const top = ((py0 + row * cellHeight + 2 - by0) / (by1 - by0)) * 100;
        return (
          <span
            key={label}
            className="pointer-events-none absolute flex h-[18px] min-w-[18px] items-center justify-center rounded-sm bg-[var(--space-brand-primary)] px-1 text-[10px] font-bold leading-none text-[var(--space-text-on-primary)] opacity-90 shadow"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {label}
          </span>
        );
      })}
    </>
  );
  return (
    <SpatialPdfFigure
      key={`${question.id}-${solution ? 's' : 'q'}`}
      source={source}
      compact={compact}
      maxWidth={compact ? 560 : 760}
      overlay={overlay}
    />
  );
}

/** Lettered answer buttons for Logical Reasoning, laid out like the answer panel in the booklet. */
function LogicalOptionGrid({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: LogicalQuestion;
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
    <div
      className="mx-auto grid w-full max-w-md gap-2"
      style={{ gridTemplateColumns: `repeat(${question.columns}, minmax(0, 1fr))` }}
      role="radiogroup"
      aria-label="Answer options"
    >
      {question.optionLabels.map((label) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={selected === label}
          disabled={!onSelect}
          onClick={() => onSelect && onSelect(label)}
          className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2 text-sm font-bold text-[var(--space-text-primary)] transition ${frameClass(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {label}
          {reveal && label === question.correctAnswer ? <CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" /> : null}
          {reveal && label === selected && label !== question.correctAnswer ? <XCircle className="h-4 w-4 text-[var(--space-semantic-danger)]" /> : null}
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
  const pdfSource = (question as SpatialExpandedQuestion & { pdfSource?: SpatialPdfSource }).pdfSource;
  if (pdfSource) return <SpatialPdfFigure key={question.id} source={pdfSource} compact={compact} />;
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

  if ((question as SpatialExpandedQuestion & { pdfSource?: SpatialPdfSource }).pdfSource) {
    return (
      <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3" role="radiogroup" aria-label="Answer options">
        {question.optionLabels.map((label) => (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={selected === label}
            disabled={!onSelect}
            onClick={() => onSelect && onSelect(label)}
            className={`flex min-h-14 items-center justify-center gap-1 rounded-xl border-2 text-base font-bold text-[var(--space-text-primary)] transition ${frameClass(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {label}
            {reveal && label === question.correctAnswer ? (
              <CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" />
            ) : null}
            {reveal && label === selected && label !== question.correctAnswer ? (
              <XCircle className="h-4 w-4 text-[var(--space-semantic-danger)]" />
            ) : null}
          </button>
        ))}
      </div>
    );
  }

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

/** Typed (number or phrase) and ranking answers for the Capp Numerical tests. */
function NumericalFreeAnswer({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: FreeAnswerQuestion;
  selected?: string | null;
  onSelect?: (value: string) => void;
  reveal?: boolean;
}) {
  const correct = isNumericalAnswerCorrect(question, selected);
  const verdict = reveal ? (
    <div
      className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2 text-sm ${
        correct
          ? 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]'
          : 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]'
      }`}
    >
      {correct ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" />
      ) : (
        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" />
      )}
      <span className="min-w-0 text-[var(--space-text-primary)]">
        Correct answer: <strong>{formatNumericalCorrectAnswer(question)}</strong>
      </span>
    </div>
  ) : null;

  if (question.answerKind === 'rank') {
    const items = question.rankItems || [];
    const picked = selected ? selected.split(RANK_SEPARATOR).filter(Boolean) : [];
    const toggle = (item: string) => {
      if (!onSelect) return;
      const at = picked.indexOf(item);
      onSelect((at >= 0 ? picked.slice(0, at) : [...picked, item]).join(RANK_SEPARATOR));
    };
    return (
      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Items to rank">
          {items.map((item) => {
            const at = picked.indexOf(item);
            return (
              <button
                key={item}
                type="button"
                aria-pressed={at >= 0}
                disabled={!onSelect}
                onClick={() => toggle(item)}
                className={`flex min-w-0 items-center gap-2 rounded-xl border-2 px-3 py-2 text-left transition sm:gap-3 sm:px-4 sm:py-2.5 ${
                  at >= 0
                    ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
                    : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]'
                } ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                    at >= 0
                      ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                      : 'border-[var(--space-border-strong)] text-[var(--space-text-muted)]'
                  }`}
                >
                  {at >= 0 ? at + 1 : ''}
                </span>
                <span className="min-w-0 text-sm font-medium text-[var(--space-text-primary)]">{item}</span>
              </button>
            );
          })}
        </div>
        {onSelect ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-[var(--space-text-muted)]">
              {picked.length} of {items.length} placed. Tap a numbered item to take it, and the ones after it, back out.
            </p>
            {picked.length ? (
              <button
                type="button"
                onClick={() => onSelect('')}
                className="rounded-full border border-[var(--space-border-default)] px-3 py-1 text-xs font-semibold text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]"
              >
                Clear
              </button>
            ) : null}
          </div>
        ) : null}
        {verdict}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <input
        type="text"
        inputMode={question.answerKind === 'numeric' ? 'decimal' : 'text'}
        autoComplete="off"
        spellCheck={false}
        aria-label="Your answer"
        value={selected ?? ''}
        disabled={!onSelect}
        onChange={(event) => onSelect && onSelect(event.target.value)}
        placeholder={question.answerKind === 'numeric' ? 'Type your answer, for example 1,250 or 12.5' : 'Type your answer'}
        className="w-full rounded-xl border-2 border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 text-sm font-semibold text-[var(--space-text-primary)] outline-none transition focus:border-[var(--space-brand-primary)] disabled:cursor-default"
      />
      {verdict}
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
  if (question.answerKind && question.answerKind !== 'choice') {
    return <NumericalFreeAnswer question={question} selected={selected} onSelect={onSelect} reveal={reveal} />;
  }
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
  if (question.compactOptions) {
    return (
      <div className="mx-auto grid w-full max-w-md gap-2" style={{ gridTemplateColumns: `repeat(${question.optionLabels.length}, minmax(0, 1fr))` }} role="radiogroup" aria-label="Answer options">
        {question.optionLabels.map((label) => (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={selected === label}
            disabled={!onSelect}
            onClick={() => onSelect && onSelect(label)}
            className={`flex min-h-12 items-center justify-center gap-1 rounded-xl border-2 text-base font-bold text-[var(--space-text-primary)] transition ${frameClass(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {label}
            {reveal && label === question.correctAnswer ? <CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" /> : null}
            {reveal && label === selected && label !== question.correctAnswer ? <XCircle className="h-4 w-4 text-[var(--space-semantic-danger)]" /> : null}
          </button>
        ))}
      </div>
    );
  }
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
  if (question.answerKind === 'text') {
    return <NumericalFreeAnswer question={question} selected={selected} onSelect={onSelect} reveal={reveal} />;
  }
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
  if (question.optionTexts) {
    return (
      <div className="grid grid-cols-1 gap-2" role="radiogroup" aria-label="Answer options">
        {question.options.map((label, optionIndex) => (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={selected === label}
            disabled={!onSelect}
            onClick={() => onSelect && onSelect(label)}
            className={`flex min-w-0 items-start gap-2 rounded-xl border-2 px-3 py-2 text-left transition sm:gap-3 sm:px-4 sm:py-2.5 ${frameClass(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">{label}</span>
            <span className="min-w-0 text-sm font-medium leading-6 text-[var(--space-text-primary)]">{question.optionTexts?.[optionIndex]}</span>
            {reveal && label === question.correctAnswer ? <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" /> : null}
            {reveal && label === selected && label !== question.correctAnswer ? <XCircle className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" /> : null}
          </button>
        ))}
      </div>
    );
  }
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

/** Most / least choice for the two-pick Situational Judgement formats. */
function SituationalMostLeastGrid({
  question,
  value,
  onChange,
}: {
  question: SituationalQuestion;
  value?: string | null;
  onChange: (value: string) => void;
}) {
  const picked = parseMostLeast(value, question.optionLabels.length);
  const roleLabels = { most: question.mostLabel || 'Most effective', least: question.leastLabel || 'Least effective' };
  const choose = (optionLabel: string, role: 'most' | 'least') => {
    let { most, least } = picked;
    if (role === 'most') {
      most = most === optionLabel ? null : optionLabel;
      if (least === optionLabel) least = null;
    } else {
      least = least === optionLabel ? null : optionLabel;
      if (most === optionLabel) most = null;
    }
    onChange(encodeMostLeast(most, least));
  };

  return (
    <div className="space-y-3" aria-label="Choose the most and the least">
      {question.optionLabels.map((optionLabel, optionIndex) => (
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
          <div className="mt-3 grid grid-cols-2 gap-1.5" role="radiogroup" aria-label={`Choose response ${optionLabel}`}>
            {(['most', 'least'] as const).map((role) => {
              const selected = picked[role] === optionLabel;
              const occupied = Boolean(picked[role]) && !selected;
              return (
                <button
                  key={role}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(optionLabel, role)}
                  className={`min-h-11 min-w-0 break-words rounded-lg border px-2 py-2 text-[11px] font-semibold leading-4 transition ${
                    selected
                      ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                      : occupied
                        ? 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-muted)]'
                        : 'border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]'
                  }`}
                >
                  {roleLabels[role]}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-[11px] leading-5 text-[var(--space-text-muted)]">
        Pick exactly one response as {roleLabels.most.toLowerCase()} and one as {roleLabels.least.toLowerCase()}. Choosing a response that is already picked moves your pick to it.
      </p>
    </div>
  );
}

/** Forced ratings or ranks for a Situational Judgement question. */
function SituationalRatingGrid({
  question,
  value,
  onChange,
}: {
  question: SituationalQuestion;
  value?: string | null;
  onChange: (value: string) => void;
}) {
  if (situationalFormatOf(question) === 'most_least') {
    return <SituationalMostLeastGrid question={question} value={value} onChange={onChange} />;
  }
  const ratingLabels = situationalRatingLabels(question);
  const slots = parseSituationalRatings(value, ratingLabels.length);
  const assignRating = (optionLabel: string, ratingIndex: number) => {
    const next = slots.slice();
    const previousIndex = next.indexOf(optionLabel);
    const displaced = next[ratingIndex];
    next[ratingIndex] = optionLabel;
    if (previousIndex >= 0 && previousIndex !== ratingIndex) next[previousIndex] = displaced;
    onChange(encodeSituationalRatings(next, ratingLabels.length));
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
            <div className={`mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 ${ratingLabels.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3 xl:grid-cols-5'}`} role="radiogroup" aria-label={`Rate response ${optionLabel}`}>
              {ratingLabels.map((rating, ratingIndex) => {
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
        Use each {ratingLabels.length === 4 ? 'rank' : 'rating'} once. Choosing an occupied {ratingLabels.length === 4 ? 'rank' : 'rating'} moves or clears the previous response automatically.
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
  const format = situationalFormatOf(question);
  const mostLeast = format === 'most_least';
  const ratingLabels = situationalRatingLabels(question);
  const candidate = parseSituationalRatings(value, question.optionLabels.length);
  const pick = parseMostLeast(value, question.optionLabels.length);
  return (
    <div className="space-y-2">
      {question.optionLabels.map((optionLabel, optionIndex) => {
        const candidateIndex = candidate.indexOf(optionLabel);
        const modelIndex = question.optimalRanking.indexOf(optionLabel);
        const yourText = mostLeast
          ? `Your choice: ${pick.most === optionLabel ? question.mostLabel || 'Most' : pick.least === optionLabel ? question.leastLabel || 'Least' : 'Not chosen'}`
          : `Your ${format === 'ranked' ? 'rank' : 'rating'}: ${candidateIndex >= 0 ? ratingLabels[candidateIndex] : 'Not set'}`;
        const modelText = question.optionGrades?.[optionIndex] ?? ratingLabels[modelIndex];
        const note = question.optionNotes?.[optionIndex];
        return (
          <div key={optionLabel} className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[var(--space-text-brand)]">{optionLabel}</span>
              <p className="text-xs leading-5 text-[var(--space-text-primary)]">{question.options[optionIndex]}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-[var(--space-surface-card)] px-2 py-1 text-[var(--space-text-secondary)]">
                {yourText}
              </span>
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 font-semibold text-[var(--space-text-brand)]">
                Model: {modelText}
              </span>
            </div>
            {note ? (
              <p className="mt-2 text-[11px] leading-5 text-[var(--space-text-secondary)]">{note}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== *
 * App
 * ========================================================================== */

type View = 'home' | 'family' | 'tray' | 'test' | 'results';
type AnyTest = ExpandedTest | InductiveTest | DeductiveTest | ErrorCheckingTest | SpatialTest | NumericalTest | VerbalTest | SituationalTest | LogicalTest | MixedTest;
type SourceTest = Exclude<AnyTest, MixedTest>;

function isMixedTest(test: AnyTest): test is MixedTest {
  return 'isMixed' in test && test.isMixed === true;
}

function testSource(test: AnyTest): 'AssessmentDay' | 'Casemate original' {
  const loose = test as unknown as { id: string; name: string; sourceOrganization?: unknown; questions?: Array<{ sourceOrganization?: unknown }> };
  const organization = String(loose.sourceOrganization ?? loose.questions?.[0]?.sourceOrganization ?? '');
  if (organization) return /assessmentday/i.test(organization) ? 'AssessmentDay' : 'Casemate original';
  return /assessmentday/i.test(loose.name) || /^(ad|dra)[-_]/i.test(loose.id) ? 'AssessmentDay' : 'Casemate original';
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
  logical: 'logical-reasoning',
  critical: 'critical-thinking',
  mechanical: 'mechanical-reasoning',
  in_tray: 'in-tray-e-tray',
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

let aptitudeAttemptNo = 0;

function AptitudeTestInner() {
  const { spaceId, sessionId } = useSpaceRuntime();
  // The source libraries predate in-test help. Normalise every loaded question
  // with durable hint and explanation fields before it reaches any test mode.
  const tests = useMemo(() => enrichTests([...loadDiagrammaticLibrary(), ...loadAssessmentDayDiagrammaticProcessTests(), ...loadAssessmentDayDiagrammaticTests()]), []);
  const inductiveTests = useMemo(
    () => [
      ...enrichTests(loadAssessmentDayInductiveReasoningTests()),
      ...enrichTests(loadAssessmentDayInductiveLogicTests()),
      ...enrichTests(loadInductiveLibrary()),
    ],
    [],
  );
  const deductiveTests = useMemo(
    () => [...enrichTests(loadAssessmentDayDeductiveTests()), ...enrichTests(loadDeductiveLibrary())],
    [],
  );
  const errorCheckingTests = useMemo(
    () => [...enrichTests(loadAssessmentDayErrorCheckingTests()), ...enrichTests(loadErrorCheckingLibrary())],
    [],
  );
  const spatialTests = useMemo(() => enrichTests(loadSpatialLibrary()), []);
  const numericalTests = useMemo(() => enrichTests(loadNumericalReasoningLibrary()), []);
  const verbalTests = useMemo(() => enrichTests(loadVerbalReasoningLibrary()), []);
  const situationalTests = useMemo(() => enrichTests(loadSituationalJudgementLibrary()), []);
  const logicalTests = useMemo(() => enrichTests(loadLogicalReasoningLibrary()), []);
  const criticalTests = useMemo(() => enrichTests(loadCriticalThinkingLibrary()), []);
  const mechanicalTests = useMemo(() => enrichTests(loadMechanicalReasoningLibrary()), []);
  const trayExercises = useMemo(() => loadInTrayExercises(), []);

  const initialCategory = useMemo(() => aptitudeCategoryFromHash(), []);
  const [view, setView] = useState<View>('home');
  const [category, setCategory] = useState<TestMode>(initialCategory || 'diagrammatic');
  const [libraryFamily, setLibraryFamily] = useState<Category | 'all'>(initialCategory || 'all');
  const [trayId, setTrayId] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DiagrammaticTab>('easy');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [verbalSourceFilter, setVerbalSourceFilter] = useState('all');
  const [activeTest, setActiveTest] = useState<AnyTest | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [helpStage, setHelpStage] = useState<0 | 1 | 2>(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [finished, setFinished] = useState<FinishedAttempt | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const submittingRef = useRef(false);
  const lastOpenedTestIdRef = useRef<string | null>(null);
  const solvingTrackedRef = useRef<Set<string>>(new Set());
  const activeSecondsRef = useRef(0);

  const trackTestOpened = (testId: string, testType: string, retake = false) => {
    const previousTestId = lastOpenedTestIdRef.current;
    if (previousTestId && previousTestId !== testId) {
      trackMove('aptitude-test', 'self_exit_choose_other', { properties: { from_item_id: previousTestId } });
    }
    lastOpenedTestIdRef.current = testId;
    aptitudeAttemptNo += 1;
    const attemptNo = aptitudeAttemptNo;
    trackStepView('aptitude-test', 'choose_test', {
      dedupeKey: `${testId}:${attemptNo}`,
      properties: { test_id: testId, test_type: testType, attempt_no: attemptNo, retake },
    });
  };

  const trackSolving = (testId: string, trigger: 'active_2min' | 'answer_selected', activeSeconds: number) => {
    const attemptNo = aptitudeAttemptNo;
    const attemptKey = `${testId}:${attemptNo}`;
    if (solvingTrackedRef.current.has(attemptKey)) return;
    solvingTrackedRef.current.add(attemptKey);
    trackStepView('aptitude-test', 'solving', {
      dedupeKey: attemptKey,
      properties: { test_id: testId, trigger, active_seconds: activeSeconds, attempt_no: attemptNo },
    });
  };

  const libraryFamilyRef = useRef<Category | 'all'>(libraryFamily);
  libraryFamilyRef.current = libraryFamily;

  const openCategory = useCallback((nextCategory: Category | 'all') => {
    setLibraryFamily(nextCategory);
    setView('home');
    const nextHash = nextCategory === 'all' ? '#aptitude-test' : `#aptitude-test/${CATEGORY_ROUTES[nextCategory]}`;
    if (window.location.hash.toLowerCase() !== nextHash) {
      window.history.pushState({ app: 'aptitude-test', category: nextCategory }, '', nextHash);
    }
  }, []);

  const openCategoryList = useCallback(() => {
    openCategory(libraryFamilyRef.current);
  }, [openCategory]);

  useEffect(() => {
    const syncHashRoute = () => {
      const nextCategory = aptitudeCategoryFromHash();
      if (nextCategory) {
        setLibraryFamily(nextCategory);
        setView('home');
      } else if (isAptitudeListHash()) {
        setLibraryFamily('all');
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

  // Keep Mate's get_aptitude_test_info catalogue in sync with the live
  // libraries: idempotent — it only writes when the registered hook differs from
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
    limit: 1000,
  });
  const attempts = Array.isArray(history.data) ? history.data : [];

  // Opened-but-not-submitted tests, for the landing page's In Progress status.
  const startHistory = window.useWorkspaceDB<ProgressStartRow & { id: number }>('aptitude_test_starts', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: userKey }],
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 1000,
  });
  const startRows = Array.isArray(startHistory.data) ? startHistory.data : [];
  const [localStarts, setLocalStarts] = useState<ProgressStartRow[]>([]);
  const refreshStartsRef = useRef(startHistory.refresh);
  refreshStartsRef.current = startHistory.refresh;
  const knownStartKeys = useMemo(
    () => new Set([...startRows, ...attempts].map((row) => `${row.test_type}:${row.test_id}`)),
    [startRows, attempts],
  );
  const knownStartKeysRef = useRef(knownStartKeys);
  knownStartKeysRef.current = knownStartKeys;
  const pendingStartKeysRef = useRef<Set<string>>(new Set());

  const recordTestStart = useCallback(
    (testId: string, testType: string, testName: string) => {
      const key = `${testType}:${testId}`;
      setLocalStarts((prev) =>
        prev.some((row) => `${row.test_type}:${row.test_id}` === key) ? prev : [...prev, { test_type: testType, test_id: testId }],
      );
      if (knownStartKeysRef.current.has(key) || pendingStartKeysRef.current.has(key)) return;
      pendingStartKeysRef.current.add(key);
      window.__workspaceDb
        .from('aptitude_test_starts')
        .insert({
          user_key: userKey,
          email: email || null,
          test_type: testType,
          test_id: testId,
          test_name: testName,
          started_at: new Date().toISOString(),
        })
        .then(() => refreshStartsRef.current())
        .catch(() => {
          /* this session still shows the start from localStarts */
          pendingStartKeysRef.current.delete(key);
        });
    },
    [email, userKey],
  );

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
      trackStepView('aptitude-test', 'answer', {
        dedupeKey: `${test.id}:${aptitudeAttemptNo}`,
        properties: { test_id: test.id, score, total, percent, timed_out: timedOut, attempt_no: aptitudeAttemptNo },
      });
      window.dispatchEvent(new CustomEvent('casemate:pwa-install-ready', {
        detail: { source: 'aptitude_test_completed' },
      }));
      setSaving(true);
      setSaveError('');

      try {
        const completedAt = new Date().toISOString();
        const testType = categoryRef.current;
        const insertResponse = await window.__workspaceDb.from('aptitude_attempts').insert({
          user_key: userKey,
          email: email || null,
          test_type: testType,
          test_id: test.id,
          test_name: test.name,
          score,
          total,
          percent,
          duration_seconds: durationSeconds,
          timed_out: timedOut,
          answers_json: questions.map((question, i) => {
            const situationalScore = question.kind === 'situational'
              ? scoreSituationalAnswer(question, picked[i])
              : null;
            return {
              question_id: question.id,
              source_category: isMixedTest(test) ? questionCategory(question) : undefined,
              chosen: picked[i],
              correct: question.correctAnswer,
              is_correct: questionCredit(question, picked[i]) === 1,
              credit_percent: situationalScore ? Math.round(situationalScore.credit * 100) : undefined,
              rank_distance: situationalScore ? situationalScore.distance : undefined,
            };
          }),
          completed_at: completedAt,
        });
        refreshHistoryRef.current();
        if (sessionId) {
          emitAptitudeAttempt({
            insertResponse,
            sessionId,
            userKey,
            completedAt,
            testType,
            testId: test.id,
            testName: test.name,
            score,
            total,
            percent,
            durationSeconds,
            timedOut,
          });
        }
      } catch (error) {
        setSaveError(
          'Your full result is shown below, but it could not be saved to your history — try another test in a few minutes.',
        );
        trackStepError('aptitude-test', 'answer', error, { properties: { test_id: test.id } });
      } finally {
        setSaving(false);
      }
    },
    [email, sessionId, userKey],
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

  const runningTestId = view === 'test' && activeTest ? activeTest.id : view === 'tray' && trayId ? trayId : null;

  useEffect(() => {
    activeSecondsRef.current = 0;
    if (!runningTestId) return undefined;
    let last = Date.now();
    const timer = window.setInterval(() => {
      const now = Date.now();
      const delta = Math.min(now - last, 5000);
      last = now;
      if (isEngagementActive()) activeSecondsRef.current += delta / 1000;
    }, 1000);
    return () => window.clearInterval(timer);
  }, [runningTestId]);

  useActiveTimeThreshold(Boolean(runningTestId), runningTestId, (activeSeconds) => {
    if (runningTestId) trackSolving(runningTestId, 'active_2min', activeSeconds);
  });

  const saveTrayAttempt = useCallback(
    async (input: TraySaveInput) => {
      const completedAt = new Date().toISOString();
      const percent = Math.round((input.score / Math.max(1, input.total)) * 100);
      const score = Math.round(input.score);
      const total = Math.round(input.total);
      solvingTrackedRef.current.add(`${input.exerciseId}:${aptitudeAttemptNo}`);
      trackStepView('aptitude-test', 'answer', {
        dedupeKey: `${input.exerciseId}:${aptitudeAttemptNo}`,
        properties: { test_id: input.exerciseId, score, total, percent, timed_out: input.timedOut, attempt_no: aptitudeAttemptNo },
      });
      let insertResponse: unknown;
      try {
        insertResponse = await window.__workspaceDb.from('aptitude_attempts').insert({
          user_key: userKey,
          email: email || null,
          test_type: 'in_tray',
          test_id: input.exerciseId,
          test_name: input.exerciseName,
          score,
          total,
          percent,
          duration_seconds: input.durationSeconds,
          timed_out: input.timedOut,
          answers_json: input.detail,
          completed_at: completedAt,
        });
      } catch (error) {
        trackStepError('aptitude-test', 'answer', error, { properties: { test_id: input.exerciseId } });
        throw error;
      }
      refreshHistoryRef.current();
      if (sessionId) {
        emitAptitudeAttempt({
          insertResponse,
          sessionId,
          userKey,
          completedAt,
          testType: 'in_tray',
          testId: input.exerciseId,
          testName: input.exerciseName,
          score,
          total,
          percent,
          durationSeconds: input.durationSeconds,
          timedOut: input.timedOut,
        });
      }
    },
    [email, sessionId, userKey],
  );

  const startTest = (test: AnyTest, family?: Category, retake = false) => {
    trackTestOpened(test.id, family || category, retake);
    recordTestStart(test.id, family || category, test.name);
    submittingRef.current = false;
    if (family) setCategory(family);
    setActiveTest(test);
    setAnswers(new Array(test.questions.length).fill(null));
    setIndex(0);
    setHelpStage(0);
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
    if (activeTest) trackSolving(activeTest.id, 'answer_selected', Math.round(activeSecondsRef.current));
    setAnswers((prev) => {
      const next = prev.slice();
      next[index] = label;
      return next;
    });
  };

  const goToQuestion = (nextIndex: number) => {
    setHelpStage(0);
    setIndex(Math.max(0, Math.min(activeTest ? activeTest.questions.length - 1 : 0, nextIndex)));
  };

  /* ---------------------------------------------------------------- home */

  const libraryEntries = useMemo<LibraryEntry[]>(() => {
    const bestLabel = (id: string, family: Category) => {
      const row = bestFor(id);
      if (!row) return null;
      return family === 'situational'
        ? `Best ${row.percent ?? Math.round((row.score / Math.max(1, row.total)) * 100)}%`
        : `Best ${row.score}/${row.total}`;
    };
    const fromTests = (family: Category, list: readonly AnyTest[]): LibraryEntry[] =>
      list.map((test) => {
        const source = testSource(test);
        const level = family === 'diagrammatic' ? DIFFICULTY_LABEL[diagrammaticTabOf(test as ExpandedTest)] : '';
        return {
          key: `${family}:${test.id}`,
          id: test.id,
          family,
          title: test.name,
          group: level || source,
          source,
          tag: level && level !== DIFFICULTY_LABEL.assessmentday ? level : undefined,
          difficulty: typeof (test as { difficulty?: unknown }).difficulty === 'string' ? (test as { difficulty: string }).difficulty : null,
          detail: [
            `${test.questions.length} questions`,
            test.timeLimitSeconds > 0 ? `${Math.round(test.timeLimitSeconds / 60)} min` : 'Untimed',
          ],
          best: bestLabel(test.id, family),
          payload: test,
        };
      });
    const fromTray: LibraryEntry[] = trayExercises.map((exercise) => ({
      key: `in_tray:${exercise.id}`,
      id: exercise.id,
      family: 'in_tray',
      title: exercise.title,
      group: exercise.kind === 'in_tray' ? 'In-Tray' : 'E-Tray',
      source: 'AssessmentDay',
      detail: [`${exercise.items.length} ${exercise.kind === 'in_tray' ? 'items' : 'e-mails'}`, `${exercise.minutes} min`],
      best: bestLabel(exercise.id, 'in_tray'),
      payload: exercise,
    }));
    return [
      ...fromTests('diagrammatic', tests),
      ...fromTests('inductive', inductiveTests),
      ...fromTests('deductive', deductiveTests),
      ...fromTests('error_checking', errorCheckingTests),
      ...fromTests('spatial', spatialTests),
      ...fromTests('numerical', numericalTests),
      ...fromTests('verbal', verbalTests),
      ...fromTests('situational', situationalTests),
      ...fromTests('logical', logicalTests),
      ...fromTests('critical', criticalTests as AnyTest[]),
      ...fromTests('mechanical', mechanicalTests as AnyTest[]),
      ...fromTray,
    ];
  }, [tests, inductiveTests, deductiveTests, errorCheckingTests, spatialTests, numericalTests, verbalTests, situationalTests, logicalTests, criticalTests, mechanicalTests, trayExercises, bestFor]);

  const progress = useMemo(
    () => computeAptitudeProgress(libraryEntries, attempts, [...startRows, ...localStarts]),
    [libraryEntries, attempts, startRows, localStarts],
  );
  const progressLoading = history.loading && !Array.isArray(history.data);

  const openLibraryEntry = (entry: LibraryEntry) => {
    if (entry.family === 'in_tray') {
      trackTestOpened((entry.payload as TrayExercise).id, 'in_tray');
      recordTestStart((entry.payload as TrayExercise).id, 'in_tray', (entry.payload as TrayExercise).title);
      setCategory('in_tray');
      setTrayId((entry.payload as TrayExercise).id);
      setView('tray');
      return;
    }
    startTest(entry.payload as AnyTest, entry.family as Category);
  };

  if (view === 'home') {
    return (
      <AptitudeLibrary
        families={TEST_FAMILIES}
        entries={libraryEntries}
        family={libraryFamily}
        onFamilyChange={(id) => openCategory(id as Category | 'all')}
        onOpen={openLibraryEntry}
        progress={progress}
        progressLoading={progressLoading}
      />
    );
  }

  /* -------------------------------------------------- diagrammatic home */

  if (view === 'family' && category === 'diagrammatic') {
    const visibleTests = tests.filter((test) => diagrammaticTabOf(test) === difficultyFilter);
    const startRandom = () => {
      if (visibleTests.length) {
        startTest(visibleTests[Math.floor(Math.random() * visibleTests.length)]);
      }
    };
    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
              30 original tests across three difficulty levels plus 5 AssessmentDay tests in their own tab (Tests 1 and 2 with operators and processes, Tests 3 to 5 with Set A / Set B), 30 questions each. Every test runs a countdown —
              when the time hits zero it submits itself, exactly like the real platform. Afterwards you can
              review every question with the rule written out in plain English. Pick a test below, or let us
              deal you a random one at your level.
            </p>
          </header>

          <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2" role="tablist" aria-label="Difficulty filter">
            {(['easy', 'medium', 'hard', 'assessmentday'] as DiagrammaticTab[]).map((level) => {
              const count = tests.filter((test) => diagrammaticTabOf(test) === level).length;
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
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
              Start with the 12 AssessmentDay Inductive Reasoning booklets (Tests 1 to 12: a sequence of five
              original booklet figures and five pictures A to E to choose the next one from, one to four rules per
              question, official answers and rules, 25 minutes), then the 4 AssessmentDay Inductive Logic tests: 12 question sets per test, each showing six
              diamond figures already filed under Set A or Set B, and four new figures for you to assign by working
              out the rule behind each set (48 questions, 12 minutes, original booklet figures, official answers and
              rules). Below them are 30 original tests where a sequence of five figures plays out under two hidden
              rules and you pick the figure that comes next (30 questions each, 25-minute countdown). When the time
              hits zero a test submits itself, exactly like the real platform, and afterwards you can review every
              question with the rules written out in plain English.
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
                        {test.id.startsWith('ild-') || test.id.startsWith('adir-') ? 'Official answers and rules' : 'Two rules per question'}
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
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
              Start with the 4 AssessmentDay Deductive Reasoning tests (22 questions each, 25 minutes): the original
              booklet premises, tables and diagrams are shown with the question, you choose from the original lettered
              answer options, and the review gives the official explanation. Then the 30 original tests. Each question gives you a short passage of premises &mdash; syllogisms, if&ndash;then arguments,
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
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
              visual questions and four answer options. The four AssessmentDay tests (22 booklet questions each, 40 seconds per question) come first; their pictures load from the original booklet, so an internet connection is needed.
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

  /* ------------------------------------------------------ in-tray & e-tray */

  if (view === 'tray') {
    return (
      <InTrayFamily
        key={trayId}
        exercises={trayExercises}
        Figure={SpatialPdfFigure}
        initialExerciseId={trayId}
        onBack={openCategoryList}
        onSave={saveTrayAttempt}
        primaryClass={tw.button.primary}
        ghostClass={tw.button.ghost}
      />
    );
  }

  /* ------------------------------------------------ mechanical reasoning home */

  if (view === 'family' && category === 'mechanical') {
    const mechanicalAttempts = attempts.filter((row) => row.test_type === 'mechanical');
    const startRandom = () => {
      if (mechanicalTests.length) startTest(mechanicalTests[Math.floor(Math.random() * mechanicalTests.length)]);
    };

    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Mechanical Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Each question shows a picture of a lever, pulley, gear train, belt drive or fluid system and asks what will
              happen. Choose the one correct option from four or five. The four AssessmentDay tests have 20 questions and a
              12-minute limit. The pictures are the original booklet artwork, so an internet connection is needed, and the
              review gives AssessmentDay’s own explanation for every question.
            </p>
          </header>

          <button
            onClick={startRandom}
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
            data-testid="button-random-mechanical"
          >
            <Shuffle className="h-4 w-4" />
            Random test
          </button>

          <div className="grid gap-3 lg:grid-cols-2">
            {mechanicalTests.map((test) => {
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
                          <Trophy className="h-3 w-3" /> Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round(test.timeLimitSeconds / 60)} min</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />Nguồn: {test.sourceOrganization} · official answer key</span>
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

          {mechanicalAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {mechanicalAttempts.slice(0, 8).map((row) => (
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

  /* ------------------------------------------------ critical thinking home */

  if (view === 'family' && category === 'critical') {
    const criticalAttempts = attempts.filter((row) => row.test_type === 'critical');
    const startRandom = () => {
      if (criticalTests.length) startTest(criticalTests[Math.floor(Math.random() * criticalTests.length)]);
    };

    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Critical Thinking</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              An assumption is something taken for granted. Each question gives you a short statement and a proposed
              assumption: choose Assumption Made if the statement takes it for granted, or Assumption Not Made if it
              does not. Judge every assumption on its own and use only the statement. The eight AssessmentDay
              Assumptions tests (Tests 1, 2, 3, 5, 6, 7, 8 and 9) have 12 questions and a 12-minute limit, with the official
              explanations in the review.
            </p>
          </header>

          <button
            onClick={startRandom}
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
            data-testid="button-random-critical"
          >
            <Shuffle className="h-4 w-4" />
            Random test
          </button>

          <div className="grid gap-3 lg:grid-cols-2">
            {criticalTests.map((test) => {
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
                          <Trophy className="h-3 w-3" /> Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round(test.timeLimitSeconds / 60)} min</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />Nguồn: {test.sourceOrganization} · official answer key</span>
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

          {criticalAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {criticalAttempts.slice(0, 8).map((row) => (
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

  /* ---------------------------------------------------- logical home */

  if (view === 'family' && category === 'logical') {
    const logicalAttempts = attempts.filter((row) => row.test_type === 'logical');
    const startRandom = () => {
      if (logicalTests.length) startTest(logicalTests[Math.floor(Math.random() * logicalTests.length)]);
    };
    const timeLabel = (seconds: number) =>
      seconds % 60 === 0 ? `${seconds / 60} min` : `${Math.floor(seconds / 60)} min ${seconds % 60} s`;

    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button
            onClick={openCategoryList}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            All test types
          </button>

          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Logical Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Each question shows a grid of symbols with one cell missing (or a pattern with a missing section) and a panel of
              lettered answer cells. Work out the rules that run across the rows and down the columns, then choose the cell
              that fits. The fifteen AssessmentDay tests use the original booklet pictures, so an internet connection is needed;
              the review shows the Solutions picture with the correct cell outlined, and the rules explained.
            </p>
          </header>

          <button
            onClick={startRandom}
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
            data-testid="button-random-logical"
          >
            <Shuffle className="h-4 w-4" />
            Random test
          </button>

          <div className="space-y-3">
            {logicalTests.map((test) => {
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
                          <Trophy className="h-3 w-3" /> Best {best.score}/{best.total}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{timeLabel(test.timeLimitSeconds)} ({test.secondsPerQuestion} s per question)</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{DIFFICULTY_LABEL[test.difficulty]} · Nguồn: {test.sourceOrganization}</span>
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

          {logicalAttempts.length > 0 ? (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
              <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
                {logicalAttempts.slice(0, 8).map((row) => (
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
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
              Each question gives you a realistic workplace situation and four or five possible responses. The five
              AssessmentDay tests mix four formats: pick the response you would be most and least likely to make,
              rank four responses from most to least effective, pick the most and least effective response, and
              rate five responses from Very Effective to Counterproductive using each rating once. The 30 original
              Casemate tests use the five-rating format only. All tests are untimed, and partial credit rewards
              answers that are close to the model answer.
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
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />Untimed</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{test.id.startsWith('ad-sjt-') ? '4 formats' : '5 forced ratings'}</span>
                      {test.id.startsWith('ad-sjt-') ? (
                        <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />Nguồn: AssessmentDay · official answer key</span>
                      ) : null}
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
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
              Start with the 5 AssessmentDay Error Checking tests (20 questions at 20 seconds a question, four
              sections of original booklet data, official answers). Then the 30 original tests: each question shows an original data table and a hand-copied version &mdash; security codes, phone
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
    const sourceOptions = Array.from(new Set(numericalTests.map((test) => test.sourceOrganization)));
    const visibleNumericalTests = sourceFilter === 'all'
      ? numericalTests
      : numericalTests.filter((test) => test.sourceOrganization === sourceFilter);
    const startRandom = () => {
      if (visibleNumericalTests.length) {
        startTest(visibleNumericalTests[Math.floor(Math.random() * visibleNumericalTests.length)]);
      }
    };
    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button onClick={openCategoryList} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
            <ChevronLeft className="h-4 w-4" /> All test types
          </button>
          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Numerical Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Practice with source-attributed tests that preserve the original wording, scenario order, timer
              and answer choices, with verified worked answers. Charts and tables are rebuilt from the source data for crisp reading on every screen.
            </p>
          </header>
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="text-xs font-bold text-[var(--space-text-primary)]">Lọc theo nguồn</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo nguồn">
              {['all', ...sourceOptions].map((source) => {
                const active = sourceFilter === source;
                const label = source === 'all' ? 'Tất cả nguồn' : source;
                return (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setSourceFilter(source)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${active ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]'}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <button onClick={startRandom} className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:ml-auto sm:w-auto" data-testid="button-random-numerical">
              <Shuffle className="h-4 w-4" /> Random test
            </button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {visibleNumericalTests.map((test) => {
              const best = bestFor(test.id);
              return (
                <div key={test.id} className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[var(--space-text-primary)] sm:text-base">{test.name}</h2>
                      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">Nguồn: {test.sourceOrganization}</span>
                      {best ? <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]"><Trophy className="h-3 w-3" /> Best {best.score}/{best.total}</span> : null}
                    </div>
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">{test.description}</p>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{test.timeLimitSeconds > 0 ? `${Math.round(test.timeLimitSeconds / 60)} min` : 'Untimed'}</span>
                      <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{test.subtitle}</span>
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
    const verbalSourceOf = (test: VerbalTest) => test.sourceOrganization || 'Casemate original';
    const verbalSourceOptions = Array.from(new Set(verbalTests.map(verbalSourceOf)));
    const visibleVerbalTests = verbalSourceFilter === 'all'
      ? verbalTests
      : verbalTests.filter((test) => verbalSourceOf(test) === verbalSourceFilter);
    const startRandom = () => {
      if (visibleVerbalTests.length) startTest(visibleVerbalTests[Math.floor(Math.random() * visibleVerbalTests.length)]);
    };
    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <button onClick={openCategoryList} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
            <ChevronLeft className="h-4 w-4" /> All test types
          </button>
          <header className="space-y-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--space-text-primary)] sm:text-xl">Verbal Reasoning</h1>
            <p className="max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">
              Practise the AssessmentDay verbal comprehension tests: read a short passage and pick the one correct
              answer from the options, using only what the passage says. The AssessmentDay Cut-e style tests give one long reading booklet and 38 True / False / Cannot Say statements in 18 minutes. The four AssessmentDay Syllogisms tests give two premises and five possible conclusions: pick the one that must be true, 20 questions at 10 seconds each. The four untimed AssessmentDay Capp tests have 15 sets each: match a response to message A or B by style, pick the right word for a gap, type the corrected spelling, rank responses from most to least positive, and judge True / False / Cannot Say. The 30 original Casemate tests use six
              business passages each, with five True / False / Cannot Say statements per passage, a 25-minute
              countdown and a 9 Easy / 12 Medium / 9 Hard profile.
            </p>
          </header>
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="text-xs font-bold text-[var(--space-text-primary)]">Lọc theo nguồn</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo nguồn">
              {['all', ...verbalSourceOptions].map((source) => {
                const active = verbalSourceFilter === source;
                return (
                  <button
                    key={source}
                    type="button"
                    onClick={() => setVerbalSourceFilter(source)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${active ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]'}`}
                    data-testid={`button-verbal-source-${source}`}
                  >
                    {source === 'all' ? 'Tất cả nguồn' : source}
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={startRandom} className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-[13px] font-semibold text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-card)] sm:w-auto sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm" data-testid="button-random-verbal">
            <Shuffle className="h-4 w-4" /> Random test
          </button>
          <div className="grid gap-3 lg:grid-cols-2">
            {visibleVerbalTests.map((test) => {
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
                      <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{test.timeLimitSeconds <= 0 ? 'Untimed' : test.timeLimitSeconds % 60 === 0 ? `${test.timeLimitSeconds / 60} min` : `${Math.floor(test.timeLimitSeconds / 60)} min ${test.timeLimitSeconds % 60} s`}</span>
                      {test.sourceOrganization ? (
                        <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />Nguồn: {test.sourceOrganization} · {test.answerKeySource === 'official' ? 'official answer key' : 'answer key derived from the passage'}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />9 Easy · 12 Medium · 9 Hard</span>
                      )}
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
        (activeQuestion.kind === 'situational' && !isCompleteSituationalAnswer(activeQuestion, answers[questionIndex]) ? 1 : 0),
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
    const isLogical = question.kind === 'logical';

    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <DiagramPatternDefs />
        <InductivePatternDefs />
        <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <div className="sticky top-0 z-20 flex items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 shadow-sm sm:static sm:px-4 sm:py-2.5 sm:shadow-none">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-[var(--space-text-primary)]">
                  Question {index + 1}/{activeTest.questions.length}
                </p>
                {mixedMode ? (
                  <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                    {CATEGORY_LABEL[questionFamily]}
                  </span>
                ) : null}
                {'sourceOrganization' in question ? (
                  <span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                    Nguồn: {String(question.sourceOrganization)}
                  </span>
                ) : null}
              </div>
              <p className="text-[11px] text-[var(--space-text-muted)]">
                {activeTest.name} · {answered}/{activeTest.questions.length} answered
              </p>
            </div>
            {untimed ? (
              <div className="inline-flex w-auto shrink-0 items-center justify-center gap-1 rounded-lg bg-[var(--space-surface-muted)] px-2.5 py-2 text-xs font-bold text-[var(--space-text-secondary)] sm:justify-start sm:gap-1.5 sm:py-1 sm:text-[13px]">
                <Clock className="h-4 w-4" /> Untimed
              </div>
            ) : (
              <div
                className={`inline-flex w-auto shrink-0 items-center justify-center gap-1 rounded-lg px-2.5 py-2 text-xs font-bold tabular-nums sm:justify-start sm:gap-1.5 sm:py-1 sm:text-[13px] ${
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
                {(question as SituationalQuestion).sectionTitle ? (
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">
                    {(question as SituationalQuestion).sectionTitle}
                  </p>
                ) : null}
                {(question as SituationalQuestion).scenario ? (
                  <div className="max-h-48 overflow-y-auto rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 pr-2">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Your role and the company</p>
                    <p className="whitespace-pre-line text-xs leading-6 text-[var(--space-text-secondary)] sm:text-sm">
                      {(question as SituationalQuestion).scenario}
                    </p>
                  </div>
                ) : null}
                <span className="inline-flex rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--space-text-brand)]">
                  {(question as SituationalQuestion).competency}
                </span>
                <p className="whitespace-pre-line text-sm leading-7 text-[var(--space-text-primary)] sm:text-base">
                  {question.prompt}
                </p>
                {(question as SituationalQuestion).instruction ? (
                  <p className="text-xs font-semibold leading-5 text-[var(--space-text-brand)]">
                    {(question as SituationalQuestion).instruction}
                  </p>
                ) : null}
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
            ) : isLogical ? (
              <>
                <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                <LogicalStimulus question={question as LogicalQuestion} />
                <p className="text-center text-[11px] text-[var(--space-text-muted)]">
                  The answer cells are lettered {(question as LogicalQuestion).optionLabels[0]}–{(question as LogicalQuestion).optionLabels[(question as LogicalQuestion).optionLabels.length - 1]} from left to right, row by row.
                </p>
              </>
            ) : isNumerical ? (
              <>
                <NumericalSourceContext question={question as NumericalQuestion} />
                {(question as NumericalQuestion).figure ? <SpatialPdfFigure key={`${question.id}-figure`} source={(question as NumericalQuestion).figure!} rotatable={isMechanicalQuestion(question)} /> : null}
                {(question as NumericalQuestion).figures?.length ? <NumericalReadingFigures figures={(question as NumericalQuestion).figures!} /> : null}
                {(question as NumericalQuestion).table ? <NumericalTable table={(question as NumericalQuestion).table!} /> : null}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Question</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{question.prompt}</p>
                </div>
              </>
            ) : isVerbal ? (
              <>
                <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{(question as VerbalQuestion).passageLabel || 'Passage'}</p>
                  <p className={`mt-2 whitespace-pre-line text-sm leading-7 text-[var(--space-text-primary)] ${(question as VerbalQuestion).passage.length > 2500 ? 'max-h-80 overflow-y-auto pr-2' : ''}`}>{(question as VerbalQuestion).passage}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{(question as VerbalQuestion).promptLabel || ((question as VerbalQuestion).optionTexts ? 'Question' : 'Statement')}</p>
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
                {isSituational ? situationalHeading(question as SituationalQuestion) : numericalAnswerHeading(question)}
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
                  reveal={helpStage === 2}
                />
              ) : isDeductive ? (
                <DeductiveOptionGrid
                  question={question as DeductiveExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              ) : isLogical ? (
                <LogicalOptionGrid
                  question={question as LogicalQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              ) : isNumerical ? (
                <NumericalOptionGrid
                  question={question as NumericalQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              ) : isVerbal ? (
                <VerbalOptionGrid
                  question={question as VerbalQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              ) : isSpatial ? (
                <SpatialOptionGrid
                  question={question as SpatialExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              ) : isInductive ? (
                <InductiveOptionGrid
                  question={question as InductiveExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              ) : (
                <OptionGrid
                  question={question as ExpandedQuestion}
                  selected={answers[index]}
                  onSelect={chooseAnswer}
                  reveal={helpStage === 2}
                />
              )}
            </div>

            <div className="space-y-2 border-t border-[var(--space-border-default)] pt-4">
              <button
                type="button"
                onClick={() => setHelpStage((stage) => (stage === 0 ? 1 : 2))}
                disabled={helpStage === 2}
                className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2 text-sm font-semibold text-[var(--space-text-secondary)] transition hover:border-[var(--space-brand-primary)] hover:bg-[var(--space-surface-accent-soft)] hover:text-[var(--space-text-brand)] disabled:cursor-default disabled:opacity-70 sm:min-h-10 sm:w-auto sm:rounded-lg sm:text-xs"
                data-testid="button-question-help"
              >
                <Lightbulb className="h-4 w-4" />
                {helpStage === 0 ? 'Show hint' : helpStage === 1 ? 'Show answer' : 'Answer revealed'}
              </button>

              {helpStage > 0 ? (
                <div
                  className={`rounded-lg border p-3 ${
                    helpStage === 1
                      ? 'border-[color-mix(in_srgb,var(--space-brand-primary)_35%,transparent)] bg-[var(--space-surface-accent-soft)]'
                      : 'border-[color-mix(in_srgb,var(--space-semantic-success)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success)_8%,var(--space-surface-card))]'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-xs font-bold text-[var(--space-text-primary)]">
                    {helpStage === 1 ? 'Hint' : 'Answer and explanation'}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                    {helpStage === 1 ? question.hint : question.explanation}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="sticky bottom-0 z-20 -mx-3 grid grid-cols-2 gap-2 border-t border-[var(--space-border-default)] bg-[color-mix(in_srgb,var(--space-surface-card)_94%,transparent)] px-3 py-3 shadow-[0_-6px_18px_color-mix(in_srgb,var(--space-shell-shadow)_18%,transparent)] backdrop-blur sm:static sm:mx-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-none">
            <button
              onClick={() => goToQuestion(index - 1)}
              disabled={index === 0}
              className="inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-sm font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            {index < activeTest.questions.length - 1 ? (
              <button
                onClick={() => goToQuestion(index + 1)}
                className={`inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-bold sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-4 ${tw.button.primary}`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => void finishTest(activeTest, answers, false, startedAt)}
                disabled={incompleteSituational > 0}
                title={incompleteSituational > 0 ? 'Answer every Situational Judgement question completely before submitting.' : undefined}
                className={`inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-4 ${tw.button.primary}`}
                data-testid="button-submit-test"
              >
                <CheckCircle2 className="h-4 w-4" />
                Submit test
              </button>
            )}
          </div>

          {index === activeTest.questions.length - 1 && incompleteSituational > 0 ? (
            <p className="rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs leading-5 text-[var(--space-text-brand)]">
              {incompleteSituational} Situational Judgement question{incompleteSituational === 1 ? '' : 's'} still need a complete answer. Use the numbered buttons to return to them before submitting.
            </p>
          ) : null}

          <div>
            <p className="mb-2 text-xs font-semibold text-[var(--space-text-muted)] sm:hidden">Jump to a question · swipe sideways</p>
            <div className="flex max-h-none flex-nowrap gap-2 overflow-x-auto overscroll-x-contain pb-2 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:content-start sm:gap-1.5 sm:overflow-visible sm:pb-0 sm:pr-0">
            {activeTest.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => goToQuestion(i)}
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
          </div>

          <button
            onClick={() => {
              submittingRef.current = true;
              if (mixedMode) {
                openCategoryList();
              } else {
                openCategoryList();
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
                  : category === 'logical'
                    ? 'Logical Reasoning'
                    : category === 'critical'
                      ? 'Critical Thinking'
                      : category === 'mechanical'
                        ? 'Mechanical Reasoning'
                        : 'Diagrammatic Reasoning';

    return (
      <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
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
                {breakdown.filter((item) => item.total > 0).map((item) => (
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
                onClick={() => startTest(test, undefined, true)}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`}
              >
                <Play className="h-4 w-4" />
                Retake this test
              </button>
              <button
                onClick={() => {
                  if (isMixedResult) {
                    openCategoryList();
                  } else {
                    openCategoryList();
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
            const right = questionCredit(question, chosen) === 1;
            const situationalScore = question.kind === 'situational'
              ? scoreSituationalAnswer(question, chosen)
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
                  {'sourceOrganization' in question ? (
                    <span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                      Nguồn: {String(question.sourceOrganization)}
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
                      Correct — you chose {displayAnswer(question, chosen)}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--space-semantic-danger)]">
                      <XCircle className="h-4 w-4" />
                      {chosen ? `Wrong — you chose ${displayAnswer(question, chosen)}` : 'Not answered'}, the correct answer is {displayCorrectAnswer(question)}
                    </span>
                  )}
                  <span className="ml-auto rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--space-text-muted)]">
                    {DIFFICULTY_LABEL[question.difficulty] || question.difficulty}
                  </span>
                </div>

                {question.kind === 'situational' ? (
                  <>
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3 sm:p-4">
                      <p className="whitespace-pre-line text-sm leading-6 text-[var(--space-text-primary)]">{question.prompt}</p>
                      <p className="mt-2 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {question.sectionTitle ? `${question.sectionTitle} · ` : ''}{question.competency}
                      </p>
                      {question.scenario ? (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-[11px] font-semibold text-[var(--space-text-secondary)]">Show your role and the company</summary>
                          <p className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--space-text-secondary)]">{question.scenario}</p>
                        </details>
                      ) : null}
                    </div>
                    <SituationalRatingReview question={question} value={chosen} />
                    <div className="rounded-lg bg-[var(--space-surface-accent-soft)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">{question.format ? 'Model answer' : 'Why the model order works'}</p>
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
                    <NumericalSourceContext question={question} />
                    {question.reviewShowsBoth && question.solutionFigure && question.figure ? <SpatialPdfFigure source={question.figure} maxWidth={460} rotatable={isMechanicalQuestion(question)} /> : null}
                    {question.solutionFigure || question.figure ? <SpatialPdfFigure source={(question.solutionFigure || question.figure)!} maxWidth={460} rotatable={isMechanicalQuestion(question)} /> : null}
                    {question.figures?.length ? <NumericalReadingFigures figures={question.figures} compact /> : null}
                    {question.table ? <NumericalTable table={question.table} compact /> : null}
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <NumericalOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-accent-soft)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Answer explanation</p>
                      <p className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'verbal' ? (
                  <>
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3 sm:p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{question.passageLabel || 'Passage'}</p>
                      <p className={`mt-2 whitespace-pre-line text-sm leading-6 text-[var(--space-text-primary)] ${question.passage.length > 2500 ? 'max-h-72 overflow-y-auto pr-2' : ''}`}>{question.passage}</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <VerbalOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-accent-soft)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Why</p>
                      <p className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Topic: {question.patternName}</p>
                    </div>
                  </>
                ) : question.kind === 'logical' ? (
                  <>
                    <p className="text-sm font-semibold text-[var(--space-text-primary)]">{question.prompt}</p>
                    <LogicalStimulus question={question} compact solution />
                    <LogicalOptionGrid question={question} selected={chosen} reveal />
                    <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">The logic</p>
                      <p className="mt-1 whitespace-pre-line text-xs leading-5 text-[var(--space-text-secondary)]">{question.explanation}</p>
                      <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Pattern: {question.patternName}</p>
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

export default function AptitudeTest({ demo = false }: { demo?: boolean }) {
  const mobileStyles = <style>{`
    @media (max-width: 639px) {
      .aptitude-mobile { font-size: 16px; }
      .aptitude-mobile [role="radiogroup"] {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) !important;
        width: 100% !important;
      }
      .aptitude-mobile [role="radio"] {
        min-height: 52px !important;
        width: 100% !important;
        font-size: 16px !important;
      }
      .aptitude-mobile [role="radio"] span { font-size: 16px; line-height: 1.5; }
      .aptitude-mobile button { touch-action: manipulation; }
      .aptitude-mobile p.text-sm { font-size: 16px; line-height: 1.65; }
    }
  `}</style>;

  if (demo === true) return <>{mobileStyles}<AptitudeTestInner /></>;

  return (
    <>
      {mobileStyles}
      <PaywallGate appId="aptitude-test" appName="Aptitude Test">
        <AptitudeTestInner />
      </PaywallGate>
    </>
  );
}
