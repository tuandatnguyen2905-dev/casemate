import { isRestrictedChapter, stripChapterNumber } from '../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike } from '../../IndustryKnowledge/lessonFlowCore';
import type { CardConceptCategory, CardStage, FlashcardContent, FlashcardDeckContent } from '../flashcards/models';
import { normaliseTitle } from '../matchSort/validation';

// Chapter cards: the shared engine that turns what a chapter's General Info displays into flashcards, for
// every curriculum. Each card tests one idea the chapter states, and its answer is text the learner can
// find in that chapter (Key insight, Key terms, Concept breakdown, What to understand, Key statistics).
// Nothing is invented, paraphrased or carried across chapters, and the same content always produces the
// same cards and IDs. Cards follow the General Info journey: fundamentals → mechanisms → examples →
// applications → implications.

export type ReaderChapter = ChapterLike & {
  keyTerms?: Array<{ term?: unknown; definition?: unknown }>;
  keyInsight?: unknown;
  objective?: unknown;
  narrative?: Array<{ label?: unknown; text?: unknown }>;
  concepts?: Array<{ title?: unknown; summary?: unknown; points?: unknown; whyItMatters?: unknown }>;
  statTiles?: Array<{ label?: unknown; description?: unknown }>;
};

export interface ChapterDeckInput {
  industryId: string;
  industryLabel: string;
  identity: string;
  lessonTitle: string;
  moduleIndex: number;
  moduleLabel: string;
  chapters: ChapterLike[];
}

export const clean = (value: unknown) => String(value ?? '').replace(/\s+/g, ' ').trim();
export const slug = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd')
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/** Card IDs must not look positional (see validateDeck), so an ID ending in a number gets a suffix. */
const unpositional = (id: string) => (/(?:^|-)\d+$/.test(id) ? `${id}-card` : id);
export const words = (value: string) => value.split(' ').filter(Boolean).length;
export const sentences = (value: string) => (value.match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g) ?? []).map((part) => part.trim()).filter(Boolean);
/** As `sentences`, but a stop inside a token ("2.5D", "e.g") does not end the sentence, so every part is verbatim text. */
const wholeSentences = (value: string) => (value.match(/(?:[^.!?]|[.!?](?=\S))+[.!?]*(?=\s|$)/g) ?? []).map((part) => part.trim()).filter(Boolean);
export const chapterTitle = (chapters: ChapterLike[], index: number) => stripChapterNumber(clean(chapters[index]?.title)).replace(/^\d{1,2}\s+(?=\S)/, '') || `Chapter ${index + 1}`;

export const HELD_TEXT = /do not publish|verification required|under review/i;
/** Sentences the curriculum generator repeats in every chapter; they restate the chapter list, not a claim. */
const BOILERPLATE = /^(?:this chapter (?:focuses|examines|covers)|key dimensions include|for decision-makers,|trade flows, capacity|hypothetical\b)/i;
/** "A core Life Insurance concept related to insurer." restates the term, so it cannot be a card. */
const TEMPLATE_DEFINITION = /^an? (?:core|key|important) .{0,80}?(?:concept|term|idea) (?:related to|about|for) /i;
/** Example slots that hold an instruction ("Use verified service scope.") rather than an example. */
const INSTRUCTION = /^(?:use|define|verify|track|assign|segment|normali[sz]e|check|match|compare|separate|apply|map|test|label|record|confirm|review|identify|list|ask|treat|keep|start|build|set|measure|link|connect|align|state|split|show|tie|write|prioriti[sz]e|avoid|do not|don\u2019t|focus|consider|evaluate|assess)\b/i;
const EXAMPLE_LABEL = /^(?:real-world example|global example|example|vietnam example)$/i;
/** Figures go stale and are held under review elsewhere, so the newer card types never use them as answers. */
const STATISTIC = /\d+(?:[.,]\d+)?\s?%|US\$|\bUSD\b|\bVND\b|\btrillion\b|\bbillion\b|\bmillion\b|\b(?:19|20)\d{2}\b/i;
/** Placeholder text is never an answer and never counts as coverage. */
export const PLACEHOLDER = /\b(?:lorem ipsum|placeholder|tbd|todo|coming soon|to be (?:added|confirmed|written))\b/i;
/** "This chapter isolates …" describes the chapter, and "The mechanism connects A, B, C." only lists the visual's labels. */
const ABOUT_CHAPTER = /^(?:this (?:chapter|lesson|section) (?:isolates|explores|looks at|introduces|explains|describes|shows)|the (?:mechanism|framework|model|visual|diagram) connects)\b/i;
/** "Who Are the Insurers? examines Family responsibility." restates the heading instead of explaining it. */
const RESTATES_HEADING = /^(?:\?\s*)?(?:examines|explores|covers|focuses on|focuses specifically on|looks at|is about)\b/i;
const MIN_DEFINITION_WORDS = 4;
const MIN_INSIGHT_WORDS = 7;
const MIN_EXAMPLE_WORDS = 10;
const MAX_EXAMPLE_WORDS = 80;
const MIN_ANSWER_WORDS = 8;
const MIN_LIST_WORDS = 3;
const MAX_ANSWER_WORDS = 60;
/** Once an answer has this many words, further sentences of the section are left to the chapter. */
const CONCISE_ANSWER_WORDS = 25;
/** A sentence found in this many chapters of one curriculum is template text, not chapter content. */
const REPEATED_IN_CHAPTERS = 3;

