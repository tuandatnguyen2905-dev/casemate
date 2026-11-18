// Audit & Assurance source-integrity gate against the LIVE curriculum. Every chapter must carry an A/B/C/D
// class that matches the displayed chapter at its position, held chapters must be D, and only validated cards
// on A/B chapters may appear in the ELIGIBLE exports. Needs the app module graph, like professionalAudit.test.ts:
//   npx -y tsx apps/InteractiveLearning/expansionWave2/__tests__/chapterIntegrity.test.ts

import assert from 'node:assert/strict';
import { AUDIT_SOURCES } from '../../../IndustryKnowledge/auditAssuranceCore';
import { PROFESSIONAL_AUDIT_MODULE01_DECKS } from '../../../IndustryKnowledge/auditAssuranceModule01';
import { PROFESSIONAL_AUDIT_MODULE02_DECKS } from '../../../IndustryKnowledge/auditAssuranceModule02';
import { PROFESSIONAL_AUDIT_MODULE03_DECKS } from '../../../IndustryKnowledge/auditAssuranceModule03';
import { PROFESSIONAL_AUDIT_MODULE04_DECKS } from '../../../IndustryKnowledge/auditAssuranceModule04';
import { PROFESSIONAL_AUDIT_MODULE05_DECKS } from '../../../IndustryKnowledge/auditAssuranceModule05';
import { REVIEW_HOLDS, applyReviewHolds } from '../../../IndustryKnowledge/reviewHolds';
import { FLASHCARD_DECKS } from '../../flashcards/decks';
import { MATCH_SORT_PACKS } from '../../matchSort/content';
import { runChecks } from '../checks';
import { liveProvider } from '../liveProvider';
import {
  PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS,
  PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS,
  PROFESSIONAL_AUDIT_FLASHCARD_DECKS,
  PROFESSIONAL_AUDIT_MATCH_SORT_PACKS,
} from '../professionalAudit';
import {
  EXCLUDED_ACTIVITIES, EXCLUDED_CARDS, PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY, VALIDATED_ACTIVITY_IDS, VALIDATED_CARD_IDS, chapterIntegrity, isEligibleChapter,
} from '../professionalAudit/chapterIntegrity';
import { PROFESSIONAL_AUDIT_SOURCE } from '../professionalAudit/source';

const raw: Record<string, Record<string, any[]>> = {
  PROFESSIONAL_AUDIT_MODULE01: PROFESSIONAL_AUDIT_MODULE01_DECKS,
  PROFESSIONAL_AUDIT_MODULE02: PROFESSIONAL_AUDIT_MODULE02_DECKS,
  PROFESSIONAL_AUDIT_MODULE03: PROFESSIONAL_AUDIT_MODULE03_DECKS,
  PROFESSIONAL_AUDIT_MODULE04: PROFESSIONAL_AUDIT_MODULE04_DECKS,
  PROFESSIONAL_AUDIT_MODULE05: PROFESSIONAL_AUDIT_MODULE05_DECKS,
};
const held = Object.fromEntries(Object.entries(raw).map(([key, decks]) => [key, applyReviewHolds(key, decks, {}, {}).decks]));
const stripNumber = (title: unknown) => String(title ?? '').replace(/^\d+\s+/, '');
const chapterNo = (deck: { chapters: Array<{ chapterId: string; number: number }> }, chapterId: string) => deck.chapters.find((item) => item.chapterId === chapterId)?.number ?? 0;

let passed = 0;
const check = (name: string, fn: () => void) => {
  try {
    fn();
    passed += 1;
    console.log(`PASS  ${name}`);
  } catch (error) {
    console.log(`FAIL  ${name}\n      ${(error as Error).message.split('\n').slice(0, 12).join('\n      ')}`);
  }
};
const total = 9;

