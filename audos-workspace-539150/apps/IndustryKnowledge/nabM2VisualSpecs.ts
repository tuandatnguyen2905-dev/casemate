import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Non-Alcoholic Beverages Module 02 (value chain), keyed by visualKind. */
export const NAB_M2_VISUALS: Record<string, ChapterVisual> = {
  'nab-vc-21-1': {
    heading: 'A soft drink’s journey from treated water to the shop shelf',
    intro: 'Each block hands something to the next, so a delay in one shows up further along. Follow the Pepsi example from inputs to a sale and note which function owns each step.',
    spec: {
      layout: 'flow', title: 'From Ingredients to Finished Beverages', kicker: '',
      steps: [
        { label: 'Upstream inputs arrive', detail: 'Water treatment, sweeteners, flavors, carbon dioxide, packaging and equipment arrive on schedule', kind: 'stage', owner: 'Procurement' },
        { label: 'Formulate and process', detail: 'Concentrate is combined with treated water and carbon dioxide in a local plant', kind: 'stage', owner: 'Manufacturing' },
        { label: 'Fill, label and check', detail: 'The drink is filled, labeled and checked until it is a finished SKU', kind: 'stage', owner: 'Quality' },
        { label: 'Distribute through channels', detail: 'Distributors move the packaged bottle to traditional or modern retail', kind: 'stage', owner: 'Sales, Trade Marketing and Logistics' },
        { label: 'Consumer purchase', detail: 'A shopper finds the drink where demand occurs and buys it', kind: 'outcome' },
      ],
      loop: 'A packaging delay can reduce plant output; lower output weakens shelf availability; weak availability wastes marketing demand.',
      note: 'The upstream, midstream and downstream blocks are an analytical tool, not three separate companies: a brand owner, a bottler and outside suppliers may share them.',
      takeaway: 'Locate a business problem in its block first, then trace its dependencies in both directions.',
    },
  },
  'nab-vc-21-2': {
    heading: 'Who earns a share of the bottle’s price, and why',
    intro: 'Each partner solves a different problem for the next one. Compare what each contributes with what it has to carry, because revenue is not the same as economic power.',
    spec: {
      layout: 'ecosystem', title: 'Who Creates Value Along the Chain?', kicker: '',
      center: { label: 'Consumer price of a finished drink', detail: 'Shared among participants according to the value each adds and can defend' },
      actors: [
        { label: 'Ingredient and packaging suppliers', relation: 'Provide reliable, qualified inputs', flows: ['product', 'money'] },
        { label: 'Brand owner', relation: 'Owns recipes, brand demand and formulation IP', flows: ['information', 'money'] },
        { label: 'Bottler', relation: 'Converts at scale; carries plants and working capital', flows: ['product', 'money'] },
        { label: 'Distributor', relation: 'Holds inventory, breaks bulk and serves fragmented outlets', flows: ['product', 'service'] },
        { label: 'Retailer', relation: 'Creates convenience and final access for the shopper', flows: ['service', 'money'] },
      ],
      note: 'Bargaining power, scarcity, switching costs, capital needs and competition decide how much of the created value each participant keeps as profit.',
      takeaway: 'A high-revenue bottler may earn lower margins than the owner of concentrate and brand IP: creating value is not the same as capturing it.',
    },
  },
  'nab-vc-21-3': {
    heading: 'Reading a stock-out as a product, information, service or money failure',
    intro: 'Bottles move toward the consumer while cash moves back and information moves both ways. Use the last column to diagnose which flow actually broke.',
    spec: {
      layout: 'table', title: 'How Products, Information, and Money Flow', kicker: '',
      headers: ['Flow', 'Usual direction', 'Symptom when it fails'],
      rows: [
        { label: 'Physical product', a: 'Toward consumers: to distribution points, then outlets', b: 'Goods stuck in the wrong place in the chain' },
        { label: 'Information', a: 'Both ways: orders and sales data upstream, promotion plans downstream', b: 'Stock-outs or excess inventory' },
        { label: 'Services', a: 'Between partners: transport, merchandising, quality and support', b: 'A full warehouse while shelves stay empty' },
        { label: 'Money', a: 'Back toward producers and suppliers under payment terms', b: 'Strong sales but scarce cash and strained working capital' },
      ],
      note: 'In the convenience-store promotion example, the order, replenishment, production schedule, display checks and cash settlement all run at the same time.',
      takeaway: 'Separating the flows turns a vague supply-chain problem into a specific question for the right function.',
    },
  },
  'nab-vc-22-1': {
    heading: 'Why a drink that is mostly water still needs a wide sourcing basket',
    intro: 'Water is the bulk of the bottle, yet sweeteners, concentrate and specialist additives tie the plant to contracts and imports. Group the inputs by how they are sourced.',
    spec: {
      layout: 'taxonomy', title: 'Where Beverage Ingredients Come From', kicker: '',
      root: 'Soft-drink ingredient basket', rootDetail: 'Quality, continuity and landed cost matter as much as the quoted price',
      groups: [
        { label: 'Locally treated water', detail: 'Carbonated water averages about 94% of a soft drink by volume (cited guide)', items: ['Treated to specification at the plant'] },
        { label: 'Sweeteners', detail: 'Commonly about 6–12% of a soft drink in the cited guide; bought under contracts', items: ['Domestic sugar', 'Imported sugar'] },
        { label: 'Controlled formulation inputs', detail: 'Received under the brand owner’s control', items: ['Concentrate', 'Flavors'] },
        { label: 'Specialist additives', detail: 'Approved and tested before use', items: ['Carbon dioxide', 'Caffeine', 'Vitamins and minerals', 'Fruit inputs'] },
      ],
      note: 'Vietnam uses both domestic and imported sugar; the research records a recent comparison of about 250,000 tonnes exported and 640,000 tonnes imported.',
      takeaway: 'A cheap input that causes quality failure or downtime is expensive, so supplier qualification sits beside price.',
    },
  },
  'nab-vc-22-2': {
    heading: 'Everything that has to converge on the filling line',
    intro: 'A line can only run the formats it is designed and tooled for. See how materials, machines, technical services and specifications meet at one point.',
    spec: {
      layout: 'ecosystem', title: 'Packaging, Equipment, and Supplier Networks', kicker: '',
      center: { label: 'Filling line', detail: 'Runs only the containers and formats it is tooled to handle' },
      actors: [
        { label: 'Primary packaging suppliers', relation: 'PET, aluminum, glass and cartons; PET cheapest and glass dearest in the cited study', flows: ['product', 'money'] },
        { label: 'Closures, labels and secondary packs', relation: 'Seal and identify units, then group them into cartons, trays or wrap', flows: ['product'] },
        { label: 'Equipment makers', relation: 'Water-treatment systems, fillers and inspection equipment set speed, quality and scale', flows: ['product', 'money'] },
        { label: 'Technical service partners', relation: 'Spare parts, calibration and maintenance response', flows: ['service'] },
        { label: 'Brand, procurement and planning teams', relation: 'Set pack specifications, qualify suppliers and time material deliveries', flows: ['information'] },
      ],
      note: 'The research puts packaging at about 25–35% of beverage cost of goods, so one pack decision moves margin, logistics weight, shelf impact and capital at once.',
      takeaway: 'Judge packs and machines on total cost of ownership: maintenance and downtime can matter as much as the purchase.',
    },
  },
  'nab-vc-22-3': {
    heading: 'Where a beverage plant’s supply can break, and what protects it',
    intro: 'Price swings and supply interruptions are related but different. Read across each row to see why one blanket buffer cannot cover every exposure.',
    spec: {
      layout: 'table', title: 'Understanding Input Costs and Supply Risks', kicker: '',
      headers: ['Input exposure', 'What can go wrong', 'Targeted response'],
      rows: [
        { label: 'Commodity price volatility', a: 'Sugar, aluminum or PET resin costs move unpredictably', b: 'Stronger contracts; monitor commodity and currency exposure' },
        { label: 'Few qualified suppliers', a: 'Supplier power rises when few alternatives meet the specification', b: 'Approve alternatives; dual sourcing may be impossible for proprietary concentrate' },
        { label: 'Long import lead times', a: 'Imported equipment parts arrive late', b: 'Selective safety stock' },
        { label: 'Water stress', a: 'Climate and salinity pressure, especially in the Mekong Delta', b: 'Treatment, efficiency and site-level planning' },
        { label: 'Ingredient quality failure', a: 'An input fails quality standards', b: 'Qualified supply; holding more stock cannot solve poor quality' },
      ],
      note: 'Teams map spend, dependency, lead time, substitutability and operational impact before deciding where to spend protection.',
      takeaway: 'Resilience is selective: it spends protection where disruption would cause the greatest business damage.',
    },
  },
  'nab-vc-23-1': {
    heading: 'Turning a controlled recipe into thousands of identical bottles',
    intro: 'Every step affects consistency, safety, yield and speed. Follow the order of work and notice that the treatment step changes with the drink.',
    spec: {
      layout: 'flow', title: 'How Beverages Are Manufactured', kicker: '',
      steps: [
        { label: 'Production order', detail: 'Specifies recipe, batch size and pack', kind: 'stage' },
        { label: 'Verify materials', detail: 'Operators confirm approved ingredients and packaging', kind: 'stage' },
        { label: 'Treat water and dose', detail: 'Water is treated; automated systems dose ingredients', kind: 'stage' },
        { label: 'Blend and process', detail: 'Carbonation for soft drinks; pasteurization or aseptic systems for some juices and teas', kind: 'decision' },
        { label: 'Fill and close', detail: 'Format-specific line; pressure-compatible filling for carbonated drinks', kind: 'stage' },
        { label: 'Label and pack', detail: 'Labeling and secondary packing create a saleable SKU', kind: 'outcome' },
      ],
      note: 'Under the concentrate model, the brand owner supplies concentrate or syrup specifications and a local bottler adds treated water, sweetener and carbon dioxide where required. The research supports these process categories, not one universal sequence.',
      takeaway: 'A small dosing or setup error can affect a whole batch, so standard work and traceability are central.',
    },
  },
  'nab-vc-23-2': {
    heading: 'What happens when a line check lands outside its critical limit',
    intro: 'Quality is built in from incoming water to release, not inspected only at the end. See what each kind of result triggers at a quality gate.',
    spec: {
      layout: 'decision', title: 'Quality Control, Processing, and Packaging', kicker: '',
      root: { label: 'Quality gate on a carbonated line', detail: 'Water quality, syrup ratio, carbonation, fill level, cap or seam integrity, label accuracy, finished taste' },
      question: 'Is the measured result within its defined critical limit?',
      branches: [
        { condition: 'Within the limit', outcome: 'Record it and move toward release', detail: 'Release formally approves finished goods to enter distribution', tone: 'positive' },
        { condition: 'Drifting toward the limit', outcome: 'Correct the process early', detail: 'Preventive controls catch drift before a large quantity is produced, cutting waste', tone: 'caution' },
        { condition: 'Outside the limit', outcome: 'Isolate, investigate and trace', detail: 'Batch and packaging codes identify affected output; operators stop and escalate', tone: 'negative' },
      ],
      note: 'Plants use food-safety systems such as HACCP and ISO 22000 alongside applicable Vietnamese technical regulations.',
      takeaway: 'Stable, preventive processes protect consumers and also protect yield, speed and customer service.',
    },
  },
  'nab-vc-23-3': {
    heading: 'Long production runs versus frequent changeovers',
    intro: 'Running one SKU for a long time and switching often each win something and cost something. Compare the two plans against efficiency, inventory and service.',
    spec: {
      layout: 'compare', title: 'Storage, Transportation, and Operational Efficiency', kicker: '',
      leftTitle: 'Long single-SKU runs', rightTitle: 'Frequent switching between SKUs',
      rows: [
        { label: 'Line efficiency', a: 'Higher: less line time lost to changeovers', b: 'Lower: each switch consumes time and material' },
        { label: 'Inventory', a: 'Can build too much stock of one product', b: 'Production follows demand more closely' },
        { label: 'Responsiveness', a: 'Other products wait for their run', b: 'Faster response across flavors, sizes and formats' },
        { label: 'What it optimizes', a: 'Factory speed and capacity utilization', b: 'Service to many SKUs, channels and delivery points' },
      ],
      note: 'Chilled RTD coffee or juice adds cold-chain needs that shelf-stable products do not share, so warehousing and transport must be planned alongside production.',
      takeaway: 'A plant can run efficiently and still disappoint customers; end-to-end efficiency measures service as well as factory speed.',
    },
  },
  'nab-vc-24-1': {
    heading: 'From full truckloads to a single delivered can',
    intro: 'Bulk movement is cheap per case but far from the shopper. Follow how stock positioned by primary distribution fans out into different ways of reaching outlets and consumers.',
    spec: {
      layout: 'pathway', title: 'How Beverages Reach the Market', kicker: '',
      trunk: [
        { label: 'Plant allocation', detail: 'Manufacturers allocate finished stock by region', kind: 'stage' },
        { label: 'Primary distribution', detail: 'Full truckloads to a distribution center or regional distributor', kind: 'stage' },
      ],
      optionsLabel: 'How the stock then reaches demand',
      options: [
        { label: 'Secondary distribution', detail: 'The distributor sends mixed cases to many small shops, extending service or credit' },
        { label: 'Wholesaler layer', detail: 'Adds another step where the outlet base is fragmented' },
        { label: 'Last-mile delivery', detail: 'A quick-commerce partner delivers single orders from a local store or dark store' },
      ],
      afterLabel: 'What route design decides',
      after: [
        { label: 'Availability where demand occurs', detail: 'Reach, service frequency, inventory and cost traded off against each other', kind: 'outcome' },
      ],
      note: 'Going direct removes the distributor’s margin but also its services: the manufacturer must then fund vehicles, local inventory, sales calls, credit and collections.',
      takeaway: 'Match the route to channel economics and demand density, comparing total system cost rather than the visible margin.',
    },
  },
  'nab-vc-24-2': {
    heading: 'The same drink in a corner shop, a supermarket, a café and an app',
    intro: 'Each channel has its own shoppers, order patterns and data. Group the outlets by channel and note what each one asks of the supplier.',
    spec: {
      layout: 'taxonomy', title: 'Retail, Foodservice, and Digital Channels', kicker: '',
      root: 'Beverage sales channels', rootDetail: 'Distinct demand systems, each needing its own assortment, pack, promotion and delivery',
      groups: [
        { label: 'General Trade', detail: 'Fragmented independent outlets that require route density', items: ['Mom-and-pop stores', 'Markets', 'Traditional outlets'] },
        { label: 'Modern Trade', detail: 'Structured data and centralized negotiation', items: ['Supermarkets', 'Minimarts', 'Convenience chains'] },
        { label: 'Foodservice', detail: 'May require equipment or menu activation', items: ['Restaurants', 'Cafés', 'Hotels'] },
        { label: 'Digital channels', detail: 'Fast ordering and local delivery from nearby inventory', items: ['E-commerce', 'Quick commerce'] },
      ],
      note: 'Research estimates: mom-and-pop stores about 59.35% of Vietnam retail in 2025 and about 50.2% of carbonated-soft-drink revenue; modern trade near 29% of total retail by 2024. Their scopes differ, so do not add them.',
      takeaway: 'A portfolio that wins in one channel may underperform in another, so treat channels as different businesses, not identical doors.',
    },
  },
  'nab-vc-24-3': {
    heading: 'Why an advertised energy drink still has to be cold, visible and in stock',
    intro: 'Marketing creates preference, but the sale happens only where execution makes the drink purchasable. See which team drives each condition behind sell-out.',
    spec: {
      layout: 'driverTree', title: 'Marketing, Distribution Execution, and Delivery', kicker: '',
      root: { label: 'Sell-out to consumers', detail: 'Preference converted into a purchase at the outlet or in the app' },
      drivers: [
        { label: 'Brand preference', detail: 'Brand marketing builds awareness, such as mass media for a student-focused campaign' },
        { label: 'Channel programs', detail: 'Trade marketing turns the campaign into channel packs, promotions and stock plans' },
        { label: 'Listings and replenishment', detail: 'Sales teams and distributors secure listings and keep fresh stock flowing' },
        { label: 'In-outlet visibility', detail: 'Merchandising manages display, price communication and cooler or shelf execution' },
        { label: 'Delivery and app presence', detail: 'Last-mile delivery and app visibility during evening study hours' },
      ],
      note: 'Field information and sell-out signals feed replenishment and the next plan; sell-in to outlets alone does not show consumer demand.',
      takeaway: 'Downstream advantage comes from repeated small actions, such as working coolers and reliable delivery, that rivals find hard to copy at scale.',
    },
  },
  'nab-vc-25-1': {
    heading: 'Each stage’s output, including waste and data, is the next stage’s input',
    intro: 'An output counts only if the next stage can use it. Read across each row, and notice that records, data and waste leave alongside the product.',
    spec: {
      layout: 'table', title: 'Understanding Inputs and Outputs', kicker: '',
      headers: ['Stage', 'Inputs received', 'Outputs handed on'],
      rows: [
        { label: 'Upstream', a: 'Resources and supplier capabilities', b: 'Qualified ingredients, packs and equipment' },
        { label: 'Midstream filling line', a: 'Approved syrup, treated water, containers, labor, energy and a production order', b: 'Coded cases, quality records, production data, wastewater and packaging waste' },
        { label: 'Downstream', a: 'Finished inventory and brand plans', b: 'Availability, transactions and market information' },
      ],
      note: 'Balanced measures fit each transformation: procurement needs cost and service; manufacturing needs safety, quality, yield and output; distribution needs availability and delivery productivity.',
      takeaway: 'Raising line speed is not valuable if it creates defects, excess stock or warehouse congestion.',
    },
  },
  'nab-vc-25-2': {
    heading: 'The pack and the route can cost more than the liquid inside',
    intro: 'The research gives indicative cost ranges for a carbonated soft drink. Compare the blocks, then read the note on why concentrate and bottling margins differ.',
    spec: {
      layout: 'driverTree', title: 'Where Costs and Profits Are Generated', kicker: '',
      root: { label: 'Indicative CSD cost structure', detail: 'Research benchmark ranges, not one universal P&L' },
      drivers: [
        { label: 'Packaging', detail: 'About 25–35%, the largest cited block' },
        { label: 'Manufacturing labor and overhead', detail: 'About 20–25%' },
        { label: 'Water and ingredients', detail: 'About 15–20%' },
        { label: 'Logistics', detail: 'About 10–15%' },
      ],
      note: 'Coca-Cola states that finished-product operations generate higher net operating revenue but lower gross profit margin than concentrate operations; the research cites roughly 5–15% net profit for a standalone CSD plant.',
      takeaway: 'Compare margins only between matching operating models: a lower-margin bottler performs a different, asset-intensive role.',
    },
  },
  'nab-vc-25-3': {
    heading: 'How brand, volume and route density reinforce one another',
    intro: 'Two firms can buy similar sugar and packaging yet earn differently. Follow the reinforcing cycle to see why a connected system is harder to copy than one product.',
    spec: {
      layout: 'flow', title: 'How Companies Create Competitive Value', kicker: '',
      steps: [
        { label: 'Brand preference', detail: 'Differentiation and formulation IP support demand and price', kind: 'stage' },
        { label: 'Higher volume', detail: 'Volume spreads fixed costs and strengthens purchasing', kind: 'stage' },
        { label: 'Plant and route density', detail: 'Volume fills plants and supports denser outlet routes', kind: 'stage' },
        { label: 'Lower unit cost, better service', detail: 'Density lowers cost and improves availability', kind: 'stage' },
        { label: 'Protected brand', detail: 'Reliable service protects the brand', kind: 'outcome' },
      ],
      loop: 'A protected brand supports the next round of volume; portfolio discipline keeps complexity from weakening the cycle.',
      note: 'Tan Hiep Phat illustrates a local vertically integrated model, with more than one billion liters of annual production cited in the research.',
      takeaway: 'Competitive value combines lower system cost with meaningful differentiation, and makes both difficult for rivals to copy.',
    },
  },
  'nab-vc-26-1': {
    heading: 'What a global beverage company keeps central and what local bottlers do',
    intro: 'Shipping water-heavy finished drinks far is costly, so the system moves knowledge and concentrate instead. Compare what sits at the center with what happens near demand.',
    spec: {
      layout: 'compare', title: 'How Global Beverage Supply Chains Operate', kicker: '',
      leftTitle: 'Held at the global center', rightTitle: 'Done close to the market',
      rows: [
        { label: 'Product identity', a: 'Formula and concentrate or syrup creation', b: 'Combine with treated water and sweetener, then fill and package' },
        { label: 'Brand', a: 'Brand ownership and portfolio strategy', b: 'Merchandising, distribution and customer relationships' },
        { label: 'Investment', a: 'Intellectual property and global standards', b: 'Plants and routes funded by local operations' },
        { label: 'Coordination', a: 'Specifications, authorization, audits and data', b: 'Comply with local rules and adapt execution' },
      ],
      note: 'The Coca-Cola system sells concentrates and syrups to authorized bottling partners, who combine, package, merchandise and distribute finished beverages in their territories.',
      takeaway: 'Ownership is one coordination tool, not the only one: contracts, quality systems and audits keep partners consistent.',
    },
  },
  'nab-vc-26-2': {
    heading: 'Big southern plants feeding Vietnam’s fragmented outlet universe',
    intro: 'Vietnam has large automated plants and a very large base of small independent shops. See how producers, distributors, chains and digital partners connect that capacity to outlets.',
    spec: {
      layout: 'ecosystem', title: "Vietnam's Beverage Production and Distribution Network", kicker: '',
      center: { label: 'Vietnam outlet universe', detail: 'Traditional outlets, modern chains, foodservice and digital demand' },
      actors: [
        { label: 'Multinational bottlers', relation: 'Suntory PepsiCo’s USD 300 million Tay Ninh plant; Swire Coca-Cola’s USD 136 million Long An plant', flows: ['product'] },
        { label: 'Domestic manufacturers', relation: 'Tan Hiep Phat production above one billion liters annually', flows: ['product'] },
        { label: 'Regional distributors and wholesalers', relation: 'Hold inventory positioned by plants; routes serve fragmented stores', flows: ['product', 'service', 'money'] },
        { label: 'Key-account teams', relation: 'Serve organized modern retail chains centrally', flows: ['information', 'money'] },
        { label: 'Digital partners', relation: 'Add another ordering and delivery layer', flows: ['information', 'service'] },
      ],
      note: 'The plant figures are investments cited in the research, close to large southern demand and logistics corridors; no national capacity total is inferred from these individual projects.',
      takeaway: 'Plant investment creates capacity, but value depends on reaching outlets consistently, so Vietnam rewards manufacturing scale and route depth together.',
    },
  },
  'nab-vc-26-3': {
    heading: 'Localize, import or co-pack: building a Vietnam beverage chain',
    intro: 'Local production and global dependency can be true at the same time. Follow the question companies ask about each input or activity and where each answer leads.',
    spec: {
      layout: 'decision', title: 'Localization, Imports, Exports, and Dependencies', kicker: '',
      root: { label: 'An input or activity for the Vietnam chain', detail: 'Compared on landed cost, quality, scale, lead time, currency exposure and strategic control' },
      question: 'Can it be sourced or made locally at the required quality and scale?',
      branches: [
        { condition: 'Yes, efficiently', outcome: 'Localize it', detail: 'Water, some sugar, glass and PET can be sourced locally', tone: 'positive' },
        { condition: 'No, it is specialized', outcome: 'Import and manage the dependency', detail: 'Imported aluminum sheet, selected flavors and high-speed machinery bring cost and continuity exposure', tone: 'caution' },
        { condition: 'The brand has no plant', outcome: 'Use co-packing', detail: 'Contract manufacturing gives smaller brands local capacity without building a plant', tone: 'positive' },
      ],
      note: 'Domestic players include Tan Hiep Phat, and URC bottles locally under a Philippine parent. The OECD source records FDI inflows averaging about 4.8% of GDP over 2015–2023.',
      takeaway: 'Localization is a deliberate portfolio of local and global links, chosen for fit, cost and resilience.',
    },
  },
};
