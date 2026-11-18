import logicalData from '../data/assessmentday-logical-reasoning.json';
import panelData from '../data/assessmentday-logical-panels.json';
import logicalDataMore from '../data/assessmentday-logical-reasoning-2.json';
import panelDataMore from '../data/assessmentday-logical-panels-2.json';
import logicalDataExtra from '../data/assessmentday-logical-reasoning-3.json';
import panelDataExtra from '../data/assessmentday-logical-panels-3.json';
import type { SpatialPdfSource } from './assessmentDaySpatialTests';
import { generateLogicalGridTest } from './diagrammaticLibrary';
import type { LibraryDifficulty } from './diagrammaticLibrary';

// Casemate — Logical Reasoning (AssessmentDay Tests 1 to 15).
//
// Each question is a grid of symbols (or a pattern) with one cell missing, and
// a panel of 12 (or 9) numbered answer cells. The pictures are the original
// booklet artwork, drawn at runtime from the Questions booklet PDF and, in the
// review, from the Solutions booklet page where the correct cell is outlined in
// blue. The answer is read from that blue outline; the rules are quoted from
// the Solutions booklet text.

export type LogicalDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export interface LogicalPanel {
  /** Answer panel in Questions-booklet PDF points: [x0, y0, x1, y1]. */
  box: [number, number, number, number];
  /** Left edge of each answer column, when the cells are not evenly spaced. */
  columnStarts?: number[];
}

export interface LogicalQuestion {
  kind: 'logical';
  id: string;
  difficulty: LogicalDifficulty;
  prompt: string;
  options: string[];
  optionLabels: string[];
  correctAnswer: string;
  explanation: string;
  patternName: string;
  sourceOrganization: string;
  sourceQuestionNumber: number;
  answerKeySource: 'official';
  columns: number;
  rows: number;
  pdfSource: SpatialPdfSource;
  solutionSource: SpatialPdfSource;
  panel: LogicalPanel;
  rules: string[];
}

export interface LogicalTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: LogicalDifficulty;
  timeLimitSeconds: number;
  questions: LogicalQuestion[];
  sourceOrganization: string;
  secondsPerQuestion: number;
}

type Box = [number, number, number, number];
type RawRow = [number, Box, number, Box, number, string[]];

interface RawTest {
  n: number;
  diff: 'easy' | 'medium' | 'hard';
  sec: number;
  cols: number;
  rows: number;
  q: string;
  s: string;
  qs: RawRow[];
}

const SOURCE = 'AssessmentDay';
const LETTERS = 'ABCDEFGHIJKL'.split('');
const HINT =
  'Read the grid in both directions: each symbol usually changes by a fixed step from left to right and a different step from top to bottom (and the pattern continues onto the next row or column). Work out each rule, apply them to the empty cell, then find the lettered option that matches.';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function panelFor(testNumber: number, index: number): LogicalPanel {
  const panels = { ...(panelData as object), ...(panelDataMore as object), ...(panelDataExtra as object) } as unknown as Record<string, Array<Array<number | number[]>>>;
  const rows = panels[String(testNumber)] || [];
  const raw = rows[index];
  const box = (raw ? raw.slice(0, 4) : [0, 0, 1, 1]) as Box;
  const starts = raw && Array.isArray(raw[4]) ? (raw[4] as number[]) : undefined;
  return { box, columnStarts: starts };
}

