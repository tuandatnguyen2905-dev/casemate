// Casemate — Error Checking engine.
//
// Same design philosophy as lib/diagrammatic.ts, lib/inductive.ts and
// lib/deductive.ts: a question is never a scanned booklet page with a
// hand-keyed answer. Every Error Checking question is BUILT here — the engine
// generates an original data table, plants the transcription errors itself,
// and derives the answer key and the explanation from the exact same edits.
// The tables and the answer key can never disagree.
//
// The question formats mirror the four AssessmentDay Error Checking booklets
// the founder supplied:
//   - an original table and a hand-copied version: "how many errors are there
//     in the third row of the copied table?" (the dominant format),
//   - exactly one cell wrong: which COLUMN / which ROW contains the error,
//   - a whole-table error count, and
//   - a lookup against the original only: "which of these five versions of
//     X's security code is the correct one?" — one exact match, four
//     near-miss corruptions.
// Error types are the real ones: adjacent characters transposed, a digit
// changed, a letter changed, a letter's CASE flipped (the booklets warn that
// data "may be case sensitive"), and — at hard level — look-alike character
// swaps (0↔O, 1↔I, 5↔S, 8↔B, 2↔Z, 6↔G).
//
// LANGUAGE: English end to end — the real aptitude round is sat in English.

/* ========================================================================== *
 * Types the UI consumes
 * ========================================================================== */

export type ErrorCheckingDifficulty = 'easy' | 'medium' | 'hard';

export interface ErrorCheckingExpandedQuestion {
  kind: 'error_checking';
  id: string;
  difficulty: ErrorCheckingDifficulty;
  /** The task, e.g. "How many errors are there in the third row…". */
  prompt: string;
  /** Column headers, shared by the original and the copy. */
  columns: string[];
  sourceTitle: string;
  sourceRows: string[][];
  /** The hand-copied table. Null for lookup ("correct version") questions. */
  checkTitle: string | null;
  checkRows: string[][] | null;
  /** [rowIndex, colIndex] cells of checkRows that differ — drives the review highlighting. */
  errorCells: [number, number][];
  options: string[];
  optionLabels: string[];
  correctAnswer: string;
  explanation: string;
  patternName: string;
}

export interface ErrorCheckingTest {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  difficulty: string;
  timeLimitSeconds: number;
  questions: ErrorCheckingExpandedQuestion[];
}

/* ========================================================================== *
 * Seeded RNG (mulberry32) + FNV hash — local copies, same as the other engines
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

export function hashErrorChecking(value: string): number {
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

function pickN<T>(items: readonly T[], n: number, next: () => number): T[] {
  return shuffle(items, next).slice(0, n);
}

/* ========================================================================== *
 * Value builders — realistic business data, MT-programme flavoured
 * ========================================================================== */

const FIRST_NAMES = [
  'An', 'Binh', 'Chi', 'Duc', 'Giang', 'Hoa', 'Khanh', 'Linh', 'Minh', 'Nam',
  'Phuong', 'Quan', 'Thao', 'Trang', 'Tuan', 'Vy', 'Daniel', 'Emma', 'James',
  'Laura', 'Marco', 'Nina', 'Oliver', 'Sofia',
];

const LAST_NAMES = [
  'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vu', 'Dang', 'Bui', 'Do', 'Ho',
  'Smith', 'Patel', 'Garcia', 'Muller', 'Rossi', 'Kim', 'Tanaka', 'Novak',
];

const DEPARTMENTS = [
  'Finance', 'Sales', 'HR', 'Audit', 'Product', 'Legal', 'Support', 'Data',
  'Design', 'Marketing', 'Operations', 'Procurement',
];

const CITIES = [
  'Hanoi', 'Da Nang', 'Ho Chi Minh City', 'Hai Phong', 'Can Tho', 'Hue',
  'Singapore', 'Bangkok', 'Manila', 'Jakarta', 'Kuala Lumpur', 'Taipei',
];

