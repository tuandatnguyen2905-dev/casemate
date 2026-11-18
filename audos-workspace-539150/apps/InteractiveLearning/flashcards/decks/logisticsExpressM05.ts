// Logistics Express Module 05, lessons 1 to 5 (apps/IndustryKnowledge/logisticsExpressModule05.tsx).
// Excerpts are verbatim from the chapter text the reader displays. No market figures or forecasts appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'logistics-express',
  industryLabel: 'Express & Last-Mile Delivery',
  moduleId: 'le-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'LOGISTICS_EXPRESS_MODULE05',
  file: 'apps/IndustryKnowledge/logisticsExpressModule05.tsx',
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
  deckId: 'logistics-express-m5-customer-trends',
  title: 'Express & Last-Mile Delivery: Customer Trends',
  description: 'Recipient choice, honest delivery promises and updated estimates.',
  lessonId: 'le-m5-l1',
  lessonTitle: 'Customer Trends',
  chapterIdPrefix: 'le-m5-l1',
  chapters: [
    "How Are Shippers' and Recipients' Expectations Changing?",
    'Why Are Reliability, Visibility and Convenience More Important?',
    'How Are Faster Delivery and Alternative Handover Options Evolving?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it only repeats the shared base text of chapter 2 plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le51-convenience-means-recipient-choice',
      ch: 1,
      front: 'What can convenience mean in delivery, if not doorstep delivery for every parcel?',
      back: 'Recipient choice and predictable collection.',
      explanation: 'Service and handover options balance customer schedule, price, successful delivery and network consolidation.',
      example: 'Pickup networks should expand where accessible sites and sufficient recurring volume support secure operations.',
      terms: ['Convenience', 'Handover option', 'Pickup network'],
      refs: [
        [1, 'Convenience can mean recipient choice and predictable collection—not doorstep delivery for every parcel.'],
        [1, 'service and handover options balancing customer schedule, price, successful delivery and network consolidation.'],
        [1, 'Pickup networks should expand where accessible sites and sufficient recurring volume support secure operations.'],
      ],
    },
    {
      id: 'le51-dependable-fulfillment-versus-speed-promise',
      ch: 2,
      front: 'A line-haul delay occurs. Should the carrier keep displaying the original delivery promise?',
      back: 'No. It should update the estimated window rather than display an obsolete promise, because dependable fulfillment and clear information can create more value than an aggressive speed promise the network cannot sustain.',
      explanation: 'Customer expectations cover delivery windows, tracking, delay communication, safe handover and practical exception options.',
      example: 'A carrier updates an estimated window after a line-haul delay rather than displaying an obsolete promise.',
      terms: ['Delivery window', 'Delay communication', 'Speed promise'],
      refs: [
        [2, 'A carrier updates an estimated window after a line-haul delay rather than displaying an obsolete promise.'],
        [2, 'Dependable fulfillment and clear information can create more value than an aggressive speed promise the network cannot sustain.'],
      ],
    },
  ],
});

const L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m5-technology-and-innovation-trends',
  title: 'Express & Last-Mile Delivery: Technology & Innovation Trends',
  description: 'When AI creates value and how visibility turns shared events into action.',
  lessonId: 'le-m5-l2',
  lessonTitle: 'Technology & Innovation Trends',
  chapterIdPrefix: 'le-m5-l2',
  chapters: [
    'How Are Route Optimization and Digital Dispatch Changing Delivery?',
    'How Are Sorting Automation, Tracking and Analytics Improving Operations?',
    'How Could AI and Connected Logistics Transform Parcel Networks?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it only repeats the shared base text of chapter 2 plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le52-ai-value-needs-reliable-data',
      ch: 1,
      front: 'When does AI create value in parcel operations, and what should a team start with?',
      back: 'When reliable data improves measurable capacity, route, sorting or exception decisions. Start with high-quality event, route and exception data, then test productivity and service against a baseline.',
      explanation: 'The live uses include machine learning, robotics, computer vision and conversational systems across parcel operations.',
      example: 'Start with high-quality event, route and exception data, then test productivity and service against a baseline.',
      terms: ['AI', 'Baseline', 'Exception data'],
      refs: [
        [1, 'AI creates value when reliable data improves measurable capacity, route, sorting or exception decisions.'],
        [1, 'Start with high-quality event, route and exception data, then test productivity and service against a baseline.'],
      ],
    },
    {
      id: 'le52-dashboard-locates-recurring-dwell',
      ch: 2,
      front: 'A dashboard compares planned and actual milestones. What does that help an operator find, and what should be standardized first?',
      back: 'It locates recurring dwell by comparing planned versus actual departure, arrival and delivery milestones. Addresses, event codes, timestamps and KPI denominators should be standardized before advanced analytics.',
      explanation: 'Visibility matters when accurate shared events lead to timely customer communication and accountable operating action.',
      example: 'A dashboard compares planned versus actual departure, arrival and delivery milestones to locate recurring dwell.',
      terms: ['Dwell', 'Event code', 'KPI denominator'],
      refs: [
        [2, 'A dashboard compares planned versus actual departure, arrival and delivery milestones to locate recurring dwell.'],
        [2, 'Standardize addresses, event codes, timestamps and KPI denominators before advanced analytics.'],
        [2, 'Visibility matters when accurate shared events lead to timely customer communication and accountable operating action.'],
      ],
    },
  ],
});

