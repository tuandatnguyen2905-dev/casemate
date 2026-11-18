import dd1 from '../data/assessmentday-deductive-1.json';
import dd2 from '../data/assessmentday-deductive-2.json';
import dd3 from '../data/assessmentday-deductive-3.json';
import dd4 from '../data/assessmentday-deductive-4.json';
import type { NumericalQuestion, NumericalTest } from './numericalReasoning';

// AssessmentDay Deductive Reasoning Tests 1-4: 22 questions each in 25 minutes. Each
// question gives a set of premises (verbal, numerical, a table or abstract rules)
// and asks for a judgement: mostly True / False / Insufficient Information, with
// some multiple-choice questions (which plan, which flights, which statement must be
// false). The premises are the original booklet artwork, drawn at runtime from the
// Questions booklet PDF and cropped to the premises box or table; the question,
// the options, the answer and the written explanation come from the same
// booklets (the answer and explanation from the Solutions booklet).

// [answer letter, question, options, explanation, page, crop top, crop bottom, crop left, crop right]
type Row = [string, string, string[], string, number, number, number, number, number];

const SOURCE = 'AssessmentDay';
const TIME_LIMIT_SECONDS = 25 * 60;
const BASE_URL = 'https://storage.googleapis.com/audos-images/attachments/general/';
const QUESTION_BOOKLETS: Record<number, string> = {
  1: '4550ec95-3f62-4470-894b-96b1ff651a50',
  2: '497e1425-06cd-4242-a658-cd3906fc0996',
  3: '35e2e8c6-a057-4152-9f98-e46ac110f19c',
  4: '573d32e8-54b4-49bf-9f46-bc88ee8466d4',
};
const LABELS = ['A', 'B', 'C', 'D', 'E'];
const HINT =
  'Use only the information in the premises. Mark each fact you are given, work out what must follow from them, and check the statement against that. If the premises neither prove nor disprove the statement the answer is Insufficient Information; do not bring in outside knowledge.';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildTest(testNumber: number, rows: Row[]): NumericalTest {
  const url = `${BASE_URL}${QUESTION_BOOKLETS[testNumber]}.pdf`;
  const questions = rows.map(([answer, prompt, options, explanation, page, top, bottom, left, right], index): NumericalQuestion => ({
    kind: 'numerical',
    id: `add-${testNumber}-q${pad2(index + 1)}`,
    difficulty: 'mixed',
    sourceOrganization: SOURCE,
    figure: { url, page, box: [left, top, right, bottom] },
    prompt,
    options,
    optionLabels: LABELS.slice(0, options.length),
    correctAnswer: answer,
    explanation: `Correct answer: ${answer} (${options[LABELS.indexOf(answer)]}).\n\nAssessmentDay explanation:\n${explanation}`,
    patternName: `${SOURCE} Deductive Test ${testNumber} - question ${index + 1}`,
    hint: HINT,
  } as NumericalQuestion));
  return {
    id: `add-${testNumber}`,
    name: `${SOURCE} Deductive Test ${testNumber}`,
    subtitle: `AD-DD-${pad2(testNumber)} \u00b7 ${questions.length} questions`,
    description: `${questions.length} questions in 25 minutes. Read the premises (verbal, numerical, table or abstract) and judge the statement True, False or Insufficient Information, or choose the option that fits. Official AssessmentDay answers with the written explanation for each question. The premises are the original booklet artwork, so an internet connection is needed.`,
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    sourceOrganization: SOURCE,
    instructions: `This deductive reasoning test has ${questions.length} questions and a 25-minute limit. In each question you are given a set of premises, which may be verbal, numerical, abstract or a combination, and you must draw a logical conclusion from them. Base your answers only on the information given in the premises. There is only one correct answer per question. Work quickly and accurately; unanswered questions count as incorrect.`,
    questions,
  };
}

let cache: NumericalTest[] | null = null;

export function loadAssessmentDayDeductiveTests(): NumericalTest[] {
  if (!cache) {
    const raws = [dd1, dd2, dd3, dd4] as unknown as Row[][];
    cache = raws.map((rows, index) => buildTest(index + 1, rows));
  }
  return cache;
}
