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
import { formatVnd, getPricingPlan, PRICING, PRICING_PLANS, PricingPlan } from '../lib/pricing';

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
    window.dispatchEvent(new CustomEvent('casemate:entitlement-updated', {
      detail: { sessionId, entitlement: result },
    }));
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
  const isTeamAccount = entitlement?.entitled === true && entitlement?.reason === 'team_account';
  const isPro = entitlement?.entitled === true && trialType === 'pro' && !isTeamAccount;
  const isTemporaryTester = entitlement?.entitled === true && trialType === 'temporary_tester';
  const isTrial = entitlement?.entitled === true && (trialType === 'standard' || trialType === 'founding');
  const isTrialEnded = entitlement?.trialEnded === true || entitlement?.reason === 'trial_ended_override';
  const isFallbackFree = entitlement?.reason === 'free_fallback' || entitlement?.fallback === true;
  const daysRemaining = Math.max(0, entitlement?.daysRemaining ?? entitlement?.days_remaining ?? 0);
  const currentPlan = getPricingPlan((entitlement as (CasemateEntitlement & { planId?: string | null }) | null)?.planId);
  const statusLabel = isTeamAccount ? 'Team Access' : isPro ? 'Pro' : isTemporaryTester ? 'User Tester' : isTrial ? 'Free Trial' : isTrialEnded ? 'Trial Ended' : isFallbackFree ? 'Free' : null;

  const accountSummary = useMemo(() => {
    if (loading) return 'Checking account status…';
    if (isTeamAccount) return 'Team Access · Permanent Pro access';
    if (isPro) return `Pro${currentPlan ? ` · ${currentPlan.title}` : ''}`;
    if (isTemporaryTester) return `User Tester · ${daysRemaining} days remaining`;
    if (isTrial) return `${daysRemaining} trial days remaining`;
    if (isTrialEnded) return 'Pro features are locked';
    if (isFallbackFree) return 'Free access · account status will refresh automatically';
    return email ? 'Choose a Pro plan to unlock all features' : 'Sign in to view your access';
  }, [currentPlan, daysRemaining, email, isFallbackFree, isPro, isTeamAccount, isTemporaryTester, isTrial, isTrialEnded, loading]);

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
            <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Manage your account, free trial, and Casemate Pro plan.</p>
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
              {statusLabel && <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${isTeamAccount || isPro || isTemporaryTester ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : isTrial ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : isFallbackFree ? 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_12%,transparent)] text-[var(--space-semantic-danger)]'}`}>{statusLabel}</span>}
              {email && <button type="button" onClick={handleSignOut} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><LogOut className="h-3.5 w-3.5" />Sign Out</button>}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[var(--space-surface-muted)] p-4">
            {loading ? <div className="flex items-center gap-2 text-sm text-[var(--space-text-secondary)]"><Loader2 className="h-4 w-4 animate-spin" />{accountSummary}</div> : isTeamAccount ? <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-[var(--space-semantic-success)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Team Access is active</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Permanent full access to every Casemate Pro feature.</p></div></div> : isTemporaryTester ? <div className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 text-[var(--space-semantic-success)]" /><div><p className="font-bold text-[var(--space-text-primary)]">User Tester access is active</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><CalendarDays className="mr-1 inline h-3.5 w-3.5" />Full Pro access through {displayDate(entitlement?.free_until || entitlement?.expiresAt || entitlement?.trial_end_date)}</p></div></div> : isTrial ? <div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-[var(--space-text-brand)]" /><div><p className="font-bold text-[var(--space-text-primary)]">{daysRemaining} trial days remaining</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><CalendarDays className="mr-1 inline h-3.5 w-3.5" />Expires {displayDate(entitlement?.expiresAt || entitlement?.trial_end_date)}</p></div></div> : isPro ? <div className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 text-[var(--space-semantic-success)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Casemate Pro is active</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" />Subscription expires: {displayDate(entitlement?.expiresAt)}</p></div></div> : isTrialEnded ? <div className="flex items-start gap-3"><CreditCard className="mt-0.5 h-5 w-5 text-[var(--space-semantic-danger)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Trial has ended</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Get Pro Plan to restore access to Case Pool, Case Drill, and Domain Knowledge.</p></div></div> : <div className="flex items-start gap-3"><CreditCard className="mt-0.5 h-5 w-5 text-[var(--space-text-brand)]" /><div><p className="font-bold text-[var(--space-text-primary)]">{email ? 'Choose a Casemate Pro plan' : 'Sign in to continue'}</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">{email ? 'Select a plan below to unlock all Pro features.' : 'Sign in to view your trial or subscription status.'}</p></div></div>}
          </div>
        </section>

        <section>
          <div className="mb-3"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Casemate Pro</p><h2 className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">Choose the right plan</h2><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Fit Assessment is always free. Pay securely through the provider connected in Wallet.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <article key={plan.id} className={`relative flex min-w-0 flex-col rounded-3xl border bg-[var(--space-surface-card)] p-5 shadow-sm ${plan.id === PRICING.first_month_promo.id ? 'border-[var(--space-brand-primary-500)]' : 'border-[var(--space-border-default)]'}`}>
                {'badge' in plan && <span className="mb-3 w-fit rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">{plan.badge}</span>}
                <h3 className="font-bold text-[var(--space-text-primary)]">{plan.title}</h3>
                <div className="mt-3 flex items-end gap-1"><span className="text-3xl font-extrabold text-[var(--space-text-primary)]">${plan.usd}</span><span className="pb-1 text-xs text-[var(--space-text-muted)]">{plan.days === 180 ? '/ 6 months' : '/ month'}</span></div>
                <p className="mt-1 text-sm font-semibold text-[var(--space-text-brand)]">≈ {formatVnd(plan.vnd)}</p>
                <p className="mt-3 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">{plan.description}</p>
                <div className="mt-4 space-y-2 text-xs text-[var(--space-text-secondary)]">{['Case Pool', 'Case Drill', 'Domain Knowledge'].map((feature) => <p key={feature} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" />{feature}</p>)}</div>
                {!isPro && !isTeamAccount && <button type="button" onClick={() => void handleCheckout(plan)} disabled={!!checkoutPlan || !email || !sessionId} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)] disabled:cursor-not-allowed disabled:opacity-50">{checkoutPlan === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}Get Pro Plan</button>}
              </article>
            ))}
          </div>
          {!email && <p className="mt-3 text-center text-xs font-semibold text-[var(--space-semantic-warning)]">Please sign in to choose a Pro plan.</p>}
        </section>
      </div>
    </div>
  );
}
