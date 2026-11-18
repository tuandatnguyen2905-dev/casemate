import { electronicsM2Chapter, electronicsM2Quiz } from './electronicsM2Core';
import type { ElectronicsM2CardData, ElectronicsM2LessonBundle, ElectronicsM2VisualKind } from './electronicsM2Core';
import { renderElectronicsModule02Visual } from './electronicsM2Visuals';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { ElectronicsM2VisualKind } from './electronicsM2Core';
export { renderElectronicsModule02Visual };

type SourceId = 'nso2025' | 'oecdVietnam' | 'oecdChips';
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
  visual: ElectronicsM2VisualKind;
  sources?: SourceId[];
};

const termDefinitions: Record<string, string> = {
  'R&D and design': 'Research and engineering work that defines product, component, and chip requirements before production.',
  'Materials and equipment': 'Specialized physical inputs and production systems required to manufacture chips and devices.',
  'Semiconductor production': 'Wafer fabrication followed by chip assembly, packaging, and testing.',
  'Electronics manufacturing': 'The integration of components, modules, software, and structures into finished devices.',
  Commercialization: 'Distribution, branding, sales, support, and lifecycle activities that connect products with customers.',
  IDM: 'An integrated device manufacturer that designs and manufactures semiconductors.',
  Fabless: 'A semiconductor company that designs chips and outsources wafer fabrication.',
  Foundry: 'A manufacturer that fabricates semiconductor designs for external customers.',
  OSAT: 'An outsourced semiconductor assembly and test provider specializing in packaging and testing.',
  'OEM / ODM / EMS': 'Device-brand, design-manufacturing, and contract-manufacturing roles with different ownership and service scopes.',
  'Design for manufacturing': 'Adapting a design to production capability, reliability requirements, and cost targets.',
  'Semiconductor IP': 'Reusable processor cores, interfaces, functional blocks, and design libraries used in chip development.',
  Lithography: 'The process of transferring circuit patterns onto a semiconductor wafer.',
  Yield: 'The proportion of manufactured dies or products that meet functional and quality requirements.',
  'Advanced packaging': 'Integration of multiple dies or chiplets in a package to improve performance, functionality, or flexibility.',
  Traceability: 'Records that connect materials, component lots, process results, and finished products.',
  'Design win': 'A customer decision to include a semiconductor product in a future device or system.',
  'Lifecycle management': 'Planning updates, support, component availability, discontinuation, repair, and end-of-life treatment.',
  'Value capture': 'The share of economic benefit a firm retains through revenue and profitability.',
  Utilization: 'The degree to which production equipment or capacity is used productively.',
  'Geographic specialization': 'The concentration of particular value-chain capabilities in selected countries or regions.',
  'Local supplier development': 'Helping domestic suppliers meet technical, quality, delivery, and traceability requirements.',
};

const terms = (activities: string[]) => activities.slice(0, 5).map((term) => [
  term,
  termDefinitions[term] ?? `A core capability or activity within ${term.toLowerCase()}.`,
] as [string, string]);

const chapter = (lesson: string, input: ChapterInput): ElectronicsM2CardData => electronicsM2Chapter({
  lesson,
  ...input,
  terms: terms(input.activities),
  recap: [input.insight, input.impact, `Key activities include ${input.activities.join(', ')}.`],
  sources: input.sources ?? [],
});

