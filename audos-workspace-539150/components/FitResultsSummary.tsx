import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, ListChecks, Sparkles } from 'lucide-react';
import { roadmapsForSubroles } from '../lib/careerRoleLadders';
import { buildWatchListLines, compactFitEvidence, expandRecommendationAlternatives, humanizeCriterionLabel, isMbtiCriterion, isMotivationCriterion, isResearchCriterion, resolveMotivationFitScore, sentenceCase, stripMatePrefix } from '../lib/fitResultsPresentation';

export type FitCriterionRow = { id?: string; label: string; summary: string; next?: string };
export type FitActionRow = { id?: string; priority?: string; category?: string; text: string };
export type SubrolePack = { function: string; subroles: string[] };

type FitAnalysis = Record<string, any> | null;

type Props = {
  company: string;
  program: string;
  targetFunction?: string;
  recruitmentCycle?: string;
  analysis: FitAnalysis;
  rolePaths?: string[];
  subrolePack?: SubrolePack | null;
  strengthRows?: FitCriterionRow[];
  gapRows?: FitCriterionRow[];
  concernLines?: string[];
  actionRows?: FitActionRow[];
  showDetails?: boolean;
  showCriteriaBreakdown?: boolean;
  rolePathsKind?: 'program_positions' | 'function_subroles';
  workStyleLabel?: string;
};

