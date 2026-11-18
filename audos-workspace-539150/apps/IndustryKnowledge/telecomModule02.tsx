import { telecomM2Chapter, telecomM2Quiz } from './telecomM2Core';
import type { TelecomM2CardData, TelecomM2LessonBundle, TelecomM2SourceId, TelecomM2VisualKind } from './telecomM2Core';
import { renderTelecomModule02Visual } from './telecomM2Visuals';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { TelecomM2VisualKind } from './telecomM2Core';
export { renderTelecomModule02Visual };

type ChapterInput = {
  title: string; objective: string; intro: string; insight: string; what: string; why: string;
  example: string; vietnam: string; impact: string; activities: string[]; visual: TelecomM2VisualKind;
  sources?: TelecomM2SourceId[];
};

const definitions: Record<string, string> = {
  Interoperability: 'The ability of equipment, software, devices, and networks to work together through common specifications and interfaces.',
  Spectrum: 'Radio-frequency resources authorized for wireless services under national and international coordination frameworks.',
  Provisioning: 'Configuration and activation of network resources and service parameters for a customer or service provider.',
  Commissioning: 'Testing and formal acceptance that installed infrastructure is safe, compliant, and ready for operation.',
  'Quality of service': 'Defined treatment and performance parameters for traffic with particular bandwidth, latency, or availability needs.',
  'Service-level agreement': 'A contractual commitment defining service performance, support, measurement, and remedies.',
  Churn: 'The loss of customers or subscriptions during a defined period.',
  ARPU: 'Average revenue per user or subscription for a stated service scope and period.',
  'Infrastructure sharing': 'Joint use of passive assets or active network elements under commercial and regulatory arrangements.',
  'Network utilization': 'The degree to which installed capacity carries productive traffic without unacceptable congestion.',
  'Value capture': 'The revenue and profit retained by a participant after costs, obligations, and bargaining relationships.',
  'Managed connectivity': 'A service in which a provider designs, operates, monitors, and supports customer network capability.',
};

const terms = (activities: string[]) => activities.slice(0, 5).map((term) => [
  term,
  definitions[term] ?? `A core telecommunications value-chain activity within ${term.toLowerCase()}.`,
] as [string, string]);

const chapter = (lesson: string, input: ChapterInput): TelecomM2CardData => telecomM2Chapter({
  lesson, ...input, terms: terms(input.activities),
  recap: [input.insight, input.impact, `Key activities include ${input.activities.join(', ')}.`],
  sources: input.sources ?? [],
});

const overview = [
  chapter('Value Chain Overview', {
    title: 'Structure of the Telecommunications Value Chain',
    objective: 'Trace how technology, spectrum, capital, infrastructure, operations, services, and customer relationships create recurring connectivity value.',
    intro: 'The chain begins with research, standards, equipment, spectrum, and investment, then moves through deployment, operation, provisioning, distribution, and continuing support. Unlike a one-time physical product, connectivity must be delivered continuously.',
    insight: 'Telecommunications creates value by combining physical infrastructure, network technology, operating capability, and recurring service delivery.',
    what: 'Technology developers define capabilities; governments authorize spectrum; vendors supply systems; infrastructure firms build or lease assets; operators deploy and run networks; channels activate customers; support and optimization sustain service.',
    why: 'Equipment availability affects deployment, construction affects performance, operations protect reliability, and customer demand determines capacity allocation and upgrades. Information and finance flow in both directions.',
    example: 'A mobile service depends on standards and chipsets, licensed spectrum, radio sites, fiber or microwave backhaul, core systems, provisioning, billing, distribution, support, and continuous optimization.',
    vietnam: 'Vietnamese operators combine owned and partner infrastructure with domestic and global technology, then deliver consumer, enterprise, wholesale, and public-sector connectivity.',
    impact: 'Map end-to-end dependencies and ownership before assigning cost, risk, bargaining power, or value to one stage.',
    activities: ['Technology development', 'Infrastructure investment', 'Network deployment', 'Network operation', 'Service delivery', 'Customer management'],
    visual: 'telecom-m2-1', sources: ['ituSupplyChain', 'threeGpp', 'ituSpectrum'],
  }),
  chapter('Value Chain Overview', {
    title: 'Industry Participants and Business Models Across the Value Chain',
    objective: 'Compare participants by asset ownership, responsibility, customer access, recurring revenue, and capital intensity.',
    intro: 'The ecosystem contains specialists as well as integrated operators. Vendors, tower and fiber firms, operators, ISPs, MVNOs, integrators, managed-service providers, and satellite companies can collaborate and compete at different layers.',
    insight: 'Commercial relationships distribute infrastructure cost, operating responsibility, customer control, and service revenue across specialized participants.',
    what: 'Vendors sell equipment and software; infrastructure firms lease towers, ducts, fiber, or capacity; operators and ISPs provide access; MVNOs buy wholesale mobile capacity; integrators combine systems; managed providers operate enterprise environments; satellite firms sell coverage and capacity.',
    why: 'Specialization can lower duplication and increase expertise, but it creates dependency on contracts, service quality, wholesale terms, suppliers, and partner investment.',
    example: 'A tower company can lease one site to several operators, while an MVNO buys wholesale capacity and focuses on pricing, brand, segment knowledge, sales, billing, and support.',
    vietnam: 'Vietnam’s facilities-based operators work with infrastructure, equipment, software, distribution, enterprise, and international-connectivity partners while MVNOs focus more heavily on retail propositions.',
    impact: 'Business-model analysis should identify who owns scarce assets, bears capital and service risk, controls the customer, and receives recurring revenue.',
    activities: ['Network equipment vendors', 'Tower and fiber companies', 'Telecommunications operators', 'Internet service providers', 'Mobile virtual network operators', 'System integrators and managed-service providers', 'Satellite operators'],
    visual: 'telecom-m2-2', sources: ['ituSupplyChain', 'ituSharing'],
  }),
];