const overview = [
  chapter('Value Chain Overview', {
    title: 'Structure of the Integrated Value Chain',
    objective: 'Trace how knowledge, materials, components, devices, services, information, and finance move across the integrated chain.',
    intro: 'Consumer electronics and semiconductors form an interconnected system. Semiconductor activities supply integrated circuits and enabling components, while electronics activities combine those inputs with hardware, software, design, branding, distribution, and support for end users.',
    insight: 'Value creation is distributed across the chain, but firms controlling critical IP, advanced manufacturing, trusted brands, or customer ecosystems can capture a disproportionate share.',
    what: 'Upstream activities cover research, intellectual property, product and chip design, materials, equipment, and components. Midstream activities convert designs into wafers and packaged chips, then integrate components into finished devices. Downstream activities commercialize, support, update, repair, and retire those products.',
    why: 'The stages are connected by more than physical products. Specifications, forecasts, quality data, software, financing, purchase commitments, and customer feedback flow in both directions and influence capacity and design decisions.',
    example: 'A processor architecture moves from design and verification through wafer fabrication, packaging, and testing before it is integrated with memory, a display, a battery, firmware, and software in a connected device.',
    vietnam: 'Vietnam participates strongly in electronics manufacturing and export networks and is developing selected semiconductor design and assembly, packaging, and testing capabilities.',
    impact: 'Mapping the complete chain reveals where costs accumulate, which dependencies can halt production, and where scarce technology, reliable execution, or customer access create additional value.',
    activities: ['R&D and design', 'Materials and equipment', 'Semiconductor production', 'Electronics manufacturing', 'Commercialization'],
    visual: 'electronics-m2-11-chain',
    sources: ['oecdVietnam', 'oecdChips'],
  }),
  chapter('Value Chain Overview', {
    title: 'Industry Participants and Business Models',
    objective: 'Compare semiconductor and electronics participants by capability, asset ownership, responsibility, and bargaining power.',
    intro: 'The chain contains specialized firms as well as vertically integrated companies. Semiconductor designers, foundries, OSAT providers, materials and equipment suppliers, device brands, OEMs, ODMs, EMS providers, distributors, retailers, and service businesses each perform different roles.',
    insight: 'A company’s position in the chain determines its investment needs, operational responsibilities, negotiating power, and exposure to customers, suppliers, technology cycles, and market risk.',
    what: 'IDMs combine semiconductor design and manufacturing. Fabless companies focus on chip design and use external foundries. Pure-play foundries manufacture for customers, while OSAT providers assemble, package, and test chips. In electronics, brand owners define products and customer propositions while ODM and EMS partners provide differing levels of design and manufacturing support.',
    why: 'Specialization can increase efficiency and access to expertise, but it also creates dependencies. Customer concentration, limited manufacturing alternatives, scarce IP, and qualification requirements can shift bargaining power between participants.',
    example: 'A fabless chip designer may contract a foundry and an OSAT provider, while a consumer brand specifies a device and uses an ODM or EMS partner for production before selling through distributors and retailers.',
    vietnam: 'Vietnam hosts electronics assembly, supplier, chip-design, and semiconductor back-end activities within multinational production networks.',
    impact: 'Understanding each role helps leaders evaluate outsourcing, vertical integration, customer concentration, supplier risk, and opportunities to build a defensible specialization.',
    activities: ['IDM', 'Fabless', 'Foundry', 'OSAT', 'OEM / ODM / EMS', 'Distribution and retail'],
    visual: 'electronics-m2-12-models',
    sources: ['oecdVietnam'],
  }),
];

const upstream = [
  chapter('Upstream Activities', {
    title: 'Research, Product Design, and Semiconductor IP',
    objective: 'Explain how research, architecture, verification, IP, prototyping, and manufacturability decisions establish product economics.',
    intro: 'Upstream teams translate market needs and scientific or engineering possibilities into product concepts, technical specifications, chip architectures, circuit designs, and validated prototypes. Their decisions establish much of the performance and cost inherited by later stages.',
    insight: 'Strong coordination between design and manufacturing can improve differentiation and reduce delay, redesign, cost, and yield risk.',
    what: 'Work includes market and technology research, device architecture, industrial design, chip design and verification, reusable semiconductor IP, design libraries, prototyping, validation, and design for manufacturing.',
    why: 'Designers must balance performance, power, thermal behavior, size, usability, appearance, reliability, component availability, manufacturing constraints, and target cost before committing to volume production.',
    example: 'A reusable processor core or interface block can shorten development, but the final chip still needs verification against manufacturing, power, packaging, and application requirements.',
    vietnam: 'Vietnam can deepen value capture by expanding chip design, verification, product engineering, and design-for-manufacturing expertise alongside its production base.',
    impact: 'Upstream ownership and engineering capability can influence product roadmaps and retain value even when physical manufacturing is outsourced.',
    activities: ['Market and technology research', 'Product architecture', 'Chip design and verification', 'Semiconductor IP', 'Design for manufacturing', 'Prototyping and validation'],
    visual: 'electronics-m2-21-design',
    sources: ['oecdVietnam'],
  }),
  chapter('Upstream Activities', {
    title: 'Raw Materials, Specialized Materials, and Production Equipment',
    objective: 'Identify the materials, equipment, components, and qualification processes that enable precise semiconductor and electronics production.',
    intro: 'Semiconductor and electronics production depends on highly controlled materials, specialized equipment, and a broad set of components. Input quality and availability directly affect product performance, manufacturing yield, cost, and delivery reliability.',
    insight: 'Specialized expertise and lengthy qualification create high entry barriers for critical suppliers, while concentrated supply can transmit disruption through the entire ecosystem.',
    what: 'Semiconductor inputs include silicon wafers, photoresists, specialty gases, high-purity chemicals, deposition materials, lithography, etching, inspection, and metrology systems. Electronics also require boards, displays, batteries, sensors, passive components, connectors, glass, metals, plastics, and engineered materials.',
    why: 'Production processes have tight tolerances. An apparently small variation in purity, dimensions, electrical behavior, or component performance can reduce yield or compromise finished-product quality.',
    example: 'Lithography and deposition equipment enable wafer processing, while automated inspection and qualified batteries, displays, and printed circuit boards support reliable device assembly.',
    vietnam: 'Vietnam’s manufacturing network depends substantially on imported advanced equipment, semiconductor inputs, and electronic components, making supplier visibility and qualification important.',
    impact: 'Manufacturers need qualified alternatives, technical collaboration, traceability, and realistic inventory strategies for inputs that can become system-wide bottlenecks.',
    activities: ['Semiconductor materials', 'Manufacturing equipment', 'Electronic components', 'Structural materials', 'Battery and display inputs', 'Supplier qualification'],
    visual: 'electronics-m2-22-materials',
    sources: ['oecdChips', 'nso2025'],
  }),
  chapter('Upstream Activities', {
    title: 'Supplier Networks and Procurement Management',
    objective: 'Balance cost, quality, capacity, continuity, flexibility, inventory, and geographic exposure across multi-tier supplier networks.',
    intro: 'Procurement connects upstream suppliers with semiconductor manufacturers, electronics assemblers, and finished-product companies. It coordinates specifications, supplier selection, contracts, pricing, capacity, quality, delivery, and inventory across several tiers and countries.',
    insight: 'Procurement is a strategic capability: low unit price creates little value if an input arrives late, fails qualification, or exposes production to an unmanaged single point of failure.',
    what: 'Core work includes supplier selection, strategic sourcing, commercial agreements, supplier development, geopolitical and financial risk monitoring, collaborative forecasting, engineering-change coordination, and inventory planning.',
    why: 'Critical equipment and specialized semiconductors may have few qualified alternatives. Validation can be lengthy, so manufacturers cannot always switch suppliers immediately after a shortage or quality event.',
    example: 'A manufacturer may combine long-term capacity agreements, dual sourcing where technically feasible, strategic stock, and shared forecasts to protect a major product launch.',
    vietnam: 'Vietnamese manufacturers need to balance imported input dependence with practical local supplier development and stronger coordination between multinational buyers and domestic firms.',
    impact: 'Effective procurement improves margin and continuity by combining competitive sourcing with supplier capability, demand visibility, qualification discipline, and contingency planning.',
    activities: ['Supplier selection', 'Strategic sourcing', 'Contract and cost management', 'Local supplier development', 'Risk monitoring', 'Inventory coordination'],
    visual: 'electronics-m2-23-procurement',
    sources: ['nso2025', 'oecdVietnam'],
  }),
];