function ScoreCard({ label, value }: { label: string; value: unknown }) {
  const available = value != null && value !== '' && Number.isFinite(Number(value));
  return (
    <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-[var(--space-text-primary)]">{available ? `${Math.round(Number(value))}%` : 'Not available'}</p>
    </div>
  );
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
  return humanizeCriterionLabel(cleanText(item.label_en || item.label_vi || item.label || item.dimension || item.category || item.id));
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

type SoftSkillDriver = {
  skill_id: string;
  skill: string;
  company_criterion?: string;
  level: number;
  min_threshold: number | null;
  weight_share: number;
  penalty: number;
  status: 'below_minimum' | 'strength' | 'meets_minimum';
};

const SOFT_SKILL_STATUS: Record<SoftSkillDriver['status'], { label: string; className: string }> = {
  strength: { label: 'Strength', className: 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' },
  meets_minimum: { label: 'Meets the bar', className: 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' },
  below_minimum: { label: 'Below minimum', className: 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning)]' },
};

function formatLevel(value: unknown): string {
  const number = Number(value);
  return Number.isFinite(number) ? String(Math.round(number * 10) / 10) : '–';
}

function SoftSkillFitPanel({ fit, company }: { fit: Record<string, any>; company: string }) {
  const drivers = asList(fit.drivers) as SoftSkillDriver[];
  if (!drivers.length) return null;
  const softShare = Math.round(Number(fit.soft_weight) * 100);
  const hasCulture = fit.culture_fit_percent != null && Number.isFinite(Number(fit.culture_fit_percent));
  const unmeasured = asList(fit.unmeasured).map(String).filter(Boolean);
  const formula = hasCulture
    ? `Corporate Fit ${Math.round(Number(fit.corporate_fit_percent))}% = ${softShare}% soft-skill fit (${Math.round(Number(fit.percent))}%) + ${100 - softShare}% culture match (${Math.round(Number(fit.culture_fit_percent))}%).`
    : `Corporate Fit ${Math.round(Number(fit.corporate_fit_percent))}% comes from your soft-skill fit, because ${company} has no verified culture profile yet.`;
  return (
    <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Soft skills behind your Corporate Fit</p>
          <h3 className="mt-1 text-lg font-extrabold">How your scenario answers match what {company} looks for</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{formula}</p>
        </div>
        {fit.tier && <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--space-text-brand)]">{cleanText(fit.tier)}</span>}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {drivers.map((driver) => {
          const status = SOFT_SKILL_STATUS[driver.status] || SOFT_SKILL_STATUS.meets_minimum;
          const level = Math.max(0, Math.min(5, Number(driver.level) || 0));
          const minimum = driver.min_threshold == null ? null : Math.max(0, Math.min(5, Number(driver.min_threshold)));
          return (
            <li key={driver.skill_id} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-[var(--space-text-primary)]">{driver.skill}</p>
                  {driver.company_criterion && <p className="mt-0.5 text-xs text-[var(--space-text-muted)]">{company}: {cleanText(driver.company_criterion)}</p>}
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${status.className}`}>{status.label}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="relative h-2 flex-1 rounded-full bg-[var(--space-surface-card)]" aria-hidden="true">
                  <div className={`h-2 rounded-full ${driver.status === 'below_minimum' ? 'bg-[var(--space-semantic-warning)]' : 'bg-[var(--space-brand-primary)]'}`} style={{ width: `${(level / 5) * 100}%` }} />
                  {minimum != null && <div className="absolute -top-1 h-4 w-0.5 rounded bg-[var(--space-text-primary)]" style={{ left: `calc(${(minimum / 5) * 100}% - 1px)` }} />}
                </div>
                <span className="text-xs font-bold text-[var(--space-text-primary)]">{formatLevel(level)}/5</span>
              </div>
              <p className="mt-1.5 text-xs text-[var(--space-text-muted)]">
                {minimum != null ? `Minimum ${formatLevel(minimum)}/5 · ` : ''}{Math.round(Number(driver.weight_share) * 100)}% of the soft-skill score{Number(driver.penalty) > 0 ? ` · −${formatLevel(driver.penalty)} penalty` : ''}
              </p>
            </li>
          );
        })}
      </ul>
      {unmeasured.length > 0 && <p className="mt-3 text-xs text-[var(--space-text-muted)]">Not measured by the scenarios, so not scored: {unmeasured.join(', ')}.</p>}
      {fit.integrity_red_flag && <p className="mt-3 flex gap-2 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-3 text-sm leading-6 text-[var(--space-text-secondary)]"><AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" />Your answers to the integrity scenarios fell below the level every company expects. Review how you would handle those situations before interviews.</p>}
    </div>
  );
}

function CriterionCards({ rows, kind, empty }: { rows: FitCriterionRow[]; kind: 'strength' | 'gap'; empty: string }) {
  if (!rows.length) return <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">{empty}</p>;
  const Icon = kind === 'strength' ? CheckCircle2 : AlertTriangle;
  return (
    <ul className="mt-3 space-y-2">
      {rows.slice(0, 8).map((row, index) => (
        <li key={row.id || `${kind}-${index}`} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
          <div className="flex gap-2">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${kind === 'strength' ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-semantic-warning)]'}`} />
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-[var(--space-text-primary)]">{row.label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{row.summary}</p>
              {kind === 'gap' && row.next && <p className="mt-1 text-xs font-semibold text-[var(--space-text-brand)]">Next: {row.next}</p>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function FitResultsSummary({
  company,
  program,
  targetFunction = '',
  recruitmentCycle = '',
  analysis,
  rolePaths = [],
  subrolePack,
  strengthRows,
  gapRows,
  concernLines,
  actionRows,
  showDetails = true,
  showCriteriaBreakdown = true,
  rolePathsKind = 'function_subroles',
  workStyleLabel = 'Work Style Fit',
}: Props) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const enginePaths = analysis?.recommended_subroles?.subroles;
  const paths = Array.isArray(enginePaths) && enginePaths.length ? enginePaths : rolePaths;
  const functionLabel = subrolePack?.function || targetFunction || 'your target function';
  const visiblePaths = paths.slice(0, 4);
  const roadmaps = useMemo(
    () => rolePathsKind === 'program_positions' ? [] : roadmapsForSubroles(visiblePaths),
    [rolePathsKind, visiblePaths.join('|')],
  );

  const criteria = asList(analysis?.criteria).filter((item) => !isMbtiCriterion(item) && !isResearchCriterion(item));
  const strengths = criteria.filter((item) => item?.status === 'met');
  const gaps = criteria.filter((item) => item?.status === 'not_met' || item?.status === 'partial');

  const fallbackStrengthRows: FitCriterionRow[] = (strengths.length ? strengths : asList(analysis?.strengths).filter((item) => !isResearchCriterion(item))).map((item, index) => ({
    id: item?.id || `s-${index}`,
    label: itemLabel(item) || 'Strength',
    summary: compactFitEvidence(stripMatePrefix(itemSummary(item))),
  }));
  const fallbackGapRows: FitCriterionRow[] = (gaps.length ? gaps : [...asList(analysis?.gaps), ...asList(analysis?.missing_evidence)].filter((item) => !isResearchCriterion(item))).map((item, index) => ({
    id: item?.id || `g-${index}`,
    label: itemLabel(item) || 'Growth area',
    summary: compactFitEvidence(stripMatePrefix(itemSummary(item))),
    next: isMotivationCriterion(item) ? '' : stripMatePrefix(itemNextMove(item)),
  }));

  const displayedStrengths = strengthRows?.length ? strengthRows : fallbackStrengthRows;
  const displayedGaps = gapRows?.length ? gapRows : fallbackGapRows;

  const concerns = concernLines?.length
    ? concernLines
    : buildWatchListLines({
        engineConcerns: asList(analysis?.potential_concerns),
        gapRows: displayedGaps,
      });

  const rawActions = asList(analysis?.preparation_actions).length
    ? asList(analysis?.preparation_actions)
    : asList(analysis?.roadmap_actions).length
      ? asList(analysis?.roadmap_actions)
      : asList(analysis?.recommended_next_steps);

  const expandedActions = actionRows?.length
    ? rawActions
    : expandRecommendationAlternatives(rawActions, {
        gapRows: displayedGaps,
        targetFunction: targetFunction || subrolePack?.function || '',
        limit: 12,
      });

  const fallbackActions: FitActionRow[] = expandedActions.map((item, index) => {
    if (typeof item === 'string') return { id: `a-${index}`, priority: 'Suggested', category: 'Preparation', text: stripMatePrefix(item) };
    return {
      id: String(item?.id || `a-${index}`),
      priority: cleanText(item?.priority || 'Suggested'),
      category: cleanText(item?.casemate_function || item?.casemateFunction || item?.category || 'Preparation'),
      text: compactFitEvidence(stripMatePrefix(item?.action || item?.recommendedAction || item?.gap || itemSummary(item)), 200),
    };
  });
  const displayedActions = actionRows?.length ? actionRows : fallbackActions;

  const priorityRank = (value: string) => {
    const v = value.toLowerCase();
    if (v.includes('high')) return 0;
    if (v.includes('medium')) return 1;
    return 2;
  };
  const sortedActions = [...displayedActions].sort((a, b) => priorityRank(a.priority || '') - priorityRank(b.priority || ''));
  const motivationFitScore = resolveMotivationFitScore(analysis);

  return (
    <>
      <div className="rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Target Fit</p>
        <h2 className="mt-1 text-2xl font-extrabold">{company} · {program}</h2>
        {analysis?.criteria_fit_tier && (
          <p className="mt-2 inline-flex rounded-full bg-[color-mix(in_srgb,var(--space-text-on-primary)_18%,transparent)] px-3 py-1 text-xs font-bold uppercase tracking-wide">{cleanText(analysis.criteria_fit_tier)}</p>
        )}
        {(targetFunction || recruitmentCycle) && <p className="mt-2 text-sm opacity-90">{targetFunction}{targetFunction && recruitmentCycle ? ' · ' : ''}{recruitmentCycle}</p>}
      </div>

      {paths.length > 0 && (
        <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">{rolePathsKind === 'program_positions' ? 'Program positions' : `Roles inside ${functionLabel}`}</p>
          <h3 className="mt-1 text-lg font-extrabold">{rolePathsKind === 'program_positions' ? 'Best-fit positions in this program for you' : 'Strongest fit for sub-roles in this function'}</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {visiblePaths.map((role, index) => {
              const ladder = roadmaps[index]?.steps || [];
              return (
                <div key={role} className="rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)] bg-[var(--space-surface-card)] p-4">
                  <p className="text-sm font-extrabold text-[var(--space-text-primary)]">{role}</p>
                  {ladder.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Example career path in the department</p>
                      <ol className="mt-2 space-y-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                        {ladder.map((step, stepIndex) => (
                          <li key={step} className="flex items-center gap-1.5">
                            <span className="font-bold text-[var(--space-text-brand)]">{stepIndex + 1}.</span>
                            <span>{step}</span>
                            {stepIndex < ladder.length - 1 && <ArrowRight className="ml-auto h-3 w-3 shrink-0 opacity-40" />}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs leading-5 text-[var(--space-text-muted)]">{rolePathsKind === 'program_positions' ? `Positions and tracks listed for ${program} in the program database.` : `Illustrative paths for exploration — not a hiring promise or fixed track at ${company}.`}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ScoreCard label="Overall Target Fit" value={analysis?.matching_ratio ?? analysis?.overallFit} />
        <ScoreCard label="Profile & Experience Fit" value={analysis?.cv_profile_fit_score ?? analysis?.profileExperienceFit} />
        <ScoreCard label="Function Fit" value={analysis?.function_fit_score ?? analysis?.functionFit} />
        <ScoreCard label="Motivation Fit" value={motivationFitScore} />
        <ScoreCard label={workStyleLabel} value={analysis?.work_style_fit_score ?? analysis?.culture_fit_percent ?? analysis?.workStyleFit} />
      </div>

      {analysis?.soft_skill_fit && <SoftSkillFitPanel fit={analysis.soft_skill_fit} company={company} />}

      {showDetails && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <h3 className="font-extrabold">What you already showcase</h3>
              <CriterionCards rows={displayedStrengths} kind="strength" empty="Add one specific example (internship, project, or result) so Mate can highlight a clear strength." />
            </div>
            <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <h3 className="font-extrabold">Where you can become stronger</h3>
              <CriterionCards rows={displayedGaps} kind="gap" empty="No major evidence gap for this target — keep examples measurable and up to date." />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h3 className="font-extrabold">Watch list</h3>
              </div>
              <p className="mt-1 text-xs text-[var(--space-text-muted)]">Gaps to address before interviews — one line each.</p>
              {concerns.filter(Boolean).length ? (
                <ul className="mt-3 space-y-2">
                  {concerns.filter(Boolean).slice(0, 8).map((line, index) => (
                    <li key={index} className="flex gap-2 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2 text-sm leading-6 text-[var(--space-text-secondary)]">
                      <span className="font-extrabold text-[var(--space-text-brand)]">{index + 1}.</span>
                      <span>{sentenceCase(line)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[var(--space-text-muted)]">No extra flags beyond the growth areas above.</p>
              )}
            </div>
            <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h3 className="font-extrabold">Recommended next steps</h3>
              </div>
              <p className="mt-1 text-xs text-[var(--space-text-muted)]">Prioritized actions — profile, practice, and proof.</p>
              {sortedActions.length ? (
                <ul className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
                  {sortedActions.slice(0, 12).map((item, index) => (
                    <li key={item.id || index} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{item.priority || 'Suggested'} · {item.category || 'Preparation'}</p>
                      <p className="mt-1 leading-6 text-[var(--space-text-secondary)]">{item.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[var(--space-text-muted)]">Keep evidence specific and measurable; reopen after your next project or internship.</p>
              )}
            </div>
          </div>

          {showCriteriaBreakdown ? <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold">Review My Fit</h3>
                <p className="mt-1 text-sm text-[var(--space-text-muted)]">Optional detailed breakdown — it does not block roadmap generation.</p>
              </div>
              <button type="button" disabled={!criteria.length} onClick={() => setShowBreakdown((current) => !current)} className="inline-flex items-center gap-1 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold disabled:opacity-40">
                {showBreakdown ? 'Hide breakdown' : 'Review My Fit'}
                <ChevronDown className={`h-4 w-4 ${showBreakdown ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showBreakdown && (
              <div className="mt-4 space-y-3">
                {criteria.map((criterion, index) => {
                  const met = criterion?.status === 'met';
                  const label = itemLabel(criterion) || `Fit area ${index + 1}`;
                  const summary = compactFitEvidence(stripMatePrefix(itemSummary(criterion)));
                  const next = isMotivationCriterion(criterion) ? '' : stripMatePrefix(itemNextMove(criterion));
                  return (
                    <article key={criterion?.id || index} className="rounded-2xl border border-[var(--space-border-default)] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold">{label}</h4>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${met ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning)]'}`}>{met ? 'Strong evidence' : 'Room to grow'}</span>
                      </div>
                      {summary && <p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]">{summary}</p>}
                      {next && <p className="mt-1 text-sm font-semibold text-[var(--space-text-brand)]">Next: {next}</p>}
                    </article>
                  );
                })}
              </div>
            )}
          </div> : null}
        </>
      )}
    </>
  );
}
