import { bankingChapter, bankingQuiz, registerVisual } from './commercialBankingCore';
import type { BankingLessonBundle, BankingVisualRegistry } from './commercialBankingCore';
import { CB_CASE_SOURCES } from './commercialBankingCases';

export const CB_M03_B02_VISUALS: BankingVisualRegistry = {};
const v = (kind: `cb-m3-${string}`, spec: Parameters<typeof registerVisual>[2]) => registerVisual(CB_M03_B02_VISUALS, kind, spec);
const s = (value: string | undefined, label: string, subtitle: string, description: string) => ({ value, label, subtitle, description });
const t = (term: string, definition: string) => ({ term, definition });

const L34 = '3.4 Revenue Streams & Cost Structure';
const deck34 = [
  bankingChapter({
    title: 'Revenue architecture and NIM', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '12 min',
    objective: 'Calculate NII and NIM correctly and distinguish them from lending spread, total revenue and net profit margin.',
    mateIntro: 'A manager says, “Our loan rate is 9% and deposit rate is 5%, so NIM is 4%.” That shortcut is tempting—and usually wrong—because a bank holds many assets and funding sources, at different balances and repricing dates.',
    keyInsight: 'NII is interest income minus interest expense; NIM is NII divided by average interest-earning assets—not a quoted loan-deposit spread and not net profit margin.',
    what: 'Interest income comes from loans, securities and other earning assets. Interest expense comes from deposits, wholesale borrowing and other interest-bearing liabilities. Non-interest lines include net fees, cards and payments, trade and guarantees, FX, bancassurance commissions, trading and other operating income.',
    how: 'Step 1: total interest income. Step 2: subtract interest expense to get NII. Step 3: calculate average interest-earning assets, normally using opening and closing balances or a more frequent average. Step 4: NIM = NII ÷ average interest-earning assets, annualized when the reporting period requires it.',
    why: 'NIM reveals how effectively earning assets produce net interest income after funding cost. It still says nothing directly about fee income, OPEX, provisions, tax or capital—so it cannot equal net profit margin.',
    global: 'Analysts reconcile yields, funding cost, asset mix and repricing before explaining NIM; a higher loan rate can be offset by expensive deposits or idle liquidity.',
    vietnam: 'CASA competition matters because low-cost transaction balances can reduce funding cost, but CASA alone neither determines NIM nor guarantees profit.',
    visualKind: v('cb-m3-34-01-nim-calculation', { layout: 'steps', title: 'NIM calculation—worked example', kicker: 'Illustrative units; not real-bank data', tagLabel: 'Result', steps: [
      { label: 'Interest income', detail: 'Loans + securities + other earning assets = 75', tag: '75' },
      { label: 'Interest expense', detail: 'Deposits + wholesale funding = 40', tag: '40' },
      { label: 'Net interest income', detail: '75 − 40', tag: 'NII = 35' },
      { label: 'Average earning assets', detail: '(Opening 950 + closing 1,050) ÷ 2', tag: '1,000' },
      { label: 'Net interest margin', detail: '35 ÷ 1,000', tag: 'NIM = 3.5%' },
    ], note: 'Change any input and recompute the full chain; do not subtract two advertised rates and call the result NIM.', takeaway: 'The denominator is average interest-earning assets, not deposits, total assets or equity.' }),
    visualHeading: 'Revenue architecture and NIM calculator', visualIntro: 'The five-step calculator preserves both the income-statement numerator and balance-sheet denominator.', imageAlt: 'Worked hypothetical NIM calculation from interest income and expense to a 3.5 percent result.',
    statTiles: [s('35', 'Hypothetical NII', '75 − 40', 'Illustrative currency units.'), s('1,000', 'Average earning assets', '(950 + 1,050) ÷ 2', 'Illustrative average denominator.'), s('3.5%', 'Hypothetical NIM', '35 ÷ 1,000', 'Not a real-bank metric and not net profit margin.')],
    statsNote: 'All values in the worked calculation are hypothetical. Real disclosures may annualize interim NIM and define earning assets differently; compare definitions.',
    keyTerms: [t('Interest-earning assets', 'Assets that generate interest, including loans and eligible securities or placements.'), t('Net interest income (NII)', 'Interest income minus interest expense over a period.'), t('Net interest margin (NIM)', 'NII divided by average interest-earning assets, usually expressed as a percentage.')],
    recap: ['NII is an amount; NIM is a ratio.', 'Average earning assets are the NIM denominator.', 'NIM excludes fees, OPEX, provisions and tax.', 'A loan-deposit rate gap is not automatically NIM.'], chapterRecap: 'Compute NII first, use average earning assets second, and interpret NIM as one operating driver—not bottom-line profitability.', deepDiveTitle: 'What moves NIM',
    deepDive: ['Asset yield changes with product mix, benchmark rates, repricing lags, competition and credit mix. Funding cost changes with CASA, term-deposit pricing, wholesale funding and liquidity choices. Excess low-yield liquidity can dilute NIM even when it improves resilience.', 'For an interim period, check whether disclosed NII and NIM are annualized and whether average balances are daily, monthly or endpoint averages. Never mix one bank’s reported NIM with another bank’s self-calculated ratio without reconciling definitions.'],
    evidence: 'The formula and hypothetical example directly integrate research_addenda_v2. Basel source is not used to validate the example; no real-bank NIM is asserted.', sourceIds: ['cb-m03-s02', 'cb-m03-s08', 'cb-m03-s15']
  }),
  bankingChapter({
    title: 'Costs, credit losses and actual profitability', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '13 min',
    objective: 'Explain how funding, OPEX, provisions and capital convert revenue into ROA and ROE—even when loans grow.',
    mateIntro: 'A bank grows loans 15% and NII rises. The celebration stops when provisions rise faster. Banking profit is a waterfall: every layer can preserve or consume the value created above it.',
    keyInsight: 'Loan growth creates potential income; funding cost, operating expense and credit cost decide actual profit, while capital determines the return shareholders earn.',
    what: 'Funding cost includes interest on deposits and wholesale borrowing. OPEX includes people, branches, technology, compliance, servicing and distribution. Credit cost is the period’s provision expense relative to average loans; it differs from the NPL stock and loan-loss coverage.',
    how: 'The income chain is NII + non-interest income = total operating income; minus OPEX = pre-provision operating profit; minus provision expense = PBT; minus tax = net profit. Then ROA compares profit with assets, while ROE compares it with equity.',
    why: 'A larger loan book can require expensive funding, more operating capacity, higher provisions and more regulatory capital. Growth can therefore lower profit or return despite higher gross income.',
    global: 'In a downturn, provisions often rise before or alongside visible NPLs as expected-loss estimates worsen. Strong coverage can depress current profit while increasing resilience.',
    vietnam: 'Funding competition, credit-room constraints and differences in underwriting make loan growth an incomplete performance signal. Compare NIM, CIR, cost of risk, NPL, coverage, CAR, ROA and ROE together.',
    visualKind: v('cb-m3-34-02-profit-waterfall', { layout: 'table', title: 'P&L waterfall and KPI links', kicker: 'Each line answers a different question', headers: ['Waterfall line', 'Formula / driver', 'Interpretation'], rows: [
      { label: 'NII', a: 'Interest income − interest expense', b: 'Spread engine after funding expense' },
      { label: 'Total operating income', a: 'NII + net fees + FX/trading/other', b: 'All operating revenue pools' },
      { label: 'Pre-provision profit', a: 'Operating income − OPEX', b: 'Earnings before current credit-loss charge' },
      { label: 'PBT', a: 'Pre-provision profit − provisions', b: 'Profit after credit cost, before tax' },
      { label: 'Net profit', a: 'PBT − tax', b: 'Bottom-line period earnings' },
      { label: 'ROA / ROE', a: 'Net profit ÷ average assets / equity', b: 'Asset productivity / shareholder return' },
    ], takeaway: 'Profitability is what survives the full waterfall—not the height of the first line.' }),
    visualHeading: 'Profitability waterfall', visualIntro: 'The annotated waterfall links statement lines to the metrics analysts use.', imageAlt: 'Bank profit and loss waterfall from NII through total operating income, provisions and net profit.',
    statTiles: [s('40%', 'Hypothetical CIR', 'OPEX 20 ÷ income 50', 'Illustrative only; lower is not always better if underinvestment follows.'), s('15%', 'Hypothetical ROE', 'Net profit 15 ÷ equity 100', 'Illustrative shareholder return.'), s('≈1.4%', 'Hypothetical ROA', 'Net profit 15 ÷ assets 1,100', 'Illustrative asset return; not interchangeable with ROE.')],
    statsNote: 'These profitability values are hypothetical. Real ratios should generally use average balance-sheet denominators and consistent consolidation bases.',
    keyTerms: [t('Cost of funds', 'Interest expense relative to average interest-bearing funding, subject to a bank’s disclosed definition.'), t('Cost-to-income ratio (CIR)', 'Operating expenses divided by total operating income.'), t('Cost of risk', 'Provision expense divided by average loans, subject to disclosed scope.'), t('Loan-loss coverage ratio (LLCR)', 'Loan-loss reserves divided by NPLs, subject to definition.')],
    recap: ['Funding cost, OPEX and provisions are distinct.', 'NPL, provisions, cost of risk and coverage answer different questions.', 'ROA and ROE use different denominators.', 'Loan growth does not guarantee profit.'], chapterRecap: 'Trace loan growth through funding, operating cost, provisions and capital before claiming it creates value.', deepDiveTitle: 'Worked example: growth without profit growth',
    deepDive: ['Hypothetical starting point: loans of VND100 and a simplified 6% net interest spread generate VND6.0 of NII. At 0.8% cost of risk, provisions are VND0.8, leaving VND5.2 before OPEX and other lines.', 'Loans grow 15% to VND115. At the same simplified 6% spread, NII becomes VND6.9. But cost of risk rises to 1.5%, so provisions become VND1.725. Contribution after provisions is VND5.175—slightly below VND5.2 despite higher loans and NII.', 'Credit losses can surface after origination, so rapid growth may raise current NII before later NPL migration and provisions reduce future profit.', 'This is spread-on-loans arithmetic, not formal NIM: the denominator is loan balance rather than average interest-earning assets. It also omits fees, OPEX, tax and capital, so it is a mechanism example—not a complete bank forecast.'],
    evidence: 'The growth/provision example is reproduced from research_addenda_v2 with its exact limitation. Basel minima—CET1 4.5%, Tier 1 6%, total capital 8% plus a 2.5% CET1 conservation buffer—are global standards, not automatically Vietnam operative rules.', sourceIds: ['cb-m03-s02', 'cb-m03-s06', 'cb-m03-s08', 'cb-m03-s15']
  }),
  bankingChapter({
    title: 'Read the statements, then compare the bank', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '14 min',
    objective: 'Read a bank balance sheet and income statement, link them to KPIs and make a like-for-like comparison.',
    mateIntro: 'A bank can report high NIM, rapid credit growth and strong PBT in the same year—or none of the three. Statement reading is the discipline of connecting stocks, flows and definitions before forming a view.',
    keyInsight: 'Compare banks only after matching period, consolidation basis, units and definitions; a higher NIM or faster loan growth can be offset by cost, credit loss or capital intensity.',
    what: 'The balance sheet shows customer loans, allowances, investment securities, interbank assets, deposits, wholesale or interbank liabilities and equity at a date. The income statement shows interest and fee flows, OPEX, provisions, PBT, tax and net profit over a period.',
    how: 'Link average loans and securities to interest income; deposits and borrowing to interest expense; NII to NIM; OPEX to CIR; provisions to cost of risk; NPLs and reserves to asset-quality ratios; net profit to average assets and equity; regulatory capital to RWA.',
    why: 'Stocks and flows can move differently. A year-end loan balance does not equal annual lending; an allowance is not the period provision expense; equity is not CAR; H1 profit cannot be compared with FY profit.',
    global: 'Professional peer analysis normalizes accounting scope, currency, period and one-offs before ranking banks.',
    vietnam: 'Verified evidence permits only narrow VCB–TCB observations: at end-2024 Fitch cites a Vietcombank NPL ratio of about 1.0% (Vietcombank’s own report shows 0.96% and 0.97%), while Techcombank reported a consolidated NPL ratio of 1.17% and a CASA ratio of 40.9% in its FY2024 results release (company-reported). The NPL figures come from different sources and definitions, so they teach comparison discipline, not a ranking.',
    visualKind: v('cb-m3-34-03-statements', { layout: 'compare', title: 'Annotated bank financial statements', kicker: 'Stocks on the left; flows on the right', leftTitle: 'Balance sheet at a date', rightTitle: 'Income statement over a period', rows: [
      { label: 'Earning assets', a: 'Gross loans, securities, interbank placements', b: 'Interest income generated during period' },
      { label: 'Funding', a: 'CASA, term deposits, wholesale borrowing', b: 'Interest expense during period' },
      { label: 'Credit loss', a: 'Allowance reduces gross loans to net loans', b: 'Provision charge reduces period profit' },
      { label: 'Capital', a: 'Accounting equity; regulatory capital is separately defined', b: 'Net profit contributes to retained earnings' },
      { label: 'Performance', a: 'Average balances become ratio denominators', b: 'NII → TOI → PPOP → PBT → net profit' },
    ], takeaway: 'Never compare a balance-sheet stock directly with an income-statement flow without a defined ratio.' }),
    visualHeading: 'Annotated financial statements and KPI links', visualIntro: 'The statement map connects each stock to related flows while preserving key accounting distinctions.', imageAlt: 'Side-by-side annotated bank balance sheet and income statement.',
    statTiles: [s('1.0%', 'Vietcombank NPL', 'Consolidated, end-2024', 'Fitch figure; Vietcombank’s own report shows 0.96% and 0.97%.'), s('1.17%', 'Techcombank NPL', 'End-2024 · consolidated · company-reported', 'Techcombank FY2024 results release (January 2025); 1.09% including bonds.'), s('40.9%', 'Techcombank CASA ratio', 'End-2024 · company-reported', 'Techcombank FY2024 results release (January 2025); CASA balances ÷ customer deposits, Auto-earning included.')],
    statsNote: 'These fields are not a complete comparison table. VCB H1-2024 net profit of VND16,699bn is intentionally excluded from any FY2024 profit comparison.',
    keyTerms: [t('Loan-loss allowance', 'A balance-sheet contra-asset representing accumulated expected credit-loss reserves.'), t('Provision expense', 'The period income-statement charge that changes reserves and reduces profit.'), t('Regulatory capital', 'Eligible capital measured under prudential rules; it is not simply accounting equity.'), t('Comparison basis', 'The period, entity scope, definition, units and source quality used for a metric.')],
    recap: ['Balance sheets show stocks; income statements show flows.', 'Allowance and provision expense are related but different.', 'Equity does not equal CAR.', 'VCB–TCB evidence is incomplete and must not become a false league table.'], chapterRecap: 'Read the statements as one system, then enforce like-for-like evidence before interpreting differences.', deepDiveTitle: 'A safe comparison workflow',
    deepDive: ['Create a data dictionary first: group or bank-only, audited or management release, fiscal period, currency, average or endpoint denominator, and each bank’s definition. Mark missing values “Data Not Verified” rather than filling gaps from another period.', 'For VCB and TCB, the research did not assemble a complete identical-period, identical-basis set for NIM, CIR, ROA, ROE, CAR or PBT. TCB’s FY2024 CASA ratio (40.9%) and NPL ratio (1.17%) come from its FY2024 results release; figures from its later FY2025 report must not be substituted into FY2024 wording. VCB’s VND16,699bn net profit is consolidated H1-2024 only.', 'Interpret drivers, not winners: CASA may support funding cost; NIM may reflect mix and risk; provisions may protect resilience; CIR may reflect investment; CAR constrains leverage. Higher lending growth or NIM does not mechanically create higher net profit.'],
    evidence: 'Narrow metrics retain source and period. No snippet-level or incompatible-period values are presented as a validated full comparison.', sourceIds: ['cb-m03-s08', 'cb-m03-s17', 'cb-m03-s18', 'cb-m03-s19'],
    extraSources: [CB_CASE_SOURCES.tcbResultsFy24],
    restriction: 'Complete same-period VCB–TCB NIM, CIR, ROA, ROE, CAR and PBT remain Data Not Verified. Reconfirm audited consolidated FY2024 statements before publication.'
  }),
];

