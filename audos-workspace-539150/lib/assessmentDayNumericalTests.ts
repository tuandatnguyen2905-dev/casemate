import test01 from '../data/assessmentday-numerical-test-01.json';
import tests02To03 from '../data/assessmentday-numerical-tests-02-03.json';
import tests04To05 from '../data/assessmentday-numerical-tests-04-05.json';
import tests06To07 from '../data/assessmentday-numerical-tests-06-07.json';
import tests08To09 from '../data/assessmentday-numerical-tests-08-09.json';
import tests10To11 from '../data/assessmentday-numerical-tests-10-11.json';
import test12 from '../data/assessmentday-numerical-test-12.json';
import comprehension1 from '../data/assessmentday-numerical-comprehension-1.json';
import comprehension2 from '../data/assessmentday-numerical-comprehension-2.json';
import comprehension3 from '../data/assessmentday-numerical-comprehension-3.json';
import comprehension4 from '../data/assessmentday-numerical-comprehension-4.json';
import comprehension5 from '../data/assessmentday-numerical-comprehension-5.json';
import comprehension6 from '../data/assessmentday-numerical-comprehension-6.json';
import advanced1 from '../data/assessmentday-advanced-numerical-1.json';
import advanced2 from '../data/assessmentday-advanced-numerical-2.json';
import capp1 from '../data/assessmentday-capp-numerical-1.json';
import capp2 from '../data/assessmentday-capp-numerical-2.json';
import capp3 from '../data/assessmentday-capp-numerical-3.json';
import capp4 from '../data/assessmentday-capp-numerical-4.json';
import type { NumericalAnswerKind, NumericalQuestion, NumericalSourceExhibit, NumericalTest } from './numericalReasoning';

type RawQuestion = Omit<NumericalQuestion, 'sourceExhibits'> & {
  sourceExhibitIds: string[];
};

type RawTest = Omit<NumericalTest, 'questions'> & {
  exhibits: NumericalSourceExhibit[];
  questions: RawQuestion[];
};

type RawBundle = { tests: RawTest[] };

// AssessmentDay Numerical Comprehension Tests 1-6: text-only word problems with
// five options, 18 questions and 18 minutes each, and official step-by-step solutions.
interface RawComprehensionTest {
  n: number;
  qs: Array<[string, string[], string, string]>;
}

const COMPREHENSION_LABELS = ['A', 'B', 'C', 'D', 'E'];
const COMPREHENSION_SECONDS = 18 * 60;
const COMPREHENSION_INSTRUCTIONS =
  'This numerical comprehension test comprises 18 questions, and you will have 18 minutes in which to correctly answer as many as you can. Calculators are permitted for this test, and it is recommended you have some rough paper to work on.\n\nYou will have to work quickly and accurately to perform well in this test. If you don\u2019t know the answer to a question, leave it and come back to it if you have time. Each question will have five possible answers, one of which is correct. If the exact correct answer is not provided, select the closest possible answer. You may click Back and Next during the test to review or skip questions.\n\nYou can submit your test at any time. If the time limit is up before you click submit the test will automatically be submitted with the answers you have selected. It is recommended to keep working until the time limit is up.';

function buildComprehensionTest(raw: RawComprehensionTest): NumericalTest {
  const id = `assessmentday-numerical-comprehension-${raw.n}`;
  return {
    id,
    name: `Numerical Comprehension Test ${raw.n}`,
    subtitle: `AssessmentDay \u00b7 Comprehension Test ${raw.n}`,
    description: `An ${raw.qs.length}-question mixed-difficulty numerical comprehension test of text-only word problems (percentages, ratios, fractions, exchange rates, unit conversions, interest, pay and profit), five options each. If the exact answer is not offered, pick the closest. Official AssessmentDay step-by-step solutions.`,
    difficulty: 'mixed',
    timeLimitSeconds: COMPREHENSION_SECONDS,
    sourceOrganization: 'AssessmentDay',
    instructions: COMPREHENSION_INSTRUCTIONS,
    questions: raw.qs.map(([prompt, options, answer, explanation], index) => ({
      kind: 'numerical',
      id: `${id}-q${String(index + 1).padStart(2, '0')}`,
      difficulty: 'mixed',
      sourceOrganization: 'AssessmentDay',
      sectionTitle: 'Numerical Comprehension',
      prompt,
      options,
      optionLabels: COMPREHENSION_LABELS.slice(0, options.length),
      correctAnswer: answer,
      explanation,
      patternName: 'AssessmentDay \u00b7 Official worked solution',
    } as NumericalQuestion)),
  };
}

