import syllogisms from '../data/assessmentday-syllogisms.json';
import type { VerbalQuestion, VerbalTest } from './verbalReasoning';

// AssessmentDay Syllogisms tests 1-4: two premises, five candidate conclusions,
// exactly one of which must be true. 20 questions and 10 seconds per question.
// The Solutions booklets print the answer only (the correct option in bold), so
// the explanation below states the answer and why the other options fail in
// general terms rather than inventing a worked proof.

type RawSyllogism = [string, string, string, string, string];

interface RawSyllogismTest {
  id: string;
  n: number;
  qs: RawSyllogism[];
}

const SOURCE = 'AssessmentDay';
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const SECONDS_PER_QUESTION = 10;
const PROMPT = 'Which one of the following conclusions is definitely true based on the statement?';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function buildQuestion(test: RawSyllogismTest, index: number, raw: RawSyllogism): VerbalQuestion {
  const [premiseOne, premiseTwo, subject, predicate, answer] = raw;
  const options = [
    `All ${subject} are ${predicate}`,
    `No ${subject} are ${predicate}`,
    `Some ${subject} are ${predicate}`,
    `Some ${subject} are not ${predicate}`,
    'No valid conclusion',
  ];
  const correctText = options[LETTERS.indexOf(answer)];
  const reason = answer === 'E'
    ? 'None of the four conclusions about these two groups follows necessarily from the premises, so "No valid conclusion" is the only safe answer.'
    : 'Only this conclusion must be true whenever both premises are true; each of the other options is either not guaranteed by the premises or contradicted by them.';
  return {
    kind: 'verbal',
    id: `${test.id}-q${pad2(index + 1)}`,
    difficulty: 'mixed',
    passage: `Premise 1: ${premiseOne}\nPremise 2: ${premiseTwo}`,
    passageLabel: 'Premises',
    prompt: PROMPT,
    options: LETTERS.slice(),
    optionLabels: LETTERS.slice(),
    optionTexts: options,
    correctAnswer: answer,
    explanation: `Correct answer: ${answer}. ${correctText}\n\n${reason} Treat the premises as fact even if they do not match reality. The AssessmentDay Solutions booklet prints the answer only, with no worked explanation.`,
    patternName: `${SOURCE} Syllogisms Test ${test.n} - question ${index + 1}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: index + 1,
    answerKeySource: 'official',
  } as VerbalQuestion;
}

function buildTest(raw: RawSyllogismTest): VerbalTest {
  const count = raw.qs.length;
  return {
    id: raw.id,
    name: `${SOURCE} Syllogisms Test ${raw.n}`,
    subtitle: `AD-SYL-${pad2(raw.n)} \u00b7 ${count} questions`,
    description: `Two premises and five possible conclusions per question: pick the one conclusion that must be true, ${SECONDS_PER_QUESTION} seconds per question. Treat the premises as fact even when they are abstract or untrue. Official AssessmentDay answers.`,
    difficulty: 'mixed',
    timeLimitSeconds: SECONDS_PER_QUESTION * count,
    questions: raw.qs.map((question, index) => buildQuestion(raw, index, question)),
    sourceOrganization: SOURCE,
    answerKeySource: 'official',
  };
}

let cache: VerbalTest[] | null = null;

export function loadAssessmentDaySyllogismTests(): VerbalTest[] {
  if (!cache) {
    cache = (syllogisms as unknown as { tests: RawSyllogismTest[] }).tests.map(buildTest);
  }
  return cache;
}
