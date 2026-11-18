import rawTests from '../data/assessmentday-cute-numerical.json';
import type { NumericalFigureSource, NumericalQuestion, NumericalTest } from './numericalReasoning';

// AssessmentDay Cut-e Style Numerical Tests 1 and 2: one reading booklet of six
// numerical exhibits (tables, a bar chart, a line chart, pie charts) and a long run
// of True / False / Cannot Say statements judged from those exhibits only, in 18
// minutes. The exhibits are the original booklet artwork, drawn at runtime from the
// Reading Material booklet PDF and shown together above every statement; the
// statements, answers and worked solutions come from the Solutions booklet.

type Box = [number, number, number, number];
type Row = [string, 'T' | 'F' | 'C', string];

const SOURCE = 'AssessmentDay';
const TIME_LIMIT_SECONDS = 18 * 60;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const READING_BOOKLETS: Record<number, string> = {
  1: '15c55c99-dc44-4f7e-a8aa-7174130e0f92',
  2: '01177d47-b414-4503-873f-eeb4f72cceee',
};
// [page, crop box in PDF points] for the six exhibits of each reading booklet, in booklet order.
const EXHIBITS: Record<number, Array<[number, Box]>> = {
  1: [
    [2, [60, 78, 535, 362]],
    [2, [60, 405, 535, 695]],
    [3, [60, 50, 535, 345]],
    [3, [60, 380, 535, 690]],
    [4, [60, 40, 535, 377]],
    [4, [60, 377, 535, 665]],
  ],
  2: [
    [2, [60, 78, 535, 398]],
    [2, [60, 398, 535, 700]],
    [3, [60, 40, 535, 342]],
    [3, [60, 345, 535, 690]],
    [4, [60, 44, 535, 376]],
    [4, [60, 376, 535, 710]],
  ],
};
const OPTIONS = ['True', 'False', 'Cannot Say'];
const LETTER: Record<string, string> = { T: 'A', F: 'B', C: 'C' };
// The Solutions booklet for Test 2 stops at question 37; question 38 is keyed from its data.
const DERIVED_KEYS = new Set(['2:38']);
const HINT =
  'Find the exhibit each statement refers to, then check every figure and unit in it. Watch the currency (£, $, €, ¥) and the year. If the exhibits do not give the figure you would need, such as a breakdown by country or product, or a year that is not shown, the answer is Cannot Say.';
const INSTRUCTIONS =
  'This numerical test gives you six exhibits (tables and charts) in a scrollable panel above every statement, and 18 minutes in all. For each statement choose True (it follows from the data), False (the data contradict it) or Cannot Say (the data are not enough to tell). Work quickly and accurately; unanswered questions count as incorrect.';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildTest(testNumber: number, rows: Row[]): NumericalTest {
  const url = `${BASE_URL}${READING_BOOKLETS[testNumber]}.pdf`;
  const figures: NumericalFigureSource[] = EXHIBITS[testNumber].map(([page, box]) => ({ url, page, box }));
  const questions = rows.map(([statement, key, solution], index): NumericalQuestion => {
    const derived = DERIVED_KEYS.has(`${testNumber}:${index + 1}`)
      ? ' The Solutions booklet stops at question 37; this one is worked out from the exhibits.'
      : '';
    return {
      kind: 'numerical',
      id: `cute-numerical-${testNumber}-q${pad2(index + 1)}`,
      difficulty: 'mixed',
      sourceOrganization: SOURCE,
      sectionTitle: 'Reading exhibits',
      figures,
      prompt: statement,
      options: OPTIONS,
      optionLabels: ['A', 'B', 'C'],
      correctAnswer: LETTER[key],
      explanation: `Correct answer: ${OPTIONS['TFC'.indexOf(key)]}.${derived}\n\nAssessmentDay solution:\n${solution}`,
      patternName: `${SOURCE} Cut-e Style Numerical Test ${testNumber} - statement ${index + 1}`,
      hint: HINT,
    } as NumericalQuestion;
  });
  const extra = testNumber === 1 ? " (the booklet's instructions say 38, but it prints 37 statements)" : '';
  return {
    id: `cute-numerical-${testNumber}`,
    name: `${SOURCE} Cut-e Style Numerical Test ${testNumber}`,
    subtitle: `AD-CN-${pad2(testNumber)} \u00b7 True / False / Cannot Say`,
    description: `${questions.length} True / False / Cannot Say statements${extra} on six numerical exhibits, 18 minutes. Official AssessmentDay answers with the working for every statement. The exhibits are the original booklet artwork, so an internet connection is needed.`,
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    instructions: INSTRUCTIONS,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadAssessmentDayCuteNumericalTests(): NumericalTest[] {
  if (!cache) {
    const data = rawTests as unknown as Record<string, Row[]>;
    cache = [1, 2].map((n) => buildTest(n, data[String(n)]));
  }
  return cache;
}
