// Casemate → Google Sheets feedback auto-sync (v1).
//
// Every Feedback submission (the Feedback app AND the feedback-to-Pro
// gate) is appended as one row to the founder's Google Sheet, in this fixed
// column order:
//
//   User Email | Timestamp | Rating (1–5) | WTP (range text) | Feedback Text
//
// HOW IT WORKS (and why it is NOT a raw Sheets-API service-account call):
// workspace hooks can never READ a secret value — secrets are only
// substituted into outbound requests by the platform secrets proxy — and the
// hook sandbox has no crypto, so signing a Google service-account JWT inside
// a hook is impossible by design. The supported pattern is a tiny Google
// Apps Script Web App pasted INSIDE the founder's Google Sheet (it runs as
// the founder and appends rows), reached through the secrets proxy with two
// workspace secrets:
//
//   GOOGLE_SHEETS_WEBAPP_URL   — the deployed Apps Script /exec URL
//                                (allowed hosts: script.google.com,
//                                 script.googleusercontent.com)
//   GOOGLE_SHEETS_SYNC_TOKEN   — a shared token the Apps Script verifies
//                                (same allowed hosts)
//
// The founder sets both via Otto ("set custom API key …") — see
// FOUNDER_SETUP_STEPS + APPS_SCRIPT_SNIPPET below, which the Feedback app's
// founder view renders verbatim. Until the secrets exist every sync run
// responds configured:false with a loud console error — never a silent fail.
//
// Sync state lives in WorkspaceDB `feedback_sheet_sync` (one 'synced' row per
// pushed feedback row), so a failed push is retried on the next run and a
// backfill ("Sync now" in the founder view, or action=sync with no ids)
// pushes every response that has not reached the sheet yet.
//
// Every client-triggered run requests a FULL pending sync (no row_ids), so a
// single new submission after setup also backfills the pre-setup backlog, and
// the Apps Script snippet dedupes on Timestamp+Email so retries or racing
// runs can never produce duplicate sheet rows. A daily task-scheduler job
// ("Casemate feedback → Google Sheets daily sync") re-runs action=sync as a
// safety net.

export const FEEDBACK_SYNC_HOOK_NAME = 'casemate-feedback-sheets-sync-v1';
export const FEEDBACK_SYNC_RULES_VERSION = 'sheets-sync-v1';
const SYNC_WORKSPACE_ID = 'workspace-539150';

const FEEDBACK_SYNC_HOOK_DESCRIPTION = `Casemate feedback → Google Sheets auto-sync: appends every Feedback submission (feedback_form_responses) to the founder's Google Sheet as [User Email, Timestamp, Rating 1-5, WTP range, Feedback Text] via the workspace secrets proxy (GOOGLE_SHEETS_WEBAPP_URL + GOOGLE_SHEETS_SYNC_TOKEN → the founder's Apps Script web app). Tracks pushed rows in feedback_sheet_sync and retries anything unsynced on each run. Actions: sync (optional row_ids), status, test. (${FEEDBACK_SYNC_RULES_VERSION})`;

