// HTTP client for the `casemate-dk-progress-sync-v1` server function. The server decides who the learner
// is from the verified workspace session (X-Session-Id); nothing in the body names an account.

import type { SyncRecord } from './progressModel';
import type { SyncRecordType } from './progressMerge';

export const PROGRESS_SYNC_HOOK = 'casemate-dk-progress-sync-v1';

export type TransportFailure = 'offline' | 'auth' | 'server' | 'invalid';

export class SyncTransportError extends Error {
  constructor(public readonly kind: TransportFailure, public readonly status: number | null) {
    super(kind);
  }
}

export interface PushMutation {
  type: SyncRecordType;
  key: string;
  curriculumId: string;
  payload: Record<string, unknown>;
  eventAt: string;
  idempotencyKey: string;
  baseRevision?: number;
  flags?: string[];
}

export type PushStatus = 'applied' | 'merged' | 'unchanged' | 'duplicate' | 'conflict' | 'rejected' | 'retry';

export interface PushResult {
  key: string;
  status: PushStatus;
  revision?: number;
  /** The server's copy after the write, when it differs from what was sent (or on conflict). */
  record?: SyncRecord;
  reason?: string;
}

export interface SummaryResponse {
  records: SyncRecord[];
  serverTime: string;
}

export interface ProgressTransport {
  summary(options?: { curriculumId?: string }): Promise<SummaryResponse>;
  push(mutations: PushMutation[], options?: { origin?: 'sync' | 'import'; importId?: string; keepalive?: boolean }): Promise<PushResult[]>;
}

export function hookUrl(spaceId: string): string {
  return `/api/hooks/execute/${encodeURIComponent(spaceId)}/${PROGRESS_SYNC_HOOK}`;
}

const isObj = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export function createHttpTransport(options: { spaceId: string; sessionId: string; fetchImpl?: typeof fetch }): ProgressTransport {
  const call = async (body: Record<string, unknown>, keepalive = false) => {
    const fetcher = options.fetchImpl ?? fetch;
    let response: Response;
    try {
      response = await fetcher(hookUrl(options.spaceId), {
        method: 'POST',
        cache: 'no-store',
        keepalive,
        headers: { 'Content-Type': 'application/json', 'X-Session-Id': options.sessionId },
        body: JSON.stringify(body),
      });
    } catch {
      throw new SyncTransportError('offline', null);
    }
    if (response.status === 401 || response.status === 403) throw new SyncTransportError('auth', response.status);
    if (response.status === 400 || response.status === 413 || response.status === 422) throw new SyncTransportError('invalid', response.status);
    if (!response.ok) throw new SyncTransportError('server', response.status);
    const json = await response.json().catch(() => null);
    if (!isObj(json) || json.ok !== true) throw new SyncTransportError('server', response.status);
    return json;
  };
  return {
    async summary(summaryOptions = {}) {
      const json = await call({ action: 'summary', ...(summaryOptions.curriculumId ? { curriculumId: summaryOptions.curriculumId } : {}) });
      return { records: Array.isArray(json.records) ? json.records as SyncRecord[] : [], serverTime: typeof json.serverTime === 'string' ? json.serverTime : '' };
    },
    async push(mutations, pushOptions = {}) {
      const json = await call({
        action: pushOptions.origin === 'import' ? 'import' : 'push',
        mutations,
        ...(pushOptions.importId ? { importId: pushOptions.importId } : {}),
      }, pushOptions.keepalive);
      return Array.isArray(json.results) ? json.results as PushResult[] : [];
    },
  };
}
