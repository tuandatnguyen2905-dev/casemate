// Casemate Feedback — v1.1 (UI in English per the language-switch brief).
//
// The in-app feedback form, based on the founder's Google Form (same questions
// and answer options, now presented in English):
//   1. "How many stars does Casemate deserve?" — 1–5 star scale
//   2. "How has your experience with Casemate been?" * — short answer text
//   3. "How much would you be willing to pay for this product? 🙋‍♀️" —
//      50.000 - 100.000 / 100.000 - 200.000 / 200.000 - 500.000 (VND/month)
//
// Responses land in WorkspaceDB `feedback_form_responses` together with the
// visitor's email (captured at the email gate) and an automatic timestamp.
// Partial submissions are allowed — whatever is answered is stored, and a
// draft is kept in localStorage so tapped answers are never lost.
//
// Founder view: in entrepreneur mode (App Studio) this app shows a
// "Responses" tab with EVERY submission in one place plus a CSV export,
// and a Google Sheets sync card: every submission auto-appends a row
// [User Email | Timestamp | Rating 1–5 | WTP | Feedback Text] to the
// founder's sheet through the casemate-feedback-sheets-sync-v1 hook (see
// lib/feedbackSheetsSync.ts — the card also shows the one-time setup steps
// until the two Google secrets exist).
// The Desktop shell surfaces a one-time, non-blocking prompt to open this
// app after ~20 minutes of cumulative active use (see Desktop.tsx).
import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Download, ExternalLink, Loader2, RefreshCw, Send, Star } from 'lucide-react';
import { tw } from '../../lib/colors';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import {
  APPS_SCRIPT_SNIPPET,
  FOUNDER_SETUP_STEPS,
  FeedbackSyncStatus,
  ensureFeedbackSheetsSyncHook,
  fetchFeedbackSyncStatus,
  requestFeedbackSheetSync,
} from '../../lib/feedbackSheetsSync';

const BANNER_IMAGE_URL =
  'https://storage.googleapis.com/audos-images/generated-images/agent/workspace-539150/img-1784908255750-pt7f97.png';

declare global {
  interface Window {
    __workspaceDb: {
      from: (
        table: string,
        options?: { shared?: boolean },
      ) => {
        insert: (row: Record<string, unknown>) => Promise<unknown>;
      };
    };
    useWorkspaceDB: <T = unknown>(
      table: string,
      options?: {
        filters?: Array<{ column: string; operator: string; value?: unknown }>;
        orderBy?: { column: string; direction: 'asc' | 'desc' };
        limit?: number;
        offset?: number;
        shared?: boolean;
      },
    ) => { data: T[] | null; loading: boolean; error: Error | null; total: number; refresh: () => void };
  }
}

// Answer option VALUES stay exactly as on the founder's form (they are stored
// in the database and synced to Google Sheets) — the UI renders them with an
// English "VND/month" suffix.
const PRICE_OPTIONS = ['50.000 - 100.000', '100.000 - 200.000', '200.000 - 500.000'];

const SUBMITTED_FLAG_KEY = 'casemate-feedback-submitted-v1';
const DRAFT_KEY = 'casemate-feedback-draft-v1';

const INTRO_PARAGRAPHS = [
  'Thank you for using our product — right now it is still an early draft, or what you could call an MVP (Minimum Viable Product), but it can already give you a solid starting direction on the programs that fit your goals and your current profile.',
  'Please send us as much feedback as you can so we can build the best possible experience for everyone!',
  'P/s: We will keep updating the product with features like Case Drill and will release Template Roadmaps you can lean on for your prep. After all, practice makes perfect — stay tuned!',
];

interface FeedbackRow {
  id: number;
  email: string | null;
  score: number | null;
  experience: string | null;
  price_range: string | null;
  session_id: string | null;
  page_path: string | null;
  page_hash: string | null;
  source: string | null;
  created_at: string;
}

