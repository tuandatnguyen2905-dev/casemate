// Self-contained: proves the wave-2 validators accept good content and reject each kind of defect.
// Needs no curriculum files. Run: npx -y tsx apps/InteractiveLearning/expansionWave2/__tests__/validators.test.ts

import assert from 'node:assert/strict';
import { lessonDeck, matching, sequence, sorting } from '../kit';
import { runChecks } from '../checks';
import type { ChapterTextProvider, SourceModule, Wave2Pack } from '../types';

const module: SourceModule = {
  moduleKey: 'TEST_MODULE01', moduleId: 'pa-m9', moduleLabel: 'Module 09 \u00b7 Test', file: 'apps/IndustryKnowledge/test.tsx', readAtSha256: 'abc',
  lessons: [{ lessonTitle: 'Lesson One', lessonId: 'pa-m9-l1', chapters: [{ title: 'First chapter title', alignment: 'aligned' }, { title: 'Held chapter title', alignment: 'held' }, { title: 'Third chapter title', alignment: 'weak' }] }],
};
const text: Record<number, string> = {
  1: 'Alpha stages run in order from first to last.\nBeta is the second idea in the lesson text.\nGamma belongs to the third idea shown here.\nDelta is the fourth idea in the same chapter.',
  2: 'Held text that must never be cited by any card.',
  3: 'Epsilon appears only in the third chapter text.',
};
const provider: ChapterTextProvider = (key, lesson, n) => (key === module.moduleKey && lesson === 'Lesson One' && text[n] ? { title: module.lessons[0].chapters[n - 1].title, text: text[n], sourceIds: ['src'], held: n === 2 } : null);
const holds = [{ id: 'H1', moduleKey: module.moduleKey, lesson: 'Lesson One', chapter: 'Held chapter title' }];

const good = () => [lessonDeck({ module, lessonNo: 1, description: 'Test deck.', cards: [
  ['stages-in-order', 1, 'C', 'In which order do the alpha stages run in this test lesson?', 'From first to last, as the chapter text states it.', 'The text gives an order.', 'A learner reads the stages in the order shown.', ['Alpha'], [[1, 'Alpha stages run in order from first to last.']]],
  ['epsilon-only-third', 3, 'D', 'Where does epsilon appear in the test lesson, compared with beta?', 'Epsilon appears only in the third chapter; beta is in the first.', 'The two are in different chapters.', 'Looking for epsilon means opening the third chapter.', ['Epsilon'], [[3, 'Epsilon appears only in the third chapter text.']]],
] })];
const pack = (activities: any[]): Wave2Pack => ({ packId: 'professional-audit-m9', title: 'Test', industryId: 'professional-audit', moduleId: 'pa-m9', sourceModuleKey: module.moduleKey, contentStatus: 'Draft', contentNotes: [], activities });
const goodActivities = (): any[] => [
  matching({ id: 'match-ideas', ctx: { module, lessonNo: 1 }, sourceIds: ['src'], refs: [[1, ['Beta is the second idea in the lesson text.']]], title: 'Match ideas', objective: 'Match.', summary: 'Done.', promptLabel: 'Idea', answerLabel: 'Place',
    pairs: [['Beta idea', 'Second in the lesson text', 'Beta is second.', 'Think about order.'], ['Gamma idea', 'Third in the same text', 'Gamma is third.', 'Think about position.'], ['Delta idea', 'Fourth in the same chapter', 'Delta is fourth.', 'Think about the end.']] }),
  sorting({ id: 'sort-ideas', ctx: { module, lessonNo: 1 }, sourceIds: ['src'], refs: [[1, ['Gamma belongs to the third idea shown here.']]], title: 'Sort ideas', objective: 'Sort.', summary: 'Done.', categories: [['early', 'Early idea', 'Appears first'], ['late', 'Late idea', 'Appears later']],
    items: [['Alpha stage', 'early', 'Alpha is first.', 'It opens the list.'], ['Beta stage', 'early', 'Beta is second.', 'It follows the opening.'], ['Gamma stage', 'late', 'Gamma is third.', 'It comes after two others.'], ['Delta stage', 'late', 'Delta is fourth.', 'It closes the list.']] }),
  sequence({ id: 'seq-stages', ctx: { module, lessonNo: 1 }, sourceIds: ['src'], refs: [[1, ['Alpha stages run in order from first to last.']]], title: 'Order stages', objective: 'Order.', summary: 'Done.', evidence: 'Alpha stages run in order from first to last.',
    steps: [['Open', 'Opens first.', 'Starts it.'], ['Middle', 'Follows the opening.', 'Sits between.'], ['Close', 'Ends it.', 'Finishes it.']] }),
];
const run = (decks = good(), activities = goodActivities()) => runChecks({ decks, packs: [pack(activities)], modules: [module], provider, holds });
const failing = (results: ReturnType<typeof run>) => results.filter((r) => r.problems.length).flatMap((r) => r.problems);

