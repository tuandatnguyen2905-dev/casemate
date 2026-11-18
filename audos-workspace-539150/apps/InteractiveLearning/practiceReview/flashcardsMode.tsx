import { useCallback, useEffect, useMemo, useState } from 'react';
import SmartFlashcards from '../flashcards/components/SmartFlashcards';
import { deckStats } from '../flashcards/review';
import { ChapterSupportPanel, FlashcardActions, FlashcardChapterProgress, FlashcardOverviewHeader, FlashcardProgressSummary, ScopeSelector } from './FlashcardDeckOverview';
import { FLASHCARD_SCOPES, cardsInScope, coverageSummary, originLesson, resolveIndustryFlashcards, scopeDeck } from './flashcardScopes';
import type { FlashcardScopeId, IndustryFlashcards, LessonCards } from './flashcardScopes';
import type { PracticeMode, PracticeModeBodyProps } from './modes';
import { flashcardAdapterFor } from './practiceStorage';
import { uiCardsLocked, uiCardsRated, uiText, useUiLanguage } from '../../IndustryKnowledge/localization/uiText';

export interface LessonFlashcardsPractice {
  industry: IndustryFlashcards;
  /** The open lesson's cards, as the Practice & Review overview counts them. */
  lesson: LessonCards;
}

/** Cards per Study or Review session. */
export const FLASHCARD_SESSION_LIMIT = 12;

const lockedText = uiCardsLocked;

const isScope = (value: unknown): value is FlashcardScopeId => FLASHCARD_SCOPES.includes(value as FlashcardScopeId);

function FlashcardsModeBody({ resolved, context, onSessionChange, chrome }: PracticeModeBodyProps<LessonFlashcardsPractice>) {
  useUiLanguage();
  const { industry } = resolved;
  const adapter = useMemo(() => flashcardAdapterFor(context.learnerScope), [context.learnerScope]);
  const chapterOnly = Boolean(context.chapterOnly);
  // The deck starts on the open chapter and can widen to the lesson, module or whole curriculum. The scope is what
  // is reviewed, never where the learner is: it does not move the reader or change where Return to Lesson goes.
  const scopes: FlashcardScopeId[] = industry.complete ? FLASHCARD_SCOPES : FLASHCARD_SCOPES.filter((scope) => scope === 'chapter' || scope === 'lesson');
  const [scope, setScope] = useState<FlashcardScopeId>(() => (isScope(chrome?.initialScope) && scopes.includes(chrome!.initialScope as FlashcardScopeId) ? chrome!.initialScope as FlashcardScopeId : 'chapter'));
  const [inSession, setInSession] = useState(false);

  useEffect(() => {
    chrome?.onScopeChange?.(scope);
  }, [scope]);

  const items = useMemo(() => cardsInScope(industry, scope), [industry, scope]);
  const deck = useMemo(() => scopeDeck(industry, scope, items), [industry, scope, items]);
  const labels = useMemo(() => new Map(items.map((item) => [item.card.cardId, item.sourceLabel])), [items]);
  const coverage = useMemo(() => coverageSummary(industry), [industry]);
  const counts = useMemo(() => Object.fromEntries(FLASHCARD_SCOPES.map((id) => {
    const scoped = cardsInScope(industry, id);
    return [id, { available: scoped.filter((item) => !item.locked).length, total: scoped.length }];
  })) as Record<FlashcardScopeId, { available: number; total: number }>, [industry]);
  const sourceLabelFor = useCallback((card: { cardId: string }) => labels.get(card.cardId), [labels]);
  const lessonActions = { continueLearning: chrome?.continueLearning, returnToLesson: chrome?.returnToLesson };

  const onViewChange = (next: boolean) => {
    setInSession(next);
    onSessionChange(next);
    if (!next) window.requestAnimationFrame?.(() => chrome?.headingRef.current?.focus({ preventScroll: true }));
  };

  // Chapter flow: the dialog supplies the chapter header, the Learning Journey and the key terms panel.
  if (chapterOnly) {
    return (
      <div data-testid="practice-flashcards" data-scope={scope} data-chapter={industry.origin.chapterIndex}>
        <SmartFlashcards
          embedded
          prevalidated
          decks={[deck]}
          adapter={adapter}
          sessionLimit={FLASHCARD_SESSION_LIMIT}
          backLabel={uiText('Back to Flashcards overview')}
          sourceLabelFor={sourceLabelFor}
          onViewChange={onViewChange}
          lessonActions={lessonActions}
          renderOverview={(api) => (
            <>
              <ScopeSelector data={industry} scopes={scopes} value={scope} counts={counts} onChange={setScope} />
              {scope === 'chapter'
                ? <FlashcardChapterProgress api={api} />
                : <FlashcardProgressSummary data={industry} scope={scope} api={api} items={items} coverage={coverage} chapterOnly />}
              <FlashcardActions api={api} scope={scope} />
            </>
          )}
        />
      </div>
    );
  }

  return (
    <div className={inSession ? 'mx-auto w-full max-w-2xl' : 'xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start xl:gap-8'} data-testid="practice-flashcards" data-scope={scope}>
      <div className="min-w-0">
        {inSession ? null : <FlashcardOverviewHeader chrome={chrome} data={industry} />}
        <SmartFlashcards
          embedded
          prevalidated
          decks={[deck]}
          adapter={adapter}
          sessionLimit={FLASHCARD_SESSION_LIMIT}
          backLabel={uiText('Back to deck overview')}
          sourceLabelFor={sourceLabelFor}
          onViewChange={onViewChange}
          lessonActions={lessonActions}
          renderOverview={(api) => (
            <>
              {chapterOnly ? null : <ScopeSelector data={industry} scopes={scopes} value={scope} counts={counts} onChange={setScope} />}
              <FlashcardProgressSummary data={industry} scope={scope} api={api} items={items} coverage={coverage} chapterOnly={chapterOnly} />
              <FlashcardActions api={api} scope={scope} onWiderScope={scope === 'chapter' && !chapterOnly ? () => setScope('lesson') : undefined} />
            </>
          )}
        />
      </div>
      {inSession ? null : (
        <aside className="mt-6 min-w-0 xl:sticky xl:top-6 xl:mt-0" aria-label={uiText('Key terms')}>
          <ChapterSupportPanel origin={industry.origin} />
        </aside>
      )}
    </div>
  );
}

