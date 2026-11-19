// Online Assessment Simulation for the Aptitude Test app.
//
// One continuous, timed session that mixes several Aptitude Test categories
// from the existing question bank. Questions are grouped into contiguous
// category blocks (e.g. a run of Numerical, then a run of Verbal...), the way
// real online assessments are delivered; they are never shuffled across
// categories question by question. Only the bank is used: no generated
// questions, and In-Tray / E-Tray exercises never enter a pool.
//
// Difficulty: Easy / Medium / Hard use each question's own stored rating only.
// Unrated questions (stored as 'mixed' or with no rating, e.g. most
// AssessmentDay booklets) are never given an assumed level; they are eligible
// under Mixed only.
//
// A completed session is saved as ONE `aptitude_attempts` row with
// test_type 'oa_simulation' and a unique test_id. That id is not a catalogue
// test, so lib/aptitudeProgress.ts never marks the source tests completed;
// the session's answered questions count once towards questions practised and
// accuracy.

export type OaLevel = 'easy' | 'medium' | 'hard';
export type OaDifficulty = 'mixed' | OaLevel;

export const OA_TEST_TYPE = 'oa_simulation';
export const OA_ROUTE_HASH = '#aptitude-test/online-assessment';
export const OA_QUESTION_COUNTS = [20, 30, 50] as const;
export type OaQuestionCount = (typeof OA_QUESTION_COUNTS)[number];
export const OA_DEFAULT_COUNT: OaQuestionCount = 30;
export const OA_DEFAULT_DIFFICULTY: OaDifficulty = 'mixed';
export const OA_SECONDS_PER_QUESTION = 90;
export const OA_MIN_CATEGORIES = 3;
export const OA_MIN_BLOCK = 3;
export const OA_TARGET_BLOCK = 7;
export const OA_MAX_BLOCK = 10;
/** Always given a block when eligible: nearly every MT online assessment opens with these two. */
export const OA_CORE_CATEGORIES: readonly string[] = ['numerical', 'verbal'];

export const OA_DIFFICULTIES: ReadonlyArray<{ id: OaDifficulty; label: string }> = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
  { id: 'mixed', label: 'Mixed' },
];

export function oaDifficultyLabel(difficulty: OaDifficulty): string {
  return OA_DIFFICULTIES.find((item) => item.id === difficulty)?.label || 'Mixed';
}

export function oaTimeLimitSeconds(questionCount: number): number {
  return Math.round(questionCount * OA_SECONDS_PER_QUESTION);
}

/** Casing and whitespace are normalised for matching only; anything else (including 'mixed') is unrated. */
export function normalizeOaLevel(value: unknown): OaLevel | null {
  if (typeof value !== 'string') return null;
  const key = value.trim().toLowerCase();
  return key === 'easy' || key === 'medium' || key === 'hard' ? key : null;
}

export interface OaPoolItem<Q> {
  category: string;
  testId: string;
  question: Q;
  level: OaLevel | null;
}

export type OaPools<Q> = Record<string, OaPoolItem<Q>[]>;

interface PoolQuestion {
  id: string;
  difficulty?: unknown;
}

export function buildOaPools<Q extends PoolQuestion>(
  sources: ReadonlyArray<readonly [string, ReadonlyArray<{ id: string; questions: readonly Q[] }>]>,
): OaPools<Q> {
  const pools: OaPools<Q> = {};
  sources.forEach(([category, tests]) => {
    const items: OaPoolItem<Q>[] = pools[category] || [];
    tests.forEach((test) => {
      test.questions.forEach((question) => {
        items.push({ category, testId: test.id, question, level: normalizeOaLevel(question.difficulty) });
      });
    });
    pools[category] = items;
  });
  return pools;
}

export function oaEligibleItems<Q>(pools: OaPools<Q>, difficulty: OaDifficulty): OaPools<Q> {
  const eligible: OaPools<Q> = {};
  Object.entries(pools).forEach(([category, items]) => {
    eligible[category] = difficulty === 'mixed' ? items : items.filter((item) => item.level === difficulty);
  });
  return eligible;
}

export interface OaLevelCounts {
  easy: number;
  medium: number;
  hard: number;
  unrated: number;
  total: number;
}

export function oaLevelCounts<Q>(pools: OaPools<Q>): Record<string, OaLevelCounts> {
  const counts: Record<string, OaLevelCounts> = {};
  Object.entries(pools).forEach(([category, items]) => {
    const row: OaLevelCounts = { easy: 0, medium: 0, hard: 0, unrated: 0, total: items.length };
    items.forEach((item) => {
      if (item.level) row[item.level] += 1;
      else row.unrated += 1;
    });
    counts[category] = row;
  });
  return counts;
}

export interface OaBlockPlan {
  category: string;
  size: number;
}

export interface OaBlock extends OaBlockPlan {
  /** Index of the block's first question in the session. */
  start: number;
}

export type OaShortfall = 'categories' | 'questions';

