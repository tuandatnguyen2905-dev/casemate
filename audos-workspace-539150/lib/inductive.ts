// Casemate — Inductive Reasoning engine.
//
// Same design philosophy as lib/diagrammatic.ts: a question is never a scanned
// image with a hand-keyed answer. Every figure is DERIVED from a rule, so the
// picture and the answer key can never disagree. An Inductive Reasoning
// question shows a SEQUENCE of five figures (the pattern playing out) and asks
// the candidate to pick the sixth from five options A–E.
//
// Every question runs EXACTLY TWO independent rules — the format the four
// AssessmentDay booklets the founder supplied are built from (line direction,
// object movement clockwise / anticlockwise, fill alternation, rotation, count
// increment, Fibonacci counts, size progression, edge/side counts, shaded
// segment rotation, mirroring, symbol substitution, grid position, dot
// clusters). After submission the two rules are written out in plain English
// (Rule 1 / Rule 2), exactly like Diagrammatic Reasoning.
//
// LANGUAGE: English end to end — the real aptitude round is sat in English.
//
// HOW IT WORKS. A figure is a flat list of RESOLVED SVG primitives (positions,
// radii, rotations already computed). A "module" owns one rule: it produces the
// six states of a sequence, renders any state to primitives, and knows how to
// build near-miss WRONG states (the mistakes a real candidate makes — wrong
// rotation direction, off-by-one count, wrong fill). A question composes two
// modules — either one DUAL module carrying both rules on a single figure, or a
// centre module plus a corner module — then builds four distractors that each
// differ from the correct sixth figure on at least one rule. Everything is
// seeded from the question id, so the same build always yields the same test.

/* ========================================================================== *
 * Figure primitives (resolved geometry inside a 100x100 box)
 * ========================================================================== */

export type Fill = 'solid' | 'none' | 'striped' | 'half';

export type Prim =
  | { k: 'poly'; cx: number; cy: number; r: number; sides: number; rot: number; fill: Fill }
  | { k: 'circle'; cx: number; cy: number; r: number; fill: Fill }
  | { k: 'rect'; cx: number; cy: number; w: number; h: number; rot: number; fill: Fill }
  | { k: 'line'; x1: number; y1: number; x2: number; y2: number; w?: number }
  | { k: 'arrow'; cx: number; cy: number; len: number; rot: number; fill: Fill; notches?: number }
  | { k: 'dot'; cx: number; cy: number; r: number; fill: Fill }
  | { k: 'text'; cx: number; cy: number; s: string; size: number }
  | { k: 'star'; cx: number; cy: number; r: number; tips: number; rot: number; fill: Fill }
  | { k: 'seg'; cx: number; cy: number; r: number; segs: number; shaded: number[]; startDeg: number }
  | { k: 'lshape'; cx: number; cy: number; r: number; rot: number; flip: 1 | -1; fill: Fill };

export interface Figure {
  prims: Prim[];
}

/* ========================================================================== *
 * Seeded RNG (mulberry32) + FNV hash — local copies, same as the diagrammatic
 * engine (module-private there on purpose).
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

export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pick<T>(items: readonly T[], next: () => number): T {
  return items[Math.floor(next() * items.length)];
}

function norm(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function dirWord(step: number): string {
  return step >= 0 ? 'clockwise' : 'anticlockwise';
}

/* ========================================================================== *
 * Layout constants
 * ========================================================================== */

const CX = 50;
const CY = 51;
// A small marker parked in the top-right corner for the "secondary" rule.
const CORNER = { cx: 79, cy: 21 };
// Eight positions around a box perimeter, clockwise from the top-left corner.
const BOX_MIN = 22;
const BOX_MAX = 80;
const BOX_MID = (BOX_MIN + BOX_MAX) / 2;
const PERIMETER: [number, number][] = [
  [BOX_MIN, BOX_MIN], [BOX_MID, BOX_MIN], [BOX_MAX, BOX_MIN], [BOX_MAX, BOX_MID],
  [BOX_MAX, BOX_MAX], [BOX_MID, BOX_MAX], [BOX_MIN, BOX_MAX], [BOX_MIN, BOX_MID],
];
// Four corners a small marker can sit in, clockwise from the top-left.
const CORNERS: [number, number][] = [[27, 28], [73, 28], [73, 74], [27, 74]];
// 3x3 grid cell centres.
const GRID_CENTERS: [number, number][] = (() => {
  const out: [number, number][] = [];
  const start = 33;
  const stepGap = 17;
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      out.push([start + col * stepGap, start - 4 + row * stepGap]);
    }
  }
  return out;
})();

