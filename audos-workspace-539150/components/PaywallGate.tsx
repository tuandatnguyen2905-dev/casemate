// Casemate Pro paywall gate — authoritative fourteen-day free access and three-plan pricing.
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BookOpen, BrainCircuit, CheckCircle2, CreditCard, Loader2, Lock, RefreshCw, Target, Zap } from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { CasemateEntitlement, fetchCasemateEntitlement, readCachedCasemateEntitlement, storedSessionEmail } from '../lib/proAccess';
import { startCasemateCheckout } from '../lib/casemateCheckout';
import { CASEMATE_PRO_PLAN, formatVnd, PRICING_PLANS, PricingPlan } from '../lib/pricing';

export { CASEMATE_PRO_PLAN };

interface PaywallGateProps {
  appId: string;
  appName: string;
  children: ReactNode;
  onBlocked?: (reason: 'trial_ended') => void;
}

interface TrialEndedModalProps {
  background: ReactNode;
  onUpgrade: () => void;
}

function TrialEndedModal({ background, onUpgrade }: TrialEndedModalProps) {
  return (
    <div className="relative h-full overflow-hidden bg-[var(--space-surface-page)]" data-testid="trial-ended-paywall">
      <div className="pointer-events-none h-full select-none blur-sm" aria-hidden="true">{background}</div>
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[color-mix(in_srgb,var(--space-surface-page)_68%,transparent)] p-4 backdrop-blur-md">
        <section role="dialog" aria-modal="true" aria-labelledby="trial-ended-title" className="w-full max-w-[400px] rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center shadow-2xl sm:p-7">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><Lock className="h-5 w-5 text-[var(--space-text-brand)]" /></div>
          <h1 id="trial-ended-title" className="mt-4 text-xl font-extrabold text-[var(--space-text-primary)]">Your 14-day free access has ended</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Upgrade to Pro to continue using all Casemate features.</p>
          <button type="button" onClick={onUpgrade} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)] transition-colors hover:bg-[var(--space-brand-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)] focus-visible:ring-offset-2">
            <CreditCard className="h-4 w-4" />Upgrade to Pro
          </button>
        </section>
      </div>
    </div>
  );
}

