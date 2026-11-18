import { isRestrictedChapter } from './lessonFlowCore';
import type { StorageLike } from './lessonFlowCore';
import type { CurriculumLesson, LessonFlowCurriculum } from './lessonFlow';
import type { LearningModeCatalog } from './learningModeAudit';
import { answersOverlap, cardContentKey, cardProblem, chapterDepth, chapterTitle, contentTokens, deeperSections, genericDefinitions, repeatedSentences, sentences } from '../InteractiveLearning/practiceReview/chapterCards';
import type { ChapterTier } from '../InteractiveLearning/practiceReview/chapterCards';
import { resolveIndustryFlashcards } from '../InteractiveLearning/practiceReview/flashcardScopes';
import type { IndustryFlashcards, ScopedCard } from '../InteractiveLearning/practiceReview/flashcardScopes';
import type { CardStage, FlashcardContent } from '../InteractiveLearning/flashcards/models';
import { normaliseTitle } from '../InteractiveLearning/matchSort/validation';

// Read-only flashcard coverage for the whole catalogue (`loadLearningModeCatalog` in App.tsx). Every curriculum
// is resolved once through the same engine learners use, with every chapter treated as open and no storage, so
// nothing is read from or written to a learner record. Only valid, unique cards count as coverage: empty,
// placeholder and invalid cards, repeats of a card already counted in the curriculum and authored cards whose
// chapter cannot be matched are reported separately. Recommended depth comes from what each chapter displays
// (`chapterDepth`); a chapter below it has used all of its own text and is flagged for content enrichment.

export type ChapterCoverageStatus = 'covered' | 'below-recommended' | 'zero' | 'held';

export interface FlashcardChapterCoverage {
  moduleIndex: number;
  moduleLabel: string;
  lessonTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  status: ChapterCoverageStatus;
  tier: ChapterTier;
  recommended: number;
  /** Valid, unique cards: the chapter's coverage. */
  cards: number;
  authored: number;
  generated: number;
  duplicates: number;
  invalid: number;
  /** Cognitive steps the chapter's cards ask for (recall, mechanism, implication, application), where cards say. */
  stages: CardStage[];
  /** A mechanism, driver, application or impact section holds the chapter's own text, but no card tests it. */
  objectiveGap: boolean;
}

export interface CoverageCounts {
  eligibleChapters: number;
  chaptersWithCards: number;
  zero: number;
  belowRecommended: number;
  authored: number;
  generated: number;
  /** Valid cards counted once each. */
  unique: number;
  duplicates: number;
  invalid: number;
  /** Authored cards withheld because the chapter they cite is missing, moved or under review. */
  unmapped: number;
  objectiveGaps: number;
}

export interface FlashcardCurriculumCoverage extends CoverageCounts {
  id: string;
  name: string;
  groupId: string;
  groupName: string;
  lessons: number;
  heldChapters: number;
  /** Authored decks exist; chapter cards complete them. */
  hasAuthoredDecks: boolean;
  modules: Array<CoverageCounts & { index: number; label: string }>;
  lessonRows: Array<CoverageCounts & { title: string; moduleIndex: number }>;
  chapters: FlashcardChapterCoverage[];
  error?: string;
}

export interface FlashcardCoverage extends CoverageCounts {
  curricula: number;
  lessons: number;
  heldChapters: number;
  tiers: Record<ChapterTier, { chapters: number; below: number; cards: number }>;
  groups: Array<CoverageCounts & { id: string; name: string; curricula: number }>;
  perCurriculum: FlashcardCurriculumCoverage[];
}

const emptyCounts = (): CoverageCounts => ({ eligibleChapters: 0, chaptersWithCards: 0, zero: 0, belowRecommended: 0, authored: 0, generated: 0, unique: 0, duplicates: 0, invalid: 0, unmapped: 0, objectiveGaps: 0 });

const COUNT_KEYS = Object.keys(emptyCounts()) as Array<keyof CoverageCounts>;

function addCounts(target: CoverageCounts, source: CoverageCounts) {
  COUNT_KEYS.forEach((key) => { target[key] += source[key]; });
}

function chapterCounts(chapter: FlashcardChapterCoverage): CoverageCounts {
  const counts = emptyCounts();
  if (chapter.status === 'held') return counts;
  counts.eligibleChapters = 1;
  counts.chaptersWithCards = chapter.cards ? 1 : 0;
  counts.zero = chapter.status === 'zero' ? 1 : 0;
  counts.belowRecommended = chapter.status === 'below-recommended' ? 1 : 0;
  counts.authored = chapter.authored;
  counts.generated = chapter.generated;
  counts.unique = chapter.cards;
  counts.duplicates = chapter.duplicates;
  counts.invalid = chapter.invalid;
  return counts;
}

