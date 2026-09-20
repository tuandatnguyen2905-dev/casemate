// Casemate — Spatial Reasoning FULL LIBRARY: 30 tests × 30 questions.
//
// The eight supplied AssessmentDay PDFs establish the visual language: sparse
// monochrome diagrams, four labelled options, mental rotation, rearranging
// pieces, cube / box / pyramid folding and top / bottom views. This original
// bank covers those families — including dominant isometric 3D rotation and
// both folding directions — plus reflection, odd-one-out, sequence and matrix
// completion. It does not reproduce the copyrighted source questions.
//
// Each test contains exactly 9 Easy, 12 Medium and 9 Hard questions (30 / 40 /
// 30 percent). All parameters and option orders come from the question id, so
// tests are stable on retake. A global visual-signature check rejects duplicate
// puzzles across the whole 900-question library.

import {
  buildSpatialQuestion,
  spatialHash,
  spatialVisualSignature,
  SPATIAL_SUBTYPES,
  type SpatialDifficulty,
  type SpatialExpandedQuestion,
  type SpatialSubtype,
  type SpatialTest,
} from './spatial';

export const SPATIAL_TEST_COUNT = 30;
export const SPATIAL_QUESTIONS_PER_TEST = 30;
export const SPATIAL_TIME_LIMIT_SECONDS = 1200;

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

function pad2(n: number): string { return String(n).padStart(2, '0'); }

const DIFFICULTIES: SpatialDifficulty[] = [
  ...Array(9).fill('easy' as SpatialDifficulty),
  ...Array(12).fill('medium' as SpatialDifficulty),
  ...Array(9).fill('hard' as SpatialDifficulty),
];

const SUBTYPE_LABEL: Record<SpatialSubtype, string> = {
  rotation: 'rotation',
  reflection: 'mirror images',
  odd_one_out: 'rotation odd-one-out',
  sequence: 'spatial sequences',
  matrix: 'matrix completion',
  folding: '3D folding',
  unfolding: '3D unfolding',
  block_rotation: 'isometric 3D rotation',
  top_view: 'top views',
  assembly: 'piece assembly',
};

function subtypeSchedule(testId: string): SpatialSubtype[] {
  const order = shuffle(SPATIAL_SUBTYPES, rng(spatialHash(`${testId}:subtypes`)));
  const result: SpatialSubtype[] = [];
  for (let i = 0; i < SPATIAL_QUESTIONS_PER_TEST; i += 1) result.push(order[i % order.length]);
  return result;
}

function buildUnique(
  baseId: string,
  subtype: SpatialSubtype,
  difficulty: SpatialDifficulty,
  taken: Set<string>,
): SpatialExpandedQuestion {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const seedId = attempt === 0 ? baseId : `${baseId}x${attempt}`;
    try {
      const candidate = buildSpatialQuestion(seedId, subtype, difficulty);
      const signature = spatialVisualSignature(candidate);
      if (taken.has(signature)) continue;
      taken.add(signature);
      return { ...candidate, id: baseId };
    } catch (error) {
      // Some seeded piece silhouettes can collapse two distractors into the
      // same outline. A fresh deterministic seed redraws that question.
    }
  }
  throw new Error(`Could not generate a unique spatial question for ${baseId}.`);
}

function generateTest(testNumber: number, taken: Set<string>): SpatialTest {
  const id = `sr-${pad2(testNumber)}`;
  const difficulties = shuffle(DIFFICULTIES, rng(spatialHash(`${id}:difficulty`)));
  const subtypes = subtypeSchedule(id);
  const questions: SpatialExpandedQuestion[] = [];

  for (let q = 1; q <= SPATIAL_QUESTIONS_PER_TEST; q += 1) {
    questions.push(buildUnique(`${id}-q${pad2(q)}`, subtypes[q - 1], difficulties[q - 1], taken));
  }

  const represented = Array.from(new Set(subtypes.map((subtype) => SUBTYPE_LABEL[subtype])));
  return {
    id,
    name: `Test ${testNumber}`,
    subtitle: 'Mixed spatial reasoning',
    description: `A balanced mix of ${represented.slice(0, -1).join(', ')} and ${represented[represented.length - 1]}.`,
    difficulty: 'mixed',
    difficultyBreakdown: '9 Easy · 12 Medium · 9 Hard',
    timeLimitSeconds: SPATIAL_TIME_LIMIT_SECONDS,
    questions,
  };
}

let cache: SpatialTest[] | null = null;

export function loadSpatialLibrary(): SpatialTest[] {
  if (!cache) {
    const tests: SpatialTest[] = [];
    const taken = new Set<string>();
    for (let test = 1; test <= SPATIAL_TEST_COUNT; test += 1) tests.push(generateTest(test, taken));
    cache = tests;
  }
  return cache;
}