export default function PaywallGate({ appId, appName, children, onBlocked }: PaywallGateProps) {
  const { sessionId, trackEvent } = useSpaceRuntime();
  const identity = sessionId || '';
  const initialEntitlement = readCachedCasemateEntitlement(identity);
  const [entitlement, setEntitlement] = useState<CasemateEntitlement | null>(initialEntitlement);
  const [checked, setChecked] = useState(initialEntitlement !== null);
  const [unavailable, setUnavailable] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState('');
  const checkedIdentityRef = useRef(initialEntitlement ? identity : '');
  const viewTrackedRef = useRef(false);
  const blockedTrackedRef = useRef(false);

  const checkAccess = async () => {
    const result = await fetchCasemateEntitlement(sessionId || '', { claim: false, forceRefresh: true });
    setEntitlement(result);
    setUnavailable(result === null);
    setChecked(true);
    checkedIdentityRef.current = identity;
    return result;
  };

  useEffect(() => {
    let cancelled = false;
    blockedTrackedRef.current = false;
    const cached = readCachedCasemateEntitlement(identity);
    setEntitlement(cached);
    setChecked(cached !== null);
    setUnavailable(false);
    if (cached) checkedIdentityRef.current = identity;
    void fetchCasemateEntitlement(sessionId || '', { claim: false }).then((result) => {
      if (!cancelled) {
        setEntitlement(result);
        setUnavailable(result === null);
        setChecked(true);
        checkedIdentityRef.current = identity;
      }
    });
    return () => { cancelled = true; };
  }, [identity, sessionId]);

  const matchesIdentity = checkedIdentityRef.current === identity;
  const hasAccess = matchesIdentity && entitlement?.entitled === true;
  const checking = !checked || !matchesIdentity;
  const gateVisible = !checking && !unavailable && !hasAccess;
  const hadPriorProAccess = (entitlement as (CasemateEntitlement & { hadPriorProAccess?: boolean }) | null)?.hadPriorProAccess === true;

  useEffect(() => {
    if (!gateVisible || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    void trackEvent('pricing_view', { source: 'paywall', app: appId, plans: PRICING_PLANS.map((plan) => plan.id) });
  }, [appId, gateVisible, trackEvent]);

  useEffect(() => {
    if (!gateVisible || blockedTrackedRef.current || !onBlocked) return;
    blockedTrackedRef.current = true;
    try {
      onBlocked('trial_ended');
    } catch (error) {
      console.warn('[PaywallGate] blocked-entry notification failed:', appId, error);
    }
  }, [appId, gateVisible, onBlocked]);

  const openCheckout = async (plan: PricingPlan) => {
    setCheckoutPlan(plan.id);
    setCheckoutError('');
    void trackEvent('pricing_plan_selected', { source: `paywall_${appId}`, app: appId, plan: plan.id });
    try {
      await startCasemateCheckout(plan, {
        email: storedSessionEmail() || '',
        sessionId: sessionId || '',
        source: `paywall_${appId}`,
      });
    } catch (reason) {
      setCheckoutError(reason instanceof Error ? reason.message : 'Could not start checkout.');
      setCheckoutPlan(null);
    }
  };

  if (hasAccess) return <>{children}</>;

  if (checking || unavailable) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--space-surface-page)]">
        <div className="max-w-sm px-6 text-center">
          {unavailable ? <RefreshCw className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" /> : <Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--space-text-brand)]" />}
          <p className="mt-3 text-sm font-semibold text-[var(--space-text-primary)]">{unavailable ? 'Unable to verify access' : 'Checking access…'}</p>
          {unavailable && <button type="button" onClick={() => { setRefreshing(true); void checkAccess().finally(() => setRefreshing(false)); }} disabled={refreshing} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-2.5 text-sm font-semibold text-[var(--space-text-on-primary)] disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />Try again</button>}
        </div>
      </div>
    );
  }

  const standardPaywall = (
    <div className="h-full overflow-y-auto bg-[var(--space-surface-page)]" data-testid="paywall-gate">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)]"><Lock className="h-5 w-5 text-[var(--space-text-brand)]" /></div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Casemate Pro</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[var(--space-text-primary)]">Your 14-day free access has ended</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">Fit Assessment, Browse Programs, and My Roadmap remain free. Explore Pro plans to keep using <strong>{appName}</strong>, Case Pool, Case Drill, Domain Knowledge, and Aptitude Test.</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <article key={plan.id} className={`relative flex flex-col rounded-3xl border bg-[var(--space-surface-card)] p-5 shadow-sm ${plan.id === 'price_monthly_promo' ? 'border-[var(--space-brand-primary-500)]' : 'border-[var(--space-border-default)]'}`}> 
              {'badge' in plan && <span className="mb-3 w-fit rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">{plan.badge}</span>}
              <h2 className="font-bold text-[var(--space-text-primary)]">{plan.title}</h2>
              <div className="mt-3 flex items-end gap-1"><span className="text-3xl font-extrabold text-[var(--space-text-primary)]">{formatVnd(plan.vnd)}</span><span className="pb-1 text-xs text-[var(--space-text-muted)]">{plan.days === 180 ? '/ 6 months' : '/ month'}</span></div>
              <p className="mt-3 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-xs text-[var(--space-text-secondary)]"><li className="flex gap-2"><Target className="h-3.5 w-3.5 text-[var(--space-text-brand)]" />Unlimited Case Pool</li><li className="flex gap-2"><Zap className="h-3.5 w-3.5 text-[var(--space-text-brand)]" />Unlimited Case Drill</li><li className="flex gap-2"><BookOpen className="h-3.5 w-3.5 text-[var(--space-text-brand)]" />Full Domain Knowledge access</li><li className="flex gap-2"><BrainCircuit className="h-3.5 w-3.5 text-[var(--space-text-brand)]" />Full Aptitude Test access</li></ul>
              <button type="button" onClick={() => void openCheckout(plan)} disabled={!!checkoutPlan} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)] disabled:cursor-not-allowed disabled:opacity-60">{checkoutPlan === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}Get Pro Plan</button>
            </article>
          ))}
        </div>

        {checkoutError && <p className="mt-4 text-center text-sm font-semibold text-[var(--space-semantic-danger)]" role="alert">{checkoutError}</p>}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--space-text-muted)]"><span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--space-semantic-success)]" />3 clear pricing plans</span><span>Fit Assessment is always free</span><button type="button" onClick={() => void checkAccess()} className="font-semibold text-[var(--space-text-brand)] underline-offset-2 hover:underline">Check access again</button></div>
      </div>
    </div>
  );

  if (hadPriorProAccess) {
    return <TrialEndedModal background={standardPaywall} onUpgrade={() => {
      void trackEvent('trial_ended_upgrade_selected', { source: 'trial_ended_modal', app: appId });
      window.location.hash = '#settings';
    }} />;
  }

  return standardPaywall;
}
