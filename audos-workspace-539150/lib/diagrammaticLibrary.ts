// Casemate — Diagrammatic Reasoning FULL LIBRARY: 30 tests × 30 questions.
//
// This module is the expanded test library the founder asked for on top of the
// original 5 starter tests in lib/diagrammaticBank.ts:
//   * 10 EASY tests    — one predictable rule per question (rotation, fill
//                        flip, count change, size, position, shape type).
//   * 10 MEDIUM tests  — two rules running on the same figure at once.
//   * 10 HARD tests    — three or more simultaneous rules with near-miss
//                        distractors.
// Within each difficulty, ODD-numbered tests are the matrix / sequence format
// ("which figure comes next?") and EVEN-numbered tests are the Set A / Set B
// classification format — the same two families the five AssessmentDay
// practice booklets the founder supplied use.
//
// HOW IT WORKS. Hand-writing 900 question specs would be unmaintainable, so
// this module instead defines the ARCHETYPES those booklets are built from
// (each one tagged with the booklet pattern it recreates) and instantiates
// them through a SEEDED RNG: every parameter — shape, rotation step, fill
// trio, rule axis, set rule pair, answer — is drawn deterministically from the
// question id. The same build always produces the same 900 questions, so a
// candidate can retake "Hard Test 7" and compare scores meaningfully.
//
// Every generated spec is validated by actually expanding it through
// lib/diagrammatic.ts at build time; a spec the engine cannot expand (an
// impossible distractor set, an unsatisfiable set rule) is regenerated with a
// fresh seed rather than shipped, so the app never drops a question at
// runtime and every test holds exactly 30 questions.
//
// LANGUAGE: English end to end, same as the rest of the Aptitude Test app —
// the real aptitude round at Techcombank, Unilever, L'Oréal is sat in English.

import type {
  ColorName,
  ExpandedQuestion,
  ExpandedTest,
  FillStyle,
  GridType,
  PositionName,
  RuleSpec,
  ShapeType,
  SizeName,
} from './diagrammatic';
import { expandQuestion } from './diagrammatic';

export type LibraryDifficulty = 'easy' | 'medium' | 'hard';

export const LIBRARY_DIFFICULTIES: LibraryDifficulty[] = ['easy', 'medium', 'hard'];
export const TESTS_PER_DIFFICULTY = 10;
export const QUESTIONS_PER_TEST = 30;

const TIME_LIMIT_SECONDS: Record<LibraryDifficulty, number> = {
  easy: 1200, //  20 min for 30 questions — generous, the rules are single.
  medium: 1500, // 25 min — the pace real MT aptitude rounds run at.
  hard: 1800, //  30 min — three simultaneous rules need reading time.
};

const DIFFICULTY_TITLE: Record<LibraryDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

