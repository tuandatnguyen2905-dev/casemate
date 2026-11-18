import { EntDeepDive, citeEnt4, entM4Chapter, entQuiz } from './entM4Core';
import type { EntM4LessonBundle } from './entM4Core';

const LESSON = '2. Key Industry Players';

const deck = [
  entM4Chapter({
    title: 'Global Enterprise Software and Platform Leaders', chapterTitle: LESSON, readingTime: '7',
    objective: 'Place the global platform leaders by category and explain why portfolio breadth does not make one vendor right for everyone.',
    mateIntro: 'The famous names do not all sell the same thing. Put each in its own category before comparing them.',
    keyInsight: 'Global leaders benefit from scale and integration, but portfolio breadth does not automatically make one vendor the best choice for every enterprise. Product suitability, total cost of ownership, implementation complexity, compatibility, and industry requirements remain decisive.',
    statTiles: [
      { value: '7', label: 'Key vendor groups', subtitle: 'Microsoft to IBM and Adobe', description: 'Microsoft, SAP, Oracle, Salesforce, ServiceNow, AWS and Google Cloud, and IBM and Adobe.' },
      { value: 'US$1,468B', label: 'Forecast worldwide software spending in 2026', subtitle: 'Gartner, July 2026', description: 'A broad global category covering many kinds of software.' },
      { value: '+29.3%', label: 'Forecast growth in worldwide IaaS spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$287 billion, a global category forecast.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figures describe whole categories, not any company’s revenue or market share.',
    narrative: [
      { label: 'What it is', text: 'Global enterprise software competition is shaped by companies with extensive product portfolios, large research and development budgets, established customer relationships, and international partner ecosystems. These companies often operate across multiple categories, including productivity software, ERP, CRM, databases, cloud computing, business analytics, and AI.' },
      { label: 'Why it is happening', text: 'Examples include Microsoft, SAP, Oracle, Salesforce, ServiceNow, IBM, Adobe, Workday, Amazon Web Services (AWS), and Google Cloud. Their competitive positions differ: some focus on enterprise applications, others on cloud infrastructure, workflow automation, customer engagement, or data and AI platforms. These firms should therefore be compared within relevant product categories rather than ranked as if they offered identical products.' },
      { label: 'Real-world example', text: 'Microsoft offers productivity and collaboration software, Azure cloud services, business applications, developer tools and AI-enabled enterprise solutions; SAP offers ERP, finance, procurement, supply chain management and enterprise process platforms; Oracle offers enterprise databases, cloud infrastructure, ERP, human capital management and other business applications; Salesforce offers CRM, sales and marketing automation, customer service and customer data solutions; ServiceNow offers enterprise workflow automation, IT service management and digital workflow platforms; AWS and Google Cloud offer cloud infrastructure, data platforms, AI services, application development and managed cloud capabilities; and IBM and Adobe offer technology and consulting capabilities in hybrid cloud, automation, analytics, digital experience and content workflows. Microsoft’s 2026 annual report describes competition across cloud infrastructure, AI, enterprise applications, cybersecurity and developer tools, which illustrates how large vendors overlap across several technology markets.' },
      { label: 'Vietnam example', text: 'The Deputy Prime Minister was reported as saying that domestic providers hold only about 20% of Vietnam’s cloud computing market and that most of it belongs to foreign firms, an official statement as reported by the press. CMC says it has completed CMC Cloud with core services approaching hyperscaler standards, and MISA claims a 33% share of Vietnamese accounting software in the second quarter of 2025, both company statements. No public Vietnam market-share data for the named global vendors was found.' },
      { label: 'Business impact', text: 'Global leaders compete through integrated portfolios, financial resources, product innovation, and ecosystem reach. Their broad capabilities make them important benchmarks, although their relative strength depends on the particular market segment being evaluated.' },
    ],
    visualKind: 'ent-m4-21-global', visualHeading: 'Nine global names and their focus',
    visualIntro: 'Read across the table for each company’s main focus and the category in which to compare it.',
    imageAlt: 'Casemate table of global enterprise software and platform leaders and their main focus',
    keyTerms: [
      { term: 'Portfolio breadth', definition: 'The range of products and services a vendor offers.' },
      { term: 'Total cost of ownership', definition: 'The full cost of buying, running and maintaining a system over its life.' },
      { term: 'Hyperscale cloud', definition: 'Cloud infrastructure operated at very large scale by a few global providers.' },
      { term: 'Workflow platform', definition: 'Software that automates and coordinates business processes across functions.' },
    ],
    recap: [
      'Global leaders have large portfolios, budgets and partner ecosystems.',
      'Their positions differ by category, so compare them within categories.',
      'Breadth does not guarantee the best fit for every enterprise.',
      'Suitability, cost, complexity, compatibility and industry needs decide.',
    ],
    chapterRecap: 'Global leaders compete through integrated portfolios, financial resources, product innovation, and ecosystem reach. Their broad capabilities make them important benchmarks, although their relative strength depends on the particular market segment being evaluated.',
    deepDiveTitle: 'Why overlap makes ranking misleading',
    body: <EntDeepDive paragraphs={[
      'A company that leads in databases may be a challenger in CRM, and a cloud provider may compete with its own software partners. A single league table hides those differences.',
      'Comparing within a category, for a stated workload, shows who is actually strongest for the job.' ]} evidence="The company descriptions and the Microsoft annual report point are from the supplied brief and have not been independently verified here; the spending forecasts are from Gartner’s July 2026 press release; the cloud-share statement is from a press report; CMC and MISA statements are company claims. The reasoning on overlap is our own." />,
    sources: citeEnt4('gartnerJuly2026', 'cmcGrowth', 'vietnamplusIct', 'misaPress'),
  }),
  entM4Chapter({
    title: 'Global IT Consulting, Systems Integration, and Outsourcing Firms', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe how global service firms differentiate through execution and delivery models.',
    mateIntro: 'These firms rarely own the software. They own the know-how to make it work inside a big, messy organisation.',
    keyInsight: 'Service providers differentiate themselves through execution rather than software ownership alone. Their ability to combine business consulting, technical delivery, global project management, and measurable operational outcomes can be as important as the underlying technology platform.',
    statTiles: [
      { value: '7', label: 'Key service strands', subtitle: 'Accenture to strategic partnerships', description: 'Accenture, IBM Consulting, Deloitte and Capgemini, TCS, Infosys and Wipro, Cognizant, delivery models and partnerships.' },
      { value: 'US$1,570B', label: 'Forecast worldwide IT services spending in 2026', subtitle: 'Gartner, July 2026', description: 'The largest forecast category, covering far more than enterprise implementation.' },
      { value: '+5.3%', label: 'Forecast growth in worldwide IT services spending in 2026', subtitle: 'Gartner, July 2026', description: 'The slowest of the six forecast categories.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figures cover a whole global category and say nothing about any firm’s revenue or share.',
    narrative: [
      { label: 'What it is', text: 'IT consulting and service providers help enterprises translate technology investments into operational systems and business improvements. Their services include strategy consulting, digital transformation, custom software development, cloud migration, enterprise application implementation, cybersecurity, and ongoing technology management.' },
      { label: 'Why it is happening', text: 'Major international competitors include Accenture, IBM Consulting, Deloitte, Capgemini, Cognizant, Tata Consultancy Services (TCS), Infosys, and Wipro. These companies compete for large transformation programs, multinational enterprise accounts, and complex technology contracts. Their performance depends on the balance between consulting expertise, engineering capacity, delivery efficiency, industry specialization, and long-term client relationships.' },
      { label: 'Real-world example', text: 'Accenture is associated with large-scale digital transformation, technology consulting, cloud, data, AI and systems integration; IBM Consulting with enterprise technology consulting, hybrid cloud, AI implementation and systems modernisation; Deloitte and Capgemini with business transformation, technology strategy, enterprise implementation and industry consulting; TCS, Infosys and Wipro with application development, managed services, enterprise platforms and global delivery; and Cognizant with digital engineering, application services, cloud transformation and business process modernisation. Competitive delivery models combine onshore consulting with offshore or nearshore engineering and support teams, and strategic partnerships bring joint delivery with hyperscalers and enterprise software vendors.' },
      { label: 'Vietnam example', text: 'CMC Global describes a best-shore delivery model combining on-site teams in markets such as Japan with nearshore and offshore resources in Vietnam, India and the Philippines, which shows a Vietnamese firm competing on the same blended-delivery model as global providers. On 27 January 2026 it signed a cooperation agreement with NTT DATA and NTT DATA Vietnam, a partnership with a global service firm. FPT reports global IT services revenue of VND 35,382 billion in 2025, up 14.3%, with Japan up 25.4%. These are company statements, and no public ranking of Vietnamese providers against global service firms was found.' },
      { label: 'Business impact', text: 'Global IT service providers compete through delivery scale, specialized expertise, trusted relationships, and technology partnerships. Their differentiation increasingly depends on how effectively they convert complex technology programs into reliable and measurable business results.' },
    ],
    visualKind: 'ent-m4-22-services', visualHeading: 'Seven strands of services competition',
    visualIntro: 'Explore the seven strands around the idea of execution-led competition.',
    imageAlt: 'Casemate mind map of seven strands of global IT services competition',
    keyTerms: [
      { term: 'Systems integrator', definition: 'A firm that connects applications, data and infrastructure into a working whole.' },
      { term: 'Onshore, nearshore, offshore', definition: 'Delivering work in the customer’s country, a nearby country or a distant one.' },
      { term: 'Digital transformation', definition: 'Changing how an organization works by applying digital technology across its processes.' },
      { term: 'Hyperscaler partnership', definition: 'A joint delivery arrangement with a very large cloud provider.' },
    ],
    recap: [
      'Service firms compete for large programmes, multinational accounts and complex contracts.',
      'Differentiation rests on execution, not software ownership.',
      'Blended onshore and offshore teams are a common delivery model.',
      'Partnerships with hyperscalers and vendors extend capability.',
    ],
    chapterRecap: 'Global IT service providers compete through delivery scale, specialized expertise, trusted relationships, and technology partnerships. Their differentiation increasingly depends on how effectively they convert complex technology programs into reliable and measurable business results.',
    deepDiveTitle: 'Why a partner can also be a rival',
    body: <EntDeepDive paragraphs={[
      'A consulting firm may implement a vendor’s software for a customer while also selling services that compete with that vendor’s own. A Vietnamese outsourcer may subcontract to a global firm on one account and bid against it on another.',
      'Understanding these overlaps helps providers choose where to cooperate and where to compete.' ]} evidence="The firm descriptions are from the supplied brief and have not been independently verified here; the Gartner figures are from its July 2026 press release; CMC statements are from its press release and marketing deck; FPT figures are from its earnings report and are company-reported. The discussion of partner-rivals is our own reading." />,
    sources: citeEnt4('gartnerJuly2026', 'cmcDeck', 'cmcNtt', 'fptEarnings2025'),
  }),
  entM4Chapter({
    title: 'Vietnam’s Enterprise Software and IT Services Competitors', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe the types of Vietnamese provider and how they can move toward higher-value work.',
    mateIntro: 'Vietnam’s providers range from one big exporter to specialist engineering firms. Each has a different edge and a different route up.',
    keyInsight: 'Vietnamese providers can compete through engineering talent, delivery flexibility, local market understanding, and cost-effective execution. Moving toward higher-value consulting, proprietary platforms, AI implementation, and industry-specific solutions can help them reduce dependence on labor-based outsourcing.',
    statTiles: [
      { value: '7', label: 'Key provider groups', subtitle: 'FPT to Rikkeisoft', description: 'FPT, CMC Global and CMC, Viettel Solutions, VNPT Technology, NashTech Vietnam, TMA Solutions and Rikkeisoft.' },
      { value: 'VND 44,475B', label: 'FPT technology sector revenue in 2025', subtitle: 'FPT annual report, company-reported', description: 'Up 13.7%, covering overseas and domestic IT services.' },
      { value: 'VND 10,555B', label: 'CMC revenue reported for 2025', subtitle: 'Vietnam.vn press report, company figure', description: 'Up 17%, with pre-tax profit of VND 737 billion; the fiscal-year basis is not stated.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The two revenue figures use different company scopes and reporting bases and must not be ranked against each other.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s competitive landscape includes large technology groups, software outsourcing companies, domestic enterprise solution providers, telecommunications-linked technology firms, and smaller software development specialists. Their business models range from exporting software engineering services to implementing digital transformation projects for Vietnamese enterprises and public-sector organizations.' },
      { label: 'Why it is happening', text: 'Key examples include FPT, CMC, Viettel Solutions, VNPT Technology, NashTech Vietnam, TMA Solutions, and Rikkeisoft. Their strengths differ by scale, target market, delivery capabilities, industry specialization, and international reach. FPT’s corporate profile highlights its presence across 30 countries and regions and its work in consulting, digital transformation, AI, cloud, and related technologies.' },
      { label: 'Real-world example', text: 'FPT offers international software services, digital transformation, enterprise solutions, cloud, AI and domestic technology services; CMC Global and CMC offer software engineering, international IT services, cloud, cybersecurity and digital transformation; Viettel Solutions offers enterprise and public-sector solutions, systems integration, digital infrastructure and digital government; VNPT Technology offers telecommunications-related technology, digital infrastructure and enterprise solutions; NashTech Vietnam offers software development, digital engineering and technology consulting; TMA Solutions offers software engineering, product development and specialised technology services; and Rikkeisoft offers software development, digital transformation and engineering services for domestic and international customers. Mordor Intelligence identifies FPT, CMC Global, Viettel Solutions, VNPT Technology and NashTech among Vietnam’s IT services industry participants; the list is illustrative rather than a definitive ranking.' },
      { label: 'Vietnam example', text: 'FPT reports 2025 technology revenue of VND 44,475 billion and CMC reports revenue of VND 10,555 billion and more than 5,800 employees, company figures with different scopes. The Viettel group reported consolidated revenue of VND 220 trillion in 2025, but that covers telecoms and other businesses and is not an IT services figure. Press reports say VNPT deployed generative AI platforms at 30 administrative units and CMC trained a 72-billion-parameter language model, which are company statements about moving toward AI work. No verified revenue ranking for Viettel Solutions, VNPT Technology, NashTech, TMA Solutions or Rikkeisoft was found, and none is shown.' },
      { label: 'Business impact', text: 'Vietnam’s providers compete in both domestic and international markets. Their strategic opportunities include strengthening technical specialization, developing intellectual property, expanding international client relationships, and building capabilities in AI, cloud, cybersecurity, and complex enterprise integration.' },
    ],
    visualKind: 'ent-m4-23-vietnam', visualHeading: 'Seven Vietnamese providers named in the brief',
    visualIntro: 'Review each provider’s focus. The list is illustrative, not a ranking.',
    imageAlt: 'Casemate cards showing seven Vietnamese enterprise software and IT services providers and their focus',
    keyTerms: [
      { term: 'Outsourcing', definition: 'Contracting an external provider to build or run part of a customer’s technology.' },
      { term: 'Digital government', definition: 'The use of digital systems to deliver public services and administration.' },
      { term: 'Value chain', definition: 'The sequence of activities from basic engineering to consulting and product ownership.' },
      { term: 'Proprietary platform', definition: 'A software platform a firm builds, owns and sells to many customers.' },
    ],
    recap: [
      'Vietnam’s market includes large groups, outsourcers, enterprise specialists and telecom-linked firms.',
      'Strengths differ by scale, market, delivery, specialization and reach.',
      'The list of firms is illustrative, not a ranking.',
      'Moving up the value chain reduces dependence on labour-based outsourcing.',
    ],
    chapterRecap: 'Vietnam’s providers compete in both domestic and international markets. Their strategic opportunities include strengthening technical specialization, developing intellectual property, expanding international client relationships, and building capabilities in AI, cloud, cybersecurity, and complex enterprise integration.',
    deepDiveTitle: 'Why company revenues cannot simply be ranked',
    body: <EntDeepDive paragraphs={[
      'A group that includes telecoms, education and other businesses reports far larger totals than a pure IT services firm, and fiscal years may end in different months. Putting such numbers side by side invents a ranking that the data does not support.',
      'A fair comparison needs the same scope, period and definition for every firm.' ]} evidence="The provider descriptions and the FPT 30-country point are from the supplied brief; the Mordor listing is as described in the brief; FPT figures are from its annual report; CMC and Viettel figures and the AI statements are from press reports of company statements. The warning about ranking is our own." />,
    sources: citeEnt4('fptTechnology2025', 'cmcGrowth', 'vietnamplusIct', 'mordorVietnamIt'),
  }),
];

const quiz = entQuiz('ent-m4-l2', [
  { chapter: '1', objective: 'Explain how to compare leaders', question: 'How should global platform leaders be compared?', application: 'An analyst ranks several vendors on one scale. What is the correction?', correct: 'Within relevant product categories, not as if they offered identical products', wrong: ['By logo size', 'By office count', 'By founding year'], explanation: 'Categories matter. Review Chapter 1.' },
  { chapter: '1', objective: 'State the key insight', question: 'What does portfolio breadth not guarantee?', application: 'A buyer assumes the biggest vendor is always best. What is wrong?', correct: 'That a vendor is the best choice for every enterprise', wrong: ['That it has customers', 'That it sells software', 'That it exists'], explanation: 'Fit decides. Review Chapter 1.' },
  { chapter: '1', objective: 'Match vendor to focus', question: 'Which focus is described for ServiceNow?', application: 'A buyer needs workflow automation. Which vendor focus matches?', correct: 'Enterprise workflow automation, IT service management and digital workflow platforms', wrong: ['Consumer cameras', 'Retail stores', 'Coffee roasting'], explanation: 'Match by category. Review Chapter 1.' },
  { chapter: '1', objective: 'Read forecasts correctly', question: 'How should Gartner’s US$1,468 billion software figure be described?', application: 'A slide calls it Microsoft’s revenue. What is wrong?', correct: 'It is a worldwide forecast for the whole software category', wrong: ['It is one company’s revenue', 'It is a Vietnam figure', 'It is a law'], explanation: 'Categories are not companies. Review Chapter 1.' },
  { chapter: '2', objective: 'State how service firms differentiate', question: 'How do service providers differentiate themselves?', application: 'A consulting firm has no product. What is its edge?', correct: 'Through execution rather than software ownership alone', wrong: ['Through hardware sales', 'Through advertising only', 'Through free trials only'], explanation: 'Execution wins. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe a delivery model', question: 'What is a competitive delivery model in the chapter?', application: 'A firm plans a global team. Which model fits?', correct: 'Onshore consulting combined with offshore or nearshore engineering and support teams', wrong: ['One team in one office only', 'No consulting', 'Only remote advertising'], explanation: 'Blended teams are common. Review Chapter 2.' },
  { chapter: '2', objective: 'Use evidence honestly', question: 'What should be said about a ranking of Vietnamese providers against global service firms?', application: 'A slide shows a league table. What is the correction?', correct: 'No public ranking was found, so none is shown', wrong: ['FPT is always first', 'Gartner publishes it', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 2.' },
  { chapter: '3', objective: 'State the Vietnamese opportunity', question: 'How can Vietnamese providers reduce dependence on labour-based outsourcing?', application: 'An outsourcer only supplies engineers. What is the route up?', correct: 'By moving toward consulting, proprietary platforms, AI implementation and industry-specific solutions', wrong: ['By cutting prices only', 'By avoiding customers', 'By dropping engineering'], explanation: 'Higher-value work. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a list correctly', question: 'How should the list of Vietnamese providers be described?', application: 'A slide calls it the top seven. What is wrong?', correct: 'As illustrative rather than a definitive ranking', wrong: ['As an official ranking', 'As a Gartner list', 'As a law'], explanation: 'It is illustrative. Review Chapter 3.' },
  { chapter: '3', objective: 'Avoid mixing scopes', question: 'Why should the Viettel group’s VND 220 trillion not be used as an IT services figure?', application: 'A chart compares it with FPT’s technology revenue. What is wrong?', correct: 'It covers telecoms and other businesses, so it is a different scope', wrong: ['It is a forecast', 'It is a law', 'It is in a different currency'], explanation: 'Scopes differ. Review Chapter 3.' },
]);

export const LESSON_ENT4_2: EntM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can place global platform leaders, global service firms and Vietnamese providers by category and avoid false rankings.',
    keyTakeaways: [
      'Global platform leaders should be compared within categories.',
      'Breadth does not make one vendor best for every enterprise.',
      'Service firms differentiate through execution and blended delivery.',
      'Vietnamese providers can move up toward consulting, platforms, AI and industry solutions.',
      'Company lists in this module are illustrative, and revenues of different scopes are not ranked.',
    ],
    businessImplications: 'Benchmark within categories, learn from blended delivery models and build proprietary assets to move up the value chain.',
    remember: 'A list of names is not a league table.',
    nextLesson: 'Competitor Benchmarking',
  },
};
