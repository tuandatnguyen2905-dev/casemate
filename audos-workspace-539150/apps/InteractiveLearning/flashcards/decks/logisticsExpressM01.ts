// Logistics Express Module 01, lessons 1 to 5 (apps/IndustryKnowledge/logisticsExpressModule01.tsx).
// Excerpts are verbatim from the chapter text the reader displays. No market figures or forecasts appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'logistics-express',
  industryLabel: 'Express & Last-Mile Delivery',
  moduleId: 'le-m01',
  moduleLabel: 'Module 01',
  moduleKey: 'LOGISTICS_EXPRESS_MODULE01',
  file: 'apps/IndustryKnowledge/logisticsExpressModule01.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const LE_M01_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m1-industry-definition-and-scope',
  title: 'Express & Last-Mile Delivery: Industry Definition & Scope',
  description: 'What the industry coordinates, how first, middle and last mile differ, and where express delivery stops and neighbouring services begin.',
  lessonId: 'le-m1-l1',
  lessonTitle: 'Industry Definition & Scope',
  chapterIdPrefix: 'le-m1-l1',
  chapters: [
    'What Is the Express & Last-Mile Delivery Industry?',
    'What Makes Express and Parcel Delivery Unique?',
    'Where Does Express Delivery Begin and End?',
    'Understanding Express and Last-Mile Services',
    "Who Are the Industry's Customers and Stakeholders?",
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le11-industry-coordinates-flow-and-information',
      ch: 1,
      front: 'What does the express and last-mile delivery industry coordinate, and over what span?',
      back: 'Physical parcel flow and shipment information, from the sender to a successful handover or return.',
      explanation: 'The scope covers collection, scanning, consolidation, interfacility transport, local delivery, proof, customer communication and reverse movement across CEP networks.',
      example: 'A merchant parcel enters through a scheduled pickup, crosses sort hubs and line haul, then reaches a courier route and recipient.',
      terms: ['Express delivery', 'Shipment information', 'CEP'],
      refs: [
        [1, 'The industry coordinates physical parcel flow and shipment information from sender to successful handover or return.'],
        [1, 'collection, scanning, consolidation, interfacility transport, local delivery, proof, customer communication and reverse movement across CEP networks.'],
      ],
    },
    {
      id: 'le11-first-mile-versus-line-haul',
      ch: 1,
      front: 'How does the first mile differ from line haul in a parcel network?',
      back: 'First mile is the collection from a sender into the carrier network. Line haul is the consolidated transport connecting hubs, gateways and depots.',
      explanation: 'First mile is where collection from a sender begins; line haul is the consolidated transport connecting hubs, gateways and depots.',
      example: 'A carrier may combine owned hubs with contracted transport, local couriers and merchant integrations.',
      terms: ['First mile', 'Line haul'],
      refs: [
        [1, 'Collection from a sender into the carrier network.'],
        [1, 'Consolidated transport connecting hubs, gateways and depots.'],
      ],
    },
    {
      id: 'le11-first-middle-last-mile-stages',
      ch: 3,
      front: 'How do the first mile, middle mile and last mile differ?',
      back: 'First mile is collection from a sender into the carrier network. Middle mile is consolidated movement between origin and destination facilities before final-mile dispatch. Last mile is the final movement from a local facility or collection point to the recipient.',
      explanation: 'First mile, middle mile and last mile are distinct, and none of them is warehouse fulfillment or freight forwarding.',
      example: 'A fulfillment center packs an order, an express operator collects the parcel, hubs and line haul move it, and a courier completes the final handover.',
      terms: ['First mile', 'Middle mile', 'Last mile'],
      refs: [
        [3, 'First mile, middle mile and last mile are distinct;'],
        [3, 'Consolidated movement between origin and destination facilities before final-mile dispatch.'],
        [3, 'Final movement from a local facility or collection point to the recipient.'],
      ],
    },
    {
      id: 'le11-fulfillment-versus-freight-forwarding',
      ch: 3,
      front: 'How do warehouse fulfillment and freight forwarding differ from express delivery?',
      back: 'Fulfillment stores and prepares merchant orders, and freight forwarding coordinates larger or international freight. They can connect to express delivery without becoming the same service.',
      explanation: 'Parcel delivery is not warehouse fulfillment, and express delivery is not freight forwarding.',
      example: 'A fulfillment center packs an order and an express operator then collects the parcel, so two different services connect at the handover.',
      terms: ['Fulfillment', 'Freight forwarding', 'Express carrier'],
      refs: [
        [3, 'Freight forwarding coordinates larger or international freight, while fulfillment stores and prepares merchant orders; these activities can connect without becoming the same service.'],
        [3, 'parcel delivery is not warehouse fulfillment, and express delivery is not freight forwarding.'],
      ],
    },
    {
      id: 'le11-segments-beyond-the-word-delivery',
      ch: 4,
      front: 'Which three factors create more useful industry segments than the word delivery alone?',
      back: 'Service promise, shipment profile and network responsibility.',
      explanation: 'The industry is segmented by speed, customer, geography and handover model, across postal, courier, express, parcel, fulfillment, freight and on-demand services.',
      example: 'Urgent replacement parts and low-priced marketplace parcels may share facilities but require different service and pricing logic.',
      terms: ['Segmentation', 'Service promise', 'Shipment profile'],
      refs: [
        [4, 'Service promise, shipment profile and network responsibility create more useful segments than the word delivery alone.'],
        [4, 'the boundaries among postal, courier, express, parcel, fulfillment, freight and on-demand services, segmented by speed, customer, geography and handover model.'],
      ],
    },
    {
      id: 'le11-urgent-parts-versus-marketplace-parcels',
      ch: 5,
      front: 'Urgent replacement parts and low-priced marketplace parcels use the same facilities. Why still treat them as different offers?',
      back: 'They may share facilities but require different service and pricing logic, so postal, courier, platform-linked, international express and on-demand offers should be compared separately.',
      explanation: 'The two parcel types may share facilities, yet the service and pricing logic differs, so the offers are compared separately.',
      example: 'A carrier compares a national postal offer, a domestic courier offer and an urban on-demand offer one by one instead of as a single delivery product.',
      terms: ['Service segmentation', 'Marketplace parcel'],
      refs: [
        [5, 'Urgent replacement parts and low-priced marketplace parcels may share facilities but require different service and pricing logic.'],
        [5, 'Compare national postal, domestic courier, platform-linked, international express and urban on-demand offers separately.'],
      ],
    },
  ],
});

