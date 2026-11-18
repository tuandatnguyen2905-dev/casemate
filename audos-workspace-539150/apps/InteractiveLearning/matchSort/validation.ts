import type { ChapterRef, MatchSortActivity, MatchSortPack, SourceModuleKey } from './types';

export const lessonIdOf = (ref: Pick<ChapterRef, 'sourceModuleKey' | 'lessonTitle'>) => `${ref.sourceModuleKey}::${ref.lessonTitle}`;
export const chapterIdOf = (ref: Pick<ChapterRef, 'sourceModuleKey' | 'lessonTitle' | 'chapterTitle'>) => `${lessonIdOf(ref)}::${ref.chapterTitle}`;

/**
 * Labels the source curriculum presents as alternatives or categories (product types, customer
 * segments, participant roles). None of them may appear as a step in a Sequence Builder.
 */
export const NON_SEQUENTIAL_LABELS = [
  'retail', 'sme', 'corporate', 'corporate & institutional', 'retail banking', 'sme banking', 'corporate banking',
  'personal loan', 'instalment credit', 'revolving credit', 'credit card', 'retail instalment', 'vehicle finance',
  'commercial bank', 'investment bank', 'consumer finance', 'insurance', 'fintech', 'finance company', 'retail partner',
  'technology vendor', 'regulator', 'deposits', 'loans', 'payments', 'trade finance', 'treasury services',
];

/** Figures, currencies and dates are not used in practice content (the source holds them under review). */
const STATISTIC_PATTERN = /\d+(?:[.,]\d+)?\s?%|US\$|\bVND\b|\btrillion\b|\bbillion\b|\b(?:19|20)\d{2}\b/i;

const normalise = (value: unknown) => String(value ?? '')
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/^\s*\d+(\.\d+)*\.?\s+/, '')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

/** Title comparison used for chapter and lesson matching (numeric prefixes, spacing, apostrophes, case). */
export const normaliseTitle = (value: unknown) => normalise(value);

const blank = (value: unknown) => !String(value ?? '').trim();

const containsPhrase = (text: string, phrase: string | undefined) => {
  const target = normalise(phrase);
  if (!target) return false;
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(normalise(text));
};

function learnerText(activity: MatchSortActivity): string[] {
  const base = [activity.title, activity.learningObjective, activity.instructions, activity.summary];
  if (activity.type === 'concept-matching') {
    return [...base, activity.promptLabel, activity.answerLabel, ...activity.items.prompts.map((item) => item.text), ...activity.items.answers.map((item) => item.text), ...activity.pairs.flatMap((pair) => [pair.explanation, pair.hint])];
  }
  if (activity.type === 'category-sorting') {
    return [...base, ...activity.categories.flatMap((category) => [category.label, category.description]), ...activity.items.flatMap((item) => [item.text, item.explanation, item.hint, ...Object.values(item.misplaced ?? {}).map(String)])];
  }
  return [...base, activity.sequenceEvidence, ...activity.items.flatMap((step) => [step.text, step.explanation, step.hint])];
}

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  return Array.from(new Set(ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)))));
}

export function validateActivity(activity: MatchSortActivity): string[] {
  const problems: string[] = [];
  const need = (condition: boolean, problem: string) => { if (!condition) problems.push(problem); };
  need(!blank(activity.activityId), 'missing activityId');
  ['title', 'learningObjective', 'instructions', 'summary', 'industryId', 'moduleId', 'lessonId', 'chapterId'].forEach((field) => need(!blank((activity as unknown as Record<string, unknown>)[field]), `missing ${field}`));
  need(activity.sourceRefs.length > 0, 'no source references');
  activity.sourceRefs.forEach((ref, index) => {
    need(ref.sourceIds.length > 0, `sourceRefs[${index}] has no source IDs`);
    need(!blank(ref.grounding), `sourceRefs[${index}] has no grounding note`);
    need(Number.isInteger(ref.chapterIndex) && ref.chapterIndex >= 0, `sourceRefs[${index}] has an invalid chapterIndex`);
  });
  const primary = activity.sourceRefs[0];
  if (primary) {
    need(activity.chapterId === chapterIdOf(primary), 'chapterId does not match the first source reference');
    need(activity.lessonId === lessonIdOf(primary), 'lessonId does not match the first source reference');
  }
  learnerText(activity).forEach((text) => need(!STATISTIC_PATTERN.test(text), `unsupported figure in text: ${text}`));

  if (activity.type === 'concept-matching') {
    const promptIds = activity.items.prompts.map((item) => item.id);
    const answerIds = activity.items.answers.map((item) => item.id);
    duplicates([...promptIds, ...answerIds, ...activity.pairs.map((pair) => pair.id)]).forEach((id) => problems.push(`duplicate ID ${id}`));
    need(activity.pairs.length >= 3, 'needs at least 3 pairs');
    need(promptIds.length === activity.pairs.length && answerIds.length === activity.pairs.length, 'prompts, answers and pairs must have equal counts');
    promptIds.forEach((id) => need(activity.pairs.filter((pair) => pair.promptId === id).length === 1, `prompt ${id} must be in exactly one pair`));
    answerIds.forEach((id) => need(activity.pairs.filter((pair) => pair.answerId === id).length === 1, `answer ${id} must be in exactly one pair`));
    const answerText = new Map(activity.items.answers.map((item) => [item.id, item.text]));
    activity.pairs.forEach((pair) => {
      need(!blank(pair.explanation), `pair ${pair.id} has no explanation`);
      need(!blank(pair.hint), `pair ${pair.id} has no hint`);
      need(!normalise(pair.hint).includes(normalise(answerText.get(pair.answerId))), `pair ${pair.id} hint reveals the answer`);
    });
  } else if (activity.type === 'category-sorting') {
    const categoryIds = activity.categories.map((category) => category.id);
    duplicates([...categoryIds, ...activity.items.map((item) => item.id)]).forEach((id) => problems.push(`duplicate ID ${id}`));
    need(activity.categories.length >= 2, 'needs at least 2 categories');
    need(activity.items.length >= 4, 'needs at least 4 items');
    activity.categories.forEach((category) => {
      need(!blank(category.label) && !blank(category.description), `category ${category.id} needs a label and description`);
      need(activity.items.some((item) => item.categoryId === category.id), `category ${category.id} has no items`);
    });
    const labels = new Map(activity.categories.map((category) => [category.id, category.label]));
    activity.items.forEach((item) => {
      need(categoryIds.includes(item.categoryId), `item ${item.id} points at unknown category ${item.categoryId}`);
      need(!blank(item.explanation), `item ${item.id} has no explanation`);
      need(!blank(item.hint), `item ${item.id} has no hint`);
      need(!containsPhrase(item.hint, labels.get(item.categoryId)), `item ${item.id} hint names its category`);
      Object.keys(item.misplaced ?? {}).forEach((key) => need(categoryIds.includes(key) && key !== item.categoryId, `item ${item.id} has a misplaced note for ${key}`));
    });
  } else {
    const stepIds = activity.items.map((step) => step.id);
    duplicates(stepIds).forEach((id) => problems.push(`duplicate ID ${id}`));
    need(activity.isSequentialProcess === true, 'sequence activities must be marked isSequentialProcess');
    need(!blank(activity.sequenceEvidence), 'sequence activities need sequence evidence from the chapter');
    need(activity.items.length >= 3, 'needs at least 3 steps');
    need(activity.correctSequence.length === stepIds.length && new Set(activity.correctSequence).size === stepIds.length && activity.correctSequence.every((id) => stepIds.includes(id)), 'correctSequence must be a permutation of the step IDs');
    activity.items.forEach((step) => {
      need(!blank(step.explanation), `step ${step.id} has no explanation`);
      need(!blank(step.hint), `step ${step.id} has no hint`);
      need(!NON_SEQUENTIAL_LABELS.includes(normalise(step.text)), `step ${step.id} is a category or alternative, not a stage`);
    });
  }
  return problems;
}