let passed = 0;
const test = (name: string, fn: () => void) => { fn(); passed += 1; console.log(`PASS  ${name}`); };
const expectProblem = (name: string, mutate: (d: any[], a: any[]) => void, pattern: RegExp) => test(name, () => {
  const decks = JSON.parse(JSON.stringify(good())); const acts = JSON.parse(JSON.stringify(goodActivities()));
  mutate(decks, acts);
  assert.ok(failing(run(decks, acts)).some((p) => pattern.test(p)), `expected a problem matching ${pattern}`);
});

test('clean synthetic content passes every check', () => assert.deepEqual(failing(run()), []));
expectProblem('flashcards: paraphrased excerpt is rejected', (d) => { d[0].cards[0].sourceRefs[0].excerpt = 'Alpha stages run in sequence from start to end.'; }, /not found verbatim/);
expectProblem('flashcards: citing a held chapter is rejected', (d) => { d[0].cards[0].sourceRefs[0].chapterId = 'pa-m9-l1-ch02'; d[0].cards[0].chapterId = 'pa-m9-l1-ch02'; d[0].cards[0].sourceRefs[0].excerpt = 'Held text that must never be cited by any card.'; }, /held/);
expectProblem('flashcards: unsupported figure is rejected', (d) => { d[0].cards[0].back = 'About 35 stages are typical.'; }, /figure "35"/);
expectProblem('flashcards: duplicate prompt is rejected', (d) => { d[0].cards[1].front = d[0].cards[0].front; }, /duplicates/);
expectProblem('flashcards: positional ID is rejected', (d) => { d[0].cards[0].cardId = 'pa-m9-l1-card-1'; }, /positional/);
expectProblem('flashcards: legal citation is rejected', (d) => { d[0].cards[0].explanation = 'Decree 12 requires this.'; }, /legal instrument/);
expectProblem('flashcards: chapter title as prompt is rejected', (d) => { d[0].cards[0].front = 'First chapter title'; }, /chapter title/);
expectProblem('matchsort: answer leaked in a hint is rejected', (_d, a) => { a[0].pairs[0].hint = 'It is Second in the lesson text.'; }, /reveals the answer/);
expectProblem('matchsort: hint naming its category is rejected', (_d, a) => { a[1].items[0].hint = 'This is an early idea.'; }, /names its category/);
expectProblem('matchsort: figure in learner text is rejected', (_d, a) => { a[1].summary = 'Done in 2024.'; }, /unsupported figure/);
expectProblem('matchsort: category used as a sequence step is rejected', (_d, a) => { a[2].items[0].text = 'Retail'; }, /category or alternative/);
expectProblem('matchsort: unquoted grounding is rejected', (_d, a) => { a[0].sourceRefs[0].grounding = 'No quote here'; }, /no quoted evidence/);
expectProblem('matchsort: fabricated quote is rejected', (_d, a) => { a[0].sourceRefs[0].grounding = '\u201cBeta was invented by the author.\u201d'; }, /not found verbatim/);
expectProblem('matchsort: moved chapter index is rejected', (_d, a) => { a[0].sourceRefs[0].chapterIndex = 2; a[0].chapterId = 'x'; }, /not at index|chapter/);
expectProblem('matchsort: sequence presented already solved is rejected', (_d, a) => { a[2].items = [...a[2].items].sort((x: any, y: any) => a[2].correctSequence.indexOf(x.id) - a[2].correctSequence.indexOf(y.id)); }, /already solved/);
expectProblem('matchsort: held chapter citation is rejected', (_d, a) => { a[0].sourceRefs[0].chapterIndex = 1; a[0].sourceRefs[0].chapterTitle = 'Held chapter title'; a[0].chapterId = 'TEST_MODULE01::Lesson One::Held chapter title'; }, /held/);
console.log(`\n${passed} validator tests passed`);
