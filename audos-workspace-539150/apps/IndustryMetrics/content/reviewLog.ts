// Verification review log (2026-11-08). One place that records, for every metric that is not plain
// "Verified", why it holds its status. Applied to the authored packs when the library loads.
//   - PENDING_REVIEWS: metrics that stay hidden from learners, with the recorded reason.
//   - CAVEAT_RECLASSIFICATIONS: metrics that were source-verified but whose source definition is
//     company-, jurisdiction- or method-specific; they become "Verified with caveat" and the caveats
//     are shown to learners.
// Metrics promoted or authored in this review carry their evidence directly in their pack.

import type { MetricDefinition, MetricReview, MetricSourceRef } from '../core/types';
import { ref } from './define';

export const REVIEW_DATE = '2026-11-08';

type PendingReview = Omit<MetricReview, 'reviewedOn'>;

const NOT_RESEARCHED = 'Not re-researched in this review; the earlier build note is retained. No authoritative definition has been read.';
const EDGAR = 'SEC EDGAR full-text search (exact phrase, filings dated 2021 to 2026-11-08)';

export const PENDING_REVIEWS: Readonly<Record<string, PendingReview>> = {
  'approval-rate': { checkedThisReview: false, sourcesChecked: ['CFPB HMDA Data Point reports (earlier build)'], reason: 'CFPB HMDA reports define a denial rate (denied ÷ applications excluding withdrawn and incomplete files), not an approval rate. ' + NOT_RESEARCHED, nextStep: 'Find a lender filing or regulator publication that defines approval rate, or document it as the complement of the HMDA denial rate with explicit exclusions.' },
  'payment-success-rate': { checkedThisReview: false, sourcesChecked: [EDGAR + ' (earlier build)'], reason: 'The earlier build found no regulator, statistical-agency or filing definition (only marketing uses). ' + NOT_RESEARCHED, nextStep: 'Look for a payment-scheme, acquirer or regulator document that defines transaction success or authorisation rate.' },
  'numeric-distribution': { checkedThisReview: true, sourcesChecked: [EDGAR + ': no 10-K, S-1, F-1 or 20-F contains the phrase “numeric distribution”', 'Haleon F-1/A (earlier build): defines weighted distribution only'], reason: 'No authoritative definition found; the one source that explains distribution defines the weighted form only.', nextStep: 'Read a retail-measurement provider glossary (for example NielsenIQ or Circana) if one can be accessed.' },
  'trade-spend-ratio': { checkedThisReview: false, sourcesChecked: ['IFRS 15 treatment of consideration payable to a customer (not read)'], reason: 'No authoritative definition of the ratio found. ' + NOT_RESEARCHED, nextStep: 'Read IFRS 15 on consideration payable to a customer and one FMCG filing that discloses trade spend.' },
  'sell-out-to-sell-in-ratio': { checkedThisReview: false, sourcesChecked: [], reason: 'Practitioner concept; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a distributor-inventory or channel-stock definition from a company filing or industry body.' },
  'units-per-transaction': { checkedThisReview: true, sourcesChecked: ['Chico’s FAS Q2 FY2023 earnings release (8-K)', 'Urban Outfitters Q2 FY2024 Form 10-Q', EDGAR + ' (209 filings mention the phrase)'], reason: 'The retail filings read use “units per transaction” as a monitored metric without defining it.', nextStep: 'Find a filing that states the calculation (units sold ÷ transactions).' },
  gmroi: { checkedThisReview: true, sourcesChecked: ['Advance Auto Parts Q3 2011 earnings release (earlier build)', EDGAR + ': 7 filings use the term; none was read for a definition in this review'], reason: 'The one primary definition read divides gross profit by average inventory net of accounts payable, which differs from the inventory-at-cost denominator used here; no authoritative inventory-at-cost definition read.', nextStep: 'Either adopt the net-of-payables variant with a source, or find a source for the at-cost form.' },
  'sell-through-rate': { checkedThisReview: true, sourcesChecked: ['Tilly’s and GameStop 10-Ks (earlier build): use the term without defining it', EDGAR + ': more than 10,000 matching filings, none isolated as a definition'], reason: 'Widely used in retail and consumer electronics, but no filing read states the calculation.', nextStep: 'Find a retailer or brand filing with a stated formula.' },
  'rule-of-40': { checkedThisReview: true, sourcesChecked: [EDGAR + ': 3 matching filings, none defines the measure'], reason: 'Investor heuristic with no authoritative definition; growth and margin bases vary.', nextStep: 'Only verifiable as a described heuristic; would need a filing or research paper that states it.' },
  'contribution-per-order': { checkedThisReview: true, sourcesChecked: [EDGAR + ': no filing contains the exact phrase “contribution per order”'], reason: 'No authoritative definition found; companies that report order-level economics use their own names and cost scopes.', nextStep: 'Read a delivery or e-commerce filing that defines contribution profit per order.' },
  'payer-conversion-rate': { checkedThisReview: false, sourcesChecked: ['Zynga 10-K FY2021 (defines monthly unique payers, not a payer conversion ratio)'], reason: 'Gaming filings define payer counts but not the conversion ratio. ' + NOT_RESEARCHED, nextStep: 'Find a gaming or freemium filing that defines paying users as a percentage of active users.' },
  'capex-intensity': { checkedThisReview: true, sourcesChecked: ['AT&T, Verizon, T-Mobile US, Vodafone, Optimum Communications (Altice USA), Telephone & Data Systems, Lumen, Liberty Global and Millicom latest annual reports'], reason: 'None of the operator annual reports read defines capital intensity or capex-to-revenue as a metric (Millicom mentions “CAPEX intensity” only as an impairment-test assumption).', nextStep: 'Find an operator or industry-body (for example GSMA or ITU) definition; note spectrum treatment.' },
  'unplanned-downtime-rate': { checkedThisReview: false, sourcesChecked: ['NIST (Kang et al., 2016) restatement of ISO 22400-2 (earlier build)'], reason: 'The ISO 22400-2 KPIs as restated by NIST define downtime elements and availability but no ratio of unplanned downtime to planned production time. ' + NOT_RESEARCHED, nextStep: 'Read ISO 22400-2 itself or an equipment-effectiveness standard.' },
  'cost-per-shipment': { checkedThisReview: true, sourcesChecked: [EDGAR + ': no filing contains the phrase “cost per piece”'], reason: 'No authoritative definition found; carriers report revenue per piece and use their own cost scopes.', nextStep: 'Find a carrier or 3PL filing that defines unit cost per shipment.' },
  'order-fill-rate': { checkedThisReview: true, sourcesChecked: [EDGAR + ': 3 filings use the phrase; not read for a definition'], reason: 'No authoritative definition read; order, line and unit fill rates are different variants.', nextStep: 'Read a supply-chain standard (for example APICS or CSCMP glossary) or a distributor filing.' },
  'warehouse-space-utilization': { checkedThisReview: false, sourcesChecked: [], reason: 'Practitioner metric; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a warehouse operator filing or logistics-association definition.' },
  'inventory-record-accuracy': { checkedThisReview: true, sourcesChecked: [EDGAR + ': no filing contains the phrase “inventory record accuracy”'], reason: 'No authoritative definition found; cycle-count tolerances vary.', nextStep: 'Read supply-chain research on inventory record accuracy (for example peer-reviewed operations journals).' },
  'first-attempt-delivery-rate': { checkedThisReview: true, sourcesChecked: [EDGAR + ': no filing contains the phrase “first attempt delivery”'], reason: 'No authoritative definition found.', nextStep: 'Find a postal operator or courier annual report that defines first-time delivery success.' },
  'contribution-per-delivery': { checkedThisReview: false, sourcesChecked: [], reason: 'Company-specific unit-economics measure; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a last-mile operator filing that defines contribution per delivery.' },
  'gross-margin-per-hectare': { checkedThisReview: false, sourcesChecked: [], reason: 'Farm-management concept; no source located. ' + NOT_RESEARCHED, nextStep: 'Read a farm-management handbook or agricultural-economics extension guide that defines gross margin per hectare.' },
  'break-even-price': { checkedThisReview: true, sourcesChecked: ['NDSU Extension AS1161 (defines breakeven for feedlot cattle only)'], reason: 'The only definition read concerns feedlot cattle sale price; a per-hectare crop break-even price definition was not found.', nextStep: 'Read a crop-budget extension publication that defines break-even price per unit of yield.' },
  'break-even-yield': { checkedThisReview: true, sourcesChecked: ['NDSU Extension AS1161 (feedlot breakeven only)'], reason: 'No crop break-even yield definition found.', nextStep: 'Read a crop-budget extension publication.' },
  'trading-margin-per-tonne': { checkedThisReview: false, sourcesChecked: [], reason: 'Commodity-trading practice; no source located. ' + NOT_RESEARCHED, nextStep: 'Find an agricultural trader filing that discloses margin per tonne with a definition.' },
  'gross-rental-yield': { checkedThisReview: true, sourcesChecked: [EDGAR + ': no filing contains “gross rental yield”; 18 filings contain “rental yield” and were not read'], reason: 'No authoritative definition read.', nextStep: 'Read a housing statistics agency or property-market regulator publication.' },
  goppar: { checkedThisReview: true, sourcesChecked: [EDGAR + ': only NRI Real Estate Investment & Technology filings use the term, and its 10-K text contains no definition', 'USALI (AHLA) is a paid standard and was not read'], reason: 'The Uniform System of Accounts for the Lodging Industry defines gross operating profit but was not accessible.', nextStep: 'Obtain the USALI definitions or an owner-operator hotel filing that defines GOPPAR.' },
  'food-cost-percentage': { checkedThisReview: true, sourcesChecked: ['Darden, Texas Roadhouse, Cheesecake Factory, BJ’s Restaurants, Noodles & Company, Red Robin and Cracker Barrel latest 10-Ks'], reason: 'Red Robin presents “cost of sales” as a percentage of restaurant revenue; none of the seven 10-Ks read defines a food-only food-cost percentage.', nextStep: 'Read a restaurant-accounting textbook or association guide.' },
  'prime-cost-percentage': { checkedThisReview: true, sourcesChecked: ['Same seven restaurant 10-Ks: no occurrence of “prime cost”'], reason: 'No authoritative definition found.', nextStep: 'Read a restaurant-accounting textbook or association guide.' },
  'table-turnover': { checkedThisReview: true, sourcesChecked: [EDGAR + ': 9 filings mention “table turns”; not read for a definition'], reason: 'No authoritative definition read.', nextStep: 'Read hospitality research on seat and table utilisation.' },
  revpash: { checkedThisReview: true, sourcesChecked: [EDGAR + ': no filing contains “revenue per available seat hour”', 'Cornell hospitality research on RevPASH (not read)'], reason: 'No authoritative definition read.', nextStep: 'Read the Cornell restaurant revenue-management literature that introduced RevPASH.' },
  'expiry-write-off-rate': { checkedThisReview: false, sourcesChecked: [], reason: 'Practitioner metric; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a pharmaceutical distributor or retailer filing that discloses expiry write-offs with a denominator.' },
  'realization-rate': { checkedThisReview: true, sourcesChecked: [EDGAR + ': 4 filings mention “realization rate”, the one examined concerns medical-billing settlements, not professional-services fees', 'Huron, FTI and CRA 10-Ks define utilization but not realization'], reason: 'No professional-services definition found.', nextStep: 'Read a law-firm or consulting-firm filing or a professional-services management text.' },
  'revenue-per-fte': { checkedThisReview: false, sourcesChecked: [], reason: 'Productivity ratio; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a firm filing that discloses revenue per employee or per professional with a stated FTE basis.' },
  'project-margin': { checkedThisReview: false, sourcesChecked: [], reason: 'Firm-specific engagement-profitability measure; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a project-based services filing that defines project or engagement margin.' },
  'cost-per-engagement': { checkedThisReview: false, sourcesChecked: [], reason: 'Unit-cost measure; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a professional-services cost-accounting source.' },
  'on-time-delivery': { checkedThisReview: false, sourcesChecked: [], reason: 'Definitions of “on time” (date, window, tolerance) are contract-specific; no source located. ' + NOT_RESEARCHED, nextStep: 'Find a carrier or supply-chain standard (for example ISO 22400 or SCOR) that defines on-time delivery.' },
  // FMCG expansion pack (2026-11-12).
  'compliance-cost-ratio': { checkedThisReview: false, sourcesChecked: [], reason: 'Management-practice ratio used in the FMCG expansion lessons; no authoritative definition located. Not re-researched in this build.', nextStep: 'Find a regulator impact assessment or company filing that defines compliance cost as a share of revenue.' },
  'illicit-consumption-share': { checkedThisReview: true, sourcesChecked: ['WHO FCTC Protocol to Eliminate Illicit Trade in Tobacco Products (overview page; no ratio defined)', 'Secondary press reports of government and study estimates (not authoritative)'], reason: 'No official source defining the ratio or a verified Vietnamese estimate was read; figures in circulation conflict.', nextStep: 'Read an official or peer-reviewed methodology (for example a pack-swap survey protocol) and record its definition.' },
  'household-penetration': { checkedThisReview: false, sourcesChecked: [], reason: 'Consumer-panel concept used in the beauty and household lessons; no provider glossary or filing definition was read. Not re-researched in this build.', nextStep: 'Read a consumer-panel provider glossary (for example Kantar Worldpanel) or an FMCG filing that defines penetration.' },
  'cost-per-use': { checkedThisReview: false, sourcesChecked: [], reason: 'Unit-value concept used in the household lessons; no authoritative definition read for this build. Not re-researched in this build.', nextStep: 'Read a consumer-protection unit-pricing rule or a published unit-price definition.' },
};

