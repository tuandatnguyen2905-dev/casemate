// Logistics Express Module 03, lessons 1 to 6 (apps/IndustryKnowledge/logisticsExpressModule03.tsx).
// Excerpts are verbatim from the chapter text the reader displays. Calculation cards use only the HYPOTHETICAL numbers the chapters display; they are not market prices.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'logistics-express',
  industryLabel: 'Express & Last-Mile Delivery',
  moduleId: 'le-m03',
  moduleLabel: 'Module 03',
  moduleKey: 'LOGISTICS_EXPRESS_MODULE03',
  file: 'apps/IndustryKnowledge/logisticsExpressModule03.tsx',
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
  deckId: 'logistics-express-m3-industry-business-models',
  title: 'Express & Last-Mile Delivery: Industry Business Models',
  description: 'Integrated and postal models compared with asset-light, platform-linked delivery.',
  lessonId: 'le-m3-l1',
  lessonTitle: 'Industry Business Models',
  chapterIdPrefix: 'le-m3-l1',
  chapters: [
    'How Do Express Delivery Companies Make Money?',
    'How Do Integrated, Postal, Platform and Outsourced Models Differ?',
    'How Do Asset-Heavy and Asset-Light Parcel Networks Compare?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le31-integrated-control-versus-postal-reach',
      ch: 2,
      front: 'How does integrated control differ from postal reach as a source of advantage?',
      back: 'Integrated control supports consistency, while postal reach supports coverage. The advantage depends on the target shipment and promise.',
      explanation: 'These models coordinate pickup, sortation, line haul, tracking and delivery through owned capacity, postal infrastructure or managed partners.',
      example: 'An international integrator controls gateways and visibility while using destination operations to maintain time-definite service.',
      terms: ['Integrated carrier', 'Postal network', 'Time-definite service'],
      refs: [
        [2, 'Integrated control supports consistency while postal reach supports coverage; advantage depends on the target shipment and promise.'],
        [2, 'models coordinating pickup, sortation, line haul, tracking and delivery through owned capacity, postal infrastructure or managed partners.'],
      ],
    },
    {
      id: 'le31-asset-light-trade-off',
      ch: 3,
      front: 'What does asset-light flexibility lower, and where does advantage shift as a result?',
      back: 'It lowers some capital needs but shifts advantage toward partner governance, data and service control.',
      explanation: 'Technology-led models allocate parcels among third parties, platform-linked networks and flexible couriers without owning every asset.',
      example: 'An orchestration platform selects a carrier by destination, price and promise, then unifies tracking for the merchant.',
      terms: ['Asset-light', 'Partner governance', 'Carrier orchestration'],
      refs: [
        [3, 'Asset-light flexibility lowers some capital needs but shifts advantage toward partner governance, data and service control.'],
        [3, 'An orchestration platform selects a carrier by destination, price and promise, then unifies tracking for the merchant.'],
      ],
    },
  ],
});

