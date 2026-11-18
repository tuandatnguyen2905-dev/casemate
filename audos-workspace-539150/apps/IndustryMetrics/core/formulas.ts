import { evaluateSpec, kernels } from './formulaEngine';
import type { FormulaConstraint, FormulaResult, FormulaSpec, VariableSpec } from './formulaEngine';
import type { UnitId } from './types';

const NONNEG = 'Reported amounts for the period are zero or positive.';
const SIGNED = 'Can be negative (a loss or a net release), so no lower bound is set.';
const BASE = 'Must be greater than zero because the ratio is measured against it.';
const COUNT = 'Counts are non-negative.';
const FRACTION = 'A share of a whole, so it lies between 0% and 100% by definition.';

function v(id: string, label: string, unit: UnitId, rangeNote: string, opts: Partial<VariableSpec> = {}): VariableSpec {
  return { id, label, unit, rangeNote, ...opts };
}
const money = (id: string, label: string, opts: Partial<VariableSpec> = {}) => v(id, label, 'currency', NONNEG, { min: 0, ...opts });
const signedMoney = (id: string, label: string) => v(id, label, 'currency', SIGNED);
const baseMoney = (id: string, label: string) => v(id, label, 'currency', BASE, { min: 0, denominator: true });
const count = (id: string, label: string, opts: Partial<VariableSpec> = {}) => v(id, label, 'count', COUNT, { min: 0, ...opts });
const baseCount = (id: string, label: string) => v(id, label, 'count', BASE, { min: 0, denominator: true });
const pct = (id: string, label: string, opts: Partial<VariableSpec> = {}) => v(id, label, 'percent', FRACTION, { min: 0, max: 1, ...opts });

function notAbove(part: string, whole: string, message: string): FormulaConstraint {
  return { code: 'INVALID_COMBINATION', message, holds: (x) => x[part] <= x[whole] };
}

/** Ratio of two same-unit quantities (a share, margin or multiple). */
function shareFormula(
  id: string,
  expression: string,
  numerator: VariableSpec,
  denominator: VariableSpec,
  outputUnit: 'percent' | 'times' = 'percent',
  constraints?: FormulaConstraint[],
): FormulaSpec {
  return {
    id,
    expression,
    kernel: 'ratio',
    variables: [numerator, denominator],
    outputUnit,
    unitRule: 'share',
    constraints,
    compute: (x) => kernels.ratio(x[numerator.id], x[denominator.id]),
  };
}

/** Part of a whole where the part cannot exceed the whole (0–100%). */
function partOfWhole(id: string, expression: string, part: VariableSpec, whole: VariableSpec): FormulaSpec {
  return shareFormula(id, expression, part, whole, 'percent', [
    notAbove(part.id, whole.id, `${part.label} cannot exceed ${whole.label.toLowerCase()}.`),
  ]);
}

/** Quantity per unit of a driver, e.g. revenue per room or cost per tonne. */
function rateFormula(id: string, expression: string, numerator: VariableSpec, denominator: VariableSpec, outputUnit: UnitId): FormulaSpec {
  return {
    id,
    expression,
    kernel: 'ratio',
    variables: [numerator, denominator],
    outputUnit,
    unitRule: 'rate',
    numeratorVars: [numerator.id],
    denominatorVars: [denominator.id],
    compute: (x) => kernels.ratio(x[numerator.id], x[denominator.id]),
  };
}

function changeFormula(id: string, expression: string, current: VariableSpec, prior: VariableSpec): FormulaSpec {
  return {
    id,
    expression,
    kernel: 'percent-change',
    variables: [current, prior],
    outputUnit: 'percent',
    unitRule: 'change',
    compute: (x) => kernels.percentChange(x[current.id], x[prior.id]),
  };
}

/** (Revenue − cost) ÷ revenue. */
function marginFormula(id: string, expression: string, revenue: VariableSpec, cost: VariableSpec): FormulaSpec {
  return {
    id,
    expression,
    kernel: 'margin',
    variables: [revenue, cost],
    outputUnit: 'percent',
    unitRule: 'share',
    compute: (x) => kernels.margin(x[revenue.id], x[cost.id]),
  };
}

function additiveFormula(
  id: string,
  expression: string,
  terms: Array<{ variable: VariableSpec; sign: 1 | -1 }>,
  outputUnit: UnitId,
  constraints?: FormulaConstraint[],
): FormulaSpec {
  return {
    id,
    expression,
    kernel: 'sum',
    variables: terms.map((term) => term.variable),
    outputUnit,
    unitRule: 'additive',
    constraints,
    compute: (x) => kernels.sum(...terms.map((term) => term.sign * x[term.variable.id])),
  };
}

function daysFormula(id: string, expression: string, stock: VariableSpec, flow: VariableSpec): FormulaSpec {
  return {
    id,
    expression,
    kernel: 'stock-days',
    variables: [stock, flow],
    outputUnit: 'days',
    unitRule: 'days',
    compute: (x) => kernels.stockDays(x[stock.id], x[flow.id], 365),
  };
}

const CASH_FLOWS: VariableSpec[] = [0, 1, 2, 3, 4, 5].map((t) =>
  v(`cf${t}`, t === 0 ? 'Cash flow at time 0 (usually the investment, negative)' : `Cash flow in year ${t}`, 'currency', SIGNED),
);
const cashFlowsOf = (x: Record<string, number>) => [0, 1, 2, 3, 4, 5].map((t) => x[`cf${t}`]);

