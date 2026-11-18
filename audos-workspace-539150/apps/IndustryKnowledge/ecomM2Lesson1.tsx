import { EcomDeepDive, citeEcom, ecomM2Chapter, ecomQuiz } from './ecomM2Core';
import type { EcomM2LessonBundle } from './ecomM2Core';

const LESSON = 'Value Chain Overview';

const deck = [
  ecomM2Chapter({
    title: 'Value Chain Structure and Main Stages', chapterTitle: LESSON, readingTime: '7',
    objective: 'Trace an e-commerce transaction from product supply through post-purchase engagement and explain why digital and physical activities must work together.',
    mateIntro: 'The customer sees one screen. Behind it, seven linked stages have to move a product, information and money without dropping the promise made at checkout.',
    keyInsight: 'E-commerce value creation depends on the coordination of digital and physical activities. A smooth online shopping interface creates limited value if product availability, payment processing, delivery, or after-sales service fails.',
    statTiles: [
      { value: '7', label: 'Main stages', subtitle: 'Supply through post-purchase', description: 'Product sourcing, onboarding, platform operations, discovery, transaction, fulfillment and post-purchase service.' },
      { value: '2', label: 'Delivery modes', subtitle: 'Physical and digital', description: 'Physical products require inventory and logistics; digital products may be delivered electronically.' },
      { value: '1', label: 'Customer experience', description: 'Buyers experience all connected stages as one commercial promise.' },
    ],
    statsNote: 'These tiles count the stages and delivery modes described in this chapter; they are not market measurements.',
    narrative: [
      { label: 'What it is', text: 'The e-commerce value chain connects suppliers, merchants, platforms and consumers. It begins with sourcing and merchant onboarding, continues through platform operations, discovery, ordering and payment, and concludes with fulfillment, delivery, support and post-purchase engagement.' },
      { label: 'Why it is happening', text: 'Unlike traditional retail, online commerce relies heavily on digital infrastructure and data to coordinate participants that may never meet. Physical goods still need stock and transport, while digital products may be delivered electronically.' },
      { label: 'Real-world example', text: 'A merchant submits product data and inventory, the platform makes the listing discoverable, the buyer checks out, a payment provider authorizes the transaction, and a warehouse or seller hands the parcel to a carrier. Support, returns, reviews and loyalty then shape whether the buyer returns.' },
      { label: 'Vietnam example', text: 'A Vietnamese seller may use a regional marketplace for storefront and traffic, a bank or wallet for payment, and an external carrier for delivery. The seller remains accountable for accurate listings and stock even when the other stages are handled by partners.' },
      { label: 'Business impact', text: 'Marketplace operators coordinate many independent sellers and service providers, while inventory-led retailers manage more supply and fulfillment themselves. The model changes who controls each stage, but not the need for coordination across the chain.' },
    ],
    visualKind: 'ecom-m2-11-structure', visualHeading: 'Seven stages from supply to repeat purchase', visualIntro: 'Follow the transaction from upstream product supply through downstream trust and retention.', imageAlt: 'Casemate value-chain map of seven e-commerce stages',
    keyTerms: [
      { term: 'Value chain', definition: 'The connected activities that transform products, information and services into value for buyers and sellers.' },
      { term: 'Merchant onboarding', definition: 'Registering a seller and creating the product, price and inventory records needed to trade.' },
      { term: 'Fulfillment', definition: 'Preparing, dispatching and delivering an order after it is confirmed.' },
      { term: 'Post-purchase engagement', definition: 'Support, returns, reviews, loyalty and communication after delivery.' },
    ],
    recap: ['Supply and onboarding start the chain.', 'Platforms coordinate discovery, checkout and transaction data.', 'Physical goods still require inventory and logistics.', 'Support and post-purchase activity determine trust and repeat purchase.'],
    chapterRecap: 'The e-commerce value chain integrates supply, digital platforms, customer acquisition, transactions, fulfillment, and post-purchase services. Performance depends on how effectively these activities work together to deliver value to buyers and sellers.',
    deepDiveTitle: 'Why the value chain is judged at its weakest link',
    body: <EcomDeepDive paragraphs={[
      'The interface can make a promise in seconds, but every downstream system must be able to keep it. Availability data has to match the physical item, payment has to clear, the parcel has to move and support has to resolve exceptions.',
      'For digital products the physical stages may disappear, but access, identity, payment and service remain. The chain changes shape rather than becoming unnecessary.'
    ]} evidence="The seven stages and distinction between physical and digital delivery come directly from the supplied chapter. No market figures are introduced." />,
    sources: citeEcom('unctadDigitalEconomy', 'unctadMeasuring'),
  }),
  ecomM2Chapter({
    title: 'Key Participants and Their Roles', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the eight participant groups and explain how responsibility allocation changes cost, quality, scale and customer control.',
    mateIntro: 'A marketplace is not one company doing everything. It is an agreement among specialists, and the customer notices whenever their responsibilities do not line up.',
    keyInsight: 'Competitive advantage depends not only on the platform itself but also on the quality of its surrounding ecosystem. Reliable partners and clearly defined responsibilities help reduce transaction friction and improve customer satisfaction.',
    statTiles: [
      { value: '8', label: 'Participant groups', subtitle: 'Brands through regulators', description: 'Each supplies a distinct capability required for trustworthy transactions.' },
      { value: '2', label: 'Capability models', subtitle: 'Internal or partnered', description: 'Large firms may internalize functions; others rely on specialized providers.' },
      { value: '4', label: 'Allocation effects', subtitle: 'Cost, quality, scale, control', description: 'Who owns each responsibility changes all four.' },
    ],
    statsNote: 'The figures count participant groups and effects named in this chapter, not companies or market shares.',
    narrative: [
      { label: 'What it is', text: 'Manufacturers and brands supply products; merchants manage online sales; marketplace operators facilitate transactions; and technology providers maintain commerce systems. Payments, logistics, marketing, support and regulation complete the ecosystem.' },
      { label: 'Why it is happening', text: 'No single participant needs to build every capability. Specialization can improve scale and speed, but it also creates handoffs and dependencies that must be managed.' },
      { label: 'Real-world example', text: 'A merchant sets price and stock, a marketplace enforces listing rules, a payment provider authorizes and refunds, a logistics partner ships and tracks, and a regulator defines consumer and data requirements.' },
      { label: 'Vietnam example', text: 'A small Vietnamese merchant may use hosted storefront tools, local payment methods, external delivery and creator marketing rather than building those capabilities internally. Clear ownership of customer inquiries and returns becomes essential.' },
      { label: 'Business impact', text: 'Some large operators internalize payments, logistics or advertising, while others partner. The allocation affects operating cost, service quality, scalability and who controls the customer relationship.' },
    ],
    visualKind: 'ecom-m2-12-participants', visualHeading: 'Eight participant groups around one transaction', visualIntro: 'See the role each participant plays in completing and governing a transaction.', imageAlt: 'Casemate orbit mind map of eight e-commerce participant groups',
    keyTerms: [
      { term: 'Marketplace operator', definition: 'The intermediary coordinating buyers, sellers, policy and transaction infrastructure.' },
      { term: 'Payment provider', definition: 'A specialist processing payments, verification, settlement and refunds.' },
      { term: 'Logistics partner', definition: 'A provider of warehousing, transport, tracking or reverse logistics.' },
      { term: 'Responsibility allocation', definition: 'The division of tasks and accountability among participants.' },
    ],
    recap: ['Eight participant groups contribute complementary capabilities.', 'Responsibilities vary by business model.', 'External partners expand capability but create dependencies.', 'Clear ownership reduces friction and protects satisfaction.'],
    chapterRecap: 'The value chain depends on coordination among product suppliers, platforms, service providers, merchants, and regulators. The structure of these relationships determines how efficiently an e-commerce business operates and how much control it retains over its customer experience.',
    deepDiveTitle: 'Why ecosystem quality becomes platform quality',
    body: <EcomDeepDive paragraphs={[
      'The buyer usually holds the storefront responsible even when a payment processor, seller or carrier caused the failure. Brand responsibility therefore extends beyond the legal boundary of the operator.',
      'Strong ecosystems define service levels, information handoffs and escalation paths before an exception occurs. That coordination is difficult to see when it works and obvious when it does not.'
    ]} evidence="Participant roles and the effects of responsibility allocation are taken from the supplied chapter. No company ranking or market share is claimed." />,
    sources: citeEcom('unctadDigitalEconomy', 'wtoEcommerce'),
  }),
  ecomM2Chapter({
    title: 'Value Flows, Dependencies and Industry Economics', chapterTitle: LESSON, readingTime: '8',
    objective: 'Distinguish product, information and financial flows and connect transaction activity to contribution economics.',
    mateIntro: 'A parcel can move correctly while the information or money around it fails. The chain works only when all three flows reconcile.',
    keyInsight: 'The economics of e-commerce depend on transaction volume, conversion, order value, service costs, and repeat purchasing. Increasing GMV alone does not guarantee profitability if customer acquisition, discounts, delivery subsidies, returns, or platform operations consume too much value.',
    statTiles: [
      { value: '3', label: 'Major flows', subtitle: 'Product, information, money', description: 'Each follows a different route but depends on the others.' },
      { value: '7', label: 'Economic activities', subtitle: 'Flow through ecosystem dependency', description: 'The chapter links coordination to per-order economics.' },
      { value: '1', label: 'Contribution view', description: 'Assess what remains after relevant product, payment, fulfillment, promotion, return and service costs.' },
    ],
    statsNote: 'The tiles are structural counts from this chapter. No GMV, conversion or margin benchmark is supplied.',
    narrative: [
      { label: 'What it is', text: 'Products move from suppliers or sellers to buyers; information moves across listings, orders, inventory, payments and logistics; and money moves among buyers, platforms, merchants and service providers.' },
      { label: 'Why it is happening', text: 'Digital commerce separates activities across specialized systems and organizations. The transaction therefore depends on accurate, timely handoffs across all three flows.' },
      { label: 'Real-world example', text: 'Incorrect stock data causes cancellation, payment failure interrupts checkout, and inaccurate delivery status reduces trust. Search data and sales history help plan inventory, while reconciliation connects payments, commissions, refunds and merchant payouts.' },
      { label: 'Vietnam example', text: 'A Vietnamese marketplace seller may receive a customer payment through an integrated payment method while a carrier collects the parcel and the platform deducts commission, advertising or service fees before settlement. Each record must agree.' },
      { label: 'Business impact', text: 'Businesses assess contribution per order after product, payment, fulfillment, promotion, return and service costs. High transaction volume can destroy value when these costs grow faster than retained revenue.' },
    ],
    visualKind: 'ecom-m2-13-flows', visualHeading: 'Three flows and the failures that interrupt them', visualIntro: 'Compare what moves through the chain with the dependency that can break it.', imageAlt: 'Casemate comparison map of product, information and financial flows',
    keyTerms: [
      { term: 'Product flow', definition: 'The movement of physical goods or digital products from supply to buyer.' },
      { term: 'Information flow', definition: 'Listings, stock, prices, orders, feedback and status exchanged across systems.' },
      { term: 'Financial flow', definition: 'Payments, fees, charges, settlement and refunds among participants.' },
      { term: 'Contribution margin per order', definition: 'Revenue retained after the relevant variable costs of serving one order.' },
    ],
    recap: ['Product, information and money move together.', 'Errors in one flow interrupt the others.', 'Demand data helps coordinate inventory and service.', 'GMV alone does not establish profitability.'],
    chapterRecap: 'Product, information, and financial flows are closely connected throughout the value chain. Strong coordination and disciplined unit economics are essential for turning high transaction activity into sustainable business value.',
    deepDiveTitle: 'Why GMV can grow while value shrinks',
    body: <EcomDeepDive paragraphs={[
      'GMV records activity across the platform. It does not show how much revenue the operator retains or what it costs to acquire, discount, deliver, return and support the order.',
      'Contribution analysis reconnects volume to economics. Growth becomes sustainable only when the retained value of transactions covers the work required to produce and service them.'
    ]} evidence="The three flows, dependencies and economic levers come directly from the supplied chapter. No benchmark margin or conversion rate is introduced." />,
    sources: citeEcom('unctadMeasuring', 'econSea'),
  }),
];