/** Compact grid layout offsets for laying out N little shapes in the centre. */
function clusterOffsets(n: number): [number, number][] {
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const gap = 15;
  const out: [number, number][] = [];
  let placed = 0;
  for (let row = 0; row < rows; row += 1) {
    const inRow = Math.min(cols, n - placed);
    for (let col = 0; col < inRow; col += 1) {
      const x = (col - (inRow - 1) / 2) * gap;
      const y = (row - (rows - 1) / 2) * gap;
      out.push([x, y]);
      placed += 1;
    }
  }
  return out;
}

/* ========================================================================== *
 * Shared value pools
 * ========================================================================== */

const COUNT_SHAPE_SIDES = [3, 4, 5, 6]; // triangle / square / pentagon / hexagon little shapes
const SYMBOLS = ['@', '&', '£', '$', '?', '§', '#', '%'];
const SIZE_RADII = [9, 12, 15, 18, 21, 24];

/* ========================================================================== *
 * Module contracts
 * ========================================================================== */

interface UnitModule {
  name: string;
  period2: boolean;
  make(next: () => number): { states: any[]; rule: string };
  render(state: any): Prim[];
  distract(final: any, next: () => number): any[];
  key(state: any): string;
}

interface DualModule {
  name: string;
  make(next: () => number): { states: any[]; rule1: string; rule2: string };
  render(state: any): Prim[];
  distract(final: any, next: () => number): any[];
  key(state: any): string;
}

const POLY_NAME: Record<number, string> = {
  3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon',
};

/* ========================================================================== *
 * Centre modules (safe to combine with a corner module)
 * ========================================================================== */

/** A rotating arrow — rotation is fully visible (no rotational symmetry). */
const rotor: UnitModule = {
  name: 'Rotation',
  period2: false,
  make(next) {
    const step = pick([45, 90, -45, -90], next);
    const start = pick([0, 45, 90, 135, 180], next) * (next() < 0.5 ? 1 : 1);
    const states = Array.from({ length: 6 }, (_, i) => norm(start + step * i));
    return {
      states,
      rule: `The arrow rotates ${Math.abs(step)}° ${dirWord(step)} each step.`,
    };
  },
  render(deg) {
    return [{ k: 'arrow', cx: CX, cy: CY, len: 44, rot: deg, fill: 'solid' }];
  },
  distract(final, next) {
    const opts = [norm(final + 45), norm(final - 45), norm(final + 90), norm(final - 90), norm(final + 180)];
    return shuffle(opts, next);
  },
  key(deg) {
    return `rot:${deg}`;
  },
};

/** A regular polygon that gains (or loses) a side each step. */
const polyEdges: UnitModule = {
  name: 'Number of sides',
  period2: false,
  make(next) {
    const up = next() < 0.7;
    const start = up ? pick([3, 4], next) : pick([7, 8], next);
    const step = up ? 1 : -1;
    const states = Array.from({ length: 6 }, (_, i) => Math.min(9, Math.max(3, start + step * i)));
    return {
      states,
      rule: up
        ? 'The shape gains one side each step (triangle → square → pentagon …).'
        : 'The shape loses one side each step (octagon → heptagon → hexagon …).',
    };
  },
  render(sides) {
    return [{ k: 'poly', cx: CX, cy: CY, r: 25, sides, rot: 0, fill: 'none' }];
  },
  distract(final, next) {
    const opts = [final + 1, final - 1, final + 2, final - 2].map((v) => Math.min(9, Math.max(3, v)));
    return shuffle(opts.filter((v) => v !== final), next);
  },
  key(sides) {
    return `poly:${sides}`;
  },
};

/** A circle split into eight segments with one shaded wedge that rotates. */
const segDial: UnitModule = {
  name: 'Shaded segment',
  period2: false,
  make(next) {
    const step = pick([1, 2, -1, -2], next);
    const start = Math.floor(next() * 8);
    const states = Array.from({ length: 6 }, (_, i) => ((start + step * i) % 8 + 8) % 8);
    return {
      states,
      rule: `The shaded segment moves ${Math.abs(step)} place${Math.abs(step) === 1 ? '' : 's'} ${dirWord(step)} around the ring each step.`,
    };
  },
  render(idx) {
    return [{ k: 'seg', cx: CX, cy: CY, r: 25, segs: 8, shaded: [idx], startDeg: -90 }];
  },
  distract(final, next) {
    const opts = [(final + 1) % 8, (final + 7) % 8, (final + 2) % 8, (final + 4) % 8];
    return shuffle(opts.filter((v) => v !== final), next);
  },
  key(idx) {
    return `seg:${idx}`;
  },
};