const L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m3-products-services-and-segmentation',
  title: 'Express & Last-Mile Delivery: Products, Services & Segmentation',
  description: 'What service tiers price, how value-added services and alternative delivery differ, and what out-of-home delivery is.',
  lessonId: 'le-m3-l2',
  lessonTitle: 'Products, Services & Segmentation',
  chapterIdPrefix: 'le-m3-l2',
  chapters: [
    'How Are Express and Parcel Services Segmented?',
    'How Do Standard, Express, Same-Day and International Services Differ?',
    'How Do Parcel, Route and Service Requirements Influence Pricing?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card.',
  ],
  cards: [
    {
      id: 'le32-service-tiers-price-speed-and-certainty',
      ch: 1,
      front: 'An urgent replacement part and a low-value consumer item are shipped. How do service tiers separate them?',
      back: 'Service tiers price different combinations of speed, certainty, coverage and handling complexity. The urgent part may justify express while the low-value item fits economy service.',
      explanation: 'Clear cutoffs and transit commitments help merchants choose between urban, interprovincial and cross-border tiers.',
      example: 'An urgent replacement part may justify express while a low-value consumer item fits economy service.',
      terms: ['Service tier', 'Express', 'Economy service'],
      refs: [
        [1, 'Service tiers price different combinations of speed, certainty, coverage and handling complexity.'],
        [1, 'An urgent replacement part may justify express while a low-value consumer item fits economy service.'],
        [1, 'Clear cutoffs and transit commitments help merchants choose between urban, interprovincial and cross-border tiers.'],
      ],
    },
    {
      id: 'le32-value-added-versus-alternative-delivery',
      ch: 2,
      front: 'How do value-added services differ from alternative delivery in what they do for the network?',
      back: 'Value-added services differentiate the experience, while alternative delivery can consolidate stops and reduce failed attempts.',
      explanation: 'Value-added and alternative options include communications, redirection, lockers, pickup points, return collection, insurance-related options and customer dashboards.',
      example: 'A customer dashboard or delivery notification differentiates the experience, while a locker or pickup point can consolidate stops.',
      terms: ['Value-added service', 'Alternative delivery', 'Failed attempt'],
      refs: [
        [2, 'Value-added services differentiate the experience, while alternative delivery can consolidate stops and reduce failed attempts.'],
        [2, 'communications, redirection, lockers, pickup points, return collection, insurance-related options and customer dashboards.'],
      ],
    },
    {
      id: 'le32-out-of-home-and-what-it-needs',
      ch: 3,
      front: 'What is out-of-home delivery, and what do retail partners and lockers need to make it work?',
      back: 'Out-of-home delivery goes to lockers, shops or collection points instead of a doorstep. Partners and lockers need accessible locations, secure custody, scan integration and sufficient parcel density.',
      explanation: 'Alternative delivery can consolidate stops and reduce failed attempts.',
      example: 'A retail partner holds parcels at a shop, so it needs an accessible location, secure custody and scans that feed the carrier\'s tracking.',
      terms: ['Out-of-home', 'Locker', 'Parcel density'],
      refs: [
        [3, 'Delivery to lockers, shops or collection points instead of a doorstep.'],
        [3, 'Retail partners and lockers need accessible locations, secure custody, scan integration and sufficient parcel density.'],
      ],
    },
  ],
});

const L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m3-customer-segments-and-needs',
  title: 'Express & Last-Mile Delivery: Customer Segments & Needs',
  description: 'What e-commerce customers need and how business, SME and consumer segments weigh reliability and price.',
  lessonId: 'le-m3-l3',
  lessonTitle: 'Customer Segments & Needs',
  chapterIdPrefix: 'le-m3-l3',
  chapters: [
    'Who Purchases Express and Last-Mile Services?',
    'What Determines Merchant and Shipper Requirements?',
    'How Do Price, Reliability, Visibility and Convenience Influence Decisions?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le33-ecommerce-customers-need-three-things',
      ch: 1,
      front: 'What do e-commerce customers need from execution, and what still differs by order profile?',
      back: 'They need scalable, visible and affordable execution, but each order profile has different route and return economics.',
      explanation: 'Marketplace, merchant, retailer and omnichannel needs span pickups, campaign surges, residential delivery and reverse flows.',
      example: 'A major campaign requires more sort shifts, line haul and route capacity while maintaining promised scans.',
      terms: ['E-commerce merchant', 'Marketplace', 'Return economics'],
      refs: [
        [1, 'E-commerce customers need scalable, visible and affordable execution, but each order profile has different route and return economics.'],
        [1, 'A major campaign requires more sort shifts, line haul and route capacity while maintaining promised scans.'],
      ],
    },
    {
      id: 'le33-corporate-account-values-documented-delivery',
      ch: 2,
      front: 'A corporate spare-parts account compares carriers. What does it value more than the cheapest base fee?',
      back: 'Documented delivery and recovery response.',
      explanation: 'Reliability, simplicity, traceability and price have different weights across corporate, SME and consumer segments.',
      example: 'A corporate spare-parts account values documented delivery and recovery response more than the cheapest base fee.',
      terms: ['Corporate account', 'Reliability', 'Traceability'],
      refs: [
        [2, 'A corporate spare-parts account values documented delivery and recovery response more than the cheapest base fee.'],
        [2, 'Reliability, simplicity, traceability and price have different weights across corporate, SME and consumer segments.'],
      ],
    },
  ],
});

