// Casemate access boundary (v0.7) — ONE shared decision for every paid
// surface: Case Pool, Case Drill, Domain Knowledge, and Mate's in-chat
// practice/knowledge tools.
//
//   entitled = a protected `team_accounts` row for the authenticated email:
//              permanent, unlimited free access — never expires, never
//              charged, never shown an upgrade or trial prompt
//           OR an active Casemate Pro plan (promo monthly, monthly, or
//              six-month access; including manual override / entrepreneur mode)
//           OR the ONE-TIME LAUNCH WEEK: a configured calendar window
//              (WorkspaceDB `trial_config` table, newest row wins) during
//              which ALL users get the paid tools free
//           OR a FOUNDING-MEMBER free month: the original 50 registered users
//              plus 15 additional users each get 30 days of the paid tools
//              free (WorkspaceDB `founding_members` — one row per persisted
//              numbered slot, including the legacy founder audit row)
//           OR a TEMPORARY-TESTER grant: a founder-approved verified email
//              receives Pro access through its recorded `free_until` date
//              (`temporary_testers`; session_id is legacy audit metadata only,
//              and the inclusive window falls through after expiry)
//           OR a FEEDBACK-GATE month: a free user who has actually tried Case
//              Pool or Case Drill (usage_events) submits the in-paywall
//              feedback gate once and gets 30 days of the paid tools free
//              (WorkspaceDB `feedback_pro_grants` — unique per email, never
//              re-claimable; expired grants fall back to the normal paywall)
//
// Entitlement tables (`team_accounts`, `founding_members`,
// `temporary_testers`, and `feedback_pro_grants`) run with
// WorkspaceDB writePolicy serverHooksOnly: only a registered hook may insert,
// update, or delete rows, because a row keyed to an email IS the entitlement.
// Any new grant/revoke path must therefore live in the hook code below, never
// in app or browser code. Reads are unaffected.
//
// The server-side rules live in CASEMATE_ENTITLEMENT_SNIPPET below and are
// embedded into EVERY Casemate hook (casemate-access-v1, casemate-case-drill,
// casemate-micro-drill, casemate-industry-brief), so a direct hook call can
// never bypass the paywall and all four engines apply identical rules.
// Edit the snippet HERE only, then bump ACCESS_RULES_VERSION so the hooks'
// ensure functions re-deploy the new code on next app load.
//
// Client side, PaywallGate calls the `casemate-access-v1` hook (via
// fetchCasemateEntitlement) to learn whether a non-subscriber is inside the
// launch week or holds a founding-member month — and to CLAIM a founding
// slot for a signed-in user while slots remain.

export const CASEMATE_WORKSPACE_ID = 'workspace-539150';
export const ACCESS_HOOK_NAME = 'casemate-access-v1';
export const ACCESS_RULES_VERSION = 'access-v18-oauth-1500ms-safety';

// Client-side mirror of the server defaults (server reads trial_config live).
export const TRIAL_DEFAULTS = {
  // v1.3: preserve the original 50 places and add 15 new one-month places.
  // This is the server-hook fallback and the one-time migration target for
  // the authoritative trial_config row; change that row after migration for
  // future capacity/duration adjustments.
  foundingMemberLimit: 0,
  foundingMemberDays: 7,
};

// Deprecated compatibility exports. Permanent internal access now comes only
// from the protected WorkspaceDB `team_accounts` table after the server binds
// the request to the authenticated user's normalized email.
export const COMP_EMAILS: string[] = [];
export function isCompEmail(_email: unknown): boolean {
  return false;
}

/* ============================================================================
 * Server-side entitlement snippet (sandbox JavaScript, NOT TypeScript).
 *
 * Embedded into hook code AFTER the hook defines `body`, `query` and
 * `sessionId`. Uses the sandbox globals: fetch (absolute URLs only), db,
 * respond, console, workspaceId. No backticks or ${} inside — the block is
 * interpolated into other String.raw templates.
 * ==========================================================================*/
