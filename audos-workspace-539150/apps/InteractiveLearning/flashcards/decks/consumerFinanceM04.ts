// Consumer Finance Module 04, lessons 1 to 5 (apps/IndustryKnowledge/consumerFinanceModule04.tsx).
// Excerpts are verbatim from the chapter fields in the source file and re-checked by decks.test.ts.
// The source names no providers, rankings or figures in this module, so none appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'banking-consumer-finance',
  industryLabel: 'Consumer Finance',
  moduleId: 'cf-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'CONSUMER_FINANCE_MODULE04',
  file: 'apps/IndustryKnowledge/consumerFinanceModule04.tsx',
  readAtSha256: '1eb223bae6dd3a7f531c2bd095cf3d09378ae8f0267d8d71aec73f0754ad08d4',
  readAt: '2026-11-08',
  chapterMarker: "\ni('",
  contentStatus: 'Draft / Ready for Review',
  mappingNotes: ['The lesson has 3 chapters at read time. No review hold exists for Consumer Finance in reviewHolds.ts.'],
};

export const CF_M04_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'consumer-finance-competition-structure',
  title: 'Consumer Finance: Industry Competition Structure',
  description: 'What competitive advantage rests on, how funding and underwriting shape rivalry, and the real barriers to entry.',
  lessonId: 'cf-m4-l1',
  lessonTitle: 'Industry Competition Structure',
  startMarker: "['Industry Competition Structure',[",
  endMarker: "['Key Industry Players',[",
  chapterIdPrefix: 'cf-m4-l1',
  chapters: [
    { title: 'How Is Consumer Finance Competition Structured?', sourceTitle: 'How Is Consumer Finance Competition Structured?', citations: ['sbvInstitutions', 'vnCreditLaw', 'bisCredit'] },
    { title: 'Why Do Funding and Underwriting Shape Rivalry?', sourceTitle: 'Why Do Funding and Underwriting Shape Rivalry?', citations: ['bisCredit', 'oecdConsumer'] },
    { title: 'What Are the Real Barriers to Entry?', sourceTitle: 'What Are the Real Barriers to Entry?', citations: ['vnCreditLaw', 'sbvInstitutions', 'nistCSF'] },
  ],
  cards: [
    {
      id: 'cf41-advantage-beyond-volume',
      ch: 1,
      front: 'What does sustainable competitive advantage in consumer finance depend on, and how should providers be compared?',
      back: 'Funding, underwriting, trust, distribution and operating discipline, not lending volume or headline rate alone. Compare providers only within authorised product and institution scope, and evaluate portfolio quality alongside growth.',
      explanation: 'Providers compete across products, segments, channels, pricing, service and credit-assessment capabilities under different institution models.',
      example: 'A bank and a specialist lender pursue the same borrower using different funding, eligibility, pricing and channel strategies.',
      terms: ['Funding efficiency', 'Portfolio quality'],
      refs: [
        [1, 'Sustainable advantage depends on funding, underwriting, trust, distribution and operating discipline\u2014not lending volume or headline rate alone.'],
        [1, 'Compare providers only within authorized product and institution scope and evaluate portfolio quality alongside growth.'],
      ],
    },
    {
      id: 'cf41-copy-interface-not-funding',
      ch: 2,
      front: 'Why can competitors copy an interface faster than they can copy funding and underwriting, and why can a low advertised rate fail?',
      back: 'Stable funding, validated risk decisions and resilient portfolio performance take longer to reproduce. A low advertised rate creates no advantage if weak selection produces high losses and service cost.',
      explanation: 'That is why rates should be compared with funding basis, product, cohort, delinquency, loss, support and risk-adjusted return.',
      example: 'A lender advertises the lowest rate but approves poorly, and the resulting losses and service cost remove any benefit.',
      terms: ['Cost of funds', 'Risk appetite'],
      refs: [
        [2, 'Competitors can copy an interface faster than they can reproduce stable funding, validated risk decisions and resilient portfolio performance.'],
        [2, 'A low advertised rate fails to create advantage if weak selection produces high losses and service cost.'],
        [2, 'Compare rates with funding basis, product, cohort, delinquency, loss, support and risk-adjusted return.'],
      ],
    },
    {
      id: 'cf41-funding-cost-floor',
      ch: 2,
      front: 'In consumer-finance rivalry, what does funding cost set, and what decides which customers become sustainable repayers?',
      back: 'Funding cost sets an economic floor; underwriting and servicing determine which customers convert into sustainable repayment.',
      explanation: 'A provider cannot sustainably price below what its money costs, and the customers it selects and serves decide whether that price is actually earned back.',
      example: 'Two lenders advertise similar rates, but the one with cheaper, stable funding has a lower floor under the rate it can sustain.',
      terms: ['Cost of funds', 'Pricing', 'Credit loss'],
      refs: [
        [2, 'Funding cost sets an economic floor while underwriting and servicing determine which customers convert into sustainable repayment.'],
      ],
    },
    {
      id: 'cf41-real-barriers-to-entry',
      ch: 3,
      front: 'What does digital acquisition lower for an entrant, and what costs does it leave in place?',
      back: 'It lowers friction, but not the costs of authority, funding, fraud, losses, compliance or servicing. Entrants need permission, financial resources, reliable information, decision controls, collections, operations and reputation.',
      explanation: 'Scale is sustainable only when these foundations exist, whatever the interface looks like.',
      example: 'A technology platform partners with a licensed lender rather than conducting unauthorised balance-sheet lending.',
      terms: ['Licence', 'Capital', 'Customer trust'],
      refs: [
        [3, 'Digital acquisition lowers friction but not the costs of authority, funding, fraud, losses, compliance or servicing.'],
        [3, 'A technology platform partners with a licensed lender rather than conducting unauthorized balance-sheet lending.'],
      ],
    },
  ],
});

