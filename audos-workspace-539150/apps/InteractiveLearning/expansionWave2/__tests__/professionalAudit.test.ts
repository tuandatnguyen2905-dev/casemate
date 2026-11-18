// Audit & Assurance wave-2 content against the LIVE curriculum (apps/IndustryKnowledge). Needs the
// app module graph (React, the fashion visual kit), like practiceReview/__tests__. Run:
//   npx -y tsx apps/InteractiveLearning/expansionWave2/__tests__/professionalAudit.test.ts
// Re-run it whenever any auditAssurance*.tsx or reviewHolds.ts changes: the excerpts, chapter titles and
// positions recorded here are only valid for the curriculum text they were read from.

import assert from 'node:assert/strict';
import { AUDIT_SOURCES } from '../../../IndustryKnowledge/auditAssuranceCore';
import { PROFESSIONAL_AUDIT_MODULE01_DECKS, PROFESSIONAL_AUDIT_MODULE01_QUIZZES, PROFESSIONAL_AUDIT_MODULE01_TAKEAWAYS } from '../../../IndustryKnowledge/auditAssuranceModule01';
import { PROFESSIONAL_AUDIT_MODULE02_DECKS, PROFESSIONAL_AUDIT_MODULE02_QUIZZES, PROFESSIONAL_AUDIT_MODULE02_TAKEAWAYS } from '../../../IndustryKnowledge/auditAssuranceModule02';
import { PROFESSIONAL_AUDIT_MODULE03_DECKS, PROFESSIONAL_AUDIT_MODULE03_QUIZZES, PROFESSIONAL_AUDIT_MODULE03_TAKEAWAYS } from '../../../IndustryKnowledge/auditAssuranceModule03';
import { PROFESSIONAL_AUDIT_MODULE04_DECKS, PROFESSIONAL_AUDIT_MODULE04_QUIZZES, PROFESSIONAL_AUDIT_MODULE04_TAKEAWAYS } from '../../../IndustryKnowledge/auditAssuranceModule04';
import { PROFESSIONAL_AUDIT_MODULE05_DECKS, PROFESSIONAL_AUDIT_MODULE05_QUIZZES, PROFESSIONAL_AUDIT_MODULE05_TAKEAWAYS } from '../../../IndustryKnowledge/auditAssuranceModule05';
import { REVIEW_HOLDS, applyReviewHolds } from '../../../IndustryKnowledge/reviewHolds';
import { FLASHCARD_DECKS, validateDeck } from '../../flashcards/decks';
import { MATCH_SORT_PACKS } from '../../matchSort/content';
import { runChecks } from '../checks';
import { liveProvider } from '../liveProvider';
import { PROFESSIONAL_AUDIT_FLASHCARD_DECKS, PROFESSIONAL_AUDIT_MATCH_SORT_PACKS } from '../professionalAudit';
import { PROFESSIONAL_AUDIT_SOURCE } from '../professionalAudit/source';
import { deckStructureProblems } from '../validators';

const raw: Record<string, [Record<string, any[]>, Record<string, any[]>, Record<string, unknown>]> = {
  PROFESSIONAL_AUDIT_MODULE01: [PROFESSIONAL_AUDIT_MODULE01_DECKS, PROFESSIONAL_AUDIT_MODULE01_QUIZZES, PROFESSIONAL_AUDIT_MODULE01_TAKEAWAYS],
  PROFESSIONAL_AUDIT_MODULE02: [PROFESSIONAL_AUDIT_MODULE02_DECKS, PROFESSIONAL_AUDIT_MODULE02_QUIZZES, PROFESSIONAL_AUDIT_MODULE02_TAKEAWAYS],
  PROFESSIONAL_AUDIT_MODULE03: [PROFESSIONAL_AUDIT_MODULE03_DECKS, PROFESSIONAL_AUDIT_MODULE03_QUIZZES, PROFESSIONAL_AUDIT_MODULE03_TAKEAWAYS],
  PROFESSIONAL_AUDIT_MODULE04: [PROFESSIONAL_AUDIT_MODULE04_DECKS, PROFESSIONAL_AUDIT_MODULE04_QUIZZES, PROFESSIONAL_AUDIT_MODULE04_TAKEAWAYS],
  PROFESSIONAL_AUDIT_MODULE05: [PROFESSIONAL_AUDIT_MODULE05_DECKS, PROFESSIONAL_AUDIT_MODULE05_QUIZZES, PROFESSIONAL_AUDIT_MODULE05_TAKEAWAYS],
};
const held = Object.fromEntries(Object.entries(raw).map(([key, [decks, quizzes, takeaways]]) => [key, applyReviewHolds(key, decks, quizzes, takeaways).decks]));
const holds = REVIEW_HOLDS.filter((hold) => hold.moduleKey.startsWith('PROFESSIONAL_AUDIT')).map((hold) => ({ id: hold.id, moduleKey: hold.moduleKey, lesson: hold.lesson, chapter: hold.chapter }));
const provider = liveProvider({ decks: held, sourceTitles: Object.fromEntries(Object.entries(AUDIT_SOURCES).map(([id, source]) => [id, source.title])) });

const reserved = new Set<string>();
FLASHCARD_DECKS.forEach((deck) => { reserved.add(deck.deckId); deck.cards.forEach((card) => reserved.add(card.cardId)); });
MATCH_SORT_PACKS.forEach((pack) => { reserved.add(pack.packId); pack.activities.forEach((activity) => reserved.add(activity.activityId)); });

const results = runChecks({ decks: PROFESSIONAL_AUDIT_FLASHCARD_DECKS, packs: PROFESSIONAL_AUDIT_MATCH_SORT_PACKS, modules: PROFESSIONAL_AUDIT_SOURCE, provider, holds, reservedIds: reserved });
let failed = 0;
for (const result of results) {
  console.log(`${result.problems.length ? 'FAIL' : 'PASS'}  ${result.name}`);
  result.problems.slice(0, 20).forEach((problem) => console.log(`      - ${problem}`));
  if (result.problems.length) failed += 1;
}

// The mirrored structural validator must agree with the engine's own validateDeck on every wave-2 deck.
PROFESSIONAL_AUDIT_FLASHCARD_DECKS.forEach((deck) => assert.deepEqual(deckStructureProblems(deck), validateDeck(deck), `${deck.deckId}: mirror differs from validateDeck`));
console.log('PASS  mirrored deck validator equals the engine validateDeck on every deck');

assert.ok(holds.length >= 1, 'the live registry should still hold the Module 02 chapter (REV-P0-10)');
console.log(`\n${results.length - failed}/${results.length} checks passed against the live curriculum; ${holds.length} hold(s) read from reviewHolds.ts`);
process.exit(failed ? 1 : 0);
