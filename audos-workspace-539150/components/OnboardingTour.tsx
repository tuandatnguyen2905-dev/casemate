import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, HelpCircle, Lightbulb, X } from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { getTourPopoverPosition, tourMotionSettings } from '../lib/fitAssessmentExperience';

const STATE_TABLE = 'onboarding_tour_state';
const EVENT_TABLE = 'feature_events';
const TOUR_VERSION = 1;

type TourStatus = 'completed' | 'skipped' | null;

type TourStateRow = {
  id?: number;
  user_key: string;
  tour_status: TourStatus;
  tour_completed_at: string | null;
  fit_tip_seen: boolean;
  case_pool_tip_seen: boolean;
  tour_version: number;
};

type TourStep = {
  title: string;
  eyebrow: string;
  appId: string;
  lines: string[];
};

const TOUR_STEPS: TourStep[] = [
  {
    eyebrow: 'Recommended first step',
    title: 'Find your fit',
    appId: 'fit-assessment',
    lines: ['Fit Assessment finds the industries, functions, and programs that fit you.'],
  },
  {
    eyebrow: 'Explore and plan',
    title: 'Choose where to focus',
    appId: 'browse-programs',
    lines: [
      'Browse Programs helps you compare current opportunities.',
      'My Roadmap turns your gaps into a practical preparation plan.',
    ],
  },
  {
    eyebrow: 'Practise',
    title: 'Build your case skills',
    appId: 'case-drill-log',
    lines: [
      'Case Pool helps you choose a full case to practise.',
      'Case Drill gives you short, focused practice reps.',
      'Case Arena lets you practise in a live team competition.',
    ],
  },
  {
    eyebrow: 'Learn and test',
    title: 'Strengthen your foundations',
    appId: 'industry-knowledge',
    lines: [
      'Domain Knowledge builds the industry context employers expect.',
      'Aptitude Test helps you practise common employer assessments.',
    ],
  },
  {
    eyebrow: 'You are ready',
    title: 'Start with Fit Assessment',
    appId: 'fit-assessment',
    lines: ['Begin with Fit Assessment so your results can guide what to explore and practise next.'],
  },
];

const EMPTY_STATE = (userKey: string): TourStateRow => ({
  user_key: userKey,
  tour_status: null,
  tour_completed_at: null,
  fit_tip_seen: false,
  case_pool_tip_seen: false,
  tour_version: TOUR_VERSION,
});

function targetFor(appId: string): HTMLElement | null {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>(
    `[data-testid="top-nav-${appId}"], [data-testid="mobile-nav-${appId}"], [data-testid="button-app-${appId}"]`,
  ));
  return candidates.find((candidate) => candidate.offsetParent !== null && candidate.clientWidth > 0 && candidate.clientHeight > 0) || null;
}

function eventRole(eventName: string): string {
  if (eventName === 'tour_started') return 'open';
  if (eventName === 'tour_step_viewed') return 'step';
  if (eventName === 'tour_completed') return 'activation';
  if (eventName === 'help_reopened') return 'retention';
  return 'diagnostic';
}

