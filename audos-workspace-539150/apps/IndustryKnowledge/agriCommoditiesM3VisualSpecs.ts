import type { AgriCommoditiesChapterVisual } from './agriCommoditiesVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Agricultural Commodities & Trading Module 03 (business models), keyed by visualKind. */
export const AGRI_COMMODITIES_M3_VISUALS: Record<string, AgriCommoditiesChapterVisual> = {
  'agri-commodities-m3-1': {
    heading: 'A merchant earns only when a bought lot is delivered and settled above its full cost',
    intro: 'Merchanting means buying commodities, taking ownership and reselling them with inventory, quality and delivery obligations. The spread is realized only after execution.',
    spec: {
      layout: 'flow', title: '01 How Do Agricultural Commodity Businesses Make Money?', kicker: '',
      steps: [
        { label: 'Buy at origin', detail: 'Spot trade: purchase the lot and take ownership', owner: 'Merchant' },
        { label: 'Sell forward delivery', detail: 'Fix grade, quantity, price basis and delivery', owner: 'Merchant and buyer' },
        { label: 'Hold and move the goods', detail: 'Manage storage, quality and logistics', owner: 'Merchant' },
        { label: 'Execute and settle', detail: 'Deliver to specification, pass title, collect payment', owner: 'Merchant and buyer' },
        { label: 'Realized spread after costs', detail: 'Sale value less purchase, storage, logistics and finance', kind: 'outcome' },
      ],
      loop: 'Realized spread and service income fund the next purchase; price direction alone does not.',
      note: 'Example: a merchant buys rice at origin and sells a specified forward delivery while managing storage and logistics.',
      takeaway: 'Physical trading earns from realized spread and service after costs—not price direction alone.',
    },
  },
  'agri-commodities-m3-2': {
    heading: 'Each role holds the commodity at a different point and uses forward contracts for different reasons',
    intro: 'Producers, aggregators, traders and processors all handle the same physical goods, but they take on different ownership, inventory and delivery obligations.',
    spec: {
      layout: 'table', title: '02 How Do Producers, Aggregators, Traders, and Processors Differ?', kicker: '',
      headers: ['Role', 'What it does with the commodity', 'How forward contracts and buyer matching fit'],
      rows: [
        { label: 'Producer', a: 'Grows and harvests the crop', b: 'May agree future delivery at set terms' },
        { label: 'Aggregator', a: 'Consolidates lots from many suppliers', b: 'Matches pooled supply to a buyer specification' },
        { label: 'Trader', a: 'Takes ownership and resells', b: 'Sells forward delivery while holding inventory' },
        { label: 'Processor', a: 'Transforms the commodity into products', b: 'Buys forward to secure input supply' },
      ],
      note: 'A forward contract is a bilateral agreement for future delivery at agreed terms, carrying counterparty and contract risk.',
      takeaway: 'Whatever the role, value comes from realized spread and service after costs—not price direction alone.',
    },
  },
  'agri-commodities-m3-3': {
    heading: 'Owning more stages captures more value but ties up more assets and capital',
    intro: 'Commodity business models range from supplier-network brokerage to owned storage, processing, logistics and merchandising.',
    spec: {
      layout: 'compare', title: '03 How Do Integrated and Asset-Light Commodity Models Compare?', kicker: '',
      leftTitle: 'Asset-light (brokerage)', rightTitle: 'Integrated (asset-based)',
      rows: [
        { label: 'What is owned', a: 'A supplier and buyer network', b: 'Storage, processing, logistics and merchandising' },
        { label: 'Stages captured', a: 'Matching and coordination fees', b: 'Purchasing through to selling and distribution' },
        { label: 'Capital needed', a: 'Low fixed assets', b: 'High fixed assets and working capital' },
        { label: 'Execution complexity', a: 'Relies on counterparties to perform', b: 'Must run every owned stage reliably' },
        { label: 'Example', a: 'Supplier-network brokerage', b: 'Bunge: integrated purchasing, storage, transport, processing, selling' },
      ],
      note: 'Origination-led and processing-led models sit between these poles. Choose assets where reliable supply, utilization and customer demand support lifecycle returns.',
      takeaway: 'Integration can capture more stages but raises fixed assets, working capital and execution complexity.',
    },
  },
  'agri-commodities-m3-4': {
    heading: 'Grains, oilseeds and industrial crops are separate segments with different economics',
    intro: 'Commodities are segmented by physical product, origin, grade, transformation, market liquidity and customer application, so each segment needs its own expertise.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Agricultural Commodities Segmented?', kicker: '',
      root: 'Agricultural commodities', rootDetail: 'Segments — analyse each one separately',
      groups: [
        { label: 'Grains', detail: 'Bulk, liquid markets where scale matters', items: ['Corn', 'Rice'] },
        { label: 'Oilseeds', detail: 'Value depends on transformation into processed products' },
        { label: 'Industrial crops', detail: 'Sold for industrial rather than food application', items: ['Rubber'] },
      ],
      note: 'Each segment can be cut again by origin, grade, transformation, liquidity and customer application. Avoid combining rice, coffee, pepper, cashew and rubber in one undifferentiated benchmark.',
      takeaway: 'Commodity expertise matters because quality, liquidity, processing and end-use requirements differ materially.',
    },
  },
  'agri-commodities-m3-5': {
    heading: 'The tighter the grade and origin specification, the more value rests on proving it',
    intro: 'Bulk corn economics differ from origin-specific coffee or traceable specialty cashew. Grade and specification change what a buyer is actually paying for.',
    spec: {
      layout: 'table', title: '05 How Do Quality Grades and Specifications Affect Product Value?', kicker: '',
      headers: ['Product', 'How it is specified', 'What drives its value'],
      rows: [
        { label: 'Bulk corn', a: 'Standard bulk grade', b: 'Scale and market liquidity' },
        { label: 'Rice', a: 'Grade and quality specification', b: 'Meeting the contracted grade' },
        { label: 'Coffee (soft commodity)', a: 'Origin-specific grade', b: 'Origin and grade together' },
        { label: 'Specialty cashew', a: 'Traceable specialty grade', b: 'Lot traceability and consistency' },
      ],
      note: 'Benchmark each product against its own grade and end use, not against a combined commodity average.',
      takeaway: 'Commodity expertise matters because quality, liquidity, processing and end-use requirements differ materially.',
    },
  },
  'agri-commodities-m3-6': {
    heading: 'What a buyer pays beyond headline price comes from processing and service',
    intro: 'Testing, cleaning, grading, milling, blending, packaging, storage, planning and information all add value beyond the physical sale, if they solve a measurable customer problem.',
    spec: {
      layout: 'driverTree', title: '06 How Do Processing Levels and Product Differentiation Influence Pricing?', kicker: '',
      root: { label: 'Price achieved above headline', detail: 'Paid for consistent delivered specification' },
      formula: 'Service premium counts only if it recovers its own cost',
      drivers: [
        { label: 'Processing', detail: 'Transforms the lot', children: [{ label: 'Cleaning and grading' }, { label: 'Milling and blending' }, { label: 'Packaging' }] },
        { label: 'Quality assurance', detail: 'Proves the specification', children: [{ label: 'Testing' }, { label: 'Consistent delivered grade' }] },
        { label: 'Logistics coordination', detail: 'Delivers on time', children: [{ label: 'Storage' }, { label: 'Reliable replenishment' }] },
        { label: 'Information services', detail: 'Supports buyer decisions', children: [{ label: 'Market intelligence' }, { label: 'Traceability' }, { label: 'Procurement support' }] },
      ],
      note: 'Traceability and quality services require reliable supplier and lot data, not labels alone.',
      takeaway: 'Services differentiate traders when they solve a measurable customer problem and recover their cost.',
    },
  },
  'agri-commodities-m3-7': {
    heading: 'A buyer’s supply base: who sells to it and what each supplier needs back',
    intro: 'Farmers, cooperatives, collectors and local suppliers need aggregation, clear specifications and broader buyer access. Buyers that provide them build a more reliable supply network.',
    spec: {
      layout: 'ecosystem', title: '07 Who Buys Agricultural Commodities?', kicker: '',
      center: { label: 'Commodity buyer', detail: 'Trader or defined purchaser at origin' },
      actors: [
        { label: 'Farmers', relation: 'Sell harvest lots; need reliable payment', flows: ['product', 'money'] },
        { label: 'Cooperatives', relation: 'Consolidate lots; adopt shared moisture testing', flows: ['product', 'information'] },
        { label: 'Collectors', relation: 'Aggregate local supply for the buyer', flows: ['product', 'money'] },
        { label: 'Local suppliers', relation: 'Receive quality guidance and network development', flows: ['service', 'information'] },
      ],
      note: 'Example: a cooperative consolidates lots and adopts shared moisture testing for a defined purchaser.',
      takeaway: 'Strong supplier relationships depend on transparent standards, practical collection and reliable settlement.',
    },
  },
  'agri-commodities-m3-8': {
    heading: 'Procurement works when buyer requirements are matched by what suppliers get in return',
    intro: 'A buyer sets specifications and collection terms; suppliers need practical collection, clear deductions and access to a market. Both sides shape the procurement decision.',
    spec: {
      layout: 'compare', title: '08 What Determines Buyer Requirements and Procurement Decisions?', kicker: '',
      leftTitle: 'What the buyer requires', rightTitle: 'What the supplier needs in return',
      rows: [
        { label: 'Specification', a: 'Defined grade and moisture', b: 'Transparent standards and clear deductions' },
        { label: 'Collection', a: 'Consolidated lots at a usable point', b: 'Practical collection close to the farm' },
        { label: 'Market access', a: 'Dependable volume from the network', b: 'Access to broader buyers' },
        { label: 'Payment', a: 'Terms tied to accepted quality', b: 'Reliable settlement' },
      ],
      note: 'Fair terms and clear deductions support more resilient origination than opportunistic buying alone.',
      takeaway: 'Strong supplier relationships depend on transparent standards, practical collection and reliable settlement.',
    },
  },
  'agri-commodities-m3-9': {
    heading: 'The lowest quote loses if volume, quality or contract terms do not fit the buyer',
    intro: 'Food and feed manufacturers, processors, wholesalers, importers and export buyers choose suppliers on specification, timing and total cost for their own production needs.',
    spec: {
      layout: 'decision', title: '09 How Do Quality, Reliability, and Contracts Affect Supplier Selection?', kicker: '',
      root: { label: 'Candidate supplier', detail: 'Quoted price plus volume, quality and contract terms' },
      question: 'Does it deliver the right specification, on time, at an acceptable total cost?',
      branches: [
        { condition: 'Reliable volume and quality compliance', outcome: 'Select and manage the account', detail: 'Technical fit and account management sustain retention', tone: 'positive' },
        { condition: 'Fits technically, terms too rigid', outcome: 'Negotiate contract flexibility first', detail: 'Align terms with the buyer’s production schedule', tone: 'caution' },
        { condition: 'Cheapest quote, inconsistent supply', outcome: 'Do not select on price alone', detail: 'Shortfalls or off-spec lots cost more than the discount', tone: 'negative' },
      ],
      note: 'A feed mill prioritizes nutrient specification and continuity; a roaster emphasizes coffee grade and origin.',
      takeaway: 'Retention comes from the right specification, timing and total cost—not the lowest quoted price alone.',
    },
  },
  'agri-commodities-m3-10': {
    heading: 'From 60,000 of gross proceeds to a 5,000 gross trading margin',
    intro: 'HYPOTHETICAL 1: a trader buys 100 tonnes at 500 per tonne, pays 2,000 for storage and 3,000 for freight, and sells at 600 per tonne.',
    spec: {
      layout: 'waterfall', title: '10 How Do Agricultural Commodity Traders Generate Revenue?', kicker: H,
      unit: 'currency units', basis: `${H}. 100 tonnes bought at 500 and sold at 600 per tonne.`,
      items: [
        { label: 'Gross proceeds (100 t × 600)', value: 60000, kind: 'start' },
        { label: 'Purchase cost (100 t × 500)', value: 50000, kind: 'subtract' },
        { label: 'Storage', value: 2000, kind: 'subtract' },
        { label: 'Freight', value: 3000, kind: 'subtract' },
        { label: 'Gross trading margin', value: 5000, kind: 'total' },
      ],
      note: 'Illustrative only: total stated direct cost is 55,000, and the margin is before overhead, financing, tax and unlisted losses. Gross turnover can rise with price even when volume or profit falls.',
      takeaway: 'Commodity revenue reflects contracted sales and service activity; gross turnover can rise with price even when physical volume or trading profitability falls.',
    },
  },
  'agri-commodities-m3-11': {
    heading: 'Delivered cost stacks seven cost blocks on top of the purchase price',
    intro: 'Procurement, inland transport, warehousing, handling, conversion, freight, insurance, working capital, currency and risk management all add cost by lot and contract.',
    spec: {
      layout: 'driverTree', title: '11 What Determines Commodity Procurement, Storage, and Trading Costs?', kicker: '',
      root: { label: 'Delivered cost per lot', detail: 'What must be recovered before any margin' },
      formula: 'Purchase + logistics + storage + processing + losses + finance and hedging',
      drivers: [
        { label: 'Purchase cost', detail: 'Price paid at origin' },
        { label: 'Procurement logistics', detail: 'Collection and inland transport' },
        { label: 'Storage', detail: 'Warehousing and insurance' },
        { label: 'Handling and processing', detail: 'Handling and conversion' },
        { label: 'Freight', detail: 'Moving the lot to the buyer' },
        { label: 'Quality loss', detail: 'Shrinkage and downgrades' },
        { label: 'Financing', detail: 'Working capital, currency and hedging costs' },
      ],
      note: 'HYPOTHETICAL 2: prices lift nominal turnover from 1.0 million to 1.3 million currency units, but procurement, interest and freight rise faster, so profit falls.',
      takeaway: 'Delivered cost includes purchase, logistics, storage, processing, losses, finance and hedging costs; a visible purchase-to-sale spread is not net margin.',
    },
  },
  'agri-commodities-m3-12': {
    heading: 'Change volume, price, cost, loss and inventory to see which KPIs move',
    intro: 'Profitability KPIs such as margin per tonne, gross margin and inventory turnover need consistent definitions. Use the sliders on an illustrative trade to see how they respond.',
    spec: {
      layout: 'scenario', title: '12 Which KPIs Drive Agricultural Commodity Profitability?', kicker: H,
      inputs: [
        { key: 'tonnes', label: 'Tonnes bought', min: 100, max: 1000, step: 50, value: 400, unit: 't' },
        { key: 'price', label: 'Realized selling price', min: 400, max: 800, step: 10, value: 600, unit: 'per t' },
        { key: 'cost', label: 'Delivered cost', min: 300, max: 700, step: 10, value: 540, unit: 'per t' },
        { key: 'loss', label: 'Handling loss', min: 0, max: 10, step: 0.5, value: 2, unit: '%' },
        { key: 'inventory', label: 'Average inventory', min: 50, max: 500, step: 10, value: 100, unit: 't' },
      ],
      outputs: [
        { label: 'Trading contribution', unit: 'currency units', digits: 0, compute: (v) => v.tonnes * (1 - v.loss / 100) * v.price - v.tonnes * v.cost },
        { label: 'Margin per tonne sold', unit: 'per t', digits: 1, compute: (v) => (v.tonnes * (1 - v.loss / 100) * v.price - v.tonnes * v.cost) / (v.tonnes * (1 - v.loss / 100)) },
        { label: 'Gross margin', unit: '%', digits: 1, compute: (v) => ((v.tonnes * (1 - v.loss / 100) * v.price - v.tonnes * v.cost) / (v.tonnes * (1 - v.loss / 100) * v.price)) * 100 },
        { label: 'Inventory turnover', unit: '× per period', digits: 1, compute: (v) => (v.tonnes * (1 - v.loss / 100)) / v.inventory },
      ],
      assumption: `${H}. Illustrative inputs, not market data. Tonnes sold = tonnes bought less handling loss; excludes overhead, financing and hedging results.`,
      note: 'HYPOTHETICAL 3: a simplified futures hedge offsets an eligible benchmark move, but basis, quality, volume, liquidity, margin calls and counterparty risks remain. Hedging does not guarantee profit.',
      takeaway: 'Profitability depends on realized margin per physical unit, inventory velocity, loss, finance, contract fulfillment and cash conversion—not turnover alone.',
    },
  },
  'agri-commodities-m3-13': {
    heading: 'The same harvest can reach a buyer through three procurement channels',
    intro: 'Supply is aggregated through farmgate purchases, producer groups, local intermediaries, processors and regional markets. Each channel trades visibility against cost and capability.',
    spec: {
      layout: 'pathway', title: '13 How Do Agricultural Commodities Reach Buyers?', kicker: '',
      trunk: [{ label: 'Farm harvest', detail: 'Fragmented lots at origin' }],
      optionsLabel: 'Procurement channels — alternatives, not steps',
      options: [
        { label: 'Direct farm purchase', detail: 'Most visibility; needs local staff, testing, collection and payment' },
        { label: 'Cooperative', detail: 'Producer group pools lots and shared standards' },
        { label: 'Processor partner', detail: 'Processor aggregates and supplies to agreed specification' },
      ],
      afterLabel: 'Then',
      after: [{ label: 'Buyer receives aggregated supply', detail: 'Quality and custody controlled to the channel chosen', kind: 'outcome' }],
      note: 'Balance efficient aggregation with custody, quality and supplier-development controls.',
      takeaway: 'Procurement-channel design determines supply access, transparency, quality control and relationship cost.',
    },
  },
  'agri-commodities-m3-14': {
    heading: 'Every hand-off from collector to trading hub is a B2B relationship to control',
    intro: 'Local intermediaries and regional markets aggregate supply before it reaches the trader. Each hand-off needs agreed custody, quality and payment terms.',
    spec: {
      layout: 'flow', title: '14 How Do Trading Contracts and B2B Relationships Work?', kicker: '',
      steps: [
        { label: 'Farmgate purchase', detail: 'Lots bought from farmers', owner: 'Collector' },
        { label: 'Local aggregation', detail: 'Lots combined and passed on under agreed terms', owner: 'Collector' },
        { label: 'Trading hub', detail: 'Regional market where supply is pooled and sold', owner: 'Trading hub' },
        { label: 'Contracted sale', detail: 'Trader buys against specification and custody records', owner: 'Trader' },
        { label: 'Controlled, traceable supply', detail: 'Custody, quality and supplier development intact', kind: 'outcome' },
      ],
      note: 'Direct sourcing improves visibility but requires local staff, testing, collection and payment capability.',
      takeaway: 'Procurement-channel design determines supply access, transparency, quality control and relationship cost.',
    },
  },
  'agri-commodities-m3-15': {
    heading: 'Every export channel still needs title, quality, finance and logistics verified',
    intro: 'Direct buyers, merchants, brokers and platforms link products to international demand. Each widens reach differently, but none removes execution checks.',
    spec: {
      layout: 'table', title: '15 How Do Export Channels and Commercial Partnerships Drive Growth?', kicker: '',
      headers: ['Export channel', 'What it adds', 'What still has to be verified'],
      rows: [
        { label: 'Direct export', a: 'Own relationship with the foreign buyer', b: 'Credit, contract and shipment execution' },
        { label: 'Trading house', a: 'Merchant reach and market access', b: 'Contract terms and counterparty' },
        { label: 'Broker', a: 'Introductions without holding inventory', b: 'Title and enforceable terms' },
        { label: 'Digital platform', a: 'Discovery of offers and coordination', b: 'Inspection, title, quality, finance, logistics' },
      ],
      note: 'Customer diversification helps only where product, compliance and execution capability are real.',
      takeaway: 'Digital tools can improve discovery and coordination but cannot replace inspection, credit, contracts and shipment execution.',
    },
  },
  'agri-commodities-m3-16': {
    heading: 'Market participants grouped by the job they do for the commodity',
    intro: 'Some participants generate supply, others preserve and move goods, verify quality, or finance and protect transactions. Producers, processors and warehouses, and inspectors are the focus here.',
    spec: {
      layout: 'taxonomy', title: '16 Who Participates in Agricultural Commodity Markets?', kicker: '',
      root: 'Agricultural commodity market participants', rootDetail: 'Grouped by function — each interface can fail',
      groups: [
        { label: 'Generate supply', detail: 'Grow and sell the crop', items: ['Producer'] },
        { label: 'Preserve and transform', detail: 'Store, condition and process goods', items: ['Processor and warehouse'] },
        { label: 'Verify quality', detail: 'Confirm grade and condition', items: ['Inspection'] },
        { label: 'Move goods', detail: 'Inland transport and port handling' },
        { label: 'Finance and protect', detail: 'Fund and insure transactions' },
      ],
      note: 'Partner selection should include capacity, records, controls, insurance and contingency performance.',
      takeaway: 'Trading performance depends on ecosystem reliability because failures at one interface affect cost, quality and delivery.',
    },
  },
  'agri-commodities-m3-17': {
    heading: 'The trader sits between partners that supply goods, move them, fund them and insure them',
    intro: 'Aggregators, transport and port operators, banks and insurers each handle a different flow around the trader. A failure at any one interface affects the whole shipment.',
    spec: {
      layout: 'ecosystem', title: '17 How Do Traders, Banks, Logistics Providers, and Insurers Collaborate?', kicker: '',
      center: { label: 'Trader', detail: 'Owns the position and coordinates partners' },
      actors: [
        { label: 'Aggregator', relation: 'Supplies consolidated lots', flows: ['product', 'money'] },
        { label: 'Transport and port', relation: 'Moves goods inland and onto the vessel', flows: ['product', 'service'] },
        { label: 'Bank', relation: 'Finances inventory and trade', flows: ['money', 'risk'] },
        { label: 'Insurer', relation: 'Covers loss and damage in transit', flows: ['risk', 'service'] },
        { label: 'Destination buyer', relation: 'Receives cargo and pays', flows: ['product', 'money'] },
      ],
      note: 'Late inland transport can miss a vessel even when procurement and quality are correct.',
      takeaway: 'Trading performance depends on ecosystem reliability because failures at one interface affect cost, quality and delivery.',
    },
  },
  'agri-commodities-m3-18': {
    heading: 'Each institution sets a different rule, and a price reference does not prove compliance',
    intro: 'Customs, agricultural and food-safety bodies, exchanges, standards and certification systems define what goods, documents and contracts are acceptable in each market.',
    spec: {
      layout: 'table', title: '18 How Do Standards, Regulators, and Trade Institutions Shape the Ecosystem?', kicker: '',
      headers: ['Institution', 'What it defines', 'What a trader must still check'],
      rows: [
        { label: 'Customs', a: 'Border documents and clearance', b: 'Correct paperwork for each jurisdiction' },
        { label: 'SPS authority', a: 'Food-safety and plant-health acceptance', b: 'Product-specific rules before contracting' },
        { label: 'Exchange', a: 'Futures price reference', b: 'Whether the physical lot meets destination rules' },
        { label: 'Certification', a: 'Standards a lot may claim', b: 'That the claim fits the buyer’s market' },
        { label: 'Benchmark and data', a: 'Shared price and market information', b: 'Relevance to the actual grade and origin' },
      ],
      note: 'Verify commodity- and market-specific rules with competent authorities before contracting.',
      takeaway: 'Institutions define acceptable goods, documents, contracts and market access for specific products and jurisdictions.',
    },
  },
};
