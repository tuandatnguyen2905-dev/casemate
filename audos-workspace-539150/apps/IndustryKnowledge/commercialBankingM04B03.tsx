import { bankingChapter, bankingQuiz, registerVisual } from './commercialBankingCore';
import type { BankingLessonBundle, BankingVisualRegistry } from './commercialBankingCore';
import { CB_CASE_SOURCES } from './commercialBankingCases';

export const CB_M04_B03_VISUALS: BankingVisualRegistry = {};
const v = (kind: `cb-m4-${string}`, spec: Parameters<typeof registerVisual>[2]) => registerVisual(CB_M04_B03_VISUALS, kind, spec);
const s = (value: string | undefined, label: string, subtitle: string, description: string) => ({ value, label, subtitle, description });
const t = (term: string, definition: string) => ({ term, definition });

const L41 = '4.1 Industry Competition Structure';
const deck41 = [
  bankingChapter({
    title: 'Where banks actually compete', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '9 min',
    objective: 'Explain how ownership, segment focus and regulation shape competition in commercial banking.',
    mateIntro: 'Banks compete for the same customer three times: for deposits, for credit relationships and for daily transaction activity. Yet licenses, capital and policy constraints prevent banking from behaving like an ordinary consumer market.',
    keyInsight: 'Banking rivalry operates across funding, lending and distribution inside a stability-focused regulatory perimeter.',
    what: 'Competitors include state-controlled commercial banks, private joint-stock banks, foreign banks or branches, and institutions focused more heavily on retail, corporate, rural, SME or affluent needs.',
    how: 'Banks compete for low-cost, stable deposits; lend within risk appetite and applicable credit constraints; and seek transaction primacy through apps, branches, relationship teams and ecosystems.',
    why: 'A funding win can support margin, a lending win consumes liquidity and capital, and a transaction win can deepen data and retention. Competition therefore links customer share to balance-sheet and risk capacity.',
    global: 'Large global banks compete through scale and breadth, while specialists win through focused underwriting or service capability. Global asset rankings measure scale, not competitive quality.',
    vietnam: 'The Big 4 combine scale and broad franchises; private banks differentiate through selected customer and digital propositions; foreign banks often emphasize multinational, trade and FX relationships.',
    visualKind: v('cb-m4-41-01-arenas', { layout: 'mindmap', variant: 'orbit', title: 'Three arenas of bank competition', kicker: 'Funding, risk deployment and relationship control', center: 'Customer franchise', centerSub: 'Trust + activity + balances', tagLabel: 'Economic prize', rows: [
      { label: 'CASA & deposits', a: 'Salary, operating and savings balances', b: 'Funding cost + liquidity' },
      { label: 'Lending', a: 'Price, approval, structure and service', b: 'NII − expected loss' },
      { label: 'Transactions', a: 'Payments, collections, trade and FX', b: 'Fees + engagement' },
      { label: 'Advice', a: 'RM, wealth and specialist expertise', b: 'Retention + cross-sell' },
      { label: 'Distribution', a: 'Branch, mobile, ecosystem and partner reach', b: 'Acquisition + service economics' },
      { label: 'Trust', a: 'Safety, reliability and fair treatment', b: 'Deposit and relationship durability' },
    ], takeaway: 'Banks compete for balances, risk-adjusted assets and primary relationship status at the same time.' }),
    visualHeading: 'Competitive structure map', visualIntro: 'The map shows why deposit, loan and digital competition cannot be evaluated separately.', imageAlt: 'Commercial banking competition map around customer franchise.',
    statTiles: [s('47.57%', 'Big 4 asset share', '30 reporting banks, 30 Jun 2025', 'Scoped sample excluding specified restructuring banks.'), s('41.9%', 'Big 4 loan share', 'End-2023', 'Outstanding-loan share reported by Viet Nam News citing SBV.'), s('≈50%', 'Big 4 deposit share', 'End-2023', 'Deposit share from the same period and source.')],
    statsNote: 'The figures use different dates and scopes; they describe structure and must not be merged into one market-share calculation.',
    keyTerms: [t('State-controlled bank', 'A commercial bank in which the state holds controlling ownership.'), t('Joint-stock bank', 'A bank organized as a shareholding company under applicable law.'), t('Funding franchise', 'The bank’s ability to attract stable funding at an attractive cost.')],
    recap: ['Banks compete for deposits, loans and activity.', 'Ownership and segment focus shape strategy.', 'Market shares must retain scope and period.'], chapterRecap: 'Bank competition is a linked contest for funding, risk deployment, distribution and trust.', deepDiveTitle: 'Structure before strategy',
    deepDive: ['Start a competitor analysis by grouping banks with comparable mandates and customers. A foreign corporate bank and a domestic mass-retail bank may overlap in trade or affluent services but do not compete symmetrically for every pool.', 'In Vietnam, lending growth cannot be interpreted independently of regulatory credit-room allocation. A bank’s demand and capital capacity may exceed its permitted growth in a given period.'],
    evidence: 'The Big 4 shares are sourced and period-labeled. No unsupported HHI, CR5 or current institution count is invented.', sourceIds: ['cb-m04-s05', 'cb-m04-s06', 'cb-m04-s02']
  }),
  bankingChapter({
    title: 'Porter’s Five Forces for banking', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '10 min',
    objective: 'Apply Five Forces to deposits, borrowers, substitutes, entry barriers and rivalry in banking.',
    mateIntro: 'A new app can look like a new bank without holding a banking license, a funding franchise or credit risk. Five Forces helps separate customer-interface competition from full-balance-sheet competition.',
    keyInsight: 'Entry barriers are high, but rivalry and substitution are intense because customers can move transactions, deposits and selected financial jobs among many providers.',
    what: 'The forces are rivalry among banks, bargaining power of depositors and funding providers, bargaining power of borrowers and fee customers, substitutes from non-banks or markets, and the threat of new licensed entry.',
    how: 'Deposit customers gain power when rates are transparent and switching is easy. Large borrowers can negotiate across banks or capital markets. Fintech and e-wallet services can substitute for selected jobs without replacing the whole bank. Licensing, capital, compliance and trust constrain entry.',
    why: 'A bank may face low new-bank entry yet high pressure on a product. Strategy should therefore identify which customer job is contestable and which regulated capability remains scarce.',
    global: 'Capital markets substitute for bank loans among eligible corporates; payments specialists can take interface share while banks retain settlement, safeguarding or credit roles.',
    vietnam: 'Banks compete intensely for deposits, credit allocation and digital engagement while e-wallets, fintechs and consumer-finance providers contest selected customer jobs.',
    visualKind: v('cb-m4-41-02-five-forces', { layout: 'mindmap', variant: 'sides', title: 'Porter’s Five Forces—commercial banking', kicker: 'Analyze the customer job, not only the license', center: 'Bank profitability', centerSub: 'Margin • fees • risk • capital', tagLabel: 'Vietnam lens', rows: [
      { label: 'Rivalry — High', a: 'Deposits, pricing, digital activity and relationships', b: 'CASA + credit-room competition' },
      { label: 'New entrants — Low', a: 'License, capital, compliance, funding and trust barriers', b: 'Interface entry is easier than bank entry' },
      { label: 'Depositor power — Moderate', a: 'Rate sensitivity and digital switching', b: 'Trust and salary ecosystems reduce mobility' },
      { label: 'Borrower power — Moderate', a: 'Large clients can negotiate; risky borrowers less so', b: 'Credit availability and collateral matter' },
      { label: 'Substitutes — Rising', a: 'Fintech, wallets, capital markets and non-bank credit', b: 'Substitute selected jobs, not all functions' },
    ], takeaway: 'High barriers to becoming a bank do not eliminate product-level competitive pressure.' }),
    visualHeading: 'Five Forces for banking', visualIntro: 'The diagram distinguishes licensed entry from substitution of individual customer jobs.', imageAlt: 'Porter Five Forces diagram for commercial banking.',
    statTiles: [s('8%', 'Basel total-capital minimum', 'Global framework', 'A prudential entry and growth constraint, not automatically Vietnam’s operative requirement.'), s('30', 'G-SIBs', '2022 list only', 'Historical list count; not presented as current.'), s(undefined, 'Credit room', 'Vietnam-specific constraint', 'Must be considered when interpreting lending rivalry.')],
    statsNote: 'Basel and FSB facts provide global context; local implementation and current lists require period-specific verification.',
    keyTerms: [t('Substitute', 'An alternative that performs a customer job without being the same product or institution.'), t('Entry barrier', 'A requirement or capability that makes new competition difficult.'), t('Credit room', 'An administrative constraint on bank credit growth in Vietnam, relevant to competitive interpretation.')],
    recap: ['Licensed entry is difficult.', 'Product-level substitutes can still grow quickly.', 'Depositor and borrower power varies by segment.', 'Rivalry links funding, lending and distribution.'], chapterRecap: 'Use Five Forces at the customer-job level and retain banking’s regulatory and balance-sheet constraints.', deepDiveTitle: 'Avoid generic force ratings',
    deepDive: ['Force intensity varies by segment. A multinational corporate may have strong bargaining power across banks and markets; a thin-file SME may have fewer alternatives. A high-balance depositor may be rate-sensitive, while a salary customer may be anchored by convenience.', 'A payments app can weaken the bank’s interface advantage while depending on bank accounts and payment rails. Competitive and complementary roles can coexist.'],
    evidence: 'The FSB count is explicitly the 2022 list. No current G-SIB count or Vietnam concentration index is asserted.', sourceIds: ['cb-m04-s02', 'cb-m04-s16']
  }),
  bankingChapter({
    title: 'Why bank advantages resist imitation', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '9 min',
    objective: 'Explain how trust, licenses, funding, capital, infrastructure, relationships and scale combine into durable advantage.',
    mateIntro: 'A competitor can copy a feature quickly. It cannot copy years of trusted balances, risk data, corporate mandates, capital and reliable operations overnight.',
    keyInsight: 'Durable bank advantage is a reinforcing system of trust, funding, risk capability, capital, infrastructure and relationships—not one app feature.',
    what: 'Potential moats include brand trust, regulated permissions, stable low-cost funding, underwriting data and discipline, capital capacity, payment and technology infrastructure, distribution and embedded relationships.',
    how: 'Trust attracts balances; balances lower funding pressure; data and relationships improve service and risk decisions; reliable operations deepen activity; retained earnings and capital support prudent growth.',
    why: 'The system compounds and is path-dependent. Copying a front-end feature does not reproduce the liability franchise, portfolio history or operating resilience behind it.',
    global: 'G-SIB status reflects scale and systemic importance but also brings higher loss-absorbency and resolvability expectations—size is both advantage and obligation.',
    vietnam: 'Big 4 scale and relationships are difficult to replicate; private banks can build focused advantages around CASA, ecosystems, service quality or selected segments.',
    visualKind: v('cb-m4-41-03-moat', { layout: 'steps', title: 'The bank advantage flywheel', kicker: 'Capabilities reinforce one another over time', tagLabel: 'Creates', steps: [
      { label: 'Trust & license', detail: 'Permission and confidence to hold funds', tag: 'Customer access' },
      { label: 'Funding franchise', detail: 'Stable deposits and liquidity', tag: 'Economic capacity' },
      { label: 'Relationships & data', detail: 'Repeated activity and cash-flow insight', tag: 'Relevance + risk signal' },
      { label: 'Risk discipline', detail: 'Underwriting, monitoring and recovery', tag: 'Asset quality' },
      { label: 'Infrastructure & scale', detail: 'Reliable digital and physical service', tag: 'Efficiency + reach' },
      { label: 'Capital & resilience', detail: 'Absorb loss and support growth', tag: 'Durability' },
    ], note: 'Weakness in one link—especially risk or trust—can reverse the flywheel.', takeaway: 'The moat is the connected operating system, not a standalone product feature.' }),
    visualHeading: 'Competitive-advantage flywheel', visualIntro: 'The flywheel shows how capabilities reinforce—or undermine—one another.', imageAlt: 'Six-stage commercial bank competitive advantage flywheel.',
    statTiles: [s('US$6.303tn', 'ICBC assets', '2024 ranking', 'Scale illustration, not a profitability or safety ranking.'), s(undefined, 'Trust', 'Slow to build, fast to lose', 'A balance-sheet and behavioral asset.'), s(undefined, 'Capital', 'Capacity and constraint', 'Supports resilience while limiting leverage.')],
    statsNote: 'Asset size alone does not establish a moat or superior risk-adjusted return.',
    keyTerms: [t('Economic moat', 'A durable system of advantages that protects attractive returns from imitation.'), t('Path dependence', 'An outcome shaped by accumulated history that cannot be recreated instantly.'), t('Loss absorbency', 'The capacity of capital or eligible instruments to bear losses.')],
    recap: ['Features are easier to copy than franchises.', 'Trust, funding and risk reinforce each other.', 'Scale adds obligations as well as advantage.'], chapterRecap: 'Bank advantage comes from a hard-to-copy capability system that must remain trusted and resilient.', deepDiveTitle: 'Test whether the advantage travels',
    deepDive: ['Ask whether a strength applies across segments. Corporate relationships may not create mass-retail CAC advantage; a popular app may not create wholesale funding strength. Specify the arena and economic mechanism.', 'Stress the moat: a funding advantage can disappear after a trust shock; rapid scale can overwhelm controls; concentrated relationships can become correlated exposure.'],
    evidence: 'S&P supports asset ranking only; FSB supports the G-SIB framework and historical 2022 list context.', sourceIds: ['cb-m04-s01', 'cb-m04-s16', 'cb-m04-s05']
  }),
];

