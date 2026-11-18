// Logistics Express Module 02, lessons 1 to 6 (apps/IndustryKnowledge/logisticsExpressModule02.tsx).
// Excerpts are verbatim from the chapter text the reader displays. No market figures or forecasts appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'logistics-express',
  industryLabel: 'Express & Last-Mile Delivery',
  moduleId: 'le-m02',
  moduleLabel: 'Module 02',
  moduleKey: 'LOGISTICS_EXPRESS_MODULE02',
  file: 'apps/IndustryKnowledge/logisticsExpressModule02.tsx',
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
  deckId: 'logistics-express-m2-value-chain-overview',
  title: 'Express & Last-Mile Delivery: Value Chain Overview',
  description: 'One delivery promise across many handoffs, who takes part in a parcel journey, and why COD cash is not operator revenue.',
  lessonId: 'le-m2-l1',
  lessonTitle: 'Value Chain Overview',
  chapterIdPrefix: 'le-m2-l1',
  chapters: [
    'How Does the Express Delivery Value Chain Work?',
    'Who Participates in an End-to-End Parcel Journey?',
    'How Do Parcels, Data, Payments and Cash Flow?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card.',
  ],
  cards: [
    {
      id: 'le21-one-promise-across-handoffs',
      ch: 1,
      front: 'Why can a delay or data error at a single handoff affect the whole parcel journey?',
      back: 'Every stage shares one delivery promise, so a delay or data error at one handoff can propagate through the network.',
      explanation: 'The value chain connects the roles of merchants, platforms, carriers, postal operators, transport partners, pickup networks, technology and recipients.',
      example: 'A platform order may involve a merchant, collection driver, two hubs, trunk carrier, destination depot and final courier.',
      terms: ['Value chain', 'Handoff', 'Delivery promise'],
      refs: [
        [1, 'Every stage shares one delivery promise, so a delay or data error at one handoff can propagate through the network.'],
        [1, 'the connected roles of merchants, platforms, carriers, postal operators, transport partners, pickup networks, technology and recipients.'],
      ],
    },
    {
      id: 'le21-platform-order-participants',
      ch: 2,
      front: 'Which parties may a single platform order involve between the merchant and the recipient?',
      back: 'A merchant, collection driver, two hubs, trunk carrier, destination depot and final courier.',
      explanation: 'In Vietnam, owned facilities, franchisees, contractors and marketplace integrations may coexist in one domestic journey.',
      example: 'A marketplace order is collected from the merchant, passes two hubs and a trunk carrier, and is delivered by a final courier from the destination depot.',
      terms: ['End-to-end journey', 'Destination depot', 'Trunk carrier'],
      refs: [
        [2, 'A platform order may involve a merchant, collection driver, two hubs, trunk carrier, destination depot and final courier.'],
        [2, 'Owned facilities, franchisees, contractors and marketplace integrations may coexist in one domestic journey.'],
      ],
    },
    {
      id: 'le21-cod-cash-is-not-operator-revenue',
      ch: 3,
      front: 'A courier collects COD for a merchant. Is that cash the operator\'s revenue?',
      back: 'No. COD collected on behalf of a merchant is a liability or settlement flow, not automatically delivery-company revenue. The operator recognizes only applicable service fees.',
      explanation: 'Shipment, customer order, parcel, delivery stop, service revenue and COD cash are different operational and financial objects.',
      example: 'A courier collects COD, records proof of delivery and remits the merchant amount after agreed reconciliation while the operator recognizes only applicable service fees.',
      terms: ['COD', 'Remittance', 'Service fee'],
      refs: [
        [3, 'COD collected on behalf of a merchant is a liability or settlement flow, not automatically delivery-company revenue.'],
        [3, 'Shipment, customer order, parcel, delivery stop, service revenue and COD cash are different operational and financial objects.'],
        [3, 'A courier collects COD, records proof of delivery and remits the merchant amount after agreed reconciliation while the operator recognizes only applicable service fees.'],
      ],
    },
  ],
});

