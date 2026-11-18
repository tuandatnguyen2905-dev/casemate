import ec1 from '../data/assessmentday-error-checking-1.json';
import ec2 from '../data/assessmentday-error-checking-2.json';
import ec3 from '../data/assessmentday-error-checking-3.json';
import ec4 from '../data/assessmentday-error-checking-4.json';
import ec5 from '../data/assessmentday-error-checking-5.json';
import type { NumericalQuestion, NumericalTest } from './numericalReasoning';

// AssessmentDay Error Checking Tests 1-5: 20 questions each at 20 seconds a
// question (6 min 40 s). Each test has four sections of five questions; every
// section shows one exhibit (a table of security codes, a set of address cards,
// original and altered data, or business cards) and asks for the correct version of
// a value, which combinations appear (or do not appear) in the data, or how many
// errors there are. The exhibits are the original booklet artwork, drawn at runtime
// from the Questions booklet PDF. In review the matching block of the Solutions
// booklet page is shown as well, with the errors in the wrong options printed in red.

type Box = [number, number, number, number];
interface RawTest {
  s: Record<string, [number, number, number, number, number]>; // section -> [page, x0, y0, x1, y1]
  q: Array<[string, string, string[], string, number, number, number]>; // [answer, prompt, options, note, solutions page, crop top, crop bottom]
}

const SOURCE = 'AssessmentDay';
const SECONDS_PER_QUESTION = 20;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const BOOKLETS: Record<number, { questions: string; solutions: string }> = {
  1: { questions: 'af19acb7-97cb-49b6-bf98-7381ad7d56c3', solutions: 'c431758a-b522-45b3-ac27-29d8ef8c213d' },
  2: { questions: 'f5e8702d-88b9-44c9-982d-1e7b05b063fe', solutions: 'b5a847bb-244e-4f8f-95a9-361a50341152' },
  3: { questions: '8af9a841-6da6-4795-8a22-69c2775ca8d3', solutions: '28229931-dbcc-4dca-b44d-5f6adf3c4810' },
  4: { questions: 'b841931b-329b-4af7-9f43-279f93e96082', solutions: '45c8f407-cf83-4a17-96ac-ec2771134c19' },
  5: { questions: 'f3857560-1a46-4ecc-85e2-319cb70e7a25', solutions: '36a54dbd-298f-4a9b-8bff-49e3dfc84504' },
};
const LABELS = ['A', 'B', 'C', 'D', 'E'];
const SECTIONS = ['A', 'B', 'C', 'D'];
const HINT =
  'Compare each option with the exhibit one character at a time: digits and letters in the right order, upper and lower case, spacing and punctuation. The data can be case sensitive. If the correct version is not among the options the answer is "None of the above", and if the question asks which option does not appear, look for the only option that contains an error.';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildTest(testNumber: number, raw: RawTest): NumericalTest {
  const booklet = BOOKLETS[testNumber];
  const questionUrl = `${BASE_URL}${booklet.questions}.pdf`;
  const solutionUrl = `${BASE_URL}${booklet.solutions}.pdf`;
  const questions = raw.q.map(([answer, prompt, options, note, solutionPage, top, bottom], index): NumericalQuestion => {
    const [page, x0, y0, x1, y1] = raw.s[SECTIONS[Math.floor(index / 5)]];
    const answerText = options[LABELS.indexOf(answer)];
    return {
      kind: 'numerical',
      id: `adec-${testNumber}-q${pad2(index + 1)}`,
      difficulty: 'mixed',
      sourceOrganization: SOURCE,
      figure: { url: questionUrl, page, box: [x0, y0, x1, y1] as Box },
      solutionFigure: { url: solutionUrl, page: solutionPage, box: [55, top, 535, bottom] as Box },
      reviewShowsBoth: true,
      prompt,
      options,
      optionLabels: LABELS.slice(0, options.length),
      correctAnswer: answer,
      explanation: `Correct answer: ${answer} (${answerText}).\n\nAssessmentDay note: ${note}`,
      patternName: `${SOURCE} Error Checking Test ${testNumber} - section ${SECTIONS[Math.floor(index / 5)]}, question ${index + 1}`,
      hint: HINT,
    } as NumericalQuestion;
  });
  return {
    id: `adec-${testNumber}`,
    name: `${SOURCE} Error Checking Test ${testNumber}`,
    subtitle: `AD-EC-${pad2(testNumber)} \u00b7 ${questions.length} questions`,
    description: `Four sections of five questions at 20 seconds a question (${Math.floor((questions.length * SECONDS_PER_QUESTION) / 60)} min ${(questions.length * SECONDS_PER_QUESTION) % 60} s): find the correct version of a value, the combinations that do or do not appear in the data, or the number of errors. Original booklet exhibits (so an internet connection is needed) and the official answers, with the Solutions booklet page showing the errors in red.`,
    difficulty: 'mixed',
    timeLimitSeconds: questions.length * SECONDS_PER_QUESTION,
    sourceOrganization: SOURCE,
    instructions: `This error checking test has ${questions.length} questions in four sections and allows 20 seconds a question. Each section gives you a set of data (numbers, letters or both, possibly case sensitive) and asks you to pick the correct version, or the item that differs, from five options. Work quickly and accurately; unanswered questions count as incorrect.`,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadAssessmentDayErrorCheckingTests(): NumericalTest[] {
  if (!cache) {
    const raws = [ec1, ec2, ec3, ec4, ec5] as unknown as RawTest[];
    cache = raws.map((raw, index) => buildTest(index + 1, raw));
  }
  return cache;
}