/** N identical little shapes — the count climbs by one each step. */
const countShapes: UnitModule = {
  name: 'Count',
  period2: false,
  make(next) {
    const sides = pick(COUNT_SHAPE_SIDES, next);
    const start = pick([1, 2], next);
    const states = Array.from({ length: 6 }, (_, i) => start + i);
    return {
      states: states.map((n) => ({ n, sides })),
      rule: `The number of ${POLY_NAME[sides]}s increases by one each step.`,
    };
  },
  render(s) {
    const offs = clusterOffsets(s.n);
    const r = s.n <= 2 ? 8 : s.n <= 4 ? 6.5 : 5.2;
    return offs.map((o) => ({ k: 'poly', cx: CX + o[0], cy: CY + o[1], r, sides: s.sides, rot: 0, fill: 'solid' } as Prim));
  },
  distract(final, next) {
    const opts = [final.n + 1, final.n - 1, final.n + 2].filter((n) => n >= 1).map((n) => ({ n, sides: final.sides }));
    return shuffle(opts, next);
  },
  key(s) {
    return `count:${s.n}:${s.sides}`;
  },
};

/** One shape that grows a step each panel (size is the rule). */
const sizeShape: UnitModule = {
  name: 'Size',
  period2: false,
  make(next) {
    const sides = pick([3, 4, 5, 6], next);
    const up = next() < 0.6;
    const states = Array.from({ length: 6 }, (_, i) => (up ? i : 5 - i));
    return {
      states: states.map((lvl) => ({ lvl, sides })),
      rule: up
        ? 'The shape grows larger each step.'
        : 'The shape shrinks each step.',
    };
  },
  render(s) {
    return [{ k: 'poly', cx: CX, cy: CY, r: SIZE_RADII[s.lvl], sides: s.sides, rot: 0, fill: 'none' }];
  },
  distract(final, next) {
    const opts = [final.lvl + 1, final.lvl - 1, final.lvl - 2]
      .filter((lvl) => lvl >= 0 && lvl <= 5 && lvl !== final.lvl)
      .map((lvl) => ({ lvl, sides: final.sides }));
    return shuffle(opts, next);
  },
  key(s) {
    return `size:${s.lvl}:${s.sides}`;
  },
};

/** An asymmetric L-shape that mirror-flips left/right each step. */
const mirror: UnitModule = {
  name: 'Mirroring',
  period2: true,
  make(next) {
    const startFlip: 1 | -1 = next() < 0.5 ? 1 : -1;
    const states = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? startFlip : (-startFlip as 1 | -1)));
    return {
      states,
      rule: 'The shape flips to its mirror image each step (facing right, then left, then right …).',
    };
  },
  render(flip) {
    return [{ k: 'lshape', cx: CX, cy: CY, r: 24, rot: 0, flip, fill: 'solid' }];
  },
  distract(final) {
    return [(-final as 1 | -1)];
  },
  key(flip) {
    return `mir:${flip}`;
  },
};

/* ========================================================================== *
 * Whole-box centre module: hatching direction (marker drawn on top is safe)
 * ========================================================================== */

const hatch: UnitModule = {
  name: 'Hatching direction',
  period2: true,
  make(next) {
    const startNE = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? startNE : !startNE));
    return {
      states,
      rule: 'The hatching lines alternate direction each step (NE–SW slant, then NW–SE slant, and back).',
    };
  },
  render(ne) {
    const lo = 23;
    const hi = 79;
    const lines: Prim[] = [{ k: 'rect', cx: (lo + hi) / 2, cy: (lo + hi) / 2, w: hi - lo, h: hi - lo, rot: 0, fill: 'none' }];
    if (ne) {
      // NE–SW slant: x + y = c, clipped to the box.
      for (let c = 2 * lo + 12; c <= 2 * hi - 12; c += 13) {
        const xa = Math.max(lo, c - hi);
        const xb = Math.min(hi, c - lo);
        if (xa < xb) lines.push({ k: 'line', x1: xa, y1: c - xa, x2: xb, y2: c - xb, w: 2 });
      }
    } else {
      // NW–SE slant: y - x = c, clipped to the box.
      for (let c = lo - hi + 12; c <= hi - lo - 12; c += 13) {
        const xa = Math.max(lo, lo - c);
        const xb = Math.min(hi, hi - c);
        if (xa < xb) lines.push({ k: 'line', x1: xa, y1: xa + c, x2: xb, y2: xb + c, w: 2 });
      }
    }
    return lines;
  },
  distract(final) {
    return [!final];
  },
  key(ne) {
    return `hatch:${ne ? 1 : 0}`;
  },
};

/* ========================================================================== *
 * Corner modules (secondary rule)
 * ========================================================================== */

