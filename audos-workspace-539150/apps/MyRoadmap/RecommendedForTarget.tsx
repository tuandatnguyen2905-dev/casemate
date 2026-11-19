// My Roadmap — "Recommended for Your Target Program": the only section of the
// page with learn/practice CTAs.
//
// Three equal columns (Domain Knowledge, Aptitude Test, Case Drill). Each
// column leads with one primary recommendation (one CTA); "Explore All
// Recommendations" reveals further topics inside the same columns. Topics come
// from lib/candidateReviews.ts (founder-entered candidate reviews, falling back
// to program-based general preparation), plus the program's Domain Knowledge
// study areas and industry case types. A card only shows Source Evidence when a
// matching candidate review exists; otherwise it is labelled a general
// preparation suggestion. Progress bars reuse each practice app's own data.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Hexagon,
  Info,
  Loader2,
  MessageSquarePlus,
  Quote,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  CANDIDATE_REVIEWS_UPDATED_EVENT,
  EVIDENCE_DISCLAIMER,
  GROUP_LABEL,
  GROUP_ORDER,
  REVIEW_TYPES,
  buildRecommendations,
  topicByTag,
  topicsForGroup,
} from '../../lib/candidateReviews';
import type {
  CandidateReview,
  EvidenceItem,
  MatchKind,
  ProgramRow,
  RecommendationGroup,
  RecommendationTarget,
  RecommendationTopic,
} from '../../lib/candidateReviews';
import { READINESS_UPDATED_EVENT } from '../../lib/readinessScore';
import { caseRecommendationsForProgram } from '../../lib/caseTypeRecommendations';
import type { CaseTypeRecommendation } from '../../lib/caseTypeRecommendations';
import { resolveSectorRoute } from '../../lib/domainKnowledgeRoute';
import type { PreparationRecommendation } from '../../lib/prepRoadmap';
import { trackStepView } from '../../lib/engagementTracking';
import { deckFor } from '../IndustryKnowledge/learningDecks';
import { knowledgeRecommendationsForProgram, studyCardsForSubcategory } from '../IndustryKnowledge/industrySubcategories';
import type { KnowledgeRecommendation } from '../IndustryKnowledge/industrySubcategories';
import {
  domainSectorProgress,
  loadAptitudeFamilyProgress,
  loadCandidateReviews,
  loadCaseDrillSkillProgress,
  loadDomainCatalog,
  loadProgramRows,
  openKnowledgeAreaRoute,
  openRecommendedTopic,
  readCompletedLessons,
  ReviewStorageMissingError,
} from './recommendationData';
import type { CaseSkillProgress, DomainCatalog, TopicProgress } from './recommendationData';
import CandidateReviewAdmin from './CandidateReviewAdmin';

const PROGRESS_REFRESH_MIN_MS = 15000;
const EXCERPT_PREVIEW_CHARS = 220;
/** Topics revealed per column by "Explore All Recommendations". */
const EXPLORE_PER_GROUP = 4;

const GROUP_ICON: Record<RecommendationGroup, typeof BookOpen> = {
  domain: BookOpen,
  aptitude: Hexagon,
  case_drill: Zap,
};

const GROUP_UNIT: Record<RecommendationGroup, string> = {
  domain: 'lessons',
  aptitude: 'tests',
  case_drill: 'drills',
};

const GROUP_CTA: Record<RecommendationGroup, string> = {
  domain: 'Start learning',
  aptitude: 'Start practice',
  case_drill: 'Start practice',
};

const GROUP_DESTINATION: Record<RecommendationGroup, string> = {
  domain: 'Domain Knowledge',
  aptitude: 'Aptitude Test',
  case_drill: 'Case Drill',
};

const FIT_FUNCTION: Record<RecommendationGroup, PreparationRecommendation['casemateFunction']> = {
  domain: 'Domain Knowledge',
  aptitude: 'Aptitude Test',
  case_drill: 'Case Drill',
};

const KIND_BADGE: Record<MatchKind, { label: string; className: string }> = {
  exact: { label: 'From candidate reviews', className: 'mr-badge mr-badge--exact' },
  related: { label: 'Related candidate reviews', className: 'mr-badge mr-badge--related' },
  fallback: { label: 'General preparation suggestion', className: 'mr-badge mr-badge--general' },
};

