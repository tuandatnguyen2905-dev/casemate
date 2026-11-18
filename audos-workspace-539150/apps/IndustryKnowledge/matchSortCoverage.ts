import { isRestrictedChapter } from './lessonFlowCore';
import type { ChapterLike, StorageLike } from './lessonFlowCore';
import type { CurriculumLesson, LessonFlowCurriculum } from './lessonFlow';
import type { LearningModeCatalog } from './learningModeAudit';
import { resolveLessonPractice } from '../InteractiveLearning/practiceReview/lessonAccess';
import type { LessonPracticeOptions, LessonPracticeResult } from '../InteractiveLearning/practiceReview/lessonAccess';
import type { PracticeLesson } from '../InteractiveLearning/practiceReview/practiceLessonStore';
import { heldSourceDecks } from '../InteractiveLearning/practiceReview/sourceDecks';
import { generatedLessonPractice } from '../InteractiveLearning/matchSort/generatedPractice';
import { LESSON_REVIEW_KIND, chapterDisplayTitle, isLessonSampler, qualityProblems } from '../InteractiveLearning/matchSort/generator';
import type { ActivityTier } from '../InteractiveLearning/matchSort/generator';
import { initialState, reduceActivity } from '../InteractiveLearning/matchSort/engine';
import { normaliseTitle, validateActivity } from '../InteractiveLearning/matchSort/validation';
import type { SourceDecks } from '../InteractiveLearning/matchSort/validation';
import type { ActivityType, MatchSortActivity } from '../InteractiveLearning/matchSort/types';

// Read-only Match & Sort coverage and quality for the whole catalogue (`loadLearningModeCatalog` in App.tsx). Every
// lesson is resolved once through the same resolver learners use (authored packs, then activities generated from the
// displayed chapter text), with every chapter not under review treated as open and no storage, so nothing is read from
// or written to a learner record. Counting rules:
// - A chapter is covered only by a VALID activity that practises it: `validateActivity`, the quality rules (no empty,
//   duplicate or overlapping items, no item in two groups, no repeated stage), answerable through the engine (the answer
//   key reaches "all correct"), and, for generated activities, every prompt, answer, item and step found in the text the
//   chapter displays. Activity records are never counted as chapters.
// - Answers that share most of their wording are flagged as possibly ambiguous for review; they still count.
// - Lesson-wide activities (an authored one-term-per-chapter sampler, the generated lesson review) are reported as
//   lesson-level coverage, never as chapter practice.
// - Each activity is counted once per curriculum (by ID, then by answer key), so an activity citing several chapters or
//   a repeated answer key is not counted twice.

export type MatchSortChapterStatus = 'covered' | 'lesson-level-only' | 'zero' | 'held';

export interface MatchSortChapterCoverage {
  moduleIndex: number;
  lessonTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  status: MatchSortChapterStatus;
  tier: ActivityTier;
  /** Valid activities that practise this chapter. */
  valid: number;
  authored: number;
  generated: number;
  types: ActivityType[];
  lessonLevel: number;
  /** Why the chapter needs richer source content (from the generator), when it has no chapter practice. */
  enrichment: string | null;
}

export interface MatchSortCounts {
  eligibleChapters: number;
  /** Before: chapters with a valid authored activity that practises them. */
  chaptersWithAuthored: number;
  chaptersWithValid: number;
  chaptersLessonLevelOnly: number;
  chaptersZero: number;
  authored: number;
  generated: number;
  lessonLevel: number;
  /** Valid activities, each counted once. */
  unique: number;
  matching: number;
  sorting: number;
  sequence: number;
  invalid: number;
  duplicates: number;
  ambiguous: number;
  invalidSequences: number;
  emptyItems: number;
  /** Authored activities withheld because a cited chapter is missing, moved or under review. */
  missingMappings: number;
  ungrounded: number;
  unanswerable: number;
  enrichmentNeeded: number;
}

export interface MatchSortCurriculumCoverage extends MatchSortCounts {
  id: string;
  name: string;
  groupId: string;
  groupName: string;
  chapters: number;
  heldChapters: number;
  lessons: number;
  issues: Array<{ activityId: string; problems: string[] }>;
  chapterRows: MatchSortChapterCoverage[];
  error?: string;
}