/* ========================================================================== *
 * Seeded RNG — local copies of the engine's mulberry32 + FNV hash (they are
 * module-private in lib/diagrammatic.ts on purpose; duplicating 12 lines is
 * cheaper than widening that module's API).
 * ========================================================================== */

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

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffleWith<T>(items: readonly T[], next: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickOne<T>(items: readonly T[], next: () => number): T {
  return items[Math.floor(next() * items.length)];
}

function trioFrom<T>(pool: readonly T[], next: () => number): T[] {
  return shuffleWith(pool, next).slice(0, 3);
}

/* ========================================================================== *
 * Value pools the archetypes draw from
 * ========================================================================== */

/** Rotation-order-1 shapes: EVERY rotation step is visibly different. */
const ROT_SHAPES: ShapeType[] = ['arrow', 'lshape', 'tshape', 'spiral'];
/** Shapes with a distinct silhouette for fill / count / size / colour rules. */
const PLAIN_SHAPES: ShapeType[] = [
  'circle', 'square', 'triangle', 'pentagon', 'hexagon',
  'star4', 'star5', 'star6', 'diamond', 'cross',
];

const FILL_TRIOS: FillStyle[][] = [
  ['outline', 'striped', 'solid'],
  ['outline', 'solid', 'dotted'],
  ['solid', 'half', 'outline'],
  ['striped', 'solid', 'outline'],
  ['dotted', 'outline', 'solid'],
];
const FILL_PAIRS: FillStyle[][] = [
  ['outline', 'solid'],
  ['solid', 'striped'],
  ['outline', 'dotted'],
  ['striped', 'outline'],
];
const SIZES: SizeName[] = ['small', 'medium', 'large'];
const POSITION_POOL: PositionName[] = [
  'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right',
];
const COLOR_TRIOS: ColorName[][] = [
  ['ink', 'red', 'blue'],
  ['red', 'blue', 'green'],
  ['ink', 'green', 'amber'],
  ['blue', 'amber', 'red'],
];
/** Distinct counts, all within the renderer's 1–4 layout range. */
const COUNT_TRIOS: number[][] = [
  [1, 2, 3], [3, 2, 1], [2, 3, 4], [4, 3, 2], [1, 3, 2], [2, 4, 3],
];
const TYPE_TRIOS: ShapeType[][] = [
  ['circle', 'square', 'triangle'],
  ['pentagon', 'hexagon', 'star6'],
  ['square', 'diamond', 'cross'],
  ['triangle', 'star5', 'hexagon'],
  ['circle', 'star4', 'pentagon'],
];
/** Rotation-visible trio for the hard "type AND rotation" archetype. */
const ROT_TYPE_TRIO: ShapeType[] = ['arrow', 'lshape', 'tshape'];

type CellAxis = 'byr' | 'byc';
const pickAxis = (next: () => number): CellAxis => (next() < 0.5 ? 'byr' : 'byc');
const otherAxis = (a: CellAxis): CellAxis => (a === 'byr' ? 'byc' : 'byr');

/* ========================================================================== *
 * Matrix / sequence archetypes
 *
 * Cycle-length rule for sequences: the visible cells must show the cycle
 * wrapping at least once (a 3-value cycle therefore only rides a 5-step
 * sequence, whose 4 visible cells show v1 v2 v3 v1), EXCEPT a monotonic count
 * run like 1-2-3-4 that spans the whole strip — there the progression itself
 * is the rule, exactly like booklet question Q12.
 * ========================================================================== */

interface MatrixDraft {
  g: GridType;
  t: ShapeType;
  r: Record<string, RuleSpec>;
  src: string;
}
type MatrixBuilder = (next: () => number) => MatrixDraft;

const EASY_MATRIX: MatrixBuilder[] = [
  // Rotation along a sequence.
  (next) => ({
    g: pickOne(['sequence_4', 'sequence_5'] as GridType[], next),
    t: pickOne(ROT_SHAPES, next),
    r: { rotation: ['col', 0, pickOne([45, 90, -90], next)] },
    src: 'AssessmentDay Test 2 (operator: rotate each step)',
  }),
  // Rotation across a 3x3 grid, by row or by column.
  (next) => ({
    g: '3x3',
    t: pickOne(ROT_SHAPES, next),
    r: { rotation: [pickOne(['col', 'row'], next), 0, pickOne([45, 90], next)] },
    src: 'AssessmentDay Test 2 (operator: rotate)',
  }),
  // Fill style decided by row / column.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: { fill: [pickAxis(next), ...pickOne(FILL_TRIOS, next)] },
    src: 'AssessmentDay Test 1 Q10 (striped / shaded / unshaded)',
  }),
  // Fill style cycling along a sequence.
  (next) => {
    const fills = next() < 0.5 ? pickOne(FILL_PAIRS, next) : pickOne(FILL_TRIOS, next);
    return {
      g: (fills.length === 2 && next() < 0.5 ? 'sequence_4' : 'sequence_5') as GridType,
      t: pickOne(PLAIN_SHAPES, next),
      r: { fill: ['cyc', ...fills] },
      src: 'AssessmentDay Test 1 Q15 (alternating shaded / unshaded)',
    };
  },
  // How many shapes per cell, decided by row / column.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: { count: [pickAxis(next), ...pickOne(COUNT_TRIOS, next)] },
    src: 'AssessmentDay Test 1 Q20 (counting shapes)',
  }),
  // Count running 1-2-3-4 (or back down) across the whole strip.
  (next) => ({
    g: 'sequence_4',
    t: pickOne(PLAIN_SHAPES, next),
    r: { count: ['cyc', ...pickOne([[1, 2, 3, 4], [4, 3, 2, 1]], next)] },
    src: 'AssessmentDay Test 1 Q12 (increasing count)',
  }),
  // Size decided by row / column.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: { size: [pickAxis(next), ...shuffleWith(SIZES, next)] },
    src: 'AssessmentDay Test 1 Q25 (comparing sizes)',
  }),
  // Size cycling along a 5-step sequence.
  (next) => ({
    g: 'sequence_5',
    t: pickOne(PLAIN_SHAPES, next),
    r: { size: ['cyc', ...shuffleWith(SIZES, next)] },
    src: 'AssessmentDay Test 1 Q25 (size cycle)',
  }),
  // Position inside the cell, decided by row / column.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: { position: [pickAxis(next), ...trioFrom(POSITION_POOL, next)] },
    src: 'AssessmentDay Test 1 Q22 (corner position)',
  }),
  // Shape type decided by row / column.
  (next) => ({
    g: '3x3',
    t: 'circle',
    r: { type: [pickAxis(next), ...pickOne(TYPE_TRIOS, next)] },
    src: 'AssessmentDay Test 1 Q11 (different shape types)',
  }),
  // Colour decided by row / column.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: { color: [pickAxis(next), ...pickOne(COLOR_TRIOS, next)] },
    src: 'AssessmentDay Test 3 (colour as a rule)',
  }),
];