function QuestionCard({ children, hasError }: { children: React.ReactNode; hasError?: boolean }) {
  return (
    <div
      className={`rounded-xl border bg-[var(--space-surface-card)] p-5 shadow-[0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_35%,transparent)] ${
        hasError ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'
      }`}
    >
      {children}
    </div>
  );
}

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        selected ? 'border-[var(--space-brand-primary)]' : 'border-[var(--space-border-strong)]'
      }`}
    >
      {selected && <span className="h-2.5 w-2.5 rounded-full bg-[var(--space-brand-primary)]" />}
    </span>
  );
}

// Founder-only card: is the Google Sheets auto-sync wired? Shows live
// configured/connected state, synced counts, a backfill button, and — until
// the two secrets exist — the exact one-time setup steps + Apps Script code.
function SheetsSyncCard() {
  const [status, setStatus] = useState<FeedbackSyncStatus | null>(null);
  const [checking, setChecking] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [notice, setNotice] = useState('');

  const loadStatus = async () => {
    setChecking(true);
    const result = await fetchFeedbackSyncStatus();
    setStatus(result);
    setChecking(false);
  };

  useEffect(() => {
    void loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runSync = async () => {
    setSyncing(true);
    setNotice('');
    const result = await requestFeedbackSheetSync();
    if (result?.success) {
      setNotice(result.synced ? `Pushed ${result.synced} responses to the Google Sheet.` : 'No new responses — the sheet is up to date.');
    } else {
      setNotice(result?.error || 'Sync failed — try again in a moment.');
    }
    setSyncing(false);
    await loadStatus();
  };

  const configured = status?.configured === true;
  const connected = status?.connected === true;

  return (
    <div
      className={`rounded-xl border p-4 ${
        connected
          ? 'border-[var(--space-semantic-success)] bg-[var(--space-surface-card)]'
          : 'border-[var(--space-semantic-warning)] bg-[var(--space-surface-card)]'
      }`}
      data-testid="sheets-sync-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
          {connected ? (
            <CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" />
          ) : (
            <ExternalLink className="h-4 w-4 text-[var(--space-semantic-warning)]" />
          )}
          Google Sheets auto-sync: {checking ? 'checking…' : connected ? 'ON' : configured ? 'connection problem' : 'not set up yet'}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => void loadStatus()}
            disabled={checking}
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:opacity-50"
            data-testid="button-sync-status-refresh"
          >
            {checking ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Refresh
          </button>
          <button
            onClick={() => void runSync()}
            disabled={syncing || checking || !configured}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
            data-testid="button-sync-now"
          >
            {syncing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Sync now
          </button>
        </div>
      </div>

      {status && (
        <p className="mt-2 text-xs text-[var(--space-text-secondary)]">
          {status.synced_responses ?? 0} of {status.total_responses ?? 0} responses on the sheet
          {status.pending_responses ? ` · ${status.pending_responses} waiting` : ''}
          {status.last_synced_at ? ` · last sync ${new Date(status.last_synced_at).toLocaleString()}` : ''}
          {' · '}Every new submission (form + Pro feedback gate) pushes automatically within seconds.
        </p>
      )}
      {notice && <p className="mt-2 text-xs font-medium text-[var(--space-text-brand)]">{notice}</p>}
      {!checking && configured && !connected && status?.connection_error && (
        <p className="mt-2 text-xs leading-5 text-[var(--space-semantic-danger)]">{status.connection_error}</p>
      )}

      {!checking && !configured && (
        <div className="mt-3 space-y-2">
          <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
            Responses are saved safely in Casemate either way — finish this one-time setup and everything
            (including all past responses) lands on your Google Sheet automatically:
          </p>
          <ol className="list-decimal space-y-1.5 pl-4 text-xs leading-5 text-[var(--space-text-secondary)]">
            {FOUNDER_SETUP_STEPS.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <details className="text-xs">
            <summary className="cursor-pointer font-semibold text-[var(--space-text-brand)]">
              Apps Script code to paste (step 1)
            </summary>
            <pre className="mt-1.5 max-h-64 overflow-auto whitespace-pre rounded-lg bg-[var(--space-surface-muted)] p-3 text-[10px] leading-4 text-[var(--space-text-secondary)]">
              {APPS_SCRIPT_SNIPPET}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

// Founder-only view: every response in one place + CSV export.
function FounderResponses() {
  const { data, loading, error, refresh } = window.useWorkspaceDB<FeedbackRow>('feedback_form_responses', {
    shared: true,
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 200,
  });
  const rows = Array.isArray(data) ? data : [];
  const scored = rows.filter((r) => typeof r.score === 'number' && r.score != null);
  const avgScore = scored.length > 0 ? scored.reduce((s, r) => s + (r.score || 0), 0) / scored.length : null;

  const exportCsv = () => {
    const esc = (v: unknown) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const header = ['submitted_at', 'email', 'score_1_5', 'experience', 'price_range_vnd', 'session_id', 'source', 'page_path', 'page_hash'];
    const lines = [header.join(',')].concat(
      rows.map((r) =>
        [r.created_at, r.email, r.score, r.experience, r.price_range, r.session_id, r.source, r.page_path, r.page_hash].map(esc).join(','),
      ),
    );
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `casemate-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <SheetsSyncCard />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-[var(--space-text-primary)]">
            All feedback responses ({rows.length})
          </h2>
          <p className="text-xs text-[var(--space-text-muted)]">
            {avgScore != null ? `Average score: ${avgScore.toFixed(1)} / 5 (${scored.length} rated)` : 'No star ratings yet'}
            {' · '}Founder view — customers never see this tab.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
          >
            Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={rows.length === 0}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-6 text-sm text-[var(--space-text-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading responses…
        </div>
      )}
      {error && (
        <p className="text-sm text-[var(--space-semantic-danger)]">Could not load responses: {error.message}</p>
      )}
      {!loading && rows.length === 0 && (
        <QuestionCard>
          <p className="text-sm text-[var(--space-text-secondary)]">
            No responses yet. Customers see this form as a one-time prompt after ~20 minutes of active use — every
            submission (even a partial one) appears here with the customer's email and timestamp.
          </p>
        </QuestionCard>
      )}
      {rows.map((r) => (
        <QuestionCard key={r.id}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-[var(--space-text-primary)]">{r.email || 'No email captured'}</span>
            <span className="text-xs text-[var(--space-text-muted)]">{new Date(r.created_at).toLocaleString()}</span>
          </div>
          <div className="mt-2 flex items-center gap-0.5" aria-label={r.score != null ? `${r.score} / 5` : 'No rating'}>
            {[1, 2, 3, 4, 5].map((v) => (
              <Star
                key={v}
                className={`h-4 w-4 ${
                  r.score != null && v <= r.score
                    ? 'fill-[var(--space-brand-primary)] text-[var(--space-brand-primary)]'
                    : 'text-[var(--space-border-strong)]'
                }`}
              />
            ))}
            {r.score == null && <span className="ml-1 text-xs text-[var(--space-text-muted)]">no rating</span>}
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">
            {r.experience || <em className="text-[var(--space-text-muted)]">— no written feedback —</em>}
          </p>
          {(r.source || r.page_path || r.page_hash) && (
            <p className="mt-2 text-[11px] text-[var(--space-text-muted)]">
              {r.source === 'floating_widget' ? 'Quick feedback widget' : 'Full feedback form'}
              {r.page_path ? ` · ${r.page_path}${r.page_hash || ''}` : r.page_hash ? ` · ${r.page_hash}` : ''}
            </p>
          )}
          {r.price_range && (
            <p className="mt-2 text-xs font-medium text-[var(--space-text-brand)]">
              Willing to pay: {r.price_range} VND
            </p>
          )}
        </QuestionCard>
      ))}
    </div>
  );
}