const midstream = [
  chapter('Midstream Activities', {
    title: 'Semiconductor Wafer Fabrication',
    objective: 'Explain the fabrication sequence and how technology, capital, precision, yield, and utilization shape its economics.',
    intro: 'Wafer fabrication converts verified semiconductor designs into physical integrated circuits. Repeated, tightly controlled process steps create transistor structures and connections on silicon wafers or other suitable substrates.',
    insight: 'Fabrication competitiveness combines process capability, scale, equipment access, yield, utilization, and operational discipline; the smallest process node is not the right solution for every application.',
    what: 'The sequence includes wafer preparation, lithography, deposition, etching, doping, cleaning, inspection, metrology, and repeated process control. Advanced facilities require clean environments, reliable utilities, specialist equipment, and skilled engineers.',
    why: 'Defect control matters because small process deviations can affect large quantities of high-value output. Yield and utilization determine how effectively capital-intensive facilities convert capacity into functional chips.',
    example: 'Leading-edge processes support demanding computing, while mature processes remain important for analog, power-management, connectivity, industrial, automotive, and many consumer applications.',
    vietnam: 'The OECD’s 2025 assessment reports semiconductor design and assembly, packaging, and testing activity in Vietnam but no operational wafer-fabrication plant in the cited assessment.',
    impact: 'Technology choices should reflect application needs, customer demand, supply security, investment scale, and realistic access to process expertise—not prestige alone.',
    activities: ['Wafer preparation', 'Lithography', 'Deposition and etching', 'Doping and treatment', 'Inspection and metrology', 'Yield'],
    visual: 'electronics-m2-31-fab',
    sources: ['oecdVietnam', 'oecdChips'],
  }),
  chapter('Midstream Activities', {
    title: 'Chip Assembly, Packaging, and Testing',
    objective: 'Explain how fabricated dies become protected, connected, thermally managed, tested, and usable semiconductor products.',
    intro: 'After wafer fabrication, individual dies must be separated, attached, interconnected, packaged, and tested. Packaging protects the die, supplies electrical pathways, supports heat dissipation, and enables integration with other components.',
    insight: 'Packaging and testing are increasingly sources of performance and differentiation rather than merely final manufacturing steps.',
    what: 'Activities include wafer dicing, die attachment, electrical interconnection, package and substrate integration, functional testing, and reliability testing under defined thermal, environmental, and operating conditions.',
    why: 'As traditional scaling becomes more difficult and expensive, advanced packaging can combine chiplets, memory, logic, and other specialized dies to improve system performance and manufacturing flexibility.',
    example: 'An advanced package can place several dies close together to increase communication bandwidth and support AI accelerators or high-performance computing systems.',
    vietnam: 'The OECD’s 2025 assessment identifies seven semiconductor assembly, packaging, and testing facilities in Vietnam, supporting a credible platform for back-end capability development.',
    impact: 'Back-end expertise can create specialized value through integration, reliability, thermal management, testing, and high-quality production—not only labor cost.',
    activities: ['Wafer dicing', 'Die attachment and interconnection', 'Package integration', 'Advanced packaging', 'Electrical testing', 'Reliability testing'],
    visual: 'electronics-m2-32-packaging',
    sources: ['oecdVietnam', 'oecdChips'],
  }),
  chapter('Midstream Activities', {
    title: 'Electronic Component Manufacturing and Final Device Assembly',
    objective: 'Connect board assembly, module integration, firmware, calibration, testing, and traceability in finished-device production.',
    intro: 'Device manufacturing combines chips, boards, displays, batteries, sensors, connectors, mechanical structures, firmware, and software into commercially usable products. Responsibility may sit with brand owners, OEMs, ODMs, or EMS providers.',
    insight: 'Device assembly is a synchronization problem: a shortage or defect in one inexpensive component can delay an entire high-value product.',
    what: 'Production includes printed circuit board assembly, subassembly and module integration, mechanical and final assembly, software loading, firmware configuration, calibration, functional testing, and production traceability.',
    why: 'Large-scale output requires coordinated sourcing, tooling, labor and automation, standardized processes, controlled engineering changes, reliable schedules, and consistent quality across many interacting parts.',
    example: 'A smartphone line integrates a processor, memory, circuit boards, display, cameras, battery, radios, housing, firmware, and operating software before end-of-line testing.',
    vietnam: 'Vietnam is an established electronics manufacturing and export base, but trade scale should not be treated as equivalent to domestic ownership of technology or domestic value added.',
    impact: 'Production engineering, supplier coordination, traceability, and defect prevention determine whether complex products can meet cost, reliability, and launch targets at scale.',
    activities: ['Printed circuit board assembly', 'Module integration', 'Final assembly', 'Firmware and software installation', 'Functional testing', 'Traceability'],
    visual: 'electronics-m2-33-assembly',
    sources: ['nso2025', 'oecdVietnam'],
  }),
  chapter('Midstream Activities', {
    title: 'Quality Assurance, Reliability, and Production Optimization',
    objective: 'Explain how inspection, monitoring, analysis, maintenance, and continuous improvement protect quality and manufacturing economics.',
    intro: 'Quality assurance spans incoming materials, in-process control, final testing, reliability evaluation, defect investigation, and corrective action. Product failures can originate in materials, design, software, process variation, handling, or component interaction.',
    insight: 'Quality and productivity must improve together; additional volume destroys value when defects, rework, warranty claims, or downtime rise with it.',
    what: 'Manufacturers use incoming inspection, process monitoring, automated inspection, statistical control, root-cause analysis, corrective and preventive action, predictive maintenance, and standardized improvement methods.',
    why: 'Semiconductor fabrication and device assembly both handle complex, high-volume output. Early detection prevents a small variation from becoming a large batch of costly defects.',
    example: 'Equipment and process data can identify recurring variation or predict a maintenance need before unplanned downtime or widespread quality loss occurs.',
    vietnam: 'Vietnamese factories can strengthen competitiveness through automation, traceability, data-driven quality, technician development, and stronger problem-solving across local and multinational suppliers.',
    impact: 'Reliable quality systems improve yield, throughput, customer confidence, warranty performance, resource use, and the speed of corrective action.',
    activities: ['Incoming quality control', 'Process monitoring', 'Automated inspection', 'Root-cause analysis', 'Predictive maintenance', 'Continuous improvement'],
    visual: 'electronics-m2-34-quality',
    sources: ['oecdChips'],
  }),
];