const MATCH_REASON_LABEL: Record<EvidenceItem['reason'], string> = {
  program: 'Same program',
  company: 'Same company',
  industry: 'Same industry',
};

const APTITUDE_DESCRIPTION: Record<string, string> = {
  numerical: 'Read tables and charts and work out percentages, ratios and growth under time pressure.',
  verbal: 'Read business passages and judge whether each statement is true, false or cannot say.',
  logical: 'Find the rule behind a sequence and apply it to the next item.',
  inductive: 'Spot the pattern across a series of figures and choose what comes next.',
  deductive: 'Accept only the conclusions that follow strictly from the facts given.',
  diagrammatic: 'Follow process diagrams and work out what each operator does to its inputs.',
  error_checking: 'Compare records quickly and accurately to catch mismatches.',
  spatial: 'Rotate and fold shapes mentally to match different views.',
  situational: 'Pick the most and least effective responses to realistic workplace situations.',
  critical: 'Evaluate arguments, assumptions and inferences in Watson-Glaser style questions.',
  mechanical: 'Apply basic physics such as levers, pulleys and gears to practical problems.',
  in_tray: 'Prioritise an inbox of emails and tasks the way a manager would.',
};

const CASE_DESCRIPTION: Record<string, string> = {
  structures: 'Build MECE issue trees for market-entry, profitability and operations questions.',
  calculations: 'Work through case maths such as margins, break-even and growth, step by step.',
  'market-sizing': 'Estimate a market from first principles with a clear, checkable decomposition.',
  charts: 'Read exhibits quickly and pull out the insight that answers the question.',
  creativity: 'Generate structured, prioritised ideas for growth and marketing questions.',
};

// FMCG study areas are named by learning-deck slug, which the Domain Knowledge
// router does not map to a sub-industry on its own.
const FMCG_DECK_SECTOR: Record<string, string> = {
  'fmcg-dairy': 'fmcg-dairy',
  'fmcg-beer': 'fmcg-beverages-alc',
  'fmcg-beverages': 'fmcg-beverages-na',
  'fmcg-snacks': 'fmcg-packaged-food',
  'fmcg-seasonings': 'fmcg-packaged-food',
  'fmcg-personal-home-care': 'fmcg-household',
};

// lib/caseTypeRecommendations names Case Drill skills by their older ids.
const CASE_TYPE_SKILL: Record<CaseTypeRecommendation['drillSkillId'], string> = {
  market_sizing: 'market-sizing',
  case_math: 'calculations',
  structures: 'structures',
  charts: 'charts',
};

export type ReviewsState = 'loading' | 'ready' | 'error' | 'missing';
type LoadState = 'loading' | 'ready' | 'error';

interface RecItem {
  key: string;
  group: RecommendationGroup;
  title: string;
  subtitle?: string;
  description: string;
  why: string;
  kind: MatchKind;
  evidence: EvidenceItem[];
  caseTypes: string[];
  topic?: RecommendationTopic;
  area?: KnowledgeRecommendation;
}

interface Props {
  target: RecommendationTarget | null;
  sessionId?: string | null;
  userKey: string;
  isAdmin: boolean;
  /** Gap-based recommendations saved with the roadmap from the Fit Assessment. */
  fitRecommendations?: PreparationRecommendation[];
}

type DeckProgressMap = Record<string, { completed?: string[] }>;

function readDeckProgress(userKey: string): DeckProgressMap {
  try {
    const cached = JSON.parse(localStorage.getItem(`casemate-domain-progress-v1:${userKey}`) || 'null');
    return cached?.progress && typeof cached.progress === 'object' ? cached.progress : {};
  } catch {
    return {};
  }
}

