import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import type { TestCase } from '../../matchSort/__tests__/assert';
import {
  CHAIN_CHAPTER, COLD_CHAIN_IDENTITY, GROUPS_CHAPTER, HELD_CHAPTER, PARTICIPANTS_CHAPTER, RICH_TERMS_CHAPTER, TEMPLATE_CHAPTER,
} from '../../matchSort/__tests__/generatorFixtures';
import { MATCH_SORT_PACKS } from '../../matchSort/content';
import { LESSON_REVIEW_KIND } from '../../matchSort/generator';
import { normaliseTitle } from '../../matchSort/validation';
import { auditMatchSortCoverage, matchSortCoverageReport } from '../../../IndustryKnowledge/matchSortCoverage';
import type { LearningModeCatalog } from '../../../IndustryKnowledge/learningModeAudit';
import type { ChapterLike } from '../../../IndustryKnowledge/lessonFlowCore';
import { resolveLessonPractice } from '../lessonAccess';
import { chapterActivities, chapterLearningModes, chapterModeCounts } from '../learningModes';
import type { PracticeLesson } from '../practiceLessonStore';
import { heldSourceDecks } from '../sourceDecks';

// Generated Match & Sort through the learner-facing resolver (MS-12, MS-18 … MS-20, MS-24). Needs the
// apps/IndustryKnowledge module graph for the authored packs and source decks, but no DOM. Run from the workspace root:
// npx -y tsx@4 <this file>.

const CHAPTERS = [RICH_TERMS_CHAPTER, TEMPLATE_CHAPTER, GROUPS_CHAPTER, CHAIN_CHAPTER, PARTICIPANTS_CHAPTER];
const practiceLesson = (accessible: boolean[], cards: ChapterLike[] = CHAPTERS, identity = COLD_CHAIN_IDENTITY): PracticeLesson => ({ identity, cards, accessible, activeChapter: 0 });
const allOpen = (cards: ChapterLike[] = CHAPTERS) => cards.map((card) => card.reviewStatus !== 'Under Review');

