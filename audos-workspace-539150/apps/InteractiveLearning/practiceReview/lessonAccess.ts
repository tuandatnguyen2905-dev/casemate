import { isRestrictedChapter, lessonIdentity, loadProgressStore, storedChapterProgress } from '../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, ChapterPlanStatus, StorageLike } from '../../IndustryKnowledge/lessonFlowCore';
import type { CurriculumLesson } from '../../IndustryKnowledge/lessonFlow';
import { MATCH_SORT_PACKS } from '../matchSort/content';
import { GENERATED_SOURCE_KEY } from '../matchSort/generator';
import { generatedLessonPractice, generatedPracticePack } from '../matchSort/generatedPractice';
import { chapterRefProblem, normaliseTitle } from '../matchSort/validation';
import type { SourceDecks } from '../matchSort/validation';
import type { ChapterRef, MatchSortActivity, MatchSortPack } from '../matchSort/types';
import type { PracticeLesson } from './practiceLessonStore';

export function splitIdentity(identity: string) {
  const [industryId = '', moduleTitle = '', ...rest] = identity.split('::');
  return { industryId, moduleTitle, lessonTitle: rest.join('::') };
}

export interface LessonPracticeResult {
  pack: MatchSortPack;
  /** The pack's key for this lesson (exact deck-registry title). */
  lessonTitle: string;
  available: MatchSortActivity[];
  /** Activities for this lesson whose chapters exist but are not open to this learner yet. */
  lockedCount: number;
  /** Activities withheld because a cited chapter is missing, moved or under review. */
  excluded: Array<{ activityId: string; reasons: string[] }>;
}

type Access = { ok: true } | { ok: false; locked: boolean; reason: string };

export interface LessonPracticeOptions {
  /** Add activities generated from the chapters' displayed text where no authored activity practises a chapter (default true). */
  generated?: boolean;
  /** The authored packs to resolve against (default: the registered `MATCH_SORT_PACKS`). Lets tests supply fixtures. */
  packs?: MatchSortPack[];
}

/**
 * The packs whose source references point at this lesson's actual chapters (titles at their
 * positions). A lesson can be served by more than one pack (a module's original pack plus its
 * expansion pack); their activities are offered together, in pack order.
 */
function packForLesson(lesson: PracticeLesson, packs: MatchSortPack[]): { pack: MatchSortPack; lessonTitle: string } | null {
  const title = normaliseTitle(splitIdentity(lesson.identity).lessonTitle);
  const matches = packs.flatMap((pack) => {
    const ref = pack.activities.flatMap((activity) => activity.sourceRefs)
      .find((item) => normaliseTitle(item.lessonTitle) === title && normaliseTitle(lesson.cards[item.chapterIndex]?.title) === normaliseTitle(item.chapterTitle));
    return ref ? [{ pack, lessonTitle: ref.lessonTitle }] : [];
  });
  if (!matches.length) return null;
  const [first] = matches;
  if (matches.length === 1) return first;
  return { lessonTitle: first.lessonTitle, pack: { ...first.pack, activities: matches.flatMap((match) => match.pack.activities) } };
}

/** What the curriculum knows about a cited lesson, used to find the reader's own records for it. */
export interface CitedLessonRecords {
  /** The curriculum's identity for the cited lesson (`<industryId>::<module title>::<lesson title>`). */
  identity?: string;
  /** The reader's storage key for the cited lesson, which also holds its legacy chapter completion. */
  persistenceKey?: string;
}

/**
 * Whether a chapter cited from another lesson is open to this learner. It is the reader's own gate for
 * that lesson (`storedChapterProgress`): the cited lesson's chapter checks, legacy chapter completion
 * (`legacyCompletedChapters`, migrated at read time), legacy lesson completion and its chapter statuses.
 * Flashcards (`lessonChapterAccess`) and the Learning Mode Chooser (`lessonChapterProgress`) use the same
 * function, so the three modes cannot disagree. Held chapters never open, and a chapter that cannot be
 * resolved, or records that cannot be read, never open it. Nothing is written.
 */
export function otherLessonAccess(ref: ChapterRef, deck: ChapterLike[], identity: string, storage: StorageLike | null, assessment?: ChapterPlanStatus[], cited: CitedLessonRecords = {}): boolean {
  try {
    const { industryId, moduleTitle } = splitIdentity(identity);
    const store = loadProgressStore(storage);
    const storedKey = Object.keys(store).find((candidate) => {
      const parts = splitIdentity(candidate);
      return parts.industryId === industryId && parts.moduleTitle === moduleTitle && normaliseTitle(parts.lessonTitle) === normaliseTitle(ref.lessonTitle);
    });
    const citedKnown = cited.identity !== undefined && store[cited.identity] !== undefined;
    const targetIdentity = citedKnown ? cited.identity! : storedKey ?? cited.identity ?? lessonIdentity(industryId, moduleTitle, ref.lessonTitle);
    const storedPersistenceKey = storedKey ? store[storedKey]?.persistenceKey : undefined;
    const persistenceKey = cited.persistenceKey || (typeof storedPersistenceKey === 'string' ? storedPersistenceKey : undefined);
    const chapter = storedChapterProgress(targetIdentity, persistenceKey, deck, storage, assessment)[ref.chapterIndex];
    return Boolean(chapter?.unlocked && !chapter.restricted);
  } catch {
    return false;
  }
}

