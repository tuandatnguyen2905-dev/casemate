// Commercial Banking Module 05, Lessons 5.1 and 5.2 (apps/IndustryKnowledge/commercialBankingM05B01.tsx).
// Excerpts are verbatim and come only from text the learner sees: the source's registerVisual specs are not
// rendered (chapters draw commercialBankingM05VisualSpecs.ts instead), so they are never cited.
// No adoption statistics, growth rates or capability claims are used. Lesson 5.2
// Chapter 3 carries a restriction notice (Decree 94/2025 detail unverified): its cards teach only the
// distinction between concept, pilot, sandbox and live service, and state no eligibility or legal detail.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'banking-commercial',
  industryLabel: 'Commercial Banking',
  moduleId: 'cb-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'COMMERCIAL_BANKING_MODULE05',
  file: 'apps/IndustryKnowledge/commercialBankingM05B01.tsx',
  readAtSha256: '011189114b7aeba0f9dd87b2a79c34a1961bfe680e8b6f50d6507368ecd89229',
  readAt: '2026-11-08',
  chapterMarker: 'bankingChapter({',
  contentStatus: 'Draft / Ready for Review',
};

export const CB_LESSON_51_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'commercial-banking-consumer-trends',
  title: 'Commercial Banking: Consumer Trends',
  description: 'How customer expectations are changing, what makes a digital journey worth repeating, and how Vietnamese segments differ.',
  lessonId: 'cb-m5-l51',
  lessonTitle: '5.1 Consumer Trends',
  startMarker: "const L51 = '5.1 Consumer Trends';",
  endMarker: "const L52 = '5.2 Technology & Innovation Trends';",
  chapterIdPrefix: 'cb-m5-l51',
  chapters: [
    { title: 'How Banking Customers Are Changing', sourceTitle: 'How Banking Customers Are Changing', citations: ['cb-m05-s01', 'cb-m05-s02'] },
    { title: 'Digital Banking and Customer Expectations', sourceTitle: 'Digital Banking and Customer Expectations', citations: ['cb-m05-s02', 'cb-m05-s03'] },
    { title: 'Emerging Customer Needs in Vietnam', sourceTitle: 'Emerging Customer Needs in Vietnam', citations: ['cb-m05-s01', 'cb-m05-s02', 'cb-m05-s03'] },
  ],
  mappingNotes: ['Lesson 5.1 has no restriction notice and no entry in reviewHolds.ts at read time. Account-ownership and payment-growth figures in the chapters are not used.'],
  cards: [
    {
      id: 'cb51-expectations-without-surrender',
      ch: 1,
      front: 'What do customers increasingly expect from banks, and does digital-first mean digital-only?',
      back: 'Digital convenience without surrendering security, accessibility or human support for consequential decisions. Digital-first does not mean digital-only: needs differ by segment, confidence and decision complexity.',
      explanation: 'Convenience raises the service baseline, but trust and security remain decisive adoption gates, especially for new-to-bank customers and complex needs.',
      example: 'A customer may open an account on a phone and still want a branch adviser for a mortgage.',
      terms: ['Digital-first', 'Hybrid service'],
      refs: [
        [1, 'Customers increasingly expect digital convenience without surrendering security, accessibility or human support for consequential decisions.'],
        [1, 'Digital-first does not mean digital-only.'],
      ],
    },
    {
      id: 'cb51-trust-can-reverse-a-franchise',
      ch: 1,
      front: 'How can convenience and trust each affect a bank\u2019s franchise?',
      back: 'A convenient current account can attract recurring balances, but a trust failure can reverse that franchise quickly.',
      explanation: 'Expectations change acquisition, service cost, funding and retention.',
      example: 'A customer who is delighted by an app may still leave if a suspicious transaction is handled badly.',
      terms: ['CASA', 'Financial inclusion'],
      refs: [
        [1, 'A convenient current account can attract recurring balances; a trust failure can reverse that franchise quickly.'],
      ],
    },
    {
      id: 'cb51-zero-fee-account-economics',
      ch: 1,
      front: 'What is a zero-fee current account really for, and what is the economic test of it?',
      back: 'It can be an acquisition and CASA strategy rather than a standalone fee product. The test is whether recurring balances, engagement and responsible cross-sell outweigh acquisition, technology, fraud and service costs.',
      explanation: 'Economics come from balances and relationship depth, not from fees on the account itself.',
      example: 'A bank that gives away accounts needs those customers to keep balances and use other services.',
      terms: ['CASA', 'Cross-sell'],
      refs: [
        [1, 'A zero-fee current account can be an acquisition and CASA strategy rather than a standalone fee product.'],
        [1, 'The economic question is whether recurring balances, engagement and responsible cross-sell outweigh acquisition, technology, fraud and service costs.'],
      ],
    },
    {
      id: 'cb51-reliable-journey-earns-primary-bank',
      ch: 2,
      front: 'When does digital convenience create relationship value?',
      back: 'Only when the full journey is reliable, secure, understandable and worth repeating. A fast app may win a download, but a dependable journey from onboarding to payment confirmation to fraud resolution earns primary-bank status.',
      explanation: 'Digital value appears when a secure end-to-end journey converts access into trusted repeat activity, so every step after the download matters.',
      example: 'A smooth sign-up is wasted if payment confirmations are unclear or fraud cases are hard to resolve.',
      terms: ['eKYC', 'Customer experience'],
      refs: [
        [2, 'Digital convenience creates relationship value only when the full journey is reliable, secure, understandable and worth repeating.'],
        [2, 'A dependable journey\u2014from onboarding to payment confirmation to fraud resolution\u2014is what earns primary-bank status.'],
        [2, 'Digital value appears when a secure end-to-end journey converts access into trusted repeat activity.'],
      ],
    },
    {
      id: 'cb51-measure-the-journey-not-the-feature',
      ch: 2,
      front: 'How should the success of a digital journey be measured, and when can personalisation backfire?',
      back: 'Track completion, time, failure, abandonment, complaint and recovery rates by journey stage. Downloads or registered accounts alone do not prove engagement. A relevant offer delivered without trust can reduce lifetime value.',
      explanation: 'Personalisation should start with a useful outcome, lawful data access and an accountable decision.',
      example: 'A bank that counts app downloads but not completed onboardings may be overstating its success.',
      terms: ['Data privacy', 'Customer experience'],
      refs: [
        [2, 'Track completion, time, failure, abandonment, complaint and recovery rates by journey stage.'],
        [2, 'Downloads or registered accounts alone do not prove meaningful engagement.'],
        [2, 'A relevant offer delivered without trust can reduce rather than increase lifetime value.'],
      ],
    },
    {
      id: 'cb51-segment-by-financial-job',
      ch: 3,
      front: 'Why is \u201cthe Vietnamese customer\u201d not one segment, and what should banks design around instead?',
      back: 'Inclusion, trust and digital access matter across groups, but the financial job and risk model differ. Design around the distinct financial jobs of households, SMEs and corporates.',
      explanation: 'Treating segments alike creates poor fit and risk, because product design, acquisition economics, service model and credit assessment all vary.',
      example: 'A student paying by QR, an SME managing invoices and a corporate treasurer managing liquidity need different banking systems.',
      terms: ['Working capital', 'Transaction banking', 'Primary bank'],
      refs: [
        [3, 'Vietnam\u2019s opportunity is segmented: inclusion, trust and digital access matter across groups, but the financial job and risk model differ.'],
        [3, 'Treating segments alike creates poor fit and risk.'],
        [3, 'Vietnam banks should design around distinct financial jobs while making access, security and recourse work for every segment.'],
      ],
    },
    {
      id: 'cb51-shallow-versus-useful-inclusion',
      ch: 3,
      front: 'What is shallow inclusion, and how should SME cash-flow data be used?',
      back: 'Ownership without utility or trust is shallow inclusion. For SMEs, use transaction and cash-flow data carefully: seasonality, informality, data gaps and business-model differences require context and human judgement.',
      explanation: 'Customers should be able to use the account repeatedly, understand costs and controls, obtain help and choose suitable products.',
      example: 'An account that is opened but never used, or whose fees confuse the holder, counts as account ownership but not as useful inclusion.',
      terms: ['Financial inclusion', 'Primary bank'],
      refs: [
        [3, 'Ownership without utility or trust is shallow inclusion.'],
        [3, 'For SMEs, use transaction and cash-flow data carefully: seasonality, informality, data gaps and business-model differences require context and human judgment.'],
      ],
    },
  ],
});

