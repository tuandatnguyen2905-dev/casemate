import { electronicsM4Chapter, electronicsM4Quiz } from './electronicsM4Core';
import type { ElectronicsM4CardData, ElectronicsM4LessonBundle, ElectronicsM4SourceId, ElectronicsM4VisualKind } from './electronicsM4Core';
import { renderElectronicsModule04Visual } from './electronicsM4Visuals';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { ElectronicsM4VisualKind } from './electronicsM4Core';
export { renderElectronicsModule04Visual };

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
  visual: ElectronicsM4VisualKind;
  sources?: ElectronicsM4SourceId[];
  stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
};

const definitions: Record<string, string> = {
  'Brand differentiation': 'Distinctive design, quality, reputation, and customer experience that support preference and pricing power.',
  'Ecosystem competition': 'Competition among connected devices, software, services, accessories, and customer relationships rather than single products.',
  'Customer retention': 'The ability to sustain trust, support, compatibility, and repeat purchasing over time.',
  'Foundry competition': 'Competition to manufacture external chip designs through process capability, yield, capacity, reliability, and service.',
  'Application-specific competition': 'Competitive positioning tailored to a defined workload, device, customer, or end market.',
  'Entry barrier': 'A capability, investment, relationship, or qualification requirement that makes market entry difficult.',
  'Switching cost': 'The technical, financial, operational, or time cost a customer incurs when changing suppliers or ecosystems.',
  'Design win': 'A customer commitment to use a semiconductor in a future device or system.',
  'Shipment share': 'A company’s share of units shipped into a defined product market during a stated period.',
  'R&D intensity': 'Research and development expenditure relative to revenue.',
  'Capital efficiency': 'The productivity and return generated from manufacturing and other invested capital.',
  Yield: 'The proportion of manufactured output that meets functional and quality requirements.',
  'Operational resilience': 'The ability to maintain or recover critical operations through disruption and volatility.',
  'Value-chain upgrading': 'Movement into activities with greater technology, differentiation, productivity, or retained economic value.',
  'Customer concentration': 'Dependence on a small number of customers for a large share of revenue or capacity demand.',
};

const terms = (activities: string[]) => activities.slice(0, 5).map((term) => [
  term,
  definitions[term] ?? `A core capability or measure in ${term.toLowerCase()}.`,
] as [string, string]);

const chapter = (lesson: string, input: ChapterInput): ElectronicsM4CardData => electronicsM4Chapter({
  lesson,
  ...input,
  terms: terms(input.activities),
  recap: [input.insight, input.impact, `Key dimensions include ${input.activities.join(', ')}.`],
  sources: input.sources ?? [],
});

