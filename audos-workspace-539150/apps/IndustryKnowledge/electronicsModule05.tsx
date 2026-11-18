import { electronicsM5Chapter, electronicsM5Quiz } from './electronicsM5Core';
import type { ElectronicsM5CardData, ElectronicsM5LessonBundle, ElectronicsM5SourceId, ElectronicsM5VisualKind } from './electronicsM5Core';
import { renderElectronicsModule05Visual } from './electronicsM5Visuals';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { ElectronicsM5VisualKind } from './electronicsM5Core';
export { renderElectronicsModule05Visual };

type ChapterInput = {
  title: string;
  objective: string;
  intro: string;
  insight: string;
  what: string;
  why: string;
  example: string;
  vietnam: string;
  impact: string;
  activities: string[];
  visual: ElectronicsM5VisualKind;
  sources?: ElectronicsM5SourceId[];
  stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
};

const definitions: Record<string, string> = {
  Premiumization: 'Movement toward higher-value products supported by differentiated features, experience, service, or brand.',
  'Replacement cycle': 'The interval between acquisition and replacement of a device or system.',
  'Total cost of ownership': 'Purchase price plus financing, energy, maintenance, repair, software, and disposal costs over useful life.',
  'On-device AI': 'AI inference performed locally on a device rather than relying entirely on remote cloud processing.',
  Interoperability: 'The ability of devices, services, and systems from one or more providers to work together.',
  'High-bandwidth memory': 'Stacked memory designed to provide high data throughput for demanding computing workloads.',
  Chiplet: 'A smaller functional die designed to be integrated with other dies in one package or system.',
  'Heterogeneous integration': 'Combining different processor, memory, analog, or specialized technologies in one package or system.',
  'Edge computing': 'Processing performed near the user, sensor, or device to reduce latency or cloud dependence.',
  Omnichannel: 'Coordinated physical and digital channels that share product, inventory, fulfillment, service, and customer context.',
  'Supply-chain visibility': 'Timely information about suppliers, inventory, capacity, production, logistics, and disruption exposure.',
  Repairability: 'The practical ability to diagnose, disassemble, service, and restore a product using parts, information, and tools.',
  Circularity: 'Extending product and material value through durability, repair, reuse, refurbishment, recovery, and recycling.',
  'Export-control compliance': 'Screening technology, products, customers, destinations, and transactions against applicable restrictions.',
  'Scenario planning': 'Testing decisions against multiple plausible demand, price, supply, policy, and technology outcomes.',
  'Value-chain upgrading': 'Movement into activities with greater technology, differentiation, productivity, or retained economic value.',
};

const terms = (activities: string[]) => activities.slice(0, 5).map((term) => [
  term,
  definitions[term] ?? `A core capability or consideration in ${term.toLowerCase()}.`,
] as [string, string]);

const chapter = (lesson: string, input: ChapterInput): ElectronicsM5CardData => electronicsM5Chapter({
  lesson,
  ...input,
  terms: terms(input.activities),
  recap: [input.insight, input.impact, `Key dimensions include ${input.activities.join(', ')}.`],
  sources: input.sources ?? [],
});