/** A lesson cited from the open lesson's module, as the curriculum lists it (identity, storage key, chapter statuses). */
function citedCurriculumLesson(lesson: PracticeLesson, lessonTitle: string): CurriculumLesson | undefined {
  const { industryId, moduleTitle } = splitIdentity(lesson.identity);
  try {
    return lesson.curriculum?.lessons().find((item) => {
      const parts = splitIdentity(item.identity);
      return parts.industryId === industryId && parts.moduleTitle === moduleTitle && normaliseTitle(parts.lessonTitle) === normaliseTitle(lessonTitle);
    });
  } catch {
    return undefined;
  }
}

/** A generated activity cites the reader's own deck for this lesson, so the reader's gate is the only check. */
function generatedRefAccess(ref: ChapterRef, lesson: PracticeLesson): Access {
  const card = lesson.cards[ref.chapterIndex];
  if (!card || normaliseTitle(card.title) !== normaliseTitle(ref.chapterTitle)) return { ok: false, locked: false, reason: `reader shows a different chapter at index ${ref.chapterIndex}` };
  if (isRestrictedChapter(card)) return { ok: false, locked: false, reason: `chapter "${ref.chapterTitle}" is under review` };
  return lesson.accessible[ref.chapterIndex] ? { ok: true } : { ok: false, locked: true, reason: `chapter "${ref.chapterTitle}" is locked` };
}

function refAccess(ref: ChapterRef, lesson: PracticeLesson, lessonTitle: string, decks: SourceDecks, storage: StorageLike | null): Access {
  if (ref.sourceModuleKey === GENERATED_SOURCE_KEY) return generatedRefAccess(ref, lesson);
  const problem = chapterRefProblem(ref, decks);
  if (problem) return { ok: false, locked: false, reason: problem };
  if (normaliseTitle(ref.lessonTitle) === normaliseTitle(lessonTitle)) {
    const card = lesson.cards[ref.chapterIndex];
    if (!card || normaliseTitle(card.title) !== normaliseTitle(ref.chapterTitle)) return { ok: false, locked: false, reason: `reader shows a different chapter at index ${ref.chapterIndex}` };
    if (isRestrictedChapter(card)) return { ok: false, locked: false, reason: `chapter "${ref.chapterTitle}" is under review` };
    return lesson.accessible[ref.chapterIndex] ? { ok: true } : { ok: false, locked: true, reason: `chapter "${ref.chapterTitle}" is locked` };
  }
  const lessonKey = Object.keys(decks[ref.sourceModuleKey] ?? {}).find((key) => normaliseTitle(key) === normaliseTitle(ref.lessonTitle)) ?? ref.lessonTitle;
  const deck = decks[ref.sourceModuleKey]?.[lessonKey] ?? [];
  const cited = citedCurriculumLesson(lesson, ref.lessonTitle);
  return otherLessonAccess(ref, deck, lesson.identity, storage, cited?.assessment, { identity: cited?.identity, persistenceKey: cited?.persistenceKey }) ? { ok: true } : { ok: false, locked: true, reason: `chapter "${ref.chapterTitle}" in "${ref.lessonTitle}" is locked` };
}

/**
 * Practice for the open lesson. An activity is offered only when every chapter it cites exists
 * at its recorded position, is not under review, and is open to this learner, including chapters
 * in other lessons of the same module. Authored activities come first and are never changed; chapters
 * no authored activity practises get the activities generated from their displayed text
 * (`matchSort/generator.ts`), which follow the same chapter gate.
 */
export function resolveLessonPractice(lesson: PracticeLesson | null, decks: SourceDecks, storage: StorageLike | null, options: LessonPracticeOptions = {}): LessonPracticeResult | null {
  if (!lesson) return null;
  const match = packForLesson(lesson, options.packs ?? MATCH_SORT_PACKS);
  const lessonTitle = match?.lessonTitle ?? splitIdentity(lesson.identity).lessonTitle;
  const authored = match ? match.pack.activities.filter((activity) => activity.sourceRefs.some((ref) => normaliseTitle(ref.lessonTitle) === normaliseTitle(lessonTitle))) : [];
  let generated: MatchSortActivity[] = [];
  if (options.generated !== false) {
    try {
      generated = generatedLessonPractice(lesson.identity, lesson.cards, authored).activities;
    } catch {
      generated = [];
    }
  }
  if (!match && !generated.length) return null;
  const pack: MatchSortPack = match
    ? (generated.length ? { ...match.pack, activities: [...match.pack.activities, ...generated] } : match.pack)
    : generatedPracticePack(lesson.identity, generated);
  const related = [...authored, ...generated];
  const available: MatchSortActivity[] = [];
  const excluded: LessonPracticeResult['excluded'] = [];
  let lockedCount = 0;
  related.forEach((activity) => {
    const results = activity.sourceRefs.map((ref) => refAccess(ref, lesson, lessonTitle, decks, storage));
    const blocked = results.filter((result): result is Extract<Access, { ok: false }> => !result.ok);
    const hard = blocked.filter((result) => !result.locked);
    if (hard.length) excluded.push({ activityId: activity.activityId, reasons: hard.map((result) => result.reason) });
    else if (blocked.length) lockedCount += 1;
    else available.push(activity);
  });
  return { pack, lessonTitle, available, lockedCount, excluded };
}