const MEDIUM_MATRIX: MatrixBuilder[] = [
  // Rotation on one axis + fill on the other.
  (next) => {
    const rotDir = pickOne(['col', 'row'] as const, next);
    return {
      g: '3x3' as GridType,
      t: pickOne(ROT_SHAPES, next),
      r: {
        rotation: [rotDir, 0, pickOne([45, 90], next)],
        fill: [rotDir === 'col' ? 'byr' : 'byc', ...pickOne(FILL_TRIOS, next)],
      },
      src: 'AssessmentDay Test 2 (two operators in series)',
    };
  },
  // Two crossed latin squares: size one way, fill the other.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: {
      size: ['lat', ...shuffleWith(SIZES, next)],
      fill: ['latr', ...pickOne(FILL_TRIOS, next)],
    },
    src: 'AssessmentDay Test 4 (no repeat within a row or column)',
  }),
  // Sequence: rotation step + size cycle.
  (next) => ({
    g: 'sequence_5',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, pickOne([45, 90], next)],
      size: ['cyc', ...shuffleWith(SIZES, next)],
    },
    src: 'AssessmentDay Test 2 (two-property sequence)',
  }),
  // Count on one axis + colour on the other.
  (next) => {
    const a = pickAxis(next);
    return {
      g: '3x3' as GridType,
      t: pickOne(PLAIN_SHAPES, next),
      r: {
        count: [a, ...pickOne(COUNT_TRIOS, next)],
        color: [otherAxis(a), ...pickOne(COLOR_TRIOS, next)],
      },
      src: 'AssessmentDay Test 3 (colour as a rule)',
    };
  },
  // Rotation gaining on BOTH axes at once.
  (next) => ({
    g: '3x3',
    t: pickOne(ROT_SHAPES, next),
    r: { rotation: ['grid', 0, pickOne([45, 90], next), pickOne([45, 90], next)] },
    src: 'AssessmentDay Test 2 (rotation across both rows and columns)',
  }),
  // Count latin square + position by row / column.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: {
      count: ['lat', ...pickOne(COUNT_TRIOS, next)],
      position: [pickAxis(next), ...trioFrom(POSITION_POOL, next)],
    },
    src: 'AssessmentDay Test 1 Q22 (position + count)',
  }),
  // Sequence: rotation + alternating fill.
  (next) => ({
    g: pickOne(['sequence_4', 'sequence_5'] as GridType[], next),
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, pickOne([90, -90], next)],
      fill: ['cyc', ...pickOne(FILL_PAIRS, next)],
    },
    src: 'AssessmentDay Test 2 (rotation + alternating fill)',
  }),
  // Shape-type latin square + fill by row / column.
  (next) => ({
    g: '3x3',
    t: 'circle',
    r: {
      type: ['lat', ...pickOne(TYPE_TRIOS, next)],
      fill: [pickAxis(next), ...pickOne(FILL_TRIOS, next)],
    },
    src: 'AssessmentDay Test 4 (shape type + fill style)',
  }),
  // Size and count moving on opposite axes.
  (next) => {
    const a = pickAxis(next);
    return {
      g: '3x3' as GridType,
      t: pickOne(PLAIN_SHAPES, next),
      r: {
        size: [a, ...shuffleWith(SIZES, next)],
        count: [otherAxis(a), ...pickOne(COUNT_TRIOS, next)],
      },
      src: 'AssessmentDay Test 5 (size + count moving in opposite directions)',
    };
  },
  // Sequence: anticlockwise rotation + count pair.
  (next) => ({
    g: 'sequence_5',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, pickOne([-45, 45], next)],
      count: ['cyc', ...pickOne([[1, 2], [2, 1], [1, 3]], next)],
    },
    src: 'AssessmentDay Test 2 (anticlockwise rotation)',
  }),
  // Position on one axis + fill on the other.
  (next) => {
    const a = pickAxis(next);
    return {
      g: '3x3' as GridType,
      t: pickOne(PLAIN_SHAPES, next),
      r: {
        position: [a, ...trioFrom(POSITION_POOL, next)],
        fill: [otherAxis(a), ...pickOne(FILL_TRIOS, next)],
      },
      src: 'AssessmentDay Test 1 Q22 (corner position + fill)',
    };
  },
];