const competitionStructure = [
  chapter('Industry Competition Structure', {
    title: 'Competition in Consumer Electronics',
    objective: 'Assess how product, price, brand, ecosystem, channels, and lifecycle support shape competition by category.',
    intro: 'Consumer electronics companies compete across smartphones, computers, televisions, wearables, gaming devices, appliances, and connected products. Mature categories can face limited unit growth and price pressure, while premium tiers and emerging technologies create room for differentiation.',
    insight: 'Consumer electronics competition is increasingly ecosystem-based: durable advantage requires hardware, software, services, support, trust, and user experience to reinforce one another.',
    what: 'The market includes global brands, regional manufacturers, specialists, private-label suppliers, and contract producers. Strategies range from premium integrated ecosystems to broad portfolios, affordability, rapid launches, category specialization, or operational efficiency.',
    why: 'Comparable hardware specifications make it difficult to compete through components alone. Software support, cross-device compatibility, applications, cloud services, financing, distribution, repair, warranties, and brand reputation increasingly influence purchase and retention.',
    example: 'A smartphone brand can differentiate through camera performance, proprietary silicon, battery efficiency, software updates, accessories, and seamless links to computers and wearables rather than one specification.',
    vietnam: 'Vietnamese device firms and manufacturers compete within global supply and distribution networks; credible quality, cost, channel execution, service, and customer trust matter alongside manufacturing scale.',
    impact: 'Companies need category-specific differentiation while maintaining competitive cost, product reliability, accessible channels, effective lifecycle support, and customer confidence.',
    activities: ['Brand differentiation', 'Price competition', 'Ecosystem competition', 'Product innovation', 'Channel competition', 'Customer retention'],
    visual: 'electronics-m4-1',
  }),
  chapter('Industry Competition Structure', {
    title: 'Competition in the Semiconductor Industry',
    objective: 'Distinguish competition across design, IP, fabrication, memory, equipment, materials, packaging, testing, and applications.',
    intro: 'Semiconductors do not form one homogeneous competitive market. Each segment has different technologies, customers, capital needs, qualification requirements, cycles, and competitive structures, and leading firms often depend on other specialists.',
    insight: 'Semiconductor advantage is segment-specific and combines technology, scale, yield, IP, customer qualification, manufacturing access, software, and supply reliability.',
    what: 'Chip designers compete in processors, AI accelerators, mobile and connectivity products, analog and power devices, and specialized ICs. Foundries compete on process capability, yield, capacity, reliability, and customer trust. Memory, equipment, materials, and packaging each have distinct measures and competitors.',
    why: 'AI processors, high-bandwidth memory, advanced processes, and advanced packaging create important battlegrounds, while mature-node products remain essential for automotive, industrial, power-management, and consumer applications.',
    example: 'A leading AI-chip designer may depend on external foundry capacity, advanced packaging, memory, EDA, semiconductor IP, and equipment suppliers; leadership in one layer does not remove dependencies in others.',
    vietnam: 'Vietnam’s credible near-term semiconductor competition is concentrated in design and assembly, packaging, and testing capabilities rather than leading-edge wafer fabrication in the OECD’s cited assessment.',
    impact: 'Analysts should compare firms only within relevant product and value-chain segments and then map the cross-segment dependencies affecting delivery and bargaining power.',
    activities: ['Chip design competition', 'Foundry competition', 'Memory competition', 'Equipment and materials competition', 'Packaging and testing competition', 'Application-specific competition'],
    visual: 'electronics-m4-2',
    sources: ['oecdValueChain', 'oecdVietnam', 'sia'],
  }),
  chapter('Industry Competition Structure', {
    title: 'Market Concentration, Barriers to Entry, and Competitive Intensity',
    objective: 'Explain how capital, technology, scale, qualification, switching costs, brands, and disruption shape entry and rivalry.',
    intro: 'Concentration varies sharply by segment. Some consumer categories have many participants, while a few global brands influence others. Semiconductor segments can concentrate around specialized IP, manufacturing, equipment, materials, or process knowledge developed over many years.',
    insight: 'High entry barriers protect incumbents but do not make them invulnerable: technological transitions, alternative architectures, policy, new customer needs, and weak execution can still shift competitive positions.',
    what: 'Barriers include R&D cost, facilities and equipment, engineering talent, proprietary technology, patents, process expertise, production yield, customer qualification, supplier relationships, software ecosystems, brand recognition, channels, and after-sales support.',
    why: 'Advanced fabrication requires more than capital: firms need equipment access, process integration, reliable utilities, experienced teams, sustained demand, and years of learning. Device entry can be easier in selected categories, but trusted global brands and distribution are difficult to build.',
    example: 'A customer may avoid changing a qualified semiconductor because redesign and revalidation are costly, while a consumer may resist leaving a device ecosystem because applications, accessories, data, and habits are tied to it.',
    vietnam: 'Vietnam can reduce its own entry constraints through workforce, infrastructure, supplier development, applied research, quality systems, and partnerships focused on selected commercially credible segments.',
    impact: 'Strategy should identify which barriers genuinely protect value and which may weaken as technology, customer preferences, policy, or industry architecture changes.',
    activities: ['Capital barriers', 'Technology barriers', 'Scale advantages', 'Switching cost', 'Brand and channel barriers', 'Disruptive competition'],
    visual: 'electronics-m4-3',
    sources: ['oecdValueChain', 'oecdVietnam'],
  }),
];