const LE_M01_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m1-industry-history-and-development',
  title: 'Express & Last-Mile Delivery: Industry History & Development',
  description: 'How local couriers became synchronized networks and how e-commerce shifted work toward residential stops.',
  lessonId: 'le-m1-l2',
  lessonTitle: 'Industry History & Development',
  chapterIdPrefix: 'le-m1-l2',
  chapters: [
    'How Did Courier and Postal Delivery Begin?',
    'How Did Hub-and-Spoke Express Networks Develop?',
    'How Did E-Commerce and Digital Tracking Transform Delivery?',
    "How Has Vietnam's Express Delivery Industry Developed?",
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 4 has no card because it only repeats the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le12-scale-from-synchronized-networks',
      ch: 1,
      front: 'What made scale defensible as courier delivery grew into express networks?',
      back: 'Individual courier movements evolved into synchronized networks with repeatable service standards.',
      explanation: 'The progression runs from local document delivery to national and international networks using hubs, scheduled transport, shipment identifiers and partner coverage.',
      example: 'Postal infrastructure, private express networks and interprovincial routes now support broad parcel flows.',
      terms: ['Courier network', 'Service standard'],
      refs: [
        [1, 'Scale became defensible when individual courier movements evolved into synchronized networks with repeatable service standards.'],
        [1, 'the progression from local document delivery to national and international networks using hubs, scheduled transport, shipment identifiers and partner coverage.'],
      ],
    },
    {
      id: 'le12-hub-and-spoke-consolidates-origins',
      ch: 2,
      front: 'What does hub-and-spoke sorting do before parcels are routed to destination regions?',
      back: 'It consolidates many origins before routing parcels toward destination regions.',
      explanation: 'The progression from local document delivery to national and international networks uses hubs, scheduled transport, shipment identifiers and partner coverage.',
      example: 'Hub-and-spoke sorting consolidates many origins before routing parcels toward destination regions.',
      terms: ['Hub and spoke', 'Consolidation'],
      refs: [
        [2, 'Hub-and-spoke sorting consolidates many origins before routing parcels toward destination regions.'],
      ],
    },
    {
      id: 'le12-marketplace-feed-versus-residential-stop',
      ch: 3,
      front: 'A marketplace feed automates labels and forecasts. Why does a one-parcel residential stop still cost a lot?',
      back: 'Automation helps labels and forecasts, but a one-parcel residential stop still carries substantial final-mile cost.',
      explanation: 'E-commerce expanded parcel demand but shifted work toward more fragmented residential stops and stronger visibility expectations.',
      example: 'A high-volume marketplace feed can automate labels and forecasts, yet a one-parcel residential stop still carries substantial final-mile cost.',
      terms: ['Residential stop', 'Final-mile cost', 'Marketplace feed'],
      refs: [
        [3, 'A high-volume marketplace feed can automate labels and forecasts, yet a one-parcel residential stop still carries substantial final-mile cost.'],
        [3, 'E-commerce expanded parcel demand but shifted work toward more fragmented residential stops and stronger visibility expectations.'],
      ],
    },
  ],
});