const L42 = '4.2 Key Industry Players';
const deck42 = [
  bankingChapter({
    title: 'Read global players by model—not fame', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '9 min',
    objective: 'Classify major global commercial banks by scale, segment, model and disclosed performance rather than unsupported league tables.',
    mateIntro: 'A global asset ranking tells you how large a balance sheet is. It does not tell you which customer franchise is strongest, which bank is safest or which return is best.',
    keyInsight: 'Use scale to establish context, then analyze model, geography, funding, risk and return separately.',
    what: 'ICBC, Agricultural Bank of China, China Construction Bank and Bank of China lead the cited 2024 asset ranking; JPMorgan is the largest US bank in that source. All are broad institutions, but ownership, geography and business mix differ.',
    how: 'Profile a global bank across assets, loans and deposits, customer segments, geographic reach, non-interest businesses, capital, asset quality, efficiency and returns.',
    why: 'Scale benefits funding, investment and diversification, but can increase complexity, regulation and systemic obligations. Asset rank is neither a profit rank nor a safety rank.',
    global: 'The top-four Chinese banks and JPMorgan illustrate large universal-bank models shaped by different domestic systems and international footprints.',
    vietnam: 'Global banks operating in Vietnam often focus more on multinational corporate, trade and FX needs than broad domestic mass-retail deposits; the research did not quantify this positioning.',
    visualKind: v('cb-m4-42-01-global-profiles', { layout: 'table', title: 'Global bank profile—not a ranking', kicker: 'Ask the same six questions for every institution', headers: ['Lens', 'What to inspect', 'Why it matters'], rows: [
      { label: 'Scale', a: 'Assets, loans, deposits and geography', b: 'Capacity, not quality by itself' },
      { label: 'Model', a: 'Retail, corporate, markets and wealth mix', b: 'Revenue and risk engines' },
      { label: 'Funding', a: 'Deposit and wholesale structure', b: 'Cost + stability' },
      { label: 'Risk', a: 'Asset quality, concentration and liquidity', b: 'Profit resilience' },
      { label: 'Capital', a: 'Regulatory capacity and buffers', b: 'Loss absorption + growth constraint' },
      { label: 'Return', a: 'ROA, ROE, efficiency and trend', b: 'Value created after resources' },
    ], takeaway: 'A player profile explains how scale becomes—or fails to become—risk-adjusted return.' }),
    visualHeading: 'Global player comparison framework', visualIntro: 'The framework avoids equating size with strength or profitability.', imageAlt: 'Six-lens framework for comparing global banks.',
    statTiles: [s('US$6.303tn', 'ICBC assets', '2024', 'Approximate scale from S&P ranking.'), s('Top 4', 'Chinese banks', 'Cited 2024 asset ranking', 'Ranking context only.'), s('Largest US bank', 'JPMorgan', 'In cited ranking', 'Not a claim about global profitability or safety.')],
    statsNote: 'All rankings retain source and period; no unsupported current ranking is added.',
    keyTerms: [t('Total assets', 'The accounting value of resources controlled by a bank at a reporting date.'), t('Universal bank', 'A broad bank combining multiple customer and product businesses.'), t('Systemic importance', 'The potential for an institution’s distress to affect the broader financial system.')],
    recap: ['Asset rank measures scale.', 'Model and geography shape economics.', 'Scale brings regulatory and operating complexity.'], chapterRecap: 'Profile global banks through comparable lenses; never substitute fame or asset rank for analysis.', deepDiveTitle: 'Normalize before comparing',
    deepDive: ['Currency translation, reporting dates, consolidation and accounting standards can distort cross-border comparisons. Use source-reported values carefully and focus on ratio definitions and trends.', 'A bank may lead assets because of its domestic system and policy context; that does not automatically confer the same advantage in another market.'],
    evidence: 'S&P snippet supports the cited 2024 asset ranking only.', sourceIds: ['cb-m04-s01', 'cb-m04-s16']
  }),
  bankingChapter({
    title: 'Vietnam’s leading bank archetypes', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '11 min',
    objective: 'Describe the positioning of Vietcombank, BIDV, VietinBank, Agribank, Techcombank, MB, VPBank and ACB without unsupported rankings.',
    mateIntro: 'Eight prominent banks are not eight versions of the same competitor. Their ownership, customer franchises, ecosystems and risk-return choices create distinct archetypes.',
    keyInsight: 'Positioning describes where and how a bank competes; it must not be inflated into an unsupported rank or complete performance judgment.',
    what: 'The Big 4 combine broad national roles and scale: Agribank is associated with rural reach; BIDV and VietinBank with large corporate and state-linked relationships; Vietcombank with trade heritage and strong cited asset quality. Private banks pursue different focused propositions.',
    how: 'Techcombank emphasizes CASA, retail, wealth and ecosystem relationships; MB combines a broad group ecosystem; VPBank combines retail, SME and higher-yield consumer-finance exposure; ACB is commonly positioned around retail and SME banking but lacks a verified metric set here.',
    why: 'Archetypes explain strategic choices and likely KPI sensitivities. They do not excuse missing evidence or support a universal “best bank” conclusion.',
    global: 'Competitive maps often group banks by funding franchise, segment and risk model rather than one headline asset rank.',
    vietnam: 'FY2024 evidence supports selected PBT, CASA and NPL facts for VCB, TCB, MB and VPBank, but source quality and metric availability are uneven.',
    visualKind: v('cb-m4-42-02-vietnam-landscape', { layout: 'matrix', title: 'Vietnam competitive landscape—conceptual', kicker: 'Positioning map, not a performance ranking', xLabel: 'Segment focus', xLow: 'Broad national', xHigh: 'Focused propositions', yLabel: 'Business mix', yLow: 'Traditional balance sheet', yHigh: 'Ecosystem / fee depth', points: [
      { label: 'Agribank', x: 18, y: 28 }, { label: 'BIDV', x: 26, y: 40 }, { label: 'VietinBank', x: 32, y: 43 }, { label: 'Vietcombank', x: 40, y: 58 },
      { label: 'ACB', x: 68, y: 50 }, { label: 'VPBank', x: 78, y: 45 }, { label: 'MB', x: 75, y: 70 }, { label: 'Techcombank', x: 84, y: 76 },
    ], note: 'Coordinates are qualitative teaching positions derived from model descriptions—not measured scores or market rankings.', takeaway: 'Use the map to ask model questions, then validate every performance claim separately.' }),
    visualHeading: 'Vietnam competitive landscape', visualIntro: 'The qualitative map differentiates models without inventing a quantitative league table.', imageAlt: 'Conceptual matrix positioning eight leading Vietnam banks by breadth and ecosystem depth.',
    statTiles: [s('VND42,236bn', 'Vietcombank PBT', 'FY2024 · company-reported', 'Vietcombank Annual Report 2024 (about +2.2% on 2023).'), s('40.9%', 'Techcombank CASA ratio', 'End-2024 · company-reported', 'Techcombank FY2024 results release (January 2025); Auto-earning counted as savings.'), s('39.3%', 'MB CASA ratio', 'End-2024 · company-reported', 'MB Annual Report 2024 (VND281tn); its basis differs from Techcombank’s, so do not rank them.'), s('VND20,013bn', 'VPBank PBT', 'Consolidated FY2024 · company-reported', 'VPBank Annual Report 2024; includes FE CREDIT.')],
    statsNote: 'Selected facts use different evidence quality and are not a full ranking. Agribank, BIDV, VietinBank and ACB lack a uniform verified metric set here.',
    keyTerms: [t('Positioning', 'The customer, product and capability space in which a bank chooses to compete.'), t('Ecosystem banking', 'Banking embedded in a broader group or partner network that can support acquisition and activity.'), t('Consumer finance', 'Higher-yield retail credit typically serving smaller-ticket, often less-secured needs with distinct risk economics.')],
    recap: ['Vietnam’s leading banks follow distinct models.', 'Positioning is not ranking.', 'Selected metrics cannot fill an incomplete scorecard.', 'ACB and Big 4 claims remain qualitative where evidence is absent.'], chapterRecap: 'Use archetypes to form hypotheses; use like-for-like evidence to test performance.', deepDiveTitle: 'Safe player language',
    deepDive: ['Say “is positioned toward” or “the cited FY2024 disclosure reports,” then name the source and period. Avoid “best,” “largest network,” “fee leader” or “most conservative” unless a defined, verified metric proves it.', 'The FY2024 figures above are company-reported in each bank’s own results release or annual report (Techcombank CASA 40.9%, MB CASA 39.3%, Vietcombank PBT VND42,236bn, VPBank consolidated PBT VND20,013bn), but each uses its own definition, so none can be ranked against another. The current source set does not support complete rankings for eight banks.'],
    evidence: 'The chapter preserves every source-quality limitation and uses qualitative positioning where metrics are incomplete.', sourceIds: ['cb-m04-s05', 'cb-m04-s07', 'cb-m04-s08', 'cb-m04-s09', 'cb-m04-s10', 'cb-m04-s11', 'cb-m04-s12', 'cb-m04-s13'],
    extraSources: [CB_CASE_SOURCES.tcbResultsFy24],
    restriction: 'Unsupported rankings and unverified claims about network size, fee leadership or conservative asset quality are excluded.'
  }),
  bankingChapter({
    title: 'What market position really means', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '9 min',
    objective: 'Evaluate market position through scale, diversification, funding strength, performance and strategic relevance.',
    mateIntro: 'A bank can be large in assets, strong in deposits, profitable in one year and weak in a target segment. “Market leader” is meaningless until the market and metric are named.',
    keyInsight: 'Market position is multidimensional: define the market, denominator, date and economic mechanism before using a share or rank.',
    what: 'Useful lenses include total assets, customer loans and deposits, segment share, transaction activity, funding mix, revenue diversification, asset quality, capital, profitability and distribution strength.',
    how: 'Define the market and sample, calculate a same-date share, compare growth and economics, then explain whether the position produces sustainable customer or funding advantage.',
    why: 'A high asset share can reflect low-margin or capital-intensive activity; a smaller bank can have stronger returns or a more valuable niche.',
    global: 'Global asset rank and local segment leadership answer different questions; both require defined scope.',
    vietnam: 'The 47.57% Big 4 asset share refers to 30 reporting banks at 30 June 2025—not the entire system under every definition. End-2023 loan and deposit shares use a different period.',
    visualKind: v('cb-m4-42-03-position', { layout: 'steps', title: 'Market-position test', kicker: 'Turn a vague leadership claim into analysis', tagLabel: 'Deliverable', steps: [
      { label: 'Define market', detail: 'Geography, segment, product and competitor set', tag: 'Explicit scope' },
      { label: 'Choose metric', detail: 'Assets, loans, deposits, activity or revenue', tag: 'Relevant numerator' },
      { label: 'Match date', detail: 'Same period and basis for all players', tag: 'Comparable dataset' },
      { label: 'Explain economics', detail: 'Funding, risk, fee and capital implications', tag: 'Value mechanism' },
      { label: 'Stress durability', detail: 'Trust, regulation, switching and execution', tag: 'Strategic conclusion' },
    ], note: 'If scope or denominator is unclear, call the field Data Not Verified.', takeaway: 'A market position matters only when its economic value and comparability are clear.' }),
    visualHeading: 'Market-position framework', visualIntro: 'The test converts a headline rank into a defined and interpretable claim.', imageAlt: 'Five-step framework for evaluating a bank market position.',
    statTiles: [s('VND10.11qn', 'Big 4 assets', '30-bank sample, 30 Jun 2025', 'Scope and date retained.'), s('47.57%', 'Big 4 share', 'Same 30-bank sample', 'Not a universal system share.'), s('VND1.049qn', 'VPBank assets', '30 Jun 2025', 'Cannot enter an FY2024 table.')],
    statsNote: 'These scale values support a 30 June 2025 position view only; they are not FY2024 profitability evidence.',
    keyTerms: [t('Market share', 'A defined institution or group measure divided by a defined market total for the same date and basis.'), t('Diversification', 'Distribution of earnings or risk across products, customers, geographies or activities.'), t('Denominator discipline', 'Using the correct, comparable total when calculating a ratio or share.')],
    recap: ['Name the market and metric.', 'Match dates and bases.', 'Scale does not equal profitability.', 'Position must connect to an economic advantage.'], chapterRecap: 'A defensible market-position claim is scoped, comparable and tied to economic value.', deepDiveTitle: 'Position is not performance',
    deepDive: ['Separate position—where the bank stands—from performance—what return and risk it produced. Assets, deposits and loans are stocks; PBT and income are flows. Their relationships require defined ratios.', 'Diversification should be tested, not presumed from product breadth. A bank may offer many products yet depend economically on one funding pool or risk segment.'],
    evidence: 'VietnamNet provides the exact sample and date for the asset facts. No unsupported total-system denominator is substituted.', sourceIds: ['cb-m04-s05', 'cb-m04-s06']
  }),
];

