// Casemate — Spatial Reasoning engine.
// Every visual and answer is derived from the same deterministic rule. The SVG
// vocabulary is shared with Inductive Reasoning, so it stays sharp on any screen.

import type { Figure, Prim } from './inductive';

export type SpatialDifficulty = 'easy' | 'medium' | 'hard';
export type SpatialSubtype = 'rotation' | 'reflection' | 'odd_one_out' | 'sequence' | 'matrix' | 'folding' | 'unfolding' | 'block_rotation' | 'top_view' | 'assembly';

export interface SpatialExpandedQuestion {
  kind: 'spatial';
  id: string;
  difficulty: SpatialDifficulty;
  subtype: SpatialSubtype;
  stimulus: Figure[];
  options: Figure[];
  optionLabels: string[];
  correctAnswer: string;
  prompt: string;
  patternName: string;
  explanation: string;
  answerSummary: string;
}

export interface SpatialTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: string;
  difficultyBreakdown: string;
  timeLimitSeconds: number;
  questions: SpatialExpandedQuestion[];
}

const LABELS = ['A', 'B', 'C', 'D'];

export function spatialHash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) { h ^= value.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function rng(seed: number): () => number {
  let a = (seed >>> 0) || 1;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) { const j = Math.floor(next() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

function pick<T>(items: readonly T[], next: () => number): T { return items[Math.floor(next() * items.length)]; }
function norm(deg: number): number { return ((deg % 360) + 360) % 360; }
function pointAt(cx: number, cy: number, radius: number, deg: number): [number, number] { const a = (deg - 90) * Math.PI / 180; return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius]; }

function glyphFigure(deg: number, mirrored: boolean, filled: boolean, detail = 0): Figure {
  const [mx, my] = pointAt(50, 50, 29, mirrored ? -deg : deg);
  const prims: Prim[] = [
    { k: 'lshape', cx: 50, cy: 51, r: 25, rot: deg, flip: mirrored ? -1 : 1, fill: filled ? 'solid' : 'none' },
    { k: 'dot', cx: mx, cy: my, r: 4, fill: 'solid' },
  ];
  if (detail > 0) { const [x, y] = pointAt(50, 50, 18, mirrored ? deg + 90 : deg - 90); prims.push({ k: 'poly', cx: x, cy: y, r: 5, sides: detail % 2 === 0 ? 3 : 4, rot: deg, fill: 'none' }); }
  return { prims };
}

function figureKey(figure: Figure): string { return JSON.stringify(figure); }
function choices(correct: Figure, wrong: Figure[], next: () => number): { options: Figure[]; answer: string } {
  const uniqueWrong: Figure[] = []; const seen = new Set([figureKey(correct)]);
  for (const candidate of wrong) { const key = figureKey(candidate); if (seen.has(key)) continue; seen.add(key); uniqueWrong.push(candidate); if (uniqueWrong.length === 3) break; }
  if (uniqueWrong.length !== 3) throw new Error('Spatial generator did not produce three distinct distractors.');
  const all = shuffle([correct, ...uniqueWrong], next); const index = all.findIndex((option) => figureKey(option) === figureKey(correct));
  return { options: all, answer: LABELS[index] };
}

function baseQuestion(id: string, difficulty: SpatialDifficulty, subtype: SpatialSubtype, stimulus: Figure[], correct: Figure, wrong: Figure[], prompt: string, patternName: string, explanation: string, next: () => number): SpatialExpandedQuestion {
  const built = choices(correct, wrong, next);
  return { kind: 'spatial', id, difficulty, subtype, stimulus, options: built.options, optionLabels: LABELS, correctAnswer: built.answer, prompt, patternName, explanation, answerSummary: `Correct answer: ${built.answer}.` };
}

function rotationQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const start = pick([0, 45, 90, 135, 180, 225, 270, 315], next);
  const turn = difficulty === 'easy' ? pick([90, -90], next) : difficulty === 'medium' ? pick([45, 90, -45, -90], next) : pick([135, -135, 225, -225], next);
  const filled = next() < 0.5; const detail = difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1 : 0;
  return baseQuestion(id, difficulty, 'rotation', [glyphFigure(start, false, filled, detail)], glyphFigure(norm(start + turn), false, filled, detail), [glyphFigure(norm(start - turn), false, filled, detail), glyphFigure(norm(start + turn), true, filled, detail), glyphFigure(norm(start + turn + 90), false, !filled, detail), glyphFigure(norm(start + turn + 180), false, filled, detail)], `Which option shows the same figure after a ${Math.abs(turn)}° ${turn > 0 ? 'clockwise' : 'anticlockwise'} rotation?`, 'Mental rotation', `Rotate every part ${Math.abs(turn)}° ${turn > 0 ? 'clockwise' : 'anticlockwise'}. Handedness and fill do not change.`, next);
}

function reflectionQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const angle = pick([0, 45, 90, 135, 180, 225, 270, 315], next); const filled = next() < 0.5; const detail = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2;
  return baseQuestion(id, difficulty, 'reflection', [glyphFigure(angle, false, filled, detail)], glyphFigure(norm(-angle), true, filled, detail), [glyphFigure(norm(-angle), false, filled, detail), glyphFigure(norm(angle + 180), false, filled, detail), glyphFigure(norm(-angle + 90), true, filled, detail), glyphFigure(norm(-angle), true, !filled, detail)], 'Which option is the exact image in a vertical mirror?', 'Mirror image', 'A vertical mirror swaps left and right. It reverses the L-shape and marker position but does not alter the fill.', next);
}

function oddQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const base = pick([0, 45, 90, 135], next); const filled = next() < 0.5; const detail = difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1 : 0;
  return baseQuestion(id, difficulty, 'odd_one_out', [glyphFigure(base, false, filled, detail)], glyphFigure(norm(base + 90), true, filled, detail), [glyphFigure(norm(base + 90), false, filled, detail), glyphFigure(norm(base + 180), false, filled, detail), glyphFigure(norm(base + 270), false, filled, detail), glyphFigure(base, false, !filled, detail)], 'Three options are rotations of the reference. Which option is the odd one out?', 'Rotation versus reflection', 'Rotation preserves handedness. The correct option reverses the L-shape, so it is a reflection rather than a rotation.', next);
}

function sequenceQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const start = pick([0, 45, 90, 135, 180, 225, 270, 315], next); const step = difficulty === 'easy' ? pick([90, -90], next) : difficulty === 'medium' ? pick([45, 90, -45], next) : pick([135, -135], next); const startFill = next() < 0.5; const fillChanges = difficulty !== 'easy'; const detail = difficulty === 'hard' ? 2 : 0;
  const state = (i: number) => glyphFigure(norm(start + step * i), difficulty === 'hard' ? i % 3 === 2 : false, fillChanges ? (i % 2 === 0 ? startFill : !startFill) : startFill, detail);
  return baseQuestion(id, difficulty, 'sequence', [state(0), state(1), state(2), state(3)], state(4), [glyphFigure(norm(start + step * 3), false, startFill, detail), glyphFigure(norm(start - step * 4), false, fillChanges ? startFill : !startFill, detail), glyphFigure(norm(start + step * 4 + 90), difficulty === 'hard', !startFill, detail), glyphFigure(norm(start + step * 5), false, startFill, detail)], 'Which figure comes next in the sequence?', 'Spatial sequence', difficulty === 'easy' ? `The whole figure turns ${Math.abs(step)}° ${step > 0 ? 'clockwise' : 'anticlockwise'} each step.` : difficulty === 'medium' ? `The figure turns ${Math.abs(step)}° ${step > 0 ? 'clockwise' : 'anticlockwise'} while the fill alternates.` : `Track the ${Math.abs(step)}° turn, alternating fill and repeating mirror state.`, next);
}

