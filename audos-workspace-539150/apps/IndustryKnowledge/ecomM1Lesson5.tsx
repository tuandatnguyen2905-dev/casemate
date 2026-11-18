import { EcomDeepDive, citeEcom, ecomChapter, ecomQuiz } from './ecomM1Core';
import type { EcomM1LessonBundle } from './ecomM1Core';

const LESSON = 'Industry Drivers & External Factors';

const deck = [
  ecomChapter({
    title: 'Economic, Demographic and Consumer Drivers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Separate the conditions that create online demand from the behaviour that makes it commercially worthwhile.',
    mateIntro: 'Counting people with internet access tells you how many could buy. It tells you nothing about how often they will, or how much they will spend when they do.',
    keyInsight: 'Demographic and economic conditions create the underlying demand for e-commerce, but growth quality depends on purchase frequency, spending capacity, and customer retention. Expanding the active customer base must be accompanied by sustainable transaction economics.',
    statTiles: [
      { value: '6', label: 'Demand drivers', subtitle: 'Income to consumer confidence', description: 'Income, urbanisation, digital literacy, younger segments, household consumption and confidence.' },
      { value: '3', label: 'Measures of growth quality', subtitle: 'Frequency, spend, retention', description: 'They decide whether a larger customer base is actually worth more.' },
      { value: 'Both ways', label: 'How the economy acts', description: 'Rising income widens demand; inflation and uncertainty shrink baskets and raise discount sensitivity.' },
    ],
    statsNote: 'The tiles count the drivers described in this lesson. The brief supplies no measured income, basket or frequency data, so none are stated here.',
    narrative: [
      { label: 'What it is', text: 'E-commerce growth is influenced by economic development, household income, urbanisation, digital literacy and changes in consumer lifestyles. As consumers become more familiar with online transactions, digital channels can serve a wider range of shopping needs, from routine household purchases to higher-value and specialised goods.' },
      { label: 'Why it is happening', text: 'Economic conditions also affect purchasing power and consumer confidence. Inflation, employment uncertainty and changes in discretionary spending influence order values, shopping frequency and demand for promotions, so the same population can produce very different revenue in different years.' },
      { label: 'Real-world example', text: 'Rising disposable income can increase demand for a wider range of online products and services; busy urban lifestyles raise the appeal of home delivery and digital ordering; and familiarity with mobile applications, digital payments and online security supports adoption. Digitally engaged younger consumers may be especially receptive to social commerce, mobile-first shopping and creator-led discovery.' },
      { label: 'Vietnam example', text: 'Vietnam combines rising incomes and rapid urbanisation with routine price comparison, which means new buyers arrive steadily but arrive discount-aware. Growth in the customer base therefore does not automatically carry margin with it, and merchants feel the two effects at once.' },
      { label: 'Business impact', text: 'The industry depends not only on how many people shop online but on how often they purchase and how much they spend. Businesses should monitor purchasing power and shopping behaviour rather than relying on internet adoption figures, because an expanding base combined with falling basket value can leave revenue flat and costs higher.' },
    ],
    visualKind: 'ecom-m1-51-economic', visualHeading: 'Six economic and demographic drivers of demand',
    visualIntro: 'Read each driver alongside the part of commercial performance it actually moves.',
    imageAlt: 'Casemate compass mind map of six economic and demographic drivers of e-commerce demand',
    keyTerms: [
      { term: 'Purchasing power', definition: 'What a household can actually afford after prices and income are taken together.' },
      { term: 'Discretionary spending', definition: 'Spending on non-essential goods and services, the first thing cut when confidence falls.' },
      { term: 'Purchase frequency', definition: 'How often a customer buys in a period; a stronger growth signal than the number of registered users.' },
      { term: 'Retention', definition: 'The share of customers who buy again, which removes the need to pay acquisition cost twice.' },
    ],
    recap: [
      'Income, urbanisation, digital literacy and lifestyle shape underlying demand.',
      'Inflation and uncertainty move order values, frequency and promotion demand.',
      'Younger digitally engaged segments respond to social and mobile-first commerce.',
      'Growth quality is frequency, spending capacity and retention, not user count.',
    ],
    chapterRecap: 'Economic and demographic factors shape both the size and composition of e-commerce demand. Businesses should monitor consumer purchasing power and shopping behaviour rather than relying on internet adoption alone.',
    deepDiveTitle: 'The metric that flatters a weak year',
    body: <EcomDeepDive paragraphs={[
      'Active customer counts are the most quoted number in e-commerce and among the least informative. A business can add customers steadily while each one buys less often and spends less per order, and the headline will still look like growth. Revenue can be flat or falling underneath it, with service and acquisition costs rising because more people are being served for the same money.',
      'The honest pair of numbers is frequency and basket value, read alongside retention. If all three hold while the base grows, the market is genuinely expanding. If the base grows while the other three fall, the business is buying customers that the economics do not yet support — which is a decision worth making deliberately, not by accident.',
    ]} evidence="The drivers and the distinction between base growth and growth quality are from the supplied brief, which gives no measured income, frequency or basket figures. The critique of active-customer counts is our own." />,
    sources: citeEcom('worldBankVietnam', 'nsoRetail'),
  }),
  ecomChapter({
    title: 'Technology, Logistics and Digital Infrastructure Drivers', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain why digital and physical infrastructure have to be judged together, and what each layer contributes to a completed order.',
    mateIntro: 'You can have the best recommendation engine in the country and still lose the customer, because the parcel turned up four days late and nobody answered the message about it.',
    keyInsight: 'E-commerce growth depends on the combined performance of digital and physical infrastructure. Improvements in product discovery or checkout cannot fully compensate for unreliable delivery, poor inventory accuracy, payment friction, or weak after-sales service.',
    statTiles: [
      { value: '7', label: 'Infrastructure layers', subtitle: 'Connectivity to cybersecurity', description: 'Digital infrastructure, payments, AI, warehousing, last mile, returns and security.' },
      { value: 'Both', label: 'Digital and physical', description: 'The transaction must end in successful delivery or digital fulfilment, or it has not worked.' },
      { value: 'Depends', label: 'What AI benefits rest on', subtitle: 'Data quality, integration, implementation', description: 'Automation improves these activities only when those conditions hold.' },
    ],
    statsNote: 'The tiles count the infrastructure layers described in this lesson. The brief supplies no delivery times, accuracy rates or automation returns, so none are claimed.',
    narrative: [
      { label: 'What it is', text: 'Technology and infrastructure determine how efficiently online commerce can operate. Reliable connectivity, mobile applications, digital payments, data analytics, cloud systems and cybersecurity support both the customer-facing and the operational functions of e-commerce platforms.' },
      { label: 'Why it is happening', text: 'Logistics is equally important because the online transaction must ultimately result in successful delivery or digital fulfilment. Warehousing, inventory management, shipment tracking, last-mile delivery and reverse logistics influence cost, customer satisfaction and repeat purchasing.' },
      { label: 'Real-world example', text: 'Digital wallets, banking applications, QR payments and payment gateways reduce checkout friction; recommendation engines, demand forecasting, fraud detection and customer segmentation improve decision-making; and inventory visibility and warehouse automation reduce stockouts, errors and fulfilment delays.' },
      { label: 'Vietnam example', text: 'Vietnam’s payment layer has developed quickly through e-wallets, banking apps and QR codes, which removes much of the checkout friction. That makes the physical layer the binding constraint for many sellers: the order is easy to place and harder to deliver reliably, particularly outside the largest cities.' },
      { label: 'Business impact', text: 'AI and automation can improve these activities, but their benefits depend on data quality, operational integration and effective implementation. Fraud prevention, account protection and reliable systems then support trust and operational continuity — all of which the customer notices only when it fails.' },
    ],
    visualKind: 'ecom-m1-52-tech', visualHeading: 'Seven systems behind one delivered order',
    visualIntro: 'See the digital and physical layers that all have to work for a single order to complete.',
    imageAlt: 'Casemate pipeline mind map of digital and logistics infrastructure behind an e-commerce order',
    keyTerms: [
      { term: 'Last-mile delivery', definition: 'The final stage from local facility to the customer, usually the most expensive and least reliable part of the journey.' },
      { term: 'Reverse logistics', definition: 'Handling returns, refunds, exchanges and product recovery after a sale.' },
      { term: 'Inventory visibility', definition: 'Knowing accurately what stock exists and where; without it, availability shown to customers cannot be honoured.' },
      { term: 'Payment gateway', definition: 'The service that authorises and processes an online payment between buyer, bank and merchant.' },
    ],
    recap: [
      'Connectivity, payments, analytics, cloud and security support the digital side.',
      'Warehousing, inventory, tracking, last mile and returns complete the transaction.',
      'AI benefits depend on data quality, integration and implementation.',
      'A better checkout cannot compensate for unreliable delivery or weak service.',
    ],
    chapterRecap: 'Technology and logistics jointly determine the quality and efficiency of e-commerce operations. Providers that integrate digital systems with fulfilment and customer service can improve both the consumer experience and operating performance.',
    deepDiveTitle: 'Where the money is usually better spent',
    body: <EcomDeepDive paragraphs={[
      'Investment tends to flow toward the visible end of the system, because a redesigned product page or a new recommendation model can be demonstrated in a meeting and a reduction in late deliveries cannot. Yet the customer’s memory of the purchase is formed almost entirely at the other end: whether the right item arrived when promised and what happened when it did not.',
      'A useful test before funding anything here is to name the failure it prevents. A recommendation engine prevents a customer not finding a product they would have bought. Inventory accuracy prevents selling something that cannot be shipped. Reverse logistics prevents a return turning into a refund dispute. Initiatives that cannot name their failure are usually improving something nobody was losing orders over.',
    ]} evidence="The infrastructure layers, the dependence of AI benefits on data quality and implementation, and the point that discovery cannot compensate for unreliable delivery are from the supplied brief. No measured delivery or accuracy figures are supplied. The name-the-failure test is our own." />,
    sources: citeEcom('unctadDigitalEconomy', 'econSea'),
  }),
  ecomChapter({
    title: 'Regulatory, Competitive and Sustainability Factors', chapterTitle: LESSON, readingTime: '8',
    objective: 'Set out the obligations now shaping e-commerce in Vietnam and explain why compliance and sustainability belong inside the operating model.',
    mateIntro: 'Vietnam’s e-commerce law came into force in July 2026. Seller verification, disclosure and complaint handling are no longer good practice — they are requirements with a legal text behind them.',
    keyInsight: 'Regulation and sustainability are becoming structural factors in e-commerce competition. Companies must incorporate compliance, seller accountability, consumer trust, and environmental considerations into their operating models rather than treating them as secondary administrative concerns.',
    statTiles: [
      { value: '122/2025/QH15', label: 'Vietnam Law on E-Commerce', subtitle: 'In force 1 July 2026', description: 'Applied alongside Decree No. 248/2026/ND-CP.' },
      { value: '5', label: 'Core platform obligations', subtitle: 'Operation to unlawful listings', description: 'Platform operation, seller identity verification, public disclosure, complaint handling and managing unlawful listings.' },
      { value: '7', label: 'Obligation areas in total', description: 'Including tax, consumer protection, data protection, counterfeits, cross-border rules and sustainable logistics.' },
    ],
    statsNote: 'Verified 25 October 2026: the Government legal portal confirms both instrument numbers and the 1 July 2026 effective date; MOIT’s official implementation summary confirms the platform obligations listed here. This is orientation, not legal advice.',
    narrative: [
      { label: 'What it is', text: 'E-commerce operates within a changing regulatory environment involving consumer protection, taxation, personal data, advertising, product authenticity, competition and cross-border transactions. Regulators increasingly focus on seller accountability, transparency, platform responsibilities and the protection of consumers who purchase through digital channels.' },
      { label: 'Why it is happening', text: 'Vietnam’s Law on E-Commerce No. 122/2025/QH15 took effect on 1 July 2026, alongside Decree No. 248/2026/ND-CP. The framework establishes requirements relating to platform operation, seller identity verification, public disclosure, complaint handling and the management of unlawful listings, among other obligations.' },
      { label: 'Real-world example', text: 'In practice this means maintaining appropriate seller information, operating policies, product oversight and complaint-handling procedures; addressing tax obligations for online businesses, household sellers and platform-mediated transactions; providing accurate product information, transparent pricing, clear return terms and accessible dispute resolution; and applying safeguards to customer data and transaction records.' },
      { label: 'Vietnam example', text: 'The practical burden falls unevenly. A large platform can build verification and complaint systems once and run them at scale, while a household seller faces identity, tax and disclosure requirements with no back office at all. That asymmetry is itself a competitive factor in the Vietnamese market, not merely an administrative detail.' },
      { label: 'Business impact', text: 'Sustainability is the other structural pressure. Growth in parcel volumes, packaging consumption, delivery traffic, returns and warehousing increases environmental impact, so businesses may need to improve packaging efficiency, delivery consolidation, reverse logistics and resource use as the industry develops.' },
    ],
    visualKind: 'ecom-m1-53-regulation', visualHeading: 'Seven obligations that now sit inside the operating model',
    visualIntro: 'Read each obligation area against what it covers and why it matters commercially.',
    imageAlt: 'Casemate wheel mind map of Vietnamese e-commerce regulatory and sustainability obligations',
    keyTerms: [
      { term: 'Seller identity verification', definition: 'Confirming who a merchant actually is before or while it trades on a platform; a core duty under the e-commerce framework.' },
      { term: 'Platform accountability', definition: 'The operator’s responsibility for seller information, product oversight, disclosure and complaint handling.' },
      { term: 'Unlawful listing', definition: 'An offer that breaches law or platform policy, which the operator is expected to identify and remove.' },
      { term: 'Delivery consolidation', definition: 'Combining shipments to reduce packaging, trips and emissions per order.' },
    ],
    recap: [
      'Law 122/2025/QH15 and Decree 248/2026/ND-CP took effect on 1 July 2026.',
      'Obligations cover operation, seller verification, disclosure, complaints and unlawful listings.',
      'Tax, consumer protection, data, counterfeits and cross-border rules also apply.',
      'Parcel volumes, packaging, traffic and returns raise environmental pressure.',
    ],
    chapterRecap: 'Regulatory compliance and sustainability increasingly influence the cost, trustworthiness and resilience of e-commerce operations. Businesses that prepare for changing requirements can reduce disruption and build more reliable relationships with customers, merchants and regulators.',
    deepDiveTitle: 'Compliance as a competitive variable',
    body: <EcomDeepDive paragraphs={[
      'It is tempting to read a new legal framework purely as cost, and for a small seller that is largely what it is. For the market as a whole the effect is more interesting: verification, disclosure and complaint handling raise the floor on who can trade, which removes some of the cheapest and least accountable competition. A merchant that was already doing these things gains relative position without changing anything.',
      'Sustainability is heading the same way. Packaging, consolidated delivery and efficient returns handling are currently reputational for most businesses and a cost for all of them, but each is also an operational efficiency — less material, fewer trips, fewer items handled twice. The firms that treat both compliance and sustainability as design constraints rather than annual reporting obligations tend to arrive at the lower-cost answer anyway.',
    ]} evidence="Verified 25 October 2026. The Government legal-document portal confirms Law 122/2025/QH15 was enacted 10 December 2025 and effective 1 July 2026, and Decree 248/2026/ND-CP was issued 30 June 2026 and effective 1 July 2026. MOIT’s official 3 July 2026 implementation summary confirms seller identity verification, public operating rules, complaint handling, record retention, cooperation with authorities and action on unlawful listings. The sustainability pressures come from the supplied brief and UNCTAD." />,
    sources: citeEcom('govLaw122', 'govDecree248', 'moitLawGuide', 'unctadDer'),
  }),
];

