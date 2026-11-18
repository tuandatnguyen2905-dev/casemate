import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, Check, CheckCircle2, ClipboardCopy, Loader2, PencilLine, RefreshCw, Sparkles, X } from 'lucide-react';

type GuideEntry = { company?: string; organization?: string; role?: string; description?: string };
type GuideProfile = {
  experiences?: GuideEntry[];
  extracurricular_activities?: GuideEntry[];
  skills?: string[];
  certifications?: string[];
  coursework?: string;
  education?: Array<{ coursework?: string; field?: string }>;
};

type CvRewriteGuideProps = {
  programId: string;
  company: string;
  program: string;
  position?: string;
  profile: GuideProfile;
  onEditCv: () => void;
};

type CvRewriteFeedbackPanelProps = {
  programId: string;
  company: string;
  program: string;
  position?: string;
  profile: GuideProfile;
  canSave: boolean;
  saving: boolean;
  onSave: () => void;
  onClose: () => void;
};

type JdRow = { function?: string; department?: string; position?: string; direct_keywords?: string; evidence_keywords?: string };
type Keywords = { direct: string[]; evidence: string[] };
type BulletChecks = { verb: boolean; number: boolean; keyword: boolean };
type ReviewedBullet = { key: string; text: string; checks: BulletChecks; tips: string[]; passed: boolean };
type ReviewedEntry = { key: string; title: string; focusId: string; bullets: ReviewedBullet[]; passed: boolean };
type CvReview = { entries: ReviewedEntry[]; bulletCount: number; passedCount: number; approved: boolean; present: string[]; missing: string[]; signature: string };

const MAX_LINES = 3;
const MAX_SUGGESTIONS = 10;
const NUMBER_PATTERN = /\d/;
const STOP_KEYWORDS = /^(?:english|communication|teamwork|internship|student club|volunteer|case competition|microsoft office|time management|problem solving|ielts|toeic)$/i;
const WEAK_STARTERS = /^(?:responsible for|in charge of|helped|helping|assisted|assisting|participated|participating|involved in|worked on|working on|tasked with|duties included)\b/i;
const REWRITE_PROMPT = [
  'You are a CV coach for Vietnamese university students applying to management-trainee, graduate and internship programs.',
  'Rewrite each CV bullet in English with the formula: strong past-tense action verb + what the candidate did + tool or program keyword + measurable result.',
  'Keep every fact the candidate wrote. Never invent employers, tools, numbers or outcomes.',
  'When a number is missing, insert a placeholder in square brackets for the candidate to fill in, such as [X%], [N people], [VND amount] or [hours saved].',
  'Use a program keyword only when it honestly fits what the candidate did. One sentence, at most 32 words, no first person.',
  'Return JSON only: {"suggestions":[{"id":"<bullet id>","rewrite":"<rewritten bullet>"}]}.',
].join(' ');

function normalize(value: unknown): string {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9+#&]+/g, ' ').trim();
}

function splitKeywords(value: unknown): string[] {
  return String(value || '').split(';').map((item) => item.trim()).filter(Boolean);
}

function dbRows(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

// Competitor and product brand names sit in the JD corpus as industry context;
// they are not something a student should write into their own CV.
function brandNames(programRows: any[]): Set<string> {
  const names = new Set<string>();
  programRows.forEach((row) => {
    const company = normalize(row.company);
    if (company) names.add(company);
    const brands = String(row.product_categories || '').match(/\(([^)]*)\)/g) || [];
    brands.forEach((group) => group.slice(1, -1).split(/[,/]/).forEach((brand) => { const key = normalize(brand); if (key) names.add(key); }));
  });
  return names;
}

function positionMatches(row: JdRow, position: string): boolean {
  const wanted = normalize(position);
  if (!wanted) return false;
  return [row.position, row.function, row.department].some((label) => {
    const key = normalize(label);
    return !!key && (key === wanted || key.includes(wanted) || wanted.includes(key));
  });
}

function lines(description: unknown): string[] {
  return String(description || '').split(/\n+/).map((line) => line.trim()).filter(Boolean);
}