function miniArrow(cx: number, cy: number, deg: number, filled: boolean): Prim[] { return [{ k: 'arrow', cx, cy, len: 15, rot: deg, fill: filled ? 'solid' : 'none' }, { k: 'dot', cx: cx + 7, cy: cy - 7, r: 1.8, fill: 'solid' }]; }
function matrixStimulus(rowStep: number, colStep: number, fillByRow: boolean): Figure {
  const prims: Prim[] = []; const left = 14; const top = 14; const cell = 24;
  for (let i = 0; i <= 3; i += 1) { prims.push({ k: 'line', x1: left, y1: top + i * cell, x2: left + 3 * cell, y2: top + i * cell, w: 1.5 }); prims.push({ k: 'line', x1: left + i * cell, y1: top, x2: left + i * cell, y2: top + 3 * cell, w: 1.5 }); }
  for (let row = 0; row < 3; row += 1) for (let col = 0; col < 3; col += 1) { const cx = left + col * cell + cell / 2; const cy = top + row * cell + cell / 2; if (row === 2 && col === 2) prims.push({ k: 'text', cx, cy: cy + 5, s: '?', size: 17 }); else prims.push(...miniArrow(cx, cy, norm(row * rowStep + col * colStep), fillByRow ? row % 2 === 0 : col % 2 === 0)); }
  return { prims };
}
function matrixOption(deg: number, filled: boolean): Figure { return { prims: miniArrow(50, 51, deg, filled) }; }
function matrixQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const rowStep = difficulty === 'easy' ? 0 : pick([45, 90, -45, -90], next); const colStep = difficulty === 'hard' ? pick([45, 90, -45], next) : pick([90, -90], next); const fillByRow = next() < 0.5; const deg = norm(2 * rowStep + 2 * colStep); const filled = fillByRow;
  return baseQuestion(id, difficulty, 'matrix', [matrixStimulus(rowStep, colStep, fillByRow)], matrixOption(deg, filled), [matrixOption(norm(deg + 90), filled), matrixOption(norm(deg - 90), filled), matrixOption(deg, !filled), matrixOption(norm(deg + 180), !filled)], 'Which figure replaces the question mark in the 3 × 3 matrix?', 'Matrix completion', difficulty === 'easy' ? `Across each row the arrow turns ${Math.abs(colStep)}°; fill is fixed by the ${fillByRow ? 'row' : 'column'}.` : `Combine the row turn (${rowStep}°) with the column turn (${colStep}°), then apply the alternating ${fillByRow ? 'row' : 'column'} fill.`, next);
}

const FACE_SYMBOLS = ['●', '▲', '■', '◆', '★', '+', '○', '△'];
function cubeNetFigure(labels: string[]): Figure {
  const prims: Prim[] = []; const positions: [number, number][] = [[42, 42], [58, 42], [74, 42], [26, 42], [42, 26], [42, 58]];
  positions.forEach(([cx, cy], i) => { prims.push({ k: 'rect', cx, cy, w: 16, h: 16, rot: 0, fill: 'none' }); prims.push({ k: 'text', cx, cy: cy + 4, s: labels[i], size: 9 }); }); return { prims };
}
function cubeCornerFigure(labels: string[]): Figure { return { prims: [{ k: 'line', x1: 50, y1: 49, x2: 26, y2: 66, w: 2 }, { k: 'line', x1: 50, y1: 49, x2: 74, y2: 66, w: 2 }, { k: 'line', x1: 50, y1: 49, x2: 50, y2: 21, w: 2 }, { k: 'circle', cx: 50, cy: 19, r: 13, fill: 'none' }, { k: 'circle', cx: 24, cy: 68, r: 13, fill: 'none' }, { k: 'circle', cx: 76, cy: 68, r: 13, fill: 'none' }, { k: 'text', cx: 50, cy: 23, s: labels[0], size: 13 }, { k: 'text', cx: 24, cy: 72, s: labels[1], size: 13 }, { k: 'text', cx: 76, cy: 72, s: labels[2], size: 13 }] }; }
function foldingQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const labels = shuffle(FACE_SYMBOLS, next).slice(0, 6); const triple = difficulty === 'easy' ? [labels[0], labels[1], labels[4]] : difficulty === 'medium' ? [labels[2], labels[3], labels[5]] : [labels[0], labels[3], labels[5]];
  return baseQuestion(id, difficulty, 'folding', [cubeNetFigure(labels)], cubeCornerFigure(triple), [cubeCornerFigure([labels[0], labels[2], labels[4]]), cubeCornerFigure([labels[1], labels[3], labels[5]]), cubeCornerFigure([labels[4], labels[5], labels[0]]), cubeCornerFigure([labels[0], labels[2], labels[1]])], 'The net is folded into a cube. Which set of three faces can meet at one corner?', '3D folding', `Opposite faces cannot meet at a corner. The pairs are ${labels[0]}–${labels[2]}, ${labels[1]}–${labels[3]} and ${labels[4]}–${labels[5]}; the answer contains one from each pair.`, next);
}

