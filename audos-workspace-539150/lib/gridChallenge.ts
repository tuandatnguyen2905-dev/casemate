// Casemate — Grid Challenge rules (memory + spatial reasoning).
//
// A session is 9 tasks in 3 rounds against one 9-minute clock. Each task flashes
// a dot on a 4×4 field for about a second, asks one Yes/No visual question, and
// repeats until 2–5 dots have been shown; the candidate then taps every dot back
// in the order it appeared.
//
// Everything is built from fixed rules and seeded randomness — never AI. Every
// Yes/No answer is decided by construction AND re-derived by an independent
// checker (mirror comparison, rotation search, brute-force tiling) before a
// session is handed out; lib/gridChallenge.test.ts asserts this on many seeds.
// The format is only loosely inspired by game-based assessments; the figures,
// rules and sequences are original to Casemate.

export type GcAnswer = 'yes' | 'no';
export type GcRoundKind = 'symmetry' | 'rotation' | 'combination';
/** [row, column], both zero-based. */
export type GcCell = readonly [number, number];

export const GC_TEST_ID = 'grid-challenge';
export const GC_TEST_TYPE = 'grid_challenge';
export const GC_TEST_NAME = 'Grid Challenge';
export const GC_TIME_LIMIT_SECONDS = 9 * 60;
export const GC_MEMORY_SIZE = 4;
export const GC_DOT_MS = 1000;
export const GC_SYMMETRY_ROWS = 8;
export const GC_SYMMETRY_COLS = 8;

export interface GcRoundSpec {
  kind: GcRoundKind;
  title: string;
  question: string;
  rule: string;
  /** Dots shown in each of the round's three tasks. */
  dots: readonly number[];
}

export const GC_ROUNDS: readonly GcRoundSpec[] = [
  {
    kind: 'symmetry',
    title: 'Symmetry Recognition',
    question: 'Is it symmetrical?',
    rule: 'Decide whether the right half of the grid is an exact mirror image of the left half across the red line.',
    dots: [2, 2, 2],
  },
  {
    kind: 'rotation',
    title: 'Mental Rotation',
    question: 'Is shape B a rotation of shape A?',
    rule: 'Shape B may be shape A turned by 90°, 180° or 270°. Answer No if B is a mirror image of A rather than a rotation.',
    dots: [3, 3, 4],
  },
  {
    kind: 'combination',
    title: 'Shape Combination',
    question: 'Do the two pieces make the target shape?',
    rule: 'The two pieces may be moved and turned, but not flipped, and may not overlap. Answer Yes only if together they cover the target exactly.',
    dots: [4, 5, 5],
  },
];

export interface GcSymmetryQuestion {
  kind: 'symmetry';
  id: string;
  rows: number;
  cols: number;
  /** Filled cells of the whole grid; the mirror line runs between columns cols/2 − 1 and cols/2. */
  filled: GcCell[];
  answer: GcAnswer;
}

export interface GcRotationQuestion {
  kind: 'rotation';
  id: string;
  shapeA: GcCell[];
  shapeB: GcCell[];
  /** How shape B was built: shape A (mirrored on a No question) turned clockwise by this many degrees. */
  turn: 0 | 90 | 180 | 270;
  answer: GcAnswer;
}

export interface GcCombinationQuestion {
  kind: 'combination';
  id: string;
  pieces: [GcCell[], GcCell[]];
  target: GcCell[];
  answer: GcAnswer;
}

export type GcQuestion = GcSymmetryQuestion | GcRotationQuestion | GcCombinationQuestion;

export interface GcStep {
  dot: GcCell;
  question: GcQuestion;
}

export interface GcTask {
  id: string;
  /** 0-based position in the session (0–8). */
  index: number;
  /** 0-based round (0–2). */
  round: number;
  kind: GcRoundKind;
  steps: GcStep[];
}

export interface GcSession {
  id: string;
  seed: number;
  timeLimitSeconds: number;
  tasks: GcTask[];
  totalDots: number;
  totalQuestions: number;
}

export interface GcResponses {
  /** Yes/No answer per question id. Missing = never answered. */
  answers: Record<string, GcAnswer>;
  /** Confirmed recall per task id, in tap order. Missing = recall never confirmed. */
  recalls: Record<string, GcCell[]>;
}