async function loadProgramKeywords(programId: string, position: string): Promise<Keywords> {
  const db = (window as any).__workspaceDb;
  if (!db?.from || !programId) throw new Error('keywords_unavailable');
  const [jdResponse, programResponse] = await Promise.all([
    db.from('fa_role_jd', { shared: true }).eq('program_id', programId).limit(60).get(),
    db.from('programs', { shared: true }).select('company', 'product_categories').limit(500).get().catch(() => []),
  ]);
  const rows = dbRows(jdResponse) as JdRow[];
  const matched = rows.filter((row) => positionMatches(row, position));
  const source = matched.length ? matched : rows;
  const brands = brandNames(dbRows(programResponse));
  const pick = (field: 'direct_keywords' | 'evidence_keywords') => {
    const seen = new Set<string>();
    return source.flatMap((row) => splitKeywords(row[field])).filter((keyword) => {
      const key = normalize(keyword);
      if (!key || seen.has(key) || brands.has(key) || STOP_KEYWORDS.test(keyword)) return false;
      seen.add(key);
      return true;
    });
  };
  return { direct: pick('direct_keywords'), evidence: pick('evidence_keywords') };
}

function profileEntries(profile: GuideProfile) {
  return [
    ...(profile.experiences || []).map((item, index) => ({ key: `experience-${index}`, focusId: `cv-experience-${index}`, title: [item.role, item.company].filter(Boolean).join(' at '), description: item.description || '' })),
    ...(profile.extracurricular_activities || []).map((item, index) => ({ key: `activity-${index}`, focusId: `cv-activity-${index}`, title: [item.role, item.organization].filter(Boolean).join(' at '), description: item.description || '' })),
  ].filter((entry) => entry.title || entry.description);
}

function profileSignature(profile: GuideProfile): string {
  return JSON.stringify(profileEntries(profile).map((entry) => [entry.title, entry.description]));
}

function cvTextOf(profile: GuideProfile): string {
  return ` ${normalize([
    ...(profile.experiences || []).flatMap((item) => [item.role, item.company, item.description]),
    ...(profile.extracurricular_activities || []).flatMap((item) => [item.role, item.organization, item.description]),
    ...(profile.skills || []),
    ...(profile.certifications || []),
    profile.coursework,
    ...(profile.education || []).flatMap((item) => [item.coursework, item.field]),
  ].filter(Boolean).join(' '))} `;
}

function openingWords(line: string): string {
  return line.replace(/^[^A-Za-zÀ-ỹ]+/, '').split(/\s+/).slice(0, 2).join(' ');
}

function startsWithActionVerb(line: string): boolean {
  const text = line.replace(/^[^A-Za-zÀ-ỹ]+/, '');
  if (!text || WEAK_STARTERS.test(text)) return false;
  const first = text.match(/^[A-Za-z]+/)?.[0] || '';
  return !!first && !(first.length > 5 && /ing$/i.test(first));
}

function reviewProfile(profile: GuideProfile, keywords: Keywords | null): CvReview {
  const cvText = cvTextOf(profile);
  const allKeywords = keywords ? [...keywords.direct, ...keywords.evidence] : [];
  const inText = (text: string, keyword: string) => text.includes(` ${normalize(keyword)} `);
  const present = allKeywords.filter((keyword) => inText(cvText, keyword));
  const missing = allKeywords.filter((keyword) => !inText(cvText, keyword));
  let bulletCount = 0;
  let passedCount = 0;
  const entries = profileEntries(profile).map((entry) => {
    const bullets = lines(entry.description).map((text, index) => {
      const lineText = ` ${normalize(text)} `;
      const checks: BulletChecks = {
        verb: startsWithActionVerb(text),
        number: NUMBER_PATTERN.test(text),
        keyword: allKeywords.length === 0 || allKeywords.some((keyword) => inText(lineText, keyword)),
      };
      const tips = [
        checks.verb ? '' : `start with a strong action verb such as Led, Built or Analysed instead of “${openingWords(text)}”`,
        checks.number ? '' : 'add a number (%, people, VND, time saved)',
        checks.keyword ? '' : `use a program keyword such as ${(missing.length ? missing : allKeywords).slice(0, 2).join(' or ')}`,
      ].filter(Boolean);
      const passed = tips.length === 0;
      bulletCount += 1;
      if (passed) passedCount += 1;
      return { key: `${entry.key}-${index}`, text, checks, tips, passed };
    });
    return { key: entry.key, title: entry.title, focusId: entry.focusId, bullets, passed: bullets.length > 0 && bullets.every((bullet) => bullet.passed) };
  });
  return {
    entries,
    bulletCount,
    passedCount,
    approved: entries.length > 0 && entries.every((entry) => entry.passed),
    present: present.slice(0, 12),
    missing: missing.slice(0, 12),
    signature: profileSignature(profile),
  };
}