export const CF_M04_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'consumer-finance-key-industry-players',
  title: 'Consumer Finance: Key Industry Players',
  description: 'Provider types, the roles of fintechs and platforms, and how embedded-finance partnerships compete.',
  lessonId: 'cf-m4-l2',
  lessonTitle: 'Key Industry Players',
  startMarker: "['Key Industry Players',[",
  endMarker: "['Competitor Benchmarking',[",
  chapterIdPrefix: 'cf-m4-l2',
  chapters: [
    { title: 'Who Are the Main Consumer Finance Provider Types?', sourceTitle: 'Who Are the Main Consumer Finance Provider Types?', citations: ['sbvInstitutions', 'vnCreditLaw'] },
    { title: 'What Roles Do Fintechs and Digital Platforms Play?', sourceTitle: 'What Roles Do Fintechs and Digital Platforms Play?', citations: ['vnCreditLaw', 'vnElectronic', 'vnData', 'oecdConsumer'] },
    { title: 'How Do Embedded-Finance Partnerships Compete?', sourceTitle: 'How Do Embedded-Finance Partnerships Compete?', citations: ['vnCreditLaw', 'oecdConsumer', 'vnData'] },
  ],
  cards: [
    {
      id: 'cf42-banks-and-specialists',
      ch: 1,
      front: 'How do banks and specialist lenders serve overlapping needs differently, and how should providers be presented?',
      back: 'Through different funding, relationship, product focus and risk appetite. Present providers as examples within current product scope, not as a universal market-share or quality ranking.',
      explanation: 'Authorised institutions originate and manage consumer credit within institution-specific permissions and economics.',
      example: 'A bank offers credit to an eligible existing customer while a specialist focuses on retail instalments.',
      terms: ['Specialist lender', 'Product scope'],
      refs: [
        [1, 'Banks and specialists serve overlapping needs through different funding, relationship, product focus and risk appetite.'],
        [1, 'Present providers as examples within current product scope\u2014not as a universal market-share or quality ranking.'],
      ],
    },
    {
      id: 'cf42-fintech-not-automatically-lender',
      ch: 2,
      front: 'What can fintechs and digital platforms improve, and what do they not automatically become?',
      back: 'They can improve discovery, verification, payments and experience, without automatically becoming the lender. Distinguish lender, payment intermediary, technology vendor and retailer roles; user scale does not equal lending authority.',
      explanation: 'Platforms connect customer journeys to authorised financial institutions through defined data, decision and service roles.',
      example: 'An e-commerce platform connects checkout financing to a named lender and transmits permitted application information.',
      terms: ['Payment ecosystem', 'Identity technology', 'Loan platform'],
      refs: [
        [2, 'Digital firms can improve discovery, verification, payments and experience without automatically becoming the lender.'],
        [2, 'Distinguish lender, payment intermediary, technology vendor and retailer roles; user scale does not equal lending authority.'],
      ],
    },
    {
      id: 'cf42-embedded-advantage-conditions',
      ch: 3,
      front: 'When does embedded reach create competitive advantage, and what should partnerships be benchmarked on?',
      back: 'Only when the provider controls decision quality and customers understand the credit relationship. Benchmark partner incentives, consent, decision ownership, downstream performance and concentration risk.',
      explanation: 'Benchmarking downstream performance, not only partner conversion, shows whether embedded reach is bringing in customers who repay and understand what they owe.',
      example: 'A retailer and lender compare partner conversion with fraud, first-payment misses, complaints and repeat use.',
      terms: ['Embedded offer', 'Cohort quality'],
      refs: [
        [3, 'Embedded reach creates advantage only when the provider controls decision quality and customers understand the credit relationship.'],
        [3, 'Benchmark partner incentives, consent, decision ownership, downstream performance and concentration risk.'],
        [3, 'A retailer and lender compare partner conversion with fraud, first-payment misses, complaints and repeat use.'],
      ],
    },
    {
      id: 'cf42-lender-governs-embedded-offer',
      ch: 3,
      front: 'In an embedded-finance partnership, what does the partner do, and what does the lender keep governing?',
      back: 'The partner integrates the offer into commerce. The lender governs eligibility, the agreement, funding, servicing, complaints and portfolio feedback.',
      explanation: 'Splitting distribution from lending keeps the credit relationship with the party that decides, funds and services it, however the offer reaches the customer.',
      example: 'A retailer shows an instalment offer at checkout, while the lender decides who is eligible, contracts with the customer and handles complaints.',
      terms: ['Retail distribution', 'Lender decision'],
      refs: [
        [3, 'Partners integrate offers into commerce while lenders govern eligibility, agreement, funding, servicing, complaints and portfolio feedback.'],
      ],
    },
  ],
});

