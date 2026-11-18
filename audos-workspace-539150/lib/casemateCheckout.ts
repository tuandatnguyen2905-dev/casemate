import paymentConfig from '../data/payment-config.json';
import { getPricingPlan, PRICING, PricingPlan, PricingPlanId, resolveBillingPlanId } from './pricing';
import { trackBillingEvent } from './engagementTracking';

export interface CasemateCheckoutOptions {
  email: string;
  sessionId: string;
  spaceId?: string;
  source?: string;
  promoCode?: string;
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
  promoCode?: string | null;
  percentOff?: number;
  originalAmount?: number;
  discountAmount?: number;
}

export interface CasematePayosStatus {
  status: 'pending' | 'paid' | 'cancelled';
  expiresAt?: string | null;
}

export interface CasematePromoQuote {
  code: string;
  percentOff: number;
  planId: string;
  planTitle: string;
  days: number;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
}

const PAYOS_HOOK_URL = '/api/workspaces/workspace-539150/hooks/casemate-payos-v1/execute';
const PROMO_HOOK_URL = '/api/workspaces/workspace-539150/hooks/casemate-promo-v1/execute';
const PENDING_CARD_CHECKOUT_KEY = 'casemate_pending_card_checkout';

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
    const message = String(result.error || '').replace(/PayOS/gi, 'QR payment').trim();
    throw new Error(message || 'Thanh toán QR đang tạm thời gián đoạn. Vui lòng thử lại.');
  }
  return result as T;
}

export async function startCasematePayosPayment(sessionId: string, userEmail: string, planId: PricingPlanId, buyerName: string, promoCode?: string) {
  const normalizedEmail = String(userEmail || '').trim().toLowerCase();
  if (!sessionId || !normalizedEmail) throw new Error('Vui lòng đăng nhập trước khi thanh toán bằng mã QR.');
  const selectedPlan = payosPlan(planId);
  const payment = await callCasematePayosHook<Record<string, any>>(sessionId, {
    action: 'create',
    planId,
    buyerName: String(buyerName || '').trim() || normalizedEmail.split('@')[0],
    customerEmail: normalizedEmail,
    promoCode: String(promoCode || ''),
  });
  const qrCode = String(payment.qrCode || '');
  const checkoutUrl = String(payment.checkoutUrl || '');
  if (!qrCode && !checkoutUrl) throw new Error('Không thể tạo mã QR hoặc đường dẫn thanh toán. Vui lòng thử lại.');
  return {
    orderCode: String(payment.orderCode || ''),
    amount: Number(payment.amount || selectedPlan.amount),
    description: String(payment.description || selectedPlan.description),
    qrCode,
    checkoutUrl,
    planId,
    planTitle: selectedPlan.title,
    days: selectedPlan.days,
    promoCode: payment.promoCode || null,
    percentOff: Number(payment.percentOff || 0),
    originalAmount: Number(payment.originalAmount || selectedPlan.amount),
    discountAmount: Number(payment.discountAmount || 0),
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
  if (!sessionId || !normalizedEmail) throw new Error('Vui lòng đăng nhập trước khi kiểm tra thanh toán QR.');
  return reconcileCasematePayosPayment(sessionId, orderCode);
}

function paymentAppId(spaceId: string) {
  const runtimeWindow = window as Window & { __APP_ID__?: string; __SPACE_ID__?: string };
  return runtimeWindow.__APP_ID__ || runtimeWindow.__SPACE_ID__ || spaceId;
}

async function callCasematePromoHook<T>(sessionId: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(PROMO_HOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(result.error || 'Promo validation is temporarily unavailable. Please try again.');
  }
  return result as T;
}

export async function validateCasematePromo(sessionId: string, planId: PricingPlanId, promoCode: string) {
  if (!sessionId) throw new Error('Please sign in before applying a promo code.');
  return callCasematePromoHook<CasematePromoQuote & { success: true }>(sessionId, {
    action: 'validate',
    planId,
    promoCode,
  });
}

function httpReturnBase(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return '';
  }
}

function paymentReturnBase() {
  const liveHost = ['www.casemateaud.com', 'casemateaud.com', 'app.casemateaud.com'].includes(window.location.hostname);
  if (liveHost) return 'https://app.casemateaud.com/';
  return httpReturnBase(window.location.href)
    || httpReturnBase(document.referrer)
    || 'https://app.casemateaud.com/';
}