function buildQuestion(test: RawTest, index: number, row: RawRow): LogicalQuestion {
  const [questionPage, questionBox, solutionPage, solutionBox, answerIndex, rules] = row;
  const count = test.cols * test.rows;
  const labels = LETTERS.slice(0, count);
  const letter = labels[answerIndex];
  const missingSection = test.cols * test.rows === 9;
  const written = rules.length
    ? `\n\n${rules.join('\n')}`
    : '\n\nThe AssessmentDay Solutions booklet shows only the highlighted answer for this test, with no written rule.';
  return {
    kind: 'logical',
    id: `lr-${pad2(test.n)}-q${pad2(index + 1)}`,
    difficulty: test.diff,
    prompt: missingSection ? 'What replaces the missing section?' : 'What replaces the question mark?',
    options: labels.slice(),
    optionLabels: labels.slice(),
    correctAnswer: letter,
    explanation: `Correct answer: ${letter}. It is the answer cell outlined in blue in the Solutions picture above (cells are lettered ${labels[0]}\u2013${labels[labels.length - 1]} from left to right, row by row).${written}`,
    patternName: `${SOURCE} Logical Reasoning Test ${test.n} - question ${index + 1}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: index + 1,
    answerKeySource: 'official',
    columns: test.cols,
    rows: test.rows,
    pdfSource: { url: test.q, page: questionPage, box: questionBox },
    solutionSource: { url: test.s, page: solutionPage, box: solutionBox },
    panel: panelFor(test.n, index),
    rules,
    hint: HINT,
  } as LogicalQuestion;
}

function buildTest(raw: RawTest): LogicalTest {
  const count = raw.qs.length;
  const options = raw.cols * raw.rows;
  const missingSectionTest = options === 9;
  const what = missingSectionTest
    ? `A pattern with one section missing: choose which of the ${options} options fits.`
    : `A grid of symbols with one cell missing: choose which of the ${options} options fits.`;
  return {
    id: `lr-${pad2(raw.n)}`,
    name: `${SOURCE} Logical Reasoning Test ${raw.n}`,
    subtitle: `AD-LR-${pad2(raw.n)} \u00b7 ${count} questions`,
    description: `${what} ${raw.sec} seconds per question. Original booklet pictures with the official AssessmentDay answers${missingSectionTest ? '' : ' and the rules behind each one'}.`,
    difficulty: raw.diff,
    timeLimitSeconds: raw.sec * count,
    questions: raw.qs.map((row, index) => buildQuestion(raw, index, row)),
    sourceOrganization: SOURCE,
    secondsPerQuestion: raw.sec,
  };
}

const GENERATED_GRID_TESTS = 35;

/**
 * 35 original practice tests: 20 grid / sequence questions each (one cell or the
 * next figure missing, five options), built by the same validated matrix engine
 * as the Diagrammatic library but from separate seeds, so every answer is
 * computed from the rules the figures follow. 60 seconds a question.
 */
function buildGeneratedGridTests(): LogicalTest[] {
  const tiers: LibraryDifficulty[] = ['easy', 'medium', 'hard'];
  return Array.from({ length: GENERATED_GRID_TESTS }, (_, i) => {
    const tier = tiers[i % 3];
    const base = generateLogicalGridTest(tier, Math.floor(i / 3) + 1);
    const questions = base.questions.slice(0, 20);
    return {
      ...base,
      id: `lg-${pad2(i + 1)}`,
      name: `Logical Reasoning Practice Test ${i + 1}`,
      subtitle: `LR-${pad2(i + 1)} \u00b7 ${questions.length} questions`,
      description: `Original ${tier} practice set: work out the rules that run across each grid or sequence of symbols, then choose the figure that completes it. Two or three rules at a time, 60 seconds a question, with the rules written out afterwards.`,
      questions,
      timeLimitSeconds: questions.length * 60,
      sourceOrganization: 'Casemate original',
      secondsPerQuestion: 60,
    } as unknown as LogicalTest;
  });
}

let cache: LogicalTest[] | null = null;

export function loadLogicalReasoningLibrary(): LogicalTest[] {
  if (!cache) {
    const assessmentDay = [
      ...(logicalData as unknown as { tests: RawTest[] }).tests,
      ...(logicalDataMore as unknown as { tests: RawTest[] }).tests,
      ...(logicalDataExtra as unknown as { tests: RawTest[] }).tests,
    ]
      .slice()
      .sort((a, b) => a.n - b.n)
      .map(buildTest);
    cache = [...assessmentDay, ...buildGeneratedGridTests()];
  }
  return cache;
}
