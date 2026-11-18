import { EntDeepDive, citeEnt3, entM3Chapter, entQuiz } from './entM3Core';
import type { EntM3LessonBundle } from './entM3Core';

const LESSON = '6. Industry Ecosystem & Stakeholders';

const deck = [
  entM3Chapter({
    title: 'Technology Suppliers and Infrastructure Partners', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the upstream suppliers the industry depends on and explain why supplier governance is part of quality and risk management.',
    mateIntro: 'Every software product stands on someone else’s cloud, tools and libraries. When a supplier slips, so does the product.',
    keyInsight: 'The quality and reliability of upstream partners directly affect the performance of downstream solutions. Providers must manage supplier relationships as part of product quality, service continuity, and risk management.',
    statTiles: [
      { value: '5', label: 'Key supplier groups', subtitle: 'Cloud to supplier governance', description: 'Cloud infrastructure providers, software and tool vendors, cybersecurity suppliers, open-source communities and supplier governance.' },
      { value: 'US$287B', label: 'Forecast worldwide IaaS spending in 2026', subtitle: 'Gartner, July 2026', description: 'Up 29.3%, a global category forecast.' },
      { value: '+62.5%', label: 'Forecast growth in worldwide data center systems spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$822 billion, the fastest-growing category.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The Gartner figures are worldwide forecasts for broad categories and say nothing about any one supplier or about Vietnam.',
    narrative: [
      { label: 'What it is', text: 'Enterprise Software & IT Services depends on a network of upstream suppliers that provide cloud infrastructure, computing hardware, databases, development tools, cybersecurity products, telecommunications connectivity, and other technical components. These suppliers enable software vendors and service providers to build, deploy, and operate solutions without independently developing every underlying capability.' },
      { label: 'Why it is happening', text: 'The ecosystem also includes open-source communities and specialist technology firms that contribute reusable software components and technical standards. These relationships create opportunities for faster innovation, but they require appropriate licensing, security reviews, compatibility management, and contingency planning.' },
      { label: 'Real-world example', text: 'Cloud providers supply computing, storage, databases, networking and managed platform services; tool vendors provide development environments, testing tools, monitoring platforms and enterprise components; cybersecurity suppliers deliver identity management, endpoint protection, threat monitoring and security testing; open-source communities develop shared libraries, frameworks and tools; and providers evaluate reliability, licensing, security, support quality, service levels and dependency risks.' },
      { label: 'Vietnam example', text: 'Vietnam’s 2025–30 national cloud programme (Decision 1121/QD-TTg) targets cloud use by government agencies and state enterprises with services from domestic providers, a policy target that shapes supplier choice. Mordor Intelligence names submarine-cable outages among the factors that temper growth in Vietnam, which shows dependence on connectivity. FPT lists FPT AI Factory among its own services, a company report. No public data on supplier concentration or open-source use among Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Technology suppliers provide the foundations on which enterprise products and services operate. Strong supplier governance helps providers maintain reliability, manage costs, and reduce the risks associated with third-party dependencies.' },
    ],
    visualKind: 'ent-m3-61-suppliers', visualHeading: 'Five kinds of technology supplier',
    visualIntro: 'Review each supplier group and what it provides.',
    imageAlt: 'Casemate cards showing five kinds of technology supplier and what each provides',
    keyTerms: [
      { term: 'Upstream supplier', definition: 'A provider of inputs, such as cloud capacity or tools, that a product is built on.' },
      { term: 'Open-source community', definition: 'A group that develops and shares software code for others to use and improve.' },
      { term: 'Service level', definition: 'A measurable promise on availability or response time.' },
      { term: 'Contingency planning', definition: 'Preparing alternatives for the case that a supplier or component fails.' },
    ],
    recap: [
      'Providers rely on cloud, tool, security and open-source suppliers.',
      'Suppliers enable faster innovation without building every capability.',
      'Licensing, security, compatibility and contingency need attention.',
      'Supplier quality directly affects downstream performance.',
    ],
    chapterRecap: 'Technology suppliers provide the foundations on which enterprise products and services operate. Strong supplier governance helps providers maintain reliability, manage costs, and reduce the risks associated with third-party dependencies.',
    deepDiveTitle: 'Why supplier risk becomes customer risk',
    body: <EntDeepDive paragraphs={[
      'A customer experiences an outage as the provider’s failure, even when the cause sits with a cloud platform or a library the provider uses. The contract between provider and customer rarely excuses the supplier’s fault.',
      'Reviewing suppliers’ reliability, support and security before depending on them is therefore a core part of delivering a dependable service.' ]} evidence="The supplier groups are from the supplied brief; the spending forecasts are from Gartner’s July 2026 press release; the cloud programme is from the Vietnam Government news portal; the connectivity constraint is from Mordor Intelligence; FPT’s service is from its annual report. The point about supplier risk and customers is our own reading." />,
    sources: citeEnt3('gartnerJuly2026', 'vietnamCloudProgram', 'mordorVietnamIt', 'fptTechnology2025'),
  }),
  entM3Chapter({
    title: 'Customers, Employees, and Delivery Partners', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why customers, staff and delivery partners jointly determine the quality and value of delivery.',
    mateIntro: 'A technology project succeeds or fails on people: the customer’s, the provider’s and their partners’.',
    keyInsight: 'Enterprise technology outcomes are jointly produced by providers and customers. Successful delivery requires clear ownership, effective communication, user adoption, and alignment between technical objectives and business priorities.',
    statTiles: [
      { value: '5', label: 'Key joint-delivery activities', subtitle: 'Stakeholder management to customer feedback', description: 'Customer stakeholder management, workforce capability, delivery partner coordination, user adoption and customer feedback.' },
      { value: '1.9M+', label: 'Workers in Vietnam’s technology industry in 2025', subtitle: 'Tuoi Tre News, press-reported', description: 'Across about 80,000 technology firms, including hardware.' },
      { value: '~50,000', label: 'IT graduates a year in Vietnam, of whom about 30% are reported job-ready', subtitle: 'Viet Nam News, citing An Binh Securities', description: 'A broker estimate reported by a news outlet.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Workforce figures are press-reported or broker estimates and cover the wider technology industry.',
    narrative: [
      { label: 'What it is', text: 'Customers are central to the industry’s ecosystem because their requirements, data, workflows, and adoption decisions determine whether technology investments create value. Within customer organizations, IT teams, business departments, procurement, finance, legal, security, and executive leadership may all influence purchasing and implementation.' },
      { label: 'Why it is happening', text: 'Employees and delivery partners are equally important. Engineers, consultants, project managers, support specialists, and customer success teams translate technical capabilities into operational results. Implementation partners and subcontractors can expand delivery capacity, but coordination and accountability are essential when multiple organizations contribute to a solution.' },
      { label: 'Real-world example', text: 'Providers coordinate requirements and decisions across business, IT, finance, procurement and security teams; recruit, train and retain employees with technical and domain expertise; set roles, timelines, interfaces, quality standards and escalation processes with delivery partners; provide training, documentation, change management and ongoing assistance; and collect feedback on usability, reliability, support and business outcomes to improve future delivery.' },
      { label: 'Vietnam example', text: 'Tuoi Tre News reports more than 1.9 million workers and about 80,000 firms in Vietnam’s technology industry, and Viet Nam News, citing An Binh Securities, reports about 50,000 IT graduates a year of whom around 30% are job-ready. In the World Bank study of a Vietnamese cloud ERP provider, firms that received training mostly used the platform at first, but only 35% still did about 18 months later, which shows that user adoption needs continuing effort. No public data on how much Vietnamese delivery relies on subcontractors or partners was found.' },
      { label: 'Business impact', text: 'Customers, employees, and delivery partners collectively determine implementation quality and realized business value. Clear accountability and continuous collaboration reduce delivery risks and strengthen long-term relationships.' },
    ],
    visualKind: 'ent-m3-62-people', visualHeading: 'Five parts of joint delivery',
    visualIntro: 'Explore the five parts around the idea of jointly produced outcomes.',
    imageAlt: 'Casemate mind map of five parts of joint delivery between providers, customers and partners',
    keyTerms: [
      { term: 'Stakeholder', definition: 'Anyone who influences or is affected by a project or purchase.' },
      { term: 'Escalation process', definition: 'The agreed route for raising problems to people who can decide.' },
      { term: 'Change management', definition: 'Helping people adopt new processes and tools.' },
      { term: 'Subcontractor', definition: 'An outside firm hired to carry out part of a project.' },
    ],
    recap: [
      'Customer requirements, data and decisions drive value.',
      'Employees and partners turn technology into operational results.',
      'Coordination and accountability matter when many firms contribute.',
      'Adoption and feedback close the loop.',
    ],
    chapterRecap: 'Customers, employees, and delivery partners collectively determine implementation quality and realized business value. Clear accountability and continuous collaboration reduce delivery risks and strengthen long-term relationships.',
    deepDiveTitle: 'Why subcontracting needs clear interfaces',
    body: <EntDeepDive paragraphs={[
      'When several organizations build parts of one system, problems often arise at the boundaries: who tests the connection, who answers the customer, who fixes a fault that spans two components.',
      'Naming owners, interfaces and escalation routes in advance keeps responsibility clear and protects the customer experience.' ]} evidence="The joint-delivery activities are from the supplied brief; workforce figures are from Tuoi Tre News and Viet Nam News; the adoption figure is from a World Bank blog on one provider. The discussion of boundaries is our own reading of the brief." />,
    sources: citeEnt3('tuoitreDigitalExports', 'vietnamnewsItWorkforce', 'worldBankSme'),
  }),
  entM3Chapter({
    title: 'Regulators, Industry Associations, Investors, and the Wider Business Environment', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the institutions and financial forces that shape the industry and why governance must follow them.',
    mateIntro: 'Beyond customers and suppliers sits a wider circle: the rule-makers, the skills-builders and the people who fund the work.',
    keyInsight: 'Industry performance depends on more than technology and customer demand; it is also shaped by regulation, capital, skills development, and institutional trust. Providers need to monitor external requirements and maintain governance appropriate to their markets and business models.',
    statTiles: [
      { value: '5', label: 'Key environment activities', subtitle: 'Compliance to corporate governance', description: 'Regulatory compliance, industry associations, education and skills, investment and financing, and corporate governance.' },
      { value: 'VND 3B', label: 'Maximum administrative fine for most violations of the Personal Data Protection Law', subtitle: 'Law 91/2025/QH15, effective 1 January 2026', description: 'One of several consequences of non-compliance.' },
      { value: '1 Jul 2026', label: 'Effective date of Vietnam’s Law on Cybersecurity 116/2025/QH15', subtitle: 'Luat Viet Nam, English summary', description: 'It replaces the 2018 Cybersecurity Law.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Legal dates and fines come from official or secondary summaries and should be checked against the current text before use.',
    narrative: [
      { label: 'What it is', text: 'The industry operates within a broader institutional and financial environment that influences technology investment, commercial practices, and acceptable risk. Regulators establish relevant requirements for privacy, cybersecurity, intellectual property, electronic transactions, and sector-specific technology use. Industry associations, professional communities, universities, and training organizations contribute to skills development, standards, research, and professional networking.' },
      { label: 'Why it is happening', text: 'Investors, lenders, and corporate leadership also influence the industry’s direction by determining funding, investment priorities, acquisition strategies, and expected returns. Their decisions can affect product development, market expansion, workforce investment, and the balance between short-term profitability and long-term capability building.' },
      { label: 'Real-world example', text: 'Providers assess applicable data protection, cybersecurity, intellectual property, procurement and sector requirements; take part in professional networks, industry research, knowledge sharing and policy discussions; work with universities, training providers and certification organisations to develop technical talent; fund growth through retained earnings, external investment, lending or strategic partnerships; and maintain financial controls, risk management, contractual oversight and accountability for technology decisions.' },
      { label: 'Vietnam example', text: 'Four legal texts matter most: the Law on Data (60/2024/QH15, effective 1 July 2025), the Law on the Digital Technology Industry (71/2025/QH15, effective 1 January 2026, covering human resources and incentives), the Personal Data Protection Law (91/2025/QH15, effective 1 January 2026) and the Law on Cybersecurity (116/2025/QH15, effective 1 July 2026). VINASA, the software and IT services association, organised the October 2025 Top 10 and digital technology map ceremony that MISA cites in its press release. Sector rules were not reviewed, and no public data on investment or financing of Vietnamese enterprise software and IT firms was found in the sources reviewed.' },
      { label: 'Business impact', text: 'Regulators and wider stakeholders shape the conditions under which enterprise technology businesses operate. Effective governance, investment discipline, and continued skills development help providers adapt to industry change and build sustainable capabilities.' },
    ],
    visualKind: 'ent-m3-63-environment', visualHeading: 'Five layers of the wider environment',
    visualIntro: 'Read the five layers from regulatory compliance at the base up to corporate governance.',
    imageAlt: 'Casemate pyramid of five layers of the wider business environment from regulatory compliance to corporate governance',
    keyTerms: [
      { term: 'Regulator', definition: 'A public body that sets and enforces rules, for example on data protection or cybersecurity.' },
      { term: 'Industry association', definition: 'A membership body that supports a sector through networks, research and policy input.' },
      { term: 'Corporate governance', definition: 'The controls, oversight and accountability that direct how a company is run.' },
      { term: 'Certification', definition: 'Formal proof that a person or firm meets a defined technical standard.' },
    ],
    recap: [
      'Regulators set privacy, cybersecurity, intellectual property and sector requirements.',
      'Associations, universities and trainers build skills, standards and networks.',
      'Investors and leaders decide funding and priorities.',
      'Governance should fit the provider’s markets and business models.',
    ],
    chapterRecap: 'Regulators and wider stakeholders shape the conditions under which enterprise technology businesses operate. Effective governance, investment discipline, and continued skills development help providers adapt to industry change and build sustainable capabilities.',
    deepDiveTitle: 'Why capital and compliance pull in different directions',
    body: <EntDeepDive paragraphs={[
      'Investors may want fast growth, while compliance and skills development take time and money before they pay back. A provider that favours short-term profit may under-invest in people and controls and pay later through incidents or fines.',
      'Governance is the practice of making that trade-off deliberately, with clear accountability.' ]} evidence="The stakeholder roles are from the supplied brief; legal details are from the Ministry of Science and Technology legal database, the Official Gazette, Regulations.AI and Luat Viet Nam summaries; the association event is from a MISA press release. The capital-versus-compliance discussion is our own reading of the brief." />,
    sources: citeEnt3('dataLawOverview', 'digitalTechLaw', 'pdplGazette', 'cyberLaw2025', 'misaPress'),
  }),
];

const quiz = entQuiz('ent-m3-l6', [
  { chapter: '1', objective: 'List supplier types', question: 'Which is an upstream supplier of the industry?', application: 'A CTO lists dependencies. Which belongs?', correct: 'Cloud infrastructure, development tools, cybersecurity suppliers or open-source communities', wrong: ['Fabric mills', 'Coffee roasters', 'Dairy farms'], explanation: 'These supply technical inputs. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain why suppliers matter', question: 'Why do upstream partners matter to downstream solutions?', application: 'A cloud outage hits a product. Whose problem is it?', correct: 'Their quality and reliability directly affect downstream performance', wrong: ['They never affect customers', 'Only advertising matters', 'Only hardware colour matters'], explanation: 'Supplier risk is product risk. Review Chapter 1.' },
  { chapter: '1', objective: 'State governance duties', question: 'What does supplier governance evaluate?', application: 'A vendor reviews a new tool. What should it check?', correct: 'Reliability, licensing, security, support quality, service levels and dependency risks', wrong: ['Only the price of lunch', 'Only the logo', 'Only office decor'], explanation: 'Governance reduces risk. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a forecast correctly', question: 'What does Gartner forecast for IaaS spending in 2026?', application: 'A slide needs the figure. What is it?', correct: 'About US$287 billion, up 29.3%, a worldwide forecast', wrong: ['A 29.3% fall', 'US$287 million', 'Vietnam-only spending'], explanation: 'It is a global forecast. Review Chapter 1.' },
  { chapter: '2', objective: 'Describe joint outcomes', question: 'Who produces enterprise technology outcomes?', application: 'A project fails after the provider delivers. What was overlooked?', correct: 'Providers and customers jointly', wrong: ['Providers alone', 'Customers alone', 'Regulators alone'], explanation: 'Outcomes are joint. Review Chapter 2.' },
  { chapter: '2', objective: 'Name delivery requirements', question: 'What does successful delivery require?', application: 'A team keeps missing handovers. What is lacking?', correct: 'Clear ownership, effective communication, user adoption and alignment with business priorities', wrong: ['Fewer meetings only', 'More logos', 'Longer documents'], explanation: 'Delivery is shared. Review Chapter 2.' },
  { chapter: '2', objective: 'Read the adoption study', question: 'What did the World Bank study show about use over time?', application: 'A vendor assumes users stay after training. What is the correction?', correct: 'Use fell from close to 80% after training to 35% about 18 months later', wrong: ['It rose steadily', 'Nobody used it', 'It stayed at 100%'], explanation: 'Adoption needs ongoing effort. Review Chapter 2.' },
  { chapter: '3', objective: 'List regulator concerns', question: 'What do regulators set requirements for?', application: 'A compliance team scopes its work. What is included?', correct: 'Privacy, cybersecurity, intellectual property, electronic transactions and sector-specific technology use', wrong: ['Only logos', 'Only weather', 'Only colours'], explanation: 'Rules shape operations. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a legal date', question: 'When does Vietnam’s Law on Cybersecurity 116/2025/QH15 take effect?', application: 'A plan needs the date. What is it?', correct: '1 July 2026', wrong: ['1 January 2010', '1 July 2036', '31 December 2020'], explanation: 'It replaces the 2018 law. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'What should be said about investment in Vietnamese enterprise software firms?', application: 'A slide shows funding totals. What is the correction?', correct: 'No public data was found in the sources reviewed, so none is shown', wrong: ['It is always US$1 billion', 'Gartner publishes it', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 3.' },
]);

export const LESSON_ENT3_6: EntM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can map the suppliers, customers, partners and institutions around an enterprise technology provider.',
    keyTakeaways: [
      'Upstream suppliers set the reliability of downstream products and services.',
      'Outcomes are produced jointly by providers, customers and delivery partners.',
      'Regulation, skills development and capital shape what providers can do.',
      'Governance should fit markets and business models.',
      'Some Vietnam data, such as supplier concentration and financing, was not found.',
    ],
    businessImplications: 'Govern suppliers and partners, plan for adoption with customers and track regulatory, skills and funding conditions.',
    remember: 'A technology business sits inside a network of suppliers, customers and institutions.',
    nextLesson: 'Back to module overview',
  },
};
