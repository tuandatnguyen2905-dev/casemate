// My Roadmap — section 4, "Recommended for you": the page's single action hub and
// the only section with learn/practice CTAs.
//
// Exactly three primary cards (Domain Knowledge, Aptitude Test, Case Drill), one
// CTA each, routed to the module with the topic prefiltered. "Explore more topics"
// expands the remaining topics in place. Topics come from lib/candidateReviews.ts
// (founder-entered candidate reviews, falling back to program-based general
// preparation), plus the program's Domain Knowledge study areas and industry case
// types. A card only cites candidate reviews when a matching review exists;
// otherwise it is labelled a general preparation suggestion.
//
// Two orderings of the same topics:
//   Smart Picks  — the Today's Focus weak skill first (Aptitude Test, Case Drill),
//                  then the first program-ranked topic the learner has not finished
//   Program Fit  — ranked only by the target program and its candidate reviews

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
import InfoPopover from './InfoPopover';
import { FocusAnnotationLine } from './TodaysFocus';
import { focusAnnotationFor } from '../../lib/skillFocus';
import type { SkillFocus } from '../../lib/skillFocus';

const PROGRESS_REFRESH_MIN_MS = 15000;
const EXCERPT_PREVIEW_CHARS = 220;
/** Topics per group revealed by "Explore more topics". */
const EXPLORE_PER_GROUP = 4;

type RecMode = 'smart' | 'program';

const REC_MODES: Array<{ id: RecMode; label: string }> = [
  { id: 'smart', label: 'Smart Picks' },
  { id: 'program', label: 'Program Fit' },
];

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

const GROUP_CTA_SHORT: Record<RecommendationGroup, string> = {
  domain: 'Learn',
  aptitude: 'Practise',
  case_drill: 'Practise',
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
  numerical: 'Percentages, ratios and growth from tables and charts, under time pressure.',
  verbal: 'Judge statements about business passages as true, false or cannot say.',
  logical: 'Find the rule behind a sequence and apply it.',
  inductive: 'Spot the pattern across a series of figures.',
  deductive: 'Accept only conclusions that follow strictly from the facts.',
  diagrammatic: 'Work out what each operator in a process diagram does.',
  error_checking: 'Compare records quickly and catch mismatches.',
  spatial: 'Rotate and fold shapes mentally to match views.',
  situational: 'Pick the most and least effective responses at work.',
  critical: 'Evaluate arguments, assumptions and inferences.',
  mechanical: 'Apply levers, pulleys and gears to practical problems.',
  in_tray: 'Prioritise an inbox the way a manager would.',
};

