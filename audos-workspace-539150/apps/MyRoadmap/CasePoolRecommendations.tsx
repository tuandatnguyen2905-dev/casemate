// My Roadmap — Case Pool links inside "Recommended for you".
//
// Full-case recommendations open Case Pool at the right place:
//   - a recommendation that names a case opens that case directly, but only after the name resolves to a
//     stable Case Pool id in the library data (lib/casePoolLinks.ts — exact id, source id or full title);
//   - "Continue with the full case": a Case Drill question the learner completed records the Case Pool case it
//     was built from (lib/casePoolContinue.ts). When that case is not started yet, it is recommended by its
//     stable id (casePoolCaseId), never by title, and opens through the same verified path;
//   - a group recommendation (case types for the target program) opens the library with the matching
//     existing labels applied as visible filters; the program's industry is added only when it maps to exactly
//     one Case Pool industry label (casePoolIndustryForProgram);
//   - a named case that cannot be verified, or is retired, is never swapped for another case: the row says
//     it is unavailable and, when its verified labels allow, offers "Browse related cases".
// The Fit Assessment's saved Case Pool action is the source when the roadmap has one; otherwise the
// program's frequent case types (lib/caseTypeRecommendations.ts) are used.

import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Info, Target } from 'lucide-react';
import type { ProgramRow, RecommendationTarget } from '../../lib/candidateReviews';
import type { PreparationRecommendation } from '../../lib/prepRoadmap';
import { caseRecommendationsForProgram } from '../../lib/caseTypeRecommendations';
import { trackAppSwitch, trackStepView } from '../../lib/engagementTracking';
import type { CasePoolLabels } from '../../lib/casePoolLinks';
import type { PoolFilters } from '../../lib/casePoolBusinessProblems';
import { continueRecommendation } from '../../lib/casePoolContinue';
import type { ContinueCase } from '../../lib/casePoolContinue';
import type { PracticeSession } from '../../lib/roadmapProgress';

type LinksModule = typeof import('../../lib/casePoolLinks');

/** Optional structured fields a recommendation may carry to name a case or describe a group. */
interface CaseRefFields {
  casePoolCaseId?: string;
  caseId?: string;
  sourceCaseId?: string;
  caseTitle?: string;
  /** Set on "Continue with the full case" recommendations: completed drills built from the case. */
  continuedDrills?: number;
  industry?: string;
  exerciseType?: string;
  difficulty?: string;
}

type CaseRec = PreparationRecommendation & CaseRefFields;

interface Browse {
  filters: Partial<PoolFilters>;
  chips: string[];
  count: number;
}

type PoolItem =
  | { key: string; kind: 'case'; title: string; caseId: string; continues?: number }
  | { key: string; kind: 'group'; title: string; browse: Browse }
  | { key: string; kind: 'unavailable'; title: string; related: Browse | null };

const MAX_ITEMS = 4;
const NO_SESSIONS: PracticeSession[] = [];

function chipText(key: keyof CasePoolLabels, label: string): string {
  if (key === 'industry') return `Industry: ${label}`;
  if (key === 'businessProblem') return `Business problem: ${label}`;
  if (key === 'difficulty') return `Difficulty: ${label}`;
  return `Exercise type: ${label}`;
}

function toBrowse(links: LinksModule, labels: CasePoolLabels): Browse | null {
  const build = links.casePoolFiltersFromLabels(labels);
  if (build.applied.length === 0) return null;
  const count = links.matchingCasePoolCases(build.filters).length;
  return count > 0 ? { filters: build.filters, chips: build.applied.map((item) => chipText(item.key, item.label)), count } : null;
}

function relatedBrowse(links: LinksModule, labels: CasePoolLabels): Browse | null {
  const related = links.relatedBrowseFor(labels);
  return related ? { filters: related.filters, chips: related.applied.map((item) => chipText(item.key, item.label)), count: related.count } : null;
}

/** "Choose … cases that use Market Sizing, Profitability, Market Entry problem types, …" -> the listed types. */
function problemTypesInAction(text: string): string[] {
  const match = /\buse (.+?) problem types\b/i.exec(text);
  return match ? match[1].split(/,\s*|\s+and\s+/).map((item) => item.trim()).filter(Boolean) : [];
}

/** A case type becomes a group link only through a label Case Pool already shows. */
function caseTypeBrowse(links: LinksModule, caseType: string, industry: string | null): Browse | null {
  for (const labels of [{ exerciseType: caseType }, { businessProblem: caseType }] as CasePoolLabels[]) {
    const typed = toBrowse(links, labels);
    if (!typed) continue;
    const withIndustry = industry ? toBrowse(links, { ...labels, industry }) : null;
    return withIndustry && withIndustry.chips.length > typed.chips.length ? withIndustry : typed;
  }
  return null;
}

