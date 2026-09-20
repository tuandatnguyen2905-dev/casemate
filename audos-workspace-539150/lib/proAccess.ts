// Casemate access boundary (v0.7) — ONE shared decision for every paid
// surface: Case Pool, Case Drill, Domain Knowledge, and Mate's in-chat
// practice/knowledge tools.
//
//   entitled = a COMP / FOUNDER allowlisted account (COMP_EMAILS below):
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
//           OR a TEMPORARY-TESTER grant: a founder-approved email receives
//              Pro access until the authoritative expiry stored in
//              `user_access_tiers.trial_end_date`
//           OR a FEEDBACK-GATE month: a free user who has actually tried Case
//              Pool or Case Drill (usage_events) submits the in-paywall
//              feedback gate once and gets 30 days of the paid tools free
//              (WorkspaceDB `feedback_pro_grants` — unique per email, never
//              re-claimable; expired grants fall back to the normal paywall)
//
// Entitlement tables (`founding_members`, `user_access_tiers`, and
// `feedback_pro_grants`) run with
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
export const ACCESS_RULES_VERSION = 'access-v13-session-cache-no-false-paywall';

// Client-side mirror of the server defaults (server reads trial_config live).
export const TRIAL_DEFAULTS = {
  // v1.3: preserve the original 50 places and add 15 new one-month places.
  // This is the server-hook fallback and the one-time migration target for
  // the authoritative trial_config row; change that row after migration for
  // future capacity/duration adjustments.
  foundingMemberLimit: 0,
  foundingMemberDays: 14,
};

// Comp / founder allowlist — the SERVER-SIDE source of truth (it is embedded
// into the entitlement snippet below, so every Casemate hook enforces it).
// These sign-in emails are treated as an active paid subscription with NO
// expiry: full access to every Pro tool, no charge, no trial countdown, no
// upgrade prompts, ever — overriding any prior trial or lapsed billing state.
// Entries must be lowercase; matching input is trimmed + lowercased. To comp
// another account, add its email here and bump ACCESS_RULES_VERSION above.
export const COMP_EMAILS = ['benjaminnguyen.work03@gmail.com'];

/** Case-insensitive, whitespace-trimmed comp-allowlist check (client-side
 * cosmetic only — the authoritative check runs inside the hooks). */
export function isCompEmail(email: unknown): boolean {
  return typeof email === 'string' && COMP_EMAILS.includes(email.trim().toLowerCase());
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
// ==== Casemate access boundary (access-v11-unified-user-tiers) ================
// entitled = a comp/founder allowlisted email (COMP_EMAILS — permanent free
// access, no expiry) OR active Casemate Pro subscription OR an active
// temporary-tester grant from user_access_tiers (trial_end_date is the
// exclusive UTC expiry) OR the one-time launch-week window (trial_config) OR an
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
  const response = await fetch(url, options);
  let payload = null;
  try { payload = await response.json(); } catch (error) { payload = null; }
  return { ok: response.ok, status: response.status, body: payload || {} };
}

function normalizeProEmail(raw) {
  const email = String(raw || '').trim().toLowerCase();
  return email.indexOf('@') > 0 ? email : '';
}

// Comp / founder allowlist — interpolated from COMP_EMAILS in lib/proAccess.ts
// at build time (edit it THERE). Matching is against the normalized
// (trimmed, lowercased) server-verified sign-in email, never a raw claim.
const COMP_EMAILS = ${JSON.stringify(COMP_EMAILS)};

function proStatusEntitled(payload) {
  const value = payload || {};
  const status = String(value.status || '').toLowerCase();
  const subscriptionStatus = String(value.subscriptionStatus || value.subscription_status || '').toLowerCase();

  // Preserve only legacy PAID subscriptions and manual overrides. Registration
  // trials are no longer authoritative: Casemate's fourteen-day trial is recorded
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
  let otpEmail = '';
  try { otpEmail = await proOtpEmail(); } catch (error) { otpEmail = ''; }
  if (otpEmail) return otpEmail;
  const claimed = normalizeProEmail(body.customerEmail || body.customer_email || query.customer_email);
  if (claimed) {
    try { if (await proSessionMatchesEmail(claimed)) return claimed; } catch (error) { /* unverifiable now */ }
  }
  return '';
}

