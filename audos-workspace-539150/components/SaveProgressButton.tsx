import { AlertTriangle, Check, Loader2, Save } from 'lucide-react';

export type ProgressSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

type SaveProgressButtonProps = {
  status: ProgressSaveStatus;
  onSave: () => void;
};

const BASE = 'pointer-events-auto inline-flex h-9 !min-h-0 items-center gap-2 rounded-full border px-4 text-xs font-extrabold shadow-lg transition-colors disabled:cursor-default';

const TONE: Record<ProgressSaveStatus, string> = {
  idle: 'border-[var(--space-border-strong)] bg-[var(--space-surface-card)] text-[var(--space-text-primary)] hover:bg-[var(--space-surface-muted)]',
  saving: 'border-[var(--space-border-strong)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)]',
  saved: 'border-[var(--space-semantic-success)] bg-[var(--space-semantic-success)] text-white',
  error: 'border-[var(--space-semantic-danger)] bg-[var(--space-semantic-danger)] text-white hover:opacity-90',
};

export default function SaveProgressButton({ status, onSave }: SaveProgressButtonProps) {
  return (
    <div aria-live="polite" className="pointer-events-none sticky top-2 z-40 -mt-6 flex h-0 items-start justify-end">
      <button type="button" data-save-state={status} disabled={status === 'saving'} onClick={onSave} className={`${BASE} ${TONE[status]}`}>
        {status === 'saving' && <><Loader2 className="h-3.5 w-3.5 animate-spin" />Saving…</>}
        {status === 'saved' && <><Check className="h-3.5 w-3.5" strokeWidth={3} />Saved</>}
        {status === 'error' && <><AlertTriangle className="h-3.5 w-3.5" />Save failed — retry</>}
        {status === 'idle' && <><Save className="h-3.5 w-3.5" />Save progress</>}
      </button>
    </div>
  );
}