const HARD_MATRIX: MatrixBuilder[] = [
  // Rotation + fill + size latin square, all at once.
  (next) => ({
    g: '3x3',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, pickOne([45, 90], next)],
      fill: ['byr', ...pickOne(FILL_TRIOS, next)],
      size: ['lat', ...shuffleWith(SIZES, next)],
    },
    src: 'AssessmentDay Test 2 (three operators in series)',
  }),
  // Shape type + rotation + fill (rotation-visible type trio only).
  (next) => ({
    g: '3x3',
    t: 'arrow',
    r: {
      type: ['lat', ...shuffleWith(ROT_TYPE_TRIO, next)],
      rotation: ['row', 0, 90],
      fill: ['byc', ...pickOne(FILL_TRIOS, next)],
    },
    src: 'AssessmentDay Test 4 (shape type + rotation + fill)',
  }),
  // Count latin square + fill counter-latin + position by row.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: {
      count: ['lat', ...pickOne(COUNT_TRIOS, next)],
      fill: ['latr', ...pickOne(FILL_TRIOS, next)],
      position: ['byr', ...trioFrom(POSITION_POOL, next)],
    },
    src: 'AssessmentDay Test 1 Q1 (shaded shapes + position)',
  }),
  // Sequence: rotation + size cycle + fill pair.
  (next) => ({
    g: 'sequence_5',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, 45],
      size: ['cyc', ...shuffleWith(SIZES, next)],
      fill: ['cyc', ...pickOne(FILL_PAIRS, next)],
    },
    src: 'AssessmentDay Test 2 (three-property sequence)',
  }),
  // Three properties on three different grid logics.
  (next) => ({
    g: '3x3',
    t: pickOne(PLAIN_SHAPES, next),
    r: {
      count: ['lat', ...pickOne(COUNT_TRIOS, next)],
      size: ['latr', ...shuffleWith(SIZES, next)],
      fill: ['byr', ...pickOne(FILL_TRIOS, next)],
    },
    src: 'AssessmentDay Test 5 (three latin-square properties)',
  }),
  // Two-way rotation + count + fill.
  (next) => ({
    g: '3x3',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['grid', 0, pickOne([45, 90], next), pickOne([45, 90], next)],
      count: ['byc', ...pickOne(COUNT_TRIOS, next)],
      fill: ['byr', ...pickOne(FILL_TRIOS, next)],
    },
    src: 'AssessmentDay Test 2 (two-way rotation + count)',
  }),
  // Sequence: three rules on offset cycle lengths.
  (next) => ({
    g: 'sequence_5',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, 90],
      fill: ['cyc', ...pickOne(FILL_TRIOS, next)],
      count: ['cyc', ...pickOne([[1, 2], [2, 1]], next)],
    },
    src: 'AssessmentDay Test 2 (three rules on offset cycles)',
  }),
  // Three overlapping latin squares.
  (next) => ({
    g: '3x3',
    t: 'pentagon',
    r: {
      type: ['latr', ...pickOne(TYPE_TRIOS, next)],
      fill: ['lat', ...pickOne(FILL_TRIOS, next)],
      size: ['byr', ...shuffleWith(SIZES, next)],
    },
    src: 'AssessmentDay Test 4 (three overlapping latin squares)',
  }),
  // Rotation + position + count, all latin-square or column driven.
  (next) => ({
    g: '3x3',
    t: 'arrow',
    r: {
      rotation: ['lat', 0, 120, 240],
      position: ['lat', ...trioFrom(POSITION_POOL, next)],
      count: ['byc', ...pickOne(COUNT_TRIOS, next)],
    },
    src: 'AssessmentDay Test 5 (rotation + position + count)',
  }),
  // Sequence: three different cycle lengths at once.
  (next) => ({
    g: 'sequence_5',
    t: pickOne(ROT_SHAPES, next),
    r: {
      rotation: ['col', 0, 45],
      size: ['cyc', 'small', 'large'],
      position: ['cyc', ...trioFrom(POSITION_POOL, next)],
    },
    src: 'AssessmentDay Test 2 (three different cycle lengths)',
  }),
];

