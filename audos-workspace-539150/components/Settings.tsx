import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  X,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { clearWorkspaceAuthState } from '../lib/authAccount';
import { CasemateEntitlement, fetchCasemateEntitlement, storedSessionEmail } from '../lib/proAccess';
import { CasematePromoQuote, checkCasematePayosPayment, checkoutCancellationFromLocation, checkoutReturnFromLocation, confirmCasemateCheckout, payosReturnFromLocation, startCasemateCheckout } from '../lib/casemateCheckout';
import { formatVnd, getPricingPlan, PRICING_PLANS, PricingPlan } from '../lib/pricing';
import { confirmPeerBenchmarkOutcome, fetchPeerBenchmarkPrivacy } from '../lib/industryPeerBenchmark';
import type { PeerBenchmarkPrivacy } from '../lib/industryPeerBenchmark';
import { trackMetaPurchase } from '../lib/metaPixel';
import { PAYMENT_CARD_LOGOS } from '../data/paymentLogos';
import PayosQrPayment from './PayosQrPayment';
import PromoCodeField from './PromoCodeField';
import LegalLinks from './LegalLinks';
import { trackBillingEvent, trackStepError } from '../lib/engagementTracking';

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

function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

const PAYMENT_LOGO_CDN = 'https://res.cloudinary.com/asfzhhej/image/fetch/f_png,q_auto,e_trim,c_fit,w_120,h_48';

