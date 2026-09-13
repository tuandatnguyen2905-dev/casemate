import { useCallback, useEffect, useMemo, useRef } from 'react';
import { isFounderEmail } from '../lib/founderAccess';

const SESSION_TABLE = 'session_tracking';
const HEARTBEAT_MS = 60_000;
const IDLE_TIMEOUT_MS = 5 * 60_000;
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';

interface ActiveVisit {
  rowId: number;
  visitSessionId: string;
  startedMs: number;
  appOpens: number;
}

interface SessionTrackerOptions {
  enabled: boolean;
  spaceId: string;
  workspaceSessionId?: string;
}

function makeVisitSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    const value = character === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function insertedRowId(result: any): number | null {
  const row = Array.isArray(result?.data)
    ? result.data[0]
    : result?.data || result?.row || result;
  const id = Number(row?.id);
  return Number.isFinite(id) && id > 0 ? id : null;
}

async function rebindVerifiedBrowserSession(spaceId: string, workspaceSessionId: string): Promise<boolean> {
  if (!workspaceSessionId.startsWith('wses_')) return false;
  const sharedSpacePath = `/space/${encodeURIComponent(spaceId)}`;
  const onSharedSpacePath = window.location.pathname === sharedSpacePath
    || window.location.pathname.startsWith(`${sharedSpacePath}/`);
  const query = new URLSearchParams({
    workspaceId: WORKSPACE_ID,
    spaceId,
    sessionUuid: workspaceSessionId,
  });
  try {
    const response = await fetch(
      onSharedSpacePath
        ? `${sharedSpacePath}/check-session`
        : `/api/auth/otp/space/check-session?${query.toString()}`,
      { credentials: 'include', cache: 'no-store' },
    );
    if (!response.ok) return false;
    const result = await response.json().catch(() => ({}));
    return result?.verified === true
      || (result?.authorized === true && result?.identityMode === 'legacy_registration');
  } catch {
    return false;
  }
}

function readAuthenticatedUserId(spaceId: string, workspaceSessionId: string): string | null {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (!stored) return `session:${workspaceSessionId}`;
    const session = JSON.parse(stored);
    if (!session || session.verified === false) return null;
    const email = typeof session.email === 'string' ? session.email.toLowerCase().trim() : '';
    if (isFounderEmail(email)) return null;
    return email ? `email:${email}` : `session:${workspaceSessionId}`;
  } catch {
    return `session:${workspaceSessionId}`;
  }
}

/**
 * Tracks one row per authenticated, visible visit segment. A hidden tab closes
 * the current segment and opening it again starts a new one. Heartbeats update
 * ended_at every minute, so an unclean mobile/browser exit still has a useful
 * last-seen timestamp. Founder sessions are excluded from customer analytics.
 */
