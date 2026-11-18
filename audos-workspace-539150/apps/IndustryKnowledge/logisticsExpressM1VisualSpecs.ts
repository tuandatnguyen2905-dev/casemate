import type { LogisticsExpressChapterVisual } from './logisticsExpressVisualSpecs';

/** Chapter-specific Learning Visuals for Express & Last-Mile Delivery Module 01, keyed by visualKind. */
export const LOGISTICS_EXPRESS_M1_VISUALS: Record<string, LogisticsExpressChapterVisual> = {
  'logistics-express-m1-1': {
    heading: 'A parcel and its shipment record travel together from pickup to proof of delivery',
    intro: 'A merchant parcel enters through a scheduled pickup, crosses sort hubs and line haul, then reaches a courier route and recipient. Scans and proof keep the information in step with the physical movement.',
    spec: {
      layout: 'flow', title: '01 What Is the Express & Last-Mile Delivery Industry?', kicker: '',
      steps: [
        { label: 'First mile', detail: 'Collection from a sender into the carrier network', owner: 'Merchant and carrier' },
        { label: 'Sort hub', detail: 'Scanning and consolidation of parcels', owner: 'Carrier hub' },
        { label: 'Line haul', detail: 'Consolidated transport connecting hubs, gateways and depots', owner: 'Owned or contracted transport' },
        { label: 'Courier route', detail: 'Local delivery to the recipient', owner: 'Local courier' },
        { label: 'Proof of delivery', detail: 'Record confirming handover to a recipient or authorized location', kind: 'outcome', owner: 'Recipient' },
      ],
      loop: 'Customer communication runs alongside every step, and reverse movement brings returns back through the network.',
      note: 'A carrier may combine owned hubs with contracted transport, local couriers and merchant integrations.',
      takeaway: 'The industry coordinates physical parcel flow and shipment information from sender to successful handover or return.',
    },
  },
  'logistics-express-m1-2': {
    heading: 'Sortation, last-mile handover and returns are the operations that set parcel networks apart',
    intro: 'CEP networks scan and consolidate many small parcels, hand each one over at a final destination, and carry reverse movement back through the same network.',
    spec: {
      layout: 'taxonomy', title: '02 What Makes Express and Parcel Delivery Unique?', kicker: '',
      root: 'Distinctive work in a CEP network', rootDetail: 'Three operations studied together, not in sequence',
      groups: [
        { label: 'Sortation', detail: 'Many parcels scanned and consolidated by destination', items: ['Scanning', 'Consolidation', 'Interfacility transport'] },
        { label: 'Last mile', detail: 'Final movement from a local facility or collection point to the recipient', items: ['Local delivery', 'Proof', 'Customer communication'] },
        { label: 'Returns', detail: 'Reverse movement back through the network', items: ['Return handover', 'Return scans'] },
      ],
      note: 'The same merchant parcel can pass through all three: sort hubs, a courier route and, if it comes back, reverse movement.',
      takeaway: 'Parcel networks coordinate physical flow and shipment information through sortation, last-mile handover and returns, not just transport.',
    },
  },
  'logistics-express-m1-3': {
    heading: 'Express delivery covers three miles; fulfillment and freight forwarding sit outside its boundary',
    intro: 'Express delivery links collection, sorting, line haul, destination preparation and final handover. Freight forwarding coordinates larger or international freight, while fulfillment stores and prepares merchant orders.',
    spec: {
      layout: 'taxonomy', title: '03 Where Does Express Delivery Begin and End?', kicker: '',
      root: 'Activities around a parcel journey', rootDetail: 'Connected activities that are not the same service',
      groups: [
        { label: 'First mile', detail: 'Collection from a sender into the carrier network' },
        { label: 'Middle mile', detail: 'Consolidated movement between origin and destination facilities before final-mile dispatch' },
        { label: 'Last mile', detail: 'Final movement from a local facility or collection point to the recipient' },
        { label: 'Outside: fulfillment', detail: 'Stores and prepares merchant orders before collection' },
        { label: 'Outside: freight forwarding', detail: 'Coordinates larger or international freight' },
      ],
      note: 'Example: a fulfillment center packs an order, an express operator collects it, hubs and line haul move it, and a courier hands it over. Define which entity owns each scan, parcel, cash, service promise, exception and customer relationship.',
      takeaway: 'First mile, middle mile and last mile are distinct; parcel delivery is not warehouse fulfillment, and express delivery is not freight forwarding.',
    },
  },
  'logistics-express-m1-4': {
    heading: 'Two parcels in the same facility can need different service and pricing logic',
    intro: 'Urgent replacement parts and low-priced marketplace parcels may share facilities but require different service and pricing logic. Segmenting by speed, customer, geography and handover model shows why.',
    spec: {
      layout: 'compare', title: '04 Understanding Express and Last-Mile Services', kicker: '',
      leftTitle: 'Urgent replacement parts (B2B)', rightTitle: 'Low-priced marketplace parcel',
      rows: [
        { label: 'Shipment profile', a: 'Time-critical business item', b: 'Low-value consumer order' },
        { label: 'Customer', a: 'Business shipper and business recipient', b: 'Marketplace merchant shipping to a consumer' },
        { label: 'What the price pays for', a: 'Speed of the service promise', b: 'Low cost per parcel' },
        { label: 'Network', a: 'Domestic express facilities', b: 'Often the same domestic facilities' },
      ],
      note: 'Compare national postal, domestic courier, platform-linked, international express and urban on-demand offers separately.',
      takeaway: 'Service promise, shipment profile and network responsibility create more useful segments than the word delivery alone.',
    },
  },
  'logistics-express-m1-5': {
    heading: 'Customers differ by who ships to whom and whether the parcel crosses a border',
    intro: 'The chapter segments delivery customers by speed, customer, geography and handover model. International express and B2C and C2C flows are separate customer relationships with different needs.',
    spec: {
      layout: 'taxonomy', title: "05 Who Are the Industry's Customers and Stakeholders?", kicker: '',
      root: 'Customers and stakeholders', rootDetail: 'Segments to analyse separately',
      groups: [
        { label: 'B2C', detail: 'Merchants and marketplaces shipping to consumers', items: ['Merchants', 'Recipients'] },
        { label: 'C2C', detail: 'Individuals sending to other individuals' },
        { label: 'International express', detail: 'Cross-border shippers and destination recipients' },
        { label: 'Offers that serve them', items: ['National postal', 'Domestic courier', 'Platform-linked', 'Urban on-demand'] },
      ],
      note: 'Compare national postal, domestic courier, platform-linked, international express and urban on-demand offers separately.',
      takeaway: 'Service promise, shipment profile and network responsibility define customer segments better than the word delivery alone.',
    },
  },
  'logistics-express-m1-6': {
    heading: 'From local couriers to tracked national and international networks',
    intro: 'The chapter traces a progression from local document delivery to national and international networks using hubs, scheduled transport, shipment identifiers and partner coverage.',
    spec: {
      layout: 'timeline', title: '06 How Did Courier and Postal Delivery Begin?', kicker: '',
      events: [
        { period: 'Origins', label: 'Local courier', detail: 'Local document delivery by individual couriers', status: 'historical' },
        { period: 'Scale-up', label: 'Air express', detail: 'Scheduled transport extends reach to national and international networks', status: 'historical' },
        { period: 'Network era', label: 'Tracking', detail: 'Shipment identifiers make each parcel traceable through hubs', status: 'historical' },
        { period: 'Now', label: 'Broad parcel flows', detail: 'In Vietnam, postal infrastructure, private express networks and interprovincial routes', status: 'current' },
      ],
      note: 'The chapter gives the order of development, not dates.',
      takeaway: 'Scale became defensible when individual courier movements evolved into synchronized networks with repeatable service standards.',
    },
  },
  'logistics-express-m1-7': {
    heading: 'A central hub consolidates many origins before routing parcels to destination regions',
    intro: 'Hub-and-spoke sorting consolidates many origins before routing parcels toward destination regions. Scheduled transport and network partners extend a national network beyond any single facility.',
    spec: {
      layout: 'ecosystem', title: '07 How Did Hub-and-Spoke Express Networks Develop?', kicker: '',
      center: { label: 'Sort hub', detail: 'Consolidates parcels from many origins' },
      actors: [
        { label: 'Origin spokes', relation: 'Feed parcels collected across many origins', flows: ['product'] },
        { label: 'Destination regions', relation: 'Receive parcels routed from the hub', flows: ['product'] },
        { label: 'Scheduled transport', relation: 'Links spokes and hub on repeatable timetables', flows: ['service'] },
        { label: 'Network partners', relation: 'Extend coverage beyond owned facilities', flows: ['service'] },
        { label: 'Shipment identifiers', relation: 'Let the network trace each parcel through the hub', flows: ['information'] },
      ],
      note: 'In Vietnam, postal infrastructure, private express networks and interprovincial routes now support broad parcel flows.',
      takeaway: 'Scale became defensible when individual courier movements evolved into a synchronized national network with repeatable service standards.',
    },
  },
  'logistics-express-m1-8': {
    heading: 'Digital data now runs ahead of the parcel, until the residential stop',
    intro: 'A high-volume marketplace feed can automate labels and forecasts, yet a one-parcel residential stop still carries substantial final-mile cost.',
    spec: {
      layout: 'flow', title: '08 How Did E-Commerce and Digital Tracking Transform Delivery?', kicker: '',
      steps: [
        { label: 'Marketplace order', detail: 'E-commerce volume arrives as marketplace-generated orders', owner: 'Platform' },
        { label: 'Electronic label', detail: 'Labels and forecasts created from the order feed', owner: 'Merchant system' },
        { label: 'Automated sortation', detail: 'Real-time scans route parcels through hubs', owner: 'Carrier hub' },
        { label: 'Route optimization', detail: 'Dynamic routing builds the courier route', owner: 'Carrier depot' },
        { label: 'Residential stop', detail: 'Often one parcel, with substantial final-mile cost', kind: 'outcome', owner: 'Courier and recipient' },
      ],
      loop: 'Recipient messages keep the customer informed throughout.',
      note: 'In Vietnam, social commerce and SMEs create demand for simple booking, COD workflows, tracking and returns.',
      takeaway: 'E-commerce expanded parcel demand but shifted work toward more fragmented residential stops and stronger visibility expectations.',
    },
  },
  'logistics-express-m1-9': {
    heading: "What Vietnam's e-commerce shift asks of express carriers",
    intro: 'Social commerce and SMEs create demand for simple booking, COD workflows, tracking and returns, while marketplace orders spread work across many residential stops.',
    spec: {
      layout: 'taxonomy', title: "09 How Has Vietnam's Express Delivery Industry Developed?", kicker: '',
      root: 'New demands on Vietnam carriers', rootDetail: 'Considered together, not in sequence',
      groups: [
        { label: 'Platform networks', detail: 'Marketplace-generated orders and integrations' },
        { label: 'Social commerce and SMEs', items: ['Simple booking', 'COD workflows', 'Tracking', 'Returns'] },
        { label: 'Residential stops', detail: 'More fragmented stops, often with few parcels each' },
        { label: 'Digital proof', detail: 'Real-time scans and recipient messages meet visibility expectations' },
      ],
      takeaway: 'E-commerce expanded parcel demand in Vietnam but shifted work toward fragmented residential stops and stronger visibility expectations.',
    },
  },
  'logistics-express-m1-10': {
    heading: "Ti's broader market measure: one 2025 actual and two forecasts",
    intro: 'Ti reports €577.3B for 2025 and forecasts €609.1B in 2026 and €760.1B in 2030, a 5.7% 2025–2030 CAGR. The scope is the broader express-and-parcels market.',
    spec: {
      layout: 'timeline', title: '10 How Is the Global Express and Parcel Market Structured?', kicker: '',
      events: [
        { period: '2025', label: '€577.3B actual', detail: 'Ti estimate, broader express and parcels scope', status: 'historical' },
        { period: '2026', label: '€609.1B forecast', detail: 'Ti forecast for the same scope', status: 'forecast' },
        { period: '2030', label: '€760.1B forecast', detail: '5.7% 2025–2030 CAGR; forecast, not confirmed outcome', status: 'forecast' },
      ],
      note: 'This is a commercial market scope, not last-mile-only revenue or carrier profit. The Asia-Pacific 8.0% 2026–2030 CAGR is regional context, not a Vietnam forecast.',
      takeaway: 'The broader global express-and-parcels market is growing, but regional opportunity must be separated from last-mile-only revenue and carrier profit.',
    },
  },
  'logistics-express-m1-11': {
    heading: 'Orders, parcels, stops, attempts and revenue count different things',
    intro: 'One order can create multiple shipments or parcels; one stop can deliver several parcels; a returned parcel can involve several attempts. A courier delivering three parcels to one building records one stop but three parcels.',
    spec: {
      layout: 'table', title: '11 How Are Express and Parcel Markets Measured?', kicker: '',
      headers: ['Measure', 'What it counts', 'Do not confuse it with'],
      rows: [
        { label: 'Customer order', a: 'One purchase; can create several shipments or parcels', b: 'Shipment or parcel count' },
        { label: 'Parcel', a: 'Each physical item handled', b: 'Parcels successfully delivered' },
        { label: 'Delivery stop', a: 'One location visited, possibly several parcels', b: 'Parcels delivered' },
        { label: 'Delivery attempt', a: 'Each visit; a second attempt adds cost', b: 'A new customer order' },
        { label: 'Successful delivery', a: 'Completed handover', b: 'On-time completion' },
        { label: 'Market value', a: 'Broad market scope', b: 'Carrier revenue' },
      ],
      note: 'State operator, route, parcel class, eligible population, period and event definitions before comparing volume or service quality.',
      takeaway: 'Parcels handled are not parcels successfully delivered, on-time completion is not delivery completion, and network capacity is not utilization.',
    },
  },
  'logistics-express-m1-12': {
    heading: 'Global, regional and national demand figures answer different questions',
    intro: 'Ti forecasts €609.1B for 2026 across the broader global scope. Use Asia-Pacific’s forecast 8.0% 2026–2030 CAGR as regional context, not a Vietnam forecast.',
    spec: {
      layout: 'table', title: '12 Which Regions and Customer Segments Drive Demand?', kicker: '',
      headers: ['Scope', 'Ti figure', 'How to use it'],
      rows: [
        { label: 'Global, 2026', a: '€609.1B forecast', b: 'Near-term size of the broader express-and-parcels scope' },
        { label: 'Global, 2025–2030', a: '5.7% CAGR forecast', b: 'Global growth context' },
        { label: 'Asia-Pacific, 2026–2030', a: '8.0% CAGR forecast', b: 'Regional maturity and growth context' },
        { label: 'Vietnam', a: 'Not a Vietnam forecast', b: 'Do not read the regional rate as national growth' },
        { label: 'Last mile and profit', a: 'Not in the market figure', b: 'Separate last-mile revenue and carrier profit' },
      ],
      takeaway: 'The broader global express-and-parcels market is growing, but regional opportunity must be separated from last-mile-only revenue and carrier profit.',
    },
  },
  'logistics-express-m1-13': {
    heading: 'B2C growth adds value only when stop density and peaks stay under control',
    intro: 'Demand, distance, stop concentration, labor, capacity and repeat attempts decide whether parcel volume turns into profit. BCG’s study notes one to two parcels per residential stop.',
    spec: {
      layout: 'driverTree', title: '13 Who Are the Major Global Express and Parcel Participants?', kicker: '',
      root: { label: 'Value from parcel growth', detail: 'Only if marginal cost stays under control' },
      drivers: [
        { label: 'B2C growth', detail: 'Adds residential deliveries', children: [{ label: 'More residential stops' }, { label: 'Weaker stop density' }] },
        { label: 'Parcels per stop', detail: '1–2 per residential stop in BCG study context' },
        { label: 'Peak demand', detail: 'Labor and capacity must stretch for spikes' },
        { label: 'Last-mile cost', detail: '50–60% of parcel delivery cost in BCG study markets' },
      ],
      note: 'BCG figures cover participating carriers and large shippers in Europe and North America; they are not a universal global accounting rule.',
      takeaway: 'Parcel growth creates value only when network density, delivery success and utilization keep marginal cost under control.',
    },
  },
  'logistics-express-m1-14': {
    heading: 'Route density, failed deliveries and cost to serve decide whether volume pays',
    intro: 'BCG’s Europe and North America study places last mile at 50–60% of parcel delivery cost. Dense urban zones can support productive routes, while dispersed areas and poor address data require different service designs.',
    spec: {
      layout: 'table', title: '14 How Do Parcel Demand and Network Economics Interact?', kicker: '',
      headers: ['Economic lever', 'What it measures', 'Effect on profitability'],
      rows: [
        { label: 'Route density', a: 'Parcels or successful stops within a route area', b: 'Dense urban zones support productive routes' },
        { label: 'Failed delivery', a: 'Repeat attempts on the same parcel', b: 'Adds travel and handling cost' },
        { label: 'Cost to serve', a: 'Cost attributable to a shipment, customer, route or service', b: 'Shows which volume is profitable' },
        { label: 'Dispersed areas', a: 'Low stop concentration, poor address data', b: 'Need a different service design' },
      ],
      note: 'The 50–60% last-mile share is a BCG study finding for its markets, not a universal accounting rule.',
      takeaway: 'Parcel growth creates value only when network density, delivery success and utilization keep marginal cost under control.',
    },
  },
  'logistics-express-m1-15': {
    heading: 'Online retail value, goods value and parcel count are three separate VECOM estimates',
    intro: 'VECOM estimates 2024 online retail at US$32B, including US$22.5B in online goods retail, and 2.4B e-commerce postal parcels, up 30%. These are 2024 estimates, not 2025 Ministry market results.',
    spec: {
      layout: 'taxonomy', title: "15 What Does Vietnam's Express Delivery Market Look Like?", kicker: '',
      root: 'Vietnam e-commerce measures', rootDetail: 'VECOM 2024 estimates — different measures, not one market size',
      groups: [
        { label: 'Online retail', detail: 'US$32B, includes services and goods' },
        { label: 'Online goods retail', detail: 'US$22.5B subset of online retail' },
        { label: 'E-commerce postal parcels', detail: '2.4B parcels, up 30% from 2023' },
        { label: 'Carrier revenue', detail: 'A different measure; not given by these estimates' },
      ],
      note: 'SMEs and merchant participation feed this demand, but sales value is not parcel-carrier revenue.',
      takeaway: 'Vietnam’s e-commerce base supports substantial parcel demand, but value, parcel counts and carrier revenue are different measures.',
    },
  },
  'logistics-express-m1-16': {
    heading: 'Online goods, marketplaces, cash collection and returns all feed the domestic parcel network',
    intro: 'Online commerce, merchant participation, postal parcel flows, cash collection and returns feed domestic delivery demand.',
    spec: {
      layout: 'ecosystem', title: '16 How Do Urban and Interprovincial Parcel Networks Operate?', kicker: '',
      center: { label: 'Domestic parcel network', detail: 'Carries online orders to recipients and back' },
      actors: [
        { label: 'Marketplaces', relation: 'Generate orders and bring merchants online', flows: ['information'] },
        { label: 'Goods retailers', relation: 'Hand over physical goods sold online', flows: ['product'] },
        { label: 'Recipients', relation: 'Receive parcels and may pay cash on delivery', flows: ['product', 'money'] },
        { label: 'Cash collection', relation: 'Money collected at the door and settled', flows: ['money'] },
        { label: 'Returns', relation: 'Send parcels back into the network', flows: ['product', 'risk'] },
      ],
      note: 'VECOM’s US$22.5B online goods retail is a 2024 estimate of sales value, not parcel-carrier revenue.',
      takeaway: 'Vietnam’s e-commerce base supports substantial parcel demand, but sales value, parcel counts and carrier revenue are different measures.',
    },
  },
  'logistics-express-m1-17': {
    heading: "The Ministry's 2025 assessment covers 10 major operators, not the whole market",
    intro: 'The Ministry’s 2025 assessment sampled 4,242,769 parcels up to 2kg across 10 high-volume interprovincial routes and 10 operators. The evaluated operators represented over 80% of 2024 market volume and revenue.',
    spec: {
      layout: 'table', title: '17 Who Are the Key Express and Last-Mile Participants in Vietnam?', kicker: '',
      headers: ['Sample element', 'Ministry 2025 assessment', 'Limit on interpretation'],
      rows: [
        { label: 'Operators', a: '10 major providers', b: 'Over 80% of 2024 volume and revenue, not all operators' },
        { label: 'Parcels', a: '4,242,769 up to 2kg', b: 'Three sampled days' },
        { label: 'Routes', a: '10 high-volume interprovincial routes', b: 'Not every domestic route' },
      ],
      note: 'Postal operators and international express carriers are different participant types; compare them only on matched parcel, route and period definitions.',
      takeaway: 'Vietnam competition combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.',
    },
  },
  'logistics-express-m1-18': {
    heading: 'Domestic express networks and urban specialists face different route conditions',
    intro: 'Operators, route conditions, traffic, geography, parcel safety and service measures shape Vietnam’s domestic market. The Ministry sample measured 10 high-volume interprovincial routes, not city delivery.',
    spec: {
      layout: 'compare', title: '18 How Do Vietnam E-Commerce Parcels Move Through the Network?', kicker: '',
      leftTitle: 'Domestic express', rightTitle: 'Urban specialists',
      rows: [
        { label: 'Where parcels move', a: 'Across interprovincial routes', b: 'Within city delivery zones' },
        { label: 'Main condition', a: 'Geography and route distance', b: 'Traffic' },
        { label: 'Evidence in the chapter', a: 'Ministry sample of interprovincial routes', b: 'Not covered by that route sample' },
      ],
      note: 'Parcel safety and service measures apply to both; compare operators only on matched routes and parcel definitions.',
      takeaway: 'Vietnam competition combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.',
    },
  },
  'logistics-express-m1-19': {
    heading: 'Competitive position in Vietnam combines four drivers, not one ranking',
    intro: 'Coverage, price, merchant integration and measured delivery quality shape each operator’s position. The Ministry route sample shows quality must be measured on defined parcels and routes.',
    spec: {
      layout: 'driverTree', title: "19 What Opportunities and Constraints Shape Vietnam's Delivery Industry?", kicker: '',
      root: { label: 'Competitive position', detail: 'No single universal ranking' },
      drivers: [
        { label: 'Coverage', detail: 'Routes and geography served' },
        { label: 'Price', detail: 'What merchants pay per parcel' },
        { label: 'Merchant integration', detail: 'Platform-linked order flows', children: [{ label: 'Platform-linked operators' }] },
        { label: 'Service quality', detail: 'Measured delivery performance', children: [{ label: 'On-time delivery' }, { label: 'Parcel safety' }] },
      ],
      note: 'The Ministry’s 2025 assessment of 10 operators on 10 interprovincial routes is a sample, not a census of all parcels or routes.',
      takeaway: 'Vietnam competition combines coverage, price, merchant integration and measurable delivery quality rather than one universal ranking.',
    },
  },
  'logistics-express-m1-20': {
    heading: 'Consumer spending and SME digitization set daily parcel volume and service mix',
    intro: 'Economic activity, online orders, campaigns, business shipping and returns influence daily volume and service mix.',
    spec: {
      layout: 'driverTree', title: '20 How Do E-Commerce and Economic Conditions Affect Parcel Demand?', kicker: '',
      root: { label: 'Parcel demand', detail: 'Daily volume and service mix' },
      drivers: [
        { label: 'Consumer spending', detail: 'Economic activity drives online orders', children: [{ label: 'Online orders' }, { label: 'Sales campaigns' }] },
        { label: 'SME digitization', detail: 'More small merchants selling and shipping online' },
        { label: 'Business shipping', detail: 'Shipments between businesses' },
        { label: 'Returns', detail: 'Reverse parcels added to daily volume' },
      ],
      note: 'Merchant forecasts, marketplace events and province-level flows should drive labor, line-haul and courier planning.',
      takeaway: 'Demand reflects both parcel count and willingness to pay for speed, convenience and reliability.',
    },
  },
  'logistics-express-m1-21': {
    heading: 'Parcel count and willingness to pay are two separate sides of demand',
    intro: 'E-commerce penetration raises how many parcels move, while price sensitivity limits what customers will pay for speed, convenience and reliability.',
    spec: {
      layout: 'compare', title: '21 Why Do Postal, Transport, Safety and Data Rules Matter?', kicker: '',
      leftTitle: 'Parcel count', rightTitle: 'Willingness to pay',
      rows: [
        { label: 'Raised by', a: 'E-commerce penetration and online orders', b: 'Need for speed, convenience and reliability' },
        { label: 'Limited by', a: 'Economic activity and campaign timing', b: 'Price sensitivity' },
        { label: 'Typical service', a: 'Economy parcels', b: 'Time-definite parcels' },
        { label: 'What it plans', a: 'Labor, line-haul and courier capacity', b: 'Handling priority and price' },
      ],
      takeaway: 'Demand reflects both parcel count and willingness to pay for speed, convenience and reliability.',
    },
  },
  'logistics-express-m1-22': {
    heading: 'During a promotional peak, urgent and economy parcels need different priorities',
    intro: 'A sales campaign can create a short capacity spike while economy and time-definite parcels require different handling priorities.',
    spec: {
      layout: 'decision', title: '22 How Are Digital Technologies Transforming Express Delivery?', kicker: '',
      root: { label: 'Parcel arriving in a promotional peak', detail: 'Short capacity spike from a sales campaign' },
      question: 'Does the parcel carry a time-definite promise?',
      branches: [
        { condition: 'Premium urgency', outcome: 'Protect priority handling', detail: 'Time-definite parcels keep their promise first', tone: 'positive' },
        { condition: 'Economy parcel', outcome: 'Handle within the campaign plan', detail: 'Planned from merchant forecasts and marketplace events', tone: 'caution' },
        { condition: 'Volume above forecast', outcome: 'Re-plan capacity', detail: 'Labor, line haul and couriers', tone: 'negative' },
      ],
      note: 'Merchant forecasts, marketplace events and province-level flows should drive labor, line-haul and courier planning.',
      takeaway: 'Demand reflects both parcel count and willingness to pay for speed, convenience and reliability.',
    },
  },
  'logistics-express-m1-23': {
    heading: 'Each delivery technology still depends on data, capacity, access and trained people',
    intro: 'A route optimizer cannot correct a missing address, an overloaded depot or an unavailable recipient without operating controls.',
    spec: {
      layout: 'table', title: "23 How Are Merchants' and Recipients' Expectations Changing?", kicker: '',
      headers: ['Technology', 'What it improves', 'What it still needs'],
      rows: [
        { label: 'Dynamic routing', a: 'Route plans and stop order', b: 'Accurate addresses and depot capacity' },
        { label: 'Digital proof', a: 'Trustworthy tracking and completion', b: 'Trained courier execution' },
        { label: 'Electric fleets', a: 'Lower-emission delivery design', b: 'Vehicle choices that fit local roads' },
        { label: 'Compliance', a: 'Safety and data controls', b: 'Operating controls applied on every route' },
      ],
      note: 'Motorcycle-heavy urban delivery, congestion, building access and uneven provincial density require locally specific designs.',
      takeaway: 'Technology improves delivery only when accurate data, physical capacity, local access and trained execution work together.',
    },
  },
  'logistics-express-m1-24': {
    heading: 'Automation and out-of-home delivery open options that local access conditions can limit',
    intro: 'Automated sorting and out-of-home points create opportunities, but motorcycle-heavy urban delivery, congestion, building access and uneven provincial density require locally specific designs.',
    spec: {
      layout: 'compare', title: '24 What External Risks and Opportunities Shape Parcel Networks?', kicker: '',
      leftTitle: 'Opportunity', rightTitle: 'Condition or risk',
      rows: [
        { label: 'Automated sorting', a: 'Sorts parcels at scale', b: 'Needs accurate data and physical capacity' },
        { label: 'Out-of-home', a: 'Lockers, shops or collection points instead of a doorstep', b: 'Needs points recipients can reach' },
        { label: 'Urban access', a: 'Dense city stops', b: 'Congestion and building access' },
        { label: 'Provincial coverage', a: 'Broad parcel reach', b: 'Uneven provincial density' },
      ],
      note: 'Geopost reports European out-of-home parcel volumes up 31% in 2025; this is one network’s company-reported result, not the whole market.',
      takeaway: 'Technology and new delivery formats improve delivery only when accurate data, physical capacity, local access and trained execution work together.',
    },
  },
};
