// My Roadmap — founder-only manual entry of candidate reviews ("Thêm review
// ứng viên"). Rendered only for the founder account; every write goes through
// the casemate-candidate-reviews-v1 server function, which verifies the
// founder session again, so learners can neither see nor call these actions.

import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { AlertTriangle, Check, CheckCircle2, Loader2, Pencil, RotateCcw, Trash2, X } from 'lucide-react';
import {
  GROUP_LABEL,
  GROUP_ORDER,
  MAX_REVIEW_TAGS,
  REVIEW_FIELD_LIMITS,
  REVIEW_TYPES,
  companiesMatch,
  detectTopicTags,
  reviewTopicTags,
  topicByTag,
  topicsForGroup,
  validateReviewDraft,
} from '../../lib/candidateReviews';
import type { CandidateReview, ProgramRow, RecommendationTopic, ReviewDraft, ReviewDraftErrors } from '../../lib/candidateReviews';
import { deleteCandidateReview, ReviewServiceError, saveCandidateReview } from './recommendationData';

const EMPTY_DRAFT: ReviewDraft = {
  company: '',
  program: '',
  position: '',
  review_type: 'interview',
  review_text: '',
  source_note: '',
  topic_tags: [],
};

const INPUT_CLASS = 'min-h-11 w-full rounded-lg border bg-[var(--space-surface-card)] px-3 text-sm text-[var(--space-text-primary)]';

interface Props {
  sessionId?: string | null;
  reviews: CandidateReview[];
  reviewsState: 'loading' | 'ready' | 'error' | 'missing';
  programs: ProgramRow[];
  onRetry: () => void;
  onClose: () => void;
}

function draftFromReview(review: CandidateReview): ReviewDraft {
  return {
    company: review.company,
    program: review.program,
    position: review.position || '',
    review_type: review.review_type,
    review_text: review.review_text,
    source_note: review.source_note || '',
    topic_tags: [...review.topic_tags],
  };
}

function dateLabel(value?: string | null): string {
  const time = value ? new Date(value).getTime() : NaN;
  if (!Number.isFinite(time)) return '';
  const date = new Date(time);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[10px] font-semibold text-[var(--space-semantic-danger)]" role="alert">{message}</p>;
}

function TagChip({ topic, checked, onChange }: { topic: RecommendationTopic; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label
      className={`inline-flex cursor-pointer select-none items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold focus-within:ring-2 focus-within:ring-[var(--space-brand-primary-200)] ${
        checked
          ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
          : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'
      }`}
    >
      <input type="checkbox" className="sr-only" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {checked && <Check className="h-3 w-3" />}
      {topic.title}
    </label>
  );
}

