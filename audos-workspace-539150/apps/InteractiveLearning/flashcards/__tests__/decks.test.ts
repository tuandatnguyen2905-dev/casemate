import { FLASHCARD_DECKS, validateDeck } from '../decks';
import { assert, assertEqual, createSuite } from './harness';
import { between, chapterSegments, readWorkspaceFile, sha256 } from './sourceFiles';
import { EXPANSION_CARD_IDS, RETIRED_CARD_IDS } from './expansionPins';

const suite = createSuite('decks: stable IDs and source/chapter mapping');

/**
 * Decks whose excerpts are verified against the chapter as the reader renders it (practiceReview/__tests__/renderedGrounding.test.ts)
 * instead of against raw curriculum text: the curriculum files are compact data files that a builder expands into chapters, so a raw
 * file has no per-chapter segments to compare. The FMCG expansion decks are generated from the registry at build time and are not pinned.
 */
const RENDERED_SOURCE = 'rendered-chapter-text';
const GENERATED_SOURCE = 'generated-from-source-at-build';
const isRendered = (deck: { source: { readAtSha256: string } }) => deck.source.readAtSha256 === RENDERED_SOURCE;
const isGenerated = (deck: { source: { readAtSha256: string } }) => deck.source.readAtSha256 === GENERATED_SOURCE;
const checkedAgainstRawFile = (deck: { source: { readAtSha256: string } }) => !isRendered(deck) && !isGenerated(deck);

/** Renaming a card ID orphans learners' review history, so the full list is pinned here. */
const ORIGINAL_CARD_IDS: Record<string, string[]> = {
  'commercial-banking-fundamentals': [
    'cbf-commercial-bank-definition', 'cbf-financial-intermediation', 'cbf-deposit-liability-loan-asset', 'cbf-credit-creation',
    'cbf-liquidity-transformation', 'cbf-maturity-transformation', 'cbf-capital-vs-liquidity', 'cbf-trust-and-bank-runs',
    'cbf-industry-boundary-test', 'cbf-consumer-finance-company', 'cbf-product-families', 'cbf-letter-of-credit',
    'cbf-primary-account-value', 'cbf-customer-segments',
  ],
  'consumer-finance-fundamentals': [
    'cff-consumer-finance-scope', 'cff-instalment-credit', 'cff-revolving-credit', 'cff-affordability-assessment',
    'cff-credit-vs-cash-sale', 'cff-responsible-lending-controls', 'cff-boundary-responsibility',
    'cff-credit-lifecycle', 'cff-partners-are-not-lenders', 'cff-core-products', 'cff-supporting-services',
    'cff-need-vs-capacity', 'cff-financial-inclusion',
  ],
};

suite.test('original two decks first with 10–15 cards and a structurally valid mapping', () => {
  assertEqual(FLASHCARD_DECKS.slice(0, 2).map((deck) => deck.deckId), ['commercial-banking-fundamentals', 'consumer-finance-fundamentals'], 'original decks stay first in the registry');
  assertEqual(FLASHCARD_DECKS.slice(2).filter((deck) => !isGenerated(deck)).map((deck) => deck.deckId), Object.keys(EXPANSION_CARD_IDS), 'expansion decks are registered in pinned order');
  const problems: string[] = [];
  FLASHCARD_DECKS.forEach((deck, index) => {
    const limits = index < 2 ? [10, 15] : isRendered(deck) ? [2, 14] : [4, 14];
    if (deck.cards.length < limits[0] || deck.cards.length > limits[1]) problems.push(`${deck.deckId} has ${deck.cards.length} cards`);
    validateDeck(deck).forEach((problem) => problems.push(`${deck.deckId}: ${problem}`));
  });
  assertEqual(problems, [], 'deck size and validation problems');
});

suite.test('card IDs are stable, unique across decks and pinned', () => {
  const all = FLASHCARD_DECKS.flatMap((deck) => deck.cards.map((card) => card.cardId));
  assertEqual(new Set(all).size, all.length, 'globally unique card IDs');
  assertEqual(all.filter((id) => RETIRED_CARD_IDS.includes(id)), [], 'retired card IDs are not reused');
  FLASHCARD_DECKS.filter((deck) => !isGenerated(deck)).forEach((deck) => {
    assertEqual(deck.cards.map((card) => card.cardId), ({ ...ORIGINAL_CARD_IDS, ...EXPANSION_CARD_IDS } as Record<string, string[]>)[deck.deckId], `${deck.deckId} card IDs`);
  });
});

