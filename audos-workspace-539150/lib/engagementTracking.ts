import { useEffect, useRef } from 'react';
import {
  isExcludedTrackingSession,
  logLiveTrackingFailure,
  resolveTrackingIdentity,
} from './liveFeatureTracking';
import { configureGa4Tracking, forwardJourneyEventToGa4, sanitizePageLocation } from './ga4Tracking';

/**
 * Casemate engagement funnel tracking (feature_events, source_kind = 'live').
 *
 * Standard events written here, alongside the older per-feature events:
 *   step_view / step_complete  – {step_name, step_index, sub_step_index, track, program_id}
 *   track_select, fit_activation, app_switch, step_error, session_start,
 *   paywall_view, checkout_start, payment_success, acq_source_reported,
 *   outcome_prompt_view, outcome_reported, outcome_prompt_dismissed,
 *   fit_rating_reported, fit_rating_prompt_dismissed.
 *
 * session_start also carries the device's first-touch acquisition
 * (acq_utm_source/medium/campaign, acq_referrer, acq_landing_path), captured
 * once per device on first landing and kept in localStorage.
 *
 * Every call is fire-and-forget: tracking can never block, delay or break the
 * product. Properties accept only scalar values; never pass CV text, names,
 * emails, phone numbers or free-text answers.
 *
 * Each event recorded here is mirrored once into GA4 by ./ga4Tracking
 * (fit_activation arrives as GA4 "activation"; session_start stays GA4's own).
 */

type EngagementRole = 'open' | 'step' | 'activation' | 'core_action' | 'diagnostic' | 'retention';
export type FitTrack = 'discovery' | 'validation';
export type MoveType = 'next_case_button' | 'self_exit_choose_other';
export type BillingEventName = 'paywall_view' | 'checkout_start' | 'payment_success';
export type OutcomeEventName = 'outcome_prompt_view' | 'outcome_reported' | 'outcome_prompt_dismissed';
export type AcquisitionSource = 'facebook' | 'tiktok' | 'friends' | 'school_club' | 'google' | 'other';
export const ACQUISITION_SOURCES: readonly AcquisitionSource[] = ['facebook', 'tiktok', 'friends', 'school_club', 'google', 'other'];
type Scalar = string | number | boolean | null;

export interface StepOptions {
  stepIndex?: number | null;
  subStepIndex?: number | null;
  subStepName?: string | null;
  track?: FitTrack | null;
  programId?: string | null;
  mode?: string | null;
  /** Collapses repeats: one row per (visit, event, app, step, sub-step, dedupeKey). */
  dedupeKey?: string | number | null;
  properties?: Record<string, unknown>;
}

interface PendingEvent {
  eventName: string;
  eventRole: EngagementRole;
  featureName: string;
  appId: string | null;
  mode: string | null;
  stepName: string | null;
  subStepIndex: number | null;
  scope: string;
  crossVisit?: boolean;
  occurredAt: string;
  properties: Record<string, Scalar>;
}

interface TrackingIdentity {
  userId: string | null;
  sourceUserKey: string | null;
  identityStatus: 'resolved' | 'identity_unresolved';
  excluded: boolean;
}

const FEATURE_BY_APP: Record<string, string> = {
  'fit-assessment': 'fit',
  'my-roadmap': 'roadmap',
  'case-drill': 'drill_library',
  'case-drill-log': 'case_pool',
  'industry-knowledge': 'domain',
  'aptitude-test': 'aptitude',
};

const CASE_STEPS = { access: 1, choose_case: 2, solving_case: 3, answer: 4, move: 5 };