const SERVICES = ['Express', 'Standard', 'Economy', 'Priority', 'Overnight'];

const EMAIL_DOMAINS = ['gmail.com', 'outlook.com', 'fpt.vn', 'vnmail.vn', 'casework.io'];

const DIGITS = '0123456789';
// Plain letter pool avoids the look-alikes so easy/medium codes stay fair…
const LETTERS_PLAIN = 'ACDEFHJKLMNPRTUVWXY';
// …while hard codes deliberately include them, exactly like the booklets.
const LETTERS_HARD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function digits(n: number, next: () => number): string {
  let out = '';
  for (let i = 0; i < n; i += 1) out += DIGITS[Math.floor(next() * 10)];
  return out;
}

function letters(n: number, next: () => number, hard: boolean): string {
  const pool = hard ? LETTERS_HARD : LETTERS_PLAIN;
  let out = '';
  for (let i = 0; i < n; i += 1) out += pool[Math.floor(next() * pool.length)];
  return out;
}

/** Security-code style value: digits with a couple of letters mixed in. */
function securityCode(len: number, next: () => number, hard: boolean): string {
  const letterCount = len >= 10 ? 3 : 2;
  const body = digits(len - letterCount, next).split('');
  const tail = letters(letterCount, next, hard).split('');
  // Letters land in the back half so codes read like the booklet's 7170502CL.
  const half = Math.floor(body.length / 2);
  tail.forEach((ch) => {
    const pos = half + Math.floor(next() * (body.length - half + 1));
    body.splice(pos, 0, ch);
  });
  return body.join('');
}

function fullName(next: () => number, used: Set<string>): string {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const name = `${pick(FIRST_NAMES, next)} ${pick(LAST_NAMES, next)}`;
    if (!used.has(name)) {
      used.add(name);
      return name;
    }
  }
  const fallback = `${pick(FIRST_NAMES, next)} ${pick(LAST_NAMES, next)} ${digits(1, next)}`;
  used.add(fallback);
  return fallback;
}

function uniqueValue(build: () => string, used: Set<string>): string {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const value = build();
    if (!used.has(value)) {
      used.add(value);
      return value;
    }
  }
  const last = build();
  used.add(last);
  return last;
}

function amount(next: () => number): string {
  const thousands = Math.floor(next() * 9) + 1;
  const rest = digits(3, next);
  const cents = digits(2, next);
  return `£${thousands},${rest}.${cents}`;
}

function phone(next: () => number): string {
  return `09${digits(2, next)} ${digits(3, next)} ${digits(3, next)}`;
}

function emailFor(name: string, next: () => number): string {
  const [first, last] = name.toLowerCase().split(' ');
  return `${first}.${last}@${pick(EMAIL_DOMAINS, next)}`;
}

/* ========================================================================== *
 * Table domains — five realistic record types
 * ========================================================================== */

interface Domain {
  id: string;
  columns: string[];
  /** How a row is referred to in prose, e.g. "employee An Nguyen". */
  identityLabel: string;
  /** Column indices that make sensible "correct version" lookup targets. */
  codeColumns: number[];
  buildRow: (next: () => number, used: Set<string>, difficulty: ErrorCheckingDifficulty) => string[];
}

function codeLen(difficulty: ErrorCheckingDifficulty): number {
  return difficulty === 'easy' ? 7 : difficulty === 'medium' ? 9 : 11;
}