function knowledgeAreaProgress(area: KnowledgeRecommendation, progress: DeckProgressMap): TopicProgress | null {
  const deck = deckFor(area.industrySlug);
  if (!deck) return null;
  const completed = new Set(progress[area.industrySlug]?.completed || []);
  const cards = area.subcategoryId
    ? studyCardsForSubcategory(area.industrySlug, area.subcategoryId, deck.cards).map((entry) => entry.card)
    : area.pillar
      ? deck.cards.filter((card) => card.topic === area.pillar)
      : deck.cards;
  const ids = [...new Set(cards.map((card) => card.id))];
  return { done: ids.filter((id) => completed.has(id)).length, total: ids.length };
}

function targetLabel(target: RecommendationTarget | null): string {
  if (!target) return '';
  return [target.program, target.company, target.position].filter(Boolean).join(' · ');
}

function topicDescription(topic: RecommendationTopic, lessonCount: number | null): string {
  if (topic.group === 'aptitude') return APTITUDE_DESCRIPTION[topic.contentId] || 'Practise this online test format.';
  if (topic.group === 'case_drill') return CASE_DESCRIPTION[topic.contentId] || 'Practise this case skill.';
  const lessons = lessonCount && lessonCount > 0 ? `${lessonCount} Domain Knowledge lessons` : 'Domain Knowledge lessons';
  return `${lessons} on how ${topic.title} businesses make money, compete and operate.`;
}

function ProgressBlock({ progress, loading, unit }: { progress: TopicProgress | null; loading: boolean; unit: string }) {
  if (progress && progress.total > 0) {
    const pct = Math.min(100, Math.round((progress.done / progress.total) * 100));
    const complete = progress.done >= progress.total;
    return (
      <div data-testid="recommendation-progress">
        <div className="mr-rec-progress-row">
          <span>Learning progress</span>
          <span className="mr-num">{Math.min(progress.done, progress.total)}/{progress.total} {unit}</span>
        </div>
        <div className={`mr-bar mr-bar--thin${complete ? ' is-done' : ''}`} role="progressbar" aria-valuemin={0} aria-valuemax={progress.total} aria-valuenow={Math.min(progress.done, progress.total)}>
          <span style={{ width: `${Math.max(pct > 0 ? 3 : 0, pct)}%` }} />
        </div>
      </div>
    );
  }
  if (loading) {
    return <span className="mr-rec-loading"><Loader2 size={13} className="mr-spin" /> Checking your progress…</span>;
  }
  return null;
}

function EvidenceExcerpt({ item }: { item: EvidenceItem }) {
  const [open, setOpen] = useState(false);
  const preview = item.excerpt.length > EXCERPT_PREVIEW_CHARS ? `${item.excerpt.slice(0, EXCERPT_PREVIEW_CHARS).trimEnd()}…` : item.excerpt;
  const expandable = preview !== item.fullText;
  const typeLabel = REVIEW_TYPES.find((type) => type.id === item.reviewType)?.label;
  const meta = [item.company, item.program, item.position, typeLabel, item.sourceNote].filter(Boolean).join(' · ');
  return (
    <li className="mr-evidence" data-testid={`evidence-review-${item.reviewId}`}>
      <span className="mr-badge mr-badge--general">{MATCH_REASON_LABEL[item.reason]}</span>
      <blockquote lang="vi">
        <Quote size={12} style={{ marginRight: 4, verticalAlign: '-1px' }} />
        {open ? item.fullText : preview}
      </blockquote>
      {expandable && (
        <button type="button" className="mr-link" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          {open ? 'Show less' : 'Read full review'}
        </button>
      )}
      <p className="mr-evidence-meta">{meta}</p>
    </li>
  );
}

