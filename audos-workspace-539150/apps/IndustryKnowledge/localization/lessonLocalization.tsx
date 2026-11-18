import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useLearningLanguage } from './learningLanguage';
import type { LessonLocale } from './localizationTypes';
import { cbViLessonCopy } from './commercialBanking/cbViNav';

// One learning identity, several display languages. The reader keeps its English deck, quiz and progress
// keys; this hook swaps in display text from a lazily loaded, curriculum/module-scoped localizer and leaves
// every index, id, answer key and source untouched. Practice & Review keeps receiving the English cards
// (practiceSourceCards), so generated card ids and chapter matching never see translated titles.

export interface LocalizableQuestion {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation: string;
  moduleId?: string;
  objective?: string;
}

export interface LocalizableDeckProps {
  persistenceKey: string;
  cards: object[];
  lessonTitle: string;
  lessonSubtitle: string;
  quizQuestions?: LocalizableQuestion[];
  finalTakeaways?: unknown;
}

export interface LocalizeInput {
  lessonTitle: string;
  cards: object[];
  quizQuestions?: LocalizableQuestion[];
  finalTakeaways?: unknown;
}

export interface LocalizeOutput {
  cards: object[];
  quizQuestions?: LocalizableQuestion[];
  finalTakeaways?: unknown;
  locale: LessonLocale;
}

export interface LessonLocalizer {
  localize: (input: LocalizeInput) => LocalizeOutput;
}

export interface LessonTarget {
  curriculum: 'banking-commercial';
  module: number;
  lessonTitle: string;
  packKey: string;
}

// persistenceKey prefixes used by the Commercial Banking lesson routes in App.tsx.
const CB_PREFIXES: Array<[string, number]> = [
  ['Commercial Banking Industry Context: ', 1],
  ['Commercial Banking Value Chain: ', 2],
  ['Commercial Banking Business Models: ', 3],
  ['Commercial Banking Competitive Landscape: ', 4],
  ['Commercial Banking Trends and Outlook: ', 5],
];

export function lessonTargetOf(persistenceKey: string): LessonTarget | null {
  for (const [prefix, module] of CB_PREFIXES) {
    if (persistenceKey.startsWith(prefix)) {
      return { curriculum: 'banking-commercial', module, lessonTitle: persistenceKey.slice(prefix.length), packKey: `banking-commercial:${module}` };
    }
  }
  return null;
}

const cbEngine = () => import('./commercialBanking/cbLocalizer');
const LOADERS: Record<string, () => Promise<LessonLocalizer>> = {
  'banking-commercial:1': () => Promise.all([cbEngine(), import('./commercialBanking/cbViModule01')]).then(([engine, data]) => engine.createCbLocalizer(data.CB_VI_MODULE01)),
  'banking-commercial:2': () => Promise.all([cbEngine(), import('./commercialBanking/cbViModule02')]).then(([engine, data]) => engine.createCbLocalizer(data.CB_VI_MODULE02)),
  'banking-commercial:3': () => Promise.all([cbEngine(), import('./commercialBanking/cbViModule03')]).then(([engine, data]) => engine.createCbLocalizer(data.CB_VI_MODULE03)),
  'banking-commercial:4': () => Promise.all([cbEngine(), import('./commercialBanking/cbViModule04')]).then(([engine, data]) => engine.createCbLocalizer(data.CB_VI_MODULE04)),
  'banking-commercial:5': () => Promise.all([cbEngine(), import('./commercialBanking/cbViModule05')]).then(([engine, data]) => engine.createCbLocalizer(data.CB_VI_MODULE05)),
};

const loaded = new Map<string, LessonLocalizer>();
const pending = new Map<string, Promise<LessonLocalizer>>();

export function peekLessonLocalizer(packKey: string): LessonLocalizer | undefined {
  return loaded.get(packKey);
}

export function loadLessonLocalizer(packKey: string): Promise<LessonLocalizer | null> {
  const ready = loaded.get(packKey);
  if (ready) return Promise.resolve(ready);
  const load = LOADERS[packKey];
  if (!load) return Promise.resolve(null);
  let promise = pending.get(packKey);
  if (!promise) {
    promise = load().then((localizer) => {
      loaded.set(packKey, localizer);
      return localizer;
    });
    promise.catch(() => pending.delete(packKey));
    pending.set(packKey, promise);
  }
  return promise;
}

