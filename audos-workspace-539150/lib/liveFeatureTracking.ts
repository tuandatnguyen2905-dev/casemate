type LiveEventRole = 'open' | 'step' | 'activation' | 'core_action' | 'diagnostic' | 'retention';

export interface LiveSourceEvent {
  eventName: string;
  eventRole: LiveEventRole;
  completionKey?: string | null;
}

export interface LiveSourceEventBundle {
  featureName: string;
  appId: string;
  mode: string | null;
  sessionId: string;
  sourceTable: string;
  sourceRecordId: string | number;
  sourceUserKey?: string | null;
  occurredAt: string;
  properties: Record<string, unknown>;
  events: LiveSourceEvent[];
  coreDedup?: { eventName: string; completionKey: string };
}

interface TrackingIdentity {
  userId: string | null;
  sourceUserKey: string | null;
  identityStatus: 'resolved' | 'identity_unresolved';
  excluded: boolean;
}

export interface TrackingFailureInput {
  featureName: string;
  eventName: string;
  sessionId: string | null;
  reason: string;
  statusCode?: number | null;
  eventKey?: string | null;
  phase?: string;
}

const emittedSourceKeys = new Set<string>();
const healthWrittenKeys = new Set<string>();
const healthSuppressedCounts = new Map<string, number>();
let healthWriteInFlight = false;
let healthWriteChain: Promise<void> = Promise.resolve();

const EXCLUDED_EMAILS = new Set([
  'lisa@audos.com',
  'kylo@prehype.com',
  'john.doe@gmail.com',
  'deploytran@gmail.com',
]);

function workspaceDb(): any {
  return (window as any).__workspaceDb;
}

export function workspaceRows(response: any): any[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.rows)) return response.rows;
  if (response?.data && typeof response.data === 'object') return [response.data];
  return [];
}

function objectValue(value: unknown): Record<string, any> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, any>;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
}

export function insertedWorkspaceRowId(response: any): number | null {
  const candidates = [
    response,
    response?.data,
    response?.row,
    Array.isArray(response) ? response[0] : null,
    Array.isArray(response?.data) ? response.data[0] : null,
    Array.isArray(response?.rows) ? response.rows[0] : null,
    Array.isArray(response?.insertedRows) ? response.insertedRows[0] : null,
  ];
  for (const candidate of candidates) {
    const id = Number(candidate?.id);
    if (Number.isFinite(id) && id > 0) return id;
  }
  return null;
}

function isExcludedSession(sessionId: string): boolean {
  const value = sessionId.toLowerCase();
  return value.startsWith('cursor-v03-verify-')
    || value.startsWith('wses_final_e2e_')
    || value.includes('speedtest')
    || value === 'wses_test_v04_check';
}

function identityFromUserKey(rawValue: string | null | undefined): TrackingIdentity {
  const raw = typeof rawValue === 'string' ? rawValue.trim() : '';
  if (raw.toLowerCase().startsWith('email:')) {
    const email = raw.slice('email:'.length).trim().toLowerCase();
    if (!email) return { userId: null, sourceUserKey: raw || null, identityStatus: 'identity_unresolved', excluded: false };
    const userId = `email:${email}`;
    return { userId, sourceUserKey: raw, identityStatus: 'resolved', excluded: EXCLUDED_EMAILS.has(email) };
  }
  if (raw.toLowerCase().startsWith('device:') && raw.slice('device:'.length).trim()) {
    const deviceId = raw.slice('device:'.length).trim();
    const unresolvedDevice = ['unknown', 'anonymous'].includes(deviceId.toLowerCase())
      || deviceId.toLowerCase().startsWith('wses_')
      || deviceId.toLowerCase().startsWith('ephemeral_');
    return unresolvedDevice
      ? { userId: null, sourceUserKey: raw, identityStatus: 'identity_unresolved', excluded: false }
      : { userId: raw, sourceUserKey: raw, identityStatus: 'resolved', excluded: false };
  }
  return { userId: null, sourceUserKey: raw || null, identityStatus: 'identity_unresolved', excluded: false };
}

async function resolveIdentity(input: LiveSourceEventBundle): Promise<TrackingIdentity> {
  if (input.sourceUserKey !== undefined) return identityFromUserKey(input.sourceUserKey);
  try {
    const result = await workspaceDb()
      .from('session_tracking')
      .eq('session_id', input.sessionId)
      .orderBy('created_at', 'desc')
      .limit(1)
      .get();
    const bridged = workspaceRows(result)[0]?.user_id;
    const identity = identityFromUserKey(typeof bridged === 'string' ? bridged : null);
    if (identity.identityStatus === 'resolved') return identity;
  } catch (error) {
    console.warn('[Live Feature Tracking] session identity bridge unavailable:', input.featureName, error);
  }
  return { userId: null, sourceUserKey: null, identityStatus: 'identity_unresolved', excluded: false };
}

function failureReason(error: unknown): string {
  if (error instanceof Error && error.message) return error.message.slice(0, 500);
  const message = (error as any)?.message;
  return typeof message === 'string' && message ? message.slice(0, 500) : 'unknown_feature_events_write_failure';
}

function failureStatus(error: unknown): number | null {
  const candidate = (error as any)?.status ?? (error as any)?.statusCode ?? (error as any)?.response?.status;
  if (candidate === null || candidate === undefined || candidate === '') return null;
  const value = Number(candidate);
  return Number.isFinite(value) ? value : null;
}