const CASE_DESCRIPTION: Record<string, string> = {
  structures: 'Build MECE issue trees for entry, profitability and operations cases.',
  calculations: 'Margins, break-even and growth maths, step by step.',
  'market-sizing': 'Estimate a market with a clear, checkable decomposition.',
  charts: 'Read exhibits fast and pull out the insight that answers the question.',
  creativity: 'Generate structured, prioritised ideas for growth questions.',
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
  /** Weakest measured skill per feature (Today's Focus). */
  skillFocus?: SkillFocus | null;
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

function recModeKey(userKey: string): string {
  return `casemate-roadmap-rec-mode:v1:${userKey}`;
}

function readRecMode(userKey: string): RecMode {
  try {
    return localStorage.getItem(recModeKey(userKey)) === 'program' ? 'program' : 'smart';
  } catch {
    return 'smart';
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
  const lessons = lessonCount && lessonCount > 0 ? `${lessonCount} lessons` : 'Lessons';
  return `${lessons} on how ${topic.title} businesses make money, compete and operate.`;
}

function isUnfinished(progress: TopicProgress | null): boolean {
  return !progress || progress.total <= 0 || progress.done < progress.total;
}

function ProgressBlock({ progress, loading, unit }: { progress: TopicProgress | null; loading: boolean; unit: string }) {
  if (progress && progress.total > 0) {
    const pct = Math.min(100, Math.round((progress.done / progress.total) * 100));
    const complete = progress.done >= progress.total;
    return (
      <div data-testid="recommendation-progress">
        <div className="mr-rec-progress-row">
          <span>Your progress</span>
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

export default function RecommendedForTarget({ target, sessionId, userKey, isAdmin, fitRecommendations = [], skillFocus = null }: Props) {
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
  const [mode, setMode] = useState<RecMode>(() => readRecMode(userKey));
  const [exploreOpen, setExploreOpen] = useState(false);
  const [detail, setDetail] = useState<RecItem | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const progressFetchedAtRef = useRef(0);
  const reviewRequestRef = useRef(0);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const detailCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMode(readRecMode(userKey));
  }, [userKey]);

  const chooseMode = (next: RecMode) => {
    setMode(next);
    try {
      localStorage.setItem(recModeKey(userKey), next);
    } catch {
      // The choice still applies for this visit.
    }
  };

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

  // Program Fit order: the program-ranked topics, then the remaining formats and skills.
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

    // The topic behind a Today's Focus weakness is always reachable (never duplicated).
    (['aptitude', 'case_drill'] as RecommendationGroup[]).forEach((group) => {
      const tile = group === 'aptitude' ? skillFocus?.aptitude : skillFocus?.caseDrill;
      if (!tile || tile.status !== 'ready') return;
      if (out[group].some((item) => item.topic?.contentId === tile.skill.skillId)) return;
      const topic = topicByTag(`${group === 'aptitude' ? 'apt' : 'cd'}:${tile.skill.skillId}`);
      if (!topic) return;
      out[group].push(fromTopic(topic, group === 'aptitude'
        ? 'Your lowest measured Aptitude Test category right now.'
        : 'Your lowest measured Case Drill skill right now.'));
    });
    return out;
  }, [result, target, domainCatalog, lessonCount, skillFocus]);

  const progressFor = useCallback((item: RecItem): { progress: TopicProgress | null; loading: boolean } => {
    if (item.area) return { progress: knowledgeAreaProgress(item.area, deckProgress), loading: false };
    const id = item.topic?.contentId || '';
    if (item.group === 'domain') {
      return { progress: domainSectorProgress(domainCatalog, id, completedLessons), loading: domainState === 'loading' };
    }
    if (item.group === 'aptitude') return { progress: aptitude?.[id] ?? null, loading: practiceState === 'loading' };
    return { progress: caseDrill?.[id] ?? null, loading: practiceState === 'loading' };
  }, [deckProgress, domainCatalog, completedLessons, domainState, aptitude, caseDrill, practiceState]);

  const ordered = useMemo(() => {
    if (mode === 'program') return columns;
    const out = {} as Record<RecommendationGroup, RecItem[]>;
    GROUP_ORDER.forEach((group) => {
      const items = columns[group];
      const tile = group === 'aptitude' ? skillFocus?.aptitude : group === 'case_drill' ? skillFocus?.caseDrill : null;
      let index = tile && tile.status === 'ready' ? items.findIndex((item) => item.topic?.contentId === tile.skill.skillId) : -1;
      if (index < 0) index = items.findIndex((item) => isUnfinished(progressFor(item).progress));
      out[group] = index > 0 ? [items[index], ...items.slice(0, index), ...items.slice(index + 1)] : items;
    });
    return out;
  }, [mode, columns, skillFocus, progressFor]);

  const openContent = (item: RecItem, placement: 'primary' | 'explore' | 'details') => {
    trackStepView('my-roadmap', 'recommendation_open', {
      properties: { group: item.group, topic: item.key, kind: item.kind, placement, mode },
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

  const fitGapsFor = (group: RecommendationGroup) => fitRecommendations
    .filter((rec) => rec && rec.casemateFunction === FIT_FUNCTION[group] && (rec.gap || rec.reason))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .slice(0, 2);

  const extraCount = GROUP_ORDER.reduce((sum, group) => sum + Math.max(0, ordered[group].length - 1), 0);
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
          : 'No candidate reviews for this program yet, so these are general preparation suggestions.';
  const modeHint = mode === 'smart'
    ? 'Smart Picks: your weakest measured skill first, then unfinished topics for your target.'
    : `Program Fit: ranked only by what ${target?.program || 'MT programs'} tests${matched.exact + matched.related > 0 ? ' and its candidate reviews' : ''}.`;

  const detailProgress = detail ? progressFor(detail) : null;
  const detailIsPrimary = detail ? ordered[detail.group][0]?.key === detail.key : false;
  const detailFitGaps = detail && detailIsPrimary ? fitGapsFor(detail.group) : [];

  return (
    <>
    <section className="mr-card mr-rec" data-testid="roadmap-recommendations" data-mode={mode} aria-labelledby="mr-rec-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow"><Sparkles size={12} /> What to do next</span>
          <h2 className="mr-h2" id="mr-rec-title">Recommended for you</h2>
          <p className="mr-sub">
            {target ? <>Your next steps for <strong>{label}</strong>.</> : 'General preparation for MT and consulting programs.'}{' '}
            <span data-testid="recommendation-summary">{summary}</span>
          </p>
        </div>
        <div className="mr-rec-tools">
          {allGeneral && (
            <span className="mr-badge mr-badge--general" data-testid="recommendation-general-badge" title="Gợi ý chuẩn bị chung">
              <Info size={12} /> General preparation suggestions
            </span>
          )}
          <div className="mr-seg mr-seg--sm" role="group" aria-label="Recommendation order" data-testid="recommendation-mode">
            {REC_MODES.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`mr-seg-btn${mode === option.id ? ' is-selected' : ''}`}
                aria-pressed={mode === option.id}
                onClick={() => chooseMode(option.id)}
                data-testid={`recommendation-mode-${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
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
      <p className="mr-rec-mode-hint" data-testid="recommendation-mode-hint">{modeHint}</p>

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
          const primary = ordered[group][0];
          if (!primary) {
            return (
              <div key={group} className="mr-rec-card is-empty" data-testid={`recommendation-group-${group}`}>
                <span className="mr-rec-kicker"><Icon /> {GROUP_LABEL[group]}</span>
                <p className="mr-rec-empty">No recommendation available right now.</p>
              </div>
            );
          }
          const { progress, loading } = progressFor(primary);
          const badge = KIND_BADGE[primary.kind];
          const annotation = focusAnnotationFor(skillFocus, primary.group, primary.topic?.contentId || '');
          const gaps = fitGapsFor(group);
          return (
            <article
              key={group}
              className={`mr-rec-card${annotation ? ' is-focus' : ''}`}
              data-testid={`recommendation-group-${group}`}
              data-topic={primary.key}
              data-kind={primary.kind}
            >
              <div className="mr-rec-card-top">
                <span className="mr-rec-kicker"><Icon /> {GROUP_LABEL[group]}</span>
                <InfoPopover label={`Why ${primary.title} is recommended`} testId={`recommendation-why-${group}`}>
                  <b>Why recommended</b>
                  <span>
                    {primary.why}
                    {primary.caseTypes.length > 0 ? ` Covers: ${primary.caseTypes.join(', ')}.` : ''}
                  </span>
                  {annotation && (
                    <span>
                      Today’s Focus: this is your lowest measured {group === 'aptitude' ? 'Aptitude Test category' : 'Case Drill skill'} ({annotation.score}%).
                    </span>
                  )}
                  {gaps.length > 0 && (
                    <>
                      <b>From your Fit Assessment</b>
                      {gaps.map((gap) => <span key={gap.id}>{gap.gap || gap.reason}</span>)}
                    </>
                  )}
                  <b>Evidence</b>
                  <span>
                    {primary.kind === 'fallback'
                      ? 'No candidate reviews mention this for your target yet, so it is a general preparation suggestion.'
                      : `${primary.evidence.length} candidate review${primary.evidence.length === 1 ? '' : 's'} (${badge.label.toLowerCase()}). Open the topic name for the excerpts.`}
                  </span>
                </InfoPopover>
              </div>
              <button
                type="button"
                className="mr-rec-title"
                onClick={(event) => showDetail(primary, event.currentTarget)}
                aria-haspopup="dialog"
                data-testid="recommendation-title"
              >
                {primary.title}
              </button>
              <p className="mr-rec-desc">{primary.description}</p>
              <span className={badge.className} data-testid="recommendation-label">{badge.label}</span>
              <FocusAnnotationLine annotation={annotation} />
              <ProgressBlock progress={progress} loading={loading} unit={GROUP_UNIT[group]} />
              <button
                type="button"
                className="mr-btn mr-btn--primary mr-btn--block mr-rec-cta"
                onClick={() => openContent(primary, 'primary')}
                data-testid="recommendation-cta"
                data-cta-target={GROUP_DESTINATION[group]}
              >
                {GROUP_CTA[group]} <ChevronRight />
              </button>
            </article>
          );
        })}
      </div>

      {extraCount > 0 && (
        <div className="mr-explore">
          <button
            type="button"
            className="mr-explore-btn"
            aria-expanded={exploreOpen}
            aria-controls="mr-rec-more"
            onClick={() => setExploreOpen((value) => !value)}
            data-testid="button-explore-recommendations"
          >
            {exploreOpen ? 'Hide extra topics' : `Explore more topics (${extraCount})`}
            <ChevronDown />
          </button>
        </div>
      )}
      {exploreOpen && extraCount > 0 && (
        <div className="mr-rec-more" id="mr-rec-more" data-testid="recommendation-more">
          {GROUP_ORDER.map((group) => {
            const Icon = GROUP_ICON[group];
            const extras = ordered[group].slice(1);
            if (extras.length === 0) return null;
            return (
              <div key={group} className="mr-rec-more-col" data-testid={`recommendation-more-${group}`}>
                <p className="mr-rec-more-head"><Icon /> {GROUP_LABEL[group]}</p>
                <ul>
                  {extras.map((item) => {
                    const { progress } = progressFor(item);
                    const pct = progress && progress.total > 0 ? Math.min(100, Math.round((progress.done / progress.total) * 100)) : null;
                    return (
                      <li key={item.key} className="mr-rec-row" data-testid={`recommendation-card-${item.key}`} data-kind={item.kind}>
                        <button
                          type="button"
                          className="mr-rec-row-main"
                          onClick={(event) => showDetail(item, event.currentTarget)}
                          aria-haspopup="dialog"
                        >
                          <span className="mr-rec-row-title">
                            {item.title}
                            {item.kind !== 'fallback' && <span className={KIND_BADGE[item.kind].className}>{KIND_BADGE[item.kind].label}</span>}
                          </span>
                          <span className="mr-rec-row-why">
                            {item.why}
                            {item.caseTypes.length > 0 ? ` Covers: ${item.caseTypes.join(', ')}.` : ''}
                          </span>
                          {pct !== null && progress && (
                            <span className="mr-rec-row-prog">
                              <span className={`mr-bar mr-bar--thin${pct >= 100 ? ' is-done' : ''}`} aria-hidden="true">
                                <span style={{ width: `${Math.max(pct > 0 ? 3 : 0, pct)}%` }} />
                              </span>
                              <span className="mr-num">{Math.min(progress.done, progress.total)}/{progress.total}</span>
                            </span>
                          )}
                        </button>
                        <FocusAnnotationLine annotation={focusAnnotationFor(skillFocus, item.group, item.topic?.contentId || '')} />
                        <button
                          type="button"
                          className="mr-btn mr-btn--ghost mr-btn--sm mr-rec-row-cta"
                          onClick={() => openContent(item, 'explore')}
                          aria-label={`${GROUP_CTA[group]}: ${item.title}`}
                          data-testid="recommendation-explore-cta"
                          data-cta-target={GROUP_DESTINATION[group]}
                        >
                          {GROUP_CTA_SHORT[group]} <ChevronRight />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
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