const cornerFill: UnitModule = {
  name: 'Corner circle fill',
  period2: true,
  make(next) {
    const startSolid = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => (i % 2 === 0 ? startSolid : !startSolid));
    return {
      states,
      rule: 'The circle in the top-right corner alternates between filled and empty each step.',
    };
  },
  render(solid) {
    return [{ k: 'circle', cx: CORNER.cx, cy: CORNER.cy, r: 9, fill: solid ? 'solid' : 'none' }];
  },
  distract(final) {
    return [!final];
  },
  key(solid) {
    return `cf:${solid ? 1 : 0}`;
  },
};

const cornerCount: UnitModule = {
  name: 'Corner dot count',
  period2: false,
  make(next) {
    const start = pick([1, 2], next);
    const states = Array.from({ length: 6 }, (_, i) => start + i);
    return {
      states,
      rule: 'The number of small dots in the top-right corner increases by one each step.',
    };
  },
  render(n) {
    const out: Prim[] = [];
    for (let i = 0; i < n; i += 1) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      out.push({ k: 'dot', cx: 70 + col * 8, cy: 15 + row * 8, r: 2.6, fill: 'solid' });
    }
    return out;
  },
  distract(final, next) {
    const opts = [final + 1, final - 1, final + 2].filter((n) => n >= 1);
    return shuffle(opts, next);
  },
  key(n) {
    return `cc:${n}`;
  },
};

const cornerArrow: UnitModule = {
  name: 'Corner arrow rotation',
  period2: false,
  make(next) {
    const step = pick([90, -90, 45], next);
    const start = pick([0, 90, 180, 270], next);
    const states = Array.from({ length: 6 }, (_, i) => norm(start + step * i));
    return {
      states,
      rule: `The small arrow in the top-right corner rotates ${Math.abs(step)}° ${dirWord(step)} each step.`,
    };
  },
  render(deg) {
    return [{ k: 'arrow', cx: CORNER.cx, cy: CORNER.cy, len: 18, rot: deg, fill: 'solid' }];
  },
  distract(final, next) {
    const opts = [norm(final + 90), norm(final - 90), norm(final + 180), norm(final + 45)];
    return shuffle(opts.filter((v) => v !== final), next);
  },
  key(deg) {
    return `ca:${deg}`;
  },
};

const cornerPos: UnitModule = {
  name: 'Marker corner',
  period2: false,
  make(next) {
    const step = next() < 0.5 ? 1 : -1;
    const start = Math.floor(next() * 4);
    const states = Array.from({ length: 6 }, (_, i) => ((start + step * i) % 4 + 4) % 4);
    return {
      states,
      rule: `A small square marker jumps to the next corner ${dirWord(step)} each step.`,
    };
  },
  render(idx) {
    const [x, y] = CORNERS[idx];
    return [{ k: 'rect', cx: x, cy: y, w: 11, h: 11, rot: 0, fill: 'solid' }];
  },
  distract(final, next) {
    const opts = [(final + 1) % 4, (final + 3) % 4, (final + 2) % 4];
    return shuffle(opts.filter((v) => v !== final), next);
  },
  key(idx) {
    return `cp:${idx}`;
  },
};

/* ========================================================================== *
 * Dual modules — both rules on a single figure
 * ========================================================================== */

/** Arrow rotates AND its fill alternates. */
const rotorFill: DualModule = {
  name: 'Rotation + fill',
  make(next) {
    const step = pick([45, 90, -45, -90], next);
    const startDeg = pick([0, 45, 90], next);
    const startSolid = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => ({
      deg: norm(startDeg + step * i),
      solid: i % 2 === 0 ? startSolid : !startSolid,
    }));
    return {
      states,
      rule1: `The arrow rotates ${Math.abs(step)}° ${dirWord(step)} each step.`,
      rule2: 'The arrow alternates between solid and outline each step.',
    };
  },
  render(s) {
    return [{ k: 'arrow', cx: CX, cy: CY, len: 44, rot: s.deg, fill: s.solid ? 'solid' : 'none' }];
  },
  distract(final, next) {
    const degs = [norm(final.deg + 45), norm(final.deg - 45), norm(final.deg + 90), norm(final.deg + 180)];
    const out = [
      { deg: degs[0], solid: final.solid },
      { deg: degs[2], solid: final.solid },
      { deg: final.deg, solid: !final.solid },
      { deg: degs[1], solid: !final.solid },
      { deg: degs[3], solid: final.solid },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `rf:${s.deg}:${s.solid ? 1 : 0}`;
  },
};