const L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m3-revenue-streams-and-cost-structure',
  title: 'Express & Last-Mile Delivery: Revenue Streams & Cost Structure',
  description: 'Hypothetical per-parcel contribution, route cost per stop and KPI cost examples, plus the denominators KPIs need.',
  lessonId: 'le-m3-l4',
  lessonTitle: 'Revenue Streams & Cost Structure',
  chapterIdPrefix: 'le-m3-l4',
  chapters: [
    'How Do Express and Last-Mile Operators Generate Revenue?',
    'What Determines Parcel-Network and Delivery Costs?',
    'Which KPIs Drive Express Delivery Profitability?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card; the calculation cards use only the chapters\' HYPOTHETICAL numbers.',
  ],
  cards: [
    {
      id: 'le34-contribution-per-parcel-hypothetical',
      ch: 1,
      front: 'HYPOTHETICAL: revenue is USD5 per parcel, with USD0.5 pickup, 0.7 sort, 0.8 line haul, 1.6 last mile and 0.4 technology/support cost. What is contribution per parcel?',
      back: 'Attributable cost is 0.5+0.7+0.8+1.6+0.4 = USD4.0, so contribution is 5.0 minus 4.0 = USD1.0 per parcel, before fixed-cost allocation.',
      explanation: 'Contribution is revenue less the variable or attributable cost of each parcel, and the chapter\'s values are hypothetical, not market prices.',
      example: 'HYPOTHETICAL: at USD5 revenue per parcel and USD4.0 attributable cost, contribution is USD1.0 per parcel.',
      terms: ['Contribution per parcel', 'Attributable cost'],
      refs: [
        [1, 'HYPOTHETICAL calculation: variable/attributable cost=0.5+0.7+0.8+1.6+0.4=USD4.0; contribution=5.0−4.0=USD1.0;'],
        [1, 'At USD5 revenue per parcel with USD0.5 pickup, 0.7 sort, 0.8 line haul, 1.6 last mile and 0.4 technology/support cost'],
      ],
    },
    {
      id: 'le34-after-fixed-allocation-hypothetical',
      ch: 1,
      front: 'HYPOTHETICAL: contribution is USD1.0 per parcel and fixed-cost allocation is USD0.6. What is left per parcel?',
      back: 'USD0.4 per parcel: contribution of 1.0 minus the 0.6 fixed-cost allocation.',
      explanation: 'Contribution is USD1.0 per parcel before the USD0.6 fixed-cost allocation, which leaves USD0.4.',
      example: 'HYPOTHETICAL calculation: after fixed allocation=USD0.4.',
      terms: ['Fixed-cost allocation', 'Contribution per parcel'],
      refs: [
        [1, 'contribution is USD1.0 per parcel before USD0.6 fixed-cost allocation, leaving USD0.4.'],
        [1, 'after fixed allocation=USD0.4.'],
      ],
    },
    {
      id: 'le34-revenue-measures-stay-separate',
      ch: 1,
      front: 'Which four revenue-related things remain separate for an express operator?',
      back: 'Billing, recognized revenue, COD custody and cash collection.',
      explanation: 'Revenue can include parcel fees, distance or zone charges, service premiums, merchant contracts, surcharges, COD handling where applicable, returns and value-added services.',
      example: 'Hypothetical values should not be presented as market prices; the parcel, service, zone, weight, surcharge, COD and return billing rules need defining.',
      terms: ['Billing', 'Recognized revenue', 'COD custody'],
      refs: [
        [1, 'Billing, recognized revenue, COD custody and cash collection remain separate.'],
        [1, 'Do not present hypothetical values as market prices; define parcel, service, zone, weight, surcharge, COD and return billing rules.'],
      ],
    },
    {
      id: 'le34-route-cost-per-stop-hypothetical',
      ch: 2,
      front: 'HYPOTHETICAL: a route has USD120 fixed route cost. What is the cost per successful stop at 40 stops and at 60 stops?',
      back: '120/40 = USD3.00 per stop at 40 stops, and 120/60 = USD2.00 per stop at 60 stops, holding distance, service and other costs constant.',
      explanation: 'Density helps when more successful stops share the same fixed route cost, holding distance, service and other costs constant.',
      example: 'HYPOTHETICAL: the same USD120 route costs USD3 per stop with 40 stops but USD2 per stop with 60 stops.',
      terms: ['Cost per stop', 'Route density'],
      refs: [
        [2, 'HYPOTHETICAL calculation: 120/40=USD3.00 per stop; 120/60=USD2.00.'],
        [2, 'A route with USD120 fixed route cost costs USD3 per successful stop at 40 stops but USD2 at 60 stops, holding distance, service and other costs constant.'],
      ],
    },
    {
      id: 'le34-density-only-helps-if-feasible',
      ch: 2,
      front: 'A planner wants to add stops to a route to lower the cost per stop. What condition must hold?',
      back: 'Density helps only when the added stops remain operationally feasible and successful.',
      explanation: 'Route density is kept separate from courier productivity, with route, distance, parcel and service assumptions disclosed.',
      example: 'HYPOTHETICAL: a USD120 route costs USD3 per successful stop at 40 stops but USD2 at 60 stops, if the added stops are feasible and successful.',
      terms: ['Route density', 'Courier productivity'],
      refs: [
        [2, 'Density helps only when added stops remain operationally feasible and successful.'],
        [2, 'Separate route density from courier productivity and disclose route, distance, parcel and service assumptions.'],
      ],
    },
    {
      id: 'le34-second-attempts-and-rto-cost-hypothetical',
      ch: 3,
      front: 'HYPOTHETICAL: for 100 parcels, 15 second attempts cost USD1.50 each and five RTO movements cost USD2.50 each. What is the added cost per original parcel?',
      back: 'Repeated attempts cost 15×1.50 = 22.50 and RTO costs 5×2.50 = 12.50, a total of 35.00, or USD0.35 per original parcel.',
      explanation: 'The total added cost is divided by the 100 original parcels. A return is not the same as a failed attempt.',
      example: 'HYPOTHETICAL: 100 parcels carry USD22.50 of repeated-attempt cost and USD12.50 of RTO cost, adding USD35.00 in all.',
      terms: ['Repeated attempt', 'RTO', 'Cost per original parcel'],
      refs: [
        [3, 'HYPOTHETICAL calculation: repeated-attempt cost=15×1.50=22.50; RTO cost=5×2.50=12.50; total=35.00.'],
        [3, 'For 100 parcels, 15 second attempts at USD1.50 cost USD22.50 and five RTO movements at USD2.50 cost USD12.50, adding USD35 or USD0.35 per original parcel.'],
      ],
    },
    {
      id: 'le34-kpis-need-explicit-denominators',
      ch: 3,
      front: 'Why do first-attempt success, delivery success and on-time delivery each need an explicit denominator?',
      back: 'First-attempt success uses first attempts, delivery success uses eligible shipments, and on-time delivery adds a service commitment. Without stated denominators the KPIs cannot be compared.',
      explanation: 'Cost per delivery can use delivered parcels or attempts, and route density differs from courier productivity.',
      example: 'Before comparing two carriers, the team defines eligible parcels, attempts, successful delivery, commitment, RTO event, COD reconciliation and reporting period.',
      terms: ['First-attempt success', 'Delivery success', 'On-time delivery'],
      refs: [
        [3, 'KPIs need explicit denominators. Cost per delivery can use delivered parcels or attempts; first-attempt success uses first attempts; delivery success uses eligible shipments; on-time delivery adds a service commitment;'],
        [3, 'Define eligible parcels, attempts, successful delivery, commitment, RTO event, COD reconciliation and reporting period before comparison.'],
      ],
    },
  ],
});