const downstream = [
  chapter('Downstream Activities', {
    title: 'Distribution, Sales, and Market Access',
    objective: 'Compare consumer and business channels by reach, product complexity, inventory, support, logistics, and compliance needs.',
    intro: 'Downstream networks connect manufacturers with distributors, retailers, operators, business customers, and end users. Devices and semiconductor components require different channel structures and levels of technical support.',
    insight: 'Market access depends on availability, fulfillment, channel relationships, technical support, and compliance—not simply manufacturing a product.',
    what: 'Consumer devices move through wholesale, stores, e-commerce platforms, authorized dealers, telecom operators, and direct channels. Semiconductors move through direct sales, specialist distributors, and representatives supporting customer selection and procurement.',
    why: 'Channel design varies with customer type, order volume, product complexity, geographic reach, qualification timelines, financing, inventory risk, returns, and required engineering support.',
    example: 'An authorized semiconductor distributor can provide inventory, documentation, application support, and smaller order quantities while a device retailer supports demonstrations, financing, delivery, and returns.',
    vietnam: 'Vietnam’s electronics factories connect with international logistics, customs, distributors, and multinational customer networks while also serving domestic retail and digital channels.',
    impact: 'Channel choices should align pricing, inventory, service, territory, compliance, product complexity, and customer experience across each target market.',
    activities: ['Wholesale distribution', 'Retail and e-commerce', 'Business-to-business sales', 'Channel management', 'Logistics and fulfillment', 'Market-access compliance'],
    visual: 'electronics-m2-41-distribution',
    sources: ['nso2025'],
  }),
  chapter('Downstream Activities', {
    title: 'Branding, Marketing, and Customer Acquisition',
    objective: 'Translate technical capability into credible benefits for consumers and engineering buyers.',
    intro: 'Marketing connects products with customer needs. Consumer electronics firms differentiate through positioning, experience, reputation, content, launches, retail execution, and customer reviews, while semiconductor suppliers emphasize technical and commercial suitability.',
    insight: 'Marketing creates value when it converts technical capability into evidence-backed reasons to buy for a clearly defined customer.',
    what: 'Consumer activities include positioning, launches, demonstrations, digital content, media, creators, retail activation, reviews, and relationship management. Semiconductor marketing includes documentation, benchmarks, reference designs, developer tools, engineering support, and design-win development.',
    why: 'Device specifications can look similar, so trust, design, usability, ecosystem fit, and service influence purchasing. Business buyers need proof of performance, compatibility, reliability, capacity, support, and long-term availability.',
    example: 'A chip supplier’s sales and engineering teams may work with a device manufacturer for months to qualify a component and secure a design win before the finished product launches.',
    vietnam: 'Vietnamese manufacturers and engineering suppliers need clear capability evidence, responsive technical communication, and reliable delivery histories to win domestic and international customers.',
    impact: 'Differentiation must be meaningful and demonstrable; promotional reach without product fit, trust, or delivery capability does not create durable demand.',
    activities: ['Brand positioning', 'Product launches', 'Digital marketing', 'Technical marketing', 'Design win', 'Customer relationship management'],
    visual: 'electronics-m2-42-marketing',
  }),
  chapter('Downstream Activities', {
    title: 'After-Sales Services, Software, and Product Lifecycle Management',
    objective: 'Explain how warranties, repairs, updates, continuity planning, spare parts, and end-of-life actions extend value after sale.',
    intro: 'The value chain continues after purchase. Devices need support, software, repair, and responsible retirement, while semiconductor customers need technical guidance, change notices, supply continuity, and time to redesign when a component reaches end of life.',
    insight: 'Lifecycle support affects loyalty, reliability, regulatory exposure, repeat business, repairability, and the practical useful life of products and systems.',
    what: 'Activities include warranties, diagnostics, repair, replacement parts, security and operating-system updates, customer support, technical documentation, semiconductor lifecycle notices, last-time-buy planning, refurbishment, take-back, recycling, and disposal.',
    why: 'Connected devices can remain in service for years, and industrial or automotive semiconductor customers may depend on components for even longer. Abrupt discontinuation or unsupported software can create security and operational risk.',
    example: 'An end-of-life notice and last-time-buy period give customers time to secure supply or redesign, while device updates and repair parts preserve customer value after purchase.',
    vietnam: 'Vietnamese device businesses and service networks can strengthen repair, software support, spare-parts access, take-back, and responsible electronics lifecycle capability.',
    impact: 'Strong lifecycle management reduces disruption and waste, protects trust, and can create ongoing service, ecosystem, and customer-retention value.',
    activities: ['Warranty and repair', 'Software support', 'Customer support', 'Semiconductor lifecycle planning', 'Spare-parts management', 'End-of-life management'],
    visual: 'electronics-m2-43-service',
  }),
];