const STEP_INDEX: Record<string, Record<string, number>> = {
  'fit-assessment:discovery': { access: 0, track_select: 1, cv: 2, work_style: 3, function_fit: 4, programs: 5, my_roadmap: 6 },
  'fit-assessment:validation': { access: 0, track_select: 1, cv: 2, motivation: 3, work_style: 4, result: 5, roadmap: 6 },
  'fit-assessment': { access: 0, track_select: 1 },
  'my-roadmap': { access: 1, case_types: 2, knowledge_areas: 3 },
  'case-drill': CASE_STEPS,
  'case-drill-log': CASE_STEPS,
  'industry-knowledge': { access: 1, choose_topic: 2, learning_site: 3, knowledge_test: 4, move: 5 },
  'aptitude-test': { access: 1, choose_test: 2, solving: 3, answer: 4, move: 5 },
};

/** Domain Knowledge choose_topic sub-steps (sub_step_index). */
export const DOMAIN_TOPIC_SUB_STEPS = {
  industry_site: 1,
  sector_site: 2,
  topic_site: 3,
  learning_path_site: 4,
} as const;
export type DomainTopicSubStep = keyof typeof DOMAIN_TOPIC_SUB_STEPS;

/** Apps whose access step is not instrumented (Case Arena is out of scope). */
const ACCESS_EXCLUDED_APPS = new Set(['case-arena', 'feedback', 'about-page']);
const BLOCKED_PROPERTY_KEY = /(email|phone|full_?name|first_?name|last_?name|cv_text|cv_content|resume|address|answer_text|free_text)/i;
const ACTIVE_IDLE_MS = 60_000;
const REPEAT_GUARD_MS = 1500;
const MAX_PENDING = 200;

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

const VISIT_ID = makeId();

// ---------------------------------------------------------------------------
// First-touch acquisition (captured once per device, sent with session_start)
// ---------------------------------------------------------------------------

interface FirstTouch {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  click_id: 'fbclid' | 'gclid' | 'ttclid' | null;
  referrer: string | null;
  landing_path: string | null;
  captured_at: string;
  /** The device already had a Casemate session before capture shipped, so this may not be the real first touch. */
  captured_on_return: boolean;
}

interface StoredAcquisitionSource {
  source: AcquisitionSource;
  answered_at: string;
  sent_session: string | null;
}

const FIRST_TOUCH_STORAGE_KEY = 'casemate-first-touch-v1';
const ACQ_SOURCE_STORAGE_KEY = 'casemate-acq-source-v1';
const DEVICE_STORAGE_KEY = 'casemate-engagement-device-v1';

function queryValue(params: URLSearchParams, key: string): string | null {
  const value = (params.get(key) || '').trim();
  return value ? value.slice(0, 100) : null;
}

/** Origin + path of an external referrer only; same-site navigation and query strings are dropped. */
function externalReferrer(): string | null {
  try {
    if (!document.referrer) return null;
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin) return null;
    return `${referrer.origin}${referrer.pathname}`.slice(0, 160);
  } catch {
    return null;
  }
}

function landingPath(): string | null {
  try {
    const url = new URL(sanitizePageLocation());
    return `${url.pathname}${url.hash}`.slice(0, 160);
  } catch {
    return null;
  }
}

function captureFirstTouch(): FirstTouch | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = JSON.parse(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY) || 'null');
    if (stored && typeof stored === 'object' && typeof stored.captured_at === 'string') return stored as FirstTouch;
  } catch {
    // Unreadable entry: capture a fresh one below.
  }
  let returningDevice = false;
  try {
    returningDevice = localStorage.getItem(DEVICE_STORAGE_KEY) === '1';
  } catch {
    // Storage unavailable: treat as a first visit.
  }
  const params = new URLSearchParams(window.location.search);
  const touch: FirstTouch = {
    utm_source: queryValue(params, 'utm_source'),
    utm_medium: queryValue(params, 'utm_medium'),
    utm_campaign: queryValue(params, 'utm_campaign'),
    click_id: params.has('fbclid') ? 'fbclid' : params.has('gclid') ? 'gclid' : params.has('ttclid') ? 'ttclid' : null,
    referrer: externalReferrer(),
    landing_path: landingPath(),
    captured_at: new Date().toISOString(),
    captured_on_return: returningDevice,
  };
  try {
    localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(touch));
  } catch {
    // Storage unavailable: the touch still rides on this visit's session_start.
  }
  return touch;
}