export const CASEMATE_ENTITLEMENT_SNIPPET = String.raw`
// ==== Casemate access boundary (access-v17-oauth-3s-fallback) =============
// entitled = a protected team_accounts row for the authenticated email
// (permanent free access, no expiry) OR active Casemate Pro subscription OR an active
// temporary-tester grant (temporary_testers; verified email + free_until only,
// session_id is audit metadata) OR the one-time launch-week window (trial_config) OR an
// unexpired first-65 founding-member month (founding_members) OR an unexpired
// feedback-gate month (feedback_pro_grants — earned once per email by submitting the in-paywall
// feedback gate after actually trying Case Pool / Case Drill). Verified
// against PLATFORM-OWNED records and workspace
// tables — never a client claim. Shared by all Casemate hooks; the source of
// truth is lib/proAccess.ts (CASEMATE_ENTITLEMENT_SNIPPET) — edit it there.
const PRO_API_BASE = 'https://audos.com';
const PRO_SPACE_ID = 'workspace-539150';
const LEGACY_CUTOFF = new Date('2026-08-29T00:00:00Z');
const LEGACY_CAP = new Date('2026-09-12T00:00:00Z');
const ACCESS_QUERY_TIMEOUT_MS = 1200;

async function accessQuery(tableName, options) {
  let timer = null;
  try {
    return await Promise.race([
      db.query(tableName, options),
      new Promise(function (_, reject) {
        timer = setTimeout(function () { reject(new Error('Timed out querying ' + tableName)); }, ACCESS_QUERY_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function trialMetadata(expiresAt, nowMs) {
  const expiryMs = Date.parse(expiresAt || '');
  if (!Number.isFinite(expiryMs)) {
    return { days_remaining: 0, trial_end_date: null, subscription_type: null };
  }
  return {
    days_remaining: Math.max(0, Math.ceil((expiryMs - nowMs) / 86400000)),
    trial_end_date: new Date(expiryMs).toISOString().slice(0, 10),
    subscription_type: 'trial',
  };
}

async function proFetchJson(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(function () { controller.abort(); }, ACCESS_QUERY_TIMEOUT_MS);
  try {
    const fetchOptions = Object.assign({}, options || {}, { signal: controller.signal });
    const response = await fetch(url, fetchOptions);
    let payload = null;
    try { payload = await response.json(); } catch (error) { payload = null; }
    return { ok: response.ok, status: response.status, body: payload || {} };
  } finally {
    clearTimeout(timer);
  }
}

function normalizeProEmail(raw) {
  const email = String(raw || '').trim().toLowerCase();
  return email.indexOf('@') > 0 ? email : '';
}

function proStatusEntitled(payload) {
  const value = payload || {};
  const status = String(value.status || '').toLowerCase();
  const subscriptionStatus = String(value.subscriptionStatus || value.subscription_status || '').toLowerCase();

  // Preserve only legacy PAID subscriptions and manual overrides. Registration
  // trials are no longer authoritative: Casemate's seven-day trial is recorded
  // in user_trials and resolved below.
  if (status === 'active' || subscriptionStatus === 'active') return true;
  return status === 'manual_override' || !!value.manualOverride || !!value.manualSubscriptionOverride;
}

async function proAccountState(email) {
  const result = await proFetchJson(PRO_API_BASE + '/api/space/' + PRO_SPACE_ID + '/subscription-status?email=' + encodeURIComponent(email) + '&sessionId=' + encodeURIComponent(sessionId));
  if (!result.ok) throw new Error('Subscription service unavailable (status ' + result.status + ')');
  return result.body || {};
}
async function proEmailEntitled(email) {
  return proStatusEntitled(await proAccountState(email));
}

// POST /register is idempotent for an existing contact: it simply returns the
// email's stable canonical workspaceSessionId. An email only "belongs" to the
// caller when that canonical id equals the caller's X-Session-Id.
async function proSessionMatchesEmail(email) {
  const result = await proFetchJson(PRO_API_BASE + '/api/space/' + PRO_SPACE_ID + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, sessionId: sessionId }),
  });
  if (!result.ok) throw new Error('Subscription service unavailable (register ' + result.status + ')');
  return String(result.body.workspaceSessionId || '') === sessionId;
}

async function proOtpEmail() {
  const otp = await proFetchJson(PRO_API_BASE + '/api/auth/otp/space/check-session?workspaceId=' + encodeURIComponent(workspaceId) + '&sessionUuid=' + encodeURIComponent(sessionId));
  return otp.ok && otp.body.verified ? normalizeProEmail(otp.body.email) : '';
}

// Active-subscription resolution (unchanged mechanism from case-drill-v9):
// OTP-verified email -> verified client hint -> enumeration of currently
// entitled subscribers (agent tool calls carry no email; bounded set).
async function resolveProAccess() {
  const otpEmail = await proOtpEmail();
  if (otpEmail && (await proEmailEntitled(otpEmail))) return otpEmail;

  const claimed = normalizeProEmail(body.customerEmail || body.customer_email || query.customer_email);
  if (claimed && claimed !== otpEmail && (await proEmailEntitled(claimed)) && (await proSessionMatchesEmail(claimed))) return claimed;

  const subs = await proFetchJson(PRO_API_BASE + '/api/crm/subscribers/' + PRO_SPACE_ID + '?limit=200');
  if (!subs.ok) throw new Error('Subscription service unavailable (subscribers ' + subs.status + ')');
  const entitled = (Array.isArray(subs.body.subscribers) ? subs.body.subscribers : [])
    .filter(function (item) { return item && item.email && proStatusEntitled(item); })
    .slice(0, 25);
  for (let i = 0; i < entitled.length; i += 1) {
    const email = normalizeProEmail(entitled[i].email);
    if (!email || email === claimed || email === otpEmail) continue;
    if (await proSessionMatchesEmail(email)) return email;
  }
  return '';
}

// Email PROOF for founding-member claims: OTP-verified email, or a client
// hint the platform binds to THIS exact session. Never trusted raw.
async function resolveBoundEmail() {
  // Social callbacks persist the provider-verified email with the canonical
  // workspace session. Verify that hint first: probing the OTP endpoint first
  // adds a guaranteed failed network round trip for every Google/Facebook user.
  const claimed = normalizeProEmail(body.customerEmail || body.customer_email || query.customer_email);
  if (claimed) {
    try { if (await proSessionMatchesEmail(claimed)) return claimed; } catch (error) { /* fall through to OTP proof */ }
  }
  let otpEmail = '';
  try { otpEmail = await proOtpEmail(); } catch (error) { otpEmail = ''; }
  return otpEmail;
}

async function loadTrialRules() {
  const defaults = { launch_week_start: null, launch_week_end: null, founding_member_limit: 0, founding_member_days: 7 };
  try {
    const result = await accessQuery('trial_config', { orderBy: [{ column: 'id', direction: 'desc' }], limit: 1 });
    let row = result.rows && result.rows[0] ? result.rows[0] : null;
    if (!row) return defaults;

    // One-time authoritative migrations for the original launch row and the
    // 2026-08-24 founding-offer change. Existing founding_members rows keep
    // their stored dates; entitlement applies the legacy cap separately.
    const legacyNote = String(row.note || '');
    const legacyLimit = parseInt(row.founding_member_limit, 10);
    const isUndeliveredV07Config =
      String(row.launch_week_start || '').trim() === '2026-08-08' &&
      String(row.launch_week_end || '').trim() === '2026-08-14' &&
      (legacyLimit === 50 || legacyLimit === 65) &&
      parseInt(row.founding_member_days, 10) === 30 &&
      (legacyNote.indexOf('v0.7 launch config') >= 0 || legacyNote.indexOf('v1.3 trial-delivery fix') >= 0);
    const isCurrentThirtyDayConfig =
      String(row.launch_week_start || '').trim() === '2026-08-04' &&
      String(row.launch_week_end || '').trim() === '2026-08-11' &&
      legacyLimit === 65 &&
      parseInt(row.founding_member_days, 10) === 30 &&
      legacyNote.indexOf('Launch-week delivery fix') >= 0;
    if (isUndeliveredV07Config || isCurrentThirtyDayConfig) {
      const migrated = await db.update('trial_config', { id: row.id }, {
        launch_week_start: '2026-08-04',
        launch_week_end: '2026-08-11',
        founding_member_limit: 0,
        founding_member_days: 7,
        note: 'Payment overhaul 2026-08-29: no new founding-member claims. Members claimed before 2026-08-29 use effective expiry min(expires_at, 2026-09-12T00:00:00Z); stored founding-member rows remain unchanged.',
        updated_at: new Date().toISOString(),
      });
      if (!migrated.updatedRows || !migrated.updatedRows[0]) {
        throw new Error('Authoritative trial_config migration did not update a row');
      }
      row = migrated.updatedRows[0];
    }

    const limit = parseInt(row.founding_member_limit, 10);
    const days = parseInt(row.founding_member_days, 10);
    return {
      launch_week_start: row.launch_week_start || null,
      launch_week_end: row.launch_week_end || null,
      founding_member_limit: Number.isFinite(limit) && limit >= 0 ? limit : defaults.founding_member_limit,
      founding_member_days: Number.isFinite(days) && days > 0 ? days : defaults.founding_member_days,
    };
  } catch (error) {
    // Never silently replace a failed authoritative read with permissive
    // defaults. The caller returns a neutral 503 verification error, not a
    // paywall and not accidental free access.
    console.error('trial_config read/migration failed', error);
    throw error;
  }
}

function launchWeekState(rules, nowMs) {
  const startRaw = rules.launch_week_start ? String(rules.launch_week_start).trim() : '';
  const endRaw = rules.launch_week_end ? String(rules.launch_week_end).trim() : '';
  const startMs = startRaw ? Date.parse(startRaw) : NaN;
  let endMs = endRaw ? Date.parse(endRaw) : NaN;
  if (Number.isFinite(endMs) && endRaw.length <= 10) endMs += 86399999; // date-only end is INCLUSIVE (end of that day, UTC)
  const configured = Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs;
  return {
    configured: configured,
    active: configured && nowMs >= startMs && nowMs <= endMs,
    upcoming: configured && nowMs < startMs,
    start: configured ? new Date(startMs).toISOString() : null,
    end: configured ? new Date(endMs).toISOString() : null,
  };
}

async function foundingMemberState(rules, nowMs, allowClaim, boundEmail) {
  const state = { member: false, active: false, email: '', member_number: null, expires_at: null, slots_remaining: 0, just_claimed: false };
  const all = await accessQuery('founding_members', { orderBy: [{ column: 'member_number', direction: 'asc' }, { column: 'id', direction: 'asc' }], limit: 100 });
  const rows = all.rows || [];
  // Count the persisted slot sequence exactly as stored. The founder now
  // short-circuits through the permanent comp rule and can never claim again,
  // but the legacy #5 audit row remains part of numbering so #66 is never
  // created and the 65-row capacity is unambiguous.
  state.slots_remaining = Math.max(0, rules.founding_member_limit - rows.length);
  const email = normalizeProEmail(boundEmail);
  if (!email) return state;
  state.email = email;
  const mine = rows.find(function (row) { return normalizeProEmail(row.email) === email; });
  if (mine) {
    const claimedAt = new Date(mine.claimed_at || mine.claim_date || '');
    const originalExpiry = new Date(mine.expires_at || '');
    const effectiveExpiry = Number.isFinite(claimedAt.getTime()) && claimedAt < LEGACY_CUTOFF && Number.isFinite(originalExpiry.getTime())
      ? new Date(Math.min(originalExpiry.getTime(), LEGACY_CAP.getTime()))
      : originalExpiry;
    const expiresMs = effectiveExpiry.getTime();
    state.member = true;
    state.active = Number.isFinite(expiresMs) && nowMs < expiresMs;
    state.member_number = mine.member_number;
    state.expires_at = Number.isFinite(expiresMs) ? effectiveExpiry.toISOString() : null;
    return state;
  }
  // A zero limit disables NEW claims only; persisted unexpired grants above
  // remain valid until their effective expiry.
  if (!rules.founding_member_limit || !allowClaim || state.slots_remaining <= 0) return state;
  const expiresAt = new Date(nowMs + rules.founding_member_days * 86400000).toISOString();
  const nextMemberNumber = rows.reduce(function (max, row) {
    const value = parseInt(row.member_number, 10);
    return Number.isFinite(value) && value > max ? value : max;
  }, 0) + 1;
  if (nextMemberNumber > rules.founding_member_limit) return state;
  try {
    const inserted = await db.insert('founding_members', {
      email: email,
      member_number: nextMemberNumber,
      claimed_at: new Date(nowMs).toISOString(),
      expires_at: expiresAt,
      session_id: sessionId || null,
    });
    const row = inserted.insertedRows && inserted.insertedRows[0] ? inserted.insertedRows[0] : null;
    if (!row) throw new Error('Founding-member insert returned no row');

    // Close the last-slot race between different accounts without needing a
    // schema change: deterministically retain only the first 65 rows. A loser
    // deletes only its own just-inserted row and remains on the normal paywall.
    const after = await accessQuery('founding_members', { orderBy: [{ column: 'member_number', direction: 'asc' }, { column: 'id', direction: 'asc' }], limit: 100 });
    const ranked = after.rows || [];
    const rank = ranked.findIndex(function (candidate) { return candidate.id === row.id; });
    if (rank < 0 || rank >= rules.founding_member_limit || parseInt(row.member_number, 10) > rules.founding_member_limit) {
      await db.delete('founding_members', { id: row.id });
      state.slots_remaining = 0;
      return state;
    }

    state.member = true;
    state.active = true;
    state.just_claimed = true;
    state.member_number = row.member_number;
    state.expires_at = expiresAt;
    state.slots_remaining = Math.max(0, rules.founding_member_limit - ranked.length);
  } catch (error) {
    // A unique-email race means another request created this account's row.
    // Re-read immediately so the winning claim is delivered in this request,
    // rather than leaving the customer on a stale paywall until refresh.
    console.error('Founding-member claim raced; re-reading entitlement', error);
    const retry = await accessQuery('founding_members', { where: { email: email }, limit: 1 });
    const mine = retry.rows && retry.rows[0] ? retry.rows[0] : null;
    if (mine) {
      const claimedAt = new Date(mine.claimed_at || mine.claim_date || '');
      const originalExpiry = new Date(mine.expires_at || '');
      const effectiveExpiry = Number.isFinite(claimedAt.getTime()) && claimedAt < LEGACY_CUTOFF && Number.isFinite(originalExpiry.getTime())
        ? new Date(Math.min(originalExpiry.getTime(), LEGACY_CAP.getTime()))
        : originalExpiry;
      const expiresMs = effectiveExpiry.getTime();
      state.member = true;
      state.active = Number.isFinite(expiresMs) && nowMs < expiresMs;
      state.member_number = mine.member_number;
      state.expires_at = Number.isFinite(expiresMs) ? effectiveExpiry.toISOString() : null;
    }
  }
  return state;
}

// Feedback-gate grant (v1.6): ONE month of the paid tools for submitting the
// in-paywall feedback gate. A row exists per granted email — granted stays
// true forever (the gate never re-fires), active only until expires_at.
async function feedbackGrantState(nowMs, boundEmail) {
  const state = { granted: false, active: false, expires_at: null, email: '', eligible: false };
  const email = normalizeProEmail(boundEmail);
  if (!email) return state;
  state.email = email;
  const result = await accessQuery('feedback_pro_grants', { where: { email: email }, limit: 1 });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  const expiresMs = Date.parse(row.expires_at || '');
  state.granted = true;
  state.active = Number.isFinite(expiresMs) && nowMs < expiresMs;
  state.expires_at = row.expires_at || null;
  return state;
}

// Gate eligibility: has this user actually opened Case Pool or Case Drill at
// least once? Reads the usage_events rows the Desktop shell writes (one per
// user per app per day), matched on the signed-in email key, the device
// visitor key (client hint), and the session reference.
async function hasAccessedTrainingApps(boundEmail, visitorId) {
  const TRAINING_APP_IDS = ['case-drill-log', 'case-drill'];
  const keys = [];
  const email = normalizeProEmail(boundEmail);
  if (email) keys.push('email:' + email);
  const vid = String(visitorId || '').trim();
  if (vid) keys.push('device:' + vid);
  if (sessionId) keys.push('device:' + sessionId);
  for (let i = 0; i < keys.length; i += 1) {
    const byKey = await accessQuery('usage_events', {
      where: [
        { column: 'event_type', operator: '=', value: 'app_open' },
        { column: 'app_id', operator: 'IN', value: TRAINING_APP_IDS },
        { column: 'user_key', operator: '=', value: keys[i] },
      ],
      limit: 1,
    });
    if (byKey.rows && byKey.rows.length > 0) return true;
  }
  if (sessionId) {
    const bySession = await accessQuery('usage_events', {
      where: [
        { column: 'event_type', operator: '=', value: 'app_open' },
        { column: 'app_id', operator: 'IN', value: TRAINING_APP_IDS },
        { column: 'session_ref', operator: '=', value: sessionId },
      ],
      limit: 1,
    });
    if (bySession.rows && bySession.rows.length > 0) return true;
  }
  return false;
}

// The single access decision used by every paid feature. Order: team_accounts
// (permanent) -> active subscription -> launch week (while also
// preserving/claiming an eligible founding month) -> founding-member month
// -> feedback-gate month.
// New claims require one proven, normalized signed-in email.
const BILLING_PLAN_ALIASES = {
  price_monthly_promo: 'price_monthly',
};
function normalizeBillingPlanId(value) {
  const planId = String(value || '').trim();
  if (!planId) return null;
  const resolved = BILLING_PLAN_ALIASES[planId] || planId;
  return resolved === 'price_monthly' || resolved === 'price_6month' ? resolved : null;
}
async function localProSubscriptionState(nowMs) {
  const state = { active: false, exists: false, expires_at: null, plan: null };
  if (!sessionId) return state;
  const result = await accessQuery('pro_subscriptions', {
    where: { user_id: sessionId },
    orderBy: [{ column: 'id', direction: 'desc' }],
    limit: 1,
  });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  state.exists = true;
  const expiresMs = Date.parse(row.expires_at || '');
  state.active = Number.isFinite(expiresMs) && nowMs < expiresMs;
  state.expires_at = Number.isFinite(expiresMs) ? new Date(expiresMs).toISOString() : null;
  state.plan = normalizeBillingPlanId(row.plan);
  return state;
}

// Permanent internal access is resolved before every other entitlement. The
// email is already server-bound by resolveBoundEmail; the protected table has
// no expiry or trial semantics.
async function teamAccountState(boundEmail) {
  const state = { active: false, email: '', added_at: null, note: null };
  const email = normalizeProEmail(boundEmail);
  if (!email) return state;
  const result = await accessQuery('team_accounts', { where: { email: email }, limit: 1 });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  state.active = true;
  state.email = email;
  state.added_at = row.added_at || null;
  state.note = row.note || null;
  return state;
}

// Temporary tester grants are keyed only by the server-verified email.
// session_id is legacy audit metadata and must never participate in access.
async function temporaryTesterState(nowMs, boundEmail) {
  const state = { granted: false, active: false, trial_end_date: null, free_until: null, expires_at: null };
  const email = normalizeProEmail(boundEmail);
  if (!email) return state;
  const result = await accessQuery('temporary_testers', { where: { email: email }, limit: 1 });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  const rawTrialEndMs = Date.parse(row.trial_end_date || '');
  const rawFreeUntilMs = Date.parse(row.free_until || '');
  if (!Number.isFinite(rawFreeUntilMs)) return state;
  const trialEndDate = Number.isFinite(rawTrialEndMs) ? new Date(rawTrialEndMs).toISOString().slice(0, 10) : null;
  const freeUntil = new Date(rawFreeUntilMs).toISOString().slice(0, 10);
  const expiresAtMs = Date.parse(freeUntil + 'T23:59:59.999Z');
  state.granted = true;
  state.active = Number.isFinite(expiresAtMs) && nowMs <= expiresAtMs;
  state.trial_end_date = trialEndDate;
  state.free_until = freeUntil;
  state.expires_at = Number.isFinite(expiresAtMs) ? new Date(expiresAtMs).toISOString() : null;
  return state;
}

async function trialEndedOverrideState(boundEmail) {
  const state = { active: false, trial_ended_at: null, source: null };
  const email = normalizeProEmail(boundEmail);
  if (!email) return state;
  const result = await accessQuery('trial_ended_users', { where: { email: email, status: 'trial_ended' }, limit: 1 });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  state.active = true;
  state.trial_ended_at = row.trial_ended_at || null;
  state.source = row.source || null;
  return state;
}

async function resolveCasemateAccess() {
  const nowMs = Date.now();
  const rules = await loadTrialRules();
  const access = { entitled: false, hasAccess: false, reason: 'expired', email: '', launch_week: launchWeekState(rules, nowMs), founding: null, feedback_gate: null, team_account: null, temporary_tester: null, daysRemaining: 0, days_remaining: 0, trialType: 'expired', trial_end_date: null, expiresAt: null, subscription_type: null, planId: null, hadPriorProAccess: false, trialEnded: false, checked_at: new Date(nowMs).toISOString() };
  const boundEmail = await resolveBoundEmail();

  function expiredAccess() {
    access.trialEnded = access.hadPriorProAccess;
    return access;
  }

  function grant(type, reason, email, expiryMs, planId) {
    access.entitled = true;
    access.hasAccess = true;
    access.reason = reason;
    access.email = email || '';
    access.trialType = type;
    access.subscription_type = type === 'pro' ? 'pro' : 'trial';
    access.planId = normalizeBillingPlanId(planId);
    if (type === 'pro') {
      access.daysRemaining = null;
      access.days_remaining = null;
      access.expiresAt = Number.isFinite(expiryMs) ? new Date(expiryMs).toISOString() : null;
      return access;
    }
    const days = Math.max(0, Math.ceil((expiryMs - nowMs) / 86400000));
    access.daysRemaining = days;
    access.days_remaining = days;
    access.expiresAt = new Date(expiryMs).toISOString();
    access.trial_end_date = access.expiresAt.slice(0, 10);
    return access;
  }

  // Fetch the five authoritative status tables concurrently. Sequential reads
  // made a healthy new OAuth user wait for five round trips and let one slow
  // table strand the callback. Any failed/slow read returns a free fallback;
  // paid features remain fail-closed while the shell is allowed to load.
  let authoritativeChecks;
  try {
    authoritativeChecks = await Promise.all([
      teamAccountState(boundEmail),
      temporaryTesterState(nowMs, boundEmail),
      trialEndedOverrideState(boundEmail),
      localProSubscriptionState(nowMs),
      boundEmail
        ? accessQuery('founding_members', { where: { email: boundEmail }, limit: 1 })
        : Promise.resolve({ rows: [] }),
    ]);
  } catch (error) {
    console.error('Authoritative entitlement lookup failed; returning free fallback', error);
    access.reason = 'default';
    access.trialType = 'free';
    access.status = 'free';
    access.source = 'default';
    access.email = boundEmail || '';
    access.fallback = true;
    return access;
  }

  const teamAccount = authoritativeChecks[0];
  const temporaryTester = authoritativeChecks[1];
  const trialEndedOverride = authoritativeChecks[2];
  const localSubscription = authoritativeChecks[3];
  const foundingResult = authoritativeChecks[4];

  access.team_account = teamAccount;
  if (teamAccount.active) return grant('pro', 'team_account', boundEmail, NaN);

  access.temporary_tester = temporaryTester;
  access.hadPriorProAccess = access.hadPriorProAccess || temporaryTester.granted;
  if (temporaryTester.active) {
    return grant('temporary_tester', 'temporary_tester', boundEmail, Date.parse(temporaryTester.expires_at || ''));
  }

  if (trialEndedOverride.active) {
    access.reason = 'trial_ended_override';
    access.email = boundEmail || '';
    access.hadPriorProAccess = true;
    access.trialEnded = true;
    access.expiresAt = trialEndedOverride.trial_ended_at;
    access.trial_end_date = trialEndedOverride.trial_ended_at ? String(trialEndedOverride.trial_ended_at).slice(0, 10) : null;
    return access;
  }

  access.hadPriorProAccess = access.hadPriorProAccess || localSubscription.exists;
  if (boundEmail && localSubscription.active) {
    return grant('pro', 'subscription', boundEmail, Date.parse(localSubscription.expires_at || ''), localSubscription.plan);
  }

  const foundingRow = foundingResult.rows && foundingResult.rows[0] ? foundingResult.rows[0] : null;
  if (foundingRow) {
    const claimedAtMs = Date.parse(foundingRow.claimed_at || foundingRow.claim_date || '');
    const originalExpiryMs = Date.parse(foundingRow.expires_at || '');
    const isLegacyFoundingMember = Number.isFinite(claimedAtMs) && claimedAtMs < LEGACY_CUTOFF.getTime();
    const effectiveExpiryMs = Number.isFinite(originalExpiryMs)
      ? (isLegacyFoundingMember ? Math.min(originalExpiryMs, LEGACY_CAP.getTime()) : originalExpiryMs)
      : NaN;
    access.hadPriorProAccess = true;
    access.founding = {
      member: true,
      active: Number.isFinite(effectiveExpiryMs) && nowMs < effectiveExpiryMs,
      email: boundEmail,
      member_number: foundingRow.member_number,
      expires_at: Number.isFinite(effectiveExpiryMs) ? new Date(effectiveExpiryMs).toISOString() : null,
      slots_remaining: 0,
      just_claimed: false,
    };
    if (access.founding.active) return grant('founding', 'founding_member', boundEmail, effectiveExpiryMs);
    access.expiresAt = access.founding.expires_at;
    access.trial_end_date = access.expiresAt ? access.expiresAt.slice(0, 10) : null;
    return expiredAccess();
  }

  // None of team_accounts, temporary_testers, trial_ended_users,
  // pro_subscriptions or founding_members matched. This is the normal state for
  // a first-time Google/Facebook signup, not an error. Resolve immediately so
  // the shell never waits on optional legacy subscription/trial paths.
  access.reason = 'default';
  access.trialType = 'free';
  access.status = 'free';
  access.source = 'default';
  access.email = boundEmail || '';
  return access;

  // Legacy trial code is intentionally unreachable for a no-match OAuth user;
  // retained below as migration history for accounts with older persisted rows.
  // Only accounts registered on or after 2026-08-29 receive the standard
  // trial. Its immutable start is the server-owned registration timestamp.
  const accountState = await proAccountState(boundEmail);
  const registrationMs = Date.parse(accountState.trialStartDate || accountState.trial_start_date || '');
  if (!Number.isFinite(registrationMs) || registrationMs < LEGACY_CUTOFF.getTime()) return expiredAccess();

  let trialResult = await accessQuery('user_trials', { where: { user_id: sessionId }, limit: 1 });
  let trial = trialResult.rows && trialResult.rows[0] ? trialResult.rows[0] : null;
  if (!trial) {
    try {
      const inserted = await db.insert('user_trials', {
        user_id: sessionId,
        trial_start: new Date(registrationMs).toISOString(),
        trial_type: 'standard',
        session_id: sessionId,
      });
      trial = inserted.insertedRows && inserted.insertedRows[0] ? inserted.insertedRows[0] : null;
    } catch (error) {
      trialResult = await accessQuery('user_trials', { where: { user_id: sessionId }, limit: 1 });
      trial = trialResult.rows && trialResult.rows[0] ? trialResult.rows[0] : null;
    }
  }
  if (!trial) throw new Error('Could not create or load standard trial');
  access.hadPriorProAccess = true;
  const startMs = Date.parse(trial.trial_start || trial.created_at || '');
  const durationDays = Number.isFinite(parseInt(rules.founding_member_days, 10)) ? parseInt(rules.founding_member_days, 10) : 7;
  const expiryMs = Number.isFinite(startMs) ? startMs + durationDays * 86400000 : NaN;
  if (Number.isFinite(expiryMs) && nowMs < expiryMs) return grant('standard', 'standard_trial', boundEmail, expiryMs);
  access.expiresAt = Number.isFinite(expiryMs) ? new Date(expiryMs).toISOString() : null;
  access.trial_end_date = access.expiresAt ? access.expiresAt.slice(0, 10) : null;
  return expiredAccess();
}

// Responds 402 (subscription required) or 503 (verification unavailable) and
// returns null when the feature must not run; returns the access object for
// entitled callers (team account, subscription, launch week, or founding month).
async function ensureCasemateAccessForGenerate(featureLabel, upgradeAppId, upgradeAppName) {
  let access = null;
  try {
    access = await resolveCasemateAccess(true);
  } catch (error) {
    console.error('Casemate access verification unavailable', error);
    respond(503, {
      error: 'Mate could not verify your Casemate Pro access just now. Please try again in a moment — your subscription is not affected.',
      code: 'subscription_check_unavailable',
    });
    return null;
  }
  if (access.entitled) return access;
  const slots = access.founding && access.founding.slots_remaining > 0 ? access.founding.slots_remaining : 0;
  const gateOffer = !!(access.feedback_gate && access.feedback_gate.eligible && !access.feedback_gate.granted);
  respond(402, {
    error: featureLabel + ' is part of Casemate Pro, and this account does not have an active subscription or trial. Open Settings → Account & Subscription and select Get Pro Plan; options are $5 for the first month then $8/month, $8/month, or $30 for six months. Your fit assessment stays completely free.',
    code: 'subscription_required',
    plans: [
      { id: 'price_monthly_promo', billing_plan_id: 'price_monthly', usd: 5, interval: 'month', renews_at_usd: 8 },
      { id: 'price_monthly', billing_plan_id: 'price_monthly', usd: 8, interval: 'month' },
      { id: 'price_6month', billing_plan_id: 'price_6month', usd: 30, interval: 'one_time', access_days: 180, savings_usd: 18 },
    ],
    upgrade: { app_id: upgradeAppId, app_name: upgradeAppName, deep_link: 'app://' + upgradeAppId },
    trial: { launch_week: access.launch_week, founding_slots_remaining: slots },
    message: 'If you are presenting this in chat: warmly explain that ' + featureLabel + ' is part of Casemate Pro, deep-link the candidate to Settings (app://settings), tell them to select Get Pro Plan, and remind them Fit Assessment stays completely free. Never invent discounts or trials beyond the server-returned plans.',
  });
  return null;
}
// ==== end Casemate access boundary ==========================================
`;

