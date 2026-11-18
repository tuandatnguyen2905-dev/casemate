import { MATCH_SORT_PACKS, activitiesForChapter, activityById, allActivities } from '../content';
import { answerDisplayOrder, initialSequence, itemDisplayOrder } from '../engine';
import { NON_SEQUENTIAL_LABELS, chapterIdOf, resolveAvailableActivities, validateActivity, validatePacks } from '../validation';
import type { SourceDecks } from '../validation';
import type { CategorySortingActivity, ConceptMatchingActivity, MatchSortActivity, SequenceBuilderActivity } from '../types';
import { eq, ok, runSuite } from './assert';
import { EXPANSION_ACTIVITY_IDS, RETIRED_ACTIVITY_IDS } from './expansionPins';

/**
 * Chapter titles as read from the source files on 2026-11-07 (commercialBankingM01B1/B2.tsx,
 * consumerFinanceModule01.tsx). sourceMapping.test.ts checks the same references against the
 * live deck registries.
 */
const SOURCE_TITLES: Record<string, Record<string, string[]>> = {
  COMMERCIAL_BANKING_MODULE01: {
    '1.1 Industry Definition & Scope': ['What Is Commercial Banking?', 'What Makes Commercial Banking Unique?', 'Where Does Commercial Banking Begin and End?', 'Understanding Banking Products and Services', "Who Are Commercial Banks' Customers?"],
    '1.3 Global Market Overview': ['Understanding the Global Banking Industry', 'Global Banking Assets, Credit, and Deposits', 'How Global Banks Measure Performance', 'Major Global Banking Markets and Institutions', 'International Banking and Financial Stability'],
  },
  CONSUMER_FINANCE_MODULE01: {
    'Industry Definition & Scope': ['What Is Consumer Finance?', 'What Makes Consumer Finance Unique?', 'Where Does Consumer Finance Begin and End?', 'Understanding Consumer Finance Products and Services', 'Who Uses Consumer Finance and Why?'],
    'Industry History & Development': ['How Did Modern Consumer Credit Emerge?', 'How Did Standardisation and Credit Information Change Lending?', 'How Did Cards and Revolving Credit Expand Choice?', 'How Is Digitalisation Transforming Consumer Finance?'],
    'Industry Drivers & External Factors': ['How Do Household Economics Affect Consumer Finance?', 'How Do Interest Rates and Funding Conditions Flow Through?', 'How Does Regulation Shape the Industry?', 'How Do Technology, Data and Cyber Risk Change Decisions?', 'What Does Responsible Lending Require End to End?'],
  },
};

const decksFrom = (titles: Record<string, Record<string, string[]>>): SourceDecks => Object.fromEntries(Object.entries(titles)
  .map(([module, lessons]) => [module, Object.fromEntries(Object.entries(lessons).map(([lesson, chapters]) => [lesson, chapters.map((title) => ({ title }))]))]));

const EXPECTED_IDS = [
  'cb-m01-match-banking-mechanics', 'cb-m01-match-products-needs', 'cb-m01-sort-balance-sheet', 'cb-m01-sort-customer-segments', 'cb-m01-seq-loan-lifecycle',
  'cf-m01-match-terminology', 'cf-m01-sort-instalment-revolving', 'cf-m01-sort-repayment-capacity', 'cf-m01-seq-credit-lifecycle',
];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

/** The nine activities that shipped first. Their IDs, content and checks below never change. */
const originalActivities = () => allActivities().filter((activity) => EXPECTED_IDS.includes(activity.activityId));

