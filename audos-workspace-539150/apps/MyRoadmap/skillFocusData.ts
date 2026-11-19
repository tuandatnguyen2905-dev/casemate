// Data access for My Roadmap's "Today's Focus": the learner's own graded results,
// read-only. Nothing is written and no practice table or progress count changes.
//
//   Aptitude Test  aptitude_attempts by account user_key (same read as the
//                  roadmap's own progress), with answers_json per question
//   Case Drill     drill_library_attempts + rubric-marked micro_drills across
//                  every session of the verified email, through the
//                  casemate-roadmap-save-v1 'skill_scores' action; the current
//                  session's own rows are the fallback

import { useCallback, useEffect, useRef, useState } from 'react';
import { computeSkillFocus } from '../../lib/skillFocus';
import type { AptitudeAttemptInput, CaseDrillAttemptInput, SkillFocus } from '../../lib/skillFocus';
import { READINESS_UPDATED_EVENT } from '../../lib/readinessScore';

const ROADMAP_SAVE_HOOK = '/api/hooks/execute/workspace-539150/casemate-roadmap-save-v1';
const REFRESH_MIN_MS = 15000;

function workspaceDb(): any {
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) throw new Error('Workspace credentials are not ready.');
  return db;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function parseJsonish(value: unknown): any {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function withColumns(query: any, ...names: string[]) {
  return typeof query?.select === 'function' ? query.select(...names) : query;
}

async function loadAptitudeRows(userKey: string): Promise<AptitudeAttemptInput[]> {
  const db = workspaceDb();
  const response = await withColumns(
    db.from('aptitude_attempts', { shared: true }).eq('user_key', userKey),
    'id', 'test_type', 'test_id', 'answers_json', 'completed_at', 'created_at',
  ).limit(1000).get();
  return rowsOf(response);
}

async function loadAccountCaseDrillScores(sessionId: string): Promise<CaseDrillAttemptInput[]> {
  const response = await fetch(ROADMAP_SAVE_HOOK, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
    body: JSON.stringify({ action: 'skill_scores' }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.success !== true) {
    throw new Error(payload?.error || `Skill score request failed (${response.status}).`);
  }
  return rowsOf(payload.case_drill_scores);
}

async function loadSessionCaseDrillScores(): Promise<CaseDrillAttemptInput[]> {
  const db = workspaceDb();
  const response = await withColumns(
    db.from('drill_library_attempts').eq('status', 'completed'),
    'id', 'question_id', 'skill', 'score', 'scoring_json', 'completed_on', 'updated_at',
  ).limit(1000).get();
  return rowsOf(response).map((row) => {
    const scoring = parseJsonish(row?.scoring_json);
    return {
      source: 'library',
      id: row?.id,
      question_id: row?.question_id,
      skill: row?.skill,
      score: row?.score,
      rubric_id: scoring?.rubricId ?? null,
      scale: scoring?.scale ?? null,
      overall_score: scoring?.overallScore ?? null,
      completed_on: row?.completed_on,
      updated_at: row?.updated_at,
    };
  });
}

async function loadCaseDrillRows(sessionId: string | null | undefined, accountEmail: string | null | undefined): Promise<CaseDrillAttemptInput[]> {
  if (sessionId && accountEmail) {
    try {
      return await loadAccountCaseDrillScores(sessionId);
    } catch {
      // Fall back to the current session's own rows below.
    }
  }
  return loadSessionCaseDrillScores();
}

export async function loadSkillFocus(
  sessionId: string | null | undefined,
  accountEmail: string | null | undefined,
  userKey: string,
): Promise<SkillFocus> {
  const [aptitude, caseDrill] = await Promise.allSettled([
    loadAptitudeRows(userKey),
    loadCaseDrillRows(sessionId, accountEmail),
  ]);
  if (aptitude.status === 'rejected' && caseDrill.status === 'rejected') throw aptitude.reason;
  return computeSkillFocus(
    aptitude.status === 'fulfilled' ? aptitude.value : [],
    caseDrill.status === 'fulfilled' ? caseDrill.value : [],
  );
}

export interface SkillFocusState {
  status: 'loading' | 'ready' | 'error';
  focus: SkillFocus | null;
}

/** Recomputes after every graded session (readiness event) and when the learner returns to My Roadmap. */
export function useSkillFocus(
  sessionId: string | null | undefined,
  accountEmail: string | null | undefined,
  userKey: string,
): SkillFocusState {
  const [state, setState] = useState<SkillFocusState>({ status: 'loading', focus: null });
  const requestRef = useRef(0);
  const fetchedAtRef = useRef(0);

  const refresh = useCallback(async () => {
    // A session id can arrive one render before its account email; never read with a temporary device key.
    if (sessionId && !accountEmail) return;
    const requestId = ++requestRef.current;
    fetchedAtRef.current = Date.now();
    try {
      const focus = await loadSkillFocus(sessionId, accountEmail, userKey);
      if (requestId === requestRef.current) setState({ status: 'ready', focus });
    } catch {
      if (requestId === requestRef.current) {
        setState((previous) => (previous.focus ? previous : { status: 'error', focus: null }));
      }
    }
  }, [sessionId, accountEmail, userKey]);

  useEffect(() => {
    void refresh();
    let gradedTimer: number | undefined;
    // Give the graded row a moment to land before re-reading it.
    const onGraded = () => {
      window.clearTimeout(gradedTimer);
      gradedTimer = window.setTimeout(() => void refresh(), 800);
    };
    const onReturn = () => {
      if (Date.now() - fetchedAtRef.current >= REFRESH_MIN_MS) void refresh();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') onReturn();
    };
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent)?.detail?.appId === 'my-roadmap') onReturn();
    };
    window.addEventListener(READINESS_UPDATED_EVENT, onGraded);
    window.addEventListener('focus', onReturn);
    window.addEventListener('openApp', onOpenApp);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearTimeout(gradedTimer);
      window.removeEventListener(READINESS_UPDATED_EVENT, onGraded);
      window.removeEventListener('focus', onReturn);
      window.removeEventListener('openApp', onOpenApp);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  return state;
}
