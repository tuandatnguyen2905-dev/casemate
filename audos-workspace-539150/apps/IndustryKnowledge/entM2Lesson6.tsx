import { EntDeepDive, citeEnt, entM2Chapter, entQuiz } from './entM2Core';
import type { EntM2LessonBundle } from './entM2Core';

const LESSON = '6. Global vs. Local Value Chain';

const deck = [
  entM2Chapter({
    title: 'Global Delivery Models and International Market Integration', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe offshore, nearshore and distributed delivery and the coordination they require.',
    mateIntro: 'Code can cross a border in a second. Trust, security and good communication take much longer to travel.',
    keyInsight: 'Global delivery creates scale and market access, but geographic distribution increases coordination requirements. Providers must balance cost advantages with service quality, collaboration, security, and proximity to customers.',
    statTiles: [
      { value: '5', label: 'Key global delivery activities', subtitle: 'Offshore to cross-border risk', description: 'Offshore development, nearshore delivery, global project management, international customer acquisition and cross-border risk management.' },
      { value: '5.8M', label: 'People employed in India’s technology industry in FY2025', subtitle: 'Nasscom, includes hardware', description: 'With more than 1,750 global capability centres.' },
      { value: 'US$40B+', label: 'Philippine IT-BPM revenue in 2025', subtitle: 'IBPAP via Philstar', description: 'About 1.9 million workers, in an industry that includes business process outsourcing.' },
    ],
    statsNote: 'The first tile is a count from this lesson. India’s figure includes hardware and the Philippine figure includes business process outsourcing, so neither is a like-for-like enterprise software and IT services number.',
    narrative: [
      { label: 'What it is', text: 'Enterprise Software & IT Services is inherently global because software can be distributed digitally and many technology services can be delivered remotely. Providers may develop products in one country, host them on infrastructure in another, and serve customers across multiple markets. International delivery networks enable access to specialized talent, global customer demand, and different cost structures.' },
      { label: 'Why it is happening', text: 'Global delivery models can combine local consulting and account management with offshore engineering, testing, maintenance, and technical support. Their effectiveness depends on communication, project governance, time-zone coordination, security, intellectual property protection, and the ability to meet customer-specific requirements.' },
      { label: 'Real-world example', text: 'Providers deliver engineering, testing, maintenance and support from lower-cost or specialised talent markets; use geographically or culturally closer centres to improve coordination and time-zone overlap; coordinate distributed teams through standard processes, shared documentation and collaboration platforms; serve overseas customers through direct sales, partnerships, tenders and technology ecosystems; and address contractual, privacy, cybersecurity, intellectual property and data-transfer requirements.' },
      { label: 'Vietnam example', text: 'VINASA names the United States, Japan, Europe and parts of Southeast Asia as the main markets for Vietnamese software outsourcing, and says a lack of local offices abroad limits trust-building. FPT’s milestones page records a branch in Bangalore, India in January 1999 and its first software export to North America on 13 June 1999, and its 2025 annual report names Japan as its main overseas market, with Japan revenue up 25.4%; these are company accounts. For comparison, Nasscom reports 5.8 million employees in India’s technology industry and IBPAP reports more than US$40 billion of Philippine IT-BPM revenue, figures with different scopes. No public Vietnam data on the split between offshore and nearshore delivery was found.' },
      { label: 'Business impact', text: 'Global delivery models allow providers to access international demand and distribute work across specialized locations. Competitive performance depends on maintaining consistent delivery standards and managing cross-border complexity effectively.' },
    ],
    visualKind: 'ent-m2-61-global', visualHeading: 'Five parts of a global delivery model',
    visualIntro: 'Explore the five parts around the centre and what each manages.',
    imageAlt: 'Casemate mind map of five parts of a global delivery model',
    keyTerms: [
      { term: 'Offshore', definition: 'Doing work in a distant country to access talent or lower cost.' },
      { term: 'Nearshore', definition: 'Doing work in a nearby country for easier coordination and time-zone overlap.' },
      { term: 'Data transfer', definition: 'Moving data across borders, which may be limited by contract or law.' },
      { term: 'Project governance', definition: 'The rules and reporting that keep distributed teams aligned.' },
    ],
    recap: [
      'Software and many services can be delivered remotely across borders.',
      'Offshore and nearshore centres combine with local account management.',
      'Governance, security and communication decide effectiveness.',
      'Cross-border risks include privacy, intellectual property and data transfer.',
    ],
    chapterRecap: 'Global delivery models allow providers to access international demand and distribute work across specialized locations. Competitive performance depends on maintaining consistent delivery standards and managing cross-border complexity effectively.',
    deepDiveTitle: 'Why lower cost is only one reason to deliver from abroad',
    body: <EntDeepDive paragraphs={[
      'Cost is the most visible reason, but access to specialised talent, time-zone coverage and customer proximity matter just as much. A provider that wins only on price is easy to replace.',
      'Success therefore depends on governance, security and communication that make a distant team feel like part of the customer’s own.' ]} evidence="Delivery models are from the supplied brief; Vietnamese market and trust points are from VINASA via VnEconomy; FPT dates and Japan growth are from its milestones page and annual and earnings reports and are company accounts; India and Philippine figures are from Nasscom and IBPAP via Philstar. The point about price-only competition is our own reading." />,
    sources: citeEnt('vneconomyVinasa', 'fptMilestones', 'fptGlobalIt2025', 'fptEarnings2025', 'nasscomReview', 'philstarItBpm'),
  }),
  entM2Chapter({
    title: 'Vietnam’s Position in the Global and Domestic Value Chain', chapterTitle: LESSON, readingTime: '7',
    objective: 'Place Vietnam on the spectrum from execution-focused delivery to ownership of solutions and outcomes.',
    mateIntro: 'Writing code for others is a start. Owning the product, the design and the customer relationship is where more of the value sits.',
    keyInsight: 'Vietnam’s opportunity is to move from execution-focused delivery toward greater ownership of solutions, intellectual property, and customer outcomes. Cost competitiveness can support market entry, but specialized expertise and stronger commercial capabilities are important for long-term value capture.',
    statTiles: [
      { value: '5', label: 'Key Vietnam positions', subtitle: 'Export engineering to global partnerships', description: 'Export-oriented engineering, domestic enterprise solutions, higher-value services, product and intellectual property development, and global partnerships.' },
      { value: 'US$7B', label: 'Software exports reported by VINASA for 2024', subtitle: 'VnEconomy, quoting VINASA', description: 'Out of about US$13 billion of software sector revenue.' },
      { value: '79.6%', label: 'Share of FPT IT services revenue earned overseas in 2025', subtitle: 'Our arithmetic: VND 35,382B of VND 44,475B', description: 'Using FPT’s reported overseas and domestic IT services figures.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The VINASA figure is an industry-association estimate for 2024, and the 79.6% is our own division of two company-reported numbers for one provider.',
    narrative: [
      { label: 'What it is', text: 'Vietnam participates in the global value chain through software development, testing, application maintenance, IT outsourcing, and increasingly complex digital transformation services. Its technology workforce and cost competitiveness support international delivery, while domestic enterprises create demand for business applications, system integration, cloud services, and digital modernization.' },
      { label: 'Why it is happening', text: 'The position of Vietnamese providers varies. Some primarily deliver work defined by overseas clients, while others develop proprietary software, manage customer relationships, design solutions, or provide end-to-end transformation services. Moving toward higher-value activities generally requires stronger consulting, architecture, product management, cybersecurity, and industry-specific capabilities.' },
      { label: 'Real-world example', text: 'Vietnamese firms provide software development, testing, maintenance and engineering support for overseas customers; implement ERP, CRM, HRM, accounting, analytics and sector-specific applications for Vietnamese organisations; expand into cloud architecture, AI integration, cybersecurity, enterprise consulting and system modernisation; build proprietary platforms, reusable components and specialised software; and collaborate with international vendors, integrators and cloud providers for larger projects.' },
      { label: 'Vietnam example', text: 'VINASA says the software sector accounts for about US$13 billion of Vietnam’s IT industry revenue, with US$7 billion exported in 2024, and Tuoi Tre News reports more than 2,100 firms exporting digital products and services. FPT reports overseas IT services revenue of VND 35,382 billion against domestic revenue of VND 9,093 billion in 2025, which is about 79.6% overseas by our own calculation. Its technology sector also lists semiconductor chip design, FPT AI Factory and cybersecurity, a company report of moving beyond execution. These figures describe different scopes and years and are not combined. No public data on how much Vietnamese work is client-defined versus proprietary was found.' },
      { label: 'Business impact', text: 'Vietnam occupies multiple positions in the global and domestic technology value chain. Providers can strengthen their position by combining engineering capabilities with domain knowledge, solution ownership, and closer relationships with end customers.' },
    ],
    visualKind: 'ent-m2-62-vietnam', visualHeading: 'Five positions Vietnam holds',
    visualIntro: 'Review each position and the direction it points.',
    imageAlt: 'Casemate cards showing five positions Vietnam holds in the enterprise software and IT services value chain',
    keyTerms: [
      { term: 'Execution-focused delivery', definition: 'Carrying out work whose requirements and design were set by the client.' },
      { term: 'Proprietary software', definition: 'Software a company builds and owns, as opposed to work done for a client.' },
      { term: 'End-to-end transformation', definition: 'Handling strategy, design, delivery and operation of a customer’s change programme.' },
      { term: 'Solution ownership', definition: 'Responsibility for designing and standing behind a solution, not only building it.' },
    ],
    recap: [
      'Vietnam serves overseas clients and domestic enterprises.',
      'Positions range from execution to solution and product ownership.',
      'Higher-value work needs consulting, architecture, security and industry skills.',
      'Cost competitiveness helps entry but expertise sustains value capture.',
    ],
    chapterRecap: 'Vietnam occupies multiple positions in the global and domestic technology value chain. Providers can strengthen their position by combining engineering capabilities with domain knowledge, solution ownership, and closer relationships with end customers.',
    deepDiveTitle: 'Why moving up the chain is a capability change, not a price change',
    body: <EntDeepDive paragraphs={[
      'Delivering to a specification needs strong engineers. Owning the design needs consultants who understand the customer’s industry, product managers who decide what to build and security specialists who stand behind the result.',
      'Those capabilities take time to build, which is why the shift from execution to ownership is gradual and uneven across firms.' ]} evidence="Vietnam’s positions are from the supplied brief; software figures are from VINASA via VnEconomy; the firm count is from Tuoi Tre News; FPT figures are from its annual and earnings reports and are company-reported; the 79.6% is our own division. The point about gradual capability change is our own reading." />,
    sources: citeEnt('vneconomyVinasa', 'tuoitreDigitalExports', 'fptEarnings2025', 'fptTechnology2025'),
  }),
  entM2Chapter({
    title: 'Localization, Global Standards, and Value-Chain Resilience', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why global technology needs local adaptation and how providers build resilience against disruption.',
    mateIntro: 'A system built for the world still has to work in one company, one language and one set of local rules. And it has to keep working when something breaks.',
    keyInsight: 'The most resilient value chains combine global technology capabilities with local responsiveness and effective risk management. Standardization improves efficiency, while selective localization ensures that solutions remain suitable for customer needs and operating conditions.',
    statTiles: [
      { value: '5', label: 'Key localization and resilience activities', subtitle: 'Localization to local-global collaboration', description: 'Product localization, global standards adoption, vendor diversification, operational resilience and local-global collaboration.' },
      { value: '1 Jul 2026', label: 'Effective date of Vietnam’s Law on Cybersecurity 116/2025/QH15', subtitle: 'Luat Viet Nam, English summary', description: 'It replaces the 2018 Cybersecurity Law.' },
      { value: '70%', label: 'Target share of Vietnamese private enterprises using cloud by 2030', subtitle: 'Decision 1121/QD-TTg, a policy target', description: 'With services from domestic providers.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The date comes from a legal summary and should be checked against the current text. The 70% is a government target, not an outcome.',
    narrative: [
      { label: 'What it is', text: 'Although enterprise technology is globally connected, solutions often need localization to meet customer workflows, language requirements, regulatory obligations, integration needs, and sector-specific practices. Domestic providers may have an advantage in understanding local business conditions, while international vendors can contribute mature platforms, extensive product ecosystems, and global implementation experience.' },
      { label: 'Why it is happening', text: 'The value chain must also respond to disruptions such as cybersecurity incidents, cloud outages, talent shortages, geopolitical tensions, vendor dependency, and rapid changes in technology. Resilience requires contingency planning, reliable supplier relationships, secure development practices, and the ability to maintain critical services when individual components fail.' },
      { label: 'Real-world example', text: 'Providers adapt language, interfaces, workflows, integrations and reporting to local requirements; apply recognised practices for software quality, security, service management and project governance; assess alternatives for critical infrastructure, software components and specialist services; set up backup arrangements, disaster recovery plans, incident response procedures and continuity testing; and combine international platforms with local implementation teams, domain expertise and customer support.' },
      { label: 'Vietnam example', text: 'Vietnam’s 2025–30 national cloud programme (Decision 1121/QD-TTg) targets cloud use by government agencies, state enterprises and 70% of private enterprises by 2030 using domestic providers, a policy target that favours local supply. Mordor Intelligence lists submarine-cable outages and fragmented data-privacy rules among the factors that temper growth. The Law on Data (60/2024/QH15), Personal Data Protection Law (91/2025/QH15) and Law on Cybersecurity (116/2025/QH15) set local obligations for data and systems. FPT says it received ISO 9001 certification in February 2000, a company account of adopting a global standard. No public data on disaster recovery testing or vendor diversification by Vietnamese providers was found.' },
      { label: 'Business impact', text: 'Localization and resilience help ensure that global technology capabilities work effectively in specific markets. Providers need to balance standardized delivery with local adaptation while managing dependencies across the value chain.' },
    ],
    visualKind: 'ent-m2-63-resilience', visualHeading: 'Five steps toward resilience',
    visualIntro: 'Follow the five steps from localising the product to testing continuity.',
    imageAlt: 'Casemate step diagram of five steps toward a resilient and locally relevant value chain',
    keyTerms: [
      { term: 'Localization', definition: 'Adapting a product to local language, rules, workflows and practices.' },
      { term: 'Disaster recovery', definition: 'Plans and systems that restore services after a serious failure.' },
      { term: 'Operational resilience', definition: 'The ability to keep critical services running when components fail.' },
      { term: 'Vendor diversification', definition: 'Having alternatives for critical suppliers to avoid overdependence.' },
    ],
    recap: [
      'Global products need selective local adaptation.',
      'Standards bring efficiency and consistent quality.',
      'Resilience needs contingency plans, diversified suppliers and tested recovery.',
      'Local and global capabilities work best together.',
    ],
    chapterRecap: 'Localization and resilience help ensure that global technology capabilities work effectively in specific markets. Providers need to balance standardized delivery with local adaptation while managing dependencies across the value chain.',
    deepDiveTitle: 'Why untested recovery plans are not plans',
    body: <EntDeepDive paragraphs={[
      'A disaster recovery document that has never been rehearsed may fail at the first real outage, because contact lists are out of date or backups cannot be restored.',
      'Continuity testing is what turns a written intention into a capability customers can rely on.' ]} evidence="Localization and resilience activities are from the supplied brief; the cloud programme is from the Vietnam Government news portal; the constraints are from Mordor Intelligence; legal details are from Regulations.AI, the Official Gazette and Luat Viet Nam summaries; the ISO date is from FPT’s milestones page. The point about untested plans is our own reasoning." />,
    sources: citeEnt('vietnamCloudProgram', 'mordorVietnamIt', 'dataLawOverview', 'pdplGazette', 'cyberLaw2025', 'fptMilestones'),
  }),
];

const quiz = entQuiz('ent-m2-l6', [
  { chapter: '1', objective: 'Explain why delivery is global', question: 'Why is the industry inherently global?', application: 'A firm builds in one country and serves another. Why is that possible?', correct: 'Software can be distributed digitally and many services can be delivered remotely', wrong: ['It needs physical shipping', 'It is banned domestically', 'It needs no customers'], explanation: 'Digital delivery crosses borders. Review Chapter 1.' },
  { chapter: '1', objective: 'Define nearshore', question: 'What is nearshore delivery?', application: 'A client wants better time-zone overlap. Which model fits?', correct: 'Using geographically or culturally closer delivery centres to improve coordination', wrong: ['Using the most distant location', 'Avoiding all delivery', 'Hosting only on paper'], explanation: 'Proximity helps coordination. Review Chapter 1.' },
  { chapter: '1', objective: 'State the trade-off', question: 'What does geographic distribution increase?', application: 'A global team misses deadlines. What was underestimated?', correct: 'Coordination requirements', wrong: ['Office space', 'Printing costs', 'Paper use'], explanation: 'Distance needs governance. Review Chapter 1.' },
  { chapter: '1', objective: 'Read figures carefully', question: 'Why is India’s 5.8 million employee figure not a like-for-like benchmark for Vietnam’s enterprise software workforce?', application: 'A chart compares them directly. What is missing?', correct: 'India’s figure covers a wider technology industry that includes hardware', wrong: ['It is a forecast for 2040', 'It is in different currency', 'It excludes all services'], explanation: 'Scopes differ. Review Chapter 1.' },
  { chapter: '2', objective: 'State the Vietnam opportunity', question: 'What is Vietnam’s opportunity in the value chain?', application: 'A provider only writes code to client specifications. What is the next step?', correct: 'To move from execution-focused delivery toward ownership of solutions, intellectual property and customer outcomes', wrong: ['To reduce all prices', 'To stop exporting', 'To avoid domestic customers'], explanation: 'Value moves up the chain. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall a VINASA figure', question: 'What does VINASA report for Vietnam’s software exports in 2024?', application: 'A timeline needs the number. What is it?', correct: 'About US$7 billion', wrong: ['About US$7 million', 'About US$700 billion', 'Nothing'], explanation: 'It is an association figure. Review Chapter 2.' },
  { chapter: '2', objective: 'Read a calculation correctly', question: 'How should the 79.6% overseas share of FPT’s IT services revenue be described?', application: 'A slide calls it the national share. What is the correction?', correct: 'As our own division of two company-reported figures for one provider', wrong: ['As an official statistic', 'As a Gartner forecast', 'As a law'], explanation: 'Label calculations. Review Chapter 2.' },
  { chapter: '3', objective: 'Balance standards and localisation', question: 'What do standardization and selective localization each provide?', application: 'A vendor changes everything for every customer. What is wrong?', correct: 'Standardization improves efficiency, while selective localization keeps solutions suitable for local needs', wrong: ['Standardization removes all risk', 'Localization removes all standards', 'Neither matters'], explanation: 'Balance both. Review Chapter 3.' },
  { chapter: '3', objective: 'Name a resilience activity', question: 'Which is an operational resilience activity?', application: 'A continuity plan lists actions. Which belongs?', correct: 'Backup arrangements, disaster recovery plans, incident response procedures and continuity testing', wrong: ['Removing all backups', 'Ignoring outages', 'Deleting documentation'], explanation: 'Resilience needs contingency. Review Chapter 3.' },
  { chapter: '3', objective: 'Read a target correctly', question: 'How should the 70% cloud use by 2030 be described?', application: 'A slide says 70% of firms use cloud today. What is the correction?', correct: 'As a policy target under Decision 1121/QD-TTg, not a measured result', wrong: ['As audited 2025 data', 'As a global average', 'As an FPT result'], explanation: 'Targets are aims. Review Chapter 3.' },
]);

export const LESSON_ENT2_6: EntM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe global delivery models, Vietnam’s position in the chain and how localization and resilience work together.',
    keyTakeaways: [
      'Global delivery brings scale and access but raises coordination, security and quality demands.',
      'Delivery hubs differ in scope, so their figures are not directly comparable.',
      'Vietnam’s opportunity is to move toward ownership of solutions and customer outcomes.',
      'Standardise for efficiency and localise where it matters.',
      'Targets, company claims and our own calculations are labelled in this module.',
    ],
    businessImplications: 'Build governance and security into distributed delivery, invest in higher-value capabilities and plan, diversify and test for resilience.',
    remember: 'Global reach wins the work; local fit and resilience keep it.',
    nextLesson: 'Back to module overview',
  },
};