export type OaPlanResult =
  | { ok: true; blocks: OaBlockPlan[] }
  | { ok: false; reason: OaShortfall; eligibleCategories: number; available: number };

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Split `total` questions into contiguous category blocks.
 *
 * - Only categories with at least OA_MIN_BLOCK available questions are used,
 *   and at least OA_MIN_CATEGORIES of them are required.
 * - Block count aims at blocks of about OA_TARGET_BLOCK questions (5-10),
 *   with the total spread as evenly as the bank allows.
 * - A category that cannot fill its share gives the shortfall to the other
 *   blocks, first up to OA_MAX_BLOCK, then by adding another category, and
 *   only then beyond OA_MAX_BLOCK.
 * - Block order is random.
 */
export function planOaBlocks(available: Record<string, number>, total: number, random: () => number = Math.random): OaPlanResult {
  const eligible = Object.keys(available).filter((category) => available[category] >= OA_MIN_BLOCK);
  const capacity = eligible.reduce((sum, category) => sum + available[category], 0);
  if (eligible.length < OA_MIN_CATEGORIES) {
    return { ok: false, reason: 'categories', eligibleCategories: eligible.length, available: capacity };
  }
  if (capacity < total || total < OA_MIN_BLOCK * OA_MIN_CATEGORIES) {
    return { ok: false, reason: 'questions', eligibleCategories: eligible.length, available: capacity };
  }

  const core = OA_CORE_CATEGORIES.filter((category) => eligible.includes(category));
  const order = [...core, ...shuffled(eligible.filter((category) => !core.includes(category)), random)];
  let count = Math.min(eligible.length, Math.max(OA_MIN_CATEGORIES, Math.round(total / OA_TARGET_BLOCK)));
  count = Math.max(count, Math.min(eligible.length, Math.ceil(total / OA_MAX_BLOCK)));
  count = Math.min(count, Math.floor(total / OA_MIN_BLOCK));

  const fill = (chosen: string[], ceiling: (category: string) => number): number[] => {
    const base = Math.floor(total / chosen.length);
    const extra = new Set(shuffled(chosen.map((_, i) => i), random).slice(0, total % chosen.length));
    const sizes = chosen.map((category, i) => Math.min(ceiling(category), base + (extra.has(i) ? 1 : 0)));
    let deficit = total - sizes.reduce((sum, size) => sum + size, 0);
    while (deficit > 0) {
      let best = -1;
      chosen.forEach((category, i) => {
        if (sizes[i] < ceiling(category) && (best < 0 || sizes[i] < sizes[best])) best = i;
      });
      if (best < 0) break;
      sizes[best] += 1;
      deficit -= 1;
    }
    return sizes;
  };

  for (;;) {
    const chosen = order.slice(0, count);
    const capped = fill(chosen, (category) => Math.min(available[category], OA_MAX_BLOCK));
    if (capped.reduce((sum, size) => sum + size, 0) === total) {
      return { ok: true, blocks: shuffled(chosen.map((category, i) => ({ category, size: capped[i] })), random) };
    }
    if (count < eligible.length) {
      count += 1;
      continue;
    }
    const uncapped = fill(chosen, (category) => available[category]);
    if (uncapped.reduce((sum, size) => sum + size, 0) === total) {
      return { ok: true, blocks: shuffled(chosen.map((category, i) => ({ category, size: uncapped[i] })), random) };
    }
    return { ok: false, reason: 'questions', eligibleCategories: eligible.length, available: capacity };
  }
}

const SIGNATURE_SKIP = new Set(['id', 'hint', 'explanation', 'patternName', 'difficulty']);

/** Same content under a different id (the bank has a few) counts as a repeat. */
export function oaContentSignature(question: unknown): string {
  return JSON.stringify(question, (key, value) => (SIGNATURE_SKIP.has(key) ? undefined : value));
}

export interface OaSession<Q> {
  id: string;
  difficulty: OaDifficulty;
  questionCount: number;
  timeLimitSeconds: number;
  blocks: OaBlock[];
  items: OaPoolItem<Q>[];
}

export type OaSessionResult<Q> =
  | { ok: true; session: OaSession<Q> }
  | { ok: false; reason: OaShortfall; eligibleCategories: number; available: number };

export function oaSessionId(difficulty: OaDifficulty, questionCount: number, now: number = Date.now()): string {
  return `oa-sim-${difficulty}-${questionCount}-${now.toString(36)}`;
}

export function parseOaSessionId(testId: string): { difficulty: OaDifficulty; questionCount: number } | null {
  const match = /^oa-sim-(mixed|easy|medium|hard)-(\d+)-/.exec(testId || '');
  return match ? { difficulty: match[1] as OaDifficulty, questionCount: Number(match[2]) } : null;
}

export function oaSessionName(difficulty: OaDifficulty, questionCount: number): string {
  return `Online Assessment Simulation · ${questionCount} questions · ${oaDifficultyLabel(difficulty)}`;
}