function savePendingCardCheckout(checkoutSessionId: string, planId: PricingPlanId) {
  try {
    localStorage.setItem(PENDING_CARD_CHECKOUT_KEY, JSON.stringify({ checkoutSessionId, planId, createdAt: Date.now() }));
  } catch {
    // Checkout can still open when browser storage is restricted.
  }
}

function pendingCardCheckout() {
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_CARD_CHECKOUT_KEY) || 'null');
    if (!pending?.checkoutSessionId || !pending?.planId || Date.now() - Number(pending.createdAt || 0) > 2 * 60 * 60 * 1000) return null;
    return pending as { checkoutSessionId: string; planId: PricingPlanId };
  } catch {
    return null;
  }
}

function clearPendingCardCheckout() {
  try {
    localStorage.removeItem(PENDING_CARD_CHECKOUT_KEY);
  } catch {
    // Ignore storage restrictions after checkout.
  }
}

export function hasPendingCasemateCardCheckout() {
  return pendingCardCheckout() !== null;
}

function prepareCheckoutBackEntry() {
  const normalizeHistory = (targetWindow: Window) => {
    const backUrl = new URL(targetWindow.location.href);
    const liveHost = ['www.casemateaud.com', 'casemateaud.com', 'app.casemateaud.com'].includes(backUrl.hostname);
    if (liveHost) {
      backUrl.pathname = '/';
      backUrl.search = '';
    }
    backUrl.hash = '#settings';
    targetWindow.history.replaceState(targetWindow.history.state, '', backUrl.toString());
  };

  try {
    if (window.top && window.top !== window) normalizeHistory(window.top);
  } catch {
    // Cross-origin parent history cannot be changed from the embedded app.
  }

  try {
    normalizeHistory(window);
  } catch {
    // Checkout can still proceed if the browser refuses a history update.
  }
}

type CardProvider = 'stripe' | 'creem';

// Creem remains an isolated fallback: changing payment-config.json back to
// "creem" restores its provider-specific payload and errors without affecting PayOS.
const CARD_PROVIDER: CardProvider = String(paymentConfig.provider || '').toLowerCase() === 'creem' ? 'creem' : 'stripe';

function cardCheckoutError(data: Record<string, any>) {
  const detail = String(data.error || data.message || '').trim();
  if (/url must be valid|invalid[^.]*url|successurl|cancelurl/i.test(detail)) {
    return new Error('Card checkout could not start because the return address was rejected. No payment was started. Refresh Casemate and try again.');
  }
  return new Error('Card checkout could not start. No payment was started. Please try again or choose QR Code / Bank Transfer.');
}

