import { EntDeepDive, citeEnt, entM2Chapter, entQuiz } from './entM2Core';
import type { EntM2LessonBundle } from './entM2Core';

const LESSON = '3. Midstream Activities';

const deck = [
  entM2Chapter({
    title: 'Business Analysis, Solution Architecture, and Product Design', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how requirements become a solution design and why design quality shapes later cost and risk.',
    mateIntro: 'Before anyone writes code, someone has to decide what to build. A mistake here is cheap to fix on paper and expensive to fix later.',
    keyInsight: 'Clear requirements and sound architecture reduce downstream delivery risk. The goal is to design a solution that meets business needs while remaining secure, maintainable, scalable, and economically viable.',
    statTiles: [
      { value: '5', label: 'Key midstream activities', subtitle: 'Requirements to delivery planning', description: 'Requirements analysis, process mapping, solution architecture, product design and delivery planning.' },
      { value: '26.55%', label: 'Share of Vietnam IT services demand from banking, financial services and insurance in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'The largest customer vertical in the estimate.' },
      { value: '67.72%', label: 'Share of Vietnam IT services value held by large enterprises in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'Customer type shapes the requirements providers must design for.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are third-party estimates for IT services only and show how varied customer needs are, not design quality.',
    narrative: [
      { label: 'What it is', text: 'Midstream activities begin when business needs and technical inputs are translated into a solution design. Business analysts, consultants, product managers, and solution architects identify user requirements, map existing processes, define system boundaries, and determine how software will support the customer’s objectives.' },
      { label: 'Why it is happening', text: 'The design stage influences the cost, complexity, and performance of subsequent development and implementation. Poorly defined requirements can result in scope changes, integration problems, delays, and solutions that fail to address the customer’s actual needs.' },
      { label: 'Real-world example', text: 'Teams document business objectives, user needs and functional and non-functional requirements; examine current workflows to find chances to simplify or automate; define applications, data structures, integrations, infrastructure, security controls and technology standards; develop user journeys, interface prototypes, specifications and acceptance criteria; and estimate resources, timelines, costs, risks and dependencies before implementation begins.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates that banking, financial services and insurance made up 26.55% of Vietnam’s IT services demand in 2025 and that large enterprises held 67.72% of value, which suggests that designers face very different requirements by customer type; both are third-party estimates for services only. FPT lists digital, green and AI transformation consulting among its technology services. A law firm briefing lists the Digital Transformation Law (148/2025/QH15) among laws effective on 1 July 2026, and its requirements were not reviewed here. No public data on requirement-related rework or project failure rates in Vietnam was found.' },
      { label: 'Business impact', text: 'Business analysis and solution design connect customer requirements with technical execution. Strong design practices help reduce rework and improve the likelihood that the delivered solution creates meaningful business value.' },
    ],
    visualKind: 'ent-m2-31-design', visualHeading: 'Five design activities',
    visualIntro: 'Explore the five activities around the centre and what each produces.',
    imageAlt: 'Casemate mind map of five solution design activities around the idea of solution design',
    keyTerms: [
      { term: 'Functional requirement', definition: 'What the system must do, such as approve an invoice.' },
      { term: 'Non-functional requirement', definition: 'How well the system must perform, such as speed, security or availability.' },
      { term: 'Solution architecture', definition: 'The overall design of applications, data, integrations, infrastructure and controls.' },
      { term: 'Acceptance criteria', definition: 'Agreed conditions that show a deliverable is complete.' },
    ],
    recap: [
      'Design turns business needs into a technical plan.',
      'Poor requirements cause scope changes, delays and integration problems.',
      'Architecture must be secure, maintainable, scalable and economical.',
      'Delivery planning sets resources, cost, risk and dependencies up front.',
    ],
    chapterRecap: 'Business analysis and solution design connect customer requirements with technical execution. Strong design practices help reduce rework and improve the likelihood that the delivered solution creates meaningful business value.',
    deepDiveTitle: 'Why design errors get more expensive the later they are found',
    body: <EntDeepDive paragraphs={[
      'A wrong requirement discovered on paper costs a conversation. Found after coding, it costs rework, and found after rollout, it costs rework plus disruption to users.',
      'That is why careful analysis and acceptance criteria are treated as risk controls and not as paperwork.' ]} evidence="The design activities and risks are from the supplied brief; the Vietnam shares are from Mordor Intelligence; FPT’s services are from its annual report; the law listing is from an Andersen Vietnam briefing. The rising cost of late errors is our own explanation of the brief’s point about downstream risk." />,
    sources: citeEnt('mordorVietnamIt', 'fptTechnology2025', 'andersenLaws'),
  }),
  entM2Chapter({
    title: 'Software Development, Configuration, and Testing', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how designs become validated releases and why quality matters more than coding speed.',
    mateIntro: 'Writing code is the visible part. Making it reliable, secure and easy to change is the part customers pay for.',
    keyInsight: 'Development productivity matters, but reliable and maintainable software is the real output. Faster coding does not create lasting value if the resulting system is difficult to secure, integrate, operate, or update.',
    statTiles: [
      { value: '5', label: 'Key midstream activities', subtitle: 'Development to release management', description: 'Application development, enterprise configuration, integration and data migration, quality assurance and release management.' },
      { value: '1999', label: 'Year Salesforce.com launched as an early SaaS example', subtitle: 'Communications of the ACM', description: 'SaaS made frequent, remote releases a normal expectation.' },
      { value: '+15.5%', label: 'Forecast growth in worldwide software spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$1,468 billion, a global category forecast.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figure is a worldwide forecast for all software, not enterprise software and not Vietnam.',
    narrative: [
      { label: 'What it is', text: 'This stage transforms requirements and designs into working software. Activities may include coding new applications, configuring existing enterprise platforms, customizing workflows, integrating APIs, migrating data, and developing automated tests.' },
      { label: 'Why it is happening', text: 'Delivery methods vary by project. Product companies may use iterative development to release improvements continuously, while enterprise implementation projects may combine configuration, custom development, testing, and formal acceptance processes. Quality assurance is necessary throughout the lifecycle, not only before deployment.' },
      { label: 'Real-world example', text: 'Teams build web and mobile applications, enterprise platforms, APIs and supporting services; configure ERP, CRM, HRM, workflow and reporting systems to approved requirements; connect systems and transfer data while keeping it accurate, consistent and intact; run functional, integration, performance, usability and security tests; and review code, manage versions, document changes and prepare validated releases.' },
      { label: 'Vietnam example', text: 'FPT says it received ISO 9001 certification in February 2000, a quality-management standard it adopted soon after its first software export to North America on 13 June 1999, and it reports an 8.2% productivity gain from its AI-first strategy, all company accounts. It also reports that a first Japanese contract above US$100 million was signed. No public data on defect rates, test coverage or release frequency for Vietnamese providers was found, so none is stated.' },
      { label: 'Business impact', text: 'Software development and testing turn designs into functional technology solutions. Effective engineering practices balance speed, quality, security, and maintainability to support reliable delivery.' },
    ],
    visualKind: 'ent-m2-32-development', visualHeading: 'From design to a validated release',
    visualIntro: 'Follow the five steps from application development to release management.',
    imageAlt: 'Casemate step diagram from application development to release management',
    keyTerms: [
      { term: 'Iterative development', definition: 'Building software in short cycles and releasing improvements continuously.' },
      { term: 'Data migration', definition: 'Moving data from old systems to new ones while keeping it accurate.' },
      { term: 'Quality assurance', definition: 'Testing and checking work throughout the lifecycle, not only before launch.' },
      { term: 'Release management', definition: 'Controlling versions, documentation and validation before software goes live.' },
    ],
    recap: [
      'Development, configuration, integration and testing turn designs into software.',
      'Product teams may release continuously, while enterprise projects add formal acceptance.',
      'Quality assurance runs through the whole lifecycle.',
      'Reliable and maintainable software is the real output.',
    ],
    chapterRecap: 'Software development and testing turn designs into functional technology solutions. Effective engineering practices balance speed, quality, security, and maintainability to support reliable delivery.',
    deepDiveTitle: 'Why speed alone is a poor measure of engineering',
    body: <EntDeepDive paragraphs={[
      'Code written quickly but without tests, documentation or security checks becomes expensive to change. The cost shows up later as incidents, delays and difficulty upgrading.',
      'Mature teams therefore measure outcomes such as reliability and ease of change alongside the pace of delivery.' ]} evidence="The activities and delivery methods are from the supplied brief; FPT dates and claims are from its history, milestones and annual report pages and are company accounts; SaaS history is from Communications of the ACM; the growth figure is from Gartner. The point about later costs is our own reasoning." />,
    sources: citeEnt('fptMilestones', 'fptGlobalIt2025', 'saasHistory', 'gartnerJuly2026'),
  }),
  entM2Chapter({
    title: 'Implementation, Integration, and Service Delivery', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how implementation connects software to the customer’s operations and why adoption decides results.',
    mateIntro: 'Software that runs perfectly but is not used has delivered nothing. Implementation is where technology meets people and habits.',
    keyInsight: 'Implementation success depends on organizational adoption as well as technical delivery. Providers must manage people, processes, data, and technology together to translate deployment into business outcomes.',
    statTiles: [
      { value: '5', label: 'Key midstream activities', subtitle: 'Integration to service transition', description: 'System integration, data migration, deployment management, change management and service transition.' },
      { value: '4', label: 'Kodak data centers whose work IBM agreed to take over in 1989', subtitle: 'The Washington Post', description: 'A landmark example of transferring operations to an external provider.' },
      { value: '~300', label: 'Kodak IT staff transferred to IBM in that deal', subtitle: 'Information Systems Research (academic article)', description: 'Handover included people as well as systems.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Kodak figures describe one 1989 deal, cited as an influential outsourcing example rather than a typical implementation.',
    narrative: [
      { label: 'What it is', text: 'Implementation connects software to the customer’s operating environment. It may involve configuring infrastructure, integrating applications, migrating data, training employees, redesigning workflows, and coordinating the transition from existing systems to new solutions.' },
      { label: 'Why it is happening', text: 'For complex enterprise projects, implementation can require substantial coordination among vendors, internal IT teams, business departments, and external service providers. The software may function technically yet still fail to deliver expected results if employees do not adopt it or business processes remain poorly aligned with the new system.' },
      { label: 'Real-world example', text: 'Providers connect enterprise applications, cloud platforms, databases and external services; clean, validate, transfer and reconcile information between legacy and new systems; plan pilots, phased rollouts, cutover, rollback procedures and production readiness; communicate process changes, train users and support adoption; and set documentation, support responsibilities, service-level agreements and operational handover.' },
      { label: 'Vietnam example', text: 'FPT’s own history says it signed its first commercial software contract in late 1990 for a Vietnam Airlines reservation system, then took on IT projects in banking, public finance, telecoms and power. Its 2025 annual report lists national and provincial digital systems among its services. A law firm briefing lists the Digital Transformation Law (148/2025/QH15) among laws effective on 1 July 2026, and its requirements were not reviewed here. No public data on implementation success, adoption or data-migration problems in Vietnam was found.' },
      { label: 'Business impact', text: 'Implementation and integration transform software capabilities into usable enterprise systems. Successful delivery requires coordinated technical execution, business readiness, and clear ownership of ongoing operations.' },
    ],
    visualKind: 'ent-m2-33-implementation', visualHeading: 'Five implementation activities',
    visualIntro: 'Read across the table to see what each activity involves and why it matters.',
    imageAlt: 'Casemate table of five implementation activities and why each matters',
    keyTerms: [
      { term: 'Cutover', definition: 'The moment a live operation moves from an old system to a new one.' },
      { term: 'Rollback', definition: 'A planned way to return to the previous system if the new one fails.' },
      { term: 'Change management', definition: 'Helping people adopt new processes and tools through communication and training.' },
      { term: 'Service transition', definition: 'Handing a finished system to the team that will operate and support it.' },
    ],
    recap: [
      'Implementation connects software to the customer’s operating environment.',
      'Integration, data migration and deployment need careful planning.',
      'Adoption matters as much as technical delivery.',
      'A clear handover defines who owns operations afterwards.',
    ],
    chapterRecap: 'Implementation and integration transform software capabilities into usable enterprise systems. Successful delivery requires coordinated technical execution, business readiness, and clear ownership of ongoing operations.',
    deepDiveTitle: 'Why a technically successful go-live can still fail',
    body: <EntDeepDive paragraphs={[
      'A system can pass every test and still disappoint if staff keep using spreadsheets, if data was migrated with errors, or if nobody knows who to call when it breaks.',
      'That is why implementation plans give as much attention to training, communication and handover as to deployment itself.' ]} evidence="The implementation activities are from the supplied brief; the Kodak figures are from The Washington Post and an academic article on the Kodak effect; FPT’s projects are from its history and annual report; the law listing is from an Andersen Vietnam briefing. The go-live example is our own illustration." />,
    sources: citeEnt('fptHistory', 'fptTechnology2025', 'andersenLaws', 'kodakIbm1989', 'kodakEffect'),
  }),
];

const quiz = entQuiz('ent-m2-l3', [
  { chapter: '1', objective: 'State the design goal', question: 'What is the goal of solution design?', application: 'An architect reviews a plan. What should it achieve?', correct: 'Meet business needs while remaining secure, maintainable, scalable and economically viable', wrong: ['Maximise the number of screens', 'Avoid all documentation', 'Delay decisions indefinitely'], explanation: 'Design balances needs and constraints. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall a consequence', question: 'What can poorly defined requirements cause?', application: 'A project keeps changing scope. What is the likely cause?', correct: 'Scope changes, integration problems, delays and solutions that miss actual needs', wrong: ['Lower costs', 'Faster delivery', 'No consequences'], explanation: 'Design shapes downstream risk. Review Chapter 1.' },
  { chapter: '1', objective: 'Read estimates carefully', question: 'How should Mordor’s 26.55% banking share be described?', application: 'A slide calls it an official statistic. What is the correction?', correct: 'As a third-party estimate of IT services demand, not software spending', wrong: ['As a legal requirement', 'As an FPT result', 'As a Gartner forecast'], explanation: 'Label estimates. Review Chapter 1.' },
  { chapter: '2', objective: 'State the real output', question: 'What is described as the real output of development?', application: 'A team celebrates fast coding. What matters more?', correct: 'Reliable and maintainable software', wrong: ['Lines of code', 'Number of meetings', 'Length of the spec'], explanation: 'Quality creates lasting value. Review Chapter 2.' },
  { chapter: '2', objective: 'Distinguish delivery methods', question: 'How do product companies and enterprise projects often differ?', application: 'Two teams release software differently. Why?', correct: 'Product companies may release continuously, while enterprise projects may add formal acceptance', wrong: ['Product companies never test', 'Enterprise projects never configure', 'They are identical'], explanation: 'Methods vary by project. Review Chapter 2.' },
  { chapter: '2', objective: 'When quality assurance happens', question: 'When is quality assurance needed?', application: 'A manager schedules testing only before launch. What is wrong?', correct: 'Throughout the lifecycle, not only before deployment', wrong: ['Only after complaints', 'Never', 'Only at the end of year'], explanation: 'QA is continuous. Review Chapter 2.' },
  { chapter: '2', objective: 'Use evidence honestly', question: 'What should be said about defect rates of Vietnamese providers?', application: 'A slide shows a defect rate. What is the correction?', correct: 'No public data was found, so none is stated', wrong: ['It is always zero', 'Gartner publishes it', 'It equals India’s'], explanation: 'State evidence gaps. Review Chapter 2.' },
  { chapter: '3', objective: 'State the success condition', question: 'What does implementation success depend on?', application: 'A system goes live but is not used. What was missing?', correct: 'Organizational adoption as well as technical delivery', wrong: ['Technical delivery only', 'Hardware only', 'Marketing only'], explanation: 'People and process matter. Review Chapter 3.' },
  { chapter: '3', objective: 'Name an activity', question: 'Which is a key implementation activity?', application: 'A project plan lists tasks. Which belongs?', correct: 'Data migration', wrong: ['Fabric dyeing', 'Crop rotation', 'Bean roasting'], explanation: 'Data must be moved accurately. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a landmark example', question: 'What did the 1989 Kodak and IBM deal involve?', application: 'A case study cites it. What is the point?', correct: 'IBM took over work from four Kodak data centers, and staff transferred, as an influential outsourcing example', wrong: ['The invention of the cloud', 'A sale of consumer cameras', 'A merger of the two firms'], explanation: 'It influenced others. Review Chapter 3.' },
]);

export const LESSON_ENT2_3: EntM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how requirements become designs, software and working enterprise systems, and why adoption decides results.',
    keyTakeaways: [
      'Clear requirements and architecture reduce downstream delivery risk.',
      'Reliable, maintainable software is the real output of development.',
      'Quality assurance runs through the whole lifecycle.',
      'Implementation succeeds only when people, process, data and technology move together.',
      'Some Vietnam delivery data was not found and is not stated.',
    ],
    businessImplications: 'Invest in analysis and testing, plan data migration and training, and agree who owns operations after go-live.',
    remember: 'Delivering technology is not the same as delivering a result.',
    nextLesson: 'Channels & Customer Operations',
  },
};