const DOMAINS: Domain[] = [
  {
    id: 'employees',
    columns: ['Employee', 'Department', 'Security code', 'Extension', 'Locker'],
    identityLabel: 'employee',
    codeColumns: [2, 4],
    buildRow: (next, used, difficulty) => {
      const name = fullName(next, used);
      return [
        name,
        pick(DEPARTMENTS, next),
        securityCode(codeLen(difficulty), next, difficulty === 'hard'),
        digits(4, next),
        `L-${digits(2, next)}${letters(1, next, difficulty === 'hard')}`,
      ];
    },
  },
  {
    id: 'orders',
    columns: ['Order ref', 'SKU', 'Quantity', 'Unit price', 'Dispatch code'],
    identityLabel: 'order',
    codeColumns: [1, 4],
    buildRow: (next, used, difficulty) => {
      const hard = difficulty === 'hard';
      return [
        uniqueValue(() => `ORD-${digits(5, next)}`, used),
        `${letters(2, next, hard)}-${digits(4, next)}-${letters(2, next, hard)}`,
        String(Math.floor(next() * 96) + 4),
        `£${digits(2, next)}.${digits(2, next)}`,
        `DP${letters(1, next, hard)}${digits(6, next)}`,
      ];
    },
  },
  {
    id: 'payments',
    columns: ['Payee', 'Sort code', 'Account number', 'Amount', 'Reference'],
    identityLabel: 'payee',
    codeColumns: [2, 4],
    buildRow: (next, used, difficulty) => {
      const name = fullName(next, used);
      return [
        name,
        `${digits(2, next)}-${digits(2, next)}-${digits(2, next)}`,
        digits(8, next),
        amount(next),
        `INV-${digits(6, next)}${difficulty === 'hard' ? letters(1, next, true) : ''}`,
      ];
    },
  },
  {
    id: 'shipments',
    columns: ['Tracking number', 'Destination', 'Weight (kg)', 'Service', 'Consignment'],
    identityLabel: 'tracking number',
    codeColumns: [4],
    buildRow: (next, used, difficulty) => {
      const hard = difficulty === 'hard';
      return [
        uniqueValue(() => `VN${digits(hard ? 9 : 7, next)}`, used),
        pick(CITIES, next),
        `${Math.floor(next() * 90) + 1}.${digits(1, next)}`,
        pick(SERVICES, next),
        `CN-${digits(5, next)}${letters(1, next, hard)}`,
      ];
    },
  },
  {
    id: 'candidates',
    columns: ['Candidate', 'Candidate ID', 'Phone', 'Email', 'Test centre'],
    identityLabel: 'candidate',
    codeColumns: [1, 2, 3],
    buildRow: (next, used) => {
      const name = fullName(next, used);
      return [
        name,
        `MT-${digits(4, next)}`,
        phone(next),
        emailFor(name, next),
        `${pick(CITIES, next)} Hall ${Math.floor(next() * 9) + 1}`,
      ];
    },
  },
];

function buildTable(
  domain: Domain,
  rows: number,
  next: () => number,
  difficulty: ErrorCheckingDifficulty,
): string[][] {
  const used = new Set<string>();
  const out: string[][] = [];
  for (let r = 0; r < rows; r += 1) out.push(domain.buildRow(next, used, difficulty));
  return out;
}

/* ========================================================================== *
 * Mutations — the transcription errors, each one described in plain English
 * ========================================================================== */

interface Mutation {
  value: string;
  note: string;
}

const LOOKALIKES: Record<string, string> = {
  '0': 'O', O: '0',
  '1': 'I', I: '1',
  '5': 'S', S: '5',
  '8': 'B', B: '8',
  '2': 'Z', Z: '2',
  '6': 'G', G: '6',
};

function isDigit(ch: string): boolean {
  return ch >= '0' && ch <= '9';
}

function isLetter(ch: string): boolean {
  return /[a-zA-Z]/.test(ch);
}

function positionsWhere(value: string, test: (ch: string) => boolean): number[] {
  const out: number[] = [];
  for (let i = 0; i < value.length; i += 1) {
    if (test(value[i])) out.push(i);
  }
  return out;
}

type Strategy = 'digit' | 'transpose' | 'case' | 'letter' | 'lookalike';

function strategiesFor(difficulty: ErrorCheckingDifficulty): Strategy[] {
  if (difficulty === 'easy') return ['digit', 'transpose', 'letter'];
  if (difficulty === 'medium') return ['digit', 'transpose', 'letter', 'case'];
  return ['digit', 'transpose', 'letter', 'case', 'lookalike'];
}

