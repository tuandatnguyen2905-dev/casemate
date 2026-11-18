import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Trophy, X } from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { trackOutcomeEvent } from '../lib/engagementTracking';

type OutcomeResult = 'pending' | 'rejected_cv' | 'rejected_test' | 'rejected_interview' | 'rejected_final' | 'offer' | 'declined';

const RESULT_OPTIONS: ReadonlyArray<{ value: OutcomeResult; label: string; furthestRound: string | null }> = [
  { value: 'pending', label: 'Still waiting to hear back', furthestRound: null },
  { value: 'rejected_cv', label: 'Not selected after CV screening', furthestRound: 'cv' },
  { value: 'rejected_test', label: 'Not selected after the online test', furthestRound: 'online_test' },
  { value: 'rejected_interview', label: 'Not selected after an interview', furthestRound: 'interview' },
  { value: 'rejected_final', label: 'Not selected in the final round', furthestRound: 'final' },
  { value: 'offer', label: 'I got an offer', furthestRound: 'offer' },
  { value: 'declined', label: 'I got an offer and declined it', furthestRound: 'offer' },
];

const DAY_MS = 86_400_000;
const DUE_AFTER_CLOSE_DAYS = 14;
const SNOOZE_DAYS = 3;
const PENDING_RECHECK_DAYS = 14;
const CHECK_DELAY_MS = 4000;
const STORAGE_PREFIX = 'casemate-outcome-prompt-v1:';

type DuePrompt = { userId: string; programId: string; company: string; program: string; closeAt: number };
type LocalPromptState = { snoozeUntil?: number; skippedCloseAt?: number };

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function readSessionEmail(spaceId: string): string | null {
  try {
    const value = JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
    return typeof value.email === 'string' && value.email.includes('@') ? value.email.toLowerCase().trim() : null;
  } catch {
    return null;
  }
}

function localKey(userId: string, programId: string): string {
  return `${STORAGE_PREFIX}${userId}:${programId}`;
}