const isFillerDefinition = (term: string, definition: string, generic: Set<string>) => {
  if (TEMPLATE_DEFINITION.test(definition) || words(definition) < MIN_DEFINITION_WORDS || generic.has(normaliseTitle(definition))) return true;
  const remainder = normaliseTitle(definition).replace(normaliseTitle(term), ' ').split(' ').filter(Boolean);
  return normaliseTitle(definition).includes(normaliseTitle(term)) && remainder.length <= 7;
};

/** The chapter's own claim-bearing sentences, without generator boilerplate or review markers. */
function claimSentences(chapter: ReaderChapter): string[] {
  const narrative = Array.isArray(chapter.narrative) ? chapter.narrative.filter((item) => !EXAMPLE_LABEL.test(clean(item?.label))).map((item) => clean(item?.text)) : [];
  return [clean(chapter.keyInsight), ...(Array.isArray(chapter.recap) ? chapter.recap.map(clean) : []), clean(chapter.chapterRecap), ...narrative, clean(chapter.objective)]
    .filter(Boolean)
    .flatMap(sentences)
    .filter((sentence) => !HELD_TEXT.test(sentence) && !BOILERPLATE.test(sentence) && words(sentence) >= 5 && (sentence.match(/,/g) ?? []).length < 4);
}

/** A sentence from the same chapter that explains the answer: one naming the term, else the key insight. */
function explanationFor(term: string, answer: string, chapter: ReaderChapter): string {
  const pool = claimSentences(chapter).filter((sentence) => normaliseTitle(sentence) !== normaliseTitle(answer));
  const needle = term.toLowerCase();
  return (term ? pool.find((sentence) => sentence.toLowerCase().includes(needle)) : undefined) ?? pool[0] ?? '';
}

/** As `explanationFor`, but never a sentence the answer already contains, a template sentence or a fragment. */
function supportingSentence(answer: string, chapter: ReaderChapter, title: string, repeated: Set<string>): string {
  const answerKey = normaliseTitle(answer);
  return claimSentences(chapter).find((sentence) => !answerKey.includes(normaliseTitle(sentence)) && specificSentence(sentence, title, repeated, true)) ?? '';
}

const firstSentence = (value: string) => sentences(value)[0] ?? '';

// Overlap: identical and paraphrased answers ---------------------------------------------------

const STOP_WORDS = new Set('the and for are but not you all any can had her was one our out has his how its may new now see two who did get him let say she too use with that this from they will have what when your into than then them were been more most such only also over each very much many some make made does just like well how which their there these those where while about after before could would should because between through during without within'.split(' '));
export const contentTokens = (text: string) => new Set(String(text ?? '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ').split(' ').filter((token) => token.length > 2 && !STOP_WORDS.has(token)));

/** Same idea in other words: most of the shorter answer's content words recur, or the two mostly share them. */
export function answersOverlap(left: Set<string>, right: Set<string>): boolean {
  if (!left.size || !right.size) return false;
  let shared = 0;
  left.forEach((token) => { if (right.has(token)) shared += 1; });
  const smaller = Math.min(left.size, right.size);
  return (smaller >= 6 && shared / smaller >= 0.8) || shared / (left.size + right.size - shared) >= 0.6;
}

const signatureOf = (tokens: Set<string>) => Array.from(tokens).sort().join(' ');

// Curriculum-wide filters ---------------------------------------------------------------------

/** Definitions the curriculum gives to two or more different terms ("A core gaming outlook concept.") say nothing specific. */
export function genericDefinitions(chapterSets: ChapterLike[][]): Set<string> {
  const termsByDefinition = new Map<string, Set<string>>();
  chapterSets.flat().forEach((chapter) => {
    const terms = (chapter as ReaderChapter).keyTerms;
    (Array.isArray(terms) ? terms : []).forEach((entry) => {
      const definition = normaliseTitle(clean(entry?.definition));
      if (!definition) return;
      const set = termsByDefinition.get(definition) ?? new Set<string>();
      set.add(normaliseTitle(clean(entry?.term)));
      termsByDefinition.set(definition, set);
    });
  });
  return new Set(Array.from(termsByDefinition).filter(([, terms]) => terms.size > 1).map(([definition]) => definition));
}

