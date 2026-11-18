import { EntDeepDive, citeEnt5, entM5Chapter, entQuiz } from './entM5Core';
import type { EntM5LessonBundle } from './entM5Core';

const LESSON = '2. Technology & Innovation Trends';

const deck = [
  entM5Chapter({
    title: 'Generative AI, Agentic AI, and AI-Native Software Development', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how generative and agentic AI are changing both software products and the way software is built.',
    mateIntro: 'AI is no longer only a feature. It is starting to write code, run workflows and change who builds software.',
    keyInsight: 'Generative and agentic AI are changing enterprise software in two ways: they add new capabilities to products, and they change how software is built and supported. The value lies in supervised, governed use, not in unchecked automation.',
    statTiles: [
      { value: '6', label: 'Key uses of generative and agentic AI', subtitle: 'Assistants to AI governance', description: 'Generative AI applications, agentic workflow automation, AI-native development, domain-specific models, human-in-the-loop systems and AI governance.' },
      { value: 'US$29B', label: 'Forecast worldwide spending on AI agents and assistants in 2026', subtitle: 'Gartner, September 2026 forecast', description: 'A small segment compared with AI infrastructure and AI services.' },
      { value: '40%', label: 'Share of enterprise application portfolios predicted to include custom apps built on AI-native platforms by 2030', subtitle: 'Gartner prediction, up from 2% in 2025', description: 'An analyst prediction, not a measurement.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other two figures are analyst forecasts and predictions about the global market and are not Vietnam figures or measured outcomes.',
    narrative: [
      { label: 'What it is', text: 'Generative AI creates text, code, summaries and analysis from instructions. Agentic AI goes further by planning and carrying out several steps of a task, often across systems. AI-native development uses these tools throughout the software life cycle, from writing and testing code to documenting and maintaining it.' },
      { label: 'Why it is happening', text: 'Vendors are embedding agentic AI in existing enterprise products, and development teams are adopting coding assistants because they can shorten routine work. Gartner lists AI-native development platforms and multiagent systems among its 2026 strategic technology trends and predicts that by 2030, 80% of organisations will turn large software engineering teams into smaller AI-augmented teams. Because agents can act, not only answer, buyers also worry about permissions, errors and accountability.' },
      { label: 'Real-world example', text: 'Generative AI assistants appear in document management, customer service, analytics and enterprise knowledge systems; AI agents coordinate multistep tasks such as invoice processing, IT incident handling or sales administration; coding assistants, automated testing and code generation speed software development; domain-specific models are tailored to finance, manufacturing, healthcare or legal services; humans review sensitive decisions, exceptions and high-consequence activities; and governance controls cover model access, data use, output validation, auditability and agent permissions.' },
      { label: 'Vietnam example', text: 'VietnamPlus reports that CMC is training a 72-billion-parameter language model, that VNPT is deploying generative AI platforms at 30 administrative units, and that MISA is integrating AI agents for more than 170,000 enterprises; these are press reports of company statements. FPT reports an 8.2% productivity gain from its AI-first strategy, a company claim. No independent measurement of productivity gains from AI-native development in Vietnam was found.' },
      { label: 'Business impact', text: 'Generative and agentic AI can raise productivity and open new service offers, but they also raise new questions about quality, security and accountability. Providers should automate useful workflows while keeping human oversight, security and reliable performance.' },
    ],
    visualKind: 'ent-m5-21-ai-native', visualHeading: 'Six uses of generative and agentic AI',
    visualIntro: 'Explore the six uses branching from AI embedded in enterprise software.',
    imageAlt: 'Casemate tree mind map of six uses of generative and agentic AI in enterprise software',
    keyTerms: [
      { term: 'Generative AI', definition: 'AI that produces new content such as text, code or images from instructions.' },
      { term: 'Agentic AI', definition: 'AI that plans and carries out multistep tasks with some autonomy.' },
      { term: 'AI-native development', definition: 'Building software with AI tools used throughout design, coding, testing and maintenance.' },
      { term: 'Human-in-the-loop', definition: 'A design where people review or approve important AI outputs and actions.' },
    ],
    recap: [
      'AI both adds product features and changes how software is built.',
      'Agents can act across systems, so permissions and oversight matter.',
      'Domain-specific models fit regulated or specialised sectors.',
      'Governance keeps automation safe and auditable.',
    ],
    chapterRecap: 'Generative and agentic AI can raise productivity and open new service offers, but they also raise new questions about quality, security and accountability. Providers should automate useful workflows while keeping human oversight, security and reliable performance.',
    deepDiveTitle: 'Why agents need permissions, not only intelligence',
    body: <EntDeepDive paragraphs={[
      'An assistant that drafts text can be corrected before anyone relies on it. An agent that processes invoices or changes records acts directly, so a mistake can spread through connected systems.',
      'That is why the list of AI uses ends with human review and governance: they decide how far an agent may act on its own.' ]} evidence="The six uses are the content of the chapter’s activity list; the forecast is from Gartner’s September 2026 press release; the 2030 predictions are from Gartner’s 2026 strategic trends document; the Vietnamese items are from VietnamPlus and FPT’s annual report. The comment on permissions is our own reasoning." />,
    sources: citeEnt5('gartnerAi', 'gartnerTrends2026', 'vietnamplusIct', 'fptGlobalIt2025', 'deloitteSaas'),
  }),
  entM5Chapter({
    title: 'Cloud-Native Architecture, Hybrid Cloud, and Edge Computing', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why enterprises are moving toward a mix of cloud, private infrastructure and edge computing.',
    mateIntro: 'Cloud is not one place. Enterprises place each workload where cost, speed, control and regulation fit best.',
    keyInsight: 'Enterprise architecture is moving toward a deliberate mix of cloud-native applications, hybrid cloud and edge computing. The goal is not to move everything to the public cloud but to place each workload where it best balances scale, cost, latency, control and compliance.',
    statTiles: [
      { value: '6', label: 'Key architecture activities', subtitle: 'Cloud-native to workload placement', description: 'Cloud-native design, containers and microservices, hybrid deployment, edge computing, modernisation of legacy systems, and cloud cost and workload management.' },
      { value: '+29.3%', label: 'Forecast growth in worldwide spending on infrastructure as a service in 2026', subtitle: 'Gartner, July 2026 forecast', description: 'About US$287 billion.' },
      { value: '70%', label: 'Share of private enterprises targeted to use cloud by 2030', subtitle: 'Decision 1121/QD-TTg, a policy target', description: 'The target also covers all government agencies and state enterprises.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The first figure is a global forecast and the second is a Vietnamese policy target, so neither describes current Vietnamese cloud use.',
    narrative: [
      { label: 'What it is', text: 'Cloud-native applications are designed to run in cloud environments using parts such as containers and microservices, so they can be updated and scaled in pieces. Hybrid cloud combines public cloud, private cloud and on-premises systems, and edge computing processes data close to where it is created, such as in a factory or a branch.' },
      { label: 'Why it is happening', text: 'Different workloads need different things. Variable demand suits public cloud, sensitive data may need private control, and some operations need very fast local processing. Many organisations also still depend on older applications that cannot be rebuilt quickly, and the rising cost of AI infrastructure makes workload placement and cost management a board-level issue.' },
      { label: 'Real-world example', text: 'Providers design applications for cloud environments so that they can be updated and scaled in smaller parts; use containers and microservices to break large applications into independent services; combine public cloud, private cloud and on-premises systems in hybrid deployments; process data at the edge where low latency matters; modernise legacy systems step by step instead of replacing them at once; and manage cloud cost and workload placement as an ongoing discipline.' },
      { label: 'Vietnam example', text: 'Decision 1121/QD-TTg sets a 2030 target for cloud use by all government agencies and state enterprises, 70% of private enterprises and over 50% of the population, with services from domestic companies. Mordor Intelligence estimates Vietnam’s cloud and platform services growing 11.86% a year. The Deputy Prime Minister was reported as saying domestic providers hold only about 20% of the domestic cloud market, and VietnamPlus reports CMC completing CMC Cloud. These are a policy target, a third-party estimate, an official statement as reported and a press report. No public data on Vietnamese edge computing or hybrid deployments was found.' },
      { label: 'Business impact', text: 'The direction is a suitable mix of cloud, private infrastructure and edge, not universal public-cloud migration. Providers that can design, migrate and run hybrid environments, and control their cost, are well placed to help customers modernise.' },
    ],
    visualKind: 'ent-m5-22-hybrid', visualHeading: 'Where different workloads tend to sit',
    visualIntro: 'Read the matrix as reasoning about workloads, not as measured data.',
    imageAlt: 'Casemate matrix placing public cloud, hybrid cloud, private cloud, edge computing and on-premises by data sensitivity and elastic scale',
    keyTerms: [
      { term: 'Cloud-native', definition: 'Designed to run in cloud environments in small, independently updated parts.' },
      { term: 'Hybrid cloud', definition: 'A mix of public cloud, private cloud and on-premises systems.' },
      { term: 'Edge computing', definition: 'Processing data close to where it is generated instead of in a distant data centre.' },
      { term: 'Legacy system', definition: 'An older system that is still important to operations but hard to change.' },
    ],
    recap: [
      'Cloud-native design allows parts of an application to change and scale separately.',
      'Workloads are placed by sensitivity, latency, scale, cost and regulation.',
      'Legacy systems are modernised in steps, not always replaced.',
      'Cost and placement need continuous management.',
    ],
    chapterRecap: 'The direction is a suitable mix of cloud, private infrastructure and edge, not universal public-cloud migration. Providers that can design, migrate and run hybrid environments, and control their cost, are well placed to help customers modernise.',
    deepDiveTitle: 'Why the matrix is reasoning, not data',
    body: <EntDeepDive paragraphs={[
      'The positions in the matrix show a way to think: sensitive or latency-critical workloads lean toward private or edge, while variable demand leans toward public cloud. Real choices also depend on legacy applications, regulation and price.',
      'Two companies in the same sector may place the same workload differently, and both can be reasonable.' ]} evidence="The architecture activities are the content of the chapter’s activity list; the infrastructure forecast is from Gartner’s July 2026 release; the targets are from Government news and legal texts; the market growth rate is from Mordor Intelligence; the statement on cloud share is from a press report. The matrix positions are our own illustration." />,
    sources: citeEnt5('gartnerJuly2026', 'vietnamCloudProgram', 'mordorVietnamIt', 'cmcGrowth', 'vietnamplusIct'),
  }),
  entM5Chapter({
    title: 'Cybersecurity, Data Intelligence, and Digital Trust', chapterTitle: LESSON, readingTime: '7',
    objective: 'Describe how security, data governance and AI safeguards combine into digital trust.',
    mateIntro: 'When systems run on data and AI, trust becomes part of the product. Customers choose providers they can believe.',
    keyInsight: 'Cybersecurity and data governance are moving from supporting functions to core purchase criteria. Digital trust, meaning confidence in how systems, data and AI are secured and used, is becoming a source of competitive advantage.',
    statTiles: [
      { value: '6', label: 'Key digital-trust activities', subtitle: 'Zero trust to confidential computing', description: 'Zero-trust security, AI security, preemptive threat detection, data governance, digital provenance and confidential computing.' },
      { value: 'US$51B', label: 'Forecast worldwide spending on AI cybersecurity in 2026, up from US$26B', subtitle: 'Gartner, September 2026 forecast', description: 'A segment of the wider AI spending forecast.' },
      { value: '4 hours', label: 'Target for restoring essential services after an incident', subtitle: 'National Data Strategy, Decision 1308/QD-TTg', description: 'A policy target, not a measured result.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The forecast is global and the restoration time is a Vietnamese policy target, so neither shows how secure current systems are.',
    narrative: [
      { label: 'What it is', text: 'Digital trust is the confidence that customers, partners and regulators place in how an organisation secures systems, governs data and uses AI. It combines technical controls, such as access verification and monitoring, with governance, such as rules on who may use which data and for what purpose.' },
      { label: 'Why it is happening', text: 'More business processes now run on cloud services, shared data and AI agents, which widens the surface that can be attacked or misused. Vietnam has also strengthened its legal framework for data and cybersecurity, so providers are expected to show compliance as well as capability. As a result, security and data governance appear in procurement checklists from the start.' },
      { label: 'Real-world example', text: 'Zero-trust security verifies users, devices and access requests instead of relying on network location; AI security monitors AI applications and agents, restricts permissions and guards against leakage and misuse; preemptive threat detection uses analytics and automated monitoring to spot suspicious behaviour early; data governance sets rules for ownership, quality, access, retention and responsible use; digital provenance tracks the origin and integrity of software components, datasets and AI-generated content; and confidential computing protects sensitive information while it is being processed.' },
      { label: 'Vietnam example', text: 'The Personal Data Protection Law (91/2025/QH15) took effect on 1 January 2026 with fines of up to VND 3 billion for most violations, and the Law on Cybersecurity (116/2025/QH15) takes effect on 1 July 2026. The National Data Strategy sets a four-hour target for restoring essential services. FPT lists cybersecurity among its technology services, a company report, and Mordor Intelligence lists fragmented data-privacy rules among factors that temper growth. No public Vietnam-wide data on security incidents or the size of the security services market was found.' },
      { label: 'Business impact', text: 'Security and trust capabilities are both risk controls and differentiators in enterprise procurement. Providers that can demonstrate strong security, clear data governance and safe AI use are better placed to win regulated and data-sensitive customers.' },
    ],
    visualKind: 'ent-m5-23-trust', visualHeading: 'Six building blocks of digital trust',
    visualIntro: 'Explore the six building blocks orbiting the idea of digital trust.',
    imageAlt: 'Casemate orbit mind map of six building blocks of digital trust',
    keyTerms: [
      { term: 'Zero trust', definition: 'A security approach that verifies every user, device and request rather than trusting a network location.' },
      { term: 'Data governance', definition: 'Rules and responsibilities for how data is owned, accessed, kept and used.' },
      { term: 'Provenance', definition: 'A record of where software, data or content came from and whether it was altered.' },
      { term: 'Confidential computing', definition: 'Protecting data while it is being processed, using hardware and software controls.' },
    ],
    recap: [
      'Digital trust combines security, data governance and safe AI use.',
      'More cloud, data and AI widens the surface that must be protected.',
      'Vietnamese laws on data and cybersecurity add compliance duties.',
      'Trust capabilities can win customers, not only reduce risk.',
    ],
    chapterRecap: 'Security and trust capabilities are both risk controls and differentiators in enterprise procurement. Providers that can demonstrate strong security, clear data governance and safe AI use are better placed to win regulated and data-sensitive customers.',
    deepDiveTitle: 'Why security is now a sales topic',
    body: <EntDeepDive paragraphs={[
      'A buyer cannot easily test a vendor’s security before signing, so it relies on certifications, references and clear documentation. Providers that prepare this evidence early shorten the buying process.',
      'Security teams are also involved earlier, which means a weak answer can end a deal before the business case is even discussed.' ]} evidence="The six activities are the content of the chapter’s activity list; the forecast is from Gartner’s September 2026 release; the data target is from Viet Nam News reporting Decision 1308/QD-TTg; the laws are from the Official Gazette and Luat Viet Nam; the company and market comments are from FPT’s report and Mordor Intelligence. The comment on how buyers judge security is our own reasoning." />,
    sources: citeEnt5('gartnerAi', 'vnDataStrategy', 'pdplGazette', 'cyberLaw2025', 'dataLawOverview', 'fptTechnology2025', 'mordorVietnamIt'),
  }),
];

const quiz = entQuiz('ent-m5-l2', [
  { chapter: '1', objective: 'Define agentic AI', question: 'What distinguishes agentic AI from a simple generative assistant?', application: 'A tool plans and completes an invoice-processing task across systems. What is it?', correct: 'It plans and carries out multistep tasks with some autonomy', wrong: ['It only stores files', 'It only prints reports', 'It replaces all staff'], explanation: 'Agents act. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a prediction correctly', question: 'How should Gartner’s 40% figure for AI-native custom applications be described?', application: 'A slide states it as a 2026 measurement. What is the correction?', correct: 'As an analyst prediction for 2030, up from 2% in 2025', wrong: ['As audited Vietnam revenue', 'As a legal requirement', 'As a 2024 census'], explanation: 'It is a prediction. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe oversight', question: 'Why include human-in-the-loop design for AI?', application: 'An agent could change financial records. What safeguard applies?', correct: 'Humans review sensitive decisions, exceptions and high-consequence activities', wrong: ['Nothing needs review', 'Only logos need review', 'Review slows AI so it is never used'], explanation: 'Oversight controls risk. Review Chapter 1.' },
  { chapter: '1', objective: 'Use evidence honestly', question: 'What should be said about independent measurement of productivity gains from AI-native development in Vietnam?', application: 'A slide claims a proven national productivity gain. What is the correction?', correct: 'No independent measurement was found, and FPT’s 8.2% is a company claim', wrong: ['The Ministry measures it monthly', 'Gartner publishes it for Vietnam', 'It is set by law'], explanation: 'Label claims. Review Chapter 1.' },
  { chapter: '2', objective: 'Define hybrid cloud', question: 'What is hybrid cloud?', application: 'A firm keeps sensitive data on its own servers and runs analytics in public cloud. What is it using?', correct: 'A mix of public cloud, private cloud and on-premises systems', wrong: ['Only public cloud', 'Only edge devices', 'Only paper records'], explanation: 'Hybrid mixes environments. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain edge computing', question: 'When is edge computing useful?', application: 'A factory needs a response in milliseconds. What does it need?', correct: 'When data must be processed close to where it is created, for low latency', wrong: ['When data should never be processed', 'When there is no network', 'Only for accounting'], explanation: 'Edge reduces latency. Review Chapter 2.' },
  { chapter: '2', objective: 'Classify a policy figure', question: 'How should the 70% cloud figure in Decision 1121/QD-TTg be described?', application: 'A slide says 70% of private firms already use cloud. What is the correction?', correct: 'As a 2030 policy target, not a current measurement', wrong: ['As audited 2025 usage', 'As a Gartner forecast', 'As a tax rate'], explanation: 'Targets are not outcomes. Review Chapter 2.' },
  { chapter: '3', objective: 'Define digital trust', question: 'What is digital trust?', application: 'A customer asks why it should trust a provider with its data and AI. What answers it?', correct: 'Confidence in how systems, data and AI are secured and used', wrong: ['A brand slogan', 'A payment method', 'A type of hardware'], explanation: 'Trust combines controls and governance. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe zero trust', question: 'What does zero-trust security do?', application: 'A user logs in from inside the office network. How does zero trust treat them?', correct: 'It verifies users, devices and access requests instead of relying on network location', wrong: ['It trusts everyone inside the network', 'It removes all passwords', 'It stores data in public'], explanation: 'Verify every request. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a legal change', question: 'Which Vietnamese law takes effect on 1 July 2026 and replaces the 2018 cybersecurity law?', application: 'A provider updates its compliance plan. Which law applies from that date?', correct: 'The Law on Cybersecurity, No. 116/2025/QH15', wrong: ['The Law on Commercial Banking', 'The Law on Dairy Products', 'The Law on Public Holidays'], explanation: 'Check the effective dates. Review Chapter 3.' },
]);

export const LESSON_ENT5_2: EntM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how generative and agentic AI change software, why hybrid architectures are replacing a single cloud model, and how digital trust is becoming a purchase criterion.',
    keyTakeaways: [
      'AI adds product features and changes how software is built, supported and governed.',
      'Agents act across systems, so permissions and human oversight matter.',
      'Cloud-native, hybrid and edge are placed by workload needs, not by one rule.',
      'Security, data governance and safe AI use form digital trust and can win customers.',
      'Forecasts, predictions, policy targets and company claims are labelled in this module.',
    ],
    businessImplications: 'Automate useful workflows under human oversight, design for a mixed environment and treat trust as part of the product.',
    remember: 'Technology choices follow workload needs, and trust follows evidence.',
    nextLesson: 'Market & Channel Trends',
  },
};