const valueCreation = [
  chapter('Inputs, Outputs & Value Creation', {
    title: 'Key Inputs and Outputs Across the Value Chain',
    objective: 'Map physical, technological, human, financial, operational, and information inputs to intermediate and final outputs.',
    intro: 'The chain transforms materials, technology, labor, capital, energy, infrastructure, and information into chips, modules, finished devices, services, knowledge, and customer outcomes. Different stages depend on different input combinations.',
    insight: 'Input availability is not enough; firms create value through the expertise, processes, coordination, and learning that convert resources into reliable outputs.',
    what: 'Inputs include wafers, chemicals, metals, glass, plastics, batteries, components, chip designs, IP, software, manufacturing recipes, facilities, equipment, water, energy, skilled people, working capital, and research investment. Outputs range from wafers and packaged chips to modules, devices, services, and production data.',
    why: 'The chain is not strictly linear. Quality results, field failures, customer behavior, manufacturing measurements, and supplier performance flow upstream to improve later designs and operating decisions.',
    example: 'Engineering talent and design software convert requirements into a verified chip design; fabrication and packaging create a component; assembly and software integration turn components into a customer-ready device.',
    vietnam: 'Vietnam combines imported technology and components with workforce, facilities, production execution, supplier services, and global customer requirements to create electronics output.',
    impact: 'A complete input-output map reveals hidden constraints, dependencies, knowledge flows, intermediate value, and improvement opportunities that unit-volume reporting can miss.',
    activities: ['Material inputs', 'Technology inputs', 'Operational inputs', 'Financial inputs', 'Intermediate outputs', 'Final outputs', 'Information outputs'],
    visual: 'electronics-m2-51-inputs',
    sources: ['nso2025', 'oecdVietnam'],
  }),
  chapter('Inputs, Outputs & Value Creation', {
    title: 'Value Creation, Value Capture, and Cost Structure',
    objective: 'Distinguish customer benefit and production contribution from the revenue and profitability retained by each participant.',
    intro: 'Value creation improves performance, functionality, reliability, efficiency, or customer experience. Value capture is the share of the resulting economic benefit that a company retains. Large production contribution does not automatically produce high margins.',
    insight: 'The stage with the greatest output volume or capital investment does not necessarily retain the most value; differentiation, scarcity, scale, utilization, customer access, and bargaining power shape profitability.',
    what: 'Design firms invest in engineering, IP, verification, and software. Fabs carry facilities, equipment, utilities, process development, and depreciation. Packaging and assembly require equipment, materials, labor, and control. Brands incur product, software, marketing, distribution, inventory, support, and warranty costs.',
    why: 'Standardized activities with many alternatives may face price pressure even when operationally important. Scarce technical capability, proprietary technology, ecosystem control, trusted brands, high switching costs, or superior execution can strengthen value capture.',
    example: 'A brand may capture value through software, ecosystem, and customer relationships, while a specialist manufacturer captures value through high yield, reliable delivery, scale, and a difficult-to-replicate process.',
    vietnam: 'Vietnam’s upgrading opportunity is to complement manufacturing scale with local supplier capability, engineering, design, testing, automation, product development, and stronger commercial relationships.',
    impact: 'Leaders should assess cost, contribution, differentiation, bargaining power, risk, and customer value together rather than infer economic position from production volume.',
    activities: ['Design and IP value', 'Manufacturing value', 'Brand and ecosystem value', 'Cost management', 'Bargaining power', 'Value-chain upgrading'],
    visual: 'electronics-m2-52-value',
    sources: ['oecdVietnam'],
  }),
  chapter('Inputs, Outputs & Value Creation', {
    title: 'Productivity, Yield, and Operational Efficiency',
    objective: 'Use yield, throughput, utilization, cycle time, quality, inventory, delivery, and resource measures as a connected operating system.',
    intro: 'Operational efficiency describes how effectively labor, equipment, materials, energy, water, time, and capital produce reliable output. The right measures vary by activity and must be interpreted alongside product complexity and quality.',
    insight: 'Efficiency gains can improve profitability without equivalent sales growth, but optimization must not sacrifice reliability, safety, quality, resilience, or flexibility.',
    what: 'Relevant indicators include yield, throughput, equipment utilization, defect and rework rates, cycle time, labor productivity, inventory turnover, on-time delivery, energy and water use, maintenance performance, and capacity availability.',
    why: 'Semiconductor economics are highly sensitive to yield and equipment use because fabrication assets are expensive. Electronics assembly adds component synchronization, line balance, labor and automation productivity, fulfillment reliability, and rapid product transitions.',
    example: 'Higher wafer yield lowers cost per functional chip, while predictive maintenance and automated inspection can protect output before downtime or defects spread.',
    vietnam: 'Vietnamese factories can improve competitiveness through manufacturability, supplier coordination, technician skills, data quality, automation, resource efficiency, and disciplined continuous improvement.',
    impact: 'Teams should optimize the true system constraint rather than maximize one local metric that merely shifts inventory, defects, delays, or cost to another stage.',
    activities: ['Yield improvement', 'Utilization', 'Cycle-time reduction', 'Automation', 'Data-driven operations', 'Resource efficiency'],
    visual: 'electronics-m2-53-efficiency',
    sources: ['oecdChips'],
  }),
];

