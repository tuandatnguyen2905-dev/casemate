// Commercial Banking Module 05, Lessons 5.3 and 5.5 activities (sources: commercialBankingM05B02.tsx, commercialBankingM05B03.tsx).
// Lesson 5.4 (held, REV-P0-12) is not used. The 5.3 channel-evolution stages are deliberately NOT a sequence:
// the chapter states that evolution is not a universal sequence. No growth rates, targets, forecasts or market sizes.
// Activities use only text the learner sees: the source's registerVisual tables and the unused interactive
// strategy matrix are not rendered (chapters draw commercialBankingM05VisualSpecs.ts instead).

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE05' as const;
const L53 = '5.3 Market & Channel Trends';
const L55 = '5.5 Growth Outlook & Strategic Opportunities';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

export const CB_M05MORE_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-05', [
  {
    activityId: 'cb-m05-match-vietnam-distribution-links',
    type: 'concept-matching',
    title: 'Vietnam distribution routes and what they contribute',
    learningObjective: 'Match each route to the customer in Vietnam\u2019s banking ecosystem to the value it contributes.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Route to the customer',
    answerLabel: 'What it contributes',
    summary: 'The strategic unit is the connected journey, not any channel in isolation. Each route adds different value and brings its own dependency, such as substitution and dispute risk with wallets and fintechs.',
    items: {
      prompts: [
        { id: 'route-mobile', text: 'Mobile banking app' },
        { id: 'route-branch', text: 'Branches and relationship managers' },
        { id: 'route-qr', text: 'QR merchants' },
        { id: 'route-rails', text: 'Payment rails' },
        { id: 'route-wallet', text: 'E-wallet and fintech partners' },
        { id: 'route-employer', text: 'Salary and telecom-linked ecosystems' },
      ],
      answers: [
        { id: 'link-engagement', text: 'The primary routine-service interface, at a lower marginal service cost.' },
        { id: 'link-trust', text: 'Advice, exceptions, SME and complex credit that build trust.' },
        { id: 'link-balances', text: 'Everyday payment acceptance that brings transactions and operating balances.' },
        { id: 'link-reach', text: 'Routing, clearing and settling payments between institutions.' },
        { id: 'link-substitution', text: 'Reach and specialist experience, with substitution and dispute risk.' },
        { id: 'link-casa', text: 'Payroll and embedded context that support acquisition and CASA.' },
      ],
    },
    pairs: [
      { id: 'pair-route-mobile', promptId: 'route-mobile', answerId: 'link-engagement', explanation: 'The app is where routine service now begins, which keeps customers engaged at a low cost per interaction.', hint: 'The everyday service interface on a phone.' },
      { id: 'pair-route-branch', promptId: 'route-branch', answerId: 'link-trust', explanation: 'People handle the complex and trust-heavy needs, where human confidence helps the customer decide.', hint: 'Where high-stakes conversations still happen.' },
      { id: 'pair-route-qr', promptId: 'route-qr', answerId: 'link-balances', explanation: 'Point-of-sale payments generate recurring activity and the balances that come with it.', hint: 'Where shoppers pay at the point of sale.' },
      { id: 'pair-route-rails', promptId: 'route-rails', answerId: 'link-reach', explanation: 'Shared infrastructure and rules connect institutions so that payments reach their destination reliably.', hint: 'The infrastructure behind every transfer.' },
      { id: 'pair-route-wallet', promptId: 'route-wallet', answerId: 'link-substitution', explanation: 'Partners bring experience and specialist capability, and can also replace the bank in the customer\u2019s eyes.', hint: 'Partners that can both extend the bank and compete with it.' },
      { id: 'pair-route-employer', promptId: 'route-employer', answerId: 'link-casa', explanation: 'Salary and other recurring flows bring in customers and low-cost balances through the contexts they already use.', hint: 'Customers arrive through where they work or which services they already use.' },
    ],
    sourceRefs: [
      ch(L53, 2, 'Market and Channel Developments in Vietnam', ['cb-m05-s02', 'cb-m05-s03', 'cb-m05-s04'], '\u201cOne tap in Vietnam crosses banks, rails, merchants and partners\u201d learning visual: each actor with what it contributes.'),
    ],
  },
  {
    activityId: 'cb-m05-match-outlook-transmission',
    type: 'concept-matching',
    title: 'How outlook drivers flow through to the bank',
    learningObjective: 'Match each driver in the commercial banking outlook to what it changes for the bank, so credit demand is never read without funding, risk and capital.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Outlook driver',
    answerLabel: 'What it changes for the bank',
    summary: 'Demand creates opportunity, but funding, asset quality and capital decide whether growth becomes durable profit. Loan growth expands RWA and funding need, and NIM must be read after credit risk and cost.',
    items: {
      prompts: [
        { id: 'drv-economy', text: 'Economic activity' },
        { id: 'drv-loan-growth', text: 'Loan growth' },
        { id: 'drv-funding', text: 'Funding cost' },
        { id: 'drv-deterioration', text: 'Credit deterioration' },
        { id: 'drv-capital', text: 'Capital and policy constraints' },
      ],
      answers: [
        { id: 'out-demand', text: 'More payments and more credit demand.' },
        { id: 'out-assets', text: 'Larger earning assets and risk-weighted assets.' },
        { id: 'out-nim', text: 'The net interest margin.' },
        { id: 'out-provisions', text: 'Higher provisions.' },
        { id: 'out-limit', text: 'A limit on further growth.' },
      ],
    },
    pairs: [
      { id: 'pair-drv-economy', promptId: 'drv-economy', answerId: 'out-demand', explanation: 'Business and household activity is what creates transactions and the need to borrow.', hint: 'Where volumes ultimately come from.' },
      { id: 'pair-drv-loan-growth', promptId: 'drv-loan-growth', answerId: 'out-assets', explanation: 'New lending grows the assets that earn interest and also the risk-weighted assets that capital must cover.', hint: 'The balance sheet gets bigger, and so does what capital must support.' },
      { id: 'pair-drv-funding', promptId: 'drv-funding', answerId: 'out-nim', explanation: 'What the bank pays for deposits and other funding flows straight through to the spread it earns.', hint: 'What the bank pays for its money affects what it keeps.' },
      { id: 'pair-drv-deterioration', promptId: 'drv-deterioration', answerId: 'out-provisions', explanation: 'When borrowers weaken, the bank must recognise expected losses, which reduces profit.', hint: 'Loans going bad have to be recognised in the accounts.' },
      { id: 'pair-drv-capital', promptId: 'drv-capital', answerId: 'out-limit', explanation: 'Even with strong demand, a bank can only expand as far as its capital and the rules allow.', hint: 'The ceiling that strong demand cannot lift on its own.' },
    ],
    sourceRefs: [
      ch(L55, 0, 'Where Is Commercial Banking Heading?', ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18'], '\u201cHow it works\u201d narrative: economic activity, loan growth, funding cost, credit deterioration and capital and policy constraints, each with its effect on the bank.'),
    ],
  },
  {
    activityId: 'cb-m05-sort-outlook-figure-types',
    type: 'category-sorting',
    title: 'Outturn, target, estimate or scenario assumption?',
    learningObjective: 'Classify a description of a number or statement in an outlook by what kind of evidence it is, so that different kinds are never averaged into one series.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'An outturn, a target, an estimate and a scenario assumption are different kinds of statement. They must not be averaged or treated as one consistent series, and a system-wide goal is not a guarantee for any single bank.',
    categories: [
      { id: 'outturn', label: 'Outturn', description: 'An observed result for a completed or measured period.' },
      { id: 'target', label: 'Target', description: 'An intended policy or management outcome.' },
      { id: 'estimate', label: 'Estimate', description: 'A forward-looking projection from an analyst or agency.' },
      { id: 'scenario', label: 'Scenario assumption', description: 'A conditional input used to explore a possible future.' },
    ],
    items: [
      { id: 'out-completed-year', text: 'A growth figure reported for a year that has finished', categoryId: 'outturn', explanation: 'It records what happened over a completed period.', hint: 'It describes something that has already happened.' },
      { id: 'out-observed-month', text: 'A year-on-year rate observed at a stated point in the year', categoryId: 'outturn', explanation: 'The chapter calls this a year-on-year observation: like an outturn, it is an observed result for a measured period, not a forecast.', hint: 'It is read from data for a period already past.' },
      { id: 'tgt-policy-goal', text: 'A policy goal for credit growth in a future year', categoryId: 'target', explanation: 'A goal expresses what policy intends, not what will certainly happen.', hint: 'It is what the authorities aim for, whether or not it is reached.' },
      { id: 'tgt-management-aim', text: 'A management aim for the bank that is not a promise', categoryId: 'target', explanation: 'An aim is something to work toward, and a system-wide goal does not entitle one bank to the same growth.', hint: 'It is a goal to work toward, with no certainty attached.' },
      { id: 'est-agency-projection', text: 'A rating agency\u2019s forward-looking view of the system', categoryId: 'estimate', explanation: 'It is a projection by an outside analyst about future conditions.', hint: 'It is an outside party\u2019s view of what is coming.' },
      { id: 'est-warning', text: 'A forecast that comes with a leverage and asset-quality warning', categoryId: 'estimate', explanation: 'A forecast is conditional on assumptions and carries caveats.', hint: 'It looks ahead and is qualified by cautions.' },
      { id: 'scn-conditional', text: 'An assumed rate and funding path set for one of several outlook cases', categoryId: 'scenario', explanation: 'Each scenario specifies its own rate and funding path to test a possibility, not to claim it will occur.', hint: 'It is chosen to ask what would happen if.' },
      { id: 'scn-downside', text: 'A downside case that assumes tighter funding and rising loan losses', categoryId: 'scenario', explanation: 'A downside case is built to test resilience under stress, not to forecast it.', hint: 'It is built to test how the bank copes when conditions worsen.' },
    ],
    sourceRefs: [
      ch(L55, 0, 'Where Is Commercial Banking Heading?', ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18'], 'Key terms (outturn, target, scenario assumption), the deep dive on building scenarios, and the statement that figures mix outturns, a year-on-year observation, a target and an estimate and must not be averaged.'),
    ],
  },
  {
    activityId: 'cb-m05-match-strategy-shortcuts',
    type: 'concept-matching',
    title: 'Strategic goals and the shortcut that weakens the bank (hypothetical teaching scenarios)',
    learningObjective: 'Match each strategic goal or pressure to the shortcut that can answer it on paper while weakening the bank, using the lesson\u2019s hypothetical teaching scenarios.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Goal or pressure (hypothetical scenario)',
    answerLabel: 'Shortcut that weakens the bank',
    summary: 'Every goal can be met the durable way or by quietly borrowing from risk and capital. These are hypothetical teaching scenarios that show causal reasoning, not real bank data, targets or recommendations, and no ratio should be optimised in isolation.',
    items: {
      prompts: [
        { id: 'strat-nim', text: 'Higher NIM' },
        { id: 'strat-growth', text: 'Faster loan growth' },
        { id: 'strat-cir', text: 'Lower CIR' },
        { id: 'strat-roe', text: 'Higher ROE' },
        { id: 'strat-fees', text: 'More fee income' },
        { id: 'strat-npl', text: 'Rising NPLs' },
      ],
      answers: [
        { id: 'cut-high-yield', text: 'Originate riskier high-yield loans.' },
        { id: 'cut-volume', text: 'Volume needing expensive funding that raises RWA and future provisions.' },
        { id: 'cut-underinvest', text: 'Underinvest, or dual-run channels with weak usage.' },
        { id: 'cut-leverage', text: 'Lift leverage and shrink capital headroom.' },
        { id: 'cut-complex', text: 'Complex products that add conduct risk.' },
        { id: 'cut-chase', text: 'Chase volume to outgrow the problem.' },
      ],
    },
    pairs: [
      { id: 'pair-strat-nim', promptId: 'strat-nim', answerId: 'cut-high-yield', explanation: 'The durable route is to deepen stable CASA, price for risk and capital and improve mix; buying margin with weaker credits imports risk.', hint: 'Margin can be raised the wrong way.' },
      { id: 'pair-strat-growth', promptId: 'strat-growth', answerId: 'cut-volume', explanation: 'Grow only where contribution holds after credit and capital; otherwise funding cost, RWA and later losses absorb the gain.', hint: 'More lending is not the same as more profit.' },
      { id: 'pair-strat-cir', promptId: 'strat-cir', answerId: 'cut-underinvest', explanation: 'The ratio improves durably only when recurring activity moves to a lower total cost and legacy processes are retired.', hint: 'An efficiency ratio can look better for the wrong reasons.' },
      { id: 'pair-strat-roe', promptId: 'strat-roe', answerId: 'cut-leverage', explanation: 'Returns should be judged against capital, liquidity and stress outcomes; borrowing more leaves less room to absorb loss.', hint: 'Return looks better while the cushion gets thinner.' },
      { id: 'pair-strat-fees', promptId: 'strat-fees', answerId: 'cut-complex', explanation: 'Fee income lasts when services are suitable and trusted; complexity that customers do not value creates mis-selling risk.', hint: 'Income that can damage trust if the product does not fit.' },
      { id: 'pair-strat-npl', promptId: 'strat-npl', answerId: 'cut-chase', explanation: 'The balanced response is to tighten or reprice risk, strengthen collections and protect liquidity, not to grow faster.', hint: 'Trying to dilute bad loans with new ones.' },
    ],
    sourceRefs: [
      ch(L55, 2, 'Strategic Choices for the Banks of Tomorrow', ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18'], '\u201cMoving a ratio the durable way versus the risky shortcut\u201d learning visual and the five hypothetical strategy scenarios in the deep dive, labelled hypothetical teaching scenarios in the source.'),
    ],
  },
]);