// AssessmentDay Advanced Numerical Reasoning Tests 1-2: 30 questions and 30 minutes, no calculator.
// Subtest 1 (Q1-15) compares two quantities (options A-D); subtest 2 (Q16-30) asks whether two
// statements are sufficient to answer a question (options A-E). Official step-by-step solutions.
interface RawAdvancedTest {
  n: number;
  qs: Array<[number, string, string, string, string, string, string]>;
}

const ADVANCED_SECONDS = 30 * 60;
const ADVANCED_COMPARISON_OPTIONS = [
  'Quantity A is greater than Quantity B.',
  'Quantity B is greater than Quantity A.',
  'Quantities A and B are equal.',
  'Insufficient information is given to make the comparison.',
];
const ADVANCED_SUFFICIENCY_OPTIONS = [
  'Statement 1 ALONE is sufficient, but statement 2 alone is not sufficient to answer the question.',
  'Statement 2 ALONE is sufficient, but statement 1 alone is not sufficient to answer the question.',
  'BOTH statements 1 and 2 TOGETHER are sufficient to answer the question, but NEITHER statement ALONE is sufficient.',
  'EACH statement ALONE is sufficient to answer the question asked.',
  'Statements 1 and 2 together are NOT sufficient to answer the question asked.',
];
const ADVANCED_INSTRUCTIONS =
  'This numerical reasoning test comprises 30 questions, and you will have 30 minutes in which to correctly answer as many as you can. Calculators are NOT permitted for this test, and it is recommended you have some rough paper to work on.\n\nThis test comprises two sub-tests:\n\nSubtest 1: Comparison of Quantities (Questions 1-15). You make a comparison between two quantities, A and B. For some of the exercises, additional information is given which should also be used in your determination of quantity.\n\nSubtest 2: Sufficiency of Information (Questions 16-30). You are given a question and two statements, labelled (1) and (2), which give certain information. You decide whether the information given in the two statements is sufficient to answer the question, either separately or in combination.\n\nYou can submit your test at any time. If the time limit is up before you click submit the test will automatically be submitted with the answers you have selected.';

function buildAdvancedTest(raw: RawAdvancedTest): NumericalTest {
  const id = `assessmentday-advanced-numerical-${raw.n}`;
  return {
    id,
    name: `Advanced Numerical Reasoning Test ${raw.n}`,
    subtitle: `AssessmentDay \u00b7 Advanced Test ${raw.n}`,
    description:
      'A 30-question advanced test in two subtests: Comparison of Quantities (Q1-15, options A-D) and Sufficiency of Information (Q16-30, options A-E). No calculator. Official AssessmentDay step-by-step solutions.',
    difficulty: 'mixed',
    timeLimitSeconds: ADVANCED_SECONDS,
    sourceOrganization: 'AssessmentDay',
    instructions: ADVANCED_INSTRUCTIONS,
    questions: raw.qs.map(([subtest, first, second, note, prompt, answer, explanation], index) => {
      const comparison = subtest === 1;
      const options = comparison ? ADVANCED_COMPARISON_OPTIONS : ADVANCED_SUFFICIENCY_OPTIONS;
      const passages = comparison
        ? [`Quantity A: ${first}`, `Quantity B: ${second}`]
        : [`Statement 1: ${first}`, `Statement 2: ${second}`];
      if (note) passages.push(note);
      return {
        kind: 'numerical',
        id: `${id}-q${String(index + 1).padStart(2, '0')}`,
        difficulty: 'mixed',
        sourceOrganization: 'AssessmentDay',
        sectionTitle: comparison ? 'Subtest 1 \u00b7 Comparison of Quantities' : 'Subtest 2 \u00b7 Sufficiency of Information',
        contextPassages: passages,
        prompt,
        options,
        optionLabels: ['A', 'B', 'C', 'D', 'E'].slice(0, options.length),
        correctAnswer: answer,
        explanation,
        patternName: 'AssessmentDay \u00b7 Official worked solution',
      } as NumericalQuestion;
    }),
  };
}

// AssessmentDay Capp Numerical Tests 1-4: 12 questions each on tables and charts shown as the original
// booklet pictures. Answers are a lettered option, a typed number or phrase, or a ranking. No time limit.
type CappBox = [number, number, number, number];
interface RawCappTest {
  n: number;
  url: string;
  qs: Array<[number, CappBox, NumericalAnswerKind, string, string[], string, string, Array<number | string> | null]>;
}

