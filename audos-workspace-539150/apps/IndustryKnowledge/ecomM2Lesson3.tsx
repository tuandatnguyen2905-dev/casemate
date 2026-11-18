import { EcomDeepDive, citeEcom, ecomM2Chapter, ecomQuiz } from './ecomM2Core';
import type { EcomM2LessonBundle } from './ecomM2Core';

const LESSON = 'Midstream Activities';

const deck = [
  ecomM2Chapter({
    title: 'Platform Operations, Product Catalogs and Merchant Management', chapterTitle: LESSON, readingTime: '8',
    objective: 'Explain how catalog, seller, inventory and quality controls turn upstream inputs into a trustworthy shopping environment.',
    mateIntro: 'A marketplace can carry millions of products and still feel empty if the catalog is inconsistent, search is poor or the stock data cannot be trusted.',
    keyInsight: 'Platform quality depends on the accuracy and consistency of its commercial information. Poor product data, unreliable inventory records, or weak seller management can undermine conversion, increase cancellations, and damage trust.',
    statTiles: [
      { value: '7', label: 'Operating activities', subtitle: 'Catalog through quality monitoring', description: 'Together they create a usable digital marketplace.' },
      { value: '3', label: 'Core records', subtitle: 'Product, seller, inventory', description: 'These records must remain accurate across systems.' },
      { value: '4', label: 'Failure effects', subtitle: 'Poor discovery, lower conversion, cancellation, distrust', description: 'Information quality directly shapes commercial outcomes.' },
    ],
    statsNote: 'The figures count activities, records and effects in this chapter; no platform KPI benchmark is introduced.',
    narrative: [
      { label: 'What it is', text: 'Midstream operations organize catalogs, seller accounts, listing standards, search and navigation while presenting price and inventory accurately.' },
      { label: 'Why it is happening', text: 'Marketplaces combine products from many independent sellers. Operators need variety without losing consistency, quality control, fraud prevention or policy compliance.' },
      { label: 'Real-world example', text: 'Catalog teams structure categories and attributes; sellers optimize titles and images; inventory systems synchronize stock; search and filters help discovery; moderation identifies prohibited or misleading content; and monitoring tracks accuracy and complaints.' },
      { label: 'Vietnam example', text: 'A Vietnamese marketplace may receive the same product from many merchants with different titles, images and stock records. Common attributes, seller guidance and moderation make those offers comparable and trustworthy.' },
      { label: 'Business impact', text: 'Accurate catalogs and inventory reduce failed transactions. Seller dashboards, reporting and policy guidance improve merchant execution while monitoring identifies where quality controls need intervention.' },
    ],
    visualKind: 'ecom-m2-31-platform', visualHeading: 'Seven controls behind a usable marketplace', visualIntro: 'See how catalogs, sellers, stock and quality controls support conversion.', imageAlt: 'Casemate two-sided mind map of e-commerce platform operations',
    keyTerms: [
      { term: 'Catalog management', definition: 'Structuring products through categories, attributes, specifications, images and descriptions.' },
      { term: 'Inventory synchronization', definition: 'Keeping availability aligned across storefronts, warehouses and channels.' },
      { term: 'Content moderation', definition: 'Reviewing listings for misleading, prohibited, counterfeit or inappropriate content.' },
      { term: 'Listing optimization', definition: 'Improving titles, images, keywords and descriptions for discovery and purchase decisions.' },
    ],
    recap: ['Catalogs structure product information.', 'Seller management supports execution and policy compliance.', 'Inventory synchronization prevents false availability.', 'Moderation and monitoring protect quality and trust.'],
    chapterRecap: 'Platform operations convert product and merchant inputs into a usable digital marketplace. Accurate catalogs, reliable inventory, and effective seller governance support conversion and reduce transaction failures.',
    deepDiveTitle: 'Why product data is operational infrastructure',
    body: <EcomDeepDive paragraphs={[
      'Product data determines whether an item can be found, compared, ordered and fulfilled. It is not presentation layered on top of operations; it is the instruction set used by search, inventory and transaction systems.',
      'When many sellers contribute data, common standards and active monitoring become essential. Variety creates value only when buyers can understand and trust it.'
    ]} evidence="The seven activities and effects of weak product data come directly from the supplied chapter." />,
    sources: citeEcom('unctadDigitalEconomy', 'moitLawGuide'),
  }),
  ecomM2Chapter({
    title: 'Digital Marketing, Merchandising and Customer Acquisition', chapterTitle: LESSON, readingTime: '8',
    objective: 'Connect seven acquisition and merchandising levers to conversion, order value, retention and contribution.',
    mateIntro: 'Traffic is easy to celebrate because it arrives before the bill. Sustainable marketing begins when the full order economics are visible.',
    keyInsight: 'Customer acquisition is valuable only when it produces sustainable customer economics. High traffic or sales volume can be unprofitable if advertising costs, discounts, commissions, and fulfillment subsidies exceed the contribution generated by orders.',
    statTiles: [
      { value: '7', label: 'Demand levers', subtitle: 'SEO through campaign measurement', description: 'Each influences a different stage of discovery or purchase.' },
      { value: '5', label: 'Core measurements', subtitle: 'CAC, conversion, AOV, repeat, ROAS', description: 'The chapter uses them to connect marketing with economics.' },
      { value: '1', label: 'Sustainability test', description: 'Order contribution must exceed the acquisition and incentive burden over time.' },
    ],
    statsNote: 'These are counts of activities and metrics named in the chapter; no benchmark value is claimed.',
    narrative: [
      { label: 'What it is', text: 'Marketing and merchandising connect products with potential customers through search, social media, affiliates, email, creators, livestreams, promotions and recommendations.' },
      { label: 'Why it is happening', text: 'Merchandising decides category placement, featured products, bundles, campaigns, discounts and personalized recommendations. These choices shape discovery, conversion, order value and promotional cost.' },
      { label: 'Real-world example', text: 'SEO attracts organic traffic; paid media buys reach; creators demonstrate products; vouchers and bundles change the offer; recommendations improve relevance; and checkout testing reduces friction.' },
      { label: 'Vietnam example', text: 'A Vietnamese seller may combine marketplace advertising, short video, livestreams, vouchers and shipping offers. The channel mix should be judged on customer acquisition cost, repeat purchase and contribution rather than gross order volume alone.' },
      { label: 'Business impact', text: 'Campaign measurement connects spending to conversion, average order value, repeat purchase and return on advertising spend. Sustainable acquisition balances growth with the economics of serving the customer.' },
    ],
    visualKind: 'ecom-m2-32-marketing', visualHeading: 'Seven demand-generation and merchandising levers', visualIntro: 'Review each lever alongside the part of customer performance it moves.', imageAlt: 'Casemate cards mapping seven e-commerce marketing and merchandising levers',
    keyTerms: [
      { term: 'Customer acquisition cost', definition: 'The marketing and sales cost required to acquire a customer.' },
      { term: 'Average order value', definition: 'The average monetary value of completed orders.' },
      { term: 'ROAS', definition: 'Return on advertising spend: attributed revenue compared with advertising cost.' },
      { term: 'Conversion optimization', definition: 'Improving pages, checkout, pricing and usability to increase completed purchases.' },
    ],
    recap: ['Marketing creates discovery across owned and paid channels.', 'Merchandising shapes how offers are presented.', 'Promotions can raise volume while weakening contribution.', 'Measurement must connect acquisition to repeat and retained value.'],
    chapterRecap: 'Marketing and merchandising generate demand and guide customer decisions within the digital shopping environment. Sustainable performance requires balancing customer acquisition with conversion, retention, and contribution margin.',
    deepDiveTitle: 'Why the cheapest order is not always the best customer',
    body: <EcomDeepDive paragraphs={[
      'A heavily discounted campaign can produce low-cost orders from buyers who never return. The initial conversion looks efficient while the customer relationship remains uneconomic.',
      'Acquisition decisions become more useful when they include order contribution and repeat behavior. The objective is not simply to win a transaction but to win demand that the business can afford to serve.'
    ]} evidence="The activities and economic caution are based entirely on the supplied chapter. No channel benchmark is introduced." />,
    sources: citeEcom('emarketerForecast', 'econSea'),
  }),
  ecomM2Chapter({
    title: 'Order Processing, Payments and Transaction Management', chapterTitle: LESSON, readingTime: '8',
    objective: 'Trace the seven transaction controls that convert customer intent into a confirmed, protected and reconciled order.',
    mateIntro: 'The customer presses one button. Behind it, price, delivery, payment, fraud, inventory, routing and accounting all have to agree.',
    keyInsight: 'Checkout and transaction reliability are critical conversion factors. Even strong product demand can be lost when payment options are limited, checkout is complicated, or transaction failures are difficult to resolve.',
    statTiles: [
      { value: '7', label: 'Transaction controls', subtitle: 'Cart through exceptions', description: 'The controls connect the customer-facing flow with fulfillment and finance.' },
      { value: '4', label: 'Exception types', subtitle: 'Failure, duplicate, cancellation, dispute', description: 'Each requires a defined resolution path.' },
      { value: '2', label: 'Objectives', subtitle: 'Conversion and integrity', description: 'Friction must be reduced without abandoning protection.' },
    ],
    statsNote: 'The figures count controls, exceptions and objectives stated in the chapter; no payment success rate is claimed.',
    narrative: [
      { label: 'What it is', text: 'After order placement, the platform coordinates cart, checkout, authorization, confirmation, inventory allocation and order transfer to the seller or fulfillment operation.' },
      { label: 'Why it is happening', text: 'Transaction management must handle failed payment, duplicates, suspected fraud, cancellations, refunds and disputes while minimizing unnecessary friction.' },
      { label: 'Real-world example', text: 'The cart holds products and promotions; checkout confirms delivery and final price; payment systems authorize; fraud controls assess risk; routing selects the merchant or warehouse; reconciliation matches payments and payouts; and exception handling resolves failures.' },
      { label: 'Vietnam example', text: 'A Vietnamese checkout may support cards, bank transfers, wallets or other relevant methods. Offering choice helps conversion, but each method still needs authorization, refund and reconciliation processes.' },
      { label: 'Business impact', text: 'Complicated checkout or limited payment options lose demand. Weak fraud and reconciliation controls create financial loss. Reliable transaction management protects both conversion and integrity.' },
    ],
    visualKind: 'ecom-m2-33-transaction', visualHeading: 'Seven controls that convert intent into a confirmed order', visualIntro: 'Follow the customer’s order through payment, routing, reconciliation and recovery.', imageAlt: 'Casemate transaction flow from shopping cart to exception handling',
    keyTerms: [
      { term: 'Payment authorization', definition: 'Approval or rejection of a proposed payment by the relevant financial system.' },
      { term: 'Order routing', definition: 'Directing an order to the merchant, warehouse or location responsible for fulfillment.' },
      { term: 'Reconciliation', definition: 'Matching payments, commissions, refunds and payouts to transaction records.' },
      { term: 'Exception handling', definition: 'Resolving failures, duplicates, cancellations and disputes outside the normal flow.' },
    ],
    recap: ['Cart and checkout establish the final order.', 'Authorization and fraud controls protect payment.', 'Routing connects digital confirmation to fulfillment.', 'Reconciliation and exception handling preserve transaction integrity.'],
    chapterRecap: 'Order and payment management converts customer intent into a confirmed commercial transaction. Reliable processing, effective fraud controls, and accurate financial reconciliation help protect both conversion and transaction integrity.',
    deepDiveTitle: 'Why low friction and strong control are not opposites',
    body: <EcomDeepDive paragraphs={[
      'Good transaction design removes unnecessary steps while preserving the checks required for payment, fraud and accurate fulfillment. The goal is proportionate control, not the absence of control.',
      'Exception handling is part of the customer experience because failures are inevitable. A clear recovery path can protect trust even when the first attempt does not succeed.'
    ]} evidence="The seven controls and four exception categories come from the supplied chapter. No payment-method performance claim is made." />,
    sources: citeEcom('unctadDigitalEconomy', 'moitLawGuide'),
  }),
];