export const CF_M04_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'consumer-finance-competitor-benchmarking',
  title: 'Consumer Finance: Competitor Benchmarking',
  description: 'How to compare products, which credit and channel metrics belong in a benchmark, and how to compare risk-adjusted performance.',
  lessonId: 'cf-m4-l3',
  lessonTitle: 'Competitor Benchmarking',
  startMarker: "['Competitor Benchmarking',[",
  endMarker: "['Key Success Factors',[",
  chapterIdPrefix: 'cf-m4-l3',
  chapters: [
    { title: 'How Should Products, Pricing and Experience Be Compared?', sourceTitle: 'How Should Products, Pricing and Experience Be Compared?', citations: ['oecdConsumer', 'vnCreditLaw'] },
    { title: 'Which Credit and Channel Metrics Belong in a Benchmark?', sourceTitle: 'Which Credit and Channel Metrics Belong in a Benchmark?', citations: ['bisCredit', 'oecdConsumer'] },
    { title: 'How Is Risk-Adjusted Performance Compared?', sourceTitle: 'How Is Risk-Adjusted Performance Compared?', citations: ['bisCredit', 'ifcResponsible'] },
  ],
  cards: [
    {
      id: 'cf43-compare-offers-consistently',
      ch: 1,
      front: 'Why is the lowest advertised rate not automatically the best offer, and what must a benchmark fix first?',
      back: 'Suitability, transparency, total cost and service also matter. A consistent benchmark fixes amount, term, repayment, fee, eligibility and support basis before comparing offers.',
      explanation: 'Include the applicable rate basis, relevant fees, total payable, due dates, late treatment, complaints and support.',
      example: 'A researcher calculates total repayment for two loans using the same amount and term before comparing convenience.',
      terms: ['Total cost', 'Eligibility', 'Repayment flexibility'],
      refs: [
        [1, 'The lowest advertised rate is not automatically best; suitability, transparency, total cost and service also matter.'],
        [1, 'A consistent benchmark fixes amount, term, repayment, fee, eligibility and support basis before comparing offers.'],
      ],
    },
    {
      id: 'cf43-benchmark-credit-metrics',
      ch: 2,
      front: 'What must a benchmark define for credit and channel metrics, and what must channel reach be connected to?',
      back: 'Product, cohort, vintage, period and denominator for conversion, delinquency, loss, recovery, acquisition and service measures. Channel reach must be connected to cohort credit quality and customer outcomes.',
      explanation: 'Without matching definitions, metrics from different providers or channels cannot be compared.',
      example: 'Rapid approval growth looks weaker once early delinquency and acquisition cost are added.',
      terms: ['Approval rate', 'First-payment default', 'Vintage'],
      refs: [
        [2, 'Channel reach must be connected to cohort credit quality and customer outcomes.'],
        [2, 'Benchmarks define product, cohort, vintage, period and denominator for conversion, delinquency, loss, recovery, acquisition and service measures.'],
      ],
    },
    {
      id: 'cf43-label-benchmark-evidence',
      ch: 2,
      front: 'When competitor figures come from different kinds of source, how should they be prepared and labelled before comparison?',
      back: 'Normalise product, cohort, period and denominator, and label public disclosure, company claim and estimate separately.',
      explanation: 'A company claim or an analyst estimate carries less certainty than a public disclosure, so mixing them without labels makes a comparison look firmer than it is.',
      example: 'A benchmark table marks one provider\u2019s delinquency as publicly disclosed and another\u2019s as an estimate, rather than presenting both as equally reliable.',
      terms: ['Denominator', 'Cohort'],
      refs: [
        [2, 'Normalize product, cohort, period and denominator and label public disclosure, company claim and estimate separately.'],
      ],
    },
    {
      id: 'cf43-risk-adjusted-comparison',
      ch: 3,
      front: 'How should providers be compared on risk-adjusted performance, and what should be done with missing data?',
      back: 'Build a waterfall from income through funding, losses, operations and capital on compatible accounting and scope, and avoid a single-metric winner. Preserve missing data as not verified. Competitiveness comes from converting reach into risk-adjusted value.',
      explanation: 'Maximising applications or disbursements is not the aim; contribution after funding and loss costs is.',
      example: 'Two providers with similar yield produce different contribution because funding and credit-loss costs differ.',
      terms: ['Net yield', 'Cost of risk', 'Contribution'],
      refs: [
        [3, 'Long-term competitiveness comes from converting reach into risk-adjusted value, not maximizing applications or disbursements.'],
        [3, 'Analysts build a waterfall from income through funding, losses, operations and capital using compatible accounting and scope.'],
        [3, 'Reconcile definitions and avoid a single-metric winner; preserve missing data as not verified.'],
      ],
    },
  ],
});

