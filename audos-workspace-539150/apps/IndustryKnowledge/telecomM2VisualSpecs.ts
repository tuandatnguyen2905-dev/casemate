import type { VisualSpec } from './fashionVisualKit';

export interface TelecomChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Telecommunications & Connectivity Module 02, keyed by visualKind. */
export const TELECOM_M2_VISUALS: Record<string, TelecomChapterVisual> = {
  'telecom-m2-1': {
    heading: 'Who hands what to whom, from technology to continuing service',
    intro: 'The chain begins with research, standards, equipment, spectrum and investment, then moves through deployment, operation, provisioning, distribution and continuing support.',
    spec: {
      layout: 'flow', title: 'Structure of the Telecommunications Value Chain', kicker: '',
      steps: [
        { label: 'Define capabilities', detail: 'Standards and chipsets', owner: 'Technology developers' },
        { label: 'Authorize spectrum', detail: 'Licensed radio frequencies', owner: 'Governments' },
        { label: 'Supply and build assets', detail: 'Systems, sites, fiber or microwave backhaul', owner: 'Vendors and infrastructure firms' },
        { label: 'Deploy and run networks', detail: 'Radio, core, provisioning and billing', owner: 'Operators' },
        { label: 'Activate customers', detail: 'Distribution and sales', owner: 'Channels' },
        { label: 'Sustain the service', detail: 'Support and continuous optimization', kind: 'outcome', owner: 'Operators and support teams' },
      ],
      loop: 'Customer demand determines capacity allocation and upgrades; information and finance flow in both directions.',
      note: 'Vietnamese operators combine owned and partner infrastructure with domestic and global technology to deliver consumer, enterprise, wholesale and public-sector connectivity.',
      takeaway: 'Telecommunications creates value by combining physical infrastructure, network technology, operating capability, and recurring service delivery.',
    },
  },
  'telecom-m2-2': {
    heading: 'Specialists around the operator share cost, risk and the customer',
    intro: 'Vendors, tower and fiber firms, operators, ISPs, MVNOs, integrators, managed-service providers and satellite companies can collaborate and compete at different layers.',
    spec: {
      layout: 'ecosystem', title: 'Industry Participants and Business Models Across the Value Chain', kicker: '',
      center: { label: 'Operators and ISPs', detail: 'Provide network access to customers' },
      actors: [
        { label: 'Network equipment vendors', relation: 'Sell equipment and software', flows: ['product', 'money'] },
        { label: 'Tower and fiber companies', relation: 'Lease towers, ducts, fiber or capacity', flows: ['service', 'money'] },
        { label: 'MVNOs', relation: 'Buy wholesale mobile capacity; own pricing, brand, billing', flows: ['money', 'service'] },
        { label: 'System integrators', relation: 'Combine systems', flows: ['service', 'information'] },
        { label: 'Managed-service providers', relation: 'Operate enterprise environments', flows: ['service', 'money'] },
        { label: 'Satellite operators', relation: 'Sell coverage and capacity', flows: ['service', 'money'] },
      ],
      note: 'A tower company can lease one site to several operators. Specialization lowers duplication but creates dependency on contracts, wholesale terms, suppliers and partner investment.',
      takeaway: 'Commercial relationships distribute infrastructure cost, operating responsibility, customer control, and service revenue across specialized participants.',
    },
  },
  'telecom-m2-3': {
    heading: 'Shared standards first, then firms differentiate on implementation',
    intro: 'Shared specifications reduce fragmentation, while implementation quality and commercial licensing still differentiate firms.',
    spec: {
      layout: 'pathway', title: 'Research, Network Standards, and Technology Development', kicker: '',
      trunk: [
        { label: 'Radio and optical research', detail: 'Vendors, operators and research bodies' },
        { label: 'International specifications', detail: '3GPP covers radio, core, protocols, security and services' },
      ],
      optionsLabel: 'Where firms differentiate — parallel capabilities, not steps',
      options: [
        { label: 'Modem and networking chips', detail: 'Semiconductor and chipset design' },
        { label: 'Network software', detail: 'Routing and automation' },
        { label: 'Testing and validation', detail: 'Interoperability and security testing' },
        { label: 'Intellectual property', detail: 'Standards-essential or implementation IP' },
      ],
      note: 'Vietnamese firms and institutions can participate through standards expertise, network software, equipment integration, testing, cybersecurity and selected technology development.',
      takeaway: 'Upstream technology development determines performance, compatibility, security, investment needs, and the pace at which networks can evolve.',
    },
  },
  'telecom-m2-4': {
    heading: 'The equipment families inside a working network',
    intro: 'Mobile and fixed networks require specialized electronic systems and physical assets supported by semiconductors, optics, metals, batteries, connectors, software and global logistics.',
    spec: {
      layout: 'taxonomy', title: 'Network Equipment, Materials, and Infrastructure Components', kicker: '',
      root: 'Network equipment and materials', rootDetail: 'Categories bought and maintained over many years',
      groups: [
        { label: 'Radio access equipment', items: ['Antennas', 'Radios', 'Baseband and core'] },
        { label: 'Optical transmission', items: ['Fiber', 'Transceivers', 'Amplifiers'] },
        { label: 'Networking hardware', items: ['Routers', 'Switches', 'Gateways'] },
        { label: 'Power and cooling', items: ['Batteries', 'Cooling', 'Power management'] },
        { label: 'Physical infrastructure', items: ['Towers', 'Poles', 'Ducts', 'Cabinets'] },
        { label: 'Security and monitoring', detail: 'Physical security and system monitoring' },
      ],
      note: 'Purchase price alone does not represent total ownership cost or supply risk: evaluate interoperability, security, support, energy use, roadmap, maintainability, supplier concentration and end-of-life risk.',
      takeaway: 'Equipment quality, availability, compatibility, and lifecycle cost directly affect deployment speed, reliability, capital expenditure, and operating efficiency.',
    },
  },
  'telecom-m2-5': {
    heading: 'Planning decisions made before any construction starts',
    intro: 'Before construction, operators estimate demand, select technologies, plan coverage and capacity, obtain spectrum and sites, allocate capital, choose suppliers and coordinate delivery.',
    spec: {
      layout: 'flow', title: 'Spectrum, Infrastructure Planning, and Procurement', kicker: '',
      steps: [
        { label: 'Forecast demand', detail: 'Traffic and device forecasts', owner: 'Planners' },
        { label: 'Plan coverage and capacity', detail: 'Bands, sites and technology choice', owner: 'Planners' },
        { label: 'Obtain spectrum', detail: 'Authorized under national frameworks', owner: 'Regulators' },
        { label: 'Allocate capital', detail: 'Phased and linked to adoption', owner: 'Finance teams' },
        { label: 'Select suppliers', detail: 'Compare vendors on whole-life terms', owner: 'Procurement' },
        { label: 'Contract and deliver', detail: 'Warranties, support, performance, contingencies', kind: 'outcome', owner: 'Procurement and delivery' },
      ],
      note: 'Example: a 5G plan can combine lower-band coverage, mid-band capacity, densification, fiber backhaul and core upgrades. Switching vendors or architectures after deployment can be difficult.',
      takeaway: 'Strong planning and procurement align technical capability with service demand and establish much of the network’s long-term cost and risk.',
    },
  },
  'telecom-m2-6': {
    heading: 'How a planned site becomes accepted, working infrastructure',
    intro: 'Deployment transforms plans and equipment into functioning networks through construction, installation, configuration, integration, commissioning and handover.',
    spec: {
      layout: 'flow', title: 'Network Construction, Installation, and Integration', kicker: '',
      steps: [
        { label: 'Site acquisition and permits', detail: 'Surveys, access and local approvals' },
        { label: 'Civil and tower works', detail: 'Structural and power work' },
        { label: 'Duct and fiber installation', detail: 'Transmission to the site' },
        { label: 'Equipment and power mounting', detail: 'Antennas, radios, power integration' },
        { label: 'Configuration and integration', detail: 'Software, neighbor and core, multi-vendor' },
        { label: 'Acceptance and handover', detail: 'Coverage and safety tests, as-built records', kind: 'outcome' },
      ],
      note: 'Schedules depend on access, permits, utilities, contractors, weather, safety and community coordination. In Vietnam, operators coordinate local authorities, infrastructure owners and communities across dense cities and difficult terrain.',
      takeaway: 'Construction quality and integration capability determine whether upstream technology and capital achieve intended service performance.',
    },
  },
  'telecom-m2-7': {
    heading: 'Four ways operations create value after launch',
    intro: 'Networks require continuous management because traffic, equipment condition, software, interference, failures and customer demand change after launch.',
    spec: {
      layout: 'driverTree', title: 'Network Operation, Maintenance, and Performance Optimization', kicker: '',
      root: { label: 'Value from network operations', detail: 'Created continuously, not once' },
      drivers: [
        { label: 'Protect availability', detail: 'Outages can affect large populations', children: [{ label: 'Preventive maintenance' }, { label: 'Fault detection and repair' }, { label: 'Disaster recovery' }] },
        { label: 'Use capacity productively', children: [{ label: 'Traffic monitoring' }, { label: 'Capacity optimization', detail: 'Responds to congestion' }] },
        { label: 'Control cost', children: [{ label: 'Automated management', detail: 'Needs trustworthy telemetry' }, { label: 'Predictive dispatch', detail: 'Field team before a site fails' }] },
        { label: 'Improve performance', children: [{ label: 'Latency and signal tracking' }, { label: 'Upgrades and configuration' }] },
      ],
      note: 'Vietnam’s expanding networks need skilled operations, accurate inventory, reliable power, route diversity, spares, automation and tested restoration procedures.',
      takeaway: 'Operations continuously create value by protecting availability, using capacity productively, controlling cost, and improving service performance.',
    },
  },
  'telecom-m2-8': {
    heading: 'Four provisioning routes that turn capacity into billable service',
    intro: 'Provisioning connects operational infrastructure to the customer by assigning resources, credentials, policies, devices, performance parameters and commercial records.',
    spec: {
      layout: 'pathway', title: 'Connectivity Provisioning, Network Access, and Service Activation', kicker: '',
      trunk: [
        { label: 'Operational network capacity', detail: 'Built, integrated and running' },
      ],
      optionsLabel: 'Provisioning by service type — alternatives, not steps',
      options: [
        { label: 'Mobile activation', detail: 'SIM or eSIM and access rights' },
        { label: 'Fixed installation', detail: 'Premises connection and customer equipment' },
        { label: 'Enterprise configuration', detail: 'Circuits, VPNs, access controls, routing, policies' },
        { label: 'Wholesale provisioning', detail: 'Capacity and interconnection allocation' },
      ],
      afterLabel: 'Common finish',
      after: [
        { label: 'Service verification', detail: 'Acceptance tests and quality of service' },
        { label: 'Usable, billable service', detail: 'Billing and SLA records in place', kind: 'outcome' },
      ],
      note: 'Measure right-first-time activation, lead time, fallout, security, billing accuracy and post-activation performance. Vietnamese providers can cut delay through standardized digital workflows and automated configuration.',
      takeaway: 'Provisioning translates network capacity into usable and billable connectivity; accuracy affects activation time, security, billing, and experience.',
    },
  },
  'telecom-m2-9': {
    heading: 'The response sequence for a major network incident',
    intro: 'Technical quality, cybersecurity, safety, licensing, customer commitments and legal obligations are ongoing requirements rather than one-time launch checks.',
    spec: {
      layout: 'flow', title: 'Network Security, Quality Assurance, and Regulatory Compliance', kicker: '',
      steps: [
        { label: 'Detect', detail: 'Event monitoring and service-level alarms' },
        { label: 'Contain', detail: 'Limit spread across the network' },
        { label: 'Communicate', detail: 'Technical and customer communication' },
        { label: 'Restore service', detail: 'Preserve evidence while restoring' },
        { label: 'Find root cause', detail: 'Root-cause analysis' },
        { label: 'Report and prevent', detail: 'Regulatory reporting and preventive action', kind: 'outcome' },
      ],
      loop: 'Corrective action feeds back into architecture, change, supplier and operational controls.',
      note: 'Routine assurance runs alongside: throughput, latency, loss and availability tests, identity controls, segmentation, equipment validation and SLA monitoring. Vietnamese operators need controls aligned with applicable spectrum, telecommunications, cybersecurity, data, quality, emergency and consumer requirements.',
      takeaway: 'Security, quality, and compliance protect public safety, customer trust, regulatory standing, continuity, and the legitimacy of service.',
    },
  },
  'telecom-m2-10': {
    heading: 'The building blocks operators combine into an offer',
    intro: 'Operators commercialize networks through plans, bundles, roaming, enterprise services, wholesale arrangements, promotions and contracted performance.',
    spec: {
      layout: 'taxonomy', title: 'Service Packaging, Pricing, and Customer Acquisition', kicker: '',
      root: 'A segment-specific offer', rootDetail: 'Choices made together for each segment',
      groups: [
        { label: 'Service components', items: ['Voice and data', 'Broadband', 'Television', 'Devices', 'Digital services'] },
        { label: 'Pricing models', items: ['Prepaid', 'Postpaid', 'Tiered', 'Unlimited', 'Usage', 'Contracted'] },
        { label: 'Segments', items: ['Households', 'SMEs', 'Enterprises', 'Public sector'] },
        { label: 'Acquisition routes', items: ['Retail', 'Digital', 'Reseller', 'Direct'] },
      ],
      note: 'Example: a household bundle combines mobile lines, home fiber, television, cloud storage, installation and loyalty benefits under one account. Track acquisition quality, retained margin and churn, not gross additions alone, and avoid unclear or unsustainable discounting.',
      takeaway: 'Service design and pricing determine how effectively installed capacity becomes customer demand and sustainable recurring revenue.',
    },
  },
  'telecom-m2-11': {
    heading: 'What each sales channel contributes to one customer account',
    intro: 'Digital self-service grows, while physical support remains relevant for devices, identity, advice and troubleshooting.',
    spec: {
      layout: 'table', title: 'Distribution Channels, Retail Networks, and Digital Sales', kicker: '',
      headers: ['Channel', 'What it does', 'Why it stays in the mix'],
      rows: [
        { label: 'Owned retail stores', a: 'Consultation and support', b: 'Devices, identity checks and troubleshooting' },
        { label: 'Authorized dealers', a: 'Extend local reach', b: 'Geographic and customer diversity' },
        { label: 'Digital platforms', a: 'Compare, register, eSIM, pay, manage', b: 'Growing self-service journeys' },
        { label: 'Device partners', a: 'Bundle access with devices', b: 'Connectivity arrives with the device' },
        { label: 'Business sales teams', a: 'Handle complex requirements', b: 'Enterprise needs exceed self-service' },
      ],
      note: 'All channels share product, eligibility, identity, inventory, provisioning, billing, commission and service data. Manage them through conversion, acquisition cost, activation quality, complaints, fraud and retained value.',
      takeaway: 'Integrated distribution increases convenience and reach while reducing acquisition friction and activation cost.',
    },
  },
  'telecom-m2-12': {
    heading: 'Fixing the cause retains value; a blanket discount may not',
    intro: 'Telecommunications is a recurring relationship: customers judge coverage, speed, reliability, price clarity, account control, complaint resolution and support over time.',
    spec: {
      layout: 'compare', title: 'Customer Experience, Billing, and Retention', kicker: '',
      leftTitle: 'Cause-led retention', rightTitle: 'Poorly targeted retention discount',
      rows: [
        { label: 'Starting signal', a: 'Repeated complaints matched to network telemetry', b: 'A churn-risk flag alone' },
        { label: 'Response', a: 'Fix the local issue and communicate progress', b: 'Offer a discount' },
        { label: 'Underlying problem', a: 'Resolved, with an appropriate remedy', b: 'Left unsolved' },
        { label: 'Economic effect', a: 'Avoids costly replacement of a lost customer', b: 'Can destroy value' },
      ],
      note: 'Measure cause-specific churn, first-contact resolution, repeat complaints, service quality, collection, digital adoption and retained margin. Billing, CRM, support and experience analytics supply the evidence.',
      takeaway: 'Customer experience affects lifetime value through satisfaction, retention, cross-selling, cost to serve, and advocacy.',
    },
  },
  'telecom-m2-13': {
    heading: 'Managed enterprise connectivity versus basic access',
    intro: 'Businesses need secure, reliable connectivity across sites, clouds, factories, warehouses, stores, devices and remote users, and often buy outcomes and management rather than raw bandwidth.',
    spec: {
      layout: 'compare', title: 'Enterprise Solutions, Managed Connectivity, and After-Sales Services', kicker: '',
      leftTitle: 'Basic access', rightTitle: 'Managed enterprise connectivity',
      rows: [
        { label: 'What is bought', a: 'Raw bandwidth', b: 'Outcomes and management' },
        { label: 'Scope', a: 'Connectivity to a site', b: 'SD-WAN, private wireless, security, cloud, IoT' },
        { label: 'Sales and implementation', a: 'Shorter cycle', b: 'Longer cycle: discovery, design, integration' },
        { label: 'Value potential', a: 'Basic access value', b: 'Can differentiate and capture more value' },
      ],
      note: 'Example: a logistics network connects warehouses and vehicles, secures cloud access, prioritizes operational traffic and monitors performance. Build vertical knowledge, solution architecture and delivery governance before scaling complex offers.',
      takeaway: 'Managed and enterprise connectivity can differentiate providers and capture more value than basic access, but requires deeper technical and service capability.',
    },
  },
  'telecom-m2-14': {
    heading: 'Inputs combine into connectivity, which enables value elsewhere',
    intro: 'Telecommunications converts towers, fiber, radio, power, spectrum, software, standards, chips, data, capital, expertise and authorization into services used by people, organizations and public institutions.',
    spec: {
      layout: 'pathway', title: 'Key Inputs and Outputs Across the Value Chain', kicker: '',
      trunk: [
        { label: 'Physical and spectrum inputs', detail: 'Infrastructure, spectrum, identifiers, capacity' },
        { label: 'Technology, people and capital', detail: 'Software, standards, engineers, capital, permits' },
        { label: 'Primary outputs', detail: 'Mobile, fixed, wholesale, enterprise, managed connectivity' },
      ],
      optionsLabel: 'Indirect economic outputs — uses the same output enables, not steps',
      options: [
        { label: 'Commerce' },
        { label: 'Cloud' },
        { label: 'Education' },
        { label: 'Finance' },
        { label: 'Health' },
        { label: 'Public administration' },
      ],
      note: 'Example: licensed spectrum, sites, radio equipment, fiber, core software, power, operations, channels and support combine into one mobile data service. Vietnam’s base depends on both local execution and global technology inputs.',
      takeaway: 'Connectivity outputs depend on the productive combination of assets, technology, capital, people, and rights—not any one input alone.',
    },
  },
  'telecom-m2-15': {
    heading: 'Profit depends on capture, cost and the conditions for return',
    intro: 'Coverage, capacity, reliability, latency, security and support create value, but different participants capture it through subscriptions, leases, hardware, software, support, wholesale or managed services.',
    spec: {
      layout: 'driverTree', title: 'Value Creation, Value Capture, and Cost Structure', kicker: '',
      root: { label: 'Participant profitability', detail: 'Not inferred from traffic or asset scale' },
      drivers: [
        { label: 'Value capture', detail: 'How each participant earns', children: [{ label: 'Recurring service revenue', detail: 'Operators' }, { label: 'Asset leases', detail: 'Tower and fiber firms' }, { label: 'Hardware, software, support', detail: 'Vendors' }, { label: 'Project or recurring fees', detail: 'Integrators and managed providers' }] },
        { label: 'Cost structure', children: [{ label: 'Capex and spectrum' }, { label: 'Energy and maintenance' }, { label: 'People, sales, support' }, { label: 'Compliance and financing' }] },
        { label: 'Return conditions', children: [{ label: 'Utilization' }, { label: 'Pricing and churn' }, { label: 'Competition and capital structure' }] },
      ],
      note: 'Infrastructure sharing can raise asset utilization and lower duplicated cost, while operators can diversify into cybersecurity, cloud access and managed networks.',
      takeaway: 'Profitability depends on how efficiently assets and operating capabilities produce valued service under each participant’s capital, cost, and bargaining structure.',
    },
  },
  'telecom-m2-16': {
    heading: 'Efficiency levers and the guardrail each one needs',
    intro: 'Productive use matters, but excessive utilization can create congestion and poor service, while excessive spare capacity can weaken returns.',
    spec: {
      layout: 'table', title: 'Productivity, Network Utilization, and Operational Efficiency', kicker: '',
      headers: ['Lever', 'What it improves', 'Guardrail'],
      rows: [
        { label: 'Capacity utilization', a: 'Productive use of installed capacity', b: 'Avoid congestion and excess spare capacity' },
        { label: 'Infrastructure sharing', a: 'Asset use, less duplicated cost', b: 'Each operator keeps service and radio duties' },
        { label: 'Fewer field visits', a: 'Maintenance cost', b: 'Needs accurate remote diagnostics' },
        { label: 'Predictive maintenance', a: 'Fewer failures', b: 'Track availability end to end' },
        { label: 'Energy optimization', a: 'Site power and cooling cost', b: 'Preserve availability and resilience' },
        { label: 'Automation', a: 'Provisioning and fault handling', b: 'Balance with customer and risk measures' },
      ],
      note: 'Local optimization can move cost or risk elsewhere: cutting field maintenance without accurate remote diagnostics can increase outages and customer costs. Vietnam can combine passive and appropriate active sharing, energy optimization and end-to-end service metrics.',
      takeaway: 'Efficiency means using assets productively while preserving the availability, quality, security, and resilience customers require.',
    },
  },
  'telecom-m2-17': {
    heading: 'What is global and what stays local in the telecom chain',
    intro: 'Research, standards, chips, software, equipment, components, cables, satellites, logistics, deployment and service are distributed across countries according to capability and market structure.',
    spec: {
      layout: 'compare', title: 'Global Telecommunications Value Chain and Geographic Specialization', kicker: '',
      leftTitle: 'Global specialization', rightTitle: 'Local delivery',
      rows: [
        { label: 'Technology', a: 'Standards and chipsets developed internationally', b: 'Installed and optimized by domestic participants' },
        { label: 'Equipment', a: 'Specialized manufacturers produce systems', b: 'Local operators and contractors deploy access' },
        { label: 'Connectivity', a: 'Submarine, terrestrial, satellite links', b: 'National networks and local sites' },
        { label: 'Rules', a: 'Common standards and scale', b: 'Spectrum, sites, permits, competition, obligations' },
        { label: 'Customers', a: 'Global carriers serve cross-border enterprises', b: 'Licensed providers sell and support service' },
      ],
      note: 'Vietnam integrates imported and domestic technology with local deployment, operation, regulation, customer channels and enterprise services. Map geographic concentration and alternatives for critical technology, routes, suppliers and skills.',
      takeaway: 'The chain combines global technology and equipment specialization with local infrastructure, regulation, operations, and customer delivery.',
    },
  },
  'telecom-m2-18': {
    heading: 'The participants that make up Vietnam’s place in the chain',
    intro: 'Vietnam participates through domestic network operation, infrastructure deployment, services, international links and growing technology capability while still using global equipment, chips, software and expertise.',
    spec: {
      layout: 'ecosystem', title: 'Vietnam’s Position in the Global Telecommunications Value Chain', kicker: '',
      center: { label: 'Vietnam’s connectivity base', detail: 'Strongest today in operating and expanding networks' },
      actors: [
        { label: 'Viettel, VNPT, MobiFone', relation: 'Domestic operators: mobile, fixed, wholesale, enterprise', flows: ['service', 'money'] },
        { label: 'Infrastructure firms and contractors', relation: 'Build and maintain infrastructure', flows: ['service'] },
        { label: 'Software companies', relation: 'Software and cybersecurity capability', flows: ['product', 'information'] },
        { label: 'Universities', relation: 'Develop engineering and security skills', flows: ['information'] },
        { label: 'International partners', relation: 'Supply equipment, chips, software, expertise', flows: ['product', 'money'] },
        { label: 'International routes', relation: 'Connect cloud and internet ecosystems', flows: ['service'] },
      ],
      note: 'Domestic service does not imply ownership of every technology. Measure domestic engineering, supplier quality, service exports, IP, productivity and retained value alongside network scale. Order is not a ranking.',
      takeaway: 'Vietnam’s immediate strengths are operating and expanding connectivity; greater value can come from deeper engineering, digital infrastructure, software, and enterprise capability.',
    },
  },
  'telecom-m2-19': {
    heading: 'Three upgrade paths pursued together, not in sequence',
    intro: 'Upgrading goes beyond more coverage: complete technological independence is neither realistic nor necessary, so the goal is fewer critical single points of failure and more local capability.',
    spec: {
      layout: 'taxonomy', title: 'Upgrading the Local Value Chain and Reducing Dependency Risks', kicker: '',
      root: 'Upgrading the local value chain', rootDetail: 'Staying connected to global standards and partners',
      groups: [
        { label: 'Build domestic capability', items: ['Local engineering', 'Supplier qualification', 'Software and cybersecurity', 'University-industry labs'] },
        { label: 'Reduce dependency risk', items: ['Vendor diversification', 'Route diversification', 'Backup and recovery'] },
        { label: 'Move to higher-value services', items: ['Managed networks', 'Private connectivity', 'Cloud interconnection'] },
      ],
      note: 'Example: an operator qualifies multiple critical suppliers, builds local automation and cybersecurity teams, tests recovery across cable routes and partners with universities. Use a phased roadmap with demand, milestones, resilience tests and value capture.',
      takeaway: 'Vietnam can strengthen its position by combining international partnerships with domestic capability, diversified dependencies, and higher-value connectivity services.',
    },
  },
};
