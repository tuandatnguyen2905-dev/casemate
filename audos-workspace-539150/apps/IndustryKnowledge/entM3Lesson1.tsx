import { EntDeepDive, citeEnt3, entM3Chapter, entQuiz } from './entM3Core';
import type { EntM3LessonBundle } from './entM3Core';

const LESSON = '1. Industry Business Models';

const deck = [
  entM3Chapter({
    title: 'Enterprise Software Vendors and SaaS Providers', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how software vendors scale intellectual property through products and subscriptions, and what keeps the model sustainable.',
    mateIntro: 'Write the code once and sell it many times. That is the promise of software, and the reason vendors are judged on retention as much as on sales.',
    keyInsight: 'Software vendors seek to scale intellectual property across a broad customer base. Their performance depends on product relevance, customer acquisition, retention, recurring revenue, and the ability to control development and infrastructure costs.',
    statTiles: [
      { value: '5', label: 'Key vendor activities', subtitle: 'Packaged software to platform ecosystems', description: 'Packaged software, SaaS subscriptions, product development, customer success and platform ecosystems.' },
      { value: '1999', label: 'Year Salesforce.com launched as an early SaaS example', subtitle: 'Communications of the ACM', description: 'SaaS runs software remotely on the provider’s infrastructure.' },
      { value: 'VND 2.95M', label: 'Starting annual price of MISA AMIS Accounting for one user', subtitle: 'MISA website, vendor list price', description: 'Up to VND 8.15 million a year for three users on the highest plan.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The prices are a Vietnamese vendor’s own list prices, and another MISA page lists a different starter price, so current prices must be checked.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software vendors develop and commercialize applications or platforms that help organizations manage business processes, data, workflows, and technology environments. Their products may include ERP, CRM, HRM, financial management, analytics, cybersecurity, and collaboration software.' },
      { label: 'Why it is happening', text: 'Many vendors increasingly use Software-as-a-Service (SaaS), delivering applications through cloud infrastructure and charging recurring subscription fees. This model can create predictable revenue and support continuous product updates, although vendors must maintain infrastructure, security, customer support, and ongoing product development.' },
      { label: 'Real-world example', text: 'Vendors develop standardised applications for finance, sales, HR, procurement and operations; charge monthly or annual fees by users, features, usage or service tier; maintain roadmaps, release updates, improve usability and fix security vulnerabilities; support onboarding, adoption, renewals and expansion into more modules; and provide APIs, developer tools, integrations and partner programmes that extend the product.' },
      { label: 'Vietnam example', text: 'MISA sells AMIS Accounting as an annual subscription, with plans from VND 2,950,000 a year for one user to VND 8,150,000 for three users, and describes a cloud platform of more than 40 applications that needs no server investment. In an October 2025 press release it says its accounting software served more than 214,000 businesses at the end of 2024 and 254,556 after seven months of 2025. These are vendor figures, other MISA pages give different customer counts and prices, and no public data on how Vietnamese software vendors split between licences and subscriptions was found.' },
      { label: 'Business impact', text: 'Software vendors can achieve scale through reusable products and recurring subscriptions. Long-term success requires continuous innovation, reliable service, strong retention, and a sustainable balance between acquisition costs and customer lifetime value.' },
    ],
    visualKind: 'ent-m3-11-vendors', visualHeading: 'Five activities of a software vendor',
    visualIntro: 'Explore the five activities around the idea of scaling intellectual property.',
    imageAlt: 'Casemate mind map of five software vendor activities around scaling intellectual property',
    keyTerms: [
      { term: 'SaaS', definition: 'Software as a service: applications delivered over the internet for a recurring fee, with the provider running the infrastructure.' },
      { term: 'Recurring revenue', definition: 'Income that repeats each month or year as long as the customer keeps subscribing.' },
      { term: 'Customer lifetime value', definition: 'The total revenue or margin a customer is expected to bring over the whole relationship.' },
      { term: 'Platform ecosystem', definition: 'The APIs, developer tools and partners that extend a software product.' },
    ],
    recap: [
      'Vendors reuse one product across many customers.',
      'SaaS adds predictable revenue but also infrastructure, security and support duties.',
      'Retention and expansion matter as much as new sales.',
      'Acquisition cost must stay in balance with customer lifetime value.',
    ],
    chapterRecap: 'Software vendors can achieve scale through reusable products and recurring subscriptions. Long-term success requires continuous innovation, reliable service, strong retention, and a sustainable balance between acquisition costs and customer lifetime value.',
    deepDiveTitle: 'How this module is organised',
    body: <EntDeepDive paragraphs={[
      'This chapter examines how Enterprise Software & IT Services companies organize their offerings, serve different customer segments, generate revenue, manage costs, and reach the market. The industry includes software product companies, cloud-based SaaS providers, IT consulting firms, systems integrators, outsourcing companies, and managed-service providers.',
      'These business models differ in their scalability, customer relationships, delivery requirements, and financial characteristics. Software vendors can often distribute standardized products across many customers, while IT service providers depend more directly on skilled labor, project execution, and ongoing client relationships. Hybrid businesses combine software intellectual property with implementation and support services to capture value across the technology lifecycle.' ]} evidence="Both paragraphs are the module overview from the supplied brief. MISA figures are from its own website and press release and are vendor claims; the SaaS example is from Communications of the ACM." />,
    sources: citeEnt3('saasHistory', 'misaAccounting', 'misaPlatform', 'misaPress'),
  }),
  entM3Chapter({
    title: 'IT Consulting, Systems Integration, and Custom Development', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how service firms earn from expertise and project execution and what drives their profitability.',
    mateIntro: 'A software vendor sells access. A service firm sells people who know how to make things work, project by project.',
    keyInsight: 'Service providers monetize expertise and execution rather than software access alone. Their competitive advantage depends on specialized knowledge, project delivery quality, customer trust, and the ability to manage complexity efficiently.',
    statTiles: [
      { value: '5', label: 'Key service activities', subtitle: 'Strategy to application modernization', description: 'IT strategy consulting, systems integration, custom development, implementation projects and application modernization.' },
      { value: 'Late 1990', label: 'FPT’s first commercial software contract', subtitle: 'FPT history, company account', description: 'A reservation system for Vietnam Airlines.' },
      { value: 'VND 16,751B', label: 'FPT digital transformation revenue from overseas clients in 2025', subtitle: 'FPT annual report, company-reported, +16.8%', description: 'About 47.3% of its overseas IT services revenue.' },
    ],
    statsNote: 'The first tile is a count from this lesson. FPT figures are company-reported and describe one provider, not the industry.',
    narrative: [
      { label: 'What it is', text: 'IT consulting and systems integration firms help customers define technology strategies, select suitable platforms, redesign business processes, and connect systems across the organization. Custom software development providers build applications or components tailored to specific customer requirements when standardized products are insufficient.' },
      { label: 'Why it is happening', text: 'These models are generally more project-intensive than pure software businesses. Revenue depends on securing contracts, defining project scope, assigning qualified teams, managing delivery risks, and meeting customer expectations. Long-term relationships may generate additional implementation, modernization, and support work.' },
      { label: 'Real-world example', text: 'Firms assess business needs, technology architecture, transformation priorities and roadmaps; connect enterprise applications, databases, cloud platforms and external services; build software around customer-specific workflows and integrations; configure platforms, migrate data, test systems and prepare users; and refactor, replace or migrate legacy systems to improve scalability, maintainability and security.' },
      { label: 'Vietnam example', text: 'FPT’s own history says it signed its first commercial software contract in late 1990 for a Vietnam Airlines reservation system, then took on IT projects in banking, public finance, telecoms and power. Its 2025 annual report lists digital, green and AI transformation consulting and national and provincial digital systems among its services and reports digital transformation revenue of VND 16,751 billion from overseas clients, all company accounts. No public Vietnam-wide data on project margins, estimating accuracy or staff utilisation was found.' },
      { label: 'Business impact', text: 'Consulting, integration, and custom development businesses create value by solving complex customer problems. Profitability depends on accurate project estimation, effective resource utilization, controlled scope, and consistent delivery quality.' },
    ],
    visualKind: 'ent-m3-12-consulting', visualHeading: 'Five ways service providers monetise expertise',
    visualIntro: 'Explore the five activities around the idea of expertise and execution.',
    imageAlt: 'Casemate mind map of five ways IT service providers earn from expertise',
    keyTerms: [
      { term: 'Systems integration', definition: 'Connecting applications, databases, cloud platforms and external services so they work as one.' },
      { term: 'Custom development', definition: 'Building software to a specific customer’s requirements when standard products do not fit.' },
      { term: 'Project scope', definition: 'The agreed boundaries of what a project will and will not deliver.' },
      { term: 'Application modernization', definition: 'Refactoring, replacing or migrating older systems to make them scalable, maintainable and secure.' },
    ],
    recap: [
      'Service firms sell expertise and execution, not access to a product.',
      'Revenue depends on winning contracts, scoping well and staffing projects.',
      'Long relationships can lead to implementation, modernization and support work.',
      'Profit rests on estimation, utilization, scope control and delivery quality.',
    ],
    chapterRecap: 'Consulting, integration, and custom development businesses create value by solving complex customer problems. Profitability depends on accurate project estimation, effective resource utilization, controlled scope, and consistent delivery quality.',
    deepDiveTitle: 'Why scope control decides project profit',
    body: <EntDeepDive paragraphs={[
      'A fixed-fee project that grows beyond its original scope can lose money even if the customer is satisfied, because the extra hours are not paid for. A time-and-materials project avoids that risk for the provider but may strain the relationship if the bill rises.',
      'That is why defining scope clearly and changing it formally matter as much as technical skill.' ]} evidence="The service activities and the profitability factors are from the supplied brief; FPT history and figures are from its own history page and annual report and are company accounts. The fixed-fee example is our own illustration." />,
    sources: citeEnt3('fptHistory', 'fptTechnology2025', 'fptGlobalIt2025'),
  }),
  entM3Chapter({
    title: 'IT Outsourcing, Managed Services, and Hybrid Models', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare outsourcing, managed services and hybrid models and the risks of delivering several offerings at once.',
    mateIntro: 'Some customers do not want a project. They want someone to take over a job and keep doing it well. That is the logic of outsourcing and managed services.',
    keyInsight: 'Recurring service contracts can stabilize revenue, while hybrid offerings can increase customer value. Providers must nevertheless manage service-level commitments, staffing requirements, operational risk, and the potential complexity of delivering multiple offerings.',
    statTiles: [
      { value: '5', label: 'Key outsourcing and hybrid activities', subtitle: 'Outsourcing to outcome-based contracts', description: 'IT outsourcing, managed services, dedicated teams, hybrid solutions and outcome-based contracts.' },
      { value: '39.05%', label: 'Share of Vietnam IT services value held by IT outsourcing in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'For IT services only, not enterprise software.' },
      { value: '+14.3%', label: 'Growth in FPT overseas IT services revenue in 2025', subtitle: 'FPT annual report, company-reported', description: 'Alongside a shift from time-and-materials to managed services.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Mordor share is a third-party estimate for services only, and the FPT figure is company-reported for one provider.',
    narrative: [
      { label: 'What it is', text: 'IT outsourcing allows organizations to transfer selected technology activities to external providers. Managed-service providers operate and maintain defined systems under ongoing service agreements, while outsourcing firms may supply dedicated teams for software engineering, testing, application maintenance, or technical support.' },
      { label: 'Why it is happening', text: 'Hybrid providers combine these services with proprietary software, consulting, cloud capabilities, or specialized industry solutions. This approach can generate multiple revenue streams and deepen customer relationships, but it also requires effective coordination across product development, project delivery, and recurring service operations.' },
      { label: 'Real-world example', text: 'Providers supply external development teams, testing resources, help desks or application support; operate infrastructure, cloud environments, business applications or cybersecurity systems under agreed service levels; provide long-term engineering or specialist teams that work alongside customers; combine software subscriptions, implementation projects and ongoing maintenance; and link part of the commercial arrangement to agreed performance measures where outcomes can be defined and measured reliably.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates that IT outsourcing held 39.05% of Vietnam’s IT services value in 2025, and Vietnam Briefing links growth to nearshore outsourcing demand from Japan and the United States. FPT reports overseas IT services revenue of VND 35,382 billion, up 14.3%, and says it is moving contracts from time-and-materials toward managed services; these are company statements. No public data on how common dedicated-team or outcome-based contracts are in Vietnam was found.' },
      { label: 'Business impact', text: 'Outsourcing and managed services create opportunities for recurring relationships, while hybrid models broaden the range of customer needs a provider can address. Sustainable performance requires strong service management, staffing discipline, and clear contractual responsibilities.' },
    ],
    visualKind: 'ent-m3-13-hybrid', visualHeading: 'Where six business models sit',
    visualIntro: 'Compare six models by how tailored they are and how predictable their revenue is.',
    imageAlt: 'Casemate matrix placing six enterprise software and IT services business models by tailoring and revenue predictability',
    keyTerms: [
      { term: 'Managed service', definition: 'Ongoing operation and maintenance of defined systems under a service agreement.' },
      { term: 'Dedicated team', definition: 'A long-term group of engineers or specialists who work alongside a customer’s organization.' },
      { term: 'Hybrid model', definition: 'A business that combines software, projects and ongoing services.' },
      { term: 'Outcome-based contract', definition: 'A contract in which part of the payment depends on agreed performance measures.' },
    ],
    recap: [
      'Outsourcing and managed services move defined work to an external provider.',
      'Recurring service contracts can stabilize revenue.',
      'Hybrid offerings increase customer value but add complexity.',
      'Service levels, staffing and risk must be managed carefully.',
    ],
    chapterRecap: 'Outsourcing and managed services create opportunities for recurring relationships, while hybrid models broaden the range of customer needs a provider can address. Sustainable performance requires strong service management, staffing discipline, and clear contractual responsibilities.',
    deepDiveTitle: 'When outcome-based pricing is realistic',
    body: <EntDeepDive paragraphs={[
      'An outcome-based contract only works if the outcome can be defined, measured and attributed to the provider’s work. Many technology results also depend on the customer’s own staff and data, which makes attribution hard.',
      'The brief therefore limits the idea to cases where outcomes can be defined and measured reliably, and most contracts will still link payment to inputs or service levels.' ]} evidence="The model descriptions are from the supplied brief; the Vietnam outsourcing share is from Mordor Intelligence; FPT’s statements are from its annual report; the nearshore point is from Vietnam Briefing. The attribution caution is our own reading." />,
    sources: citeEnt3('mordorVietnamIt', 'vietnamBriefingIt', 'fptGlobalIt2025'),
  }),
];

const quiz = entQuiz('ent-m3-l1', [
  { chapter: '1', objective: 'Describe vendors’ aim', question: 'What do software vendors seek to do?', application: 'A founder asks what the vendor model is. What is the answer?', correct: 'Scale intellectual property across a broad customer base', wrong: ['Sell hours of consulting', 'Build a new product for each client', 'Avoid recurring revenue'], explanation: 'Reuse is the core idea. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain SaaS', question: 'What is distinctive about SaaS?', application: 'A customer asks why it pays monthly. What is the reason?', correct: 'Applications are delivered through cloud infrastructure for recurring subscription fees', wrong: ['Software is installed once for free', 'The customer owns the servers', 'There are no updates'], explanation: 'SaaS is subscription-based. Review Chapter 1.' },
  { chapter: '1', objective: 'List vendor duties', question: 'What must SaaS vendors keep maintaining?', application: 'A vendor cuts security spending to boost margin. What is the risk?', correct: 'Infrastructure, security, customer support and product development', wrong: ['Only marketing', 'Only invoices', 'Nothing after launch'], explanation: 'Recurring revenue brings recurring duties. Review Chapter 1.' },
  { chapter: '1', objective: 'Read vendor claims carefully', question: 'How should MISA’s customer counts be described?', application: 'A slide cites 283,385 as an official statistic. What is the correction?', correct: 'As the vendor’s own figures, with other MISA pages giving different counts', wrong: ['As a Gartner forecast', 'As a government census', 'As a global average'], explanation: 'Label vendor claims. Review Chapter 1.' },
  { chapter: '2', objective: 'Name what service firms monetise', question: 'What do service providers monetize?', application: 'A consultant explains the model. What is the answer?', correct: 'Expertise and execution rather than software access alone', wrong: ['Only software licences', 'Only hardware', 'Only advertising'], explanation: 'Services sell skill. Review Chapter 2.' },
  { chapter: '2', objective: 'State a profit driver', question: 'Which factor drives project profitability?', application: 'A project overruns. What was likely missing?', correct: 'Accurate estimation, effective utilization, controlled scope and consistent quality', wrong: ['Larger logos', 'More meetings', 'Fewer documents'], explanation: 'Delivery discipline matters. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a Vietnam example', question: 'What did FPT’s first commercial software contract, in late 1990, cover?', application: 'A timeline needs the detail. What is it?', correct: 'A reservation system for Vietnam Airlines, according to FPT’s own history', wrong: ['A cloud platform', 'A mobile game', 'A social network'], explanation: 'It is a company account. Review Chapter 2.' },
  { chapter: '3', objective: 'Define managed services', question: 'What do managed-service providers do?', application: 'A bank hands its monitoring to a provider. What is the model?', correct: 'Operate and maintain defined systems under ongoing service agreements', wrong: ['Sell one-off licences only', 'Design logos', 'Train accountants only'], explanation: 'Managed services are ongoing. Review Chapter 3.' },
  { chapter: '3', objective: 'State the hybrid trade-off', question: 'What does a hybrid model require?', application: 'A provider sells software, projects and support. What is the challenge?', correct: 'Effective coordination across product development, project delivery and recurring service operations', wrong: ['No coordination', 'Dropping the software', 'Ending all contracts'], explanation: 'Complexity grows. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'How should the 39.05% outsourcing share be described?', application: 'A pitch calls it the share of software spending. What is wrong?', correct: 'It is a third-party estimate of Vietnam IT services value, not software spending', wrong: ['It is an official tax figure', 'It is a global forecast', 'It is an FPT result'], explanation: 'Scope matters. Review Chapter 3.' },
]);

export const LESSON_ENT3_1: EntM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can compare software vendors, service firms and outsourcing or hybrid providers by how they scale and earn.',
    keyTakeaways: [
      'Software vendors scale reusable products and increasingly sell subscriptions.',
      'Service firms monetize expertise, and profit depends on scoping and utilization.',
      'Managed services and outsourcing add recurring revenue but also service-level risk.',
      'Hybrid models broaden value but need coordination across product, projects and operations.',
      'Vendor and company figures in this module are labelled as such.',
    ],
    businessImplications: 'Choose a model that fits your capabilities, protect retention in subscription businesses and price services to cover delivery cost.',
    remember: 'Products scale through reuse; services scale through people.',
    nextLesson: 'Products, Services & Segmentation',
  },
};
