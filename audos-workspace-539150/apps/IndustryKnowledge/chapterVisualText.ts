import type { VisualSpec } from './fashionVisualKit';

export interface ChapterVisual { heading: string; intro: string; spec: VisualSpec }

/**
 * Points each chapter's visualHeading and visualIntro at its chapter-specific Learning Visual.
 * Every other chapter field keeps its original value; chapters without a spec (including held
 * chapters) are returned untouched.
 */
export function applyChapterVisualText<T extends { visualKind?: string; visualHeading?: string; visualIntro?: string }>(
  decks: Record<string, T[]>,
  visuals: Record<string, ChapterVisual>,
): void {
  for (const key of Object.keys(decks)) {
    decks[key] = (decks[key] ?? []).map((card) => {
      const visual = card?.visualKind ? visuals[card.visualKind] : undefined;
      return visual ? { ...card, visualHeading: visual.heading, visualIntro: visual.intro } : card;
    });
  }
}

/** Neutral Learning Visual text for chapters held for verification; they have no spec, so no diagram is drawn. */
export const HELD_VISUAL_TEXT = {
  heading: 'Learning visual under review',
  intro: 'This chapter’s diagram is being checked against its sources and will appear here once that review is complete.',
};

export function applyHeldVisualText<T extends { visualKind?: string; visualHeading?: string; visualIntro?: string }>(
  decks: Record<string, T[]>,
  heldKinds: readonly string[],
): void {
  const held = new Set(heldKinds);
  for (const key of Object.keys(decks)) {
    decks[key] = (decks[key] ?? []).map((card) => (card?.visualKind && held.has(card.visualKind)
      ? { ...card, visualHeading: HELD_VISUAL_TEXT.heading, visualIntro: HELD_VISUAL_TEXT.intro }
      : card));
  }
}
