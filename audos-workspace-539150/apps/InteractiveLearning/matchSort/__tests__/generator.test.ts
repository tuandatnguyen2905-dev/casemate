import { eq, ok, runSuite } from './assert';
import type { TestCase } from './assert';
import {
  ACTIVITY_GUIDELINE, LESSON_REVIEW_KIND, MATCHING_MAX_PAIRS, MATCHING_MIN_PAIRS, SEQUENCE_MAX_STEPS, SEQUENCE_MIN_STEPS, SORTING_MAX_ITEMS, SORTING_MIN_ITEMS,
  activityTier, generateLessonActivities, isLessonSampler, qualityProblems,
} from '../generator';
import { generatedLessonPractice, generatedPracticePack } from '../generatedPractice';
import { initialState, reduceActivity } from '../engine';
import { createMemoryPersistence, createStoragePersistence, MATCH_SORT_STORAGE_KEY, recordAttempt } from '../persistence';
import { validateActivity } from '../validation';
import type { CategorySortingActivity, ConceptMatchingActivity, MatchSortActivity, SequenceBuilderActivity } from '../types';
import {
  AMBIGUOUS_GROUPS_CHAPTER, BANKING_CHAPTER, BANKING_IDENTITY, CHAIN_CHAPTER, COLD_CHAIN_IDENTITY, GROUPS_CHAPTER, HELD_CHAPTER, PARTICIPANTS_CHAPTER, RICH_TERMS_CHAPTER, TEMPLATE_CHAPTER,
} from './generatorFixtures';

// Pure tests for the Match & Sort activity generator (MS-01 … MS-17, MS-21 … MS-23). No DOM and no live curriculum:
// every chapter is a fixture shaped like the reader's decks. Run from the workspace root: npx -y tsx@4 <this file>.

const lesson = (chapters = [RICH_TERMS_CHAPTER, TEMPLATE_CHAPTER, GROUPS_CHAPTER, CHAIN_CHAPTER, PARTICIPANTS_CHAPTER], identity = COLD_CHAIN_IDENTITY) => generateLessonActivities({ identity, chapters });
const forChapter = (activities: MatchSortActivity[], index: number) => activities.filter((activity) => activity.sourceRefs.some((ref) => ref.chapterIndex === index) && activity.objectiveKey !== LESSON_REVIEW_KIND);
const ofKind = <T extends MatchSortActivity>(activities: MatchSortActivity[], kind: string) => activities.find((activity) => activity.objectiveKey === kind) as T | undefined;
const textOf = (chapter: unknown) => JSON.stringify(chapter).toLowerCase();

function solve(activity: MatchSortActivity, wrongFirst = false) {
  let state = initialState(activity);
  if (activity.type === 'concept-matching') {
    const answers = activity.pairs.map((pair) => pair.answerId);
    activity.pairs.forEach((pair, index) => {
      const answerId = wrongFirst && index < 2 ? answers[(index + 1) % 2] : pair.answerId;
      state = reduceActivity(activity, state, { type: 'pair', promptId: pair.promptId, answerId });
    });
  } else if (activity.type === 'category-sorting') {
    activity.items.forEach((item, index) => {
      const categoryId = wrongFirst && index === 0 ? activity.categories.find((category) => category.id !== item.categoryId)!.id : item.categoryId;
      state = reduceActivity(activity, state, { type: 'place', itemId: item.id, categoryId });
    });
  } else if (!wrongFirst) {
    activity.correctSequence.forEach((id, index) => { state = reduceActivity(activity, state, { type: 'move-step', id, toIndex: index }); });
  }
  return reduceActivity(activity, state, { type: 'check' });
}

