import type { VisualSpec } from './fashionVisualKit';

export interface TelecomChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Telecommunications & Connectivity Module 05, keyed by visualKind. */
export const TELECOM_M5_VISUALS: Record<string, TelecomChapterVisual> = {
  'telecom-m5-1': {
    heading: 'Advertised peak speed versus the quality customers actually experience',
    intro: 'Purchasing increasingly reflects real coverage, stability, indoor experience, latency and problem resolution, not headline speed. Work, learning, streaming, payments and AI make quality problems more visible.',
    spec: {
      layout: 'compare', title: 'Rising Expectations for Speed, Reliability, and Seamless Connectivity', kicker: '',
      leftTitle: 'Advertised peak speed', rightTitle: 'Experienced quality',
      rows: [
        { label: 'What is judged', a: 'Headline access speed', b: 'Coverage, stability, latency, congestion, availability' },
        { label: 'Where it counts', a: 'One headline figure', b: 'Indoors, across locations and applications' },
        { label: 'At home', a: 'A higher access speed', b: 'Whole-home Wi-Fi and stability for concurrent use' },
        { label: 'When things fail', a: 'Not reflected in a speed figure', b: 'Outage communication and problem resolution' },
        { label: 'What to measure', a: 'Technology labels', b: 'Experience distribution, complaints and recovery' },
      ],
      note: 'A household running video, gaming, calls and cloud backup at once may value stability more than a higher headline speed.',
      takeaway: 'Customers judge connectivity as an everyday utility and expect consistent quality across locations and applications.',
    },
  },
  'telecom-m5-2': {
    heading: 'A personalized plan change that keeps the customer’s trust',
    intro: 'Customers want flexible plans, digital activation, usage controls and relevant recommendations. Basic offers look similar and buyers stay price-sensitive, so personalization must rest on transparent data use.',
    spec: {
      layout: 'flow', title: 'Personalized Services, Digital Convenience, and Value Sensitivity', kicker: '',
      steps: [
        { label: 'Observe usage', detail: 'With transparent, appropriate data use', owner: 'Operator app' },
        { label: 'Recommend a plan', detail: 'Matched to observed usage', owner: 'Operator app' },
        { label: 'Explain the trade-off', detail: 'Clear price and allowance terms', owner: 'Operator app' },
        { label: 'Change or cancel freely', detail: 'No hidden conditions', kind: 'decision', owner: 'Customer' },
        { label: 'Trusted, retained customer', detail: 'Value without blanket discounting', kind: 'outcome' },
      ],
      loop: 'Affordable tiers, household bundles, eSIM, transparent billing and accessible human support keep the cycle credible.',
      note: 'Optimize convenience, trust, retention, cost to serve and customer value rather than promotional response alone.',
      takeaway: 'The opportunity is simple, relevant, trusted service—not complexity or discounting without value.',
    },
  },
  'telecom-m5-3': {
    heading: 'From today’s 5G build-out to longer-term 6G research',
    intro: 'Operators are expanding 5G, standalone cores, enterprise use cases and automation now, while 6G remains research and standards preparation. Each step needs devices, spectrum, backhaul, skills and willingness to pay.',
    spec: {
      layout: 'timeline', title: '5G Commercialization, Network Automation, and the Path Toward 6G', kicker: '',
      events: [
        { period: 'Now', label: '5G standalone networks', detail: 'Expanding coverage and standalone cores', status: 'current' },
        { period: 'Now', label: 'Enterprise 5G', detail: 'Private and enterprise use cases', status: 'current' },
        { period: 'Now', label: 'AI-driven network operations', detail: 'Automation and predictive operations', status: 'current' },
        { period: 'Where supported', label: 'Network slicing', detail: 'Logical segments for defined service characteristics', status: 'current' },
        { period: 'Longer term', label: '6G research', detail: 'Research and standards participation, not commercial service', status: 'forecast' },
      ],
      note: 'A private industrial network may justify a dedicated slice, while a consumer market may value reliable capacity more. Vietnam is commercializing 5G and preparing for 6G research.',
      takeaway: 'Network evolution creates value when programmability and intelligence solve practical problems or improve economics.',
    },
  },
  'telecom-m5-4': {
    heading: 'What each programmable-network capability adds, and the condition for value',
    intro: 'AI supports forecasting and fault operations, cloud-native functions add flexibility, edge puts compute near use, and standardized APIs expose authorized network capabilities. Monetization depends on adoption, interoperability and security.',
    spec: {
      layout: 'table', title: 'AI, Cloud, Edge Computing, and Programmable Networks', kicker: '',
      headers: ['Capability', 'What it adds', 'Condition for value'],
      rows: [
        { label: 'AI for network operations', a: 'Forecasting and fault operations', b: 'Governance and enough demand' },
        { label: 'Cloud-native architecture', a: 'Flexible network functions', b: 'Interoperability and security' },
        { label: 'Edge computing', a: 'Compute placed near use', b: 'Edge and cloud partnerships' },
        { label: 'Number Verification API', a: 'Silent network-based checks', b: 'Consent and a fraud-prevention use case' },
        { label: 'Quality on Demand API', a: 'Stable latency or throughput sessions', b: 'Applications that adopt it' },
      ],
      note: 'Both APIs are documented by GSMA Open Gateway under the common CAMARA framework; implementation and commercial availability vary by provider.',
      takeaway: 'Programmable networks can create new value, but monetization depends on adoption, interoperability, security, and clear benefits.',
    },
  },
  'telecom-m5-5': {
    heading: 'Connectivity models that extend beyond the terrestrial network and the physical SIM',
    intro: 'Satellite extends remote and mobility coverage, eSIM supports digital provisioning, IoT needs scalable device management, and multi-network offers combine cellular, Wi-Fi and satellite. Device, spectrum, regulation and economics constrain each one.',
    spec: {
      layout: 'taxonomy', title: 'Satellite Connectivity, eSIM, and the Expansion of Connected Devices', kicker: '',
      root: 'Connectivity beyond terrestrial and physical SIM', rootDetail: 'Complementary models, combined case by case',
      groups: [
        { label: 'Satellite broadband', detail: 'Remote areas, islands, transport and resilience' },
        { label: 'Direct-to-device', detail: 'Selected service outside terrestrial footprints' },
        { label: 'eSIM', detail: 'Remote digital provisioning for onboarding and travel' },
        { label: 'IoT connectivity', detail: 'Scalable management of connected devices' },
        { label: 'Multi-network models', items: ['Cellular', 'Wi-Fi', 'Satellite'] },
      ],
      note: 'TCA member data says worldwide consumer eSIM profile downloads in H1 2026 nearly equaled full-year 2025 downloads. That counts profile downloads, not unique users or market share.',
      takeaway: 'Future connectivity will combine terrestrial, non-terrestrial, and software-managed subscription models.',
    },
  },
  'telecom-m5-6': {
    heading: 'Retained value per relationship, broken into its growth drivers',
    intro: 'Mature markets emphasize retention, performance tiers, convergence, enterprise services and asset utilization rather than gross additions. Diversification into cloud, security and IoT can carry lower margins and complex delivery.',
    spec: {
      layout: 'driverTree', title: 'From Subscriber Growth to Value Creation and Service Differentiation', kicker: '',
      root: { label: 'Retained value per relationship', detail: 'Replaces subscriber volume as the growth goal' },
      drivers: [
        { label: 'Customer lifetime value', detail: 'Retention and service adoption' },
        { label: 'Premium connectivity', detail: 'Performance tiers' },
        { label: 'Converged services', detail: 'Fixed-mobile convergence' },
        { label: 'Enterprise diversification', detail: 'Managed services, cloud, security, IoT', children: [{ label: 'Lower margins' }, { label: 'Hyperscaler competition' }] },
        { label: 'Core-business optimization', detail: 'Automation, sharing and utilization' },
      ],
      note: 'Deloitte’s 2026 outlook says beyond-connectivity B2B potential is large, but only part is addressable by telcos and execution and margins can be challenging.',
      takeaway: 'Growth is shifting from maximizing connections toward increasing retained value and profitability per relationship.',
    },
  },
  'telecom-m5-7': {
    heading: 'An eSIM-first journey that hands over to people without repetition',
    intro: 'Websites, apps, marketplaces, eSIM, digital identity, payments, call centers and stores form one customer journey. Digital steps cut friction and cost, while stores still help with devices, verification and complex problems.',
    spec: {
      layout: 'flow', title: 'Digital Distribution, eSIM, and Omnichannel Customer Journeys', kicker: '',
      steps: [
        { label: 'Compare a plan online', owner: 'Website or marketplace' },
        { label: 'Verify identity', detail: 'Digital identity check', owner: 'Digital identity' },
        { label: 'Download the eSIM', detail: 'eSIM-first onboarding', owner: 'App' },
        { label: 'Activate and pay', detail: 'Digital payments', owner: 'App' },
        { label: 'Later support', detail: 'No need to repeat information', kind: 'outcome', owner: 'Store or call center' },
      ],
      loop: 'Track completion, fallout, fraud, support, channel cost, satisfaction, churn and retained value.',
      note: 'Vietnamese operators can grow direct digital sales and eSIM journeys while keeping dealers and retail support where customers need them.',
      takeaway: 'Digital channels improve convenience and efficiency when they connect cleanly with support and physical channels.',
    },
  },
  'telecom-m5-8': {
    heading: 'Partners that combine into one enterprise solution, such as a factory network',
    intro: 'Enterprise and wholesale growth comes from private networks, managed WAN, cloud links, security, IoT and wholesale capacity. Partnerships broaden capability but create dependency and shared economics.',
    spec: {
      layout: 'ecosystem', title: 'Enterprise Connectivity, Wholesale Infrastructure, and Ecosystem Partnerships', kicker: '',
      center: { label: 'Enterprise business problem', detail: 'e.g. a factory solution' },
      actors: [
        { label: 'Operator', relation: 'Private 5G and SLA-backed operations', flows: ['service'] },
        { label: 'Edge and device partners', relation: 'Edge systems and device management', flows: ['product'] },
        { label: 'Cloud partners', relation: 'Cloud and data-center links', flows: ['service', 'information'] },
        { label: 'Security partners', relation: 'Cybersecurity', flows: ['service', 'risk'] },
        { label: 'Wholesale infrastructure', relation: 'Tower, fiber access and wholesale capacity', flows: ['product', 'money'] },
        { label: 'Enterprise customer', relation: 'Pays for outcomes and accountability', flows: ['money'] },
      ],
      note: 'Manufacturing, logistics, finance, retail and government create opportunities. Success needs consultative sales, solution architecture, delivery governance, partner management and contract economics.',
      takeaway: 'Enterprise and wholesale growth depends on solving business problems, not repackaging consumer access.',
    },
  },
  'telecom-m5-9': {
    heading: 'Who sets each rule area and what the operator must build in',
    intro: 'Governments set spectrum, licensing, interconnection, competition, quality and customer rules, while operators manage cybersecurity, continuity, data and suppliers. Failures or misuse can cause widespread harm.',
    spec: {
      layout: 'table', title: 'Spectrum Policy, Competition, Data Governance, and Network Security', kicker: '',
      headers: ['Area', 'Set or owned by', 'Operator response'],
      rows: [
        { label: 'Spectrum management', a: 'Government and national regulators', b: 'Build spectrum terms into architecture' },
        { label: 'Competition and consumer protection', a: 'Government rules', b: 'Interconnection, quality and customer obligations' },
        { label: 'Cybersecurity and resilience', a: 'Operator, under rules', b: 'Continuity, incident response, secure lifecycle' },
        { label: 'Data governance', a: 'Operator, under law', b: 'Lawful handling, privacy controls, secure authorization' },
        { label: 'Technology standards', a: 'Standards bodies such as ITU', b: 'Standards-based interoperability' },
      ],
      note: 'A programmable network API needs lawful data handling, secure authorization, privacy controls, monitoring and clear accountability.',
      takeaway: 'Regulation increasingly determines how connectivity is authorized, secured, operated, and made accessible.',
    },
  },
  'telecom-m5-10': {
    heading: 'Meaningful use needs more than coverage: the five drivers of inclusion',
    intro: 'Inclusion approaches combine mobile, fiber, fixed wireless, satellite and public-support models with affordability, devices, training and backup power. Terrain, income, electricity and skills leave gaps even when headline coverage rises.',
    spec: {
      layout: 'driverTree', title: 'Digital Inclusion, Universal Connectivity, and Infrastructure Resilience', kicker: '',
      root: { label: 'Meaningful use and service continuity', detail: 'Not coverage alone' },
      drivers: [
        { label: 'Rural connectivity', detail: 'Technology-neutral choice by geography and demand', children: [{ label: 'Mobile' }, { label: 'Fiber' }, { label: 'Fixed wireless' }, { label: 'Satellite' }] },
        { label: 'Affordability', detail: 'Service price and devices' },
        { label: 'Digital literacy', detail: 'Skills and training' },
        { label: 'Infrastructure resilience', detail: 'Backup power, route diversity, disaster readiness' },
        { label: 'Useful services', detail: 'Reliability, support and relevant applications' },
      ],
      note: 'A remote area may use terrestrial wireless or satellite, but adoption still depends on devices, price, reliability and support. Vietnam can choose technologies by geography, demand, resilience and whole-life cost.',
      takeaway: 'Inclusion requires network availability plus affordable service, devices, skills, quality, safety, and useful applications.',
    },
  },
  'telecom-m5-11': {
    heading: 'Saving site energy without harming coverage or quality',
    intro: 'Traffic and capacity growth raise energy needs, and poorly governed energy saving can harm coverage or quality. Sites can adjust equipment states with traffic while keeping service safeguards.',
    spec: {
      layout: 'decision', title: 'Energy Efficiency, Carbon Reduction, and Sustainable Network Operations', kicker: '',
      root: { label: 'Site with changing traffic', detail: 'Traffic-aware energy controls' },
      question: 'Can the equipment state change without breaching service safeguards?',
      branches: [
        { condition: 'Low traffic, safeguards hold', outcome: 'Lower the equipment state', detail: 'Cut energy and cost', tone: 'positive' },
        { condition: 'Traffic rising', outcome: 'Restore capacity', detail: 'Protect availability and quality', tone: 'caution' },
        { condition: 'Coverage or quality would suffer', outcome: 'Keep equipment running', detail: 'Energy saving must not harm service', tone: 'negative' },
      ],
      note: 'Other levers: modernize equipment, optimize cooling, procure suitable renewable power, share passive infrastructure, extend equipment life and improve end-of-life management.',
      takeaway: 'Sustainable network development increasingly aligns with energy cost, asset efficiency, and resilience.',
    },
  },
  'telecom-m5-12': {
    heading: 'Mobile’s economic contribution is not the same as operator revenue',
    intro: 'GSMA estimates mobile contributed US$7.6T, or 6.4% of global GDP, in 2025 and projects US$11.3T by 2030. These figures include productivity and ecosystem effects beyond operator revenue.',
    spec: {
      layout: 'compare', title: 'Global Market Outlook and Long-Term Growth Drivers', kicker: '',
      leftTitle: 'Economic contribution (GSMA estimate)', rightTitle: 'Capturable operator revenue',
      rows: [
        { label: 'What it measures', a: 'Mobile’s economy-wide impact', b: 'Operator sales and profit' },
        { label: 'Figures', a: 'US$7.6T (6.4% of GDP) in 2025; US$11.3T projected by 2030', b: 'Not quantified in this chapter' },
        { label: 'Example', a: 'An enterprise productivity gain enabled by mobile', b: 'Does not automatically become operator sales' },
        { label: 'Growth drivers', a: '5G, IoT, AI, enterprise digitalization', b: 'Vary in maturity, capital intensity, competition and margin' },
        { label: 'How to use it', a: 'Context for digital dependence', b: 'Test addressable demand, delivery capability, margin, capital' },
      ],
      note: 'The 2030 figure is a GSMA projection, not a confirmed result. Do not compare economic contribution directly with telecom revenue.',
      takeaway: 'Digital dependence expands mobile’s economic role, but operators must distinguish economy-wide impact from capturable revenue and profit.',
    },
  },
  'telecom-m5-13': {
    heading: 'Vietnam’s reported capability, and the priorities that build on it',
    intro: 'The Ministry reports August 2026 fixed broadband speed of 301.48 Mbps, mobile broadband speed of 219.93 Mbps and 27.2M 5G subscriptions. Those indicators do not guarantee uniform experience, productive use or profitability.',
    spec: {
      layout: 'pathway', title: 'Vietnam Telecommunications Growth Outlook', kicker: '',
      trunk: [
        { label: 'Reported speeds, August 2026', detail: 'Fixed 301.48 Mbps, mobile 219.93 Mbps; national indicators' },
        { label: '27.2M 5G subscriptions', detail: 'Subscriptions, not unique individuals' },
      ],
      optionsLabel: 'Priorities pursued in parallel on that platform',
      options: [
        { label: '5G adoption', detail: 'Consumer and enterprise use' },
        { label: 'Fiber quality', detail: 'Fixed broadband development' },
        { label: 'Enterprise solutions', detail: 'Factories, logistics, cloud, AI data flows' },
        { label: 'Data-center and international links', detail: 'Digital infrastructure investment' },
        { label: 'Inclusion and resilience', detail: 'Coverage and continuity' },
        { label: 'Selective 6G preparation', detail: 'Long-term technology preparation' },
      ],
      note: 'Track quality distribution, adoption, utilization, enterprise revenue, cost and return alongside national indicators.',
      takeaway: 'Vietnam’s opportunity is shifting from access expansion toward quality, adoption, enterprise applications, and infrastructure monetization.',
    },
  },
  'telecom-m5-14': {
    heading: 'Which adjacencies to pursue once the core is strong',
    intro: 'Operators can improve quality, utilization and cost, then selectively develop enterprise 5G, APIs, cloud access, security and IoT. These services need specialist skills and face hyperscaler competition and lower margins.',
    spec: {
      layout: 'decision', title: 'Strategic Opportunities and Priorities for Telecommunications Operators', kicker: '',
      root: { label: 'Candidate adjacency', detail: 'Enterprise 5G, network APIs, cloud, security, IoT, digital channels' },
      question: 'Is demand validated, with credible advantage and a path to profitability?',
      branches: [
        { condition: 'Validated demand, delivery ready', outcome: 'Commercialize selectively', detail: 'e.g. a fraud-prevention API or private-network solution', tone: 'positive' },
        { condition: 'Specialist skills missing', outcome: 'Build capability or partner first', detail: 'Manage partner dependence', tone: 'caution' },
        { condition: 'No validated demand', outcome: 'Stay focused on the core', detail: 'Do not enter every technology category', tone: 'negative' },
      ],
      note: 'Gate each move on customer demand, differentiation, delivery readiness, adoption, margin, retention, capital and return.',
      takeaway: 'Selective expansion works best: strengthen core connectivity, then pursue adjacencies with credible advantage and a path to profitability.',
    },
  },
};