/** Sentences of the concept breakdown that recur in three or more chapters of the curriculum: template text. */
export function repeatedSentences(chapterSets: ChapterLike[][]): Set<string> {
  const chaptersBySentence = new Map<string, number>();
  chapterSets.flat().forEach((raw) => {
    const chapter = raw as ReaderChapter;
    const own = new Set<string>();
    (Array.isArray(chapter.narrative) ? chapter.narrative : []).forEach((item) => wholeSentences(clean(item?.text)).forEach((sentence) => own.add(normaliseTitle(sentence))));
    (Array.isArray(chapter.recap) ? chapter.recap : []).forEach((item) => wholeSentences(clean(item)).forEach((sentence) => own.add(normaliseTitle(sentence))));
    own.forEach((sentence) => chaptersBySentence.set(sentence, (chaptersBySentence.get(sentence) ?? 0) + 1));
  });
  return new Set(Array.from(chaptersBySentence).filter(([, count]) => count >= REPEATED_IN_CHAPTERS).map(([sentence]) => sentence));
}

// Depth standard ------------------------------------------------------------------------------

export type ChapterTier = 'introductory' | 'standard' | 'complex';

/** Recommended cards per chapter. A guideline derived from what the chapter displays, never a quota. */
export const DEPTH_STANDARD: Record<ChapterTier, { min: number; max: number }> = {
  introductory: { min: 6, max: 10 },
  standard: { min: 10, max: 15 },
  complex: { min: 15, max: 25 },
};

export interface DepthFilters {
  /** Curriculum-wide template definitions (`genericDefinitions`). */
  generic?: Set<string>;
  /** Curriculum-wide template sentences (`repeatedSentences`). */
  repeated?: Set<string>;
}

/**
 * How much the chapter teaches: the distinct, specific units its General Info displays (concept-breakdown
 * sections with the chapter's own text, worked examples, key terms with a real definition, concepts and
 * their named points, indicator and risk tiles, the key insight). Template text never counts, so a chapter
 * built from boilerplate is introductory and is flagged for enrichment rather than padded.
 */
export function chapterDepth(raw: ChapterLike, filters: DepthFilters = {}): { tier: ChapterTier; units: number; min: number; max: number } {
  const chapter = raw as ReaderChapter;
  const title = stripChapterNumber(clean(chapter.title)).replace(/^\d{1,2}\s+(?=\S)/, '');
  const generic = filters.generic ?? new Set<string>();
  const repeated = filters.repeated ?? new Set<string>();
  const narrative = (Array.isArray(chapter.narrative) ? chapter.narrative : []).filter((item) => {
    const text = clean(item?.text);
    if (EXAMPLE_LABEL.test(clean(item?.label))) return words(text) >= MIN_EXAMPLE_WORDS && words(text) <= MAX_EXAMPLE_WORDS && !INSTRUCTION.test(text);
    return words(specificAnswer(text, title, repeated)) >= MIN_ANSWER_WORDS;
  }).length;
  const terms = (Array.isArray(chapter.keyTerms) ? chapter.keyTerms : []).filter((entry) => clean(entry?.term) && !isFillerDefinition(clean(entry?.term), clean(entry?.definition), generic)).length;
  const concepts = Array.isArray(chapter.concepts) ? chapter.concepts : [];
  const points = concepts.reduce((sum, concept) => sum + (Array.isArray(concept?.points) ? concept.points : [])
    .filter((point: unknown) => { const label = /^([^:]{2,48}):\s+\S/.exec(clean(point)); return Boolean(label && words(label[1].trim()) >= 2); }).length, 0);
  const tiles = (Array.isArray(chapter.statTiles) ? chapter.statTiles : []).filter((tile) => STAT_SLOTS.some((slot) => slot.label.test(clean(tile?.label)))).length;
  const insight = words(firstSentence(clean(chapter.keyInsight))) >= MIN_INSIGHT_WORDS ? 1 : 0;
  const units = narrative + terms + concepts.length + points + tiles + insight;
  const tier: ChapterTier = units >= 18 ? 'complex' : units <= 10 ? 'introductory' : 'standard';
  return { tier, units, ...DEPTH_STANDARD[tier] };
}

/** Concept-breakdown sections beyond a definition (mechanism, driver, application, impact) that hold the chapter's own text. */
export function deeperSections(raw: ChapterLike, filters: DepthFilters = {}): Array<{ label: string; text: string }> {
  const chapter = raw as ReaderChapter;
  const title = stripChapterNumber(clean(chapter.title)).replace(/^\d{1,2}\s+(?=\S)/, '');
  return (Array.isArray(chapter.narrative) ? chapter.narrative : []).flatMap((item) => {
    const label = clean(item?.label);
    const slot = NARRATIVE_SLOTS.find((entry) => entry.label.test(label))?.slot;
    const text = slot && slot.stage !== 'recall' ? specificAnswer(clean(item?.text), title, filters.repeated ?? new Set()) : '';
    return words(text) >= MIN_ANSWER_WORDS ? [{ label, text }] : [];
  });
}