check('every live chapter has exactly one A/B/C/D classification, at its position, with its displayed title', () => {
  const live = Object.entries(raw).flatMap(([moduleKey, decks]) => Object.entries(decks).flatMap(([lessonTitle, chapters]) => chapters.map((chapter, index) => `${moduleKey}::${lessonTitle}::${index + 1}::${stripNumber(chapter.title)}`)));
  const classified = PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY.map((row) => `${row.moduleKey}::${row.lessonTitle}::${row.chapterNumber}::${row.title}`);
  assert.equal(live.length, 90, 'the live curriculum has 90 chapters');
  assert.deepEqual([...classified].sort(), [...live].sort(), 'classification rows equal the live chapters');
  assert.equal(new Set(classified).size, classified.length, 'no chapter classified twice');
  PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY.forEach((row) => assert.ok(['A', 'B', 'C', 'D'].includes(row.integrity), `${row.title}: class`));
  PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY.filter((row) => row.integrity !== 'A').forEach((row) => assert.ok(row.note.trim(), `${row.title}: B/C/D needs a reason`));
});

check('classification titles agree with the stable source mapping (source.ts)', () => {
  const mapped = PROFESSIONAL_AUDIT_SOURCE.flatMap((module) => module.lessons.flatMap((lesson) => lesson.chapters.map((chapter, index) => `${module.moduleKey}::${lesson.lessonTitle}::${index + 1}::${chapter.title}`)));
  assert.deepEqual(PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY.map((row) => `${row.moduleKey}::${row.lessonTitle}::${row.chapterNumber}::${row.title}`).sort(), mapped.sort());
});

check('every chapter under a review hold is D (Restricted / Unverifiable) and ineligible', () => {
  const heldRows = Object.entries(held).flatMap(([moduleKey, decks]) => Object.entries(decks).flatMap(([lessonTitle, chapters]) => (chapters as any[])
    .map((chapter, index) => ({ moduleKey, lessonTitle, number: index + 1, held: chapter?.reviewStatus === 'Under Review' })).filter((row) => row.held)));
  assert.ok(heldRows.length >= REVIEW_HOLDS.filter((hold) => hold.moduleKey.startsWith('PROFESSIONAL_AUDIT')).length, 'holds resolved');
  heldRows.forEach((row) => {
    assert.equal(chapterIntegrity(row.moduleKey, row.lessonTitle, row.number), 'D', `${row.lessonTitle} ch${row.number}`);
    assert.equal(isEligibleChapter(row.moduleKey, row.lessonTitle, row.number), false);
  });
});

check('every authored card and activity has exactly one review decision (validated or excluded with a reason)', () => {
  const cards = PROFESSIONAL_AUDIT_FLASHCARD_DECKS.flatMap((deck) => deck.cards.map((card) => card.cardId));
  const decided = [...VALIDATED_CARD_IDS, ...Object.keys(EXCLUDED_CARDS)];
  assert.deepEqual([...decided].sort(), [...cards].sort(), 'card decisions cover every card exactly once');
  assert.equal(new Set(decided).size, decided.length, 'no card both validated and excluded');
  Object.entries(EXCLUDED_CARDS).forEach(([id, reason]) => assert.ok(reason.trim(), `${id}: exclusion reason`));
  const activities = PROFESSIONAL_AUDIT_MATCH_SORT_PACKS.flatMap((item) => item.activities.map((activity) => activity.activityId));
  assert.deepEqual([...VALIDATED_ACTIVITY_IDS, ...Object.keys(EXCLUDED_ACTIVITIES)].sort(), [...activities].sort(), 'activity decisions cover every activity exactly once');
});

check('no validated card maps to or cites a C or D chapter', () => {
  const problems: string[] = [];
  PROFESSIONAL_AUDIT_FLASHCARD_DECKS.forEach((deck) => deck.cards.filter((card) => VALIDATED_CARD_IDS.includes(card.cardId)).forEach((card) => {
    new Set([card.chapterId, ...card.sourceRefs.map((ref) => ref.chapterId)]).forEach((chapterId) => {
      const integrity = chapterIntegrity(deck.source.moduleKey, deck.source.lessonTitle, chapterNo(deck, chapterId));
      if (integrity !== 'A' && integrity !== 'B') problems.push(`${card.cardId} -> ${chapterId} (${integrity})`);
    });
  }));
  assert.deepEqual(problems, []);
});

