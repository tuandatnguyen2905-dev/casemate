/**
 * Casemate case-type catalog + industry/function-to-case-type relevance map.
 *
 * THE single source of truth for which case types exist and which of them
 * matter for each industry/function a candidate can match to in the fit
 * assessment. It is consumed by BOTH customer surfaces so they always agree:
 *
 *   - apps/CaseDrillLog/App.tsx — filters and orders the Case Pool menu by
 *     the candidate's saved industry/function fit (closest match first), and
 *     passes the relevant set to the engine so "Mix it up" rotates within it.
 *   - components/AgentChatView.tsx — the per-program "How to get there"
 *     guide picks its "case types to drill for this program" from the same
 *     mapping (matched against the program's own industry/context).
 *
 * The type ids MUST mirror CASE_TYPES in serverFunctions.ts — the drill
 * engine is what actually generates a case for an id.
 *
 * Mapping logic (mirrors the founder brief "Case Drill diversification by
 * industry/function"):
 *   - Banking & Financial Services (VPBank, Techcombank, UOB): financial
 *     analysis, credit assessment, M&A/valuation, product profitability,
 *     market entry, sizing.
 *   - Big 4 / Professional Services (Deloitte, EY): financial analysis, due
 *     diligence / audit-adjacent review, M&A, cost reduction, sizing.
 *   - FMCG / Consumer (Unilever, L'Oréal, Nestlé, P&G, Suntory, Carlsberg,
 *     AB InBev): product launch, market entry, pricing, distribution/channel,
 *     profitability, sizing.
 *   - E-commerce / Tech / Fintech (Shopee, MoMo, Home Credit): growth, unit
 *     economics, product launch, digital sizing, competitive response.
 *   - Logistics / Supply Chain (Maersk, Expeditors): operations & cost
 *     optimization, profitability, capacity sizing, growth.
 *   - Retail (Central Retail): store expansion (entry), pricing,
 *     category/store profitability, competitive response.
 *   - Telecom / Tech (Viettel): entry, growth, operations, product launch.
 *   - Insurance (Manulife, Prudential): product profitability, distribution,
 *     financial/risk analysis, entry.
 *   - Proptech / Real Estate (Savills, PropertyGuru): sizing, transaction
 *     analysis, investment thesis (M&A logic), entry.
 *   - Healthcare / Pharma (Abbott): entry, pricing, distribution, sizing.
 *
 * Filtering is a DEFAULT VIEW, never a hard lock — every type stays reachable
 * behind "Show all case types" in the drill app.
 */

export interface CaseTypeOption {
  id: string;
  label: string;
  hint: string;
}

// Full catalog of generatable case types (mirrors CASE_TYPES in
// serverFunctions.ts — keep the two lists in sync).
export const CASE_TYPE_CATALOG: CaseTypeOption[] = [
  { id: 'market_entry', label: 'Market Entry', hint: 'Should the client enter a new market — and how?' },
  { id: 'profitability', label: 'Profitability', hint: 'Diagnose why profits are falling and fix it' },
  { id: 'market_sizing', label: 'Market Sizing', hint: 'Estimate a market from explicit assumptions' },
  { id: 'growth_strategy', label: 'Growth Strategy', hint: 'Structure and prioritize the growth levers' },
  { id: 'mna', label: 'M&A', hint: 'Should the client acquire the target — at that price?' },
  { id: 'pricing', label: 'Pricing', hint: 'Land a specific price with cost, competitor, and value anchors' },
  { id: 'competitive_response', label: 'Competitive Response', hint: 'Answer an aggressive competitor move' },
  { id: 'product_launch', label: 'Product Launch', hint: 'Design a new product launch — positioning, go-to-market, launch economics' },
  { id: 'financial_analysis', label: 'Financial Analysis', hint: 'Read a P&L and balance sheet, then advise the decision — banking & Big 4 staple' },
  { id: 'credit_assessment', label: 'Credit Assessment', hint: 'Should the bank lend? Judge repayment capacity from the numbers' },
  { id: 'due_diligence', label: 'Due Diligence', hint: 'Verify a target\u2019s numbers and find the red flags — Big 4 deal work' },
  { id: 'operations_optimization', label: 'Operations & Cost', hint: 'Find the bottleneck or cost driver and fix it — logistics & supply chain staple' },
  { id: 'unit_economics', label: 'Unit Economics', hint: 'Do the per-order numbers work? E-commerce & fintech staple' },
  { id: 'distribution_strategy', label: 'Distribution & Channels', hint: 'Design the route to market — FMCG & insurance staple' },
];