const keyPlayers = [
  chapter('Key Industry Players', {
    title: 'Leading Consumer Electronics Companies',
    objective: 'Compare leading firms by category, geography, portfolio, ecosystem, brand, channel, and strategic model.',
    intro: 'Global consumer electronics includes multinational portfolio companies, category specialists, value-oriented brands, and efficient manufacturers. Company-wide size is not equivalent to leadership in every product category or market.',
    insight: 'Consumer-electronics leadership must be evaluated at the category and customer level because strengths in smartphones, PCs, entertainment, displays, appliances, and ecosystems are not interchangeable.',
    what: 'Apple emphasizes integrated devices, proprietary silicon, software, services, and premium brand positioning. Samsung spans devices, displays, appliances, memory, and other technologies. Xiaomi combines value-oriented devices and connected products. Lenovo, HP, and Dell are important in PCs, while Sony and LG hold selected category strengths.',
    why: 'Different portfolios and business systems create different sources of advantage: ecosystem loyalty, design, vertical capability, enterprise channels, broad price tiers, manufacturing scale, retail access, or category expertise.',
    example: 'Apple and Samsung may compete directly in premium smartphones, yet Samsung’s display, memory, appliance, and manufacturing activities make its overall business model structurally different.',
    vietnam: 'Vietnam hosts substantial production for international electronics companies and can evaluate how local suppliers and engineers participate in each company’s value network rather than infer domestic value from brand output alone.',
    impact: 'Benchmarking should define the exact category, geography, period, price tier, and competitive question before comparing market position or capability.',
    activities: ['Apple', 'Samsung Electronics', 'Xiaomi', 'Lenovo', 'HP and Dell', 'Sony and LG Electronics'],
    visual: 'electronics-m4-4',
  }),
  chapter('Key Industry Players', {
    title: 'Leading Semiconductor Companies',
    objective: 'Identify specialized semiconductor leaders while separating chip vendors, foundries, equipment suppliers, and business models.',
    intro: 'Semiconductor leaders operate in different arenas: AI processors, memory, CPUs, mobile chipsets, networking, foundry manufacturing, equipment, IP, and packaging. Revenue rankings are useful only when their scope and limitations remain visible.',
    insight: 'Semiconductor leadership is segment-specific; commercial scale, technology, market position, manufacturing access, profitability, and customer dependence must be interpreted together.',
    what: 'Gartner’s January 2026 preliminary results put worldwide semiconductor vendor revenue at US$793.449B for 2025. NVIDIA ranked first at US$125.703B and 15.8%, followed by Samsung Electronics and SK hynix. The table measures vendor semiconductor revenue, not every value-chain company or universal technology leadership.',
    why: 'NVIDIA is prominent in AI computing; Samsung and SK hynix are major memory suppliers; Intel and AMD compete in computing; Qualcomm and MediaTek in mobile and connectivity; Broadcom in networking and specialized products. TSMC’s foundry and ASML’s equipment roles require different comparisons from chip-vendor revenue.',
    example: 'An AI platform may combine NVIDIA accelerators, SK hynix or Micron memory, TSMC fabrication, advanced packaging, and ASML-enabled manufacturing technology—each company leading a different part of the system.',
    vietnam: 'Vietnam should benchmark potential partners and competitors by the capabilities relevant to local design, packaging, testing, manufacturing, supplier, and workforce priorities.',
    impact: 'Separate product vendors from foundries, equipment companies, IP providers, and OSATs before drawing conclusions about direct rivalry, scale, or leadership.',
    activities: ['NVIDIA', 'Samsung and SK hynix', 'Intel and AMD', 'Qualcomm and MediaTek', 'Broadcom', 'TSMC and ASML'],
    visual: 'electronics-m4-5',
    sources: ['gartner2025', 'oecdValueChain'],
    stats: [
      { value: 'US$793.449B', label: '2025 semiconductor vendor revenue', subtitle: 'Preliminary worldwide total', description: 'Gartner, January 2026.' },
      { value: 'US$125.703B', label: 'NVIDIA semiconductor revenue', subtitle: '2025 preliminary', description: '15.8% of Gartner’s measured vendor market.' },
      { value: '#1', label: 'NVIDIA vendor rank', subtitle: '2025 preliminary', description: 'Followed by Samsung Electronics and SK hynix in Gartner’s table.' },
    ],
  }),
  chapter('Key Industry Players', {
    title: 'Competitive Position of Vietnam and Regional Participants',
    objective: 'Assess Vietnam against regional specialization in manufacturing, design, foundry, memory, materials, equipment, and back-end capability.',
    intro: 'Vietnam’s position reflects electronics manufacturing, foreign investment, suppliers, exports, and developing technical capability. It is more visible in manufacturing and selected semiconductor activities than in ownership of globally dominant architectures or leading-edge fabrication.',
    insight: 'Vietnam’s competitiveness should be measured by reliable capability and retained learning and value—not investment announcements or gross output alone.',
    what: 'Taiwan has major foundry capability; South Korea is strong in memory and electronics; Japan has important materials and equipment strengths; China combines a large electronics ecosystem with expanding domestic semiconductor capability. Vietnam can complement this network through manufacturing, design, engineering, and back-end services.',
    why: 'Regional competitors have deep clusters, suppliers, research, infrastructure, and accumulated process knowledge. Vietnam needs selective specialization rather than attempting to reproduce every segment simultaneously.',
    example: 'Existing electronics manufacturing can support supplier quality, automation, test engineering, product industrialization, chip verification, and semiconductor packaging and testing when talent and commercial demand align.',
    vietnam: 'The OECD’s 2025 assessment reports about 50 chip-design firms and seven assembly, packaging, and testing facilities, but no operational semiconductor foundry in the cited assessment.',
    impact: 'Priority should go to supplier development, engineering skills, infrastructure, research links, and investments that transfer durable capability and deepen domestic participation.',
    activities: ['Electronics manufacturing base', 'Semiconductor backend opportunities', 'Regional specialization', 'Local supplier development', 'Engineering capability building', 'Strategic investment'],
    visual: 'electronics-m4-6',
    sources: ['oecdVietnam', 'oecdValueChain'],
  }),
];