const L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m2-upstream-activities',
  title: 'Express & Last-Mile Delivery: Upstream Activities',
  description: 'Shipment preparation, first-mile collection and capacity planning before volume arrives.',
  lessonId: 'le-m2-l2',
  lessonTitle: 'Upstream Activities',
  chapterIdPrefix: 'le-m2-l2',
  chapters: [
    'How Are Merchants and Shipments Onboarded?',
    'How Do Pickup Scheduling and First-Mile Collection Work?',
    'How Are Labels, Shipment Data and Network Capacity Prepared?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card.',
  ],
  cards: [
    {
      id: 'le22-clean-data-and-predictable-collection',
      ch: 1,
      front: 'What do clean shipment data and predictable collection prevent further along the network?',
      back: 'Downstream sorting, routing and delivery exceptions.',
      explanation: 'Upstream work covers creating a shipment, validating sender and recipient information, selecting service, labeling, packaging and transferring parcels into the network.',
      example: 'Merchant tools should support local address conventions, phone-based contact, COD requirements and return instructions.',
      terms: ['Shipment data', 'First-mile collection', 'Exception'],
      refs: [
        [1, 'Clean shipment data and predictable collection prevent downstream sorting, routing and delivery exceptions.'],
        [1, 'creating a shipment, validating sender and recipient information, selecting service, labeling, packaging and transferring parcels into the network.'],
      ],
    },
    {
      id: 'le22-merchant-pickup-manifest-consolidation',
      ch: 2,
      front: 'A high-volume merchant has ready parcels. How does it hand them to the network?',
      back: 'It closes a pickup manifest and consolidates ready parcels into a scheduled vehicle collection.',
      explanation: 'Clean shipment data and predictable collection prevent downstream sorting, routing and delivery exceptions.',
      example: 'A high-volume merchant closes a pickup manifest and consolidates ready parcels into a scheduled vehicle collection.',
      terms: ['Pickup manifest', 'Scheduled collection'],
      refs: [
        [2, 'A high-volume merchant closes a pickup manifest and consolidates ready parcels into a scheduled vehicle collection.'],
      ],
    },
    {
      id: 'le22-position-capacity-before-volume',
      ch: 3,
      front: 'Why must network capacity be positioned before volume arrives, and what must be avoided?',
      back: 'Capacity must be in place before volume arrives while avoiding idle assets in quieter periods.',
      explanation: 'Planning forecasts parcels by origin, destination, day and service, then allocates sortation, vehicles, departures, depot labor and couriers.',
      example: 'A campaign plan adds temporary shifts and trunk departures while protecting cutoff priority for time-definite shipments.',
      terms: ['Capacity allocation', 'Volume forecast', 'Cutoff priority'],
      refs: [
        [3, 'Capacity must be positioned before volume arrives while avoiding idle assets in quieter periods.'],
        [3, 'forecasting parcels by origin, destination, day and service, then allocating sortation, vehicles, departures, depot labor and couriers.'],
        [3, 'A campaign plan adds temporary shifts and trunk departures while protecting cutoff priority for time-definite shipments.'],
      ],
    },
  ],
});

const L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m2-midstream-activities',
  title: 'Express & Last-Mile Delivery: Midstream Activities',
  description: 'Hub throughput, exception handling and how destination depots turn network flow into routes.',
  lessonId: 'le-m2-l3',
  lessonTitle: 'Midstream Activities',
  chapterIdPrefix: 'le-m2-l3',
  chapters: [
    'How Do Sorting Centers, Hubs and Depots Operate?',
    'How Does Line-Haul Transport Connect the Network?',
    'How Are Tracking, Routing and Operational Exceptions Managed?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le23-throughput-needs-accurate-routing',
      ch: 1,
      front: 'When does sorting-hub throughput actually matter?',
      back: 'Only when parcels are routed accurately and connect to the right departure.',
      explanation: 'Interprovincial reliability depends on synchronized sort cutoffs, road schedules and destination intake capacity.',
      example: 'An unreadable label goes to an exception lane rather than contaminating automated destination sortation.',
      terms: ['Throughput', 'Departure', 'Sort cutoff'],
      refs: [
        [1, 'Throughput matters only when parcels are routed accurately and connect to the right departure.'],
        [1, 'Interprovincial reliability depends on synchronized sort cutoffs, road schedules and destination intake capacity.'],
      ],
    },
    {
      id: 'le23-unreadable-label-exception-lane',
      ch: 1,
      front: 'A parcel arrives at an automated hub with an unreadable label. What should happen to it?',
      back: 'It goes to an exception lane rather than contaminating automated destination sortation.',
      explanation: 'Hub work includes receiving, scanning, destination sorting, exception handling, vehicle loading and scheduled movement between facilities.',
      example: 'An unreadable label goes to an exception lane rather than contaminating automated destination sortation.',
      terms: ['Exception lane', 'Destination sortation'],
      refs: [
        [1, 'An unreadable label goes to an exception lane rather than contaminating automated destination sortation.'],
        [1, 'receiving, scanning, destination sorting, exception handling, vehicle loading and scheduled movement between facilities.'],
      ],
    },
    {
      id: 'le23-destination-depot-executable-routes',
      ch: 3,
      front: 'What does the destination depot convert network flow into, and what can erase upstream time gains?',
      back: 'It converts network flow into executable routes; poor sequencing can erase upstream time gains.',
      explanation: 'Depot work includes sorting arrivals by delivery zone, driver and promise, resolving exceptions, sequencing stops and loading parcels for retrieval.',
      example: 'A route is rebalanced when parcel volume exceeds a courier’s vehicle or time capacity.',
      terms: ['Destination depot', 'Stop sequence', 'Route rebalancing'],
      refs: [
        [3, 'The destination depot converts network flow into executable routes; poor sequencing can erase upstream time gains.'],
        [3, 'A route is rebalanced when parcel volume exceeds a courier’s vehicle or time capacity.'],
      ],
    },
  ],
});

