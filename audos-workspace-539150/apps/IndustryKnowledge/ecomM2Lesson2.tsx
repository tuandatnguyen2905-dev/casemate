import { EcomDeepDive, citeEcom, ecomM2Chapter, ecomQuiz } from './ecomM2Core';
import type { EcomM2LessonBundle } from './ecomM2Core';

const LESSON = 'Upstream Activities';

const deck = [
  ecomM2Chapter({
    title: 'Product Sourcing, Supplier Management and Inventory Procurement', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how sourcing and merchant governance determine the quality, availability and cost of products entering the system.',
    mateIntro: 'The customer cannot buy what the business cannot source, and no interface can repair an unreliable product after it arrives.',
    keyInsight: 'Product availability, quality, and sourcing costs establish the foundation for the customer experience and commercial performance. Poor supplier management can lead to stockouts, inconsistent quality, delayed fulfillment, and customer complaints.',
    statTiles: [
      { value: '6', label: 'Upstream activities', subtitle: 'Selection through diversification', description: 'The chapter covers the controls required before products reach the storefront.' },
      { value: '2', label: 'Inventory models', subtitle: 'Owned stock or seller-owned', description: 'Inventory-led businesses procure stock; marketplace sellers often retain ownership.' },
      { value: '4', label: 'Supplier evaluation dimensions', subtitle: 'Quality, price, reliability, compliance', description: 'Each dimension affects customer experience and economics.' },
    ],
    statsNote: 'These are counts from the supplied chapter, not supplier-performance benchmarks.',
    narrative: [
      { label: 'What it is', text: 'Upstream sourcing identifies products, selects suppliers, negotiates terms and ensures goods can be supplied at the required quality, quantity and cost. Inventory-led businesses purchase or own stock before sale.' },
      { label: 'Why it is happening', text: 'Marketplace sellers may own their own inventory, but the operator still needs suitable merchants, verified information, listing standards and rules protecting customers from counterfeit, unsafe or misleading products.' },
      { label: 'Real-world example', text: 'Teams evaluate manufacturers and distributors, plan replenishment, inspect quality, onboard merchants, shape assortment and develop alternative suppliers.' },
      { label: 'Vietnam example', text: 'A Vietnamese marketplace may host established brands, distributors and household sellers within the same category. Verification, product standards and clear assortment rules help manage the resulting variation in quality and reliability.' },
      { label: 'Business impact', text: 'Weak sourcing creates stockouts, defects, delays and complaints before marketing or checkout can add value. Diversification and governance reduce disruption and protect trust.' },
    ],
    visualKind: 'ecom-m2-21-sourcing', visualHeading: 'Six upstream sourcing and governance activities', visualIntro: 'See how each activity protects supply, availability or trust.', imageAlt: 'Casemate tree mind map of e-commerce sourcing and merchant governance',
    keyTerms: [
      { term: 'Procurement planning', definition: 'Deciding quantities, replenishment timing and supplier payment terms.' },
      { term: 'Assortment planning', definition: 'Selecting categories, price ranges and brands for the target market.' },
      { term: 'Supplier diversification', definition: 'Developing alternative sources to reduce dependence on one supplier.' },
      { term: 'Quality assurance', definition: 'Controls for product quality, defects, damage and supplier disputes.' },
    ],
    recap: ['Supplier selection balances quality, cost, reliability and compliance.', 'Inventory-led firms own more procurement risk.', 'Marketplaces still govern sellers and product standards.', 'Diversification and quality controls protect availability and trust.'],
    chapterRecap: 'Upstream sourcing and supplier management determine the quality, availability, and cost of products entering the e-commerce system. Effective procurement and merchant governance help prevent operational disruptions and protect customer trust.',
    deepDiveTitle: 'Why marketplaces still have an upstream function',
    body: <EcomDeepDive paragraphs={[
      'A marketplace may not buy the inventory, but it still decides who may sell, what information must be supplied and which products are permitted. Those choices shape the effective quality of its assortment.',
      'Inventory ownership changes the financial risk; it does not remove the operator’s need to govern availability, authenticity and customer expectations.'
    ]} evidence="The sourcing activities and distinction between inventory-led and marketplace models come directly from the supplied chapter." />,
    sources: citeEcom('unctadDigitalEconomy', 'moitLawGuide'),
  }),
  ecomM2Chapter({
    title: 'Technology Infrastructure and Digital Commerce Tools', chapterTitle: LESSON, readingTime: '8',
    objective: 'Map the seven technology layers and explain the trade-off between proprietary systems, commercial platforms and external services.',
    mateIntro: 'The storefront is only the visible layer. Catalogs, data, cloud, payments, integration and security carry the transaction underneath it.',
    keyInsight: 'Technology infrastructure is an enabling layer across the entire value chain. Reliability, scalability, integration, and security directly influence the platform’s ability to handle demand, protect information, and deliver a consistent shopping experience.',
    statTiles: [
      { value: '7', label: 'Technology activities', subtitle: 'Commerce platform through maintenance', description: 'Each supports a different part of digital operation.' },
      { value: '3', label: 'Build approaches', subtitle: 'Proprietary, commercial, hybrid', description: 'Businesses choose based on scale, cost, flexibility and complexity.' },
      { value: '4', label: 'Critical qualities', subtitle: 'Reliable, scalable, integrated, secure', description: 'All four influence consistent service.' },
    ],
    statsNote: 'The figures count layers, approaches and qualities named in this chapter; no uptime or traffic benchmark is claimed.',
    narrative: [
      { label: 'What it is', text: 'Digital commerce infrastructure supports storefronts, marketplaces, transactions, catalogs, inventory, accounts and data. It includes cloud computing, databases, delivery networks for content, APIs, security and commerce software.' },
      { label: 'Why it is happening', text: 'Businesses can build proprietary systems, buy commercial software or combine both. Large platforms may customize for volume and differentiation, while smaller merchants use hosted platforms and ready-made integrations to reduce investment and complexity.' },
      { label: 'Real-world example', text: 'Commerce platforms run catalog, cart and orders; cloud resources host applications; payment integrations connect financial networks; data systems store records; security protects access; and APIs connect ERP, CRM, warehouse and shipping tools.' },
      { label: 'Vietnam example', text: 'A Vietnamese SME can launch through a hosted storefront and local payment and shipping integrations rather than building every system. The trade-off is greater dependence on external pricing, compatibility and service availability.' },
      { label: 'Business impact', text: 'Technology choices affect implementation cost, flexibility and long-term dependence. Testing, updates, performance monitoring and support are ongoing activities, not one-time launch tasks.' },
    ],
    visualKind: 'ecom-m2-22-technology', visualHeading: 'Seven layers of digital commerce infrastructure', visualIntro: 'Read the enabling layers from storefront through ongoing maintenance.', imageAlt: 'Casemate layered pyramid of e-commerce technology infrastructure',
    keyTerms: [
      { term: 'API', definition: 'A defined interface allowing commerce, payment, inventory and shipping systems to exchange data.' },
      { term: 'Hosted storefront', definition: 'A commercial platform providing ready-made online-store infrastructure.' },
      { term: 'Scalability', definition: 'The ability to handle increased transactions and traffic without service failure.' },
      { term: 'Technology dependence', definition: 'Reliance on a vendor, platform or integration that may affect future flexibility.' },
    ],
    recap: ['Seven technology layers support the value chain.', 'Businesses can build, buy or combine systems.', 'Smaller merchants trade customization for speed and simplicity.', 'Reliability, scale, integration and security shape customer experience.'],
    chapterRecap: 'Technology infrastructure enables e-commerce businesses to operate and scale. The choice between proprietary systems, commercial platforms, and external services affects implementation costs, operational flexibility, and long-term technology dependence.',
    deepDiveTitle: 'Why build versus buy is really a control decision',
    body: <EcomDeepDive paragraphs={[
      'Commercial tools reduce launch time and technical burden because common capabilities are already built. Proprietary systems offer more control over differentiation, data and operating logic but require sustained investment.',
      'Hybrid architecture is common because businesses keep distinctive capabilities close and connect standardized services for payments, cloud or shipping through integrations.'
    ]} evidence="The infrastructure layers and three build approaches are taken from the supplied chapter. No vendor performance claim is made." />,
    sources: citeEcom('unctadDigitalEconomy', 'unctadMeasuring'),
  }),
  ecomM2Chapter({
    title: 'Logistics Infrastructure, Payment Networks and External Service Providers', chapterTitle: LESSON, readingTime: '8',
    objective: 'Explain how external providers enable scale and how service levels and partner risk controls protect reliability.',
    mateIntro: 'Outsourcing a capability does not outsource the customer’s expectation. The partner may do the work, but the commerce business still owns the outcome.',
    keyInsight: 'Third-party infrastructure allows e-commerce businesses to expand without building every capability internally. Effective partner selection and service-level management are essential to control costs and maintain reliable operations.',
    statTiles: [
      { value: '7', label: 'Partner-management activities', subtitle: '3PL through risk management', description: 'The chapter spans capability access and control.' },
      { value: '5', label: 'SLA focus areas', subtitle: 'Delivery, availability, response, resolution, continuity', description: 'Service expectations must be measurable.' },
      { value: '4', label: 'Dependency risks', subtitle: 'Price, availability, compatibility, data', description: 'External scale creates external exposure.' },
    ],
    statsNote: 'These are framework counts from the supplied chapter; no provider ranking or performance rate is stated.',
    narrative: [
      { label: 'What it is', text: 'External services supply warehousing, transport, payment and settlement, advertising, analytics and customer support needed to prepare for and complete online transactions.' },
      { label: 'Why it is happening', text: 'Specialized providers let businesses enter markets and add capability without building every asset. Reliance creates dependencies involving price, service availability, compatibility and access to customer or transaction data.' },
      { label: 'Real-world example', text: 'A 3PL picks and packs, a payment service integrates cards and wallets, carriers connect regional and last-mile networks, and an outsourced support team handles order questions under agreed response times.' },
      { label: 'Vietnam example', text: 'A Vietnamese merchant can combine local bank transfers or wallets with external parcel networks and outsourced campaign tools. Partner selection should reflect the merchant’s locations, customer expectations and data responsibilities.' },
      { label: 'Business impact', text: 'Service-level agreements define delivery, system availability, response and resolution expectations. Risk management reviews provider reliability, data protection, continuity and contractual dependence.' },
    ],
    visualKind: 'ecom-m2-23-infrastructure', visualHeading: 'Seven external capabilities and how to manage them', visualIntro: 'Compare what each partner provides with the control the business must retain.', imageAlt: 'Casemate table of e-commerce external providers and management priorities',
    keyTerms: [
      { term: '3PL', definition: 'A third-party logistics provider handling warehousing, fulfillment or transport.' },
      { term: 'Service-level agreement', definition: 'Measurable commitments for performance, availability, response and issue resolution.' },
      { term: 'Partner risk', definition: 'Exposure created by relying on another provider’s service, security or continuity.' },
      { term: 'Attribution', definition: 'Connecting marketing activity to customer actions or sales.' },
    ],
    recap: ['External providers make capabilities available faster.', 'Dependencies include price, availability, compatibility and data.', 'Service levels turn expectations into measurable commitments.', 'Risk management preserves continuity and control.'],
    chapterRecap: 'External infrastructure providers supply capabilities that would be costly or difficult to build independently. Strong partner management helps e-commerce businesses scale while maintaining service quality and controlling operational risk.',
    deepDiveTitle: 'Why partner performance belongs inside the operating model',
    body: <EcomDeepDive paragraphs={[
      'Customers do not separate the merchant from the carrier or payment provider when an order fails. Partner performance therefore becomes part of the brand experience even when the contract says otherwise.',
      'Selection, measurable service levels and continuity plans make external capability usable without turning every dependency into an uncontrolled risk.'
    ]} evidence="The provider categories, dependencies and management controls come directly from the supplied chapter." />,
    sources: citeEcom('unctadDigitalEconomy', 'worldBankVietnam'),
  }),
];

