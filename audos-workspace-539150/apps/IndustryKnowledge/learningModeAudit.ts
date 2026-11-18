import { assessmentStatuses, isRestrictedChapter, planAssessment } from './lessonFlowCore';
import type { ChapterLike, QuestionLike, StorageLike } from './lessonFlowCore';
import type { CurriculumLesson, LessonFlowCurriculum } from './lessonFlow';
import { lessonChapterContent, prepareLearningEntry } from '../InteractiveLearning/practiceReview/learningModes';

// Learning Mode Chooser routing check for the whole catalogue. The catalogue comes from App.tsx
// (`loadLearningModeCatalog`): every implemented sub-industry, every lesson card, and the deck the
// shared dispatcher returns for it, so nothing here names a curriculum. A sub-industry is verified
// when every lesson a learner can open resolves a deck, its route opens that same deck, Start
// Learning finds an open chapter, and General Info is open on that chapter.

export interface AuditLesson {
  moduleIndex: number;
  moduleTitle: string;
  moduleLabel: string;
  lessonIndex: number;
  lessonTitle: string;
  displayTitle: string;
  /** `<industryId>::<module title>::<lesson title>`, as the module overview and the reader compute it. */
  identity: string;
  /** The lesson card cannot be opened (under review or in development). */
  blocked: boolean;
  deck: { cards: ChapterLike[]; persistenceKey: string; quizQuestions?: QuestionLike[] } | null;
  /** The deck the lesson route (`dkModule` + `dkLesson`) opens, looked up the way the screen does. */
  routeDeck: { persistenceKey: string } | null;
}

export interface AuditSubIndustry {
  id: string;
  name: string;
  groupId: string;
  groupName: string;
  lessons: AuditLesson[];
  /** Set when the sub-industry's modules could not be loaded. */
  error?: string;
}

export interface LearningModeCatalog {
  groups: Array<{ id: string; name: string }>;
  subIndustries: AuditSubIndustry[];
}

export interface MissingChapter {
  lessonTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  missing: Array<'flashcards' | 'match-sort'>;
}

export interface SubIndustryAudit {
  id: string;
  name: string;
  groupId: string;
  groupName: string;
  lessons: number;
  /** Lesson cards a learner can open (not under review, not in development). */
  openableLessons: number;
  /** Openable lessons whose chooser routing passed every check. */
  routedLessons: number;
  /** Openable lessons whose every chapter is under review, so the reader shows its hold notice instead. */
  heldLessons: number;
  failures: string[];
  /** Chapters not under review in routed lessons. */
  chapters: number;
  chaptersWithFlashcards: number;
  chaptersWithMatchSort: number;
  chaptersWithBoth: number;
  flashcards: number;
  matchSortActivities: number;
  missing: MissingChapter[];
  verified: boolean;
}

export interface GroupAudit {
  id: string;
  name: string;
  implemented: number;
  verified: number;
  chapters: number;
  chaptersWithFlashcards: number;
  chaptersWithMatchSort: number;
  flashcards: number;
}

export interface LearningModeAudit {
  implemented: number;
  verified: number;
  percent: number;
  groups: GroupAudit[];
  subIndustries: SubIndustryAudit[];
}

const noop = () => {};