const firstTouch = captureFirstTouch();

function firstTouchProperties(): Record<string, unknown> {
  if (!firstTouch) return {};
  return {
    acq_utm_source: firstTouch.utm_source,
    acq_utm_medium: firstTouch.utm_medium,
    acq_utm_campaign: firstTouch.utm_campaign,
    acq_click_id: firstTouch.click_id,
    acq_referrer: firstTouch.referrer,
    acq_landing_path: firstTouch.landing_path,
    acq_first_touch_at: firstTouch.captured_at,
    acq_captured_on_return: firstTouch.captured_on_return,
  };
}

function readAcquisitionSource(): StoredAcquisitionSource | null {
  try {
    const stored = JSON.parse(localStorage.getItem(ACQ_SOURCE_STORAGE_KEY) || 'null');
    if (stored && ACQUISITION_SOURCES.includes(stored.source)) return stored as StoredAcquisitionSource;
  } catch {
    // Unreadable entry counts as unanswered.
  }
  return null;
}

const state = {
  sessionId: null as string | null,
  spaceId: null as string | null,
  sawSignedOut: false,
  configured: false,
  sessionStartSent: new Set<string>(),
};

let pending: PendingEvent[] = [];
let sequence = 0;
let currentAppId: string | null = null;
let currentStepName: string | null = null;
let accessCountInVisit = 0;
let lastExplicitSwitch: { from: string; to: string; at: number } | null = null;
const recentEmits = new Map<string, number>();
const identityCache = new Map<string, { identity: TrackingIdentity; at: number }>();

// ---------------------------------------------------------------------------
// Active-time detection (Page Visibility + recent interaction)
// ---------------------------------------------------------------------------

let lastInteractionMs = Date.now();
let lastPointerMoveMs = 0;

if (typeof window !== 'undefined' && !(window as any).__casemateEngagementListeners) {
  (window as any).__casemateEngagementListeners = true;
  const mark = () => { lastInteractionMs = Date.now(); };
  (['pointerdown', 'keydown', 'wheel', 'touchstart', 'input', 'scroll'] as const).forEach((name) => {
    window.addEventListener(name, mark, { passive: true, capture: true });
  });
  window.addEventListener('pointermove', () => {
    const now = Date.now();
    if (now - lastPointerMoveMs < 5000) return;
    lastPointerMoveMs = now;
    lastInteractionMs = now;
  }, { passive: true, capture: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') lastInteractionMs = Date.now();
  });
}

/** True while the tab is visible and the user interacted within the idle window. */
export function isEngagementActive(idleMs: number = ACTIVE_IDLE_MS): boolean {
  if (typeof document === 'undefined') return false;
  return document.visibilityState === 'visible' && Date.now() - lastInteractionMs <= idleMs;
}

/**
 * Counts ACTIVE seconds (visible + recent interaction) and calls onReached
 * once the threshold is crossed. Returns a stop function.
 */
export function startActiveTimer(options: { thresholdSec?: number; onReached: (activeSeconds: number) => void }): () => void {
  const thresholdMs = Math.max(1, options.thresholdSec ?? 120) * 1000;
  let accumulated = 0;
  let last = Date.now();
  let done = false;
  const timer = setInterval(() => {
    const now = Date.now();
    const delta = Math.min(now - last, 5000);
    last = now;
    if (done) return;
    if (isEngagementActive()) accumulated += delta;
    if (accumulated >= thresholdMs) {
      done = true;
      clearInterval(timer);
      try {
        options.onReached(Math.round(accumulated / 1000));
      } catch {
        // Tracking callbacks must never surface to the product.
      }
    }
  }, 1000);
  return () => {
    done = true;
    clearInterval(timer);
  };
}

/**
 * React wrapper for startActiveTimer. The timer restarts whenever resetKey
 * changes (e.g. a new case or test) and stops while enabled is false.
 */
