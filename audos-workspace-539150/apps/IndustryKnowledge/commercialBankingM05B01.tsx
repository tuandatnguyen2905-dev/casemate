import { bankingChapter, bankingQuiz, registerVisual } from './commercialBankingCore';
import type { BankingLessonBundle, BankingVisualRegistry } from './commercialBankingCore';
import { CB_CASES } from './commercialBankingCases';

export const CB_M05_B01_VISUALS: BankingVisualRegistry = {};
const v = (kind: `cb-m5-${string}`, spec: Parameters<typeof registerVisual>[2]) => registerVisual(CB_M05_B01_VISUALS, kind, spec);
const s = (value: string | undefined, label: string, subtitle: string, description: string) => ({ value, label, subtitle, description });
const t = (term: string, definition: string) => ({ term, definition });

const L51 = '5.1 Consumer Trends';
const deck51 = [
  bankingChapter({
    title: 'How Banking Customers Are Changing', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '9 min',
    objective: 'Explain how digital-first behaviour, trust, inclusion and segment differences reshape bank products and operating models.',
    mateIntro: 'A customer may open an account on a phone, move money through QR, ask a branch adviser about a mortgage and still judge the bank by what happens when a suspicious transaction appears.',
    keyInsight: 'Customers increasingly expect digital convenience without surrendering security, accessibility or human support for consequential decisions.',
    what: 'Banking behaviour is becoming mobile-first, self-directed and less tolerant of friction. Yet trust, financial security and access remain adoption gates, especially for new-to-bank customers and complex needs.',
    how: 'Instant access and transparent service raise the baseline. Banks respond with simpler journeys, wider service hours, clearer controls and hybrid support while using engagement to deepen deposits and relationships.',
    why: 'Expectations change acquisition, service cost, funding and retention. A convenient current account can attract recurring balances; a trust failure can reverse that franchise quickly.',
    global: 'Across markets, mobile service, embedded finance and personalised experiences are broad trends, but regulation, digital identity, income and customer confidence shape the pace.',
    vietnam: 'Vietnam has leapfrogged rapidly to apps and QR. The research reports about 87% adult payment-account ownership in 2024, while rural access, digital confidence and trust still create different needs.',
    visualKind: v('cb-m5-51-01-customer-evolution', { layout: 'steps', title: 'Banking consumer-behaviour evolution', kicker: 'From access to durable relationship', tagLabel: 'Bank response', steps: [
      { label: 'Access', detail: 'Any-time account and payment access', tag: 'Mobile + inclusive design' },
      { label: 'Convenience', detail: 'Fast onboarding and low-friction service', tag: 'eKYC + self-service' },
      { label: 'Control', detail: 'Clear status, alerts and permission choices', tag: 'Transparency' },
      { label: 'Trust', detail: 'Security, fair treatment and recovery support', tag: 'Protection + people' },
      { label: 'Relevance', detail: 'Useful support for the customer context', tag: 'Responsible personalisation' },
    ], note: 'Digital-first does not mean digital-only. Needs differ by segment, confidence and decision complexity.', takeaway: 'The winning journey combines speed, control, trust and accessible support.' }),
    visualHeading: 'Customer evolution framework', visualIntro: 'The framework links changing behaviour to the operating capabilities banks must provide.', imageAlt: 'Five-stage banking consumer evolution framework from access to relevance.',
    statTiles: [s('≈87%', 'Adult payment-account ownership', 'Vietnam, 2024 reported', 'Secondary source citing SBV; supports broad access, not active-use frequency.'), s(undefined, 'Digital-first', 'Global direction', 'A channel preference, not proof that every customer or need is digital-only.'), s(undefined, 'Trust', 'Adoption gate', 'Security and fair treatment influence engagement and retention.')],
    statsNote: 'The 87% figure describes reported ownership, not monthly activity, profitability or universal digital confidence.',
    keyTerms: [t('Digital-first', 'A preference to begin or complete routine banking through digital channels.'), t('Financial inclusion', 'Useful, affordable access to appropriate financial services for people and businesses.'), t('Hybrid service', 'A journey that combines digital self-service with human help when needed.')],
    recap: ['Convenience raises the service baseline.', 'Trust and security remain decisive.', 'Digital-first is not digital-only.', 'Customer differences shape product and support design.'], chapterRecap: 'Customers reward banks that make everyday activity easy while remaining safe and accessible when stakes rise.', deepDiveTitle: 'Translate expectations into economics',
    deepDive: ['A zero-fee current account can be an acquisition and CASA strategy rather than a standalone fee product. The economic question is whether recurring balances, engagement and responsible cross-sell outweigh acquisition, technology, fraud and service costs.', 'Do not treat a national adoption statistic as a complete customer profile. Segment by household, SME and corporate needs; geography; confidence; access; financial complexity; and the decision being made.'],
    evidence: 'Record 31 supports the account-ownership figure and digital direction; it does not provide a primary consumer survey for every stated preference.', sourceIds: ['cb-m05-s01', 'cb-m05-s02']
  }),
  bankingChapter({
    title: 'Digital Banking and Customer Expectations', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '10 min',
    objective: 'Evaluate how mobile banking, digital payments, self-service, personalisation and security affect acquisition, engagement and retention.',
    mateIntro: 'A fast app may win a download. A dependable journey—from onboarding to payment confirmation to fraud resolution—is what earns primary-bank status.',
    keyInsight: 'Digital convenience creates relationship value only when the full journey is reliable, secure, understandable and worth repeating.',
    what: 'Digital banking covers onboarding, authentication, account service, payments, saving, borrowing, advice and support delivered through connected digital channels.',
    how: 'eKYC reduces onboarding friction; QR and mobile payments create repeat activity; data can tailor prompts and service; privacy, cyber controls and recovery processes protect trust.',
    why: 'Better journeys can lower acquisition and cost-to-serve while increasing engagement and retention. Poor reliability, opaque data use or weak incident handling can destroy those gains.',
    global: 'Banks increasingly connect digital identity, real-time payments and contextual service, but the maturity of infrastructure and customer-protection rules differs by market.',
    vietnam: 'Reported cashless transaction volume rose 56.57% and value 31.35% in 2024; QR payments grew 172% in 2023. These are channel-growth indicators, not market-share or active-user measures.',
    visualKind: v('cb-m5-51-02-journey', { layout: 'table', title: 'Traditional vs digital customer journey', kicker: 'Same banking jobs, different operating model', headers: ['Journey stage', 'Traditional-heavy', 'Digital-first / hybrid'], rows: [
      { label: 'Discover', a: 'Branch, referral, mass media', b: 'Search, ecosystem, app and referral' },
      { label: 'Open', a: 'Paper, branch verification, wait', b: 'eKYC, consent, remote checks' },
      { label: 'Transact', a: 'Counter, cash, fixed hours', b: 'App, QR, real-time status' },
      { label: 'Support', a: 'Call or branch queue', b: 'Self-service plus escalated human help' },
      { label: 'Deepen', a: 'Campaign or adviser-led', b: 'Contextual, consented and monitored offers' },
      { label: 'Protect', a: 'Periodic/manual controls', b: 'Continuous alerts, authentication and response' },
    ], takeaway: 'Digitisation changes the whole journey—not only the transaction screen.' }),
    visualHeading: 'Traditional and digital journeys', visualIntro: 'The comparison shows where speed, data and controls change customer and bank economics.', imageAlt: 'Comparison table of traditional-heavy and digital-first banking journeys.',
    statTiles: [s('+56.57%', 'Cashless transaction volume', 'Vietnam, 2024 YoY', 'SBV data reported by a legal-sector source.'), s('+31.35%', 'Cashless transaction value', 'Vietnam, 2024 YoY', 'Value grew more slowly than transaction count.'), s('+172%', 'QR payment growth', 'Vietnam, 2023 YoY', 'Secondary reporting of payment-system data.')],
    statsNote: 'Growth rates use different years and measures. They should not be added or treated as customer adoption shares.',
    keyTerms: [t('eKYC', 'Electronic processes used to identify and verify a customer remotely.'), t('Customer experience', 'The customer’s cumulative perception across interactions and outcomes.'), t('Data privacy', 'Rules and practices governing lawful, transparent and secure use of personal data.')],
    recap: ['Journey quality drives repeat use.', 'eKYC expands the acquisition funnel.', 'Payments create engagement and operating data.', 'Privacy, cyber resilience and recovery protect trust.'], chapterRecap: 'Digital value appears when a secure end-to-end journey converts access into trusted repeat activity.', deepDiveTitle: 'Measure the journey, not the feature',
    deepDive: ['Track completion, time, failure, abandonment, complaint and recovery rates by journey stage. Downloads or registered accounts alone do not prove meaningful engagement.', 'Personalisation should begin with a useful customer outcome, lawful data access and an accountable decision. A relevant offer delivered without trust can reduce rather than increase lifetime value.'],
    evidence: 'The Vietnam payment figures are validated secondary reports mapped to cb-m05-s02 and cb-m05-s03.', sourceIds: ['cb-m05-s02', 'cb-m05-s03']
  }),
  bankingChapter({
    title: 'Emerging Customer Needs in Vietnam', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '10 min',
    objective: 'Distinguish the evolving banking needs of Vietnamese households, SMEs and corporates and connect each to access, trust and economics.',
    mateIntro: '“Vietnam customer” is not one segment: a student paying by QR, a household building emergency savings, an SME managing invoices and a corporate treasurer managing liquidity need different banking systems.',
    keyInsight: 'Vietnam’s opportunity is segmented: inclusion, trust and digital access matter across groups, but the financial job and risk model differ.',
    what: 'Households need safe payments, savings, responsible credit and guidance; SMEs need cash-flow visibility, payments, working capital and practical underwriting; corporates need liquidity, transaction, trade, FX and risk services.',
    how: 'Banks combine digital access with segment-specific products, data and support. Cash-flow information can improve service and assessment, while relationship expertise remains important for complex or irregular needs.',
    why: 'Treating segments alike creates poor fit and risk. Product design, acquisition economics, service model, credit assessment and revenue potential all vary.',
    global: 'Financial inclusion and SME finance are global priorities, but identity systems, informality, collateral, data and market infrastructure create local constraints.',
    vietnam: 'High reported account ownership and fast cashless growth expand the reachable base. The research does not quantify current SME funding gaps or retail-loan penetration, so no unsupported segment size is asserted.',
    visualKind: v('cb-m5-51-03-segments', { layout: 'table', title: 'Vietnam customer segments and evolving needs', kicker: 'Different jobs require different propositions', headers: ['Segment', 'Evolving needs', 'Bank design question'], rows: [
      { label: 'Households', a: 'Payments, saving, protection, responsible borrowing', b: 'Can service remain simple, safe and affordable?' },
      { label: 'Students & young workers', a: 'Mobile payments, first savings, salary and credit-building', b: 'Can the bank earn trust before cross-selling?' },
      { label: 'Micro & small firms', a: 'Collections, working capital, cash-flow visibility', b: 'Can transaction data improve service and assessment?' },
      { label: 'Medium firms', a: 'Trade, payroll, treasury and growth finance', b: 'Can digital tools and RM expertise work together?' },
      { label: 'Corporates', a: 'Liquidity, payments, FX, trade and risk control', b: 'Can the bank integrate securely at scale?' },
      { label: 'Underserved communities', a: 'Access, confidence, suitable products and recourse', b: 'Can inclusion be useful, not account-opening only?' },
    ], takeaway: 'Segment by the financial job, constraints and risk—not by a generic “digital customer” label.' }),
    visualHeading: 'Vietnam customer-needs map', visualIntro: 'The map separates household, SME and corporate jobs while keeping trust and access visible.', imageAlt: 'Vietnam banking segments and evolving financial needs table.',
    statTiles: [s('≈87%', 'Adult payment-account ownership', 'Reported for 2024', 'Broad access indicator; active use and quality still vary.'), s(undefined, 'SME need', 'Cash-flow + finance', 'Opportunity is established qualitatively; no funding-gap estimate is invented.'), s(undefined, 'Corporate need', 'Integration + risk control', 'Complexity sustains a role for specialists and relationship teams.')],
    statsNote: 'The research gap for segment-level penetration and SME finance is preserved.',
    keyTerms: [t('Working capital', 'Short-term resources used to fund day-to-day business operations.'), t('Transaction banking', 'Payments, collections, cash management, trade and related services for organizations.'), t('Primary bank', 'The institution holding a customer’s main balances and recurring financial activity.')],
    recap: ['Household, SME and corporate needs differ.', 'Inclusion is more than opening an account.', 'Transaction activity can support service and assessment.', 'Human expertise remains valuable for complex needs.'], chapterRecap: 'Vietnam banks should design around distinct financial jobs while making access, security and recourse work for every segment.', deepDiveTitle: 'Avoid one-size-fits-all inclusion',
    deepDive: ['Measure whether customers can use the account repeatedly, understand costs and controls, obtain help and choose products suited to their capacity. Ownership without utility or trust is shallow inclusion.', 'For SMEs, use transaction and cash-flow data carefully: seasonality, informality, data gaps and business-model differences require context and human judgment.'],
    evidence: 'No bank-specific adoption figure or unsupported SME financing statistic is introduced.', sourceIds: ['cb-m05-s01', 'cb-m05-s02', 'cb-m05-s03']
  }),
];