export default function OnboardingTour({
  activeAppId,
  onOpenApp,
}: {
  activeAppId: string | null;
  onOpenApp: (appId: string) => void;
}) {
  const { mode, sessionId, userEmail } = useSpaceRuntime();
  const userKey = userEmail ? `email:${userEmail.trim().toLowerCase()}` : '';
  const eligible = mode === 'customer' && !!sessionId && !!userKey;
  const [loaded, setLoaded] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourSource, setTourSource] = useState<'first_login' | 'help'>('first_login');
  const [stepIndex, setStepIndex] = useState(0);
  const [stateRow, setStateRow] = useState<TourStateRow | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rowRef = useRef<TourStateRow | null>(null);
  const startedForRef = useRef('');
  const openAppRef = useRef(onOpenApp);
  const activeAppRef = useRef(activeAppId);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    openAppRef.current = onOpenApp;
  }, [onOpenApp]);

  useEffect(() => {
    activeAppRef.current = activeAppId;
  }, [activeAppId]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  const readState = useCallback(async (): Promise<TourStateRow | null> => {
    const db = (window as any).__workspaceDb;
    if (!db || !userKey) return null;
    const result = await db
      .from(STATE_TABLE, { shared: true })
      .select('id', 'user_key', 'tour_status', 'tour_completed_at', 'fit_tip_seen', 'case_pool_tip_seen', 'tour_version')
      .eq('user_key', userKey)
      .limit(1)
      .get();
    return Array.isArray(result?.data) && result.data.length ? result.data[0] as TourStateRow : null;
  }, [userKey]);

  const logEvent = useCallback(async (
    eventName: string,
    properties: Record<string, unknown> = {},
    appIdOverride?: string | null,
  ) => {
    const db = (window as any).__workspaceDb;
    if (!db || !eligible || !sessionId) return;
    const now = new Date().toISOString();
    const eventId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    try {
      await db.from(EVENT_TABLE).insert({
        event_key: `live|onboarding|${eventName}|${eventId}`,
        schema_version: 1,
        event_name: eventName,
        event_role: eventRole(eventName),
        feature_name: 'fit',
        app_id: appIdOverride === undefined ? activeAppRef.current || null : appIdOverride,
        mode: 'onboarding',
        user_id: userKey,
        identity_status: 'resolved',
        source_user_key: userKey,
        identity_session_ref: sessionId,
        completion_key: eventName === 'tour_completed' ? `${userKey}|tour-v${TOUR_VERSION}` : null,
        occurred_at: now,
        properties_json: { tour_version: TOUR_VERSION, ...properties },
        source_kind: 'live',
        source_table: null,
        source_record_id: null,
      });
    } catch (error) {
      console.warn('[OnboardingTour] Event log failed:', eventName, error);
    }
  }, [eligible, sessionId, userKey]);

  const saveState = useCallback(async (patch: Partial<TourStateRow>) => {
    if (!eligible || !userKey) return;
    const db = (window as any).__workspaceDb;
    if (!db) return;
    const current = rowRef.current || EMPTY_STATE(userKey);
    const next: TourStateRow = { ...current, ...patch, user_key: userKey, tour_version: TOUR_VERSION };
    rowRef.current = next;
    setStateRow(next);

    try {
      if (current.id) {
        await db.from(STATE_TABLE).update(current.id, patch);
      } else {
        await db.from(STATE_TABLE).insert({
          user_key: userKey,
          tour_status: next.tour_status,
          tour_completed_at: next.tour_completed_at,
          fit_tip_seen: next.fit_tip_seen,
          case_pool_tip_seen: next.case_pool_tip_seen,
          tour_version: TOUR_VERSION,
        });
      }
    } catch (error) {
      // A second tab may have inserted the unique account row first. Re-read
      // that row and apply this same account-owned update instead of dropping it.
      try {
        const existing = await readState();
        if (existing?.id) {
          await db.from(STATE_TABLE).update(existing.id, patch);
        } else {
          throw error;
        }
      } catch (retryError) {
        console.warn('[OnboardingTour] State save failed:', retryError);
      }
    }

    try {
      const stored = await readState();
      if (stored) {
        rowRef.current = stored;
        setStateRow(stored);
      }
    } catch {
      // Keep the optimistic state for this visit; the next visit re-checks DB.
    }
  }, [eligible, readState, userKey]);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setTourOpen(false);
    rowRef.current = null;
    setStateRow(null);
    if (!eligible) {
      setLoaded(true);
      return;
    }

    void readState()
      .then((stored) => {
        if (cancelled) return;
        const next = stored || EMPTY_STATE(userKey);
        rowRef.current = next;
        setStateRow(next);
        setLoaded(true);
        if (next.tour_status !== 'completed' && next.tour_status !== 'skipped') {
          openAppRef.current('fit-assessment');
          setTourSource('first_login');
          setStepIndex(0);
          setTourOpen(true);
          if (startedForRef.current !== userKey) {
            startedForRef.current = userKey;
            void logEvent('tour_started', { source: 'first_login' }, 'fit-assessment');
          }
        }
      })
      .catch((error) => {
        // A persistence outage must not trap the signed-in user behind a loader.
        console.warn('[OnboardingTour] State load failed:', error);
        if (!cancelled) setLoaded(true);
      });
    return () => { cancelled = true; };
  }, [eligible, logEvent, readState, userKey]);

  const findAvailableStep = useCallback((start: number, direction: 1 | -1): number | null => {
    for (let index = start; index >= 0 && index < TOUR_STEPS.length; index += direction) {
      if (targetFor(TOUR_STEPS[index].appId)) return index;
    }
    return null;
  }, []);

  useEffect(() => {
    if (!tourOpen) return;
    const step = TOUR_STEPS[stepIndex];
    const motion = tourMotionSettings(reducedMotion);
    let cancelled = false;
    let measureFrame = 0;
    let startFrame = 0;
    let settleTimer = 0;
    let scrollEndHandler: (() => void) | null = null;

    const measureOnce = () => {
      window.cancelAnimationFrame(measureFrame);
      measureFrame = window.requestAnimationFrame(() => {
        if (cancelled) return;
        const target = targetFor(step.appId);
        if (!target) return;
        setTargetRect(target.getBoundingClientRect());
        dialogRef.current?.focus({ preventScroll: true });
      });
    };

    const finishScroll = () => {
      if (scrollEndHandler) {
        (window as any).removeEventListener('scrollend', scrollEndHandler);
        scrollEndHandler = null;
      }
      window.clearTimeout(settleTimer);
      measureOnce();
    };

    startFrame = window.requestAnimationFrame(() => {
      const target = targetFor(step.appId);
      if (!target) {
        const next = findAvailableStep(stepIndex + 1, 1);
        if (next !== null) setStepIndex(next);
        else setTourOpen(false);
        return;
      }
      target.scrollIntoView({ behavior: motion.scrollBehavior, block: 'nearest', inline: 'center' });
      if (motion.scrollBehavior === 'auto') {
        measureOnce();
        return;
      }
      scrollEndHandler = finishScroll;
      (window as any).addEventListener('scrollend', scrollEndHandler, { once: true });
      // Browsers without scrollend still measure only once, after the native
      // smooth scroll has had enough time to settle.
      settleTimer = window.setTimeout(finishScroll, 400);
    });

    const measureAfterResize = () => measureOnce();
    window.addEventListener('resize', measureAfterResize);
    void logEvent('tour_step_viewed', {
      source: tourSource,
      step: stepIndex + 1,
      step_title: step.title,
    }, step.appId);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(startFrame);
      window.cancelAnimationFrame(measureFrame);
      window.clearTimeout(settleTimer);
      if (scrollEndHandler) (window as any).removeEventListener('scrollend', scrollEndHandler);
      window.removeEventListener('resize', measureAfterResize);
    };
  }, [findAvailableStep, logEvent, reducedMotion, stepIndex, tourOpen, tourSource]);

  const go = (direction: 1 | -1) => {
    const next = findAvailableStep(stepIndex + direction, direction);
    if (next !== null) setStepIndex(next);
  };

  const closeTour = async (status: Exclude<TourStatus, null>) => {
    const finishedAt = new Date().toISOString();
    setTourOpen(false);
    await saveState({ tour_status: status, tour_completed_at: finishedAt });
    void logEvent(status === 'completed' ? 'tour_completed' : 'tour_skipped', {
      source: tourSource,
      final_step: stepIndex + 1,
    }, TOUR_STEPS[stepIndex]?.appId || null);
    if (status === 'completed') openAppRef.current('fit-assessment');
  };

  const reopenTour = () => {
    openAppRef.current('fit-assessment');
    setTourSource('help');
    setStepIndex(0);
    setTourOpen(true);
    void logEvent('help_reopened', { source_app_id: activeAppId }, activeAppId);
  };

  const contextualTip = useMemo(() => {
    if (!loaded || tourOpen || !stateRow) return null;
    if (activeAppId === 'fit-assessment' && !stateRow.fit_tip_seen) {
      return {
        key: 'fit_tip_seen' as const,
        title: 'Two ways to start',
        lines: [
          'Have a target? Validate that program and function.',
          'Still exploring? Let Casemate help you find a direction.',
        ],
      };
    }
    if (activeAppId === 'case-drill-log' && !stateRow.case_pool_tip_seen) {
      return {
        key: 'case_pool_tip_seen' as const,
        title: 'Use Case Pool your way',
        lines: [
          'Filter the library to find the skill or case type you need.',
          'Open any case to practise; your progress is saved to your account.',
        ],
      };
    }
    return null;
  }, [activeAppId, loaded, stateRow, tourOpen]);

  if (!eligible) return null;

  const step = TOUR_STEPS[stepIndex];
  const stepLines = step?.lines.filter((line) => !(
    typeof window !== 'undefined' && window.innerWidth < 768 && line.includes('Case Arena')
  )) || [];
  const viewportWidth = typeof window === 'undefined' ? 1024 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 768 : window.innerHeight;
  const popoverWidth = Math.min(380, viewportWidth - 24);
  const popoverPosition = getTourPopoverPosition(targetRect, viewportWidth, viewportHeight, popoverWidth);
  const motion = tourMotionSettings(reducedMotion);

  return (
    <>
      <button
        type="button"
        onClick={reopenTour}
        className="fixed bottom-[calc(76px+env(safe-area-inset-bottom))] left-4 z-[65] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)] shadow-xl transition hover:-translate-y-0.5 hover:bg-[var(--space-surface-accent-soft)] md:bottom-4"
        aria-label="Open welcome tour"
        title="Open welcome tour"
        data-testid="button-reopen-onboarding-tour"
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      {contextualTip && (
        <aside className="fixed bottom-[calc(132px+env(safe-area-inset-bottom))] left-4 z-[64] w-[min(330px,calc(100vw-2rem))] rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_35%,var(--space-border-default))] bg-[var(--space-surface-card)] p-4 shadow-2xl md:bottom-20" role="status" data-testid={`context-tip-${activeAppId}`}>
          <button type="button" onClick={() => void saveState({ [contextualTip.key]: true })} className="absolute right-2 top-2 rounded-lg p-2 text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]" aria-label="Dismiss tip"><X className="h-4 w-4" /></button>
          <div className="flex items-start gap-3 pr-7">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]"><Lightbulb className="h-4 w-4" /></span>
            <div>
              <p className="text-sm font-extrabold text-[var(--space-text-primary)]">{contextualTip.title}</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                {contextualTip.lines.map((line) => <li key={line}>• {line}</li>)}
              </ul>
              <button type="button" onClick={() => void saveState({ [contextualTip.key]: true })} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Check className="h-3.5 w-3.5" /> Got it</button>
            </div>
          </div>
        </aside>
      )}

      {tourOpen && step && (
        <>
          <div className="pointer-events-none fixed inset-0 z-[70] bg-[color-mix(in_srgb,var(--space-neutral-950)_28%,transparent)]" aria-hidden="true" />
          {targetRect && (
            <div
              className="pointer-events-none fixed left-0 top-0 z-[71] rounded-xl border-2 border-[var(--space-brand-primary-500)] shadow-[0_0_0_5px_color-mix(in_srgb,var(--space-brand-primary-500)_25%,transparent)] transition-[transform,opacity] ease-out motion-reduce:transition-none"
              style={{
                width: targetRect.width + 8,
                height: targetRect.height + 8,
                transform: `translate3d(${Math.round(targetRect.left - 4)}px, ${Math.round(targetRect.top - 4)}px, 0)`,
                transitionDuration: `${motion.transitionMs}ms`,
                willChange: reducedMotion ? undefined : 'transform, opacity',
              }}
              aria-hidden="true"
            />
          )}
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-tour-title"
            className="fixed left-0 top-0 z-[80] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-2xl outline-none transition-[transform,opacity] ease-out motion-reduce:transition-none sm:p-6"
            style={{
              width: popoverWidth,
              transform: popoverPosition.transform,
              opacity: targetRect ? 1 : 0,
              transitionDuration: `${motion.transitionMs}ms`,
              willChange: tourOpen && !reducedMotion ? 'transform, opacity' : undefined,
            }}
            data-testid="onboarding-tour-popover"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">{step.eyebrow}</p>
                <h2 id="onboarding-tour-title" className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">{step.title}</h2>
              </div>
              <button type="button" onClick={() => void closeTour('skipped')} className="rounded-lg px-2 py-1 text-xs font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]">Skip</button>
            </div>

            <ul className="mt-4 space-y-2.5">
              {stepLines.map((line) => (
                <li key={line} className="flex gap-2.5 text-sm leading-6 text-[var(--space-text-secondary)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--space-brand-primary-500)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--space-border-default)] pt-4">
              <span className="text-xs font-bold tabular-nums text-[var(--space-text-muted)]">{stepIndex + 1}/{TOUR_STEPS.length}</span>
              <div className="flex items-center gap-2">
                {stepIndex > 0 && (
                  <button type="button" onClick={() => go(-1)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-bold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
                )}
                {stepIndex < TOUR_STEPS.length - 1 ? (
                  <button type="button" onClick={() => go(1)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-xs font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)]">Next <ArrowRight className="h-3.5 w-3.5" /></button>
                ) : (
                  <button type="button" onClick={() => void closeTour('completed')} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-xs font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)]">Start Fit Assessment <ArrowRight className="h-3.5 w-3.5" /></button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
