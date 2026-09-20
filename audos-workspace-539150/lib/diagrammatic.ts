// Casemate — Diagrammatic Reasoning engine.
//
// The question bank in `data/diagrammatic-questions.json` stores COMPACT RULE
// SPECS, not expanded grids. This module is the single place that turns a spec
// into a full question: it derives every visible cell from the rule, derives
// the correct option from the same rule (so the answer can never disagree with
// the picture), builds wrong options that differ on exactly one property, and
// writes the plain-English explanation from the rule itself.
//
// LANGUAGE: every candidate-facing string in this module is ENGLISH on purpose.
// The aptitude round at Techcombank, Unilever, L'Oréal and the rest is sat in
// English, so the practice has to read the same way — including the wording of
// the rules in the answer review.
//
// Two question formats, both taken from the source practice booklets:
//   * matrix   — a 3x3 grid with the last cell missing, or a 4/5-step
//                horizontal sequence. Five options, A-E.
//   * set_ab   — two groups of figures (Set A / Set B), each following its
//                own rule, and one question figure. Three options: A, B, or
//                neither. This is the format used by four of the five booklets.
//
// Everything here is pure and deterministic (seeded RNG), so the same spec
// always renders the same test — a candidate can retake a test and compare.

/* ========================================================================== *
 * Shapes
 * ========================================================================== */

export type ShapeType =
  | 'arrow' | 'circle' | 'square' | 'rectangle' | 'triangle' | 'pentagon'
  | 'hexagon' | 'star4' | 'star5' | 'star6' | 'cross' | 'lshape' | 'tshape'
  | 'diamond' | 'spiral';

export type FillStyle = 'solid' | 'outline' | 'striped' | 'dotted' | 'half';
export type SizeName = 'small' | 'medium' | 'large';
export type PositionName =
  | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ColorName = 'ink' | 'red' | 'blue' | 'green' | 'amber';
export type FlipName = 'none' | 'horizontal';

export interface DiagramShape {
  type: ShapeType;
  rotation: number;
  fill: FillStyle;
  size: SizeName;
  count: number;
  position: PositionName;
  color: ColorName;
  flip: FlipName;
}

/** One free-floating shape inside a set_ab figure box. */
export interface ScatterShape {
  type: ShapeType;
  rotation: number;
  fill: FillStyle;
  size: SizeName;
  color: ColorName;
  x: number; // 0..100 within the box
  y: number;
}

export const SHAPE_DEFAULTS: Omit<DiagramShape, 'type'> = {
  rotation: 0,
  fill: 'solid',
  size: 'medium',
  count: 1,
  position: 'center',
  color: 'ink',
  flip: 'none',
};

export interface ShapeMeta {
  /** Straight edges (0 for fully curved shapes) — used by the `edges` set rule. */
  edges: number;
  /** Rotational symmetry order: a rotation that is a multiple of 360/order is invisible. */
  rotSymmetry: number;
  /** Mirror image looks different, so `flip` is a usable rule. */
  chiral: boolean;
  /** Has at least one curved edge. */
  curved: boolean;
}

export const SHAPE_META: Record<ShapeType, ShapeMeta> = {
  arrow: { edges: 7, rotSymmetry: 1, chiral: false, curved: false },
  circle: { edges: 0, rotSymmetry: 360, chiral: false, curved: true },
  square: { edges: 4, rotSymmetry: 4, chiral: false, curved: false },
  rectangle: { edges: 4, rotSymmetry: 2, chiral: false, curved: false },
  triangle: { edges: 3, rotSymmetry: 3, chiral: false, curved: false },
  pentagon: { edges: 5, rotSymmetry: 5, chiral: false, curved: false },
  hexagon: { edges: 6, rotSymmetry: 6, chiral: false, curved: false },
  star4: { edges: 8, rotSymmetry: 4, chiral: false, curved: false },
  star5: { edges: 10, rotSymmetry: 5, chiral: false, curved: false },
  star6: { edges: 12, rotSymmetry: 6, chiral: false, curved: false },
  cross: { edges: 12, rotSymmetry: 4, chiral: false, curved: false },
  lshape: { edges: 6, rotSymmetry: 1, chiral: true, curved: false },
  tshape: { edges: 8, rotSymmetry: 1, chiral: false, curved: false },
  diamond: { edges: 4, rotSymmetry: 4, chiral: false, curved: false },
  spiral: { edges: 0, rotSymmetry: 1, chiral: true, curved: true },
};