const quiz = ecomQuiz('ecom-m2-l3', [
  { chapter: '1', objective: 'Explain catalog management', question: 'What does catalog management organize?', application: 'Products cannot be filtered consistently. Which activity is weak?', correct: 'Categories, attributes, specifications, images and descriptions', wrong: ['Carrier contracts only', 'Payment settlement only', 'Customer refunds only'], explanation: 'Catalog structure supports discovery and comparison. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply inventory control', question: 'Why synchronize inventory?', application: 'A product appears available after selling out elsewhere. What failed?', correct: 'To keep stock and availability accurate across channels and locations', wrong: ['To increase advertising cost', 'To remove all sellers', 'To replace customer support'], explanation: 'Synchronization prevents false availability. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify moderation', question: 'What should content moderation identify?', application: 'A misleading listing reaches buyers. Which control should catch it?', correct: 'Misleading claims, prohibited items and counterfeit listings', wrong: ['Only delivery routes', 'Only payment methods', 'Only loyalty points'], explanation: 'Moderation protects marketplace quality. Review Chapter 1.' },
  { chapter: '2', objective: 'Recognize marketing levers', question: 'Which activity belongs to promotional merchandising?', application: 'A seller creates bundles and vouchers. What is this?', correct: 'Discounts, bundles, seasonal events and shipping offers', wrong: ['Inventory reconciliation', 'Payment authorization', 'Warranty repair'], explanation: 'Promotional merchandising changes the offer. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply sustainable acquisition', question: 'When can high traffic be unprofitable?', application: 'Ad cost and discounts exceed order contribution. What does that mean?', correct: 'Acquisition and incentives consume more value than orders generate', wrong: ['Traffic always guarantees profit', 'Discounts have no cost', 'Fulfillment is outside economics'], explanation: 'Volume must be connected to contribution. Review Chapter 2.' },
  { chapter: '2', objective: 'Use campaign metrics', question: 'Which measures connect campaigns to economics?', application: 'A team reports impressions only. What should it add?', correct: 'Acquisition cost, conversion, order value, repeat purchase and advertising return', wrong: ['Office rent only', 'Seller count only', 'Catalog size only'], explanation: 'Campaign measurement follows the full commercial result. Review Chapter 2.' },
  { chapter: '3', objective: 'Trace transaction flow', question: 'What does checkout processing do?', application: 'The final price and delivery details need confirmation. Which stage?', correct: 'Collects delivery details, confirms the order and calculates final charges', wrong: ['Manufactures the product', 'Runs customer loyalty', 'Selects suppliers'], explanation: 'Checkout turns cart contents into a proposed transaction. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain routing', question: 'What is order routing?', application: 'An order must reach the right warehouse. Which control handles it?', correct: 'Directing the order to the responsible merchant or fulfillment location', wrong: ['Writing product reviews', 'Setting consumer law', 'Buying advertising'], explanation: 'Routing connects confirmation to fulfillment. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain reconciliation', question: 'What does reconciliation match?', application: 'Merchant payout does not match the order. What process should find it?', correct: 'Payments, commissions, refunds and payouts with transaction records', wrong: ['Product photos with keywords', 'Reviews with ratings', 'Carriers with warehouses only'], explanation: 'Reconciliation protects financial accuracy. Review Chapter 3.' },
  { chapter: '3', objective: 'Balance friction and control', question: 'What is the goal of fraud prevention?', application: 'A platform blocks every unusual order. What principle is missing?', correct: 'Apply proportionate verification while preserving legitimate conversion', wrong: ['Remove all transaction checks', 'Approve every payment', 'Replace checkout with support'], explanation: 'Control should protect integrity without unnecessary friction. Review Chapter 3.' },
]);

export const LESSON_ECOM2_3: EcomM2LessonBundle = {
  deck, quiz,
  takeaways: {
    learned: 'You can explain platform operating controls, judge acquisition through contribution economics and trace a transaction from cart through reconciliation.',
    keyTakeaways: ['Accurate catalogs and inventory support conversion.', 'Seller governance and moderation protect marketplace trust.', 'Marketing must be measured beyond traffic and gross orders.', 'Checkout joins the customer interface to operational systems.', 'Fraud, routing, reconciliation and exception controls protect integrity.'],
    businessImplications: 'Treat product data, acquisition economics and transaction reliability as one connected operating system rather than three separate teams.',
    remember: 'Midstream quality converts supply and demand into a transaction that can actually be fulfilled.',
    nextLesson: 'Downstream Activities',
  },
};
