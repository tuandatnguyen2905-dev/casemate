import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Enterprise Software & IT Services Module 03, keyed by visualKind. */
export const ENT_M3_VISUALS: Record<string, ChapterVisual> = {
  'ent-m3-11-vendors': {
    heading: 'Write once, sell many times, then win the renewal',
    intro: 'A vendor builds its product once, but has to earn the revenue again every year. Follow the cycle from a standard application to renewal and expansion.',
    spec: {
      layout: 'flow', title: 'Enterprise Software Vendors and SaaS Providers', kicker: '',
      steps: [
        { label: 'Build a standard application', detail: 'Finance, sales, HR, procurement or operations software reused across many customers', kind: 'stage' },
        { label: 'Price it as a subscription', detail: 'Monthly or annual fees by users, features, usage or service tier', kind: 'stage' },
        { label: 'Onboard and drive adoption', detail: 'Customer success helps new users get value from the product', kind: 'stage' },
        { label: 'Renew and expand', detail: 'Renewals and added modules turn one sale into recurring revenue', kind: 'outcome' },
      ],
      loop: 'Roadmaps, releases, usability improvements and security fixes keep the product relevant, and APIs and partner programmes extend it, so the cycle can repeat.',
      note: 'MISA lists AMIS Accounting from VND 2,950,000 a year for one user and says its accounting software served 254,556 businesses after seven months of 2025; these are vendor figures, and other MISA pages differ.',
      takeaway: 'Scale comes from reuse, but it lasts only while acquisition cost stays in balance with customer lifetime value.',
    },
  },
  'ent-m3-12-consulting': {
    heading: 'When the project grows, who pays for the extra hours?',
    intro: 'Service firms sell expertise project by project, so profit depends on how scope changes are handled. See how the pricing model decides who carries the risk.',
    spec: {
      layout: 'decision', title: 'IT Consulting, Systems Integration, and Custom Development', kicker: '',
      root: { label: 'Project grows beyond its agreed scope', detail: 'Consulting, integration, custom development or modernisation work needs more hours than estimated' },
      question: 'How is the work priced?',
      branches: [
        { condition: 'Fixed fee', outcome: 'Provider absorbs the extra hours', detail: 'The project can lose money even if the customer is satisfied', tone: 'negative' },
        { condition: 'Time and materials', outcome: 'Customer’s bill rises', detail: 'The provider is covered, but the relationship may be strained', tone: 'caution' },
        { condition: 'Scope changed formally', outcome: 'Extra work is agreed before it is done', detail: 'Clear scope and formal change protect both margin and trust', tone: 'positive' },
      ],
      note: 'The fixed-fee case is an illustration. FPT reports VND 16,751 billion of digital transformation revenue from overseas clients in 2025 (+16.8%), a company figure; no Vietnam-wide data on project margins or staff utilisation was found.',
      takeaway: 'Service profit rests on accurate estimates, staff utilisation, controlled scope and consistent delivery quality.',
    },
  },
  'ent-m3-13-hybrid': {
    heading: 'Handing over the work: what each contract makes the provider answer for',
    intro: 'Outsourcing and managed services move ongoing work to an outside provider. Read across to see what the customer hands over and what the provider must then manage.',
    spec: {
      layout: 'table', title: 'IT Outsourcing, Managed Services, and Hybrid Models', kicker: '',
      headers: ['Model', 'What the customer hands over', 'What the provider must manage'],
      rows: [
        { label: 'IT outsourcing', a: 'Development, testing, help desk or application support work', b: 'Staffing and delivery of the transferred activities' },
        { label: 'Managed service', a: 'Operation of infrastructure, cloud, applications or cybersecurity', b: 'Agreed service levels, continuously' },
        { label: 'Dedicated team', a: 'Long-term engineering capacity working alongside its own staff', b: 'Retaining and coordinating the specialists' },
        { label: 'Hybrid solution', a: 'Software subscriptions, implementation projects and maintenance together', b: 'Coordination across product, projects and operations' },
        { label: 'Outcome-based contract', a: 'Part of the payment, linked to agreed performance measures', b: 'Results that can be defined, measured and attributed' },
      ],
      note: 'Mordor Intelligence estimates IT outsourcing at 39.05% of Vietnam’s IT services value in 2025, a third-party estimate; FPT reports overseas IT services revenue up 14.3% while moving toward managed services, a company statement.',
      takeaway: 'Recurring contracts steady revenue, but each added offering brings service-level, staffing and coordination risk.',
    },
  },
  'ent-m3-21-applications': {
    heading: 'Suites, functional tools and sector software: how applications divide',
    intro: 'Enterprise applications differ by the business problem they solve. Group them by scope, from integrated suites to software built for one industry.',
    spec: {
      layout: 'taxonomy', title: 'Enterprise Applications and Business Software', kicker: '',
      root: 'Enterprise applications', rootDetail: 'Segmented by function, industry, deployment, organisation size and customisation',
      groups: [
        { label: 'Integrated suites', detail: 'One system across many functions', items: ['ERP: finance, procurement, inventory, manufacturing'] },
        { label: 'Functional applications', items: ['CRM: customer records, sales pipelines, service', 'HRM: recruitment, payroll, employee records', 'SCM: sourcing, logistics, demand planning'] },
        { label: 'Decision support', items: ['Business intelligence: dashboards, reports, forecasts'] },
        { label: 'Industry-specific software', items: ['Banking', 'Healthcare', 'Manufacturing', 'Retail and logistics'] },
      ],
      note: 'MISA says AMIS spans more than 40 applications across finance, sales, HR and operations, a vendor claim; Gartner forecasts worldwide software spending up 15.5% in 2026, a global forecast.',
      takeaway: 'Large firms need integration and governance while SMEs want ease and price, so providers balance standard features with flexibility.',
    },
  },
  'ent-m3-22-services': {
    heading: 'From giving advice to keeping systems running every day',
    intro: 'Each kind of IT service makes the provider answer for something different. Follow the climb from defining the problem to taking on daily operations.',
    spec: {
      layout: 'pathway', title: 'IT Services and Professional Solutions', kicker: '',
      trunk: [
        { label: 'IT consulting', detail: 'Strategy, enterprise architecture, business cases and roadmaps; answers for the advice', kind: 'stage' },
        { label: 'Integration and software engineering', detail: 'Connect, build, test and modernise; answers for a working system', kind: 'stage' },
      ],
      optionsLabel: 'Ongoing operational responsibility',
      options: [
        { label: 'Cloud and infrastructure services', detail: 'Migrate workloads, optimise cloud use and keep systems available' },
        { label: 'Cybersecurity', detail: 'Assess vulnerabilities, monitor threats and manage incidents' },
        { label: 'Managed IT services', detail: 'Application support, service desks and performance monitoring' },
      ],
      note: 'Gartner forecasts worldwide IT services spending up 5.3% in 2026; Mordor Intelligence estimates Vietnam cloud and platform services grow 11.86% a year, a third-party estimate. FPT reports domestic IT services revenue of VND 9,093 billion (+11.5%), company-reported.',
      takeaway: 'Each step up in responsibility brings tighter service levels and a longer relationship, so compare accountability, not only price.',
    },
  },
  'ent-m3-23-deployment': {
    heading: 'Where the software runs decides who maintains it and who pays',
    intro: 'Deployment choices shift cost, control and upkeep between customer and provider. Compare three models by who controls the infrastructure and the provider work each creates.',
    spec: {
      layout: 'table', title: 'Deployment Models and Industry Segmentation', kicker: '',
      headers: ['Deployment model', 'Who controls the infrastructure', 'What it means for providers'],
      rows: [
        { label: 'On-premises', a: 'The customer, which deploys and maintains applications itself', b: 'Server investment and upkeep stay with the customer' },
        { label: 'Cloud and SaaS', a: 'External providers, on recurring terms', b: 'Standard products support repeatable delivery' },
        { label: 'Hybrid', a: 'Both: dedicated environments combined with public cloud', b: 'Demand for integration, migration and ongoing management' },
      ],
      note: 'Decision 1121/QD-TTg targets cloud use by 70% of private enterprises by 2030, a policy target; Ken Research estimates paid cloud ERP penetration at 21.0% of addressable SMEs in 2025, excluding standalone accounting. Gartner forecasts worldwide IaaS spending up 29.3% in 2026.',
      takeaway: 'Align the delivery model with customer priorities instead of assuming one architecture suits every organisation.',
    },
  },
  'ent-m3-31-large': {
    heading: 'Every function at the table can pause a large deal',
    intro: 'A large enterprise buys through many hands. See what each group needs answered before the purchase can move forward.',
    spec: {
      layout: 'ecosystem', title: 'Large Enterprises and Multinational Corporations', kicker: '',
      center: { label: 'Large-enterprise purchase', detail: 'Integration, modernisation, security, account management and multi-phase transformation' },
      actors: [
        { label: 'IT leaders', relation: 'Want a system that fits the existing architecture', flows: ['information'] },
        { label: 'Finance department', relation: 'Wants a predictable cost', flows: ['money'] },
        { label: 'Security, risk and compliance', relation: 'Want proof of controls and regulatory compliance', flows: ['risk', 'oversight'] },
        { label: 'Procurement team', relation: 'Wants comparable bids and a formal evaluation', flows: ['information'] },
        { label: 'Business executives', relation: 'Expect reliability, scalability and vendor accountability', flows: ['oversight'] },
      ],
      note: 'Mordor Intelligence estimates large enterprises held 67.72% of Vietnam’s IT services value in 2025 and banking, financial services and insurance 26.55% of demand; both are third-party estimates for IT services only.',
      takeaway: 'Providers that prepare evidence for each group shorten the cycle, while those selling to one sponsor often stall.',
    },
  },
  'ent-m3-32-sme': {
    heading: 'What a small firm hopes for and what stops it',
    intro: 'SMEs want software that works on day one, yet many stall. Compare each hope with the barrier that sits opposite it.',
    spec: {
      layout: 'compare', title: 'Small and Medium-Sized Enterprises (SMEs)', kicker: '',
      leftTitle: 'What SMEs look for', rightTitle: 'What holds them back',
      rows: [
        { label: 'Cost', a: 'Affordable subscriptions without upfront infrastructure', b: 'Budget constraints' },
        { label: 'Skills', a: 'Software manageable without a large internal IT team', b: 'Limited technical knowledge' },
        { label: 'Fit', a: 'Standard packages, templates and predefined deployment plans', b: 'Integration challenges' },
        { label: 'Return', a: 'Benefits that show quickly', b: 'Uncertainty about which investments pay back' },
      ],
      note: 'A 2025 national survey by VINASME and the Ministry of Science and Technology, reported by VietnamPlus, found 69% of businesses at basic use, 16% at system integration, 10% fully digitised with AI and 5% not started; it covers all businesses, not only SMEs.',
      takeaway: 'Low prices alone will not keep SME customers: guided onboarding and scalable support are part of the product.',
    },
  },
  'ent-m3-33-sector': {
    heading: 'Breadth with less depth, or depth with a smaller market',
    intro: 'Banks, hospitals, factories, retailers and ministries each run on their own rules. Compare a generic provider with a sector specialist to see what specialisation costs and earns.',
    spec: {
      layout: 'compare', title: 'Industry-Specific and Public-Sector Customers', kicker: '',
      leftTitle: 'Generic provider', rightTitle: 'Sector specialist',
      rows: [
        { label: 'Addressable market', a: 'Broad, across many industries', b: 'Smaller, one sector’s customers' },
        { label: 'Investment needed', a: 'General technical capability', b: 'Domain experts, compliance, certified integrations and long-term support' },
        { label: 'Solution fit', a: 'Can miss sector workflows and data rules', b: 'Built around workflows such as core banking or clinical care' },
        { label: 'Implementation risk', a: 'Higher risk of costly errors', b: 'Domain knowledge reduces costly errors' },
        { label: 'Defence against rivals', a: 'Easier for others to match', b: 'Harder for generic competitors to follow' },
      ],
      note: 'Mordor Intelligence estimates banking, financial services and insurance at 26.55% of Vietnam IT services demand in 2025, a third-party estimate. The Personal Data Protection Law, effective 1 January 2026, affects customers handling patient and bank-client data.',
      takeaway: 'Specialisation narrows the market but protects it where generic technology is not enough.',
    },
  },
  'ent-m3-41-revenue': {
    heading: 'Sorting income by whether it repeats, follows the work or swings',
    intro: 'The six revenue sources fall into a few patterns of predictability. Group them by how the money arrives, then ask what each costs to win and to deliver.',
    spec: {
      layout: 'taxonomy', title: 'Revenue Models and Income Sources', kicker: '',
      root: 'Provider revenue', rootDetail: 'Quality depends on predictability, retention, contract economics and cost of delivery',
      groups: [
        { label: 'Recurring', items: ['Subscriptions: fees for access, users, modules or tiers', 'Managed services: fees for running applications, cloud or security'] },
        { label: 'One-off or as delivered', items: ['Projects: fixed fee, time and materials or milestones', 'Licences: rights to use software on defined terms'] },
        { label: 'Variable with activity', items: ['Usage-based: transactions, computing use, API calls or data volume'] },
        { label: 'Through partners', items: ['Authorised resale', 'Technology distribution', 'Intellectual property licensing'] },
      ],
      note: 'Ken Research estimates Vietnam’s cloud ERP for SMEs market at about US$126.8 million in 2025, projected to reach US$356.7 million by 2031, a third-party estimate for one narrow category.',
      takeaway: 'A renewing subscription beats a one-off project of the same size only if keeping the customer stays cheap.',
    },
  },
  'ent-m3-42-costs': {
    heading: 'Costly to build and cheap to copy, or cheap to start and costly to grow',
    intro: 'Product-led and service-led firms carry the same cost groups in very different proportions. Compare how each one’s costs move as it adds customers.',
    spec: {
      layout: 'compare', title: 'Cost Structure and Major Operating Expenses', kicker: '',
      leftTitle: 'Product-led software vendor', rightTitle: 'Service-led IT provider',
      rows: [
        { label: 'Biggest early cost', a: 'Upfront research and development', b: 'Ongoing labour for project teams' },
        { label: 'Serving one more customer', a: 'Relatively low incremental cost', b: 'More direct labour as project scope expands' },
        { label: 'Costs to control', a: 'Product development and cloud infrastructure', b: 'Staffing, utilisation, scope and delivery productivity' },
        { label: 'How reuse helps', a: 'Engineering cost spread across many customers', b: 'Standard methods and templates cut effort' },
      ],
      note: 'TopDev via VnEconomy estimates a workforce of 530,000 short by 150,000 to 200,000 workers a year, and Viet Nam News reports only about 30% of IT graduates job-ready, so people costs press on both. These are recruiter and broker estimates.',
      takeaway: 'Know which costs scale with revenue, which are fixed and which automation, standardisation and reuse can reduce.',
    },
  },
  'ent-m3-43-economics': {
    heading: 'Growth is only worth having when each customer and contract pays',
    intro: 'Total sales can rise while individual customers or projects lose money. Trace sustainable value back to the measures that SaaS and service firms track.',
    spec: {
      layout: 'driverTree', title: 'Profitability, Unit Economics, and Financial Sustainability', kicker: '',
      root: { label: 'Sustainable value', detail: 'Healthy unit economics and cash flow, not total sales growth' },
      drivers: [
        { label: 'SaaS unit economics', detail: 'Recurring revenue against the cost to win and keep customers', children: [{ label: 'ARR and MRR' }, { label: 'Churn' }, { label: 'CAC against LTV' }] },
        { label: 'Project profitability', detail: 'Contracted fees against labour hours, subcontracting, rework and overhead' },
        { label: 'Resource utilisation', detail: 'Billable utilisation, staffing capacity, project pipeline and productivity' },
        { label: 'Customer retention', detail: 'Renewals, expansion revenue, service quality and cost of keeping accounts' },
        { label: 'Cash flow', detail: 'Payment terms, milestones, receivables and working capital' },
      ],
      note: 'In a World Bank study of one Vietnamese cloud ERP provider, close to 80% of firms used the free platform after training but only 35% about 18 months later; this is adoption drop-off, not paid churn.',
      takeaway: 'Measure profit by product, customer, project and contract, because growth can hide underpriced work and costly acquisition.',
    },
  },
  'ent-m3-51-direct': {
    heading: 'Turning a qualified lead into a relationship that renews',
    intro: 'A complex enterprise deal moves through assessment, demonstration and negotiation before delivery starts. Follow the stages and notice where sales and technical teams must work together.',
    spec: {
      layout: 'flow', title: 'Direct Sales and Enterprise Account Management', kicker: '',
      steps: [
        { label: 'Lead generation', detail: 'Industry research, networks, events, referrals and outreach; qualify need, budget and authority', kind: 'stage' },
        { label: 'Needs assessment', detail: 'Business challenges, current systems, budget limits and decision criteria', kind: 'stage' },
        { label: 'Solution demonstration', detail: 'Functionality, architecture, security capabilities and relevant use cases', kind: 'stage' },
        { label: 'Proposal and contract', detail: 'Scope, pricing, implementation milestones, service levels and terms', kind: 'stage' },
        { label: 'Strategic account development', detail: 'Monitor satisfaction and find renewal or expansion opportunities', kind: 'outcome' },
      ],
      note: 'FPT reports its Japan business grew 25.4% in 2025 and that it signed a first Japanese contract above US$100 million, company-reported. Real sales cycles loop and overlap.',
      takeaway: 'A proposal that promises more than delivery can provide wins the contract and loses the relationship.',
    },
  },
  'ent-m3-52-partners': {
    heading: 'Partners who widen reach and take a share of it',
    intro: 'Each partner type brings customers or capacity the provider lacks. See what flows between the provider and each partner, and why the rules in the middle matter.',
    spec: {
      layout: 'ecosystem', title: 'Channel Partners, Resellers, and Technology Ecosystems', kicker: '',
      center: { label: 'Software or service provider', detail: 'Sets rules on lead attribution, revenue sharing, support, branding and responsibilities' },
      actors: [
        { label: 'Resellers and distributors', relation: 'Sell licences, subscriptions and related services to their own customers', flows: ['product', 'money'] },
        { label: 'Cloud marketplaces', relation: 'Distribute applications through established cloud purchasing platforms', flows: ['product', 'money'] },
        { label: 'Implementation partners', relation: 'Configure, integrate and maintain enterprise systems', flows: ['service'] },
        { label: 'Technology alliances', relation: 'Combine complementary products, APIs and infrastructure into one offer', flows: ['product', 'information'] },
      ],
      note: 'FPT records distribution partnerships with Olivetti, IBM and Compaq in 1989–95 and an Oracle alliance in 1997, a company account. Training, certification and escalation processes keep partners accurate.',
      takeaway: 'Partners scale distribution only when incentives align and responsibility for customer outcomes is clear.',
    },
  },
  'ent-m3-53-digital': {
    heading: 'Click to buy or talk it through: matching sales effort to complexity',
    intro: 'Not every customer needs a salesperson, and some cannot buy without one. See how solution complexity points each prospect to a different journey.',
    spec: {
      layout: 'decision', title: 'Digital Channels, Self-Service, and Hybrid Go-to-Market Models', kicker: '',
      root: { label: 'A prospect arrives online', detail: 'Through websites, search, content marketing, webinars or professional platforms' },
      question: 'How complex is the solution the customer needs?',
      branches: [
        { condition: 'Standardised SaaS', outcome: 'Self-service', detail: 'Free trial, online purchase, upgrades, renewals and billing without a salesperson' },
        { condition: 'Simple product, smaller customer', outcome: 'Guided onboarding', detail: 'Online purchase plus onboarding and support so adoption lasts' },
        { condition: 'Complex enterprise purchase', outcome: 'Hybrid journey', detail: 'Digital discovery plus consultations, technical demonstrations and implementation support' },
      ],
      note: 'In a World Bank study, Facebook and VnExpress advertising drew 605 interested firms, yet usage fell from close to 80% after training to 35% about 18 months later. Compare channels by conversion, acquisition cost, cycle length and retention.',
      takeaway: 'Digital self-service supports scale, while human-led selling and technical guidance stay essential for complex purchases.',
    },
  },
  'ent-m3-61-suppliers': {
    heading: 'An outage at a supplier is still the provider’s outage',
    intro: 'Customers blame the provider even when the fault lies in a cloud platform or a shared library. Trace downstream reliability back to the suppliers it rests on.',
    spec: {
      layout: 'driverTree', title: 'Technology Suppliers and Infrastructure Partners', kicker: '',
      root: { label: 'Reliability the customer experiences', detail: 'Product quality and service continuity downstream' },
      drivers: [
        { label: 'Cloud infrastructure providers', detail: 'Computing, storage, databases, networking and managed platforms' },
        { label: 'Software and tool vendors', detail: 'Development, testing and monitoring tools and enterprise components' },
        { label: 'Cybersecurity suppliers', detail: 'Identity management, endpoint protection, threat monitoring and testing' },
        { label: 'Open-source communities', detail: 'Shared libraries and frameworks that need licensing and security review' },
        { label: 'Telecommunications connectivity', detail: 'Links that can fail, as submarine-cable outages show' },
        { label: 'Supplier governance', detail: 'Reviews reliability, licensing, support quality, service levels and dependency risk' },
      ],
      note: 'Gartner forecasts worldwide IaaS spending of US$287 billion in 2026 (+29.3%), a global forecast. Vietnam’s national cloud programme favours domestic providers for government agencies and state enterprises, a policy target.',
      takeaway: 'Manage suppliers as part of product quality, service continuity and risk, with contingency plans for when one fails.',
    },
  },
  'ent-m3-62-people': {
    heading: 'Joint delivery: who owns each step from requirements to feedback',
    intro: 'Customer and provider produce the outcome together. Follow delivery from aligning stakeholders to collecting feedback, and see how feedback shapes the next round.',
    spec: {
      layout: 'flow', title: 'Customers, Employees, and Delivery Partners', kicker: '',
      steps: [
        { label: 'Align customer stakeholders', detail: 'Requirements and decisions across business, IT, finance, procurement and security', kind: 'stage', owner: 'Customer and provider' },
        { label: 'Staff a capable team', detail: 'Recruit, train and retain staff with technical and domain expertise', kind: 'stage', owner: 'Provider' },
        { label: 'Coordinate delivery partners', detail: 'Roles, timelines, interfaces, quality standards and escalation processes', kind: 'stage', owner: 'Provider and partners' },
        { label: 'Drive user adoption', detail: 'Training, documentation, change management and ongoing assistance', kind: 'stage', owner: 'Customer and provider' },
        { label: 'Collect feedback', detail: 'Usability, reliability, support and business outcomes', kind: 'outcome', owner: 'Provider, from customers' },
      ],
      loop: 'Feedback improves the next delivery, and named owners at every boundary keep faults from falling between organisations.',
      note: 'Tuoi Tre News reports more than 1.9 million workers across about 80,000 technology firms; Viet Nam News, citing An Binh Securities, reports about 50,000 IT graduates a year, around 30% job-ready.',
      takeaway: 'Clear ownership, communication and sustained adoption effort turn technical capability into business value.',
    },
  },
  'ent-m3-63-environment': {
    heading: 'Rule-makers, skills-builders and funders around the industry',
    intro: 'Beyond customers and suppliers sit the institutions that set rules, build talent and supply capital. Group them by what each one shapes.',
    spec: {
      layout: 'taxonomy', title: 'Regulators, Industry Associations, Investors, and the Wider Business Environment', kicker: '',
      root: 'Wider business environment', rootDetail: 'Shapes technology investment, commercial practice and acceptable risk',
      groups: [
        { label: 'Rule-makers', detail: 'Privacy, cybersecurity, intellectual property and electronic transactions', items: ['Law on Data, effective 1 July 2025', 'Personal Data Protection Law, effective 1 January 2026', 'Law on Cybersecurity, effective 1 July 2026'] },
        { label: 'Skills and standards builders', items: ['Industry associations such as VINASA', 'Universities and training providers', 'Certification organisations'] },
        { label: 'Capital providers', items: ['External investors', 'Lenders', 'Strategic partners'] },
        { label: 'Corporate leadership', detail: 'Financial controls, risk management, contractual oversight and accountability' },
      ],
      note: 'The Personal Data Protection Law carries a maximum administrative fine of VND 3 billion for most violations; check legal texts against the current version before use.',
      takeaway: 'Governance is the deliberate trade-off between short-term profit and investment in people, controls and compliance.',
    },
  },
};
