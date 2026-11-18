import type { LogisticsDistributionChapterVisual } from './logisticsDistributionVisualSpecs';

/** Chapter-specific Learning Visuals for Distribution & Market Expansion Services Module 01 (definition, history, global and Vietnam overview, drivers), keyed by visualKind. */
export const LOGISTICS_DISTRIBUTION_M1_VISUALS: Record<string, LogisticsDistributionChapterVisual> = {
  'logistics-distribution-m1-1': {
    heading: 'How a provider turns a principal’s products into outlet-level market presence',
    intro: 'The chapter’s example follows one provider from receiving a principal’s products to reporting outlet-level performance. Each step combines product availability with commercial execution.',
    spec: {
      layout: 'flow', title: '01 What Are Distribution & Market Expansion Services?', kicker: '',
      steps: [
        { label: 'Receive products', detail: 'The principal’s portfolio enters the provider', owner: 'Principal → provider' },
        { label: 'Place inventory near demand', detail: 'Physical distribution makes products available', owner: 'Provider' },
        { label: 'Build retailer coverage', detail: 'Reach across retail, e-commerce and business channels', owner: 'Provider' },
        { label: 'Run field sales', detail: 'Develops customers and grows the market', owner: 'Field team' },
        { label: 'Report outlet performance', detail: 'Outlet-level evidence back to the brand', kind: 'outcome', owner: 'Provider → principal' },
      ],
      note: 'Physical distribution is the base; the service also helps brands develop customers and grow markets.',
      takeaway: 'The industry bridges brands and fragmented demand by combining product availability, local market knowledge and commercial execution.',
    },
  },
  'logistics-distribution-m1-2': {
    heading: 'Route to market is distinctive because three capabilities must work together',
    intro: 'A route to market links channels, partners, roles and processes to target customers. This industry stands out by combining availability, local knowledge and execution for fragmented demand.',
    spec: {
      layout: 'driverTree', title: '02 What Makes the Industry Unique?', kicker: '',
      root: { label: 'Reaching fragmented demand', detail: 'Connecting an offer with target customers' },
      formula: 'Product availability + local market knowledge + commercial execution',
      drivers: [
        { label: 'Product availability', detail: 'Products present where demand is scattered' },
        { label: 'Local market knowledge', detail: 'A separate approach for each customer type', children: [{ label: 'Independent shops' }, { label: 'Chain retailers' }, { label: 'Marketplaces' }, { label: 'Provincial distributors' }] },
        { label: 'Commercial execution', detail: 'Increasingly expected to be measurable' },
      ],
      note: 'Route to market: the channels, partners, roles and processes that connect an offer with target customers.',
      takeaway: 'The industry is distinctive because one route to market must combine availability, local market knowledge and commercial execution to bridge brands and fragmented demand.',
    },
  },
  'logistics-distribution-m1-3': {
    heading: 'Distribution sits beside retail, forwarding, 3PL and consulting without being any of them',
    intro: 'Distribution services create availability and commercial execution. Neighbouring activities sell to end customers, arrange transport, operate inventory or advise—and one provider may combine several.',
    spec: {
      layout: 'taxonomy', title: '03 Where Does the Industry Begin and End?', kicker: '',
      root: 'Distribution and its neighbours', rootDetail: 'Separate roles — define the boundary before comparing',
      groups: [
        { label: 'Distributor', detail: 'Creates availability and commercial execution' },
        { label: 'Commercial operator', detail: 'May import, own stock, sell and run field execution' },
        { label: 'Retailer', detail: 'Sells to end customers' },
        { label: 'Freight forwarder', detail: 'Arranges transport' },
        { label: 'Contract logistics (3PL)', detail: 'Operates inventory flows: stores and moves goods' },
        { label: 'Strategy consultant', detail: 'Recommends choices without necessarily executing' },
      ],
      note: 'Define inventory title, customer contract, import role, channel authority, credit risk and revenue basis before comparison.',
      takeaway: 'A distributor is not a retailer, freight forwarder or 3PL, and market expansion is not pure strategy consulting.',
    },
  },
  'logistics-distribution-m1-4': {
    heading: 'Service models split by who owns the stock and how the provider is paid',
    intro: 'Distribution models differ in inventory ownership, pricing authority, credit exposure, customer contract and compensation. The same brand can use more than one model at once.',
    spec: {
      layout: 'taxonomy', title: '04 Understanding Major Distribution Service Models', kicker: '',
      root: 'Distribution service models', rootDetail: 'Grouped by economic basis, not by name',
      groups: [
        { label: 'Buys and resells', detail: 'Owns the inventory as principal', items: ['Buy and resell', 'Principal distributor'] },
        { label: 'Earns commission', detail: 'Secures orders without buying stock', items: ['Sales agent'] },
        { label: 'Earns a service fee', detail: 'External reps, account management or field execution', items: ['Sales outsourcing'] },
        { label: 'Ownership set by agreement', detail: 'Document who holds title, and until when', items: ['Consignment'] },
        { label: 'Combined scope', detail: 'Several services under one partner', items: ['Integrated expansion'] },
      ],
      note: 'One party can buy inventory while another earns a commission for securing orders. Document principal-versus-agent status rather than inferring it from the word distributor.',
      takeaway: 'A principal distributor that buys and resells is economically different from an agent earning commission or a fee-based sales team.',
    },
  },
  'logistics-distribution-m1-5': {
    heading: 'The provider’s role, not its label, sets risk, revenue and accountability',
    intro: 'A provider can act as product owner, distribution operator or fee-based commercial partner. The chapter’s examples show how the relationship to stock changes between them.',
    spec: {
      layout: 'table', title: '05 Who Are the Customers and Stakeholders?', kicker: '',
      headers: ['Provider role', 'Chapter example', 'Relationship to stock'],
      rows: [
        { label: 'Product owner', a: 'Wholesaler buys and resells inventory', b: 'Owns the stock it sells' },
        { label: 'Distribution operator', a: '3PL moves client-owned goods', b: 'Handles stock the client owns' },
        { label: 'Fee-based partner', a: 'Outsourced sales team builds demand', b: 'Does not own stock' },
      ],
      note: 'Compare import rights, inventory ownership, credit exposure, channel authority and fee structure before comparing providers.',
      takeaway: 'The provider’s role—product owner, distribution operator or fee-based commercial partner—determines risk, revenue and accountability.',
    },
  },
  'logistics-distribution-m1-6': {
    heading: 'A regional distributor’s capabilities grow stage by stage beyond bulk resale',
    intro: 'Wholesale distribution developed as local intermediaries added planning, field and monitoring capabilities. The chapter’s example follows one regional distributor through that progression.',
    spec: {
      layout: 'timeline', title: '06 How Did Wholesale Distribution Develop?', kicker: '',
      events: [
        { period: 'Starting point', label: 'Bulk resale', detail: 'Local wholesaler resells product', status: 'historical' },
        { period: 'Coverage', label: 'Outlet mapping', detail: 'Knows which outlets to serve', status: 'historical' },
        { period: 'Availability', label: 'Replenishment', detail: 'Inventory planning keeps outlets stocked', status: 'historical' },
        { period: 'In store', label: 'Merchandising', detail: 'Field sales support at the shelf', status: 'historical' },
        { period: 'Today', label: 'Performance reporting', detail: 'Service monitoring for the principal', status: 'current' },
      ],
      note: 'An illustrative progression for one regional distributor, not a dated industry history.',
      takeaway: 'Wholesale intermediaries evolved from product resale into broader capabilities for availability, account management and customer service.',
    },
  },
  'logistics-distribution-m1-7': {
    heading: 'Route-to-market models moved from local resale to professional, controlled networks',
    intro: 'Importers, agents, trading companies and local wholesalers developed into professional networks. Local relationships kept their value while standardized controls became necessary.',
    spec: {
      layout: 'compare', title: '07 How Did Modern Retail and Route-to-Market Models Evolve?', kicker: '',
      leftTitle: 'Traditional intermediary', rightTitle: 'Professional route-to-market network',
      rows: [
        { label: 'Who', a: 'Importers, agents, trading companies', b: 'Professional distribution networks' },
        { label: 'Core role', a: 'Product resale', b: 'Availability, account management, customer service' },
        { label: 'Working tools', a: 'Local relationships', b: 'Inventory planning and field sales' },
        { label: 'Control', a: 'Relationship-based', b: 'Standardized controls and service monitoring' },
      ],
      note: 'Fragmented retail and geographic diversity keep local relationships valuable even as controls standardize.',
      takeaway: 'Modern route-to-market models keep local relationships but add the planning, field sales and standardized monitoring that professional networks require.',
    },
  },
  'logistics-distribution-m1-8': {
    heading: 'Digital services were layered onto local distribution networks, not substituted for them',
    intro: 'Outsourced commercial services expanded as marketplaces, digital campaigns, sales-force automation and analytics were added to local networks. DKSH, for example, describes a portfolio from market insights to after-sales services.',
    spec: {
      layout: 'pathway', title: '08 How Did Outsourced Commercial Services Expand?', kicker: '',
      trunk: [{ label: 'Local distribution network', detail: 'Physical flow of products to channels' }],
      optionsLabel: 'Services layered on top — combined as needed, not in sequence',
      options: [
        { label: 'Marketplaces', detail: 'Online channel access' },
        { label: 'Digital campaigns', detail: 'Demand creation online' },
        { label: 'Sales-force automation', detail: 'Tools for field visits and orders' },
        { label: 'Analytics', detail: 'Commercial information for decisions' },
        { label: 'Integrated service platforms', detail: 'Several services bundled together' },
      ],
      afterLabel: 'Result',
      after: [{ label: 'Omnichannel market access', detail: 'Access, customer development and information combined', kind: 'outcome' }],
      note: 'DKSH describes market insights, omnichannel sales and marketing, distribution, regulatory and after-sales services—company context, not a universal industry definition.',
      takeaway: 'Digitalization expands the role from physical flow to coordinated market access, customer development and commercial information.',
    },
  },
  'logistics-distribution-m1-9': {
    heading: 'Flexible entry lets a brand test online while a local partner builds physical reach',
    intro: 'In Vietnam, a brand can test online demand while a local partner builds retail listings, field execution and regional availability. Digitalization widened what providers coordinate, which makes this split possible.',
    spec: {
      layout: 'compare', title: "09 How Did Vietnam's Distribution Industry Develop?", kicker: '',
      leftTitle: 'Brand: online test', rightTitle: 'Local partner: physical build',
      rows: [
        { label: 'Goal', a: 'Test online demand', b: 'Build regional availability' },
        { label: 'Main activity', a: 'Selling through online channels', b: 'Retail listings and field execution' },
        { label: 'What it develops', a: 'Customer development', b: 'Coordinated market access' },
      ],
      note: 'The two tracks run in parallel; neither has to finish before the other starts.',
      takeaway: 'Digitalization makes entry flexible: online demand testing and local physical market access can be developed at the same time.',
    },
  },
  'logistics-distribution-m1-10': {
    heading: 'The global industry is a patchwork of five activity types, not one market',
    intro: 'Globally, distribution and market expansion spans wholesale, specialized distribution, sales outsourcing, channel management and market-entry work across regions. Each sector adds its own requirements.',
    spec: {
      layout: 'taxonomy', title: '10 How Is the Global Industry Structured?', kicker: '',
      root: 'Global distribution activity', rootDetail: 'Fragmented — not one consistently defined market',
      groups: [
        { label: 'Wholesale', detail: 'Broad resale of products' },
        { label: 'Specialized distribution', detail: 'Sector rules, e.g. healthcare traceability' },
        { label: 'Sales outsourcing', detail: 'External sales and field teams' },
        { label: 'Channel management', detail: 'Running partners and channels for brands' },
        { label: 'Market-entry activities', detail: 'Helping brands enter new markets' },
      ],
      note: 'Sector scope matters: healthcare may require traceability and regulation, while industrial distribution may depend on technical sales and after-sales support.',
      takeaway: 'Distribution and market expansion is not one consistently defined global market; opportunity must be evaluated by sector, geography and service category.',
    },
  },
  'logistics-distribution-m1-11': {
    heading: 'Segment opportunity by sector, geography and service category before sizing it',
    intro: 'Distribution markets are segmented along three lenses. An estimate built for one segment cannot simply be carried over to another.',
    spec: {
      layout: 'table', title: '11 How Are Distribution Markets Segmented?', kicker: '',
      headers: ['Lens', 'What it separates', 'Chapter caution'],
      rows: [
        { label: 'Sector', a: 'Healthcare vs industrial distribution', b: 'Different rules and sales skills' },
        { label: 'Geography', a: 'Regions and countries', b: 'Broad estimates do not transfer to Vietnam' },
        { label: 'Service category', a: 'Wholesale, logistics, market expansion', b: 'Logistics value is not expansion revenue' },
      ],
      note: 'Do not transfer a broad wholesale or logistics market estimate into a Vietnam market-expansion revenue claim.',
      takeaway: 'Opportunity must be evaluated by sector, geography and service category, so a market figure is only usable inside the segment it measures.',
    },
  },
  'logistics-distribution-m1-12': {
    heading: 'Brands use providers when building every local function in-house is slow, costly or risky',
    intro: 'Demand for providers is strongest where cross-border entry, product launches, fragmented retail or digital commerce make a full in-house build-out hard. Outsourcing keeps that cost flexible.',
    spec: {
      layout: 'decision', title: '12 Who Are the Major Service-Provider Types?', kicker: '',
      root: { label: 'Brand entering or launching', detail: 'Cross-border entry, new portfolio or digital commerce' },
      question: 'Is building every local commercial function internally slow, costly or risky?',
      branches: [
        { condition: 'Yes, across functions', outcome: 'Use an existing distributor network', detail: 'Launch before committing to a full local sales organization', tone: 'positive' },
        { condition: 'For some activities', outcome: 'Outsource selected commercialization', detail: 'Keep the remaining functions in-house', tone: 'caution' },
        { condition: 'No', outcome: 'Build the local organization', detail: 'Demand for providers is weakest here' },
      ],
      note: 'Provider types differ by which commercialization activities they take over; flexible cost is the shared appeal.',
      takeaway: 'Demand is strongest when market complexity makes building every local commercial function internally slow, costly or risky.',
    },
  },
  'logistics-distribution-m1-13': {
    heading: 'A geographic distribution model must adapt five commercial elements, not only delivery',
    intro: 'Fragmented channels differ from place to place, so entering a region means adapting more than distribution. The chapter names five areas of local adaptation.',
    spec: {
      layout: 'driverTree', title: '13 How Do Geographic Distribution Models Differ?', kicker: '',
      root: { label: 'Fit with a local market', detail: 'Where channels are fragmented' },
      drivers: [
        { label: 'Assortment', detail: 'Which products to offer locally' },
        { label: 'Price architecture', detail: 'Price points and structure' },
        { label: 'Regulation', detail: 'Local product and channel rules' },
        { label: 'Channel terms', detail: 'Conditions agreed with each channel' },
        { label: 'Regional demand', detail: 'What each region actually buys' },
      ],
      takeaway: 'Geographic distribution models work when local adaptation covers assortment, price architecture, regulation, channel terms and regional demand—not distribution alone.',
    },
  },
  'logistics-distribution-m1-14': {
    heading: 'Four pairs of distribution metrics that are often confused',
    intro: 'Sell-in, sell-out, GMV, revenue, share and growth figures use different entities and denominators. Each pair below must be kept apart.',
    spec: {
      layout: 'compare', title: '14 How Are Distribution Markets Measured?', kicker: '',
      leftTitle: 'Reported figure', rightTitle: 'Not automatically the same as',
      rows: [
        { label: 'Channel flow', a: 'Sell-in: supplier to channel', b: 'Sell-out: channel to customer' },
        { label: 'Transaction value', a: 'GMV', b: 'Recognized revenue' },
        { label: 'Share', a: 'Market share', b: 'Distribution share' },
        { label: 'Growth', a: 'Sales growth', b: 'Profitable growth' },
      ],
      note: 'A distributor can raise sell-in by loading channel inventory while sell-out, cash collection and contribution deteriorate. Align product, channel, period, entity, returns, tax and accounting basis.',
      takeaway: 'Sell-in is not sell-out, GMV is not automatically revenue, market share is not distribution share, and sales growth is not necessarily profitable growth.',
    },
  },
  'logistics-distribution-m1-15': {
    heading: 'Vietnam’s market runs traditional, organized, digital and business channels side by side',
    intro: 'Vietnam’s domestic market combines independent outlets, traditional markets, chains, specialist retailers, e-commerce and business customers. The opportunity lies in coordinating them.',
    spec: {
      layout: 'taxonomy', title: "15 How Is Vietnam's Distribution Landscape Structured?", kicker: '',
      root: 'Vietnam domestic market', rootDetail: 'Channels coexist; none is assumed to replace the others',
      groups: [
        { label: 'Traditional trade', detail: 'Fragmented outlets served by local networks', items: ['Independent outlets', 'Traditional markets'] },
        { label: 'Organized retail', detail: 'Organized store formats', items: ['Chains', 'Specialist retailers'] },
        { label: 'Digital', detail: 'Online channels', items: ['E-commerce'] },
        { label: 'Business customers', detail: 'Buyers outside consumer retail' },
      ],
      note: 'The chapter’s market-wide figures (MOIT/DMS estimates, NSO observation) describe retail and e-commerce, not distributor revenue.',
      takeaway: 'Vietnam’s opportunity lies in coordinating traditional, organized and digital channels rather than assuming one will replace the others.',
    },
  },
  'logistics-distribution-m1-16': {
    heading: 'General trade and modern trade need different coverage, processes and teams',
    intro: 'General trade is fragmented and field-intensive; modern trade runs on centralized listing and account processes. Digital and specialty channels add requirements of their own.',
    spec: {
      layout: 'compare', title: '16 How Do Traditional and Modern Trade Differ?', kicker: '',
      leftTitle: 'General trade (GT)', rightTitle: 'Modern trade (MT)',
      rows: [
        { label: 'Outlets', a: 'Fragmented independent shops', b: 'Organized chains, e.g. supermarkets' },
        { label: 'Selling model', a: 'Field-intensive coverage', b: 'Centralized listing and account processes' },
        { label: 'Team', a: 'One rep serves many shops', b: 'Key-account team negotiates terms and promotions' },
      ],
      note: 'Convenience, pharmacy and specialty, e-commerce and direct B2B add distinct fulfillment, data and compliance needs. Design territory, assortment, service frequency, credit and trade investment by channel.',
      takeaway: 'Channel coverage, economics and execution cannot be assumed transferable across GT, MT and e-commerce.',
    },
  },
  'logistics-distribution-m1-17': {
    heading: 'Market figures distributors cite have different sources and bases—none is distributor revenue',
    intro: 'Whichever domestic or multinational distributors take part, these figures describe Vietnam’s retail and e-commerce channels, not their sales. Keep the MOIT/DMS estimates and the NSO observation apart.',
    spec: {
      layout: 'table', title: '17 How Do Domestic and Multinational Distributors Participate?', kicker: '',
      headers: ['Figure', 'Source and basis', 'Not to be read as'],
      rows: [
        { label: 'US$269B retail', a: 'MOIT/DMS year-end estimate, 2025', b: 'Distributor revenue' },
        { label: 'US$32B e-commerce', a: 'MOIT/DMS estimate, 2025', b: 'One provider’s sales' },
        { label: 'VND7,008.9T retail', a: 'NSO observation, 2025, up 9.2%', b: 'Same basis as the DMS estimate' },
        { label: 'About US$262.7B', a: 'NSO value converted to US dollars', b: 'Directly comparable with US$269B' },
      ],
      note: 'Currency conversions and report methodologies can produce different US-dollar totals.',
      takeaway: 'Vietnam’s opportunity lies in coordinating traditional, organized and digital channels; the market figures size those channels, not any distributor’s sales.',
    },
  },
  'logistics-distribution-m1-18': {
    heading: 'Modern trade and e-commerce each add their own management requirements',
    intro: 'Retail and digital channels draw on the same partners, but each adds distinct work. Modern trade needs listing and promotion governance; e-commerce adds content, pricing, campaigns and performance management.',
    spec: {
      layout: 'taxonomy', title: '18 How Do Retail and Digital Channels Interact?', kicker: '',
      root: 'Channel requirements', rootDetail: 'Added on top of route-to-market design and partner capability',
      groups: [
        { label: 'Modern trade', items: ['Listing governance', 'Promotion governance'] },
        { label: 'E-commerce', items: ['Content', 'Pricing', 'Campaigns', 'Performance management'] },
        { label: 'Specialist supplier', detail: 'Brings sector expertise to either channel' },
        { label: 'Across both', detail: 'Channel-specific economics, not coverage claims' },
      ],
      takeaway: 'Retail and digital channels work together only with route-to-market design, capable partners and channel-specific economics—not coverage claims alone.',
    },
  },
  'logistics-distribution-m1-19': {
    heading: 'Entry is difficult because partner capability, not claimed coverage, drives results',
    intro: 'A principal entering a market scores partners on reach, finance and operating capability. Coverage claims alone do not prove sell-out execution.',
    spec: {
      layout: 'driverTree', title: '19 What Makes Market Entry and Distribution Difficult?', kicker: '',
      root: { label: 'Capable entry partner', detail: 'Scored before appointment' },
      drivers: [
        { label: 'Market reach', detail: 'Geographic reach into outlets', children: [{ label: 'Outlet relationships' }, { label: 'Sell-out evidence' }] },
        { label: 'Financial capacity', children: [{ label: 'Working capital' }, { label: 'Credit control' }] },
        { label: 'Operating capability', children: [{ label: 'Systems' }, { label: 'Compliance' }] },
        { label: 'Sector expertise', detail: 'Including outsourced sales capacity' },
      ],
      note: 'Entry decisions also weigh regulation, pricing and channel execution.',
      takeaway: 'Successful expansion requires a route-to-market design, capable partners and channel-specific economics—not coverage claims alone.',
    },
  },
  'logistics-distribution-m1-20': {
    heading: 'Five demand-side forces raise the need for availability and local demand development',
    intro: 'Consumption, changing shopping behavior, new products, geographic expansion and digital channels all require products to be available and demand to be built locally. Growth brings opportunity and complexity together.',
    spec: {
      layout: 'driverTree', title: '20 How Do Consumer Demand and Competition Drive Distribution?', kicker: '',
      root: { label: 'Need for coordinated distribution', detail: 'Availability plus local demand development' },
      drivers: [
        { label: 'Consumption', detail: 'Overall demand to serve' },
        { label: 'Shopping behavior', detail: 'Changing how and where people buy' },
        { label: 'New products', detail: 'More items competing for launch' },
        { label: 'Geographic expansion', detail: 'New territories to cover' },
        { label: 'Digital channels', detail: 'Additional routes to the customer' },
      ],
      takeaway: 'Market growth creates opportunity while channel complexity increases the value of coordinated distribution and commercial execution.',
    },
  },
  'logistics-distribution-m1-21': {
    heading: 'As routes extend beyond major cities, three disciplines become essential',
    intro: 'Retail modernization and growth beyond major cities change how a route to market must be run. The chapter names territory design, local partner management and cost-to-serve discipline.',
    spec: {
      layout: 'taxonomy', title: '21 How Does Retail Modernization Change Route to Market?', kicker: '',
      root: 'Route to market beyond major cities', rootDetail: 'Required together, not one at a time',
      groups: [
        { label: 'Territory design', detail: 'Which areas and outlets each route serves' },
        { label: 'Local partner management', detail: 'Selecting and steering regional partners' },
        { label: 'Cost-to-serve discipline', detail: 'Keeping each route’s growth worthwhile' },
      ],
      takeaway: 'Retail modernization creates opportunity, but wider routes add complexity that coordinated territory, partner and cost-to-serve management must absorb.',
    },
  },
  'logistics-distribution-m1-22': {
    heading: 'In omnichannel distribution, each added SKU raises complexity in every channel',
    intro: 'E-commerce and omnichannel increase the number of channels a product must be managed in. Launching more SKUs adds assortment, forecast, inventory, merchandising and promotion complexity in each one.',
    spec: {
      layout: 'driverTree', title: '22 How Do E-Commerce and Omnichannel Affect Distribution?', kicker: '',
      root: { label: 'Complexity per channel', detail: 'Rises with each SKU launched' },
      drivers: [
        { label: 'Assortment', detail: 'Which SKUs each channel carries' },
        { label: 'Forecast', detail: 'Demand estimate per SKU and channel' },
        { label: 'Inventory', detail: 'Stock positioned for each channel' },
        { label: 'Merchandising', detail: 'Presentation online and in store' },
        { label: 'Promotion', detail: 'Offers coordinated across channels' },
      ],
      takeaway: 'E-commerce widens opportunity, but omnichannel complexity increases the value of coordinated distribution and commercial execution.',
    },
  },
  'logistics-distribution-m1-23': {
    heading: 'Channel requirements combine product documentation with data ownership and profit measurement',
    intro: 'Commercial rules and channel requirements add work that technology alone cannot settle. Regulated products need documentation and traceability; every channel needs clear data ownership and profitability measurement.',
    spec: {
      layout: 'taxonomy', title: '23 How Do Commercial Rules and Channel Requirements Matter?', kicker: '',
      root: 'Rules and requirements', rootDetail: 'Met through data, local expertise and disciplined execution',
      groups: [
        { label: 'Regulated products', items: ['Documentation', 'Traceability'] },
        { label: 'Every channel', items: ['Clear data ownership', 'Profitability measurement'] },
        { label: 'Operating pressures', items: ['Product requirements', 'Customer data', 'Labor and margin pressure'] },
        { label: 'Supporting systems', detail: 'Improve coordination, not compliance by themselves', items: ['CRM', 'ERP', 'Marketplace integration'] },
      ],
      takeaway: 'Technology improves coordination, but reliable data, local expertise, compliance and disciplined execution determine sustainable performance.',
    },
  },
  'logistics-distribution-m1-24': {
    heading: 'Data foundations must come before distributor systems can improve decisions',
    intro: 'Sales-force automation and distributor systems coordinate outlets, visits, orders, inventory and performance. Their value depends on reliable master data and field adoption.',
    spec: {
      layout: 'flow', title: '24 How Do Technology and Data Transform Distribution?', kicker: '',
      steps: [
        { label: 'Data governance', detail: 'Ownership, consent, access and quality' },
        { label: 'Outlet master', detail: 'One clean outlet universe, no duplicates' },
        { label: 'SFA and DMS', detail: 'Coordinate visits, orders and inventory' },
        { label: 'Retail execution', detail: 'Field routines used consistently' },
        { label: 'Forecast and analytics', detail: 'Demand forecast and commercial analytics', kind: 'outcome' },
      ],
      note: 'A visit-planning model cannot improve coverage if duplicate outlets and stale coordinates distort the outlet universe.',
      takeaway: 'Technology supports execution; it does not replace clear roles, accurate data or commercial discipline.',
    },
  },
};