const upstream = [
  chapter('Upstream Activities', {
    title: 'Research, Network Standards, and Technology Development',
    objective: 'Explain how research, standards, chipsets, software, testing, and intellectual property establish network capability and compatibility.',
    intro: 'Telecommunications relies on coordinated technical foundations developed by vendors, semiconductor firms, software developers, operators, research bodies, and standards organizations.',
    insight: 'Upstream technology development determines performance, compatibility, security, investment needs, and the pace at which networks can evolve.',
    what: 'Activities include radio and optical research, international specifications, modem and networking-chip design, routing and automation software, interoperability and security testing, and standards-essential or implementation IP.',
    why: 'Networks must support devices, vendors, operators, and countries at scale. Shared specifications reduce fragmentation, while implementation quality and commercial licensing still differentiate firms.',
    example: '3GPP defines mobile-system specifications spanning radio, core, protocols, security, testing, management, and services, enabling inter-vendor and inter-operator operation.',
    vietnam: 'Vietnamese firms and institutions can participate through standards expertise, network software, equipment integration, testing, cybersecurity, and selected technology development.',
    impact: 'Standards influence ecosystems, but competitive advantage still requires useful engineering, implementation, reliability, support, and defensible IP.',
    activities: ['Telecommunications research and development', 'Standards development', 'Semiconductor and chipset development', 'Network software development', 'Technology testing and validation', 'Intellectual property development'],
    visual: 'telecom-m2-3', sources: ['threeGpp', 'ituStandards'],
  }),
  chapter('Upstream Activities', {
    title: 'Network Equipment, Materials, and Infrastructure Components',
    objective: 'Map active equipment, optical systems, passive infrastructure, power, cooling, monitoring, and upstream component dependencies.',
    intro: 'Mobile and fixed networks require specialized electronic systems and physical assets supported by semiconductors, optics, metals, batteries, connectors, software, and global logistics.',
    insight: 'Equipment quality, availability, compatibility, and lifecycle cost directly affect deployment speed, reliability, capital expenditure, and operating efficiency.',
    what: 'Inputs include antennas, radios, baseband and core systems, fiber and transceivers, amplifiers, routers, switches, gateways, towers, poles, ducts, cabinets, batteries, cooling, power management, security, and monitoring systems.',
    why: 'Networks operate for years and need upgrades, spares, software, support, energy, and environmental tolerance. Purchase price alone does not represent total ownership cost or supply risk.',
    example: 'A radio site combines antennas, active radio units, transport, cabinets, power conversion, batteries, cooling, structures, software, monitoring, and physical security.',
    vietnam: 'Vietnamese deployment depends on global and domestic suppliers, integrators, contractors, logistics, spare-parts planning, and site-specific power and environmental conditions.',
    impact: 'Procurement should evaluate performance, interoperability, security, support, energy use, roadmap, maintainability, supplier concentration, and end-of-life risk.',
    activities: ['Radio access equipment', 'Optical transmission components', 'Networking hardware', 'Power and cooling systems', 'Physical infrastructure materials', 'Security and monitoring equipment'],
    visual: 'telecom-m2-4', sources: ['ituSupplyChain'],
  }),
  chapter('Upstream Activities', {
    title: 'Spectrum, Infrastructure Planning, and Procurement',
    objective: 'Balance coverage, capacity, capital, spectrum, sites, technology, demand, vendors, and long-term operating cost.',
    intro: 'Before construction, operators estimate demand, select technologies, plan coverage and capacity, obtain spectrum and sites, allocate capital, choose suppliers, and coordinate delivery.',
    insight: 'Strong planning and procurement align technical capability with service demand and establish much of the network’s long-term cost and risk.',
    what: 'Regulators authorize spectrum under national frameworks; planners forecast traffic and select sites; finance teams allocate capital; procurement compares vendors; contracts define delivery, warranties, support, and performance; contingency plans address interruptions and concentration.',
    why: 'Spectrum bands have different propagation and capacity characteristics, while infrastructure has long asset lives and switching vendors or architectures can be difficult after deployment.',
    example: 'A 5G plan can combine lower-band coverage, mid-band capacity, densification, fiber backhaul, core upgrades, device forecasts, and phased capital linked to adoption.',
    vietnam: 'Vietnamese regulators and operators coordinate spectrum, licensing, coverage, security, deployment, investment, and supplier decisions within domestic policy and global technology ecosystems.',
    impact: 'Use scenarios and whole-life economics rather than optimize acquisition price, coverage, or capacity in isolation.',
    activities: ['Spectrum allocation and licensing', 'Network planning', 'Infrastructure financing', 'Supplier selection', 'Contract and delivery management', 'Risk and contingency planning'],
    visual: 'telecom-m2-5', sources: ['ituSpectrum', 'ituSupplyChain'],
  }),
];

