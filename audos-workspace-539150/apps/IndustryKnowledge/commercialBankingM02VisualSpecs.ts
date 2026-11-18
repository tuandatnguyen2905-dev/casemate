import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Commercial Banking Module 02, keyed by visualKind. */
export const CB_M2_VISUALS: Record<string, ChapterVisual> = {
  'cb-m2-21-01-chain': {
    heading: 'Funding goes in, priced risk and service come out',
    intro: 'A bank has no physical production line. Follow funding through allocation, service and earnings, and notice that risk control sits on every stage rather than at the end.',
    spec: {
      layout: 'flow', title: 'How the Commercial Banking Value Chain Works', kicker: '',
      steps: [
        { label: 'Raise funding', detail: 'Deposits, wholesale liabilities and capital supply the raw material', kind: 'stage' },
        { label: 'Allocate and underwrite', detail: 'Choose assets, borrowers, prices and limits; decide which risk to accept', kind: 'stage' },
        { label: 'Disburse and service', detail: 'Deliver credit, accounts, payments and support through channels', kind: 'stage' },
        { label: 'Earn and manage', detail: 'Collect interest spread and fees; manage operating costs and losses', kind: 'stage' },
        { label: 'Recycle and protect', detail: 'Repayments return funding; capital and liquidity protect continuity', kind: 'outcome' },
      ],
      loop: 'Repayments recycle into new lending, and a weak stage spreads: unstable funding limits lending and weak underwriting raises losses.',
      note: 'Risk, compliance, finance, data and regulation run across every stage. Vietnam banking assets were about 196% of GDP at end-September 2024, a World Bank system-depth estimate.',
      takeaway: 'Bank value comes from coordinating funding, risk selection, service and resilience, not from loan volume alone.',
    },
  },
  'cb-m2-21-02-actors': {
    heading: 'Who funds, wins, approves and runs the same loan',
    intro: 'A relationship manager may win the client, but other teams fund, approve and service the loan. See how each group touches the one balance sheet they all share.',
    spec: {
      layout: 'ecosystem', title: 'Who Creates Value Across the Banking System?', kicker: '',
      center: { label: 'Shared bank balance sheet', detail: 'Customer outcome, economics and resilience depend on every function' },
      actors: [
        { label: 'Customers', relation: 'Provide deposits, demand credit and generate transactions', flows: ['money', 'information'] },
        { label: 'Business teams', relation: 'Originate and manage relationships; earn revenue only with funding and control', flows: ['service', 'money'] },
        { label: 'Treasury and finance', relation: 'Manage funding and liquidity; funds-transfer pricing charges lenders for funding used', flows: ['money', 'risk'] },
        { label: 'Risk and compliance', relation: 'Underwrite, set limits and independently control exposure', flows: ['risk', 'oversight'] },
        { label: 'Operations, technology and data', relation: 'Turn decisions into reliable processing, channels and information', flows: ['service', 'information'] },
        { label: 'Authorities and infrastructure', relation: 'SBV oversight, payment rails and credit information connect and constrain the chain', flows: ['oversight', 'information'] },
      ],
      note: 'Asset-liability committees align pricing, funding, capital and risk appetite; silos chasing local targets can raise funding stress or provisions.',
      takeaway: 'No single team owns the economic result: value appears only when growth, funding, execution and control align.',
    },
  },
  'cb-m2-21-03-flows': {
    heading: 'One VND1 billion deposit, four separate stories',
    intro: 'A deposit moves cash, creates a liability, carries data and shifts risk at the same time. Read each view on its own before calculating any value.',
    spec: {
      layout: 'table', title: 'How Money, Information, and Risk Flow', kicker: '',
      headers: ['View', 'What moves or is recorded', 'Do not confuse it with'],
      rows: [
        { label: 'Money flow', a: 'Cash from depositors to borrowers, then back through repayment', b: 'Revenue' },
        { label: 'Information flow', a: 'KYC, credit data and transaction signals', b: 'Cash movement' },
        { label: 'Risk flow', a: 'Liquidity owed to the depositor; credit risk once lending follows', b: 'A booked loss' },
        { label: 'Accounting view', a: 'Deposit liability and loan asset; NII and fees arise over time', b: 'Profit equal to the loan amount' },
      ],
      note: 'Vietnam system credit was about 133% of GDP at end-September 2024 (a stock ratio) and grew 15.08% in 2024 (change in outstanding stock); neither is disbursement or bank revenue.',
      takeaway: 'Name each flow and its accounting effect separately, or the analysis double counts.',
    },
  },
  'cb-m2-22-01-funding': {
    heading: 'From salary accounts to share issues: what each funding layer is for',
    intro: 'A salary account, a term deposit, an interbank loan, a bond and a share issue solve different problems. Compare each layer’s cost and stability with the job it does.',
    spec: {
      layout: 'table', title: 'Where Do Commercial Banks Get Their Funding?', kicker: '',
      headers: ['Funding layer', 'Cost and stability', 'What it is for'],
      rows: [
        { label: 'CASA deposits', a: 'Low-cost current and savings balances; can be stable and diversified', b: 'Low-cost relationship funding' },
        { label: 'Term deposits', a: 'Interest-bearing customer money committed for a tenor', b: 'More stable funding for assets' },
        { label: 'Interbank borrowing', a: 'Fills gaps quickly but can reprice or leave faster', b: 'Shorter-term liquidity management' },
        { label: 'Issued debt and wholesale funding', a: 'Market-sensitive; investors demand market returns', b: 'Flexible funding; qualifying Tier 2 debt may count as capital' },
        { label: 'Equity and charter capital', a: 'Owners demand market returns; not customer deposits', b: 'Absorbs losses and supports regulatory capacity' },
      ],
      note: 'Charter capital across 29 banks was about VND879.35 trillion at end-June 2025, up 6.6% from end-2024; the five largest held 41% (VOV reporting SBV/VNA data). It is not deposits or funding mix.',
      takeaway: 'Liquidity asks whether obligations can be met on time; capital asks whether losses can be absorbed, so equity is not just another deposit.',
    },
  },
  'cb-m2-22-02-casa': {
    heading: 'Mix, not magic, sets the cost of funds',
    intro: 'Cost of funds is a weighted average across every funding balance. See how each source’s share builds the HYPOTHETICAL 3.35%, and why Techcombank’s reported CASA figures sit outside the calculation.',
    spec: {
      layout: 'driverTree', title: 'Understanding Cost of Funds and CASA', kicker: '',
      root: { label: 'Weighted-average cost of funds', detail: '3.35% for a HYPOTHETICAL 40/45/15 funding mix, not any bank’s result' },
      formula: 'Cost of funds = interest expense across all funding ÷ total funding',
      drivers: [
        { label: 'CASA balances', detail: '40% of funding; zero- or low-rate balances pull the average down', op: '+' },
        { label: 'Term deposits', detail: '45% of funding; interest-bearing customer deposits', op: '+' },
        { label: 'Wholesale funding', detail: '15% of funding; borrowed from institutions or markets', op: '+' },
      ],
      note: 'Techcombank reported a 40.9% CASA ratio and VND230.9 trillion of CASA balances at end-2024, up 27.2% (company-reported, FY2024 results release). Its total customer deposits were VND565.1 trillion.',
      takeaway: 'Higher CASA lowers the weighted cost of funds, but profit still depends on asset yield, operating costs, provisions and capital.',
    },
  },
  'cb-m2-23-01-lifecycle': {
    heading: 'Where a loan’s quality is decided, before and after approval',
    intro: 'Every loan starts with design and origination, then underwriting differs by customer type. Follow the path and notice that control continues long after the approval meeting.',
    spec: {
      layout: 'pathway', title: 'How Banks Evaluate and Approve Loans', kicker: '',
      trunk: [
        { label: 'Design and originate', detail: 'Define customer, product and price; take the application and complete KYC', kind: 'stage' },
      ],
      optionsLabel: 'Underwriting approach by customer',
      options: [
        { label: 'Retail', detail: 'Standardised data and scorecards across many smaller exposures' },
        { label: 'SME', detail: 'Financial statements mixed with relationship evidence' },
        { label: 'Corporate', detail: 'Bespoke and covenant-driven; large facilities may be syndicated' },
      ],
      afterLabel: 'After the credit decision',
      after: [
        { label: 'Approve and document', detail: 'Set limit, tenor, covenants and conditions', kind: 'decision' },
        { label: 'Disburse and monitor', detail: 'Release funds and watch for early-warning signals', kind: 'stage' },
        { label: 'Collect, recover or close', detail: 'Receive repayment or manage delinquency and recovery', kind: 'outcome' },
      ],
      note: 'Price should cover funding, operating cost, expected loss and capital or return. Borrower cash flow is the primary repayment source; collateral is secondary.',
      takeaway: 'Credit is priced risk produced across the whole lifecycle, not volume approved in one meeting.',
    },
  },
  'cb-m2-24-01-delivery': {
    heading: 'Which door a customer need should come through',
    intro: 'Routine tasks move to digital channels while complex needs go to people. Use the question to route a need, and remember every channel works from the same records and controls.',
    spec: {
      layout: 'decision', title: 'How Banks Deliver Financial Services', kicker: '',
      root: { label: 'Customer need', detail: 'Onboarding, transactions, support, advice or a complaint' },
      question: 'What kind of help does this need?',
      branches: [
        { condition: 'Routine and frequent', outcome: 'Mobile, internet or self-service', detail: 'Payments, balances and simple tasks at lower cost-to-serve', tone: 'positive' },
        { condition: 'Cash or assisted onboarding', outcome: 'Branch', detail: 'Cash services, accessibility and trust', tone: 'positive' },
        { condition: 'Complex SME or corporate need', outcome: 'Relationship manager', detail: 'Advice and coordination across products', tone: 'positive' },
        { condition: 'Something has gone wrong', outcome: 'Contact centre', detail: 'Support, complaints and service recovery', tone: 'caution' },
      ],
      note: 'About 87% of adults in Vietnam had a payment account in 2024 (a secondary source citing SBV); that measures ownership, not digital-active use or transaction share.',
      takeaway: 'Judge delivery by total customer outcome and cost-to-serve, not branch count, while keeping one consistent relationship.',
    },
  },
  'cb-m2-24-02-relationships': {
    heading: 'Same bank, three different relationship economics',
    intro: 'A retail app can serve millions while one corporate client may need lending, payroll, trade, cash and FX across several legal entities. Compare what each segment needs and what the bank must watch.',
    spec: {
      layout: 'table', title: 'Retail, SME, and Corporate Banking Relationships', kicker: '',
      headers: ['Segment', 'What the relationship serves', 'What the bank must watch'],
      rows: [
        { label: 'Retail', a: 'High-volume personal needs through standardised products', b: 'Activation, affordability and suitable cross-sell' },
        { label: 'SME', a: 'Owner and business cash flow together', b: 'Cash-flow visibility and owner dependence' },
        { label: 'Corporate', a: 'Complex facilities, cash management and transaction services', b: 'Wallet share, concentration and covenants' },
        { label: 'Every segment', a: 'Useful depth across funding, credit and transactions', b: 'Risk-adjusted lifetime value, not product count' },
      ],
      note: 'Techcombank reported 13.4 million customers at end-2023 after adding 2.6 million in a year: a company figure from sponsored-content reporting, not a system benchmark.',
      takeaway: 'Cross-sell creates value only when products are useful, suitable and profitable after risk.',
    },
  },
  'cb-m2-24-03-journey': {
    heading: 'Verified, funded, active, resolved: a journey measured stage by stage',
    intro: 'A polished app can still fail if identity checks stall or fraud support is hard to reach. Follow the stages and the measure that proves each one worked.',
    spec: {
      layout: 'flow', title: 'Digital Banking and Customer Experience', kicker: '',
      steps: [
        { label: 'Discover and start', detail: 'Customer understands the proposition and begins', kind: 'stage' },
        { label: 'Verify and open', detail: 'Identity and eligibility checks complete; measure verified account opening', kind: 'stage' },
        { label: 'Fund and activate', detail: 'Measure the first funded transaction', kind: 'stage' },
        { label: 'Use and deepen', detail: 'Payments or savings become habitual; measure 30-day active use', kind: 'stage' },
        { label: 'Resolve exceptions', detail: 'Errors, fraud and disputes handled clearly; measure support resolution', kind: 'outcome' },
      ],
      loop: 'Digital scale magnifies small failure rates, so good service recovery is what keeps customers coming back.',
      note: 'About 87% of adults in Vietnam had a payment account in 2024, and Techcombank reported 13.4 million customers at end-2023; neither proves journey quality.',
      takeaway: 'Digital experience is reliable completion of financial jobs, tracked alongside fraud and complaints, not downloads.',
    },
  },
  'cb-m2-25-01-inputs': {
    heading: 'Deposits are owed back and loans are not profit',
    intro: 'Sort what the bank uses from what it produces. Value is only what remains after funding, operating, credit and capital costs.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Banking Inputs and Outputs', kicker: '',
      root: 'The banking economic engine', rootDetail: 'Inputs are transformed into outputs; value is captured only after all costs',
      groups: [
        { label: 'Financial inputs', detail: 'Funding the bank owes back, plus loss absorption', items: ['Deposits', 'Borrowings', 'Capital'] },
        { label: 'Operational inputs', detail: 'Execution and service capacity', items: ['People', 'Processes', 'Technology', 'Distribution'] },
        { label: 'Information inputs', detail: 'Decision and control quality', items: ['Identity data', 'Financial data', 'Transaction data'] },
        { label: 'Outputs', detail: 'Customer value and risk exposure', items: ['Loans', 'Accounts and payments', 'Trade and treasury services'] },
      ],
      note: 'Value capture is the NII and fees retained after funding, operating, credit-loss and capital or tax costs; extra volume priced below those costs weakens economic profit.',
      takeaway: 'Calling deposits revenue or loans profit hides the liability and risk each transaction creates.',
    },
  },
  'cb-m2-25-02-nim': {
    heading: 'Net interest income up 12.5% without one extra loan',
    intro: 'In this HYPOTHETICAL example only the cost of funds changes. Compare the two states and check that NIM divides by average earning assets, not a quoted loan-deposit spread.',
    spec: {
      layout: 'compare', title: 'How Banks Generate Net Interest Income and NIM', kicker: '',
      leftTitle: 'Before (HYPOTHETICAL)', rightTitle: 'After a 0.5-point funding-cost cut (HYPOTHETICAL)',
      rows: [
        { label: 'Average earning assets', a: 'VND1,000', b: 'VND1,000, unchanged' },
        { label: 'Asset yield and lending', a: 'Fixed', b: 'Fixed; no extra lending' },
        { label: 'Net interest income', a: 'VND40', b: 'VND45, up 12.5%' },
        { label: 'Net interest margin', a: '4.0%', b: '4.5%, up 0.5 percentage points' },
      ],
      note: 'NIM = NII ÷ average interest-earning assets; annualise interim NIM before comparing it with a full-year figure. All figures are HYPOTHETICAL from the research addendum, not Techcombank, Vietcombank or sector results.',
      takeaway: 'Funding cost can move NII and NIM on the same asset base, so NIM is broader than a simple spread.',
    },
  },
  'cb-m2-25-03-waterfall': {
    heading: 'What survives between operating income and net profit',
    intro: 'Loan balances can rise while net profit falls. Trace net profit back to the income and cost lines that decide it, then scale it by assets and equity.',
    spec: {
      layout: 'driverTree', title: 'How Costs and Credit Risks Affect Profitability', kicker: '',
      root: { label: 'Net profit, then ROA and ROE', detail: 'Read against assets, equity and the capital consumed' },
      formula: 'Net profit = NII + non-interest income − operating expense − provisions − tax',
      drivers: [
        { label: 'Net interest income', detail: 'Asset yield less funding cost', op: '+' },
        { label: 'Non-interest income', detail: 'Fees; with NII it forms total operating income', op: '+' },
        { label: 'Operating expense', detail: 'Cost-to-serve; divided by operating income gives CIR', op: '−' },
        { label: 'Provisions', detail: 'Credit cost; relative to average loans gives Cost of Risk', op: '−' },
        { label: 'Tax', detail: 'Taken before net profit', op: '−' },
      ],
      note: 'Vietcombank reported VND16,699 billion consolidated net profit for H1-2024 (company result reported by The Investor): one half-year of net profit, not revenue or a full-year benchmark.',
      takeaway: 'Volume sits at the top; funding, operating and credit costs decide what profit survives.',
    },
  },
  'cb-m2-26-01-global-model': {
    heading: 'One brand, many regulated balance sheets',
    intro: 'A global bank looks unified to a multinational client, yet its resources sit in local entities. Separate what the group shares from what each entity must keep, and the constraints between them.',
    spec: {
      layout: 'taxonomy', title: 'How Global Commercial Banking Operations Work', kicker: '',
      root: 'Global banking group', rootDetail: 'Common platforms and cross-border services run through local legal entities',
      groups: [
        { label: 'Shared at group level', items: ['Global transaction network', 'Group treasury', 'Group risk standards', 'Shared technology and operations'] },
        { label: 'Held by each local entity', items: ['Customer franchise and licence', 'Local capital and liquidity', 'Local conduct and prudential rules'] },
        { label: 'Cross-border constraints', items: ['Legal or regulatory', 'Currency or funding', 'Data or operations'] },
      ],
      note: 'Local supervisors may require capital and liquidity to stay in the local entity under stress. In Vietnam, foreign-owned banks and branches serve multinational, trade and affluent clients under local licensing.',
      takeaway: 'Global scale operates through local regulated balance sheets, not above them.',
    },
  },
  'cb-m2-26-02-vietnam-model': {
    heading: 'Same chain, local playbook: what changes in Vietnam',
    intro: 'Keep the universal value-chain logic, then swap in Vietnam’s constraints. Compare the developed-market tendency with the Vietnam pattern row by row.',
    spec: {
      layout: 'compare', title: 'Vietnam\'s Commercial Banking Value Chain', kicker: '',
      leftTitle: 'Developed-market tendency', rightTitle: 'Vietnam pattern',
      rows: [
        { label: 'System financing', a: 'More fee and capital-markets income', b: 'Bank-dominated; assets about 196% of GDP at end-September 2024' },
        { label: 'Growth constraint', a: 'Demand, capital, liquidity and risk appetite', b: 'Those plus SBV credit room; credit grew 15.08% in 2024' },
        { label: 'Funding competition', a: 'Deposits plus broad market funding', b: 'Intense competition for CASA' },
        { label: 'Distribution', a: 'Mature digital channels', b: 'Mobile and QR for routine access; about 87% of adults hold a payment account' },
        { label: 'Risk agenda', a: 'Mature Basel III regimes', b: 'Property, bond and borrower risks; still-maturing capital and bad-debt framework' },
      ],
      note: 'The three Vietnam figures use different denominators and periods: a World Bank estimate, an SBV figure via a secondary source and an inclusion indicator. They are not one composite score.',
      takeaway: 'Localise funding, growth, distribution and risk assumptions before copying a developed-market strategy.',
    },
  },
};

/** Chapters marked Verification Required: no Learning Visual until their evidence is verified. */
export const CB_M2_HELD_KINDS: readonly string[] = [
  'cb-m2-22-03-capital',
  'cb-m2-23-02-groups',
  'cb-m2-23-03-provisions',
  'cb-m2-26-03-stability',
];