/* ========================================================================== *
 * Set A / Set B archetypes
 * ========================================================================== */

interface SetDraft {
  t: ShapeType[];
  a: RuleSpec;
  b: RuleSpec;
  /** false when the two rules cover every figure (even vs odd) — no "neither". */
  allowC: boolean;
  src: string;
}
type SetBuilder = (next: () => number) => SetDraft;

const SINGLE_POOLS: ShapeType[][] = [
  ['star5'], ['circle'], ['triangle'], ['hexagon'], ['diamond'], ['cross'],
];
const MIX_POOLS: ShapeType[][] = [
  ['circle', 'square', 'triangle'],
  ['square', 'triangle', 'hexagon'],
  ['circle', 'square', 'triangle', 'pentagon', 'hexagon'],
  ['square', 'pentagon', 'star5', 'circle'],
  ['triangle', 'star5', 'hexagon', 'diamond'],
];
/** Straight-edged shapes only, for `edges` sums (3/4/5/6/8 edges). */
const EDGE_POOL: ShapeType[] = ['triangle', 'square', 'pentagon', 'hexagon', 'star4'];

const EASY_SET: SetBuilder[] = [
  // Counting shapes: exactly n vs exactly m.
  (next) => {
    const n = pickOne([2, 3, 4, 5], next);
    const m = pickOne([2, 3, 4, 5].filter((v) => v !== n), next);
    return {
      t: pickOne(SINGLE_POOLS, next),
      a: ['count', n],
      b: ['count', m],
      allowC: true,
      src: 'AssessmentDay Test 1 Q1 / Q24 (counting shapes)',
    };
  },
  // How many shapes are shaded.
  (next) => {
    const n = pickOne([1, 2], next);
    return {
      t: pickOne(MIX_POOLS, next),
      a: ['shaded', n],
      b: ['shaded', n + 1],
      allowC: true,
      src: 'AssessmentDay Test 1 Q4 (number of shaded shapes)',
    };
  },
  // How many different KINDS of shape.
  (next) => ({
    t: ['circle', 'square', 'triangle', 'pentagon', 'hexagon'],
    a: ['distinct', 3],
    b: ['distinct', 2],
    allowC: true,
    src: 'AssessmentDay Test 1 Q11 (number of different shape KINDS)',
  }),
  // How many shapes are large.
  (next) => ({
    t: pickOne(MIX_POOLS, next),
    a: ['large', 1],
    b: ['large', 2],
    allowC: true,
    src: 'AssessmentDay Test 1 Q25 (comparing sizes)',
  }),
];