const midstream = [
  chapter('Midstream Activities', {
    title: 'Network Construction, Installation, and Integration',
    objective: 'Explain how site, civil, fiber, power, equipment, software, testing, and permits become operational infrastructure.',
    intro: 'Deployment transforms plans and equipment into functioning networks through construction, installation, configuration, integration, commissioning, and handover.',
    insight: 'Construction quality and integration capability determine whether upstream technology and capital achieve intended service performance.',
    what: 'Work includes site acquisition, permits, surveys, tower and civil works, duct and fiber installation, antenna and equipment mounting, power integration, software configuration, multi-vendor interoperability, acceptance testing, documentation, and operational handover.',
    why: 'Schedules depend on access, permits, utilities, contractors, equipment, weather, safety, community coordination, and the need to protect existing services during migration.',
    example: 'A new radio site requires structural and power work, transmission, radio installation, configuration, neighbor and core integration, coverage checks, safety tests, and acceptance records.',
    vietnam: 'Vietnamese operators coordinate local authorities, infrastructure owners, utilities, vendors, contractors, engineers, and communities across dense cities and difficult terrain.',
    impact: 'Project governance should track quality, safety, interoperability, schedule, change control, as-built records, and readiness—not installed-unit counts alone.',
    activities: ['Site acquisition and preparation', 'Civil works and construction', 'Fiber deployment', 'Equipment installation', 'Network integration', 'Commissioning'],
    visual: 'telecom-m2-6', sources: ['ituSupplyChain'],
  }),
  chapter('Midstream Activities', {
    title: 'Network Operation, Maintenance, and Performance Optimization',
    objective: 'Connect monitoring, maintenance, fault response, capacity, automation, and recovery to reliability and cost.',
    intro: 'Networks require continuous management because traffic, equipment condition, software, interference, failures, and customer demand change after launch.',
    insight: 'Operations continuously create value by protecting availability, using capacity productively, controlling cost, and improving service performance.',
    what: 'Network operations centers track availability, traffic, latency, signal, alarms, and equipment health; field and remote teams perform maintenance, repair, optimization, upgrades, configuration, and disaster recovery.',
    why: 'Outages can affect large populations and critical services. Preventive and predictive maintenance can reduce failures, while capacity optimization responds to congestion and changing demand.',
    example: 'Analytics can detect recurring degradation, correlate alarms, predict equipment failure, and direct a field team before a site loses service.',
    vietnam: 'Vietnam’s expanding networks need skilled operations, accurate inventory, reliable power, route diversity, spares, automation, and tested restoration procedures.',
    impact: 'Automation improves efficiency only when supported by trustworthy telemetry, operational processes, engineering judgment, security, and accountable change management.',
    activities: ['Network monitoring', 'Preventive maintenance', 'Fault detection and repair', 'Capacity optimization', 'Automated network management', 'Disaster recovery'],
    visual: 'telecom-m2-7', sources: ['ituSupplyChain', 'ituCables'],
  }),
  chapter('Midstream Activities', {
    title: 'Connectivity Provisioning, Network Access, and Service Activation',
    objective: 'Explain how mobile, fixed, enterprise, and wholesale capacity becomes configured, usable, secure, and billable service.',
    intro: 'Provisioning connects operational infrastructure to the customer by assigning resources, credentials, policies, devices, performance parameters, and commercial records.',
    insight: 'Provisioning translates network capacity into usable and billable connectivity; accuracy affects activation time, security, billing, and experience.',
    what: 'Mobile activation configures SIM or eSIM and access rights; fixed service connects premises and customer equipment; enterprise setup defines circuits, VPNs, access controls, routing, and policies; wholesale provisioning allocates capacity and interconnection.',
    why: 'Customer types and applications require different identity, security, bandwidth, latency, availability, addressing, installation, and support arrangements.',
    example: 'An enterprise branch activation can require access installation, router configuration, VPN and firewall policies, cloud routing, monitoring, acceptance tests, billing, and SLA records.',
    vietnam: 'Vietnamese providers can reduce activation cost and delay through standardized digital workflows, accurate inventory, automated configuration, field coordination, and verification.',
    impact: 'Measure right-first-time activation, lead time, fallout, security, billing accuracy, and post-activation performance.',
    activities: ['Mobile service activation', 'Fixed broadband installation', 'Enterprise network configuration', 'Quality of service', 'Wholesale capacity provisioning', 'Service verification'],
    visual: 'telecom-m2-8',
  }),
  chapter('Midstream Activities', {
    title: 'Network Security, Quality Assurance, and Regulatory Compliance',
    objective: 'Integrate performance, security, equipment conformity, reporting, service levels, and incident response throughout operations.',
    intro: 'Technical quality, cybersecurity, safety, licensing, customer commitments, and legal obligations are ongoing requirements rather than one-time launch checks.',
    insight: 'Security, quality, and compliance protect public safety, customer trust, regulatory standing, continuity, and the legitimacy of service.',
    what: 'Activities include throughput, latency, loss, coverage, and availability tests; identity and access controls; segmentation; vulnerability and event monitoring; equipment validation; regulatory records; SLA monitoring; incident investigation; restoration; and corrective action.',
    why: 'Misconfiguration, vulnerable equipment, software flaws, traffic attacks, poor performance, or reporting failures can cause widespread service and trust damage.',
    example: 'A major incident requires detection, containment, technical and customer communication, service restoration, evidence preservation, root-cause analysis, reporting, and preventive action.',
    vietnam: 'Vietnamese operators need controls aligned with applicable spectrum, telecommunications, cybersecurity, data, quality, emergency, and consumer requirements.',
    impact: 'Embed assurance into architecture, deployment, change, supplier, and operational workflows with clear ownership and evidence.',
    activities: ['Performance testing', 'Cybersecurity controls', 'Equipment validation', 'Regulatory reporting', 'Service-level monitoring', 'Incident management'],
    visual: 'telecom-m2-9', sources: ['ituStandards', 'threeGpp'],
  }),
];