const FILLS: FillStyle[] = ['solid', 'outline', 'striped', 'dotted', 'half'];
const SIZES: SizeName[] = ['small', 'medium', 'large'];
const POSITIONS: PositionName[] = [
  'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right',
];
const COLORS: ColorName[] = ['ink', 'red', 'blue', 'green', 'amber'];
const PROPS: (keyof DiagramShape)[] = [
  'type', 'rotation', 'fill', 'size', 'count', 'position', 'color', 'flip',
];

/** Is the difference between two rotations actually visible for this shape? */
export function rotationVisible(type: ShapeType, a: number, b: number): boolean {
  const order = SHAPE_META[type].rotSymmetry;
  if (order >= 360) return false;
  const period = 360 / order;
  const delta = ((a - b) % 360 + 360) % 360;
  return Math.abs(delta / period - Math.round(delta / period)) > 1e-9;
}

export function normalizeShape(partial: Partial<DiagramShape> & { type: ShapeType }): DiagramShape {
  return { ...SHAPE_DEFAULTS, ...partial };
}

function shapeKey(shape: DiagramShape): string {
  return PROPS.map((p) => String(shape[p])).join('|');
}

/* ========================================================================== *
 * Seeded RNG (mulberry32) — deterministic option order and figure scatter.
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

function shuffle<T>(items: T[], next: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ========================================================================== *
 * Rule specs (as stored in the JSON bank)
 * ========================================================================== */

// ['k', value]                  constant
// ['byc', v1, v2, v3]           value chosen by column
// ['byr', v1, v2, v3]           value chosen by row
// ['lat', v1, v2, v3]           latin square: every row AND column gets all three
// ['latr', v1, v2, v3]          latin square running the other diagonal
// ['cyc', ...values]            repeats with the step index (sequences)
// ['col', base, step]           numeric: base + step * column
// ['row', base, step]           numeric: base + step * row
// ['read', base, step]          numeric: base + step * readingIndex (0..8)
// ['grid', base, colStep, rowStep]
export type RuleSpec = (string | number | boolean)[];

export type GridType = '3x3' | 'sequence_4' | 'sequence_5';

export interface MatrixQuestionSpec {
  id: string;
  d: 'easy' | 'medium' | 'hard';
  g: GridType;
  /** Shape type when no `type` rule is present. */
  t?: ShapeType;
  r: Record<string, RuleSpec>;
  src?: string;
}

export interface SetQuestionSpec {
  id: string;
  d: 'easy' | 'medium' | 'hard';
  g: 'set_ab';
  t: ShapeType | ShapeType[];
  a: RuleSpec;
  b: RuleSpec;
  ans: 'A' | 'B' | 'C';
  src?: string;
}

export type QuestionSpec = MatrixQuestionSpec | SetQuestionSpec;

export interface TestSpec {
  id: string;
  name: string;
  format: 'matrix' | 'set_ab';
  subtitle: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  timeLimitSeconds: number;
  questions: QuestionSpec[];
}

export interface BankSpec {
  version: string;
  sourceNote?: string;
  tests: TestSpec[];
}

/* ========================================================================== *
 * Wording (English — see the LANGUAGE note at the top of the file)
 * ========================================================================== */

// Singular nouns: every one of these pluralises with a plain "s", which is why
// the plus sign is called a "plus sign" and not a "cross".
const TYPE_LABEL: Record<ShapeType, string> = {
  arrow: 'arrow', circle: 'circle', square: 'square',
  rectangle: 'rectangle', triangle: 'triangle', pentagon: 'pentagon',
  hexagon: 'hexagon', star4: 'four-pointed star', star5: 'five-pointed star',
  star6: 'six-pointed star', cross: 'plus sign', lshape: 'L-shape',
  tshape: 'T-shape', diamond: 'diamond', spiral: 'spiral',
};

const FILL_LABEL: Record<FillStyle, string> = {
  solid: 'solid', outline: 'outlined', striped: 'striped',
  dotted: 'dotted', half: 'half-filled',
};

const SIZE_LABEL: Record<SizeName, string> = {
  small: 'small', medium: 'medium-sized', large: 'large',
};