function swapLabels(labels: string[], a: number, b: number): string[] {
  const out = labels.slice();
  [out[a], out[b]] = [out[b], out[a]];
  return out;
}

function unfoldingQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const labels = shuffle(FACE_SYMBOLS, next).slice(0, 6);
  const firstCorner = difficulty === 'easy' ? [labels[0], labels[1], labels[4]] : [labels[0], labels[3], labels[5]];
  const oppositeCorner = difficulty === 'hard' ? [labels[2], labels[1], labels[5]] : [labels[2], labels[3], labels[5]];
  return baseQuestion(
    id, difficulty, 'unfolding', [cubeCornerFigure(firstCorner), cubeCornerFigure(oppositeCorner)], cubeNetFigure(labels),
    [cubeNetFigure(swapLabels(labels, 1, 2)), cubeNetFigure(swapLabels(labels, 3, 4)), cubeNetFigure(swapLabels(labels, 2, 5)), cubeNetFigure(swapLabels(labels, 0, 4))],
    'The two views show the same cube. Which option is a possible unfolded net?',
    '3D unfolding',
    `Use both views to identify the opposite pairs, then choose the net that places ${labels[0]} opposite ${labels[2]}, ${labels[1]} opposite ${labels[3]} and ${labels[4]} opposite ${labels[5]}.`,
    next,
  );
}

type Cell = [number, number];
function cellKey(cell: Cell): string { return `${cell[0]},${cell[1]}`; }
function topGridFigure(cells: Cell[], size = 3): Figure {
  const prims: Prim[] = []; const span = 66; const gap = span / size; const left = 17; const top = 17; const occupied = new Set(cells.map(cellKey));
  for (let row = 0; row < size; row += 1) for (let col = 0; col < size; col += 1) prims.push({ k: 'rect', cx: left + col * gap + gap / 2, cy: top + row * gap + gap / 2, w: gap - 2, h: gap - 2, rot: 0, fill: occupied.has(`${col},${row}`) ? 'solid' : 'none' });
  return { prims };
}
function towerFigure(cells: Cell[], heights: number[], size = 3): Figure {
  const prims: Prim[] = [{ k: 'text', cx: 50, cy: 94, s: 'FRONT', size: 7 }];
  cells.forEach(([col, row], i) => { const baseX = 50 + (col - row) * 17; const baseY = 68 + (col + row - (size - 1)) * 8; for (let level = 0; level < heights[i]; level += 1) { const cy = baseY - level * 11; prims.push({ k: 'poly', cx: baseX, cy, r: 10, sides: 4, rot: 45, fill: level === heights[i] - 1 ? 'striped' : 'none' }); prims.push({ k: 'line', x1: baseX - 7, y1: cy + 7, x2: baseX - 7, y2: cy + 15, w: 1 }); prims.push({ k: 'line', x1: baseX + 7, y1: cy + 7, x2: baseX + 7, y2: cy + 15, w: 1 }); } }); return { prims };
}
function moveCell(cells: Cell[], size: number, fromIndex: number, offset: number): Cell[] {
  const out = cells.map((c) => [c[0], c[1]] as Cell); const used = new Set(out.map(cellKey)); out.splice(fromIndex % out.length, 1);
  for (let i = 0; i < size * size; i += 1) { const idx = (offset + i) % (size * size); const candidate: Cell = [idx % size, Math.floor(idx / size)]; if (!used.has(cellKey(candidate))) { out.push(candidate); break; } }
  return out.sort((a, b) => cellKey(a).localeCompare(cellKey(b)));
}
function topViewQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const size = difficulty === 'hard' ? 4 : 3; const count = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 7; const all: Cell[] = [];
  for (let row = 0; row < size; row += 1) for (let col = 0; col < size; col += 1) all.push([col, row]);
  const cells = shuffle(all, next).slice(0, count).sort((a, b) => cellKey(a).localeCompare(cellKey(b))); const heights = cells.map(() => 1 + Math.floor(next() * (difficulty === 'easy' ? 2 : 3)));
  return baseQuestion(id, difficulty, 'top_view', [towerFigure(cells, heights, size)], topGridFigure(cells, size), [topGridFigure(moveCell(cells, size, 0, 1), size), topGridFigure(moveCell(cells, size, 1, 3), size), topGridFigure(moveCell(cells, size, 2, 5), size), topGridFigure(cells.slice(1), size)], 'Which option shows the block towers as seen directly from above?', 'Top view', 'From above, tower height is hidden. Mark one occupied square for every ground position containing at least one block.', next);
}

