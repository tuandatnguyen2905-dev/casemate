import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import {
  PROGRAM_FIT_RUBRIC_DRAFTS,
  type ProgramFitRubric,
} from '../../lib/programFitRubrics';
import {
  PROGRAM_INDUSTRIES,
  classifyProgramCompany,
  industryLabel,
  normalizeCompanyName,
  type ProgramIndustryId,
} from '../../lib/programIndustries';
import {
  PROGRAM_TIMELINES,
  applicationWindowDisplay,
  deadlineStatus,
  type ProgramTimelineRecord,
} from '../../lib/programTimelines';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';

type RubricRow = {
  id: number;
  program_id: string;
  program_name: string;
  criteria_json: ProgramFitRubric['criteria'] | string;
  ideal_profile_text: string;
  example_admit_profile: string | null;
  industry: ProgramIndustryId | null;
  verified: boolean;
  active: boolean;
  version: number;
  source: string;
  program_type?: string | null;
  location?: string | null;
  function_list?: string[] | string | null;
  open_date?: string | null;
  close_date?: string | null;
  rounds_json?: string[] | string | null;
  candidate_requirement?: string | null;
  apply_url?: string | null;
};

type CompanyIntelRow = {
  company_id: string;
  company_name: string;
  competitive_rate: CompetitiveRate | string | null;
  last_scraped_at?: string | null;
};

type CompetitiveRate = {
  difficulty_score?: number | null;
  base_difficulty?: number | null;
  market_interest?: number | null;
  brand_prestige?: number | null;
  competitive_rate_final?: number | null;
  fallback?: boolean;
  fallback_note?: string | null;
};

type CultureProfile = {
  slug?: string;
  company: string;
  confidence_score?: number | string | null;
  innovation: number;
  detail: number;
  results: number;
  competitive: number;
  supportive: number;
  teamwork: number;
  reward_development: number;
  reward_compensation: number;
  work_life_balance?: number | null;
  note?: string | null;
};

type RubricCriterionScore = {
  id: string;
  label_vi?: string;
  label_en?: string;
  score?: number;
  weight?: number;
  level?: string;
  evidence?: string | null;
  improve?: string | null;
};

type CultureAlignment = {
  key: string;
  label: string;
  user_score: number;
  company_score: number;
  difference: number;
  alignment_percent: number;
};

type ProgramFitAnalysis = {
  program_id: string;
  program_name: string;
  assessment_result_id: number;
  assessment_cycle_at?: string;
  matching_ratio: number;
  cv_profile_fit_score?: number;
  function_fit_score?: number;
  culture_fit_score?: number | null;
  culture_fit_percent?: number | null;
  culture_confidence?: number | null;
  culture_data_sufficient?: boolean;
  culture_strongest?: CultureAlignment[];
  culture_weakest?: CultureAlignment[];
  met_count: number;
  not_met_count: number;
  rubric_version: number;
  rubric_verified: boolean;
  criteria: Array<RubricCriterionScore & {
    status: 'met' | 'not_met';
    evidence_verified?: boolean;
    improvement_tip?: string | null;
  }>;
};

type AssessmentRow = { id: number; created_at?: string };

type BrowseProgram = ProgramFitRubric & {
  row?: RubricRow;
  timeline?: ProgramTimelineRecord;
  culture?: CultureProfile;
  competitive?: CompetitiveRate;
  fitAnalysis?: ProgramFitAnalysis;
};

function parseCriteria(value: RubricRow['criteria_json'] | undefined, fallback: ProgramFitRubric['criteria']) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      // Use the founder workbook projection below.
    }
  }
  return fallback;
}

function companyMatches(left: string, right: string) {
  const a = normalizeCompanyName(left).replace(/ vietnam$/, '');
  const b = normalizeCompanyName(right).replace(/ vietnam$/, '');
  return a === b || a.startsWith(`${b} `) || b.startsWith(`${a} `);
}

function criterionIsMet(criterion: RubricCriterionScore) {
  return criterion.level === 'dat' || criterion.level === 'noi_bat' || Number(criterion.score || 0) >= 60;
}

function parseCompetitiveRate(value: CompanyIntelRow['competitive_rate']): CompetitiveRate | undefined {
  if (value && typeof value === 'object') return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' ? parsed : undefined;
    } catch (_) {
      return undefined;
    }
  }
  return undefined;
}

function intelCompanyMatches(programCompany: string, intelCompany: string) {
  if (companyMatches(programCompany, intelCompany)) return true;
  const program = normalizeCompanyName(programCompany);
  const intel = normalizeCompanyName(intelCompany);
  return (program.includes('shopee') && intel.includes('shopee')) ||
    (program.includes('seamoney') && intel.includes('sea group')) ||
    (program.includes('nestle') && intel.includes('nestle')) ||
    (program.includes('mondelez') && intel.includes('mondelez'));
}

function competitiveLabel(score: number) {
  if (score >= 6) return 'High';
  if (score >= 4) return 'Medium';
  return 'Low';
}

