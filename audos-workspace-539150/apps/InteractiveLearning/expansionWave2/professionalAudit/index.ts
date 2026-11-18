import type { FlashcardDeckContent, SourceModule, Wave2Activity, Wave2Pack } from '../types';
import { PA_M01_DECKS } from './flashcards/m01';
import { PA_M02_DECKS } from './flashcards/m02';
import { PA_M03_DECKS } from './flashcards/m03';
import { PA_M04_DECKS } from './flashcards/m04';
import { PA_M05_DECKS } from './flashcards/m05';
import { PA_M01_ACTIVITIES } from './matchSort/m01';
import { PA_M02_ACTIVITIES } from './matchSort/m02';
import { PA_M03_ACTIVITIES } from './matchSort/m03';
import { PA_M05_ACTIVITIES } from './matchSort/m05';
import { PA_M1, PA_M2, PA_M3, PA_M5 } from './source';
import { VALIDATED_ACTIVITY_IDS, VALIDATED_CARD_IDS, isEligibleChapter } from './chapterIntegrity';

const NOTE_SOURCE = 'Source chapters are generated from the module data file: each canonical chapter shows its source item\u2019s text (or an authored detail entry), so grounding quotes are verbatim chapter text. Chapters whose displayed text does not answer their title are flagged in source.ts and are not relied on for the title\u2019s topic.';

function pack(module: SourceModule, activities: Wave2Activity[], notes: string[]): Wave2Pack {
  const moduleNo = Number(module.moduleId.replace(/\D/g, ''));
  return {
    packId: `professional-audit-m${moduleNo}`,
    title: `Audit & Assurance \u00b7 ${module.moduleLabel.split(' \u00b7 ')[1]} practice`,
    industryId: 'professional-audit',
    moduleId: module.moduleId,
    sourceModuleKey: module.moduleKey,
    contentStatus: 'Draft',
    contentNotes: [NOTE_SOURCE, ...notes],
    activities,
  };
}

/** Every authored deck, unfiltered (traceability and tests). Never register this list: use the ELIGIBLE exports below. */
export const PROFESSIONAL_AUDIT_FLASHCARD_DECKS: FlashcardDeckContent[] = [...PA_M01_DECKS, ...PA_M02_DECKS, ...PA_M03_DECKS, ...PA_M04_DECKS, ...PA_M05_DECKS];
export const PROFESSIONAL_AUDIT_MATCH_SORT_PACKS: Wave2Pack[] = [
  pack(PA_M1, PA_M01_ACTIVITIES, ['Lesson 1.5 has no activity: the chapter lists external forces without saying which belongs where.']),
  pack(PA_M2, PA_M02_ACTIVITIES, ['Lessons 2.2, 2.5 and 2.6 have no activity: their chapters list considerations without definitions or categories. Lesson 2.6 chapter 3 is under review hold REV-P0-10 and is never cited.']),
  pack(PA_M3, PA_M03_ACTIVITIES, ['Lessons 3.1, 3.3, 3.5 and 3.6 have no activity: 3.3 and 3.5 show text on a different topic than their titles, and 3.1 and 3.6 list considerations without categories or definitions.']),
  pack(PA_M5, PA_M05_ACTIVITIES, ['Only lesson 5.2 has an activity. Chapter 3 of 5.2 shows cybersecurity text under an AI title; the activity cites chapters 1 to 3 for what each states. Module 4 has no pack: its chapters list considerations without definitions or categories.']),
];

/** Every chapter a card draws on (its own plus each cited chapter) is classified A or B, and the card itself passed review. */
function isEligibleCard(deck: FlashcardDeckContent, card: FlashcardDeckContent['cards'][number]): boolean {
  if (!VALIDATED_CARD_IDS.includes(card.cardId)) return false;
  const chapterIds = new Set([card.chapterId, ...card.sourceRefs.map((ref) => ref.chapterId)]);
  return Array.from(chapterIds).every((chapterId) => {
    const chapter = deck.chapters.find((item) => item.chapterId === chapterId);
    return Boolean(chapter) && isEligibleChapter(deck.source.moduleKey, deck.source.lessonTitle, (chapter as { number: number }).number);
  });
}

const isEligibleActivity = (activity: Wave2Activity) => VALIDATED_ACTIVITY_IDS.includes(activity.activityId)
  && activity.sourceRefs.every((ref) => isEligibleChapter(ref.sourceModuleKey, ref.lessonTitle, ref.chapterIndex + 1));

/**
 * The only Audit content that may be registered in live Practice & Review: validated cards on A/B chapters
 * (see chapterIntegrity.ts). Decks keep their IDs; decks left with no eligible card are omitted.
 */
export const PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS: FlashcardDeckContent[] = PROFESSIONAL_AUDIT_FLASHCARD_DECKS
  .map((deck) => ({ ...deck, cards: deck.cards.filter((card) => isEligibleCard(deck, card)) }))
  .filter((deck) => deck.cards.length > 0);

/** Validated activities whose every cited chapter is A or B. Currently empty: all 11 activities failed review. */
export const PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS: Wave2Pack[] = PROFESSIONAL_AUDIT_MATCH_SORT_PACKS
  .map((item) => ({ ...item, activities: item.activities.filter(isEligibleActivity) }))
  .filter((item) => item.activities.length > 0);