interface TowerCell { cell: Cell; height: number }
function transformTower(items: TowerCell[], size: number, turns: number, mirror = false): TowerCell[] {
  return items.map((item) => {
    let x = mirror ? size - 1 - item.cell[0] : item.cell[0];
    let y = item.cell[1];
    for (let turn = 0; turn < ((turns % 4) + 4) % 4; turn += 1) [x, y] = [size - 1 - y, x];
    return { cell: [x, y], height: item.height };
  }).sort((a, b) => cellKey(a.cell).localeCompare(cellKey(b.cell)));
}
function drawTower(items: TowerCell[], size: number): Figure {
  return towerFigure(items.map((item) => item.cell), items.map((item) => item.height), size);
}
function blockRotationQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const size = difficulty === 'easy' ? 2 : 3;
  const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
  const cells: Cell[] = [];
  for (let row = 0; row < size; row += 1) for (let col = 0; col < size; col += 1) cells.push([col, row]);
  const source: TowerCell[] = shuffle(cells, next).slice(0, count).map((cell) => ({ cell, height: 1 + Math.floor(next() * (difficulty === 'easy' ? 2 : 3)) }));
  const turns = difficulty === 'hard' ? pick([1, 2, 3], next) : pick([1, 3], next);
  const changedHeight = transformTower(source, size, turns).map((item, index) => index === 0 ? { ...item, height: item.height === 3 ? 2 : item.height + 1 } : item);
  return baseQuestion(
    id, difficulty, 'block_rotation', [drawTower(source, size)], drawTower(transformTower(source, size, turns), size),
    [drawTower(transformTower(source, size, 4 - turns), size), drawTower(transformTower(source, size, turns, true), size), drawTower(changedHeight, size), drawTower(source, size)],
    `Which option shows the same block structure after a ${turns * 90}° clockwise turn?`,
    'Isometric 3D rotation',
    `Rotate the complete footprint ${turns * 90}° clockwise. Every tower keeps its height and the structure is not reflected.`,
    next,
  );
}

