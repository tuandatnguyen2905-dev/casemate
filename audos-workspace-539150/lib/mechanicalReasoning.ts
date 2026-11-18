import mech1 from '../data/assessmentday-mechanical-1.json';
import mech2 from '../data/assessmentday-mechanical-2.json';
import mech3 from '../data/assessmentday-mechanical-3.json';
import mech4 from '../data/assessmentday-mechanical-4.json';
import type { NumericalQuestion, NumericalTest } from './numericalReasoning';
import { loadGeneratedMechanicalTests } from './mechanicalGenerated';

// AssessmentDay Mechanical Reasoning Tests 1-4: 20 questions each in 12 minutes.
// Every question shows a picture (levers, pulleys, gears, fluids, forces) and has
// four or five lettered options. The pictures are the original booklet artwork,
// drawn at runtime from the page of the Solutions booklet PDF and cropped to the
// figure; the question text, options, answers and explanations come from the same
// booklet. The questions reuse the numerical question model, which already draws a
// cropped PDF figure above the question.

type Box = [number, number, number, number];
// [page, figure box in PDF points, question, options, correct option index, explanation]
type RawRow = [number, Box, string, string[], number, string];

interface RawMechanicalTest {
  n: number;
  qs: RawRow[];
}

const SOURCE = 'AssessmentDay';
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const TIME_LIMIT_SECONDS = 12 * 60;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const SOLUTION_BOOKLETS: Record<number, string> = {
  1: '3ca1acd1-87a2-40b0-885d-e5613d7499fd',
  2: '5c92a7c4-7b98-4ae5-984e-66be4772be58',
  3: 'a98fa6ea-ecce-4e1a-b98b-80956423aabb',
  4: '1c71ff06-2e6c-43a7-ab7b-5b509697b160',
};
const HINT =
  'Look at what changes between the scenarios in the picture, then decide what controls the outcome: the length of a lever arm, the number of pulleys, the number of teeth or the circumference of a gear, or where a force acts. Check each option against that one idea.';
// The Solutions booklet does not mark this answer; it is taken from the explanation.
const DERIVED_KEYS = new Set(['4:10']);

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(test: RawMechanicalTest, row: RawRow, index: number): NumericalQuestion {
  const [page, box, prompt, options, answerIndex, solution] = row;
  const labels = options.map((_, optionIndex) => LETTERS[optionIndex]);
  const letter = labels[answerIndex];
  const derived = DERIVED_KEYS.has(`${test.n}:${index + 1}`)
    ? ' The Solutions booklet does not mark an answer for this question; this one follows from its explanation.'
    : '';
  return {
    kind: 'numerical',
    id: `mr-${test.n}-q${pad2(index + 1)}`,
    difficulty: 'mixed',
    sourceOrganization: SOURCE,
    figure: { url: `${BASE_URL}${SOLUTION_BOOKLETS[test.n]}.pdf`, page, box },
    prompt,
    options,
    optionLabels: labels,
    correctAnswer: letter,
    explanation: `Correct answer: ${letter} (${options[answerIndex]}).${derived}\n\nAssessmentDay solution: ${solution}`,
    patternName: `${SOURCE} Mechanical Reasoning Test ${test.n} - question ${index + 1}`,
    hint: HINT,
  } as NumericalQuestion;
}

function buildTest(raw: RawMechanicalTest): NumericalTest {
  const questions = raw.qs.map((row, index) => buildQuestion(raw, row, index));
  return {
    id: `mr-${raw.n}`,
    name: `${SOURCE} Mechanical Reasoning Test ${raw.n}`,
    subtitle: `AD-MR-${pad2(raw.n)} \u00b7 ${questions.length} questions`,
    description: 'Look at the picture of a lever, pulley, gear or fluid system and choose the option that describes what happens. Official AssessmentDay answers with a worked explanation for every question. The pictures are the original booklet artwork, so an internet connection is needed.',
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    instructions: `This mechanical reasoning test has ${questions.length} questions and a 12-minute limit. Each question shows a picture; choose the one option that is correct. Work quickly and accurately, and if you do not know an answer, leave it and come back to it if you have time.`,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadMechanicalReasoningLibrary(): NumericalTest[] {
  if (!cache) {
    cache = [
      ...([mech1, mech2, mech3, mech4] as unknown as RawMechanicalTest[]).map(buildTest),
      ...loadGeneratedMechanicalTests(),
    ];
  }
  return cache;
}
