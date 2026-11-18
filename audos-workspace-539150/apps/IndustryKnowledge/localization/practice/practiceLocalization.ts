import type { FlashcardContent } from '../../../InteractiveLearning/flashcards/models';
import type { MatchSortActivity } from '../../../InteractiveLearning/matchSort/types';
import { keepsNumbers } from '../numberCheck';
import type { LearningLanguage } from '../localizationTypes';
import { CB_VI_FLASHCARDS, CB_VI_MATCH_SORT, CB_VI_PRACTICE_LESSONS } from './cbViPractice';
import type { ViFlashcard, ViMatchActivity } from './cbViPractice';
import { lessonPairs, localizeGeneratedActivity, localizeGeneratedCard } from './generatedPractice';
import type { ChapterPairs, PracticeSourceLesson } from './generatedPractice';

// Vietnamese overlay for Practice & Review, applied after a mode resolves the open lesson. Cards and
// activities keep their ids, chapter references, option ids, answer keys and order, so review history,
// Match & Sort attempts and access rules are unchanged; only display text is swapped. Anything without a
// current translation stays English. Cards and activities generated from chapter text get Vietnamese only through
// generatedPractice.ts, for the open lesson, when every text they show has a checked Vietnamese chapter field.

const BLANK = '____';
const normalise = (value: string) => value.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

/** A fill-in-the-blank prompt must keep its blank and never show the answer or an accepted synonym. */
export function blankPromptIsSafe(front: string, answers: string[]): boolean {
  if (!front.includes(BLANK)) return false;
  const prompt = ` ${normalise(front)} `;
  return answers.every((answer) => !normalise(answer) || !prompt.includes(` ${normalise(answer)} `));
}

export function localizeFlashcard(card: FlashcardContent, vi: ViFlashcard | undefined): FlashcardContent | null {
  if (!vi || vi.en !== card.front) return null;
  if (!keepsNumbers(card.back, vi.back) || !keepsNumbers(card.explanation, vi.explanation) || !keepsNumbers(card.practicalExample, vi.example ?? (card.practicalExample ? '' : undefined))) return null;
  const interaction = card.interaction;
  let localizedInteraction = interaction;
  if (interaction?.type === 'mcq') {
    const options = interaction.options.map((option) => (vi.options?.[option.id] && keepsNumbers(option.text, vi.options[option.id]) ? { ...option, text: vi.options[option.id] } : null));
    if (options.some((option) => !option)) return null;
    localizedInteraction = { ...interaction, options: options as typeof interaction.options };
  } else if (interaction?.type === 'fill_blank') {
    if (!vi.answer || !keepsNumbers(interaction.answer, vi.answer)) return null;
    const accepted = vi.acceptedAnswers ?? [];
    if (!blankPromptIsSafe(vi.front, [vi.answer, ...accepted])) return null;
    localizedInteraction = { ...interaction, answer: vi.answer, acceptedAnswers: accepted };
  } else if (vi.options || vi.answer) {
    return null;
  }
  return {
    ...card,
    front: vi.front,
    back: vi.back,
    explanation: vi.explanation,
    practicalExample: vi.example ?? card.practicalExample,
    keyTerms: vi.terms ?? card.keyTerms,
    interaction: localizedInteraction,
  };
}

function itemsOf(activity: MatchSortActivity): Array<{ id: string; text: string }> {
  if (activity.type === 'concept-matching') return [...activity.items.prompts, ...activity.items.answers];
  return activity.items;
}

export function localizeActivity(activity: MatchSortActivity, vi: ViMatchActivity | undefined): MatchSortActivity | null {
  if (!vi || vi.enTitle !== activity.title) return null;
  const items = itemsOf(activity);
  if (!items.every((item) => vi.items[item.id] && keepsNumbers(item.text, vi.items[item.id]))) return null;
  const text = (item: { id: string; text: string }) => ({ ...item, text: vi.items[item.id] });
  const base = { ...activity, title: vi.title, learningObjective: vi.learningObjective, instructions: vi.instructions, summary: vi.summary };
  if (activity.type === 'concept-matching') {
    if (!activity.pairs.every((pair) => vi.notes?.[pair.id])) return null;
    return {
      ...base,
      type: 'concept-matching',
      promptLabel: vi.promptLabel ?? activity.promptLabel,
      answerLabel: vi.answerLabel ?? activity.answerLabel,
      items: { prompts: activity.items.prompts.map(text), answers: activity.items.answers.map(text) },
      pairs: activity.pairs.map((pair) => ({ ...pair, ...vi.notes![pair.id] })),
    } as MatchSortActivity;
  }
  if (!activity.items.every((item) => vi.notes?.[item.id])) return null;
  if (activity.type === 'category-sorting') {
    if (!activity.categories.every((category) => vi.categories?.[category.id])) return null;
    return {
      ...base,
      categories: activity.categories.map((category) => ({ ...category, ...vi.categories![category.id] })),
      items: activity.items.map((item) => ({
        ...text(item),
        ...vi.notes![item.id],
        misplaced: item.misplaced ? Object.fromEntries(Object.entries(item.misplaced).map(([key, note]) => [key, vi.misplaced?.[item.id]?.[key] ?? note])) : undefined,
      })),
    } as MatchSortActivity;
  }
  return {
    ...base,
    sequenceEvidence: vi.sequenceEvidence ?? activity.sequenceEvidence,
    items: activity.items.map((item) => ({ ...text(item), ...vi.notes![item.id] })),
  } as MatchSortActivity;
}

