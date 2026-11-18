// Read-only integration manifest for the later consolidation pass. Importing this file changes nothing.
// Do not register wave-2 content until step 1 passes: the content is only as current as the curriculum
// text it was read from. Only the ELIGIBLE exports may be registered (chapterIntegrity.ts): content on
// Misaligned (C) or Restricted/Unverifiable (D) chapters, and content that failed review, is never exposed.

import { PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS, PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS, PROFESSIONAL_AUDIT_FLASHCARD_DECKS } from './professionalAudit';
import { EXCLUDED_ACTIVITIES, EXCLUDED_CARDS } from './professionalAudit/chapterIntegrity';

/** Cards withheld by the 2026-11-08 source-integrity review (C/D chapters or failed card review). Re-review before any is re-listed. */
export const FLAGGED_CARD_IDS: string[] = Object.keys(EXCLUDED_CARDS);

/** Activities withheld by the same review (all 11). */
export const FLAGGED_ACTIVITY_IDS: string[] = Object.keys(EXCLUDED_ACTIVITIES);

/** Eligible decks with fewer than 4 cards: the shared decks test requires 4–14 per expansion deck. */
export const UNDERSIZED_ELIGIBLE_DECK_IDS: string[] = PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.filter((deck) => deck.cards.length < 4).map((deck) => deck.deckId);

export interface IntegrationStep {
  step: number;
  file: string;
  change: string;
}

export const INTEGRATION_MANIFEST = {
  industryId: 'professional-audit',
  exports: {
    module: 'apps/InteractiveLearning/expansionWave2/professionalAudit/index.ts',
    decks: `PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS: FlashcardDeckContent[] (${PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.length} of ${PROFESSIONAL_AUDIT_FLASHCARD_DECKS.length} decks, validated cards on A/B chapters only; the existing flashcard model, unchanged)`,
    packs: `PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS: Wave2Pack[] (${PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS.length} packs: no activity passed review, so Audit is flashcards-only for now)`,
  },
  steps: [
    { step: 1, file: 'apps/InteractiveLearning/expansionWave2/__tests__/professionalAudit.test.ts', change: 'Run it against the live curriculum (npx -y tsx <path>). It reads the real module decks after applyReviewHolds. Do not continue if any check fails; re-read the changed source instead. Re-run after any edit to auditAssurance*.tsx or reviewHolds.ts.' },
    { step: 2, file: 'apps/InteractiveLearning/matchSort/types.ts', change: "Widen SourceModuleKey with 'PROFESSIONAL_AUDIT_MODULE01' to 'PROFESSIONAL_AUDIT_MODULE05' (additive). Then Wave2Pack and Wave2Activity can be replaced by MatchSortPack and MatchSortActivity." },
    { step: 3, file: 'apps/InteractiveLearning/practiceReview/sourceDecks.ts', change: 'Add five PRACTICE_SOURCE_MODULES entries: [key, PROFESSIONAL_AUDIT_MODULEnn_DECKS, ..._QUIZZES, ..._TAKEAWAYS] imported from apps/IndustryKnowledge/auditAssuranceModulenn. This is what makes held and moved chapters resolve at runtime.' },
    { step: 4, file: 'apps/InteractiveLearning/flashcards/decks/expansion.ts', change: 'Append ...PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS (never the unfiltered PROFESSIONAL_AUDIT_FLASHCARD_DECKS) to EXPANSION_DECKS, and pin its card IDs. Decks in UNDERSIZED_ELIGIBLE_DECK_IDS need either a curriculum correction or an explicit exception to the 4\u201314 deck-size rule first.' },
    { step: 5, file: 'apps/InteractiveLearning/matchSort/content/expansion.ts', change: 'Append ...PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS (currently empty) to the exported pack list (read its current shape first).' },
    { step: 6, file: 'apps/InteractiveLearning/matchSort/__tests__/sourceMapping.test.ts and flashcards/__tests__/decks.test.ts', change: 'Keep wave-2 decks out of any test that counts chapterMarker occurrences: audit decks list canonical chapters, which outnumber the module file\u2019s source items. The wave-2 test covers them. Confirm the existing suites still pass.' },
    { step: 7, file: 'apps/IndustryKnowledge (lesson identity)', change: "Confirm the reader's industry id for Audit is 'professional-audit' (decks use it as industryId). If not, change the one constant in expansionWave2/kit.ts and in professionalAudit/index.ts." },
    { step: 8, file: 'apps/InteractiveLearning/practiceReview/__tests__/*.test.tsx', change: 'Run the practice review suites. Only after they pass, and Audit is visible in Draft Preview, change its manifest row to Integrated.' },
  ] satisfies IntegrationStep[],
  doNotIntegrateWithout: [
    'The live-curriculum test passing (step 1).',
    'Review holds re-read: the Module 02 chapter held by REV-P0-10 must still be excluded.',
    'Only the ELIGIBLE exports. A chapter is eligible only while chapterIntegrity.ts classifies it A or B; after any curriculum correction, re-classify the chapter and re-review its cards before listing them in VALIDATED_CARD_IDS.',
  ],
  flaggedCardIds: FLAGGED_CARD_IDS,
  flaggedActivityIds: FLAGGED_ACTIVITY_IDS,
  undersizedEligibleDeckIds: UNDERSIZED_ELIGIBLE_DECK_IDS,
  noGlobalChangesMadeByWave2: true,
};
