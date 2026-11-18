/**
 * GA4 forwarding for the Casemate journey events.
 *
 * GA4 itself is injected by the Audos serving layer from the workspace's
 * google_analytics_id setting and only loads once the visitor accepts
 * analytics cookies (window.__audosConsent.onAnalytics). This module never
 * loads gtag.js and never calls gtag('config'); it only adds journey events,
 * the hashed user_id, grouped user properties and an active-time heartbeat,
 * and keeps tokens out of the page_location GA4 records.
 *
 * Nothing sent from here may carry an email, name, phone number, CV text or a
 * free-text answer: event parameters pass an allowlist, string values are
 * capped at 100 characters and email- or phone-like text is redacted. The
 * user_id is an HMAC-SHA256 of the verified email computed server-side by the
 * casemate-ga4-identity-v1 server function.
 */

type Scalar = string | number | boolean | null | undefined;
type GtagFn = (...args: unknown[]) => void;

interface ConsentBridge {
  hasAnalytics?: () => boolean;
  onAnalytics?: (callback: () => void) => void;
}

export interface Ga4JourneyEvent {
  eventName: string;
  appId: string | null;
  properties: Record<string, Scalar>;
  /** Same scope the feature_events row is keyed on; repeats inside it are not resent. */
  dedupeScope?: string | null;
  /** payment_success-style events stay deduplicated across visits on this device. */
  crossVisit?: boolean;
}

interface Ga4Dependencies {
  sessionId: string | null;
  isActive: () => boolean;
  location: () => { appId: string | null; stepName: string | null };
}

const IDENTITY_HOOK = '/api/hooks/execute/workspace-539150/casemate-ga4-identity-v1';
const HEARTBEAT_MS = 30_000;
const MAX_QUEUED = 100;
const CV_REFRESH_DELAY_MS = 3_000;
const DEBUG_STORAGE_KEY = 'casemate-ga4-debug';
const SENT_STORAGE_KEY = 'casemate-ga4-sent-v1';
const USER_ID_STORAGE_PREFIX = 'casemate-ga4-uid:';

/** feature_events name -> GA4 name; null means "do not forward" (GA4 reserves session_start). */
const GA4_EVENT_NAMES: Record<string, string | null> = {
  session_start: null,
  fit_activation: 'activation',
};

const EVENT_PARAM_KEYS = [
  'step_name',
  'step_index',
  'sub_step_index',
  'sub_step_name',
  'track',
  'program_id',
  'move_type',
  'from_app_id',
  'to_app_id',
  'trigger',
  'source',
  'reason',
  'plan',
  'plan_id',
  'provider',
  'trial_type',
  'first_access_in_visit',
  'access_index_in_visit',
  'duration_sec',
  'active_sec',
  'active_seconds',
  'error_message',
  'acq_source',
];

const USER_PROPERTY_KEYS = [
  'school_code',
  'major_group',
  'year_of_study',
  'has_leadership',
  'n_internships_bucket',
  'ielts_band_bucket',
  'selected_program_id',
  'track',
];

const SAFE_QUERY_KEY = /^(app|screen|login|ref|gclid|fbclid|payment_plan|payment_success|payment_cancelled|cancel|utm_[a-z]+|dk[A-Z][A-Za-z]*)$/;
const EMAIL_SOURCE = '[^\\s@/?#&=]+@[^\\s@/?#&=]+\\.[a-z]{2,}';
const LONG_NUMBER_SOURCE = '\\+?\\d[\\d\\s.-]{7,}\\d';
const SHA256_HEX = /^[a-f0-9]{64}$/;

const queued: Array<() => void> = [];
const sentScopes = new Set<string>();
const userProperties: Record<string, string> = {};
let waitingForConsent = false;
let deps: Ga4Dependencies = { sessionId: null, isActive: () => false, location: () => ({ appId: null, stepName: null }) };
let identityRequestedFor: string | null = null;
let appliedUserId: string | null = null;
let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let cvRefreshTimer: ReturnType<typeof setTimeout> | null = null;
let cvRefreshPending = false;
let lastPageLocation = '';

const debugMode = readDebugFlag();

function gtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const fn = (window as unknown as { gtag?: unknown }).gtag;
  return typeof fn === 'function' ? (fn as GtagFn) : null;
}

function consentBridge(): ConsentBridge | null {
  if (typeof window === 'undefined') return null;
  const bridge = (window as unknown as { __audosConsent?: ConsentBridge }).__audosConsent;
  return bridge && typeof bridge === 'object' ? bridge : null;
}

function analyticsAllowed(): boolean {
  const bridge = consentBridge();
  return bridge && typeof bridge.hasAnalytics === 'function' ? bridge.hasAnalytics() === true : true;
}

function runSafely(task: () => void): void {
  try {
    task();
  } catch {
    // Analytics must never surface to the product.
  }
}