const L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m3-distribution-and-sales-channels',
  title: 'Express & Last-Mile Delivery: Distribution & Sales Channels',
  description: 'What a business-account proposal models and what must stay clear in digital and partner channels.',
  lessonId: 'le-m3-l5',
  lessonTitle: 'Distribution & Sales Channels',
  chapterIdPrefix: 'le-m3-l5',
  chapters: [
    'How Do Express Operators Acquire Merchants and Customers?',
    'How Do Tenders, Contracts and Account Pricing Work?',
    'How Do Platforms, Partners and Pickup Networks Support Growth?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le35-proposal-models-before-account-rates',
      ch: 2,
      front: 'What does a business-account proposal model before it offers account rates?',
      back: 'Origins, destinations, parcel profiles, peaks and SLA.',
      explanation: 'Business accounts stay when the carrier proves reliable total value and resolves recurring operating problems.',
      example: 'Large merchants may multi-source carriers, making lane-level performance and responsive account governance important.',
      terms: ['Account rate', 'SLA', 'Parcel profile'],
      refs: [
        [2, 'A proposal models origins, destinations, parcel profiles, peaks and SLA before offering account rates.'],
        [2, 'Business accounts stay when the carrier proves reliable total value and resolves recurring operating problems.'],
      ],
    },
    {
      id: 'le35-custody-and-accountability-in-partner-channels',
      ch: 3,
      front: 'Digital and partner channels extend access. What must still remain clear?',
      back: 'Custody and service accountability.',
      explanation: 'Digital and partner channels extend access and can consolidate flow. Adoption depends on convenient locations, merchant integration, recipient trust and dependable scan events.',
      example: 'A merchant plugin creates labels and transmits orders while a retail network receives drop-offs and returns.',
      terms: ['Partner channel', 'Custody', 'Merchant plugin'],
      refs: [
        [3, 'Digital and partner channels extend access and can consolidate flow, but custody and service accountability must remain clear.'],
        [3, 'A merchant plugin creates labels and transmits orders while a retail network receives drop-offs and returns.'],
      ],
    },
  ],
});