const downstream = [
  chapter('Downstream Activities', {
    title: 'Service Packaging, Pricing, and Customer Acquisition',
    objective: 'Turn network capability into segment-specific offers that cover cost, create value, and support recurring revenue.',
    intro: 'Operators commercialize networks through plans, bundles, roaming, enterprise services, wholesale arrangements, promotions, and contracted performance.',
    insight: 'Service design and pricing determine how effectively installed capacity becomes customer demand and sustainable recurring revenue.',
    what: 'Providers combine voice, data, broadband, television, devices, and digital services; choose prepaid, postpaid, tiered, unlimited, usage, or contracted pricing; segment households and organizations; and use retail, digital, reseller, and direct channels.',
    why: 'Offers must reflect purchasing power, competitive alternatives, network cost and congestion, service differentiation, support needs, and customer willingness to pay.',
    example: 'A household bundle can combine mobile lines, home fiber, television, cloud storage, installation, and loyalty benefits under one account.',
    vietnam: 'Vietnamese operators can tailor prepaid and postpaid mobile, fiber, converged, SME, enterprise, and public-sector offers while avoiding unclear or unsustainable discounting.',
    impact: 'Track acquisition quality, retained margin, usage, service cost, churn, channel economics, and network impact rather than gross additions alone.',
    activities: ['Service packaging', 'Pricing strategy', 'Customer segmentation', 'Customer acquisition', 'Promotional campaigns', 'Enterprise contract development'],
    visual: 'telecom-m2-10',
  }),
  chapter('Downstream Activities', {
    title: 'Distribution Channels, Retail Networks, and Digital Sales',
    objective: 'Coordinate direct, partner, digital, device, and enterprise channels with activation, inventory, billing, and service.',
    intro: 'Connectivity reaches customers through owned stores, authorized dealers, websites, apps, resellers, device partners, and enterprise teams. Digital self-service grows, while physical support remains relevant for devices, identity, advice, and troubleshooting.',
    insight: 'Integrated distribution increases convenience and reach while reducing acquisition friction and activation cost.',
    what: 'Owned stores provide consultation and support; dealers extend local reach; digital platforms enable comparison, registration, eSIM, payment, and account management; device partners bundle access; business teams handle complex requirements.',
    why: 'Channels depend on shared product, eligibility, identity, inventory, provisioning, billing, commission, service, complaint, and customer information.',
    example: 'A customer can select a plan online, verify identity, download an eSIM, activate service, pay digitally, and obtain support through the same account.',
    vietnam: 'Vietnam’s geographic and customer diversity supports a hybrid mix of digital journeys, operator stores, local dealers, device retailers, and enterprise account teams.',
    impact: 'Manage channel performance through conversion, acquisition cost, activation quality, complaints, fraud, retained value, and service accessibility.',
    activities: ['Owned retail stores', 'Authorized dealers and resellers', 'Digital sales platforms', 'Device partnerships', 'Business sales channels', 'Channel performance management'],
    visual: 'telecom-m2-11',
  }),
  chapter('Downstream Activities', {
    title: 'Customer Experience, Billing, and Retention',
    objective: 'Explain how network experience, transparent billing, support, analytics, and retention determine lifetime value.',
    intro: 'Telecommunications is a recurring relationship. Customers judge coverage, speed, reliability, price clarity, account control, complaint resolution, and technical support over time.',
    insight: 'Customer experience affects lifetime value through satisfaction, retention, cross-selling, cost to serve, and advocacy.',
    what: 'Billing systems generate charges and manage balances; CRM records services and interactions; support diagnoses problems; churn analytics identifies risk; loyalty offers encourage retention; experience analytics connects complaints and network data.',
    why: 'Replacing a lost customer can cost more than resolving an avoidable service or billing issue, while poorly targeted retention discounts can destroy value without solving the cause.',
    example: 'An operator can correlate repeated coverage complaints with network telemetry, fix the local issue, communicate progress, and offer an appropriate service remedy.',
    vietnam: 'Vietnamese providers can improve digital self-service, transparent packages, complaint handling, field-service coordination, proactive assurance, and data-informed retention.',
    impact: 'Measure cause-specific churn, first-contact resolution, repeat complaints, service quality, collection, digital adoption, and retained margin.',
    activities: ['Billing and payment management', 'Customer relationship management', 'Technical support', 'Churn management', 'Loyalty and retention programs', 'Customer experience analytics'],
    visual: 'telecom-m2-12',
  }),
  chapter('Downstream Activities', {
    title: 'Enterprise Solutions, Managed Connectivity, and After-Sales Services',
    objective: 'Connect enterprise networks with security, cloud, private wireless, IoT, integration, SLAs, and continuing support.',
    intro: 'Businesses need secure and reliable connectivity across sites, clouds, factories, warehouses, stores, devices, and remote users. They often buy outcomes and management rather than raw bandwidth.',
    insight: 'Managed and enterprise connectivity can differentiate providers and capture more value than basic access, but requires deeper technical and service capability.',
    what: 'Offers include managed WAN and SD-WAN, private wireless, secure access, threat monitoring, cloud and data-center connectivity, IoT, observability, configuration, maintenance, reporting, and SLA-backed support.',
    why: 'Enterprise services have longer sales and implementation cycles and require discovery, design, integration, security, change control, account management, and ongoing technical credibility.',
    example: 'A logistics network can connect warehouses and vehicles, secure access to cloud systems, prioritize operational traffic, monitor performance, and receive 24/7 incident support.',
    vietnam: 'Vietnamese providers can serve manufacturing, logistics, finance, retail, government, and other sectors by combining networks with cloud, security, integration, and managed operations.',
    impact: 'Build vertical knowledge, solution architecture, delivery governance, partner management, support, and clear service outcomes before scaling complex offers.',
    activities: ['Managed connectivity', 'Private networks', 'Secure network services', 'Cloud connectivity', 'Internet of Things connectivity', 'Technical support and maintenance'],
    visual: 'telecom-m2-13',
  }),
];

