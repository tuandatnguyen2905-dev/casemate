import paymentConfig from '../data/payment-config.json';

interface PaymentCatalogPlan {
  id: string;
  priceCents: number;
  introPriceCents?: number;
  creemProductId?: string;
}

function paymentCatalogPlan(billingPlanId: string) {
  return (paymentConfig.plans as PaymentCatalogPlan[]).find((candidate) => candidate.id === billingPlanId);
}

function cardUsd(billingPlanId: string, useIntroPrice = false) {
  const plan = paymentCatalogPlan(billingPlanId);
  const cents = useIntroPrice ? plan?.introPriceCents ?? plan?.priceCents : plan?.priceCents;
  if (!Number.isFinite(cents) || Number(cents) <= 0) throw new Error(`Missing USD price for ${billingPlanId}.`);
  return Number(cents) / 100;
}

function creemProductId(billingPlanId: string) {
  const productId = String(paymentCatalogPlan(billingPlanId)?.creemProductId || '');
  if (!productId.startsWith('prod_')) throw new Error(`Missing Creem product for ${billingPlanId}.`);
  return productId;
}

export const PRICING = {
  first_month_promo: {
    id: 'price_monthly_promo',
    usd: cardUsd('first_month_5'),
    productId: creemProductId('first_month_5'),
    vnd: 150000,
    days: 30,
    label: 'First month',
    title: 'First Month Promo',
    description: 'One-time purchase for 30 days of Casemate Pro access',
    badge: 'Start for 150.000₫',
  },
  monthly: {
    id: 'price_monthly',
    usd: cardUsd('monthly_8'),
    vnd: 200000,
    days: 30,
    label: 'Monthly',
    title: 'Monthly',
    description: '200.000₫ per month, cancel anytime',
  },
  six_month: {
    id: 'price_6month',
    usd: cardUsd('six_month_30'),
    productId: creemProductId('six_month_30'),
    vnd: 800000,
    days: 180,
    label: '6 months',
    title: '6-Month Package',
    description: 'One-time payment of 800.000₫ for 6 months',
    badge: 'Save 400.000₫',
  },
} as const;

export type PricingPlan = (typeof PRICING)[keyof typeof PRICING];
export type PricingPlanId = PricingPlan['id'];
export type BillingPlanId = 'first_month_5' | 'monthly_8' | 'six_month_30';

const BILLING_PLAN_ID_BY_PRICE_ID: Record<PricingPlanId, BillingPlanId> = {
  price_monthly_promo: 'first_month_5',
  price_monthly: 'monthly_8',
  price_6month: 'six_month_30',
};

export function resolveBillingPlanId(planId?: string | null): BillingPlanId | null {
  if (!planId) return null;
  return BILLING_PLAN_ID_BY_PRICE_ID[planId as PricingPlanId] || null;
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  PRICING.first_month_promo,
  PRICING.monthly,
  PRICING.six_month,
];

export const CASEMATE_PRO_PLAN = {
  name: 'Casemate Pro',
  priceCents: PRICING.monthly.vnd,
  priceLabel: '200.000₫',
  interval: 'month' as const,
  trialDays: 0,
  billingPlanId: BILLING_PLAN_ID_BY_PRICE_ID[PRICING.monthly.id],
  billingPlanName: 'Casemate Pro — Monthly',
};

export function formatVnd(amount: number) {
  return `${new Intl.NumberFormat('vi-VN').format(amount)}₫`;
}

export function getPricingPlan(planId?: string | null): PricingPlan | null {
  return PRICING_PLANS.find((plan) => plan.id === planId) || null;
}