export interface GcResult {
  memoryCorrect: number;
  memoryTotal: number;
  memoryPercent: number;
  reasoningCorrect: number;
  reasoningAnswered: number;
  reasoningTotal: number;
  reasoningPercent: number;
  tasksCompleted: number;
  tasksTotal: number;
  score: number;
  total: number;
  percent: number;
  durationSeconds: number;
  timedOut: boolean;
}

/* ========================================================================== *
 * Seeded randomness
 * ========================================================================== */

export type Rng = () => number;

export function createRng(seed: number): Rng {
  let state = seed >>> 0 || 0x9e3779b9;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function shuffle<T>(rng: Rng, items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ========================================================================== *
 * Cell-set geometry
 * ========================================================================== */

const cellKey = (cell: GcCell) => `${cell[0]},${cell[1]}`;

export function sameCell(a: GcCell | undefined, b: GcCell | undefined): boolean {
  return Boolean(a && b && a[0] === b[0] && a[1] === b[1]);
}

/** Shift so the top-left of the bounding box is (0, 0) and sort row-major. */
export function normalizeShape(cells: readonly GcCell[]): GcCell[] {
  if (!cells.length) return [];
  const minRow = Math.min(...cells.map((cell) => cell[0]));
  const minCol = Math.min(...cells.map((cell) => cell[1]));
  return cells
    .map((cell) => [cell[0] - minRow, cell[1] - minCol] as GcCell)
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function shapeSignature(cells: readonly GcCell[]): string {
  return normalizeShape(cells).map(cellKey).join(';');
}

export function sameShape(a: readonly GcCell[], b: readonly GcCell[]): boolean {
  return a.length === b.length && shapeSignature(a) === shapeSignature(b);
}

/** One quarter-turn clockwise. */
export function rotateShape(cells: readonly GcCell[]): GcCell[] {
  return normalizeShape(cells.map((cell) => [cell[1], -cell[0]] as GcCell));
}

export function rotateShapeBy(cells: readonly GcCell[], degrees: 0 | 90 | 180 | 270): GcCell[] {
  let out = normalizeShape(cells);
  for (let turns = degrees / 90; turns > 0; turns -= 1) out = rotateShape(out);
  return out;
}

export function mirrorShape(cells: readonly GcCell[]): GcCell[] {
  return normalizeShape(cells.map((cell) => [cell[0], -cell[1]] as GcCell));
}

export function shapeRotations(cells: readonly GcCell[]): GcCell[][] {
  const out: GcCell[][] = [];
  const seen = new Set<string>();
  let current = normalizeShape(cells);
  for (let i = 0; i < 4; i += 1) {
    const signature = shapeSignature(current);
    if (!seen.has(signature)) {
      seen.add(signature);
      out.push(current);
    }
    current = rotateShape(current);
  }
  return out;
}

export function isRotationOf(reference: readonly GcCell[], candidate: readonly GcCell[]): boolean {
  return shapeRotations(reference).some((rotation) => sameShape(rotation, candidate));
}

export function isConnected(cells: readonly GcCell[]): boolean {
  if (!cells.length) return false;
  const remaining = new Set(cells.map(cellKey));
  const queue: GcCell[] = [cells[0]];
  remaining.delete(cellKey(cells[0]));
  while (queue.length) {
    const [row, col] = queue.shift()!;
    for (const next of [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]] as GcCell[]) {
      const key = cellKey(next);
      if (remaining.has(key)) {
        remaining.delete(key);
        queue.push(next);
      }
    }
  }
  return remaining.size === 0;
}

export function shapeBounds(cells: readonly GcCell[]): { rows: number; cols: number } {
  if (!cells.length) return { rows: 0, cols: 0 };
  return {
    rows: Math.max(...cells.map((cell) => cell[0])) - Math.min(...cells.map((cell) => cell[0])) + 1,
    cols: Math.max(...cells.map((cell) => cell[1])) - Math.min(...cells.map((cell) => cell[1])) + 1,
  };
}

/** Grow a random connected shape (polyomino) of `size` cells inside a maxSide × maxSide box. */
function growShape(rng: Rng, size: number, maxSide: number): GcCell[] {
  for (;;) {
    const cells: GcCell[] = [[0, 0]];
    const taken = new Set([cellKey([0, 0])]);
    let guard = 0;
    while (cells.length < size && guard < 200) {
      guard += 1;
      const [row, col] = pick(rng, cells);
      const next = pick(rng, [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]] as GcCell[]);
      if (taken.has(cellKey(next))) continue;
      const bounds = shapeBounds([...cells, next]);
      if (bounds.rows > maxSide || bounds.cols > maxSide) continue;
      taken.add(cellKey(next));
      cells.push(next);
    }
    if (cells.length === size) return normalizeShape(cells);
  }
}

/* ========================================================================== *
 * Independent answer checkers
 * ========================================================================== */

export function isMirrorSymmetric(question: Pick<GcSymmetryQuestion, 'filled' | 'cols'>): boolean {
  const filled = new Set(question.filled.map(cellKey));
  return question.filled.every((cell) => filled.has(cellKey([cell[0], question.cols - 1 - cell[1]])));
}

/**
 * True when the two pieces, each turned by any quarter-turn (never flipped) and
 * slid to any position, cover the target exactly with no overlap.
 */
export function piecesFormTarget(pieces: readonly [readonly GcCell[], readonly GcCell[]], target: readonly GcCell[]): boolean {
  const [first, second] = pieces;
  if (first.length + second.length !== target.length) return false;
  const targetCells = normalizeShape(target);
  const targetKeys = new Set(targetCells.map(cellKey));
  for (const rotation of shapeRotations(first)) {
    for (const anchor of targetCells) {
      // Place the rotation's first cell on every target cell.
      const dr = anchor[0] - rotation[0][0];
      const dc = anchor[1] - rotation[0][1];
      const placed = rotation.map((cell) => [cell[0] + dr, cell[1] + dc] as GcCell);
      if (!placed.every((cell) => targetKeys.has(cellKey(cell)))) continue;
      const placedKeys = new Set(placed.map(cellKey));
      const rest = targetCells.filter((cell) => !placedKeys.has(cellKey(cell)));
      if (isRotationOf(second, rest)) return true;
    }
  }
  return false;
}

/** Re-derive the answer from the figure alone, without trusting how it was built. */
export function checkGcAnswer(question: GcQuestion): GcAnswer {
  switch (question.kind) {
    case 'symmetry':
      return isMirrorSymmetric(question) ? 'yes' : 'no';
    case 'rotation':
      return isRotationOf(question.shapeA, question.shapeB) ? 'yes' : 'no';
    case 'combination':
      return piecesFormTarget(question.pieces, question.target) ? 'yes' : 'no';
    default:
      return 'no';
  }
}

/* ========================================================================== *
 * Question generators (answer fixed by construction, then re-checked)
 * ========================================================================== */

function buildSymmetry(rng: Rng, id: string, answer: GcAnswer): GcSymmetryQuestion {
  const rows = GC_SYMMETRY_ROWS;
  const cols = GC_SYMMETRY_COLS;
  const half = cols / 2;
  for (;;) {
    const left: GcCell[] = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < half; col += 1) {
        if (rng() < 0.42) left.push([row, col]);
      }
    }
    if (left.length < 8 || left.length > 22) continue;
    const filled = new Set<string>();
    left.forEach(([row, col]) => {
      filled.add(cellKey([row, col]));
      filled.add(cellKey([row, cols - 1 - col]));
    });
    if (answer === 'no') {
      // Break the mirror in one or two cells on the right half only.
      const flips = randomInt(rng, 1, 2);
      const candidates = shuffle(rng, Array.from({ length: rows * half }, (_, i) => [Math.floor(i / half), half + (i % half)] as GcCell));
      candidates.slice(0, flips).forEach((cell) => {
        const key = cellKey(cell);
        if (filled.has(key)) filled.delete(key);
        else filled.add(key);
      });
    }
    const cells = Array.from(filled)
      .map((key) => key.split(',').map(Number) as unknown as GcCell)
      .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const question: GcSymmetryQuestion = { kind: 'symmetry', id, rows, cols, filled: cells, answer };
    if (checkGcAnswer(question) === answer) return question;
  }
}