const ACCESS_HOOK_DESCRIPTION = `Casemate access resolver: protected team_accounts first for permanent internal access; then active plan-aware Pro, temporary testers, founding rows and the server-recorded seven-day trial (${ACCESS_RULES_VERSION})`;

const ACCESS_HOOK_CODE =
  String.raw`
const body = request.body || {};
const query = request.query || {};
const action = String(body.action || query.action || 'entitlement');
const sessionId = String(request.headers['x-session-id'] || request.headers['X-Session-Id'] || body.sessionId || body.session_id || '');
` +
  CASEMATE_ENTITLEMENT_SNIPPET +
  String.raw`
if (action === 'entitlement') {
  try {
    const allowClaim = !(body.claim === false || String(query.claim || '') === 'false');
    const access = await Promise.race([
      resolveCasemateAccess(allowClaim),
      new Promise(function (_, reject) {
        setTimeout(function () { reject(new Error('Entitlement resolution timed out after 1500ms')); }, 1500);
      }),
    ]);
    respond(200, {
      success: true,
      entitled: access.entitled,
      hasAccess: access.entitled,
      reason: access.reason,
      email: access.email || undefined,
      launch_week: access.launch_week,
      founding: access.founding,
      feedback_gate: access.feedback_gate,
      team_account: access.team_account,
      daysRemaining: access.daysRemaining,
      days_remaining: access.days_remaining,
      trialType: access.trialType,
      trial_end_date: access.trial_end_date,
      expiresAt: access.expiresAt,
      subscription_type: access.subscription_type,
      planId: access.planId,
      hadPriorProAccess: access.hadPriorProAccess,
      trialEnded: access.trialEnded,
      checked_at: access.checked_at,
      plans: [
        { id: 'price_monthly_promo', billing_plan_id: 'price_monthly', usd: 5, interval: 'month', renews_at_usd: 8 },
        { id: 'price_monthly', billing_plan_id: 'price_monthly', usd: 8, interval: 'month' },
        { id: 'price_6month', billing_plan_id: 'price_6month', usd: 30, interval: 'one_time', access_days: 180, savings_usd: 18 },
      ],
    });
  } catch (error) {
    console.error('Casemate entitlement check failed; returning free fallback', error);
    respond(200, {
      success: true,
      entitled: false,
      hasAccess: false,
      reason: 'default',
      status: 'free',
      source: 'default',
      launch_week: { configured: false, active: false, upcoming: false, start: null, end: null },
      founding: null,
      feedback_gate: null,
      team_account: null,
      daysRemaining: 0,
      days_remaining: 0,
      trialType: 'free',
      trial_end_date: null,
      expiresAt: null,
      subscription_type: null,
      planId: null,
      hadPriorProAccess: false,
      trialEnded: false,
      fallback: true,
      checked_at: new Date().toISOString(),
    });
  }
} else if (action === 'feedback_grant') {
  respond(410, { success: false, code: 'offer_retired', error: 'This legacy access offer has ended.' });
} else if (false) {
  // Feedback-to-Pro gate (retired): retained as unreachable audit history.
  // feedback_form_responses table the Feedback app writes, grants 30 days of
  // Pro (feedback_pro_grants, unique per email — the gate can only ever
  // fire once), and pushes the new feedback row to the founder's Google
  // Sheet via the casemate-feedback-sheets-sync-v1 hook. Every rule is
  // enforced server-side: proven signed-in email, real Case Pool / Case
  // Drill usage, valid rating + WTP range.
  try {
    const nowMs = Date.now();
    const boundEmail = await resolveBoundEmail();
    if (!boundEmail) {
      respond(400, { success: false, code: 'email_required', error: 'Sign in with your email first — the free month is tied to your account.' });
    } else {
      const existing = await feedbackGrantState(nowMs, boundEmail);
      if (existing.granted) {
        respond(200, {
          success: true,
          already_granted: true,
          granted: true,
          active: existing.active,
          expires_at: existing.expires_at,
          entitled: existing.active,
          reason: existing.active ? 'feedback_grant' : '',
        });
      } else {
        const eligible = await hasAccessedTrainingApps(boundEmail, body.visitorId || body.visitor_id || query.visitorId);
        if (!eligible) {
          respond(403, { success: false, code: 'not_eligible', error: 'This offer unlocks after you have opened Case Pool or Case Drill at least once.' });
        } else {
          const feedback = body.feedback && typeof body.feedback === 'object' ? body.feedback : {};
          const score = parseInt(feedback.score, 10);
          const priceRange = String(feedback.price_range || '').trim();
          const experience = String(feedback.experience || '').trim();
          if (!(score >= 1 && score <= 5) || !priceRange) {
            respond(400, { success: false, code: 'invalid_feedback', error: 'A 1–5 star rating and a willingness-to-pay range are required.' });
          } else {
            const inserted = await db.insert('feedback_form_responses', {
              email: boundEmail,
              score: score,
              experience: experience || null,
              price_range: priceRange,
              session_id: sessionId || null,
            });
            const feedbackRow = inserted.insertedRows && inserted.insertedRows[0] ? inserted.insertedRows[0] : null;
            const feedbackRowId = feedbackRow && Number.isFinite(parseInt(feedbackRow.id, 10)) ? parseInt(feedbackRow.id, 10) : null;
            const grantedAt = new Date(nowMs).toISOString();
            const expiresAt = new Date(nowMs + 30 * 86400000).toISOString();
            let grantRow = null;
            try {
              const grant = await db.insert('feedback_pro_grants', {
                email: boundEmail,
                feedback_row_id: feedbackRowId,
                granted_at: grantedAt,
                expires_at: expiresAt,
                session_id: sessionId || null,
                source: 'feedback_gate',
              });
              grantRow = grant.insertedRows && grant.insertedRows[0] ? grant.insertedRows[0] : null;
            } catch (error) {
              // Unique-email race: another request already granted this account
              // its month — re-read and deliver the winning grant.
              console.error('Feedback grant raced; re-reading', error);
            }
            const state = grantRow
              ? { granted: true, active: true, expires_at: expiresAt }
              : await feedbackGrantState(Date.now(), boundEmail);
            // Part A hand-off: push the new feedback row to the founder's
            // Google Sheet. Best-effort — a sync failure never blocks the
            // grant (the row backfills on the next sync run).
            try {
              await fetch(PRO_API_BASE + '/api/workspaces/' + PRO_SPACE_ID + '/hooks/casemate-feedback-sheets-sync-v1/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'sync', row_ids: feedbackRowId != null ? [feedbackRowId] : undefined }),
              });
            } catch (error) {
              console.error('Sheet sync after feedback grant failed (row will backfill on next sync)', error);
            }
            respond(200, {
              success: true,
              granted: state.granted,
              active: state.active,
              expires_at: state.expires_at || expiresAt,
              entitled: state.granted && state.active,
              reason: 'feedback_grant',
              feedback_row_id: feedbackRowId,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Feedback grant failed', error);
    respond(503, { success: false, code: 'grant_unavailable', error: 'Could not process the feedback grant just now. Please try again in a moment.' });
  }
} else {
  respond(400, { error: 'Unknown access action. Use action=entitlement (optional claim=false to skip founding-slot claiming) or action=feedback_grant.' });
}
`;

