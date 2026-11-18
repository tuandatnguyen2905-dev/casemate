import { useState } from 'react';
import { bankingChapter, bankingQuiz, registerVisual } from './commercialBankingCore';
import type { BankingLessonBundle, BankingVisualRegistry } from './commercialBankingCore';

export const CB_M05_B03_VISUALS: BankingVisualRegistry = {};
const v = (kind: `cb-m5-${string}`, spec: Parameters<typeof registerVisual>[2]) => registerVisual(CB_M05_B03_VISUALS, kind, spec);
const s = (value: string | undefined, label: string, subtitle: string, description: string) => ({ value, label, subtitle, description });
const t = (term: string, definition: string) => ({ term, definition });

const L55 = '5.5 Growth Outlook & Strategic Opportunities';
const deck55 = [
  bankingChapter({
    title: 'Where Is Commercial Banking Heading?', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '11 min',
    objective: 'Interpret global and Vietnam banking outlooks by separating historical results, forecasts, regulatory targets and scenarios.',
    mateIntro: 'A strong credit-growth forecast can support revenue and still weaken a bank if funding, underwriting, provisions or capital fail to keep pace.',
    keyInsight: 'The outlook is high growth with rising risk: demand creates opportunity, but funding, asset quality and capital determine whether growth becomes durable profit.',
    what: 'The outlook combines macroeconomic growth, credit demand, interest rates, funding competition, asset quality, profitability, capital requirements and financial-stability conditions.',
    how: 'Economic activity can increase payments and credit demand; loan growth expands earning assets and RWA; funding cost affects NIM; credit deterioration raises provisions; capital and policy constraints limit further growth.',
    why: 'The same credit number can represent opportunity, target or risk depending on its source, period and relationship to deposits, underwriting and capital.',
    global: 'Global banks face uneven rate cycles, growth, regulation and asset quality. No single directional forecast applies across markets or business models.',
    vietnam: 'Record 31 reports 15.08% system credit growth in 2024 and about 19% YoY by June 2025; it also records a 15% SBV target for 2026 and a Fitch estimate around 16% for 2025–2026. These are different measures and dates—not one series or guarantee.',
    visualKind: v('cb-m5-55-01-outlook', { layout: 'mindmap', variant: 'orbit', title: 'Commercial banking outlook drivers and risks', kicker: 'What turns demand into resilient performance', center: 'Risk-adjusted growth', centerSub: 'Profit • capital • stability', tagLabel: 'Bank outcome', rows: [
      { label: 'Economy & demand', a: 'Activity, investment and credit need', b: 'Loans + transactions' },
      { label: 'Rates & funding', a: 'Deposit competition and repricing', b: 'Cost of funds + NIM' },
      { label: 'Underwriting', a: 'Selection, structure and monitoring', b: 'NPL + cost of risk' },
      { label: 'Efficiency', a: 'Digital adoption and operating discipline', b: 'CIR + service quality' },
      { label: 'Capital', a: 'Retained earnings and external capacity', b: 'CAR + growth headroom' },
      { label: 'External shocks', a: 'Trade, market and confidence changes', b: 'Scenario downside' },
    ], takeaway: 'A positive demand outlook is only valuable when the bank can fund, underwrite and capitalize it safely.' }),
    visualHeading: 'Outlook drivers and risks', visualIntro: 'The framework shows why credit demand cannot be interpreted without funding, risk, efficiency and capital.', imageAlt: 'Commercial banking outlook map linking macro demand to funding, asset quality, efficiency and capital.',
    statTiles: [s('15.08%', 'System credit growth', 'Vietnam, 2024 outturn', 'Outstanding-credit growth reported from SBV data.'), s('≈19%', 'Credit growth', 'Vietnam, June 2025 YoY', 'IMF Article IV staff report; an observed rate, not a forecast.'), s('15%', 'SBV credit-growth target', '2026 target', 'A policy target, not an outturn or bank entitlement.'), s('≈16%', 'Fitch system estimate', '2025–2026', 'Forward-looking estimate with leverage and asset-quality warning.')],
    statsNote: 'The figures mix outturns, a year-on-year observation, a target and an estimate. They must not be averaged or treated as a consistent forecast series.',
    keyTerms: [t('Outturn', 'An observed result for a completed or measured period.'), t('Target', 'An intended policy or management outcome, not a guaranteed result.'), t('Scenario assumption', 'A conditional input used to explore a possible future.'), t('Risk-adjusted growth', 'Expansion evaluated after expected loss, capital, funding and operating requirements.')],
    recap: ['Separate outcomes, forecasts and targets.', 'Loan growth expands RWA and funding need.', 'NIM must be read after credit risk and cost.', 'Capital and stability constrain growth.'], chapterRecap: 'Commercial banking is heading toward continued opportunity, but resilient winners convert demand into funded, capital-aware and risk-adjusted returns.', deepDiveTitle: 'Build a coherent outlook',
    deepDive: ['Create scenarios rather than a single point prediction. For each, specify GDP and sector assumptions, rate and funding path, credit growth, NIM, NPL migration, cost of risk, fee income, CIR and capital generation.', 'Do not translate a system target into guaranteed growth for one bank. Its funding, credit room, customer demand, risk appetite and capital capacity can differ materially.'],
    evidence: 'Every figure retains its source type, date and status. The World Bank 6.8% 2025 GDP forecast is omitted from the headline because record 31 notes later outturn reporting and re-dating needs.', sourceIds: ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18']
  }),
  bankingChapter({
    title: 'Emerging Growth Opportunities for Banks', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '10 min',
    objective: 'Prioritise digital, retail, SME, transaction, fee, inclusion, sustainable-finance and ecosystem opportunities against economic constraints.',
    mateIntro: 'An attractive segment can still be a poor opportunity for a bank without low-cost funding, underwriting capability, distribution or enough capital.',
    keyInsight: 'A banking opportunity is investable only when customer need, bank capability, risk-adjusted economics and regulatory capacity align.',
    what: 'Opportunity spaces include digital banking, retail and SME relationships, transaction services, responsible fee diversification, inclusion, sustainable finance and ecosystem partnerships.',
    how: 'Banks identify an unmet job, build or partner for capability, acquire efficiently, price for risk and capital, test behaviour, monitor outcomes and scale when evidence supports it.',
    why: 'Headline growth can conceal acquisition cost, credit loss, conduct exposure, operational complexity, partner dependence, funding pressure or capital consumption.',
    global: 'Banks use digital and partnerships to reach customers and diversify revenue, but local infrastructure, regulation and competitive structure determine the economics.',
    vietnam: 'Fast digital payments and rising account access create a distribution base; SME, transaction and green finance offer potential. Record 31 does not quantify every market pool, so the matrix is a prioritisation tool rather than a market-size claim.',
    visualKind: v('cb-m5-55-02-opportunity', { layout: 'table', title: 'Growth opportunity matrix', kicker: 'Customer value versus economic constraint', headers: ['Opportunity', 'Value mechanism', 'Constraint to test'], rows: [
      { label: 'Digital everyday banking', a: 'CASA, engagement and lower marginal service cost', b: 'CAC, fraud, tech investment and active use' },
      { label: 'Retail credit', a: 'Spread and relationship depth', b: 'Affordability, loss and capital' },
      { label: 'SME banking', a: 'Loans, deposits, payments and advisory', b: 'Data gaps, service cost and concentration' },
      { label: 'Transaction services', a: 'Fees, operating balances and retention', b: 'Integration, resilience and competition' },
      { label: 'Fee diversification', a: 'Capital-light service revenue', b: 'Suitability, conduct and operating complexity' },
      { label: 'Financial inclusion', a: 'New relationships and broader activity', b: 'Utility, affordability and support' },
      { label: 'Sustainable finance', a: 'Transition and green financing demand', b: 'Taxonomy, data, impact and credit risk' },
      { label: 'Ecosystem partnership', a: 'Contextual reach and capability', b: 'Economics, dependency and customer control' },
    ], takeaway: 'Prioritise the opportunity that survives funding, risk, capital, conduct and execution tests.' }),
    visualHeading: 'Growth opportunity matrix', visualIntro: 'The matrix pairs every growth path with the mechanism and constraint that determine economic value.', imageAlt: 'Eight-row matrix of commercial banking opportunities, value mechanisms and constraints.',
    statTiles: [s(undefined, 'Retail / SME', 'Relationship depth', 'Potential combines loans, deposits, transactions and advice.'), s(undefined, 'Transaction banking', 'Fee + CASA engine', 'Value depends on integration and reliable recurring activity.'), s(undefined, 'Sustainable finance', 'Emerging frontier', 'Opportunity remains evidence- and risk-dependent.')],
    statsNote: 'No unsupported market-size or penetration forecast is attached to the opportunity matrix.',
    keyTerms: [t('Right to win', 'Relevant capabilities or assets that make a bank credible and advantaged in an opportunity.'), t('Risk-adjusted return', 'Return considered after expected loss, capital and relevant risk costs.'), t('Option value', 'Value of preserving a future choice while uncertainty resolves.'), t('Transaction service', 'Payments, collections, cash management, trade or related operating services.')],
    recap: ['Start with a customer job.', 'Connect opportunity to funding and revenue.', 'Price credit and capital explicitly.', 'Test conduct, complexity and partner dependence.', 'Scale only after evidence.'], chapterRecap: 'The best growth path is the one the bank can serve distinctively, responsibly and profitably after risk and capital.', deepDiveTitle: 'Turn a trend into an investment case',
    deepDive: ['Define target customer, job, proposition, route, funding effect, income, expected loss, operating cost, capital use, controls, partner economics and evidence gates. Identify the cheapest test that could disprove the thesis.', 'Preserve option value through pilots, modular capabilities or partnerships when adoption, legal detail or risk performance remains uncertain. Do not scale because a trend label is fashionable.'],
    evidence: 'Opportunities come from record 31; the framework preserves research gaps rather than inventing market sizes.', sourceIds: ['cb-m05-s01', 'cb-m05-s02', 'cb-m05-s05', 'cb-m05-s07', 'cb-m05-s12']
  }),
  bankingChapter({
    title: 'Strategic Choices for the Banks of Tomorrow', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '13 min',
    objective: 'Evaluate trade-offs among growth, NIM, CASA, digital efficiency, fee income, ROE, capital adequacy, compliance and stability.',
    mateIntro: 'A board asks for faster loan growth, a higher NIM, lower CIR and a stronger CAR at the same time. Strategy begins by exposing which choices reinforce each other and which compete for funding, capital and execution capacity.',
    keyInsight: 'Bank strategy is a system of trade-offs: every growth or return lever must be tested against credit quality, funding stability, capital, complexity and trust.',
    what: 'Core choices include growth versus credit quality, NIM versus lending risk, CASA versus funding stability, digital efficiency versus investment, fee income versus complexity, and ROE versus capital adequacy.',
    how: 'Define the objective and constraints, trace each lever through the balance sheet and P&L, compare scenarios, set guardrails and monitor leading indicators.',
    why: 'Optimising one ratio can weaken the bank. High NIM may reflect risk; fast lending can raise RWA and NPLs; low CIR can hide underinvestment; high ROE can reflect leverage.',
    global: 'Banks differ in risk appetite, capital, funding franchise and market conditions, so a universal “best” ratio or strategy does not exist.',
    vietnam: 'Credit targets and funding competition add local constraints. The five scenarios in the interactive matrix are hypothetical teaching cases—not real bank data or recommendations.',
    visualKind: 'cb-m5-55-03-strategy', visualHeading: 'Interactive strategic decision matrix', visualIntro: 'Select a scenario to reveal the value mechanism, hidden risk, indicators and balanced response.', imageAlt: 'Interactive matrix for commercial banking strategic trade-offs.',
    statTiles: [s(undefined, 'NIM', 'Return before full risk and cost', 'Improve sustainably through funding, pricing, mix and discipline—not risk alone.'), s(undefined, 'CIR', 'Operating efficiency', 'Digital helps when adoption and process retirement exceed total investment cost.'), s(undefined, 'ROE / CAR', 'Return and resilience', 'Higher leverage can lift ROE while reducing capital headroom.')],
    statsNote: 'All scenarios and diagnostic indicators are hypothetical. They teach causal reasoning rather than provide targets.',
    keyTerms: [t('Guardrail', 'A limit or condition designed to prevent an action from creating unacceptable risk.'), t('Capital headroom', 'Capital capacity above binding needs that can absorb stress or support growth.'), t('Funding stability', 'Durability and reliability of funding across conditions, not only its current price.'), t('Strategic trade-off', 'A choice in which improving one objective can weaken another.')],
    recap: ['Improve NIM without outsourcing return to risk.', 'Loan growth can fail after funding, provisions and capital.', 'Digital improves CIR only after total-cost and adoption tests.', 'Rising NPLs change risk appetite and capital choices.', 'Profitability and stability must be managed together.'], chapterRecap: 'A future-ready bank chooses the best risk-adjusted system outcome, not the most attractive isolated ratio.', deepDiveTitle: 'Five practical strategy scenarios',
    deepDive: ['Improve NIM sustainably: deepen stable CASA, price for risk and capital, improve mix and reduce avoidable funding friction; do not simply originate riskier high-yield loans.', 'Why loan growth may not improve profit: new volume can require expensive funding, compress pricing, increase opex and RWA, and produce future provisions. Evaluate contribution after credit and capital.', 'When digital improves CIR: recurring activity moves to a lower total cost, legacy processes retire and adoption is real. Dual running or weak usage can raise CIR.', 'How rising NPLs change growth: tighten or reprice risk, strengthen monitoring and collections, reassess sectors, provisions and capital, and protect liquidity rather than chase volume.', 'Balance profit and stability: compare ROA and ROE with CAR, liquidity and stress outcomes; a lower near-term return may preserve franchise value and future growth capacity.'],
    evidence: 'The five cases are explicitly hypothetical and use no real-bank inputs. They connect Modules 01–04 ratios to forward choices.', sourceIds: ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18']
  }),
];