export function useActiveTimeThreshold(
  enabled: boolean,
  resetKey: string | number | null | undefined,
  onReached: (activeSeconds: number) => void,
  thresholdSec = 120,
): void {
  const callbackRef = useRef(onReached);
  callbackRef.current = onReached;
  useEffect(() => {
    if (!enabled) return undefined;
    return startActiveTimer({ thresholdSec, onReached: (seconds) => callbackRef.current(seconds) });
  }, [enabled, resetKey, thresholdSec]);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function featureFor(appId: string | null): string {
  if (!appId) return 'platform';
  return FEATURE_BY_APP[appId] || appId.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
}

function stepIndexFor(appId: string, stepName: string, track?: FitTrack | null): number | null {
  const byTrack = track ? STEP_INDEX[`${appId}:${track}`] : undefined;
  const value = byTrack?.[stepName] ?? STEP_INDEX[appId]?.[stepName];
  return typeof value === 'number' ? value : null;
}

function cleanScalar(value: unknown): Scalar | undefined {
  if (value === null || value === undefined) return null;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string') return value.trim().slice(0, 160);
  return undefined;
}

function cleanProperties(input?: Record<string, unknown>): Record<string, Scalar> {
  const out: Record<string, Scalar> = {};
  if (!input) return out;
  Object.keys(input).forEach((key) => {
    if (!/^[a-z0-9_]{1,48}$/i.test(key) || BLOCKED_PROPERTY_KEY.test(key)) return;
    const value = cleanScalar(input[key]);
    if (value !== undefined) out[key] = value;
  });
  return out;
}

function scopePart(value: unknown): string {
  return String(value).replace(/\|/g, '/').slice(0, 96);
}

/** Short, PII-free error text for step_error. */
export function errorMessageOf(error: unknown): string {
  const raw = typeof error === 'string'
    ? error
    : error instanceof Error
      ? error.message
      : typeof (error as any)?.message === 'string'
        ? (error as any).message
        : typeof (error as any)?.error === 'string'
          ? (error as any).error
          : 'unknown_error';
  return raw
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[email]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200) || 'unknown_error';
}

function readSignedInUserKey(): string | null | undefined {
  try {
    if (!state.spaceId) return undefined;
    const stored = localStorage.getItem(`space_session_${state.spaceId}`);
    if (!stored) return undefined;
    const session = JSON.parse(stored);
    if (!session || session.verified === false) return undefined;
    const email = typeof session.email === 'string' ? session.email.trim().toLowerCase() : '';
    return email ? `email:${email}` : undefined;
  } catch {
    return undefined;
  }
}

async function identityFor(sessionId: string): Promise<TrackingIdentity> {
  const cached = identityCache.get(sessionId);
  if (cached && (cached.identity.identityStatus === 'resolved' || Date.now() - cached.at < 30_000)) {
    return cached.identity;
  }
  const identity = await resolveTrackingIdentity(sessionId, 'engagement', readSignedInUserKey());
  identityCache.set(sessionId, { identity, at: Date.now() });
  return identity;
}