export default function CandidateReviewAdmin({ sessionId, reviews, reviewsState, programs, onRetry, onClose }: Props) {
  const [draft, setDraft] = useState<ReviewDraft>(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<ReviewDraftErrors>({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (notice?.kind !== 'success') return undefined;
    const timer = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const companies = useMemo(
    () => [...new Set(programs.map((row) => String(row.company || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [programs],
  );
  const programNames = useMemo(() => {
    const rows = draft.company.trim() ? programs.filter((row) => companiesMatch(row.company, draft.company)) : programs;
    return [...new Set(rows.map((row) => String(row.program_name || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }, [programs, draft.company]);
  const detected = useMemo(() => (draft.topic_tags.length === 0 ? detectTopicTags(draft.review_text) : []), [draft.topic_tags.length, draft.review_text]);

  const update = <K extends keyof ReviewDraft>(field: K, value: ReviewDraft[K]) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
  };

  const toggleTag = (tag: string, checked: boolean) => {
    update('topic_tags', checked ? [...new Set([...draft.topic_tags, tag])] : draft.topic_tags.filter((item) => item !== tag));
  };

  const resetForm = () => {
    setDraft(EMPTY_DRAFT);
    setEditingId(null);
    setErrors({});
  };

  const startEdit = (review: CandidateReview) => {
    setDraft(draftFromReview(review));
    setEditingId(review.id);
    setErrors({});
    setNotice(null);
    setConfirmDeleteId(null);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const found = validateReviewDraft(draft);
    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      setNotice({ kind: 'error', text: 'Please fix the highlighted fields.' });
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      await saveCandidateReview(sessionId, draft, editingId);
      setNotice({ kind: 'success', text: editingId ? 'Review updated. Recommendations now use the new version.' : 'Review saved. Matching recommendations are updated.' });
      resetForm();
    } catch (error) {
      const serviceError = error instanceof ReviewServiceError ? error : null;
      if (serviceError?.fields && Object.keys(serviceError.fields).length > 0) setErrors(serviceError.fields as ReviewDraftErrors);
      if (serviceError?.code === 'review_not_found') {
        resetForm();
        onRetry();
      }
      setNotice({ kind: 'error', text: serviceError?.message || 'The review could not be saved just now. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (deletingId) return;
    setDeletingId(id);
    setNotice(null);
    try {
      await deleteCandidateReview(sessionId, id);
      if (editingId === id) resetForm();
      setConfirmDeleteId(null);
      setNotice({ kind: 'success', text: 'Review deleted. It no longer appears as evidence.' });
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof ReviewServiceError ? error.message : 'The review could not be deleted just now. Please try again.' });
      if (error instanceof ReviewServiceError && error.code === 'review_not_found') onRetry();
    } finally {
      setDeletingId(null);
    }
  };

  const domainGroups = useMemo(() => {
    const map = new Map<string, RecommendationTopic[]>();
    topicsForGroup('domain').forEach((topic) => {
      const key = topic.groupLabel || 'Other';
      map.set(key, [...(map.get(key) || []), topic]);
    });
    return [...map.entries()];
  }, []);

  const borderFor = (field: keyof ReviewDraft) => (errors[field] ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-strong)]');
  const storageMissing = reviewsState === 'missing';

  return (
    <div className="mt-4 rounded-xl border border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] p-3 sm:p-4" data-testid="candidate-review-admin">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--space-text-primary)]" lang="vi">Thêm review ứng viên</p>
          <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
            Founder only. Paste a real candidate’s experience word for word — it feeds the recommendations as soon as it is saved.
            Learners see it as a candidate’s account, never as official employer requirements.
          </p>
        </div>
        <button type="button" onClick={onClose} className="inline-flex shrink-0 items-center justify-center rounded-lg text-[var(--space-text-muted)] hover:text-[var(--space-text-primary)]" aria-label="Close review entry">
          <X className="h-4 w-4" />
        </button>
      </div>

      {storageMissing && (
        <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_14%,transparent)] px-3 py-2 text-[11px] font-semibold leading-4 text-[var(--space-semantic-warning-700)]" role="status" data-testid="candidate-review-storage-missing">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Review storage isn’t set up yet: this workspace has reached its database table limit, so reviews can’t be saved.
          Free a table slot and ask Otto to finish the candidate-review setup. The form will work as soon as storage exists.
        </p>
      )}

      {notice && (
        <p
          className={`mt-3 flex items-start gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold ${
            notice.kind === 'success'
              ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]'
              : 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)] text-[var(--space-semantic-danger)]'
          }`}
          role={notice.kind === 'error' ? 'alert' : 'status'}
          data-testid="candidate-review-notice"
        >
          {notice.kind === 'success' ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
          {notice.text}
        </p>
      )}

      <form onSubmit={submit} className="mt-3" noValidate data-testid="candidate-review-form">
        <fieldset disabled={storageMissing} className={`space-y-3 ${storageMissing ? 'opacity-60' : ''}`}>
        {editingId && (
          <p className="text-[11px] font-semibold text-[var(--space-text-brand)]">Editing review #{editingId}</p>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="review-company" className="text-[11px] font-semibold text-[var(--space-text-primary)]">Company <span className="text-[var(--space-semantic-danger)]">*</span></label>
            <input id="review-company" list="review-company-options" value={draft.company} maxLength={REVIEW_FIELD_LIMITS.company} onChange={(event) => update('company', event.target.value)} className={`mt-1 ${INPUT_CLASS} ${borderFor('company')}`} placeholder="e.g. Unilever" data-testid="input-review-company" />
            <datalist id="review-company-options">{companies.map((name) => <option key={name} value={name} />)}</datalist>
            <FieldError message={errors.company} />
          </div>
          <div>
            <label htmlFor="review-program" className="text-[11px] font-semibold text-[var(--space-text-primary)]">Program <span className="text-[var(--space-semantic-danger)]">*</span></label>
            <input id="review-program" list="review-program-options" value={draft.program} maxLength={REVIEW_FIELD_LIMITS.program} onChange={(event) => update('program', event.target.value)} className={`mt-1 ${INPUT_CLASS} ${borderFor('program')}`} placeholder="e.g. Future Leaders' Programme (UFLP)" data-testid="input-review-program" />
            <datalist id="review-program-options">{programNames.map((name) => <option key={name} value={name} />)}</datalist>
            <FieldError message={errors.program} />
          </div>
          <div>
            <label htmlFor="review-position" className="text-[11px] font-semibold text-[var(--space-text-primary)]">Position <span className="font-normal text-[var(--space-text-muted)]">(optional — leave empty if it applies to the whole program)</span></label>
            <input id="review-position" value={draft.position} maxLength={REVIEW_FIELD_LIMITS.position} onChange={(event) => update('position', event.target.value)} className={`mt-1 ${INPUT_CLASS} ${borderFor('position')}`} placeholder="e.g. Marketing" data-testid="input-review-position" />
            <FieldError message={errors.position} />
          </div>
          <div>
            <label htmlFor="review-type" className="text-[11px] font-semibold text-[var(--space-text-primary)]">Review type <span className="text-[var(--space-semantic-danger)]">*</span></label>
            <select id="review-type" value={draft.review_type} onChange={(event) => update('review_type', event.target.value as ReviewDraft['review_type'])} className={`mt-1 ${INPUT_CLASS} ${borderFor('review_type')}`} data-testid="input-review-type">
              {REVIEW_TYPES.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
            </select>
            <FieldError message={errors.review_type} />
          </div>
        </div>

        <div>
          <label htmlFor="review-text" className="text-[11px] font-semibold text-[var(--space-text-primary)]">Review text <span className="text-[var(--space-semantic-danger)]">*</span> <span className="font-normal text-[var(--space-text-muted)]">(paste verbatim)</span></label>
          <textarea id="review-text" value={draft.review_text} maxLength={REVIEW_FIELD_LIMITS.review_text} onChange={(event) => update('review_text', event.target.value)} rows={5} lang="vi" className={`mt-1 w-full rounded-lg border bg-[var(--space-surface-card)] px-3 py-2 text-sm leading-6 text-[var(--space-text-primary)] ${borderFor('review_text')}`} placeholder="Vòng 2 là case interview về…" data-testid="input-review-text" />
          <div className="flex items-start justify-between gap-2">
            <FieldError message={errors.review_text} />
            <span className="ml-auto mt-1 text-[10px] tabular-nums text-[var(--space-text-muted)]">{draft.review_text.length}/{REVIEW_FIELD_LIMITS.review_text}</span>
          </div>
        </div>

        <div>
          <label htmlFor="review-source" className="text-[11px] font-semibold text-[var(--space-text-primary)]">Source / date <span className="font-normal text-[var(--space-text-muted)]">(optional)</span></label>
          <input id="review-source" value={draft.source_note} maxLength={REVIEW_FIELD_LIMITS.source_note} onChange={(event) => update('source_note', event.target.value)} className={`mt-1 ${INPUT_CLASS} ${borderFor('source_note')}`} placeholder="e.g. Facebook group post, 10/2026" data-testid="input-review-source" />
          <FieldError message={errors.source_note} />
        </div>

        <fieldset>
          <legend className="text-[11px] font-semibold text-[var(--space-text-primary)]">
            Topic tags <span className="font-normal text-[var(--space-text-muted)]">(optional, up to {MAX_REVIEW_TAGS} — with none selected, Casemate matches keywords in the review text)</span>
          </legend>
          {draft.topic_tags.length === 0 && draft.review_text.trim() && (
            <div className="mt-1.5 rounded-lg border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-card)] p-2 text-[11px] text-[var(--space-text-secondary)]" data-testid="candidate-review-detected-tags">
              {detected.length > 0 ? (
                <>
                  <span className="font-semibold text-[var(--space-text-primary)]">Keyword matches: </span>
                  {detected.map((tag) => topicByTag(tag)?.title).filter(Boolean).join(', ')}
                  <button type="button" onClick={() => update('topic_tags', detected.slice(0, MAX_REVIEW_TAGS))} className="ml-2 rounded-md px-1 font-semibold text-[var(--space-text-brand)] underline underline-offset-2">
                    Select these
                  </button>
                </>
              ) : (
                'No topic keywords found yet. Select tags below so the review can feed recommendations.'
              )}
            </div>
          )}
          <div className="mt-2 space-y-2.5">
            {GROUP_ORDER.map((group) => (
              <div key={group}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{GROUP_LABEL[group]}</p>
                {group === 'domain' ? (
                  <div className="mt-1 max-h-52 space-y-1.5 overflow-y-auto rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2">
                    {domainGroups.map(([groupLabel, topics]) => (
                      <div key={groupLabel}>
                        <p className="text-[10px] font-semibold text-[var(--space-text-muted)]">{groupLabel}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {topics.map((topic) => <TagChip key={topic.tag} topic={topic} checked={draft.topic_tags.includes(topic.tag)} onChange={(checked) => toggleTag(topic.tag, checked)} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {topicsForGroup(group).map((topic) => <TagChip key={topic.tag} topic={topic} checked={draft.topic_tags.includes(topic.tag)} onChange={(checked) => toggleTag(topic.tag, checked)} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <FieldError message={errors.topic_tags} />
        </fieldset>

        <div className="grid gap-2 sm:flex sm:flex-wrap">
          <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-4 py-2 text-xs font-bold text-[var(--space-text-on-primary)] hover:opacity-90 disabled:opacity-60" data-testid="button-save-candidate-review">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            {saving ? 'Saving…' : editingId ? 'Update review' : 'Save review'}
          </button>
          {(editingId || draft !== EMPTY_DRAFT) && (
            <button type="button" onClick={resetForm} disabled={saving} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-4 py-2 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-card-hover)]">
              <RotateCcw className="h-3.5 w-3.5" />
              {editingId ? 'Cancel editing' : 'Clear form'}
            </button>
          )}
        </div>
        </fieldset>
      </form>

      <div className="mt-5 border-t border-[var(--space-border-default)] pt-3" data-testid="candidate-review-list">
        <p className="text-xs font-bold text-[var(--space-text-primary)]">Saved reviews{reviewsState === 'ready' ? ` (${reviews.length})` : ''}</p>
        {reviewsState === 'loading' ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--space-text-muted)]"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading reviews…</p>
        ) : storageMissing ? (
          <p className="mt-2 text-[11px] text-[var(--space-text-muted)]">No review storage yet, so there is nothing to list.</p>
        ) : reviewsState === 'error' ? (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[var(--space-semantic-danger)]" role="alert">
            Saved reviews could not be loaded.
            <button type="button" onClick={onRetry} className="rounded-md px-1 font-semibold underline underline-offset-2">Retry</button>
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-2 rounded-lg border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-card)] p-3 text-[11px] leading-4 text-[var(--space-text-secondary)]" data-testid="candidate-review-empty">
            No candidate reviews yet. Until you add one, every learner sees general preparation suggestions.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {reviews.map((review) => {
              const { tags, source } = reviewTopicTags(review);
              const typeLabel = REVIEW_TYPES.find((type) => type.id === review.review_type)?.label || 'Other';
              return (
                <li key={review.id} className={`rounded-lg border bg-[var(--space-surface-card)] p-2.5 ${editingId === review.id ? 'border-[var(--space-brand-primary-600)]' : 'border-[var(--space-border-default)]'}`} data-testid={`candidate-review-${review.id}`}>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="min-w-0 break-words text-[11px] font-bold text-[var(--space-text-primary)]">
                      {[review.company, review.program, review.position].filter(Boolean).join(' · ')}
                    </p>
                    <span className="rounded-full bg-[var(--space-surface-muted)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{typeLabel}</span>
                    {dateLabel(review.updated_at || review.created_at) && (
                      <span className="text-[10px] text-[var(--space-text-muted)]">{dateLabel(review.updated_at || review.created_at)}</span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-3 whitespace-pre-line break-words text-[11px] leading-4 text-[var(--space-text-secondary)]" lang="vi">{review.review_text}</p>
                  {review.source_note && <p className="mt-0.5 break-words text-[10px] text-[var(--space-text-muted)]">Source: {review.source_note}</p>}
                  <p className="mt-1 text-[10px] leading-4 text-[var(--space-text-muted)]">
                    <span className="font-semibold">{source === 'manual' ? 'Tags: ' : 'Keyword matches: '}</span>
                    {tags.length > 0 ? tags.map((tag) => topicByTag(tag)?.title).filter(Boolean).join(', ') : 'none — this review does not feed any card yet'}
                  </p>
                  {confirmDeleteId === review.id ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-2 text-[11px] text-[var(--space-text-primary)]">
                      Delete this review? It stops appearing as evidence.
                      <button type="button" onClick={() => void remove(review.id)} disabled={deletingId === review.id} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-semantic-danger)] px-2.5 py-1 text-[11px] font-bold text-white hover:opacity-90 disabled:opacity-60" data-testid={`button-confirm-delete-review-${review.id}`}>
                        {deletingId === review.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                        Delete
                      </button>
                      <button type="button" onClick={() => setConfirmDeleteId(null)} disabled={deletingId === review.id} className="rounded-lg border border-[var(--space-border-strong)] px-2.5 py-1 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      <button type="button" onClick={() => startEdit(review)} className="inline-flex items-center gap-1 rounded-lg px-2 text-[11px] font-semibold text-[var(--space-text-brand)] hover:opacity-80" data-testid={`button-edit-review-${review.id}`}>
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button type="button" onClick={() => setConfirmDeleteId(review.id)} className="inline-flex items-center gap-1 rounded-lg px-2 text-[11px] font-semibold text-[var(--space-text-muted)] hover:text-[var(--space-semantic-danger)]" data-testid={`button-delete-review-${review.id}`}>
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
