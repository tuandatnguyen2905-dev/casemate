import paymentConfig from '../data/payment-config.json';
import { PRICING, resolveBillingPlanId } from './pricing';

function expectEqual(actual: unknown, expected: unknown, scenario: string) {
  if (actual !== expected) throw new Error(`${scenario}: expected ${String(expected)}, received ${String(actual)}`);
}

export function runPaymentPricingRegressionTests() {
  expectEqual(paymentConfig.provider, 'creem', 'card checkout uses the configured processor');
  expectEqual(paymentConfig.currency, 'USD', 'card checkout charges in USD');

  const plans = new Map(paymentConfig.plans.map((plan) => [plan.id, plan]));
  const firstMonth = plans.get('first_month_5');
  const monthly = plans.get('monthly_8');
  const sixMonth = plans.get('six_month_30');

  expectEqual(firstMonth?.priceCents, 599, 'one-time first-month card price');
  expectEqual('introPriceCents' in (firstMonth || {}), false, 'first-month checkout stays one-time');
  expectEqual(monthly?.priceCents, 799, 'monthly card price');
  expectEqual(monthly?.intervalCount, 1, 'monthly cadence');
  expectEqual(sixMonth?.priceCents, 3099, 'six-month card price');

  expectEqual(PRICING.first_month_promo.usd, 5.99, 'UI first-month card price');
  expectEqual(PRICING.monthly.usd, 7.99, 'UI monthly card price');
  expectEqual(PRICING.six_month.usd, 30.99, 'UI six-month card price');
  expectEqual(PRICING.first_month_promo.vnd, 150000, 'QR first-month total');
  expectEqual(PRICING.monthly.vnd, 200000, 'QR monthly total');
  expectEqual(PRICING.six_month.vnd, 800000, 'QR six-month total');
  expectEqual(resolveBillingPlanId(PRICING.six_month.id), 'six_month_30', 'six-month plan mapping');
}

runPaymentPricingRegressionTests();