const LE_M01_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m1-global-market-overview',
  title: 'Express & Last-Mile Delivery: Global Market Overview',
  description: 'Keeping market measures apart: regional opportunity versus carrier profit, parcels versus deliveries, and density versus cost to serve.',
  lessonId: 'le-m1-l3',
  lessonTitle: 'Global Market Overview',
  chapterIdPrefix: 'le-m1-l3',
  chapters: [
    'How Is the Global Express and Parcel Market Structured?',
    'How Are Express and Parcel Markets Measured?',
    'Which Regions and Customer Segments Drive Demand?',
    'Who Are the Major Global Express and Parcel Participants?',
    'How Do Parcel Demand and Network Economics Interact?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapters 3 and 4 have no card because they only repeat the lesson\'s shared base text plus a market statistic and a short dimension list.',
  ],
  cards: [
    {
      id: 'le13-regional-opportunity-kept-separate',
      ch: 1,
      front: 'The global express-and-parcels market is growing. What must regional opportunity be kept separate from?',
      back: 'Last-mile-only revenue and carrier profit.',
      explanation: 'A growing market does not by itself show how much of the revenue sits in last-mile delivery or how much profit carriers make.',
      example: 'Regional opportunity in a growing global market is kept separate from last-mile-only revenue and carrier profit.',
      terms: ['Express and parcels market', 'Regional opportunity', 'Carrier profit'],
      refs: [
        [1, 'The broader global express-and-parcels market is growing, but regional opportunity must be separated from last-mile-only revenue and carrier profit.'],
      ],
    },
    {
      id: 'le13-three-stops-versus-three-parcels',
      ch: 2,
      front: 'A courier delivers three parcels to one building. How many stops and parcels are recorded, and what does a second attempt add?',
      back: 'One stop but three parcels. A second attempt adds cost without creating a new customer order.',
      explanation: 'Market and operating measures describe different populations: one order can create several shipments or parcels, one stop can deliver several parcels, and a returned parcel can involve several attempts.',
      example: 'A courier delivering three parcels to one building records one stop but three parcels; a second attempt adds cost without creating a new customer order.',
      terms: ['Delivery stop', 'Parcel', 'Delivery attempt'],
      refs: [
        [2, 'A courier delivering three parcels to one building records one stop but three parcels; a second attempt adds cost without creating a new customer order.'],
        [2, 'One order can create multiple shipments or parcels; one stop can deliver several parcels; a returned parcel can involve several attempts.'],
      ],
    },
    {
      id: 'le13-handled-delivered-capacity-not-interchangeable',
      ch: 2,
      front: 'Which pairs of measures are not interchangeable: parcels handled, on-time completion and network capacity?',
      back: 'Parcels handled are not parcels successfully delivered, on-time completion is not delivery completion, and network capacity is not utilization.',
      explanation: 'Market and operating measures describe different populations, so parcels handled, delivery completion and capacity are separate measures.',
      example: 'State operator, route, parcel class, eligible population, period and event definitions before comparing volume or service quality.',
      terms: ['Parcels handled', 'Delivery completion', 'Utilization'],
      refs: [
        [2, 'Parcels handled are not parcels successfully delivered, on-time completion is not delivery completion, and network capacity is not utilization.'],
      ],
    },
    {
      id: 'le13-route-density-versus-cost-to-serve',
      ch: 5,
      front: 'How do route density and cost to serve differ as ideas in parcel economics?',
      back: 'Route density is the concentration of parcels or successful stops within a route area. Cost to serve is the resources and cost attributable to a shipment, customer, route or service.',
      explanation: 'Parcel growth creates value only when network density, delivery success and utilization keep marginal cost under control.',
      example: 'Dense urban zones can support productive routes, while dispersed areas and poor address data require different service designs.',
      terms: ['Route density', 'Cost to serve', 'Marginal cost'],
      refs: [
        [5, 'Concentration of parcels or successful stops within a route area.'],
        [5, 'Resources and cost attributable to a shipment, customer, route or service.'],
        [5, 'Parcel growth creates value only when network density, delivery success and utilization keep marginal cost under control.'],
      ],
    },
  ],
});

