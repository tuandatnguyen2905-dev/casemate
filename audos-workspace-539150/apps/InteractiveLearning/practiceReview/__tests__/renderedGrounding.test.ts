// Practice content must be grounded in what the learner can actually read in the chapter. The
// source-mapping tests check excerpts against the raw curriculum file, but Commercial Banking files
// also contain inline diagram specs that the reader never draws (the live diagrams come from
// commercialBankingM0NVisualSpecs.ts, and held diagram kinds draw nothing). This suite rebuilds each
// chapter's displayed text from the live registry after review holds and checks every flashcard
// excerpt and every quoted phrase in a Match & Sort grounding note against it. Needs the
// apps/IndustryKnowledge module graph (React), like the other suites in this folder.

import { CB_M1_HELD_KINDS, CB_M1_VISUALS } from '../../../IndustryKnowledge/commercialBankingM01VisualSpecs';
import { CB_M2_HELD_KINDS, CB_M2_VISUALS } from '../../../IndustryKnowledge/commercialBankingM02VisualSpecs';
import { CB_M3_HELD_KINDS, CB_M3_VISUALS } from '../../../IndustryKnowledge/commercialBankingM03VisualSpecs';
import { CB_M4_HELD_KINDS, CB_M4_VISUALS } from '../../../IndustryKnowledge/commercialBankingM04VisualSpecs';
import { CB_M5_HELD_KINDS, CB_M5_VISUALS } from '../../../IndustryKnowledge/commercialBankingM05VisualSpecs';
import { CONSUMER_FINANCE_CHAPTER_VISUALS } from '../../../IndustryKnowledge/consumerFinanceVisualSpecs';
import { FLASHCARD_DECKS } from '../../flashcards/decks';
import { readWorkspaceFile } from '../../flashcards/__tests__/sourceFiles';
import { allActivities } from '../../matchSort/content';
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { heldSourceDecks } from '../sourceDecks';

const LIVE_VISUALS: Record<string, { spec: unknown; heading: string; intro: string }> = {
  ...CB_M1_VISUALS, ...CB_M2_VISUALS, ...CB_M3_VISUALS, ...CB_M4_VISUALS, ...CB_M5_VISUALS, ...CONSUMER_FINANCE_CHAPTER_VISUALS,
};
const HELD_KINDS = new Set([...CB_M1_HELD_KINDS, ...CB_M2_HELD_KINDS, ...CB_M3_HELD_KINDS, ...CB_M4_HELD_KINDS, ...CB_M5_HELD_KINDS]);
const SKIP_KEYS = new Set(['visualKind', 'sources', 'type', 'key', 'ref', '_owner', '_store']);

const norm = (text: string) => text.replace(/\s+/g, ' ').trim();

/** Every string a chapter renders: its fields, its body element's props, and its live (non-held) diagram. */
function strings(value: unknown, out: string[] = [], seen = new WeakSet<object>()): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out, seen));
  else if (value && typeof value === 'object' && !seen.has(value)) {
    seen.add(value);
    const element = value as { $$typeof?: unknown; props?: unknown };
    if (element.$$typeof) strings(element.props, out, seen);
    else Object.entries(value).forEach(([key, item]) => { if (!SKIP_KEYS.has(key)) strings(item, out, seen); });
  }
  return out;
}

function renderedText(chapter: Record<string, unknown> | undefined): string | null {
  if (!chapter || chapter.reviewStatus === 'Under Review') return null;
  const kind = typeof chapter.visualKind === 'string' ? chapter.visualKind : '';
  const visual = kind && !HELD_KINDS.has(kind) ? LIVE_VISUALS[kind] : undefined;
  return norm(strings([chapter, visual ?? null]).join('\n'));
}

/** Text of every `restriction:` notice in a curriculum file ("Verification Required — Do Not Publish"). */
function restrictions(file: string): string[] {
  const text = readWorkspaceFile(file) ?? '';
  return Array.from(text.matchAll(/restriction:\s*'((?:[^'\\]|\\.)*)'/g)).map((match) => norm(match[1]));
}

const decks = () => heldSourceDecks() as unknown as Record<string, Record<string, Array<Record<string, unknown>>>>;

