import rawSets from '../data/assessmentday-inductive-logic.json';
import type { NumericalQuestion, NumericalTest } from './numericalReasoning';

// AssessmentDay Inductive Logic Tests 1-4: 12 question sets each, 4 questions per
// set (48 per test), 12 minutes. Every set shows six diamond figures already filed
// under Set A or Set B (the colour of the figure's extremities) and four new
// figures; the candidate finds the rule behind each set and assigns each new
// figure. The figures are the original booklet artwork, drawn at runtime from the
// Questions and Answers booklet PDF and cropped to the figure panel: the question
// page is shown while sitting the test, and the answers page (with the four new
// figures coloured in) is shown in review. The answer key and the two rules per
// set come from the same booklet.

type SetRow = [string, string, string]; // [answers for figures 1-4, Set A rule, Set B rule]

const SOURCE = 'AssessmentDay';
const TIME_LIMIT_SECONDS = 12 * 60;
const SETS_PER_TEST = 12;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const BOOKLETS: Record<number, string> = {
  1: 'f81f84d8-a893-45b1-97f6-7e85a40acf43',
  2: 'e0869cfa-549d-48c7-94db-613b27c78168',
  3: 'dc30c1f7-12b1-4d4d-87c4-eae1b97b714f',
  4: '8444a9d0-a39c-4104-b80e-a31f7e16d8a0',
};
const FIGURE_BOX: [number, number, number, number] = [70, 50, 530, 428];
const HINT =
  'Compare the three Set A figures with the three Set B figures. Look at the letters and numbers inside each diamond: which characters appear, how many different ones there are, which are repeated or grouped together, which positions (corners, edges, centre) they sit in, whether the numbers are odd or even, and how the top half adds up against the bottom half. Find what every Set A figure shares that no Set B figure has, then test the new figure against it.';
// Booklet note on Test 3, set 8, figure 4: it also lists the Set B rule, but the key is Set A.
const NOTED_KEYS = new Set(['3:8:4']);

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(testNumber: number, setIndex: number, figureIndex: number, row: SetRow): NumericalQuestion {
  const [answers, ruleA, ruleB] = row;
  const letter = answers[figureIndex];
  const other = letter === 'A' ? 'B' : 'A';
  const url = `${BASE_URL}${BOOKLETS[testNumber]}.pdf`;
  const questionPage = 2 * (setIndex + 1);
  const note = NOTED_KEYS.has(`${testNumber}:${setIndex + 1}:${figureIndex + 1}`)
    ? ' The booklet adds that this figure could also be read against the Set B rule, but its answer key is Set A.'
    : '';
  const number = setIndex * 4 + figureIndex + 1;
  return {
    kind: 'numerical',
    id: `ild-${testNumber}-q${pad2(number)}`,
    difficulty: 'mixed',
    sourceOrganization: SOURCE,
    sectionTitle: `Question set ${setIndex + 1} of ${SETS_PER_TEST}`,
    figure: { url, page: questionPage, box: FIGURE_BOX },
    solutionFigure: { url, page: questionPage + 1, box: FIGURE_BOX },
    prompt: `Set ${setIndex + 1}, Figure ${figureIndex + 1}: which set does Figure ${figureIndex + 1} belong to?`,
    options: ['Set A', 'Set B'],
    optionLabels: ['A', 'B'],
    correctAnswer: letter,
    explanation: `Correct answer: Set ${letter}.${note}\n\nSet ${letter} rule: ${letter === 'A' ? ruleA : ruleB}.\nSet ${other} rule: ${letter === 'A' ? ruleB : ruleA}.\n\nThe review picture shows the four new figures filed under their sets (orange extremities for Set A, blue for Set B).`,
    patternName: `${SOURCE} Inductive Logic Test ${testNumber} - set ${setIndex + 1}, figure ${figureIndex + 1}`,
    hint: HINT,
  } as NumericalQuestion;
}

function buildTest(testNumber: number, rows: SetRow[]): NumericalTest {
  const questions = rows.flatMap((row, setIndex) => [0, 1, 2, 3].map((figureIndex) => buildQuestion(testNumber, setIndex, figureIndex, row)));
  return {
    id: `ild-${testNumber}`,
    name: `${SOURCE} Inductive Logic Test ${testNumber}`,
    subtitle: `AD-IL-${pad2(testNumber)} \u00b7 Set A or Set B`,
    description: 'Twelve question sets of four figures: study the six diamonds already filed under Set A and Set B, find the rule behind each set, then assign the four new figures. Official AssessmentDay answers with both rules written out for every set. The figures are the original booklet artwork, so an internet connection is needed.',
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    instructions: `This inductive logic test has ${SETS_PER_TEST} question sets of 4 questions (${questions.length} in all) and a 12-minute limit. Each set shows ten diamond figures with nine letters and/or numbers in each; six are already assigned to Set A or Set B (the colour of the extremities). Find the rules that decide each set, then assign the four remaining figures. Work quickly and accurately; unanswered questions count as incorrect.`,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadAssessmentDayInductiveLogicTests(): NumericalTest[] {
  if (!cache) {
    const data = rawSets as unknown as Record<string, SetRow[]>;
    cache = [1, 2, 3, 4].map((n) => buildTest(n, data[String(n)]));
  }
  return cache;
}