function applyStrategy(value: string, strategy: Strategy, next: () => number): Mutation | null {
  const chars = value.split('');

  if (strategy === 'digit') {
    const spots = positionsWhere(value, isDigit);
    if (!spots.length) return null;
    const i = pick(spots, next);
    let replacement = DIGITS[Math.floor(next() * 10)];
    if (replacement === chars[i]) replacement = DIGITS[(DIGITS.indexOf(chars[i]) + 1 + Math.floor(next() * 8)) % 10];
    chars[i] = replacement;
    return { value: chars.join(''), note: 'one digit was miscopied' };
  }

  if (strategy === 'transpose') {
    const spots: number[] = [];
    for (let i = 0; i < chars.length - 1; i += 1) {
      const a = chars[i];
      const b = chars[i + 1];
      if (a !== b && /[a-zA-Z0-9]/.test(a) && /[a-zA-Z0-9]/.test(b)) spots.push(i);
    }
    if (!spots.length) return null;
    const i = pick(spots, next);
    const tmp = chars[i];
    chars[i] = chars[i + 1];
    chars[i + 1] = tmp;
    return { value: chars.join(''), note: 'two adjacent characters were transposed' };
  }

  if (strategy === 'case') {
    const spots = positionsWhere(value, isLetter);
    if (!spots.length) return null;
    const i = pick(spots, next);
    const flipped = chars[i] === chars[i].toUpperCase() ? chars[i].toLowerCase() : chars[i].toUpperCase();
    if (flipped === chars[i]) return null;
    chars[i] = flipped;
    return { value: chars.join(''), note: "a letter's case was flipped" };
  }

  if (strategy === 'letter') {
    const spots = positionsWhere(value, isLetter);
    if (!spots.length) return null;
    const i = pick(spots, next);
    const isUpper = chars[i] === chars[i].toUpperCase();
    const pool = 'abcdefghijklmnopqrstuvwxyz'.replace(chars[i].toLowerCase(), '');
    const raw = pool[Math.floor(next() * pool.length)];
    chars[i] = isUpper ? raw.toUpperCase() : raw;
    return { value: chars.join(''), note: 'one letter was miscopied' };
  }

  // lookalike
  const spots = positionsWhere(value, (ch) => LOOKALIKES[ch] != null);
  if (!spots.length) return null;
  const i = pick(spots, next);
  chars[i] = LOOKALIKES[chars[i]];
  return { value: chars.join(''), note: 'a look-alike character was substituted (0/O, 1/I, 5/S, 8/B, 2/Z, 6/G)' };
}

/** One planted error: a single-character corruption that provably differs. */
function mutateCell(
  value: string,
  difficulty: ErrorCheckingDifficulty,
  next: () => number,
  avoid?: Set<string>,
): Mutation {
  const menu = strategiesFor(difficulty);
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const strategy = pick(menu, next);
    const mutation = applyStrategy(value, strategy, next);
    if (mutation && mutation.value !== value && !(avoid && avoid.has(mutation.value))) {
      return mutation;
    }
  }
  // Deterministic fallback: bump the first alphanumeric character.
  const chars = value.split('');
  for (let i = 0; i < chars.length; i += 1) {
    if (isDigit(chars[i])) {
      chars[i] = DIGITS[(DIGITS.indexOf(chars[i]) + 1) % 10];
      return { value: chars.join(''), note: 'one digit was miscopied' };
    }
    if (isLetter(chars[i])) {
      chars[i] = chars[i] === 'z' || chars[i] === 'Z' ? (chars[i] === 'z' ? 'a' : 'A') : String.fromCharCode(chars[i].charCodeAt(0) + 1);
      return { value: chars.join(''), note: 'one letter was miscopied' };
    }
  }
  return { value: `${value}X`, note: 'an extra character was appended' };
}

/* ========================================================================== *
 * Shared scaffolding
 * ========================================================================== */

