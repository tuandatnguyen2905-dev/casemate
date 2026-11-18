import process1 from '../data/assessmentday-diagrammatic-process-1.json';
import process2 from '../data/assessmentday-diagrammatic-process-2.json';
import type { ExpandedTest } from './diagrammatic';
import type { NumericalQuestion } from './numericalReasoning';

// AssessmentDay Diagrammatic Reasoning Tests 1 and 2: 30 questions each, 25
// minutes. Every question is a process (an input diagram, one to three operators and
// an output diagram) with the key of operator effects printed above it, and four
// pictures A-D to choose from. The artwork is the original booklet page, drawn at
// runtime from the Questions booklet PDF and cropped to the key, the process and the
// four options. The answers and the written explanations come from the Solutions
// booklet. The questions reuse the picture question model, with the options drawn
// as a row of compact letter buttons because the options are inside the picture.

type Row = [string, string, string, number, number]; // [answer, question, explanation, crop top, crop bottom]

const SOURCE = 'AssessmentDay';
const TIME_LIMIT_SECONDS = 25 * 60;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const QUESTION_BOOKLETS: Record<number, string> = {
  1: 'd935a749-3f80-4148-87e5-52b49197274b',
  2: 'caf1f6fe-7443-4cd3-a098-a56c78d52736',
};
const LABELS = ['A', 'B', 'C', 'D'];
const HINT =
  'Read the key first: each operator has one effect (change shading, rotate, mirror, swap, replace or resize items). Work through the process one operator at a time, from the input diagram forwards or from the output diagram backwards, and remember that an operator does nothing to an item it does not apply to. Then find the one option that fits every step.';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildTest(testNumber: number, rows: Row[]): ExpandedTest {
  const url = `${BASE_URL}${QUESTION_BOOKLETS[testNumber]}.pdf`;
  const questions = rows.map(([answer, prompt, explanation, top, bottom], index) => ({
    kind: 'numerical',
    id: `dra-${pad2(testNumber)}-q${pad2(index + 1)}`,
    difficulty: 'mixed',
    sourceOrganization: SOURCE,
    figure: { url, page: index + 2, box: [60, top, 530, bottom] },
    compactOptions: true,
    prompt,
    options: LABELS.map((label) => `Picture ${label}`),
    optionLabels: LABELS.slice(),
    correctAnswer: answer,
    explanation: `Correct answer: ${answer}.\n\nAssessmentDay solution: ${explanation}`,
    patternName: `${SOURCE} Diagrammatic Test ${testNumber} - question ${index + 1}`,
    hint: HINT,
  } as NumericalQuestion));
  return {
    id: `dra-${pad2(testNumber)}`,
    name: `${SOURCE} Diagrammatic Test ${testNumber}`,
    format: 'process_operators',
    subtitle: `AD-DR-${pad2(testNumber)} \u00b7 Operators`,
    description: 'Study the key of operators, follow the process from the input diagram to the output diagram, and choose the picture, operator or diagram that fits. 30 questions in 25 minutes, with the original booklet artwork and the official AssessmentDay answers and explanations. An internet connection is needed for the pictures.',
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    instructions: 'This diagrammatic reasoning test has 30 questions and a 25-minute limit. Each question contains a process with an input diagram, one or more operators and an output diagram; the effect of each operator is described in the key above it. Study the process and choose the option that best answers the question. Work quickly and accurately; unanswered questions count as incorrect.',
    questions,
  } as unknown as ExpandedTest;
}

let cache: ExpandedTest[] | null = null;

export function loadAssessmentDayDiagrammaticProcessTests(): ExpandedTest[] {
  if (!cache) {
    cache = [buildTest(1, process1 as unknown as Row[]), buildTest(2, process2 as unknown as Row[])];
  }
  return cache;
}
