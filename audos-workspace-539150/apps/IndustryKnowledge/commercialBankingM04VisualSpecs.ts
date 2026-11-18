import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Commercial Banking Module 04, keyed by visualKind. */
export const CB_M4_VISUALS: Record<string, ChapterVisual> = {
  'cb-m4-41-01-arenas': {
    heading: 'Deposits, loans and daily activity: three prizes with different costs',
    intro: 'Banks contest the same customer in three arenas, and each win pays and costs the bank differently. Read across a row to see what a win does to the balance sheet.',
    spec: {
      layout: 'table', title: 'Where banks actually compete', kicker: '',
      headers: ['Arena', 'How banks compete', 'What a win does'],
      rows: [
        { label: 'Deposits and funding', a: 'Attract low-cost, stable salary, operating and savings balances', b: 'Supports margin and liquidity' },
        { label: 'Lending', a: 'Price, approve and structure credit within risk appetite and credit room', b: 'Consumes liquidity and capital' },
        { label: 'Daily transactions', a: 'Apps, branches, relationship teams and ecosystems seek transaction primacy', b: 'Deepens data and retention' },
      ],
      note: 'Big 4 shares keep their own scopes: 47.57% of assets (30 reporting banks, 30 Jun 2025); 41.9% of loans and about 50% of deposits (end-2023, Viet Nam News citing SBV). Do not merge them.',
      takeaway: 'Banks compete for balances, risk capacity and primary relationship status at once, so customer share always ties back to the balance sheet.',
    },
  },
  'cb-m4-41-02-five-forces': {
    heading: 'Hard to become a bank, easy to take one of its jobs',
    intro: 'Licensed entry is rare, yet pressure arrives from every side. Notice which forces contest a single customer job and which would need a full balance sheet.',
    spec: {
      layout: 'ecosystem', title: 'Porter’s Five Forces for banking', kicker: '',
      center: { label: 'Rivalry among licensed banks', detail: 'High: deposits, pricing, credit room and digital engagement' },
      actors: [
        { label: 'Depositors and funding providers', relation: 'Moderate power: transparent rates and easy switching, though salary convenience anchors some', flows: ['money'] },
        { label: 'Borrowers and fee customers', relation: 'Moderate power: large corporates negotiate across banks and markets; thin-file SMEs have fewer options', flows: ['money', 'risk'] },
        { label: 'Substitutes', relation: 'Rising: fintechs, e-wallets, consumer finance and capital markets take selected jobs', flows: ['service'] },
        { label: 'New licensed entrants', relation: 'Low threat: licensing, capital, compliance, funding and trust constrain entry', flows: ['oversight'] },
      ],
      note: 'Basel’s 8% total-capital minimum is a global constraint, not automatically Vietnam’s operative requirement; the count of 30 G-SIBs is the 2022 list only, not a current figure.',
      takeaway: 'High barriers to becoming a bank do not remove pressure on individual products, because substitutes can win one job at a time.',
    },
  },
  'cb-m4-41-03-moat': {
    heading: 'Trust, balances and capital compound into a franchise rivals cannot copy',
    intro: 'A feature can be copied quickly; the chain behind it cannot. Follow how each capability feeds the next, and where a break reverses the loop.',
    spec: {
      layout: 'flow', title: 'Why bank advantages resist imitation', kicker: '',
      steps: [
        { label: 'Trust and license', detail: 'Permission and confidence to hold customer funds', kind: 'stage' },
        { label: 'Stable balances', detail: 'Trust attracts balances, which lowers funding pressure', kind: 'stage' },
        { label: 'Relationships and risk data', detail: 'Repeated activity improves service and risk decisions', kind: 'stage' },
        { label: 'Reliable operations', detail: 'Dependable payment and technology infrastructure deepens activity', kind: 'stage' },
        { label: 'Capital and resilience', detail: 'Retained earnings and capital absorb losses and support prudent growth', kind: 'outcome' },
      ],
      loop: 'The system is path-dependent: a trust shock can drain the funding advantage, and rapid scale can overwhelm controls.',
      note: 'ICBC’s US$6.303tn of assets (2024 ranking) illustrates scale only, not profitability or safety; G-SIB status also brings higher loss-absorbency expectations.',
      takeaway: 'The moat is the connected operating system behind the product, not a standalone feature.',
    },
  },
  'cb-m4-42-01-global-profiles': {
    heading: 'Six questions that turn a global bank’s size into a profile',
    intro: 'An asset ranking says how large a balance sheet is, not how strong, safe or profitable the bank is. Ask the same questions of every institution before judging it.',
    spec: {
      layout: 'table', title: 'Read global players by model—not fame', kicker: '',
      headers: ['Lens', 'What to inspect', 'Why it matters'],
      rows: [
        { label: 'Scale', a: 'Assets, loans, deposits and geographic reach', b: 'Capacity, not quality on its own' },
        { label: 'Business model', a: 'Customer segments and non-interest businesses', b: 'Which revenue and risk engines run' },
        { label: 'Funding', a: 'How deposits and other funding are structured', b: 'Cost and stability of funds' },
        { label: 'Asset quality', a: 'How loans and investments perform', b: 'Resilience of profit' },
        { label: 'Capital', a: 'Regulatory capacity and buffers', b: 'Loss absorption and growth limits' },
        { label: 'Efficiency and returns', a: 'Ratio definitions and trends over time', b: 'Value created after resources used' },
      ],
      note: 'ICBC (about US$6.303tn), Agricultural Bank of China, China Construction Bank and Bank of China lead the cited 2024 S&P asset ranking; JPMorgan is the largest US bank in that source. Scale only, not a profit or safety rank.',
      takeaway: 'A profile shows whether scale becomes risk-adjusted return, once currency, dates and accounting standards are made comparable.',
    },
  },
  'cb-m4-42-03-position': {
    heading: '“Market leader” of what, measured when?',
    intro: 'A leadership claim means nothing until the market, metric and date are named. Fix the scope first, then test each lens for a real economic advantage.',
    spec: {
      layout: 'pathway', title: 'What market position really means', kicker: '',
      trunk: [
        { label: 'Define the market and sample', detail: 'Geography, segment, product and competitor set', kind: 'stage' },
        { label: 'Calculate a same-date share', detail: 'Use a comparable denominator for the same date and basis', kind: 'stage' },
      ],
      optionsLabel: 'Lenses on position',
      options: [
        { label: 'Scale', detail: 'Total assets, customer loans and deposits' },
        { label: 'Funding mix', detail: 'Whether balances give a lasting funding advantage' },
        { label: 'Revenue diversification', detail: 'Test the earnings spread; product breadth alone proves little' },
        { label: 'Asset quality and capital', detail: 'The risk carried to hold the position' },
        { label: 'Profitability', detail: 'Return is a flow; keep it apart from stocks like assets' },
        { label: 'Activity and distribution', detail: 'Transaction activity and distribution strength' },
      ],
      afterLabel: 'Conclusion',
      after: [
        { label: 'Explain the economic advantage', detail: 'Does the position produce sustainable customer or funding advantage?', kind: 'outcome' },
      ],
      note: 'Big 4 assets of VND10.11qn are 47.57% of a 30-bank sample at 30 June 2025, not a universal system share; VPBank’s VND1.049qn (30 Jun 2025) cannot enter an FY2024 table.',
      takeaway: 'Where a bank stands matters only once scope is comparable and the position is tied to the return and risk it produces.',
    },
  },
  'cb-m4-44-01-funding-quality': {
    heading: 'Cheap deposits need sound loans, and sound loans need stable deposits',
    intro: 'Neither franchise succeeds alone. Read each row across to see how funding discipline and credit discipline mirror each other.',
    spec: {
      layout: 'compare', title: 'Funding strength and asset quality', kicker: '',
      leftTitle: 'Funding franchise', rightTitle: 'Credit franchise',
      rows: [
        { label: 'Acquire', a: 'Earn CASA and term deposits', b: 'Underwrite customers within risk appetite' },
        { label: 'Watch', a: 'Concentration, tenor and liquidity', b: 'Early-warning indicators and portfolio diversification' },
        { label: 'Protect', a: 'Contingency funding and liquid assets', b: 'Collateral, provisions and recovery' },
        { label: 'Failure mode', a: 'Unstable liabilities create liquidity stress', b: 'Poor credit quality destroys capital despite high NIM' },
        { label: 'Outcome', a: 'Stable lower-cost funds support NIM', b: 'Limited cost of risk turns margin into profit' },
      ],
      note: 'Techcombank’s 40.9% CASA ratio (end-2024, company-reported in its FY2024 results release) shows a funding lens; Vietcombank’s 1.0% consolidated end-2024 NPL (Fitch snippet) shows an asset-quality lens. They are not a ranking.',
      takeaway: 'NIM becomes durable only when funding and credit disciplines reinforce each other under stress.',
    },
  },
  'cb-m4-44-02-capacity': {
    heading: 'Growth stalls at whichever capacity is weakest',
    intro: 'Capital, operations and distribution must grow together. Check what drives each one and how it can look healthy while weakening the bank.',
    spec: {
      layout: 'driverTree', title: 'Capital, efficiency and distribution', kicker: '',
      root: { label: 'Prudent growth capacity', detail: 'Return and resilience as volume rises' },
      drivers: [
        { label: 'Capital', detail: 'Absorbs loss and constrains RWA', op: '+', children: [
          { label: 'Loss-absorbing buffer', detail: 'Thin capital limits growth' },
          { label: 'Risk-adjusted allocation', detail: 'Direct capital to risk-adjusted opportunities' },
        ] },
        { label: 'Operating efficiency', detail: 'CIR = OPEX ÷ operating income', op: '+', children: [
          { label: 'Automation', detail: 'Automate repeatable processes and redesign failure demand' },
          { label: 'Investment context', detail: 'Underinvestment can flatter CIR temporarily' },
        ] },
        { label: 'Distribution', detail: 'Branches, digital channels, RMs and partners', op: '+', children: [
          { label: 'Activation', detail: 'Reach without activation raises cost' },
          { label: 'Retention', detail: 'Primary balances turn reach into franchise value' },
        ] },
      ],
      note: 'Basel’s 8% total-capital minimum is a global reference floor, not identical for every Vietnam bank; ≈87% adult payment-account ownership (reported 2024) measures reach, not active use.',
      takeaway: 'The capabilities are complements: growth in one becomes fragility or wasted cost when another lags.',
    },
  },
  'cb-m4-44-03-ksf': {
    heading: 'Do new digital features earn balances, or only logins?',
    intro: 'Innovation earns attention; reliability earns balances. Follow a new journey to the three outcomes it can produce.',
    spec: {
      layout: 'decision', title: 'Innovation, trust and sustainable advantage', kicker: '',
      root: { label: 'New digital journey', detail: 'Built around a high-friction customer job, with controls in the design' },
      question: 'Does it move customers from feature use to completed jobs and primary-bank behavior?',
      branches: [
        { condition: 'Yes, reliably', outcome: 'Primary relationship deepens', detail: 'Balances, activity, data and cross-sell reinforce funding and recurring fees', tone: 'positive' },
        { condition: 'Logins only', outcome: 'Feature commoditizes', detail: 'Use without balances, transactions or retention does not strengthen the franchise', tone: 'caution' },
        { condition: 'Fails in service', outcome: 'Trust erodes', detail: 'Resilience failures can erase years of trust', tone: 'negative' },
      ],
      note: 'Measure four stages: feature use, job completion, relationship behavior and financial outcome. Downloads or registered accounts are not enough, and no named bank is claimed as fee or digital leader.',
      takeaway: 'Innovation creates advantage only when reliable execution turns it into trusted, funded relationships.',
    },
  },
  'cb-m4-45-01-swot': {
    heading: 'A Vietnam banking SWOT with a mechanism behind every box',
    intro: 'Strengths and weaknesses belong to the system analysed; opportunities and threats come from outside. Treat the weaknesses as hypotheses to test, not settled facts.',
    spec: {
      layout: 'taxonomy', title: 'A disciplined banking SWOT', kicker: '',
      root: 'Vietnam banking system', rootDetail: 'System-level view; a named bank needs its own portfolio, funding and capital evidence',
      groups: [
        { label: 'Strengths (internal)', items: ['Banking depth', 'Broad account reach', 'Concentrated profitable core', 'Expanding digital access'] },
        { label: 'Weakness hypotheses (internal)', items: ['Concentration', 'Capital constraints at some institutions', 'Funding competition', 'Uneven governance'] },
        { label: 'Opportunities (external)', items: ['Financial inclusion', 'SME services', 'Fee income', 'Embedded and green finance'] },
        { label: 'Threats (external)', items: ['Credit cycles', 'Funding shocks', 'Cyber risk', 'Substitution'] },
      ],
      note: 'Bank assets near 196% and credit near 133% of GDP (end-September 2024, snippet-verified World Bank estimate) show depth; 15.08% outstanding-credit growth in 2024 (secondary research citing SBV) is not disbursement or profit.',
      takeaway: 'An external opportunity creates value only if the bank has the capability and capital to capture it.',
    },
  },
  'cb-m4-45-02-risk-map': {
    heading: 'How a property downturn travels from the loan book to funding',
    intro: 'Risks rarely stay in one box. Follow one trigger through the financial statements and customer behavior to its second-order cost.',
    spec: {
      layout: 'flow', title: 'Strategic risks and their transmission', kicker: '',
      steps: [
        { label: 'Sector downturn', detail: 'Trigger: a property downturn weakens borrowers', kind: 'stage' },
        { label: 'NPLs and provisions rise', detail: 'The first-order exposure hits credit quality and income', kind: 'stage' },
        { label: 'Capital pressure', detail: 'Losses and provisions reduce capacity to lend', kind: 'stage' },
        { label: 'Funding stress', detail: 'News of losses erodes confidence and prompts deposit runoff', kind: 'stage' },
        { label: 'NIM compressed', detail: 'Emergency liquidity is costly: a second-order effect', kind: 'outcome' },
      ],
      note: 'Rerun the path at several severities and add reverse stress tests; rate, cyber and regulatory risks follow paths of their own. The framework is conceptual and states no Vietnam exposure figure.',
      takeaway: 'Follow risk across statements and behavior; do not stop at the first financial line it touches.',
    },
  },
  'cb-m4-45-03-response-map': {
    heading: 'Each strategic lever paired with the guardrail that keeps it honest',
    intro: 'Every response improves one measure while risking another. Read each lever with its measure of progress and the constraint that stops it backfiring.',
    spec: {
      layout: 'table', title: 'Strategic responses that change economics', kicker: '',
      headers: ['Response', 'Measure of progress', 'Guardrail'],
      rows: [
        { label: 'Optimize funding', a: 'Funding cost and stability of balances', b: 'Do not chase CASA with uneconomic incentives or unstable balances' },
        { label: 'Diversify income', a: 'Recurring net fees', b: 'Separate service value from one-off gains; watch conduct risk' },
        { label: 'Redesign journeys', a: 'Completed digital journeys', b: 'Reduce failed onboarding before claiming CAC improvement' },
        { label: 'Strengthen credit', a: 'Early-warning coverage and provisions', b: 'Improve early warning before accelerating target-sector lending' },
        { label: 'Plan capital', a: 'RWA, buffers and return', b: 'Growth and distributions compete for capital; raises dilute owners' },
      ],
      note: 'Set a baseline, target, owner and leading indicator for each response and review interactions quarterly. These are capability frameworks, not claims that a named bank has completed them.',
      takeaway: 'A response is credible only when it names its measure and the guardrail that stops one KPI improving at another’s expense.',
    },
  },
};

/** Module 04 chapters held because their text is marked Verification Required: no spec, neutral held text. */
export const CB_M4_HELD_KINDS: readonly string[] = [
  'cb-m4-42-02-vietnam-landscape',
  'cb-m4-43-01-kpi-matrix',
  'cb-m4-43-02-four-bank',
  'cb-m4-43-03-tradeoffs',
];
