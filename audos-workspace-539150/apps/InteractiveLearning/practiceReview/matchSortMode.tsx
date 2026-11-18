import { useMemo, useState } from 'react';
import MatchSortSession from '../matchSort/components/MatchSortSession';
import { TYPE_LABEL } from '../matchSort/components/ui';
import type { MatchSortProgress } from '../matchSort/types';
import { chapterActivities } from './learningModes';
import { resolveLessonPractice } from './lessonAccess';
import type { LessonPracticeResult } from './lessonAccess';
import type { PracticeMode, PracticeModeBodyProps } from './modes';
import { notifyPracticeChanged, usePracticeVersion } from './practiceLessonStore';
import { browserStorage, matchSortPersistenceFor } from './practiceStorage';
import { heldSourceDecks } from './sourceDecks';
import { uiActivitiesCompleted, uiActivitiesLocked, uiText } from '../../IndustryKnowledge/localization/uiText';

const lockedText = uiActivitiesLocked;

const rowButton = 'inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50';

function status(progress: MatchSortProgress, id: string): { label: string; action: string } {
  const record = progress[id];
  if (record?.completedAt) return { label: uiText('Completed'), action: uiText('Practice again') };
  if (record?.attempts.length) return { label: uiText(record.revealedAt ? 'Answers shown' : 'In progress'), action: uiText('Continue') };
  return { label: uiText('Not started'), action: uiText('Start') };
}

function MatchSortModeBody({ resolved, context, onSessionChange }: PracticeModeBodyProps<LessonPracticeResult>) {
  const store = useMemo(() => matchSortPersistenceFor(context.learnerScope), [context.learnerScope]);
  const version = usePracticeVersion();
  const progress = useMemo(() => store.load(), [store, version]);
  const [activeId, setActiveId] = useState<string | null>(null);

  if (activeId) {
    return (
      <MatchSortSession
        pack={resolved.pack}
        activities={resolved.available}
        persistence={store}
        initialActivityId={activeId}
        embedded
        onAttempt={() => notifyPracticeChanged()}
        onExit={() => { setActiveId(null); onSessionChange(false); notifyPracticeChanged(); }}
      />
    );
  }
  const total = resolved.available.length;
  const completed = resolved.available.filter((activity) => progress[activity.activityId]?.completedAt).length;
  const progressText = uiActivitiesCompleted(completed, total);
  return (
    <div>
      {context.chapterOnly ? (
        <section className="mb-2 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5" aria-label={uiText('Activities completed')} data-testid="match-sort-progress">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h2 className="text-sm font-bold text-slate-900">{uiText('Activities completed')}</h2>
            <p className="text-xs font-semibold text-slate-600" data-testid="match-sort-completed">{progressText}</p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={uiText('Activities completed')} aria-valuemin={0} aria-valuemax={total} aria-valuenow={completed} aria-valuetext={progressText}>
            <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${total ? Math.round((completed / total) * 100) : 0}%` }} />
          </div>
          {total > 0 && completed === total ? (
            <p className="mt-3 text-sm leading-6 text-slate-600" data-testid="match-sort-all-completed">
              <span className="font-semibold text-slate-800">{uiText('Every activity in this chapter is completed.')}</span>{uiText(' Practise again any time; your Knowledge Check results stay as they are.')}
            </p>
          ) : null}
        </section>
      ) : null}
      {total ? null : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600" data-testid="match-sort-empty">{uiText('No Match & Sort activities are open here yet.')}</p>
      )}
      <ul className="divide-y divide-slate-100" aria-label={uiText('Match & Sort activities')}>
        {resolved.available.map((activity) => {
          const state = status(progress, activity.activityId);
          return (
            <li key={activity.activityId} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between" data-practice-activity={activity.activityId}>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{uiText(TYPE_LABEL[activity.type])} · {state.label}</p>
                <h3 className="mt-1 text-sm font-bold leading-6 text-slate-900">{activity.title}</h3>
                <p className="mt-0.5 text-sm leading-6 text-slate-600">{activity.learningObjective}</p>
              </div>
              <button type="button" className={rowButton} aria-label={`${state.action}: ${activity.title}`} onClick={() => { setActiveId(activity.activityId); onSessionChange(true); }}>
                {state.action}
              </button>
            </li>
          );
        })}
      </ul>
      {resolved.lockedCount ? (
        <p className="mt-2 text-xs leading-5 text-slate-500" data-testid="practice-locked-note">
          {lockedText(resolved.lockedCount, context.chapterOnly)}
        </p>
      ) : null}
    </div>
  );
}

export const MATCH_SORT_MODE: PracticeMode<LessonPracticeResult> = {
  id: 'match-sort',
  label: 'Match & Sort',
  description: 'Connect, classify and organize knowledge through interactive activities.',
  highlights: ['Concept Matching', 'Category Sorting', 'Sequence Builder'],
  resolve: (lesson, context) => {
    const result = resolveLessonPractice(lesson, heldSourceDecks(), browserStorage());
    if (!result) return null;
    if (context.chapterOnly) {
      const chapter = chapterActivities(result, Math.max(0, Math.trunc(Number(lesson.activeChapter) || 0)));
      return chapter.available.length ? { ...result, available: chapter.available, lockedCount: chapter.locked } : null;
    }
    return result.available.length || result.lockedCount ? result : null;
  },
  summarise: (resolved, context) => {
    const progress = matchSortPersistenceFor(context.learnerScope).load();
    const available = resolved.available.length;
    const completed = resolved.available.filter((activity) => progress[activity.activityId]?.completedAt).length;
    return {
      available,
      completed,
      locked: resolved.lockedCount,
      progressLabel: available ? uiActivitiesCompleted(completed, available, Boolean(context.chapterOnly)) : uiText('No activities open yet'),
      lockedLabel: resolved.lockedCount ? lockedText(resolved.lockedCount, context.chapterOnly) : undefined,
    };
  },
  Body: MatchSortModeBody,
};
