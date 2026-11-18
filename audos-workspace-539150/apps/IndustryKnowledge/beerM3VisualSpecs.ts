import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Beer & Alcoholic Drinks Module 03, keyed by visualKind. */
export const BEER_M3_VISUALS: Record<string, ChapterVisual> = {
  'beer-m3-31-1-model-map': {
    heading: 'Separating brand owner, producer and route partner behind one label',
    intro: 'The label names one company, but several parties may make, import and deliver the bottle. Look at what each role controls and how it connects to the brand owner.',
    spec: {
      layout: 'ecosystem', title: 'Who Makes and Sells Alcoholic Beverages?', kicker: '',
      center: { label: 'Brand owner', detail: 'Controls the trademark, positioning and brand standards' },
      actors: [
        { label: 'Producer', relation: 'Converts inputs into finished product to the brand’s standards', flows: ['product'] },
        { label: 'Licensee', relation: 'Makes or sells the brand under agreed rights and conditions', flows: ['oversight', 'product'] },
        { label: 'Contract producer', relation: 'Manufactures for the brand for an agreed fee or commercial term', flows: ['product', 'money'] },
        { label: 'Importer', relation: 'Manages cross-border compliance for products made elsewhere', flows: ['product', 'oversight'] },
        { label: 'Distributor', relation: 'Holds stock, extends credit and serves outlets', flows: ['product', 'money', 'risk'] },
        { label: 'Retailer or hospitality operator', relation: 'Completes the sale or serves the adult consumer', flows: ['service', 'money'] },
      ],
      note: 'Sabeco reported 26 factories, 11 trading companies and reach to more than 200,000 shops for FY2023: one deeply integrated company, not a template for every producer.',
      takeaway: 'Brand, production and route-to-market control are separate choices that one group can combine or coordinate through contracts.',
    },
  },
  'beer-m3-31-2-boundaries': {
    heading: 'Own it, license it or buy it: drawing the operating boundary',
    intro: 'Companies set the boundary activity by activity. Start with whether a step differentiates the product or protects the licence to operate, then test whether a partner does it better.',
    spec: {
      layout: 'decision', title: 'Understanding Different Business Models', kicker: '',
      root: { label: 'One activity in the chain', detail: 'Brewing, distillation and ageing, packaging, distribution or market access' },
      question: 'Does this activity differentiate the product or protect the licence to operate?',
      branches: [
        { condition: 'Yes, and internal scale is stronger', outcome: 'Own it through vertical integration', detail: 'More control, but more capital, fixed cost and execution risk', tone: 'positive' },
        { condition: 'Yes, but a partner is more capable', outcome: 'License or contract under tight standards', detail: 'Keep recipe and brand governance; monitor specifications, territory and compliance', tone: 'caution' },
        { condition: 'No', outcome: 'Buy from a specialist', detail: 'Gain flexibility and local scale; accountability and risk do not leave with the activity', tone: 'positive' },
      ],
      note: 'ThaiBev’s 2017 purchase of 53.59% of Sabeco for US$4.78 billion was an ownership decision over a scaled brewer and route network: a historical transaction, not a current valuation benchmark.',
      takeaway: 'Integration buys control with capital; specialisation buys flexibility at the price of governing partners well.',
    },
  },
  'beer-m3-31-3-economics': {
    heading: 'Throughput, harvest and barrel time: three economic clocks',
    intro: 'Beer, wine and spirits tie up capital in different places and for different lengths of time. Compare where the cash sits and what each model must manage well.',
    spec: {
      layout: 'table', title: 'Why Business Models Have Different Economics', kicker: '',
      headers: ['Model', 'Where capital and time are tied up', 'What strategy must manage'],
      rows: [
        { label: 'Brewery', a: 'Fixed plant and packaging cost spread over high-throughput batches', b: 'Capacity utilisation and route density' },
        { label: 'Winery', a: 'Annual crop quality and volume', b: 'Harvest variability and vintage management' },
        { label: 'Aged-spirit distiller', a: 'Cash held in barrels for years before sale', b: 'Long-range forecasting and inventory finance' },
        { label: 'Brand owner without plants', a: 'Less manufacturing capital', b: 'Dependence on production partners' },
      ],
      note: 'Reported margins use different definitions: Diageo 28.9% adjusted operating margin (FY2026), Heineken 15.1% operating margin beia (FY2024), Sabeco about 14% net margin (FY2023). Do not rank them.',
      takeaway: 'Margin is an outcome of assets, time, portfolio and accounting choices, not a category label.',
    },
  },
  'beer-m3-32-1-categories': {
    heading: 'Fermented, distilled or ready-to-drink: what sits under the alcohol umbrella',
    intro: '“Alcohol” is a regulatory umbrella, not one category. Sort products by how the alcohol is made, and notice that a ready-to-drink can sit on any of the bases.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Alcoholic Beverage Categories', kicker: '',
      root: 'Alcoholic beverages', rootDetail: 'Category bundles production method, legal classification, experience and economic clock',
      groups: [
        { label: 'Fermented', items: ['Beer: brewed mainly from grain', 'Wine: fermented from grapes or other fruit'] },
        { label: 'Distilled', items: ['Spirits: fermentation plus distillation', 'Aged whisky: maturation lengthens inventory duration'] },
        { label: 'Ready-to-drink format', detail: 'A prepared serve in a packaged format; the base still matters', items: ['Malt-based', 'Wine-based', 'Spirit-based'] },
      ],
      note: 'OIV reported world wine production of 227 million hectolitres and consumption of 208 million hectolitres in 2025: wine only, not a beer or spirits benchmark. No Vietnam category split was verified.',
      takeaway: 'Two similar cans can carry different tax, labelling and route requirements because their alcohol base differs.',
    },
  },
  'beer-m3-32-2-segmentation': {
    heading: 'Building a price ladder that starts from the occasion',
    intro: 'A tier means something only inside one category, pack, channel and market. Follow how the occasion comes first, tiers are set relative to comparable products, and the ladder is then tested.',
    spec: {
      layout: 'pathway', title: 'How Alcoholic Beverage Markets Are Segmented', kicker: '',
      trunk: [
        { label: 'Start with the occasion', detail: 'What job is the adult consumer trying to do?', kind: 'stage' },
        { label: 'Set the acceptable choices', detail: 'Category, price range and pack format for that occasion', kind: 'stage' },
      ],
      optionsLabel: 'Relative tiers within that market',
      options: [
        { label: 'Value', detail: 'The entry step of the ladder' },
        { label: 'Mainstream', detail: 'Familiarity, reach and repeat purchase' },
        { label: 'Premium', detail: 'Trade-up through provenance, craftsmanship or presentation' },
        { label: 'Super-premium', detail: 'The top step, needing the strongest proof of value' },
      ],
      afterLabel: 'Before investing',
      after: [
        { label: 'Test recognition', detail: 'Do channels and consumers see the same ladder?', kind: 'decision' },
      ],
      note: 'Heineken reported FY2024 organic growth of 9% for its namesake brand and 10% for Heineken 0.0, against 1.6% total beer volume: company indicators, not Vietnam shares. No Vietnam tier cut-offs were verified.',
      takeaway: 'Premiumisation means earning more value from mix and experience, not encouraging adults to drink more.',
    },
  },
  'beer-m3-32-3-positioning': {
    heading: 'Price as the last line of the positioning argument',
    intro: 'A price holds only when everything before it is credible. Follow the steps from target occasion to a tested offer, and see where weak repeat sends you back.',
    spec: {
      layout: 'flow', title: 'Product Positioning, Differentiation, and Pricing', kicker: '',
      steps: [
        { label: 'Choose the occasion and need', detail: 'Target adult, occasion, frame of reference and unmet need', kind: 'stage' },
        { label: 'Select product proof', detail: 'Product truth and provenance as reasons to believe', kind: 'stage' },
        { label: 'Build distinctive cues', detail: 'Recognisable brand and pack signals', kind: 'stage' },
        { label: 'Set price and channel format', detail: 'A relative price within the pack-price architecture', kind: 'stage' },
        { label: 'Test repeat and unit economics', detail: 'Does price realisation hold after discounts and trade terms?', kind: 'outcome' },
      ],
      loop: 'If repeat purchase is weak, revisit the proof and cues rather than only changing the label or the price.',
      note: 'An international shelf price is not Vietnam willingness to pay: tax, income, channel and import structures differ, and no local tier thresholds or elasticities were validated.',
      takeaway: 'A product is not premium because it is expensive; a coherent proposition earns the price.',
    },
  },
  'beer-m3-33-1-segments': {
    heading: 'The same adult chooses differently when the occasion changes',
    intro: 'A segment describes a decision context, not a permanent identity. See how the job of the occasion, including moderation, changes what one person reaches for.',
    spec: {
      layout: 'decision', title: 'Understanding Alcoholic Beverage Consumers', kicker: '',
      root: { label: 'An adult of legal drinking age', detail: 'Moves across segments as context, budget and availability change' },
      question: 'What does this occasion need?',
      branches: [
        { condition: 'A shared social occasion', outcome: 'Beer', detail: 'Social connection within a group', tone: 'positive' },
        { condition: 'A meal', outcome: 'Wine', detail: 'Taste exploration alongside food', tone: 'positive' },
        { condition: 'A gift', outcome: 'An aged spirit', detail: 'Presentation and meaning for the recipient', tone: 'positive' },
        { condition: 'Moderation or driving', outcome: 'A no-alcohol product or no drink', detail: 'Non-consumption is a valid choice inside the framework', tone: 'caution' },
      ],
      note: 'WHO estimates 400 million people living with alcohol-use disorders and 2.6 million alcohol-attributable deaths globally in 2019; these figures set responsible-marketing limits and do not size any segment.',
      takeaway: 'Need-based segments improve product, pack and channel choices while excluding minors and avoiding stereotypes.',
    },
  },
  'beer-m3-33-2-decisions': {
    heading: 'Diagnosing the stage where a drinks purchase is lost',
    intro: 'Consumers do not weigh every bottle. Follow how context narrows the feasible set, cues build consideration, and availability plus value close the sale.',
    spec: {
      layout: 'flow', title: 'What Influences Alcoholic Beverage Purchasing Decisions?', kicker: '',
      steps: [
        { label: 'Context sets the boundaries', detail: 'On- or off-trade, serve now or later, driving or not, personal or gift', kind: 'stage' },
        { label: 'Regulation removes options', detail: 'The zero-alcohol driving rule can change the on-trade feasible set', kind: 'stage' },
        { label: 'Cues build consideration', detail: 'Taste, brand trust, provenance and pack familiarity', kind: 'stage' },
        { label: 'Value is judged', detail: 'Price and promotion weighed against perceived benefits', kind: 'decision' },
        { label: 'Availability converts', detail: 'Listed, visible, in stock and appropriately served', kind: 'outcome' },
      ],
      note: 'A distributor, retailer or bar is a customer too: it weighs margin opportunity, stock turns, credit, delivery reliability and space. No verified outlet margins were available.',
      takeaway: 'A brand can have awareness and still lose at pack fit, availability, service or price, so not every sales problem is a marketing problem.',
    },
  },
  'beer-m3-33-3-vietnam-matrix': {
    heading: 'Which Vietnam drinking-behaviour figures can bear weight',
    intro: 'Vietnam has a few figures, a known tax path and many gaps. Read each item’s source quality before letting it shape portfolio, price or route decisions.',
    spec: {
      layout: 'table', title: 'Consumer Behavior in Vietnam', kicker: '',
      headers: ['Evidence', 'What it indicates', 'Status and limit'],
      rows: [
        { label: '5.5 L pure alcohol per person', a: 'Global recorded and unrecorded consumption in 2019, down from 5.7 L in 2010', b: 'WHO public-health measure, not sales volume' },
        { label: '8.3 L pure alcohol per person', a: 'Vietnam in 2024, with beer about 91% of pure-alcohol consumption', b: 'Commercial vendor estimate: directional, not official' },
        { label: 'Beer SCT from 65% toward 90%', a: 'Rising five percentage points annually from 2027 to 2031', b: 'Known policy direction; shelf-price effect depends on pass-through' },
        { label: 'Drink-driving enforcement', a: 'Can change occasions, especially on-trade', b: 'Effect on demand not quantified' },
        { label: 'Evidence gaps', a: 'On-/off-trade share, demographic profile, willingness to pay, RTD segment size', b: 'Fill with transaction data, outlet audits or adult consumer research' },
      ],
      note: 'Channel and occasion must be read together: a shared meal on-trade, a take-home purchase and a gift each carry different pack, price and service needs.',
      takeaway: 'Read Vietnam demand through occasion, channel, affordability and regulation together, with every figure’s source quality visible.',
    },
  },
  'beer-m3-34-1-revenue': {
    heading: 'Splitting reported revenue into volume, realised price and mix',
    intro: 'Two companies can post the same growth with very different quality. Separate the operating drivers from currency, acquisitions and the way excise is presented.',
    spec: {
      layout: 'driverTree', title: 'How Alcoholic Beverage Companies Generate Revenue', kicker: '',
      root: { label: 'Reported revenue or net sales', detail: 'A company-defined line: check what is deducted' },
      formula: 'Commercial engine = volume × realised price × mix',
      drivers: [
        { label: 'Volume', detail: 'Units by product and pack', op: '×' },
        { label: 'Realised price', detail: 'Net price after discounts and trade terms', op: '×' },
        { label: 'Mix', detail: 'Tier, pack, channel and geography', op: '×' },
        { label: 'Reporting effects', detail: 'Applied on top of the operating engine', op: '±', children: [{ label: 'Currency translation' }, { label: 'Excise inside or outside the line' }, { label: 'Acquisitions and disposals' }] },
        { label: 'Secondary streams', detail: 'By-products, contract production, licensing or services; not universally material', op: '+' },
      ],
      note: 'Heineken reported €35.955 billion revenue but €29.821 billion net revenue for FY2024, with 1.6% organic beer-volume growth; Diageo reported US$19.643 billion net sales for FY2026. Sabeco’s VND30.5 trillion (FY2023) is one company, not the market.',
      takeaway: 'Growth from mix and price realisation is more durable than growth bought through discounting or currency.',
    },
  },
  'beer-m3-34-2-costs': {
    heading: 'Keeping excise, inventory funding and factory cost in separate boxes',
    intro: 'The liquid is only one part of cost. Sort each cost into its layer, and keep excise and inventory funding apart from what the plant spends.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Production and Operating Costs', kicker: '',
      root: 'Cost of an alcoholic beverage', rootDetail: 'Shares vary by category, plant scale, pack, channel and accounting policy',
      groups: [
        { label: 'Production costs', items: ['Agricultural inputs and ingredients', 'Packaging', 'Labour, utilities and maintenance', 'Depreciation and quality'] },
        { label: 'Operating costs', items: ['Logistics and warehousing', 'Selling and marketing', 'Administration and compliance'] },
        { label: 'Inventory funding', items: ['Distillate, barrels and storage', 'Evaporation before sale', 'Financing and insurance of stock'] },
        { label: 'Excise and tax', detail: 'Sits in price and reporting architecture, not factory cost', items: ['Vietnam beer SCT: 65% in the research period', 'Scheduled to reach 90% in 2031'] },
      ],
      note: 'A 2025 US academic analysis put hops at about 3.5% of brewer expenses: a US estimate, not a Vietnam benchmark. No verified itemised cost split exists, so no numeric waterfall is shown.',
      takeaway: 'Confusing cost of goods, operating expense, excise and capital funding leads to wrong margin diagnoses.',
    },
  },
  'beer-m3-34-3-profitability': {
    heading: 'Matching each profit lever to the margin line it moves',
    intro: 'Gross, operating and net margin measure different levels of profit. See which costs each level has absorbed and which levers act there.',
    spec: {
      layout: 'table', title: 'What Determines Profitability?', kicker: '',
      headers: ['Profit level', 'Reached after deducting', 'Levers that act here'],
      rows: [
        { label: 'Gross profit', a: 'Production and distribution costs from net revenue', b: 'Price and mix, yield, plant utilisation, route density' },
        { label: 'Operating profit', a: 'Operating expenses', b: 'Overhead and commercial investment' },
        { label: 'Net profit', a: 'Finance, tax and exceptional items', b: 'Capital choices and tax' },
      ],
      note: 'Heineken 15.1% operating margin beia (FY2024), Diageo 28.9% adjusted operating margin (FY2026) and Sabeco about 14% net margin (FY2023) use different definitions. In the first nine months of 2023, Sabeco revenue fell 12% and profit 26%, per trade reporting.',
      takeaway: 'When profit falls faster than revenue, only a bridge can separate fixed-cost absorption from mix or one-off effects.',
    },
  },
  'beer-m3-35-1-channel-split': {
    heading: 'Same bottle, two products: venue serve versus take-home shelf',
    intro: 'A bottle served in a restaurant includes staff, space and occasion; the same bottle in a shop competes on shelf, pack and price. Compare what each channel needs.',
    spec: {
      layout: 'compare', title: 'Understanding On-Trade and Off-Trade', kicker: '',
      leftTitle: 'On-trade', rightTitle: 'Off-trade',
      rows: [
        { label: 'Where consumption happens', a: 'At the venue: restaurants, bars and hotels', b: 'Elsewhere: traditional shops, supermarkets and other permitted formats' },
        { label: 'What is sold', a: 'Product plus service and experience', b: 'Take-home availability and value' },
        { label: 'Execution priorities', a: 'Listing, serve, cold availability, staff and menu visibility', b: 'Assortment, shelf placement, price communication and replenishment' },
        { label: 'Typical pack', a: 'Draught keg designed for venue throughput', b: 'Multipack designed for take-home storage' },
        { label: 'What the price funds', a: 'Rent, staff, glassware, refrigeration, waste and ambience', b: 'A different bundle of assets and services' },
      ],
      note: 'In Vietnam, fragmented hospitality and traditional trade need local route depth, while Modern Trade and Key Accounts buy more centrally. No verified current on-/off-trade share or margin exists.',
      takeaway: 'Treating the two channels as interchangeable can destroy availability or economics.',
    },
  },
  'beer-m3-35-2-network': {
    heading: 'From brewery or importer to thousands of small outlets',
    intro: 'Distribution bundles inventory, credit, order capture and collections, not just transport. Follow stock through route partners until it fans out to very different outlet types.',
    spec: {
      layout: 'pathway', title: 'How Alcoholic Beverage Distribution Works', kicker: '',
      trunk: [
        { label: 'Producer or importer', detail: 'Forecasts and allocates stock; importers handle border and product compliance', kind: 'stage' },
        { label: 'Trading companies', detail: 'Coordinate territories', kind: 'stage' },
        { label: 'Distributors and wholesalers', detail: 'Hold stock, extend terms, break bulk and collect payment', kind: 'stage' },
      ],
      optionsLabel: 'Outlet routes served',
      options: [
        { label: 'General Trade', detail: 'Fragmented independent retail and hospitality outlets' },
        { label: 'Modern Trade', detail: 'Organised chains with centralised buying' },
        { label: 'Key Accounts', detail: 'Negotiated terms and service; may buy centrally' },
        { label: 'Regulated digital channels', detail: 'Ordering or fulfilment where lawful, with age controls' },
      ],
      note: 'Sabeco reported 11 trading companies, reach to more than 200,000 shops and exports to 30 countries for FY2023: one company’s route scale, not a Vietnam-wide architecture.',
      takeaway: 'Removing an intermediary removes its invoice, not the warehousing, credit and collections it performs.',
    },
  },
  'beer-m3-35-3-channel-economics': {
    heading: 'What a channel really earns once cost-to-serve and credit are counted',
    intro: 'Gross sales can rise while value falls. Build contribution down from net revenue, and keep stock and receivables in view beside it.',
    spec: {
      layout: 'driverTree', title: 'The Economics of Beverage Sales Channels', kicker: '',
      root: { label: 'Channel contribution', detail: 'Revenue left after channel-attributable costs; define the metric first' },
      formula: 'Contribution = net revenue after terms − product and delivery cost − channel selling and service cost',
      drivers: [
        { label: 'Net revenue after terms', detail: 'Gross-to-net: discounts, allowances and trade investment', op: '+' },
        { label: 'Product and delivery cost', detail: 'Order size, drop frequency and distance', op: '−' },
        { label: 'Channel selling and service cost', detail: 'Listing, promotion, data and outlet service', op: '−' },
        { label: 'Working capital alongside', detail: 'Judged next to contribution, not inside it', op: '+', children: [{ label: 'Stock turns' }, { label: 'Days receivable' }, { label: 'Credit risk and returns' }] },
      ],
      note: 'No verified Vietnam channel margins or on-/off-trade shares exist, so compare observable drivers: order size, drop frequency, stock turns, return rate, listing coverage and on-shelf availability.',
      takeaway: 'The goal is profitable, compliant availability, not maximum shipment at any cost.',
    },
  },
  'beer-m3-36-1-ecosystem': {
    heading: 'Stakeholders who never own the bottle but shape the business',
    intro: 'The value chain follows the product; the ecosystem adds those who finance, govern or live with its effects. Group the stakeholders by the role they play.',
    spec: {
      layout: 'taxonomy', title: 'Mapping the Alcoholic Beverage Ecosystem', kicker: '',
      root: 'Alcoholic-beverage ecosystem', rootDetail: 'Product, money, information, tax and standards move through different links',
      groups: [
        { label: 'Supply base', items: ['Growers and maltsters', 'Packaging and equipment suppliers', 'Logistics providers', 'Financiers'] },
        { label: 'Commercial core', items: ['Producers and brand owners', 'Importers and distributors', 'Retailers and hospitality'] },
        { label: 'Public authority', items: ['Regulators: licensing, excise, drink-driving rules', 'Health bodies'] },
        { label: 'Society', items: ['Adult consumers', 'Employees', 'Communities bearing externalities'] },
      ],
      note: 'Brewers of Europe reporting for 2025 described about 10,000 breweries, about two million supported jobs and €52 billion of value added in Europe: regional estimates. Heineken Vietnam’s 2020 figure of about 0.75% of GDP is a company claim.',
      takeaway: 'A packaging shortage, credit problem, rule change or loss of community trust can stall the model even when demand exists.',
    },
  },
  'beer-m3-36-2-value-exchange': {
    heading: 'What each partner gives, receives and risks around a beverage producer',
    intro: 'Every exchange has two sides. Look at what moves along each link, from product and money to information, risk and oversight, and where outcomes escape the price.',
    spec: {
      layout: 'ecosystem', title: 'How Stakeholders Create and Exchange Value', kicker: '',
      center: { label: 'Beverage producer', detail: 'Pays for inputs, funds stock, shares forecasts and pays taxes' },
      actors: [
        { label: 'Input suppliers', relation: 'Provide specification and continuity in return for payment', flows: ['product', 'money'] },
        { label: 'Distributors', relation: 'Provide reach while taking inventory and credit risk; receive forecasts', flows: ['product', 'money', 'information', 'risk'] },
        { label: 'Government', relation: 'Grants permission under rules and receives tax', flows: ['oversight', 'money'] },
        { label: 'Adult consumers', relation: 'Receive product and experience; health impacts remain a public concern', flows: ['product', 'money'] },
        { label: 'Communities', relation: 'Experience jobs and impacts outside the transaction price', flows: ['risk'] },
      ],
      note: 'Intermalt’s reported US$70 million, 110,000-tonne Vietnam malting facility (2020) processes imported Australian barley locally for brewers including Heineken and Carlsberg.',
      takeaway: 'Relationships that hide risk or withhold information weaken resilience; durable models make service and risk visible.',
    },
  },
  'beer-m3-36-3-regulation': {
    heading: 'Vietnam’s beer tax and drink-driving calendar to 2031',
    intro: 'One rule already shapes occasions and the excise schedule is known years ahead. Read the dates, then ask how partners will carry compliance to the outlet.',
    spec: {
      layout: 'timeline', title: 'Why Regulation and Partnerships Matter', kicker: '',
      events: [
        { period: '2019', label: 'Zero-alcohol driving rule applies', detail: 'Zero tolerance changes on-trade occasions', status: 'historical' },
        { period: 'Research period', label: 'Beer SCT reported at 65%', detail: 'Shapes price architecture and reporting', status: 'current' },
        { period: '2027', label: 'Annual increases begin', detail: 'Beer SCT rises five percentage points a year', status: 'forecast' },
        { period: '2031', label: 'Scheduled endpoint of 90%', detail: 'Reported statutory endpoint for beer and strong alcohol', status: 'forecast' },
      ],
      note: 'Pass-through is a decision along the chain, not a mechanical result; the research does not quantify Vietnam price elasticity, so no revenue, volume or margin impact is forecast.',
      takeaway: 'Regulation defines the feasible model, and partner governance decides whether compliance survives at the point of sale.',
    },
  },
};