// Default menu for candidates WITHOUT a completed fit assessment: the classic
// general business/consulting mix (the specialist finance/ops types stay
// available behind "Show all case types").
export const GENERAL_CASE_TYPE_IDS: string[] = [
  'market_entry',
  'profitability',
  'market_sizing',
  'growth_strategy',
  'mna',
  'pricing',
  'competitive_response',
  'product_launch',
];

export interface CaseTypeRec {
  id: string;
  why: string;
}

export interface FitCaseRule {
  id: string;
  label: string;
  // Tested against a candidate's industry_fit/function_fit NAME (drill app)
  // or a program's company + program + industry + verified-functions context
  // string (program guide). Rules are evaluated IN ORDER — first match wins —
  // so more specific rules must come before broader ones.
  match: RegExp;
  // Ordered by relevance: index 0 is the type this industry/function tests
  // hardest. Each carries a one-line WHY so recommendations never read
  // arbitrary.
  caseTypes: CaseTypeRec[];
}

// ---- Industry → case types --------------------------------------------------
// Rule order matters (first match wins): specialist industries are listed
// before broad catch-alls (e.g. healthcare before FMCG so Abbott's
// "Healthcare / Nutrition" never falls into the consumer-goods bucket, and
// proptech/telecom before the generic tech rule).
export const INDUSTRY_CASE_TYPE_RULES: FitCaseRule[] = [
  {
    id: 'big4_consulting',
    label: 'Big 4 / Professional Services / Consulting',
    match: /consult|big ?4|professional services|audit|tax|deloitte|kpmg|\bey\b|pwc|mckinsey|bcg|bain|accenture/i,
    caseTypes: [
      { id: 'financial_analysis', why: 'Big 4 and advisory work lives in the financial statements — reading a P&L and balance sheet fast is the core screen.' },
      { id: 'due_diligence', why: 'Deal and audit-adjacent reviews are the day job — diligence cases test exactly the red-flag hunting EY and Deloitte hire for.' },
      { id: 'mna', why: 'Transaction advisory runs on value-vs-price judgment — M&A cases mirror it directly.' },
      { id: 'operations_optimization', why: 'Cost-reduction engagements are advisory bread and butter — cost cases show you can find and size the savings.' },
      { id: 'market_sizing', why: 'Structured estimation is the standard consulting and Big-4 screen for logical thinking.' },
      { id: 'profitability', why: 'Profit diagnosis underpins almost every advisory engagement.' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    match: /insur|manulife|prudential|bao ?viet/i,
    caseTypes: [
      { id: 'profitability', why: 'Insurance interviews test product profitability — whether a product line still makes money once claims and costs are in.' },
      { id: 'distribution_strategy', why: 'Distribution is the insurance battleground — agents vs bancassurance vs digital is a live strategic question.' },
      { id: 'financial_analysis', why: 'Risk and reserve judgment starts with reading the financials — statement literacy is the insurer screen.' },
      { id: 'market_entry', why: 'Insurers keep expanding into new segments and provinces — entry logic mirrors those decisions.' },
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics / Supply Chain',
    match: /logisti|freight|forward|shipping|maersk|expeditors|dhl|3pl/i,
    caseTypes: [
      { id: 'operations_optimization', why: 'Operations IS the product in logistics — bottleneck and cost-per-shipment cases mirror the daily work.' },
      { id: 'profitability', why: 'Thin freight margins make cost-driver diagnosis the most-tested logistics case.' },
      { id: 'market_sizing', why: 'Capacity and demand sizing with explicit assumptions is the planner\u2019s everyday math.' },
      { id: 'growth_strategy', why: 'Lane, service, and customer expansion questions test how you prioritize growth in a network business.' },
    ],
  },
  {
    id: 'retail',
    label: 'Retail',
    match: /retail|store|supermarket|convenien|department/i,
    caseTypes: [
      { id: 'market_entry', why: 'Store-expansion decisions — which city, which format — are retail\u2019s signature case.' },
      { id: 'pricing', why: 'Price and promo strategy drives retail economics — pricing cases mirror category-management decisions.' },
      { id: 'profitability', why: 'Category and store P&L diagnosis is the core retail management skill.' },
      { id: 'competitive_response', why: 'Retail lives under constant price attack — response cases mirror its real decisions.' },
    ],
  },
  {
    id: 'proptech_real_estate',
    label: 'Proptech / Real Estate',
    match: /prop ?tech|real estate|property|savills|propertyguru/i,
    caseTypes: [
      { id: 'market_sizing', why: 'Real-estate work starts by sizing a market or project from explicit assumptions.' },
      { id: 'financial_analysis', why: 'Transaction and investment analysis is the daily bread — statement and yield literacy gets tested.' },
      { id: 'mna', why: 'Investment-thesis questions follow deal logic — value vs price with the risks named.' },
      { id: 'market_entry', why: 'New-city and new-segment launch decisions mirror entry-case logic.' },
    ],
  },
  {
    id: 'healthcare_pharma',
    label: 'Healthcare / Pharma',
    match: /health|pharma|nutrition|diagnostic|hospital|medic|abbott/i,
    caseTypes: [
      { id: 'market_entry', why: 'Healthcare growth in Vietnam is entry-shaped — new categories, provinces, and channels.' },
      { id: 'pricing', why: 'Pricing under affordability and regulation pressure is the healthcare twist interviewers probe.' },
      { id: 'distribution_strategy', why: 'Hospital, pharmacy, and modern-trade channel design decides who wins — channel cases mirror it.' },
      { id: 'market_sizing', why: 'Patient-population sizing from assumptions is the standard healthcare estimation.' },
    ],
  },
  {
    id: 'telecom',
    label: 'Telecom',
    match: /telecom|viettel|mobifone|vinaphone|vnpt/i,
    caseTypes: [
      { id: 'market_entry', why: 'Telecom players keep entering adjacent markets and services — entry logic mirrors those bets.' },
      { id: 'growth_strategy', why: 'Saturated core markets make growth-lever prioritization the standing telecom question.' },
      { id: 'operations_optimization', why: 'Network and process efficiency drives telecom margins — operations cases mirror it.' },
      { id: 'product_launch', why: 'New digital services and plans launch constantly — launch economics get tested.' },
    ],
  },
  {
    id: 'fmcg_consumer',
    label: 'FMCG / Consumer Goods',
    match: /fmcg|consumer goods|consumer brands|food|beverage|brew|dairy|cosmetic|beauty|unilever|nestl|suntory|pepsi|oreal|carlsberg|heineken|coca|masan|vinamilk|p&g|procter/i,
    caseTypes: [
      { id: 'product_launch', why: 'FMCG assessment rounds love launch scenarios — positioning, go-to-market, and launch economics are the trainee job.' },
      { id: 'market_entry', why: 'New categories and provinces are FMCG\u2019s growth engine — entry cases mirror brand-team decisions.' },
      { id: 'pricing', why: 'Price-pack architecture and promo pricing are everyday FMCG levers.' },
      { id: 'distribution_strategy', why: 'Traditional trade vs modern trade vs e-commerce route-to-market is the FMCG battleground.' },
      { id: 'profitability', why: 'Brand and SKU profitability diagnosis is the commercial core.' },
      { id: 'market_sizing', why: 'Brand teams size categories before anything else — estimation with explicit assumptions is the FMCG staple.' },
    ],
  },
  {
    id: 'ecommerce_tech_fintech',
    label: 'E-commerce / Tech / Fintech',
    match: /e-?commerce|fintech|tech\b|digital|wallet|platform|\bapp\b|momo|shopee|lazada|grab|tiki|zalo|vng|sea ?money|home credit|fpt/i,
    caseTypes: [
      { id: 'growth_strategy', why: 'Platform businesses interview around growth levers — it is the core question of the job.' },
      { id: 'unit_economics', why: 'Per-order and per-user economics decide platform survival — unit-economics cases mirror the daily dashboards.' },
      { id: 'product_launch', why: 'New products and features launch weekly — launch cases mirror the e-commerce day-to-day.' },
      { id: 'market_sizing', why: 'Sizing digital demand from assumptions is how platform teams evaluate every opportunity.' },
      { id: 'competitive_response', why: 'Subsidy wars and feature races make response cases feel like the real thing.' },
    ],
  },
  {
    id: 'banking_finance',
    label: 'Banking & Financial Services',
    match: /bank|financ|credit|securit|invest|uob|hsbc|vpbank|techcombank|vietcombank/i,
    caseTypes: [
      { id: 'financial_analysis', why: 'Banking interviews test whether you can read a client\u2019s financials and find the story in the numbers.' },
      { id: 'credit_assessment', why: 'Lend / don\u2019t lend is the bank\u2019s core decision — credit cases mirror the credit-analyst job.' },
      { id: 'mna', why: 'Valuation and deal logic mirror the investment judgment banks hire for.' },
      { id: 'profitability', why: 'Product-line profitability — cards, loans, deposits — is the banking P&L question.' },
      { id: 'market_entry', why: 'Segment and product expansion decisions follow entry logic — attractiveness vs ability to win.' },
      { id: 'market_sizing', why: 'Estimation with clean assumptions is the fastest test of numerical discipline.' },
    ],
  },
];

// ---- Function → case types --------------------------------------------------
// Order matters here too: Sales/Commercial (which often contains the word
// "Marketing" in sub-roles like "Trade Marketing") is checked before the
// Marketing/Brand rule.
export const FUNCTION_CASE_TYPE_RULES: FitCaseRule[] = [
  {
    id: 'finance',
    label: 'Finance / Accounting / Audit',
    match: /financ|account|audit|tax|invest|treasur/i,
    caseTypes: [
      { id: 'financial_analysis', why: 'Matches your Finance direction — statement reading is the finance-track core skill.' },
      { id: 'mna', why: 'Matches your Finance direction — deal and valuation logic is the finance case staple.' },
      { id: 'credit_assessment', why: 'Matches your Finance direction — credit judgment is where finance tracks put trainees to work.' },
      { id: 'profitability', why: 'Matches your Finance direction — P&L-driver diagnosis is everyday finance work.' },
    ],
  },
  {
    id: 'sales_commercial',
    label: 'Sales / Commercial',
    match: /sale|commercial|trade|customer development|business development|distribut/i,
    caseTypes: [
      { id: 'distribution_strategy', why: 'Matches your Sales / Commercial direction — route-to-market design is the commercial case skill.' },
      { id: 'growth_strategy', why: 'Matches your Sales / Commercial direction — growth levers are the commercial team\u2019s standing question.' },
      { id: 'pricing', why: 'Matches your Sales / Commercial direction — price and promo trade-offs live with the commercial team.' },
      { id: 'competitive_response', why: 'Matches your Sales / Commercial direction — answering a rival\u2019s push is a weekly commercial reality.' },
    ],
  },
  {
    id: 'supply_chain_operations',
    label: 'Supply Chain / Operations',
    match: /supply|operat|logisti|manufactur|procure|quality/i,
    caseTypes: [
      { id: 'operations_optimization', why: 'Matches your Supply Chain / Operations direction — bottleneck and cost cases mirror the job.' },
      { id: 'profitability', why: 'Matches your Supply Chain / Operations direction — cost-driver diagnosis is the ops lens on profit.' },
      { id: 'market_sizing', why: 'Matches your Supply Chain / Operations direction — capacity and demand estimation is planner math.' },
    ],
  },
  {
    id: 'marketing_brand',
    label: 'Marketing / Brand',
    match: /market|brand|consumer insight|communicat|media/i,
    caseTypes: [
      { id: 'product_launch', why: 'Matches your Marketing / Brand direction — launches are the brand-side case skill.' },
      { id: 'growth_strategy', why: 'Matches your Marketing / Brand direction — growth-lever thinking is brand strategy in case form.' },
      { id: 'pricing', why: 'Matches your Marketing / Brand direction — price-pack decisions sit with brand teams.' },
      { id: 'market_sizing', why: 'Matches your Marketing / Brand direction — category sizing comes before every brand plan.' },
    ],
  },
  {
    id: 'tech_data',
    label: 'Tech / Data',
    match: /tech|digital|data|analytic|engineer|product manage|\bit\b/i,
    caseTypes: [
      { id: 'unit_economics', why: 'Matches your Tech / Data direction — per-user economics is how digital teams think.' },
      { id: 'growth_strategy', why: 'Matches your Tech / Data direction — growth questions dominate digital interviews.' },
      { id: 'market_sizing', why: 'Matches your Tech / Data direction — sizing from data and assumptions is the daily skill.' },
      { id: 'product_launch', why: 'Matches your Tech / Data direction — feature and product launches are the sprint rhythm.' },
    ],
  },
  {
    id: 'consulting_delivery',
    label: 'Consulting / Strategy',
    match: /consult|strategy|advisory/i,
    caseTypes: [
      { id: 'profitability', why: 'Matches your Consulting direction — profit diagnosis is the classic consulting opener.' },
      { id: 'market_sizing', why: 'Matches your Consulting direction — structured estimation is the universal consulting screen.' },
      { id: 'mna', why: 'Matches your Consulting direction — deal questions test advisory value-vs-price logic.' },
      { id: 'due_diligence', why: 'Matches your Consulting direction — diligence reviews are core advisory delivery work.' },
    ],
  },
  {
    id: 'hr_people',
    label: 'HR / People',
    match: /\bhr\b|human|people|talent/i,
    caseTypes: [
      { id: 'profitability', why: 'Matches your HR / People direction — business-partner roles still get the classic profit case.' },
      { id: 'market_sizing', why: 'Matches your HR / People direction — structured estimation is the universal MT screen.' },
      { id: 'growth_strategy', why: 'Matches your HR / People direction — growth cases test the business fluency HR partners need.' },
    ],
  },
];

// Fallback recommendations when neither the program context nor the
// candidate's fit matches any rule — the universal MT/consulting screens.
export const GENERAL_CASE_TYPE_RECS: CaseTypeRec[] = [
  { id: 'market_sizing', why: 'The most universal screen — structured estimation shows up in almost every MT/consulting test.' },
  { id: 'profitability', why: 'Profit diagnosis is the foundational business case every assessment round can throw at you.' },
  { id: 'growth_strategy', why: 'Growth questions test whether you can structure and prioritize options — a universal skill check.' },
];

function fitNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (entry && typeof entry === 'object' ? String((entry as { name?: unknown }).name || '') : ''))
    .filter(Boolean);
}

export interface RelevantCaseTypes {
  // Case type ids ordered by relevance to the candidate's fit (closest
  // match first). Falls back to GENERAL_CASE_TYPE_IDS when nothing matched.
  ids: string[];
  // True when at least one industry/function rule matched — i.e. the menu is
  // genuinely personalized rather than the general default.
  personalized: boolean;
  // Rule labels that drove the ordering (for UI captions).
  matchedIndustries: string[];
  matchedFunctions: string[];
}

/**
 * Weighted union of the candidate's matched industries and functions:
 * the top industry weighs most (3), the second industry 2, the top function
 * 2, the second function 1 — so mixed-function candidates see the union of
 * both sets, weighted toward their top match. Within each rule, earlier case
 * types score higher, so the final order is closest-match-first.
 */
export function relevantCaseTypesForDirection(
  direction: Record<string, any> | null | undefined,
): RelevantCaseTypes {
  const industries = fitNames(direction?.industry_fit).slice(0, 2);
  const functions = fitNames(direction?.function_fit).slice(0, 2);
  const scores = new Map<string, number>();
  const matchedIndustries: string[] = [];
  const matchedFunctions: string[] = [];

  const apply = (names: string[], rules: FitCaseRule[], weights: number[], matchedOut: string[]) => {
    names.forEach((name, index) => {
      const rule = rules.find((candidate) => candidate.match.test(name));
      if (!rule) return;
      if (!matchedOut.includes(rule.label)) matchedOut.push(rule.label);
      const weight = weights[index] || 1;
      rule.caseTypes.forEach((rec, position) => {
        scores.set(rec.id, (scores.get(rec.id) || 0) + weight * (rule.caseTypes.length - position));
      });
    });
  };

  apply(industries, INDUSTRY_CASE_TYPE_RULES, [3, 2], matchedIndustries);
  apply(functions, FUNCTION_CASE_TYPE_RULES, [2, 1], matchedFunctions);

  if (scores.size === 0) {
    return { ids: GENERAL_CASE_TYPE_IDS.slice(), personalized: false, matchedIndustries, matchedFunctions };
  }

  const catalogOrder = new Map(CASE_TYPE_CATALOG.map((option, index) => [option.id, index]));
  const ids = Array.from(scores.keys()).sort((a, b) => {
    const diff = (scores.get(b) || 0) - (scores.get(a) || 0);
    if (diff !== 0) return diff;
    return (catalogOrder.get(a) ?? 99) - (catalogOrder.get(b) ?? 99);
  });
  return { ids, personalized: true, matchedIndustries, matchedFunctions };
}