const valueCreation = [
  chapter('Inputs, Outputs & Value Creation', {
    title: 'Key Inputs and Outputs Across the Value Chain',
    objective: 'Map physical, spectrum, technology, human, financial, and regulatory inputs to direct and economy-wide outputs.',
    intro: 'Telecommunications converts towers, fiber, radio, power, spectrum, software, standards, chips, data, capital, expertise, and authorization into services used by people, organizations, and public institutions.',
    insight: 'Connectivity outputs depend on the productive combination of assets, technology, capital, people, and rights—not any one input alone.',
    what: 'Inputs include passive and active infrastructure, spectrum, identifiers, capacity, software, security, standards, engineering, technicians, capital, operating expenditure, suppliers, permits, and operational data. Outputs include mobile, fixed, wholesale, enterprise, and managed connectivity.',
    why: 'The same network output enables indirect value in commerce, cloud, education, finance, health, public administration, media, and automation.',
    example: 'Licensed spectrum, sites, radio equipment, fiber, core software, power, operations, channels, and support combine into a mobile data service that enables many downstream applications.',
    vietnam: 'Vietnam’s infrastructure and service base supports domestic digital activity while depending on both local execution and global technology inputs.',
    impact: 'Input-output mapping exposes bottlenecks, cost drivers, dependencies, underused capability, and wider customer outcomes.',
    activities: ['Physical inputs', 'Spectrum and network resources', 'Technology inputs', 'Human and financial inputs', 'Primary outputs', 'Indirect economic outputs'],
    visual: 'telecom-m2-14', sources: ['ituSupplyChain', 'ituSpectrum'],
  }),
  chapter('Inputs, Outputs & Value Creation', {
    title: 'Value Creation, Value Capture, and Cost Structure',
    objective: 'Distinguish customer and economic value from the revenue and profit retained by each participant.',
    intro: 'Coverage, capacity, reliability, latency, security, and support create value, but different participants capture it through subscriptions, leases, hardware, software, support, wholesale, or managed services.',
    insight: 'Profitability depends on how efficiently assets and operating capabilities produce valued service under each participant’s capital, cost, and bargaining structure.',
    what: 'Operators earn recurring service revenue; tower and fiber firms lease assets; vendors sell hardware, software, upgrades, and support; integrators and managed providers charge projects or recurring fees. Costs include capex, spectrum, energy, maintenance, people, sales, support, compliance, and financing.',
    why: 'Large infrastructure contribution does not guarantee high return if utilization, pricing, churn, cost, competition, or capital structure is weak.',
    example: 'Infrastructure sharing can raise asset utilization and lower duplicated cost, while an operator can diversify into cybersecurity, cloud access, and managed networks.',
    vietnam: 'Vietnamese firms can deepen value through efficient infrastructure, software, security, enterprise integration, support, and stronger local supplier capability.',
    impact: 'Assess value, revenue, cost, risk, utilization, differentiation, and customer control together rather than infer economics from traffic or asset scale.',
    activities: ['Recurring service revenue', 'Infrastructure leasing', 'Equipment and software revenue', 'Capital expenditure management', 'Operating cost optimization', 'Revenue diversification'],
    visual: 'telecom-m2-15', sources: ['ituSharing', 'ituSupplyChain'],
  }),
  chapter('Inputs, Outputs & Value Creation', {
    title: 'Productivity, Network Utilization, and Operational Efficiency',
    objective: 'Optimize utilization, sharing, maintenance, energy, automation, and service metrics without sacrificing quality or resilience.',
    intro: 'Networks are capital intensive and long lived. Productive use matters, but excessive utilization can create congestion and poor service, while excessive spare capacity can weaken returns.',
    insight: 'Efficiency means using assets productively while preserving the availability, quality, security, and resilience customers require.',
    what: 'Operators monitor traffic and capacity, share suitable assets, use predictive maintenance, optimize site power and cooling, automate provisioning and faults, and track availability, cost per subscriber, capital efficiency, ARPU, churn, and experience.',
    why: 'Local optimization can move cost or risk elsewhere. Reducing field maintenance without accurate remote diagnostics, for example, can increase outages and customer costs.',
    example: 'A shared tower can host several operators, improving asset use while each operator retains service and radio responsibilities under defined technical and commercial terms.',
    vietnam: 'Vietnam can improve network economics through passive and appropriate active sharing, energy optimization, automation, predictive maintenance, accurate inventory, and end-to-end service metrics.',
    impact: 'Optimize the true system constraint and use balanced technical, customer, risk, and financial measures.',
    activities: ['Network utilization', 'Infrastructure sharing', 'Predictive maintenance', 'Energy optimization', 'Automation', 'Performance measurement'],
    visual: 'telecom-m2-16', sources: ['ituSharing'],
  }),
];