const POSITION_LABEL: Record<PositionName, string> = {
  center: 'centre of the cell', 'top-left': 'top-left corner', 'top-right': 'top-right corner',
  'bottom-left': 'bottom-left corner', 'bottom-right': 'bottom-right corner',
};

const COLOR_LABEL: Record<ColorName, string> = {
  ink: 'black', red: 'red', blue: 'blue',
  green: 'green', amber: 'amber',
};

const PROP_LABEL: Record<string, string> = {
  rotation: 'rotation', fill: 'fill style', size: 'size', count: 'count',
  type: 'shape type', position: 'position', color: 'colour', flip: 'mirroring',
};

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function describeValue(prop: string, value: unknown): string {
  if (prop === 'type') return TYPE_LABEL[value as ShapeType] || String(value);
  if (prop === 'fill') return FILL_LABEL[value as FillStyle] || String(value);
  if (prop === 'size') return SIZE_LABEL[value as SizeName] || String(value);
  if (prop === 'position') return POSITION_LABEL[value as PositionName] || String(value);
  if (prop === 'color') return COLOR_LABEL[value as ColorName] || String(value);
  if (prop === 'rotation') return `${value}°`;
  if (prop === 'flip') return value === 'none' ? 'not mirrored' : 'mirrored';
  return String(value);
}

/** "3 small solid arrows, turned 270°, in the bottom-right corner" */
export function describeShape(shape: DiagramShape, mention: Set<string>): string {
  const adjectives = [SIZE_LABEL[shape.size], FILL_LABEL[shape.fill]];
  if (shape.color !== 'ink' || mention.has('color')) adjectives.push(COLOR_LABEL[shape.color]);
  const noun = TYPE_LABEL[shape.type];
  const bits: string[] = [
    `${shape.count} ${adjectives.join(' ')} ${noun}${shape.count === 1 ? '' : 's'}`,
  ];
  if (shape.rotation !== 0 || mention.has('rotation')) bits.push(`turned ${shape.rotation}°`);
  if (shape.position !== 'center' || mention.has('position')) {
    bits.push(`in the ${POSITION_LABEL[shape.position]}`);
  }
  if (mention.has('flip')) bits.push(shape.flip === 'none' ? 'not mirrored' : 'mirrored');
  return bits.join(', ');
}

/* ========================================================================== *
 * Rule evaluation
 * ========================================================================== */

function evalRule(spec: RuleSpec, row: number, col: number, index: number): any {
  const kind = spec[0] as string;
  switch (kind) {
    case 'k':
      return spec[1];
    case 'byc':
      return spec[1 + (col % 3)];
    case 'byr':
      return spec[1 + (row % 3)];
    case 'lat':
      return spec[1 + (((row + col) % 3) + 3) % 3];
    case 'latr':
      return spec[1 + (((row - col) % 3) + 3) % 3];
    case 'cyc':
      return spec[1 + (index % (spec.length - 1))];
    case 'col':
      return (((spec[1] as number) + (spec[2] as number) * col) % 360 + 360) % 360;
    case 'row':
      return (((spec[1] as number) + (spec[2] as number) * row) % 360 + 360) % 360;
    case 'read':
      return (((spec[1] as number) + (spec[2] as number) * index) % 360 + 360) % 360;
    case 'grid':
      return (
        (((spec[1] as number) + (spec[2] as number) * col + (spec[3] as number) * row) % 360 + 360) % 360
      );
    default:
      throw new Error(`unknown rule kind: ${kind}`);
  }
}

/** Rule kinds that vary with the reading index rather than row/column. */
function isSequence(grid: GridType): boolean {
  return grid !== '3x3';
}

function buildCell(spec: MatrixQuestionSpec, row: number, col: number, index: number): DiagramShape {
  const partial: Partial<DiagramShape> & { type: ShapeType } = {
    type: (spec.t || 'circle') as ShapeType,
  };
  for (const prop of Object.keys(spec.r)) {
    (partial as any)[prop] = evalRule(spec.r[prop], row, col, index);
  }
  return normalizeShape(partial);
}

/* ========================================================================== *
 * Rule → English sentence
 * ========================================================================== */

function turnDirection(step: number): string {
  return step >= 0 ? 'clockwise' : 'anticlockwise';
}

