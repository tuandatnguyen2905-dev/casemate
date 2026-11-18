import { EcomDeepDive, citeEcom, ecomM2Chapter, ecomQuiz } from './ecomM2Core';
import type { EcomM2LessonBundle } from './ecomM2Core';

const LESSON = 'Downstream Activities';

const deck = [
  ecomM2Chapter({
    title: 'Fulfillment, Warehousing and Last-Mile Delivery', chapterTitle: LESSON, readingTime: '8',
    objective: 'Trace fulfillment from inventory allocation to delivery exceptions and explain the service-cost trade-off.',
    mateIntro: 'The digital transaction becomes real when the correct item reaches the customer. Every warehouse and carrier decision is part of the shopping experience.',
    keyInsight: 'Fulfillment is both a service-quality function and a major cost component. Businesses must balance delivery speed and convenience with inventory efficiency, transportation costs, and the customer’s willingness to pay for shipping.',
    statTiles: [
      { value: '7', label: 'Fulfillment activities', subtitle: 'Pick through performance', description: 'The chapter covers the path from confirmed order to measured delivery.' },
      { value: '4', label: 'Fulfillment models', subtitle: 'Merchant, platform, 3PL, combined', description: 'Responsibility varies, but the customer expects one result.' },
      { value: '4', label: 'Performance dimensions', subtitle: 'Time, accuracy, cost, on-time rate', description: 'Operations balance service and economics.' },
    ],
    statsNote: 'These are counts of activities, models and measures named in the chapter; no delivery benchmark is claimed.',
    narrative: [
      { label: 'What it is', text: 'After confirmation, fulfillment allocates inventory, picks and packs, dispatches, transports, tracks and proves delivery. The merchant, platform, 3PL or a combination may perform the work.' },
      { label: 'Why it is happening', text: 'Last-mile delivery is the final connection between an online promise and the customer’s physical experience. Speed, reliability and cost shape satisfaction and repeat purchase.' },
      { label: 'Real-world example', text: 'Warehouse teams locate and verify products, systems prioritize orders, carriers are selected by destination and service level, tracking provides visibility, and exception teams resolve delays, damage or address problems.' },
      { label: 'Vietnam example', text: 'A Vietnamese customer may receive an order at home, an office or a pickup point. Carriers and sellers need accurate addresses, service-level choices and clear status updates to complete the last mile reliably.' },
      { label: 'Business impact', text: 'Faster or more convenient delivery can improve satisfaction but increase inventory and transport cost. Performance measurement connects customer promises to delivery time, accuracy, shipment cost and on-time completion.' },
    ],
    visualKind: 'ecom-m2-41-fulfillment', visualHeading: 'Seven downstream steps from order to doorstep', visualIntro: 'Follow a confirmed order through warehouse, carrier, tracking and exception recovery.', imageAlt: 'Casemate fulfillment flow from inventory allocation to last-mile delivery',
    keyTerms: [
      { term: 'Inventory allocation', definition: 'Reserving stock at the correct location for a confirmed order.' },
      { term: 'Last-mile delivery', definition: 'The final transport stage from a local facility to the customer or pickup point.' },
      { term: 'Proof of delivery', definition: 'Evidence that the order reached the intended destination.' },
      { term: 'Delivery exception', definition: 'A delay, failed attempt, damage or address problem outside the expected flow.' },
    ],
    recap: ['Fulfillment starts after confirmation and inventory allocation.', 'Responsibility may sit with sellers, platforms or partners.', 'Last mile connects the digital promise to physical experience.', 'Speed and convenience must be balanced against cost.'],
    chapterRecap: 'Fulfillment converts digital orders into completed deliveries. Efficient warehousing, reliable carriers, and effective last-mile operations help control costs while delivering the convenience customers expect from e-commerce.',
    deepDiveTitle: 'Why delivery is part of the product',
    body: <EcomDeepDive paragraphs={[
      'For an online buyer, the item and the method by which it arrives are experienced together. A correct product delivered late or damaged is not a successful order from the customer’s perspective.',
      'Fulfillment strategy therefore belongs in the value proposition and the unit economics. The promise should match what inventory and transport operations can deliver repeatedly.'
    ]} evidence="The fulfillment stages, operating models and service-cost trade-off come directly from the supplied chapter." />,
    sources: citeEcom('unctadDigitalEconomy', 'worldBankVietnam'),
  }),
  ecomM2Chapter({
    title: 'Returns, Refunds, Customer Service and Dispute Resolution', chapterTitle: LESSON, readingTime: '8',
    objective: 'Explain the seven after-sales activities and how coordinated reverse logistics balances trust with cost.',
    mateIntro: 'Delivery closes the forward journey, not the relationship. Returns and disputes reveal whether the platform’s promise still holds when something goes wrong.',
    keyInsight: 'After-sales service is a key component of customer trust and retention. Efficient returns and dispute resolution can improve long-term customer relationships, while poorly controlled return rates and refund costs can significantly weaken profitability.',
    statTiles: [
      { value: '7', label: 'After-sales activities', subtitle: 'Authorization through monitoring', description: 'Each manages a different part of service recovery.' },
      { value: '4', label: 'Potential service owners', subtitle: 'Merchant, platform, logistics, external provider', description: 'Policies must define accountability among them.' },
      { value: '2', label: 'Objectives to balance', subtitle: 'Customer trust and cost control', description: 'Easy recovery needs effective eligibility and operational controls.' },
    ],
    statsNote: 'These are structural counts from the chapter; no return-rate or refund-time benchmark is introduced.',
    narrative: [
      { label: 'What it is', text: 'After delivery, customers may request exchanges, refunds, returns, warranty support or help with incorrect, damaged, counterfeit or unsuitable products. These activities form reverse logistics and after-sales service.' },
      { label: 'Why it is happening', text: 'Merchants, marketplace operators, logistics providers or service partners may each own part of the process. Policies and connected systems must determine responsibility, authorize remedies, recover goods and resolve disputes fairly.' },
      { label: 'Real-world example', text: 'Return authorization checks eligibility, payment systems process refunds, carriers collect products, teams inspect and restock, support answers questions, dispute processes review evidence and warranty services repair or replace.' },
      { label: 'Vietnam example', text: 'A Vietnamese marketplace order may involve a household seller, platform support, a carrier and a payment provider. Clear status, evidence and refund responsibility prevent the customer from being passed between parties.' },
      { label: 'Business impact', text: 'Efficient recovery can preserve trust after failure. Poor controls allow return, refund and handling costs to weaken contribution, so quality monitoring tracks resolution time, refund turnaround, returns and satisfaction.' },
    ],
    visualKind: 'ecom-m2-42-returns', visualHeading: 'Seven after-sales activities that protect trust', visualIntro: 'See how support, money and product recovery reconnect around the customer.', imageAlt: 'Casemate orbit mind map of returns, refunds and customer service',
    keyTerms: [
      { term: 'Reverse logistics', definition: 'Collection, return transport, inspection, restocking or disposal after a sale.' },
      { term: 'Return authorization', definition: 'Confirming whether a return or exchange is eligible under policy.' },
      { term: 'Dispute resolution', definition: 'Investigating disagreements involving delivery, product, seller or payment.' },
      { term: 'Refund reconciliation', definition: 'Matching the refunded amount and payment record to the original transaction.' },
    ],
    recap: ['After-sales starts when the delivered order needs help or remedy.', 'Several participants may share responsibility.', 'Reverse logistics recovers and evaluates returned products.', 'Trust and profitability both depend on controlled, fair recovery.'],
    chapterRecap: 'Post-purchase operations protect customer confidence and provide opportunities to recover service failures. Effective policies, clear accountability, and coordinated reverse logistics help balance customer satisfaction with operational costs.',
    deepDiveTitle: 'Why service recovery can strengthen a relationship',
    body: <EcomDeepDive paragraphs={[
      'A failed order creates a second opportunity to demonstrate reliability. Clear communication, fair investigation and prompt resolution can show the customer how the business behaves under pressure.',
      'Recovery still needs eligibility, evidence and cost controls. Trust is not created by approving every request; it is created by applying transparent rules consistently.'
    ]} evidence="The after-sales activities and trust-cost trade-off come directly from the supplied chapter." />,
    sources: citeEcom('moitLawGuide', 'unctadDigitalEconomy'),
  }),
  ecomM2Chapter({
    title: 'Customer Retention, Loyalty and Relationship Management', chapterTitle: LESSON, readingTime: '8',
    objective: 'Connect CRM, loyalty and engagement activities to repeat purchase, retention and customer lifetime value.',
    mateIntro: 'Acquisition buys the first transaction. Retention determines whether that spending created a customer or only rented an order.',
    keyInsight: 'Long-term value depends on more than the number of registered users or completed orders. Businesses must understand customer lifetime value, purchase frequency, retention, and the cost of maintaining customer relationships.',
    statTiles: [
      { value: '7', label: 'Retention activities', subtitle: 'CRM through lifetime value', description: 'The chapter links relationship operations to commercial measurement.' },
      { value: '4', label: 'Long-term measures', subtitle: 'CLV, frequency, retention, relationship cost', description: 'They reveal value beyond a first order.' },
      { value: '2', label: 'Retention models', subtitle: 'Marketplace and merchant', description: 'Platforms emphasize breadth and convenience; brands emphasize identity and direct relationships.' },
    ],
    statsNote: 'The figures count activities, measures and models in the chapter; no retention benchmark is claimed.',
    narrative: [
      { label: 'What it is', text: 'E-commerce businesses use CRM, loyalty programs, relevant communication and recommendations to encourage repeat purchase after expensive acquisition and introductory promotion.' },
      { label: 'Why it is happening', text: 'Marketplaces may retain through membership, convenience, payment features and assortment. Individual merchants may emphasize personal service, brand identity, exclusive products, subscriptions and direct relationships.' },
      { label: 'Real-world example', text: 'CRM stores profiles and service history; loyalty rewards repeat purchase; recommendations and replenishment reminders add relevance; retention campaigns re-engage inactive customers; and feedback identifies improvement needs.' },
      { label: 'Vietnam example', text: 'A Vietnamese brand selling through marketplaces and its own store may use marketplace reach for acquisition while building consented direct relationships and relevant post-purchase service through its owned channel.' },
      { label: 'Business impact', text: 'Customer lifetime value compares long-term contribution with acquisition and retention costs. Registered users and completed orders are incomplete measures when frequency and repeat behavior remain unknown.' },
    ],
    visualKind: 'ecom-m2-43-retention', visualHeading: 'Seven layers that turn transactions into relationships', visualIntro: 'Climb from CRM records to lifetime-value discipline.', imageAlt: 'Casemate layered pyramid of e-commerce retention activities',
    keyTerms: [
      { term: 'CRM', definition: 'Systems and practices maintaining customer profiles, consent, service history and interactions.' },
      { term: 'Retention', definition: 'The ability to keep customers purchasing or engaged over time.' },
      { term: 'Purchase frequency', definition: 'How often a customer completes a purchase in a period.' },
      { term: 'Customer lifetime value', definition: 'Expected customer contribution across the relationship compared with acquisition and retention cost.' },
    ],
    recap: ['Retention turns transactions into longer relationships.', 'Marketplaces and merchants use different retention strengths.', 'Loyalty and personalization should remain relevant, not automatic.', 'Lifetime value connects repeat behavior to economics.'],
    chapterRecap: 'Retention and relationship management help convert individual transactions into long-term customer value. Sustainable strategies prioritize relevant engagement, service quality, and repeat purchasing rather than relying exclusively on discounts.',
    deepDiveTitle: 'Why registered users are not customer value',
    body: <EcomDeepDive paragraphs={[
      'Registration records an account, not a durable relationship. Commercial value appears when customers return, buy at sustainable contribution and require a support cost the business can carry.',
      'Lifetime-value analysis prevents retention from becoming another discount program. It asks whether the relationship creates more value than acquisition and maintenance consume.'
    ]} evidence="The retention activities and measures come directly from the supplied chapter. No customer-lifetime benchmark is introduced." />,
    sources: citeEcom('emarketerForecast', 'unctadDigitalEconomy'),
  }),
];

