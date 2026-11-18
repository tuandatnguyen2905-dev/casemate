import { EntDeepDive, citeEnt, entChapter, entQuiz } from './entM1Core';
import type { EntM1LessonBundle } from './entM1Core';

const LESSON = '4. Vietnam Market Overview';

const deck = [
  entChapter({
    title: 'Market Size, Growth, and Industry Composition', chapterTitle: LESSON, readingTime: '7',
    objective: 'Place Vietnam’s IT services estimates, software figures and digital technology totals side by side without merging them.',
    mateIntro: 'Vietnam has several credible numbers for its technology sector. They answer different questions, so the skill is knowing which one you are holding.',
    keyInsight: 'Vietnam’s enterprise software and IT services industry is expanding as businesses, government agencies, and export clients invest in digital capabilities. Market size depends heavily on definition, so analysts should separate software, IT services, outsourcing, hardware, and wider digital technology industry totals.',
    statTiles: [
      { value: '5', label: 'Key market activities', subtitle: 'Outsourcing to domestic transformation', description: 'IT outsourcing, system integration, cloud and platform services, managed services and domestic digital transformation projects.' },
      { value: 'US$2.63B', label: 'Estimated Vietnam IT services market in 2026', subtitle: 'Mordor Intelligence, third-party estimate', description: 'Projected to reach US$4.39 billion by 2031, a 10.82% CAGR for 2026–2031.' },
      { value: '39.05%', label: 'Share of 2025 IT services value held by IT outsourcing', subtitle: 'Mordor Intelligence', description: 'Cloud and platform services are the fastest-growing segment, at 11.86% a year.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are third-party estimates for IT services only, and they exclude enterprise software and hardware.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s industry combines software development, IT outsourcing, system integration, cloud and platform services, managed services and digital transformation projects for domestic and overseas clients. Mordor Intelligence estimates the IT services market at US$2.37 billion in 2025 and US$2.63 billion in 2026, rising to US$4.39 billion by 2031.' },
      { label: 'Why it is happening', text: 'Growth drivers named by Mordor Intelligence and repeated by Vietnam Briefing include cloud adoption, digital government spending and nearshore outsourcing demand from Japan and the United States. Constraints include talent shortages, fragmented data-privacy rules and submarine-cable outages.' },
      { label: 'Real-world example', text: 'A bank buying a core-system upgrade, a manufacturer introducing ERP and a government agency digitising a service all create demand, but they appear in different statistics depending on whether the spending is on software, services or hardware.' },
      { label: 'Vietnam example', text: 'Three numbers must stay separate. Mordor’s US$2.37 billion is IT services only. VINASA’s US$13 billion is the software sector’s share of IT industry revenue in 2024, with US$7 billion exported. The Ministry of Science and Technology’s about US$198 billion for 2025 is the whole digital technology industry, including US$178 billion of hardware and electronics exports, across 80,052 active firms. No public figure for Vietnam enterprise software alone was found.' },
      { label: 'Business impact', text: 'Anyone sizing the opportunity should name the definition first. Using the widest figure overstates what a software or services provider can win, and using the narrowest ignores demand served by software or in-house teams.' },
    ],
    visualKind: 'ent-m1-41-vietnam-market', visualHeading: 'Vietnam IT services market, estimates and projection',
    visualIntro: 'Compare the 2025 and 2026 estimates with the 2031 projection, in US$ billion.',
    imageAlt: 'Casemate bar chart of Mordor Intelligence estimates for the Vietnam IT services market',
    keyTerms: [
      { term: 'CAGR', definition: 'Compound annual growth rate: the steady yearly rate that would take a value from its start to its end.' },
      { term: 'IT outsourcing', definition: 'Contracting an external provider to run or build technology work.' },
      { term: 'Digital technology industry', definition: 'Vietnam’s official grouping, which includes hardware and electronics as well as software and services.' },
      { term: 'Third-party estimate', definition: 'A figure produced by a research firm rather than counted by an official statistic.' },
    ],
    recap: [
      'Vietnam’s IT services market is estimated at US$2.37 billion in 2025.',
      'It is projected to reach US$4.39 billion by 2031.',
      'Software, services and total digital industry figures use different definitions.',
      'No public figure for enterprise software alone was found.',
    ],
    chapterRecap: 'The industry is expanding as businesses, government and export clients invest in digital capabilities. Market size depends on definition, so software, IT services, outsourcing, hardware and wider industry totals must be kept separate.',
    deepDiveTitle: 'Reading three Vietnam numbers without mixing them',
    body: <EntDeepDive paragraphs={[
      'The US$198 billion digital technology figure is dominated by hardware and electronics exports, so it says little about enterprise software. The US$13 billion software figure comes from an industry association and covers a wider range of software than enterprise applications. The US$2.37 billion services figure is a research estimate with its own assumptions.',
      'A sound summary quotes each with its source and year, and explains what it includes.' ]} evidence="Services estimates are from Mordor Intelligence and Vietnam Briefing; the software figure is from VINASA via VnEconomy (2024); the industry total is from the Ministry of Science and Technology via VietnamPlus (2025). The advice to separate definitions is our own." />,
    sources: citeEnt('mordorVietnamIt', 'vietnamBriefingIt', 'vneconomyVinasa', 'vietnamplusDigitalTech'),
  }),
  entChapter({
    title: 'Key Players and Competitive Positioning', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the kinds of providers in Vietnam and use FPT as a documented example without treating it as a ranking.',
    mateIntro: 'Vietnam’s providers range from one national champion to thousands of small teams. Each competes differently.',
    keyInsight: 'Vietnam’s competitive landscape includes domestic technology groups, specialist software companies, system integrators, global vendors, and international outsourcing clients with local delivery teams. Competitive advantage depends on engineering talent, domain knowledge, security, delivery reliability, and the ability to move into higher-value services.',
    statTiles: [
      { value: '5', label: 'Key positioning activities', subtitle: 'Groups, specialists and global vendors', description: 'Domestic technology groups, specialist software companies, system integrators, global vendors and offshore delivery centers.' },
      { value: 'VND 44,475B', label: 'FPT technology sector revenue in 2025', subtitle: 'FPT annual report, company-reported, +13.7%', description: '63.4% of group revenue and 45.3% of pre-tax profit.' },
      { value: '79.6%', label: 'Share of FPT technology revenue from foreign-market IT services', subtitle: 'Our arithmetic: VND 35,382B of VND 44,475B', description: 'Using the company’s reported figures; the rest is mainly domestic services and other activities.' },
    ],
    statsNote: 'The first tile is a count from this lesson. FPT figures are company-reported and the 79.5% is our own division of two reported numbers. One company does not describe the whole market.',
    narrative: [
      { label: 'What it is', text: 'Providers include large domestic technology groups, specialist software companies, system integrators serving banks and government, global vendors selling platforms through local partners, and offshore delivery centres run for international clients. Positioning ranges from low-cost engineering capacity to industry specialists and managed-service providers.' },
      { label: 'Why it is happening', text: 'Customers choose partners on talent, domain knowledge, security and delivery reliability. Providers that began with outsourced coding are moving toward consulting, digital transformation and managed services, where margins and customer relationships can be stronger.' },
      { label: 'Real-world example', text: 'A global vendor may sell a platform through a local partner, while a domestic integrator customises it and an offshore centre builds add-ons for the same customer’s overseas arm.' },
      { label: 'Vietnam example', text: 'FPT reports technology sector revenue of VND 44,475 billion in 2025. Its overseas IT services earned VND 35,382 billion, of which digital transformation was VND 16,751 billion, and its domestic IT services earned VND 9,093 billion, up 11.5%, though domestic pre-tax profit of VND 416 billion fell 9.7%. FPT says it is moving contracts from time-and-materials to managed services and describes an AI-first strategy with an 8.2% productivity gain. The overlapping bars should not be added, and no public ranking of Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Differentiation is increasingly about moving up the value chain and showing results. Providers that stay in commodity coding compete on price, while those with domain knowledge, security credentials and managed-service capability can defend margins.' },
    ],
    visualKind: 'ent-m1-42-players', visualHeading: 'FPT technology revenue by activity, 2025',
    visualIntro: 'Compare FPT’s reported revenue lines, in VND billion, and note which overlap.',
    imageAlt: 'Casemate bar chart of FPT 2025 technology sector revenue by segment',
    keyTerms: [
      { term: 'Time-and-materials', definition: 'A contract that bills for the hours and resources used.' },
      { term: 'Managed services', definition: 'A contract in which the provider runs and improves a system for an agreed outcome.' },
      { term: 'Value chain', definition: 'The sequence of activities from basic coding to consulting and transformation.' },
      { term: 'AI-first', definition: 'A company strategy that places AI at the centre of its products and delivery methods.' },
    ],
    recap: [
      'Providers range from national groups to specialists and global vendors.',
      'Advantage rests on talent, domain knowledge, security and reliability.',
      'Leading providers earn most IT services revenue abroad.',
      'Moving to higher-value services is the common strategy.',
    ],
    chapterRecap: 'Vietnam’s landscape mixes domestic groups, specialists, integrators, global vendors and offshore centres. Advantage depends on talent, domain knowledge, security, reliability and the ability to move into higher-value services.',
    deepDiveTitle: 'What one company can and cannot tell you',
    body: <EntDeepDive paragraphs={[
      'FPT is the most documented Vietnamese provider, so its numbers are tempting proxies for the market. But its revenue includes activities beyond enterprise IT services, and its overseas mix is unusually large.',
      'Use FPT to illustrate a strategy, and look for other evidence before generalising.' ]} evidence="FPT figures are from its 2025 annual report and earnings report and are company-reported; the 79.5% share is our own arithmetic; the generalisation caution is our own." />,
    sources: citeEnt('fptTechnology2025', 'fptGlobalIt2025', 'fptEarnings2025'),
  }),
  entChapter({
    title: 'Customer Demand and Adoption Across Industries', chapterTitle: LESSON, readingTime: '6',
    objective: 'Match customer segments to what they buy and the pressures that shape adoption.',
    mateIntro: 'A bank, a factory and a government office all buy technology, but they ask very different questions first.',
    keyInsight: 'Demand for enterprise software and IT services is broad but varies by industry priorities. Banking, manufacturing, retail, government, and SMEs adopt technology at different speeds depending on regulation, budget, data maturity, and the clarity of expected returns.',
    statTiles: [
      { value: '5', label: 'Key customer segments', subtitle: 'Banking to SME digitalisation', description: 'Banking and financial services, manufacturing, retail, government and SMEs.' },
      { value: '26.55%', label: 'Share of Vietnam IT services demand from banking, financial services and insurance in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'The largest customer vertical in the estimate.' },
      { value: '12.74%', label: 'Annual growth rate of SME demand', subtitle: 'Mordor Intelligence', description: 'SMEs grow faster than large enterprises, which hold 67.72% of value.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Shares and growth rates are third-party estimates for IT services only and do not describe software spending.',
    narrative: [
      { label: 'What it is', text: 'Banks and financial institutions buy transaction platforms, risk analytics, regulatory reporting, identity management and cybersecurity. Manufacturers buy ERP, production planning, warehouse management and supply-chain analytics. Retail and consumer businesses buy point-of-sale, e-commerce, inventory and customer management. Government buys digital administration, data integration and citizen platforms. SMEs buy cloud accounting, collaboration, HR and packaged software.' },
      { label: 'Why it is happening', text: 'Priorities differ: banks emphasise security and control, factories emphasise operations, retailers emphasise visibility, public agencies emphasise service delivery and SMEs emphasise affordability and speed. Demand is shifting toward integrated solutions for end-to-end processes, so industry knowledge increasingly wins projects.' },
      { label: 'Real-world example', text: 'A manufacturer may start with warehouse management and then connect production planning and supply-chain analytics, while an SME may begin with cloud accounting because it needs no servers and a small budget.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates that banking, financial services and insurance represented 26.55% of IT services demand in 2025, and that large enterprises held 67.72% of value while SME demand is growing at 12.74% a year. The 2025–30 national cloud programme sets targets for government agencies and state enterprises, and the Ministry of Science and Technology reports about US$36 billion of e-commerce revenue in 2025. No source was found for adoption rates by industry for enterprise software specifically.' },
      { label: 'Business impact', text: 'Providers need vertical knowledge and tailored offers. Selling one product to all sectors is harder than packaging solutions for the questions each customer segment asks first.' },
    ],
    visualKind: 'ent-m1-43-demand', visualHeading: 'Five customer segments and what they buy',
    visualIntro: 'Review each segment’s typical purchases and its first priority.',
    imageAlt: 'Casemate cards showing five customer segments and what each buys',
    keyTerms: [
      { term: 'BFSI', definition: 'Banking, financial services and insurance.' },
      { term: 'POS', definition: 'Point-of-sale: the system that records a sale and updates stock.' },
      { term: 'Data maturity', definition: 'How well an organisation collects, cleans and uses its data.' },
      { term: 'SME', definition: 'Small and medium-sized enterprise.' },
    ],
    recap: [
      'Demand is broad but priorities differ by industry.',
      'Banking leads IT services demand in the Mordor estimate.',
      'SME demand is growing faster than large-enterprise demand.',
      'Industry knowledge increasingly wins projects.',
    ],
    chapterRecap: 'Demand is broad but varies by industry priority. Banking, manufacturing, retail, government and SMEs adopt technology at different speeds depending on regulation, budget, data maturity and clarity of returns.',
    deepDiveTitle: 'Why SMEs grow faster but large firms still dominate value',
    body: <EntDeepDive paragraphs={[
      'Large enterprises account for most spending, but they are already well served. SMEs start from a smaller base, so a modest rise in cloud adoption produces a high growth rate.',
      'For providers, the choice is between fewer, larger contracts and many smaller ones that need packaged, easy-to-adopt products.' ]} evidence="Shares and growth rates are from Mordor Intelligence; e-commerce revenue is from the Ministry of Science and Technology via VietnamPlus; the cloud programme is from the Vietnam Government news portal. The explanation of growth from a small base is our own reasoning." />,
    sources: citeEnt('mordorVietnamIt', 'vietnamplusDigitalTech', 'vietnamCloudProgram'),
  }),
];

const quiz = entQuiz('ent-m1-l4', [
  { chapter: '1', objective: 'Recall the estimate', question: 'What does Mordor estimate for Vietnam’s IT services market in 2026?', application: 'A slide needs the number. What is it?', correct: 'About US$2.63 billion, projected to reach US$4.39 billion by 2031', wrong: ['About US$263 billion', 'About US$0.26 billion', 'No estimate exists'], explanation: 'It is an estimate. Review Chapter 1.' },
  { chapter: '1', objective: 'Know the scope', question: 'What does Mordor’s estimate cover?', application: 'A student says it includes enterprise software. What is the correction?', correct: 'IT services only, not enterprise software or hardware', wrong: ['All software and hardware', 'Only hardware', 'Only e-commerce'], explanation: 'Scope matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Separate definitions', question: 'Why is the US$198 billion digital technology figure not the enterprise software market?', application: 'A pitch uses it as its market. What is wrong?', correct: 'It includes hardware and electronics exports and wider digital industry activity', wrong: ['It is a monthly figure', 'It is only services', 'It is a Gartner forecast'], explanation: 'Definitions differ. Review Chapter 1.' },
  { chapter: '2', objective: 'Recall FPT revenue', question: 'What did FPT report for technology sector revenue in 2025?', application: 'A case study needs the figure. What is it?', correct: 'VND 44,475 billion', wrong: ['VND 44 billion', 'VND 4,447 billion', 'VND 444,750 billion'], explanation: 'It is company-reported. Review Chapter 2.' },
  { chapter: '2', objective: 'Read a chart correctly', question: 'Why must the FPT bars not be added together?', application: 'A student sums the bars. What is the problem?', correct: 'Digital transformation is a component of overseas IT services, so the bars overlap', wrong: ['They use different currencies', 'They are in different years', 'They are estimates for 2031'], explanation: 'Overlap would double count. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe the strategic direction', question: 'What shift does FPT describe in its overseas contracts?', application: 'A manager asks about the trend. What is it?', correct: 'From time-and-materials toward managed services', wrong: ['From managed services to hourly billing', 'From software to farming', 'From overseas to none'], explanation: 'Higher-value work. Review Chapter 2.' },
  { chapter: '2', objective: 'Use evidence honestly', question: 'What should be said about a ranking of Vietnamese providers?', application: 'A slide shows market shares. What is the correction?', correct: 'No public ranking was found, so none is shown', wrong: ['FPT holds all share', 'Gartner publishes it', 'It is the same as the global ranking'], explanation: 'Evidence gaps are stated. Review Chapter 2.' },
  { chapter: '3', objective: 'Recall the largest vertical', question: 'Which vertical had the largest share of IT services demand in the Mordor estimate?', application: 'A seller picks a target sector. Which leads?', correct: 'Banking, financial services and insurance, at 26.55%', wrong: ['Agriculture at 90%', 'Tourism at 50%', 'Mining at 99%'], explanation: 'BFSI leads. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare segments', question: 'How does SME demand compare with large-enterprise demand?', application: 'A planner wants the faster-growing group. Which is it?', correct: 'SMEs are growing faster at 12.74% a year, but large enterprises hold most value', wrong: ['SMEs shrink', 'Large firms have no demand', 'They are identical'], explanation: 'Base size matters. Review Chapter 3.' },
  { chapter: '3', objective: 'Match priority to segment', question: 'What do banks emphasise when buying technology?', application: 'A vendor prepares a banking pitch. What leads?', correct: 'Security and control', wrong: ['Lowest decoration cost', 'Fashion trends', 'Weather data'], explanation: 'Regulation shapes priorities. Review Chapter 3.' },
]);

export const LESSON_ENT_4: EntM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can read Vietnam’s market figures by definition, describe how providers compete and match customer segments to their priorities.',
    keyTakeaways: [
      'Vietnam IT services are estimated at US$2.37 billion in 2025 and US$4.39 billion by 2031.',
      'Software, services and total digital industry figures must be kept separate.',
      'FPT illustrates a move from outsourced coding toward managed services, but it is not a ranking.',
      'Banking leads IT services demand, and SMEs are growing faster than large enterprises.',
      'No public figures were found for enterprise software alone or provider market shares.',
    ],
    businessImplications: 'Name the definition before sizing the market, specialise by vertical and package offers for the segment’s first priority.',
    remember: 'Three Vietnam numbers, three definitions: never add them together.',
    nextLesson: 'What Drives Industry Change',
  },
};
