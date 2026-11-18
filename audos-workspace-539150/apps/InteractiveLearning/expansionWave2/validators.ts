// Targeted validators for wave-2 content. They need no DOM and no engine runtime beyond the
// existing pure `validateActivity` and `normaliseTitle`. Source text comes from an injected
// ChapterTextProvider so the same checks run against the live curriculum or a recorded snapshot.

import type { FlashcardDeckContent } from '../flashcards/models';
import type { MatchSortActivity } from '../matchSort/types';
import { normaliseTitle, validateActivity } from '../matchSort/validation';
import type { ChapterTextProvider, KnownHold, SourceModule, Wave2Activity, Wave2Pack } from './types';

export type { KnownHold };

const STABLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REGULATORY_CITATION = /\b(?:decree|circular|resolution|law\s+(?:no\.?\s*)?\d|qh\d{2}|tt-btc|nd-cp)\b/i;

const words = (text: string) => new Set(text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((word) => word.length > 2));
const similarity = (a: string, b: string) => {
  const left = words(a);
  const right = words(b);
  const shared = [...left].filter((word) => right.has(word)).length;
  return shared / Math.max(1, new Set([...left, ...right]).size);
};

/** Mirrors `validateDeck` in ../flashcards/decks/index.ts (structural checks, no file access). */
export function deckStructureProblems(deck: FlashcardDeckContent): string[] {
  const problems: string[] = [];
  const chapterIds = new Set(deck.chapters.map((chapter) => chapter.chapterId));
  if (!STABLE_ID.test(deck.deckId)) problems.push(`deck id "${deck.deckId}" is not a stable slug`);
  if (chapterIds.size !== deck.chapters.length) problems.push('duplicate chapter id');
  deck.chapters.forEach((chapter, index) => {
    if (chapter.number !== index + 1) problems.push(`chapter ${chapter.chapterId} is numbered ${chapter.number}, expected ${index + 1}`);
  });
  const seen = new Set<string>();
  deck.cards.forEach((card) => {
    const where = `card ${card.cardId}`;
    if (!STABLE_ID.test(card.cardId)) problems.push(`${where}: id is not a stable slug`);
    if (/^\d+$/.test(card.cardId) || /-(?:\d+)$/.test(card.cardId)) problems.push(`${where}: id looks positional`);
    if (seen.has(card.cardId)) problems.push(`${where}: duplicate id`);
    seen.add(card.cardId);
    if (card.deckId !== deck.deckId) problems.push(`${where}: deckId ${card.deckId} does not match deck`);
    if (card.industryId !== deck.industryId || card.moduleId !== deck.moduleId || card.lessonId !== deck.lessonId) problems.push(`${where}: industry/module/lesson mismatch`);
    if (!chapterIds.has(card.chapterId)) problems.push(`${where}: unknown chapter ${card.chapterId}`);
    (['front', 'back', 'explanation', 'practicalExample'] as const).forEach((field) => {
      if (!String(card[field] ?? '').trim()) problems.push(`${where}: empty ${field}`);
    });
    if (card.front.trim() === card.back.trim()) problems.push(`${where}: front repeats back`);
    if (!card.sourceRefs.length) problems.push(`${where}: no source reference`);
    card.sourceRefs.forEach((source) => {
      if (!chapterIds.has(source.chapterId)) problems.push(`${where}: source ref to unknown chapter ${source.chapterId}`);
      if (!source.excerpt.trim()) problems.push(`${where}: empty source excerpt`);
    });
    if (!card.sourceRefs.some((source) => source.chapterId === card.chapterId)) problems.push(`${where}: no source ref in its own chapter`);
  });
  return problems;
}

/** Content-quality rules from the wave-2 flashcard standard. */
export function deckQualityProblems(deck: FlashcardDeckContent): string[] {
  const problems: string[] = [];
  const chapterTitles = new Set(deck.chapters.map((chapter) => normaliseTitle(chapter.title)));
  deck.cards.forEach((card, index) => {
    const where = `card ${card.cardId}`;
    if (card.front.trim().length < 20 || card.front.length > 260) problems.push(`${where}: prompt length ${card.front.length} outside 20-260`);
    if (card.back.trim().length < 12 || card.back.length > 480) problems.push(`${where}: answer length ${card.back.length} outside 12-480`);
    if (chapterTitles.has(normaliseTitle(card.front))) problems.push(`${where}: prompt is a chapter title`);
    if (/^(is|are|does|do|can|will|should)\b[^?]*\?$/i.test(card.front.trim()) && /^(yes|no)\b/i.test(card.back.trim())) problems.push(`${where}: shallow yes/no card`);
    card.sourceRefs.forEach((source) => {
      if (source.excerpt.trim().length < 25) problems.push(`${where}: excerpt shorter than 25 characters`);
    });
    const excerpts = card.sourceRefs.map((source) => source.excerpt).join(' ');
    const learner = [card.front, card.back, card.explanation, card.practicalExample].join(' ');
    (learner.match(/\d[\d.,]*/g) ?? []).forEach((figure) => {
      if (!excerpts.includes(figure)) problems.push(`${where}: figure "${figure}" is not in its source excerpts`);
    });
    if (REGULATORY_CITATION.test(learner)) problems.push(`${where}: cites a legal instrument`);
    deck.cards.slice(index + 1).forEach((other) => {
      if (normaliseTitle(card.front) === normaliseTitle(other.front) || similarity(card.front, other.front) >= 0.72) problems.push(`${where}: prompt duplicates ${other.cardId}`);
      if (normaliseTitle(card.back) === normaliseTitle(other.back)) problems.push(`${where}: answer duplicates ${other.cardId}`);
    });
  });
  return problems;
}