export default function RecommendedForTarget({ target, sessionId, userKey, isAdmin, fitRecommendations = [] }: Props) {
  const [reviews, setReviews] = useState<CandidateReview[]>([]);
  const [reviewsState, setReviewsState] = useState<ReviewsState>('loading');
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [aptitude, setAptitude] = useState<Record<string, TopicProgress> | null>(null);
  const [caseDrill, setCaseDrill] = useState<Record<string, CaseSkillProgress> | null>(null);
  const [practiceState, setPracticeState] = useState<LoadState>('loading');
  const [domainCatalog, setDomainCatalog] = useState<DomainCatalog | null>(null);
  const [domainState, setDomainState] = useState<LoadState>('loading');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => readCompletedLessons());
  const [deckProgress, setDeckProgress] = useState<DeckProgressMap>(() => readDeckProgress(userKey));
  const [exploreOpen, setExploreOpen] = useState(false);
  const [detail, setDetail] = useState<RecItem | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const progressFetchedAtRef = useRef(0);
  const reviewRequestRef = useRef(0);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const detailCloseRef = useRef<HTMLButtonElement>(null);

  const refreshReviews = useCallback(async () => {
    const requestId = ++reviewRequestRef.current;
    try {
      const rows = await loadCandidateReviews();
      if (requestId !== reviewRequestRef.current) return;
      setReviews(rows);
      setReviewsState('ready');
    } catch (error) {
      if (requestId !== reviewRequestRef.current) return;
      // Without readable reviews every learner simply gets general preparation.
      setReviews([]);
      setReviewsState(error instanceof ReviewStorageMissingError ? 'missing' : 'error');
    }
  }, []);

  useEffect(() => {
    void refreshReviews();
    const onUpdated = () => void refreshReviews();
    window.addEventListener(CANDIDATE_REVIEWS_UPDATED_EVENT, onUpdated);
    return () => window.removeEventListener(CANDIDATE_REVIEWS_UPDATED_EVENT, onUpdated);
  }, [refreshReviews]);

  useEffect(() => {
    let cancelled = false;
    void loadProgramRows().then((rows) => {
      if (!cancelled) setPrograms(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshPractice = useCallback(async () => {
    progressFetchedAtRef.current = Date.now();
    const [aptitudeResult, caseResult] = await Promise.allSettled([
      loadAptitudeFamilyProgress(userKey),
      loadCaseDrillSkillProgress(),
    ]);
    if (aptitudeResult.status === 'fulfilled') setAptitude(aptitudeResult.value);
    if (caseResult.status === 'fulfilled') setCaseDrill(caseResult.value);
    setPracticeState(aptitudeResult.status === 'rejected' && caseResult.status === 'rejected' ? 'error' : 'ready');
  }, [userKey]);

  useEffect(() => {
    void refreshPractice();
    const onPractice = () => void refreshPractice();
    window.addEventListener(READINESS_UPDATED_EVENT, onPractice);
    return () => window.removeEventListener(READINESS_UPDATED_EVENT, onPractice);
  }, [refreshPractice]);

  // The lesson catalogue resolves every Domain Knowledge sector, so build it
  // once per page after the roadmap has painted.
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      loadDomainCatalog()
        .then((catalog) => {
          if (cancelled) return;
          setDomainCatalog(catalog);
          setDomainState('ready');
        })
        .catch(() => {
          if (!cancelled) setDomainState('error');
        });
    }, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  // Coming back from a practice app should show the new progress without a reload.
  useEffect(() => {
    const refresh = () => {
      setCompletedLessons(readCompletedLessons());
      setDeckProgress(readDeckProgress(userKey));
      if (Date.now() - progressFetchedAtRef.current >= PROGRESS_REFRESH_MIN_MS) void refreshPractice();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent)?.detail?.appId === 'my-roadmap') refresh();
    };
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);
    window.addEventListener('openApp', onOpenApp);
    window.addEventListener('casemate:domain-progress-updated', refresh);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('openApp', onOpenApp);
      window.removeEventListener('casemate:domain-progress-updated', refresh);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refreshPractice, userKey]);

  const targetKey = `${target?.company || ''}|${target?.program || ''}|${target?.position || ''}`;
  useEffect(() => {
    setExploreOpen(false);
    setDetail(null);
  }, [targetKey]);

  const result = useMemo(
    () => buildRecommendations({
      target,
      reviews,
      programs,
      availableSectorIds: domainCatalog?.ids ?? null,
      maxPerGroup: EXPLORE_PER_GROUP + 1,
    }),
    [target, reviews, programs, domainCatalog],
  );

  const lessonCount = useCallback(
    (sectorId: string) => domainSectorProgress(domainCatalog, sectorId, completedLessons)?.total ?? null,
    [domainCatalog, completedLessons],
  );

  const columns = useMemo(() => {
    const limit = EXPLORE_PER_GROUP + 1;
    const fromTopic = (topic: RecommendationTopic, why: string, kind: MatchKind = 'fallback', evidence: EvidenceItem[] = []): RecItem => ({
      key: topic.tag,
      group: topic.group,
      title: topic.title,
      subtitle: topic.groupLabel,
      description: topicDescription(topic, topic.group === 'domain' ? lessonCount(topic.contentId) : null),
      why,
      kind,
      evidence,
      caseTypes: [],
      topic,
    });
    const isSectorAvailable = (id: string) => (domainCatalog ? domainCatalog.ids.includes(id) : !!topicByTag(`dk:${id}`));

    const out = {} as Record<RecommendationGroup, RecItem[]>;
    GROUP_ORDER.forEach((group) => {
      out[group] = result.groups[group].map((card) => fromTopic(card.topic, card.why, card.kind, card.kind === 'fallback' ? [] : card.evidence));
    });

    // Domain Knowledge study areas for the program (formerly "Knowledge Areas to Master").
    if (target?.program) {
      knowledgeRecommendationsForProgram(target.program, target.company).forEach((area) => {
        const deckSector = FMCG_DECK_SECTOR[area.industrySlug];
        const route = deckSector && isSectorAvailable(deckSector)
          ? { categoryId: deckSector }
          : resolveSectorRoute({ industrySlug: area.industrySlug, subcategoryId: area.subcategoryId }, isSectorAvailable);
        const sectorTopic = route?.categoryId ? topicByTag(`dk:${route.categoryId}`) : undefined;
        if (sectorTopic) {
          if (!out.domain.some((item) => item.key === sectorTopic.tag)) out.domain.push(fromTopic(sectorTopic, area.why));
          return;
        }
        const key = `area:${area.industrySlug}:${area.subcategoryId || area.pillar || area.name}`;
        if (out.domain.some((item) => item.key === key)) return;
        out.domain.push({
          key,
          group: 'domain',
          title: area.name,
          subtitle: 'Domain Knowledge study area',
          description: 'A study path of Domain Knowledge cards for this program’s industry.',
          why: area.why,
          kind: 'fallback',
          evidence: [],
          caseTypes: [],
          area,
        });
      });
    }

    // Remaining test formats and case skills, after the program-ranked ones.
    (['aptitude', 'case_drill'] as RecommendationGroup[]).forEach((group) => {
      topicsForGroup(group).forEach((topic) => {
        if (out[group].length >= limit || out[group].some((item) => item.key === topic.tag)) return;
        out[group].push(fromTopic(topic, group === 'aptitude'
          ? 'Another online test format used in MT and graduate recruitment.'
          : 'Another core case skill tested in MT and consulting interviews.'));
      });
    });

    // Industry case types (formerly "Case Types to Practice") attach to the Case Drill skill that trains them.
    if (target) {
      caseRecommendationsForProgram({ company: target.company, program: target.program }).forEach((caseType) => {
        const skill = CASE_TYPE_SKILL[caseType.drillSkillId];
        let item = out.case_drill.find((entry) => entry.topic?.contentId === skill);
        if (!item) {
          const topic = topicByTag(`cd:${skill}`);
          if (!topic) return;
          item = fromTopic(topic, 'A frequent case type for your target program’s industry.');
          out.case_drill.push(item);
        }
        if (!item.caseTypes.includes(caseType.label)) item.caseTypes.push(caseType.label);
      });
    }

    GROUP_ORDER.forEach((group) => {
      out[group] = out[group].slice(0, limit);
    });
    return out;
  }, [result, target, domainCatalog, lessonCount]);

  const progressFor = (item: RecItem): { progress: TopicProgress | null; loading: boolean } => {
    if (item.area) return { progress: knowledgeAreaProgress(item.area, deckProgress), loading: false };
    const id = item.topic?.contentId || '';
    if (item.group === 'domain') {
      return { progress: domainSectorProgress(domainCatalog, id, completedLessons), loading: domainState === 'loading' };
    }
    if (item.group === 'aptitude') return { progress: aptitude?.[id] ?? null, loading: practiceState === 'loading' };
    return { progress: caseDrill?.[id] ?? null, loading: practiceState === 'loading' };
  };

  const openContent = (item: RecItem, placement: 'primary' | 'details') => {
    trackStepView('my-roadmap', 'recommendation_open', {
      properties: { group: item.group, topic: item.key, kind: item.kind, placement },
    });
    setDetail(null);
    if (item.area) {
      openKnowledgeAreaRoute(item.area);
      return;
    }
    if (item.topic) openRecommendedTopic(item.topic, { nextQuestionId: caseDrill?.[item.topic.contentId]?.nextQuestionId });
  };

  const showDetail = (item: RecItem, trigger: HTMLElement | null) => {
    detailTriggerRef.current = trigger;
    trackStepView('my-roadmap', 'recommendation_details', { properties: { group: item.group, topic: item.key, kind: item.kind } });
    setDetail(item);
  };

  const closeDetail = useCallback(() => {
    setDetail(null);
    const trigger = detailTriggerRef.current;
    if (trigger) window.setTimeout(() => trigger.focus(), 0);
  }, []);

  useEffect(() => {
    if (!detail) return;
    detailCloseRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detail, closeDetail]);

  const extraCount = GROUP_ORDER.reduce((sum, group) => sum + Math.max(0, columns[group].length - 1), 0);
  const allGeneral = GROUP_ORDER.every((group) => columns[group].every((item) => item.kind === 'fallback'));
  const matched = result.matchedReviewCount;
  const label = targetLabel(target);
  const summary = !target
    ? 'Choose a target in Fit Assessment to tailor these to your program.'
    : reviewsState === 'loading'
      ? 'Checking candidate reviews…'
      : matched.exact > 0
        ? `Based on ${matched.exact} candidate review${matched.exact === 1 ? '' : 's'} for this program${matched.related > 0 ? ` and ${matched.related} related` : ''}, plus general preparation.`
        : matched.related > 0
          ? `No reviews for this exact program yet — using ${matched.related} related review${matched.related === 1 ? '' : 's'} plus general preparation.`
          : 'No candidate reviews for this program yet, so these are general preparation suggestions based on its industry and test formats.';

  const detailProgress = detail ? progressFor(detail) : null;
  const detailIsPrimary = detail ? columns[detail.group][0]?.key === detail.key : false;
  const detailFitGaps = detail && detailIsPrimary
    ? fitRecommendations
      .filter((rec) => rec && rec.casemateFunction === FIT_FUNCTION[detail.group] && (rec.gap || rec.reason))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .slice(0, 2)
    : [];

  return (
    <>
    <section className="mr-card" data-testid="roadmap-recommendations" aria-labelledby="mr-rec-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow">What to do next</span>
          <h2 className="mr-h2" id="mr-rec-title">Recommended for Your Target Program</h2>
          {target ? (
            <p className="mr-sub">What to learn and practise next for <strong>{label}</strong>.</p>
          ) : (
            <p className="mr-sub">General preparation for MT and consulting programs.</p>
          )}
          <p className="mr-sub" data-testid="recommendation-summary">{summary}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {allGeneral && (
            <span className="mr-badge mr-badge--general" data-testid="recommendation-general-badge" title="Gợi ý chuẩn bị chung">
              <Info size={12} /> General preparation suggestions
            </span>
          )}
          {isAdmin && (
            <button
              type="button"
              className="mr-btn mr-btn--ghost mr-btn--sm"
              onClick={() => setAdminOpen((value) => !value)}
              aria-expanded={adminOpen}
              data-testid="button-add-candidate-review"
              lang="vi"
            >
              {adminOpen ? <X /> : <MessageSquarePlus />}
              Thêm review ứng viên
            </button>
          )}
        </div>
      </div>

      {isAdmin && adminOpen && (
        <div style={{ marginBottom: 16 }}>
          <CandidateReviewAdmin
            sessionId={sessionId}
            reviews={reviews}
            reviewsState={reviewsState}
            programs={programs}
            onRetry={() => void refreshReviews()}
            onClose={() => setAdminOpen(false)}
          />
        </div>
      )}

      <div className="mr-rec-grid">
        {GROUP_ORDER.map((group) => {
          const Icon = GROUP_ICON[group];
          const items = columns[group];
          const primary = items[0];
          const extras = items.slice(1);
          return (
            <div key={group} className="mr-rec-col" data-testid={`recommendation-group-${group}`}>
              <div className="mr-rec-col-head">
                <Icon />
                <span>{GROUP_LABEL[group]}</span>
                {exploreOpen && extras.length > 0 && <span className="mr-rec-col-count">{items.length} topics</span>}
              </div>
              {primary ? (() => {
                const { progress, loading } = progressFor(primary);
                const badge = KIND_BADGE[primary.kind];
                return (
                  <article className="mr-rec-card" data-testid={`recommendation-card-${primary.key}`} data-kind={primary.kind}>
                    <div className="mr-rec-card-top">
                      <span className="mr-rec-kicker">Top pick</span>
                      <span className={badge.className} data-testid="recommendation-label">{badge.label}</span>
                    </div>
                    <button
                      type="button"
                      className="mr-rec-title"
                      onClick={(event) => showDetail(primary, event.currentTarget)}
                      aria-haspopup="dialog"
                      data-testid="recommendation-title"
                    >
                      {primary.title}
                      {primary.subtitle && <small>{primary.subtitle}</small>}
                    </button>
                    <p className="mr-rec-desc">{primary.description}</p>
                    <p className="mr-rec-why">
                      <b>Why recommended</b>
                      {primary.why}
                      {primary.caseTypes.length > 0 && <> Covers: {primary.caseTypes.join(', ')}.</>}
                    </p>
                    <ProgressBlock progress={progress} loading={loading} unit={GROUP_UNIT[group]} />
                    <div className="mr-rec-actions">
                      <button
                        type="button"
                        className="mr-btn mr-btn--primary mr-btn--block"
                        onClick={() => openContent(primary, 'primary')}
                        data-testid="recommendation-cta"
                      >
                        {GROUP_CTA[group]} <ChevronRight />
                      </button>
                      <button
                        type="button"
                        className="mr-link"
                        onClick={(event) => showDetail(primary, event.currentTarget)}
                        aria-haspopup="dialog"
                        data-testid="recommendation-details"
                      >
                        View details
                      </button>
                    </div>
                  </article>
                );
              })() : (
                <p className="mr-rec-empty">No recommendation available right now.</p>
              )}
              {exploreOpen && extras.length > 0 && (
                <div className="mr-rec-more" id={`mr-rec-more-${group}`} data-testid={`recommendation-more-${group}`}>
                  {extras.map((item) => {
                    const { progress } = progressFor(item);
                    const badge = KIND_BADGE[item.kind];
                    const pct = progress && progress.total > 0 ? Math.min(100, Math.round((progress.done / progress.total) * 100)) : null;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        className="mr-rec-mini"
                        onClick={(event) => showDetail(item, event.currentTarget)}
                        aria-haspopup="dialog"
                        data-testid={`recommendation-card-${item.key}`}
                        data-kind={item.kind}
                      >
                        <span className="mr-rec-mini-top">
                          <span className="mr-rec-mini-title">
                            {item.title}
                            {item.subtitle && <small>{item.subtitle}</small>}
                          </span>
                          {item.kind !== 'fallback' && <span className={badge.className}>{badge.label}</span>}
                        </span>
                        <span className="mr-rec-mini-why">
                          {item.why}
                          {item.caseTypes.length > 0 ? ` Covers: ${item.caseTypes.join(', ')}.` : ''}
                        </span>
                        <span className="mr-rec-mini-foot">
                          {pct !== null && progress ? (
                            <>
                              <span className={`mr-bar mr-bar--thin${pct >= 100 ? ' is-done' : ''}`} aria-hidden="true">
                                <span style={{ width: `${Math.max(pct > 0 ? 3 : 0, pct)}%` }} />
                              </span>
                              <span className="mr-num">{Math.min(progress.done, progress.total)}/{progress.total}</span>
                            </>
                          ) : (
                            <span style={{ flex: 1 }}>View details</span>
                          )}
                          <ChevronRight />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {extraCount > 0 && (
        <div className="mr-explore">
          <button
            type="button"
            className="mr-btn mr-btn--ghost"
            aria-expanded={exploreOpen}
            aria-controls={GROUP_ORDER.map((group) => `mr-rec-more-${group}`).join(' ')}
            onClick={() => setExploreOpen((value) => !value)}
            data-testid="button-explore-recommendations"
          >
            {exploreOpen ? 'Show fewer recommendations' : `Explore All Recommendations (${extraCount} more)`}
            <ChevronDown />
          </button>
        </div>
      )}
    </section>

      {detail && (
        <div
          className="mr-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDetail();
          }}
          data-testid="recommendation-detail-backdrop"
        >
          <div className="mr-modal" role="dialog" aria-modal="true" aria-labelledby="mr-rec-detail-title" data-testid="recommendation-detail">
            <button ref={detailCloseRef} type="button" className="mr-modal-close" onClick={closeDetail} aria-label="Close details">
              <X size={18} />
            </button>
            <div className="mr-modal-kicker">
              {(() => {
                const Icon = GROUP_ICON[detail.group];
                return <Icon />;
              })()}
              {GROUP_LABEL[detail.group]}
            </div>
            <h3 id="mr-rec-detail-title">{detail.title}</h3>
            {detail.subtitle && <p className="mr-modal-sub">{detail.subtitle}</p>}
            <div className="mr-modal-badges">
              <span className={KIND_BADGE[detail.kind].className}>{KIND_BADGE[detail.kind].label}</span>
            </div>

            <div className="mr-modal-section">
              <h4>What you’ll work on</h4>
              <p>{detail.description}</p>
            </div>

            <div className="mr-modal-section">
              <h4>Why this is recommended</h4>
              <p>{detail.why}</p>
              {detail.caseTypes.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ marginBottom: 6 }}>Case types this skill covers for your target industry:</p>
                  <div className="mr-modal-tags">
                    {detail.caseTypes.map((caseType) => <span key={caseType} className="mr-modal-tag">{caseType}</span>)}
                  </div>
                </div>
              )}
              {detailFitGaps.length > 0 && (
                <ul style={{ marginTop: 10 }} data-testid="recommendation-fit-gaps">
                  {detailFitGaps.map((gap) => (
                    <li key={gap.id} className="mr-modal-gap">
                      <b>From your Fit Assessment:</b> {gap.gap || gap.reason}
                      {gap.recommendedAction ? <> — {gap.recommendedAction}</> : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mr-modal-section" data-testid="recommendation-evidence-section">
              <h4>Source evidence</h4>
              {detail.evidence.length > 0 ? (
                <>
                  <ul data-testid="recommendation-evidence">
                    {detail.evidence.map((item) => <EvidenceExcerpt key={`${item.reviewId}-${item.level}`} item={item} />)}
                  </ul>
                  <p className="mr-modal-note" lang="vi" data-testid="recommendation-disclaimer"><Info /> {EVIDENCE_DISCLAIMER}</p>
                </>
              ) : (
                <p className="mr-modal-note" style={{ marginTop: 0 }}>
                  <Info /> No candidate reviews mention this for your target program yet, so this is a general preparation suggestion.
                </p>
              )}
            </div>

            {detailProgress && (detailProgress.progress?.total || detailProgress.loading) ? (
              <div className="mr-modal-section">
                <h4>Your progress</h4>
                <ProgressBlock progress={detailProgress.progress} loading={detailProgress.loading} unit={GROUP_UNIT[detail.group]} />
              </div>
            ) : null}

            <div className="mr-modal-foot">
              <button type="button" className="mr-btn mr-btn--ghost" onClick={closeDetail}>Close</button>
              <button
                type="button"
                className="mr-btn mr-btn--primary"
                onClick={() => openContent(detail, 'details')}
                data-testid="recommendation-detail-cta"
              >
                {detail.group === 'domain' ? <BookOpen /> : <Sparkles />}
                Open in {GROUP_DESTINATION[detail.group]}
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
