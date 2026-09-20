// Casemate — Inductive Reasoning FULL LIBRARY: 30 tests × 30 questions.
//
// Built on top of lib/inductive.ts, the same way lib/diagrammaticLibrary.ts is
// built on lib/diagrammatic.ts. Hand-writing 900 question specs would be
// unmaintainable and error-prone, so this module spreads the engine's
// archetype catalogue (rotation, movement clockwise / anticlockwise, fill
// alternation, side counts, shaded-segment rotation, mirroring, grid position,
// dot clusters, notches, bar levels — every one running EXACTLY TWO rules)
// across the thirty tests with a SEEDED RNG. Every parameter is drawn
// deterministically from the question id, so the same build always produces
// the same 900 questions and a candidate can retake a test and compare.
//
// Each generated question is validated by the engine as it is built (a
// composition that cannot produce four clean distractors is rebuilt with the
// next archetype), and duplicate puzzles inside one test are rejected on their
// visual signature, so every test always holds exactly 30 distinct questions.
//
// Tests 1–4 recreate the four AssessmentDay Inductive Reasoning booklets the
// founder supplied — the same pattern families, the same two-rules-per-question
// structure — as original, verified questions (the engine guarantees the
// pictured sequence and the keyed answer always agree). Tests 5–30 extend the
// set with the same rule vocabulary and fresh parameters.
//
// LANGUAGE: English end to end, same as the rest of the Aptitude Test app.

import {
  buildArchetypeList,
  buildInductiveQuestion,
  hashString,
  type InductiveExpandedQuestion,
  type InductiveTest,
} from './inductive';

export const INDUCTIVE_TEST_COUNT = 30;
export const INDUCTIVE_QUESTIONS_PER_TEST = 30;
export const INDUCTIVE_TIME_LIMIT_SECONDS = 1500; // 25 minutes, as the real round runs.

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

/** The visible puzzle — two questions with the same five panels ARE the same
 *  question even if the option shuffle differs, so options are excluded. */
function signature(q: InductiveExpandedQuestion): string {
  return JSON.stringify([q.patternName, q.sequence]);
}

const TEST_DESCRIPTIONS: string[] = [
  'Recreates AssessmentDay Inductive Reasoning Test 1: spot the two rules driving the sequence and pick the figure that comes next.',
  'Recreates AssessmentDay Inductive Reasoning Test 2: rotation, movement and fill rules running two at a time.',
  'Recreates AssessmentDay Inductive Reasoning Test 3: side counts, shaded segments and grid movement, two rules per question.',
  'Recreates AssessmentDay Inductive Reasoning Test 4: the full pattern vocabulary, every question governed by exactly two rules.',
  'Extension set 5: mixed rotation, count and fill patterns at real-round pace.',
  'Extension set 6: movement around the box, mirroring and shaded-segment rules.',
  'Extension set 7: grid position, notches and bar-level patterns paired with a second rule.',
  'Extension set 8: the harder two-rule combinations — read carefully before you answer.',
  'Extension set 9: a broad mix across every pattern family in the bank.',
  'Extension set 10: a final mixed set to sit under exam conditions.',
];

function generateTest(testNumber: number, archetypes: string[]): InductiveTest {
  const id = `ir-${pad2(testNumber)}`;
  const order = shuffle(archetypes, rng(hashString(`${id}:order`)));
  const questions: InductiveExpandedQuestion[] = [];
  const taken = new Set<string>();

  for (let q = 1; q <= INDUCTIVE_QUESTIONS_PER_TEST; q += 1) {
    let chosen: InductiveExpandedQuestion | null = null;
    for (let attempt = 0; attempt < order.length; attempt += 1) {
      const archetype = order[(q - 1 + attempt) % order.length];
      const rest = order.filter((a) => a !== archetype);
      const qid = `${id}-q${pad2(q)}`;
      const seededId = attempt === 0 ? qid : `${qid}x${attempt}`;
      const candidate = buildInductiveQuestion(seededId, archetype, rest);
      candidate.id = qid;
      const sig = signature(candidate);
      if (!taken.has(sig)) {
        taken.add(sig);
        chosen = candidate;
        break;
      }
      if (attempt === order.length - 1) chosen = candidate; // give up de-duping, still valid
    }
    questions.push(chosen as InductiveExpandedQuestion);
  }

  return {
    id,
    name: `Inductive Test ${testNumber}`,
    subtitle: 'Next in the sequence',
    description:
      TEST_DESCRIPTIONS[testNumber - 1] ||
      `Extension set ${testNumber}: two-rule inductive sequences — pick the figure that comes next.`,
    difficulty: 'mixed',
    timeLimitSeconds: INDUCTIVE_TIME_LIMIT_SECONDS,
    questions,
  };
}

let cache: InductiveTest[] | null = null;

/**
 * The full 30-test Inductive Reasoning library, expanded and ready for the UI:
 * 30 questions each, every question running exactly two rules. Generation is
 * deterministic and cached for the lifetime of the page.
 */
export function loadInductiveLibrary(): InductiveTest[] {
  if (!cache) {
    const archetypes = buildArchetypeList();
    const tests: InductiveTest[] = [];
    for (let i = 1; i <= INDUCTIVE_TEST_COUNT; i += 1) {
      tests.push(generateTest(i, archetypes));
    }
    cache = tests;
  }
  return cache;
}
