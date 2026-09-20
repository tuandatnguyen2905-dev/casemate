import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRound,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { CasemateEntitlement, fetchCasemateEntitlement, storedSessionEmail } from '../lib/proAccess';
import { checkoutReturnFromLocation, confirmCasemateCheckout, startCasemateCheckout } from '../lib/casemateCheckout';
import { formatVnd, getPricingPlan, PRICING_PLANS, PricingPlan } from '../lib/pricing';

interface SettingsProps {
  spaceId: string;
}

interface StoredSession {
  email?: string;
  name?: string;
  fullName?: string;
  metadata?: { name?: string; fullName?: string };
}

function storedSession(spaceId: string): StoredSession {
  try {
    return JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
  } catch {
    return {};
  }
}

function displayDate(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value.length <= 10 ? `${value}T00:00:00Z` : value);
  if (!Number.isFinite(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date);
}

export default function Settings({ spaceId }: SettingsProps) {
  const { sessionId, setSessionId, trackEvent } = useSpaceRuntime();
  const [account, setAccount] = useState<StoredSession>(() => storedSession(spaceId));
  const [entitlement, setEntitlement] = useState<CasemateEntitlement | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const email = storedSessionEmail(spaceId) || account.email || '';
  const displayName = account.name || account.fullName || account.metadata?.name || account.metadata?.fullName || email.split('@')[0] || 'Casemate member';

  const refreshAccess = useCallback(async () => {
    if (!sessionId) {
      setEntitlement(null);
      setLoading(false);
      return null;
    }
    setLoading(true);
    setError('');
    const result = await fetchCasemateEntitlement(sessionId, { claim: false });
    setEntitlement(result);
    if (!result) setError('Unable to check access. Please try again.');
    setLoading(false);
    return result;
  }, [sessionId]);

  useEffect(() => {
    setAccount(storedSession(spaceId));
    void refreshAccess();
  }, [spaceId, sessionId, refreshAccess]);

  useEffect(() => {
    const paymentReturn = checkoutReturnFromLocation();
    if (!paymentReturn || !sessionId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    void confirmCasemateCheckout(sessionId, paymentReturn.checkoutSessionId, paymentReturn.planId)
      .then(async () => {
        if (cancelled) return;
        setNotice('Payment successful. Casemate Pro is now active.');
        await refreshAccess();
        if (!cancelled) window.history.replaceState({}, '', `${window.location.pathname}#settings`);
      })
      .catch((reason) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Payment is still being confirmed.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [sessionId, refreshAccess]);

  const trialType = entitlement?.trialType || (entitlement?.subscription_type === 'pro' ? 'pro' : entitlement?.entitled ? 'standard' : 'expired');
  const isPro = entitlement?.entitled === true && trialType === 'pro';
  const isTrial = entitlement?.entitled === true && (trialType === 'standard' || trialType === 'founding');
  const daysRemaining = Math.max(0, entitlement?.daysRemaining ?? entitlement?.days_remaining ?? 0);
  const currentPlan = getPricingPlan((entitlement as (CasemateEntitlement & { planId?: string | null }) | null)?.planId);
  const statusLabel = isPro ? 'Pro' : isTrial ? 'Free Access' : 'Free Access Ended';

  const accountSummary = useMemo(() => {
    if (loading) return 'Checking account status…';
    if (isPro) return `Pro${currentPlan ? ` · ${currentPlan.title}` : ''}`;
    if (isTrial) return `${daysRemaining} free days remaining`;
    return 'Pro features are locked';
  }, [currentPlan, daysRemaining, isPro, isTrial, loading]);

  const handleCheckout = async (plan: PricingPlan) => {
    setError('');
    setNotice('');
    setCheckoutPlan(plan.id);
    void trackEvent('checkout_start', { source: 'settings', plan: plan.id });
    try {
      await startCasemateCheckout(plan, { email, sessionId: sessionId || '', spaceId, source: 'settings' });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not start checkout.');
      setCheckoutPlan(null);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem(`space_session_${spaceId}`);
    setSessionId('');
    window.location.reload();
  };

  return (
    <div className="min-h-full bg-[var(--space-surface-page)] p-4 sm:p-6" data-testid="account-subscription-settings">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Settings</p>
            <h1 className="mt-1 text-2xl font-extrabold text-[var(--space-text-primary)]">Account &amp; Subscription</h1>
            <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Manage your account, 14-day free access, and Casemate Pro plan.</p>
          </div>
          <button type="button" onClick={() => void refreshAccess()} disabled={loading} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Check again
          </button>
        </header>

        {notice && <div className="flex items-start gap-2 rounded-2xl border border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] p-4 text-sm text-[var(--space-text-primary)]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" />{notice}</div>}
        {error && <div className="flex items-start gap-2 rounded-2xl border border-[var(--space-semantic-warning)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-4 text-sm text-[var(--space-text-primary)]" role="alert"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" /><div><p>{error}</p>{checkoutReturnFromLocation() && <button type="button" onClick={() => window.location.reload()} className="mt-2 font-bold text-[var(--space-text-brand)] underline underline-offset-2">Confirm payment again</button>}</div></div>}

        <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><UserRound className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
              <div className="min-w-0"><p className="truncate text-lg font-bold text-[var(--space-text-primary)]">{displayName}</p><p className="mt-0.5 truncate text-sm text-[var(--space-text-muted)]">{email || 'Sign in to view your account.'}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${isPro ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : isTrial ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_12%,transparent)] text-[var(--space-semantic-danger)]'}`}>{statusLabel}</span>
              {email && <button type="button" onClick={handleSignOut} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><LogOut className="h-3.5 w-3.5" />Sign Out</button>}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[var(--space-surface-muted)] p-4">
            {loading ? <div className="flex items-center gap-2 text-sm text-[var(--space-text-secondary)]"><Loader2 className="h-4 w-4 animate-spin" />{accountSummary}</div> : isTrial ? <div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-[var(--space-text-brand)]" /><div><p className="font-bold text-[var(--space-text-primary)]">{daysRemaining} free access days remaining</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><CalendarDays className="mr-1 inline h-3.5 w-3.5" />Expires {displayDate(entitlement?.expiresAt || entitlement?.trial_end_date)}</p></div></div> : isPro ? <div className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 text-[var(--space-semantic-success)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Casemate Pro is active</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" />Subscription expires: {displayDate(entitlement?.expiresAt)}</p></div></div> : <div className="flex items-start gap-3"><CreditCard className="mt-0.5 h-5 w-5 text-[var(--space-semantic-danger)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Free access has ended</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Get Pro Plan to restore access to Case Pool, Case Drill, Domain Knowledge, and Aptitude Test.</p></div></div>}
          </div>
        </section>

        <section>
          <div className="mb-3"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Casemate Pro</p><h2 className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">Choose the right plan</h2><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Fit Assessment is always free. Pay securely through the provider connected in Wallet.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <article key={plan.id} className={`relative flex min-w-0 flex-col rounded-3xl border bg-[var(--space-surface-card)] p-5 shadow-sm ${plan.id === 'price_monthly_promo' ? 'border-[var(--space-brand-primary-500)]' : 'border-[var(--space-border-default)]'}`}>
                {'badge' in plan && <span className="mb-3 w-fit rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">{plan.badge}</span>}
                <h3 className="font-bold text-[var(--space-text-primary)]">{plan.title}</h3>
                <div className="mt-3 flex items-end gap-1"><span className="text-3xl font-extrabold text-[var(--space-text-primary)]">{formatVnd(plan.vnd)}</span><span className="pb-1 text-xs text-[var(--space-text-muted)]">{plan.days === 180 ? '/ 6 months' : '/ month'}</span></div>
                <div className="mt-5 flex-1 space-y-2 text-xs text-[var(--space-text-secondary)]">{['Fit Assessment', 'Case Drill', 'Case Pool', 'Aptitude Test', 'Domain Knowledge'].map((feature) => <p key={feature} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" />{feature}</p>)}</div>
                {!isPro && <button type="button" onClick={() => void handleCheckout(plan)} disabled={!!checkoutPlan || !email || !sessionId} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)] disabled:cursor-not-allowed disabled:opacity-50">{checkoutPlan === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}Get Pro Plan</button>}
              </article>
            ))}
          </div>
          {!email && <p className="mt-3 text-center text-xs font-semibold text-[var(--space-semantic-warning)]">Please sign in to choose a Pro plan.</p>}
        </section>
      </div>
    </div>
  );
}