const LE_M01_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m1-vietnam-market-overview',
  title: 'Express & Last-Mile Delivery: Vietnam Market Overview',
  description: 'How to read Vietnam\'s e-commerce parcel demand and operator comparisons without mixing up the measures.',
  lessonId: 'le-m1-l4',
  lessonTitle: 'Vietnam Market Overview',
  chapterIdPrefix: 'le-m1-l4',
  chapters: [
    "What Does Vietnam's Express Delivery Market Look Like?",
    'How Do Urban and Interprovincial Parcel Networks Operate?',
    'Who Are the Key Express and Last-Mile Participants in Vietnam?',
    'How Do Vietnam E-Commerce Parcels Move Through the Network?',
    "What Opportunities and Constraints Shape Vietnam's Delivery Industry?",
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapters 2 and 4 have no card because they only repeat the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le14-value-parcels-and-revenue-differ',
      ch: 1,
      front: 'Vietnam\'s e-commerce base supports substantial parcel demand. Which three measures must not be treated as the same?',
      back: 'Value, parcel counts and carrier revenue are different measures.',
      explanation: 'Online commerce, merchant participation, postal parcel flows, cash collection and returns feed domestic delivery demand, but each measure counts something different.',
      example: 'Value, parcel counts and carrier revenue are kept as separate measures when judging domestic delivery demand.',
      terms: ['E-commerce value', 'Parcel count', 'Carrier revenue'],
      refs: [
        [1, 'Vietnam’s e-commerce base supports substantial parcel demand, but value, parcel counts and carrier revenue are different measures.'],
        [1, 'online commerce, merchant participation, postal parcel flows, cash collection and returns that feed domestic delivery demand.'],
      ],
    },
    {
      id: 'le14-no-single-universal-ranking',
      ch: 3,
      front: 'How should competition among Vietnam\'s parcel operators be judged instead of by one universal ranking?',
      back: 'It combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.',
      explanation: 'No single ranking captures route conditions, traffic, geography, parcel safety and service measures, which all shape the domestic market.',
      example: 'Operators, route conditions, traffic, geography, parcel safety and service measures all shape the domestic market.',
      terms: ['Coverage', 'Merchant integration', 'Delivery quality'],
      refs: [
        [3, 'Vietnam competition combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.'],
        [3, 'the operators, route conditions, traffic, geography, parcel safety and service measures shaping the domestic market.'],
      ],
    },
    {
      id: 'le14-route-sample-is-not-the-whole-market',
      ch: 5,
      front: 'A published assessment covers a sample of routes and major operators. Why not treat it as the whole market?',
      back: 'The route sample is not the whole market, so its results describe only the evaluated operators and sampled routes.',
      explanation: 'Vietnam competition combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.',
      example: 'The evaluated operators represented a large share of volume and revenue, but the route sample is not the whole market.',
      terms: ['Route sample', 'Market coverage'],
      refs: [
        [5, 'the route sample is not the whole market.'],
        [5, 'Vietnam competition combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.'],
      ],
    },
  ],
});