const MC_LABELS = ['A', 'B', 'C', 'D', 'E'];
const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

function rowsFor(difficulty: ErrorCheckingDifficulty): number {
  return difficulty === 'easy' ? 4 : 5;
}

function copyTable(rows: string[][]): string[][] {
  return rows.map((row) => row.slice());
}

interface PlantedError {
  row: number;
  col: number;
  original: string;
  copied: string;
  note: string;
}

function plantError(
  source: string[][],
  check: string[][],
  row: number,
  col: number,
  difficulty: ErrorCheckingDifficulty,
  next: () => number,
): PlantedError {
  const mutation = mutateCell(source[row][col], difficulty, next);
  check[row][col] = mutation.value;
  return { row, col, original: source[row][col], copied: mutation.value, note: mutation.note };
}

function describeError(e: PlantedError, columns: string[]): string {
  return `${columns[e.col]} reads "${e.copied}" instead of "${e.original}" (${e.note})`;
}

function baseQuestion(
  id: string,
  difficulty: ErrorCheckingDifficulty,
  domain: Domain,
  sourceRows: string[][],
  checkRows: string[][] | null,
  errors: PlantedError[],
): Pick<
  ErrorCheckingExpandedQuestion,
  'kind' | 'id' | 'difficulty' | 'columns' | 'sourceTitle' | 'sourceRows' | 'checkTitle' | 'checkRows' | 'errorCells'
> {
  return {
    kind: 'error_checking',
    id,
    difficulty,
    columns: domain.columns,
    sourceTitle: 'Original data',
    sourceRows,
    checkTitle: checkRows ? 'Copied data' : null,
    checkRows,
    errorCells: errors.map((e) => [e.row, e.col] as [number, number]),
  };
}

/* ========================================================================== *
 * Family 1 — "How many errors in the Nth row?" (the booklets' Section C)
 * ========================================================================== */

function genRowErrors(qid: string, difficulty: ErrorCheckingDifficulty): ErrorCheckingExpandedQuestion {
  const next = rng(hashErrorChecking(qid));
  const domain = pick(DOMAINS, next);
  const rows = rowsFor(difficulty);
  const source = buildTable(domain, rows, next, difficulty);
  const check = copyTable(source);

  const targetRow = Math.floor(next() * rows);
  // 0–4 errors in the target row; 0 keeps option E honest.
  const weights: number[] = difficulty === 'easy' ? [1, 3, 3, 1.5, 0.8] : [1, 2.5, 3, 2, 1.2];
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  let roll = next() * totalWeight;
  let targetCount = 0;
  for (let k = 0; k < weights.length; k += 1) {
    roll -= weights[k];
    if (roll <= 0) {
      targetCount = k;
      break;
    }
  }

  const errors: PlantedError[] = [];
  const targetCols = pickN(
    Array.from({ length: domain.columns.length }, (_, i) => i),
    targetCount,
    next,
  );
  targetCols.forEach((col) => errors.push(plantError(source, check, targetRow, col, difficulty, next)));

  // Other rows carry their own errors so scanning the whole table can't
  // shortcut the question — exactly like the booklet's shared table.
  for (let r = 0; r < rows; r += 1) {
    if (r === targetRow) continue;
    const count = Math.floor(next() * 3); // 0–2
    const cols = pickN(Array.from({ length: domain.columns.length }, (_, i) => i), count, next);
    cols.forEach((col) => errors.push(plantError(source, check, r, col, difficulty, next)));
  }

  const targetErrors = errors.filter((e) => e.row === targetRow);
  const options = ['1', '2', '3', '4', 'None — the row is copied correctly'];
  const correctIndex = targetCount === 0 ? 4 : targetCount - 1;

  const identity = source[targetRow][0];
  let explanation: string;
  if (targetCount === 0) {
    explanation = `Compare the ${ORDINALS[targetRow]} row (${identity}) cell by cell: every field of the copied row matches the original exactly, so the row contains no errors.`;
  } else {
    explanation = `The ${ORDINALS[targetRow]} row (${identity}) of the copied table contains ${targetCount} error${
      targetCount === 1 ? '' : 's'
    }: ${targetErrors.map((e) => describeError(e, domain.columns)).join('; ')}. Every other cell of that row matches the original.`;
  }

  return {
    ...baseQuestion(qid, difficulty, domain, source, check, errors),
    prompt: `The original table has been copied by hand. Are there any errors in the ${ORDINALS[targetRow]} row of the copied table? If so, how many?`,
    options,
    optionLabels: MC_LABELS,
    correctAnswer: MC_LABELS[correctIndex],
    explanation,
    patternName: 'Row error count',
  };
}

