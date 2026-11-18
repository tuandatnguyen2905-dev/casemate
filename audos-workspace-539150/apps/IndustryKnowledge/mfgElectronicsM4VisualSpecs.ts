import type { VisualSpec } from './fashionVisualKit';

export interface MfgElectronicsChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Consumer Electronics & Appliances Manufacturing Module 04, keyed by visualKind. */
export const MFG_ELECTRONICS_M4_VISUALS: Record<string, MfgElectronicsChapterVisual> = {
  'mfg-cea-m4-1': {
    heading: 'Why some categories have few prominent brands and others many sellers',
    intro: 'R&D, IP, brand, scale, certification, distribution and service protect established firms in some categories, while lower barriers widen entry in others. Concentration must be read per product and channel.',
    spec: {
      layout: 'compare', title: 'Market Concentration and Competitive Intensity', kicker: '',
      leftTitle: 'Can be more concentrated', rightTitle: 'Can be more fragmented',
      rows: [
        { label: 'Typical categories', a: 'Premium smartphones, advanced displays, major appliances', b: 'Accessories, small appliances, entry products, smart-home niches' },
        { label: 'Entry barriers', a: 'R&D, IP, brand, scale, certification, distribution, service', b: 'Lower technical or branding barriers' },
        { label: 'Example', a: 'Refrigerators: established brands and service barriers', b: 'Basic accessories: many interchangeable sellers' },
        { label: 'Define first', a: 'Product, price tier, channel, geography, period', b: 'Product, price tier, channel, geography, period' },
      ],
      note: 'Euromonitor: Mobile World JSC had 44% of appliances-and-electronics specialist-retail value in 2025, up from 29% in 2020 — a retail-channel share, not manufacturer or total-market share.',
      takeaway: 'Concentration varies by product and channel; manufacturer share and retailer share answer different questions.',
    },
  },
  'mfg-cea-m4-2': {
    heading: 'Discount-led competition versus benefit-led differentiation',
    intro: 'Firms use launches, discounts, trade-ins, bundles, finance and livestreams while also differentiating on performance, efficiency, durability, design and service. In mature markets the two pull margins in opposite directions.',
    spec: {
      layout: 'compare', title: 'Price Competition, Differentiation, and Market Maturity', kicker: '',
      leftTitle: 'Discount-led promotion', rightTitle: 'Benefit-led differentiation',
      rows: [
        { label: 'Tools', a: 'Discounts, bundles, trade-ins, finance, livestreams', b: 'Performance, efficiency, durability, design, service, ecosystem' },
        { label: 'Demand effect', a: 'Short-term stimulus', b: 'Durable position if benefits are recognized' },
        { label: 'Reference price', a: 'Repeated discounting anchors it lower', b: 'Supports a premium customers will pay' },
        { label: 'Margin', a: 'Compressed', b: 'Defensible when benefits are clear and sustained' },
        { label: 'Measure', a: 'Promotion incrementality and stock age', b: 'Contribution, customer value and brand effects' },
      ],
      note: 'Mature installed bases shift growth toward replacement, upgrade and premiumization. Euromonitor reported a modest 2025 consumer-electronics retail-volume decline in Vietnam as uncertainty delayed big purchases.',
      takeaway: 'Discounting can stimulate short-term demand, but durable position requires benefits customers recognize and will pay for.',
    },
  },
  'mfg-cea-m4-3': {
    heading: 'The new rivals and partners surrounding a hardware product',
    intro: 'Hardware brands now compete with platforms, software providers, smart-home systems, marketplaces and component ecosystems that shape discovery, functionality, control and data. A television competes on its panel and on everything connected to it.',
    spec: {
      layout: 'ecosystem', title: 'Competitive Boundaries and Emerging Sources of Rivalry', kicker: '',
      center: { label: 'Hardware brand’s device', detail: 'e.g. a television: panel and image quality' },
      actors: [
        { label: 'Platforms and OS', relation: 'Control interface, updates and data', flows: ['information', 'oversight'] },
        { label: 'Software and streaming', relation: 'Add apps and content functionality', flows: ['service'] },
        { label: 'Smart-home systems', relation: 'Decide compatibility and control', flows: ['information'] },
        { label: 'Marketplaces', relation: 'Influence discovery and price comparison', flows: ['money', 'information'] },
        { label: 'Component ecosystems', relation: 'Supply the core technology', flows: ['product'] },
      ],
      note: 'Expensive AI features create no advantage if utility, reliability, privacy or affordability is weak. Mixed-brand households in Vietnam make interoperability, local apps, language and retailer guidance relevant alongside ecosystem lock-in.',
      takeaway: 'Competition is shifting from standalone hardware toward connected experiences, software, compatibility, service and customer relationships.',
    },
  },
  'mfg-cea-m4-4': {
    heading: 'Global brands grouped by strategic position, not by size or rank',
    intro: 'Global scale funds R&D, IP, supply chains, ecosystems and distribution, but each company is exposed to different categories. Compare the relevant product and customer proposition, not total company size.',
    spec: {
      layout: 'taxonomy', title: 'Global Consumer Electronics and Technology Brands', kicker: '',
      root: 'Global brands', rootDetail: 'Strategic positions — not a ranking; leadership is category-specific',
      groups: [
        { label: 'Broad cross-category portfolio', detail: 'Phones, TVs, displays and appliances', items: ['Samsung'] },
        { label: 'Premium personal-device integration', detail: 'Integrated personal-device experience', items: ['Apple'] },
        { label: 'Value plus connected products', detail: 'Value pricing with connected products', items: ['Xiaomi'] },
        { label: 'Appliances and displays', detail: 'Depth in selected hardware categories', items: ['LG'] },
        { label: 'Selected entertainment categories', detail: 'Entertainment, imaging and gaming-related', items: ['Sony'] },
      ],
      note: 'Analyse each category separately: a leader in one product, channel or period is not a universal leader across electronics and appliances.',
      takeaway: 'Global scale supports technology and brand investment, but leadership remains category-specific.',
    },
  },
  'mfg-cea-m4-5': {
    heading: 'Global appliance groups and local value brands compete on different terms',
    intro: 'Global groups compete across selected appliances while local and regional brands target accessible segments and local categories. Each appliance category differs in capacity, energy, installation, climate fit and repair needs.',
    spec: {
      layout: 'compare', title: 'Appliance Manufacturers and Value-Oriented Brands', kicker: '',
      leftTitle: 'Global appliance groups', rightTitle: 'Local or regional brands',
      rows: [
        { label: 'Named in chapter', a: 'Samsung, LG, Panasonic, Toshiba, Electrolux, Sharp, Hisense', b: 'Sunhouse, Kangaroo and others' },
        { label: 'Where they compete', a: 'Across selected appliance categories', b: 'Accessible segments and local categories' },
        { label: 'Possible edge', a: 'Broader global ecosystems', b: 'Efficiency, price and local service' },
        { label: 'Benchmark on', a: 'Performance, efficiency, ownership cost, service', b: 'Performance, efficiency, ownership cost, service' },
      ],
      note: 'A value air conditioner can win through efficiency, price and local service without the broadest global ecosystem. Euromonitor describes robust 2025 appliance-volume growth and a moderately concentrated landscape with smaller brands expanding.',
      takeaway: 'Appliance success balances function, affordability, operating cost, local fit, installation and dependable after-sales support.',
    },
  },
  'mfg-cea-m4-6': {
    heading: 'Vietnam’s electronics and appliance channels grouped by type',
    intro: 'Specialist chains, dealers, marketplaces and brand stores differ in product focus, reach, price, digital capability and support. Channels control visibility, traffic, stock, finance and delivery, which shapes brand performance.',
    spec: {
      layout: 'taxonomy', title: 'Vietnamese Retailers, Distributors, and E-Commerce Platforms', kicker: '',
      root: 'Vietnam retail and distribution channels', rootDetail: 'Channel types — named retailers are not ranked',
      groups: [
        { label: 'Specialist retail chains', detail: 'Differ in product focus, reach and digital capability', items: ['The Gioi Di Dong', 'Dien May Xanh', 'FPT Shop', 'CellphoneS', 'Viettel Store', 'Nguyen Kim', 'Cho Lon', 'MediaMart'] },
        { label: 'Dealers', detail: 'Local reach and relationships' },
        { label: 'Marketplaces', detail: 'Discovery, price comparison and traffic' },
        { label: 'Brand stores', detail: 'Manufacturer-controlled presentation' },
        { label: 'Authorized distribution', detail: 'Authenticity and supply to channels' },
      ],
      note: 'Euromonitor’s 44% Mobile World JSC measure signals concentration within specialist retail; competitors use specialization, digital tools, pricing, local reach and service.',
      takeaway: 'Retailers compete by reducing friction across discovery, finance, transaction, fulfillment, installation and service.',
    },
  },
  'mfg-cea-m4-7': {
    heading: 'A qualitative benchmarking method that avoids a universal ranking',
    intro: 'Benchmarking compares Apple, Samsung, Xiaomi, LG, Sony, Panasonic and peers on dimensions relevant to a defined category. Premium integration, broad portfolios, value pricing and specialist expertise bring different tradeoffs.',
    spec: {
      layout: 'flow', title: 'Benchmarking Global Brands by Strategic Positioning', kicker: '',
      steps: [
        { label: 'Define the arena', detail: 'Category and customer segment first' },
        { label: 'Choose dimensions', detail: 'Innovation, price, brand, ecosystem, reliability, service' },
        { label: 'Set local weights', detail: 'Purchasing power, channels, climate, housing, language' },
        { label: 'Assess with evidence', detail: 'State evidence and scope for each brand' },
        { label: 'Report uncertainty', detail: 'Positions, not market-share claims', kind: 'outcome' },
      ],
      note: 'Positions described in the chapter: Samsung breadth, Apple tight personal-device integration, Xiaomi price-performance, LG appliance/display depth, Sony selected entertainment expertise.',
      takeaway: 'The strongest competitor is the one whose capabilities fit the defined category and customer segment.',
    },
  },
  'mfg-cea-m4-8': {
    heading: 'Large chains and platforms win on different strengths and carry different burdens',
    intro: 'Chains offer geographic reach, standardized operations and finance; platforms offer discovery and convenience. Store count alone ignores productivity, margin, inventory, conversion and online contribution.',
    spec: {
      layout: 'compare', title: 'Benchmarking Vietnam\'s Retail Competition', kicker: '',
      leftTitle: 'Large retail chain', rightTitle: 'Online platform',
      rows: [
        { label: 'Customer reach', a: 'Geographic reach through stores', b: 'Discovery and convenience' },
        { label: 'Operating model', a: 'Standardized operations and finance', b: 'Third-party sellers and fulfillment' },
        { label: 'Main challenge', a: 'High rent and stock', b: 'Seller quality, acquisition and fulfillment' },
        { label: 'Compare on', a: 'Same-store productivity, margin, inventory', b: 'Conversion, retention, online contribution' },
      ],
      note: 'Independents can offer niche expertise and local relationships. Use compatible KPIs within each business model, then compare customer outcomes and economic tradeoffs explicitly.',
      takeaway: 'Retail leadership combines physical reach, digital efficiency, stock productivity, service quality and customer lifetime value.',
    },
  },
  'mfg-cea-m4-9': {
    heading: 'What to measure for each technology and ownership dimension',
    intro: 'Feature counts can hide usability, operating cost, support burden and trust. A smart washer should be compared on cleaning, reliability, energy, controls, installation and repair — not its AI label.',
    spec: {
      layout: 'table', title: 'Benchmarking Technology, Sustainability, and Customer Experience', kicker: '',
      headers: ['Dimension', 'Benchmark on', 'Evidence to combine'],
      rows: [
        { label: 'Useful AI', a: 'Recommendation or automation utility', b: 'Product tests and customer evidence' },
        { label: 'Energy efficiency', a: 'Energy use and operating cost', b: 'Verified environmental metrics' },
        { label: 'Reliability', a: 'Failures and warranty claims', b: 'Service data' },
        { label: 'Installation and support', a: 'Delivery, installation and returns', b: 'Service data and customer evidence' },
        { label: 'Durability and repairability', a: 'Repair access, parts, updates, lifespan', b: 'Lifecycle cost' },
        { label: 'Local fit', a: 'Climate, household size, electricity cost', b: 'Customer evidence' },
      ],
      note: 'Importance differs by product and price tier; packaging and end-of-life are also benchmarked.',
      takeaway: 'Technology is durable advantage only when it solves meaningful problems and is supported by reliable ownership experiences.',
    },
  },
  'mfg-cea-m4-10': {
    heading: 'The loop in which reliable innovation builds brand trust',
    intro: 'Customers cannot observe durability before purchase, so they rely on reputation, reviews, warranty and prior ownership. Field data from each product feeds the next improvement.',
    spec: {
      layout: 'flow', title: 'Product Innovation, Quality, and Brand Trust', kicker: '',
      steps: [
        { label: 'Consumer-led R&D', detail: 'Useful functionality for a real problem' },
        { label: 'Quality assurance', detail: 'Reliability, safety and evidence before launch' },
        { label: 'Brand positioning', detail: 'Clear claims at a justified price' },
        { label: 'Ownership experience', detail: 'Reviews, warranty and reputation form', kind: 'outcome' },
        { label: 'Continuous improvement', detail: 'Warranty and field data guide fixes' },
      ],
      loop: 'Field data drives supplier correction, design improvement and product-tier decisions; defects spill across the brand.',
      note: 'Gate innovation on customer outcome, reliability, manufacturability, support cost, willingness to pay and brand fit. Vietnam needs locally relevant benefits and accessible tiers, not imported feature narratives alone.',
      takeaway: 'Innovation and trust reinforce each other when products solve real problems reliably at a justified price.',
    },
  },
  'mfg-cea-m4-11': {
    heading: 'Why the cheapest component may not be the lowest total cost',
    intro: 'Products depend on chips, displays, batteries, motors and compressors from concentrated supply networks. A lower purchase price can be outweighed by rework, warranty and lost sales.',
    spec: {
      layout: 'driverTree', title: 'Cost Efficiency, Supply Chain Resilience, and Scale', kicker: '',
      root: { label: 'Total cost of a component choice', detail: 'Not purchase price alone' },
      drivers: [
        { label: 'Purchase price', op: '+', children: [{ label: 'Scale and supplier terms' }, { label: 'Currency and freight' }] },
        { label: 'Quality cost', op: '+', children: [{ label: 'Rework' }, { label: 'Warranty' }] },
        { label: 'Disruption cost', op: '+', children: [{ label: 'Shortages' }, { label: 'Lost sales' }, { label: 'Policy changes' }] },
        { label: 'Inventory cost', op: '+', children: [{ label: 'Buffer stock' }, { label: 'Obsolescence' }] },
      ],
      note: 'Regional sourcing and local supplier development in Vietnam can improve resilience, but alternatives require qualification, capability and volume economics. Test critical-component scenarios.',
      takeaway: 'Operational excellence protects availability and margins; cheapest input is not lowest total cost if it increases defects or disruption.',
    },
  },
  'mfg-cea-m4-12': {
    heading: 'Shared stock and ordering, then the after-sales services that complete the offer',
    intro: 'Companies coordinate stock, information, ordering and stores, then delivery, installation, returns, warranty, repair and trade-in. When products are similar, ease and trust in these services differentiate.',
    spec: {
      layout: 'pathway', title: 'Distribution, Omnichannel Capability, and After-Sales Service', kicker: '',
      trunk: [
        { label: 'Omnichannel integration', detail: 'Shared stock and product information' },
        { label: 'Ordering', detail: 'Online, in store or through retail partners' },
      ],
      optionsLabel: 'After-sales services — chosen by product and customer, not steps',
      options: [
        { label: 'Financing', detail: 'Purchase finance at checkout' },
        { label: 'Delivery and installation', detail: 'Complex for large appliances' },
        { label: 'Repair and warranty', detail: 'Parts, first-time fix, claims' },
        { label: 'Trade-in and protection', detail: 'Upgrade paths for personal devices' },
        { label: 'CRM', detail: 'Consent-based relationship and service history' },
      ],
      note: 'Euromonitor highlights digitalization, omnichannel, AI-supported retail and financial solutions among Vietnam’s specialist retailers. Measure availability, conversion, install quality, first-time fix and retention.',
      takeaway: 'Channels and after-sales turn product availability into a complete customer proposition.',
    },
  },
  'mfg-cea-m4-13': {
    heading: 'The industry’s strengths, weaknesses, opportunities and threats in one view',
    intro: 'The same scale that funds innovation creates fixed cost and complexity. A SWOT only becomes useful when defined by company, product, geography and horizon and tied to choices.',
    spec: {
      layout: 'taxonomy', title: 'SWOT Analysis of the Consumer Electronics & Appliances Industry', kicker: '',
      root: 'Industry SWOT', rootDetail: 'Four quadrants considered together — define scope first',
      groups: [
        { label: 'Strengths', items: ['Brands', 'Manufacturing', 'Portfolios', 'Networks'] },
        { label: 'Weaknesses', items: ['R&D cost', 'Component dependency', 'Commoditization', 'Stock and service'] },
        { label: 'Opportunities', items: ['Smart home', 'Efficiency', 'Practical AI', 'Lifecycle services'] },
        { label: 'Threats', items: ['Price pressure', 'Disruption', 'Regulation', 'Weak purchasing power'] },
      ],
      note: 'A broad appliance portfolio supports cross-sell but multiplies models, parts, inventory, certifications and support. In Vietnam, growth, manufacturing and digital channels sit alongside price sensitivity, imported inputs and service variation.',
      takeaway: 'Technology and distribution provide a strong base, but profitability depends on converting them into differentiated customer value.',
    },
  },
  'mfg-cea-m4-14': {
    heading: 'Five structural forces squeezing industry profitability',
    intro: 'Installed bases shift demand to replacement while price transparency limits pass-through. Component, logistics and promotion costs rise as concentrated supply and short cycles add disruption and stock risk.',
    spec: {
      layout: 'driverTree', title: 'Structural Challenges: Saturation, Margin Pressure, and Supply Chain Risk', kicker: '',
      root: { label: 'Profitability pressure', detail: 'A margin challenge, not only a growth one' },
      drivers: [
        { label: 'Market saturation', children: [{ label: 'Replacement-led demand' }] },
        { label: 'Margin compression', children: [{ label: 'Price transparency' }, { label: 'Logistics and promotion cost' }] },
        { label: 'Memory and component pressure', children: [{ label: 'AI infrastructure demand' }, { label: 'Higher device costs' }] },
        { label: 'Supply concentration', children: [{ label: 'Concentrated Asian supply' }, { label: 'Tariffs and export controls' }] },
        { label: 'Inventory risk', children: [{ label: 'Short product cycles' }, { label: 'Demand uncertainty' }] },
      ],
      note: 'Allianz’s 2026 sector assessment highlights these pressures — treat its figures as forecasts. Diversification toward Vietnam creates opportunity but still depends on imported upstream components and global demand.',
      takeaway: 'The industry faces a profitability challenge as much as a growth challenge.',
    },
  },
  'mfg-cea-m4-15': {
    heading: 'A stop-or-scale test for each strategic investment',
    intro: 'Priorities include practical AI, affordable innovation, supply diversification, sustainable design, service revenue, digital retail and trust. Each should be staged with evidence rather than committed in full.',
    spec: {
      layout: 'decision', title: 'Strategic Challenges and Future Competitive Priorities', kicker: '',
      root: { label: 'Strategic investment', detail: 'e.g. AI commercialization or service revenue' },
      question: 'Do customer evidence, unit economics, reliability gates, resilience metrics and trust controls hold?',
      branches: [
        { condition: 'Evidence holds', outcome: 'Scale', detail: 'Expand with continued metrics', tone: 'positive' },
        { condition: 'Promising but unproven', outcome: 'Stage the next step', detail: 'Gather customer and reliability evidence', tone: 'caution' },
        { condition: 'No job or margin', outcome: 'Stop', detail: 'Technology without a job fails to justify price', tone: 'negative' },
      ],
      note: 'Global brands can use breadth and technology; local and value brands can use fit and price; retailers must improve productivity, digital engagement and service. Cost-only rivalry traps margins.',
      takeaway: 'Future competitiveness requires useful innovation, affordability, resilient operations and trusted ownership experiences.',
    },
  },
};