export default function FeedbackForm() {
  const { mode, spaceId } = useSpaceRuntime();
  const [tab, setTab] = useState<'form' | 'responses'>('form');

  // Keep the Google Sheets sync hook deployed and current on every app open
  // so submissions (from this form AND the feedback-to-Pro gate) can push to
  // the founder's sheet the moment the secrets exist.
  useEffect(() => {
    void ensureFeedbackSheetsSyncHook().catch(() => {
      /* surfaces on the founder sync card / next sync attempt instead */
    });
  }, []);

  const [score, setScore] = useState(0);
  const [experience, setExperience] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [nothingAnswered, setNothingAnswered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // The visitor's email-gate identifier (same source SpaceRuntime uses for
  // subscription checks) — stored with the response so the founder can follow up.
  const email = useMemo(() => {
    try {
      const stored = localStorage.getItem(`space_session_${spaceId}`);
      if (!stored) return null;
      const session = JSON.parse(stored);
      return (session && session.email) || null;
    } catch {
      return null;
    }
  }, [spaceId]);

  // Never lose captured answers: keep a draft on every change, restore on
  // mount, clear on successful submit.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft && typeof draft === 'object') {
        if (typeof draft.score === 'number') setScore(draft.score);
        if (typeof draft.experience === 'string') setExperience(draft.experience);
        if (typeof draft.priceRange === 'string') setPriceRange(draft.priceRange);
      }
    } catch {
      // Corrupt/unavailable draft — start clean.
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ score, experience, priceRange }));
    } catch {
      // Private mode — draft lasts for this page load only.
    }
  }, [score, experience, priceRange]);

  const clearForm = () => {
    setScore(0);
    setExperience('');
    setPriceRange('');
    setNothingAnswered(false);
    setError('');
  };

  const handleSubmit = async () => {
    // Partial submissions are welcome — but an entirely empty form isn't a
    // submission. At least one answered question is required.
    if (!score && !experience.trim() && !priceRange) {
      setNothingAnswered(true);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res: any = await window.__workspaceDb.from('feedback_form_responses').insert({
        email: email || null,
        score: score || null,
        experience: experience.trim() || null,
        price_range: priceRange || null,
        page_path: `${window.location.pathname}${window.location.search}`,
        page_hash: window.location.hash || null,
        source: 'full_feedback_app',
      });
      // Part A: auto-push this submission to the founder's Google Sheet.
      // Fire-and-forget — the row is already safe in WorkspaceDB, and an
      // unsynced row is picked up by the next sync run anyway.
      const insertedRow = res && ((Array.isArray(res.data) ? res.data[0] : res.data) || res.row || res);
      const insertedId =
        insertedRow && insertedRow.id != null && Number.isFinite(Number(insertedRow.id))
          ? Number(insertedRow.id)
          : null;
      void requestFeedbackSheetSync(insertedId != null ? [insertedId] : undefined);
      setSubmitted(true);
      try {
        localStorage.setItem(SUBMITTED_FLAG_KEY, String(Date.now()));
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Best effort — the row is saved either way.
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? `Could not submit your answers: ${err.message}`
          : 'Could not submit your answers — please try again in a few seconds.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-[var(--space-surface-page)]">
      <div className="mx-auto w-full max-w-2xl space-y-3 p-4 sm:p-6">
        {mode === 'entrepreneur' && (
          <div className="flex gap-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-1">
            {(
              [
                ['form', 'Form (customer view)'],
                ['responses', 'Responses (founder)'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  tab === id
                    ? 'bg-[var(--space-surface-card)] text-[var(--space-text-primary)] shadow-sm'
                    : 'text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {mode === 'entrepreneur' && tab === 'responses' ? (
          <FounderResponses />
        ) : (
          <>
            {/* Banner image */}
            <div className="overflow-hidden rounded-xl border border-[var(--space-border-default)]">
              <img
                src={BANNER_IMAGE_URL}
                alt="Students chatting and sharing their thoughts"
                className="h-40 w-full object-cover sm:h-52"
              />
            </div>

            {/* Header card — Google-Forms style with brand top strip */}
            <div className="overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-[0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_35%,transparent)]">
              <div className="h-2.5 w-full bg-[var(--space-brand-primary)]" />
              <div className="p-5 sm:p-6">
                <h1 className="text-2xl font-bold text-[var(--space-text-primary)] sm:text-3xl">
                  Welcome to Casemate
                </h1>
                <div className="mt-3 space-y-3">
                  {INTRO_PARAGRAPHS.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-6 text-[var(--space-text-secondary)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {!submitted && (
                  <p className="mt-4 border-t border-[var(--space-border-default)] pt-3 text-xs text-[var(--space-semantic-danger)]">
                    * Indicates a required question
                  </p>
                )}
              </div>
            </div>

            {submitted ? (
              <QuestionCard>
                <h2 className="text-base font-semibold text-[var(--space-text-primary)]">
                  Your answers have been recorded. Thank you so much!
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
                  We read every single piece of feedback — each one makes Casemate better for the people who come after you.
                </p>
                <button
                  onClick={() => {
                    clearForm();
                    setSubmitted(false);
                  }}
                  className="mt-4 text-sm font-medium text-[var(--space-text-brand)] underline"
                >
                  Submit another response
                </button>
              </QuestionCard>
            ) : (
              <>
                {/* Q1 — 1–5 star scale (exactly as on the founder's form) */}
                <QuestionCard>
                  <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">
                    How many stars does Casemate deserve?
                  </h2>
                  <div
                    className="mt-4 flex items-end justify-between gap-1 sm:justify-start sm:gap-8"
                    role="radiogroup"
                    aria-label="Rate from 1 to 5 stars"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={score === value}
                        onClick={() => {
                          setScore(value);
                          setNothingAnswered(false);
                        }}
                        className="flex flex-col items-center gap-2 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary)]"
                      >
                        <span className="text-sm text-[var(--space-text-secondary)]">{value}</span>
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            score >= value
                              ? 'fill-[var(--space-brand-primary)] text-[var(--space-brand-primary)]'
                              : 'text-[var(--space-border-strong)] hover:text-[var(--space-brand-primary-500)]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {score > 0 && (
                    <div className="mt-3 flex justify-end border-t border-[var(--space-border-default)] pt-2">
                      <button
                        onClick={() => setScore(0)}
                        className="text-xs font-medium text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]"
                      >
                        Clear selection
                      </button>
                    </div>
                  )}
                </QuestionCard>

                {/* Q2 — required-marked free text (partial submits still allowed) */}
                <QuestionCard>
                  <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">
                    How has your experience with Casemate been?{' '}
                    <span className="text-[var(--space-semantic-danger)]">*</span>
                  </h2>
                  <textarea
                    value={experience}
                    onChange={(event) => {
                      setExperience(event.target.value);
                      if (event.target.value.trim()) setNothingAnswered(false);
                    }}
                    rows={3}
                    maxLength={2000}
                    placeholder="Your answer"
                    className={`${tw.input.base} ${tw.input.default} mt-3 resize-y text-sm leading-6`}
                  />
                </QuestionCard>

                {/* Q3 — willingness to pay (VND), exactly the form's options */}
                <QuestionCard>
                  <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">
                    How much would you be willing to pay for this product? 🙋‍♀️
                  </h2>
                  <div className="mt-3 flex flex-col gap-1" role="radiogroup" aria-label="Willingness to pay (VND)">
                    {PRICE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={priceRange === option}
                        onClick={() => {
                          setPriceRange(option);
                          setNothingAnswered(false);
                        }}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-[var(--space-surface-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary)]"
                      >
                        <RadioCircle selected={priceRange === option} />
                        <span className="text-sm text-[var(--space-text-primary)]">{option} VND/month</span>
                      </button>
                    ))}
                  </div>
                  {priceRange && (
                    <div className="mt-2 flex justify-end border-t border-[var(--space-border-default)] pt-2">
                      <button
                        onClick={() => setPriceRange('')}
                        className="text-xs font-medium text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]"
                      >
                        Clear selection
                      </button>
                    </div>
                  )}
                </QuestionCard>

                {nothingAnswered && (
                  <div className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] px-4 py-3 text-sm text-[var(--space-semantic-danger)]">
                    Please answer at least one question before submitting — every answer counts!
                  </div>
                )}
                {error && (
                  <div className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] px-4 py-3 text-sm text-[var(--space-semantic-danger)]">
                    {error}
                  </div>
                )}

                {/* Footer row — submit left, clear form right */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {submitting ? 'Submitting…' : 'Submit'}
                  </button>
                  <button
                    onClick={clearForm}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)]"
                  >
                    Clear all answers
                  </button>
                </div>
                <p className="pb-3 text-center text-[11px] leading-5 text-[var(--space-text-muted)]">
                  {email ? `Submitted with your sign-in email (${email}) so we can follow up. ` : ''}
                  Your feedback is only used to improve Casemate — never shared with anyone else.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
