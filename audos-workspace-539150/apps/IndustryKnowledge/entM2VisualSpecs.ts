import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Enterprise Software & IT Services Module 02, keyed by visualKind. */
export const ENT_M2_VISUALS: Record<string, ChapterVisual> = {
  'ent-m2-11-structure': {
    heading: 'A chain that loops back on itself',
    intro: 'Enterprise software keeps changing after delivery, so the chain does not stop at the customer. Follow the stages, then notice how feedback returns to the start.',
    spec: {
      layout: 'flow', title: 'Value Chain Structure and Main Stages', kicker: '',
      steps: [
        { label: 'Upstream inputs', detail: 'Talent, development tools, cloud infrastructure, databases, cybersecurity technologies and software components', kind: 'stage' },
        { label: 'Midstream development and delivery', detail: 'Requirements become software products, configured systems, integrations and managed solutions', kind: 'stage' },
        { label: 'Downstream adoption', detail: 'Deploy solutions, train users, manage change, monitor performance and give technical support', kind: 'stage' },
        { label: 'Customer outcomes and optimisation', detail: 'The business benefit the customer bought, kept improving over the operating life', kind: 'outcome' },
      ],
      loop: 'Customer feedback, product telemetry, service incidents and usage data flow back upstream to improve the software and the service.',
      note: 'FPT spans several stages, with technology revenue of VND 44,475 billion (+13.7%) in 2025, company-reported. The 80,052 active digital technology firms is an industry-wide official count; no Vietnam split of value by stage was found.',
      takeaway: 'Advantage comes from how well participants coordinate across the stages, not from any one stage working alone.',
    },
  },
  'ent-m2-12-participants': {
    heading: 'Every participant holds one piece, the customer included',
    intro: 'Specialists surround each enterprise solution, and the customer is one of them. Notice what each participant contributes and what only the customer can supply.',
    spec: {
      layout: 'ecosystem', title: 'Key Participants and Their Roles', kicker: '',
      center: { label: 'Enterprise solution', detail: 'A working system that delivers the intended business benefit' },
      actors: [
        { label: 'Software vendors', relation: 'Develop applications, platforms, APIs, upgrades and product support', flows: ['product'] },
        { label: 'Cloud and infrastructure providers', relation: 'Supply computing, storage, networking, databases and platform services', flows: ['service'] },
        { label: 'Consulting and systems integrators', relation: 'Turn requirements into architecture, implementation plans and integrated systems', flows: ['service', 'information'] },
        { label: 'Managed-service providers', relation: 'Run development, maintenance, technical support, infrastructure operations and monitoring', flows: ['service'] },
        { label: 'Technology partners and resellers', relation: 'Handle licensing, distribution, implementation and access to specialist solutions', flows: ['product', 'money'] },
        { label: 'Enterprise customers', relation: 'Supply requirements, data and domain knowledge; redesign processes and train employees', flows: ['information', 'money'] },
      ],
      note: 'Tuoi Tre News reports more than 2,100 Vietnamese firms exporting digital products and services among about 80,000 technology firms, with overseas revenue of about US$15 billion in 2025; press-reported, scope not defined.',
      takeaway: 'No provider needs to own every capability, but clear accountability across boundaries reduces integration risk.',
    },
  },
  'ent-m2-13-flows': {
    heading: 'What moves through the chain besides money',
    intro: 'Code, data, payments, know-how and responsibility all travel at once. Read each row to see what moves and the route it takes.',
    spec: {
      layout: 'table', title: 'Value Flows, Dependencies, and Industry Economics', kicker: '',
      headers: ['Flow', 'What moves', 'How it travels'],
      rows: [
        { label: 'Technology flow', a: 'Software, APIs, cloud resources and technical documentation', b: 'From vendors to customers' },
        { label: 'Information flow', a: 'Requirements, business data, performance metrics and incident reports', b: 'Between customers and providers' },
        { label: 'Financial flow', a: 'Payments from customers', b: 'Subscriptions, licences, project milestones, usage fees and managed-service contracts' },
        { label: 'Knowledge reuse', a: 'Project experience, code, templates and standard configurations', b: 'Through implementation, support and product feedback' },
        { label: 'Risk allocation', a: 'Responsibility for uptime, data security, intellectual property and service levels', b: 'By agreeing who answers for each outcome' },
      ],
      note: 'Software copies to more customers at low incremental cost, while services scale with skilled labour and utilisation. FPT reports overseas IT services revenue of VND 35,382 billion (+14.3%) in 2025 as it shifts toward managed services; company-reported.',
      takeaway: 'Providers that package project experience into reusable assets gain scale while staying relevant to each customer.',
    },
  },
  'ent-m2-21-talent': {
    heading: 'Skills set the speed limit for the whole chain',
    intro: 'In this industry the factory floor is a team of people. See which activities raise delivery productivity, then check the talent figures for signs of strain.',
    spec: {
      layout: 'driverTree', title: 'Talent, Knowledge, and Research Inputs', kicker: '',
      root: { label: 'Delivery productivity', detail: 'How fast and how well solutions can be designed, built and operated' },
      drivers: [
        { label: 'Technical recruitment', detail: 'Developers, cloud engineers, cybersecurity specialists, consultants and data professionals' },
        { label: 'Skills development', detail: 'Training in programming languages, enterprise platforms, cloud architecture, AI and security' },
        { label: 'Research and experimentation', detail: 'Testing emerging technologies, frameworks and reusable approaches' },
        { label: 'Domain knowledge', detail: 'Expertise in banking, manufacturing, healthcare, retail and logistics' },
        { label: 'Knowledge management', detail: 'Documented standards, reusable solutions, lessons learned and implementation practice' },
      ],
      note: 'TopDev via VnEconomy estimates an IT workforce of 530,000 and a shortage of 150,000 to 200,000 a year; around 30% of about 50,000 IT graduates a year are reported job-ready. These are recruiter and broker estimates, and sources differ.',
      takeaway: 'Shortages of specialised skills raise delivery cost, delay projects and limit how complex the work can be.',
    },
  },
  'ent-m2-22-infrastructure': {
    heading: 'Standing on other people’s code, clouds and tools',
    intro: 'Providers rarely build every capability from scratch. Sort the foundations they borrow, then ask which dependency would hurt most if it failed.',
    spec: {
      layout: 'taxonomy', title: 'Technology Infrastructure, Tools, and Software Components', kicker: '',
      root: 'Upstream technology foundations', rootDetail: 'Reuse speeds development, but every dependency carries risk',
      groups: [
        { label: 'Cloud and computing resources', items: ['Virtual machines', 'Storage', 'Networking', 'Managed computing services'] },
        { label: 'Development toolchains', items: ['Code repositories', 'Integrated development environments', 'Testing frameworks', 'Continuous integration tools'] },
        { label: 'Reusable components', items: ['APIs and libraries', 'Frameworks and middleware', 'Open-source packages'] },
        { label: 'Security foundations', items: ['Identity management', 'Encryption', 'Vulnerability scanning', 'Software supply-chain controls'] },
        { label: 'Vendor and licence management', items: ['Third-party contracts', 'Licences', 'Platform compatibility', 'Dependency risks'] },
      ],
      note: 'Dependencies bring licensing, compatibility, availability, cybersecurity and vendor-concentration risks. Gartner forecasts worldwide IaaS spending up 29.3% in 2026, a global forecast; no Vietnam data on open-source dependence was found.',
      takeaway: 'Reusable foundations cut development effort only when every dependency is tracked and managed for security and control.',
    },
  },
  'ent-m2-23-partners': {
    heading: 'Partner where it adds, guard where it controls',
    intro: 'A partner can open a market overnight or quietly hold the keys to your customers. Use this test to decide what to share and what to keep close.',
    spec: {
      layout: 'decision', title: 'Third-Party Platforms, Vendors, and Strategic Partnerships', kicker: '',
      root: { label: 'Potential partnership', detail: 'A cloud, ERP, CRM, cybersecurity or data-platform programme, a reseller or a specialist consultancy' },
      question: 'Does the partner add something you cannot easily build, without controlling the customer or the roadmap?',
      branches: [
        { condition: 'It adds a hard-to-build capability', outcome: 'Partner, certify and offer jointly', detail: 'Certified platform skills, customer networks or international markets broaden the offer', tone: 'positive' },
        { condition: 'It controls the customer or roadmap', outcome: 'Keep that capability close', detail: 'Dependence, revenue sharing and delivery restrictions can weaken your commercial position', tone: 'caution' },
      ],
      note: 'Ask which capabilities customers would miss most if the partner left. FPT’s milestones record Olivetti, IBM and Compaq distribution in 1989–95 and an Oracle alliance in 1997, a company account.',
      takeaway: 'Partnerships extend capability and reach, but providers must retain the capabilities that differentiate them.',
    },
  },
  'ent-m2-31-design': {
    heading: 'Cheap to fix on paper, costly after rollout',
    intro: 'Decisions made before anyone writes code set the cost and risk of everything after. See which design activities hold down rework.',
    spec: {
      layout: 'driverTree', title: 'Business Analysis, Solution Architecture, and Product Design', kicker: '',
      root: { label: 'Downstream delivery risk', detail: 'Scope changes, integration problems, delays and solutions that miss actual needs' },
      drivers: [
        { label: 'Requirements analysis', detail: 'Business objectives, user needs, functional and non-functional requirements' },
        { label: 'Process mapping', detail: 'Current workflows examined for chances to simplify or automate' },
        { label: 'Solution architecture', detail: 'Applications, data structures, integrations, infrastructure, security controls and standards' },
        { label: 'Product design', detail: 'User journeys, interface prototypes, specifications and acceptance criteria' },
        { label: 'Delivery planning', detail: 'Resources, timelines, costs, risks and dependencies estimated before implementation' },
      ],
      note: 'A wrong requirement found on paper costs a conversation; after coding, rework; after rollout, rework plus disruption. Mordor Intelligence puts banking, financial services and insurance at 26.55% of Vietnam IT services demand in 2025, a third-party estimate.',
      takeaway: 'Clear requirements and sound architecture keep a solution secure, maintainable, scalable and economically viable.',
    },
  },
  'ent-m2-32-development': {
    heading: 'Reliable releases matter more than fast typing',
    intro: 'Coding is the visible step, but customers pay for software that is tested, secure and easy to change. Follow a design through to a validated release.',
    spec: {
      layout: 'flow', title: 'Software Development, Configuration, and Testing', kicker: '',
      steps: [
        { label: 'Application development', detail: 'Build web and mobile applications, enterprise platforms, APIs and supporting services', kind: 'stage' },
        { label: 'Enterprise configuration', detail: 'Configure ERP, CRM, HRM, workflow and reporting systems to approved requirements', kind: 'stage' },
        { label: 'Integration and data migration', detail: 'Connect systems and move data while keeping it accurate, consistent and intact', kind: 'stage' },
        { label: 'Testing', detail: 'Functional, integration, performance, usability and security tests', kind: 'stage' },
        { label: 'Validated release', detail: 'Code reviewed, versions managed and changes documented', kind: 'outcome' },
      ],
      loop: 'Quality assurance runs throughout the lifecycle, not only before deployment.',
      note: 'Product companies may release improvements continuously, while enterprise projects often add formal acceptance. FPT says it received ISO 9001 certification in February 2000, a company account.',
      takeaway: 'Faster coding creates no lasting value if the system is hard to secure, integrate, operate or update.',
    },
  },
  'ent-m2-33-implementation': {
    heading: 'Go-live is where technology meets habits',
    intro: 'A system can pass every test and still disappoint. Follow the implementation sequence and count how many steps concern people rather than code.',
    spec: {
      layout: 'flow', title: 'Implementation, Integration, and Service Delivery', kicker: '',
      steps: [
        { label: 'System integration', detail: 'Connect enterprise applications, cloud platforms, databases and external services', kind: 'stage' },
        { label: 'Data migration', detail: 'Clean, validate, transfer and reconcile data between legacy and new systems', kind: 'stage' },
        { label: 'Deployment management', detail: 'Pilots, phased rollouts, cutover, rollback procedures and production readiness', kind: 'stage' },
        { label: 'Change management', detail: 'Communicate process changes, train users and support adoption', kind: 'stage' },
        { label: 'Service transition', detail: 'Documentation, support responsibilities, service-level agreements and operational handover', kind: 'outcome' },
      ],
      note: 'In 1989 IBM agreed to take over the work of four Kodak data centers, and about 300 Kodak IT staff transferred: an influential outsourcing example, not a typical implementation.',
      takeaway: 'Deployment becomes a business outcome only when people, processes, data and technology move together.',
    },
  },
  'ent-m2-41-onboarding': {
    heading: 'Many routes in, one test: time to value',
    intro: 'Offers reach customers through several channels, but every route ends in the same onboarding work. Watch where the commercial win turns into actual use.',
    spec: {
      layout: 'pathway', title: 'Distribution, Deployment, and Customer Onboarding', kicker: '',
      trunk: [
        { label: 'Sales and contracting', detail: 'Requirements, pricing, scope, service levels, responsibilities and commercial terms', kind: 'stage' },
      ],
      optionsLabel: 'How the offer reaches the customer',
      options: [
        { label: 'Direct sales', detail: 'Vendor or provider sales teams' },
        { label: 'Cloud marketplaces', detail: 'Procurement through a cloud provider’s online catalogue' },
        { label: 'Resellers and partner ecosystems', detail: 'Partners sell or implement the vendor’s products' },
        { label: 'Tenders and referrals', detail: 'How IT service providers often win long-term enterprise contracts' },
      ],
      afterLabel: 'From access to value',
      after: [
        { label: 'Customer onboarding', detail: 'Accounts, permissions, environments and initial workflows configured', kind: 'stage' },
        { label: 'Training and enablement', detail: 'Administrators and end users learn functions and procedures', kind: 'stage' },
        { label: 'Adoption measurement', detail: 'Activation, engagement, training completion and early outcomes tracked', kind: 'outcome' },
      ],
      note: 'FPT reports domestic IT services revenue of VND 9,093 billion (+11.5%) in 2025, company-reported. No Vietnam data on marketplace or reseller shares, or on onboarding times, was found.',
      takeaway: 'Acquisition creates the opportunity, but structured onboarding decides how quickly customers realise value.',
    },
  },
  'ent-m2-42-support': {
    heading: 'The more critical the system, the tighter the promise',
    intro: 'Support is not one standard package. Decide how strict the commitment must be by asking what the business loses if the system stops.',
    spec: {
      layout: 'decision', title: 'Customer Support, Maintenance, and Managed Services', kicker: '',
      root: { label: 'System in live operation', detail: 'Needs updates, fixes, monitoring, incident handling and agreed service indicators' },
      question: 'How critical is the system to the customer’s business?',
      branches: [
        { condition: 'Business-critical', outcome: 'Stringent availability and incident-response commitments', detail: 'A financial platform, for example, with response times, resolution times and uptime closely measured', tone: 'caution' },
        { condition: 'Less critical', outcome: 'More flexible support arrangements', detail: 'An internal application, for example, can run under looser service terms', tone: 'positive' },
      ],
      note: 'Support carries steady cost: on-call staff, monitoring tools and penalties for missed service levels. FPT’s domestic IT services pre-tax profit fell 9.7% to VND 416 billion in 2025 while revenue rose 11.5%; company-reported, with no single cause given.',
      takeaway: 'Reliable support builds recurring value and retention when its price reflects what it costs to deliver.',
    },
  },
  'ent-m2-43-success': {
    heading: 'Growth from accounts that already see results',
    intro: 'The best new customer is often an existing one getting results. Follow how proven outcomes open expansion routes, each tied to a confirmed need.',
    spec: {
      layout: 'pathway', title: 'Customer Success, Renewal, and Solution Expansion', kicker: '',
      trunk: [
        { label: 'Customer success management', detail: 'Review adoption, satisfaction, business outcomes and unresolved challenges', kind: 'stage' },
        { label: 'Renewal management', detail: 'Assess contract performance, usage, service quality and upcoming needs', kind: 'stage' },
      ],
      optionsLabel: 'Expansion routes for validated needs',
      options: [
        { label: 'More modules or higher tiers', detail: 'Additional software modules or a higher product tier' },
        { label: 'More users and business units', detail: 'Wider use across the customer organisation' },
        { label: 'Cloud migration and modernisation', detail: 'Moving or rebuilding existing systems' },
        { label: 'AI and cybersecurity services', detail: 'New capabilities added to the relationship' },
      ],
      afterLabel: 'When value is visible',
      after: [
        { label: 'Customer advocacy', detail: 'References, case studies and long-term partnerships', kind: 'outcome' },
      ],
      note: 'FPT reports overseas digital transformation revenue of VND 16,751 billion (+16.8%) in 2025 and Japan growth of 25.4%, company-reported. No renewal or churn data for Vietnamese providers was found.',
      takeaway: 'Expansion lasts when it addresses validated needs rather than simply selling more technology.',
    },
  },
  'ent-m2-51-inputs': {
    heading: 'Same inputs, different weightings by business model',
    intro: 'A SaaS vendor and a consulting firm draw on the same resources but lean on them differently. Read the last column to see where each input weighs most.',
    spec: {
      layout: 'table', title: 'Key Inputs and Resource Requirements', kicker: '',
      headers: ['Input group', 'Examples', 'Weighs most for'],
      rows: [
        { label: 'Human capital', a: 'Engineers, consultants, architects, testers, project managers and support specialists', b: 'Consulting firms, which depend on expertise and delivery capacity' },
        { label: 'Technology assets', a: 'Development environments, cloud platforms, databases, APIs and security tools', b: 'SaaS vendors running cloud operations' },
        { label: 'Intellectual property', a: 'Proprietary software, reusable components, frameworks, templates and methods', b: 'SaaS vendors investing in product development' },
        { label: 'Customer information', a: 'Requirements, business rules, system documentation and operational data', b: 'Enterprise projects, where poor data undermines results' },
        { label: 'Financial resources', a: 'Funding for research, infrastructure, recruitment, training, marketing and delivery', b: 'Every model, to sustain investment' },
      ],
      note: 'An Binh Securities via Viet Nam News reports demand for 700,000 IT workers by end-2025 against about 500,000 qualified candidates, a broker estimate. Laws 60/2024/QH15 and 91/2025/QH15 shape how customer information is handled.',
      takeaway: 'Talent, technology, data and intellectual property must be managed as one connected set of resources.',
    },
  },
  'ent-m2-52-outputs': {
    heading: 'Deliverables you hand over, value you must prove',
    intro: 'Customers receive systems and documents, but what they want is a better way of working. Compare the two sides and notice which one needs a baseline.',
    spec: {
      layout: 'compare', title: 'Tangible and Intangible Outputs', kicker: '',
      leftTitle: 'Tangible outputs', rightTitle: 'Intangible outputs',
      rows: [
        { label: 'Software', a: 'Licensed applications, SaaS platforms, enterprise modules and custom-built systems', b: 'Intellectual property and reusable components' },
        { label: 'Environments', a: 'Integrated applications, databases, cloud services and data platforms', b: 'Automation capability' },
        { label: 'Services and documents', a: 'Implementation, managed operations, documentation and architectures', b: 'Process knowledge and organisational learning' },
        { label: 'Results', a: 'Deployed infrastructure and documented deliverables', b: 'Faster processing, fewer errors and better decisions' },
        { label: 'How to judge it', a: 'Technical completion', b: 'Agreed performance indicators against a baseline' },
      ],
      note: 'FPT reports digital transformation at about 47.3% of its overseas IT services revenue and an 8.2% productivity gain from its AI-first strategy; both are company-reported, not independently measured.',
      takeaway: 'Evaluate technical completion and business outcomes together, with indicators agreed before the project starts.',
    },
  },
  'ent-m2-53-value': {
    heading: 'Who keeps a share of the value created',
    intro: 'A project can transform a customer and still earn its provider little. See how the benefit is divided and what decides each share.',
    spec: {
      layout: 'ecosystem', title: 'Value Creation, Capture, and Distribution', kicker: '',
      center: { label: 'Value created for the customer', detail: 'Better operations, customer service, risk management or new products' },
      actors: [
        { label: 'Enterprise customer', relation: 'Keeps the improved operations and pays for them', flows: ['money'] },
        { label: 'Software vendors', relation: 'Earn product revenue from subscriptions, licences, usage charges and premium features', flows: ['product', 'money'] },
        { label: 'Service providers', relation: 'Monetise expertise through consulting, implementation, maintenance and managed-service fees', flows: ['service', 'money'] },
        { label: 'Infrastructure providers', relation: 'Earn fees for computing and platform resources', flows: ['service', 'money'] },
      ],
      note: 'Shares depend on intellectual property ownership, bargaining power, contract structure, switching costs and alternatives. FPT’s reported pre-tax profit over revenue gives about 15.5% overseas and 4.6% domestic in 2025, our calculation, not industry margins.',
      takeaway: 'Creating value and capturing it differ: weak pricing, high delivery cost or easy substitution limit a provider’s returns.',
    },
  },
  'ent-m2-61-global': {
    heading: 'Code crosses borders faster than trust',
    intro: 'Global delivery spreads work across countries for talent, cost and proximity. Group the parts of the model and notice how many exist to manage distance.',
    spec: {
      layout: 'taxonomy', title: 'Global Delivery Models and International Market Integration', kicker: '',
      root: 'Global delivery model', rootDetail: 'Local consulting and account management combined with remote engineering',
      groups: [
        { label: 'Where the work is done', items: ['Offshore: lower-cost or specialised talent markets', 'Nearshore: closer centres with time-zone overlap'] },
        { label: 'How teams stay aligned', items: ['Standard processes', 'Shared documentation', 'Collaboration platforms', 'Project governance'] },
        { label: 'How overseas customers are won', items: ['Direct sales', 'Partnerships', 'Tenders', 'Technology ecosystems'] },
        { label: 'What must be protected', items: ['Privacy and data transfer', 'Cybersecurity', 'Intellectual property', 'Contractual requirements'] },
      ],
      note: 'VINASA names the United States, Japan, Europe and parts of Southeast Asia as main markets, and says a lack of local offices abroad limits trust-building. Nasscom’s 5.8 million India figure includes hardware; IBPAP’s US$40 billion+ includes business process outsourcing.',
      takeaway: 'Cost advantage wins entry, but consistent standards, security and communication keep distant customers.',
    },
  },
  'ent-m2-62-vietnam': {
    heading: 'From building to a client’s specification to owning the solution',
    intro: 'Vietnamese providers sit at different points between doing work a client defined and owning the design and the customer relationship. Compare the two ends.',
    spec: {
      layout: 'compare', title: 'Vietnam’s Position in the Global and Domestic Value Chain', kicker: '',
      leftTitle: 'Execution-focused delivery', rightTitle: 'Solution and product ownership',
      rows: [
        { label: 'Who defines the work', a: 'Overseas clients set requirements and design', b: 'The provider designs and stands behind the solution' },
        { label: 'Typical work', a: 'Development, testing, maintenance and engineering support', b: 'Proprietary platforms and end-to-end transformation services' },
        { label: 'Capabilities needed', a: 'Strong engineers', b: 'Consulting, architecture, product management, cybersecurity and industry skills' },
        { label: 'Basis of competition', a: 'Cost competitiveness supports market entry', b: 'Specialised expertise sustains value capture' },
      ],
      note: 'VINASA reports US$7 billion of software exports out of about US$13 billion of sector revenue in 2024. About 79.6% of FPT’s IT services revenue was overseas in 2025, our division of company figures; the two scopes are not combined.',
      takeaway: 'Adding domain knowledge and solution ownership to engineering strength is a gradual shift that varies across firms.',
    },
  },
  'ent-m2-63-resilience': {
    heading: 'Standardise for scale, localise where it counts',
    intro: 'A system built for the world still has to work in one company, one language and one set of local rules. Compare what each side contributes.',
    spec: {
      layout: 'compare', title: 'Localization, Global Standards, and Value-Chain Resilience', kicker: '',
      leftTitle: 'Global standards and platforms', rightTitle: 'Local adaptation',
      rows: [
        { label: 'What it brings', a: 'Efficiency and consistent quality', b: 'Fit with customer workflows, language and regulation' },
        { label: 'Who contributes', a: 'International vendors with mature platforms and global implementation experience', b: 'Domestic providers who understand local business conditions' },
        { label: 'In practice', a: 'Recognised practice for software quality, security, service management and governance', b: 'Adapted interfaces, workflows, integrations and reporting' },
        { label: 'A Vietnam marker', a: 'FPT reports ISO 9001 certification in February 2000', b: 'Law on Cybersecurity 116/2025/QH15, effective 1 Jul 2026' },
      ],
      note: 'Resilience also needs diversified vendors, backup and disaster recovery plans, and rehearsed continuity tests. The 2025–30 cloud programme targets 70% of private enterprises by 2030 using domestic providers, a policy target.',
      takeaway: 'Resilient value chains pair global capability with local responsiveness and tested plans for when components fail.',
    },
  },
};