function parseJsonObject(content: string): any {
  try { return JSON.parse(content); } catch { /* fall through to the first {...} block */ }
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

async function requestRewrites(target: string, keywords: string[], bullets: Array<{ id: string; role: string; text: string; issues: string[] }>): Promise<Record<string, string>> {
  const token = (window as any).__workspaceDb?.token;
  if (!token) throw new Error('workspace_token_unavailable');
  const response = await fetch('/proxy/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': token },
    body: JSON.stringify({
      model: 'gpt-6.1-sol',
      reasoning_effort: 'medium',
      max_completion_tokens: 6000,
      stream: false,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: REWRITE_PROMPT },
        { role: 'user', content: JSON.stringify({ target, program_keywords: keywords, bullets }) },
      ],
    }),
  });
  if (!response.ok) throw new Error(`rewrite_request_failed_${response.status}`);
  const data = await response.json();
  const parsed = parseJsonObject(String(data?.choices?.[0]?.message?.content || ''));
  const rewrites: Record<string, string> = {};
  (Array.isArray(parsed?.suggestions) ? parsed.suggestions : []).forEach((item: any) => {
    const id = String(item?.id || '');
    const rewrite = String(item?.rewrite || '').trim();
    if (id && rewrite) rewrites[id] = rewrite;
  });
  return rewrites;
}