/* ========================================================================== *
 * Family 2 — "Which is the correct version?" (the booklets' Section A/B)
 * ========================================================================== */

function genCorrectVersion(qid: string, difficulty: ErrorCheckingDifficulty): ErrorCheckingExpandedQuestion {
  const next = rng(hashErrorChecking(qid));
  const domain = pick(DOMAINS, next);
  const rows = rowsFor(difficulty) === 4 ? 4 : 5;
  const source = buildTable(domain, rows, next, difficulty);

  const targetRow = Math.floor(next() * rows);
  const targetCol = pick(domain.codeColumns, next);
  const truth = source[targetRow][targetCol];
  const identity = source[targetRow][0];

  // One exact match + four distinct one-character corruptions.
  const seen = new Set<string>([truth]);
  const wrong: Mutation[] = [];
  while (wrong.length < 4) {
    const mutation = mutateCell(truth, difficulty, next, seen);
    seen.add(mutation.value);
    wrong.push(mutation);
  }

  const order = shuffle([0, 1, 2, 3, 4], next);
  const options: string[] = new Array(5);
  const notes: (string | null)[] = new Array(5);
  options[order[0]] = truth;
  notes[order[0]] = null;
  wrong.forEach((m, i) => {
    options[order[i + 1]] = m.value;
    notes[order[i + 1]] = m.note;
  });
  const correctIndex = order[0];

  const wrongNotes = MC_LABELS.map((label, i) =>
    notes[i] ? `(${label}) ${notes[i]}` : null,
  ).filter(Boolean).join('; ');

  return {
    ...baseQuestion(qid, difficulty, domain, source, null, []),
    prompt: `Refer to the original table. Which is the correct version of the ${domain.columns[targetCol]} for ${domain.identityLabel} ${identity}?`,
    options,
    optionLabels: MC_LABELS,
    correctAnswer: MC_LABELS[correctIndex],
    explanation: `Only option ${MC_LABELS[correctIndex]} reproduces the table exactly: the ${domain.columns[targetCol]} for ${identity} is "${truth}". In the other options ${wrongNotes}.`,
    patternName: 'Correct version lookup',
  };
}

/* ========================================================================== *
 * Family 3 — exactly one wrong cell: which COLUMN contains it?
 * ========================================================================== */

function genWhichColumn(qid: string, difficulty: ErrorCheckingDifficulty): ErrorCheckingExpandedQuestion {
  const next = rng(hashErrorChecking(qid));
  const domain = pick(DOMAINS, next);
  const rows = rowsFor(difficulty);
  const source = buildTable(domain, rows, next, difficulty);
  const check = copyTable(source);

  const row = Math.floor(next() * rows);
  const col = Math.floor(next() * domain.columns.length);
  const planted = plantError(source, check, row, col, difficulty, next);

  return {
    ...baseQuestion(qid, difficulty, domain, source, check, [planted]),
    prompt:
      'Exactly one cell of the copied table differs from the original. Which column contains the transcription error?',
    options: domain.columns.slice(),
    optionLabels: MC_LABELS,
    correctAnswer: MC_LABELS[col],
    explanation: `The error is in the ${ORDINALS[row]} row (${source[row][0]}): ${describeError(planted, domain.columns)}. Every other cell matches the original, so the ${domain.columns[col]} column is the one with the error.`,
    patternName: 'Locate the column',
  };
}