/** Runs once analytics consent exists; GA4's own config callback was registered first, so order holds. */
function whenAnalyticsAllowed(task: () => void): void {
  if (!gtag()) return;
  if (analyticsAllowed()) {
    runSafely(task);
    return;
  }
  if (queued.length < MAX_QUEUED) queued.push(task);
  const bridge = consentBridge();
  if (waitingForConsent || !bridge || typeof bridge.onAnalytics !== 'function') return;
  waitingForConsent = true;
  bridge.onAnalytics(() => {
    waitingForConsent = false;
    queued.splice(0).forEach(runSafely);
  });
}

function readDebugFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const flag = new URLSearchParams(window.location.search).get('ga_debug');
    if (flag === '1') window.sessionStorage.setItem(DEBUG_STORAGE_KEY, '1');
    if (flag === '0') window.sessionStorage.removeItem(DEBUG_STORAGE_KEY);
    return window.sessionStorage.getItem(DEBUG_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function redact(value: string, max = 100): string {
  return value
    .replace(new RegExp(EMAIL_SOURCE, 'gi'), '[email]')
    .replace(new RegExp(LONG_NUMBER_SOURCE, 'g'), '[number]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function looksSensitive(value: string): boolean {
  return new RegExp(EMAIL_SOURCE, 'i').test(value) || new RegExp(LONG_NUMBER_SOURCE).test(value);
}

/** Keeps only allowlisted, token-free query keys and route-like hashes. */
export function sanitizePageLocation(href?: string): string {
  try {
    const url = new URL(href || window.location.href);
    const kept = new URLSearchParams();
    url.searchParams.forEach((value, key) => {
      if (SAFE_QUERY_KEY.test(key) && !looksSensitive(value)) kept.append(key, value.slice(0, 80));
    });
    const path = url.pathname
      .split('/')
      .map((segment) => {
        let decoded = segment;
        try { decoded = decodeURIComponent(segment); } catch { /* keep raw */ }
        return looksSensitive(decoded) || /^[A-Za-z0-9_-]{24,}$/.test(segment) ? '_' : segment;
      })
      .join('/');
    const query = kept.toString();
    const hash = /^#[A-Za-z0-9_\-/]{1,64}$/.test(url.hash) ? url.hash : '';
    return `${url.origin}${path}${query ? `?${query}` : ''}${hash}`;
  } catch {
    return '';
  }
}

/**
 * Pushed straight into the dataLayer (no consent needed: a 'set' sends
 * nothing), so the platform's automatic page_view and every later hit use the
 * cleaned URL instead of one carrying session ids or OAuth/checkout tokens.
 */
function syncPageLocation(): void {
  const fn = gtag();
  if (!fn) return;
  const location = sanitizePageLocation();
  if (!location || location === lastPageLocation) return;
  lastPageLocation = location;
  runSafely(() => fn('set', { page_location: location }));
}

if (typeof window !== 'undefined' && !(window as any).__casemateGa4LocationSync) {
  (window as any).__casemateGa4LocationSync = true;
  syncPageLocation();
  (['pushState', 'replaceState'] as const).forEach((method) => {
    const original = window.history[method];
    if (typeof original !== 'function') return;
    window.history[method] = function patchedHistory(this: History, ...args: Parameters<History['pushState']>) {
      const result = original.apply(this, args);
      runSafely(syncPageLocation);
      return result;
    } as History['pushState'];
  });
  window.addEventListener('popstate', syncPageLocation);
  window.addEventListener('hashchange', syncPageLocation);
}

function cleanParam(value: Scalar): string | number | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  const text = redact(String(value));
  return text ? text : undefined;
}

function eventParams(input: Ga4JourneyEvent): Record<string, string | number | boolean> {
  const params: Record<string, string | number | boolean> = {};
  const appId = cleanParam(input.appId ?? input.properties.app_id);
  if (appId !== undefined) params.app_id = appId;
  EVENT_PARAM_KEYS.forEach((key) => {
    const value = cleanParam(input.properties[key]);
    if (value !== undefined) params[key] = value;
  });
  const amount = Number(input.properties.value ?? input.properties.amount ?? input.properties.amount_vnd);
  if (Number.isFinite(amount) && amount > 0) {
    params.value = amount;
    params.currency = String(input.properties.currency || 'VND').toUpperCase().slice(0, 3);
  }
  if (debugMode) params.debug_mode = true;
  return params;
}

function sendEvent(name: string, params: Record<string, string | number | boolean>): void {
  whenAnalyticsAllowed(() => {
    syncPageLocation();
    gtag()?.('event', name, params);
  });
}

function claimScope(scope: string, crossVisit: boolean): boolean {
  if (sentScopes.has(scope)) return false;
  sentScopes.add(scope);
  if (!crossVisit) return true;
  try {
    const stored: string[] = JSON.parse(window.localStorage.getItem(SENT_STORAGE_KEY) || '[]');
    if (stored.includes(scope)) return false;
    window.localStorage.setItem(SENT_STORAGE_KEY, JSON.stringify(stored.concat(scope).slice(-50)));
  } catch {
    // Storage unavailable: the in-memory guard still holds for this visit.
  }
  return true;
}

function setUserProperties(next: Record<string, unknown>): void {
  const changed: Record<string, string> = {};
  USER_PROPERTY_KEYS.forEach((key) => {
    const raw = next[key];
    if (raw === null || raw === undefined || raw === '') return;
    const value = redact(String(raw), 36);
    if (!value || userProperties[key] === value) return;
    userProperties[key] = value;
    changed[key] = value;
  });
  if (Object.keys(changed).length) whenAnalyticsAllowed(() => gtag()?.('set', 'user_properties', changed));
}

function applyUserId(userId: string | null): void {
  if (appliedUserId === userId) return;
  appliedUserId = userId;
  whenAnalyticsAllowed(() => gtag()?.('set', { user_id: userId }));
}

async function refreshIdentity(sessionId: string): Promise<void> {
  try {
    const response = await fetch(IDENTITY_HOOK, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: '{}',
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data || data.success !== true || deps.sessionId !== sessionId) return;
    if (typeof data.user_id === 'string' && SHA256_HEX.test(data.user_id)) {
      try { window.sessionStorage.setItem(`${USER_ID_STORAGE_PREFIX}${sessionId}`, data.user_id); } catch { /* optional cache */ }
      applyUserId(data.user_id);
    }
    if (data.user_properties && typeof data.user_properties === 'object') setUserProperties(data.user_properties);
  } catch {
    // Identity is optional; events still flow under GA4's client id.
  }
}

function requestIdentity(sessionId: string): void {
  whenAnalyticsAllowed(() => { void refreshIdentity(sessionId); });
}

function scheduleCvRefresh(delayMs: number): void {
  const sessionId = deps.sessionId;
  if (!sessionId) return;
  if (cvRefreshTimer) clearTimeout(cvRefreshTimer);
  cvRefreshTimer = setTimeout(() => {
    cvRefreshTimer = null;
    requestIdentity(sessionId);
  }, delayMs);
}

/** Fit Assessment drives the profile properties: CV confirmation and the chosen track/program. */
function noteProfileSignals(input: Ga4JourneyEvent, params: Record<string, string | number | boolean>): void {
  if (input.appId !== 'fit-assessment') return;
  const track = params.track === 'discovery' || params.track === 'validation' ? params.track : null;
  const programId = typeof params.program_id === 'string' && params.program_id ? params.program_id : null;
  if (track || programId) setUserProperties({ track, selected_program_id: programId });
  if (input.eventName === 'step_complete' && params.step_name === 'cv') {
    cvRefreshPending = true;
    scheduleCvRefresh(CV_REFRESH_DELAY_MS);
  } else if (cvRefreshPending && input.eventName === 'step_view' && params.step_name !== 'cv') {
    // The CV save can land after step_complete fires; the next step's view re-reads it once.
    cvRefreshPending = false;
    scheduleCvRefresh(500);
  }
}

/** Mirrors one feature_events journey event into GA4 (called from engagementTracking's emit). */
export function forwardJourneyEventToGa4(input: Ga4JourneyEvent): void {
  runSafely(() => {
    if (!gtag()) return;
    const mapped = Object.prototype.hasOwnProperty.call(GA4_EVENT_NAMES, input.eventName)
      ? GA4_EVENT_NAMES[input.eventName]
      : input.eventName;
    if (!mapped) return;
    if (input.dedupeScope && !claimScope(`${mapped}|${input.dedupeScope}`, Boolean(input.crossVisit))) return;
    const params = eventParams(input);
    noteProfileSignals(input, params);
    sendEvent(mapped, params);
    // "move" is step 5 of the practice funnels: it stays a step_view (like feature_events) and is also its own countable event.
    if (mapped === 'step_view' && params.step_name === 'move') sendEvent('move', params);
  });
}

function startHeartbeat(): void {
  if (heartbeatTimer || typeof window === 'undefined') return;
  heartbeatTimer = setInterval(() => {
    if (!deps.sessionId || document.visibilityState !== 'visible' || !deps.isActive()) return;
    const location = deps.location();
    const params: Record<string, string | number | boolean> = { active_sec: HEARTBEAT_MS / 1000 };
    if (location.appId) params.app_id = location.appId;
    if (location.stepName) params.step_name = location.stepName;
    if (debugMode) params.debug_mode = true;
    sendEvent('engagement_heartbeat', params);
  }, HEARTBEAT_MS);
}

function stopHeartbeat(): void {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

/** Called by configureEngagementTracking whenever the signed-in session changes. */
export function configureGa4Tracking(next: Ga4Dependencies): void {
  runSafely(() => {
    deps = next;
    if (!next.sessionId) {
      identityRequestedFor = null;
      stopHeartbeat();
      if (appliedUserId) applyUserId(null);
      return;
    }
    startHeartbeat();
    if (identityRequestedFor === next.sessionId) return;
    identityRequestedFor = next.sessionId;
    try {
      const cached = window.sessionStorage.getItem(`${USER_ID_STORAGE_PREFIX}${next.sessionId}`);
      if (cached && SHA256_HEX.test(cached)) applyUserId(cached);
    } catch {
      // No cached id: the server call below sets it.
    }
    requestIdentity(next.sessionId);
  });
}