export function buildCasePoolItems(
  links: LinksModule,
  input: {
    fitRecommendations: PreparationRecommendation[];
    target: RecommendationTarget | null;
    programIndustry: string | null;
    continueCases?: ContinueCase[];
  },
): { items: PoolItem[]; fromFit: CaseRec | null } {
  const items: PoolItem[] = [];
  const seen = new Set<string>();
  const push = (item: PoolItem) => {
    const signature = item.kind === 'case' ? `case:${item.caseId}` : item.kind === 'group' ? `group:${JSON.stringify(item.browse.filters)}` : `missing:${item.title}`;
    if (seen.has(signature) || items.length >= MAX_ITEMS) return;
    seen.add(signature);
    items.push(item);
  };

  const continueRecs: CaseRec[] = (input.continueCases || []).map((item, index) => continueRecommendation(item, index));
  const savedRecs = (input.fitRecommendations || []).filter((rec): rec is CaseRec => Boolean(rec) && rec.casemateFunction === 'Case Pool');
  const poolRecs: CaseRec[] = [...continueRecs, ...savedRecs];
  let groupSource: CaseRec | null = null;

  for (const [index, rec] of poolRecs.entries()) {
    const text = String(rec.recommendedAction || rec.gap || rec.reason || '');
    const ref = { caseId: rec.casePoolCaseId || rec.caseId, sourceCaseId: rec.sourceCaseId, title: rec.caseTitle };
    const explicit = Boolean(ref.caseId || ref.sourceCaseId || ref.title);
    const named = explicit ? links.resolvePoolCaseRef(ref) : links.findNamedPoolCases(text)[0] || null;
    if (named?.status === 'available') {
      push({ key: `${rec.id}-case`, kind: 'case', title: links.casePoolCoreTitle(named.item.title), caseId: named.item.id, continues: rec.continuedDrills });
    } else if (named) {
      push({ key: `${rec.id}-retired`, kind: 'unavailable', title: links.casePoolCoreTitle(named.item.title), related: relatedBrowse(links, links.caseLabels(named.item)) });
    } else if (explicit) {
      push({
        key: `${rec.id}-missing-${index}`,
        kind: 'unavailable',
        title: String(rec.caseTitle || rec.casePoolCaseId || rec.caseId || rec.sourceCaseId),
        related: relatedBrowse(links, { industry: rec.industry, exerciseType: rec.exerciseType, difficulty: rec.difficulty }),
      });
    } else if (!groupSource) {
      groupSource = rec;
    }
  }

  const industry = links.casePoolIndustryForProgram(input.programIndustry);
  const fitTypes = groupSource ? problemTypesInAction(String(groupSource.recommendedAction || '')) : [];
  const caseTypes = fitTypes.length
    ? fitTypes
    : caseRecommendationsForProgram({ industry: input.programIndustry, company: input.target?.company, program: input.target?.program }).map((item) => item.label);
  caseTypes.forEach((caseType) => {
    const browse = caseTypeBrowse(links, caseType, industry);
    if (browse) push({ key: `type-${caseType}`, kind: 'group', title: caseType, browse });
  });
  return { items, fromFit: groupSource };
}