const LE_M01_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'logistics-express-m1-industry-drivers-and-external-factors',
  title: 'Express & Last-Mile Delivery: Industry Drivers & External Factors',
  description: 'How demand peaks and technology limits shape parcel networks, and which local conditions need local designs.',
  lessonId: 'le-m1-l5',
  lessonTitle: 'Industry Drivers & External Factors',
  chapterIdPrefix: 'le-m1-l5',
  chapters: [
    'How Do E-Commerce and Economic Conditions Affect Parcel Demand?',
    'Why Do Postal, Transport, Safety and Data Rules Matter?',
    'How Are Digital Technologies Transforming Express Delivery?',
    "How Are Merchants' and Recipients' Expectations Changing?",
    'What External Risks and Opportunities Shape Parcel Networks?',
  ].map(ch),
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapters 1 and 2 have no card because they only repeat the lesson\'s shared base text plus a short dimension list.',
  ],
  cards: [
    {
      id: 'le15-campaign-spike-needs-different-priorities',
      ch: 3,
      front: 'A sales campaign creates a short capacity spike. What else must the network handle differently?',
      back: 'Economy and time-definite parcels require different handling priorities.',
      explanation: 'Merchant forecasts, marketplace events and province-level flows should drive labor, line-haul and courier planning.',
      example: 'Merchant forecasts, marketplace events and province-level flows drive labor, line-haul and courier planning.',
      terms: ['Capacity spike', 'Time-definite parcel', 'Economy parcel'],
      refs: [
        [3, 'A sales campaign can create a short capacity spike while economy and time-definite parcels require different handling priorities.'],
        [3, 'Merchant forecasts, marketplace events and province-level flows should drive labor, line-haul and courier planning.'],
      ],
    },
    {
      id: 'le15-route-optimizer-limits',
      ch: 4,
      front: 'A carrier installs a route optimizer. Which problems can it not correct without operating controls?',
      back: 'A missing address, an overloaded depot or an unavailable recipient.',
      explanation: 'Technology improves delivery only when accurate data, physical capacity, local access and trained execution work together.',
      example: 'A route optimizer cannot correct a missing address, an overloaded depot or an unavailable recipient without operating controls.',
      terms: ['Route optimizer', 'Operating controls'],
      refs: [
        [4, 'A route optimizer cannot correct a missing address, an overloaded depot or an unavailable recipient without operating controls.'],
        [4, 'Technology improves delivery only when accurate data, physical capacity, local access and trained execution work together.'],
      ],
    },
    {
      id: 'le15-local-conditions-need-local-designs',
      ch: 5,
      front: 'Which urban conditions in Vietnam require locally specific delivery designs?',
      back: 'Motorcycle-heavy urban delivery, congestion, building access and uneven provincial density.',
      explanation: 'The drivers include routing, sortation, tracking, road constraints, labor, data, safety, vehicle choices and lower-emission delivery design.',
      example: 'Motorcycle-heavy urban delivery, congestion, building access and uneven provincial density require locally specific designs.',
      terms: ['Building access', 'Provincial density', 'Urban delivery'],
      refs: [
        [5, 'Motorcycle-heavy urban delivery, congestion, building access and uneven provincial density require locally specific designs.'],
        [5, 'routing, sortation, tracking, road constraints, labor, data, safety, vehicle choices and lower-emission delivery design.'],
      ],
    },
  ],
});

export const LOGISTICS_EXPRESS_M01_DECKS: FlashcardDeckContent[] = [LE_M01_L1_DECK, LE_M01_L2_DECK, LE_M01_L3_DECK, LE_M01_L4_DECK, LE_M01_L5_DECK];
