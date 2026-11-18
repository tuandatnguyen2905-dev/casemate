// The decks Practice & Review studies: every registered deck (./index.ts), with the MCQ and
// fill-in-the-blank cards written for some lessons placed beside their chapter's authored cards.
// FLASHCARD_DECKS itself is unchanged, so its pinned card lists and source checks stay as they are.

import { mergeInteractiveCards } from '../interactive';
import type { InteractiveCardSpec } from '../interactive';
import { FLASHCARD_DECKS } from './index';
import { CB_INTERACTIVE_CARDS } from './interactiveCommercialBanking';
import { CB_INTERACTIVE_CARDS_M2_M3 } from './interactiveCommercialBankingM2M3';

export const INTERACTIVE_CARD_SPECS: Record<string, InteractiveCardSpec[]> = { ...CB_INTERACTIVE_CARDS, ...CB_INTERACTIVE_CARDS_M2_M3 };

const merged = mergeInteractiveCards(FLASHCARD_DECKS, INTERACTIVE_CARD_SPECS);

export const PRACTICE_DECKS = merged.decks;

/** Interactive cards left out because their deck or authored card was not found (expected to be empty). */
export const INTERACTIVE_MERGE_PROBLEMS = merged.problems;