const consumerTrends = [
  chapter('Consumer Trends', {
    title: 'Value-Conscious Consumption and Longer Product Lifecycles',
    objective: 'Explain how affordability, perceived upgrade value, durability, financing, and lifecycle options reshape device demand.',
    intro: 'Consumers increasingly compare performance improvements with price and long-term value instead of replacing every device generation. Battery life, durability, support, repair, and a meaningful improvement in daily experience can matter as much as launch novelty.',
    insight: 'Demand is shifting toward value-based purchasing, making differentiation, durability, and total cost of ownership central to replacement decisions.',
    what: 'Manufacturers respond with tiered portfolios, premium flagships, capable mid-range devices, certified refurbished products, software support, trade-in programs, buyback offers, financing, warranties, and repair services.',
    why: 'When improvements are incremental or budgets are constrained, customers keep products longer. Premium buyers may still upgrade for clear advances, while value-focused buyers compare used, refurbished, mid-tier, and financed alternatives.',
    example: 'A buyer may choose a refurbished premium phone with warranty support over a new entry-level device, or delay replacement until battery, performance, security support, or compatibility materially affects use.',
    vietnam: 'Vietnamese brands, retailers, and service networks can compete through credible mid-range value, installment options, trade-ins, repairs, warranties, and transparent refurbished-device quality.',
    impact: 'Forecasting should incorporate installed-base age, support status, financing, resale value, repair economics, and perceived generational improvement—not launch schedules alone.',
    activities: ['Value-based product positioning', 'Premiumization', 'Refurbished device markets', 'Replacement cycle', 'Financing and trade-in programs', 'Total cost of ownership'],
    visual: 'electronics-m5-1',
  }),
  chapter('Consumer Trends', {
    title: 'AI-Enabled and Personalized Device Experiences',
    objective: 'Assess when AI features create practical customer value and the semiconductor capability required to deliver them.',
    intro: 'Smartphones, computers, wearables, and smart-home devices increasingly use AI for content creation, translation, image processing, productivity, search, assistance, and recommendations. The feature label alone does not prove usefulness.',
    insight: 'AI is becoming a device-differentiation strategy that links consumer experience to processors, memory, software, energy efficiency, privacy, and trust.',
    what: 'Trends include local inference, neural processing engines, AI-assisted writing and search, media enhancement, transcription, personalization, contextual interfaces, and privacy controls that determine what runs locally or in the cloud.',
    why: 'On-device processing can improve responsiveness, offline use, privacy, and cloud cost, but stronger models can increase memory, thermal, power, software, and component requirements.',
    example: 'A laptop may summarize documents, transcribe meetings, enhance calls, and search local files using dedicated AI hardware, while users judge accuracy, speed, battery effect, privacy, and actual workflow improvement.',
    vietnam: 'Vietnamese developers and device businesses can differentiate through localized language, productivity, education, commerce, accessibility, and support use cases rather than generic AI branding.',
    impact: 'Prioritize repeatable use cases and evaluate model quality, hardware cost, update support, privacy, reliability, and willingness to pay before making AI the product proposition.',
    activities: ['On-device AI', 'AI-powered productivity', 'Personalized experiences', 'AI hardware integration', 'Privacy-oriented processing'],
    visual: 'electronics-m5-2',
    sources: ['wstsSpring2026'],
  }),
  chapter('Consumer Trends', {
    title: 'Connected Lifestyles, Convenience, and Ecosystem Loyalty',
    objective: 'Evaluate how interoperability, shared services, security, and cross-device continuity affect loyalty and switching.',
    intro: 'Consumers increasingly use smartphones, computers, televisions, wearables, appliances, and smart-home products together. The usefulness of each device depends partly on how easily it fits the wider digital environment.',
    insight: 'Competitive advantage increasingly comes from the connected experience rather than the specifications of one device.',
    what: 'Connected ecosystems combine hardware, operating systems, accounts, applications, accessories, cloud storage, entertainment, productivity, home control, health services, and customer support.',
    why: 'Seamless setup, file transfer, calls, notifications, identity, payments, and shared controls reduce friction and encourage repeat purchases, while incompatible standards and lock-in can reduce flexibility.',
    example: 'A user can start work on a phone, continue on a computer, control home devices, review wearable data, and access shared subscriptions through one secure account.',
    vietnam: 'Local services and device partners can improve relevance through Vietnamese-language interfaces, payments, content, support, connectivity, and interoperability with widely used platforms.',
    impact: 'Ecosystem value should be built on convenience, security, reliability, and genuine compatibility rather than artificial barriers that weaken trust.',
    activities: ['Cross-device integration', 'Smart-home connectivity', 'Wearable integration', 'Subscription-based ecosystems', 'Interoperability'],
    visual: 'electronics-m5-3',
  }),
];

