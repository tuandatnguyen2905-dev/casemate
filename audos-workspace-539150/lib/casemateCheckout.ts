import { PRICING, PricingPlan, PricingPlanId, resolveBillingPlanId } from './pricing';

export interface CasemateCheckoutOptions {
  email: string;
  sessionId: string;
  spaceId?: string;
  source?: string;
}

export interface CasematePayosOrder {
  orderCode: string;
  amount: number;
  description: string;
  qrCode: string;
  checkoutUrl: string;
  planId?: string;
  planTitle?: string;
  days?: number;
}

export interface CasematePayosStatus {
  status: 'pending' | 'paid' | 'cancelled';
  expiresAt?: string | null;
}

const PAYOS_HOOK_URL = '/api/workspaces/workspace-539150/hooks/casemate-payos-v1/execute';

function payosPlan(planId: PricingPlanId) {
  if (planId === PRICING.first_month_promo.id) {
    return { amount: PRICING.first_month_promo.vnd, days: PRICING.first_month_promo.days, title: PRICING.first_month_promo.title, description: 'Casemate Promo' };
  }
  if (planId === PRICING.monthly.id) {
    return { amount: PRICING.monthly.vnd, days: PRICING.monthly.days, title: PRICING.monthly.title, description: 'Casemate Monthly' };
  }
  if (planId === PRICING.six_month.id) {
    return { amount: PRICING.six_month.vnd, days: PRICING.six_month.days, title: PRICING.six_month.title, description: 'Casemate 6 Months' };
  }
  throw new Error('Vui lòng chọn một gói Casemate Pro hiện tại.');
}

async function callCasematePayosHook<T>(sessionId: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(PAYOS_HOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(result.error || 'PayOS đang tạm thời gián đoạn. Vui lòng thử lại.');
  }
  return result as T;
}

export async function startCasematePayosPayment(sessionId: string, userEmail: string, planId: PricingPlanId, buyerName: string) {
  const normalizedEmail = String(userEmail || '').trim().toLowerCase();
  if (!sessionId || !normalizedEmail) throw new Error('Vui lòng đăng nhập trước khi thanh toán qua PayOS.');
  const selectedPlan = payosPlan(planId);
  const payment = await callCasematePayosHook<Record<string, any>>(sessionId, {
    action: 'create',
    planId,
    buyerName: String(buyerName || '').trim() || normalizedEmail.split('@')[0],
    customerEmail: normalizedEmail,
  });
  const qrCode = String(payment.qrCode || '');
  const checkoutUrl = String(payment.checkoutUrl || '');
  if (!qrCode && !checkoutUrl) throw new Error('PayOS không trả về mã QR hoặc đường dẫn thanh toán. Vui lòng thử lại.');
  return {
    orderCode: String(payment.orderCode || ''),
    amount: Number(payment.amount || selectedPlan.amount),
    description: String(payment.description || selectedPlan.description),
    qrCode,
    checkoutUrl,
    planId,
    planTitle: selectedPlan.title,
    days: selectedPlan.days,
  } as CasematePayosOrder;
}

async function reconcileCasematePayosPayment(sessionId: string, orderCode: string): Promise<CasematePayosStatus> {
  const result = await callCasematePayosHook<Record<string, any>>(sessionId, { action: 'status', orderCode });
  const status: CasematePayosStatus['status'] = result.status === 'paid'
    ? 'paid'
    : result.status === 'cancelled'
      ? 'cancelled'
      : 'pending';
  return { status, expiresAt: result.expiresAt || null };
}

export async function checkCasematePayosPayment(sessionId: string, userEmail: string, orderCode: string) {
  const normalizedEmail = String(userEmail || '').trim().toLowerCase();
  if (!sessionId || !normalizedEmail) throw new Error('Vui lòng đăng nhập trước khi kiểm tra thanh toán PayOS.');
  return reconcileCasematePayosPayment(sessionId, orderCode);
}

function paymentAppId(spaceId: string) {
  const runtimeWindow = window as Window & { __APP_ID__?: string; __SPACE_ID__?: string };
  return runtimeWindow.__APP_ID__ || runtimeWindow.__SPACE_ID__ || spaceId;
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

export async function startCasemateCheckout(plan: PricingPlan, options: CasemateCheckoutOptions) {
  const email = String(options.email || '').trim().toLowerCase();
  const sessionId = String(options.sessionId || '');
  const spaceId = options.spaceId || 'workspace-539150';
  if (!email || !sessionId) throw new Error('Please sign in before choosing a Pro plan.');
  const billingPlanId = resolveBillingPlanId(plan.id);
  if (!billingPlanId) throw new Error('Please choose one of the current Casemate Pro options.');

  const successUrl = `${window.location.origin}${window.location.pathname}?payment_success=true&payment_plan=${encodeURIComponent(plan.id)}&checkout_session_id={CHECKOUT_SESSION_ID}#settings`;
  const common = {
    currency: 'vnd',
    customerEmail: email,
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

  const endpoint = plan.id === PRICING.six_month.id ? '/api/payments/checkout' : '/api/payments/subscribe';
  const payload = plan.id === PRICING.first_month_promo.id
    ? {
        ...common,
        introPriceCents: 150000,
        introInterval: 'month',
        introIntervalCount: 1,
        introIterations: 1,
        regularPriceCents: 200000,
        regularInterval: 'month',
        regularIntervalCount: 1,
        trialDays: 0,
        billingPlanId,
        billingPlanName: 'Casemate Pro — 150.000₫ first month, then 200.000₫/month',
      }
    : plan.id === PRICING.monthly.id
      ? {
          ...common,
          priceCents: 200000,
          interval: 'month',
          intervalCount: 1,
          trialDays: 0,
          billingPlanId,
          billingPlanName: 'Casemate Pro — Monthly',
        }
      : {
          ...common,
          amount: 800000,
          billingPlanId,
          billingPlanName: 'Casemate Pro — 6 Months',
          productName: 'Casemate Pro — 6 Months',
          productDescription: 'Six months of Case Pool, Case Drill, and Domain Knowledge access',
        };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-App-Id': paymentAppId(spaceId),
      'X-Session-Id': sessionId,
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.checkoutUrl) {
    throw new Error(data.error || 'Could not start checkout. Please try again.');
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
  if (!response.ok || data.success === false) throw new Error(data.error || 'Payment is still being confirmed.');
  return data;
}

export function payosReturnFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('payos');
  if (state !== 'success' && state !== 'cancel' && state !== 'cancelled') return null;
  return {
    state: state === 'success' ? 'success' as const : 'cancelled' as const,
    orderCode: params.get('order_code') || params.get('orderCode') || '',
  };
}

export function checkoutReturnFromLocation() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment_success') !== 'true') return null;
  return {
    checkoutSessionId: params.get('checkout_session_id') || params.get('session_id') || '',
    planId: params.get('payment_plan') as PricingPlanId | null,
  };
}