const FEEDBACK_SYNC_HOOK_CODE = String.raw`
const body = request.body || {};
const query = request.query || {};
const action = String(body.action || query.action || 'sync');

const MISSING_SECRET_HELP =
  'Google Sheets sync is NOT configured yet. The founder must add two workspace secrets via Otto: ' +
  'GOOGLE_SHEETS_WEBAPP_URL (the Apps Script web-app /exec URL pasted inside the target Google Sheet) and ' +
  'GOOGLE_SHEETS_SYNC_TOKEN (the shared token set inside that script), both with allowed hosts ' +
  'script.google.com and script.googleusercontent.com. Feedback keeps saving to the Casemate database ' +
  'either way and will backfill to the sheet on the first sync after setup.';

// Fixed sheet column order — do not reorder:
// User Email | Timestamp | Rating (1-5) | WTP (range text) | Feedback Text
function sheetRowOf(row) {
  return [
    String(row.email || ''),
    String(row.created_at || ''),
    row.score == null ? '' : String(row.score),
    String(row.price_range || ''),
    String(row.experience || ''),
  ];
}

function parseWebAppBody(raw) {
  if (raw && typeof raw === 'object') return raw;
  try { return JSON.parse(String(raw || '')); } catch (error) { return null; }
}

// One call to the founder's Apps Script web app through the secrets proxy.
// Returns { ok, configured, error, body }.
async function callSheetsWebApp(payload) {
  let result = null;
  try {
    result = await platform.secretsProxy({
      method: 'POST',
      url: '{{secrets.GOOGLE_SHEETS_WEBAPP_URL}}',
      headers: { 'Content-Type': 'application/json' },
      json: Object.assign({ token: '{{secrets.GOOGLE_SHEETS_SYNC_TOKEN}}' }, payload),
    });
  } catch (error) {
    return { ok: false, configured: true, error: 'Secrets proxy call failed: ' + (error && error.message ? error.message : String(error)), body: null };
  }
  if (!result || result.ok !== true) {
    const code = result && result.code ? String(result.code) : 'proxy_error';
    if (code === 'unknown_secret') {
      return { ok: false, configured: false, error: MISSING_SECRET_HELP, body: null };
    }
    if (code === 'host_not_allowed' || code === 'blocked_host') {
      return { ok: false, configured: true, error: 'The Google Sheets secrets exist but their allowed-hosts list is wrong. Ask Otto to allow script.google.com AND script.googleusercontent.com on both GOOGLE_SHEETS_WEBAPP_URL and GOOGLE_SHEETS_SYNC_TOKEN.', body: null };
    }
    return { ok: false, configured: true, error: 'Google Sheets web app call failed (' + code + '): ' + String(result && result.error ? result.error : 'unknown error'), body: null };
  }
  const parsed = parseWebAppBody(result.body);
  if (!parsed || parsed.ok !== true) {
    return { ok: false, configured: true, error: 'The Apps Script web app rejected the request: ' + String(parsed && parsed.error ? parsed.error : 'unexpected response — check the script token matches GOOGLE_SHEETS_SYNC_TOKEN and the deployment allows "Anyone" access.'), body: parsed };
  }
  return { ok: true, configured: true, error: '', body: parsed };
}

async function loadSyncedIds() {
  const log = await db.query('feedback_sheet_sync', {
    where: { source_table: 'feedback_form_responses', status: 'synced' },
    orderBy: [{ column: 'id', direction: 'desc' }],
    limit: 500,
  });
  const ids = new Set();
  let lastSyncedAt = null;
  (log.rows || []).forEach(function (row) {
    const id = parseInt(row.source_row_id, 10);
    if (Number.isFinite(id)) ids.add(id);
    if (!lastSyncedAt && row.synced_at) lastSyncedAt = row.synced_at;
  });
  return { ids: ids, lastSyncedAt: lastSyncedAt };
}

if (action === 'sync') {
  try {
    const requestedIds = Array.isArray(body.row_ids)
      ? body.row_ids.map(function (value) { return parseInt(value, 10); }).filter(function (value) { return Number.isFinite(value); })
      : null;
    const all = await db.query('feedback_form_responses', {
      orderBy: [{ column: 'id', direction: 'asc' }],
      limit: 500,
    });
    const synced = await loadSyncedIds();
    const pending = (all.rows || []).filter(function (row) {
      const id = parseInt(row.id, 10);
      if (!Number.isFinite(id) || synced.ids.has(id)) return false;
      return !requestedIds || requestedIds.indexOf(id) >= 0;
    });
    if (pending.length === 0) {
      respond(200, { success: true, synced: 0, message: 'Nothing to sync — every feedback row is already on the sheet.' });
    } else {
      const push = await callSheetsWebApp({ rows: pending.map(sheetRowOf) });
      if (!push.ok) {
        console.error('[feedback-sheets-sync] ' + push.error);
        respond(200, { success: false, configured: push.configured, error: push.error, pending: pending.length });
      } else {
        const now = new Date().toISOString();
        await db.insert('feedback_sheet_sync', pending.map(function (row) {
          return { source_table: 'feedback_form_responses', source_row_id: parseInt(row.id, 10), status: 'synced', synced_at: now };
        }));
        console.log('[feedback-sheets-sync] appended ' + pending.length + ' row(s) to the Google Sheet');
        respond(200, { success: true, configured: true, synced: pending.length });
      }
    }
  } catch (error) {
    console.error('[feedback-sheets-sync] sync failed', error);
    respond(500, { success: false, error: 'Sync failed: ' + (error && error.message ? error.message : String(error)) });
  }
} else if (action === 'status') {
  try {
    const all = await db.query('feedback_form_responses', { select: ['id'], orderBy: [{ column: 'id', direction: 'asc' }], limit: 500 });
    const synced = await loadSyncedIds();
    const total = (all.rows || []).length;
    let syncedCount = 0;
    (all.rows || []).forEach(function (row) {
      if (synced.ids.has(parseInt(row.id, 10))) syncedCount += 1;
    });
    // Live end-to-end probe: ping the web app (no row is written).
    const probe = await callSheetsWebApp({ ping: true });
    if (!probe.ok && probe.configured === false) console.error('[feedback-sheets-sync] ' + probe.error);
    respond(200, {
      success: true,
      configured: probe.configured,
      connected: probe.ok,
      connection_error: probe.ok ? null : probe.error,
      total_responses: total,
      synced_responses: syncedCount,
      pending_responses: Math.max(0, total - syncedCount),
      last_synced_at: synced.lastSyncedAt,
    });
  } catch (error) {
    console.error('[feedback-sheets-sync] status failed', error);
    respond(500, { success: false, error: 'Status check failed: ' + (error && error.message ? error.message : String(error)) });
  }
} else if (action === 'test') {
  try {
    const push = await callSheetsWebApp({
      rows: [['test@casemate.example', new Date().toISOString(), '5', '100.000 - 200.000', 'Test row from Casemate sync — safe to delete']],
    });
    if (!push.ok) {
      console.error('[feedback-sheets-sync] ' + push.error);
      respond(200, { success: false, configured: push.configured, error: push.error });
    } else {
      respond(200, { success: true, configured: true, message: 'Test row appended — check the sheet.' });
    }
  } catch (error) {
    respond(500, { success: false, error: 'Test failed: ' + (error && error.message ? error.message : String(error)) });
  }
} else {
  respond(400, { error: 'Unknown action. Use action=sync (optional row_ids), action=status, or action=test.' });
}
`;