const MEDIUM_SET: SetBuilder[] = [
  // How many shapes are striped.
  (next) => {
    const n = pickOne([1, 2], next);
    return {
      t: pickOne(MIX_POOLS, next),
      a: ['striped', n],
      b: ['striped', n + 1],
      allowC: true,
      src: 'AssessmentDay Test 1 Q10 / Q21 (striped shapes)',
    };
  },
  // Even vs odd number of shapes — no figure can be "neither".
  (next) => {
    const evenFirst = next() < 0.5;
    return {
      t: pickOne(MIX_POOLS, next),
      a: ['parity', evenFirst ? 'even' : 'odd'],
      b: ['parity', evenFirst ? 'odd' : 'even'],
      allowC: false,
      src: 'AssessmentDay Test 1 Q12 (even / odd count)',
    };
  },
  // More shape kinds to tell apart.
  (next) => ({
    t: ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star5'],
    a: ['distinct', 3],
    b: ['distinct', 4],
    allowC: true,
    src: 'AssessmentDay Test 1 Q11 (number of shape kinds)',
  }),
  // Cross-over pair: a COUNT rule against a SHADED rule.
  (next) => ({
    t: pickOne(MIX_POOLS, next),
    a: ['count', pickOne([4, 5], next)],
    b: ['shaded', pickOne([1, 2], next)],
    allowC: true,
    src: 'AssessmentDay Test 1 Q13 (two unrelated rules)',
  }),
  // How many shapes are large, higher counts.
  (next) => ({
    t: pickOne(MIX_POOLS, next),
    a: ['large', 2],
    b: ['large', 3],
    allowC: true,
    src: 'AssessmentDay Test 1 Q25 (comparing sizes)',
  }),
  // Shaded counts, higher.
  (next) => ({
    t: pickOne(MIX_POOLS, next),
    a: ['shaded', 2],
    b: ['shaded', 3],
    allowC: true,
    src: 'AssessmentDay Test 1 Q24 (number of shaded shapes)',
  }),
  // Total straight edges, gentle sums.
  (next) => {
    const pair = pickOne([[9, 12], [12, 9], [10, 13]], next);
    return {
      t: EDGE_POOL.slice(0, 4),
      a: ['edges', pair[0]],
      b: ['edges', pair[1]],
      allowC: true,
      src: 'AssessmentDay Test 1 Q19 (total straight edges)',
    };
  },
];

const HARD_SET: SetBuilder[] = [
  // Total straight edges, harder sums.
  (next) => {
    const pair = pickOne([[16, 10], [12, 15], [10, 14], [15, 11]], next);
    return {
      t: EDGE_POOL,
      a: ['edges', pair[0]],
      b: ['edges', pair[1]],
      allowC: true,
      src: 'AssessmentDay Test 1 Q19 / Q30 (total straight edges)',
    };
  },
  // Curved-edge family vs straight-edge family.
  (next) => {
    const curvedFirst = next() < 0.5;
    return {
      t: ['circle', 'spiral', 'square', 'pentagon', 'triangle'],
      a: ['family', curvedFirst ? 'curved' : 'straight'],
      b: ['family', curvedFirst ? 'straight' : 'curved'],
      allowC: true,
      src: 'AssessmentDay Test 1 Q5 (curved vs straight edges)',
    };
  },
  // Shaded count vs striped count — two fill rules crossing over.
  (next) => ({
    t: pickOne(MIX_POOLS, next),
    a: ['shaded', pickOne([1, 2, 3], next)],
    b: ['striped', pickOne([1, 2], next)],
    allowC: true,
    src: 'AssessmentDay Test 1 Q13 / Q29 (fill style rules crossing over)',
  }),
  // Even vs odd — still no "neither" possible.
  (next) => {
    const oddFirst = next() < 0.5;
    return {
      t: pickOne([['star4', 'triangle'], ['star5', 'circle'], ['diamond', 'cross']] as ShapeType[][], next),
      a: ['parity', oddFirst ? 'odd' : 'even'],
      b: ['parity', oddFirst ? 'even' : 'odd'],
      allowC: false,
      src: 'AssessmentDay Test 1 Q12 (even / odd)',
    };
  },
  // Four shape kinds vs three.
  (next) => ({
    t: ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star5'],
    a: ['distinct', 4],
    b: ['distinct', 3],
    allowC: true,
    src: 'AssessmentDay Test 1 Q11 (number of shape kinds)',
  }),
  // Bigger counting blocks.
  (next) => {
    const pair = pickOne([[6, 4], [5, 3], [6, 5], [4, 6]], next);
    return {
      t: pickOne(SINGLE_POOLS, next),
      a: ['count', pair[0]],
      b: ['count', pair[1]],
      allowC: true,
      src: 'AssessmentDay Test 1 Q3 / Q26 (counting blocks)',
    };
  },
  // Three striped vs one striped.
  (next) => ({
    t: pickOne(MIX_POOLS, next),
    a: ['striped', 3],
    b: ['striped', 1],
    allowC: true,
    src: 'AssessmentDay Test 1 Q21 (counting striped shapes)',
  }),
  // Cross-over pair: COUNT vs how many KINDS.
  (next) => ({
    t: pickOne([
      ['square', 'pentagon', 'star5', 'circle'],
      ['triangle', 'star5', 'hexagon', 'diamond'],
    ] as ShapeType[][], next),
    a: ['count', 5],
    b: ['distinct', 2],
    allowC: true,
    src: 'AssessmentDay Test 1 Q13 (two unrelated rules)',
  }),
];