const technologyTrends = [
  chapter('Technology & Innovation Trends', {
    title: 'AI Computing, Advanced Processors, and High-Bandwidth Memory',
    objective: 'Connect AI workloads with accelerators, processors, networking, memory bandwidth, power, thermal design, and device economics.',
    intro: 'Training and deploying advanced AI models requires substantial computation, memory bandwidth, fast data movement, power, and cooling. Demand therefore extends beyond processors to memory, networking, packaging, power management, and system software.',
    insight: 'AI computing is reshaping semiconductor demand by increasing the importance of specialized processors, advanced memory, and efficient data movement.',
    what: 'Growth areas include accelerators, GPUs, server CPUs, custom silicon, high-bandwidth memory, interconnects, networking chips, advanced packaging, AI PCs and phones, and supporting power and thermal systems.',
    why: 'AI model size and usage can create bottlenecks in memory bandwidth and data movement. In personal devices, dedicated engines must deliver useful performance within battery, heat, price, and software constraints.',
    example: 'A data-center AI system combines accelerators, HBM, host processors, networking, storage, software, cooling, and power; no single chip determines the system’s total performance or economics.',
    vietnam: 'Vietnam can participate through chip design, verification, software, data-center engineering, device integration, testing, packaging, and supplier services matched to realistic capability.',
    impact: 'AI demand is significant but concentrated and capital-intensive; investment decisions should test customer concentration, supply constraints, application durability, and returns under alternative scenarios.',
    activities: ['AI accelerators', 'High-bandwidth memory', 'Advanced CPUs and GPUs', 'AI-enabled consumer devices', 'Energy-efficient computing'],
    visual: 'electronics-m5-4',
    sources: ['wstsSpring2026', 'oecdValueChain'],
  }),
  chapter('Technology & Innovation Trends', {
    title: 'Advanced Packaging, Chiplets, and Heterogeneous Integration',
    objective: 'Explain how package architecture, interconnects, thermal management, testing, and design-manufacturing coordination complement transistor scaling.',
    intro: 'As conventional scaling becomes more difficult and expensive, system improvement increasingly comes from integrating multiple dies, memories, and specialized technologies within one package.',
    insight: 'Advanced packaging is becoming a strategic source of performance and flexibility alongside traditional transistor advances.',
    what: 'Chiplets divide complex systems into smaller functional dies. 2.5D and 3D approaches use advanced interconnects and stacking. Heterogeneous integration combines logic, memory, analog, connectivity, or specialized components made with different processes.',
    why: 'Smaller dies can improve design reuse and manufacturing flexibility, but complex packages create demanding interconnect, thermal, power, substrate, inspection, known-good-die, and reliability challenges.',
    example: 'An AI accelerator package can place compute dies and HBM close together to increase bandwidth and reduce data-movement energy, while advanced testing must find faults across the integrated system.',
    vietnam: 'Vietnam’s packaging and testing base creates an entry point for capability development, but advanced packaging requires sustained investment in engineering, equipment, materials, substrates, quality, and customer qualification.',
    impact: 'Firms should treat packaging decisions as part of architecture from the beginning and coordinate designers, foundries, OSATs, memory suppliers, and equipment partners.',
    activities: ['Chiplet', '2.5D and 3D packaging', 'Heterogeneous integration', 'Advanced testing and inspection', 'Specialized manufacturing investment'],
    visual: 'electronics-m5-5',
    sources: ['oecdValueChain', 'oecdVietnam'],
  }),
  chapter('Technology & Innovation Trends', {
    title: 'Energy Efficiency, Connectivity, and Specialized Computing',
    objective: 'Assess performance per watt, reliability, connectivity, latency, and application fit across expanding semiconductor uses.',
    intro: 'Computing growth increases electricity and cooling needs in data centers, while mobile and embedded devices must improve performance within battery, thermal, safety, and reliability limits.',
    insight: 'Future advantage depends on useful performance, power efficiency, connectivity, reliability, and application fit—not raw computing speed alone.',
    what: 'Trends include low-power architectures, power-management ICs and power devices, Wi-Fi, Bluetooth, 5G and networking chips, edge processing, automotive semiconductors, industrial controls, sensors, and application-specific accelerators.',
    why: 'General-purpose architectures do not optimize every workload. Tailored hardware can improve latency, energy, reliability, cost, or safety, while local processing can reduce continuous cloud dependence.',
    example: 'An industrial vision system may use edge AI for low-latency inspection, specialized connectivity for factory integration, and power management designed for reliable continuous operation.',
    vietnam: 'Vietnam can build engineering and manufacturing niches around embedded systems, industrial electronics, connectivity, power management, device integration, and application-specific design services.',
    impact: 'Select architectures using workload, environment, lifetime, support, certification, power, and total-system economics rather than peak benchmark performance.',
    activities: ['Low-power chip design', 'Power-management semiconductors', 'Connectivity chips', 'Edge computing', 'Application-specific chips'],
    visual: 'electronics-m5-6',
    sources: ['oecdValueChain'],
  }),
];