const benchmarking = [
  chapter('Competitor Benchmarking', {
    title: 'Consumer Electronics Benchmarking: Brand, Scale, and Ecosystem',
    objective: 'Benchmark category competitors through consistently scoped shipment, revenue, portfolio, brand, ecosystem, channel, and financial indicators.',
    intro: 'A company can lead shipments while another captures more revenue or profit through premium pricing. Benchmarking therefore needs several measures and a clearly defined category, geography, channel, and period.',
    insight: 'Shipment share, revenue share, profitability, ecosystem strength, and customer loyalty measure different dimensions and should never be treated as interchangeable rankings.',
    what: 'Counterpoint’s preliminary 2025 global smartphone sell-in estimates placed Apple first at 20%, Samsung second at 19%, and Xiaomi third at 13%. These figures cover smartphone units shipped into channels, not the full consumer-electronics industry, sell-through, revenue, or profitability.',
    why: 'Brand positioning, average selling price, tier breadth, launches, software support, ecosystem integration, distribution, after-sales service, and margins explain competitive quality beyond unit share.',
    example: 'A premium brand may ship fewer units but earn more revenue per device, while a high-volume value brand may build reach through lower prices and extensive channels.',
    vietnam: 'Vietnam analysis should distinguish local production volume, domestic retail performance, exports, brand ownership, and retained value when benchmarking firms operating in the country.',
    impact: 'Compare companies serving the same customer need and product category, then use complementary operating and financial measures to explain the observed market position.',
    activities: ['Shipment share', 'Brand positioning', 'Product portfolio', 'Ecosystem integration', 'Distribution strength', 'Financial performance'],
    visual: 'electronics-m4-7',
    sources: ['counterpoint2025'],
    stats: [
      { value: '20%', label: 'Apple smartphone shipment share', subtitle: '2025 preliminary global sell-in', description: 'Counterpoint Research; smartphones only.' },
      { value: '19%', label: 'Samsung smartphone shipment share', subtitle: '2025 preliminary global sell-in', description: 'Counterpoint Research; smartphones only.' },
      { value: '13%', label: 'Xiaomi smartphone shipment share', subtitle: '2025 preliminary global sell-in', description: 'Counterpoint Research; smartphones only.' },
    ],
  }),
  chapter('Competitor Benchmarking', {
    title: 'Semiconductor Benchmarking: Technology, Specialization, and Scale',
    objective: 'Tailor technical, manufacturing, customer, financial, and supply-chain measures to each semiconductor business model.',
    intro: 'Chip designers, foundries, memory manufacturers, IDMs, equipment suppliers, IP vendors, and OSAT providers perform different work. A fair benchmark begins with the company’s segment and value-chain role.',
    insight: 'Revenue and growth show commercial scale, but technology, yield, product fit, qualification, software, manufacturing access, customer diversity, and capital efficiency explain competitive strength.',
    what: 'Design firms can be compared by product performance, power efficiency, design wins, and software ecosystems; foundries by process capability, yield, capacity, and service; memory firms by technology, product mix, cost, and supply-demand execution; equipment firms by precision, reliability, and differentiation.',
    why: 'Gartner’s preliminary 2025 vendor table shows rapid shifts: NVIDIA reported US$125.703B and 15.8% of measured vendor revenue; SK hynix revenue grew 37.2%; Micron grew 50.2%. Those results reflect AI and memory conditions, not universal superiority across all chip categories.',
    example: 'A fabless AI designer and a foundry should not be compared through asset ownership or capital expenditure alone; one depends on design and software leverage, while the other depends heavily on manufacturing investment, yield, and utilization.',
    vietnam: 'Vietnamese firms and policymakers should benchmark capabilities relevant to selected design, verification, packaging, testing, automation, and supplier niches rather than mimic broad global rankings.',
    impact: 'Use peer groups and metrics appropriate to the business model before connecting results to broader ecosystem power, dependencies, and investment needs.',
    activities: ['Technology performance', 'Manufacturing capability', 'Product specialization', 'Customer relationships', 'Financial performance', 'Supply-chain position'],
    visual: 'electronics-m4-8',
    sources: ['gartner2025', 'oecdValueChain'],
    stats: [
      { value: '15.8%', label: 'NVIDIA vendor share', subtitle: '2025 preliminary revenue', description: 'Gartner; worldwide semiconductor vendor revenue.' },
      { value: '37.2%', label: 'SK hynix revenue growth', subtitle: '2025 vs. 2024', description: 'Gartner preliminary vendor table.' },
      { value: '50.2%', label: 'Micron revenue growth', subtitle: '2025 vs. 2024', description: 'Gartner preliminary vendor table.' },
    ],
  }),
  chapter('Competitor Benchmarking', {
    title: 'Quantitative Benchmarking Through Market Indicators',
    objective: 'Construct multi-metric benchmarks with consistent definitions, periods, scopes, peer groups, and business-model context.',
    intro: 'Market share, growth, margins, R&D intensity, capital spending, yield, delivery, and concentration answer different questions. A single headline metric cannot distinguish scale, efficiency, innovation, resilience, and sustainable return.',
    insight: 'Robust quantitative benchmarking uses several compatible indicators and explains their definitions rather than treating one ranking as a complete competitive verdict.',
    what: 'Useful indicators include shipment or revenue share, growth, gross and operating margins, R&D intensity, capital expenditure, returns on invested capital, utilization, yield, defect rates, delivery performance, cycle time, customer concentration, and supplier concentration.',
    why: 'Fabless companies, foundries, consumer brands, and contract manufacturers own different assets and carry different costs. Comparing margins or revenue without adjusting for those models can misrepresent performance.',
    example: 'A foundry’s capital intensity and utilization should be read with yield and customer mix, while a device brand’s margin should be read with average selling price, product mix, channel cost, warranty, and ecosystem revenue.',
    vietnam: 'Vietnam benchmarks should separate foreign-invested production, domestic suppliers, exports, local value added, productivity, technology ownership, and workforce capability rather than collapse them into one scale measure.',
    impact: 'Document source, date, currency, geography, product definition, denominator, and preliminary or final status so comparisons remain reproducible and decision-useful.',
    activities: ['Market share', 'Revenue growth', 'Profitability', 'R&D intensity', 'Capital efficiency', 'Customer concentration', 'Operational performance'],
    visual: 'electronics-m4-9',
  }),
];