/** How often the answer is "neither set" at each difficulty. */
const NEITHER_WEIGHT: Record<LibraryDifficulty, number> = {
  easy: 0.18,
  medium: 0.24,
  hard: 0.3,
};

function chooseSetAnswer(
  draft: SetDraft,
  difficulty: LibraryDifficulty,
  next: () => number,
): 'A' | 'B' | 'C' {
  if (draft.allowC && next() < NEITHER_WEIGHT[difficulty]) return 'C';
  return next() < 0.5 ? 'A' : 'B';
}

/* ========================================================================== *
 * Assembly: 3 difficulties × 10 tests × 30 validated questions
 * ========================================================================== */

const MATRIX_BUILDERS: Record<LibraryDifficulty, MatrixBuilder[]> = {
  easy: EASY_MATRIX,
  medium: MEDIUM_MATRIX,
  hard: HARD_MATRIX,
};
const SET_BUILDERS: Record<LibraryDifficulty, SetBuilder[]> = {
  easy: EASY_SET,
  medium: MEDIUM_SET,
  hard: HARD_SET,
};

const MATRIX_DESCRIPTION: Record<LibraryDifficulty, string> = {
  easy:
    'Single-rule matrices and sequences: one predictable rule per question — rotation, fill, count, size, position or shape type. Start here if the format is new to you.',
  medium:
    'Two rules running in parallel on every figure (rotation + fill, count + colour, crossed latin squares) — the level most MT aptitude rounds actually test.',
  hard:
    'Three rules on one figure at the same time, with near-miss distractors built to punish a rushed answer. Clear these and the real round will feel slow.',
};
const SET_DESCRIPTION: Record<LibraryDifficulty, string> = {
  easy:
    'The Set A / Set B format of the source booklets with one simple rule per set: how many shapes, how many are shaded, how many kinds, how many are large.',
  medium:
    'Set A / Set B with subtler rules: striped counts, odd vs even, four kinds of shape vs three, and pairs of unrelated rules crossing over.',
  hard:
    'The hardest classification sets: total straight edges, curved vs straight families, crossing fill rules — and a good share of answers that are “neither set”.',
};

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * What the candidate actually SEES in a question — used to reject a generated
 * question that is pixel-identical to one already in the same test (the seeded
 * parameter space is finite, so 30 draws can occasionally collide).
 */
function visualSignature(question: ExpandedQuestion): string {
  if (question.kind === 'matrix') {
    // Options are excluded on purpose: two questions with the same visible
    // cells ARE the same puzzle even when the option shuffle differs.
    return JSON.stringify(['m', question.gridType, question.cells]);
  }
  return JSON.stringify(['s', question.setA, question.setB, question.figure]);
}