const marketChannelTrends = [
  chapter('Market & Channel Trends', {
    title: 'Uneven Market Growth and Changing Replacement Cycles',
    objective: 'Build segment-level forecasts that account for category, region, price tier, cycle, inventory, and investment differences.',
    intro: 'Smartphones, PCs, televisions, appliances, wearables, gaming products, connected devices, data centers, automotive systems, and industrial electronics follow different demand patterns. One industry-wide growth rate hides those differences.',
    insight: 'Growth is increasingly uneven, making category and application forecasting more useful than one aggregate outlook.',
    what: 'Teams track installed bases, product age, enterprise refreshes, purchasing power, innovation, pricing, inventories, memory cycles, data-center investment, component availability, and regional demand separately.',
    why: 'Strong AI infrastructure demand can coexist with slower consumer-device replacement. Inventory corrections or component-price changes can also affect shipments and margins even when end demand changes little.',
    example: 'A semiconductor supplier serving data centers, vehicles, and consumer devices may see very different order, pricing, qualification, and inventory conditions across those end markets.',
    vietnam: 'Vietnamese manufacturers and suppliers need product- and customer-level forecasts because export demand, domestic consumption, component availability, and multinational production plans can diverge.',
    impact: 'Use portfolio diversification, flexible planning, leading indicators, and downside scenarios to allocate capacity and inventory across uneven demand pools.',
    activities: ['Category-level forecasting', 'Replacement-cycle management', 'Inventory optimization', 'Demand diversification', 'Scenario planning'],
    visual: 'electronics-m5-7',
  }),
  chapter('Market & Channel Trends', {
    title: 'Omnichannel Retail, E-Commerce, and Direct Customer Relationships',
    objective: 'Coordinate discovery, experience, pricing, inventory, fulfillment, service, and data across digital and physical channels.',
    intro: 'Consumers often research specifications, reviews, and prices online, test products in stores, and choose delivery, collection, financing, installation, or service through another channel. Distribution is becoming one connected customer journey.',
    insight: 'Omnichannel models combine digital reach and data with physical experience, consultation, fulfillment, and after-sales service.',
    what: 'Channels include marketplaces, brand websites, retailer sites, stores, carrier partners, social and livestream commerce, click-and-collect, home delivery, installation, repair, and loyalty programs.',
    why: 'Digital channels improve comparison and customer insight but intensify price transparency and acquisition cost. Stores support demonstration and trust but require coordinated inventory, training, and economics.',
    example: 'A customer can compare laptops online, test displays and keyboards in a store, order a configured model for delivery, and receive setup and warranty support through a shared account.',
    vietnam: 'Vietnamese brands and retailers can connect marketplaces, social commerce, stores, installment financing, delivery, installation, repair, and customer care while maintaining consistent pricing and product information.',
    impact: 'Measure conversion, margin, fulfillment, returns, service, retention, and incremental reach across the whole journey rather than reward channels for competing over the same sale.',
    activities: ['Marketplace distribution', 'Brand-owned online stores', 'Physical experience retail', 'Omnichannel', 'Digital customer engagement'],
    visual: 'electronics-m5-8',
  }),
  chapter('Market & Channel Trends', {
    title: 'Supply-Chain Diversification and Regional Manufacturing Networks',
    objective: 'Balance geographic diversification with qualification, cost, capacity, technology, supplier depth, and market access.',
    intro: 'Trade tension, disruption, concentration, and market-access risk encourage firms to add suppliers and production locations. Diversification is an operating-capability project, not a simple relocation decision.',
    insight: 'Resilience requires a workable balance among geography, cost, technology, qualification, logistics, and access to specialized suppliers.',
    what: 'Approaches include China-plus-one networks, additional qualified suppliers, regional sourcing, local assembly and testing, alternative logistics, inventory strategies, capacity options, digital visibility, and risk-based procurement.',
    why: 'New locations may lack supplier clusters, skilled workers, infrastructure, specialized materials, equipment support, or proven yields. Duplicate networks can also increase complexity and cost.',
    example: 'A device company can add final assembly in Southeast Asia while continuing to depend on components, equipment, and technical support from established regional clusters.',
    vietnam: 'Vietnam benefits from electronics investment and diversification, but sustained competitiveness depends on reliable power, water, logistics, talent, supplier depth, quality, engineering, and technology upgrading.',
    impact: 'Evaluate continuity and strategic access alongside landed cost, ramp risk, qualification time, supplier learning, and long-term capability development.',
    activities: ['China-plus-one strategies', 'Regional supplier development', 'Risk-based sourcing', 'Manufacturing localization', 'Supply-chain visibility'],
    visual: 'electronics-m5-9',
    sources: ['oecdVietnam', 'oecdValueChain'],
  }),
];