export interface CaveatReclassification {
  caveats: string[];
  addSources?: MetricSourceRef[];
}

const SAME_BASIS = 'Asset yield minus cost of funding approximates the net interest margin only when both use the same denominator (average earning assets), the same period and annualisation, the same averaging method, and the same interest income and expense definitions, with no tax-equivalent adjustment on one side only.';
const NO_THRESHOLD_CAVEAT = 'No threshold is stated: any limit depends on jurisdiction, standard and effective date.';

export const CAVEAT_RECLASSIFICATIONS: Readonly<Record<string, CaveatReclassification>> = {
  // Banking
  'asset-yield': { caveats: ['FDIC aggregate basis: interest, dividend and fee income over average earning assets. Banks that exclude fees, or report on a tax-equivalent basis, show different figures.', SAME_BASIS] },
  'cost-of-funds': { caveats: ['This library uses the FDIC basis: interest expense ÷ average earning assets (“cost of funding earning assets”). Many banks report cost of funds as interest expense ÷ average interest-bearing liabilities, which gives a higher percentage; the two are not interchangeable.', SAME_BASIS] },
  'cost-to-income-ratio': { caveats: ['IMF and FDIC differ: the FDIC efficiency ratio deducts amortisation of intangibles from expenses.', 'Treatment of provisions and one-off restructuring costs varies; compare banks on one definition only.'] },
  'cost-of-risk': { caveats: ['The EBA indicator divides annualised impairment flows by period-end gross loans subject to impairment; this library uses average gross loans.', 'Banks differ on whether other financial assets or off-balance-sheet exposures are included, and on provisioning methodology (for example IFRS 9 overlays).'] },
  'loan-to-deposit-ratio': { caveats: ['The EBA restricts both loans and deposits to households and non-financial corporations; the IMF publishes the reciprocal; national regulatory LDRs (including in Vietnam) apply their own adjustments, which were not verified.', NO_THRESHOLD_CAVEAT] },
  'casa-ratio': { caveats: ['Source: Reserve Bank of India statistical usage for scheduled commercial banks; eligible account types differ by regulator and bank.', 'State whether period-end or average balances are used.'] },
  'capital-adequacy-ratio': { caveats: ['Capital components and risk weights follow the national implementation of the Basel framework; CET1 and Tier 1 ratios use narrower capital.', NO_THRESHOLD_CAVEAT] },
  'npl-ratio': { caveats: ['The IMF FSI concept is 90+ days past due or other evidence of nonperformance; national classification rules (including Vietnam’s) can differ and were not verified.', NO_THRESHOLD_CAVEAT] },
  'portfolio-yield': { caveats: ['One lender’s definition (Oportun): annualised interest income ÷ average daily principal balance. Fee inclusion and the balance basis differ between lenders.'] },
  'collection-rate': { caveats: ['CGAP notes there is no internationally consistent terminology: on-time, “Asian” and cumulative collection rates differ.', 'A collection rate is not the complement of the loan-loss rate.'] },
  'risk-adjusted-margin': { caveats: ['This library’s simplified form (yield − cost of funds − credit loss rate on one common denominator) omits the non-interest income and fair-value adjustments in Oportun’s company-defined measure.'] },
  'persistency-ratio': { caveats: ['Indian regulatory (IRDAI) method; other markets and actuarial bodies define persistency differently.', 'Premium-based and policy-count-based persistency can diverge; report them separately.'] },
  'return-on-assets': { caveats: ['Pre-tax income (the IMF FSI preference) and after-tax income (FDIC and textbooks) give different results; state which is used.', 'Use average, not year-end, assets.'] },
  'return-on-equity': { caveats: ['The equity definition (book, average or period-end) and the tax basis must be stated; the IMF FSI recommends after-tax income over capital and reserves.', 'Not meaningful when equity is zero or negative.'] },
  // Technology and digital
  'annual-recurring-revenue': { caveats: ['Company-defined operating metric with no accounting standard; companies differ on contracted-but-not-started subscriptions and usage revenue.', 'ARR is not GAAP or IFRS revenue and is not a forecast.'] },
  'monthly-recurring-revenue': { caveats: ['Company-defined (Vertex): annual plans are divided by 12 and one-off fees are excluded.'] },
  'net-revenue-retention': { caveats: ['Company-defined cohort method (Sprout Social, Domo); definitions differ on usage and overage revenue and on trailing averaging.', 'NRR measures revenue from the installed base, not how many customers stay (see Customer Retention Rate).'] },
  'gross-revenue-retention': { caveats: ['Company-defined (Vertex measures monthly MRR retention; this library applies the rule to a 12-month ARR cohort).', 'Some companies count only terminations and ignore downgrades.'] },
  'customer-lifetime-value': { caveats: ['Simple steady-state formula: constant churn, no discounting, gross-margin basis. Very low churn makes the result explode.', 'The source (Thorne) uses annual gross contribution and annual churn; this library uses monthly equivalents.'] },
  'ltv-to-cac': { caveats: ['Inherits every assumption of customer lifetime value; both inputs must use the same customer definition and period.'] },
  'cac-payback-months': { caveats: ['Klaviyo computes a company-level figure from revenue growth; this library’s per-customer form divides CAC by monthly gross profit per account.'] },
  'customer-acquisition-cost': { caveats: ['Which costs count (media, salaries, tools, incentives, partner commissions) varies between companies; Thorne excludes headcount and benefit expenses.', 'State whether CAC is blended or paid-channel only.'] },
  'gross-merchandise-value': { caveats: ['eBay GMV includes shipping and taxes with no adjustment for returns or cancellations; Etsy GMS excludes shipping and is net of refunds. State the basis.', 'GMV is not revenue.'] },
  'take-rate': { caveats: ['The revenue streams in the numerator (commissions, payments, advertising, services) and the treatment of shipping and refunds in gross value differ between platforms.', 'Compare take rates only on the same basis.'] },
  arpu: {
    caveats: ['T-Mobile defines ARPU as service revenue ÷ average customers per month; Snap divides quarterly revenue by average DAUs and Pinterest divides revenue by average MAUs. State the user definition, revenue scope and period.'],
    addSources: [
      ref('sec-snap-10k-fy2025', 'Key metrics — average revenue per user', 'ARPU is quarterly revenue divided by the average daily active users (DAUs) in the quarter.'),
      ref('sec-pinterest-10k-fy2025', 'Key metrics — ARPU', 'ARPU is total revenue in a geography during a period divided by the average of the MAUs measured at the end of the current and prior period.'),
    ],
  },
  'churn-rate': { caveats: ['Thorne divides customers lost by customers at the start of the period; T-Mobile divides deactivations by average customers and reports a monthly rate. This library uses the start-of-period form.', 'Monthly and annual churn are not interchangeable; prepaid churn depends on the inactivity rule.'] },
  'customer-retention-rate': { caveats: ['Company-defined (Thorne): (customers at end − new customers) ÷ customers at start. “Active customer” must be defined, especially for non-contractual businesses.'] },
  // Manufacturing
  'scrap-rate': { caveats: ['The ISO 22400-2 scrap ratio (as restated by NIST) divides by processed quantity, which can include reworked units; the ISO text itself was not read.'] },
  'throughput-rate': { caveats: ['ISO 22400-2 (as restated by NIST) counts good plus reworked units over actual order execution time; this library uses good units over production hours.'] },
  // Retail and FMCG
  'shrinkage-rate': { caveats: ['Kohl’s accounting policy: shrink is recorded minus physical inventory, estimated as a percentage of sales between counts; retailers differ on cost versus retail valuation.'] },
  'same-store-sales-growth': { caveats: ['Comparability rules are company-defined (opening threshold, remodels, relocations, online sales, 53rd week); Home Depot notes methods vary across the industry.'] },
  'weighted-distribution': { caveats: ['Haleon’s definition rests on retail-measurement data; state the store universe, the category and the data provider.'] },
  'sales-per-sqm': { caveats: ['Home Depot reports sales per retail square foot; selling area versus gross area and the averaging method differ between retailers.'] },
  'average-transaction-value': { caveats: ['Home Depot defines average ticket as the average price paid per transaction; restaurants use per-guest checks and e-commerce uses average order value, before or after discounts.'] },
  // Shared financial analysis
  'days-inventory-outstanding': { caveats: ['The textbook form uses ending inventory while inventory turnover uses average inventory, so DIO equals 365 ÷ inventory turnover only when ending and average inventory are equal.', 'Some analysts use average inventory instead.'] },
  'ebitda-margin': { caveats: ['EBITDA is a non-GAAP and non-IFRS measure; “adjusted EBITDA” exclusions differ by company, and IFRS 16 moves lease cost below EBITDA.'] },
  'capacity-utilization': { caveats: ['The source is the Federal Reserve’s macro definition (output index ÷ capacity index); firms must define capacity (design, practical or sustainable) and use it consistently.'] },
  'market-share': { caveats: ['A share is meaningful only for a stated relevant market; value share and volume share can differ, and measured (panel or audit) coverage is not the total market.'] },
};

/** Applies the recorded review decisions to one authored metric. */
export function applyReviewLog(metric: MetricDefinition): MetricDefinition {
  const evidence = metric.evidence;
  if (evidence.status === 'pending-verification') {
    const review = PENDING_REVIEWS[metric.metricId];
    if (!review) return metric;
    return { ...metric, evidence: { ...evidence, note: review.reason + ' Excluded from learner views until verified.', review: { reviewedOn: REVIEW_DATE, ...review } } };
  }
  const reclass = CAVEAT_RECLASSIFICATIONS[metric.metricId];
  if (reclass && evidence.status === 'source-verified') {
    return { ...metric, evidence: { ...evidence, status: 'verified-with-caveat', caveats: reclass.caveats, sources: [...evidence.sources, ...(reclass.addSources ?? [])] } };
  }
  return metric;
}
