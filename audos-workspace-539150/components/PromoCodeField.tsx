import { useState } from 'react';
import { CheckCircle2, Loader2, TicketPercent, TriangleAlert } from 'lucide-react';
import { CasematePromoQuote, validateCasematePromo } from '../lib/casemateCheckout';
import { formatVnd, PricingPlan } from '../lib/pricing';

interface PromoCodeFieldProps {
  plan: PricingPlan;
  sessionId: string;
  onQuoteChange: (quote: CasematePromoQuote | null) => void;
}

export default function PromoCodeField({ plan, sessionId, onQuoteChange }: PromoCodeFieldProps) {
  const [code, setCode] = useState('');
  const [quote, setQuote] = useState<CasematePromoQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const applyCode = async () => {
    setLoading(true);
    setError('');
    setQuote(null);
    onQuoteChange(null);
    try {
      const result = await validateCasematePromo(sessionId, plan.id, code);
      setQuote(result);
      setCode(result.code);
      onQuoteChange(result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'This promo code could not be applied.');
    } finally {
      setLoading(false);
    }
  };

  const updateCode = (value: string) => {
    setCode(value);
    if (quote) {
      setQuote(null);
      onQuoteChange(null);
    }
    if (error) setError('');
  };

  return (
    <div className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4">
      <label htmlFor={`promo-code-${plan.id}`} className="flex items-center gap-2 text-sm font-bold text-[var(--space-text-primary)]">
        <TicketPercent className="h-4 w-4 text-[var(--space-text-brand)]" />Have a promo code? <span className="font-medium text-[var(--space-text-muted)]">QR payment only</span>
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id={`promo-code-${plan.id}`}
          value={code}
          onChange={(event) => updateCode(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter' && code.trim() && !loading) void applyCode(); }}
          placeholder="Enter promo code"
          autoComplete="off"
          className="min-h-11 min-w-0 flex-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 text-sm text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary-500)]"
        />
        <button type="button" onClick={() => void applyCode()} disabled={!code.trim() || loading || !sessionId} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-bold text-[var(--space-text-on-primary)] disabled:cursor-not-allowed disabled:opacity-50">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}Apply
        </button>
      </div>

      {quote && (
        <div className="mt-3 rounded-xl border border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] p-3 text-sm text-[var(--space-text-primary)]" role="status">
          <p className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" />{quote.code} applied to QR payment · {quote.percentOff}% off</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <span><span className="block text-[var(--space-text-muted)]">Original</span><span className="font-semibold line-through">{formatVnd(quote.originalAmount)}</span></span>
            <span><span className="block text-[var(--space-text-muted)]">Discount</span><span className="font-semibold text-[var(--space-semantic-success)]">−{formatVnd(quote.discountAmount)}</span></span>
            <span><span className="block text-[var(--space-text-muted)]">Final</span><span className="font-extrabold text-[var(--space-text-brand)]">{formatVnd(quote.finalAmount)}</span></span>
          </div>
        </div>
      )}

      {error && <p className="mt-3 flex items-start gap-2 text-xs font-semibold text-[var(--space-semantic-danger)]" role="alert"><TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />{error}</p>}
    </div>
  );
}