export function auditSubIndustry(entry: AuditSubIndustry, storage: StorageLike | null = null): SubIndustryAudit {
  const failures: string[] = entry.error ? [entry.error] : [];
  const routable = entry.lessons.filter((lesson) => !lesson.blocked && lesson.deck?.cards.length);
  const curriculumLessons: CurriculumLesson[] = routable.map((lesson) => ({
    identity: lesson.identity,
    title: lesson.displayTitle,
    persistenceKey: lesson.deck!.persistenceKey,
    chapters: lesson.deck!.cards,
    assessment: lesson.deck!.quizQuestions ? assessmentStatuses(planAssessment(lesson.deck!.quizQuestions, lesson.deck!.cards)) : undefined,
    open: noop,
    moduleIndex: lesson.moduleIndex,
    lessonIndex: lesson.lessonIndex,
    moduleTitle: lesson.moduleTitle,
    moduleLabel: lesson.moduleLabel,
  }));
  const curriculum: LessonFlowCurriculum = { industryLabel: entry.name, lessons: () => curriculumLessons };
  const result: SubIndustryAudit = {
    id: entry.id, name: entry.name, groupId: entry.groupId, groupName: entry.groupName,
    lessons: entry.lessons.length, openableLessons: 0, routedLessons: 0, heldLessons: 0, failures,
    chapters: 0, chaptersWithFlashcards: 0, chaptersWithMatchSort: 0, chaptersWithBoth: 0, flashcards: 0, matchSortActivities: 0,
    missing: [], verified: false,
  };
  entry.lessons.forEach((lesson) => {
    if (lesson.blocked) return;
    result.openableLessons += 1;
    const label = `${lesson.moduleTitle} › ${lesson.lessonTitle}`;
    const deck = lesson.deck;
    if (!deck || !deck.cards.length) {
      failures.push(`${label}: no chapter deck resolved`);
      return;
    }
    if (lesson.routeDeck?.persistenceKey !== deck.persistenceKey) {
      failures.push(`${label}: the lesson route opens a different deck`);
      return;
    }
    let plan: ReturnType<typeof prepareLearningEntry> = null;
    try {
      plan = prepareLearningEntry({ identity: lesson.identity, persistenceKey: deck.persistenceKey, chapters: deck.cards, curriculum, entry: 'start' }, storage);
    } catch (error) {
      failures.push(`${label}: chooser could not resolve the chapter (${String(error)})`);
      return;
    }
    if (!plan) {
      if (deck.cards.every((card) => isRestrictedChapter(card))) result.heldLessons += 1;
      else failures.push(`${label}: Start Learning finds no open chapter`);
      return;
    }
    if (!plan.modes.reader.available) {
      failures.push(`${label}: General Info is not open for chapter ${plan.chapterIndex + 1}`);
      return;
    }
    result.routedLessons += 1;
    lessonChapterContent(plan.lesson, storage).forEach((chapter) => {
      if (chapter.restricted) return;
      result.chapters += 1;
      result.flashcards += chapter.flashcards;
      result.matchSortActivities += chapter.matchSort;
      if (chapter.flashcards) result.chaptersWithFlashcards += 1;
      if (chapter.matchSort) result.chaptersWithMatchSort += 1;
      if (chapter.flashcards && chapter.matchSort) result.chaptersWithBoth += 1;
      const missing = [...(chapter.flashcards ? [] : ['flashcards' as const]), ...(chapter.matchSort ? [] : ['match-sort' as const])];
      if (missing.length) result.missing.push({ lessonTitle: lesson.displayTitle, chapterNumber: chapter.chapterIndex + 1, chapterTitle: chapter.title, missing });
    });
  });
  result.verified = failures.length === 0 && result.routedLessons > 0;
  return result;
}

export function auditLearningModes(catalog: LearningModeCatalog, storage: StorageLike | null = null): LearningModeAudit {
  const subIndustries = catalog.subIndustries.map((entry) => auditSubIndustry(entry, storage));
  const groups = catalog.groups.map((group): GroupAudit => {
    const own = subIndustries.filter((item) => item.groupId === group.id);
    return {
      id: group.id,
      name: group.name,
      implemented: own.length,
      verified: own.filter((item) => item.verified).length,
      chapters: own.reduce((sum, item) => sum + item.chapters, 0),
      chaptersWithFlashcards: own.reduce((sum, item) => sum + item.chaptersWithFlashcards, 0),
      chaptersWithMatchSort: own.reduce((sum, item) => sum + item.chaptersWithMatchSort, 0),
      flashcards: own.reduce((sum, item) => sum + item.flashcards, 0),
    };
  });
  const implemented = subIndustries.length;
  const verified = subIndustries.filter((item) => item.verified).length;
  return { implemented, verified, percent: implemented ? Math.round((verified / implemented) * 100) : 0, groups, subIndustries };
}

/** "█████████░ 9/10 sub-industries (90%)" */
export function progressBarText(done: number, total: number, width = 20): string {
  const filled = total ? Math.round((done / total) * width) : 0;
  return `${'█'.repeat(filled)}${'░'.repeat(Math.max(0, width - filled))} ${done}/${total} sub-industries (${total ? Math.round((done / total) * 100) : 0}%)`;
}