function monitoringDateGmt7(): string {
  return new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function logLiveTrackingFailure(input: TrackingFailureInput): void {
  try {
    const date = monitoringDateGmt7();
    const sessionKey = input.sessionId || 'unresolved';
    const baseKey = `${input.featureName}:${input.eventName}:${input.reason}:${sessionKey}`;
    const dailyKey = `${baseKey}:${date}`;
    if (healthWrittenKeys.has(dailyKey)) {
      healthSuppressedCounts.set(baseKey, (healthSuppressedCounts.get(baseKey) || 0) + 1);
      return;
    }
    healthWrittenKeys.add(dailyKey);
    const suppressedCount = healthSuppressedCounts.get(baseKey) || 0;
    healthSuppressedCounts.delete(baseKey);

    healthWriteChain = healthWriteChain.catch(() => undefined).then(async () => {
      if (healthWriteInFlight) return;
      healthWriteInFlight = true;
      try {
        const db = workspaceDb();
        if (!db?.from) return;
        const existing = await db
          .from('tracking_health_log')
          .eq('check_date', date)
          .eq('feature_name', input.featureName)
          .eq('check_type', 'mirror_failure')
          .eq('session_id', input.sessionId)
          .limit(100)
          .get();
        const alreadyPersisted = workspaceRows(existing).some((row) => {
          const detail = objectValue(row?.detail_json);
          return detail.reason === input.reason && detail.event_type === input.eventName;
        });
        if (alreadyPersisted) return;
        await db.from('tracking_health_log').insert({ 
          check_date: date,
          feature_name: input.featureName,
          check_type: 'mirror_failure',
          status: 'error',
          opened_count: 0,
          downstream_count: 0,
          detail_json: {
            reason: input.reason,
            event_type: input.eventName,
            status_code: input.statusCode ?? null,
            phase: input.phase || `${input.featureName}_emit`,
            target_table: 'feature_events',
            event_key: input.eventKey ?? null,
            suppressed_count: suppressedCount,
          },
          observed_at: new Date().toISOString(),
          source_kind: 'monitor',
          session_id: input.sessionId,
        });
      } catch (healthError) {
        console.error('[CASEMATE_TRACKING_HEALTH]', healthError);
      } finally {
        healthWriteInFlight = false;
      }
    });
  } catch (healthError) {
    console.error('[CASEMATE_TRACKING_HEALTH]', healthError);
  }
}

async function hasExistingCore(input: LiveSourceEventBundle): Promise<boolean> {
  if (!input.coreDedup) return false;
  const result = await workspaceDb()
    .from('feature_events', { shared: true })
    .eq('feature_name', input.featureName)
    .eq('event_name', input.coreDedup.eventName)
    .eq('completion_key', input.coreDedup.completionKey)
    .limit(1)
    .get();
  return workspaceRows(result).length > 0;
}

async function hasEventKey(eventKey: string): Promise<boolean> {
  const result = await workspaceDb()
    .from('feature_events', { shared: true })
    .eq('event_key', eventKey)
    .limit(1)
    .get();
  return workspaceRows(result).length > 0;
}

export function emitLiveSourceEventsOnce(input: LiveSourceEventBundle): void {
  const sourceRecordId = String(input.sourceRecordId);
  const oneShotKey = `${input.featureName}:${input.sourceTable}:${sourceRecordId}:${input.coreDedup?.eventName || input.events.map((event) => event.eventName).join(',')}`;
  if (emittedSourceKeys.has(oneShotKey)) return;
  emittedSourceKeys.add(oneShotKey);

  void (async () => {
    const primaryEvent = input.coreDedup?.eventName || input.events[0]?.eventName || 'unknown_event';
    if (!input.sessionId || isExcludedSession(input.sessionId)) return;
    const db = workspaceDb();
    if (!db?.from) {
      console.warn('[Live Feature Tracking] WorkspaceDB is unavailable:', input.featureName, primaryEvent);
      return;
    }

    let occurredAt: string;
    try {
      occurredAt = new Date(input.occurredAt).toISOString();
      if (!Number.isFinite(new Date(occurredAt).getTime())) throw new Error('invalid_source_occurrence_timestamp');
    } catch (error) {
      logLiveTrackingFailure({
        featureName: input.featureName,
        eventName: primaryEvent,
        sessionId: input.sessionId,
        reason: failureReason(error),
        statusCode: failureStatus(error),
        phase: `${input.featureName}_source_validation`,
      });
      return;
    }

    const identity = await resolveIdentity(input);
    if (identity.excluded) return;

    try {
      if (await hasExistingCore(input)) return;
    } catch (error) {
      logLiveTrackingFailure({
        featureName: input.featureName,
        eventName: primaryEvent,
        sessionId: input.sessionId,
        reason: failureReason(error),
        statusCode: failureStatus(error),
        phase: `${input.featureName}_dedup_read`,
      });
      return;
    }

    for (const event of input.events) {
      const eventKey = `live|${input.sourceTable}|${sourceRecordId}|${event.eventName}`;
      try {
        if (await hasEventKey(eventKey)) continue;
        await db.from('feature_events').insert({
          event_key: eventKey,
          schema_version: 1,
          event_name: event.eventName,
          event_role: event.eventRole,
          feature_name: input.featureName,
          app_id: input.appId,
          mode: input.mode,
          user_id: identity.userId,
          identity_status: identity.identityStatus,
          source_user_key: identity.sourceUserKey,
          identity_session_ref: input.sessionId,
          completion_key: event.completionKey ?? null,
          occurred_at: occurredAt,
          properties_json: input.properties,
          source_kind: 'live',
          source_table: input.sourceTable,
          source_record_id: sourceRecordId,
          session_id: input.sessionId,
        });
      } catch (error) {
        console.warn('[Live Feature Tracking] feature_events write failed:', input.featureName, event.eventName, error);
        logLiveTrackingFailure({
          featureName: input.featureName,
          eventName: event.eventName,
          sessionId: input.sessionId,
          reason: failureReason(error),
          statusCode: failureStatus(error),
          eventKey,
        });
        return;
      }
    }
  })();
}
