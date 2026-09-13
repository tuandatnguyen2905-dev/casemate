import { PRICING, PricingPlan, PricingPlanId, resolveBillingPlanId } from './pricing';

export interface CasemateCheckoutOptions {
  email: string;
  sessionId: string;
  spaceId?: string;
  source?: string;
}

interface NativePaymentConfig {
  enabled?: boolean;
  mode?: string;
  provider?: string;
  activeProvider?: string;
  stripeAccountId?: string | null;
  currency?: string;
}

function paymentAppId(spaceId: string) {
  const runtimeWindow = window as Window & { __APP_ID__?: string; __SPACE_ID__?: string };
  return runtimeWindow.__APP_ID__ || runtimeWindow.__SPACE_ID__ || spaceId;
}

async function loadNativePaymentConfig(appId: string): Promise<NativePaymentConfig> {
  const response = await fetch('/api/space-data/payment-config.json', {
    headers: { 'X-App-Id': appId },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Secure checkout configuration could not be loaded. Please try again.');
  return response.json();
}

function amountForCurrency(plan: PricingPlan, currency: string) {
  return currency === 'vnd' ? plan.vnd : plan.usd * 100;
}

function redirectToCheckout(checkoutUrl: string) {
  try {
    if (window.top && window.top !== window) {
      window.top.location.href = checkoutUrl;
      return;
    }
  } catch {
    // Cross-origin frames cannot inspect window.top; redirect this frame instead.
  }
  window.location.href = checkoutUrl;
}

function checkoutErrorMessage(value: unknown, fallback: string) {
  const message = typeof value === 'string' ? value.trim() : '';
  if (/unknown billing plan|billing plan must be selected/i.test(message)) {
    return 'This Casemate Pro plan could not be started. Please refresh and try again.';
  }
  if (/payments? (?:is|are) not (?:enabled|configured)|no payment provider/i.test(message)) {
    return 'Secure checkout is temporarily unavailable while Wallet setup is completed.';
  }
  return message || fallback;
}

export async function startCasemateCheckout(plan: PricingPlan, options: CasemateCheckoutOptions) {
  const email = String(options.email || '').trim().toLowerCase();
  const sessionId = String(options.sessionId || '');
  const spaceId = options.spaceId || 'workspace-539150';
  if (!email || !sessionId) throw new Error('Please sign in before choosing a Pro plan.');
  const billingPlanId = resolveBillingPlanId(plan.id);
  if (!billingPlanId) throw new Error('Please choose one of the current Casemate Pro options.');

  const appId = paymentAppId(spaceId);
  const paymentConfig = await loadNativePaymentConfig(appId);
  const activeProvider = String(paymentConfig.activeProvider || paymentConfig.provider || '').trim().toLowerCase();
  if (paymentConfig.enabled === false || activeProvider === 'none') {
    throw new Error('Secure checkout is temporarily unavailable while Wallet setup is completed.');
  }
  // The native checkout endpoints resolve the active Wallet provider server-side.
  // The response is verified below so Wallet defaults can never replace a selected price silently.
  const currency = String(paymentConfig.currency || 'USD').trim().toLowerCase();
  if (currency !== 'usd' && currency !== 'vnd') {
    throw new Error('Casemate Pro checkout does not support the configured Wallet currency.');
  }

  const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&payment_plan=${encodeURIComponent(plan.id)}&checkout_session_id={CHECKOUT_SESSION_ID}#settings`;
  const common = {
    currency,
    billingPlanId,
    customerEmail,
    successUrl,
    cancelUrl: window.location.href,
    metadata: {
      planTier: 'pro',
      planId: billingPlanId,
      casemateUserId: sessionId,
      sessionId,
      accessDays: String(plan.days),
      source: options.source || 'settings',
      spaceId,
    },
  };

  const isOneTimePlan = plan.id === PRICING.six_month.id;
  const payload = plan.id === PRICING.first_month_promo.id
    ? {
        ...common,
        introPriceCents: amountForCurrency(PRICING.first_month_promo, currency),
        introInterval: 'month',
        introIntervalCount: 1,
        introIterations: 1,
        regularPriceCents: amountForCurrency(PRICING.monthly, currency),
        regularInterval: 'month',
        regularIntervalCount: 1,
        trialDays: 0,
      }
    : plan.id === PRICING.monthly.id
      ? {
          ...common,
          priceCents: amountForCurrency(PRICING.monthly, currency),
          interval: 'month',
          intervalCount: 1,
          trialDays: 0,
        }
      : {
          ...common,
          productName: plan.title,
          productDescription: plan.description,
          amount: amountForCurrency(PRICING.six_month, currency),
        };

  const response = await fetch(isOneTimePlan ? '/api/payments/checkout' : '/api/payments/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-App-Id': appId,
      'X-Session-Id': sessionId,
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.checkoutUrl) {
    throw new Error(checkoutErrorMessage(data.error, 'Could not start checkout. Please try again.'));
  }
  if (!isOneTimePlan) {
    const expectedPriceCents = amountForCurrency(plan, currency);
    const returnedPriceCents = Number(data.priceCents);
    const returnedTrialDays = Number(data.trialDays);
    if (!Number.isFinite(returnedPriceCents) || returnedPriceCents !== expectedPriceCents || !Number.isFinite(returnedTrialDays) || returnedTrialDays !== 0) {
      throw new Error(`Stripe returned a different price for ${plan.title}. Checkout was stopped before payment.`);
    }
  }
  redirectToCheckout(data.checkoutUrl);
}

export async function confirmCasemateCheckout(sessionId: string, checkoutSessionId: string, planId?: PricingPlanId | string | null) {
  if (!sessionId || !checkoutSessionId || checkoutSessionId === '{CHECKOUT_SESSION_ID}') {
    throw new Error('Checkout confirmation is missing. Please return to Settings and try again.');
  }
  const response = await fetch('/api/workspaces/workspace-539150/hooks/casemate-payment-v1/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
    body: JSON.stringify({ action: 'confirm_checkout', sessionId, checkoutSessionId, planId: planId || undefined }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(checkoutErrorMessage(data.error, 'Payment is still being confirmed.'));
  }
  return data;
}

export function checkoutReturnFromLocation() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment_success') !== 'true') return null;
  return {
    checkoutSessionId: params.get('checkout_session_id') || params.get('session_id') || '',
    planId: params.get('payment_plan') as PricingPlanId | null,
  };
}