const quiz = ecomQuiz('ecom-m2-l2', [
  { chapter: '1', objective: 'Compare inventory models', question: 'Which business usually purchases stock before sale?', application: 'A retailer owns warehouse inventory. Which model is this?', correct: 'An inventory-led e-commerce business', wrong: ['A pure marketplace operator only', 'A payment provider', 'An advertising platform'], explanation: 'Inventory-led businesses own or procure stock. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain marketplace sourcing', question: 'What upstream duty remains for a marketplace?', application: 'Sellers own inventory. What must the operator still do?', correct: 'Attract and verify merchants and govern listings and product standards', wrong: ['Ignore product information', 'Own every warehouse', 'Set consumer law'], explanation: 'Inventory ownership does not remove governance. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply supplier management', question: 'What can poor supplier management cause?', application: 'Stockouts and defects rise. Which upstream capability is weak?', correct: 'Selection, planning and quality assurance', wrong: ['Customer loyalty only', 'Search advertising only', 'Payment settlement only'], explanation: 'Sourcing controls protect availability and quality. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify infrastructure', question: 'What does data infrastructure store and process?', application: 'A team needs product, inventory and transaction records. Which layer?', correct: 'Product, customer, inventory, transaction and behavioral data', wrong: ['Parcels only', 'Physical shelves only', 'Advertising slogans only'], explanation: 'Data infrastructure supports operations and decisions. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare build approaches', question: 'Why might a small merchant use a hosted platform?', application: 'A merchant needs to launch without a large engineering team. What helps?', correct: 'It reduces initial investment and technical complexity', wrong: ['It removes every dependency', 'It guarantees profit', 'It eliminates maintenance'], explanation: 'Hosted tools trade control for speed and simplicity. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain integrations', question: 'What do integration tools connect?', application: 'Orders must reach ERP, warehouse and shipping systems. What is required?', correct: 'Storefronts with ERP, CRM, warehouse and shipping systems', wrong: ['Only product photos', 'Only staff schedules', 'Only tax rates'], explanation: 'Integrations coordinate systems. Review Chapter 2.' },
  { chapter: '3', objective: 'Identify 3PL work', question: 'What can a 3PL provide?', application: 'A merchant outsources picking and packing. Which partner handles it?', correct: 'Warehousing, order picking, packing and transport', wrong: ['Product manufacturing only', 'Consumer regulation', 'Search ranking only'], explanation: '3PLs provide logistics capability. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain service levels', question: 'What should a service-level agreement establish?', application: 'A support provider has no response commitment. What is missing?', correct: 'Performance, availability, response and issue-resolution requirements', wrong: ['Product ownership', 'Market share', 'Brand positioning'], explanation: 'SLAs make partner commitments measurable. Review Chapter 3.' },
  { chapter: '3', objective: 'Recognize dependency', question: 'Which risk can reliance on an external provider create?', application: 'A vendor changes price and breaks compatibility. What type of issue is this?', correct: 'Pricing, availability, compatibility and data-access dependency', wrong: ['Guaranteed flexibility', 'Elimination of continuity risk', 'Automatic customer ownership'], explanation: 'External scale creates dependencies. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply partner governance', question: 'Why must partner risk be managed?', application: 'A carrier outage stops all deliveries. What should have been assessed?', correct: 'Provider reliability, continuity and contractual dependence', wrong: ['Only logo placement', 'Only product color', 'Only office location'], explanation: 'Partner controls protect operations. Review Chapter 3.' },
]);

export const LESSON_ECOM2_2: EcomM2LessonBundle = {
  deck, quiz,
  takeaways: {
    learned: 'You can explain upstream product governance, choose among technology approaches and manage external infrastructure providers.',
    keyTakeaways: ['Sourcing determines product quality, availability and cost.', 'Marketplace operators still govern sellers and listings.', 'Seven technology layers support operation and scale.', 'Build, buy and hybrid approaches trade control against speed and complexity.', 'Partners expand capability but require service levels and risk controls.'],
    businessImplications: 'Keep distinctive capabilities under deliberate control and make every critical external dependency measurable, monitored and replaceable where practical.',
    remember: 'Outsourcing the activity does not outsource the customer outcome.',
    nextLesson: 'Midstream Activities',
  },
};
