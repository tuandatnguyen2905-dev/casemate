import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Enterprise Software & IT Services Module 01, keyed by visualKind. */
export const ENT_M1_VISUALS: Record<string, ChapterVisual> = {
  'ent-m1-11-definition': {
    heading: 'From a business need to a measured outcome',
    intro: 'Customers do not buy software for its features. Follow how advice, software, integration and operation combine into a result the business can measure.',
    spec: {
      layout: 'flow', title: 'Definition and Core Characteristics', kicker: '',
      steps: [
        { label: 'IT consulting', detail: 'Assess business needs and design the digital transformation roadmap', kind: 'stage' },
        { label: 'Enterprise application development', detail: 'Build or supply software for finance, sales, procurement, human resources and customer service', kind: 'stage' },
        { label: 'System integration', detail: 'Connect applications, databases, infrastructure and external platforms so information flows', kind: 'stage' },
        { label: 'Managed IT services', detail: 'Operate, monitor, maintain and secure the technology environment', kind: 'stage' },
        { label: 'Business outcome delivery', detail: 'Shorter processing times, fewer errors and better management visibility', kind: 'outcome' },
      ],
      loop: 'The same software delivers very different results depending on how well it is fitted to the customer’s processes, so implementation and support are part of the product.',
      note: 'FPT’s Technology sector (VND 44,475 billion revenue in 2025) spans consulting, AI platforms, cybersecurity and system operation; its 8.2% productivity gain from AI is a company claim.',
      takeaway: 'The industry sells productivity, control, scalability and security; software and expertise are the means.',
    },
  },
  'ent-m1-12-scope': {
    heading: 'Six segments that earn money in different ways',
    intro: 'One customer may buy from a vendor, an integrator and a managed-service provider at once. Sort the industry into its six segments before comparing any figure.',
    spec: {
      layout: 'taxonomy', title: 'Industry Scope and Major Market Segments', kicker: '',
      root: 'Enterprise software & IT services', rootDetail: 'An ecosystem of products and services, not one uniform market',
      groups: [
        { label: 'Enterprise applications', items: ['ERP', 'CRM', 'HRM', 'Supply-chain planning'] },
        { label: 'Data and analytics', items: ['Business intelligence', 'Reporting', 'Decision-support platforms'] },
        { label: 'Infrastructure and platform software', items: ['Operating systems', 'Databases', 'Middleware', 'Developer tools'] },
        { label: 'Professional IT services', items: ['Consulting', 'Custom development', 'Application modernisation'] },
        { label: 'Outsourcing and managed services', items: ['Maintenance', 'Cloud management', 'Service desks', 'Managed cybersecurity'] },
        { label: 'Specialised solutions', items: ['Banking', 'Manufacturing', 'Healthcare', 'Retail, logistics and public sector'] },
      ],
      note: 'Mordor Intelligence puts IT outsourcing at 39.05% of Vietnam’s US$2.37 billion IT services market in 2025; that estimate covers IT services only, not software.',
      takeaway: 'Revenue models, margins and risks differ by segment, so name the segment before comparing size or growth.',
    },
  },
  'ent-m1-13-revenue': {
    heading: 'Five revenue models and what keeps each one paying',
    intro: 'A subscription renews, a project ends and a managed service runs while the client is satisfied. Compare how each model charges and what it must keep delivering.',
    spec: {
      layout: 'table', title: 'Customers, Value Proposition, and Revenue Models', kicker: '',
      headers: ['Revenue model', 'How the customer pays', 'What keeps revenue coming'],
      rows: [
        { label: 'Subscription', a: 'Recurring fees for access to cloud-based applications', b: 'Continued product relevance' },
        { label: 'Licence and maintenance', a: 'A licence, then fees for updates and support', b: 'Useful updates and support quality' },
        { label: 'Project-based', a: 'Consulting, development, migration or integration against agreed scopes and milestones', b: 'Winning the next project' },
        { label: 'Managed-service contract', a: 'Recurring fees for support, monitoring, infrastructure management and cybersecurity', b: 'Delivery quality and customer trust' },
        { label: 'Hybrid model', a: 'Subscriptions, implementation fees, usage-based charges and support combined', b: 'A longer customer relationship' },
      ],
      note: 'FPT reports moving overseas work from time-and-materials toward managed services, with newly signed overseas revenue of VND 40,636 billion (+23.2%) in 2025; these are company statements.',
      takeaway: 'Recurring revenue is earned repeatedly: it lasts only while value keeps being delivered.',
    },
  },
  'ent-m1-21-early': {
    heading: 'From automating single functions to integrated enterprise systems',
    intro: 'Business computing began with expensive central machines doing payroll and stock counts. Trace how integration created the market for standard applications and implementation skills.',
    spec: {
      layout: 'timeline', title: 'Mainframe Computing, Enterprise Systems, and Early Software Markets', kicker: '',
      events: [
        { period: 'Mid-to-late twentieth century', label: 'Centralised mainframes automate single functions', detail: 'Payroll, accounting, inventory and transaction processing, run by dedicated technical teams', status: 'historical' },
        { period: 'Early 1970s', label: 'SAP pioneers ERP', detail: 'Its later R/3 system moved ERP from mainframes to client-server computing', status: 'historical' },
        { period: 'About 1990', label: '“Enterprise resource planning” is named', detail: 'Gartner’s term describes integration beyond manufacturing', status: 'historical' },
        { period: 'Late 1990', label: 'Vietnam starts later', detail: 'FPT signs its first commercial software contract, a Vietnam Airlines reservation system', status: 'historical' },
      ],
      note: 'Dates are approximate periods from academic and trade histories of ERP; the Vietnam entry is FPT’s own account of its history.',
      takeaway: 'Linking finance, stock and production was hard to buy off the shelf, which created demand for consultants and integrators.',
    },
  },
  'ent-m1-22-clientserver': {
    heading: 'Owning technology versus combining software, expertise and outsourcing',
    intro: 'Client-server computing widened access to business software, and cost pressure moved work to external providers. Compare the two eras side by side.',
    spec: {
      layout: 'compare', title: 'Client-Server Computing, Standardized Applications, and IT Outsourcing', kicker: '',
      leftTitle: 'Centralised mainframe era', rightTitle: 'Client-server and outsourcing era',
      rows: [
        { label: 'Where software runs', a: 'Centralised mainframe environments', b: 'Departmental applications across networks, desktops and central servers' },
        { label: 'What is bought', a: 'Specialised programs for individual systems', b: 'Packaged ERP, CRM, database and productivity applications' },
        { label: 'Who runs it', a: 'Internal technology departments', b: 'External providers too: Kodak handed its data centers to IBM in 1989' },
        { label: 'Where work is done', a: 'Inside the organisation', b: 'Across countries, for talent, cost and global operations' },
      ],
      note: 'Year-2000 remediation demand that overwhelmed domestic suppliers in the US and Europe is cited as one reason overseas providers won work. In Vietnam, FPT made its first software export to North America on 13 June 1999, by its own account.',
      takeaway: 'The industry moved from supplying products to delivering specialist capabilities and ongoing operations.',
    },
  },
  'ent-m1-23-cloudai': {
    heading: 'Cloud and AI turn technology supply into continuous transformation',
    intro: 'Once customers subscribe instead of install, the supplier runs, updates and answers for the software. See the four activities that follow and where they lead.',
    spec: {
      layout: 'pathway', title: 'Cloud Computing, SaaS, and the AI-Enabled Enterprise', kicker: '',
      trunk: [
        { label: 'Internet connectivity and public cloud', detail: 'From the 2000s onward: scalable computing, storage, databases and development tools', kind: 'stage' },
      ],
      optionsLabel: 'What organisations now do',
      options: [
        { label: 'SaaS adoption', detail: 'Subscription applications for customers, finance, collaboration, HR and analytics' },
        { label: 'Cloud migration', detail: 'Move suitable workloads to public, private or hybrid cloud' },
        { label: 'Legacy modernisation', detail: 'Rebuild older systems for scalability, interoperability and security' },
        { label: 'AI integration', detail: 'AI-assisted search, document processing, coding, forecasting and support' },
      ],
      afterLabel: 'Where it leads',
      after: [
        { label: 'Managed digital transformation', detail: 'Consulting, implementation, training and ongoing optimisation', kind: 'outcome' },
      ],
      note: 'Gartner forecasts worldwide software spending up 15.5% in 2026; FPT reports VND 16,751 billion of overseas digital transformation revenue (+16.8%), a company figure.',
      takeaway: 'Expectations for integration, security, governance and measurable returns rise with every AI-enabled capability.',
    },
  },
  'ent-m1-31-spending': {
    heading: 'One headline total, very different growth rates underneath',
    intro: 'Gartner’s 2026 forecast puts worldwide IT spending at US$6,369 billion. Break it into categories to see where growth is concentrated.',
    spec: {
      layout: 'driverTree', title: 'Market Size, Growth, and Spending Structure', kicker: '',
      root: { label: 'Worldwide IT spending, 2026 forecast', detail: 'US$6,369 billion, up 14.2% (Gartner, July 2026)' },
      formula: 'Total = IT services + software + communications services + devices + data center systems + IaaS',
      drivers: [
        { label: 'IT services', detail: 'Largest category, about US$1,570 billion; +5.3%', op: '+' },
        { label: 'Software', detail: 'About US$1,468 billion; +15.5%', op: '+' },
        { label: 'Data center systems', detail: 'Fastest growth, +62.5%, with AI-related infrastructure', op: '+' },
        { label: 'Infrastructure as a service', detail: '+29.3%', op: '+' },
        { label: 'Devices', detail: '+9.8%', op: '+' },
        { label: 'Communications services', detail: 'Part of most of the remainder', op: '+' },
      ],
      note: 'These are broad worldwide categories that include far more than enterprise software and enterprise IT services; they are forecasts, not Vietnam figures and not an addressable market.',
      takeaway: 'Use the growth rate of your own segment, not the headline total, when planning investment, pricing or hiring.',
    },
  },
  'ent-m1-32-geography': {
    heading: 'Where technology is bought, built and delivered',
    intro: 'The place that pays for technology is often not the place that builds it. Group the regions by the role each plays.',
    spec: {
      layout: 'taxonomy', title: 'Geographic Distribution and Major Industry Hubs', kicker: '',
      root: 'Global enterprise software and IT services', rootDetail: 'Demand centres, platform builders and delivery hubs sit in different places',
      groups: [
        { label: 'Demand centres and platform builders', items: ['North America: enterprise platforms, cloud services, technology investment', 'Europe: enterprise applications, industrial digitalisation, data governance, regulated-sector demand'] },
        { label: 'Large delivery hubs', items: ['India: technology revenue US$282.6B in FY2025 (includes hardware), 1,750+ global capability centres', 'Philippines: IT-BPM revenue US$40B+ in 2025 (includes business process outsourcing)'] },
        { label: 'Emerging delivery location', items: ['Vietnam: software exports about US$7 billion in 2024 (VINASA)', 'Main markets: United States, Japan, Europe, parts of Southeast Asia'] },
      ],
      note: 'The country figures use different definitions, so a larger number does not mean a larger comparable market.',
      takeaway: 'Delivery location is a competitive choice: talent, domain expertise, security and trust matter alongside cost.',
    },
  },
  'ent-m1-33-competition': {
    heading: 'Who competes around one enterprise account',
    intro: 'No supplier wins alone. See how platforms, integrators, specialists and partners each relate to the customer they compete to win and keep.',
    spec: {
      layout: 'ecosystem', title: 'Competitive Landscape and Industry Structure', kicker: '',
      center: { label: 'Enterprise customer', detail: 'Needs applications to connect to older systems, data platforms and other vendors’ tools' },
      actors: [
        { label: 'Large platform providers', relation: 'Compete on application suites, cloud infrastructure, developer ecosystems and integrated AI', flows: ['product', 'money'] },
        { label: 'Systems integrators and IT service providers', relation: 'Compete on delivery capability, industry knowledge and cost', flows: ['service', 'money'] },
        { label: 'Specialist vendors', relation: 'Industry applications, cybersecurity and data platforms', flows: ['product'] },
        { label: 'Partner ecosystem', relation: 'Certifications, cloud marketplaces and resale arrangements extend each provider’s reach', flows: ['information'] },
      ],
      note: 'Long contracts and integration depth create switching costs; support quality and ongoing value decide renewal.',
      takeaway: 'Without a clear position as platform, integrator or vertical expert, a provider competes mainly on price.',
    },
  },
  'ent-m1-41-vietnam-market': {
    heading: 'Three Vietnam numbers that measure three different things',
    intro: 'Vietnam has several credible figures for its technology sector. Read what each one covers before using it, because they cannot be added or compared directly.',
    spec: {
      layout: 'table', title: 'Market Size, Growth, and Industry Composition', kicker: '',
      headers: ['Figure', 'What it covers', 'Source and status'],
      rows: [
        { label: 'US$2.37 billion (2025)', a: 'Vietnam IT services only; US$2.63 billion in 2026, projected US$4.39 billion by 2031', b: 'Mordor Intelligence, third-party estimate (10.82% CAGR, 2026–2031)' },
        { label: 'US$13 billion (2024)', a: 'Software sector share of IT industry revenue, with US$7 billion exported', b: 'VINASA, industry association' },
        { label: 'About US$198 billion (2025)', a: 'Whole digital technology industry, including US$178 billion of hardware and electronics exports, across 80,052 firms', b: 'Ministry of Science and Technology' },
      ],
      note: 'No public figure for Vietnam enterprise software alone was found.',
      takeaway: 'Name the definition first: the widest figure overstates what a software or services provider can win.',
    },
  },
  'ent-m1-42-players': {
    heading: 'Five kinds of provider in Vietnam’s market',
    intro: 'Vietnam’s providers range from a national champion to small specialist teams. Group them by how they compete, then read FPT as one documented example.',
    spec: {
      layout: 'taxonomy', title: 'Key Players and Competitive Positioning', kicker: '',
      root: 'Providers serving Vietnamese and overseas clients', rootDetail: 'Positioning runs from low-cost engineering capacity to industry specialists and managed services',
      groups: [
        { label: 'Large domestic technology groups', detail: 'Broad services at home and abroad; FPT is the best-documented example' },
        { label: 'Specialist software companies', detail: 'Compete on domain knowledge in chosen areas' },
        { label: 'System integrators', detail: 'Serve banks and government with customisation and integration' },
        { label: 'Global vendors', detail: 'Sell platforms through local partners' },
        { label: 'Offshore delivery centres', detail: 'Run for international clients' },
      ],
      note: 'FPT reports VND 44,475 billion of technology revenue in 2025, of which VND 35,382 billion from overseas IT services and VND 9,093 billion from domestic IT services; these are company figures and not a ranking.',
      takeaway: 'Differentiation comes from moving up the value chain: domain knowledge, security credentials and managed services defend margins.',
    },
  },
  'ent-m1-43-demand': {
    heading: 'What each customer segment buys and asks first',
    intro: 'A bank, a factory and a government office all buy technology, but with different first questions. Compare purchases and priorities by segment.',
    spec: {
      layout: 'table', title: 'Customer Demand and Adoption Across Industries', kicker: '',
      headers: ['Customer segment', 'Typical purchases', 'First priority'],
      rows: [
        { label: 'Banks and financial institutions', a: 'Transaction platforms, risk analytics, regulatory reporting, identity management, cybersecurity', b: 'Security and control' },
        { label: 'Manufacturers', a: 'ERP, production planning, warehouse management, supply-chain analytics', b: 'Operations' },
        { label: 'Retail and consumer businesses', a: 'Point-of-sale, e-commerce, inventory, customer management', b: 'Visibility' },
        { label: 'Government', a: 'Digital administration, data integration, citizen platforms', b: 'Service delivery' },
        { label: 'SMEs', a: 'Cloud accounting, collaboration, HR, packaged software', b: 'Affordability and speed' },
      ],
      note: 'Mordor Intelligence estimates banking, financial services and insurance at 26.55% of Vietnam IT services demand in 2025; large enterprises hold 67.72% of value while SME demand grows 12.74% a year.',
      takeaway: 'Demand is shifting to integrated, end-to-end solutions, so industry knowledge increasingly wins projects.',
    },
  },
  'ent-m1-51-transformation': {
    heading: 'Transformation spending follows a measurable outcome',
    intro: 'Cloud, AI, automation, data integration and consulting all create demand, but buyers now ask what will get better. See how a baseline changes the answer.',
    spec: {
      layout: 'decision', title: 'Digital Transformation, Cloud Adoption, and AI', kicker: '',
      root: { label: 'Transformation proposal', detail: 'Cloud migration, AI-enabled applications, workflow automation, data integration or transformation consulting' },
      question: 'Is there a baseline and an agreed indicator before the project starts?',
      branches: [
        { condition: 'Yes', outcome: 'Results can be shown', detail: 'Cloud accounting with automated invoice matching shows fewer errors and faster closing', tone: 'positive' },
        { condition: 'No', outcome: 'Return is hard to prove', detail: 'An AI tool bought without changing the process may show no return; purchasing slows and contracts shorten', tone: 'negative' },
      ],
      note: 'Vietnam’s 2025–30 cloud programme targets 70% of private enterprises by 2030, a policy target; FPT’s 8.2% productivity gain is a company claim.',
      takeaway: 'Tie every proposal to productivity, cost, resilience or revenue, measured against a starting point.',
    },
  },
  'ent-m1-52-regulation': {
    heading: 'Four Vietnamese laws arriving in sequence',
    intro: 'Rules on data and security decide what can be built, where it runs and who sees it. Follow the effective dates that providers must plan around.',
    spec: {
      layout: 'timeline', title: 'Regulation, Cybersecurity, and Data Governance', kicker: '',
      events: [
        { period: '1 July 2025', label: 'Law on Data 60/2024/QH15', detail: 'Regulates digital, important and core data', status: 'historical' },
        { period: '1 January 2026', label: 'Law on the Digital Technology Industry 71/2025/QH15', detail: 'Some articles already applied from 1 July 2025', status: 'historical' },
        { period: '1 January 2026', label: 'Personal Data Protection Law 91/2025/QH15', detail: 'Fines up to VND 3 billion for most violations', status: 'historical' },
        { period: '1 July 2026', label: 'Law on Cybersecurity 116/2025/QH15', detail: 'Replaces the 2018 Cybersecurity Law', status: 'historical' },
      ],
      note: 'Sector rules, such as banking rules, also apply. Check the current legal text before relying on any summary; this is not legal advice.',
      takeaway: 'Security and compliance capability are core selection criteria, a cost to buyers and a barrier to weaker providers.',
    },
  },
  'ent-m1-53-talent': {
    heading: 'Two talent-shortage estimates that count different things',
    intro: 'Technology firms sell people’s time and judgement. Compare the two reported estimates of Vietnam’s IT talent gap without subtracting one from the other.',
    spec: {
      layout: 'compare', title: 'Talent, Costs, Global Competition, and Economic Conditions', kicker: '',
      leftTitle: 'An Binh Securities via Viet Nam News', rightTitle: 'TopDev via VnEconomy',
      rows: [
        { label: 'What is counted', a: 'Demand against qualified candidates at a point in time', b: 'Workforce size and a yearly shortfall' },
        { label: 'Headline estimate', a: 'Demand for 700,000 IT workers by end-2025 against about 500,000 qualified candidates', b: 'IT workforce of 530,000 and a shortage of 150,000 to 200,000 workers a year' },
        { label: 'Graduate pipeline', a: 'About 50,000 IT graduates a year, around 30% job-ready', b: 'Same job-readiness concern reported' },
      ],
      note: 'Mordor Intelligence also lists talent shortages and submarine-cable outages as constraints; Gartner forecasts IT services spending up only 5.3% worldwide in 2026.',
      takeaway: 'Talent, not demand, often limits growth, so productivity and expertise beat competing on labour cost.',
    },
  },
};