function ruleSentence(prop: string, spec: RuleSpec, grid: GridType): string | null {
  const kind = spec[0] as string;
  const label = PROP_LABEL[prop] || prop;
  const values = spec.slice(1);
  const list = (items: unknown[]) => items.map((v) => describeValue(prop, v)).join(' → ');

  switch (kind) {
    case 'k':
      return null; // constant: not a rule the candidate has to find
    case 'col':
      if (prop === 'rotation') {
        return `Each step to the right, the shape turns ${Math.abs(spec[2] as number)}° ${turnDirection(spec[2] as number)}.`;
      }
      return `${capitalise(label)} changes from column to column.`;
    case 'row':
      if (prop === 'rotation') {
        return `Each step down, the shape turns ${Math.abs(spec[2] as number)}° ${turnDirection(spec[2] as number)} — every cell in the same row shares the same angle.`;
      }
      return `${capitalise(label)} changes from row to row.`;
    case 'read':
      return `The rotation gains ${Math.abs(spec[2] as number)}° on EVERY cell in reading order (left to right, top to bottom).`;
    case 'grid':
      return `The rotation gains ${Math.abs(spec[2] as number)}° going right AND ${Math.abs(spec[3] as number)}° going down.`;
    case 'byc':
      return isSequence(grid)
        ? `${capitalise(label)} repeats on a cycle of ${values.length}: ${list(values)}.`
        : `${capitalise(label)} is decided by the COLUMN: ${list(values)} — all three rows are identical.`;
    case 'byr':
      return `${capitalise(label)} is decided by the ROW: ${list(values)} — all three columns are identical.`;
    case 'lat':
    case 'latr':
      return `Every row and every column carries all three ${label} values — ${values.map((v) => describeValue(prop, v)).join(', ')} — and never repeats one inside the same row or column.`;
    case 'cyc':
      return `${capitalise(label)} repeats on a cycle of ${values.length}: ${list(values)}.`;
    default:
      return `${capitalise(label)} follows a pattern of its own.`;
  }
}

/* ========================================================================== *
 * Distractors
 * ========================================================================== */

function rotationVariants(answer: DiagramShape, deltas: number[]): DiagramShape[] {
  const out: DiagramShape[] = [];
  for (const delta of deltas) {
    const rotation = ((answer.rotation + delta) % 360 + 360) % 360;
    if (rotationVisible(answer.type, rotation, answer.rotation)) {
      out.push({ ...answer, rotation });
    }
  }
  return out;
}

const ALT_TYPE: Record<ShapeType, ShapeType[]> = {
  arrow: ['triangle', 'tshape'], circle: ['hexagon', 'diamond'],
  square: ['diamond', 'rectangle'], rectangle: ['square', 'diamond'],
  triangle: ['diamond', 'pentagon'], pentagon: ['hexagon', 'triangle'],
  hexagon: ['pentagon', 'circle'], star4: ['star5', 'diamond'],
  star5: ['star6', 'star4'], star6: ['star5', 'hexagon'],
  cross: ['square', 'star4'], lshape: ['tshape', 'square'],
  tshape: ['lshape', 'cross'], diamond: ['square', 'triangle'],
  spiral: ['circle', 'hexagon'],
};

/**
 * Wrong options, near-miss first: the properties the rule actually governs are
 * perturbed by one step (the mistake a real candidate makes), then the other
 * properties. Every option differs from the correct one on exactly one
 * property, and any rotation-only difference is guaranteed visible.
 */