const regulatorySustainability = [
  chapter('Regulatory & Sustainability Trends', {
    title: 'Product Durability, Repairability, and Circular Electronics',
    objective: 'Connect durability, spare parts, software support, repair information, refurbishment, and e-waste to product strategy.',
    intro: 'Sustainability requirements increasingly affect engineering, documentation, software, parts, service networks, labels, and end-of-life operations. The EU’s smartphone and tablet rules are a concrete example of lifecycle requirements entering product design.',
    insight: 'Sustainability regulation is moving from broad messaging toward measurable durability, repair, support, and lifecycle obligations.',
    what: 'EU ecodesign and energy-labelling rules apply from 20 June 2025 for covered products. The official summary includes resistance to drops, scratches, dust, and water; batteries retaining at least 80% capacity after 800 cycles; defined spare-parts and repair access; longer OS-update availability; and repairability information.',
    why: 'Longer useful life can reduce premature replacement and e-waste, while design tradeoffs involve thickness, sealing, performance, safety, cost, parts inventory, support duration, and service quality.',
    example: 'A manufacturer may redesign fasteners and components, maintain parts and repair documentation, extend security updates, operate trade-in and refurbishment programs, and publish repairability information.',
    vietnam: 'Vietnamese manufacturers, exporters, repair networks, and recyclers need to understand target-market requirements and can build capability in durable design, testing, parts, refurbishment, collection, and responsible treatment.',
    impact: 'Integrating lifecycle requirements early can reduce redesign and compliance risk while supporting trust, service revenue, resale, refurbishment, and circular material recovery.',
    activities: ['Durability engineering', 'Repairability', 'Software support commitments', 'Refurbishment programs', 'Circularity', 'E-waste management'],
    visual: 'electronics-m5-10',
    sources: ['euEcodesign2025'],
    stats: [
      { value: '20 Jun 2025', label: 'EU rules apply', subtitle: 'Covered smartphones and tablets', description: 'Official European Commission effective date.' },
      { value: '800 / 80%', label: 'Battery durability threshold', subtitle: 'Cycles / retained capacity', description: 'Official EU summary for covered products.' },
      { value: '7 years', label: 'Key spare-parts availability', subtitle: 'After model sales end', description: 'Official EU summary; defined parts and conditions apply.' },
    ],
  }),
  chapter('Regulatory & Sustainability Trends', {
    title: 'Semiconductor Sustainability and Resource Efficiency',
    objective: 'Assess energy, water, gases, chemicals, waste, suppliers, reliability, and location in semiconductor operations.',
    intro: 'Semiconductor manufacturing relies on controlled environments, electricity, ultrapure water, gases, chemicals, precision equipment, and complex waste treatment. Resource performance affects facility feasibility, operating risk, cost, and community impact.',
    insight: 'Environmental performance is becoming an operating and investment factor, especially for resource-intensive fabrication facilities.',
    what: 'Priorities include efficient equipment and cooling, renewable or lower-carbon power where feasible, water treatment and recycling, process-gas monitoring and abatement, chemical management, waste reduction, emergency systems, and supplier environmental assessment.',
    why: 'Requirements vary by process and location. Resource constraints, grid reliability, permits, climate conditions, and community expectations can influence expansion, continuity, and the cost of environmental controls.',
    example: 'A fab can improve water recycling and equipment energy management while ensuring that process stability, purity, safety, and yield remain protected.',
    vietnam: 'Any future Vietnamese fabrication or expanded back-end activity should evaluate electricity reliability, water availability, industrial infrastructure, workforce, treatment systems, emergency capability, and supplier readiness together.',
    impact: 'Sustainability initiatives need technical baselines, operating data, capital plans, and quality safeguards rather than standalone claims disconnected from production performance.',
    activities: ['Energy efficiency', 'Water recycling', 'Process-gas management', 'Renewable electricity procurement', 'Supplier environmental assessment'],
    visual: 'electronics-m5-11',
    sources: ['oecdVietnam', 'oecdValueChain'],
  }),
  chapter('Regulatory & Sustainability Trends', {
    title: 'Trade Controls, Technology Governance, and Cybersecurity',
    objective: 'Integrate international trade, technology access, supplier due diligence, product security, privacy, and update obligations.',
    intro: 'Semiconductors and advanced computing are increasingly affected by export controls, investment screening, end-use restrictions, and technology-transfer rules. Connected devices also create persistent cybersecurity and privacy obligations after sale.',
    insight: 'Regulation and geopolitics now shape technology strategy, supplier choices, product architecture, software support, and market access.',
    what: 'Capabilities include product and technology classification, customer and destination screening, licensing, supplier due diligence, secure development, firmware protection, vulnerability reporting, patching, data minimization, consent, access controls, and jurisdiction monitoring.',
    why: 'A restriction can affect chips, equipment, software, expertise, capital, or customers. A product vulnerability can expose users and enterprises, interrupt operations, damage trust, and create obligations across multiple markets.',
    example: 'A connected-device firm must assess component provenance, applicable trade controls, secure boot and updates, cloud data handling, coordinated vulnerability response, and support duration before launch.',
    vietnam: 'Vietnamese firms joining global technology networks need clear compliance ownership, secure engineering, supplier records, customer screening, data governance, and awareness of changing requirements in destination markets.',
    impact: 'Compliance and security should be designed into products and supply chains, with cross-functional monitoring and escalation rather than treated as a final legal review.',
    activities: ['Export-control compliance', 'Supply-chain due diligence', 'Product cybersecurity', 'Data protection', 'Regulatory monitoring'],
    visual: 'electronics-m5-12',
    sources: ['oecdValueChain'],
  }),
];