function CheckChip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${ok ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]' : 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'}`}>
      {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}{label}
    </span>
  );
}

/** Results-page card: sends the candidate to CV Confirmation, where the feedback panel sits beside the CV. */
export default function CvRewriteGuide({ company, position = '', onEditCv }: CvRewriteGuideProps) {
  return (
    <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5" data-testid="cv-rewrite-guide">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-extrabold">Tailor your CV to this program</h3>
          <p className="mt-1 text-sm text-[var(--space-text-muted)]">Edit your CV with line-by-line feedback beside it: see which words {company} looks for{position ? ` in ${position}` : ''}, then press Review to check your rewrites.</p>
        </div>
        <button type="button" onClick={onEditCv} className="inline-flex items-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)]" data-testid="button-rewrite-cv"><Sparkles className="h-4 w-4" />Rewrite my CV for this program<ArrowRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

/** Feedback column shown beside CV Confirmation while the candidate rewrites their bullets. */
export function CvRewriteFeedbackPanel({ programId, company, program, position = '', profile, canSave, saving, onSave, onClose }: CvRewriteFeedbackPanelProps) {
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [keywordsLoading, setKeywordsLoading] = useState(true);
  const [keywordsError, setKeywordsError] = useState(false);
  const [review, setReview] = useState<CvReview | null>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [suggesting, setSuggesting] = useState(false);
  const [suggestError, setSuggestError] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const profileRef = useRef(profile);
  profileRef.current = profile;
  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;
  const requestRef = useRef(0);
  const target = position ? `${position} at ${company}` : `${company} — ${program}`;

  const loadKeywords = useCallback(async () => {
    setKeywordsLoading(true);
    setKeywordsError(false);
    try {
      setKeywords(await loadProgramKeywords(programId, position));
    } catch (caught) {
      console.warn('[Fit Assessment] CV rewrite keywords could not be loaded:', caught);
      setKeywordsError(true);
    } finally {
      setKeywordsLoading(false);
    }
  }, [programId, position]);

  useEffect(() => { void loadKeywords(); }, [loadKeywords]);

  const suggestRewrites = useCallback(async (next: CvReview) => {
    const failing = next.entries.flatMap((entry) => entry.bullets.filter((bullet) => !bullet.passed).map((bullet) => ({ entry, bullet })));
    const pending = failing.filter(({ bullet }) => !suggestionsRef.current[normalize(bullet.text)]).slice(0, MAX_SUGGESTIONS);
    if (!pending.length) return;
    const requestId = ++requestRef.current;
    setSuggesting(true);
    setSuggestError(false);
    try {
      const rewrites = await requestRewrites(
        target,
        next.missing.length ? next.missing : next.present,
        pending.map(({ entry, bullet }, index) => ({ id: `b${index}`, role: entry.title, text: bullet.text, issues: bullet.tips })),
      );
      if (requestId !== requestRef.current) return;
      setSuggestions((current) => {
        const merged = { ...current };
        pending.forEach(({ bullet }, index) => { const rewrite = rewrites[`b${index}`]; if (rewrite) merged[normalize(bullet.text)] = rewrite; });
        return merged;
      });
      if (!Object.keys(rewrites).length) setSuggestError(true);
    } catch (caught) {
      console.warn('[Fit Assessment] CV rewrite suggestions could not be generated:', caught);
      if (requestId === requestRef.current) setSuggestError(true);
    } finally {
      if (requestId === requestRef.current) setSuggesting(false);
    }
  }, [target]);

  const runReview = useCallback(() => {
    const next = reviewProfile(profileRef.current, keywords);
    setReview(next);
    setReviewCount((count) => count + 1);
    void suggestRewrites(next);
  }, [keywords, suggestRewrites]);

  // First review runs on its own once the program keywords have settled.
  useEffect(() => {
    if (!keywordsLoading && reviewCount === 0) runReview();
  }, [keywordsLoading, reviewCount, runReview]);

  const editedSinceReview = !!review && review.signature !== profileSignature(profile);

  const focusEntry = (focusId: string) => {
    const field = document.getElementById(focusId);
    if (!field) return;
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => (field as HTMLElement).focus?.({ preventScroll: true }), 350);
  };

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(''), 2000);
    } catch {
      setCopiedKey('');
    }
  };

  const checklist = () => [
    `Rewrite my CV for ${target} (${program}).`,
    review?.missing.length ? `Keywords to add where they are true: ${review.missing.join(', ')}.` : '',
    'Each bullet: action verb + what I did + tool or keyword + measurable result.',
    ...(review?.entries || []).map((entry) => `- ${entry.title || 'Experience'}: ${entry.bullets.slice(0, MAX_LINES).map((bullet) => bullet.text).join(' | ') || 'no description yet'}`),
  ].filter(Boolean).join('\n');

  return (
    <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="cv-rewrite-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">CV feedback</p>
          <h3 className="mt-1 font-extrabold leading-snug">Rewrite for {target}</h3>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">Edit your bullets on the left, then press Review to check them again.</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Hide CV feedback" className="!min-h-0 shrink-0 rounded-lg p-1.5 text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><X className="h-4 w-4" /></button>
      </div>

      {review && (
        <div className={`mt-4 rounded-2xl p-3 ${review.approved ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)]' : 'bg-[var(--space-semantic-warning-50)]'}`} role="status" aria-live="polite" data-testid="cv-review-verdict">
          <p className={`flex items-center gap-2 text-sm font-extrabold ${review.approved ? 'text-[var(--space-semantic-success-700)]' : 'text-[var(--space-semantic-warning-700)]'}`}>
            {review.approved ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
            {review.approved ? 'Approved — your CV follows the formula' : review.entries.length === 0 ? 'Not approved yet — add an experience first' : 'Not approved yet'}
          </p>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
            {review.entries.length === 0
              ? 'Add one internship, project or club role with 2–3 bullets, then press Review.'
              : `${review.passedCount} of ${review.bulletCount} bullets pass${review.approved ? '. Save your CV to update your Target Fit.' : ` — ${review.bulletCount - review.passedCount} still need work.`}`}
          </p>
        </div>
      )}
      {editedSinceReview && <p className="mt-2 text-xs font-semibold text-[var(--space-text-brand)]">You have edited your CV since the last review.</p>}

      <button type="button" onClick={runReview} disabled={keywordsLoading} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-60" data-testid="button-review-cv">
        {keywordsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        {keywordsLoading ? 'Reading the job keywords…' : reviewCount > 0 ? 'Review my CV again' : 'Review my CV'}
      </button>

      {keywordsError && <p className="mt-2 text-xs text-[var(--space-semantic-danger)]">The job keywords for this program could not be loaded, so keywords are not checked. <button type="button" onClick={() => void loadKeywords()} className="!min-h-0 font-bold underline underline-offset-2">Try again</button></p>}

      {review && (review.present.length > 0 || review.missing.length > 0) && (
        <div className="mt-4 space-y-3">
          {review.present.length > 0 && <div><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Already in your CV</p><div className="mt-1.5 flex flex-wrap gap-1.5">{review.present.map((keyword) => <span key={keyword} className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-1 text-xs font-bold text-[var(--space-semantic-success-700)]"><Check className="h-3 w-3" />{keyword}</span>)}</div></div>}
          {review.missing.length > 0 && <div><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Add where it is true for you</p><div className="mt-1.5 flex flex-wrap gap-1.5">{review.missing.map((keyword) => <span key={keyword} className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-xs font-bold text-[var(--space-text-brand)]">{keyword}</span>)}</div></div>}
        </div>
      )}

      <div className="mt-4 rounded-2xl bg-[var(--space-surface-muted)] p-3">
        <p className="text-xs font-extrabold">Each bullet: action verb + what you did + tool or keyword + measurable result</p>
        <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-secondary)]">Example: “Analysed weekly sell-out data in Excel for 30 outlets, cutting stock-outs by 15%.”</p>
      </div>

      {review && review.entries.length > 0 && (
        <ul className="mt-3 space-y-3">
          {review.entries.map((entry) => (
            <li key={entry.key} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 text-sm font-bold leading-5">{entry.title || 'Untitled entry'}</p>
                <button type="button" onClick={() => focusEntry(entry.focusId)} className="!min-h-0 inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-0.5 text-xs font-bold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]"><PencilLine className="h-3 w-3" />Edit</button>
              </div>
              {entry.bullets.length === 0 ? <p className="mt-1 text-xs font-semibold text-[var(--space-semantic-warning-700)]">No description yet — add 2–3 bullets with a result each.</p> : entry.bullets.map((bullet) => {
                const suggestion = suggestions[normalize(bullet.text)];
                return (
                  <div key={bullet.key} className="mt-2 border-t border-[var(--space-border-default)] pt-2 first:border-t-0 first:pt-0">
                    <p className="text-xs leading-5 text-[var(--space-text-secondary)]">“{bullet.text}”</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <CheckChip ok={bullet.checks.verb} label="Action verb" />
                      <CheckChip ok={bullet.checks.number} label="Number" />
                      <CheckChip ok={bullet.checks.keyword} label="Keyword" />
                    </div>
                    {bullet.passed ? <p className="mt-1 text-xs font-semibold text-[var(--space-semantic-success-700)]">Approved — keep it.</p> : (
                      <>
                        <p className="mt-1 text-xs font-semibold text-[var(--space-text-brand)]">Rewrite: {bullet.tips.join('; ')}.</p>
                        {suggestion ? (
                          <div className="mt-1.5 rounded-lg bg-[var(--space-surface-muted)] p-2">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Suggested rewrite</p>
                              <button type="button" onClick={() => void copyText(bullet.key, suggestion)} className="!min-h-0 inline-flex items-center gap-1 text-[11px] font-bold text-[var(--space-text-brand)]">{copiedKey === bullet.key ? <Check className="h-3 w-3" /> : <ClipboardCopy className="h-3 w-3" />}{copiedKey === bullet.key ? 'Copied' : 'Copy'}</button>
                            </div>
                            <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-primary)]">{suggestion}</p>
                            {/\[[^\]]+\]/.test(suggestion) && <p className="mt-0.5 text-[10px] text-[var(--space-text-muted)]">Replace the [brackets] with your real figures.</p>}
                          </div>
                        ) : suggesting ? <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--space-text-muted)]"><Loader2 className="h-3 w-3 animate-spin" />Writing a suggested rewrite…</p> : null}
                      </>
                    )}
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      )}
      {suggestError && !suggesting && <p className="mt-2 text-xs text-[var(--space-text-muted)]">Mate could not write suggested rewrites this time — follow the tips above, or press Review again.</p>}

      <div className="mt-4 flex flex-col gap-2">
        <button type="button" onClick={onSave} disabled={!canSave || saving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-extrabold text-[var(--space-text-brand)] disabled:opacity-45" data-testid="button-save-cv-rewrite">
          {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</> : <>Save CV and update my results<ArrowRight className="h-4 w-4" /></>}
        </button>
        <button type="button" onClick={() => void copyText('checklist', checklist())} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]">{copiedKey === 'checklist' ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}{copiedKey === 'checklist' ? 'Copied' : 'Copy rewrite checklist'}</button>
      </div>
    </div>
  );
}
