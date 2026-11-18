import { EntDeepDive, citeEnt3, entM3Chapter, entQuiz } from './entM3Core';
import type { EntM3LessonBundle } from './entM3Core';

const LESSON = '3. Customer Segments & Needs';

const deck = [
  entM3Chapter({
    title: 'Large Enterprises and Multinational Corporations', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe what large enterprises buy and why their purchasing is slow, formal and risk-driven.',
    mateIntro: 'A large company does not buy a tool. It buys assurance that a complicated machine will keep running.',
    keyInsight: 'Large enterprises purchase integrated capabilities and risk-managed delivery, not simply individual software features. Providers must demonstrate technical depth, implementation capacity, governance, and long-term support.',
    statTiles: [
      { value: '5', label: 'Key large-enterprise needs', subtitle: 'Integration to transformation programs', description: 'Enterprise integration, legacy modernization, security and compliance, strategic account management and transformation programs.' },
      { value: '67.72%', label: 'Share of Vietnam IT services value held by large enterprises in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'For IT services only, not enterprise software.' },
      { value: '26.55%', label: 'Share of Vietnam IT services demand from banking, financial services and insurance in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'The largest customer vertical in the estimate.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other figures are third-party estimates for Vietnam IT services and do not describe software spending.',
    narrative: [
      { label: 'What it is', text: 'Large enterprises and multinational corporations typically operate complex technology environments across multiple departments, locations, and business units. They may require integration among legacy applications, enterprise platforms, data systems, cloud services, and external partners.' },
      { label: 'Why it is happening', text: 'These customers often place strong emphasis on reliability, cybersecurity, compliance, scalability, governance, and vendor accountability. Purchasing decisions may involve IT leaders, business executives, procurement teams, finance departments, and risk or compliance functions, resulting in longer sales cycles and formal evaluation processes.' },
      { label: 'Real-world example', text: 'Providers connect systems across departments, subsidiaries and geographic markets; replace or modernise older applications while keeping the business running; apply access controls, audit processes, security monitoring and regulatory requirements; coordinate stakeholders, manage contracts and build long-term customer relationships; and deliver multi-phase projects covering cloud migration, data platforms, AI or enterprise-wide process redesign.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates that large enterprises held 67.72% of Vietnam’s IT services value in 2025 and that banking, financial services and insurance made up 26.55% of demand; both are third-party estimates. FPT lists national and provincial digital systems among its services, a company report. Vietnam’s Personal Data Protection Law took effect on 1 January 2026 and its Law on Cybersecurity takes effect on 1 July 2026, which add compliance requirements for these buyers. No public data on sales-cycle length or the number of decision-makers involved in Vietnamese enterprise purchases was found.' },
      { label: 'Business impact', text: 'Large enterprises offer opportunities for complex, high-value engagements but require substantial delivery capability and risk management. Providers need to combine technical expertise with disciplined project governance and long-term account management.' },
    ],
    visualKind: 'ent-m3-31-large', visualHeading: 'Five things large enterprises buy',
    visualIntro: 'Explore the five needs around the idea of risk-managed delivery.',
    imageAlt: 'Casemate mind map of five needs of large enterprises around risk-managed delivery',
    keyTerms: [
      { term: 'Legacy system', definition: 'An older application or platform that is still essential to operations.' },
      { term: 'Governance', definition: 'The rules and responsibilities that control how technology decisions are made and checked.' },
      { term: 'Strategic account', definition: 'A key customer relationship managed over the long term across many stakeholders.' },
      { term: 'Multi-phase programme', definition: 'A large project delivered in stages rather than all at once.' },
    ],
    recap: [
      'Large enterprises buy integrated capability and risk-managed delivery.',
      'Reliability, security, compliance and accountability are priorities.',
      'Many stakeholders make purchasing slow and formal.',
      'Providers need technical depth, governance and long-term support.',
    ],
    chapterRecap: 'Large enterprises offer opportunities for complex, high-value engagements but require substantial delivery capability and risk management. Providers need to combine technical expertise with disciplined project governance and long-term account management.',
    deepDiveTitle: 'Why many voices make the sale slow',
    body: <EntDeepDive paragraphs={[
      'IT wants a system that fits its architecture, finance wants a predictable cost, security wants proof of controls and procurement wants comparable bids. Each can pause the process until its concerns are answered.',
      'Providers that prepare evidence for each group in advance shorten the cycle, while those that sell only to one sponsor often stall.' ]} evidence="The customer needs and purchasing pattern are from the supplied brief; the Vietnam shares are from Mordor Intelligence; FPT’s services are from its annual report; the laws are from the Official Gazette and Luat Viet Nam summaries. The advice on preparing evidence for each group is our own." />,
    sources: citeEnt3('mordorVietnamIt', 'fptTechnology2025', 'pdplGazette', 'cyberLaw2025'),
  }),
  entM3Chapter({
    title: 'Small and Medium-Sized Enterprises (SMEs)', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain what SMEs want from technology and why adoption and continued use are hard to sustain.',
    mateIntro: 'A small firm with no IT department needs software that works on day one, costs little and does not need an expert to keep it going.',
    keyInsight: 'SMEs value simplicity, affordability, and rapid realization of benefits. Providers can serve this segment effectively through standardized packages, transparent pricing, guided onboarding, and scalable support.',
    statTiles: [
      { value: '5', label: 'Key SME needs', subtitle: 'Affordable SaaS to scalable packages', description: 'Affordable SaaS products, packaged implementation, managed IT support, digital skills enablement and scalable service packages.' },
      { value: '97%+', label: 'Share of Vietnam’s roughly 900,000 active businesses that are SMEs in 2024', subtitle: 'Ken Research, market research estimate', description: 'A broad base of potential customers, mostly very small.' },
      { value: '12.74%', label: 'Annual growth rate of Vietnam SME IT services demand', subtitle: 'Mordor Intelligence, third-party estimate', description: 'Faster than demand from large enterprises.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Both figures are third-party market estimates and should not be treated as official statistics.',
    narrative: [
      { label: 'What it is', text: 'SMEs often seek technology solutions that are affordable, easy to implement, and manageable without large internal IT teams. Common priorities include accounting, sales management, inventory control, payroll, collaboration, cybersecurity, and customer communication.' },
      { label: 'Why it is happening', text: 'Cloud-based software and standardized service packages can reduce the need for upfront infrastructure investment. However, SMEs may face budget constraints, limited technical knowledge, integration challenges, and uncertainty about which digital investments will generate meaningful returns.' },
      { label: 'Real-world example', text: 'Providers offer subscription-based accounting, CRM, HRM, collaboration and productivity applications; give predefined deployment plans, templates and configuration options to control cost and complexity; maintain devices, networks, applications, backups and basic cybersecurity; train employees and business owners to use software effectively; and let customers add users, features, storage or support as they grow.' },
      { label: 'Vietnam example', text: 'A 2025 national survey by VINASME and the Ministry of Science and Technology, reported by VietnamPlus, found 69% of businesses at basic use (email, accounting software), 16% at system integration, 10% fully digitised with AI and 5% not started. A World Bank study of a Vietnamese cloud ERP provider found that close to 80% of firms used the platform after initial training, about 40% afterwards and 35% about 18 months later, even though access was free. Ken Research estimates about 183,000 paid SME cloud ERP subscriptions in 2025. These are a survey, a study and a market estimate with different scopes.' },
      { label: 'Business impact', text: 'SMEs represent a broad market for accessible and standardized technology solutions. Providers should reduce purchasing and implementation complexity while making the financial and operational benefits easy to understand.' },
    ],
    visualKind: 'ent-m3-32-sme', visualHeading: 'How far Vietnamese businesses have digitised',
    visualIntro: 'Compare the shares of surveyed businesses at each stage of digital maturity, in percent.',
    imageAlt: 'Casemate bar chart of the digital maturity of Vietnamese businesses in a 2025 survey',
    keyTerms: [
      { term: 'SME', definition: 'Small and medium-sized enterprise.' },
      { term: 'Packaged implementation', definition: 'A predefined deployment plan with templates and options that limits cost and complexity.' },
      { term: 'Digital skills enablement', definition: 'Training staff and owners to use software effectively.' },
      { term: 'Scalable package', definition: 'A service bundle to which users, features or support can be added as the customer grows.' },
    ],
    recap: [
      'SMEs want technology that is affordable, simple and quick to benefit from.',
      'Cloud and standard packages cut upfront cost.',
      'Budget, skills and uncertainty about returns are barriers.',
      'Transparent pricing, guided onboarding and scalable support suit the segment.',
    ],
    chapterRecap: 'SMEs represent a broad market for accessible and standardized technology solutions. Providers should reduce purchasing and implementation complexity while making the financial and operational benefits easy to understand.',
    deepDiveTitle: 'Why free access does not guarantee continued use',
    body: <EntDeepDive paragraphs={[
      'In the World Bank study, firms that were given a year of free access and training still stopped using the platform in large numbers. Price was not the only barrier: time, skills and confidence to change routines also matter.',
      'For providers this means onboarding and support are part of the product, and low prices alone will not keep SME customers.' ]} evidence="The SME needs are from the supplied brief; the survey is reported by VietnamPlus; the adoption figures are from a World Bank blog on one provider’s programme; the subscription and SME-share estimates are from Ken Research; the growth rate is from Mordor Intelligence. The inference about onboarding is our own reading of the study." />,
    sources: citeEnt3('vietnamplusSme', 'worldBankSme', 'kenCloudErp', 'mordorVietnamIt'),
  }),
  entM3Chapter({
    title: 'Industry-Specific and Public-Sector Customers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Show how sector workflows and regulation create demand for specialised software and why domain expertise differentiates providers.',
    mateIntro: 'A hospital, a bank and a ministry run on very different rules. Generic software rarely fits any of them well.',
    keyInsight: 'Domain expertise can differentiate providers in markets where generic technology capabilities are insufficient. Understanding industry workflows and constraints helps improve solution fit and reduces the risk of costly implementation errors.',
    statTiles: [
      { value: '5', label: 'Key sector groups', subtitle: 'Finance to public sector', description: 'Financial services, healthcare, manufacturing, retail and logistics, and the public sector.' },
      { value: '26.55%', label: 'Share of Vietnam IT services demand from banking, financial services and insurance in 2025', subtitle: 'Mordor Intelligence, third-party estimate', description: 'The only sector share found in the sources reviewed.' },
      { value: '1 Jan 2026', label: 'Effective date of Vietnam’s Personal Data Protection Law 91/2025/QH15', subtitle: 'Official Gazette', description: 'Maximum administrative fine of VND 3 billion for most violations.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The sector share is a third-party estimate for IT services only. The legal date and fine come from an official gazette entry and should be checked against the current text.',
    narrative: [
      { label: 'What it is', text: 'Some customers require software and services tailored to specialized operating environments. Banks, hospitals, manufacturers, retailers, logistics companies, and government agencies have different workflows, data requirements, service expectations, and regulatory obligations.' },
      { label: 'Why it is happening', text: 'Industry-specific expertise can help providers develop solutions that address these needs more precisely than generic offerings. However, specialization may require additional investment in domain knowledge, compliance, integration, certification, and long-term customer support.' },
      { label: 'Real-world example', text: 'Financial customers need core banking systems, payment processing, fraud monitoring, risk management and regulatory reporting; healthcare needs patient information, clinical workflows, scheduling, billing and secure data exchange; manufacturers integrate ERP, production planning, industrial systems, quality management and supply-chain data; retail and logistics need inventory, e-commerce, warehouse management, distribution and demand forecasting; and the public sector needs administrative platforms, digital public services, data management and integration subject to applicable procurement and compliance rules.' },
      { label: 'Vietnam example', text: 'Mordor Intelligence estimates that banking, financial services and insurance made up 26.55% of Vietnam’s IT services demand in 2025. FPT lists national and provincial digital systems among its services, and the 2025–30 national cloud programme sets cloud targets for all government agencies and state enterprises. Vietnam’s Personal Data Protection Law, effective 1 January 2026, affects customers that handle personal data such as patients and bank clients. Public-sector procurement rules were not reviewed here, and no Vietnam-specific data on healthcare, manufacturing or retail technology spending was found.' },
      { label: 'Business impact', text: 'Industry-specific and public-sector customers create opportunities for specialized software and services. Providers must combine technical delivery with deep domain knowledge and a clear understanding of sector-specific operational and regulatory requirements.' },
    ],
    visualKind: 'ent-m3-33-sector', visualHeading: 'Five sectors with specialised needs',
    visualIntro: 'Explore the five sector groups around the idea of domain expertise.',
    imageAlt: 'Casemate mind map of five sector groups with specialised needs around domain expertise',
    keyTerms: [
      { term: 'Domain expertise', definition: 'Deep knowledge of a customer’s industry, its workflows and its rules.' },
      { term: 'Core banking system', definition: 'The central software that records accounts and processes a bank’s main transactions.' },
      { term: 'Clinical workflow', definition: 'The sequence of steps clinicians follow to care for a patient.' },
      { term: 'Public procurement', definition: 'The rules a government body follows to buy goods and services.' },
    ],
    recap: [
      'Different sectors have different workflows, data and regulations.',
      'Specialised expertise gives better solution fit than generic offers.',
      'Specialization needs investment in knowledge, compliance and certification.',
      'Domain knowledge reduces costly implementation errors.',
    ],
    chapterRecap: 'Industry-specific and public-sector customers create opportunities for specialized software and services. Providers must combine technical delivery with deep domain knowledge and a clear understanding of sector-specific operational and regulatory requirements.',
    deepDiveTitle: 'The cost of specialising',
    body: <EntDeepDive paragraphs={[
      'Becoming expert in a sector means hiring people who know its rules, building certified integrations and supporting customers for years. That investment narrows the provider’s market but makes it harder for generic competitors to follow.',
      'The choice is between breadth with less depth and depth with a smaller addressable market.' ]} evidence="Sector needs are from the supplied brief; the banking share is from Mordor Intelligence; FPT’s services are from its annual report; the law is from the Official Gazette; the cloud programme is from the Vietnam Government news portal. The breadth-versus-depth framing restates the brief’s point on specialization in our own words." />,
    sources: citeEnt3('mordorVietnamIt', 'fptTechnology2025', 'vietnamCloudProgram', 'pdplGazette'),
  }),
];

const quiz = entQuiz('ent-m3-l3', [
  { chapter: '1', objective: 'State what large enterprises buy', question: 'What do large enterprises purchase?', application: 'A vendor lists features in a pitch to a multinational. What is missing?', correct: 'Integrated capabilities and risk-managed delivery, not just individual features', wrong: ['Only the cheapest licence', 'Only a logo', 'Only hardware'], explanation: 'They buy assurance. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain the long sales cycle', question: 'Why are sales cycles to large enterprises long?', application: 'A deal stalls for months. What is a likely reason?', correct: 'Many stakeholders, including IT, executives, procurement, finance and risk, are involved', wrong: ['Nobody needs the product', 'The product is free', 'Contracts are never signed'], explanation: 'Many voices decide. Review Chapter 1.' },
  { chapter: '1', objective: 'Read estimates correctly', question: 'How should Mordor’s 67.72% large-enterprise share be described?', application: 'A slide calls it an official software statistic. What is the correction?', correct: 'As a third-party estimate of Vietnam IT services value', wrong: ['As a Gartner forecast', 'As a law', 'As an FPT result'], explanation: 'Label estimates. Review Chapter 1.' },
  { chapter: '2', objective: 'State SME priorities', question: 'What do SMEs value in technology?', application: 'A vendor designs for small firms. What should it emphasise?', correct: 'Simplicity, affordability and rapid realization of benefits', wrong: ['Complex governance', 'Long contracts', 'Custom code for each user'], explanation: 'SMEs want ease. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the survey result', question: 'What did the 2025 national survey find about most Vietnamese businesses?', application: 'A speaker needs the headline. What is it?', correct: '69% were at basic use such as email and accounting software', wrong: ['69% had integrated AI', '69% had not started', '69% used ERP only'], explanation: 'Most firms are early stage. Review Chapter 2.' },
  { chapter: '2', objective: 'Interpret the adoption study', question: 'What did the World Bank study show about free access to a cloud ERP?', application: 'A vendor assumes free trials guarantee adoption. What is the correction?', correct: 'Usage fell from close to 80% after training to about 35% after 18 months', wrong: ['Usage rose to 100%', 'Nobody used it', 'Usage never changed'], explanation: 'Retention is hard. Review Chapter 2.' },
  { chapter: '2', objective: 'Label market estimates', question: 'How should the 183,000 paid SME subscriptions be described?', application: 'A slide calls it an official count. What is the correction?', correct: 'As a Ken Research market estimate with a stated scope', wrong: ['As a census', 'As a law', 'As a company audit'], explanation: 'Estimates have scope. Review Chapter 2.' },
  { chapter: '3', objective: 'State the value of domain expertise', question: 'Why does domain expertise help providers?', application: 'A generic tool fails in a hospital. What would have helped?', correct: 'It improves solution fit and reduces the risk of costly implementation errors', wrong: ['It removes regulation', 'It eliminates all costs', 'It replaces technology'], explanation: 'Fit matters in sectors. Review Chapter 3.' },
  { chapter: '3', objective: 'Match sector to need', question: 'Which need belongs to financial services customers?', application: 'A vendor prepares a banking pitch. What fits?', correct: 'Core banking, payment processing, fraud monitoring and regulatory reporting', wrong: ['Clinical scheduling', 'Warehouse routing only', 'School timetables'], explanation: 'Sector needs differ. Review Chapter 3.' },
  { chapter: '3', objective: 'Use evidence honestly', question: 'What should be said about Vietnam healthcare technology spending?', application: 'A slide shows a figure. What is the correction?', correct: 'No Vietnam-specific data was found in the sources reviewed, so none is shown', wrong: ['It is always 10%', 'Gartner publishes it', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 3.' },
]);

export const LESSON_ENT3_3: EntM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe what large enterprises, SMEs and sector-specific customers need and how providers should serve each.',
    keyTakeaways: [
      'Large enterprises buy integrated, risk-managed delivery through slow, formal processes.',
      'SMEs value simplicity, affordability and fast results, and need support to keep using software.',
      'Sector customers reward domain expertise because workflows and rules differ.',
      'Surveys, studies and market estimates in this module use different scopes and are labelled.',
      'Some Vietnam data, such as sales-cycle length and sector spending, was not found.',
    ],
    businessImplications: 'Match the offer and sales approach to the customer segment, make SME onboarding part of the product and invest in sector knowledge where it creates fit.',
    remember: 'Different customers buy different things, and keep using only what fits them.',
    nextLesson: 'Revenue Streams & Cost Structure',
  },
};
