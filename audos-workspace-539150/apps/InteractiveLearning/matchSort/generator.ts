import { isRestrictedChapter, stripChapterNumber } from '../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike } from '../../IndustryKnowledge/lessonFlowCore';
import type { CategorySortingActivity, ChapterRef, ConceptMatchingActivity, MatchSortActivity, SequenceBuilderActivity } from './types';
import { chapterIdOf, lessonIdOf, normaliseTitle, validateActivity } from './validation';

// Match & Sort activity intelligence: turns what a chapter's General Info displays into practice, for every
// curriculum, with no per-industry code and no runtime AI. Pipeline per chapter:
//   displayed text → concept extraction (Key terms, concept points, labelled points, Concept breakdown parts,
//   explicit groups, explicit ordered chains) → candidates (only the types the content supports) → validation
//   (`validateActivity` plus the quality rules below) → de-duplication → final set held to the chapter's guideline.
// Every prompt, answer, item and step is the chapter's own text; nothing is paraphrased, invented or carried across
// chapters or curricula. The same content always yields the same activities and IDs. A chapter whose content cannot
// support a valid activity gets none and is reported for enrichment (`enrichment`), never padded.

export const GENERATED_SOURCE_KEY = 'READER_GENERATED' as const;

export type GeneratedKind = 'key-terms' | 'process-steps' | 'concept-groups' | 'concept-roles';
/** Objective of the lesson-level fallback: sort statements by the chapter that makes them. */
export const LESSON_REVIEW_KIND = 'lesson-review';
export type ActivityTier = 'introductory' | 'standard' | 'complex';

/** Activities per chapter: introductory 1 (usually matching), standard up to 2, complex up to 3, each a distinct objective. */
export const ACTIVITY_GUIDELINE: Record<ActivityTier, number> = { introductory: 1, standard: 2, complex: 3 };

/** Selection order when a chapter supports more activities than its guideline allows. */
export const KIND_PRIORITY: GeneratedKind[] = ['key-terms', 'process-steps', 'concept-groups', 'concept-roles'];

export const MATCHING_MIN_PAIRS = 4;
export const MATCHING_MAX_PAIRS = 8;
export const SORTING_MIN_ITEMS = 6;
export const SORTING_MAX_ITEMS = 12;
export const SEQUENCE_MIN_STEPS = 4;
export const SEQUENCE_MAX_STEPS = 7;

type SourceChapter = ChapterLike & {
  keyTerms?: Array<{ term?: unknown; definition?: unknown }>;
  keyInsight?: unknown;
  narrative?: Array<{ label?: unknown; text?: unknown }>;
  concepts?: Array<{ title?: unknown; technicalLabel?: unknown; summary?: unknown; points?: unknown; whyItMatters?: unknown }>;
};

export interface GenerationInput {
  /** `<industryId>::<module title>::<lesson title>`, the lesson identity. */
  identity: string;
  /** The reader's deck for the lesson, after review holds (held chapters keep their place). */
  chapters: ChapterLike[];
  /** Authored activities offered for this lesson: generated ones never repeat or crowd them out. */
  authored?: MatchSortActivity[];
}

export interface RejectedCandidate {
  kind: GeneratedKind;
  reason: string;
}

export interface GeneratedChapterReport {
  chapterIndex: number;
  chapterTitle: string;
  held: boolean;
  tier: ActivityTier;
  /** Distinct teachable units the chapter displays (specific terms, explained parts, groups, points). */
  units: number;
  guideline: number;
  /** Authored activities that practise this chapter on their own (a lesson-wide sampler does not count). */
  authored: number;
  generated: string[];
  kinds: GeneratedKind[];
  rejected: RejectedCandidate[];
  /** Why the chapter needs richer source content for its own practice; null when it has some or is held. */
  enrichment: string | null;
  /** The lesson-level review activity that also cites this chapter (fallback, not chapter practice). */
  lessonReview: string | null;
}

export interface GeneratedLesson {
  activities: MatchSortActivity[];
  chapters: GeneratedChapterReport[];
}

// Text ----------------------------------------------------------------------------------------

