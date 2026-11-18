import { EntDeepDive, citeEnt, entM2Chapter, entQuiz } from './entM2Core';
import type { EntM2LessonBundle } from './entM2Core';

const LESSON = '2. Upstream Activities';

const deck = [
  entM2Chapter({
    title: 'Talent, Knowledge, and Research Inputs', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why talent and knowledge are the most important upstream inputs and how providers build them.',
    mateIntro: 'In this industry the factory floor is a team of people. Their skills decide what can be built and how fast.',
    keyInsight: 'Talent quality and technical knowledge influence the productivity of the entire value chain. Shortages of specialized skills can increase delivery costs, delay projects, and limit the ability to serve complex customer needs.',
    statTiles: [
      { value: '5', label: 'Key upstream activities', subtitle: 'Recruitment to knowledge management', description: 'Technical recruitment, skills development, research, domain knowledge and knowledge management.' },
      { value: '530K', label: 'Estimated Vietnam IT workforce', subtitle: 'TopDev via VnEconomy', description: 'With a forecast annual shortage of 150,000–200,000 tech workers.' },
      { value: '~30%', label: 'Share of IT graduates reported as job-ready', subtitle: 'Viet Nam News and VnEconomy', description: 'Of roughly 50,000 IT graduates a year.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Workforce figures are recruiter and broker estimates reported by news outlets, and sources differ.',
    narrative: [
      { label: 'What it is', text: 'Human capital is one of the most important upstream inputs in Enterprise Software & IT Services. Software engineers, solution architects, data scientists, cybersecurity specialists, business analysts, and domain experts provide the knowledge required to design, develop, and operate technology solutions.' },
      { label: 'Why it is happening', text: 'Research and capability development also shape the quality of industry inputs. Providers invest in technical training, experimentation, open-source communities, engineering practices, and partnerships with universities or technology vendors to maintain relevant skills as platforms and customer requirements evolve.' },
      { label: 'Real-world example', text: 'Providers recruit software developers, cloud engineers, cybersecurity specialists, consultants and data professionals; train employees in programming languages, enterprise platforms, cloud architecture, AI and security; test emerging technologies, frameworks and reusable approaches; build expertise in banking, manufacturing, healthcare, retail and logistics; and document technical standards, reusable solutions, lessons learned and implementation practice.' },
      { label: 'Vietnam example', text: 'VnEconomy, citing a TopDev report, estimates an IT workforce of 530,000 and a shortage of 150,000 to 200,000 tech workers a year. Viet Nam News, citing An Binh Securities, reports demand for 700,000 IT workers by end-2025 against about 500,000 qualified candidates, and about 50,000 IT graduates a year of whom around 30% are job-ready. Mordor Intelligence lists talent shortages among the constraints on IT services growth, and Law 71/2025/QH15 on the Digital Technology Industry, in force from 1 January 2026, covers human resources and incentives. No public data on training spend or Vietnamese provider salary levels was found.' },
      { label: 'Business impact', text: 'Talent, research, and knowledge provide the intellectual foundation for software and service delivery. Continuous capability development is necessary to sustain productivity and adapt to changing technology requirements.' },
    ],
    visualKind: 'ent-m2-21-talent', visualHeading: 'Five ways to build talent and knowledge',
    visualIntro: 'Explore the five activities around the centre and what each builds.',
    imageAlt: 'Casemate mind map of five activities that build talent and knowledge in enterprise software and IT services',
    keyTerms: [
      { term: 'Human capital', definition: 'The skills, knowledge and experience of a company’s people.' },
      { term: 'Solution architect', definition: 'A specialist who designs how applications, data and infrastructure fit together.' },
      { term: 'Open source', definition: 'Software whose code is shared publicly for others to use and improve.' },
      { term: 'Domain knowledge', definition: 'Understanding of a customer’s industry, such as banking or manufacturing.' },
    ],
    recap: [
      'People and their knowledge are the most important upstream input.',
      'Providers recruit, train, experiment and document what they learn.',
      'Shortages raise cost, delay projects and limit complex work.',
      'Capability must keep pace with changing platforms.',
    ],
    chapterRecap: 'Talent, research, and knowledge provide the intellectual foundation for software and service delivery. Continuous capability development is necessary to sustain productivity and adapt to changing technology requirements.',
    deepDiveTitle: 'Why graduate numbers and job-ready numbers differ',
    body: <EntDeepDive paragraphs={[
      'A large number of graduates does not mean a large number of people who can start work on enterprise projects. If only about 30% are job-ready, employers must spend time and money on further training before new staff are productive.',
      'That hidden cost is one reason shortage estimates differ: some count all qualified candidates and others count those ready to work.' ]} evidence="Workforce figures are from Viet Nam News (An Binh Securities) and VnEconomy (TopDev); the constraint is from Mordor Intelligence; the law is from the Ministry of Science and Technology legal database. The explanation of why estimates differ is our own reading." />,
    sources: citeEnt('vneconomyTalent', 'vietnamnewsItWorkforce', 'mordorVietnamIt', 'digitalTechLaw'),
  }),
  entM2Chapter({
    title: 'Technology Infrastructure, Tools, and Software Components', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the technology foundations providers build on and the risks that dependencies create.',
    mateIntro: 'Nobody writes everything from scratch. Providers stand on clouds, tools and libraries built by others, and that is both a speed-up and a risk.',
    keyInsight: 'Reusable technology foundations reduce development effort, but dependency management is essential. Providers must balance speed and cost efficiency with security, maintainability, interoperability, and control over critical systems.',
    statTiles: [
      { value: '5', label: 'Key upstream activities', subtitle: 'Cloud resources to vendor management', description: 'Cloud resources, development toolchains, reusable components, security foundations and vendor management.' },
      { value: '+29.3%', label: 'Forecast growth in worldwide IaaS spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$287 billion, for rented cloud infrastructure.' },
      { value: '+62.5%', label: 'Forecast growth in worldwide data center systems spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$822 billion, the fastest-growing category.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The growth rates are Gartner worldwide forecasts for broad categories, not figures for any one provider or for Vietnam.',
    narrative: [
      { label: 'What it is', text: 'Upstream technology inputs include cloud infrastructure, computing resources, databases, operating systems, development environments, APIs, middleware, security tools, and software libraries. These components allow providers to build applications and deliver services without creating every technical capability from the ground up.' },
      { label: 'Why it is happening', text: 'Many providers depend on third-party platforms and open-source components. Such dependencies can accelerate development and improve interoperability, but they also introduce licensing, compatibility, availability, cybersecurity, and vendor-concentration risks.' },
      { label: 'Real-world example', text: 'Providers procure virtual machines, storage, networking and managed computing services; use code repositories, integrated development environments, testing frameworks and continuous integration tools; adopt APIs, libraries, frameworks, middleware and open-source packages; integrate identity management, encryption, vulnerability scanning and software supply-chain controls; and evaluate third-party contracts, licences, platform compatibility and dependency risks.' },
      { label: 'Vietnam example', text: 'FPT lists FPT AI Factory, cybersecurity and semiconductor chip design among its technology-sector services, a company report that shows a Vietnamese group investing in its own foundations. The 2025–30 national cloud programme (Decision 1121/QD-TTg) targets cloud use by all government agencies and state enterprises with services from domestic providers, which is a policy target. Mordor Intelligence names submarine-cable outages and fragmented data-privacy rules among the factors that temper growth in Vietnam. No public data was found on open-source dependence, licence exposure or vendor concentration among Vietnamese providers.' },
      { label: 'Business impact', text: 'Infrastructure and software components provide the technical foundation for product development and service delivery. Effective procurement and dependency management help improve efficiency while reducing technology and security risks.' },
    ],
    visualKind: 'ent-m2-22-infrastructure', visualHeading: 'Five layers of technology foundations',
    visualIntro: 'Read the five layers from cloud resources at the base up to vendor and licence management.',
    imageAlt: 'Casemate pyramid of five layers of technology infrastructure, tools and software components',
    keyTerms: [
      { term: 'Middleware', definition: 'Software that sits between applications and lets them work together.' },
      { term: 'Software supply chain', definition: 'The code, libraries and tools from other parties that a product is built from.' },
      { term: 'Vendor concentration', definition: 'Reliance on one or a few suppliers for critical technology.' },
      { term: 'Continuous integration', definition: 'Automatically building and testing code changes as they are made.' },
    ],
    recap: [
      'Cloud, tools, components and security are the technical foundations.',
      'Reuse speeds development and improves interoperability.',
      'Dependencies bring licensing, security, availability and concentration risks.',
      'Procurement and dependency management protect efficiency and control.',
    ],
    chapterRecap: 'Infrastructure and software components provide the technical foundation for product development and service delivery. Effective procurement and dependency management help improve efficiency while reducing technology and security risks.',
    deepDiveTitle: 'Why speed from reuse comes with a duty to track dependencies',
    body: <EntDeepDive paragraphs={[
      'A library that saves months of work may also carry a vulnerability, a restrictive licence or a maintainer who stops supporting it. If the provider has not recorded where each component is used, finding and fixing the problem is slow.',
      'Software supply-chain controls and licence reviews turn that hidden risk into something that can be managed.' ]} evidence="The input categories and risks are from the supplied brief; the spending forecasts are from Gartner’s July 2026 press release; FPT’s services are from its annual report; the cloud programme is from the Vietnam Government news portal; the constraints are from Mordor Intelligence. The example of a vulnerable library is our own illustration." />,
    sources: citeEnt('gartnerJuly2026', 'fptTechnology2025', 'vietnamCloudProgram', 'mordorVietnamIt'),
  }),
  entM2Chapter({
    title: 'Third-Party Platforms, Vendors, and Strategic Partnerships', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain what partnerships add to a provider and the dependencies they can create.',
    mateIntro: 'A partner can open a market overnight. It can also hold the keys to your customers if you are not careful.',
    keyInsight: 'Partnerships expand capability and market access, but they require deliberate ecosystem management. Providers need to understand where partners create differentiated value and where dependence could weaken their commercial position.',
    statTiles: [
      { value: '5', label: 'Key upstream activities', subtitle: 'Alliances to partner risk', description: 'Technology alliances, implementation certification, channel partnerships, joint solutions and partner risk management.' },
      { value: '1997', label: 'Year FPT formed an Oracle alliance', subtitle: 'FPT milestones, company account', description: 'One of several early partnerships in its history.' },
      { value: '1989–95', label: 'Years FPT distributed Olivetti, IBM and Compaq hardware', subtitle: 'FPT milestones, company account', description: 'Distribution partnerships that preceded its software exports.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The dates come from FPT’s own milestones page and describe one company’s history.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software providers often rely on external technology ecosystems to reach customers and extend product functionality. Cloud providers, enterprise platform vendors, cybersecurity companies, telecommunications operators, distributors, and specialist consultancies may all contribute to a final solution.' },
      { label: 'Why it is happening', text: 'Strategic partnerships can provide access to certified technologies, implementation expertise, customer networks, and international markets. However, they may also introduce partner dependency, revenue-sharing arrangements, competing commercial priorities, and restrictions on how products or services can be delivered.' },
      { label: 'Real-world example', text: 'Providers join cloud, ERP, CRM, cybersecurity or data-platform partner programmes; obtain certifications that show expertise in specific platforms; work with resellers, distributors and consulting firms to reach new segments; combine software, infrastructure and specialist services into joint offerings; and assess contract terms, service dependencies, technical compatibility and customer ownership.' },
      { label: 'Vietnam example', text: 'FPT’s milestones page records distribution partnerships with Olivetti, IBM and Compaq in 1989–95 and an Oracle alliance in 1997, a company account of partnership-led growth before it became a software exporter. Vietnam Briefing, repeating Mordor Intelligence, links growth to nearshore outsourcing demand from Japan and the United States, and VINASA says a lack of local offices abroad limits trust-building with overseas clients. No public data on partner certification counts or revenue-sharing terms among Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Third-party ecosystems enable providers to deliver broader solutions and reach more customers. Long-term success depends on selecting suitable partners, managing dependencies, and retaining valuable proprietary capabilities.' },
    ],
    visualKind: 'ent-m2-23-partners', visualHeading: 'What partnerships add and what they risk',
    visualIntro: 'Compare the benefits of partnering with the risks it creates, row by row.',
    imageAlt: 'Casemate comparison of what strategic partnerships add and what they put at risk',
    keyTerms: [
      { term: 'Partner programme', definition: 'A vendor’s structured scheme for working with implementers, resellers and technology partners.' },
      { term: 'Certification', definition: 'Formal proof that a firm or its staff can implement a specific platform.' },
      { term: 'Channel partner', definition: 'A firm that sells or implements a vendor’s products to reach customers.' },
      { term: 'Partner dependency', definition: 'Reliance on a partner for capability or customer access that is hard to replace.' },
    ],
    recap: [
      'Partnerships give access to technology, expertise, customers and markets.',
      'They can create dependency, revenue sharing and delivery restrictions.',
      'Joint offerings combine software, infrastructure and services.',
      'Providers should keep the capabilities that differentiate them.',
    ],
    chapterRecap: 'Third-party ecosystems enable providers to deliver broader solutions and reach more customers. Long-term success depends on selecting suitable partners, managing dependencies, and retaining valuable proprietary capabilities.',
    deepDiveTitle: 'Deciding which capabilities to keep in-house',
    body: <EntDeepDive paragraphs={[
      'A partner is most useful where it adds something the provider cannot easily build, such as a certified platform skill or access to a customer network. It is risky where the partner controls the customer relationship or the roadmap.',
      'A simple test is to ask which capabilities customers would miss most if the partner left, and keep those close.' ]} evidence="Partnership benefits and risks are from the supplied brief; FPT dates are from its own milestones page; the nearshore comment is from Vietnam Briefing; the trust point is from VINASA via VnEconomy. The keep-what-matters test is our own suggestion." />,
    sources: citeEnt('fptMilestones', 'fptHistory', 'vietnamBriefingIt', 'vneconomyVinasa'),
  }),
];

const quiz = entQuiz('ent-m2-l2', [
  { chapter: '1', objective: 'Name the key input', question: 'Which upstream input is described as one of the most important?', application: 'A manager ranks inputs. Which comes first?', correct: 'Human capital: engineers, architects, analysts and domain experts', wrong: ['Office furniture', 'Printed manuals', 'Brand colours'], explanation: 'Knowledge drives delivery. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain the effect of shortages', question: 'What can shortages of specialised skills cause?', application: 'A project is delayed for lack of cloud engineers. What is the broader effect?', correct: 'Higher delivery costs, delays and limits on serving complex needs', wrong: ['Lower costs', 'Faster projects', 'No effect'], explanation: 'Skills shape productivity. Review Chapter 1.' },
  { chapter: '1', objective: 'Read estimates carefully', question: 'How should Vietnam workforce shortage figures be treated?', application: 'A slide calls 700,000 an official statistic. What is wrong?', correct: 'As recruiter and broker estimates reported by news outlets that differ between sources', wrong: ['As census counts', 'As Gartner forecasts', 'As exact numbers'], explanation: 'Sources differ. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall job readiness', question: 'About what share of IT graduates are reported as job-ready?', application: 'A hiring plan needs a planning figure. What is it?', correct: 'About 30%', wrong: ['About 3%', 'About 100%', 'About 0%'], explanation: 'Training lags demand. Review Chapter 1.' },
  { chapter: '2', objective: 'List foundations', question: 'Which is part of the upstream technology foundation?', application: 'A CTO lists inputs. Which belongs?', correct: 'Cloud infrastructure, databases, development tools and security components', wrong: ['Shop fittings', 'Paper contracts only', 'Fashion fabrics'], explanation: 'These are named inputs. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe dependency risk', question: 'What risks can third-party and open-source dependencies introduce?', application: 'A firm adopts a library without a licence review. What could go wrong?', correct: 'Licensing, compatibility, availability, cybersecurity and vendor-concentration risks', wrong: ['None at all', 'Only lower costs', 'Only faster coding'], explanation: 'Reuse brings risk. Review Chapter 2.' },
  { chapter: '2', objective: 'Read a forecast correctly', question: 'What does Gartner forecast for IaaS spending in 2026?', application: 'A slide needs the figure. What is it?', correct: 'About +29.3% to roughly US$287 billion, a worldwide forecast', wrong: ['A 29.3% fall', 'US$287 million', 'Vietnam-only spending'], explanation: 'It is a global forecast. Review Chapter 2.' },
  { chapter: '3', objective: 'State the trade-off', question: 'What do partnerships expand, and what do they require?', application: 'A firm joins a platform vendor’s programme. What must it do?', correct: 'They expand capability and market access, but require deliberate ecosystem management', wrong: ['They remove all risk', 'They require no contracts', 'They replace engineers'], explanation: 'Manage dependence. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a Vietnam example', question: 'When did FPT form an alliance with Oracle, according to its own milestones?', application: 'A timeline needs a date. What is it?', correct: '1997', wrong: ['1597', '2047', '1897'], explanation: 'It is a company account. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'What should be said about partner revenue-sharing terms in Vietnam?', application: 'A slide quotes typical splits. What is the correction?', correct: 'No public data was found, so none is shown', wrong: ['They are always 50%', 'They are set by Gartner', 'They are banned'], explanation: 'State evidence gaps. Review Chapter 3.' },
]);

export const LESSON_ENT2_2: EntM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain why talent, technology foundations and partnerships are the upstream inputs and how to manage their risks.',
    keyTakeaways: [
      'Talent and knowledge set the productivity of the whole chain.',
      'Reusable foundations speed development but create dependencies.',
      'Dependency management protects security, maintainability and control.',
      'Partnerships add capability and reach but can weaken commercial position.',
      'Vietnam workforce figures are estimates, and some partnership data was not found.',
    ],
    businessImplications: 'Invest in skills, track every dependency and choose partners deliberately while retaining differentiating capabilities.',
    remember: 'Everything downstream rests on the quality of the upstream inputs.',
    nextLesson: 'Delivery, Infrastructure & Operations',
  },
};
