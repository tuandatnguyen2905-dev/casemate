import type { VisualSpec } from './fashionVisualKit';

export interface MfgElectronicsChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Consumer Electronics & Appliances Manufacturing Module 05, keyed by visualKind. */
export const MFG_ELECTRONICS_M5_VISUALS: Record<string, MfgElectronicsChapterVisual> = {
  'mfg-cea-m5-1': {
    heading: 'How a value-conscious buyer decides whether to replace a working product',
    intro: 'Buyers compare performance, durability, energy, warranty, service, financing and trade-in, and may delay expensive replacements while existing products still work. Premium products can still grow when benefits are clear.',
    spec: {
      layout: 'decision', title: 'Value-Conscious Consumption and More Deliberate Purchasing', kicker: '',
      root: { label: 'Existing product still works', detail: 'Is it time to end the replacement cycle?' },
      question: 'Does the new product offer a meaningful upgrade over its total cost of ownership?',
      branches: [
        { condition: 'Clear benefit', outcome: 'Replace, possibly with a premium model', detail: 'Efficiency or performance gains are visible', tone: 'positive' },
        { condition: 'Benefit vs cost unclear', outcome: 'Compare more or use flexible purchasing', detail: 'Installments, promotions or trade-in shift timing', tone: 'caution' },
        { condition: 'No meaningful upgrade', outcome: 'Delay the replacement', detail: 'Keep using the working product', tone: 'negative' },
      ],
      note: 'Total cost of ownership covers purchase, energy, maintenance, repair, downtime and disposal across useful life — e.g. two air conditioners compared on price, efficiency, installation, warranty, maintenance, noise and expected use.',
      takeaway: 'Consumers increasingly ask whether a product will remain worthwhile — not only whether its purchase price is low.',
    },
  },
  'mfg-cea-m5-2': {
    heading: 'What connected features promise and what blocks their adoption',
    intro: 'Consumers may expect intuitive controls, automation, remote monitoring, alerts and compatible devices. Software expands capability after purchase, but setup, interoperability, connectivity and privacy can stop it being used.',
    spec: {
      layout: 'compare', title: 'Demand for Convenience, Personalization, and Connected Experiences', kicker: '',
      leftTitle: 'What connected features can add', rightTitle: 'What can block adoption',
      rows: [
        { label: 'Onboarding', a: 'Simplified setup and intuitive controls', b: 'Setup friction and installation gaps' },
        { label: 'Personalization', a: 'Profiles and automation', b: 'Unclear utility' },
        { label: 'Remote management', a: 'Scheduling, energy reports, alerts', b: 'Connectivity and Wi-Fi quality' },
        { label: 'Integration', a: 'Works with compatible devices', b: 'Interoperability in mixed-brand homes' },
        { label: 'Trust', a: 'Accessible support, usable local controls', b: 'Privacy and cybersecurity concerns' },
      ],
      note: 'Example: a connected air conditioner schedules operation, reports energy and flags maintenance while keeping usable local controls. In Vietnam, apartments, mobile-first use and local language also shape the experience.',
      takeaway: 'Connected convenience is advantage only when it reduces effort reliably and affordably.',
    },
  },
  'mfg-cea-m5-3': {
    heading: 'What turns a durability or efficiency claim into perceived value',
    intro: 'Customers weigh lifespan, failures, electricity, parts, technicians and warranties alongside performance and price. A claim becomes useful only when backed by tested performance and real service access.',
    spec: {
      layout: 'table', title: 'Greater Attention to Durability, Energy Efficiency, and Product Lifespan', kicker: '',
      headers: ['Attribute', 'Backed by', 'What the customer gains'],
      rows: [
        { label: 'Energy efficiency', a: 'Tested energy performance in realistic use', b: 'Clear labels and operating cost' },
        { label: 'Durability', a: 'Warranty terms and reliability evidence', b: 'Less purchase uncertainty' },
        { label: 'Repairability', a: 'Parts and technicians available', b: 'Service access when it fails' },
        { label: 'Maintenance', a: 'Defined maintenance support', b: 'Longer useful life' },
        { label: 'End of life', a: 'Take-back and recovery', b: 'Resale or trade-in value' },
      ],
      note: 'NIQ survey: 86% rate durability, 82% repairability and 81% energy efficiency as important — global cross-category importance, not product lifetime or Vietnam-only behaviour. Retailers should explain labels without overpromising environmental outcomes.',
      takeaway: 'Durability and efficiency are becoming perceived-value attributes, not hidden engineering specifications.',
    },
  },
  'mfg-cea-m5-4': {
    heading: 'Where AI shows up in devices and appliances',
    intro: 'AI can support translation, imaging, writing and voice on personal devices, and adaptive cycles, diagnostics and energy management in appliances. Processing may run on the device or in the cloud.',
    spec: {
      layout: 'taxonomy', title: 'AI-Enabled Devices and Intelligent Appliances', kicker: '',
      root: 'AI uses in products', rootDetail: 'Categories of use — value depends on implementation',
      groups: [
        { label: 'Personal-device AI', items: ['Translation', 'Imaging', 'Retrieval and writing', 'Voice'] },
        { label: 'Adaptive appliances', items: ['Personalized settings', 'Adaptive cycles', 'Navigation'] },
        { label: 'Predictive diagnostics', items: ['Fault diagnostics', 'Energy management'] },
        { label: 'Where it runs', items: ['On-device AI', 'Cloud processing'] },
        { label: 'Responsible AI', detail: 'Explain the setting, keep manual control, state limits' },
      ],
      note: 'Example: a washer adjusts a cycle from sensed conditions and explains the setting. In Vietnam, accessible price tiers, local language, useful offline functions and support shape adoption more than AI branding.',
      takeaway: 'AI creates differentiation when visible utility outweighs price, complexity, privacy, reliability and support costs.',
    },
  },
  'mfg-cea-m5-5': {
    heading: 'Five conditions that decide smart-home adoption',
    intro: 'Appliances, lighting, entertainment, security and sensors connect through apps, voice, hubs and standards. A first device can open cross-sell, but incompatible systems, setup friction and abandoned software stall growth.',
    spec: {
      layout: 'driverTree', title: 'Smart Homes, Connectivity, and Device Ecosystems', kicker: '',
      root: { label: 'Smart-home adoption', detail: 'Growth beyond the first device' },
      drivers: [
        { label: 'Utility', children: [{ label: 'Real household jobs' }, { label: 'Energy monitoring' }] },
        { label: 'Affordability', children: [{ label: 'Device price' }, { label: 'Service economics' }] },
        { label: 'Compatibility', children: [{ label: 'Supported standards' }, { label: 'Interoperability' }] },
        { label: 'Setup', children: [{ label: 'Simple installation' }, { label: 'Reliable control' }] },
        { label: 'Trust', children: [{ label: 'Security and privacy' }, { label: 'Update policy' }, { label: 'Local fallback' }] },
      ],
      note: 'MBS forecasts about 9.6% CAGR for smart-home appliances in 2025–2029 — a commercial forecast, not observed market growth. Connected products need useful local fallback and long-term software support.',
      takeaway: 'Smart-home growth depends on affordable interoperability, simple setup, reliable control and trusted support.',
    },
  },
  'mfg-cea-m5-6': {
    heading: 'Engineering advances, the gains they offer and the tradeoffs to validate',
    intro: 'Advances in power electronics, batteries, motors, compressors, displays and thermal systems can improve efficiency, noise, size and reliability. Each also brings cost, heat or repair tradeoffs.',
    spec: {
      layout: 'table', title: 'Energy-Efficient Engineering, Miniaturization, and Product Performance', kicker: '',
      headers: ['Engineering area', 'Possible gain', 'Tradeoff to validate'],
      rows: [
        { label: 'Motors and compressors', a: 'Inverter part-load efficiency', b: 'Test scope, installation and use guidance' },
        { label: 'Battery optimization', a: 'Longer battery performance', b: 'Safety and durability' },
        { label: 'Display innovation', a: 'Performance and efficiency', b: 'Added component cost' },
        { label: 'Compact design', a: 'Smaller, integrated products', b: 'Heat and repair complications' },
        { label: 'Thermal systems and controls', a: 'Lower noise, higher reliability', b: 'Cost-performance balance' },
      ],
      note: 'Validate under representative conditions. In Vietnam, hot climate, electricity costs, housing size, voltage conditions and service capability decide which engineering is locally valuable.',
      takeaway: 'Incremental engineering creates material value when benefits are measurable in everyday use.',
    },
  },
  'mfg-cea-m5-7': {
    heading: 'Two 2025 e-commerce estimates kept side by side, never averaged',
    intro: 'Customers discover and buy through marketplaces, sites and social content while stores support demonstration and installation. Market-size estimates describe broad e-commerce, and their methods differ.',
    spec: {
      layout: 'compare', title: 'E-Commerce Growth and the Development of Omnichannel Retail', kicker: '',
      leftTitle: 'VECOM 2025 estimate', rightTitle: 'MOIT 2025 result',
      rows: [
        { label: 'Value', a: 'US$38.5B', b: 'About US$31B' },
        { label: 'Growth', a: '+21%', b: '+25.5%' },
        { label: 'Method', a: 'VECOM methodology', b: 'Different methodology' },
        { label: 'Scope', a: 'Broad e-commerce — not electronics-only', b: 'Broad e-commerce — not electronics-only' },
      ],
      note: 'Online growth can be eroded by commissions, paid visibility, promotion, delivery, damage, returns and support. Measure category and channel contribution rather than GMV alone.',
      takeaway: 'Online growth and omnichannel value depend on product complexity and full cost-to-serve — not GMV alone.',
    },
  },
  'mfg-cea-m5-8': {
    heading: 'Content that reduces product uncertainty versus content that erodes trust',
    intro: 'Short video, livestreams, reviews and communities can show performance and use better than specification lists. Undisclosed endorsements, misleading claims and constant discounts work against that.',
    spec: {
      layout: 'compare', title: 'Social Commerce, Digital Discovery, and Data-Driven Marketing', kicker: '',
      leftTitle: 'Credible demonstration', rightTitle: 'Trust-eroding content',
      rows: [
        { label: 'Product claims', a: 'Shows surfaces, runtime, noise, maintenance, limits', b: 'Claims that can mislead' },
        { label: 'Sponsorship', a: 'Labelled appropriately', b: 'Unlabelled commercial endorsement' },
        { label: 'Pricing', a: 'Supports full-value purchase', b: 'Discounts that train waiting' },
        { label: 'Data use', a: 'Responsible targeting', b: 'Data use that undermines trust' },
        { label: 'Success measure', a: 'Qualified traffic, conversion, margin', b: 'Views alone' },
      ],
      note: 'In Vietnam, creator and livestream commerce can direct demand to official stores, marketplaces or physical retail, while service and authenticity remain critical.',
      takeaway: 'Digital content creates value when it reduces product uncertainty credibly.',
    },
  },
  'mfg-cea-m5-9': {
    heading: 'How a controlled trade-in programme turns an old device into credit',
    intro: 'Long replacement cycles and price sensitivity create demand for lower-risk purchase options such as trade-in, finance and refurbished products. Fraud, grading and residual value make the process matter.',
    spec: {
      layout: 'flow', title: 'Retail Consolidation, Service Expansion, and New Purchasing Models', kicker: '',
      steps: [
        { label: 'Verify the device', detail: 'Check identity and condition against fraud' },
        { label: 'Price residual value', detail: 'Grade the device and set its value' },
        { label: 'Protect data', detail: 'Remove the customer’s data' },
        { label: 'Refurbish or recycle', detail: 'Route to refurbished stock or recycling', kind: 'decision' },
        { label: 'Apply transparent credit', detail: 'Credit toward the new purchase', kind: 'outcome' },
      ],
      note: 'Large chains can combine store networks, digital systems, finance, installation and maintenance; specialists can differentiate through expertise. Model claims, fraud, residual value, parts, labor, stock and capital.',
      takeaway: 'Retailers increasingly compete through ownership services surrounding the product.',
    },
  },
  'mfg-cea-m5-10': {
    heading: 'Circular 52 energy-labelling dates for desktop computers',
    intro: 'Governments use labels, minimum performance and test procedures; manufacturers and importers need the right scope, evidence and timing. Circular 52/2025/TT-BCT phases obligations in by category.',
    spec: {
      layout: 'timeline', title: 'Energy Efficiency Standards, Product Labelling, and Compliance', kicker: '',
      events: [
        { period: '1 Jan 2026', label: 'Circular 52 takes effect', detail: 'Covers specified household, office/commercial and industrial equipment', status: 'historical' },
        { period: 'Through 31 Dec 2026', label: 'Desktop labelling voluntary', detail: 'Voluntary period for desktop computers', status: 'current' },
        { period: '1 Jan 2027', label: 'Desktop labelling mandatory', detail: 'Scheduled under Circular 52/2025/TT-BCT' },
      ],
      note: 'Other covered appliances follow separate category roadmaps. Verify category and current primary texts, plan tests and documents, and avoid unsupported savings claims.',
      takeaway: 'Energy efficiency is both measurable customer value and a product-specific compliance obligation.',
    },
  },
  'mfg-cea-m5-11': {
    heading: 'How a take-back programme handles a used product responsibly',
    intro: 'Used products contain recoverable materials and hazardous or sensitive components. Repair, resale, refurbishment and qualified recycling can retain utility and materials when the process is controlled.',
    spec: {
      layout: 'flow', title: 'E-Waste Management, Recycling, and Extended Producer Responsibility', kicker: '',
      steps: [
        { label: 'Record eligible product', detail: 'Confirm it is in scope for take-back' },
        { label: 'Protect data', detail: 'Remove sensitive customer data' },
        { label: 'Triage reuse or repair', detail: 'Repair, resale or refurbishment first', kind: 'decision' },
        { label: 'Qualified recycling', detail: 'Direct the rest to qualified partners' },
        { label: 'Preserve evidence', detail: 'Records for compliance reporting', kind: 'outcome' },
      ],
      note: 'Decree 110/2026/ND-CP was issued 1 April 2026 and took effect 25 May 2026, detailing producer/importer recycling and waste-treatment responsibilities. Specific obligations depend on role, product and applicable provisions.',
      takeaway: 'End-of-life responsibility is becoming part of product, channel, service and supply-chain strategy.',
    },
  },
  'mfg-cea-m5-12': {
    heading: 'Sustainable design considered across the whole product lifecycle',
    intro: 'Design looks at materials, manufacturing, use-phase energy, durability, repair, packaging, software support, transport and end-of-life together. A recycled part or one efficiency feature does not prove total superiority.',
    spec: {
      layout: 'taxonomy', title: 'Sustainable Product Design and Responsible Consumption', kicker: '',
      root: 'Eco-design scope', rootDetail: 'Considered together, with boundaries and evidence',
      groups: [
        { label: 'Responsible sourcing', items: ['Materials', 'Manufacturing'] },
        { label: 'Use phase', items: ['Energy use', 'Software support'] },
        { label: 'Repair and spare parts', items: ['Durability', 'Repair instructions', 'Parts'] },
        { label: 'Packaging optimization', items: ['Packaging', 'Transport'] },
        { label: 'Circular models', items: ['Recovery plan', 'Take-back'] },
        { label: 'Evidence-based claims', detail: 'Verified scope, no vague environmental claims' },
      ],
      note: 'A durable appliance with efficient operation, parts, repair instructions and a recovery plan may outperform a nominally green product that fails early.',
      takeaway: 'Sustainability becomes commercially meaningful when improvement is material, measurable, credible and useful.',
    },
  },
  'mfg-cea-m5-13': {
    heading: 'The conditions that move category growth away from the aggregate forecast',
    intro: 'Mature categories depend on replacement and premium value, while useful AI, smart home, small appliances and efficient products may add demand. Affordability, components, currency and policy shift each outcome.',
    spec: {
      layout: 'driverTree', title: 'Global Market Outlook and Category-Level Growth', kicker: '',
      root: { label: 'Category growth outcome', detail: 'Differs by category, region, price and currency' },
      drivers: [
        { label: 'Affordability', children: [{ label: 'Price tier' }, { label: 'Purchasing power' }] },
        { label: 'Adoption', children: [{ label: 'Useful AI' }, { label: 'Smart home' }, { label: 'Efficient products' }] },
        { label: 'Components', children: [{ label: 'Input costs' }] },
        { label: 'Currency', children: [{ label: 'Reported value' }] },
        { label: 'Policy and region', children: [{ label: 'Regional conditions' }, { label: 'Policy changes' }] },
      ],
      note: 'NIQ’s May 2026 forecast expected US$1.4T global Tech & Durables sales and +5.1%, revising January’s -0.4%; the scope includes IT and telecom and currency matters. Use current forecast vintages and category scenarios.',
      takeaway: 'Growth is selective; aggregate forecasts conceal category, region, price and currency differences.',
    },
  },
  'mfg-cea-m5-14': {
    heading: 'Vietnam growth measures that must be read separately',
    intro: 'Urbanization, housing, digital use, comfort and energy costs can support appliances, while mature phones and electronics remain replacement-led. The available growth figures measure different things.',
    spec: {
      layout: 'table', title: 'Vietnam Market Outlook: Smart Appliances, Urbanization, and Digital Retail', kicker: '',
      headers: ['Measure', 'What it covers', 'What it is not'],
      rows: [
        { label: 'MBS smart-home forecast', a: '9.6% CAGR, 2025–2029', b: 'Not total appliances or confirmed growth' },
        { label: 'VnEconomy online category', a: '26% H1 2026 electronics/home-appliance growth', b: 'Not whole-market growth' },
        { label: 'Platforms in that data', a: 'Shopee, TikTok Shop, Lazada, Tiki', b: 'Not every online or physical channel' },
        { label: 'Mature phones and electronics', a: 'Replacement-led demand', b: 'Not new-household growth' },
      ],
      note: 'Example opportunity: an efficient connected air conditioner at an accessible tier with local controls, app use, installation, warranty and service. Invest by localized unit economics and service coverage.',
      takeaway: 'Vietnam’s opportunity combines household demand with accessible technology, local fit, efficient channels and reliable service.',
    },
  },
  'mfg-cea-m5-15': {
    heading: 'Each participant’s priorities and the capabilities all of them need',
    intro: 'Manufacturers prioritize products, sourcing and brands; retailers channels, inventory and retention; local firms specialization and fit. Every participant still needs service, trust, compliance and sound economics.',
    spec: {
      layout: 'taxonomy', title: 'Strategic Opportunities and Priorities for Industry Participants', kicker: '',
      root: 'Industry participants', rootDetail: 'Complementary capabilities — not one technology or channel',
      groups: [
        { label: 'Manufacturers', items: ['Products', 'Sourcing', 'Brands'] },
        { label: 'Retailers', items: ['Channels', 'Inventory', 'Retention'] },
        { label: 'Local firms', items: ['Specialization', 'Local fit'] },
        { label: 'All participants', items: ['Service', 'Trust', 'Compliance', 'Economics'] },
      ],
      note: 'Opportunities in Vietnam include localized smart appliances, service infrastructure, official online channels, supplier capability and credible circular operations. Track scenario triggers alongside growth, contribution and retention.',
      takeaway: 'Sustainable growth requires complementary capabilities rather than dependence on one technology or channel.',
    },
  },
};