export const renderedCases = [
  { name: 'every flashcard excerpt from a lesson file is displayed in its cited chapter (not in an undrawn or held diagram)', run: () => {
    const problems: string[] = [];
    let checked = 0;
    FLASHCARD_DECKS.forEach((deck) => {
      const lesson = decks()[deck.source.moduleKey]?.[deck.source.lessonTitle];
      if (!lesson) { problems.push(`${deck.deckId}: lesson not in the live registry`); return; }
      const numbers = new Map(deck.chapters.map((chapter) => [chapter.chapterId, chapter.number]));
      deck.cards.forEach((card) => card.sourceRefs.forEach((ref) => {
        if (ref.file !== deck.source.file) return;
        checked += 1;
        const text = renderedText(lesson[(numbers.get(ref.chapterId) ?? 0) - 1]);
        if (text === null) { problems.push(`${card.cardId}: ${ref.chapterId} is missing or under review`); return; }
        // A source-code literal (e.g. a dimensions array) is displayed item by item, so check each quoted item.
        const parts = /^[[{]/.test(ref.excerpt.trim())
          ? Array.from(ref.excerpt.matchAll(/'((?:[^'\\]|\\.)*)'/g)).map((match) => match[1].replace(/\\'/g, "'"))
          : [ref.excerpt];
        const missing = parts.filter((part) => !text.includes(norm(part)));
        if (missing.length) problems.push(`${card.cardId}: not displayed in ${ref.chapterId}: "${missing.join('" / "')}"`);
      }));
    });
    ok(checked > 300, `checked ${checked} excerpts`);
    eq(problems, [], 'excerpts not displayed to the learner');
  } },
  { name: 'no flashcard excerpt or Match & Sort quote comes from a "Do Not Publish" restriction notice', run: () => {
    const problems: string[] = [];
    FLASHCARD_DECKS.forEach((deck) => {
      const notices = restrictions(deck.source.file);
      deck.cards.forEach((card) => card.sourceRefs.forEach((ref) => {
        if (notices.some((notice) => notice.includes(norm(ref.excerpt)) || norm(ref.excerpt).includes(notice))) problems.push(`${card.cardId}: quotes a restriction notice`);
      }));
    });
    const files = Array.from(new Set(FLASHCARD_DECKS.map((deck) => deck.source.file)));
    const notices = files.flatMap(restrictions);
    allActivities().forEach((activity) => activity.sourceRefs.forEach((ref) => {
      Array.from(ref.grounding.matchAll(/“([^”]+)”/g)).forEach(([, quote]) => {
        if (norm(quote).length > 25 && notices.some((notice) => notice.includes(norm(quote)))) problems.push(`${activity.activityId}: grounding quotes a restriction notice`);
      });
    }));
    eq(problems, [], 'restricted claims used as practice grounding');
  } },
  { name: 'every quoted phrase in a Match & Sort grounding note is displayed in the cited chapter', run: () => {
    const problems: string[] = [];
    let checked = 0;
    allActivities().forEach((activity) => activity.sourceRefs.forEach((ref) => {
      const lesson = decks()[ref.sourceModuleKey]?.[ref.lessonTitle];
      const text = renderedText(lesson?.[ref.chapterIndex]);
      if (text === null) { problems.push(`${activity.activityId}: chapter ${ref.chapterIndex + 1} of "${ref.lessonTitle}" is missing or under review`); return; }
      const lower = text.toLowerCase();
      Array.from(ref.grounding.matchAll(/“([^”]+)”/g)).forEach(([, quote]) => {
        checked += 1;
        if (!lower.includes(norm(quote).toLowerCase())) problems.push(`${activity.activityId}: “${quote}” is not displayed in chapter ${ref.chapterIndex + 1} of "${ref.lessonTitle}"`);
      });
    }));
    ok(checked > 50, `checked ${checked} quoted phrases`);
    eq(problems, [], 'grounding quotes not displayed to the learner');
  } },
];

export const runRenderedGroundingTests = () => runSuite('rendered grounding', renderedCases);
runRenderedGroundingTests().catch((error) => { console.error(error.message); throw error; });