const FORMULA_LIST: FormulaSpec[] = [
  // ——— Shared cross-industry formulas ———
  changeFormula('revenue-growth', '(Current-period revenue − Prior-period revenue) ÷ Prior-period revenue',
    money('currentRevenue', 'Current-period revenue'), baseMoney('priorRevenue', 'Prior-period revenue')),
  {
    id: 'cagr',
    expression: '(Ending value ÷ Beginning value)^(1 ÷ Years) − 1',
    kernel: 'cagr',
    variables: [
      money('endingValue', 'Ending value'),
      baseMoney('beginningValue', 'Beginning value'),
      v('years', 'Number of years', 'years', 'Must be above zero; capped at 50 years to keep the annualisation meaningful.', { min: 0, max: 50, denominator: true }),
    ],
    outputUnit: 'percent',
    unitRule: 'custom',
    unitNote: 'Ending and beginning values share a unit, so their quotient is dimensionless; the root over years yields an annual rate.',
    compute: (x) => kernels.cagr(x.endingValue, x.beginningValue, x.years),
  },
  marginFormula('gross-margin', '(Net sales − Cost of goods sold) ÷ Net sales', baseMoney('netSales', 'Net sales'), money('cogs', 'Cost of goods sold')),
  shareFormula('ebitda-margin', 'EBITDA ÷ Revenue', signedMoney('ebitda', 'EBITDA'), baseMoney('revenue', 'Revenue')),
  shareFormula('net-profit-margin', 'Net income ÷ Net sales', signedMoney('netIncome', 'Net income'), baseMoney('netSales', 'Net sales')),
  marginFormula('contribution-margin-ratio', '(Revenue − Variable costs) ÷ Revenue', baseMoney('revenue', 'Revenue'), money('variableCosts', 'Variable costs')),
  {
    id: 'break-even-units',
    expression: 'Fixed costs ÷ (Selling price per unit − Variable cost per unit)',
    kernel: 'ratio',
    variables: [
      money('fixedCosts', 'Fixed costs for the period'),
      v('pricePerUnit', 'Selling price per unit', 'currency-per-unit', BASE, { min: 0, denominator: true }),
      v('variableCostPerUnit', 'Variable cost per unit', 'currency-per-unit', NONNEG, { min: 0 }),
    ],
    outputUnit: 'units',
    unitRule: 'custom',
    unitNote: 'Currency ÷ (currency per unit) = units.',
    constraints: [{ code: 'INVALID_COMBINATION', message: 'Price must exceed variable cost per unit, otherwise each unit adds to the loss and no break-even exists.', holds: (x) => x.pricePerUnit > x.variableCostPerUnit }],
    compute: (x) => kernels.ratio(x.fixedCosts, x.pricePerUnit - x.variableCostPerUnit),
  },
  shareFormula('inventory-turnover', 'Cost of goods sold ÷ Average inventory', money('cogs', 'Cost of goods sold'), baseMoney('averageInventory', 'Average inventory (at cost)'), 'times'),
  daysFormula('days-inventory-outstanding', 'Ending inventory ÷ Cost of goods sold × 365', money('endingInventory', 'Ending inventory (at cost)'), baseMoney('cogs', 'Annual cost of goods sold')),
  daysFormula('days-sales-outstanding', 'Average accounts receivable ÷ Net credit sales × 365', money('averageReceivables', 'Average accounts receivable'), baseMoney('netCreditSales', 'Annual net credit sales')),
  additiveFormula('cash-conversion-cycle', 'Inventory days + Receivable days − Payable days', [
    { variable: v('inventoryDays', 'Inventory conversion period', 'days', 'Non-negative; capped at 1,000 days as a data-entry guard.', { min: 0, max: 1000 }), sign: 1 },
    { variable: v('receivableDays', 'Receivables collection period', 'days', 'Non-negative; capped at 1,000 days as a data-entry guard.', { min: 0, max: 1000 }), sign: 1 },
    { variable: v('payableDays', 'Payables deferral period', 'days', 'Non-negative; capped at 1,000 days as a data-entry guard.', { min: 0, max: 1000 }), sign: -1 },
  ], 'days'),
  shareFormula('return-on-assets', 'Net income ÷ Average total assets', signedMoney('netIncome', 'Net income'), baseMoney('averageTotalAssets', 'Average total assets')),
  shareFormula('return-on-equity', 'Net income ÷ Average shareholders’ equity', signedMoney('netIncome', 'Net income'),
    v('averageEquity', 'Average shareholders’ equity', 'currency', 'Must be positive: with zero or negative equity the ratio has no meaningful interpretation.', { min: 0, denominator: true })),
  shareFormula('capacity-utilization', 'Actual output ÷ Capacity (same unit and period)',
    v('actualOutput', 'Actual output', 'units', NONNEG, { min: 0 }),
    v('capacity', 'Sustainable capacity', 'units', BASE, { min: 0, denominator: true })),
  rateFormula('customer-acquisition-cost', 'Acquisition sales & marketing spend ÷ New customers acquired',
    money('acquisitionSpend', 'Acquisition sales & marketing spend'), baseCount('newCustomers', 'New customers acquired'), 'currency-per-customer'),
  {
    id: 'customer-retention-rate',
    expression: '(Customers at end − New customers acquired) ÷ Customers at start',
    kernel: 'ratio',
    variables: [count('customersEnd', 'Customers at end of period'), count('newCustomers', 'New customers acquired in period'), baseCount('customersStart', 'Customers at start of period')],
    outputUnit: 'percent',
    unitRule: 'share',
    constraints: [
      notAbove('newCustomers', 'customersEnd', 'New customers cannot exceed customers at the end of the period.'),
      { code: 'INVALID_COMBINATION', message: 'Retained customers cannot exceed customers at the start.', holds: (x) => x.customersEnd - x.newCustomers <= x.customersStart },
    ],
    compute: (x) => kernels.ratio(x.customersEnd - x.newCustomers, x.customersStart),
  },
  partOfWhole('market-share', 'Company sales ÷ Total market sales (same market definition and period)', money('companySales', 'Company sales'), baseMoney('marketSales', 'Total market sales')),
  {
    id: 'net-present-value',
    expression: 'Σ Cash flow(t) ÷ (1 + Discount rate)^t, for t = 0…5',
    kernel: 'npv',
    variables: [v('discountRate', 'Annual discount rate', 'percent', 'Between -50% and 100%: outside this band the rate is almost certainly a data-entry error.', { min: -0.5, max: 1 }), ...CASH_FLOWS],
    outputUnit: 'currency',
    unitRule: 'custom',
    unitNote: 'Each cash flow is in currency and the discount factor is dimensionless, so NPV is in currency.',
    compute: (x) => kernels.npv(x.discountRate, cashFlowsOf(x)),
  },
  {
    id: 'internal-rate-of-return',
    expression: 'Discount rate r at which Σ Cash flow(t) ÷ (1 + r)^t = 0, for t = 0…5',
    kernel: 'irr',
    variables: CASH_FLOWS,
    outputUnit: 'percent',
    unitRule: 'custom',
    unitNote: 'The solved discount rate is a dimensionless annual rate.',
    compute: (x) => kernels.irr(cashFlowsOf(x)),
  },
  rateFormula('average-transaction-value', 'Revenue ÷ Number of transactions', money('revenue', 'Revenue'), baseCount('transactions', 'Number of transactions'), 'currency-per-order'),
  partOfWhole('conversion-rate', 'Converting visitors (or transactions) ÷ Visitors', count('conversions', 'Conversions'), baseCount('visitors', 'Visitors or sessions')),
  shareFormula('take-rate', 'Platform net revenue ÷ Gross merchandise or transaction value', money('platformRevenue', 'Platform net revenue'), baseMoney('grossValue', 'Gross merchandise or transaction value'), 'percent',
    [notAbove('platformRevenue', 'grossValue', 'Platform revenue from commissions and fees cannot exceed the value transacted.')]),
  shareFormula('labor-cost-ratio', 'Total labour cost ÷ Revenue', money('laborCost', 'Total labour cost'), baseMoney('revenue', 'Revenue')),
  partOfWhole('on-time-delivery', 'Deliveries on time ÷ Total deliveries', count('onTimeDeliveries', 'Deliveries on time'), baseCount('totalDeliveries', 'Total deliveries')),
  partOfWhole('churn-rate', 'Customers lost in period ÷ Customers at start of period', count('customersLost', 'Customers lost'), baseCount('customersStart', 'Customers at start of period')),
  rateFormula('arpu', 'Revenue ÷ Average users (or subscribers) in period', money('revenue', 'Revenue'), baseCount('averageUsers', 'Average users or subscribers'), 'currency-per-customer'),
  changeFormula('same-store-sales-growth', '(Comparable-store sales this period − Same stores’ sales in prior period) ÷ Prior-period comparable sales',
    money('comparableSalesCurrent', 'Comparable-store sales, current period'), baseMoney('comparableSalesPrior', 'Same stores’ sales, prior period')),
  {
    id: 'store-contribution-margin',
    expression: '(Store sales − Cost of goods sold − Store operating costs) ÷ Store sales',
    kernel: 'ratio',
    variables: [baseMoney('storeSales', 'Store sales'), money('cogs', 'Cost of goods sold'), money('storeOperatingCosts', 'Store-level operating costs')],
    outputUnit: 'percent',
    unitRule: 'share',
    compute: (x) => kernels.ratio(x.storeSales - x.cogs - x.storeOperatingCosts, x.storeSales),
  },

  // ——— Banking & financial services ———
  {
    id: 'net-interest-margin',
    expression: '(Interest income − Interest expense) ÷ Average earning assets',
    kernel: 'ratio',
    variables: [money('interestIncome', 'Interest and dividend income'), money('interestExpense', 'Interest expense'), baseMoney('averageEarningAssets', 'Average earning assets')],
    outputUnit: 'percent',
    unitRule: 'share',
    compute: (x) => kernels.ratio(x.interestIncome - x.interestExpense, x.averageEarningAssets),
  },
  shareFormula('asset-yield', 'Interest, dividend and fee income on earning assets ÷ Average earning assets', money('interestIncome', 'Interest, dividend and fee income'), baseMoney('averageEarningAssets', 'Average earning assets')),
  shareFormula('cost-of-funds', 'Interest expense on deposits and borrowings ÷ Average earning assets', money('interestExpense', 'Interest expense'), baseMoney('averageEarningAssets', 'Average earning assets')),
  {
    id: 'cost-to-income-ratio',
    expression: 'Noninterest (operating) expenses ÷ (Net interest income + Noninterest income)',
    kernel: 'ratio',
    variables: [money('operatingExpenses', 'Noninterest operating expenses'), signedMoney('netInterestIncome', 'Net interest income'), signedMoney('nonInterestIncome', 'Noninterest income')],
    outputUnit: 'percent',
    unitRule: 'share',
    constraints: [{ code: 'DIVISION_BY_ZERO', message: 'Gross income (net interest income + noninterest income) must be above zero.', holds: (x) => x.netInterestIncome + x.nonInterestIncome > 0 }],
    compute: (x) => kernels.ratio(x.operatingExpenses, x.netInterestIncome + x.nonInterestIncome),
  },
  partOfWhole('npl-ratio', 'Nonperforming loans ÷ Total gross loans', money('nonperformingLoans', 'Nonperforming loans'), baseMoney('grossLoans', 'Total gross loans (before provisions)')),
  shareFormula('npl-coverage-ratio', 'Specific provisions ÷ Nonperforming loans', money('specificProvisions', 'Specific provisions (loss allowance on NPLs)'), baseMoney('nonperformingLoans', 'Nonperforming loans')),
  shareFormula('cost-of-risk', 'Credit loss provision expense ÷ Average gross loans', signedMoney('provisionExpense', 'Credit loss provision expense'), baseMoney('averageGrossLoans', 'Average gross loans')),
  shareFormula('loan-to-deposit-ratio', 'Customer loans ÷ Customer deposits', money('loans', 'Customer loans'), baseMoney('deposits', 'Customer deposits')),
  partOfWhole('casa-ratio', 'Current and savings account (CASA) deposits ÷ Total customer deposits', money('casaDeposits', 'CASA deposits'), baseMoney('totalDeposits', 'Total customer deposits')),
  shareFormula('capital-adequacy-ratio', 'Total regulatory capital ÷ Risk-weighted assets', money('regulatoryCapital', 'Total regulatory capital'), baseMoney('riskWeightedAssets', 'Risk-weighted assets')),
  {
    id: 'net-charge-off-rate',
    expression: '(Gross charge-offs − Recoveries) ÷ Average loans outstanding',
    kernel: 'ratio',
    variables: [money('grossChargeOffs', 'Gross charge-offs'), money('recoveries', 'Recoveries on loans previously charged off'), baseMoney('averageLoans', 'Average loans outstanding')],
    outputUnit: 'percent',
    unitRule: 'share',
    compute: (x) => kernels.ratio(x.grossChargeOffs - x.recoveries, x.averageLoans),
  },
  partOfWhole('delinquency-rate', 'Delinquent loans ÷ Total loans outstanding', money('delinquentLoans', 'Delinquent loans (past the stated days-past-due threshold)'), baseMoney('totalLoans', 'Total loans outstanding')),
  partOfWhole('approval-rate', 'Applications approved ÷ Applications decided', count('approvedApplications', 'Applications approved'), baseCount('decidedApplications', 'Applications decided')),
  shareFormula('portfolio-yield', 'Interest and fee income ÷ Average loan receivables', money('interestAndFeeIncome', 'Interest and fee income'), baseMoney('averageReceivables', 'Average loan receivables')),
  shareFormula('collection-rate', 'Cash collected in the period ÷ Amount falling due for the first time in the period', money('amountCollected', 'Amount collected'), baseMoney('amountDue', 'Amount first falling due in the period')),
  additiveFormula('risk-adjusted-margin', 'Portfolio yield − Cost of funds rate − Credit loss rate', [
    { variable: pct('portfolioYield', 'Portfolio yield', { max: 2, rangeNote: 'Annual yield on receivables; 0–200% covers short-tenor consumer products.' }), sign: 1 },
    { variable: pct('costOfFundsRate', 'Cost of funds rate'), sign: -1 },
    { variable: pct('creditLossRate', 'Credit loss rate'), sign: -1 },
  ], 'percent'),
  partOfWhole('payment-success-rate', 'Successful payment transactions ÷ Payment transactions attempted', count('successfulPayments', 'Successful transactions'), baseCount('attemptedPayments', 'Attempted transactions')),
  partOfWhole('persistency-ratio', 'Policies that paid the renewal premium(s) due by month 13 ÷ Policies in the cohort exposure (issued, net of exclusions)', count('policiesInForce', 'Policies in force at month 13'), baseCount('policiesIssued', 'Policies in cohort exposure (issued, net of exclusions)')),

  // ——— FMCG & retail ———
  changeFormula('volume-growth', '(Current-period volume − Prior-period volume) ÷ Prior-period volume',
    v('currentVolume', 'Current-period volume', 'units', NONNEG, { min: 0 }), v('priorVolume', 'Prior-period volume', 'units', BASE, { min: 0, denominator: true })),
  additiveFormula('net-sales', 'Gross sales − Trade deductions (discounts, rebates, promotions) − Returns', [
    { variable: money('grossSales', 'Gross sales at list price'), sign: 1 },
    { variable: money('tradeDeductions', 'Trade deductions'), sign: -1 },
    { variable: money('returns', 'Returns and allowances'), sign: -1 },
  ], 'currency', [{ code: 'INVALID_COMBINATION', message: 'Deductions and returns cannot exceed gross sales.', holds: (x) => x.tradeDeductions + x.returns <= x.grossSales }]),
  partOfWhole('numeric-distribution', 'Stores stocking the product ÷ Stores in the measured universe', count('storesStocking', 'Stores stocking the product'), baseCount('storesInUniverse', 'Stores in the measured universe')),
  partOfWhole('weighted-distribution', 'Category sales of stores stocking the product ÷ Category sales of all stores in the universe', money('categorySalesStocking', 'Category sales of stocking stores'), baseMoney('categorySalesUniverse', 'Category sales of all stores')),
  shareFormula('trade-spend-ratio', 'Trade spend ÷ Gross sales', money('tradeSpend', 'Trade spend'), baseMoney('grossSales', 'Gross sales')),
  shareFormula('sell-out-to-sell-in-ratio', 'Sell-out volume (to shoppers) ÷ Sell-in volume (to trade)',
    v('sellOutVolume', 'Sell-out volume', 'units', NONNEG, { min: 0 }), v('sellInVolume', 'Sell-in volume', 'units', BASE, { min: 0, denominator: true }), 'times'),
  rateFormula('sales-per-sqm', 'Store sales ÷ Selling area', money('storeSales', 'Store sales'), v('sellingArea', 'Selling area', 'sqm', BASE, { min: 0, denominator: true }), 'currency-per-sqm'),
  rateFormula('units-per-transaction', 'Units sold ÷ Number of transactions', v('unitsSold', 'Units sold', 'units', NONNEG, { min: 0 }), baseCount('transactions', 'Number of transactions'), 'units-per-order'),
  shareFormula('shrinkage-rate', 'Shrink (inventory loss at cost or retail) ÷ Sales', money('shrinkValue', 'Shrink value'), baseMoney('sales', 'Sales')),
  shareFormula('gmroi', 'Gross margin ÷ Average inventory at cost', signedMoney('grossMarginValue', 'Gross margin (value)'), baseMoney('averageInventoryAtCost', 'Average inventory at cost'), 'times'),
  partOfWhole('sell-through-rate', 'Units sold ÷ Units available (opening stock + receipts)',
    v('unitsSold', 'Units sold', 'units', NONNEG, { min: 0 }), v('unitsAvailable', 'Units available for sale', 'units', BASE, { min: 0, denominator: true })),

  // ——— Technology & digital ———
  {
    id: 'annual-recurring-revenue',
    expression: 'Monthly recurring revenue × 12',
    kernel: 'product',
    variables: [money('monthlyRecurringRevenue', 'Monthly recurring revenue (run-rate at period end)')],
    outputUnit: 'currency',
    unitRule: 'custom',
    unitNote: 'Currency per month × 12 months = currency per year (reported as currency).',
    compute: (x) => kernels.product(x.monthlyRecurringRevenue, 12),
  },
  {
    id: 'monthly-recurring-revenue',
    expression: 'Paying accounts × Average monthly recurring revenue per account',
    kernel: 'product',
    variables: [count('payingAccounts', 'Paying accounts'), v('averageRevenuePerAccount', 'Average monthly recurring revenue per account', 'currency-per-customer', NONNEG, { min: 0 })],
    outputUnit: 'currency',
    unitRule: 'custom',
    unitNote: 'Accounts × currency per account = currency.',
    compute: (x) => kernels.product(x.payingAccounts, x.averageRevenuePerAccount),
  },
  shareFormula('net-revenue-retention', 'Current ARR from the prior-period customer cohort ÷ That cohort’s ARR 12 months earlier',
    money('cohortCurrentArr', 'Cohort ARR now (incl. expansion, net of contraction and churn)'), baseMoney('cohortPriorArr', 'Cohort ARR 12 months earlier')),
  {
    id: 'gross-revenue-retention',
    expression: '(Prior-period ARR − Churned ARR − Contraction ARR) ÷ Prior-period ARR',
    kernel: 'ratio',
    variables: [baseMoney('priorArr', 'Cohort ARR at start'), money('churnedArr', 'ARR lost to churn'), money('contractionArr', 'ARR lost to downgrades')],
    outputUnit: 'percent',
    unitRule: 'share',
    constraints: [{ code: 'INVALID_COMBINATION', message: 'Churn plus contraction cannot exceed starting ARR.', holds: (x) => x.churnedArr + x.contractionArr <= x.priorArr }],
    compute: (x) => kernels.ratio(x.priorArr - x.churnedArr - x.contractionArr, x.priorArr),
  },
  {
    id: 'customer-lifetime-value',
    expression: '(Average monthly revenue per account × Gross margin) ÷ Monthly churn rate',
    kernel: 'ratio',
    variables: [
      v('averageRevenuePerAccount', 'Average monthly revenue per account', 'currency-per-customer', NONNEG, { min: 0 }),
      pct('grossMargin', 'Gross margin'),
      pct('monthlyChurnRate', 'Monthly churn rate', { denominator: true }),
    ],
    outputUnit: 'currency-per-customer',
    unitRule: 'custom',
    unitNote: 'Currency per account per month × margin ÷ (share lost per month) = currency per account.',
    compute: (x) => kernels.ratio(kernels.product(x.averageRevenuePerAccount, x.grossMargin), x.monthlyChurnRate),
  },
  shareFormula('ltv-to-cac', 'Customer lifetime value ÷ Customer acquisition cost',
    v('lifetimeValue', 'Customer lifetime value', 'currency-per-customer', NONNEG, { min: 0 }),
    v('acquisitionCost', 'Customer acquisition cost', 'currency-per-customer', BASE, { min: 0, denominator: true }), 'times'),
  {
    id: 'cac-payback-months',
    expression: 'Customer acquisition cost ÷ (Average monthly revenue per account × Gross margin)',
    kernel: 'ratio',
    variables: [
      v('acquisitionCost', 'Customer acquisition cost', 'currency-per-customer', NONNEG, { min: 0 }),
      v('averageRevenuePerAccount', 'Average monthly revenue per account', 'currency-per-customer', BASE, { min: 0, denominator: true }),
      pct('grossMargin', 'Gross margin', { denominator: true }),
    ],
    outputUnit: 'months',
    unitRule: 'custom',
    unitNote: 'Currency per account ÷ (currency per account per month) = months.',
    compute: (x) => kernels.ratio(x.acquisitionCost, kernels.product(x.averageRevenuePerAccount, x.grossMargin)),
  },
  additiveFormula('rule-of-40', 'Revenue growth rate + Profit margin (state which margin)', [
    { variable: v('revenueGrowthRate', 'Revenue growth rate', 'percent', 'Year-on-year growth; -100% to +500% covers realistic cases.', { min: -1, max: 5 }), sign: 1 },
    { variable: v('profitMargin', 'Profit margin (e.g., EBITDA or free-cash-flow margin)', 'percent', 'Margins below -200% or above 100% are not meaningful.', { min: -2, max: 1 }), sign: 1 },
  ], 'percent'),
  {
    id: 'gross-merchandise-value',
    expression: 'Orders × Average order value',
    kernel: 'product',
    variables: [count('orders', 'Orders'), v('averageOrderValue', 'Average order value', 'currency-per-order', NONNEG, { min: 0 })],
    outputUnit: 'currency',
    unitRule: 'custom',
    unitNote: 'Orders × currency per order = currency.',
    compute: (x) => kernels.product(x.orders, x.averageOrderValue),
  },
  additiveFormula('contribution-per-order', 'Net revenue per order − Variable cost per order', [
    { variable: v('netRevenuePerOrder', 'Net revenue per order', 'currency-per-order', NONNEG, { min: 0 }), sign: 1 },
    { variable: v('variableCostPerOrder', 'Variable cost per order', 'currency-per-order', NONNEG, { min: 0 }), sign: -1 },
  ], 'currency-per-order'),
  partOfWhole('dau-mau-ratio', 'Average daily active users ÷ Monthly active users', count('dailyActiveUsers', 'Average daily active users'), baseCount('monthlyActiveUsers', 'Monthly active users')),
  partOfWhole('payer-conversion-rate', 'Paying users ÷ Active users', count('payingUsers', 'Paying users'), baseCount('activeUsers', 'Active users')),
  shareFormula('capex-intensity', 'Capital expenditure ÷ Revenue', money('capex', 'Capital expenditure'), baseMoney('revenue', 'Revenue')),
  partOfWhole('click-through-rate', 'Clicks ÷ Impressions', count('clicks', 'Clicks'), baseCount('impressions', 'Impressions')),
  {
    id: 'cost-per-mille',
    expression: 'Media cost ÷ Impressions × 1,000',
    kernel: 'ratio',
    variables: [money('mediaCost', 'Media cost'), baseCount('impressions', 'Impressions')],
    outputUnit: 'currency-per-thousand',
    unitRule: 'custom',
    unitNote: 'Currency ÷ impressions × 1,000 = currency per thousand impressions.',
    compute: (x) => kernels.ratio(x.mediaCost, x.impressions) * 1000,
  },
  shareFormula('return-on-ad-spend', 'Attributed revenue ÷ Ad spend', money('attributedRevenue', 'Attributed revenue'), baseMoney('adSpend', 'Ad spend'), 'times'),

  // ——— Manufacturing ———
  {
    id: 'oee',
    expression: 'Availability × Performance × Quality',
    kernel: 'product',
    variables: [pct('availability', 'Availability'), pct('performance', 'Performance'), pct('quality', 'Quality')],
    outputUnit: 'percent',
    unitRule: 'product-of-percents',
    compute: (x) => kernels.product(x.availability, x.performance, x.quality),
  },
  partOfWhole('availability', 'Run time ÷ Planned production time',
    v('runTime', 'Run time', 'minutes', NONNEG, { min: 0 }), v('plannedProductionTime', 'Planned production time', 'minutes', BASE, { min: 0, denominator: true })),
  {
    id: 'performance-efficiency',
    expression: '(Ideal cycle time × Total count) ÷ Run time',
    kernel: 'ratio',
    variables: [
      v('idealCycleTime', 'Ideal cycle time (minutes per unit)', 'minutes', 'Fastest achievable time per unit; must be positive.', { min: 0 }),
      v('totalCount', 'Total units produced (good + defective)', 'units', NONNEG, { min: 0 }),
      v('runTime', 'Run time', 'minutes', BASE, { min: 0, denominator: true }),
    ],
    outputUnit: 'percent',
    unitRule: 'custom',
    unitNote: '(Minutes per unit × units) ÷ minutes = dimensionless share.',
    constraints: [{ code: 'INVALID_COMBINATION', message: 'Performance above 100% means the ideal cycle time is set too high.', holds: (x) => x.idealCycleTime * x.totalCount <= x.runTime }],
    compute: (x) => kernels.ratio(kernels.product(x.idealCycleTime, x.totalCount), x.runTime),
  },
  partOfWhole('quality-rate', 'Good units (right first time) ÷ Total units produced',
    v('goodCount', 'Good units', 'units', NONNEG, { min: 0 }), v('totalCount', 'Total units produced', 'units', BASE, { min: 0, denominator: true })),
  partOfWhole('scrap-rate', 'Units scrapped ÷ Total units produced',
    v('scrappedUnits', 'Units scrapped', 'units', NONNEG, { min: 0 }), v('totalUnits', 'Total units produced', 'units', BASE, { min: 0, denominator: true })),
  partOfWhole('defect-rate', 'Defective units found ÷ Units inspected',
    v('defectiveUnits', 'Defective units', 'units', NONNEG, { min: 0 }), v('unitsInspected', 'Units inspected', 'units', BASE, { min: 0, denominator: true })),
  rateFormula('unit-production-cost', 'Total production cost ÷ Units produced', money('totalProductionCost', 'Total production cost'),
    v('unitsProduced', 'Units produced', 'units', BASE, { min: 0, denominator: true }), 'currency-per-unit'),
  partOfWhole('unplanned-downtime-rate', 'Unplanned downtime ÷ Planned production time',
    v('unplannedDowntime', 'Unplanned downtime', 'minutes', NONNEG, { min: 0 }), v('plannedProductionTime', 'Planned production time', 'minutes', BASE, { min: 0, denominator: true })),
  rateFormula('throughput-rate', 'Good units produced ÷ Production hours',
    v('goodUnits', 'Good units produced', 'units', NONNEG, { min: 0 }), v('productionHours', 'Production hours', 'hours', BASE, { min: 0, denominator: true }), 'units-per-hour'),

  // ——— Logistics ———
  rateFormula('cost-per-shipment', 'Total logistics cost ÷ Shipments (or parcels) handled', money('totalLogisticsCost', 'Total logistics cost'), baseCount('shipments', 'Shipments or parcels handled'), 'currency-per-order'),
  partOfWhole('order-fill-rate', 'Orders shipped complete ÷ Orders received', count('ordersComplete', 'Orders shipped complete'), baseCount('ordersReceived', 'Orders received')),
  partOfWhole('warehouse-space-utilization', 'Occupied storage positions ÷ Usable storage positions', count('occupiedPositions', 'Occupied positions'), baseCount('usablePositions', 'Usable positions')),
  partOfWhole('inventory-record-accuracy', 'Locations whose system record matches the physical count ÷ Locations counted', count('matchingLocations', 'Matching locations'), baseCount('locationsCounted', 'Locations counted')),
  partOfWhole('vehicle-load-factor', 'Weight of goods carried ÷ Maximum weight that could have been carried on the trip (weight-based loading factor)',
    v('loadCarried', 'Weight of goods carried', 'tonnes', NONNEG, { min: 0, meaning: 'Net weight of freight on the vehicle for the trip, excluding the vehicle’s own weight.' }),
    v('vehicleCapacity', 'Maximum weight that could have been carried', 'tonnes', BASE, { min: 0, denominator: true, meaning: 'Legal (or stated practical) load capacity of the vehicle for the same trip.' })),
  partOfWhole('first-attempt-delivery-rate', 'Parcels delivered at first attempt ÷ Parcels attempted', count('firstAttemptDelivered', 'Delivered at first attempt'), baseCount('parcelsAttempted', 'Parcels attempted')),
  additiveFormula('contribution-per-delivery', 'Revenue per delivery − Variable cost per delivery', [
    { variable: v('revenuePerDelivery', 'Revenue per delivery', 'currency-per-order', NONNEG, { min: 0 }), sign: 1 },
    { variable: v('variableCostPerDelivery', 'Variable cost per delivery', 'currency-per-order', NONNEG, { min: 0 }), sign: -1 },
  ], 'currency-per-order'),

  // ——— Agribusiness ———
  rateFormula('crop-yield', 'Harvested production ÷ Harvested area', v('production', 'Harvested production', 'tonnes', NONNEG, { min: 0 }),
    v('harvestedArea', 'Harvested area', 'hectares', BASE, { min: 0, denominator: true }), 'tonnes-per-hectare'),
  rateFormula('cost-per-tonne', 'Total production cost ÷ Tonnes produced', money('totalCost', 'Total production cost'),
    v('tonnesProduced', 'Tonnes produced', 'tonnes', BASE, { min: 0, denominator: true }), 'currency-per-tonne'),
  {
    id: 'gross-margin-per-hectare',
    expression: '(Crop revenue − Variable costs) ÷ Hectares',
    kernel: 'ratio',
    variables: [money('revenue', 'Crop revenue'), money('variableCosts', 'Variable costs'), v('hectares', 'Area', 'hectares', BASE, { min: 0, denominator: true })],
    outputUnit: 'currency-per-hectare',
    unitRule: 'rate',
    numeratorVars: ['revenue', 'variableCosts'],
    denominatorVars: ['hectares'],
    compute: (x) => kernels.ratio(x.revenue - x.variableCosts, x.hectares),
  },
  {
    id: 'break-even-price',
    expression: 'Total cost per hectare ÷ Yield per hectare',
    kernel: 'ratio',
    variables: [
      v('costPerHectare', 'Total cost per hectare', 'currency-per-hectare', NONNEG, { min: 0 }),
      v('yieldPerHectare', 'Yield per hectare', 'tonnes-per-hectare', BASE, { min: 0, denominator: true }),
    ],
    outputUnit: 'currency-per-tonne',
    unitRule: 'custom',
    unitNote: '(Currency per ha) ÷ (tonnes per ha) = currency per tonne.',
    compute: (x) => kernels.ratio(x.costPerHectare, x.yieldPerHectare),
  },
  {
    id: 'break-even-yield',
    expression: 'Total cost per hectare ÷ Price per tonne',
    kernel: 'ratio',
    variables: [
      v('costPerHectare', 'Total cost per hectare', 'currency-per-hectare', NONNEG, { min: 0 }),
      v('pricePerTonne', 'Farm-gate price per tonne', 'currency-per-tonne', BASE, { min: 0, denominator: true }),
    ],
    outputUnit: 'tonnes-per-hectare',
    unitRule: 'custom',
    unitNote: '(Currency per ha) ÷ (currency per tonne) = tonnes per ha.',
    compute: (x) => kernels.ratio(x.costPerHectare, x.pricePerTonne),
  },
  shareFormula('feed-conversion-ratio', 'Feed consumed ÷ Liveweight gain (same mass unit)',
    v('feedConsumed', 'Feed consumed', 'tonnes', NONNEG, { min: 0 }), v('liveweightGain', 'Liveweight gain', 'tonnes', BASE, { min: 0, denominator: true }), 'times'),
  partOfWhole('post-harvest-loss-rate', 'Quantity lost between harvest and sale ÷ Quantity harvested',
    v('quantityLost', 'Quantity lost', 'tonnes', NONNEG, { min: 0 }), v('quantityHarvested', 'Quantity harvested', 'tonnes', BASE, { min: 0, denominator: true })),
  additiveFormula('trading-margin-per-tonne', 'Selling price − Purchase price − Handling and logistics cost (per tonne)', [
    { variable: v('sellingPrice', 'Selling price per tonne', 'currency-per-tonne', NONNEG, { min: 0 }), sign: 1 },
    { variable: v('purchasePrice', 'Purchase price per tonne', 'currency-per-tonne', NONNEG, { min: 0 }), sign: -1 },
    { variable: v('handlingCost', 'Handling, storage and freight per tonne', 'currency-per-tonne', NONNEG, { min: 0 }), sign: -1 },
  ], 'currency-per-tonne'),

  // ——— Real estate ———
  additiveFormula('net-operating-income', 'Annual gross operating income − Operating expenses', [
    { variable: money('grossOperatingIncome', 'Annual gross operating income'), sign: 1 },
    { variable: money('operatingExpenses', 'Annual operating expenses'), sign: -1 },
  ], 'currency'),
  shareFormula('capitalization-rate', 'Stabilised net operating income ÷ Property value (or price)', signedMoney('netOperatingIncome', 'Stabilised NOI'), baseMoney('propertyValue', 'Property value or price')),
  shareFormula('debt-service-coverage-ratio', 'Net operating income ÷ Annual debt service', signedMoney('netOperatingIncome', 'Net operating income'), baseMoney('annualDebtService', 'Annual debt service (interest + principal)'), 'times'),
  shareFormula('loan-to-value', 'Loan amount ÷ Market value of the collateral property', money('loanAmount', 'Loan amount'), baseMoney('propertyValue', 'Property market value')),
  shareFormula('debt-yield', 'Net operating income ÷ Loan amount', signedMoney('netOperatingIncome', 'Net operating income'), baseMoney('loanAmount', 'Loan amount')),
  partOfWhole('physical-occupancy-rate', 'Occupied leasable area ÷ Total leasable area',
    v('occupiedArea', 'Occupied area', 'sqm', NONNEG, { min: 0 }), v('leasableArea', 'Leasable area', 'sqm', BASE, { min: 0, denominator: true })),
  shareFormula('gross-rental-yield', 'Annual gross rent ÷ Property value', money('annualGrossRent', 'Annual gross rent'), baseMoney('propertyValue', 'Property value')),
  {
    id: 'development-margin',
    expression: '(Gross development value − Total development cost) ÷ Total development cost',
    kernel: 'ratio',
    variables: [money('grossDevelopmentValue', 'Gross development value'), baseMoney('totalDevelopmentCost', 'Total development cost')],
    outputUnit: 'percent',
    unitRule: 'share',
    compute: (x) => kernels.ratio(x.grossDevelopmentValue - x.totalDevelopmentCost, x.totalDevelopmentCost),
  },

  // ——— Hospitality ———
  partOfWhole('hotel-occupancy-rate', 'Rooms sold ÷ Rooms available', count('roomsSold', 'Room nights sold'), baseCount('roomsAvailable', 'Room nights available')),
  rateFormula('average-daily-rate', 'Room revenue ÷ Rooms sold', money('roomRevenue', 'Room revenue'), baseCount('roomsSold', 'Room nights sold'), 'currency-per-room'),
  rateFormula('revpar', 'Room revenue ÷ Rooms available', money('roomRevenue', 'Room revenue'), baseCount('roomsAvailable', 'Room nights available'), 'currency-per-room'),
  rateFormula('goppar', 'Gross operating profit ÷ Rooms available', signedMoney('grossOperatingProfit', 'Gross operating profit'), baseCount('roomsAvailable', 'Room nights available'), 'currency-per-room'),
  shareFormula('food-cost-percentage', 'Cost of food sold ÷ Food sales', money('foodCost', 'Cost of food sold'), baseMoney('foodSales', 'Food sales')),
  {
    id: 'prime-cost-percentage',
    expression: '(Cost of goods sold + Total labour cost) ÷ Sales',
    kernel: 'ratio',
    variables: [money('cogs', 'Cost of food and beverage sold'), money('laborCost', 'Total labour cost'), baseMoney('sales', 'Sales')],
    outputUnit: 'percent',
    unitRule: 'share',
    compute: (x) => kernels.ratio(x.cogs + x.laborCost, x.sales),
  },
  shareFormula('table-turnover', 'Parties seated ÷ Tables, for one service period', count('partiesSeated', 'Parties seated'), baseCount('tables', 'Tables'), 'times'),
  {
    id: 'revpash',
    expression: 'Revenue ÷ (Seats × Opening hours)',
    kernel: 'ratio',
    variables: [money('revenue', 'Revenue for the period'), baseCount('seats', 'Seats'), v('openingHours', 'Opening hours in the period', 'hours', BASE, { min: 0, denominator: true })],
    outputUnit: 'currency-per-seat-hour',
    unitRule: 'custom',
    unitNote: 'Currency ÷ (seats × hours) = currency per available seat-hour.',
    compute: (x) => kernels.ratio(x.revenue, kernels.product(x.seats, x.openingHours)),
  },

  // ——— Healthcare products & professional services ———
  shareFormula('expiry-write-off-rate', 'Expired or obsolete stock written off ÷ Average inventory (at cost)', money('writeOffValue', 'Stock written off'), baseMoney('averageInventory', 'Average inventory at cost')),
  shareFormula('utilization-rate', 'Billable hours ÷ Available hours',
    v('billableHours', 'Billable hours', 'hours', NONNEG, { min: 0 }), v('availableHours', 'Available (standard) hours', 'hours', BASE, { min: 0, denominator: true })),
  shareFormula('realization-rate', 'Fees billed ÷ Standard value of time worked', money('feesBilled', 'Fees billed'), baseMoney('standardValue', 'Standard value of time (hours × standard rates)')),
  rateFormula('revenue-per-fte', 'Revenue ÷ Average full-time equivalent staff', money('revenue', 'Revenue'), baseCount('averageFte', 'Average FTE'), 'currency-per-fte'),
  marginFormula('project-margin', '(Project fees − Direct delivery costs) ÷ Project fees', baseMoney('projectFees', 'Project fees'), money('directCosts', 'Direct delivery costs')),
  rateFormula('cost-per-engagement', 'Total delivery cost ÷ Engagements completed', money('deliveryCost', 'Total delivery cost'), baseCount('engagements', 'Engagements completed'), 'currency-per-engagement'),

  // ——— Life insurance ———
  {
    id: 'annual-premium-equivalent',
    expression: 'Annualised regular premiums + 10% × Single premiums (new business written in the period)',
    kernel: 'sum',
    variables: [
      money('regularPremiums', 'Annualised regular premiums on new business', { meaning: 'First-year premiums on new regular-premium policies, expressed on an annual basis. Renewal premiums are excluded.' }),
      money('singlePremiums', 'Single premiums on new business', { meaning: 'Lump-sum premiums received on new single-premium policies in the period.' }),
    ],
    outputUnit: 'currency',
    unitRule: 'additive',
    compute: (x) => kernels.sum(x.regularPremiums, kernels.product(x.singlePremiums, 0.1)),
  },
  shareFormula('vnb-margin', 'Value of new business ÷ Annual premium equivalent (same scope and period)',
    signedMoney('valueOfNewBusiness', 'Value of new business (VNB)'), baseMoney('annualPremiumEquivalent', 'Annual premium equivalent (APE)')),
  additiveFormula('value-of-new-business', 'PV of future shareholder profits on new business − Cost of holding required capital', [
    { variable: v('pvFutureProfits', 'PV of future shareholder profits on new business', 'currency', SIGNED, { meaning: 'Present value, at the point of sale, of projected after-tax profits on policies written in the period.' }), sign: 1 },
    { variable: money('costOfRequiredCapital', 'Cost of holding required capital', { meaning: 'Present value of the cost of tying up the capital the regulator or company requires against the new policies.' }), sign: -1 },
  ], 'currency'),
  additiveFormula('embedded-value', 'Adjusted net worth + Value of in-force business', [
    { variable: v('adjustedNetWorth', 'Adjusted net worth', 'currency', SIGNED, { meaning: 'Net assets attributable to the covered business, adjusted to a market or supervisory basis.' }), sign: 1 },
    { variable: v('valueOfInForce', 'Value of in-force business', 'currency', SIGNED, { meaning: 'Present value of profits from policies already written, net of the cost of required capital.' }), sign: 1 },
  ], 'currency'),
  shareFormula('solvency-ratio', 'Eligible own funds ÷ Solvency Capital Requirement (SCR)',
    money('eligibleOwnFunds', 'Eligible own funds', { meaning: 'Own funds that qualify to cover the capital requirement after tiering limits.' }),
    baseMoney('solvencyCapitalRequirement', 'Solvency Capital Requirement (SCR)')),

  // ——— Payments & fintech ———
  {
    id: 'total-payment-volume',
    expression: 'Successful payment transactions × Average value per successful payment (net of reversals)',
    kernel: 'product',
    variables: [
      count('paymentTransactions', 'Successful payment transactions', { meaning: 'Payments completed on the platform in the period.' }),
      v('averagePaymentValue', 'Average value per payment, net of reversals', 'currency-per-order', NONNEG, { min: 0, meaning: 'Average payment value after deducting payments later reversed.' }),
    ],
    outputUnit: 'currency',
    unitRule: 'custom',
    unitNote: 'Transactions × currency per transaction = currency.',
    compute: (x) => kernels.product(x.paymentTransactions, x.averagePaymentValue),
  },
  shareFormula('transaction-loss-rate', 'Transaction losses ÷ Total payment volume', money('transactionLosses', 'Transaction losses', { meaning: 'Losses the platform bears from fraud, disputes and similar events, as the company defines them.' }),
    baseMoney('totalPaymentVolume', 'Total payment volume (TPV)'), 'percent',
    [notAbove('transactionLosses', 'totalPaymentVolume', 'Transaction losses cannot exceed the payment volume processed.')]),
  shareFormula('merchant-discount-rate', 'Merchant discount fees charged ÷ Payment value processed for the merchant', money('discountFees', 'Merchant discount fees charged', { meaning: 'Total charge recovered by the acquirer from merchants as a discount to payment amounts.' }),
    baseMoney('paymentValueProcessed', 'Payment value processed'), 'percent',
    [notAbove('discountFees', 'paymentValueProcessed', 'Merchant discount fees cannot exceed the payment value processed.')]),

  // ——— Telecommunications ———
  changeFormula('subscriber-growth', '(Subscribers at end − Subscribers at start) ÷ Subscribers at start',
    count('subscribersEnd', 'Subscribers at end of period', { meaning: 'Subscribers on the operator’s own definition (for example active or revenue-generating).' }),
    baseCount('subscribersStart', 'Subscribers at start of period')),

  // ——— Livestock ———
  partOfWhole('mortality-rate', 'Animals that died ÷ Animals placed (received)',
    count('animalsDied', 'Animals that died', { meaning: 'Deaths among the animals placed, over the same period as the placement.' }),
    baseCount('animalsPlaced', 'Animals placed or received')),
  {
    id: 'average-daily-gain',
    expression: '(Final weight − Initial weight) ÷ Days on feed',
    kernel: 'ratio',
    variables: [
      v('finalWeight', 'Final weight per animal', 'kg', NONNEG, { min: 0, meaning: 'Average live weight at the end of the feeding period.' }),
      v('initialWeight', 'Initial weight per animal', 'kg', NONNEG, { min: 0, meaning: 'Average live weight at the start of the feeding period.' }),
      v('daysOnFeed', 'Days on feed', 'days', BASE, { min: 0, denominator: true, meaning: 'Days between the two weighings.' }),
    ],
    outputUnit: 'kg-per-day',
    unitRule: 'rate',
    numeratorVars: ['finalWeight', 'initialWeight'],
    denominatorVars: ['daysOnFeed'],
    compute: (x) => kernels.ratio(x.finalWeight - x.initialWeight, x.daysOnFeed),
  },
  rateFormula('cost-of-gain', 'Total feeding and rearing cost ÷ Total liveweight gain', money('totalFeedingCost', 'Total feeding and rearing cost', { meaning: 'Feed plus the other costs the producer includes (yardage, medicine, interest, death loss).' }),
    v('totalGain', 'Total liveweight gain', 'tonnes', BASE, { min: 0, denominator: true, meaning: 'Sum of weight gained by all animals over the period.' }), 'currency-per-tonne'),
  partOfWhole('dressing-percentage', 'Carcass weight ÷ Final live weight',
    v('carcassWeight', 'Carcass weight', 'kg', NONNEG, { min: 0, meaning: 'Weight of the carcass after slaughter and dressing.' }),
    v('liveWeight', 'Final live weight', 'kg', BASE, { min: 0, denominator: true, meaning: 'Live weight before slaughter on the same basis (for example after shrink).' })),

  // ——— FMCG expansion (beauty, household, tobacco) ———
  partOfWhole('tax-share-of-retail-price', 'Total taxes per pack ÷ Retail price per pack (same brand, pack size and date)',
    money('totalTaxPerPack', 'Total taxes per pack', { meaning: 'Excise, VAT and other taxes or levies included in the price of one pack.' }),
    baseMoney('retailPricePerPack', 'Retail price per pack')),
  shareFormula('cigarette-affordability', 'Price of 100 packs of the most-sold brand ÷ GDP per capita',
    money('priceOf100Packs', 'Price of 100 packs of the most-sold brand', { meaning: 'Retail price of one pack of 20 multiplied by 100, in the same currency and year as GDP per capita.' }),
    baseMoney('gdpPerCapita', 'GDP per capita')),
  shareFormula('compliance-cost-ratio', 'Regulatory compliance costs ÷ Net revenue',
    money('complianceCosts', 'Regulatory compliance costs', { meaning: 'Costs incurred only to meet legal duties (levies, marking, testing, labelling changes, licences, reporting).' }),
    baseMoney('netRevenue', 'Net revenue')),
  partOfWhole('illicit-consumption-share', 'Illicit consumption ÷ Total consumption (legal plus illicit, same unit and period)',
    v('illicitConsumption', 'Illicit consumption', 'units', NONNEG, { min: 0 }),
    v('totalConsumption', 'Total consumption', 'units', BASE, { min: 0, denominator: true })),
  partOfWhole('household-penetration', 'Households buying the category or brand at least once in the period ÷ Households in the measured universe',
    count('buyingHouseholds', 'Households buying at least once'), baseCount('universeHouseholds', 'Households in the measured universe')),
  rateFormula('cost-per-use', 'Shelf price ÷ Number of uses (doses, washes or applications) per pack',
    money('shelfPrice', 'Shelf price per pack'), v('usesPerPack', 'Uses per pack', 'units', BASE, { min: 0, denominator: true }), 'currency-per-unit'),
];

export const FORMULAS: Readonly<Record<string, FormulaSpec>> = Object.freeze(
  Object.fromEntries(FORMULA_LIST.map((spec) => [spec.id, spec])),
);

export const FORMULA_IDS: readonly string[] = FORMULA_LIST.map((spec) => spec.id);

export function getFormula(formulaId: string): FormulaSpec | undefined {
  return FORMULAS[formulaId];
}

export function evaluateFormula(formulaId: string, inputs: Record<string, unknown> | null | undefined): FormulaResult {
  const spec = FORMULAS[formulaId];
  if (!spec) return { ok: false, error: 'UNKNOWN_FORMULA', message: `No formula registered with id "${formulaId}".` };
  return evaluateSpec(spec, inputs);
}