const successFactors = [
  chapter('Key Success Factors', {
    title: 'Technology Innovation and Product Differentiation',
    objective: 'Connect research, IP, engineering, manufacturing, validation, and customer value in a repeatable innovation system.',
    intro: 'Consumer-electronics firms need improvements in function, design, reliability, usability, software, and efficiency. Semiconductor firms must advance architectures, memory, connectivity, power, process, packaging, and application fit.',
    insight: 'Sustainable innovation combines technical advancement with commercial relevance, manufacturability, defensibility, and a price customers will support.',
    what: 'Core capabilities include R&D, product and chip architecture, materials and process innovation, AI and advanced computing, IP management, design-to-manufacturing coordination, prototyping, qualification, and commercial validation.',
    why: 'Features competitors can quickly reproduce offer temporary advantage. Proprietary technology, specialized engineering, software ecosystems, manufacturing knowledge, and accumulated customer integration can be more durable.',
    example: 'An AI feature creates value only if hardware, memory, power use, thermal design, software, privacy, reliability, and customer usefulness work together at acceptable cost.',
    vietnam: 'Vietnam can strengthen differentiation by combining manufacturing experience with design, verification, test engineering, industrialization, software, applied research, and local supplier problem-solving.',
    impact: 'Innovation investment should be governed by customer need, technical feasibility, manufacturability, time to market, defensibility, and expected economic return.',
    activities: ['Research and development', 'Product differentiation', 'AI and advanced computing', 'Intellectual property management', 'Design-to-manufacturing coordination', 'Commercial validation'],
    visual: 'electronics-m4-10',
    sources: ['sia', 'oecdValueChain'],
  }),
  chapter('Key Success Factors', {
    title: 'Operational Excellence, Cost Efficiency, and Supply-Chain Resilience',
    objective: 'Balance yield, quality, cost, inventory, launch execution, flexibility, and continuity across operations.',
    intro: 'Operational excellence enables consistent quality, competitive pricing, reliable supply, and timely launches. It depends on sourcing, forecasting, manufacturing, inventory, logistics, quality systems, and data—not factory speed alone.',
    insight: 'Efficient and resilient operations reinforce one another when firms understand dependencies, qualify alternatives, and improve the processes that determine cost and reliability.',
    what: 'Priorities include yield, throughput, utilization, labor productivity, materials and energy, logistics, inventory, warranty cost, process control, defect prevention, forecasting, supplier performance, diversification, and contingency planning.',
    why: 'Overdependence on one supplier, facility, tool, material, or region can turn local disruption into lost output. Excess redundancy also has cost, so resilience decisions need impact and feasibility analysis.',
    example: 'A firm may combine long-term capacity commitments, supplier monitoring, qualified alternatives, strategic stock, flexible production, and shared forecasts for a critical component.',
    vietnam: 'Vietnamese manufacturers can compete through dependable launch execution, traceability, supplier development, high quality, skilled technicians, efficient logistics, and continuity planning.',
    impact: 'Leaders should manage cost, quality, capacity, flexibility, and disruption exposure as one operating system rather than optimize each function independently.',
    activities: ['Manufacturing efficiency', 'Cost control', 'Quality management', 'Demand and inventory planning', 'Supplier diversification', 'Risk monitoring', 'Continuous improvement'],
    visual: 'electronics-m4-11',
  }),
  chapter('Key Success Factors', {
    title: 'Brand, Customer Relationships, and Ecosystem Development',
    objective: 'Build durable consumer loyalty and technical trust through consistent value, compatibility, collaboration, and support.',
    intro: 'Consumer buyers use brand, quality, design, familiarity, and ecosystem fit to reduce purchase uncertainty. Semiconductor customers rely on technical collaboration, qualification, delivery, continuity, and engineering support over long product cycles.',
    insight: 'Brand reputation and technical trust are both earned through sustained product value, reliability, support, and innovation—not communications alone.',
    what: 'Consumer capabilities include positioning, ecosystem integration, service, updates, accessories, customer care, and feedback. Semiconductor capabilities include roadmap collaboration, design wins, integration support, qualification, supply continuity, documentation, and long-term technical assistance.',
    why: 'Connected ecosystems create convenience and switching costs, while qualified chips can remain embedded in customer systems for years. Weak support or unreliable delivery can still destroy those advantages.',
    example: 'A device ecosystem can encourage repeat purchases across phones, computers, wearables, and services; a semiconductor supplier can retain a customer through trusted design support and product continuity.',
    vietnam: 'Vietnamese suppliers can strengthen relationships through responsive engineering, consistent quality, transparent communication, traceability, delivery reliability, and evidence of continuous improvement.',
    impact: 'Customer strategy should improve retention while diversifying relationships enough to avoid excessive dependence on a small number of accounts or ecosystem partners.',
    activities: ['Brand management', 'Ecosystem integration', 'Customer retention', 'Technical collaboration', 'Long-term support', 'Customer feedback', 'Relationship diversification'],
    visual: 'electronics-m4-12',
  }),
];

