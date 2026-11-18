import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Commercial Banking Module 05, keyed by visualKind. */
export const CB_M5_VISUALS: Record<string, ChapterVisual> = {
  'cb-m5-51-01-customer-evolution': {
    heading: 'Convenience wins the download, trust keeps the relationship',
    intro: 'Digital-first does not mean digital-only. Look at which customer expectations decide whether a convenient account becomes a lasting primary-bank relationship.',
    spec: {
      layout: 'driverTree', title: 'How Banking Customers Are Changing', kicker: '',
      root: { label: 'Durable customer relationship', detail: 'Recurring balances, engagement and retention that outweigh acquisition and service costs' },
      drivers: [
        { label: 'Convenience', detail: 'Instant access, fast onboarding and low-friction service raise the baseline' },
        { label: 'Control and transparency', detail: 'Clear status, alerts, costs and permission choices' },
        { label: 'Trust and security', detail: 'Security, fair treatment and recovery support act as an adoption gate' },
        { label: 'Hybrid support', detail: 'Human help for consequential decisions alongside digital self-service' },
        { label: 'Segment fit', detail: 'Household, SME and corporate needs, geography, confidence, access and complexity' },
      ],
      note: 'About 87% adult payment-account ownership in Vietnam is reported for 2024 (secondary source citing SBV); it shows broad access, not active use or digital confidence.',
      takeaway: 'A trust failure can reverse a convenience-led franchise quickly, so speed and protection have to be designed together.',
    },
  },
  'cb-m5-51-02-journey': {
    heading: 'Primary-bank status is earned at every step after the download',
    intro: 'A fast app may win a download, but any later step can lose the customer. Follow the journey and notice what must hold at each stage.',
    spec: {
      layout: 'flow', title: 'Digital Banking and Customer Expectations', kicker: '',
      steps: [
        { label: 'Onboard remotely', detail: 'eKYC and consent widen the acquisition funnel by cutting onboarding friction', kind: 'stage' },
        { label: 'Authenticate securely', detail: 'Verify the customer without blocking legitimate access', kind: 'stage' },
        { label: 'Pay and transact', detail: 'QR and mobile payments create repeat activity and operating data', kind: 'stage' },
        { label: 'Resolve problems', detail: 'Self-service with escalated human help, fraud resolution and recovery', kind: 'stage' },
        { label: 'Primary-bank relationship', detail: 'Repeat use, deeper balances and retention', kind: 'outcome' },
      ],
      loop: 'Track completion, failure, abandonment, complaint and recovery rates at each stage; downloads or registrations alone do not prove engagement.',
      note: 'Vietnam cashless transactions rose 56.57% in volume and 31.35% in value in 2024, and QR payments grew 172% in 2023 (secondary reports of SBV and payment-system data); these are channel-growth indicators, not adoption shares.',
      takeaway: 'Convenience turns into relationship value only when the whole journey is reliable, secure, understandable and worth repeating.',
    },
  },
  'cb-m5-51-03-segments': {
    heading: 'Households, SMEs and corporates hire a bank for different jobs',
    intro: 'A student paying by QR and a corporate treasurer managing liquidity are not one “Vietnam customer”. Compare what each group needs and where human expertise still matters.',
    spec: {
      layout: 'taxonomy', title: 'Emerging Customer Needs in Vietnam', kicker: '',
      root: 'Vietnam banking customers', rootDetail: 'Inclusion, trust and digital access matter for all; the financial job and risk model differ',
      groups: [
        { label: 'Households', detail: 'Service must stay simple, safe and understandable', items: ['Safe payments', 'Emergency savings', 'Responsible credit', 'Guidance'] },
        { label: 'SMEs', detail: 'Cash-flow data helps, but seasonality and informality need human judgment', items: ['Cash-flow visibility', 'Payments and collections', 'Working capital', 'Practical underwriting'] },
        { label: 'Corporates', detail: 'Complexity sustains specialist and relationship teams', items: ['Liquidity', 'Transaction banking', 'Trade and FX', 'Risk services'] },
      ],
      note: 'About 87% adult payment-account ownership is reported for 2024, a broad access indicator; the research gives no SME funding-gap or retail-loan penetration figure.',
      takeaway: 'Segment by financial job, constraint and risk, because account ownership without utility or trust is shallow inclusion.',
    },
  },
  'cb-m5-52-01-operating-model': {
    heading: 'A modern app still needs a rebuilt engine behind it',
    intro: 'Transformation starts from a measurable problem, not a technology. See the routes banks take to modernise the core and the transition costs every route carries.',
    spec: {
      layout: 'pathway', title: 'How Technology Is Transforming Banking', kicker: '',
      trunk: [
        { label: 'Problem with a baseline', detail: 'Cycle time, failure, manual effort, cost, availability, complaints or losses', kind: 'stage' },
        { label: 'Front-end foundations', detail: 'Digital onboarding, eKYC, mobile apps and real-time payments', kind: 'stage' },
      ],
      optionsLabel: 'Ways to modernise the core',
      options: [
        { label: 'Replacement', detail: 'Swap the legacy core for a modern platform' },
        { label: 'Progressive migration', detail: 'Move products and records across in controlled stages' },
        { label: 'Modular layers', detail: 'Build modular services around the legacy core' },
      ],
      afterLabel: 'What every route must manage',
      after: [
        { label: 'Transition risk', detail: 'Migration, dual-running, data conversion, vendor dependency, cyber testing and fallback', kind: 'stage' },
        { label: 'Straight-through operations', detail: 'Fewer handoffs, automation with exception controls, lower unit cost', kind: 'outcome' },
      ],
      note: 'Cloud can add flexibility but raises concentration, security and resilience questions; the research gives no Vietnam cloud, automation or core-migration adoption rate.',
      takeaway: 'A cheaper steady state may need substantial transition investment, and no single architecture is universally best.',
    },
  },
  'cb-m5-52-02-ai-value-chain': {
    heading: 'The model scores, but the bank stays accountable',
    intro: 'A model output becomes banking value only once rules, people and monitoring turn it into an accountable action. Trace the governed workflow from decision owner to appeal.',
    spec: {
      layout: 'flow', title: 'AI, Data Analytics, and Banking Innovation', kicker: '',
      steps: [
        { label: 'Decision and owner', detail: 'Name the decision being supported and who is accountable for it', kind: 'stage' },
        { label: 'Data', detail: 'Quality, lawful access and privacy bound what any model can do', kind: 'stage' },
        { label: 'Model output', detail: 'Patterns or generated outputs for credit, fraud, service routing or documents', kind: 'stage' },
        { label: 'Rules, thresholds and people', detail: 'Autonomy limited by consequence and uncertainty, with human review', kind: 'decision' },
        { label: 'Customer action and appeal', detail: 'An explainable outcome with a safe fallback and appeal route', kind: 'outcome' },
      ],
      loop: 'Monitor accuracy, drift, false positives, bias, overrides and complaints, then adjust the model or its limits.',
      note: 'Fraud analytics is an established category; generative AI remains uneven. Techcombank’s recognised data and AI capability does not prove sector-wide deployment.',
      takeaway: 'Assisted drafting and approving credit are different control problems, so autonomy should shrink as consequences grow.',
    },
  },
  'cb-m5-53-01-channel-evolution': {
    heading: 'Routine jobs go to the app; high-stakes moments still need people',
    intro: 'Branches process fewer transfers yet still host the hardest conversations. Use a journey’s complexity and stakes to decide where it should be served.',
    spec: {
      layout: 'decision', title: 'The Evolution of Banking Distribution', kicker: '',
      root: { label: 'A customer journey to route', detail: 'Judge frequency, complexity, value, emotional stakes, identity needs and failure consequences' },
      question: 'Is the need routine and low-stakes, or complex and trust-heavy?',
      branches: [
        { condition: 'Routine and frequent', outcome: 'Digital self-service', detail: 'Balance enquiries, transfers and QR payments move to lower-cost mobile channels', tone: 'positive' },
        { condition: 'Complex or high-stakes', outcome: 'Relationship manager or branch', detail: 'Complex facilities, SME needs, restructuring and problem resolution keep expert support', tone: 'caution' },
        { condition: 'Starts simple, may escalate', outcome: 'Hybrid journey', detail: 'Context follows the customer from app to specialist without starting again', tone: 'positive' },
      ],
      note: 'Vietnam cashless volume grew 56.57% in 2024 and QR payments 172% in 2023; the research has no verified branch-reduction or channel-share figure.',
      takeaway: 'Removing a branch without replacing its trust function can reduce value, so reposition channels rather than erase them.',
    },
  },
  'cb-m5-53-02-revenue-models': {
    heading: 'Judging a free account by the relationship it brings in',
    intro: 'Emerging models are judged on relationship value rather than one product’s margin. See what adds to and what subtracts from a customer’s contribution.',
    spec: {
      layout: 'driverTree', title: 'How Banking Business Models Are Evolving', kicker: '',
      root: { label: 'Relationship contribution (CLV)', detail: 'Value after funding, revenue, risk, service and retention over time' },
      formula: 'Contribution = income + funding value − acquisition − service − expected credit loss − fraud − partner − capital costs',
      drivers: [
        { label: 'Funding value', detail: 'Salary flows and recurring activity grow low-cost CASA', op: '+' },
        { label: 'Income', detail: 'Loan spread plus transaction, card, wealth and advisory fees', op: '+' },
        { label: 'Acquisition cost (CAC)', detail: 'Partner reach can lower CAC but adds fees and dependency', op: '−' },
        { label: 'Service cost', detail: 'Self-service lowers marginal cost only after adoption and process retirement', op: '−' },
        { label: 'Risk and capital costs', detail: 'Expected credit loss, fraud and capital; unsuitable cross-sell erodes trust', op: '−' },
      ],
      note: 'Digital can worsen CIR during investment and improve it after adoption; the research does not quantify bank-level CAC, CLV or embedded-finance revenue.',
      takeaway: 'Cross-sell volume without suitability or risk discipline is not high-quality customer lifetime value.',
    },
  },
  'cb-m5-53-03-vietnam-map': {
    heading: 'One tap in Vietnam crosses banks, rails, merchants and partners',
    intro: 'The customer sees a single action, but several parties acquire, settle, earn fees and bear fraud. See what each contributes and where dependency enters.',
    spec: {
      layout: 'ecosystem', title: 'Market and Channel Developments in Vietnam', kicker: '',
      center: { label: 'Everyday customer activity', detail: 'Pay, save, borrow and manage cash' },
      actors: [
        { label: 'Mobile banking app', relation: 'Primary routine-service interface with lower marginal service cost', flows: ['service', 'information'] },
        { label: 'Branches and relationship managers', relation: 'Advice, exceptions, SME and complex credit that build trust', flows: ['service'] },
        { label: 'QR merchants', relation: 'Everyday payment acceptance that brings transactions and operating balances', flows: ['money'] },
        { label: 'NAPAS-linked payment rails', relation: 'Route, clear and settle payments between institutions', flows: ['money', 'information'] },
        { label: 'E-wallet and fintech partners', relation: 'Reach and specialist experience, with substitution and dispute risk', flows: ['service', 'risk'] },
        { label: 'Salary, merchant and telecom ecosystems', relation: 'Payroll and embedded context that support acquisition and CASA', flows: ['money'] },
      ],
      note: 'System-level evidence only: cashless volume +56.57% and value +31.35% (2024 YoY); contactless volume CAGR about 92% for recent years to 2024, period base not isolated. No bank-specific figure is claimed.',
      takeaway: 'The strategic unit is the connected journey, and a seamless front end can conceal fragmented responsibilities.',
    },
  },
  'cb-m5-55-01-outlook': {
    heading: 'Outturn, observation, target and estimate: Vietnam’s credit numbers',
    intro: 'A strong credit number can support revenue and still weaken a bank. First separate what each figure is, then ask whether funding, asset quality and capital can keep pace.',
    spec: {
      layout: 'table', title: 'Where Is Commercial Banking Heading?', kicker: '',
      headers: ['Figure', 'What it measures', 'Source and status'],
      rows: [
        { label: '15.08% (2024)', a: 'System outstanding-credit growth for the year', b: 'Outturn reported from SBV data' },
        { label: '≈19% (June 2025)', a: 'Credit growth year on year at mid-year', b: 'IMF Article IV staff report; observed, not a forecast' },
        { label: '15% (2026)', a: 'SBV credit-growth target', b: 'Policy target, not an outturn or bank entitlement' },
        { label: '≈16% (2025–2026)', a: 'System credit-growth estimate', b: 'Fitch, forward-looking, with a leverage and asset-quality warning' },
      ],
      note: 'Loan growth expands RWA and funding need, and NIM must be read after credit risk and cost. Never average these figures or turn a system target into one bank’s growth.',
      takeaway: 'Demand creates opportunity, but funding, asset quality and capital decide whether growth becomes durable profit.',
    },
  },
  'cb-m5-55-02-opportunity': {
    heading: 'An attractive segment is not yet an investable opportunity',
    intro: 'Digital banking, SME, transaction services, inclusion and green finance can all look promising. Test each against the conditions that make it worth a bank’s funding and capital.',
    spec: {
      layout: 'decision', title: 'Emerging Growth Opportunities for Banks', kicker: '',
      root: { label: 'Candidate growth opportunity', detail: 'Digital banking, retail and SME, transaction services, fees, inclusion, sustainable finance or ecosystem partnerships' },
      question: 'Do customer need, right to win, risk-adjusted economics and regulatory capacity all align?',
      branches: [
        { condition: 'All of them align', outcome: 'Test, then scale on evidence', detail: 'Run the cheapest test that could disprove the thesis; scale when behaviour and risk hold', tone: 'positive' },
        { condition: 'Promising but uncertain', outcome: 'Preserve option value', detail: 'Use pilots, modular capabilities or partnerships while adoption, legal detail or risk performance settles', tone: 'caution' },
        { condition: 'A constraint fails', outcome: 'Do not scale yet', detail: 'Acquisition cost, credit loss, conduct, partner dependence or capital use outweigh headline growth', tone: 'negative' },
      ],
      note: 'The research does not quantify every market pool, so this is a prioritisation tool, not a market-size claim; sustainable finance remains evidence- and risk-dependent.',
      takeaway: 'Do not scale because a trend label is fashionable; scale what survives funding, risk, capital and conduct tests.',
    },
  },
  'cb-m5-55-03-strategy': {
    heading: 'Moving a ratio the durable way versus the risky shortcut',
    intro: 'A board wants faster growth, a higher NIM, lower CIR and a stronger CAR at once. Compare how each target can be met sustainably or by quietly borrowing from risk and capital.',
    spec: {
      layout: 'compare', title: 'Strategic Choices for the Banks of Tomorrow', kicker: '',
      leftTitle: 'Durable route', rightTitle: 'Shortcut that weakens the bank',
      rows: [
        { label: 'Higher NIM', a: 'Deepen stable CASA, price for risk and capital, improve mix', b: 'Originate riskier high-yield loans' },
        { label: 'Faster loan growth', a: 'Grow where contribution holds after credit and capital', b: 'Volume needing expensive funding that raises RWA and future provisions' },
        { label: 'Lower CIR', a: 'Move recurring activity to lower total cost and retire legacy processes', b: 'Underinvest, or dual-run channels with weak usage' },
        { label: 'Higher ROE', a: 'Judge returns against CAR, liquidity and stress outcomes', b: 'Lift leverage and shrink capital headroom' },
        { label: 'More fee income', a: 'Suitable, trusted services customers value', b: 'Complex products that add conduct risk' },
        { label: 'Rising NPLs', a: 'Tighten or reprice risk, strengthen collections, protect liquidity', b: 'Chase volume to outgrow the problem' },
      ],
      note: 'Every lever runs through the balance sheet and P&L; the chapter’s five interactive cases are hypothetical teaching scenarios, not real bank data or targets.',
      takeaway: 'Optimising one ratio can weaken the bank, so every growth or return lever needs a guardrail on credit, funding, capital and trust.',
    },
  },
};

/** Chapters held because their text is marked Verification Required: no spec, neutral heading and intro. */
export const CB_M5_HELD_KINDS: readonly string[] = ['cb-m5-52-03-open-ecosystem'];
