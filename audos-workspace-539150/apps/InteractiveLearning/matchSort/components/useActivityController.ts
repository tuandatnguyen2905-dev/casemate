import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { initialState, reduceActivity } from '../engine';
import type { ActivityAction, ActivityState, AttemptSummary, MatchSortActivity } from '../types';

export interface ActivityComponentProps<A extends MatchSortActivity = MatchSortActivity> {
  activity: A;
  /** Called after every check or reveal. Practice results only; never a Knowledge Check score. */
  onAttempt?: (attempt: AttemptSummary) => void;
  onNext?: () => void;
  nextLabel?: string;
}

export function useActivityController<A extends MatchSortActivity, S extends ActivityState>(activity: A, onAttempt?: (attempt: AttemptSummary) => void) {
  const [state, dispatch] = useReducer(
    (current: ActivityState, action: ActivityAction) => reduceActivity(activity, current, action),
    activity,
    (value: MatchSortActivity) => initialState(value),
  );
  const [announcement, setAnnouncement] = useState('');
  const onAttemptRef = useRef(onAttempt);
  onAttemptRef.current = onAttempt;
  const result = state.phase === 'checked' ? state.result : null;
  const attemptKey = result ? `${state.checks}:${result.revealed}` : null;

  useEffect(() => {
    if (!result || !attemptKey) return;
    onAttemptRef.current?.({ at: new Date().toISOString(), correct: result.correct, total: result.total, allCorrect: result.allCorrect, revealed: result.revealed });
    setAnnouncement(result.revealed ? 'Answers revealed.' : result.allCorrect ? 'All correct.' : `${result.correct} of ${result.total} correct.`);
    // attemptKey changes exactly once per check or reveal.
  }, [attemptKey]);

  const announce = useCallback((message: string) => setAnnouncement(message), []);
  return { state: state as S, dispatch, announcement, announce };
}