const swotChallenges = [
  chapter('Industry SWOT & Strategic Challenges', {
    title: 'Industry SWOT Analysis',
    objective: 'Connect sector strengths and opportunities with the structural weaknesses and threats that can prevent value capture.',
    intro: 'Consumer electronics and semiconductors share technology and supply networks but face different economics. Electronics benefits from brands, channels, and diverse applications; semiconductors from specialized technology, IP, and digital-infrastructure demand.',
    insight: 'Technological opportunity and structural risk are inseparable: firms need financial discipline, resilient operations, and customer execution to turn innovation into sustainable value.',
    what: 'Strengths include global ecosystems, brands, engineering, IP, and established networks. Weaknesses include capital intensity, complex dependencies, cyclicality, and commoditization. Opportunities include AI, advanced packaging, efficient devices, connectivity, and diversification. Threats include geopolitics, controls, shortages, volatility, and rapid change.',
    why: 'The same specialization that supports high performance can create dependency; the same demand growth that attracts investment can contribute to capacity risk; rapid product innovation can support differentiation while accelerating obsolescence.',
    example: 'AI demand can expand processor, memory, networking, packaging, and power opportunities while intensifying capital needs, supplier concentration, and competition for skilled talent.',
    vietnam: 'Vietnam’s strengths in manufacturing and integration create upgrading opportunities, while imported technology, local supplier gaps, talent constraints, infrastructure, and limited domestic IP remain relevant vulnerabilities.',
    impact: 'Convert SWOT from a list into choices: pair opportunities with required capabilities, assign owners to vulnerabilities, and test investments against downside scenarios.',
    activities: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats', 'Consumer electronics implications', 'Semiconductor implications'],
    visual: 'electronics-m4-13',
    sources: ['oecdVietnam', 'oecdValueChain', 'sia'],
  }),
  chapter('Industry SWOT & Strategic Challenges', {
    title: 'Strategic Challenges and Risk Factors',
    objective: 'Analyze interactions among technology, cycles, investment, concentration, regulation, talent, sustainability, and security.',
    intro: 'Rapid innovation requires sustained investment, but not every technology or capacity expansion earns an adequate return. Longer replacement cycles and price competition pressure devices, while semiconductor firms face complex capacity and process decisions under uncertain demand.',
    insight: 'Strategic risks amplify one another, so investment, technology, procurement, operations, security, compliance, and market decisions need coordinated scenarios.',
    what: 'Risks include technology displacement, demand and inventory volatility, capital misallocation, concentrated suppliers and locations, trade restrictions, scarce engineers, energy and water requirements, e-waste and repair obligations, and cybersecurity exposure in connected products.',
    why: 'A demand slowdown can expose overcapacity and financial pressure; export restrictions can limit technology or customers; talent shortages can delay operations; unsupported connected devices can create security and brand damage.',
    example: 'A large new facility may become less attractive if end demand weakens, qualification is delayed, equipment access changes, or a new architecture shifts the target market.',
    vietnam: 'Vietnam needs to connect investment promotion with electricity and water reliability, workforce depth, supplier capability, technology access, environmental performance, and realistic customer demand.',
    impact: 'Risk management should identify combined scenarios, leading indicators, decision thresholds, and options rather than maintain separate static risk lists.',
    activities: ['Technology disruption', 'Demand volatility', 'Capital allocation risk', 'Supply-chain concentration', 'Trade and regulatory uncertainty', 'Talent shortages', 'Environmental and lifecycle pressure', 'Cybersecurity and data risks'],
    visual: 'electronics-m4-14',
    sources: ['oecdVietnam', 'oecdValueChain'],
  }),
  chapter('Industry SWOT & Strategic Challenges', {
    title: 'Strategic Priorities for Sustained Competitiveness',
    objective: 'Align selective investment, differentiation, resilience, relationships, talent, sustainability, and measurement with credible advantage.',
    intro: 'Long-term competitiveness comes from distinctive capability plus adaptability. Device companies need meaningful improvements, trusted brands, disciplined portfolios, and complementary services; semiconductor firms need selective technical advantage, execution, and deep customer relationships.',
    insight: 'Companies and countries create stronger positions through focused specialization and continuous capability development—not scale or investment announcements alone.',
    what: 'Priorities include focused innovation, financial discipline, operational resilience, customer and ecosystem development, workforce and research investment, value-chain upgrading, sustainable operations, and balanced performance measurement.',
    why: 'Resources are finite and technology choices are consequential. Selecting opportunities aligned with existing strengths, customer demand, partner networks, and feasible learning paths increases the chance of defensible returns.',
    example: 'A firm can prioritize one application where its engineering, IP, customer access, and manufacturing partners reinforce one another rather than spread capital across unrelated technology races.',
    vietnam: 'Vietnam can strengthen domestic suppliers, semiconductor design and verification, commercially viable packaging and testing, automation, engineering, research partnerships, and workforce pathways while remaining integrated with global networks.',
    impact: 'Track market position, profitability, productivity, retention, technical milestones, supplier development, workforce capability, and domestic value capture to distinguish durable progress from output growth alone.',
    activities: ['Focused innovation', 'Financial discipline', 'Operational resilience', 'Customer and ecosystem development', 'Workforce and research investment', 'Value-chain upgrading', 'Sustainable operations', 'Performance measurement'],
    visual: 'electronics-m4-15',
    sources: ['oecdVietnam', 'oecdValueChain', 'sia'],
  }),
];