function CompetitiveBadge({ rate }: { rate?: CompetitiveRate }) {
  const score = Number(rate?.competitive_rate_final);
  if (!Number.isFinite(score)) {
    return <span className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--space-text-muted)]">Competition: Updating</span>;
  }
  const tone = score >= 6
    ? 'border-[color-mix(in_srgb,var(--space-semantic-danger-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_10%,transparent)] text-[var(--space-semantic-danger-700)]'
    : score >= 4
      ? 'border-[color-mix(in_srgb,var(--space-semantic-warning-500)_38%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_11%,transparent)] text-[var(--space-semantic-warning-700)]'
      : 'border-[color-mix(in_srgb,var(--space-semantic-success-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] text-[var(--space-semantic-success-700)]';
  return <span title={rate?.fallback_note || undefined} className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>Competition: {competitiveLabel(score)}</span>;
}

function scoreText(value?: number | null) {
  return Number.isFinite(Number(value)) ? `${Number(value).toFixed(1)}/10` : 'Updating';
}

type LiveApplication = {
  program: BrowseProgram;
  kind: 'open' | 'soon' | 'expected';
  daysUntilOpen: number;
  daysUntilClose: number;
  dateLabel: string;
};

function dateParts(value?: string | null) {
  if (!value) return [] as Array<{ day: number; month: number; label: string }>;
  let values = [value];
  if (value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) values = parsed.map(String);
    } catch (_) {
      values = [value];
    }
  }
  return values.flatMap((item) => {
    const match = String(item).match(/^(\d{1,2})\/(\d{1,2})$/);
    if (!match) return [];
    const day = Number(match[1]);
    const month = Number(match[2]);
    return day >= 1 && day <= 31 && month >= 1 && month <= 12
      ? [{ day, month, label: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}` }]
      : [];
  });
}

function stringList(value?: string[] | string | null) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch (_) {
    // Fall through to line-delimited text.
  }
  return String(value).split(/\n|;/).map((item) => item.trim()).filter(Boolean);
}

function annualDay(day: number, month: number) {
  return Math.round((Date.UTC(2024, month - 1, day) - Date.UTC(2024, 0, 1)) / 86400000);
}

function liveApplication(program: BrowseProgram, now = new Date()): LiveApplication | null {
  const row = program.row;
  const opens = dateParts(row?.open_date);
  if (!opens.length) return null;
  const today = annualDay(now.getDate(), now.getMonth() + 1);
  const yearDays = 366;
  const close = dateParts(row?.close_date)[0];
  const closeDay = close ? annualDay(close.day, close.month) : null;
  const dateLabel = `${opens.map((open) => open.label).join(' or ')} → ${close?.label || 'Close date TBC'}`;
  const activeOpen = opens.some((open) => {
    const openDay = annualDay(open.day, open.month);
    if (closeDay == null) return today >= openDay;
    return closeDay >= openDay
      ? today >= openDay && today <= closeDay
      : today >= openDay || today <= closeDay;
  });
  if (activeOpen) {
    const daysUntilClose = closeDay == null ? Number.POSITIVE_INFINITY : (closeDay - today + yearDays) % yearDays;
    return { program, kind: 'open', daysUntilOpen: 0, daysUntilClose, dateLabel };
  }
  const nextOpen = opens
    .map((open) => ({ ...open, delta: (annualDay(open.day, open.month) - today + yearDays) % yearDays }))
    .filter((open) => open.delta > 0)
    .sort((a, b) => a.delta - b.delta)[0];
  if (!nextOpen) return null;
  if (nextOpen.delta <= 14) return { program, kind: 'soon', daysUntilOpen: nextOpen.delta, daysUntilClose: Number.POSITIVE_INFINITY, dateLabel };
  return closeDay == null
    ? { program, kind: 'expected', daysUntilOpen: nextOpen.delta, daysUntilClose: Number.POSITIVE_INFINITY, dateLabel }
    : null;
}

const REQUIREMENT_CATEGORIES = [
  { id: 'education', label: 'Education' },
  { id: 'attitude', label: 'Attitude / Mindset' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'language', label: 'Language' },
] as const;

function requirementCategory(id: string) {
  const key = id.toLowerCase();
  if (/english|language|ielts|toeic/.test(key)) return 'language';
  if (/education|gpa|degree|academic/.test(key)) return 'education';
  if (/intern|experience|leadership|activit|award|competition/.test(key)) return 'experience';
  if (/culture|mindset|attitude|motivation|resilience|drive|orientation/.test(key)) return 'attitude';
  return 'skills';
}

function statusFor(program: BrowseProgram) {
  const opens = dateParts(program.row?.open_date);
  if (opens.length) {
    const live = liveApplication(program);
    if (live?.kind === 'open') return { label: 'Open Now', detail: live.dateLabel, tone: 'success' as const };
    if (live?.kind === 'soon') return { label: 'Opening Soon', detail: live.dateLabel, tone: 'warning' as const };
    if (live?.kind === 'expected') return { label: 'Expected', detail: live.dateLabel, tone: 'muted' as const };
    const today = annualDay(new Date().getDate(), new Date().getMonth() + 1);
    const firstOpenDay = annualDay(opens[0].day, opens[0].month);
    const close = dateParts(program.row?.close_date)[0];
    const closeDay = close ? annualDay(close.day, close.month) : null;
    const windowHasClosed = closeDay != null && (closeDay >= firstOpenDay ? today > closeDay : today > closeDay && today < firstOpenDay);
    if (windowHasClosed) return { label: 'Closed', detail: `Closed ${close?.label}`, tone: 'muted' as const };
    return { label: 'Upcoming', detail: `Opens ${opens.map((date) => date.label).join(' or ')}`, tone: 'warning' as const };
  }
  const status = deadlineStatus(program.timeline);
  if (status.kind === 'countdown') return { label: 'Open', detail: status.label, tone: 'success' as const };
  if (status.kind === 'closed') return { label: 'Closed', detail: status.closeDateLabel, tone: 'muted' as const };
  return { label: 'TBC', detail: status.openText || undefined, tone: 'warning' as const };
}

function StatusBadge({ program }: { program: BrowseProgram }) {
  const status = statusFor(program);
  const tone = status.tone === 'success'
    ? 'border-[color-mix(in_srgb,var(--space-semantic-success-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] text-[var(--space-semantic-success-700)]'
    : status.tone === 'warning'
      ? 'border-[color-mix(in_srgb,var(--space-semantic-warning-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] text-[var(--space-semantic-warning-700)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]';
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>{status.label}</span>;
}

function FitScoreBreakdown({ analysis }: { analysis: ProgramFitAnalysis }) {
  const score = (value?: number | null) => Number.isFinite(Number(value)) ? `${Math.round(Number(value))}%` : '—';
  return (
    <section className="rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_6%,transparent)] p-4 md:p-5">
      <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Overall composite match</p><h3 className="mt-1 text-base font-extrabold text-[var(--space-text-primary)] md:text-lg">Your fit breakdown</h3></div><span className="rounded-full bg-[var(--space-brand-primary)] px-3 py-1.5 text-sm font-extrabold text-[var(--space-text-on-primary)] md:text-base">{analysis.matching_ratio}%</span></div>
      <div className="mt-3 grid gap-2 text-center sm:grid-cols-3 md:mt-4">
        <div className="rounded-xl bg-[var(--space-surface-card)] p-2.5 md:p-3"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">CV / Profile</p><p className="mt-1 text-base font-extrabold">{score(analysis.cv_profile_fit_score)}</p></div>
        <div className="rounded-xl bg-[var(--space-surface-card)] p-2.5 md:p-3"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Function fit</p><p className="mt-1 text-base font-extrabold">{score(analysis.function_fit_score)}</p></div>
        <div className="rounded-xl bg-[var(--space-surface-card)] p-2.5 md:p-3"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Culture fit</p><p className="mt-1 text-base font-extrabold">{analysis.culture_data_sufficient === false ? '—' : score(analysis.culture_fit_percent)}</p></div>
      </div>
      {analysis.culture_data_sufficient === false ? (
        <p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-3 text-xs font-semibold text-[var(--space-semantic-warning-700)]">Culture data insufficient — score based on CV + Function fit only</p>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-success-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_8%,transparent)] p-3"><p className="text-[10px] font-extrabold uppercase text-[var(--space-semantic-success-700)]">Strongest alignment</p><div className="mt-2 flex flex-wrap gap-1.5">{analysis.culture_strongest?.slice(0, 2).map((item) => <span key={item.key} className="rounded-full bg-[var(--space-surface-card)] px-2 py-1 text-[11px] font-bold text-[var(--space-semantic-success-700)]">{item.label} · {item.alignment_percent}%</span>)}</div></div>
          <div className="rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_8%,transparent)] p-3"><p className="text-[10px] font-extrabold uppercase text-[var(--space-semantic-danger-700)]">Weakest alignment</p><div className="mt-2 flex flex-wrap gap-1.5">{analysis.culture_weakest?.slice(0, 2).map((item) => <span key={item.key} className="rounded-full bg-[var(--space-surface-card)] px-2 py-1 text-[11px] font-bold text-[var(--space-semantic-danger-700)]">{item.label} · {item.alignment_percent}%</span>)}</div></div>
        </div>
      )}
    </section>
  );
}

function CultureSummary({ profile }: { profile: CultureProfile }) {
  const axes: Array<[string, number | null | undefined]> = [
    ['Innovation', profile.innovation],
    ['Results', profile.results],
    ['Support', profile.supportive],
    ['Teamwork', profile.teamwork],
    ['Development', profile.reward_development],
    ['Balance', profile.work_life_balance],
  ];
  const ranked = axes
    .filter((item): item is [string, number] => typeof item[1] === 'number')
    .sort((a, b) => b[1] - a[1]);
  const strongest = ranked.slice(0, 3).map(([label]) => label).join(' · ');

  return (
    <section className="rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_6%,transparent)] p-4 md:p-5">
      <div className="flex items-center gap-2 text-[var(--space-text-brand)]">
        <Sparkles className="h-4 w-4" />
        <h3 className="font-semibold">OCP Culture Summary</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
        Strongest signals: {strongest || 'Updating'}. This is a company-level culture profile; your experience may vary by team.
      </p>
      {profile.note && <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">{profile.note}</p>}
    </section>
  );
}

function ProgramDetail({ program, onClose }: { program: BrowseProgram; onClose: () => void }) {
  const row = program.row;
  const criteria = parseCriteria(row?.criteria_json, program.criteria);
  const timeline = program.timeline;
  const dbOpenDates = dateParts(row?.open_date);
  const dbCloseDate = dateParts(row?.close_date)[0];
  const windowDisplay = dbOpenDates.length
    ? { openLabel: `Opens ${dbOpenDates.map((date) => date.label).join(' or ')}${dbCloseDate ? '' : ' · No published deadline'}`, closeLabel: dbCloseDate ? `Closes ${dbCloseDate.label}` : null }
    : applicationWindowDisplay(timeline);
  const roundNames = stringList(row?.rounds_json).length
    ? stringList(row?.rounds_json)
    : (timeline?.rounds || []).map((round) => round.name);
  const programUrl = row?.apply_url || timeline?.programUrl;
  const analysis = program.fitAnalysis;
  const scoredCriteria: RubricCriterionScore[] = (analysis?.criteria || []).map((criterion) => ({
    ...criterion,
    improve: criterion.improvement_tip,
  }));
  const groupedRequirements = REQUIREMENT_CATEGORIES.map((category) => ({
    ...category,
    criteria: criteria.filter((criterion) => requirementCategory(criterion.id) === category.id),
  }));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[color-mix(in_srgb,var(--space-neutral-950)_44%,transparent)]" role="dialog" aria-modal="true" aria-label={`Details for ${program.program}`}>
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close details" />
      <article className="relative z-10 h-full w-full max-w-3xl overflow-y-auto border-l border-[var(--space-border-default)] bg-[var(--space-surface-page)] shadow-2xl">
        <header className="sticky top-0 z-10 border-b border-[var(--space-border-default)] bg-[color-mix(in_srgb,var(--space-surface-card)_94%,transparent)] px-4 py-3 backdrop-blur md:px-8 md:py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-primary-500)_10%,transparent)] px-2.5 py-1 text-xs font-semibold text-[var(--space-text-brand)]">
                  {industryLabel(program.industry)}
                </span>
                {analysis && <span className="rounded-full bg-[var(--space-brand-primary)] px-2.5 py-1 text-xs font-extrabold text-[var(--space-text-on-primary)]">{analysis.matching_ratio}% match</span>}
              </div>
              <p className="text-sm font-semibold text-[var(--space-text-brand)]">{program.company}</p>
              <h2 className="mt-1 text-lg font-bold leading-tight text-[var(--space-text-primary)] md:text-2xl">{program.program}</h2>
            </div>
            <button onClick={onClose} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2 text-[var(--space-text-muted)] transition hover:text-[var(--space-text-primary)]" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="space-y-4 p-4 md:space-y-5 md:p-8">
          {analysis && <FitScoreBreakdown analysis={analysis} />}

          <section className="rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_6%,transparent)] p-4 md:p-5">
            <h3 className="text-sm font-semibold text-[var(--space-text-primary)] md:text-base">Preparation Timeline</h3>
            <div className={`mt-3 grid gap-3 ${windowDisplay.closeLabel ? 'sm:grid-cols-2' : ''}`}>
              <div className="rounded-xl bg-[var(--space-surface-card)] p-3 md:p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Application window</p>
                <p className="mt-1 text-sm font-bold text-[var(--space-text-primary)]">{windowDisplay.openLabel}</p>
              </div>
              {windowDisplay.closeLabel && (
                <div className="rounded-xl bg-[var(--space-surface-card)] p-3 md:p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Closing date</p>
                  <p className="mt-1 text-sm font-bold text-[var(--space-text-primary)]">{windowDisplay.closeLabel}</p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[var(--space-text-primary)]">Competition Level</h3>
                <p className="mt-1 text-xs text-[var(--space-text-muted)]">A server-calculated blend of selection difficulty and market signals.</p>
              </div>
              <CompetitiveBadge rate={program.competitive} />
            </div>
            {program.competitive ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[var(--space-surface-muted)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Selection Difficulty</p><p className="mt-1 text-sm font-extrabold text-[var(--space-text-primary)]">{scoreText(program.competitive.base_difficulty ?? program.competitive.difficulty_score)}</p></div>
                <div className="rounded-xl bg-[var(--space-surface-muted)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Market Interest</p><p className="mt-1 text-sm font-extrabold text-[var(--space-text-primary)]">{scoreText(program.competitive.market_interest)}</p></div>
                <div className="rounded-xl bg-[var(--space-surface-muted)] p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Brand Prestige</p><p className="mt-1 text-sm font-extrabold text-[var(--space-text-primary)]">{scoreText(program.competitive.brand_prestige)}</p></div>
              </div>
            ) : <p className="mt-3 text-sm text-[var(--space-text-muted)]">Social-listening data for this company is being updated.</p>}
            {program.competitive?.fallback && <p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_9%,transparent)] p-3 text-xs leading-5 text-[var(--space-semantic-warning-700)]">There are not enough social signals yet, so the program’s baseline difficulty is shown.</p>}
          </section>

          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--space-text-primary)]">Candidate Requirements</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {groupedRequirements.map((category) => (
                <div key={category.id} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--space-text-brand)]">{category.label}</p>
                  {category.criteria.length ? (
                    <ul className="mt-2 space-y-2">
                      {category.criteria.map((criterion) => (
                        <li key={criterion.id} className="text-xs leading-5 text-[var(--space-text-secondary)]">
                          <span className="mr-1 text-[var(--space-text-brand)]">•</span>{/[À-ỹĐđ]/.test(String(criterion.levels.dat || '')) ? `${criterion.label_en || 'This criterion'}: meet the program’s baseline requirement.` : criterion.levels.dat}
                        </li>
                      ))}
                    </ul>
                  ) : <p className="mt-2 text-xs text-[var(--space-text-muted)]">No separate requirement is listed.</p>}
                </div>
              ))}
            </div>
            {analysis && (
              <div className="mt-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-warning-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_9%,transparent)] p-4">
                <p className="text-xs font-extrabold text-[var(--space-semantic-warning-700)]">Gaps to Address:</p>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                  {scoredCriteria.filter((criterion) => !criterionIsMet(criterion)).map((criterion) => (
                    <li key={criterion.id}>• <span className="font-semibold">{criterion.label_en || criterion.label_vi || criterion.id}:</span> {criterion.improve || 'Add clearer evidence in your CV or assessment.'}</li>
                  ))}
                  {scoredCriteria.length > 0 && scoredCriteria.every(criterionIsMet) && <li>There are no required gaps in the current rubric.</li>}
                </ul>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--space-text-primary)]">Selection Rounds</h3>
            {roundNames.length ? (
              <div className="mt-3">
                <p className="text-sm font-extrabold text-[var(--space-text-primary)]">{roundNames.length} selection rounds</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {roundNames.map((round, index) => (
                    <span key={`${round}-${index}`} className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-secondary)]">R{index + 1} · {/[À-ỹĐđ]/.test(round) ? `Selection stage ${index + 1}` : round}</span>
                  ))}
                </div>
              </div>
            ) : <p className="mt-2 text-sm text-[var(--space-text-muted)]">The selection rounds are being updated.</p>}
          </section>

          {analysis && scoredCriteria.length > 0 && (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <div className="flex items-end justify-between gap-3">
                <div><h3 className="font-semibold text-[var(--space-text-primary)]">Personal Rubric Analysis</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">{analysis.met_count} criteria met · {analysis.not_met_count} criteria to improve.</p></div>
                <span className="rounded-full bg-[var(--space-brand-primary)] px-3 py-1 text-sm font-extrabold text-[var(--space-text-on-primary)]">{Math.round(Number(analysis.cv_profile_fit_score ?? analysis.matching_ratio))}%</span>
              </div>
              <div className="mt-4 space-y-3">
                {scoredCriteria.map((criterion) => {
                  const score = Math.max(0, Math.min(100, Number(criterion.score) || 0));
                  const met = criterionIsMet(criterion);
                  const tone = met ? 'var(--space-semantic-success-600)' : score >= 45 ? 'var(--space-semantic-warning-600)' : 'var(--space-semantic-danger-600)';
                  return (
                    <div key={criterion.id} className="rounded-xl border border-[var(--space-border-default)] p-4">
                      <div className="flex items-center justify-between gap-3 text-xs"><span className="font-bold text-[var(--space-text-primary)]">{criterion.label_en || criterion.label_vi || criterion.id}</span><span className="font-extrabold" style={{ color: tone }}>{score} · {met ? 'Met' : 'Gap'}</span></div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]"><div className="h-full rounded-full" style={{ width: `${score}%`, background: tone }} /></div>
                      {criterion.evidence && <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-semibold">Evidence:</span> “{criterion.evidence}”</p>}
                      {!met && <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-semibold">Tip:</span> {criterion.improve || 'Add specific evidence or experience for this criterion.'}</p>}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {row?.example_admit_profile && (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <h3 className="font-semibold text-[var(--space-text-primary)]">Example Candidate Profile</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[var(--space-text-secondary)]">{row.example_admit_profile}</p>
            </section>
          )}

          {program.culture && <CultureSummary profile={program.culture} />}

          {programUrl && (
            <a href={programUrl} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--space-text-on-primary)] transition hover:bg-[var(--space-brand-primary-700)] md:py-3 md:text-base">
              View Careers Page <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

let companyIntelligenceCache: CompanyIntelRow[] | null = null;

function CompanyIntelligenceLoader({ onData }: { onData: (rows: CompanyIntelRow[]) => void }) {
  const { data, loading } = window.useWorkspaceDB<CompanyIntelRow>('company_intelligence', {
    shared: true,
    orderBy: { column: 'last_scraped_at', direction: 'desc' },
    limit: 100,
  });

  useEffect(() => {
    if (loading) return;
    const next = data || [];
    companyIntelligenceCache = next;
    onData(next);
  }, [data, loading, onData]);

  return null;
}

export default function ProgramBrowser() {
  const { sessionId } = useSpaceRuntime();
  const [industry, setIndustry] = useState<'all' | ProgramIndustryId>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [fitAnalyses, setFitAnalyses] = useState<Record<string, ProgramFitAnalysis>>({});
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisErrors, setAnalysisErrors] = useState<Record<string, string>>({});
  const [companyIntel, setCompanyIntel] = useState<CompanyIntelRow[]>(() => companyIntelligenceCache || []);
  const [cultureProfiles, setCultureProfiles] = useState<Record<string, CultureProfile | null>>({});
  const [shouldLoadCompanyIntel, setShouldLoadCompanyIntel] = useState(false);
  const { data: rows, loading, error } = window.useWorkspaceDB<RubricRow>('program_fit_rubrics', {
    shared: true,
    orderBy: { column: 'program_name', direction: 'asc' },
    limit: 500,
  });
  const { data: assessmentRows, loading: assessmentLoading } = window.useWorkspaceDB<AssessmentRow>('assessment_results', {
    orderBy: { column: 'id', direction: 'desc' },
    limit: 1,
  });
  const hasAssessment = (assessmentRows || []).length > 0;
  const assessmentCycleId = assessmentRows?.[0]?.id || null;

  useEffect(() => {
    setFitAnalyses({});
    setAnalysisErrors({});
    setAnalyzingId(null);
  }, [assessmentCycleId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShouldLoadCompanyIntel(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  const handleCompanyIntel = useCallback((next: CompanyIntelRow[]) => {
    setCompanyIntel(next);
  }, []);

  const openProgram = useCallback(async (program: BrowseProgram) => {
    setSelectedId(program.program_id);
    if (Object.prototype.hasOwnProperty.call(cultureProfiles, program.program_id)) return;
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.from) return;
      const result = await db
        .from('culture_company_profiles', { shared: true })
        .eq('company', program.company)
        .limit(1)
        .get();
      const rows = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.rows)
            ? result.rows
            : [];
      const profile = rows.find((row: CultureProfile) => companyMatches(program.company, row.company)) || null;
      setCultureProfiles((current) => ({ ...current, [program.program_id]: profile }));
    } catch {
      setCultureProfiles((current) => ({ ...current, [program.program_id]: null }));
    }
  }, [cultureProfiles]);

  const programs = useMemo<BrowseProgram[]>(() => {
    const newestRows = new Map<string, RubricRow>();
    for (const row of rows || []) {
      if (row.active === false) continue;
      const current = newestRows.get(row.program_id);
      if (!current || row.version > current.version || (row.version === current.version && row.verified && !current.verified) || (row.version === current.version && row.verified === current.verified && row.id > current.id)) newestRows.set(row.program_id, row);
    }
    const drafts = new Map(PROGRAM_FIT_RUBRIC_DRAFTS.map((draft) => [draft.program_id, draft]));
    const fromDatabase = Array.from(newestRows.values()).map((row) => {
      const draft = drafts.get(row.program_id);
      const nameParts = String(row.program_name || row.program_id).split(' — ');
      const company = draft?.company || nameParts[0]?.trim() || row.program_id;
      const programName = draft?.program || (nameParts.length > 1 ? nameParts.slice(1).join(' — ').trim() : String(row.program_name || row.program_id));
      const base: ProgramFitRubric = draft || {
        program_id: row.program_id,
        program_name: row.program_name,
        company,
        program: programName,
        industry: row.industry || classifyProgramCompany(company),
        criteria: parseCriteria(row.criteria_json, []),
        ideal_profile_text: row.ideal_profile_text || '',
        example_admit_profile: row.example_admit_profile || null,
        version: row.version || 1,
      };
      return {
        ...base,
        row,
        timeline: PROGRAM_TIMELINES.find((item) => item.id === row.program_id),
        culture: cultureProfiles[row.program_id] || undefined,
        competitive: parseCompetitiveRate((companyIntel || []).find((intel) => intelCompanyMatches(company, intel.company_name))?.competitive_rate || null),
        fitAnalysis: fitAnalyses[row.program_id],
      };
    });
    const databaseIds = new Set(fromDatabase.map((program) => program.program_id));
    const fallbackDrafts = PROGRAM_FIT_RUBRIC_DRAFTS.filter((draft) => !databaseIds.has(draft.program_id)).map((draft) => ({
      ...draft,
      timeline: PROGRAM_TIMELINES.find((item) => item.id === draft.program_id),
      culture: cultureProfiles[draft.program_id] || undefined,
      competitive: parseCompetitiveRate((companyIntel || []).find((intel) => intelCompanyMatches(draft.company, intel.company_name))?.competitive_rate || null),
      fitAnalysis: fitAnalyses[draft.program_id],
    }));
    return [...fromDatabase, ...fallbackDrafts];
  }, [rows, cultureProfiles, companyIntel, fitAnalyses]);

  const counts = useMemo(() => {
    const result = new Map<ProgramIndustryId, number>();
    for (const program of programs) result.set(program.industry, (result.get(program.industry) || 0) + 1);
    return result;
  }, [programs]);

  const filtered = useMemo(() => {
    const needle = normalizeCompanyName(query);
    return programs.filter((program) => {
      const industryMatch = industry === 'all' || program.industry === industry;
      const searchMatch = !needle || normalizeCompanyName(`${program.company} ${program.program}`).includes(needle);
      return industryMatch && searchMatch;
    }).sort((a, b) => {
      if (a.fitAnalysis && !b.fitAnalysis) return -1;
      if (!a.fitAnalysis && b.fitAnalysis) return 1;
      if (a.fitAnalysis && b.fitAnalysis) return b.fitAnalysis.matching_ratio - a.fitAnalysis.matching_ratio;
      return a.program.localeCompare(b.program);
    });
  }, [programs, industry, query]);

  const selected = programs.find((program) => program.program_id === selectedId) || null;
  const applicationGroups = useMemo(() => {
    const live = programs.map((program) => liveApplication(program)).filter((item): item is LiveApplication => item !== null);
    const open = live
      .filter((item) => item.kind === 'open')
      .sort((a, b) => a.daysUntilClose - b.daysUntilClose || a.program.program.localeCompare(b.program.program));
    const soon = live
      .filter((item) => item.kind === 'soon')
      .sort((a, b) => a.daysUntilOpen - b.daysUntilOpen || a.program.program.localeCompare(b.program.program));
    const expected = live
      .filter((item) => item.kind === 'expected')
      .sort((a, b) => a.daysUntilOpen - b.daysUntilOpen || a.program.program.localeCompare(b.program.program));
    const visibleOpen = open.slice(0, 8);
    const visibleSoon = soon.slice(0, Math.max(0, 8 - visibleOpen.length));
    const visibleExpected = expected.slice(0, Math.max(0, 8 - visibleOpen.length - visibleSoon.length));
    return { open: visibleOpen, soon: visibleSoon, expected: visibleExpected };
  }, [programs]);

  const analyzeProgram = async (program: BrowseProgram) => {
    if (!sessionId || !hasAssessment || !program.row || analyzingId) return;
    setAnalyzingId(program.program_id);
    setAnalysisErrors((current) => ({ ...current, [program.program_id]: '' }));
    try {
      const response = await fetch('/api/hooks/execute/workspace-539150/casemate-program-fit-analysis-v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({ program_id: program.program_id }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success || !payload.analysis) {
        throw new Error(payload.error || 'Mate couldn’t complete the analysis — please try again.');
      }
      setFitAnalyses((current) => ({ ...current, [program.program_id]: payload.analysis as ProgramFitAnalysis }));
    } catch (error) {
      setAnalysisErrors((current) => ({
        ...current,
        [program.program_id]: error instanceof Error ? error.message : 'Mate couldn’t complete the analysis — please try again.',
      }));
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11 [&_button]:min-w-11 [&_a]:min-h-11">
      {shouldLoadCompanyIntel && <CompanyIntelligenceLoader onData={handleCompanyIntel} />}
      <header className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-4 md:px-7 md:py-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--space-text-brand)]"><Building2 className="h-4 w-4" /> Explore Opportunities</div>
              <h1 className="mt-1 text-lg font-bold tracking-tight md:text-3xl">Browse Programs</h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">Search 66 programs by industry, company, or program name — no CV assessment required.</p>
            </div>
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search companies or programs..." className="min-h-11 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] py-2.5 pl-10 pr-14 text-sm md:py-3 text-[var(--space-text-primary)] outline-none transition placeholder:text-[var(--space-text-muted)] focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_16%,transparent)]" />
              {query && <button onClick={() => setQuery('')} className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[var(--space-text-muted)] hover:text-[var(--space-text-primary)]" aria-label="Clear search"><X className="h-4 w-4" /></button>}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 md:mt-5">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />
            <button onClick={() => setIndustry('all')} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition md:px-3.5 md:py-2 md:text-sm ${industry === 'all' ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-200)]'}`}>All <span className="ml-1 opacity-75">{programs.length}</span></button>
            {PROGRAM_INDUSTRIES.map((item) => (
              <button key={item.id} onClick={() => setIndustry(item.id)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition md:px-3.5 md:py-2 md:text-sm ${industry === item.id ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-200)]'}`}>{item.label} <span className="ml-1 opacity-75">{counts.get(item.id) || 0}</span></button>
            ))}
          </div>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-7 md:py-7">
        <div className="mx-auto max-w-7xl">
          {(applicationGroups.open.length > 0 || applicationGroups.soon.length > 0 || applicationGroups.expected.length > 0) && (
            <section className="mb-7 rounded-3xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_18%,transparent)] bg-[var(--space-surface-card)] p-4 shadow-sm md:p-6" aria-labelledby="live-applications-title">
              <div className="mb-5 text-center">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--space-text-brand)]">Application updates</p>
                <h2 id="live-applications-title" className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)] md:text-2xl">MT Programs Now Accepting Applications</h2>
                <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Live from the program database, based on today’s day and month.</p>
              </div>
              {([
                { key: 'open', title: 'Open Now', items: applicationGroups.open },
                { key: 'soon', title: 'Opening Soon (within 14 days)', items: applicationGroups.soon },
                { key: 'expected', title: 'Expected', items: applicationGroups.expected },
              ] as const).map((group) => group.items.length > 0 && (
                <div key={group.key} className="mt-5 first:mt-0">
                  <div className="mb-3 flex items-center gap-2"><h3 className="text-sm font-extrabold text-[var(--space-text-primary)]">{group.title}</h3><span className="text-xs font-semibold text-[var(--space-text-muted)]">{group.items.length}</span></div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <article key={`${group.key}-${item.program.program_id}`} className={`flex min-h-48 flex-col rounded-2xl border border-[var(--space-border-default)] border-t-4 bg-[var(--space-surface-page-alt)] p-4 shadow-sm ${item.kind === 'open' ? 'border-t-[var(--space-semantic-success)]' : item.kind === 'soon' ? 'border-t-[var(--space-semantic-warning)]' : 'border-t-[var(--space-neutral-500)]'}`}>
                        <div className="flex items-start justify-between gap-2"><p className="text-xs font-bold text-[var(--space-text-brand)]">{item.program.company}</p><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${item.kind === 'open' ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] text-[var(--space-semantic-success-700)]' : item.kind === 'soon' ? 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] text-[var(--space-semantic-warning-700)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{item.kind === 'open' ? 'Open Now' : item.kind === 'soon' ? 'Opening Soon' : 'Expected'}</span></div>
                        <h4 className="mt-2 text-sm font-extrabold leading-5 text-[var(--space-text-primary)]">{item.program.program}</h4>
                        <p className="mt-1 flex-1 text-xs text-[var(--space-text-muted)]">{item.program.row?.program_type || 'Program'}</p>
                        <p className="mt-3 text-xs font-semibold text-[var(--space-text-secondary)]">{item.dateLabel}</p>
                        <button type="button" onClick={() => void openProgram(item.program)} className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-xl bg-[var(--space-brand-primary-600)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)]">View program <ChevronRight className="h-3.5 w-3.5" /></button>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => document.getElementById('all-programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="mx-auto mt-6 flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] px-4 py-2 text-sm font-bold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)]">View all programs <ChevronRight className="h-4 w-4" /></button>
            </section>
          )}

          <div id="all-programs" className="mb-4 flex scroll-mt-4 items-center justify-between gap-3">
            <p className="text-sm text-[var(--space-text-secondary)]"><span className="font-semibold text-[var(--space-text-primary)]">{filtered.length}</span> matching programs</p>
            {loading && <span className="flex items-center gap-2 text-xs text-[var(--space-text-muted)]"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Syncing data</span>}
          </div>

          {error && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_8%,transparent)] p-4 text-sm text-[var(--space-semantic-danger-700)]">WorkspaceDB can’t sync right now. The founder-verified program catalogue is still available to browse.</div>}

          {!assessmentLoading && sessionId && !hasAssessment && (
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_6%,transparent)] p-4 sm:flex-row sm:items-center">
              <div><p className="text-sm font-bold text-[var(--space-text-primary)]">Complete Fit Assessment to see your match</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Mate will score each rubric using your latest CV, MCQ answers, MBTI, and career preferences.</p></div>
              <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'fit-assessment' } }))} className="shrink-0 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Open Fit Assessment</button>
            </div>
          )}

          {filtered.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((program) => {
                const analysis = program.fitAnalysis;
                const isAnalyzing = analyzingId === program.program_id;
                const unavailable = !program.row;
                return (
                  <article key={program.program_id} className="group flex min-h-0 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left md:min-h-64 md:p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:bg-[var(--space-surface-card-hover)] hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-primary-500)_9%,transparent)] px-2.5 py-1 text-xs font-semibold text-[var(--space-text-brand)]">{industryLabel(program.industry)}</span>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge program={program} />
                        <CompetitiveBadge rate={program.competitive} />
                      </div>
                    </div>
                    <div className="mt-4 flex-1 md:mt-5">
                      <p className="text-sm font-semibold text-[var(--space-text-brand)]">{program.company}</p>
                      <h2 className="mt-1 text-base font-bold leading-snug text-[var(--space-text-primary)] md:text-lg">{program.program}</h2>
                      <p className="mt-2 text-xs font-semibold text-[var(--space-text-muted)]">Application window: {statusFor(program).detail || statusFor(program).label}</p>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--space-text-muted)]">{program.ideal_profile_text || 'Candidate requirements are being updated.'}</p>
                    </div>

                    <div className="mt-4 border-t border-[var(--space-border-subtle)] pt-4">
                      {analysis ? (
                        <div className="flex items-center justify-between gap-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success-600)]" />
                            <span className="rounded-full bg-[var(--space-brand-primary)] px-2.5 py-1 text-xs font-extrabold text-[var(--space-text-on-primary)]">{analysis.matching_ratio}% match</span>
                          </div>
                          <button type="button" onClick={() => void openProgram(program)} className="text-xs font-bold text-[var(--space-text-brand)] hover:underline">View Details</button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void analyzeProgram(program)}
                          disabled={!hasAssessment || unavailable || isAnalyzing || !!analyzingId}
                          title={unavailable ? 'No rubric is available for this program yet' : !hasAssessment ? 'Complete Fit Assessment to see your match' : undefined}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-bold md:py-3 text-[var(--space-text-on-primary)] transition hover:bg-[var(--space-brand-primary-700)] disabled:cursor-not-allowed disabled:bg-[var(--space-neutral-300)] disabled:text-[var(--space-neutral-600)]"
                        >
                          {isAnalyzing ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</> : <><Sparkles className="h-4 w-4" /> Run Analysis</>}
                        </button>
                      )}
                      {analysisErrors[program.program_id] && (
                        <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-[var(--space-semantic-danger-700)]"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{analysisErrors[program.program_id]}</p>
                      )}
                    </div>

                    {!analysis && (
                      <button type="button" onClick={() => void openProgram(program)} className="mt-3 flex items-center justify-between text-sm font-semibold text-[var(--space-text-brand)]">
                        <span>Program Details</span><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-4 py-10 text-center md:px-6 md:py-14">
              <Search className="mx-auto h-8 w-8 text-[var(--space-text-muted)]" />
              <h2 className="mt-3 font-semibold">No Programs Found</h2>
              <p className="mt-1 text-sm text-[var(--space-text-muted)]">Try another keyword or choose “All”.</p>
              <button onClick={() => { setIndustry('all'); setQuery(''); }} className="mt-4 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--space-text-on-primary)]">Clear Filters</button>
            </div>
          )}
        </div>
      </main>

      {selected && <ProgramDetail program={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