const cardCache = new WeakMap<FlashcardContent, FlashcardContent | null>();
const activityCache = new WeakMap<MatchSortActivity, MatchSortActivity | null>();

export function localizedCard(card: FlashcardContent): FlashcardContent {
  if (!cardCache.has(card)) cardCache.set(card, localizeFlashcard(card, CB_VI_FLASHCARDS[card.cardId]));
  return cardCache.get(card) ?? card;
}

export function localizedActivity(activity: MatchSortActivity): MatchSortActivity {
  if (!activityCache.has(activity)) activityCache.set(activity, localizeActivity(activity, CB_VI_MATCH_SORT[activity.activityId]));
  return activityCache.get(activity) ?? activity;
}

/** "1.1 Industry Definition & Scope · Chapter 2: …" → "1.1 Định nghĩa & phạm vi ngành · Chương 2". */
export function localizedSourceLabel(label: string): string {
  const match = label.match(/^(\d+\.\d+) (.+?) · Chapter (\d+)(?::.*)?$/);
  const lesson = match ? CB_VI_PRACTICE_LESSONS[match[1]] : undefined;
  return lesson && match && lesson.en === match[2] ? `${match[1]} ${lesson.vi} · Chương ${match[3]}` : label;
}

interface ScopedCardLike { card: FlashcardContent; sourceLabel: string; lessonIdentity?: string; chapterIndex?: number; origin?: string }
interface GeneratedSource { identity: string; pairs: Array<ChapterPairs | null> }
interface LessonCardsLike { cards: ScopedCardLike[] }
interface FlashcardsResolved { industry: { lessons: LessonCardsLike[] }; lesson: LessonCardsLike }
interface MatchSortResolved { pack: { activities: MatchSortActivity[] }; available: MatchSortActivity[] }

function displayCard(item: ScopedCardLike, generated?: GeneratedSource): FlashcardContent {
  const authored = localizedCard(item.card);
  if (authored !== item.card || !generated || item.origin !== 'generated' || item.lessonIdentity !== generated.identity || item.chapterIndex === undefined) return authored;
  return localizeGeneratedCard(item.card, generated.pairs[item.chapterIndex]) ?? item.card;
}

function localizeLessonCards<T extends LessonCardsLike>(lesson: T, generated?: GeneratedSource): T {
  return { ...lesson, cards: lesson.cards.map((item) => ({ ...item, card: displayCard(item, generated), sourceLabel: localizedSourceLabel(item.sourceLabel) })) };
}

/**
 * Applied to each Practice & Review mode's resolved data (PracticeReviewEntry.useLessonPractice).
 * English returns the input object untouched. `source` is the open lesson (its English chapters), which
 * generated cards and activities are matched against.
 */
export function localizePracticeResolved<R>(modeId: string, resolved: R | null, language: LearningLanguage, source?: PracticeSourceLesson | null): R | null {
  if (!resolved || language !== 'vi') return resolved;
  const pairs = lessonPairs(source);
  const generated: GeneratedSource | undefined = pairs && source ? { identity: source.identity, pairs } : undefined;
  if (modeId === 'flashcards') {
    const data = resolved as unknown as FlashcardsResolved;
    const lessons = data.industry.lessons.map((lesson) => (lesson === data.lesson ? null : localizeLessonCards(lesson, generated)));
    const own = localizeLessonCards(data.lesson, generated);
    const ownIndex = data.industry.lessons.indexOf(data.lesson);
    const industryLessons = lessons.map((lesson, index) => (index === ownIndex ? own : lesson ?? data.industry.lessons[index]));
    return { ...data, industry: { ...data.industry, lessons: industryLessons }, lesson: own } as unknown as R;
  }
  if (modeId === 'match-sort') {
    const data = resolved as unknown as MatchSortResolved;
    const display = (activity: MatchSortActivity) => {
      const authored = localizedActivity(activity);
      if (authored !== activity || !generated || !activity.sourceRefs.some((ref) => ref.sourceIds?.includes(`reader:${generated.identity}`))) return authored;
      return localizeGeneratedActivity(activity, generated.pairs) ?? activity;
    };
    return { ...data, pack: { ...data.pack, activities: data.pack.activities.map(display) }, available: data.available.map(display) } as unknown as R;
  }
  return resolved;
}
