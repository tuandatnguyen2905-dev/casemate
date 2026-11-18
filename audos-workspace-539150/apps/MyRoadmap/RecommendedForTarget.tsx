// My Roadmap — "Recommended for Your Target Program".
//
// Three groups (Domain Knowledge, Aptitude Test, Case Drill), at most three
// cards each, built by lib/candidateReviews.ts from the founder-entered
// candidate reviews. With no relevant review every card is a general
// preparation suggestion; matching reviews upgrade cards to evidence cards with
// their excerpts. Progress bars reuse each practice app's own progress data.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Compass,
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
} from '../../lib/candidateReviews';
import type {
  CandidateReview,
  EvidenceItem,
  ProgramRow,
  RecommendationCard,
  RecommendationGroup,
  RecommendationTarget,
} from '../../lib/candidateReviews';
import { READINESS_UPDATED_EVENT } from '../../lib/readinessScore';
import {
  domainSectorProgress,
  loadAptitudeFamilyProgress,
  loadCandidateReviews,
  loadCaseDrillSkillProgress,
  loadDomainCatalog,
  loadProgramRows,
  openRecommendedTopic,
  readCompletedLessons,
  ReviewStorageMissingError,
} from './recommendationData';
import type { CaseSkillProgress, DomainCatalog, TopicProgress } from './recommendationData';
import CandidateReviewAdmin from './CandidateReviewAdmin';

const PROGRESS_REFRESH_MIN_MS = 15000;
const EXCERPT_PREVIEW_CHARS = 220;

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

const LABEL_STYLE: Record<RecommendationCard['kind'], string> = {
  exact: 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]',
  related: 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_14%,transparent)] text-[var(--space-semantic-warning-700)]',
  fallback: 'border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]',
};

const MATCH_REASON_LABEL: Record<EvidenceItem['reason'], string> = {
  program: 'Same program',
  company: 'Same company',
  industry: 'Same industry',
};

type LoadState = 'loading' | 'ready' | 'error';
export type ReviewsState = LoadState | 'missing';

interface Props {
  target: RecommendationTarget | null;
  sessionId?: string | null;
  userKey: string;
  isAdmin: boolean;
  onChooseTarget: () => void;
}

function targetLabel(target: RecommendationTarget | null): string {
  if (!target) return '';
  return [target.program, target.company, target.position].filter(Boolean).join(' · ');
}

function TopicProgressBar({ progress, unit }: { progress: TopicProgress; unit: string }) {
  const pct = progress.total > 0 ? Math.min(100, Math.round((progress.done / progress.total) * 100)) : 0;
  const complete = progress.total > 0 && progress.done >= progress.total;
  return (
    <div className="mt-2.5" data-testid="recommendation-progress">
      <div className="flex items-center justify-between gap-2 text-[10px]">
        <span className="font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">Learning progress</span>
        <span className="font-bold tabular-nums text-[var(--space-text-secondary)]">{progress.done}/{progress.total} {unit}</span>
      </div>
      <div
        className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={progress.total}
        aria-valuenow={progress.done}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${Math.max(pct > 0 ? 4 : 0, pct)}%`,
            background: complete ? 'var(--space-semantic-success)' : 'var(--space-brand-primary-600)',
          }}
        />
      </div>
    </div>
  );
}

function EvidenceExcerpt({ item }: { item: EvidenceItem }) {
  const [open, setOpen] = useState(false);
  const preview = item.excerpt.length > EXCERPT_PREVIEW_CHARS ? `${item.excerpt.slice(0, EXCERPT_PREVIEW_CHARS).trimEnd()}…` : item.excerpt;
  const expandable = preview !== item.fullText;
  const typeLabel = REVIEW_TYPES.find((type) => type.id === item.reviewType)?.label;
  const meta = [item.company, item.program, item.position, typeLabel, item.sourceNote].filter(Boolean).join(' · ');
  return (
    <li className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2.5" data-testid={`evidence-review-${item.reviewId}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-[var(--space-surface-muted)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          {MATCH_REASON_LABEL[item.reason]}
        </span>
      </div>
      <blockquote className="mt-1.5 flex gap-1.5 text-[11px] leading-5 text-[var(--space-text-primary)]" lang="vi">
        <Quote className="mt-0.5 h-3 w-3 shrink-0 text-[var(--space-text-muted)]" />
        <span className="min-w-0 whitespace-pre-line break-words">{open ? item.fullText : preview}</span>
      </blockquote>
      {expandable && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-1 inline-flex items-center gap-1 rounded-md px-1 text-[10px] font-semibold text-[var(--space-text-brand)] hover:opacity-80"
          aria-expanded={open}
        >
          {open ? 'Show less' : 'Read full review'}
        </button>
      )}
      <p className="mt-1 break-words text-[10px] leading-4 text-[var(--space-text-muted)]">{meta}</p>
    </li>
  );
}