function generateQuestion(
  testId: string,
  difficulty: LibraryDifficulty,
  format: 'matrix' | 'set_ab',
  questionNumber: number,
  archetypeOrder: number[],
  taken: Set<string>,
): ExpandedQuestion {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const qid = attempt === 0
      ? `${testId}-q${pad2(questionNumber)}`
      : `${testId}-q${pad2(questionNumber)}x${attempt}`;
    const next = rng(hashString(qid));
    const builderIndex = archetypeOrder[(questionNumber - 1 + attempt) % archetypeOrder.length];
    try {
      let expanded: ExpandedQuestion;
      if (format === 'matrix') {
        const draft = MATRIX_BUILDERS[difficulty][builderIndex](next);
        expanded = expandQuestion({ id: qid, d: difficulty, g: draft.g, t: draft.t, r: draft.r, src: draft.src });
      } else {
        const draft = SET_BUILDERS[difficulty][builderIndex](next);
        const ans = chooseSetAnswer(draft, difficulty, next);
        expanded = expandQuestion({
          id: qid, d: difficulty, g: 'set_ab', t: draft.t, a: draft.a, b: draft.b, ans, src: draft.src,
        });
      }
      const signature = visualSignature(expanded);
      if (taken.has(signature)) continue; // identical twin in this test — redraw
      taken.add(signature);
      return expanded;
    } catch (error) {
      /* an unexpandable draft — try again with a fresh seed / next archetype */
    }
  }
  // Absolute fallback: two specs the engine can always expand, so a test can
  // never come up short of 30 questions.
  const qid = `${testId}-q${pad2(questionNumber)}f`;
  return expandQuestion(
    format === 'matrix'
      ? { id: qid, d: difficulty, g: '3x3', t: 'square', r: { fill: ['byr', 'outline', 'striped', 'solid'] } }
      : { id: qid, d: difficulty, g: 'set_ab', t: ['star5'], a: ['count', 4], b: ['count', 3], ans: 'A' },
  );
}

function generateTest(difficulty: LibraryDifficulty, indexInDifficulty: number): ExpandedTest {
  // Odd tests are matrix / sequence, even tests are Set A / Set B — same two
  // families as the AssessmentDay booklets, evenly represented.
  const format: 'matrix' | 'set_ab' = indexInDifficulty % 2 === 1 ? 'matrix' : 'set_ab';
  const id = `dr-${difficulty}-${pad2(indexInDifficulty)}`;
  const builders = format === 'matrix' ? MATRIX_BUILDERS[difficulty] : SET_BUILDERS[difficulty];
  // Per-test archetype rotation so every test covers the full rule vocabulary
  // in its own order.
  const archetypeOrder = shuffleWith(
    builders.map((_, i) => i),
    rng(hashString(`${id}:order`)),
  );

  const questions: ExpandedQuestion[] = [];
  const taken = new Set<string>();
  for (let q = 1; q <= QUESTIONS_PER_TEST; q += 1) {
    questions.push(generateQuestion(id, difficulty, format, q, archetypeOrder, taken));
  }

  return {
    id,
    name: `${DIFFICULTY_TITLE[difficulty]} Test ${indexInDifficulty}`,
    format,
    subtitle: format === 'matrix' ? 'Matrices & sequences' : 'Set A / Set B',
    description: format === 'matrix' ? MATRIX_DESCRIPTION[difficulty] : SET_DESCRIPTION[difficulty],
    difficulty,
    timeLimitSeconds: TIME_LIMIT_SECONDS[difficulty],
    questions,
  };
}

let cache: ExpandedTest[] | null = null;

/**
 * The full 30-test Diagrammatic Reasoning library, expanded and ready for the
 * UI: 10 Easy, then 10 Medium, then 10 Hard, 30 questions each. Generation is
 * deterministic and the result is cached for the lifetime of the page.
 */
export function loadDiagrammaticLibrary(): ExpandedTest[] {
  if (!cache) {
    const tests: ExpandedTest[] = [];
    LIBRARY_DIFFICULTIES.forEach((difficulty) => {
      for (let i = 1; i <= TESTS_PER_DIFFICULTY; i += 1) {
        tests.push(generateTest(difficulty, i));
      }
    });
    cache = tests;
  }
  return cache;
}