const quiz = ecomQuiz('ecom-m2-l4', [
  { chapter: '1', objective: 'Trace fulfillment', question: 'What happens during order picking and packing?', application: 'A warehouse prepares the wrong quantity. Which step failed?', correct: 'Retrieve the correct products, verify quantities and prepare parcels', wrong: ['Authorize customer payment', 'Write product descriptions', 'Choose suppliers'], explanation: 'Picking and packing prepare the physical order. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain last mile', question: 'Why is last-mile delivery important?', application: 'The parcel reaches the local depot but not the buyer. Which stage failed?', correct: 'It is the final connection between the transaction and physical experience', wrong: ['It determines product manufacturing', 'It replaces checkout', 'It sets marketplace policy'], explanation: 'Last mile completes physical delivery. Review Chapter 1.' },
  { chapter: '1', objective: 'Balance fulfillment economics', question: 'What must fulfillment strategy balance?', application: 'Faster delivery raises cost beyond what buyers will pay. What trade-off applies?', correct: 'Speed and convenience against inventory and transportation cost', wrong: ['Only delivery speed', 'Only warehouse size', 'Only product variety'], explanation: 'Service and cost must be balanced. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify reverse logistics', question: 'What does reverse logistics include?', application: 'A returned parcel must be collected and inspected. Which process?', correct: 'Collection, return shipping, inspection and possible restocking', wrong: ['Customer acquisition', 'Product discovery', 'Supplier selection'], explanation: 'Reverse logistics handles product recovery. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain responsibility', question: 'Why do after-sales systems need clear accountability?', application: 'Seller, platform and carrier each redirect the customer. What is missing?', correct: 'Defined ownership for authorization, refund, recovery and disputes', wrong: ['More advertisements', 'More product categories', 'A longer checkout'], explanation: 'Clear ownership prevents service gaps. Review Chapter 2.' },
  { chapter: '2', objective: 'Balance trust and cost', question: 'How can poor return control affect profitability?', application: 'Refund and handling costs rise without checks. What happens?', correct: 'Return and refund costs weaken contribution', wrong: ['Profit automatically rises', 'Acquisition becomes free', 'Inventory becomes more accurate'], explanation: 'After-sales service requires operational controls. Review Chapter 2.' },
  { chapter: '3', objective: 'Define retention', question: 'What does customer retention measure?', application: 'A team counts accounts but not repeat purchase. What is missing?', correct: 'Whether customers continue purchasing or engaging over time', wrong: ['Only first-order value', 'Only website traffic', 'Only product count'], explanation: 'Retention follows the relationship beyond acquisition. Review Chapter 3.' },
  { chapter: '3', objective: 'Compare retention approaches', question: 'How may a marketplace encourage retention?', application: 'A platform adds membership and payment convenience. What objective?', correct: 'Continued use through benefits, convenience and broad selection', wrong: ['Eliminate all merchants', 'Own every product', 'Remove customer choice'], explanation: 'Platforms retain through ecosystem value. Review Chapter 3.' },
  { chapter: '3', objective: 'Interpret lifetime value', question: 'What should customer lifetime value compare?', application: 'Repeat revenue is high but support and acquisition are higher. What should be assessed?', correct: 'Long-term contribution against acquisition and retention costs', wrong: ['Revenue without any costs', 'Registered accounts only', 'Orders in one day only'], explanation: 'Lifetime value includes relationship economics. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply relationship discipline', question: 'Why should retention not rely only on discounts?', application: 'Customers return only for vouchers. What is the risk?', correct: 'Repeat activity may not create sustainable contribution or loyalty', wrong: ['Discounts have no cost', 'Every voucher creates loyalty', 'Service quality becomes irrelevant'], explanation: 'Relevant value and service sustain relationships. Review Chapter 3.' },
]);

export const LESSON_ECOM2_4: EcomM2LessonBundle = {
  deck, quiz,
  takeaways: {
    learned: 'You can trace physical fulfillment, design after-sales recovery and connect retention activity to customer lifetime economics.',
    keyTakeaways: ['Fulfillment turns a digital promise into physical experience.', 'Last-mile reliability affects satisfaction and repeat purchase.', 'Returns and disputes require clear ownership across participants.', 'Service recovery balances trust with operational control.', 'Retention is measured through frequency, contribution and lifetime value.'],
    businessImplications: 'Design delivery, recovery and retention as one relationship system, with service promises matched to cost and operating capability.',
    remember: 'The relationship continues after delivery, especially when something goes wrong.',
    nextLesson: 'Inputs, Outputs & Value Creation',
  },
};