const holdFor = (holds: KnownHold[], moduleKey: string, lesson: string, chapter: string) => holds.find((hold) => hold.moduleKey === moduleKey
  && normaliseTitle(hold.lesson) === normaliseTitle(lesson)
  && (hold.chapter === undefined || normaliseTitle(hold.chapter) === normaliseTitle(chapter)));

/** Deck chapters must equal the recorded source mapping and the displayed chapters, and every excerpt must be displayed text. */
export function deckSourceProblems(deck: FlashcardDeckContent, module: SourceModule, provider: ChapterTextProvider, holds: KnownHold[]): string[] {
  const problems: string[] = [];
  const lesson = module.lessons.find((item) => item.lessonTitle === deck.lessonTitle);
  if (!lesson) return [`lesson "${deck.lessonTitle}" is not in the source mapping of ${module.moduleKey}`];
  if (deck.source.moduleKey !== module.moduleKey) problems.push('deck source moduleKey differs from the source mapping');
  if (deck.source.readAtSha256 !== module.readAtSha256) problems.push('deck readAtSha256 differs from the source mapping');
  if (deck.chapters.length !== lesson.chapters.length) problems.push(`deck has ${deck.chapters.length} chapters, source mapping ${lesson.chapters.length}`);
  deck.chapters.forEach((chapter) => {
    const mapped = lesson.chapters[chapter.number - 1];
    const live = provider(module.moduleKey, lesson.lessonTitle, chapter.number);
    if (!mapped || normaliseTitle(mapped.title) !== normaliseTitle(chapter.title)) problems.push(`chapter ${chapter.chapterId}: title differs from the source mapping`);
    if (!live) problems.push(`chapter ${chapter.chapterId}: not found in the live curriculum`);
    else if (normaliseTitle(live.title) !== normaliseTitle(chapter.title)) problems.push(`chapter ${chapter.chapterId}: live title is "${live.title}"`);
  });
  const byId = new Map(deck.chapters.map((chapter) => [chapter.chapterId, chapter]));
  deck.cards.forEach((card) => {
    [card.chapterId, ...card.sourceRefs.map((ref) => ref.chapterId)].forEach((chapterId) => {
      const chapter = byId.get(chapterId);
      if (!chapter) return;
      const hold = holdFor(holds, module.moduleKey, lesson.lessonTitle, chapter.title);
      if (hold) problems.push(`card ${card.cardId}: cites held chapter ${chapter.chapterId} (${hold.id})`);
      if (lesson.chapters[chapter.number - 1]?.alignment === 'held') problems.push(`card ${card.cardId}: cites chapter ${chapter.chapterId} marked held in the source mapping`);
    });
    card.sourceRefs.forEach((ref) => {
      const chapter = byId.get(ref.chapterId);
      const live = chapter ? provider(module.moduleKey, lesson.lessonTitle, chapter.number) : null;
      if (!live) return;
      if (live.held) problems.push(`card ${card.cardId}: source chapter ${ref.chapterId} is held in the live curriculum`);
      if (!live.text.includes(ref.excerpt)) problems.push(`card ${card.cardId}: excerpt not found verbatim in ${ref.chapterId}: "${ref.excerpt.slice(0, 70)}"`);
    });
  });
  return problems;
}

const quotesOf = (grounding: string) => [...grounding.matchAll(/\u201c([^\u201d]+)\u201d/g)].map((match) => match[1]);

function activityText(activity: Wave2Activity): string {
  return JSON.stringify([activity.title, activity.learningObjective, activity.summary, 'items' in activity ? activity.items : null, 'pairs' in activity ? activity.pairs : null, 'categories' in activity ? activity.categories : null]);
}