const originOf = (item: ScopedCard): 'authored' | 'generated' => item.origin ?? item.card.origin ?? (String(item.card.sourceRefs?.[0]?.file ?? '').startsWith('reader:') ? 'generated' : 'authored');

export type FlashcardResolver = (lesson: Parameters<typeof resolveIndustryFlashcards>[0], storage: StorageLike | null) => IndustryFlashcards | null;

/** Coverage of one curriculum, resolved once through the learner-facing engine. */
export function auditCurriculumFlashcards(entry: LearningModeCatalog['subIndustries'][number], resolve: FlashcardResolver = resolveIndustryFlashcards): FlashcardCurriculumCoverage {
  const routable = entry.lessons.filter((lesson) => !lesson.blocked && lesson.deck?.cards.length);
  const curriculumLessons: CurriculumLesson[] = routable.map((lesson) => ({
    identity: lesson.identity,
    title: lesson.displayTitle,
    persistenceKey: lesson.deck!.persistenceKey,
    chapters: lesson.deck!.cards,
    open: () => undefined,
    moduleIndex: lesson.moduleIndex,
    lessonIndex: lesson.lessonIndex,
    moduleTitle: lesson.moduleTitle,
    moduleLabel: lesson.moduleLabel,
  }));
  const curriculum: LessonFlowCurriculum = { industryLabel: entry.name, lessons: () => curriculumLessons };
  const result: FlashcardCurriculumCoverage = {
    id: entry.id, name: entry.name, groupId: entry.groupId, groupName: entry.groupName, lessons: entry.lessons.length, heldChapters: 0,
    hasAuthoredDecks: false, modules: [], lessonRows: [], chapters: [], ...emptyCounts(), ...(entry.error ? { error: entry.error } : {}),
  };
  const first = routable[0];
  if (!first) return result;
  let data: IndustryFlashcards | null = null;
  try {
    data = resolve({ identity: first.identity, cards: first.deck!.cards, accessible: first.deck!.cards.map((card) => !isRestrictedChapter(card)), persistenceKey: first.deck!.persistenceKey, activeChapter: 0, curriculum }, null);
  } catch (error) {
    result.error = `Flashcards could not be resolved: ${String(error)}`;
  }
  result.hasAuthoredDecks = Boolean(data && !data.generated);
  const byIdentity = new Map((data?.lessons ?? []).map((lesson) => [lesson.identity, lesson]));
  const chapterSets = routable.map((lesson) => lesson.deck!.cards);
  const filters = { generic: genericDefinitions(chapterSets), repeated: repeatedSentences(chapterSets) };
  const counted = new Set<string>();
  const countedContent = new Set<string>();
  const countedBacks: string[] = [];
  const pendingGaps: Array<{ row: FlashcardChapterCoverage; untested: string[] }> = [];
  routable.forEach((lesson) => {
    const resolved = byIdentity.get(lesson.identity);
    const cards = lesson.deck!.cards;
    const lessonRow = { title: lesson.displayTitle, moduleIndex: lesson.moduleIndex, ...emptyCounts() };
    lessonRow.unmapped = resolved?.excluded ?? 0;
    cards.forEach((chapter, index) => {
      const depth = chapterDepth(chapter, filters);
      const items = (resolved?.cards ?? []).filter((item) => item.chapterIndex === index);
      const row: FlashcardChapterCoverage = {
        moduleIndex: lesson.moduleIndex, moduleLabel: lesson.moduleLabel, lessonTitle: lesson.displayTitle, chapterNumber: index + 1, chapterTitle: chapterTitle(cards, index),
        status: 'held', tier: depth.tier, recommended: depth.min, cards: 0, authored: 0, generated: 0, duplicates: 0, invalid: 0, stages: [], objectiveGap: false,
      };
      if (isRestrictedChapter(chapter)) {
        result.heldChapters += 1;
        result.chapters.push(row);
        return;
      }
      const valid: FlashcardContent[] = [];
      items.forEach((item) => {
        if (cardProblem(item.card)) {
          row.invalid += 1;
          return;
        }
        const content = cardContentKey(item.card);
        if (counted.has(item.card.cardId) || countedContent.has(content)) {
          row.duplicates += 1;
          return;
        }
        counted.add(item.card.cardId);
        countedContent.add(content);
        valid.push(item.card);
        countedBacks.push(normaliseTitle(item.card.back));
        if (originOf(item) === 'authored') row.authored += 1;
        else row.generated += 1;
      });
      row.cards = valid.length;
      row.stages = Array.from(new Set(valid.map((card) => card.stage).filter((stage): stage is CardStage => Boolean(stage))));
      const answers = valid.map((card) => contentTokens(card.back));
      const untested = deeperSections(chapter, filters).flatMap((section) => (sentences(section.text).some((sentence) => answers.some((answer) => answersOverlap(contentTokens(sentence), answer))) ? [] : [section.text]));
      if (untested.length) pendingGaps.push({ row, untested });
      row.status = !row.cards ? 'zero' : row.cards < depth.min ? 'below-recommended' : 'covered';
      result.chapters.push(row);
      addCounts(lessonRow, chapterCounts(row));
    });
    result.lessonRows.push(lessonRow);
    addCounts(result, lessonRow);
    const module = result.modules.find((item) => item.index === lesson.moduleIndex)
      ?? (result.modules[result.modules.push({ index: lesson.moduleIndex, label: lesson.moduleLabel, ...emptyCounts() }) - 1]);
    addCounts(module, lessonRow);
  });
  // Text the curriculum repeats in several chapters is tested once, where it first appears; that is not a gap.
  pendingGaps.forEach(({ row, untested }) => {
    if (!untested.some((text) => !countedBacks.some((back) => back.includes(normaliseTitle(sentences(text)[0] ?? text))))) return;
    row.objectiveGap = true;
    const lessonRow = result.lessonRows.find((item) => item.title === row.lessonTitle && item.moduleIndex === row.moduleIndex);
    [result, lessonRow, result.modules.find((item) => item.index === row.moduleIndex)].forEach((counts) => { if (counts) counts.objectiveGaps += 1; });
  });
  return result;
}

