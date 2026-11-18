// Logistics Express Module 04, lessons 1 to 5 (apps/IndustryKnowledge/logisticsExpressModule04.tsx).
// Excerpts are verbatim from the chapter text the reader displays. No market figures, rankings or operator results appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'logistics-express',
  industryLabel: 'Express & Last-Mile Delivery',
  moduleId: 'le-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'LOGISTICS_EXPRESS_MODULE04',
  file: 'apps/IndustryKnowledge/logisticsExpressModule04.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m4-industry-competition-structure',
  title: 'Express & Last-Mile Delivery: Industry Competition Structure',
  description: 'Why no single network model leads every segment and what makes a parcel network defensible.',
  lessonId: 'le-m4-l1',
  lessonTitle: 'Industry Competition Structure',
  chapterIdPrefix: 'le-m4-l1',
  chapters: [
    'How Competitive Is Express & Last-Mile Delivery?',
    "How Do Porter's Five Forces Apply to Parcel Delivery?",
    'What Creates Competitive Barriers and Network Advantages?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le41-no-network-model-leads-every-segment',
      ch: 1,
      front: 'An international integrator and a domestic operator compete in the same market. Does one network model lead every segment?',
      back: 'No. Competition changes by geography, customer and promise: an integrator can lead time-definite cross-border while a domestic operator wins economy marketplace parcels.',
      explanation: 'Competitor groups at global, national, regional and local level are differentiated by speed, price, reach, volume source and operational control.',
      example: 'An international integrator can lead time-definite cross-border while a domestic operator wins economy marketplace parcels.',
      terms: ['Competitive segment', 'Integrator', 'Economy parcel'],
      refs: [
        [1, 'Competition changes by geography, customer and promise; no one network model leads every segment.'],
        [1, 'An international integrator can lead time-definite cross-border while a domestic operator wins economy marketplace parcels.'],
      ],
    },
    {
      id: 'le41-defensible-parcel-network-combines',
      ch: 3,
      front: 'What does a defensible parcel network combine, and how does entry differ for local on-demand and nationwide service?',
      back: 'It combines relevant reach, recurring density, reliable execution and integrated customer access. Local on-demand entry may need limited fixed infrastructure, while nationwide commitments require synchronized hubs and capacity.',
      explanation: 'Facilities, line haul, depots, couriers, systems, trust, volume and customer relationships are required at different service scales.',
      example: 'In Vietnam, entrants can access contractors, but broad reliable coverage and dense routes take time and demand.',
      terms: ['Barrier to entry', 'Route density', 'Customer integration'],
      refs: [
        [3, 'A defensible parcel network combines relevant reach, recurring density, reliable execution and integrated customer access.'],
        [3, 'Local on-demand entry may need limited fixed infrastructure; nationwide commitments require synchronized hubs and capacity.'],
        [3, 'Entrants can access contractors, but broad reliable coverage and dense routes take time and demand.'],
      ],
    },
  ],
});

const L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m4-key-industry-players',
  title: 'Express & Last-Mile Delivery: Key Industry Players',
  description: 'The separate dimensions of carrier scale and how to compare Vietnam\'s operators.',
  lessonId: 'le-m4-l2',
  lessonTitle: 'Key Industry Players',
  chapterIdPrefix: 'le-m4-l2',
  chapters: [
    'Who Are the Major Global Express and Parcel Operators?',
    'How Do International, Postal and Domestic Operators Differ?',
    "Which Companies and Platforms Shape Vietnam's Delivery Market?",
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le42-four-separate-dimensions-of-carrier-scale',
      ch: 1,
      front: 'Which four dimensions are separate parts of a global carrier\'s scale?',
      back: 'Revenue, parcel volume, geographic reach and service mix.',
      explanation: 'The major players include international integrators, domestic parcel networks and multinational groups with different operating focuses.',
      example: 'Global carriers are most relevant where cross-border reach and coordinated customs-to-delivery service matter.',
      terms: ['Carrier scale', 'Parcel volume', 'Service mix'],
      refs: [
        [1, 'Revenue, parcel volume, geographic reach and service mix are separate dimensions of global carrier scale.'],
        [1, 'major international integrators, domestic parcel networks and multinational groups with different operating focuses.'],
      ],
    },
    {
      id: 'le42-compare-vietnam-competitors-on-substance',
      ch: 3,
      front: 'How should Vietnam\'s delivery operators be compared, rather than by name recognition?',
      back: 'On route, parcel, promise, safety, price and integration, not name recognition alone.',
      explanation: 'The set includes domestic postal and express operators, private courier networks and marketplace-linked delivery services.',
      example: 'Vietnam competitors are compared on route, parcel, promise, safety, price and integration, not name recognition alone.',
      terms: ['Operator comparison', 'Marketplace-linked delivery'],
      refs: [
        [3, 'Vietnam competitors should be compared on route, parcel, promise, safety, price and integration—not name recognition alone.'],
        [3, 'domestic postal and express operators, private courier networks and marketplace-linked delivery services.'],
      ],
    },
  ],
});

