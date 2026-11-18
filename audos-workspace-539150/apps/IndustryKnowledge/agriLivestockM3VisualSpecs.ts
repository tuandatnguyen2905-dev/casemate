import type { AgriLivestockChapterVisual } from './agriLivestockVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Livestock & Animal Feed Module 03, keyed by visualKind. */
export const AGRI_LIVESTOCK_M3_VISUALS: Record<string, AgriLivestockChapterVisual> = {
  'agri-livestock-m3-1': {
    heading: 'Four business models that split capital, production risk and margin differently',
    intro: 'An independent farmer buys feed and sells live animals, while a contract grower receives animals, feed and protocols. Each model places capital, biological risk and margin with a different party.',
    spec: {
      layout: 'table', title: '01 How Do Livestock Farming Businesses Make Money?', kicker: '',
      headers: ['Business model', 'Who carries production and risk', 'Where the money is earned'],
      rows: [
        { label: 'Independent feed mill', a: 'Farms that buy the feed run the animals', b: 'Margin on commercial feed sold to farms' },
        { label: 'Contract farming', a: 'Partner supplies inputs; grower follows protocols', b: 'Defined purchase terms between grower and partner' },
        { label: 'Dealer model', a: 'Dealer holds stock between mill and farms', b: 'Resale margin on feed and inputs' },
        { label: 'Open market', a: 'Farmer buys feed and carries price risk', b: 'Sale of live animals at the realized price' },
      ],
      note: 'Contract terms should allocate mortality, performance, input, price, health, force majeure and purchase responsibility.',
      takeaway: 'Livestock business models allocate capital, production responsibility, biological risk and margins differently.',
    },
  },
  'agri-livestock-m3-2': {
    heading: 'An independent farm and a contract grower differ in who supplies inputs, protocols and the buyer',
    intro: 'A commercial farm can run independently or under contract. The difference lies in who provides animals, feed, technical support and purchase terms.',
    spec: {
      layout: 'compare', title: '02 How Do Smallholder, Commercial, and Contract Farming Models Differ?', kicker: '',
      leftTitle: 'Independent farm', rightTitle: 'Contract grower',
      rows: [
        { label: 'Animals and feed', a: 'Bought by the farmer', b: 'Received from the commercial partner' },
        { label: 'Production protocols', a: 'Set by the farmer', b: 'Defined by the partner' },
        { label: 'Technical support', a: 'Sourced by the farm itself', b: 'Provided under the contract' },
        { label: 'Selling the output', a: 'Live animals sold to the market', b: 'Bought under defined purchase terms' },
        { label: 'Risk carried', a: 'Input, price and mortality risk', b: 'Allocated by the contract terms' },
      ],
      note: 'A commercial farm can operate either way; check how contract terms allocate mortality, performance, price and purchase responsibility.',
      takeaway: 'Farming models differ in how they allocate capital, production responsibility, biological risk and margin.',
    },
  },
  'agri-livestock-m3-3': {
    heading: 'An integrated group controls the chain from feed mill to processed product',
    intro: 'An integrated poultry group coordinates feed, chicks, contract farms, processing and distribution. It can earn from feed, breeding, animals, processed products and services.',
    spec: {
      layout: 'flow', title: '03 How Do Integrated Livestock Production Models Work?', kicker: '',
      steps: [
        { label: 'Feed production', detail: 'Own mill supplies the farms', owner: 'Integrator' },
        { label: 'Breeding', detail: 'Supplies chicks or young animals', owner: 'Integrator' },
        { label: 'Farm', detail: 'Animals raised to a set standard', owner: 'Contract network' },
        { label: 'Slaughter', detail: 'Animals collected and slaughtered', owner: 'Integrator' },
        { label: 'Processing', detail: 'Processed products go to distribution', kind: 'outcome', owner: 'Integrator' },
      ],
      loop: 'Technical service links every stage, carrying protocols to farms and results back to feed and breeding.',
      note: 'Judge integration by utilization, transfer pricing, biosecurity, working capital, market access and whole-chain contribution.',
      takeaway: 'Integration improves coordination and predictability but requires capital, expertise and risk management.',
    },
  },
  'agri-livestock-m3-4': {
    heading: 'Feed products are segmented by species, life stage and product form',
    intro: 'Broiler starter, finisher, layer and sow feed have distinct nutrient and physical specifications. Each product is defined by the animal it serves and the form it takes.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Livestock Products and Production Systems Segmented?', kicker: '',
      root: 'Livestock feed products', rootDetail: 'Segments used together to define one product',
      groups: [
        { label: 'By species', items: ['Pig', 'Cattle', 'Broiler', 'Layer'] },
        { label: 'By life stage', items: ['Starter feed', 'Finisher feed', 'Sow feed'] },
        { label: 'By product form', items: ['Complete feed', 'Supplement', 'Premix', 'Additive'] },
        { label: 'Premix', detail: 'Concentrated vitamins, minerals or micro-ingredients blended at a controlled rate' },
      ],
      note: 'Link every SKU to species, stage, production target, pack, formulation, technical evidence and approved claims.',
      takeaway: 'Product differentiation follows species, life stage, system, health objective and end-market specification.',
    },
  },
  'agri-livestock-m3-5': {
    heading: 'Five specification factors decide what a feed product is worth to a buyer',
    intro: 'A poultry grower feed and a dairy feed are valued against different targets. Commercial value depends on how closely the product matches the species, stage, system, health objective and end market.',
    spec: {
      layout: 'driverTree', title: '05 How Do Species, Quality, and Production Standards Affect Commercial Value?', kicker: '',
      root: { label: 'Commercial value of a feed product', detail: 'Fit to a defined animal and market' },
      drivers: [
        { label: 'Species', detail: 'Distinct nutrient needs', children: [{ label: 'Poultry' }, { label: 'Dairy' }] },
        { label: 'Life stage', detail: 'Specification changes as animals grow', children: [{ label: 'Grower feed' }, { label: 'Finisher feed' }] },
        { label: 'Production system', detail: 'Farm system the feed is used in' },
        { label: 'Health objective', detail: 'What the feed must protect' },
        { label: 'End-market specification', detail: 'What the buyer of the output requires' },
      ],
      note: 'Approved claims and technical evidence must back every product specification.',
      takeaway: 'Commercial value follows species, life stage, system, health objective and end-market specification.',
    },
  },
  'agri-livestock-m3-6': {
    heading: 'Each farm segment needs a different price, formula and support proposition',
    intro: 'A small farm values availability and advice, while an integrator needs bulk consistency and traceability. Segmenting by production economics shows which proposition fits.',
    spec: {
      layout: 'table', title: '06 How Do Meat, Egg, and Dairy Production Models Differ?', kicker: '',
      headers: ['Customer segment', 'What it values most', 'Proposition that fits'],
      rows: [
        { label: 'Smallholder', a: 'Affordability, availability and advice', b: 'Local supply with technical advice' },
        { label: 'Medium farm', a: 'Affordability and performance consistency', b: 'Standard formulas with reliable delivery' },
        { label: 'Commercial farm', a: 'Performance consistency', b: 'Formula and support matched to its system' },
        { label: 'Integrator', a: 'Bulk consistency and traceability', b: 'Customized formula in bulk' },
      ],
      note: 'Segment on real production economics and support capacity rather than farm size alone.',
      takeaway: 'Different operating conditions require different price, formula, delivery and support propositions.',
    },
  },
  'agri-livestock-m3-7': {
    heading: 'Farmers judge feed by total cost per kilogram of saleable output, not bag price',
    intro: 'A farm trial compares total cost per kilogram of saleable output rather than bag price. Feed conversion, mortality, consistency and delivery all move that number.',
    spec: {
      layout: 'driverTree', title: '07 Who Buys Livestock and Primary Animal Products?', kicker: '',
      root: { label: 'Total cost per kg of saleable output', detail: 'What the farm is really buying' },
      drivers: [
        { label: 'Bag price', detail: 'Only the starting point' },
        { label: 'Feed conversion', detail: 'Feed used per unit of output' },
        { label: 'Mortality', detail: 'Animal deaths in the group and period' },
        { label: 'Feed consistency', detail: 'Same results batch after batch' },
        { label: 'Delivery reliability', detail: 'Feed arrives when animals need it' },
      ],
      note: 'Use controlled comparisons with matched animals, stage, housing, health and measurement period.',
      takeaway: 'Farmers buy production outcomes and risk reduction, not feed price alone.',
    },
  },
  'agri-livestock-m3-8': {
    heading: 'How a farm decides between feed offers on growth, reproduction and credit',
    intro: 'Buyers weigh growth rate, reproduction and credit terms, not just price. A controlled comparison with matched animals shows which offer actually performs.',
    spec: {
      layout: 'decision', title: '08 What Determines Buyer Requirements and Purchasing Decisions?', kicker: '',
      root: { label: 'Farm comparing two feed offers', detail: 'Tested on matched animals, stage, housing and period' },
      question: 'Does the offer deliver better results per kilogram of saleable output?',
      branches: [
        { condition: 'Better growth rate or reproduction', outcome: 'Buy on outcome value', detail: 'A higher price can still be cheaper per kg', tone: 'positive' },
        { condition: 'Similar results, better credit term', outcome: 'Let the credit term decide', detail: 'Working capital becomes the deciding need', tone: 'caution' },
        { condition: 'Lower price, weaker results', outcome: 'Reject the price-only offer', tone: 'negative' },
        { condition: 'Unmatched or unclear trial', outcome: 'Rerun a controlled comparison', tone: 'caution' },
      ],
      note: 'Use controlled comparisons with matched animals, stage, housing, health and measurement period.',
      takeaway: 'Farmers buy production outcomes and risk reduction, not feed price alone.',
    },
  },
  'agri-livestock-m3-9': {
    heading: 'Dealers and processors buy different kinds of reliability',
    intro: 'A dealer needs stock and margin, while a processor needs consistent animals and safety evidence. Both value predictable volume and continuity, but in different forms.',
    spec: {
      layout: 'compare', title: '09 How Do Quality, Supply Reliability, and Contracts Affect Sales?', kicker: '',
      leftTitle: 'Dealer (intermediary)', rightTitle: 'Processor',
      rows: [
        { label: 'Core need', a: 'Stock to sell and a margin', b: 'Consistent animals and safety evidence' },
        { label: 'Commercial terms', a: 'Dealer margin and credit', b: 'Procurement reliability' },
        { label: 'Supply', a: 'Inventory availability', b: 'Large-volume supply' },
        { label: 'Service and quality', a: 'Technical training', b: 'Traceability and food safety' },
      ],
      note: 'Define forecast, credit, minimum order, delivery, claim, training, quality and return responsibilities.',
      takeaway: 'Business customers value predictable volume, specification, traceability and continuity.',
    },
  },
  'agri-livestock-m3-10': {
    heading: 'Farm revenue comes from separate output, genetics and service streams',
    intro: 'Farms earn from live animals, eggs, raw milk, breeding stock and contract-growing services, each defined by species and period. Counting animals is not the same as counting revenue.',
    spec: {
      layout: 'taxonomy', title: '10 How Do Livestock Farms Generate Revenue?', kicker: '',
      root: 'Farm revenue for a production cycle', rootDetail: 'Each stream measured separately by species and period',
      groups: [
        { label: 'Live animal sale', detail: 'Saleable animals at the liveweight price', items: ['Liveweight price', 'Survival', 'Quality'] },
        { label: 'Primary products', items: ['Egg sale', 'Raw milk sale'] },
        { label: 'Breeding stock', detail: 'Animals sold for their genetics' },
        { label: 'Contract-growing fee', detail: 'Service income, not ownership of the animals' },
        { label: 'Production cycle', detail: 'Sets when and how often revenue arrives' },
      ],
      note: `${H}: a grower uses 2.8 kg of feed at 0.40 currency units per kg for 1 kg of liveweight gain, so feed alone costs 1.12 per kg gain before animal, health, labor and other costs. Separate gross sales, quantity, mix, pass-through price, service fee, collection and realized margin.`,
      takeaway: 'Farm revenue depends on saleable animals or primary products, realized price, survival, quality and cycle; animal population and output revenue are not interchangeable.',
    },
  },
  'agri-livestock-m3-11': {
    heading: 'Livestock cost builds up from animals and feed through health, operations and overhead',
    intro: 'Cost is specific to the species and cycle, spanning animal sourcing, nutrition, health, farm operations, waste, logistics, capital and finance. Cash costs and accounting costs differ.',
    spec: {
      layout: 'driverTree', title: '11 What Determines Livestock Production Costs?', kicker: '',
      root: { label: 'Total cost per production cycle', detail: 'Variable and fixed cost for one species and cycle' },
      formula: 'Animals + feed + health + operations + other cost',
      drivers: [
        { label: 'Animal and breeding cost', detail: 'Young animals or breeding stock' },
        { label: 'Feed', detail: 'Share varies by species and production system' },
        { label: 'Health', children: [{ label: 'Veterinary and health' }, { label: 'Biosecurity' }] },
        { label: 'Farm operations', children: [{ label: 'Labor' }, { label: 'Housing' }, { label: 'Utilities' }] },
        { label: 'Other cost', detail: 'Waste, transport, finance, depreciation and overhead' },
      ],
      note: `${H}: saleable output rises 5%, but feed prices rise 12%, the selling price falls and mortality increases. Revenue grows while gross margin and net farm profit decline.`,
      takeaway: 'Livestock cost covers animals, feed, health, labor, housing, utilities, biosecurity, waste, transport, finance, depreciation and overhead, and cash and accounting costs differ.',
    },
  },
  'agri-livestock-m3-12': {
    heading: 'Mortality and cycle cost set the break-even revenue per saleable animal',
    intro: 'Try the chapter worked example: 1,000 starting animals, 5% mortality and 95,000 currency units of cycle cost give a break-even of 100 per saleable animal. Change mortality, cost or price to see the result move.',
    spec: {
      layout: 'scenario', title: '12 Which KPIs Drive Livestock Productivity and Profitability?', kicker: H,
      inputs: [
        { key: 'start', label: 'Starting animals', min: 500, max: 2000, step: 50, value: 1000, unit: 'animals' },
        { key: 'mort', label: 'Mortality rate', min: 0, max: 20, step: 1, value: 5, unit: '%' },
        { key: 'cost', label: 'Total relevant cycle cost', min: 50000, max: 150000, step: 5000, value: 95000, unit: 'currency units' },
        { key: 'price', label: 'Revenue per saleable animal', min: 60, max: 160, step: 5, value: 100, unit: 'currency units' },
      ],
      outputs: [
        { label: 'Saleable animals', unit: 'animals', digits: 0, compute: (v) => v.start * (1 - v.mort / 100) },
        { label: 'Break-even revenue per saleable animal', unit: 'currency units', digits: 1, compute: (v) => v.cost / (v.start * (1 - v.mort / 100)) },
        { label: 'Cycle margin before tax', unit: 'currency units', digits: 0, compute: (v) => v.price * v.start * (1 - v.mort / 100) - v.cost },
      ],
      assumption: `${H}. Illustrative inputs based on the chapter worked example, not market data. Results are before tax and ignore changes in sale weight.`,
      note: 'Read FCR, average daily gain, mortality, survival, cycle duration and revenue per animal by species and system before judging profit.',
      takeaway: 'FCR, growth, mortality, survival, cycle length, output, costs and prices must be read by species and system; productivity alone does not establish profitability.',
    },
  },
  'agri-livestock-m3-13': {
    heading: 'Large farms are served directly and smaller farms through intermediaries',
    intro: 'A feed company uses direct key accounts plus regional dealers with technical representatives. Each route is an alternative way to reach the farm, backed by the same technical sales effort.',
    spec: {
      layout: 'pathway', title: '13 How Do Livestock Producers Sell Their Outputs?', kicker: '',
      trunk: [{ label: 'Feed company', detail: 'Produces, prices and ships the product' }],
      optionsLabel: 'Routes to the farm — alternatives, not steps',
      options: [
        { label: 'Direct farm sale', detail: 'Key accounts and large farms served directly' },
        { label: 'Distributor', detail: 'Regional dealers cover smaller farms' },
        { label: 'Agricultural retailer', detail: 'Local point of sale for smaller farms' },
      ],
      afterLabel: 'Across every route',
      after: [
        { label: 'Technical sales', detail: 'Representatives support farm results' },
        { label: 'Channel contribution', detail: 'Measured after credit, inventory, logistics and claims', kind: 'outcome' },
      ],
      note: 'Evaluate contribution after credit, inventory, logistics, conflict, claims and technical-service cost.',
      takeaway: 'Coverage, delivery, working capital, relationships and technical support determine channel effectiveness.',
    },
  },
  'agri-livestock-m3-14': {
    heading: 'Dealers, cooperatives and digital orders each coordinate smaller farms differently',
    intro: 'Smaller farms are reached through dealers, cooperatives and digital coordination. Each route has its own costs, which must be counted before judging its contribution.',
    spec: {
      layout: 'table', title: '14 How Do Processors, Traders, and Contract Partners Connect to Farms?', kicker: '',
      headers: ['Route to smaller farms', 'What it coordinates', 'Cost to check'],
      rows: [
        { label: 'Dealer', a: 'Local stock, credit and relationships', b: 'Credit, inventory and channel conflict' },
        { label: 'Cooperative', a: 'Pooled purchasing for member farms', b: 'Logistics and claims handling' },
        { label: 'Digital order', a: 'Order and delivery coordination', b: 'Logistics and technical-service cost' },
      ],
      note: 'Evaluate contribution after credit, inventory, logistics, conflict, claims and technical-service cost.',
      takeaway: 'Coverage, delivery, working capital, relationships and technical support determine channel effectiveness.',
    },
  },
  'agri-livestock-m3-15': {
    heading: 'A contract partnership links integrator, grower, veterinarian and buyer through clear terms',
    intro: 'An integrator provides chicks and feed while growers provide housing and labor under defined purchase terms. The partnership works only when each party knows its responsibilities.',
    spec: {
      layout: 'ecosystem', title: '15 How Do Quality, Logistics, and Market Timing Affect Sales?', kicker: '',
      center: { label: 'Contract production', detail: 'Long-term arrangement with offtake' },
      actors: [
        { label: 'Integrator', relation: 'Animal supply and feed supply', flows: ['product'] },
        { label: 'Grower', relation: 'Housing and labor to the production standard', flows: ['service'] },
        { label: 'Veterinary support', relation: 'Health protocols and disease response', flows: ['service', 'oversight'] },
        { label: 'Purchase agreement', relation: 'Pricing, payment and rejected output', flows: ['money'] },
        { label: 'Risk allocation', relation: 'Mortality, disease and force majeure', flows: ['risk'] },
      ],
      note: 'Trust depends on documenting pricing, performance, mortality, disease, rejected output, force majeure, payment and termination.',
      takeaway: 'Partnerships reduce uncertainty only when terms, incentives and responsibilities are clear.',
    },
  },
  'agri-livestock-m3-16': {
    heading: 'Farms sit at the centre of traders, nutritionists, breeders, mills and processors',
    intro: 'A disease-control program coordinates breeder, feed mill, farms, veterinarian and processor. Each partner supplies something different to the same farms.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Livestock Ecosystem?', kicker: '',
      center: { label: 'Livestock farms', detail: 'Where animal performance is produced' },
      actors: [
        { label: 'Ingredient trader', relation: 'Supplies feed commodities', flows: ['product', 'risk'] },
        { label: 'Nutritionist', relation: 'Designs diets and advises', flows: ['information', 'service'] },
        { label: 'Feed mill', relation: 'Turns ingredients into feed', flows: ['product'] },
        { label: 'Breeder', relation: 'Supplies animals', flows: ['product'] },
        { label: 'Veterinarian', relation: 'Health and biosecurity support', flows: ['service', 'oversight'] },
        { label: 'Processor', relation: 'Buys and processes output', flows: ['money'] },
      ],
      note: 'Use shared specifications, records, alerts, corrective action and incentives across partners.',
      takeaway: 'Performance increasingly depends on ecosystem coordination beyond one company.',
    },
  },
  'agri-livestock-m3-17': {
    heading: 'Feed producer, farmer and veterinarian share one loop of records, alerts and corrective action',
    intro: 'Partners collaborate through shared specifications, records, alerts, corrective action and incentives. Each step has an owner, and results feed back into the next cycle.',
    spec: {
      layout: 'flow', title: '17 How Do Farmers, Feed Companies, Veterinarians, and Buyers Collaborate?', kicker: '',
      steps: [
        { label: 'Shared specification', detail: 'Feed and health standards agreed', owner: 'Feed producer' },
        { label: 'Farm records', detail: 'Performance and health logged', owner: 'Farmer' },
        { label: 'Health alert', detail: 'Problems flagged early', owner: 'Veterinarian' },
        { label: 'Corrective action', detail: 'Feed, farm or health change', owner: 'Feed producer and farmer' },
        { label: 'Aligned incentives', detail: 'Results rewarded across partners', kind: 'outcome', owner: 'All partners' },
      ],
      loop: 'Records from each cycle update the shared specification for the next.',
      takeaway: 'Performance increasingly depends on ecosystem coordination beyond one company.',
    },
  },
  'agri-livestock-m3-18': {
    heading: 'Public authorities, technical bodies and associations shape what farms must prove',
    intro: 'A laboratory validates feed nutrient and contaminant results while authorities oversee applicable requirements. Research and associations add technical knowledge and collaboration.',
    spec: {
      layout: 'taxonomy', title: '18 How Do Regulators, Banks, and Supporting Institutions Shape Livestock Production?', kicker: '',
      root: 'Institutions around livestock production', rootDetail: 'Different roles; check which body is competent for each issue',
      groups: [
        { label: 'Public authorities', detail: 'Oversee applicable requirements', items: ['Agriculture authority', 'Animal health', 'Food safety', 'Environment'] },
        { label: 'Laboratory', detail: 'Validates nutrient and contaminant results' },
        { label: 'University', detail: 'Research and technical knowledge' },
        { label: 'Association', detail: 'Collaboration across producers' },
      ],
      note: 'Verify current competent authority, method, accreditation, reporting, recall and outbreak responsibilities.',
      takeaway: 'Compliance and technical knowledge are essential to disease management, consumer protection and credibility.',
    },
  },
};
