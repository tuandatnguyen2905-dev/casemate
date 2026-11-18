// Commercial Banking Module 01, Lesson 1.5 (apps/IndustryKnowledge/commercialBankingM01B3.tsx).
// Excerpts are verbatim and re-checked by decks.test.ts. No figures, dates or statutory detail are used.
// Chapter 5 carries a source restriction notice (resolution law). The single card drawn from it covers
// only climate-risk definitions and the portfolio-risk framing, not legal triggers or outcomes.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

export const CB_LESSON_15_DECK: FlashcardDeckContent = defineLessonDeck({
  industryId: 'banking-commercial',
  industryLabel: 'Commercial Banking',
  moduleId: 'cb-m01',
  moduleLabel: 'Module 01',
  moduleKey: 'COMMERCIAL_BANKING_MODULE01',
  file: 'apps/IndustryKnowledge/commercialBankingM01B3.tsx',
  readAtSha256: 'b7c7aeb8758d563221a0ce0a184e2995a82757e289eed61f9b24376922b6f991',
  readAt: '2026-11-08',
  chapterMarker: 'bankingChapter({',
  contentStatus: 'Draft / Ready for Review',
  deckId: 'commercial-banking-drivers-external-factors',
  title: 'Commercial Banking: Industry Drivers & External Factors',
  description: 'How the economy, regulation, social change, technology and climate risk reach a bank’s demand, margin, risk and growth.',
  lessonId: 'cb-m1-l15',
  lessonTitle: '1.5 Industry Drivers & External Factors',
  startMarker: "const L15 = '1.5 Industry Drivers & External Factors';",
  endMarker: 'export const CB_LESSON_15: BankingLessonBundle',
  chapterIdPrefix: 'cb-m1-l15',
  chapters: [
    { title: 'Economic Drivers of Commercial Banking', sourceTitle: '01 Economic Drivers of Commercial Banking', citations: ['cb-m01-s09', 'cb-m01-s10'] },
    { title: 'Regulation, Monetary Policy, and Banking Supervision', sourceTitle: '02 Regulation, Monetary Policy, and Banking Supervision', citations: ['cb-m01-s02', 'cb-m01-s03', 'cb-m01-s07', 'cb-m01-s08'] },
    { title: 'Social and Demographic Changes in Banking', sourceTitle: '03 Social and Demographic Changes in Banking', citations: ['cb-m01-s12'] },
    { title: 'Technology and Digital Banking Innovation', sourceTitle: '04 Technology and Digital Banking Innovation', citations: ['cb-m01-s12'] },
    { title: 'Sustainability, Risk, and Financial Stability', sourceTitle: '05 Sustainability, Risk, and Financial Stability', citations: ['cb-m01-s02', 'cb-m01-s03', 'cb-m01-s07', 'cb-m01-s14'] },
  ],
  mappingNotes: [
    'Lesson 1.5 has no entry in reviewHolds.ts at read time. Chapter 5 carries a restriction notice about article-level resolution provisions; no card states those provisions.',
    'GDP, inflation, ownership rates, targets, effective dates and Basel minimums in the chapters are deliberately not used on cards.',
  ],
  cards: [
    {
      id: 'cb15-banking-pro-cyclical',
      ch: 1,
      front: 'Why is banking described as pro-cyclical, and through which channels does the economy reach a bank’s profit?',
      back: 'Growth expands credit and fee opportunities, while rates and inflation change funding cost, affordability and default risk. The effect runs through loan and fee demand, net interest margin and credit losses. Returns are leveraged, so small shifts in spread or losses move ROA and ROE materially.',
      explanation: 'Follow the macro driver through demand, pricing and credit quality before deciding its net profit effect.',
      example: 'A strong economy can lift loans, deposits and payments together, yet encourage leverage that becomes painful when rates rise or growth slows.',
      terms: ['Pro-cyclicality', 'Credit cycle'],
      refs: [
        [1, 'Banking is pro-cyclical: economic growth expands credit and fee opportunities, while rates and inflation change funding costs, affordability and default risk.'],
        [1, 'Bank returns are leveraged, so small changes in spreads or credit losses can materially change ROA and ROE.'],
      ],
    },
    {
      id: 'cb15-rates-up-complete-answer',
      ch: 1,
      front: 'How do you build a complete answer to “do rising interest rates raise bank profit?”',
      back: 'First ask which assets and deposits reprice, and how quickly. Then test whether loan demand slows and defaults rise. A wider headline spread can be offset by deposit competition, lower volume or higher provisions.',
      explanation: 'The net effect depends on provisions as well as margin, so a single one-way claim is incomplete.',
      example: 'Loan yields may rise quickly while deposits reprice slowly, but if borrowers become stressed the extra spread can be absorbed by credit losses.',
      terms: ['Repricing', 'Provisions'],
      refs: [
        [1, 'First ask which assets and deposits reprice, and how quickly. Then test whether loan demand slows and defaults rise.'],
        [1, 'A wider headline spread can be offset by deposit competition, lower volume or higher provisions.'],
      ],
    },
    {
      id: 'cb15-growth-constraint-stack',
      ch: 2,
      front: 'Why might a bank with profitable loan demand still be unable to grow, and which constraints surround it?',
      back: 'It can run out of credit room, capital, liquidity or risk appetite before it runs out of customers. Around it sit licensing and supervision, prudential rules on capital, liquidity, concentration and governance, SBV credit room, and conduct, AML/KYC and data rules.',
      explanation: 'Regulation and monetary policy set the price, quantity and safety constraints within which commercial strategy operates.',
      example: 'A bank with eager borrowers may hit its credit room first; even with room to spare, it may lack the capital or stable funding to support the extra loans.',
      terms: ['Credit room', 'Prudential supervision', 'AML/KYC'],
      refs: [
        [2, 'A bank may see profitable loan demand and still be unable to grow: it can run out of credit room, capital, liquidity or risk appetite before it runs out of customers.'],
        [2, 'Prudential rules govern capital, liquidity, concentration and governance; monetary policy affects rates and liquidity; conduct, AML/KYC and data rules shape customer processes.'],
        [2, 'Supervisors license institutions, monitor ratios and intervene when risk rises. In Vietnam, SBV credit room adds a direct bank-by-bank growth constraint.'],
      ],
    },
    {
      id: 'cb15-lending-lowers-capital-ratio',
      ch: 2,
      front: 'Why can a capital adequacy ratio fall when lending grows, even if the bank has abundant deposits?',
      back: 'New lending can increase risk-weighted assets, the denominator of CAR. If qualifying capital does not grow as quickly, the ratio declines.',
      explanation: 'Deposits fund assets but are not capital, so a bank may need to retain earnings or raise capital to keep growing.',
      example: 'A bank flush with new deposits keeps lending, its risk-weighted assets rise faster than its capital, and its ratio falls.',
      terms: ['Risk-weighted assets', 'CAR'],
      refs: [
        [2, 'New lending can increase risk-weighted assets, the denominator of CAR. If qualifying capital does not grow as quickly, the ratio declines.'],
        [2, 'A bank may therefore retain earnings or raise capital even while it has abundant deposit funding.'],
      ],
    },
    {
      id: 'cb15-monetary-vs-prudential',
      ch: 2,
      front: 'What is the difference between monetary policy and prudential supervision?',
      back: 'Monetary policy is central-bank action affecting money, liquidity and interest-rate conditions. Prudential supervision is oversight designed to keep institutions safe and limit systemic risk.',
      explanation: 'Monetary policy shapes the price and availability of money; prudential supervision limits how much risk institutions take on. Both constrain bank strategy.',
      example: 'A rate decision changes funding and borrowing conditions for every bank, while a supervisor’s capital requirement limits how much risk one bank may carry.',
      terms: ['Monetary policy', 'Prudential supervision'],
      refs: [
        [2, 'Central-bank actions affecting money, liquidity and interest-rate conditions.'],
        [2, 'Oversight designed to keep institutions safe and limit systemic risk.'],
      ],
    },
    {
      id: 'cb15-inclusion-access-to-relationship',
      ch: 3,
      front: 'What four stages take a customer from account access to a durable banking relationship?',
      back: 'Access, activation, primary account and responsible deepening. Inclusion is about active financial relationships, not app downloads alone.',
      explanation: 'Social change expands the addressable market, but trust and meaningful usage decide whether access creates lasting value.',
      example: 'An account matters once salary arrives, bills are paid and savings build, and credit is taken responsibly, not when the app is downloaded.',
      terms: ['Primary account', 'Activation', 'Financial inclusion'],
      refs: [
        [3, 'Social change expands the addressable market and shifts service expectations, while trust and meaningful usage determine whether access creates durable value.'],
        [3, 'Access, activation, primary use and responsible deepening.'],
        [3, 'Inclusion is about active financial relationships, not app downloads alone.'],
      ],
    },
    {
      id: 'cb15-ownership-not-inclusion',
      ch: 3,
      front: 'Why is an account-ownership rate not a complete measure of financial inclusion?',
      back: 'Ownership is not the same as active, beneficial use or product suitability. An account can be dormant, used only once, or hard to reach for customers with limited digital confidence.',
      explanation: 'Judge inclusion quality with activity, savings, payment frequency, complaint, fraud and affordability measures.',
      example: 'A bank can report many accounts opened while few customers receive income or make regular payments through them.',
      terms: ['Financial inclusion', 'Product suitability'],
      refs: [
        [3, 'An account can be dormant, used only for one transfer or difficult to access for customers with limited digital confidence.'],
        [3, 'Ownership is not the same as active, beneficial use.'],
        [3, 'ownership does not prove active use or product suitability.'],
      ],
    },
    {
      id: 'cb15-technology-value-and-control',
      ch: 4,
      front: 'For every banking technology benefit, what must be paired with it?',
      back: 'A matching control, and an outcome measure rather than a feature count. Mobile and eKYC need identity and fraud checks; automation needs exception handling; AI needs model governance; APIs need security and third-party risk management; modern infrastructure needs operational resilience.',
      explanation: 'Technology creates value when it improves access, decisions, cost or control, and it also creates cyber, model, data and third-party risks that must be designed in.',
      example: 'A faster approval is valuable only if the bank still identifies the customer, detects fraud and prices risk correctly.',
      terms: ['eKYC', 'Model risk', 'Third-party risk'],
      refs: [
        [4, 'Digital value should be measured in outcomes, not features.'],
        [4, 'Automation scales controls and errors alike.'],
        [4, 'Technology creates banking value when it improves access, decisions, cost or control; it also creates cyber, model, data and third-party risks that must be designed in.'],
      ],
    },
    {
      id: 'cb15-digital-leading-indicators',
      ch: 4,
      front: 'Which leading indicator would you track for digital onboarding, servicing and AI credit support, and why not simpler counts?',
      back: 'Onboarding: verified completion and fraud, not downloads. Servicing: successful self-service and repeat contact, not clicks. AI credit support: decision quality and drift by customer group, as well as processing speed.',
      explanation: 'Outcome measures show whether digital change improves the customer and the economics; activity counts do not.',
      example: 'High download numbers say little if many applicants fail verification or later turn out to be fraudulent.',
      terms: ['Activation', 'Model risk'],
      refs: [
        [4, 'For onboarding, track verified completion and fraud—not downloads. For servicing, track successful self-service and repeat contact—not clicks.'],
        [4, 'For AI credit support, monitor decision quality and drift by customer group as well as processing speed.'],
      ],
    },
    {
      id: 'cb15-climate-risk-channels',
      ch: 5,
      front: 'How do physical and transition climate risk differ, and why does sustainability analysis belong inside risk management?',
      back: 'Physical risk is loss exposure from weather and longer-term physical climate effects; transition risk is loss exposure from policy, technology or demand shifts during economic transition. Banks transmit both through credit, collateral, funding and confidence.',
      explanation: 'Because both reach the balance sheet through borrowers and collateral, they must be assessed within credit and portfolio risk rather than beside it.',
      example: 'A flood can damage collateral, and an energy transition can weaken a borrower whose business depended on the old model.',
      terms: ['Physical climate risk', 'Transition risk'],
      refs: [
        [5, 'Loss exposure from weather and longer-term physical climate effects.'],
        [5, 'Loss exposure from policy, technology or demand shifts during economic transition.'],
        [5, 'Banks transmit environmental and financial risks through credit, collateral, funding and confidence, so sustainability analysis belongs inside risk management rather than beside it.'],
      ],
    },
  ],
});

export const COMMERCIAL_BANKING_M01B3_DECKS: FlashcardDeckContent[] = [CB_LESSON_15_DECK];
