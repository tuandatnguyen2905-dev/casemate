import type { VisualSpec } from './fashionVisualKit';

export interface MfgElectronicsChapterVisual { heading: string; intro: string; spec: VisualSpec }

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Consumer Electronics & Appliances Manufacturing Module 03, keyed by visualKind. */
export const MFG_ELECTRONICS_M3_VISUALS: Record<string, MfgElectronicsChapterVisual> = {
  'mfg-cea-m3-1': {
    heading: 'A brand-controlled product reaching customers through direct and partner channels at once',
    intro: 'Brands control specifications, design, software, pricing and service while manufacturing internally or through partners. Direct sales then sit alongside retailers, marketplaces and dealers rather than replacing them.',
    spec: {
      layout: 'pathway', title: 'Branded Product Manufacturing and Direct-to-Consumer Models', kicker: '',
      trunk: [
        { label: 'Product development', detail: 'Specifications, portfolio, design and software', owner: 'Brand' },
        { label: 'Manufacturing', detail: 'In-house factories or manufacturing partners' },
        { label: 'Brand management', detail: 'Pricing, presentation, warranty and service promise', owner: 'Brand' },
      ],
      optionsLabel: 'Hybrid distribution — channels used side by side, not steps',
      options: [
        { label: 'Brand website and app', detail: 'D2C: feedback, data and presentation control' },
        { label: 'Official brand stores', detail: 'D2C: owned experience, added store and stock cost' },
        { label: 'Specialist retailers', detail: 'Large electronics chains with reach and advice' },
        { label: 'Marketplaces', detail: 'Platform reach with platform costs' },
        { label: 'Authorized dealers', detail: 'Local access and coverage' },
        { label: 'Service centers', detail: 'After-sales integration and repair' },
      ],
      note: 'D2C adds acquisition, fulfillment, returns, inventory, platform, service and channel-conflict costs. In Vietnam, official brand stores and websites coexist with chains, dealers, marketplaces, installment finance, installers and repair networks.',
      takeaway: 'Branded manufacturers capture value through differentiated products, trust and customer relationships; direct sales add control but not cost-free growth.',
    },
  },
  'mfg-cea-m3-2': {
    heading: 'What each contract-manufacturing model contributes and what to track',
    intro: 'OEMs produce to customer requirements, ODMs contribute design and engineering, and assemblers integrate components. Their advantage is engineering, quality, scale and reliability rather than consumer awareness.',
    spec: {
      layout: 'table', title: 'OEM, ODM, and Contract Manufacturing Models', kicker: '',
      headers: ['Model', 'What the provider contributes', 'What to track'],
      rows: [
        { label: 'OEM', a: 'Production to the customer’s specification', b: 'Capacity commitments, yield, quality' },
        { label: 'ODM', a: 'Design and engineering of a platform the customer brand markets', b: 'Design ownership and tooling' },
        { label: 'Contract assembly', a: 'Integration of supplied components', b: 'Changeovers and delivery' },
        { label: 'Engineering services', a: 'Prototypes, tests, tooling, sourcing, customization, logistics', b: 'Contract risk and working capital' },
        { label: 'Brand customer', a: 'Focuses on portfolio, software, channels and demand', b: 'Customer concentration for the supplier' },
      ],
      note: 'Example: an ODM develops a standard appliance platform, customizes features and appearance, procures parts, manufactures, tests and supplies a customer brand. Vietnam-based manufacturers can progress from assembly toward tooling, process engineering, testing, sourcing, product adaptation, software and co-development.',
      takeaway: 'Contract manufacturers differentiate through engineering, quality, scale, coordination and reliability — not consumer awareness.',
    },
  },
  'mfg-cea-m3-3': {
    heading: 'Connected devices and lifecycle services arranged around one user account',
    intro: 'Companies link phones, wearables, TVs and home devices through accounts, apps and cloud, then add protection, maintenance, trade-in, repair or selected subscriptions. Each link must give genuine utility.',
    spec: {
      layout: 'ecosystem', title: 'Integrated Ecosystem and Service-Oriented Business Models', kicker: '',
      center: { label: 'User account', detail: 'Phones, wearables, TVs and home devices' },
      actors: [
        { label: 'Apps and controls', relation: 'Manage appliances and devices in one place', flows: ['information'] },
        { label: 'Cloud and updates', relation: 'Diagnostics and software updates', flows: ['information', 'service'] },
        { label: 'Compatible products', relation: 'Cross-selling into the same ecosystem', flows: ['product', 'money'] },
        { label: 'Subscriptions', relation: 'Selected recurring services and fees', flows: ['money', 'service'] },
        { label: 'Protection and maintenance', relation: 'Lifecycle services after purchase', flows: ['service', 'money'] },
        { label: 'Trade-in and repair', relation: 'Repair, refurbishment and replacement', flows: ['product', 'service'] },
      ],
      note: 'Poor compatibility, support, privacy, security or fee value weakens trust. In Vietnam, price sensitivity, device mix, connectivity, language, support coverage and willingness to pay determine adoption.',
      takeaway: 'Ecosystem and service models seek lifetime value beyond hardware, but integration and recurring fees must create genuine utility.',
    },
  },
  'mfg-cea-m3-4': {
    heading: 'Six product categories, each with its own buyer decision criteria',
    intro: 'Products serve communication, productivity, entertainment, food preservation, cleaning, cooking, climate and automation. A laptop, television, refrigerator, robotic vacuum and smart sensor have different buyers, economics and lifecycles.',
    spec: {
      layout: 'taxonomy', title: 'Core Product Categories and Functional Segmentation', kicker: '',
      root: 'Consumer electronics and appliances', rootDetail: 'Categories — each needs its own strategy',
      groups: [
        { label: 'Mobile and personal', detail: 'Performance, camera, battery, software, price', items: ['Smartphones', 'Communication'] },
        { label: 'Computing and office', detail: 'Productivity and information', items: ['Laptops'] },
        { label: 'Home entertainment', detail: 'Entertainment at home', items: ['Televisions'] },
        { label: 'Major appliances', detail: 'Capacity, dimensions, energy, reliability, installation', items: ['Refrigerators', 'Climate'] },
        { label: 'Small appliances', detail: 'Cleaning and cooking tasks', items: ['Robotic vacuums'] },
        { label: 'Smart home', detail: 'Automation', items: ['Smart sensors'] },
      ],
      note: 'Urban households, students, professionals, families, property projects and businesses in Vietnam create different category needs and price thresholds.',
      takeaway: 'Each category requires distinct innovation, pricing, marketing, channel, installation, service and replacement strategies.',
    },
  },
  'mfg-cea-m3-5': {
    heading: 'Service layers added at each stage of product ownership',
    intro: 'Offers combine hardware with delivery, setup, updates, repair, protection, trade-in and recycling. When specifications look similar, these lifecycle outcomes become the visible difference.',
    spec: {
      layout: 'flow', title: 'Service Layers and Product Differentiation', kicker: '',
      steps: [
        { label: 'Purchase', detail: 'Warranty, protection and finance bundled at sale' },
        { label: 'Delivery and setup', detail: 'Dependable delivery and installation' },
        { label: 'Use', detail: 'Diagnostics, updates, remote control, transparent energy cost' },
        { label: 'Maintenance and repair', detail: 'Accessible parts and authorized repair' },
        { label: 'Trade-in and resale', detail: 'Refurbishment or resale of the used product' },
        { label: 'Recycling', detail: 'End-of-life recovery', kind: 'outcome' },
      ],
      note: 'NIQ’s 17-market 2026 research: 86% rate durability, 82% repairability and 81% energy efficiency as important — global Tech & Durables survey importance, not Vietnam-only rates or actual repair behaviour.',
      takeaway: 'Differentiation increasingly includes ownership experience, durability, repairability, efficiency and support.',
    },
  },
  'mfg-cea-m3-6': {
    heading: 'When an advanced feature justifies a higher price position',
    intro: 'Companies segment by budget, performance, connectivity, AI, ecosystem and ownership proposition. Feature cost and complexity can rise faster than purchase conversion, so positioning must match willingness to pay.',
    spec: {
      layout: 'decision', title: 'Market Segmentation by Price, Technology, and Brand Positioning', kicker: '',
      root: { label: 'Advanced feature', detail: 'Finish, efficiency, controls, connectivity, AI or service' },
      question: 'Do target customers understand the benefit and accept the full price and ownership tradeoff?',
      branches: [
        { condition: 'Benefit clear and paid for', outcome: 'Premium or technology tier', detail: 'Back the brand promise with proof and service', tone: 'positive' },
        { condition: 'Benefit unclear', outcome: 'Prove it before pricing up', detail: 'Test proof, channel message and target cost', tone: 'caution' },
        { condition: 'Cost outruns conversion', outcome: 'Keep to entry or mass-market essentials', detail: 'e.g. capacity and reliability in an entry refrigerator', tone: 'negative' },
      ],
      note: 'A brand can occupy different positions by category. In Vietnam, income, housing, climate, household size, digital habits, finance and channel promotions shape segment demand.',
      takeaway: 'Advanced features create value only when customers understand the benefit and accept the full price and ownership tradeoff.',
    },
  },
  'mfg-cea-m3-7': {
    heading: 'Five factors a household weighs before buying',
    intro: 'Household priorities vary with income, housing, lifestyle, installed products and replacement triggers. Each purchase trades upfront affordability against utility, risk, running cost and service.',
    spec: {
      layout: 'driverTree', title: 'Individual Consumers and Households', kicker: '',
      root: { label: 'Household purchase choice', detail: 'Segment by job, context and constraints' },
      drivers: [
        { label: 'Upfront affordability', children: [{ label: 'Promotions' }, { label: 'Installments' }] },
        { label: 'Utility', children: [{ label: 'Capacity' }, { label: 'Portability' }, { label: 'Convenience' }] },
        { label: 'Risk', children: [{ label: 'Brand trust' }, { label: 'Warranty' }] },
        { label: 'Operating cost', children: [{ label: 'Lifecycle electricity' }, { label: 'Efficiency' }] },
        { label: 'Reliability and service', children: [{ label: 'Repair access' }, { label: 'Service coverage' }] },
      ],
      note: 'A family may prioritize refrigerator capacity and reliability, a student laptop mobility and price, and an energy-conscious buyer lifecycle electricity.',
      takeaway: 'Household decisions balance upfront affordability with utility, risk, operating cost, reliability and service.',
    },
  },
  'mfg-cea-m3-8': {
    heading: 'How a project buyer procures equipment from specification to replacement',
    intro: 'Offices, schools, hotels, serviced residences and developers buy through multi-stakeholder decisions. Volume purchasing needs specifications, schedule, installation, documentation, warranty and replacement planning.',
    spec: {
      layout: 'flow', title: 'Businesses, Institutions, and Property Developers', kicker: '',
      steps: [
        { label: 'Specification', detail: 'Standardized models and documentation', owner: 'Buyer' },
        { label: 'Tender and terms', detail: 'Commercial terms, credit and total solution risk', owner: 'Supplier / integrator' },
        { label: 'Delivery sequencing', detail: 'Coordinated appliance packages to schedule' },
        { label: 'Installation and acceptance', detail: 'Installed, checked and accepted on site' },
        { label: 'Warranty and defects', detail: 'Defects management and maintenance' },
        { label: 'Lifecycle management', detail: 'Replacement planning', kind: 'outcome' },
      ],
      note: 'In Vietnam, construction, hospitality, education and enterprise buyers create project and account opportunities for manufacturers, distributors and integrators.',
      takeaway: 'Organizational buyers prioritize standardization, reliable fulfillment, service levels, operating cost and lifecycle management.',
    },
  },
  'mfg-cea-m3-9': {
    heading: 'What a retailer or distributor checks before backing a product',
    intro: 'Retailers and distributors buy inventory, select assortments, finance stock and coordinate service. They judge a product on margin, velocity, stock risk and support — not consumer demand alone.',
    spec: {
      layout: 'table', title: 'Retailers, Distributors, and Business Partners as Organizational Customers', kicker: '',
      headers: ['Channel criterion', 'What the partner asks', 'What the manufacturer must align'],
      rows: [
        { label: 'Margin', a: 'Net margin and promotional funding', b: 'Pricing discipline' },
        { label: 'Velocity', a: 'Sales velocity and stock turns', b: 'Sell-in matched to sell-through' },
        { label: 'Stock risk', a: 'Stock age, returns and credit', b: 'Forecast reliability and stock health' },
        { label: 'Launch support', a: 'Training and documentation', b: 'Trade marketing and partner support' },
        { label: 'Service burden', a: 'Warranty processes', b: 'Service readiness and data sharing' },
      ],
      note: 'National chains, regional dealers, marketplaces, distributors and installers in Vietnam have distinct economics and bargaining power.',
      takeaway: 'A product can appeal to consumers and still fail if channel margin, availability, training, support or inventory risk is unattractive.',
    },
  },
  'mfg-cea-m3-10': {
    heading: 'Where revenue comes from for each type of participant',
    intro: 'Brands earn from products and complements, OEMs and ODMs from production and engineering, and retailers from resale and services. Lifecycle revenue adds repair, warranty, trade-in and refurbished products.',
    spec: {
      layout: 'taxonomy', title: 'Revenue Streams and Monetization Mix', kicker: '',
      root: 'Monetization mix', rootDetail: 'Streams by participant — the mix differs by category',
      groups: [
        { label: 'Brands', detail: 'Products and complements', items: ['Hardware sales', 'Accessories', 'Connected services'] },
        { label: 'OEMs and ODMs', detail: 'Production and engineering', items: ['Manufacturing contracts'] },
        { label: 'Retailers', detail: 'Resale and services', items: ['Product resale', 'Installation and maintenance', 'Protection plans'] },
        { label: 'Lifecycle revenue', detail: 'After the first sale', items: ['Repair and parts', 'Trade-in', 'Refurbished products', 'Selected subscriptions'] },
      ],
      note: 'Recurring models fit some categories better than others and add billing, support, retention, fraud and partner requirements. In Vietnam, category, price, trust, payment, authorized service, parts and willingness to pay determine the mix.',
      takeaway: 'Hardware remains the foundation; service and ecosystem revenue diversify value only when benefits and delivery economics are credible.',
    },
  },
  'mfg-cea-m3-11': {
    heading: 'The full cost system from components to after-sales support',
    intro: 'Costs run from components, labor and tooling through freight, stock finance and markdown to delivery, returns and warranty. A factory-cost advantage can be lost further down this chain.',
    spec: {
      layout: 'driverTree', title: 'Cost Structure and Major Operating Expenses', kicker: '',
      root: { label: 'Total cost to serve', detail: 'By product, channel and customer' },
      drivers: [
        { label: 'Materials and manufacturing', op: '+', children: [{ label: 'Components' }, { label: 'Labor and energy' }, { label: 'Depreciation and tooling' }] },
        { label: 'R&D and software', op: '+', children: [{ label: 'Engineering' }, { label: 'Tests' }, { label: 'IP' }] },
        { label: 'Logistics and inventory', op: '+', children: [{ label: 'Freight and warehouses' }, { label: 'Stock finance' }, { label: 'Markdown' }] },
        { label: 'Marketing and retail', op: '+', children: [{ label: 'Acquisition' }, { label: 'Stores' }, { label: 'Payment' }] },
        { label: 'After-sales', op: '+', children: [{ label: 'Delivery and returns' }, { label: 'Warranty and parts' }, { label: 'Support' }] },
      ],
      note: 'A low-cost television can lose margin through discounts, bulky logistics, damage, returns and warranty even if factory cost is competitive. Currency, components, shipping and rapid model cycles can move cost before pricing adjusts.',
      takeaway: 'Profitability depends on the full cost system — not production cost alone.',
    },
  },
  'mfg-cea-m3-12': {
    heading: 'Try it: a promotion can lift units yet lower contribution',
    intro: 'Discounts may shift timing rather than create incremental demand. Move the sliders to see when extra promotional units fail to offset the lower price.',
    spec: {
      layout: 'scenario', title: 'Unit Economics, Pricing, and Financial Sustainability', kicker: H,
      inputs: [
        { key: 'price', label: 'Full net price per unit', min: 100, max: 1000, step: 50, value: 500, unit: 'currency units' },
        { key: 'cost', label: 'Variable cost (share of full price)', min: 40, max: 90, step: 5, value: 70, unit: '%' },
        { key: 'units', label: 'Units sold without promotion', min: 100, max: 1000, step: 50, value: 400, unit: 'units' },
        { key: 'discount', label: 'Promotional discount', min: 0, max: 40, step: 5, value: 15, unit: '%' },
        { key: 'uplift', label: 'Unit uplift from promotion', min: 0, max: 100, step: 5, value: 30, unit: '%' },
      ],
      outputs: [
        { label: 'Contribution without promotion', unit: 'currency units', digits: 0, compute: (v) => v.units * v.price * (1 - v.cost / 100) },
        { label: 'Contribution with promotion', unit: 'currency units', digits: 0, compute: (v) => v.units * (1 + v.uplift / 100) * v.price * (1 - v.discount / 100 - v.cost / 100) },
        { label: 'Change from promotion', unit: 'currency units', digits: 0, compute: (v) => v.units * (1 + v.uplift / 100) * v.price * (1 - v.discount / 100 - v.cost / 100) - v.units * v.price * (1 - v.cost / 100) },
      ],
      assumption: `${H}. Illustrative inputs, not market data. Variable cost (components, conversion, channel margin) stays fixed per unit; returns, warranty, working capital and units pulled forward from later full-price sales are excluded.`,
      note: 'Define every margin denominator: gross margin is revenue less cost of goods sold; contribution margin is revenue after specified variable costs.',
      takeaway: 'Revenue growth is sustainable only when product, customer, channel and lifecycle economics remain attractive.',
    },
  },
  'mfg-cea-m3-13': {
    heading: 'How a store visit reduces the risk of a high-value purchase',
    intro: 'Stores let customers test displays and sound, compare sizes and finishes, get installation advice and finance the purchase. Demonstration, staff, official stock and warranty lower the perceived risk of complex products.',
    spec: {
      layout: 'flow', title: 'Physical Retail and Specialist Distribution', kicker: '',
      steps: [
        { label: 'Compare in person', detail: 'Picture, sound, size and finish side by side' },
        { label: 'Consultation', detail: 'Compatibility and installation advice from staff' },
        { label: 'Confirm assurances', detail: 'Official stock, delivery and warranty' },
        { label: 'Installment payment', detail: 'Chooses a financed offer', kind: 'decision' },
        { label: 'Service coordination', detail: 'Delivery, installation and later service', kind: 'outcome' },
      ],
      note: 'The Gioi Di Dong, FPT and other specialists remain important in Vietnam electronics; appliance showrooms add installation and delivery coordination. Measure traffic, conversion, ticket, margin, inventory, finance and return outcomes.',
      takeaway: 'Physical retail competes through product experience, advice, availability, finance and service — not location alone.',
    },
  },
  'mfg-cea-m3-14': {
    heading: 'What an online air-conditioner order must get right after checkout',
    intro: 'Customers compare price, specification, reviews and delivery online. Large appliances then add damage, scheduling, installation and returns complexity that accessories do not.',
    spec: {
      layout: 'flow', title: 'E-Commerce, Marketplaces, and Direct-to-Consumer Channels', kicker: '',
      steps: [
        { label: 'Official seller identity', detail: 'Authentic product from an authorized seller' },
        { label: 'Model accuracy', detail: 'Listing matches the delivered specification' },
        { label: 'Delivery', detail: 'Scheduling without damage' },
        { label: 'Installation', detail: 'Correct setup at the customer’s home' },
        { label: 'Warranty activation', detail: 'Valid warranty registered' },
        { label: 'Escalation and returns', detail: 'Support when something goes wrong', kind: 'outcome' },
      ],
      note: 'MOIT reported broad Vietnam e-commerce of about US$31B in 2025, up 25.5%, and about 10% of retail goods and consumer services — broad-market figures, not electronics or appliance sales or channel penetration.',
      takeaway: 'Online reach and transparency create value only with authentic products, reliable fulfillment, valid warranty, returns and support.',
    },
  },
  'mfg-cea-m3-15': {
    heading: 'Disconnected channels versus integrated omnichannel operations',
    intro: 'Stores, sites, marketplaces, apps, service systems and warehouses need to share product, price, stock, order and customer data. Without that, more channels mean more broken journeys.',
    spec: {
      layout: 'compare', title: 'Omnichannel Integration and Customer Relationship Management', kicker: '',
      leftTitle: 'Channels without integration', rightTitle: 'Integrated omnichannel',
      rows: [
        { label: 'Product information', a: 'Inconsistent across channels', b: 'Unified product information' },
        { label: 'Stock', a: 'Unavailable listings', b: 'Inventory visibility for every channel' },
        { label: 'Customer records', a: 'Duplicate customers', b: 'One record with permissions and registrations' },
        { label: 'Fulfillment', a: 'Channel conflict', b: 'Click-and-collect, delivery, installation coordinated' },
        { label: 'Support', a: 'Broken support journeys', b: 'Service history visible after purchase' },
      ],
      note: 'Example journey: research online, check stock, test in store, buy in app, receive delivery, register warranty, later see service history. Measure end-to-end conversion, inventory accuracy, fulfillment cost, consent and channel incrementality.',
      takeaway: 'Omnichannel value comes from integrated operations, not the number of channels.',
    },
  },
  'mfg-cea-m3-16': {
    heading: 'Seven participants behind one customer’s product journey',
    intro: 'Suppliers provide inputs, manufacturers integrate, brands create demand, channels and logistics provide access, finance enables purchase and service supports the lifecycle. The customer experiences it all as one journey.',
    spec: {
      layout: 'ecosystem', title: 'Core Ecosystem Participants and Their Roles', kicker: '',
      center: { label: 'Customer product journey', detail: 'One experience across many handoffs' },
      actors: [
        { label: 'Material/component suppliers', relation: 'Technology and inputs to specification', flows: ['product'] },
        { label: 'OEM/ODM', relation: 'Integrate and manufacture products', flows: ['product'] },
        { label: 'Brands', relation: 'Create demand and own the promise', flows: ['information', 'oversight'] },
        { label: 'Logistics', relation: 'Move products and parts', flows: ['product'] },
        { label: 'Distributors/retailers', relation: 'Provide access and collect payment', flows: ['product', 'money'] },
        { label: 'Finance', relation: 'Enables purchases', flows: ['money', 'risk'] },
        { label: 'Service/recycling', relation: 'Install, repair and recover', flows: ['service'] },
      ],
      note: 'A refrigerator failure may involve the component supplier, manufacturer, retailer, installer, authorized service, parts logistics, finance and customer support. Map responsibility, handoffs, liability and escalation.',
      takeaway: 'Weakness at one participant can reduce value across the entire customer experience.',
    },
  },
  'mfg-cea-m3-17': {
    heading: 'Six kinds of partner a manufacturer relies on',
    intro: 'Manufacturers work with chip, software, cloud, retail, finance, repair and recycling partners. Each adds capability one company may not efficiently own — and a dependency if the partner fails.',
    spec: {
      layout: 'taxonomy', title: 'Partnerships, Complementors, and Ecosystem Development', kicker: '',
      root: 'Partnership types', rootDetail: 'Categories of partner — each adds capability and a dependency',
      groups: [
        { label: 'Technology partnerships', items: ['Chip', 'Software and OS', 'Cloud', 'Telecom', 'AI'] },
        { label: 'Smart-home integration', items: ['App and cloud services', 'Platform compatibility'] },
        { label: 'Retail partnerships', items: ['Market access', 'Retailer setup'] },
        { label: 'Financial partnerships', items: ['Purchase finance'] },
        { label: 'Service partnerships', items: ['Installation', 'Repair coverage'] },
        { label: 'Circular partnerships', items: ['Trade-in', 'Refurbishment', 'Recycling'] },
      ],
      note: 'Agree standards, APIs, security, service levels, economics, certification, data rights, change notice, continuity and exit plans with each partner.',
      takeaway: 'Partnerships extend capability and reach but create dependencies in compatibility, economics, quality and customer control.',
    },
  },
  'mfg-cea-m3-18': {
    heading: 'Who holds bargaining power in the ecosystem and the risk it creates',
    intro: 'Critical suppliers influence capacity, brands control specifications, and retailers and platforms shape visibility and traffic. Each source of control creates a dependency for someone else.',
    spec: {
      layout: 'table', title: 'Governance, Power Relationships, and Stakeholder Risks', kicker: '',
      headers: ['Source of power', 'Who holds it', 'Risk it creates'],
      rows: [
        { label: 'Scarce technology', a: 'Critical suppliers', b: 'A sole-source chip can constrain launch capacity' },
        { label: 'Specifications and IP', a: 'Brands', b: 'IP leakage, defects and recalls' },
        { label: 'Visibility and traffic', a: 'Retailers and platforms', b: 'Fees, ranking rules, customer-data limits' },
        { label: 'Authenticity', a: 'Authorized distribution', b: 'Counterfeit goods and product safety' },
        { label: 'Customer trust', a: 'Service providers', b: 'Privacy and connected-device security' },
        { label: 'Lifecycle responsibility', a: 'Suppliers and producers', b: 'Labor, resource use and e-waste' },
      ],
      note: 'Diversify viable dependencies, protect IP and users, document governance, monitor concentration and test contingencies.',
      takeaway: 'Control of scarce technology and customer access shapes bargaining power and dependency risk.',
    },
  },
};