const seed = (chapterNumber: string, question: string, application: string, correct: string) => ({
  chapter: chapterNumber,
  objective: question,
  question,
  application,
  correct,
  wrong: ['One universal company ranking', 'Revenue without segment context', 'An unscoped market-share figure'] as [string, string, string],
  explanation: 'Competitive analysis requires a defined segment, consistent evidence, business-model context, and the capabilities that explain performance.',
});

const quiz = (prefix: string, topics: string[], map?: number[]) => electronicsM4Quiz(prefix, topics.flatMap((topic, index) => [
  seed(String(map?.[index] ?? index + 1), `What defines competition in ${topic}?`, `A strategy team reviews ${topic}. What should it compare?`, 'Relevant technology, execution, customer, risk, and economic measures'),
  seed(String(map?.[index] ?? index + 1), `Which risk can weaken an advantage in ${topic}?`, `A current leader in ${topic} faces disruption. What should the team map?`, 'Technology transitions, dependencies, switching costs, and customer alternatives'),
  seed(String(map?.[index] ?? index + 1), `How should ${topic} be benchmarked?`, `A dashboard presents one headline figure for ${topic}. What is missing?`, 'A consistent peer group, period, scope, and complementary indicators'),
]).slice(0, 10));

const bundles: ElectronicsM4LessonBundle[] = [
  {
    deck: competitionStructure,
    quiz: quiz('electronics-m4-l1', ['consumer electronics', 'semiconductors', 'entry barriers', 'competitive intensity'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can distinguish category, segment, barrier, and rivalry structures across devices and semiconductors.',
      keyTakeaways: ['Device competition increasingly includes ecosystems.', 'Semiconductor competition is highly segmented.', 'Technology and qualification create different barriers by stage.', 'Mature and advanced products require different capabilities.', 'High barriers do not guarantee permanent leadership.'],
      businessImplications: 'Define the segment and source of advantage before evaluating concentration, entry, or disruption.',
      remember: 'There is no single competitive structure for the combined industries.',
      nextLesson: 'Key Industry Players',
    },
  },
  {
    deck: keyPlayers,
    quiz: quiz('electronics-m4-l2', ['consumer-electronics leaders', 'semiconductor leaders', 'Vietnam and regional participants', 'specialized business roles'], [1, 2, 3, 2]),
    takeaways: {
      learned: 'You can compare leading firms and Vietnam without collapsing distinct categories and business models into one ranking.',
      keyTakeaways: ['No device company leads every category.', 'Semiconductor leaders occupy different value-chain roles.', 'Vendor revenue is not universal technology leadership.', 'Regional economies have complementary strengths.', 'Vietnam’s opportunity is selective capability upgrading.'],
      businessImplications: 'Benchmark direct competitors and potential partners by the capability relevant to the strategic decision.',
      remember: 'Company size and competitive leadership are always scope-dependent.',
      nextLesson: 'Competitor Benchmarking',
    },
  },
  {
    deck: benchmarking,
    quiz: quiz('electronics-m4-l3', ['device benchmarking', 'semiconductor benchmarking', 'quantitative indicators', 'evidence scope'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can build fair benchmarks across market, technology, operating, customer, and financial indicators.',
      keyTakeaways: ['Shipment, revenue, and profit measure different outcomes.', 'Smartphone share is not total electronics share.', 'Semiconductor peer groups must reflect business models.', 'Growth can reflect cycle and product mix.', 'Every figure needs scope, period, and source.'],
      businessImplications: 'Use several compatible metrics and document definitions before acting on a ranking.',
      remember: 'A benchmark is only as fair as its peer group and denominator.',
      nextLesson: 'Key Success Factors',
    },
  },
  {
    deck: successFactors,
    quiz: quiz('electronics-m4-l4', ['innovation and differentiation', 'operational excellence', 'resilience', 'customer relationships'], [1, 2, 2, 3]),
    takeaways: {
      learned: 'You can explain how technology, operations, resilience, brand, and technical trust reinforce sustained advantage.',
      keyTakeaways: ['Innovation needs commercial relevance.', 'Manufacturability affects differentiation.', 'Cost and resilience should be managed together.', 'Brand trust requires consistent delivery.', 'Technical relationships can create long product lifecycles.'],
      businessImplications: 'Build a repeatable system linking research, manufacturing, suppliers, customer evidence, and lifecycle support.',
      remember: 'Competitive capability matters only when it reliably creates customer and economic value.',
      nextLesson: 'Industry SWOT & Strategic Challenges',
    },
  },
  {
    deck: swotChallenges,
    quiz: quiz('electronics-m4-l5', ['industry SWOT', 'strategic risks', 'sustained competitiveness', 'Vietnam upgrading'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can convert industry opportunities and risks into focused priorities for firms and Vietnam.',
      keyTakeaways: ['Technology opportunity carries structural risk.', 'Market, capital, and supply risks interact.', 'Specialization should reflect credible strengths.', 'Vietnam needs capability development, not capacity alone.', 'Balanced measures reveal durable progress.'],
      businessImplications: 'Prioritize defensible opportunities, coordinate risk scenarios, and measure productivity, relationships, technical progress, and value capture.',
      remember: 'Sustained competitiveness is selective, adaptive, and evidence-based.',
      nextLesson: '',
    },
  },
];

const keys = [
  'Industry Competition Structure',
  'Key Industry Players',
  'Competitor Benchmarking',
  'Key Success Factors',
  'Industry SWOT & Strategic Challenges',
];

export const ELECTRONICS_MODULE04_DECKS: Record<string, ElectronicsM4CardData[]> = {};
export const ELECTRONICS_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ELECTRONICS_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};

bundles.forEach((bundle, index) => {
  const key = keys[index];
  ELECTRONICS_MODULE04_DECKS[key] = bundle.deck;
  ELECTRONICS_MODULE04_QUIZZES[key] = bundle.quiz;
  ELECTRONICS_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