/* ============================================================================
 * Client helpers
 * ==========================================================================*/

export interface LaunchWeekState {
  configured: boolean;
  active: boolean;
  upcoming: boolean;
  start: string | null;
  end: string | null;
}

export interface FoundingMemberState {
  member: boolean;
  active: boolean;
  email: string;
  member_number: number | null;
  expires_at: string | null;
  slots_remaining: number;
  just_claimed: boolean;
}

export interface FeedbackGateState {
  /** A grant row exists for this email (the gate never fires again). */
  granted: boolean;
  /** The granted month is still running. */
  active: boolean;
  expires_at: string | null;
  email?: string;
  /** No grant yet AND the user has actually opened Case Pool / Case Drill — the paywall should show the feedback gate. */
  eligible?: boolean;
}

export interface TeamAccountState {
  active: boolean;
  email: string;
  added_at: string | null;
  note: string | null;
}

export interface CasemateEntitlement {
  entitled: boolean;
  reason: 'team_account' | 'comp' | 'subscription' | 'temporary_tester' | 'trial_ended_override' | 'founding_member' | 'standard_trial' | 'feedback_grant' | 'expired' | 'default' | 'free_fallback' | '';
  status?: 'free' | 'active' | 'expired';
  source?: string;
  email?: string;
  launch_week: LaunchWeekState;
  founding: FoundingMemberState | null;
  feedback_gate: FeedbackGateState | null;
  team_account?: TeamAccountState | null;
  daysRemaining?: number | null;
  days_remaining?: number | null;
  trialType?: 'temporary_tester' | 'founding' | 'standard' | 'feedback' | 'free' | 'expired' | 'pro';
  trial_end_date?: string | null;
  free_until?: string | null;
  expiresAt?: string | null;
  subscription_type?: 'trial' | 'pro' | null;
  planId?: 'price_monthly' | 'price_6month' | null;
  hadPriorProAccess?: boolean;
  trialEnded?: boolean;
  checked_at?: string;
  fallback?: boolean;
}

