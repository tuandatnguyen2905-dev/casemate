// MCQ and fill-in-the-blank cards: answer checking, content rules, how they join authored decks, and the
// mixed study session (jsdom). Checking an answer must never rate a card, flip it, or touch anything
// outside the learner's flashcard record. Run with the other suites (run-all.test.ts).

import type { ReactElement } from 'react';
import type { FlashcardContent, FlashcardDeckContent, FlashcardStoreSnapshot } from '../models';
import { installDom } from './domEnvironment';
import { assert, assertEqual, createSuite } from './harness';

/** Renaming an interactive card ID would orphan review history, so the list is pinned (registry order). */
export const INTERACTIVE_CARD_IDS: Record<string, string[]> = {
  'commercial-banking-history-development': [
    'cb12-mcq-commercial-bank-role', 'cb12-fill-lender-of-last-resort', 'cb12-mcq-insolvent-bank', 'cb12-fill-capital-absorbs-losses',
    'cb12-mcq-digital-advantage', 'cb12-fill-correspondent-banking', 'cb12-mcq-two-tier-reform', 'cb12-fill-joint-stock-category',
  ],
  'commercial-banking-value-chain-overview': [
    'cb21-mcq-unstable-funding', 'cb21-fill-deposit-tenor', 'cb21-mcq-funds-transfer-pricing', 'cb21-fill-alco', 'cb21-mcq-deposit-risk-view', 'cb21-fill-deposits-as-liabilities',
  ],
  'commercial-banking-upstream-activities': [
    'cb22-mcq-liquid-capital-constraint', 'cb22-fill-charter-capital', 'cb22-mcq-casa-ratio', 'cb22-fill-cost-of-funds', 'cb22-mcq-capital-is-quantity', 'cb22-fill-alm',
  ],
  'commercial-banking-midstream-activities': [
    'cb23-mcq-primary-repayment-source', 'cb23-fill-expected-loss', 'cb23-mcq-npl-groups', 'cb23-fill-special-mention', 'cb23-mcq-after-write-off', 'cb23-fill-llcr-npl',
  ],
  'commercial-banking-downstream-activities': [
    'cb24-mcq-digital-shift-measure', 'cb24-fill-contact-centre', 'cb24-mcq-bundling-risk', 'cb24-fill-primary-account', 'cb24-mcq-digital-success-measure', 'cb24-fill-digital-scale',
  ],
  'commercial-banking-inputs-outputs-value': [
    'cb25-mcq-deposit-meaning', 'cb25-fill-economic-profit', 'cb25-mcq-nim-definition', 'cb25-fill-period-end', 'cb25-mcq-cir-definition', 'cb25-fill-cost-of-risk',
  ],
  'commercial-banking-global-vs-local-chain': [
    'cb26-mcq-parent-liquidity-limits', 'cb26-fill-group-treasury', 'cb26-mcq-vietnam-growth-limit', 'cb26-fill-asset-quality', 'cb26-mcq-insolvency-description', 'cb26-fill-basel-domestic-law',
  ],
  'commercial-banking-business-models': [
    'cb31-mcq-funding-liability', 'cb31-fill-credit-cycles', 'cb31-mcq-model-lenses', 'cb31-fill-digital-first', 'cb31-mcq-best-model', 'cb31-fill-scalability-risk',
  ],
  'commercial-banking-products-segmentation': [
    'cb32-mcq-guarantee-exposure', 'cb32-fill-credit-exposure', 'cb32-mcq-bancassurance-income', 'cb32-fill-net-fees', 'cb32-mcq-segment-profit-step', 'cb32-fill-ftp-products',
  ],
  'commercial-banking-customer-segments-needs': [
    'cb33-mcq-segmentation-starting-point', 'cb33-fill-service-cost', 'cb33-mcq-core-job', 'cb33-fill-operational-resilience', 'cb33-mcq-acquisition-meaning', 'cb33-fill-cohort-channel',
  ],
};

const T0 = '2026-11-17T09:00:00.000Z';

