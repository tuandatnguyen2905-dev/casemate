import tests0102 from '../data/assessmentday-verbal-tests-01-02.json';
import tests0304 from '../data/assessmentday-verbal-tests-03-04.json';
import tests0507 from '../data/assessmentday-verbal-tests-05-07.json';
import tests0811 from '../data/assessmentday-verbal-tests-08-11.json';
import test12 from '../data/assessmentday-verbal-test-12.json';
import solutionsA from '../data/assessmentday-verbal-solutions-a.json';
import solutionsB from '../data/assessmentday-verbal-solutions-b.json';
import solutionsC from '../data/assessmentday-verbal-solutions-c.json';
import type { VerbalQuestion, VerbalTest } from './verbalReasoning';

interface RawQuestion {
  q: number;
  p: number;
  t: string;
  o: string[];
  a: string;
  e?: string;
}

interface RawTest {
  id: string;
  n: number;
  sec: number;
  key: 'official' | 'derived';
  passages: string[];
  questions: RawQuestion[];
  excluded: Array<{ q: number; why: string }>;
}

// Official AssessmentDay Solutions booklets: the official answer and explanation
// for every question, wording fixes from the newer booklet, and the questions
// that could not be answered from the Questions booklets alone.
interface SolutionsOverlay {
  id: string;
  sec: number;
  passages?: Record<string, string>;
  addPassages?: string[];
  qs: Array<{ q: number; a: string; e: string; t?: string; o?: string[] }>;
  add?: RawQuestion[];
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const SOURCE = 'AssessmentDay';

const DERIVED_NOTE =
  'Answer-key note: no AssessmentDay solutions booklet was available for this test, so this answer was worked out from the passage alone. Re-read the passage to confirm it.';

const EXCLUSION_REASON: Record<string, string> = {
  'missing-options': 'the booklet prints no answer options for it',
  ambiguous: 'the passage does not support one defensible answer',
};

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function applySolutions(raw: RawTest, overlay: SolutionsOverlay | undefined): RawTest {
  if (!overlay) return raw;
  const passages = raw.passages
    .map((passage, index) => overlay.passages?.[String(index)] ?? passage)
    .concat(overlay.addPassages ?? []);
  const fixes = new Map(overlay.qs.map((item) => [item.q, item]));
  const restored = new Set((overlay.add ?? []).map((item) => item.q));
  const questions = raw.questions
    .map((question) => {
      const fix = fixes.get(question.q);
      return fix
        ? { ...question, a: fix.a, e: fix.e, t: fix.t ?? question.t, o: fix.o ?? question.o }
        : question;
    })
    .concat(overlay.add ?? [])
    .sort((a, b) => a.q - b.q);
  return {
    ...raw,
    key: 'official',
    sec: overlay.sec ?? raw.sec,
    passages,
    questions,
    excluded: raw.excluded.filter((item) => !restored.has(item.q)),
  };
}

function describeExclusions(excluded: RawTest['excluded']): string {
  if (!excluded.length) return '';
  const reasons = Array.from(new Set(excluded.map((item) => EXCLUSION_REASON[item.why] || item.why)));
  const numbers = excluded.map((item) => item.q).join(', ');
  return ` Source question${excluded.length === 1 ? '' : 's'} ${numbers} ${excluded.length === 1 ? 'was' : 'were'} left out because ${reasons.join(' / ')}.`;
}

function buildQuestion(test: RawTest, raw: RawQuestion): VerbalQuestion {
  const labels = LETTERS.slice(0, raw.o.length);
  const correctText = raw.o[LETTERS.indexOf(raw.a)];
  const lead = `Correct answer: ${raw.a}. ${correctText}`;
  const explanation = test.key === 'official' && raw.e
    ? `${lead}\n\n${raw.e}`
    : `${lead}\n\n${DERIVED_NOTE}`;
  return {
    kind: 'verbal',
    id: `${test.id}-q${pad2(raw.q)}`,
    difficulty: 'mixed',
    passage: test.passages[raw.p],
    prompt: raw.t,
    options: labels,
    optionLabels: labels,
    optionTexts: raw.o,
    correctAnswer: raw.a,
    explanation,
    patternName: `${SOURCE} Verbal Comprehension Test ${test.n} - source question ${raw.q}`,
    sourceOrganization: SOURCE,
    sourceQuestionNumber: raw.q,
    answerKeySource: test.key,
  } as VerbalQuestion;
}

function buildTest(raw: RawTest): VerbalTest {
  const count = raw.questions.length;
  const keyNote = raw.key === 'official'
    ? 'Answer key and explanations come from the AssessmentDay solutions booklet.'
    : 'No solutions booklet was available, so each answer was worked out from the passage.';
  return {
    id: raw.id,
    name: `${SOURCE} Verbal Comprehension Test ${raw.n}`,
    subtitle: `AD-VC-${pad2(raw.n)} \u00b7 ${count} questions`,
    description: `Multiple-choice questions on short passages, ${raw.sec} seconds per question. Base every answer on the passage only. ${keyNote}${describeExclusions(raw.excluded)}`,
    difficulty: 'mixed',
    timeLimitSeconds: raw.sec * count,
    questions: raw.questions.map((question) => buildQuestion(raw, question)),
    sourceOrganization: SOURCE,
    answerKeySource: raw.key,
  };
}

let cache: VerbalTest[] | null = null;

export function loadAssessmentDayVerbalTests(): VerbalTest[] {
  if (!cache) {
    const bundles = [tests0102, tests0304, tests0507, tests0811, test12] as unknown as Array<{ tests: RawTest[] }>;
    const overlays = new Map(
      ([solutionsA, solutionsB, solutionsC] as unknown as Array<{ overlays: SolutionsOverlay[] }>)
        .flatMap((bundle) => bundle.overlays)
        .map((overlay) => [overlay.id, overlay] as [string, SolutionsOverlay]),
    );
    cache = bundles
      .flatMap((bundle) => bundle.tests)
      .sort((a, b) => a.n - b.n)
      .map((raw) => buildTest(applySolutions(raw, overlays.get(raw.id))));
  }
  return cache;
}