const L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m5-market-and-channel-trends',
  title: 'Express & Last-Mile Delivery: Market & Channel Trends',
  description: 'When out-of-home delivery works and how cross-border networks hand data and parcels on.',
  lessonId: 'le-m5-l3',
  lessonTitle: 'Market & Channel Trends',
  chapterIdPrefix: 'le-m5-l3',
  chapters: [
    'How Are Parcel Networks and Delivery Partnerships Evolving?',
    'How Are Lockers, Pickup Points and Out-of-Home Delivery Developing?',
    'How Are E-Commerce, Cross-Border and Platform Channels Expanding?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the shared base text of chapter 2 plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le53-out-of-home-works-where',
      ch: 2,
      front: 'When does out-of-home delivery work, and does it replace home delivery?',
      back: 'It works where recipient access and consolidated density outweigh site, technology and operating cost. It complements, and does not universally replace, home delivery.',
      explanation: 'Lockers, shops, collection points and shared locations are the out-of-home options.',
      example: 'Pilot in dense residential, office, campus and transit zones with clear adoption and utilization measures.',
      terms: ['Out-of-home', 'Locker', 'Consolidated density'],
      refs: [
        [2, 'Out-of-home works where recipient access and consolidated density outweigh site, technology and operating cost.'],
        [2, 'lockers, shops, collection points and shared locations that complement—not universally replace—home delivery.'],
        [2, 'Pilot in dense residential, office, campus and transit zones with clear adoption and utilization measures.'],
      ],
    },
    {
      id: 'le53-shipment-data-reaches-customs-first',
      ch: 3,
      front: 'In cross-border e-commerce, what does sending electronic shipment data ahead of the parcel achieve?',
      back: 'The data reaches customs and the destination carrier before physical arrival, reducing information delay.',
      explanation: 'Cross-border advantage comes from coordinated documentation, handoffs and visibility across multiple networks.',
      example: 'Local operators can connect global sellers to domestic consumers when handoff responsibility and event data are clear.',
      terms: ['Cross-border', 'Customs data', 'Destination carrier'],
      refs: [
        [3, 'Electronic shipment data reaches customs and the destination carrier before physical arrival, reducing information delay.'],
        [3, 'Cross-border advantage comes from coordinated documentation, handoffs and visibility across multiple networks.'],
        [3, 'Local operators can connect global sellers to domestic consumers when handoff responsibility and event data are clear.'],
      ],
    },
  ],
});

const L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m5-regulatory-and-sustainability-trends',
  title: 'Express & Last-Mile Delivery: Regulatory & Sustainability Trends',
  description: 'Low-emission delivery as a network-design problem and when electric motorcycles fit.',
  lessonId: 'le-m5-l4',
  lessonTitle: 'Regulatory & Sustainability Trends',
  chapterIdPrefix: 'le-m5-l4',
  chapters: [
    'How Do Postal, Transport, Safety and Data Rules Affect Delivery?',
    'How Are Electric Vehicles and Low-Emission Networks Evolving?',
    'How Are Security, Traceability and Responsible Operations Changing?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 is review-held and has no cards.',
  ],
  cards: [
    {
      id: 'le54-electric-motorcycle-fits-short-dense-routes',
      ch: 2,
      front: 'When can an electric motorcycle suit a delivery route?',
      back: 'On short dense routes, when payload, range, charging and uptime align.',
      explanation: 'Vehicle choice, charging, route structure, facility efficiency, packaging and credible measurement all matter under local conditions.',
      example: 'Evaluate motorcycles, vans, lockers and facilities by route feasibility and measurable environmental outcome.',
      terms: ['Electric motorcycle', 'Charging', 'Uptime'],
      refs: [
        [2, 'An electric motorcycle can suit short dense routes when payload, range, charging and uptime align.'],
        [2, 'Evaluate motorcycles, vans, lockers and facilities by route feasibility and measurable environmental outcome.'],
      ],
    },
    {
      id: 'le54-sustainable-delivery-is-network-design',
      ch: 3,
      front: 'What kind of problem is sustainable parcel delivery, and which factors does it involve?',
      back: 'A network-design problem involving distance, density, utilization, energy and successful handover.',
      explanation: 'Credible measurement under local conditions is part of the picture, alongside vehicle choice, charging, route structure and facility efficiency.',
      example: 'Evaluate motorcycles, vans, lockers and facilities by route feasibility and measurable environmental outcome.',
      terms: ['Network design', 'Utilization', 'Successful handover'],
      refs: [
        [3, 'Sustainable delivery is a network-design problem involving distance, density, utilization, energy and successful handover.'],
        [3, 'vehicle choice, charging, route structure, facility efficiency, packaging and credible measurement under local conditions.'],
      ],
    },
  ],
});