const L35 = '3.5 Distribution & Sales Channels';
const deck35 = [
  bankingChapter({
    title: 'How banks reach customers', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '8 min',
    objective: 'Map branches, ATMs, mobile, contact centers, relationship teams, partners and embedded distribution to customer jobs.',
    mateIntro: 'A bank’s channel is not just where a sale happens. It is where identity is proven, trust is built, service is completed and problems are recovered.',
    keyInsight: 'Distribution is a coordinated system of acquisition, advice, transaction and service—not a list of physical and digital touchpoints.',
    what: 'Channels include branches, ATMs and POS, internet and mobile banking, contact centers, relationship managers, agents, partners, APIs and embedded finance.',
    how: 'Simple, frequent tasks move toward self-service. Complex, high-value or high-risk decisions use people and specialists. Shared infrastructure connects banks while owned channels shape experience and relationship data.',
    why: 'A channel must be evaluated for reach, completion, trust, cost, risk and cross-sell—not traffic alone.',
    global: 'Banks embed payments or credit into commerce platforms while keeping risk, compliance and servicing responsibilities behind the interface.',
    vietnam: 'Mobile banking and VietQR complement branches, ATM/POS networks and relationship coverage. NAPAS is shared national infrastructure, not a bank-owned channel.',
    visualKind: v('cb-m3-35-01-channel-system', { layout: 'mindmap', variant: 'orbit', title: 'Bank distribution system', kicker: 'One relationship across many moments', center: 'Customer job', centerSub: 'Acquire • transact • advise • recover', tagLabel: 'Best fit', rows: [
      { label: 'Mobile / web', a: 'Always-on self-service and alerts', b: 'Frequent, standardized tasks' },
      { label: 'Branch', a: 'Cash, identity, trust and complex support', b: 'High-assurance or assisted moments' },
      { label: 'RM / specialist', a: 'Advice, structuring and relationship coordination', b: 'SME, corporate and affluent complexity' },
      { label: 'ATM / POS / QR', a: 'Cash and payment acceptance', b: 'Transaction completion' },
      { label: 'Contact center', a: 'Guidance, security response and recovery', b: 'Urgent or exception handling' },
      { label: 'Partner / API', a: 'Banking inside another journey', b: 'Contextual acquisition and service' },
    ], takeaway: 'Choose channels by customer job, assurance and economics—not fashion.' }),
    visualHeading: 'Channel system map', visualIntro: 'The map keeps human, owned digital and shared infrastructure roles distinct.', imageAlt: 'Mind map of bank distribution channels around customer jobs.',
    statTiles: [s('68', 'NAPAS members', 'Current site, 2026', 'Shared network participants reported by NAPAS.'), s('24/7', 'FastFund 247', 'Transfer availability', 'Official service description.'), s('< VND500m', 'VietQR individual transfer', 'Per transaction', 'Current NAPAS service limit; not a universal bank-account limit.')],
    statsNote: 'Infrastructure statistics are current to the source page and should not be interpreted as one bank’s reach.',
    keyTerms: [t('Embedded finance', 'Banking functionality placed inside a non-bank customer journey.'), t('Relationship manager', 'A human coverage role coordinating needs, products and specialists.'), t('Shared infrastructure', 'Common rails used by multiple institutions, such as national switching or payment networks.')],
    recap: ['Channels serve different customer jobs.', 'Shared rails are not bank-owned distribution.', 'Recovery and trust are channel outcomes.'], chapterRecap: 'Bank reach combines self-service, human coverage and shared rails into one service system.', deepDiveTitle: 'Channel accountability',
    deepDive: ['An embedded front end does not remove the bank’s responsibility for underwriting, authentication, complaints or resilience. Map ownership across partner, bank and shared rail.', 'Reach metrics—downloads, devices or branches—need completion, activity, error and recovery metrics before they describe customer value.'],
    evidence: 'NAPAS facts are official and full-text verified; no bank-level digital-active-user benchmark is asserted.', sourceIds: ['cb-m03-s09', 'cb-m03-s07']
  }),
  bankingChapter({
    title: 'Physical versus digital is the wrong fight', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '8 min',
    objective: 'Design an omnichannel journey that assigns each step to the channel best suited to it.',
    mateIntro: 'A customer may research on mobile, verify at a branch, sign digitally and call for recovery. Calling that journey “digital” hides the handoffs that decide whether it works.',
    keyInsight: 'The winning design is not branch or digital; it is a reliable journey with intentional handoffs and consistent information.',
    what: 'Physical channels provide presence, cash handling, identity assurance and complex conversation. Digital channels provide speed, availability, personalization and low marginal transaction cost.',
    how: 'Design around a journey: discovery, application, verification, decision, activation, servicing and recovery. Let customers resume across channels without repeating data or losing context.',
    why: 'Poor handoffs create abandonment, duplicate work and fraud gaps. Good orchestration lowers cost while preserving trust for high-stakes moments.',
    global: 'Leading omnichannel banks combine remote onboarding and self-service with assisted escalation for exceptions and advice.',
    vietnam: 'Digital reach is expanding, yet branches remain economically relevant for rural reach, cash use and complex SME or corporate relationships.',
    visualKind: v('cb-m3-35-02-journey', { layout: 'steps', title: 'Omnichannel customer journey', kicker: 'Assign the channel to the moment', tagLabel: 'Channel logic', steps: [
      { label: 'Discover', detail: 'Understand a need and proposition', tag: 'Digital reach + trusted advice' },
      { label: 'Apply', detail: 'Capture information with low friction', tag: 'Mobile/web with save-and-resume' },
      { label: 'Verify', detail: 'Establish identity and authority', tag: 'Risk-based digital or assisted check' },
      { label: 'Decide', detail: 'Underwrite, price and explain', tag: 'Automation + specialist judgment' },
      { label: 'Use', detail: 'Transact and manage the relationship', tag: 'Self-service + proactive support' },
      { label: 'Recover', detail: 'Resolve errors, fraud and exceptions', tag: 'Fast escalation with full context' },
    ], note: 'A seamless journey preserves state, consent and accountability across every handoff.', takeaway: 'Optimize the whole journey, not an individual channel’s utilization.' }),
    visualHeading: 'Physical-digital customer journey', visualIntro: 'The journey shows where automation, assistance and escalation create value.', imageAlt: 'Six-stage omnichannel banking customer journey.',
    statTiles: [s('≈87%', 'Adult account ownership', 'Reported 2024', 'Reach indicator from a secondary source citing SBV.'), s(undefined, 'Physical advantage', 'Trust + complexity', 'Human and cash-intensive moments.'), s(undefined, 'Digital advantage', 'Availability + low marginal cost', 'Frequent standardized moments.')],
    statsNote: 'Account ownership does not equal active digital use, satisfaction or profitability.',
    keyTerms: [t('Omnichannel', 'A coordinated journey in which customer state and service context move across channels.'), t('Handoff', 'Transfer of a customer task or context between channels or teams.'), t('Exception handling', 'Processes for cases that cannot complete through the standard path.')],
    recap: ['Journeys cross physical and digital channels.', 'Handoffs determine completion and trust.', 'Account ownership is not digital engagement.'], chapterRecap: 'Design channel orchestration around completion, assurance and recovery.', deepDiveTitle: 'Measure the handoff',
    deepDive: ['Track completion and time-to-complete by journey stage, not only by channel. A low-cost digital start followed by repeated branch visits may have a high total cost-to-serve.', 'Recovery is a first-class design stage. Fraud blocks, failed transfers and identity exceptions often determine whether the customer trusts the bank again.'],
    evidence: 'The chapter uses only the reported account-ownership reach fact; it does not infer bank-level adoption or cost savings.', sourceIds: ['cb-m03-s07', 'cb-m03-s09']
  }),
  bankingChapter({
    title: 'Channel economics and relationship value', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '9 min',
    objective: 'Evaluate channels using CAC, cost-to-serve, retention, cross-sell, risk and primary-bank behavior.',
    mateIntro: 'A mobile transaction can be cheap while a digital customer is expensive to acquire. Channel economics separates unit service cost from the lifetime economics of the relationship.',
    keyInsight: 'Distribution creates value when it acquires the right customer, completes the job safely and deepens a durable relationship at sustainable cost.',
    what: 'Channel economics includes acquisition spend, onboarding, transaction and support cost, branch or platform fixed cost, fraud and failure cost, retention, balances and cross-sell.',
    how: 'Measure unit economics by journey and cohort. Allocate shared infrastructure carefully, distinguish fixed from variable cost, and avoid crediting the final click for the whole relationship.',
    why: 'Channel migration can lower transaction cost while raising technology, cyber and recovery costs. The right comparison is total relationship contribution and resilience.',
    global: 'Digital-first models can scale transactions quickly, but sustainable economics require funded accounts, repeat use and controlled credit or fraud loss.',
    vietnam: 'Shared payment infrastructure reduces ATM-network differentiation, shifting attention toward app quality, acquisition efficiency, partnerships and CASA capture.',
    visualKind: v('cb-m3-35-03-channel-economics', { layout: 'table', title: 'Channel economics scorecard', kicker: 'Growth, cost, trust and value together', headers: ['Dimension', 'Measure', 'Diagnostic question'], rows: [
      { label: 'Acquire', a: 'CAC, approval and funded activation', b: 'Did the channel attract the intended segment?' },
      { label: 'Serve', a: 'Cost per completed journey', b: 'Are exceptions included in cost?' },
      { label: 'Trust', a: 'Failure, fraud, complaint and recovery', b: 'Can the journey recover safely?' },
      { label: 'Retain', a: 'Active cohort retention', b: 'Do customers return for meaningful jobs?' },
      { label: 'Deepen', a: 'Balances and relevant cross-sell', b: 'Is the bank becoming primary?' },
      { label: 'Return', a: 'Risk-adjusted lifetime contribution', b: 'Does value exceed acquisition and platform cost?' },
    ], takeaway: 'A cheap transaction is not necessarily a profitable customer relationship.' }),
    visualHeading: 'Channel economics scorecard', visualIntro: 'The scorecard connects cost metrics to relationship and risk outcomes.', imageAlt: 'Table of acquisition, service, trust, retention, cross-sell and return measures.',
    statTiles: [s(undefined, 'CAC', 'Acquisition cost', 'Keep the denominator consistent and include paid plus partner cost.'), s(undefined, 'Cost-to-serve', 'Full journey cost', 'Include exceptions, support and shared infrastructure.'), s(undefined, 'Primary status', 'Balances + meaningful activity', 'More useful than account opening alone.')],
    statsNote: 'The research did not verify bank-level cost-per-channel or digital-active-user benchmarks.',
    keyTerms: [t('Cost-to-serve', 'The end-to-end cost of completing and supporting customer jobs.'), t('Funded activation', 'A newly opened relationship that receives funds and begins meaningful use.'), t('Marginal transaction cost', 'The incremental cost of processing one additional transaction.')],
    recap: ['Transaction cost and customer CAC are different.', 'Exceptions belong in total cost-to-serve.', 'Retention and balances determine franchise value.'], chapterRecap: 'Channel strategy must optimize risk-adjusted lifetime relationship value, not isolated digital volume.', deepDiveTitle: 'Fixed, variable and failure cost',
    deepDive: ['Branches and platforms both have fixed costs; digital journeys often have low marginal transaction cost but meaningful technology, security and compliance expense. Allocate fixed cost transparently and test economics at realistic scale.', 'Measure failure demand—the contacts, retries and manual work created when a journey fails. Eliminating failure can improve both customer trust and CIR.'],
    evidence: 'NAPAS evidence supports the shared-rail context; all bank-specific unit-cost fields remain intentionally unquantified.', sourceIds: ['cb-m03-s09']
  }),
];

