import { EntDeepDive, citeEnt5, entM5Chapter, entQuiz } from './entM5Core';
import type { EntM5LessonBundle } from './entM5Core';

const LESSON = '3. Market & Channel Trends';

const deck = [
  entM5Chapter({
    title: 'Continued Cloud Adoption and Recurring Software Revenue', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why recurring, cloud-delivered software revenue keeps growing and what it demands from providers.',
    mateIntro: 'A subscription is a promise renewed every period. Recurring revenue rewards the provider that keeps proving value.',
    keyInsight: 'Cloud adoption continues to move software revenue from one-off licences toward recurring subscriptions, usage and services. Recurring models can make revenue steadier, but they require providers to prove continuing value and keep costs and pricing transparent.',
    statTiles: [
      { value: '6', label: 'Key cloud and recurring-revenue activities', subtitle: 'Subscriptions to pricing evolution', description: 'Subscription models, cloud-delivered applications, usage-based pricing, managed services, customer success and retention, and pricing evolution.' },
      { value: '15.5%', label: 'Forecast growth in worldwide software spending in 2026', subtitle: 'Gartner, July 2026 forecast', description: 'About US$1,468 billion, a global figure for all software.' },
      { value: 'US$356.7M', label: 'Forecast value of Vietnam’s cloud ERP for SMEs market by 2031', subtitle: 'Ken Research, from about US$126.8M in 2025', description: 'A third-party estimate for one narrow category.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The global software forecast and the Ken Research estimate have different scopes and are not comparable or additive.',
    narrative: [
      { label: 'What it is', text: 'Recurring software revenue comes from customers paying regularly for access to software and related services, rather than paying a large one-off licence fee. It includes subscriptions, usage-based charges and managed services, and it increasingly depends on whether customers renew and expand their use.' },
      { label: 'Why it is happening', text: 'Cloud delivery lets providers update software continuously and bill by period or by use, and it lets customers start with a smaller commitment. Deloitte expects subscription and seat-based licensing to give way gradually to hybrid usage- and outcome-based pricing, which adds complexity to how software is sold and measured.' },
      { label: 'Real-world example', text: 'Providers sell subscriptions that bundle software, updates and support; deliver applications from the cloud without customer-run servers; add usage-based pricing tied to volume or activity; offer managed services for ongoing operation and optimisation; invest in customer success and retention programmes so that customers keep using what they pay for; and adjust pricing as AI features and outcome-based models change what customers value.' },
      { label: 'Vietnam example', text: 'Ken Research estimates Vietnam’s cloud ERP for SMEs at about US$126.8 million in 2025, US$150.5 million in 2026 (forecast) and US$356.7 million in 2031 (forecast). MISA reports accounting software users rising from more than 214,000 businesses at the end of 2024 to 254,556 after seven months of 2025, and lists annual plans from VND 2,950,000, though its own pages show different starting prices; these are vendor claims and list prices. The World Bank case study found only 35% of trial users still active after about 18 months, which shows why retention matters. No public Vietnam-wide figure for recurring software revenue was found.' },
      { label: 'Business impact', text: 'Recurring revenue improves predictability but raises the bar on service quality, customer success and pricing clarity. Providers that keep customers using and renewing will be stronger than those that only win initial sales.' },
    ],
    visualKind: 'ent-m5-31-recurring', visualHeading: 'Estimated Vietnam cloud ERP for SMEs market',
    visualIntro: 'Read the three bars as estimates and forecasts for one narrow category.',
    imageAlt: 'Casemate bar chart of Ken Research estimates for Vietnam cloud ERP for SMEs in 2025, 2026 and 2031',
    keyTerms: [
      { term: 'Recurring revenue', definition: 'Income that repeats each period, such as monthly or annual subscription fees.' },
      { term: 'Usage-based pricing', definition: 'Charging according to how much a customer uses a service.' },
      { term: 'Churn', definition: 'The share of customers or revenue lost over a period.' },
      { term: 'Customer success', definition: 'A function that helps customers get value so that they stay and expand.' },
    ],
    recap: [
      'Cloud delivery shifts revenue from one-off licences to recurring payments.',
      'Pricing is moving toward usage and outcomes in some areas.',
      'Retention and customer success protect recurring revenue.',
      'Vietnam figures here are third-party estimates and vendor claims.',
    ],
    chapterRecap: 'Recurring revenue improves predictability but raises the bar on service quality, customer success and pricing clarity. Providers that keep customers using and renewing will be stronger than those that only win initial sales.',
    deepDiveTitle: 'Why subscriptions reward retention more than signing',
    body: <EntDeepDive paragraphs={[
      'With a one-off licence, much of the revenue arrives at signing. With a subscription, the revenue arrives only as long as the customer stays, so a customer who stops using the software eventually stops paying.',
      'This is why customer success and clear pricing move from supporting roles to central parts of the business model.' ]} evidence="The six activities are the content of the chapter’s activity list; the global forecast is from Gartner’s July 2026 release; the pricing shift is from Deloitte; the Vietnam estimates are from Ken Research; the user and price figures are MISA’s own; the retention figure is from the World Bank blog. The comparison of licences and subscriptions is our own explanation." />,
    sources: citeEnt5('gartnerJuly2026', 'deloitteSaas', 'kenCloudErpForecast', 'misaPress', 'misaAccounting', 'misaPlatform', 'worldBankSme'),
  }),
  entM5Chapter({
    title: 'Ecosystem Selling, Strategic Partnerships, and Platform Integration', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how partnerships, marketplaces and integration are becoming routes to market.',
    mateIntro: 'More deals now come through a partner than through a direct sales call. Who you work with shapes who finds you.',
    keyInsight: 'Enterprise technology is increasingly sold through ecosystems of cloud providers, integrators, technology partners and marketplaces. Partnerships can extend reach and capability, but providers must keep control of customer experience, data and strategic capabilities.',
    statTiles: [
      { value: '6', label: 'Key ecosystem activities', subtitle: 'Cloud partnerships to open integration', description: 'Cloud partnerships, systems integration partnerships, technology alliances, cloud marketplaces, co-selling and open integration.' },
      { value: '27 Jan 2026', label: 'Date CMC Global signed a cooperation agreement with NTT DATA and NTT DATA Vietnam', subtitle: 'CMC Telecom, company press release', description: 'It covers delivery resources, business development and R&D.' },
      { value: '1997', label: 'Year of FPT’s alliance with Oracle', subtitle: 'FPT company account of its milestones', description: 'FPT also lists distribution partnerships with Olivetti, IBM and Compaq between 1989 and 1995.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The other two are dated company announcements and company accounts, not measures of how much revenue partnerships generate.',
    narrative: [
      { label: 'What it is', text: 'Ecosystem selling means reaching customers and delivering solutions together with other organisations, such as cloud platforms, implementation firms, complementary software vendors and online marketplaces. Platform integration makes sure that products from different providers connect through documented interfaces.' },
      { label: 'Why it is happening', text: 'Customers buy solutions that combine several products and services, and no single provider covers every need. Partnerships extend reach and fill capability gaps, while marketplaces make discovery and purchasing easier. Deloitte notes that incumbents are accelerating acquisitions and partnerships to broaden their platforms as AI-native challengers appear.' },
      { label: 'Real-world example', text: 'Providers develop, deploy and distribute solutions with major cloud providers; work with consulting and implementation firms to connect multiple business systems; combine complementary products in CRM, analytics, cybersecurity and workflow automation; list offers on cloud marketplaces to increase discoverability and simplify purchasing; coordinate sales teams and customer relationships with partners in co-selling; and support APIs, standard data formats and documented interfaces so that customers can connect systems more easily.' },
      { label: 'Vietnam example', text: 'CMC Global signed a cooperation agreement with NTT DATA and NTT DATA Vietnam on 27 January 2026 covering delivery resources, business development and R&D, according to CMC’s press release. FPT’s own history lists an Oracle alliance in 1997 and earlier distribution partnerships with Olivetti, IBM and Compaq. MISA says its software connects with e-invoices, digital signatures and e-commerce platforms. These are company statements. No public data on Vietnamese cloud-marketplace sales or the revenue share of partner-led deals was found.' },
      { label: 'Business impact', text: 'Partnerships can open new markets and capabilities, but each one involves trade-offs in margin, customer ownership and dependence on a platform. Providers should build useful partnerships while keeping control of customer experience, data and strategic capabilities.' },
    ],
    visualKind: 'ent-m5-32-ecosystem', visualHeading: 'Six ecosystem-selling activities and what to watch',
    visualIntro: 'Read across each row for what the activity does and the risk to watch.',
    imageAlt: 'Casemate table of six ecosystem-selling activities, what each does and what to watch',
    keyTerms: [
      { term: 'Ecosystem selling', definition: 'Selling together with partners, platforms and marketplaces rather than only directly.' },
      { term: 'Co-selling', definition: 'Partners coordinating sales effort and customer relationships on the same deals.' },
      { term: 'Marketplace', definition: 'An online catalogue where customers can find and buy offers from many providers.' },
      { term: 'API', definition: 'A documented interface that lets one software system exchange data with another.' },
    ],
    recap: [
      'Solutions increasingly combine products from several providers.',
      'Partnerships and marketplaces extend reach and capability.',
      'Each channel brings trade-offs in margin, ownership and dependence.',
      'Open interfaces lower integration barriers and raise lock-in questions.',
    ],
    chapterRecap: 'Partnerships can open new markets and capabilities, but each one involves trade-offs in margin, customer ownership and dependence on a platform. Providers should build useful partnerships while keeping control of customer experience, data and strategic capabilities.',
    deepDiveTitle: 'Why the table ends with what to watch',
    body: <EntDeepDive paragraphs={[
      'Every partnership gives something and takes something. A marketplace can bring buyers but may take a margin and sit between the provider and the customer.',
      'Naming the risk beside each activity helps a provider decide which partnerships to pursue and what to keep in its own hands.' ]} evidence="The six activities are the content of the chapter’s activity list; the Deloitte point is from its 2026 software outlook; the dated items are from CMC’s press release and FPT’s milestone account; the MISA integration is from its press release. The risks in the third column are our own reasoning." />,
    sources: citeEnt5('deloitteSoftware', 'cmcNtt', 'fptMilestones', 'misaPress', 'gartnerAi'),
  }),
  entM5Chapter({
    title: 'Global Delivery, Digital Channels, and the Evolution of IT Outsourcing', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how IT outsourcing is evolving from labour supply toward managed services and outcomes.',
    mateIntro: 'Outsourcing began as a way to find cheaper developers. It is becoming a way to buy expertise, continuity and results.',
    keyInsight: 'IT outsourcing is evolving from supplying lower-cost labour toward delivering managed services, specialist expertise and measurable outcomes. Cost still matters, but higher-value delivery depends on knowledge, communication, quality and complex project management.',
    statTiles: [
      { value: '6', label: 'Key delivery and channel activities', subtitle: 'Global delivery to outcome-based contracts', description: 'Global delivery models, managed services, digital lead generation, productised services, Vietnam’s international positioning and outcome-oriented contracts.' },
      { value: '+14.3%', label: 'Growth in FPT’s overseas IT services revenue in 2025', subtitle: 'FPT annual report, VND 35,382 billion', description: 'Digital transformation was 47.3% of the segment.' },
      { value: '+5.3%', label: 'Forecast growth in worldwide IT services spending in 2026', subtitle: 'Gartner, July 2026 forecast', description: 'About US$1,570 billion, a global figure.' },
    ],
    statsNote: 'The first tile is a count from this lesson. FPT’s figure is one company’s result and Gartner’s is a global forecast, so they are not comparable.',
    narrative: [
      { label: 'What it is', text: 'Global delivery combines onshore, nearshore and offshore teams so that work is done where skills, time zones and cost fit. Outsourcing began largely as a way to access lower-cost engineers, but customers increasingly buy continuing operation, specialist knowledge and agreed results rather than hours of labour.' },
      { label: 'Why it is happening', text: 'AI and automation may reduce the value of routine coding hours, which is our own reading, and Gartner notes that enterprises are turning to service providers less for large transformation programmes and more for smaller projects. Providers therefore move toward managed services, repeatable offers and contracts linked to outcomes. Digital channels such as webinars, demonstrations and technical content also let providers reach buyers without relying only on personal networks.' },
      { label: 'Real-world example', text: 'Providers combine onshore, nearshore and offshore teams according to project needs; take responsibility for ongoing application, infrastructure, security or operational performance through managed services; generate leads through websites, webinars, online demonstrations, professional networks and technical content; package repeatable offers such as cloud migration assessments, cybersecurity reviews and software testing; position Vietnam as combining engineering talent and competitive costs with consulting, architecture, AI and industry expertise; and link commercial terms to agreed deliverables, service levels or measurable performance where appropriate.' },
      { label: 'Vietnam example', text: 'FPT reports overseas IT services revenue of VND 35,382 billion in 2025 (+14.3%), with digital transformation at 47.3% of the segment, a first contract above US$100 million in Japan, and a shift from time-and-materials to managed services. CMC targets Japan revenue of US$200–250 million by 2028, a company target, and Mordor Intelligence puts IT outsourcing at 39.05% of Vietnam’s 2025 IT services value. For comparison, Nasscom reports 5.8 million employees in India’s technology industry and IBPAP reports about 1.9 million IT-BPM workers in the Philippines, which shows the scale of competing hubs. These are company results, a target and third-party estimates. No public Vietnam-wide data on the share of outcome-based contracts was found.' },
      { label: 'Business impact', text: 'Outsourcing is moving up the value chain. Cost still matters, but higher-value delivery depends on specialist knowledge, communication, quality and the ability to manage complex projects across locations.' },
    ],
    visualKind: 'ent-m5-33-delivery', visualHeading: 'Six layers from labour supply to outcomes',
    visualIntro: 'Read the pyramid from global delivery models at the base up to outcome-oriented contracts.',
    imageAlt: 'Casemate pyramid of six layers from global delivery models to outcome-oriented contracts',
    keyTerms: [
      { term: 'Nearshore', definition: 'Delivering work from a nearby country with a similar time zone to the customer.' },
      { term: 'Offshore', definition: 'Delivering work from a distant country, often for cost or skills reasons.' },
      { term: 'Managed service', definition: 'Taking responsibility for running a customer’s system or process over time.' },
      { term: 'Time and materials', definition: 'A contract that charges for the hours and resources used.' },
    ],
    recap: [
      'Delivery blends onshore, nearshore and offshore teams.',
      'Managed services and productised offers add continuity and repeatability.',
      'Digital channels help providers reach buyers directly.',
      'Outcome-linked contracts shift risk and reward to the provider.',
    ],
    chapterRecap: 'Outsourcing is moving up the value chain. Cost still matters, but higher-value delivery depends on specialist knowledge, communication, quality and the ability to manage complex projects across locations.',
    deepDiveTitle: 'Why outcome-based contracts are harder than they sound',
    body: <EntDeepDive paragraphs={[
      'Paying for outcomes means both sides must agree what counts as success and how it will be measured. Results also depend on the customer’s data, people and processes, not only the provider’s work.',
      'That is why the chapter says outcome-linked terms apply where appropriate: they suit well-defined work and do not replace simpler contracts everywhere.' ]} evidence="The six activities are the content of the chapter’s activity list; the FPT figures are from its annual report and earnings report; the CMC target is from VietnamPlus; the Mordor, Nasscom, Philstar and Gartner items are as cited. The comment on outcome contracts is our own reasoning." />,
    sources: citeEnt5('fptGlobalIt2025', 'fptEarnings2025', 'cmcJapan', 'mordorVietnamIt', 'gartnerJuly2026', 'gartnerAi', 'nasscomReview', 'philstarItBpm', 'cmcDeck'),
  }),
];

const quiz = entQuiz('ent-m5-l3', [
  { chapter: '1', objective: 'Describe the revenue shift', question: 'How is cloud adoption changing software revenue?', application: 'A vendor moves from one-off licences to subscriptions. What changes?', correct: 'Revenue moves toward recurring subscriptions, usage and services', wrong: ['Revenue becomes one-off only', 'Revenue disappears', 'Revenue moves to hardware only'], explanation: 'Recurring models grow. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain why retention matters', question: 'Why does customer retention matter more under a subscription model?', application: 'A customer stops using the software but the contract is still running. What is the risk?', correct: 'Revenue arrives only while customers keep paying, so continued value is needed', wrong: ['Retention does not affect revenue', 'Customers pay forever once signed', 'Retention only matters for hardware'], explanation: 'Renewal is earned. Review Chapter 1.' },
  { chapter: '1', objective: 'Read an estimate correctly', question: 'How should Ken Research’s US$356.7 million figure be described?', application: 'A slide presents it as total Vietnamese software revenue in 2031. What is the correction?', correct: 'As a forecast for cloud ERP for SMEs only, excluding standalone accounting and large-enterprise contracts', wrong: ['As audited 2025 revenue', 'As a legal limit', 'As the whole IT services market'], explanation: 'Scope matters. Review Chapter 1.' },
  { chapter: '2', objective: 'Define ecosystem selling', question: 'What is ecosystem selling?', application: 'A vendor sells jointly with a cloud provider and an integrator. What is it doing?', correct: 'Selling together with partners, platforms and marketplaces', wrong: ['Selling only by post', 'Selling only to one customer', 'Giving the product away'], explanation: 'Partners extend reach. Review Chapter 2.' },
  { chapter: '2', objective: 'Name a partnership trade-off', question: 'What should a provider watch when selling through a cloud marketplace?', application: 'A marketplace brings buyers but sits between the vendor and the customer. What is at stake?', correct: 'Margin and customer ownership', wrong: ['Only the logo colour', 'Only office rent', 'Only the number of slides'], explanation: 'Each channel has trade-offs. Review Chapter 2.' },
  { chapter: '2', objective: 'Use evidence honestly', question: 'What should be said about the revenue Vietnamese firms earn through cloud marketplaces?', application: 'A slide states a marketplace revenue share. What is the correction?', correct: 'No public data was found, so none is shown', wrong: ['It is 50%', 'Gartner publishes it for Vietnam', 'It is set by law'], explanation: 'State evidence gaps. Review Chapter 2.' },
  { chapter: '3', objective: 'Describe outsourcing evolution', question: 'How is IT outsourcing evolving?', application: 'A provider sells only developer hours. What trend is it facing?', correct: 'From supplying lower-cost labour toward managed services, expertise and outcomes', wrong: ['From services to hardware only', 'From outcomes to hours only', 'It has ended'], explanation: 'Value moves up. Review Chapter 3.' },
  { chapter: '3', objective: 'Define a managed service', question: 'What is a managed service?', application: 'A provider runs a customer’s applications and security round the clock. What is it?', correct: 'Taking responsibility for running a customer’s system or process over time', wrong: ['A one-off licence', 'A hardware sale', 'A training video'], explanation: 'Continuity is the value. Review Chapter 3.' },
  { chapter: '3', objective: 'Read company data correctly', question: 'How should FPT’s +14.3% overseas IT services growth be described?', application: 'A slide presents it as growth of the whole Vietnamese industry. What is the correction?', correct: 'As one company’s 2025 result for overseas IT services', wrong: ['As a Gartner forecast', 'As a law', 'As the industry average'], explanation: 'One firm is not the industry. Review Chapter 3.' },
  { chapter: '3', objective: 'Classify a target', question: 'How should CMC’s US$200–250 million Japan figure be described?', application: 'A slide calls it 2025 revenue. What is the correction?', correct: 'As a company target for 2028, not a result or an independent forecast', wrong: ['As audited revenue', 'As a Gartner estimate', 'As a tax rate'], explanation: 'Targets are not outcomes. Review Chapter 3.' },
]);

export const LESSON_ENT5_3: EntM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain the move to recurring cloud revenue, the role of partnerships and marketplaces, and the evolution of IT outsourcing toward managed services and outcomes.',
    keyTakeaways: [
      'Cloud adoption shifts revenue toward subscriptions and usage, which rewards retention.',
      'Ecosystem selling extends reach but brings trade-offs in margin, ownership and dependence.',
      'Outsourcing is moving from lower-cost labour toward managed services, expertise and outcomes.',
      'Vietnam figures here are company results, targets and third-party estimates, each labelled.',
      'No public data was found on marketplace revenue or the share of outcome-based contracts.',
    ],
    businessImplications: 'Invest in retention, choose partnerships deliberately and move delivery toward managed and outcome-linked services.',
    remember: 'Keeping a customer is worth more than the first signature.',
    nextLesson: 'Regulatory & Sustainability Trends',
  },
};
