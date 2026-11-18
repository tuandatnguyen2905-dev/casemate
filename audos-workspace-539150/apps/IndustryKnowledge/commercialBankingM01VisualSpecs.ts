import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Commercial Banking Module 01, keyed by visualKind. */
export const CB_M1_VISUALS: Record<string, ChapterVisual> = {
  'cb-m1-11-01-core': {
    heading: 'A loan creates a deposit, not a profit',
    intro: 'Follow money from savers to a borrower. Approving a loan expands both sides of the balance sheet; profit only comes later, from interest and fees.',
    spec: {
      layout: 'flow', title: 'What Is Commercial Banking?', kicker: '',
      steps: [
        { label: 'Depositors fund the bank', detail: 'Households and firms hold current, savings and term deposits, which are bank liabilities', kind: 'stage' },
        { label: 'Bank pools and assesses', detail: 'Savers need not judge each borrower; the bank carries and prices that risk', kind: 'stage' },
        { label: 'Loan and deposit created together', detail: 'Approval records the borrower’s obligation as an asset and credits matching deposit money', kind: 'stage' },
        { label: 'Money moves through payments', detail: 'Borrowers spend and invest; transaction customers move money on bank rails', kind: 'stage' },
        { label: 'Profit only if income covers costs', detail: 'Interest and fees must exceed funding cost, operating cost and credit losses', kind: 'outcome' },
      ],
      note: 'Capital, liquidity rules and central-bank policy constrain every step. Roughly 87% of Vietnamese adults held a payment account in 2024 (secondary source citing SBV), a reach indicator, not a profitability measure.',
      takeaway: 'A commercial bank turns deposits into credit and payments on one regulated balance sheet, carrying the risk between saver and borrower.',
    },
  },
  'cb-m1-11-02-unique': {
    heading: 'The same mismatch that earns money can sink a bank',
    intro: 'Each row pairs a feature of the bank balance sheet with the safeguard that stops it turning into a run or a loss.',
    spec: {
      layout: 'compare', title: 'What Makes Commercial Banking Unique?', kicker: '',
      leftTitle: 'Balance-sheet transformation', rightTitle: 'Safeguard that must accompany it',
      rows: [
        { label: 'Liquidity transformation', a: 'Deposits stay withdrawable while loans cannot become cash immediately', b: 'Liquid assets that meet outflows' },
        { label: 'Maturity transformation', a: 'Short-term funding supports longer-term loans', b: 'Stress-liquidity requirements and supervision of risk-taking' },
        { label: 'Leverage', a: 'Assets funded mainly by deposits and borrowings, with equity beneath', b: 'Loss-absorbing capital; Basel minimum total ratio of 8% of risk-weighted assets' },
        { label: 'Depositor confidence', a: 'A confidence shock can trigger withdrawals faster than loans are collected', b: 'Licensing and prudential oversight, such as the SBV’s in Vietnam' },
      ],
      note: 'The 8% figure is a regulatory floor before buffers, not accounting equity divided by assets. Vietnam’s domestic rules differ from the full Basel III framework.',
      takeaway: 'Funding capacity and solvency capacity are separate questions: a bank can hold abundant deposits yet lack capital for more risky lending.',
    },
  },
  'cb-m1-11-03-boundaries': {
    heading: 'Ask who takes public deposits before comparing products',
    intro: 'A card, an e-wallet and a consumer loan can look alike on screen. Apply the deposit-taking test first, then see which engine each neighbour runs instead.',
    spec: {
      layout: 'decision', title: 'Where Does Commercial Banking Begin and End?', kicker: '',
      root: { label: 'A firm offering payments or credit', detail: 'Classify the institution first and the product second' },
      question: 'Is it licensed to take public deposits and lend from one regulated balance sheet?',
      branches: [
        { condition: 'Yes', outcome: 'Commercial bank', detail: 'Deposits, lending and transaction services, as at Vietcombank', tone: 'positive' },
        { condition: 'No: earns advisory and underwriting fees', outcome: 'Investment bank', detail: 'Advisory, securities underwriting and market activities' },
        { condition: 'No: lends from equity and wholesale funding', outcome: 'Consumer-finance company', detail: 'Lends without public deposits, as FE Credit does' },
        { condition: 'No: pools risk through premiums', outcome: 'Insurer', detail: 'Long-duration risk with different liabilities and regulation' },
        { condition: 'No: issues currency and supervises', outcome: 'Central bank', detail: 'Conducts monetary policy and supervises the banking system' },
        { condition: 'No: initiates payments on bank rails', outcome: 'Payment platform or fintech', detail: 'Interfaces such as MoMo and ZaloPay, rather than insured deposits' },
      ],
      note: 'Three boundary questions: who is licensed, who funds the activity and who carries the risk.',
      takeaway: 'Product overlap does not make licences or balance sheets equivalent, so market sizing and peer comparisons start with the licence.',
    },
  },
  'cb-m1-11-04-products': {
    heading: 'Products that fund, lend and serve the same customer',
    intro: 'Sort the bank’s products by what each does: gather funding, deploy credit, move money or manage risk. Then notice that one business customer may use every family.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Banking Products and Services', kicker: '',
      root: 'One banking relationship', rootDetail: 'The same customer can be funding provider, credit user and transaction user',
      groups: [
        { label: 'Deposits', detail: 'Stable funding and customer liquidity', items: ['Current accounts', 'Savings accounts', 'Term deposits'] },
        { label: 'Loans', detail: 'Interest income from the balance sheet', items: ['Mortgages', 'Cards and overdrafts', 'Retail, SME and corporate loans'] },
        { label: 'Payments', detail: 'Frequent activity and fee income', items: ['Transfers', 'Payroll', 'Collections'] },
        { label: 'Trade finance', detail: 'Reduces payment and performance risk in commerce', items: ['Letters of credit', 'Guarantees'] },
        { label: 'Treasury services', detail: 'Control over cash and currencies', items: ['Cash management', 'Foreign exchange'] },
      ],
      note: 'Two revenue streams result: net interest income and non-interest fees. Product definitions vary by institution and jurisdiction.',
      takeaway: 'Responsible relationship depth, not forced bundling, brings low-cost balances, fee income and better credit information from one customer.',
    },
  },
  'cb-m1-11-05-customers': {
    heading: 'Same bank, three ways of serving and judging customers',
    intro: 'A student, a family shop and a multinational need different credit decisions and service. Compare what each segment asks for and how the bank responds.',
    spec: {
      layout: 'table', title: 'Who Are Commercial Banks\' Customers?', kicker: '',
      headers: ['Segment', 'Typical needs', 'How the bank serves and assesses'],
      rows: [
        { label: 'Retail', a: 'Accounts, cards, mortgages and personal finance for individuals and households', b: 'High-volume, standardised products' },
        { label: 'SME', a: 'Fast working-capital decisions; often owner-dependent with less formal reporting', b: 'Financial data blended with relationship judgement' },
        { label: 'Corporate and institutional', a: 'Bespoke lending, cash, trade and treasury across multiple entities', b: 'Tailored structures, covenants and specialist teams' },
      ],
      note: 'Every segment can be a depositor, borrower and transaction customer. Roughly 87% of Vietnamese adults held a payment account in 2024, a reach measure from a secondary source citing SBV.',
      takeaway: 'Using one process for every segment either raises SME cost-to-serve or understates corporate complexity.',
    },
  },
  'cb-m1-12-01-origins': {
    heading: 'Private lending meets public stability architecture',
    intro: 'Banking grew from safekeeping into scaled intermediation, then settled into two complementary sides. Look at who serves customers and who stabilises the system.',
    spec: {
      layout: 'pathway', title: 'From Early Banking to Modern Financial Institutions', kicker: '',
      trunk: [
        { label: 'Safekeeping, exchange and lending', detail: 'Store value safely and lend it productively', kind: 'stage' },
        { label: 'Scaled intermediation', detail: 'Industrialisation expands demand for deposits, business credit and payments', kind: 'stage' },
        { label: 'Standard accounts and payment networks', detail: 'Larger institutions standardise accounts and credit; clearing connects participants', kind: 'stage' },
      ],
      optionsLabel: 'Two sides of a modern system',
      options: [
        { label: 'Commercial institutions', detail: 'Serve customers, price and extend loans, and take commercial credit risk' },
        { label: 'Public monetary and supervisory authorities', detail: 'Central banks act as lender of last resort, run monetary policy and support supervision' },
      ],
      note: 'The Bank of England’s founding in 1694 is a widely recognised milestone, but the research flags it for primary re-verification. Vietnam later moved from mono-tier to two-tier banking.',
      takeaway: 'Scale made banking more useful and more systemic: one failure could reach depositors, payments and credit beyond the institution.',
    },
  },
  'cb-m1-12-02-crisis': {
    heading: 'Each crisis left a safeguard behind',
    intro: 'Read each rule as the memory of a failure it was designed to stop. Notice which failure channel each reform addresses.',
    spec: {
      layout: 'timeline', title: 'Banking Regulation, Crises, and Financial Stability', kicker: '',
      events: [
        { period: 'Great Depression', label: 'Depositor protection and structural reform', detail: 'Major reforms in the United States', status: 'historical' },
        { period: '1988', label: 'Basel I published', detail: 'The first common international bank capital standard', status: 'historical' },
        { period: '2008', label: 'Global financial crisis', detail: 'Exposed gaps in capital, leverage, liquidity and resolvability', status: 'historical' },
        { period: '2010', label: 'Basel III reforms introduced', detail: 'Tougher capital, leverage and liquidity disciplines; total capital minimum of 8% of RWA before buffers', status: 'historical' },
        { period: '2024', label: 'Vietnam’s Law on Credit Institutions', detail: 'Part of a framework with SBV supervision and deposit insurance; unresolved provisions are not taught here', status: 'historical' },
      ],
      note: 'Basel dates and the 8% minimum follow the BIS-linked research; national implementation can differ.',
      takeaway: 'Capital, liquidity, supervision and resolution each answer a different failure channel; no single ratio makes a bank safe.',
    },
  },
  'cb-m1-12-03-digital': {
    heading: 'Screens change the channel; the balance sheet stays',
    intro: 'Compare the branch-led bank with the digital, cross-border one. Cost and reach improve, but the risks that matter most change too.',
    spec: {
      layout: 'compare', title: 'The Rise of Digital and Global Banking', kicker: '',
      leftTitle: 'Branch-led banking', rightTitle: 'Digital and connected banking',
      rows: [
        { label: 'Access', a: 'A branch visit to withdraw cash, send money or apply for a loan', b: 'Mobile apps, QR payments and digital onboarding' },
        { label: 'Processing', a: 'Manual servicing', b: 'Automated decisions and API-connected services' },
        { label: 'Cost to serve', a: 'Growth tied to physical footprint', b: 'Lower marginal cost for routine service' },
        { label: 'Risks in focus', a: 'Branch and process control', b: 'Cyber, fraud, privacy, outsourcing and operational resilience' },
        { label: 'Geography', a: 'Local customer operations', b: 'Local licences joined to global treasury, correspondent and trade-finance networks' },
      ],
      note: 'Roughly 87% of Vietnamese adults held a payment account in 2024 (Ascentium citing SBV); branches and relationship managers still handle complex SME and corporate needs.',
      takeaway: 'A digital bank may have a lighter footprint, but lending still consumes funding and capital and creates credit risk.',
    },
  },
  'cb-m1-12-04-vietnam-history': {
    heading: 'How Vietnam split the central bank from customer banking',
    intro: 'Follow the reforms behind today’s mix of state-controlled, joint-stock and foreign banks. Approximate or unverified timings are flagged in the detail.',
    spec: {
      layout: 'timeline', title: 'The Development of Vietnam\'s Banking System', kicker: '',
      events: [
        { period: 'Before reform', label: 'Mono-tier system', detail: 'The SBV combined central and commercial banking functions', status: 'historical' },
        { period: 'Around 1990 (approximate)', label: 'Two-tier reform', detail: 'Policy and supervision separated from commercial banking; exact ordinance references remain to verify', status: 'historical' },
        { period: 'After the reform', label: 'Market opening', detail: 'Joint-stock and foreign participation diversify institutions and competition', status: 'historical' },
        { period: 'After rapid credit growth', label: 'Bad-debt restructuring', detail: 'Restructuring, VAMC and Basel II-style capital rules; timing pending primary-source verification', status: 'historical' },
        { period: '1 July 2024', label: 'Law No. 32/2024/QH15 takes effect', detail: 'Modernised governance and intervention architecture', status: 'historical' },
        { period: 'Today', label: 'Four commercial-bank categories', detail: 'State-owned, joint-stock, wholly foreign-owned and joint-venture (official SBV taxonomy)', status: 'current' },
      ],
      note: 'The two-tier timing and VAMC context are draft research items pending primary-source verification; the taxonomy and the 2024 law date are cited.',
      takeaway: 'Large state-controlled banks, joint-stock challengers and a strong SBV coexist today because of reform, opening and repeated risk clean-ups.',
    },
  },
  'cb-m1-13-01-global': {
    heading: 'Balance-sheet size is only one of four lenses',
    intro: 'A bank can hold trillions of dollars of assets and still earn thin, risky returns. Build its competitive position from every lens before ranking it.',
    spec: {
      layout: 'driverTree', title: 'Understanding the Global Banking Industry', kicker: '',
      root: { label: 'A bank’s competitive position', detail: 'Set by funding, customer mix, efficiency, risk and regulation, not total assets alone' },
      drivers: [
        { label: 'Scale', detail: 'Assets, loans, deposits and reach; a size measure, not earnings quality' },
        { label: 'Business mix', detail: 'Retail, SME, corporate and wholesale banking; universal banks combine several' },
        { label: 'Market maturity', detail: 'Developed systems are deeper and consolidated; emerging ones grow from lower penetration' },
        { label: 'Risk and rules', detail: 'Capital, data and asset-quality constraints within national and international rules' },
      ],
      note: 'S&P Global’s 2024 ranking put Chinese banks in the top four positions by total assets, with ICBC at an estimated US$6.303tn; JPMorgan Chase was the largest US bank. These are size estimates, not profit.',
      takeaway: 'Compare banks on size together with NIM, ROA, ROE, cost efficiency, NPLs, capital and liquidity.',
    },
  },
  'cb-m1-13-02-balances': {
    heading: 'Stock, flow or income: classify the number first',
    intro: 'Headline banking figures mix balances at a date with activity over a period. Sort each measure before drawing any growth or profitability conclusion.',
    spec: {
      layout: 'taxonomy', title: 'Global Banking Assets, Credit, and Deposits', kicker: '',
      root: 'Banking measures', rootDetail: 'Neither a stock nor a flow is revenue',
      groups: [
        { label: 'Balance-sheet stocks', detail: 'Measured at a point in time', items: ['Total assets', 'Gross loans before provisions', 'Customer deposits, a liability'] },
        { label: 'Flows over a period', detail: 'Activity that changes the stocks', items: ['New disbursement', 'Repayments'] },
        { label: 'Income over a period', detail: 'Earned from using and servicing balances', items: ['Net interest income', 'Fee income'] },
      ],
      note: 'ICBC’s 2024 total assets (estimated US$6.303tn) and Vietnam’s 133% credit-to-GDP at end-September 2024 are both stocks with different scope and purpose; do not compare them or read either as revenue.',
      takeaway: 'A larger loan book can raise risk without raising profit; growth quality depends on pricing, funding, credit losses, cost and capital.',
    },
  },
  'cb-m1-13-03-metrics': {
    heading: 'Read the numerator and denominator before the ratio',
    intro: 'NIM, ROA, ROE, NPL and CAR each answer one question. Check what is divided by what, and where a strong value could mislead.',
    spec: {
      layout: 'table', title: 'How Global Banks Measure Performance', kicker: '',
      headers: ['Ratio', 'Calculation', 'Question it answers'],
      rows: [
        { label: 'NIM', a: 'Net interest income ÷ average interest-earning assets', b: 'How strong are spread economics?' },
        { label: 'ROA', a: 'Net profit ÷ total assets', b: 'How efficiently does the balance sheet earn?' },
        { label: 'ROE', a: 'Net profit ÷ shareholders’ equity', b: 'What do owners earn? Leverage can raise it' },
        { label: 'NPL ratio', a: 'Non-performing loans ÷ gross loans', b: 'How much of the loan book is non-performing?' },
        { label: 'CAR', a: 'Regulatory capital ÷ risk-weighted assets', b: 'How much loss-absorbing capacity supports the risk?' },
      ],
      note: 'Basel III minimums before buffers: CET1 4.5%, Tier 1 6% and total capital 8% of risk-weighted assets. Vietcombank’s end-2024 NPL ratio of 1.0% is the only separately verified Vietnamese bank figure.',
      takeaway: 'A high ROE may come from leverage and a high NIM from high credit losses, so read the ratios together.',
    },
  },
  'cb-m1-13-04-leaders': {
    heading: 'Who holds the largest balance sheets, and what that leaves out',
    intro: 'S&P Global ranks banks by assets converted to US dollars. Read the top three as a scale comparison, not a scorecard for profit or safety.',
    spec: {
      layout: 'table', title: 'Major Global Banking Markets and Institutions', kicker: '',
      headers: ['Bank and position', 'Total assets, 2024 estimate', 'What the figure does not show'],
      rows: [
        { label: 'ICBC, first', a: 'About US$6.303 trillion', b: 'Earnings quality or risk-adjusted return' },
        { label: 'Agricultural Bank of China, second', a: 'US$5.623 trillion', b: 'Loan-book safety or customer franchise' },
        { label: 'China Construction Bank, third', a: 'US$5.400 trillion', b: 'Moves caused only by currency translation' },
      ],
      note: 'All three are S&P Global 2024 asset estimates with the same scope and period; the source page was snippet-verified in the research. Vietnamese banks are much smaller in absolute assets.',
      takeaway: 'Use rankings as an entry point, then read the financial statements, definitions and risk measures behind them.',
    },
  },
  'cb-m1-13-05-stability': {
    heading: 'How one global bank’s distress travels across borders',
    intro: 'A systemically important bank sits between funding markets, payments and counterparties in many countries. See how distress could spread and which standards lean against it.',
    spec: {
      layout: 'ecosystem', title: 'International Banking and Financial Stability', kicker: '',
      center: { label: 'Global systemically important bank', detail: 'Important through size, interconnectedness, substitutability, complexity and cross-border activity' },
      actors: [
        { label: 'Funding markets and depositors', relation: 'Loss of confidence can withdraw funding quickly', flows: ['money', 'risk'] },
        { label: 'Payment systems', relation: 'Critical functions that must keep operating', flows: ['service'] },
        { label: 'Counterparties and asset markets', relation: 'Exposures and asset sales transmit losses', flows: ['risk'] },
        { label: 'Financial Stability Board', relation: 'Identifies G-SIBs: 30 on the 2022 list', flows: ['oversight'] },
        { label: 'Basel standards', relation: 'Capital, plus LCR and NSFR minimums of 100%', flows: ['oversight'] },
        { label: 'Resolution planning', relation: 'Higher loss-absorbency and TLAC keep critical functions running', flows: ['oversight'] },
      ],
      note: 'The G-SIB count is the 2022 list and was not re-pulled. LCR covers 30 days of stressed outflows and NSFR a one-year horizon; these are Basel global standards, not claims about Vietnam.',
      takeaway: 'Resolution planning aims to reduce the need for taxpayer rescue, not to promise that shareholders or creditors avoid losses.',
    },
  },
  'cb-m1-14-01-glance': {
    heading: 'An economy financed mostly through bank balance sheets',
    intro: 'Vietnam relies on banks for most formal financing, so savers, borrowers and the SBV all meet on bank balance sheets. Note the depth figures and their periods.',
    spec: {
      layout: 'ecosystem', title: 'Vietnam\'s Commercial Banking Industry at a Glance', kicker: '',
      center: { label: 'Vietnam’s commercial banks', detail: 'Assets near 196% and credit near 133% of GDP at end-September 2024 (World Bank)' },
      actors: [
        { label: 'Depositors', relation: 'Deposits fund the banks’ lending', flows: ['money'] },
        { label: 'Borrowing households and businesses', relation: 'Outstanding credit grew 15.08% in 2024 (SBV data via Mirae Asset)', flows: ['money', 'risk'] },
        { label: 'State Bank of Vietnam', relation: 'Monetary policy, licensing, prudential rules and bank-specific credit room', flows: ['oversight'] },
        { label: 'Bond and equity markets', relation: 'Alternative financing channels, less dominant than banks', flows: ['money'] },
        { label: 'Policy, cooperative and non-bank institutions', relation: 'Operate alongside commercial banks with other mandates', flows: ['service'] },
      ],
      note: 'The depth ratios are end-September 2024 stocks; credit growth is full-year 2024 year-on-year stock growth, not disbursement. Periods and definitions differ, so do not add or compare them.',
      takeaway: 'Because banks carry so much of the economy’s financing, weaker underwriting or property exposures can transmit losses broadly.',
    },
  },
  'cb-m1-14-02-demand': {
    heading: 'Why rising demand is not the same as safe lending',
    intro: 'Economic growth creates the need for accounts, payments and credit. Follow that demand through affordability, policy limits and the bank’s own risk judgement.',
    spec: {
      layout: 'flow', title: 'Deposits, Lending, and Banking Demand in Vietnam', kicker: '',
      steps: [
        { label: 'Economic activity grows', detail: 'Real GDP grew 7.09% in 2024 (VietnamPlus citing GSO)', kind: 'stage' },
        { label: 'Customers seek banking', detail: 'Accounts, savings, mortgages, consumer credit, working capital and trade services', kind: 'stage' },
        { label: 'Affordability at offered rates', detail: 'Interest rates shape repayment capacity and deposit competition', kind: 'decision' },
        { label: 'SBV credit room', detail: 'Limits how quickly each bank may grow credit, whatever the demand', kind: 'decision' },
        { label: 'Bank prices the risk', detail: 'Risk appetite and expected repayment set approval and price', kind: 'decision' },
        { label: 'Approved lending', detail: 'Outstanding credit grew 15.08% in 2024, a stock-growth figure, not disbursement', kind: 'outcome' },
      ],
      note: 'Roughly 87% of adults held payment accounts in 2024. The GDP, credit and account figures measure different things and are not one causal estimate.',
      takeaway: 'Debt-servicing capacity rests on borrower cash flows, so credit persistently outgrowing GDP deserves attention.',
    },
  },
  'cb-m1-14-03-structure': {
    heading: 'One supervisor, four bank ownership types, several specialised lenders',
    intro: 'A licence decides what an institution may do. Sort Vietnam’s credit institutions by type before comparing their products or economics.',
    spec: {
      layout: 'taxonomy', title: 'Vietnam\'s Banking Institutions and Regulatory Structure', kicker: '',
      root: 'Vietnam’s credit institutions', rootDetail: 'Licensed and supervised by the SBV, which also conducts monetary policy',
      groups: [
        { label: 'Commercial banks', detail: 'Four ownership categories in the official SBV taxonomy', items: ['State-owned', 'Joint-stock', 'Wholly foreign-owned', 'Joint-venture'] },
        { label: 'Policy banks', detail: 'Lend according to public mandates' },
        { label: 'Cooperative institutions', detail: 'Support member finance', items: ['Cooperative banks', 'People’s Credit Funds'] },
        { label: 'Non-bank credit institutions', detail: 'Different permissions and funding models', items: ['Finance companies', 'Leasing companies'] },
      ],
      note: 'The Law on Credit Institutions 2024 became effective on 1 July 2024. Category counts describe the taxonomy, not the number of licensed institutions, which was not verified.',
      takeaway: 'Ownership gives institutional context, but banks in one category still differ in funding, digital capability, risk and profitability.',
    },
  },
  'cb-m1-14-04-banks': {
    heading: 'Scale and mandate versus speed and segment focus',
    intro: 'Vietnam’s best-known banks win in different ways. Compare the two archetypes, then test each with same-period evidence rather than a league table.',
    spec: {
      layout: 'compare', title: 'Major Commercial Banks in Vietnam', kicker: '',
      leftTitle: 'State-controlled banks', rightTitle: 'Joint-stock banks',
      rows: [
        { label: 'Examples', a: 'Agribank, BIDV, VietinBank, Vietcombank', b: 'Techcombank, MB, VPBank, ACB' },
        { label: 'Typical advantages', a: 'Scale, distribution, institutional funding and public-policy roles', b: 'Digital, retail, SME, ecosystem or fee capabilities' },
        { label: 'Evidence still needed', a: 'Same-period funding, costs, provisions, returns and capital', b: 'Same-period funding, NIM, asset quality and capital' },
        { label: 'Do not assume', a: 'Ownership proves performance', b: 'Digital growth proves profitability' },
      ],
      note: 'Fitch reported Vietcombank’s NPL ratio at 1.0% at end-2024, below the industry average; comparable audited 2024 metrics for the other named banks were not verified, so no ranking is implied.',
      takeaway: 'Explain why a bank’s model fits a customer segment and risk appetite instead of treating the market as one leaderboard.',
    },
  },
  'cb-m1-15-01-economic': {
    heading: 'Three channels from the macro economy to bank returns',
    intro: 'Growth, rates and inflation reach a bank through demand, margin and credit losses at once. Follow every channel before deciding the net effect on profit.',
    spec: {
      layout: 'driverTree', title: 'Economic Drivers of Commercial Banking', kicker: '',
      root: { label: 'Bank returns (ROA and ROE)', detail: 'Leveraged, so small changes in spreads or credit losses matter' },
      drivers: [
        { label: 'Demand for credit, deposits and fees', op: '+', detail: 'Rises with GDP, employment, income and investment', children: [{ label: 'Real GDP growth', detail: '7.09% in 2024 (VietnamPlus citing GSO)' }] },
        { label: 'Net interest margin', op: '+', detail: 'Depends on how quickly assets and deposits reprice', children: [{ label: 'Inflation and rates', detail: 'H1-2024 CPI averaged 4.08% year on year, a half-year figure' }] },
        { label: 'Credit losses', op: '−', detail: 'Downturns weaken repayment and collateral values, raising provisions' },
      ],
      note: 'The GDP and CPI figures cover different periods and are not a matched full-year pair.',
      takeaway: 'Higher rates can widen a spread, yet deposit competition, lower volume or higher provisions can offset it.',
    },
  },
  'cb-m1-15-02-regulation': {
    heading: 'A bank can run out of room before it runs out of customers',
    intro: 'Profitable loan demand still has to clear credit-room, capital, liquidity and conduct limits. See which constraint stops growth and what the bank must do next.',
    spec: {
      layout: 'decision', title: 'Regulation, Monetary Policy, and Banking Supervision', kicker: '',
      root: { label: 'Profitable loan demand', detail: 'New lending adds risk-weighted assets and liquidity needs' },
      question: 'Which constraint binds first?',
      branches: [
        { condition: 'SBV credit room is used up', outcome: 'Loan growth stops', detail: 'A direct bank-by-bank limit in Vietnam, independent of demand', tone: 'negative' },
        { condition: 'Capital grows slower than risk-weighted assets', outcome: 'Retain earnings or raise capital', detail: 'CAR falls; the Basel minimum total ratio is 8% before buffers', tone: 'caution' },
        { condition: 'Liquid assets fall short', outcome: 'Hold more high-quality liquid assets', detail: 'Basel LCR minimum of 100% against 30-day stressed outflows', tone: 'caution' },
        { condition: 'AML/KYC checks fail', outcome: 'Onboarding cannot proceed', detail: 'Conduct and financial-crime rules shape the customer journey', tone: 'negative' },
        { condition: 'All constraints clear', outcome: 'Lending can grow', detail: 'Supervisors still monitor ratios and intervene when risk rises', tone: 'positive' },
      ],
      note: 'Basel ratios are global standards, not claims that Vietnam applies every Basel III element identically. Law No. 32/2024/QH15 became effective on 1 July 2024.',
      takeaway: 'Regulation and monetary policy set the price, quantity and safety limits within which commercial strategy operates.',
    },
  },
  'cb-m1-15-03-social': {
    heading: 'From an opened account to a trusted primary relationship',
    intro: 'Owning an account is only the first step. Follow how access becomes active, primary and responsibly deepened use.',
    spec: {
      layout: 'flow', title: 'Social and Demographic Changes in Banking', kicker: '',
      steps: [
        { label: 'Access', detail: 'A customer can open and reach an account, digitally or through assisted channels', kind: 'stage' },
        { label: 'Activation', detail: 'Money arrives and the first meaningful transactions happen', kind: 'stage' },
        { label: 'Primary account', detail: 'Salary arrives, bills are paid and savings build at this bank', kind: 'stage' },
        { label: 'Responsible deepening', detail: 'Credit and advice fit the customer’s needs, knowledge and capacity', kind: 'outcome' },
      ],
      note: 'Roughly 87% of adults held a payment account in 2024 (reported ownership), above the recorded 2025 national goal of 80% (a policy goal). Ownership does not prove active use or suitability.',
      takeaway: 'Trust and convenience make an account primary, while unsuitable credit or poor design can undermine inclusion and reputation.',
    },
  },
  'cb-m1-15-04-technology': {
    heading: 'Every digital gain needs a matching control',
    intro: 'Faster service is valuable only if the bank still identifies the customer, detects fraud and prices risk. Read each lever across from its value to its control.',
    spec: {
      layout: 'table', title: 'Technology and Digital Banking Innovation', kicker: '',
      headers: ['Technology lever', 'Value it can create', 'Control it requires'],
      rows: [
        { label: 'Mobile and eKYC', a: 'Faster access and lower cost-to-serve', b: 'Identity and fraud checks; track verified completion, not downloads' },
        { label: 'Workflow automation', a: 'Repeatable steps handled without manual hand-offs', b: 'Exception handling, since automation scales errors too' },
        { label: 'AI and analytics', a: 'Fraud detection, service and decision support', b: 'Model governance, explainability and drift monitoring by customer group' },
        { label: 'APIs and partners', a: 'Connected services and wider reach', b: 'Security and third-party risk management' },
        { label: 'Modern infrastructure', a: 'Scalability for growing digital volumes', b: 'Operational resilience for critical processes' },
      ],
      note: 'Roughly 87% of adults held a payment account in 2024: reach context for digital banking, not a digital-active-user statistic.',
      takeaway: 'Technology creates banking value when it improves access, decisions, cost or control without removing judgement.',
    },
  },
};

/** visualKinds of Module 01 chapters held because their text is marked Verification Required. */
export const CB_M1_HELD_KINDS: readonly string[] = ['cb-m1-14-05-transformation', 'cb-m1-15-05-stability'];