function buildOptions(
  answer: DiagramShape,
  ruledProps: string[],
  seed: number,
): { options: DiagramShape[]; correct: string } {
  const candidates: DiagramShape[] = [];
  const pushFill = (fill: FillStyle) => { if (fill !== answer.fill) candidates.push({ ...answer, fill }); };
  const pushSize = (size: SizeName) => { if (size !== answer.size) candidates.push({ ...answer, size }); };
  const pushCount = (count: number) => {
    if (count >= 1 && count <= 4 && count !== answer.count) candidates.push({ ...answer, count });
  };
  const pushPosition = (position: PositionName) => {
    if (position !== answer.position) candidates.push({ ...answer, position });
  };

  const ruled = new Set(ruledProps);
  // Pass 1: near-misses on the ruled properties.
  if (ruled.has('rotation')) candidates.push(...rotationVariants(answer, [90, -90, 45, -45, 180]));
  if (ruled.has('count')) { pushCount(answer.count - 1); pushCount(answer.count + 1); }
  if (ruled.has('fill')) FILLS.forEach(pushFill);
  if (ruled.has('size')) SIZES.forEach(pushSize);
  if (ruled.has('position')) POSITIONS.forEach(pushPosition);
  if (ruled.has('type')) {
    ALT_TYPE[answer.type].forEach((type) => candidates.push({ ...answer, type }));
  }
  if (ruled.has('color')) {
    COLORS.forEach((color) => { if (color !== answer.color) candidates.push({ ...answer, color }); });
  }
  if (ruled.has('flip') && SHAPE_META[answer.type].chiral) {
    candidates.push({ ...answer, flip: answer.flip === 'none' ? 'horizontal' : 'none' });
  }
  // Pass 2: everything else, so there are always four usable wrong options.
  // Rotation comes LAST here. When the rule is not about rotation, a tilted
  // copy is a weak distractor — and on a symmetric shape it reads as a
  // different shape entirely (a diamond turned 45° is a square), which tests
  // the wrong thing. Exhaust the honest one-property changes first.
  FILLS.forEach(pushFill);
  SIZES.forEach(pushSize);
  pushCount(answer.count + 1);
  pushCount(answer.count - 1);
  pushCount(answer.count + 2);
  POSITIONS.forEach(pushPosition);
  ALT_TYPE[answer.type].forEach((type) => candidates.push({ ...answer, type }));
  if (SHAPE_META[answer.type].rotSymmetry < 360) {
    candidates.push(...rotationVariants(answer, [90, -90, 45, -45, 135, 180]));
  }

  const seen = new Set([shapeKey(answer)]);
  const wrong: DiagramShape[] = [];
  for (const candidate of candidates) {
    const key = shapeKey(candidate);
    if (seen.has(key)) continue;
    seen.add(key);
    wrong.push(candidate);
    if (wrong.length === 4) break;
  }
  if (wrong.length < 4) {
    throw new Error(`not enough distractors for ${shapeKey(answer)}`);
  }

  const options = shuffle([...wrong, answer], rng(seed));
  return { options, correct: 'ABCDE'[options.findIndex((o) => shapeKey(o) === shapeKey(answer))] };
}

/* ========================================================================== *
 * set_ab figures
 * ========================================================================== */

// ['count', n]         exactly n shapes in the box
// ['shaded', n]        exactly n solid shapes (the rest are outline)
// ['striped', n]       exactly n striped shapes
// ['distinct', n]      exactly n different shape types
// ['edges', n]         straight edges summed over every shape equals n
// ['parity', 'even']   the number of shapes is even / odd
// ['large', n]         exactly n large shapes (the rest small)
// ['family', 'curved'] every shape has a curved edge / only straight edges
export type SetRule = RuleSpec;

const CURVED_POOL: ShapeType[] = ['circle', 'spiral'];
const STRAIGHT_POOL: ShapeType[] = [
  'square', 'triangle', 'pentagon', 'hexagon', 'star4', 'star5', 'diamond', 'cross',
];

function boxSatisfies(box: ScatterShape[], rule: SetRule): boolean {
  const kind = rule[0] as string;
  const n = rule[1] as number;
  switch (kind) {
    case 'count':
      return box.length === n;
    case 'shaded':
      return box.filter((s) => s.fill === 'solid').length === n;
    case 'striped':
      return box.filter((s) => s.fill === 'striped').length === n;
    case 'distinct':
      return new Set(box.map((s) => s.type)).size === n;
    case 'edges':
      return box.reduce((sum, s) => sum + SHAPE_META[s.type].edges, 0) === n;
    case 'parity':
      return (box.length % 2 === 0) === (rule[1] === 'even');
    case 'large':
      return box.filter((s) => s.size === 'large').length === n;
    case 'family':
      return rule[1] === 'curved'
        ? box.every((s) => SHAPE_META[s.type].curved)
        : box.every((s) => !SHAPE_META[s.type].curved);
    default:
      throw new Error(`unknown set rule: ${kind}`);
  }
}

