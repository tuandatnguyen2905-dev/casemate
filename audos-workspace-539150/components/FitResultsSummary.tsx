import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';

type FitAnalysis = Record<string, any> | null;

type Props = {
  company: string;
  program: string;
  targetFunction?: string;
  recruitmentCycle?: string;
  analysis: FitAnalysis;
  rolePaths?: string[];
  showDetails?: boolean;
};

function ScoreCard({ label, value }: { label: string; value: unknown }) {
  const available = Number.isFinite(Number(value));
  return <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-lg font-extrabold text-[var(--space-text-primary)]">{available ? `${Math.round(Number(value))}%` : 'Not available'}</p></div>;
}

function asList(value: unknown): any[] {
  return Array.isArray(value) ? value : [];
}

function cleanText(value: unknown): string {
  return String(value || '')
    .replace(/\s*\[[^\]]+\]/g, '')
    .replace(/\b(?:fa_[a-z_]+|questionnaire|cv):[^\s|]+/gi, '')
    .replace(/\s*\|\s*/g, '; ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;])/g, '$1')
    .trim();
}

function itemLabel(item: any): string {
  if (!item || typeof item !== 'object') return '';
  return cleanText(item.label_en || item.label_vi || item.label || item.dimension || item.category || item.id);
}

function itemSummary(item: any): string {
  if (typeof item === 'string') return cleanText(item);
  if (!item || typeof item !== 'object') return '';
  return cleanText(item.summary || item.evidence || item.reason || item.gap || item.description || item.message || item.label_en || item.label_vi || item.id);
}

function itemNextMove(item: any): string {
  if (!item || typeof item !== 'object') return '';
  return cleanText(item.improvement_tip || item.recommendedAction || item.recommended_action || item.action || item.next_step);
}

function DetailList({ items, kind, empty }: { items: any[]; kind: 'strength' | 'gap'; empty: string }) {
  if (!items.length) return <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">{empty}</p>;
  return <ul className="mt-3 space-y-3">{items.slice(0, 6).map((item, index) => {
    const label = itemLabel(item);
    const summary = itemSummary(item);
    const next = itemNextMove(item);
    const Icon = kind === 'strength' ? CheckCircle2 : AlertTriangle;
    return <li key={item?.id || `${kind}-${index}`} className="flex gap-2 text-sm leading-6"><Icon className={`mt-1 h-4 w-4 shrink-0 ${kind === 'strength' ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-semantic-warning)]'}`} /><span>{label && <><b>{label}</b>{summary && summary !== label ? ' — ' : ''}</>}{summary && summary !== label ? summary : !label ? summary : ''}{kind === 'gap' && next && <span className="text-[var(--space-text-secondary)]"> {next}</span>}</span></li>;
  })}</ul>;
}

