import { useMemo, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { Brain, ChevronRight, Play, Search, Shuffle, Timer } from 'lucide-react';
import { tw } from '../lib/colors';
import { progressPercent } from '../lib/aptitudeProgress';
import type { AptitudeProgress, ProgressStatus } from '../lib/aptitudeProgress';
import type { SmartPracticePicks as SmartPicksData } from '../lib/aptitudeSmartPicks';
import SmartPracticePicks from './SmartPracticePicks';

export interface LibraryFamily {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export interface LibraryEntry {
  key: string;
  id: string;
  family: string;
  title: string;
  /** Sub-filter inside one family (difficulty level, source or In-Tray / E-Tray). */
  group: string;
  /** Sub-filter used when every family is shown at once. */
  source: string;
  /** Optional small badge, such as the diagrammatic difficulty. */
  tag?: string;
  /** Difficulty as stored on the test, in whatever casing it was authored; absent when the test carries none. */
  difficulty?: string | null;
  detail: string[];
  best: string | null;
  payload: unknown;
  /** Intro-screen content (description, instructions, start button label) for a test that opens an intro before it starts. The entry itself is an ordinary tile. */
  feature?: { description: string; instructions: string[]; actionLabel: string; note?: string | null };
}

interface Props {
  families: LibraryFamily[];
  entries: LibraryEntry[];
  family: string;
  onFamilyChange: (id: string) => void;
  onOpen: (entry: LibraryEntry, options?: { random?: boolean }) => void;
  progress?: AptitudeProgress;
  progressLoading?: boolean;
  /** Opens the mixed-category Online Assessment Simulation; the entry card is hidden without it. */
  onOpenSimulation?: () => void;
  simulationNote?: string | null;
  /** Smart Practice Picks, shown between the progress dashboard and the test types. */
  smartPicks?: SmartPicksData;
}

const PAGE_SIZE = 24;
const PILL = 'inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold';

type DifficultyLevel = 'easy' | 'medium' | 'hard';
type DifficultyFilter = 'all' | DifficultyLevel;

const DIFFICULTY_FILTERS: Array<{ id: DifficultyFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

/** Casing and whitespace are normalised for matching only; the stored value is never rewritten. */
function normalizeDifficulty(value: unknown): DifficultyLevel | null {
  if (typeof value !== 'string') return null;
  const key = value.trim().toLowerCase();
  return key === 'easy' || key === 'medium' || key === 'hard' ? key : null;
}

const STATUS_LABEL: Record<ProgressStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

const STATUS_CLASS: Record<ProgressStatus, string> = {
  not_started: 'bg-[var(--space-neutral-100)] text-[var(--space-text-muted)]',
  in_progress: 'bg-[var(--space-semantic-warning-100)] text-[var(--space-semantic-warning-700)]',
  completed: 'bg-[var(--space-semantic-success-100)] text-[var(--space-semantic-success-700)]',
};

function ProgressBar({ percent, onPrimary = false, className = '' }: { percent: number; onPrimary?: boolean; className?: string }) {
  return (
    <span
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={`block h-1.5 overflow-hidden rounded-full ${onPrimary ? 'bg-[color-mix(in_srgb,var(--space-text-on-primary)_30%,transparent)]' : 'bg-[var(--space-neutral-200)]'} ${className}`}
    >
      <span
        className={`block h-full rounded-full transition-[width] duration-500 ${onPrimary ? 'bg-[var(--space-text-on-primary)]' : 'bg-[var(--space-brand-primary-600)]'}`}
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

function Metric({ label, value, footer, testId }: { label: string; value: ReactNode; footer: ReactNode; testId: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid={testId}>
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</span>
      <span className="mt-0.5 block text-xl font-bold leading-7 text-[var(--space-text-primary)] sm:text-2xl">{value}</span>
      <span className="mt-1 block text-[11px] leading-4 text-[var(--space-text-secondary)]">{footer}</span>
    </div>
  );
}

function ProgressDashboard({ progress, loading }: { progress: AptitudeProgress; loading: boolean }) {
  const completedPercent = progressPercent(progress.completedTests, progress.totalTests);
  const placeholder = <span className="text-[var(--space-text-muted)]">…</span>;
  return (
    <section
      aria-label="Your aptitude test progress"
      className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4"
      data-testid="aptitude-progress"
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        <Metric
          label="Tests Completed"
          testId="metric-tests-completed"
          value={loading ? placeholder : (
            <>
              {progress.completedTests}
              <span className="text-sm font-semibold text-[var(--space-text-muted)]"> / {progress.totalTests}</span>
            </>
          )}
          footer={(
            <span className="flex items-center gap-2">
              <ProgressBar percent={loading ? 0 : completedPercent} className="flex-1" />
              <span className="shrink-0 font-semibold text-[var(--space-text-brand)]">{loading ? '…' : `${completedPercent}%`}</span>
            </span>
          )}
        />
        <Metric
          label="Questions Practiced"
          testId="metric-questions-practiced"
          value={loading ? placeholder : progress.questionsPracticed.toLocaleString('en-US')}
          footer={`Across ${progress.submittedAttempts} submitted ${progress.submittedAttempts === 1 ? 'attempt' : 'attempts'}`}
        />
        <Metric
          label="Overall Accuracy"
          testId="metric-overall-accuracy"
          value={loading ? placeholder : progress.accuracyPercent === null ? '—' : `${progress.accuracyPercent}%`}
          footer={progress.gradedQuestions > 0
            ? `${progress.correctAnswers.toLocaleString('en-US')} of ${progress.gradedQuestions.toLocaleString('en-US')} right/wrong questions correct`
            : 'Shows once you submit a test with right/wrong answers'}
        />
      </div>
    </section>
  );
}

export default function AptitudeLibrary({
  families,
  entries,
  family,
  onFamilyChange,
  onOpen,
  progress,
  progressLoading = false,
  onOpenSimulation,
  simulationNote = null,
  smartPicks,
}: Props) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // The results list, or its empty state: whichever is rendered is the Practice scroll target.
  const resultsRef = useRef<HTMLElement | null>(null);
  const setResultsNode = (node: HTMLElement | null) => {
    resultsRef.current = node;
  };

  const familyName = useMemo(() => new Map(families.map((item) => [item.id, item.name])), [families]);
  const familyIcon = useMemo(() => new Map(families.map((item) => [item.id, item.icon])), [families]);
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    entries.forEach((entry) => map.set(entry.family, (map.get(entry.family) || 0) + 1));
    return map;
  }, [entries]);

  const inFamily = useMemo(() => (family === 'all' ? entries : entries.filter((entry) => entry.family === family)), [entries, family]);
  const chips = useMemo(() => {
    const map = new Map<string, number>();
    inFamily.forEach((entry) => {
      const key = family === 'all' ? entry.source : entry.group;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [inFamily, family]);

  const activeGroup = chips.some(([name]) => name === group) ? group : 'all';
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = inFamily.filter((entry) => {
      if (activeGroup !== 'all' && (family === 'all' ? entry.source : entry.group) !== activeGroup) return false;
      if (difficulty !== 'all' && normalizeDifficulty(entry.difficulty) !== difficulty) return false;
      if (!needle) return true;
      return `${entry.title} ${familyName.get(entry.family) || ''} ${entry.tag || ''}`.toLowerCase().includes(needle);
    });
    return filtered;
  }, [inFamily, activeGroup, difficulty, query, family, familyName]);

  const selectFamily = (id: string) => {
    setGroup('all');
    setVisibleCount(PAGE_SIZE);
    onFamilyChange(id);
  };

  const randomTest = () => {
    if (matches.length) onOpen(matches[Math.floor(Math.random() * matches.length)], { random: true });
  };

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      const target = resultsRef.current;
      if (!target) return;
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    });
  };

  // Unlike the test-type tiles, a Smart Practice Pick keeps the current search, source and difficulty filters.
  const practiceFamily = (id: string) => {
    setVisibleCount(PAGE_SIZE);
    if (id !== family) onFamilyChange(id);
    scrollToResults();
  };

  const tile = (id: string, label: string, count: number, Icon: ComponentType<{ className?: string }>) => {
    const selected = family === id;
    const familyProgress = progress && id !== 'all' ? progress.byFamily[id] : undefined;
    const done = id === 'all' ? progress?.completedTests ?? 0 : familyProgress?.completed ?? 0;
    return (
      <button
        key={id}
        type="button"
        role="tab"
        aria-selected={selected}
        onClick={() => selectFamily(id)}
        className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-colors ${selected ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-600)]'}`}
        data-testid={`card-${id}`}
      >
        <Icon className="h-5 w-5" />
        <span className="text-xs font-bold leading-4">{label}</span>
        {progress ? (
          <>
            <span className={`text-[10px] font-semibold ${selected ? 'opacity-80' : 'text-[var(--space-text-muted)]'}`} data-testid={`progress-count-${id}`}>
              {progressLoading ? '…' : done}/{count} tests
            </span>
            <ProgressBar percent={progressLoading ? 0 : progressPercent(done, count)} onPrimary={selected} className="w-full max-w-[104px]" />
            {familyProgress ? (
              <span
                className={`${PILL} ${selected ? 'bg-[var(--space-surface-card)] text-[var(--space-text-brand)]' : STATUS_CLASS[familyProgress.status]}`}
                data-testid={`progress-status-${id}`}
              >
                {STATUS_LABEL[familyProgress.status]}
              </span>
            ) : null}
          </>
        ) : (
          <span className={`text-[10px] font-semibold ${selected ? 'opacity-80' : 'text-[var(--space-text-muted)]'}`}>{count} tests</span>
        )}
      </button>
    );
  };

  return (
    <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
      <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6" data-testid="aptitude-library">
        <header className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] sm:h-10 sm:w-10">
            <Brain className="h-4 w-4 text-[var(--space-text-brand)] sm:h-5 sm:w-5" />
          </div>
          <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">Aptitude Test</h1>
        </header>

        {progress ? <ProgressDashboard progress={progress} loading={progressLoading} /> : null}

        {smartPicks ? (
          <SmartPracticePicks
            program={smartPicks.program}
            weak={smartPicks.weak}
            familyName={(id) => familyName.get(id) || id}
            onPractice={practiceFamily}
            onBrowse={scrollToResults}
          />
        ) : null}

        {onOpenSimulation ? (
          <section
            className="flex flex-col gap-3 rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)] p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
            aria-label="Online Assessment Simulation"
            data-testid="oa-entry"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]">
              <Timer className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[var(--space-text-primary)] sm:text-base">Online Assessment Simulation</span>
                <span className={`${PILL} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>3+ test types · one timer</span>
              </span>
              <span className="mt-1 block text-xs leading-5 text-[var(--space-text-secondary)]">
                Got an online assessment email? Sit one uninterrupted, timed session that mixes several test types in blocks, like the real
                thing: 20, 30 or 50 questions at 1.5 minutes each.
              </span>
              {simulationNote ? <span className="mt-1 block text-[11px] font-semibold text-[var(--space-text-brand)]">{simulationNote}</span> : null}
            </span>
            <button
              type="button"
              onClick={onOpenSimulation}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${tw.button.primary}`}
              data-testid="button-online-assessment"
            >
              <Play className="h-4 w-4" />
              Start simulation
            </button>
          </section>
        ) : null}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" role="tablist" aria-label="Test types">
          {tile('all', 'All tests', entries.length, Brain)}
          {families.map((item) => tile(item.id, item.name, counts.get(item.id) || 0, item.icon))}
        </div>

        <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search tests"
                className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
                aria-label="Search tests"
              />
            </div>
            <button
              type="button"
              onClick={randomTest}
              disabled={!matches.length}
              className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`}
              data-testid="button-random-test"
            >
              <Shuffle className="h-4 w-4" />
              Random test
            </button>
          </div>
          {chips.length > 1 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {[['all', inFamily.length] as [string, number], ...chips].map(([name, count]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setGroup(name);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${activeGroup === name ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'}`}
                  data-testid={`filter-${name}`}
                >
                  {name === 'all' ? 'All' : name} · {count}
                </button>
              ))}
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Difficulty filter" data-testid="difficulty-filter">
            {DIFFICULTY_FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={difficulty === id}
                onClick={() => {
                  setDifficulty(id);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${difficulty === id ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'}`}
                data-testid={`filter-difficulty-${id}`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-[var(--space-text-muted)]">
            Tests matching your filters: {matches.length}
            {difficulty !== 'all' ? ' · Tests without a difficulty rating only appear under All.' : ''}
          </p>
        </section>

        {matches.length === 0 ? (
          <div
            ref={setResultsNode}
            tabIndex={-1}
            className="scroll-mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-7 text-center focus:outline-none"
            data-testid="aptitude-results"
          >
            <p className="text-sm font-bold text-[var(--space-text-primary)]">No tests match these filters</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setGroup('all');
                setDifficulty('all');
                setVisibleCount(PAGE_SIZE);
                if (family !== 'all') onFamilyChange('all');
              }}
              className={`mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold ${tw.button.primary}`}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul
            ref={setResultsNode}
            tabIndex={-1}
            aria-label="Matching tests"
            className="grid scroll-mt-3 gap-2.5 focus:outline-none sm:grid-cols-2 lg:grid-cols-3"
            data-testid="aptitude-results"
          >
            {matches.slice(0, visibleCount).map((entry) => {
              const Icon = familyIcon.get(entry.family) || Brain;
              return (
                <li key={entry.key}>
                  <button
                    type="button"
                    onClick={() => onOpen(entry)}
                    className="group flex h-full w-full items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5 text-left transition-all hover:border-[var(--space-brand-primary-600)] hover:shadow-md"
                    data-testid={`button-start-${entry.id}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-5 text-[var(--space-text-primary)]">{entry.title}</span>
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        {family === 'all' ? (
                          <span className={`${PILL} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>{familyName.get(entry.family)}</span>
                        ) : null}
                        {entry.tag ? <span className={`${PILL} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>{entry.tag}</span> : null}
                        {entry.detail.map((text) => (
                          <span key={text} className={`${PILL} border border-[var(--space-border-default)] text-[var(--space-text-secondary)]`}>{text}</span>
                        ))}
                        {entry.best ? (
                          <span className={`${PILL} bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]`}>{entry.best}</span>
                        ) : null}
                      </span>
                    </span>
                    <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[var(--space-text-muted)] transition-transform group-hover:translate-x-0.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {matches.length > visibleCount ? (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}
          >
            Show {Math.min(PAGE_SIZE, matches.length - visibleCount)} more tests
          </button>
        ) : null}
      </div>
    </div>
  );
}
