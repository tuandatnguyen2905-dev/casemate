import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ClipboardCheck, Save, Shield, XCircle } from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import ExhibitRenderer, { detectDuplicateExhibits } from '../../components/ExhibitRenderer';
import { EXPERT_CASE_DRILL_QUESTIONS, EXPERT_DRILL_TYPES } from '../../lib/expertCaseDrillQuestions';
import { isFounderEmailSession } from '../../lib/founderAccess';
import { validateExpertQuestion } from '../../lib/skillQuestionLibrary';
import type { LibraryQuestion, LibraryReviewStatus } from '../../lib/skillQuestionLibrary';
import { tw } from '../../lib/colors';

const STATUSES: LibraryReviewStatus[] = ['Draft', 'Needs Review', 'Approved', 'Published', 'Archived'];
const STORAGE_PREFIX = 'casemate-expert-review:';

interface ExpertReviewRow {
  id: number;
  question_id: string;
  content_json: LibraryQuestion | string;
  review_status: LibraryReviewStatus;
  validation_passed: boolean;
  updated_at?: string;
}

function loadOverride(question: LibraryQuestion, rows: ExpertReviewRow[] = []): LibraryQuestion {
  const latest = rows.find((row) => row.question_id === question.id);
  if (latest) {
    try {
      const content = typeof latest.content_json === 'string' ? JSON.parse(latest.content_json) : latest.content_json;
      return { ...question, ...content, reviewStatus: latest.review_status };
    } catch { /* Fall back to the device cache. */ }
  }
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${question.id}`);
    return raw ? { ...question, ...JSON.parse(raw) } : question;
  } catch { return question; }
}

function duplicateContentWarnings(question: LibraryQuestion): string[] {
  const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const title = normalise(question.title);
  const prompt = normalise(question.question);
  return EXPERT_CASE_DRILL_QUESTIONS.filter((item) => item.id !== question.id).flatMap((item) => {
    const warnings: string[] = [];
    if (normalise(item.title) === title) warnings.push(`Duplicate title with ${item.id}.`);
    if (normalise(item.question) === prompt) warnings.push(`Duplicate question with ${item.id}.`);
    return warnings;
  });
}

export default function CaseDrillReview() {
  const { spaceId, sessionId } = useSpaceRuntime();
  const { data: reviewRows, refresh: refreshReviews } = window.useWorkspaceDB<ExpertReviewRow>('case_drill_expert_reviews', { orderBy: { column: 'id', direction: 'desc' }, limit: 100 });
  const authorised = isFounderEmailSession(spaceId) || !sessionId;
  const [selectedId, setSelectedId] = useState(EXPERT_CASE_DRILL_QUESTIONS[0].id);
  const source = EXPERT_CASE_DRILL_QUESTIONS.find((item) => item.id === selectedId) || EXPERT_CASE_DRILL_QUESTIONS[0];
  const [question, setQuestion] = useState<LibraryQuestion>(() => loadOverride(source));
  const [editor, setEditor] = useState(() => JSON.stringify(loadOverride(source), null, 2));
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentSource = EXPERT_CASE_DRILL_QUESTIONS.find((item) => item.id === selectedId) || EXPERT_CASE_DRILL_QUESTIONS[0];
    const latest = loadOverride(currentSource, reviewRows || []);
    setQuestion(latest);
    setEditor(JSON.stringify(latest, null, 2));
  }, [reviewRows, selectedId]);

  const validation = useMemo(() => {
    const structural = validateExpertQuestion(question).filter((error) => !error.includes('Must Remain Draft'));
    const duplicateExhibits = detectDuplicateExhibits(question.exhibits || []).map((item) => `Potential duplicate exhibits: ${item.firstId} / ${item.secondId}.`);
    return [...structural, ...duplicateExhibits, ...duplicateContentWarnings(question)];
  }, [question]);

  if (!authorised) {
    return <div className="flex h-full items-center justify-center bg-[var(--space-surface-page)] p-6"><div className="max-w-md rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center"><Shield className="mx-auto h-8 w-8 text-[var(--space-text-brand)]" /><h1 className="mt-3 text-lg font-bold text-[var(--space-text-primary)]">Internal Review Only</h1><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">This content-review workspace is restricted to authorised Casemate reviewers.</p></div></div>;
  }

  const selectQuestion = (id: string) => {
    const nextSource = EXPERT_CASE_DRILL_QUESTIONS.find((item) => item.id === id) || EXPERT_CASE_DRILL_QUESTIONS[0];
    const next = loadOverride(nextSource, reviewRows || []);
    setSelectedId(id); setQuestion(next); setEditor(JSON.stringify(next, null, 2)); setMessage('');
  };

  const applyEditor = () => {
    try {
      const parsed = JSON.parse(editor) as LibraryQuestion;
      if (parsed.id !== source.id || parsed.skill !== source.skill || parsed.difficulty !== 'expert') throw new Error('Question ID, category, and Expert difficulty cannot be changed.');
      setQuestion(parsed); setMessage('Preview updated. Save when the content is ready.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'The question JSON is invalid.'); }
  };

  const save = async () => {
    if (question.reviewStatus === 'Published') {
      const saved = loadOverride(source, reviewRows || []);
      if (saved.reviewStatus !== 'Approved') { setMessage('Only Approved content can be moved to Published. Save it as Approved first.'); return; }
    }
    if (validation.length > 0 && (question.reviewStatus === 'Approved' || question.reviewStatus === 'Published')) { setMessage('Resolve every validation warning before approving or publishing this content status.'); return; }
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.from || !sessionId) throw new Error('A verified reviewer session is required to save shared review state.');
      await db.from('case_drill_expert_reviews').insert({
        question_id: question.id,
        content_json: question,
        review_status: question.reviewStatus || 'Draft',
        validation_passed: validation.length === 0,
        updated_at: new Date().toISOString(),
        session_id: sessionId,
      });
      localStorage.setItem(`${STORAGE_PREFIX}${question.id}`, JSON.stringify(question));
      setEditor(JSON.stringify(question, null, 2));
      refreshReviews();
      setMessage(`${question.reviewStatus} review revision saved. This does not publish the Casemate app to production.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'The review revision could not be saved.'); }
  };

  const setStatus = (reviewStatus: LibraryReviewStatus) => {
    setQuestion((current) => ({ ...current, reviewStatus }));
    setMessage('');
  };

  return (
    <div className="h-full overflow-y-auto bg-[var(--space-surface-page)]">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Internal · Authorised Reviewers</p><h1 className="mt-1 text-2xl font-extrabold text-[var(--space-text-primary)]">Case Drill Expert Review</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">Preview exhibits, edit the complete drill schema, inspect model answers and rubrics, verify calculations, detect duplicates, and control review status. New content remains draft by default.</p></div><div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 text-xs text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-primary)]">Expert taxonomy:</span> 6 types × 5 categories</div></header>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(EXPERT_DRILL_TYPES).map(([skill, types]) => <div key={skill} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3"><p className="text-xs font-bold capitalize text-[var(--space-text-primary)]">{skill.replace('-', ' ')}</p><p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{types.length} Expert drill types defined</p></div>)}</section>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 lg:sticky lg:top-4"><p className="px-2 text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Generated Drafts ({EXPERT_CASE_DRILL_QUESTIONS.length})</p><div className="mt-2 space-y-1">{EXPERT_CASE_DRILL_QUESTIONS.map((item) => { const saved = loadOverride(item, reviewRows || []); return <button key={item.id} type="button" onClick={() => selectQuestion(item.id)} className={`w-full rounded-xl px-3 py-3 text-left ${selectedId === item.id ? 'bg-[var(--space-surface-accent-soft)]' : 'hover:bg-[var(--space-surface-muted)]'}`}><span className="block text-sm font-bold text-[var(--space-text-primary)]">{item.title}</span><span className="mt-1 block text-[11px] text-[var(--space-text-muted)]">{item.skill} · {item.drillType}</span><span className="mt-1 inline-flex rounded-full border border-[var(--space-border-default)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-secondary)]">{saved.reviewStatus}</span></button>; })}</div></aside>

          <main className="min-w-0 space-y-5">
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">{question.id}</p><h2 className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">{question.title}</h2></div><div className="flex items-center gap-2"><select value={question.reviewStatus || 'Draft'} onChange={(event) => setStatus(event.target.value as LibraryReviewStatus)} className={`${tw.input.base} ${tw.input.default} py-2 text-xs`} aria-label="Review status">{STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select><button type="button" onClick={() => void save()} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${tw.button.primary}`}><Save className="h-4 w-4" /> Save</button></div></div>{message ? <p className="mt-3 rounded-lg bg-[var(--space-surface-muted)] px-3 py-2 text-xs font-semibold text-[var(--space-text-secondary)]">{message}</p> : null}</section>

            <section><ExhibitRenderer exhibits={question.exhibits || []} /></section>

            <section className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Question & Model Answer</p><p className="mt-3 text-sm font-bold leading-6 text-[var(--space-text-primary)]">{question.question}</p><pre className="mt-4 whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-4 font-[inherit] text-xs leading-5 text-[var(--space-text-secondary)]">{question.correctAnswer}</pre></div>
              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">100-Point Scoring Rubric</p><div className="mt-3 space-y-2">{question.scoringRubric?.map((item) => <div key={item.criterion} className="rounded-xl bg-[var(--space-surface-muted)] p-3"><div className="flex justify-between gap-3 text-xs font-bold text-[var(--space-text-primary)]"><span>{item.criterion}</span><span>{item.points} pts</span></div><p className="mt-1 text-[11px] leading-5 text-[var(--space-text-secondary)]">{item.description}</p></div>)}</div></div>
            </section>

            <section className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]"><ClipboardCheck className="h-4 w-4" /> Numerical Validation</p><ul className="mt-3 space-y-2">{question.numericalValidation?.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" />{item}</li>)}</ul></div>
              <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]"><AlertTriangle className="h-4 w-4" /> Validation & Duplicate Check</p>{validation.length ? <ul className="mt-3 space-y-2">{validation.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-[var(--space-semantic-warning-700)]"><XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{item}</li>)}</ul> : <p className="mt-3 flex gap-2 text-xs font-semibold text-[var(--space-semantic-success-700)]"><CheckCircle2 className="h-4 w-4" />Schema, exhibits, rubric, and duplicate checks pass.</p>}</div>
            </section>

            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Full Drill Editor</p><p className="mt-1 text-xs text-[var(--space-text-muted)]">Edit question copy, data, exhibits, chart kinds, labels, units, answers, rubric, and review metadata in one validated document.</p></div><button type="button" onClick={applyEditor} className={`rounded-xl px-4 py-2.5 text-sm font-bold ${tw.button.secondary}`}>Apply To Preview</button></div><textarea value={editor} onChange={(event) => setEditor(event.target.value)} rows={28} spellCheck={false} className={`${tw.input.base} ${tw.input.default} mt-4 font-mono text-xs leading-5`} aria-label="Expert drill JSON editor" /></section>
          </main>
        </div>
      </div>
    </div>
  );
}