export const CB_LESSON_52_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'commercial-banking-technology-innovation',
  title: 'Commercial Banking: Technology & Innovation Trends',
  description: 'Operating-model transformation, governed AI, and the difference between open-banking concept, pilot and live service.',
  lessonId: 'cb-m5-l52',
  lessonTitle: '5.2 Technology & Innovation Trends',
  startMarker: "const L52 = '5.2 Technology & Innovation Trends';",
  endMarker: 'export const CB_LESSON_51: BankingLessonBundle',
  chapterIdPrefix: 'cb-m5-l52',
  chapters: [
    { title: 'How Technology Is Transforming Banking', sourceTitle: 'How Technology Is Transforming Banking', citations: ['cb-m05-s06', 'cb-m05-s07', 'cb-m05-s02'] },
    { title: 'AI, Data Analytics, and Banking Innovation', sourceTitle: 'AI, Data Analytics, and Banking Innovation', citations: ['cb-m05-s07', 'cb-m05-s06'] },
    { title: 'Open Banking, APIs, and Financial Ecosystems', sourceTitle: 'Open Banking, APIs, and Financial Ecosystems', citations: ['cb-m05-s05', 'cb-m05-s06', 'cb-m05-s08'] },
  ],
  mappingNotes: [
    'Lesson 5.2 has no entry in reviewHolds.ts at read time. Chapter 3 carries a restriction notice (primary Decree 94/2025 text not verified): its cards state no eligibility, participant or implementation claim, only the distinction between concept, pilot, sandbox and live service.',
    'No named-bank recognition or adoption claim is used.',
  ],
  cards: [
    {
      id: 'cb52-transformation-is-operating-model-redesign',
      ch: 1,
      front: 'Why is bank technology transformation more than a new app?',
      back: 'It is an operating-model redesign: modern channels create value only when core systems, data, controls and people can support them. Transformation extends beyond the app.',
      explanation: 'A digital front end cannot deliver real-time banking if customer records, payments, controls and operations remain fragmented behind it.',
      example: 'A slick onboarding screen still delays customers if the account has to be re-keyed into an old core system.',
      terms: ['Core banking', 'Straight-through processing'],
      refs: [
        [1, 'Bank transformation is an operating-model redesign: modern channels create value only when core systems, data, controls and people can support them.'],
        [1, 'Transformation extends beyond the app.'],
      ],
    },
    {
      id: 'cb52-transformation-case-needs-a-baseline',
      ch: 1,
      front: 'How should a technology transformation case start, and what does it often overlook?',
      back: 'With a customer or operating problem and a measurable baseline such as cycle time, failure, manual effort, cost, availability, complaint or loss. A cheaper steady state may require substantial transition investment.',
      explanation: 'Technology is a means, not the business objective, and migration, dual-running, vendor dependency, cyber testing and fallback belong in the economics.',
      example: 'A project that cuts running cost may still be unattractive once migration and dual-running cost is included.',
      terms: ['Operational resilience', 'Baseline'],
      refs: [
        [1, 'Start with a customer or operating problem and a measurable baseline: cycle time, failure, manual effort, cost, availability, complaint or loss.'],
        [1, 'A cheaper steady state may require substantial transition investment.'],
      ],
    },
    {
      id: 'cb52-straight-through-processing-and-resilience',
      ch: 1,
      front: 'What are straight-through processing and operational resilience, and what does automation need?',
      back: 'Straight-through processing completes a process without manual intervention except defined exceptions. Operational resilience is the ability to deliver important services through disruption and recover safely. Automation requires exception controls.',
      explanation: 'Automation suits defined, repeatable tasks, but the exceptions still need governance.',
      example: 'A payment that completes automatically is straight-through; one that fails a check goes to a person as an exception.',
      terms: ['Straight-through processing', 'Operational resilience'],
      refs: [
        [1, 'Completing a process without manual intervention except defined exceptions.'],
        [1, 'The ability to deliver important services through disruption and recover safely.'],
        [1, 'Automation requires exception controls.'],
      ],
    },
    {
      id: 'cb52-ai-is-a-governed-decision-workflow',
      ch: 2,
      front: 'Where does AI create value in banking, and who remains accountable?',
      back: 'Through a governed decision workflow, not a model in isolation. The bank remains accountable for the data, decision, customer outcome and appeal process.',
      explanation: 'Models find patterns, while rules, thresholds, people and systems turn the outputs into action, and monitoring tests performance and drift.',
      example: 'A model that ranks loan applications quickly still leaves the bank responsible for how the decision is made and appealed.',
      terms: ['Model risk', 'Human-in-the-loop'],
      refs: [
        [2, 'AI creates banking value through a governed decision workflow\u2014not through a model in isolation.'],
        [2, 'the bank remains accountable for the data, decision, customer outcome and appeal process.'],
      ],
    },
    {
      id: 'cb52-ai-benefits-and-limitations',
      ch: 2,
      front: 'What are the benefits and limitations of AI in banking?',
      back: 'Benefits can include speed, consistency, earlier detection and better allocation. Limitations include model risk, weak data, opacity, bias, privacy exposure, drift and automation error.',
      explanation: 'Compare the model-supported workflow with a defined baseline and measure customer harm, false positives, bias and complaints as well as accuracy and speed.',
      example: 'A fraud model that catches more fraud but blocks many genuine payments has not necessarily improved the customer outcome.',
      terms: ['Model drift', 'Explainability'],
      refs: [
        [2, 'Benefits can include speed, consistency, earlier detection and better allocation. Limitations include model risk, weak data, opacity, bias, privacy exposure, drift and automation error.'],
      ],
    },
    {
      id: 'cb52-limit-autonomy-by-consequence',
      ch: 2,
      front: 'How much autonomy should an AI system be given in a bank?',
      back: 'Limit autonomy according to consequence and uncertainty. Assisted drafting is not the same control problem as approving credit, blocking an account or filing a regulatory report.',
      explanation: 'Capabilities range from mature analytics to experimental generative workflows, so deployment status must be verified use case by use case.',
      example: 'A tool that drafts an email can be lightly supervised, while one that blocks an account needs far tighter control and an appeal route.',
      terms: ['Human-in-the-loop', 'Model risk'],
      refs: [
        [2, 'A bank should limit autonomy according to consequence and uncertainty.'],
        [2, 'Assisted drafting is not the same control problem as approving credit, blocking an account or filing a regulatory report.'],
      ],
    },
    {
      id: 'cb52-apis-do-not-transfer-accountability',
      ch: 3,
      front: 'What do APIs and open banking change about a bank\u2019s responsibility?',
      back: 'APIs redistribute the customer journey across an ecosystem, but they do not remove accountability for permission, security, resilience and customer outcomes. Open banking is permissioned access to banking data or services through controlled interfaces.',
      explanation: 'Ecosystems can widen distribution and reduce integration friction, but expand cyber exposure, consent complexity and dependency.',
      example: 'A retailer can place a payment journey inside its app, yet the regulated account, consent and security responsibilities remain.',
      terms: ['Open banking', 'API', 'Embedded banking'],
      refs: [
        [3, 'APIs redistribute the customer journey across an ecosystem; they do not remove accountability for permission, security, resilience and customer outcomes.'],
        [3, 'Permissioned access to banking data or services through controlled interfaces.'],
      ],
    },
    {
      id: 'cb52-sandbox-is-not-market-deployment',
      ch: 3,
      front: 'How should a claim about open banking be classified, and what is a sandbox?',
      back: 'As a live commercial service, limited pilot, approved sandbox test, proposed policy or general concept. A regulatory sandbox is a supervised testing arrangement with defined boundaries, not blanket market approval.',
      explanation: 'A supervised test is distinct from market-wide commercial approval, so a sandbox is not evidence that every open-banking use case is deployed.',
      example: 'A service being tested with a limited group under supervision is not yet a service every customer can use.',
      terms: ['Regulatory sandbox', 'Open banking'],
      refs: [
        [3, 'Classify each claim as live commercial service, limited pilot, approved sandbox test, proposed policy or general concept.'],
        [3, 'A supervised testing arrangement with defined boundaries; not blanket market approval.'],
      ],
    },
  ],
});

export const COMMERCIAL_BANKING_M05B01_DECKS: FlashcardDeckContent[] = [CB_LESSON_51_DECK, CB_LESSON_52_DECK];