export interface MatchSortCoverage extends MatchSortCounts {
  curricula: number;
  chapters: number;
  heldChapters: number;
  tiers: Record<ActivityTier, { chapters: number; covered: number }>;
  perCurriculum: MatchSortCurriculumCoverage[];
}

const emptyCounts = (): MatchSortCounts => ({
  eligibleChapters: 0, chaptersWithAuthored: 0, chaptersWithValid: 0, chaptersLessonLevelOnly: 0, chaptersZero: 0, authored: 0, generated: 0, lessonLevel: 0,
  unique: 0, matching: 0, sorting: 0, sequence: 0, invalid: 0, duplicates: 0, ambiguous: 0, invalidSequences: 0, emptyItems: 0, missingMappings: 0, ungrounded: 0, unanswerable: 0, enrichmentNeeded: 0,
});
const COUNT_KEYS = Object.keys(emptyCounts()) as Array<keyof MatchSortCounts>;
const addCounts = (target: MatchSortCounts, source: MatchSortCounts) => COUNT_KEYS.forEach((key) => { target[key] += source[key]; });

const text = (value: unknown) => (typeof value === 'string' || typeof value === 'number' ? String(value) : '');
const norm = (value: string) => value.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim();

/** Everything the chapter's General Info displays as text, normalised for grounding checks. */
export function chapterText(chapter: ChapterLike): string {
  const value = chapter as ChapterLike & Record<string, unknown>;
  const list = (items: unknown) => (Array.isArray(items) ? items : []);
  const parts: string[] = [text(value.title), text(value.keyInsight), text(value.objective), text(value.visualIntro), text(value.chapterRecap), ...list(value.recap).map(text)];
  list(value.keyTerms).forEach((entry: any) => parts.push(text(entry?.term), text(entry?.definition)));
  list(value.narrative).forEach((entry: any) => parts.push(text(entry?.label), text(entry?.text)));
  list(value.concepts).forEach((entry: any) => parts.push(text(entry?.title), text(entry?.summary), text(entry?.whyItMatters), ...list(entry?.points).map(text)));
  list(value.statTiles).forEach((entry: any) => parts.push(text(entry?.label), text(entry?.description)));
  return norm(parts.join(' \u0001 '));
}

const groundedText = (activity: MatchSortActivity): string[] => {
  if (activity.type === 'concept-matching') return [...activity.items.prompts, ...activity.items.answers].map((item) => item.text);
  if (activity.type === 'category-sorting') return [...activity.items.map((item) => item.text), ...(activity.objectiveKey === LESSON_REVIEW_KIND ? [] : activity.categories.map((category) => category.label))];
  return activity.items.map((item) => item.text);
};

/** The answer key reaches "all correct" through the same engine the learner uses. */
export function isAnswerable(activity: MatchSortActivity): boolean {
  try {
    let state = initialState(activity);
    if (activity.type === 'concept-matching') activity.pairs.forEach((pair) => { state = reduceActivity(activity, state, { type: 'pair', promptId: pair.promptId, answerId: pair.answerId }); });
    else if (activity.type === 'category-sorting') activity.items.forEach((item) => { state = reduceActivity(activity, state, { type: 'place', itemId: item.id, categoryId: item.categoryId }); });
    else activity.correctSequence.forEach((id, index) => { state = reduceActivity(activity, state, { type: 'move-step', id, toIndex: index }); });
    state = reduceActivity(activity, state, { type: 'check' });
    return Boolean(state.result?.allCorrect);
  } catch {
    return false;
  }
}

const contentKey = (activity: MatchSortActivity) => {
  if (activity.type === 'concept-matching') return `m:${activity.pairs.map((pair) => `${normaliseTitle(activity.items.prompts.find((item) => item.id === pair.promptId)?.text)}=${normaliseTitle(activity.items.answers.find((item) => item.id === pair.answerId)?.text)}`).sort().join('|')}`;
  if (activity.type === 'category-sorting') return `c:${activity.items.map((item) => `${normaliseTitle(item.text)}>${normaliseTitle(activity.categories.find((category) => category.id === item.categoryId)?.label)}`).sort().join('|')}`;
  return `s:${activity.correctSequence.map((id) => normaliseTitle(activity.items.find((item) => item.id === id)?.text)).join('>')}`;
};

