import diagrammaticData from '../data/assessmentday-diagrammatic-tests.json';
import type { ExpandedQuestion, ExpandedTest } from './diagrammatic';
import type { SpatialPdfSource } from './assessmentDaySpatialTests';

// AssessmentDay Diagrammatic Reasoning Tests 3-5: 30 Set A / Set B questions
// each, 25 minutes. The figures are the original booklet artwork, drawn at
// runtime from the Questions booklet PDF (one page per question, cropped to the
// Set A / Set B / Figure rows). The answer is the option printed in bold in the
// Solutions booklet; the three rule sentences are quoted from the same booklet.

type RawRow = [number, [number, number, number, number], 'A' | 'B' | 'C', string, string, string];

interface RawTest {
  n: number;
  url: string;
  qs: RawRow[];
}

const SOURCE = 'AssessmentDay';
const OPTIONS = ['Set A', 'Set B', 'Neither set A nor set B'];
const LABELS = ['A', 'B', 'C'];
const TIME_LIMIT_SECONDS = 25 * 60;
const HINT =
  'Work out what every figure in Set A has in common, then what every figure in Set B has in common. Test the Figure against both rules: if it satisfies only one it belongs to that set, and if it satisfies neither the answer is "Neither set".';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(test: RawTest, index: number, row: RawRow): ExpandedQuestion {
  const [page, box, answer, ruleA, ruleB, figure] = row;
  const answerText = OPTIONS[LABELS.indexOf(answer)];
  const pdfSource: SpatialPdfSource = { url: test.url, page, box };
  return {
    kind: 'set_ab',
    id: `dra-${pad2(test.n)}-q${pad2(index + 1)}`,
    difficulty: 'mixed',
    prompt: 'Which set does the Figure belong to?',
    setA: [],
    setB: [],
    figure: [],
    options: OPTIONS.slice(),
    optionLabels: LABELS.slice(),
    correctAnswer: answer,
    hint: HINT,
    explanation: `Set A: ${ruleA}\nSet B: ${ruleB}\nFigure: ${figure}`,
    answerSummary: `Correct answer: ${answer} \u2013 ${answerText}.`,
    source: `AssessmentDay Diagrammatic Test ${test.n}, question ${index + 1}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: index + 1,
    answerKeySource: 'official',
    pdfSource,
  } as unknown as ExpandedQuestion;
}

function buildTest(raw: RawTest): ExpandedTest {
  return {
    id: `dra-${pad2(raw.n)}`,
    name: `AssessmentDay Diagrammatic Test ${raw.n}`,
    format: 'set_ab',
    subtitle: `AD-DR-${pad2(raw.n)} \u00b7 Set A / Set B`,
    description: 'Two sets of figures follow their own hidden rules: decide whether the Figure belongs to Set A, Set B or neither. 30 questions in 25 minutes, with the original booklet artwork and the official AssessmentDay answers and rules.',
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    questions: raw.qs.map((row, index) => buildQuestion(raw, index, row)),
  } as unknown as ExpandedTest;
}

let cache: ExpandedTest[] | null = null;

export function loadAssessmentDayDiagrammaticTests(): ExpandedTest[] {
  if (!cache) {
    cache = (diagrammaticData as unknown as { tests: RawTest[] }).tests.map(buildTest);
  }
  return cache;
}