const CAPP_INSTRUCTIONS =
  'This numerical reasoning test comprises 12 questions. Calculators are permitted for this test, and it is recommended you have some rough paper to work on.\n\nYou will have to work quickly and accurately to perform well in this test. The test does not have an overall time limit. Instead, the time it takes you to complete the test will be recorded.\n\nEach question shows a table or chart. Some questions give lettered options, some ask you to type your answer, and some ask you to rank items from highest to lowest.';
const CAPP_HINT: Record<NumericalAnswerKind, string> = {
  choice: 'Study the table or chart, then choose one answer.',
  numeric: 'Study the table or chart, then type your answer as a number (\u00a3, % and commas are optional).',
  text: 'Study the chart, then type your answer in words.',
  rank: 'Study the table or chart, then tap every item in order from 1st to last.',
};

function cappDisplayOrder(correctOrder: string[]): string[] {
  const alphabetical = correctOrder.slice().sort((a, b) => a.localeCompare(b));
  return alphabetical.every((item, index) => item === correctOrder[index]) ? alphabetical.reverse() : alphabetical;
}

function buildCappTest(raw: RawCappTest): NumericalTest {
  const id = `assessmentday-capp-numerical-${raw.n}`;
  return {
    id,
    name: `Capp Numerical Test ${raw.n}`,
    subtitle: `AssessmentDay \u00b7 Capp Test ${raw.n}`,
    description:
      'A 12-question numerical test on tables and charts shown as the original booklet pictures. Answers are lettered options, typed numbers or rankings. Calculator allowed, no time limit (your time is recorded). Official step-by-step solutions.',
    difficulty: 'mixed',
    timeLimitSeconds: 0,
    sourceOrganization: 'AssessmentDay',
    instructions: CAPP_INSTRUCTIONS,
    questions: raw.qs.map(([page, box, kind, prompt, items, answer, explanation, accept], index) => {
      const question: NumericalQuestion = {
        kind: 'numerical',
        id: `${id}-q${String(index + 1).padStart(2, '0')}`,
        difficulty: 'mixed',
        sourceOrganization: 'AssessmentDay',
        sectionTitle: 'Capp Numerical',
        contextPassages: [CAPP_HINT[kind]],
        figure: { url: raw.url, page, box },
        answerKind: kind,
        prompt,
        options: [],
        optionLabels: [],
        correctAnswer: answer,
        explanation,
        patternName: 'AssessmentDay \u00b7 Official worked solution',
      };
      if (kind === 'choice') {
        question.options = items;
        question.optionLabels = ['A', 'B', 'C', 'D', 'E'].slice(0, items.length);
      } else if (kind === 'rank') {
        question.rankItems = cappDisplayOrder(items);
        question.correctAnswer = items.join('|');
        question.answerLabel = items.join(' > ');
      } else if (kind === 'numeric') {
        question.numericAccept = (accept || []) as number[];
        question.answerLabel = answer;
      } else {
        question.textAccept = (accept || []) as string[];
        question.answerLabel = answer;
      }
      return question;
    }),
  };
}

let cache: NumericalTest[] | null = null;

export function loadAssessmentDayNumericalTests(): NumericalTest[] {
  if (!cache) {
    const bundles = [test01, tests02To03, tests04To05, tests06To07, tests08To09, tests10To11, test12] as unknown as RawBundle[];
    cache = bundles
      .flatMap((bundle) => bundle.tests)
      .sort((a, b) => Number(a.id.split('-').pop()) - Number(b.id.split('-').pop()))
      .map(({ exhibits, questions, ...test }) => {
        const exhibitById = new Map(exhibits.map((exhibit) => [exhibit.id, exhibit]));
        return {
          ...test,
          sourceOrganization: 'AssessmentDay',
          questions: questions.map(({ sourceExhibitIds, ...question }) => ({
            ...question,
            sourceOrganization: 'AssessmentDay',
            sourceExhibits: sourceExhibitIds.map((id) => {
              const exhibit = exhibitById.get(id);
              if (!exhibit) throw new Error(`Missing AssessmentDay exhibit ${id} for ${question.id}`);
              return exhibit;
            }),
          })),
        } as NumericalTest;
      })
      .concat(
        ([comprehension1, comprehension2, comprehension3, comprehension4, comprehension5, comprehension6] as unknown as RawComprehensionTest[]).map(buildComprehensionTest),
      )
      .concat(([advanced1, advanced2] as unknown as RawAdvancedTest[]).map(buildAdvancedTest))
      .concat(([capp1, capp2, capp3, capp4] as unknown as RawCappTest[]).map(buildCappTest));
  }
  return cache;
}