/* ============================================================================
 * Founder setup material (rendered verbatim in the Feedback app founder view)
 * ==========================================================================*/

export const APPS_SCRIPT_SNIPPET = `var SYNC_TOKEN = 'PASTE-A-LONG-RANDOM-TOKEN-HERE';

function doPost(e) {
  var out = ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!SYNC_TOKEN || body.token !== SYNC_TOKEN) {
      return out.setContent(JSON.stringify({ ok: false, error: 'bad token' }));
    }
    if (body.ping) return out.setContent(JSON.stringify({ ok: true, ping: true }));
    lock.waitLock(20000);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['User Email', 'Timestamp', 'Rating (1-5)', 'WTP (range text)', 'Feedback Text']);
    }
    // Dedupe: a row is identified by Email + Timestamp, so re-pushing the same
    // feedback (retries, backfills) never creates a duplicate sheet row.
    var seen = {};
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues().forEach(function (r) {
        seen[String(r[0]) + '|' + String(r[1])] = true;
      });
    }
    var rows = Array.isArray(body.rows) ? body.rows : [];
    var appended = 0;
    rows.forEach(function (r) {
      var key = String(r[0] || '') + '|' + String(r[1] || '');
      if (seen[key]) return;
      seen[key] = true;
      // Leading apostrophe stores the timestamp as literal text so the dedupe
      // key stays stable (Sheets would otherwise coerce it into a Date cell).
      sheet.appendRow([r[0] || '', "'" + (r[1] || ''), r[2] || '', r[3] || '', r[4] || '']);
      appended += 1;
    });
    return out.setContent(JSON.stringify({ ok: true, appended: appended }));
  } catch (err) {
    return out.setContent(JSON.stringify({ ok: false, error: String(err) }));
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}`;

export const FOUNDER_SETUP_STEPS: string[] = [
  'Open your Google Sheet → Extensions → Apps Script. Delete any starter code and paste the snippet below, then replace PASTE-A-LONG-RANDOM-TOKEN-HERE with your own long random token (keep it secret).',
  'In Apps Script: Deploy → New deployment → type "Web app" → Execute as: Me → Who has access: Anyone → Deploy, then copy the Web app URL (it ends in /exec).',
  'Tell Otto: "Set custom API key GOOGLE_SHEETS_WEBAPP_URL to <the /exec URL> with allowed hosts script.google.com and script.googleusercontent.com."',
  'Tell Otto: "Set custom API key GOOGLE_SHEETS_SYNC_TOKEN to <your token> with allowed hosts script.google.com and script.googleusercontent.com."',
  'Come back here and press "Sync now" — every existing response backfills, and each new submission lands on the sheet automatically within seconds.',
];