const isGenerated = (activity: MatchSortActivity) => activity.origin === 'generated';
/** Heuristic warnings: reported for review (and counted as ambiguous), but the activity still counts as valid. */
const REVIEW_ONLY = /^overlapping answers/;
const isLessonLevel = (activity: MatchSortActivity) => activity.objectiveKey === LESSON_REVIEW_KIND || isLessonSampler(activity);

export type MatchSortResolver = (lesson: PracticeLesson, decks: SourceDecks, storage: StorageLike | null, options?: LessonPracticeOptions) => LessonPracticeResult | null;

export interface MatchSortAuditOptions {
  resolve?: MatchSortResolver;
  decks?: SourceDecks;
}

/** Coverage of one curriculum, resolved once per lesson through the learner-facing resolver. */
export function auditCurriculumMatchSort(entry: LearningModeCatalog['subIndustries'][number], options: MatchSortAuditOptions = {}): MatchSortCurriculumCoverage {
  const resolve = options.resolve ?? resolveLessonPractice;
  const decks = options.decks ?? heldSourceDecks();
  const routable = entry.lessons.filter((lesson) => !lesson.blocked && lesson.deck?.cards.length);
  const curriculumLessons: CurriculumLesson[] = routable.map((lesson) => ({
    identity: lesson.identity, title: lesson.displayTitle, persistenceKey: lesson.deck!.persistenceKey, chapters: lesson.deck!.cards,
    open: () => undefined, moduleIndex: lesson.moduleIndex, lessonIndex: lesson.lessonIndex, moduleTitle: lesson.moduleTitle, moduleLabel: lesson.moduleLabel,
  }));
  const curriculum: LessonFlowCurriculum = { industryLabel: entry.name, lessons: () => curriculumLessons };
  const result: MatchSortCurriculumCoverage = {
    id: entry.id, name: entry.name, groupId: entry.groupId, groupName: entry.groupName, chapters: 0, heldChapters: 0, lessons: entry.lessons.length,
    issues: [], chapterRows: [], ...emptyCounts(), ...(entry.error ? { error: entry.error } : {}),
  };
  const verdicts = new Map<string, string[]>();
  const counted = new Set<string>();
  const countedContent = new Map<string, string>();
  const flagged = new Set<string>();
  const flag = (activity: MatchSortActivity, problems: string[]) => {
    if (flagged.has(activity.activityId)) return;
    flagged.add(activity.activityId);
    result.issues.push({ activityId: activity.activityId, problems });
    if (problems.some((problem) => /ambiguous|overlapping|two groups/.test(problem))) result.ambiguous += 1;
    if (problems.some((problem) => /sequence|stage|step/.test(problem))) result.invalidSequences += 1;
    if (problems.some((problem) => /empty/.test(problem))) result.emptyItems += 1;
    if (problems.some((problem) => /not found in the chapter/.test(problem))) result.ungrounded += 1;
    if (problems.some((problem) => /not answerable/.test(problem))) result.unanswerable += 1;
  };
  const problemsOf = (activity: MatchSortActivity, lesson: PracticeLesson): string[] => {
    const cached = verdicts.get(activity.activityId);
    if (cached) return cached;
    const problems = [...validateActivity(activity), ...qualityProblems(activity)];
    if (!isAnswerable(activity)) problems.push('not answerable: the answer key does not reach all correct');
    if (isGenerated(activity)) {
      const source = activity.sourceRefs.map((ref) => chapterText(lesson.cards[ref.chapterIndex] ?? {})).join(' ');
      groundedText(activity).forEach((item) => { if (!source.includes(norm(item).replace(/[.]+$/, ''))) problems.push(`not found in the chapter: ${item}`); });
    }
    verdicts.set(activity.activityId, problems);
    return problems;
  };
  routable.forEach((auditLesson) => {
    const cards = auditLesson.deck!.cards;
    const lesson: PracticeLesson = { identity: auditLesson.identity, cards, accessible: cards.map((card) => !isRestrictedChapter(card)), persistenceKey: auditLesson.deck!.persistenceKey, activeChapter: 0, curriculum };
    let practice: LessonPracticeResult | null = null;
    let before: LessonPracticeResult | null = null;
    try {
      practice = resolve(lesson, decks, null);
      before = resolve(lesson, decks, null, { generated: false });
    } catch (error) {
      result.error = `Match & Sort could not be resolved for ${auditLesson.displayTitle}: ${String(error)}`;
    }
    const lessonKey = normaliseTitle(practice?.lessonTitle ?? auditLesson.lessonTitle);
    const authoredHere = (practice?.pack.activities ?? []).filter((activity) => !isGenerated(activity) && activity.sourceRefs.some((ref) => normaliseTitle(ref.lessonTitle) === lessonKey));
    let report: ReturnType<typeof generatedLessonPractice> | null = null;
    try {
      report = generatedLessonPractice(auditLesson.identity, cards, authoredHere);
    } catch {
      report = null;
    }
    result.missingMappings += practice?.excluded.filter((item) => !item.activityId.startsWith('ms-gen-')).length ?? 0;
    cards.forEach((card, index) => {
      result.chapters += 1;
      const chapterReport = report?.chapters[index];
      const row: MatchSortChapterCoverage = {
        moduleIndex: auditLesson.moduleIndex, lessonTitle: auditLesson.displayTitle, chapterNumber: index + 1, chapterTitle: chapterDisplayTitle(cards, index),
        status: 'held', tier: chapterReport?.tier ?? 'introductory', valid: 0, authored: 0, generated: 0, types: [], lessonLevel: 0, enrichment: null,
      };
      if (isRestrictedChapter(card)) {
        result.heldChapters += 1;
        result.chapterRows.push(row);
        return;
      }
      result.eligibleChapters += 1;
      const cites = (activity: MatchSortActivity) => activity.sourceRefs.some((ref) => ref.chapterIndex === index && normaliseTitle(ref.lessonTitle) === lessonKey);
      const citing = (practice?.available ?? []).filter(cites);
      const validBefore = (before?.available ?? []).filter(cites).filter((activity) => !isLessonLevel(activity) && !problemsOf(activity, lesson).some((problem) => !REVIEW_ONLY.test(problem)));
      if (validBefore.length) result.chaptersWithAuthored += 1;
      citing.forEach((activity) => {
        const all = problemsOf(activity, lesson);
        const problems = all.filter((problem) => !REVIEW_ONLY.test(problem));
        if (all.length > problems.length) flag(activity, all);
        if (problems.length) {
          if (!counted.has(activity.activityId)) {
            counted.add(activity.activityId);
            result.invalid += 1;
          }
          flag(activity, problems);
          return;
        }
        if (isLessonLevel(activity)) row.lessonLevel += 1;
        else {
          row.valid += 1;
          if (isGenerated(activity)) row.generated += 1;
          else row.authored += 1;
          if (!row.types.includes(activity.type)) row.types.push(activity.type);
        }
        if (counted.has(activity.activityId)) return;
        counted.add(activity.activityId);
        const key = contentKey(activity);
        const first = countedContent.get(key);
        if (first) {
          result.duplicates += 1;
          flag(activity, [`duplicate answer key of ${first}`]);
          return;
        }
        countedContent.set(key, activity.activityId);
        result.unique += 1;
        if (isLessonLevel(activity)) result.lessonLevel += 1;
        else if (isGenerated(activity)) result.generated += 1;
        else result.authored += 1;
        if (activity.type === 'concept-matching') result.matching += 1;
        else if (activity.type === 'category-sorting') result.sorting += 1;
        else result.sequence += 1;
      });
      row.status = row.valid ? 'covered' : row.lessonLevel ? 'lesson-level-only' : 'zero';
      if (row.status === 'covered') result.chaptersWithValid += 1;
      else {
        if (row.status === 'lesson-level-only') result.chaptersLessonLevelOnly += 1;
        else result.chaptersZero += 1;
        row.enrichment = chapterReport?.enrichment ?? 'no displayed text to practise';
        result.enrichmentNeeded += 1;
      }
      result.chapterRows.push(row);
    });
  });
  return result;
}