export function setRuleText(rule: SetRule, shapeLabel: string): string {
  const kind = rule[0] as string;
  const n = rule[1];
  const s = n === 1 ? '' : 's';
  switch (kind) {
    case 'count':
      return `every box holds exactly ${n} ${shapeLabel}${s}`;
    case 'shaded':
      return `every box holds exactly ${n} SHADED shape${s} (the rest are outlines)`;
    case 'striped':
      return `every box holds exactly ${n} STRIPED shape${s}`;
    case 'distinct':
      return `every box holds exactly ${n} different KINDS of shape`;
    case 'edges':
      return `the straight edges of every shape in the box add up to ${n}`;
    case 'parity':
      return `every box holds an ${n === 'even' ? 'EVEN' : 'ODD'} number of shapes`;
    case 'large':
      return `every box holds exactly ${n} LARGE shape${s} (the rest are small)`;
    case 'family':
      return n === 'curved'
        ? 'every shape in the box has a CURVED edge'
        : 'every shape in the box has only STRAIGHT edges';
    default:
      return 'a rule of its own';
  }
}

/** Scatter positions on a jittered 3x3 lattice so boxes never look mechanical. */
function scatterPositions(n: number, next: () => number): { x: number; y: number }[] {
  const lattice = [
    { x: 26, y: 26 }, { x: 50, y: 22 }, { x: 74, y: 26 },
    { x: 24, y: 50 }, { x: 50, y: 50 }, { x: 76, y: 50 },
    { x: 26, y: 74 }, { x: 50, y: 78 }, { x: 74, y: 74 },
  ];
  const picked = shuffle(lattice, next).slice(0, n);
  return picked.map((p) => ({
    x: Math.round(p.x + (next() - 0.5) * 8),
    y: Math.round(p.y + (next() - 0.5) * 8),
  }));
}

function makeBox(rule: SetRule, pool: ShapeType[], next: () => number, avoid?: SetRule): ScatterShape[] {
  for (let attempt = 0; attempt < 400; attempt += 1) {
    const kind = rule[0] as string;
    let n: number;
    if (kind === 'count') n = rule[1] as number;
    else if (kind === 'parity') n = (rule[1] === 'even' ? 2 : 1) + 2 * Math.floor(next() * 2);
    else n = 3 + Math.floor(next() * 3);

    const usePool = kind === 'family'
      ? (rule[1] === 'curved' ? CURVED_POOL : STRAIGHT_POOL)
      : pool;

    let types: ShapeType[] = [];
    if (kind === 'distinct') {
      const distinct = shuffle(usePool, next).slice(0, rule[1] as number);
      if (distinct.length < (rule[1] as number)) continue;
      types = distinct.slice();
      while (types.length < n) types.push(distinct[Math.floor(next() * distinct.length)]);
      if (new Set(types).size !== (rule[1] as number)) continue;
    } else if (kind === 'edges') {
      types = [];
      let remaining = rule[1] as number;
      // Greedy fill: pick shapes whose edge counts add up exactly.
      for (let i = 0; i < 6 && remaining > 0; i += 1) {
        const options = usePool.filter((t) => SHAPE_META[t].edges > 0 && SHAPE_META[t].edges <= remaining);
        if (!options.length) break;
        const pick = options[Math.floor(next() * options.length)];
        types.push(pick);
        remaining -= SHAPE_META[pick].edges;
      }
      if (remaining !== 0 || types.length < 2) continue;
      n = types.length;
    } else {
      for (let i = 0; i < n; i += 1) types.push(usePool[Math.floor(next() * usePool.length)]);
    }

    const fills: FillStyle[] = types.map(() => 'outline');
    if (kind === 'shaded') {
      const idx = shuffle(types.map((_, i) => i), next).slice(0, rule[1] as number);
      idx.forEach((i) => { fills[i] = 'solid'; });
    } else if (kind === 'striped') {
      const idx = shuffle(types.map((_, i) => i), next).slice(0, rule[1] as number);
      idx.forEach((i) => { fills[i] = 'striped'; });
    } else {
      types.forEach((_, i) => { fills[i] = next() < 0.5 ? 'solid' : 'outline'; });
    }

    const sizes: SizeName[] = types.map(() => 'small');
    if (kind === 'large') {
      const idx = shuffle(types.map((_, i) => i), next).slice(0, rule[1] as number);
      idx.forEach((i) => { sizes[i] = 'large'; });
    }

    const spots = scatterPositions(types.length, next);
    const box: ScatterShape[] = types.map((type, i) => ({
      type,
      rotation: 0,
      fill: fills[i],
      size: sizes[i],
      color: 'ink',
      x: spots[i].x,
      y: spots[i].y,
    }));

    if (!boxSatisfies(box, rule)) continue;
    if (avoid && boxSatisfies(box, avoid)) continue;
    return box;
  }
  throw new Error(`could not build a figure for rule ${JSON.stringify(rule)}`);
}