const L36 = '3.6 Industry Ecosystem & Stakeholders';
const deck36 = [
  bankingChapter({
    title: 'Map the banking ecosystem', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '9 min',
    objective: 'Identify the public, market and infrastructure actors that shape a commercial bank.',
    mateIntro: 'A bank’s outcome is never produced by management alone. Rules, data, payment rails, counterparties, investors and public confidence all shape what the bank can do.',
    keyInsight: 'Commercial banking is an ecosystem: regulation, confidence, information, infrastructure and capital interact around each institution.',
    what: 'Key actors include SBV, Deposit Insurance of Vietnam, CIC, VAMC, NAPAS, interbank and correspondent banks, auditors, rating agencies, strategic investors, customers, employees, shareholders and international standard setters.',
    how: 'SBV licenses and supervises; DIV supports depositor protection; information and bad-debt institutions support risk management; NAPAS connects payment activity; markets and investors provide funding, capital and external discipline.',
    why: 'A business-model analysis that ignores the ecosystem misses legal constraints, shared dependencies, confidence mechanisms and sources of systemic risk.',
    global: 'BIS, the Basel Committee and FSB shape international prudential and resolution expectations that jurisdictions implement through local law and supervision.',
    vietnam: 'Vietnam’s ecosystem combines SBV oversight, DIV protection, national payment infrastructure, state and private banks, foreign strategic capital and specialized institutions.',
    visualKind: v('cb-m3-36-01-ecosystem', { layout: 'mindmap', variant: 'orbit', title: 'Vietnam banking ecosystem', kicker: 'Rules, confidence, data, rails and capital', center: 'Commercial bank', centerSub: 'Serve customers • manage risk', tagLabel: 'System role', rows: [
      { label: 'SBV', a: 'Central bank, licensing and supervision', b: 'Rules + stability oversight' },
      { label: 'DIV', a: 'Deposit-insurance institution', b: 'Depositor-protection layer' },
      { label: 'CIC / VAMC', a: 'Credit information and bad-debt ecosystem', b: 'Risk information + resolution support' },
      { label: 'NAPAS', a: 'Shared payment and switching infrastructure', b: 'Interoperable transactions' },
      { label: 'Markets / investors', a: 'Interbank funding, capital and strategic stakes', b: 'Liquidity + loss-absorbing capacity' },
      { label: 'Assurance / standards', a: 'Auditors, ratings, BIS/BCBS/FSB', b: 'Transparency + external benchmarks' },
    ], takeaway: 'Map the ecosystem before judging a bank’s strategy or resilience.' }),
    visualHeading: 'Banking ecosystem map', visualIntro: 'The map separates institutions by their system role without assigning unverified legal powers.', imageAlt: 'Orbit diagram of Vietnam banking ecosystem stakeholders.',
    statTiles: [s('15%', 'SMBC stake in VPBank', '2023 transaction', 'Approximately US$1.5bn, snippet-verified secondary evidence.'), s('68', 'NAPAS members', 'Current site, 2026', 'Participants in shared payment infrastructure.'), s(undefined, 'Basel', 'International standard setting', 'Not automatically identical to local operative requirements.')],
    statsNote: 'The strategic-investment fact is historical; Mizuho’s current Vietcombank percentage was not verified and is not shown.',
    keyTerms: [t('Correspondent bank', 'A bank providing services to another bank, often for cross-border payments or market access.'), t('Credit bureau', 'An institution collecting and sharing credit information under applicable rules.'), t('Strategic investor', 'An investor expected to contribute capital and potentially capabilities or relationships.')],
    recap: ['Banks depend on public and private ecosystem actors.', 'Shared rails and information shape competition.', 'International standards require local implementation.'], chapterRecap: 'Ecosystem mapping reveals constraints, dependencies and confidence mechanisms outside the bank.', deepDiveTitle: 'Five ecosystem questions',
    deepDive: ['For any case, ask: Who sets the rules? Who provides confidence? Who supplies data? Who operates shared infrastructure? Who supplies funding and capital? Then identify which relationships are substitutable and which are systemic dependencies.', 'Strategic investors can contribute capital and capabilities, but ownership facts must be sourced by transaction date and current holdings should be reverified before use.'],
    evidence: 'SMBC transaction facts are snippet-only; NAPAS is official full text; no unverified CIC or VAMC operating statistic is used.', sourceIds: ['cb-m03-s03', 'cb-m03-s09', 'cb-m03-s12']
  }),
  bankingChapter({
    title: 'How stakeholders interact under stress', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '9 min',
    objective: 'Trace information, liquidity, control and confidence flows among stakeholders in normal conditions and distress.',
    mateIntro: 'Bank distress is rarely one event. It is a sequence: credit losses, funding pressure, supervisory escalation, customer anxiety and coordinated intervention can reinforce—or contain—one another.',
    keyInsight: 'Financial stability depends on coordinated information, liquidity, supervision, loss absorption and communication—not on one actor guaranteeing every outcome.',
    what: 'Customers supply deposits and demand payments; borrowers create credit exposure; markets and other banks provide liquidity; supervisors monitor prudential health; auditors and ratings add information; capital absorbs losses; safety-net institutions support confidence within defined mandates.',
    how: 'Stress travels through asset losses, collateral, funding withdrawals, payment disruption and expectations. Controls include risk limits, liquidity buffers, capital, early intervention, special control and structured resolution approaches.',
    why: 'Banks are interconnected and confidence-sensitive. Protecting critical functions and eligible depositors is different from protecting shareholders from loss.',
    global: 'Post-crisis frameworks seek continuity of critical functions and credible loss allocation while reducing expectations of automatic taxpayer bailout.',
    vietnam: 'Vietnam has used restructuring, special-control and historical compulsory-transfer or “zero-dong” acquisition approaches. History is context, not a rule that predicts the next case.',
    visualKind: v('cb-m3-36-02-interactions', { layout: 'steps', title: 'From normal banking to stability response', kicker: 'A conceptual interaction map—not a legal decision tree', tagLabel: 'Primary concern', steps: [
      { label: 'Normal operation', detail: 'Deposits, lending and payments function', tag: 'Service + prudent risk' },
      { label: 'Loss signal', detail: 'Asset quality or market value weakens', tag: 'Measurement + disclosure' },
      { label: 'Funding pressure', detail: 'Liquidity and confidence deteriorate', tag: 'Buffers + contingency funding' },
      { label: 'Supervisory escalation', detail: 'Intervention or special control may intensify', tag: 'Stability + legal mandate' },
      { label: 'Restructuring / resolution', detail: 'Critical functions and losses are addressed', tag: 'Continuity + allocation' },
      { label: 'Depositor protection', detail: 'Insurance applies within verified scope and limit', tag: 'Confidence—not shareholder guarantee' },
    ], note: 'Exact triggers, powers and sequencing depend on operative law and must not be inferred from this framework.', takeaway: 'Distress management protects system functions under law; it does not promise every stakeholder a loss-free outcome.' }),
    visualHeading: 'Stakeholder interaction under stress', visualIntro: 'The flow teaches mechanisms while clearly stopping short of unverified legal detail.', imageAlt: 'Conceptual bank distress and financial stability response framework.',
    statTiles: [s(undefined, 'Liquidity', 'Ability to meet obligations', 'Different from solvency and profitability.'), s(undefined, 'Solvency', 'Assets and capital absorb losses', 'A solvent institution can still face liquidity stress.'), s(undefined, 'Critical functions', 'Payments and essential services', 'Continuity is a stability objective, not a shareholder guarantee.')],
    statsNote: 'No specific Law 96/2025 resolution power or special-loan provision is asserted.',
    keyTerms: [t('Special control', 'An intensified supervisory status for a troubled institution under applicable law; exact powers require primary legal verification.'), t('Resolution', 'An organized process for addressing a failing financial institution while managing losses and critical functions.'), t('Moral hazard', 'Greater risk-taking caused by an expectation that losses will be protected.')],
    recap: ['Liquidity and solvency are different.', 'Distress response involves several actors.', 'Depositor protection is not shareholder protection.', 'Historical tools are not automatic current rules.'], chapterRecap: 'Financial stability uses layered controls and lawful intervention; outcomes depend on verified mandates and facts.', deepDiveTitle: 'Avoid the bailout binary',
    deepDive: ['“Bailout or collapse” is a false binary. Early intervention, capital actions, restructuring, transfer and resolution approaches can sit between normal operation and liquidation. The legal route is jurisdiction- and case-specific.', 'Historical zero-dong acquisitions explain prior restructuring experience, but they should not be presented as an automatic or universally available response today.'],
    evidence: 'Law 32/2024 and secondary commentary support high-level intervention framing. Law 96/2025 primary text was inaccessible; no detailed provision is taught.', sourceIds: ['cb-m03-s03', 'cb-m03-s04', 'cb-m03-s20'],
    restriction: 'Detailed Law 96/2025 resolution and special-loan provisions were not verified from primary text.'
  }),
  bankingChapter({
    title: 'Deposit insurance and the protection boundary', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '11 min',
    objective: 'Explain the purpose and limit of deposit insurance while separating verified rules from unresolved legal detail.',
    mateIntro: 'Deposit insurance supports confidence, but it is not a promise that every balance, investment or shareholder is made whole. The protection boundary matters most when stress arrives.',
    keyInsight: 'Vietnam’s ordinary insurance limit is VND350 million per depositor per insured institution, principal plus interest, effective 13 July 2026; the mechanism protects covered deposits within a cap—not shareholders or all financial claims.',
    what: 'Deposit insurance is a safety-net mechanism funded through premiums and designed to protect depositors within defined legal scope, reinforce confidence and support stability. It is capped, so balances above the limit may remain exposed.',
    how: 'The verified current limit is VND350 million per depositor per insured institution, including principal and interest, effective 13 July 2026 under Circular 05/2026/TT-NHNN. The prior VND125 million limit applied from 12 December 2021 through 12 July 2026.',
    why: 'A clear limit can reduce panic while preserving the distinction between protected deposits, other claims and ownership capital. Shareholders remain risk-bearing owners; insurance does not guarantee their investment.',
    global: 'Deposit-insurance systems are commonly one layer beside supervision, liquidity support and resolution; design differs by jurisdiction.',
    vietnam: 'DIV’s official page confirms the new cap and transition. Exact eligible-deposit scope, participating-institution definitions, payout triggers and exceptions were not verified from the operative law and remain under review.',
    visualKind: v('cb-m3-36-03-protection', { layout: 'pyramid', title: 'Financial-stability protection framework', kicker: 'Layers of prevention, intervention and protection', tagLabel: 'Purpose', rows: [
      { label: 'Sound governance & risk management', a: 'Prevent avoidable loss and concentration', b: 'Institution-level resilience' },
      { label: 'Supervision, capital & liquidity', a: 'Detect weakness and absorb stress', b: 'Early containment' },
      { label: 'Intervention / special control', a: 'Escalate oversight under applicable law', b: 'Stabilize critical functions' },
      { label: 'Restructuring / resolution', a: 'Address failure and allocate losses', b: 'Orderly continuity' },
      { label: 'Deposit insurance', a: 'Pay eligible covered deposits within the legal cap', b: 'Depositor confidence—not investor guarantee' },
    ], takeaway: 'Safety nets are layered and bounded; none makes every stakeholder risk-free.' }),
    visualHeading: 'Deposit insurance and stability framework', visualIntro: 'The layered visual distinguishes prevention, intervention, resolution and capped depositor protection.', imageAlt: 'Pyramid of bank stability safeguards ending in capped deposit insurance.',
    statTiles: [s('VND350m', 'Current ordinary limit', 'Effective 13 Jul 2026', 'Per depositor per insured institution, principal plus interest, from DIV official text.'), s('VND125m', 'Historical prior limit', '12 Dec 2021–12 Jul 2026', 'Retained only to explain the transition.'), s('+180%', 'Increase', 'Official DIV description', 'Comparison of 350m with the historical 125m limit.')],
    statsNote: 'Do not turn the verified cap into unverified advice about which depositor, deposit or event qualifies. Exact legal scope remains under review.',
    keyTerms: [t('Deposit-insurance limit', 'The maximum insured amount under the applicable rule, subject to legal scope.'), t('Insured institution', 'An institution within the deposit-insurance regime; the exact legal definition is not taught here.'), t('Loss-absorbing capital', 'Capital intended to bear losses before protected depositor claims.')],
    recap: ['VND350m replaces VND125m from 13 July 2026.', 'The cap includes principal and interest.', 'Insurance is capped and does not protect shareholders.', 'Eligibility and payout details remain restricted.'], chapterRecap: 'Teach the verified amount, date and protection purpose—then stop where primary legal verification stops.', deepDiveTitle: 'Protection is not a blanket guarantee',
    deepDive: ['The cap is per depositor per insured institution according to the official DIV update. It does not imply that every product sold by a bank is a covered deposit, nor that investments are insured.', 'The detailed operative articles of Law 111/2025/QH15 were not read in primary text during research. Do not state precise eligibility, participation, trigger, exception or payout-procedure rules as confirmed law.', 'A secondary report placed DIV reserves at approximately VND73.6tn in 2024, but that figure is intentionally excluded from the core lesson because it requires reconfirmation against DIV’s own disclosure.'],
    evidence: 'The VND350m cap, principal-plus-interest scope, effective date, prior VND125m period and stated 180% increase come from DIV’s official full-text page.', sourceIds: ['cb-m03-s16', 'cb-m03-s13', 'cb-m03-s14'],
    restriction: 'Exact eligible deposits and depositors, participating institutions, payout triggers, exceptions and detailed resolution powers were not verified from operative primary law.'
  }),
];