function isDuplicateError(error: unknown): boolean {
  const text = `${(error as any)?.message || ''} ${(error as any)?.code || ''} ${(error as any)?.error || ''}`.toLowerCase();
  return text.includes('event_key') || text.includes('unique') || text.includes('duplicate') || text.includes('23505');
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function forwardToGa4(event: PendingEvent): void {
  forwardJourneyEventToGa4({
    eventName: event.eventName,
    appId: event.appId,
    properties: event.properties,
    dedupeScope: !event.scope.startsWith('k:')
      ? null
      : event.crossVisit
        ? event.scope
        : [event.appId || '-', event.stepName || '-', event.subStepIndex ?? '-', event.scope].join('|'),
    crossVisit: event.crossVisit,
  });
}

async function writeEvent(event: PendingEvent, sessionId: string): Promise<void> {
  if (isExcludedTrackingSession(sessionId)) return;
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) return;

  const eventKey = [
    'live',
    'eng',
    sessionId,
    event.crossVisit ? 'session' : VISIT_ID,
    event.eventName,
    event.crossVisit ? '-' : event.appId || '-',
    event.stepName || '-',
    event.subStepIndex ?? '-',
    event.scope,
  ].join('|');

  let identity: TrackingIdentity;
  try {
    identity = await identityFor(sessionId);
  } catch {
    identity = { userId: null, sourceUserKey: null, identityStatus: 'identity_unresolved', excluded: false };
  }
  if (identity.excluded) return;

  const row = {
    event_key: eventKey,
    schema_version: 1,
    event_name: event.eventName,
    event_role: event.eventRole,
    feature_name: event.featureName,
    app_id: event.appId,
    mode: event.mode,
    user_id: identity.userId,
    identity_status: identity.identityStatus,
    source_user_key: identity.sourceUserKey,
    identity_session_ref: sessionId,
    completion_key: null,
    occurred_at: event.occurredAt,
    properties_json: event.properties,
    source_kind: 'live',
    source_table: 'engagement',
    source_record_id: null,
    session_id: sessionId,
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const result = await db.from('feature_events').insert(row);
      if (result && result.error) throw result.error;
      return;
    } catch (error) {
      if (isDuplicateError(error)) return;
      if (attempt === 2) {
        console.warn('[Engagement Tracking] feature_events write failed:', event.eventName, error);
        logLiveTrackingFailure({
          featureName: event.featureName,
          eventName: event.eventName,
          sessionId,
          reason: errorMessageOf(error),
          eventKey,
          phase: 'engagement_emit',
        });
        return;
      }
      await sleep(1500 * (attempt + 1));
    }
  }
}

function emit(input: {
  eventName: string;
  eventRole: EngagementRole;
  appId: string | null;
  featureName?: string;
  mode?: string | null;
  stepName?: string | null;
  subStepIndex?: number | null;
  dedupeKey?: string | number | null;
  crossVisit?: boolean;
  properties: Record<string, unknown>;
}): void {
  try {
    const guardKey = [input.eventName, input.appId, input.stepName, input.subStepIndex, input.dedupeKey].join('|');
    const now = Date.now();
    const lastAt = recentEmits.get(guardKey);
    if (lastAt && now - lastAt < REPEAT_GUARD_MS) return;
    recentEmits.set(guardKey, now);
    if (recentEmits.size > 500) recentEmits.clear();

    sequence += 1;
    const event: PendingEvent = {
      eventName: input.eventName,
      eventRole: input.eventRole,
      featureName: input.featureName || featureFor(input.appId),
      appId: input.appId,
      mode: input.mode ?? null,
      stepName: input.stepName ?? null,
      subStepIndex: input.subStepIndex ?? null,
      scope: input.dedupeKey !== undefined && input.dedupeKey !== null && input.dedupeKey !== ''
        ? `k:${scopePart(input.dedupeKey)}`
        : `n:${sequence}`,
      crossVisit: Boolean(input.crossVisit && input.dedupeKey),
      occurredAt: new Date(now).toISOString(),
      properties: cleanProperties(input.properties),
    };
    if (state.sessionId || (!state.configured && pending.length < MAX_PENDING)) forwardToGa4(event);
    if (!state.sessionId) {
      if (!state.configured && pending.length < MAX_PENDING) pending.push(event);
      return;
    }
    void writeEvent(event, state.sessionId);
  } catch (error) {
    console.warn('[Engagement Tracking] emit skipped:', input.eventName, error);
  }
}