const outlookOpportunities = [
  chapter('Growth Outlook & Strategic Opportunities', {
    title: 'Semiconductor Growth Outlook: AI, Memory, and Computing Infrastructure',
    objective: 'Interpret the semiconductor outlook while separating forecast values from confirmed results and testing concentration and capital risk.',
    intro: 'AI infrastructure, high-performance computing, networking, and advanced memory are reshaping near-term semiconductor demand. The opportunity is large, but the industry remains cyclical, capital-intensive, concentrated, and sensitive to technology and inventory shifts.',
    insight: 'AI and memory are major growth drivers, while sustainable returns still depend on customer demand, capacity utilization, execution, diversification, and capital discipline.',
    what: 'WSTS’s Spring 2026 forecast projected worldwide semiconductor sales of US$1.511T in 2026, up 89.9% from its 2025 figure, with memory forecast at US$803.941B, up 249.5%. These are forecast values—not confirmed annual results—and are heavily influenced by memory and AI infrastructure assumptions.',
    why: 'Accelerators, HBM, logic, networking, packaging, power, and cooling benefit from AI investment, while other product categories may grow more moderately. High prices, supply limits, capacity additions, and customer concentration can amplify both upside and downside.',
    example: 'A memory producer may expand HBM capacity, but investment decisions still depend on customer commitments, process and packaging capability, equipment lead times, yields, pricing durability, and alternative demand scenarios.',
    vietnam: 'Vietnam can pursue design, verification, packaging, testing, equipment service, electronics integration, and workforce opportunities tied to growth without assuming it can or should compete in every capital-intensive segment.',
    impact: 'Use forecasts as scenarios and monitor actual shipments, pricing, inventories, capacity, customer concentration, and project returns before committing major capital.',
    activities: ['AI infrastructure investment', 'Memory capacity expansion', 'Advanced packaging development', 'Specialized semiconductor applications', 'Capital-allocation discipline'],
    visual: 'electronics-m5-13',
    sources: ['wstsSpring2026', 'oecdValueChain'],
    stats: [
      { value: 'US$1.511T', label: '2026 worldwide market forecast', subtitle: 'WSTS Spring 2026', description: 'Forecast, not a confirmed full-year result.' },
      { value: '89.9%', label: 'Forecast market growth', subtitle: '2026 vs. 2025', description: 'WSTS Spring 2026 forecast.' },
      { value: 'US$803.941B', label: '2026 memory forecast', subtitle: '249.5% forecast growth', description: 'WSTS Spring 2026 forecast; major driver of the total.' },
    ],
  }),
  chapter('Growth Outlook & Strategic Opportunities', {
    title: 'Consumer Electronics Growth Outlook: Premiumization and Intelligent Devices',
    objective: 'Evaluate product growth through useful innovation, price architecture, lifecycle support, services, and category-specific demand.',
    intro: 'Consumer-electronics growth is likely to remain uneven because replacement cycles, confidence, affordability, enterprise investment, and product innovation differ across devices and regions.',
    insight: 'Growth comes from meaningful upgrades and connected value, but adoption still depends on practical benefit, trusted support, and acceptable total price.',
    what: 'Opportunities include AI-enabled phones and computers, premium imaging and displays, efficient processors, wearables, smart-home products, connected appliances, gaming, accessories, warranties, subscriptions, device management, and refurbished portfolios.',
    why: 'Higher component and development costs can pressure prices and margins, while consumers may delay upgrades if new features do not improve daily use enough to justify replacement.',
    example: 'An intelligent laptop portfolio can combine premium AI models with mid-range productivity devices, long software support, financing, services, and accessories for different willingness-to-pay levels.',
    vietnam: 'Brands in Vietnam can localize price tiers, language, financing, commerce, service, AI use cases, warranty, and channel strategy to household and business needs.',
    impact: 'Evaluate features through adoption, engagement, retention, support cost, margin, replacement acceleration, and customer satisfaction rather than launch attention alone.',
    activities: ['AI-enabled device portfolios', 'Premiumization', 'Emerging connected categories', 'Services and accessories', 'Flexible price architecture'],
    visual: 'electronics-m5-14',
  }),
  chapter('Growth Outlook & Strategic Opportunities', {
    title: 'Strategic Opportunities for Vietnam',
    objective: 'Translate Vietnam’s manufacturing base and policy ambitions into feasible capability, supplier, talent, infrastructure, and value-capture priorities.',
    intro: 'Vietnam has an established electronics production and export base and opportunities in component manufacturing, chip design, verification, packaging, testing, engineering, automation, and technical services. Its current depth remains uneven across the chain.',
    insight: 'Vietnam’s long-term opportunity is to become a more capable ecosystem with stronger local expertise and retained value, not simply a larger assembly location.',
    what: 'Decision 1018/QD-TTg sets a national semiconductor strategy through 2030 with vision to 2050. The first-phase policy targets include at least 100 design companies, one small-scale manufacturing factory, 10 packaging and testing plants, and more than 50,000 semiconductor engineers and graduates. These are strategic targets, not guaranteed outcomes.',
    why: 'Assembly can create employment and exports while imported components, foreign ownership, supplier gaps, skills, infrastructure, and limited domestic IP constrain local value capture. Upgrading requires coordinated implementation over many years.',
    example: 'A capability program can link university training, industry placements, design and test laboratories, supplier qualification, reliable industrial infrastructure, and multinational partnerships around selected applications.',
    vietnam: 'Priority pathways include design and verification, commercially viable packaging and testing, electronic components and tooling, automation, local suppliers, applied research, dependable electricity and water, logistics, and partnerships that transfer usable knowledge.',
    impact: 'Measure progress through qualified engineers, supplier performance, technical milestones, productivity, customer relationships, domestic participation, and retained value—not target counts or investment announcements alone.',
    activities: ['Semiconductor design', 'Packaging and testing', 'Electronics supplier development', 'Talent and research development', 'Infrastructure and investment readiness', 'Technology transfer and local partnerships', 'Value-chain upgrading'],
    visual: 'electronics-m5-15',
    sources: ['vietnamStrategy', 'oecdVietnam', 'oecdValueChain'],
    stats: [
      { value: '100 / 1 / 10', label: '2030 policy targets', subtitle: 'Design firms / small-scale fab / packaging-test plants', description: 'Decision 1018/QD-TTg strategic objectives, not guaranteed outcomes.' },
      { value: '50,000+', label: 'Engineers and graduates target', subtitle: '2024–2030 strategy phase', description: 'Official strategy objective.' },
      { value: '2050', label: 'Long-term vision horizon', subtitle: 'National semiconductor strategy', description: 'Implementation and outcomes remain uncertain.' },
    ],
  }),
];