interface StrategyScenario {
  name: string;
  choice: string;
  mechanism: string;
  hiddenRisk: string;
  indicators: string;
  response: string;
}

const STRATEGY_SCENARIOS: StrategyScenario[] = [
  { name: 'Improve NIM sustainably', choice: 'Grow spread without weakening the franchise.', mechanism: 'Stable CASA, disciplined pricing, mix, retention and funding efficiency can improve NIM.', hiddenRisk: 'High-yield assets can import credit risk; aggressive deposit repricing can weaken stability.', indicators: 'CASA quality, cost of funds, NIM, NPL migration, cost of risk, retention.', response: 'Set risk-adjusted pricing and funding guardrails; measure margin after expected loss.' },
  { name: 'Test loan growth', choice: 'Decide whether faster lending creates value.', mechanism: 'Volume can raise net interest income and relationship depth.', hiddenRisk: 'Funding cost, weaker underwriting, RWA, provisions and operating capacity can absorb the gain.', indicators: 'Loan yield, funding cost, early arrears, vintage loss, RWA, CAR, ROA.', response: 'Stage growth by segment and vintage; stop when risk-adjusted contribution or capital headroom weakens.' },
  { name: 'Invest in digital', choice: 'Trade near-term spend for scalable service.', mechanism: 'Adoption and straight-through processing can reduce unit cost and improve experience.', hiddenRisk: 'Migration, cyber, vendor, dual-running and low-adoption costs can raise CIR.', indicators: 'Active use, completion, unit cost, manual exceptions, uptime, incidents, CIR.', response: 'Fund measurable journeys, retire duplicated processes and preserve resilience and human escalation.' },
  { name: 'Respond to rising NPLs', choice: 'Reset growth and risk appetite as credit deteriorates.', mechanism: 'Earlier recognition, monitoring, restructuring where appropriate and recovery protect value.', hiddenRisk: 'Delaying recognition can flatter profit while consuming capital and management capacity.', indicators: 'Stage migration, arrears, NPL, coverage, cost of risk, sector concentration, CAR.', response: 'Tighten or reprice selected risk, strengthen collections and capital planning, and protect funding confidence.' },
  { name: 'Balance ROE and stability', choice: 'Choose leverage and capital that support durable return.', mechanism: 'Efficient assets, disciplined cost and quality earnings can improve return without excessive leverage.', hiddenRisk: 'Higher leverage can lift ROE while reducing loss absorption and growth capacity.', indicators: 'ROA, ROE, CAR, leverage, liquidity, stress loss and payout.', response: 'Set capital and liquidity buffers before growth or payout; compare returns after stress.' },
];

