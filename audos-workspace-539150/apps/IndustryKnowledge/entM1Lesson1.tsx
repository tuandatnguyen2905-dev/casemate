import { EntDeepDive, citeEnt, entChapter, entQuiz } from './entM1Core';
import type { EntM1LessonBundle } from './entM1Core';

const LESSON = '1. Industry Definition & Scope';

const deck = [
  entChapter({
    title: 'Definition and Core Characteristics', chapterTitle: LESSON, readingTime: '6',
    objective: 'Define enterprise software and IT services and explain how the industry turns technology into measurable business outcomes.',
    mateIntro: 'A company rarely wants software for its own sake. It wants invoices processed faster, stock counted correctly and managers who can see what is happening. This industry sells that result.',
    keyInsight: 'The industry creates value by translating technology into measurable business outcomes. Customers do not purchase software or IT expertise solely for their technical features; they invest in greater productivity, lower costs, improved control, scalability, security, and competitive advantage.',
    statTiles: [
      { value: '5', label: 'Key activities of the industry', subtitle: 'Development to business outcome delivery', description: 'Enterprise application development, IT consulting, system integration, managed IT services and business outcome delivery.' },
      { value: 'VND 44,475B', label: 'FPT Technology sector revenue in 2025', subtitle: 'FPT annual report, company-reported', description: 'About 63.4% of the group\u2019s revenue, from IT services at home and abroad.' },
      { value: '8.2%', label: 'Productivity gain FPT reports from embedding AI in software delivery', subtitle: 'FPT annual report, company claim', description: 'An example of a provider measuring an outcome of its own delivery.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The two company figures come from one Vietnamese provider\u2019s annual report and describe that company, not the whole industry.',
    narrative: [
      { label: 'What it is', text: 'Enterprise Software & IT Services refers to the industry that develops, supplies, implements, and manages technology solutions used by organizations to operate, coordinate resources, improve decision-making, and deliver products or services. Customers range from small and medium-sized enterprises (SMEs) to large corporations, government agencies, and multinational organizations.' },
      { label: 'Why it is happening', text: 'The industry combines repeatable software products with services that adapt technology to each customer\u2019s business processes. Enterprise software is often monetized through subscriptions, licenses, usage-based pricing, or maintenance fees, while IT services are commonly delivered through consulting engagements, implementation projects, outsourcing contracts, and recurring managed-service agreements.' },
      { label: 'Real-world example', text: 'Providers build or supply software for finance, sales, procurement, human resources and customer service; assess business needs and design digital transformation roadmaps; connect applications, databases, infrastructure and external platforms so information flows across the organisation; operate, monitor, maintain and secure technology environments; and then translate the investment into measurable gains such as shorter processing times, fewer errors and better management visibility.' },
      { label: 'Vietnam example', text: 'FPT\u2019s 2025 annual report shows the range inside one Vietnamese group: its Technology sector, with revenue of VND 44,475 billion, lists consulting and implementing digital, green and AI transformation, building national, ministerial and provincial digital systems, an AI infrastructure and tools platform called FPT AI Factory, cybersecurity services, and integrating, operating and testing IT systems. The company also says it moved overseas contracts from time-and-materials toward managed services and end-to-end solutions, and reports an 8.2% productivity gain from AI in delivery; both are company claims. No public Vietnam-wide measure of business outcomes delivered by the industry was found.' },
      { label: 'Business impact', text: 'Enterprise Software & IT Services is a business-to-business technology industry that combines software products, technical expertise, and ongoing support. Its central value proposition is enabling organizations to operate more effectively and adapt to changing business requirements.' },
    ],
    visualKind: 'ent-m1-11-definition', visualHeading: 'Five activities around one purpose',
    visualIntro: 'See the five core activities orbiting the industry\u2019s purpose and what each delivers.',
    imageAlt: 'Casemate orbit map of five core activities of enterprise software and IT services',
    keyTerms: [
      { term: 'Enterprise software', definition: 'Software sold to organisations to run and manage business functions.' },
      { term: 'IT services', definition: 'Consulting, building, integration, operation and support of technology for clients.' },
      { term: 'System integration', definition: 'Connecting separate applications, data and infrastructure so they work together.' },
      { term: 'Managed services', definition: 'Ongoing operation and support of a customer\u2019s technology for a recurring fee.' },
    ],
    recap: [
      'The industry develops, supplies, implements and manages technology for organisations.',
      'It combines repeatable software with services that fit each customer.',
      'Customers invest in outcomes such as productivity, control and security.',
      'Its value proposition is helping organisations operate and adapt.',
    ],
    chapterRecap: 'Enterprise Software & IT Services is a business-to-business technology industry that combines software products, technical expertise, and ongoing support. Its central value proposition is enabling organizations to operate more effectively and adapt to changing business requirements.',
    deepDiveTitle: 'Why customers pay for outcomes, not features',
    body: <EntDeepDive paragraphs={[
      'A feature list says what a system can do. An outcome says what changed for the business: invoices closed in two days instead of ten, or stock errors cut by half. Buyers compare providers on the second kind of statement.',
      'That is why implementation, integration and support are part of the product: the same software can deliver very different results depending on how well it is fitted to the customer\u2019s processes.' ]} evidence="Definitions and activities are from the supplied brief; FPT\u2019s service list, revenue and productivity claim are from its 2025 annual report; the shift toward managed services is a company statement. The feature-versus-outcome explanation is our own." />,
    sources: citeEnt('fptTechnology2025', 'fptGlobalIt2025'),
  }),
  entChapter({
    title: 'Industry Scope and Major Market Segments', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map the segments of enterprise software and IT services and explain why they must be analysed separately.',
    mateIntro: 'One company may buy a subscription from a software vendor, hire a second firm to install it and pay a third to keep the servers running. All three belong to the same industry, and they earn money in different ways.',
    keyInsight: 'The industry should be analyzed as an ecosystem of products and services, not as one uniform market. Revenue models, customer relationships, margins, competitive dynamics, and implementation risks vary significantly across segments.',
    statTiles: [
      { value: '6', label: 'Key segments', subtitle: 'Applications to specialised solutions', description: 'Enterprise applications, data and analytics, infrastructure and platform software, professional IT services, outsourcing and managed services, and specialised solutions.' },
      { value: '39.05%', label: 'Share of Vietnam\u2019s 2025 IT services market held by IT outsourcing', subtitle: 'Mordor Intelligence estimate', description: 'The largest service type in that estimate.' },
      { value: '11.86%', label: 'Projected yearly growth of cloud and platform services in Vietnam through 2031', subtitle: 'Mordor Intelligence projection', description: 'Faster than the 10.82% projected for IT services overall.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The shares and growth rates are third-party estimates for IT services only, not for enterprise software, and they apply to Vietnam.',
    narrative: [
      { label: 'What it is', text: 'The industry spans several interconnected segments, from business applications and infrastructure software to consulting, custom development, outsourcing, and managed services. Enterprise applications support specific business functions, while infrastructure and platform technologies provide the technical foundation on which applications operate.' },
      { label: 'Why it is happening', text: 'IT services connect these components to customer requirements. A company may purchase an ERP subscription from a software vendor, hire a systems integrator to implement it, and contract a managed-service provider to maintain the surrounding infrastructure. Such relationships create a market in which software vendors, service providers, cloud platforms, and specialist partners frequently collaborate.' },
      { label: 'Real-world example', text: 'Enterprise applications include ERP for integrated business management, CRM for customer relationships, HRM for workforce administration and supply-chain planning software. Data and analytics cover business intelligence, reporting and decision-support platforms; infrastructure and platform software covers operating systems, databases, middleware and developer tools. Professional services range from consulting and custom development to application modernisation, outsourcing and managed services cover maintenance, cloud management, service desks and managed cybersecurity, and specialised solutions serve banking, manufacturing, healthcare, retail, logistics and the public sector.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates IT outsourcing at 39.05% of Vietnam\u2019s US$2.37 billion IT services market in 2025, with cloud and platform services projected to grow 11.86% a year to 2031; these figures cover IT services, not software. VINASA says the software sector accounts for about US$13 billion of Vietnam\u2019s IT industry revenue, with US$7 billion exported (2024). FPT\u2019s service list shows how one group spans segments, from consulting and AI platforms to cybersecurity and delivering solutions on SAP, Oracle, Microsoft and other platforms. No single public figure splits Vietnam\u2019s market across all six segments.' },
      { label: 'Business impact', text: 'The industry\u2019s broad scope reflects the growing interdependence of software, infrastructure, data, and professional services. Market analysis should identify the specific segment under consideration before comparing size, growth, pricing, or competitive position.' },
    ],
    visualKind: 'ent-m1-12-scope', visualHeading: 'Six segments of one ecosystem',
    visualIntro: 'Read the six segments as branches of one ecosystem, with examples of each.',
    imageAlt: 'Casemate tree map of six segments of enterprise software and IT services',
    keyTerms: [
      { term: 'ERP', definition: 'Enterprise resource planning: integrated software for core business functions such as finance and supply.' },
      { term: 'CRM', definition: 'Customer relationship management software for sales, service and customer data.' },
      { term: 'Middleware', definition: 'Software that connects applications and lets them exchange data.' },
      { term: 'Systems integrator', definition: 'A firm that fits software and infrastructure from several suppliers into a working whole.' },
    ],
    recap: [
      'Segments include applications, data, platforms, professional services, outsourcing and specialised software.',
      'Customers often combine suppliers from several segments.',
      'Margins, models and risks differ by segment.',
      'Identify the segment before comparing size or growth.',
    ],
    chapterRecap: 'The industry\u2019s broad scope reflects the growing interdependence of software, infrastructure, data, and professional services. Market analysis should identify the specific segment under consideration before comparing size, growth, pricing, or competitive position.',
    deepDiveTitle: 'Why enterprise software and IT services are not the same market',
    body: <EntDeepDive paragraphs={[
      'Enterprise software and IT services are closely connected but are not the same market. Enterprise software includes applications such as ERP, CRM, HRM, analytics, and collaboration platforms. IT services include consulting, system integration, software development, outsourcing, cloud migration, infrastructure management, and cybersecurity services. Market-size figures should therefore be interpreted according to each source\u2019s specific definition.',
      'A figure for Vietnam\u2019s IT services market, for example, says nothing about software licence or subscription revenue, and a worldwide IT spending total includes devices and telecom services that are outside this industry.' ]} evidence="The scope note is from the supplied brief. Mordor Intelligence\u2019s figures cover Vietnam IT services only; VINASA\u2019s software figure comes from VnEconomy; FPT\u2019s service list is from its 2025 annual report. The comparison of definitions is our own." />,
    sources: citeEnt('mordorVietnamIt', 'vneconomyVinasa', 'fptTechnology2025'),
  }),
  entChapter({
    title: 'Customers, Value Proposition, and Revenue Models', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare the main revenue models and explain why recurring revenue needs continuing delivery of value.',
    mateIntro: 'A subscription renews every year, a project ends when the work is delivered, and a managed service runs for as long as the client is satisfied. Each asks for a different kind of trust.',
    keyInsight: 'Recurring revenue and long-term customer relationships are important sources of business stability, but they require continuous delivery of value. Software vendors must sustain product relevance, while service providers must maintain delivery quality, technical capability, and customer trust.',
    statTiles: [
      { value: '5', label: 'Key revenue models', subtitle: 'Subscription to hybrid', description: 'Subscription, licensing and maintenance, project-based, managed-service contracts and hybrid commercial models.' },
      { value: '+23.2%', label: 'Growth in FPT\u2019s newly signed overseas IT services revenue in 2025', subtitle: 'FPT annual report, company-reported', description: 'Newly signed contracts reached VND 40,636 billion.' },
      { value: '26', label: 'FPT contracts worth over US$10 million each signed in 2025', subtitle: 'FPT annual report, company-reported', description: 'Double the number of the previous year, according to the company.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The two company figures describe one provider\u2019s overseas business and are not typical of the market, and no public Vietnam-wide split between subscription, licence and project revenue was found.',
    narrative: [
      { label: 'What it is', text: 'Enterprise technology customers purchase solutions to address operational complexity, regulatory requirements, customer expectations, and the need to scale. Large enterprises often require extensive integration, customization, security, and governance, while SMEs may prioritize affordability, rapid deployment, ease of use, and predictable costs.' },
      { label: 'Why it is happening', text: 'Revenue models reflect these different requirements. Software vendors increasingly use subscription and cloud-delivery models, while IT service providers generate revenue from projects, time-based engagements, dedicated teams, outsourcing arrangements, and recurring managed services. Many suppliers combine these models to create longer-term customer relationships.' },
      { label: 'Real-world example', text: 'A vendor charges recurring fees for access to cloud-based applications, or sells licences and charges for updates and maintenance. A service firm delivers consulting, development, migration or integration against agreed scopes and milestones, or provides ongoing support, system monitoring, infrastructure management and cybersecurity for recurring fees. Many suppliers blend software subscriptions, implementation fees, usage-based charges and support.' },
      { label: 'Vietnam example', text: 'FPT says that in 2025 it moved its overseas business from time-and-materials delivery toward managed services and end-to-end solution contracts, which it credits with margin expansion and lower cyclical risk, and reports newly signed overseas revenue of VND 40,636 billion, up 23.2%, including 26 contracts above US$10 million and its first above US$100 million in Japan. Mordor Intelligence reports that Vietnamese enterprise demand is shifting from cost-centric outsourcing toward value-added digital transformation, consulting, platform and managed security work. Both are company or third-party statements; no public Vietnam-wide revenue-model split was found.' },
      { label: 'Business impact', text: 'Customer needs and revenue models differ across the industry, but successful providers must connect commercial arrangements to clear business value. Understanding these models is essential for analyzing revenue predictability, customer retention, profitability, and competitive advantage.' },
    ],
    visualKind: 'ent-m1-13-revenue', visualHeading: 'Where five revenue models sit',
    visualIntro: 'Compare revenue models by how tailored they are and how predictable their revenue is, and note the caution.',
    imageAlt: 'Casemate matrix placing five revenue models by tailoring and revenue predictability',
    keyTerms: [
      { term: 'Subscription', definition: 'A recurring fee for access to software or a service.' },
      { term: 'Licence and maintenance', definition: 'A fee to use software, plus continuing fees for updates and support.' },
      { term: 'Time and materials', definition: 'Billing a client for the hours and resources actually used.' },
      { term: 'Managed service', definition: 'A contract in which a provider runs and supports technology for a recurring fee.' },
    ],
    recap: [
      'Large enterprises need integration and governance; SMEs want speed and affordability.',
      'Software vendors lean on subscriptions; service firms use projects and managed services.',
      'Many suppliers combine models to build longer relationships.',
      'Recurring revenue lasts only while value is delivered.',
    ],
    chapterRecap: 'Customer needs and revenue models differ across the industry, but successful providers must connect commercial arrangements to clear business value. Understanding these models is essential for analyzing revenue predictability, customer retention, profitability, and competitive advantage.',
    deepDiveTitle: 'Why a contract that renews is not the same as a customer that stays',
    body: <EntDeepDive paragraphs={[
      'A multi-year contract gives visibility, but a client that is unhappy will look for an exit at the first break clause. Recurring revenue is therefore earned repeatedly, through product updates, support quality and results.',
      'Providers that move from selling hours to running outcomes, as FPT describes, gain steadier revenue only if they can keep service quality high and prove value each year.' ]} evidence="Revenue-model definitions are from the supplied brief; FPT\u2019s figures and strategy are company-reported in its 2025 annual report; the demand shift is from Mordor Intelligence. The renewal-versus-retention argument is our own." />,
    sources: citeEnt('fptGlobalIt2025', 'mordorVietnamIt'),
  }),
];

const quiz = entQuiz('ent-m1-l1', [
  { chapter: '1', objective: 'State the value insight', question: 'How does the industry create value?', application: 'A vendor lists features only. What is missing?', correct: 'By translating technology into measurable business outcomes', wrong: ['By selling hardware only', 'By avoiding customer input', 'By offering the cheapest licence'], explanation: 'Customers invest in outcomes. Review Chapter 1.' },
  { chapter: '1', objective: 'Define integration', question: 'What does system integration do?', application: 'Two applications cannot share data. Which activity fixes this?', correct: 'Connects applications, databases, infrastructure and external platforms so information can flow', wrong: ['Prints reports only', 'Replaces all staff', 'Sells domain names'], explanation: 'Integration links systems. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall a customer range', question: 'Which customers does the industry serve?', application: 'A founder assumes only large firms buy. What is the reality?', correct: 'SMEs, large corporations, government agencies and multinationals', wrong: ['Only consumers', 'Only banks', 'Only start-ups'], explanation: 'Customers range widely. Review Chapter 1.' },
  { chapter: '2', objective: 'State the analysis rule', question: 'How should the industry be analysed?', application: 'An analyst treats it as one market. What should change?', correct: 'As an ecosystem of products and services, not one uniform market', wrong: ['As a single product market', 'As a hardware market', 'As a retail market'], explanation: 'Segments differ in models and risks. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare roles', question: 'In the ERP example, what does the systems integrator do?', application: 'A firm buys ERP and needs it set up. Who implements it?', correct: 'Implements the software in the customer\u2019s processes', wrong: ['Maintains the vendor\u2019s code', 'Writes the licence', 'Audits the vendor\u2019s tax'], explanation: 'Vendor, integrator and managed-service provider have separate roles. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the Vietnam share', question: 'What share of Vietnam\u2019s 2025 IT services market did Mordor Intelligence assign to IT outsourcing?', application: 'An analyst wants the largest service type. What is it?', correct: '39.05%', wrong: ['3.9%', '90%', '0.39%'], explanation: 'It covers IT services only. Review Chapter 2.' },
  { chapter: '2', objective: 'Read a definition', question: 'Why is a Vietnam IT services figure not the size of the whole industry?', application: 'A slide calls US$2.37 billion the industry. What is wrong?', correct: 'It excludes software and covers IT services only', wrong: ['It is a global total', 'It includes hardware', 'It is a forecast for 2050'], explanation: 'Definitions differ. Review Chapter 2.' },
  { chapter: '3', objective: 'State the stability rule', question: 'What does recurring revenue require to be stable?', application: 'A vendor relies on renewals. What must it keep doing?', correct: 'Continuous delivery of value to customers', wrong: ['Raising prices yearly', 'Reducing support', 'Avoiding upgrades'], explanation: 'Trust and relevance sustain renewals. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a revenue model', question: 'Which model charges recurring fees for access to cloud-based applications?', application: 'A customer pays monthly for CRM access. Which model is it?', correct: 'Subscription', wrong: ['Project-based', 'One-off licence only', 'Barter'], explanation: 'Software vendors increasingly use subscriptions. Review Chapter 3.' },
  { chapter: '3', objective: 'Judge a company claim', question: 'How should FPT\u2019s statement that managed services expanded margins be treated?', application: 'A deck cites it as an industry fact. What caution applies?', correct: 'As a company claim about one provider', wrong: ['As an audited industry statistic', 'As a government rule', 'As a global average'], explanation: 'Label company statements. Review Chapter 3.' },
]);

export const LESSON_ENT_1: EntM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can define enterprise software and IT services, map their segments and compare the revenue models providers use.',
    keyTakeaways: [
      'The industry creates value by turning technology into measurable business outcomes.',
      'It is an ecosystem of products and services, not one uniform market.',
      'Software and IT services are connected but are different markets, so check each figure\u2019s definition.',
      'Subscription, licence, project, managed-service and hybrid models differ in predictability.',
      'Recurring revenue lasts only while value keeps being delivered.',
    ],
    businessImplications: 'Identify the segment and revenue model before comparing providers, and judge each by outcomes delivered and customer trust.',
    remember: 'Customers buy results; the technology is the means.',
    nextLesson: 'How the Industry Evolved',
  },
};
