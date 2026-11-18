import type { VisualSpec } from './fashionVisualKit';

export interface ElectronicsChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Consumer Electronics & Semiconductors Module 05, keyed by visualKind. */
export const ELECTRONICS_M5_VISUALS: Record<string, ElectronicsChapterVisual> = {
  'electronics-m5-1': {
    heading: 'A value-conscious buyer upgrades only when the old device materially limits use',
    intro: 'Consumers compare performance gains with price and long-term value instead of replacing every generation. Battery life, support, repair and real improvement in daily use drive the decision.',
    spec: {
      layout: 'decision', title: 'Value-Conscious Consumption and Longer Product Lifecycles', kicker: '',
      root: { label: 'Device in use', detail: 'Ageing, but still working' },
      question: 'Do battery, performance, security support or compatibility now materially affect use?',
      branches: [
        { condition: 'No, improvements look incremental', outcome: 'Keep it longer', detail: 'Repair or extend warranty if needed', tone: 'caution' },
        { condition: 'Yes, and a clear advance is on offer', outcome: 'Upgrade to a premium flagship', detail: 'Trade-in or buyback can offset cost', tone: 'positive' },
        { condition: 'Yes, but the budget is constrained', outcome: 'Compare value alternatives', detail: 'Refurbished, used, mid-range or financed devices', tone: 'positive' },
      ],
      note: 'Example from the chapter: a refurbished premium phone with warranty support can beat a new entry-level device. Forecasts should include installed-base age, support status, financing and resale value.',
      takeaway: 'Demand is shifting toward value-based purchasing, making differentiation, durability, and total cost of ownership central to replacement decisions.',
    },
  },
  'electronics-m5-2': {
    heading: 'What each AI device trend delivers — and what users actually judge',
    intro: 'Phones, computers, wearables and smart-home devices increasingly use AI, but the feature label alone does not prove usefulness. Users judge accuracy, speed, battery effect, privacy and real workflow improvement.',
    spec: {
      layout: 'table', title: 'AI-Enabled and Personalized Device Experiences', kicker: '',
      headers: ['Trend', 'Example in the chapter', 'What users judge'],
      rows: [
        { label: 'On-device AI', a: 'Local inference on neural processing engines', b: 'Responsiveness and offline use' },
        { label: 'AI-powered productivity', a: 'Summarise documents, transcribe meetings', b: 'Actual workflow improvement' },
        { label: 'Personalized experiences', a: 'Recommendations and contextual interfaces', b: 'Relevance and accuracy' },
        { label: 'AI hardware integration', a: 'Dedicated AI hardware in laptops', b: 'Battery effect and price' },
        { label: 'Privacy-oriented processing', a: 'Controls on what runs locally or in the cloud', b: 'Privacy and trust' },
      ],
      note: 'Stronger models raise memory, thermal, power and component requirements. Prioritise repeatable use cases before making AI the product proposition.',
      takeaway: 'AI is becoming a device-differentiation strategy that links consumer experience to processors, memory, software, energy efficiency, privacy, and trust.',
    },
  },
  'electronics-m5-3': {
    heading: 'One secure account ties phones, computers, wearables and the home together',
    intro: 'Consumers use many devices together, and each device’s usefulness depends on how easily it fits the wider digital environment. Seamless setup, transfer and shared controls encourage repeat purchases.',
    spec: {
      layout: 'ecosystem', title: 'Connected Lifestyles, Convenience, and Ecosystem Loyalty', kicker: '',
      center: { label: 'User account', detail: 'Identity, payments and shared subscriptions' },
      actors: [
        { label: 'Smartphone', relation: 'Start work, calls and notifications', flows: ['information'] },
        { label: 'Computer', relation: 'Continue the same work and files', flows: ['information'] },
        { label: 'Wearables', relation: 'Health and activity data', flows: ['information', 'service'] },
        { label: 'Smart-home devices', relation: 'Shared home controls', flows: ['service'] },
        { label: 'Subscriptions and cloud', relation: 'Storage, entertainment and productivity', flows: ['money', 'service'] },
      ],
      note: 'Incompatible standards and lock-in reduce flexibility; interoperability with widely used platforms builds trust.',
      takeaway: 'Competitive advantage increasingly comes from the connected experience rather than the specifications of one device.',
    },
  },
  'electronics-m5-4': {
    heading: 'AI system performance depends on compute, memory, data movement and power together',
    intro: 'Training and deploying advanced AI models needs computation, memory bandwidth, fast data movement, power and cooling. No single chip determines a system’s performance or economics.',
    spec: {
      layout: 'driverTree', title: 'AI Computing, Advanced Processors, and High-Bandwidth Memory', kicker: '',
      root: { label: 'AI system performance and economics', detail: 'A data-center AI system as a whole' },
      drivers: [
        { label: 'Compute', children: [{ label: 'AI accelerators' }, { label: 'Advanced CPUs and GPUs' }, { label: 'Custom silicon' }] },
        { label: 'Memory bandwidth', children: [{ label: 'High-bandwidth memory' }] },
        { label: 'Data movement', children: [{ label: 'Interconnects' }, { label: 'Networking chips' }, { label: 'Advanced packaging' }] },
        { label: 'Power and cooling', children: [{ label: 'Energy-efficient computing' }, { label: 'Thermal systems' }] },
        { label: 'Software', detail: 'System software that uses the hardware' },
      ],
      note: 'In personal devices, AI engines must fit battery, heat, price and software limits. AI demand is concentrated and capital-intensive, so test investments under alternative scenarios.',
      takeaway: 'AI computing is reshaping semiconductor demand by increasing the importance of specialized processors, advanced memory, and efficient data movement.',
    },
  },
  'electronics-m5-5': {
    heading: 'Advanced packaging combines several dies and technologies in one package',
    intro: 'As conventional scaling becomes harder and costlier, system gains increasingly come from integrating multiple dies, memories and specialised technologies. The approaches below are complementary, not sequential.',
    spec: {
      layout: 'taxonomy', title: 'Advanced Packaging, Chiplets, and Heterogeneous Integration', kicker: '',
      root: 'Advanced packaging', rootDetail: 'Approaches and the capabilities they require',
      groups: [
        { label: 'Chiplet', detail: 'Smaller functional dies that aid reuse and flexibility' },
        { label: '2.5D and 3D packaging', detail: 'Advanced interconnects and stacking' },
        { label: 'Heterogeneous integration', detail: 'Logic, memory, analog or connectivity from different processes' },
        { label: 'Advanced testing and inspection', detail: 'Find faults across the integrated system, including known-good-die' },
        { label: 'Specialized manufacturing investment', detail: 'Engineering, equipment, materials, substrates, qualification' },
      ],
      note: 'Example: an AI accelerator places compute dies and HBM close together to raise bandwidth and cut data-movement energy. Designers, foundries, OSATs, memory and equipment partners must coordinate from the architecture stage.',
      takeaway: 'Advanced packaging is becoming a strategic source of performance and flexibility alongside traditional transistor advances.',
    },
  },
  'electronics-m5-6': {
    heading: 'Specialised chips win on fit to the workload, not peak speed',
    intro: 'Data centers face rising electricity and cooling needs, while mobile and embedded devices must perform within battery, thermal, safety and reliability limits. Tailored hardware can improve latency, energy, reliability, cost or safety.',
    spec: {
      layout: 'table', title: 'Energy Efficiency, Connectivity, and Specialized Computing', kicker: '',
      headers: ['Technology', 'What it improves', 'Application in the chapter'],
      rows: [
        { label: 'Low-power chip design', a: 'Performance per watt', b: 'Mobile and embedded devices' },
        { label: 'Power-management semiconductors', a: 'Reliable continuous operation', b: 'Industrial vision system' },
        { label: 'Connectivity chips', a: 'Wi-Fi, Bluetooth, 5G and networking links', b: 'Factory integration' },
        { label: 'Edge computing', a: 'Latency and less cloud dependence', b: 'Low-latency inspection' },
        { label: 'Application-specific chips', a: 'Tailored latency, energy or safety', b: 'Automotive and industrial controls' },
      ],
      note: 'Select architectures by workload, environment, lifetime, support, certification, power and total-system economics.',
      takeaway: 'Future advantage depends on useful performance, power efficiency, connectivity, reliability, and application fit—not raw computing speed alone.',
    },
  },
  'electronics-m5-7': {
    heading: 'Demand pools that follow different patterns and need separate forecasts',
    intro: 'Smartphones, PCs, data centers, vehicles and industrial electronics follow different demand patterns. Strong AI infrastructure demand can coexist with slower consumer-device replacement.',
    spec: {
      layout: 'taxonomy', title: 'Uneven Market Growth and Changing Replacement Cycles', kicker: '',
      root: 'Electronics demand pools', rootDetail: 'Forecast each pool separately — one aggregate growth rate hides the differences',
      groups: [
        { label: 'Consumer devices', detail: 'Installed-base age, purchasing power, innovation', items: ['Smartphones', 'PCs', 'Televisions', 'Wearables', 'Gaming products', 'Appliances'] },
        { label: 'Computing infrastructure', detail: 'Data-center investment and memory cycles', items: ['Data centers'] },
        { label: 'Embedded and connected', detail: 'Different order, pricing and qualification conditions', items: ['Automotive systems', 'Industrial electronics', 'Connected devices'] },
      ],
      note: 'Inventory corrections or component-price changes can move shipments and margins even when end demand changes little. Use leading indicators and downside scenarios.',
      takeaway: 'Growth is increasingly uneven, making category and application forecasting more useful than one aggregate outlook.',
    },
  },
  'electronics-m5-8': {
    heading: 'One customer journey crosses online and physical channels',
    intro: 'Consumers often research online, test in stores and choose delivery, financing, installation or service through yet another channel. Distribution is becoming one connected journey.',
    spec: {
      layout: 'flow', title: 'Omnichannel Retail, E-Commerce, and Direct Customer Relationships', kicker: '',
      steps: [
        { label: 'Research', detail: 'Compare specifications, reviews and prices', owner: 'Marketplaces and brand sites' },
        { label: 'Experience', detail: 'Test displays and keyboards', owner: 'Physical stores' },
        { label: 'Order', detail: 'Configured model, financing options', owner: 'Brand-owned online store' },
        { label: 'Fulfil', detail: 'Delivery, click-and-collect or installation', owner: 'Retailer or brand' },
        { label: 'Support', detail: 'Setup, warranty and repair via a shared account', kind: 'outcome', owner: 'Service network' },
      ],
      loop: 'Loyalty programs and customer data feed the next purchase.',
      note: 'Measure conversion, margin, fulfillment, returns, service and retention across the whole journey rather than rewarding channels for competing over the same sale.',
      takeaway: 'Omnichannel models combine digital reach and data with physical experience, consultation, fulfillment, and after-sales service.',
    },
  },
  'electronics-m5-9': {
    heading: 'Supply-chain risk opens several diversification options, each judged on more than cost',
    intro: 'Trade tension, disruption, concentration and market-access risk push firms to add suppliers and locations. Diversification is an operating-capability project, not a simple relocation.',
    spec: {
      layout: 'pathway', title: 'Supply-Chain Diversification and Regional Manufacturing Networks', kicker: '',
      trunk: [
        { label: 'Concentration and disruption risk', detail: 'One supplier, site or region' },
        { label: 'Decide to diversify', detail: 'Adds options but also complexity and cost', kind: 'decision' },
      ],
      optionsLabel: 'Diversification approaches — can be combined',
      options: [
        { label: 'China-plus-one strategies', detail: 'Add a production location' },
        { label: 'Regional supplier development', detail: 'Qualify more suppliers nearby' },
        { label: 'Risk-based sourcing', detail: 'Procure by exposure, not price alone' },
        { label: 'Manufacturing localization', detail: 'Local assembly and testing' },
        { label: 'Supply-chain visibility', detail: 'Timely supplier and inventory data' },
      ],
      afterLabel: 'Evaluate each option on',
      after: [{ label: 'Continuity and capability', detail: 'Landed cost, ramp risk, qualification time, supplier learning', kind: 'outcome' }],
      note: 'A device company may add final assembly in Southeast Asia while still relying on established clusters for components and equipment. Vietnam’s gains depend on power, water, logistics, talent and supplier depth.',
      takeaway: 'Resilience requires a workable balance among geography, cost, technology, qualification, logistics, and access to specialized suppliers.',
    },
  },
  'electronics-m5-10': {
    heading: 'EU smartphone and tablet rules turn lifecycle goals into design requirements',
    intro: 'EU ecodesign and energy-labelling rules apply from 20 June 2025 for covered smartphones and tablets. Each requirement area maps to a product-strategy response.',
    spec: {
      layout: 'table', title: 'Product Durability, Repairability, and Circular Electronics', kicker: '',
      headers: ['Requirement area', 'Official EU summary', 'Product strategy response'],
      rows: [
        { label: 'Durability', a: 'Resistance to drops, scratches, dust and water', b: 'Durability engineering' },
        { label: 'Battery', a: 'At least 80% capacity after 800 cycles', b: 'Battery and design trade-offs' },
        { label: 'Spare parts and repair', a: 'Defined parts and repair access; key parts 7 years', b: 'Maintain parts and repair documentation' },
        { label: 'Software support', a: 'Longer OS-update availability', b: 'Extend security updates' },
        { label: 'Repairability information', a: 'Repairability information provided', b: 'Publish repairability information' },
      ],
      note: 'Official European Commission summary; defined parts and conditions apply. Trade-in and refurbishment programs extend value further.',
      takeaway: 'Sustainability regulation is moving from broad messaging toward measurable durability, repair, support, and lifecycle obligations.',
    },
  },
  'electronics-m5-11': {
    heading: 'A fab’s environmental performance rests on five resource drivers',
    intro: 'Semiconductor manufacturing relies on electricity, ultrapure water, gases, chemicals and complex waste treatment. Resource performance affects facility feasibility, operating risk, cost and community impact.',
    spec: {
      layout: 'driverTree', title: 'Semiconductor Sustainability and Resource Efficiency', kicker: '',
      root: { label: 'Fab environmental performance', detail: 'Without compromising process stability, purity, safety or yield' },
      drivers: [
        { label: 'Energy efficiency', children: [{ label: 'Efficient equipment' }, { label: 'Efficient cooling' }] },
        { label: 'Renewable electricity procurement', detail: 'Lower-carbon power where feasible' },
        { label: 'Water recycling', children: [{ label: 'Water treatment' }, { label: 'Recycling' }] },
        { label: 'Process-gas management', children: [{ label: 'Monitoring' }, { label: 'Abatement' }] },
        { label: 'Supplier environmental assessment', detail: 'Chemical management and waste reduction across suppliers' },
      ],
      note: 'Requirements vary by process and location; grid reliability, permits, climate and community expectations matter. Vietnam should assess electricity, water, infrastructure and treatment systems together.',
      takeaway: 'Environmental performance is becoming an operating and investment factor, especially for resource-intensive fabrication facilities.',
    },
  },
  'electronics-m5-12': {
    heading: 'Compliance and security are built in from sourcing through after-sale support',
    intro: 'Export controls, investment screening and end-use rules affect chips and advanced computing, and connected devices carry security and privacy obligations after sale. A connected-device firm assesses these before launch and keeps them running afterwards.',
    spec: {
      layout: 'flow', title: 'Trade Controls, Technology Governance, and Cybersecurity', kicker: '',
      steps: [
        { label: 'Source and design', detail: 'Component provenance, supplier records, secure development', owner: 'Supply-chain due diligence' },
        { label: 'Classify and screen', detail: 'Product classification, customer and destination screening, licensing', owner: 'Export-control compliance' },
        { label: 'Secure the product', detail: 'Secure boot, firmware protection, updates', owner: 'Product cybersecurity' },
        { label: 'Handle data', detail: 'Data minimization, consent, access controls', owner: 'Data protection' },
        { label: 'Support after sale', detail: 'Vulnerability response, patching, support duration', kind: 'outcome', owner: 'Product cybersecurity' },
      ],
      loop: 'Regulatory monitoring tracks changing requirements across jurisdictions and escalates them.',
      note: 'A restriction can affect chips, equipment, software, expertise, capital or customers.',
      takeaway: 'Regulation and geopolitics now shape technology strategy, supplier choices, product architecture, software support, and market access.',
    },
  },
  'electronics-m5-13': {
    heading: 'Memory and AI infrastructure drive the forecast — returns still depend on execution',
    intro: 'WSTS’s Spring 2026 forecast projects US$1.511T of worldwide semiconductor sales in 2026, up 89.9%. These are forecast values, not confirmed results, and lean heavily on memory and AI assumptions.',
    spec: {
      layout: 'driverTree', title: 'Semiconductor Growth Outlook: AI, Memory, and Computing Infrastructure', kicker: '',
      root: { label: '2026 semiconductor sales (forecast)', detail: 'WSTS Spring 2026: US$1.511T, up 89.9% — forecast, not a result' },
      drivers: [
        { label: 'Memory', detail: 'Forecast US$803.941B, up 249.5%', children: [{ label: 'HBM capacity expansion' }] },
        { label: 'AI infrastructure investment', children: [{ label: 'Accelerators' }, { label: 'Logic' }, { label: 'Networking' }] },
        { label: 'Supporting technologies', children: [{ label: 'Advanced packaging' }, { label: 'Power' }, { label: 'Cooling' }] },
        { label: 'Other categories', detail: 'May grow more moderately' },
      ],
      note: 'High prices, supply limits, capacity additions and customer concentration amplify both upside and downside. Monitor actual shipments, pricing, inventories and project returns before committing major capital.',
      takeaway: 'AI and memory are major growth drivers, while sustainable returns still depend on customer demand, capacity utilization, execution, diversification, and capital discipline.',
    },
  },
  'electronics-m5-14': {
    heading: 'An intelligent-device portfolio offers several price and value options',
    intro: 'Consumer-electronics growth stays uneven because replacement cycles, affordability and innovation differ across devices and regions. A portfolio can combine premium and mid-range devices with support, financing and services.',
    spec: {
      layout: 'pathway', title: 'Consumer Electronics Growth Outlook: Premiumization and Intelligent Devices', kicker: '',
      trunk: [
        { label: 'Category-specific demand', detail: 'Upgrades only when daily use clearly improves' },
        { label: 'Intelligent laptop portfolio', detail: 'One portfolio, several willingness-to-pay levels' },
      ],
      optionsLabel: 'Flexible price architecture — offered side by side',
      options: [
        { label: 'Premium AI models', detail: 'Premiumization through meaningful upgrades' },
        { label: 'Mid-range productivity devices', detail: 'Practical benefit at lower price' },
        { label: 'Long software support', detail: 'Trusted lifecycle value' },
        { label: 'Financing', detail: 'Spreads the total price' },
        { label: 'Services and accessories', detail: 'Connected value beyond the device' },
      ],
      note: 'Higher component and development costs can pressure prices and margins. Judge features by adoption, retention, support cost, margin and satisfaction, not launch attention.',
      takeaway: 'Growth comes from meaningful upgrades and connected value, but adoption still depends on practical benefit, trusted support, and acceptable total price.',
    },
  },
  'electronics-m5-15': {
    heading: 'Vietnam’s semiconductor strategy sets policy targets through 2030 and a vision to 2050',
    intro: 'Decision 1018/QD-TTg sets a national semiconductor strategy through 2030 with a vision to 2050. Its first-phase figures are strategic targets, not guaranteed outcomes.',
    spec: {
      layout: 'timeline', title: 'Strategic Opportunities for Vietnam', kicker: '',
      events: [
        { period: 'Sept 2024', label: 'Decision 1018/QD-TTg issued', detail: 'National semiconductor strategy', status: 'historical' },
        { period: 'Today', label: 'Production and export base', detail: 'Depth remains uneven across the chain', status: 'current' },
        { period: 'By 2030', label: 'First-phase policy targets', detail: 'At least 100 design companies, one small-scale manufacturing factory, 10 packaging and testing plants, 50,000+ engineers and graduates', status: 'forecast' },
        { period: '2050', label: 'Long-term vision horizon', detail: 'Implementation and outcomes remain uncertain', status: 'forecast' },
      ],
      note: 'Targets are policy objectives. Measure progress through qualified engineers, supplier performance, technical milestones, productivity and retained value — not target counts or investment announcements alone.',
      takeaway: 'Vietnam’s long-term opportunity is to become a more capable ecosystem with stronger local expertise and retained value, not simply a larger assembly location.',
    },
  },
};