// Card slots ----------------------------------------------------------------------------------

interface Slot {
  prefix: string;
  /** Position in the General Info journey. */
  order: number;
  category: CardConceptCategory;
  stage: CardStage;
  front: (title: string, extra?: string) => string;
}

const q = (text: string) => `\u201c${text}\u201d`;
const DIFFICULTY: Record<CardStage, FlashcardContent['difficulty']> = { recall: 'introductory', mechanism: 'standard', implication: 'advanced', application: 'advanced' };

const slot = (value: Slot) => value;

const SLOT = {
  whatItIs: slot({ prefix: 'wi', order: 0, category: 'concept', stage: 'recall', front: (title) => `What is the core idea behind ${q(title)}?` }),
  insight: slot({ prefix: 'ki', order: 1, category: 'insight', stage: 'recall', front: (title) => `What is the key insight of ${q(title)}?` }),
  term: slot({ prefix: 'kt', order: 2, category: 'term', stage: 'recall', front: (_title, term) => `What does ${q(term ?? '')} mean?` }),
  conceptSummary: slot({ prefix: 'cs', order: 3, category: 'concept', stage: 'recall', front: (title, concept) => `In ${q(title)}, what is the main idea of ${q(concept ?? '')}?` }),
  conceptPoint: slot({ prefix: 'cp', order: 4, category: 'concept', stage: 'recall', front: (concept, label) => `In ${q(concept)}, what does ${q(label ?? '')} refer to?` }),
  mechanism: slot({ prefix: 'hw', order: 5, category: 'mechanism', stage: 'mechanism', front: (title) => `How does the mechanism behind ${q(title)} work?` }),
  driver: slot({ prefix: 'dr', order: 6, category: 'driver', stage: 'mechanism', front: (title) => `What is driving the developments behind ${q(title)}?` }),
  change: slot({ prefix: 'wc', order: 6, category: 'driver', stage: 'mechanism', front: (title) => `What is changing in ${q(title)}?` }),
  example: slot({ prefix: 'ex', order: 7, category: 'example', stage: 'application', front: (title, kind) => `Give a ${kind} example for ${q(title)}.` }),
  apply: slot({ prefix: 'ap', order: 8, category: 'application', stage: 'application', front: (title) => `How would you apply ${q(title)} in practice?` }),
  vietnam: slot({ prefix: 'va', order: 8, category: 'application', stage: 'application', front: (title) => `How does ${q(title)} apply in the Vietnam market?` }),
  indicators: slot({ prefix: 'kp', order: 9, category: 'indicator', stage: 'application', front: (title) => `Which KPIs should you watch for ${q(title)}?` }),
  risk: slot({ prefix: 'rk', order: 10, category: 'risk', stage: 'implication', front: (title) => `What is the main risk to watch in ${q(title)}?` }),
  impact: slot({ prefix: 'bi', order: 11, category: 'implication', stage: 'implication', front: (title) => `What is the business impact of ${q(title)}?` }),
  matters: slot({ prefix: 'wm', order: 12, category: 'implication', stage: 'implication', front: (title) => `Why does ${q(title)} matter commercially?` }),
  conceptWhy: slot({ prefix: 'cw', order: 13, category: 'implication', stage: 'implication', front: (title, concept) => `In ${q(title)}, why does ${q(concept ?? '')} matter?` }),
};

/** Concept-breakdown labels the reader shows, mapped to the card that asks about them. */
const NARRATIVE_SLOTS: Array<{ label: RegExp; slot: Slot }> = [
  { label: /^what it is$/i, slot: SLOT.whatItIs },
  { label: /^how it works$/i, slot: SLOT.mechanism },
  { label: /^why it is (?:happening|changing)$/i, slot: SLOT.driver },
  { label: /^what is changing$/i, slot: SLOT.change },
  { label: /^how to apply it$/i, slot: SLOT.apply },
  { label: /^vietnam application$/i, slot: SLOT.vietnam },
  { label: /^(?:business impact|how it affects businesses)$/i, slot: SLOT.impact },
  { label: /^why it matters(?: commercially)?$/i, slot: SLOT.matters },
];

