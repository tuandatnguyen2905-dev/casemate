import { EntDeepDive, citeEnt, entChapter, entQuiz } from './entM1Core';
import type { EntM1LessonBundle } from './entM1Core';

const LESSON = '2. Industry History & Development';

const deck = [
  entChapter({
    title: 'Mainframe Computing, Enterprise Systems, and Early Software Markets', chapterTitle: LESSON, readingTime: '6',
    objective: 'Trace how business computing moved from automating single functions to integrated enterprise systems.',
    mateIntro: 'Before apps and the cloud there were rooms of mainframes doing payroll and stock counts. That is where today\u2019s enterprise software began.',
    keyInsight: 'The industry\u2019s early development centered on automating individual business functions before moving toward integrated enterprise-wide processes. This created the foundation for standardized enterprise applications and large-scale technology implementation services.',
    statTiles: [
      { value: '4', label: 'Key early-era activities', subtitle: 'Centralized computing to specialized IT teams', description: 'Centralized computing, business process automation, enterprise systems integration and specialized IT teams.' },
      { value: 'Early 1970s', label: 'When SAP is described as an ERP pioneer', subtitle: 'TechTarget', description: 'Its later R/3 system moved ERP from mainframes to client-server computing.' },
      { value: 'About 1990', label: 'When Gartner coined the term \u201centerprise resource planning\u201d', subtitle: 'Academic and trade histories', description: 'The term described integration beyond manufacturing.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Dates are approximate periods taken from academic and trade histories of ERP, and the Vietnam account uses one company\u2019s own history.',
    narrative: [
      { label: 'What it is', text: 'The modern enterprise software industry developed alongside the adoption of business computing in the mid-to-late twentieth century. Early systems were primarily used by large organizations to automate payroll, accounting, inventory management, transaction processing, and other data-intensive functions. Computing resources were expensive, centralized, and typically managed by dedicated technical teams.' },
      { label: 'Why it is happening', text: 'As organizations expanded their use of computers, software evolved from specialized programs developed for individual systems toward more standardized business applications. Enterprise Resource Planning (ERP) systems later connected functions such as finance, manufacturing, procurement, and inventory within integrated information environments.' },
      { label: 'Real-world example', text: 'Mainframes and centralised databases processed large volumes of organisational transactions. Companies digitised accounting, payroll, inventory, manufacturing and other repetitive administrative work, then connected previously separate functions through integrated systems such as ERP, while internal technology departments built, operated and maintained it all.' },
      { label: 'Vietnam example', text: 'Vietnam\u2019s story starts later. FPT, founded in 1988 during the \u0110\u1ed5i M\u1edbi reforms, began by exchanging computers for equipment with the Soviet Academy of Sciences, distributed IBM, Compaq and Olivetti hardware in 1989\u201395, and signed its first commercial software contract in late 1990 for a Vietnam Airlines reservation system. It then took on IT projects in banking, public finance, telecoms and power. That is a company\u2019s own account of its history, and no wider sourced history of Vietnam\u2019s mainframe-era enterprise computing was found.' },
      { label: 'Business impact', text: 'Early enterprise computing established technology as an essential business resource. The shift from isolated applications toward integrated systems created demand for increasingly sophisticated software products and implementation expertise.' },
    ],
    visualKind: 'ent-m1-21-early', visualHeading: 'From single functions to integrated systems',
    visualIntro: 'Follow the four steps from centralised computing to enterprise systems integration.',
    imageAlt: 'Casemate step diagram of early enterprise computing from mainframes to integrated ERP',
    keyTerms: [
      { term: 'Mainframe', definition: 'A large central computer that processes high volumes of transactions for an organisation.' },
      { term: 'MRP', definition: 'Material requirements planning: software that works out which materials are needed and when.' },
      { term: 'ERP', definition: 'Enterprise resource planning: integrated systems linking finance, manufacturing, procurement and inventory.' },
      { term: 'Business process automation', definition: 'Using software to carry out repetitive administrative work.' },
    ],
    recap: [
      'Early systems automated payroll, accounting, inventory and transactions.',
      'Computing was expensive, centralised and run by specialist teams.',
      'Integrated ERP linked finance, manufacturing, procurement and inventory.',
      'Integration created demand for standard applications and implementation skills.',
    ],
    chapterRecap: 'Early enterprise computing established technology as an essential business resource. The shift from isolated applications toward integrated systems created demand for increasingly sophisticated software products and implementation expertise.',
    deepDiveTitle: 'Why integration, not automation, created a services industry',
    body: <EntDeepDive paragraphs={[
      'Automating one function needed a program. Linking finance, stock and production needed a shared database, common definitions and changes to how departments worked. That is hard to buy off the shelf and easy to get wrong.',
      'Standard applications made the technology repeatable, and the effort of fitting them to each organisation created a market for consultants and integrators.' ]} evidence="The era description is from the supplied brief; dates for MRP, ERP and SAP are from a Journal of Operations Management history and TechTarget; Vietnam\u2019s account is from FPT\u2019s own history pages. The link from integration to services is our own reasoning." />,
    sources: citeEnt('erpHistory', 'erpTechTarget', 'fptHistory', 'fptMilestones'),
  }),
  entChapter({
    title: 'Client-Server Computing, Standardized Applications, and IT Outsourcing', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how client-server computing, packaged software and outsourcing widened the industry\u2019s customer base.',
    mateIntro: 'When business software moved onto desktops and networks, more firms could use it. When firms stopped wanting to run it themselves, outsourcing was born.',
    keyInsight: 'The industry shifted from technology ownership toward a combination of commercial software, specialized expertise, and outsourced delivery. This increased the importance of implementation partners, service quality, and the ability to manage complex technology environments.',
    statTiles: [
      { value: '4', label: 'Key activities of the era', subtitle: 'Client-server to offshore delivery', description: 'Client-server applications, commercial enterprise software, IT outsourcing and offshore delivery models.' },
      { value: 'July 1989', label: 'Kodak\u2013IBM data center outsourcing deal announced', subtitle: 'The Washington Post', description: 'IBM took over work spread across four Kodak centers.' },
      { value: '13 Jun 1999', label: 'FPT\u2019s first software export to North America', subtitle: 'FPT, company account', description: 'The start of Vietnam\u2019s best-known outsourcing story.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The FPT date and strategy are company-reported, and the Kodak deal is cited as an influential event by academic and trade accounts, not as the first outsourcing contract.',
    narrative: [
      { label: 'What it is', text: 'During the 1980s and 1990s, client-server architectures and the growth of personal computing expanded access to business software. Organizations could deploy departmental applications across networks rather than relying exclusively on centralized mainframe environments. Standardized commercial software also became more accessible to a wider range of businesses.' },
      { label: 'Why it is happening', text: 'At the same time, globalization and pressure to control operating costs encouraged organizations to outsource selected technology activities. External providers began offering application development, infrastructure management, technical support, and offshore software engineering. This expanded the industry\u2019s role from supplying technology products to delivering specialized capabilities and ongoing operational services.' },
      { label: 'Real-world example', text: 'Businesses deployed software across connected desktops and central servers, adopted packaged ERP, CRM, database and productivity applications, and contracted external providers for software development, infrastructure support, maintenance and help desks. Work was distributed across countries to access talent, manage cost and support global operations; Kodak\u2019s 1989 decision to hand its data centers to IBM is often seen as the turning point that made IT outsourcing a mainstream choice.' },
      { label: 'Vietnam example', text: 'FPT agreed at a 1998 conference that globalisation, led by software exports, would be its direction, opened a branch in Bangalore, India in January 1999, exported software to North America for the first time on 13 June 1999, and received ISO 9001 certification in February 2000, according to its own history. FPT Software opened in Japan in 2005, and Japan is now its main overseas market. Year-2000 remediation demand that overwhelmed domestic suppliers in the US and Europe is cited as one reason overseas providers won work. These are company accounts and academic summaries, not a measured history of the Vietnamese industry.' },
      { label: 'Business impact', text: 'Standardized software and outsourcing broadened the customer base and created specialized service markets. The industry increasingly relied on partnerships between software vendors, implementation consultants, and external technology providers.' },
    ],
    visualKind: 'ent-m1-22-clientserver', visualHeading: 'Two eras compared',
    visualIntro: 'Compare the mainframe era with the client-server and outsourcing era across four dimensions.',
    imageAlt: 'Casemate comparison of the mainframe era and the client-server and outsourcing era',
    keyTerms: [
      { term: 'Client-server', definition: 'A model in which user computers connect over a network to central servers that hold shared applications and data.' },
      { term: 'Packaged software', definition: 'Standard commercial software sold to many customers rather than built for one.' },
      { term: 'IT outsourcing', definition: 'Contracting an external provider to run or build part of an organisation\u2019s technology.' },
      { term: 'Offshore delivery', definition: 'Doing technology work in another country to access talent or lower cost.' },
    ],
    recap: [
      'Client-server and PCs widened access to business software.',
      'Packaged commercial software reached more kinds of business.',
      'Cost pressure and globalisation drove outsourcing and offshore delivery.',
      'The industry moved from supplying products to delivering capabilities and operations.',
    ],
    chapterRecap: 'Standardized software and outsourcing broadened the customer base and created specialized service markets. The industry increasingly relied on partnerships between software vendors, implementation consultants, and external technology providers.',
    deepDiveTitle: 'How the year-2000 problem helped overseas providers win work',
    body: <EntDeepDive paragraphs={[
      'The reprogramming demanded by the year-2000 problem exceeded what domestic suppliers in the US and Europe could provide, so firms took a chance on overseas suppliers despite concerns about quality.',
      'Once those relationships worked, offshore delivery stayed. It shows how a one-off shortage can turn into a lasting market structure when trust is earned.' ]} evidence="The Kodak deal is from The Washington Post and an academic article on the Kodak effect; the year-2000 point is from an academic research excerpt; FPT\u2019s dates are from its own history and milestones pages. The trust-building interpretation is our own." />,
    sources: citeEnt('kodakIbm1989', 'kodakEffect', 'offshoreY2k', 'fptHistory', 'fptMilestones'),
  }),
  entChapter({
    title: 'Cloud Computing, SaaS, and the AI-Enabled Enterprise', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe how cloud, SaaS and AI are turning technology supply into continuous business transformation.',
    mateIntro: 'Software used to be installed. Now it is subscribed to, and increasingly it answers questions and writes code. The supplier\u2019s job has changed with it.',
    keyInsight: 'The industry is moving from supplying standalone technology toward delivering integrated, cloud-based, and increasingly AI-enabled business capabilities. This expands the potential value of software while raising expectations for integration, security, governance, and measurable returns.',
    statTiles: [
      { value: '5', label: 'Key cloud and AI activities', subtitle: 'SaaS adoption to managed transformation', description: 'SaaS adoption, cloud migration, AI integration, legacy modernization and managed digital transformation.' },
      { value: 'VND 16,751B', label: 'FPT digital transformation revenue from overseas clients in 2025', subtitle: 'FPT annual report, company-reported, +16.8%', description: 'About 47.3% of its overseas IT services revenue, with a focus on cloud and AI.' },
      { value: '+15.5%', label: 'Forecast growth in worldwide software spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$1,468 billion, a global category forecast.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The FPT figure is company-reported, and the Gartner figure is a worldwide forecast for all software, not enterprise software and not Vietnam.',
    narrative: [
      { label: 'What it is', text: 'From the 2000s onward, internet connectivity and cloud computing transformed how organizations accessed and operated software. Software-as-a-Service (SaaS) allowed customers to use applications through subscriptions without managing all underlying infrastructure themselves. Public cloud platforms also expanded access to scalable computing, storage, databases, and application development tools.' },
      { label: 'Why it is happening', text: 'More recently, artificial intelligence, advanced analytics, automation, and generative AI have begun reshaping enterprise software and IT services. Vendors are embedding AI into existing applications, while service providers are helping organizations modernize legacy systems, govern data, integrate AI capabilities, and redesign workflows. Gartner\u2019s 2026 outlook identifies AI-related infrastructure and software as major contributors to global technology spending growth.' },
      { label: 'Real-world example', text: 'Organisations use subscription applications for customer management, finance, collaboration, HR and analytics; move suitable workloads from on-premises environments to public, private or hybrid cloud; introduce AI-assisted search, document processing, software development, forecasting and support; rebuild older systems for scalability, interoperability, maintainability and security; and combine consulting, implementation, training and ongoing optimisation to support organisational change.' },
      { label: 'Vietnam example', text: 'FPT says it became an \u201cAI-first\u201d company in 2025, launched an AI platform called FleziPT and operates FPT AI Factory, and reports digital transformation revenue of VND 16,751 billion, up 16.8%, with a focus on cloud and AI and data analytics; these are company claims. Vietnam\u2019s 2025\u201330 national cloud programme (Decision 1121/QD-TTg) targets cloud use by all government agencies and state enterprises, 70% of private enterprises and over 50% of the population by 2030 using domestic providers, which is a policy target and not an outcome. No public Vietnam-wide figure for SaaS or cloud migration spending was found.' },
      { label: 'Business impact', text: 'Cloud computing and AI are extending the industry\u2019s role from technology provision to continuous business transformation. Providers must combine technical innovation with integration capability, governance, and clear evidence of business value.' },
    ],
    visualKind: 'ent-m1-23-cloudai', visualHeading: 'Five layers of the AI-enabled enterprise',
    visualIntro: 'Read the five layers from SaaS adoption at the base up to managed digital transformation.',
    imageAlt: 'Casemate pyramid of five layers of cloud, SaaS and AI-enabled enterprise capability',
    keyTerms: [
      { term: 'SaaS', definition: 'Software as a service: applications used over the internet on a subscription, with the provider running the infrastructure.' },
      { term: 'Cloud migration', definition: 'Moving applications and workloads from on-premises systems to cloud platforms.' },
      { term: 'Legacy modernisation', definition: 'Rebuilding or restructuring older systems so they scale, connect and stay secure.' },
      { term: 'Generative AI', definition: 'AI that produces text, code, images or other content from prompts.' },
    ],
    recap: [
      'SaaS and public cloud changed how organisations access software.',
      'AI is being built into applications and into how services are delivered.',
      'Providers help modernise legacy systems, govern data and redesign workflows.',
      'Expectations of integration, security and measurable returns are rising.',
    ],
    chapterRecap: 'Cloud computing and AI are extending the industry\u2019s role from technology provision to continuous business transformation. Providers must combine technical innovation with integration capability, governance, and clear evidence of business value.',
    deepDiveTitle: 'Why subscription software changes the supplier\u2019s job',
    body: <EntDeepDive paragraphs={[
      'Once the customer no longer installs the software, the supplier runs it, updates it and answers for its availability. Revenue arrives continuously, and so do complaints.',
      'AI adds a further duty: explaining what the system does with business data and proving that it improves results, which is why governance and measurable returns are central to the pitch.' ]} evidence="SaaS history is from Communications of the ACM; Gartner\u2019s outlook is from its July 2026 press release; FPT\u2019s claims are from its annual report; the cloud programme is from a Vietnam Government news portal. The supplier-duty reasoning is our own." />,
    sources: citeEnt('saasHistory', 'gartnerJuly2026', 'fptGlobalIt2025', 'vietnamCloudProgram'),
  }),
];

const quiz = entQuiz('ent-m1-l2', [
  { chapter: '1', objective: 'State the early focus', question: 'What did early enterprise computing center on?', application: 'A student asks what came before ERP. What is the answer?', correct: 'Automating individual business functions before moving toward integrated processes', wrong: ['Cloud subscriptions', 'Generative AI', 'Social media'], explanation: 'Integration came later. Review Chapter 1.' },
  { chapter: '1', objective: 'Define ERP', question: 'What does ERP connect?', application: 'A firm wants finance and inventory linked. Which system type fits?', correct: 'Functions such as finance, manufacturing, procurement and inventory in one integrated environment', wrong: ['Only email', 'Only payroll printers', 'Only websites'], explanation: 'ERP integrates functions. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe the old model', question: 'How was early computing typically managed?', application: 'A manager recalls mainframe days. What was the model?', correct: 'Centralised, expensive and run by dedicated technical teams', wrong: ['Distributed to every user', 'Free to run', 'Managed by customers'], explanation: 'Computing was centralised. Review Chapter 1.' },
  { chapter: '2', objective: 'State the shift', question: 'How did the industry shift in the client-server era?', application: 'A CIO stops owning every system. What replaces ownership?', correct: 'From technology ownership toward commercial software, expertise and outsourced delivery', wrong: ['Toward only hardware sales', 'Toward manual work', 'Toward closing the industry'], explanation: 'Partners and services grew. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a landmark deal', question: 'Why is Kodak\u2019s 1989 deal with IBM often cited?', application: 'A case study asks about outsourcing history. What is the point?', correct: 'It is seen as a turning point that made IT outsourcing a serious strategic choice', wrong: ['It was the first computer sale', 'It created the cloud', 'It ended mainframes'], explanation: 'It influenced others. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the Vietnam example', question: 'When did FPT first export software to North America, according to its own history?', application: 'A timeline needs a date. What is it?', correct: '13 June 1999', wrong: ['1 January 1980', '30 June 2010', '4 July 2024'], explanation: 'It is a company account. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain a catalyst', question: 'What helped overseas providers win work around 2000?', application: 'Why did Western firms try offshore suppliers?', correct: 'Year-2000 reprogramming demand exceeded domestic supply', wrong: ['A law banned local firms', 'Cloud made code free', 'Hardware prices fell to zero'], explanation: 'Shortage led to offshoring. Review Chapter 2.' },
  { chapter: '3', objective: 'State the direction', question: 'What is the industry moving toward?', application: 'A vendor sells only installed software. What is the direction of travel?', correct: 'Integrated, cloud-based and increasingly AI-enabled business capabilities', wrong: ['Standalone installed tools only', 'Paper-based processes', 'Single-function mainframes'], explanation: 'Scope is widening. Review Chapter 3.' },
  { chapter: '3', objective: 'Define SaaS', question: 'What does SaaS allow customers to do?', application: 'A company wants software without managing servers. What fits?', correct: 'Use applications through subscriptions without managing all the underlying infrastructure', wrong: ['Own all the hardware', 'Avoid subscriptions', 'Write every line of code'], explanation: 'SaaS shifts infrastructure to the provider. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a target correctly', question: 'How should Vietnam\u2019s 2030 cloud adoption goals be described?', application: 'A slide calls 70% private-firm cloud use a fact. What is the correction?', correct: 'As a policy target under Decision 1121/QD-TTg, not a measured result', wrong: ['As audited 2025 data', 'As a global average', 'As a Gartner forecast'], explanation: 'Targets are aims. Review Chapter 3.' },
]);

export const LESSON_ENT_2: EntM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can trace the industry from mainframe automation through client-server and outsourcing to the cloud and AI era.',
    keyTakeaways: [
      'Early computing automated single functions before integrating them.',
      'Integration created demand for standard applications and implementation services.',
      'Client-server computing and outsourcing shifted value toward software, expertise and delivery.',
      'Cloud, SaaS and AI make the industry a provider of continuous business transformation.',
      'Company histories and policy targets are labelled as such in this module.',
    ],
    businessImplications: 'Position offerings as integrated, secure and measurable capabilities, and expect customers to judge providers on delivery and governance as well as technology.',
    remember: 'Each era moved the industry closer to selling continuing outcomes rather than one-off products.',
    nextLesson: 'How the Global Market Is Structured',
  },
};