export default function CasePoolRecommendations({
  target,
  fitRecommendations,
  programs,
  sessions = NO_SESSIONS,
}: {
  target: RecommendationTarget | null;
  fitRecommendations: PreparationRecommendation[];
  programs: ProgramRow[];
  /** The learner's completed practice sessions (lib/roadmapProgress), used for "Continue with the full case". */
  sessions?: PracticeSession[];
}) {
  const [links, setLinks] = useState<LinksModule | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Loaded after the roadmap paints: the case library is large and only this block needs it.
    const timer = window.setTimeout(() => {
      import('../../lib/casePoolLinks')
        .then((module) => {
          if (!cancelled) setLinks(module);
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    }, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const programIndustry = useMemo(() => {
    if (!target) return null;
    const row = programs.find((item) => (target.programId && item.program_id === target.programId)
      || (item.program_name === target.program && (!target.company || item.company === target.company)));
    return row?.industry ? String(row.industry) : null;
  }, [programs, target]);

  const continueCases = useMemo(() => (links ? links.continueFullCases(sessions) : []), [links, sessions]);

  const built = useMemo(
    () => (links ? buildCasePoolItems(links, { fitRecommendations, target, programIndustry, continueCases }) : null),
    [links, fitRecommendations, target, programIndustry, continueCases],
  );

  if (failed || !links || !built || built.items.length === 0) return null;
  const { items, fromFit } = built;
  const programLabel = target?.program || 'MT and consulting programs';
  const hasContinue = items.some((item) => item.kind === 'case' && Boolean(item.continues));
  const hasGroups = items.some((item) => item.kind === 'group');

  const track = (kind: PoolItem['kind'], key: string, extra: Record<string, unknown> = {}) => {
    trackStepView('my-roadmap', 'recommendation_open', { properties: { group: 'case_pool', topic: key, kind, placement: 'case_pool', ...extra } });
    trackAppSwitch('my-roadmap', 'case-drill-log', { trigger: 'roadmap_recommendation' });
  };

  const openCase = (item: Extract<PoolItem, { kind: 'case' }>) => {
    track('case', item.key, {
      case_id: item.caseId,
      ...(item.continues ? { source: 'case_drill_continue', continued_drills: item.continues } : {}),
    });
    links.openVerifiedPoolCase(item.caseId);
  };

  const browse = (key: string, kind: PoolItem['kind'], data: Browse, reason: string) => {
    track(kind, key, { filters: data.filters });
    links.openCasePoolBrowse({ filters: data.filters, reason });
  };

  return (
    <div className="mr-cp" data-testid="roadmap-case-pool">
      <style>{CASE_POOL_REC_CSS}</style>
      <p className="mr-cp-head"><Target /> Case Pool · full cases</p>
      <p className="mr-cp-sub" data-testid="roadmap-case-pool-source">
        {hasContinue && <>Continue with the full case behind the Case Drill questions you completed. </>}
        {fromFit
          ? <><b>From your Fit Assessment:</b> {fromFit.recommendedAction}</>
          : hasGroups
            ? <>Frequent case types for {programLabel}. Each opens Case Pool with matching filters already applied.</>
            : null}
      </p>
      <ul className="mr-cp-list">
        {items.map((item) => (
          <li key={item.key} className={`mr-cp-row is-${item.kind}`} data-testid={`roadmap-case-pool-${item.kind}`} data-item={item.kind === 'case' ? item.caseId : item.title}>
            <div className="mr-cp-main">
              <span className="mr-cp-title">{item.title}</span>
              {item.kind === 'case' ? (
                <span className="mr-cp-meta">
                  {item.continues
                    ? <>Continue with the full case · you completed {item.continues} Case Drill {item.continues === 1 ? 'question' : 'questions'} from it · ID {item.caseId}</>
                    : <>Opens this exact case in Case Pool · ID {item.caseId}</>}
                </span>
              ) : item.kind === 'group' ? (
                <span className="mr-cp-chips">
                  {item.browse.chips.map((chip) => <span key={chip} className="mr-cp-chip">{chip}</span>)}
                  <span className="mr-cp-count mr-num">{item.browse.count} {item.browse.count === 1 ? 'case' : 'cases'}</span>
                </span>
              ) : (
                <span className="mr-cp-note" role="note" data-testid="roadmap-case-pool-unavailable-note">
                  <Info /> This case is unavailable in Case Pool right now{item.related ? ' — browse related cases instead.' : '.'}
                </span>
              )}
            </div>
            {item.kind === 'case' ? (
              <button type="button" className="mr-btn mr-btn--ghost mr-btn--sm mr-cp-cta" onClick={() => openCase(item)} data-testid="roadmap-case-pool-open-case">
                Open case <ChevronRight />
              </button>
            ) : item.kind === 'group' ? (
              <button
                type="button"
                className="mr-btn mr-btn--ghost mr-btn--sm mr-cp-cta"
                onClick={() => browse(item.key, 'group', item.browse, `Recommended in My Roadmap: ${item.title} cases`)}
                data-testid="roadmap-case-pool-browse"
              >
                Browse cases <ChevronRight />
              </button>
            ) : item.related ? (
              <button
                type="button"
                className="mr-btn mr-btn--ghost mr-btn--sm mr-cp-cta"
                onClick={() => browse(item.key, 'unavailable', item.related as Browse, `Related to “${item.title}” (unavailable)`)}
                data-testid="roadmap-case-pool-browse-related"
              >
                Browse related cases <ChevronRight />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

const CASE_POOL_REC_CSS = `
.mr-cp { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--mr-line); min-width: 0; }
.mr-cp-head { margin: 0; display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--mr-red); }
.mr-cp-head svg { width: 14px; height: 14px; flex-shrink: 0; }
.mr-cp-sub { margin: 4px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-cp-sub b { color: var(--mr-ink); font-weight: 700; }
.mr-cp-list { list-style: none; margin: 10px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.mr-cp-row { display: flex; align-items: center; gap: 10px; min-width: 0; padding: 10px 12px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-surface); }
.mr-cp-row.is-case { border-color: var(--mr-red-line); }
.mr-cp-row.is-unavailable { background: var(--mr-bg); }
.mr-cp-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.mr-cp-title { font-size: 13.5px; font-weight: 800; color: var(--mr-ink); overflow-wrap: anywhere; }
.mr-cp-meta { font-size: 11.5px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-cp-chips { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; min-width: 0; }
.mr-cp-chip { display: inline-flex; max-width: 100%; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--mr-red-line); background: var(--mr-red-soft); font-size: 11px; font-weight: 700; color: var(--mr-ink-2); overflow-wrap: anywhere; }
.mr-cp-count { font-size: 11.5px; font-weight: 700; color: var(--mr-muted); }
.mr-cp-note { display: inline-flex; align-items: flex-start; gap: 5px; font-size: 11.5px; line-height: 1.45; color: var(--mr-ink-2); overflow-wrap: anywhere; }
.mr-cp-note svg { width: 13px; height: 13px; flex-shrink: 0; margin-top: 1px; color: var(--mr-muted); }
.mr-cp-cta { flex-shrink: 0; }
@container (max-width: 720px) {
  .mr-cp-list { grid-template-columns: minmax(0, 1fr); }
  .mr-cp-row { flex-wrap: wrap; }
  .mr-cp-cta { width: 100%; justify-content: center; }
}
`;
