import { EntDeepDive, citeEnt3, entM3Chapter, entQuiz } from './entM3Core';
import type { EntM3LessonBundle } from './entM3Core';

const LESSON = '2. Products, Services & Segmentation';

const deck = [
  entM3Chapter({
    title: 'Enterprise Applications and Business Software', chapterTitle: LESSON, readingTime: '6',
    objective: 'Name the main families of enterprise application and explain how customer size and customization shape product segments.',
    mateIntro: 'Behind every company runs a small set of systems: money, customers, people, supply and reports. Each is a product category of its own.',
    keyInsight: 'Enterprise applications are differentiated by the business problems they solve, their integration capabilities, and their fit with customer workflows. Providers need to balance standardized functionality with flexibility for different customer requirements.',
    statTiles: [
      { value: '6', label: 'Key application families', subtitle: 'ERP to industry-specific software', description: 'ERP, CRM, HRM, supply chain management, business intelligence and industry-specific software.' },
      { value: '+15.5%', label: 'Forecast growth in worldwide software spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$1,468 billion, a global category forecast.' },
      { value: '40+', label: 'Applications in the MISA AMIS platform', subtitle: 'MISA website, vendor claim', description: 'Spanning finance, sales, HR and operations.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figure covers all software worldwide, and the MISA figure is a Vietnamese vendor’s own claim.',
    narrative: [
      { label: 'What it is', text: 'Enterprise applications support the core functions required to operate an organization. They range from integrated systems that manage multiple business functions to specialized applications designed for a particular department or industry. Customers may purchase standardized software, configure existing platforms, or combine several applications through integration.' },
      { label: 'Why it is happening', text: 'Product segmentation is influenced by business function, industry, deployment method, organization size, and degree of customization. Larger organizations often require advanced integration and governance, while SMEs may prioritize ease of use, affordability, and rapid implementation.' },
      { label: 'Real-world example', text: 'ERP integrates finance, procurement, inventory, manufacturing and other functions; CRM manages customer records, sales pipelines, marketing and service; HRM supports recruitment, payroll, employee records, performance and workforce planning; SCM coordinates sourcing, production, logistics, inventory and demand planning; business intelligence turns operational data into dashboards, reports and forecasts; and industry-specific software addresses banking, healthcare, manufacturing, retail, logistics and other sectors.' },
      { label: 'Vietnam example', text: 'MISA began as accounting software and says MISA AMIS has grown into a platform of more than 40 applications covering finance and accounting, sales, HR and operations, designed to follow Vietnamese accounting, tax and legal rules. It claims nearly 300,000 businesses use AMIS, about 30% of roughly one million active businesses, while its other pages give 250,706 and 351,750, so the counts depend on date and definition. All are vendor claims, and no public data on ERP or CRM market shares in Vietnam was found.' },
      { label: 'Business impact', text: 'Enterprise applications form a major part of the industry’s product portfolio. Providers compete through functional relevance, usability, integration, reliability, and their ability to support customers’ business processes.' },
    ],
    visualKind: 'ent-m3-21-applications', visualHeading: 'Six families of enterprise application',
    visualIntro: 'Review each application family and the part of the business it supports.',
    imageAlt: 'Casemate cards showing six families of enterprise application',
    keyTerms: [
      { term: 'ERP', definition: 'Enterprise resource planning: integrated systems linking finance, procurement, inventory and manufacturing.' },
      { term: 'CRM', definition: 'Customer relationship management: software for customer records, sales pipelines and service interactions.' },
      { term: 'HRM', definition: 'Human resource management: software for recruitment, payroll and employee records.' },
      { term: 'SCM', definition: 'Supply chain management: software that coordinates sourcing, production, logistics and inventory.' },
    ],
    recap: [
      'Applications range from integrated suites to department or industry tools.',
      'Segments depend on function, industry, deployment, size and customization.',
      'Large firms need integration and governance, while SMEs value ease and price.',
      'Providers must balance standard features with flexibility.',
    ],
    chapterRecap: 'Enterprise applications form a major part of the industry’s product portfolio. Providers compete through functional relevance, usability, integration, reliability, and their ability to support customers’ business processes.',
    deepDiveTitle: 'Why a suite and a point solution suit different customers',
    body: <EntDeepDive paragraphs={[
      'An integrated suite lets data flow between functions without custom links, which suits organizations that run many processes. A point solution is quicker to adopt and cheaper, which suits a team with one urgent problem.',
      'Platforms that let customers add applications over time, as MISA describes, try to offer both: start small and expand without replacing the system.' ]} evidence="The application families and segmentation drivers are from the supplied brief; MISA statements are from its own website and press release and are vendor claims; the Gartner figure is from its July 2026 press release. The suite-versus-point-solution comparison is our own reasoning." />,
    sources: citeEnt3('gartnerJuly2026', 'misaPlatform', 'misaPress', 'misaAccounting'),
  }),
  entM3Chapter({
    title: 'IT Services and Professional Solutions', chapterTitle: LESSON, readingTime: '6',
    objective: 'Distinguish consulting, implementation and managed services by the level of provider responsibility.',
    mateIntro: 'Buying software is the easy part. Services are the people who help it get chosen, installed, run and improved.',
    keyInsight: 'IT services bridge the gap between technology availability and successful business adoption. Their value depends on technical expertise, effective execution, and the ability to manage organizational and operational change.',
    statTiles: [
      { value: '6', label: 'Key service types', subtitle: 'Consulting to managed IT services', description: 'IT consulting, system integration, software engineering, cloud and infrastructure services, cybersecurity and managed IT services.' },
      { value: '+5.3%', label: 'Forecast growth in worldwide IT services spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$1,570 billion, a global category forecast.' },
      { value: '11.86%', label: 'Annual growth rate of cloud and platform services in Vietnam', subtitle: 'Mordor Intelligence, third-party estimate', description: 'The fastest-growing segment in the estimate, for IT services only.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Gartner’s figure is a worldwide forecast and Mordor’s is a third-party estimate for Vietnam IT services.',
    narrative: [
      { label: 'What it is', text: 'IT services complement software products by helping organizations select, implement, operate, and improve technology systems. These services may be delivered as discrete projects, ongoing support arrangements, or long-term transformation programs.' },
      { label: 'Why it is happening', text: 'Service offerings differ according to the level of expertise required and the provider’s responsibility. Consulting focuses on defining problems and solutions, implementation translates designs into working systems, and managed services assume responsibility for ongoing technical operations.' },
      { label: 'Real-world example', text: 'Providers develop technology strategies, enterprise architectures, business cases and roadmaps; connect applications, infrastructure, databases and external platforms; develop, test, maintain and modernize applications; migrate workloads, manage environments, optimize cloud use and keep systems available; assess vulnerabilities, monitor threats, manage incidents and improve security controls; and provide application support, infrastructure operations, service desks and performance monitoring.' },
      { label: 'Vietnam example', text: 'FPT’s 2025 annual report lists digital, green and AI transformation consulting, national and provincial digital systems, cybersecurity and FPT AI Factory among its technology services, and reports domestic IT services revenue of VND 9,093 billion, up 11.5%; these are company-reported. Mordor Intelligence estimates cloud and platform services as the fastest-growing IT services segment in Vietnam at 11.86% a year. No public Vietnam breakdown of IT services spending by service type was found.' },
      { label: 'Business impact', text: 'IT services enable customers to obtain capabilities that may be difficult or costly to develop internally. Service providers must differentiate through expertise, delivery quality, domain knowledge, and measurable improvements in customer operations.' },
    ],
    visualKind: 'ent-m3-22-services', visualHeading: 'Six kinds of IT service',
    visualIntro: 'Read across the table for what each service covers and what the provider is responsible for.',
    imageAlt: 'Casemate table of six kinds of IT service and the provider responsibility for each',
    keyTerms: [
      { term: 'Enterprise architecture', definition: 'The overall design of a firm’s applications, data and infrastructure and how they fit together.' },
      { term: 'Service desk', definition: 'A team that receives and resolves users’ technology problems and requests.' },
      { term: 'Cloud optimization', definition: 'Adjusting cloud resources and spending so workloads run well at sensible cost.' },
      { term: 'Transformation programme', definition: 'A long-term, multi-step effort to change how an organization works using technology.' },
    ],
    recap: [
      'Services help organizations select, implement, operate and improve systems.',
      'They are delivered as projects, support contracts or long programmes.',
      'Consulting defines, implementation builds, managed services operate.',
      'Differentiation rests on expertise, quality, domain knowledge and results.',
    ],
    chapterRecap: 'IT services enable customers to obtain capabilities that may be difficult or costly to develop internally. Service providers must differentiate through expertise, delivery quality, domain knowledge, and measurable improvements in customer operations.',
    deepDiveTitle: 'Why the provider’s degree of responsibility changes the contract',
    body: <EntDeepDive paragraphs={[
      'In consulting the provider answers for the quality of advice, in implementation for a working system, and in managed services for continuing results such as availability. Each step up in responsibility usually brings tighter service levels and a longer relationship.',
      'Customers should therefore compare what each provider is accountable for, not only the price.' ]} evidence="The service types and their roles are from the supplied brief; the forecast is from Gartner’s July 2026 press release; the Vietnam segment growth is from Mordor Intelligence; FPT’s services and revenue are from its annual and earnings reports. The point about accountability is our own reading." />,
    sources: citeEnt3('gartnerJuly2026', 'mordorVietnamIt', 'fptTechnology2025', 'fptEarnings2025'),
  }),
  entM3Chapter({
    title: 'Deployment Models and Industry Segmentation', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare on-premises, cloud and hybrid deployment and explain how customization preferences segment the market.',
    mateIntro: 'Where the software runs changes who pays for what, who is in control and who has to keep it up to date.',
    keyInsight: 'Deployment and customization choices shape the economics of both software vendors and service providers. Standardized cloud products can support repeatable delivery, while complex hybrid environments create additional demand for integration, migration, and ongoing management.',
    statTiles: [
      { value: '6', label: 'Key deployment and segmentation activities', subtitle: 'On-premises to customer-size segmentation', description: 'On-premises, public cloud and SaaS, private and hybrid cloud, low-code and no-code, customized solutions and segmentation by industry and size.' },
      { value: '+29.3%', label: 'Forecast growth in worldwide IaaS spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$287 billion, for rented cloud infrastructure.' },
      { value: '70%', label: 'Target share of Vietnamese private enterprises using cloud by 2030', subtitle: 'Decision 1121/QD-TTg, a policy target', description: 'With services from domestic providers.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figure is a worldwide forecast, and the 70% is a government target, not a measured outcome.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software can be deployed through several models, each with different implications for cost, control, scalability, and maintenance. On-premises systems run within infrastructure controlled by the customer, while cloud-based solutions use infrastructure managed by external providers. Hybrid environments combine cloud and on-premises systems, often because of legacy requirements, data considerations, or specific operational needs.' },
      { label: 'Why it is happening', text: 'Segmentation also depends on customization and purchasing preferences. Some customers prefer standardized products with minimal configuration, while others require extensive integration and tailored workflows. The appropriate model depends on business complexity, security requirements, available expertise, and total cost of ownership.' },
      { label: 'Real-world example', text: 'Organizations deploy and maintain applications in infrastructure they control; access software and computing through internet-based services on recurring terms; combine dedicated environments with public cloud or existing infrastructure; use visual tools and prebuilt components to build applications faster; configure or extend standard platforms for specialised requirements; and tailor offers to SMEs, large enterprises, government organizations and regulated industries.' },
      { label: 'Vietnam example', text: 'Vietnam’s 2025–30 national cloud programme (Decision 1121/QD-TTg) targets cloud use by all government agencies and state enterprises, 70% of private enterprises and over 50% of the population by 2030, using domestic providers, which is a policy target. Ken Research estimates paid cloud ERP penetration at 21.0% of addressable SMEs in 2025 and says its scope excludes standalone accounting products, so it is not a measure of all cloud software use. MISA describes its platform as needing no server investment, a vendor claim. No public data on the split between on-premises and cloud software among Vietnamese organisations was found.' },
      { label: 'Business impact', text: 'Deployment models and customer requirements create distinct market segments with different cost structures and service needs. Providers should align their delivery model with customer priorities rather than assuming one technology architecture suits every organization.' },
    ],
    visualKind: 'ent-m3-23-deployment', visualHeading: 'On-premises versus cloud and SaaS',
    visualIntro: 'Compare the two main deployment models across four dimensions.',
    imageAlt: 'Casemate comparison of on-premises and cloud and SaaS deployment models',
    keyTerms: [
      { term: 'On-premises', definition: 'Software run on infrastructure controlled by the customer.' },
      { term: 'Hybrid cloud', definition: 'A mix of cloud services and on-premises or dedicated systems working together.' },
      { term: 'Low-code', definition: 'Visual tools and prebuilt components that speed up building applications.' },
      { term: 'Total cost of ownership', definition: 'The full cost of acquiring, running and maintaining a system over its life.' },
    ],
    recap: [
      'Deployment can be on-premises, cloud or hybrid.',
      'Hybrid setups often arise from legacy systems, data needs or operations.',
      'Customization preferences split customers into standard and tailored segments.',
      'The right model depends on complexity, security, skills and total cost.',
    ],
    chapterRecap: 'Deployment models and customer requirements create distinct market segments with different cost structures and service needs. Providers should align their delivery model with customer priorities rather than assuming one technology architecture suits every organization.',
    deepDiveTitle: 'Why hybrid environments create service demand',
    body: <EntDeepDive paragraphs={[
      'Moving everything to the cloud at once is rarely practical, so many organizations run old and new systems side by side. Keeping them connected, moving data safely and monitoring both takes skills that few customers have in-house.',
      'That is why complex hybrid estates feed integration, migration and managed-service providers while standard cloud products support repeatable delivery.' ]} evidence="The deployment models and segmentation points are from the supplied brief; the IaaS forecast is from Gartner; the cloud programme is from the Vietnam Government news portal; the penetration estimate is from Ken Research; MISA statements are vendor claims. The explanation of hybrid service demand restates the brief’s Key Insight in our own words." />,
    sources: citeEnt3('gartnerJuly2026', 'vietnamCloudProgram', 'kenCloudErp', 'misaPlatform'),
  }),
];

const quiz = entQuiz('ent-m3-l2', [
  { chapter: '1', objective: 'List application types', question: 'Which is an enterprise application family?', application: 'A CIO lists core systems. Which belongs?', correct: 'ERP, CRM, HRM, supply chain management or business intelligence', wrong: ['Printer drivers only', 'Wallpaper tools only', 'Game consoles only'], explanation: 'These are core families. Review Chapter 1.' },
  { chapter: '1', objective: 'State how applications differ', question: 'What differentiates enterprise applications?', application: 'Two ERPs look alike. How do buyers separate them?', correct: 'The business problems they solve, integration capability and fit with customer workflows', wrong: ['Logo colour', 'Office location', 'Length of manual'], explanation: 'Fit matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare buyer priorities', question: 'What do SMEs often prioritize compared with large organizations?', application: 'A vendor designs for a small firm. What matters most?', correct: 'Ease of use, affordability and rapid implementation', wrong: ['Advanced governance only', 'Custom code only', 'Multi-country integration only'], explanation: 'Larger firms need more integration. Review Chapter 1.' },
  { chapter: '1', objective: 'Read vendor claims', question: 'Why do MISA’s customer counts differ across its pages?', application: 'A slide quotes one number as fact. What is the correction?', correct: 'They are vendor claims that depend on date and definition', wrong: ['They are audited by the state', 'They are Gartner estimates', 'They are the same number'], explanation: 'Label vendor claims. Review Chapter 1.' },
  { chapter: '2', objective: 'Define the services role', question: 'What do IT services bridge?', application: 'A firm buys software but cannot use it. What is missing?', correct: 'The gap between technology availability and successful business adoption', wrong: ['The gap between hardware factories', 'The gap between paper and ink', 'The gap between taxes'], explanation: 'Adoption needs help. Review Chapter 2.' },
  { chapter: '2', objective: 'Distinguish service levels', question: 'Which service assumes responsibility for ongoing technical operations?', application: 'A bank wants someone to run its systems. Which fits?', correct: 'Managed services', wrong: ['Consulting only', 'Design only', 'Licence sales only'], explanation: 'Managed services operate. Review Chapter 2.' },
  { chapter: '2', objective: 'Use evidence honestly', question: 'What should be said about Vietnam IT spending by service type?', application: 'A slide shows a split. What is the correction?', correct: 'No public breakdown was found, so none is shown', wrong: ['It is always equal', 'Gartner publishes it', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 2.' },
  { chapter: '3', objective: 'Define on-premises', question: 'What is on-premises deployment?', application: 'A firm keeps servers in its own data room. What is this called?', correct: 'Software that runs within infrastructure controlled by the customer', wrong: ['Software run by a cloud provider', 'Software on paper', 'Software that needs no hardware'], explanation: 'The customer controls it. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain hybrid', question: 'Why do hybrid environments often exist?', application: 'A company keeps one system on site and moves others to the cloud. Why?', correct: 'Because of legacy requirements, data considerations or specific operational needs', wrong: ['Because cloud is illegal', 'Because hardware is free', 'Because staff dislike software'], explanation: 'Hybrid is often pragmatic. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a target correctly', question: 'How should the 70% cloud use by 2030 be described?', application: 'A slide says 70% of firms use cloud today. What is the correction?', correct: 'As a policy target under Decision 1121/QD-TTg, not a measured result', wrong: ['As audited 2025 data', 'As a global average', 'As a Ken Research estimate'], explanation: 'Targets are aims. Review Chapter 3.' },
]);

export const LESSON_ENT3_2: EntM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe the main enterprise application families, the kinds of IT service and how deployment models segment the market.',
    keyTakeaways: [
      'Applications are differentiated by the problems they solve, integration and workflow fit.',
      'IT services help organizations select, implement, operate and improve systems.',
      'On-premises, cloud and hybrid deployment carry different cost, control and maintenance trade-offs.',
      'Hybrid and customized estates create demand for integration and managed services.',
      'Vendor claims, estimates and policy targets are labelled in this module.',
    ],
    businessImplications: 'Align the product and delivery model with customer size, complexity and deployment preferences instead of assuming one architecture fits all.',
    remember: 'What you sell and where it runs both shape who your customers are.',
    nextLesson: 'Customer Segments & Needs',
  },
};