export interface ContentIssue {
  activityId: string;
  problem: string;
}

export function validatePacks(packs: MatchSortPack[]): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const activities = packs.flatMap((pack) => pack.activities);
  duplicates(activities.map((activity) => activity.activityId)).forEach((id) => issues.push({ activityId: id, problem: 'duplicate activityId' }));
  duplicates(packs.map((pack) => pack.packId)).forEach((id) => issues.push({ activityId: id, problem: 'duplicate packId' }));
  packs.forEach((pack) => pack.activities.forEach((activity) => {
    if (activity.industryId !== pack.industryId || activity.moduleId !== pack.moduleId) issues.push({ activityId: activity.activityId, problem: 'industry or module differs from its pack' });
    if (activity.sourceRefs.some((ref) => ref.sourceModuleKey !== pack.sourceModuleKey)) issues.push({ activityId: activity.activityId, problem: 'source reference outside the pack module' });
    validateActivity(activity).forEach((problem) => issues.push({ activityId: activity.activityId, problem }));
  }));
  return issues;
}

// Source mapping ----------------------------------------------------------------------------

export interface DeckChapterLike {
  title?: string;
  reviewStatus?: string;
}

/** Lesson decks keyed exactly like COMMERCIAL_BANKING_MODULE01_DECKS / CONSUMER_FINANCE_MODULE01_DECKS. */
export type SourceDecks = Partial<Record<SourceModuleKey, Record<string, DeckChapterLike[] | undefined>>>;

/** Returns null when the reference resolves to an accessible chapter at its recorded position. */
export function chapterRefProblem(ref: ChapterRef, decks: SourceDecks): string | null {
  const module = decks[ref.sourceModuleKey];
  if (!module) return `module ${ref.sourceModuleKey} not provided`;
  const lessonKey = Object.keys(module).find((key) => normalise(key) === normalise(ref.lessonTitle));
  if (!lessonKey) return `lesson "${ref.lessonTitle}" not found`;
  const deck = module[lessonKey] ?? [];
  const chapter = deck[ref.chapterIndex];
  if (!chapter || normalise(chapter.title) !== normalise(ref.chapterTitle)) {
    const found = deck.findIndex((card) => normalise(card?.title) === normalise(ref.chapterTitle));
    return found >= 0
      ? `chapter "${ref.chapterTitle}" is at index ${found}, expected ${ref.chapterIndex}`
      : `chapter "${ref.chapterTitle}" not found in "${ref.lessonTitle}" (${deck.length} chapters)`;
  }
  if (chapter.reviewStatus === 'Under Review') return `chapter "${ref.chapterTitle}" is under review`;
  return null;
}

export interface Availability {
  available: MatchSortActivity[];
  unavailable: Array<{ activityId: string; reasons: string[] }>;
}

/**
 * Fails closed: an activity is offered only when every chapter it cites exists at its recorded
 * position and is not held. Pass decks after `applyReviewHolds` so held chapters are excluded.
 */
export function resolveAvailableActivities(activities: MatchSortActivity[], decks: SourceDecks): Availability {
  const available: MatchSortActivity[] = [];
  const unavailable: Availability['unavailable'] = [];
  activities.forEach((activity) => {
    const reasons = activity.sourceRefs.map((ref) => chapterRefProblem(ref, decks)).filter((reason): reason is string => Boolean(reason));
    if (reasons.length) unavailable.push({ activityId: activity.activityId, reasons });
    else available.push(activity);
  });
  return { available, unavailable };
}