const L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m3-industry-ecosystem-and-stakeholders',
  title: 'Express & Last-Mile Delivery: Industry Ecosystem & Stakeholders',
  description: 'How the carrier coordinates an ecosystem of partners and what resilient operations need beyond technology.',
  lessonId: 'le-m3-l6',
  lessonTitle: 'Industry Ecosystem & Stakeholders',
  chapterIdPrefix: 'le-m3-l6',
  chapters: [
    'Who Participates in the Express Delivery Ecosystem?',
    'How Do Merchants, Carriers, Couriers and Platforms Collaborate?',
    'How Do Regulation, Workforce and Infrastructure Shape Delivery?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le36-airline-partner-and-one-tracking-journey',
      ch: 2,
      front: 'An airline provides gateway capacity and a local partner completes delivery. How does the customer still see one journey?',
      back: 'The integrator maintains one tracking journey, because the carrier coordinates the ecosystem and partner performance and shared information shape the customer promise.',
      explanation: 'The carrier increasingly coordinates an ecosystem of participants contributing order demand, pickup, transport, sorting, delivery, alternative handover and digital capability.',
      example: 'Domestic routes may use contracted line haul and local delivery while merchant platforms provide demand and order data.',
      terms: ['Ecosystem', 'Integrator', 'Tracking journey'],
      refs: [
        [2, 'An airline provides gateway capacity, a local partner completes delivery and the integrator maintains one tracking journey.'],
        [2, 'The carrier increasingly coordinates an ecosystem, so partner performance and shared information shape the customer promise.'],
      ],
    },
    {
      id: 'le36-scanning-outage-needs-offline-procedures',
      ch: 3,
      front: 'A scanning outage hits the network. What does the operation need in order to keep running safely?',
      back: 'Offline procedures, data recovery and controlled status reconciliation.',
      explanation: 'Network scale requires safe, compliant, trained and resilient operations, not technology alone.',
      example: 'Training should combine parcel handling, device use, road safety, customer interaction and exception coding.',
      terms: ['Business continuity', 'Offline procedure', 'Status reconciliation'],
      refs: [
        [3, 'A scanning outage needs offline procedures, data recovery and controlled status reconciliation.'],
        [3, 'Network scale requires safe, compliant, trained and resilient operations—not technology alone.'],
      ],
    },
  ],
});

export const LOGISTICS_EXPRESS_M03_DECKS: FlashcardDeckContent[] = [L1_DECK, L2_DECK, L3_DECK, L4_DECK, L5_DECK, L6_DECK];