function normaliseCells(cells: Cell[]): Cell[] { const minX = Math.min(...cells.map((c) => c[0])); const minY = Math.min(...cells.map((c) => c[1])); return cells.map(([x, y]) => [x - minX, y - minY] as Cell).sort((a, b) => cellKey(a).localeCompare(cellKey(b))); }
function connectedSilhouette(count: number, next: () => number): Cell[] {
  const cells: Cell[] = [[1, 1]]; const used = new Set(['1,1']); const directions: Cell[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (cells.length < count) { const anchor = pick(cells, next); const direction = pick(directions, next); const cell: Cell = [anchor[0] + direction[0], anchor[1] + direction[1]]; if (cell[0] < 0 || cell[1] < 0 || cell[0] > 4 || cell[1] > 4 || used.has(cellKey(cell))) continue; used.add(cellKey(cell)); cells.push(cell); }
  return normaliseCells(cells);
}
function silhouetteFigure(cells: Cell[], filled = true): Figure {
  const normal = normaliseCells(cells); const width = Math.max(...normal.map((c) => c[0])) + 1; const height = Math.max(...normal.map((c) => c[1])) + 1; const gap = Math.min(18, 66 / Math.max(width, height)); const left = 50 - width * gap / 2 + gap / 2; const top = 50 - height * gap / 2 + gap / 2;
  return { prims: normal.map(([x, y]) => ({ k: 'rect', cx: left + x * gap, cy: top + y * gap, w: gap - 1, h: gap - 1, rot: 0, fill: filled ? 'solid' : 'none' } as Prim)) };
}
function piecesFigure(cells: Cell[]): Figure {
  const target = normaliseCells(cells);
  const occupied = new Set(target.map(cellKey));
  const seedIndexes = [0, Math.floor(target.length / 2), target.length - 1];
  const owner = new Map<string, number>();
  seedIndexes.forEach((seedIndex, piece) => owner.set(cellKey(target[seedIndex]), piece));
  const directions: Cell[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  while (owner.size < target.length) {
    let changed = false;
    for (let piece = 0; piece < 3; piece += 1) {
      const frontier = target.filter((cell) => owner.get(cellKey(cell)) === piece);
      for (const cell of frontier) {
        const candidate = directions
          .map(([dx, dy]) => [cell[0] + dx, cell[1] + dy] as Cell)
          .find((nextCell) => occupied.has(cellKey(nextCell)) && !owner.has(cellKey(nextCell)));
        if (candidate) { owner.set(cellKey(candidate), piece); changed = true; break; }
      }
    }
    if (!changed) break;
  }
  const pieces = [0, 1, 2].map((piece) => target.filter((cell) => owner.get(cellKey(cell)) === piece));
  const prims: Prim[] = [];
  pieces.forEach((piece, pieceIndex) => {
    const normal = normaliseCells(piece);
    normal.forEach(([x, y]) => prims.push({
      k: 'rect', cx: 16 + pieceIndex * 33 + x * 7, cy: 40 + y * 7,
      w: 6.5, h: 6.5, rot: 0, fill: pieceIndex === 0 ? 'solid' : pieceIndex === 1 ? 'striped' : 'none',
    }));
    prims.push({ k: 'text', cx: 18 + pieceIndex * 32, cy: 84, s: String(pieceIndex + 1), size: 8 });
  });
  return { prims };
}
function mutateSilhouette(cells: Cell[], offset: number): Cell[] {
  const normal = normaliseCells(cells); const removed = normal.filter((_, i) => i !== offset % normal.length); const used = new Set(removed.map(cellKey)); const directions: Cell[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  for (const anchor of removed.slice().reverse()) for (const direction of directions) { const candidate: Cell = [anchor[0] + direction[0], anchor[1] + direction[1]]; if (candidate[0] >= 0 && candidate[1] >= 0 && !used.has(cellKey(candidate))) return normaliseCells([...removed, candidate]); }
  return normal;
}
function assemblyQuestion(id: string, difficulty: SpatialDifficulty, next: () => number): SpatialExpandedQuestion {
  const cells = connectedSilhouette(difficulty === 'easy' ? 7 : difficulty === 'medium' ? 9 : 11, next);
  return baseQuestion(id, difficulty, 'assembly', [piecesFigure(cells)], silhouetteFigure(cells), [silhouetteFigure(mutateSilhouette(cells, 0)), silhouetteFigure(mutateSilhouette(cells, 2)), silhouetteFigure(mutateSilhouette(cells, 4)), silhouetteFigure(mutateSilhouette(cells, 6))], 'The three numbered pieces may be moved and rotated, but not reflected. Which silhouette can they form?', 'Piece assembly', 'Mentally rotate the pieces and join their full edges. The answer uses every square exactly once, without overlap or reflection.', next);
}

export const SPATIAL_SUBTYPES: SpatialSubtype[] = ['rotation', 'reflection', 'odd_one_out', 'sequence', 'matrix', 'folding', 'unfolding', 'block_rotation', 'top_view', 'assembly'];
export function buildSpatialQuestion(id: string, subtype: SpatialSubtype, difficulty: SpatialDifficulty): SpatialExpandedQuestion {
  const next = rng(spatialHash(id));
  switch (subtype) {
    case 'rotation': return rotationQuestion(id, difficulty, next);
    case 'reflection': return reflectionQuestion(id, difficulty, next);
    case 'odd_one_out': return oddQuestion(id, difficulty, next);
    case 'sequence': return sequenceQuestion(id, difficulty, next);
    case 'matrix': return matrixQuestion(id, difficulty, next);
    case 'folding': return foldingQuestion(id, difficulty, next);
    case 'unfolding': return unfoldingQuestion(id, difficulty, next);
    case 'block_rotation': return blockRotationQuestion(id, difficulty, next);
    case 'top_view': return topViewQuestion(id, difficulty, next);
    case 'assembly': return assemblyQuestion(id, difficulty, next);
    default: throw new Error(`Unknown spatial subtype: ${subtype}`);
  }
}
export function spatialVisualSignature(question: SpatialExpandedQuestion): string { return JSON.stringify([question.subtype, question.stimulus, question.options]); }