async function loadTrialRules() {
  const defaults = { launch_week_start: null, launch_week_end: null, founding_member_limit: 0, founding_member_days: 14 };
  try {
    const result = await db.query('trial_config', { orderBy: [{ column: 'id', direction: 'desc' }], limit: 1 });
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
        founding_member_days: 14,
        note: 'Trial policy updated 2026-09-14: new verified users receive one server-recorded 14-day standard trial. No new founding-member claims; legacy founding-member rows remain unchanged.',
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
  const all = await db.query('founding_members', { orderBy: [{ column: 'member_number', direction: 'asc' }, { column: 'id', direction: 'asc' }], limit: 100 });
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
    const after = await db.query('founding_members', { orderBy: [{ column: 'member_number', direction: 'asc' }, { column: 'id', direction: 'asc' }], limit: 100 });
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
    const retry = await db.query('founding_members', { where: { email: email }, limit: 1 });
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
  const result = await db.query('feedback_pro_grants', { where: { email: email }, limit: 1 });
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
    const byKey = await db.query('usage_events', {
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
    const bySession = await db.query('usage_events', {
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

// The single access decision used by every paid feature. Order: comp/founder
// allowlist (permanent) -> active subscription -> launch week (while also
// preserving/claiming an eligible founding month) -> founding-member month
// -> feedback-gate month.
// New claims require one proven, normalized signed-in email.
async function localProSubscriptionState(nowMs) {
  const state = { active: false, expires_at: null, plan: null };
  if (!sessionId) return state;
  const result = await db.query('pro_subscriptions', {
    where: { user_id: sessionId },
    orderBy: [{ column: 'id', direction: 'desc' }],
    limit: 1,
  });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  const expiresMs = Date.parse(row.expires_at || '');
  state.active = Number.isFinite(expiresMs) && nowMs < expiresMs;
  state.expires_at = Number.isFinite(expiresMs) ? new Date(expiresMs).toISOString() : null;
  state.plan = row.plan || null;
  return state;
}

// Temporary tester access comes only from the unified tier registry. The
// stored trial_end_date is an exclusive UTC expiry; no legacy date arithmetic
// is applied in secondary feature hooks.
async function temporaryTesterState(nowMs, boundEmail) {
  const state = { granted: false, active: false, trial_end_date: null, free_until: null, expires_at: null };
  const email = normalizeProEmail(boundEmail);
  if (!email) return state;
  const result = await db.query('user_access_tiers', {
    where: { email: email, tier: 'temporary_tester' },
    limit: 1,
  });
  const row = result.rows && result.rows[0] ? result.rows[0] : null;
  if (!row) return state;
  const expiryMs = Date.parse(row.trial_end_date || '');
  if (!Number.isFinite(expiryMs)) return state;
  const expiry = new Date(expiryMs).toISOString();
  state.granted = true;
  state.active = nowMs < expiryMs;
  state.trial_end_date = expiry.slice(0, 10);
  state.free_until = expiry.slice(0, 10);
  state.expires_at = expiry;
  return state;
}

async function resolveCasemateAccess() {
  const nowMs = Date.now();
  const rules = await loadTrialRules();
  const access = { entitled: false, hasAccess: false, reason: 'expired', email: '', launch_week: launchWeekState(rules, nowMs), founding: null, feedback_gate: null, temporary_tester: null, daysRemaining: 0, days_remaining: 0, trialType: 'expired', trial_end_date: null, expiresAt: null, subscription_type: null, planId: null, checked_at: new Date(nowMs).toISOString() };
  const boundEmail = await resolveBoundEmail();
  // A present session with no proven email is a transient verification failure,
  // never evidence that the account is Free. Callers surface a neutral retry
  // state and preserve the last session-scoped entitlement cache.
  if (sessionId && !boundEmail) throw new Error('Signed-in session identity could not be verified');

  function grant(type, reason, email, expiryMs, planId) {
    access.entitled = true;
    access.hasAccess = true;
    access.reason = reason;
    access.email = email || '';
    access.trialType = type;
    access.subscription_type = type === 'pro' ? 'pro' : 'trial';
    access.planId = planId || null;
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

  if (boundEmail && COMP_EMAILS.indexOf(boundEmail) >= 0) return grant('pro', 'comp', boundEmail, NaN);

  // The unified tier row is authoritative for every founder-managed access
  // state. A deny tier must not fall through to stale legacy entitlement.
  if (boundEmail) {
    const tierResult = await db.query('user_access_tiers', { where: { email: boundEmail }, limit: 1 });
    const tierRow = tierResult.rows && tierResult.rows[0] ? tierResult.rows[0] : null;
    if (tierRow) {
      const tier = String(tierRow.tier || '').trim().toLowerCase();
      if (tier === 'team') return grant('pro', 'team_account', boundEmail, NaN);
      if (tier === 'pro') {
        const proExpiryMs = Date.parse(tierRow.trial_end_date || '');
        if (!Number.isFinite(proExpiryMs) || nowMs < proExpiryMs) {
          return grant('pro', 'subscription', boundEmail, proExpiryMs);
        }
        access.reason = 'subscription_expired';
        access.email = boundEmail;
        return access;
      }
      if (tier === 'temporary_tester') {
        const temporaryTester = await temporaryTesterState(nowMs, boundEmail);
        access.temporary_tester = temporaryTester;
        if (temporaryTester.active) {
          return grant('temporary_tester', 'temporary_tester', boundEmail, Date.parse(temporaryTester.expires_at || ''));
        }
        access.reason = 'temporary_tester_expired';
        access.email = boundEmail;
        return access;
      }
      if (tier === 'trial_ended') {
        access.reason = 'trial_ended';
        access.email = boundEmail;
        return access;
      }
      throw new Error('Invalid user_access_tiers tier for ' + boundEmail);
    }
  }

  const localSubscription = await localProSubscriptionState(nowMs);
  if (boundEmail && localSubscription.active) {
    return grant('pro', 'subscription', boundEmail, Date.parse(localSubscription.expires_at || ''), localSubscription.plan);
  }

  const legacyPaidEmail = await resolveProAccess();
  if (legacyPaidEmail) return grant('pro', 'subscription', legacyPaidEmail, NaN, 'price_monthly');

  if (!boundEmail || !sessionId) return access;

  // Existing founding rows are read-only entitlement evidence. Never insert,
  // update, or extend one here. Rows claimed before 2026-08-29 use the earlier
  // of their original expires_at and 2026-09-12.
  const foundingResult = await db.query('founding_members', { where: { email: boundEmail }, limit: 1 });
  const foundingRow = foundingResult.rows && foundingResult.rows[0] ? foundingResult.rows[0] : null;
  if (foundingRow) {
    const claimedAtMs = Date.parse(foundingRow.claimed_at || foundingRow.claim_date || '');
    const originalExpiryMs = Date.parse(foundingRow.expires_at || '');
    const isLegacyFoundingMember = Number.isFinite(claimedAtMs) && claimedAtMs < LEGACY_CUTOFF.getTime();
    const effectiveExpiryMs = Number.isFinite(originalExpiryMs)
      ? (isLegacyFoundingMember ? Math.min(originalExpiryMs, LEGACY_CAP.getTime()) : originalExpiryMs)
      : NaN;
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
    return access;
  }

  // Only accounts registered on or after 2026-08-29 receive the standard
  // trial. Its immutable start is the server-owned registration timestamp.
  const accountState = await proAccountState(boundEmail);
  const registrationMs = Date.parse(accountState.trialStartDate || accountState.trial_start_date || '');
  if (!Number.isFinite(registrationMs) || registrationMs < LEGACY_CUTOFF.getTime()) return access;

  let trialResult = await db.query('user_trials', { where: { user_id: sessionId }, limit: 1 });
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
      trialResult = await db.query('user_trials', { where: { user_id: sessionId }, limit: 1 });
      trial = trialResult.rows && trialResult.rows[0] ? trialResult.rows[0] : null;
    }
  }
  if (!trial) throw new Error('Could not create or load standard trial');
  const startMs = Date.parse(trial.trial_start || trial.created_at || '');
  const durationDays = Number.isFinite(parseInt(rules.founding_member_days, 10)) ? parseInt(rules.founding_member_days, 10) : 14;
  const expiryMs = Number.isFinite(startMs) ? startMs + durationDays * 86400000 : NaN;
  if (Number.isFinite(expiryMs) && nowMs < expiryMs) return grant('standard', 'standard_trial', boundEmail, expiryMs);
  access.expiresAt = Number.isFinite(expiryMs) ? new Date(expiryMs).toISOString() : null;
  access.trial_end_date = access.expiresAt ? access.expiresAt.slice(0, 10) : null;
  return access;
}

// Responds 402 (subscription required) or 503 (verification unavailable) and
// returns null when the feature must not run; returns the access object for
// entitled callers (comp allowlist, subscription, launch week, or founding month).
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
    error: featureLabel + ' is part of Casemate Pro, and this account does not have an active subscription or trial. Open Settings → Account & Subscription and select Get Pro Plan; options are $5 for the first month then $25/month, $25/month, or $100 for six months. Your fit assessment stays completely free.',
    code: 'subscription_required',
    plans: [
      { id: 'price_monthly_promo', usd: 5, interval: 'month', renews_at_usd: 25 },
      { id: 'price_monthly', usd: 25, interval: 'month' },
      { id: 'price_6month', usd: 100, interval: 'one_time', access_days: 180, savings_usd: 50 },
    ],
    upgrade: { app_id: upgradeAppId, app_name: upgradeAppName, deep_link: 'app://' + upgradeAppId },
    trial: { launch_week: access.launch_week, founding_slots_remaining: slots },
    message: 'If you are presenting this in chat: warmly explain that ' + featureLabel + ' is part of Casemate Pro, deep-link the candidate to Settings (app://settings), tell them to select Get Pro Plan, and remind them Fit Assessment stays completely free. Never invent discounts or trials beyond the server-returned plans.',
  });
  return null;
}
// ==== end Casemate access boundary ==========================================
`;

const ACCESS_HOOK_DESCRIPTION = `Casemate access resolver: active plan-aware Pro first; temporary tester grants use their stored trial_end_date; founding rows claimed before 2026-08-29 remain capped; then one server-recorded fourteen-day trial for every other verified account (${ACCESS_RULES_VERSION})`;

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
    const access = await resolveCasemateAccess(allowClaim);
    respond(200, {
      success: true,
      entitled: access.entitled,
      hasAccess: access.entitled,
      reason: access.reason,
      email: access.email || undefined,
      launch_week: access.launch_week,
      founding: access.founding,
      feedback_gate: access.feedback_gate,
      daysRemaining: access.daysRemaining,
      days_remaining: access.days_remaining,
      trialType: access.trialType,
      trial_end_date: access.trial_end_date,
      expiresAt: access.expiresAt,
      subscription_type: access.subscription_type,
      planId: access.planId,
      checked_at: access.checked_at,
      plans: [
        { id: 'price_monthly_promo', usd: 5, interval: 'month', renews_at_usd: 25 },
        { id: 'price_monthly', usd: 25, interval: 'month' },
        { id: 'price_6month', usd: 100, interval: 'one_time', access_days: 180, savings_usd: 50 },
      ],
    });
  } catch (error) {
    console.error('Casemate entitlement check failed', error);
    respond(503, {
      error: 'Could not verify access just now. Please try again in a moment — your subscription is not affected.',
      code: 'subscription_check_unavailable',
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

export interface CasemateEntitlement {
  entitled: boolean;
  reason: 'comp' | 'team_account' | 'subscription' | 'subscription_expired' | 'temporary_tester' | 'temporary_tester_expired' | 'founding_member' | 'feedback_grant' | 'standard_trial' | 'trial_ended' | 'default' | 'expired' | '';
  email?: string;
  launch_week: LaunchWeekState;
  founding: FoundingMemberState | null;
  feedback_gate: FeedbackGateState | null;
  daysRemaining?: number | null;
  days_remaining?: number | null;
  trialType?: 'temporary_tester' | 'founding' | 'standard' | 'expired' | 'pro';
  trial_end_date?: string | null;
  expiresAt?: string | null;
  subscription_type?: 'trial' | 'pro' | null;
  planId?: 'price_monthly_promo' | 'price_monthly' | 'price_6month' | null;
  checked_at?: string;
  hadPriorProAccess?: boolean;
  trialEnded?: boolean;
  fallback?: boolean;
}

export type CasemateAccessTier = 'pro' | 'trial' | 'free' | 'trial_ended';

export interface CasemateAccessCache {
  tier: CasemateAccessTier;
  trialEnd: string | null;
  reason?: CasemateEntitlement['reason'];
  cachedAt: number;
}

export const ACCESS_CACHE_KEY = 'casemate-access-cache';
export const ACCESS_CACHE_TTL_MS = 15 * 60 * 1000;
const ACCESS_CACHE_IDENTITY_KEY = `${ACCESS_CACHE_KEY}-session`;

function clearCasemateAccessCache(): void {
  try {
    localStorage.removeItem(ACCESS_CACHE_KEY);
    localStorage.removeItem(ACCESS_CACHE_IDENTITY_KEY);
  } catch {
    /* storage unavailable — keep using network checks */
  }
}

function accessTierForCache(entitlement: CasemateEntitlement): CasemateAccessTier {
  if (entitlement.entitled) {
    return entitlement.trialType === 'pro' || entitlement.subscription_type === 'pro' ? 'pro' : 'trial';
  }
  return entitlement.hadPriorProAccess || entitlement.trialEnded || entitlement.reason === 'trial_ended'
    ? 'trial_ended'
    : 'free';
}

function writeCachedCasemateEntitlement(sessionId: string, entitlement: CasemateEntitlement): void {
  if (!sessionId || entitlement.fallback) return;
  const cache: CasemateAccessCache = {
    tier: accessTierForCache(entitlement),
    trialEnd: entitlement.expiresAt || entitlement.trial_end_date || null,
    reason: entitlement.reason,
    cachedAt: Date.now(),
  };
  try {
    localStorage.setItem(ACCESS_CACHE_KEY, JSON.stringify(cache));
    localStorage.setItem(ACCESS_CACHE_IDENTITY_KEY, sessionId);
  } catch {
    /* storage unavailable — the current request still succeeds */
  }
}

/** Read a fresh cache entry for this exact canonical session. Active timed
 * access is never served beyond its stored expiry, even inside the TTL. */
export function readCachedCasemateEntitlement(sessionId: string): CasemateEntitlement | null {
  if (!sessionId) return null;
  try {
    if (localStorage.getItem(ACCESS_CACHE_IDENTITY_KEY) !== sessionId) return null;
    const raw = localStorage.getItem(ACCESS_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as Partial<CasemateAccessCache>;
    const cachedAt = Number(cache.cachedAt || 0);
    const sessionPermanent = cache.tier === 'pro' && (cache.reason === 'team_account' || cache.reason === 'comp');
    if (!cache.tier || !cachedAt || (!sessionPermanent && Date.now() - cachedAt > ACCESS_CACHE_TTL_MS)) {
      clearCasemateAccessCache();
      return null;
    }
    const trialEnd = typeof cache.trialEnd === 'string' && cache.trialEnd ? cache.trialEnd : null;
    const expiryMs = trialEnd ? Date.parse(trialEnd) : NaN;
    if ((cache.tier === 'trial' || cache.tier === 'pro') && trialEnd && (!Number.isFinite(expiryMs) || Date.now() >= expiryMs)) {
      clearCasemateAccessCache();
      return null;
    }
    const entitled = cache.tier === 'pro' || cache.tier === 'trial';
    const trialEnded = cache.tier === 'trial_ended';
    const remaining = cache.tier === 'trial' && Number.isFinite(expiryMs)
      ? Math.max(0, Math.ceil((expiryMs - Date.now()) / 86400000))
      : entitled ? null : 0;
    return {
      entitled,
      reason: sessionPermanent
        ? (cache.reason === 'comp' ? 'comp' : 'team_account')
        : cache.tier === 'pro'
          ? 'subscription'
          : cache.tier === 'trial'
            ? 'standard_trial'
            : trialEnded ? 'trial_ended' : 'expired',
      launch_week: { configured: false, active: false, upcoming: false, start: null, end: null },
      founding: null,
      feedback_gate: null,
      daysRemaining: remaining,
      days_remaining: remaining,
      trialType: cache.tier === 'pro' ? 'pro' : cache.tier === 'trial' ? 'standard' : 'expired',
      trial_end_date: trialEnd ? trialEnd.slice(0, 10) : null,
      expiresAt: trialEnd,
      subscription_type: cache.tier === 'pro' ? 'pro' : cache.tier === 'trial' ? 'trial' : null,
      checked_at: new Date(cachedAt).toISOString(),
      hadPriorProAccess: trialEnded,
      trialEnded,
    };
  } catch {
    clearCasemateAccessCache();
    return null;
  }
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
 * why (comp allowlist / subscription / launch week / founding month). With claim=true (the
 * default) a signed-in, non-subscribed user automatically claims the next
 * founding-member slot while any of the 65 remain.
 * Returns null when the check itself is unavailable (fail closed — callers
 * show a neutral retry state, never an upgrade screen).
 */
let entitlementRequest: { key: string; promise: Promise<CasemateEntitlement | null> } | null = null;

export async function fetchCasemateEntitlement(
  sessionId: string,
  options: { claim?: boolean; forceRefresh?: boolean } = {},
): Promise<CasemateEntitlement | null> {
  if (!options.forceRefresh) {
    const cached = readCachedCasemateEntitlement(sessionId);
    if (cached) return cached;
  }

  const requestKey = `${sessionId}:${options.claim !== false ? 'claim' : 'read'}`;
  if (entitlementRequest?.key === requestKey) return entitlementRequest.promise;

  // Execute the already-deployed hook directly. Hook management endpoints are
  // deliberately unavailable to customer sessions (401), so making a list or
  // PATCH request here prevented every customer from reaching this execution.
  // A transient execution failure still returns null so callers render the
  // neutral retry state, never an upgrade screen.
  const promise = (async (): Promise<CasemateEntitlement | null> => {
    const retryDelays = [0, 250, 750];
    for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
      if (retryDelays[attempt] > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt]));
      }
      try {
        const response = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/${ACCESS_HOOK_NAME}/execute`, {
          method: 'POST',
          cache: 'no-store',
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
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.error || data.success !== true || data.fallback === true) continue;
        const entitlement: CasemateEntitlement = {
          entitled: !!data.entitled,
          reason: data.reason || '',
          email: data.email,
          launch_week: data.launch_week || { configured: false, active: false, upcoming: false, start: null, end: null },
          founding: data.founding || null,
          feedback_gate: data.feedback_gate || null,
          daysRemaining: data.daysRemaining ?? data.days_remaining ?? null,
          days_remaining: data.days_remaining ?? data.daysRemaining ?? null,
          trialType: data.trialType ?? (data.subscription_type === 'pro' ? 'pro' : data.entitled ? 'standard' : 'expired'),
          trial_end_date: data.trial_end_date ?? null,
          expiresAt: data.expiresAt ?? null,
          subscription_type: data.subscription_type ?? null,
          planId: data.planId ?? null,
          checked_at: data.checked_at,
          hadPriorProAccess: data.hadPriorProAccess === true,
          trialEnded: data.trialEnded === true,
          fallback: data.fallback === true,
        };
        writeCachedCasemateEntitlement(sessionId, entitlement);
        return entitlement;
      } catch {
        /* retry */
      }
    }
    return null;
  })();

  entitlementRequest = { key: requestKey, promise };
  try {
    return await promise;
  } finally {
    if (entitlementRequest?.promise === promise) entitlementRequest = null;
  }
}

/** Warm the shared cache immediately after a verified sign-in. Any Pro app
 * opened while this request is running reuses the same in-flight promise. */
export function prefetchCasemateEntitlement(sessionId: string): Promise<CasemateEntitlement | null> {
  return fetchCasemateEntitlement(sessionId, { claim: false, forceRefresh: true });
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