function buildRotation(rng: Rng, id: string, answer: GcAnswer, size: number): GcRotationQuestion {
  for (;;) {
    const shapeA = growShape(rng, size, 4);
    // A shape that equals its own mirror image (up to rotation) cannot make a fair "No".
    if (isRotationOf(shapeA, mirrorShape(shapeA))) continue;
    // Skip shapes that look identical after every turn, so B always looks turned.
    const turns = ([90, 180, 270] as const).filter((turn) => !sameShape(rotateShapeBy(shapeA, turn), shapeA));
    if (!turns.length) continue;
    const turn = pick(rng, turns);
    const base = answer === 'yes' ? shapeA : mirrorShape(shapeA);
    const shapeB = rotateShapeBy(base, turn);
    const question: GcRotationQuestion = { kind: 'rotation', id, shapeA, shapeB, turn, answer };
    if (checkGcAnswer(question) === answer) return question;
  }
}

function neighbours(cell: GcCell): GcCell[] {
  return [[cell[0] + 1, cell[1]], [cell[0] - 1, cell[1]], [cell[0], cell[1] + 1], [cell[0], cell[1] - 1]];
}

function buildCombination(rng: Rng, id: string, answer: GcAnswer, sizes: readonly [number, number]): GcCombinationQuestion {
  for (;;) {
    const first = growShape(rng, sizes[0], 3);
    const second = growShape(rng, sizes[1], 3);
    // Slide the second piece next to the first without overlap.
    const firstKeys = new Set(first.map(cellKey));
    const placements: GcCell[][] = [];
    for (let dr = -3; dr <= 3; dr += 1) {
      for (let dc = -3; dc <= 3; dc += 1) {
        const placed = second.map((cell) => [cell[0] + dr, cell[1] + dc] as GcCell);
        if (placed.some((cell) => firstKeys.has(cellKey(cell)))) continue;
        if (!isConnected([...first, ...placed])) continue;
        placements.push(placed);
      }
    }
    if (!placements.length) continue;
    let target = normalizeShape([...first, ...pick(rng, placements)]);
    const bounds = shapeBounds(target);
    if (bounds.rows > 5 || bounds.cols > 5) continue;

    if (answer === 'no') {
      // Move one cell of the target to another free spot next to it: same cell
      // count, still one connected shape, but no longer the two pieces combined.
      const targetKeys = new Set(target.map(cellKey));
      const moves: GcCell[][] = [];
      target.forEach((removed) => {
        const without = target.filter((cell) => !sameCell(cell, removed));
        if (!isConnected(without)) return;
        without.forEach((cell) => {
          neighbours(cell).forEach((added) => {
            if (targetKeys.has(cellKey(added))) return;
            const moved = normalizeShape([...without, added]);
            const movedBounds = shapeBounds(moved);
            if (movedBounds.rows > 5 || movedBounds.cols > 5) return;
            if (!piecesFormTarget([first, second], moved)) moves.push(moved);
          });
        });
      });
      if (!moves.length) continue;
      target = pick(rng, moves);
    }

    // Show each piece turned independently so the candidate has to rotate it mentally.
    const pieces: [GcCell[], GcCell[]] = [
      rotateShapeBy(first, pick(rng, [0, 90, 180, 270] as const)),
      rotateShapeBy(second, pick(rng, [0, 90, 180, 270] as const)),
    ];
    const question: GcCombinationQuestion = { kind: 'combination', id, pieces, target, answer };
    if (checkGcAnswer(question) === answer) return question;
  }
}