function secureCheckoutUrl(value: string) {
  try {
    const base = httpReturnBase(window.location.href) || 'https://audos.com/';
    const url = new URL(value, base);
    const localHttp = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
    if (url.protocol !== 'https:' && !localHttp) return '';
    return url.toString();
  } catch {
    return '';
  }
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
  trackBillingEvent('checkout_start', {
    properties: {
      provider: CARD_PROVIDER,
      plan: plan.id,
      amount: plan.usd,
      currency: 'usd',
      source: options.source || 'settings',
      promo_applied: Boolean(String(options.promoCode || '').trim()),
    },
  });
  const email = String(options.email || '').trim().toLowerCase();
  const sessionId = String(options.sessionId || '');
  const spaceId = options.spaceId || 'workspace-539150';
  if (!email || !sessionId) throw new Error('Please sign in before choosing a Pro plan.');
  const billingPlanId = resolveBillingPlanId(plan.id);
  if (!billingPlanId) throw new Error('Please choose one of the current Casemate Pro options.');

  const returnBase = paymentReturnBase();
  const successUrl = `${returnBase}?payment_success=true&payment_plan=${encodeURIComponent(plan.id)}#settings`;
  const cancelUrl = `${returnBase}?payment_cancelled=true&payment_plan=${encodeURIComponent(plan.id)}#settings`;
  const promoCode = String(options.promoCode || '').trim();
  if (promoCode) {
    throw new Error(`${promoCode.toUpperCase()} is safely applied to QR Code / Bank Transfer. Card checkout cannot securely pre-apply this account-limited code, so no card checkout was started. Remove the code for full-price card checkout or choose QR payment below for the quoted discount.`);
  }

  const common = {
    currency: 'usd',
    customerEmail: email,
    successUrl,
    cancelUrl,
    metadata: {
      planTier: 'pro',
      planId: billingPlanId,
      billingPlanId,
      accountEmail: email,
      casemateUserId: sessionId,
      sessionId,
      accessDays: String(plan.days),
      source: options.source || 'settings',
      spaceId,
    },
  };

  const isOneTimePackage = plan.id === PRICING.first_month_promo.id || plan.id === PRICING.six_month.id;
  const endpoint = isOneTimePackage ? '/api/payments/checkout' : '/api/payments/subscribe';
  const oneTimeName = plan.id === PRICING.first_month_promo.id ? 'Casemate Pro — First Month' : 'Casemate Pro — 6 Months';
  const payload = isOneTimePackage
    ? {
        ...common,
        amount: Math.round(plan.usd * 100),
        productId: CARD_PROVIDER === 'creem' && 'productId' in plan ? plan.productId : undefined,
        accessDurationDays: plan.days,
        billingPlanName: oneTimeName,
        productName: oneTimeName,
        productDescription: `${plan.days} days of Case Pool, Case Drill, and Domain Knowledge access`,
      }
    : CARD_PROVIDER === 'creem'
      ? {
          ...common,
          billingPlanId,
        }
      : {
          ...common,
          priceCents: Math.round(plan.usd * 100),
          interval: 'month',
          intervalCount: 1,
          trialDays: 0,
          billingPlanId,
          billingPlanName: 'Casemate Pro — Monthly',
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
    throw cardCheckoutError(data);
  }
  const checkoutUrl = secureCheckoutUrl(String(data.checkoutUrl));
  if (!checkoutUrl) {
    throw new Error('Card checkout returned an invalid or insecure address. No payment was started. Please try again or choose QR Code / Bank Transfer.');
  }
  const checkoutSessionId = String(data.sessionId || data.checkoutSessionId || '');
  if (!checkoutSessionId) {
    throw new Error('Card checkout was created without a confirmation reference. No payment was started. Please try again.');
  }
  savePendingCardCheckout(checkoutSessionId, plan.id);
  // The account view is an overlay, so its URL can still point at the app
  // underneath it. Make the entry immediately before Stripe a real shell
  // route; browser Back then restores Settings with Casemate navigation.
  prepareCheckoutBackEntry();
  redirectToCheckout(checkoutUrl);
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
  clearPendingCardCheckout();
  const confirmedAmount = Number(data?.amountUsd ?? data?.amount ?? data?.amountPaid ?? data?.value ?? getPricingPlan(planId)?.usd);
  trackBillingEvent('payment_success', {
    dedupeKey: `card:${checkoutSessionId}`,
    properties: {
      provider: CARD_PROVIDER,
      plan: planId || null,
      amount: Number.isFinite(confirmedAmount) ? confirmedAmount : null,
      currency: String(data?.currency || 'usd').toLowerCase(),
      checkout_session_id: checkoutSessionId,
      trigger: 'card_return',
    },
  });
  return data;
}

export function payosReturnFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const state = String(params.get('payos') || '').toLowerCase();
  const providerStatus = String(params.get('status') || '').toLowerCase();
  const cancelled = state === 'cancel' || state === 'cancelled' || params.get('cancel') === 'true' || providerStatus === 'cancelled' || providerStatus === 'canceled';
  const success = state === 'success' || providerStatus === 'paid';
  if (!cancelled && !success) return null;
  return {
    state: cancelled ? 'cancelled' as const : 'success' as const,
    orderCode: params.get('order_code') || params.get('orderCode') || '',
  };
}

export function checkoutCancellationFromLocation() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment_cancelled') !== 'true') return null;
  clearPendingCardCheckout();
  return { planId: params.get('payment_plan') as PricingPlanId | null };
}

export function checkoutReturnFromLocation() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment_success') !== 'true') return null;
  const planId = params.get('payment_plan') as PricingPlanId | null;
  const pending = pendingCardCheckout();
  return {
    checkoutSessionId: params.get('checkout_session_id') || params.get('session_id') || (pending?.planId === planId ? pending.checkoutSessionId : ''),
    planId,
  };
}