suite.test('reordering a deck does not change any card identity', () => {
  const deck = FLASHCARD_DECKS[0];
  const reversed = { ...deck, cards: [...deck.cards].reverse() };
  const before = new Map(deck.cards.map((card) => [card.cardId, card.front]));
  reversed.cards.forEach((card) => assertEqual(before.get(card.cardId), card.front, `${card.cardId} keeps its content`));
  assertEqual(validateDeck(reversed), [], 'validity does not depend on order');
});

suite.test('validateDeck catches broken mappings (fails closed)', () => {
  const deck = FLASHCARD_DECKS[1];
  const broken = {
    ...deck,
    cards: [
      { ...deck.cards[0], chapterId: 'consumer-finance-m1-l1-ch09' },
      { ...deck.cards[1], cardId: 'card-3' },
      { ...deck.cards[2], sourceRefs: [] },
      { ...deck.cards[3], back: ' ' },
      deck.cards[4],
      deck.cards[4],
    ],
  };
  const problems = validateDeck(broken).join('\n');
  ['unknown chapter', 'looks positional', 'no source reference', 'empty back', 'duplicate id'].forEach((fragment) => {
    assert(problems.includes(fragment), `expected a "${fragment}" problem in:\n${problems}`);
  });
});

suite.test('expansion decks: one deck per lesson, unique prompts and answers, practical and sourced', () => {
  const lessons = new Set<string>();
  FLASHCARD_DECKS.forEach((deck) => {
    const lesson = `${deck.industryId}::${deck.source.moduleKey}::${deck.source.lessonTitle}`;
    assert(!lessons.has(lesson), `two decks map to ${lesson}`);
    lessons.add(lesson);
  });
  const normalise = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const fronts = new Map<string, string>();
  const backs = new Map<string, string>();
  FLASHCARD_DECKS.forEach((deck) => deck.cards.forEach((card) => {
    const front = normalise(card.front);
    const back = normalise(card.back);
    assert(!fronts.has(front), `${card.cardId} repeats the prompt of ${fronts.get(front)}`);
    assert(!backs.has(back), `${card.cardId} repeats the answer of ${backs.get(back)}`);
    fronts.set(front, card.cardId);
    backs.set(back, card.cardId);
    if (ORIGINAL_CARD_IDS[deck.deckId]) return;
    assert(card.back.length <= 420, `${card.cardId} back is too long (${card.back.length} characters)`);
    assert(card.front.trim().length >= 20, `${card.cardId} prompt is too short to be a recall prompt`);
    assert(card.sourceRefs.length >= 1 && card.keyTerms.length >= 1, `${card.cardId} needs a source and key terms`);
  }));
});

suite.test('cards contain no statistics or dated figures', () => {
  FLASHCARD_DECKS.forEach((deck) => deck.cards.forEach((card) => {
    const text = [card.front, card.back, card.explanation, card.practicalExample].join(' ');
    assert(!/%/.test(text), `${card.cardId} contains a percentage`);
    assert(!/\b(?:19|20)\d{2}\b/.test(text), `${card.cardId} contains a year`);
    assert(!/\d[\d,.]*\s*(?:million|billion|bn|m)\b/i.test(text), `${card.cardId} contains a monetary figure`);
  }));
});

