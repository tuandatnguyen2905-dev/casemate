import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { AlertTriangle, Check, CloudOff, Download, Loader2, RotateCcw, X } from 'lucide-react';
import { useSpaceRuntime } from '../../../SpaceRuntimeContext';
import { learnerScopeFor } from '../../InteractiveLearning/practiceReview/learnerScope';
import { browserKeyValueStore, memoryKeyValueStore } from './progressModel';
import { BOOT_RECONCILE } from './progressSyncBoot';
import { PROGRESS_UPDATED_EVENT, ProgressSyncEngine, reconcileWorkingCopy } from './progressSyncEngine';
import type { SyncStatus } from './progressSyncEngine';
import { createHttpTransport } from './progressTransport';

const DOMAIN_APP_ID = 'industry-knowledge';
const SCAN_INTERVAL_MS = 4000;
const PRACTICE_CHANGED_EVENTS = [PROGRESS_UPDATED_EVENT, 'casemate:practice-review:resume'];

const lessonMounted = () => typeof document !== 'undefined' && Boolean(document.querySelector('[data-domain-mobile]'));

/**
 * Account sync for Domain Knowledge progress. Mounted once by the shell; renders only while Domain Knowledge is
 * the open app and a learner is signed in. Guests see nothing and nothing is sent.
 */
export default function DomainProgressSyncHost({ activeAppId }: { activeAppId?: string | null }) {
  let runtime: ReturnType<typeof useSpaceRuntime> | null = null;
  try {
    runtime = useSpaceRuntime();
  } catch {
    runtime = null;
  }
  const scope = learnerScopeFor(runtime?.userEmail ?? null);
  const sessionId = runtime?.sessionId ?? null;
  const spaceId = runtime?.spaceId ?? null;

  const engine = useMemo(() => {
    const store = (typeof window !== 'undefined' ? browserKeyValueStore(window.localStorage) : null) ?? memoryKeyValueStore();
    const transport = scope && sessionId && spaceId ? createHttpTransport({ spaceId, sessionId }) : null;
    return new ProgressSyncEngine({
      store,
      scope,
      transport,
      locationSearch: () => (typeof window !== 'undefined' ? window.location.search : ''),
      lessonMounted,
      emit: (event) => { try { window.dispatchEvent(new CustomEvent(event)); } catch { /* optional */ } },
    });
  }, [scope, sessionId, spaceId]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const store = browserKeyValueStore(window.localStorage);
    let reconcile = BOOT_RECONCILE;
    if (store) {
      const result = reconcileWorkingCopy(store, scope);
      // Signing in, signing out or switching account while a lesson is open: reload so no screen keeps
      // another owner's progress in memory.
      if (result.changed && lessonMounted()) {
        window.location.reload();
        return undefined;
      }
      reconcile = result.error ? result : reconcile;
    }
    void engine.start(reconcile);
    const scan = () => { engine.scan(); };
    const timer = window.setInterval(scan, SCAN_INTERVAL_MS);
    const onHide = () => {
      engine.scan();
      void engine.flush({ keepalive: true });
    };
    const onVisibility = () => { if (document.visibilityState === 'hidden') onHide(); };
    const onOnline = () => { engine.retryNow(); };
    PRACTICE_CHANGED_EVENTS.forEach((name) => window.addEventListener(name, scan));
    window.addEventListener('pagehide', onHide);
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      PRACTICE_CHANGED_EVENTS.forEach((name) => window.removeEventListener(name, scan));
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisibility);
      engine.scan();
      engine.stop();
    };
  }, [engine, scope]);

  const status = useSyncExternalStore(engine.subscribe, engine.getStatus, engine.getStatus);
  if (activeAppId !== DOMAIN_APP_ID || status.phase === 'guest') return null;
  return <SyncPanel status={status} engine={engine} />;
}

const pill = 'inline-flex min-h-8 items-center gap-1.5 rounded-full border bg-white px-3 text-[11px] font-semibold shadow-sm';
const primaryButton = 'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50';
const secondaryButton = 'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50';

function StatusPill({ status, onRetry }: { status: SyncStatus; onRetry: () => void }) {
  switch (status.phase) {
    case 'saved':
      return <span className={`${pill} border-slate-200 text-slate-600`} data-testid="dk-sync-status" data-state="saved"><Check className="h-3.5 w-3.5 text-emerald-600" />Saved</span>;
    case 'saving':
      return <span className={`${pill} border-slate-200 text-slate-600`} data-testid="dk-sync-status" data-state="saving"><Loader2 className="h-3.5 w-3.5 animate-spin" />Saving…</span>;
    case 'offline':
      return <span className={`${pill} border-amber-200 text-amber-800`} data-testid="dk-sync-status" data-state="offline"><CloudOff className="h-3.5 w-3.5" />Offline – not yet synced</span>;
    case 'failed':
    case 'auth':
      return (
        <span className={`${pill} border-red-200 text-red-700`} data-testid="dk-sync-status" data-state={status.phase}>
          <AlertTriangle className="h-3.5 w-3.5" />
          Sync failed{status.phase === 'auth' ? ' – sign in again; changes are kept on this device' : status.storageBlocked ? ' – browser storage is full' : ''}
          {status.phase === 'failed' && !status.storageBlocked ? <button type="button" onClick={onRetry} className="ml-1 underline decoration-red-200 underline-offset-2">Retry</button> : null}
        </span>
      );
    default:
      return null;
  }
}