const L52 = '5.2 Technology & Innovation Trends';
const deck52 = [
  bankingChapter({
    title: 'How Technology Is Transforming Banking', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '10 min',
    objective: 'Explain how onboarding, modern cores, cloud, automation and real-time service change customer experience, cost and scalability.',
    mateIntro: 'A digital front end cannot deliver real-time banking if customer records, payments, controls and operations remain fragmented behind it.',
    keyInsight: 'Bank transformation is an operating-model redesign: modern channels create value only when core systems, data, controls and people can support them.',
    what: 'Transformation spans digital onboarding, eKYC, modular core platforms, cloud services, workflow automation, real-time payments, observability and redesigned operations.',
    how: 'Modern architecture reduces handoffs and improves reuse; automation handles defined tasks; cloud can add flexibility; real-time data supports quicker service and control decisions.',
    why: 'The benefits can include faster journeys, lower unit cost, better scalability and shorter product cycles. Migration, cyber, resilience, vendor and change risks can offset them.',
    global: 'Banks modernise at different speeds through replacement, progressive migration or modular layers around legacy cores; no single architecture is universally best.',
    vietnam: 'Mobile apps, eKYC and QR are mainstream foundations. Advanced modernisation differs by institution, and record 31 supplies no system-wide cloud or core-adoption percentage.',
    visualKind: v('cb-m5-52-01-operating-model', { layout: 'table', title: 'Traditional vs digital banking operating model', kicker: 'Front end, process and control must change together', headers: ['Layer', 'Traditional-heavy model', 'Digital operating model'], rows: [
      { label: 'Access', a: 'Branch and fixed-hour dependency', b: 'Mobile, API and hybrid access' },
      { label: 'Onboarding', a: 'Paper and manual handoffs', b: 'eKYC and workflow orchestration' },
      { label: 'Core', a: 'Tightly coupled release cycles', b: 'Modular services and controlled change' },
      { label: 'Operations', a: 'Batch queues and re-keying', b: 'Straight-through processing with exceptions' },
      { label: 'Control', a: 'Periodic/manual review', b: 'Continuous monitoring and traceability' },
      { label: 'Scale', a: 'Capacity added project by project', b: 'Elastic infrastructure where suitable' },
    ], takeaway: 'A digital channel is only as strong as the operating system behind it.' }),
    visualHeading: 'Operating-model comparison', visualIntro: 'The comparison connects customer-facing speed to core, workflow and control capabilities.', imageAlt: 'Traditional-heavy and digital banking operating model comparison.',
    statTiles: [s(undefined, 'eKYC', 'Acquisition lever', 'Reduces remote-onboarding friction when controls and data quality hold.'), s(undefined, 'Automation', 'Unit-cost lever', 'Best for defined, repeatable processes with exception governance.'), s(undefined, 'Cloud', 'Architecture choice', 'Can add flexibility but introduces concentration, security and resilience questions.')],
    statsNote: 'No unsupported Vietnam cloud, automation or core-migration adoption rate is stated.',
    keyTerms: [t('Core banking', 'The systems that maintain fundamental customer, account and transaction records.'), t('Straight-through processing', 'Completing a process without manual intervention except defined exceptions.'), t('Operational resilience', 'The ability to deliver important services through disruption and recover safely.')],
    recap: ['Transformation extends beyond the app.', 'Architecture and workflows shape speed and scale.', 'Automation requires exception controls.', 'Migration and resilience risk need explicit management.'], chapterRecap: 'Technology lowers friction and unit cost only when the bank redesigns the full operating model safely.', deepDiveTitle: 'Build the transformation case',
    deepDive: ['Start with a customer or operating problem and a measurable baseline: cycle time, failure, manual effort, cost, availability, complaint or loss. Technology is a means, not the business objective.', 'Include migration, dual-running, vendor dependency, data conversion, cyber testing, employee adoption and fallback in the economics. A cheaper steady state may require substantial transition investment.'],
    evidence: 'The chapter treats cloud and modern cores as trends, not established industry-wide practice in Vietnam.', sourceIds: ['cb-m05-s06', 'cb-m05-s07', 'cb-m05-s02']
  }),
  bankingChapter({
    title: 'AI, Data Analytics, and Banking Innovation', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '11 min',
    objective: 'Evaluate banking AI use cases through value, data quality, explainability, fairness, privacy and human oversight.',
    mateIntro: 'A model may rank loan applications in milliseconds, but the bank remains accountable for the data, decision, customer outcome and appeal process.',
    keyInsight: 'AI creates banking value through a governed decision workflow—not through a model in isolation.',
    what: 'Potential uses include assisted credit assessment, fraud detection, risk monitoring, service routing, customer analytics, personalisation, demand forecasting and document automation.',
    how: 'Models identify patterns or generate outputs from data; rules, thresholds, people and systems turn those outputs into action; monitoring tests performance and drift.',
    why: 'Benefits can include speed, consistency, earlier detection and better allocation. Limitations include model risk, weak data, opacity, bias, privacy exposure, drift and automation error.',
    global: 'Fraud analytics and decision support are established in many banks; newer generative or autonomous capabilities remain uneven and should not be described as universal production practice.',
    vietnam: 'Techcombank reports that data and AI capabilities supported a 97.3% rise in its loans to merchants and micro-SMEs in 2024; the loss performance of that book is not disclosed separately. Techcombank has been recognised for data and AI capabilities, showing competitive investment. One example does not establish sector-wide maturity or prove every listed use case is deployed.',
    visualKind: v('cb-m5-52-02-ai-value-chain', { layout: 'steps', title: 'AI applications across the banking value chain', kicker: 'Use case plus governance at every stage', tagLabel: 'Control question', steps: [
      { label: 'Acquire', detail: 'Onboarding, document review, service routing', tag: 'Identity + consent?' },
      { label: 'Assess', detail: 'Credit, affordability and risk signals', tag: 'Explainable + fair?' },
      { label: 'Protect', detail: 'Fraud, AML and anomaly detection support', tag: 'False positives?' },
      { label: 'Serve', detail: 'Personalisation and assisted response', tag: 'Useful + private?' },
      { label: 'Operate', detail: 'Forecasting, workflow and coding support', tag: 'Verified + resilient?' },
      { label: 'Monitor', detail: 'Drift, outcomes, incidents and overrides', tag: 'Owner + fallback?' },
    ], note: 'Capabilities range from mature analytics to experimental generative workflows. Deployment status must be verified use case by use case.', takeaway: 'The model is one component of an accountable banking decision system.' }),
    visualHeading: 'AI application and governance framework', visualIntro: 'The framework pairs each opportunity with the control question that makes it safe to operate.', imageAlt: 'AI applications across six stages of the banking value chain.',
    statTiles: [s(undefined, 'Fraud analytics', 'Established category', 'Still requires threshold, review and customer-recovery design.'), s(undefined, 'Generative AI', 'Uneven maturity', 'Treat as assisted or experimental unless deployment evidence is explicit.'), s(undefined, 'Human oversight', 'Accountability layer', 'People govern consequential decisions, exceptions and appeals.')],
    statsNote: 'No experimental capability is represented as universal or fully autonomous industry practice.',
    keyTerms: [t('Model risk', 'Risk of harmful decisions from incorrect design, data, use or interpretation of a model.'), t('Explainability', 'The ability to understand and communicate relevant reasons behind a model-supported outcome.'), t('Model drift', 'Deterioration as data or relationships change after deployment.'), t('Human-in-the-loop', 'A workflow in which people review, govern or override model-supported action.')],
    recap: ['Start with a decision and owner.', 'Data quality bounds model quality.', 'Explainability and fairness matter for consequential use.', 'Monitor outcomes, drift and overrides.', 'Keep safe fallback and appeal routes.'], chapterRecap: 'AI improves decisions only when data, workflow, accountability and monitoring remain trustworthy.', deepDiveTitle: 'Test benefits and limitations together',
    deepDive: ['Compare the model-supported workflow with a defined baseline. Measure accuracy and speed, but also customer harm, false positives, bias, override quality, complaints, privacy and operational failure.', 'A bank should limit autonomy according to consequence and uncertainty. Assisted drafting is not the same control problem as approving credit, blocking an account or filing a regulatory report.'],
    evidence: 'The Vietnam example is a verified recognition of capability, not proof of system-wide deployment. The merchant-lending figure is company-reported in Techcombank’s Annual Report 2024.', sourceIds: ['cb-m05-s07', 'cb-m05-s06'],
    caseStudy: CB_CASES.techcombankDataLending
  }),
  bankingChapter({
    title: 'Open Banking, APIs, and Financial Ecosystems', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '10 min',
    objective: 'Explain open banking, API partnerships and embedded banking while distinguishing commercial deployment from proposed or sandbox-stage development.',
    mateIntro: 'A retailer can place a payment or financing journey inside its app, but regulated account, consent, security, settlement and risk responsibilities do not disappear.',
    keyInsight: 'APIs redistribute the customer journey across an ecosystem; they do not remove accountability for permission, security, resilience and customer outcomes.',
    what: 'Open banking refers to permissioned data or service access through standardized interfaces. APIs connect banks, fintechs and platforms; embedded banking places financial functions inside non-bank journeys.',
    how: 'Customers or businesses grant defined access; authenticated interfaces exchange data or initiate services; partners assemble propositions; contracts and controls allocate operating responsibilities.',
    why: 'Ecosystems can widen distribution, reduce integration friction and create new services. They also expand cyber exposure, consent complexity, dependency and incident coordination risk.',
    global: 'PSD2-style regimes illustrate regulated open-banking models, while commercial API banking also develops through bilateral or network arrangements.',
    vietnam: 'Record 31 describes open banking as early-stage. Decree 94/2025 created a controlled-testing mechanism, but detailed participant, product and implementation claims remain under legal verification; sandbox-stage is not market-wide deployment.',
    visualKind: v('cb-m5-52-03-open-ecosystem', { layout: 'mindmap', variant: 'orbit', title: 'Open banking ecosystem', kicker: 'Permissioned connections around the customer', center: 'Customer / business', centerSub: 'Consent • value • recourse', tagLabel: 'Role', rows: [
      { label: 'Bank', a: 'Accounts, payments, credit and controls', b: 'Regulated service provider' },
      { label: 'API layer', a: 'Authentication, permissions and service calls', b: 'Controlled interface' },
      { label: 'Fintech', a: 'Specialist experience or analytics', b: 'Partner / provider' },
      { label: 'Platform', a: 'Commerce, payroll or workflow context', b: 'Embedded distribution' },
      { label: 'Infrastructure', a: 'Identity, payment and security services', b: 'Shared enabler' },
      { label: 'Supervisor', a: 'Rules, oversight and testing perimeter', b: 'Public-interest guardrail' },
    ], takeaway: 'Every connection needs clear consent, responsibility, resilience and customer recourse.' }),
    visualHeading: 'Open banking ecosystem', visualIntro: 'The ecosystem view separates customer value, interfaces, partners and regulatory responsibility.', imageAlt: 'Open banking ecosystem of customers, banks, APIs, fintechs, platforms, infrastructure and supervisors.',
    statTiles: [s('Early-stage', 'Vietnam open banking', 'Research status', 'Frameworks are developing; maturity is not assumed.'), s('Sandbox', 'Controlled testing', 'Not full authorization', 'A supervised test is distinct from market-wide commercial approval.'), s(undefined, 'APIs', 'Integration mechanism', 'An API is not itself a business model or a transfer of accountability.')],
    statsNote: 'No sandbox eligibility rule, approved participant list or implementation requirement is asserted without primary-text verification.',
    keyTerms: [t('Open banking', 'Permissioned access to banking data or services through controlled interfaces.'), t('API', 'A defined interface that lets software systems exchange data or request functions.'), t('Embedded banking', 'Financial services integrated into a non-bank customer journey.'), t('Regulatory sandbox', 'A supervised testing arrangement with defined boundaries; not blanket market approval.')],
    recap: ['APIs connect services and journeys.', 'Consent and authentication are foundational.', 'Partnership expands dependency and incident risk.', 'Sandbox-stage is not full commercial deployment.'], chapterRecap: 'Open ecosystems can extend reach, but value depends on secure interfaces and unambiguous accountability.', deepDiveTitle: 'Commercially deployed or still testing?',
    deepDive: ['Classify each claim as live commercial service, limited pilot, approved sandbox test, proposed policy or general concept. Avoid turning a sandbox law into evidence that every open-banking use case is deployed.', 'Assess partner concentration, service availability, data minimization, consent revocation, dispute handling, cyber testing and exit arrangements before relying on an ecosystem.'],
    evidence: 'The early-stage assessment is supported by cb-m05-s05. Decree 94 detail remains restricted because the primary full text was not read in record 31.', sourceIds: ['cb-m05-s05', 'cb-m05-s06', 'cb-m05-s08'],
    restriction: 'Primary Decree 94/2025/ND-CP detail was not verified. Do not publish exact eligibility, pilot-category or implementation claims.'
  }),
];