suite.test('every card maps to a chapter that exists in the source lesson, and every excerpt is verbatim in that chapter', () => {
  const notices: string[] = [];
  const problems: string[] = [];
  FLASHCARD_DECKS.filter(checkedAgainstRawFile).forEach((deck) => {
    const { source } = deck;
    const text = readWorkspaceFile(source.file);
    if (text === null) {
      problems.push(`${deck.deckId}: source file not found: ${source.file} (run from the workspace root or set FLASHCARDS_WORKSPACE_ROOT)`);
      return;
    }
    if (sha256(text) !== source.readAtSha256) notices.push(`${source.file} changed since the deck was authored; excerpts re-validated against the current text.`);
    const block = between(text, source.startMarker, source.endMarker);
    if (block === null) {
      problems.push(`${deck.deckId}: lesson "${source.lessonTitle}" markers not found in ${source.file}`);
      return;
    }
    const segments = chapterSegments(block, source.chapterMarker);
    if (segments.length !== deck.chapters.length) {
      problems.push(`${deck.deckId}: MISMATCH — source lesson now has ${segments.length} chapters, deck maps ${deck.chapters.length}; re-map cards before shipping`);
    }
    deck.chapters.forEach((chapter) => {
      const segment = segments[chapter.number - 1] ?? '';
      if (!segment.includes(`'${chapter.sourceTitle}'`) && !segment.includes(`"${chapter.sourceTitle}"`)) {
        problems.push(`${deck.deckId}: chapter ${chapter.number} (${chapter.chapterId}) is no longer "${chapter.sourceTitle}"`);
      }
    });
    const chapterNumber = new Map(deck.chapters.map((chapter) => [chapter.chapterId, chapter.number]));
    const supporting = new Map<string, string>();
    (source.supportingFiles ?? []).forEach((entry) => {
      const supportText = readWorkspaceFile(entry.file);
      if (supportText === null) {
        problems.push(`${deck.deckId}: supporting file not found: ${entry.file}`);
        return;
      }
      if (sha256(supportText) !== entry.readAtSha256) notices.push(`${entry.file} changed since the deck was authored; excerpts re-validated against the current text.`);
      const supportBlock = between(supportText, entry.startMarker, entry.endMarker);
      if (supportBlock === null) problems.push(`${deck.deckId}: markers not found in ${entry.file}`);
      else supporting.set(entry.file, supportBlock);
    });
    deck.cards.forEach((card) => card.sourceRefs.forEach((ref) => {
      if (ref.file === source.file) {
        const segment = segments[(chapterNumber.get(ref.chapterId) ?? 0) - 1] ?? '';
        if (!segment.includes(ref.excerpt)) problems.push(`${card.cardId}: excerpt not found in ${ref.chapterId} of ${ref.file}: "${ref.excerpt}"`);
      } else if (!supporting.has(ref.file)) {
        problems.push(`${card.cardId}: ${ref.file} is not a readable declared source for ${deck.deckId}`);
      } else if (!(supporting.get(ref.file) as string).includes(ref.excerpt)) {
        problems.push(`${card.cardId}: excerpt not found in ${ref.file}: "${ref.excerpt}"`);
      }
    }));
  });
  notices.forEach((notice) => console.log(`    note: ${notice}`));
  assert(problems.length === 0, `${problems.length} source-mapping problem(s):\n    - ${problems.join('\n    - ')}`);
});

suite.test('no source lesson is under a review hold', () => {
  const holds = readWorkspaceFile('apps/IndustryKnowledge/reviewHolds.ts');
  assert(holds !== null, 'reviewHolds.ts not found');
  const unescape = (value: string) => value.replace(/\\(.)/g, '$1');
  FLASHCARD_DECKS.forEach((deck) => {
    const entries = holds.split('\n').filter((line) => line.includes(`moduleKey: '${deck.source.moduleKey}'`));
    const inLesson = entries.filter((line) => line.includes(`lesson: '${deck.source.lessonTitle}'`));
    if (!isRendered(deck)) {
      assertEqual(inLesson, [], `${deck.deckId}: review holds on "${deck.source.lessonTitle}" (remove affected cards)`);
      return;
    }
    // Authored whole-curriculum decks keep their lesson; only a lesson-scope hold, or a card on a held chapter, is a failure.
    assertEqual(inLesson.filter((line) => line.includes("scope: 'lesson'")), [], `${deck.deckId}: lesson-scope review hold on "${deck.source.lessonTitle}"`);
    const heldChapters = inLesson.flatMap((line) => Array.from(line.matchAll(/chapter: '((?:[^'\\]|\\.)*)'/g)).map((match) => unescape(match[1]).trim().toLowerCase()));
    const heldIds = new Set(deck.chapters.filter((chapter) => heldChapters.includes(chapter.title.trim().toLowerCase())).map((chapter) => chapter.chapterId));
    const onHeld = deck.cards.filter((card) => heldIds.has(card.chapterId) || card.sourceRefs.some((ref) => heldIds.has(ref.chapterId))).map((card) => card.cardId);
    assertEqual(onHeld, [], `${deck.deckId}: cards on a chapter under review hold`);
  });
});

export const completed = suite.run();