export const contentCases = [
  { name: 'every pack validates with no issues', run: () => eq(validatePacks(MATCH_SORT_PACKS), [], 'content issues') },
  { name: 'original packs first and unchanged: 6–9 activities, every type in every pack, stable IDs', run: () => {
    eq(MATCH_SORT_PACKS.slice(0, 2).map((pack) => pack.packId), ['commercial-banking-m01', 'consumer-finance-m01'], 'original pack IDs stay first');
    eq(allActivities().slice(0, EXPECTED_IDS.length).map((activity) => activity.activityId), EXPECTED_IDS, 'original activity IDs are stable');
    const total = MATCH_SORT_PACKS.slice(0, 2).flatMap((pack) => pack.activities).length;
    ok(total >= 6 && total <= 9, `original activity count ${total}`);
    MATCH_SORT_PACKS.slice(0, 2).forEach((pack) => (['concept-matching', 'category-sorting', 'sequence-builder'] as const).forEach((type) => ok(pack.activities.some((activity) => activity.type === type), `${pack.packId} has ${type}`)));
  } },
  { name: 'chapter mappings resolve against the source chapter titles and positions', run: () => {
    const { available, unavailable } = resolveAvailableActivities(originalActivities(), decksFrom(SOURCE_TITLES));
    eq(unavailable, [], 'unresolved chapter references');
    eq(available.length, EXPECTED_IDS.length, 'all activities available');
    allActivities().forEach((activity) => {
      eq(activity.chapterId, chapterIdOf(activity.sourceRefs[0]), `${activity.activityId} chapterId`);
      ok(activitiesForChapter(activity.chapterId).includes(activity), `${activity.activityId} is found by its chapter`);
    });
  } },
  { name: 'answer keys are complete one-to-one mappings with explanations', run: () => {
    allActivities().forEach((activity) => {
      if (activity.type === 'concept-matching') {
        eq(new Set(activity.pairs.map((pair) => pair.promptId)).size, activity.items.prompts.length, `${activity.activityId} prompts covered`);
        eq(new Set(activity.pairs.map((pair) => pair.answerId)).size, activity.items.answers.length, `${activity.activityId} answers covered`);
        activity.pairs.forEach((pair) => ok(pair.explanation.length > 40 && pair.hint.length > 20, `${pair.id} has explanation and hint`));
      } else if (activity.type === 'category-sorting') {
        activity.items.forEach((item) => ok(activity.categories.some((category) => category.id === item.categoryId) && item.explanation.length > 30, `${item.id} has a valid key and explanation`));
      } else {
        eq([...activity.correctSequence].sort(), activity.items.map((step) => step.id).sort(), `${activity.activityId} sequence key`);
        activity.items.forEach((step) => ok(step.explanation.length > 30, `${step.id} explains its dependency`));
      }
      ok(activity.summary.length > 40, `${activity.activityId} has a summary`);
      activity.sourceRefs.forEach((ref) => ok(ref.sourceIds.length > 0 && ref.grounding.length > 20, `${activity.activityId} source reference is grounded`));
    });
  } },
  { name: 'no false sequential relationships', run: () => {
    const sequences = allActivities().filter((activity): activity is SequenceBuilderActivity => activity.type === 'sequence-builder');
    ok(MATCH_SORT_PACKS.slice(0, 2).every((pack) => pack.activities.some((activity) => activity.type === 'sequence-builder')), 'a sequence in each original pack');
    ok(sequences.length >= 2, 'sequence activities exist');
    sequences.forEach((activity) => {
      ok(activity.isSequentialProcess === true && activity.sequenceEvidence.length > 80, `${activity.activityId} documents why it is sequential`);
      activity.items.forEach((step) => ok(!NON_SEQUENTIAL_LABELS.includes(step.text.toLowerCase()), `${step.id} is a stage, not a category`));
    });
    const productTypes = ['instalment', 'revolving', 'retail', 'sme', 'corporate'];
    allActivities().filter((activity): activity is CategorySortingActivity => activity.type === 'category-sorting')
      .forEach((activity) => activity.categories.forEach((category) => ok(!sequences.some((sequence) => sequence.items.some((step) => step.id === category.id)), `${category.id} is never a sequence step`)));
    ok(productTypes.every((type) => allActivities().some((activity) => activity.type === 'category-sorting' && activity.categories.some((category) => category.id === type))), 'products and segments are modelled as categories');
  } },
  { name: 'answers are not revealed before submit', run: () => {
    allActivities().forEach((activity) => {
      if (activity.type === 'concept-matching') {
        const order = answerDisplayOrder(activity);
        activity.items.prompts.forEach((prompt, index) => ok(activity.pairs.find((pair) => pair.promptId === prompt.id)!.answerId !== order[index], `${activity.activityId} ${prompt.id} not aligned`));
      } else if (activity.type === 'category-sorting') {
        ok(itemDisplayOrder(activity).join() !== activity.items.map((item) => item.id).join(), `${activity.activityId} tray is shuffled`);
      } else {
        initialSequence(activity).forEach((id, index) => ok(id !== activity.correctSequence[index], `${activity.activityId} ${id} not in place`));
      }
    });
  } },
  { name: 'validator rejects duplicates, leaked answers, false sequences, figures and gaps', run: () => {
    const match = clone(activityById('cf-m01-match-terminology')) as ConceptMatchingActivity;
    match.items.answers[1].id = match.items.answers[0].id;
    ok(validateActivity(match).some((problem) => problem.startsWith('duplicate ID')), 'duplicate item IDs');
    const leak = clone(activityById('cf-m01-match-terminology')) as ConceptMatchingActivity;
    leak.pairs[0].hint = `It means: ${leak.items.answers[0].text}`;
    ok(validateActivity(leak).some((problem) => problem.includes('reveals the answer')), 'hint revealing the answer');
    const sort = clone(activityById('cb-m01-sort-balance-sheet')) as CategorySortingActivity;
    sort.items[0].hint = 'This is an asset.';
    sort.items[1].explanation = '';
    sort.items[2].categoryId = 'equity';
    const sortProblems = validateActivity(sort);
    ok(sortProblems.some((problem) => problem.includes('names its category')), 'hint naming the category');
    ok(sortProblems.some((problem) => problem.includes('no explanation')), 'missing explanation');
    ok(sortProblems.some((problem) => problem.includes('unknown category')), 'invalid answer key');
    const fake = clone(activityById('cf-m01-seq-credit-lifecycle')) as SequenceBuilderActivity;
    fake.items[0].text = 'Personal loan';
    fake.items[1].text = 'Revolving credit';
    (fake as unknown as { isSequentialProcess: boolean }).isSequentialProcess = false;
    fake.correctSequence = fake.correctSequence.slice(1);
    const seqProblems = validateActivity(fake);
    ok(seqProblems.filter((problem) => problem.includes('not a stage')).length === 2, 'product alternatives as steps');
    ok(seqProblems.some((problem) => problem.includes('isSequentialProcess')), 'unflagged sequence');
    ok(seqProblems.some((problem) => problem.includes('permutation')), 'broken sequence key');
    const stat = clone(activityById('cb-m01-match-products-needs')) as MatchSortActivity;
    stat.summary = 'Roughly 87% of adults hold an account.';
    ok(validateActivity(stat).some((problem) => problem.startsWith('unsupported figure')), 'statistics are rejected');
  } },
  { name: 'fails closed when a chapter is missing, moved or under review', run: () => {
    const held = clone(SOURCE_TITLES);
    const heldDecks = decksFrom(held) as Record<string, Record<string, Array<{ title: string; reviewStatus?: string }>>>;
    heldDecks.COMMERCIAL_BANKING_MODULE01['1.1 Industry Definition & Scope'][4].reviewStatus = 'Under Review';
    const underReview = resolveAvailableActivities(originalActivities(), heldDecks as SourceDecks);
    eq(underReview.unavailable.map((item) => item.activityId), ['cb-m01-sort-customer-segments'], 'held chapter hides only its activity');

    const twoChapters = clone(SOURCE_TITLES);
    twoChapters.CONSUMER_FINANCE_MODULE01['Industry Definition & Scope'] = twoChapters.CONSUMER_FINANCE_MODULE01['Industry Definition & Scope'].slice(0, 2);
    const reduced = resolveAvailableActivities(originalActivities(), decksFrom(twoChapters));
    eq(reduced.unavailable.map((item) => item.activityId), ['cf-m01-sort-instalment-revolving', 'cf-m01-sort-repayment-capacity', 'cf-m01-seq-credit-lifecycle'], 'QA scenario: a 2-chapter Lesson 1.1 hides activities citing chapters 3–5');

    const moved = clone(SOURCE_TITLES);
    moved.COMMERCIAL_BANKING_MODULE01['1.1 Industry Definition & Scope'].reverse();
    const movedResult = resolveAvailableActivities(originalActivities(), decksFrom(moved));
    ok(movedResult.unavailable.some((item) => item.reasons.some((reason) => reason.includes('expected'))), 'moved chapters are reported');
    const missing = resolveAvailableActivities(allActivities(), {});
    eq(missing.available.length, 0, 'no decks, no activities');
  } },
  { name: 'expansion activity IDs are pinned per pack and retired IDs are never reused', run: () => {
    eq(MATCH_SORT_PACKS.slice(2).map((pack) => pack.packId), Object.keys(EXPANSION_ACTIVITY_IDS), 'expansion packs in pinned order');
    MATCH_SORT_PACKS.slice(2).forEach((pack) => eq(pack.activities.map((activity) => activity.activityId), EXPANSION_ACTIVITY_IDS[pack.packId], `${pack.packId} activity IDs`));
    const ids = allActivities().map((activity) => activity.activityId);
    eq(new Set(ids).size, ids.length, 'activity IDs are globally unique');
    eq(ids.filter((id) => RETIRED_ACTIVITY_IDS.includes(id)), [], 'retired activity IDs are not reused');
  } },
];

export const runContentTests = () => runSuite('content', contentCases);
runContentTests().catch((error) => { console.error(error.message); throw error; });
