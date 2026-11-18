import { EntDeepDive, citeEnt5, entM5Chapter, entQuiz } from './entM5Core';
import type { EntM5LessonBundle } from './entM5Core';

const LESSON = '4. Regulatory & Sustainability Trends';

const deck = [
  entM5Chapter({
    title: 'Data Protection, Cybersecurity, and AI Governance', chapterTitle: LESSON, readingTime: '7',
    objective: 'Summarise the Vietnamese legal texts that now shape how providers handle data, security and AI.',
    mateIntro: 'Five laws now sit behind most enterprise technology deals in Vietnam. Knowing their dates is part of the job.',
    keyInsight: 'Data protection, cybersecurity and AI rules are becoming a permanent part of enterprise technology delivery. Compliance is not a one-off checklist but an ongoing capability that affects product design, hosting, contracts and the way AI is deployed.',
    statTiles: [
      { value: '6', label: 'Key compliance activities', subtitle: 'Data mapping to governance and audit', description: 'Mapping and classifying data, security by design, access and incident controls, contract and vendor terms, AI risk classification and oversight, and documentation and audit readiness.' },
      { value: '1 Mar 2026', label: 'Date Vietnam’s Law on Artificial Intelligence took effect', subtitle: 'Law 134/2025/QH15', description: 'Systems already running have 12 months to comply, or 18 months in healthcare, education and finance.' },
      { value: 'VND 3B', label: 'Maximum administrative fine for most violations of the Personal Data Protection Law', subtitle: 'Law 91/2025/QH15, effective 1 January 2026', description: 'About VND 3 billion for most violations.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The legal details come from the texts and official summaries cited, and the table lists five laws, so it does not match the six activities one for one. This is a learning summary, not legal advice.',
    narrative: [
      { label: 'What it is', text: 'Providers of software and IT services handle customer data, run systems that must stay secure, and increasingly deploy AI. Vietnamese law now addresses each of these: data in general, personal data, cybersecurity, the digital technology industry and artificial intelligence.' },
      { label: 'Why it is happening', text: 'As data and AI become central to the economy, regulators have moved from general principles to specific obligations. The Law on Artificial Intelligence takes a risk-based approach, classifying AI systems into three levels with stricter transparency, safety and accountability requirements for high-risk systems, and it states that AI is a support tool and does not replace human decision-making. Providers must therefore build compliance into products and contracts from the start.' },
      { label: 'Real-world example', text: 'Providers map and classify the data they hold; build security into design; control access and prepare incident response; reflect legal duties in customer contracts and vendor terms; classify AI systems by risk and keep human oversight where required; and keep documentation ready for audit. The legal texts include the Law on Data (60/2024/QH15, effective 1 July 2025), the Law on the Digital Technology Industry (71/2025/QH15, effective 1 January 2026, with some articles from 1 July 2025), the Personal Data Protection Law (91/2025/QH15, effective 1 January 2026), the Law on Artificial Intelligence (134/2025/QH15, effective 1 March 2026) and the Law on Cybersecurity (116/2025/QH15, effective 1 July 2026, replacing the 2018 law).' },
      { label: 'Vietnam example', text: 'The Personal Data Protection Law sets a maximum administrative fine of VND 3 billion for most violations. The Law on Artificial Intelligence gives AI systems already in operation 12 months to comply, or 18 months in healthcare, education and finance, and allows authorities to require suspension of systems that pose a risk of serious harm. Mordor Intelligence lists fragmented data-privacy rules among factors that temper IT services growth. Implementing decrees and sector rules may change details, so current texts must be checked. No public data on the cost of compliance for Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Regulation is now a design input for enterprise technology. Providers that treat compliance as an ongoing capability, and check current texts and sector rules, can reduce risk and may turn compliance expertise into a service customers will pay for.' },
    ],
    visualKind: 'ent-m5-41-law', visualHeading: 'Five Vietnamese legal texts that shape enterprise technology',
    visualIntro: 'Read across each row for the effective date and what the law means for providers.',
    imageAlt: 'Casemate table of five Vietnamese laws on data, digital technology, personal data, artificial intelligence and cybersecurity',
    keyTerms: [
      { term: 'Risk-based regulation', definition: 'Rules that become stricter as the potential harm of a system rises.' },
      { term: 'Personal data', definition: 'Information that identifies or relates to an individual person.' },
      { term: 'Compliance', definition: 'Meeting the requirements of laws, regulations and contract terms.' },
      { term: 'Audit readiness', definition: 'Keeping records so that compliance can be demonstrated on request.' },
    ],
    recap: [
      'Five Vietnamese laws cover data, digital technology, personal data, AI and cybersecurity.',
      'Effective dates differ, and some include transition periods.',
      'The AI law is risk-based and keeps humans responsible for decisions.',
      'Compliance is an ongoing capability, so current texts must be checked.',
    ],
    chapterRecap: 'Regulation is now a design input for enterprise technology. Providers that treat compliance as an ongoing capability, and check current texts and sector rules, can reduce risk and may turn compliance expertise into a service customers will pay for.',
    deepDiveTitle: 'Why transition periods matter as much as effective dates',
    body: <EntDeepDive paragraphs={[
      'The Law on Artificial Intelligence took effect on 1 March 2026, but systems already in operation have 12 months to comply, or 18 months in healthcare, education and finance. A provider working with a bank therefore has a different deadline from one working with a retailer.',
      'Reading the sector, the system type and the date together is more useful than remembering a single effective date.' ]} evidence="The compliance activities are the content of the chapter’s activity list; the AI law details are from the Government news portal and the Ministry of Science and Technology portal; the other laws are from the Official Gazette, the Ministry database, Luat Viet Nam and a secondary summary for the Law on Data. The point about reading sector and date together is our own." />,
    sources: citeEnt5('vnAiLaw', 'vnAiLawRisk', 'pdplGazette', 'cyberLaw2025', 'dataLawOverview', 'digitalTechLaw', 'mordorVietnamIt'),
  }),
  entM5Chapter({
    title: 'Vietnam’s Digital Transformation and Technology Policy Environment', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how national strategies may create demand and what providers must do to benefit.',
    mateIntro: 'A government target is not a purchase order. It is a signal about where demand may form, and providers still have to earn it.',
    keyInsight: 'Vietnam’s national strategies for digital transformation, data and cloud signal where public and private demand for technology may grow. They are policy targets, not guaranteed contracts, and providers benefit only if their offers match defined customer needs and procurement rules.',
    statTiles: [
      { value: '6', label: 'Key policy-linked areas', subtitle: 'Digital government to domestic capability', description: 'Digital government, enterprise digitalisation, data infrastructure, strategic technology development, public-sector procurement and domestic capability development.' },
      { value: '30%', label: 'Target share of GDP for the digital economy by 2030', subtitle: 'Decision 1266/QD-TTg, a policy target', description: 'The strategy was approved on 14 July 2026.' },
      { value: '500,000', label: 'Number of SMEs the strategy aims to support in digital transformation by 2030', subtitle: 'Decision 1266/QD-TTg, a policy target', description: 'Together with at least five data exchanges and 100% digitised administrative records.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are official targets for 2030, not outcomes, and the targets are not forecasts of spending or of contracts for providers.',
    narrative: [
      { label: 'What it is', text: 'Vietnam has set out national strategies that shape how government, businesses and citizens are expected to use digital technology. They cover digital government, enterprise digitalisation, data infrastructure, cloud adoption and the development of domestic technology capability.' },
      { label: 'Why it is happening', text: 'Policymakers see digital technology, data and AI as drivers of growth and national capability. The strategies therefore combine targets for public services, business adoption and domestic industry with new laws on data, cybersecurity and digital technology. The Law on Digital Transformation (148/2025/QH15) and the Law on High Technology (133/2025/QH15) are among laws a law-firm briefing lists as effective on 1 July 2026.' },
      { label: 'Real-world example', text: 'Systems for public administration, digital public services, data exchange and efficiency; help for Vietnamese businesses to adopt ERP, CRM, cloud, analytics and digital workflows; data platforms, integration capabilities and analytics aligned with national and sector priorities; capability in AI, cybersecurity, cloud computing and other priority areas; compliance with specifications, security requirements, procurement procedures and service obligations in the public sector; and skilled staff, R&D, technology partnerships and locally relevant solutions for domestic capability.' },
      { label: 'Vietnam example', text: 'Decision 1266/QD-TTg of 14 July 2026 approves the National Digital Transformation Strategy 2026–2030, with 2030 targets including a digital economy of at least 30% of GDP, support for at least 500,000 SMEs, at least five data exchanges, 100% digitised administrative records and 99% satisfaction with online public services. Decision 1308/QD-TTg of 18 July 2026 approves the National Data Strategy, with three national data centres, a national AI data repository, at least 150 Make in Vietnam AI products and 1,000 data and AI firms as targets. Decision 1121/QD-TTg sets cloud targets for 2030. These are policy targets, and no public data was found on how much of this will convert into purchases from private providers.' },
      { label: 'Business impact', text: 'Policy priorities can help providers choose where to build capability, but they do not become demand automatically. Providers should align offers with defined customer needs and policy requirements, and prepare to meet procurement and security rules.' },
    ],
    visualKind: 'ent-m5-42-policy', visualHeading: 'Six areas where policy may create demand',
    visualIntro: 'Explore the six areas orbiting the idea of policy-led demand.',
    imageAlt: 'Casemate orbit mind map of six policy-linked areas of demand for enterprise technology in Vietnam',
    keyTerms: [
      { term: 'Policy target', definition: 'A goal set by government that is not a guarantee of spending or results.' },
      { term: 'Digital government', definition: 'Public administration and services delivered and managed through digital systems.' },
      { term: 'Public procurement', definition: 'The rules and processes by which public bodies buy goods and services.' },
      { term: 'Data exchange', definition: 'A platform or arrangement through which organisations share or trade data under agreed rules.' },
    ],
    recap: [
      'National strategies point to where demand may form.',
      'Targets are goals, not guaranteed contracts.',
      'Public-sector sales follow procurement and security rules.',
      'Domestic capability is a stated policy aim.',
    ],
    chapterRecap: 'Policy priorities can help providers choose where to build capability, but they do not become demand automatically. Providers should align offers with defined customer needs and policy requirements, and prepare to meet procurement and security rules.',
    deepDiveTitle: 'Why a target is a signal, not a sales forecast',
    body: <EntDeepDive paragraphs={[
      'A target such as supporting 500,000 SMEs describes an aim. Whether those SMEs buy software, from whom, and at what price depends on budgets, programme design and what providers offer.',
      'A useful way to read policy is to ask which part of a target requires a purchase, who decides, and by what procedure.' ]} evidence="The policy areas are the content of the chapter’s activity list; the targets are from the Government legal text and news reports of Decisions 1266 and 1308, and the Government news portal for Decision 1121; the law list is from a law-firm briefing. The distinction between signal and forecast is our own reading." />,
    sources: citeEnt5('vnStrategyLegal', 'vnStrategyNews', 'vnDataStrategy', 'vietnamCloudProgram', 'andersenLaws', 'digitalTechLaw', 'vietnamBriefingIt'),
  }),
  entM5Chapter({
    title: 'Sustainability, Green IT, and Responsible Technology Operations', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why AI and data-centre growth make energy, efficiency and responsible operation a business topic.',
    mateIntro: 'AI runs on physical infrastructure. The more it grows, the more energy and hardware become part of the conversation.',
    keyInsight: 'Sustainability is reaching enterprise technology through the infrastructure that AI and cloud services depend on. Green IT now covers software design, cloud operations and AI deployment, not only physical equipment, and responsible operation is becoming a topic for buyers and regulators.',
    statTiles: [
      { value: '6', label: 'Key green-IT and responsible-operations activities', subtitle: 'Efficient infrastructure to responsible AI', description: 'Energy-efficient infrastructure, efficient software design, cloud cost and carbon visibility, hardware life-cycle management, responsible AI deployment and reporting.' },
      { value: '56%', label: 'Share of forecast 2026 worldwide AI spending that goes to AI infrastructure', subtitle: 'Gartner, September 2026 forecast', description: 'About US$1,484 billion of about US$2,670 billion.' },
      { value: '+62.5%', label: 'Forecast growth in worldwide data-centre systems spending in 2026', subtitle: 'Gartner, July 2026 forecast', description: 'About US$822 billion.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The figures measure spending, not energy use or emissions. Linking them to resource demand is our own reading.',
    narrative: [
      { label: 'What it is', text: 'Green IT is the effort to reduce the environmental impact of technology, including the energy used by data centres, the efficiency of software and the life cycle of hardware. Responsible technology operations extends this to how AI and data are used, so that efficiency, safety and accountability are managed together.' },
      { label: 'Why it is happening', text: 'Gartner forecasts steep growth in data-centre systems and AI infrastructure spending in 2026, so more computing capacity is being built and run. Buyers and regulators are beginning to ask what that means for energy and for responsible use, and providers may be asked to show how their services are run. The spending data above does not itself measure energy use.' },
      { label: 'Real-world example', text: 'Providers use energy-efficient infrastructure and cloud regions; design software to use computing resources efficiently; give customers visibility of cloud cost and, where available, carbon impact; manage hardware through its life cycle, including reuse and responsible disposal; deploy AI responsibly with controls on data and model use; and report on their practices to customers who ask.' },
      { label: 'Vietnam example', text: 'FPT describes digital, green and AI transformation consulting among its technology services in its annual report, a company statement. The National Data Strategy targets three national data centres with high-performance computing and AI infrastructure, and CMC reports plans for US$100 million of mini data centres in Japan, a company plan. Whether these will raise energy demand was not found in public data. No public data on Vietnamese data-centre energy use or on adoption of green IT practices by enterprise buyers was found.' },
      { label: 'Business impact', text: 'Green IT now reaches software architecture, cloud operations and AI deployment, not only physical equipment. Providers that can show efficient, responsible operation may meet new customer questions earlier, but they should not claim environmental benefits they cannot support with evidence.' },
    ],
    visualKind: 'ent-m5-43-green', visualHeading: 'Worldwide AI spending forecast by segment, 2026',
    visualIntro: 'Read the bars as spending by segment, not as energy use.',
    imageAlt: 'Casemate bar chart of Gartner 2026 AI spending forecast by segment',
    keyTerms: [
      { term: 'Green IT', definition: 'Reducing the environmental impact of technology through efficient equipment, software and operations.' },
      { term: 'Data centre', definition: 'A facility that houses computing, storage and network equipment.' },
      { term: 'Hardware life cycle', definition: 'The stages from buying and using equipment to reusing, recycling or disposing of it.' },
      { term: 'Responsible AI', definition: 'Using AI with controls for safety, fairness, privacy and accountability.' },
    ],
    recap: [
      'AI and cloud growth depend on physical infrastructure.',
      'Green IT covers software, operations and AI, not only equipment.',
      'The spending figures do not measure energy or emissions.',
      'Environmental claims need evidence.',
    ],
    chapterRecap: 'Green IT now reaches software architecture, cloud operations and AI deployment, not only physical equipment. Providers that can show efficient, responsible operation may meet new customer questions earlier, but they should not claim environmental benefits they cannot support with evidence.',
    deepDiveTitle: 'Why spending data cannot stand in for energy data',
    body: <EntDeepDive paragraphs={[
      'Money spent on AI infrastructure shows where capacity is being built, but not how much energy it will use, which depends on equipment efficiency, utilisation and the power sources that supply it.',
      'Treating spending as a rough pointer, and asking for real energy and emissions data when it exists, avoids overstating the case.' ]} evidence="The activities are the content of the chapter’s activity list; the spending figures are from Gartner’s July and September 2026 releases; the company and policy items are from FPT’s annual report, Viet Nam News and VietnamPlus. The link between spending and resource demand, and the advice to avoid unsupported claims, are our own reading." />,
    sources: citeEnt5('gartnerAi', 'gartnerJuly2026', 'fptTechnology2025', 'vnDataStrategy', 'cmcJapan'),
  }),
];

const quiz = entQuiz('ent-m5-l4', [
  { chapter: '1', objective: 'Describe compliance', question: 'How should providers treat data protection, cybersecurity and AI rules?', application: 'A team plans a single compliance check before launch. What is wrong?', correct: 'As an ongoing capability affecting design, hosting, contracts and AI deployment', wrong: ['As a one-off checklist', 'As a logo requirement', 'As optional'], explanation: 'Compliance continues. Review Chapter 1.' },
  { chapter: '1', objective: 'State the AI law date', question: 'When did Vietnam’s Law on Artificial Intelligence take effect?', application: 'A provider plans AI governance. From what date does the law apply?', correct: '1 March 2026', wrong: ['1 January 2020', '1 July 2030', '31 December 2018'], explanation: 'Check the effective date. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe the AI law approach', question: 'What approach does the Law on Artificial Intelligence take?', application: 'A low-risk tool and a high-risk system are treated alike. What is wrong?', correct: 'A risk-based approach with three levels and stricter duties for high-risk systems', wrong: ['One rule for all systems', 'A ban on all AI', 'No rules'], explanation: 'Risk drives duties. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply a transition period', question: 'How long do AI systems already running in finance have to comply with the AI law?', application: 'A bank runs an AI system launched before 1 March 2026. What is its period?', correct: '18 months', wrong: ['No time', '1 day', '10 years'], explanation: 'Healthcare, education and finance have 18 months. Review Chapter 1.' },
  { chapter: '2', objective: 'Classify a target', question: 'How should the 30% of GDP digital economy figure be described?', application: 'A slide says the digital economy already reached 30% in 2025. What is the correction?', correct: 'As a 2030 policy target in Decision 1266/QD-TTg, not a measurement', wrong: ['As audited 2025 revenue', 'As a Gartner forecast', 'As a tax rate'], explanation: 'Targets are not outcomes. Review Chapter 2.' },
  { chapter: '2', objective: 'Read policy correctly', question: 'Why are policy targets not guaranteed demand for providers?', application: 'A firm books revenue from a strategy target. What is wrong?', correct: 'Demand depends on budgets, programme design, procurement rules and matching offers', wrong: ['Targets are binding contracts', 'Providers are always selected', 'Procurement rules do not apply'], explanation: 'Targets signal, they do not buy. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a data target', question: 'Which is a target of the National Data Strategy in Decision 1308/QD-TTg?', application: 'A provider reads the strategy for opportunities. Which target applies?', correct: 'Restoring essential services within four hours of an incident', wrong: ['Banning cloud computing', 'Closing all data centres', 'Ending digital government'], explanation: 'Check the strategy text. Review Chapter 2.' },
  { chapter: '3', objective: 'Define green IT', question: 'What does green IT now cover?', application: 'A provider thinks green IT means only energy-saving servers. What is missing?', correct: 'Software architecture, cloud operations and AI deployment as well as physical equipment', wrong: ['Only office recycling', 'Only paper use', 'Only logo design'], explanation: 'Green IT is broader. Review Chapter 3.' },
  { chapter: '3', objective: 'Read spending data correctly', question: 'What do Gartner’s AI infrastructure and data-centre spending figures measure?', application: 'A slide uses them as energy consumption. What is the correction?', correct: 'Spending, not energy use or emissions', wrong: ['Energy use in Vietnam', 'Carbon emissions', 'Water use'], explanation: 'Spending is not energy. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'What should be said about Vietnamese data-centre energy use?', application: 'A slide states a national figure. What is the correction?', correct: 'No public data was found, so none is shown', wrong: ['It is 56%', 'Gartner publishes it for Vietnam', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 3.' },
]);

export const LESSON_ENT5_4: EntM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can summarise the Vietnamese laws that shape enterprise technology, read national strategies as signals rather than guaranteed demand, and explain how green IT and responsible operation are reaching software and AI.',
    keyTakeaways: [
      'Five Vietnamese laws cover data, digital technology, personal data, AI and cybersecurity, with different effective dates.',
      'The AI law is risk-based and includes transition periods of 12 or 18 months for systems already running.',
      'National strategies set targets for 2030, which are signals and not guaranteed contracts.',
      'Green IT now covers software, operations and AI; spending figures do not measure energy use.',
      'No public data was found on compliance costs, policy-driven purchases or Vietnamese data-centre energy use.',
    ],
    businessImplications: 'Treat compliance as a continuing capability, align offers with policy needs and procurement rules, and support environmental claims with evidence.',
    remember: 'Check the current text, the sector and the date before relying on a rule or a target.',
    nextLesson: 'Growth Outlook & Strategic Opportunities',
  },
};