const globalLocal = [
  chapter('Global vs. Local Value Chain', {
    title: 'Global Telecommunications Value Chain and Geographic Specialization',
    objective: 'Explain how globally developed technologies and equipment connect with locally regulated deployment and service.',
    intro: 'Research, standards, chips, software, equipment, components, cables, satellites, logistics, deployment, and service are distributed across countries according to capability and market structure.',
    insight: 'The chain combines global technology and equipment specialization with local infrastructure, regulation, operations, and customer delivery.',
    what: 'International bodies and firms develop standards and technology; specialized manufacturers produce systems; submarine, terrestrial, and satellite networks connect countries; local operators and contractors deploy access; licensed providers serve customers; global carriers connect enterprises across markets.',
    why: 'Technology benefits from common standards and scale, while spectrum, sites, permits, infrastructure, competition, customer behavior, and service obligations are strongly local.',
    example: 'A network can use globally designed chipsets and equipment connected through international cables, then be installed, licensed, optimized, sold, and supported by domestic participants.',
    vietnam: 'Vietnam integrates imported and domestic technology with local deployment, operation, regulation, customer channels, and enterprise services.',
    impact: 'Map geographic concentration and alternatives for critical technology, routes, suppliers, skills, and service functions.',
    activities: ['Global technology development', 'Equipment manufacturing', 'International connectivity', 'Local infrastructure deployment', 'National service provision', 'Cross-border enterprise connectivity'],
    visual: 'telecom-m2-17', sources: ['threeGpp', 'ituStandards', 'ituSupplyChain', 'ituCables'],
  }),
  chapter('Global vs. Local Value Chain', {
    title: 'Vietnam’s Position in the Global Telecommunications Value Chain',
    objective: 'Assess Vietnam’s strengths in operation and deployment and its opportunities in engineering, software, security, and enterprise services.',
    intro: 'Vietnam participates through domestic network operation, infrastructure deployment, services, international links, and growing technology capability while still using global equipment, chips, software, and expertise.',
    insight: 'Vietnam’s immediate strengths are operating and expanding connectivity; greater value can come from deeper engineering, digital infrastructure, software, and enterprise capability.',
    what: 'Domestic operators provide mobile, fixed, wholesale, and enterprise services; local firms build and maintain infrastructure; global partners supply technology; international routes connect cloud and internet ecosystems; education and firms develop engineering and security skills.',
    why: 'Domestic service does not imply ownership of every technology. Value capture depends on local capability, supplier participation, productivity, customer relationships, and higher-value solutions.',
    example: 'A Vietnamese provider can combine global network technology with local planning, deployment, optimization, cybersecurity, cloud connectivity, industrial integration, and managed support.',
    vietnam: 'Viettel, VNPT, MobiFone, infrastructure firms, contractors, software companies, universities, and international partners each contribute different capabilities.',
    impact: 'Measure domestic engineering, supplier quality, service exports, IP, productivity, enterprise outcomes, and retained value alongside network scale.',
    activities: ['Domestic network operation', 'Infrastructure development', 'International equipment partnerships', 'Enterprise digital connectivity', 'International transmission', 'Technical capability development'],
    visual: 'telecom-m2-18', sources: ['ituSupplyChain'],
  }),
  chapter('Global vs. Local Value Chain', {
    title: 'Upgrading the Local Value Chain and Reducing Dependency Risks',
    objective: 'Prioritize feasible domestic capability, diversified sourcing, resilient routes, research, and higher-value service development.',
    intro: 'Upgrading goes beyond more coverage. It requires engineering, qualified suppliers, software, security, integration, resilience, research, and differentiated enterprise services while remaining connected to global standards and partners.',
    insight: 'Vietnam can strengthen its position by combining international partnerships with domestic capability, diversified dependencies, and higher-value connectivity services.',
    what: 'Pathways include practical network training, local supplier qualification, network-management and security software, vendor and route diversification, backup and recovery systems, university-industry laboratories, managed networks, private connectivity, and cloud interconnection.',
    why: 'Complete technological independence is neither realistic nor necessary. The goal is to reduce critical single points of failure and increase the local capability to integrate, operate, adapt, secure, and commercialize technology.',
    example: 'An operator can qualify multiple critical suppliers, develop local automation and cybersecurity teams, test recovery across cable routes, and partner with universities on integration and optimization.',
    vietnam: 'Government, operators, vendors, contractors, universities, and enterprise customers can align training, testing, procurement, standards, research, and commercially useful projects.',
    impact: 'Use a phased roadmap with customer demand, technical milestones, security, supplier performance, resilience tests, workforce outcomes, and value capture.',
    activities: ['Local engineering development', 'Domestic supplier qualification', 'Software and cybersecurity capabilities', 'Supplier and technology diversification', 'Infrastructure resilience', 'University-industry collaboration', 'Higher-value enterprise services'],
    visual: 'telecom-m2-19', sources: ['threeGpp', 'ituStandards', 'ituSharing', 'ituCables'],
  }),
];

