// Commercial Banking Module 01, Lesson 1.2 activities (source: commercialBankingM01B1.tsx).
// Lesson 1.1 activities stay in commercialBankingM01.ts. No dates, figures or legal provisions.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE01' as const;
const L12 = '1.2 Industry History & Development';
const ch = (index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, L12, index, title, sourceIds, grounding);

const C1 = 'From Early Banking to Modern Financial Institutions';
const C2 = 'Banking Regulation, Crises, and Financial Stability';
const C3 = 'The Rise of Digital and Global Banking';
const C4 = "The Development of Vietnam's Banking System";

export const CB_M01B1_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-01', [
  {
    activityId: 'cb-m01-match-history-terms',
    type: 'concept-matching',
    title: 'Banking history and stability: terms and definitions',
    learningObjective: 'Define the institutions, roles and safeguards that connect banking history to crisis regulation, digital reach and cross-border service.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Definition',
    summary: 'Modern banking pairs private intermediation with public stability architecture: central-bank roles and safeguards limit how far one failure can spread, while digital and global reach raise the importance of resilience.',
    items: {
      prompts: [
        { id: 'lender-last-resort', text: 'Lender of last resort' },
        { id: 'clearing', text: 'Clearing' },
        { id: 'mono-tier', text: 'Mono-tier banking' },
        { id: 'two-tier', text: 'Two-tier banking' },
        { id: 'prudential', text: 'Prudential regulation' },
        { id: 'resolution', text: 'Resolution' },
        { id: 'correspondent', text: 'Correspondent banking' },
        { id: 'op-resilience', text: 'Operational resilience' },
      ],
      answers: [
        { id: 'def-lolr', text: 'A central-bank role providing emergency liquidity to eligible institutions under defined conditions.' },
        { id: 'def-clearing', text: 'Calculating obligations between payment participants before settlement.' },
        { id: 'def-mono-tier', text: 'A system in which the central bank also performs commercial-banking functions.' },
        { id: 'def-two-tier', text: 'A system that separates the central bank from commercial institutions serving customers.' },
        { id: 'def-prudential', text: 'Rules designed to keep financial institutions safe and limit systemic risk.' },
        { id: 'def-resolution', text: 'A managed process for handling a failing institution while protecting critical functions.' },
        { id: 'def-correspondent', text: 'A relationship in which one bank provides cross-border or currency services for another.' },
        { id: 'def-op-resilience', text: 'The ability to continue critical services through disruption.' },
      ],
    },
    pairs: [
      { id: 'pair-lolr', promptId: 'lender-last-resort', answerId: 'def-lolr', explanation: 'Scale made banking more systemic, so central banks developed an emergency-liquidity role. It helps a solvent bank through temporary withdrawals but cannot repair losses larger than capital.', hint: 'Think of the public backstop that steps in when ordinary funding has dried up.' },
      { id: 'pair-clearing', promptId: 'clearing', answerId: 'def-clearing', explanation: 'Payment networks needed a step before money moves: working out who owes whom. Clearing is that calculation, and settlement follows it.', hint: 'This step happens between a payment instruction and the final transfer of funds.' },
      { id: 'pair-mono-tier', promptId: 'mono-tier', answerId: 'def-mono-tier', explanation: 'Before Vietnam separated the roles, the SBV combined central and commercial functions in one structure.', hint: 'One institution sets monetary conditions and also deals with customers.' },
      { id: 'pair-two-tier', promptId: 'two-tier', answerId: 'def-two-tier', explanation: 'Splitting policy and supervision from customer banking let state-controlled and joint-stock banks build separate customer businesses.', hint: 'Policy sits in one institution and customer service in others.' },
      { id: 'pair-prudential', promptId: 'prudential', answerId: 'def-prudential', explanation: 'Prudential rules cover capital, liquidity, risk concentration, governance and recovery planning. They exist because banks are leveraged and interconnected.', hint: 'Think of the rules on capital, liquidity and governance, not the rules on how customers are treated.' },
      { id: 'pair-resolution', promptId: 'resolution', answerId: 'def-resolution', explanation: 'Resolution keeps critical functions running when a bank fails. It is not a promise to protect shareholders or every creditor.', hint: 'Think about what happens to a bank that can no longer survive on its own, and who is not guaranteed protection.' },
      { id: 'pair-correspondent', promptId: 'correspondent', answerId: 'def-correspondent', explanation: 'International banks combine local licences with treasury, trade-finance and correspondent networks, so one bank can serve a client abroad through another.', hint: 'Think of how a bank with no presence of its own in another country can still serve a client there.' },
      { id: 'pair-op-resilience', promptId: 'op-resilience', answerId: 'def-op-resilience', explanation: 'As distribution moved to apps and shared systems, outages and cyber events became first-order risks. Resilience is the capacity to keep critical services running through them.', hint: 'It matters most when systems, vendors or channels fail.' },
    ],
    sourceRefs: [
      ch(0, C1, ['cb-m01-s02', 'cb-m01-s08'], 'Key terms “Lender of last resort”, “Clearing”, “Mono-tier banking” and “Two-tier banking”.'),
      ch(1, C2, ['cb-m01-s02', 'cb-m01-s03', 'cb-m01-s07'], 'Key terms “Prudential regulation” and “Resolution”; resolution protects critical functions, not every stakeholder.'),
      ch(2, C3, ['cb-m01-s12'], 'Key terms “Correspondent banking” and “Operational resilience”.'),
    ],
  },
  {
    activityId: 'cb-m01-sort-branch-vs-digital-v2',
    type: 'category-sorting',
    title: 'Branch-led or digital and connected?',
    learningObjective: 'Compare how access, processing, cost to serve, risk and geography differ between the earlier branch-led model and the digital, connected model.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Screens change the channel, not the balance sheet: reach and routine service cost improve, cyber, fraud, privacy, outsourcing and resilience risks grow, and lending still consumes funding and capital.',
    categories: [
      { id: 'branch', label: 'Earlier branch-led model', description: 'How banking was typically delivered before screens became the main channel for routine service.' },
      { id: 'digital', label: 'Digital and connected model', description: 'How banking is delivered once screens and connected systems carry most routine service.' },
    ],
    items: [
      { id: 'branch-hours', text: 'A branch visit to withdraw cash, send money or apply for a loan', categoryId: 'branch', explanation: 'A customer once needed a branch for these everyday actions, so access was tied to a physical location.', hint: 'Which model requires the customer to go somewhere in person?', misplaced: { digital: 'In the digital model the same actions can start on a phone; needing to visit in person marks the earlier model.' } },
      { id: 'mobile-web', text: 'Mobile apps, QR payments and digital onboarding', categoryId: 'digital', explanation: 'Banking moved from branches through ATMs and internet banking to mobile apps, QR payments and digital onboarding.', hint: 'Which model lets the same action start on a phone?' },
      { id: 'paper-handoffs', text: 'Manual servicing', categoryId: 'branch', explanation: 'Earlier processing relied on staff servicing each request by hand.', hint: 'Think of each request being handled by a person at every step.' },
      { id: 'automation', text: 'Automated decisions and API-connected services', categoryId: 'digital', explanation: 'Technology digitises onboarding, payments and servicing, with automated decisions and services connected through APIs.', hint: 'Which model processes work through connected systems rather than by hand?' },
      { id: 'footprint-growth', text: 'Growth tied to physical footprint', categoryId: 'branch', explanation: 'If service needs a branch, reaching more customers means opening more sites.', hint: 'In which model does reaching more customers mean adding more buildings?', misplaced: { digital: 'Digital reach is not limited by the number of sites, which is why routine service becomes cheaper to scale.' } },
      { id: 'marginal-cost', text: 'Lower marginal cost for routine service', categoryId: 'digital', explanation: 'Once the systems exist, each additional routine request costs little to serve, which can support inclusion and scale.', hint: 'Which model makes each extra routine request cheaper to handle?' },
      { id: 'physical-control', text: 'Branch and process control as the main risk focus', categoryId: 'branch', explanation: 'Risk management centred on the branch itself and on following manual processes correctly.', hint: 'Which model’s main risk controls are about premises and procedures?', misplaced: { digital: 'Digital banking shifts the focus to cyber, fraud, privacy, outsourcing and operational-resilience risk.' } },
      { id: 'cyber-risk', text: 'Cyber, fraud, privacy, outsourcing and operational-resilience risk', categoryId: 'digital', explanation: 'Lower marginal service cost comes with cyber, fraud, privacy, outsourcing and operational-resilience risks becoming more important.', hint: 'Which model depends on systems and outside technology providers staying secure and available?' },
      { id: 'local-operations', text: 'Local customer operations', categoryId: 'branch', explanation: 'A branch-led bank mainly served customers near its physical network.', hint: 'Which model mainly deals with customers near its own offices?' },
      { id: 'cross-border', text: 'Local licences joined to global treasury, correspondent and trade-finance networks', categoryId: 'digital', explanation: 'International banks combine local licences with global treasury, correspondent-banking and trade-finance networks.', hint: 'Which model links funding and service across countries and currencies?' },
    ],
    sourceRefs: [
      ch(2, C3, ['cb-m01-s12'], '“Screens change the channel; the balance sheet stays” comparison: access, processing, cost to serve, risks in focus and geography rows for branch-led and digital and connected banking.'),
    ],
  },
  {
    activityId: 'cb-m01-seq-crisis-cycle-v2',
    type: 'sequence-builder',
    title: 'How a crisis becomes a safeguard',
    learningObjective: 'Order the stages of the crisis-to-regulation cycle and explain why each stage depends on the one before it.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Regulation is accumulated crisis memory: weakness builds, a crisis exposes it, public losses reveal the gaps, and new safeguards reshape bank behaviour.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter’s key insight describes a repeated cycle in a fixed causal order: leverage or liquidity weakness causes crisis, public losses reveal gaps, and new safeguards reshape bank behaviour. Its “Each crisis left a safeguard behind” timeline shows the same order in history, for example the global financial crisis exposing gaps that the Basel III reforms then addressed.',
    items: [
      { id: 'risk-builds', text: 'Weakness builds: leverage or liquidity strain accumulates', explanation: 'The cycle starts with weakness on bank balance sheets that has not yet been exposed.', hint: 'Nothing can break until something has been building up.' },
      { id: 'confidence-breaks', text: 'Crisis: the weakness is exposed and stress spreads through confidence and funding markets', explanation: 'Banks are leveraged and interconnected, so one institution’s stress can interrupt payments, force asset sales and transmit losses.', hint: 'This stage needs an existing weakness to expose.' },
      { id: 'gaps-revealed', text: 'Public losses reveal gaps in the existing safeguards', explanation: 'Only once losses have fallen on the public is it clear which capital, liquidity, supervision or resolution safeguards were missing.', hint: 'The gaps become visible only after the damage has happened.' },
      { id: 'rules-change', text: 'New safeguards are adopted and reshape bank behaviour', explanation: 'New rules close the revealed gaps and change how banks grow, price and take risk.', hint: 'Rules can only target gaps that have already been revealed, so this stage comes last.' },
    ],
    correctSequence: ['risk-builds', 'confidence-breaks', 'gaps-revealed', 'rules-change'],
    sourceRefs: [
      ch(1, C2, ['cb-m01-s02', 'cb-m01-s03', 'cb-m01-s07'], 'Key insight “Bank regulation evolves through a repeated cycle”; the “Each crisis left a safeguard behind” timeline; recap “Regulation changes bank growth, pricing and risk choices.”'),
    ],
  },
  {
    activityId: 'cb-m01-seq-vietnam-system',
    type: 'sequence-builder',
    title: 'How Vietnam’s banking system took its current shape',
    learningObjective: 'Order the structural stages that produced Vietnam’s present banking system, without relying on exact dates.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Vietnam’s structure reflects reform, opening and repeated efforts to strengthen risk control: separation of roles, wider participation, clean-up of bad debt, then a modernised framework.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter’s “How Vietnam split the central bank from customer banking” timeline lists the structural milestones in order (before reform, the reform, after the reform, after rapid credit growth, then the modern law), and the narrative says the structure was shaped by the two-tier reform, market opening, post-bad-debt restructuring and progressive adoption of stronger rules. It states that a mono-tier system came first and that later changes built on it. Exact dates are not used because the chapter marks them as awaiting verification.',
    items: [
      { id: 'mono-tier-start', text: 'Mono-tier starting point: the SBV combines central and commercial roles', explanation: 'The reform only makes sense against the starting point: one institution held both central and commercial functions.', hint: 'This is the structure that existed before any separation.' },
      { id: 'two-tier-reform', text: 'Two-tier reform: policy and supervision are separated from customer banking', explanation: 'Separating the roles let commercial institutions emerge as customer-facing banks.', hint: 'It could only happen once the combined structure existed, and it creates the banks that later compete.' },
      { id: 'market-opening', text: 'Market opening: joint-stock and foreign participation broaden competition', explanation: 'With commercial banking separated, new joint-stock and foreign participants could enter and diversify the system.', hint: 'Competition can broaden only after commercial banks exist as a separate tier.' },
      { id: 'bad-debt-restructuring', text: 'Bad-debt restructuring: stress prompts a clean-up and stronger risk discipline', explanation: 'Rapid credit growth in a more competitive system later exposed bad debt, which led to restructuring.', hint: 'Bad debt builds up during growth before it is cleaned up.' },
      { id: 'modern-framework', text: 'Modernised framework: stronger prudential and governance rules are adopted', explanation: 'Lessons from the clean-up fed progressively stronger capital, governance and intervention rules.', hint: 'The tighter rules respond to the stress that restructuring dealt with.' },
    ],
    correctSequence: ['mono-tier-start', 'two-tier-reform', 'market-opening', 'bad-debt-restructuring', 'modern-framework'],
    sourceRefs: [
      ch(3, C4, ['cb-m01-s07', 'cb-m01-s08'], 'Key insight and the “How Vietnam split the central bank from customer banking” timeline: mono-tier system, two-tier reform, market opening, bad-debt restructuring, modernised governance and intervention architecture.'),
    ],
  },
]);