/** The `audos_vid` device cookie — sent to the access hook so gate
 * eligibility can match usage_events rows written before sign-in. */
export function currentVisitorId(): string | null {
  try {
    const match = document.cookie.match(/(?:^|;\s*)audos_vid=([^;]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

let ensureAccessHookPromise: Promise<void> | null = null;

/**
 * Idempotent hook installer for authenticated workspace-management surfaces.
 * Customer sessions must never call this as part of an access check: hook
 * management intentionally returns 401 to them, while hook execution remains
 * available. The published hook is therefore executed directly below.
 */
export function ensureCasemateAccessHook(): Promise<void> {
  if (ensureAccessHookPromise) return ensureAccessHookPromise;

  ensureAccessHookPromise = (async () => {
    const listResponse = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) throw new Error('Access service unavailable. Please refresh and try again.');
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === ACCESS_HOOK_NAME);

    if (!existing) {
      const createResponse = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ACCESS_HOOK_NAME,
          description: ACCESS_HOOK_DESCRIPTION,
          code: ACCESS_HOOK_CODE,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Could not activate the access service. Please try again.');
      return;
    }

    if (
      existing.description !== ACCESS_HOOK_DESCRIPTION ||
      existing.code !== ACCESS_HOOK_CODE ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: ACCESS_HOOK_DESCRIPTION, code: ACCESS_HOOK_CODE, enabled: true }),
      });
      if (!updateResponse.ok) throw new Error('Could not update the access service. Please try again.');
    }
  })().catch((error) => {
    ensureAccessHookPromise = null;
    throw error;
  });

  return ensureAccessHookPromise;
}