/** Polygon gains a side AND fill alternates. */
const edgesFill: DualModule = {
  name: 'Sides + fill',
  make(next) {
    const start = pick([3, 4], next);
    const startSolid = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => ({
      sides: Math.min(9, start + i),
      solid: i % 2 === 0 ? startSolid : !startSolid,
    }));
    return {
      states,
      rule1: 'The shape gains one side each step (triangle → square → pentagon …).',
      rule2: 'The shape alternates between solid and outline each step.',
    };
  },
  render(s) {
    return [{ k: 'poly', cx: CX, cy: CY, r: 25, sides: s.sides, rot: 0, fill: s.solid ? 'solid' : 'none' }];
  },
  distract(final, next) {
    const out = [
      { sides: final.sides + 1, solid: final.solid },
      { sides: final.sides - 1, solid: final.solid },
      { sides: final.sides, solid: !final.solid },
      { sides: final.sides + 1, solid: !final.solid },
    ].map((o) => ({ sides: Math.min(9, Math.max(3, o.sides)), solid: o.solid }));
    return shuffle(out, next);
  },
  key(s) {
    return `ef:${s.sides}:${s.solid ? 1 : 0}`;
  },
};

/** A small square travels around the box perimeter AND alternates fill. */
const moverFill: DualModule = {
  name: 'Movement + fill',
  make(next) {
    const step = pick([1, 2, -1, -2], next);
    const start = Math.floor(next() * 8);
    const startSolid = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => ({
      pos: ((start + step * i) % 8 + 8) % 8,
      solid: i % 2 === 0 ? startSolid : !startSolid,
    }));
    return {
      states,
      rule1: `The small square moves ${Math.abs(step)} position${Math.abs(step) === 1 ? '' : 's'} ${dirWord(step)} around the box each step.`,
      rule2: 'The small square alternates between solid and outline each step.',
    };
  },
  render(s) {
    const [x, y] = PERIMETER[s.pos];
    return [
      { k: 'rect', cx: CX, cy: CY, w: 60, h: 60, rot: 0, fill: 'none' },
      { k: 'rect', cx: x, cy: y, w: 12, h: 12, rot: 0, fill: s.solid ? 'solid' : 'none' },
    ];
  },
  distract(final, next) {
    const out = [
      { pos: (final.pos + 1) % 8, solid: final.solid },
      { pos: (final.pos + 7) % 8, solid: final.solid },
      { pos: final.pos, solid: !final.solid },
      { pos: (final.pos + 2) % 8, solid: !final.solid },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `mf:${s.pos}:${s.solid ? 1 : 0}`;
  },
};