/**
 * A figure that breaks BOTH group rules. Widens the search over box size, fill
 * mix and shape mix (a `family` rule, for instance, can only be broken by
 * mixing a curved shape with a straight-edged one).
 */
function makeNeitherBox(a: SetRule, b: SetRule, pool: ShapeType[], next: () => number): ScatterShape[] {
  const widePool = Array.from(new Set([...pool, ...CURVED_POOL, ...STRAIGHT_POOL]));
  for (let attempt = 0; attempt < 3000; attempt += 1) {
    const usePool = attempt % 3 === 0 ? pool : widePool;
    const n = 1 + Math.floor(next() * 8);
    const types: ShapeType[] = [];
    for (let i = 0; i < n; i += 1) types.push(usePool[Math.floor(next() * usePool.length)]);
    const spots = scatterPositions(n, next);
    const fillRoll = next();
    const box: ScatterShape[] = types.map((type, i) => ({
      type,
      rotation: 0,
      fill: fillRoll < 0.2 ? 'solid'
        : fillRoll < 0.4 ? 'outline'
          : next() < 0.34 ? 'solid' : next() < 0.5 ? 'striped' : 'outline',
      size: next() < 0.3 ? 'large' : 'small',
      color: 'ink',
      x: spots[i].x,
      y: spots[i].y,
    }));
    if (!boxSatisfies(box, a) && !boxSatisfies(box, b)) return box;
  }
  throw new Error(
    `could not build a "neither" figure for ${JSON.stringify(a)} / ${JSON.stringify(b)} — `
    + 'these two rules may cover every possible figure (e.g. even vs odd)',
  );
}

/* ========================================================================== *
 * Expanded question types (what the UI consumes)
 * ========================================================================== */

export interface ExpandedMatrixQuestion {
  kind: 'matrix';
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  gridType: GridType;
  ruleTypes: string[];
  cells: DiagramShape[];
  options: DiagramShape[];
  correctAnswer: string;
  optionLabels: string[];
  prompt: string;
  explanation: string;
  answerSummary: string;
  source?: string;
}

export interface ExpandedSetQuestion {
  kind: 'set_ab';
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ruleTypes: string[];
  setA: ScatterShape[][];
  setB: ScatterShape[][];
  figure: ScatterShape[];
  options: string[];
  optionLabels: string[];
  correctAnswer: string;
  prompt: string;
  explanation: string;
  answerSummary: string;
  source?: string;
}

export type ExpandedQuestion = ExpandedMatrixQuestion | ExpandedSetQuestion;

export interface ExpandedTest {
  id: string;
  name: string;
  format: 'matrix' | 'set_ab';
  subtitle: string;
  description: string;
  difficulty: string;
  timeLimitSeconds: number;
  questions: ExpandedQuestion[];
}

const MATRIX_PROMPT = 'Which figure replaces the question mark?';
const SEQUENCE_PROMPT = 'Which figure comes next in the sequence?';
const SET_PROMPT = 'Which set does the figure belong to?';
const SET_OPTIONS = ['Set A', 'Set B', 'Neither set A nor set B'];

function expandMatrix(spec: MatrixQuestionSpec): ExpandedMatrixQuestion {
  const ruledProps = Object.keys(spec.r).filter((p) => spec.r[p][0] !== 'k');
  const cells: DiagramShape[] = [];
  let answer: DiagramShape;

  if (spec.g === '3x3') {
    for (let index = 0; index < 9; index += 1) {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const cell = buildCell(spec, row, col, index);
      if (index < 8) cells.push(cell);
      else answer = cell;
    }
  } else {
    const length = spec.g === 'sequence_4' ? 4 : 5;
    for (let index = 0; index < length; index += 1) {
      const cell = buildCell(spec, 0, index, index);
      if (index < length - 1) cells.push(cell);
      else answer = cell;
    }
  }

  const { options, correct } = buildOptions(answer!, ruledProps, hashString(spec.id));
  const mention = new Set(ruledProps);
  const summary = describeShape(answer!, mention);

  const sentences = ruledProps
    .map((prop) => ruleSentence(prop, spec.r[prop], spec.g))
    .filter((s): s is string => !!s);
  const intro = ruledProps.length === 1
    ? 'The rule:'
    : `This question runs ${ruledProps.length} rules at the same time:`;
  const numbered = sentences.length > 1
    ? sentences.map((s, i) => `(${i + 1}) ${s}`).join(' ')
    : sentences.join(' ');

  return {
    kind: 'matrix',
    id: spec.id,
    difficulty: spec.d,
    gridType: spec.g,
    ruleTypes: ruledProps,
    cells,
    options,
    correctAnswer: correct,
    optionLabels: ['A', 'B', 'C', 'D', 'E'],
    prompt: spec.g === '3x3' ? MATRIX_PROMPT : SEQUENCE_PROMPT,
    explanation: `${intro} ${numbered}`,
    answerSummary: `Correct answer: ${summary}.`,
    source: spec.src,
  };
}