export default function FitResultsSummary({ company, program, targetFunction = '', recruitmentCycle = '', analysis, rolePaths = [], showDetails = false }: Props) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const enginePaths = analysis?.recommended_subroles?.subroles;
  const paths = Array.isArray(enginePaths) && enginePaths.length ? enginePaths : rolePaths;
  const criteria = asList(analysis?.criteria);
  const strengths = criteria.filter((item) => item?.status === 'met');
  const gaps = criteria.filter((item) => item?.status === 'not_met' || item?.status === 'partial');
  const displayedStrengths = strengths.length ? strengths : asList(analysis?.strengths);
  const displayedGaps = gaps.length ? gaps : [...asList(analysis?.gaps), ...asList(analysis?.missing_evidence)];
  const concerns = asList(analysis?.potential_concerns);
  const actions = asList(analysis?.preparation_actions).length
    ? asList(analysis?.preparation_actions)
    : asList(analysis?.roadmap_actions).length
      ? asList(analysis?.roadmap_actions)
      : asList(analysis?.recommended_next_steps);

  return (
    <>
      <div className="rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Target Fit</p><h2 className="mt-1 text-2xl font-extrabold">{company} · {program}</h2>{(targetFunction || recruitmentCycle) && <p className="mt-2 text-sm opacity-90">{targetFunction}{targetFunction && recruitmentCycle ? ' · ' : ''}{recruitmentCycle}</p>}</div>
      <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">Mate’s view of your fit</h3><p className="mt-1 text-sm leading-6 text-[var(--space-text-muted)]">Mate connected your confirmed experiences, achievements, motivation, and working style to {program}. Here is what already stands out and what you can strengthen next.</p></div>
      {paths.length > 0 && <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-5"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Your best-fit role paths</p><h3 className="mt-1 text-lg font-extrabold">Your profile suggests you’d thrive in: {paths.join(' or ')}</h3><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Use these paths as a role-exploration guide, not a hard limit.</p></div>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><ScoreCard label="Overall Target Fit" value={analysis?.matching_ratio ?? analysis?.overallFit} /><ScoreCard label="Profile & Experience Fit" value={analysis?.cv_profile_fit_score ?? analysis?.profileExperienceFit} /><ScoreCard label="Function Fit" value={analysis?.function_fit_score ?? analysis?.functionFit} /><ScoreCard label="Motivation Fit" value={analysis?.motivation_fit_score ?? analysis?.motivationFit} /><ScoreCard label="Work Style Fit" value={analysis?.work_style_fit_score ?? analysis?.culture_fit_percent ?? analysis?.workStyleFit} />{analysis?.data_confidence && <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Data confidence</p><p className="mt-1 font-extrabold text-[var(--space-text-primary)]">{cleanText(analysis.data_confidence)}</p></div>}</div>

      {showDetails && <>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">What you already showcase</h3><DetailList items={displayedStrengths} kind="strength" empty="Mate has a starting picture of your profile, but needs more specific examples before calling out a standout strength." /></div>
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">Where you can become stronger</h3><DetailList items={displayedGaps} kind="gap" empty="Mate did not identify a major evidence gap for this target. Keep your examples current and measurable." /></div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">What Mate wants you to watch</h3>{concerns.length ? <ul className="mt-3 space-y-2 text-sm leading-6">{concerns.slice(0, 6).map((item, index) => <li key={index}>• {itemSummary(item)}</li>)}</ul> : <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">Mate did not identify an additional concern beyond the growth areas above.</p>}</div>
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">What Mate recommends next</h3>{actions.length ? <ul className="mt-3 space-y-3">{actions.slice(0, 8).map((item, index) => <li key={item?.id || index} className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-sm"><b>{cleanText(item?.priority || 'Priority')} · {cleanText(item?.casemate_function || item?.casemateFunction || item?.category || 'Preparation')}</b><span className="mt-1 block leading-6 text-[var(--space-text-secondary)]">Mate recommends: {itemSummary(item)}</span></li>)}</ul> : <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">Mate has no additional priority beyond keeping your evidence specific and measurable.</p>}</div>
        </div>
        <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-extrabold">Review My Fit</h3><p className="mt-1 text-sm text-[var(--space-text-muted)]">Optional detailed breakdown — it does not block roadmap generation.</p></div><button type="button" disabled={!criteria.length} onClick={() => setShowBreakdown((current) => !current)} className="inline-flex items-center gap-1 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold disabled:opacity-40">{showBreakdown ? 'Hide breakdown' : 'Review My Fit'} <ChevronDown className={`h-4 w-4 ${showBreakdown ? 'rotate-180' : ''}`} /></button></div>
          {showBreakdown && <div className="mt-4 space-y-3">{criteria.map((criterion, index) => { const met = criterion?.status === 'met'; const label = itemLabel(criterion) || `Fit area ${index + 1}`; const summary = itemSummary(criterion); const next = itemNextMove(criterion); return <article key={criterion?.id || index} className="rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><h4 className="font-extrabold">{label}</h4><p className="mt-1 text-xs text-[var(--space-text-muted)]">Current score: {Number.isFinite(Number(criterion?.score)) ? `${Math.round(Number(criterion.score))}%` : 'Not available'}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${met ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning)]'}`}>{met ? 'Strong evidence' : 'Opportunity to strengthen'}</span></div>{summary && <p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]"><b>What Mate noticed:</b> {summary}</p>}{next && <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]"><b>Your next move:</b> {next}</p>}</article>; })}</div>}
        </div>
      </>}
    </>
  );
}