function RecommendationCardView({
  card,
  progress,
  progressLoading,
  expanded,
  onToggle,
  onOpen,
}: {
  card: RecommendationCard;
  progress: TopicProgress | null;
  progressLoading: boolean;
  expanded: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  const group = card.topic.group;
  const hasEvidence = card.kind !== 'fallback' && card.evidence.length > 0;
  const evidenceId = `evidence-${card.topic.tag.replace(/[^a-z0-9-]/gi, '-')}`;
  return (
    <article
      className="flex flex-col rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3"
      data-testid={`recommendation-card-${card.topic.tag}`}
      data-kind={card.kind}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
        <h4 className="min-w-0 break-words text-xs font-bold leading-snug text-[var(--space-text-primary)]">
          {card.topic.title}
          {card.topic.groupLabel && (
            <span className="ml-1 font-semibold text-[var(--space-text-muted)]">· {card.topic.groupLabel}</span>
          )}
        </h4>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${LABEL_STYLE[card.kind]}`} lang="vi" data-testid="recommendation-label">
          {card.label}
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">
        <span className="font-semibold text-[var(--space-text-primary)]">Why: </span>
        {card.why}
      </p>

      {progress && progress.total > 0 ? (
        <TopicProgressBar progress={progress} unit={GROUP_UNIT[group]} />
      ) : progressLoading ? (
        <p className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[var(--space-text-muted)]">
          <Loader2 className="h-3 w-3 animate-spin" /> Checking your progress…
        </p>
      ) : null}

      <button
        type="button"
        onClick={onOpen}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)] hover:opacity-90"
        data-testid="recommendation-cta"
      >
        {group === 'domain' ? 'Learn Now' : 'Practice Now'}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      {hasEvidence && (
        <div className="mt-2.5 border-t border-[var(--space-border-default)] pt-2">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={evidenceId}
            className="flex w-full items-center justify-between gap-2 rounded-lg px-1 text-left text-[11px] font-bold text-[var(--space-text-primary)] hover:text-[var(--space-text-brand)]"
            data-testid="recommendation-evidence-toggle"
          >
            <span>Source Evidence ({card.evidence.length})</span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5 shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 shrink-0" />}
          </button>
          {expanded && (
            <ul id={evidenceId} className="mt-1.5 space-y-1.5" data-testid="recommendation-evidence">
              {card.evidence.map((item) => <EvidenceExcerpt key={`${item.reviewId}-${item.level}`} item={item} />)}
            </ul>
          )}
          <p className="mt-1.5 flex items-start gap-1 text-[10px] leading-4 text-[var(--space-text-muted)]" lang="vi" data-testid="recommendation-disclaimer">
            <Info className="mt-0.5 h-3 w-3 shrink-0" />
            {EVIDENCE_DISCLAIMER}
          </p>
        </div>
      )}
    </article>
  );
}

export default function RecommendedForTarget({ target, sessionId, userKey, isAdmin, onChooseTarget }: Props) {
  const [reviews, setReviews] = useState<CandidateReview[]>([]);
  const [reviewsState, setReviewsState] = useState<ReviewsState>('loading');
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [aptitude, setAptitude] = useState<Record<string, TopicProgress> | null>(null);
  const [caseDrill, setCaseDrill] = useState<Record<string, CaseSkillProgress> | null>(null);
  const [practiceState, setPracticeState] = useState<LoadState>('loading');
  const [domainCatalog, setDomainCatalog] = useState<DomainCatalog | null>(null);
  const [domainState, setDomainState] = useState<LoadState>('loading');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => readCompletedLessons());
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [adminOpen, setAdminOpen] = useState(false);
  const progressFetchedAtRef = useRef(0);
  const reviewRequestRef = useRef(0);

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
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('openApp', onOpenApp);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refreshPractice]);

  const targetKey = `${target?.company || ''}|${target?.program || ''}|${target?.position || ''}`;
  useEffect(() => {
    setExpanded({});
  }, [targetKey]);

  const result = useMemo(
    () => buildRecommendations({ target, reviews, programs, availableSectorIds: domainCatalog?.ids ?? null }),
    [target, reviews, programs, domainCatalog],
  );

  const progressFor = (card: RecommendationCard): { progress: TopicProgress | null; loading: boolean } => {
    const id = card.topic.contentId;
    if (card.topic.group === 'domain') {
      return { progress: domainSectorProgress(domainCatalog, id, completedLessons), loading: domainState === 'loading' };
    }
    if (card.topic.group === 'aptitude') {
      return { progress: aptitude?.[id] ?? null, loading: practiceState === 'loading' };
    }
    return { progress: caseDrill?.[id] ?? null, loading: practiceState === 'loading' };
  };

  const matched = result.matchedReviewCount;
  const label = targetLabel(target);
  const summary = !target
    ? null
    : reviewsState === 'loading'
      ? 'Checking candidate reviews…'
      : matched.exact > 0
        ? `Based on ${matched.exact} candidate review${matched.exact === 1 ? '' : 's'} for this program${matched.related > 0 ? ` and ${matched.related} related` : ''}.`
        : matched.related > 0
          ? `No reviews for this exact program yet — using ${matched.related} related review${matched.related === 1 ? '' : 's'} plus general preparation.`
          : 'No candidate reviews for this program yet — showing general preparation suggestions.';

  return (
    <section
      className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5"
      data-testid="roadmap-recommendations"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--space-text-primary)]">
            <Sparkles className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
            Recommended for Your Target Program
          </p>
          {target ? (
            <p className="mt-1 break-words text-xs leading-5 text-[var(--space-text-muted)]">
              What to prepare for <span className="font-semibold text-[var(--space-text-primary)]">{label}</span>, why, and where to practise next.
            </p>
          ) : (
            <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">General preparation for MT and consulting programs.</p>
          )}
          {summary && <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]" data-testid="recommendation-summary">{summary}</p>}
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={() => setAdminOpen((value) => !value)}
            aria-expanded={adminOpen}
            className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)] sm:w-auto"
            data-testid="button-add-candidate-review"
            lang="vi"
          >
            {adminOpen ? <X className="h-3.5 w-3.5" /> : <MessageSquarePlus className="h-3.5 w-3.5" />}
            Thêm review ứng viên
          </button>
        )}
      </div>

      {!target && (
        <div className="mt-3 flex flex-col gap-2 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3 sm:flex-row sm:items-center sm:justify-between" data-testid="recommendation-no-target">
          <p className="text-[11px] leading-4 text-[var(--space-text-secondary)]">
            <span className="font-bold text-[var(--space-text-primary)]">Choose a target program</span> to see what past candidates
            were asked for that program. Until then, here are general suggestions.
          </p>
          <button
            type="button"
            onClick={onChooseTarget}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-on-primary)] hover:opacity-90"
          >
            <Compass className="h-3.5 w-3.5" />
            Choose a target program
          </button>
        </div>
      )}

      {isAdmin && adminOpen && (
        <CandidateReviewAdmin
          sessionId={sessionId}
          reviews={reviews}
          reviewsState={reviewsState}
          programs={programs}
          onRetry={() => void refreshReviews()}
          onClose={() => setAdminOpen(false)}
        />
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {GROUP_ORDER.map((group) => {
          const Icon = GROUP_ICON[group];
          const cards = result.groups[group];
          return (
            <div key={group} className="min-w-0" data-testid={`recommendation-group-${group}`}>
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
                <Icon className="h-3.5 w-3.5 text-[var(--space-text-brand)]" />
                {GROUP_LABEL[group]}
              </p>
              <div className="space-y-2">
                {cards.map((card) => {
                  const { progress, loading } = progressFor(card);
                  return (
                    <RecommendationCardView
                      key={card.topic.tag}
                      card={card}
                      progress={progress}
                      progressLoading={loading}
                      expanded={!!expanded[card.topic.tag]}
                      onToggle={() => setExpanded((previous) => ({ ...previous, [card.topic.tag]: !previous[card.topic.tag] }))}
                      onOpen={() => openRecommendedTopic(card.topic, { nextQuestionId: caseDrill?.[card.topic.contentId]?.nextQuestionId })}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