export function useSessionDurationTracking({
  enabled,
  spaceId,
  workspaceSessionId,
}: SessionTrackerOptions): { recordAppOpen: () => void } {
  const recordAppOpenRef = useRef<() => void>(() => undefined);
  const userId = useMemo(
    () => (enabled && workspaceSessionId ? readAuthenticatedUserId(spaceId, workspaceSessionId) : null),
    [enabled, spaceId, workspaceSessionId],
  );

  useEffect(() => {
    if (!enabled || !workspaceSessionId || !userId) {
      recordAppOpenRef.current = () => undefined;
      return;
    }

    const db = (window as any).__workspaceDb;
    if (!db?.from) return;

    let disposed = false;
    let starting = false;
    let active: ActiveVisit | null = null;
    let pendingAppOpens = 0;
    let lastActivityMs = Date.now();
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    let updateChain: Promise<unknown> = Promise.resolve();

    const durationPatch = (visit: ActiveVisit, endedMs: number) => ({
      ended_at: new Date(endedMs).toISOString(),
      duration_seconds: Math.max(0, Math.round((endedMs - visit.startedMs) / 1000)),
      app_opens_in_session: visit.appOpens,
    });

    const updateWithSdk = (visit: ActiveVisit, patch: Record<string, unknown>) => {
      updateChain = updateChain
        .catch(() => undefined)
        .then(() => db.from(SESSION_TABLE).update(visit.rowId, patch))
        .catch((error: unknown) => {
          console.warn('[SessionTracking] Update skipped:', error);
        });
    };

    const updateWithKeepalive = (visit: ActiveVisit, patch: Record<string, unknown>) => {
      const token = db?.token;
      if (!token) {
        updateWithSdk(visit, patch);
        return;
      }
      void fetch(`/api/workspaces/${WORKSPACE_ID}/data/${SESSION_TABLE}/${visit.rowId}`, {
        method: 'PATCH',
        credentials: 'same-origin',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Workspace-DB-Token': String(token),
        },
        body: JSON.stringify(patch),
      }).then((response) => {
        if (!response.ok && !disposed) updateWithSdk(visit, patch);
      }).catch(() => {
        if (!disposed) updateWithSdk(visit, patch);
      });
    };

    const finishVisit = (endedMs: number, keepalive = false) => {
      const visit = active;
      if (!visit) return;
      active = null;
      const patch = durationPatch(visit, Math.max(visit.startedMs, endedMs));
      if (keepalive) updateWithKeepalive(visit, patch);
      else updateWithSdk(visit, patch);
    };

    const startVisit = async () => {
      if (disposed || starting || active || document.visibilityState === 'hidden') return;
      starting = true;
      const startedMs = Date.now();
      const visitSessionId = makeVisitSessionId();
      const appOpensAtInsert = pendingAppOpens;
      try {
        // A stored session id keeps the shell signed in, but private writes are
        // authorized by the platform's HttpOnly session cookie. Revalidate the
        // canonical id first so email and OAuth logins both renew that cookie.
        if (!await rebindVerifiedBrowserSession(spaceId, workspaceSessionId)) {
          throw new Error('Sign in again before starting session tracking.');
        }
        const result = await db.from(SESSION_TABLE).insert({
          user_id: userId,
          visit_session_id: visitSessionId,
          started_at: new Date(startedMs).toISOString(),
          ended_at: null,
          duration_seconds: 0,
          date: new Date(startedMs).toISOString().slice(0, 10),
          app_opens_in_session: appOpensAtInsert,
        });
        let rowId = insertedRowId(result);
        if (!rowId) {
          const lookup = await db
            .from(SESSION_TABLE)
            .eq('visit_session_id', visitSessionId)
            .limit(1)
            .get();
          rowId = insertedRowId(lookup);
        }
        if (!rowId) throw new Error('Session row was created without a readable id.');

        const visit: ActiveVisit = {
          rowId,
          visitSessionId,
          startedMs,
          appOpens: pendingAppOpens,
        };
        pendingAppOpens = 0;
        if (disposed) {
          updateWithKeepalive(visit, durationPatch(visit, Date.now()));
          return;
        }
        active = visit;
        if (visit.appOpens !== appOpensAtInsert) {
          updateWithSdk(visit, { app_opens_in_session: visit.appOpens });
        }
        if (document.visibilityState === 'hidden') finishVisit(Date.now(), true);
      } catch (error) {
        console.warn('[SessionTracking] Start skipped:', error);
      } finally {
        starting = false;
      }
    };

    const scheduleIdleEnd = () => {
      if (idleTimer) clearTimeout(idleTimer);
      const remaining = Math.max(0, IDLE_TIMEOUT_MS - (Date.now() - lastActivityMs));
      idleTimer = setTimeout(() => {
        if (Date.now() - lastActivityMs >= IDLE_TIMEOUT_MS) {
          finishVisit(lastActivityMs + IDLE_TIMEOUT_MS);
        } else {
          scheduleIdleEnd();
        }
      }, remaining);
    };

    const noteActivity = () => {
      if (document.visibilityState === 'hidden') return;
      lastActivityMs = Date.now();
      if (!active && !starting) void startVisit();
      scheduleIdleEnd();
    };

    recordAppOpenRef.current = () => {
      if (document.visibilityState === 'hidden') return;
      if (active) {
        active.appOpens += 1;
        updateWithSdk(active, { app_opens_in_session: active.appOpens });
      } else {
        pendingAppOpens += 1;
        void startVisit();
      }
      noteActivity();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        finishVisit(Date.now(), true);
        if (idleTimer) clearTimeout(idleTimer);
      } else {
        lastActivityMs = Date.now();
        void startVisit();
        scheduleIdleEnd();
      }
    };

    const handleBeforeUnload = () => finishVisit(Date.now(), true);
    const activityEvents: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, noteActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    heartbeatTimer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastActivityMs >= IDLE_TIMEOUT_MS) {
        finishVisit(lastActivityMs + IDLE_TIMEOUT_MS);
        return;
      }
      if (!active) {
        void startVisit();
        return;
      }
      updateWithSdk(active, durationPatch(active, Date.now()));
    }, HEARTBEAT_MS);

    void startVisit();
    scheduleIdleEnd();

    return () => {
      const visit = active;
      active = null;
      if (visit) updateWithKeepalive(visit, durationPatch(visit, Date.now()));
      disposed = true;
      recordAppOpenRef.current = () => undefined;
      if (idleTimer) clearTimeout(idleTimer);
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, noteActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, spaceId, userId, workspaceSessionId]);

  const recordAppOpen = useCallback(() => recordAppOpenRef.current(), []);
  return { recordAppOpen };
}