export const FLASHCARDS_MODE: PracticeMode<LessonFlashcardsPractice> = {
  id: 'flashcards',
  label: 'Flashcards',
  description: 'Recall important concepts and strengthen long-term retention.',
  highlights: ['Active recall', 'Concept review', 'Spaced repetition'],
  ownsLayout: true,
  resolve: (lesson, context) => {
    const industry = resolveIndustryFlashcards(lesson);
    const own = industry ? originLesson(industry) : undefined;
    if (!industry || !own || !own.cards.length) return null;
    if (context.chapterOnly && !cardsInScope(industry, 'chapter').some((item) => !item.locked)) return null;
    return { industry, lesson: own };
  },
  summarise: (resolved, context) => {
    const items = context.chapterOnly ? cardsInScope(resolved.industry, 'chapter') : resolved.lesson.cards;
    const lessonDeck = scopeDeck(resolved.industry, context.chapterOnly ? 'chapter' : 'lesson', items);
    const stats = deckStats(lessonDeck, flashcardAdapterFor(context.learnerScope).load().cards, Date.now());
    // Only cards the learner rated have a scheduler state; cards that were merely viewed are not counted here.
    const rated = stats.total - stats.unseen;
    const locked = items.length - stats.total;
    const industryTotal = coverageSummary(resolved.industry).total;
    return {
      available: stats.total,
      completed: rated,
      locked,
      due: stats.due,
      progressLabel: stats.total
        ? uiCardsRated(rated, stats.total, Boolean(context.chapterOnly), stats.due, context.chapterOnly ? null : industryTotal, resolved.industry.industryLabel)
        : uiText('No cards open yet'),
      lockedLabel: locked ? lockedText(locked) : undefined,
      industryLabel: resolved.industry.industryLabel,
    };
  },
  Body: FlashcardsModeBody,
};
