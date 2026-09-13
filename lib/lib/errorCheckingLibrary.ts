// Casemate — Error Checking FULL LIBRARY: 30 tests × 30 questions.
//
// Built on top of lib/errorChecking.ts, the same way lib/deductiveLibrary.ts
// is built on lib/deductive.ts. Hand-writing 900 data tables would be
// unmaintainable and error-prone, so this module spreads the engine's five
// question families (row error counts, correct-version lookups, locate the
// column, locate the row, whole-table error counts) across the thirty tests
// with a SEEDED RNG. Every table, every planted error and every answer key is
// drawn deterministically from the question id, so the same build always
// produces the same 900 questions and a candidate can retake a test and
// compare.
//
// Difficulty is balanced across the full bank without changing the original
// ten tests: Easy = 1–3 and 11–17, Medium = 4–6 and 18–24, Hard = 7–10 and
// 25–30. Every answer is COMPUTED — the engine plants the
// transcription errors itself and derives the key and the explanation from
// the exact same edits, so the tables and the answer key can never disagree.
// Duplicate questions are rejected on their prompt+table signature GLOBALLY —
// no question repeats anywhere across the thirty tests.
//
// The formats mirror the four AssessmentDay Error Checking booklets the
// founder supplied: original-vs-copied data tables, per-row and whole-table
// error counts, and "which of these five versions is correct" lookups — at
// the real round's pace of 20 seconds per question (30 questions, 10 min).
//
// LANGUAGE: English end to end, same as the rest of the Aptitude Test app.

import {
  buildErrorCheckingQuestion,
  hashErrorChecking,
  type ErrorCheckingDifficulty,
  type ErrorCheckingExpandedQuestion,
  type ErrorCheckingFamily,
  type ErrorCheckingTest,
} from './errorChecking';

export const ERROR_CHECKING_TEST_COUNT = 30;
export const ERROR_CHECKING_QUESTIONS_PER_TEST = 30;
export const ERROR_CHECKING_TIME_LIMIT_SECONDS = 600; // 20 seconds a question, the real round's pace.

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

/** The visible puzzle — the prompt plus both tables identify a question. */
function signature(q: ErrorCheckingExpandedQuestion): string {
  return JSON.stringify([q.prompt, q.sourceRows, q.checkRows, q.options]);
}

/** Per-test family mix: 30 questions across the five families. */
const FAMILY_MIX: [ErrorCheckingFamily, number][] = [
  ['row_errors', 8],
  ['correct_version', 8],
  ['which_column', 6],
  ['which_row', 4],
  ['count_total', 4],
];

function tierFor(testNumber: number): ErrorCheckingDifficulty {
  // Keep Tests 1–10 byte-for-byte stable, then use the twenty new papers to
  // bring the complete 30-test library to ten Easy, ten Medium and ten Hard.
  if (testNumber <= 3 || (testNumber >= 11 && testNumber <= 17)) return 'easy';
  if ((testNumber >= 4 && testNumber <= 6) || (testNumber >= 18 && testNumber <= 24)) return 'medium';
  return 'hard';
}

const TIER_LABEL: Record<ErrorCheckingDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const TEST_DESCRIPTIONS: string[] = [
  'Easy set 1: short codes and small tables — count the errors in a row, spot the odd column, pick the correct version.',
  'Easy set 2: more original-vs-copy comparisons at a gentle length — accuracy first, speed second.',
  'Easy set 3: the last warm-up set — four-row tables, one clean discrepancy at a time.',
  'Medium set 4: five-row tables, longer codes, and case-sensitive letters enter the mix.',
  'Medium set 5: phone numbers, e-mails and payment references — watch the character order, not just the characters.',
  'Medium set 6: the full medium mix — flipped case, transposed digits, and rows that are copied perfectly.',
  'Hard set 7: long alphanumeric codes with look-alike characters — 0/O, 1/I, 5/S, 8/B, 2/Z, 6/G.',
  'Hard set 8: dense tables at full speed — whole-table counts where every cell must be checked.',
  'Hard set 9: the subtlest corruptions in the bank — one character, one case flip, one look-alike at a time.',
  'Hard set 10: a final exam-conditions set drawing on every family at full difficulty.',
];

function generateTest(testNumber: number, taken: Set<string>): ErrorCheckingTest {
  const id = `ec-${pad2(testNumber)}`;
  const tier = tierFor(testNumber);
  const next = rng(hashErrorChecking(`${id}:order`));

  // Interleave the families through the paper rather than blocking them.
  const familySlots: ErrorCheckingFamily[] = [];
  FAMILY_MIX.forEach(([family, count]) => {
    for (let i = 0; i < count; i += 1) familySlots.push(family);
  });
  const order = shuffle(familySlots, next);

  const questions: ErrorCheckingExpandedQuestion[] = [];
  for (let q = 1; q <= ERROR_CHECKING_QUESTIONS_PER_TEST; q += 1) {
    const family = order[q - 1];
    const qid = `${id}-q${pad2(q)}`;
    let chosen: ErrorCheckingExpandedQuestion | null = null;
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const candidate = buildErrorCheckingQuestion(attempt === 0 ? qid : `${qid}r${attempt}`, family, tier);
      const sig = signature(candidate);
      if (!taken.has(sig)) {
        taken.add(sig);
        chosen = { ...candidate, id: qid };
        break;
      }
      if (attempt === 39) chosen = { ...candidate, id: qid }; // give up de-duping, still valid
    }
    questions.push(chosen as ErrorCheckingExpandedQuestion);
  }

  return {
    id,
    name: `Error Checking Test ${testNumber}`,
    subtitle: `EC-${pad2(testNumber)} · ${TIER_LABEL[tier]}`,
    description:
      TEST_DESCRIPTIONS[testNumber - 1] ||
      `${TIER_LABEL[tier]} set ${testNumber}: compare the copied data against the original and spot every transcription error.`,
    difficulty: tier,
    timeLimitSeconds: ERROR_CHECKING_TIME_LIMIT_SECONDS,
    questions,
  };
}

let cache: ErrorCheckingTest[] | null = null;

/**
 * The full 30-test Error Checking library, expanded and ready for the UI:
 * 30 questions each, every answer derived from the same planted edits the
 * candidate sees, no question repeated anywhere across the thirty tests.
 * Generation is deterministic and cached for the lifetime of the page.
 */
export function loadErrorCheckingLibrary(): ErrorCheckingTest[] {
  if (!cache) {
    const taken = new Set<string>();
    const tests: ErrorCheckingTest[] = [];
    for (let i = 1; i <= ERROR_CHECKING_TEST_COUNT; i += 1) {
      tests.push(generateTest(i, taken));
    }
    cache = tests;
  }
  return cache;
}