const seed = (chapterNumber: string, question: string, application: string, correct: string) => ({
  chapter: chapterNumber, objective: question, question, application, correct,
  wrong: ['One local metric', 'No dependency or customer context', 'A mismatched value-chain stage'] as [string, string, string],
  explanation: 'Value-chain analysis requires a defined stage, capability, dependency, customer outcome, and economic context.',
});
const quiz = (prefix: string, topics: string[], map?: number[]) => telecomM2Quiz(prefix, topics.flatMap((topic, index) => [
  seed(String(map?.[index] ?? index + 1), `What is central to ${topic}?`, `A team maps ${topic}. What should it prioritize?`, 'Specialized capability, coordination, reliability, and customer value'),
  seed(String(map?.[index] ?? index + 1), `Which dependency affects ${topic}?`, `A failure occurs in ${topic}. What should be traced?`, 'Technology, supplier, infrastructure, operational, and contractual dependencies'),
  seed(String(map?.[index] ?? index + 1), `How should ${topic} be evaluated?`, `One volume figure is used for ${topic}. What is missing?`, 'Quality, cost, utilization, resilience, and retained value'),
]).slice(0, 10));

const bundles: TelecomM2LessonBundle[] = [
  { deck: overview, quiz: quiz('telecom-m2-l1', ['value-chain structure', 'participants', 'business models', 'recurring connectivity'], [1, 2, 2, 1]), takeaways: { learned: 'You can map the chain and its specialized participants.', keyTakeaways: ['The chain combines assets and continuous service.', 'Technology and customer feedback move across stages.', 'Participants carry different capital and service risks.', 'Specialization creates efficiency and dependency.', 'Customer control affects value capture.'], businessImplications: 'Map ownership, responsibilities, contracts, and dependencies before selecting partners or integration depth.', remember: 'Connectivity value is produced continuously across an interdependent chain.', nextLesson: 'Upstream Activities' } },
  { deck: upstream, quiz: quiz('telecom-m2-l2', ['standards and R&D', 'equipment and components', 'spectrum and planning', 'procurement'], [1, 2, 3, 3]), takeaways: { learned: 'You can explain the technology, equipment, spectrum, planning, and procurement foundation.', keyTakeaways: ['Standards support interoperability.', 'Equipment economics include lifecycle cost.', 'Spectrum shapes wireless design.', 'Planning links demand and capacity.', 'Procurement embeds long-term dependencies.'], businessImplications: 'Coordinate technology, spectrum, demand, finance, security, suppliers, and whole-life economics before deployment.', remember: 'Upstream choices determine much of downstream cost and flexibility.', nextLesson: 'Midstream Activities' } },
  { deck: midstream, quiz: quiz('telecom-m2-l3', ['network construction', 'network operations', 'service provisioning', 'security and compliance']), takeaways: { learned: 'You can explain how plans become secure, operational, and billable services.', keyTakeaways: ['Deployment quality affects service.', 'Operations continuously create value.', 'Provisioning connects capacity to customers.', 'Security and assurance are ongoing.', 'Recovery needs tested processes.'], businessImplications: 'Integrate project quality, telemetry, maintenance, activation, security, service levels, and incident governance.', remember: 'A network creates value only while it operates reliably and securely.', nextLesson: 'Downstream Activities' } },
  { deck: downstream, quiz: quiz('telecom-m2-l4', ['service packaging', 'distribution', 'customer retention', 'managed enterprise services']), takeaways: { learned: 'You can explain how providers monetize, distribute, support, and extend connectivity.', keyTakeaways: ['Offers translate capacity into demand.', 'Channels need integrated systems.', 'Customer experience shapes lifetime value.', 'Billing and support affect trust.', 'Managed services can deepen value.'], businessImplications: 'Optimize offers and channels for retained value, service quality, cost to serve, and customer outcomes.', remember: 'Downstream success turns network capability into durable relationships.', nextLesson: 'Inputs, Outputs & Value Creation' } },
  { deck: valueCreation, quiz: quiz('telecom-m2-l5', ['inputs and outputs', 'value capture', 'cost structure', 'network productivity'], [1, 2, 2, 3]), takeaways: { learned: 'You can connect inputs, outputs, cost, utilization, and participant economics.', keyTakeaways: ['Physical and intangible inputs are complementary.', 'Connectivity enables wider economic output.', 'Value and value capture differ.', 'Utilization affects returns.', 'Efficiency must preserve quality and resilience.'], businessImplications: 'Use balanced technical, customer, risk, and financial measures across the end-to-end system.', remember: 'High utilization is useful only when service remains reliable.', nextLesson: 'Global vs. Local Value Chain' } },
  { deck: globalLocal, quiz: quiz('telecom-m2-l6', ['global specialization', 'Vietnam’s position', 'local upgrading', 'dependency reduction'], [1, 2, 3, 3]), takeaways: { learned: 'You can compare global specialization with Vietnam’s current and potential roles.', keyTakeaways: ['Technology supply is global.', 'Deployment and service are strongly local.', 'Vietnam is strong in operation and infrastructure.', 'Domestic capability can deepen value.', 'Resilience does not require complete self-sufficiency.'], businessImplications: 'Build selected engineering, supplier, software, security, resilience, and enterprise capabilities while maintaining global partnerships.', remember: 'Global integration and local capability can reinforce one another.', nextLesson: '' } },
];

const keys = ['Value Chain Overview', 'Upstream Activities', 'Midstream Activities', 'Downstream Activities', 'Inputs, Outputs & Value Creation', 'Global vs. Local Value Chain'];
export const TELECOM_MODULE02_DECKS: Record<string, TelecomM2CardData[]> = {};
export const TELECOM_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const TELECOM_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
bundles.forEach((bundle, index) => { const key = keys[index]; TELECOM_MODULE02_DECKS[key] = bundle.deck; TELECOM_MODULE02_QUIZZES[key] = bundle.quiz; TELECOM_MODULE02_TAKEAWAYS[key] = bundle.takeaways; });
