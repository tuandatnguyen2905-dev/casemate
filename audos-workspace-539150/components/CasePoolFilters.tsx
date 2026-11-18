/**
 * CasePoolFilters.tsx - the filter panel of the Case Pool library.
 *
 * "Business problem" groups full cases by their central decision (lib/casePoolBusinessProblems.ts).
 * A full case usually needs several skills, so there is deliberately no skill filter here;
 * skill tags stay in the case data for grading and Case Drill links.
 */

import { Search } from 'lucide-react';
import { tw } from '../lib/colors';
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from '../lib/caseLibraryShared';
import type { CaseDifficulty } from '../lib/caseLibraryShared';
import { CREATIVITY_CATEGORY_LABELS, type CreativityCategory } from '../lib/creativityCycle2';
import { MARKET_SIZING_FORMAT_LABELS, type MarketSizingFormat } from '../lib/marketSizingCycle3';
import { BUSINESS_PROBLEMS, type BusinessProblem, type PoolFilters } from '../lib/casePoolBusinessProblems';

const CHIP = 'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors';
const CHIP_ON = 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]';
const CHIP_OFF = 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]';
const ROW_LABEL = 'text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]';

function Chip({ active, onClick, testId, children }: { active: boolean; onClick: () => void; testId?: string; children: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${CHIP} ${active ? CHIP_ON : CHIP_OFF}`} data-testid={testId}>
      {children}
    </button>
  );
}

export default function CasePoolFilters({
  filters,
  onChange,
  industries,
  industryLabels,
  problems,
}: {
  filters: PoolFilters;
  onChange: (next: PoolFilters) => void;
  industries: string[];
  industryLabels: Record<string, string>;
  /** Business problems that at least one selectable case carries. */
  problems: BusinessProblem[];
}) {
  const set = (patch: Partial<PoolFilters>) => onChange({ ...filters, ...patch });
  const selectedProblem = BUSINESS_PROBLEMS.find((item) => item.id === filters.businessProblem);

  return (
    <>
      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
        <input
          type="search"
          value={filters.query}
          onChange={(event) => set({ query: event.target.value })}
          placeholder="Search by company, situation, or keyword…"
          aria-label="Search cases"
          className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
          data-testid="input-pool-search"
        />
      </div>

      <div className="mt-3 space-y-2.5">
        <div data-testid="pool-business-problem-filter">
          <p className={ROW_LABEL}>Business problem</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Chip active={filters.businessProblem === 'all'} onClick={() => set({ businessProblem: 'all' })} testId="filter-pool-problem-all">All cases</Chip>
            {problems.map((id) => (
              <Chip key={id} active={filters.businessProblem === id} onClick={() => set({ businessProblem: id })} testId={`filter-pool-problem-${id}`}>
                {BUSINESS_PROBLEMS.find((item) => item.id === id)?.label || id}
              </Chip>
            ))}
          </div>
          <p className="mt-1.5 max-w-[80ch] text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid="pool-business-problem-hint">
            {selectedProblem
              ? selectedProblem.description
              : 'Cases are grouped by their central decision. Market-sizing estimates, chart-reading drills and message briefs have no single business decision, so they appear under All cases only.'}
          </p>
        </div>

        <div>
          <p className={ROW_LABEL}>Industry</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['all', ...industries].map((item) => (
              <Chip key={item} active={filters.industry === item} onClick={() => set({ industry: item })} testId={`filter-industry-${item}`}>
                {item === 'all' ? 'All' : industryLabels[item] || item}
              </Chip>
            ))}
          </div>
        </div>

        <div data-testid="pool-creativity-category-selector">
          <p className={ROW_LABEL}>Creativity problem type</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Chip active={filters.creativity === 'off'} onClick={() => set({ creativity: 'off' })} testId="filter-pool-creativity-off">Any case</Chip>
            <Chip active={filters.creativity === 'all'} onClick={() => set({ creativity: 'all', marketSizing: 'off', difficulty: 'all' })} testId="filter-pool-creativity-all">All four</Chip>
            {(Object.keys(CREATIVITY_CATEGORY_LABELS) as CreativityCategory[]).map((category) => (
              <Chip
                key={category}
                active={filters.creativity === category}
                onClick={() => set({ creativity: category, marketSizing: 'off', difficulty: 'all' })}
                testId={`filter-pool-creativity-${category}`}
              >
                {CREATIVITY_CATEGORY_LABELS[category]}
              </Chip>
            ))}
          </div>
        </div>

        <div data-testid="pool-market-sizing-format-selector">
          <p className={ROW_LABEL}>Market Sizing format</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Chip active={filters.marketSizing === 'off'} onClick={() => set({ marketSizing: 'off' })} testId="filter-pool-market-sizing-off">Any case</Chip>
            <Chip active={filters.marketSizing === 'all'} onClick={() => set({ marketSizing: 'all', creativity: 'off' })} testId="filter-pool-market-sizing-all">Both formats</Chip>
            {(Object.keys(MARKET_SIZING_FORMAT_LABELS) as MarketSizingFormat[]).map((format) => (
              <Chip
                key={format}
                active={filters.marketSizing === format}
                onClick={() => set({ marketSizing: format, creativity: 'off' })}
                testId={`filter-pool-market-sizing-${format}`}
              >
                {MARKET_SIZING_FORMAT_LABELS[format]}
              </Chip>
            ))}
          </div>
        </div>

        {filters.creativity === 'off' ? (
          <div>
            <p className={ROW_LABEL}>Difficulty</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(['all', ...DIFFICULTY_ORDER] as Array<CaseDifficulty | 'all'>).map((level) => (
                <Chip key={level} active={filters.difficulty === level} onClick={() => set({ difficulty: level })} testId={`filter-pool-difficulty-${level}`}>
                  {level === 'all' ? 'All' : DIFFICULTY_LABELS[level]}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-2">
          <label className={ROW_LABEL}>
            Estimated time
            <select
              value={filters.estimatedTime}
              onChange={(event) => set({ estimatedTime: event.target.value as PoolFilters['estimatedTime'] })}
              className={`${tw.input.base} ${tw.input.default} mt-1.5 py-2 text-xs normal-case tracking-normal`}
              data-testid="select-pool-estimated-time"
            >
              <option value="all">Any length</option>
              <option value="under-25">Under 25 min</option>
              <option value="25-30">25–30 min</option>
              <option value="30-plus">30+ min</option>
            </select>
          </label>
          <label className={ROW_LABEL}>
            Completion status
            <select
              value={filters.completion}
              onChange={(event) => set({ completion: event.target.value as PoolFilters['completion'] })}
              className={`${tw.input.base} ${tw.input.default} mt-1.5 py-2 text-xs normal-case tracking-normal`}
              data-testid="select-pool-completion"
            >
              <option value="all">Any status</option>
              <option value="not-started">Not started</option>
              <option value="opened">Opened</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}