const L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m2-downstream-activities',
  title: 'Express & Last-Mile Delivery: Downstream Activities',
  description: 'The handover moment, proof of delivery and what failed attempts and returns add to the work.',
  lessonId: 'le-m2-l4',
  lessonTitle: 'Downstream Activities',
  chapterIdPrefix: 'le-m2-l4',
  chapters: [
    'How Are Parcels Dispatched for Last-Mile Delivery?',
    'How Do Customer Handover and Proof of Delivery Work?',
    'How Are Failed Delivery, Redelivery, RTO and Returns Managed?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le24-handover-moment-depends-on-three-things',
      ch: 2,
      front: 'What does the most visible customer moment in delivery depend on?',
      back: 'Accurate communication, secure handover and trustworthy completion records.',
      explanation: 'Handover can happen at a doorstep, office, reception, locker or pickup point, with recipient verification, proof and exception management.',
      example: 'Phone contact and flexible local navigation help execution, but proof and privacy controls remain essential.',
      terms: ['Handover', 'Recipient verification', 'Completion record'],
      refs: [
        [2, 'The most visible customer moment depends on accurate communication, secure handover and trustworthy completion records.'],
        [2, 'doorstep, office, reception, locker or pickup-point handover with recipient verification, proof and exception management.'],
      ],
    },
    {
      id: 'le24-proof-of-delivery-record',
      ch: 2,
      front: 'What is proof of delivery, and what might a courier record at an authorized location?',
      back: 'Proof of delivery is a record confirming handover to a recipient or authorized location. A courier may record a compliant photograph and time stamp, then close the shipment milestone.',
      explanation: 'Proof supports the customer moment, so the record has to be trustworthy and compliant.',
      example: 'A courier records an authorized location with a compliant photograph and time stamp, then closes the shipment milestone.',
      terms: ['Proof of delivery', 'Authorized location', 'Shipment milestone'],
      refs: [
        [2, 'Record confirming handover to a recipient or authorized location.'],
        [2, 'A courier records an authorized location with a compliant photograph and time stamp, then closes the shipment milestone.'],
      ],
    },
    {
      id: 'le24-redirect-avoids-second-attempt',
      ch: 3,
      front: 'A recipient redirects an eligible parcel to a pickup point. What does this avoid?',
      back: 'A second residential attempt, which would add extra handling and travel.',
      explanation: 'Failed attempts and returns create extra handling and travel, making prevention and clear disposition rules essential.',
      example: 'A recipient redirects an eligible parcel to a pickup point, avoiding a second residential attempt.',
      terms: ['Redirection', 'Failed attempt', 'Pickup point'],
      refs: [
        [3, 'A recipient redirects an eligible parcel to a pickup point, avoiding a second residential attempt.'],
        [3, 'Failed attempts and returns create extra handling and travel, making prevention and clear disposition rules essential.'],
      ],
    },
  ],
});