/**
 * The signed-in email stored by the platform session (EmailGate / register).
 * Sent to hooks only as a VERIFICATION HINT — the hook independently proves
 * the email belongs to the calling session before it counts.
 */
export function storedSessionEmail(spaceId: string = CASEMATE_WORKSPACE_ID): string | null {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (!stored) return null;
    const session = JSON.parse(stored);
    if (session?.verified === false || typeof session?.email !== 'string') return null;
    const normalized = session.email.trim().toLowerCase();
    return normalized.includes('@') ? normalized : null;
  } catch {
    return null;
  }
}

/**
 * Ask the access hook whether this session is entitled to the paid tools and
 * why (team account / subscription / launch week / founding month). With claim=true (the
 * default) a signed-in, non-subscribed user automatically claims the next
 * founding-member slot while any of the 65 remain.
 * Returns a resolved, non-entitled free fallback when verification times out
 * (fail closed for Pro features without blocking the shell or free apps).
 */
function freeEntitlementFallback(source: string): CasemateEntitlement {
  return {
    entitled: false,
    reason: 'default',
    status: 'free',
    source,
    launch_week: { configured: false, active: false, upcoming: false, start: null, end: null },
    founding: null,
    feedback_gate: null,
    team_account: null,
    daysRemaining: 0,
    days_remaining: 0,
    trialType: 'free',
    trial_end_date: null,
    expiresAt: null,
    subscription_type: null,
    planId: null,
    hadPriorProAccess: false,
    trialEnded: false,
    fallback: true,
    checked_at: new Date().toISOString(),
  };
}