export function BankingStrategyTradeoffVisual() {
  const [active, setActive] = useState(0);
  const scenario = STRATEGY_SCENARIOS[active];
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm sm:p-6">
      <header className="border-b border-slate-200 pb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-600">Hypothetical learning scenarios</p>
        <h4 className="mt-1 text-xl font-black tracking-tight text-slate-950">Strategic Decision Matrix</h4>
        <p className="mt-1 text-sm leading-6 text-slate-500">Select a banking choice, then trace value, risk, indicators and a balanced response.</p>
      </header>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Strategic banking scenarios">
        {STRATEGY_SCENARIOS.map((item, index) => (
          <button key={item.name} type="button" role="tab" aria-selected={index === active} onClick={(event) => { event.stopPropagation(); setActive(index); }} className={`rounded-full border px-3 py-2 text-xs font-bold transition ${index === active ? 'border-red-600 bg-red-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-600'}`}>{item.name}</button>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2" role="tabpanel">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-red-600">Decision</p><p className="mt-2 text-sm font-black text-slate-900">{scenario.choice}</p></div>
        <div className="rounded-xl border border-slate-200 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Value mechanism</p><p className="mt-2 text-xs leading-5 text-slate-600">{scenario.mechanism}</p></div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">Hidden risk</p><p className="mt-2 text-xs leading-5 text-slate-700">{scenario.hiddenRisk}</p></div>
        <div className="rounded-xl border border-slate-200 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Indicators</p><p className="mt-2 text-xs leading-5 text-slate-600">{scenario.indicators}</p></div>
      </div>
      <p className="mt-4 rounded-xl bg-slate-900 px-4 py-3 text-sm leading-6 text-white"><strong>Balanced response: </strong>{scenario.response}</p>
    </div>
  );
}

export const CB_LESSON_55: BankingLessonBundle = { deck: deck55, quiz: bankingQuiz('cb-m5-l55', deck55), takeaways: { learned: 'You can interpret the Commercial Banking outlook, prioritise growth opportunities and reason through strategic trade-offs using connected banking metrics.', keyTakeaways: ['Separate outturns, forecasts, targets and scenarios.', 'Credit growth creates funding, RWA and asset-quality consequences.', 'An opportunity needs customer value, right to win and risk-adjusted economics.', 'No ratio should be optimised in isolation.', 'Staged choices and guardrails preserve resilience.'], businessImplications: 'Banks should convert macro opportunity into funded, well-underwritten, capital-aware growth and use scenario evidence to adjust before risk becomes loss.', remember: 'Trend → mechanism → metrics → guardrails → decision.', nextLesson: 'Commercial Banking curriculum · Back to module list' } };
