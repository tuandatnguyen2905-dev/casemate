// MCQ and fill-in-the-blank cards: answer checking, validation and how they join authored decks.
// Pure functions only. Checking an answer never rates a card: the scheduler sees a card only when the
// learner chooses Again / Hard / Good / Easy, and Knowledge Check scores are never read or written here.

import type { CardInteraction, FillBlankInteraction, FlashcardContent, FlashcardDeckContent, FlashcardType, McqInteraction } from './models';

/** How a blank is written in a fill-in-the-blank statement. */
export const BLANK_TOKEN = '____';

export function flashcardType(card: Pick<FlashcardContent, 'interaction'>): FlashcardType {
  return card.interaction?.type ?? 'classic';
}

export const isInteractive = (card: Pick<FlashcardContent, 'interaction'>) => flashcardType(card) !== 'classic';

/**
 * Case-insensitive and trimmed, with inner whitespace collapsed and typographic quotes and dashes folded.
 * `standard` also turns punctuation into spaces ("asset-liability" = "asset liability"); `exact` keeps
 * punctuation significant and only drops one trailing full stop.
 */
export function normaliseAnswer(value: string, matching: FillBlankInteraction['matching'] = 'standard'): string {
  const folded = String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201e\u201f]/g, '"')
    .replace(/[\u2010-\u2015\u2212]/g, '-');
  const cleaned = matching === 'exact' ? folded.trim().replace(/\.$/, '') : folded.replace(/[^\p{L}\p{N}]+/gu, ' ');
  return cleaned.replace(/\s+/g, ' ').trim();
}

export interface FillBlankResult {
  correct: boolean;
  /** Nothing usable was typed. */
  empty: boolean;
  /** The accepted form that matched (the answer itself or one listed synonym). */
  matched?: string;
}

export function checkFillBlank(interaction: FillBlankInteraction, input: string): FillBlankResult {
  const value = normaliseAnswer(input, interaction.matching);
  if (!value) return { correct: false, empty: true };
  const matched = [interaction.answer, ...(interaction.acceptedAnswers ?? [])].find((candidate) => normaliseAnswer(candidate, interaction.matching) === value);
  return matched === undefined ? { correct: false, empty: false } : { correct: true, empty: false, matched };
}

export function checkMcq(interaction: McqInteraction, optionId: string | null | undefined): boolean {
  return Boolean(optionId) && optionId === interaction.correctOptionId;
}

/** Content checks for one card's interaction. Returns problems; an empty list means valid. */
export function validateInteraction(card: FlashcardContent): string[] {
  const interaction = card.interaction;
  if (!interaction) return [];
  const where = `card ${card.cardId}`;
  const problems: string[] = [];
  if (interaction.type === 'mcq') {
    const { options, correctOptionId } = interaction;
    if (options.length < 3 || options.length > 4) problems.push(`${where}: MCQ needs 3 or 4 options, has ${options.length}`);
    if (new Set(options.map((option) => option.id)).size !== options.length) problems.push(`${where}: duplicate option id`);
    if (new Set(options.map((option) => normaliseAnswer(option.text))).size !== options.length) problems.push(`${where}: duplicate option text`);
    if (options.some((option) => !option.text.trim())) problems.push(`${where}: empty option`);
    const correct = options.find((option) => option.id === correctOptionId);
    if (!correct) problems.push(`${where}: correct option ${correctOptionId} is not an option`);
    else if (correct.text.trim() !== card.back.trim()) problems.push(`${where}: back must repeat the correct option`);
    if (card.front.includes(BLANK_TOKEN)) problems.push(`${where}: MCQ question contains a blank`);
  } else if (interaction.type === 'fill_blank') {
    const blanks = card.front.split(BLANK_TOKEN).length - 1;
    if (blanks !== 1) problems.push(`${where}: statement needs exactly one blank, has ${blanks}`);
    const answer = normaliseAnswer(interaction.answer, interaction.matching);
    if (!answer) problems.push(`${where}: empty answer`);
    const accepted = (interaction.acceptedAnswers ?? []).map((value) => normaliseAnswer(value, interaction.matching));
    if (accepted.some((value) => !value)) problems.push(`${where}: empty accepted answer`);
    if (new Set([answer, ...accepted]).size !== accepted.length + 1) problems.push(`${where}: accepted answers repeat each other or the answer`);
    const completed = card.front.replace(BLANK_TOKEN, interaction.answer);
    if (normaliseAnswer(completed) !== normaliseAnswer(card.back)) problems.push(`${where}: back must be the completed statement`);
    if (answer && ` ${normaliseAnswer(card.front.replace(BLANK_TOKEN, ' '))} `.includes(` ${answer} `)) problems.push(`${where}: the statement already gives the answer away`);
  } else {
    problems.push(`${where}: unknown interaction ${(interaction as CardInteraction & { type: string }).type}`);
  }
  return problems;
}