const base = (cardId: string, extra: Partial<FlashcardContent> = {}): FlashcardContent => ({
  cardId,
  deckId: 'mixed-deck',
  industryId: 'test-industry',
  moduleId: 'm1',
  lessonId: 'l1',
  chapterId: 'mixed-ch1',
  front: `Classic question for ${cardId}?`,
  back: `Classic answer for ${cardId}.`,
  explanation: `Explanation for ${cardId}.`,
  practicalExample: `Example for ${cardId}.`,
  keyTerms: ['Term'],
  sourceRefs: [{ file: 'fixture', chapterId: 'mixed-ch1', excerpt: 'Fixture excerpt.' }],
  ...extra,
});

const MCQ = base('mixed-mcq-casa', {
  front: 'How is the CASA ratio calculated?',
  back: 'Current plus savings balances divided by total customer deposits',
  explanation: 'MCQ-EXPLANATION: the CASA ratio shows the low-cost share of the deposit base.',
  interaction: {
    type: 'mcq',
    options: [
      { id: 'a', text: 'Term deposit balances divided by total customer deposits' },
      { id: 'b', text: 'Current plus savings balances divided by total customer deposits' },
      { id: 'c', text: 'Total interest expense divided by total funding balances' },
    ],
    correctOptionId: 'b',
  },
});

const FILL = base('mixed-fill-lolr', {
  front: 'A central bank providing emergency liquidity under defined conditions acts as the ____.',
  back: 'A central bank providing emergency liquidity under defined conditions acts as the lender of last resort.',
  explanation: 'FILL-EXPLANATION: scale made banking systemic.',
  interaction: { type: 'fill_blank', answer: 'lender of last resort', acceptedAnswers: ['LOLR'] },
});

const CLASSIC = base('mixed-classic-alpha');

const MIXED_DECK: FlashcardDeckContent = {
  deckId: 'mixed-deck',
  title: 'Mixed deck',
  description: 'Fixture',
  industryId: 'test-industry',
  industryLabel: 'Test Industry',
  moduleId: 'm1',
  moduleLabel: 'Module 1',
  lessonId: 'l1',
  lessonTitle: 'Lesson 1',
  source: { file: 'fixture', moduleKey: 'FIXTURE', lessonTitle: 'Lesson 1', startMarker: '', endMarker: '', chapterMarker: '', readAtSha256: '', readAt: '' },
  chapters: [{ chapterId: 'mixed-ch1', number: 1, title: 'Fixture chapter', sourceTitle: 'Fixture chapter' }],
  cards: [CLASSIC, MCQ, FILL],
  contentStatus: 'fixture',
  mappingNotes: [],
};

