// Builds a ChapterTextProvider from the live Domain Knowledge decks (after review holds are applied).
// Kept free of app imports so it can be unit-tested with fake chapters; the test wires in the real ones.

import type { ChapterTextProvider } from './types';

export interface LiveChapter {
  title?: string;
  reviewStatus?: string;
  mateIntro?: string;
  keyInsight?: string;
  narrative?: Array<{ text?: string }>;
  keyTerms?: Array<{ definition?: string }>;
  recap?: string[];
  sources?: Array<{ title?: string }>;
}

export interface LiveInputs {
  /** moduleKey -> lesson title -> chapters, as returned by applyReviewHolds. */
  decks: Record<string, Record<string, LiveChapter[] | undefined>>;
  /** Registry id -> source title (e.g. AUDIT_SOURCES), to turn a chapter's source objects back into IDs. */
  sourceTitles: Record<string, string>;
}

export function liveProvider({ decks, sourceTitles }: LiveInputs): ChapterTextProvider {
  return (moduleKey, lessonTitle, chapterNumber) => {
    const chapter = decks[moduleKey]?.[lessonTitle]?.[chapterNumber - 1];
    if (!chapter) return null;
    const held = chapter.reviewStatus === 'Under Review';
    const lines = held ? [] : [
      chapter.mateIntro,
      chapter.keyInsight,
      ...(chapter.narrative ?? []).map((item) => item.text),
      ...(chapter.keyTerms ?? []).map((item) => item.definition),
      ...(chapter.recap ?? []),
    ];
    const titles = new Set((chapter.sources ?? []).map((source) => source.title));
    return {
      title: String(chapter.title ?? ''),
      text: lines.filter(Boolean).join('\n'),
      sourceIds: held ? [] : Object.entries(sourceTitles).filter(([, title]) => titles.has(title)).map(([id]) => id),
      held,
    };
  };
}