const sourceCardsByLocalized = new WeakMap<object, object[]>();

/** The English deck behind a localized one; Practice & Review must always receive this. */
export function practiceSourceCards<T>(cards: T[]): T[] {
  return (sourceCardsByLocalized.get(cards as unknown as object) as T[] | undefined) ?? cards;
}

export const SOURCE_LOCALE: LessonLocale = { language: 'en', status: 'source', chapters: [], quiz: 'none', quizFallbackIds: [], takeaways: 'none' };

function untranslatedLocale(chapterCount: number, status: LessonLocale['status']): LessonLocale {
  return {
    language: 'vi',
    status,
    chapters: Array.from({ length: chapterCount }, () => ({ status, fallbackFields: [] })),
    quiz: 'english',
    quizFallbackIds: [],
    takeaways: 'english',
  };
}

interface LocalizedParts {
  cards: object[];
  quizQuestions?: LocalizableQuestion[];
  finalTakeaways?: unknown;
  lessonTitle: string;
  lessonSubtitle: string;
  locale: LessonLocale;
}

export function useLocalizedDeck<P extends LocalizableDeckProps>(props: P): { props: P; locale: LessonLocale } {
  const [language] = useLearningLanguage();
  const { persistenceKey, cards, quizQuestions, finalTakeaways, lessonTitle, lessonSubtitle } = props;
  const target = useMemo(() => lessonTargetOf(persistenceKey), [persistenceKey]);
  const packKey = target?.packKey ?? null;
  const [localizer, setLocalizer] = useState<{ key: string; value: LessonLocalizer } | null>(() => {
    const ready = packKey ? peekLessonLocalizer(packKey) : undefined;
    return ready && packKey ? { key: packKey, value: ready } : null;
  });
  const [failedKey, setFailedKey] = useState<string | null>(null);

  useEffect(() => {
    if (language !== 'vi' || !packKey || localizer?.key === packKey) return undefined;
    let live = true;
    loadLessonLocalizer(packKey).then(
      (value) => { if (live && value) setLocalizer({ key: packKey, value }); },
      () => { if (live) setFailedKey(packKey); },
    );
    return () => { live = false; };
  }, [language, packKey, localizer?.key]);

  const parts = useMemo<LocalizedParts | null>(() => {
    if (language !== 'vi') return null;
    const active = localizer && localizer.key === packKey ? localizer.value : undefined;
    if (!target || !active) {
      const status = target && failedKey !== packKey ? 'loading' : 'missing';
      return { cards, quizQuestions, finalTakeaways, lessonTitle, lessonSubtitle, locale: untranslatedLocale(cards.length, status) };
    }
    const output = active.localize({ lessonTitle: target.lessonTitle, cards, quizQuestions, finalTakeaways });
    if (output.cards !== cards) sourceCardsByLocalized.set(output.cards, cards);
    const copy = cbViLessonCopy(target.lessonTitle);
    return {
      cards: output.cards,
      quizQuestions: output.quizQuestions,
      finalTakeaways: output.finalTakeaways,
      lessonTitle: copy?.title ?? lessonTitle,
      lessonSubtitle: copy?.subtitle ?? lessonSubtitle,
      locale: output.locale,
    };
  }, [language, localizer, packKey, target, failedKey, cards, quizQuestions, finalTakeaways, lessonTitle, lessonSubtitle]);

  if (!parts) return { props, locale: SOURCE_LOCALE };
  const { locale, ...display } = parts;
  return { props: { ...props, ...display } as P, locale };
}

const LessonLocaleContext = createContext<LessonLocale>(SOURCE_LOCALE);

export function LessonLocaleProvider({ value, children }: { value: LessonLocale; children: ReactNode }) {
  return <LessonLocaleContext.Provider value={value}>{children}</LessonLocaleContext.Provider>;
}

export function useLessonLocale(): LessonLocale {
  return useContext(LessonLocaleContext);
}
