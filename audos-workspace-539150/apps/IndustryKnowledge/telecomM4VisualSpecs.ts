import type { VisualSpec } from './fashionVisualKit';

export interface TelecomChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Telecommunications & Connectivity Module 04, keyed by visualKind. */
export const TELECOM_M4_VISUALS: Record<string, TelecomChapterVisual> = {
  'telecom-m4-1': {
    heading: 'Five kinds of competition, each tied to a different market segment',
    intro: 'High spectrum, site, fiber and compliance costs favor established operators, so mobile markets often hold a few nationwide networks. Broadband, enterprise, wholesale, infrastructure and digital services each have different competitors.',
    spec: {
      layout: 'taxonomy', title: 'Competitive Structure and Market Concentration', kicker: '',
      root: 'How telecom markets compete', rootDetail: 'Define the segment before reading concentration or rivalry',
      groups: [
        { label: 'Oligopoly', detail: 'A few nationwide mobile networks' },
        { label: 'Infrastructure-based competition', detail: 'High network costs favor established operators' },
        { label: 'Price and bundle competition', detail: 'Mature connectivity commoditizes, e.g. family bundles' },
        { label: 'Adjacent-market competition', detail: 'Cloud or satellite providers in selected needs' },
        { label: 'Regulated competition', detail: 'Licensing and spectrum frameworks shape entry' },
      ],
      note: 'In Vietnam, large operators lead the facilities-based market, while other providers compete through fixed, MVNO, infrastructure, enterprise and digital models.',
      takeaway: 'Scale and infrastructure remain important, but advantage depends on converting investment into customer value, retention, efficiency, and returns.',
    },
  },
  'telecom-m4-2': {
    heading: 'Five forces that combine to squeeze operator margins',
    intro: 'Customers compare and negotiate, specialized vendors hold leverage, MVNOs lower entry barriers, and Wi-Fi, FWA, satellite and OTT apps can substitute for services. High fixed costs make every one of these pressures harder to absorb.',
    spec: {
      layout: 'driverTree', title: 'Competitive Forces and Sources of Market Pressure', kicker: '',
      root: { label: 'Pressure on operator margins', detail: 'Strongest when the forces act together' },
      drivers: [
        { label: 'Customer bargaining power', detail: 'Consumers compare price and coverage; enterprises negotiate performance and security' },
        { label: 'Supplier bargaining power', detail: 'Dependence on specialized, concentrated vendors' },
        { label: 'Threat of new entrants', detail: 'An MVNO can enter a niche without building RAN' },
        { label: 'Threat of substitutes', detail: 'Can complement or substitute services', children: [{ label: 'Wi-Fi' }, { label: 'FWA' }, { label: 'Satellite' }, { label: 'OTT apps' }] },
        { label: 'Competitive rivalry', detail: 'Price and quality competition with high fixed costs' },
      ],
      note: 'An OTT calling app substitutes voice revenue but increases data demand, so a substitute can also add traffic.',
      takeaway: 'Commoditized connectivity, high fixed costs, demanding customers, and adjacent technologies create the strongest combined pressure.',
    },
  },
  'telecom-m4-3': {
    heading: 'Who the operators are, and what Vietnam’s dominant-position listing does and does not mean',
    intro: 'Global groups follow differing geographic and portfolio strategies, and Vietnam’s major operators are Viettel, VNPT/VinaPhone and MobiFone. Circular 05/2025/TT-BKHCN lists dominant-position enterprises for scoped services only.',
    spec: {
      layout: 'taxonomy', title: 'Telecommunications Operators and Connectivity Providers', kicker: '',
      root: 'Operators and connectivity providers', rootDetail: 'Groups, not a ranking',
      groups: [
        { label: 'Global integrated operators', detail: 'Differing geographic and portfolio strategies', items: ['China Mobile', 'Deutsche Telekom', 'Vodafone', 'Orange', 'Telefónica', 'Verizon', 'AT&T'] },
        { label: 'Vietnam’s major operators', items: ['Viettel', 'VNPT/VinaPhone', 'MobiFone'] },
        { label: 'Alternative connectivity providers', detail: 'Target a narrow segment or coverage gap' },
      ],
      note: 'Circular 05/2025/TT-BKHCN (effective 20 July 2025) lists Viettel and VNPT for fixed terrestrial Internet access, and Viettel, VNPT and MobiFone for specified terrestrial mobile services. These are scoped regulatory categories, not a quality or profitability ranking.',
      takeaway: 'Leading operators compete through different combinations of scale, coverage, customers, utilization, convergence, and higher-value services.',
    },
  },
  'telecom-m4-4': {
    heading: 'The suppliers around an operator network and what each one provides',
    intro: 'Tower and fiber firms lease assets, cable consortia carry international traffic, data centers provide interconnection, and vendors supply RAN, core, optical and software. Operators depend on their roadmaps, support and security, not on purchase price alone.',
    spec: {
      layout: 'ecosystem', title: 'Infrastructure Providers and Network Equipment Vendors', kicker: '',
      center: { label: 'Operator network', detail: 'Capability, cost, security and flexibility set by suppliers' },
      actors: [
        { label: 'Tower infrastructure', relation: 'Leases sites', flows: ['product', 'money'] },
        { label: 'Fiber and transmission', relation: 'Leases routes; cable consortia carry international traffic', flows: ['product', 'money'] },
        { label: 'Data center infrastructure', relation: 'Provides facilities and interconnection', flows: ['service'] },
        { label: 'Network equipment vendors', relation: 'Supply RAN, core, routing and optical', flows: ['product', 'risk'] },
        { label: 'Software and automation', relation: 'Supply network software and automation', flows: ['information', 'service'] },
      ],
      note: 'Dell’Oro’s commercial 2025 worldwide RAN revenue ranking lists Huawei, Ericsson, Nokia, ZTE and Samsung as the top five. It covers RAN-vendor revenue only and is not a telecom-company ranking.',
      takeaway: 'Infrastructure and equipment suppliers shape network capability, deployment cost, security, reliability, and long-term flexibility.',
    },
  },
  'telecom-m4-5': {
    heading: 'Where non-telecom competitors overlap with operator spending',
    intro: 'Cloud, security, managed IT, satellite, IoT, private-network and platform firms overlap with parts of enterprise and communication spending. The same firms can be rivals or partners.',
    spec: {
      layout: 'table', title: 'Digital, Enterprise, and Emerging Connectivity Competitors', kicker: '',
      headers: ['Competitor', 'Where it overlaps telecom', 'Effect on operators'],
      rows: [
        { label: 'Cloud providers', a: 'Private connectivity and security through partners', b: 'Compete for enterprise spending or partner' },
        { label: 'Satellite operators', a: 'Remote or mobile locations', b: 'Reach sites terrestrial networks cannot serve economically' },
        { label: 'Managed service providers', a: 'Managed IT, observability and integration', b: 'Compete for operational outcomes' },
        { label: 'IoT and private-network providers', a: 'IoT and private networks', b: 'Overlap with enterprise connectivity' },
        { label: 'Digital communication platforms', a: 'OTT voice and messaging', b: 'Reduce voice and messaging but raise data usage' },
      ],
      note: 'Vietnamese operators can build, acquire or partner for digital capabilities while keeping customer trust and clear service accountability.',
      takeaway: 'Competition is shifting from access alone toward integrated digital outcomes, creating both rivalry and partnership opportunities.',
    },
  },
  'telecom-m4-6': {
    heading: 'Five measurement families that together describe competitive strength',
    intro: 'A benchmark compares market position, network, financial, customer and innovation measures. Geography, spectrum, business model, methodology and period can make similar-looking indicators incomparable.',
    spec: {
      layout: 'driverTree', title: 'Benchmarking Framework and Competitive Dimensions', kicker: '',
      root: { label: 'Competitive strength', detail: 'No single metric explains it' },
      drivers: [
        { label: 'Market position', children: [{ label: 'Subscribers' }, { label: 'Share' }] },
        { label: 'Network performance', children: [{ label: 'Coverage' }, { label: 'Speed' }, { label: 'Latency' }, { label: 'Availability' }, { label: 'Congestion' }] },
        { label: 'Financial performance', children: [{ label: 'Revenue' }, { label: 'ARPU' }, { label: 'EBITDA margin' }, { label: 'Capital intensity' }, { label: 'Returns' }] },
        { label: 'Customer performance', children: [{ label: 'Churn' }, { label: 'Satisfaction' }, { label: 'Complaints' }, { label: 'Lifetime value' }] },
        { label: 'Innovation capability', children: [{ label: '5G' }, { label: 'Private networks' }, { label: 'Automation' }, { label: 'IoT, cloud, security' }] },
      ],
      note: 'A tower company should not be judged by retail ARPU, and one speed-test result should not be generalized. Document peer group, definition, denominator, period and source first.',
      takeaway: 'Useful benchmarks combine market, network, financial, customer, and innovation measures; no single metric explains strength.',
    },
  },
  'telecom-m4-7': {
    heading: 'Global reference models versus a like-for-like Vietnam comparison',
    intro: 'Global operators differ in convergence, enterprise focus, wholesale assets and digital services. A Vietnam comparison centers on the major operators, measured consistently, with other competitors assessed in their own segments.',
    spec: {
      layout: 'compare', title: 'Global and Vietnam Competitor Benchmarking', kicker: '',
      leftTitle: 'Global benchmarking', rightTitle: 'Vietnam benchmarking',
      rows: [
        { label: 'Purpose', a: 'Strategic reference models', b: 'Capabilities needed in Vietnam’s market' },
        { label: 'Who is compared', a: 'Global operators with different strategies', b: 'Viettel, VNPT/VinaPhone, MobiFone plus smaller providers' },
        { label: 'Main differences', a: 'Convergence, enterprise focus, wholesale assets, digital', b: 'Coverage, fixed broadband, regions, enterprise, digital journeys' },
        { label: 'Shaped by', a: 'Regulation, maturity, income, spectrum', b: 'Geography, asset ownership and competition' },
        { label: 'How to compare', a: 'As strategic patterns, not direct scores', b: 'Consistent mobile and enterprise measures' },
      ],
      note: 'One operator may lead national coverage while another performs strongly in fixed broadband, selected regions or enterprise. Fixed and infrastructure competitors are assessed in their own segments.',
      takeaway: 'Global models provide strategic reference, while domestic comparison reveals capabilities needed in Vietnam’s specific market.',
    },
  },
  'telecom-m4-8': {
    heading: 'Choose one positioning route after defining the customer and the proof of difference',
    intro: 'Providers can compete on low cost, premium network, customer journeys, enterprise specialization or partner ecosystems. Trying to lead on every dimension spreads investment and creates contradictory choices.',
    spec: {
      layout: 'pathway', title: 'Competitive Positioning and Strategic Differentiation', kicker: '',
      trunk: [
        { label: 'Define the target customer', detail: 'Segment-specific, not everyone' },
        { label: 'Set the proof of difference', detail: 'What the customer can verify' },
      ],
      optionsLabel: 'Alternative positions; pick the one that fits the target customer',
      options: [
        { label: 'Cost leadership', detail: 'Simplified products, efficient channels, sharing, automation' },
        { label: 'Network leadership', detail: 'Premium performance with consistent quality and recovery' },
        { label: 'Customer-centric differentiation', detail: 'Superior digital and support journeys' },
        { label: 'Enterprise specialization', detail: 'Specialized enterprise solutions' },
        { label: 'Ecosystem positioning', detail: 'Integrated partner ecosystems' },
      ],
      afterLabel: 'Then check',
      after: [
        { label: 'Capability, trade-offs, guardrails', detail: 'Required capability and economic limits', kind: 'outcome' },
      ],
      note: 'Vietnamese providers can choose segment-specific positions in coverage, affordability, enterprise solutions, customer experience or ecosystem integration.',
      takeaway: 'Differentiation is sustainable only when brand promise, capability, service design, and cost structure align.',
    },
  },
  'telecom-m4-9': {
    heading: 'How a network rollout turns into retention, productivity or revenue',
    intro: 'New technology needs spectrum, sites, backhaul, devices, people, power and enough demand. It creates value only when capacity, adoption and service quality translate into business results.',
    spec: {
      layout: 'flow', title: 'Network Quality, Technology, and Operational Excellence', kicker: '',
      steps: [
        { label: 'Secure the inputs', detail: 'Spectrum, sites, backhaul, power, people' },
        { label: 'Modernize the network', detail: '4G/5G, fiber and core' },
        { label: 'Operate reliably', detail: 'Congestion control, automation, redundancy, recovery, security' },
        { label: 'Drive adoption and use', detail: 'Devices, quality and enterprise use' },
        { label: 'Business results', detail: 'Retention, productivity or revenue', kind: 'outcome' },
      ],
      loop: 'Sharing, energy management and maintenance keep the cost of each step sustainable.',
      note: 'Vietnam’s rapid deployment still requires indoor coverage, resilient routes, 4G continuity, fiber, automation and commercial use cases.',
      takeaway: 'Network leadership means reliable performance at sustainable cost—not simply deploying the newest technology.',
    },
  },
  'telecom-m4-10': {
    heading: 'Commercial execution as one chain from offer to retention',
    intro: 'Commercial execution links offer design, distribution, onboarding, billing, self-service, support and retention. When basic connectivity is similar, transparent pricing, reliable experience and trust can set providers apart.',
    spec: {
      layout: 'flow', title: 'Customer Value, Brand, and Commercial Execution', kicker: '',
      steps: [
        { label: 'Design segment offers', detail: 'Households, students, SMEs, enterprises, institutions' },
        { label: 'Distribute and onboard', detail: 'Clear, convenient sign-up' },
        { label: 'Bill and self-serve', detail: 'Transparent billing and digital care' },
        { label: 'Support and recover', detail: 'Resolve problems at the root' },
        { label: 'Retain and cross-sell', detail: 'Relevant bundles that build trust', kind: 'outcome' },
      ],
      loop: 'Spot churn risk from complaints and network data, fix the cause, communicate clearly and offer an appropriate package.',
      note: 'Measure retained margin, resolution, churn causes, digital completion and customer lifetime value, not gross additions.',
      takeaway: 'Acquisition is only the start; profitability depends on retention, service value, and cost to serve.',
    },
  },
  'telecom-m4-11': {
    heading: 'An investment gate for networks, partnerships and new offers',
    intro: 'Operators commit capital to spectrum and networks, share suitable assets and partner with cloud and technology firms. Returns can take years, and partnerships bring integration, data and bargaining risks.',
    spec: {
      layout: 'decision', title: 'Financial Discipline, Partnerships, and Innovation', kicker: '',
      root: { label: 'Proposed investment or partnership', detail: 'Network capital, private networks, managed services, cloud' },
      question: 'Is there demand evidence, with milestones, utilization and payback that can be tracked?',
      branches: [
        { condition: 'Proven demand and in-house capability', outcome: 'Invest against milestones', detail: 'Govern by utilization, payback and margin', tone: 'positive' },
        { condition: 'Proven demand, capability gap', outcome: 'Partner and keep accountability', detail: 'e.g. neutral host for infrastructure, partner for cloud security', tone: 'caution' },
        { condition: 'No demand evidence', outcome: 'Hold or use exit options', detail: 'Protect core economics', tone: 'negative' },
      ],
      note: 'Vietnamese operators can focus innovation on proven customer needs and use partnerships to speed delivery while building local skills.',
      takeaway: 'Long-term success converts capital into productive assets and new revenue without weakening core economics.',
    },
  },
  'telecom-m4-12': {
    heading: 'The industry SWOT and what it implies for priorities',
    intro: 'The same network assets that create entry barriers also bring fixed cost and transition risk. New services offer growth but need capabilities and face competition beyond traditional telecom.',
    spec: {
      layout: 'taxonomy', title: 'SWOT Analysis of the Telecommunications Industry', kicker: '',
      root: 'Telecommunications industry SWOT', rootDetail: 'Four lenses plus what to do about them',
      groups: [
        { label: 'Strengths', items: ['Essential demand', 'Recurring revenue', 'Customers and assets', 'Enterprise relationships'] },
        { label: 'Weaknesses', items: ['Capital needs', 'Legacy systems', 'Cost', 'Commoditization'] },
        { label: 'Opportunities', items: ['5G and fiber', 'Private networks and IoT', 'Cloud and security', 'Digital transformation'] },
        { label: 'Threats', items: ['Price pressure', 'OTT substitution', 'Cyber incidents', 'Regulation and dependencies'] },
        { label: 'Strategic implications', detail: 'Priorities, owners, scenarios, investment gates, measurable responses' },
      ],
      note: 'Private 5G is an opportunity only when a customer use case, delivery capability and profitable contract offset deployment and support cost.',
      takeaway: 'The core opportunity is to turn essential network assets into higher-value services while controlling capital and complexity.',
    },
  },
  'telecom-m4-13': {
    heading: 'Strategic risks that interact, and how each one spreads',
    intro: 'Operators must fund 5G, fiber, core, security and automation while keeping legacy services running. The risks interact, so one problem can raise the cost of another.',
    spec: {
      layout: 'table', title: 'Major Strategic Challenges and Risk Factors', kicker: '',
      headers: ['Risk factor', 'How it spreads', 'Where it shows'],
      rows: [
        { label: 'Capital expenditure pressure', a: 'Slow monetization strains cash', b: 'Funding 5G, fiber, core and automation' },
        { label: 'Revenue commoditization', a: 'Similar offers limit returns', b: 'Realistic demand and investment returns' },
        { label: 'Technology transition', a: 'Legacy services must keep running', b: '4G continuity alongside 5G and fiber' },
        { label: 'Regulatory complexity', a: 'Spectrum shortage can raise densification cost', b: 'Spectrum policy and compliance' },
        { label: 'Supplier dependency', a: 'Vendor dependency affects architecture', b: 'Supplier management' },
        { label: 'Cybersecurity and resilience', a: 'Incidents damage service and trust', b: 'Protecting infrastructure and data' },
      ],
      note: 'GSMA’s 2024 Vietnam analysis recommends planning toward an average 2 GHz of mid-band spectrum per country by 2030. It is an industry-association recommendation, not a binding Vietnamese requirement. Talent and organizational change cut across every row.',
      takeaway: 'The challenge is ensuring network investment creates measurable value while preserving affordability, resilience, quality, and financial capacity.',
    },
  },
  'telecom-m4-14': {
    heading: 'Secure the core first, then expand selectively',
    intro: 'Priorities combine better utilization and retention with selective enterprise services, partnerships and resilience. Not every operator should become a broad digital conglomerate.',
    spec: {
      layout: 'pathway', title: 'Strategic Priorities and Future Competitive Direction', kicker: '',
      trunk: [
        { label: 'Core-business economics', detail: 'Utilization, retention and transparent pricing' },
        { label: 'Resilience and trust', detail: 'Cybersecurity and recovery' },
      ],
      optionsLabel: 'Selective expansion options, chosen to fit assets, customers, talent and capital',
      options: [
        { label: 'Profitable 5G use cases', detail: 'e.g. private 5G for factories with measurable automation needs' },
        { label: 'Selective enterprise expansion', detail: 'Managed and enterprise services' },
        { label: 'Strategic partnerships', detail: 'Fill capability gaps' },
        { label: 'Fixed-mobile convergence', detail: 'Combined household offers' },
      ],
      afterLabel: 'Measure',
      after: [
        { label: 'Commercial outcome measurement', detail: 'Adoption, margin, retention, utilization, return on invested capital', kind: 'outcome' },
      ],
      note: 'Viettel, VNPT and MobiFone can pursue different combinations of nationwide quality, convergence, enterprise solutions, digital services and partnerships.',
      takeaway: 'Future advantage comes from selective diversification, operational efficiency, and monetization—not network expansion alone.',
    },
  },
};