const L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m5-growth-outlook-and-strategic-opportunities',
  title: 'Express & Last-Mile Delivery: Growth Outlook & Strategic Opportunities',
  description: 'How to treat forecasts, where Vietnam\'s strongest opportunity lies and how to stage investment.',
  lessonId: 'le-m5-l5',
  lessonTitle: 'Growth Outlook & Strategic Opportunities',
  chapterIdPrefix: 'le-m5-l5',
  chapters: [
    'What Factors Will Drive Future Express Delivery Demand?',
    'Where Are New Opportunities Emerging in Vietnam and Global Markets?',
    'How Should Express Operators Position Themselves?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card; no figures from the chapters\' market statistics are restated.',
  ],
  cards: [
    {
      id: 'le55-forecasts-are-context-not-guarantees',
      ch: 1,
      front: 'How should global and regional market forecasts be treated by a domestic carrier, and what must winners do with demand?',
      back: 'As context, not guaranteed domestic carrier growth or margins. Winners must translate demand into dense, reliable and appropriately priced service.',
      explanation: 'The structural forces influencing regional growth and network investment sit behind the forecasts, but they do not guarantee results for one carrier.',
      example: 'Global and regional forecasts provide context, while winners must translate demand into dense, reliable and appropriately priced service.',
      terms: ['Forecast', 'Domestic carrier growth', 'Margin'],
      refs: [
        [1, 'Global and regional forecasts provide context—not guaranteed domestic carrier growth or margins.'],
        [1, 'The market outlook is positive, but winners must translate demand into dense, reliable and appropriately priced service.'],
      ],
    },
    {
      id: 'le55-vietnam-pairs-demand-with-four-improvements',
      ch: 2,
      front: 'What is Vietnam\'s strongest opportunity in express delivery?',
      back: 'To pair growing demand with better density, first-attempt success, integration and cost discipline.',
      explanation: 'The growth choices span merchants, provincial networks, cities, alternative delivery, cross-border services and operating analytics.',
      example: 'Vietnam pairs growing demand with better density, first-attempt success, integration and cost discipline.',
      terms: ['Density', 'First-attempt success', 'Cost discipline'],
      refs: [
        [2, 'Vietnam’s strongest opportunity is to pair growing demand with better density, first-attempt success, integration and cost discipline.'],
        [2, 'practical growth choices across merchants, provincial networks, cities, alternative delivery, cross-border services and operating analytics.'],
      ],
    },
    {
      id: 'le55-stage-investment-with-stop-or-scale-criteria',
      ch: 3,
      front: 'An operator plans a new Vietnam investment. How should it stage that investment?',
      back: 'With route-level economics, service baselines, customer adoption and stop-or-scale criteria.',
      explanation: 'Practical growth choices run across merchants, provincial networks, cities, alternative delivery, cross-border services and operating analytics.',
      example: 'Investment is staged with route-level economics, service baselines, customer adoption and stop-or-scale criteria.',
      terms: ['Staged investment', 'Service baseline', 'Stop-or-scale criteria'],
      refs: [
        [3, 'Stage investment with route-level economics, service baselines, customer adoption and stop-or-scale criteria.'],
      ],
    },
  ],
});

export const LOGISTICS_EXPRESS_M05_DECKS: FlashcardDeckContent[] = [L1_DECK, L2_DECK, L3_DECK, L4_DECK, L5_DECK];