const L43 = '4.3 Competitor Benchmarking';
const deck43 = [
  bankingChapter({
    title: 'Build a bank benchmark that means something', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '13 min',
    objective: 'Use a mandatory KPI framework and explain what each metric reveals—and what it cannot reveal alone.',
    mateIntro: 'A polished comparison table can be analytically empty if periods, definitions and consolidation bases differ. Benchmarking begins with a data dictionary, not a ranking.',
    keyInsight: 'A bank benchmark is a linked system: scale and funding feed margin; efficiency and credit cost shape ROA; capital constrains leverage and therefore ROE.',
    what: 'The fourteen mandatory metrics are total assets, customer loans, customer deposits, CASA, cost of funds, NIM, CIR, NPL, loan-loss coverage, cost of risk, CAR, ROA, ROE and PBT. Add credit growth, deposit growth and non-interest income to explain movement and diversification—seventeen benchmark fields in total.',
    how: 'Group them into scale/growth, funding/margin, efficiency/asset quality, and capital/returns. For every cell record period, group or standalone basis, formula, units, source and verification status.',
    why: 'Each metric sees one layer. NIM can be high because of mix or risk; low CIR can indicate efficiency or underinvestment; high ROE can reflect strength or leverage; high coverage can reflect prudence or severe NPLs.',
    global: 'Professional analysts reconcile definitions and restate or leave blank when evidence is not comparable.',
    vietnam: 'FY2024 disclosures provide selected PBT, CASA and NPL values, but the research does not support a complete four-bank KPI league table.',
    visualKind: v('cb-m4-43-01-kpi-matrix', { layout: 'table', title: 'Seventeen-field competitor benchmark', kicker: 'Fourteen mandatory metrics + three explanatory fields', headers: ['Metric family', 'What it reveals', 'Do not conclude alone'], rows: [
      { label: 'Assets / loans / deposits', a: 'Scale, mix and balance-sheet capacity', b: 'Profitability or quality' },
      { label: 'Credit / deposit growth', a: 'Direction and funding alignment', b: 'Sustainable profit or future asset quality' },
      { label: 'CASA / cost of funds', a: 'Funding composition and price', b: 'Overall liquidity or guaranteed NIM' },
      { label: 'NIM / non-interest income', a: 'Spread economics and revenue diversification', b: 'Bottom-line profit or recurrence' },
      { label: 'NIM', a: 'NII per average earning asset', b: 'Net profit margin or risk-adjusted spread' },
      { label: 'CIR', a: 'OPEX per unit of operating income', b: 'Long-term efficiency without investment context' },
      { label: 'NPL / LLCR / cost of risk', a: 'Problem assets, reserve buffer and period charge', b: 'One interchangeable asset-quality score' },
      { label: 'CAR / ROA / ROE / PBT', a: 'Capital cushion, asset return, equity return and profit scale', b: 'A universal winner without leverage and basis checks' },
    ], takeaway: 'Every KPI needs a definition, companion metric and comparable source basis.' }),
    visualHeading: 'Interactive benchmarking matrix', visualIntro: 'Use the matrix as a checklist: inspect a family, then test its companion metrics before drawing a conclusion.', imageAlt: 'Benchmarking matrix for fourteen mandatory bank KPIs plus credit growth, deposit growth and non-interest income.',
    statTiles: [s(undefined, 'NPL ratio', 'NPLs ÷ gross loans', 'Stock of problem loans, not period provision expense.'), s(undefined, 'Cost of risk', 'Provisions ÷ average loans', 'Period credit-loss charge, subject to definition.'), s(undefined, 'CAR', 'Regulatory capital ÷ RWA', 'Not accounting equity divided by assets.'), s(undefined, 'CIR', 'OPEX ÷ operating income', 'Efficiency ratio requiring consistent revenue scope.')],
    statsNote: 'Formula definitions may vary across disclosures. Always retain the bank’s own definition and reconcile it before comparison.',
    keyTerms: [t('Data dictionary', 'A record of metric formula, period, scope, units, source and verification status.'), t('Consolidation basis', 'Whether figures cover the banking entity alone or the full consolidated group.'), t('Like-for-like', 'Comparable data aligned on period, definition, units and entity scope.')],
    recap: ['Fourteen mandatory metrics plus three explanatory fields cover distinct layers.', 'Metric families should be interpreted together.', 'A data dictionary precedes ranking.', 'Missing evidence should remain missing.'], chapterRecap: 'A meaningful benchmark preserves definitions and links KPIs through the bank economic chain.', deepDiveTitle: 'The KPI interpretation chain',
    deepDive: ['Funding mix and cost influence NIM. NIM plus fee income and volume create operating income. CIR determines what survives OPEX. Cost of risk determines what survives credit losses. ROA captures the resulting return on assets. CAR constrains leverage; leverage then helps translate ROA into ROE.', 'PBT is an amount and naturally favors larger institutions. ROA and ROE are ratios, but they still require matching period, average denominators and group scope. No metric should be used as a one-column league table.'],
    evidence: 'The chapter implements every metric mandated by the brief without inventing unavailable figures.', sourceIds: ['cb-m04-s07', 'cb-m04-s08', 'cb-m04-s09', 'cb-m04-s10', 'cb-m04-s11', 'cb-m04-s12', 'cb-m04-s13'],
    restriction: 'Unverified or unreconciled fields must be labeled Data Not Verified, not inferred.'
  }),
  bankingChapter({
    title: 'Compare VCB, TCB, MB and VPBank—without fabrication', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '14 min',
    objective: 'Use the verified subset of FY2024 evidence while keeping missing and incompatible bank metrics visibly unresolved.',
    mateIntro: 'The honest benchmark is incomplete. Four FY2024 PBT figures exist, all company-reported, but from different document types and without reconciled definitions. Filling the rest would create precision the evidence does not support.',
    keyInsight: 'A partial, qualified benchmark is more decision-useful than a complete-looking table built from mismatched periods and sources.',
    what: 'The source set offers FY2024-attributed PBT for VCB, TCB, MB and VPBank; NPL for VCB and TCB; CASA for TCB and MB; and selected differently dated scale facts.',
    how: 'Show the available field with source quality; label the others Data Not Verified. Do not place VPBank’s 30 June 2025 assets or VCB’s end-2024 equity into an FY2024 operating KPI table as substitutes for missing fields.',
    why: 'Period alignment alone is insufficient: consolidation basis, audited status, formula and source quality must also align.',
    global: 'Evidence-led benchmarking treats blanks as controls against false conclusions.',
    vietnam: 'The available subset supports business-model discussion—VCB’s cited asset quality, TCB/MB CASA, VPBank’s higher-yield group model—but not a complete four-bank ranking.',
    visualKind: v('cb-m4-43-02-four-bank', { layout: 'table', title: 'Four-bank evidence matrix—FY2024 attributed', kicker: 'Verified subset only; blank means Data Not Verified', headers: ['Bank', 'Available evidence', 'Data Not Verified'], rows: [
      { label: 'Vietcombank', a: 'PBT VND42,236bn; NPL 1.0% end-2024', b: 'Assets, loans, deposits, growth, CASA, CoF, NIM, non-interest income, CIR, LLCR, CoR, CAR, ROA, ROE' },
      { label: 'Techcombank', a: 'PBT VND27.5tn; CASA 40.9%; NPL 1.17%', b: 'Assets, loans, deposits, growth, CoF, NIM, non-interest income, CIR, LLCR, CoR, CAR, ROA, ROE' },
      { label: 'MB', a: 'PBT VND28,829bn; CASA VND281tn / 39.3%', b: 'Assets, loans, deposits, growth, NPL, CoF, NIM, non-interest income, CIR, LLCR, CoR, CAR, ROA, ROE' },
      { label: 'VPBank', a: 'Consolidated PBT >VND20tn, including FE Credit', b: 'Assets, loans, deposits, growth, CASA, NPL, CoF, NIM, non-interest income, CIR, LLCR, CoR, CAR, ROA, ROE' },
    ], takeaway: 'Use the matrix to identify the next evidence needed—not to manufacture a winner.' }),
    visualHeading: 'Four-bank benchmarking dashboard', visualIntro: 'The dashboard makes every evidence gap explicit and refuses to mix 2025 scale with FY2024 performance.', imageAlt: 'Four-bank evidence matrix with verified fields and Data Not Verified gaps.',
    statTiles: [s('VND42,236bn', 'VCB PBT', 'FY2024 · company-reported', 'Vietcombank Annual Report 2024.'), s('VND27.5tn', 'TCB PBT', 'FY2024 · consolidated · company-reported', 'Techcombank FY2024 results release (January 2025).'), s('VND28,829bn', 'MB PBT', 'FY2024 · company-reported', 'MB Annual Report 2024.'), s('VND20,013bn', 'VPBank PBT', 'Consolidated FY2024 · company-reported', 'VPBank Annual Report 2024; includes FE CREDIT.')],
    statsNote: 'The four PBT figures are all company-reported for FY2024, but from different document types (annual reports and a results release), and consolidation scope and definitions are not reconciled. Reconfirm the audited consolidated statements before any league table.',
    keyTerms: [t('Data Not Verified', 'A field intentionally left unresolved because available evidence is missing or not comparable.'), t('Source basis', 'The type and quality of evidence—audited statement, company release, rating report or secondary research.'), t('Endpoint balance', 'A balance measured at a reporting date rather than averaged over a period.')],
    recap: ['The PBT source basis is uneven.', 'VCB/TCB NPL definitions were not reconciled.', 'TCB/MB CASA definitions were not reconciled.', 'VPBank June-2025 assets do not belong in FY2024.'], chapterRecap: 'The safe four-bank benchmark is deliberately incomplete and fully caveated.', deepDiveTitle: 'Exact comparability limitations',
    deepDive: ['VCB’s, MB’s and VPBank’s PBT come from their own FY2024 annual reports and TCB’s from its FY2024 results release; none was reconciled to audited consolidated statements here, which a publication-quality comparison would require.', 'VCB’s end-2024 NPL is about 1.0% in Fitch’s figure and 0.96–0.97% in its own report, while TCB’s 1.17% is company-reported in its FY2024 results release; definitions were not reconciled. TCB’s 40.9% CASA ratio (Auto-earning counted as savings) and MB’s 39.3% (VND281tn) are both company-reported, but MB’s report lists Techcombank’s CASA balance at VND199tn, so the numerator definitions differ and were not reconciled.', 'The research lacks complete FY2024 audited consolidated assets, loans, deposits, cost of funds, NIM, CIR, LLCR, cost of risk, CAR, ROA and ROE. Those cells remain Data Not Verified.'],
    evidence: 'All available values retain period and source-quality caveats. No complete four-bank table is fabricated.', sourceIds: ['cb-m04-s07', 'cb-m04-s08', 'cb-m04-s09', 'cb-m04-s10', 'cb-m04-s11', 'cb-m04-s12', 'cb-m04-s13'],
    extraSources: [CB_CASE_SOURCES.tcbResultsFy24],
    restriction: 'Do not publish a four-bank league table until all metrics are reconciled from audited consolidated statements.'
  }),
  bankingChapter({
    title: 'Interpret trade-offs, not winners', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '12 min',
    objective: 'Interpret NIM, credit risk, CASA, funding stability, growth, CIR, ROE, CAR and provisions as trade-offs.',
    mateIntro: 'The highest NIM can lose to the lowest credit cost. The lowest CIR can hide underinvestment. The highest ROE can reflect thin capital. Benchmarking becomes useful when it explains these tensions.',
    keyInsight: 'Bank strength is multidimensional; interpret each attractive metric beside the risk, cost or capital that can produce it.',
    what: 'Key trade-offs are NIM versus credit risk, CASA versus funding stability, growth versus asset quality, CIR versus technology investment, ROE versus capital adequacy, and provisions versus current profit.',
    how: 'Build paired hypotheses, then seek companion evidence. If NIM is high, inspect mix and cost of risk. If ROE is high, inspect ROA and CAR. If growth is fast, inspect underwriting cohorts, NPL migration and provisions.',
    why: 'Single-metric ranking rewards visible outcomes while hiding the resources and risks that generated them.',
    global: 'A bank can intentionally accept near-term CIR pressure from investment or near-term PBT pressure from provisions to strengthen future economics.',
    vietnam: 'Different VCB, TCB, MB and VPBank models make trade-off analysis more useful than forcing a universal rank from incomplete FY2024 evidence.',
    visualKind: v('cb-m4-43-03-tradeoffs', { layout: 'cards', title: 'KPI trade-off dashboard', kicker: 'Pair every headline with its counter-question', tagLabel: 'Ask next', rows: [
      { label: 'High NIM', a: 'May reflect pricing, mix or risk appetite', b: 'Cost of risk, NPL and capital?' },
      { label: 'High CASA', a: 'Can lower funding cost and deepen activity', b: 'Stability, concentration and service cost?' },
      { label: 'Fast growth', a: 'Can expand future revenue', b: 'Cohort quality, provisions and RWA?' },
      { label: 'Low CIR', a: 'Can indicate operating efficiency', b: 'Is technology or control investment adequate?' },
      { label: 'High ROE', a: 'Can reflect strong ROA or high leverage', b: 'CAR, asset risk and sustainability?' },
      { label: 'High provisions', a: 'Reduce current PBT', b: 'Are reserves improving resilience?' },
    ], takeaway: 'The best analysis explains why metrics coexist—not which isolated number is highest.' }),
    visualHeading: 'Benchmark interpretation dashboard', visualIntro: 'Each card turns an apparent strength into a disciplined next question.', imageAlt: 'Six-card bank KPI trade-off dashboard.',
    statTiles: [s('3.0 pts', 'Bank A heuristic', 'Hypothetical: 6.0% NIM − 3.0% CoR', 'Directional only because the ratios can use different denominators.'), s('3.5 pts', 'Bank B heuristic', 'Hypothetical: 4.0% NIM − 0.5% CoR', 'Directional only; fees, CIR, tax and capital are omitted.'), s(undefined, 'No single winner', 'Metric trade-offs', 'Rank only for a defined decision and evidence set.')],
    statsNote: 'This NIM-minus-cost-of-risk heuristic is not real bank data or a calculated net spread. NIM uses average earning assets while cost of risk commonly uses average loans; reconcile denominators before formal analysis.',
    keyTerms: [t('Companion metric', 'A second measure needed to interpret the first safely.'), t('Margin-after-risk heuristic', 'A directional subtraction that is not a formal spread when ratio denominators differ.'), t('Underinvestment', 'Insufficient spending on capability, controls or resilience that may temporarily flatter efficiency.')],
    recap: ['High NIM can carry high credit risk.', 'CASA needs a stability and cost lens.', 'Low CIR may hide underinvestment.', 'ROE requires ROA and CAR context.', 'Provisions reduce today’s profit but can strengthen resilience.'], chapterRecap: 'Benchmarking should reveal business-model trade-offs and resilience, not produce a false universal winner.', deepDiveTitle: 'Scenario interpretation',
    deepDive: ['Hypothetical Bank A has 6.0% NIM and 3.0% cost of risk, leaving 3.0% before fees, OPEX and tax. Bank B has 4.0% NIM and 0.5% cost of risk, leaving 3.5%. Bank B’s lower headline NIM can support better risk-adjusted economics.', 'The subtraction is deliberately incomplete: CIR, non-interest income, tax, loan-versus-earning-asset denominators and capital are omitted. Use it to ask better questions, not to calculate ROA.', 'A strategic conclusion should state the decision: which bank is better funded, more resilient, more efficient, or better suited to a target segment? Different questions can produce different answers.'],
    evidence: 'The scenario is explicitly hypothetical. All real-bank gaps and source-basis mismatches remain visible.', sourceIds: ['cb-m04-s07', 'cb-m04-s10', 'cb-m04-s11'],
    restriction: 'Avoid single-metric rankings and do not fill unverified bank fields.'
  }),
];