function SyncPanel({ status, engine }: { status: SyncStatus; engine: ProgressSyncEngine }) {
  const [conflictsOpen, setConflictsOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(true);
  const onLessonHome = typeof window !== 'undefined' && !new URLSearchParams(window.location.search).get('dkLesson');
  const resume = status.resume;
  const continueHref = useMemo(() => {
    if (!resume || typeof window === 'undefined' || !Object.keys(resume.params).length) return null;
    const url = new URL(window.location.href);
    Object.entries(resume.params).forEach(([name, value]) => url.searchParams.set(name, value));
    url.searchParams.delete('dkPractice');
    url.searchParams.delete('dkChapter');
    return url.toString();
  }, [resume]);
  const offer = status.importOffer;

  return (
    <div className="pointer-events-none fixed bottom-20 left-3 z-40 flex max-w-[min(92vw,360px)] flex-col items-start gap-2 md:bottom-4" aria-live="polite" data-testid="dk-sync-host">
      {offer && importOpen && status.importState !== 'done' && (
        <section className="pointer-events-auto w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-lg" data-testid="dk-sync-import">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Import available</p>
            <button type="button" onClick={() => setImportOpen(false)} className="rounded p-1 text-slate-400 hover:text-slate-700" aria-label="Decide later"><X className="h-3.5 w-3.5" /></button>
          </div>
          <p className="mt-1 text-sm font-bold text-slate-900">Progress was saved on this browser before you signed in</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            It is not linked to your account. Import it only if it is yours: {offer.total} item{offer.total === 1 ? '' : 's'}
            {offer.differs ? `, ${offer.differs} already in your account in another version (completed work is always kept)` : ''}
            {offer.noteConflicts ? `, ${offer.noteConflicts} note${offer.noteConflicts === 1 ? '' : 's'} that differ (you will choose which to keep)` : ''}.
            The copy on this browser stays as it is.
          </p>
          {status.importState === 'failed' && <p className="mt-2 text-xs font-semibold text-red-700">Import did not finish. Nothing was lost; you can retry.</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={primaryButton} disabled={status.importState === 'running'} onClick={() => { void engine.importDevice(); }} data-testid="dk-sync-import-confirm">
              {status.importState === 'running' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              {status.importState === 'failed' ? 'Retry import' : 'Import to my account'}
            </button>
            <button type="button" className={secondaryButton} onClick={() => engine.dismissImport()} data-testid="dk-sync-import-dismiss">Not mine</button>
          </div>
        </section>
      )}

      {conflictsOpen && status.conflicts.length > 0 && (
        <section className="pointer-events-auto w-full rounded-2xl border border-amber-200 bg-white p-4 shadow-lg" data-testid="dk-sync-conflicts">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700">Conflict</p>
            <button type="button" onClick={() => setConflictsOpen(false)} className="rounded p-1 text-slate-400 hover:text-slate-700" aria-label="Close"><X className="h-3.5 w-3.5" /></button>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-600">A note was edited on two devices. Both versions are kept until you choose.</p>
          <ul className="mt-3 space-y-3">
            {status.conflicts.map((conflict) => (
              <li key={conflict.recordKey} className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">This device</p>
                <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-xs text-slate-700">{conflict.local.text || '(empty)'}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Other device</p>
                <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-xs text-slate-700">{conflict.remote.text || '(empty)'}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button type="button" className={secondaryButton} onClick={() => engine.resolveConflict(conflict.recordKey, 'local')}>Keep this device</button>
                  <button type="button" className={secondaryButton} onClick={() => engine.resolveConflict(conflict.recordKey, 'remote')}>Use other device</button>
                  <button type="button" className={secondaryButton} onClick={() => engine.resolveConflict(conflict.recordKey, 'both')}>Keep both</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {onLessonHome && resume && continueHref && (
        <a href={continueHref} className="pointer-events-auto inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm hover:border-red-200 hover:text-red-700" data-testid="dk-sync-continue">
          Continue {resume.lessonTitle ? `“${resume.lessonTitle}”` : 'your lesson'} · {resume.stage === 'takeaways' ? 'Takeaways' : `Chapter ${resume.chapter + 1}`}
        </a>
      )}

      <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
        <StatusPill status={status} onRetry={() => engine.retryNow()} />
        {status.conflicts.length > 0 && (
          <button type="button" onClick={() => setConflictsOpen(true)} className={`${pill} border-amber-200 text-amber-800`} data-testid="dk-sync-conflict-chip">
            <AlertTriangle className="h-3.5 w-3.5" />Conflict
          </button>
        )}
        {offer && !importOpen && status.importState !== 'done' && (
          <button type="button" onClick={() => setImportOpen(true)} className={`${pill} border-slate-200 text-slate-700`}>
            <Download className="h-3.5 w-3.5" />Import available
          </button>
        )}
        {status.importState === 'done' && <span className={`${pill} border-emerald-200 text-emerald-700`} data-testid="dk-sync-import-done"><Check className="h-3.5 w-3.5" />Import completed</span>}
        {status.refreshSuggested && (
          <button type="button" onClick={() => window.location.reload()} className={`${pill} border-slate-200 text-slate-700`}>
            <RotateCcw className="h-3.5 w-3.5" />Refresh to show progress from your other device
          </button>
        )}
      </div>
    </div>
  );
}