const globalLocal = [
  chapter('Global vs. Local Value Chain', {
    title: 'Global Value Chain Structure and Geographic Specialization',
    objective: 'Explain how capability, cost, infrastructure, talent, customers, and policy distribute specialized activities across countries and regions.',
    intro: 'Electronics and semiconductor production is internationally distributed. Different locations have developed strengths in chip design, equipment, materials, fabrication, memory, packaging and testing, components, device assembly, and market access.',
    insight: 'Geographic specialization improves efficiency and access to expertise, but concentration of critical capability creates interdependence and systemic disruption risk.',
    what: 'Global networks combine specialist design firms, foundries and IDMs, equipment and materials companies, OSAT providers, component suppliers, device manufacturers, logistics partners, distributors, brands, and customer markets.',
    why: 'Capabilities accumulate through knowledge, supplier clusters, infrastructure, investment, standards, workforce depth, and customer relationships. They cannot always be duplicated quickly in response to disruption.',
    example: 'A device can be designed in one country, use chips fabricated and packaged in others, be assembled elsewhere, and then move through regional logistics and retail networks.',
    vietnam: 'Vietnam participates in an internationally coordinated network, particularly through electronics manufacturing, exports, suppliers, and selected semiconductor design and back-end activities.',
    impact: 'Companies must map where critical capability sits and balance specialization benefits against trade exposure, qualification lead times, regulatory requirements, and resilience needs.',
    activities: ['Semiconductor design', 'Wafer fabrication', 'Materials and equipment', 'Packaging and testing', 'Electronics manufacturing', 'International coordination'],
    visual: 'electronics-m2-61-global',
    sources: ['oecdChips', 'oecdVietnam'],
  }),
  chapter('Global vs. Local Value Chain', {
    title: 'Vietnam’s Position in the Global Value Chain',
    objective: 'Separate Vietnam’s electronics trade and manufacturing scale from domestic technology ownership, semiconductor depth, and retained value added.',
    intro: 'Vietnam has a significant export-oriented electronics manufacturing role supported by foreign investment and global production networks. This creates a platform for capability development, but participation alone does not prove domestic ownership of IP, product decisions, or high value capture.',
    insight: 'Vietnam can build on manufacturing scale, but durable upgrading depends on local suppliers, engineers, design and testing capability, research links, and commercially relevant specialization.',
    what: 'The National Statistics Office reports US$107.7 billion of electronics, computers, and components exports and US$150.7 billion of imports in 2025. The OECD reports chip-design and assembly, packaging, and testing capability but no operational wafer-fabrication plant in its cited 2025 assessment.',
    why: 'High gross trade flows include imported inputs and foreign-invested production. They should not be read as domestic value added, domestic company revenue, technological independence, or a complete semiconductor ecosystem.',
    example: 'Existing electronics assembly and supplier operations can support adjacent growth in process engineering, automation, testing, component production, design verification, and specialized services.',
    vietnam: 'Priority pathways include stronger domestic suppliers, semiconductor packaging and testing, chip design and verification, engineering services, workforce development, research collaboration, and dependable industrial infrastructure.',
    impact: 'Vietnam should choose capability investments by technical feasibility, market demand, learning spillovers, supplier links, and potential for retained domestic value—not by production volume alone.',
    activities: ['Electronics assembly', 'Component production', 'Semiconductor packaging and testing', 'Chip design and engineering', 'Local supplier development', 'Workforce and research development'],
    visual: 'electronics-m2-62-vietnam',
    sources: ['nso2025', 'oecdVietnam'],
  }),
  chapter('Global vs. Local Value Chain', {
    title: 'Upgrading the Local Value Chain and Reducing Dependency Risks',
    objective: 'Prioritize feasible upgrading and resilience actions while preserving access to international technology, suppliers, capital, and customers.',
    intro: 'Upgrading means developing activities with greater technological complexity, differentiation, productivity, or retained economic value. It does not require localizing every input or reproducing the entire global chain within one country.',
    insight: 'Successful upgrading balances domestic capability development with continued global integration and concentrates resources on segments where skills, infrastructure, demand, and partnerships can support competitiveness.',
    what: 'Potential pathways include supplier development, product engineering, semiconductor design and verification, advanced packaging and testing, automation, high-reliability manufacturing, technology partnerships, workforce development, and more efficient resource use.',
    why: 'Full self-sufficiency would be expensive and technically difficult because electronics and semiconductors rely on international specialization. Resilience is better served by visibility, qualified alternatives, contingency plans, durable skills, and selective domestic capability.',
    example: 'Assembly experience can become a platform for component engineering, automated testing, traceability, design-for-manufacturing support, and specialized back-end semiconductor services.',
    vietnam: 'Vietnam can map critical imported dependencies, strengthen suppliers against international standards, connect universities with industry, and attract investment that transfers useful capability rather than adding capacity alone.',
    impact: 'A phased strategy grounded in technical feasibility, commercial demand, workforce readiness, environmental performance, and learning spillovers is more sustainable than indiscriminate localization.',
    activities: ['Domestic supplier development', 'Design capability building', 'Advanced manufacturing investment', 'Technology partnerships', 'Supply-chain risk reduction', 'Workforce development', 'Sustainable manufacturing'],
    visual: 'electronics-m2-63-upgrading',
    sources: ['oecdVietnam', 'nso2025'],
  }),
];