check('ELIGIBLE exports contain exactly the validated cards on A/B chapters, with unchanged IDs (traceability)', () => {
  const eligibleCards = PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.flatMap((deck) => deck.cards.map((card) => card.cardId));
  assert.deepEqual([...eligibleCards].sort(), [...VALIDATED_CARD_IDS].sort(), 'eligible = validated');
  eligibleCards.forEach((id) => assert.ok(!(id in EXCLUDED_CARDS), `${id} is excluded`));
  const source = new Map(PROFESSIONAL_AUDIT_FLASHCARD_DECKS.map((deck) => [deck.deckId, deck]));
  PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.forEach((deck) => {
    const original = source.get(deck.deckId);
    assert.ok(original, `${deck.deckId} keeps its deck ID`);
    deck.cards.forEach((card) => assert.deepEqual(card, original!.cards.find((item) => item.cardId === card.cardId), `${card.cardId} unchanged`));
  });
  assert.deepEqual(PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS.flatMap((item) => item.activities.map((activity) => activity.activityId)).sort(), [...VALIDATED_ACTIVITY_IDS].sort(), 'eligible activities = validated');
  PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS.forEach((item) => item.activities.forEach((activity) => activity.sourceRefs.forEach((ref) => {
    assert.ok(isEligibleChapter(ref.sourceModuleKey, ref.lessonTitle, ref.chapterIndex + 1), `${activity.activityId} cites an ineligible chapter`);
  })));
});

check('fails closed: unknown chapters and unlisted cards are never eligible', () => {
  assert.equal(chapterIntegrity('PROFESSIONAL_AUDIT_MODULE01', 'No Such Lesson', 1), null);
  assert.equal(isEligibleChapter('PROFESSIONAL_AUDIT_MODULE01', 'Industry Definition & Scope', 99), false);
  const anyDeck = PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS[0];
  assert.ok(!PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS.some((deck) => deck.cards.some((card) => card.cardId === `${anyDeck.cards[0].cardId}-unreviewed`)));
});

check('eligible content still passes every wave-2 content check against the live curriculum', () => {
  const provider = liveProvider({ decks: held, sourceTitles: Object.fromEntries(Object.entries(AUDIT_SOURCES).map(([id, item]) => [id, item.title])) });
  const holds = REVIEW_HOLDS.filter((hold) => hold.moduleKey.startsWith('PROFESSIONAL_AUDIT')).map((hold) => ({ id: hold.id, moduleKey: hold.moduleKey, lesson: hold.lesson, chapter: hold.chapter }));
  const reserved = new Set<string>();
  FLASHCARD_DECKS.forEach((deck) => { reserved.add(deck.deckId); deck.cards.forEach((card) => reserved.add(card.cardId)); });
  MATCH_SORT_PACKS.forEach((item) => { reserved.add(item.packId); item.activities.forEach((activity) => reserved.add(activity.activityId)); });
  const failing = runChecks({ decks: PROFESSIONAL_AUDIT_ELIGIBLE_FLASHCARD_DECKS, packs: PROFESSIONAL_AUDIT_ELIGIBLE_MATCH_SORT_PACKS, modules: PROFESSIONAL_AUDIT_SOURCE, provider, holds, reservedIds: reserved })
    .filter((result) => result.problems.length);
  assert.deepEqual(failing.map((result) => `${result.name}: ${result.problems.slice(0, 3).join(' | ')}`), []);
});

check('Audit content is not registered in live Practice & Review', () => {
  assert.ok(!FLASHCARD_DECKS.some((deck) => deck.industryId === 'professional-audit'), 'no Audit deck in the live flashcard registry');
  assert.ok(!MATCH_SORT_PACKS.some((item) => String(item.sourceModuleKey).startsWith('PROFESSIONAL_AUDIT')), 'no Audit pack in the live Match & Sort registry');
});

const counts = ['A', 'B', 'C', 'D'].map((cls) => `${cls} ${PROFESSIONAL_AUDIT_CHAPTER_INTEGRITY.filter((row) => row.integrity === cls).length}`).join(', ');
console.log(`\n${passed}/${total} integrity checks passed. Chapters: ${counts}. Cards eligible ${VALIDATED_CARD_IDS.length}, excluded ${Object.keys(EXCLUDED_CARDS).length}; activities eligible ${VALIDATED_ACTIVITY_IDS.length}, excluded ${Object.keys(EXCLUDED_ACTIVITIES).length}.`);
process.exit(passed === total ? 0 : 1);
