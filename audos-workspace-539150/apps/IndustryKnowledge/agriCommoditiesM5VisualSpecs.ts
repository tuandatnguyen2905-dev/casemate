import type { AgriCommoditiesChapterVisual } from './agriCommoditiesVisualSpecs';

/** Chapter-specific Learning Visuals for Agricultural Commodities & Trading Module 05 (trends and outlook), keyed by visualKind. */
export const AGRI_COMMODITIES_M5_VISUALS: Record<string, AgriCommoditiesChapterVisual> = {
  'agri-commodities-m5-1': {
    heading: 'Industrial buyers are weighting supply security and reliability alongside price',
    intro: 'Across changing markets, industrial buyers need predictable volume, specification, documents and delivery. Suppliers that provide them depend less on price competition.',
    spec: {
      layout: 'compare', title: '01 How Are Global Food and Agricultural Commodity Demand Patterns Changing?', kicker: '',
      leftTitle: 'Price-led buying', rightTitle: 'Reliability-led buying',
      rows: [
        { label: 'What the buyer values', a: 'Lowest quoted price', b: 'Supply security: predictable volume and specification' },
        { label: 'Supplier base', a: 'Whoever is cheapest this time', b: 'Supplier diversity without unmanaged concentration' },
        { label: 'Service', a: 'Delivery problems tolerated', b: 'Service reliability: documents and delivery on time' },
        { label: 'Relationship', a: 'Re-tendered on price', b: 'Retained through consistency' },
      ],
      note: 'A feed mill values continuity and compliant specification because shortages stop production.',
      takeaway: 'Reliability and consistency strengthen retention and reduce dependence on price competition.',
    },
  },
  'agri-commodities-m5-2': {
    heading: 'End-product expectations pass upstream as a standard grade and a long-term relationship',
    intro: 'Food and feed makers turn what their customers expect into a specification. Suppliers that deliver that standard grade consistently keep the relationship.',
    spec: {
      layout: 'flow', title: '02 How Do Consumer Preferences Affect Commodity Requirements?', kicker: '',
      steps: [
        { label: 'End-product expectation', detail: 'What the finished food or feed must deliver', owner: 'Consumer market' },
        { label: 'Buyer specification', detail: 'Predictable volume, specification and documents', owner: 'Manufacturer' },
        { label: 'Standard grade delivered', detail: 'Consistent, compliant lots every time', owner: 'Supplier' },
        { label: 'Long-term relationship', detail: 'Retention less dependent on price', kind: 'outcome', owner: 'Buyer and supplier' },
      ],
      note: 'Build recurring demand visibility without creating unmanaged buyer concentration.',
      takeaway: 'Reliability and consistency strengthen retention and reduce dependence on price competition.',
    },
  },
  'agri-commodities-m5-3': {
    heading: 'Manufacturers, regulators and certifiers all ask for proof attached to the same lot',
    intro: 'Buyers and regulators request information about origin, handling, production practices and compliance. The supplier’s lot record has to answer all of them.',
    spec: {
      layout: 'ecosystem', title: '03 How Do Food Manufacturers and Industrial Buyers Influence Demand?', kicker: '',
      center: { label: 'Commodity lot record', detail: 'Supplier, warehouse, processing, inspection and shipment events' },
      actors: [
        { label: 'Food manufacturers', relation: 'Request origin records and responsible criteria', flows: ['information', 'money'] },
        { label: 'Industrial buyers', relation: 'Expect transparency on handling', flows: ['information'] },
        { label: 'Regulators', relation: 'Require compliance evidence', flows: ['oversight'] },
        { label: 'Certification bodies', relation: 'Verify production practices', flows: ['oversight', 'service'] },
        { label: 'Suppliers', relation: 'Capture source data for digital traceability', flows: ['information', 'product'] },
      ],
      note: 'Fragmented production requires practical data capture and verification, not unsupported claims.',
      takeaway: 'Traceability supports access and risk management only when source data and chain-of-custody records are reliable.',
    },
  },
  'agri-commodities-m5-4': {
    heading: 'Technology informs a trading decision, but limits and human review still govern it',
    intro: 'Systems now consolidate supplier, crop, weather, price, inventory and customer information. The output supports purchasing, but uncertainty from weather, policy and markets remains.',
    spec: {
      layout: 'flow', title: '04 How Is Technology Transforming Commodity Sourcing and Trading?', kicker: '',
      steps: [
        { label: 'Supplier platform', detail: 'Consolidates supplier, crop and inventory data' },
        { label: 'Price analytics', detail: 'Adds weather, price and customer signals' },
        { label: 'Decision support', detail: 'Forecast informs the purchase plan' },
        { label: 'Limits and human review', detail: 'Approve or adjust the position', kind: 'decision' },
        { label: 'Position taken', detail: 'Consistent, but still exposed to uncertainty', kind: 'outcome' },
      ],
      note: 'Start with master data and measurable procurement decisions before advanced prediction.',
      takeaway: 'Digital intelligence improves consistency but cannot remove uncertainty from weather, policy and markets.',
    },
  },
  'agri-commodities-m5-5': {
    heading: 'Remote sensing and demand forecasts only work on top of clean master data',
    intro: 'Digital supply chains build up in layers. Master data and measurable procurement decisions come first; remote sensing and demand forecasting are options added on that base.',
    spec: {
      layout: 'pathway', title: '05 How Are Data, Traceability, and Digital Supply Chains Developing?', kicker: '',
      trunk: [
        { label: 'Master data', detail: 'Reliable supplier, crop and inventory records' },
        { label: 'Measurable procurement decisions', detail: 'Decisions that can be checked against outcomes' },
      ],
      optionsLabel: 'Advanced prediction tools — options, not a sequence',
      options: [
        { label: 'Remote sensing', detail: 'Crop and weather signals from origin areas' },
        { label: 'Demand forecast', detail: 'Expected customer needs to guide purchasing' },
      ],
      note: 'A forecast informs purchasing, but limits and human review govern the position.',
      takeaway: 'Digital intelligence improves consistency but cannot remove uncertainty from weather, policy and markets.',
    },
  },
  'agri-commodities-m5-6': {
    heading: 'Each operations technology helps only when its records match the physical goods',
    intro: 'Tools now connect procurement, quality, storage, processing, finance, shipment and sale. Each one reduces discrepancies only under specific conditions.',
    spec: {
      layout: 'table', title: '06 How Are Processing, Storage, and Logistics Technologies Improving?', kicker: '',
      headers: ['Technology', 'What it improves', 'Condition for it to work'],
      rows: [
        { label: 'Warehouse system', a: 'Stock and custody records', b: 'Records mirror physical custody' },
        { label: 'Digital document', a: 'Faster title and shipment paperwork', b: 'Records mirror ownership' },
        { label: 'Automated quality', a: 'Repeatable grading', b: 'Calibrated to the agreed specification' },
        { label: 'Shipment visibility', a: 'Tracking goods in transit', b: 'Partner adoption along the route' },
        { label: 'Data integration', a: 'One view from procurement to sale', b: 'Training and controls across networks' },
      ],
      note: 'Technology needs training, controls and partner adoption across collection networks.',
      takeaway: 'Integrated data reduces discrepancies when records mirror physical custody and ownership.',
    },
  },
  'agri-commodities-m5-7': {
    heading: 'Diverse trade connections buffer shocks that concentrated ones pass on',
    intro: 'Weather, geopolitics, freight and policy are changing origins, destinations and routes. FAO finds diverse trade connections can improve buffering against shocks.',
    spec: {
      layout: 'compare', title: '07 How Are Agricultural Commodity Trade Flows Evolving?', kicker: '',
      leftTitle: 'Concentrated trade connections', rightTitle: 'Diversified trade connections',
      rows: [
        { label: 'Origins', a: 'One main origin', b: 'Multi-origin supply' },
        { label: 'Destinations', a: 'Few buyers or markets', b: 'Market diversity' },
        { label: 'Sourcing logic', a: 'Habit and lowest price', b: 'Risk-based sourcing' },
        { label: 'When a shock hits', a: 'Disruption passes straight through', b: 'Better buffering against shocks' },
      ],
      note: 'FAO also finds that trade restrictions can transfer instability. Alternatives add resilience only if they meet volume, quality, compliance and delivered-cost requirements.',
      takeaway: 'Diversification creates resilience only when alternatives meet volume, quality, compliance and delivered-cost requirements.',
    },
  },
  'agri-commodities-m5-8': {
    heading: 'An alternative route or regional chain protects supply only if qualified before disruption',
    intro: 'As origins, destinations and routes shift, procurement and distribution models add alternative routes and regional chains. Their value depends on when they were tested.',
    spec: {
      layout: 'decision', title: '08 How Are Procurement and Distribution Models Changing?', kicker: '',
      root: { label: 'Main route at risk', detail: 'Weather, geopolitics, freight or policy change' },
      question: 'Is an alternative route or regional chain already qualified?',
      branches: [
        { condition: 'Qualified before disruption', outcome: 'Switch with limited loss', detail: 'Meets volume, quality, compliance and delivered cost', tone: 'positive' },
        { condition: 'Identified but untested', outcome: 'Qualify it now', detail: 'Check volume, quality and compliance before relying on it', tone: 'caution' },
        { condition: 'No alternative', outcome: 'Exposed when the route fails', detail: 'Supply stops until a new chain is found', tone: 'negative' },
      ],
      note: 'Qualify alternatives before disruption rather than after a route fails.',
      takeaway: 'Diversification creates resilience only when alternatives meet volume, quality, compliance and delivered-cost requirements.',
    },
  },
  'agri-commodities-m5-9': {
    heading: 'Value-added processing pays only when margin outweighs yield, energy and utilization costs',
    intro: 'Markets are moving from raw exports toward standardized, processed, packaged or specialty products. A higher selling price does not by itself mean a higher return.',
    spec: {
      layout: 'driverTree', title: '09 How Are Quality Standards and Value-Added Processing Reshaping Markets?', kicker: '',
      root: { label: 'Return on processing investment', detail: 'Realized margin against operating and capital cost' },
      drivers: [
        { label: 'Realized margin', detail: 'Selling price for a defined customer need', children: [{ label: 'Quality upgrade' }, { label: 'Differentiation' }] },
        { label: 'Operating efficiency', detail: 'Cost of deeper processing', children: [{ label: 'Yield' }, { label: 'Energy' }, { label: 'Utilization' }] },
        { label: 'Capital and supply', detail: 'What the plant depends on', children: [{ label: 'Local investment' }, { label: 'Industrial partnership' }, { label: 'Stable supply and offtake' }] },
      ],
      note: 'Higher selling price can still produce lower return when yield, energy and utilization are weak.',
      takeaway: 'Processing creates value when a defined customer need and realized margin justify operating and capital cost.',
    },
  },
  'agri-commodities-m5-10': {
    heading: 'Safety and trade rules must be built in from sourcing, not checked at the port',
    intro: 'Customs, SPS, quality, origin, documentation and destination-market requirements all apply to a shipment. Compliance has to be designed in before contracting.',
    spec: {
      layout: 'flow', title: '10 How Do Trade Policies and Food Safety Requirements Affect Commodities?', kicker: '',
      steps: [
        { label: 'Regulatory monitoring', detail: 'Track current product and destination rules' },
        { label: 'Product safety at source', detail: 'Source lots that meet residue and SPS limits' },
        { label: 'Traceability', detail: 'Link each lot to origin, handling and processing' },
        { label: 'Documents and customs', detail: 'Complete paperwork before shipment' },
        { label: 'Cargo cleared on arrival', detail: 'Avoids delay or rejection', kind: 'outcome' },
      ],
      note: 'A cargo can be delayed or rejected when paperwork or residue compliance is deficient. Verify current rules with competent authorities.',
      takeaway: 'Compliance must be designed into sourcing and execution before contracting and shipment.',
    },
  },
  'agri-commodities-m5-11': {
    heading: 'A compliant shipment carries trade documents, supplier compliance and destination rules',
    intro: 'Requirements on documentation, origin, quality and safety are tightening by product and destination. Each falls into one of three groups a trader must cover.',
    spec: {
      layout: 'taxonomy', title: '11 How Are Sustainability and Traceability Requirements Changing?', kicker: '',
      root: 'What a compliant shipment must carry', rootDetail: 'Requirement groups — all must be met',
      groups: [
        { label: 'Trade documents', detail: 'Paperwork that clears the border', items: ['Customs documents', 'Origin documentation'] },
        { label: 'Supplier compliance', detail: 'Evidence from the supply base', items: ['SPS requirements', 'Residue limits', 'Quality specification'] },
        { label: 'Destination-market rules', detail: 'Product-specific and changing; verify with competent authorities' },
      ],
      note: 'A cargo can be delayed or rejected when paperwork or residue compliance is deficient.',
      takeaway: 'Compliance must be designed into sourcing and execution before contracting and shipment.',
    },
  },
  'agri-commodities-m5-12': {
    heading: 'Weather hits yield, quality, timing, suppliers and cost, and each needs its own response',
    intro: 'Weather affects yield, quality, timing, supplier viability, cost and market access. Treating climate as a supply-security and finance issue means matching a response to each effect.',
    spec: {
      layout: 'table', title: '12 What Climate and Environmental Risks Affect Agricultural Supply Chains?', kicker: '',
      headers: ['Climate effect', 'What it puts at risk', 'Response'],
      rows: [
        { label: 'Yield', a: 'Volume available to buy', b: 'Production resilience support' },
        { label: 'Quality', a: 'Grade and avoidable loss', b: 'Better drying and storage after harvest' },
        { label: 'Timing', a: 'Delivery schedules', b: 'Sourcing diversity across origins' },
        { label: 'Supplier viability', a: 'The supply base itself', b: 'Commercially feasible producer support' },
        { label: 'Cost and market access', a: 'Finance and buyer acceptance', b: 'Climate assessment using environmental data' },
      ],
      note: 'Better drying and storage can reduce avoidable post-harvest loss after a difficult harvest. Prioritize measurable outcomes.',
      takeaway: 'Climate resilience is a supply-security and finance issue, not merely a brand message.',
    },
  },
  'agri-commodities-m5-13': {
    heading: 'Future growth comes from layering new origins, processing and digital capability onto existing strengths',
    intro: 'Growth adds new origins, customers, commodities and services onto capabilities a trader already has, in a way its capital and risk capacity can support.',
    spec: {
      layout: 'taxonomy', title: '13 What Factors Will Drive Future Agricultural Commodity Demand?', kicker: '',
      root: 'Growth levers on existing capability', rootDetail: 'Options to combine — fit to sourcing strengths and capital',
      groups: [
        { label: 'Geographic expansion', detail: 'Reach new demand', items: ['New origins', 'New customers'] },
        { label: 'Processing', detail: 'Commit once services prove demand' },
        { label: 'Digital capability', detail: 'Data that supports sourcing and sales' },
        { label: 'Added services', detail: 'Quality and logistics services first', items: ['Quality services', 'Logistics services'] },
      ],
      note: 'An originator adds quality and logistics services before committing to a large processing asset.',
      takeaway: 'Sustainable growth fits the trader’s sourcing strengths, customer relationships, capital and risk capacity.',
    },
  },
  'agri-commodities-m5-14': {
    heading: 'Each new opportunity faces a stop-or-scale test before more capital goes in',
    intro: 'New commodities, customers and integrated services can widen a portfolio. Staged investment with utilization and margin criteria decides which ones to scale.',
    spec: {
      layout: 'decision', title: '14 Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      root: { label: 'New opportunity', detail: 'Portfolio diversity or an integrated service' },
      question: 'Does it fit sourcing strengths, customer relationships, capital and risk capacity, and meet utilization and margin criteria?',
      branches: [
        { condition: 'Fits and meets criteria', outcome: 'Scale in the next stage', detail: 'Release further investment in steps', tone: 'positive' },
        { condition: 'Fits, not yet proven', outcome: 'Start with integrated services', detail: 'Add quality and logistics before a large asset', tone: 'caution' },
        { condition: 'Does not fit', outcome: 'Stop', detail: 'Avoid stretching capital and risk capacity', tone: 'negative' },
      ],
      note: 'Use staged investment with utilization, margin and stop-or-scale criteria.',
      takeaway: 'Sustainable growth fits the trader’s sourcing strengths, customer relationships, capital and risk capacity.',
    },
  },
  'agri-commodities-m5-15': {
    heading: 'Future position comes from value captured along each chain, not export turnover',
    intro: 'Positioning spans producer aggregation, preservation, processing, market development and commercial controls. Coffee exports were about US$8.57B and rice US$4.02B in 2025, so each chain must be judged separately.',
    spec: {
      layout: 'flow', title: '15 How Should Commodity Businesses Position for Future Competition?', kicker: '',
      steps: [
        { label: 'Modern origination', detail: 'Producer aggregation with reliable lot data' },
        { label: 'Post-harvest', detail: 'Preservation that protects quality' },
        { label: 'Value-added export', detail: 'Processing for defined customer needs' },
        { label: 'Market diversity', detail: 'Market development beyond a few buyers' },
        { label: 'Quality, reliability and value capture', kind: 'outcome' },
      ],
      loop: 'Traceability and risk management are commercial controls applied at every stage.',
      note: 'The 2025 coffee (about US$8.57B) and rice (US$4.02B) figures are export value, not physical volume, trader revenue or profit; evaluate each chain separately.',
      takeaway: 'Vietnam can improve quality, reliability and value capture rather than pursuing export turnover alone.',
    },
  },
};