function buildQuestion(rng: Rng, kind: GcRoundKind, id: string, answer: GcAnswer, taskInRound: number): GcQuestion {
  if (kind === 'symmetry') return buildSymmetry(rng, id, answer);
  if (kind === 'rotation') return buildRotation(rng, id, answer, taskInRound === 0 ? 6 : 7);
  const sizes: [number, number] = taskInRound === 0 ? [3, 4] : [4, 4];
  return buildCombination(rng, id, answer, sizes);
}

/* ========================================================================== *
 * Sessions
 * ========================================================================== */

function dotSequence(rng: Rng, length: number): GcCell[] {
  const cells = Array.from({ length: GC_MEMORY_SIZE * GC_MEMORY_SIZE }, (_, i) => [Math.floor(i / GC_MEMORY_SIZE), i % GC_MEMORY_SIZE] as GcCell);
  return shuffle(rng, cells).slice(0, length);
}

/** Problems with a session's structure or answer key; empty when it is safe to hand out. */
export function validateGridSession(session: GcSession): string[] {
  const problems: string[] = [];
  if (session.tasks.length !== 9) problems.push(`expected 9 tasks, found ${session.tasks.length}`);
  let previousDots = 0;
  session.tasks.forEach((task, index) => {
    const round = Math.floor(index / 3);
    const spec = GC_ROUNDS[round];
    if (!spec) return;
    if (task.index !== index) problems.push(`${task.id}: index ${task.index} should be ${index}`);
    if (task.round !== round || task.kind !== spec.kind) problems.push(`${task.id}: should be round ${round + 1} (${spec.kind})`);
    const dots = task.steps.map((step) => step.dot);
    if (dots.length < 2 || dots.length > 5) problems.push(`${task.id}: ${dots.length} dots, expected 2–5`);
    if (dots.length < previousDots) problems.push(`${task.id}: dot count falls from ${previousDots} to ${dots.length}`);
    previousDots = dots.length;
    if (new Set(dots.map(cellKey)).size !== dots.length) problems.push(`${task.id}: a dot repeats`);
    dots.forEach((dot) => {
      if (dot[0] < 0 || dot[1] < 0 || dot[0] >= GC_MEMORY_SIZE || dot[1] >= GC_MEMORY_SIZE) problems.push(`${task.id}: dot ${cellKey(dot)} is off the field`);
    });
    task.steps.forEach((step) => {
      if (step.question.kind !== spec.kind) problems.push(`${step.question.id}: ${step.question.kind} in a ${spec.kind} round`);
      if (step.question.answer !== 'yes' && step.question.answer !== 'no') problems.push(`${step.question.id}: no answer key`);
      else if (checkGcAnswer(step.question) !== step.question.answer) problems.push(`${step.question.id}: stored answer ${step.question.answer} fails the independent check`);
    });
  });
  if (previousDots < 4) problems.push('the last round should show 4–5 dots per task');
  const ids = session.tasks.flatMap((task) => task.steps.map((step) => step.question.id));
  if (new Set(ids).size !== ids.length) problems.push('question ids repeat');
  return problems;
}

