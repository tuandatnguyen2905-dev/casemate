import { Info } from 'lucide-react';
import {
  MARKET_SIZING_REVEAL_NOTICE,
  getMarketSizingBankCase,
} from '../lib/marketSizingBank';
import { formatNumbersInText } from '../lib/numberDisplay';
import { clarifyUnitText } from '../lib/unitLabels';

const display = (text: string | null | undefined) => formatNumbersInText(clarifyUnitText(text ?? ''));

const labelClass = 'text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]';
const bodyClass = 'mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-[var(--space-text-secondary)]';

/**
 * Post-submission reveal for Market Sizing banks 2-4. Rendered only after a
 * learner has submitted, by Case Drill (Market Sizing) and Case Pool (Sizing).
 */
export default function MarketSizingBankReveal({ sourceCaseId }: { sourceCaseId?: string | null }) {
  const item = getMarketSizingBankCase(sourceCaseId);
  if (!item) return null;
  return (
    <section
      className="mt-4 overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]"
      data-testid="market-sizing-bank-reveal"
    >
      <div className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-4 sm:px-6">
        <p className="text-sm font-bold text-[var(--space-text-primary)]">Worked solution · {item.code} {clarifyUnitText(item.title)}</p>
        <p className="mt-1 text-xs text-[var(--space-text-muted)]">Compare your method with this illustrative route.</p>
      </div>
      <div className="space-y-4 px-4 py-4 sm:px-6 sm:py-5">
        <div
          role="note"
          className="flex gap-2.5 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_12%,transparent)] p-3"
          data-testid="market-sizing-bank-notice"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" aria-hidden="true" />
          <p className="min-w-0 break-words text-xs font-semibold leading-5 text-[var(--space-text-primary)]">{clarifyUnitText(MARKET_SIZING_REVEAL_NOTICE)}</p>
        </div>

        <div>
          <p className={labelClass}>Model decomposition</p>
          <p className={bodyClass}>{display(item.modelRoute)}</p>
          <p className="mt-1 text-xs text-[var(--space-text-muted)]">One valid route. Your own issue tree is not graded; your Components and model are.</p>
        </div>
        <div>
          <p className={labelClass}>Worked calculation</p>
          <p className={`${bodyClass} font-semibold text-[var(--space-text-primary)]`}>{display(item.workedCalculation)}</p>
        </div>
        <div>
          <p className={labelClass}>Driver logic / check</p>
          <p className={bodyClass}>{display(item.driverLogic)}</p>
        </div>
        <div>
          <p className={labelClass}>Common mistakes</p>
          <p className={bodyClass}>{display(item.howToAssess)}</p>
        </div>
      </div>
    </section>
  );
}