export const CF_M04_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'consumer-finance-key-success-factors',
  title: 'Consumer Finance: Key Success Factors',
  description: 'Underwriting, funding and technology, and customer trust and fair treatment as sources of advantage.',
  lessonId: 'cf-m4-l4',
  lessonTitle: 'Key Success Factors',
  startMarker: "['Key Success Factors',[",
  endMarker: "['Industry SWOT & Strategic Challenges',[",
  chapterIdPrefix: 'cf-m4-l4',
  chapters: [
    { title: 'What Makes Underwriting a Competitive Advantage?', sourceTitle: 'What Makes Underwriting a Competitive Advantage?', citations: ['bisCredit', 'nistAI', 'cic', 'oecdConsumer'] },
    { title: 'How Do Funding and Technology Reinforce Performance?', sourceTitle: 'How Do Funding and Technology Reinforce Performance?', citations: ['nistCSF', 'vnCyber', 'bisCredit'] },
    { title: 'Why Are Customer Trust and Fair Treatment Hard to Copy?', sourceTitle: 'Why Are Customer Trust and Fair Treatment Hard to Copy?', citations: ['oecdConsumer', 'ifcResponsible', 'vnData'] },
  ],
  cards: [
    {
      id: 'cf44-underwriting-advantage',
      ch: 1,
      front: 'Why is underwriting quality a core competitive advantage?',
      back: 'Poor underwriting can erase the return from rapid growth. Reliable evidence, policy, validated models, judgement and monitoring create consistent decisions across cycles.',
      explanation: 'Govern data, model approval, validation, overrides, drift, fairness, documentation and accountable decisions.',
      example: 'A lender adjusts approval policy after a cohort shows unexpectedly high early delinquency.',
      terms: ['Affordability assessment', 'Score validation', 'Portfolio monitoring'],
      refs: [
        [1, 'Credit quality is a core advantage because poor underwriting can erase the return from rapid growth.'],
        [1, 'Reliable evidence, policy, validated models, judgment and monitoring create consistent decisions across cycles.'],
        [1, 'A lender adjusts approval policy after a cohort shows unexpectedly high early delinquency.'],
      ],
    },
    {
      id: 'cf44-funding-technology-reinforce',
      ch: 2,
      front: 'How do funding and technology reinforce each other in sustainable performance, and what should be tracked?',
      back: 'Financial resilience combined with efficient, reliable operations: funding capacity supports pricing and growth, while secure systems execute decisions, accounts and payments with low error. Track funding concentration, outages, failed payments, incidents, service recovery and downstream outcomes.',
      explanation: 'Neither speed without resilience nor resilience without efficient operations sustains an advantage.',
      example: 'A provider improves application speed while strengthening fraud controls and incident response.',
      terms: ['Stable funding', 'Operational resilience', 'Cybersecurity'],
      refs: [
        [2, 'Sustainable advantage integrates financial resilience with efficient and reliable operations.'],
        [2, 'Track funding concentration, outages, failed payments, incidents, service recovery and downstream outcomes.'],
      ],
    },
    {
      id: 'cf44-trust-compounds',
      ch: 3,
      front: 'Why are customer trust and fair treatment hard for competitors to copy?',
      back: 'Trust compounds when pricing, service, data use and treatment consistently match the promise. Customers experience the product over months or years, through statements, payments, support, difficulty and closure, not only at acquisition.',
      explanation: 'A competitor can match a price quickly, but not a record of consistent treatment built up over the life of many accounts.',
      example: 'A lender resolves an allocation error quickly and corrects the record before it becomes delinquency.',
      terms: ['Complaint resolution', 'Fair collection', 'Data stewardship'],
      refs: [
        [3, 'Trust compounds when pricing, service, data use and treatment consistently match the promise.'],
        [3, 'Customers experience the product over months or years through statements, payments, support, difficulty and closure\u2014not only at acquisition.'],
        [3, 'A lender resolves an allocation error quickly and corrects the record before it becomes delinquency.'],
      ],
    },
    {
      id: 'cf44-measure-trust',
      ch: 3,
      front: 'Which measures show whether a lender\u2019s treatment of customers is building or eroding trust?',
      back: 'Complaints and how they are resolved, repeat issues, data incidents, collection outcomes and customer understanding.',
      explanation: 'Repeat issues and poorly resolved complaints are signs that service is not matching the promise, before the damage shows up in the brand.',
      example: 'A lender tracks how often a customer raises the same problem again after a complaint has been closed.',
      terms: ['Complaint resolution', 'Brand trust'],
      refs: [
        [3, 'Measure complaints, resolution, repeat issues, data incidents, collection outcomes and customer understanding.'],
      ],
    },
  ],
});

