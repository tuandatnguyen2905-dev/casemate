import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for Enterprise Software & IT Services Module 04, keyed by visualKind. */
export const ENT_M4_VISUALS: Record<string, ChapterVisual> = {
  'ent-m4-11-structure': {
    heading: 'Incumbents defend with lock-in, challengers attack with focus',
    intro: 'Platform giants, specialists, service firms and AI-native newcomers all compete at once. Compare what protects established vendors with what lets smaller rivals gain ground.',
    spec: {
      layout: 'compare', title: 'Market Structure and Competitive Intensity', kicker: '',
      leftTitle: 'Established vendors', rightTitle: 'Smaller and newer competitors',
      rows: [
        { label: 'Who they are', a: 'Large technology groups with broad portfolios across several categories', b: 'Specialist vendors, regional IT service providers and AI-native companies' },
        { label: 'What protects or lifts them', a: 'Brand recognition, extensive partner networks and switching costs', b: 'Specialised expertise, faster innovation and more flexible pricing' },
        { label: 'How they win customers', a: 'Integrated solutions bought from one ecosystem', b: 'Solving a specific business problem better than general-purpose platforms' },
        { label: 'Likely role in a hybrid market', a: 'Mission-critical, tightly integrated workflows; buying or partnering with AI firms', b: 'AI-native tools for targeted, high-impact uses' },
      ],
      note: 'Deloitte estimates AI agent-powered solutions could reach 60% of the total addressable software market by 2030; Gartner predicts 40% of application portfolios will include custom AI-native apps by 2030, up from 2% in 2025. Both are global analyst estimates.',
      takeaway: 'Competition is increasingly ecosystem-based, but a specialist that solves one problem better can still win.',
    },
  },
  'ent-m4-12-segments': {
    heading: 'Six suppliers at one customer, rarely in the same bid',
    intro: 'A cloud provider, an ERP vendor and an outsourcer may all serve the same enterprise without competing for the same purchase. Read what each supplies, then notice where the boundaries now overlap.',
    spec: {
      layout: 'ecosystem', title: 'Competitive Boundaries and Market Segmentation', kicker: '',
      center: { label: 'One enterprise customer', detail: 'Buys from several segments, each with its own competitive set' },
      actors: [
        { label: 'Enterprise applications vendor', relation: 'ERP, CRM, human capital and supply chain software; now also offers implementation and consulting', flows: ['product', 'money'] },
        { label: 'Cloud and infrastructure provider', relation: 'Public and hybrid cloud, databases, storage and computing; now adds data and AI services', flows: ['service', 'money'] },
        { label: 'Data and AI provider', relation: 'Business intelligence, data engineering, machine learning platforms, generative AI and AI agents', flows: ['information'] },
        { label: 'Cybersecurity specialist', relation: 'Identity management, endpoint and cloud security, governance and threat detection', flows: ['risk'] },
        { label: 'IT professional services firm', relation: 'Consulting, custom development and systems integration; some build proprietary platforms', flows: ['service', 'money'] },
        { label: 'Managed services and outsourcing provider', relation: 'Infrastructure management, application maintenance and outsourced development teams', flows: ['service'] },
      ],
      note: 'VINASA’s 2025 maps placed 257 firms in 389 positions across 23 maps, so many firms sit in several segments. MISA claims 33% of accounting software in the second quarter of 2025, a vendor figure for one narrow segment.',
      takeaway: 'Name the competitive set segment by segment: a rival in one market may be a partner in another.',
    },
  },
  'ent-m4-13-advantage': {
    heading: 'Advantages a newcomer cannot buy quickly',
    intro: 'A simple app is cheap to launch; replacing a system a bank runs on is not. See which advantages protect software products, which protect services, and why price is not among them.',
    spec: {
      layout: 'driverTree', title: 'Sources of Competitive Advantage and Barriers to Entry', kicker: '',
      root: { label: 'Defensible competitive position', detail: 'Built from capabilities that are hard to replicate quickly' },
      drivers: [
        {
          label: 'Owned technology', detail: 'Weighs most for software vendors', op: '+',
          children: [
            { label: 'Technology and intellectual property', detail: 'Proprietary platforms, architecture, patents and algorithms' },
            { label: 'Economies of scale', detail: 'Research, infrastructure and support costs spread across many customers' },
          ],
        },
        {
          label: 'Customer lock-in', detail: 'Protects established vendors', op: '+',
          children: [
            { label: 'Switching costs', detail: 'Data migration, retraining, integration and operational risk' },
            { label: 'Ecosystem development', detail: 'Cloud providers, implementation partners, resellers and developers' },
          ],
        },
        {
          label: 'People and trust', detail: 'Weighs most for service providers', op: '+',
          children: [
            { label: 'Talent and expertise', detail: 'Engineers, cloud architects, security specialists and industry experts' },
            { label: 'Trust and compliance', detail: 'Security, reliability, data governance and service continuity' },
          ],
        },
      ],
      note: 'CMC reports more than 5,800 employees and a pool of 3,000-plus engineers (company figures); TopDev, cited by VnEconomy, estimates a shortage of 150,000 to 200,000 tech workers a year in Vietnam.',
      takeaway: 'Entry is cheap for simple apps and costly for mission-critical systems, so newcomers need a differentiation strategy, not just a lower price.',
    },
  },
  'ent-m4-21-global': {
    heading: 'Compare platform giants inside their own category',
    intro: 'The best-known vendors do not sell the same thing. Place each in the category where it competes before judging which one is strongest.',
    spec: {
      layout: 'taxonomy', title: 'Global Enterprise Software and Platform Leaders', kicker: '',
      root: 'Global enterprise software and platform leaders', rootDetail: 'Broad portfolios that overlap across several technology markets',
      groups: [
        { label: 'Productivity, cloud and business apps', items: ['Microsoft: productivity, Azure, developer tools and AI-enabled solutions'] },
        { label: 'Enterprise applications and databases', items: ['SAP: ERP, finance, procurement and supply chain', 'Oracle: databases, cloud infrastructure, ERP and human capital management'] },
        { label: 'Customer and workflow platforms', items: ['Salesforce: CRM, sales and marketing automation, customer data', 'ServiceNow: workflow automation and IT service management'] },
        { label: 'Cloud infrastructure', items: ['AWS and Google Cloud: infrastructure, data platforms and AI services'] },
        { label: 'Mixed technology and consulting', items: ['IBM and Adobe: hybrid cloud, automation, analytics, digital experience and content workflows'] },
      ],
      note: 'Gartner forecasts worldwide software spending of US$1,468B in 2026 and IaaS spending up 29.3% to about US$287 billion; these are category forecasts, not any vendor’s revenue or share.',
      takeaway: 'Breadth does not make one vendor right for everyone: fit, total cost of ownership and implementation complexity decide.',
    },
  },
  'ent-m4-22-services': {
    heading: 'Execution, not software ownership, decides services contests',
    intro: 'Global service firms rarely own the software they deploy. See what each brings to a large transformation programme and which partners supply the platforms.',
    spec: {
      layout: 'ecosystem', title: 'Global IT Consulting, Systems Integration, and Outsourcing Firms', kicker: '',
      center: { label: 'Large transformation programme', detail: 'A multinational account or complex technology contract' },
      actors: [
        { label: 'Accenture', relation: 'Digital transformation, technology consulting, cloud, data, AI and systems integration', flows: ['service', 'money'] },
        { label: 'IBM Consulting', relation: 'Technology consulting, hybrid cloud, AI implementation and systems modernisation', flows: ['service', 'money'] },
        { label: 'Deloitte and Capgemini', relation: 'Business transformation, technology strategy and industry consulting', flows: ['information', 'money'] },
        { label: 'TCS, Infosys and Wipro', relation: 'Application development, managed services and global delivery', flows: ['service', 'money'] },
        { label: 'Cognizant', relation: 'Digital engineering, application services and cloud transformation', flows: ['service', 'money'] },
        { label: 'Hyperscalers and software vendors', relation: 'Joint delivery partners that supply the underlying platforms', flows: ['product'] },
      ],
      note: 'The common model blends onshore consulting with offshore or nearshore teams; CMC Global describes the same best-shore blend. FPT reports global IT services revenue of VND 35,382 billion in 2025, up 14.3% (company-reported).',
      takeaway: 'Service firms differentiate by converting complex programmes into reliable, measurable business results.',
    },
  },
  'ent-m4-23-vietnam': {
    heading: 'From engineering bench to consulting, platforms and AI',
    intro: 'Most Vietnamese providers start from engineering talent and cost-effective delivery. Follow the higher-value directions they are taking and the named firms that illustrate each.',
    spec: {
      layout: 'pathway', title: 'Vietnam’s Enterprise Software and IT Services Competitors', kicker: '',
      trunk: [
        { label: 'Engineering talent and flexible delivery', detail: 'Local market understanding and cost-effective execution for domestic and overseas clients', kind: 'stage' },
      ],
      optionsLabel: 'Higher-value directions',
      options: [
        { label: 'Consulting and digital transformation', items: ['FPT', 'Rikkeisoft'] },
        { label: 'Cloud, AI and own platforms', items: ['CMC: 72-billion-parameter language model', 'FPT: cloud and AI services'] },
        { label: 'Public sector and infrastructure', items: ['Viettel Solutions: digital government', 'VNPT: generative AI at 30 administrative units'] },
        { label: 'Specialised engineering', items: ['NashTech Vietnam: digital engineering', 'TMA Solutions: product development'] },
      ],
      afterLabel: 'Where it leads',
      after: [
        { label: 'Less reliance on labour-based outsourcing', detail: 'Deeper specialisation, intellectual property and international client relationships', kind: 'outcome' },
      ],
      note: 'An illustrative list, not a ranking. FPT reports VND 44,475 billion of 2025 technology revenue and CMC reports VND 10,555 billion; the scopes differ, so they cannot be ranked.',
      takeaway: 'Vietnam’s edge is engineering and delivery; consulting, platforms, AI and industry solutions are how providers capture more value.',
    },
  },
  'ent-m4-31-dimensions': {
    heading: 'Pick the yardstick before you pick the rival',
    intro: 'A software vendor and a services firm earn money differently, so one ruler misleads. Start from the business model, then choose indicators that fit it.',
    spec: {
      layout: 'decision', title: 'Benchmarking Dimensions and Evaluation Criteria', kicker: '',
      root: { label: 'Competitor to benchmark', detail: 'Same reporting period, clear definitions and comparable segments' },
      question: 'Does the competitor mainly sell software products or delivery services?',
      branches: [
        { condition: 'Software vendor', outcome: 'Product and recurring-revenue indicators', detail: 'Product capabilities, recurring revenue share, platform adoption and customer retention' },
        { condition: 'IT service provider', outcome: 'Delivery and workforce indicators', detail: 'Delivery quality, workforce expertise, project execution, utilisation and client relationships' },
      ],
      note: 'Six dimensions apply overall: financial, product and technology, customer, operational, market position and commercial attractiveness. VINASA’s Tech Map scores firms on 10 criteria across two axes, Vision and Execution, and sorts them into four strategic categories.',
      takeaway: 'A useful benchmark measures fitness for a specific requirement, not company size.',
    },
  },
  'ent-m4-32-compare': {
    heading: 'Every competitor group carries a matching weakness',
    intro: 'This is a qualitative map of strengths and limits, not a score. Use it to decide where to look for evidence before ranking anyone.',
    spec: {
      layout: 'table', title: 'Comparative Benchmarking of Major Competitors', kicker: '',
      headers: ['Competitor group', 'Primary strengths', 'Potential limitations'],
      rows: [
        { label: 'Software platforms: Microsoft, SAP, Oracle, Salesforce', a: 'Scalable products, broad functionality, established ecosystems', b: 'Licensing complexity, migration costs, vendor dependence' },
        { label: 'Cloud infrastructure: AWS, Azure, Google Cloud', a: 'Infrastructure scale, data and AI capabilities', b: 'Consumption-cost management, technical complexity' },
        { label: 'Global services: Accenture, IBM Consulting, TCS, Infosys', a: 'Transformation expertise, delivery scale', b: 'Programme complexity, coordination and cost pressure' },
        { label: 'Specialists: ServiceNow, Workday, Adobe', a: 'Focused functionality and specialised workflows', b: 'Dependence on integrations and broader platforms' },
        { label: 'Vietnamese providers: FPT, CMC, Viettel Solutions, TMA Solutions', a: 'Engineering talent, local knowledge, flexible delivery', b: 'Differentiation and scale vary by provider' },
      ],
      note: 'By our own division of company figures, FPT’s 2025 pre-tax margin was about 15.5% on global and 4.6% on domestic IT services, and CMC’s about 7.0% for the whole group; the scopes differ, so these are not like for like.',
      takeaway: 'No competitor leads on every dimension; validate each judgement with disclosures, customer references and segment data.',
    },
  },
  'ent-m4-33-positioning': {
    heading: 'Matching the pitch to what the buyer values most',
    intro: 'A position is defensible only if the target customer cares about it and rivals cannot easily copy it. Start from what the buyer values, then see which position answers it.',
    spec: {
      layout: 'decision', title: 'Competitive Positioning and Strategic Differentiation', kicker: '',
      root: { label: 'Target customer', detail: 'A defined market with its own priorities' },
      question: 'What does this customer value most when choosing a provider?',
      branches: [
        { condition: 'Advanced capability', outcome: 'Premium innovation', detail: 'Advanced technology, product quality, security and sophisticated capabilities', tone: 'positive' },
        { condition: 'Lower cost', outcome: 'Cost efficiency', detail: 'Automation, standardised services and transparent pricing; low price alone can weaken margins', tone: 'caution' },
        { condition: 'Deep sector knowledge', outcome: 'Industry specialist', detail: 'Expertise in banking, manufacturing, healthcare, retail or logistics', tone: 'positive' },
        { condition: 'Local language and rules', outcome: 'Local-market positioning', detail: 'Vietnamese-language support and solutions aligned with domestic requirements', tone: 'positive' },
        { condition: 'One accountable provider', outcome: 'Integrated solution', detail: 'Software, consulting, integration and ongoing support combined', tone: 'positive' },
        { condition: 'Proof of results', outcome: 'Outcome-based positioning', detail: 'Measured gains in productivity, process speed, reliability or customer experience', tone: 'positive' },
      ],
      note: 'FPT reports 25.4% growth in Japan in 2025 (company-reported); CMC targets US$200–250 million of Japan revenue by 2028, a company target.',
      takeaway: 'The most defensible position joins a clear target market, a distinctive capability and evidence of customer value.',
    },
  },
  'ent-m4-41-innovation': {
    heading: 'Innovation pays only when it is useful, secure and sustainable',
    intro: 'New technology counts when customers can trust it and see the benefit. Trace each innovation activity to the test it helps a product pass.',
    spec: {
      layout: 'driverTree', title: 'Technology Innovation and Product Differentiation', kicker: '',
      root: { label: 'Innovation that becomes commercial advantage', detail: 'Trusted products with measurable customer value' },
      formula: 'Advantage needs all three: useful, secure and commercially sustainable',
      drivers: [
        {
          label: 'Useful', detail: 'Customers adopt it', op: '+',
          children: [
            { label: 'Product usability', detail: 'Intuitive interfaces that reduce training' },
            { label: 'Interoperability', detail: 'Works with existing applications, databases and cloud environments' },
            { label: 'Industry specialization', detail: 'Fits sector workflows, regulations and operating conditions' },
          ],
        },
        {
          label: 'Secure', detail: 'Customers can trust it', op: '+',
          children: [
            { label: 'AI integration with controls', detail: 'Data protection, human oversight and appropriate access controls' },
          ],
        },
        {
          label: 'Commercially sustainable', detail: 'It keeps paying back', op: '+',
          children: [
            { label: 'Research and development', detail: 'Product improvements, software architecture and automation' },
            { label: 'Continuous improvement', detail: 'Customer feedback, product analytics, testing and release management' },
          ],
        },
      ],
      note: 'CMC says it trained a 72-billion-parameter model, MISA says it integrated AI agents for more than 170,000 enterprises and FPT reports an 8.2% productivity gain: company claims, not verified results. Gartner predicts 40% of portfolios will include custom AI-native apps by 2030.',
      takeaway: 'Speed of innovation matters less than turning it into trusted, governed products that customers adopt.',
    },
  },
  'ent-m4-42-talent': {
    heading: 'The loop that turns skilled people into lasting accounts',
    intro: 'Skilled teams deliver better projects, and satisfied customers bring back work that deepens expertise. Follow the loop and note what keeps it running when people leave.',
    spec: {
      layout: 'flow', title: 'Talent, Delivery Excellence, and Customer Relationships', kicker: '',
      steps: [
        { label: 'Technical recruitment', detail: 'Attract engineers, architects, data, cybersecurity and cloud specialists', kind: 'stage' },
        { label: 'Continuous learning', detail: 'Certifications, technical training, leadership development and knowledge sharing', kind: 'stage' },
        { label: 'Delivery governance', detail: 'Milestones, quality assurance, risk management and change control', kind: 'stage' },
        { label: 'Customer success', detail: 'Track adoption, service quality, business outcomes and renewal risks', kind: 'stage' },
        { label: 'Relationship management', detail: 'Open communication with technical teams, business stakeholders, procurement and sponsors', kind: 'stage' },
        { label: 'Retained and expanded accounts', detail: 'Feedback, domain knowledge and recurring business', kind: 'outcome' },
      ],
      loop: 'Recurring work deepens expertise for the next project, and knowledge retention keeps quality steady when individuals move on.',
      note: 'The 81 firms in VINASA’s Top 10 programme employ more than 132,000 engineers; TopDev, cited by VnEconomy, estimates a shortage of 150,000 to 200,000 tech workers a year, and only about 30% of IT graduates are reported job-ready.',
      takeaway: 'Talent and customer trust reinforce each other, so weakening either one weakens both.',
    },
  },
  'ent-m4-43-sustainability': {
    heading: 'Growth that lasts versus growth that erodes its own advantages',
    intro: 'Hiring ahead of demand or skipping security work can buy quick growth. Compare disciplined expansion with shortcuts whose cost appears later as overruns, incidents or lost customers.',
    spec: {
      layout: 'compare', title: 'Commercial Sustainability, Security, and Scalability', kicker: '',
      leftTitle: 'Disciplined growth', rightTitle: 'Growth that outruns control',
      rows: [
        { label: 'Revenue', a: 'Predictable subscription, renewal and managed-service revenue', b: 'Underpriced projects accepted to win volume' },
        { label: 'Costs', a: 'Cloud, staffing and support costs controlled; project overruns limited', b: 'Hiring ahead of demand squeezes margins' },
        { label: 'Scale', a: 'Platforms and delivery processes built for larger workloads and more customers', b: 'Performance and reliability unproven as workloads grow' },
        { label: 'Security and compliance', a: 'Secure development, identity controls, monitoring and incident response', b: 'Security work skipped; incidents and lost trust surface later' },
        { label: 'Dependence', a: 'Spread across customers, vendors, geographies and platforms', b: 'Reliance on a single customer, vendor or revenue stream' },
      ],
      note: 'Our division of company figures gives FPT about 15.5% pre-tax margin on global and 4.6% on domestic IT services in 2025, and CMC about 7.0% group-wide; not like for like. Vietnam’s Law on Cybersecurity took effect on 1 July 2026; Personal Data Protection Law fines reach VND 3 billion for most violations.',
      takeaway: 'Sustainable providers pair revenue quality and cost discipline with security and scalable delivery.',
    },
  },
  'ent-m4-51-swot': {
    heading: 'Turning each SWOT finding into an action',
    intro: 'An industry SWOT changes nothing until each line points to something a provider will do. Read across from the factors to the matching response.',
    spec: {
      layout: 'table', title: 'Industry SWOT Analysis', kicker: '',
      headers: ['Dimension', 'Industry-level factors', 'Matching action'],
      rows: [
        { label: 'Strengths', a: 'Scalable software, recurring revenue potential, automation, global delivery and technical expertise', b: 'Leverage them by expanding into adjacent services' },
        { label: 'Weaknesses', a: 'Legacy systems, integration complexity, talent dependence, uneven service quality, high transformation costs', b: 'Reduce them by modernising delivery methods' },
        { label: 'Opportunities', a: 'AI adoption, cloud migration, cybersecurity, data analytics, industry-specific software, digital transformation in Vietnam', b: 'Capture use cases with clear demand and measurable value' },
        { label: 'Threats', a: 'AI-native entrants, price competition, cyberattacks, changing regulations, vendor concentration, economic uncertainty', b: 'Mitigate through security, governance, contractual protections and contingency planning' },
      ],
      note: 'Vietnam illustrations: domestic providers hold about 20% of the cloud market (an official statement as reported); TopDev estimates a yearly shortage of 150,000 to 200,000 tech workers; the 2025–30 cloud programme is a policy target. Industry-level, not a company SWOT.',
      takeaway: 'Demand is strong but success is not automatic: tie every finding to a specific strategic action.',
    },
  },
  'ent-m4-52-challenges': {
    heading: 'Where new technology stalls before it creates value',
    intro: 'New tools arrive faster than customers can absorb them. Group the challenges by the part of the business that has to respond.',
    spec: {
      layout: 'taxonomy', title: 'Major Strategic Challenges', kicker: '',
      root: 'Converting technology change into lasting value', rootDetail: 'Adoption, governance, cost and workflow redesign, not deployment alone',
      groups: [
        { label: 'Finance', items: ['AI monetization: subscription, usage, feature tier or outcome pricing', 'Margin pressure: rising infrastructure, investment and support costs'] },
        { label: 'Technology and governance', items: ['Cybersecurity and data governance: threats, access, privacy', 'Legacy modernization: integration with limited downtime and migration risk'] },
        { label: 'People and adoption', items: ['Talent transformation: retraining for AI, data and security work', 'Customer adoption: workflow redesign, training and realised benefits'] },
      ],
      note: 'FPT reports an 8.2% productivity gain from AI (a company claim) and domestic IT services revenue up 11.5% while pre-tax profit fell 9.7%, consistent with but not proof of margin pressure. About 30% of IT graduates are reported job-ready.',
      takeaway: 'Deploying tools without adoption, governance, cost control and workflow redesign rarely produces lasting results.',
    },
  },
  'ent-m4-53-priorities': {
    heading: 'Choose a niche first, then build what makes it defensible',
    intro: 'Competing in every category spreads resources too thin. Start with the markets to win, select the capabilities to build there, and track whether they pay back.',
    spec: {
      layout: 'pathway', title: 'Strategic Responses and Future Competitive Priorities', kicker: '',
      trunk: [
        { label: 'Focus on priority markets', detail: 'Segments and industries where a defensible advantage can be built', kind: 'stage' },
      ],
      optionsLabel: 'Capabilities to select among',
      options: [
        { label: 'AI-enabled offerings', detail: 'High-value use cases integrated with appropriate governance' },
        { label: 'Cybersecurity and resilience', detail: 'Built into product design, implementation and service delivery' },
        { label: 'Reusable assets', detail: 'Proprietary components, industry templates, frameworks and automation tools' },
        { label: 'Partnerships', detail: 'Cloud platforms, software vendors, universities and specialist firms' },
      ],
      afterLabel: 'Then',
      after: [
        { label: 'Commercial discipline', detail: 'Track acquisition cost, retention, project profitability and return on technology', kind: 'stage' },
        { label: 'Move up the value chain', detail: 'From labour-based execution to consulting, solution architecture and product ownership', kind: 'outcome' },
      ],
      note: 'Company statements, not outcomes: FPT’s digital transformation revenue was VND 16,751 billion, about 47.3% of overseas IT services, with a first Japanese contract above US$100 million; CMC targets US$200–250 million of Japan revenue by 2028.',
      takeaway: 'Build capabilities customers will pay for over time rather than chasing every new technology.',
    },
  },
};
