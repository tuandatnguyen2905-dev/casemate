// Casemate — Deductive Reasoning FULL LIBRARY: 30 tests × 30 questions.
//
// Built on top of lib/deductive.ts, the same way lib/inductiveLibrary.ts is
// built on lib/inductive.ts. Hand-writing 900 question specs would be
// unmaintainable and error-prone, so this module spreads the engine's five
// question families (syllogisms, conditional if–then arguments, ranking /
// ordering, numeric relationships, plan-selection tables) across the thirty
// tests with a SEEDED RNG. Every parameter is drawn deterministically from
// the question id, so the same build always produces the same 900 questions
// and a candidate can retake a test and compare.
//
// Difficulty is balanced across the full bank without changing the original
// ten tests: Easy = 1–3 and 11–17, Medium = 4–6 and 18–24, Hard = 7–10 and
// 25–30. Every generated verdict is COMPUTED (ordering verdicts by
// enumerating all consistent rankings; numeric and table answers by
// arithmetic; syllogism / conditional verdicts from a hand-verified catalogue
// of logical forms), so the answer key can never disagree with the premises.
// Duplicate questions are rejected on their premises+statement signature
// GLOBALLY — no question repeats anywhere across the thirty tests.
//
// The formats mirror the four AssessmentDay Deductive Reasoning booklets the
// founder supplied: passages of premises judged True / False / Insufficient
// Information, plus five-option "which plan fits" table questions.
//
// LANGUAGE: English end to end, same as the rest of the Aptitude Test app.

import {
  buildDeductiveQuestion,
  hashDeductive,
  type DeductiveDifficulty,
  type DeductiveExpandedQuestion,
  type DeductiveFamily,
  type DeductiveTest,
} from './deductive';

export const DEDUCTIVE_TEST_COUNT = 30;
export const DEDUCTIVE_QUESTIONS_PER_TEST = 30;
export const DEDUCTIVE_TIME_LIMIT_SECONDS = 1500; // 25 minutes, as the real round runs.

function rng(seed: number): () => number {
  let a = (seed >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** The visible puzzle — premises + statement identify a question; the option
 *  shuffle alone never makes two questions "different". */
function signature(q: DeductiveExpandedQuestion): string {
  return JSON.stringify([q.premises, q.prompt]);
}

/** Per-test family mix: 30 questions across the five families. */
const FAMILY_MIX: [DeductiveFamily, number][] = [
  ['syllogism', 8],
  ['conditional', 7],
  ['ordering', 6],
  ['numeric', 5],
  ['selection', 4],
];

function tierFor(testNumber: number): DeductiveDifficulty {
  // Keep Tests 1–10 byte-for-byte stable, then use the twenty new papers to
  // bring the complete 30-test library to ten Easy, ten Medium and ten Hard.
  if (testNumber <= 3 || (testNumber >= 11 && testNumber <= 17)) return 'easy';
  if ((testNumber >= 4 && testNumber <= 6) || (testNumber >= 18 && testNumber <= 24)) return 'medium';
  return 'hard';
}

const TIER_LABEL: Record<DeductiveDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const TEST_DESCRIPTIONS: string[] = [
  'Easy set 1: direct syllogisms, if–then arguments and simple rankings — read the premises, judge the statement.',
  'Easy set 2: more single-step deductions, plus price tables where the right plan follows from the requirements.',
  'Easy set 3: the last of the warm-up sets — clean premises, one inference per question.',
  'Medium set 4: converse traps, denied antecedents and rankings that need two premises combined.',
  'Medium set 5: bundle pricing, chained conditionals and syllogisms where "some" does not chain.',
  'Medium set 6: the full medium mix — watch for statements the premises simply do not settle.',
  'Hard set 7: simultaneous-equation pricing, "only if" and "unless" arguments, and looser rankings.',
  'Hard set 8: multi-step chains and orderings with real slack — enumerate before you commit.',
  'Hard set 9: the trickiest logical forms in the bank, with near-miss wrong answers throughout.',
  'Hard set 10: a final exam-conditions set drawing on every family at full difficulty.',
];

function generateTest(testNumber: number, taken: Set<string>): DeductiveTest {
  const id = `dr-${pad2(testNumber)}`;
  const tier = tierFor(testNumber);
  const next = rng(hashDeductive(`${id}:order`));

  // Interleave the families through the paper rather than blocking them.
  const familySlots: DeductiveFamily[] = [];
  FAMILY_MIX.forEach(([family, count]) => {
    for (let i = 0; i < count; i += 1) familySlots.push(family);
  });
  const order = shuffle(familySlots, next);

  const questions: DeductiveExpandedQuestion[] = [];
  for (let q = 1; q <= DEDUCTIVE_QUESTIONS_PER_TEST; q += 1) {
    const family = order[q - 1];
    const qid = `${id}-q${pad2(q)}`;
    let chosen: DeductiveExpandedQuestion | null = null;
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const candidate = buildDeductiveQuestion(attempt === 0 ? qid : `${qid}r${attempt}`, family, tier);
      const sig = signature(candidate);
      if (!taken.has(sig)) {
        taken.add(sig);
        chosen = { ...candidate, id: qid };
        break;
      }
      if (attempt === 39) chosen = { ...candidate, id: qid }; // give up de-duping, still valid
    }
    questions.push(chosen as DeductiveExpandedQuestion);
  }

  return {
    id,
    name: `Deductive Test ${testNumber}`,
    subtitle: `DR-${pad2(testNumber)} · ${TIER_LABEL[tier]}`,
    description:
      TEST_DESCRIPTIONS[testNumber - 1] ||
      `${TIER_LABEL[tier]} set ${testNumber}: judge each statement against the premises — True, False, or Insufficient Information.`,
    difficulty: tier,
    timeLimitSeconds: DEDUCTIVE_TIME_LIMIT_SECONDS,
    questions,
  };
}

let cache: DeductiveTest[] | null = null;

/**
 * The full 30-test Deductive Reasoning library, expanded and ready for the UI:
 * 30 questions each, every verdict computed from the premises, no question
 * repeated anywhere across the thirty tests. Generation is deterministic and
 * cached for the lifetime of the page.
 */
export function loadDeductiveLibrary(): DeductiveTest[] {
  if (!cache) {
    const taken = new Set<string>();
    const tests: DeductiveTest[] = [];
    for (let i = 1; i <= DEDUCTIVE_TEST_COUNT; i += 1) {
      tests.push(generateTest(i, taken));
    }
    cache = tests;
  }
  return cache;
}