/** An interactive card written against an authored card it restates (same chapter, same verified source). */
export interface InteractiveCardSpec {
  /** Stable slug. Never reuse or rename: review history is keyed by it. */
  id: string;
  /** The authored card whose chapter text this card tests. Its chapter and source excerpts are reused verbatim. */
  basedOn: string;
  front: string;
  back: string;
  explanation: string;
  /** Defaults to the authored card's practical example. */
  example?: string;
  /** Defaults to the authored card's key terms. */
  terms?: string[];
  interaction: CardInteraction;
}

export interface InteractiveMergeResult {
  decks: FlashcardDeckContent[];
  /** Specs that could not be placed (unknown deck or authored card); they are left out, never guessed. */
  problems: string[];
}

/**
 * Adds interactive cards to the decks they were written for. Each card takes the chapter, source excerpts
 * and identity fields of the authored card it restates and is placed right after the last authored card of
 * that chapter, so a study session mixes formats chapter by chapter. Decks are copied, never mutated, and
 * authored cards keep their order and content.
 */
export function mergeInteractiveCards(decks: FlashcardDeckContent[], specs: Record<string, InteractiveCardSpec[]>): InteractiveMergeResult {
  const problems: string[] = [];
  const known = new Set(decks.map((deck) => deck.deckId));
  Object.keys(specs).filter((deckId) => !known.has(deckId)).forEach((deckId) => problems.push(`no deck ${deckId} for its interactive cards`));
  const merged = decks.map((deck) => {
    const additions = specs[deck.deckId];
    if (!additions?.length) return deck;
    const byId = new Map(deck.cards.map((card) => [card.cardId, card]));
    const built: FlashcardContent[] = [];
    additions.forEach((spec) => {
      const base = byId.get(spec.basedOn);
      if (!base) {
        problems.push(`${spec.id}: authored card ${spec.basedOn} is not in ${deck.deckId}`);
        return;
      }
      built.push({
        cardId: spec.id,
        deckId: deck.deckId,
        industryId: deck.industryId,
        moduleId: deck.moduleId,
        lessonId: deck.lessonId,
        chapterId: base.chapterId,
        front: spec.front,
        back: spec.back,
        explanation: spec.explanation,
        practicalExample: spec.example ?? base.practicalExample,
        keyTerms: spec.terms ?? base.keyTerms,
        sourceRefs: base.sourceRefs.map((ref) => ({ ...ref })),
        origin: 'authored',
        interaction: spec.interaction,
      });
    });
    if (!built.length) return deck;
    const cards = [...deck.cards];
    built.forEach((card) => {
      let last = -1;
      cards.forEach((item, index) => { if (item.chapterId === card.chapterId) last = index; });
      cards.splice(last < 0 ? cards.length : last + 1, 0, card);
    });
    return { ...deck, cards };
  });
  return { decks: merged, problems };
}