export function auditFlashcardCoverage(catalog: LearningModeCatalog, resolve: FlashcardResolver = resolveIndustryFlashcards): FlashcardCoverage {
  const perCurriculum = catalog.subIndustries.map((entry) => auditCurriculumFlashcards(entry, resolve));
  const result: FlashcardCoverage = {
    curricula: perCurriculum.length,
    lessons: catalog.subIndustries.reduce((sum, entry) => sum + entry.lessons.length, 0),
    heldChapters: perCurriculum.reduce((sum, item) => sum + item.heldChapters, 0),
    tiers: { introductory: { chapters: 0, below: 0, cards: 0 }, standard: { chapters: 0, below: 0, cards: 0 }, complex: { chapters: 0, below: 0, cards: 0 } },
    groups: catalog.groups.map((group) => ({ id: group.id, name: group.name, curricula: 0, ...emptyCounts() })),
    perCurriculum,
    ...emptyCounts(),
  };
  perCurriculum.forEach((item) => {
    addCounts(result, item);
    const group = result.groups.find((entry) => entry.id === item.groupId);
    if (group) {
      group.curricula += 1;
      addCounts(group, item);
    }
    item.chapters.forEach((chapter) => {
      if (chapter.status === 'held') return;
      const tier = result.tiers[chapter.tier];
      tier.chapters += 1;
      tier.cards += chapter.cards;
      if (chapter.status !== 'covered') tier.below += 1;
    });
  });
  return result;
}

/** Plain-text report: totals, depth tiers, then each curriculum with its exceptions. */
export function flashcardCoverageReport(coverage: FlashcardCoverage, exceptionsPerCurriculum = 0): string[] {
  const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : '0%');
  return [
    `Flashcard coverage: ${coverage.curricula} curricula · ${coverage.eligibleChapters} eligible chapters (${coverage.heldChapters} held for review, not counted)`,
    `  with valid cards: ${coverage.chaptersWithCards} (${pct(coverage.chaptersWithCards, coverage.eligibleChapters)}) · zero cards: ${coverage.zero} · below recommended depth: ${coverage.belowRecommended}`,
    `  unique valid cards: ${coverage.unique} (authored ${coverage.authored}, generated ${coverage.generated}) · duplicates: ${coverage.duplicates} · invalid: ${coverage.invalid} · authored cards without a valid chapter: ${coverage.unmapped} · objective gaps: ${coverage.objectiveGaps}`,
    ...(['introductory', 'standard', 'complex'] as ChapterTier[]).map((tier) => `  ${tier}: ${coverage.tiers[tier].chapters} chapters · ${coverage.tiers[tier].cards} cards · ${coverage.tiers[tier].below} below recommended`),
    ...coverage.perCurriculum.flatMap((item) => [
      `  ${item.zero ? '✗' : item.belowRecommended ? '△' : '✓'} ${item.groupName} › ${item.name}: ${item.chaptersWithCards}/${item.eligibleChapters} chapters · ${item.unique} cards (authored ${item.authored}, generated ${item.generated}) · ${item.belowRecommended} below · ${item.zero} zero · ${item.duplicates} duplicates · ${item.invalid} invalid · ${item.unmapped} unmapped${item.error ? ` · ${item.error}` : ''}`,
      ...item.chapters.filter((chapter) => chapter.status === 'zero' || chapter.status === 'below-recommended').slice(0, exceptionsPerCurriculum)
        .map((chapter) => `      ${chapter.lessonTitle} › Chapter ${chapter.chapterNumber} ${chapter.chapterTitle}: ${chapter.cards}/${chapter.recommended} (${chapter.tier})`),
    ]),
  ];
}
