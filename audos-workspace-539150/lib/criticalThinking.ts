import ct1 from '../data/assessmentday-assumptions-1.json';
import ct2 from '../data/assessmentday-assumptions-2.json';
import ct3 from '../data/assessmentday-assumptions-3.json';
import ct5 from '../data/assessmentday-assumptions-5.json';
import ct6 from '../data/assessmentday-assumptions-6.json';
import ct7 from '../data/assessmentday-assumptions-7.json';
import ct8 from '../data/assessmentday-assumptions-8.json';
import ct9 from '../data/assessmentday-assumptions-9.json';
import type { VerbalQuestion, VerbalTest } from './verbalReasoning';
import { loadGeneratedCriticalThinkingTests } from './criticalGenerated';

// AssessmentDay Critical Thinking tests, Assumptions section (booklets 1, 2, 3, 5, 6, 7, 8 and 9).
// Each test has four statements and three proposed assumptions per statement
// (12 questions in 12 minutes). The candidate decides whether each assumption is
// taken for granted by the statement (Assumption Made) or not (Assumption Not Made).
// The questions reuse the verbal question model: the statement is the passage and
// the proposed assumption is the prompt.

type RawItem = [string, 'M' | 'N', string];

interface RawSet {
  s: string;
  i: RawItem[];
}

interface RawCriticalTest {
  n: number;
  sets: RawSet[];
}

const SOURCE = 'AssessmentDay';
const MADE = 'Assumption Made';
const NOT_MADE = 'Assumption Not Made';
const TIME_LIMIT_SECONDS = 12 * 60;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(test: RawCriticalTest, set: RawSet, setIndex: number, item: RawItem, itemIndex: number, questionNumber: number): VerbalQuestion {
  const answer = item[1] === 'M' ? MADE : NOT_MADE;
  return {
    kind: 'verbal',
    id: `ct-assumptions-${test.n}-q${pad2(questionNumber)}`,
    difficulty: 'mixed',
    passage: set.s,
    passageLabel: 'Statement',
    promptLabel: `Proposed assumption ${itemIndex + 1} of ${set.i.length}`,
    prompt: item[0],
    options: [MADE, NOT_MADE],
    optionLabels: [MADE, NOT_MADE],
    correctAnswer: answer,
    explanation: `Correct answer: ${answer}.\n\nAssessmentDay explanation: ${item[2]}`,
    patternName: `${SOURCE} Assumptions Test ${test.n} - statement ${setIndex + 1}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: questionNumber,
    answerKeySource: 'official',
    hint: 'Ask whether the statement only works if the proposed assumption is true. An assumption is made when it is taken for granted; it is not made when the statement merely allows it, goes beyond it, or never mentions it.',
  } as VerbalQuestion;
}

function buildTest(raw: RawCriticalTest): VerbalTest {
  let number = 0;
  const questions: VerbalQuestion[] = [];
  raw.sets.forEach((set, setIndex) => {
    set.i.forEach((item, itemIndex) => {
      number += 1;
      questions.push(buildQuestion(raw, set, setIndex, item, itemIndex, number));
    });
  });
  return {
    id: `ct-assumptions-${raw.n}`,
    name: `Assumptions Test ${raw.n}`,
    subtitle: `AD-CT-${pad2(raw.n)} \u00b7 ${questions.length} questions`,
    description: 'Critical thinking: read a short statement, then decide for each of three proposed assumptions whether the statement takes it for granted (Assumption Made) or not (Assumption Not Made). Judge each one on its own and use only the statement. Official AssessmentDay answers and explanations.',
    difficulty: 'mixed',
    timeLimitSeconds: TIME_LIMIT_SECONDS,
    questions,
    sourceOrganization: SOURCE,
    answerKeySource: 'official',
  };
}

let cache: VerbalTest[] | null = null;

export function loadCriticalThinkingLibrary(): VerbalTest[] {
  if (!cache) {
    cache = [
      ...([ct1, ct2, ct3, ct5, ct6, ct7, ct8, ct9] as unknown as RawCriticalTest[]).map(buildTest),
      ...loadGeneratedCriticalThinkingTests(),
    ];
  }
  return cache;
}