/* ========================================================================== *
 * Family 4 — exactly one wrong cell: which ROW contains it?
 * ========================================================================== */

function genWhichRow(qid: string, difficulty: ErrorCheckingDifficulty): ErrorCheckingExpandedQuestion {
  const next = rng(hashErrorChecking(qid));
  const domain = pick(DOMAINS, next);
  const rows = 5; // five rows so the five options are Row 1 – Row 5
  const source = buildTable(domain, rows, next, difficulty);
  const check = copyTable(source);

  const row = Math.floor(next() * rows);
  const col = Math.floor(next() * domain.columns.length);
  const planted = plantError(source, check, row, col, difficulty, next);

  return {
    ...baseQuestion(qid, difficulty, domain, source, check, [planted]),
    prompt:
      'Exactly one cell of the copied table differs from the original. Which row contains the transcription error?',
    options: ['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5'],
    optionLabels: MC_LABELS,
    correctAnswer: MC_LABELS[row],
    explanation: `Row ${row + 1} (${source[row][0]}) is the one that differs: ${describeError(planted, domain.columns)}. The other four rows are copied correctly.`,
    patternName: 'Locate the row',
  };
}

/* ========================================================================== *
 * Family 5 — whole-table error count
 * ========================================================================== */

function genCountTotal(qid: string, difficulty: ErrorCheckingDifficulty): ErrorCheckingExpandedQuestion {
  const next = rng(hashErrorChecking(qid));
  const domain = pick(DOMAINS, next);
  const rows = difficulty === 'easy' ? 3 : 4; // smaller table — the whole thing must be scanned
  const source = buildTable(domain, rows, next, difficulty);
  const check = copyTable(source);

  const total = 1 + Math.floor(next() * 5); // 1–5, matching options A–E
  const cells: [number, number][] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < domain.columns.length; c += 1) cells.push([r, c]);
  }
  const chosen = pickN(cells, total, next);
  const errors = chosen.map(([r, c]) => plantError(source, check, r, c, difficulty, next));
  errors.sort((a, b) => a.row - b.row || a.col - b.col);

  return {
    ...baseQuestion(qid, difficulty, domain, source, check, errors),
    prompt: 'Compare the two tables. How many cells of the copied table differ from the original?',
    options: ['1', '2', '3', '4', '5'],
    optionLabels: MC_LABELS,
    correctAnswer: MC_LABELS[total - 1],
    explanation: `There ${total === 1 ? 'is exactly 1 error' : `are exactly ${total} errors`}: ${errors
      .map((e) => `row ${e.row + 1} (${source[e.row][0]}) — ${describeError(e, domain.columns)}`)
      .join('; ')}. Every other cell matches the original.`,
    patternName: 'Total error count',
  };
}

/* ========================================================================== *
 * Public builder — one question per (id, family, difficulty)
 * ========================================================================== */

export type ErrorCheckingFamily = 'row_errors' | 'correct_version' | 'which_column' | 'which_row' | 'count_total';

export const ERROR_CHECKING_FAMILIES: ErrorCheckingFamily[] = [
  'row_errors', 'correct_version', 'which_column', 'which_row', 'count_total',
];

export function buildErrorCheckingQuestion(
  qid: string,
  family: ErrorCheckingFamily,
  difficulty: ErrorCheckingDifficulty,
): ErrorCheckingExpandedQuestion {
  let q: ErrorCheckingExpandedQuestion;
  if (family === 'row_errors') q = genRowErrors(qid, difficulty);
  else if (family === 'correct_version') q = genCorrectVersion(qid, difficulty);
  else if (family === 'which_column') q = genWhichColumn(qid, difficulty);
  else if (family === 'which_row') q = genWhichRow(qid, difficulty);
  else q = genCountTotal(qid, difficulty);
  return { ...q, id: qid };
}