export function activityProblems(activity: Wave2Activity, module: SourceModule, provider: ChapterTextProvider, holds: KnownHold[]): string[] {
  const problems = validateActivity(activity as unknown as MatchSortActivity).map((problem) => `engine: ${problem}`);
  if (!STABLE_ID.test(activity.activityId)) problems.push('activityId is not a stable slug');
  if (REGULATORY_CITATION.test(activityText(activity))) problems.push('cites a legal instrument');
  activity.sourceRefs.forEach((ref, index) => {
    const where = `sourceRefs[${index}]`;
    if (ref.sourceModuleKey !== module.moduleKey) problems.push(`${where}: module key differs from the source mapping`);
    const lesson = module.lessons.find((item) => normaliseTitle(item.lessonTitle) === normaliseTitle(ref.lessonTitle));
    const mapped = lesson?.chapters[ref.chapterIndex];
    if (!lesson || !mapped || normaliseTitle(mapped.title) !== normaliseTitle(ref.chapterTitle)) { problems.push(`${where}: chapter "${ref.chapterTitle}" is not at index ${ref.chapterIndex} of "${ref.lessonTitle}" in the source mapping`); return; }
    if (mapped.alignment === 'held' || holdFor(holds, module.moduleKey, lesson.lessonTitle, mapped.title)) problems.push(`${where}: cites held chapter "${ref.chapterTitle}"`);
    const live = provider(module.moduleKey, lesson.lessonTitle, ref.chapterIndex + 1);
    if (!live) { problems.push(`${where}: chapter not found in the live curriculum`); return; }
    if (live.held) problems.push(`${where}: chapter is held in the live curriculum`);
    if (normaliseTitle(live.title) !== normaliseTitle(ref.chapterTitle)) problems.push(`${where}: live title is "${live.title}"`);
    const quotes = quotesOf(ref.grounding);
    if (!quotes.length) problems.push(`${where}: grounding has no quoted evidence`);
    quotes.forEach((quote) => { if (!live.text.includes(quote)) problems.push(`${where}: quoted evidence not found verbatim: "${quote.slice(0, 70)}"`); });
    const lessonIds = new Set(lesson.chapters.flatMap((_, index) => provider(module.moduleKey, lesson.lessonTitle, index + 1)?.sourceIds ?? []));
    ref.sourceIds.forEach((id) => { if (!lessonIds.has(id)) problems.push(`${where}: source id ${id} is not listed by any chapter of the lesson`); });
    if (!ref.sourceIds.some((id) => live.sourceIds.includes(id))) problems.push(`${where}: none of its source ids is listed by the cited chapter`);
  });
  if (activity.type === 'sequence-builder') {
    const evidenceChapter = provider(module.moduleKey, activity.sourceRefs[0].lessonTitle, activity.sourceRefs[0].chapterIndex + 1);
    if (!activity.sequenceEvidence.trim()) problems.push('sequence has no evidence');
    else if (evidenceChapter && !evidenceChapter.text.includes(activity.sequenceEvidence)) problems.push('sequenceEvidence is not verbatim chapter text');
  }
  return problems;
}

export function packProblems(pack: Wave2Pack, module: SourceModule, provider: ChapterTextProvider, holds: KnownHold[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  if (!STABLE_ID.test(pack.packId)) problems.push(`pack id ${pack.packId} is not a stable slug`);
  pack.activities.forEach((activity) => {
    if (seen.has(activity.activityId)) problems.push(`${activity.activityId}: duplicate activityId`);
    seen.add(activity.activityId);
    if (activity.industryId !== pack.industryId || activity.moduleId !== pack.moduleId) problems.push(`${activity.activityId}: industry or module differs from its pack`);
    if (activity.sourceRefs.some((ref) => ref.sourceModuleKey !== pack.sourceModuleKey)) problems.push(`${activity.activityId}: source reference outside the pack module`);
    activityProblems(activity, module, provider, holds).forEach((problem) => problems.push(`${activity.activityId}: ${problem}`));
  });
  return problems;
}

/**
 * Mirrors the engine's fail-closed gate (practiceReview/flashcardAccess.ts, lessonAccess.ts): an item is
 * offered only when every chapter it cites is open. `openThrough` chapters are open for the learner.
 */
export function offeredCards(deck: FlashcardDeckContent, openThrough: number) {
  const number = new Map(deck.chapters.map((chapter) => [chapter.chapterId, chapter.number]));
  return deck.cards.filter((card) => [card.chapterId, ...card.sourceRefs.map((ref) => ref.chapterId)].every((id) => (number.get(id) ?? Infinity) <= openThrough));
}

export function offeredActivities(activities: Wave2Activity[], openThrough: number) {
  return activities.filter((activity) => activity.sourceRefs.every((ref) => ref.chapterIndex + 1 <= openThrough));
}