const cases: TestCase[] = [
  { name: 'MS-01 a chapter with specific key terms gets one grounded Concept Matching activity (4–8 pairs) with explanations', run: () => {
    const { activities } = lesson();
    const matching = ofKind<ConceptMatchingActivity>(forChapter(activities, 0), 'key-terms');
    ok(matching, 'key-term matching generated');
    ok(matching.pairs.length >= MATCHING_MIN_PAIRS && matching.pairs.length <= MATCHING_MAX_PAIRS, 'pair count within 4–8');
    const source = textOf(RICH_TERMS_CHAPTER);
    [...matching.items.prompts, ...matching.items.answers].forEach((item) => ok(source.includes(item.text.toLowerCase().replace(/\.$/, '')), `grounded: ${item.text}`));
    matching.pairs.forEach((pair) => ok(pair.explanation && pair.hint, 'explanation and hint present'));
    eq(validateActivity(matching), [], 'passes validateActivity');
    eq(matching.origin, 'generated', 'marked generated');
  } },
  { name: 'MS-02 a template-only chapter gets no activity and is flagged for enrichment, not filled', run: () => {
    const { activities, chapters } = lesson();
    eq(forChapter(activities, 1).length, 0, 'no chapter activity');
    ok(chapters[1].enrichment && /template definition/.test(chapters[1].enrichment), `enrichment reason names template definitions: ${chapters[1].enrichment}`);
  } },
  { name: 'MS-03 explicit groups give one Category Sorting activity (2–4 groups, 6–12 items)', run: () => {
    const sorting = ofKind<CategorySortingActivity>(forChapter(lesson().activities, 2), 'concept-groups');
    ok(sorting, 'sorting generated');
    ok(sorting.categories.length >= 2 && sorting.categories.length <= 4, 'group count');
    ok(sorting.items.length >= SORTING_MIN_ITEMS && sorting.items.length <= SORTING_MAX_ITEMS, 'item count');
    eq(sorting.categories.map((category) => category.label), ['Key strengths', 'Key weaknesses'], 'groups are the chapter\'s own headings');
    eq(qualityProblems(sorting), [], 'no ambiguous items');
  } },
  { name: 'MS-04 an item listed under two groups is removed, and too few unambiguous items means no sorting', run: () => {
    const { activities, chapters } = lesson([AMBIGUOUS_GROUPS_CHAPTER]);
    eq(activities.filter((activity) => activity.type === 'category-sorting').length, 0, 'no sorting from ambiguous groups');
    ok(chapters[0].rejected.some((item) => item.kind === 'concept-groups'), 'rejection recorded');
  } },
  { name: 'MS-05 an explicit arrow chain gives a Sequence Builder (4–7 stages) with a per-stage explanation', run: () => {
    const sequence = ofKind<SequenceBuilderActivity>(forChapter(lesson().activities, 3), 'process-steps');
    ok(sequence, 'sequence generated');
    ok(sequence.items.length >= SEQUENCE_MIN_STEPS && sequence.items.length <= SEQUENCE_MAX_STEPS, 'stage count');
    eq(sequence.items.map((step) => step.text), ['Raw milk', 'Collection centres', 'Processing plants', 'Distribution centres', 'Retail outlets'], 'stages in source order');
    sequence.items.forEach((step) => ok(step.explanation.length > 10, 'stage explanation'));
    ok(!sequence.sequenceEvidence.includes('\u2192'), 'evidence does not print the answer');
  } },
  { name: 'MS-06 a list of participants is never turned into a sequence', run: () => {
    const { activities, chapters } = lesson();
    eq(forChapter(activities, 4).filter((activity) => activity.type === 'sequence-builder').length, 0, 'no sequence for participants');
    ok(chapters[4].rejected.some((item) => item.kind === 'process-steps' && /no explicit ordered process/.test(item.reason)), 'reason recorded');
  } },
  { name: 'MS-07 matching validation rejects duplicate mappings, empty labels, overlapping meanings, figures and too few pairs', run: () => {
    const duplicated = { ...RICH_TERMS_CHAPTER, keyTerms: [
      { term: 'Cold chain', definition: 'The temperature-controlled sequence of storage and transport that keeps chilled goods safe.' },
      { term: 'Cold chain', definition: 'Another meaning for the same term that should never be paired twice.' },
      { term: '', definition: 'A definition with no term to match it against at all.' },
      { term: 'Chilled logistics', definition: 'The temperature-controlled sequence of storage and transport that keeps chilled goods safe.' },
      { term: 'Market size', definition: 'The market reached VND 63 trillion in 2024 according to one estimate.' },
    ] };
    const { chapters, activities } = lesson([duplicated]);
    const matching = ofKind<ConceptMatchingActivity>(activities, 'key-terms');
    const reasons = chapters[0].rejected.find((item) => item.kind === 'key-terms')?.reason ?? '';
    ok(!matching || matching.items.prompts.filter((item) => item.text === 'Cold chain').length <= 1, 'a term is never paired twice');
    ok(!matching, `too few valid pairs remain, so no matching (${reasons})`);
    ok(/needs 4/.test(reasons), 'reason names the minimum');
  } },
  { name: 'MS-08 sorting validation: unknown category, hint naming the category and too few items are rejected', run: () => {
    const sorting = ofKind<CategorySortingActivity>(lesson().activities, 'concept-groups')!;
    const broken: CategorySortingActivity = { ...sorting, items: sorting.items.map((item, index) => (index === 0 ? { ...item, categoryId: 'missing' } : index === 1 ? { ...item, hint: `It belongs in ${sorting.categories[0].label}.`, categoryId: sorting.categories[0].id } : item)) };
    const problems = validateActivity(broken);
    ok(problems.some((problem) => /unknown category/.test(problem)), 'unknown category caught');
    ok(problems.some((problem) => /hint names its category/.test(problem)), 'revealing hint caught');
    ok(validateActivity({ ...sorting, items: sorting.items.slice(0, 3) }).some((problem) => /at least 4 items/.test(problem)), 'too few items caught');
  } },
  { name: 'MS-09 sequence validation: a repeated stage or a non-permutation answer key is invalid', run: () => {
    const sequence = ofKind<SequenceBuilderActivity>(lesson().activities, 'process-steps')!;
    ok(validateActivity({ ...sequence, correctSequence: [...sequence.correctSequence.slice(1), sequence.correctSequence[1]] }).some((problem) => /permutation/.test(problem)), 'non-permutation caught');
    ok(qualityProblems({ ...sequence, items: sequence.items.map((step, index) => (index === 1 ? { ...step, text: sequence.items[0].text } : step)) }).some((problem) => /duplicate step/.test(problem)), 'repeated stage caught');
  } },
  { name: 'MS-10 activities per chapter follow the guideline (introductory 1, standard 2, complex 3) and each tests a distinct objective', run: () => {
    const { activities, chapters } = lesson();
    chapters.forEach((report) => {
      const own = forChapter(activities, report.chapterIndex);
      ok(own.length <= ACTIVITY_GUIDELINE[report.tier], `chapter ${report.chapterIndex + 1}: ${own.length} ≤ ${ACTIVITY_GUIDELINE[report.tier]} (${report.tier})`);
      eq(new Set(own.map((activity) => activity.objectiveKey)).size, own.length, 'one activity per objective');
    });
    eq([activityTier(3), activityTier(9), activityTier(20)], ['introductory', 'standard', 'complex'], 'tiers');
  } },
  { name: 'MS-11 IDs are deterministic, survive chapter renumbering, differ across curricula and change only with the answer key', run: () => {
    const first = lesson().activities.map((activity) => activity.activityId);
    eq(lesson().activities.map((activity) => activity.activityId), first, 'same content, same IDs');
    const renumbered = lesson([{ ...RICH_TERMS_CHAPTER, title: 'How Cold Chains Protect Chilled Food' }]).activities.map((activity) => activity.activityId);
    ok(renumbered.includes(first[0]), 'removing the "01" prefix keeps the ID');
    const other = generateLessonActivities({ identity: 'logistics-other::How the Industry Works::Cold Chain Basics', chapters: [RICH_TERMS_CHAPTER] }).activities.map((activity) => activity.activityId);
    ok(!other.includes(first[0]), 'another curriculum never shares an ID');
    const edited = lesson([{ ...RICH_TERMS_CHAPTER, keyTerms: RICH_TERMS_CHAPTER.keyTerms!.map((entry, index) => (index === 0 ? { ...entry, definition: 'The linked, temperature-controlled storage and transport steps for chilled goods.' } : entry)) } as never]).activities;
    ok(!edited.some((activity) => activity.activityId === first[0]), 'a changed answer key gets a new ID, so old history never points at a different activity');
    ok(first.every((id) => id.startsWith('ms-gen-logistics-coldchain-')), 'readable, curriculum-scoped prefix');
    eq(new Set(first).size, first.length, 'unique IDs');
  } },
  { name: 'MS-12 a curated lesson keeps exactly its authored activities; a lesson-wide sampler does not block chapter practice but its terms are not repeated', run: () => {
    const generated = lesson([RICH_TERMS_CHAPTER, CHAIN_CHAPTER]).activities;
    const authoredChapter = { ...ofKind<ConceptMatchingActivity>(generated, 'key-terms')!, activityId: 'authored-cold-chain', origin: undefined, objectiveKey: undefined };
    const withAuthored = generateLessonActivities({ identity: COLD_CHAIN_IDENTITY, chapters: [RICH_TERMS_CHAPTER, CHAIN_CHAPTER], authored: [authoredChapter] });
    eq(withAuthored.activities.length, 0, 'nothing generated in a curated lesson, so its counts and order never change');
    eq(withAuthored.chapters[0].authored, 1, 'authored counted');
    ok(/curated lesson/.test(withAuthored.chapters[1].enrichment ?? ''), 'the uncovered chapter is reported for authoring');
    const sampler: ConceptMatchingActivity = {
      ...authoredChapter, activityId: 'authored-sampler',
      items: { prompts: [{ id: 't1', text: 'Cold chain' }, { id: 't2', text: 'Raw milk' }, { id: 't3', text: 'Farmers' }], answers: [{ id: 'd1', text: 'a' }, { id: 'd2', text: 'b' }, { id: 'd3', text: 'c' }] },
      pairs: [1, 2, 3].map((n) => ({ id: `p${n}`, promptId: `t${n}`, answerId: `d${n}`, explanation: 'x', hint: 'y' })),
      sourceRefs: [0, 1, 2].map((chapterIndex) => ({ ...authoredChapter.sourceRefs[0], chapterIndex })),
    };
    ok(isLessonSampler(sampler), 'one pair per chapter across three chapters is a sampler');
    const sampled = generateLessonActivities({ identity: COLD_CHAIN_IDENTITY, chapters: [RICH_TERMS_CHAPTER, CHAIN_CHAPTER, PARTICIPANTS_CHAPTER], authored: [sampler] });
    const matching = ofKind<ConceptMatchingActivity>(forChapter(sampled.activities, 0), 'key-terms');
    ok(matching, 'sampler does not block chapter practice');
    ok(!matching.items.prompts.some((item) => item.text === 'Cold chain'), 'the sampler\'s term is not repeated');
    eq(sampled.activities.filter((activity) => activity.objectiveKey === LESSON_REVIEW_KIND).length, 0, 'no generated lesson review beside an authored sampler');
  } },
  { name: 'MS-13 a held chapter is never practised', run: () => {
    const { activities, chapters } = lesson([HELD_CHAPTER, CHAIN_CHAPTER]);
    eq(forChapter(activities, 0).length, 0, 'held chapter has no activity');
    ok(chapters[0].held && !chapters[0].enrichment, 'held, not flagged for enrichment');
    ok(!activities.some((activity) => activity.sourceRefs.some((ref) => ref.chapterIndex === 0)), 'no lesson review cites it either');
  } },
  { name: 'MS-14 retry keeps correct answers locked and the next fully correct check completes the activity once', run: () => {
    const matching = ofKind<ConceptMatchingActivity>(lesson().activities, 'key-terms')!;
    let state = solve(matching, true);
    ok(state.result && !state.result.allCorrect, 'first check has mistakes');
    let progress = recordAttempt({}, matching.activityId, { at: 't1', correct: state.result!.correct, total: state.result!.total, allCorrect: false, revealed: false });
    ok(!progress[matching.activityId].completedAt, 'not completed after a wrong check');
    state = reduceActivity(matching, state, { type: 'retry' });
    eq(state.phase, 'working', 'back to working');
    matching.pairs.forEach((pair) => { state = reduceActivity(matching, state, { type: 'pair', promptId: pair.promptId, answerId: pair.answerId }); });
    state = reduceActivity(matching, state, { type: 'check' });
    ok(state.result?.allCorrect, 'all correct after retry');
    progress = recordAttempt(progress, matching.activityId, { at: 't2', correct: state.result!.correct, total: state.result!.total, allCorrect: true, revealed: false });
    eq(progress[matching.activityId].completedAt, 't2', 'completed on the correct check');
    progress = recordAttempt(progress, matching.activityId, { at: 't3', correct: state.result!.total, total: state.result!.total, allCorrect: true, revealed: false });
    eq(progress[matching.activityId].completedAt, 't2', 'completion time never moves');
  } },
  { name: 'MS-15 revealing answers never counts as completion', run: () => {
    const sorting = ofKind<CategorySortingActivity>(lesson().activities, 'concept-groups')!;
    let state = solve(sorting, true);
    state = reduceActivity(sorting, state, { type: 'reveal' });
    ok(state.result?.revealed, 'revealed');
    const progress = recordAttempt({}, sorting.activityId, { at: 't1', correct: state.result!.correct, total: state.result!.total, allCorrect: true, revealed: true });
    ok(!progress[sorting.activityId].completedAt && progress[sorting.activityId].revealedAt, 'revealed, not completed');
  } },
  { name: 'MS-16 reopening restores saved completion because rebuilding (with or without the cache) yields the same IDs', run: () => {
    const deck = [RICH_TERMS_CHAPTER, GROUPS_CHAPTER];
    const store = createMemoryPersistence();
    const first = generatedLessonPractice(COLD_CHAIN_IDENTITY, deck).activities[0];
    store.save(recordAttempt(store.load(), first.activityId, { at: 't1', correct: 1, total: 1, allCorrect: true, revealed: false }));
    const cached = generatedLessonPractice(COLD_CHAIN_IDENTITY, deck);
    const rebuilt = generatedLessonPractice(COLD_CHAIN_IDENTITY, [...deck]);
    ok(cached === generatedLessonPractice(COLD_CHAIN_IDENTITY, deck), 'cached per deck');
    eq(rebuilt.activities.map((activity) => activity.activityId), cached.activities.map((activity) => activity.activityId), 'a fresh deck array gives the same IDs');
    ok(store.load()[rebuilt.activities[0].activityId]?.completedAt, 'saved completion found after reopening');
    const pack = generatedPracticePack(COLD_CHAIN_IDENTITY, rebuilt.activities);
    eq(pack.sourceModuleKey, 'READER_GENERATED', 'generated pack');
    ok(pack.activities.every((activity) => activity.industryId === 'logistics-coldchain'), 'pack activities keep their industry');
  } },
  { name: 'MS-17 practice history is written only under the Match & Sort key, never to Knowledge Check, reader or lesson-progress records', run: () => {
    const written: string[] = [];
    const storage = { data: new Map<string, string>(), getItem(key: string) { return this.data.get(key) ?? null; }, setItem(key: string, value: string) { written.push(key); this.data.set(key, value); } };
    const store = createStoragePersistence(storage, `${MATCH_SORT_STORAGE_KEY}:learner`);
    const activity = lesson().activities[0];
    store.save(recordAttempt(store.load(), activity.activityId, { at: 't1', correct: 1, total: 1, allCorrect: true, revealed: false }));
    eq(written, [`${MATCH_SORT_STORAGE_KEY}:learner`], 'only the practice key');
    ok(!written.some((key) => /casemate:domain-/.test(key)), 'no domain-quiz, domain-reader or lesson-progress write');
  } },
  { name: 'MS-21 nothing crosses curricula: every generated text comes from its own chapter and carries its own industry', run: () => {
    const cold = lesson().activities;
    const banking = generateLessonActivities({ identity: BANKING_IDENTITY, chapters: [BANKING_CHAPTER] }).activities;
    ok(banking.length > 0 && cold.length > 0, 'both generated');
    const bankingTerms = (BANKING_CHAPTER.keyTerms ?? []).map((entry) => entry.term.toLowerCase());
    ok(!JSON.stringify(cold).toLowerCase().includes(bankingTerms[0]), 'no banking term in the cold-chain activities');
    ok(banking.every((activity) => activity.industryId === 'banking-demo' && activity.activityId.startsWith('ms-gen-banking-demo-')), 'banking activities carry banking IDs');
    ok(cold.every((activity) => activity.industryId === 'logistics-coldchain'), 'cold-chain activities carry their own industry');
  } },
  { name: 'MS-22 generation never depends on Knowledge Check data: a chapter without questions gets the same activities', run: () => {
    const withQuiz = lesson([{ ...RICH_TERMS_CHAPTER, quizQuestions: [{ id: 'q1' }] } as never]).activities.map((activity) => activity.activityId);
    const without = lesson([RICH_TERMS_CHAPTER]).activities.map((activity) => activity.activityId);
    eq(withQuiz, without, 'same activities with or without a Knowledge Check');
  } },
  { name: 'MS-23 large collections: a 300-chapter lesson generates quickly and stays within the guideline', run: () => {
    const chapters = Array.from({ length: 300 }, (_, index) => ({
      ...RICH_TERMS_CHAPTER,
      title: `${String(index + 1).padStart(2, '0')} Cold chain topic ${String.fromCharCode(65 + (index % 26))}${String.fromCharCode(65 + Math.floor(index / 26) % 26)}`,
      keyInsight: `Handover point ${String.fromCharCode(97 + (index % 26))} decides whether the batch keeps its band in this topic.`,
      keyTerms: RICH_TERMS_CHAPTER.keyTerms!.map((entry) => ({ term: `${entry.term} ${String.fromCharCode(65 + (index % 26))}${String.fromCharCode(65 + Math.floor(index / 26) % 26)}`, definition: `${entry.definition.replace(/\.$/, '')} in setting ${String.fromCharCode(97 + (index % 26))}${String.fromCharCode(97 + Math.floor(index / 26) % 26)}.` })),
    })) as never[];
    const started = Date.now();
    const { activities, chapters: reports } = generateLessonActivities({ identity: COLD_CHAIN_IDENTITY, chapters });
    const elapsed = Date.now() - started;
    ok(activities.length >= 300, `every chapter practised (${activities.length} activities)`);
    ok(elapsed < 5000, `generated in ${elapsed} ms`);
    ok(reports.every((report) => forChapter(activities, report.chapterIndex).length <= ACTIVITY_GUIDELINE[report.tier]), 'guideline held');
    eq(new Set(activities.map((activity) => activity.activityId)).size, activities.length, 'IDs unique at scale');
    ok(activities.every((activity) => !validateActivity(activity).length && !qualityProblems(activity).length), 'every activity valid');
  } },
];

export const runGeneratorTests = () => runSuite('Match & Sort generator', cases);
Promise.resolve(runGeneratorTests()).catch((error) => { console.error(error.message); throw error; });