const clean = (value: unknown) => (typeof value === 'string' || typeof value === 'number' ? String(value).replace(/\s+/g, ' ').trim() : '');
const words = (text: string) => text.split(' ').filter(Boolean).length;
const slug = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd')
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const key = (text: string) => normaliseTitle(text).replace(/[\u201c\u201d"]/g, '').replace(/[.;:!?]+$/, '');
/** Whole sentences; a stop inside a token ("2.5D", "e.g") does not end one, so every part is verbatim. */
const sentencesOf = (text: string) => (clean(text).match(/(?:[^.!?]|[.!?](?=\S))+[.!?]*(?=\s|$)/g) ?? []).map((part) => part.trim()).filter(Boolean);
const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const q = (text: string) => `\u201c${text}\u201d`;

function hash(text: string): string {
  let state = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    state ^= text.charCodeAt(index);
    state = Math.imul(state, 16777619) >>> 0;
  }
  return state.toString(36);
}

const STOP_WORDS = new Set('the and for are but not you all any can had her was one our out has his how its may new now see two who did get him let say she too use with that this from they will have what when your into than then them were been more most such only also over each very much many some make made does just like well which their there these those where while about after before could would should because between through during without within'.split(' '));
const tokens = (text: string) => new Set(clean(text).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ').split(' ').filter((token) => token.length > 2 && !STOP_WORDS.has(token)));

/** Two texts say the same thing: most of the shorter one's content words recur, or they mostly share them. */
export function textsOverlap(left: string, right: string): boolean {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return key(left) === key(right);
  let shared = 0;
  a.forEach((token) => { if (b.has(token)) shared += 1; });
  const smaller = Math.min(a.size, b.size);
  return (smaller >= 4 && shared / smaller >= 0.7) || shared / (a.size + b.size - shared) >= 0.55;
}

const containsPhrase = (text: string, phrase: string) => {
  const target = key(phrase);
  if (!target) return false;
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(key(text));
};

// Quality rules -------------------------------------------------------------------------------

/** Same rule as `validateActivity` (figures, currencies and dates go stale); generated statements also carry no digits. */
const FIGURE = /\d+(?:[.,]\d+)?\s?%|US\$|\bVND\b|\btrillion\b|\bbillion\b|\b(?:19|20)\d{2}\b/i;
const HELD_TEXT = /do not publish|verification required|under review/i;
const PLACEHOLDER = /\b(?:lorem ipsum|placeholder|tbd|todo|coming soon|to be (?:added|confirmed|written))\b/i;
/** Sentences the curriculum generators repeat in every chapter: they restate the chapter list, not a claim. */
const BOILERPLATE = /^(?:this (?:chapter|lesson|section) (?:focuses|examines|covers|isolates|explores|looks at|introduces|explains|describes|shows)|key dimensions include|for (?:decision-makers|practitioners(?: and firms)?|leaders|managers|investors|operators),|hypothetical\b|the (?:mechanism|framework|model|visual|diagram) connects)/i;
const TEMPLATE_PHRASE = /increasing the importance of this topic|make[s]? this topic strategically important|this chapter focuses specifically|core (?:[\w-]+ ){0,4}vocabulary|before acting\.?$/i;
const RESTATES_HEADING = /^(?:\?\s*)?(?:examines|explores|covers|focuses on|focuses specifically on|looks at|is about)\b/i;
/** Imperatives ("Define rent, occupancy and expense basis.") are instructions, not something the chapter states. */
const INSTRUCTION = /^(?:use|define|verify|track|assign|segment|normali[sz]e|check|match|compare|separate|apply|map|test|label|record|confirm|review|identify|list|ask|treat|keep|start|build|set|measure|link|connect|align|state|split|show|tie|write|prioriti[sz]e|avoid|do not|don\u2019t|don't|focus|consider|evaluate|assess|strengthen|ensure|plan|monitor|lock|weigh|judge|read|look|think|remember)\b/i;
/** "A core Life Insurance concept related to insurer." restates the term. */
const TEMPLATE_DEFINITION = /^an? (?:core|key|important) .{0,80}?(?:concept|term|idea) (?:related to|about|for) /i;
/** "A value-chain activity or capability." / "A relationship shaping value." could define any term. */
const GENERIC_DEFINITION = /^an? (?:[\w'\u2019-]+ ){0,3}(?:concept|activity|capability|relationship|idea|term|factor|dimension|driver|lever|metric|element|component)s?(?: (?:or|and) [\w'\u2019-]+)?(?: (?:shaping|in|of|for|that shapes|related to|affecting) [\w\s'\u2019-]{0,30})?\.?$/i;
/** One-word labels that annotate a concept ("Proof:", "Signal:") rather than name one. */
const NOTE_LABEL = /^(?:proof|signal|use|formula|note|example|examples|risk|evidence|source|sources|tip|watch|why|how|what|result|impact|test|check|lens|rule|takeaway|caution|warning|step|stage|vietnam|global|global scale|globally|scale|overview|context|background|summary|definition|products|scope|today|future|outlook)$/i;
/** A real example names a company, place or brand, or sets up a concrete case. */
const CONCRETE_EXAMPLE = /(?:^(?:a|an|for example|for instance|when|if|consider|suppose|imagine)\b)|(?:\S\s+(?:[A-Z][\w&'\u2019.-]*[a-z0-9][\w&'\u2019.-]*|[A-Z]{2,}\w*))/;
const LABELLED = /^([^:]{2,60}):\s+(.+)$/;
const VERB_LIST = /\b(?:is|are|was|were|has|have|can|will|may|must|should|uses?|depends?|means?|helps?|requires?|creates?|drives?|affects?)\b/i;

export type SentenceVerdict = 'ok' | 'figure' | 'held' | 'template' | 'instruction' | 'fragment' | 'repeated' | 'heading';

/** Whether a sentence carries the chapter's own claim and can be shown as practice content. */
export function sentenceVerdict(sentence: string, chapterTitle: string, repeated: Set<string> = new Set(), allowInstruction = false): SentenceVerdict {
  const text = clean(sentence);
  if (HELD_TEXT.test(text)) return 'held';
  if (FIGURE.test(text) || /\d/.test(text)) return 'figure';
  if (PLACEHOLDER.test(text) || BOILERPLATE.test(text) || TEMPLATE_PHRASE.test(text)) return 'template';
  if (repeated.has(key(text))) return 'repeated';
  if (!allowInstruction && INSTRUCTION.test(text)) return 'instruction';
  if (/^[a-z]/.test(text) || /\?["\u201d']?\.?$/.test(text) || /:$/.test(text) || words(text) < 4) return 'fragment';
  const heading = key(chapterTitle);
  const sentenceKey = key(text);
  if (heading && (sentenceKey === heading || (sentenceKey.startsWith(heading) && RESTATES_HEADING.test(sentenceKey.slice(heading.length).trim())))) return 'heading';
  return 'ok';
}

/**
 * A section's own statement: its first sentences, while each is specific, up to `maxWords`. When the first
 * sentence is template text the section was built from a template, so nothing later in it is used either.
 */
function sectionStatement(text: string, title: string, repeated: Set<string>, maxWords = 45, allowInstruction = false): string {
  const parts: string[] = [];
  let total = 0;
  for (const sentence of sentencesOf(text)) {
    if (sentenceVerdict(sentence, title, repeated, allowInstruction) !== 'ok') break;
    if (total + words(sentence) > maxWords) break;
    parts.push(sentence);
    total += words(sentence);
    if (total >= 25) break;
  }
  return parts.join(' ');
}

/** Sentences found in two or more chapters of the lesson are template text, not chapter content. */
function lessonRepeatedSentences(chapters: SourceChapter[]): Set<string> {
  const count = new Map<string, number>();
  chapters.forEach((chapter) => {
    if (isRestrictedChapter(chapter)) return;
    const own = new Set<string>();
    const add = (value: unknown) => sentencesOf(clean(value)).forEach((sentence) => own.add(key(sentence)));
    (Array.isArray(chapter.narrative) ? chapter.narrative : []).forEach((item) => add(item?.text));
    (Array.isArray(chapter.recap) ? chapter.recap : []).forEach(add);
    (Array.isArray(chapter.concepts) ? chapter.concepts : []).forEach((concept) => add(concept?.summary));
    add(chapter.keyInsight);
    own.forEach((sentence) => count.set(sentence, (count.get(sentence) ?? 0) + 1));
  });
  return new Set(Array.from(count).filter(([, chapters]) => chapters >= 2).map(([sentence]) => sentence));
}

/** Key-term definitions the lesson gives to two or more different terms say nothing specific. */
function lessonGenericDefinitions(chapters: SourceChapter[]): Set<string> {
  const terms = new Map<string, Set<string>>();
  chapters.forEach((chapter) => (Array.isArray(chapter.keyTerms) ? chapter.keyTerms : []).forEach((entry) => {
    const definition = key(clean(entry?.definition));
    if (!definition) return;
    terms.set(definition, (terms.get(definition) ?? new Set()).add(key(clean(entry?.term))));
  }));
  return new Set(Array.from(terms).filter(([, set]) => set.size > 1).map(([definition]) => definition));
}

export const chapterDisplayTitle = (chapters: ChapterLike[], index: number) => stripChapterNumber(clean(chapters[index]?.title)).replace(/^\d{1,2}\s+(?=\S)/, '') || `Chapter ${index + 1}`;

// Extraction ---------------------------------------------------------------------------------

interface PairSource {
  prompt: string;
  answer: string;
  /** Where the learner finds it in the chapter. */
  section: string;
  kind: 'key-term' | 'concept-point' | 'labelled-point';
}

interface Extracted {
  title: string;
  label: string;
  pairs: PairSource[];
  rejectedPairs: string[];
  roles: Array<{ family: RoleFamily; label: string; text: string }>;
  groups: GroupSource | null;
  groupProblem: string;
  chain: ChainSource | null;
  chainProblem: string;
  supporting: string[];
  insight: string;
  units: number;
}

/** `Label: text` segments inside one section ("Affordability: Price sensitivity …. Competition: …"). */
function labelledSegments(text: string): Array<{ label: string; text: string }> {
  return clean(text).split(/(?<=[.;])\s+(?=[A-Z][^:.;]{1,58}:\s)/).flatMap((segment) => {
    const match = LABELLED.exec(segment.trim());
    return match ? [{ label: match[1].trim(), text: match[2].trim() }] : [];
  });
}

/** A label names a concept ("Pasteurization", "Input costs"), not a claim ("Medicines are not ordinary goods"). */
const pairLabelOk = (label: string) => words(label) >= 1 && words(label) <= 5 && !NOTE_LABEL.test(label) && !FIGURE.test(label) && !HELD_TEXT.test(label)
  && !/[.!?,;]/.test(label) && !VERB_LIST.test(label) && !/\b(?:not|lean|leans|sit|sits|shift|shifts|matter|matters)\b/i.test(label);

function extractPairs(chapter: SourceChapter, title: string, repeated: Set<string>, generic: Set<string>, avoid: Set<string>, used: Set<string>): { pairs: PairSource[]; rejected: string[] } {
  const pairs: PairSource[] = [];
  const rejected: string[] = [];
  const add = (candidate: PairSource) => {
    const prompt = clean(candidate.prompt);
    const answer = clean(candidate.answer);
    if (!prompt || !answer) return void rejected.push('empty label');
    if (avoid.has(key(prompt))) return void rejected.push(`${q(prompt)} is already practised by an authored activity`);
    if (used.has(`p:${key(prompt)}`) || used.has(`a:${key(answer)}`)) return void rejected.push(`${q(prompt)} is already practised in an earlier chapter of the lesson`);
    if (pairs.some((pair) => key(pair.prompt) === key(prompt))) return void rejected.push(`${q(prompt)} appears twice`);
    if (pairs.some((pair) => containsPhrase(pair.prompt, prompt) || containsPhrase(prompt, pair.prompt))) return void rejected.push(`${q(prompt)}: overlaps another term (ambiguous)`);
    if (FIGURE.test(prompt) || FIGURE.test(answer) || /\d/.test(answer)) return void rejected.push(`${q(prompt)} relies on a figure or date`);
    if (containsPhrase(answer, prompt)) return void rejected.push(`${q(prompt)}: the answer repeats the term`);
    if (pairs.some((pair) => key(pair.answer) === key(answer) || textsOverlap(pair.answer, answer))) return void rejected.push(`${q(prompt)}: meaning overlaps another pair (ambiguous)`);
    pairs.push({ ...candidate, prompt, answer });
  };
  (Array.isArray(chapter.keyTerms) ? chapter.keyTerms : []).forEach((entry) => {
    const term = clean(entry?.term);
    const definition = clean(entry?.definition);
    if (!term || !definition) return void rejected.push('key term without a definition');
    if (TEMPLATE_DEFINITION.test(definition) || GENERIC_DEFINITION.test(definition) || generic.has(key(definition))) return void rejected.push(`${q(term)}: template definition`);
    if (words(definition) < 4 || HELD_TEXT.test(definition) || PLACEHOLDER.test(definition)) return void rejected.push(`${q(term)}: definition too thin`);
    if (words(term) > 6) return void rejected.push(`${q(term)}: not a term`);
    add({ prompt: term, answer: capitalise(definition), section: 'Key terms', kind: 'key-term' });
  });
  (Array.isArray(chapter.concepts) ? chapter.concepts : []).forEach((concept) => {
    const conceptTitle = clean(concept?.title);
    (Array.isArray(concept?.points) ? concept.points : []).forEach((point: unknown) => {
      const match = LABELLED.exec(clean(point));
      if (!match || !pairLabelOk(match[1].trim())) return;
      const text = capitalise(match[2].trim());
      const verdict = sentenceVerdict(sentencesOf(text)[0] ?? text, title, repeated, true);
      if (verdict !== 'ok' || words(text) < 5) return void rejected.push(`${q(match[1].trim())}: ${verdict === 'ok' ? 'description too thin' : verdict}`);
      add({ prompt: match[1].trim(), answer: sentencesOf(text).slice(0, 2).join(' '), section: conceptTitle ? `What to understand \u00b7 ${conceptTitle}` : 'What to understand', kind: 'concept-point' });
    });
  });
  (Array.isArray(chapter.narrative) ? chapter.narrative : []).forEach((item) => {
    const label = clean(item?.label);
    labelledSegments(clean(item?.text)).forEach((segment) => {
      if (!pairLabelOk(segment.label)) return;
      const text = capitalise(segment.text);
      if (listItems(segment.text).length) return;
      const verdict = sentenceVerdict(sentencesOf(text)[0] ?? text, title, repeated, true);
      if (verdict !== 'ok' || words(text) < 5) return;
      add({ prompt: segment.label, answer: sentencesOf(text).slice(0, 2).join(' '), section: `Concept breakdown \u00b7 ${label}`, kind: 'labelled-point' });
    });
  });
  return { pairs, rejected };
}

export type RoleFamily = 'definition' | 'driver' | 'mechanism' | 'impact' | 'application' | 'example';

const ROLE_LABELS: Array<{ label: RegExp; family: RoleFamily }> = [
  { label: /^what it is$/i, family: 'definition' },
  { label: /^(?:why it is (?:happening|changing)|what is changing)$/i, family: 'driver' },
  { label: /^how it works$/i, family: 'mechanism' },
  { label: /^(?:business impact|how it affects businesses|why it matters(?: commercially)?)$/i, family: 'impact' },
  { label: /^(?:how to apply it|vietnam application)$/i, family: 'application' },
  { label: /^(?:real-world example|global example|example|vietnam example)$/i, family: 'example' },
];

const ROLE_COPY: Record<RoleFamily, { explanation: string; hint: string }> = {
  definition: { explanation: 'This statement defines the topic: what it is and what it covers.', hint: 'Look for the statement that says what the topic is, not why it matters or a case of it.' },
  driver: { explanation: 'This statement gives the cause: why the topic is gaining importance or changing.', hint: 'Look for the statement that explains a cause or a trend behind the topic.' },
  mechanism: { explanation: 'This statement explains how it works: the steps or relationships behind it.', hint: 'Look for the statement that describes how the parts connect or operate.' },
  impact: { explanation: 'This statement gives the consequence for businesses and decision-makers.', hint: 'Look for the statement about consequences for a business.' },
  application: { explanation: 'This statement shows how to put the idea to work.', hint: 'Look for the statement that tells you what to do with the idea.' },
  example: { explanation: 'This statement is a concrete case that illustrates the idea.', hint: 'Look for the statement that describes one specific case.' },
};

function extractRoles(chapter: SourceChapter, title: string, repeated: Set<string>): Extracted['roles'] {
  const roles: Extracted['roles'] = [];
  (Array.isArray(chapter.narrative) ? chapter.narrative : []).forEach((item) => {
    const label = clean(item?.label);
    const family = ROLE_LABELS.find((entry) => entry.label.test(label))?.family;
    if (!family || roles.some((role) => role.family === family)) return;
    const raw = clean(item?.text);
    if ((raw.match(/(?:^|[.;]\s+)[A-Z][^:.;]{1,48}:\s+\S/g) ?? []).length >= 2) return;
    const text = sectionStatement(raw, title, repeated, 45, family === 'application');
    if (words(text) < 7 || roles.some((role) => textsOverlap(role.text, text))) return;
    if (family === 'example' && !CONCRETE_EXAMPLE.test(text)) return;
    roles.push({ family, label, text });
  });
  return roles;
}

/** The items of a plain list ("liquid milk, milk powder and yogurt"); empty when the text is a sentence, not a list. */
function listItems(text: string): string[] {
  const body = clean(text).replace(/\.$/, '');
  if (VERB_LIST.test(body) || FIGURE.test(body) || /[.;:!?]/.test(body)) return [];
  const parts = body.split(/,\s*(?:and\s+|or\s+)?|\s+(?:and|or)\s+(?=[^,]+$)/).map((part) => clean(part).replace(/^(?:and|or)\s+/i, '')).filter(Boolean);
  return parts.length >= 2 && parts.every((part) => words(part) <= 5) ? parts.map(capitalise) : [];
}

interface GroupSource {
  categories: Array<{ label: string; description: string; items: Array<{ text: string; detail: string }> }>;
  evidence: string;
  section: string;
}

function extractGroups(chapter: SourceChapter, title: string, repeated: Set<string>, avoid: Set<string>): { groups: GroupSource | null; problem: string } {
  const finish = (categories: GroupSource['categories'], evidence: string, section: string): { groups: GroupSource | null; problem: string } => {
    const seen = new Map<string, number>();
    categories.forEach((category) => category.items.forEach((item) => seen.set(key(item.text), (seen.get(key(item.text)) ?? 0) + 1)));
    let usable = categories.map((category) => ({
      ...category,
      items: category.items.filter((item) => seen.get(key(item.text)) === 1 && !avoid.has(key(item.text))
        && !categories.some((other) => other !== category && containsPhrase(item.text, other.label))),
    })).filter((category) => category.items.length >= 2).slice(0, 4);
    if (usable.length < 2) return { groups: null, problem: 'fewer than two groups with two unambiguous items each' };
    const perCategory = Math.max(2, Math.floor(SORTING_MAX_ITEMS / usable.length));
    usable = usable.map((category) => ({ ...category, items: category.items.slice(0, Math.min(perCategory, 4)) }));
    const total = usable.reduce((sum, category) => sum + category.items.length, 0);
    if (total < SORTING_MIN_ITEMS) return { groups: null, problem: `only ${total} unambiguous items across the groups (needs ${SORTING_MIN_ITEMS})` };
    return { groups: { categories: usable, evidence, section }, problem: '' };
  };
  const concepts = (Array.isArray(chapter.concepts) ? chapter.concepts : []).filter((concept) => clean(concept?.title) && Array.isArray(concept?.points) && concept.points.length >= 2);
  if (concepts.length >= 2) {
    const titles = new Set(concepts.map((concept) => key(clean(concept.title))));
    if (titles.size === concepts.length) {
      const categories = concepts.map((concept) => {
        const label = clean(concept.title);
        const summary = sectionStatement(clean(concept.summary), title, repeated, 30);
        const technical = clean(concept.technicalLabel);
        return {
          label,
          description: summary || (technical && !FIGURE.test(technical) ? `${technical} the chapter lists under this heading.` : `Points the chapter lists under ${q(label)}.`),
          items: (concept.points as unknown[]).flatMap((point) => {
            const text = clean(point);
            const match = LABELLED.exec(text);
            if (match && pairLabelOk(match[1].trim())) {
              const detail = capitalise(match[2].trim());
              return [{ text: match[1].trim(), detail: FIGURE.test(detail) ? '' : sentencesOf(detail)[0] ?? '' }];
            }
            return words(text) <= 20 && sentenceVerdict(text, title, repeated, true) === 'ok' ? [{ text, detail: '' }] : [];
          }),
        };
      });
      const result = finish(categories, `${q(title)} groups these points under ${categories.map((category) => q(category.label)).join(', ')}.`, 'What to understand');
      if (result.groups) return result;
    }
  }
  for (const item of Array.isArray(chapter.narrative) ? chapter.narrative : []) {
    const segments = labelledSegments(clean(item?.text)).filter((segment) => pairLabelOk(segment.label));
    if (segments.length < 2) continue;
    const categories = segments.map((segment) => ({
      label: segment.label,
      description: `What the chapter lists under ${q(segment.label)}.`,
      items: listItems(segment.text).map((part) => ({ text: part, detail: '' })),
    }));
    const result = finish(categories, `${q(title)} lists these under ${categories.map((category) => q(category.label)).join(', ')}.`, `Concept breakdown \u00b7 ${clean(item?.label)}`);
    if (result.groups) return result;
  }
  return { groups: null, problem: concepts.length >= 2 ? 'the concept groups overlap or hold too few items' : 'no explicit classification (two or more named groups of points)' };
}

interface ChainSource {
  label: string;
  steps: string[];
  evidence: string;
  section: string;
}

const ORDINAL = /^(first|second|third|fourth|fifth|sixth|seventh|then|next|after that|finally|lastly)\b[,:]?\s*/i;

function extractChain(chapter: SourceChapter, title: string, repeated: Set<string>): { chain: ChainSource | null; problem: string } {
  const texts: Array<{ text: string; section: string }> = [
    ...(Array.isArray(chapter.narrative) ? chapter.narrative : []).map((item) => ({ text: clean(item?.text), section: `Concept breakdown \u00b7 ${clean(item?.label)}` })),
    ...(Array.isArray(chapter.concepts) ? chapter.concepts : []).flatMap((concept) => [clean(concept?.summary), ...(Array.isArray(concept?.points) ? concept.points.map(clean) : [])]
      .map((text) => ({ text, section: `What to understand \u00b7 ${clean(concept?.title)}` }))),
  ];
  let problem = 'no explicit ordered process (an arrow chain, numbered steps or First/Then/Finally stages)';
  for (const { text, section } of texts) {
    if (!text || repeated.has(key(text))) continue;
    for (const sentence of text.split(/(?<=[.;])\s+(?=[A-Z])/)) {
      const arrows = sentence.split(/\s*(?:\u2192|->|\u279c|\u21d2)\s*/);
      if (arrows.length < 4) continue;
      const labelled = LABELLED.exec(arrows[0]);
      const label = labelled && words(labelled[1]) <= 5 ? labelled[1].trim() : '';
      const steps = (label ? [labelled![2], ...arrows.slice(1)] : arrows).map((step) => capitalise(clean(step).replace(/[.;]+$/, '')));
      if (steps.length > SEQUENCE_MAX_STEPS) { problem = `the chain has ${steps.length} stages (more than ${SEQUENCE_MAX_STEPS})`; continue; }
      if (steps.some((step) => !step || words(step) > 10 || FIGURE.test(step) || HELD_TEXT.test(step))) { problem = 'a chain stage is empty, too long or relies on a figure'; continue; }
      if (new Set(steps.map(key)).size !== steps.length) { problem = 'the chain repeats a stage'; continue; }
      return { chain: { label, steps, evidence: sentence.trim(), section }, problem: '' };
    }
    const numbered = Array.from(text.matchAll(/\bStep\s+(\d+)\s*[:.]\s*([^]*?)(?=\s*\bStep\s+\d+\s*[:.]|$)/gi)).map((match) => ({ number: Number(match[1]), text: clean(match[2]) }));
    if (numbered.length >= SEQUENCE_MIN_STEPS) {
      const steps = numbered.map((step) => capitalise((sentencesOf(step.text)[0] ?? step.text).replace(/[.;]+$/, '')));
      const consecutive = numbered.every((step, index) => step.number === index + 1);
      if (consecutive && steps.length <= SEQUENCE_MAX_STEPS && steps.every((step) => words(step) >= 2 && words(step) <= 20 && !FIGURE.test(step))) {
        return { chain: { label: '', steps, evidence: text, section }, problem: '' };
      }
      problem = 'the numbered steps are not consecutive, too long or rely on a figure';
    }
    const ordinals = sentencesOf(text);
    const start = ordinals.findIndex((sentence) => /^first\b/i.test(sentence));
    if (start >= 0) {
      const run: string[] = [];
      for (const sentence of ordinals.slice(start)) {
        if (!ORDINAL.test(sentence)) break;
        run.push(capitalise(sentence.replace(ORDINAL, '').replace(/[.;]+$/, '')));
      }
      if (run.length >= SEQUENCE_MIN_STEPS && run.length <= SEQUENCE_MAX_STEPS && run.every((step) => words(step) >= 2 && words(step) <= 20 && !FIGURE.test(step))) {
        return { chain: { label: '', steps: run, evidence: text, section }, problem: '' };
      }
    }
  }
  return { chain: null, problem };
}

function extract(chapter: SourceChapter, index: number, chapters: ChapterLike[], repeated: Set<string>, generic: Set<string>, avoid: Set<string>, used: Set<string>): Extracted {
  const title = chapterDisplayTitle(chapters, index);
  const label = FIGURE.test(title) ? `Chapter ${index + 1}` : title;
  const { pairs, rejected } = extractPairs(chapter, title, repeated, generic, avoid, used);
  const roles = extractRoles(chapter, title, repeated);
  const { groups, problem: groupProblem } = extractGroups(chapter, title, repeated, avoid);
  const { chain, problem: chainProblem } = extractChain(chapter, title, repeated);
  const supporting = [clean(chapter.keyInsight), ...(Array.isArray(chapter.recap) ? chapter.recap.map(clean) : []),
    ...(Array.isArray(chapter.narrative) ? chapter.narrative.filter((item) => !ROLE_LABELS[4].label.test(clean(item?.label)) && !ROLE_LABELS[5].label.test(clean(item?.label))).map((item) => clean(item?.text)) : [])]
    .flatMap(sentencesOf).filter((sentence) => sentenceVerdict(sentence, title, repeated) === 'ok' && (sentence.match(/,/g) ?? []).length < 4);
  const insight = sectionStatement(clean(chapter.keyInsight), title, repeated, 40);
  const concepts = Array.isArray(chapter.concepts) ? chapter.concepts.length : 0;
  const units = pairs.length + roles.length + concepts + (groups ? 1 : 0) + (chain ? 2 : 0);
  return { title, label, pairs, rejectedPairs: rejected, roles, groups, groupProblem, chain, chainProblem, supporting, insight, units };
}

export function activityTier(units: number): ActivityTier {
  if (units >= 14) return 'complex';
  return units <= 6 ? 'introductory' : 'standard';
}

// Candidates ---------------------------------------------------------------------------------

interface Context {
  identity: string;
  industryId: string;
  moduleId: string;
  lessonTitle: string;
  chapterIndex: number;
  rawTitle: string;
}

function base(context: Context, extracted: Extracted, kind: GeneratedKind, answerKey: string, grounding: string) {
  const ref: ChapterRef = {
    sourceModuleKey: GENERATED_SOURCE_KEY,
    lessonTitle: context.lessonTitle,
    chapterTitle: context.rawTitle,
    chapterIndex: context.chapterIndex,
    sourceIds: [`reader:${context.identity}`],
    grounding,
  };
  return {
    activityId: `ms-gen-${slug(context.industryId)}-${hash(context.identity)}-${slug(extracted.title).slice(0, 48) || `chapter-${context.chapterIndex + 1}`}-${kind}-${hash(answerKey)}`,
    industryId: context.industryId,
    moduleId: context.moduleId,
    lessonId: lessonIdOf(ref),
    chapterId: chapterIdOf(ref),
    sourceRefs: [ref],
    origin: 'generated' as const,
    objectiveKey: kind,
  };
}

const sourceLine = (pair: PairSource, label: string) => (pair.kind === 'key-term'
  ? `${q(label)} defines ${q(pair.prompt)} this way in its Key terms.`
  : `${q(label)} explains ${q(pair.prompt)} this way under ${q(pair.section.replace(/^.*\u00b7\s*/, ''))}.`);

const supportingFor = (prompt: string, answer: string, extracted: Extracted) => extracted.supporting
  .find((sentence) => containsPhrase(sentence, prompt) && !textsOverlap(sentence, answer)) ?? '';

function keyTermsCandidate(context: Context, extracted: Extracted): ConceptMatchingActivity | string {
  const pairs = extracted.pairs.slice(0, MATCHING_MAX_PAIRS);
  if (pairs.length < MATCHING_MIN_PAIRS) {
    return `only ${pairs.length} unambiguous term\u2013meaning pair${pairs.length === 1 ? '' : 's'} (needs ${MATCHING_MIN_PAIRS})${extracted.rejectedPairs.length ? `; left out: ${extracted.rejectedPairs.slice(0, 3).join('; ')}` : ''}`;
  }
  const termsOnly = pairs.every((pair) => pair.kind === 'key-term');
  const answerKey = pairs.map((pair) => `${key(pair.prompt)}=${key(pair.answer)}`).join('|');
  return {
    ...base(context, extracted, 'key-terms', answerKey, pairs.map((pair) => `${pair.prompt}: ${pair.answer}`).join(' | ')),
    type: 'concept-matching',
    title: `${termsOnly ? 'Match the key terms' : 'Match the concepts'}: ${extracted.label}`,
    learningObjective: `Connect each ${termsOnly ? 'key term' : 'concept'} in ${q(extracted.label)} with the meaning the chapter gives it.`,
    instructions: `Select a ${termsOnly ? 'term' : 'concept'}, then select the meaning that matches it. Check your answers when every one is paired.`,
    summary: extracted.insight || `You can now explain the core ideas of ${q(extracted.label)} in the chapter's own terms.`,
    promptLabel: termsOnly ? 'Key term' : 'Concept',
    answerLabel: 'Meaning',
    items: {
      prompts: pairs.map((pair, index) => ({ id: `t${index + 1}`, text: pair.prompt })),
      answers: pairs.map((pair, index) => ({ id: `d${index + 1}`, text: pair.answer })),
    },
    pairs: pairs.map((pair, index) => {
      const support = supportingFor(pair.prompt, pair.answer, extracted);
      return {
        id: `p${index + 1}`,
        promptId: `t${index + 1}`,
        answerId: `d${index + 1}`,
        explanation: `${sourceLine(pair, extracted.label)}${support ? ` ${support}` : ''}`,
        hint: pair.kind === 'key-term'
          ? `Re-read how ${q(extracted.label)} uses ${q(pair.prompt)}, then pick the meaning that fits it.`
          : `Re-read ${q(pair.prompt)} under ${pair.section.replace(/^.*\u00b7\s*/, '')}, then pick the meaning that fits it.`,
      };
    }),
  };
}

function rolesCandidate(context: Context, extracted: Extracted, practised: string[] = []): ConceptMatchingActivity | string {
  const roles = extracted.roles.filter((role) => !practised.some((text) => textsOverlap(text, role.text)));
  if (roles.length < MATCHING_MIN_PAIRS) {
    return `only ${roles.length} Concept breakdown part${roles.length === 1 ? '' : 's'} with the chapter's own text (needs ${MATCHING_MIN_PAIRS}; template, figure and instruction text is left out)`;
  }
  const answerKey = roles.map((role) => `${role.family}=${key(role.text)}`).join('|');
  return {
    ...base(context, extracted, 'concept-roles', answerKey, roles.map((role) => `${role.label}: ${role.text}`).join(' | ')),
    type: 'concept-matching',
    title: `How the explanation fits together: ${extracted.label}`,
    learningObjective: `Tell apart what ${q(extracted.label)} is, what drives it, how it plays out and what illustrates it.`,
    instructions: 'Select a part of the explanation, then select the statement from the chapter that gives it. Check your answers when every part is paired.',
    summary: extracted.insight || `You can now separate the definition, causes, consequences and examples in ${q(extracted.label)}.`,
    promptLabel: 'Part of the explanation',
    answerLabel: 'Statement from the chapter',
    items: {
      prompts: roles.map((role, index) => ({ id: `r${index + 1}`, text: role.label })),
      answers: roles.map((role, index) => ({ id: `s${index + 1}`, text: role.text })),
    },
    pairs: roles.map((role, index) => ({
      id: `p${index + 1}`,
      promptId: `r${index + 1}`,
      answerId: `s${index + 1}`,
      explanation: `${ROLE_COPY[role.family].explanation} The chapter gives it under ${q(role.label)}.`,
      hint: ROLE_COPY[role.family].hint,
    })),
  };
}

function groupsCandidate(context: Context, extracted: Extracted): CategorySortingActivity | string {
  const groups = extracted.groups;
  if (!groups) return extracted.groupProblem;
  const categories = groups.categories.map((category, index) => ({ id: `c${index + 1}`, label: category.label, description: category.description }));
  const hintFor = (label: string) => [
    `Re-read how ${q(extracted.label)} groups its points, then compare this item with each group's description.`,
    'Compare this item with each group\u2019s description before placing it.',
  ].find((hint) => !containsPhrase(hint, label)) ?? 'Compare this item with each description before placing it.';
  const items = groups.categories.flatMap((category, categoryIndex) => category.items.map((item) => ({ category, categoryIndex, item })))
    .map(({ category, categoryIndex, item }, index) => ({
      id: `i${index + 1}`,
      text: item.text,
      categoryId: `c${categoryIndex + 1}`,
      explanation: `The chapter lists ${q(item.text)} under ${q(category.label)}.${item.detail ? ` ${item.detail}` : ''}`,
      hint: hintFor(category.label),
    }));
  const answerKey = groups.categories.map((category) => `${key(category.label)}:${category.items.map((item) => key(item.text)).join(',')}`).join('|');
  return {
    ...base(context, extracted, 'concept-groups', answerKey, groups.evidence),
    type: 'category-sorting',
    title: `Sort into groups: ${extracted.label}`,
    learningObjective: `Classify each point by the group ${q(extracted.label)} places it in.`,
    instructions: 'Select an item, then select the group it belongs to. Check your answers when every item is placed.',
    summary: extracted.insight || `You can now place each point of ${q(extracted.label)} in the group the chapter gives it.`,
    categories,
    items,
  };
}

function stepsCandidate(context: Context, extracted: Extracted): SequenceBuilderActivity | string {
  const chain = extracted.chain;
  if (!chain) return extracted.chainProblem;
  const steps = chain.steps;
  const name = chain.label ? chain.label.replace(/\.$/, '') : 'the process';
  const answerKey = steps.map(key).join('>');
  return {
    ...base(context, extracted, 'process-steps', answerKey, chain.evidence),
    type: 'sequence-builder',
    title: `Put the stages in order: ${chain.label ? `${chain.label} \u00b7 ` : ''}${extracted.label}`,
    learningObjective: `Order the stages of ${name.toLowerCase() === 'the process' ? 'the process' : q(name)} as ${q(extracted.label)} presents them.`,
    instructions: 'Arrange the stages from first to last, then check your order.',
    summary: extracted.insight || `You can now trace ${name.toLowerCase() === 'the process' ? 'the process' : q(name)} from start to finish.`,
    isSequentialProcess: true,
    sequenceEvidence: `${q(extracted.label)} presents these as consecutive stages, each leading to the next (${chain.section}).`,
    items: steps.map((step, index) => ({
      id: `s${index + 1}`,
      text: step,
      explanation: index === 0
        ? `It starts the sequence and leads to ${q(steps[1])}.`
        : index === steps.length - 1 ? `It ends the sequence, after ${q(steps[index - 1])}.` : `It follows ${q(steps[index - 1])} and leads to ${q(steps[index + 1])}.`,
      hint: 'Ask what must already have happened before this stage can start.',
    })),
    correctSequence: steps.map((_, index) => `s${index + 1}`),
  };
}

const BUILDERS: Record<GeneratedKind, (context: Context, extracted: Extracted, practised: string[]) => MatchSortActivity | string> = {
  'key-terms': keyTermsCandidate,
  'process-steps': stepsCandidate,
  'concept-groups': groupsCandidate,
  'concept-roles': rolesCandidate,
};

/** Quality problems `validateActivity` does not check (used for generated activities and the coverage checker). */
export function qualityProblems(activity: MatchSortActivity): string[] {
  const problems: string[] = [];
  if (activity.type === 'concept-matching') {
    const prompts = activity.items.prompts.map((item) => key(item.text));
    const answers = activity.items.answers.map((item) => item.text);
    if ([...prompts, ...answers.map(key)].some((text) => !text)) problems.push('empty item');
    if (new Set(prompts).size !== prompts.length) problems.push('duplicate prompt');
    if (new Set(answers.map(key)).size !== answers.length) problems.push('duplicate answer (ambiguous pair)');
    else if (answers.some((answer, index) => answers.some((other, position) => position > index && textsOverlap(answer, other)))) problems.push('overlapping answers (ambiguous pair)');
  } else if (activity.type === 'category-sorting') {
    const items = activity.items.map((item) => key(item.text));
    if ([...items, ...activity.categories.map((category) => key(category.label))].some((text) => !text)) problems.push('empty item or category');
    if (new Set(items).size !== items.length) problems.push('the same item sits in two groups (ambiguous category)');
    if (new Set(activity.categories.map((category) => key(category.label))).size !== activity.categories.length) problems.push('duplicate category');
  } else {
    const steps = activity.items.map((step) => key(step.text));
    if (steps.some((text) => !text)) problems.push('empty step');
    if (new Set(steps).size !== steps.length) problems.push('duplicate step (invalid sequence)');
  }
  return problems;
}

/** Stricter size rules for generated activities (authored ones keep their own reviewed sizes). */
function generatedSizeProblem(activity: MatchSortActivity): string | null {
  if (activity.type === 'concept-matching' && (activity.pairs.length < MATCHING_MIN_PAIRS || activity.pairs.length > MATCHING_MAX_PAIRS)) return `matching needs ${MATCHING_MIN_PAIRS}\u2013${MATCHING_MAX_PAIRS} pairs`;
  if (activity.type === 'category-sorting' && (activity.categories.length < 2 || activity.categories.length > 4 || activity.items.length < SORTING_MIN_ITEMS || activity.items.length > SORTING_MAX_ITEMS)) return `sorting needs 2\u20134 groups and ${SORTING_MIN_ITEMS}\u2013${SORTING_MAX_ITEMS} items`;
  if (activity.type === 'sequence-builder' && (activity.items.length < SEQUENCE_MIN_STEPS || activity.items.length > SEQUENCE_MAX_STEPS)) return `a sequence needs ${SEQUENCE_MIN_STEPS}\u2013${SEQUENCE_MAX_STEPS} stages`;
  return null;
}

// Lesson ---------------------------------------------------------------------------------------

const splitIdentity = (identity: string) => {
  const [industryId = '', moduleTitle = '', ...rest] = identity.split('::');
  return { industryId, moduleTitle, lessonTitle: rest.join('::') };
};

/**
 * A lesson-wide sampler (one pair per chapter across three or more chapters, like the FMCG lesson key-term
 * activities) revises the lesson; it does not practise any one chapter, so it never blocks chapter practice.
 */
export function isLessonSampler(activity: MatchSortActivity): boolean {
  const chapters = new Set(activity.sourceRefs.map((ref) => `${normaliseTitle(ref.lessonTitle)}#${ref.chapterIndex}`));
  return activity.type === 'concept-matching' && chapters.size >= 3 && activity.pairs.length <= chapters.size;
}

function authoredText(activity: MatchSortActivity): string[] {
  if (activity.type === 'concept-matching') return activity.items.prompts.map((item) => item.text);
  if (activity.type === 'category-sorting') return activity.items.map((item) => item.text);
  return activity.items.map((item) => item.text);
}

/**
 * Activities for every chapter of one lesson. Deterministic: the result depends only on the lesson identity, its
 * chapters' displayed text and the authored activities, so every entry point (reader, chooser, coverage check)
 * builds the same activities with the same IDs. A lesson with authored chapter practice is curated and is left
 * exactly as authored; only lessons with no authored activity, or only a lesson-wide sampler, are generated.
 */
export function generateLessonActivities(input: GenerationInput): GeneratedLesson {
  const chapters = (Array.isArray(input.chapters) ? input.chapters : []) as SourceChapter[];
  const { industryId, moduleTitle, lessonTitle } = splitIdentity(input.identity);
  const repeated = lessonRepeatedSentences(chapters);
  const generic = lessonGenericDefinitions(chapters);
  const lessonKey = normaliseTitle(lessonTitle);
  const authored = (input.authored ?? []).filter((activity) => activity.sourceRefs.some((ref) => normaliseTitle(ref.lessonTitle) === lessonKey));
  /** A curated lesson (authored chapter practice) keeps exactly its authored activities, counts and order. */
  const curated = authored.some((activity) => !isLessonSampler(activity));
  const activities: MatchSortActivity[] = [];
  const used = new Set<string>();
  const reports = chapters.map((chapter, chapterIndex): GeneratedChapterReport => {
    const title = chapterDisplayTitle(chapters, chapterIndex);
    const citing = authored.filter((activity) => activity.sourceRefs.some((ref) => ref.chapterIndex === chapterIndex && normaliseTitle(ref.lessonTitle) === lessonKey));
    const own = citing.filter((activity) => !isLessonSampler(activity));
    const report: GeneratedChapterReport = { chapterIndex, chapterTitle: title, held: isRestrictedChapter(chapter), tier: 'introductory', units: 0, guideline: ACTIVITY_GUIDELINE.introductory, authored: own.length, generated: [], kinds: [], rejected: [], enrichment: null, lessonReview: null };
    if (report.held) return report;
    const avoid = new Set(citing.flatMap(authoredText).map(key));
    const extracted = extract(chapter, chapterIndex, chapters, repeated, generic, avoid, used);
    report.units = extracted.units;
    report.tier = activityTier(extracted.units);
    report.guideline = ACTIVITY_GUIDELINE[report.tier];
    if (own.length) return report;
    if (curated) {
      report.enrichment = 'curated lesson: its authored activities do not cover this chapter, so it is left for authoring rather than generated';
      return report;
    }
    const context: Context = { identity: input.identity, industryId, moduleId: `m-${slug(moduleTitle) || 'module'}`, lessonTitle, chapterIndex, rawTitle: clean(chapter.title) || title };
    const accepted: MatchSortActivity[] = [];
    for (const kind of KIND_PRIORITY) {
      const candidate = BUILDERS[kind](context, extracted, accepted.flatMap(authoredText).concat(accepted.flatMap((activity) => (activity.type === 'concept-matching' ? activity.items.answers.map((item) => item.text) : []))));
      if (typeof candidate === 'string') {
        report.rejected.push({ kind, reason: candidate });
        continue;
      }
      const problems = [...validateActivity(candidate), ...qualityProblems(candidate), ...[generatedSizeProblem(candidate)].filter((item): item is string => Boolean(item))];
      if (problems.length) {
        report.rejected.push({ kind, reason: `failed validation: ${problems.slice(0, 2).join('; ')}` });
        continue;
      }
      if (accepted.length >= report.guideline) {
        report.rejected.push({ kind, reason: `the ${report.tier} guideline allows ${report.guideline} ${report.guideline === 1 ? 'activity' : 'activities'}` });
        continue;
      }
      if (activities.some((activity) => activity.activityId === candidate.activityId)) {
        report.rejected.push({ kind, reason: 'duplicate of an activity already generated' });
        continue;
      }
      accepted.push(candidate);
    }
    activities.push(...accepted);
    accepted.forEach((activity) => {
      if (activity.type !== 'concept-matching') return;
      activity.items.prompts.forEach((item) => used.add(`p:${key(item.text)}`));
      activity.items.answers.forEach((item) => used.add(`a:${key(item.text)}`));
    });
    report.generated = accepted.map((activity) => activity.activityId);
    report.kinds = accepted.map((activity) => activity.objectiveKey as GeneratedKind);
    if (!accepted.length) {
      report.enrichment = report.rejected.filter((item) => !/guideline allows/.test(item.reason)).map((item) => `${item.kind}: ${item.reason}`).join(' \u00b7 ') || 'no displayed text to practise';
    }
    return report;
  });
  if (!authored.length) activities.push(...lessonReviews(input.identity, chapters, reports, repeated));
  return { activities, chapters: reports };
}

// Lesson review (fallback) ----------------------------------------------------------------------

/** Statements a chapter makes that no other chapter of the lesson makes: key insight, a concrete example, what it is. */
function reviewStatements(chapter: SourceChapter, title: string, repeated: Set<string>): Array<{ text: string; section: string }> {
  const narrative = Array.isArray(chapter.narrative) ? chapter.narrative : [];
  const section = (pattern: RegExp) => narrative.find((item) => pattern.test(clean(item?.label)));
  const example = narrative.filter((item) => ROLE_LABELS[5].label.test(clean(item?.label)))
    .map((item) => ({ text: sectionStatement(clean(item?.text), title, repeated, 30), section: clean(item?.label) }))
    .find((item) => words(item.text) >= 7 && CONCRETE_EXAMPLE.test(item.text));
  const candidates = [
    { text: sectionStatement(sentencesOf(clean(chapter.keyInsight))[0] ?? '', title, repeated, 30), section: 'Key insight' },
    ...(example ? [example] : []),
    { text: sectionStatement(clean(section(ROLE_LABELS[0].label)?.text), title, repeated, 30), section: 'What it is' },
  ];
  const statements: Array<{ text: string; section: string }> = [];
  candidates.forEach((candidate) => {
    if (words(candidate.text) >= 7 && !statements.some((other) => textsOverlap(other.text, candidate.text))) statements.push(candidate);
  });
  return statements.slice(0, 3);
}

/** Chapters split into review groups of two to four (a lesson of five becomes three and two). */
function reviewChunks<T>(items: T[]): T[][] {
  if (items.length < 2) return [];
  const count = Math.ceil(items.length / 4);
  const size = Math.ceil(items.length / count);
  const chunks: T[][] = [];
  for (let start = 0; start < items.length; start += size) chunks.push(items.slice(start, start + size));
  return chunks.filter((chunk) => chunk.length >= 2);
}

/**
 * Where a lesson has chapters without chapter practice, a review that sorts each chapter's own statements by the
 * chapter that makes them (explicit classification by source chapter). It cites every chapter it uses, so it opens
 * once all of them are open, and it is reported as lesson-level coverage, never as chapter practice.
 */
function lessonReviews(identity: string, chapters: SourceChapter[], reports: GeneratedChapterReport[], repeated: Set<string>): MatchSortActivity[] {
  const { industryId, moduleTitle, lessonTitle } = splitIdentity(identity);
  const eligible = reports.filter((report) => !report.held).map((report) => ({
    report,
    label: FIGURE.test(report.chapterTitle) ? `Chapter ${report.chapterIndex + 1}` : report.chapterTitle,
    statements: reviewStatements(chapters[report.chapterIndex], report.chapterTitle, repeated),
  }));
  const shared = new Set<string>();
  eligible.forEach((entry) => entry.statements.forEach((statement) => {
    if (eligible.some((other) => other !== entry && other.statements.some((item) => textsOverlap(item.text, statement.text)))) shared.add(key(statement.text));
  }));
  const usable = eligible.map((entry) => ({ ...entry, statements: entry.statements.filter((statement) => !shared.has(key(statement.text))) }))
    .filter((entry) => entry.statements.length >= 2 && new Set(eligible.map((item) => key(item.label))).size === eligible.length);
  const result: MatchSortActivity[] = [];
  reviewChunks(usable).forEach((chunk) => {
    if (!chunk.some((entry) => !entry.report.generated.length && !entry.report.authored)) return;
    const perChapter = Math.min(3, Math.floor(SORTING_MAX_ITEMS / chunk.length));
    const picked = chunk.map((entry) => ({ ...entry, statements: entry.statements.slice(0, perChapter) }));
    if (picked.reduce((sum, entry) => sum + entry.statements.length, 0) < SORTING_MIN_ITEMS) return;
    const refs: ChapterRef[] = picked.map((entry) => ({
      sourceModuleKey: GENERATED_SOURCE_KEY,
      lessonTitle,
      chapterTitle: clean(chapters[entry.report.chapterIndex].title) || entry.report.chapterTitle,
      chapterIndex: entry.report.chapterIndex,
      sourceIds: [`reader:${identity}`],
      grounding: entry.statements.map((statement) => `${statement.section}: ${statement.text}`).join(' | '),
    }));
    const answerKey = picked.map((entry) => `${key(entry.label)}:${entry.statements.map((statement) => key(statement.text)).join(',')}`).join('|');
    const lessonLabel = FIGURE.test(lessonTitle) ? 'this lesson' : q(lessonTitle);
    const activity: CategorySortingActivity = {
      activityId: `ms-gen-${slug(industryId)}-${hash(identity)}-lesson-review-${picked.map((entry) => entry.report.chapterIndex + 1).join('-')}-${hash(answerKey)}`,
      industryId,
      moduleId: `m-${slug(moduleTitle) || 'module'}`,
      lessonId: lessonIdOf(refs[0]),
      chapterId: chapterIdOf(refs[0]),
      sourceRefs: refs,
      origin: 'generated',
      objectiveKey: LESSON_REVIEW_KIND,
      type: 'category-sorting',
      title: `Which chapter says it? ${picked.map((entry) => entry.label).join(' \u00b7 ')}`,
      learningObjective: `Tell apart the main points of ${picked.length} chapters of ${lessonLabel} by placing each statement with the chapter that makes it.`,
      instructions: 'Select a statement, then select the chapter that makes it. Check your answers when every statement is placed.',
      summary: `You can now tell apart what each of these chapters of ${lessonLabel} contributes.`,
      categories: picked.map((entry, index) => ({ id: `c${index + 1}`, label: entry.label, description: `Chapter ${entry.report.chapterIndex + 1} of ${lessonLabel}.` })),
      items: picked.flatMap((entry, chapterPosition) => entry.statements.map((statement) => ({ entry, chapterPosition, statement })))
        .map(({ entry, chapterPosition, statement }, index) => ({
          id: `i${index + 1}`,
          text: statement.text,
          categoryId: `c${chapterPosition + 1}`,
          explanation: `${q(entry.label)} makes this point (${statement.section}).`,
          hint: 'Ask which chapter\u2019s topic this statement is about, then re-read that chapter\u2019s key insight.',
        })),
    };
    const problems = [...validateActivity(activity), ...qualityProblems(activity)];
    if (problems.length) return;
    result.push(activity);
    picked.forEach((entry) => { entry.report.lessonReview = activity.activityId; });
  });
  return result;
}
