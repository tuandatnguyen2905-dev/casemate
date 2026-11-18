import type { ExpertRubricItem, LibraryQuestion } from './skillQuestionLibrary';
import { toleranceRuleText } from './numericUnits';
import { blockingUnitShorthand } from './unitLabels';

export type MarketSizingFormat = 'provided-data' | 'ambiguous-estimation';

export const MARKET_SIZING_FORMAT_LABELS: Record<MarketSizingFormat, string> = {
  'provided-data': 'Provided Data',
  'ambiguous-estimation': 'Ambiguous Estimation',
};

export const MARKET_SIZING_FORMAT_DESCRIPTIONS: Record<MarketSizingFormat, string> = {
  'provided-data': 'Every required input is supplied. Build the correct funnel, calculate one checkable answer, keep units visible, and interpret the result.',
  'ambiguous-estimation': 'Define the market, choose mutually exclusive demand drivers, and justify every assumption you introduce. Graded on scope, driver logic and justified assumptions, not on matching one number.',
};

export interface MarketSizingSourceCase {
  sourceCaseId: string;
  code: string;
  format: MarketSizingFormat;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  title: string;
  industry: string;
  brief: string;
  task: string;
  /** The model decomposition route. Post-submission only (worked answer); never part of the task. */
  modelRoute?: string;
  suppliedFacts: string[];
  illustrativeAssumptions: string[];
  formula: string;
  calculations: string[];
  finalAnswer: string;
  answerUnit: string;
  interpretation: string;
  reasonablenessCheck?: string;
  assessment: string;
  weakAnswerFeedback: string;
  alternatives: string[];
  numericAnswer?: number;
  numericTolerance?: number;
  original?: boolean;
}

const provided = (item: Omit<MarketSizingSourceCase, 'format' | 'illustrativeAssumptions'>): MarketSizingSourceCase => ({
  ...item,
  format: 'provided-data',
  illustrativeAssumptions: [],
});

const AMBIGUOUS_TASK = 'Estimate the annual market size. Define the scope, choose mutually exclusive demand drivers, state and justify each assumption you introduce, and calculate the result with units.';

const ambiguous = (item: Omit<MarketSizingSourceCase, 'format' | 'suppliedFacts' | 'numericAnswer' | 'numericTolerance' | 'task' | 'reasonablenessCheck'>): MarketSizingSourceCase => ({
  ...item,
  format: 'ambiguous-estimation',
  task: AMBIGUOUS_TASK,
  suppliedFacts: [],
});