const L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m4-competitor-benchmarking',
  title: 'Express & Last-Mile Delivery: Competitor Benchmarking',
  description: 'What balanced benchmarking reveals and why a low rate can mislead.',
  lessonId: 'le-m4-l3',
  lessonTitle: 'Competitor Benchmarking',
  chapterIdPrefix: 'le-m4-l3',
  chapters: [
    'How Should Express Delivery Operators Be Compared?',
    'How Do Coverage, Speed, Service Quality and Profitability Differ?',
    'Which Capabilities Explain Sustainable Competitive Advantage?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le43-balanced-benchmarking-reveals-trade-offs',
      ch: 1,
      front: 'What does balanced benchmarking reveal that a single speed or price metric hides?',
      back: 'Trade-offs between measures such as destination reach, promised and actual time, successful handover, loss or damage, scan completeness and support.',
      explanation: 'The comparisons need to be matched, and the published parcel-weight, route and sample limits apply before findings are generalized.',
      example: 'Comparing two operators on reach, time, successful handover, loss or damage and scan completeness shows trade-offs that one speed figure would hide.',
      terms: ['Benchmarking', 'Successful handover', 'Scan completeness'],
      refs: [
        [1, 'Balanced benchmarking reveals trade-offs that one speed or price metric hides.'],
        [1, 'matched comparisons of destination reach, promised and actual time, successful handover, loss or damage, scan completeness and support.'],
        [1, 'Apply the published parcel-weight, route and sample limits before generalizing findings.'],
      ],
    },
    {
      id: 'le43-low-rate-can-be-uneconomic',
      ch: 2,
      front: 'A competitor offers a low rate. When can that rate still be uneconomic?',
      back: 'When remote stops, failed attempts or special handling are excluded from the comparison.',
      explanation: 'A strong commercial position combines customer value with prices and account terms that sustain network economics.',
      example: 'Price is normalized for parcel and promise, and route productivity, recurring demand, customer concentration and contract flexibility are checked alongside it.',
      terms: ['Comparable rate', 'Failed attempt', 'Network economics'],
      refs: [
        [2, 'A low rate can be uneconomic when remote stops, failed attempts or special handling are excluded from the comparison.'],
        [2, 'A strong commercial position combines customer value with prices and account terms that sustain network economics.'],
        [2, 'price normalized for parcel and promise, route productivity, recurring demand, customer concentration and contract flexibility.'],
      ],
    },
  ],
});

