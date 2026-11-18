import { EntDeepDive, citeEnt, entChapter, entQuiz } from './entM1Core';
import type { EntM1LessonBundle } from './entM1Core';

const LESSON = '3. Global Market Overview';

const deck = [
  entChapter({
    title: 'Market Size, Growth, and Spending Structure', chapterTitle: LESSON, readingTime: '6',
    objective: 'Read global technology spending by segment and avoid treating a headline total as the size of one market.',
    mateIntro: 'A trillion-dollar headline sounds like one market. It is really many markets with very different growth rates.',
    keyInsight: 'Global technology spending is growing strongly, but growth is uneven across software, services, infrastructure, and devices. Enterprise software and IT services should be analyzed as distinct but connected spending categories, not as a single market that grows at one rate.',
    statTiles: [
      { value: '4', label: 'Key spending activities', subtitle: 'Software to AI-related investment', description: 'Software purchases and subscriptions, IT services delivery, cloud and infrastructure investment, and AI-related technology spending.' },
      { value: 'US$6,369B', label: 'Forecast worldwide IT spending in 2026', subtitle: 'Gartner, July 2026, +14.2%', description: 'Covers data center systems, devices, software, IT services, IaaS and communications services.' },
      { value: '+15.5%', label: 'Forecast growth in worldwide software spending in 2026', subtitle: 'Gartner, July 2026', description: 'To about US$1,468 billion, against +5.3% for IT services at about US$1,570 billion.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are Gartner worldwide forecasts for broad categories: they include far more than enterprise software and enterprise IT services, and they are not Vietnam figures.',
    narrative: [
      { label: 'What it is', text: 'Enterprise software and IT services sit inside a much larger pool of technology spending. Gartner’s July 2026 forecast puts worldwide IT spending at US$6,369 billion in 2026, up 14.2%. Within that total, IT services is the largest forecast category at about US$1,570 billion, software follows at US$1,468 billion, and communications services, devices and data center systems make up most of the remainder.' },
      { label: 'Why it is happening', text: 'Growth is concentrated rather than shared. Gartner forecasts data center systems up 62.5% and infrastructure-as-a-service up 29.3%, software up 15.5%, devices up 9.8% and IT services up 5.3%. Its analyst notes that this is not a market where a rising tide lifts all boats. AI-related infrastructure and software are named as major contributors to growth.' },
      { label: 'Real-world example', text: 'A customer’s technology budget is typically split across licences or subscriptions, implementation and support services, cloud infrastructure and devices. When infrastructure for AI absorbs a larger share, budgets for other lines can be squeezed, even in a year when the total grows quickly.' },
      { label: 'Vietnam example', text: 'Vietnam has no public figure on the same basis as Gartner’s worldwide categories. Three different numbers circulate and must be kept apart: Mordor Intelligence estimates Vietnam’s IT services market at about US$2.37 billion in 2025 (services only); VINASA says the software sector accounts for about US$13 billion of IT industry revenue, with US$7 billion exported, in 2024; and the Ministry of Science and Technology reports about US$198 billion of digital technology industry revenue in 2025, most of it hardware and electronics exports. They measure different things and cannot be added or compared directly.' },
      { label: 'Business impact', text: 'Segment-level analysis is essential. A provider planning investment, pricing or hiring needs the growth rate of its own segment, not the headline total, and should be cautious when a large aggregate is quoted as its addressable market.' },
    ],
    visualKind: 'ent-m1-31-spending', visualHeading: 'Where worldwide IT spending goes',
    visualIntro: 'Compare the six forecast spending categories for 2026, in US$ billion.',
    imageAlt: 'Casemate bar chart of Gartner 2026 worldwide IT spending forecast by segment',
    keyTerms: [
      { term: 'IT spending', definition: 'Money organisations spend on devices, software, IT services, data centers and communications.' },
      { term: 'IaaS', definition: 'Infrastructure as a service: computing, storage and networking rented from a cloud provider.' },
      { term: 'Addressable market', definition: 'The part of total spending that a given product or provider could realistically sell into.' },
      { term: 'Forecast', definition: 'An analyst’s estimate of future spending, not a measured result.' },
    ],
    recap: [
      'Worldwide IT spending is forecast at US$6,369 billion in 2026, up 14.2%.',
      'Growth differs sharply by segment, led by data center systems and IaaS.',
      'Software is forecast to grow faster than IT services.',
      'A headline total is not the market for any single segment.',
    ],
    chapterRecap: 'Global spending is growing strongly but unevenly. Enterprise software and IT services should be analysed as distinct but connected categories, using the right definition for each number.',
    deepDiveTitle: 'Why a large total can hide a small addressable market',
    body: <EntDeepDive paragraphs={[
      'Gartner’s categories are broad. Software includes consumer and infrastructure software, and services include categories far wider than enterprise implementation work. Treating any of them as the size of an enterprise niche overstates the opportunity.',
      'The safer habit is to state the source, the definition, the year and whether the figure is a forecast every time a number is used.' ]} evidence="Spending figures and the analyst comment are from Gartner’s July 2026 press release; Vietnam figures are from Mordor Intelligence, VINASA via VnEconomy, and the Ministry of Science and Technology via VietnamPlus. The advice on definitions is our own." />,
    sources: citeEnt('gartnerJuly2026', 'mordorVietnamIt', 'vneconomyVinasa', 'vietnamplusDigitalTech'),
  }),
  entChapter({
    title: 'Geographic Distribution and Major Industry Hubs', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare the regions that buy technology with the hubs that deliver it, and place Vietnam among them.',
    mateIntro: 'The place that pays for technology is often not the place that builds it. Knowing both helps you read the map.',
    keyInsight: 'The industry is globally distributed, with major demand centers, platform developers, and delivery hubs in different regions. Success depends on matching local talent, domain expertise, security capability, and customer relationships to the work being delivered.',
    statTiles: [
      { value: '5', label: 'Key regional roles', subtitle: 'Demand centers and delivery hubs', description: 'North America, Europe, India, the Philippines and Vietnam each play a different role.' },
      { value: 'US$282.6B', label: 'India’s technology industry revenue in FY2025', subtitle: 'Nasscom, includes hardware', description: 'With 5.8 million employees and more than 1,750 global capability centres.' },
      { value: 'US$40B+', label: 'Philippine IT-BPM revenue in 2025', subtitle: 'IBPAP via Philstar', description: 'About 1.9 million workers, in an industry that includes business process outsourcing.' },
    ],
    statsNote: 'The first tile is a count from this lesson. India’s figure includes hardware and the Philippine figure includes business process outsourcing, so neither is a like-for-like enterprise software and IT services number.',
    narrative: [
      { label: 'What it is', text: 'North America is a major source of enterprise platforms, cloud services and technology investment. Europe combines strong enterprise application vendors, industrial digitalisation, data governance and regulated-sector demand. India is the largest services delivery hub, and the Philippines is another large location for IT and business process outsourcing. Vietnam is an emerging location for software engineering and IT outsourcing.' },
      { label: 'Why it is happening', text: 'Work moves to where the right combination of talent, cost, domain knowledge, time zone and trust exists. Delivery hubs have also moved up the value chain: India’s industry reports more than 1,750 global capability centres, in-house technology units that multinational companies run from India.' },
      { label: 'Real-world example', text: 'A European manufacturer may buy an application suite from a platform vendor, have it configured by an integrator with teams in India, and rely on a Philippine service desk for support, while keeping data governance decisions at headquarters.' },
      { label: 'Vietnam example', text: 'VINASA reports software exports of about US$7 billion in 2024, with the United States, Japan, Europe and parts of Southeast Asia as the main outsourcing markets. Tuoi Tre reports overseas revenue of about US$15 billion for Vietnamese technology firms in 2025 and more than 2,100 firms exporting digital products and services. FPT, the largest example, says Japan is its main overseas market and that its Japan business grew 25.4% in 2025. VINASA also says a lack of local offices abroad limits trust-building, which is a company-level constraint rather than a national measurement.' },
      { label: 'Business impact', text: 'Delivery location is now a competitive choice, not just a cost choice. Providers need credible security practices, domain expertise, communication skills and local presence to move from low-cost coding toward higher-value work.' },
    ],
    visualKind: 'ent-m1-32-geography', visualHeading: 'Regional roles at a glance',
    visualIntro: 'Read across the table to compare role and evidence for each region.',
    imageAlt: 'Casemate table of regional roles in the global enterprise software and IT services industry',
    keyTerms: [
      { term: 'Delivery hub', definition: 'A location where large amounts of technology work for overseas clients is carried out.' },
      { term: 'Global capability centre', definition: 'An in-house technology or business unit that a multinational runs in another country.' },
      { term: 'IT-BPM', definition: 'IT and business process management: technology services together with outsourced business processes.' },
      { term: 'Nearshore and offshore', definition: 'Doing work in a nearby country or a distant one to access talent or lower cost.' },
    ],
    recap: [
      'Demand centers, platform builders and delivery hubs sit in different places.',
      'India and the Philippines are the largest delivery locations.',
      'Vietnam is an emerging software engineering and outsourcing location.',
      'Talent, expertise, security and trust matter alongside cost.',
    ],
    chapterRecap: 'The industry is globally distributed. Success depends on matching local talent, domain expertise, security capability and customer relationships to the work being delivered.',
    deepDiveTitle: 'Why hubs of very different size are hard to compare',
    body: <EntDeepDive paragraphs={[
      'Nasscom’s total includes hardware and exports, IBPAP’s includes business process outsourcing, and VINASA’s software figure is a narrower measure again. A larger number in one country does not mean a larger comparable market.',
      'What can be compared safely is the pattern: all three have used export delivery to build capability, and each is trying to move toward higher-value work.' ]} evidence="Indian figures are from Nasscom’s 2025 review, Philippine figures from IBPAP via Philstar, Vietnamese figures from VINASA via VnEconomy, Tuoi Tre and FPT’s earnings report. The regional roles for North America and Europe come from the supplied brief, and no single sourced figure is used for them. The comparison advice is our own." />,
    sources: citeEnt('nasscomReview', 'philstarItBpm', 'vneconomyVinasa', 'tuoitreDigitalExports', 'fptEarnings2025'),
  }),
  entChapter({
    title: 'Competitive Landscape and Industry Structure', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the arenas in which providers compete and why ecosystem position often decides outcomes.',
    mateIntro: 'No supplier wins alone. The winners sit inside a web of partners, platforms and long customer relationships.',
    keyInsight: 'Competition in enterprise software and IT services takes place across platforms, specialist solutions, implementation capability, and partner ecosystems. A strong product helps, but integration, interoperability, delivery quality, and customer support often determine who wins and keeps the account.',
    statTiles: [
      { value: '5', label: 'Key arenas of competition', subtitle: 'Platforms to customer retention', description: 'Platform competition, systems integration, specialist solutions, partner ecosystems and customer retention.' },
      { value: '+62.5%', label: 'Forecast growth in data center systems spending in 2026', subtitle: 'Gartner, July 2026', description: 'The fastest-growing category in the forecast.' },
      { value: '+5.3%', label: 'Forecast growth in IT services spending in 2026', subtitle: 'Gartner, July 2026', description: 'The slowest-growing of the six categories.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The growth rates are Gartner worldwide forecasts for broad categories and show how unevenly growth is spread, not any one provider’s performance.',
    narrative: [
      { label: 'What it is', text: 'Large platform providers compete on application suites, cloud infrastructure, developer ecosystems and integrated AI. Systems integrators and IT service providers compete on delivery capability, industry knowledge and cost. Specialist vendors compete in areas such as industry applications, cybersecurity and data platforms.' },
      { label: 'Why it is happening', text: 'Customers rarely buy a single product. They need applications to connect to older systems, data platforms and other vendors’ tools, so interoperability and implementation skill carry as much weight as features. Partner ecosystems, including certifications, cloud marketplaces and resale arrangements, extend a provider’s reach, while long contracts and integration depth create switching costs.' },
      { label: 'Real-world example', text: 'A platform vendor may depend on certified implementation partners to install its suite, while those partners also work with competing platforms. Support quality, product development, integration depth and ongoing value then decide whether a customer renews.' },
      { label: 'Vietnam example', text: 'No public ranking or market-share table of Vietnamese enterprise software and IT services providers was found. FPT is the best-documented example: it reports moving overseas contracts from time-and-materials toward managed services, describes an AI-first strategy, and says it has signed its first Japanese contract above US$100 million. Mordor Intelligence says large enterprises account for 67.72% of Vietnam’s IT services value, which suggests competition for big accounts, but it is a third-party estimate.' },
      { label: 'Business impact', text: 'Providers need a clear position: broad platform, integration specialist, or deep vertical expert. Without one, they compete mainly on price. Ecosystem relationships and retained customers are assets as important as the product itself.' },
    ],
    visualKind: 'ent-m1-33-competition', visualHeading: 'Where providers compete',
    visualIntro: 'Explore the five arenas around the centre and what wins in each.',
    imageAlt: 'Casemate mind map of the five arenas of competition around ecosystem position',
    keyTerms: [
      { term: 'Systems integrator', definition: 'A firm that connects applications, data and infrastructure into a working whole for a customer.' },
      { term: 'Interoperability', definition: 'The ability of different systems to exchange and use each other’s data.' },
      { term: 'Switching cost', definition: 'The time, money and risk a customer faces in moving to another provider.' },
      { term: 'Partner ecosystem', definition: 'The network of resellers, implementers and cloud marketplaces around a platform.' },
    ],
    recap: [
      'Providers compete across platforms, integration, specialist solutions and partnerships.',
      'Interoperability and delivery quality weigh as much as features.',
      'Ecosystems extend reach and switching costs protect accounts.',
      'Customer support and ongoing value decide retention.',
    ],
    chapterRecap: 'Competition spans platforms, specialist solutions, implementation capability and partner ecosystems. Integration, interoperability, delivery quality and support often decide who wins and keeps the account.',
    deepDiveTitle: 'Why services growth lags software and infrastructure growth',
    body: <EntDeepDive paragraphs={[
      'Gartner’s forecast shows IT services growing 5.3% while software grows 15.5% and data center systems 62.5%. One possible reading is that infrastructure for AI is taking a larger share of budgets, but the forecast does not prove why.',
      'For a services provider the practical question is whether it can move toward the faster-growing work, such as AI integration and managed transformation, rather than rely on the slower-growing categories.' ]} evidence="Growth rates are from Gartner’s July 2026 press release; FPT’s contract and strategy statements are from its annual report; the large-enterprise share is from Mordor Intelligence. The interpretation of services growth is our own reasoning, not a finding in the sources." />,
    sources: citeEnt('gartnerJuly2026', 'fptGlobalIt2025', 'mordorVietnamIt'),
  }),
];

const quiz = entQuiz('ent-m1-l3', [
  { chapter: '1', objective: 'Recall the headline forecast', question: 'What does Gartner forecast for worldwide IT spending in 2026?', application: 'A slide needs the total. What is the figure?', correct: 'About US$6.37 trillion, up 14.2%', wrong: ['About US$637 million', 'About US$63.7 billion', 'A decline of 14.2%'], explanation: 'It is a worldwide forecast. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare segments', question: 'Which forecast category grows faster in 2026?', application: 'A planner compares software and IT services. Which is higher?', correct: 'Software, at +15.5% against +5.3% for IT services', wrong: ['IT services', 'They are identical', 'Neither is forecast'], explanation: 'Growth is uneven. Review Chapter 1.' },
  { chapter: '1', objective: 'Avoid a common mistake', question: 'Why should a headline spending total not be used as one market’s size?', application: 'A pitch quotes US$6.37 trillion as its market. What is wrong?', correct: 'It covers many categories beyond enterprise software and IT services', wrong: ['It is always too small', 'It excludes software', 'It is only a Vietnam figure'], explanation: 'Definitions matter. Review Chapter 1.' },
  { chapter: '1', objective: 'Keep Vietnam figures apart', question: 'How should Mordor’s US$2.37 billion and the US$198 billion digital technology figure be treated?', application: 'A student adds them together. What is the correction?', correct: 'As different measures: IT services only, and a wider industry total that includes hardware', wrong: ['As the same number', 'As two years of one series', 'As Gartner forecasts'], explanation: 'Never merge definitions. Review Chapter 1.' },
  { chapter: '2', objective: 'Name the largest services hub', question: 'Which location is described as the largest services delivery hub?', application: 'A buyer wants scale. Where should they look first?', correct: 'India', wrong: ['Antarctica', 'Iceland', 'Monaco'], explanation: 'India leads delivery. Review Chapter 2.' },
  { chapter: '2', objective: 'Read a figure carefully', question: 'Why is India’s US$282.6 billion not directly comparable to Vietnam’s software exports?', application: 'A chart puts them side by side. What is missing?', correct: 'India’s figure includes hardware and a broader industry scope', wrong: ['It is in a different currency symbol only', 'It is a forecast for 2040', 'It excludes all services'], explanation: 'Scopes differ. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall Vietnam’s exports', question: 'What does VINASA report for Vietnam’s software exports in 2024?', application: 'A timeline needs the number. What is it?', correct: 'About US$7 billion', wrong: ['About US$7 million', 'About US$700 billion', 'Nothing'], explanation: 'It is a VINASA figure. Review Chapter 2.' },
  { chapter: '3', objective: 'Name the arenas', question: 'Which is an arena of competition in the industry?', application: 'A strategist lists where rivals fight. Which belongs?', correct: 'Partner ecosystems', wrong: ['Weather forecasting', 'Retail fashion', 'Coffee roasting'], explanation: 'Ecosystems extend reach. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain what wins accounts', question: 'What often decides who wins and keeps an account?', application: 'Two products have similar features. What breaks the tie?', correct: 'Integration, interoperability, delivery quality and support', wrong: ['Logo colour', 'Office location only', 'The lowest-quality bid'], explanation: 'Delivery matters. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'What should be said about Vietnamese provider market shares?', application: 'A slide ranks local providers. What is the correction?', correct: 'No public ranking or market-share table was found, so none is shown', wrong: ['FPT holds 100%', 'All firms are equal', 'Gartner publishes the ranking'], explanation: 'State evidence gaps. Review Chapter 3.' },
]);

export const LESSON_ENT_3: EntM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can read global technology spending by segment, place the main delivery hubs and describe how providers compete.',
    keyTakeaways: [
      'Worldwide IT spending is forecast at US$6,369 billion in 2026, but growth is uneven by segment.',
      'Software and IT services are distinct, connected categories with different growth rates.',
      'Demand centers, platform builders and delivery hubs sit in different regions.',
      'Competition spans platforms, integration, specialist solutions and ecosystems.',
      'Figures with different definitions are never added or compared directly in this module.',
    ],
    businessImplications: 'Use segment-level data, choose a delivery location for capability as well as cost, and build a clear ecosystem position rather than competing on price alone.',
    remember: 'A big total is not your market. Check the definition before you use the number.',
    nextLesson: 'How the Vietnam Market Works',
  },
};
