import type { LogisticsDistributionChapterVisual } from './logisticsDistributionVisualSpecs';

/** Chapter-specific Learning Visuals for Distribution & Market Expansion Services Module 05 (trends and growth outlook), keyed by visualKind. */
export const LOGISTICS_DISTRIBUTION_M5_VISUALS: Record<string, LogisticsDistributionChapterVisual> = {
  'logistics-distribution-m5-1': {
    heading: 'Shoppers spread their missions across several formats at once rather than switching to one',
    intro: 'Consumers use neighborhood stores, chains, specialty stores and digital platforms for different missions. Formats coexist; none simply replaces the others.',
    spec: {
      layout: 'taxonomy', title: '01 Changing Retail Formats and Shopping Missions', kicker: '',
      root: 'Retail formats in use', rootDetail: 'Used side by side for different missions — not a linear replacement cycle',
      groups: [
        { label: 'Independent store', detail: 'Neighborhood stores close to home' },
        { label: 'Supermarket', detail: 'Chain stores for planned shopping' },
        { label: 'Convenience', detail: 'Can prioritize immediate availability' },
        { label: 'Specialty', detail: 'Specialty stores for focused needs' },
        { label: 'Platform', detail: 'Digital platforms' },
      ],
      note: 'Convenience can prioritize immediate availability while planned shopping emphasizes assortment and value. Use mission and category evidence by channel.',
      takeaway: 'Demand fragments across formats rather than moving through one linear replacement cycle.',
    },
  },
  'logistics-distribution-m5-2': {
    heading: 'An omnichannel purchase passes through five touchpoints that must stay consistent',
    intro: 'Omnichannel routes coordinate product, price, inventory, content and service without assuming identical economics. An online order may be fulfilled by a store, warehouse or partner with different costs.',
    spec: {
      layout: 'flow', title: '02 Omnichannel Purchasing and Availability', kicker: '',
      steps: [
        { label: 'Discovery', detail: 'Consistent product content and price across channels' },
        { label: 'Order', detail: 'Placed in whichever channel the customer chooses' },
        { label: 'Fulfillment', detail: 'From a store, warehouse or partner — each at a different cost', kind: 'decision' },
        { label: 'Return', detail: 'Handled under the same service promise' },
        { label: 'Service', detail: 'Consistent availability and information', kind: 'outcome' },
      ],
      note: 'Define channel ownership and the service promise for each step.',
      takeaway: 'Customers expect consistent availability and information across connected channels.',
    },
  },
  'logistics-distribution-m5-3': {
    heading: 'Principals now expect execution evidence, not just delivered cases',
    intro: 'Market access increasingly combines availability, content, service and measurable performance. A principal can require outlet-level sell-out and promotion evidence.',
    spec: {
      layout: 'compare', title: '03 Market Access Expectations', kicker: '',
      leftTitle: 'Product movement only', rightTitle: 'Execution insight partner',
      rows: [
        { label: 'What is delivered', a: 'Product moved into outlets', b: 'Availability, content and service' },
        { label: 'Information', a: 'Shipments and invoices', b: 'Outlet-level sell-out and promotion evidence' },
        { label: 'How value is judged', a: 'Volume moved', b: 'Measurable performance' },
        { label: 'Data ambition', a: 'Limited', b: 'Balanced with consent, quality and cost' },
      ],
      note: 'Balance data ambition with consent, quality and cost.',
      takeaway: 'Brands and retailers expect distribution partners to deliver execution insight, not only product movement.',
    },
  },
  'logistics-distribution-m5-4': {
    heading: 'SFA and DMS should only digitize workflows that are already sound',
    intro: 'Systems support route planning, order capture, stock visibility, collections and supervision. Automating a broken territory design scales poor decisions.',
    spec: {
      layout: 'decision', title: '04 Sales Force Automation and DMS', kicker: '',
      root: { label: 'SFA / DMS rollout', detail: 'Covers outlet master, visit, order, inventory and collection workflows' },
      question: 'Are the territory design, the outlet and SKU masters and field adoption reliable?',
      branches: [
        { condition: 'Yes — clean masters, field adoption', outcome: 'Digitize the workflows', detail: 'Route planning, order capture, stock visibility and collections', tone: 'positive' },
        { condition: 'Masters incomplete or duplicated', outcome: 'Clean outlet and SKU masters first', detail: 'Before any optimization', tone: 'caution' },
        { condition: 'Territory design is broken', outcome: 'Fix the design before automating', detail: 'Automation would scale poor decisions', tone: 'negative' },
      ],
      note: 'Clean outlet and SKU masters before optimization.',
      takeaway: 'SFA and DMS digitize workflows when field adoption and master data are reliable.',
    },
  },
  'logistics-distribution-m5-5': {
    heading: 'Forecasts and store images narrow attention to the exceptions that need action',
    intro: 'Demand forecasts, retail-audit tools and machine vision assist planning and execution. Image recognition should support, not replace, defined audit standards and review.',
    spec: {
      layout: 'flow', title: '05 Forecasting and Retail Execution Technology', kicker: '',
      steps: [
        { label: 'Forecast demand', detail: 'Plan stock and visits ahead of need' },
        { label: 'Image capture', detail: 'Retail-audit tools and machine vision record the shelf' },
        { label: 'Check availability and promotion', detail: 'Compare the shelf with the plan' },
        { label: 'Flag exceptions', detail: 'Focus attention on gaps and opportunities', kind: 'decision' },
        { label: 'Review against audit standards', detail: 'People confirm before acting', kind: 'outcome' },
      ],
      note: 'Pilot accuracy under local store conditions.',
      takeaway: 'Analytics and digital evidence can focus attention on exceptions and opportunities.',
    },
  },
  'logistics-distribution-m5-6': {
    heading: 'AI use cases share one foundation of representative data, governance and human review',
    intro: 'Applications include outlet segmentation, demand prediction, visit planning and anomaly detection. A model trained on urban MT data may misdirect provincial GT teams.',
    spec: {
      layout: 'pathway', title: '06 AI-Enabled Commercial Analytics', kicker: '',
      trunk: [
        { label: 'Representative data', detail: 'Training data that matches the teams it will guide' },
        { label: 'Governance', detail: 'Explainable tests and access controls' },
      ],
      optionsLabel: 'Applications — separate use cases, not a sequence',
      options: [
        { label: 'Segmentation', detail: 'Outlet segmentation' },
        { label: 'Prediction', detail: 'Demand prediction' },
        { label: 'Next best action', detail: 'Visit planning and prioritized actions' },
        { label: 'Anomaly detection', detail: 'Flagging unusual patterns' },
      ],
      afterLabel: 'Before acting',
      after: [{ label: 'Human review', detail: 'People check recommendations before field teams act', kind: 'decision' }],
      note: 'A model trained on urban MT data may misdirect provincial GT teams.',
      takeaway: 'AI can prioritize actions but depends on representative data and governance.',
    },
  },
  'logistics-distribution-m5-7': {
    heading: 'E-commerce contribution depends on commercial and operational pieces working together',
    intro: 'Providers coordinate listings, content, campaigns, fulfillment, customer service and returns. GMV can rise while recognized revenue or contribution remains weak.',
    spec: {
      layout: 'driverTree', title: '07 E-Commerce Integration', kicker: '',
      root: { label: 'Digital channel contribution', detail: 'Not the same as GMV' },
      drivers: [
        { label: 'Marketplace', detail: 'Listings on the platforms used', children: [{ label: 'Listings' }, { label: 'Content' }] },
        { label: 'Campaign', detail: 'Demand-building activity and its cost' },
        { label: 'Inventory', detail: 'Stock available for fulfillment', children: [{ label: 'Fulfillment' }] },
        { label: 'Returns', detail: 'Returns and customer service cost', op: '−', children: [{ label: 'Customer service' }] },
        { label: 'Price conflict', detail: 'Online prices clashing with other channels', op: '−' },
      ],
      note: 'GMV can rise while recognized revenue or contribution remains weak. Track channel economics and price conflict.',
      takeaway: 'Digital distribution requires commercial and operational integration.',
    },
  },
  'logistics-distribution-m5-8': {
    heading: 'A modernizing brand runs several routes in parallel instead of dropping traditional trade',
    intro: 'Brands combine distributors, chains, platforms and direct B2B according to category and geography. A principal may sell directly to chains while a distributor serves GT.',
    spec: {
      layout: 'ecosystem', title: '08 Retail Modernization and Hybrid Routes', kicker: '',
      center: { label: 'Principal (brand)', detail: 'Combines routes by category and geography' },
      actors: [
        { label: 'Chains', relation: 'May be sold to directly by the principal', flows: ['product', 'money'] },
        { label: 'Distributor serving GT', relation: 'Covers traditional trade outlets', flows: ['product', 'money', 'service'] },
        { label: 'Platforms', relation: 'Digital routes to shoppers', flows: ['product', 'information'] },
        { label: 'Direct B2B customers', relation: 'Served without an intermediary', flows: ['product', 'money'] },
      ],
      note: 'Clarify account ownership and shared inventory across the routes.',
      takeaway: 'Modernization adds routes rather than automatically eliminating traditional trade.',
    },
  },
  'logistics-distribution-m5-9': {
    heading: 'An acquisition adds capability only if systems, teams and contracts actually integrate',
    intro: 'Providers can acquire territory, category or technology capability and add value-added services. Acquired coverage may overlap existing routes and raise complexity.',
    spec: {
      layout: 'decision', title: '09 Consolidation and Service Portfolio Expansion', kicker: '',
      root: { label: 'Acquisition target', detail: 'Territory, category or technology capability' },
      question: 'Will its systems, teams and customer contracts integrate without duplicating routes?',
      branches: [
        { condition: 'Integrates and adds new capability', outcome: 'Scale and cross-sell', detail: 'Add value-added services to the combined base', tone: 'positive' },
        { condition: 'Coverage overlaps existing routes', outcome: 'Rationalize before claiming synergy', detail: 'Overlap raises complexity', tone: 'caution' },
        { condition: 'Systems, teams or contracts will not integrate', outcome: 'No real capability gained', detail: 'Scale on paper only', tone: 'negative' },
      ],
      note: 'Validate synergy through productive outlets and returns.',
      takeaway: 'Consolidation creates capability only when systems, teams and customer contracts integrate.',
    },
  },
  'logistics-distribution-m5-11': {
    heading: 'Everyday sales, promotion and data work creates five areas of responsibility',
    intro: 'Sales, promotions, outlet data and analytics can trigger consumer, competition and data obligations. Check current official rules and purpose limitations for each.',
    spec: {
      layout: 'taxonomy', title: '11 Consumer, Competition and Data Responsibilities', kicker: '',
      root: 'Responsibilities in commercial execution', rootDetail: 'Accurate offers, fair conduct and governed data',
      groups: [
        { label: 'Consumer', detail: 'Accurate offers to shoppers' },
        { label: 'Competition', detail: 'Fair conduct in the market' },
        { label: 'Promotion', detail: 'Promotions that match what is delivered' },
        { label: 'Privacy', detail: 'Collect only the personal data the purpose needs' },
        { label: 'Security', detail: 'Governed access to outlet data and analytics' },
      ],
      note: 'A field app should not collect unnecessary personal data because it improves targeting. Verify current official rules and purpose limitations.',
      takeaway: 'Responsible commercial execution requires accurate offers, fair conduct and governed data.',
    },
  },
  'logistics-distribution-m5-12': {
    heading: 'Incentives tied to sell-in push waste; incentives tied to sell-out reduce it',
    intro: 'Providers influence transport, inventory, expiry, trade practices and information quality. Over-ordering to hit sell-in targets can increase returns and waste.',
    spec: {
      layout: 'compare', title: '12 Responsible Commercial Operations', kicker: '',
      leftTitle: 'Driven by sell-in targets', rightTitle: 'Responsible commercial operations',
      rows: [
        { label: 'Ordering', a: 'Over-ordering to hit targets', b: 'Orders aligned with sell-out' },
        { label: 'Returns and waste', a: 'More returns, expiry and waste', b: 'Avoidable returns and waste reduced' },
        { label: 'Route efficiency', a: 'Transport not planned for efficiency', b: 'Efficient routes' },
        { label: 'Conduct', a: 'Trade practices chasing volume', b: 'Responsible selling' },
        { label: 'Claims', a: 'Information quality overlooked', b: 'Accurate information' },
      ],
      note: 'Align incentives with sell-out, service, cash and responsible conduct.',
      takeaway: 'Sustainability includes efficient routes, responsible selling and reduction of avoidable returns and waste.',
    },
  },
  'logistics-distribution-m5-13': {
    heading: 'Vietnam’s expansion opportunity breaks down by consumption, province, channel, category and entry route',
    intro: 'Consumer demand, retail modernization and digital commerce support selective expansion. A fast-growing channel estimate is not distributor revenue or guaranteed profit.',
    spec: {
      layout: 'driverTree', title: '13 Vietnam Market Expansion Opportunities', kicker: '',
      root: { label: 'Expansion opportunity', detail: 'Selective, judged on route economics' },
      drivers: [
        { label: 'Consumption', detail: 'Consumer demand, read from MOIT and NSO measures with explicit basis' },
        { label: 'Province', detail: 'Opportunity varies by geography' },
        { label: 'Channel', detail: 'Retail modernization and digital commerce' },
        { label: 'Category', detail: 'Opportunity varies by category' },
        { label: 'Entry', detail: 'Route economics of the chosen way in' },
      ],
      note: 'A fast-growing channel estimate is not distributor revenue or guaranteed profit.',
      takeaway: 'Vietnam offers growth, but opportunity varies by category, geography and route economics.',
    },
  },
  'logistics-distribution-m5-14': {
    heading: 'Each value-added service must prove it moves availability, productivity or return',
    intro: 'Providers can add analytics, field activation, e-commerce, technical service and customer support. A dashboard is valuable only when it changes availability, productivity or return.',
    spec: {
      layout: 'table', title: '14 Data-Driven and Value-Added Services', kicker: '',
      headers: ['Service', 'What the provider adds', 'Proof it works'],
      rows: [
        { label: 'Insight', a: 'Analytics and dashboards', b: 'Decisions change availability, productivity or return' },
        { label: 'Execution', a: 'Field activation', b: 'Measured change in outlet availability' },
        { label: 'Key account', a: 'Account support with major customers', b: 'Measurable principal problem solved' },
        { label: 'E-commerce', a: 'Digital channel operations', b: 'Channel return, not just activity' },
        { label: 'After-sales', a: 'Technical service and customer support', b: 'Deeper principal relationship' },
      ],
      note: 'Price service scope and prove outcomes.',
      takeaway: 'Higher-value services can deepen relationships when they solve measurable principal problems.',
    },
  },
  'logistics-distribution-m5-15': {
    heading: 'Every future model brings a gain and a matching strategic risk',
    intro: 'Business-model innovation can reduce assets or add services while creating channel, data and capability risks. Stage experiments and compare contribution, cash and retention.',
    spec: {
      layout: 'table', title: '15 Future Models and Strategic Risks', kicker: '',
      headers: ['Future model', 'Potential gain', 'Strategic risk'],
      rows: [
        { label: 'Platform', a: 'Hybrid access to more customers', b: 'Channel conflict' },
        { label: 'Direct route', a: 'Customer insight', b: 'CAC, fulfillment and conflict costs' },
        { label: 'Asset-light services', a: 'Fewer assets and less working capital', b: 'Capability and talent gaps' },
        { label: 'Data-enabled services', a: 'Added services for principals', b: 'Cyber and data risk' },
      ],
      note: 'Stage experiments and compare contribution, cash and retention.',
      takeaway: 'Future growth combines hybrid routes with disciplined risk management.',
    },
  },
};