const L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m4-key-success-factors',
  title: 'Express & Last-Mile Delivery: Key Success Factors',
  description: 'Reliability measured against cost, and technology that turns into advantage.',
  lessonId: 'le-m4-l4',
  lessonTitle: 'Key Success Factors',
  chapterIdPrefix: 'le-m4-l4',
  chapters: [
    'Why Do Route Density and Network Capacity Matter?',
    'How Do Cost Efficiency and Delivery Reliability Create Advantage?',
    'How Do Technology, Merchant Relationships and Customer Trust Support Growth?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le44-first-attempt-success-versus-cost-to-serve',
      ch: 2,
      front: 'Which of first-attempt success and cost to serve measures delivery reliability, and which measures cost?',
      back: 'First-attempt success is the share of deliveries completed on the first visit under a defined method and period, which reflects reliability. Cost to serve is the resources and cost attributable to a shipment, customer, route or service.',
      explanation: 'The core operating advantage is more successful parcels per route and stop with less avoidable handling and travel.',
      example: 'Measure parcels per stop, completed stops per hour and redelivery by urban zone and province.',
      terms: ['First-attempt success', 'Cost to serve'],
      refs: [
        [2, 'Share of deliveries completed on the first visit under a defined method and period.'],
        [2, 'Resources and cost attributable to a shipment, customer, route or service.'],
        [2, 'The core operating advantage is more successful parcels per route and stop with less avoidable handling and travel.'],
      ],
    },
    {
      id: 'le44-delay-alert-with-redirection',
      ch: 3,
      front: 'A carrier sends a precise delay alert with a practical redirection option. What can that prevent, and when does technology become an advantage?',
      back: 'It can prevent both a failed stop and a customer complaint. Technology becomes advantage only when it improves completed deliveries, information accuracy and recovery from exceptions.',
      explanation: 'Operational tools and customer interfaces support forecasting, flow, routing, proof, communication and problem resolution.',
      example: 'Connect merchant, hub, courier and recipient events through consistent definitions and accountable exception owners.',
      terms: ['Delay alert', 'Redirection', 'Exception recovery'],
      refs: [
        [3, 'A precise delay alert with a practical redirection option can prevent both a failed stop and a customer complaint.'],
        [3, 'Technology becomes advantage only when it improves completed deliveries, information accuracy and recovery from exceptions.'],
        [3, 'Connect merchant, hub, courier and recipient events through consistent definitions and accountable exception owners.'],
      ],
    },
  ],
});

const L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m4-industry-swot-and-strategic-challenges',
  title: 'Express & Last-Mile Delivery: Industry SWOT & Strategic Challenges',
  description: 'Locker trade-offs in the SWOT and the triggers a peak plan defines.',
  lessonId: 'le-m4-l5',
  lessonTitle: 'Industry SWOT & Strategic Challenges',
  chapterIdPrefix: 'le-m4-l5',
  chapters: [
    "What Are the Industry's Main Strengths and Weaknesses?",
    'What Opportunities and Threats Shape Parcel Delivery?',
    'What Strategic Choices Must Express Operators Make?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le45-lockers-consolidate-but-add-risk',
      ch: 2,
      front: 'Lockers can consolidate stops. What risks do they create?',
      back: 'Location, investment, utilization and adoption risk.',
      explanation: 'Demand opportunity is attractive, but profitable growth requires converting volume into density, reliable service and defensible customer value.',
      example: 'Lockers can consolidate stops but create location, investment, utilization and adoption risk.',
      terms: ['Locker', 'Out-of-home', 'Utilization risk'],
      refs: [
        [2, 'Lockers can consolidate stops but create location, investment, utilization and adoption risk.'],
        [2, 'Demand opportunity is attractive, but profitable growth requires converting volume into density, reliable service and defensible customer value.'],
      ],
    },
    {
      id: 'le45-peak-plan-triggers',
      ch: 3,
      front: 'What does a peak plan define triggers for?',
      back: 'Labor, overflow line haul, sort capacity and merchant intake limits.',
      explanation: 'Risk discipline requires testing each growth opportunity against capacity, customer mix, service exposure and route economics.',
      example: 'Use route-level early warnings, fallback transport and customer escalation before service degrades.',
      terms: ['Peak plan', 'Overflow line haul', 'Intake limit'],
      refs: [
        [3, 'A peak plan defines triggers for labor, overflow line haul, sort capacity and merchant intake limits.'],
        [3, 'Risk discipline requires testing each growth opportunity against capacity, customer mix, service exposure and route economics.'],
        [3, 'Use route-level early warnings, fallback transport and customer escalation before service degrades.'],
      ],
    },
  ],
});

export const LOGISTICS_EXPRESS_M04_DECKS: FlashcardDeckContent[] = [L1_DECK, L2_DECK, L3_DECK, L4_DECK, L5_DECK];