export function buildOaSession<Q extends { id: string }>(
  pools: OaPools<Q>,
  difficulty: OaDifficulty,
  questionCount: number,
  random: () => number = Math.random,
  now: number = Date.now(),
): OaSessionResult<Q> {
  const eligible = oaEligibleItems(pools, difficulty);
  const available: Record<string, number> = {};
  Object.entries(eligible).forEach(([category, items]) => {
    available[category] = items.length;
  });

  // Picking skips content repeats, so a category can turn out smaller than its
  // raw count; re-plan with the real figure until every block fills.
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const plan = planOaBlocks(available, questionCount, random);
    if (!plan.ok) return plan;
    const seenIds = new Set<string>();
    const seenContent = new Set<string>();
    const blocks: OaBlock[] = [];
    const items: OaPoolItem<Q>[] = [];
    let short: string | null = null;
    let shortCount = 0;
    for (const block of plan.blocks) {
      const picked: OaPoolItem<Q>[] = [];
      for (const item of shuffled(eligible[block.category], random)) {
        if (picked.length >= block.size) break;
        if (seenIds.has(item.question.id)) continue;
        const signature = oaContentSignature(item.question);
        if (seenContent.has(signature)) continue;
        seenIds.add(item.question.id);
        seenContent.add(signature);
        picked.push(item);
      }
      if (picked.length < block.size) {
        short = block.category;
        shortCount = picked.length;
        break;
      }
      blocks.push({ ...block, start: items.length });
      items.push(...picked);
    }
    if (!short) {
      return {
        ok: true,
        session: {
          id: oaSessionId(difficulty, questionCount, now),
          difficulty,
          questionCount,
          timeLimitSeconds: oaTimeLimitSeconds(questionCount),
          blocks,
          items,
        },
      };
    }
    available[short] = shortCount;
  }
  return { ok: false, reason: 'questions', eligibleCategories: 0, available: 0 };
}

export interface OaAvailability {
  ok: boolean;
  reason: OaShortfall | null;
  /** Categories with enough questions at this difficulty to hold a block. */
  categories: string[];
  /** Categories skipped because they have fewer than OA_MIN_BLOCK questions at this difficulty. */
  skipped: string[];
  questions: number;
  /** The largest session size this difficulty can fill, or null when none. */
  largestCount: OaQuestionCount | null;
}

export function oaAvailability<Q>(pools: OaPools<Q>, difficulty: OaDifficulty, questionCount: number): OaAvailability {
  const eligible = oaEligibleItems(pools, difficulty);
  const categories = Object.keys(eligible).filter((category) => eligible[category].length >= OA_MIN_BLOCK);
  const skipped = Object.keys(eligible).filter((category) => eligible[category].length < OA_MIN_BLOCK);
  const questions = categories.reduce((sum, category) => sum + eligible[category].length, 0);
  const fits = (count: number) => categories.length >= OA_MIN_CATEGORIES && questions >= count;
  const largestCount = [...OA_QUESTION_COUNTS].reverse().find(fits) ?? null;
  const ok = fits(questionCount);
  return {
    ok,
    reason: ok ? null : categories.length < OA_MIN_CATEGORIES ? 'categories' : 'questions',
    categories,
    skipped,
    questions,
    largestCount,
  };
}

export interface OaCategoryResult {
  category: string;
  start: number;
  size: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  credit: number;
  percent: number;
}

export interface OaSummary {
  total: number;
  answered: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  /** Points scored, one decimal (Situational Judgement earns partial credit). */
  score: number;
  scorePercent: number;
  /** Correct as a share of answered questions; null when nothing was answered. */
  accuracyPercent: number | null;
  byBlock: OaCategoryResult[];
}

export function summarizeOnlineAssessment<Q>(
  questions: readonly Q[],
  answers: ReadonlyArray<string | null | undefined>,
  blocks: readonly OaBlock[],
  creditOf: (question: Q, answer: string | null | undefined) => number,
  answeredOf: (question: Q, answer: string | null | undefined) => boolean,
): OaSummary {
  const outcome = questions.map((question, i) => {
    const answered = answeredOf(question, answers[i]);
    const credit = answered ? Math.max(0, Math.min(1, creditOf(question, answers[i]))) : 0;
    return { answered, credit, correct: answered && credit >= 0.999 };
  });
  const tally = (from: number, to: number) => {
    const slice = outcome.slice(from, to);
    const answered = slice.filter((item) => item.answered).length;
    const correct = slice.filter((item) => item.correct).length;
    const credit = slice.reduce((sum, item) => sum + item.credit, 0);
    return { answered, correct, incorrect: answered - correct, unanswered: slice.length - answered, credit, size: slice.length };
  };
  const all = tally(0, outcome.length);
  return {
    total: outcome.length,
    answered: all.answered,
    correct: all.correct,
    incorrect: all.incorrect,
    unanswered: all.unanswered,
    score: Math.round(all.credit * 10) / 10,
    scorePercent: Math.round((all.credit / Math.max(1, outcome.length)) * 100),
    accuracyPercent: all.answered > 0 ? Math.round((all.correct / all.answered) * 100) : null,
    byBlock: blocks.map((block) => {
      const part = tally(block.start, block.start + block.size);
      return {
        category: block.category,
        start: block.start,
        size: block.size,
        correct: part.correct,
        incorrect: part.incorrect,
        unanswered: part.unanswered,
        credit: Math.round(part.credit * 10) / 10,
        percent: Math.round((part.credit / Math.max(1, part.size)) * 100),
      };
    }),
  };
}