export const completed = (async () => {
  await installDom();

  const React = (await import('react')).default;
  const { createRoot } = await import('react-dom/client');
  const { flushSync } = await import('react-dom');
  const { default: SmartFlashcards } = await import('../components/SmartFlashcards');
  const { createMemoryAdapter } = await import('../persistence');
  const { applyRating, createManualClock, initialReviewState } = await import('../scheduler');
  const { summariseSession } = await import('../sessionSummary');
  const { checkFillBlank, checkMcq, flashcardType, mergeInteractiveCards, normaliseAnswer, validateInteraction } = await import('../interactive');
  const { FLASHCARD_DECKS, validateDeck } = await import('../decks');
  const { INTERACTIVE_CARD_SPECS, INTERACTIVE_MERGE_PROBLEMS, PRACTICE_DECKS } = await import('../decks/practice');

  const suite = createSuite('interactive cards: MCQ, fill in the blank and mixed study');
  const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
  const mounted = new Set<() => void>();

  function mount(element: ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    flushSync(() => root.render(element));
    const unmount = () => {
      if (!mounted.delete(unmount)) return;
      root.unmount();
      container.remove();
    };
    mounted.add(unmount);
    return { container, unmount };
  }

  const uiTest = (title: string, fn: () => void | Promise<void>) => suite.test(title, async () => {
    try {
      await fn();
    } finally {
      Array.from(mounted).forEach((unmount) => unmount());
      window.localStorage.clear();
    }
  });

  const q = (root: ParentNode, testId: string) => root.querySelector(`[data-testid="${testId}"]`);
  const text = (root: ParentNode, testId: string) => (q(root, testId)?.textContent ?? '').replace(/\s+/g, ' ').trim();
  async function click(element: Element | null | undefined) {
    assert(element, 'element to click exists');
    assert(!(element as HTMLButtonElement).disabled, `"${element.textContent?.trim()}" is enabled`);
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await tick();
  }
  async function press(key: string, target: Element = document.body) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    await tick();
  }
  async function chooseOption(root: ParentNode, optionId: string) {
    await click(root.querySelector(`[data-option-id="${optionId}"] input`));
  }
  async function type(root: ParentNode, value: string) {
    const input = q(root, 'fill-input') as HTMLInputElement;
    assert(input && !input.disabled, 'the answer field is enabled');
    const setter = Object.getOwnPropertyDescriptor((window as unknown as { HTMLInputElement: { prototype: object } }).HTMLInputElement.prototype, 'value')!.set!;
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();
  }
  const cardId = (root: ParentNode) => (q(root, 'interactive-card') ?? q(root, 'flashcard-front') ?? q(root, 'flashcard-back'))?.getAttribute('data-card-id');

  function start(deck: FlashcardDeckContent = MIXED_DECK, snapshot?: FlashcardStoreSnapshot) {
    const adapter = createMemoryAdapter(snapshot);
    const clock = createManualClock(T0);
    const view = mount(<SmartFlashcards decks={[deck]} adapter={adapter} clock={clock} sessionLimit={12} prevalidated embedded />);
    return { ...view, adapter };
  }
  async function openStudy(root: ParentNode) {
    await click(root.querySelector('button[aria-label^="Study "]'));
  }
  async function goToCard(root: ParentNode, id: string) {
    for (let step = 0; step < 5 && cardId(root) !== id; step += 1) await click(q(root, 'session-next'));
    assertEqual(cardId(root), id, 'reached the card');
  }

  // Answer checking -------------------------------------------------------------------------------

  suite.test('fill in the blank accepts the answer regardless of case, spacing and punctuation, plus listed synonyms only', () => {
    const lolr = { type: 'fill_blank' as const, answer: 'lender of last resort', acceptedAnswers: ['LOLR'] };
    assertEqual(checkFillBlank(lolr, 'lender of last resort'), { correct: true, empty: false, matched: 'lender of last resort' }, 'exact answer');
    assertEqual(checkFillBlank(lolr, '  Lender-of-Last  Resort. ').correct, true, 'case, hyphens, spacing and a full stop are ignored');
    assertEqual(checkFillBlank(lolr, 'lolr'), { correct: true, empty: false, matched: 'LOLR' }, 'a listed abbreviation is accepted and reported');
    assertEqual(checkFillBlank(lolr, 'lender of last resot').correct, false, 'a misspelling is not accepted (no fuzzy matching)');
    assertEqual(checkFillBlank(lolr, 'last resort').correct, false, 'a partial answer is not accepted');
    assertEqual(checkFillBlank(lolr, 'central bank').correct, false, 'a wrong answer');
    assertEqual(checkFillBlank(lolr, '  ... '), { correct: false, empty: true }, 'punctuation only counts as empty');
    const formula = { type: 'fill_blank' as const, answer: 'NII / earning assets', matching: 'exact' as const };
    assertEqual(checkFillBlank(formula, 'nii / Earning Assets.').correct, true, 'exact mode still ignores case and a trailing full stop');
    assertEqual(checkFillBlank(formula, 'NII earning assets').correct, false, 'exact mode keeps the operator significant');
    assertEqual(normaliseAnswer('\u201cJoint\u2013Stock\u201d'), 'joint stock', 'typographic quotes and dashes fold');
  });

  suite.test('MCQ checks the chosen option against the key and nothing else', () => {
    const interaction = MCQ.interaction as Extract<FlashcardContent['interaction'], { type: 'mcq' }>;
    assertEqual([checkMcq(interaction, 'b'), checkMcq(interaction, 'a'), checkMcq(interaction, null), checkMcq(interaction, '')], [true, false, false, false], 'only the keyed option is correct');
    assertEqual([flashcardType(CLASSIC), flashcardType(MCQ), flashcardType(FILL)], ['classic', 'mcq', 'fill_blank'], 'cards without metadata stay classic');
  });

  suite.test('validateInteraction rejects malformed MCQ and fill-in-the-blank cards', () => {
    assertEqual([...validateInteraction(MCQ), ...validateInteraction(FILL), ...validateInteraction(CLASSIC)], [], 'fixtures are valid');
    const mcq = MCQ.interaction as Extract<FlashcardContent['interaction'], { type: 'mcq' }>;
    const problems = [
      ...validateInteraction({ ...MCQ, interaction: { ...mcq, options: mcq.options.slice(0, 2) } }),
      ...validateInteraction({ ...MCQ, interaction: { ...mcq, correctOptionId: 'z' } }),
      ...validateInteraction({ ...MCQ, back: 'Something else' }),
      ...validateInteraction({ ...FILL, front: 'No blank in this statement at all.' }),
      ...validateInteraction({ ...FILL, interaction: { type: 'fill_blank', answer: 'lender of last resort', acceptedAnswers: ['Lender of last resort'] } }),
      ...validateInteraction({ ...FILL, front: 'The lender of last resort is the ____.', back: 'The lender of last resort is the lender of last resort.' }),
    ].join('\n');
    ['3 or 4 options', 'is not an option', 'repeat the correct option', 'exactly one blank', 'repeat each other', 'gives the answer away'].forEach((fragment) => assert(problems.includes(fragment), `expected "${fragment}" in:\n${problems}`));
  });

  // Content ---------------------------------------------------------------------------------------

  const interactiveCards = () => PRACTICE_DECKS.flatMap((deck) => deck.cards.filter((card) => card.interaction));

  suite.test('every interactive card is placed, valid and pinned; authored decks are unchanged', () => {
    assertEqual(INTERACTIVE_MERGE_PROBLEMS, [], 'every spec found its deck and authored card');
    assertEqual(Object.keys(INTERACTIVE_CARD_SPECS), Object.keys(INTERACTIVE_CARD_IDS), 'decks with interactive cards');
    PRACTICE_DECKS.forEach((deck) => {
      const pinned = INTERACTIVE_CARD_IDS[deck.deckId] ?? [];
      assertEqual(deck.cards.filter((card) => card.interaction).map((card) => card.cardId).sort(), [...pinned].sort(), `${deck.deckId} interactive card IDs`);
      const original = FLASHCARD_DECKS.find((item) => item.deckId === deck.deckId)!;
      assertEqual(deck.cards.filter((card) => !card.interaction), original.cards, `${deck.deckId}: authored cards keep their order and content`);
      assertEqual(validateDeck(deck), [], `${deck.deckId} still validates with interactive cards`);
    });
    const problems = interactiveCards().flatMap((card) => validateInteraction(card));
    assertEqual(problems, [], 'interaction problems');
    const authoredIds = new Set(FLASHCARD_DECKS.flatMap((deck) => deck.cards.map((card) => card.cardId)));
    assertEqual(interactiveCards().filter((card) => authoredIds.has(card.cardId)).map((card) => card.cardId), [], 'no interactive ID reuses an authored ID');
    assertEqual(PRACTICE_DECKS.some((deck) => deck.deckId === 'commercial-banking-fundamentals' && deck.cards.some((card) => card.interaction)), false, 'lesson 1.1 keeps its original deck');
  });

  suite.test('interactive cards sit right after their chapter\u2019s authored cards and cite that chapter\u2019s verified excerpts', () => {
    PRACTICE_DECKS.forEach((deck) => {
      const original = FLASHCARD_DECKS.find((item) => item.deckId === deck.deckId)!;
      deck.cards.forEach((card, index) => {
        if (!card.interaction) return;
        const spec = INTERACTIVE_CARD_SPECS[deck.deckId].find((item) => item.id === card.cardId)!;
        const authored = original.cards.find((item) => item.cardId === spec.basedOn)!;
        assertEqual(card.chapterId, authored.chapterId, `${card.cardId} is in the chapter of ${spec.basedOn}`);
        assertEqual(card.sourceRefs, authored.sourceRefs, `${card.cardId} cites the excerpts of ${spec.basedOn}`);
        const later = deck.cards.slice(index + 1).filter((item) => !item.interaction && item.chapterId === card.chapterId);
        assertEqual(later.map((item) => item.cardId), [], `${card.cardId}: no authored card of its chapter comes after it`);
      });
    });
  });

  suite.test('interactive content: unique prompts and answers, no figures or years, unbiased MCQ keys', () => {
    const cards = interactiveCards();
    const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const everyCard = PRACTICE_DECKS.flatMap((deck) => deck.cards);
    cards.forEach((card) => {
      assertEqual(everyCard.filter((other) => normalise(other.front) === normalise(card.front)).length, 1, `${card.cardId}: unique prompt`);
      assertEqual(everyCard.filter((other) => normalise(other.back) === normalise(card.back)).length, 1, `${card.cardId}: unique answer`);
      const all = [card.front, card.back, card.explanation, card.practicalExample, ...(card.interaction?.type === 'mcq' ? card.interaction.options.map((option) => option.text) : [])].join(' ');
      assert(!/%/.test(all) && !/\b(?:19|20)\d{2}\b/.test(all) && !/\d[\d,.]*\s*(?:million|billion|bn|m)\b/i.test(all), `${card.cardId}: no percentages, years or monetary figures`);
      assert(card.front.trim().length >= 20 && card.keyTerms.length > 0 && card.sourceRefs.length > 0, `${card.cardId}: prompt, key terms and source`);
    });
    const mcqs = cards.filter((card) => card.interaction?.type === 'mcq');
    const positions = mcqs.map((card) => {
      const interaction = card.interaction as Extract<FlashcardContent['interaction'], { type: 'mcq' }>;
      return interaction.options.findIndex((option) => option.id === interaction.correctOptionId);
    });
    assert(Math.max(...[0, 1, 2, 3].map((position) => positions.filter((value) => value === position).length)) <= Math.ceil(mcqs.length / 2), `correct answers are spread across positions: ${positions.join(',')}`);
    const longest = mcqs.filter((card) => {
      const interaction = card.interaction as Extract<FlashcardContent['interaction'], { type: 'mcq' }>;
      const correct = interaction.options.find((option) => option.id === interaction.correctOptionId)!.text.length;
      return interaction.options.every((option) => option.id === interaction.correctOptionId || option.text.length < correct);
    }).map((card) => card.cardId);
    assert(longest.length <= Math.floor(mcqs.length / 4), `the correct option is rarely the longest (length cue): ${longest.join(', ')}`);
    const fills = cards.filter((card) => card.interaction?.type === 'fill_blank');
    assert(mcqs.length >= 12 && fills.length >= 12, `enough of each format: ${mcqs.length} MCQ, ${fills.length} fill in the blank`);
  });

  suite.test('mergeInteractiveCards copies decks, keeps authored order and reports specs it cannot place', () => {
    const deck = { ...MIXED_DECK, cards: [CLASSIC, base('mixed-classic-bravo')] };
    const before = JSON.stringify(deck);
    const result = mergeInteractiveCards([deck], { 'mixed-deck': [
      { id: 'mixed-mcq-new', basedOn: 'mixed-classic-alpha', front: 'A new interactive question for the fixture?', back: 'Yes', explanation: 'Because.', interaction: { type: 'mcq', options: [{ id: 'a', text: 'Yes' }, { id: 'b', text: 'No' }, { id: 'c', text: 'Maybe' }], correctOptionId: 'a' } },
      { id: 'mixed-mcq-orphan', basedOn: 'missing-card', front: 'An orphan question for the fixture?', back: 'Yes', explanation: 'Because.', interaction: { type: 'mcq', options: [{ id: 'a', text: 'Yes' }, { id: 'b', text: 'No' }, { id: 'c', text: 'Maybe' }], correctOptionId: 'a' } },
    ], 'unknown-deck': [] });
    assertEqual(JSON.stringify(deck), before, 'input deck is not mutated');
    assertEqual(result.decks[0].cards.map((card) => card.cardId), ['mixed-classic-alpha', 'mixed-classic-bravo', 'mixed-mcq-new'], 'placed after the last authored card of its chapter');
    assertEqual(result.decks[0].cards[2].practicalExample, CLASSIC.practicalExample, 'example and terms default to the authored card');
    assert(result.problems.some((problem) => problem.includes('missing-card')) && result.problems.some((problem) => problem.includes('unknown-deck')), `problems reported: ${result.problems.join('; ')}`);
  });

  suite.test('session summary keeps answer checks apart from viewed, rated and mastered', () => {
    const summary = summariseSession({
      cardIds: ['c1', 'm1', 'f1', 'f2'],
      viewed: ['c1', 'm1', 'f1', 'f2'],
      ratings: { c1: 'good' },
      interactiveCardIds: ['m1', 'f1', 'f2'],
      interactions: {
        m1: { type: 'mcq', attempts: 2, correct: true, firstTryCorrect: false, answerShown: false },
        f1: { type: 'fill_blank', attempts: 1, correct: false, firstTryCorrect: false, answerShown: true },
      },
    });
    assertEqual([summary.viewed, summary.rated, summary.unrated, summary.remembered], [4, 1, 3, 1], 'a correct answer is not a rating or a remembered card');
    assertEqual(summary.answerChecks, { cards: 3, attempted: 2, correct: 1, firstTry: 0, shown: 1, skipped: 1 }, 'answer checks');
    assertEqual('answerChecks' in summariseSession({ cardIds: ['c1'], viewed: ['c1'], ratings: {} }), false, 'classic-only sessions keep the original summary shape');
  });

  // Mixed study session (jsdom) -------------------------------------------------------------------

  uiTest('MCQ: the answer stays hidden until checked; choosing an option never flips the card or rates it', async () => {
    const { container, adapter } = start();
    await openStudy(container);
    await goToCard(container, MCQ.cardId);
    assertEqual(q(container, 'interactive-card')?.getAttribute('data-card-type'), 'mcq', 'MCQ card shown');
    assert(!(container.textContent ?? '').includes('MCQ-EXPLANATION') && !q(container, 'interactive-explanation'), 'explanation hidden before checking');
    assert(!q(container, 'reveal-answer') && !q(container, 'recall-rating'), 'no reveal button and no rating before an answer');
    assert(!container.querySelector('[role="button"][data-testid^="flashcard-"]'), 'the interactive card is not a flip control');
    assertEqual((q(container, 'check-answer') as HTMLButtonElement).disabled, true, 'Check answer waits for a choice');
    await chooseOption(container, 'a');
    assert(q(container, 'interactive-card') && !q(container, 'flashcard-back') && !q(container, 'answer-feedback'), 'selecting does not flip or submit');
    await press(' ');
    assert(!q(container, 'interactive-explanation') && !q(container, 'recall-rating'), 'Space does not reveal an interactive card');
    await click(q(container, 'check-answer'));
    assertEqual(q(container, 'answer-feedback')?.getAttribute('data-result'), 'incorrect', 'wrong answer feedback');
    assert(!q(container, 'interactive-explanation') && !q(container, 'recall-rating'), 'a wrong answer reveals nothing and asks for no rating');
    assert(container.querySelector('[data-option-id="a"]')?.className.includes('cmfc-option--incorrect'), 'the wrong pick is marked');
    await click(q(container, 'try-again'));
    assert(!q(container, 'answer-feedback') && !(container.querySelector('[data-option-id="a"] input') as HTMLInputElement).checked, 'Try again clears the attempt');
    await chooseOption(container, 'b');
    await click(q(container, 'check-answer'));
    assertEqual(q(container, 'answer-feedback')?.getAttribute('data-result'), 'correct', 'correct answer feedback');
    assert(text(container, 'interactive-explanation').includes('MCQ-EXPLANATION'), 'explanation after a correct answer');
    assert(q(container, 'recall-rating') && q(container, 'rating-optional'), 'rating is offered as optional');
    assertEqual(Object.keys(adapter.load().cards), [], 'a correct MCQ answer is not stored as a rating');
    await click(q(container, 'session-next'));
    assertEqual(cardId(container), FILL.cardId, 'Next works without a rating');
  });

  uiTest('fill in the blank: wrong, then a listed synonym; retry, feedback and explanation', async () => {
    const { container, adapter } = start();
    await openStudy(container);
    await goToCard(container, FILL.cardId);
    assertEqual(q(container, 'interactive-card')?.getAttribute('data-card-type'), 'fill_blank', 'fill card shown');
    assert(!(container.textContent ?? '').includes('lender of last resort') && !(container.textContent ?? '').includes('FILL-EXPLANATION'), 'answer hidden before checking');
    assertEqual((q(container, 'check-answer') as HTMLButtonElement).disabled, true, 'nothing typed yet');
    await type(container, 'central bank');
    await press(' ', q(container, 'fill-input')!);
    assert(!q(container, 'interactive-explanation'), 'typing a space never reveals');
    await click(q(container, 'check-answer'));
    assertEqual(q(container, 'answer-feedback')?.getAttribute('data-result'), 'incorrect', 'wrong answer');
    assert(!(container.textContent ?? '').includes('FILL-EXPLANATION'), 'no explanation after a wrong answer');
    await click(q(container, 'try-again'));
    assertEqual((q(container, 'fill-input') as HTMLInputElement).value, '', 'retry clears the field');
    await type(container, ' lolr ');
    await click(q(container, 'check-answer'));
    assertEqual(q(container, 'answer-feedback')?.getAttribute('data-result'), 'correct', 'synonym accepted');
    assert(text(container, 'answer-feedback').includes('the chapter\u2019s term is \u201clender of last resort\u201d'), 'feedback names the chapter term');
    assert(text(container, 'interactive-explanation').includes('FILL-EXPLANATION') && text(container, 'interactive-explanation').includes('Also accepted: LOLR'), 'explanation and accepted forms shown');
    assertEqual(Object.keys(adapter.load().cards), [], 'no rating stored');
  });

  uiTest('Show answer reveals the explanation; rating stays optional and is stored only when chosen', async () => {
    const { container, adapter } = start();
    await openStudy(container);
    await goToCard(container, FILL.cardId);
    await click(q(container, 'show-answer'));
    assertEqual(q(container, 'answer-feedback')?.getAttribute('data-result'), 'shown', 'shown state');
    assert(text(container, 'interactive-explanation').includes('FILL-EXPLANATION'), 'explanation visible');
    assert((q(container, 'fill-input') as HTMLInputElement).disabled, 'answer field locked once shown');
    await click(container.querySelector('button[data-rating="hard"]'));
    const stored = adapter.load().cards[FILL.cardId];
    assert(stored && stored.reviewHistory.length === 1 && stored.reviewHistory[0].rating === 'hard', 'the learner\u2019s own rating is stored, as for any card');
  });

  uiTest('mixed session: skip, finish with zero ratings, separate answer-check line, history of other cards preserved', async () => {
    const history = applyRating(initialReviewState(CLASSIC.cardId, 'mixed-deck'), 'good', new Date('2026-11-10T09:00:00.000Z').getTime());
    const snapshot: FlashcardStoreSnapshot = { schemaVersion: 1, cards: { [CLASSIC.cardId]: history }, updatedAt: T0 };
    const { container, adapter } = start(MIXED_DECK, snapshot);
    await openStudy(container);
    assertEqual(cardId(container), MCQ.cardId, 'unstudied cards first: the MCQ leads the session');
    assertEqual(text(container, 'session-next'), 'Skip', 'an unanswered interactive card offers Skip');
    await click(q(container, 'session-next'));
    await type(container, 'Lender of last resort');
    await click(q(container, 'check-answer'));
    assertEqual(q(container, 'answer-feedback')?.getAttribute('data-result'), 'correct', 'answered');
    assertEqual(text(container, 'session-next'), 'Next', 'Next after the answer shows');
    await click(q(container, 'session-next'));
    assertEqual(q(container, 'flashcard-front')?.getAttribute('data-card-id'), CLASSIC.cardId, 'the classic card still flips');
    await press(' ');
    assert(q(container, 'flashcard-back'), 'Space flips a classic card');
    await click(q(container, 'session-finish'));
    assert(q(container, 'review-summary'), 'session completes with no rating');
    assertEqual([text(container, 'summary-viewed'), text(container, 'summary-rated'), text(container, 'summary-unrated')], ['3', '0', '3'], 'viewed, rated, not rated');
    assert(q(container, 'summary-no-ratings'), 'the zero-rating message stays');
    const checks = text(container, 'summary-answer-checks');
    assert(checks.includes('1 of 2 cards answered correctly') && checks.includes('1 skipped') && checks.includes('not recall ratings'), `answer-check line: ${checks}`);
    assertEqual(adapter.load().cards, snapshot.cards, 'stored review history is untouched and nothing new is written');
  });

  await suite.run();
})();
