import rawTests from '../data/assessmentday-inductive-reasoning.json';
import rawTestsB from '../data/assessmentday-inductive-reasoning-b.json';
import rawTestsC from '../data/assessmentday-inductive-reasoning-c.json';
import type { NumericalQuestion, NumericalTest } from './numericalReasoning';

// AssessmentDay Inductive Reasoning booklets 1 to 12: a sequence of five
// figures and five lettered pictures (A-E) to choose the next figure from; 30
// questions each (22 in Test 10) in 25 minutes. The pictures are the original
// booklet artwork, drawn at runtime from the booklet PDFs and cropped to the figure
// panel: the Questions booklet page is shown while sitting the test and the
// Solutions booklet page (which outlines the correct picture in most booklets) is
// shown in review. The answer key and the rules come from the Solutions booklet.

// [answer, rules, question-page crop top, bottom, solutions-page crop top, bottom, question PDF page?, solutions PDF page?]
// The two page numbers are only given where a booklet does not run one page per question.
type Row = [string, string[], number, number, number, number, number?, number?];

const SOURCE = 'AssessmentDay';
const TIME_LIMIT_SECONDS = 25 * 60;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const BOOKLETS: Record<number, { questions: string; solutions: string }> = {
  1: { questions: 'c06e07f0-5030-4b88-9bb1-ef2d9384fcc6', solutions: 'ac6d777e-1bf0-462a-84f3-a6cf8e799b21' },
  2: { questions: 'b93bead1-0cb6-4b14-b40e-e4dd45ad31cf', solutions: 'eb25f2e6-5e3b-4baa-9b92-26f87149dc55' },
  6: { questions: '8a7893f1-4077-429c-99ce-0f50c94c1a88', solutions: '602bfa61-9163-47d1-94a9-e724ed32dacc' },
  7: { questions: '5af258e7-6595-445c-a48a-e21e04cabf1f', solutions: '0ebdac78-78f7-4bc4-8ad3-994a25247eac' },
  10: { questions: 'fe8fae51-d592-4fbb-a954-1906a4b6e1f7', solutions: '3812b67c-8cfa-4b20-9e0f-87403f7424f2' },
  3: { questions: '3dfb6698-1a10-4a81-af75-e21bada9d10f', solutions: '09fbd07b-cf8d-4a84-8577-67ea01501fea' },
  4: { questions: '961a0871-68c1-4287-8559-d953160d4ef7', solutions: '8871c36f-2897-4ba1-8367-24ab430ead6a' },
  5: { questions: 'a4bc84cd-e145-4125-847f-6336b0485e19', solutions: '079dbd9b-66ae-4253-b769-5939f437b657' },
  11: { questions: 'c19b31b8-a2e8-4b1f-a441-776d93922710', solutions: '7ea8fa29-6550-4f18-94cc-af1d082520e2' },
  12: { questions: '1cf8895e-eb8d-4f03-90b8-15259dadda48', solutions: 'ff4f612a-f200-4550-a87a-92694d5fe62c' },
  8: { questions: '3f406f93-f0ed-4995-8cd0-dcdf8f8f6134', solutions: '6b6eaffc-1e83-4dfa-bf4b-0d65eb7db391' },
  9: { questions: '21f0c10b-0fb8-4515-96db-4435018a85aa', solutions: '32bbe404-6592-4ba3-9827-7f401ba4f00e' },
};
const TEST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DIFFICULTY_RATING: Record<number, string> = { 10: 'Easy', 11: 'Medium', 12: 'Difficult' };
const PROMPTS: Record<number, string> = { 5: 'What replaces the question mark?' };
const LABELS = ['A', 'B', 'C', 'D', 'E'];
const RULE_WORDS = ['', 'One rule', 'Two rules', 'Three rules', 'Four rules'];
const HINT =
  'Look at how each part of the figure changes from one picture to the next, one feature at a time: position, rotation, shading, number of items, shape. Each change follows its own pattern, and every picture in the sequence obeys all of them at once. Apply each pattern to the last figure to build the next one, then find that picture among A to E.';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function ruleSummary(rules: string[]): string {
  return rules.map((rule, index) => `${rules.length > 1 ? `Rule ${index + 1}: ` : 'Rule: '}${rule}`).join('\n');
}

function buildTest(testNumber: number, rows: Row[]): NumericalTest {
  const booklet = BOOKLETS[testNumber];
  const questionUrl = `${BASE_URL}${booklet.questions}.pdf`;
  const solutionUrl = `${BASE_URL}${booklet.solutions}.pdf`;
  const questions = rows.map(([answer, rules, qTop, qBottom, sTop, sBottom, qPage, sPage], index): NumericalQuestion => ({
    kind: 'numerical',
    id: `adir-${testNumber}-q${pad2(index + 1)}`,
    difficulty: 'mixed',
    sourceOrganization: SOURCE,
    figure: { url: questionUrl, page: qPage ?? index + 2, box: [60, qTop, 535, qBottom] },
    solutionFigure: { url: solutionUrl, page: sPage ?? index + 2, box: [60, sTop, 535, sBottom] },
    compactOptions: true,
    prompt: PROMPTS[testNumber] || 'What comes next in the sequence?',
    options: LABELS.map((label) => `Picture ${label}`),
    optionLabels: LABELS.slice(),
    correctAnswer: answer,
    explanation: `Correct answer: ${answer}.\n\nAssessmentDay rules:\n${ruleSummary(rules)}`,
    patternName: `${SOURCE} Inductive Reasoning Test ${testNumber} - question ${index + 1} (${RULE_WORDS[Math.min(rules.length, 4)] || 'Rules'})`,
    hint: HINT,
  } as NumericalQuestion));
  const counts = rows.map((row) => row[1].length);
  const fewest = Math.min(...counts);
  const most = Math.max(...counts);
  const ruleText = fewest === most ? `${RULE_WORDS[most].toLowerCase()} per question` : `${fewest} to ${most} rules per question`;
  return {
    id: `adir-${testNumber}`,
    name: `${SOURCE} Inductive Reasoning Test ${testNumber}`,
    subtitle: `AD-IR-${pad2(testNumber)} \u00b7 ${DIFFICULTY_RATING[testNumber] || 'Original booklet'}`,
    description: `${questions.length} sequence questions (${ruleText}): study the five figures, then pick the picture A-E that ${testNumber === 5 ? 'replaces the question mark' : 'comes next'}. Official AssessmentDay answers with the rules written out. The pictures are the original booklet artwork, so an internet connection is needed.`,
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    instructions: `This inductive reasoning test has ${questions.length} questions and a 25-minute limit. Each question shows a logical sequence of five figures; choose the picture, A to E, that best matches the next figure in the sequence. Work quickly and accurately, and if you do not know an answer, leave it and come back to it if you have time.`,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadAssessmentDayInductiveReasoningTests(): NumericalTest[] {
  if (!cache) {
    const data = { ...(rawTests as unknown as Record<string, Row[]>), ...(rawTestsB as unknown as Record<string, Row[]>), ...(rawTestsC as unknown as Record<string, Row[]>) };
    cache = TEST_NUMBERS.map((n) => buildTest(n, data[String(n)]));
  }
  return cache;
}