/**
 * The three example figures for one group. A `parity` rule additionally needs
 * its examples to DISAGREE on how many shapes they hold: three boxes of two
 * stars each reads as "exactly two", not "an even number", and the candidate
 * then has no way to classify a figure holding four.
 */
function makeExampleBoxes(
  rule: SetRule,
  pool: ShapeType[],
  next: () => number,
  avoid: SetRule,
): ScatterShape[][] {
  const boxes = [0, 1, 2].map(() => makeBox(rule, pool, next, avoid));
  if (rule[0] === 'parity') {
    for (let attempt = 0; attempt < 60 && new Set(boxes.map((b) => b.length)).size < 2; attempt += 1) {
      boxes[attempt % 3] = makeBox(rule, pool, next, avoid);
    }
  }
  return boxes;
}

function expandSet(spec: SetQuestionSpec): ExpandedSetQuestion {
  const next = rng(hashString(spec.id));
  const pool = Array.isArray(spec.t) ? spec.t : [spec.t];
  const setA = makeExampleBoxes(spec.a, pool, next, spec.b);
  const setB = makeExampleBoxes(spec.b, pool, next, spec.a);

  let figure: ScatterShape[];
  if (spec.ans === 'A') figure = makeBox(spec.a, pool, next, spec.b);
  else if (spec.ans === 'B') figure = makeBox(spec.b, pool, next, spec.a);
  else figure = makeNeitherBox(spec.a, spec.b, pool, next);

  // A pool of one type can be named outright ("4 five-pointed stars"); a mixed
  // pool has to stay generic ("4 shapes").
  const label = Array.isArray(spec.t)
    ? (spec.t.length === 1 ? TYPE_LABEL[spec.t[0]] : 'shape')
    : TYPE_LABEL[spec.t];
  const textA = setRuleText(spec.a, label);
  const textB = setRuleText(spec.b, label);
  const verdict = spec.ans === 'A'
    ? 'The question figure follows set A’s rule, so it belongs to SET A.'
    : spec.ans === 'B'
      ? 'The question figure follows set B’s rule, so it belongs to SET B.'
      : 'The question figure follows NEITHER set A’s rule nor set B’s rule, so it belongs to neither set.';

  return {
    kind: 'set_ab',
    id: spec.id,
    difficulty: spec.d,
    ruleTypes: [String(spec.a[0])],
    setA,
    setB,
    figure,
    options: SET_OPTIONS,
    optionLabels: ['A', 'B', 'C'],
    correctAnswer: spec.ans,
    prompt: SET_PROMPT,
    explanation: `Set A: ${capitalise(textA)}. Set B: ${capitalise(textB)}. ${verdict}`,
    answerSummary: spec.ans === 'A'
      ? 'Correct answer: Set A.'
      : spec.ans === 'B' ? 'Correct answer: Set B.' : 'Correct answer: neither set.',
    source: spec.src,
  };
}

export function expandQuestion(spec: QuestionSpec): ExpandedQuestion {
  return spec.g === 'set_ab'
    ? expandSet(spec as SetQuestionSpec)
    : expandMatrix(spec as MatrixQuestionSpec);
}

export function expandBank(bank: BankSpec): ExpandedTest[] {
  return bank.tests.map((test) => ({
    id: test.id,
    name: test.name,
    format: test.format,
    subtitle: test.subtitle,
    description: test.description,
    difficulty: test.difficulty,
    timeLimitSeconds: test.timeLimitSeconds,
    questions: test.questions.map(expandQuestion),
  }));
}
