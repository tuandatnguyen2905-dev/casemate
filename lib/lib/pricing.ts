export const PRICING = {
  first_month_promo: {
    id: 'first_month_5',
    usd: 5,
    vnd: 105000,
    days: 30,
    label: 'First month',
    title: 'First Month Promo',
    description: '$5 for the first month, then automatically renews at $8/month',
    badge: 'Start for $5',
  },
  monthly: {
    id: 'monthly_8',
    usd: 8,
    vnd: 168000,
    days: 30,
    label: 'Monthly',
    title: 'Monthly',
    description: '$8 per month, cancel anytime',
  },
  six_month: {
    id: 'six_month_30',
    usd: 30,
    vnd: 630000,
    days: 180,
    label: '6 months',
    title: '6-Month Package',
    description: 'One-time payment of $30 for 6 months',
    badge: 'Save $18',
  },
} as const;

export type PricingPlan = (typeof PRICING)[keyof typeof PRICING];
export type PricingPlanId = PricingPlan['id'];
export const PRICING_PLANS: readonly PricingPlan[] = [
  PRICING.first_month_promo,
  PRICING.monthly,
  PRICING.six_month,
];

// Old checkout links, subscription metadata, and pre-Wallet plan names may
// still arrive after this catalog changes. Normalize those values only at the
// compatibility boundary; every new checkout uses the Wallet plan ids above.
export const LEGACY_BILLING_PLAN_ALIASES: Readonly<Record<string, PricingPlanId>> = {
  price_monthly_promo: PRICING.first_month_promo.id,
  promo_monthly: PRICING.first_month_promo.id,
  'promo-monthly': PRICING.first_month_promo.id,
  price_monthly: PRICING.monthly.id,
  monthly: PRICING.monthly.id,
  price_6month: PRICING.six_month.id,
  price_six_month: PRICING.six_month.id,
  six_month: PRICING.six_month.id,
  'six-month': PRICING.six_month.id,
};

export function resolveBillingPlanId(planId?: string | null): PricingPlanId | null {
  const value = String(planId || '').trim();
  if (!value) return null;
  const resolved = LEGACY_BILLING_PLAN_ALIASES[value] || value;
  return PRICING_PLANS.some((plan) => plan.id === resolved) ? resolved as PricingPlanId : null;
}

export const CASEMATE_PRO_PLAN = {
  name: 'Casemate Pro',
  priceCents: PRICING.monthly.usd * 100,
  priceLabel: `$${PRICING.monthly.usd}`,
  interval: 'month' as const,
  trialDays: 0,
  billingPlanId: PRICING.monthly.id,
  billingPlanName: 'Casemate Pro — Monthly',
};

export function formatVnd(amount: number) {
  return `${new Intl.NumberFormat('en-US').format(amount)}₫`;
}

export function getPricingPlan(planId?: string | null): PricingPlan | null {
  const resolvedPlanId = resolveBillingPlanId(planId);
  return resolvedPlanId ? PRICING_PLANS.find((plan) => plan.id === resolvedPlanId) || null : null;
}
