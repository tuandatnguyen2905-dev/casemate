import { EcomDeepDive, citeEcom, ecomM2Chapter, ecomQuiz } from './ecomM2Core';
import type { EcomM2LessonBundle } from './ecomM2Core';

const LESSON = 'Global vs. Local Value Chain';

const deck = [
  ecomM2Chapter({
    title: 'Global E-Commerce Value Chains and Cross-Border Trade', chapterTitle: LESSON, readingTime: '8',
    objective: 'Explain the seven components of cross-border commerce and the coordination costs that accompany wider market access.',
    mateIntro: 'A digital storefront crosses a border instantly. The product, payment, return and legal responsibilities do not.',
    keyInsight: 'Global e-commerce expands market access but increases coordination and compliance requirements. Success depends on the ability to manage international logistics, localized customer experiences, regulatory differences, and cross-border transaction costs.',
    statTiles: [
      { value: '7', label: 'Cross-border activities', subtitle: 'Sourcing through returns', description: 'Each adds opportunity and operational complexity.' },
      { value: '5', label: 'Coordination areas', subtitle: 'Logistics, localization, regulation, payment, returns', description: 'They extend the domestic chain across jurisdictions.' },
      { value: '3', label: 'Routes to foreign demand', subtitle: 'Marketplace, owned store, partner', description: 'Businesses can combine routes based on capability.' },
    ],
    statsNote: 'These are structural counts from the chapter; no cross-border market-size estimate is introduced.',
    narrative: [
      { label: 'What it is', text: 'Cross-border e-commerce connects manufacturers, exporters, platforms, payment providers, customs intermediaries and logistics operators across countries.' },
      { label: 'Why it is happening', text: 'International marketplaces and online stores let businesses reach larger markets without establishing full physical retail in every destination. The trade-off is added complexity in customs, tax, standards, payment, delivery, returns and consumer protection.' },
      { label: 'Real-world example', text: 'A seller may source internationally, list on a foreign marketplace, use an overseas warehouse, declare goods through customs, settle in another currency, localize product information and manage international returns.' },
      { label: 'Vietnam example', text: 'A Vietnamese merchant can reach overseas buyers through international platforms, its own store or export partners. The chosen route must support destination-market product information, payment, delivery, return and compliance requirements.' },
      { label: 'Business impact', text: 'Cross-border reach expands demand but introduces longer delivery paths, currency and settlement complexity, localization work and additional transaction cost.' },
    ],
    visualKind: 'ecom-m2-61-global', visualHeading: 'Seven components of cross-border e-commerce', visualIntro: 'Map the extra activities created when a transaction crosses jurisdictions.', imageAlt: 'Casemate tree mind map of cross-border e-commerce activities',
    keyTerms: [
      { term: 'Cross-border e-commerce', definition: 'A digital transaction in which buyer and seller operate across national borders.' },
      { term: 'Localization', definition: 'Adapting language, information, pricing, payments and support to a market.' },
      { term: 'Customs compliance', definition: 'Managing declarations, duties, taxes and documentation for international goods.' },
      { term: 'International settlement', definition: 'Moving and reconciling money across currencies and financial systems.' },
    ],
    recap: ['Cross-border commerce expands addressable demand.', 'Products still face customs, standards and logistics.', 'Customer experience needs local language, payment and support.', 'Returns and disputes become more complex across borders.'],
    chapterRecap: 'Global e-commerce connects businesses with international demand and broader supplier networks. Its value chain requires coordinated management of logistics, payments, localization, and regulatory compliance across multiple jurisdictions.',
    deepDiveTitle: 'Why digital reach does not remove physical distance',
    body: <EcomDeepDive paragraphs={[
      'A listing can be visible globally at low cost, but every completed transaction still carries the requirements of the product, destination and payment route. Digital discovery compresses distance; fulfillment and regulation preserve it.',
      'Cross-border strategy should therefore begin with the complete delivered proposition rather than the ease of publishing a product page.'
    ]} evidence="The seven activities and sources of cross-border complexity come directly from the supplied chapter." />,
    sources: citeEcom('wtoEcommerce', 'unctadDigitalEconomy'),
  }),
  ecomM2Chapter({
    title: 'Vietnam’s Position in the Global and Domestic Value Chain', chapterTitle: LESSON, readingTime: '8',
    objective: 'Map Vietnam’s seven positions in the value chain and explain what enables local businesses to capture greater value.',
    mateIntro: 'Vietnam is not only an online consumer market. Its merchants, manufacturers, brands and technology providers can participate at several points in the global chain.',
    keyInsight: 'Vietnam’s opportunity extends beyond domestic online retail growth. Local businesses can use e-commerce to expand exports and develop stronger direct relationships with international customers, provided they can compete on quality, reliability, branding, and total delivered cost.',
    statTiles: [
      { value: '7', label: 'Vietnam value-chain positions', subtitle: 'Domestic marketplace through capability upgrading', description: 'The chapter maps demand, export, brand, fulfillment and service roles.' },
      { value: '4', label: 'Routes to international markets', subtitle: 'Marketplace, owned store, intermediary, distributor', description: 'Each offers different control and capability needs.' },
      { value: '4', label: 'Sources of stronger capture', subtitle: 'Quality, reliability, brand, delivered cost', description: 'These determine competitiveness beyond access.' },
    ],
    statsNote: 'The figures count positions, routes and capabilities described in the chapter; no export value or ranking is claimed.',
    narrative: [
      { label: 'What it is', text: 'Vietnam participates as a domestic consumer market and a source of products and merchants serving international customers. Local and imported products move through domestic platforms, while manufacturers, brands and small businesses can reach overseas buyers.' },
      { label: 'Why it is happening', text: 'Digital channels lower the need for a full foreign retail presence. Businesses can use cross-border marketplaces, owned stores, export intermediaries or overseas distributors.' },
      { label: 'Real-world example', text: 'Merchants sell domestically, manufacturers export through platforms, brands build direct storefronts, logistics providers support export fulfillment, and Vietnamese technology firms supply commerce software, marketing and payment integrations.' },
      { label: 'Vietnam example', text: 'A Vietnamese consumer brand can combine domestic marketplace sales with an international storefront and export fulfillment partner. Product information, packaging, price, service and compliance need adaptation for each destination.' },
      { label: 'Business impact', text: 'Greater value capture depends on differentiation, brand development, digital marketing, reliable fulfillment and destination-market compliance rather than access to a platform alone.' },
    ],
    visualKind: 'ecom-m2-62-vietnam', visualHeading: 'Seven positions Vietnam can hold in the chain', visualIntro: 'Review domestic, export, brand, logistics and technology opportunities.', imageAlt: 'Casemate cards showing Vietnam positions in e-commerce value chains',
    keyTerms: [
      { term: 'Total delivered cost', definition: 'The full customer cost including product, delivery, duties, fees and returns.' },
      { term: 'Export intermediary', definition: 'A partner helping a merchant reach and operate in foreign markets.' },
      { term: 'Digital brand development', definition: 'Building product identity, online presentation and direct customer relationships.' },
      { term: 'Capability upgrading', definition: 'Investing in systems, skills and operations to perform higher-value activities.' },
    ],
    recap: ['Vietnam serves domestic and international e-commerce demand.', 'Local firms can participate as sellers, manufacturers, brands and service providers.', 'Platforms provide access but not automatic competitiveness.', 'Quality, brand, fulfillment and compliance support greater value capture.'],
    chapterRecap: 'Vietnam occupies multiple positions in the e-commerce value chain, from domestic retail and marketplace participation to cross-border selling and supporting technology services. Greater value capture requires stronger brands, digital capabilities, product differentiation, and international operational expertise.',
    deepDiveTitle: 'Why market access is only the first step',
    body: <EcomDeepDive paragraphs={[
      'A marketplace can expose a Vietnamese product to overseas demand, but discovery alone does not establish a durable position. Quality, presentation, delivery, service and compliance determine whether the first order becomes repeat demand.',
      'Capability upgrading moves the business from participating in a channel toward owning more of the brand, relationship and commercial knowledge created through it.'
    ]} evidence="Vietnam’s positions, market routes and capability requirements come directly from the supplied chapter. No company ranking or export figure is introduced." />,
    sources: citeEcom('worldBankVietnam', 'wtoEcommerce', 'moitMarket2025'),
  }),
  ecomM2Chapter({
    title: 'Localization, Global Standards and Value-Chain Resilience', chapterTitle: LESSON, readingTime: '8',
    objective: 'Balance standardized core operations with local execution and diversify critical dependencies for resilience.',
    mateIntro: 'Standardize what should be repeatable, localize what customers and law require, and never let one dependency become the whole business.',
    keyInsight: 'A resilient e-commerce value chain combines standardized core operations with flexible local execution. Businesses should preserve efficiency while diversifying critical dependencies and adapting to local customer and regulatory requirements.',
    statTiles: [
      { value: '8', label: 'Resilience activities', subtitle: 'Standardization through regulation', description: 'The chapter combines efficiency, local fit and continuity.' },
      { value: '4', label: 'Dependencies to diversify', subtitle: 'Channel, supplier, carrier, system', description: 'Concentration can turn one change into a business-wide disruption.' },
      { value: '3', label: 'Design principles', subtitle: 'Standardize, localize, diversify', description: 'Together they balance efficiency and resilience.' },
    ],
    statsNote: 'The figures count activities, dependencies and principles in the chapter; no resilience score is claimed.',
    narrative: [
      { label: 'What it is', text: 'Global e-commerce benefits from standardized technology, order management, security and measurement, while local payments, language, product selection, delivery and support improve relevance.' },
      { label: 'Why it is happening', text: 'Businesses face supply disruption, platform policy changes, cyber incidents, logistics constraints and demand shifts. Heavy dependence on one marketplace, supplier, carrier or advertising channel increases exposure.' },
      { label: 'Real-world example', text: 'A resilient business standardizes product data and reconciliation, integrates local payments and carriers, sells across several channels, diversifies supply and maintains backup systems, contingency inventory and incident response.' },
      { label: 'Vietnam example', text: 'A Vietnamese merchant expanding abroad can keep one product-data and order core while adapting destination language, payments, carriers, packaging and compliance. Multiple channels and suppliers reduce dependence on one rule set or disruption.' },
      { label: 'Business impact', text: 'Standardization creates efficiency; localization creates market fit; diversification and continuity planning reduce the impact of failure or policy change.' },
    ],
    visualKind: 'ecom-m2-63-resilience', visualHeading: 'Eight moves for a resilient global-local chain', visualIntro: 'Follow the controls that balance efficiency, local relevance and continuity.', imageAlt: 'Casemate resilience flow for global and local e-commerce operations',
    keyTerms: [
      { term: 'Standardized core', definition: 'Consistent data, order, finance and control processes shared across markets.' },
      { term: 'Local execution', definition: 'Market-specific payments, language, assortment, delivery, support and compliance.' },
      { term: 'Platform risk', definition: 'Exposure to marketplace fees, rules, restrictions or algorithm changes.' },
      { term: 'Operational continuity', definition: 'The ability to keep critical service running through disruption.' },
    ],
    recap: ['Standard core systems improve efficiency across markets.', 'Local payments, delivery and support improve relevance.', 'Concentrated dependencies increase operational risk.', 'Diversification and continuity planning improve resilience.'],
    chapterRecap: 'The global and local dimensions of e-commerce require businesses to balance standardization, localization, and resilience. Flexible operations and diversified dependencies can help companies maintain customer service and commercial performance as markets evolve.',
    deepDiveTitle: 'Why resilience is designed before disruption',
    body: <EcomDeepDive paragraphs={[
      'Alternatives created after a disruption are slow and expensive because contracts, integrations, stock and customer communication all need time. Resilience comes from identifying critical dependencies while operations are stable.',
      'Not every activity should be duplicated. The priority is the dependency whose failure would interrupt the customer promise or remove the business’s route to demand.'
    ]} evidence="The standardization, localization and resilience activities come directly from the supplied chapter." />,
    sources: citeEcom('wtoEcommerce', 'unctadDigitalEconomy', 'moitLawGuide'),
  }),
];