const quiz = ecomQuiz('ecom-m1-l5', [
  { chapter: '1', objective: 'Identify demand drivers', question: 'Which factors influence e-commerce growth according to this lesson?', application: 'A forecast uses internet adoption only. What else belongs in it?', correct: 'Economic development, household income, urbanisation, digital literacy and lifestyle change', wrong: ['Only the number of registered websites', 'Only warehouse floor space', 'Only the number of delivery vans'], explanation: 'These economic and demographic conditions shape underlying demand. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain growth quality', question: 'What determines the quality of e-commerce growth?', application: 'A platform adds users while revenue stays flat. What should it examine?', correct: 'Purchase frequency, spending capacity and customer retention', wrong: ['The total number of registered accounts', 'The number of product categories listed', 'The size of the engineering team'], explanation: 'Expanding the base must be accompanied by sustainable transaction economics. Review Chapter 1.' },
  { chapter: '1', objective: 'Recognise economic pressure', question: 'How do inflation and employment uncertainty affect online demand?', application: 'Discount sensitivity rises sharply in a weak year. What explains it?', correct: 'They influence order values, shopping frequency and demand for promotions', wrong: ['They have no effect on online shopping', 'They increase average order values', 'They eliminate price comparison'], explanation: 'Economic conditions affect purchasing power and consumer confidence. Review Chapter 1.' },
  { chapter: '2', objective: 'State the infrastructure insight', question: 'Why can improvements in discovery or checkout not compensate for weak logistics?', application: 'A retailer improves its search and still loses repeat customers. Why?', correct: 'The transaction must end in successful delivery or digital fulfilment', wrong: ['Search quality has no commercial value', 'Checkout design is irrelevant to conversion', 'Logistics only affects B2B transactions'], explanation: 'Growth depends on the combined performance of digital and physical infrastructure. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify logistics activities', question: 'Which logistics activities influence cost and repeat purchasing?', application: 'A seller reviews delivery only. What else belongs in scope?', correct: 'Warehousing, inventory management, shipment tracking, last-mile delivery and reverse logistics', wrong: ['Only outbound shipping cost', 'Only packaging colour and design', 'Only the choice of courier brand'], explanation: 'All of these influence cost, satisfaction and repeat purchase. Review Chapter 2.' },
  { chapter: '2', objective: 'Qualify AI benefits', question: 'What do the benefits of AI and automation depend on?', application: 'A platform deploys forecasting and sees no improvement. What should it check?', correct: 'Data quality, operational integration and effective implementation', wrong: ['The number of models deployed', 'The size of the cloud contract', 'The vendor’s marketing claims'], explanation: 'AI can improve these activities, but only under those conditions. Review Chapter 2.' },
  { chapter: '3', objective: 'Recall the Vietnamese framework', question: 'When did Vietnam’s Law on E-Commerce No. 122/2025/QH15 take effect?', application: 'A compliance plan assumes the law is not yet in force. What is the correction?', correct: '1 July 2026, alongside Decree No. 248/2026/ND-CP', wrong: ['1 January 2025, with no implementing decree', '1 July 2030, still pending', 'It has been proposed but never passed'], explanation: 'The law took effect on 1 July 2026 alongside Decree 248/2026/ND-CP. Review Chapter 3.' },
  { chapter: '3', objective: 'Identify platform obligations', question: 'Which requirements does the Vietnamese e-commerce framework establish?', application: 'A platform reviews its seller onboarding. Which duties apply?', correct: 'Platform operation, seller identity verification, public disclosure, complaint handling and managing unlawful listings', wrong: ['Only advertising content standards', 'Only warehouse fire safety', 'Only employee contract terms'], explanation: 'These are among the obligations the framework establishes. Review Chapter 3.' },
  { chapter: '3', objective: 'Identify sustainability pressures', question: 'What increases the environmental impact of e-commerce growth?', application: 'An ESG review covers packaging only. What else belongs in scope?', correct: 'Parcel volumes, packaging consumption, delivery traffic, returns and warehousing', wrong: ['Only office electricity use', 'Only website hosting emissions', 'Only staff commuting'], explanation: 'Growth across all of these raises environmental impact. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply the compliance insight', question: 'How should companies treat regulation and sustainability?', application: 'A board files compliance under annual reporting. What does the lesson advise?', correct: 'As structural factors built into the operating model, not secondary administrative concerns', wrong: ['As a reporting task handled once a year', 'As a matter only for regulators to manage', 'As an optional marketing position'], explanation: 'Compliance, seller accountability, trust and environmental considerations belong in the operating model. Review Chapter 3.' },
]);

export const LESSON_ECOM_5: EcomM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can separate the conditions creating online demand from the behaviour that makes it profitable, judge digital and physical infrastructure together, and set out the regulatory and sustainability obligations now shaping the industry.',
    keyTakeaways: [
      'Income, urbanisation, literacy and lifestyle create demand; frequency, spend and retention decide its quality.',
      'Economic pressure moves order values and discount sensitivity in both directions.',
      'Seven digital and physical layers all have to work for a single order to complete.',
      'AI benefits depend on data quality, integration and implementation.',
      'Vietnam’s Law 122/2025/QH15 and Decree 248/2026/ND-CP took effect on 1 July 2026.',
    ],
    businessImplications: 'Before funding an initiative, name the failure it prevents: investment flows to the visible end of the system, while the customer forms their judgement at the delivery end where failures are harder to demonstrate in a meeting.',
    remember: 'Compliance and sustainability are design constraints, not an annual report.',
    nextLesson: '',
  },
};