export const MARKET_SIZING_CYCLE_3_CASES: MarketSizingSourceCase[] = [
  provided({
    sourceCaseId: 'CM-MS-A01', code: 'A01', difficulty: 'hard', title: 'Detergent Refills', industry: 'FMCG & Consumer',
    brief: 'Urban: 4 million households; 20% buy refills; buyers purchase 2 packs/month at VND 70,000. Non-urban: 6 million households; 10% buy; buyers purchase 1 pack/month at VND 50,000. Groups do not overlap. Exclude businesses.',
    task: 'Estimate annual household retail spending on refill packs across both groups, and state the result with its unit.',
    modelRoute: 'Build separate urban and non-urban buyer funnels, calculate packs and annual value for each, reconcile the total, and explain the unit.',
    suppliedFacts: ['Urban: 4 million households, 20% buyers, 2 packs/month, VND 70,000/pack.', 'Non-urban: 6 million households, 10% buyers, 1 pack/month, VND 50,000/pack.', 'The groups are disjoint; businesses are excluded.'],
    formula: '(Urban households × urban buyer rate × packs/month × 12 × urban price) + (non-urban households × non-urban buyer rate × packs/month × 12 × non-urban price)',
    calculations: ['Urban buyers = 4 million × 20% = 0.8 million.', 'Urban value = 0.8 million × 2 × 12 × VND 70,000 = 1.344 trillion VND.', 'Non-urban buyers = 6 million × 10% = 0.6 million.', 'Non-urban value = 0.6 million × 1 × 12 × VND 50,000 = 0.360 trillion VND.', 'Total = 1.704 trillion VND/year.'],
    finalAnswer: '1.704 trillion VND/year of household retail spending.', answerUnit: 'VND per year', interpretation: 'This is category retail spending by buyer households, not a brand’s revenue.', reasonablenessCheck: 'Per-buyer annual spend is 1.68 million VND urban and 0.60 million VND non-urban; multiplying each by its buyer count reproduces the segment totals.', assessment: 'Credit disjoint segments, adoption before frequency, twelve months, arithmetic, units, and the spending label.', weakAnswerFeedback: 'A 10 million × VND 70,000 answer is about 2/10: it omits both buyer filters and purchase frequency, so it does not estimate annual demand.', alternatives: ['A per-buyer annual-spend route earns full credit when both segments reconcile.'], numericAnswer: 1.704, numericTolerance: 0.002,
  }),
  provided({
    sourceCaseId: 'CM-MS-A02', code: 'A02', difficulty: 'easy', title: 'University Tea Trials', industry: 'FMCG & Consumer',
    brief: 'A fictional launch can reach 1.2 million students. In the supplied scenario, 25% become buyers. Each buyer purchases 3 bottles/month during 10 active campus months at VND 18,000 per bottle. No purchases occur in the other 2 months.',
    task: 'Estimate the annual retail value of tea bottles bought by the reached students, and state the result with its unit.',
    modelRoute: 'Calculate buyers, bottles per active month, active-year units and retail value. Explain why the other two months contribute zero.',
    suppliedFacts: ['1.2 million reached students.', '25% become buyers.', '3 bottles per buyer per active month.', '10 active months and zero purchases in the other 2 months.', 'VND 18,000 per bottle.'],
    formula: 'Reached students × buyer rate × bottles/month × 10 active months × price', calculations: ['Buyers = 1.2 million × 25% = 300,000.', 'Bottles per active month = 300,000 × 3 = 900,000.', 'Active-year bottles = 900,000 × 10 = 9 million.', 'Value = 9 million × VND 18,000 = 162 billion VND/year.'], finalAnswer: '162 billion VND/year.', answerUnit: 'VND per year', interpretation: 'This is the reached student group’s scenario spending, not all students.', reasonablenessCheck: 'Each buyer purchases 30 bottles/year and spends VND 540,000; 300,000 × VND 540,000 = 162 billion VND.', assessment: 'The supplied period is ten months. A twelve-month answer overstates value by 32.4 billion VND.', weakAnswerFeedback: 'A fully shown twelve-month answer can earn about 6/10: the buyer funnel and price are right, but the period is wrong.', alternatives: ['A monthly-total route is valid if multiplied by ten, not twelve.'], numericAnswer: 162, numericTolerance: 0.2,
  }),
  provided({
    sourceCaseId: 'CM-MS-A03', code: 'A03', difficulty: 'medium', title: 'Cafe Inventory Subscriptions', industry: 'Technology & SaaS',
    brief: 'A region has 30,000 cafes; 40% are eligible for the software (the brief does not specify the eligibility requirements). In the stated scenario, 15% of eligible cafes subscribe for the entire year at VND 500,000/month. Ignore churn and setup fees.',
    task: 'Estimate annual subscription revenue from cafes in the stated scenario, and label the result as scenario subscription revenue.',
    modelRoute: 'Show the eligibility funnel and conditional subscription share, calculate annual account revenue, and label the result as scenario subscription revenue.',
    suppliedFacts: ['30,000 cafes.', '40% are eligible for the software (requirements not specified).', '15% of eligible cafes subscribe.', 'VND 500,000/month for 12 months.', 'Ignore churn and setup fees.'], formula: 'Cafes × eligibility × conditional subscription rate × monthly price × 12', calculations: ['Eligible cafes = 30,000 × 40% = 12,000.', 'Subscribers = 12,000 × 15% = 1,800.', 'Annual revenue = 1,800 × VND 500,000 × 12 = 10.8 billion VND.'], finalAnswer: '10.8 billion VND of annual scenario subscription revenue.', answerUnit: 'VND per year', interpretation: 'This is revenue from the stated subscriber scenario, not the value of all potential cafes.', reasonablenessCheck: 'Each subscriber pays 6 million VND/year; 1,800 × 6 million VND = 10.8 billion VND.', assessment: 'Applying 15% to all cafes produces 27 billion VND and reveals a missing eligibility term.', weakAnswerFeedback: '27 billion VND is around 5/10 when the rest of the math is correct because the conditional denominator is wrong.', alternatives: ['A single product formula earns full credit when both percentages are correctly anchored.'], numericAnswer: 10.8, numericTolerance: 0.02,
  }),
  provided({
    sourceCaseId: 'CM-MS-A04', code: 'A04', difficulty: 'hard', title: 'Air-Purifier Filter Replacements', industry: 'Consumer Durables',
    brief: 'There are 2 million installed purifiers; 70% remain active. Active units need an average 1.5 filters/year; 80% of those purchases use a genuine filter at VND 300,000. The figures describe expected annual averages.',
    task: 'Estimate annual retail sales of genuine replacement filters, and state the result with its unit.',
    modelRoute: 'Turn the installed base into active devices, expected filter events, genuine purchases and annual retail value. Explain the fractional annual rate.',
    suppliedFacts: ['2 million installed purifiers.', '70% remain active.', '1.5 replacement filters per active device per year.', '80% genuine share.', 'VND 300,000 per genuine filter.'], formula: 'Installed base × active share × annual replacement rate × genuine share × price', calculations: ['Active units = 2 million × 70% = 1.4 million.', 'All expected filter events = 1.4 million × 1.5 = 2.1 million.', 'Genuine filters = 2.1 million × 80% = 1.68 million.', 'Value = 1.68 million × VND 300,000 = 504 billion VND/year.'], finalAnswer: '504 billion VND/year of genuine-filter retail sales.', answerUnit: 'VND per year', interpretation: 'The 1.5 rate is an expectation across devices and years, not half a physical transaction.', reasonablenessCheck: 'Skipping the active filter gives 720 billion VND; the 70% step explains the difference.', assessment: 'Credit the stock-to-flow conversion, active filter, genuine share, units, and interpretation.', weakAnswerFeedback: '720 billion VND may earn about 6/10 if otherwise correct, but it materially overstates demand by treating inactive devices as buyers.', alternatives: ['Combining 70% and 80% in one multiplication is valid when the bases remain clear.'], numericAnswer: 504, numericTolerance: 0.5,
  }),
  provided({
    sourceCaseId: 'CM-MS-A05', code: 'A05', difficulty: 'medium', title: 'Paid MT Preparation', industry: 'Education',
    brief: 'A cohort contains 500,000 eligible students. Twenty percent plan to prepare for management-trainee (MT) recruitment; 30% of that group subscribe to a paid platform. Average paid tenure is 4 months at VND 150,000/month. Ignore discounts and repeat subscriptions.',
    task: 'Estimate the paid-platform revenue from this student cohort, and state the result with its unit.',
    modelRoute: 'Show the nested student funnel, paid months per subscriber and cohort revenue. Distinguish average paid tenure from twelve calendar months.',
    suppliedFacts: ['500,000 eligible students.', '20% plan to prepare.', '30% of preparers subscribe.', 'Four paid months at VND 150,000/month.', 'Ignore discounts and repeats.'], formula: 'Eligible students × preparer share × paid uptake among preparers × paid months × monthly price', calculations: ['Preparers = 500,000 × 20% = 100,000.', 'Subscribers = 100,000 × 30% = 30,000.', 'Revenue = 30,000 × 4 × VND 150,000 = 18 billion VND.'], finalAnswer: '18 billion VND for the cohort.', answerUnit: 'VND', interpretation: 'Four months is average paid tenure, not a twelve-month multiplier.', reasonablenessCheck: 'Each subscriber contributes VND 600,000; 30,000 × VND 600,000 = 18 billion VND.', assessment: 'State each conditional denominator next to its percentage.', weakAnswerFeedback: '90 billion VND is around 5/10 when the 20% preparer step is missing, despite neat arithmetic.', alternatives: ['A compact product formula is valid when all conditional bases are explicit.'], numericAnswer: 18, numericTolerance: 0.03,
  }),
  provided({
    sourceCaseId: 'CM-MS-A06', code: 'A06', difficulty: 'medium', title: 'Online Pet-Food Channel', industry: 'Pet Care & E-commerce',
    brief: 'A market has 1.5 million pet households. Forty percent buy pet food online, purchasing 10 kg/year each at VND 80,000/kg. A particular platform captures 15% of that online spending. Assume equal average baskets across platforms.',
    task: 'Estimate the platform’s annual pet-food value. Name the resulting metric precisely and explain what cannot be inferred.',
    modelRoute: 'Calculate online category spending before taking the platform’s 15% share. Name the resulting metric precisely and explain what cannot be inferred.',
    suppliedFacts: ['1.5 million pet households.', '40% buy online.', '10 kg/year per online household.', 'VND 80,000/kg.', 'Platform captures 15% of online spending.'], formula: 'Households × online share × kg/year × price/kg × platform share', calculations: ['Online households = 1.5 million × 40% = 600,000.', 'Online category value = 600,000 × 10 × VND 80,000 = 480 billion VND.', 'Platform transaction value = 480 billion VND × 15% = 72 billion VND/year.'], finalAnswer: '72 billion VND/year of platform transaction value.', answerUnit: 'VND per year', interpretation: 'No take rate, fees, or costs are supplied, so commission revenue and profit cannot be inferred.', reasonablenessCheck: 'Each online household spends VND 800,000/year; the platform captures VND 120,000 of transaction value per online household.', assessment: 'A correct figure with the wrong “fee revenue” label can still lose material scope and interpretation credit.', weakAnswerFeedback: 'A correct 72 billion VND figure labelled commission revenue is roughly 7/10: arithmetic is right, but the commercial metric is wrong.', alternatives: ['Share-first and category-first multiplication are mathematically equivalent.'], numericAnswer: 72, numericTolerance: 0.1,
  }),
  provided({
    sourceCaseId: 'CM-MS-A07', code: 'A07', difficulty: 'easy', title: 'Battery-Swap Service', industry: 'Mobility',
    brief: 'There are 120,000 eligible delivery riders (the brief treats these as the addressable rider base). The scenario assumes 25% adopt battery swapping; each adopter makes 15 paid swaps/month over 11 working months at VND 12,000 per swap. Ignore other charges.',
    task: 'Estimate annual battery-swap service revenue from the eligible riders, and state the result with its unit.',
    modelRoute: 'Filter riders by uptake, translate use to annual swaps, apply the per-swap fee, and sanity-check the value per adopter.',
    suppliedFacts: ['120,000 eligible riders (the addressable rider base).', '25% adoption.', '15 paid swaps/month.', '11 working months.', 'VND 12,000/swap.'], formula: 'Eligible riders × adoption × swaps/month × 11 months × fee/swap', calculations: ['Adopters = 120,000 × 25% = 30,000.', 'Annual swaps = 30,000 × 15 × 11 = 4.95 million.', 'Revenue = 4.95 million × VND 12,000 = 59.4 billion VND.'], finalAnswer: '59.4 billion VND/year of service revenue.', answerUnit: 'VND per year', interpretation: 'The scenario excludes non-adopters, the twelfth month, and other charges.', reasonablenessCheck: 'Each adopter makes 165 swaps and spends 1.98 million VND; 30,000 × 1.98 million VND = 59.4 billion VND.', assessment: 'The uptake term belongs before swap frequency and the supplied period is eleven months.', weakAnswerFeedback: 'Pricing every eligible rider is about 5/10 if fee and period are correct; it overstates the market fourfold.', alternatives: ['Calculating annual revenue per adopter first is fully valid.'], numericAnswer: 59.4, numericTolerance: 0.08,
  }),
  provided({
    sourceCaseId: 'CM-MS-A08', code: 'A08', difficulty: 'hard', title: 'Restaurant Delivery Packaging', industry: 'Food Service & Packaging',
    brief: 'A region has 80,000 restaurants; 30% offer delivery. Each delivery restaurant handles 400 orders/month for 12 months. Sixty-five percent of those orders require a premium packaging unit costing VND 2,000 at retail. Assume one unit per qualifying order.',
    task: 'Estimate annual retail spending on premium delivery packaging, and state the spending metric.',
    modelRoute: 'Show the restaurant, order and qualifying-unit funnels. Keep the one-unit-per-order rule visible and state the spending metric.',
    suppliedFacts: ['80,000 restaurants.', '30% offer delivery.', '400 orders/month for 12 months.', '65% require premium packaging.', 'One unit/order at VND 2,000 retail.'], formula: 'Restaurants × delivery share × orders/month × 12 × qualifying share × one unit/order × price', calculations: ['Delivery restaurants = 80,000 × 30% = 24,000.', 'Annual orders = 24,000 × 400 × 12 = 115.2 million.', 'Qualifying units = 115.2 million × 65% = 74.88 million.', 'Value = 74.88 million × VND 2,000 = 149.76 billion VND/year.'], finalAnswer: '149.76 billion VND/year of premium-packaging retail spending.', answerUnit: 'VND per year', interpretation: 'No second packaging piece or wholesale margin is assumed.', reasonablenessCheck: 'Every restaurant and every order at retail price would be 768 billion VND; applying both filters reduces this to 19.5% of that shortcut.', assessment: 'Both restaurant eligibility and qualifying-order filters are material.', weakAnswerFeedback: '768 billion VND merits about 2/10: it recognizes period and price but omits both required filters.', alternatives: ['Working backward from qualifying units is valid when the one-unit rule remains explicit.'], numericAnswer: 149.76, numericTolerance: 0.2,
  }),
  provided({
    sourceCaseId: 'CM-MS-A09', code: 'A09', difficulty: 'medium', title: 'Online OTC Pharmacy Orders', industry: 'Healthcare & E-commerce', original: true,
    brief: 'A launch city has 8 million adults. Thirty-five percent buy an OTC (over-the-counter, sold without a prescription) medicine in an average month; 20% of those monthly buyers use online pharmacies. Online buyers place 1.5 orders/month at an average VND 180,000 basket for 12 months. Treat the buyer groups as nested.',
    task: 'Estimate the annual transaction value of online OTC pharmacy orders, and state the result with its unit.',
    modelRoute: 'Build the nested buyer funnel, calculate annual orders and transaction value, and state why the 20% is not applied to all adults independently.',
    suppliedFacts: ['8 million adults.', '35% monthly OTC buyers.', '20% of OTC buyers use online pharmacies.', '1.5 orders/month, 12 months.', 'VND 180,000/order.'], formula: 'Adults × monthly OTC-buyer share × online share among OTC buyers × orders/month × 12 × basket value', calculations: ['Monthly OTC buyers = 8 million × 35% = 2.8 million.', 'Online buyers = 2.8 million × 20% = 560,000.', 'Annual orders = 560,000 × 1.5 × 12 = 10.08 million.', 'Transaction value = 10.08 million × VND 180,000 = 1.8144 trillion VND.'], finalAnswer: '1.8144 trillion VND/year of online OTC transaction value.', answerUnit: 'VND per year', interpretation: 'This is gross basket value, not pharmacy gross profit.', reasonablenessCheck: 'Each online buyer spends 3.24 million VND/year; 560,000 × 3.24 million VND = 1.8144 trillion VND.', assessment: 'Credit the nested denominator and the transaction-value label.', weakAnswerFeedback: 'Applying 20% directly to all adults overstates the online buyer pool because online use is conditional on buying OTC medicine.', alternatives: ['A monthly transaction-value route is valid and should reconcile to the annual result.'], numericAnswer: 1.8144, numericTolerance: 0.003,
  }),
  provided({
    sourceCaseId: 'CM-MS-A10', code: 'A10', difficulty: 'hard', title: 'Factory Safety-Glove Replacements', industry: 'Industrial Supplies', original: true,
    brief: 'Light manufacturing: 7,500 factories; 45% are eligible, meaning they meet the target safety standard for glove use (the brief does not give the standard); eligible factories average 120 protected workers (workers who use safety gloves); each worker uses 6 pairs/year at VND 40,000/pair. Heavy manufacturing: 2,500 factories; 70% eligible; 220 protected workers; 10 pairs/year at VND 55,000/pair. Segments do not overlap.',
    task: 'Estimate the annual value of safety-glove replacements across both segments, and state the result with its unit.',
    modelRoute: 'Calculate eligible sites, protected workers, annual pairs and value by segment, then reconcile the total.',
    suppliedFacts: ['Light: 7,500 sites, 45% eligible, 120 workers, 6 pairs/year, VND 40,000/pair.', 'Heavy: 2,500 sites, 70% eligible, 220 workers, 10 pairs/year, VND 55,000/pair.', 'Segments are disjoint.', 'Sites are factories; eligible = meets the target safety standard for glove use (standard not specified); protected workers = workers who use safety gloves.'], formula: 'Σ(segment sites × eligibility × workers/site × pairs/worker/year × segment price)', calculations: ['Light eligible sites = 3,375; workers = 405,000; pairs = 2.43 million; value = 97.2 billion VND.', 'Heavy eligible sites = 1,750; workers = 385,000; pairs = 3.85 million; value = 211.75 billion VND.', 'Total pairs = 6.28 million; total value = 308.95 billion VND/year.'], finalAnswer: '308.95 billion VND/year across 6.28 million replacement pairs.', answerUnit: 'VND per year', interpretation: 'The higher heavy-industry value comes from frequency and price, not a larger worker count.', reasonablenessCheck: 'Segment value per protected worker is VND 240,000 light versus VND 550,000 heavy; applying those to 405,000 and 385,000 workers reproduces the result.', assessment: 'Credit disjoint segmentation, site eligibility, worker conversion, frequency, price, units, and reconciliation.', weakAnswerFeedback: 'A site-count-times-price answer is fundamentally incomplete because sites do not buy one pair each; it misses workers and annual usage.', alternatives: ['Computing annual spend per protected worker first is valid.'], numericAnswer: 308.95, numericTolerance: 0.4,
  }),
  provided({
    sourceCaseId: 'CM-MS-A11', code: 'A11', difficulty: 'expert', title: 'Rooftop Inverter Replacements', industry: 'Renewable Energy', original: true,
    brief: 'Residential: 600,000 installed systems; 92% active; inverters are replaced every 10 years on average; 75% use a genuine replacement at 12 million VND. Commercial: 80,000 installed systems; 95% active; eight-year average life; 85% genuine replacement at 45 million VND. Treat replacement life as an annualized stock-to-flow rate (converting the installed stock into an annual flow of replacements) and segments as disjoint.',
    task: 'Estimate the annual value of genuine inverter replacements across both segments, and state the result with its unit.',
    modelRoute: 'Convert each active installed base into annual genuine replacement flow, value both segments, reconcile the total, and explain the stock-to-flow logic.',
    suppliedFacts: ['Residential: 600,000 systems, 92% active, 10-year life, 75% genuine, 12 million VND.', 'Commercial: 80,000 systems, 95% active, 8-year life, 85% genuine, 45 million VND.', 'Segments are disjoint; use annualized expected flow.'], formula: 'Σ(installed systems × active share ÷ average life × genuine share × segment price)', calculations: ['Residential genuine flow = 600,000 × 92% ÷ 10 × 75% = 41,400 units; value = 496.8 billion VND.', 'Commercial genuine flow = 80,000 × 95% ÷ 8 × 85% = 8,075 units; value = 363.375 billion VND.', 'Total = 49,475 units and 860.175 billion VND/year.'], finalAnswer: '860.175 billion VND/year across 49,475 genuine replacement inverters.', answerUnit: 'VND per year', interpretation: 'Installed systems are a stock; dividing by life converts them to expected annual replacement events.', reasonablenessCheck: 'The commercial segment has fewer units but a much higher price, so it contributes 42.2% of value from 16.3% of replacement units.', assessment: 'A stock-times-price shortcut must score low because it values the installed base as if every inverter were replaced this year.', weakAnswerFeedback: 'Pricing every active inverter in one year is a stock-to-flow error and should receive 0–2/10 even if the multiplication is neat.', alternatives: ['A cohort-age model is valid if it reconciles to a defensible annual flow using only the supplied average-life assumption.'], numericAnswer: 860.175, numericTolerance: 0.9,
  }),
  provided({
    sourceCaseId: 'CM-MS-A12', code: 'A12', difficulty: 'hard', title: 'Cinema Pre-Roll Inventory', industry: 'Media & Entertainment', original: true,
    brief: 'A network has 120 cinemas with 6 screens each. Each screen runs 5 sessions/day for 330 days/year. Forty percent of sessions sell premium pre-roll (advertising shown on screen before the film) inventory. Each sold session offers 3 slots; average paid fill is 70%; each filled slot earns VND 250,000. Unsold slots earn zero.',
    task: 'Estimate annual premium pre-roll revenue for the cinema network, and state the result with its unit.',
    modelRoute: 'Build the screen-to-session-to-sold-inventory funnel, calculate annual filled slots and revenue, and keep the difference between eligible slots and paid fill explicit.',
    suppliedFacts: ['120 cinemas × 6 screens.', '5 sessions/day × 330 days.', '40% of sessions sell premium pre-roll.', '3 slots/sold session.', '70% paid fill.', 'VND 250,000/filled slot.'], formula: 'Cinemas × screens × sessions/day × days × sellable-session share × slots/session × paid fill × price', calculations: ['Screens = 720.', 'Annual sessions = 720 × 5 × 330 = 1.188 million.', 'Sellable sessions = 1.188 million × 40% = 475,200.', 'Available slots = 475,200 × 3 = 1,425,600.', 'Filled slots = 1,425,600 × 70% = 997,920.', 'Revenue = 997,920 × VND 250,000 = 249.48 billion VND.'], finalAnswer: '249.48 billion VND/year from 997,920 filled premium slots.', answerUnit: 'VND per year', interpretation: 'The 70% factor is inventory fill, not audience reach.', reasonablenessCheck: 'At full fill, revenue would be 356.4 billion VND; 70% fill gives 249.48 billion VND.', assessment: 'Credit both conditional filters and the distinction between session, slot, and filled-slot units.', weakAnswerFeedback: 'Multiplying all sessions by price ignores sellable-session share, slots, and fill, so it does not estimate ad inventory correctly.', alternatives: ['A daily network-revenue route is valid if every conversion remains visible.'], numericAnswer: 249.48, numericTolerance: 0.3,
  }),

  ambiguous({
    sourceCaseId: 'CM-MS-B01', code: 'B01', difficulty: 'expert', title: 'Toilet Fixtures in Vietnam', industry: 'Home Improvement',
    brief: 'Estimate annual domestic retail sales of toilet fixtures in Vietnam.',
    illustrativeAssumptions: ['26 million homes × 1.1 fixtures/home.', '18-year average replacement life.', '300,000 new homes × 1.2 fixtures.', '200,000 non-residential units.', '3 million VND blended unit value.'], formula: '(Installed home fixture stock ÷ useful life) + new-home installations + non-residential units; multiply total annual units by blended price', calculations: ['Replacement = 26 million × 1.1 ÷ 18 = 1.589 million units.', 'New homes = 300,000 × 1.2 = 0.36 million units.', 'Total volume = 1.589 million + 0.36 million + 0.20 million = 2.149 million units.', 'Value = 2.149 million × 3 million VND = 6.447 trillion VND.'], finalAnswer: 'Illustrative base estimate: 6.447 trillion VND/year.', answerUnit: 'VND per year', interpretation: 'Scope includes new domestic fixtures and excludes paper, installation, exports, and resale.', assessment: 'Grade scope, stock-to-flow logic, segment separation, assumption rationale, and calculation logic; not proximity to 6.447 trillion VND.', weakAnswerFeedback: '26 million homes × 3 million VND = 78 trillion VND is around 1/10: it values the installed stock, not an annual purchase flow.', alternatives: ['A population-to-households route is valid if it avoids double counting and produces a defensible annual replacement flow.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B02', code: 'B02', difficulty: 'hard', title: 'Umbrellas in Hanoi', industry: 'Consumer Goods',
    brief: 'Estimate the annual retail value of umbrellas sold in Hanoi.', illustrativeAssumptions: ['8 million residents.', '70% regular umbrella ownership.', 'Three-year replacement cycle.', '0.4 million visitor purchases not already counted.', 'VND 100,000 blended price.'], formula: '(Residents × ownership ÷ replacement life + non-overlapping visitor purchases) × price', calculations: ['Resident annual units = 8 million × 70% ÷ 3 = 1.867 million.', 'Total units = 1.867 million + 0.4 million = 2.267 million.', 'Value = 2.267 million × VND 100,000 = 226.7 billion VND.'], finalAnswer: 'Illustrative base estimate: 226.7 billion VND/year.', answerUnit: 'VND per year', interpretation: 'Scope includes new umbrellas bought in Hanoi by residents and visitors.', assessment: 'Owners are a stock, not annual buyers. Visitor purchases must be mutually exclusive.', weakAnswerFeedback: 'Owner count × price without annualization is about 2/10 because it confuses stock with flow.', alternatives: ['A bottom-up retail-store route is credible if the scope is stated and customers are counted once.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B03', code: 'B03', difficulty: 'medium', title: 'Cafe Inventory Software in Vietnam', industry: 'Technology & SaaS',
    brief: 'Estimate annual subscription spending on inventory software among independent cafes in Vietnam.', illustrativeAssumptions: ['200,000 independent cafes.', '50% have suitable devices/workflows.', '20% of eligible cafes pay.', 'VND 300,000/month.'], formula: 'Cafe base × workflow eligibility × paid uptake among eligible cafes × monthly price × 12', calculations: ['Eligible cafes = 200,000 × 50% = 100,000.', 'Subscribers = 100,000 × 20% = 20,000.', 'Value = 20,000 × VND 300,000 × 12 = 72 billion VND.'], finalAnswer: 'Illustrative base estimate: 72 billion VND/year.', answerUnit: 'VND per year', interpretation: 'Scope is recurring subscription fees for independent cafes, excluding setup and chains.', assessment: 'Eligibility and willingness to pay are separate behavioral filters.', weakAnswerFeedback: 'All cafes × price = 720 billion VND can be 1/10 because it assumes every cafe is eligible and paying.', alternatives: ['A province-by-province cafe build is valid if eligible and paying subsets are explicit.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B04', code: 'B04', difficulty: 'medium', title: 'Public E-Motorbike Charging in HCMC', industry: 'Mobility & Energy',
    brief: 'Estimate annual rider spending on public e-motorbike charging sessions in Ho Chi Minh City. Count charging revenue, not vehicle sales.', illustrativeAssumptions: ['300,000 active e-motorbikes.', '40% rely on paid public charging.', '10 sessions/month.', 'VND 15,000/session.'], formula: 'Active e-motorbikes × public-charging share × sessions/month × 12 × fee/session', calculations: ['Public-charging riders = 300,000 × 40% = 120,000.', 'Monthly sessions = 1.2 million; annual sessions = 14.4 million.', 'Value = 14.4 million × VND 15,000 = 216 billion VND.'], finalAnswer: 'Illustrative base estimate: 216 billion VND/year.', answerUnit: 'VND per year', interpretation: 'The public share excludes riders charging at home or elsewhere.', assessment: 'Public share and usage frequency are distinct drivers.', weakAnswerFeedback: 'Bikes × fee with no public share or frequency deserves 0–2/10.', alternatives: ['A kWh-based (kilowatt-hour) model is valid if energy units and paid-public scope reconcile.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B05', code: 'B05', difficulty: 'medium', title: 'Office Meal-Prep Delivery in HCMC', industry: 'Food Delivery',
    brief: 'Estimate annual retail spending on planned meal-prep deliveries to office workers in Ho Chi Minh City. Exclude ordinary dine-in lunches.', illustrativeAssumptions: ['2 million office workers.', '20% use planned meal-prep delivery.', 'Two meals/week.', '46 working weeks.', 'VND 60,000/meal.'], formula: 'Office workers × service adoption × meals/week × working weeks × price', calculations: ['Users = 2 million × 20% = 400,000.', 'Meals = 400,000 × 2 × 46 = 36.8 million.', 'Value = 36.8 million × VND 60,000 = 2.208 trillion VND.'], finalAnswer: 'Illustrative base estimate: 2.208 trillion VND/year.', answerUnit: 'VND per year', interpretation: 'Scope excludes dine-in, canteens, and unplanned deliveries.', assessment: 'Adoption and order frequency reflect different behaviors.', weakAnswerFeedback: 'Five weekday lunches for every worker is around 1/10 because it changes the product and bypasses adoption.', alternatives: ['A district build is valid if workers and meals are not duplicated.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B06', code: 'B06', difficulty: 'hard', title: 'Warehouse Automation Purchases', industry: 'Industrial Technology',
    brief: 'Estimate annual spending on new warehouse-automation systems by warehouses in Vietnam.', illustrativeAssumptions: ['5,000 warehouses.', '20% large enough for automation.', '10% of eligible sites buy in a given year.', '2 billion VND average contract.'], formula: 'Warehouse stock × scale eligibility × annual buying rate × average contract value', calculations: ['Eligible sites = 5,000 × 20% = 1,000.', 'Annual contracts = 1,000 × 10% = 100.', 'Value = 100 × 2 billion VND = 200 billion VND.'], finalAnswer: 'Illustrative base estimate: 200 billion VND/year.', answerUnit: 'VND per year', interpretation: 'Scope is new equipment contracts and excludes maintenance.', assessment: 'The annual buying rate converts addressable site stock into annual demand.', weakAnswerFeedback: 'Every warehouse × contract value is about 1/10 because it omits both eligibility and timing.', alternatives: ['A vendor-installation build is an alternative route, but credit it only if it estimates annual demand rather than vendor capacity.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B07', code: 'B07', difficulty: 'hard', title: 'Phone-Screen Repair in HCMC', industry: 'Consumer Services',
    brief: 'Estimate annual consumer spending on professional smartphone-screen repairs in Ho Chi Minh City. Exclude do-it-yourself fixes and new phones.', illustrativeAssumptions: ['8 million active smartphone users.', '12% annual screen-break incidence.', '60% of breaks receive a professional paid repair.', 'VND 500,000 average bill.'], formula: 'Active users × annual breakage incidence × paid professional-repair share × average bill', calculations: ['Breaks = 8 million × 12% = 960,000.', 'Paid repairs = 960,000 × 60% = 576,000.', 'Value = 576,000 × VND 500,000 = 288 billion VND.'], finalAnswer: 'Illustrative base estimate: 288 billion VND/year.', answerUnit: 'VND per year', interpretation: 'DIY fixes and new phones are excluded; not every break becomes a paid repair.', assessment: 'Incidence creates annual events; repair share converts events to paid demand.', weakAnswerFeedback: 'User stock × bill is around 1/10 because it prices every owner as a repair customer.', alternatives: ['A repair-shop-bottom-up route is valid if it covers only professional screen jobs and city customers.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B08', code: 'B08', difficulty: 'easy', title: 'Event Water-Refill Kiosks', industry: 'Events & Services',
    brief: 'Estimate annual revenue for paid water-refill kiosks at large events in Vietnam.', illustrativeAssumptions: ['10 million attendee-visits/year.', '15% of visits use a kiosk.', 'Two refills per using visit.', 'VND 10,000/refill.'], formula: 'Attendee-visits × paid-use share × refills/using visit × price/refill', calculations: ['Using visits = 10 million × 15% = 1.5 million.', 'Paid refills = 1.5 million × 2 = 3 million.', 'Revenue = 3 million × VND 10,000 = 30 billion VND.'], finalAnswer: 'Illustrative base estimate: 30 billion VND/year.', answerUnit: 'VND per year', interpretation: 'Attendee-visits already contain repeat event occasions; do not multiply by visits/person again.', assessment: 'Adoption and refill frequency are separate; the base unit must be clear.', weakAnswerFeedback: 'Attendee-visits × price with no use share or frequency is about 1/10.', alternatives: ['An event-by-event build is valid if visits are summed once.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B09', code: 'B09', difficulty: 'hard', title: 'E-Motorbike Battery Replacements', industry: 'Mobility & Energy', original: true,
    brief: 'Estimate annual consumer spending on replacement traction batteries (the main battery pack that powers the motor) for active e-motorbikes in Vietnam. Exclude batteries bundled with new vehicles and battery-swap service fees.', illustrativeAssumptions: ['4 million active e-motorbikes.', 'Four-year average battery life.', '70% of end-of-life events become owner-paid battery replacements.', '9 million VND blended battery price.'], formula: 'Active e-motorbike stock ÷ battery life × owner-paid replacement share × blended price', calculations: ['Annual end-of-life events = 4 million ÷ 4 = 1 million.', 'Owner-paid replacements = 1 million × 70% = 700,000.', 'Value = 700,000 × 9 million VND = 6.3 trillion VND.'], finalAnswer: 'Illustrative base estimate: 6.3 trillion VND/year.', answerUnit: 'VND per year', interpretation: 'The estimate is replacement battery retail spending, not new-vehicle battery value or swap fees.', assessment: 'A stock-times-price answer should score 0–2 because it ignores replacement timing.', weakAnswerFeedback: '4 million vehicles × 9 million VND values the entire installed stock at 36 trillion VND rather than annual replacement flow.', alternatives: ['A vehicle-cohort survival model is valid if assumptions are explicit and it avoids counting bundled new-vehicle batteries.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B10', code: 'B10', difficulty: 'medium', title: 'Paid IELTS Coaching in Hanoi', industry: 'Education', original: true,
    brief: 'Estimate annual spending on paid live IELTS coaching in Hanoi. Exclude self-study apps, books, and exam fees.', illustrativeAssumptions: ['150,000 serious candidates/year.', '35% buy live coaching.', '12 paid sessions/buyer.', 'VND 400,000/session.'], formula: 'Serious candidates × live-coaching adoption × sessions/buyer × price/session', calculations: ['Paid learners = 150,000 × 35% = 52,500.', 'Paid sessions = 52,500 × 12 = 630,000.', 'Value = 630,000 × VND 400,000 = 252 billion VND.'], finalAnswer: 'Illustrative base estimate: 252 billion VND/year.', answerUnit: 'VND per year', interpretation: 'The scope excludes exam fees, books, asynchronous apps, and casual learners.', assessment: 'Grade whether the candidate separates candidate stock, paid adoption, session frequency, and price.', weakAnswerFeedback: 'All candidates × one session price misses both adoption and course intensity and should score low.', alternatives: ['A coaching-center-capacity build is a valid alternative route if tutor hours and learner overlap are handled.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B11', code: 'B11', difficulty: 'medium', title: 'Rooftop Solar Cleaning Services', industry: 'Renewable Energy', original: true,
    brief: 'Estimate annual spending on professional cleaning and inspection visits for rooftop-solar systems in Vietnam. Exclude repair parts and utility-scale solar farms.', illustrativeAssumptions: ['500,000 active rooftop systems.', '55% use professional service.', 'Two paid visits/year.', 'VND 700,000/visit.'], formula: 'Active rooftop systems × professional-service adoption × visits/year × fee/visit', calculations: ['Professional-service systems = 500,000 × 55% = 275,000.', 'Annual visits = 275,000 × 2 = 550,000.', 'Value = 550,000 × VND 700,000 = 385 billion VND.'], finalAnswer: 'Illustrative base estimate: 385 billion VND/year.', answerUnit: 'VND per year', interpretation: 'This is service spending only; parts and utility-scale sites are excluded.', assessment: 'Professional adoption and visit frequency must not be collapsed into one unexplained percentage.', weakAnswerFeedback: 'Pricing every installed system as a professional customer twice a year overstates the market by omitting DIY or no-service systems.', alternatives: ['A provider-revenue build is a valid alternative route if repeat visits and subcontractors are not double counted.'],
  }),
  ambiguous({
    sourceCaseId: 'CM-MS-B12', code: 'B12', difficulty: 'hard', title: 'Reusable-Cup Services at Office Parks', industry: 'Workplace Services', original: true,
    brief: 'Estimate annual service revenue from reusable-cup systems at large office parks in Vietnam. Count paid cup uses, not cups in circulation or all office drinks.', illustrativeAssumptions: ['1.2 million workers at large office parks.', '30% work at participating parks.', '25% of workers at participating parks are active users.', 'Three paid uses/week for 46 working weeks.', 'VND 4,000 service fee/use.'], formula: 'Office workers × participating-park share × active-user share × uses/week × working weeks × fee/use', calculations: ['Workers at participating parks = 1.2 million × 30% = 360,000.', 'Active users = 360,000 × 25% = 90,000.', 'Annual uses = 90,000 × 3 × 46 = 12.42 million.', 'Revenue = 12.42 million × VND 4,000 = 49.68 billion VND.'], finalAnswer: 'Illustrative base estimate: 49.68 billion VND/year.', answerUnit: 'VND per year', interpretation: 'The market is paid service uses, not the replacement value of the cup stock.', assessment: 'The formula must keep participating parks, active users, use frequency, and working period distinct.', weakAnswerFeedback: 'All office workers × fee counts one use each and ignores whether the park participates, whether the worker adopts, and how often they use it.', alternatives: ['A park-by-park throughput model is valid if worker visits are not counted again.'],
  }),
];

const PROVIDED_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Supplied components', points: 30, description: 'Uses the supplied facts as correctly labelled model components without inventing replacements.' },
  { criterion: 'Bottom-up model', points: 35, description: 'Combines the components into a complete, non-overlapping and mathematically valid formula.' },
  { criterion: 'Calculated result and units', points: 35, description: 'Calculates accurately, annualizes the correct period, and states the result in the requested unit.' },
];

const AMBIGUOUS_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Bottom-up components', points: 40, description: 'Chooses material, mutually exclusive determinants and assigns sensible values.' },
  { criterion: 'Bottom-up model logic', points: 35, description: 'Combines the components coherently and converts stocks to annual flows where required.' },
  { criterion: 'Calculated result and units', points: 25, description: 'Carries the entered component values through a coherent calculation with units.' },
];

export function marketSizingCaseToQuestion(item: MarketSizingSourceCase): LibraryQuestion {
  const isAmbiguous = item.format === 'ambiguous-estimation';
  const providedFactsBlock = `SUPPLIED CASE FACTS\n${item.suppliedFacts.map((line) => `• ${line}`).join('\n')}\n\nILLUSTRATIVE ASSUMPTIONS\nNone. Do not replace supplied facts with invented values.`;
  const correctAnswer = [
    `FORMAT: ${MARKET_SIZING_FORMAT_LABELS[item.format]}`,
    isAmbiguous ? '' : providedFactsBlock,
    `BOTTOM-UP COMPONENT MODEL\n${item.formula}`,
    `CALCULATED RESULT\n${item.finalAnswer}`,
  ].filter(Boolean).join('\n\n');
  // numericAnswer is stated in the scale of finalAnswer ("162 billion VND/year"), so the answer field carries that scale.
  const scaleWord = /\btrillion\b/i.test(item.finalAnswer) ? 'trillion' : /\bbillion\b/i.test(item.finalAnswer) ? 'billion' : /\bmillion\b/i.test(item.finalAnswer) ? 'million' : '';
  const answerUnit = scaleWord && /^VND\b/.test(item.answerUnit) ? item.answerUnit.replace(/^VND\b/, `${scaleWord} VND`) : item.answerUnit;
  const canonicalNumericAnswer = item.numericAnswer;
  const canonicalNumericTolerance = item.numericTolerance;
  const roundingRule = canonicalNumericTolerance == null
    ? undefined
    : toleranceRuleText(canonicalNumericTolerance, answerUnit, canonicalNumericTolerance === 0);
  return {
    id: `market-sizing-cycle3-${item.code.toLowerCase()}`,
    sourceCaseId: item.sourceCaseId,
    contentVersion: 'market-sizing-cycle-3-v1',
    skill: 'market-sizing',
    difficulty: item.difficulty,
    title: `${item.code} · ${item.title}`,
    businessContext: isAmbiguous ? item.brief : `${MARKET_SIZING_FORMAT_LABELS[item.format]} format. ${item.brief}\n\n${providedFactsBlock}`,
    question: `YOUR TASK\n${item.task}`,
    instruction: item.format === 'provided-data'
      ? 'Use only the supplied case facts. Turn each determinant into a labelled Component, then build the bottom-up model and result.'
      : 'Break the market into determinants, add the ones you need as Components, assign values, and build the bottom-up model and result.',
    correctAnswer,
    explanation: [
      item.modelRoute ? `Model decomposition (one valid route; your own issue tree is not graded): ${item.modelRoute}` : '',
      item.assessment,
      `Highest-impact weak-answer correction: ${item.weakAnswerFeedback}`,
    ].filter(Boolean).join('\n\n'),
    answerMode: item.format === 'provided-data' ? 'number' : 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    calculationRequired: true,
    estimatedMinutes: item.difficulty === 'easy' ? 7 : item.difficulty === 'medium' ? 9 : item.difficulty === 'hard' ? 12 : 15,
    status: 'published',
    reviewStatus: 'Published',
    calibrationStatus: item.difficulty === 'easy' || item.difficulty === 'medium' ? 'already-at-target-v1' : undefined,
    industry: item.industry,
    businessProblem: 'Market opportunity',
    drillType: MARKET_SIZING_FORMAT_LABELS[item.format],
    primarySkill: item.format === 'provided-data' ? 'Building a checkable sizing funnel from supplied inputs' : 'Defining and defending a driver-based estimate',
    workingPrompt: 'Issue tree (not graded) → Components → bottom-up model → calculated result.',
    calculationLogic: item.formula,
    stepByStepSolution: undefined,
    keyInsight: item.interpretation,
    commonMistake: item.weakAnswerFeedback,
    weakAnswerFeedback: item.weakAnswerFeedback,
    learningObjective: item.assessment,
    scoringRubric: item.format === 'provided-data' ? PROVIDED_RUBRIC : AMBIGUOUS_RUBRIC,
    alternativeConclusions: item.alternatives,
    numericAnswer: canonicalNumericAnswer,
    numericTolerance: canonicalNumericTolerance,
    roundingRule,
    answerUnit,
    exhibits: [],
    marketSizingFormat: item.format,
    marketSizingRubricVersion: item.format === 'provided-data' ? 'market-sizing-provided-v2-components' : 'market-sizing-ambiguous-v3-components',
    marketSizingSuppliedFacts: item.suppliedFacts,
    marketSizingIllustrativeAssumptions: item.illustrativeAssumptions,
    marketSizingReasonablenessCheck: isAmbiguous ? undefined : item.reasonablenessCheck,
    marketSizingOriginal: Boolean(item.original),
  } as LibraryQuestion;
}

export const MARKET_SIZING_CYCLE_3_QUESTIONS: LibraryQuestion[] = MARKET_SIZING_CYCLE_3_CASES.map(marketSizingCaseToQuestion);

const RETAINED_TEXT_ONLY_IDS = new Set(['market-sizing-hard-insight-401', 'market-sizing-expert-201']);

export function migrateLegacyMarketSizingQuestions(questions: LibraryQuestion[]): LibraryQuestion[] {
  return questions.map((question) => {
    if (RETAINED_TEXT_ONLY_IDS.has(question.id)) {
      const isFreshFleet = question.id === 'market-sizing-hard-insight-401';
      const suppliedFacts = isFreshFleet
        ? ['12,000 independent food retailers across the three launch cities.', '40% of retailers require cold-chain (refrigerated) delivery, which makes them eligible demand; 25% of those retailers are likely to outsource it, and they are the serviceable customers.', '120 million VND expected annual spend per serviceable customer.', 'Year-one capacity (customers the available trucks can serve): HCMC 180, Hanoi 120, Da Nang 60.']
        : ['60,000 independent food retail outlets.', '30 million VND annual service spend per outlet.', '60% of outlets are located in the launch cities (within EcoCool’s service radius and sales coverage); 70% have installed equipment that can be upgraded without replacement.', 'Demand benchmark: a new entrant attains 3% of SAM (the serviceable market: outlets in the launch cities with upgradable equipment) in year one.', 'Capacity: 8 teams × 4 installs/month × 12 months.'];
      return {
        ...question,
        sourceCaseId: isFreshFleet ? 'LEGACY-MS-FRESHFLEET' : 'LEGACY-MS-ECOCOOL',
        contentVersion: 'market-sizing-cycle-3-retained-v1',
        marketSizingFormat: 'provided-data',
        marketSizingRubricVersion: 'market-sizing-provided-v2-components',
        marketSizingSuppliedFacts: suppliedFacts,
        marketSizingIllustrativeAssumptions: [],
        businessContext: `${question.businessContext || ''}\n\nSUPPLIED CASE FACTS\n${suppliedFacts.map((line) => `• ${line}`).join('\n')}\n\nILLUSTRATIVE ASSUMPTIONS\nNone.`,
        instruction: 'Use only the supplied facts in the brief. Turn each determinant into a labelled Component, build the bottom-up model, and state the result in VND.',
        exhibits: [],
        exhibit: undefined,
        reviewStatus: 'Published',
        status: 'published',
      } as LibraryQuestion;
    }
    if (question.difficulty === 'hard' || question.difficulty === 'expert') {
      return {
        ...question,
        reviewStatus: 'Archived',
        retiredVersion: 'market-sizing-cycle-3-v1',
        retirementReason: 'Archived from the active selector because the legacy difficulty depended on synthetic charts or generic exhibit synthesis. Stable IDs and saved progress remain readable.',
      };
    }
    return {
      ...question,
      contentVersion: question.contentVersion || 'market-sizing-legacy-aligned-v1',
      marketSizingFormat: 'provided-data',
      marketSizingRubricVersion: 'market-sizing-provided-v2-components',
      marketSizingSuppliedFacts: [question.question],
      marketSizingIllustrativeAssumptions: [],
    } as LibraryQuestion;
  });
}

export function validateMarketSizingCycle3(): string[] {
  const errors: string[] = [];
  const providedCases = MARKET_SIZING_CYCLE_3_CASES.filter((item) => item.format === 'provided-data');
  const ambiguousCases = MARKET_SIZING_CYCLE_3_CASES.filter((item) => item.format === 'ambiguous-estimation');
  if (providedCases.length !== 12) errors.push(`Expected 12 Provided Data cases; found ${providedCases.length}.`);
  if (ambiguousCases.length !== 12) errors.push(`Expected 12 Ambiguous Estimation cases; found ${ambiguousCases.length}.`);
  if (providedCases.filter((item) => item.original).length < 4) errors.push('Provided Data needs at least four original cases.');
  if (ambiguousCases.filter((item) => item.original).length < 4) errors.push('Ambiguous Estimation needs at least four original cases.');
  const ids = new Set(MARKET_SIZING_CYCLE_3_CASES.map((item) => item.sourceCaseId));
  if (ids.size !== MARKET_SIZING_CYCLE_3_CASES.length) errors.push('Market Sizing source IDs must be unique.');
  MARKET_SIZING_CYCLE_3_CASES.forEach((item) => {
    if (!item.brief || !item.task || !item.formula || !item.calculations.length || !item.finalAnswer || !item.assessment || !item.weakAnswerFeedback) errors.push(`${item.sourceCaseId} is missing required source content.`);
    if (item.format === 'provided-data' && (!item.suppliedFacts.length || item.illustrativeAssumptions.length || item.numericAnswer == null || item.numericTolerance == null)) errors.push(`${item.sourceCaseId} does not satisfy Provided Data invariants.`);
    if (item.format === 'ambiguous-estimation' && (!item.illustrativeAssumptions.length || item.numericAnswer != null || item.suppliedFacts.length)) errors.push(`${item.sourceCaseId} does not satisfy Ambiguous Estimation invariants.`);
    if (item.format === 'ambiguous-estimation' && /supplied|illustrative|assumption|no market figures|\d/i.test(item.brief)) errors.push(`${item.sourceCaseId} brief must contain only the task and scope.`);
  });
  MARKET_SIZING_CYCLE_3_QUESTIONS.forEach((question) => {
    if ((question.exhibits || []).length || question.exhibit) errors.push(`${question.id} must not depend on a chart.`);
    if (question.marketSizingFormat === 'provided-data' && !question.roundingRule?.trim()) errors.push(`${question.id} is missing its rounding/tolerance rule.`);
    if (question.marketSizingFormat === 'ambiguous-estimation') {
      const learnerText = [question.businessContext, question.question, question.instruction, question.workingPrompt, question.correctAnswer, question.explanation, question.commonMistake, question.learningObjective, question.weakAnswerFeedback, ...(question.alternativeConclusions || []), ...(question.scoringRubric || []).map((item) => `${item.criterion} ${item.description}`)].join(' ');
      if (/sensitiv|independent check|cross-check|reasonableness/i.test(learnerText)) errors.push(`${question.id} must not ask for or score sensitivity or an independent check.`);
      if (/supplied case facts|no market figures/i.test(question.businessContext || '')) errors.push(`${question.id} pre-submit brief must not include a supplied-facts block.`);
    }
  });
  blockingUnitShorthand(MARKET_SIZING_CYCLE_3_CASES.map((item) => ({ id: item.sourceCaseId, record: item }))).forEach((problem) => errors.push(problem));
  return errors;
}