/** One cell of a 3x3 grid is filled; it walks the grid AND toggles fill style. */
const gridFill: DualModule = {
  name: 'Grid position + fill',
  make(next) {
    const step = next() < 0.5 ? 1 : 2;
    const start = Math.floor(next() * 9);
    const states = Array.from({ length: 6 }, (_, i) => ({
      cell: (start + step * i) % 9,
      striped: i % 2 === 1,
    }));
    return {
      states,
      rule1: `The filled cell moves ${step} place${step === 1 ? '' : 's'} forward through the grid each step (wrapping around).`,
      rule2: 'The filled cell alternates between solid and striped shading each step.',
    };
  },
  render(s) {
    const out: Prim[] = [];
    for (let i = 0; i < 9; i += 1) {
      const [x, y] = GRID_CENTERS[i];
      out.push({ k: 'rect', cx: x, cy: y, w: 15, h: 15, rot: 0, fill: i === s.cell ? (s.striped ? 'striped' : 'solid') : 'none' });
    }
    return out;
  },
  distract(final, next) {
    const out = [
      { cell: (final.cell + 1) % 9, striped: final.striped },
      { cell: (final.cell + 8) % 9, striped: final.striped },
      { cell: final.cell, striped: !final.striped },
      { cell: (final.cell + 3) % 9, striped: !final.striped },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `gf:${s.cell}:${s.striped ? 1 : 0}`;
  },
};

/** Count climbs by one AND every shape's fill alternates. */
const countFill: DualModule = {
  name: 'Count + fill',
  make(next) {
    const sides = pick(COUNT_SHAPE_SIDES, next);
    const start = pick([1, 2], next);
    const startSolid = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => ({
      n: start + i,
      solid: i % 2 === 0 ? startSolid : !startSolid,
      sides,
    }));
    return {
      states,
      rule1: `The number of ${POLY_NAME[sides]}s increases by one each step.`,
      rule2: 'The shapes alternate between solid and outline each step.',
    };
  },
  render(s) {
    const offs = clusterOffsets(s.n);
    const r = s.n <= 2 ? 8 : s.n <= 4 ? 6.5 : 5.2;
    return offs.map((o) => ({ k: 'poly', cx: CX + o[0], cy: CY + o[1], r, sides: s.sides, rot: 0, fill: s.solid ? 'solid' : 'none' } as Prim));
  },
  distract(final, next) {
    const out = [
      { n: final.n + 1, solid: final.solid, sides: final.sides },
      { n: Math.max(1, final.n - 1), solid: final.solid, sides: final.sides },
      { n: final.n, solid: !final.solid, sides: final.sides },
      { n: final.n + 1, solid: !final.solid, sides: final.sides },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `cf2:${s.n}:${s.solid ? 1 : 0}:${s.sides}`;
  },
};

/** A shaded block of segments rotates AND grows by one segment each step. */
const segCount: DualModule = {
  name: 'Shaded segment + count',
  make(next) {
    const step = pick([1, 2, -1], next);
    const start = Math.floor(next() * 8);
    const states = Array.from({ length: 6 }, (_, i) => ({
      startSeg: ((start + step * i) % 8 + 8) % 8,
      count: 1 + i,
    }));
    return {
      states,
      rule1: `The shaded block rotates ${Math.abs(step)} segment${Math.abs(step) === 1 ? '' : 's'} ${dirWord(step)} each step.`,
      rule2: 'One more segment becomes shaded each step.',
    };
  },
  render(s) {
    const shaded: number[] = [];
    for (let i = 0; i < Math.min(8, s.count); i += 1) shaded.push((s.startSeg + i) % 8);
    return [{ k: 'seg', cx: CX, cy: CY, r: 25, segs: 8, shaded, startDeg: -90 }];
  },
  distract(final, next) {
    const out = [
      { startSeg: (final.startSeg + 1) % 8, count: final.count },
      { startSeg: final.startSeg, count: Math.max(1, final.count - 1) },
      { startSeg: (final.startSeg + 7) % 8, count: final.count },
      { startSeg: final.startSeg, count: Math.min(8, final.count + 1) },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `sc:${s.startSeg}:${s.count}`;
  },
};

/** Arrow alternates between two diagonal headings AND gains a notch each step. */
const notchDir: DualModule = {
  name: 'Direction + notches',
  make(next) {
    const headings = pick([[45, 135], [135, 225], [225, 315], [315, 45]], next);
    const states = Array.from({ length: 6 }, (_, i) => ({
      deg: i % 2 === 0 ? headings[0] : headings[1],
      notches: i,
    }));
    return {
      states,
      rule1: 'The arrow alternates between its two diagonal headings each step.',
      rule2: 'The arrow gains one notch on its shaft each step.',
    };
  },
  render(s) {
    return [{ k: 'arrow', cx: CX, cy: CY, len: 46, rot: s.deg, fill: 'solid', notches: s.notches }];
  },
  distract(final, next) {
    const other = norm(final.deg + 90);
    const out = [
      { deg: other, notches: final.notches },
      { deg: final.deg, notches: final.notches + 1 },
      { deg: final.deg, notches: Math.max(0, final.notches - 1) },
      { deg: other, notches: final.notches + 1 },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `nd:${s.deg}:${s.notches}`;
  },
};

/** Arrow grows AND rotates. */
const sizeRotor: DualModule = {
  name: 'Size + rotation',
  make(next) {
    const step = pick([45, 90, -90], next);
    const startDeg = pick([0, 45, 90], next);
    const up = next() < 0.6;
    const states = Array.from({ length: 6 }, (_, i) => ({
      deg: norm(startDeg + step * i),
      lvl: up ? i : 5 - i,
    }));
    return {
      states,
      rule1: up ? 'The arrow grows longer each step.' : 'The arrow shrinks each step.',
      rule2: `The arrow rotates ${Math.abs(step)}° ${dirWord(step)} each step.`,
    };
  },
  render(s) {
    return [{ k: 'arrow', cx: CX, cy: CY, len: 20 + s.lvl * 6, rot: s.deg, fill: 'solid' }];
  },
  distract(final, next) {
    const out = [
      { deg: norm(final.deg + 45), lvl: final.lvl },
      { deg: norm(final.deg - 90), lvl: final.lvl },
      { deg: final.deg, lvl: Math.min(5, final.lvl + 1) },
      { deg: final.deg, lvl: Math.max(0, final.lvl - 1) },
    ];
    return shuffle(out.filter((o) => !(o.deg === final.deg && o.lvl === final.lvl)), next);
  },
  key(s) {
    return `sr:${s.deg}:${s.lvl}`;
  },
};

/** A vertical bar fills up AND a flag above it flips pointing up/down. */
const barArrow: DualModule = {
  name: 'Bar level + arrow flip',
  make(next) {
    const startUp = next() < 0.5;
    const states = Array.from({ length: 6 }, (_, i) => ({
      lvl: i,
      up: i % 2 === 0 ? startUp : !startUp,
    }));
    return {
      states,
      rule1: 'The bar fills up by one more level each step.',
      rule2: 'The arrow above the bar flips between pointing up and pointing down each step.',
    };
  },
  render(s) {
    const barBottom = 82;
    const barTop = 34;
    const full = barBottom - barTop;
    const filledH = (full * s.lvl) / 5;
    const prims: Prim[] = [
      { k: 'rect', cx: CX, cy: (barTop + barBottom) / 2, w: 26, h: full, rot: 0, fill: 'none' },
    ];
    if (filledH > 0) {
      prims.push({ k: 'rect', cx: CX, cy: barBottom - filledH / 2, w: 26, h: filledH, rot: 0, fill: 'solid' });
    }
    prims.push({ k: 'arrow', cx: CX, cy: 20, len: 20, rot: s.up ? 0 : 180, fill: 'solid' });
    return prims;
  },
  distract(final, next) {
    const out = [
      { lvl: Math.min(5, final.lvl + 1), up: final.up },
      { lvl: Math.max(0, final.lvl - 1), up: final.up },
      { lvl: final.lvl, up: !final.up },
      { lvl: Math.max(0, final.lvl - 1), up: !final.up },
    ];
    return shuffle(out, next);
  },
  key(s) {
    return `ba:${s.lvl}:${s.up ? 1 : 0}`;
  },
};

/* ========================================================================== *
 * Registries
 * ========================================================================== */

const CENTER_MODULES: UnitModule[] = [rotor, polyEdges, segDial, countShapes, sizeShape, mirror, hatch];
const CORNER_MODULES: UnitModule[] = [cornerFill, cornerCount, cornerArrow, cornerPos];
const DUAL_MODULES: DualModule[] = [
  rotorFill, edgesFill, moverFill, gridFill, countFill, segCount, notchDir, sizeRotor, barArrow,
];

/* ========================================================================== *
 * Expanded question type (what the UI consumes)
 * ========================================================================== */

export interface InductiveExpandedQuestion {
  kind: 'inductive';
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sequence: Figure[]; // the five panels shown
  options: Figure[]; // five candidate figures, A–E
  optionLabels: string[];
  correctAnswer: string;
  prompt: string;
  patternName: string;
  rule1: string;
  rule2: string;
}

export interface InductiveTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: string;
  timeLimitSeconds: number;
  questions: InductiveExpandedQuestion[];
}

const PROMPT = 'Look at the five figures in the sequence, then choose the figure that comes next.';
const LABELS = ['A', 'B', 'C', 'D', 'E'];

/* ========================================================================== *
 * Question builder
 * ========================================================================== */

interface OptionDraft {
  figure: Figure;
  key: string;
}

function assembleOptions(
  correct: OptionDraft,
  wrongs: OptionDraft[],
  next: () => number,
): { options: Figure[]; correct: string } {
  const seen = new Set<string>([correct.key]);
  const chosen: OptionDraft[] = [];
  for (const w of wrongs) {
    if (seen.has(w.key)) continue;
    seen.add(w.key);
    chosen.push(w);
    if (chosen.length === 4) break;
  }
  if (chosen.length < 4) return { options: [], correct: '' }; // caller retries
  const all = shuffle([correct, ...chosen], next);
  return {
    options: all.map((o) => o.figure),
    correct: LABELS[all.findIndex((o) => o.key === correct.key)],
  };
}

/** Difficulty tag purely for the small pill in the review — based on archetype. */
function tagDifficulty(archetypeId: string): 'easy' | 'medium' | 'hard' {
  if (archetypeId.startsWith('dual:')) {
    if (['dual:gridFill', 'dual:segCount', 'dual:notchDir', 'dual:barArrow'].includes(archetypeId)) return 'hard';
    return 'medium';
  }
  return 'medium';
}

function buildFromArchetype(qid: string, archetypeId: string): InductiveExpandedQuestion | null {
  const next = rng(hashString(qid));

  if (archetypeId.startsWith('dual:')) {
    const mod = DUAL_MODULES.find((m) => `dual:${m.name}` === archetypeId || `dual:${modId(m)}` === archetypeId);
    if (!mod) return null;
    const { states, rule1, rule2 } = mod.make(next);
    const sequence = states.slice(0, 5).map((s) => ({ prims: mod.render(s) }));
    const finalState = states[5];
    const correct: OptionDraft = { figure: { prims: mod.render(finalState) }, key: mod.key(finalState) };
    const wrongStates = mod.distract(finalState, next);
    // Add a "forgot the last step" near-miss.
    wrongStates.push(states[4]);
    const wrongs: OptionDraft[] = wrongStates.map((w) => ({ figure: { prims: mod.render(w) }, key: mod.key(w) }));
    const { options, correct: letter } = assembleOptions(correct, wrongs, next);
    if (!options.length) return null;
    return {
      kind: 'inductive', id: qid, difficulty: tagDifficulty(archetypeId),
      sequence, options, optionLabels: LABELS, correctAnswer: letter,
      prompt: PROMPT, patternName: mod.name, rule1, rule2,
    };
  }

  // combo: center module + corner module
  const [, centerName, cornerName] = archetypeId.split(':');
  const center = CENTER_MODULES.find((m) => modId(m) === centerName);
  const corner = CORNER_MODULES.find((m) => modId(m) === cornerName);
  if (!center || !corner) return null;

  const c = center.make(next);
  const k = corner.make(next);
  const sequence = [0, 1, 2, 3, 4].map((i) => ({
    prims: [...center.render(c.states[i]), ...corner.render(k.states[i])],
  }));
  const cf = c.states[5];
  const kf = k.states[5];
  const comboKey = (a: any, b: any) => `${center.key(a)}#${corner.key(b)}`;
  const correct: OptionDraft = {
    figure: { prims: [...center.render(cf), ...corner.render(kf)] },
    key: comboKey(cf, kf),
  };

  const cWrong = center.distract(cf, next);
  const kWrong = corner.distract(kf, next);
  const combos: [any, any][] = [];
  if (cWrong[0] !== undefined) combos.push([cWrong[0], kf]);
  if (cWrong[1] !== undefined) combos.push([cWrong[1], kf]);
  if (kWrong[0] !== undefined) combos.push([cf, kWrong[0]]);
  if (cWrong[0] !== undefined && kWrong[0] !== undefined) combos.push([cWrong[0], kWrong[0]]);
  if (cWrong[2] !== undefined) combos.push([cWrong[2], kf]);
  if (cWrong[1] !== undefined && kWrong[0] !== undefined) combos.push([cWrong[1], kWrong[0]]);
  // "forgot the last step" near-miss.
  combos.push([c.states[4], k.states[4]]);

  const wrongs: OptionDraft[] = combos.map(([a, b]) => ({
    figure: { prims: [...center.render(a), ...corner.render(b)] },
    key: comboKey(a, b),
  }));
  const { options, correct: letter } = assembleOptions(correct, wrongs, next);
  if (!options.length) return null;
  return {
    kind: 'inductive', id: qid, difficulty: tagDifficulty(archetypeId),
    sequence, options, optionLabels: LABELS, correctAnswer: letter,
    prompt: PROMPT, patternName: `${center.name} + ${corner.name}`,
    rule1: c.rule, rule2: k.rule,
  };
}

/** Stable short id for a module (its variable-name-ish identity). */
function modId(m: UnitModule | DualModule): string {
  return MOD_IDS.get(m) || m.name;
}

const MOD_IDS: Map<UnitModule | DualModule, string> = new Map([
  [rotor, 'rotor'], [polyEdges, 'polyEdges'], [segDial, 'segDial'], [countShapes, 'countShapes'],
  [sizeShape, 'sizeShape'], [mirror, 'mirror'], [hatch, 'hatch'],
  [cornerFill, 'cornerFill'], [cornerCount, 'cornerCount'], [cornerArrow, 'cornerArrow'], [cornerPos, 'cornerPos'],
  [rotorFill, 'rotorFill'], [edgesFill, 'edgesFill'], [moverFill, 'moverFill'], [gridFill, 'gridFill'],
  [countFill, 'countFill'], [segCount, 'segCount'], [notchDir, 'notchDir'], [sizeRotor, 'sizeRotor'], [barArrow, 'barArrow'],
] as [UnitModule | DualModule, string][]);

/* ========================================================================== *
 * Archetype catalogue — every valid composition, used by the library to spread
 * a varied, deterministic set of questions across the ten tests.
 * ========================================================================== */

export function buildArchetypeList(): string[] {
  const list: string[] = [];
  DUAL_MODULES.forEach((m) => list.push(`dual:${modId(m)}`));
  CENTER_MODULES.forEach((cm) => {
    CORNER_MODULES.forEach((km) => {
      // Skip period-2 + period-2 pairings — they collapse into a single visible
      // rule (only two distinct combinations ever appear).
      if (cm.period2 && km.period2) return;
      list.push(`combo:${modId(cm)}:${modId(km)}`);
    });
  });
  return list;
}

/**
 * Build one question for a given id, trying the preferred archetype first and
 * then walking the catalogue until one expands cleanly (guarantees every test
 * holds its full 30 questions).
 */
export function buildInductiveQuestion(
  qid: string,
  preferred: string,
  fallbacks: string[],
): InductiveExpandedQuestion {
  const order = [preferred, ...fallbacks];
  for (let attempt = 0; attempt < order.length; attempt += 1) {
    const q = buildFromArchetype(`${qid}:${attempt}`, order[attempt]);
    if (q) return { ...q, id: qid };
  }
  // Absolute fallback: a plain rotation + corner-fill question always expands.
  const q = buildFromArchetype(`${qid}:safe`, 'combo:rotor:cornerCount');
  return { ...(q as InductiveExpandedQuestion), id: qid };
}
