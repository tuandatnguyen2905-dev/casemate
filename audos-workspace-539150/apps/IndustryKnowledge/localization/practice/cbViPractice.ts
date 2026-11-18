import { CB_VI_LESSONS } from '../commercialBanking/cbViNav';
import type { ViFlashcard, ViMatchActivity } from './cbViPracticeTypes';
import { CB_VI_FLASHCARDS_L11 } from './cbViPracticeFlashcardsL11';
import { CB_VI_FLASHCARDS_L12 } from './cbViPracticeFlashcardsL12';
import { CB_VI_FLASHCARDS_L13_L15 } from './cbViPracticeFlashcardsL13L15';
import { CB_VI_INTERACTIVE_L12 } from './cbViPracticeInteractiveL12';
import { CB_VI_MATCH_SORT_M01 } from './cbViPracticeMatchSortM01';
import { CB_VI_FLASHCARDS_M02 } from './cbViPracticeFlashcardsM02';
import { CB_VI_FLASHCARDS_M03 } from './cbViPracticeFlashcardsM03';
import { CB_VI_FLASHCARDS_M04 } from './cbViPracticeFlashcardsM04';
import { CB_VI_FLASHCARDS_M05 } from './cbViPracticeFlashcardsM05';
import { CB_VI_INTERACTIVE_M02M03 } from './cbViPracticeInteractiveM02M03';
import { CB_VI_MATCH_SORT_M02 } from './cbViPracticeMatchSortM02';
import { CB_VI_MATCH_SORT_M03M04 } from './cbViPracticeMatchSortM03M04';
import { CB_VI_MATCH_SORT_M05 } from './cbViPracticeMatchSortM05';

export type { ViFlashcard, ViMatchActivity } from './cbViPracticeTypes';

/**
 * Vietnamese for authored Commercial Banking flashcards, keyed by cardId: classic 1.1-1.5 and 2.1-5.5 (lesson 5.4 is held, REV-P0-12),
 * interactive 1.2 and 2.1-3.3.
 */
export const CB_VI_FLASHCARDS: Record<string, ViFlashcard> = {
  ...CB_VI_FLASHCARDS_L11,
  ...CB_VI_FLASHCARDS_L12,
  ...CB_VI_FLASHCARDS_L13_L15,
  ...CB_VI_INTERACTIVE_L12,
  ...CB_VI_FLASHCARDS_M02,
  ...CB_VI_FLASHCARDS_M03,
  ...CB_VI_FLASHCARDS_M04,
  ...CB_VI_FLASHCARDS_M05,
  ...CB_VI_INTERACTIVE_M02M03,
};

/** Vietnamese for authored Commercial Banking Match & Sort activities, keyed by activityId. */
export const CB_VI_MATCH_SORT: Record<string, ViMatchActivity> = {
  ...CB_VI_MATCH_SORT_M01,
  ...CB_VI_MATCH_SORT_M02,
  ...CB_VI_MATCH_SORT_M03M04,
  ...CB_VI_MATCH_SORT_M05,
};

/** Lesson names for practice source labels, keyed by lesson code. */
export const CB_VI_PRACTICE_LESSONS: Record<string, { en: string; vi: string }> = Object.fromEntries(
  Object.entries(CB_VI_LESSONS).map(([code, copy]) => [code, { en: copy.en, vi: copy.title }]),
);