function readLocalState(userId: string, programId: string): LocalPromptState {
  try {
    const value = JSON.parse(localStorage.getItem(localKey(userId, programId)) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function writeLocalState(userId: string, programId: string, next: LocalPromptState): void {
  try {
    localStorage.setItem(localKey(userId, programId), JSON.stringify({ ...readLocalState(userId, programId), ...next }));
  } catch {
    // Without storage the prompt simply reappears on the next visit.
  }
}

/**
 * programs.close_date is a yearless "DD/MM" (or a JSON list of them). The
 * cycle the user targeted closes on the first such date on or after the day
 * the target was set.
 */
export function cycleCloseDate(closeDate: unknown, targetSetAt: Date): Date | null {
  let raw = String(closeDate ?? '').trim();
  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      raw = Array.isArray(parsed) && parsed.length ? String(parsed[0]).trim() : '';
    } catch {
      return null;
    }
  }
  const match = raw.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (!match || Number.isNaN(targetSetAt.getTime())) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const start = new Date(targetSetAt.getFullYear(), targetSetAt.getMonth(), targetSetAt.getDate());
  for (const year of [start.getFullYear(), start.getFullYear() + 1]) {
    const candidate = new Date(year, month - 1, day);
    if (candidate.getMonth() !== month - 1 || candidate.getDate() !== day) continue;
    if (candidate.getTime() >= start.getTime()) return candidate;
  }
  return null;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

async function findDuePrompt(email: string): Promise<DuePrompt | null> {
  const db = (window as any).__workspaceDb;
  if (!db?.from) return null;
  const userId = `email:${email}`;

  const roadmap = rowsOf(await db.from('prep_roadmaps', { shared: true })
    .select('id', 'target_program_id', 'target_program', 'target_company', 'created_at')
    .eq('user_key', userId)
    .orderBy('id', 'desc')
    .limit(1)
    .get())[0];
  const programId = String(roadmap?.target_program_id || '').trim();
  if (!programId || programId.startsWith('manual-')) return null;

  const program = rowsOf(await db.from('programs', { shared: true })
    .select('id', 'program_id', 'company', 'program_name', 'close_date')
    .eq('program_id', programId)
    .orderBy('id', 'desc')
    .limit(1)
    .get())[0];
  if (!program) return null;

  const close = cycleCloseDate(program.close_date, new Date(roadmap.created_at || Date.now()));
  if (!close) return null;
  const closeAt = close.getTime();
  const now = Date.now();
  if (now < closeAt + DUE_AFTER_CLOSE_DAYS * DAY_MS) return null;

  const local = readLocalState(userId, programId);
  if (local.skippedCloseAt === closeAt) return null;
  if (local.snoozeUntil && now < local.snoozeUntil) return null;

  const latest = rowsOf(await db.from('application_outcomes', { shared: true })
    .select('id', 'result', 'reported_at')
    .eq('user_id', userId)
    .eq('program_id', programId)
    .orderBy('id', 'desc')
    .limit(1)
    .get())[0];
  const reportedAt = latest ? new Date(latest.reported_at).getTime() : NaN;
  if (Number.isFinite(reportedAt) && reportedAt >= closeAt) {
    if (latest.result !== 'pending') return null;
    if (now - reportedAt < PENDING_RECHECK_DAYS * DAY_MS) return null;
  }

  return {
    userId,
    programId,
    company: String(program.company || roadmap.target_company || '').trim(),
    program: String(program.program_name || roadmap.target_program || '').trim(),
    closeAt,
  };
}

/**
 * Small in-app card that asks for the application result 14 days after the
 * close date of the user's current target program, and appends the answer to
 * application_outcomes (source defaults to self_report).
 */
export default function ApplicationOutcomePrompt() {
  const { sessionId, spaceId, userEmail } = useSpaceRuntime();
  const email = (userEmail || readSessionEmail(spaceId) || '').toLowerCase().trim() || null;
  const [prompt, setPrompt] = useState<DuePrompt | null>(null);
  const [saving, setSaving] = useState<OutcomeResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setPrompt(null);
    setSaved(false);
    if (!sessionId || !email) return undefined;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      findDuePrompt(email)
        .then((due) => {
          if (cancelled || !due) return;
          setPrompt(due);
          trackOutcomeEvent('outcome_prompt_view', {
            programId: due.programId,
            dedupeKey: `${due.programId}:${formatDate(due.closeAt)}`,
            properties: { days_since_close: Math.floor((Date.now() - due.closeAt) / DAY_MS) },
          });
        })
        .catch((caught) => console.warn('[Outcome Prompt] check skipped:', caught));
    }, CHECK_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [sessionId, email]);

  if (!prompt) return null;

  const daysSinceClose = Math.floor((Date.now() - prompt.closeAt) / DAY_MS);

  const dismiss = (reason: 'later' | 'did_not_apply') => {
    writeLocalState(prompt.userId, prompt.programId, reason === 'later'
      ? { snoozeUntil: Date.now() + SNOOZE_DAYS * DAY_MS }
      : { skippedCloseAt: prompt.closeAt });
    trackOutcomeEvent('outcome_prompt_dismissed', {
      programId: prompt.programId,
      dedupeKey: `${prompt.programId}:${reason}`,
      properties: { reason, days_since_close: daysSinceClose },
    });
    setPrompt(null);
  };

  const submit = async (option: (typeof RESULT_OPTIONS)[number]) => {
    const db = (window as any).__workspaceDb;
    if (!db?.from || saving) return;
    setSaving(option.value);
    setError('');
    try {
      const response = await db.from('application_outcomes').insert({
        user_id: prompt.userId,
        program_id: prompt.programId,
        applied_at: null,
        furthest_round: option.furthestRound,
        result: option.value,
        reported_at: new Date().toISOString(),
      });
      if (response && response.error) throw response.error;
      if (option.value === 'pending') {
        writeLocalState(prompt.userId, prompt.programId, { snoozeUntil: Date.now() + PENDING_RECHECK_DAYS * DAY_MS });
      }
      trackOutcomeEvent('outcome_reported', {
        programId: prompt.programId,
        dedupeKey: `${prompt.programId}:${option.value}`,
        properties: { result: option.value, furthest_round: option.furthestRound, days_since_close: daysSinceClose },
      });
      setSaved(true);
      window.setTimeout(() => setPrompt(null), 2500);
    } catch (caught) {
      console.warn('[Outcome Prompt] save failed:', caught);
      setError('Your answer could not be saved. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <aside
      className="fixed inset-x-3 bottom-[calc(80px+env(safe-area-inset-bottom))] z-40 max-h-[70vh] overflow-y-auto rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-[var(--space-text-primary)] shadow-2xl md:inset-x-auto md:bottom-6 md:left-6 md:w-[380px]"
      role="dialog"
      aria-labelledby="application-outcome-title"
      data-testid="application-outcome-prompt"
    >
      {saved ? (
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--space-semantic-success)]" />
          <p className="text-sm font-bold">Thanks — your answer is saved.</p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
              <Trophy className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p id="application-outcome-title" className="text-sm font-extrabold">
                How did your {prompt.company || 'target'} application go?
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                {prompt.program ? `${prompt.program} closed on ${formatDate(prompt.closeAt)}.` : `Applications closed on ${formatDate(prompt.closeAt)}.`} One tap — it helps us improve Casemate for future candidates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dismiss('later')}
              className="rounded-lg p-1.5 text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"
              aria-label="Ask me later"
              data-testid="application-outcome-close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid gap-1.5">
            {RESULT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={!!saving}
                onClick={() => void submit(option)}
                className="flex min-h-10 items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-left text-xs font-bold text-[var(--space-text-primary)] hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)] disabled:opacity-60"
                data-testid={`application-outcome-${option.value}`}
              >
                <span>{option.label}</span>
                {saving === option.value && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />}
              </button>
            ))}
          </div>
          {error && <p className="mt-2 text-xs font-semibold text-[var(--space-semantic-danger)]" role="alert">{error}</p>}
          <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold">
            <button type="button" onClick={() => dismiss('did_not_apply')} className="text-[var(--space-text-muted)] underline-offset-2 hover:underline" data-testid="application-outcome-did-not-apply">
              I didn&apos;t apply
            </button>
            <button type="button" onClick={() => dismiss('later')} className="text-[var(--space-text-muted)] underline-offset-2 hover:underline">
              Ask me later
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