function isFirstLoginSocialSession(spaceId: string = CASEMATE_WORKSPACE_ID): boolean {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (!stored) return false;
    const session = JSON.parse(stored);
    return session?.verified === true
      && (session.authMethod === 'google' || session.authMethod === 'facebook')
      && session.isReturningUser === false;
  } catch (error) {
    console.error('[CasemateAccess] Could not inspect the social-login session; using bounded entitlement lookup.', error);
    return false;
  }
}

export async function fetchCasemateEntitlement(
  sessionId: string,
  options: { claim?: boolean } = {},
): Promise<CasemateEntitlement | null> {
  // A brand-new provider-verified account cannot have a prior Casemate grant.
  // Return Free immediately instead of making it wait for five legacy tables.
  if (isFirstLoginSocialSession()) {
    return freeEntitlementFallback('new_oauth_user');
  }

  const controller = new AbortController();
  let timeoutId = 0;
  const request = (async (): Promise<CasemateEntitlement> => {
    const response = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/${ACCESS_HOOK_NAME}/execute`, {
      method: 'POST',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'X-Session-Id': sessionId,
      },
      body: JSON.stringify({
        action: 'entitlement',
        sessionId,
        claim: options.claim !== false,
        customerEmail: storedSessionEmail() || undefined,
        visitorId: currentVisitorId() || undefined,
      }),
    });
    const data = await response.json().catch((error) => {
      console.error('[CasemateAccess] Entitlement response could not be parsed.', error);
      return {};
    });
    if (!response.ok || data.error || data.success !== true) {
      throw new Error(`Entitlement service returned HTTP ${response.status}`);
    }
    return {
      entitled: !!data.entitled,
      reason: data.reason || '',
      status: data.status,
      source: data.source,
      email: data.email,
      launch_week: data.launch_week || { configured: false, active: false, upcoming: false, start: null, end: null },
      founding: data.founding || null,
      feedback_gate: data.feedback_gate || null,
      team_account: data.team_account || null,
      daysRemaining: data.daysRemaining ?? data.days_remaining ?? null,
      days_remaining: data.days_remaining ?? data.daysRemaining ?? null,
      trialType: data.trialType ?? (data.subscription_type === 'pro' ? 'pro' : data.entitled ? 'standard' : 'free'),
      trial_end_date: data.trial_end_date ?? null,
      free_until: data.free_until ?? null,
      expiresAt: data.expiresAt ?? null,
      subscription_type: data.subscription_type ?? null,
      planId: data.planId ?? null,
      hadPriorProAccess: data.hadPriorProAccess === true,
      trialEnded: data.trialEnded === true,
      fallback: data.fallback === true,
      checked_at: data.checked_at,
    };
  })();

  const hardTimeout = new Promise<CasemateEntitlement>((resolve) => {
    timeoutId = window.setTimeout(() => {
      console.error('[CasemateAccess] Entitlement lookup exceeded 5000ms; continuing as Free.');
      controller.abort();
      resolve(freeEntitlementFallback('hard_timeout'));
    }, 5000);
  });

  try {
    return await Promise.race([request, hardTimeout]);
  } catch (error) {
    console.error('[CasemateAccess] Entitlement lookup failed; continuing as Free.', error);
    return freeEntitlementFallback('lookup_failure');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export interface FeedbackGrantResult {
  success: boolean;
  granted?: boolean;
  active?: boolean;
  already_granted?: boolean;
  expires_at?: string | null;
  entitled?: boolean;
  code?: string;
  error?: string;
}

/**
 * Submit the feedback-to-Pro gate: saves the feedback into the Feedback
 * database server-side, grants 1 month of Casemate Pro (once per email,
 * verified against real Case Pool / Case Drill usage), and triggers the
 * Google Sheets sync. Returns null when the service itself is unreachable.
 */
export async function submitFeedbackGateGrant(
  sessionId: string,
  feedback: { score: number; price_range: string; experience?: string },
): Promise<FeedbackGrantResult | null> {
  // As with entitlement reads, execute the published hook directly. Customer
  // sessions are allowed to execute it but are not allowed to list/PATCH hooks.
  try {
    const response = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/${ACCESS_HOOK_NAME}/execute`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Id': sessionId,
      },
      body: JSON.stringify({
        action: 'feedback_grant',
        sessionId,
        customerEmail: storedSessionEmail() || undefined,
        visitorId: currentVisitorId() || undefined,
        feedback: {
          score: feedback.score,
          price_range: feedback.price_range,
          experience: feedback.experience || '',
        },
      }),
    });
    const data = await response.json().catch(() => ({}));
    return data && typeof data === 'object' ? (data as FeedbackGrantResult) : null;
  } catch {
    return null;
  }
}

export interface TemporaryTesterRow {
  id: string;
  email: string;
  trial_end_date: string;
  free_until: string;
  active: boolean;
}

/** Founder-only audit read. The server function verifies the signed-in founder
 * session before returning any whitelist email address. */
export async function fetchTemporaryTesters(sessionId: string): Promise<TemporaryTesterRow[]> {
  const response = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/casemate-temporary-testers-v1/execute`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': sessionId,
    },
    body: JSON.stringify({
      action: 'list',
      sessionId,
      customerEmail: storedSessionEmail() || undefined,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success !== true || !Array.isArray(data.testers)) {
    throw new Error(data.error || 'Could not load temporary testers.');
  }
  return data.testers as TemporaryTesterRow[];
}

/** Human date like "August 16" for trial banners. */
export function formatTrialDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
}
