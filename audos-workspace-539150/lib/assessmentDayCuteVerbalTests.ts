import cute1 from '../data/assessmentday-cute-verbal-test-01.json';
import cute2 from '../data/assessmentday-cute-verbal-test-02.json';
import cute3 from '../data/assessmentday-cute-verbal-test-03.json';
import type { VerbalQuestion, VerbalTest } from './verbalReasoning';

// AssessmentDay "Cut-e style" verbal tests: one long reading booklet per test,
// 38 True / False / Cannot Say statements and an 18-minute limit for the lot.

interface RawCuteQuestion {
  q: number;
  t: string;
  a: 'T' | 'F' | 'C';
  n?: string;
  e: string;
}

interface RawCuteTest {
  id: string;
  n: number;
  total: number;
  passage: string;
  questions: RawCuteQuestion[];
}

const SOURCE = 'AssessmentDay';
const ANSWER_LABEL = { T: 'True', F: 'False', C: 'Cannot Say' } as const;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(test: RawCuteTest, raw: RawCuteQuestion): VerbalQuestion {
  const answer = ANSWER_LABEL[raw.a];
  const note = raw.n ? `${raw.n}\n\n` : '';
  return {
    kind: 'verbal',
    id: `${test.id}-q${pad2(raw.q)}`,
    difficulty: 'mixed',
    passage: test.passage,
    prompt: raw.t,
    options: ['True', 'False', 'Cannot Say'],
    optionLabels: ['True', 'False', 'Cannot Say'],
    correctAnswer: answer,
    explanation: `Correct answer: ${answer}.\n\n${note}AssessmentDay explanation: ${raw.e}`,
    patternName: `${SOURCE} Cut-e style Verbal Test ${test.n} - statement ${raw.q}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: raw.q,
    answerKeySource: 'official',
  } as VerbalQuestion;
}

function buildTest(raw: RawCuteTest): VerbalTest {
  const corrections = raw.questions.filter((question) => question.n && question.n.startsWith('Casemate correction')).length;
  const correctionNote = corrections
    ? ` ${corrections} answer${corrections === 1 ? '' : 's'} corrected where the printed key contradicted its own explanation (flagged in the review).`
    : '';
  return {
    id: raw.id,
    name: `${SOURCE} Cut-e Style Verbal Test ${raw.n}`,
    subtitle: `AD-CUTE-${pad2(raw.n)} \u00b7 ${raw.questions.length} questions`,
    description: `One reading booklet and ${raw.questions.length} True / False / Cannot Say statements, ${Math.round(raw.total / 60)} minutes in total. Read the whole booklet, then judge each statement using only what it says. Official AssessmentDay answers and explanations.${correctionNote}`,
    difficulty: 'mixed',
    timeLimitSeconds: raw.total,
    questions: raw.questions.map((question) => buildQuestion(raw, question)),
    sourceOrganization: SOURCE,
    answerKeySource: 'official',
  };
}

let cache: VerbalTest[] | null = null;

export function loadAssessmentDayCuteVerbalTests(): VerbalTest[] {
  if (!cache) {
    cache = ([cute1, cute2, cute3] as unknown as RawCuteTest[]).map(buildTest);
  }
  return cache;
}
