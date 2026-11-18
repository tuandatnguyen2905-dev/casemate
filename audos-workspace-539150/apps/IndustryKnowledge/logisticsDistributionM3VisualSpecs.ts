import type { LogisticsDistributionChapterVisual } from './logisticsDistributionVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Distribution & Market Expansion Services Module 03 (business models, segments, economics, channels, ecosystem), keyed by visualKind. */
export const LOGISTICS_DISTRIBUTION_M3_VISUALS: Record<string, LogisticsDistributionChapterVisual> = {
  'logistics-distribution-m3-1': {
    heading: 'A buy-and-resell distributor owns the goods and funds the cycle until the customer pays',
    intro: 'The provider purchases inventory, sets or executes channel terms, sells to customers and funds stock and receivables. The margin between buy and sell price has to absorb every cost along the way.',
    spec: {
      layout: 'flow', title: '01 Buy-and-Resell Distribution', kicker: '',
      steps: [
        { label: 'Buy from the principal', detail: 'Takes inventory title at the buy price', owner: 'Distributor' },
        { label: 'Hold and fund stock', detail: 'Inventory sits on the distributor’s balance sheet', owner: 'Distributor' },
        { label: 'Sell on channel terms', detail: 'Sets or executes the sell price and credit terms', owner: 'Distributor → customer' },
        { label: 'Collect receivables', detail: 'Customer credit is funded until payment arrives', owner: 'Distributor' },
        { label: 'Gross margin', detail: 'Must absorb handling, trade support, returns, credit and overhead', kind: 'outcome' },
      ],
      note: 'Confirm principal status from contract and control, not labels.',
      takeaway: 'A buy-sell distributor recognizes resale economics when it controls goods and bears commercial risks under applicable accounting.',
    },
  },
  'logistics-distribution-m3-2': {
    heading: 'Who owns the stock decides what the intermediary can report as revenue',
    intro: 'Agents arrange sales for fees, while consignment keeps inventory ownership with the principal until defined events. Both shift inventory exposure away from the intermediary.',
    spec: {
      layout: 'table', title: '02 Agency, Commission and Consignment Models', kicker: '',
      headers: ['Model', 'Who owns the inventory', 'What the intermediary earns and reports'],
      rows: [
        { label: 'Buy-and-resell (contrast)', a: 'The distributor, after purchase', b: 'Resale revenue and margin' },
        { label: 'Agency / commission', a: 'The principal', b: 'A fee or commission for arranging the sale — not gross merchandise value' },
        { label: 'Consignment', a: 'The principal, until defined events', b: 'Depends on the events and terms in the contract' },
      ],
      note: 'Whatever the model, define invoicing, credit, loss and return responsibility in writing.',
      takeaway: 'Agency and consignment can reduce inventory exposure but alter control and revenue presentation.',
    },
  },
  'logistics-distribution-m3-3': {
    heading: 'Integrated providers bundle selected market-entry capabilities under one accountable model',
    intro: 'Services can include research, regulatory support, channel development, field sales, fulfillment and customer service. A principal selects the modules it needs; not every engagement includes owning stock.',
    spec: {
      layout: 'taxonomy', title: '03 Integrated Market Expansion Services', kicker: '',
      root: 'Integrated market expansion services', rootDetail: 'Selectable capabilities — a principal picks the combination it needs',
      groups: [
        { label: 'Market insight', detail: 'Research before and during entry' },
        { label: 'Import', detail: 'Regulatory support for bringing product in' },
        { label: 'Sales', detail: 'Channel development and field sales' },
        { label: 'Marketing', detail: 'Building demand for the brand' },
        { label: 'Distribution', detail: 'Fulfillment to customers' },
        { label: 'After-sales', detail: 'Customer service once the product is sold' },
      ],
      note: 'A fee-based launch team can build demand without owning stock. Separate each service, asset and risk in profitability reporting.',
      takeaway: 'Integrated providers combine selected market-entry and execution capabilities under one accountable model.',
    },
  },
  'logistics-distribution-m3-4': {
    heading: 'Consumer availability rests on dense coverage, replenishment and trade execution',
    intro: 'Fast-moving portfolios require SKU planning, outlet segmentation, promotions and returns controls. Each driver below has to work for product to stay available and fresh on shelf.',
    spec: {
      layout: 'driverTree', title: '04 FMCG and Consumer Distribution', kicker: '',
      root: { label: 'Consumer availability', detail: 'Product on shelf where and when shoppers buy' },
      drivers: [
        { label: 'Dense coverage', detail: 'Outlet breadth guided by outlet segmentation', children: [{ label: 'Outlet breadth' }, { label: 'Outlet segmentation' }] },
        { label: 'Replenishment', detail: 'High-frequency orders planned by SKU', children: [{ label: 'High frequency' }, { label: 'SKU planning' }] },
        { label: 'Trade execution', detail: 'Promotions that move sell-out, not only sell-in', children: [{ label: 'Promotion' }] },
        { label: 'Expiry and returns control', detail: 'Weak sell-out after high sell-in creates expiry', op: '−', children: [{ label: 'Expiry' }, { label: 'Returns controls' }] },
      ],
      note: 'High sell-in can create expiry if sell-out is weak. Design GT and MT economics separately.',
      takeaway: 'Consumer distribution depends on dense coverage, replenishment and trade execution.',
    },
  },
  'logistics-distribution-m3-5': {
    heading: 'Specialized categories add capability requirements that outlet coverage alone cannot meet',
    intro: 'Healthcare and industrial routes can require documentation, controlled handling, technical selling and account support. Each requirement must be in place before repeat orders follow.',
    spec: {
      layout: 'table', title: '05 Healthcare, Specialty and Industrial Distribution', kicker: '',
      headers: ['Capability', 'What the route requires', 'Why broad coverage falls short'],
      rows: [
        { label: 'Qualification', a: 'Documentation for the category', b: 'Reach does not prove the partner may handle it' },
        { label: 'Traceability', a: 'Controlled handling of product', b: 'Product must be tracked, not just delivered' },
        { label: 'Technical sale', a: 'Demonstration and technical selling', b: 'Order taking does not explain the product' },
        { label: 'Service', a: 'Account support and after-sales service', b: 'Repeat orders can depend on it' },
        { label: 'Compliance', a: 'Current product-specific requirements only', b: 'General rules may not apply to the product' },
      ],
      note: 'A technical product may need demonstration and after-sales service before repeat orders.',
      takeaway: 'Specialized categories require capabilities beyond broad outlet coverage.',
    },
  },
  'logistics-distribution-m3-6': {
    heading: 'Start from the outcome the customer will measure, then pick the service package',
    intro: 'Providers bundle field sales, merchandising, account management, digital operations and reporting. Each package should be priced for its service intensity and tied to a measurable result.',
    spec: {
      layout: 'pathway', title: '06 Commercial Service Packages', kicker: '',
      trunk: [
        { label: 'Agree the measurable outcome', detail: 'e.g. outlet compliance and availability' },
        { label: 'Price intensity and data', detail: 'Make service intensity and data requirements explicit' },
      ],
      optionsLabel: 'Packages a provider can bundle — chosen per outcome, not run in sequence',
      options: [
        { label: 'Sales outsourcing', detail: 'Field sales on the principal’s behalf' },
        { label: 'Merchandising', detail: 'Paid on outlet compliance and availability, not owned-inventory margin' },
        { label: 'Key account', detail: 'Account management with major customers' },
        { label: 'E-commerce', detail: 'Digital channel operations' },
        { label: 'Analytics', detail: 'Reporting on execution and results' },
      ],
      note: 'A merchandising contract can use outlet compliance and availability rather than owned-inventory margin.',
      takeaway: 'Service packages should tie activities to measurable customer outcomes.',
    },
  },
  'logistics-distribution-m3-7': {
    heading: 'A market entrant chooses between learning first and immediate national coverage',
    intro: 'Local and international manufacturers compare partners on channels, capability, governance and economics. A new entrant may prioritize learning and controlled pilots over immediate national coverage.',
    spec: {
      layout: 'decision', title: '07 Brand Owners and Market Entrants', kicker: '',
      root: { label: 'Principal selecting a route to market', detail: 'Weighs speed, control, coverage, insight and compliance' },
      question: 'Does the principal have enough market insight and partner visibility to scale now?',
      branches: [
        { condition: 'New entrant, limited insight', outcome: 'Run a controlled pilot', detail: 'Prioritize learning before national coverage', tone: 'caution' },
        { condition: 'Launch gates met, data flowing', outcome: 'Expand coverage stage by stage', detail: 'Each gate unlocks the next step', tone: 'positive' },
        { condition: 'Partner will not share data or accept brand control', outcome: 'Do not appoint on these terms', detail: 'Visibility and brand control would be lost', tone: 'negative' },
      ],
      note: 'Set launch gates and data rights in the partner agreement.',
      takeaway: 'Principals seek faster market access without losing visibility or brand control.',
    },
  },
  'logistics-distribution-m3-8': {
    heading: 'Retail chains and independent outlets buy in different ways and need different service',
    intro: 'Chains use centralized procurement while independent outlets depend more on field relationships and route service. The same product therefore needs two different ways of winning and serving the customer.',
    spec: {
      layout: 'compare', title: '08 Retail Chains and Independent Outlets', kicker: '',
      leftTitle: 'Retail chains', rightTitle: 'Independent outlets',
      rows: [
        { label: 'Buying process', a: 'Centralized procurement', b: 'Field relationships, outlet by outlet' },
        { label: 'Terms', a: 'Negotiated at account level', b: 'Set through route service and credit' },
        { label: 'Availability', a: 'One listing covers many stores, but each store must still be in stock', b: 'Depends on regular route visits' },
        { label: 'Service', a: 'Store-level execution after the listing', b: 'Route service and relationship' },
        { label: 'Assortment', a: 'Decided centrally for the chain', b: 'Decided by each outlet' },
      ],
      note: 'Separate account negotiation from execution.',
      takeaway: 'Retail customers differ in buying process, scale, service and bargaining power.',
    },
  },
  'logistics-distribution-m3-9': {
    heading: 'B2B demand is won on specification and kept through repeat service',
    intro: 'Institutions and industrial customers buy against specifications, service levels and account terms. Each stage of the relationship has to hold for the account to reorder.',
    spec: {
      layout: 'flow', title: '09 Institutional, B2B and Channel Partners', kicker: '',
      steps: [
        { label: 'Meet the specification', detail: 'Offer a fit-for-purpose solution', owner: 'Provider' },
        { label: 'Agree the contract', detail: 'Service levels and account terms', owner: 'Provider and customer' },
        { label: 'Deliver reliably', detail: 'Perform to the agreed service level', owner: 'Provider' },
        { label: 'Support technically', detail: 'Help the customer use the product', owner: 'Provider' },
        { label: 'Retention', detail: 'Repeat orders from the account', kind: 'outcome' },
      ],
      loop: 'Repeat service is what brings the next order.',
      note: 'Order value can be high while frequency and concentration create risk. Track retention, concentration and cost-to-serve.',
      takeaway: 'B2B demand often depends on repeat service and fit-for-purpose solutions.',
    },
  },
  'logistics-distribution-m3-10': {
    heading: 'From a USD100 sell price to USD15 contribution on one hypothetical order',
    intro: 'Distributor economics begin with net sales less product and order-specific commercial costs. This worked example is for learning only, not a market benchmark.',
    spec: {
      layout: 'waterfall', title: '10 Revenue and Distributor Unit Economics', kicker: '',
      unit: 'USD per order', basis: H,
      items: [
        { label: 'Sell price', value: 100, kind: 'start' },
        { label: 'Discount', value: 5, kind: 'subtract' },
        { label: 'Net sales', value: 95, kind: 'total' },
        { label: 'Buy cost', value: 70, kind: 'subtract' },
        { label: 'Handling', value: 8, kind: 'subtract' },
        { label: 'Expected credit loss', value: 2, kind: 'subtract' },
        { label: 'Contribution', value: 15, kind: 'total' },
      ],
      note: `${H}. Treat the assumptions as education, not market benchmarks. Resale revenue, commissions and service fees require separate recognition and margin bases.`,
      takeaway: 'Distributor economics begin with net sales less product and order-specific commercial costs.',
    },
  },
  'logistics-distribution-m3-11': {
    heading: 'Move visits, orders, order value and team size to see how coverage turns into sales',
    intro: 'Sales per outlet, visit and representative link territory activity to output. The default values reproduce the chapter’s hypothetical: 200 visits, 80 orders at USD150 and 10 representatives.',
    spec: {
      layout: 'scenario', title: '11 Route-to-Market Productivity', kicker: H,
      inputs: [
        { key: 'visits', label: 'Outlet visits', min: 100, max: 400, step: 10, value: 200, unit: 'visits' },
        { key: 'orders', label: 'Orders taken', min: 20, max: 100, step: 5, value: 80, unit: 'orders' },
        { key: 'aov', label: 'Average order value', min: 50, max: 300, step: 10, value: 150, unit: 'USD' },
        { key: 'reps', label: 'Sales representatives', min: 5, max: 20, step: 1, value: 10, unit: 'reps' },
      ],
      outputs: [
        { label: 'Strike rate (orders ÷ visits)', unit: '%', digits: 0, compute: (v) => (v.orders / v.visits) * 100 },
        { label: 'Sales per visit', unit: 'USD', digits: 0, compute: (v) => (v.orders * v.aov) / v.visits },
        { label: 'Sales per representative', unit: 'USD', digits: 0, compute: (v) => (v.orders * v.aov) / v.reps },
      ],
      assumption: `${H}. Illustrative inputs, not market data. Define eligible visits, returns and period consistently before comparing territories.`,
      takeaway: 'Coverage must translate into productive orders and profitable sales.',
    },
  },
  'logistics-distribution-m3-12': {
    heading: 'Profitable growth needs commercial, service, cash and return measures read together',
    intro: 'Net sales, margins, distribution, productivity, service, inventory, receivables and return on working capital use different denominators. Each branch answers a different question about the same business.',
    spec: {
      layout: 'driverTree', title: '12 KPIs, Working Capital and Profitable Growth', kicker: '',
      root: { label: 'Profitable growth', detail: 'Growth alone is not profit' },
      formula: 'HYPOTHETICAL: USD1.2m net sales − USD750k product − USD120k trade − USD180k distribution = USD150k contribution',
      drivers: [
        { label: 'Commercial reach', detail: 'Share of outlets stocking, and their sales weight', children: [{ label: 'Numeric distribution' }, { label: 'Weighted distribution' }] },
        { label: 'Service', detail: 'Orders delivered complete and on time', children: [{ label: 'Fill rate' }, { label: 'OTIF' }] },
        { label: 'Cost of growth', detail: 'Trade spend deducted before contribution', op: '−', children: [{ label: 'Trade spend' }] },
        { label: 'Cash tied up', detail: 'Days of inventory and receivables', op: '−', children: [{ label: 'DIO' }, { label: 'DSO' }] },
        { label: 'Return', detail: 'Contribution relative to working capital employed', children: [{ label: 'ROWC' }] },
      ],
      note: 'The formula is a hypothetical worked example. State working-capital and return methodology when reporting these KPIs.',
      takeaway: 'Performance needs aligned commercial, service, cash and return measures.',
    },
  },
  'logistics-distribution-m3-13': {
    heading: 'GT and MT split into two sales organizations that must reconnect at the shelf',
    intro: 'Independent outlets emphasize territory routes; chains emphasize centralized negotiation and store compliance. A national listing does not guarantee shelf availability, so both routes end in field checks.',
    spec: {
      layout: 'pathway', title: '13 General and Modern Trade', kicker: '',
      trunk: [{ label: 'Principal portfolio', detail: 'The same products reach shoppers through both trade types' }],
      optionsLabel: 'Two routes with different organizations, terms and execution',
      options: [
        { label: 'GT — general trade', detail: 'Independent outlets served on territory routes', items: ['Field sale', 'Route service'] },
        { label: 'MT — modern trade', detail: 'Chains reached through centralized negotiation', items: ['Key account', 'Listing', 'Store compliance'] },
      ],
      afterLabel: 'Shared check',
      after: [{ label: 'Field audits', detail: 'Coordinate account plans with audits of actual shelf availability', kind: 'outcome' }],
      note: 'A national listing does not guarantee shelf availability.',
      takeaway: 'GT and MT require different sales organizations, terms and execution.',
    },
  },
  'logistics-distribution-m3-14': {
    heading: 'Convenience, pharmacy and specialist stores each serve a different shopper mission',
    intro: 'Convenience, pharmacy and specialist stores vary in assortment, data, regulation and replenishment. Each channel needs its own rules rather than borrowed FMCG assumptions.',
    spec: {
      layout: 'taxonomy', title: '14 Convenience, Pharmacy and Specialty Channels', kicker: '',
      root: 'Specialty channels', rootDetail: 'Distinct shopper missions and operating requirements — not one route',
      groups: [
        { label: 'Convenience', detail: 'Frequent, mission-driven visits', items: ['Frequency', 'Replenishment'] },
        { label: 'Pharmacy', detail: 'Health products with category-specific rules', items: ['Qualification', 'Regulation'] },
        { label: 'Specialist stores', detail: 'Focused assortment and expert service', items: ['Assortment', 'Service'] },
      ],
      note: 'A health product route should not inherit FMCG assumptions without verification. Use category-specific channel rules.',
      takeaway: 'Specialty channels create distinct shopper missions and operating requirements.',
    },
  },
  'logistics-distribution-m3-15': {
    heading: 'Each added route widens access and brings its own conflict to govern',
    intro: 'Digital, direct and partner channels must coordinate assortment, service, data and returns. Set channel roles and conflict rules before scaling any of them.',
    spec: {
      layout: 'table', title: '15 E-Commerce, Direct B2B and Hybrid Networks', kicker: '',
      headers: ['Route', 'What it adds', 'Conflict to govern'],
      rows: [
        { label: 'Marketplace', a: 'Online reach to new shoppers', b: 'Online discounting can undermine retailer trust' },
        { label: 'D2C', a: 'Direct relationship with consumers', b: 'Customer ownership versus partners' },
        { label: 'Direct B2B', a: 'Direct service to business customers', b: 'Accounts partners may also serve' },
        { label: 'Omnichannel', a: 'Coordinated assortment, service, data and returns', b: 'Shared pricing and inventory across routes' },
      ],
      note: 'Online discounting can undermine retailer trust when governance is unclear. Set channel roles and conflict rules before scale.',
      takeaway: 'Hybrid routes expand access but create pricing, inventory and customer-ownership conflicts.',
    },
  },
  'logistics-distribution-m3-16': {
    heading: 'The distributor sits between principal and retailer, exchanging product, money, data and risk',
    intro: 'Contracts define who owns inventory, serves customers and funds terms. A retailer is a customer of the distributor and a seller to shoppers, not the distributor itself.',
    spec: {
      layout: 'ecosystem', title: '16 Manufacturers, Distributors and Retailers', kicker: '',
      center: { label: 'Distributor', detail: 'Role and inventory ownership set by contract' },
      actors: [
        { label: 'Principal (manufacturer)', relation: 'Grants rights and supplies product; receives payment and sales data', flows: ['product', 'money', 'information'] },
        { label: 'Retailer', relation: 'Buys from the distributor on terms that someone must fund', flows: ['product', 'money', 'risk'] },
        { label: 'Shoppers', relation: 'Buy from the retailer, not from the distributor', flows: ['product', 'money'] },
        { label: 'Contract', relation: 'Defines who owns inventory, serves customers and funds terms', flows: ['oversight', 'risk'] },
      ],
      note: 'Map each legal entity to its channel role before analyzing economics.',
      takeaway: 'Core parties exchange products, rights, data, money and risk.',
    },
  },
  'logistics-distribution-m3-17': {
    heading: 'Enabling partners carry stock, data and cash without owning demand',
    intro: 'Logistics providers, software firms and financial institutions support stock, orders, data and working capital. Each relationship still needs its own governance.',
    spec: {
      layout: 'table', title: '17 Logistics, Technology and Finance Partners', kicker: '',
      headers: ['Partner', 'What it supports', 'What to govern'],
      rows: [
        { label: '3PL', a: 'Stock movement and storage', b: 'Service scope and stock visibility' },
        { label: 'DMS', a: 'Orders and distributor data', b: 'System access' },
        { label: 'SFA', a: 'Field orders and visit data', b: 'System access and data use' },
        { label: 'Bank', a: 'Working capital, e.g. invoice finance', b: 'Credit exposure' },
        { label: 'Insurer', a: 'Cover for commercial risks', b: 'Credit exposure' },
      ],
      note: 'Invoice finance may improve liquidity without changing sell-out economics.',
      takeaway: 'Enabling partners support execution without necessarily owning commercial demand.',
    },
  },
  'logistics-distribution-m3-18': {
    heading: 'Market access touches five areas of obligation that depend on role, product and jurisdiction',
    intro: 'Market access can involve trade, product, consumer, competition and data requirements. Which ones apply depends on the role, the product and the jurisdiction, so each must be checked against current official sources.',
    spec: {
      layout: 'taxonomy', title: '18 Regulators and Responsible Operations', kicker: '',
      root: 'Areas of obligation', rootDetail: 'Role-, product- and jurisdiction-specific — check each against current official sources',
      groups: [
        { label: 'Trade rule', detail: 'Who may trade and in which activities' },
        { label: 'Product rule', detail: 'Requirements tied to the specific product' },
        { label: 'Competition', detail: 'How the business deals with rivals and customers' },
        { label: 'Consumer', detail: 'How products and offers reach shoppers' },
        { label: 'Data', detail: 'How customer and outlet data are handled' },
      ],
      note: 'A service portfolio does not prove permission for every regulated activity. Verify current official sources before publishing legal claims.',
      takeaway: 'Commercial operations are subject to role-, product- and jurisdiction-specific obligations.',
    },
  },
};
