import type { AgriCommoditiesChapterVisual } from './agriCommoditiesVisualSpecs';

/** Chapter-specific Learning Visuals for Agricultural Commodities & Trading Module 04 (competition), keyed by visualKind. */
export const AGRI_COMMODITIES_M4_VISUALS: Record<string, AgriCommoditiesChapterVisual> = {
  'agri-commodities-m4-1': {
    heading: 'Different competitor types win on different edges, so size alone does not decide',
    intro: 'Global houses, regional merchants, domestic originators, processors and commodity specialists all compete, but each brings a different mix of scale, specialization, infrastructure and relationships.',
    spec: {
      layout: 'table', title: '01 How Competitive Are Agricultural Commodity Markets?', kicker: '',
      headers: ['Competitor type', 'Typical edge', 'Where that edge pays'],
      rows: [
        { label: 'Global merchant', a: 'Scale and multi-market reach', b: 'Bulk grain networks' },
        { label: 'Local aggregator', a: 'Origin relationships', b: 'Gathering fragmented farm supply' },
        { label: 'Integrated processor', a: 'Infrastructure and processing', b: 'Converting supply into products' },
        { label: 'Commodity specialist', a: 'Grading expertise', b: 'Specialty coffee and other niche grades' },
      ],
      note: 'Compare participants within a commodity and role rather than across all agriculture.',
      takeaway: 'Advantage combines scale, specialization, infrastructure, relationships and risk capacity—not size alone.',
    },
  },
  'agri-commodities-m4-2': {
    heading: 'Five forces that squeeze a regional trader or specialized exporter',
    intro: 'Porter’s Five Forces sorts the pressures on a trader’s margin. Regional traders and specialized exporters face them from global houses, suppliers, buyers, entrants and alternative sources.',
    spec: {
      layout: 'taxonomy', title: '02 How Do Porter’s Five Forces Apply to Commodity Trading?', kicker: '',
      root: 'Forces on a regional trader or specialized exporter', rootDetail: 'Five pressures acting at once — not a sequence',
      groups: [
        { label: 'Rivalry', detail: 'Global houses, regional merchants, domestic originators and processors' },
        { label: 'Supplier power', detail: 'Origin relationships decide who secures the crop' },
        { label: 'Buyer power', detail: 'Buyers can compare offers across traders and origins' },
        { label: 'Threat of new entrants', detail: 'Brokers can start light but need trusted counterparties' },
        { label: 'Substitutes', detail: 'Buyers can switch origin, grade or commodity' },
      ],
      note: 'Bulk grain networks reward scale, while specialty coffee may reward origin relationships and grading expertise — the forces bite differently by commodity.',
      takeaway: 'Advantage combines scale, specialization, infrastructure, relationships and risk capacity—not size alone.',
    },
  },
  'agri-commodities-m4-3': {
    heading: 'A defensible position rests on five reinforcing advantages',
    intro: 'Relationships, expertise, facilities, trade finance, working capital, regulation and reliability protect a commodity position. Brokerage looks easy to start, but lasting entry needs all of them.',
    spec: {
      layout: 'driverTree', title: '03 What Creates Competitive Barriers and Commercial Advantages?', kicker: '',
      root: { label: 'Protected commercial position', detail: 'Hard for a new entrant to copy' },
      drivers: [
        { label: 'Supply access', detail: 'Relationships at origin', children: [{ label: 'Supplier relationships' }, { label: 'Trusted counterparties' }] },
        { label: 'Quality consistency', detail: 'Expertise and facilities', children: [{ label: 'Grading expertise' }, { label: 'Storage and processing facilities' }] },
        { label: 'Cost efficiency', detail: 'Lower delivered cost' },
        { label: 'Finance', detail: 'Capital to hold positions', children: [{ label: 'Trade finance' }, { label: 'Working capital' }] },
        { label: 'Trust and delivery', detail: 'Reliability over time', children: [{ label: 'Enforceable terms' }, { label: 'Regulatory compliance' }] },
      ],
      note: 'A new broker avoids inventory but still needs trusted counterparties and enforceable terms. Move into owned inventory only with controls for quality, title, financing and disposition.',
      takeaway: 'Sustainable entry requires execution, counterparties and capital even when brokerage appears easy to start.',
    },
  },
  'agri-commodities-m4-4': {
    heading: 'Integrated networks such as Cargill and Bunge span purchasing through to sale',
    intro: 'Official company sources describe complementary roles in crop purchasing, storage, transport, processing and sale. Their commodity, geographic and asset portfolios differ.',
    spec: {
      layout: 'flow', title: '04 Who Are the Major Global Agricultural Commodity Participants?', kicker: '',
      steps: [
        { label: 'Crop purchasing', detail: 'Origination from producers and suppliers' },
        { label: 'Storage', detail: 'Holding and conditioning inventory' },
        { label: 'Transport', detail: 'Moving goods across origins and markets' },
        { label: 'Processing', detail: 'Converting crops into products' },
        { label: 'Sale and merchandising', detail: 'Selling to customers in many markets', kind: 'outcome' },
      ],
      note: 'Cargill and Bunge illustrate this integrated network; they are examples, not a ranking. Benchmark their relevant local commodity activities rather than parent-company scale alone.',
      takeaway: 'Global players illustrate integrated origination, processing, logistics and merchandising—not one universal ranking.',
    },
  },
  'agri-commodities-m4-5': {
    heading: 'Producers, traders, processors and multinationals compete on different ground',
    intro: 'Participants in the same commodity chain compete for different things. Multinational agricultural supply-chain companies such as ADM and Louis Dreyfus Company combine several roles.',
    spec: {
      layout: 'taxonomy', title: '05 How Do Producers, Traders, and Processors Compete Differently?', kicker: '',
      root: 'Competitors in one commodity chain', rootDetail: 'Roles — compare like with like',
      groups: [
        { label: 'Producers', detail: 'Compete on yield, quality and reliable supply' },
        { label: 'Traders', detail: 'Compete on origination, merchandising and execution' },
        { label: 'Processors', detail: 'Compete on conversion, utilization and product quality' },
        { label: 'Multinational networks', detail: 'Combine origination, processing, logistics and merchandising', items: ['ADM', 'Louis Dreyfus Company'] },
      ],
      note: 'Benchmark a multinational’s relevant local commodity activities rather than parent-company scale alone; these examples are not a ranking.',
      takeaway: 'Global players illustrate integrated origination, processing, logistics and merchandising—not one universal ranking.',
    },
  },
  'agri-commodities-m4-6': {
    heading: 'Vietnam’s commodity market links local collectors to exporters, importers and multinationals',
    intro: 'Domestic exporters, processors, trading firms, cooperatives, collectors and multinational participants shape Vietnam’s markets, and the mix differs by product.',
    spec: {
      layout: 'ecosystem', title: '06 Which Companies and Organizations Shape Vietnam\'s Commodity Markets?', kicker: '',
      center: { label: 'Vietnam commodity market', detail: 'Organized product by product' },
      actors: [
        { label: 'Collector', relation: 'Gathers farm supply and local lots', flows: ['product', 'money'] },
        { label: 'Processor', relation: 'Grades and transforms raw supply', flows: ['product', 'service'] },
        { label: 'Exporter', relation: 'Sells to international customers, e.g. rice', flows: ['product', 'money'] },
        { label: 'Industrial importer', relation: 'Brings in inputs, e.g. feed grain', flows: ['product', 'money'] },
        { label: 'Multinational', relation: 'Adds global market reach, information and finance', flows: ['money', 'information'] },
      ],
      note: 'A rice exporter and a feed-grain importer require different origins, customers, assets and risk controls. Partnerships can combine local supply access with global reach and finance.',
      takeaway: 'Vietnam competition combines local origination knowledge with international customer, finance and information capabilities.',
    },
  },
  'agri-commodities-m4-7': {
    heading: 'Only benchmark two businesses once commodity, role, geography, period and accounting basis match',
    intro: 'Benchmarks compare sourcing, volume, storage, processing, working-capital efficiency and margins, but only within a clear entity scope. Turnover, physical volume and profit are not interchangeable.',
    spec: {
      layout: 'decision', title: '07 How Should Agricultural Commodity Businesses Be Compared?', kicker: '',
      root: { label: 'Two businesses to benchmark', detail: 'Commodity portfolio, procurement scale, trading volume' },
      question: 'Do they share commodity, role, geography, period and accounting basis?',
      branches: [
        { condition: 'All five match', outcome: 'Compare storage, processing, working capital and profitability', detail: 'Use the same metric definitions on both sides', tone: 'positive' },
        { condition: 'Some match', outcome: 'Compare only the matching measures', detail: 'State the scope difference beside every figure', tone: 'caution' },
        { condition: 'Group turnover vs shipment value', outcome: 'Do not rank them', detail: 'Turnover, volume and profit are different measures', tone: 'negative' },
      ],
      note: 'A diversified global merchant’s group turnover cannot be ranked directly against a Vietnamese coffee exporter’s shipment value. Benchmark by commodity, grade, harvest, route and customer acceptance.',
      takeaway: 'Benchmarking requires the same commodity, role, geography, period and accounting basis; turnover, physical volume and profit are not interchangeable.',
    },
  },
  'agri-commodities-m4-8': {
    heading: 'Reported volume hides what the sourcing-to-delivery system actually achieves',
    intro: 'Operating economics depend on access to suppliers, geographic reach, capacity, utilization, yield, traceability and rejection performance, not on tonnage alone.',
    spec: {
      layout: 'compare', title: '08 How Do Scale, Sourcing, and Operating Economics Differ?', kicker: '',
      leftTitle: 'Reported volume view', rightTitle: 'Sourcing-to-delivery system view',
      rows: [
        { label: 'Origination capacity', a: 'Tonnes bought', b: 'Supplier access, geographic reach and traceability' },
        { label: 'Storage and logistics', a: 'Capacity owned', b: 'Utilization and yield achieved' },
        { label: 'Quality', a: 'Not visible in tonnage', b: 'Rejection performance and consistency' },
        { label: 'Who looks stronger', a: 'The larger merchant', b: 'Possibly a specialty exporter with documented origin' },
      ],
      note: 'A specialty exporter may outperform a larger merchant on consistency and origin documentation. Benchmark by commodity, grade, harvest, route and customer acceptance.',
      takeaway: 'Competitive strength is the reliability and efficiency of the sourcing-to-delivery system, not reported volume alone.',
    },
  },
  'agri-commodities-m4-9': {
    heading: 'Five financial capabilities, what to track for each and the warning sign',
    intro: 'Purchase-to-delivered economics, cash conversion, account concentration, finance access and limits separate durable competitors from those buying volume.',
    spec: {
      layout: 'table', title: '09 Which Capabilities Explain Competitive Advantage?', kicker: '',
      headers: ['Capability', 'What to track', 'Warning sign'],
      rows: [
        { label: 'Delivered cost', a: 'Purchase-to-delivered economics', b: 'Below-cost pricing to win volume' },
        { label: 'Working capital', a: 'Cash conversion and receivables', b: 'Cash tied up before collection' },
        { label: 'Retention', a: 'Repeat orders and contribution by customer', b: 'High account concentration' },
        { label: 'Liquidity', a: 'Access to finance', b: 'Volume growth draining cash' },
        { label: 'Risk discipline', a: 'Exposure against approved limits', b: 'Positions outside limits' },
      ],
      note: 'Below-cost pricing can win volume while weakening liquidity and future execution.',
      takeaway: 'Strong competitors pair competitive price with financial resilience, repeat business and controlled exposure.',
    },
  },
  'agri-commodities-m4-10': {
    heading: 'Sourcing and quality control protect margin at every stage from supplier to delivery',
    intro: 'Success means coordinating procurement, processing, storage and delivery with minimal avoidable loss and delay. Supplier development and quality assurance come first.',
    spec: {
      layout: 'flow', title: '10 Why Do Sourcing and Quality Control Matter?', kicker: '',
      steps: [
        { label: 'Develop suppliers', detail: 'Reliable supply matched to the harvest plan', owner: 'Sourcing team' },
        { label: 'Assure quality at intake', detail: 'Test lots against the agreed specification', owner: 'Quality team' },
        { label: 'Process and store', detail: 'Keep avoidable loss to a minimum', owner: 'Operations' },
        { label: 'Deliver efficiently', detail: 'Logistics efficiency without delay', owner: 'Logistics' },
        { label: 'Margin and customer confidence protected', kind: 'outcome' },
      ],
      note: 'Strengthen local quality data and contingencies around seasonal bottlenecks.',
      takeaway: 'Reliable supply and efficient physical execution protect thin margins and customer confidence.',
    },
  },
  'agri-commodities-m4-11': {
    heading: 'Matching harvest purchases to planned sales decides whether working capital turns or stalls',
    intro: 'A procurement plan tied to sales keeps inventory moving. When purchases and sales drift apart, the business pays for distressed storage or emergency sourcing.',
    spec: {
      layout: 'decision', title: '11 How Do Scale, Logistics, and Working Capital Create Advantage?', kicker: '',
      root: { label: 'Harvest procurement plan', detail: 'Volumes bought as the crop arrives' },
      question: 'Are purchases matched to planned sales and logistics?',
      branches: [
        { condition: 'Matched to sales', outcome: 'Inventory turns and cash is released', detail: 'Inventory optimization keeps working capital low', tone: 'positive' },
        { condition: 'Sales ahead of supply', outcome: 'Emergency sourcing', detail: 'Buying late adds cost and delay', tone: 'caution' },
        { condition: 'Bought ahead of sales', outcome: 'Distressed storage', detail: 'Stock and cash are tied up waiting for buyers', tone: 'negative' },
      ],
      note: 'Matched harvest plans and sales reduce distressed storage or emergency sourcing.',
      takeaway: 'Reliable supply and efficient physical execution protect thin margins and customer confidence.',
    },
  },
  'agri-commodities-m4-12': {
    heading: 'Risk management turns market information into decisions inside approved limits',
    intro: 'Prices, weather, crops, stocks, freight, currency, customer demand and position data only add value when they feed a disciplined cycle with clear limit ownership.',
    spec: {
      layout: 'flow', title: '12 How Do Risk Management and Buyer Relationships Support Success?', kicker: '',
      steps: [
        { label: 'Market monitoring', detail: 'Prices, weather, crops, stocks, freight, currency' },
        { label: 'Exposure measurement', detail: 'Position data against approved limits' },
        { label: 'Hedging and contracts', detail: 'Cover eligible benchmark exposure; fix terms', kind: 'decision' },
        { label: 'Credit control', detail: 'Check each buyer’s capacity to pay' },
        { label: 'Liquidity plan', detail: 'Fund margin calls, inventory and receivables' },
      ],
      loop: 'Independent reconciliation and escalation feed the next round of monitoring.',
      note: 'A hedge can manage an eligible benchmark exposure but not quality, basis, volume or counterparty risk.',
      takeaway: 'Information creates value only when translated into disciplined decisions within approved financial and operating limits.',
    },
  },
  'agri-commodities-m4-13': {
    heading: 'The same supplier network and processing base can be a strength and a weakness',
    intro: 'Strengths and weaknesses depend on commodity, geography and business model. A strong local network can be a moat but also concentrate risk.',
    spec: {
      layout: 'compare', title: '13 What Are the Industry’s Main Strengths and Weaknesses?', kicker: '',
      leftTitle: 'Strength', rightTitle: 'Weakness',
      rows: [
        { label: 'Supplier network', a: 'A strong local network can be a moat', b: 'Concentrates climate and supplier risk' },
        { label: 'Value-added processing', a: 'Efficient processing captures more value', b: 'Needs capital and steady utilization' },
        { label: 'Market access', a: 'Efficient access to buyers', b: 'Narrow spreads leave little buffer' },
        { label: 'Climate and trade shocks', a: 'Local knowledge of each harvest', b: 'Shocks hit supply, cost and spreads together' },
      ],
      note: 'Tailor the analysis to rice, coffee, cashew, pepper, rubber or imports rather than “agriculture” broadly.',
      takeaway: 'Opportunity lies in efficient market access and processing while vulnerability centers on shocks, capital and narrow spreads.',
    },
  },
  'agri-commodities-m4-14': {
    heading: 'Thin margins and traceability each carry an opportunity and a threat',
    intro: 'Opportunities and threats differ by commodity, geography and business model. Efficient execution and documented supply open doors that shocks and capital needs can close.',
    spec: {
      layout: 'table', title: '14 What Opportunities and Threats Shape Commodity Markets?', kicker: '',
      headers: ['Factor', 'Opportunity', 'Threat'],
      rows: [
        { label: 'Thin margin', a: 'Efficient execution still earns on small spreads', b: 'A shock or higher capital cost can erase it' },
        { label: 'Traceability', a: 'Records linking lot to origin win buyers', b: 'Unreliable records lose market access' },
        { label: 'Processing', a: 'Capture more value from each lot', b: 'Capital at risk if supply or offtake fails' },
        { label: 'Local network', a: 'Supply access competitors lack', b: 'Concentrated climate and supplier risk' },
      ],
      note: 'Traceability means records connecting a commodity lot with origin, handling, processing and shipment events.',
      takeaway: 'Opportunity lies in efficient market access and processing while vulnerability centers on shocks, capital and narrow spreads.',
    },
  },
  'agri-commodities-m4-15': {
    heading: 'A combined stress test decides whether to scale, prepare alternatives or cut exposure',
    intro: 'Climate, quality inconsistency, disruption, financing, volatile prices and stricter buyers force strategic choices. Stress testing them together shows which choice is safe.',
    spec: {
      layout: 'decision', title: '15 What Strategic Choices Must Commodity Businesses Make?', kicker: '',
      root: { label: 'Combined stress test', detail: 'Delayed shipment, lower price, rejection and customer default together' },
      question: 'Does the business stay within its cash and risk limits?',
      branches: [
        { condition: 'Yes, with headroom', outcome: 'Scale within limits', detail: 'Keep price and FX, quality and traceability controls in place', tone: 'positive' },
        { condition: 'Only with contingency', outcome: 'Pre-qualify alternatives', detail: 'Alternate origins, routes, customers and cash triggers', tone: 'caution' },
        { condition: 'No — liquidity stress', outcome: 'Cut exposure first', detail: 'Diversify supply before committing more', tone: 'negative' },
      ],
      note: 'Maintain practical alternate origins, routes, customers and cash triggers.',
      takeaway: 'Resilience requires risk controls embedded in sourcing, inventory, contracts, shipment and collection.',
    },
  },
};