export const CF_M04_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'consumer-finance-swot-strategic-challenges',
  title: 'Consumer Finance: Industry SWOT & Strategic Challenges',
  description: 'Building a SWOT, tracing risks that compound, and prioritising strategic responses.',
  lessonId: 'cf-m4-l5',
  lessonTitle: 'Industry SWOT & Strategic Challenges',
  startMarker: "['Industry SWOT & Strategic Challenges',[",
  endMarker: '\n];const topics=',
  chapterIdPrefix: 'cf-m4-l5',
  chapters: [
    { title: 'How Should a Consumer Finance SWOT Be Built?', sourceTitle: 'How Should a Consumer Finance SWOT Be Built?', citations: ['worldBankFindex', 'ifcResponsible', 'bisCredit'] },
    { title: 'Which Risks Can Compound Across the Model?', sourceTitle: 'Which Risks Can Compound Across the Model?', citations: ['oecdConsumer', 'bisCredit', 'nistAI', 'vnData'] },
    { title: 'How Should Strategic Responses Be Prioritised?', sourceTitle: 'How Should Strategic Responses Be Prioritised?', citations: ['bisCredit', 'oecdConsumer', 'ifcResponsible'] },
  ],
  cards: [
    {
      id: 'cf45-build-a-swot',
      ch: 1,
      front: 'How should a consumer-finance SWOT be built, and why not use one market-wide score?',
      back: 'Separate internal capabilities from external conditions, and recognise that it varies by institution, product, customer and cycle. Evaluate opportunity by product, institution, cohort, channel and cycle instead of one market-wide score.',
      explanation: 'Growth potential is meaningful, but sustainable performance requires responsible lending, resilience and disciplined risk management.',
      example: 'A provider treats digital acquisition as an opportunity only after testing affordability, fraud and support capacity.',
      terms: ['SWOT', 'Recurring need', 'Formal access'],
      refs: [
        [1, 'A useful SWOT separates internal capabilities from external conditions and varies by institution, product, customer and cycle.'],
        [1, 'Evaluate opportunity by product, institution, cohort, channel and cycle rather than applying one market-wide score.'],
      ],
    },
    {
      id: 'cf45-risks-compound',
      ch: 2,
      front: 'How can consumer-finance risks compound across the model, and what should be used to catch it?',
      back: 'Weak acquisition can increase fraud and arrears, strain service, damage trust and tighten funding. Trace causes through decisions, operations, customer outcomes and financial effects, and use leading indicators and escalation triggers.',
      explanation: 'Risks listed independently miss how one weakness feeds the next.',
      example: 'Aggressive partner incentives produce low-quality applications, rising DPD, complaints and collection pressure.',
      terms: ['Over-indebtedness', 'Funding volatility', 'Model risk'],
      refs: [
        [2, 'Consumer-finance risks interact: weak acquisition can increase fraud and arrears, strain service, damage trust and tighten funding.'],
        [2, 'Aggressive partner incentives produce low-quality applications, rising DPD, complaints and collection pressure.'],
        [2, 'Use leading indicators and escalation triggers across risk appetite, sales, partner, pricing and collections.'],
      ],
    },
    {
      id: 'cf45-strategic-response',
      ch: 3,
      front: 'What should each strategic response link together, and how should responses be prioritised?',
      back: 'An accountable owner, target cohort, operating change, KPI, guardrail and decision trigger. Prioritise actions that protect affordability, credit quality, data, service and sustainable economics together.',
      explanation: 'Resilience requires balancing growth with protection, controls, efficiency and transparent practice.',
      example: 'A plan to expand a partner channel names its owner, the target cohort, the operating change, the KPI to watch and the guardrail that would stop it.',
      terms: ['Control owner', 'Guardrail', 'Customer outcome'],
      refs: [
        [3, 'Each response links an accountable owner, target cohort, operating change, KPI, guardrail and decision trigger.'],
        [3, 'Prioritize actions that protect affordability, credit quality, data, service and sustainable economics together.'],
      ],
    },
    {
      id: 'cf45-cohort-trigger-pauses-channel',
      ch: 3,
      front: 'A channel\u2019s first-payment misses breach the threshold agreed in advance. What should a stop-or-scale rule do?',
      back: 'Pause the channel while the root causes are reviewed, rather than keep scaling it because volume looks strong.',
      explanation: 'Setting the trigger before launch turns a warning sign into an agreed decision, so growth is not left to continue while problems build up.',
      example: 'A lender pauses a channel when first-payment misses breach the agreed threshold while root causes are reviewed.',
      terms: ['Stop-or-scale rule', 'Cohort trigger'],
      refs: [
        [3, 'A lender pauses a channel when first-payment misses breach the agreed threshold while root causes are reviewed.'],
        [3, 'Each response links an accountable owner, target cohort, operating change, KPI, guardrail and decision trigger.'],
      ],
    },
  ],
});

export const CONSUMER_FINANCE_M04_DECKS: FlashcardDeckContent[] = [CF_M04_L1_DECK, CF_M04_L2_DECK, CF_M04_L3_DECK, CF_M04_L4_DECK, CF_M04_L5_DECK];