export function buildGridSession(seed: number = Math.floor(Math.random() * 2 ** 31)): GcSession {
  const rng = createRng(seed);
  const id = `gc-${seed.toString(36)}`;
  const tasks: GcTask[] = [];
  GC_ROUNDS.forEach((spec, round) => {
    const roundQuestions = spec.dots.reduce((sum, count) => sum + count, 0);
    // Half Yes, half No in every round (odd counts tip at random), dealt in random order.
    const yesCount = Math.floor(roundQuestions / 2) + (roundQuestions % 2 && rng() < 0.5 ? 1 : 0);
    const answers = shuffle(rng, Array.from({ length: roundQuestions }, (_, i) => (i < yesCount ? 'yes' : 'no') as GcAnswer));
    let cursor = 0;
    spec.dots.forEach((count, taskInRound) => {
      const index = tasks.length;
      const taskId = `${id}-t${index + 1}`;
      const dots = dotSequence(rng, count);
      tasks.push({
        id: taskId,
        index,
        round,
        kind: spec.kind,
        steps: dots.map((dot, step) => ({
          dot,
          question: buildQuestion(rng, spec.kind, `${taskId}-q${step + 1}`, answers[cursor++], taskInRound),
        })),
      });
    });
  });
  const totalDots = tasks.reduce((sum, task) => sum + task.steps.length, 0);
  const session: GcSession = { id, seed, timeLimitSeconds: GC_TIME_LIMIT_SECONDS, tasks, totalDots, totalQuestions: totalDots };
  const problems = validateGridSession(session);
  if (problems.length) throw new Error(`Grid Challenge session ${id} failed validation: ${problems.join('; ')}`);
  return session;
}

/* ========================================================================== *
 * Scoring and history rows
 * ========================================================================== */

/** Dots recalled in the right cell AND the right position in the order. */
export function recallCorrectCount(task: GcTask, recall: readonly GcCell[] | undefined): number {
  if (!recall) return 0;
  return task.steps.reduce((sum, step, i) => sum + (sameCell(recall[i], step.dot) ? 1 : 0), 0);
}