/* ============================================================================
 * Client helpers
 * ==========================================================================*/

let ensureSyncHookPromise: Promise<void> | null = null;

/** Idempotent: create or refresh the casemate-feedback-sheets-sync-v1 hook. */
export function ensureFeedbackSheetsSyncHook(): Promise<void> {
  if (ensureSyncHookPromise) return ensureSyncHookPromise;

  ensureSyncHookPromise = (async () => {
    const listResponse = await fetch(`/api/workspaces/${SYNC_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) throw new Error('Sync service unavailable. Please refresh and try again.');
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === FEEDBACK_SYNC_HOOK_NAME);

    if (!existing) {
      const createResponse = await fetch(`/api/workspaces/${SYNC_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: FEEDBACK_SYNC_HOOK_NAME,
          description: FEEDBACK_SYNC_HOOK_DESCRIPTION,
          code: FEEDBACK_SYNC_HOOK_CODE,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Could not activate the Google Sheets sync service.');
      return;
    }

    if (
      existing.description !== FEEDBACK_SYNC_HOOK_DESCRIPTION ||
      existing.code !== FEEDBACK_SYNC_HOOK_CODE ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${SYNC_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: FEEDBACK_SYNC_HOOK_DESCRIPTION,
          code: FEEDBACK_SYNC_HOOK_CODE,
          enabled: true,
        }),
      });
      if (!updateResponse.ok) throw new Error('Could not update the Google Sheets sync service.');
    }
  })().catch((error) => {
    ensureSyncHookPromise = null;
    throw error;
  });

  return ensureSyncHookPromise;
}

export interface FeedbackSyncResult {
  success: boolean;
  configured?: boolean;
  synced?: number;
  pending?: number;
  error?: string;
}

export interface FeedbackSyncStatus {
  success: boolean;
  configured?: boolean;
  connected?: boolean;
  connection_error?: string | null;
  total_responses?: number;
  synced_responses?: number;
  pending_responses?: number;
  last_synced_at?: string | null;
  error?: string;
}

async function executeSyncHook<T>(payload: Record<string, unknown>): Promise<T | null> {
  try {
    await ensureFeedbackSheetsSyncHook();
    const response = await fetch(
      `/api/workspaces/${SYNC_WORKSPACE_ID}/hooks/${FEEDBACK_SYNC_HOOK_NAME}/execute`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json().catch(() => null);
    return (data as T) || null;
  } catch (error) {
    console.warn('[feedback-sheets-sync] client call failed:', error);
    return null;
  }
}

/**
 * Push feedback rows to the founder's Google Sheet. Fire-and-forget from the
 * submit paths (the row is safe in WorkspaceDB regardless). Every run asks the
 * hook to sync EVERYTHING still pending (the ledger prevents duplicates), so
 * one new submission — or one "Sync now" — also backfills any older rows that
 * never reached the sheet (e.g. responses submitted before the founder
 * finished the Google Sheets setup). Logs loudly when the sync is
 * unconfigured. The rowIds parameter is kept for call-site compatibility but
 * intentionally not forwarded: scoping a run to just the new row used to
 * strand older unsynced rows until someone pressed "Sync now".
 */
export async function requestFeedbackSheetSync(rowIds?: number[]): Promise<FeedbackSyncResult | null> {
  void rowIds;
  const result = await executeSyncHook<FeedbackSyncResult>({
    action: 'sync',
  });
  if (result && result.success === false && result.configured === false) {
    console.error('[feedback-sheets-sync] ' + (result.error || 'Google Sheets sync is not configured.'));
  }
  return result;
}

/** Live sync status for the founder view (configured? connected? counts). */
export async function fetchFeedbackSyncStatus(): Promise<FeedbackSyncStatus | null> {
  return executeSyncHook<FeedbackSyncStatus>({ action: 'status' });
}