export const CB_LESSON_34: BankingLessonBundle = { deck: deck34, quiz: bankingQuiz('cb-m3-l34', deck34), takeaways: { learned: 'You can calculate NII and NIM, trace a bank P&L through provisions and read balance-sheet stocks beside income-statement flows.', keyTakeaways: ['NIM = NII ÷ average interest-earning assets.', 'NIM is not a loan-deposit rate gap or net profit margin.', 'Loan growth can be offset by funding and provisions.', 'Compare banks only on matched periods, bases and definitions.', 'NPL, provision expense, cost of risk and coverage are distinct.'], businessImplications: 'Profit analysis should move from earning assets and NIM through fees, OPEX and credit cost to ROA, ROE and capital consumption.', remember: 'Higher lending growth or higher NIM does not necessarily produce higher net profit.', nextLesson: L35 } };
export const CB_LESSON_35: BankingLessonBundle = { deck: deck35, quiz: bankingQuiz('cb-m3-l35', deck35), takeaways: { learned: 'You can map bank channels, design omnichannel journeys and evaluate distribution using total relationship economics.', keyTakeaways: ['Distribution serves acquisition, transaction, advice and recovery.', 'Physical and digital channels are complements.', 'Shared infrastructure is not a bank-owned channel.', 'CAC, cost-to-serve, retention and risk belong together.'], businessImplications: 'Banks should optimize completed, safe customer journeys and risk-adjusted lifetime value rather than isolated channel traffic.', remember: 'A cheap transaction is not automatically a profitable relationship.', nextLesson: L36 } };
export const CB_LESSON_36: BankingLessonBundle = { deck: deck36, quiz: bankingQuiz('cb-m3-l36', deck36), takeaways: { learned: 'You can map the banking ecosystem, explain stakeholder interaction under stress and teach Vietnam’s deposit-insurance boundary with the correct current limit.', keyTakeaways: ['Banking stability is an ecosystem outcome.', 'Liquidity, solvency and profitability differ.', 'The ordinary limit is VND350m from 13 July 2026.', 'Deposit insurance protects covered deposits within a cap—not shareholders.', 'Unverified legal details remain under review.'], businessImplications: 'Strategy and resilience analysis should include supervision, confidence, infrastructure, information, capital and lawful distress management.', remember: 'State only the verified protection boundary; do not invent eligibility or resolution rules.', nextLesson: 'Module 04 — Competitive Landscape' } };