const percentOf = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

export function scoreGridSession(session: GcSession, responses: GcResponses, durationSeconds: number, timedOut: boolean): GcResult {
  let memoryCorrect = 0;
  let reasoningCorrect = 0;
  let reasoningAnswered = 0;
  let tasksCompleted = 0;
  session.tasks.forEach((task) => {
    const recall = responses.recalls[task.id];
    if (recall) tasksCompleted += 1;
    memoryCorrect += recallCorrectCount(task, recall);
    task.steps.forEach((step) => {
      const answer = responses.answers[step.question.id];
      if (!answer) return;
      reasoningAnswered += 1;
      if (answer === step.question.answer) reasoningCorrect += 1;
    });
  });
  const score = memoryCorrect + reasoningCorrect;
  const total = session.totalDots + session.totalQuestions;
  return {
    memoryCorrect,
    memoryTotal: session.totalDots,
    memoryPercent: percentOf(memoryCorrect, session.totalDots),
    reasoningCorrect,
    reasoningAnswered,
    reasoningTotal: session.totalQuestions,
    reasoningPercent: percentOf(reasoningCorrect, session.totalQuestions),
    tasksCompleted,
    tasksTotal: session.tasks.length,
    score,
    total,
    percent: percentOf(score, total),
    durationSeconds: Math.max(0, Math.min(session.timeLimitSeconds, Math.round(durationSeconds))),
    timedOut,
  };
}

const cellLabel = (cell: GcCell) => `r${cell[0] + 1}c${cell[1] + 1}`;

/**
 * `aptitude_attempts.answers_json` rows. Yes/No rows carry is_correct so they
 * count towards Overall Accuracy; recall rows carry credit_percent, so they count
 * as practised but stay out of right/wrong accuracy (see lib/aptitudeProgress.ts).
 */
export function gridAttemptAnswerRows(session: GcSession, responses: GcResponses): Record<string, unknown>[] {
  return session.tasks.flatMap((task) => {
    const recall = responses.recalls[task.id];
    const correctDots = recallCorrectCount(task, recall);
    const reasoningRows = task.steps.map((step) => {
      const chosen = responses.answers[step.question.id] ?? null;
      return {
        question_id: step.question.id,
        part: 'reasoning',
        question_type: step.question.kind,
        round: task.round + 1,
        task: task.index + 1,
        answered: chosen !== null,
        chosen,
        correct: step.question.answer,
        is_correct: chosen === step.question.answer,
      };
    });
    return [
      ...reasoningRows,
      {
        question_id: `${task.id}-recall`,
        part: 'memory',
        round: task.round + 1,
        task: task.index + 1,
        answered: Boolean(recall),
        chosen: recall ? recall.map(cellLabel).join(' > ') : null,
        correct: task.steps.map((step) => cellLabel(step.dot)).join(' > '),
        is_correct: correctDots === task.steps.length,
        dots_correct: correctDots,
        dots_total: task.steps.length,
        credit_percent: percentOf(correctDots, task.steps.length),
      },
    ];
  });
}

export interface GcAttemptSummary {
  memoryPercent: number | null;
  reasoningPercent: number | null;
  tasksCompleted: number | null;
}

/** Read memory / reasoning figures back out of a saved answers_json. */
export function summarizeGridAttempt(raw: unknown): GcAttemptSummary {
  let value = raw;
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch {
      value = null;
    }
  }
  if (!Array.isArray(value)) return { memoryPercent: null, reasoningPercent: null, tasksCompleted: null };
  const rows = value.filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === 'object');
  const memory = rows.filter((row) => row.part === 'memory');
  const reasoning = rows.filter((row) => row.part === 'reasoning');
  const dotsTotal = memory.reduce((sum, row) => sum + (Number(row.dots_total) || 0), 0);
  const dotsCorrect = memory.reduce((sum, row) => sum + (Number(row.dots_correct) || 0), 0);
  return {
    memoryPercent: dotsTotal ? percentOf(dotsCorrect, dotsTotal) : null,
    reasoningPercent: reasoning.length ? percentOf(reasoning.filter((row) => row.is_correct === true).length, reasoning.length) : null,
    tasksCompleted: memory.length ? memory.filter((row) => row.answered === true).length : null,
  };
}