function CardNetworkMarks() {
  return (
    <span className="mt-2 flex min-h-6 items-center gap-2" aria-label="Accepted cards: Visa, Mastercard, American Express, and JCB">
      {PAYMENT_CARD_LOGOS.map((logo) => (
        <span key={logo.name} className="flex h-6 items-center justify-center" title={logo.name}>
          <img
            src={`${PAYMENT_LOGO_CDN}/${logo.src}`}
            alt={logo.name}
            width={logo.displayWidth}
            height={logo.displayHeight}
            loading="eager"
            decoding="async"
            className="block max-h-[22px] max-w-12 object-contain"
            onError={(event) => {
              if (event.currentTarget.src !== logo.src) event.currentTarget.src = logo.src;
            }}
            draggable={false}
          />
        </span>
      ))}
    </span>
  );
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
  const [paymentPlan, setPaymentPlan] = useState<PricingPlan | null>(null);
  const [promoQuote, setPromoQuote] = useState<CasematePromoQuote | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [peerPrivacy, setPeerPrivacy] = useState<PeerBenchmarkPrivacy | null>(null);
  const [peerPrivacyBusy, setPeerPrivacyBusy] = useState(false);
  const [outcomeLabel, setOutcomeLabel] = useState('');
  const billingViewTrackedRef = useRef(false);

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
    let cancelled = false;
    void fetchPeerBenchmarkPrivacy(sessionId).then((privacy) => {
      if (!cancelled && privacy) setPeerPrivacy(privacy);
    });
    return () => { cancelled = true; };
  }, [sessionId]);

  useEffect(() => {
    const paymentReturn = payosReturnFromLocation();
    if (!paymentReturn) return;
    if (paymentReturn.state === 'cancelled') {
      setError('QR payment was cancelled. Try a new QR code below or choose card payment.');
      window.history.replaceState({}, '', `${window.location.pathname}#settings`);
      return;
    }
    if (!sessionId || !email || !paymentReturn.orderCode) {
      trackStepError('billing', 'payment_success', 'payos_return_needs_sign_in', { properties: { provider: 'payos', trigger: 'payos_return' } });
      setError('Payment was received, but Casemate needs you to sign in again to activate Pro.');
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    void checkCasematePayosPayment(sessionId, email, paymentReturn.orderCode)
      .then(async (result) => {
        if (cancelled || result.status !== 'paid') return;
        trackBillingEvent('payment_success', {
          dedupeKey: `payos:${paymentReturn.orderCode}`,
          properties: {
            provider: 'payos',
            plan: null,
            amount: null,
            currency: 'vnd',
            source: 'settings',
            order_code: paymentReturn.orderCode,
            trigger: 'payos_return',
          },
        });
        trackMetaPurchase({ dedupeKey: `payos:${paymentReturn.orderCode}` });
        setNotice('Payment successful. Casemate Pro is now active.');
        await refreshAccess();
        if (!cancelled) window.history.replaceState({}, '', `${window.location.pathname}#settings`);
      })
      .catch((reason) => {
        if (!cancelled) trackStepError('billing', 'payment_success', reason, { properties: { provider: 'payos', trigger: 'payos_return' } });
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Payment is still being confirmed.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [email, sessionId, refreshAccess]);

  useEffect(() => {
    const paymentCancellation = checkoutCancellationFromLocation();
    if (!paymentCancellation) return;
    setNotice('');
    setError('Payment cancelled. No charge was made. You can choose either card or QR payment when you are ready.');
    window.history.replaceState({}, '', `${window.location.pathname}#settings`);
  }, []);

  useEffect(() => {
    const paymentReturn = checkoutReturnFromLocation();
    if (!paymentReturn || !sessionId) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    void confirmCasemateCheckout(sessionId, paymentReturn.checkoutSessionId, paymentReturn.planId)
      .then(async (confirmation) => {
        if (cancelled) return;
        const plan = getPricingPlan(paymentReturn.planId);
        const confirmedValue = Number(
          confirmation?.amountUsd ?? confirmation?.amount ?? confirmation?.amountPaid ?? confirmation?.value ?? plan?.usd,
        );
        trackMetaPurchase({
          dedupeKey: `card:${paymentReturn.checkoutSessionId}`,
          value: Number.isFinite(confirmedValue) ? confirmedValue : undefined,
          currency: String(confirmation?.currency || 'USD').toUpperCase(),
          planId: paymentReturn.planId || plan?.id,
        });
        setNotice('Payment successful. Casemate Pro is now active.');
        await refreshAccess();
        if (!cancelled) window.history.replaceState({}, '', `${window.location.pathname}#settings`);
      })
      .catch((reason) => {
        if (!cancelled) trackStepError('billing', 'payment_success', reason, { properties: { provider: 'card', trigger: 'card_return' } });
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

  useEffect(() => {
    if (loading || !entitlement || isPro || billingViewTrackedRef.current) return;
    billingViewTrackedRef.current = true;
    trackBillingEvent('paywall_view', {
      appId: null,
      dedupeKey: 'settings',
      properties: {
        reason: isTrial ? 'trial_active' : 'trial_ended',
        plan: currentPlan?.id ?? null,
        trial_type: trialType,
        source: 'settings',
      },
    });
  }, [currentPlan, entitlement, isPro, isTrial, loading, trialType]);

  const handleCheckout = async (plan: PricingPlan) => {
    setError('');
    setNotice('');
    setCheckoutPlan(plan.id);
    void trackEvent('checkout_start', { source: 'settings', plan: plan.id });
    try {
      await startCasemateCheckout(plan, { email, sessionId: sessionId || '', spaceId, source: 'settings', promoCode: promoQuote?.code });
    } catch (reason) {
      trackStepError('billing', 'checkout_start', reason, { properties: { provider: 'card', source: 'settings' } });
      setError(reason instanceof Error ? reason.message : 'Could not start checkout. No payment was started.');
      setCheckoutPlan(null);
    }
  };

  const handleOutcomeConfirmation = async () => {
    if (!outcomeLabel.trim()) return;
    setPeerPrivacyBusy(true);
    setError('');
    setNotice('');
    const privacy = await confirmPeerBenchmarkOutcome(sessionId, outcomeLabel);
    if (!privacy) setError('Unable to record your outcome. Please try again.');
    else {
      setPeerPrivacy(privacy);
      setOutcomeLabel('');
      setNotice('Your outcome was recorded for founder verification. It does not affect your score.');
    }
    setPeerPrivacyBusy(false);
  };

  const handleSignOut = async () => {
    const currentSessionId = sessionId;
    setSessionId('');
    await clearWorkspaceAuthState(spaceId, currentSessionId);
    // A document-level navigation clears every mounted app store and removes
    // the #settings route, so the unauthenticated root renders EmailGate.
    window.location.replace('/');
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
        {error && <div className="flex items-start gap-2 rounded-2xl border border-[var(--space-semantic-warning)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-4 text-sm text-[var(--space-text-primary)]" role="alert"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" /><div><p>{error}</p>{(checkoutReturnFromLocation() || payosReturnFromLocation()?.state === 'success') && <button type="button" onClick={() => window.location.reload()} className="mt-2 font-bold text-[var(--space-text-brand)] underline underline-offset-2">Confirm payment again</button>}</div></div>}

        <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><UserRound className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
              <div className="min-w-0"><p className="truncate text-lg font-bold text-[var(--space-text-primary)]">{displayName}</p><p className="mt-0.5 truncate text-sm text-[var(--space-text-muted)]">{email || 'Sign in to view your account.'}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${isPro ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : isTrial ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_12%,transparent)] text-[var(--space-semantic-danger)]'}`}>{statusLabel}</span>
              {email && <button type="button" onClick={() => void handleSignOut()} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><LogOut className="h-3.5 w-3.5" />Sign Out</button>}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[var(--space-surface-muted)] p-4">
            {loading ? <div className="flex items-center gap-2 text-sm text-[var(--space-text-secondary)]"><Loader2 className="h-4 w-4 animate-spin" />{accountSummary}</div> : isTrial ? <div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-5 w-5 text-[var(--space-text-brand)]" /><div><p className="font-bold text-[var(--space-text-primary)]">{daysRemaining} free access days remaining</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><CalendarDays className="mr-1 inline h-3.5 w-3.5" />Expires {displayDate(entitlement?.expiresAt || entitlement?.trial_end_date)}</p></div></div> : isPro ? <div className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 text-[var(--space-semantic-success)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Casemate Pro is active</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" />Subscription expires: {displayDate(entitlement?.expiresAt)}</p></div></div> : <div className="flex items-start gap-3"><CreditCard className="mt-0.5 h-5 w-5 text-[var(--space-semantic-danger)]" /><div><p className="font-bold text-[var(--space-text-primary)]">Free access has ended</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Get Pro Plan to restore access to Case Pool, Case Arena, Case Drill, Domain Knowledge, and Aptitude Test.</p></div></div>}
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><ShieldCheck className="h-5 w-5 text-[var(--space-text-brand)]" /></span><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Peer benchmarks</p><h2 className="mt-1 text-lg font-extrabold text-[var(--space-text-primary)]">Outcome verification</h2><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Anonymous data contribution is chosen once when you confirm your CV in Fit Assessment. Use this section only to report an admit or offer outcome.</p></div></div>
          <div className="mt-4"><p className="text-sm font-bold text-[var(--space-text-primary)]">Confirm an offer or admit outcome</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Optionally report an outcome for founder review. Only founder-verified outcomes receive the “verified admit” peer quality tier.</p>{peerPrivacy?.admit_verified ? <p className="mt-3 inline-flex rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-3 py-1.5 text-xs font-bold text-[var(--space-semantic-success)]">Verified admit</p> : peerPrivacy?.admit_claimed ? <p className="mt-3 text-xs font-semibold text-[var(--space-text-muted)]">Outcome submitted · awaiting founder verification</p> : <div className="mt-3 flex flex-col gap-2 sm:flex-row"><input value={outcomeLabel} onChange={(event) => setOutcomeLabel(event.target.value)} maxLength={160} placeholder="Program and outcome, e.g. ABC Management Trainee — offer received" className="min-h-11 min-w-0 flex-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 text-sm" /><button type="button" disabled={peerPrivacyBusy || !outcomeLabel.trim()} onClick={() => void handleOutcomeConfirmation()} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-xs font-bold text-[var(--space-text-primary)] disabled:opacity-50">Submit for verification</button></div>}</div>
        </section>

        <section>
          <div className="mb-3"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Casemate Pro</p><h2 className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">Choose the right plan</h2><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Fit Assessment is always free. Pay by credit or debit card in USD, or by QR code / bank transfer in VND.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <article key={plan.id} className={`relative flex min-w-0 flex-col rounded-3xl border bg-[var(--space-surface-card)] p-5 shadow-sm ${plan.id === 'price_monthly_promo' ? 'border-[var(--space-brand-primary-500)]' : 'border-[var(--space-border-default)]'}`}>
                {'badge' in plan && <span className="mb-3 w-fit rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">{plan.badge}</span>}
                <h3 className="font-bold text-[var(--space-text-primary)]">{plan.title}</h3>
                <div className="mt-3 flex items-end gap-1"><span className="text-3xl font-extrabold text-[var(--space-text-primary)]">{formatVnd(plan.vnd)}</span><span className="pb-1 text-xs text-[var(--space-text-muted)]">{plan.days === 180 ? '/ 6 months' : '/ month'}</span></div>
                <div className="mt-5 flex-1 space-y-2 text-xs text-[var(--space-text-secondary)]">{['Fit Assessment', 'Case Drill', 'Case Pool', 'Case Arena', 'Aptitude Test', 'Domain Knowledge'].map((feature) => <p key={feature} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" />{feature}</p>)}</div>
                {!isPro && <button type="button" onClick={() => { setError(''); setNotice(''); setPromoQuote(null); setPaymentPlan(plan); }} disabled={!!checkoutPlan || !email || !sessionId} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)] disabled:cursor-not-allowed disabled:opacity-50"><CreditCard className="h-4 w-4" />Get Pro Plan</button>}
              </article>
            ))}
          </div>

          {!email && <p className="mt-3 text-center text-xs font-semibold text-[var(--space-semantic-warning)]">Please sign in to choose a Pro plan.</p>}
          <LegalLinks lead="By subscribing you agree to our" className="mt-3 text-center" />
        </section>

        {paymentPlan && !isPro && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[color-mix(in_srgb,var(--space-neutral-950)_55%,transparent)] p-4 backdrop-blur-sm" role="presentation">
            <section role="dialog" aria-modal="true" aria-labelledby="payment-method-title" className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-2xl sm:p-6">
              <button type="button" onClick={() => { setPromoQuote(null); setPaymentPlan(null); }} disabled={!!checkoutPlan} aria-label="Close payment methods" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)] disabled:opacity-50"><X className="h-4 w-4" /></button>
              <div className="pr-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Casemate Pro · {paymentPlan.title}</p>
                <h2 id="payment-method-title" className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">Choose payment method</h2>
                <p className="mt-1 text-sm text-[var(--space-text-secondary)]">{paymentPlan.days === 180 ? '6 months' : '30 days'} Pro · Card {formatUsd(paymentPlan.usd)}, charged in USD · QR code / bank transfer {formatVnd(paymentPlan.vnd)}.</p>
              </div>

              <PromoCodeField plan={paymentPlan} sessionId={sessionId || ''} onQuoteChange={setPromoQuote} />

              {error && <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[var(--space-semantic-warning)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-3 text-sm text-[var(--space-text-primary)]" role="alert"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" /><p>{error}</p></div>}

              <div className="mt-5 grid gap-3">
                <button type="button" onClick={() => void handleCheckout(paymentPlan)} disabled={!!checkoutPlan} className="flex min-h-[76px] w-full items-center gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left transition hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)] disabled:cursor-not-allowed disabled:opacity-60">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><CreditCard className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[var(--space-text-primary)]">Credit or Debit Card</span><span className="mt-0.5 block text-xs text-[var(--space-text-secondary)]">Secure card checkout · {formatUsd(paymentPlan.usd)} · charged in USD{promoQuote ? ` · ${promoQuote.code} is available with QR payment only` : ''}</span><CardNetworkMarks /></span>
                  {checkoutPlan === paymentPlan.id && <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[var(--space-text-brand)]" />}
                </button>

                <PayosQrPayment
                  sessionId={sessionId || ''}
                  userEmail={email}
                  source="settings"
                  buyerName={displayName}
                  plan={paymentPlan}
                  promoCode={promoQuote?.code}
                  disabled={!!checkoutPlan || !email || !sessionId}
                  triggerLabel="QR Code / Bank Transfer"
                  triggerDescription={`${formatVnd(promoQuote?.finalAmount || paymentPlan.vnd)} · ${paymentPlan.days === 180 ? '6 months' : '30 days'} Pro · Vietnamese banking app`}
                  onSuccess={async () => {
                    setNotice('Payment successful. Casemate Pro is now active.');
                    setError('');
                    await refreshAccess();
                  }}
                  onSwitchToCard={() => setError('Choose Credit or Debit Card above to continue with card payment.')}
                />
              </div>
              <LegalLinks lead="By paying you agree to our" className="mt-4 text-center" />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
