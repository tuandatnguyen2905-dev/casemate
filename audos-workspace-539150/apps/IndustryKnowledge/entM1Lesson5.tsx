import { EntDeepDive, citeEnt, entChapter, entQuiz } from './entM1Core';
import type { EntM1LessonBundle } from './entM1Core';

const LESSON = '5. Industry Drivers & External Factors';

const deck = [
  entChapter({
    title: 'Digital Transformation, Cloud Adoption, and AI', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how transformation programmes, cloud and AI create demand and what customers expect in return.',
    mateIntro: 'Every company says it wants to transform digitally. The ones that buy are the ones who can say what will get better.',
    keyInsight: 'Digital transformation, cloud adoption, and AI are the main sources of demand for enterprise software and IT services. Customers increasingly expect providers to show how technology improves productivity, reduces costs, strengthens resilience, or supports revenue growth, not merely to deploy new tools.',
    statTiles: [
      { value: '5', label: 'Key demand drivers', subtitle: 'Cloud to transformation consulting', description: 'Cloud migration, AI-enabled applications, workflow automation, data integration and transformation consulting.' },
      { value: '70%', label: 'Target share of Vietnamese private enterprises using cloud by 2030', subtitle: 'Decision 1121/QD-TTg, a policy target', description: 'Alongside all government agencies and state enterprises, and over 50% of the population.' },
      { value: '8.2%', label: 'Productivity gain FPT reports from its AI-first strategy', subtitle: 'FPT annual report, company-reported', description: 'A company claim, not an independently measured result.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The 70% is a government target, not an outcome, and the 8.2% is a company claim.',
    narrative: [
      { label: 'What it is', text: 'Organisations modernise legacy applications and move workloads to cloud environments, embed AI-assisted support, document processing, analytics and software engineering tools, automate finance, HR, procurement, service and operational processes, connect fragmented systems for reliable reporting and forecasting, and hire advisers to assess readiness, define roadmaps and set measurable indicators.' },
      { label: 'Why it is happening', text: 'Gartner names AI-related infrastructure and software as major contributors to 2026 spending growth. At the same time its analyst warns that growth is not shared evenly, so customers are choosing carefully where to spend and expect evidence of results.' },
      { label: 'Real-world example', text: 'A company that moves accounting to the cloud and adds automated invoice matching can show fewer errors and faster closing. A company that buys an AI tool without changing its process may struggle to show any return.' },
      { label: 'Vietnam example', text: 'Vietnam’s 2025–30 national cloud programme targets cloud use by all government agencies and state enterprises, 70% of private enterprises and over 50% of the population by 2030, using domestic providers. FPT reports digital transformation revenue of VND 16,751 billion and describes an AI-first strategy. The targets and the company results are not measurements of national adoption, and no public Vietnam-wide figure for cloud or AI adoption by firms was found.' },
      { label: 'Business impact', text: 'Providers must tie every proposal to a measurable outcome: productivity, cost, resilience or revenue. Those that cannot will find purchasing slower and contracts shorter.' },
    ],
    visualKind: 'ent-m1-51-transformation', visualHeading: 'Five ways transformation creates demand',
    visualIntro: 'Explore the five demand drivers around the goal of measurable business value.',
    imageAlt: 'Casemate mind map of five digital transformation demand drivers around measurable business value',
    keyTerms: [
      { term: 'Digital transformation', definition: 'Changing how an organisation works by adopting digital technology across its processes.' },
      { term: 'Workflow automation', definition: 'Using software to carry out routine steps in a business process.' },
      { term: 'Data integration', definition: 'Connecting separate systems so their data can be used together.' },
      { term: 'Return on investment', definition: 'The benefit gained compared with the cost of a project.' },
    ],
    recap: [
      'Transformation, cloud and AI are the main sources of demand.',
      'Customers expect measurable outcomes, not just deployed tools.',
      'Vietnam sets cloud adoption targets through national policy.',
      'Company and policy claims are labelled as such.',
    ],
    chapterRecap: 'Digital transformation, cloud adoption and AI drive demand. Customers expect providers to show improved productivity, lower cost, stronger resilience or revenue support.',
    deepDiveTitle: 'Why outcome claims need baselines',
    body: <EntDeepDive paragraphs={[
      'A promise of better productivity can only be tested against a starting point. Without a baseline, such as time to close accounts or errors per thousand invoices, both buyer and seller can interpret results as they like.',
      'Agreeing indicators before the project starts is the most practical way to turn a transformation claim into evidence.' ]} evidence="Spending drivers are from Gartner’s July 2026 press release; cloud targets are from the Vietnam Government news portal; FPT claims are from its annual report. The case for baselines is our own reasoning." />,
    sources: citeEnt('gartnerJuly2026', 'vietnamCloudProgram', 'fptGlobalIt2025'),
  }),
  entChapter({
    title: 'Regulation, Cybersecurity, and Data Governance', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the Vietnamese laws that shape enterprise technology and why security and compliance are purchase criteria.',
    mateIntro: 'Rules about data and security decide what you can build, where it can run and who can see it.',
    keyInsight: 'Regulation, cybersecurity, and data governance increasingly shape how enterprise software and IT services are designed, purchased, and operated. Security and compliance capability are no longer secondary features, they are core selection criteria, especially for regulated sectors and government customers.',
    statTiles: [
      { value: '5', label: 'Key regulatory activities', subtitle: 'Compliance to governance', description: 'Compliance assessment, security design, data governance, incident response and regulatory reporting.' },
      { value: '1 Jul 2026', label: 'Effective date of Vietnam’s Law on Cybersecurity 116/2025/QH15', subtitle: 'Luat Viet Nam, English summary', description: 'It replaces the 2018 Cybersecurity Law.' },
      { value: 'VND 3B', label: 'Maximum administrative fine for most violations of the Personal Data Protection Law', subtitle: 'Law 91/2025/QH15, effective 1 January 2026', description: 'Fines are one of several consequences of non-compliance.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Legal dates and fines come from official or secondary legal summaries and should be checked against the current text before use.',
    narrative: [
      { label: 'What it is', text: 'Organisations assess which laws apply to their systems and data, design security into applications, classify and govern data, prepare to detect and respond to incidents, and report to regulators where required. Software providers and integrators are expected to demonstrate these capabilities.' },
      { label: 'Why it is happening', text: 'More data is processed digitally and across borders, and governments are setting clearer rules. Mordor Intelligence lists fragmented data-privacy rules among the factors that temper growth in Vietnam, because inconsistent rules raise compliance cost and uncertainty.' },
      { label: 'Real-world example', text: 'A bank selecting a new platform may ask where data is stored, who can access it, how incidents are reported and whether the provider meets sector rules before it compares features.' },
      { label: 'Vietnam example', text: 'Four legal texts are central. The Law on Data 60/2024/QH15 took effect on 1 July 2025 and regulates digital, important and core data. The Law on the Digital Technology Industry 71/2025/QH15 took effect on 1 January 2026, with some articles from 1 July 2025. The Personal Data Protection Law 91/2025/QH15 took effect on 1 January 2026. The Law on Cybersecurity 116/2025/QH15 takes effect on 1 July 2026. A law firm briefing also lists a Digital Transformation Law and a High Technology Law among laws effective on 1 July 2026. Sector rules, such as those for banking, also apply, and this lesson does not summarise them.' },
      { label: 'Business impact', text: 'Compliance becomes a source of demand for consulting and security services and a barrier for providers that cannot show capability. Customers should confirm which laws apply to their own systems before relying on any summary.' },
    ],
    visualKind: 'ent-m1-52-regulation', visualHeading: 'Vietnamese laws that shape enterprise technology',
    visualIntro: 'Compare the four laws by effective date and what they mean for providers.',
    imageAlt: 'Casemate table of four Vietnamese laws on data, digital technology, personal data and cybersecurity',
    keyTerms: [
      { term: 'Data governance', definition: 'The rules and responsibilities for how an organisation collects, stores, shares and protects data.' },
      { term: 'Personal data', definition: 'Information that relates to an identifiable individual.' },
      { term: 'Incident response', definition: 'The steps an organisation takes to detect, contain and report a security incident.' },
      { term: 'Regulated sector', definition: 'A field such as banking or healthcare where specific legal rules apply.' },
    ],
    recap: [
      'Security and compliance are core selection criteria.',
      'Vietnam has recently enacted laws on data, digital technology, personal data and cybersecurity.',
      'Fragmented rules raise compliance cost and uncertainty.',
      'Check the current text and sector rules before relying on a summary.',
    ],
    chapterRecap: 'Regulation, cybersecurity and data governance shape how technology is designed, purchased and operated. Security and compliance are core selection criteria, especially in regulated sectors and government.',
    deepDiveTitle: 'Why compliance is both a cost and a market',
    body: <EntDeepDive paragraphs={[
      'Every new rule adds work for customers, which creates demand for advisers, security services and compliant platforms. It also raises the entry bar for providers that cannot document their controls.',
      'The same regulation can therefore be a cost to the buyer, a market to a specialist and a barrier to a weaker competitor.' ]} evidence="Legal details are from the Ministry of Science and Technology legal database, the Official Gazette, Luat Viet Nam, Regulations.AI and an Andersen Vietnam briefing, several of which are secondary summaries; the growth constraint is from Mordor Intelligence. This is not legal advice, and the cost-and-market reading is our own." />,
    sources: citeEnt('dataLawOverview', 'digitalTechLaw', 'pdplGazette', 'cyberLaw2025', 'andersenLaws', 'mordorVietnamIt'),
  }),
  entChapter({
    title: 'Talent, Costs, Global Competition, and Economic Conditions', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how talent supply, delivery costs, overseas competition and the economy limit or support growth.',
    mateIntro: 'Technology firms sell people’s time and judgement. When good people are scarce, everything else slows down.',
    keyInsight: 'Industry growth is shaped by the supply of skilled talent, delivery costs, global competition, and customers’ willingness to invest. Providers that raise productivity, build deeper expertise, and deliver measurable value are better positioned than those competing mainly on labor cost.',
    statTiles: [
      { value: '5', label: 'Key external factors', subtitle: 'Talent to economic conditions', description: 'Talent supply, labour costs, global delivery competition, customer budgets and infrastructure reliability.' },
      { value: '700K', label: 'Estimated demand for IT workers by end-2025', subtitle: 'An Binh Securities via Viet Nam News', description: 'Against about 500,000 qualified candidates from domestic training.' },
      { value: '~30%', label: 'Share of IT graduates reported as job-ready', subtitle: 'Viet Nam News and VnEconomy', description: 'Of roughly 50,000 IT graduates a year.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Workforce figures are broker and recruiter estimates reported by news outlets, and sources differ on the size of the shortage.',
    narrative: [
      { label: 'What it is', text: 'Skilled engineers, analysts, security specialists and project managers are the industry’s main input. Costs include salaries, training and the price of cloud and AI infrastructure. Providers also compete with delivery hubs abroad, and customers’ willingness to invest depends on economic conditions.' },
      { label: 'Why it is happening', text: 'Demand for digital skills has grown faster than training can supply job-ready graduates, and Gartner’s outlook shows that spending growth is uneven, with services forecast to grow only 5.3% worldwide in 2026. Providers therefore cannot rely on rising volumes alone.' },
      { label: 'Real-world example', text: 'A provider that wins a large contract may struggle to staff it, so it trains juniors, raises productivity with AI-assisted tools and focuses on work where expertise commands a price premium.' },
      { label: 'Vietnam example', text: 'Viet Nam News, citing An Binh Securities, reports demand for 700,000 IT workers by end-2025 against about 500,000 qualified candidates, and about 50,000 IT graduates a year of whom around 30% are job-ready. VnEconomy, citing a TopDev report, estimates an IT workforce of 530,000 and a shortage of 150,000 to 200,000 workers a year. Mordor Intelligence also lists talent shortages and submarine-cable outages as constraints, while Vietnamese firms compete with India and the Philippines for overseas work. No public data on Vietnam IT salary levels or margins was found for this lesson.' },
      { label: 'Business impact', text: 'Talent, not demand, is often the limit on growth. Competing on labour cost alone is a weak strategy, so providers invest in training, productivity tools, expertise and measurable results.' },
    ],
    visualKind: 'ent-m1-53-talent', visualHeading: 'Vietnam IT talent supply against demand',
    visualIntro: 'Compare the estimated workforce, demand and reported shortfall, in thousand workers.',
    imageAlt: 'Casemate bar chart of Vietnam IT workforce, demand and shortfall estimates in 2025',
    keyTerms: [
      { term: 'Job-ready', definition: 'Having the skills an employer needs on the first day, without extensive retraining.' },
      { term: 'Productivity', definition: 'The output produced per person or per hour of work.' },
      { term: 'Labour-cost arbitrage', definition: 'Winning work mainly because wages in the delivery country are lower.' },
      { term: 'Upskilling', definition: 'Training existing staff in new, higher-value skills.' },
    ],
    recap: [
      'Skilled talent is the industry’s main input and is in short supply.',
      'Only about 30% of IT graduates are reported as job-ready.',
      'Vietnam competes with India and the Philippines for overseas work.',
      'Productivity and expertise beat labour cost as a long-term strategy.',
    ],
    chapterRecap: 'Growth depends on talent, cost, global competition and customer willingness to invest. Providers that raise productivity, deepen expertise and deliver measurable value are better placed than those competing mainly on labour cost.',
    deepDiveTitle: 'Why different shortage estimates can both be right',
    body: <EntDeepDive paragraphs={[
      'One source compares demand with qualified candidates at a point in time, while another estimates an annual shortfall. They count different things, so a reader should not subtract one from the other.',
      'The consistent message is that supply of skilled people is tight, and the bars in this lesson are marked as estimates for that reason.' ]} evidence="Workforce figures are from Viet Nam News (An Binh Securities) and VnEconomy (TopDev); the services growth forecast is from Gartner; constraints are from Mordor Intelligence. The reconciliation of the two shortage estimates is our own reading." />,
    sources: citeEnt('vietnamnewsItWorkforce', 'vneconomyTalent', 'gartnerJuly2026', 'mordorVietnamIt'),
  }),
];

const quiz = entQuiz('ent-m1-l5', [
  { chapter: '1', objective: 'State the main drivers', question: 'What are the main sources of demand for enterprise software and IT services?', application: 'A founder asks where demand comes from. What is the answer?', correct: 'Digital transformation, cloud adoption and AI', wrong: ['Print advertising only', 'Seasonal weather', 'Paper filing'], explanation: 'These drive demand. Review Chapter 1.' },
  { chapter: '1', objective: 'Know what customers expect', question: 'What do customers increasingly expect from providers?', application: 'A pitch lists tools. What is missing?', correct: 'A demonstration of how technology improves productivity, cost, resilience or revenue', wrong: ['More logos', 'Longer slide decks', 'Higher hourly rates'], explanation: 'Outcomes matter. Review Chapter 1.' },
  { chapter: '1', objective: 'Read a target correctly', question: 'How should the 70% cloud use by 2030 be described?', application: 'A slide says 70% of firms use cloud today. What is the correction?', correct: 'As a policy target under Decision 1121/QD-TTg, not a measured result', wrong: ['As audited 2025 data', 'As a global average', 'As an FPT result'], explanation: 'Targets are aims. Review Chapter 1.' },
  { chapter: '2', objective: 'State the regulatory insight', question: 'What have security and compliance become?', application: 'A vendor treats security as an extra. What is the better view?', correct: 'Core selection criteria, especially for regulated sectors and government', wrong: ['Optional extras', 'Marketing slogans', 'Irrelevant'], explanation: 'Buyers ask early. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a law', question: 'When does Vietnam’s Law on Cybersecurity 116/2025/QH15 take effect?', application: 'A project plan needs the date. What is it?', correct: '1 July 2026', wrong: ['1 January 2010', '1 July 2036', '31 December 2020'], explanation: 'It replaces the 2018 law. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a penalty', question: 'What is the maximum administrative fine for most violations of the Personal Data Protection Law?', application: 'A risk review needs the figure. What is it?', correct: 'VND 3 billion', wrong: ['VND 3 thousand', 'VND 300 trillion', 'There is no fine'], explanation: 'Check the current text. Review Chapter 2.' },
  { chapter: '3', objective: 'State the growth insight', question: 'What shapes industry growth according to the chapter?', application: 'A provider assumes demand alone sets growth. What is missing?', correct: 'Talent supply, delivery costs, global competition and customers’ willingness to invest', wrong: ['Only the logo', 'Only the weather', 'Only the office rent'], explanation: 'Several factors interact. Review Chapter 3.' },
  { chapter: '3', objective: 'Read talent data carefully', question: 'How should Vietnam IT workforce figures be treated?', application: 'A slide presents 700,000 as an official statistic. What is wrong?', correct: 'As broker and recruiter estimates reported by news outlets that differ between sources', wrong: ['As census counts', 'As Gartner forecasts', 'As exact numbers'], explanation: 'Estimates vary. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall job readiness', question: 'About what share of IT graduates are reported as job-ready?', application: 'A hiring plan needs a planning figure. What is it?', correct: 'About 30%', wrong: ['About 3%', 'About 100%', 'About 0%'], explanation: 'Training lags demand. Review Chapter 3.' },
  { chapter: '3', objective: 'Choose a strategy', question: 'Which strategy is better positioned than competing mainly on labour cost?', application: 'A provider wants a lasting advantage. What should it do?', correct: 'Raise productivity, build deeper expertise and deliver measurable value', wrong: ['Cut prices indefinitely', 'Avoid training staff', 'Stop measuring results'], explanation: 'Value beats low cost. Review Chapter 3.' },
]);

export const LESSON_ENT_5: EntM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain what drives demand, how regulation shapes the industry and why talent and productivity limit growth.',
    keyTakeaways: [
      'Transformation, cloud and AI drive demand, and customers expect measurable outcomes.',
      'Security and compliance are core selection criteria in regulated sectors and government.',
      'Vietnam has recent laws on data, digital technology, personal data and cybersecurity, with dates checked against sources.',
      'Skilled talent is scarce and workforce figures are estimates.',
      'Productivity, expertise and measurable value beat competing on labour cost.',
    ],
    businessImplications: 'Tie every proposal to a measurable outcome, build security and compliance capability into the offer and invest in talent and productivity.',
    remember: 'Technology is bought for results, under rules, and delivered by scarce skilled people.',
    nextLesson: 'Back to module overview',
  },
};