export const CB_LESSON_51: BankingLessonBundle = { deck: deck51, quiz: bankingQuiz('cb-m5-l51', deck51), takeaways: { learned: 'You can explain changing banking behaviour, evaluate digital journeys and distinguish household, SME and corporate needs in Vietnam.', keyTakeaways: ['Digital-first is not digital-only.', 'Trust and security gate adoption and retention.', 'Journey quality converts access into engagement.', 'Segments require different propositions and risk models.'], businessImplications: 'Banks should design around customer jobs, connect convenience to CASA and service economics, and preserve human help where complexity or trust demands it.', remember: 'Convenience wins activity; trust earns the relationship.', nextLesson: L52 } };
export const CB_LESSON_52: BankingLessonBundle = { deck: deck52, quiz: bankingQuiz('cb-m5-l52', deck52), takeaways: { learned: 'You can connect digital transformation, AI and open ecosystems to customer, cost, risk and governance outcomes.', keyTakeaways: ['Transformation changes the operating model, not only the app.', 'AI is a governed decision workflow.', 'Data quality, explainability and human oversight constrain value.', 'APIs extend journeys while accountability remains.', 'Sandbox-stage is not market-wide deployment.'], businessImplications: 'Technology investment should start from a measurable customer or operating problem and include migration, cyber, model, partner and resilience controls.', remember: 'Technology scales both good design and weak controls.', nextLesson: '5.3 Market & Channel Trends' } };
