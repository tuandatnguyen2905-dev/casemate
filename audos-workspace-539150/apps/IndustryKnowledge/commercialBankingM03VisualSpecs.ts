import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Commercial Banking Module 03, keyed by visualKind. */
export const CB_M3_VISUALS: Record<string, ChapterVisual> = {
  'cb-m3-31-02-model-map': {
    heading: 'Who a bank serves decides how it must operate',
    intro: 'Two banks of the same size can need opposite capabilities. Read each model by its customer, offer, channel and the risk it keeps, not by its assets.',
    spec: {
      layout: 'taxonomy', title: 'Retail, corporate, universal—and beyond', kicker: '',
      root: 'Bank business models', rootDetail: 'Defined by customer, product breadth, distribution and retained risk',
      groups: [
        { label: 'Retail bank', detail: 'Households served at scale', items: ['Granular deposits', 'Standardized underwriting', 'Dense or digital distribution'] },
        { label: 'Corporate bank', detail: 'Businesses served through relationship managers', items: ['Credit and tailored limits', 'Cash management', 'Trade and FX'] },
        { label: 'Universal bank', detail: 'Several segments and product families combined', items: ['Can diversify earnings', 'Adds operational and governance complexity'] },
        { label: 'Specialist bank', detail: 'A narrower segment, product or capability', items: ['SME focus', 'Mortgage specialists', 'Transaction banks'] },
        { label: 'Digital-first bank', detail: 'Aims to lower acquisition and service cost', items: ['Describes distribution, not automatically a better business'] },
      ],
      note: 'The Big 4 hold 47.57% of assets among 30 reporting banks (30 Jun 2025): a scoped scale statistic, not a model profitability ranking. Private-bank positioning is not a verified revenue split.',
      takeaway: 'A bank model is set by whom it serves, what it offers, how it distributes and which risks it retains, not by size alone.',
    },
  },
  'cb-m3-31-03-profit-logic': {
    heading: 'Growth is only the first term in a bank model’s return equation',
    intro: '“More customers” is only the first term of the answer. Follow each deduction between customer activity and the capital needed to absorb its risk.',
    spec: {
      layout: 'driverTree', title: 'How models turn activity into profit', kicker: '',
      root: { label: 'Risk-adjusted return', detail: 'Contribution judged against the capital needed to absorb risk' },
      formula: '(Customers × activity × unit revenue − funding − service cost − expected loss) ÷ capital',
      drivers: [
        { label: 'Revenue composition', detail: 'Margin and fee yield on balance-sheet volume; which lines truly recur?', op: '+' },
        { label: 'Funding franchise', detail: 'Cheap funding helps margin only if liquidity and concentration remain sound', op: '−' },
        { label: 'Cost-to-serve', detail: 'Operating leverage: contribution must grow faster than support cost', op: '−' },
        { label: 'Expected credit loss', detail: 'Provisions can turn an attractive revenue model into value destruction', op: '−' },
        { label: 'Capital intensity', detail: 'RWA per unit of return: a high nominal margin can still earn a weak return', op: '÷' },
      ],
      note: 'Fee income is not automatically free: payment rails, fraud controls, advisers and partners have costs. No bank-level segment margins are asserted; the chapter teaches the mechanism.',
      takeaway: 'A model is only as good as the return that survives funding, operating cost, credit loss and capital.',
    },
  },
  'cb-m3-32-03-segment-economics': {
    heading: 'A segment cell is judged after its costs, not by its price',
    intro: 'A mortgage rate, account fee or FX spread is a price, not profit. Follow one segment-product cell through each charge, then see the choices if contribution is weak.',
    spec: {
      layout: 'pathway', title: 'Segment, price and measure profitability', kicker: '',
      trunk: [
        { label: 'Revenue by product', detail: 'Rates, fees, spreads and bundles for one segment and channel', kind: 'stage' },
        { label: 'Less transfer-priced funding', detail: 'An internal charge or credit tied to the bank’s funding curve', kind: 'stage' },
        { label: 'Less service and acquisition', detail: 'Direct service and acquisition cost, then allocated overhead', kind: 'stage' },
        { label: 'Less expected credit loss', detail: 'A forward-looking estimate of the segment’s credit loss', kind: 'stage' },
        { label: 'Relationship value against capital', detail: 'Add retention and cross-sell, then assess the capital used', kind: 'decision' },
      ],
      optionsLabel: 'If contribution looks weak',
      options: [
        { label: 'Redesign service', detail: 'Change how the segment is served' },
        { label: 'Better underwriting', detail: 'Reduce expected loss before touching price' },
        { label: 'Deeper cross-sell', detail: 'A low-fee relationship may supply valuable deposits' },
        { label: 'Exit', detail: 'An option, not a reflex' },
      ],
      note: 'Not automatically a higher customer price: risk-based pricing is not a license for unfair or opaque treatment. No source supports a numeric Vietnam segment profitability ranking.',
      takeaway: 'Single-product margin can misstate relationship value, so pricing must recover the full economics while staying fair.',
    },
  },
  'cb-m3-33-01-segment-map': {
    heading: 'Coverage should match complexity, from self-service to dedicated teams',
    intro: 'A salary earner, an export SME and a multinational treasury team all “want loans”. Compare what each segment needs and how much coverage it justifies.',
    spec: {
      layout: 'table', title: 'Who banks serve', kicker: '',
      headers: ['Segment', 'Core needs', 'Coverage model'],
      rows: [
        { label: 'Mass retail', a: 'Everyday accounts, payments and standardized credit', b: 'Self-service and pooled support at scale' },
        { label: 'Affluent and private', a: 'Banking plus advice and wealth needs', b: 'Advice-led support for growing complexity' },
        { label: 'SME', a: 'Owner and business finances combined', b: 'Costly to underwrite: smaller tickets, less standardized information' },
        { label: 'Large corporate', a: 'Limits, cash management, trade, FX and tailored execution', b: 'Dedicated relationship managers and specialists' },
        { label: 'Institutional client', a: 'Financial, public or investment institutions with specialized needs', b: 'Specialist coverage' },
      ],
      note: 'Reach and structure only: ≈87% adult payment-account ownership (reported 2024, secondary source citing SBV); Big 4 ≈50% of deposits and 41.9% of loans at end-2023 (Viet Nam News citing SBV).',
      takeaway: 'Segment by need, complexity and risk, then fit coverage to the economics rather than to demographics alone.',
    },
  },
  'cb-m3-33-02-needs': {
    heading: 'One job, two customers: a family budget beside a company’s cash cycle',
    intro: 'Products are only the mechanisms; the job comes first. Compare how the same job, from liquidity to trust, looks for a household and for a business.',
    spec: {
      layout: 'compare', title: 'What customers hire a bank to do', kicker: '',
      leftTitle: 'Households', rightTitle: 'Businesses',
      rows: [
        { label: 'Liquidity', a: 'Safe balances; a current account supports daily liquidity', b: 'Contingency liquidity; a revolving facility bridges cash-flow timing' },
        { label: 'Credit', a: 'Saving and responsible credit', b: 'Working capital, and term loans to fund investment' },
        { label: 'Transaction control', a: 'Secure, immediate payments through mobile accounts and VietQR', b: 'Collections, payroll, supplier payments, trade execution and FX via cash management' },
        { label: 'Channel fit', a: 'Mobile convenience for frequent tasks', b: 'Branches and relationship teams for complex decisions' },
        { label: 'Trust and resilience', a: 'Reliability and fair treatment; failure can interrupt livelihoods', b: 'Reliability and fair treatment; failure can interrupt commerce' },
      ],
      note: 'NAPAS reports 80m+ customers connected, 20,600+ ATMs and ≈741,000 POS/mPOS devices: shared infrastructure reach, not one bank’s active users or profitability.',
      takeaway: 'Customers hire a bank to make money available, safe and usable at the right moment, so trust is part of the product.',
    },
  },
  'cb-m3-33-03-lifecycle': {
    heading: 'Acquisition opens the account; later stages decide its value',
    intro: 'A cheap campaign is expensive if customers leave or keep no balances. Follow each relationship stage and the measure that shows it worked.',
    spec: {
      layout: 'flow', title: 'Relationship economics over time', kicker: '',
      steps: [
        { label: 'Acquire', detail: 'Reach the target segment; CAC = acquisition spend ÷ acquired customers', kind: 'stage' },
        { label: 'Activate', detail: 'Complete a core job: funded, transacting accounts rather than openings', kind: 'stage' },
        { label: 'Earn trust and retain', detail: 'Reliable service; retention measured by cohort and meaningful activity', kind: 'stage' },
        { label: 'Deepen relevantly', detail: 'Add relevant products; irrelevant selling creates conduct risk', kind: 'stage' },
        { label: 'Reprice or redesign', detail: 'Act when credit, fraud or conduct risk changes the economics', kind: 'decision' },
        { label: 'Risk-adjusted LTV', detail: 'Lifetime contribution after loss and capital', kind: 'outcome' },
      ],
      loop: 'Retention spreads acquisition cost and can deepen data and balances, which makes the next relevant cross-sell possible.',
      note: 'Formulas are conceptual: the research did not verify bank-level CAC or LTV benchmarks.',
      takeaway: 'Customer value is lifetime, multi-product and risk-adjusted; acquisition is only the opening investment.',
    },
  },
  'cb-m3-34-01-nim-calculation': {
    heading: 'NIM is a ratio over average earning assets, not a rate gap',
    intro: 'A 9% loan rate minus a 5% deposit rate is not a 4% NIM. Move the hypothetical inputs and watch NII, the average denominator and NIM recompute together.',
    spec: {
      layout: 'scenario', title: 'Revenue architecture and NIM', kicker: '',
      inputs: [
        { key: 'income', label: 'Interest income', min: 50, max: 100, step: 1, value: 75, unit: 'units' },
        { key: 'expense', label: 'Interest expense', min: 20, max: 60, step: 1, value: 40, unit: 'units' },
        { key: 'opening', label: 'Opening earning assets', min: 800, max: 1100, step: 10, value: 950, unit: 'units' },
        { key: 'closing', label: 'Closing earning assets', min: 900, max: 1200, step: 10, value: 1050, unit: 'units' },
      ],
      outputs: [
        { label: 'Net interest income', unit: 'units', digits: 0, compute: (v) => v.income - v.expense },
        { label: 'Average earning assets', unit: 'units', digits: 0, compute: (v) => (v.opening + v.closing) / 2 },
        { label: 'Net interest margin', unit: '%', digits: 1, compute: (v) => ((v.income - v.expense) / ((v.opening + v.closing) / 2)) * 100 },
      ],
      assumption: 'Hypothetical illustrative currency units, not a real-bank metric. Real disclosures may annualize interim NIM and define earning assets differently.',
      note: 'Defaults reproduce the chapter example: NII 75 − 40 = 35, average assets (950 + 1,050) ÷ 2 = 1,000, NIM 3.5%. NIM excludes fees, OPEX, provisions and tax.',
      takeaway: 'The NIM denominator is average interest-earning assets, not deposits, total assets or equity, and NIM is not net profit margin.',
    },
  },
  'cb-m3-34-02-profit-waterfall': {
    heading: 'Loans grow 15% yet contribution after provisions slips',
    intro: 'In this hypothetical, NII rises with the loan book but cost of risk rises from 0.8% to 1.5%. Compare the columns line by line to see where the gain disappears.',
    spec: {
      layout: 'compare', title: 'Costs, credit losses and actual profitability', kicker: '',
      leftTitle: 'Hypothetical starting point', rightTitle: 'After 15% loan growth',
      rows: [
        { label: 'Loan balance', a: 'VND100', b: 'VND115' },
        { label: 'NII at 6% spread', a: 'VND6.0', b: 'VND6.9' },
        { label: 'Cost of risk', a: '0.8%', b: '1.5%' },
        { label: 'Provision expense', a: 'VND0.8', b: 'VND1.725' },
        { label: 'Contribution after provisions', a: 'VND5.2', b: 'VND5.175, slightly lower' },
      ],
      note: 'Hypothetical spread-on-loans arithmetic, not formal NIM; it omits fees, OPEX, tax and capital. Real comparisons read NIM, CIR, cost of risk, NPL, coverage, CAR, ROA and ROE together.',
      takeaway: 'Loan growth creates potential income; funding cost, operating expense and credit cost decide the profit that remains.',
    },
  },
  'cb-m3-35-01-channel-system': {
    heading: 'Which touchpoints the bank owns, staffs or shares',
    intro: 'Channels prove identity, build trust, complete service and recover problems. Group them by role, and notice which rails the bank does not own.',
    spec: {
      layout: 'taxonomy', title: 'How banks reach customers', kicker: '',
      root: 'Bank distribution system', rootDetail: 'Acquisition, advice, transaction and service coordinated across touchpoints',
      groups: [
        { label: 'Owned digital self-service', detail: 'Simple, frequent tasks', items: ['Mobile banking', 'Internet banking'] },
        { label: 'Human and assisted', detail: 'Complex, high-value or high-risk decisions', items: ['Branches', 'Contact centers', 'Relationship managers'] },
        { label: 'Transaction points', detail: 'Cash and payment completion', items: ['ATMs', 'POS'] },
        { label: 'Partners and embedded finance', detail: 'Banking inside another journey; the bank keeps underwriting and complaints', items: ['Agents', 'Partners', 'APIs'] },
        { label: 'Shared rails', detail: 'Common national infrastructure, not bank-owned', items: ['NAPAS: 68 members', 'FastFund 247: 24/7 transfers', 'VietQR: individual transfers below VND500m'] },
      ],
      note: 'NAPAS figures are current to its site in 2026; the VietQR cap is a NAPAS service limit, not a universal bank-account limit or one bank’s reach.',
      takeaway: 'Judge each channel by reach, completion, trust, cost, risk and cross-sell, not by traffic alone.',
    },
  },
  'cb-m3-35-02-journey': {
    heading: 'Where a hybrid journey is won or lost: the handoffs',
    intro: 'One customer may research on mobile, verify at a branch and call for recovery. Follow the seven stages and the channel best suited to each.',
    spec: {
      layout: 'flow', title: 'Physical versus digital is the wrong fight', kicker: '',
      steps: [
        { label: 'Discovery', detail: 'Understand the need and the proposition', kind: 'stage', owner: 'Digital reach and advice' },
        { label: 'Application', detail: 'Capture data once; resume across channels without repeating it', kind: 'stage', owner: 'Mobile or web' },
        { label: 'Verification', detail: 'Establish identity, with presence where assurance matters', kind: 'stage', owner: 'Digital or branch' },
        { label: 'Decision', detail: 'Underwrite, price and explain', kind: 'decision', owner: 'Automation and specialists' },
        { label: 'Activation', detail: 'Begin using the product without losing context', kind: 'stage', owner: 'Self-service' },
        { label: 'Servicing', detail: 'Frequent standardized tasks at low marginal cost', kind: 'stage', owner: 'Digital self-service' },
        { label: 'Recovery', detail: 'Fraud blocks, failed transfers and identity exceptions', kind: 'outcome', owner: 'Assisted escalation with context' },
      ],
      note: '≈87% adult account ownership (reported 2024, secondary source citing SBV) is a reach indicator, not active digital use, satisfaction or profitability.',
      takeaway: 'Measure completion by journey stage: a low-cost digital start followed by repeated branch visits can cost more overall.',
    },
  },
  'cb-m3-35-03-channel-economics': {
    heading: 'A cheap transaction can still be an unprofitable customer',
    intro: 'Unit transaction cost and the lifetime economics of a relationship are different numbers. Read each dimension’s measure and the question it should answer.',
    spec: {
      layout: 'table', title: 'Channel economics and relationship value', kicker: '',
      headers: ['Dimension', 'Measure', 'Diagnostic question'],
      rows: [
        { label: 'Acquire', a: 'CAC including paid plus partner cost', b: 'Is the acquired-customer denominator consistent?' },
        { label: 'Activate', a: 'Funded activation', b: 'Did the account receive funds and meaningful use?' },
        { label: 'Serve', a: 'Full journey cost-to-serve', b: 'Are exceptions, support and shared infrastructure included?' },
        { label: 'Failure demand', a: 'Contacts, retries and manual work after a failed journey', b: 'Would removing failure improve both trust and CIR?' },
        { label: 'Retain and deepen', a: 'Balances, repeat use and relevant cross-sell', b: 'Is the bank becoming primary?' },
      ],
      note: 'The research did not verify bank-level cost-per-channel or digital-active-user benchmarks, so every measure here stays unquantified.',
      takeaway: 'Distribution creates value when it acquires the right customer, completes the job safely and deepens the relationship at sustainable cost.',
    },
  },
  'cb-m3-36-01-ecosystem': {
    heading: 'Rules, confidence, data, rails and capital around one bank',
    intro: 'A bank’s outcome is never produced by management alone. See what each actor supplies, then ask which dependencies are substitutable and which are systemic.',
    spec: {
      layout: 'ecosystem', title: 'Map the banking ecosystem', kicker: '',
      center: { label: 'Commercial bank', detail: 'Serves customers and manages risk' },
      actors: [
        { label: 'SBV', relation: 'Licenses and supervises', flows: ['oversight'] },
        { label: 'Deposit Insurance of Vietnam', relation: 'DIV supports depositor protection', flows: ['risk'] },
        { label: 'CIC and VAMC', relation: 'Information and bad-debt institutions supporting risk management', flows: ['information', 'risk'] },
        { label: 'NAPAS', relation: 'Connects payment activity across 68 members (current site, 2026)', flows: ['money', 'information'] },
        { label: 'Interbank and correspondent banks', relation: 'Funding, cross-border payments and market access', flows: ['money', 'service'] },
        { label: 'Strategic investors and shareholders', relation: 'Capital and external discipline; SMBC took 15% of VPBank in 2023', flows: ['money'] },
        { label: 'Auditors, ratings and standard setters', relation: 'BIS, the Basel Committee and FSB shape expectations applied through local law', flows: ['oversight', 'information'] },
      ],
      note: 'The SMBC stake (approximately US$1.5bn) is a historical, snippet-verified transaction; current holdings must be reverified. Basel standards are not automatically local operative requirements.',
      takeaway: 'Map the ecosystem before judging a bank’s strategy or resilience: it exposes legal constraints, shared dependencies and systemic risk.',
    },
  },
};

/** Chapters marked “Verification Required — Do Not Publish”: no Learning Visual until their evidence is verified. */
export const CB_M3_HELD_KINDS: readonly string[] = [
  'cb-m3-31-01-revenue-engines',
  'cb-m3-32-01-portfolio',
  'cb-m3-32-02-income-map',
  'cb-m3-34-03-statements',
  'cb-m3-36-02-interactions',
  'cb-m3-36-03-protection',
];