const L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m2-inputs-outputs-and-value-creation',
  title: 'Express & Last-Mile Delivery: Inputs, Outputs & Value Creation',
  description: 'How assets, people and information turn into delivered parcels, and what density and first-attempt success change.',
  lessonId: 'le-m2-l5',
  lessonTitle: 'Inputs, Outputs & Value Creation',
  chapterIdPrefix: 'le-m2-l5',
  chapters: [
    'What Resources Are Required to Run a Parcel Network?',
    'Where Are Delivery Costs, Risks and Service Failures Generated?',
    'How Do Express Operators Create Value for Merchants and Recipients?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card.',
  ],
  cards: [
    {
      id: 'le25-productivity-is-coordination',
      ch: 1,
      front: 'What does productivity in a parcel network reflect?',
      back: 'The coordination of assets, people and information, not the fleet or the parcel count alone.',
      explanation: 'Physical, human and digital inputs are transformed into collected, sorted, transferred, delivered or returned parcels and service outcomes.',
      example: 'A hub can have spare conveyor capacity while the final-mile depot lacks couriers, limiting end-to-end output.',
      terms: ['Productivity', 'Inputs and outputs', 'End-to-end output'],
      refs: [
        [1, 'Productivity reflects coordination of assets, people and information—not the fleet or parcel count alone.'],
        [1, 'A hub can have spare conveyor capacity while the final-mile depot lacks couriers, limiting end-to-end output.'],
      ],
    },
    {
      id: 'le25-density-and-success-cover-cost',
      ch: 2,
      front: 'What determines whether parcel revenue covers route, network and exception cost?',
      back: 'Density and delivery success.',
      explanation: 'Cost drivers are labor, transport, facilities, technology, claims and support, compared with charges by parcel, weight, dimensions, zone and service.',
      example: 'Granular route and customer economics help distinguish productive marketplace volume from loss-making coverage.',
      terms: ['Density', 'Delivery success', 'Cost per parcel'],
      refs: [
        [2, 'Density and delivery success determine whether parcel revenue covers route, network and exception cost.'],
        [2, 'labor, transport, facilities, technology, claims and support compared with charges by parcel, weight, dimensions, zone and service.'],
      ],
    },
    {
      id: 'le25-first-attempt-success-defined',
      ch: 3,
      front: 'What does first-attempt success measure, and under what condition?',
      back: 'The share of deliveries completed on the first visit, under a defined method and period.',
      explanation: 'Density and delivery success determine whether parcel revenue covers route, network and exception cost.',
      example: 'Granular route and customer economics help distinguish productive marketplace volume from loss-making coverage.',
      terms: ['First-attempt success', 'Delivery success'],
      refs: [
        [3, 'Share of deliveries completed on the first visit under a defined method and period.'],
        [3, 'Density and delivery success determine whether parcel revenue covers route, network and exception cost.'],
      ],
    },
  ],
});

const L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m2-global-vs-local-value-chain',
  title: 'Express & Last-Mile Delivery: Global vs. Local Value Chain',
  description: 'What cross-border reliability depends on and how data exchange supports Vietnam\'s local parcel network.',
  lessonId: 'le-m2-l6',
  lessonTitle: 'Global vs. Local Value Chain',
  chapterIdPrefix: 'le-m2-l6',
  chapters: [
    'How Do International Express Networks Operate?',
    "How Does Vietnam's Parcel Delivery Value Chain Work?",
    'How Do Urban, Rural and Infrastructure Conditions Affect Competitiveness?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter in this lesson has at least one card.',
  ],
  cards: [
    {
      id: 'le26-cross-border-reliability-depends-on',
      ch: 1,
      front: 'What does cross-border express reliability depend on, as much as transport speed?',
      back: 'Compliant data and coordinated handoffs.',
      explanation: 'International delivery covers collection, gateways, security, customs declarations, duties and taxes, line haul and destination-country delivery.',
      example: 'An express document moves through an origin gateway and air network before customs and local courier handover.',
      terms: ['Gateway', 'Customs declaration', 'Handoff'],
      refs: [
        [1, 'Cross-border reliability depends on compliant data and coordinated handoffs as much as transport speed.'],
        [1, 'An express document moves through an origin gateway and air network before customs and local courier handover.'],
      ],
    },
    {
      id: 'le26-order-apis-across-participants',
      ch: 2,
      front: 'How can order APIs help the participants in Vietnam\'s local parcel network?',
      back: 'They can improve labels, forecasts, pickup manifests, tracking and return instructions across participants.',
      explanation: 'Vietnam can convert demand growth into sustainable service through stronger data exchange, density and local execution.',
      example: 'A platform shares order data so that labels, pickup manifests and return instructions reach the merchant, depot and courier in the same form.',
      terms: ['Order API', 'Data exchange', 'Pickup manifest'],
      refs: [
        [2, 'Order APIs can improve labels, forecasts, pickup manifests, tracking and return instructions across participants.'],
        [2, 'Vietnam can convert demand growth into sustainable service through stronger data exchange, density and local execution.'],
      ],
    },
    {
      id: 'le26-matched-definitions-for-comparing-operators',
      ch: 3,
      front: 'What must be matched before two operators\' delivery results can be compared?',
      back: 'Parcel, route, time and quality definitions.',
      explanation: 'The route assessment shows why operator comparisons need these matched definitions.',
      example: 'Operator comparisons use matched parcel, route, time and quality definitions.',
      terms: ['Operator comparison', 'Quality definition'],
      refs: [
        [3, 'The Ministry route assessment shows why operator comparisons need matched parcel, route, time and quality definitions.'],
      ],
    },
  ],
});

export const LOGISTICS_EXPRESS_M02_DECKS: FlashcardDeckContent[] = [L1_DECK, L2_DECK, L3_DECK, L4_DECK, L5_DECK, L6_DECK];