const cases: TestCase[] = [
  { name: 'MS-18 generated activities follow the reader\'s chapter gate: locked chapters are counted, never offered', run: () => {
    const result = resolveLessonPractice(practiceLesson([true, false, false, false, false]), heldSourceDecks(), null);
    ok(result, 'a lesson with no authored pack resolves generated practice');
    ok(result.available.every((activity) => activity.sourceRefs.every((ref) => ref.chapterIndex === 0)), 'only chapter 1 activities are offered');
    ok(result.lockedCount > 0, 'later chapters count as locked');
    eq(result.excluded.length, 0, 'nothing excluded');
    eq(result.pack.sourceModuleKey, 'READER_GENERATED', 'generated pack');
  } },
  { name: 'MS-19 chapter-only practice lists only the activities that cite that chapter', run: () => {
    const result = resolveLessonPractice(practiceLesson(allOpen()), heldSourceDecks(), null)!;
    [0, 2, 3].forEach((index) => {
      const scoped = chapterActivities(result, index);
      ok(scoped.available.length > 0, `chapter ${index + 1} has activities`);
      ok(scoped.available.every((activity) => activity.sourceRefs.some((ref) => ref.chapterIndex === index)), 'each cites the chapter');
    });
    eq(chapterActivities(result, 1).available.filter((activity) => activity.objectiveKey !== LESSON_REVIEW_KIND).length, 0, 'the template chapter has no chapter practice');
  } },
  { name: 'MS-20 the chooser shows Match & Sort with a count where activities exist and "not available" where none do', run: () => {
    const lesson = practiceLesson(allOpen([RICH_TERMS_CHAPTER, TEMPLATE_CHAPTER]), [RICH_TERMS_CHAPTER, TEMPLATE_CHAPTER]);
    const rich = chapterLearningModes(lesson, 0, null);
    ok(rich.modes['match-sort'].available && rich.modes['match-sort'].count > 0, 'available with a count');
    const thin = chapterLearningModes(lesson, 1, null);
    eq(thin.modes['match-sort'], { id: 'match-sort', available: false, count: 0 }, 'unavailable, so the chooser shows "Not available for this chapter yet"');
    eq(thin.modes.reader.available, true, 'General Info stays open');
    const counts = chapterModeCounts(lesson, 'match-sort', null);
    eq(counts[1], 0, 'journey count 0 for the thin chapter');
    const held = chapterLearningModes(practiceLesson([true, true], [HELD_CHAPTER, CHAIN_CHAPTER], COLD_CHAIN_IDENTITY), 0, null);
    eq(held.modes['match-sort'].available, false, 'held chapter offers nothing');
  } },
  { name: 'MS-12 every authored lesson keeps exactly its authored activities, first and unchanged, with generation on', run: () => {
    const decks = heldSourceDecks() as Record<string, Record<string, ChapterLike[] | undefined>>;
    let lessons = 0;
    MATCH_SORT_PACKS.forEach((pack) => {
      const titles = Array.from(new Set(pack.activities.flatMap((activity) => activity.sourceRefs.map((ref) => ref.lessonTitle))));
      titles.forEach((lessonTitle) => {
        const module = decks[pack.sourceModuleKey] ?? {};
        const key = Object.keys(module).find((candidate) => normaliseTitle(candidate) === normaliseTitle(lessonTitle));
        const cards = key ? module[key] ?? [] : [];
        if (!cards.length) return;
        lessons += 1;
        const lesson = practiceLesson(allOpen(cards), cards, `${pack.industryId}::Module::${lessonTitle}`);
        const before = resolveLessonPractice(lesson, heldSourceDecks(), null, { generated: false });
        const after = resolveLessonPractice(lesson, heldSourceDecks(), null);
        const authoredAfter = (after?.available ?? []).filter((activity) => activity.origin !== 'generated').map((activity) => activity.activityId);
        eq(authoredAfter, (before?.available ?? []).map((activity) => activity.activityId), `${lessonTitle}: authored activities unchanged and in order`);
        eq(after?.lockedCount ?? 0, (before?.lockedCount ?? 0) + (after?.pack.activities.filter((activity) => activity.origin === 'generated' && !after.available.includes(activity)).length ?? 0), `${lessonTitle}: locked count only grows by locked generated activities`);
        (after?.available ?? []).filter((activity) => activity.origin === 'generated' && activity.objectiveKey !== LESSON_REVIEW_KIND).forEach((activity) => {
          const index = activity.sourceRefs[0].chapterIndex;
          const authoredHere = (before?.available ?? []).some((item) => item.sourceRefs.some((ref) => ref.chapterIndex === index && normaliseTitle(ref.lessonTitle) === normaliseTitle(lessonTitle)) && !(item.type === 'concept-matching' && item.sourceRefs.length >= 3 && item.pairs.length <= item.sourceRefs.length));
          ok(!authoredHere, `${lessonTitle}: no generated activity on a chapter with authored chapter practice`);
        });
      });
    });
    ok(lessons > 0, 'authored lessons checked');
  } },
  { name: 'MS-24 the read-only coverage checker counts chapters, not activity records, and reports enrichment', run: () => {
    const catalog: LearningModeCatalog = {
      groups: [{ id: 'logistics', name: 'Logistics' }],
      subIndustries: [{
        id: 'logistics-coldchain', name: 'Cold Chain', groupId: 'logistics', groupName: 'Logistics',
        lessons: [{ moduleIndex: 0, moduleTitle: 'How the Industry Works', moduleLabel: 'Module 1', lessonIndex: 0, lessonTitle: 'Cold Chain Basics', displayTitle: 'Cold Chain Basics', identity: COLD_CHAIN_IDENTITY, blocked: false, deck: { cards: [...CHAPTERS, HELD_CHAPTER], persistenceKey: 'cold-1' }, routeDeck: { persistenceKey: 'cold-1' } }],
      }],
    };
    const coverage = auditMatchSortCoverage(catalog);
    eq(coverage.chapters, 6, 'all chapters');
    eq(coverage.heldChapters, 1, 'held chapter not eligible');
    eq(coverage.eligibleChapters, coverage.chaptersWithValid + coverage.chaptersLessonLevelOnly + coverage.chaptersZero, 'eligible = covered + lesson-level only + zero');
    eq(coverage.chaptersWithAuthored, 0, 'no authored coverage before');
    ok(coverage.chaptersWithValid >= 3, 'rich, grouped and chain chapters covered');
    eq([coverage.invalid, coverage.ungrounded, coverage.unanswerable, coverage.duplicates], [0, 0, 0, 0], 'no invalid, ungrounded, unanswerable or duplicate activity');
    ok(coverage.enrichmentNeeded >= 1, 'the template chapter is flagged');
    ok(coverage.perCurriculum[0].chapterRows.find((row) => row.chapterNumber === 2)?.enrichment, 'with a reason');
    eq(coverage.unique, coverage.authored + coverage.generated + coverage.lessonLevel, 'unique = authored + generated + lesson-level');
    eq(coverage.unique, coverage.matching + coverage.sorting + coverage.sequence, 'unique = matching + sorting + sequence');
    ok(matchSortCoverageReport(coverage).some((line) => line.includes('Cold Chain')), 'per-curriculum row');
  } },
];

export const runGeneratedPracticeTests = () => runSuite('Match & Sort generated practice', cases);
Promise.resolve(runGeneratedPracticeTests()).catch((error) => { console.error(error.message); throw error; });