export const CB_LESSON_41: BankingLessonBundle = { deck: deck41, quiz: bankingQuiz('cb-m4-l41', deck41), takeaways: { learned: 'You can map banking competition, apply Five Forces and explain why bank advantages are difficult to replicate.', keyTakeaways: ['Banks compete for funding, lending and activity.', 'Product substitution can rise despite high bank-entry barriers.', 'Trust, funding, risk and capital form a capability system.', 'Scale is not profit or safety.'], businessImplications: 'Competitive strategy should identify the arena, regulated capability and economic prize before choosing a response.', remember: 'The moat is the trusted operating system—not one feature.', nextLesson: L42 } };
export const CB_LESSON_42: BankingLessonBundle = { deck: deck42, quiz: bankingQuiz('cb-m4-l42', deck42), takeaways: { learned: 'You can profile global and Vietnam banks by model and evaluate market position without unsupported rankings.', keyTakeaways: ['Asset rankings establish context only.', 'Vietnam’s leading banks follow distinct archetypes.', 'Positioning is not performance.', 'Every market-share claim needs scope and date.'], businessImplications: 'Use archetypes to form hypotheses, then test them with matched funding, risk, efficiency, capital and return evidence.', remember: 'Name the market, metric and period before calling any bank a leader.', nextLesson: L43 } };
export const CB_LESSON_43: BankingLessonBundle = { deck: deck43, quiz: bankingQuiz('cb-m4-l43', deck43), takeaways: { learned: 'You can construct a fourteen-metric mandatory bank benchmark, add three explanatory fields, preserve Data Not Verified cells and interpret KPI trade-offs.', keyTakeaways: ['A data dictionary precedes comparison.', 'Source basis matters as much as period.', 'Incomplete evidence must remain incomplete.', 'Interpret NIM beside risk, ROE beside CAR and growth beside asset quality.', 'Never rank banks on one metric.'], businessImplications: 'Evidence-disciplined benchmarking identifies real capability gaps and prevents strategy built on mismatched or fabricated comparisons.', remember: 'A qualified partial benchmark is stronger than a false complete one.', nextLesson: '4.4 Key Success Factors' } };