function stepProperties(appId: string, stepName: string, options: StepOptions): Record<string, unknown> {
  return {
    ...options.properties,
    step_name: stepName,
    step_index: options.stepIndex ?? stepIndexFor(appId, stepName, options.track),
    sub_step_index: options.subStepIndex ?? null,
    ...(options.subStepName ? { sub_step_name: options.subStepName } : {}),
    track: options.track ?? null,
    program_id: options.programId ?? null,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Called by the shell whenever the signed-in workspace session changes. */
export function configureEngagementTracking(options: { sessionId: string | null | undefined; spaceId: string }): void {
  state.spaceId = options.spaceId;
  const sessionId = options.sessionId || null;
  configureGa4Tracking({ sessionId, isActive: () => isEngagementActive(), location: getEngagementLocation });
  if (!sessionId) {
    state.sawSignedOut = true;
    state.sessionId = null;
    state.configured = true;
    pending = [];
    return;
  }
  const changed = state.sessionId !== sessionId;
  state.sessionId = sessionId;
  state.configured = true;
  if (!changed) return;

  if (!state.sessionStartSent.has(sessionId)) {
    state.sessionStartSent.add(sessionId);
    let returningDevice = false;
    try {
      returningDevice = localStorage.getItem(DEVICE_STORAGE_KEY) === '1';
      localStorage.setItem(DEVICE_STORAGE_KEY, '1');
    } catch {
      // Storage unavailable: leave returningDevice false.
    }
    const startEvent: PendingEvent = {
      eventName: 'session_start',
      eventRole: 'open',
      featureName: 'platform',
      appId: null,
      mode: null,
      stepName: null,
      subStepIndex: null,
      scope: 'k:visit',
      occurredAt: new Date().toISOString(),
      properties: cleanProperties({
        visit_id: VISIT_ID,
        entry: state.sawSignedOut ? 'fresh_login' : 'existing_session',
        returning_device: returningDevice,
        ...firstTouchProperties(),
      }),
    };
    void writeEvent(startEvent, sessionId);
  }

  const queued = pending;
  pending = [];
  queued.forEach((event) => { void writeEvent(event, sessionId); });
  flushAcquisitionSource();
}

/** True once this device has answered the sign-up question "Bạn biết Casemate từ đâu?". */
export function hasAnsweredAcquisitionSource(): boolean {
  return readAcquisitionSource() !== null;
}

/**
 * Sign-up question answer. It is usually given before a session exists, so it
 * is kept on the device and written as acq_source_reported once a session is
 * configured (once per device).
 */
export function reportAcquisitionSource(source: AcquisitionSource): void {
  if (!ACQUISITION_SOURCES.includes(source)) return;
  try {
    localStorage.setItem(ACQ_SOURCE_STORAGE_KEY, JSON.stringify({ source, answered_at: new Date().toISOString(), sent_session: null }));
  } catch {
    return;
  }
  flushAcquisitionSource();
}

function flushAcquisitionSource(): void {
  const sessionId = state.sessionId;
  const stored = readAcquisitionSource();
  if (!sessionId || !stored || stored.sent_session) return;
  try {
    localStorage.setItem(ACQ_SOURCE_STORAGE_KEY, JSON.stringify({ ...stored, sent_session: sessionId }));
  } catch {
    // The session-scoped event key still prevents duplicate rows.
  }
  emit({
    eventName: 'acq_source_reported',
    eventRole: 'open',
    appId: null,
    featureName: 'platform',
    dedupeKey: 'acq_source',
    crossVisit: true,
    properties: { ...firstTouchProperties(), acq_source: stored.source, answered_at: stored.answered_at },
  });
}

/** Current app/step, read by the 30-second session heartbeat. */
export function getEngagementLocation(): { appId: string | null; stepName: string | null; visitId: string } {
  return { appId: currentAppId, stepName: currentStepName, visitId: VISIT_ID };
}

/** Updates the heartbeat location without writing an event. */
export function setEngagementStep(appId: string, stepName: string | null): void {
  currentAppId = appId;
  currentStepName = stepName;
}

/**
 * Shell hook: one call per app open. Emits app_switch when the previous app
 * differs, and step_view(access) for the opened app. The first access in a
 * visit carries first_access_in_visit = true.
 */
export function noteAppAccess(appId: string, options: { source?: string } = {}): void {
  if (!appId || appId === 'files' || appId === 'settings') return;
  const previous = currentAppId;
  if (previous && previous !== appId) {
    const explicit = lastExplicitSwitch
      && lastExplicitSwitch.from === previous
      && lastExplicitSwitch.to === appId
      && Date.now() - lastExplicitSwitch.at < 15_000;
    if (!explicit) {
      emit({
        eventName: 'app_switch',
        eventRole: 'step',
        appId,
        featureName: 'platform',
        properties: { from_app_id: previous, to_app_id: appId, trigger: options.source || 'navigation' },
      });
    }
  }
  currentAppId = appId;
  currentStepName = 'access';
  if (ACCESS_EXCLUDED_APPS.has(appId)) return;
  const firstAccess = accessCountInVisit === 0;
  accessCountInVisit += 1;
  emit({
    eventName: 'step_view',
    eventRole: 'step',
    appId,
    stepName: 'access',
    properties: {
      ...stepProperties(appId, 'access', {}),
      first_access_in_visit: firstAccess,
      access_index_in_visit: accessCountInVisit,
      visit_id: VISIT_ID,
      source: options.source || null,
    },
  });
}

/** Explicit feature-to-feature move (e.g. Fit Assessment -> My Roadmap). */
export function trackAppSwitch(fromAppId: string, toAppId: string, options: { trigger?: string; properties?: Record<string, unknown> } = {}): void {
  if (!fromAppId || !toAppId || fromAppId === toAppId) return;
  lastExplicitSwitch = { from: fromAppId, to: toAppId, at: Date.now() };
  emit({
    eventName: 'app_switch',
    eventRole: 'step',
    appId: toAppId,
    featureName: 'platform',
    properties: { ...options.properties, from_app_id: fromAppId, to_app_id: toAppId, trigger: options.trigger || 'in_app_link' },
  });
}

export function trackStepView(appId: string, stepName: string, options: StepOptions = {}): void {
  setEngagementStep(appId, stepName);
  emit({
    eventName: 'step_view',
    eventRole: 'step',
    appId,
    mode: options.mode,
    stepName,
    subStepIndex: options.subStepIndex ?? null,
    dedupeKey: options.dedupeKey,
    properties: stepProperties(appId, stepName, options),
  });
}

export function trackStepComplete(appId: string, stepName: string, options: StepOptions & { durationSec?: number | null } = {}): void {
  emit({
    eventName: 'step_complete',
    eventRole: 'step',
    appId,
    mode: options.mode,
    stepName,
    subStepIndex: options.subStepIndex ?? null,
    dedupeKey: options.dedupeKey,
    properties: {
      ...stepProperties(appId, stepName, options),
      duration_sec: options.durationSec ?? null,
    },
  });
}

/** Domain Knowledge choose_topic sub-step (industry -> sector -> topic -> learning path). */
export function trackDomainTopicSubStep(subStep: DomainTopicSubStep, options: StepOptions = {}): void {
  trackStepView('industry-knowledge', 'choose_topic', {
    ...options,
    subStepIndex: DOMAIN_TOPIC_SUB_STEPS[subStep],
    subStepName: subStep,
    properties: { ...options.properties, sub_step_total: 4, is_last_sub_step: subStep === 'learning_path_site' },
  });
}

/** The "move" step: next item via button, or the user left and chose another. */
export function trackMove(appId: string, moveType: MoveType, options: StepOptions = {}): void {
  trackStepView(appId, 'move', { ...options, properties: { ...options.properties, move_type: moveType } });
}

export function trackStepError(
  appId: string,
  stepName: string,
  error: unknown,
  options: { track?: FitTrack | null; programId?: string | null; mode?: string | null; properties?: Record<string, unknown> } = {},
): void {
  const message = errorMessageOf(error);
  emit({
    eventName: 'step_error',
    eventRole: 'diagnostic',
    appId,
    mode: options.mode,
    stepName,
    dedupeKey: `${stepName}:${message}`,
    properties: {
      ...options.properties,
      app_id: appId,
      step_name: stepName,
      error_message: message,
      track: options.track ?? null,
      program_id: options.programId ?? null,
    },
  });
}

/** Fit Assessment track choice (discovery | validation). */
export function trackFitTrackSelect(track: FitTrack, options: { programId?: string | null; properties?: Record<string, unknown> } = {}): void {
  setEngagementStep('fit-assessment', 'track_select');
  emit({
    eventName: 'track_select',
    eventRole: 'step',
    appId: 'fit-assessment',
    stepName: 'track_select',
    dedupeKey: `${track}:${options.programId || '-'}`,
    properties: stepProperties('fit-assessment', 'track_select', { track, programId: options.programId ?? null, properties: options.properties }),
  });
}

/** Fit Assessment activation: the user clicked "Generate My Roadmap". */
export function trackFitActivation(track: FitTrack | null, options: { programId?: string | null; properties?: Record<string, unknown> } = {}): void {
  const stepName = track === 'validation' ? 'roadmap' : 'my_roadmap';
  emit({
    eventName: 'fit_activation',
    eventRole: 'activation',
    appId: 'fit-assessment',
    stepName,
    dedupeKey: options.programId || 'roadmap',
    properties: {
      ...stepProperties('fit-assessment', stepName, { track, programId: options.programId ?? null, properties: options.properties }),
      trigger: 'generate_my_roadmap',
    },
  });
}

/** Post-result Fit Assessment rating from the feedback popup (1-5 stars; rating_scale says which scale). */
export function trackFitRating(
  rating: number,
  options: { track: FitTrack | null; programId?: string | null; acqSource?: AcquisitionSource | null; scale?: number },
): void {
  const scale = options.scale ?? 5;
  if (!Number.isInteger(rating) || rating < 1 || rating > scale) return;
  emit({
    eventName: 'fit_rating_reported',
    eventRole: 'retention',
    appId: 'fit-assessment',
    dedupeKey: `rating:${options.programId || '-'}`,
    properties: { rating, rating_scale: scale, track: options.track ?? null, program_id: options.programId ?? null, acq_source: options.acqSource ?? null },
  });
}

export function trackFitRatingDismissed(options: { track: FitTrack | null; programId?: string | null }): void {
  emit({
    eventName: 'fit_rating_prompt_dismissed',
    eventRole: 'retention',
    appId: 'fit-assessment',
    dedupeKey: `rating:${options.programId || '-'}`,
    properties: { track: options.track ?? null, program_id: options.programId ?? null },
  });
}

/** Application-outcome prompt shown after the target program's close date (feature_name 'outcome'). */
export function trackOutcomeEvent(
  eventName: OutcomeEventName,
  options: { programId: string; dedupeKey?: string | null; properties?: Record<string, unknown> },
): void {
  emit({
    eventName,
    eventRole: eventName === 'outcome_reported' ? 'core_action' : 'retention',
    appId: currentAppId,
    featureName: 'outcome',
    dedupeKey: options.dedupeKey,
    properties: { ...options.properties, program_id: options.programId },
  });
}

/** Money funnel: paywall_view, checkout_start, payment_success (feature_name 'billing'). */
export function trackBillingEvent(
  eventName: BillingEventName,
  options: { appId?: string | null; dedupeKey?: string | number | null; properties?: Record<string, unknown> } = {},
): void {
  emit({
    eventName,
    eventRole: eventName === 'payment_success' ? 'core_action' : eventName === 'checkout_start' ? 'step' : 'open',
    appId: options.appId ?? currentAppId,
    featureName: 'billing',
    dedupeKey: options.dedupeKey,
    crossVisit: eventName === 'payment_success',
    properties: { ...options.properties, from_app_id: options.appId ?? currentAppId },
  });
}