const quiz = ecomQuiz('ecom-m2-l6', [
  { chapter: '1', objective: 'Identify cross-border complexity', question: 'What additional requirement does cross-border commerce introduce?', application: 'A seller ships abroad without customs documents. What was missed?', correct: 'Customs, tax, standards, international payment and return requirements', wrong: ['Only product photography', 'Only domestic delivery', 'No extra coordination'], explanation: 'Borders add logistics and compliance work. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain localization', question: 'What should a localized shopping experience adapt?', application: 'A foreign storefront offers no local language or payment. What is weak?', correct: 'Language, product information, pricing, payments and support', wrong: ['Only the company logo', 'Only warehouse rent', 'Only supplier contracts'], explanation: 'Localization improves market relevance. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply delivered-cost thinking', question: 'Why is global digital reach not enough?', application: 'A product is visible abroad but delivery and returns are unworkable. What follows?', correct: 'The complete delivered proposition still needs logistics, compliance and service', wrong: ['Visibility guarantees success', 'Physical distance disappears', 'Returns no longer matter'], explanation: 'Digital discovery does not remove operational distance. Review Chapter 1.' },
  { chapter: '2', objective: 'Map Vietnam roles', question: 'How can Vietnamese businesses participate beyond domestic retail?', application: 'A manufacturer wants foreign buyers. Which path is available?', correct: 'Cross-border marketplaces, owned stores, intermediaries or overseas distributors', wrong: ['Domestic stores only', 'No digital route exists', 'Only foreign manufacturing'], explanation: 'Several routes connect Vietnamese supply to international demand. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain stronger capture', question: 'What helps Vietnamese merchants capture more value?', application: 'A seller has platform access but weak repeat demand. What should improve?', correct: 'Product differentiation, brand, digital marketing, fulfillment and compliance', wrong: ['Platform access alone', 'Lower information quality', 'Dependence on one carrier'], explanation: 'Capabilities turn access into position. Review Chapter 2.' },
  { chapter: '2', objective: 'Recognize service roles', question: 'Which supporting role can Vietnamese providers play?', application: 'A local firm builds commerce software and payment integration. Where is it in the chain?', correct: 'Technology and seller-service provider', wrong: ['Consumer only', 'Customs authority', 'Product return only'], explanation: 'Vietnam can supply supporting digital capabilities. Review Chapter 2.' },
  { chapter: '3', objective: 'Balance standardization and localization', question: 'What should remain standardized across markets?', application: 'A company wants efficient global control. Which core can stay consistent?', correct: 'Product data, order management, reconciliation and performance indicators', wrong: ['Every local payment method', 'Every language', 'Every carrier contract'], explanation: 'Core operations can be standardized. Review Chapter 3.' },
  { chapter: '3', objective: 'Identify local execution', question: 'What should be localized?', application: 'Customers cannot use their normal payment method. What needs adapting?', correct: 'Payments, language, assortment, delivery and customer service', wrong: ['Global financial reconciliation only', 'Source code naming only', 'Corporate history'], explanation: 'Local execution creates relevance. Review Chapter 3.' },
  { chapter: '3', objective: 'Recognize concentration risk', question: 'Why is dependence on one marketplace risky?', application: 'A rule change removes the only sales channel. What failed?', correct: 'A single policy or restriction can interrupt the route to demand', wrong: ['One channel guarantees resilience', 'Algorithms never change', 'Fees cannot change'], explanation: 'Concentrated dependencies amplify disruption. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply continuity planning', question: 'What belongs in operational continuity?', application: 'A critical system fails. What should already exist?', correct: 'Backups, contingency inventory, fraud controls and incident response', wrong: ['Only a marketing campaign', 'Only a new logo', 'Only more product categories'], explanation: 'Continuity controls support recovery. Review Chapter 3.' },
]);

export const LESSON_ECOM2_6: EcomM2LessonBundle = {
  deck, quiz,
  takeaways: {
    learned: 'You can map cross-border activities, explain Vietnam’s positions in the chain and balance standardized operations with localization and resilience.',
    keyTakeaways: ['Cross-border reach adds logistics, payment and compliance complexity.', 'Localization adapts the experience to each market.', 'Vietnam can participate as a market, exporter, brand and service provider.', 'Greater value capture requires quality, brand and reliable execution.', 'Standardization, localization and diversification work together.'],
    businessImplications: 'Expand internationally only when the full delivered proposition works, and diversify the dependencies whose failure would interrupt demand or service.',
    remember: 'Digital reach crosses borders faster than products, payments and obligations.',
    nextLesson: '',
  },
};