const seed = (chapterNumber: string, question: string, application: string, correct: string) => ({
  chapter: chapterNumber,
  objective: question,
  question,
  application,
  correct,
  wrong: ['Trend popularity alone', 'One forecast treated as certainty', 'Technology without a customer or operating use case'] as [string, string, string],
  explanation: 'Outlook analysis connects customer value, capability, economics, policy status, dependencies, and uncertainty.',
});

const quiz = (prefix: string, topics: string[], map?: number[]) => electronicsM5Quiz(prefix, topics.flatMap((topic, index) => [
  seed(String(map?.[index] ?? index + 1), `What drives ${topic}?`, `A team evaluates ${topic}. What should it test?`, 'Customer need, enabling capability, adoption conditions, and viable economics'),
  seed(String(map?.[index] ?? index + 1), `Which risk can affect ${topic}?`, `A promising trend in ${topic} underperforms. What should be examined?`, 'Demand, cost, execution, regulation, concentration, and dependency risk'),
  seed(String(map?.[index] ?? index + 1), `How should ${topic} be prioritized?`, `A forecast creates pressure to invest in ${topic}. What is the disciplined response?`, 'Use scenarios, evidence, capability fit, milestones, and decision thresholds'),
]).slice(0, 10));

const bundles: ElectronicsM5LessonBundle[] = [
  {
    deck: consumerTrends,
    quiz: quiz('electronics-m5-l1', ['value-conscious consumption', 'AI device experiences', 'connected ecosystems', 'replacement decisions'], [1, 2, 3, 1]),
    takeaways: {
      learned: 'You can explain how value, AI usefulness, and connected experiences are reshaping customer decisions.',
      keyTakeaways: ['Replacement increasingly depends on meaningful value.', 'Durability and support affect total ownership value.', 'AI needs practical use cases.', 'Ecosystems can create convenience and loyalty.', 'Trust and interoperability constrain adoption.'],
      businessImplications: 'Design portfolios and experiences around real customer outcomes, lifecycle value, privacy, and willingness to pay.',
      remember: 'A feature becomes a trend only when customers repeatedly value and use it.',
      nextLesson: 'Technology & Innovation Trends',
    },
  },
  {
    deck: technologyTrends,
    quiz: quiz('electronics-m5-l2', ['AI computing', 'advanced packaging', 'energy efficiency', 'specialized computing'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can connect AI, memory, packaging, efficiency, connectivity, and workload-specific architectures.',
      keyTakeaways: ['AI demand extends beyond processors.', 'Memory and data movement can be bottlenecks.', 'Packaging is becoming architectural.', 'Power and thermal constraints shape design.', 'Application fit matters alongside performance.'],
      businessImplications: 'Evaluate complete systems, manufacturing dependencies, software, reliability, and customer economics before selecting a technology path.',
      remember: 'System integration increasingly determines semiconductor value.',
      nextLesson: 'Market & Channel Trends',
    },
  },
  {
    deck: marketChannelTrends,
    quiz: quiz('electronics-m5-l3', ['uneven category growth', 'omnichannel distribution', 'regional manufacturing', 'supply-chain diversification'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can assess uneven demand, integrated channels, and realistic diversification strategies.',
      keyTakeaways: ['Aggregate growth hides segment differences.', 'Replacement and inventory cycles interact.', 'Channels form one customer journey.', 'Diversification requires qualified capability.', 'Vietnam’s competitiveness extends beyond labor cost.'],
      businessImplications: 'Use granular forecasting, coordinated channel economics, supplier visibility, and capability-based network design.',
      remember: 'Relocation without skills, suppliers, and qualification does not create resilience.',
      nextLesson: 'Regulatory & Sustainability Trends',
    },
  },
  {
    deck: regulatorySustainability,
    quiz: quiz('electronics-m5-l4', ['repairability and circularity', 'semiconductor resources', 'technology governance', 'cybersecurity'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can explain how lifecycle rules, resource use, trade controls, privacy, and security affect product and investment choices.',
      keyTakeaways: ['Lifecycle requirements increasingly affect design.', 'Repair and support need operating capability.', 'Fabs depend on energy, water, and environmental systems.', 'Trade rules shape technology access.', 'Connected products require ongoing security.'],
      businessImplications: 'Integrate lifecycle, environmental, compliance, and security requirements before architecture and supply choices become difficult to change.',
      remember: 'Compliance is part of product and operating design.',
      nextLesson: 'Growth Outlook & Strategic Opportunities',
    },
  },
  {
    deck: outlookOpportunities,
    quiz: quiz('electronics-m5-l5', ['semiconductor forecasts', 'intelligent-device growth', 'Vietnam strategy', 'investment discipline'], [1, 2, 3, 1]),
    takeaways: {
      learned: 'You can interpret growth forecasts, consumer opportunities, and Vietnam’s policy ambitions without treating them as guarantees.',
      keyTakeaways: ['AI and memory drive the near-term outlook.', 'Forecasts are scenarios, not results.', 'Device growth requires clear customer value.', 'Vietnam has credible selective opportunities.', 'Capability and value capture matter more than announcement scale.'],
      businessImplications: 'Use milestones, evidence, downside scenarios, customer commitments, and capability measures when allocating capital or policy support.',
      remember: 'Outlook informs decisions; implementation determines outcomes.',
      nextLesson: '',
    },
  },
];

const keys = [
  'Consumer Trends',
  'Technology & Innovation Trends',
  'Market & Channel Trends',
  'Regulatory & Sustainability Trends',
  'Growth Outlook & Strategic Opportunities',
];

export const ELECTRONICS_MODULE05_DECKS: Record<string, ElectronicsM5CardData[]> = {};
export const ELECTRONICS_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ELECTRONICS_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};

bundles.forEach((bundle, index) => {
  const key = keys[index];
  ELECTRONICS_MODULE05_DECKS[key] = bundle.deck;
  ELECTRONICS_MODULE05_QUIZZES[key] = bundle.quiz;
  ELECTRONICS_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