/** Key-statistics tiles whose text is chapter-specific (indicators and risks, not framework counts). */
const STAT_SLOTS: Array<{ label: RegExp; slot: Slot; minWords: number }> = [
  { label: /^kpis to watch$/i, slot: SLOT.indicators, minWords: MIN_LIST_WORDS },
  { label: /^main risk$/i, slot: SLOT.risk, minWords: MIN_ANSWER_WORDS - 2 },
];

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** A sentence that carries the chapter's own claim: not template, not a heading restated, no figure, no hold marker. */
function specificSentence(sentence: string, title: string, repeated: Set<string>, allowFigures = false): boolean {
  const key = normaliseTitle(sentence);
  if (HELD_TEXT.test(sentence) || BOILERPLATE.test(sentence) || ABOUT_CHAPTER.test(sentence) || PLACEHOLDER.test(sentence) || (!allowFigures && STATISTIC.test(sentence)) || repeated.has(key)) return false;
  if (/^[a-z]/.test(sentence) || /\?["\u201d']?\.?$/.test(sentence) || /:$/.test(sentence) || words(sentence) < 4) return false;
  const heading = normaliseTitle(title).replace(/[?.!]+$/, '');
  return !(heading && (key.replace(/[?.!]+$/, '') === heading || (key.startsWith(heading) && RESTATES_HEADING.test(key.slice(heading.length).trim()))));
}

/** Marks a sentence some card already gives as its answer, so no later card in the curriculum repeats it. */
const sentenceKey = (sentence: string) => `sentence:${normaliseTitle(sentence)}`;
const markAnswered = (seen: Set<string>, answer: string) => wholeSentences(answer).forEach((sentence) => seen.add(sentenceKey(sentence)));

/** "Label: text. Label: text." lists several concepts; each is asked on its own card instead. */
const LISTS_CONCEPTS = /(?:^|[.;]\s+)[A-Z][^:.;]{1,48}:\s+\S/g;

/**
 * The chapter's own sentences from one section, up to a readable answer length. Only one unbroken run is taken,
 * so the answer always reads exactly as the chapter shows it.
 */
function specificAnswer(text: string, title: string, repeated: Set<string>, known: Set<string>[] = [], used: Set<string> = new Set()): string {
  const parts: string[] = [];
  let total = 0;
  const fresh = (sentence: string) => !used.has(sentenceKey(sentence)) && !known.some((other) => answersOverlap(contentTokens(sentence), other));
  for (const sentence of wholeSentences(clean(text))) {
    if (!specificSentence(sentence, title, repeated) || !fresh(sentence)) {
      if (parts.length) break;
      continue;
    }
    const count = words(sentence);
    if (total + count > MAX_ANSWER_WORDS) break;
    parts.push(sentence);
    total += count;
    if (total >= CONCISE_ANSWER_WORDS) break;
  }
  const answer = parts.join(' ');
  return (answer.match(LISTS_CONCEPTS) ?? []).length >= 2 ? '' : answer;
}

// Deck building -------------------------------------------------------------------------------

interface Builder {
  deck: FlashcardDeckContent;
  input: ChapterDeckInput;
  industry: string;
  file: string;
  /** Slot order of every card, so a chapter reads in General Info order whatever pass added it. */
  order: Map<string, number>;
}

function emptyDeck(input: ChapterDeckInput): Builder {
  const industry = slug(input.industryId);
  const moduleNumber = Math.max(0, input.moduleIndex) + 1;
  const deckId = `kt-${industry}-m${moduleNumber}-${slug(input.lessonTitle) || 'lesson'}`;
  const file = `reader:${input.identity}`;
  const deck: FlashcardDeckContent = {
    deckId,
    title: `${input.lessonTitle}: chapter cards`,
    description: `Recall the key insights, terms and examples from the ${input.lessonTitle} chapters.`,
    industryId: input.industryId,
    industryLabel: input.industryLabel,
    moduleId: `m${moduleNumber}`,
    moduleLabel: input.moduleLabel,
    lessonId: deckId,
    lessonTitle: input.lessonTitle,
    source: { file, moduleKey: '', lessonTitle: input.lessonTitle, startMarker: '', endMarker: '', chapterMarker: '', readAtSha256: 'runtime', readAt: 'runtime' },
    chapters: input.chapters.map((chapter, index) => ({
      chapterId: `${deckId}-ch${String(index + 1).padStart(2, '0')}`,
      number: index + 1,
      title: chapterTitle(input.chapters, index),
      sourceTitle: clean(chapter.title),
    })),
    cards: [],
    contentStatus: 'Generated from displayed chapter text',
    mappingNotes: ['Every answer is text its chapter displays: the Key insight, a Key terms definition, a concept-breakdown section, a concept point, an indicator tile or a worked example. Explanations are sentences from the same chapter.'],
    generated: true,
  };
  return { deck, input, industry, file, order: new Map() };
}

interface CardDraft {
  index: number;
  slot: Slot;
  id: string;
  front: string;
  back: string;
  explanation: string;
  terms: string[];
  section: string;
  excerpt?: string;
}

function pushCard(builder: Builder, draft: CardDraft) {
  const { chapterId, title } = builder.deck.chapters[draft.index];
  const objective = clean((builder.input.chapters[draft.index] as ReaderChapter).objective);
  builder.order.set(draft.id, draft.slot.order);
  builder.deck.cards.push({
    cardId: draft.id,
    deckId: builder.deck.deckId,
    industryId: builder.input.industryId,
    moduleId: builder.deck.moduleId,
    lessonId: builder.deck.deckId,
    chapterId,
    front: draft.front,
    back: draft.back,
    explanation: draft.explanation || `Shown in the chapter \u201c${title}\u201d.`,
    practicalExample: '',
    keyTerms: draft.terms,
    sourceRefs: [{ file: builder.file, chapterId, excerpt: draft.excerpt ?? draft.back }],
    origin: 'generated',
    conceptCategory: draft.slot.category,
    stage: draft.slot.stage,
    difficulty: DIFFICULTY[draft.slot.stage],
    sourceSection: draft.section,
    ...(objective ? { learningObjective: objective } : {}),
  });
}

/**
 * The original chapter cards: key insight, Key terms definitions and worked examples. Their IDs, wording
 * and duplicate rules are unchanged, so every learner's saved review history still matches. Next to an
 * authored deck (`avoid`) they are new cards, so they also follow the authored rules: no figures and no
 * repeat or paraphrase of an authored answer.
 */
function addCoreCards(builder: Builder, seen: Set<string>, generic: Set<string>, avoid?: Map<number, Set<string>[]>) {
  const { input, industry } = builder;
  const add = (index: number, slot: Slot, id: string, front: string, back: string, explanation: string, terms: string[], section: string) => {
    const cardId = unpositional(id);
    const answerKey = `answer:${normaliseTitle(back)}`;
    if (!slug(id) || seen.has(cardId) || seen.has(answerKey) || HELD_TEXT.test(back)) return;
    if (avoid && (STATISTIC.test(back) || (avoid.get(index) ?? []).some((other) => answersOverlap(contentTokens(back), other)))) return;
    seen.add(cardId);
    seen.add(answerKey);
    seen.add(`sig:${signatureOf(contentTokens(back))}`);
    markAnswered(seen, back);
    pushCard(builder, { index, slot, id: cardId, front, back, explanation, terms, section });
  };
  input.chapters.forEach((raw, index) => {
    const chapter = raw as ReaderChapter;
    if (isRestrictedChapter(chapter)) return;
    const title = builder.deck.chapters[index].title;
    const chapterSlug = slug(title);
    const insight = firstSentence(clean(chapter.keyInsight));
    if (words(insight) >= MIN_INSIGHT_WORDS && !BOILERPLATE.test(insight)) {
      add(index, SLOT.insight, `ki-${industry}-${chapterSlug}`, SLOT.insight.front(title), insight, explanationFor('', insight, chapter), [], 'Key insight');
    }
    (Array.isArray(chapter.keyTerms) ? chapter.keyTerms : []).forEach((entry) => {
      const term = clean(entry?.term);
      const definition = clean(entry?.definition);
      const termSlug = slug(term);
      if (!termSlug || seen.has(`term:${termSlug}`) || isFillerDefinition(term, definition, generic)) return;
      seen.add(`term:${termSlug}`);
      add(index, SLOT.term, `kt-${industry}-${termSlug}`, SLOT.term.front(title, term), definition, explanationFor(term, definition, chapter), [term], 'Key terms');
    });
    (Array.isArray(chapter.narrative) ? chapter.narrative : []).forEach((item) => {
      const label = clean(item?.label);
      const text = clean(item?.text);
      if (!EXAMPLE_LABEL.test(label) || words(text) < MIN_EXAMPLE_WORDS || words(text) > MAX_EXAMPLE_WORDS || INSTRUCTION.test(text)) return;
      const kind = /vietnam/i.test(label) ? 'Vietnam' : 'real-world';
      add(index, SLOT.example, `ex-${industry}-${chapterSlug}-${slug(label)}`, SLOT.example.front(title, kind), text, insight && normaliseTitle(insight) !== normaliseTitle(text) ? insight : explanationFor('', text, chapter), [], `Concept breakdown \u00b7 ${label}`);
    });
  });
}

/**
 * Deeper cards from the rest of General Info: what it is, how it works, what drives it, how to apply it,
 * indicators, risks and business impact, plus each concept and its points. A card is added only when the
 * section holds the chapter's own text (template sentences repeated across the curriculum, headings
 * restated, figures and hold markers are left out) and it does not repeat or paraphrase an answer the
 * chapter, the curriculum or an authored card already gives (`avoid`).
 */
function addDeepCards(builder: Builder, seen: Set<string>, repeated: Set<string>, avoid: Map<number, Set<string>[]> = new Map()) {
  const { input, industry } = builder;
  const answered = new Map<number, Set<string>[]>();
  builder.deck.cards.forEach((card) => {
    const index = builder.deck.chapters.findIndex((chapter) => chapter.chapterId === card.chapterId);
    answered.set(index, [...(answered.get(index) ?? []), contentTokens(card.back)]);
  });
  input.chapters.forEach((raw, index) => {
    const chapter = raw as ReaderChapter;
    if (isRestrictedChapter(chapter)) return;
    const title = builder.deck.chapters[index].title;
    const chapterSlug = slug(title);
    const known = [...(avoid.get(index) ?? []), ...(answered.get(index) ?? [])];
    const add = (draft: Omit<CardDraft, 'index' | 'explanation'>, minWords = MIN_ANSWER_WORDS) => {
      const cardId = unpositional(draft.id);
      const tokens = contentTokens(draft.back);
      const answerKey = `answer:${normaliseTitle(draft.back)}`;
      const signature = `sig:${signatureOf(tokens)}`;
      if (!slug(draft.id) || words(draft.back) < minWords || PLACEHOLDER.test(draft.back) || HELD_TEXT.test(draft.back)) return;
      if (seen.has(cardId) || seen.has(answerKey) || seen.has(signature) || known.some((other) => answersOverlap(tokens, other))) return;
      seen.add(cardId);
      seen.add(answerKey);
      seen.add(signature);
      markAnswered(seen, draft.back);
      known.push(tokens);
      pushCard(builder, { ...draft, index, id: cardId, explanation: supportingSentence(draft.back, chapter, title, repeated) });
    };
    // Narrower cards are accepted first (what it is, then each concept and point), so a section that bundles
    // several of them is the one left out as a repeat.
    const narrative = (Array.isArray(chapter.narrative) ? chapter.narrative : []).flatMap((item) => {
      const label = clean(item?.label);
      const match = NARRATIVE_SLOTS.find((entry) => entry.label.test(label));
      return match ? [{ label, slot: match.slot, text: clean(item?.text) }] : [];
    });
    const addSection = (entry: { label: string; slot: Slot; text: string }) => add({ slot: entry.slot, id: `${entry.slot.prefix}-${industry}-${chapterSlug}`, front: entry.slot.front(title), back: specificAnswer(entry.text, title, repeated, known, seen), terms: [], section: `Concept breakdown \u00b7 ${entry.label}` });
    narrative.filter((entry) => entry.slot === SLOT.whatItIs).forEach(addSection);
    (Array.isArray(chapter.concepts) ? chapter.concepts : []).forEach((concept) => {
      const conceptTitle = clean(concept?.title);
      const conceptSlug = slug(conceptTitle);
      if (!conceptSlug) return;
      const section = `What to understand \u00b7 ${conceptTitle}`;
      const summary = specificAnswer(clean(concept?.summary), title, repeated, known, seen);
      add({ slot: SLOT.conceptSummary, id: `cs-${industry}-${chapterSlug}-${conceptSlug}`, front: SLOT.conceptSummary.front(title, conceptTitle), back: summary, terms: [], section });
      (Array.isArray(concept?.points) ? concept.points : []).forEach((point: unknown) => {
        const text = clean(point);
        const labelled = /^([^:]{2,48}):\s+(.+)$/.exec(text);
        // A one-word label ("Proof:", "Signal:") is a note on the concept, not a concept a learner can be asked about.
        if (!labelled || words(labelled[1].trim()) < 2 || !specificSentence(capitalise(labelled[2]), title, repeated)) return;
        add({ slot: SLOT.conceptPoint, id: `cp-${industry}-${chapterSlug}-${slug(labelled[1])}`, front: SLOT.conceptPoint.front(conceptTitle, labelled[1].trim()), back: capitalise(labelled[2].trim()), terms: [], section, excerpt: text }, MIN_ANSWER_WORDS - 2);
      });
      const why = specificAnswer(clean(concept?.whyItMatters), title, repeated, known, seen);
      add({ slot: SLOT.conceptWhy, id: `cw-${industry}-${chapterSlug}-${conceptSlug}`, front: SLOT.conceptWhy.front(title, conceptTitle), back: why, terms: [], section });
    });
    narrative.filter((entry) => entry.slot !== SLOT.whatItIs).forEach(addSection);
    (Array.isArray(chapter.statTiles) ? chapter.statTiles : []).forEach((tile) => {
      const label = clean(tile?.label);
      const match = STAT_SLOTS.find((entry) => entry.label.test(label));
      const back = clean(tile?.description);
      if (!match || STATISTIC.test(back) || /^[a-z]/.test(back)) return;
      add({ slot: match.slot, id: `${match.slot.prefix}-${industry}-${chapterSlug}`, front: match.slot.front(title), back, terms: [], section: `Key statistics \u00b7 ${label}` }, match.minWords);
    });
  });
}

/** Which deeper cards stay when a very rich chapter offers more than its tier's ceiling: one card per section first. */
const KEEP_PRIORITY: Record<string, number> = { wi: 0, hw: 1, dr: 1, wc: 1, ap: 2, va: 2, bi: 3, wm: 3, kp: 4, rk: 4, cs: 5, cp: 6, cw: 7 };

/**
 * Holds every chapter to its recommended ceiling (`DEPTH_STANDARD`). Original cards are never removed; deeper
 * cards beyond the ceiling are left to the chapter, lowest priority first (concept "why it matters", then points).
 */
function capChapters(builder: Builder, original: Set<string>, filters: DepthFilters) {
  const keep = new Set<string>();
  builder.deck.chapters.forEach((chapter, index) => {
    const cards = builder.deck.cards.filter((card) => card.chapterId === chapter.chapterId);
    const { max } = chapterDepth(builder.input.chapters[index], filters);
    const core = cards.filter((card) => original.has(card.cardId));
    core.forEach((card) => keep.add(card.cardId));
    cards.filter((card) => !original.has(card.cardId))
      .map((card, position) => ({ card, position, rank: KEEP_PRIORITY[card.cardId.split('-')[0]] ?? 9 }))
      .sort((left, right) => left.rank - right.rank || left.position - right.position)
      .slice(0, Math.max(0, max - core.length))
      .forEach(({ card }) => keep.add(card.cardId));
  });
  builder.deck.cards = builder.deck.cards.filter((card) => keep.has(card.cardId));
}

/** Cards of each chapter in General Info order; chapters keep their own order. */
function orderCards(builder: Builder) {
  const chapterIndex = new Map(builder.deck.chapters.map((chapter, index) => [chapter.chapterId, index]));
  const position = new Map(builder.deck.cards.map((card, index) => [card.cardId, index]));
  builder.deck.cards.sort((left, right) => (chapterIndex.get(left.chapterId) ?? 0) - (chapterIndex.get(right.chapterId) ?? 0)
    || (builder.order.get(left.cardId) ?? 0) - (builder.order.get(right.cardId) ?? 0)
    || (position.get(left.cardId) ?? 0) - (position.get(right.cardId) ?? 0));
}

export interface ChapterDeckContext {
  /** IDs, answers and terms already used in the curriculum; shared so a card is never repeated across lessons. */
  seen: Set<string>;
  generic: Set<string>;
  repeated: Set<string>;
  /** Content words of answers authored cards already give, per chapter index of each lesson. */
  avoid?: Map<string, Map<number, Set<string>[]>>;
}

/**
 * Chapter cards for every lesson of one curriculum, in curriculum order. The original cards of every lesson
 * are placed first, so a deeper card can never take the place of one a learner has already studied.
 */
export function curriculumChapterDecks(inputs: ChapterDeckInput[], context: ChapterDeckContext): Map<string, FlashcardDeckContent> {
  const builders = inputs.map((input) => emptyDeck(input));
  builders.forEach((builder) => addCoreCards(builder, context.seen, context.generic, context.avoid ? context.avoid.get(builder.input.identity) ?? new Map() : undefined));
  const original = new Set(builders.flatMap((builder) => builder.deck.cards.map((card) => card.cardId)));
  builders.forEach((builder) => addDeepCards(builder, context.seen, context.repeated, context.avoid?.get(builder.input.identity)));
  builders.forEach((builder) => capChapters(builder, original, context));
  builders.forEach(orderCards);
  return new Map(builders.map((builder) => [builder.input.identity, builder.deck]));
}

/**
 * Cards for one lesson, built only from text its chapters display. Duplicates across the curriculum
 * (`seen`, by ID, answer and term), held chapters, template or shared definitions (`generic`), template
 * sentences (`repeated`), instructions in example slots and anything carrying a review marker are skipped.
 * IDs depend on the curriculum, the chapter title and the term or section, never on position, so
 * renumbering keeps review history.
 */
export function chapterLessonDeck(input: ChapterDeckInput, seen: Set<string>, generic: Set<string> = genericDefinitions([input.chapters]), repeated: Set<string> = repeatedSentences([input.chapters])): FlashcardDeckContent {
  return curriculumChapterDecks([input], { seen, generic, repeated }).get(input.identity)!;
}

/** Why a card cannot count as coverage, or null when it is a usable card. */
export function cardProblem(card: Pick<FlashcardContent, 'cardId' | 'front' | 'back' | 'explanation' | 'sourceRefs'>): string | null {
  const front = clean(card.front);
  const back = clean(card.back);
  if (!clean(card.cardId)) return 'missing card id';
  if (!front || !back) return 'empty question or answer';
  if (normaliseTitle(front) === normaliseTitle(back)) return 'question repeats the answer';
  if (PLACEHOLDER.test(front) || PLACEHOLDER.test(back)) return 'placeholder text';
  if (HELD_TEXT.test(back)) return 'answer carries a review marker';
  if (!clean(card.explanation)) return 'missing explanation';
  if (!Array.isArray(card.sourceRefs) || !card.sourceRefs.some((ref) => clean(ref?.excerpt))) return 'no source excerpt';
  return null;
}

/** Key used to spot the same question and answer reaching a deck twice. */
export const cardContentKey = (card: Pick<FlashcardContent, 'front' | 'back'>) => `${normaliseTitle(clean(card.front))}\u0000${normaliseTitle(clean(card.back))}`;