export function auditMatchSortCoverage(catalog: LearningModeCatalog, options: MatchSortAuditOptions = {}): MatchSortCoverage {
  const perCurriculum = catalog.subIndustries.map((entry) => auditCurriculumMatchSort(entry, options));
  const coverage: MatchSortCoverage = {
    curricula: perCurriculum.length,
    chapters: perCurriculum.reduce((sum, item) => sum + item.chapters, 0),
    heldChapters: perCurriculum.reduce((sum, item) => sum + item.heldChapters, 0),
    tiers: { introductory: { chapters: 0, covered: 0 }, standard: { chapters: 0, covered: 0 }, complex: { chapters: 0, covered: 0 } },
    perCurriculum,
    ...emptyCounts(),
  };
  perCurriculum.forEach((item) => {
    addCounts(coverage, item);
    item.chapterRows.forEach((row) => {
      if (row.status === 'held') return;
      coverage.tiers[row.tier].chapters += 1;
      if (row.status === 'covered') coverage.tiers[row.tier].covered += 1;
    });
  });
  return coverage;
}

const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : '0%');

/** Plain-text report: how counts are computed, totals, then one row per curriculum. */
export function matchSortCoverageReport(coverage: MatchSortCoverage, exceptionsPerCurriculum = 0): string[] {
  return [
    `Match & Sort coverage: ${coverage.curricula} curricula · ${coverage.chapters} chapters · ${coverage.eligibleChapters} eligible (${coverage.heldChapters} held for review, not counted)`,
    `  chapters with a valid activity: ${coverage.chaptersWithValid} (${pct(coverage.chaptersWithValid, coverage.eligibleChapters)}) · before generation (authored only): ${coverage.chaptersWithAuthored} · lesson-level only: ${coverage.chaptersLessonLevelOnly} · zero: ${coverage.chaptersZero} · flagged for enrichment: ${coverage.enrichmentNeeded}`,
    `  unique valid activities: ${coverage.unique} (authored ${coverage.authored}, generated ${coverage.generated}, lesson-level ${coverage.lessonLevel}) · matching ${coverage.matching} · sorting ${coverage.sorting} · sequence ${coverage.sequence}`,
    `  invalid: ${coverage.invalid} · duplicates: ${coverage.duplicates} · ambiguous: ${coverage.ambiguous} · invalid sequences: ${coverage.invalidSequences} · empty items: ${coverage.emptyItems} · missing chapter mappings: ${coverage.missingMappings} · ungrounded: ${coverage.ungrounded} · unanswerable: ${coverage.unanswerable}`,
    ...(['introductory', 'standard', 'complex'] as ActivityTier[]).map((tier) => `  ${tier}: ${coverage.tiers[tier].chapters} chapters · ${coverage.tiers[tier].covered} covered`),
    '  Industry | Sub-industry | Chapters | Eligible | Matching | Sorting | Sequence | Valid coverage | Missing',
    ...coverage.perCurriculum.flatMap((item) => [
      `  ${item.groupName} | ${item.name} | ${item.chapters} | ${item.eligibleChapters} | ${item.matching} | ${item.sorting} | ${item.sequence} | ${item.chaptersWithValid}/${item.eligibleChapters} (${pct(item.chaptersWithValid, item.eligibleChapters)}) | ${item.eligibleChapters - item.chaptersWithValid}${item.error ? ` · ${item.error}` : ''}`,
      ...item.chapterRows.filter((row) => row.status === 'zero' || row.status === 'lesson-level-only').slice(0, exceptionsPerCurriculum)
        .map((row) => `      ${row.lessonTitle} › Chapter ${row.chapterNumber} ${row.chapterTitle}: ${row.status}${row.enrichment ? ` — ${row.enrichment}` : ''}`),
    ]),
  ];
}