const seed = (chapterNumber: string, question: string, application: string, correct: string) => ({
  chapter: chapterNumber,
  objective: question,
  question,
  application,
  correct,
  wrong: ['One isolated volume figure', 'A conclusion without stage boundaries', 'A decision that ignores dependencies'] as [string, string, string],
  explanation: 'Sound value-chain analysis connects the relevant stage, capability, dependencies, economics, and evidence scope.',
});

const quiz = (prefix: string, topics: string[], map?: number[]) => electronicsM2Quiz(prefix, topics.flatMap((topic, index) => [
  seed(String(map?.[index] ?? index + 1), `What is central to ${topic}?`, `A team reviews ${topic}. What should it prioritize?`, 'Specialized capability, coordination, and reliable execution'),
  seed(String(map?.[index] ?? index + 1), `Which dependency can affect ${topic}?`, `A critical dependency fails during ${topic}. What should be mapped?`, 'Technology, supplier, capacity, quality, and commercial dependencies'),
  seed(String(map?.[index] ?? index + 1), `How should ${topic} be evaluated?`, `A dashboard uses one headline number for ${topic}. What is missing?`, 'Quality, cost, value added, risk, and a consistent scope'),
]).slice(0, 10));

const bundles: ElectronicsM2LessonBundle[] = [
  {
    deck: overview,
    quiz: quiz('electronics-m2-l1', ['the integrated value chain', 'industry participants', 'business models', 'value capture'], [1, 2, 2, 1]),
    takeaways: {
      learned: 'You can map the integrated chain and compare the roles, assets, dependencies, and economics of its participants.',
      keyTakeaways: ['The semiconductor and device chains are interconnected.', 'Physical, information, technology, and financial flows move in both directions.', 'Specialized firms and integrated firms carry different risks.', 'Control of scarce capability affects bargaining power.', 'Production contribution and value capture are not identical.'],
      businessImplications: 'Map roles and dependencies before choosing outsourcing, integration, sourcing, or partnership strategies.',
      remember: 'The integrated chain is a network, not a simple linear production line.',
      nextLesson: 'Upstream Activities',
    },
  },
  {
    deck: upstream,
    quiz: quiz('electronics-m2-l2', ['research and design', 'semiconductor IP', 'materials and equipment', 'supplier networks'], [1, 1, 2, 3]),
    takeaways: {
      learned: 'You can explain how upstream design, specialized inputs, qualification, and procurement shape later performance.',
      keyTakeaways: ['Early design choices influence cost and yield.', 'Semiconductor IP and verification support differentiation.', 'Specialized inputs can become bottlenecks.', 'Qualification limits rapid supplier switching.', 'Procurement balances price with continuity and risk.'],
      businessImplications: 'Coordinate design, supplier capability, capacity, qualification, and contingency planning before production commitments.',
      remember: 'Upstream decisions determine much of the chain’s downstream cost, flexibility, and risk.',
      nextLesson: 'Midstream Activities',
    },
  },
  {
    deck: midstream,
    quiz: quiz('electronics-m2-l3', ['wafer fabrication', 'packaging and testing', 'device assembly', 'quality and optimization']),
    takeaways: {
      learned: 'You can explain how designs become reliable chips and finished devices through controlled manufacturing.',
      keyTakeaways: ['Fabrication is capital- and process-intensive.', 'Yield and utilization shape unit economics.', 'Packaging increasingly contributes performance.', 'Assembly depends on synchronized components.', 'Quality and productivity must improve together.'],
      businessImplications: 'Manage process capability, traceability, supplier coordination, yield, reliability, and equipment performance as one production system.',
      remember: 'Scale creates value only when output is reliable, usable, and economically produced.',
      nextLesson: 'Downstream Activities',
    },
  },
  {
    deck: downstream,
    quiz: quiz('electronics-m2-l4', ['distribution and sales', 'technical marketing', 'design wins', 'lifecycle management'], [1, 2, 2, 3]),
    takeaways: {
      learned: 'You can explain how channels, marketing, support, software, and lifecycle planning convert products into durable customer value.',
      keyTakeaways: ['Availability alone is not market access.', 'Device and chip channels serve different buyers.', 'Marketing must translate technical capability into customer benefit.', 'Design wins require technical and commercial trust.', 'Support and continuity extend value beyond the sale.'],
      businessImplications: 'Align channels, inventory, compliance, technical support, updates, repair, and lifecycle commitments with each customer segment.',
      remember: 'Downstream value continues through the useful life of the product.',
      nextLesson: 'Inputs, Outputs & Value Creation',
    },
  },
  {
    deck: valueCreation,
    quiz: quiz('electronics-m2-l5', ['inputs and outputs', 'value creation', 'value capture', 'operational efficiency'], [1, 2, 2, 3]),
    takeaways: {
      learned: 'You can map resources to outputs and distinguish productive contribution from retained economic value.',
      keyTakeaways: ['Physical and intangible inputs are complementary.', 'Information flows improve future decisions.', 'Cost structures differ sharply by stage.', 'Scarcity and bargaining power influence margins.', 'System efficiency matters more than isolated metrics.'],
      businessImplications: 'Measure customer benefit, capability, cost, quality, utilization, risk, and bargaining power together.',
      remember: 'High production volume does not automatically mean high domestic value added or profitability.',
      nextLesson: 'Global vs. Local Value Chain',
    },
  },
  {
    deck: globalLocal,
    quiz: quiz('electronics-m2-l6', ['global specialization', 'Vietnam’s current position', 'local upgrading', 'dependency reduction'], [1, 2, 3, 3]),
    takeaways: {
      learned: 'You can assess global specialization, Vietnam’s scoped position, and practical routes to higher-value participation.',
      keyTakeaways: ['Global specialization creates efficiency and interdependence.', 'Trade totals do not equal domestic value added.', 'Vietnam has electronics scale and selected semiconductor capabilities.', 'Upgrading requires people, suppliers, engineering, and infrastructure.', 'Resilience does not require complete self-sufficiency.'],
      businessImplications: 'Prioritize feasible capability segments, qualified alternatives, local supplier readiness, and partnerships that create durable learning.',
      remember: 'Selective capability building and global integration can reinforce one another.',
      nextLesson: '',
    },
  },
];

const keys = [
  'Value Chain Overview',
  'Upstream Activities',
  'Midstream Activities',
  'Downstream Activities',
  'Inputs, Outputs & Value Creation',
  'Global vs. Local Value Chain',
];

export const ELECTRONICS_MODULE02_DECKS: Record<string, ElectronicsM2CardData[]> = {};
export const ELECTRONICS_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ELECTRONICS_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};

bundles.forEach((bundle, index) => {
  const key = keys[index];
  ELECTRONICS_MODULE02_DECKS[key] = bundle.deck;
  ELECTRONICS_MODULE02_QUIZZES[key] = bundle.quiz;
  ELECTRONICS_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