const quiz = ecomQuiz('ecom-m2-l1', [
  { chapter: '1', objective: 'Trace the stages', question: 'Where does the e-commerce value chain begin?', application: 'A map starts at checkout. What stages are missing first?', correct: 'Product sourcing and merchant onboarding', wrong: ['Customer retention only', 'Refund processing only', 'Delivery tracking only'], explanation: 'Supply and onboarding begin the chain. Review Chapter 1.' },
  { chapter: '1', objective: 'Connect digital and physical work', question: 'Why is a smooth interface insufficient?', application: 'Checkout works but the item is unavailable. What failed?', correct: 'Availability, payment, delivery and after-sales must also work', wrong: ['Only visual design matters', 'The value chain ends at search', 'Physical goods need no logistics'], explanation: 'Digital and physical activities must coordinate. Review Chapter 1.' },
  { chapter: '1', objective: 'Contrast models', question: 'How do marketplaces differ from inventory-led retailers?', application: 'A platform hosts independent sellers. What role does it emphasize?', correct: 'Marketplaces coordinate more independent sellers and providers', wrong: ['They always own every product', 'They avoid transaction infrastructure', 'They eliminate fulfillment'], explanation: 'Responsibility allocation differs by model. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify participant roles', question: 'Who sets prices, manages listings and maintains inventory?', application: 'A listing has the wrong stock. Which participant normally manages it?', correct: 'Merchants and resellers', wrong: ['Regulators', 'Advertising platforms only', 'Consumers'], explanation: 'Merchants manage the commercial listing. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain operator responsibility', question: 'What does a marketplace operator provide?', application: 'Buyers and sellers need rules and shared checkout. Who coordinates them?', correct: 'Connection, policy enforcement and transaction infrastructure', wrong: ['Only product manufacturing', 'Only last-mile delivery', 'Only tax legislation'], explanation: 'Operators coordinate the marketplace. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply ecosystem thinking', question: 'Why do clear partner responsibilities matter?', application: 'A refund stalls between seller and payment provider. What is missing?', correct: 'Clear accountability and coordinated handoffs', wrong: ['More product categories', 'A larger logo', 'Fewer records'], explanation: 'Coordination reduces friction. Review Chapter 2.' },
  { chapter: '3', objective: 'Distinguish flows', question: 'Which item belongs to the information flow?', application: 'A warehouse receives the wrong stock status. Which flow failed?', correct: 'Product details, stock levels and order status', wrong: ['The physical parcel only', 'The customer payment only', 'The warehouse building'], explanation: 'Stock and status are information. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain dependencies', question: 'What can incorrect inventory data cause?', application: 'Checkout succeeds for an unavailable item. What follows?', correct: 'Cancellation and damaged customer trust', wrong: ['Guaranteed repeat purchase', 'Lower return cost', 'Automatic settlement'], explanation: 'Flow errors create transaction failures. Review Chapter 3.' },
  { chapter: '3', objective: 'Interpret GMV', question: 'Why does rising GMV not guarantee profit?', application: 'Volume rises while subsidies and returns rise faster. What should be concluded?', correct: 'Acquisition, discounts, delivery, returns and operations may consume the value', wrong: ['GMV is identical to profit', 'Volume removes all costs', 'Returns increase recognized revenue'], explanation: 'GMV measures activity, not retained value. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply unit economics', question: 'What does contribution per order assess?', application: 'A team wants to know what one order leaves behind. What should it calculate?', correct: 'Revenue after relevant product, payment, fulfillment, promotion, return and service costs', wrong: ['GMV before every cost', 'Registered users only', 'Website visits only'], explanation: 'Contribution connects transactions to economics. Review Chapter 3.' },
]);

export const LESSON_ECOM2_1: EcomM2LessonBundle = {
  deck, quiz,
  takeaways: {
    learned: 'You can trace the full value chain, assign participant roles and connect product, information and financial flows to unit economics.',
    keyTakeaways: ['Seven stages connect supply to repeat purchase.', 'Digital and physical activities must work as one experience.', 'Eight participant groups contribute specialized capabilities.', 'Product, information and money flow through different but dependent systems.', 'GMV must be read alongside contribution economics.'],
    businessImplications: 'Define ownership at every handoff and measure retained value after the costs required to complete and support each order.',
    remember: 'The customer experiences one promise even when many participants deliver it.',
    nextLesson: 'Upstream Activities',
  },
};
