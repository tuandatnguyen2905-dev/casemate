import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Non-Alcoholic Beverages Module 03, keyed by visualKind. */
export const NAB_M3_VISUALS: Record<string, ChapterVisual> = {
  'nab-m3-31-1-role-map': {
    heading: 'Where one drink changes hands before a shopper pays',
    intro: 'The logo on the bottle hides several businesses. Follow the drink from formula to checkout and notice where each hand-off can fail.',
    spec: {
      layout: 'flow', title: 'Who Actually Makes and Sells Beverages?', kicker: '',
      steps: [
        { label: 'Brand owner', detail: 'Controls trademarks, positioning and brand standards; creates demand', kind: 'stage' },
        { label: 'Concentrate producer', detail: 'Protects the formula; supplies concentrates, beverage bases and syrups', kind: 'stage' },
        { label: 'Bottler', detail: 'Mixes, packages and often distributes the finished beverage', kind: 'stage' },
        { label: 'Distributor', detail: 'Positions inventory and delivers mixed orders to outlets', kind: 'stage' },
        { label: 'Retailer', detail: 'Provides the final point of access where the consumer pays', kind: 'outcome' },
      ],
      loop: 'Consumer payment travels back through the channel; each hand-off is where incentives, service levels and information quality matter most.',
      note: 'In the Coca-Cola system, the company supplies concentrates, beverage bases and syrups while local bottling partners mix, package and move finished beverages to market.',
      takeaway: 'When a shelf is empty, find the role that failed (forecasting, production, distribution or retail) before blaming the brand idea.',
    },
  },
  'nab-m3-31-2-model-compare': {
    heading: 'What each beverage model keeps in-house and what it hands to partners',
    intro: 'Two drinks at the same price can rest on very different operating boundaries. Read each row to see what is owned, what is contracted and what that choice costs.',
    spec: {
      layout: 'table', title: 'Understanding Beverage Business Models', kicker: '',
      headers: ['Model', 'Kept in-house', 'Trade-off'],
      rows: [
        { label: 'Vertical integration', a: 'Several adjacent stages under one roof, from formula to plant and often route', b: 'More control, but more capital tied up' },
        { label: 'Franchise bottling', a: 'Brand and concentrate; a partner makes and sells finished drinks in a territory', b: 'Scales through partners but needs more coordination' },
        { label: 'Co-packing', a: 'Brand and demand risk; production capacity is rented from a contract manufacturer', b: 'Less plant investment; quality, capacity, confidentiality and continuity governed by contract' },
        { label: 'Joint venture', a: 'Vietnam alliance: Suntory acquired 51%, PepsiCo retained 49% and its marketing and innovation', b: 'Combines brand, market and operating capabilities in one venture' },
      ],
      note: 'Whatever the boundary, most packaged beverages reach drinkers B2B2C: through a distributor or retailer before the consumer.',
      takeaway: 'Decide build versus partner stage by stage: own what is strategically sensitive, partner where others have denser routes or spare capacity.',
    },
  },
  'nab-m3-31-3-profit-pools': {
    heading: 'Why a concentrate owner’s margin says nothing about a bottler',
    intro: 'Brand and formula owners carry intangibles; finished-product operators carry plants, packaging and cash. Compare where each one’s money is tied up before reading any margin.',
    spec: {
      layout: 'compare', title: 'Why Different Business Models Make Money Differently', kicker: '',
      leftTitle: 'Brand and formula owner', rightTitle: 'Bottler or finished-product operator',
      rows: [
        { label: 'Main assets', a: 'Trademarks and formulas, spread across a large operating system', b: 'Factories, packaging, working capital and local service' },
        { label: 'How it grows', a: 'Without adding a filling line in every market', b: 'Each extra case needs production and delivery capacity' },
        { label: 'Value it captures', a: 'Brand and formula investment scaled across operating partners', b: 'Local manufacturing and commercial control' },
        { label: 'Reported example', a: 'Coca-Cola 2024: $47.1 billion net revenue, 21.2% GAAP operating margin (consolidated group)', b: 'No benchmark in the chapter; never transfer the group margin here' },
      ],
      note: 'Coca-Cola figures are company-reported at consolidated group level and include disclosed refranchising and comparability effects. Retailers, a third role, monetise shopper access and convenience.',
      takeaway: 'Match role, operating perimeter, accounting definition, geography and year before comparing any two margins.',
    },
  },
  'nab-m3-32-1-portfolio-map': {
    heading: 'Giving every SKU a job before adding another',
    intro: 'A portfolio spans many categories, but each addition must earn its place. Weigh what a new product can achieve against the complexity it brings.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Beverage Product Portfolios', kicker: '',
      root: 'A beverage portfolio', rootDetail: 'Categories, brands, flavours, pack sizes and price points managed as one system',
      groups: [
        { label: 'Categories covered', items: ['Water, tea and coffee', 'Carbonated drinks', 'Energy and sports', 'Juice and functional products'] },
        { label: 'What a new SKU can do', items: ['Reach a new occasion', 'Defend shelf space', 'Create a premium tier', 'Recruit new consumers'] },
        { label: 'What it can cost', items: ['Split media spend', 'More line changeovers', 'Extra inventory', 'Shopper confusion', 'Cannibalisation of existing buyers'] },
      ],
      note: 'The Vietnam alliance announcement listed Pepsi-Cola, 7-UP, Sting, Mirinda, Tropicana Twister, Lipton and Aquafina, managed through one local operating platform.',
      takeaway: 'A new SKU earns its place only if it brings incremental demand rather than moving buyers between the company’s own products.',
    },
  },
  'nab-m3-32-2-segmentation-matrix': {
    heading: '“Young consumers” is not yet a segment',
    intro: 'Need state, occasion and channel turn a broad audience into a group the company can act on. Put any candidate segment through this test before planning around it.',
    spec: {
      layout: 'decision', title: 'How Beverage Companies Segment Their Markets', kicker: '',
      root: { label: 'Candidate segment', detail: 'Built from demographic, need-state, occasion, behavioural, geographic, channel or price-tier lenses' },
      question: 'Is it distinct, measurable and reachable, and would a different offer improve results?',
      branches: [
        { condition: 'Yes', outcome: 'Actionable segment', detail: 'Change the product, price, pack, message or channel for this group', tone: 'positive' },
        { condition: 'No', outcome: 'Descriptive only', detail: 'Add need, occasion and channel lenses before allocating resources', tone: 'caution' },
      ],
      note: 'One student may buy an affordable energy drink for late study, a large bottle for a family meal and a premium functional drink after exercise.',
      takeaway: 'Segment for a decision: a group matters only when it changes what the company does, and people move between segments by occasion.',
    },
  },
  'nab-m3-32-3-positioning-matrix': {
    heading: 'Promise, proof, pack and price must tell one story',
    intro: 'A smaller pack can cost more per litre yet be the most affordable buy right now. See how each element turns a positioning into a real purchase.',
    spec: {
      layout: 'driverTree', title: 'Product Positioning, Differentiation, and Pricing', kicker: '',
      root: { label: 'An offer chosen in a real occasion', detail: 'A positioning made accessible to a chosen segment' },
      drivers: [
        { label: 'Positioning', detail: 'The intended meaning versus alternatives, starting from a target and frame of reference', op: '+' },
        { label: 'Differentiation', detail: 'A credible reason to choose', op: '+', children: [{ label: 'Matters to the target' }, { label: 'Credibly delivered' }, { label: 'Stands apart from alternatives' }] },
        { label: 'Pack', detail: 'Same brand, different occasions and channel economics', op: '+', children: [{ label: 'Small chilled can', detail: 'Immediate refreshment' }, { label: 'Larger PET bottle', detail: 'Sharing at home' }] },
        { label: 'Price', detail: 'Read at several levels', op: '+', children: [{ label: 'Shelf price' }, { label: 'Price per unit' }, { label: 'Out-of-pocket affordability' }, { label: 'Promotional price' }] },
      ],
      note: 'A claim written on the label is not differentiation by itself; it must matter, be delivered and stand apart.',
      takeaway: 'Clear price-pack architecture reduces internal overlap and helps sales teams put the right pack in the right outlet.',
    },
  },
  'nab-m3-33-1-customer-map': {
    heading: 'Payer, shopper, drinker and trade buyer around a single bottle',
    intro: 'A parent may pay, a child drink and a chain decide the assortment. See what each participant needs so the offer works for all of them.',
    spec: {
      layout: 'ecosystem', title: 'Who Buys and Consumes Beverages?', kicker: '',
      center: { label: 'One beverage purchase', detail: 'The channel buys access and inventory; the shopper buys the product; the consumer experiences it' },
      actors: [
        { label: 'Distributor', relation: 'Delivers the case; judges service and commercial value', flows: ['product', 'money'] },
        { label: 'Convenience chain', relation: 'Negotiates listings; avoids slow turnover, special handling and assortment complexity', flows: ['information', 'money'] },
        { label: 'Franchisee', relation: 'Orders stock for the store', flows: ['product'] },
        { label: 'Shopper', relation: 'Chooses the brand at the point of sale', flows: ['money'] },
        { label: 'Consumer', relation: 'Drinks the product; judges relevance, affordability and experience', flows: ['product'] },
      ],
      note: 'A trade promotion can secure shelf space, but repeat sales need a consumer proposition that survives after the promotion ends.',
      takeaway: 'Ask “customer for which decision?”: trade partners need margin and service, consumers need relevance and experience.',
    },
  },
  'nab-m3-33-2-motivation-framework': {
    heading: 'Where a preferred brand loses to a colder bottle',
    intro: 'Preference is only the first gate. Follow the stages a drink must pass and use them to locate where a sale was lost.',
    spec: {
      layout: 'flow', title: 'What Drives Beverage Purchasing Decisions?', kicker: '',
      steps: [
        { label: 'Enter the consideration set', detail: 'Taste, brand, trust and health cues create preference', kind: 'stage' },
        { label: 'Be available in the right format', detail: 'Nearby, visible, in stock and cold when the occasion arises', kind: 'stage' },
        { label: 'Beat alternatives in the moment', detail: 'Price, pack and perceived value against money, effort and other options', kind: 'decision' },
        { label: 'Earn the repeat purchase', detail: 'The drinking experience supports buying again', kind: 'outcome' },
      ],
      note: 'An office worker may prefer one coffee brand but buy another because it is chilled in the nearest convenience store before a meeting. A failure at each stage points to awareness, relevance, distribution, conversion or repeat.',
      takeaway: 'Marketing cannot convert demand when the product is absent, warm, poorly displayed or in the wrong format.',
    },
  },
  'nab-m3-33-3-vietnam-segments': {
    heading: 'Three purchase logics inside one Vietnamese beverage category',
    intro: 'A campus kiosk, a rural family shop and a central-city convenience store can sell the same category for different reasons. Treat each as a hypothesis to validate, not a sized segment.',
    spec: {
      layout: 'pathway', title: 'Understanding Beverage Consumers in Vietnam', kicker: '',
      trunk: [
        { label: 'Same category, different contexts', detail: 'Income, city tier, channel access, age and occasion shape demand', kind: 'stage' },
      ],
      optionsLabel: 'Purchase contexts (qualitative hypotheses)',
      options: [
        { label: 'Campus kiosk', detail: 'A student picks an energy or ready-to-drink coffee format for study' },
        { label: 'Central-city convenience store', detail: 'Young urban consumers discover products digitally and buy for convenience' },
        { label: 'Rural family shop', detail: 'Household purchases emphasise sharing, value and trust, reached through general trade' },
      ],
      afterLabel: 'Before sizing any segment',
      after: [
        { label: 'Validate with local evidence', detail: 'Company sell-out data, retailer evidence and consumer research', kind: 'outcome' },
      ],
      note: 'Do not convert an international benchmark into a Vietnam fact; label geography, year, category and source before using any number.',
      takeaway: 'A national plan needs local pack, channel and message choices rather than one assumed “Vietnam consumer”.',
    },
  },
  'nab-m3-34-1-revenue-flow': {
    heading: 'One shelf price, several different revenue lines',
    intro: 'A consumer pays once, but each company records only what it sells and to whom. Follow the invoice for each role.',
    spec: {
      layout: 'table', title: 'How Beverage Companies Generate Revenue', kicker: '',
      headers: ['Seller', 'What it sells, and to whom', 'Revenue it records'],
      rows: [
        { label: 'Brand system', a: 'Concentrates, beverage bases and syrups to bottling partners; licensed rights', b: 'Concentrate and licensing revenue' },
        { label: 'Bottler or integrated operator', a: 'Finished beverages into local channels', b: 'Finished-goods revenue' },
        { label: 'Co-packer', a: 'Manufacturing and packaging of another company’s products', b: 'Co-packing fees' },
        { label: 'Fountain, vending and foodservice', a: 'Supply and service to outlets and sites', b: 'Revenue from those streams' },
        { label: 'Retailer', a: 'The final unit to the shopper', b: 'Retail sales value, not brand-owner revenue' },
      ],
      note: 'The Coca-Cola system describes selling concentrates, beverage bases and syrups to bottling partners, which then produce and sell finished beverages locally. Never add retail value, bottler sales and brand-owner revenue without eliminating overlaps.',
      takeaway: 'Revenue mix, not the shelf price, shapes reported growth, gross margin, working capital and exposure to partners.',
    },
  },
  'nab-m3-34-2-cost-stack': {
    heading: 'Which beverage costs move with each case and which jump in steps',
    intro: 'The cost stack runs from liquid and package to plant, route and brand. Group costs by how they react to volume before forecasting a change.',
    spec: {
      layout: 'taxonomy', title: 'Understanding the Cost of Making and Selling Beverages', kicker: '',
      root: 'Cost of making, moving and selling a beverage', rootDetail: 'Classification follows each company’s accounting policy',
      groups: [
        { label: 'Moves with units', detail: 'Mostly cost of goods sold', items: ['Ingredients', 'Some packaging'] },
        { label: 'Slow to respond in the short run', detail: 'Conversion and organisation costs', items: ['Plant depreciation', 'Salaried teams'] },
        { label: 'Step costs', detail: 'Stable until capacity forces another block', items: ['Delivery routes', 'Shifts', 'Warehouse space', 'A new vehicle, line or facility'] },
        { label: 'Cost to serve', detail: 'Rises with channel complexity', items: ['Logistics', 'Selling', 'Marketing and overhead support'] },
      ],
      note: 'One bottle-format change can move packaging cost, line speed, changeovers, pallet density, transport, shelf presence and willingness to pay at once.',
      takeaway: 'Optimise total delivered economics: a cheaper input can raise costs elsewhere in the system.',
    },
  },
  'nab-m3-34-3-profitability-waterfall': {
    heading: 'Bridging net revenue down to net income, one cost layer at a time',
    intro: 'Each margin answers a different question. Walk down the bridge and name which costs sit above the level you are quoting.',
    spec: {
      layout: 'flow', title: 'What Determines Beverage Company Profitability?', kicker: '',
      steps: [
        { label: 'Net revenue', detail: 'Moved by price, mix and volume', kind: 'stage' },
        { label: 'Gross profit', detail: 'After product and packaging costs (cost of goods sold)', kind: 'stage' },
        { label: 'Operating profit', detail: 'After selling, distribution, marketing and overhead', kind: 'stage' },
        { label: 'Net income', detail: 'After financing, tax and other items', kind: 'outcome' },
      ],
      note: 'Coca-Cola’s 2024 results showed a 21.2% GAAP operating margin and a 30.0% comparable (non-GAAP) operating margin, both consolidated and company-reported; neither fits a local bottler.',
      takeaway: 'For a decision, define the unit (case, litre, order, outlet or route) and label the fixed costs left out of any contribution margin.',
    },
  },
  'nab-m3-35-1-gt-mt-compare': {
    heading: 'Hundreds of shop relationships versus one central negotiation',
    intro: 'General and modern trade need different commercial systems, not just different store signs. Compare who decides and how the work gets done on each row.',
    spec: {
      layout: 'compare', title: 'General Trade vs. Modern Trade', kicker: '',
      leftTitle: 'General trade', rightTitle: 'Modern trade',
      rows: [
        { label: 'Outlet structure', a: 'Fragmented independent outlets', b: 'Organised chains such as supermarkets and convenience stores' },
        { label: 'Who decides the listing', a: 'Each shop, ordering through a distributor representative', b: 'Central negotiation of assortment and promotion' },
        { label: 'Orders and delivery', a: 'Mixed cases with frequent service', b: 'Replenished through the chain’s own network' },
        { label: 'What wins', a: 'Route coverage, distributor execution and credit discipline', b: 'Listings, planograms, promotions, data and account management' },
      ],
      note: 'Use sourced channel shares only when category, geography, year and measurement basis match; broad retail estimates are not beverage volume facts.',
      takeaway: 'A plan copied from one channel fails in the other because decision rights, order sizes, economics and execution differ.',
    },
  },
  'nab-m3-35-2-channel-map': {
    heading: 'Beyond the shop shelf: matching each route to its fulfilment unit',
    intro: 'The same brand can travel through a fountain agreement, a key account or a marketplace multipack. Check whether each route’s value covers what it costs to fulfil.',
    spec: {
      layout: 'taxonomy', title: 'B2B, Key Accounts, D2C, and E-Commerce', kicker: '',
      root: 'Routes beyond broad retail', rootDetail: 'Attractive only when consumer value and fulfilment economics work together',
      groups: [
        { label: 'B2B: buying for resale or service', items: ['Restaurant fountain agreement', 'Campus vending contract', 'Hotels, restaurants and cafés'] },
        { label: 'Key accounts', detail: 'Coordinate volume and execution across sites', items: ['Supermarket key account'] },
        { label: 'Digital routes to the consumer', detail: 'Add discovery and convenience, plus picking, delivery and platform costs', items: ['Marketplace multipack', 'Quick commerce from nearby inventory', 'D2C bundles, subscriptions or premium offers'] },
      ],
      note: 'A marketplace order fulfilled by a supermarket can appear in both digital demand data and retailer sales; define the channel by order origin, fulfilment or seller of record.',
      takeaway: 'Heavy, low-value single units are hard to deliver profitably, so digital routes need bundles, premium value or nearby stock.',
    },
  },
  'nab-m3-35-3-distribution-economics': {
    heading: 'Why two outlets with equal sales can earn very differently',
    intro: 'Route economics are built from service work, not an assumed distributor margin. Trace which drivers decide whether extra availability also adds profit.',
    spec: {
      layout: 'driverTree', title: 'Understanding Beverage Distribution Economics', kicker: '',
      root: { label: 'Healthy distribution economics', detail: 'Revenue, cost, cash and service outcome of reaching outlets' },
      drivers: [
        { label: 'Revenue quality', op: '+', children: [{ label: 'Incremental sell-out', detail: 'Not stock left sitting in the channel' }, { label: 'Low returns' }] },
        { label: 'Route productivity', op: '+', children: [{ label: 'Drop size' }, { label: 'Route density' }, { label: 'Distance' }, { label: 'Delivery frequency' }] },
        { label: 'Service work', op: '+', children: [{ label: 'Cooler service' }, { label: 'Merchandising' }, { label: 'Trade promotions' }] },
        { label: 'Cash', op: '+', children: [{ label: 'Inventory' }, { label: 'Credit and receivables' }] },
        { label: 'Partner relationship', op: '+', children: [{ label: 'Territory clarity' }, { label: 'Service levels and data sharing' }, { label: 'Payment discipline' }] },
      ],
      note: 'Full cases on a dense route versus urgent small deliveries far from the depot: the same monthly sales can produce different economics.',
      takeaway: 'Availability creates lasting growth only when service design, partner incentives and cash discipline keep it profitable.',
    },
  },
  'nab-m3-36-1-ecosystem-map': {
    heading: 'Who supplies, governs and recovers a beverage beyond its value chain',
    intro: 'A package redesign alone can involve suppliers, converters, retailers, recyclers and regulators. See what each actor exchanges with the company.',
    spec: {
      layout: 'ecosystem', title: 'Mapping the Beverage Industry Ecosystem', kicker: '',
      center: { label: 'Beverage company', detail: 'Brand owner and manufacturer at the centre of the network' },
      actors: [
        { label: 'Suppliers', relation: 'Ingredients, packaging, equipment, utilities and services', flows: ['product', 'money'] },
        { label: 'Operating partners', relation: 'Bottlers, logistics partners and distributors make and move products', flows: ['product', 'service'] },
        { label: 'Retailers and consumers', relation: 'Sell and drink the product; return payment and trust', flows: ['money', 'product'] },
        { label: 'Regulators and health authorities', relation: 'Set food, tax, trade and environmental rules', flows: ['oversight'] },
        { label: 'Associations and civil society', relation: 'Coordinate or challenge industry action', flows: ['information'] },
        { label: 'Recyclers', relation: 'Recover packaging under producer responsibility rules (EPR)', flows: ['service'] },
      ],
      note: 'A sugary-drink reformulation can connect product teams, sweetener suppliers, quality, packaging, finance, retailers, health authorities and consumers. Prioritise stakeholders issue by issue.',
      takeaway: 'Strategy fails when it optimises the company but ignores a critical external dependency or stakeholder response.',
    },
  },
  'nab-m3-36-2-relationship-map': {
    heading: 'Contracts assign duties; routines keep separate firms aligned',
    intro: 'No single mechanism coordinates a beverage system of separate companies. Read what each one aligns and what breaks when it is weak.',
    spec: {
      layout: 'table', title: 'How Industry Stakeholders Work Together', kicker: '',
      headers: ['Mechanism', 'What it aligns', 'When it is weak'],
      rows: [
        { label: 'Contracts', a: 'Rights and obligations of each party', b: 'Disputes' },
        { label: 'Specifications and audits', a: 'Required inputs, processes and outputs; tested controls', b: 'Quality failures' },
        { label: 'Forecasts and data', a: 'Capacity, materials and inventory', b: 'Stockouts or excess inventory' },
        { label: 'Service-level agreements', a: 'Documented performance expectations', b: 'Unclear performance and slow responses' },
        { label: 'Balanced metrics', a: 'Availability, sell-out, service, cash and compliance', b: 'Sell-in alone overstocks the channel' },
        { label: 'Review forums and escalation', a: 'Correction and issue resolution', b: 'Problems stay unresolved' },
      ],
      note: 'Use different cadences: daily exception handling, weekly supply reviews, monthly commercial reviews and periodic strategic planning.',
      takeaway: 'Formal agreements set the rules; repeated operating routines keep a franchise or partner system working.',
    },
  },
  'nab-m3-36-3-partnership-value': {
    heading: 'The partner that speeds market entry can become the biggest dependency',
    intro: 'Partnerships add reach and capability but create reliance on another party. Weigh each gain against the governance it requires.',
    spec: {
      layout: 'compare', title: 'Why Partnerships and Ecosystem Relationships Matter', kicker: '',
      leftTitle: 'Value the partnership adds', rightTitle: 'Risk or governance it demands',
      rows: [
        { label: 'Market access', a: 'A partner’s route can be the fastest way into a market', b: 'Dependence on that route without alternatives' },
        { label: 'Capabilities', a: 'Brands, local knowledge, production, distribution, technology, recycling or trust', b: 'Agreed decision rights, data and performance metrics' },
        { label: 'Suntory–PepsiCo alliance', a: 'Shared management and local bottling in Vietnam', b: 'PepsiCo retained marketing and innovation for its brands' },
        { label: 'Under stress', a: 'Aligned incentives keep both parties investing', b: 'Issue escalation and exit conditions defined in advance' },
      ],
      note: 'Vietnam’s sugary-drink special sales tax (enacted roadmap, as summarised by PwC Vietnam): 8% from 1 Jan 2027 and 10% from 1 Jan 2028, only for qualifying drinks above 5g sugar per 100ml, with regulated exclusions.',
      takeaway: 'Complementary strengths become an advantage only when incentives stay aligned under stress and governance holds.',
    },
  },
};
